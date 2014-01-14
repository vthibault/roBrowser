/**
 * UI/Components/Intro/Preferences.js
 *
 * Manage User Preferences
 * *
 * @author Vincent Thibault
 */

define(['Core/Context', 'Core/Preferences'], function( Context, Preferences )
{
	"use strict";


	/**
	 * @var {FileSystem}
	 */
	var _fs;


	/**
	 * @var {TemporaryStorage} compatibility
	 */
	var temporaryStorage  = navigator.temporaryStorage || navigator.webkitTemporaryStorage;


	/**
	 * @var {RequestFileSystem} compatibility
	 */
	var requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;


	/**
	 * Clean Up FileSystem files
	 *
	 * @param {function} callback
	 */
	function CleanUp( callback )
	{
		_fs.root.createReader().readEntries(function(entries){
			var i, count =entries.length, j = 0;

			function Removed(){
				if ((++j) >= count) {
					callback();
				}
			}

			for (i = 0; i < count; ++i) {
				if (entries[i].isDirectory) {
					entries[i].removeRecursively(Removed);
				}
				else {
					entries[i].remove(Removed);
				}
			}

			if (!count) {
				callback();
			}
		})
	}


	/**
	 * Get the size of the FileSystem API
	 *
	 * @param {function} callback
	 */
	function GetSize(callback)
	{
		if (!temporaryStorage || !requestFileSystem) {
			callback(0);
			return;
		}

		temporaryStorage.queryUsageAndQuota(function(used, remaining){
			if (!used) {
				callback(0);
				return;
			}

			requestFileSystem( window.TEMPORARY, used, function( fs ){
				_fs = fs;

				// Remove upload folder
				fs.root.getDirectory('/__tmp_upload/', {create:false}, function(dirEntry){
					dirEntry.removeRecursively(function(){
						GetSize(callback);
					});
				// no upload directory, end.
				}, function NoDirectory(){
					callback(used);
				});
			});
		});
	}


	/**
	 * Export
	 */
	return {
		cleanup: CleanUp,
		getSize: GetSize
	};
});