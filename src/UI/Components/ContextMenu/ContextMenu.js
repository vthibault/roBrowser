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
	var ContextMenu = new UIComponent( 'ContextMenu', '<div id="ContextMenu"/>', cssText);


	/**
	 * Overlay, click on it and contextmenu will disapear
	 */
	var _overlay = jQuery('<div/>').css({
		position: 'fixed',
		top:    0,
		left:   0,
		zIndex: 999,
		width: '100%',
		height:'100%'
	});


	/**
	 * Initialize event handler
	 */
	ContextMenu.init = function init()
	{
		_overlay.mousedown(function(){
			ContextMenu.remove();
		});

		this.ui.on('mousedown', 'div', function(event){
			event.stopImmediatePropagation();
			return false;
		});
	};


	/**
	 * Initialize UI
	 */
	ContextMenu.onAppend = function onAppend()
	{
		this.ui.css('zIndex', 1000);
		_overlay.appendTo('body');

		var width  = this.ui.width();
		var height = this.ui.height();
		var x      = Mouse.screen.x;
		var y      = Mouse.screen.y;

		if (Mouse.screen.x + width > Renderer.width) {
			x = Mouse.screen.x - width;
		}

		if (Mouse.screen.y + height > Renderer.height) {
			y = Mouse.screen.y - height;
		}

		this.ui.css({ top:  y, left: x });
	};


	/**
	 * Clean UP UI
	 */
	ContextMenu.onRemove = function onRemove()
	{
		_overlay.detach();
		this.ui.empty();
	};


	/**
	 * Add a clickable node to the context menu
	 *
	 * @param {string} text
	 * @param {function} callback once clicked
	 */
	ContextMenu.addElement = function addElement(text, callback)
	{
		this.ui.append(jQuery('<div/>').text(text).click(function(){
			ContextMenu.remove();
			callback();
		}));
	};


	/**
	 * Add a delimiter to the links
	 */
	ContextMenu.nextGroup = function nextGroup()
	{
		this.ui.append('<hr/>');
	};


	// Prepare the context menu to avoid problem
	ContextMenu.prepare();


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(ContextMenu);
});