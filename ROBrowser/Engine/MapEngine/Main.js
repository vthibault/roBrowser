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


	var MainPlayer;


	/**
	 * Load dependencies
	 */
	var DB            = require('DB/DBManager');
	var PathFinding   = require('Utils/PathFinding');
	var Network       = require('Network/NetworkManager');
	var PACKET        = require('Network/PacketStructure');
	var Camera        = require('Renderer/Camera');
	var EntityManager = require('Renderer/EntityManager');
	var Altitude      = require('Renderer/Map/Altitude');
	var ChatBox       = require('UI/Components/ChatBox/ChatBox');
	var BasicInfo     = require('UI/Components/BasicInfo/BasicInfo');
	var Escape        = require('UI/Components/Escape/Escape');
	var Announce      = require('UI/Components/Announce/Announce');


	/**
	 * Move main player to the position specify
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_PLAYERMOVE
	 */
	function WalkTo( pkt )
	{
		//entity.position[0] = pkt.MoveData[0];
		//entity.position[1] = pkt.MoveData[1];
		//entity.position[2] = Altitude.getCellHeight(  pkt.MoveData[0],  pkt.MoveData[1] );
		Camera.target.walkTo(
			pkt.MoveData[0],
			pkt.MoveData[1],
			pkt.MoveData[2],
			pkt.MoveData[3]
		);
	}


	/**
	 * Get player attack range
	 *
	 * @param {object} pkt - PACKET.ZC.ATTACK_RANGE
	 */
	function UpdateAttackRange( pkt )
	{
		MainPlayer.attack_range = pkt.currentAttRange;
	}


	/**
	 * Modify main players parameters
	 * Generic function
	 */
	function UpdateParameter( pkt )
	{
		var amount = pkt.amount || pkt.count;
		var type   = pkt.varID  || pkt.statusType;

		switch( type ) {

			// Walk Speed
			case  0:
				MainPlayer.walk.speed = amount;
				break;

			// Base exp
			case  1:
				MainPlayer.base_exp  = amount;
				if( MainPlayer.base_exp_next ) {
					BasicInfo.update('bexp', MainPlayer.base_exp, MainPlayer.base_exp_next );
				}
				break;

			// Job exp
			case  2:
				MainPlayer.job_exp  = amount;
				if( MainPlayer.job_exp_next ) {
					BasicInfo.update('jexp', MainPlayer.job_exp, MainPlayer.job_exp_next );
				}
				break;

			// Karma, manner (not used ?)
			case  3:
			case  4:
				break;

			// HP
			case  5:
				MainPlayer.life.hp = amount;
				MainPlayer.life.update();

				// Urg we are dead !
				if( amount < 1 ) {
					Escape.ui.show();
					Escape.ui.find('.savepoint').show();
					Escape.ui.find('.settings, .sound, .hotkey').hide();

					// TODO: check for resurection button
				}

				if( MainPlayer.life.hp_max > -1 ) {
					BasicInfo.update('hp', MainPlayer.life.hp, MainPlayer.life.hp_max);
				}
				break;

			// HP max
			case  6:
				MainPlayer.life.hp_max = amount;
				MainPlayer.life.update();

				if( MainPlayer.life.hp > -1 ) {
					BasicInfo.update('hp',  MainPlayer.life.hp, MainPlayer.life.hp_max);
				}
				break;

			// SP
			case  7:
				MainPlayer.life.sp = amount;
				MainPlayer.life.update();

				if( MainPlayer.life.sp_max > -1 ) {
					BasicInfo.update('sp', MainPlayer.life.sp, MainPlayer.life.sp_max);
				}
				break;

			// SP max
			case  8:
				MainPlayer.life.sp_max = amount;
				MainPlayer.life.update();

				if( MainPlayer.life.sp > -1 ) {
					BasicInfo.update('sp',  MainPlayer.life.sp, MainPlayer.life.sp_max);
				}
				break;

			// Status points
			case  9:
				break;

			// Base level
			case 11:
				BasicInfo.update('blvl', amount);
				break;

			// Skill points
			case 12:
				break;

			// Stats
			case 13: break; // str
			case 14: break; // agi
			case 15: break; // vit
			case 16: break; // int
			case 17: break; // dex
			case 18: break; // luk

			// Zeny
			case 20:
				BasicInfo.update('zeny', amount);
				break;

			// Base exp next
			case 22:
				MainPlayer.base_exp_next  = amount;
				if( MainPlayer.base_exp > -1 ) {
					BasicInfo.update('bexp', MainPlayer.base_exp, MainPlayer.base_exp_next );
				}
				break;

			case 23:
				MainPlayer.job_exp_next  = amount;
				if( MainPlayer.job_exp > -1 ) {
					BasicInfo.update('jexp', MainPlayer.job_exp, MainPlayer.job_exp_next );
				}
				break;

			case 24:
				MainPlayer.weight = amount;
				if( MainPlayer.weight_max > -1 ) {
					BasicInfo.update('weight', MainPlayer.weight, MainPlayer.weight_max );
				}
				break;

			case 25:
				MainPlayer.weight_max = amount;
				if( MainPlayer.weight > -1 ) {
					BasicInfo.update('weight', MainPlayer.weight, MainPlayer.weight_max );
				}
				break;

			// Stats window
			case 41: break; // atk1
			case 42: break; // atk2
			case 43: break; // matk1
			case 44: break; // matk2
			case 45: break; // def1
			case 46: break; // def2
			case 47: break; // mdef1
			case 48: break; // mdef2
			case 49: break; // hit
			case 50: break; // flee
			case 51: break; // dodge
			case 52: break; // crit
			case 53: break; // aspd

			// Job level
			case 55:
				BasicInfo.update('jlvl', amount);
				break;

			default:
				console.log( "recv_main_update_status();  -> unknown type " + type + ".");
		}
	}


	/**
	 * Received announce from server
	 *
	 * @param {object} pkt - PACKET.ZC.BROADCAST
	 */
	function OnBroadcast( pkt )
	{
		var color = "#FFFF00";
		
		if ( pkt.msg.match(/^blue/) ) {
			color = "#00FFFF";
			pkt.msg = pkt.msg.substr(4);
		}
		else if ( pkt.msg.match(/^ssss/) ) {
			pkt.msg = pkt.msg.substr(4);
		}
		//TODO: Find colors in broadcast

		ChatBox.addText( pkt.msg, ChatBox.TYPE.ANNOUNCE, color );

		Announce.append();
		Announce.set( pkt.msg, color );
	}


	/**
	 * Receive player count in server
	 * @param {object} pkt - PACKET.ZC.USER_COUNT
	 */
	function OnPlayerCount( pkt )
	{
		ChatBox.addText( DB.msgstringtable[178].replace('%d', pkt.count), ChatBox.TYPE.INFO );
	}


	/**
	 * Our player just talk
	 *
	 * @param {object} pkt - PACKET_ZC_NOTIFY_PLAYERCHAT
	 */
	function OnPlayerMessage( pkt )
	{
		ChatBox.addText( pkt.msg, ChatBox.TYPE.PUBLIC | ChatBox.TYPE.SELF );
		if( Camera.target ) {
			Camera.target.dialog.set( pkt.msg );
		}
	}


	/**
	 * Target too far to attack it
	 *
	 * @param {object} pkt - PACKET.ZC.ATTACK_FAILURE_FOR_DISTANCE
	 */
	function OnPlayerTooFarToAttack( pkt )
	{
		var out   = [];
		var count = PathFinding.search(
			[ pkt.xPos,	pkt.yPos ],
			[ pkt.targetXPos, pkt.targetYPos ],
			pkt.currentAttRange,
			out
		);

		if( count ) {
			var _pkt = new PACKET.CZ.REQUEST_MOVE();
			_pkt.dest[0] = out[ count - 1 ][0];
			_pkt.dest[1] = out[ count - 1 ][1];
			Network.sendPacket(_pkt);
		}
	}


	/**
	 * Failed to cast a skill
	 *
	 * @param {object} pkt - PACKET.ZC.ACK_TOUSESKILL
	 */
	function SkillResult( pkt )
	{
		// Yeah success !
		if( pkt.success ) {
			return;
		}

		var error = 0;

		if ( pkt.NUM ) {

			switch( pkt.SKID ) {

				default:
					error = 204;
					break;

				case DB.SKID.NV_BASIC:
					error = pkt.NUM < 7 ? 159 + pkt.NUM : pkt.NUM == 7 ? 383 : 0;
					break;

				case DB.SKID.AL_WARP:
					error = 214;
					break;

				case DB.SKID.TF_STEAL:
					error = 205;
					break;

				case DB.SKID.TF_POISON:
					error = 207;
					break;
			}
		}

		else {
			switch( pkt.cause ) {
				case 1:  error = 202; break;
				case 2:  error = 203; break;
				case 3:  error = 808; break;
				case 4:  error = 219; break;
				case 5:  error = 233; break;
				case 6:  error = 239; break;
				case 7:  error = 246; break;
				case 8:  error = 247; break;
				case 9:  error = 580; break;
				case 10: error = 285; break;
			}
		}

		if ( error ) {
			ChatBox.addText( DB.msgstringtable[error], ChatBox.TYPE.ERROR );
		}
	}


	/**
	 * Initialize
	 */
	return function MainEngine()
	{
		MainPlayer = this.entity;

		Network.hookPacket( PACKET.ZC.NOTIFY_PLAYERMOVE,           WalkTo );
		Network.hookPacket( PACKET.ZC.PAR_CHANGE,                  UpdateParameter );
		Network.hookPacket( PACKET.ZC.LONGPAR_CHANGE,              UpdateParameter );
		Network.hookPacket( PACKET.ZC.STATUS_CHANGE,               UpdateParameter );
		Network.hookPacket( PACKET.ZC.NOTIFY_CARTITEM_COUNTINFO,   UpdateParameter );
		Network.hookPacket( PACKET.ZC.COUPLESTATUS,                UpdateParameter );
		Network.hookPacket( PACKET.ZC.ATTACK_RANGE,                UpdateAttackRange );
		Network.hookPacket( PACKET.ZC.BROADCAST,                   OnBroadcast );
		Network.hookPacket( PACKET.ZC.USER_COUNT,                  OnPlayerCount );
		Network.hookPacket( PACKET.ZC.NOTIFY_PLAYERCHAT,           OnPlayerMessage );
		Network.hookPacket( PACKET.ZC.ATTACK_FAILURE_FOR_DISTANCE, OnPlayerTooFarToAttack );
		Network.hookPacket( PACKET.ZC.ACK_TOUSESKILL,              SkillResult );
	};
});