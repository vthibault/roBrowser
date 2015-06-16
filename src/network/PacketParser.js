/**
 * network/PacketParser.js
 *
 * Helper to parse packets received from server
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(['utils/BinaryReader'], function( BinaryReader )
{
	'use strict';


	/**
	 * @Constructor PacketParser
	 */
	function PacketParser() {
		this._reader  = new BinaryReader();
		this._packets = [];
	}


	/**
	 * Register packets to parse.
	 * 
	 * @param {Object} packets list
	 */
	PacketParser.prototype.registerPackets = function registerPackets( packetList ) {
		var i, count, id;
		var keys, Struct;

		keys  = Object.keys(packetList);
		count = keys.length;

		for (i = 0; i < count; ++i) {
			id     = parseInt(keys[i], 10);
			Struct = packetList[id];

			Struct.id         = id;
			this._packets[id] = {
				name:     Struct.name,
				Struct:   Struct,
				size:     Struct.size,
				callback: null
			};
		}
	};


	/**
	 * Hook a packet once parsed
	 *
	 * @param {object} packet
	 */
	PacketParser.prototype.getPacket = function getPacket( packet ) {
		if (!packet.id) {
			throw new Error('PacketParser::setPacketCallback() - Packet not yet registered "'+ packet.name +'"');
		}

		return this._packets[ packet.id ];
	};


	/**
	 * Add packet to the list
	 * 
	 * @param {ArrayBuffer}
	 */
	PacketParser.prototype.addBuffer = function addBuffer(buffer) {
		this._reader.addBuffer(buffer);
	};


	/**
	 * Parse a packet
	 * 
	 * @param {Uint8Array} buffer
	 * @returns {packet} result
	 */
	PacketParser.prototype.parse = function parse( buffer ) {
		var offset, id, length;
		var packet;

		// Read and parse packets
		if (!this._reader.hasBytes(2)) {
			return null;
		}

		offset = this._reader.tell();
		id     = this._reader.readUShort();

		// Packet not defined ?
		if (!this._packets[id]) {
			console.error(
				'[Network] Packet "%c0x%s%c" not register, skipping %d bytes.',
				'font-weight:bold', id.toString(16), 'font-weight:normal', (this._reader.length-this._reader.tell())
			);

			this._reader.seek( this._reader.length, BinaryReader.Seek.POS);
			return null;
		}

		// Find packet size
		packet = this._packets[id];
		length = packet.size;

		if (length < 0) {
			if (!this._reader.hasBytes(2)) {
				this._reader.seek( offset, BinaryReader.Seek.POS);
				return null;
			}
			length = this._reader.readUShort();
		}

		offset += length;

		// Parse packet
		if (!packet._instance) {
			packet._instance = new packet.Struct(this._reader, offset);
		} else {
			packet.Struct.call(packet._instance, this._reader, offset);
		}

		// Support for "0" type
		if (length) {
			this._reader.seek( offset, BinaryReader.Seek.SET);
		}

		return packet;
	 };


	/**
	 * Reset PacketParser
	 */
	PacketParser.prototype.free = function free() {
		this._packets.length = 0;
		this._reader.seek(0, BinaryReader.Seek.END);
	};


	/**
	 * Export
	 */
	return PacketParser;
});