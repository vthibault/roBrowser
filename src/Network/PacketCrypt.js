/**
 * NetWork/PacketCrypt.js
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

define(['Core/Configs'], function( Configs )
{
	'use strict';


	/**
	 * @var {integer} Keys to shuffle the packet
	 */
	var _keys      = new Uint32Array(3);


	/**
	 * @var {boolean} is encryption available ?
	 */
	var _available = false;


	/**
	 * @var {List} date => encryption keys
	 */
	var KeysTable = {
		20110817: [0x053D5CED,0x3DED6DED,0x6DED6DED],
		20110824: [0x35C91401,0x262A5556,0x28FA03AA],
		20110831: [0x3AD67ED0,0x44703C69,0x6F876809],
		20110906: [0x3AD67ED0,0x44703C69,0x6F876809],
		20111005: [0x291E6762,0x77CD391A,0x60AC2F16],
		20111012: [0x7F3C2D29,0x59B01DE6,0x1DBB44CA],
		20111021: [0x357D55DC,0x5A8D759F,0x245C30F5],
		20111025: [0x50AE1A63,0x3CE579B5,0x29C10406],
		20111102: [0x5324329D,0x5D545D52,0x06137269],
		20111109: [0x0B642BDA,0x6ECB1D1C,0x61C7454B],
		20111122: [0x3B550F07,0x1F666C7C,0x60304EF5],
		20111207: [0x2A610886,0x3E09165E,0x57C11888],
		20111214: [0x5151306B,0x7AE32886,0x53060628],
		20111220: [0x05D53871,0x7D0027B4,0x29975333],
		20111228: [0x0FF87E93,0x6CFF7860,0x3A3D1DEC],
		20120104: [0x262034A1,0x674542A5,0x73A50BA5],
		20120111: [0x2B412AFC,0x4FF94487,0x6705339D],
		20120120: [0x504345D0,0x3D427B1B,0x794C2DCC],
		20120202: [0x2CFC0A71,0x2BA91D8D,0x087E39E0],
		20120207: [0x1D373F5D,0x5ACD604D,0x1C4D7C4D],
		20120214: [0x7A255EFA,0x30977276,0x2D4A0448],
		20120229: [0x520B4C64,0x2800407D,0x47651458],
		20120307: [0x382A6DEF,0x5CBE7202,0x61F46637],
		20120314: [0x689C1729,0x11812639,0x60F82967],
		20120321: [0x21F9683F,0x710C5CA5,0x1FD910E9],
		20120328: [0x75B8553B,0x37F20B12,0x385C2B40],
		20120404: [0x0036310C,0x2DCD0BED,0x1EE62A78],
		20120410: [0x01581359,0x452D6FFA,0x6AFB6E2E],
		20120418: [0x01540E48,0x13041224,0x31247924],
		20120424: [0x411D1DBB,0x4CBA4848,0x1A432FC4],
		20120509: [0x16CF3301,0x1F472B9B,0x0B4A3CD2],
		20120515: [0x4A715EF9,0x79103E4F,0x405C1238],
		20120525: [0x70EB4CCB,0x0487713C,0x398D4B08],
		20120605: [0x68CA3080,0x31B74BDD,0x505208F1],
		20120612: [0x32E45D64,0x35643564,0x35643564],
		20120618: [0x261F261F,0x261F261F,0x261F261F],
		20120702: [0x25733B31,0x53486CFD,0x398649BD],
		20120716: [0x76052205,0x22052205,0x22052205],
		20130320: [0x3F094C49,0x55F86C1E,0x58AA359A],
		20130514: [0x75794A38,0x58A96BC1,0x296E6FB8],
		20130522: [0x6948050B,0x06511D9D,0x725D4DF1],
		20130529: [0x023A6C87,0x14BF1F1E,0x5CC70CC9],
		20130605: [0x646E08D9,0x5F153AB5,0x61B509B5],
		20130612: [0x6D166F66,0x3C000FCF,0x295B0FCB],
		20130618: [0x434115DE,0x34A10FE9,0x6791428E],
		20130626: [0x38F453EF,0x6A040FD8,0x65BD6668],
		20130703: [0x4FF90E23,0x0F1432F2,0x4CFA1EDA],
		20130807: [0x7E241DE0,0x5E805580,0x3D807D80],
		20130814: [0x23A23148,0x0C41420E,0x53785AD7],
		20131218: [0x6A596301,0x76866D0E,0x32294A45],
		20131223: [0x631C511C,0x111C111C,0x111C111C],
		20131230: [0x611B7097,0x01F957A1,0x768A0FCB],
		20140115: [0x63224335,0x0F3A1F27,0x6D217B24],
		20140205: [0x63DC7BDC,0x7BDC7BDC,0x7BDC7BDC],
		20140305: [0x116763F2,0x41117DAC,0x7FD13C45],
		20140402: [0x15D3271C,0x004D725B,0x111A3A37],
		20140416: [0x04810281,0x42814281,0x42814281],
		20141016: [0x2DFF467C,0x444B37EE,0x2C1B634F],
		20141022: [0x290551EA,0x2B952C75,0x2D67669B],
		20150513: [0x62C86D09,0x75944F17,0x112C133D],
        20150422: [0x10D22CE2,0x69E279E2,0x79E279E2],
		20170517: [0x2CC4749A,0x1FA954DC,0x72276857]
	};


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
	 * Initialize to get keys for packet encryption
	 */
	function Init()
	{
		var packetKeys;

		_available = false;
		packetKeys = Configs.get('packetKeys');

		if (!packetKeys) {
			return;
		}

		// Custom keys
		if (packetKeys instanceof Array) {
			_available = true;
			_keys.set(packetKeys);
		}

		else {
			var date, key;

			// Define a date or use the defined packetver ?
			if (typeof packetKeys === 'number') {
				date = packetKeys;
			}
			else {
				date = Configs.get('packetver');
			}

			// Get the available keys
			for (key in KeysTable) {
				if (date >= key) {
					_available = true;
					_keys.set(KeysTable[key]);
				}
			}

		}

		if (_available) {
			console.log( '%c[PACKETCRYPT] Encrypt sent packets using keys', 'color:#007000', _keys );
		}
	}


	/**
	 * Encrypt header using keys
	 *
	 * @param {DataView} view
	 */
	function Process(view)
	{
		if (_available) {
			var cmd = view.getInt16( 0, true);

			// Update key
			_keys[0] = (imul(_keys[0], _keys[1]) + _keys[2]) & 0xFFFFFFFF;

			// Encrypt header
			cmd ^= (_keys[0] >> 16) & 0x7FFF;

			view.setInt16( 0, cmd, true);
		}
	}


	/**
	 * Export
	 */
	return {
		init:    Init,
		process: Process
	};
});
