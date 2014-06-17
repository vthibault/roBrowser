/**
 * Core/Configs.js
 *
 * Manage application configurations
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function()
{
	'use strict';


	/**
	 * @var {object} global configs
	 */
	var _global = {};


	/**
	 * @var {object} server configs
	 */
	var _server = {};


	/**
	 * Constructor
	 * Apply configs
	 */
	(function init(configs)
	{
		if (typeof configs !== 'object') {
			return;
		}

		var keys = Object.keys(configs);
		var i, count;

		for (i = 0, count = keys.length; i < count; ++i) {
			set( keys[i], configs[keys[i]]);
		}
	})(window.ROConfig);


	/**
	 * Set a config
	 *
	 * @param {string} key name
	 * @param {?} data
	 */
	function set( key, value )
	{
		_global[key] = value;
	}


	/**
	 * Get the value of a config
	 *
	 * @param {string} key name
	 * @param {?} default data value
	 * @return {?} data
	 */
	function get( key, defaultValue )
	{
		if (key in _server) {
			return _server[key];
		}

		if (key in _global) {
			return _global[key];
		}

		return defaultValue;
	}


	/**
	 * Store the server informations
	 *
	 * @param {object} server config
	 */
	function setServer( server )
	{
		_server = server;
	}


	/**
	 * Export
	 */
	return {
		get:       get,
		set:       set,
		setServer: setServer
	};
});