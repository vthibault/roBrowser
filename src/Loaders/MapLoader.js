/**
 * Loaders/MapLoader.js
 *
 * Loaders for Ragnarok Map
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['Core/FileManager'], function( FileManager )
{
	"use strict";


	/**
	 * MapLoader constructor
	 *
	 * @param {string} mapname
	 */
	function MapLoader( mapname )
	{
		if( mapname ) {
			this.load( mapname );
		}
	}


	/**
	 * Count files to load
	 * @var integer
	 */
	MapLoader.prototype.fileCount = 0;


	/**
	 * MapLoader Progress
	 * @var integer
	 */
	MapLoader.prototype.progress = 0;


	/**
	 * Offset in the progress
	 * @var integer
	 */
	MapLoader.prototype.offset = 0;


	/**
	 * MapLoader update progress
	 *
	 * @param {number} percent
	 */
	MapLoader.prototype.setProgress = function setProgress( percent )
	{
		var progress = Math.floor(percent);

		if( progress !== this.progress ) {
			postMessage({ type:'MAP_PROGRESS', data:progress });
			this.progress = progress;
		}
	};


	/**
	 * Load a map
	 *
	 * @param {string} mapname
	 */
	MapLoader.prototype.load = function Load( mapname )
	{
		// Initialize the loading
		this.setProgress( 0 );


		// Loading 3 main files
		this.world    = FileManager.load(mapname);
		this.setProgress( 1 );

		this.ground   = FileManager.load(this.world.files.gnd);
		this.setProgress( 2 );

		this.altitude = FileManager.load(this.world.files.gat);
		this.setProgress( 3 );

		// Compiling ground
		var CompiledGround = this.ground.compile( this.world.water.level, this.world.water.waveHeight );

		// Just to approximate, guess we have 2 textures for each models
		// To get a more linear loading
		this.fileCount = this.ground.textures.length + this.world.models.length * 3;

		// Add water to the list
		if( CompiledGround.waterVertCount ) {
			this.fileCount += 32;
		}

		// Loading Gound and Water textures
		this.loadGroundTextures( CompiledGround );

		// Sending data to main Thread
		postMessage({ type:'MAP_WORLD', data:   this.world.compile() });
		postMessage({ type:'MAP_GROUND', data:  CompiledGround });
		postMessage({ type:'MAP_ALTITUDE', data: this.altitude.compile() });

		// Loading models
		this.models = this.loadModels();
		postMessage({ type:'MAP_MODELS', data: this.models });

	};


	/**
	 * Loading Ground and Water textures
	 *
	 * @param {object} CompiledGround
	 */
	MapLoader.prototype.loadGroundTextures = function LoadGroundTextures( CompiledGround )
	{
		var i = 0, j = 0, count;
		var path;

		// Load water
		if( CompiledGround.waterVertCount ) {
			path = "data/texture/\xbf\xf6\xc5\xcd/water" + this.world.water.type;

			for(; i<32; ++i ) {
				this.world.water.images[i] = FileManager.load( path + ( i<10 ? "0"+i : i) + ".jpg", true );
				this.setProgress( 3 + 97 / this.fileCount * (i+1) );
			}
		}

		// Load ground textures
		for( count = this.ground.textures.length; j<count; ++j ) {
			CompiledGround.textures[j] = FileManager.load("data/texture/" + this.ground.textures[j], true );
			this.setProgress( 3 + 97 / this.fileCount * (i+j+1) );
		}

		this.offset = i + j;
	};


	/**
	 * Loading World Models
	 *
	 * @returns {object} compiled mesh
	 */
	MapLoader.prototype.loadModels = function LoadModels()
	{
		var i, count;
		var models;
		var Memory = {};
		var filename;

		models = this.world.models;
		count  = models.length;

		// Load each models
		for( i=0; i<count; ++i ) {
			filename = models[i].filename;

			// Don't load the same file twice
			if( !Memory[filename] ) {
				Memory[filename] = FileManager.load('data/model/' + filename, true);
			}

			// Create a new instance with specify informations
			// (position, rotation, scale, ...)
			Memory[filename].createInstance(
				models[i],
				this.ground.width,
				this.ground.height
			);

			this.setProgress( 3 + 97 / this.fileCount * (++this.offset) );
		}

		return this.compileModels( Memory );
	};


	/**
	 * Compile models to get mesh
	 *
	 * @param {object} Models list
	 */
	MapLoader.prototype.compileModels = function CompileModels( Models )
	{
		var progress = +this.progress;
		var i, count, j, size, k, len, total;
		var keys, filename, index, model, objects, meshes;

		total   = 0;
		keys    = Object.keys(Models);
		count   = keys.length;
		objects = [];

		// Compile all models
		for( i=0; i<count; ++i ) {
			filename = keys[i];
			model   = Models[filename].compile();
			size    = model.meshes.length;

			// Extract each mesh for each node
			for( j=0; j<size; ++j ) {
				meshes = model.meshes[j];

				index = Object.keys(meshes);
				len   = index.length;
				for( k = 0; k < len; ++k ) {
					objects.push({
						texture: model.textures[index[k]],
						alpha:   Models[filename].alpha,
						mesh:    meshes[index[k]]
					});

					total += meshes[index[k]].length;
				}
			}

			this.setProgress( progress + (100-progress) / count * (i+1) / 2 );
		}

		// Organize mesh by Textures alpha to avoid some problem in the render.
		objects.sort(this.sortMeshByTextures);

		// Merge mesh
		return this.mergeMeshes( objects, total);
	};


	/**
	 * Sort the Object by their textures
	 * To avoid some problem in the render, the textures with
	 * alpha opacity should be rendered first !
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {number}
	 */
	MapLoader.prototype.sortMeshByTextures = function SortMeshByTextures( a, b )
	{
		var reg_tga = /\.tga$/i;

		if( a.texture.match(reg_tga) ) {
			return  1;
		}

		if( b.texture.match(reg_tga) ) {
			return -1;
		}

		if( a.alpha !== b.alpha ) {
			return a.alpha < b.alpha ? 1 : 0;
		}

		if( a.texture < b.texture ) {
			return -1;
		}

		if( a.texture > b.texture ) {
			return 1;
		}

		return 0;
	};


	/**
	 * Merge objects using the same texture to avoid drawcall
	 *
	 * @param {Array} objects list
	 * @param {number} total
	 * @return {object} Compiled mesh
	 */
	MapLoader.prototype.mergeMeshes = function MergeMeshes( objects, total )
	{
		var buffer   = new Float32Array(total);
		var infos    = [];
		var object, last;
		var i, pos, count, offset, progress, length;

		count    = objects.length;
		pos      = 0;
		offset   = 0;
		progress = +this.progress;

		for ( i=0; i<count; ++i ) {
			object = objects[i];
			length = object.mesh.length;

			// Same texture, just change vertCount to save drawcall
			// and avoid loading multiple time the same texture.
			if( last === object.texture ) {
				infos[pos-1].vertCount += length / 9;
			}

			// Load the texture
			else {
				last   = object.texture;
				infos[pos++] = {
					texture:    FileManager.load( 'data/texture/' + last, true ),
					vertOffset: offset / 9,
					vertCount:  length / 9
				};
			}

			// Add to buffer
			buffer.set( object.mesh, offset );
			offset += length;

			this.setProgress( progress + (100-progress) / count * (i+1) );
		}

		return {
			buffer: buffer,
			infos:  infos
		};
	};


	/**
	 * Export
	 */
	return MapLoader;
});