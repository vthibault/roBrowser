/**
 * UI/Components/ChatRoomCreate/ChatRoomCreate.js
 *
 * Character room setup UI
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
	var jQuery      = require('Utils/jquery');
	var DB          = require('DB/DBManager');
	var KEYS        = require('Controls/KeyEventHandler');
	var Renderer    = require('Renderer/Renderer');
	var Preferences = require('Core/Preferences');
	var UIManager   = require('UI/UIManager');
	var UIComponent = require('UI/UIComponent');
	var htmlText    = require('text!./ChatRoomCreate.html');
	var cssText     = require('text!./ChatRoomCreate.css');


	/**
	 * Create Component
	 */
	var ChatRoomCreate = new UIComponent( 'ChatRoomCreate', htmlText, cssText );
	
	
	/**
	 * @var {string} chat room title
	 */
	ChatRoomCreate.title = '';


	/**
	 * @var {number} chat room limit
	 */
	ChatRoomCreate.limit = 20;


	/**
	 * @var {number} type
	 * 0 = Private
	 * 1 = Public
	 */
	ChatRoomCreate.type = 1;


	/**
	 * @var {string} password
	 */
	ChatRoomCreate.password = '';


	/**
	 * @var {Preference} structure to save
	 */
	var _preferences = Preferences.get('ChatRoomCreate', {
		x:        480,
		y:        200,
		show:   false
	}, 1.0);


	/**
	 * Initialize UI
	 */
	ChatRoomCreate.init = function init()
	{
		// Bindings
		this.ui.find('.close, .cancel').mousedown(stopPropagation).click(this.hide.bind(this));
		this.ui.find('.ok').on('click', parseChatSetup.bind(this) );
		this.ui.find('.setup').submit(function() {
			return false;
		});

		this.ui.find('input, select').mousedown(function(event){
			event.stopImmediatePropagation();
		});

		this.draggable(this.ui.find('.titlebar'));
		this.ui.hide();
	};


	/**
	 * Once append to body
	 */
	ChatRoomCreate.onAppend = function OnAppend()
	{
		if (!_preferences.show) {
			this.ui.hide();
		}

		this.ui.css({
			top:  Math.min( Math.max( 0, _preferences.y), Renderer.height - this.ui.height()),
			left: Math.min( Math.max( 0, _preferences.x), Renderer.width  - this.ui.width())
		});

		// Escape key order
		var events = jQuery._data( window, 'events').keydown;
		events.unshift( events.pop() );
	};


	/**
	 * Once removed from DOM, save preferences
	 */
	ChatRoomCreate.onRemove = function OnRemove()
	{
		_preferences.show   =  this.ui.is(':visible');
		_preferences.y      =  parseInt(this.ui.css('top'), 10);
		_preferences.x      =  parseInt(this.ui.css('left'), 10);
		_preferences.save();
	};


	/**
	 * Show the setup for room creation
	 */
	ChatRoomCreate.show = function showSetup()
	{
		this.ui.show();
		this.ui.find('.title').focus();

		_preferences.show = true;
	};
	
	
	/**
	 * Hide the setup ui
	 */
	ChatRoomCreate.hide = function hideSetup()
	{
		this.ui.hide();
		this.ui.find('.setup')[0].reset();

		_preferences.show = false;
	};
	

	/**
	 * Key Listener
	 *
	 * @param {object} event
	 * @return {boolean}
	 */
	ChatRoomCreate.onKeyDown = function onKeyDown( event )
	{
		if (this.ui.is(':visible')) {
			if (event.which === KEYS.ENTER) {
				parseChatSetup.call(this);
				event.stopImmediatePropagation();
				return false;
			}
			else if (event.which === KEYS.ESCAPE) {
				this.hide();
				event.stopImmediatePropagation();
				return false;
			}
		}

		return true;
	};


	/**
	 * Process shortcut
	 *
	 * @param {object} key
	 */
	ChatRoomCreate.onShortCut = function onShurtCut( key )
	{
		switch (key.cmd) {
			case 'TOGGLE':
				this.ui.toggle();
				if (this.ui.is(':visible')) {
					this.focus();
				}
				break;
		}
	};


	/**
	 * Stop event propagation
	 */
	function stopPropagation( event )
	{
		event.stopImmediatePropagation();
		return false;
	}

	/**
	 * Parse and send chat room request
	 */
	function parseChatSetup()
	{
		this.title    = this.ui.find('input[name=title]').val();
		this.limit    = parseInt( this.ui.find('select[name=limit]').val(), 10);
		this.type     = parseInt( this.ui.find('input[name=public]:checked').val(), 10);
		this.password = this.ui.find('input[name=password]').val();

		if (this.title.length < 1) {
			var overlay       = document.createElement('div');
			overlay.className = 'win_popup_overlay';
			document.body.appendChild(overlay);

			var popup = UIManager.showMessageBox( DB.getMessage(13), 'ok', function(){
				document.body.removeChild(overlay);
			}, true);

			popup.ui.css({
				top:  parseInt(this.ui.css('top'), 10) - 120,
				left: parseInt(this.ui.css('left'), 10)
			});
			return;
		}

		this.requestRoom();
		this.hide();
	}


	/**
	 * Pseudo functions :)
	 */
	ChatRoomCreate.requestRoom = function requestRoom(){};


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(ChatRoomCreate);
});