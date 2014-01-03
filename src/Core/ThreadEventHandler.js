/**
 * Core/ThreadEventHandler.js
 *
 * Handler data received from Main Thread and process.
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */


importScripts('../Vendors/require.js');
requirejs.config({
	baseUrl: "../"
});

require(['Core/FileManager', 'Core/FileSystem', 'Loaders/MapLoader'],
function(      FileManager,        FileSystem,           MapLoader )
{
	"use strict";


	/**
	 *	Send an Error to main thread
	 *
	 * @param {string} error
	 */
	function SendError()
	{
		postMessage({ type:"THREAD_ERROR", data: Array.prototype.slice.call(arguments,0) });
	}


	/**
	 *	Send a message log to main thread
	 *
	 * @param {string} error
	 */
	function SendLog()
	{
		postMessage({ type:"THREAD_LOG", data: Array.prototype.slice.call(arguments,0) });
	}


	/**
	 * Receiving data, process action
	 *
	 * @param {object} event - EventHandler
	 */
	onmessage = function Receive( event )
	{
		var msg  = event.data;
		var args = [];

		switch( msg.type ) {

			// Modify client host
			case "SET_HOST":
				FileManager.remoteClient = msg.data;
				break;


			// Save full client and use it
			case "CLIENT_INIT":
				FileSystem.bind('onprogress', function(progress){
					postMessage({ type:'CLIENT_SAVE_PROGRESS', data:progress });
				});

				// full client saved !
				FileSystem.bind('onuploaded', function(){
					postMessage({ type:'CLIENT_SAVE_COMPLETE' });
				});

				FileManager.onGameFileLoaded = function(filename){
					SendLog('Success to load GRF file "' + filename + '"');
				};

				FileManager.onGameFileError = function(filename, error){
					SendError('Error loading GRF file "' + filename + '" : ' + error);
				};

				// Start loading GRFs files
				FileSystem.bind('onready', function(){
					FileManager.clean();
					FileManager.init( msg.data.grfList );

					args[0] = FileManager.gameFiles.length;
					args[1] = null;
	
					postMessage({
						uid:       msg.uid,
						arguments: args
					});
				});

				// Saving full client
				FileSystem.init( msg.data.files );
				break;


			// Get a file from client/grf
			case "GET_FILE":
				try {
					args[0] = FileManager.get( msg.data.filename );
					args[1] = null;
				}
				catch( error ) {
					args[0] = null;
					args[1] = error.message;

					SendError( '[Thread] ' + error.message + " (" + msg.data.filename  + ")" );
				}
				break;


			// Get and load a file from client/grf
			case "LOAD_FILE":
				try {
					args[0] = FileManager.load( msg.data.filename, false, msg.data.args );
					args[1] = null;
				}
				catch( error ) {
					args[0] = null;
					args[1] = error.message;

					SendError( '[Thread] ' + error.message + " (" + msg.data.filename  + ")" );
				}

				break;


			// Search a file in Client
			case "SEARCH_FILE":
				args[0] = FileManager.search( msg.data );
				break;


			// Start loading a map
			case "LOAD_MAP":
				try {
					var map = new MapLoader();
					map.onprogress = function(progress){
						postMessage({ type:'MAP_PROGRESS', data:progress });
					};
					map.load( msg.data );
					args[0] = true;
				}
				catch( error ) {
					args[0] = false;
					args[1] = error.message;

					SendError( '[Thread] ' + error.message + " (" + msg.data  + ")" );
				}
				break;
		}

		// If there is an uid, get back the answer
		if( msg.uid && args.length ) {
			args[2] = msg.data;

			postMessage({
				uid:       msg.uid,
				arguments: args
			});
		}
	};


	/**
	 * Once the thread is ready
	 */
	postMessage({ type: "THREAD_READY" });
});