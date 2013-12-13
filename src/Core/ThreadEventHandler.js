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

require(['Core/FileManager', 'Loaders/MapLoader'],
function(      FileManager,           MapLoader )
{
	"use strict";


	/**
	 *	Send an Error to main thread
	 *
	 * @param {string} error
	 */
	function SendError( error )
	{
		postMessage({ type:"THREAD_ERROR", data: error });
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


			// Clean GRFs files
			case "CLEAN_GRF":
				FileManager.clean();
				break;


			// Load GRF File
			case "LOAD_GRF":
				try {
					FileManager.addGameFile( msg.data );
					args[0] = true;
					args[1] = null;
				}
				catch( error ) {
					args[0] = false;
					args[1] = error.message;

					SendError( error.message + " (" + msg.data + ")" );
				}
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

					SendError( error.message + " (" + msg.data.filename  + ")" );
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

					SendError( error.message + " (" + msg.data.filename  + ")" );
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
					map.load( msg.data );
					args[0] = true;
				}
				catch( error ) {
					args[0] = false;
					args[1] = error.message;

					SendError( error.message + " (" + msg.data  + ")" );
				}
				break;
				
		}

		// If there is an uid, get back the answer
		if( msg.uid ) {
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