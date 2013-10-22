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
	'DB/DBManager',
	'Audio/BGM',               'Audio/SoundManager',
	'Renderer/MapRenderer',    'Renderer/Camera',
	'Network/PacketStructure', 'Network/NetworkManager',
	'Preferences/Controls',    'Preferences/Audio',       'Preferences/Map',    'Preferences/Camera'
],
function(
	DB,
	BGM,                 Sound,
	MapRenderer,         Camera,
	PACKET,              Network,
	ControlPreferences,  AudioPreferences,  MapPreferences,  CameraPreferences
) {
	"use strict";


	/**
	 * Process command
	 */
	return function( cmd ){
		var pkt;

		switch( cmd ) {

			default:
				this.addText( DB.msgstringtable[95], this.TYPE.INFO );
				break;

			case 'sound':
				this.addText( DB.msgstringtable[27 + AudioPreferences.Sound.play], this.TYPE.INFO );
				AudioPreferences.Sound.play = !AudioPreferences.Sound.play;
				AudioPreferences.save();

				if( AudioPreferences.Sound.play ) {
					Sound.stop();
				}
				break;

			case 'bgm':
				this.addText( DB.msgstringtable[31 + AudioPreferences.BGM.play], this.TYPE.INFO );
				AudioPreferences.BGM.play = !AudioPreferences.BGM.play;
				AudioPreferences.save();

				if( AudioPreferences.BGM.play ) {
					BGM.play( BGM.filename );
				}
				else {
					BGM.stop();
				}
				break;

			case 'miss':
				this.addText( DB.msgstringtable[317 + MapPreferences.miss], this.TYPE.INFO );
				MapPreferences.miss = !MapPreferences.miss;
				MapPreferences.save();
				break;

			case 'camera':
				this.addText( DB.msgstringtable[319 + CameraPreferences.smooth], this.TYPE.INFO );
				CameraPreferences.smooth = !CameraPreferences.smooth;
				CameraPreferences.save();
				break;

			case 'fog':
				MapPreferences.fog = !MapPreferences.fog;
				this.addText( 'fog ' + ( MapPreferences.fog ? 'on' : 'off'), this.TYPE.INFO );
				MapPreferences.save();
				break;

			case 'lightmap':
				MapPreferences.lightmap = !MapPreferences.lightmap;
				MapPreferences.save();
				break;

			case 'noctrl':
			case 'nc':
				this.addText( DB.msgstringtable[715 + ControlPreferences.noctrl], this.TYPE.INFO );
				ControlPreferences.noctrl = !ControlPreferences.noctrl;
				ControlPreferences.save();
				break;

			case 'noshift':
			case 'ns':
				this.addText( DB.msgstringtable[699 + ControlPreferences.noshift], this.TYPE.INFO );
				ControlPreferences.noshift = !ControlPreferences.noshift;
				ControlPreferences.save();
				break;

			case 'sit':
			case 'stand':
				pkt = new PACKET.CZ.REQUEST_ACT();
				if( Camera.target.action === Camera.target.ACTION.SIT )
					pkt.action = 3; // stand up
				else {
					pkt.action = 2; // sit down	
				}
				Network.sendPacket(pkt);
				break;

			case 'doridori':
				Camera.target.headDir = ( Camera.target.headDir === 1 ? 2 : 1 );
				pkt = new PACKET.CZ.CHANGE_DIRECTION();
				pkt.headDir = Camera.target.headDir;
				pkt.dir     = Camera.target.direction;
				Network.sendPacket(pkt);
				break;

			case 'bangbang':
				Camera.target.direction = ( Camera.target.direction + 1 ) % 8;
				pkt = new PACKET.CZ.CHANGE_DIRECTION();
				pkt.headDir = Camera.target.headDir;
				pkt.dir     = Camera.target.direction;
				Network.sendPacket(pkt);
				break;
	
			case 'bingbing':
				Camera.target.direction = ( Camera.target.direction + 7 ) % 8;
				pkt = new PACKET.CZ.CHANGE_DIRECTION();
				pkt.headDir = Camera.target.headDir;
				pkt.dir     = Camera.target.direction;
				Network.sendPacket(pkt);
				break;

			case 'where':
				this.addText(
					( DB.mapname[ MapRenderer.currentMap.replace('.gat','.rsw') ] || DB.msgstringtable[187] ) +
					"(" + MapRenderer.currentMap + ") : " + Math.floor(Camera.target.position[0]) + ", " + Math.floor(Camera.target.position[1]),
					this.TYPE.INFO
				);
				break;

			case 'who':
			case 'w':
				pkt = new PACKET.CZ.REQ_USER_COUNT();
				Network.sendPacket(pkt);
				break;	
		}
	};
});