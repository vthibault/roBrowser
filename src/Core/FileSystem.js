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
	"use strict";

	/**
	 * @param {Array} FileList
	 */
	var _files;


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
	 * Initialize FileSystem API
	 *
	 * @param {Array} FileList
	 * @param {boolean} save files
	 */
	function Init( files, save )
	{
		var requestFileSystemSync, requestFileSystem, temporaryStorage;
		_files = NormalizeFilesPath(files);

		if (!_available) {
			Trigger('onready');
			return;
		}

		CalculateClientSize();

		requestFileSystemSync = self.requestFileSystemSync || self.webkitRequestFileSystemSync;
		requestFileSystem     = self.requestFileSystem     || self.webkitRequestFileSystem;
		temporaryStorage      = navigator.temporaryStorage || navigator.webkitTemporaryStorage;

		temporaryStorage.queryUsageAndQuota(function(used, remaining){
			var size = _clientSize || used || remaining;

			requestFileSystem( self.TEMPORARY, size, function( fs ){
				_fs      = fs;
				_fs_sync = requestFileSystemSync( self.TEMPORARY, size );

				if (save) {
					if (_files.length) {
						CleanUp();
					}
					BuildHierarchy();
					ProcessUpload(0);
				}

				Trigger('onready');

			}, ErrorHandler);

		});
	}


	/**
	 * Normalize file path
	 *
	 * @param {array} FileList
	 * @returns {array} normalized filelist
	 */
	function NormalizeFilesPath( files )
	{
		var i, count;
		var list = new Array(files.length);

		for (i = 0, count = files.length; i < count; ++i) {
			list[i]       = files[i].file;
			list[i]._path = files[i].path.replace(/^[^\/]+\//,'');
		}

		return list
	}



	/**
	 * Error Handler give a human error
	 */
	function ErrorHandler(e)
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

		Trigger('onerror', msg);
	}


	/**
	 * Calculate FullClient total size
	 * @returns {integer}
	 */
	function CalculateClientSize()
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
	function ProcessUpload( index )
	{
		var file = _files[index];

		// Finished.
		if (index >= _files.length) {
			_fs_sync.root.getFile( 'upload.complete', {create: true});
			_files.length = 0;
			Trigger('onuploaded');
			return;
		}

		if (file.name[0] === '.') {
			_files.splice( index, 1);
			ProcessUpload( index );
			return;
		}

		_fs.root.getFile( file._path, {create: true}, function(fileEntry){
			fileEntry.createWriter(function(writer){
				writer.onerror     = ErrorHandler;
				writer.onwriteend  = function() {
					_streamOffset += file.size;
					ProcessUpload( index + 1);
				};
		
				writer.onprogress= function(evt){
					Trigger('onprogress', {
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
		}, ErrorHandler);

	}


	/**
	 * Build directory hierarchy
	 */
	function BuildHierarchy()
	{
		var cache = {}, keys;
		var i = 0, count = _files.length;
		var path;

		// Extract directory from each file path
		for (; i < count; ++i) {
			path = _files[i]._path.split('/').slice(0,-1).join('/');
			while( !(path in cache) && path.length ) {
				cache[path] = true;
				path        = path.replace(/\/?[^\/]+$/,'');
			}
		}

		// Extract keys and build directories
		keys  = Object.keys(cache);
		keys.sort();

		for (i = 0, count = keys.length; i < count ; ++i) {
			_fs_sync.root.getDirectory( keys[i], {create: true});
		}
	}


	/**
	 * Remove all files from FileSystem
	 */
	function CleanUp()
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
	function Trigger( eventname )
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
	function Bind( eventname, callback )
	{
		_events[ eventname ] = callback;
	}


	/**
	 * Get a file in FileSystem
	 *
	 * @param {string} filename
	 * @returns {File}
	 */
	function GetFile( filename )
	{
		if( !_available || _files.length ) {
			var i, count = _files.length;

			for (i = 0; i < count; ++i) {
				if (_files[i]._path === filename) {
					return _files[i];
				}
			}

			return null;
		}

		try {
			var fileEntry = _fs_sync.root.getFile(filename, {create:false});
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
	 * Search a file from FileSystem using a regex
	 *
	 * @param {RegExp|string} to match the filename
	 */
	function Search( regex )
	{
		var i, count;
		var list = [];

		if (!(regex instanceof RegExp)) {
			regex = new RegExp('^'+ regex.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1') + '$', 'i');
		}

		if( !_available || _files.length ) {

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
		bind:      Bind,
		getFile:   GetFile,
		init:      Init,
		cleanup:   CleanUp,
		search:    Search
	};
});