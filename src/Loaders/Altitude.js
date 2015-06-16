/**
 * loaders/Altitude.js
 *
 * Loaders for Gravity .gat file (Ground Altitude)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['utils/BinaryReader'], function( BinaryReader )
{
	'use strict';


	/**
	 * Altitude Constructor
	 *
	 * @param {ArrayBuffer} data
	 */
	function GatReader(data)
	{
		if (data) {
			this.load( data );
		}
	}


	/**
	 * Cell known type
	 */
	GatReader.Type = {
		NONE:     1 << 0,
		WALKABLE: 1 << 1,
		WATER:    1 << 2,
		SNIPABLE: 1 << 3
	};


	/**
	 * Taken from *athena at src/map/map.c
	 * I don't know if it's a good source but it's a good idea to match this references for now
	 */
	GatReader.typeHashTable = {
		0: GatReader.Type.WALKABLE | GatReader.Type.SNIPABLE,                        // walkable ground
		1: GatReader.Type.NONE,                                                      // non-walkable ground
		2: GatReader.Type.WALKABLE | GatReader.Type.SNIPABLE,                        // ???
		3: GatReader.Type.WALKABLE | GatReader.Type.SNIPABLE | GatReader.Type.WATER, // walkable water
		4: GatReader.Type.WALKABLE | GatReader.Type.SNIPABLE,                        // ???
		5: GatReader.Type.SNIPABLE,                                                  // gat (snipable)
		6: GatReader.Type.WALKABLE | GatReader.Type.SNIPABLE                         // ???
	};


	/**
	 * Load a GAT file
	 *
	 * @param {ArrayBuffer} data
	 */
	GatReader.prototype.load = function load( data )
	{
		var fp, header, cells;
		var version, width, height, i, count;

		fp        = new BinaryReader(data);
		header    = fp.readBinaryString(4);

		// Well, the file should be a gat file, noh ?
		if (header !== 'GRAT') {
			throw new Error('GAT::load() - Invalid header "'+ header + '", must be "GRAT"');
		}

		// Load parameters
		version   = fp.readUByte() + fp.readUByte()/10;
		width     = fp.readULong();
		height    = fp.readULong();
		cells     = new Float32Array(width * height * 5);

		// Load the cells
		for (i = 0, count = width*height; i < count; ++i ) {
			// Creating x objects is too slow to send with postMessage...
			// So just generate a float32array (10 times faster)
			cells[i * 5 + 0] = fp.readFloat() * 0.2; // height 1
			cells[i * 5 + 1] = fp.readFloat() * 0.2; // height 2
			cells[i * 5 + 2] = fp.readFloat() * 0.2; // height 3
			cells[i * 5 + 3] = fp.readFloat() * 0.2; // height 4
			cells[i * 5 + 4] = GatReader.typeHashTable[fp.readULong()] || 0.0; // type
		}

		// Exports
		this.width   = width;
		this.height  = height;
		this.cells   = cells;
		this.version = version;
	};


	/**
	 * Compile GAT file
	 */
	GatReader.prototype.compile = function compile()
	{
		// Return some usefulls things.
		return {
			cells:  this.cells,
			width:  this.width,
			height: this.height,
		};
	};


	/**
	 * Exports
	 */
	return GatReader;
});