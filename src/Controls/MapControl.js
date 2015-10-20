/**
 * Controls/MapControl.js
 *
 * Control for keys and input
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function( require )
{
	'use strict';


	// Load dependencies
	var jQuery        = require('Utils/jquery');
	var DB            = require('DB/DBManager');
	var UIManager     = require('UI/UIManager');
	var Cursor        = require('UI/CursorManager');
	var InputBox      = require('UI/Components/InputBox/InputBox');
	var ChatBox       = require('UI/Components/ChatBox/ChatBox');
	var Equipment     = require('UI/Components/Equipment/Equipment');
	var Mouse         = require('Controls/MouseEventHandler');
	var Mobile        = require('Core/Mobile');
	var Renderer      = require('Renderer/Renderer');
	var Camera        = require('Renderer/Camera');
	var EntityManager = require('Renderer/EntityManager');
	var Session       = require('Engine/SessionStorage');
	var Preferences   = require('Preferences/Controls');

	require('Controls/ScreenShot');


	/**
	 * @var {int16[2]} screen position
	 */
	var _rightClickPosition = new Int16Array(2);


	/**
	 * @namespace MapControl
	 */
	var MapControl = {};


	/**
	 * Callback used when requesting to move somewhere
	 */
	MapControl.onRequestWalk = function(){};


	/**
	 * Callback used when request to stop move
	 */
	MapControl.onRequestStopWalk = function(){};


	/**
	 * Callback used when dropping an item to the map
	 */
	MapControl.onRequestDropItem = function(){};


	/**
	 * Initializing the controller
	 */
	MapControl.init = function init()
	{
		Mobile.init();
		Mobile.onTouchStart = onMouseDown.bind(this);
		Mobile.onTouchEnd   = onMouseUp.bind(this);

		// Attach events
		jQuery( Renderer.canvas )
			.on('mousewheel DOMMouseScroll', onMouseWheel)
			.on('dragover',                  onDragOver )
			.on('drop',                      onDrop.bind(this));

		jQuery(window)
			.on('mousedown.map',   onMouseDown.bind(this))
			.on('mouseup.map',     onMouseUp.bind(this));
	};


	/**
	 * What to do when clicking on the map ?
	 */
	function onMouseDown( event )
	{
		var action = event && event.which || 1;

		Session.moveAction = null;

		if (!Mouse.intersect) {
			return;
		}

		switch (action) {

			// Left click
			case 1:
				var entityFocus = EntityManager.getFocusEntity();
				var entityOver  = EntityManager.getOverEntity();
				var stop        = false;

				if (entityFocus && entityFocus != entityOver) {
					entityFocus.onFocusEnd();
					EntityManager.setFocusEntity(null);
				}

				// Entity picking ?
				if (entityOver) {
					stop = stop || entityOver.onMouseDown();
					stop = stop || entityOver.onFocus();
					EntityManager.setFocusEntity(entityOver);

					// Know if propagate to map mousedown
					if (stop) {
						return;
					}
				}

				// Start walking
				if (this.onRequestWalk) {
					this.onRequestWalk();
				}
				break;

			// Right Click
			case 3:
				_rightClickPosition[0] = Mouse.screen.x;
				_rightClickPosition[1] = Mouse.screen.y;

				Cursor.setType( Cursor.ACTION.ROTATE );
				Camera.rotate( true );
				break;
		}
	}


	/**
	 * What to do when stop clicking on the map ?
	 */
	function onMouseUp( event )
	{
		var entity;
		var action = event && event.which || 1;

		// Not rendering yet
		if (!Mouse.intersect) {
			return;
		}

		switch (action) {

			// Left click
			case 1:
				// Remove entity picking ?
				entity = EntityManager.getFocusEntity();

				if (entity) {
					entity.onMouseUp();

					// Entity lock is only on MOB type
					if (Preferences.noctrl === false || entity.objecttype !== entity.constructor.TYPE_MOB) {
						EntityManager.setFocusEntity(null);
						entity.onFocusEnd();
					}
				}

				// stop walking
				if (this.onRequestStopWalk) {
					this.onRequestStopWalk();
				}
				break;

			// Right Click
			case 3:
				Cursor.setType( Cursor.ACTION.DEFAULT );
				Camera.rotate( false );

				// Seems like it's how the official client handle the contextmenu
				// Just check for the same position on mousedown and mouseup
				if (_rightClickPosition[0] === Mouse.screen.x && _rightClickPosition[1] === Mouse.screen.y) {
					entity = EntityManager.getOverEntity();

					if (entity && entity !== Session.Entity) {
						entity.onContextMenu();
					}
				}
				break;
		}
	}


	/**
	 * Zoom feature
	 */
	function onMouseWheel( event )
	{
		// Zooming on the scene
		// Cross browser delta
		var delta;
		if (event.originalEvent.wheelDelta) {
			delta = event.originalEvent.wheelDelta / 120 ;
			if (window.opera) {
				delta = -delta;
			}
		}
		else if (event.originalEvent.detail) {
			delta = -event.originalEvent.detail;
		}

		Camera.setZoom(delta);
	}



	/**
	 * Allow dropping data
	 */
	function onDragOver(event)
	{
		event.stopImmediatePropagation();
		return false;
	}
	


	/**
	 * Drop items to the map
	 */
	function onDrop( event )
	{
		var item, data;

		try {
			data = JSON.parse(
				event.originalEvent.dataTransfer.getData('Text')
			);
		}
		catch(e) {}

		// Stop default behavior
		event.stopImmediatePropagation();
		if (!data) {
			return false;
		}

		// Hacky way to trigger mouseleave (mouseleave isn't
		// triggered when dragging an object).
		// ondragleave event is not relyable to do it (not working as intended)
		if (data.from) {
			UIManager.getComponent(data.from).ui.trigger('mouseleave');
		}

		// Just support items ?
		if (data.type !== 'item' || data.from !== 'Inventory') {
			return false;
		}

		// Can't drop an item on map if Equipment window is open
		if (Equipment.ui.is(':visible')) {
			ChatBox.addText(
				DB.getMessage(189),
				ChatBox.TYPE.ERROR
			);
			return false;
		}

		item = data.data;

		// Have to specify how much
		if (item.count > 1) {
			InputBox.append();
			InputBox.setType('number', false, item.count);
			InputBox.onSubmitRequest = function onSubmitRequest( count ) {
				InputBox.remove();
				MapControl.onRequestDropItem(
					item.index,
					parseInt(count, 10 )
				);
			};
		}

		// Only one, don't have to specify
		else {
			MapControl.onRequestDropItem( item.index, 1 );
		}

		return false;
	}



	/**
	 *  Exports
	 */
	return MapControl;
});