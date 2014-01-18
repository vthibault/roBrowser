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
	var KEYS               = require('Controls/KeyEventHandler');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var htmlText           = require('text!./ChatRoomCreate.html');
	var cssText            = require('text!./ChatRoomCreate.css');


	/**
	 * Create Component
	 */
	var ChatRoomCreate = new UIComponent( 'ChatRoomCreate', htmlText, cssText );
	
	
	/**
	 * Chat room title
	 * Default: ''
	 */
	ChatRoomCreate.TITLE = null;


	/**
	 * Chat room limit
	 * Default: 20
	 */
	ChatRoomCreate.LIMIT = 0;


	/**
	 * Chat room types
	 * 0 = Private
	 * 1 = Public * Default
	 */
	ChatRoomCreate.TYPE = 0;
	
	
	/**
	 * Chat Room Password
	 * Default: ''
	 */
	ChatRoomCreate.SIGN = null;


	/**
	 * Initialize UI
	 */
	ChatRoomCreate.init = function Init()
	{
		// Bindings
		this.ui.find('.close').on('click', this.Remove.bind(this) );
		this.ui.find('.setup').submit(function() { return false; });
		this.ui.find('.ok').on('click', this.Submit.bind(this) );
		
		//Dont activate drag
		this.ui.find('input, select, button').mousedown(function( event ) {
			event.stopImmediatePropagation();
		})

		this.draggable();
	};
	
	
	/*
	 * After init()
	 */
	ChatRoomCreate.onAppend = function onAppend() {
		this.ui.hide();
	}
	 
	
	/*
	 * Show the setup for room creation
	 */
	ChatRoomCreate.Show = function ShowSetup()
	{
		this.ui.show();
	};
	
	
	/*
	 * Remove the setup ui
	 */
	ChatRoomCreate.Remove = function RemoveSetup()
	{
		this.ui.hide();
		this.ui.find('.setup')[0].reset();
	}
	

	/**
	 * Key Listener
	 *
	 * @param {object} event
	 * @return {boolean}
	 */
	ChatRoomCreate.onKeyDown = function OnKeyDown( event )
	{
		if( KEYS.ALT && event.which === KEYS.C ) {
			if( this.ui.is(':visible') ) {
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
	ChatRoomCreate.Submit = function ParseChatSetup() {
		this.TITLE = this.ui.find('input[name=title]').val();
		this.LIMIT = this.ui.find('select[name=limit]').val();
		this.TYPE  = this.ui.find('input[name=public]').val();
		this.SIGN  = this.ui.find('input[name=password]').val();
		
		if(this.TITLE.length < 1) return false;

		this.RequestRoom();
		this.Remove();
		
		return true;
	};


	/**
	 * Pseudo functions :)
	 */
	ChatRoomCreate.RequestRoom = function RequestRoom() {};


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(ChatRoomCreate);
});