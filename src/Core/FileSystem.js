/**
 * Core/FileSystem.js
 *
 * File System
 * Manage the client files (saving it)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */


define(function()
{
	'use strict';

	/**
	 * @param {Array} FileList
	 */
	var _files = [];


	/**
	 * @param {number} client total size (in octets)
	 */
	var _clientSize   = 0;


	/**
	 * @param {number} progress octects when uploading
	 */
	var _streamOffset = 0;


	/**
	 * @param {Object} Events list
	 */
	var _events = {};


	/**
	 * @param {FileSyStem} sync
	 */
	var _fs_sync;


	/**
	 * @param {FileSyStem} async (used for streaming)
	 */
	var _fs;


	/**
	 * @param {boolean} is API available ? (do not need to check for the async)
	 */
	var _available = !!(self.requestFileSystemSync || self.webkitRequestFileSystemSync);


	/**
	 * @param {boolean} save data to file system ?
	 */
	var _save = false;


	/**
	 * Initialize FileSystem API
	 *
	 * @param {Array} FileList
	 * @param {boolean} save files
	 * @param {Object} quota information
	 */
	function init( files, save, quota )
	{
		var requestFileSystemSync, requestFileSystem;
		_files = normalizeFilesPath(files);

		if (!_available) {
			trigger('onready');
			return;
		}

		calculateClientSize();

		requestFileSystemSync = self.requestFileSystemSync || self.webkitRequestFileSystemSync;
		requestFileSystem     = self.requestFileSystem     || self.webkitRequestFileSystem;

		var size = _clientSize || quota.used || quota.remaining;

		requestFileSystem( self.TEMPORARY, size, function( fs ){
			_fs      = fs;
			_fs_sync = requestFileSystemSync( self.TEMPORARY, size );

			if (save && _files.length) {
				cleanUp();
				buildHierarchy();
				processUpload(0);
			}

			_save = save;
			trigger('onready');
		}, errorHandler);
	}


	/**
	 * Normalize file path
	 *
	 * @param {array} FileList
	 * @returns {array} normalized filelist
	 */
	function normalizeFilesPath( files )
	{
		var i, count;
		var list = new Array(files.length);
		var backslash = /\\\\/g;

		for (i = 0, count = files.length; i < count; ++i) {
			list[i]       = files[i].file;
			list[i]._path = files[i].path.replace(backslash, '/');
		}

		return list;
	}



	/**
	 * Error Handler give a human error
	 */
	function errorHandler(e)
	{
		var msg = '';
		switch (e.code) {
			case FileError.QUOTA_EXCEEDED_ERR:
				msg = 'QUOTA_EXCEEDED_ERR';
				break;
			case FileError.NOT_FOUND_ERR:
				msg = 'NOT_FOUND_ERR';
				break;
			case FileError.SECURITY_ERR:
				msg = 'SECURITY_ERR';
				break;
			case FileError.INVALID_MODIFICATION_ERR:
				msg = 'INVALID_MODIFICATION_ERR';
				break;
			case FileError.INVALID_STATE_ERR:
				msg = 'INVALID_STATE_ERR';
				break;
			default:
				msg = 'Unknown Error';
				break;
		}

		trigger('onerror', msg);
	}


	/**
	 * Calculate FullClient total size
	 * @returns {integer}
	 */
	function calculateClientSize()
	{
		var i, count;

		_clientSize = 0;

		for (i = 0, count = _files.length; i < count; ++i) {
			_clientSize += _files[i].size || 0;
		}
	}


	/**
	 * Start to upload files to FileSystem (async !)
	 *
	 * @param {number} index
	 */
	function processUpload( index )
	{
		var file = _files[index];

		// Finished.
		if (index >= _files.length) {
			var i, count;

			// Move all files from the directory to root.
			var tmpDir    = _fs_sync.root.getDirectory('/__tmp_upload/', {});
			var dirReader = tmpDir.createReader();
			var entries   = dirReader.readEntries();

			for (i = 0, count = entries.length; i < count; ++i) {
				entries[i].moveTo( _fs_sync.root, entries[i].name );
			}

			tmpDir.removeRecursively();
			_files.length = 0;

			trigger('onuploaded');
			return;
		}

		if (file.name[0] === '.') {
			_files.splice( index, 1);
			processUpload( index );
			return;
		}

		_fs.root.getFile( '/__tmp_upload/' + file._path, {create: true}, function(fileEntry){
			fileEntry.createWriter(function(writer){
				writer.onerror     = errorHandler;
				writer.onwriteend  = function() {
					_streamOffset += file.size;
					processUpload( index + 1);
				};

				var last_tick = Date.now();
				writer.onprogress= function(evt){

					// Do not spam the main thread
					var now = Date.now();
					if (last_tick + 100 > now) {
						return;
					}

					last_tick = now;
					trigger('onprogress', {
						filename: file.name,
						filePath: file._path,
						file: {
							total:  evt.total,
							loaded: evt.loaded,
							perc:   (evt.loaded / evt.total * 100).toFixed(2)
						},
						total: {
							total:  _clientSize,
							loaded: _streamOffset + evt.loaded,
							perc:   (( _streamOffset + evt.loaded) / _clientSize * 100).toFixed(2)
						}
					});
				};

				writer.write(file);
			});
		}, errorHandler);

	}


	/**
	 * Build directory hierarchy
	 */
	function buildHierarchy()
	{
		var cache = {}, keys;
		var i = 0, count = _files.length;
		var path, filename = /\/?[^\/]+$/;

		// Extract directory from each file path
		for (; i < count; ++i) {
			path = _files[i]._path.split('/').slice(0,-1).join('/');
			while (!(path in cache) && path.length) {
				cache[path] = true;
				path        = path.replace(filename,'');
			}
		}

		// Extract keys and build directories
		keys  = Object.keys(cache);
		keys.sort();

		// Directory where to upload data
		_fs_sync.root.getDirectory( '/__tmp_upload/', {create: true});

		for (i = 0, count = keys.length; i < count ; ++i) {
			_fs_sync.root.getDirectory( '/__tmp_upload/' + keys[i], {create: true});
		}
	}


	/**
	 * Remove all files from FileSystem
	 */
	function cleanUp()
	{
		var i, count;
		var dirReader = _fs_sync.root.createReader();
		var entries   = dirReader.readEntries();

		for (i = 0, count = entries.length; i < count; ++i) {
			if (entries[i].isDirectory) {
				entries[i].removeRecursively();
			}
			else {
				entries[i].remove();
			}
		}
	}


	/**
	 * Trigger an event
	 *
	 * @param {string} eventname
	 * @param {mixed...}
	 */
	function trigger( eventname )
	{
		if (_events[ eventname ]) {
			_events[ eventname ].apply(
				null,
				Array.prototype.slice.call( arguments, 1)
			);
		}
	}


	/**
	 * Bind an event
	 *
	 * @param {string} eventname
	 * @param {function} callback
	 */
	function bind( eventname, callback )
	{
		_events[ eventname ] = callback;
	}


	/**
	 * Get a file in FileSystem (sync)
	 *
	 * @param {string} filename
	 * @returns {File}
	 */
	function getFileSync( filename )
	{
		filename = filename.replace( /\\/g, '/');

		if (!_available || _files.length) {
			var i, count = _files.length;

			for (i = 0; i < count; ++i) {
				if (_files[i]._path === filename) {
					return _files[i];
				}
			}

			return null;
		}

		var fileEntry;

		try {
			fileEntry = _fs_sync.root.getFile(filename, {create:false});
		}
		catch(e) {
			// not found
			return null;
		}

		if (fileEntry.isFile) {
			return fileEntry.file();
		}

		return null;
	}


	/**
	 * Get a file in FileSystem (async)
	 *
	 * @param {string} filename
	 * @param {function} once loaded
	 * @param {function} callback if not found
	 */
	function getFile( filename, onload, onerror )
	{
		filename = filename.replace( /\\/g, '/');

		if (!_available || _files.length) {
			var i, count = _files.length;

			for (i = 0; i < count; ++i) {
				if (_files[i]._path === filename) {
					onload(_files[i]);
					return;
				}
			}

			onerror();
			return;
		}

		_fs.root.getFile( filename, {create: false}, function(fileEntry){
			if (fileEntry.isFile) {
				fileEntry.file(onload);
			}
			else {
				onerror();
			}
		}, onerror);
	}


	/**
	 * Save the content of a files in file system
	 * (used to save the remote client)
	 *
	 * @param {string} filePath
	 * @param {ArrayBuffer} buffer
	 */
	function saveFile( filePath, buffer )
	{
		if (!_save || !_available) {
			return;
		}

		var filename    = filePath.replace( /\\/g, '/');
		var directories = filename.split('/').slice(0,-1);
		var path        = '';

		// Create hierarchy
		while (directories.length) {
			path += directories.shift() + '/';
			_fs_sync.root.getDirectory( path, {create: true});
		}

		var fileEntry = _fs_sync.root.getFile(filename, {create:true});
		var writer    = fileEntry.createWriter();

		writer.write(new Blob([buffer]));
	}


	/**
	 * Search a file from FileSystem using a regex
	 *
	 * @param {RegExp|string} to match the filename
	 */
	function search( regex )
	{
		var i, count;
		var list = [];

		if (!(regex instanceof RegExp)) {
			regex = new RegExp('^'+ regex.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1') + '$', 'i');
		}

		if (!_available || _files.length) {

			for (i = 0, count = _files.length; i < count; ++i) {
				if ( _files[i].name.match(regex)) {
					list.push(_files[i]);
				}
			}

			return list;
		}

		var entries = _fs_sync.root.createReader().readEntries();

		for (i = 0, count = entries.length; i < count; ++i) {
			if (entries[i].isFile && entries[i].name.match(regex)) {
				list.push( entries[i].file() );
			}
		}

		return list;
	}


	/**
	 * Public methods
	 */
	return {
		bind:        bind,
		getFile:     getFile,
		getFileSync: getFileSync,
		init:        init,
		cleanup:     cleanUp,
		search:      search,
		saveFile:    saveFile
	};
});
