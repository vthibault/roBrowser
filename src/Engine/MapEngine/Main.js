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
	'use strict';


	/**
	 * Load dependencies
	 */
	var DB            = require('DB/DBManager');
	var Session       = require('Engine/SessionStorage');
	var Network       = require('Network/NetworkManager');
	var PACKET        = require('Network/PacketStructure');
	var EntityManager = require('Renderer/EntityManager');
	var ChatBox       = require('UI/Components/ChatBox/ChatBox');
	var ChatRoom      = require('UI/Components/ChatRoom/ChatRoom');
	var BasicInfo     = require('UI/Components/BasicInfo/BasicInfo');
	var WinStats      = require('UI/Components/WinStats/WinStats');
	var Escape        = require('UI/Components/Escape/Escape');
	var Announce      = require('UI/Components/Announce/Announce');
	var Equipment     = require('UI/Components/Equipment/Equipment');
	var SkillList     = require('UI/Components/SkillList/SkillList');


	/**
	 * Move main player to the position specify
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_PLAYERMOVE
	 */
	function onPlayerMove( pkt )
	{
		Session.Entity.walkTo(
			pkt.MoveData[0],
			pkt.MoveData[1],
			pkt.MoveData[2],
			pkt.MoveData[3]
		);
	}


	/**
	 * Our player just talk
	 *
	 * @param {object} pkt - PACKET_ZC_NOTIFY_PLAYERCHAT
	 */
	function onPlayerMessage( pkt )
	{
		if (ChatRoom.isOpen) {
			ChatRoom.message(pkt.msg);
			return;
		}

		ChatBox.addText( pkt.msg, ChatBox.TYPE.PUBLIC | ChatBox.TYPE.SELF );
		if (Session.Entity) {
			Session.Entity.dialog.set( pkt.msg );
		}
	}


	/**
	 * Target too far to attack it
	 *
	 * @param {object} pkt - PACKET.ZC.ATTACK_FAILURE_FOR_DISTANCE
	 */
	function onPlayerTooFarToAttack( pkt )
	{
		var entity = EntityManager.get(pkt.targetAID);
		if (entity) {
			entity.onFocus();
		}
	}


	/**
	 * Get player attack range
	 *
	 * @param {object} pkt - PACKET.ZC.ATTACK_RANGE
	 */
	function onAttackRangeUpdate( pkt )
	{
		Session.Entity.attack_range = pkt.currentAttRange;
	}


	/**
	 * Update status parameters
	 *
	 * @param {object} pkt - PACKET.ZC.STATUS
	 */
	function onStatusParameterChange( pkt )
	{
		WinStats.update('str',         pkt.str);
		WinStats.update('agi',         pkt.agi);
		WinStats.update('vit',         pkt.vit);
		WinStats.update('int',         pkt.Int);
		WinStats.update('dex',         pkt.dex);
		WinStats.update('luk',         pkt.luk);
		WinStats.update('str3',        pkt.standardStr);
		WinStats.update('agi3',        pkt.standardAgi);
		WinStats.update('vit3',        pkt.standardVit);
		WinStats.update('int3',        pkt.standardInt);
		WinStats.update('dex3',        pkt.standardDex);
		WinStats.update('luk3',        pkt.standardLuk);
		WinStats.update('aspd',        ( pkt.ASPD + pkt.plusASPD ) / 4);
		WinStats.update('atak',        pkt.attPower);
		WinStats.update('atak2',       pkt.refiningPower);
		WinStats.update('matak',       pkt.min_mattPower);
		WinStats.update('matak2',      pkt.max_mattPower);
		WinStats.update('flee',        pkt.avoidSuccessValue );
		WinStats.update('flee2',       pkt.plusAvoidSuccessValue );
		WinStats.update('critical',    pkt.criticalSuccessValue );
		WinStats.update('hit',         pkt.hitSuccessValue );
		WinStats.update('def',         pkt.itemdefPower );
		WinStats.update('def2',        pkt.plusdefPower );
		WinStats.update('mdef',        pkt.mdefPower );
		WinStats.update('mdef2',       pkt.plusmdefPower );
		WinStats.update('statuspoint', pkt.point );
	}


	/**
	 * Answer from server for updating parameter
	 *
	 * @param {object} pkt - PACKET.ZC.STATUS_CHANGE_ACK
	 */
	function onStatusParameterUpdateAnswer( pkt )
	{
		// Fail
		if (!pkt.result) {
			return;
		}

		switch (pkt.statusID) {
			case 13: WinStats.update('str', pkt.value); break;
			case 14: WinStats.update('agi', pkt.value); break;
			case 15: WinStats.update('vit', pkt.value); break;
			case 16: WinStats.update('int', pkt.value); break;
			case 17: WinStats.update('dex', pkt.value); break;
			case 18: WinStats.update('luk', pkt.value); break;
		}
	}


	/**
	 * Modify main players parameters
	 * Generic function
	 */
	function onParameterChange( pkt )
	{
		var amount = 0, type;

		if (pkt.hasOwnProperty('varID')) {
			type = pkt.varID;
		}
		else if (pkt.hasOwnProperty('statusType')) {
			type = pkt.statusType;
		}
		else if (pkt.hasOwnProperty('statusID')) {
			type = pkt.statusID;
		}
		else {
			type = -1; // goto "default".
		}

		if (pkt.hasOwnProperty('amount')) {
			amount = pkt.amount;
		}
		else if (pkt.hasOwnProperty('count')) {
			amount = pkt.count;
		}
		else if (pkt.hasOwnProperty('value')) {
			amount = pkt.value;
		}

		switch (type) {

			// Walk Speed
			case  0:
				Session.Entity.walk.speed = amount;
				break;

			// Base exp
			case  1:
				BasicInfo.base_exp  = amount;
				if (BasicInfo.base_exp_next) {
					BasicInfo.update('bexp', BasicInfo.base_exp, BasicInfo.base_exp_next );
				}
				break;

			// Job exp
			case  2:
				BasicInfo.job_exp  = amount;
				if (BasicInfo.job_exp_next) {
					BasicInfo.update('jexp', BasicInfo.job_exp, BasicInfo.job_exp_next );
				}
				break;

			// Karma, manner (not used ?)
			case  3:
			case  4:
				break;

			// HP
			case  5:
				Session.Entity.life.hp = amount;
				Session.Entity.life.update();

				// Urg we are dead !
				if (amount < 1) {
					Escape.ui.show();
					Escape.ui.find('.savepoint').show();
					Escape.ui.find('.graphics, .sound, .hotkey').hide();
				}

				if (Session.Entity.life.hp_max > -1) {
					BasicInfo.update('hp', Session.Entity.life.hp, Session.Entity.life.hp_max);
				}
				break;

			// HP max
			case  6:
				Session.Entity.life.hp_max = amount;
				Session.Entity.life.update();

				if (Session.Entity.life.hp > -1) {
					BasicInfo.update('hp',  Session.Entity.life.hp, Session.Entity.life.hp_max);
				}
				break;

			// SP
			case  7:
				Session.Entity.life.sp = amount;
				Session.Entity.life.update();

				if (Session.Entity.life.sp_max > -1) {
					BasicInfo.update('sp', Session.Entity.life.sp, Session.Entity.life.sp_max);
				}
				break;

			// SP max
			case  8:
				Session.Entity.life.sp_max = amount;
				Session.Entity.life.update();

				if (Session.Entity.life.sp > -1) {
					BasicInfo.update('sp',  Session.Entity.life.sp, Session.Entity.life.sp_max);
				}
				break;

			// Status points
			case  9:
				WinStats.update('statuspoint', amount);
				break;

			// Base level
			case 11:
				BasicInfo.update('blvl', amount);
				break;

			// Skill points
			case 12:
				SkillList.setPoints(amount);
				break;

			// Str
			case 13:
				WinStats.update('str',  pkt.defaultStatus);
				WinStats.update('str2', pkt.plusStatus);
				break;

			// Agi
			case 14:
				WinStats.update('agi',  pkt.defaultStatus);
				WinStats.update('agi2', pkt.plusStatus);
				break;

			// Vit
			case 15:
				WinStats.update('vit',  pkt.defaultStatus);
				WinStats.update('vit2', pkt.plusStatus);
				break;

			// Int
			case 16:
				WinStats.update('int',  pkt.defaultStatus);
				WinStats.update('int2', pkt.plusStatus);
				break;

			// Dex
			case 17:
				WinStats.update('dex',  pkt.defaultStatus);
				WinStats.update('dex2', pkt.plusStatus);
				break;

			// Luk
			case 18:
				WinStats.update('luk',  pkt.defaultStatus);
				WinStats.update('luk2', pkt.plusStatus);
				break;

			// Zeny
			case 20:
				BasicInfo.update('zeny', amount);
				break;

			// Base exp next
			case 22:
				BasicInfo.base_exp_next  = amount;
				if (BasicInfo.base_exp > -1) {
					BasicInfo.update('bexp', BasicInfo.base_exp, BasicInfo.base_exp_next );
				}
				break;

			// Job exp next
			case 23:
				BasicInfo.job_exp_next  = amount;
				if (BasicInfo.job_exp > -1) {
					BasicInfo.update('jexp', BasicInfo.job_exp, BasicInfo.job_exp_next );
				}
				break;

			//Weight
			case 24:
				BasicInfo.weight = amount;
				if (BasicInfo.weight_max > -1) {
					BasicInfo.update('weight', BasicInfo.weight, BasicInfo.weight_max );
				}
				break;

			// Weight Max
			case 25:
				BasicInfo.weight_max = amount;
				if (BasicInfo.weight > -1) {
					BasicInfo.update('weight', BasicInfo.weight, BasicInfo.weight_max );
				}
				break;

			// Required Stats point to update a stat
			case 32: WinStats.update('str3', amount); break; // str
			case 33: WinStats.update('agi3', amount); break; // agi
			case 34: WinStats.update('vit3', amount); break; // vit
			case 35: WinStats.update('int3', amount); break; // int
			case 36: WinStats.update('dex3', amount); break; // dex
			case 37: WinStats.update('luk3', amount); break; // luk

			// Stats window
			case 41: WinStats.update('atak',     amount); break; // atk1
			case 42: WinStats.update('atak2',    amount); break; // atk2
			case 43: WinStats.update('matak',    amount); break; // matk1
			case 44: WinStats.update('matak2',   amount); break; // matk2
			case 45: WinStats.update('def',      amount); break; // def1
			case 46: WinStats.update('def2',     amount); break; // def2
			case 47: WinStats.update('mdef',     amount); break; // mdef1
			case 48: WinStats.update('mdef2',    amount); break; // mdef2
			case 49: WinStats.update('hit',      amount); break; // hit
			case 50: WinStats.update('flee',     amount); break; // flee
			case 51: WinStats.update('flee2',    amount); break; // dodge
			case 52: WinStats.update('critical', amount); break; // crit
			case 53: WinStats.update('aspd',     amount); break; // aspd

			// Job level
			case 55:
				BasicInfo.update('jlvl', amount);
				break;

			default:
				console.log( 'Main::onParameterChange() - Unsupported type', pkt);
		}
	}


	/**
	 * Received announce from server
	 *
	 * @param {object} pkt - PACKET.ZC.BROADCAST
	 */
	function onGlobalAnnounce( pkt )
	{
		var color;

		if (pkt.fontColor) {
			color = 'rgb(' + ([
				( pkt.fontColor & 0x00ff0000 ) >> 16,
				( pkt.fontColor & 0x0000ff00 ) >> 8,
				( pkt.fontColor & 0x000000ff )
			]).join(',') + ')';
		}
		else if (pkt.msg.match(/^blue/)) {
			color = '#00FFFF';
			pkt.msg = pkt.msg.substr(4);
		}
		else if (pkt.msg.match(/^ssss/)) {
			color = '#FFFF00';
			pkt.msg = pkt.msg.substr(4);
		}
		else {
			color = '#FFFF00';
		}
		
		ChatBox.addText( pkt.msg, ChatBox.TYPE.ANNOUNCE, color );
		Announce.append();
		Announce.set( pkt.msg, color );
	}


	/**
	 * Receive player count in server
	 * @param {object} pkt - PACKET.ZC.USER_COUNT
	 */
	function onPlayerCountAnswer( pkt )
	{
		ChatBox.addText( DB.getMessage(178).replace('%d', pkt.count), ChatBox.TYPE.INFO );
	}


	/**
	 * Receive user config from server
	 *
	 * @param {object} pkt - PACKET.ZC.CONFIG
	 */
	function onConfigUpdate( pkt )
	{
		switch (pkt.Config) {

			// equipment
			case 0:
				Equipment.setEquipConfig( pkt.Value );
				ChatBox.addText(
					DB.getMessage(1358 + (pkt.Value ? 1 : 0) ),
					ChatBox.TYPE.INFO
				);
				break;

			// TODO: other config type to support (PACKET.ZC.CONFIG)
		}
	}


	/**
	 * Despite the name, it give information about item equipped
	 *
	 * @param {object} pkt - PACKET_ZC_ACTION_FAILURE
	 */
	function onActionFailure( pkt )
	{
		switch (pkt.errorCode) {
			case 0: // Please equip the proper amnution first
				ChatBox.addText( DB.getMessage(242), ChatBox.TYPE.ERROR );
				break;

			case 1:  // You can't Attack or use Skills because your Weight Limit has been exceeded.
				ChatBox.addText( DB.getMessage(243), ChatBox.TYPE.ERROR );
				break;

			case 2: // You can't use Skills because Weight Limit has been exceeded.
				ChatBox.addText( DB.getMessage(244), ChatBox.TYPE.ERROR );
				break;

			case 3: // Ammunition has been equipped.
				// TODO: check the class - assassin: 1040 | gunslinger: 1175 | default: 245
				ChatBox.addText( DB.getMessage(245), ChatBox.TYPE.BLUE );
				break;
		}
	}


	/**
	 * Server message using msgstringtable
	 *
	 * @param {object} pkt - PACKET_ZC_MSG
	 */
	function onMessage( pkt )
	{
		ChatBox.addText( DB.getMessage(pkt.msg), ChatBox.TYPE.PUBLIC );
	}


	/**
	 * Initialize
	 */
	return function MainEngine()
	{
		Network.hookPacket( PACKET.ZC.NOTIFY_PLAYERMOVE,           onPlayerMove );
		Network.hookPacket( PACKET.ZC.PAR_CHANGE,                  onParameterChange );
		Network.hookPacket( PACKET.ZC.LONGPAR_CHANGE,              onParameterChange );
		Network.hookPacket( PACKET.ZC.STATUS_CHANGE,               onParameterChange );
		Network.hookPacket( PACKET.ZC.NOTIFY_CARTITEM_COUNTINFO,   onParameterChange );
		Network.hookPacket( PACKET.ZC.COUPLESTATUS,                onParameterChange );
		Network.hookPacket( PACKET.ZC.STATUS,                      onStatusParameterChange );
		Network.hookPacket( PACKET.ZC.STATUS_CHANGE_ACK,           onStatusParameterUpdateAnswer );
		Network.hookPacket( PACKET.ZC.ATTACK_RANGE,                onAttackRangeUpdate );
		Network.hookPacket( PACKET.ZC.BROADCAST,                   onGlobalAnnounce );
		Network.hookPacket( PACKET.ZC.BROADCAST2,                  onGlobalAnnounce );
		Network.hookPacket( PACKET.ZC.USER_COUNT,                  onPlayerCountAnswer );
		Network.hookPacket( PACKET.ZC.NOTIFY_PLAYERCHAT,           onPlayerMessage );
		Network.hookPacket( PACKET.ZC.ATTACK_FAILURE_FOR_DISTANCE, onPlayerTooFarToAttack );
		Network.hookPacket( PACKET.ZC.CONFIG,                      onConfigUpdate );
		Network.hookPacket( PACKET.ZC.ACTION_FAILURE,              onActionFailure );
		Network.hookPacket( PACKET.ZC.MSG,                         onMessage );
	};
});