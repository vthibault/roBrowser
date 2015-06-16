/**
 * engine/Mapengine/PrivateMessage.js
 *
 * Manage Entity based on received packets from server 
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
	var DB            = require('db/DBManager');
	var Friends       = require('engine/Mapengine/Friends');
	var Network       = require('network/networkManager');
	var PACKET        = require('network/packets/structureTable');
	var ChatBox       = require('UI/Components/ChatBox/ChatBox');


	/**
	 * Main Player received PM
	 *
	 * @param {object} pkt - PACKET.ZC.WHISPER
	 */
	function onPrivateMessage( pkt )
	{
		var prefix = Friends.isFriend(pkt.sender) ? DB.getMessage(102) : 'From';
		ChatBox.addText('[ '+ prefix +' '+ pkt.sender +' ] : ' + pkt.msg.replace(/\|\d{2}/, ''), ChatBox.Type.PRIVATE );
		ChatBox.saveNickName(pkt.sender);
	}


	/**
	 * Received data from a sent private message
	 *
	 * @param {object} pkt - PACKET.ZC.ACK_WHISPER
	 */
	function onPrivateMessageSent( pkt )
	{
		// Official buggy feature
		var user = ChatBox.PrivateMessageStorage.nick;
		var msg  = ChatBox.PrivateMessageStorage.msg;
		
		if (pkt.result === 0) {
			if (user && msg) {
				ChatBox.addText( '[ To '+ user +' ] : ' + msg, ChatBox.Type.PRIVATE );
			}
		}
		else {
			ChatBox.addText( '('+ user +') : ' + DB.getMessage(147 + pkt.result),  ChatBox.Type.PRIVATE );
		}
	
		ChatBox.PrivateMessageStorage.nick = '';
		ChatBox.PrivateMessageStorage.msg  = '';
	}


	/**
	 * Initialize
	 */
	return function privateMessageEngine()
	{
		Network.hookPacket( PACKET.ZC.WHISPER,      onPrivateMessage );
		Network.hookPacket( PACKET.ZC.ACK_WHISPER,  onPrivateMessageSent );
		Network.hookPacket( PACKET.ZC.ACK_WHISPER2, onPrivateMessageSent );
	};
});