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
	'use strict';


	/**
	 * Dependencies
	 */
	var Preferences  = require('Core/Preferences');
	var jQuery       = require('Utils/jquery');
	var Renderer     = require('Renderer/Renderer');
	var Session      = require('Engine/SessionStorage');
	var Mouse        = require('Controls/MouseEventHandler');
	var KEYS         = require('Controls/KeyEventHandler');
	var ChatBox      = require('UI/Components/ChatBox/ChatBox');
	var UIManager    = require('UI/UIManager');
	var UIComponent  = require('UI/UIComponent');
	var htmlText     = require('text!./ChatRoom.html');
	var cssText      = require('text!./ChatRoom.css');
	var getModule    = require;


	/**
	 * Create Component
	 */
	var ChatRoom = new UIComponent( 'ChatRoom', htmlText, cssText );


	/**
	 * @var {string} Chat Room title
	 */
	ChatRoom.title = '';


	/**
	 * @var {number} limit
	 */
	ChatRoom.limit = 20;


	/**
	 * @var {number} type
	 */
	ChatRoom.type = 0;


	/**
	 * @var {number} Number of players in the chat
	 */
	ChatRoom.count = 0;


	/**
	 * @var {Array} Members list
	 */
	ChatRoom.members = [];


	/**
	 * @var {string} Chat Owner
	 */
	ChatRoom.owner = '';


	/**
	 * @var {boolean} is ChatRoom open ? (Temporary fix)
	 */
	ChatRoom.isOpen = false;


	/**
	 * @var {Preference} structure to save
	 */
	var _preferences = Preferences.get('ChatRoom', {
		x:        480,
		y:        200,
		width:    7,
		height:   4
	}, 1.0);


	/**
	 * Initialize UI
	 */
	ChatRoom.init = function init()
	{
		// Bindings
		this.ui.find('.extend').mousedown(onResize);
		this.ui.find('.close')
			.mousedown(function(event){
				event.stopImmediatePropagation();
				return false;
			})
			.click(this.remove.bind(this));

		this.ui.find('.sendmsg').mousedown(function(event){
			event.stopImmediatePropagation();
		});

		this.draggable(this.ui.find('.titlebar'));
	};


	/**
	 * Initialize UI
	 */
	ChatRoom.onAppend = function onAppend()
	{
		this.isOpen = true;
		resize( _preferences.width, _preferences.height );

		this.ui.css({
			top:  Math.min( Math.max( 0, _preferences.y), Renderer.height - this.ui.height()),
			left: Math.min( Math.max( 0, _preferences.x), Renderer.width  - this.ui.width())
		});

		this.ui.find('.sendmsg').focus();
		this.updateChat();
	};


	/**
	 * Clean up variables once removed from DOM
	 */
	ChatRoom.onRemove = function onRemove()
	{
		this.title          = '';
		this.limit          = 20;
		this.type           = 0;
		this.count          = 0;
		this.members.length = 0;
		this.owner          = '';
		this.isOpen         = false;

		this.ui.find('.messages').empty();

		_preferences.y      =  parseInt(this.ui.css('top'), 10);
		_preferences.x      =  parseInt(this.ui.css('left'), 10);
		_preferences.width  =  Math.floor( (this.ui.width()  - (23 + 16 + 16 - 30)) / 32 );
		_preferences.height =  Math.floor( (this.ui.height() - (-30)) / 32 );
		_preferences.save();

		this.exitRoom();
	};


	/**
	 * Update ChatRoom parameters
	 */
	ChatRoom.updateChat = function updateChat()
	{
		var members  = '';
		var i, count = this.members.length;

		this.ui.find('.titlebar .title').text( this.title );
		this.ui.find('.titlebar .count').text( this.count + '/' + this.limit );

		for (i = 0; i < count; ++i) {
			if (this.members[i] == this.owner) {
				members = '<span class="owner">' + jQuery.escape(this.members[i]) + '</span><br/>' + members;
				continue;
			}
			members +=  jQuery.escape(this.members[i]) + '<br/>';
		}

		this.ui.find('.members').html( members );
	};


	/**
	 * Parse and send chat room messages
	 */
	function sendChatMessage()
	{
		var ui      = ChatRoom.ui;
		var message = ui.find('.send input[name=message]').val();

		// Nothing to submit
		if (message.length < 1) {
			return false;
		}

		// Process commands
		if (message[0] === '/') {
			getModule('Controls/ProcessCommand').call( ChatBox, message.substr(1) );
			ui.find('.send input[name=message]').val('');
			return true;
		}

		ChatBox.onRequestTalk('', message);
		ui.find('.send input[name=message]').val('');

		return true;
	}


	/**
	 * Display a message in the chat room
	 * @param {string} message
	 */
	ChatRoom.message = function displayMessage( message, type )
	{
		// Escape html tag
		var element = jQuery('<div/>');
		element.text(message);

		if (type) {
			element.addClass(type);
		}
		else if (message.indexOf(Session.Entity.display.name + ' : ') === 0) {
			element.addClass('self');
		}

		var content = this.ui.find('.messages');

		// Append content, move to the bottom
		content.append(element);
		content[0].scrollTop = content[0].scrollHeight;

		return true;
	};


	/**
	 * Remove a member from the chat
	 * @param {string} member name
	 */
	ChatRoom.removeMember = function removeMember( name )
	{
		var pos = this.members.indexOf(name);

		if (pos > -1) {
			this.members.splice(pos, 1);
			return true;
		}

		return false;
	};


	/**
	 * Key Event Handler
	 *
	 * @param {object} event - KeyEventHandler
	 * @return {boolean}
	 */
	ChatRoom.onKeyDown = function onKeyDown( event )
	{
		if (event.which === KEYS.ENTER) {
			sendChatMessage();
			
			event.stopImmediatePropagation();
			return false;
		}

		return true;
	};


	/**
	 * Functions to define
	 */
	ChatRoom.exitRoom = function exitRoom(){};
	

	/**
	 * Resize ChatRoom
	 */
	function onResize()
	{
		var ui         = ChatRoom.ui;
		var top        = ui.position().top;
		var left       = ui.position().left;
		var lastWidth  = 0;
		var lastHeight = 0;
		var _Interval;

		function resizeProcess()
		{
			var extraX = 23 + 16 + 16 - 30;
			var extraY = 31 + 19 - 30;

			var w = Math.floor( (Mouse.screen.x - left - extraX) / 32 );
			var h = Math.floor( (Mouse.screen.y - top  - extraY) / 32 );

			// Maximum and minimum window size
			w = Math.min( Math.max(w, 7), 14);
			h = Math.min( Math.max(h, 3), 8);

			if (w === lastWidth && h === lastHeight) {
				return;
			}

			resize( w, h );
			lastWidth  = w;
			lastHeight = h;
		}

		// Start resizing
		_Interval = setInterval( resizeProcess, 30);

		// Stop resizing
		jQuery(window).one('mouseup', function(event){
			// Only on left click
			if ( event.which === 1 ) {
				clearInterval(_Interval);
			}
		});
	}


	/**
	 * Extend inventory window size
	 */
	function resize( width, height )
	{
		width  = Math.min( Math.max(width,  7), 14);
		height = Math.min( Math.max(height, 3), 8);

		ChatRoom.ui.css('width', 23 + 16 + 16 + width  * 32);
		ChatRoom.ui.find('.resize').css('height', height * 32);
	}


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(ChatRoom);
});