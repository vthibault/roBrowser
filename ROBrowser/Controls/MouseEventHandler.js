/**
 * Controls/MouseEventHandler.js
 *
 * Mouse Event Handler
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['Utils/jquery'], function( jQuery )
{
	"use strict";


	/**
	 * Mouse object
	 */
	var Mouse = {};


	/**
	 * Mouse screen position (2D)
	 */
	Mouse.screen = {
		x: -1,
		y: -1,
		width:  0,
		height: 0
	};


	/**
	 * Mouse world position (3d)
	 */
	Mouse.world = {
		x: -1,
		y: -1,
		z: -1
	};


	// Get mouse position
	jQuery( window ).
		mousemove(function( event ){
			Mouse.screen.x = event.pageX;
			Mouse.screen.y = event.pageY;
		}).
		mouseout(function(){
			Mouse.screen.x = -1;
			Mouse.screen.y = -1;
			Mouse.world.x  = -1;
			Mouse.world.y  = -1;
			Mouse.world.z  = -1;
		});


	/**
	 * Export
	 */
	return Mouse;
});