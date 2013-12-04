/**
 * Core/Client.js
 *
 * Client Manager
 * Manage client files, load GRFs, DATA.INI, extract files from GRFs, ...
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( [ 'Utils/Executable',  'Network/PacketVerManager',  './Thread',  './MemoryManager', 'Utils/Texture'],
function(        Executable,                  PACKETVER,       Thread,      Memory,                Texture)
{
	"use strict";


	/**
	 * Client files
	 * @var array files
	 */
	var _files = [];


	/**
	 * Initialize Client
	 * Load interesting files (executable, data.ini, GRFs, ...)
	 *
	 * @param {File[]} files to load
	 */
	function Init( files )
	{
		var i, count = files.length;
		window.ROConfig = window.ROConfig || {};

		// Move to global
		_files = files;

		// Find executable and set the packetver
		if( ROConfig.packetver && ROConfig.packetver.match(/^(executable|auto)$/i) ) {
			for( i=0; i<count; ++i ) {
				if( Executable.isROExec(files[i]) ) {
					Executable.getDate(files[i], function(date){
						// Avoid errors
						if( date > 20000000 ) {
							PACKETVER.min = date;
							PACKETVER.max = date;
						}
					});
					break;
				}
			}
		}

		// GRF Host config
		if( ROConfig.remoteClient ) {
			Thread.send( "SET_HOST", ROConfig.remoteClient );
		}

		// GRF List config
		var data_ini = ROConfig.grfList || 'data.ini';
		if( data_ini instanceof Array ) {
			LoadGRFsFiles(data_ini);
			return;
		} 

		// Find data.ini
		for( i = 0; i < count; ++i ) {
			if( files[i].name === data_ini ) {
				var reader    = new FileReader();
				reader.onload = ParseGRFListFile;
				reader.readAsText(files[i]);
				return;
			}
		}

		// No data.ini ? Load from a regex
		var regex;
		var list = [];
		var out  = [];

		if ( ROConfig.grfList && ROConfig.grfList instanceof RegExp ) {
			regex = ROConfig.grfList;
		}
		else {
			regex = /\.grf$/i;
		}

		// Find GRFs files
		for( i = 0; i < count; ++i ) {
			if( files[i].name.match(regex) ) {
				list.push( files[i] );
			}
		}

		if( list.length ) {
			// Guess list order based on size.
			list.sort(function(a,b){
				return a.size - b.size;
			});
			// Just get the names
			for( i = 0, count = list.length; i < count; ++i ) {
				out[i] = list[i].name;
			}
			LoadGRFsFiles(out);
			return;
		}

		console.warn('%cClient::init() - No grf files found.', 'color:red');
		Client.onFilesLoaded(0);
	}


	/**
	 * Parse DATA.INI file and load the GRFs
	 *
	 * @param event - File Event
	 */
	function ParseGRFListFile(event)
	{
		var regex = /(\d+)=([^\s]+)/g;
		var result, list = [];
		var i, count;

		// Get a list of GRF
		while( result = regex.exec(event.target.result) ) {
			list[ parseInt(result[1]) ] = result[2];
		}
	
		// Remove empty slot from list
		for( i=0, count = list.length; i<count; ) {
			if( list[i] == undefined ) {
				list.splice(i, 1);
				count--;
				continue;
			}
			i++;
		}
	
		// Start loading GRFs
		LoadGRFsFiles(list);
	}


	/**
	 * Load GRF Files
	 *
	 * @param {Array} grfs filenames
	 */
	function LoadGRFsFiles( grfs )
	{
		var _index = -1;
		var _total = grfs.length;
		var _count = _files.length;
		var load   = 0;
	
		if( !grfs.length ) {
			return;
		}

		Thread.send("CLEAN_GRF", null);
		console.info('Loading GRFs:', grfs);

		// TODO: using Queue ?
		// @param {boolean} success to load file
		// @param {string} error - optional
		function LoadNextGRF( success, error ) {
			_index++;
	
			// GRF loaded ?
			if( _index > 0 ) {
				console.info( success ? 'Success to load GRF file "' + grfs[_index-1] + '"' : ( error || 'Error loading GRF file' ) );
				load += success;
			}

			// Ending entry ?
			if( _index >= _total ) {
				Client.onFilesLoaded(load);
				return;
			}

			// Find the GRF and load it
			for( var i=0; i < _count; ++i ) {
				if( _files[i].name === grfs[_index] ) {
					LoadGRF( _files[i], LoadNextGRF );
					return;
				}
			}
	
			LoadNextGRF( false, 'Fail to find GRF file "'+ grfs[_index] +'"');
		}
	
		// Start the queue
		LoadNextGRF( true, '');
	}


	/**
	 * Load A GRF (Thread job)
	 *
	 * @param file
	 * @param callback
	 */
	function LoadGRF(file, callback)
	{
		Thread.send("LOAD_GRF", file, callback );
	}


	/**
	 * Get a file from Game Data files
	 *
	 * @param {string} filename
	 * @param {function} onload
	 * @param {function} onerror
	 * @param {Array} args - optional
	 */
	function getFile( filename, onload, onerror, args )
	{
		if( !Memory.exist(filename) ) {
			Thread.send(
				"GET_FILE",
				{
					filename: filename,
					args:     args || null
				},
				function(data, error)
				{
					Memory.set( filename, data, error);
				}
			);
		}

		return Memory.get( filename, onload, onerror );
	}


	/**
	 * Get files from Game Data files
	 *
	 * @param {string[]} filenames
	 * @param {function} callback once loaded
	 */
	function getFiles( filenames, callback ) {
		var i, count, index;
		var out;
	
		function onload( data ) {
			out[ index++ ] = data;
			if ( index === count && callback )
				callback.apply( null, out);
		}

		count  = filenames.length;
		out    = new Array(count);
		index  = 0;
	
		for ( i=0; i<count; ++i ) {
			getFile( filenames[i], onload, onload, [] );
		}
	}


	/**
	 * Get and load a file from Game Data files
	 *
	 * @param {string} filename
	 * @param {function} onload
	 * @param {function} onerror
	 * @param {Array} args - optional
	 */
	function loadFile( filename, onload, onerror, args )
	{
		if( !Memory.exist(filename) ) {
			Thread.send(
				"LOAD_FILE",
				{
					filename: filename,
					args:     args || null
				},
				function(data, error)
				{
					var i, count;
					var gl, frames, texture, palette;
					var precision, size;

					if( !error ) {
						switch( filename.substr(-3) ){
							// Remove magenta on textures
							case 'bmp':
								Texture( data, function(){
									Memory.set( filename, this.toDataURL(), error);
								});
								return;

							case 'spr':
								gl     = require('Renderer/Renderer').getContext();
								frames = data.frames;
								count  = frames.length;

								// Send sprites to GPU
								for( i = 0; i < count; i++ ) {
									frames[i].texture = gl.createTexture();
									precision  = frames[i].type ? gl.LINEAR : gl.NEAREST;
									size       = frames[i].type ? gl.RGBA   : gl.LUMINANCE;
									gl.bindTexture( gl.TEXTURE_2D, frames[i].texture );
									gl.texImage2D(gl.TEXTURE_2D, 0, size, frames[i].width, frames[i].height, 0, size, gl.UNSIGNED_BYTE, frames[i].data );
									gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, precision);
									gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, precision);
								}

								// Send palette to GPU
								data.texture = gl.createTexture();
								gl.bindTexture( gl.TEXTURE_2D, data.texture );
								gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data.palette );
								gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
								gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

								Memory.set( filename, data, error);
								break;

							// Build palette
							case 'pal':
								gl      = require('Renderer/Renderer').getContext();
								texture = gl.createTexture();
								palette = new Uint8Array(data);

								gl.bindTexture( gl.TEXTURE_2D, texture );
								gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, palette );
								gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
								gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
								gl.generateMipmap( gl.TEXTURE_2D );

								Memory.set( filename, { palette:palette, texture:texture }, error);
								return;
						}
					}

					Memory.set( filename, data, error);
				}
			);
		}

		return Memory.get( filename, onload, onerror );
	}


	/**
	 * Get and load files from Game Data files
	 *
	 * @param {string[]} filenames
	 * @param {function} callback once loaded
	 */
	function loadFiles( filenames, callback ) {
		var i, count, index;
		var out;
	
		function onload( data ) {
			out[ index++ ] = data;
			if ( index === count && callback )
				callback.apply( null, out);
		}

		count  = filenames.length;
		out    = new Array(count);
		index  = 0;
	
		for ( i=0; i<count; ++i ) {
			loadFile( filenames[i], onload, onload, [] );
		}
	}


	/**
	 * Apply a regex on fileList to search a file
	 *
	 * @param regex
	 * @param callback
	 */
	function search(regex, callback) {
		Thread.send(
			"SEARCH_FILE",
			regex,
			callback
		);
	}


	/**
	 * Export
	 */
	var Client = {
		init:          Init,
		addGRF:        LoadGRF,
		getFile:       getFile,
		getFiles:      getFiles,
		loadFile:      loadFile,
		loadFiles:     loadFiles,
		search:        search,
		onFilesLoaded: function OnFilesLoaded(){}
	};

	return Client;
});