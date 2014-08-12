/**
 * Engine/MapEngine/Friends.js
 *
 * Manage friends
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function( require )
{
	'use strict';


	/**
	 * Load dependencies
	 */
	var DB            = require('DB/DBManager');
	var Network       = require('Network/NetworkManager');
	var PACKET        = require('Network/PacketStructure');
	var UIManager     = require('UI/UIManager');
	var ChatBox       = require('UI/Components/ChatBox/ChatBox');
	var FriendUI      = require('UI/Components/PartyFriends/PartyFriends');


	/**
	 * Create namespace
	 */
	var FriendEngine = {};


	/**
	 * @var {Array} list of friends
	 */
	var _friends = [];


	/**
	 * Initialzing engine
	 * (Hook Packets)
	 */
	FriendEngine.init = function init()
	{
		// Hook Packets
		Network.hookPacket( PACKET.ZC.FRIENDS_LIST,     onFriendList);
		Network.hookPacket( PACKET.ZC.FRIENDS_STATE,    onFriendUpdate);
		Network.hookPacket( PACKET.ZC.REQ_ADD_FRIENDS,  onFriendRequest);
		Network.hookPacket( PACKET.ZC.ADD_FRIENDS_LIST, onFriendAdded);
		Network.hookPacket( PACKET.ZC.DELETE_FRIENDS,   onFriendRemoved);

		// Hook UI
		FriendUI.onRequestNewFriend = FriendEngine.addFriend;
		FriendUI.onRemoveFriend     = FriendEngine.removeFriend;
	};


	/**
	 * Clean up from memory
	 *
	 */
	FriendEngine.free = function free()
	{
		_friends.length = 0;
	};


	/**
	 * Add a friend to the list
	 *
	 * @param {string} name
	 */
	FriendEngine.addFriend = function addFriend( name )
	{
		var pkt  = new PACKET.CZ.ADD_FRIENDS();
		pkt.name = name;

		Network.sendPacket(pkt);
	};


	/**
	 * Remove a friend from the list
	 *
	 * @param {number} index
	 */
	FriendEngine.removeFriend = function removeFriend( index )
	{
		var pkt = new PACKET.CZ.DELETE_FRIENDS();
		pkt.AID = _friends[index].AID;
		pkt.GID = _friends[index].GID;

		Network.sendPacket(pkt);
	};


	/**
	 * Answer to a friend request
	 *
	 * @param {number} account id
	 * @param {number} character id
	 * @param {number} answer
	 */
	FriendEngine.answerFriendRequest = function answerFriendRequest( AID, GID, result )
	{
		var pkt    = new PACKET.CZ.ACK_REQ_ADD_FRIENDS();
		pkt.ReqAID = AID;
		pkt.ReqGID = GID;
		pkt.Result = result;

		Network.sendPacket(pkt);
	};


	/**
	 * Check if a player is already a friend
	 *
	 * @param {string} player name
	 * @return {boolean} is friend
	 */
	FriendEngine.isFriend = function isFriend(name)
	{
		var i, count = _friends.length;

		for (i = 0; i < count; ++i) {
			if (name === _friends[i].Name) {
				return true;
			}
		}

		return false;
	};


	/**
	 * Say hi to all your friends
	 */
	FriendEngine.sayHi = function sayHi()
	{
		var i, count = _friends.length;
		var pkt = new PACKET.CZ.WHISPER();

		pkt.msg = '(Hi) *^_^*';

		for (i = 0; i < count; ++i) {
			if (_friends[i].State === 0) {
				pkt.receiver = _friends[i].Name;
				Network.sendPacket(pkt);
			}
		}

		ChatBox.addText( '[ To Friends ] : ' + pkt.msg, ChatBox.TYPE.PRIVATE );
	};


	/**
	 * Get friend list from server
	 *
	 * @param {object} pkt - PACKET.ZC.FRIENDS_LIST
	 */
	function onFriendList( pkt )
	{
		_friends = pkt.friendList;

		FriendUI.setFriends(_friends);
	}


	/**
	 * Update friend information
	 *
	 * @param {object} pkt - PACKET.ZC.FRIENDS_STATE
	 */
	function onFriendUpdate( pkt )
	{
		var idx = getFriendIndex( pkt.AID, pkt.GID);

		if (idx > -1) {
			_friends[idx].State = pkt.State;

			FriendUI.updateFriendState(idx, pkt.State);
		}
	}


	/**
	 * Get a friend request from someone
	 *
	 * @param {object} pkt - PACKET.ZC.REQ_ADD_FRIENDS
	 */
	function onFriendRequest( pkt )
	{
		function answer(result) {
			return function() {
				FriendEngine.answerFriendRequest( pkt.ReqAID, pkt.ReqGID, result);
			};
		}
		
		UIManager.showPromptBox(
			// (%s) wishes to be friends with you. Would you like to accept?
			DB.getMessage(818).replace('%s', pkt.Name),
			'ok',     'cancel',
			answer(1), answer(0)
		);
	}


	/**
	 * Server added a friend to our list
	 *
	 * @param {object} pkt - PACKET.ZC.ADD_FRIENDS_LIST
	 */
	function onFriendAdded( pkt )
	{
		var idx;

		switch (pkt.Result) {
			case 0: // "You have become friends with (%s)."
				ChatBox.addText( DB.getMessage(821).replace('%s', pkt.Name), ChatBox.TYPE.BLUE);

				idx = getFriendIndex( pkt.AID, pkt.GID);

				// Not found, create slot (else just update)
				if (idx < 0) {
					idx = _friends.length;
					_friends[idx] = {};
				}

				_friends[idx].AID   = pkt.AID;
				_friends[idx].GID   = pkt.GID;
				_friends[idx].Name  = pkt.Name;
				_friends[idx].State = 0;

				FriendUI.updateFriend(idx, _friends[idx]);
				break;

			case 1: // "(%s) does not want to be friends with you."
				ChatBox.addText( DB.getMessage(822).replace('%s', pkt.Name), ChatBox.TYPE.ERROR);
				break;

			case 2: // "Your Friend List is full."
				ChatBox.addText( DB.getMessage(819), ChatBox.TYPE.ERROR);
				break;

			case 3: // "(%s)'s Friend List is full."
				ChatBox.addText( DB.getMessage(820).replace('%s', pkt.Name), ChatBox.TYPE.ERROR);
				break;
		}
	}


	/**
	 * Remove friend from list
	 *
	 * @param {object} pkt - PACKET.ZC.DELETE_FRIENDS
	 */
	function onFriendRemoved( pkt )
	{
		var idx = getFriendIndex( pkt.AID, pkt.GID);

		if (idx > -1) {
			_friends.splice( idx, 1);
			FriendUI.removeFriend(idx);
		}
	}


	/**
	 * Search a friend in our list, get back it's index in array
	 *
	 * @param {number} account id
	 * @param {number} character id
	 * @returns {number} index in array
	 */
	function getFriendIndex( AID, GID)
	{
		var i, count;

		for (i = 0, count = _friends.length; i < count; ++i) {
			if (_friends[i].AID === AID && _friends[i].GID === GID) {
				return i;
			}
		}

		return -1;
	}


	/**
	 * Export
	 */
	return FriendEngine;
});