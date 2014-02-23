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
	 * Initialize Client
	 * Load interesting files (executable, data.ini, GRFs, ...)
	 *
	 * @param {Array} FileList to load
	 */
	function Init( files )
	{
		var i, count;

		window.ROConfig = window.ROConfig || {};

		// Find executable and set the packetver
		if (!ROConfig.packetver || String(ROConfig.packetver).match(/^(executable|auto)$/i)) {
			for (i = 0, count = files.length; i < count; ++i) {
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
		else if (typeof ROConfig.packetver === "number") {
			PACKETVER.min = ROConfig.packetver;
			PACKETVER.max = ROConfig.packetver;
		}

		// GRF Host config
		if (ROConfig.remoteClient) {
			Thread.send( "SET_HOST", ROConfig.remoteClient );
		}

		// Save full client
		SavingFiles( files );
	}


	/**
	 * Saving fullclient files in filesystem, display a progressbar during the upload
	 *
	 * @param {Array} FileList
	 */
	function SavingFiles( files )
	{
		var progressbar = document.createElement('div');
		var info        = document.createElement('div');
		var last_tick   = Date.now();
		var list        = [];
		var i, count;

		if (files.length) {
			// Progressbar
			progressbar.style.position        = "fixed";
			progressbar.style.zIndex          = "2147483647";
			progressbar.style.top             = "0px";
			progressbar.style.left            = "0px";
			progressbar.style.backgroundColor = "rgb(180,0,0)";
			progressbar.style.transition      = "width 500ms linear";
			progressbar.style.width           = "0px";
			progressbar.style.height          = "3px";
			progressbar.onmouseover = function(){ info.style.display = 'block'; };
			progressbar.onmouseout  = function(){ info.style.display = 'none' ; };

			// Progress text on hover "Saving fullclient... (x%)"
			info.textContent                   = "Saving fullclient... (0.00 %)"
			info.style.position                = "absolute";
			info.style.left                    = "20px";
			info.style.top                     = "0px";
			info.style.whiteSpace              = "nowrap";
			info.style.zIndex                  = "2147483646";
			info.style.height                  = "12px";
			info.style.padding                 = "5px";
			info.style.background              = "linear-gradient( rgb(180,0,0), rgb(136,0,0) 30%)";
			info.style.color                   = "white";
			info.style.textShadow              = "1px 1px black";
			info.style.borderBottomLeftRadius  = "5px";
			info.style.borderBottomRightRadius = "5px";
			info.style.textAlign               = "center";
			info.style.width                   = "160px";
			info.style.display                 = "none";

			document.body.appendChild(progressbar);
			document.body.appendChild(info);

			// Get progress on saving the client
			Thread.hook( "CLIENT_SAVE_PROGRESS", function(data){
				var now = Date.now();
				if( last_tick + 400 < now ) {
					progressbar.style.width = data.total.perc + '%';
					info.textContent = "Saving fullclient... ("+ data.total.perc +" %)"
					last_tick = now;
				}
			});

			Thread.hook( "CLIENT_SAVE_COMPLETE", function(data){
				if (progressbar.parentNode) {
					document.body.removeChild(progressbar);
				}
				if (info.parentNode) {
					document.body.removeChild(info);
				}
			});

			// Seems like files property are reset when sent to another thread
			for (i=0, count = files.length; i < count; ++i) {
				list.push({
					file: files[i],
					path: files[i].fullPath || files[i].relativePath || files[i].webkitRelativePath || files[i].name
				});
			}
		}

		// Initialize client files (load GRF, etc).
		Thread.send( "CLIENT_INIT", {
			files:   list,
			grfList: ROConfig.grfList || 'DATA.INI',
			save:    !!ROConfig.saveFiles
		}, Client.onFilesLoaded );
	}


	/**
	 * Get a file from Game Data files
	 *
	 * @param {string} filename
	 * @param {function} onload
	 * @param {function} onerror
	 * @param {Array} args - optional
	 */
	var getFile = function getFilClosure()
	{
		var _input = { filename:"", args:null };

		function callback(data, error, input)
		{
			Memory.set( input.filename, data, error);
		}

		return function getFile( filename, onload, onerror, args )
		{
			if( !Memory.exist(filename) ) {
				_input.filename = filename;
				_input.args     = args || null;

				Thread.send( "GET_FILE", _input, callback );
			}

			return Memory.get( filename, onload, onerror );
		};
	}();


	/**
	 * Get files from Game Data files
	 *
	 * @param {string[]} filenames
	 * @param {function} callback once loaded
	 */
	function getFiles( filenames, callback ) {
		var count, index;
		var out;
	
		function onload( data ) {
			out[ index++ ] = data;

			if (index === count) {
				if (callback) {
					callback.apply( null, out);
				}
				return;
			}

			getFile( filenames[index], onload);
		}

		count  = filenames.length;
		out    = new Array(count);
		index  = 0;
	
		getFile( filenames[index], onload);
	}


	/**
	 * Get and load a file from Game Data files
	 *
	 * @param {string} filename
	 * @param {function} onload
	 * @param {function} onerror
	 * @param {Array} args - optional
	 */
	var loadFile = function loadFileClosure()
	{
		var _input = { filename:"", args:null };

		function callback(data, error, input)
		{
			var i, count;
			var gl, frames, texture, palette;
			var precision, size;

			if( data && !error) {
				switch( input.filename.substr(-3) ){
					// Remove magenta on textures
					case 'bmp':
						Texture( data, function(){
							Memory.set( input.filename, this.toDataURL(), error);
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
					if( data.rgba_index !== 0 ) {
						data.texture = gl.createTexture();
						gl.bindTexture( gl.TEXTURE_2D, data.texture );
						gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data.palette );
						gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
						gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
					}

					Memory.set( input.filename, data, error);
					return;

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

					Memory.set( input.filename, { palette:palette, texture:texture }, error);
					return;
				}
			}

			Memory.set( input.filename, data, error);
		}

		return function loadFile( filename, onload, onerror, args )
		{
			if( !Memory.exist(filename) ) {
				_input.filename = filename;
				_input.args     = args || null;

				Thread.send("LOAD_FILE", _input, callback);
			}
	
			return Memory.get( filename, onload, onerror );
		};
	}();


	/**
	 * Get and load files from Game Data files
	 *
	 * @param {string[]} filenames
	 * @param {function} callback once loaded
	 */
	function loadFiles( filenames, callback ) {
		var count, index;
		var out;

		function onload( data ) {
			out[ index++ ] = data;
	
			if (index === count) {
				if (callback) {
					callback.apply( null, out);
				}
				return;
			}

			loadFile( filenames[index], onload );
		}

		count  = filenames.length;
		out    = new Array(count);
		index  = 0;

		loadFile( filenames[index], onload );
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
		getFile:       getFile,
		getFiles:      getFiles,
		loadFile:      loadFile,
		loadFiles:     loadFiles,
		search:        search,
		onFilesLoaded: function OnFilesLoaded(){}
	};

	return Client;
});