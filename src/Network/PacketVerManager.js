/**
 * Network/PacketVerManager.js
 *
 * Manager to find the server protocol
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function()
{
	"use strict";


	/**
	 * PACKETVER range
	 * @var integer
	 */
	var _min = 0;
	var _max = Infinity;


	/**
	 * Loop over version to find the good one
	 * @return integer[] offset
	 */
	function getPacketVersion() {
		var versions = this.versions;
		var i, count = versions.length;
	
		for( i=0; i<count-1; ++i ) {
			if( _min < versions[i+1][0] ) {
				return versions[i];
			}
		}
		return versions[i];
	}


	/**
	 * Add support for a new packet version
	 * 
	 * @param {number} date
	 * @param {number[]} list of offsets
	 */
	function AddSupport(date, list) {
		var packet, param;
		var i, count = list.length;

		for( i=0; i<count; ++i ) {
			param    = list[i];
			packet   = param[0];
			param[0] = date;

			if( !packet.prototype.versions )
				packet.prototype.versions = [];
	
			packet.prototype.versions.push(list[i]);
			packet.prototype.getPacketVersion = getPacketVersion;
		}
	}


	/**
	 * Export
	 */
	return {

		// Get Back data
		get max() { return _max; },
		get min() { return _min; },

		set max(v) {
			if( v < _max ) {
				_max = Math.max(v, _min );
				console.log( "%c[PACKETVER] Guess packet version between", "color:#007000", _min , "-", _max );
			}
		},

		set min(v) {
			if( v > _min ) {
				_min = Math.min(v, _max);
				console.log( "%c[PACKETVER] Guess packet version between", "color:#007000", _min , "-", _max );
			}
		},

		// Add support for packet version
		addSupport: AddSupport
	};
});