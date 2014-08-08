/**
 * UI/Components/PartyFriends/PartyFriends.js
 *
 * Manage interface for parties and friends
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
	var DB             = require('DB/DBManager');
	var Preferences    = require('Core/Preferences');
	var Client         = require('Core/Client');
	var Renderer       = require('Renderer/Renderer');
	var Session        = require('Engine/SessionStorage');
	var UIManager      = require('UI/UIManager');
	var UIComponent    = require('UI/UIComponent');
	var ContextMenu    = require('UI/Components/ContextMenu/ContextMenu');
	var ChatBox        = require('UI/Components/ChatBox/ChatBox');
	var htmlText       = require('text!./PartyFriends.html');
	var cssText        = require('text!./PartyFriends.css');


	/**
	 * Create Component
	 */
	var PartyFriends = new UIComponent('PartyFriends', htmlText, cssText );


	/**
	 * @var {number} index of selection
	 */
	var _index = -1;


	/**
	 * @var {Array} friends list
	 */
	var _friends = [];


	/**
	 * @var {Array} party list
	 */
	var _party = [];


	/**
	 * @var {Preferences} structure
	 */
	var _preferences = Preferences.get('PartyFriends', {
		x:        200,
		y:        200,
	//	width:    7,
	//	height:   4,
		show:     false,
		friend:   true,
		lock:     false
	}, 1.0);


	/**
	 * Initialize the component (event listener, etc.)
	 */
	PartyFriends.init = function init()
	{
		// Avoid drag drop problems
		this.ui.find('.base').mousedown(function(event){
			event.stopImmediatePropagation();
			return false;
		});

		// Bind buttons
		this.ui.find('.close').click(onClose);
		this.ui.find('.lock').mousedown(onToggleLock);
		this.ui.find('.switchtab.off').mousedown(onChangeTab);
		this.ui.find('.remove').mousedown(onRequestRemoveSelection);
		this.ui.find('.privatemessage').mousedown(onRequestPrivateMessage);
		this.ui.find('.leave').mousedown(onRequestLeaveParty);

		//this.ui.find('.mail').mousedown();
		//this.ui.find('.info').mousedown();
		//this.ui.find('.party.create').mousedown();
		//this.ui.find('.party.add').mousedown();

		this.ui.find('.content')
			.on('contextmenu', '.name', onRightClickInfo)
			.on('mousedown',   '.name', onSelectionChange)

		this.draggable(this.ui.find('.titlebar'));
	};


	/**
	 * Once append to the DOM, start to position the UI
	 */
	PartyFriends.onAppend = function onAppend()
	{
		// Initialize the tab
		_preferences.friend = !_preferences.friend;
		onChangeTab();

		// Lock features
		if (_preferences.lock) {
			this.ui.find('.lock.on').show();
			this.ui.find('.lock.off').hide();
		}
		else {
			this.ui.find('.lock.on').hide();
			this.ui.find('.lock.off').show();
		}

		// TODO:
		//this.resize( _preferences.width, _preferences.height );

		this.ui.css({
			top:  Math.min( Math.max( 0, _preferences.y), Renderer.height - this.ui.height()),
			left: Math.min( Math.max( 0, _preferences.x), Renderer.width  - this.ui.width())
		});

		if (!_preferences.show) {
			this.ui.hide();
		}
	};


	/**
	 * Removing the UI from window, save preferences
	 *
	 */
	PartyFriends.onRemove = function onRemove()
	{
		// TODO: does the packet is sent at each map-change ?
		//this.ui.find('.container .content').empty();

		// Save preferences
		_preferences.show   =  this.ui.is(':visible');
		_preferences.y      =  parseInt(this.ui.css('top'), 10);
		_preferences.x      =  parseInt(this.ui.css('left'), 10);
		//_preferences.width  =  Math.floor( (this.ui.width()  - (23 + 16 + 16 - 30)) / 32 );
		//_preferences.height =  Math.floor( (this.ui.height() - (31 + 19 - 30     )) / 32 );
		_preferences.save();
	};


	/**
	 * Window Shortcuts
	 */
	PartyFriends.onShortCut = function onShurtCut( key )
	{
		switch (key.cmd) {
			case 'FRIEND':
				if (_preferences.friend) {
					this.ui.toggle();
				}
				else {
					_preferences.friend = true;
					onChangeTab();
					this.ui.show();
				}

				if (this.ui.is(':visible')) {
					this.focus();
				}
				break;

			case 'PARTY':
				if (!_preferences.friend) {
					this.ui.toggle();
				}
				else {
					_preferences.friend = false;
					onChangeTab();
					this.ui.show();
				}

				if (this.ui.is(':visible')) {
					this.focus();
				}
				break;
		}
	};


	/**
	 * Set friends to UI
	 *
	 * @param {Array} friends list
	 */
	PartyFriends.setFriends = function setFriends( friends )
	{
		var i, count = friends.length;
		var ui = this.ui.find('.content .friend');

		_friends.length = friends.length;
		ui.empty();

		for (i = 0; i < count; i++) {
			_friends[i] = friends[i];
			ui.append(
				'<div class="node">' +
					'<span class="name">' + friends[i].Name + '</span>' +
				'</div>'
			);
		}

		this.ui.find('.friendcount').text(count);
		_index = -1;
	};


	/**
	 * Update friend (online/offline) state
	 *
	 * @param {number} index
	 * @param {boolean} state
	 */
	PartyFriends.updateFriendState = function updateFriendState( index, state)
	{
		var node = this.ui.find('.content .friend .node:eq(' + index + ')');

		if (!state) {
			node.css('backgroundImage', '');
			return;
		}

		Client.loadFile(DB.INTERFACE_PATH + 'basic_interface/grp_online.bmp', function(url){
			node.css('backgroundImage', url);
		});
	};


	/**
	 * Update/Add a friend to the list
	 *
	 * @param {number} index
	 * @param {object} friend data
	 */
	PartyFriends.updateFriend = function updateFriend(idx, friend)
	{
		// Add it
		if (!_friends[idx]) {
			_friends[idx] = friend;

			this.ui.find('.content .friend').append(
				'<div class="node">' +
					'<span class="name">' + friend.Name + '</span>' +
				'</div>'
			);

			this.ui.find('.friendcount').text(_friends.length);
			return;
		}

		_friends[idx].Name = friend.Name;
		_friends[idx].GID  = friend.GID;
		_friends[idx].AID  = friend.AID;

		this.ui.find('.content .friend .node:eq('+ index +') .name').text(friend.Name);
	};


	/**
	 * Remove friend from list
	 *
	 * @param {number} index
	 */
	PartyFriends.removeFriend = function removeFriend(index)
	{
		_friends.splice(index, 1);
		this.ui.find('.content .friend .node:eq('+ index +')').remove();
		this.ui.find('.friendcount').text(_friends.length);

		if (_index === index) {
			_index = -1;
		}
	};


	/**
	 * Add members to party
	 *
	 * @param {string} party name
	 * @param {Array} member list
	 */
	PartyFriends.setParty = function setParty(name, members)
	{
		this.ui.find('.partyname').text('('+name+')');

		var i, count = members.length;
		var ui = this.ui.find('.content .party');

		_party.length = count;
		ui.empty();

		for (i = 0; i < count; i++) {
			_party[i] = members[i];
			ui.append(
				'<div class="node'+ (members[i].role === 0 ? ' leader' : '') + (members[i].state === 0 ? ' online' : '') +'">' +
					'<span class="name">' + members[i].characterName + '</span>' +
					'<span class="map">(' + members[i].mapName + ')</span>' +
					'<canvas class="life"></canvas> <span class="hp">0/0</span>' +
				'</div>'
			);
		}

		_index = -1;
	};


	/**
	 * Add a new party member to the list
	 *
	 * @param {object} player information
	 */
	PartyFriends.addPartyMember = function addPartyMember( player )
	{
		_party.push(player);

		this.ui.find('.content .party').append(
			'<div class="node'+ (members[i].Role === 0 ? ' leader' : '') + (members[i].state === 0 ? ' online' : '') +'">' +
				'<span class="name">' + members[i].characterName + '</span>' +
				'<span class="map">(' + members[i].mapName + ')</span>' +
				'<canvas class="life"></canvas> <span class="hp">0/0</span>' +
			'</div>'
		);
	};


	/**
	 * Remove a character from list
	 *
	 * @param {number} account id
	 */
	PartyFriends.removePartyMember = function removePartyMember( AID )
	{
		if (AID === Session.AID) {
			_party.length = 0;
			this.ui.find('.content .party .node').empty();
			return;
		}

		var i, count = _party.length;

		for (i = 0; i < count; ++i) {
			if (_party[i].AID === AID) {
				_party.splice(i, 1);
				this.ui.find('.content .party .node:eq(' + i + ')').remove();
				break;
			}
		}
	};


	/**
	 * Update player life in interface
	 *
	 * @param {number} account id
	 * @param {canvas} canvas life element
	 * @param {number} hp
	 * @param {number} maxhp
	 */
	PartyFriends.updateMemberLife = function updateMemberLife(AID, canvas, hp, maxhp)
	{
		for (i = 0; i < count; ++i) {
			if (_party[i].AID === AID) {
				var node = this.ui.find('.content .party .node:eq(' + i + ')');
				var ctx  = node.find('canvas').get(0).getContext('2d');

				ctx.drawImage(canvas, 0, 0, ctx.canvas.width, ctx.canvas.height);
				node.find('.hp').text(hp + '/' + maxhp);
				break;
			}
		}
	};


	/**
	 * Close the window
	 */
	function onClose()
	{
		PartyFriends.ui.hide();
	}


	/**
	 * Enable or disable the lock features
	 */
	function onToggleLock()
	{
		_preferences.lock = !_preferences.lock;
		_preferences.save();

		if (_preferences.lock) {
			PartyFriends.ui.find('.lock.on').show();
			PartyFriends.ui.find('.lock.off').hide();
		}
		else {
			PartyFriends.ui.find('.lock.on').hide();
			PartyFriends.ui.find('.lock.off').show();
		}
	}


	/**
	 * Move to the other tab (Friend -> Party or Party -> Friend)
	 */
	function onChangeTab()
	{
		var ui = PartyFriends.ui;

		_preferences.friend = !_preferences.friend;
		_preferences.save();

		// Initialize the tab
		if (_preferences.friend) {
			ui.find('.friend').show();
			ui.find('.party').hide();
		}
		else {
			ui.find('.friend').hide();
			ui.find('.party').show();

			if (Session.hasParty) {
				ui.find('.party.create').hide();
				ui.find('.party.leave').show();

				// TODO: if is leader
				ui.find('.party.add').show();
			}
			else {
				ui.find('.party.create').show();
				ui.find('.party.add, .party.leave').hide();
			}
		}

		ui.find('.node').removeClass('.selection');
		_index = -1;
	}


	/**
	 * Ask confirmation to remove a character from the list
	 */
	function onRequestRemoveSelection()
	{
		if (_index < 0) {
			return;
		}

		var text = _preferences.friend ? DB.getMessage(356) : DB.getMessage(363);

		// Are you sure that you want to delete/expel ?
		UIManager.showPromptBox( text, 'ok', 'cancel', function(){
			if (_preferences.friend) {
				PartyFriends.onRemoveFriend(_index);
				//TODO
				//PartyFriends.ui.find('.friend .node:eq('+ _index +')').remove();
				//_friends.splice(_index, 1);
				//_index = -1;
				//this.ui.find('.friendcount').text(_friends.length);
			}
			else {
				PartyFriends.onExpelMember(_index);
				PartyFriends.ui.find('.party .node:eq('+ _index +')').remove();
				_party.splice(_index, 1);
				_index = -1;
			}
		});
	}


	/**
	 * Add nick name to chatbox
	 * Or open a new conversation window (todo)
	 */
	function onRequestPrivateMessage()
	{
		if (_index < 0) {
			return;
		}

		var target = _preferences.friend ? _friends[_index] : _party[_index];
		ChatBox.ui.find('.username').val(target.Name);
	}


	/**
	 * Right click on a character
	 */
	function onRightClickInfo()
	{
		ContextMenu.append();

		if (_preferences.friend) {
			ContextMenu.addElement( DB.getMessage(348), onRequestPrivateMessage);

			if (_friends[_index].GID !== Session.GID) {
				ContextMenu.addElement( DB.getMessage(341), onRequestRemoveSelection);
			}
		}
		else {
			ContextMenu.addElement( DB.getMessage(129), onRequestInformation);

			if (_party[_index].GID === Session.GID) {
				ContextMenu.addElement( DB.getMessage(2055), onRequestLeaveParty);
			}
			else {
				ContextMenu.addElement( DB.getMessage(348), onRequestPrivateMessage);

				// if leader (TODO)
				ContextMenu.addElement( DB.getMessage(97),   onRequestRemoveSelection);
				ContextMenu.addElement( DB.getMessage(1531), onRequestPartyDelegation);
			}
		}
	}


	/**
	 * Request player information
	 * (Not implemented yet in official client)
	 */
	function onRequestInformation()
	{
		// Not implemented yet
		UIManager.showMessageBox( DB.getMessage(191), 'ok');
	}


	/**
	 * Request to leave a party
	 */
	function onRequestLeaveParty()
	{
		// Are you sure that you want to leave ?
		UIManager.showPromptBox( DB.getMessage(357), 'ok', 'cancel', function(){
			PartyFriends.onRequestLeave();
		});
	}


	/**
	 * Request to change party leader
	 * (need to be the leader)
	 */
	function onRequestPartyDelegation()
	{
		// Do you want to delegate the real party?
		UIManager.showPromptBox( DB.getMessage(1532), 'ok', 'cancel', function(){
			PartyFriends.onRequestChangeLeader(_index);
		});
	}


	/**
	 * Change selection (click on a friend/party)
	 */
	function onSelectionChange()
	{
		PartyFriends.ui.find('.content .name').removeClass('selection');
		this.classList.add('selection');

		_index = PartyFriends.ui.find(this.parentNode.parentNode).find('.name').index(this);
	}


	/**
	 * Callbacks to define
	 */
	PartyFriends.onRemoveFriend        = function(){};
	PartyFriends.onRequestLeave        = function(){};
	PartyFriends.onExpelMember         = function(){};
	PartyFriends.onRequestChangeLeader = function(){};
	PartyFriends.onRequestAddingMember = function(){};
	PartyFriends.onRequestCreateParty  = function(){};


	/**
	 * Export
	 */
	return UIManager.addComponent(PartyFriends);
});