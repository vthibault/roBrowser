/**
 * loaders/Ground.js
 *
 * Loaders for Gravity .gnd file (Ground)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['utils/BinaryReader', 'utils/gl-matrix'], function( BinaryReader, glMatrix )
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
	function GndReader( data )
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
	GndReader.prototype.load = function load( data )
	{
		this.fp     = new BinaryReader(data);
		var header  = this.fp.readBinaryString(4);

		if (header !== 'GRGN') {
			throw new Error('GND::load() - Invalid header "' + header + '"');
		}

		this.version  = this.fp.readUByte() + this.fp.readUByte()/10;
		this.width    = this.fp.readULong();
		this.height   = this.fp.readULong();
		this.zoom     = this.fp.readFloat();

		this.parseTextures();
		this.parseLightmaps();

		this.tiles    = this.parseTiles();
		this.surfaces = this.parseSurfaces();
	};


	/**
	 * Loading textures
	 */
	GndReader.prototype.parseTextures = function parseTextures()
	{
		var i, j, pos, count, length;
		var textures, indexes;
		var texture;

		count    = this.fp.readULong();
		length   = this.fp.readULong();
		indexes  = new Array(count);
		textures = [];

		for (i = 0, j = 0; i < count; ++i) {
			texture     = this.fp.readBinaryString(length);
			pos         = textures.indexOf(texture);

			if (pos === -1) {
				textures[j] = texture;
				pos = j;
				j++;
			}

			indexes[i] = pos;
		}

		this.textures       = textures;
		this.textureIndexes = indexes;
	};


	/**
	 * Parse Lightmap
	 *
	 * @return lightmap[][]
	 */
	GndReader.prototype.parseLightmaps = function parseLightmaps()
	{
		// Load info
		var fp       = this.fp;
		var count    = fp.readULong();
		var perCellX = fp.readLong();
		var perCellY = fp.readLong();
		var sizeCell = fp.readLong();
		var perCell  = perCellX * perCellY * sizeCell;

		this.lightmap = {
			perCell: perCell,
			count:   count,
			data:    new Uint8Array(fp.buffer, fp.offset, count * perCell * 4)
		};

		fp.seek( count * perCell * 4, BinaryReader.Seek.CUR);
	};


	/**
	 * Parse Tiles
	 *
	 * @return Tiles[]
	 */
	GndReader.prototype.parseTiles = function parseTiles()
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

		function generateAtlas(tile) {
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
				tiles[i].texture = this.textureIndexes[tiles[i].texture];
				generateAtlas(tiles[i]);
			}
		}

		return tiles;
	};


	/**
	 * Parse GND surfaces
	 *
	 * @return Surfaces[]
	 */
	GndReader.prototype.parseSurfaces = function parseSurfaces()
	{
		var i, count;
		var surfaces;
		var fp = this.fp;

		count    = this.width * this.height;
		surfaces = new Array(count);

		for (i = 0; i < count; ++i) {
			surfaces[i] = {
				height:  [ fp.readFloat()/5, fp.readFloat()/5, fp.readFloat()/5, fp.readFloat()/5 ],
				tileUp:    fp.readLong(),
				tileFront: fp.readLong(),
				tileRight: fp.readLong()
			};
		}

		return surfaces;
	};


	/**
	 * Create a large image_data array with all lightmaps
	 *
	 * @return {Uint8Array} pixels
	 */
	GndReader.prototype.createLightmapImage = function createLightmapImage()
	{
		var i, count, width, height, _width, _height, x, y, _x, _y, idx, pos, perCell;
		var lightmap, data, out;

		lightmap = this.lightmap;
		count    = lightmap.count;
		data     = lightmap.data;
		perCell  = lightmap.perCell;

		width     = Math.round( Math.sqrt(count) );
		height    = Math.ceil(  Math.sqrt(count) );
		_width    = Math.pow( 2, Math.ceil( Math.log(width * 8)/Math.log(2) ) );
		_height   = Math.pow( 2, Math.ceil( Math.log(height * 8)/Math.log(2) ) );

		out       = new Uint8Array(_width * _height * 4);

		for (i = 0; i < count; ++i) {
			pos   = i * 4 * perCell;
			x     = (i % width    ) * 8;
			y     = (i / width | 0) * 8;

			for (_x = 0; _x < 8; ++_x) {
				for (_y = 0; _y < 8; ++_y) {
					idx          = ((x + _x) + (y + _y) * _width) * 4;
					out[idx + 0] = data[pos + perCell + (_x + _y * 8) * 3 + 0] >> 4 << 4; // Posterisation
					out[idx + 1] = data[pos + perCell + (_x + _y * 8) * 3 + 1] >> 4 << 4; // Posterisation
					out[idx + 2] = data[pos + perCell + (_x + _y * 8) * 3 + 2] >> 4 << 4; // Posterisation
					out[idx + 3] = data[pos + (_x + _y * 8)];
				}
			}
		}

		return out;
	};


	/**
	 * Create a large image_data array with all tiles color
	 *
	 * @return {Uint8Array} pixels
	 */
	GndReader.prototype.createTilesColorImage = function createTilesColorImage()
	{
		var x, y, width, height;
		var data, cell, surfaces, tiles;

		width    = this.width;
		height   = this.height;
		surfaces = this.surfaces;
		tiles    = this.tiles;
		data     = new Uint8Array( width * height * 4 );

		for (y = 0; y < height; ++y) {
			for (x = 0; x < width; ++x) {
				cell = surfaces[x + y * width];

				// Check tile up
				if (cell.tileUp > -1) {
					data.set(tiles[cell.tileUp].color, (x + y * width) * 4);
				}
			}
		}

		return data;
	};


	/**
	 * Create ShadowMap data (only used to render shadow on Entities)
	 */
	GndReader.prototype.createShadowmapData = function createShadowmapData()
	{
		var width, height, x, y, i, j, index, perCell;
		var data, out, cell, tiles, surfaces;

		width    = this.width;
		height   = this.height;
		out      = new Uint8Array( (width * 8) * (height * 8) );
		data     = this.lightmap.data;
		perCell  = this.lightmap.perCell;
		tiles    = this.tiles;
		surfaces = this.surfaces;

		for (y = 0 ; y < height ; ++y) {
			for (x = 0; x < width; ++x) {

				cell = surfaces[x + y * width];

				if (cell.tileUp > -1 && tiles[ cell.tileUp ].light > -1) {
					index = tiles[ cell.tileUp ].light * 4 * perCell;

					for (i = 0; i < 8; ++i) {
						for (j = 0; j < 8; ++j) {
							out[ (x * 8 + i) + (y * 8 + j) * (width * 8) ] = data[index + i + j * 8];
						}
					}
				}

				// If no ground, shadow should be 1.0
				else {
					for (i = 0; i < 8; ++i) {
						for (j = 0; j < 8; ++j) {
							out[ (x * 8 + i) + (y * 8 + j) * (width * 8)] = 255;
						}
					}
				}
			}
		}

		return out;
	};



	/**
	 * Smooth ground normals
	 *
	 * @return normals[]
	 */
	GndReader.prototype.getSmoothNormal = function getSmoothNormal()
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
		var emptyVec = vec3.create();
		var tile, cell;

		// Calculate normal for each cells
		for (y = 0 ; y < height ; ++y) {
			for (x = 0; x < width; ++x) {

				tmp[ x + y * width ] = vec3.create();

				// Tile Up
				if (
					(cell=surfaces[ x + y * width ]).tileUp > -1 &&
					(tile=tiles[ cell.tileUp ]).texture > -1
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
				vec3.add( n[0], n[0], tmp[ ( x - 1 ) + ( y + 0 ) * width ] || emptyVec );
				vec3.add( n[0], n[0], tmp[ ( x - 1 ) + ( y - 1 ) * width ] || emptyVec  );
				vec3.add( n[0], n[0], tmp[ ( x + 0 ) + ( y - 1 ) * width ] || emptyVec  );
				vec3.normalize( n[0], n[0] );

				// Up Right
				vec3.add( n[1], n[1], tmp[ ( x + 0 ) + ( y + 0 ) * width ] );
				vec3.add( n[1], n[1], tmp[ ( x + 1 ) + ( y + 0 ) * width ] || emptyVec  );
				vec3.add( n[1], n[1], tmp[ ( x + 1 ) + ( y - 1 ) * width ] || emptyVec  );
				vec3.add( n[1], n[1], tmp[ ( x + 0 ) + ( y - 1 ) * width ] || emptyVec  );
				vec3.normalize( n[1], n[1] );

				// Bottom Right
				vec3.add( n[2], n[2], tmp[ ( x + 0 ) + ( y + 0 ) * width ] );
				vec3.add( n[2], n[2], tmp[ ( x + 1 ) + ( y + 0 ) * width ] || emptyVec  );
				vec3.add( n[2], n[2], tmp[ ( x + 1 ) + ( y + 1 ) * width ] || emptyVec  );
				vec3.add( n[2], n[2], tmp[ ( x + 0 ) + ( y + 1 ) * width ] || emptyVec  );
				vec3.normalize( n[2], n[2] );

				// Bottom Left
				vec3.add( n[3], n[3], tmp[ ( x + 0 ) + ( y + 0 ) * width ] );
				vec3.add( n[3], n[3], tmp[ ( x - 1 ) + ( y + 0 ) * width ] || emptyVec  );
				vec3.add( n[3], n[3], tmp[ ( x - 1 ) + ( y + 1 ) * width ] || emptyVec  );
				vec3.add( n[3], n[3], tmp[ ( x + 0 ) + ( y + 1 ) * width ] || emptyVec  );
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
	GndReader.prototype.compile = function compile(WATER_LEVEL, WATER_HEIGHT)
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
		var l_count_w  = Math.round( Math.sqrt(this.lightmap.count) );
		var l_count_h  = Math.ceil( Math.sqrt(this.lightmap.count) );
		var l_width    = Math.pow( 2, Math.ceil( Math.log(l_count_w*8)/Math.log(2) ) );
		var l_height   = Math.pow( 2, Math.ceil( Math.log(l_count_h*8)/Math.log(2) ) );
		function generateLightmapAtlas(i) {
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
				if (cell_a.tileUp > -1) {
					tile = tiles[ cell_a.tileUp ];
	
					// Check if has texture
					if (tile.texture > -1) {
						n = normals[ x + y * width ];
						generateLightmapAtlas( tile.light );

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
				if (cell_a.tileFront > -1) {
					tile = tiles[cell_a.tileFront];
	
					// Check if has texture
					if (tile.texture > -1 && surfaces[ x + (y+1) * width ]) {
						cell_b = surfaces[ x + (y+1) * width ];
						h_b    = cell_b.height;
						generateLightmapAtlas( tile.light );
	
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
				if (cell_a.tileRight > -1) {
					tile = tiles[cell_a.tileRight];
	
					// Check if has texture
					if (tile.texture > -1 && surfaces[ (x+1) + y * width ]) {
						cell_b = surfaces[ (x+1) + y * width ];
						h_b    = cell_b.height;
						generateLightmapAtlas( tile.light );
	
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
			lightmapSize:    this.lightmap.count,
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
	return GndReader;
});