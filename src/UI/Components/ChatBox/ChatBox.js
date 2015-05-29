/**
 * UI/Components/ChatBox/ChatBox.js
 *
 * ChatBox windows
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
	var DB                 = require('DB/DBManager');
	var jQuery             = require('Utils/jquery');
	var Renderer           = require('Renderer/Renderer');
	var Client             = require('Core/Client');
	var Events             = require('Core/Events');
	var Preferences        = require('Core/Preferences');
	var KEYS               = require('Controls/KeyEventHandler');
	var BattleMode         = require('Controls/BattleMode');
	var History            = require('./History');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var ContextMenu        = require('UI/Components/ContextMenu/ContextMenu');
	var htmlText           = require('text!./ChatBox.html');
	var cssText            = require('text!./ChatBox.css');
	var ProcessCommand     = require('Controls/ProcessCommand');


	/**
	 * @var {number} max message in the chatbox
	 */
	var MAX_MSG = 50;


	/**
	 * @var {History} message cached in history
	 */
	var _historyMessage = new History();


	/**
	 * @var {History} nickname cached in history
	 */
	var _historyNickName = new History(true);



	/**
	 * @var {number} Chatbox position's index
	 */
	var _heightIndex = 2;


	/**
	 * @var {Preferences} structure
	 */
	var _preferences = Preferences.get('ChatBox', {
		x:      5,
		y:      Infinity,
		height: 2
	}, 1.0);


	/**
	 * Create Basic Info component
	 */
	var ChatBox = new UIComponent( 'ChatBox', htmlText, cssText );


	/**
	 * Constants
	 */
	ChatBox.TYPE = {
		SELF:     1 << 0,
		PUBLIC:   1 << 1,
		PRIVATE:  1 << 2,
		PARTY:    1 << 3,
		GUILD:    1 << 4,
		ANNOUNCE: 1 << 5,
		ERROR:    1 << 6,
		INFO:     1 << 7,
		BLUE:     1 << 8, // TODO: find a better name
		ADMIN:    1 << 9,
	};


	/**
	 * @var {number} target message ?
	 */
	var _sendTo = ChatBox.TYPE.PUBLIC;


	/**
	 * Storage to cache the private messages
	 * Ugly system used by official client, can lead to errors
	 */
	ChatBox.PrivateMessageStorage = {
		nick: '',
		msg:  ''
	};


	/**
	 * Initialize UI
	 */
	ChatBox.init = function init()
	{
		_heightIndex = _preferences.height - 1;
		ChatBox.updateHeight();

		this.ui.css({
			top:  Math.min( Math.max( 0, _preferences.y - this.ui.height()), Renderer.height - this.ui.height()),
			left: Math.min( Math.max( 0, _preferences.x), Renderer.width  - this.ui.width())
		});

		this.draggable( this.ui.find('.input') );

		// Sorry for this un-documented code (see UIComponent for more informations)
		this.__mouseStopBlock = this.ui.find('.input');

		// Setting chatbox scrollbar
		Client.loadFiles([DB.INTERFACE_PATH + 'basic_interface/dialscr_down.bmp', DB.INTERFACE_PATH + 'basic_interface/dialscr_up.bmp'], function( down, up ){
			jQuery('style:first').append([
				'#chatbox .content::-webkit-scrollbar { width: 10px; height: 10px;}',
				'#chatbox .content::-webkit-scrollbar-button:vertical:start:increment,',
				'#chatbox .content::-webkit-scrollbar-button:vertical:end:decrement { display: none;}',
				'#chatbox .content::-webkit-scrollbar-corner:vertical { display:none;}',
				'#chatbox .content::-webkit-scrollbar-resizer:vertical { display:none;}',
				'#chatbox .content::-webkit-scrollbar-button:start:decrement,',
				'#chatbox .content::-webkit-scrollbar-button:end:increment { display: block; border:none;}',
				'#chatbox .content::-webkit-scrollbar-button:vertical:increment { background: url('+ down +') no-repeat; height:10px;}',
				'#chatbox .content::-webkit-scrollbar-button:vertical:decrement { background: url('+ up +') no-repeat; height:10px;}',
				'#chatbox .content::-webkit-scrollbar-track-piece:vertical { background:black; border:none;}',
				'#chatbox .content::-webkit-scrollbar-thumb:vertical { background:grey; -webkit-border-image:none; border-color:transparent;border-width: 0px 0; }'
			].join('\n'));
		});

		// Input selection
		this.ui.find('.input input').mousedown(function( event ){
			this.select();
			event.stopImmediatePropagation();
			return false;
		});

		this.ui.find('.input .message').blur(function(){
			Events.setTimeout(function(){
				if (!document.activeElement.tagName.match(/input|select|textarea/i)) {
					this.ui.find('.input .message').focus();
				}
			}.bind(this), 1);
		}.bind(this));

		// Button change name
		this.ui.find('.header input').dblclick(function(){
			this.type = 'text';
			this.select();
		}).blur(function(){
			this.type = 'button';
		});

		// Private message selection
		this.ui.find('.input .list').click(function(){
			var names = _historyNickName.list;
			var i, count = names.length;
			var pos = jQuery(this).offset();
			var ui = ContextMenu.ui.find('.menu');

			if (!count) {
				ChatBox.addText( DB.getMessage(192), ChatBox.TYPE.ERROR);
				return;
			}

			ContextMenu.remove();
			ContextMenu.append();

			for (i = 0; i < count; ++i) {
				ContextMenu.addElement(names[i], onPrivateMessageUserSelection(names[i]));
			}

			ContextMenu.addElement('', onPrivateMessageUserSelection(''));
			ui.css({
				top:  pos.top - ui.height() - 5,
				left: pos.left - ui.width() - 5
			});
		}).mousedown(function(event){
			event.stopImmediatePropagation();
			return false;
		});

		// Send message to...
		this.ui.find('.input .filter').click(function(){
			var pos = jQuery(this).offset();
			var ui = ContextMenu.ui.find('.menu');

			ContextMenu.remove();
			ContextMenu.append();

			ContextMenu.addElement(DB.getMessage(85),  onChangeTargetMessage(ChatBox.TYPE.PUBLIC));
			ContextMenu.addElement(DB.getMessage(86),  onChangeTargetMessage(ChatBox.TYPE.PARTY));
			ContextMenu.addElement(DB.getMessage(437), onChangeTargetMessage(ChatBox.TYPE.GUILD));

			ui.css({
				top:  pos.top - ui.height() - 5,
				left: pos.left - ui.width() + 25
			});
		}).mousedown(function(event){
			event.stopImmediatePropagation();
			return false;
		});

		// Change size
		this.ui.find('.input .size').click(function( event ){
			ChatBox.updateHeight(true);
			event.stopImmediatePropagation();
			return false;
		});

		// Scroll feature should block at each line
		this.ui.find('.content').on('mousewheel DOMMouseScroll', onScroll);
	};


	/**
	 * Clean up the box
	 */
	ChatBox.clean = function Clean()
	{
		var matches, i, count;

		matches = this.ui.find('.content').html().match(/(blob:[^"]+)/g);
		
		if (matches) {
			for (i = 0, count = matches.length; i < count; ++i) {
				window.URL.revokeObjectURL(matches[i]);
			}
		}

		this.ui.find('.content').empty();
		this.ui.find('.input .message').val('');
		this.ui.find('.input .username').val('');

		_historyMessage.clear();
		_historyNickName.clear();
	};


	/**
	 * Once append to HTML
	 */
	ChatBox.onAppend = function OnAppend()
	{
		// Focus the input
		this.ui.find('.input .message').focus();

		var content = this.ui.find('.content')[0];
		content.scrollTop = content.scrollHeight;
	};


	/**
	 * Stop custom scroll
	 */
	ChatBox.onRemove = function OnRemove()
	{
		this.ui.find('.content').off('scroll');

		_preferences.y      = parseInt(this.ui.css('top'), 10) + this.ui.height();
		_preferences.x      = parseInt(this.ui.css('left'), 10);
		_preferences.height = _heightIndex;
		_preferences.save();
	};


	/**
	 * BattleMode processing
	 *
	 * @param {number} key id to check
	 * @return {boolean} found a shortcut ?
	 */
	ChatBox.processBattleMode = function processBattleMode( keyId )
	{
		// Direct process
		if (this.ui.find('.battlemode').is(':visible') ||
			KEYS.ALT || KEYS.SHIFT || KEYS.CTRL ||
			(keyId >= KEYS.F1 && keyId <= KEYS.F24)) {
			return BattleMode.process(keyId);
		}

		var messageBox = this.ui.find('.input .message');
		var text       = messageBox.val();

		// Hacky, need to wait the browser to add text in the input
		// If there is no change, send the shortcut.
		Events.setTimeout(function(){
			// Nothing rendered, can process the shortcut
			if (messageBox.val() === text) {
				BattleMode.process(keyId);
			}
		}.bind(this), 4);

		return false;
	};


	/**
	 * Key Event Handler
	 *
	 * @param {object} event - KeyEventHandler
	 * @return {boolean}
	 */
	ChatBox.onKeyDown = function OnKeyDown( event )
	{
		var messageBox = this.ui.find('.input .message');
		var nickBox    = this.ui.find('.input .username');

		switch (event.which) {

			// Battle mode system
			default:
				if (ChatBox.processBattleMode(event.which)) {
					event.stopImmediatePropagation();
					return false;
				}
				return true;

			// Switch from user name, to message input
			case KEYS.TAB:
				if (document.activeElement === messageBox[0]) {
					nickBox.select().focus();
					break;
				}

				if (document.activeElement === nickBox[0]) {
					messageBox.select().focus();
					break;
				}
				return true;

			// Get back message from history
			case KEYS.UP:
				if (!jQuery('#NpcMenu').length) {
					if (document.activeElement === messageBox[0]) {
						messageBox.val(_historyMessage.previous()).select();
						break;
					}

					if (document.activeElement === nickBox[0]) {
						nickBox.val(_historyNickName.previous()).select();
						break;
					}
				}
				return true;

			// Message from history
			case KEYS.DOWN:
				if (!jQuery('#NpcMenu').length) {
					if (document.activeElement === messageBox[0]) {
						messageBox.val(_historyMessage.next()).select();
						break;
					}

					if (document.activeElement === nickBox[0]) {
						nickBox.val(_historyNickName.next()).select();
						break;
					}
				}
				return true;

			// Update chat height
			case KEYS.F10:
				this.updateHeight(false);
				break;

			// Send message
			case KEYS.ENTER:
				if (document.activeElement.tagName === 'INPUT' &&
				    document.activeElement !== messageBox[0]) {
					return true;
				}

				if (jQuery('#NpcMenu, #NpcBox').length) {
					return true;
				}

				messageBox.focus();
				this.submit();
				break;
		}

		event.stopImmediatePropagation();
		return false;
	};


	/**
	 * Process ChatBox message
	 */
	ChatBox.submit = function Submit()
	{
		var input = this.ui.find('.input');
		var $user = input.find('.username');
		var $text = input.find('.message');

		var user = $user.val();
		var text = $text.val();

		// Battle mode
		if (!text.length) {
			input.toggle();
			this.ui.find('.battlemode').toggle();

			if (input.is(':visible')) {
				$text.focus();
			}
			return;
		}

		// Private message
		if (user.length && text[0] !== '/') {
			this.PrivateMessageStorage.nick = user;
			this.PrivateMessageStorage.msg  = text;
			_historyNickName.push(user);
			_historyNickName.previous();
		}

		// Save in history
		_historyMessage.push(text);

		$text.val('');

		// Command
		if (text[0] === '/') {
			ProcessCommand.call(this, text.substr(1) );
			return;
		}

		this.onRequestTalk( user, text, _sendTo );
	};


	/**
	 * Add text to chatbox
	 *
	 * @param {string} text
	 * @param {number} type
	 * @param {string} color
	 * @param {boolean} default false, html or text ? 
	 */
	ChatBox.addText = function addText( text, type, color, override )
	{
		var $content = this.ui.find('.content');

		if (!color) {
			if ((type & ChatBox.TYPE.PUBLIC) && (type & ChatBox.TYPE.SELF)) {
				color = '#00FF00';
			}
			else if (type & ChatBox.TYPE.PARTY) {
				color = ( type & ChatBox.TYPE.SELF ) ? 'rgb(200, 200, 100)' : 'rgb(230,215,200)';
			}
			else if (type & ChatBox.TYPE.GUILD) {
				color = 'rgb(180, 255, 180)';
			}
			else if (type & ChatBox.TYPE.PRIVATE) {
				color = '#FFFF00';
			}
			else if (type & ChatBox.TYPE.ERROR) {
				color = '#FF0000';
			}
			else if (type & ChatBox.TYPE.INFO) {
				color = '#FFFF63';
			}
			else if (type & ChatBox.TYPE.BLUE) {
				color = '#00FFFF';
			}
			else if (type & ChatBox.TYPE.ADMIN) {
				color = '#FFFF00';
			}
			else {
				color = 'white';
			}
		}

		$content.append(
			jQuery('<div/>').
				css('color', color)
				[ !override ? 'text' : 'html' ](text)
		);

		// If there is too many line, remove the older one
		
		var list = $content.find('div');
		if (list.length > MAX_MSG) {
			var element, matches;
			var i, count;

			//Check if theres any blob url object to be released from buffer (Check Controls/ScreenShot.js)
			element = list.eq(0);
			matches = element.html().match(/(blob:[^"]+)/g);

			if (matches) {
				for (i = 0, count = matches.length; i < count; ++i) {
					window.URL.revokeObjectURL(matches[i]);
				}
			}

			element.remove();
		}

		// Always put the scroll at the bottom
		$content[0].scrollTop = $content[0].scrollHeight;
	};


	/**
	 * Change chatbox's height
	 */
	ChatBox.updateHeight = function changeHeight( AlwaysVisible )
	{
		var HeightList = [ 0, 0, 3*14, 6*14, 9*14, 12*14, 15*14 ];
		_heightIndex   = (_heightIndex + 1) % HeightList.length;

		var $content   = this.ui.find('.content');
		var height     = HeightList[ _heightIndex ];
		var top        = parseInt( this.ui.css('top'), 10);

		this.ui.css('top', top - (height - $content.height()) );
		$content.height(height);

		// Don't remove UI
		if (_heightIndex === 0 && AlwaysVisible) {
			_heightIndex++;
		}

		switch (_heightIndex) {
			case 0:
				this.ui.hide();
				break;

			case 1:
				this.ui.show();
				this.ui.find('.header, .body').hide();
				this.ui.find('.input').addClass('fix');
				break;

			default:
				this.ui.find('.input').removeClass('fix');
				this.ui.find('.header, .body').show();
				break;
		}

		$content[0].scrollTop = $content[0].scrollHeight;
	};


	/**
	 * Save user name to nick name history
	 *
	 * @param {string} nick name
	 */
	ChatBox.saveNickName = function saveNickName( pseudo )
	{
		_historyNickName.push(pseudo);
	};


	/**
	 * Update scroll by block (14px)
	 */
	function onScroll( event )
	{
		var delta;

		if (event.originalEvent.wheelDelta) {
			delta = event.originalEvent.wheelDelta / 120 ;
			if (window.opera) {
				delta = -delta;
			}
		}
		else if (event.originalEvent.detail) {
			delta = -event.originalEvent.detail;
		}

		this.scrollTop = Math.floor(this.scrollTop/14) * 14 - (delta * 14);
		return false;
	}


	/**
	 * Change private message nick name
	 *
	 * @param {string} nick name
	 * @return {function} callback closure
	 */
	function onPrivateMessageUserSelection(name)
	{
		return function onPrivateMessageUserSelectionClosure()
		{
			ChatBox.ui.find('.input .username').val(name);
		};
	}


	/**
	 * Change target of global chat (party, guild)
	 *
	 * @param {number} type constant
	 */
	function onChangeTargetMessage(type)
	{
		return function onChangeTargetMessageClosure()
		{
			var $input = ChatBox.ui.find('.input .message');

			$input.removeClass('guild party');

			if (type & ChatBox.TYPE.PARTY) {
				$input.addClass('party');
			}
			else if (type & ChatBox.TYPE.GUILD) {
				$input.addClass('guild');
			}

			_sendTo = type;
		};
	}


	/**
	 * Create componentand export it
	 */
	return UIManager.addComponent(ChatBox);
});