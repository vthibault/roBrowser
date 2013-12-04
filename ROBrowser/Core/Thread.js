/**
 * Core/Thread.js
 *
 * Client Thread
 * Manage the Client Thread to send data to it (let another Thread do the hard job : loading files, ...)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */


define(function( require )
{
	"use strict";


	/**
	 * Memory to get back data
	 * @var List
	 */
	var _memory = {};


	/**
	 * List of hook callback
	 * @var List
	 */
	var _hook   = {};


	/**
	 * Initialize the Thread
	 *
	 * @var Worker
	 */
	var _worker = null;


	/**
	 * @var {number} uid
	 */
	var _uid = 0;


	/**
	 * Send data to thread
	 *
	 * @param {string} type
	 * @param {mixed} data
	 * @param {function} callback
	 */
	function Send( type, data, callback )
	{
		var uid = null;

		if( callback ) {
			uid          = ++_uid;
			_memory[uid] = callback;
		}

		_worker.postMessage({
			type: type,
			data: data,
			uid:  uid
		});
	}


	/**
	 * Receive data from Thread
	 * Get back the data, find the caller and execute it
	 *
	 * @param {object} event
	 */
	function Receive(event)
	{
		var uid  = event.data.uid;
		var type = event.data.type;

		// Direct callback
		if( uid in _memory ) {
			_memory[uid].apply(null, event.data.arguments);
			delete _memory[uid];
		}

		// Hook Feature
		if( type && _hook[type] ) {
			_hook[type].call(null, event.data.data);
		}
	}


	/**
	 * Hook receive data
	 *
	 * @param {string} type
	 * @param {function} callback
	 */
	function Hook( type, callback )
	{
		_hook[type] = callback;
	}


	/**
	 * Initialize Thread
	 */
	function Init()
	{
		var url = ROConfig.development ? './ThreadEventHandler.js' : '../../build/ThreadEventHandler.js';
		_worker = new Worker( require.toUrl(url) );
		_worker.addEventListener('message', Receive, false);
	}


	/**
	 * Exports
	 */
	return {
		send: Send,
		hook: Hook,
		init: Init
	};
});