/**
 * UI/Components/Global/Global.js
 *
 * Global assets loader
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function(require)
{
	'use strict';


	/**
	 * Dependencies
	 */
	var UIManager   = require('UI/UIManager');
	var UIComponent = require('UI/UIComponent');
	var htmlText     = '<div id="global"></div>'; //pseudo
	var cssText     = require('text!./Global.css');


	/**
	 * Create Global component
	 */
	var Global = new UIComponent( 'Global', null, cssText );


	/**
	 * Stored component and return it
	 */
	return UIManager.addComponent(Global);
});