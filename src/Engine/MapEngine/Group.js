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
	var MsgStringIDs = require('DB/MsgStringIds');
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
		ChatBox.addText( DB.getMessage(MsgStringIDs.MSI_PARTYSETTING) + '  - ' + DB.getMessage(MsgStringIDs.MSI_HOWEXPDIV) + '  : ' + DB.getMessage(MsgStringIDs.MSI_EXPDIV1 + pkt.expOption ), ChatBox.TYPE.INFO );
		ChatBox.addText( DB.getMessage(MsgStringIDs.MSI_PARTYSETTING) + '  - ' + DB.getMessage(MsgStringIDs.MSI_HOWITEMCOLLECT) + '  : ' + DB.getMessage(MsgStringIDs.MSI_ITEMCOLLECT1 + pkt.ItemPickupRule), ChatBox.TYPE.INFO );
		ChatBox.addText( DB.getMessage(MsgStringIDs.MSI_PARTYSETTING) + '  - ' + DB.getMessage(MsgStringIDs.MSI_HOWITEMDIV) + '  : ' + DB.getMessage(MsgStringIDs.MSI_EXPDIV1 + pkt.ItemDivisionRule), ChatBox.TYPE.INFO );
	}


	/**
	 * Get party configs
	 *
	 * @param {object} pkt - PACKET.ZC.PARTY_CONFIG
	 */
	function onPartyConfig( pkt )
	{
	    ChatBox.addText(DB.getMessage(pkt.bRefuseJoinMsg ? MsgStringIDs.MSI_INVITE_PARTY_REFUSE : MsgStringIDs.MSI_INVITE_PARTY_ACCEPT), ChatBox.TYPE.INFO);
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

		UIManager.showPromptBox( pkt.groupName + DB.getMessage(MsgStringIDs.MSI_SUGGEST_JOIN_PARTY), 'ok', 'cancel', onAnswer(1), onAnswer(0) );
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
			case 0: id = MsgStringIDs.MSI_CHARACTER_IS_ALREADY_IN_PARTY;  break;
			case 1: id = MsgStringIDs.MSI_CHARACTER_REJECT_JOIN;  break;

			case 2:
			    id = MsgStringIDs.MSI_CHARACTER_ACCEPT_JOIN;
				color = ChatBox.TYPE.BLUE;
				break;

			case 3: id = MsgStringIDs.MSI_TOO_MANY_PEOPLE_IN_PARTY;   break;
			case 4: id = MsgStringIDs.MSI_ALREADY_SAME_AID_JOINED;  break;
			case 5: id = MsgStringIDs.MSI_JOINMSG_REFUSE; break;
			// no 6 ?
			case 7: id = MsgStringIDs.MSI_CHARACTER_IS_NOT_EXIST;   break;
			case 8: id = MsgStringIDs.MSI_NOPARTY2; break;
			case 9: id = MsgStringIDs.MSI_PREVENT_PARTY_JOIN; break;
		}

		ChatBox.addText( DB.getMessage(id).replace('%s', pkt.characterName), ChatBox.TYPE.INFO);
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