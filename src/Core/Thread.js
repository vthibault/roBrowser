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


define(['require', 'Core/Configs'], function( require, Configs )
{
	'use strict';


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
	 * @var {number} uid
	 */
	var _uid = 0;


	/**
	 * @var {mixed} origin for security
	 */
	var _origin = [];


	/**
	 * @var {window|Worker} context to send data to
	 */
	var _source = null;


	/**
	 * Send data to thread
	 *
	 * @param {string} type
	 * @param {mixed} data
	 * @param {function} callback
	 */
	var Send = function SendClosure()
	{
		var _input = { type: '', data: null, uid: 0 };

		return function Send( type, data, callback )
		{
			var uid = 0;
	
			if (callback) {
				uid          = ++_uid;
				_memory[uid] = callback;
			}

			_input.type = type;
			_input.data = data;
			_input.uid  = uid;

			_source.postMessage( _input, _origin );
		};
	}();


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
		if (uid in _memory) {
			_memory[uid].apply(null, event.data.arguments);
			delete _memory[uid];
		}

		// Hook Feature
		if (type && _hook[type]) {
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
	 * Modify where to send informations
	 *
	 * @param {Window} source
	 * @param {string} origin
	 */
	function Delegate( source, origin )
	{
		_source = source;
		_origin = origin;
	}


	/**
	 * Initialize Thread
	 */
	function Init()
	{
		if (!_source) {
			var url = Configs.get('development') ? './ThreadEventHandler.js' : './../../ThreadEventHandler.js';
			_source = new Worker( require.toUrl(url) + '?' + Configs.get('version', '') );
		}

		// Worker context
		if (_source instanceof Worker) {
			_source.addEventListener('message', Receive, false);
		}

		// Other frame worker
		else {
			window.addEventListener('message', Receive, false );
			_source.postMessage({type:'SYNC'}, _origin );
		}
	}


	/**
	 * Exports
	 */
	return {
		send:     Send,
		hook:     Hook,
		init:     Init,
		delegate: Delegate
	};
});