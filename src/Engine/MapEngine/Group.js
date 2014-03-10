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
	var DB            = require('DB/DBManager');
	var Network       = require('Network/NetworkManager');
	var PACKET        = require('Network/PacketStructure');
	var EntityManager = require('Renderer/EntityManager');
	var UIManager     = require('UI/UIManager');
	var ChatBox       = require('UI/Components/ChatBox/ChatBox');
	var MiniMap       = require('UI/Components/MiniMap/MiniMap');


	/**
	 * Display entity life
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_HP_TO_GROUPM
	 */
	function onMemberLifeUpdate( pkt )
	{
		var entity = EntityManager.get(pkt.AID);

		if (entity) {
			entity.life.hp = pkt.hp;
			entity.life.hp_max = pkt.maxhp;
			entity.life.update();
		}
	}


	/**
	 * Display player message
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_CHAT_PARTY
	 */
	function onMemberTalk( pkt )
	{
		var entity = EntityManager.get(pkt.AID);

		if (entity) {
			entity.dialog.set( pkt.msg );
		}

		ChatBox.addText( pkt.msg, ChatBox.TYPE.PARTY );
	}


	/**
	 * Move minimap viewpoint
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_POSITION_TO_GROUPM
	 */
	function onMemberMove( pkt )
	{
		// Server remove mark with "-1" as position
		if (pkt.xPos < 0 || pkt.yPos < 0) {
			MiniMap.removePartyMemberMark( pkt.AID );
		}
		else {
			MiniMap.addPartyMemberMark( pkt.AID, pkt.xPos, pkt.yPos );
		}
	}


	/**
	 * Get party information
	 *
	 * @param {object} pkt - PACKET.ZC.GROUPINFO_CHANGE
	 */
	function onPartyOption( pkt )
	{
		ChatBox.addText( DB.msgstringtable[291] + '  - ' + DB.msgstringtable[292] + '  : ' + DB.msgstringtable[287 + pkt.expOption ], ChatBox.TYPE.INFO );
		ChatBox.addText( DB.msgstringtable[291] + '  - ' + DB.msgstringtable[293] + '  : ' + DB.msgstringtable[289 + pkt.ItemPickupRule], ChatBox.TYPE.INFO );
		ChatBox.addText( DB.msgstringtable[291] + '  - ' + DB.msgstringtable[738] + '  : ' + DB.msgstringtable[287 + pkt.ItemDivisionRule], ChatBox.TYPE.INFO );
	}


	/**
	 * Get party configs
	 *
	 * @param {object} pkt - PACKET.ZC.PARTY_CONFIG
	 */
	function onPartyConfig( pkt )
	{
		ChatBox.addText( DB.msgstringtable[pkt.bRefuseJoinMsg ? 1325 : 1326], ChatBox.TYPE.INFO );
	}


	/**
	 * Get a request from someone to join a team
	 *
	 * @param {object} pkt - PACKET.ZC.PARTY_JOIN_REQ
	 */
	function onPartyInvitationRequest( pkt )
	{
		var GRID = pkt.GRID;

		function onAnswer(accept){
			return function(){
				var pkt     = new PACKET.CZ.PARTY_JOIN_REQ_ACK();
				pkt.GRID    = GRID;
				pkt.bAccept = accept;
				Network.sendPacket(pkt);
			};
		}

		UIManager.showPromptBox( pkt.groupName + DB.msgstringtable[94], 'ok', 'cancel', onAnswer(1), onAnswer(0) );
	}


	/**
	 * Answer from a player to join your group
	 *
	 * @param {object} pkt - PACKET.ZC.PARTY_JOIN_REQ_ACK
	 */
	function onPartyInvitationAnswer( pkt )
	{
		var id = 1, color = ChatBox.TYPE.ERROR;

		switch (pkt.answer) {
			case 0: id = 80;  break;
			case 1: id = 81;  break;

			case 2:
				id = 82;
				color = ChatBox.TYPE.BLUE;
				break;

			case 3: id = 83;   break;
			case 4: id = 608;  break;
			case 5: id = 1324; break;
			// no 6 ?
			case 7: id = 71;   break;
			case 8: id = 1388; break;
			case 9: id = 1871; break;
		}

		ChatBox.addText( DB.msgstringtable[id].replace('%s', pkt.characterName), ChatBox.TYPE.INFO);
	}


	/**
	 * Initialize
	 */
	return function EntityEngine()
	{
		Network.hookPacket( PACKET.ZC.NOTIFY_HP_TO_GROUPM,       onMemberLifeUpdate );
		Network.hookPacket( PACKET.ZC.NOTIFY_HP_TO_GROUPM_R2,    onMemberLifeUpdate );
		Network.hookPacket( PACKET.ZC.NOTIFY_CHAT_PARTY,         onMemberTalk );
		Network.hookPacket( PACKET.ZC.GROUPINFO_CHANGE,          onPartyOption );
		Network.hookPacket( PACKET.ZC.REQ_GROUPINFO_CHANGE_V2,   onPartyOption );
		Network.hookPacket( PACKET.ZC.PARTY_CONFIG,              onPartyConfig );
		Network.hookPacket( PACKET.ZC.NOTIFY_POSITION_TO_GROUPM, onMemberMove );
		Network.hookPacket( PACKET.ZC.PARTY_JOIN_REQ,            onPartyInvitationRequest );
		Network.hookPacket( PACKET.ZC.PARTY_JOIN_REQ_ACK,        onPartyInvitationAnswer );
		Network.hookPacket( PACKET.ZC.ACK_REQ_JOIN_GROUP,        onPartyInvitationAnswer );
	};
});