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
	var Session       = require('Engine/SessionStorage');
	var Network       = require('Network/NetworkManager');
	var PACKET        = require('Network/PacketStructure');
	var EntityManager = require('Renderer/EntityManager');
	var MapRenderer   = require('Renderer/MapRenderer');
	var UIManager     = require('UI/UIManager');
	var ChatBox       = require('UI/Components/ChatBox/ChatBox');
	var MiniMap       = require('UI/Components/MiniMap/MiniMap');
	var PartyUI       = require('UI/Components/PartyFriends/PartyFriends');


	/**
	 * Party namespace
	 */
	var GroupEngine = {};


	/**
	 * @var {string} temporary variable to store party name
	 */
	var _partyName = '';


	/**
	 * Initialize engine
	 */
	GroupEngine.init = function init()
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
		Network.hookPacket( PACKET.ZC.GROUP_LIST,                onPartyList );
		Network.hookPacket( PACKET.ZC.ADD_MEMBER_TO_GROUP,       onPartyMemberJoin );
		Network.hookPacket( PACKET.ZC.ADD_MEMBER_TO_GROUP2,      onPartyMemberJoin );
		Network.hookPacket( PACKET.ZC.DELETE_MEMBER_FROM_GROUP,  onPartyMemberLeave );
		Network.hookPacket( PACKET.ZC.ACK_MAKE_GROUP,            onPartyCreate );

		PartyUI.onExpelMember          = GroupEngine.onRequestExpel;
		PartyUI.onRequestChangeLeader  = GroupEngine.onRequestChangeLeader;
		PartyUI.onRequestLeave         = GroupEngine.onRequestLeave;
		PartyUI.onRequestPartyCreation = GroupEngine.onRequestCreation;
		PartyUI.onRequestAddingMember  = GroupEngine.onRequestInvitation;
		PartyUI.onRequestSettingUpdate = GroupEngine.onRequestInfoUpdate;
	};


	/**
	 * Create a group (/organize)
	 *
	 * @param {string} party name
	 */
	GroupEngine.onRequestCreationEasy = function onRequestPartyCreationEasy( name )
	{
		if (Session.hasParty) {
			return;
		}

		_partyName = name;

		var pkt = new PACKET.CZ.MAKE_GROUP();
		pkt.groupName = name;
		Network.sendPacket(pkt);
	};



	/**
	 * Create a group (from interface)
	 *
	 * @param {string} party name
	 * @param {number} option 1
	 * @param {number} option 2
	 */
	GroupEngine.onRequestCreation = function onRequestPartyCreation( name, pickupRule, divisionRule )
	{
		if (Session.hasParty) {
			return;
		}

		var pkt = new PACKET.CZ.MAKE_GROUP2();
		pkt.groupName = name;
		this.ItemPickupRule = pickupRule;
		this.ItemDivisionRule = divisionRule;
		Network.sendPacket(pkt);
	};


	/**
	 * Request to invite someone in your party
	 *
	 * @param {number} account id
	 * @param {string} pseudo
	 */
	GroupEngine.onRequestInvitation = function onRequestPartyInvitation( AID, pseudo )
	{
		if (!Session.hasParty || !Session.isPartyLeader) {
			return;
		}

		ChatBox.addText( pseudo + ' ' + DB.getMessage(2059, ' has recieved an invitation to join your party.'), ChatBox.TYPE.BLUE);

		var pkt = new PACKET.CZ.REQ_JOIN_GROUP();
		pkt.AID = AID;
		pkt.CharName = pseudo;
		Network.sendPacket(pkt);
	};


	/**
	 * Ask to leave a party (/leave)
	 */
	GroupEngine.onRequestLeave = function onRequestPartyLeave()
	{
		if (!Session.hasParty) {
			return;
		}

		var pkt = new PACKET.CZ.REQ_LEAVE_GROUP();
		Network.sendPacket(pkt);
	};


	/**
	 * Request to expel someone in your party
	 *
	 * @param {number} account id
	 * @param {string} pseudo
	 */
	GroupEngine.onRequestExpel = function onRequestPartyExpel( AID, pseudo )
	{
		if (!Session.hasParty || !Session.isPartyLeader) {
			return;
		}

		var pkt = new PACKET.CZ.REQ_EXPEL_GROUP_MEMBER();
		pkt.AID = AID;
		pkt.characterName = pseudo;
		Network.sendPacket(pkt);
	};


	/**
	 * Request to change party option
	 *
	 * @param {number} exp option
	 * @param {number} pickup item option
	 * @param {number} dision item option
	 */
	GroupEngine.onRequestInfoUpdate = function onRequestPartyInfoUpdate( expOption, pickupRule, divisionRule)
	{
		if (!Session.hasParty || !Session.isPartyLeader) {
			return;
		}

		var pkt = new PACKET.CZ.GROUPINFO_CHANGE_V2();
		pkt.expOption = expOption;
		pkt.ItemPickupRule = pickupRule;
		pkt.ItemDivisionRule = divisionRule;
		Network.sendPacket(pkt);
	};


	/**
	 * Request to change party leader
	 *
	 * @param {number} AID
	 */
	GroupEngine.onRequestChangeLeader = function onRequestChangePartyLeader( AID )
	{
		if (!Session.hasParty || !Session.isPartyLeader) {
			return;
		}

		var pkt = new PACKET.CZ.CHANGE_GROUP_MASTER();
		pkt.AID = AID;
		Network.sendPacket(pkt);
	};


	/**
	 * Get answer from party creation
	 *
	 * @param {object} pkt - PACKET.ZC.ACK_MAKE_GROUP
	 */
	function onPartyCreate( pkt )
	{
		switch (pkt.result) {
			case 0: // Ok, process
				ChatBox.addText( DB.getMessage(77), ChatBox.TYPE.BLUE);
				Session.hasParty = true;

				PartyUI.setParty( _partyName, [{
					AID:           Session.AID,
					characterName: Session.Entity.display.name,
					role:          0, // leader
					state:         0, // online
					mapName:       MapRenderer.currentMap
				}]);
				break;

			case 1: // party name already exists
				ChatBox.addText( DB.getMessage(78), ChatBox.TYPE.ERROR);
				break;

			case 1: // already in a party
				ChatBox.addText( DB.getMessage(79), ChatBox.TYPE.ERROR);
				break;

			case 3: // cannot organize parties on this map
				ChatBox.addText( DB.getMessage(1387), ChatBox.TYPE.ERROR);
				break;
		}
	}


	/**
	 * Get list of party members
	 *
	 * @param {object} pkt - PACKET.ZC.GROUP_LIST
	 */
	function onPartyList( pkt )
	{
		var i, count;
		var entity;

		Session.hasParty = true;
		count            = pkt.groupInfo.length;

		for (i = 0; i < count; ++i) {
			entity = EntityManager.get(pkt.groupInfo[i].AID);
			if (entity && entity.life.display) {
				pkt.groupInfo[i].life = entity.life;
			}
		}

		PartyUI.setParty( pkt.groupName, pkt.groupInfo);
	}


	/**
	 * Update a member in party
	 *
	 * @param {object} pkt - PACKET.ZC.ADD_MEMBER_TO_GROUP
	 */
	function onPartyMemberJoin( pkt )
	{
		var entity = EntityManager.get(pkt.AID);

		if (entity && entity.life.display) {
			pkt.life = entity.life;
		}

		PartyUI.addPartyMember(pkt);
	}


	/**
	 * Remove a player from the group
	 *
	 * @param {oject} pkt - PACKET.ZC.DELETE_MEMBER_FROM_GROUP
	 */
	function onPartyMemberLeave( pkt )
	{
		switch (pkt.result) {
			case 0: // leave
			case 1: // expel
				break;

			case 2:
				// Cannot leave a party in this map
				ChatBox.addText( DB.getMessage(1872), ChatBox.TYPE.ERROR);
				return;

			case 3:
				// Cannot withdraw/break the party in this map
				ChatBox.addText( DB.getMessage(1873), ChatBox.TYPE.ERROR);
				return;
		}

		if (Session.AID === pkt.AID) {
			Session.hasParty = false;
		}

		PartyUI.removePartyMember(pkt.AID, pkt.characterName);
	}


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

			if (pkt.AID !== Session.AID) {
				PartyUI.updateMemberLife(pkt.AID, entity.life.canvas, pkt.hp, pkt.maxhp);
			}
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
		PartyUI.setOptions(pkt.expOption, pkt.ItemPickupRule, pkt.ItemDivisionRule);

		ChatBox.addText( DB.getMessage(291) + '  - ' + DB.getMessage(292) + '  : ' + DB.getMessage(287 + pkt.expOption ), ChatBox.TYPE.INFO );
		ChatBox.addText( DB.getMessage(291) + '  - ' + DB.getMessage(293) + '  : ' + DB.getMessage(289 + pkt.ItemPickupRule), ChatBox.TYPE.INFO );
		ChatBox.addText( DB.getMessage(291) + '  - ' + DB.getMessage(738) + '  : ' + DB.getMessage(287 + pkt.ItemDivisionRule), ChatBox.TYPE.INFO );
	}


	/**
	 * Get party configs
	 *
	 * @param {object} pkt - PACKET.ZC.PARTY_CONFIG
	 */
	function onPartyConfig( pkt )
	{
		ChatBox.addText( DB.getMessage(pkt.bRefuseJoinMsg ? 1325 : 1326), ChatBox.TYPE.INFO );
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

		UIManager.showPromptBox( pkt.groupName + ' ' + DB.getMessage(94), 'ok', 'cancel', onAnswer(1), onAnswer(0) );
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

		ChatBox.addText( DB.getMessage(id).replace('%s', pkt.characterName), color);
	}


	/**
	 * Exports
	 */
	return GroupEngine;
});