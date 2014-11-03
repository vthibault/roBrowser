/**
 * Core/FileManager.js
 *
 * Manage and load files
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function( require )
{
	'use strict';


	// Load dependencies
	var GameFile   = require('Loaders/GameFile');
	var World      = require('Loaders/World');
	var Ground     = require('Loaders/Ground');
	var Altitude   = require('Loaders/Altitude');
	var Model      = require('Loaders/Model');
	var Sprite     = require('Loaders/Sprite');
	var Action     = require('Loaders/Action');
	var Str        = require('Loaders/Str');
	var FileSystem = require('Core/FileSystem');
	var fs         = self.requireNode && self.requireNode('fs');


	/**
	 * FileManager namespace
	 */
	var FileManager = {};


	/**
	 * Where is the remote client located ? 
	 * @var {string} http
	 */
	FileManager.remoteClient = '';


	/**
	 * List of Game Archives loads
	 * @var {array} GameFile[]
	 */
	FileManager.gameFiles = [];


	/**
	 * Files alias
	 * @var {object}
	 */
	FileManager.filesAlias = {};


	/**
	 * Initialize file manager with a list of files
	 *
	 * @param {mixed} grf list
	 */
	FileManager.init = function Init( grfList )
	{
		var content, files, result, regex;
		var i, count, sortBySize = true;
		var list = [];

		// load GRFs from a file (DATA.INI)
		if (typeof grfList === 'string') {
			if (fs) {
				content = fs.readFileSync(grfList);
			}
			else if ((files = FileSystem.search(grfList)).length) {
				content = (new FileReaderSync()).readAsText(files[0]);
			}
			else {
				grfList = /\.grf$/i;
			}

			if (content) {
				regex   = /(\d+)=([^\s]+)/g;

				// Get a list of GRF
				while ((result = regex.exec(content))) {
					list[ parseInt(result[1]) ] = result[2];
				}
	
				// Remove empty slot from list
				for (i = 0, count = list.length; i < count; ) {
					if (list[i] === undefined) {
						list.splice(i, 1);
						count--;
						continue;
					}
					i++;
				}

				grfList    = list;
				sortBySize = false;
			}
		}

		// Load grfs from a list defined by the user
		if (grfList instanceof Array) {
			list = grfList;
			for (i = 0, count = list.length; i < count; ++i) {
				if (fs && fs.existsSync(list[i])) {
					list[i] = {
						name: list[i],
						size: fs.statSync(list[i]).size,
						fd:   fs.openSync(list[i], 'r')
					};
					continue;
				}
				list[i] = FileSystem.getFileSync( list[i] );
			}
		}

		// Search GRF from a regex
		if (grfList instanceof RegExp) {
			list = FileSystem.search( grfList );
		}

		if (sortBySize) {
			list.sort(function(a,b){
				return a.size - b.size;
			});
		}

		// Load Game files
		for (i = 0, count = list.length; i < count; ++i) {
			FileManager.addGameFile(list[i]);
		}
	};


	/**
	 * Add a game archive to the list
	 *
	 * @param {File} file to load
	 */
	FileManager.addGameFile = function AddGameFile( file )
	{
		try {
			var grf = new GameFile();
			grf.load(file);
	
			this.gameFiles.push(grf);

			if (this.onGameFileLoaded) {
				this.onGameFileLoaded( file.name );
			}
		}
		catch(e) {
			if (this.onGameFileError) {
				this.onGameFileError( file.name, e.message );
			}
		}
	};


	/**
	 * Clean up Game files
	 */
	FileManager.clean = function Clean()
	{
		this.gameFiles.length = 0;
	};


	/**
	 * Search a file in each GameFile
	 *
	 * @param {RegExp} regex
	 * @return {Array} filename list
	 */
	FileManager.search = function Search( regex )
	{
		// Use hosted client (only one to be async ?)
		if (!this.gameFiles.length && this.remoteClient) {
			var req    = new XMLHttpRequest();
			req.open('POST', this.remoteClient, false);
			req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			req.overrideMimeType('text/plain; charset=ISO-8859-1');
			req.send('filter=' + encodeURIComponent(regex.source));
			return req.responseText.split('\n');
		}

		var i, count, j, size;
		var fileList, out, matches;

		fileList = this.gameFiles;
		count    = fileList.length;
		out      = {};

		for (i = 0; i < count; ++i) {
			matches = fileList[i].table.data.match(regex);

			if (matches !== null) {
				// Remove duplicates
				for (j = 0, size = matches.length; j < size; ++j) {
					out[ matches[j] ] = 1;
				}
			}
		}

		return Object.keys(out);
	};


	/**
	 * Get a file
	 *
	 * @param {string} filename
	 * @param {function} callback
	 */
	FileManager.get = function Get( filename, callback )
	{
		// Trim the path
		filename = filename.replace(/^\s+|\s+$/g, '');

		if (fs && fs.existsSync(filename)) {
			callback(fs.readFileSync(filename));
			return;
		}

		// Search in filesystem
		FileSystem.getFile(
			filename,

			// Found in file system, youhou !
			function onFound(file) {
				var reader = new FileReader();
				reader.onloadend = function onLoad(event){
					callback( event.target.result );
				};
				reader.readAsArrayBuffer(file);
			},

			// Not found, fetching files
			function onNotFound() {
				var i, count;
				var fileList;
				var path;

				path     = filename.replace( /\//g, '\\');
				fileList = FileManager.gameFiles;
				count    = fileList.length;

				for (i = 0; i < count; ++i) {
					if (fileList[i].getFile( path, callback)) {
						return;
					}
				}

				// Not in GRFs ? Try to load it from
				// remote client host
				FileManager.getHTTP( filename, callback);
			}
		);
	};


	/**
	 * Trying to load a file from the remote host
	 *
	 * @param {string} filename
	 * @param {function} callback
	 */
	FileManager.getHTTP = function GetHTTP( filename, callback )
	{
		// Use http request here (ajax)
		if (!this.remoteClient) {
			callback(null);
			return;
		}

		filename = filename.replace( /\\/g, '/');
		var url  = filename.replace(/[^//]+/g, function(a){return encodeURIComponent(a);});

		// Don't load mp3 sounds to avoid blocking the queue
		// They can be load by the HTML5 Audio / Flash directly.
		if (filename.match(/\.(mp3|wav)$/)) {
			callback(this.remoteClient + filename);
			return;
		}

		var xhr = new XMLHttpRequest();
		xhr.open('GET', this.remoteClient + url, true);
		xhr.responseType = 'arraybuffer';
		xhr.onload = function(){
			if (xhr.status == 200) {
				callback( xhr.response );
				FileSystem.saveFile( filename, xhr.response );
			}
			else {
				callback( null, 'Can\'t get file');
			}
		};
		xhr.onerror = function(){
			callback( null, 'Can\'t get file');
		};

		// Can throw an error if not connected to internet
		try {
			xhr.send(null);
		}
		catch(e) {
			callback( null, 'Can\'t get file');
		}
	};


	/**
	 * Load a file
	 *
	 * @param {string} filename
	 * @param {function} callback
	 * @return {string|object}
	 */
	FileManager.load = function Load( filename, callback, args )
	{
		if (!filename) {
			callback(null, 'undefined ?');
			return;
		}

		filename = filename.replace(/^\s+|\s+$/g, '');

		this.get( filename, function(buffer, error){
			var ext    = filename.match(/.[^\.]+$/).toString().substr(1).toLowerCase();
			var result = null;

			if (!buffer || buffer.byteLength === 0) {
				callback(null, error);
				return;
			}

			error  = null;

			try {
				switch (ext) {

					// Regular images files
					case 'jpg':
					case 'jpeg':
					case 'bmp':
					case 'gif':
					case 'png':
						result = URL.createObjectURL(
							new Blob( [buffer], { type: 'image/' + ext })
						);
						break;

					// Audio
					case 'wav':
					case 'mp3':
					case 'ogg':
						// From GRF : change the data to an URI
						if (buffer instanceof ArrayBuffer) {
							result = URL.createObjectURL(
								new Blob( [buffer], { type: 'audio/' + ext })
							);
							break;
						}
						result = buffer;
						break;

					case 'tga':
						result = buffer;
						break;

					// Texts
					case 'txt':
					case 'xml':
					case 'lua':
						var i, count, str, uint8;
						uint8 = new Uint8Array(buffer);
						count = uint8.length;
						str   = '';

						for (i = 0; i < count; ++i) {
							if (uint8[i] === 0) {
								break;
							}
							str += String.fromCharCode( uint8[i] );
						}

						result = str;
						break;

					// Sprite
					case 'spr':
						var spr = new Sprite(buffer);
						if (args && args.to_rgba) {
							spr.switchToRGBA();
						}

						result = spr.compile();
						break;

					// Binary
					case 'rsw':
						result = new World(buffer);
						break;

					case 'gnd':
						result = new Ground(buffer);
						break;

					case 'gat':
						result = new Altitude(buffer);
						break;

					case 'rsm':
						result = new Model(buffer);
						break;

					case 'act':
						result = new Action(buffer).compile();
						break;

					case 'str':
						result = new Str(buffer);
						break;

					default:
						result = buffer;
						break;
				}
			}

			catch(e) {
				error = e.message;
			}

			callback( result, error );
		});
	};


	/**
	 * Export
	 */
	return FileManager;
});
