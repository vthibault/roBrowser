/**
 * UI/Components/ContextMenu/ContextMenu.js
 *
 * Manage ContextMenu (right click on a target)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 */
define(function(require)
{
	'use strict';


	/**
	 * Dependencies
	 */
	var jQuery       = require('Utils/jquery');
	var Renderer     = require('Renderer/Renderer');
	var Mouse        = require('Controls/MouseEventHandler');
	var UIManager    = require('UI/UIManager');
	var UIComponent  = require('UI/UIComponent');
	var cssText      = require('text!./ContextMenu.css');


	/**
	 * Create Component
	 */
	var ContextMenu = new UIComponent( 'ContextMenu', '<div id="ContextMenu"><div class="menu"/></div>', cssText);


	/**
	 * Initialize event handler
	 */
	ContextMenu.init = function init()
	{
		this.ui.mousedown(function(){
			ContextMenu.remove();
		});

		this.ui.find('.menu').on('mousedown', 'div', function(event){
			event.stopImmediatePropagation();
			return false;
		});
	};


	/**
	 * Initialize UI
	 */
	ContextMenu.onAppend = function onAppend()
	{
		var menu   = this.ui.find('.menu');
		var width  = menu.width();
		var height = menu.height();
		var x      = Mouse.screen.x;
		var y      = Mouse.screen.y;

		if (Mouse.screen.x + width > Renderer.width) {
			x = Mouse.screen.x - width;
		}

		if (Mouse.screen.y + height > Renderer.height) {
			y = Mouse.screen.y - height;
		}

		menu.css({ top:y, left:x });
	};


	/**
	 * Clean UP UI
	 */
	ContextMenu.onRemove = function onRemove()
	{
		this.ui.find('.menu').empty();
	};


	/**
	 * Add a clickable node to the context menu
	 *
	 * @param {string} text
	 * @param {function} callback once clicked
	 */
	ContextMenu.addElement = function addElement(text, callback)
	{
		this.ui.find('.menu').append(jQuery('<div/>').text(text).click(function(){
			ContextMenu.remove();
			callback();
		}));
	};


	/**
	 * Add a delimiter to the links
	 */
	ContextMenu.nextGroup = function nextGroup()
	{
		this.ui.find('.menu').append('<hr/>');
	};


	// Prepare the context menu to avoid problem
	ContextMenu.prepare();


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(ContextMenu);
});