/**
 * Engine/MapEngine/PrivateMessage.js
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
	var DB            = require('DB/DBManager');
	var Friends       = require('Engine/MapEngine/Friends');
	var Network       = require('Network/NetworkManager');
	var PACKET        = require('Network/PacketStructure');
	var ChatBox       = require('UI/Components/ChatBox/ChatBox');


	/**
	 * Main Player received PM
	 *
	 * @param {object} pkt - PACKET.ZC.WHISPER
	 */
	function onPrivateMessage( pkt )
	{
		var prefix = Friends.isFriend(pkt.sender) ? DB.getMessage(102) : 'From';
		ChatBox.addText('[ '+ prefix +' '+ pkt.sender +' ] : ' + pkt.msg.replace(/\|\d{2}/, ''), ChatBox.TYPE.PRIVATE );
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
				ChatBox.addText( '[ To '+ user +' ] : ' + msg, ChatBox.TYPE.PRIVATE );
			}
		}
		else {
			ChatBox.addText( '('+ user +') : ' + DB.getMessage(147 + pkt.result),  ChatBox.TYPE.PRIVATE );
		}
	
		ChatBox.PrivateMessageStorage.nick = '';
		ChatBox.PrivateMessageStorage.msg  = '';
	}


	/**
	 * Initialize
	 */
	return function PrivateMessageEngine()
	{
		Network.hookPacket( PACKET.ZC.WHISPER,      onPrivateMessage );
		Network.hookPacket( PACKET.ZC.ACK_WHISPER,  onPrivateMessageSent );
		Network.hookPacket( PACKET.ZC.ACK_WHISPER2, onPrivateMessageSent );
	};
});