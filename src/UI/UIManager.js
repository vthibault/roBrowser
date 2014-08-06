/**
 * UI/UIManager.js
 *
 * Manage Interface
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function( require )
{
	'use strict';

	// Load dependencies
	var jQuery      = require('Utils/jquery');
	var UIComponent = require('./UIComponent');
	var KEYS        = require('Controls/KeyEventHandler');
	var Renderer    = require('Renderer/Renderer');
	var getModule   = require;


	/**
	 * User Interface Manager
	 */
	var UIManager = {};


	/**
	 * Components cache
	 * @var {array} Components List
	 */
	UIManager.components = {};


	/**
	 * Store a component in the manager
	 *
	 * @param {UIComponent} component object
	 */
	UIManager.addComponent = function addComponent( component )
	{
		if (!(component instanceof UIComponent)) {
			throw new Error('UIManager::addComponent() - Invalid type of component');
		}

		component.manager = this;
		this.components[ component.name ] = component;
		return component;
	};


	/**
	 * Get component stored in manager
	 *
	 * @param {string} component name
	 * @return {UIComponent} object
	 */
	UIManager.getComponent = function getComponent( name )
	{
		if (!(name in this.components)) {
			throw new Error('UIManager.getComponent() - Component "' + name + '" not found');
		}

		return this.components[name] ;
	};


	/**
	 * Remove all components in screen
	 */
	UIManager.removeComponents = function removeComponents()
	{
		var keys = Object.keys(this.components);
		var i, count = keys.length;

		for (i = 0; i < count; ++i) {
			this.components[ keys[i] ].remove();
		}
	};


	/**
	 * When resizing window, some components can be outside the screen size and
	 * it sucks a lot. Try to correct the problem.
	 *
	 * @param {number} Game screen width
	 * @param {number} Game screen height
	 */
	UIManager.fixResizeOverflow = function fixResizeOverflow( WIDTH, HEIGHT)
	{
		var keys = Object.keys(this.components);
		var i, count = keys.length;
		var ui;
		var x, y, width, height;

		for (i = 0; i < count; ++i) {
			ui = this.components[ keys[i] ].ui;

			if (ui) {
				x      = parseInt(ui.css('left'), 10);
				y      = parseInt(ui.css('top'), 10);
				width  = parseInt(ui.css('width'), 10);
				height = parseInt(ui.css('height'), 10);

				if (y + height > HEIGHT && HEIGHT > height) {
					ui.css('top', HEIGHT - height);
				}

				if (x + width > WIDTH && WIDTH > width) {
					ui.css('left', WIDTH - width);
				}
			}
		}
	};


	/**
	 * Display an error box component
	 * Will reload the game once selected
	 *
	 * @param {string} error message
	 */
	UIManager.showErrorBox = function showErrorBox( text )
	{
		var WinError, overlay;
	
		// Create popup
		WinError = this.getComponent('WinPopup').clone('WinError');
		WinError.init = function Init()
		{
			this.ui.find('.text').text(text);
			this.ui.css({
				top:  (Renderer.height-120) / 1.5 - 120,
				left: (Renderer.width -280) / 2.0,
				zIndex: 100
			});
		};
		WinError.onKeyDown = function OnKeyDown( event )
		{
			event.stopImmediatePropagation();
			switch (event.which) {
				case KEYS.ENTER:
				case KEYS.ESCAPE:
					overlay.remove();
					this.remove();
					getModule('Engine/GameEngine').reload();
			}
		};

		// Add overlay (to block mouseover, click, etc.)
		overlay = jQuery('<div/>').addClass('win_popup_overlay');
		overlay.appendTo('body');
	
		// Push the event to the top, stopImmediatePropagation will block every key down event.
		WinError.onAppend = function() {
			var events = jQuery._data( window, 'events').keydown;
			events.unshift( events.pop() );
		};

		WinError.append();

		return WinError;
	};


	/**
	 * Show a message box to the user
	 *
	 * @param {string} message to show
	 * @param {string} button name
	 * @param {function} callback once the button is pressed
	 */
	UIManager.showMessageBox = function showMessageBox( text, btn_name, callback, keydown )
	{
		var WinMSG;

		// Create popup
		WinMSG = this.getComponent('WinPopup').clone('WinMSG');
		WinMSG.init = function Init()
		{
			this.draggable();
			this.ui.find('.text').text(text);
			this.ui.css({
				top:  (Renderer.height-120) / 1.5 - 120,
				left: (Renderer.width -280) / 2.0,
				zIndex: 100
			});

			// Just button
			if (btn_name) {
				WinMSG.ui.find('.btns').append(
					jQuery('<button/>').
						addClass('btn').
						data('background', 'btn_' + btn_name + '.bmp').
						data('hover',      'btn_' + btn_name + '_a.bmp').
						data('down',       'btn_' + btn_name + '_b.bmp').
						one('click', function(){
							WinMSG.remove();
							if (callback) {
								callback();
							}
						}).
						each( this.parseHTML )
				);
			}
		};


		// Just keydown
		if (!btn_name || keydown) {
			WinMSG.onKeyDown = function(event){
				switch (event.which) {
					case KEYS.ENTER:
					case KEYS.ESCAPE:
						this.remove();
						if (callback) {
							callback();
						}
				}
				event.stopImmediatePropagation();
			};

			// Push the event to the top, stopImmediatePropagation will block every key down.
			WinMSG.onAppend = function() {
				var events = jQuery._data( window, 'events').keydown;
				events.unshift( events.pop() );
			};
		}

		WinMSG.append();

		return WinMSG;
	};


	/**
	 * Prompt a message to the user
	 *
	 * @param {string} message to show
	 * @param {string} button ok
	 * @param {string} button cancel
	 * @param {function} callback when ok is pressed
	 * @param {function} callback when cancel is pressed
	 */
	UIManager.showPromptBox = function showPromptBox( text, btn_yes, btn_no, onYes, onNo )
	{
		var WinPrompt;
	
		WinPrompt = this.getComponent('WinPopup').clone('WinPrompt');
		WinPrompt.init = function Init()
		{
			this.draggable();
			this.ui.find('.text').text(text);
			this.ui.css({
				top:  (Renderer.height-120) / 1.5 - 120,
				left: (Renderer.width -280) / 2.0,
				zIndex: 100
			});
			this.ui.find('.btns').append(

				jQuery('<button/>').
					addClass('btn').
					data('background', 'btn_' + btn_yes + '.bmp').
					data('hover',      'btn_' + btn_yes + '_a.bmp').
					data('down',       'btn_' + btn_yes + '_b.bmp').
					one('click',function(){
						WinPrompt.remove();
						if (onYes) {
							onYes();
						}
					}).
					each( this.parseHTML ),

				jQuery('<button/>').
					addClass('btn').
					data('background', 'btn_' + btn_no + '.bmp').
					data('hover',      'btn_' + btn_no + '_a.bmp').
					data('down',       'btn_' + btn_no + '_b.bmp').
					one('click',function(){
						WinPrompt.remove();
						if (onNo) {
							onNo();
						}
					}).
					each( this.parseHTML )
			);

		};

		WinPrompt.append();
		return WinPrompt;
	};


	/**
	 * Export
	 */
	return UIManager;
});