/**
 * UI/Components/GraphicsOption/GraphicsOption.js
 *
 * Manage Graphics details
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
	var Context          = require('Core/Context');
	var Preferences      = require('Core/Preferences');
	var GraphicsSettings = require('Preferences/Graphics');
	var Renderer         = require('Renderer/Renderer');
	var UIManager        = require('UI/UIManager');
	var UIComponent      = require('UI/UIComponent');
	var htmlText         = require('text!./GraphicsOption.html');
	var cssText          = require('text!./GraphicsOption.css');


	/**
	 * Create Component
	 */
	var GraphicsOption = new UIComponent( 'GraphicsOption', htmlText, cssText );


	/**
	 * @var {Preferences} Graphics
	 */
	var _preferences=  Preferences.get('GraphicsOption', {
		x:    300,
		y:    300,
	}, 1.0);


	/**
	 * Initialize UI
	 */
	GraphicsOption.init = function Init()
	{
		this.ui.find('.close').click(function(){
			this.remove();
		}.bind(this));

		//Avoid drag and drop in input elements
		this.ui.find('input, select').mousedown(function(event){
			event.stopImmediatePropagation();
		});

		this.ui.find('.details').change(function(){
			GraphicsSettings.quality = parseInt(this.value, 10);
			GraphicsSettings.save();

			ROConfig.quality = GraphicsSettings.quality;
			Renderer.resize();
		});

		this.ui.find('.screensize').change(function(){
			var isFullScreen = Context.isFullScreen();

			GraphicsSettings.screensize = this.value;
			GraphicsSettings.save();

			if (this.value === 'full') {
				if (!isFullScreen) {
					Context.requestFullScreen();
				}
			}
			else {
				if (isFullScreen) {
					Context.cancelFullScreen();
				}

				// Resizing
				if (Context.Is.POPUP) {
					var size = GraphicsSettings.screensize.split('x');

					// Only resize/move if needed
					if (size[0] != window.innerWidth && size[1] != window.innerHeight) {
						window.resizeTo( size[0], size[1] );
						window.moveTo( (screen.availWidth - size[0]) / 2, (screen.availHeight - size[1]) / 2 );
					}
				}
			}
		});

		this.draggable();
	};



	/**
	 * When append the element to html
	 */
	GraphicsOption.onAppend = function OnAppend()
	{
		this.ui.css({
			top:     _preferences.y,
			left:    _preferences.x,
		});

		this.ui.find('.details').val(GraphicsSettings.quality);
		this.ui.find('.screensize').val(GraphicsSettings.screensize);
	};


	/**
	 * Once remove, save preferences
	 */
	GraphicsOption.onRemove = function OnRemove()
	{
		_preferences.x    = parseInt(this.ui.css('left'), 10);
		_preferences.y    = parseInt(this.ui.css('top'), 10);
		_preferences.save();
	};


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(GraphicsOption);
});