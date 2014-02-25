/**
 * UI/Components/ChatRoomCreate/ChatRoomCreate.js
 *
 * Characte room setup UI
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function(require)
{
	"use strict";


	/**
	 * Dependencies
	 */
	var DB          = require('DB/DBManager');
	var KEYS        = require('Controls/KeyEventHandler');
	var Renderer    = require('Renderer/Renderer');
	var Preferences = require('Core/Preferences');
	var UIManager   = require('UI/UIManager');
	var UIComponent = require('UI/UIComponent');
	var ChatRoom    = require('UI/Components/ChatRoom/ChatRoom');
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
	ChatRoomCreate.preferences = Preferences.get('ChatRoomCreate', {
		x:        480,
		y:        200,
		show:   false
	}, 1.0);


	/**
	 * Initialize UI
	 */
	ChatRoomCreate.init = function Init()
	{
		// Bindings
		this.ui.find('.close').on('click', this.Remove.bind(this) );
		this.ui.find('.ok').on('click', ParseChatSetup.bind(this) );
		this.ui.find('.setup').submit(function() {
			return false;
		});

		//Dont activate drag
		this.ui.find('input, button, select').mousedown(function(event) {
			event.stopImmediatePropagation();
		});

		this.draggable();
		this.ui.hide();
	};


	/**
	 * Once append to body
	 */
	ChatRoomCreate.onAppend = function OnAppend()
	{
		if( !this.preferences.show ) {
			this.ui.hide();
		}

		this.ui.css({
			top:  Math.min( Math.max( 0, this.preferences.y), Renderer.height - this.ui.height()),
			left: Math.min( Math.max( 0, this.preferences.x), Renderer.width  - this.ui.width())
		});
	};


	/**
	 * Once removed from DOM, save preferences
	 */
	ChatRoomCreate.onRemove = function OnRemove()
	{
		this.preferences.show   =  this.ui.is(':visible');
		this.preferences.y      =  parseInt(this.ui.css('top'), 10);
		this.preferences.x      =  parseInt(this.ui.css('left'), 10);
		this.preferences.save();
	};


	/*
	 * Show the setup for room creation
	 */
	ChatRoomCreate.Show = function ShowSetup()
	{
		this.ui.show();
		this.ui.find('.title').focus();
		this.preferences.show = true;
	};
	
	
	/*
	 * Remove the setup ui
	 */
	ChatRoomCreate.Remove = function RemoveSetup()
	{
		this.ui.hide();
		this.ui.find('.setup')[0].reset();
		this.preferences.show = false;
	};
	

	/**
	 * Key Listener
	 *
	 * @param {object} event
	 * @return {boolean}
	 */
	ChatRoomCreate.onKeyDown = function OnKeyDown( event )
	{
		var isVisible = this.ui.is(':visible');

		if (KEYS.ALT && event.which === KEYS.C && !ChatRoom.isOpen) {
			if (isVisible) {
				this.Remove();
			}
			else {
				this.Show();	
			}
			event.stopImmediatePropagation();
			return false;
		}

		if (isVisible) {
			if (event.which === KEYS.ENTER) {
				ParseChatSetup.call(this);
				event.stopImmediatePropagation();
				return false;
			}
			else if (event.which === KEYS.ESCAPE) {
				this.Remove();
				event.stopImmediatePropagation();
				return false;
			}
		}

		return true;
	};


	/**
	 * Parse and send chat room request
	 */
	function ParseChatSetup()
	{
		this.title    = this.ui.find('input[name=title]').val();
		this.limit    = parseInt( this.ui.find('select[name=limit]').val(), 10);
		this.type     = parseInt( this.ui.find('input[name=public]:checked').val(), 10);
		this.password = this.ui.find('input[name=password]').val();

		if (this.title.length < 1) {
			var overlay       = document.createElement('div');
			overlay.className = 'win_popup_overlay';
			document.body.appendChild(overlay);

			var popup = UIManager.showMessageBox( DB.msgstringtable[13], 'ok', function(){
				document.body.removeChild(overlay);
			}, true);

			popup.ui.css({
				top:  parseInt(this.ui.css('top'), 10) - 120,
				left: parseInt(this.ui.css('left'), 10)
			});
			return;
		}

		this.RequestRoom();
		this.Remove();
	}


	/**
	 * Pseudo functions :)
	 */
	ChatRoomCreate.RequestRoom = function RequestRoom(){};


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(ChatRoomCreate);
});