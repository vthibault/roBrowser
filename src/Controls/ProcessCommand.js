/**
 * Controls/ProcessCommand.js - extended from ChatBox
 *
 * Command in chatbox handler
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function( require )
{
	'use strict';


	// Load dependencies
	var DB                 = require('DB/DBManager');
	var MsgStringIDs = require('DB/MsgStringIds');
	var Emotions           = require('DB/Emotions');
	var BGM                = require('Audio/BGM');
	var Sound              = require('Audio/SoundManager');
	var Session            = require('Engine/SessionStorage');
	var PACKET             = require('Network/PacketStructure');
	var Network            = require('Network/NetworkManager');
	var ControlPreferences = require('Preferences/Controls');
	var AudioPreferences   = require('Preferences/Audio');
	var MapPreferences     = require('Preferences/Map');
	var CameraPreferences  = require('Preferences/Camera');
	var getModule          = require;


	/**
	 * Process command
	 */
	return function processCommand( text ){
		var pkt;
		var args = text.split(' ');
		var cmd = args[0];

		switch (cmd) {

			case 'sound':
				this.addText( DB.getMessage(MsgStringIDs.MSI_SOUND_ON + AudioPreferences.Sound.play), this.TYPE.INFO );
				AudioPreferences.Sound.play = !AudioPreferences.Sound.play;
				AudioPreferences.save();

				if (AudioPreferences.Sound.play) {
					Sound.stop();
				}
				return;

			case 'bgm':
				this.addText( DB.getMessage(MsgStringIDs.MSI_BGM_ON + AudioPreferences.BGM.play), this.TYPE.INFO );
				AudioPreferences.BGM.play = !AudioPreferences.BGM.play;
				AudioPreferences.save();

				if (AudioPreferences.BGM.play) {
					BGM.play( BGM.filename );
				}
				else {
					BGM.stop();
				}
				return;

			case 'effect':
			    	this.addText( DB.getMessage(MsgStringIDs.MSI_EFFECT_ON + MapPreferences.effect), this.TYPE.INFO );
				MapPreferences.effect = !MapPreferences.effect;
				MapPreferences.save();
				return;

			case 'mineffect':
			    	this.addText( DB.getMessage(MsgStringIDs.MSI_MINEFFECT_ON + MapPreferences.mineffect), this.TYPE.INFO );
				MapPreferences.mineffect = !MapPreferences.mineffect;
				MapPreferences.save();
				return;

			case 'miss':
				this.addText( DB.getMessage(MsgStringIDs.MSI_MISS_EFFECT_ON + MapPreferences.miss), this.TYPE.INFO );
				MapPreferences.miss = !MapPreferences.miss;
				MapPreferences.save();
				return;

			case 'camera':
				this.addText( DB.getMessage(MsgStringIDs.MSI_FIXED_CAMERA_ON + CameraPreferences.smooth), this.TYPE.INFO );
				CameraPreferences.smooth = !CameraPreferences.smooth;
				CameraPreferences.save();
				return;

			case 'fog':
				MapPreferences.fog = !MapPreferences.fog;
				this.addText( 'fog ' + ( MapPreferences.fog ? 'on' : 'off'), this.TYPE.INFO );
				MapPreferences.save();
				return;

			case 'lightmap':
				MapPreferences.lightmap = !MapPreferences.lightmap;
				MapPreferences.save();
				return;

			case 'noctrl':
			case 'nc':
				this.addText( DB.getMessage(MsgStringIDs.MSI_NOCTRL_ON + ControlPreferences.noctrl), this.TYPE.INFO );
				ControlPreferences.noctrl = !ControlPreferences.noctrl;
				ControlPreferences.save();
				return;

			case 'noshift':
			case 'ns':
				this.addText( DB.getMessage(MsgStringIDs.MSI_NOSHIFT_ON + ControlPreferences.noshift), this.TYPE.INFO );
				ControlPreferences.noshift = !ControlPreferences.noshift;
				ControlPreferences.save();
				return;

			case 'sit':
			case 'stand':
				pkt = new PACKET.CZ.REQUEST_ACT();
				if (Session.Entity.action === Session.Entity.ACTION.SIT) {
					pkt.action = 3; // stand up
				}
				else {
					pkt.action = 2; // sit down	
				}
				Network.sendPacket(pkt);
				return;

			case 'doridori':
				Session.Entity.headDir = ( Session.Entity.headDir === 1 ? 2 : 1 );
				pkt         = new PACKET.CZ.CHANGE_DIRECTION();
				pkt.headDir = Session.Entity.headDir;
				pkt.dir     = Session.Entity.direction;
				Network.sendPacket(pkt);
				return;

			case 'bangbang':
				Session.Entity.direction = ( Session.Entity.direction + 1 ) % 8;
				pkt         = new PACKET.CZ.CHANGE_DIRECTION();
				pkt.headDir = Session.Entity.headDir;
				pkt.dir     = Session.Entity.direction;
				Network.sendPacket(pkt);
				return;
	
			case 'bingbing':
				Session.Entity.direction = ( Session.Entity.direction + 7 ) % 8;
				pkt         = new PACKET.CZ.CHANGE_DIRECTION();
				pkt.headDir = Session.Entity.headDir;
				pkt.dir     = Session.Entity.direction;
				Network.sendPacket(pkt);
				return;

			case 'where':
				var currentMap = getModule('Renderer/MapRenderer').currentMap;
				this.addText(
					DB.getMapName(currentMap) + '(' + currentMap + ') : ' + Math.floor(Session.Entity.position[0]) + ', ' + Math.floor(Session.Entity.position[1]),
					this.TYPE.INFO
				);
				return;

			case 'guild':
				// todo: fix not using args[1], could be "guild name"
				pkt = new PACKET.CZ.REQ_MAKE_GUILD();
				pkt.GID = Session.GID;
				pkt.GName = args[1];
				Network.sendPacket(pkt);
				return;

			case 'hide':
				pkt = new PACKET.CZ.CHANGE_EFFECTSTATE();
				pkt.EffectState = 0x40;
				Network.sendPacket(pkt);
				return;

			case 'summer':
				pkt = new PACKET.CZ.CHANGE_EFFECTSTATE();
				pkt.EffectState = 0x40000;
				Network.sendPacket(pkt);
				return;

			case 'santa':
				pkt = new PACKET.CZ.CHANGE_EFFECTSTATE();
				pkt.EffectState = 0x10000;
				Network.sendPacket(pkt);
				return;

			case 'mm':
			case 'mapmove':
				pkt = new PACKET.CZ.MOVETO_MAP();
				if (args[1] === null) {
					return;
				} else {
					pkt.mapName = args[1];
				}
				
				if (args[2] !== null && args[3] !== null) {
					pkt.xPos = parseInt(args[2], 0);
					pkt.yPos = parseInt(args[3], 0);
				}
				
				Network.sendPacket(pkt);
				return;

			case 'item':
			case 'monster':
				pkt = new PACKET.CZ.ITEM_CREATE();
				pkt.itemName = args[1];
				Network.sendPacket(pkt);
				return;

			case 'who':
			case 'w':
				pkt = new PACKET.CZ.REQ_USER_COUNT();
				Network.sendPacket(pkt);
				return;

			case 'memo':
				pkt = new PACKET.CZ.REMEMBER_WARPPOINT();
				Network.sendPacket(pkt);
				return;

			case 'chat':
				getModule('UI/Components/ChatRoomCreate/ChatRoomCreate').show();
				return;

			case 'q':
				getModule('UI/Components/ChatRoom/ChatRoom').remove();
				return;
		}


		// /str+
		// TODO: do we have to spam the server with "1" unit or do we have to fix the servers code ?
		var matches = text.match(/^(\w{3})\+ (\d+)$/);
		if (matches) {
			var pos = ['str', 'agi', 'vit', 'int', 'dex', 'luk'].indexOf(matches[1]);
			if (pos > -1 && matches[2] !== 0) {
				pkt = new PACKET.CZ.STATUS_CHANGE();
				pkt.statusID     = pos + 13;
				pkt.changeAmount = parseInt( matches[2], 10 );
				Network.sendPacket(pkt);
				return;
			}
		}

		// Show emotion
		if (cmd in Emotions.commands) {
			pkt      = new PACKET.CZ.REQ_EMOTION();
			pkt.type = Emotions.commands[cmd];
			Network.sendPacket(pkt);
			return;
		}

		// Command not found
		this.addText( DB.getMessage(MsgStringIDs.MSI_INVALID_COMMAND), this.TYPE.INFO );
	};
});