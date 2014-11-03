/**
 * Utils/BinaryReader.js
 *
 * BinaryReader Helper
 *
 * Helper to load/parse Binary data (sockets, files)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

var _global = this;

define( ['./Struct', 'Vendors/text-encoding'], function( Struct, TextEncoding )
{
	'use strict';


	/**
	 * Binary Constant for BinaryReader::seek();
	 * Export to global context
	 */
	_global.SEEK_CUR = 1;
	_global.SEEK_SET = 2;
	_global.SEEK_END = 3;


	/**
	 * BinaryReader
	 *
	 * @param mixed buffer
	 * @param {number} start optional
	 * @param {number} end optional
	 */
	function BinaryReader( mixed, start, end )
	{
		var buffer;

		if (typeof mixed === 'string') {
			var uint8;
			var i, length;

			length = mixed.length;
			buffer = new ArrayBuffer(length);
			uint8  = new Uint8Array(buffer);

			for ( i=0; i<length; ++i ) {
				uint8[i] = mixed.charCodeAt(i) & 0xff;
			}
		}
		else if (mixed instanceof ArrayBuffer) {
			buffer = mixed;
		}
		else if (mixed instanceof Uint8Array) {
			buffer = mixed.buffer;
		}
		else {
			throw new Error('BinaryReader() - Undefined buffer type');
		}

		this.buffer = buffer;
		this.view   = new DataView( buffer, start || 0 , end || buffer.byteLength);
		this.offset = 0;
		this.length = ( end || buffer.byteLength ) - ( start || 0 );
	}


	/**
	 * Read Int8 from buffer
	 * @return int8
	 */
	BinaryReader.prototype.getInt8  =
	BinaryReader.prototype.readChar =
	BinaryReader.prototype.readByte = function getInt8()
	{
		return this.view.getInt8( this.offset++ );
	};


	/**
	 * Read Uint8 from buffer
	 * @return uint8
	 */
	BinaryReader.prototype.getUint8  =
	BinaryReader.prototype.readUChar =
	BinaryReader.prototype.readUByte = function getUint8()
	{
		return this.view.getUint8( this.offset++ );
	};


	/**
	 * Read Int16 from buffer
	 * @return int16
	 */
	BinaryReader.prototype.getInt16  =
	BinaryReader.prototype.readShort = function getInt16()
	{
		var data = this.view.getInt16( this.offset, true );
		this.offset += 2;

		return data;
	};


	/**
	 * Read Uint16 from buffer
	 * @return Uint16
	 */
	BinaryReader.prototype.getUint16  =
	BinaryReader.prototype.readUShort = function getUint16()
	{
		var data = this.view.getUint16( this.offset, true );
		this.offset += 2;

		return data;
	};


	/**
	 * Read Int32 from buffer
	 * @return int32
	 */
	BinaryReader.prototype.getInt32 =
	BinaryReader.prototype.readInt  =
	BinaryReader.prototype.readLong = function getInt32()
	{
		var data = this.view.getInt32( this.offset, true );
		this.offset += 4;

		return data;
	};


	/**
	 * Read Uint32 from buffer
	 * @return Uint32
	 */
	BinaryReader.prototype.getUint32 =
	BinaryReader.prototype.readUInt  =
	BinaryReader.prototype.readULong = function getUint32()
	{
		var data = this.view.getUint32( this.offset, true );
		this.offset += 4;

		return data;
	};


	/**
	 * Read float32 from buffer
	 * @return float32
	 */
	BinaryReader.prototype.getFloat32 =
	BinaryReader.prototype.readFloat = function getFloat32()
	{
		var data = this.view.getFloat32( this.offset, true );
		this.offset += 4;

		return data;
	};


	/**
	 * Read Float64 from buffer
	 * @return Float64
	 */
	BinaryReader.prototype.getFloat64 =
	BinaryReader.prototype.readDouble = function getFloat64()
	{
		var data = this.view.getFloat64( this.offset, true );
		this.offset += 8;

		return data;
	};


	/**
	 * Read Buffer position
	 * @return {number}
	 */
	BinaryReader.prototype.tell = function tell()
	{
		return this.offset;
	};


	/**
	 * Read string from buffer
	 *
	 * @param integer string length
	 * @return string
	 */
	BinaryReader.prototype.getString  =
	BinaryReader.prototype.readString = function getString( len )
	{
		var offset = this.offset + 0;
		var i, uint8, data = new Uint8Array(len);
	
		for (i = 0; i < len; ++i) {
			if (!(uint8 = this.getUint8())) {
				break;
			}
			data[i] = uint8;
		}

		this.offset = offset + len;

		return TextEncoding.decode(data.subarray(0, i));
	};


	/**
	 * Read binary string from buffer
	 *
	 * @param integer string length
	 * @return string
	 */
	BinaryReader.prototype.getBinaryString  =
	BinaryReader.prototype.readBinaryString = function getBinaryString( len )
	{
		var offset = this.offset + 0, i;
		var uint8, out = '';
	
		for (i = 0; i < len; ++i) {
			if (!(uint8 = this.getUint8())) {
				break;
			}
			out += String.fromCharCode(uint8);
		}

		this.offset = offset + len;
		return out;
	};


	/**
	 * Structure reader in JS
	 *
	 * @param Struct
	 */
	BinaryReader.prototype.getStruct  =
	BinaryReader.prototype.readStruct = function getStruct( struct )
	{
		if (!(struct instanceof Struct)) {
			throw new Error('BinaryReader::getStruct() - Invalid data as argument');
		}

		var list = struct._list;
		var name;
		var out={}, current, keys;
		var i, j, count;

		keys = Object.keys(list);
		count = keys.length;

		for (j = 0; j < count; ++j) {
			name    = keys[j];
			current = list[name];

			if (current.count > 1) {
				out[name] = new Array(current.count);
				for (i = 0; i < current.count; ++i) {
					out[name][i] = this[ current.func ]();
				}
			}
			else {
				out[name] = this[ current.func ]();
			}
		}

		return out;
	};


	/**
	 * Move cursor to another offset
	 *
	 * @param {number} index
	 * @param {number} type - const SEEK_*
	 */
	BinaryReader.prototype.seek = function seek( index, type )
	{
		type    = type || SEEK_SET;
		this.offset =
			type === SEEK_CUR ? this.offset + index :
			type === SEEK_END ? this.length + index :
			index
		;
	};


	// Old compatibility for pos and pos2
	var bf_byteBuff = new ArrayBuffer(4);
	var bf_wba      = new Int8Array(bf_byteBuff);
	var bf_wia      = new Int32Array(bf_byteBuff);


	/**
	 * Read Position from Buffer
	 *
	 * @return array (pos_x, pos_y, direction)
	 */
	BinaryReader.prototype.getPos  =
	BinaryReader.prototype.readPos = function getPos()
	{
		var p, dir, x, y;

		bf_wba[2] = this.getUint8();
		bf_wba[1] = this.getUint8();
		bf_wba[0] = this.getUint8();
		bf_wba[3] = 0;

		p         = 0 + bf_wia[0];
		dir       = p & 0x0f;
		p       >>= 4;

		y         = p & 0x03FF;
		p       >>= 10;

		x         = p & 0x03FF;

		return [ x, y, dir ];
	};


	/**
	 * Read Position (walk) from buffer
	 *
	 * @return array ( from_x, from_y, to_x, to_y )
	 */
	BinaryReader.prototype.getPos2  =
	BinaryReader.prototype.readPos2 = function getPos2()
	{
		var a, b, c, d, e;

		a = this.getInt8();
		b = this.getInt8();
		c = this.getInt8();
		d = this.getInt8();
		e = this.getInt8();

		return [
			( (a & 0xFF) << 2 ) | ( (b & 0xC0) >> 6 ), // x1
			( (b & 0x3F) << 4 ) | ( (c & 0xF0) >> 4 ), // y1
			( (d & 0xFC) >> 2 ) | ( (c & 0x0F) << 6 ), // x2
			( (d & 0x03) << 8 ) | ( (e & 0xFF)      )  // y2
		];
	};


	// Export
	return BinaryReader;

});