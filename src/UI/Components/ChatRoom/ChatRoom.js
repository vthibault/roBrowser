/**
 * UI/Components/ChatRoom/ChatRoom.js
 *
 * Chat room box UI
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
	var Preferences        = require('Core/Preferences');
	var jQuery             = require('Utils/jquery');
	var Renderer           = require('Renderer/Renderer');
	var Mouse              = require('Controls/MouseEventHandler');
	var KEYS               = require('Controls/KeyEventHandler');
	var ChatBox            = require('UI/Components/ChatBox/ChatBox') 
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var htmlText           = require('text!./ChatRoom.html');
	var cssText            = require('text!./ChatRoom.css');


	/**
	 * Create Component
	 */
	var ChatRoom = new UIComponent( 'ChatRoom', htmlText, cssText );
	
	
	/**
	 * Chat room title
	 */
	ChatRoom.TITLE = null;


	/**
	 * Chat room limit
	 */
	ChatRoom.LIMIT = 0;


	/**
	 * Chat room type
	 */
	ChatRoom.TYPE = 0;
	
	
	/**
	 * Number of players in the chat
	 */
	ChatRoom.COUNT = 0;
	
	
	/**
	 * Members list
	 */
	ChatRoom.MEMBERS = [];
	
	
	/**
	 * Chat Owner
	 */
	ChatRoom.OWNER = null;
	
	
	/**
	 * Temporary fix to determine if chat is open
	 */
	ChatRoom.OPEN = 0;
	


	/**
	 * @var {Preference} structure to save
	 */
	ChatRoom.preferences = Preferences.get( 'ChatRoom', {
		x:        480,
		y:        200,
		width:    7,
		height:   4
	}, 1.0);


	/**
	 * Initialize UI
	 */
	ChatRoom.init = function Init()
	{
		// Bindings
		this.ui.find('.extend').mousedown( this.extend.bind(this) );
		this.ui.find('.close').on('click', this.remove.bind(this) );
		
		//Dont activate drag
		this.ui.find('input, select, button').mousedown(function( event ) {
			event.stopImmediatePropagation();
		})

		this.draggable();
	};
	
	
	/**
	 * After init()
	 */
	ChatRoom.onAppend = function onAppend() {
		this.OPEN = 1;
		
		this.resize( this.preferences.width, this.preferences.height );

		this.ui.css({
			top:  Math.min( Math.max( 0, this.preferences.y), Renderer.height - this.ui.height()),
			left: Math.min( Math.max( 0, this.preferences.x), Renderer.width  - this.ui.width())
		});

		this.UpdateChat();
	};
	
	
	/**
	 * On remove() chat ui
	 */
	ChatRoom.onRemove = function onRemove() {
		this.TITLE = null;
		this.LIMIT = 0;
		this.TYPE = 0;
		this.COUNT = 0;
		this.MEMBERS = [];
		this.OWNER = null;
		this.OPEN = 0;

		ChatRoom.ExitRoom();
	}
	 
	
	/**
	 * Update chat
	 */
	ChatRoom.UpdateChat = function UpdateChat()
	{
		var members = '';
		
		this.ui.find('.titlebar .title').html( this.TITLE );
		this.ui.find('.titlebar .count').html( this.COUNT + '/' + this.LIMIT );
		
		for(var i in this.MEMBERS) {
			if(this.MEMBERS[i] == this.OWNER) {
				members = '<span class="owner">' + this.MEMBERS[i] + '</span><br/>' + members;
				continue;
			}
			members += this.MEMBERS[i] + '<br/>';
		}
		
		this.ui.find('.members').html( members );
	};
	
	
	/**
	 * Parse and send chat room messages
	 */
	ChatRoom.Send = function ParseChatSend() {
		var message = this.ui.find('.send input[name=message]').val();

		if(message.length < 1) return false;

		ChatBox.onRequestTalk('', message);
		
		this.ui.find('.send input[name=message]').val('');
		
		return true;
	};
	
	
	/**
	 * Display a message in the chat room
	 */
	ChatRoom.message = function displayMessage( message ) {
		this.ui.find('.messages').append(message + '<br/>');
		
		return true;
	};
	 
	/**
	 * Remove a member from the chat
	 */
	ChatRoom.removeMember = function RemoveMember( name ) {
		for(var i in this.MEMBERS) {
			if(this.MEMBERS[i] == name) {
				this.MEMBERS.splice(i, 1);
				return true;
			}
		}
		return false;
	}
	

	/**
	 * Extend inventory window size
	 */
	ChatRoom.extend = function Extend( event )
	{
		var ui      = this.ui;
		var content = ui.find('.container .content');
		var hide    = ui.find('.hide');
		var top     = ui.position().top;
		var left    = ui.position().left;
		var lastWidth  = 0;
		var lastHeight = 0;
		var _Interval;

		function Resizing()
		{
			var extraX = 23 + 16 + 16 - 30;
			var extraY = 31 + 19 - 30;

			var w = Math.floor( (Mouse.screen.x - left - extraX) / 32 );
			var h = Math.floor( (Mouse.screen.y - top  - extraY) / 32 );

			// Maximum and minimum window size
			w = Math.min( Math.max(w, 6), 9);
			h = Math.min( Math.max(h, 2), 6);

			if( w === lastWidth && h === lastHeight ) {
				return;
			}

			ChatRoom.resize( w, h );
			lastWidth  = w;
			lastHeight = h;

			//Show or hide scrollbar
			/*
			if( content.height() === content[0].scrollHeight ) {
				hide.show();
			}
			else {
				hide.hide();
			}
			*/
		}

		// Start resizing
		_Interval = setInterval( Resizing, 30);

		// Stop resizing
		jQuery(window).one('mouseup', function(event){
			// Only on left click
			if ( event.which === 1 ) {
				clearInterval(_Interval);
			}
		});

		event.stopImmediatePropagation();
		return false;
	};


	/**
	 * Extend inventory window size
	 */
	ChatRoom.resize = function Resize( width, height )
	{
		width  = Math.min( Math.max(width,  6), 9);
		height = Math.min( Math.max(height, 2), 6);

		this.ui.find('.container .content').css({
			width:  width  * 32 + 13, // 13 = scrollbar
			height: height * 32
		});

		this.ui.css({
			width:  23 + 16 + 16 + width  * 32,
			height: 31 + 19      + height * 32
		});
	};
	

	/**
	 * Key Event Handler
	 *
	 * @param {object} event - KeyEventHandler
	 * @return {boolean}
	 */
	ChatRoom.onKeyDown = function OnKeyDown( event )
	{
		if(event.which === KEYS.ENTER) {
			this.Send();
			
			event.stopImmediatePropagation();
			return false;
		}

		return true;
	};


	/**
	 * Pseudo functions :)
	 */
	ChatRoom.SendMes = function SendMes() {};


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(ChatRoom);
});