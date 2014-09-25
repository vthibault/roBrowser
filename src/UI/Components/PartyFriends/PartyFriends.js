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
	var DB                   = require('DB/DBManager');
	var jQuery               = require('Utils/jquery');
	var Preferences          = require('Core/Preferences');
	var Client               = require('Core/Client');
	var Renderer             = require('Renderer/Renderer');
	var Session              = require('Engine/SessionStorage');
	var Mouse                = require('Controls/MouseEventHandler');
	var UIManager            = require('UI/UIManager');
	var UIComponent          = require('UI/UIComponent');
	var PartyHelper          = require('UI/Components/PartyFriends/PartyHelper');
	var ContextMenu          = require('UI/Components/ContextMenu/ContextMenu');
	var ChatBox              = require('UI/Components/ChatBox/ChatBox');
	var htmlText             = require('text!./PartyFriends.html');
	var cssText              = require('text!./PartyFriends.css');
	var getModule            = require;


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
	 * @var {Object} party setup
	 */
	var _options = {
		exp_share:         0,
		item_share:        0,
		item_sharing_type: 0
	};

	/**
	 * @var {Preferences} structure
	 */
	var _preferences = Preferences.get('PartyFriends', {
		x:        200,
		y:        200,
		width:    12,
		height:   6,
		show:     false,
		friend:   true,
		lock:     false
	}, 1.0);


	/**
	 * Initialize the component (event listener, etc.)
	 */
	PartyFriends.init = function init()
	{
		// Start loading the helper
		PartyHelper.prepare();

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
		this.ui.find('.resize').mousedown(onResize);

		//this.ui.find('.mail').mousedown();
		this.ui.find('.party.create').mousedown(onOpenPartyCreationWindow);
		this.ui.find('.party.add').mousedown(onOpenPartyInviteWindow);
		this.ui.find('.info').mousedown(onOpenPartyOptionWindow);

		this.ui.find('.content')
			.on('contextmenu', '.name', onRightClickInfo)
			.on('mousedown',   '.name', onSelectionChange);

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

		this.resize( _preferences.width, _preferences.height);

		this.ui.css({
			top:  Math.min( Math.max( 0, _preferences.y), Renderer.height - this.ui.height()),
			left: Math.min( Math.max( 0, _preferences.x), Renderer.width  - this.ui.width())
		});

		if (!_preferences.show) {
			this.ui.hide();
		}
	};


	/**
	 * Clean up UI
	 */
	PartyFriends.clean = function clean()
	{
		_party.length   = 0;
		_friends.length = 0;
		_index          = -1;

		_options.exp_share         = 0;
		_options.item_share        = 0;
		_options.item_sharing_type = 0;

		this.ui.find('.partyname').text('');
		this.ui.find('.friendcount').text('0');
		this.ui.find('.content .party, .content .friend').empty();

		// Reset buttons
		_preferences.friend = !_preferences.friend;
		onChangeTab();
	};


	/**
	 * Removing the UI from window, save preferences
	 *
	 */
	PartyFriends.onRemove = function onRemove()
	{
		// Save preferences
		_preferences.show   = this.ui.is(':visible');
		_preferences.y      = parseInt(this.ui.css('top'), 10);
		_preferences.x      = parseInt(this.ui.css('left'), 10);
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
					_preferences.friend = false;
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
					_preferences.friend = true;
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
	 * Show/Hide UI
	 */
	PartyFriends.toggle = function toggle()
	{
		this.ui.toggle();

		if (this.ui.is(':visible')) {
			this.focus();
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
				'<div class="node'+ (friends[i].State === 0 ? ' online' : '') +'">' +
					'<span class="name">' + jQuery.escape(friends[i].Name) + '</span>' +
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

		_friends[index].State = state;

		if (state) {
			node.css('backgroundImage', '');
			ChatBox.addText( DB.getMessage(1042).replace('%s', _friends[index].Name), ChatBox.TYPE.BLUE);
			return;
		}

		ChatBox.addText( DB.getMessage(1041).replace('%s', _friends[index].Name), ChatBox.TYPE.BLUE);
		Client.loadFile(DB.INTERFACE_PATH + 'basic_interface/grp_online.bmp', function(url){
			node.css('backgroundImage', 'url(' + url + ')');
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
			_friends[idx] = {};

			this.ui.find('.content .friend').append(
				'<div class="node">' +
					'<span class="name"></span>' +
				'</div>'
			);

			this.ui.find('.friendcount').text(_friends.length);
		}

		_friends[idx].Name   = friend.Name;
		_friends[idx].GID    = friend.GID;
		_friends[idx].AID    = friend.AID;
		_friends[idx].State  = friend.State || 0;

		var node = this.ui.find('.content .friend .node:eq('+ idx +')');
		node.find('.name').text(friend.Name);

		Client.loadFile(DB.INTERFACE_PATH + 'basic_interface/grp_online.bmp', function(url){
			node.css('backgroundImage', 'url(' + url + ')');
		});
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
		this.ui.find('.content .party').empty();
		Session.isPartyLeader = false;

		this.ui.find('.party.create').hide();
		this.ui.find('.party.leave').show();

		var i, count = members.length;

		_party.length = 0;
		for (i = 0; i < count; i++) {
			PartyFriends.addPartyMember(members[i]);
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
		var role = player.role || player.Role || 0;
		var i, count = _party.length;
		var node, texture, ctx;

		// Check if we are the leader
		if (player.AID === Session.AID) {
			Session.isPartyLeader = (role === 0);
			if (Session.isPartyLeader) {
				this.ui.find('.party.add').show();
			}
			else {
				this.ui.find('.party.add').hide();
			}
		}

		// Search for duplicates entries
		for (i = 0; i < count; ++i) {
			// No GID, need to compare using charactername (wtf)
			if (_party[i].AID === player.AID && _party[i].characterName === player.characterName) {
				break;
			}
		}

		// Update
		if (i < count) {
			node = this.ui.find('.content .party .node:eq('+ i +')');
			node.removeClass('leader online');

			if (role === 0) {
				node.addClass('leader');
			}
			if (player.state === 0) {
				node.addClass('online');
			}

			node.css('backgroundImage', '');
			node.find('.name').text(player.characterName);
			node.find('.map').text('('+DB.getMapName(player.mapName)+')');
		}

		// Create
		else {
			player = jQuery.extend({}, player);

			_party.push(player);
			this.ui.find('.content .party').append(
				'<div class="node'+ (role === 0 ? ' leader' : '') + (player.state === 0 ? ' online' : '') + '">' +
					'<span class="name">' + jQuery.escape(player.characterName) + '</span>' +
					'<span class="map">(' + jQuery.escape(DB.getMapName(player.mapName)) + ')</span>' +
					'<canvas class="life" width="60" height="5"></canvas> <span class="hp"></span>' +
				'</div>'
			);

			node = this.ui.find('.content .party .node:eq('+ i +')');
		}

		ctx = node.find('canvas').get(0).getContext('2d');
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		node.find('.hp').text('');

		// Update life
		if (player.life && player.life.display) {
			ctx.drawImage(player.life.canvas, 0, 0, 60, 5, 0, 0, 60, 5);
			node.find('.hp').text(player.life.hp + '/' + player.life.hp_max);
		}

		// Add texture
		texture = role === 0 && player.state === 0 ? 'grp_leader.bmp' : player.state === 0 ? 'grp_online.bmp' : '';
		if (texture) {
			Client.loadFile(DB.INTERFACE_PATH + 'basic_interface/' + texture, function(url){
				node.css('backgroundImage', 'url(' + url + ')');
			});
		}
	};


	/**
	 * Remove a character from list
	 *
	 * @param {number} account id
	 * @param {string} character name
	 */
	PartyFriends.removePartyMember = function removePartyMember( AID, characterName )
	{
		if (AID === Session.AID) {
			_party.length = 0;

			this.ui.find('.content .party').empty();
			this.ui.find('.partyname').text('');
			this.ui.find('.party.create').show();
			this.ui.find('.party.leave, .party.add').hide();

			ChatBox.addText( DB.getMessage(84), ChatBox.TYPE.BLUE);
			return;
		}

		var i, count = _party.length;

		for (i = 0; i < count; ++i) {
			// Why Gravity doesn't send the GID ? Meaning we can't have the same
			// character name twice (even in the same account).
			if (_party[i].AID === AID && _party[i].characterName === characterName) {
				_party.splice(i, 1);
				this.ui.find('.content .party .node:eq(' + i + ')').remove();
				break;
			}
		}
	};


	/**
	 * Extend inventory window size
	 *
	 * @param {number} width
	 * @param {number} height
	 */
	PartyFriends.resize = function resize( width, height )
	{
		width  = Math.min( Math.max(width, 12), 13);
		height = Math.min( Math.max(height, 6), 12);

		_preferences.width  = width;
		_preferences.height = height;
		_preferences.save();

		this.ui.find('.content').css({
			width:  width  * 20,
			height: height * 20
		});
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
		var i, count = _party.length;
		var node, ctx;

		for (i = 0; i < count; ++i) {
			// No GID data, so have to check for the online character in
			// the account (since we can have multiple players in a team
			// using the same account).
			if (_party[i].AID === AID && _party[i].state === 0) {
				node = this.ui.find('.content .party .node:eq(' + i + ')');
				ctx  = node.find('canvas').get(0).getContext('2d');

				ctx.drawImage(canvas, 0, 0, 60, 5, 0, 0, 60, 5);
				node.find('.hp').text(hp + '/' + maxhp);
				break;
			}
		}
	};


	/**
	 * Update party options
	 *
	 * @param {boolean} exp share option
	 * @param {boolean} item share option
	 * @param {boolean} item sharing option
	 */
	PartyFriends.setOptions = function setOptions( exp_share, item_share, item_sharing_type)
	{
		_options.exp_share         = exp_share;
		_options.item_share        = item_share;
		_options.item_sharing_type = item_sharing_type;
	};


	/**
	 * Resizing UI
	 */
	function onResize()
	{
		var ui      = PartyFriends.ui;
		var top     = ui.position().top;
		var left    = ui.position().left;
		var lastWidth  = 0;
		var lastHeight = 0;
		var _Interval;

		function resizing()
		{
			var extraX = -20;
			var extraY =  25 + 21;

			var w = Math.floor( (Mouse.screen.x - left - extraX) / 20 );
			var h = Math.floor( (Mouse.screen.y - top  - extraY) / 20 );

			// Maximum and minimum window size
			w = Math.min( Math.max(w, 12), 13);
			h = Math.min( Math.max(h,  6), 12);

			if (w === lastWidth && h === lastHeight) {
				return;
			}

			PartyFriends.resize( w, h );
			lastWidth  = w;
			lastHeight = h;
		}

		// Start resizing
		_Interval = setInterval( resizing, 30);

		// Stop resizing on left click
		jQuery(window).on('mouseup.resize', function(event){
			if (event.which === 1) {
				clearInterval(_Interval);
				jQuery(window).off('mouseup.resize');
			}
		});
	}


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

				if (!Session.isPartyLeader) {
					ui.find('.party.add').hide();
				}
			}
			else {
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
		if (_index < 0 || _preferences.lock || !_party[_index]) {
			return;
		}

		var text = _preferences.friend ? DB.getMessage(356) : DB.getMessage(363);

		// Are you sure that you want to delete/expel ?
		UIManager.showPromptBox( text, 'ok', 'cancel', function(){
			if (_preferences.friend) {
				PartyFriends.onRemoveFriend(_index);
			}
			else {
				PartyFriends.onExpelMember( _party[_index].AID, _party[_index].characterName);
			}
		});
	}


	/**
	 * Add nick name to chatbox
	 * Or open a new conversation window (todo)
	 */
	function onRequestPrivateMessage()
	{
		if (_index < 0 || _preferences.lock) {
			return;
		}

		if (_preferences.friend) {
			ChatBox.ui.find('.username').val(_friends[_index].Name);
		}
		else {
			ChatBox.ui.find('.username').val(_party[_index].characterName);
		}

		ChatBox.ui.find('.message').select();
	}


	/**
	 * Right click on a character
	 */
	function onRightClickInfo()
	{
		if (_preferences.lock) {
			return;
		}

		ContextMenu.remove();
		ContextMenu.append();

		if (_preferences.friend) {
			ContextMenu.addElement( DB.getMessage(360), onRequestPrivateMessage);

			if (_friends[_index].GID !== Session.GID) {
				ContextMenu.addElement( DB.getMessage(351), onRequestRemoveSelection);
			}
		}
		else {
			ContextMenu.addElement( DB.getMessage(129), onRequestInformation);

			if (_party[_index].GID === Session.GID) {
				ContextMenu.addElement( DB.getMessage(2055), onRequestLeaveParty);
			}
			else {
				ContextMenu.addElement( DB.getMessage(360), onRequestPrivateMessage);

				if (Session.isPartyLeader) {
					ContextMenu.addElement( DB.getMessage(97),   onRequestRemoveSelection);
					ContextMenu.addElement( DB.getMessage(1532), onRequestPartyDelegation);
				}
			}
		}
	}


	/**
	 * Request player information
	 * (Not implemented yet in official client)
	 */
	function onRequestInformation()
	{
		if (_preferences.lock) {
			return;
		}

		// Not implemented yet
		UIManager.showMessageBox( DB.getMessage(191), 'ok');
	}


	/**
	 * Request to leave a party
	 */
	function onRequestLeaveParty()
	{
		if (_preferences.lock) {
			return;
		}

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
		if (_preferences.lock) {
			return;
		}

		// Do you want to delegate the real party?
		UIManager.showPromptBox( DB.getMessage(1532), 'ok', 'cancel', function(){
			PartyFriends.onRequestChangeLeader( _party[_index].AID );
		});
	}


	/**
	 * Change selection (click on a friend/party)
	 */
	function onSelectionChange(event)
	{
		PartyFriends.ui.find('.content .name').removeClass('selection');
		this.classList.add('selection');

		_index = PartyFriends.ui.find(this.parentNode.parentNode).find('.name').index(this);

		var SkillTargetSelection = getModule('UI/Components/SkillTargetSelection/SkillTargetSelection');
		if (SkillTargetSelection.__active && !_preferences.friend) {
			var player = _party[_index];

			if (player.state === 0) {
				SkillTargetSelection.intersectEntityId(player.AID);
			}

			SkillTargetSelection.remove();
			event.stopImmediatePropagation();
			return false;
		}
	}


	/**
	 * Request to create a team (open the window)
	 */
	function onOpenPartyCreationWindow()
	{
		if (PartyHelper.__active && PartyHelper.getType() === PartyHelper.Type.CREATE) {
			PartyHelper.remove();
			return;
		}

		PartyHelper.append();
		PartyHelper.setType(PartyHelper.Type.CREATE);
	}


	/**
	 * Request to open invitation window
	 */
	function onOpenPartyInviteWindow()
	{
		if (PartyHelper.__active && PartyHelper.getType() === PartyHelper.Type.INVITE) {
			PartyHelper.remove();
			return;
		}

		PartyHelper.append();
		PartyHelper.setType(PartyHelper.Type.INVITE);
	}


	/**
	 * Request to open invitation window
	 */
	function onOpenPartyOptionWindow()
	{
		if (_preferences.friend) {
			return;
		}

		if (PartyHelper.__active && PartyHelper.getType() === PartyHelper.Type.SETUP) {
			PartyHelper.remove();
			return;
		}

		PartyHelper.append();
		PartyHelper.setType(PartyHelper.Type.SETUP);
		PartyHelper.setOptions(_options, Session.isPartyLeader);
	}


	/**
	 * Callbacks to define
	 */
	PartyFriends.onRemoveFriend         = function(){};
	PartyFriends.onRequestLeave         = function(){};
	PartyFriends.onExpelMember          = function(){};
	PartyFriends.onRequestChangeLeader  = function(){};
	PartyFriends.onRequestAddingMember  = function(){};
	PartyFriends.onRequestPartyCreation = function(){};
	PartyFriends.onRequestSettingUpdate = function(){};


	/**
	 * Export
	 */
	return UIManager.addComponent(PartyFriends);
});