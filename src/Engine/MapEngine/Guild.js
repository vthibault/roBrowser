/**
 * Engine/MapEngine/Group.js
 *
 * Manage group/party
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
	var Network       = require('Network/NetworkManager');
	var PACKET        = require('Network/PacketStructure');
	var ChatBox       = require('UI/Components/ChatBox/ChatBox');
	var MiniMap       = require('UI/Components/MiniMap/MiniMap');


	/**
	 * Display entity life
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_HP_TO_GROUPM
	 */
	function onMemberTalk( pkt )
	{
		ChatBox.addText( pkt.msg, ChatBox.TYPE.GUILD );
	}


	/**
	 * Display guild member position
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_POSITION_TO_GUILDM
	 */
	function onMemberMove( pkt )
	{
		// Server remove mark with "-1" as position
		if (pkt.xPos < 0 || pkt.yPos < 0) {
			MiniMap.removeGuildMemberMark( pkt.AID );
		}
		else {
			MiniMap.addGuildMemberMark( pkt.AID, pkt.xPos, pkt.yPos );
		}
	}


	/**
	 * Initialize
	 */
	return function EntityEngine()
	{
		Network.hookPacket( PACKET.ZC.GUILD_CHAT,                onMemberTalk );
		Network.hookPacket( PACKET.ZC.NOTIFY_POSITION_TO_GUILDM, onMemberMove );
	};
});