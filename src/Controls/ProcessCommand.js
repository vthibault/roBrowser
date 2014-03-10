/**
 * Controls/ProcessCommand.js - extended from ChatBox
 *
 * Command in chatbox handler
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define([
	'require',
	'DB/DBManager',
	'Audio/BGM',               'Audio/SoundManager',
	'Engine/SessionStorage',
	'Network/PacketStructure', 'Network/NetworkManager',
	'Preferences/Controls',    'Preferences/Audio',       'Preferences/Map',    'Preferences/Camera'
],
function(
	require,
	DB,
	BGM,                 Sound,
	Session,
	PACKET,              Network,
	ControlPreferences,  AudioPreferences,  MapPreferences,  CameraPreferences
) {
	'use strict';


	/**
	 * Process command
	 */
	return function processCommand( text ){
		var pkt;
		var cmd = text.split(' ')[0];

		switch (cmd) {

			case 'sound':
				this.addText( DB.msgstringtable[27 + AudioPreferences.Sound.play], this.TYPE.INFO );
				AudioPreferences.Sound.play = !AudioPreferences.Sound.play;
				AudioPreferences.save();

				if (AudioPreferences.Sound.play) {
					Sound.stop();
				}
				return;

			case 'bgm':
				this.addText( DB.msgstringtable[31 + AudioPreferences.BGM.play], this.TYPE.INFO );
				AudioPreferences.BGM.play = !AudioPreferences.BGM.play;
				AudioPreferences.save();

				if (AudioPreferences.BGM.play) {
					BGM.play( BGM.filename );
				}
				else {
					BGM.stop();
				}
				return;

			case 'miss':
				this.addText( DB.msgstringtable[317 + MapPreferences.miss], this.TYPE.INFO );
				MapPreferences.miss = !MapPreferences.miss;
				MapPreferences.save();
				return;

			case 'camera':
				this.addText( DB.msgstringtable[319 + CameraPreferences.smooth], this.TYPE.INFO );
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
				this.addText( DB.msgstringtable[717 + ControlPreferences.noctrl], this.TYPE.INFO );
				ControlPreferences.noctrl = !ControlPreferences.noctrl;
				ControlPreferences.save();
				return;

			case 'noshift':
			case 'ns':
				this.addText( DB.msgstringtable[701 + ControlPreferences.noshift], this.TYPE.INFO );
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
				var currentMap = require('Renderer/MapRenderer').currentMap;
				this.addText(
					( DB.mapname[ currentMap.replace('.gat','.rsw') ] || DB.msgstringtable[187] ) +
					'(' + currentMap + ') : ' + Math.floor(Session.Entity.position[0]) + ', ' + Math.floor(Session.Entity.position[1]),
					this.TYPE.INFO
				);
				return;

			case 'who':
			case 'w':
				pkt = new PACKET.CZ.REQ_USER_COUNT();
				Network.sendPacket(pkt);
				return;

			case 'chat':
				require('UI/Components/ChatRoomCreate/ChatRoomCreate').show();
				return;

			case 'q':
				require('UI/Components/ChatRoom/ChatRoom').remove();
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


		// Command not found
		this.addText( DB.msgstringtable[95], this.TYPE.INFO );
	};
});