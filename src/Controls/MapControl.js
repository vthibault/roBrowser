/**
 * Controls/MapControl.js
 *
 * Control for keys and input
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define([
	'Utils/jquery',
	'DB/DBManager',
	'UI/CursorManager',
	'UI/Components/Inventory/Inventory',
	'UI/Components/InputBox/InputBox',
	'UI/Components/ChatBox/ChatBox',
	'UI/Components/Equipment/Equipment',
	'Controls/KeyEventHandler', 'Controls/MouseEventHandler', 'Controls/ScreenShot',
	'Renderer/Renderer', 'Renderer/Camera', 'Renderer/EntityManager',
	'Engine/SessionStorage',
	'Preferences/Controls'
],
function(
	jQuery,
	DB,
	Cursor,
	Inventory,
	InputBox,
	ChatBox,
	Equipment,
	KEYS, Mouse, ScreenShot,
	Renderer, Camera, EntityManager,
	Session,
	Preferences
)
{
	'use strict';


	/**
	 * Moving the mouse on the scene
	 */
	function OnMouseMove( event )
	{
		Mouse.screen.x = event.pageX;
		Mouse.screen.y = event.pageY;
	}


	/**
	 * What to do when clicking on the map ?
	 */
	function OnMouseDown( event )
	{
		Session.moveTarget = null;

		if (!Mouse.intersect) {
			return;
		}

		switch (event.which) {

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
				this.onMouseDown();
				break;

			// Right Click
			case 3:
				Cursor.setType( Cursor.ACTION.ROTATE );
				Camera.rotate( true );
				break;
		}
	}


	/**
	 * What to do when stop clicking on the map ?
	 */
	function OnMouseUp( event )
	{
		// Not rendering yet
		if (!Mouse.intersect) {
			return;
		}

		switch (event.which) {

			// Left click
			case 1:
				// Remove entity picking ?
				var entity = EntityManager.getFocusEntity();

				if (entity) {
					entity.onMouseUp();

					// Entity lock is only on MOB type
					if (Preferences.noctrl === false || entity.objecttype !== entity.constructor.TYPE_MOB) {
						EntityManager.setFocusEntity(null);
						entity.onFocusEnd();
					}
				}

				// stop walking
				this.onMouseUp();
				break;

			// Right Click
			case 3:
				Cursor.setType( Cursor.ACTION.DEFAULT );
				Camera.rotate( false );
				break;
		}
	}


	/**
	 * Zoom feature
	 */
	function OnMouseWheel( event )
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
	function OnDragOver(event)
	{
		event.stopImmediatePropagation();
		return false;
	}
	


	/**
	 * Drop items to the map
	 */
	function OnDrop( event )
	{
		var item, data;
		var MapEngine = this;

		try {
			data = JSON.parse(
				event.originalEvent.dataTransfer.getData('Text')
			);
		}
		catch(e) {}

		// Just support items for now ?
		if (data && data.type === 'item' && data.from === 'inventory') {

			// Can't drop an item on map if Equipment window is open
			if (Equipment.ui.is(':visible')) {
				ChatBox.addText(
					DB.msgstringtable[189],
					ChatBox.TYPE.ERROR
				);
				return;
			}

			item = data.data;

			// Have to specify how much
			if (item.count > 1) {
				InputBox.append();
				InputBox.setType('number', false, item.count);
				InputBox.onSubmitRequest = function OnSubmitRequest( count ) {
					InputBox.remove();
					MapEngine.onDropItem(
						item.index,
						parseInt(count, 10 )
					);
				};
			}

			// Only one, don't have to specify
			else {
				MapEngine.onDropItem( item.index, 1 );
			}
		}

		event.stopImmediatePropagation();
		return false;
	}




	/**
	 *  Exports
	 */
	return function Initialize()
	{
		// Attach events
		jQuery( Renderer.canvas )
			.on('mousewheel DOMMouseScroll', OnMouseWheel)
			.on('dragover', OnDragOver )
			.on('drop', OnDrop.bind(this));

		jQuery(window)
			.on('contextmenu', function(){ return false; })
			.mousemove( OnMouseMove )
			.mousedown( OnMouseDown.bind(this) )
			.mouseup( OnMouseUp.bind(this) );
	};
});