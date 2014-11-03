/**
 * Plugins/PluginManager.js
 *
 * Plugin Manager - Load and execute plugins
 * Plugins have to be globals, can not be server specific (multiple server in one clientinfo)
 * You alter memory, so you can't restore it if you change server.
 *
 * It's a work in progress, and subject to changes.
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function( require )
{
	'use strict';


	/**
	 * Plugins are loaded from configs
	 */
	var Configs = require('Core/Configs');


	/**
	 * Plugin namespace
	 */
	var Plugins = {};


	/**
	 * @var {Array} plugin list
	 */
	Plugins.list = [];


	/**
	 * Initialize plugins
	 */
	Plugins.init = function init( context )
	{
		var i, count;
		var plugins, paths;

		plugins   = Configs.get('plugins', {});
		this.list = Object.keys(plugins);
		paths     = new Array(this.list.length);

		for (i = 0, count = this.list.length; i < count; ++i) {
			paths[i] = './' + this.list[i] + '/' + this.list[i];
		}

		require(paths, function() {
			for (i = 0; i < count; ++i) {
				arguments[i]();
			}
		});
	};


	/**
	 * Export
	 */
	return Plugins;
});