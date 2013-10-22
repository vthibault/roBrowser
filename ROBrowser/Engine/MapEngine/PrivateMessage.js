/**
 * Engine/MapEngine/Main.js
 *
 * Manage Entity based on received packets from server 
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function( require )
{
	"use strict";


	/**
	 * Load dependencies
	 */
	var DB            = require('DB/DBManager');
	var Network       = require('Network/NetworkManager');
	var PACKET        = require('Network/PacketStructure');
	var ChatBox       = require('UI/Components/ChatBox/ChatBox');


	/**
	 * Main Player received PM
	 *
	 * @param {object} pkt - PACKET.ZC.WHISPER
	 */
	function OnPrivateMessage( pkt )
	{
		ChatBox.addText("(From "+ pkt.sender +") : " + pkt.msg, ChatBox.TYPE.PRIVATE );
	}


	/**
	 * Received data from a sent private message
	 *
	 * @param {object} pkt - PACKET.ZC.ACK_WHISPER
	 */
	function OnPrivateMessageSent( pkt )
	{
		var user = ChatBox.PrivateMessageStorage[0].nick;
		var msg  = ChatBox.PrivateMessageStorage[0].msg;
		
		if ( pkt.result === 0 ) {
			ChatBox.addText( "(To "+ user +") : " + msg, ChatBox.TYPE.PRIVATE );
		}
		else {
			ChatBox.addText( "("+ user +") : " + DB.msgstringtable[147 + this.result],  ChatBox.TYPE.PRIVATE );
		}
	
		ChatBox.PrivateMessageStorage.splice(0,1);
	}


	/**
	 * Initialize
	 */
	return function PrivateMessageEngine()
	{
		Network.hookPacket( PACKET.ZC.WHISPER, OnPrivateMessage );
		Network.hookPacket( PACKET.ZC.ACK_WHISPER, OnPrivateMessageSent );
	};
});