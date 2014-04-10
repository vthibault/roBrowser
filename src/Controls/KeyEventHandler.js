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
	'use strict';


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
		A:        65,
		B:        66,
		C:        67,
		D:        68,
		E:        69,
		F:        70,
		G:        71,
		H:        72,
		I:        73,
		J:        74,
		K:        75,
		L:        76,
		M:        77,
		N:        78,
		O:        79,
		P:        80,
		Q:        81,
		R:        82,
		S:        83,
		T:        84,
		U:        85,
		V:        86,
		W:        87,
		X:        88,
		Y:        89,
		Z:        90	
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