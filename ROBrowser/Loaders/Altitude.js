/**
 * Loaders/Altitude.js
 *
 * Loaders for Gravity .gat file (Ground Altitude)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['Utils/BinaryReader'], function( BinaryReader )
{
	"use strict";


	/**
	 * Altitude Constructor
	 *
	 * @param {ArrayBuffer} data
	 */
	function GAT( data )
	{
		if( data ) {
			this.load( data );
		}
	}


	/**
	 * Cell known type
	 */
	GAT.TYPE = {
		NONE:     1 << 0,
		WALKABLE: 1 << 1,
		WATER:    1 << 2,
		SNIPABLE: 1 << 3
	};


	/**
	 * Taken from *athena at src/map/map.c
	 * I don't know if it's a good source but it's a good idea to match this references for now
	 */
	GAT.TYPE_TABLE = {
		0: GAT.TYPE.WALKABLE | GAT.TYPE.SNIPABLE,                  // walkable ground
		1: GAT.TYPE.NONE,                                          // non-walkable ground
		2: GAT.TYPE.WALKABLE | GAT.TYPE.SNIPABLE,                  // ???
		3: GAT.TYPE.WALKABLE | GAT.TYPE.SNIPABLE | GAT.TYPE.WATER, // walkable water
		4: GAT.TYPE.WALKABLE | GAT.TYPE.SNIPABLE,                  // ???
		5: GAT.TYPE.SNIPABLE,                                      // gat (snipable)
		6: GAT.TYPE.WALKABLE | GAT.TYPE.SNIPABLE                   // ???
	};


	/**
	 * Load a GAT file
	 *
	 * @param {ArrayBuffer} data
	 */
	GAT.prototype.load = function Load( data )
	{
		var fp, header, cells;
		var version, width, height, i, count;

		fp        = new BinaryReader(data);
		header    = fp.readString(4);

		// Well, the file should be a gat file, noh ?
		if ( header !== "GRAT" ) {
			throw new Error("GAT::load() - Invalid header '"+ header + "', must be 'GRAT'");
		}

		// Load parameters
		version   = fp.readUByte() + fp.readUByte()/10;
		width     = fp.readULong();
		height    = fp.readULong();
		cells     = new Float32Array(width * height * 5);

		// Load the cells
		for ( i=0, count=width*height; i<count; ++i ) {
			// Creating x objects is too slow to send with postMessage...
			// So just generate a float32array (10 times faster)
			cells[i * 5 + 0] = fp.readFloat() * 0.2;           // height 1
			cells[i * 5 + 1] = fp.readFloat() * 0.2;           // height 2
			cells[i * 5 + 2] = fp.readFloat() * 0.2;           // height 3
			cells[i * 5 + 3] = fp.readFloat() * 0.2;           // height 4
			cells[i * 5 + 4] = GAT.TYPE_TABLE[fp.readULong()]; // type
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
	GAT.prototype.compile = function Compile()
	{
		var width, height, n, x, y, r, g, b, i = 1;
		var cells, colors, mesh;

		// Some shortcut
		width  = this.width ;
		height = this.height;
		cells  = this.cells;

		// Initialised array
		colors = new Array(cells.length/5); // Maximum cells possible
		mesh   = [];

		// Create a mesh with unique color for each cell (to get the mouse pos easily).
		// It seems that complex maths in javascript (ray) is a little slow to get the mouse coord, here a
		// method to display all cells with uniques colors. So:
		// - Draw the mesh
		// - Get the pixel in xy pos
		// - Get the cell xy from the pixel color.
		// - clean framebuffer

		for ( y=2; y<height-2; ++y ) {
			for ( x=2; x<width-2; ++x ) {
				n = (x + y * width) * 5;

				if ( cells[n+4] & GAT.TYPE.WALKABLE ) { // type
					colors[i] = [ x, y ];
					r         = (0xFF & (i     ))/255;
					g         = (0xFF & (i >> 8))/255;
					b         = (0xFF & (i >>16))/255;

					// Hard coded the height/5 part.
					mesh.push(
						(x+0), cells[n+0], (y+0), r, g, b,
						(x+1), cells[n+1], (y+0), r, g, b,
						(x+1), cells[n+3], (y+1), r, g, b,
						(x+1), cells[n+3], (y+1), r, g, b,
						(x+0), cells[n+2], (y+1), r, g, b,
						(x+0), cells[n+0], (y+0), r, g, b
					);

					i++;
				}
			}
		}

		// Remove unused slots.
		colors.length = i;

		// Return some usefulls things.
		return {
			mesh:         new Float32Array(mesh),
			vertCount:    mesh.length/6,
			cells:        cells,
			width:        width,
			height:       height,
			colors:       colors
		};
	};


	/**
	 * Exports
	 */
	return GAT;
});