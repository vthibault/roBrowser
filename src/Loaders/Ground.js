/**
 * Loaders/Ground.js
 *
 * Loaders for Gravity .gnd file (Ground)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['Utils/BinaryReader', 'Utils/gl-matrix'], function( BinaryReader, glMatrix )
{
	'use strict';


	/**
	 * Import
	 */
	var vec3 = glMatrix.vec3;
	var vec4 = glMatrix.vec4;


	/**
	 * Ground class loader
	 *
	 * @param {ArrayBuffer} data - optional
	 */
	function GND( data )
	{
		if (data) {
			this.load(data);
		}
	}

	
	/**
	 * Load file
	 *
	 * @param {ArrayBuffer} data
	 */
	GND.prototype.load = function load( data )
	{
		this.fp     = new BinaryReader(data);
		var header  = this.fp.readString(4);

		if (header !== 'GRGN') {
			throw new Error('GND::load() - Invalid header "' + header + '"');
		}

		this.version  = this.fp.readUByte() + this.fp.readUByte()/10;
		this.width    = this.fp.readULong();
		this.height   = this.fp.readULong();
		this.zoom     = this.fp.readFloat();

		this.textures = this.parseTextures();
		this.lightmap = this.parseLightmaps();

		this.tiles    = this.parseTiles();
		this.surfaces = this.parseSurfaces();
	};


	/**
	 * Loading textures
	 *
	 * @return string[] textures
	 */
	GND.prototype.parseTextures = function parseTextures()
	{
		var i, count, length;
		var textures;

		count    = this.fp.readULong();
		length   = this.fp.readULong();
		textures = new Array(count);

		for (i = 0 ; i < count; ++i) {
			textures[i] = this.fp.readString(length);
		}

		return textures;
	};


	/**
	 * Parse Lightmap
	 *
	 * @return lightmap[][]
	 */
	GND.prototype.parseLightmaps = function parseLightmaps()
	{
		var i, j, count, per_cell_x, per_cell_y, size_cell, per_cell;
		var lightmaps;

		var fp = this.fp;

		// Load info
		count       = fp.readULong();
		per_cell_x  = fp.readLong();
		per_cell_y  = fp.readLong();
		size_cell   = fp.readLong();
		per_cell    = per_cell_x * per_cell_y * size_cell;
		lightmaps   = new Array(count);

		// Read them all
		for (i = 0; i < count; ++i) {
			lightmaps[i] = new Uint8Array(per_cell*4);

			for (j = 0; j < per_cell; ++j) {
				lightmaps[i][j*4+3] = fp.readUByte();
			}

			for (j = 0; j < per_cell; ++j) {
				lightmaps[i][j*4+0] = fp.readUByte();
				lightmaps[i][j*4+1] = fp.readUByte();
				lightmaps[i][j*4+2] = fp.readUByte();
			}
		}

		return lightmaps;
	};


	/**
	 * Parse Tiles
	 *
	 * @return Tiles[]
	 */
	GND.prototype.parseTiles = function parseTiles()
	{
		var i, count;
		var tiles;
		var fp = this.fp;

		count = fp.readULong();
		tiles = new Array(count);

		// Texture atlas stuff
		var ATLAS_COLS         = Math.round( Math.sqrt(this.textures.length) );
		var ATLAS_ROWS         = Math.ceil( Math.sqrt(this.textures.length) );
		var ATLAS_WIDTH        = Math.pow( 2, Math.ceil( Math.log(ATLAS_COLS*258)/Math.log(2) ) );
		var ATLAS_HEIGHT       = Math.pow( 2, Math.ceil( Math.log(ATLAS_ROWS*258)/Math.log(2) ) );
		var ATLAS_FACTOR_U     = (ATLAS_COLS * 258 ) / ATLAS_WIDTH;
		var ATLAS_FACTOR_V     = (ATLAS_ROWS * 258 ) / ATLAS_HEIGHT;
		var ATLAS_PX_U         = 1/258;
		var ATLAS_PX_V         = 1/258;

		function ATLAS_GENERATE(tile) {
			var u   = tile.texture % ATLAS_COLS;
			var v   = Math.floor(tile.texture / ATLAS_COLS);
			tile.u1 = (u + tile.u1 * (1-ATLAS_PX_U*2) + ATLAS_PX_U) * ATLAS_FACTOR_U / ATLAS_COLS;
			tile.u2 = (u + tile.u2 * (1-ATLAS_PX_U*2) + ATLAS_PX_U) * ATLAS_FACTOR_U / ATLAS_COLS;
			tile.u3 = (u + tile.u3 * (1-ATLAS_PX_U*2) + ATLAS_PX_U) * ATLAS_FACTOR_U / ATLAS_COLS;
			tile.u4 = (u + tile.u4 * (1-ATLAS_PX_U*2) + ATLAS_PX_U) * ATLAS_FACTOR_U / ATLAS_COLS;
			tile.v1 = (v + tile.v1 * (1-ATLAS_PX_V*2) + ATLAS_PX_V) * ATLAS_FACTOR_V / ATLAS_ROWS;
			tile.v2 = (v + tile.v2 * (1-ATLAS_PX_V*2) + ATLAS_PX_V) * ATLAS_FACTOR_V / ATLAS_ROWS;
			tile.v3 = (v + tile.v3 * (1-ATLAS_PX_V*2) + ATLAS_PX_V) * ATLAS_FACTOR_V / ATLAS_ROWS;
			tile.v4 = (v + tile.v4 * (1-ATLAS_PX_V*2) + ATLAS_PX_V) * ATLAS_FACTOR_V / ATLAS_ROWS;
		}

		// Read Tiles
		for (i = 0; i < count; ++i) {
			tiles[i] = {
				u1: fp.readFloat(),  u2: fp.readFloat(),  u3: fp.readFloat(),  u4: fp.readFloat(),
				v1: fp.readFloat(),  v2: fp.readFloat(),  v3: fp.readFloat(),  v4: fp.readFloat(),
				texture: fp.readShort(),
				light:   fp.readShort(),
				color:  [
					fp.readUByte(),
					fp.readUByte(),
					fp.readUByte(),
					fp.readUByte()
				]
			};

			// Generate texture atlas only if having texture on the cell.
			if (tiles[i].texture > -1) {
				ATLAS_GENERATE(tiles[i]);
			}
		}

		return tiles;
	};


	/**
	 * Parse GND surfaces
	 *
	 * @return Surfaces[]
	 */
	GND.prototype.parseSurfaces = function parseSurfaces()
	{
		var i, count;
		var surfaces;
		var fp = this.fp;

		count    = this.width * this.height;
		surfaces = new Array(count);

		for (i = 0; i < count; ++i) {
			surfaces[i] = {
				height:   [ fp.readFloat()/5, fp.readFloat()/5, fp.readFloat()/5, fp.readFloat()/5 ],
				tile_up:    fp.readLong(),
				tile_front: fp.readLong(),
				tile_right: fp.readLong()
			};
		}

		return surfaces;
	};


	/**
	 * Create a large image_data array with all lightmaps
	 *
	 * @return {Uint8Array} pixels
	 */
	GND.prototype.createLightmapImage = function createLightmapImage()
	{
		var lightmaps;
		var i, count, width, height, x, y, _x, _y, idx;
		var data, light;
		var _width, _height;

		lightmaps = this.lightmap;
		count     = lightmaps.length;
		width     = Math.round( Math.sqrt(count) );
		height    = Math.ceil(  Math.sqrt(count) );
		_width    = Math.pow( 2, Math.ceil( Math.log(width * 8)/Math.log(2) ) );
		_height   = Math.pow( 2, Math.ceil( Math.log(height * 8)/Math.log(2) ) );
		data      = new Uint8Array( _width * _height * 4 );

		for (i = 0; i < count; ++i) {
			light = lightmaps[i];
			x     = (i % width    ) * 8;
			y     = (i / width | 0) * 8;

			for (_x = 0; _x < 8; ++_x) {
				for (_y = 0; _y < 8; ++_y) {
					idx = ( ( x + _x ) + ( y + _y ) * _width ) * 4 ;
					data[ idx + 0 ] = light[ ( _x + _y * 8 ) * 4 + 0 ] >> 4 << 4 ; // Posterisation
					data[ idx + 1 ] = light[ ( _x + _y * 8 ) * 4 + 1 ] >> 4 << 4 ;
					data[ idx + 2 ] = light[ ( _x + _y * 8 ) * 4 + 2 ] >> 4 << 4 ;
					data[ idx + 3 ] = light[ ( _x + _y * 8 ) * 4 + 3 ];
				}
			}
		}

		return data;
	};


	/**
	 * Create a large image_data array with all tiles color
	 *
	 * @return {Uint8Array} pixels
	 */
	GND.prototype.createTilesColorImage = function createTilesColorImage()
	{
		var x, y, width, height, i;
		var data, c, cell, surfaces, tiles;

		width    = this.width;
		height   = this.height;
		surfaces = this.surfaces;
		tiles    = this.tiles;
		data     = new Uint8Array( width * height * 4 );

		for (y = 0; y < height; ++y) {
			for (x = 0; x < width; ++x) {
				cell = surfaces[ x + y * width ];

				// Check tile up
				if (cell.tile_up > -1) {
					i = ( x + y * width ) * 4;
					c = tiles[ cell.tile_up ].color;

					data[i+0] = c[2];
					data[i+1] = c[1];
					data[i+2] = c[0];
					data[i+3] = c[3];
				}
			}
		}

		return data;
	};


	/**
	 * Create ShadowMap data (only used to render shadow on Entities)
	 */
	GND.prototype.createShadowmapData = function createShadowmapData()
	{
		var width  = this.width;
		var height = this.height;
		var data   = new Uint8Array( (width * 8) * (height * 8) );
		var cell, lightmap;
		var x, y, i, j;

		for (y = 0 ; y < height ; ++y) {
			for (x = 0; x < width; ++x) {

				cell = this.surfaces[ x + y * width ];

				if (cell.tile_up > -1 && this.tiles[ cell.tile_up ].light > -1) {
					lightmap = this.lightmap[ this.tiles[ cell.tile_up ].light ];

					for (i = 0; i < 8; ++i) {
						for (j = 0; j < 8; ++j) {
							data[ ( x * 8 + i ) + ( y * 8 + j ) * ( width * 8) ] = lightmap[ ( i + j * 8 ) * 4 + 3 ];
						}
					}
				}

				// If no ground, shadow should be 1.0
				else {
					for (i = 0; i < 8; ++i) {
						for (j = 0; j < 8; ++j) {
							data[ ( x * 8 + i ) + ( y * 8 + j ) * ( width * 8) ] = 255;
						}
					}
				}
			}
		}

		return data;
	};



	/**
	 * Smooth ground normals
	 *
	 * @return normals[]
	 */
	GND.prototype.getSmoothNormal = function getSmoothNormal()
	{
		var x, y;
		var surfaces = this.surfaces;
		var tiles    = this.tiles;
		var width    = this.width;
		var height   = this.height;
		var a = vec3.create(), b = vec3.create(), c = vec3.create(), d = vec3.create(), n;
		var count    = width * height;
		var tmp      = new Array(count);
		var normals  = new Array(count);
		var empty_vec = vec3.create();
		var tile, cell;

		// Calculate normal for each cells
		for (y = 0 ; y < height ; ++y) {
			for (x = 0; x < width; ++x) {

				tmp[ x + y * width ] = vec3.create();

				// Tile Up
				if (
					(cell=surfaces[ x + y * width ]).tile_up > -1 &&
					(tile=tiles[ cell.tile_up ]).texture > -1
				) {
					a[0] = (x+0)*2;  a[1] = cell.height[0];  a[2] = (y+0)*2;
					b[0] = (x+1)*2;  b[1] = cell.height[1];  b[2] = (y+0)*2;
					c[0] = (x+1)*2;  c[1] = cell.height[3];  c[2] = (y+1)*2;
					d[0] = (x+0)*2;  d[1] = cell.height[2];  d[2] = (y+1)*2;

					vec4.calcNormal( a, b, c, d, tmp[ x + y * width ] );
				}
			}
		}

		// Smooth normals
		for (y = 0 ; y < height ; ++y) {
			for (x = 0; x < width; ++x) {

				n = normals[ x + y * width ] = [ [0,0,0], [0,0,0], [0,0,0], [0,0,0] ];

				// Up Left
				vec3.add( n[0], n[0], tmp[ ( x + 0 ) + ( y + 0 ) * width ] );
				vec3.add( n[0], n[0], tmp[ ( x - 1 ) + ( y + 0 ) * width ] || empty_vec );
				vec3.add( n[0], n[0], tmp[ ( x - 1 ) + ( y - 1 ) * width ] || empty_vec  );
				vec3.add( n[0], n[0], tmp[ ( x + 0 ) + ( y - 1 ) * width ] || empty_vec  );
				vec3.normalize( n[0], n[0] );

				// Up Right
				vec3.add( n[1], n[1], tmp[ ( x + 0 ) + ( y + 0 ) * width ] );
				vec3.add( n[1], n[1], tmp[ ( x + 1 ) + ( y + 0 ) * width ] || empty_vec  );
				vec3.add( n[1], n[1], tmp[ ( x + 1 ) + ( y - 1 ) * width ] || empty_vec  );
				vec3.add( n[1], n[1], tmp[ ( x + 0 ) + ( y - 1 ) * width ] || empty_vec  );
				vec3.normalize( n[1], n[1] );

				// Bottom Right
				vec3.add( n[2], n[2], tmp[ ( x + 0 ) + ( y + 0 ) * width ] );
				vec3.add( n[2], n[2], tmp[ ( x + 1 ) + ( y + 0 ) * width ] || empty_vec  );
				vec3.add( n[2], n[2], tmp[ ( x + 1 ) + ( y + 1 ) * width ] || empty_vec  );
				vec3.add( n[2], n[2], tmp[ ( x + 0 ) + ( y + 1 ) * width ] || empty_vec  );
				vec3.normalize( n[2], n[2] );

				// Bottom Left
				vec3.add( n[3], n[3], tmp[ ( x + 0 ) + ( y + 0 ) * width ] );
				vec3.add( n[3], n[3], tmp[ ( x - 1 ) + ( y + 0 ) * width ] || empty_vec  );
				vec3.add( n[3], n[3], tmp[ ( x - 1 ) + ( y + 1 ) * width ] || empty_vec  );
				vec3.add( n[3], n[3], tmp[ ( x + 0 ) + ( y + 1 ) * width ] || empty_vec  );
				vec3.normalize( n[3], n[3] );

			}
		}

		return normals;
	};


	/**
	 * Compile GND file
	 *
	 * @param {number} WATER_LEVEL
	 * @param {number} WATER_HEIGHT
	 * @return object export
	 */
	GND.prototype.compile = function compile(WATER_LEVEL, WATER_HEIGHT)
	{
		// Shortcut access
		var width    = this.width,    height = this.height;
		var surfaces = this.surfaces, tiles  = this.tiles;

		// Normals
		var normals  = this.getSmoothNormal();

		// Pre-defined vars
		var tile, cell_a, cell_b, n, h_a, h_b;
		var x, y;

		// Water
		var water = [], mesh = [];


		// Lightmap Stuff
		var l = {};
		var lightmap   = this.createLightmapImage();
		var l_count_w  = Math.round( Math.sqrt(this.lightmap.length) );
		var l_count_h  = Math.ceil( Math.sqrt(this.lightmap.length) );
		var l_width    = Math.pow( 2, Math.ceil( Math.log(l_count_w*8)/Math.log(2) ) );
		var l_height   = Math.pow( 2, Math.ceil( Math.log(l_count_h*8)/Math.log(2) ) );
		function lightmap_atlas(i) {
			l.u1 = ( ((i % l_count_w    ) + 0.125) / l_count_w ) * ( (l_count_w*8)/l_width  );
			l.u2 = ( ((i % l_count_w    ) + 0.875) / l_count_w ) * ( (l_count_w*8)/l_width  );
			l.v1 = ( ((i / l_count_w | 0) + 0.125) / l_count_h ) * ( (l_count_h*8)/l_height );
			l.v2 = ( ((i / l_count_w | 0) + 0.875) / l_count_h ) * ( (l_count_h*8)/l_height );
		}


		// Compiling mesh
		for (y = 0 ; y < height ; ++y) {
			for (x = 0; x < width; ++x) {

				cell_a = surfaces[ x + y * width ];
				h_a    = cell_a.height;
	
				// Check tile up
				if (cell_a.tile_up > -1) {
					tile = tiles[ cell_a.tile_up ];
	
					// Check if has texture
					if (tile.texture > -1) {
						n = normals[ x + y * width ];
						lightmap_atlas( tile.light );

						mesh.push(
							//      vec3 pos           |        vec3 normals          |     vec2 texcoords     |  vec2 lightcoord  |      vec2 tileCoords
							(x+0)*2, h_a[0], (y+0)*2,    n[0][0], n[0][1], n[0][1],       tile.u1, tile.v1,          l.u1, l.v1,      (x+0.5)/width, (y+0.5)/height,
							(x+1)*2, h_a[1], (y+0)*2,    n[1][0], n[1][1], n[1][1],       tile.u2, tile.v2,          l.u2, l.v1,      (x+1.5)/width, (y+0.5)/height,
							(x+1)*2, h_a[3], (y+1)*2,    n[2][0], n[2][1], n[2][1],       tile.u4, tile.v4,          l.u2, l.v2,      (x+1.5)/width, (y+1.5)/height,
							(x+1)*2, h_a[3], (y+1)*2,    n[2][0], n[2][1], n[2][1],       tile.u4, tile.v4,          l.u2, l.v2,      (x+1.5)/width, (y+1.5)/height,
							(x+0)*2, h_a[2], (y+1)*2,    n[3][0], n[3][1], n[3][1],       tile.u3, tile.v3,          l.u1, l.v2,      (x+0.5)/width, (y+1.5)/height,
							(x+0)*2, h_a[0], (y+0)*2,    n[0][0], n[0][1], n[0][1],       tile.u1, tile.v1,          l.u1, l.v1,      (x+0.5)/width, (y+0.5)/height
						);
					}

					// Add water only if it's upper than the ground.
					if (h_a[0] > WATER_LEVEL - WATER_HEIGHT ||
						h_a[1] > WATER_LEVEL - WATER_HEIGHT ||
						h_a[2] > WATER_LEVEL - WATER_HEIGHT ||
						h_a[3] > WATER_LEVEL - WATER_HEIGHT ) {
						water.push(
							//        vec3 pos            |            vec2 texcoords
							(x+0)*2, WATER_LEVEL, (y+0)*2,   ((x+0)%5/5),     ((y+0)%5/5),
							(x+1)*2, WATER_LEVEL, (y+0)*2,   ((x+1)%5/5)||1,  ((y+0)%5/5),
							(x+1)*2, WATER_LEVEL, (y+1)*2,   ((x+1)%5/5)||1,  ((y+1)%5/5)||1,
							(x+1)*2, WATER_LEVEL, (y+1)*2,   ((x+1)%5/5)||1,  ((y+1)%5/5)||1,
							(x+0)*2, WATER_LEVEL, (y+1)*2,   ((x+0)%5/5),     ((y+1)%5/5)||1,
							(x+0)*2, WATER_LEVEL, (y+0)*2,   ((x+0)%5/5),     ((y+0)%5/5)
						);
					}
				}
	
	
				// Check tile front
				if (cell_a.tile_front > -1) {
					tile = tiles[cell_a.tile_front];
	
					// Check if has texture
					if (tile.texture > -1 && surfaces[ x + (y+1) * width ]) {
						cell_b = surfaces[ x + (y+1) * width ];
						h_b    = cell_b.height;
						lightmap_atlas( tile.light );
	
						mesh.push(
							//      vec3 pos           |  vec3 normals     |    vec2 texcoords      |   vec2 lightcoord  |   vec2 tileCoords
							(x+0)*2, h_b[0], (y+1)*2,    0.0, 0.0, 1.0,        tile.u3, tile.v3,           l.u1, l.v2,           0, 0,
							(x+1)*2, h_a[3], (y+1)*2,    0.0, 0.0, 1.0,        tile.u2, tile.v2,           l.u2, l.v1,           0, 0,
							(x+1)*2, h_b[1], (y+1)*2,    0.0, 0.0, 1.0,        tile.u4, tile.v4,           l.u2, l.v2,           0, 0,
							(x+0)*2, h_b[0], (y+1)*2,    0.0, 0.0, 1.0,        tile.u3, tile.v3,           l.u1, l.v2,           0, 0,
							(x+1)*2, h_a[3], (y+1)*2,    0.0, 0.0, 1.0,        tile.u2, tile.v2,           l.u2, l.v1,           0, 0,
							(x+0)*2, h_a[2], (y+1)*2,    0.0, 0.0, 1.0,        tile.u1, tile.v1,           l.u1, l.v1,           0, 0
						);
					}
				}
	
	
				// Check tile right
				if (cell_a.tile_right > -1) {
					tile = tiles[cell_a.tile_right];
	
					// Check if has texture
					if (tile.texture > -1 && surfaces[ (x+1) + y * width ]) {
						cell_b = surfaces[ (x+1) + y * width ];
						h_b    = cell_b.height;
						lightmap_atlas( tile.light );
	
						mesh.push(
							//      vec3 pos           |  vec3 normals    |    vec2 texcoords      |   vec2 lightcoord   |    vec2 tileCoords
							(x+1)*2, h_a[1], (y+0)*2,    1.0, 0.0, 0.0,       tile.u2, tile.v2,          l.u2, l.v1,            0, 0,
							(x+1)*2, h_a[3], (y+1)*2,    1.0, 0.0, 0.0,       tile.u1, tile.v1,          l.u1, l.v1,            0, 0,
							(x+1)*2, h_b[0], (y+0)*2,    1.0, 0.0, 0.0,       tile.u4, tile.v4,          l.u2, l.v2,            0, 0,
							(x+1)*2, h_b[0], (y+0)*2,    1.0, 0.0, 0.0,       tile.u4, tile.v4,          l.u2, l.v2,            0, 0,
							(x+1)*2, h_b[2], (y+1)*2,    1.0, 0.0, 0.0,       tile.u3, tile.v3,          l.u1, l.v2,            0, 0,
							(x+1)*2, h_a[3], (y+1)*2,    1.0, 0.0, 0.0,       tile.u1, tile.v1,          l.u1, l.v1,            0, 0
						);
					}
				}
	
			}
		}

		// Return mesh informations
		return {
			width:           this.width,
			height:          this.height,
			textures:        this.textures,

			lightmap:        lightmap,
			lightmapSize:    this.lightmap.length,
			tileColor:       this.createTilesColorImage(),
			shadowMap:       this.createShadowmapData(),

			mesh:            new Float32Array(mesh),
			meshVertCount:   mesh.length/12,

			waterMesh:       new Float32Array(water),
			waterVertCount:  water.length/5
		};
	};

	/**
	 * Export
	 */
	return GND;
});