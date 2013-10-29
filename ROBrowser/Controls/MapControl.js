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
	'UI/CursorManager',
	'UI/Components/Inventory/Inventory',
	'UI/Components/InputBox/InputBox',
	'Controls/KeyEventHandler',
	'Renderer/Renderer', 'Renderer/Camera', 'Renderer/EntityManager',
	'Preferences/Controls'
],
function(
	jQuery,
	Cursor,
	Inventory,
	InputBox,
	KEYS,
	Renderer, Camera, EntityManager,
	Preferences
)
{
	"use strict";


	/**
	 * What to do when clicking on the map ?
	 */
	function OnMouseDown( event )
	{
		switch( event.which ) {

			// Left click
			case 1:
				var entityFocus = EntityManager.getFocusEntity();
				var entityOver  = EntityManager.getOverEntity();

				if( entityFocus && entityFocus != entityOver ) {
					entityFocus.onFocusEnd();
					EntityManager.setFocusEntity(null);
				}

				// Entity picking ?
				if( entityOver ) {
					entityOver.onMouseDown();
					entityOver.onFocus();
					EntityManager.setFocusEntity(entityOver);
					return;
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
		switch( event.which ) {

			// Left click
			case 1:
				// Remove entity picking ?
				var entity = EntityManager.getFocusEntity();				

				if( entity ) {
					entity.onMouseUp();

					// Entity lock is only on MOB type
					if( Preferences.noctrl === false || entity.objecttype !== entity.constructor.TYPE_MOB ) {
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
		if ( event.originalEvent.wheelDelta ) {
			delta = event.originalEvent.wheelDelta / 120 ;
			if ( window.opera ) {
				delta = -delta;
			}
		}
		else if ( event.originalEvent.detail ) {
			delta = -event.originalEvent.detail / 3;
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
		var i, count;
		var items, item;
		var MapEngine = this;

		var data = event.originalEvent.dataTransfer.getData("Text");
		var matches = data.match(/(\w+) (\d+)/);

		// Just support items for now ?
		if( matches && matches[1] !== "item" ) {
			event.stopImmediatePropagation();
			return false;
		}

		for( i = 0, items = Inventory.list, count = items.length; i < count; ++i ) {

			if( items[i].index != matches[2] ) {
				continue;
			}

			item = items[i];

			// Have to specify how much
			if( item.count > 1 ) {
				InputBox.append();
				InputBox.setType("number");
				InputBox.onSubmitRequest = function OnSubmitRequest( count )
				{
					InputBox.remove();
					MapEngine.onDropItem(
						parseInt(matches[2], 10),
						parseInt(count, 10 )
					);
				};
				break;
			}
		
			MapEngine.onDropItem( parseInt(matches[2], 10), 1 );
			break;
		}

		event.stopImmediatePropagation();
		return false;
	}




	/**
	 *  Ugly but to avoid circular dependencies
	 */
	return function Initialize()
	{
		// Attach events
		jQuery( Renderer.canvas )
			.mousedown( OnMouseDown.bind(this) )
			.mouseup( OnMouseUp.bind(this) )
			.on('mousewheel DOMMouseScroll', OnMouseWheel)
			.on('dragover', OnDragOver )
			.on('drop', OnDrop.bind(this));

		jQuery(window).on('contextmenu', function(){ return false; });
	};
});