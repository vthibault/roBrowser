/**
 * UI/Components/Error/Error.js
 *
 * Error screen
 * Don't use components class, if there is an error on this module will never be used...
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function( require )
{
	'use strict';


	/**
	 * Dependencies
	 */
	var _htmlText    = require('text!./Error.html');
	var _cssText     = require('text!./Error.css');
	var jQuery       = require('Vendors/jquery');


	/**
	 * Error Namespace
	 */
	var Error = {};


	/**
	 * Initialize Metaling
	 */
	Error.init = function init()
	{
		this.ui = jQuery(_htmlText);

		// Add view to html
		var style = jQuery('style:first');
		if (!style.length) {
			style = jQuery('<style type="text/css"></style>').appendTo('head');
		}
		style.append('\n' + _cssText);
		jQuery('body').html(this.ui);

		this.ui.css('backgroundImage', 'url('+ require.toUrl('./angeling.png') +')');
	};


	/**
	 * Add trace info to UI
	 *
	 * @param {Error} error
	 */
	Error.addTrace = function addTrace( error )
	{
		var url = requirejs.toUrl(''); // global
		error   = error.stack || error;

		url   = url.replace(/\/([^\/]+)$/g,'/');
		error = error.replace( /\n/g, '<br/>');
		error = error.replace( new RegExp(url,'g'), '');
		error = error.replace( /\?[^\:]+/g,'');

		if (!this.ui) {
			this.init();
		}

		this.ui.find('.trace').append(
			error  + '<br />'
		);
	};


	/**
	 * Stored component and return it
	 */
	return Error;
});