/**
 * Engine/CharEngine.js
 *
 * Map Engine
 * Manage Map server
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
	var jQuery           = require('Utils/jquery');
	var DB               = require('DB/DBManager');
	var Network          = require('Network/NetworkManager');
	var PACKET           = require('Network/PacketStructure');
	var Renderer         = require('Renderer/Renderer');
	var Camera           = require('Renderer/Camera');
	var MapRenderer      = require('Renderer/MapRenderer');
	var EntityManager    = require('Renderer/EntityManager');
	var Entity           = require('Renderer/Entity/Entity');
	var Altitude         = require('Renderer/Map/Altitude');
	var Mouse            = require('Controls/MouseEventHandler');
	var KEYS             = require('Controls/KeyEventHandler');
	var UIManager        = require('UI/UIManager');
	var Escape           = require('UI/Components/Escape/Escape');
	var WinPopup         = require('UI/Components/WinPopup/WinPopup');
	var ChatBox          = require('UI/Components/ChatBox/ChatBox');
	var MiniMap          = require('UI/Components/MiniMap/MiniMap');
	var BasicInfo        = require('UI/Components/BasicInfo/BasicInfo');
	var WinStats         = require('UI/Components/WinStats/WinStats');
	var Inventory        = require('UI/Components/Inventory/Inventory');
	var Equipment        = require('UI/Components/Equipment/Equipment');
	var StatusIcons      = require('UI/Components/StatusIcons/StatusIcons');


	/**
	 * Map Engine namespace
	 */
	var MapEngine = {};


	// Initialize
	require('Controls/MapControl').call(MapEngine);


	/**
	 *  @var {Entity} CharSelect character
	 */
	MapEngine.baseCharacter = null;


	/**
	 * @var {Entity} main player
	 */
	MapEngine.entity = new Entity();


	/**
	 * Connect to Map Server
	 *
	 * @param {object} _pkt - PACKET.HC.NOTIFY_ZONESVR
	 * @param {number} AID - account id
	 * @param {number} AuthCode - session code
	 * @param {boolean} Sex - account sex
	 * @param {Entity} Character entity from char select
	 */
	MapEngine.init = function Init( _pkt, AID, AuthCode, Sex, Character )
	{
		// Connect to char server
		Network.connect( Network.utils.longToIP( _pkt.addr.ip ), _pkt.addr.port, function( success ){

			// Fail to connect...
			if ( !success ) {
				UIManager.showErrorBox( DB.msgstringtable[1] );
				return;
			}

			MapEngine.baseCharacter = Character;

			// Success, try to login.
			var pkt        = new PACKET.CZ.ENTER();
			pkt.AID        = AID;
			pkt.GID        = _pkt.GID;
			pkt.AuthCode   = AuthCode;
			pkt.clientTime = Date.now();
			pkt.Sex        = Sex;
			Network.sendPacket(pkt);

			// Server send back AID
			Network.read(function(fp){
				// if PACKETVER < 20070521, client send GID...
				if ( fp.length === 4 ) {
					MapEngine.baseCharacter.GID = fp.readLong();
				}
			});

			// Ping
			var ping = new PACKET.CZ.REQUEST_TIME();
			Network.setPing(function(){
				ping.time = Date.now();
				Network.sendPacket(ping);
			});
		});


		// Hook packets
		Network.hookPacket( PACKET.ZC.AID,                 this.onReceiveAccountID );
		Network.hookPacket( PACKET.ZC.ACCEPT_ENTER,        this.onConnectionAccepted );
		Network.hookPacket( PACKET.ZC.ACCEPT_ENTER2,       this.onConnectionAccepted );
		Network.hookPacket( PACKET.ZC.NPCACK_MAPMOVE,      this.onMapChange );
		Network.hookPacket( PACKET.ZC.NPCACK_SERVERMOVE,   this.onServerChange );
		Network.hookPacket( PACKET.ZC.ACCEPT_QUIT,         this.onExitFail );
		Network.hookPacket( PACKET.ZC.REFUSE_QUIT,         this.onExitSuccess );
		Network.hookPacket( PACKET.ZC.RESTART_ACK,         this.onRestartAnswer );
		Network.hookPacket( PACKET.ZC.ACK_REQ_DISCONNECT,  this.onDisconnectAnswer );
		Network.hookPacket( PACKET.ZC.NOTIFY_TIME,         this.onPong );

		// Extend controller
		require('./MapEngine/Main').call(this);
		require('./MapEngine/NPC').call(this);
		require('./MapEngine/Entity').call(this);
		require('./MapEngine/Item').call(this);
		require('./MapEngine/PrivateMessage').call(this);
	};


	/**
	 * Pong from server
	 * TODO: check the time ?
	 */
	MapEngine.onPong = function OnPong( pkt )
	{
		//pkt.time
	};


	/**
	 * Server update our account id
	 *
	 * @param {object} pkt - PACKET.ZC.AID
	 */
	MapEngine.onReceiveAccountID = function OnReceiveAccountID( pkt )
	{
		MapEngine.baseCharacter.GID = pkt.AID;
	};


	/**
	 * Map accept us to enter the map
	 *
	 * @param {object} pkt - PACKET.ZC.ACCEPT_ENTER
	 */
	MapEngine.onConnectionAccepted = function OnConnectionAccepted( pkt )
	{
		MapEngine.entity.set( MapEngine.baseCharacter );
		MapEngine.entity.onWalkEnd = MapEngine.onWalkEnd;

		BasicInfo.update('blvl', MapEngine.baseCharacter.level );
		BasicInfo.update('jlvl', MapEngine.baseCharacter.joblevel );
		BasicInfo.update('zeny', MapEngine.baseCharacter.money );
		BasicInfo.update('name', MapEngine.baseCharacter.name );
		BasicInfo.update('job',  MapEngine.baseCharacter.job );

		// Bind UI
		WinStats.OnRequestUpdate        = MapEngine.onRequestStatUpdate;
		Equipment.onUnEquip             = MapEngine.onUnEquip;
		Equipment.onConfigUpdate        = MapEngine.onConfigUpdate;
		Equipment.onEquipItem           = MapEngine.onEquipItem;
		Inventory.onUseItem             = MapEngine.onUseItem;
		Inventory.onEquipItem           = MapEngine.onEquipItem;
		Escape.onExitRequest            = MapEngine.onExitRequest;
		Escape.onCharSelectionRequest   = MapEngine.onRestartRequest;
		Escape.onReturnSavePointRequest = MapEngine.onReturnSavePointRequest;
		Escape.onResurectionRequest     = MapEngine.onResurectionRequest;
	};


	/**
	 * Changing map, loading new map
	 *
	 * @param {object} pkt - PACKET.ZC.NPCACK_MAPMOVE
	 */
	MapEngine.onMapChange = function OnMapChange( pkt )
	{
		jQuery(window).off('keydown.map');

		MapRenderer.onLoad = function(){

			// TODO: find a better place to put it
			jQuery(window).on('keydown.map', function( event ){
				if( event.which === KEYS.INSERT ) {
					var pkt = new PACKET.CZ.REQUEST_ACT();
					pkt.action = MapEngine.entity.action === MapEngine.entity.ACTION.SIT ? 3 : 2;
					Network.sendPacket(pkt);
					event.stopImmediatePropagation();
					return false;
				}
			});

			MapEngine.entity.set({
				PosDir: [ pkt.xPos, pkt.yPos, 0 ],
				GID: MapEngine.baseCharacter.GID
			});
			EntityManager.add( MapEngine.entity );

			// Initialize camera
			Camera.setTarget( MapEngine.entity );
			Camera.init();

			// Add Game UI
			MiniMap.append();
			MiniMap.setMap( MapRenderer.currentMap );
			ChatBox.append();
			BasicInfo.append();
			Escape.append();
			Inventory.append();
			Equipment.append();
			StatusIcons.append();

			// Map loaded
			Network.sendPacket(
				new PACKET.CZ.NOTIFY_ACTORINIT()
			);
		};

		MapRenderer.setMap( pkt.mapName );
	};


	/**
	 * Change zone server
	 * TODO: add support for zone-server changed.
	 *
	 * @param {object} pkt - PACKET.ZC.NPCACK_SERVERMOVE
	 */
	MapEngine.onServerChange = function onServerChange( pkt )
	{
		jQuery(window).off('keydown.map');
		/*
			pkt.mapName
			pkt.xPos
			pkt.yPos
			pkt.addr.ip
			pkt.addr.port
		*/
		// Add to resend authcode sex etc ?
	};


	/**
	 * Ask the server to disconnect
	 */
	MapEngine.onExitRequest = function OnExitRequest()
	{
		var pkt = new PACKET.CZ.REQUEST_QUIT();
		Network.sendPacket(pkt);
	};


	/**
	 * Server don't want us to disconnect yet
	 *
	 * @param {object} pkt - PACKET.ZC.REFUSE_QUIT
	 */
	MapEngine.onExitFail = function OnExitFail( pkt )
	{
		ChatBox.addText( DB.msgstringtable[501], ChatBox.TYPE.ERROR);
	};


	/**
	 * Server accept to disconnect us
	 *
	 * @param {object} pkt - PACKET.ZC.REFUSE_QUIT
	 */
	MapEngine.onExitSuccess = function OnExitSuccess( pkt )
	{
		Renderer.stop();
		MapEngine.onExit();
	};


	/**
	 * @var {function} callback to define
	 */
	MapEngine.onExit = function OnExit(){};


	/**
	 * Try to return to char-server
	 */
	MapEngine.onRestartRequest = function OnRestartRequest()
	{
		var pkt = new PACKET.CZ.RESTART();
		pkt.type = 1;
		Network.sendPacket(pkt);
	};


	/**
	 * Go back to save point request
	 */
	MapEngine.onReturnSavePointRequest = function OnReturnSavePointRequest()
	{
		var pkt = new PACKET.CZ.RESTART();
		pkt.type = 0;
		Network.sendPacket(pkt);
	};


	/**
	 * Resurection feature
	 */
	MapEngine.onResurectionRequest = function OnResurectionRequest()
	{
		var pkt = new PACKET.CZ.STANDING_RESURRECTION();
		Network.sendPacket(pkt);
	};


	/**
	 * Does the server want you to return to char-server ?
	 *
	 * @param {object} pkt - PACKET.ZC.RESTART_ACK
	 */
	MapEngine.onRestartAnswer = function OnRestartAnswer( pkt )
	{
		if( !pkt.type ) {
			// Have to wait 10sec
			ChatBox.addText( DB.msgstringtable[501], ChatBox.TYPE.ERROR );
		}
		else {
			MapRenderer.free();
			Renderer.stop();
			MapEngine.onRestart();
		}
	};


	/**
	 * @var {function} callback to define
	 */
	MapEngine.onRestart = function OnRestart(){};


	/**
	 * Response from server to disconnect
	 * @param pkt - {object}
	 */
	MapEngine.onDisconnectAnswer = function OnDisconnectAnswer( pkt )
	{
		switch( pkt.result ) {
			// Disconnect
			case 0:
				Renderer.stop();
				MapEngine.onExit();
				break;

			case 1:
				// Have to wait 10 sec
				ChatBox.addText( DB.msgstringtable[501], ChatBox.TYPE.ERROR);
				return;

			default:
		}
	};


	/**
	 * @var {number} walk timer
	 */
	MapEngine._walkTimer = null;


	/**
	 * Last delay to walk
	 */
	MapEngine._walkLastTick = 0;


	/**
	 * Ask to move
	 */
	MapEngine.onMouseDown = function OnMouseDown()
	{
		clearTimeout(this._walkTimer);

		// If siting, update direction
		if( this.entity.action === this.entity.ACTION.SIT ) {
			this.entity.lookTo( Mouse.world.x, Mouse.world.y );

			var pkt     = new PACKET.CZ.CHANGE_DIRECTION();
			pkt.headDir = this.entity.headDir;
			pkt.dir     = this.entity.direction;
			Network.sendPacket(pkt);
			return;
		}

		this.onWalkRequest();
	};


	/**
	 * Stop moving
	 */
	MapEngine.onMouseUp = function OnMouseUp()
	{
		clearTimeout(this._walkTimer);
	};


	/**
	 * Moving function
	 */
	MapEngine.onWalkRequest = function OnWalkRequest()
	{
		if( this._walkLastTick + 500 > Renderer.tick ) {
			return;	
		}

		if ( Mouse.world.x > -1 && Mouse.world.y > -1 ) {
			var pkt = new PACKET.CZ.REQUEST_MOVE();
			pkt.dest[0] = Mouse.world.x;
			pkt.dest[1] = Mouse.world.y;
			Network.sendPacket(pkt);
		}

		clearTimeout(this._walkTimer);
		this._walkTimer    =  setTimeout( this.onWalkRequest.bind(this), 500);
		this._walkLastTick = +Renderer.tick;
	};


	/**
	 * If the character moved to attack, once it finished to move ask to attack
	 */
	MapEngine.onWalkEnd = function OnWalkEnd()
	{
		var entity = EntityManager.getFocusEntity();
		if( entity ) {
			var pkt = new PACKET.CZ.REQUEST_ACT();
			pkt.action = 7;
			pkt.targetGID = entity.GID;
			Network.sendPacket(pkt);
		}
	};


	/**
	 * Ask server to update status
	 *
	 * @param {number} id
	 * @param {number} amount
	 */
	MapEngine.onRequestStatUpdate = function OnRequestStatUpdate(id, amount)
	{
		var pkt = new PACKET.CZ.STATUS_CHANGE();
		pkt.statusID     = id;
		pkt.changeAmount = amount;

		Network.sendPacket(pkt);
	};


	/**
	 * Drop item to the floor
	 *
	 * @param {number} index in inventory
	 * @param {number} count to drop
	 */
	MapEngine.onDropItem = function OnDropItem( index, count )
	{
		if( count ) {
			var pkt   = new PACKET.CZ.ITEM_THROW();
			pkt.Index = index;
			pkt.count = count;
			Network.sendPacket(pkt);
		}
	};


	/**
	 * Use an item
	 *
	 * @param {number} item's index
	 */
	MapEngine.onUseItem = function( index )
	{
		var pkt   = new PACKET.CZ.USE_ITEM();
		pkt.index = index;
		pkt.AID   = MapEngine.entity.GID;
		Network.sendPacket(pkt);
	};


	/**
	 * Equip item
	 *
	 * @param {number} item's index
	 * @param {number} where to equip
	 */
	MapEngine.onEquipItem = function( index, location )
	{
		var pkt          = new PACKET.CZ.REQ_WEAR_EQUIP();
		pkt.index        = index;
		pkt.wearLocation = location;
		Network.sendPacket(pkt);
	};


	/**
	 * Take off an equip
	 *
	 * @param {number} index to unequip
	 */
	MapEngine.onUnEquip = function OnUnEquip( index )
	{
		var pkt = new PACKET.CZ.REQ_TAKEOFF_EQUIP();
		pkt.index = index;
		Network.sendPacket(pkt);
	};


	/**
	 * Update config
	 *
	 * @param {number} config id (only type:0 is supported - equip)
	 * @param {number} val
	 */
	MapEngine.onConfigUpdate = function OnConfigUpdate( type, val )
	{
		var pkt = new PACKET.CZ.CONFIG();
		pkt.Config = type;
		pkt.Value = val;
		Network.sendPacket(pkt);
	};


	/**
	 * Export
	 */
	return MapEngine;
});