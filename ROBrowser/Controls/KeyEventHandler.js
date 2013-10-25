/**
 * Controls/KeyEventHandler.js
 *
 * Key Manager
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['Utils/jquery'], function( jQuery )
{
	"use strict";


	/**
	 * Keys Constants
	 */
	var KEYS = {

		TAB:       9,
		ENTER:    13,
		ESCAPE:   27,
		SPACE:    32,
		PAGEDOWN: 33,
		PAGEUP:   34,
		LEFT:     37,
		UP:       38,
		RIGHT:    39,
		DOWN:     40,
		INSERT:   45,
		SUPR:     46,
		F1:      112,
		F2:      113,
		F3:      114,
		F4:      115,
		F5:      116,
		F6:      117,
		F7:      118,
		F8:      119,
		F9:      120,
		F10:     121,
		F11:     122,
		F12:     123,
	
		// Special Keys
		CTRL:    false,
		SHIFT:   false,
		ALT:     false,


		// Regular keys:
		V:        86,
		E:        69
	};


	/**
	 * Keys CTRL/ALT/SHIFT Manager
	 */
	jQuery(window).bind('keydown keyup', function( event ) {
		KEYS.SHIFT = !! event.shiftKey;
		KEYS.CTRL  = !! event.ctrlKey;
		KEYS.ALT   = !! event.altKey;   
	});


	/**
	 * Export
	 */
	return KEYS;
});