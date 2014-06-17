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
	'use strict';


	/**
	 * Helper to load list
	 *
	 * @param {array} file list to load
	 */
	function Loader( list )
	{
		this.files  = list;
		this.list   = list.slice(0);
		this.offset = 0;
		this.count  = list.length;
		this.out    = new Array(this.count);
	}


	/**
	 * @var {number} static file count (avoid "too much recursion from firefox")
	 */
	Loader.count = 0;


	/**
	 * @var {number} How many files do you want to load at the same time ?
	 */
	Loader.prototype.parallelDownload = 6;


	/**
	 * Start to load the list
	 */
	Loader.prototype.start = function start()
	{
		var i;
		this.offset = 0;

		// No files...
		if (!this.list.length) {
			this.onload( this.list, this.list );
			return;
		}

		for (i = 0; i < this.count && i < this.parallelDownload; ++i) {
			this._next();
		}
	};


	/**
	 * Next file to load
	 *
	 * @param {number} index in list
	 */
	Loader.prototype._next = function next()
	{
		// Possible problem with setTimeout
		if (!this.list.length) {
			return;
		}

		var filename = this.list.shift();
		FileManager.load( filename, function(data) {

			// Store the result
			this.out[ this.files.indexOf(filename) ] = data;
			this.offset++;

			// Start the progress
			if (this.onprogress && this.offset <= this.count ) {
				this.onprogress( this.offset, this.count );
			}

			// Ended ?
			if (this.offset === this.count) {
				this.onload( this.out, this.files );
				return;
			}

			// Continue the queue
			if (this.list.length) {
				// To fix "too much recursion" on Firefox
				if ((++Loader.count) % 50 === 0) {
					setTimeout( this._next.bind(this), 4);
				}
				else {
					this._next();
				}
			}
		}.bind(this));
	};



	/**
	 * MapLoader constructor
	 *
	 * @param {string} mapname
	 */
	function MapLoader( mapname )
	{
		if (mapname) {
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
		var progress = Math.min(100, Math.floor(percent));

		if (progress !== this.progress) {
			if (this.onprogress) {
				this.onprogress(progress);
			}
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

		var loader = this;
		var world;

		//  Get file path (if it's a copy of a file)
		function getFilePath( path ) {
			if (path in FileManager.filesAlias) {
				return FileManager.filesAlias[path];
			}

			return path;
		}

		// loading world
		function onWorldReady(resourceWorld) {
			if (!resourceWorld) {
				loader.onload(false, 'Can\'t find file "' + mapname + '" ! ');
				return;
			}

			world = resourceWorld;
			loader.setProgress( 1 );

			// Load Altitude
			FileManager.load('data\\' + getFilePath(world.files.gat), onAltitudeReady);
		}

		// Loading altitude
		function onAltitudeReady(altitude) {
			if (!altitude) {
				loader.onload(false, 'Can\'t find file "' + world.files.gat + '" !');
				return;
			}

			loader.setProgress( 2 );
			loader.ondata('MAP_ALTITUDE', altitude.compile());

			FileManager.load('data\\' + getFilePath(world.files.gnd), onGroundReady);
		}

		// Load ground
		function onGroundReady(ground) {
			if (!ground) {
				loader.onload(false, 'Can\'t find file "' + world.files.gnd + '" !');
				return;
			}

			loader.setProgress( 3 );

			// Compiling ground
			var compiledGround = ground.compile( world.water.level, world.water.waveHeight );

			// Just to approximate, guess we have 2 textures for each models
			// To get a more linear loading
			loader.fileCount = ground.textures.length + world.models.length * 3;

			// Add water to the list
			if (compiledGround.waterVertCount) {
				loader.fileCount += 32;
			}

			// Loading Gound and Water textures
			loader.loadGroundTextures( world, compiledGround, function onLoaded(waters, textures) {
				world.water.images      = waters;
				compiledGround.textures = textures;

				loader.ondata('MAP_WORLD',  world.compile());
				loader.ondata('MAP_GROUND', compiledGround );

				// Start loading models
				loader.loadModels(world.models, ground);
			});
		}

		// Start loading World Resource file
		FileManager.load('data\\' + getFilePath(mapname), onWorldReady);
	};


	/**
	 * Loading Ground and Water textures
	 *
	 * @param {object} world resource file
	 * @param {object} compiledGround
	 * @param {function} callback
	 */
	MapLoader.prototype.loadGroundTextures = function LoadGroundTextures( world, ground, callback )
	{
		var i, count;
		var textures = [];

		// Get water textures
		if (ground.waterVertCount) {
			var path = 'data\\texture\\\xbf\xf6\xc5\xcd/water' + world.water.type;
			for (i = 0; i < 32; ++i) {
				textures.push(path + ( i<10 ? '0'+i : i) + '.jpg');
			}
		}

		// Load ground textures
		for (i = 0, count = ground.textures.length; i < count; ++i ) {
			textures.push('data\\texture\\' + ground.textures[i]);
		}

		// Start loading
		var loader = new Loader(textures);

		// On progress
		loader.onprogress = function OnProgress() {
			this.setProgress( 3 + 97 / this.fileCount * (++this.offset) );
		}.bind(this);

		// Once load
		loader.onload = function( textures ) {
			callback( textures.splice(0, ground.waterVertCount ? 32 : 0), textures );
		}.bind(this);

		// Start the queue
		loader.start();
	};


	/**
	 * Loading World Models
	 *
	 * @param {Array} model list
	 * @param {Ground}
	 * @returns {object} compiled mesh
	 */
	MapLoader.prototype.loadModels = function LoadModels( models, ground )
	{
		var i, count;
		var files = [];

		// Get a list of files to load
		for (i = 0, count = models.length; i < count; ++i) {
			models[i].filename = 'data\\model\\' + models[i].filename;

			if (files.indexOf(models[i].filename) < 0) {
				files.push(models[i].filename);
			}
		}

		var loader = new Loader(files);

		// Update the progressbar
		loader.onprogress = function(){
			this.setProgress( 3 + 97 / this.fileCount * (++this.offset) );
		}.bind(this);

		// Start creating instances
		loader.onload = function(objects, filenames){
			var i, count, pos;

			for (i = 0, count = models.length; i < count; ++i) {
				pos = filenames.indexOf(models[i].filename);

				// Duplicate from a model removed from list
				if (pos === -1) {
					continue;
				}

				// Because of a problem the model isn't load, remove it from the list
				if (!objects[pos] ) {
					objects.splice(pos, 1);
					filenames.splice(pos, 1);
					continue;
				}

				objects[pos].filename = filenames[pos];
				objects[pos].createInstance(
					models[i],
					ground.width,
					ground.height
				);
			}

			this.compileModels(objects);
		}.bind(this);

		// Start loading models
		loader.start();
	};


	/**
	 * Extract model meshes
	 *
	 * @param {Array} objects list
	 */
	MapLoader.prototype.compileModels = function CompileModels( objects )
	{
		var i, j, count, size, bufferSize;
		var object, nodes, meshes;
		var index;
		var progress = this.progress;
		var models = [];

		bufferSize = 0;

		for (i = 0, count = objects.length; i < count; ++i) {

			object = objects[i].compile();
			nodes  = object.meshes;

			for (j = 0, size = nodes.length; j < size; ++j) {

				meshes = nodes[j];

				for (index in meshes) {
					models.push({
						texture: 'data\\texture\\' + object.textures[index],
						alpha:   objects[i].alpha,
						mesh:    meshes[index]
					});

					bufferSize += meshes[index].length;
				}
			}

			this.setProgress( progress + (100-progress) / count * (i+1) / 2 );
		}

		// Merge mesh
		this.mergeMeshes( models, bufferSize);
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
	function SortMeshByTextures( a, b )
	{
		var reg_tga = /\.tga$/i;

		if (a.texture.match(reg_tga)) {
			return  1;
		}

		if (b.texture.match(reg_tga)) {
			return -1;
		}

		if (a.alpha !== b.alpha) {
			return a.alpha < b.alpha ? 1 : 0;
		}

		if (a.texture < b.texture) {
			return -1;
		}

		if (a.texture > b.texture) {
			return 1;
		}

		return 0;
	}


	/**
	 * Merge objects using the same texture to avoid drawcall
	 *
	 * @param {Array} objects list
	 * @param {number} BufferSize
	 */
	MapLoader.prototype.mergeMeshes = function MergeMeshes( objects, bufferSize )
	{
		var i, j, count, size, offset;
		var object, texture;
		var textures = [], infos = [];
		var buffer;

		var fcount = 1 / 9;
		var progress = this.progress;

		// Create buffer where to concat meshes
		buffer = new Float32Array(bufferSize);
		offset = 0;

		// Sort objects by textures type
		objects.sort(SortMeshByTextures);


		// Merge meshes
		for (i = 0, j = 0, count = objects.length; i < count; ++i) {

			object = objects[i];
			size   = object.mesh.length;

			// Same texture, just change vertCount to save drawcall
			// and avoid loading multiple time the same texture.
			if (texture === object.texture) {
				infos[j-1].vertCount += size * fcount;
			}

			// Load the texture
			else {
				texture = object.texture;
				textures.push(texture);

				infos[j++] = {
					filename:   texture,
					vertOffset: offset * fcount,
					vertCount:  size   * fcount
				};
			}

			// Add to buffer
			buffer.set( object.mesh, offset );
			offset += size;
		}


		// Load texture
		var loader = new Loader(textures);

		// On Progress
		loader.onprogress = function( index, count ){
			this.setProgress( progress + (100-progress) / count * (index+1) );
		}.bind(this);

		// Once texture loaded, push the textures
		// in the resulted mesh, and send it back
		loader.onload = function( textures, filenames ){
			var i, count, pos;

			for (i = 0, count = infos.length; i < count; ++i) {
				pos = filenames.indexOf(infos[i].filename);
				infos[i].texture = textures[pos];
			}

			this.ondata('MAP_MODELS', {
				buffer: buffer,
				infos:  infos
			});
			this.onload(true);

		}.bind(this);


		loader.start();
	};


	/**
	 * Export
	 */
	return MapLoader;
});