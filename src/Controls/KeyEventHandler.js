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

		// Special Keys
		CTRL:    false,
		SHIFT:   false,
		ALT:     false,

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

		// Numeric
		0:        48,
		1:        49,
		2:        50,
		3:        51,
		4:        52,
		5:        53,
		6:        54,
		7:        55,
		8:        56,
		9:        57,

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
		Z:        90,

		// Num pad
		Num_0:    96,
		Num_1:    97,
		Num_2:    98,
		Num_3:    99,
		Num_4:   100,
		Num_5:   101,
		Num_6:   102,
		Num_7:   103,
		Num_8:   104,
		Num_9:   105,
		'*':     106,
		'+':     107,
		'-':     109,
		'/':     111,

		// Functions keys
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
		F13:     124,
		F14:     125,
		F15:     126,
		F16:     127,
		F17:     128,
		F18:     129,
		F19:     130,
	};


	/**
	 * Get Key name from id
	 *
	 * @param {number} key id
	 * @param {string} readable key nam
	 */
	Object.defineProperty(KEYS, 'toReadableKey', {
		writable:   false,
		enumerable: false,
		value: function toReadableKey( keyId ){
			var keys, i, count;

			keys  = Object.keys(this);
			count = keys.length;

			for (i = 0; i < count; ++i) {
				if (this[keys[i]] === keyId) {
					return keys[i];
				}
			}

			return '';
		},
	});


	/**
	 * Get Key name from id
	 *
	 * @param {number} key id
	 * @param {string} readable key nam
	 */
	Object.defineProperty(KEYS, 'getKeyIdString', {
		writable:   false,
		enumerable: false,
		value: function getKeyIdString( keyId ){
			var str = [];
			var tmp = this.toReadableKey(parseInt(keys[i], 10));

			if (shortcut.alt) {
				str.push('ALT');
			}

			if (shortcut.shift) {
				str.push('SHIFT');
			}

			if (shortcut.ctrl) {
				str.push('CTRL');
			}

			if (tmp) {
				str.push(tmp);
			}

			return str.join(' + ');
		},
	});


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