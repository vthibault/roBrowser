/**
 * NetWork/PacketEncryptor.js
 *
 * Encrypt packets with defined keys
 * It's an official features used in the Hercules emulator. As some servers may used it it has
 * to be implement in roBrowser.
 *
 * Source: http://hercules.ws/board/topic/1105-hercules-wpe-free-june-14th-patch/
 *
 * To enable it, you have to set the parameter "packetKeys" in the ROConfig array :
 * - If set to true, the client will use the packetver used by roBrowser to find its keys (check the KeysTable list behind)
 * - If set to a date (ex: 20120111), roBrowser will use the keys related to this version.
 * - If set to an array (ex: [0x053D5CED,0x3DED6DED,0x6DED6DED]), roBrowser will use the keys specified.
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(['./packets/keyTable'], function( keyTable )
{
	'use strict';


	/**
	 * Multiply two integers - because javascript precision sux
	 *
	 * @param {number} a
	 * @param {number} b
	 *
	 * @returns a * b
	 */
	var imul;

	// Check for support and kick out Safari bug
	if (Math.imul && Math.imul(0xffffffff, 5) === -5) {
		imul = Math.imul;
	}
	else {
		imul = function imul(a, b) {
			var ah = (a >>> 16) & 0xffff;
			var al = a & 0xffff;
			var bh = (b >>> 16) & 0xffff;
			var bl = b & 0xffff;
			// the shift by 0 fixes the sign on the high part
			// the final |0 converts the unsigned value into a signed value
			return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
		};
	}


	/**
	 * @Constructor PacketEncryptor
	 */
	function PacketEncryptor() {
		this._enabled = false;
		this._keys =  new Uint32Array(3);
	}


	/**
	 * Set keys to encrypt packets
	 * 
	 * @param {Uint32Array} keys
	 */
	PacketEncryptor.prototype.init = function setKeys( packetKeys, packetVersion ) {
		if (!packetKeys) {
			return;
		}

		if (packetKeys instanceof Array) {
			this.setKeys(packetKeys);		
		} else if (typeof packetKeys === 'number') {
			this.setDate(packetKeys);
		} else if (packetVersion) {
			this.setDate(packetVersion);
		}
	};

	 
	/**
	 * Set keys to encrypt packets
	 * 
	 * @param {Uint32Array} keys
	 */
	PacketEncryptor.prototype.setKeys = function setKeys( keys ) {
		this._enabled = true;
		this._keys.set(keys);

		console.log( '%c[PACKETCRYPT] Encrypt sent packets using keys', 'color:#007000', keys);
	};


	/**
	 * Encrypt packets based on client date
	 * 
	 * @param {number} client date : YYYYMMDD
	 */
	PacketEncryptor.prototype.setDate = function setDate( date ) {
		var i, count, tick = 0;
		var keys;

		keys  = Object.keys(keyTable).sort();
		count = keys.length;
		tick  = keys[0];

		for (i = 0; i < count; ++i) {
			tick = parseInt(keys[i], 10);

			if (date <= tick) {
				break;
			}
		}

		this.setKeys(keyTable[tick]);
	};


	/**
	 * Encrypt header using keys
	 *
	 * @param {DataView} view
	 */
	PacketEncryptor.prototype.encrypt = function encrypt(view) {
		if (!this._enabled) {
			return;
		}

		var cmd = view.getInt16( 0, true);

		// Update key
		this._keys[0] = (imul(this._keys[0], this._keys[1]) + this._keys[2]) & 0xFFFFFFFF;

		// Encrypt header
		cmd ^= (this._keys[0] >> 16) & 0x7FFF;

		view.setInt16( 0, cmd, true);
	};


	/**
	 * Reset keys
	 */
	PacketEncryptor.prototype.free = function free() {
		this._enabled = false;

		this._keys[0] = 0;
		this._keys[1] = 0;
		this._keys[2] = 0; 
	};


	/**
	 * Export
	 */
	return PacketEncryptor;
});