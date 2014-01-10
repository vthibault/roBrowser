/**
 * Core/FileManager.js
 *
 * Manage and load files
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(  ['Loaders/GameFile', 'Loaders/Targa', 'Loaders/LuaByte', 'Loaders/World', 'Loaders/Ground', 'Loaders/Altitude', 'Loaders/Model', 'Loaders/Sprite', 'Loaders/Action', 'Core/FileSystem'],
function(          GameFile,           Targa,           LuaByte,           World,           Ground,           Altitude,           Model,           Sprite,           Action,        FileSystem )
{
	"use strict";


	/**
	 * FileManager namespace
	 */
	var FileManager = {};


	/**
	 * Where is the remote client located ? 
	 * @var {string} http
	 */
	FileManager.remoteClient = "";


	/**
	 * List of Game Archives loads
	 * @var {array} GameFile[]
	 */
	FileManager.gameFiles = [];


	/**
	 * Initialize file manager with a list of files
	 *
	 * @param {mixed} grf list
	 */
	FileManager.init = function Init( grfList )
	{
		
		var i, count;
		var list = [];

		// load GRFs from a file (DATA.INI)
		if (typeof grfList === 'string') {
			var files = FileSystem.search( grfList );

			if (files.length) {
				var content = (new FileReaderSync()).readAsText(files[0]);

				var result;
				var regex = /(\d+)=([^\s]+)/g;

				// Get a list of GRF
				while (result = regex.exec(content)) {
					list[ parseInt(result[1]) ] = result[2];
				}
	
				// Remove empty slot from list
				for (i = 0, count = list.length; i < count; ) {
					if (list[i] == undefined) {
						list.splice(i, 1);
						count--;
						continue;
					}
					i++;
				}

				grfList = list;
			}

			else {
				grfList = /\.grf$/i;
			}
		}

		// Load grfs from a list defined by the user
		if (grfList instanceof Array) {
			list = grfList;
			for (i = 0, count = list.length; i < count; ++i) {
				list[i] = FileSystem.getFile( list[i] );
			}

			list.sort(function(a,b){
				return a.size - b.size;
			});
		}

		// Search GRF from a regex
		if (grfList instanceof RegExp) {
			list = FileSystem.search( grfList );
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
		if( !this.gameFiles.length && this.remoteClient ) {
			var req    = new XMLHttpRequest();
			req.open('POST', this.remoteClient, false);
			req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			req.overrideMimeType('text/plain; charset=ISO-8859-1');
			req.send('filter=' + encodeURIComponent(regex.source));
			return req.responseText.split("\n");
		}

		var i, count, j, size;
		var fileList, out, matches;

		fileList = this.gameFiles;
		count    = fileList.length;
		out      = {};

		for( i = 0; i < count; ++i ) {
			matches = fileList[i].table.data.match(regex);

			if ( matches !== null ) {
				// Remove duplicates
				for( j = 0, size = matches.length; j < size; ++j ) {
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
		var i, count;
		var path, buffer, file;
		var fileList;

		// GRF path is as window : dir\to\location.txt
		filename = filename.replace(/^\s+|\s+$/g, '');

		// Search in filesystem
		file = FileSystem.getFile(filename);
		if (file) {
			callback( (new FileReaderSync()).readAsArrayBuffer(file));
			return;
		}

		path     = filename.replace( /\//g, '\\');
		fileList = this.gameFiles;
		count    = fileList.length;

		for( i=0; i<count; ++i ) {
			if (fileList[i].getFile( path, callback)) {
				return;
			}
		}

		// Not in GRFs ? Try to load it from
		// remote client host
		this.getHTTP( filename, callback);
	};


	/**
	 * Trying to load a file from the remote host
	 *
	 * @param {string} filename
	 * @param {function} callback
	 */
	FileManager.getHTTP = function GetHTTP( filename, callback )
	{
		var xhr;

		// Use http request here (ajax)
		if( this.remoteClient ) {

			filename = filename.replace( /\\/g, '/');

			// Don't load mp3 sounds to avoid blocking the queue
			// They can be load by the HTML5 Audio / Flash directly.
			if( filename.match(/\.(mp3|wav)$/) ) {
				callback(this.remoteClient + filename);
				return;
			}

			xhr = new XMLHttpRequest();
			xhr.open('GET', this.remoteClient + filename, true);
			xhr.responseType = "arraybuffer";
			xhr.onload = function(){
				callback( xhr.response );
			};
			xhr.onerror = function(){
				callback( null, "Can't get file " + filename );
			};

			// Can throw an error if not connected to internet
			try {
				xhr.send(null);
			}
			catch(e) {
				callback( null, "Can't get file " + filename );
			}
		}

		return null;
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
		filename = filename.replace(/^\s+|\s+$/g, '');

		this.get( filename, function(buffer, error){
			var ext = filename.match(/.[^\.]+$/).toString().substr(1).toLowerCase();

			if (!buffer || !buffer.byteLength) {
				callback(null, error);
				return;
			}

			switch( ext ) {
	
				// Regular images files
				case 'jpg':
				case 'jpeg':
				case 'bmp':
				case 'gif':
				case 'png':
					callback(URL.createObjectURL(
						new Blob( [buffer], { type: "image/" + ext })
					));
					return;
	
				// Audio
				case 'wav':
				case 'mp3':
					// From GRF : change the data to an URI
					if( buffer instanceof ArrayBuffer ) {
						callback(URL.createObjectURL(
							new Blob( [buffer], { type: "audio/" + ext })
						));
						return;
					}
					//no break intended

				case 'tga':
					callback(buffer);
					return;

				// Texts
				case 'txt':
				case 'xml':
				case 'lua':
					var i, count, str, uint8;
					uint8 = new Uint8Array(buffer);
					count = uint8.length;
					str   = "";
	
					for ( i=0; i<count; ++i ) {
						if( uint8[i] === 0 ) {
							break;
						}
						str += String.fromCharCode( uint8[i] );
					}

					callback(str);
					return;
	
				// Sprite
				case 'spr':
					var spr = new Sprite(buffer);
					if( args && args.to_rgba ) {
						spr.switchToRGBA();
					}

					callback(spr.compile());
					return;
	
				// Binary
				case 'rsw':
					callback(new World(buffer));
					return;

				case 'gnd':
					callback(new Ground(buffer))
					return;

				case 'gat':
					callback(new Altitude(buffer));
					return;
	
				case 'rsm':
					callback(new Model(buffer));
					return;

				case 'act':
					callback(new Action(buffer).compile());
					return;

				case 'lub':
					callback(new LuaByte(buffer).reverse());
					return;
			}

		});
	};


	/**
	 * Export
	 */
	return FileManager;
});