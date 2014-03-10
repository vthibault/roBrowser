/**
 * UI/Components/WinPopup/Winpopup.js
 *
 * Popup windows
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
	var Renderer    = require('Renderer/Renderer');
	var UIManager   = require('UI/UIManager');
	var UIComponent = require('UI/UIComponent');
	var htmlText    = require('text!./WinPopup.html');
	var cssText     = require('text!./WinPopup.css');


	/**
	 * Create Component
	 */
	var WinPopup = new UIComponent( 'WinPopup', htmlText, cssText );


	/**
	 * Initialize popup
	 */
	WinPopup.init = function init()
	{
		this.ui.css({
			top:  (Renderer.height-120) / 1.5 - 120,
			left: (Renderer.width -280) / 2.0,
			zIndex: 100
		});
	};


	/**
	 * Create component based on view file and export it
	 */
	return UIManager.addComponent(WinPopup);
});