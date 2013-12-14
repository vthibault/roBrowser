/**
 * Engine/MapEngine.js
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
	var SoundManager     = require('Audio/SoundManager');
	var BGM              = require('Audio/BGM');
	var Session          = require('Engine/SessionStorage');
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
	var Background       = require('UI/Background');
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
	 * Connect to Map Server
	 *
	 * @param {number} IP
	 * @param {number} port
	 * @param {number} Character ID
	 */
	function Init( ip, port, GID )
	{
		// Connect to char server
		Network.connect( Network.utils.longToIP( ip ), port, function( success ){

			// Force reloading map
			MapRenderer.currentMap = "";

			// Fail to connect...
			if ( !success ) {
				UIManager.showErrorBox( DB.msgstringtable[1] );
				return;
			}

			// Success, try to login.
			var pkt        = new PACKET.CZ.ENTER();
			pkt.AID        = Session.AID;
			pkt.GID        = GID;
			pkt.AuthCode   = Session.AuthCode;
			pkt.clientTime = Date.now();
			pkt.Sex        = Session.Sex;
			Network.sendPacket(pkt);

			// Server send back AID
			Network.read(function(fp){
				// if PACKETVER < 20070521, client send GID...
				if ( fp.length === 4 ) {
					Session.Character.GID = fp.readLong();
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
		Network.hookPacket( PACKET.ZC.AID,                 OnReceiveAccountID );
		Network.hookPacket( PACKET.ZC.ACCEPT_ENTER,        OnConnectionAccepted );
		Network.hookPacket( PACKET.ZC.ACCEPT_ENTER2,       OnConnectionAccepted );
		Network.hookPacket( PACKET.ZC.NPCACK_MAPMOVE,      OnMapChange );
		Network.hookPacket( PACKET.ZC.NPCACK_SERVERMOVE,   OnServerChange );
		Network.hookPacket( PACKET.ZC.ACCEPT_QUIT,         OnExitFail );
		Network.hookPacket( PACKET.ZC.REFUSE_QUIT,         OnExitSuccess );
		Network.hookPacket( PACKET.ZC.RESTART_ACK,         OnRestartAnswer );
		Network.hookPacket( PACKET.ZC.ACK_REQ_DISCONNECT,  OnDisconnectAnswer );
		Network.hookPacket( PACKET.ZC.NOTIFY_TIME,         OnPong );

		// Extend controller
		require('./MapEngine/Main').call();
		require('./MapEngine/NPC').call();
		require('./MapEngine/Entity').call();
		require('./MapEngine/Item').call();
		require('./MapEngine/PrivateMessage').call();
	}


	/**
	 * Pong from server
	 * TODO: check the time ?
	 */
	function OnPong( pkt )
	{
		//pkt.time
	}


	/**
	 * Server update our account id
	 *
	 * @param {object} pkt - PACKET.ZC.AID
	 */
	function OnReceiveAccountID( pkt )
	{
		Session.Character.GID = pkt.AID;
	}


	/**
	 * Map accept us to enter the map
	 *
	 * @param {object} pkt - PACKET.ZC.ACCEPT_ENTER
	 */
	function OnConnectionAccepted( pkt )
	{
		Session.Entity = new Entity( Session.Character );
		Session.Entity.onWalkEnd = OnWalkEnd;

		BasicInfo.update('blvl', Session.Character.level );
		BasicInfo.update('jlvl', Session.Character.joblevel );
		BasicInfo.update('zeny', Session.Character.money );
		BasicInfo.update('name', Session.Character.name );
		BasicInfo.update('job',  Session.Character.job );

		// Bind UI
		WinStats.OnRequestUpdate        = OnRequestStatUpdate;
		Equipment.onUnEquip             = OnUnEquip;
		Equipment.onConfigUpdate        = OnConfigUpdate;
		Equipment.onEquipItem           = OnEquipItem;
		Inventory.onUseItem             = OnUseItem;
		Inventory.onEquipItem           = OnEquipItem;
		Escape.onExitRequest            = OnExitRequest;
		Escape.onCharSelectionRequest   = OnRestartRequest;
		Escape.onReturnSavePointRequest = OnReturnSavePointRequest;
		Escape.onResurectionRequest     = OnResurectionRequest;
	}


	/**
	 * Changing map, loading new map
	 *
	 * @param {object} pkt - PACKET.ZC.NPCACK_MAPMOVE
	 */
	function OnMapChange( pkt )
	{
		jQuery(window).off('keydown.map');

		MapRenderer.onLoad = function(){

			// TODO: find a better place to put it
			jQuery(window).on('keydown.map', function( event ){
				if( event.which === KEYS.INSERT ) {
					var pkt = new PACKET.CZ.REQUEST_ACT();
					pkt.action = Session.Entity.action === Session.Entity.ACTION.SIT ? 3 : 2;
					Network.sendPacket(pkt);
					event.stopImmediatePropagation();
					return false;
				}
			});

			Session.Entity.set({
				PosDir: [ pkt.xPos, pkt.yPos, 0 ],
				GID: Session.Character.GID
			});
			EntityManager.add( Session.Entity );

			// Initialize camera
			Camera.setTarget( Session.Entity );
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
	}


	/**
	 * Change zone server
	 * TODO: add support for zone-server changed.
	 *
	 * @param {object} pkt - PACKET.ZC.NPCACK_SERVERMOVE
	 */
	function OnServerChange( pkt )
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
	}


	/**
	 * Ask the server to disconnect
	 */
	function OnExitRequest()
	{
		var pkt = new PACKET.CZ.REQUEST_QUIT();
		Network.sendPacket(pkt);

		// No Answer from the server, close it now
		UIManager.removeComponents();
		Network.close();
		Renderer.stop();
		MapRenderer.free();
		SoundManager.stop();
		BGM.stop();

		Background.remove(function(){
			window.close();
			require('Engine/GameEngine').init();
		});
	}


	/**
	 * Server don't want us to disconnect yet
	 *
	 * @param {object} pkt - PACKET.ZC.REFUSE_QUIT
	 */
	function OnExitFail( pkt )
	{
		ChatBox.addText( DB.msgstringtable[502], ChatBox.TYPE.ERROR);
	}


	/**
	 * Server accept to disconnect us
	 *
	 * @param {object} pkt - PACKET.ZC.REFUSE_QUIT
	 */
	function OnExitSuccess( pkt )
	{
		Renderer.stop();
		MapRenderer.free();

		UIManager.removeComponents();
		Network.close();
		Renderer.stop();
		MapRenderer.free();
		SoundManager.stop();
		BGM.stop();

		Background.remove(function(){
			window.close();
			require('Engine/GameEngine').init();
		});
	}


	/**
	 * Try to return to char-server
	 */
	function OnRestartRequest()
	{
		var pkt = new PACKET.CZ.RESTART();
		pkt.type = 1;
		Network.sendPacket(pkt);
	}


	/**
	 * Go back to save point request
	 */
	function OnReturnSavePointRequest()
	{
		var pkt = new PACKET.CZ.RESTART();
		pkt.type = 0;
		Network.sendPacket(pkt);
	}


	/**
	 * Resurection feature
	 */
	function OnResurectionRequest()
	{
		var pkt = new PACKET.CZ.STANDING_RESURRECTION();
		Network.sendPacket(pkt);
	}


	/**
	 * Does the server want you to return to char-server ?
	 *
	 * @param {object} pkt - PACKET.ZC.RESTART_ACK
	 */
	function OnRestartAnswer( pkt )
	{
		if( !pkt.type ) {
			// Have to wait 10sec
			ChatBox.addText( DB.msgstringtable[502], ChatBox.TYPE.ERROR );
		}
		else {
			StatusIcons.clean();
			ChatBox.clean();
			MapRenderer.free();
			Renderer.stop();
			OnRestart();
		}
	}


	/**
	 * Response from server to disconnect
	 * @param pkt - {object}
	 */
	function OnDisconnectAnswer( pkt )
	{
		switch( pkt.result ) {
			// Disconnect
			case 0:
				ChatBox.clean();
				Renderer.stop();
				OnExit();
				break;

			case 1:
				// Have to wait 10 sec
				ChatBox.addText( DB.msgstringtable[502], ChatBox.TYPE.ERROR);
				return;

			default:
		}
	}


	/**
	 * @var {number} walk timer
	 */
	var _walkTimer = null;


	/**
	 * @var {number} Last delay to walk
	 */
	var _walkLastTick = 0;


	/**
	 * Ask to move
	 */
	function OnMouseDown()
	{
		clearTimeout(_walkTimer);

		// If siting, update direction
		if( Session.Entity.action === Session.Entity.ACTION.SIT ) {
			Session.Entity.lookTo( Mouse.world.x, Mouse.world.y );

			var pkt     = new PACKET.CZ.CHANGE_DIRECTION();
			pkt.headDir = Session.Entity.headDir;
			pkt.dir     = Session.Entity.direction;
			Network.sendPacket(pkt);
			return;
		}

		OnWalkRequest();
	};


	/**
	 * Stop moving
	 */
	function OnMouseUp()
	{
		clearTimeout(_walkTimer);
	};


	/**
	 * Moving function
	 */
	function OnWalkRequest()
	{
		if( _walkLastTick + 500 > Renderer.tick ) {
			return;	
		}

		if ( Mouse.world.x > -1 && Mouse.world.y > -1 ) {
			var pkt = new PACKET.CZ.REQUEST_MOVE();
			pkt.dest[0] = Mouse.world.x;
			pkt.dest[1] = Mouse.world.y;
			Network.sendPacket(pkt);
		}

		clearTimeout(_walkTimer);
		_walkTimer    =  setTimeout( OnWalkRequest, 500);
		_walkLastTick = +Renderer.tick;
	}


	/**
	 * If the character moved to attack, once it finished to move ask to attack
	 */
	function OnWalkEnd()
	{
		var entity = EntityManager.getFocusEntity();
		if( entity ) {
			var pkt = new PACKET.CZ.REQUEST_ACT();
			pkt.action = 7;
			pkt.targetGID = entity.GID;
			Network.sendPacket(pkt);
		}
	}


	/**
	 * Ask server to update status
	 *
	 * @param {number} id
	 * @param {number} amount
	 */
	function OnRequestStatUpdate(id, amount)
	{
		var pkt = new PACKET.CZ.STATUS_CHANGE();
		pkt.statusID     = id;
		pkt.changeAmount = amount;

		Network.sendPacket(pkt);
	}


	/**
	 * Drop item to the floor
	 *
	 * @param {number} index in inventory
	 * @param {number} count to drop
	 */
	function OnDropItem( index, count )
	{
		if( count ) {
			var pkt   = new PACKET.CZ.ITEM_THROW();
			pkt.Index = index;
			pkt.count = count;
			Network.sendPacket(pkt);
		}
	}


	/**
	 * Use an item
	 *
	 * @param {number} item's index
	 */
	function OnUseItem( index )
	{
		var pkt   = new PACKET.CZ.USE_ITEM();
		pkt.index = index;
		pkt.AID   = Session.Entity.GID;
		Network.sendPacket(pkt);
	}


	/**
	 * Equip item
	 *
	 * @param {number} item's index
	 * @param {number} where to equip
	 */
	function OnEquipItem( index, location )
	{
		var pkt          = new PACKET.CZ.REQ_WEAR_EQUIP();
		pkt.index        = index;
		pkt.wearLocation = location;
		Network.sendPacket(pkt);
	}


	/**
	 * Take off an equip
	 *
	 * @param {number} index to unequip
	 */
	function OnUnEquip( index )
	{
		var pkt = new PACKET.CZ.REQ_TAKEOFF_EQUIP();
		pkt.index = index;
		Network.sendPacket(pkt);
	}


	/**
	 * Update config
	 *
	 * @param {number} config id (only type:0 is supported - equip)
	 * @param {number} val
	 */
	function OnConfigUpdate( type, val )
	{
		var pkt = new PACKET.CZ.CONFIG();
		pkt.Config = type;
		pkt.Value = val;
		Network.sendPacket(pkt);
	}


	/**
	 * Go back from map-server to char-server
	 */
	function OnRestart()
	{
		require('Engine/CharEngine').reload();
	};



	/**
	 * Export
	 */
	return new function MapEngine(){
		this.init        = Init;
		this.onMouseUp   = OnMouseUp;
		this.onMouseDown = OnMouseDown;
		this.onDropItem  = OnDropItem;

		require('Controls/MapControl').call(this);
	};
});