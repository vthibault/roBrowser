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
	'use strict';


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
	var Mouse            = require('Controls/MouseEventHandler');
	var KEYS             = require('Controls/KeyEventHandler');
	var UIManager        = require('UI/UIManager');
	var Background       = require('UI/Background');
	var Escape           = require('UI/Components/Escape/Escape');
	var ChatBox          = require('UI/Components/ChatBox/ChatBox');
	var MiniMap          = require('UI/Components/MiniMap/MiniMap');
	var BasicInfo        = require('UI/Components/BasicInfo/BasicInfo');
	var WinStats         = require('UI/Components/WinStats/WinStats');
	var Inventory        = require('UI/Components/Inventory/Inventory');
	var ShortCut         = require('UI/Components/ShortCut/ShortCut');
	var Equipment        = require('UI/Components/Equipment/Equipment');
	var StatusIcons      = require('UI/Components/StatusIcons/StatusIcons');
	var ChatRoomCreate   = require('UI/Components/ChatRoomCreate/ChatRoomCreate');
	var SkillList        = require('UI/Components/SkillList/SkillList');


	/**
	 * @var {string mapname}
	 */
	var _mapName = '';


	/**
	 * Connect to Map Server
	 *
	 * @param {number} IP
	 * @param {number} port
	 * @param {number} Character ID
	 * @param {string} mapName
	 */
	function init( ip, port, mapName, initHooksAndExtends )
	{
		_mapName = mapName;

		// Connect to char server
		Network.connect( Network.utils.longToIP( ip ), port, function( success ){

			// Force reloading map
			MapRenderer.currentMap = '';

			// Fail to connect...
			if (!success) {
				UIManager.showErrorBox( DB.msgstringtable[1] );
				return;
			}

			// Success, try to login.
			var pkt        = new PACKET.CZ.ENTER();
			pkt.AID        = Session.AID;
			pkt.GID        = Session.GID;
			pkt.AuthCode   = Session.AuthCode;
			pkt.clientTime = Date.now();
			pkt.Sex        = Session.Sex;
			Network.sendPacket(pkt);

			// Server send back AID
			Network.read(function(fp){
				// if PACKETVER < 20070521, client send GID...
				if (fp.length === 4) {
					Session.Character.GID = fp.readLong();
				}
			});

			// Ping
			var ping = new PACKET.CZ.REQUEST_TIME();
			Network.setPing(function(){
				ping.clientTime = Date.now();
				Network.sendPacket(ping);
			});
		}, true);

		if (initHooksAndExtends) {
			// Hook packets
			Network.hookPacket( PACKET.ZC.AID,                 onReceiveAccountID );
			Network.hookPacket( PACKET.ZC.ACCEPT_ENTER,        onConnectionAccepted );
			Network.hookPacket( PACKET.ZC.ACCEPT_ENTER2,       onConnectionAccepted );
			Network.hookPacket( PACKET.ZC.NPCACK_MAPMOVE,      onMapChange );
			Network.hookPacket( PACKET.ZC.NPCACK_SERVERMOVE,   onServerChange );
			Network.hookPacket( PACKET.ZC.ACCEPT_QUIT,         onExitSuccess );
			Network.hookPacket( PACKET.ZC.REFUSE_QUIT,         onExitFail );
			Network.hookPacket( PACKET.ZC.RESTART_ACK,         onRestartAnswer );
			Network.hookPacket( PACKET.ZC.ACK_REQ_DISCONNECT,  onDisconnectAnswer );
			Network.hookPacket( PACKET.ZC.NOTIFY_TIME,         onPong );
			Network.hookPacket( PACKET.ZC.NOTIFY_TIME,         onPong );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH01,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH02,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH03,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH04,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH05,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH06,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH07,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH08,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH09,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH10,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH11,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH12,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH13,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH14,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH15,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH16,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH17,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH18,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH19,   onReassemblyAuth );			
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH20,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH21,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH22,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH23,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH24,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH25,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH26,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH27,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH28,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH29,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH30,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH31,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH32,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH33,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH34,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH35,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH36,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH37,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH38,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH39,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH40,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH41,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH42,   onReassemblyAuth );			
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH43,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH44,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH45,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH46,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH47,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH48,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH49,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH50,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH51,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH52,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH53,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH54,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH55,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH56,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH57,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH58,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH59,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH60,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH61,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH62,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH63,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH64,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH65,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH66,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH67,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH68,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH69,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH70,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH71,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH72,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH73,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH74,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH75,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH76,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH77,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH78,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH79,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH80,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH81,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH82,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH83,   onReassemblyAuth );
			Network.hookPacket( PACKET.ZC.REASSEMBLY_AUTH84,   onReassemblyAuth );


			// Extend controller
			require('./MapEngine/Main').call();
			require('./MapEngine/NPC').call();
			require('./MapEngine/Entity').call();
			require('./MapEngine/Item').call();
			require('./MapEngine/PrivateMessage').call();
			require('./MapEngine/Storage').call();
			require('./MapEngine/Group').call();
			require('./MapEngine/Guild').call();
			require('./MapEngine/Skill').call();
			require('./MapEngine/ChatRoom').call();
			require('./MapEngine/Pet').call();
		}
	}


	/**
	 * Pong from server
	 * TODO: check the time ?
	 */
	function onPong( pkt )
	{
		//pkt.time
	}


	/**
	 * Server update our account id
	 *
	 * @param {object} pkt - PACKET.ZC.AID
	 */
	function onReceiveAccountID( pkt )
	{
		Session.Character.GID = pkt.AID;
	}


	/**
	 * Map accept us to enter the map
	 *
	 * @param {object} pkt - PACKET.ZC.ACCEPT_ENTER
	 */
	function onConnectionAccepted( pkt )
	{
		Session.Entity = new Entity( Session.Character );
		Session.Entity.onWalkEnd = onWalkEnd;

		BasicInfo.update('blvl', Session.Character.level );
		BasicInfo.update('jlvl', Session.Character.joblevel );
		BasicInfo.update('zeny', Session.Character.money );
		BasicInfo.update('name', Session.Character.name );
		BasicInfo.update('job',  Session.Character.job );

		// Bind UI
		WinStats.onRequestUpdate        = onRequestStatUpdate;
		Equipment.onUnEquip             = onUnEquip;
		Equipment.onConfigUpdate        = onConfigUpdate;
		Equipment.onEquipItem           = onEquipItem;
		Inventory.onSetItemFavorite     = onSetItemFavorite;
		Inventory.onUseItem             = onUseItem;
		Inventory.onEquipItem           = onEquipItem;
		Escape.onExitRequest            = onExitRequest;
		Escape.onCharSelectionRequest   = onRestartRequest;
		Escape.onReturnSavePointRequest = onReturnSavePointRequest;
		Escape.onResurectionRequest     = onResurectionRequest;
		ChatBox.onRequestTalk           = onRequestTalk;

		// Fix http://forum.robrowser.com/?topic=32177.0
		onMapChange({
			xPos:    pkt.PosDir[0],
			yPos:    pkt.PosDir[1],
			mapName: _mapName
		});
	}


	/**
	 * Changing map, loading new map
	 *
	 * @param {object} pkt - PACKET.ZC.NPCACK_MAPMOVE
	 */
	function onMapChange( pkt )
	{
		jQuery(window).off('keydown.map');

		MapRenderer.onLoad = function(){

			// TODO: find a better place to put it
			jQuery(window).on('keydown.map', function( event ){
				if (event.which === KEYS.INSERT) {
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
			ShortCut.append();
			ChatRoomCreate.append();
			SkillList.append();

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
	function onServerChange( pkt )
	{
		jQuery(window).off('keydown.map');		
		init( pkt.addr.ip, pkt.addr.port, pkt.mapName, false );
	}


	/**
	 * Ask the server to disconnect
	 */
	function onExitRequest()
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
	function onExitFail( pkt )
	{
		ChatBox.addText( DB.msgstringtable[502], ChatBox.TYPE.ERROR);
	}


	/**
	 * Server accept to disconnect us
	 *
	 * @param {object} pkt - PACKET.ZC.REFUSE_QUIT
	 */
	function onExitSuccess()
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
	function onRestartRequest()
	{
		var pkt = new PACKET.CZ.RESTART();
		pkt.type = 1;
		Network.sendPacket(pkt);
	}


	/**
	 * Go back to save point request
	 */
	function onReturnSavePointRequest()
	{
		var pkt = new PACKET.CZ.RESTART();
		pkt.type = 0;
		Network.sendPacket(pkt);
	}


	/**
	 * Resurection feature
	 */
	function onResurectionRequest()
	{
		var pkt = new PACKET.CZ.STANDING_RESURRECTION();
		Network.sendPacket(pkt);
	}


	/**
	 * Does the server want you to return to char-server ?
	 *
	 * @param {object} pkt - PACKET.ZC.RESTART_ACK
	 */
	function onRestartAnswer( pkt )
	{
		if (!pkt.type) {
			// Have to wait 10sec
			ChatBox.addText( DB.msgstringtable[502], ChatBox.TYPE.ERROR );
		}
		else {
			StatusIcons.clean();
			ChatBox.clean();
			ShortCut.clean();
			MapRenderer.free();
			Renderer.stop();
			onRestart();
		}
	}


	/**
	 * Response from server to disconnect
	 * @param pkt - {object}
	 */
	function onDisconnectAnswer( pkt )
	{
		switch (pkt.result) {
			// Disconnect
			case 0:
				ChatBox.clean();
				Renderer.stop();
				onExitSuccess();
				break;

			case 1:
				// Have to wait 10 sec
				ChatBox.addText( DB.msgstringtable[502], ChatBox.TYPE.ERROR);
				break;

			default:
		}
	}


	/**
	 * ChatBox talk
	 *
	 * @param {string} user
	 * @param {string} text
	 */
	function onRequestTalk( user, text )
	{
		var pkt;

		if (user.length) {
			pkt          = new PACKET.CZ.WHISPER();
			pkt.receiver = user;
			pkt.msg      = text;
		}
		else if (text[0] === '%') {
			pkt     = new PACKET.CZ.REQUEST_CHAT_PARTY();
			pkt.msg = Session.Entity.display.name + ' : ' + text.substr(1);
		}
		else if (text[0] === '$') {
			pkt     = new PACKET.CZ.GUILD_CHAT();
			pkt.msg = Session.Entity.display.name + ' : ' + text.substr(1);
		}
		else {
			pkt     = new PACKET.CZ.REQUEST_CHAT();
			pkt.msg = Session.Entity.display.name + ' : ' + text;
		}

		Network.sendPacket(pkt);
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
	function onMouseDown()
	{
		clearTimeout(_walkTimer);

		// If siting, update direction
		if (Session.Entity.action === Session.Entity.ACTION.SIT || KEYS.SHIFT) {
			Session.Entity.lookTo( Mouse.world.x, Mouse.world.y );

			var pkt     = new PACKET.CZ.CHANGE_DIRECTION();
			pkt.headDir = Session.Entity.headDir;
			pkt.dir     = Session.Entity.direction;
			Network.sendPacket(pkt);
			return;
		}

		onWalkRequest();
	}


	/**
	 * Stop moving
	 */
	function onMouseUp()
	{
		clearTimeout(_walkTimer);
	}


	/**
	 * Moving function
	 */
	function onWalkRequest()
	{
		// setTimeout isn't accurate, so reduce the value
		// to avoid possible errors.
		if (_walkLastTick + 450 > Renderer.tick) {
			return;
		}

		if (Mouse.world.x > -1 && Mouse.world.y > -1) {
			var pkt = new PACKET.CZ.REQUEST_MOVE();
			pkt.dest[0] = Mouse.world.x;
			pkt.dest[1] = Mouse.world.y;
			Network.sendPacket(pkt);
		}

		clearTimeout(_walkTimer);
		_walkTimer    =  setTimeout( onWalkRequest, 500);
		_walkLastTick = +Renderer.tick;
	}


	/**
	 * If the character moved to attack, once it finished to move ask to attack
	 */
	function onWalkEnd()
	{
		// No action to do ?
		if (!Session.moveTarget) {
			return;
		}

		var pkt, entity = Session.moveTarget;

		Session.moveTarget = null;

		// Not in scene anymore.
		if (!EntityManager.get(entity.GID)) {
			return;
		}

		switch (entity.objecttype) {
			case Entity.TYPE_MOB:
			case Entity.TYPE_PC:
				entity.onFocus();
				break;

			case Entity.TYPE_ITEM:
				pkt       = new PACKET.CZ.ITEM_PICKUP();
				pkt.ITAID = entity.GID;
				Network.sendPacket(pkt);
				break;
		}
	}


	/**
	 * Ask server to update status
	 *
	 * @param {number} id
	 * @param {number} amount
	 */
	function onRequestStatUpdate(id, amount)
	{
		var pkt          = new PACKET.CZ.STATUS_CHANGE();
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
	function onDropItem( index, count )
	{
		if (count) {
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
	function onUseItem( index )
	{
		var pkt   = new PACKET.CZ.USE_ITEM();
		pkt.index = index;
		pkt.AID   = Session.Entity.GID;
		Network.sendPacket(pkt);
	}


	/**
	 * Use an item
	 *
	 * @param {number} item's index
	 */
	function onSetItemFavorite( index, normalOrPrivate )
	{
		var pkt          = new PACKET.CZ.INVENTORY_TAB();
		pkt.index        = index;
		pkt.normalOrPrivate = normalOrPrivate;
		Network.sendPacket(pkt);
	}


	/**
	 * Equip item
	 *
	 * @param {number} item's index
	 * @param {number} where to equip
	 */
	function onEquipItem( index, location )
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
	function onUnEquip( index )
	{
		var pkt   = new PACKET.CZ.REQ_TAKEOFF_EQUIP();
		pkt.index = index;
		Network.sendPacket(pkt);
	}
	
	/**
	 * Reassembly Auth
	 */
	function onReassemblyAuth( pktIn )
	{
		var pkt = null;
		switch (parseInt(pktIn.constructor.id)) {
			case 0x85a:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH01();
			break;
			case 0x85b:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH02();
			break;
			case 0x85c:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH03();
			break;
			case 0x85d:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH04();
			break;
			case 0x85e:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH05();
			break;
			case 0x85f:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH06();
			break;
			case 0x860:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH07();
			break;
			case 0x861:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH08();
			break;
			case 0x862:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH09();
			break;
			case 0x863:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH10();
			break;
			case 0x864:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH11();
			break;
			case 0x865:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH12();
			break;
			case 0x866:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH13();
			break;
			case 0x867:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH14();
			break;
			case 0x868:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH15();
			break;
			case 0x869:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH16();
			break;
			case 0x86a:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH17();
			break;
			case 0x86b:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH18();
			break;
			case 0x86c:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH19();
			break;
			case 0x86d:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH20();
			break;
			case 0x86e:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH21();
			break;
			case 0x86f:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH22();
			break;
			case 0x870:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH23();
			break;
			case 0x871:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH24();
			break;
			case 0x872:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH25();
			break;
			case 0x873:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH26();
			break;
			case 0x874:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH27();
			break;
			case 0x875:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH28();
			break;
			case 0x876:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH29();
			break;
			case 0x877:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH30();
			break;
			case 0x878:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH31();
			break;
			case 0x879:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH32();
			break;
			case 0x87a:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH33();
			break;
			case 0x87b:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH34();
			break;
			case 0x87c:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH35();
			break;
			case 0x87d:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH36();
			break;
			case 0x87e:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH37();
			break;
			case 0x87f:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH38();
			break;
			case 0x880:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH39();
			break;
			case 0x881:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH40();
			break;
			case 0x882:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH41();
			break;
			case 0x883:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH42();
			break;
			case 0x917:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH43();
			break;
			case 0x918:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH44();
			break;
			case 0x919:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH45();
			break;
			case 0x91a:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH46();
			break;
			case 0x91b:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH47();
			break;
			case 0x91c:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH48();
			break;
			case 0x91d:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH49();
			break;
			case 0x91e:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH50();
			break;
			case 0x91f:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH51();
			break;
			case 0x920:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH52();
			break;
			case 0x921:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH53();
			break;
			case 0x922:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH54();
			break;
			case 0x923:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH55();
			break;
			case 0x924:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH56();
			break;
			case 0x925:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH57();
			break;
			case 0x926:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH58();
			break;
			case 0x927:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH59();
			break;
			case 0x928:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH60();
			break;
			case 0x929:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH61();
			break;
			case 0x92a:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH62();
			break;
			case 0x92b:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH63();
			break;
			case 0x92c:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH64();
			break;
			case 0x92d:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH65();
			break;
			case 0x92e:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH66();
			break;
			case 0x92f:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH67();
			break;
			case 0x930:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH68();
			break;
			case 0x931:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH69();
			break;
			case 0x932:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH70();
			break;
			case 0x933:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH71();
			break;
			case 0x934:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH72();
			break;
			case 0x935:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH73();
			break;
			case 0x936:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH74();
			break;
			case 0x937:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH75();
			break;
			case 0x938:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH76();
			break;
			case 0x939:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH77();
			break;
			case 0x93a:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH78();
			break;
			case 0x93b:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH79();
			break;
			case 0x93c:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH80();
			break;
			case 0x93d:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH81();
			break;
			case 0x93e:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH82();
			break;
			case 0x93f:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH83();
			break;
			case 0x940:
				pkt = new PACKET.CZ.REASSEMBLY_AUTH84();
			break;
		}
		
		if (pkt !== null) {
			Network.sendPacket(pkt);
		}
	}


	/**
	 * Update config
	 *
	 * @param {number} config id (only type:0 is supported - equip)
	 * @param {number} val
	 */
	function onConfigUpdate( type, val )
	{
		var pkt    = new PACKET.CZ.CONFIG();
		pkt.Config = type;
		pkt.Value  = val;
		Network.sendPacket(pkt);
	}


	/**
	 * Go back from map-server to char-server
	 */
	function onRestart()
	{
		require('Engine/CharEngine').reload();
	}


	/**
	 * Export
	 */
	return new function MapEngine(){
		this.init        = init;
		this.onMouseUp   = onMouseUp;
		this.onMouseDown = onMouseDown;
		this.onDropItem  = onDropItem;

		require('Controls/MapControl').call(this);
	}();
});