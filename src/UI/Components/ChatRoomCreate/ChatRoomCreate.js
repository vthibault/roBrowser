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
	var UIManager   = require('UI/UIManager');
	var UIComponent = require('UI/UIComponent');
	//var ChatBox     = require('UI/Components/ChatBox/ChatBox');
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


	/*
	 * Show the setup for room creation
	 */
	ChatRoomCreate.Show = function ShowSetup()
	{
		this.ui.show();
		this.ui.find('.title').focus();
	};
	
	
	/*
	 * Remove the setup ui
	 */
	ChatRoomCreate.Remove = function RemoveSetup()
	{
		this.ui.hide();
		this.ui.find('.setup')[0].reset();
	};
	

	/**
	 * Key Listener
	 *
	 * @param {object} event
	 * @return {boolean}
	 */
	ChatRoomCreate.onKeyDown = function OnKeyDown( event )
	{
		if (KEYS.ALT && event.which === KEYS.C) {
			if (this.ui.is(':visible')) {
				this.Remove();
			}
			else {
				this.Show();	
			}
			event.stopImmediatePropagation();
			return false;
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
			ChatBox.addText( DB.msgstringtable[13], ChatBox.Type.ERROR);
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