/**
 * Network/PacketGuess.js
 *
 * Class to try to find the packetver from the server on the fly
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['./PacketVerManager', './PacketStructure'], function( PACKETVER, PACKET )
{
	'use strict';

	return function NetWorkClosure()
	{
		/**
		 * CHAR::0x6b - Received character list
		 */
		this.guessPacketVer( PACKET.HC.ACCEPT_ENTER_NEO_UNION, function(len){
			if ((len-24) % 106 === 0) {
				PACKETVER.max = 20061023 - 1;
			}
			else if ((len-24) % 108 === 0) {
				PACKETVER.min = 20061023;
				PACKETVER.max = 20081217;
			}
			else if ((len-24) % 112 === 0) {
				PACKETVER.min = 20081217;
				PACKETVER.max = 20100720 - 1;
			}
			else if ((len-27) % 128 === 0) {
				PACKETVER.min = 20100720;
				PACKETVER.max = 20100727;
			}
			else if ((len-27) % 112 === 0) {
				PACKETVER.min = 20100727 + 1;
				PACKETVER.max = 20100803 - 1;
			}
			else if ((len-27) % 132 === 0) {
				PACKETVER.min = 20100803;
				PACKETVER.max = 20110111 - 1;
			}
			else if ((len-27) % 136 === 0) {
				PACKETVER.min = 20110111;
				PACKETVER.max = 20110928 - 1;
			}
			else if ((len-27) % 140 === 0) {
				PACKETVER.min = 20110928;
				PACKETVER.max = 20111025 - 1;
			}
			else if ((len-27) % 144 === 0) {
				PACKETVER.min = 20111025;
			}
		});
		
		
		/**
		 * CHAR::0x6d - Char creation success
		 */
		this.guessPacketVer( PACKET.HC.ACCEPT_MAKECHAR_NEO_UNION, function(len){
			if ((len-2) % 106 === 0) {
				PACKETVER.max = 20061023 - 1;
			}
			else if ((len-2) % 108 === 0) {
				PACKETVER.min = 20061023;
				PACKETVER.max = 20081217;
			}
			else if ((len-2) % 112 === 0) {
				PACKETVER.min = 20081217;
				PACKETVER.max = 20100720 - 1;
			}
			else if ((len-2) % 128 === 0) {
				PACKETVER.min = 20100720;
				PACKETVER.max = 20100727;
			}
			else if ((len-2) % 112 === 0) {
				PACKETVER.min = 20100727 + 1;
				PACKETVER.max = 20100803 - 1;
			}
			else if ((len-2) % 132 === 0) {
				PACKETVER.min = 20100803;
				PACKETVER.max = 20110111 - 1;
			}
			else if ((len-2) % 136 === 0) {
				PACKETVER.min = 20110111;
				PACKETVER.max = 20110928 - 1;
			}
			else if ((len-2) % 140 === 0) {
				PACKETVER.min = 20110928;
				PACKETVER.max = 20111025 - 1;
			}
			else if ((len-2) % 144 === 0) {
				PACKETVER.min = 20111025;
			}
		});
	};
});