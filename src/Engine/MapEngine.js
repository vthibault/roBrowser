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
	var Events           = require('Core/Events');
	var Session          = require('Engine/SessionStorage');
	var Network          = require('Network/NetworkManager');
	var PACKET           = require('Network/PacketStructure');
	var Renderer         = require('Renderer/Renderer');
	var Camera           = require('Renderer/Camera');
	var MapRenderer      = require('Renderer/MapRenderer');
	var EntityManager    = require('Renderer/EntityManager');
	var Entity           = require('Renderer/Entity/Entity');
	var Altitude         = require('Renderer/Map/Altitude');
	var MapControl       = require('Controls/MapControl');
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
	var Emoticons        = require('UI/Components/Emoticons/Emoticons');
	var SkillList        = require('UI/Components/SkillList/SkillList');
	var PartyFriends     = require('UI/Components/PartyFriends/PartyFriends');
	var Guild            = require('UI/Components/Guild/Guild');


	/**
	 * @var {string mapname}
	 */
	var _mapName = '';


	/**
	 * @var {boolean} is initialized
	 */
	var _isInitialised = false;


	/**
	 * @namespace MapEngine
	 */
	var MapEngine = {};


	/**
	 * Connect to Map Server
	 *
	 * @param {number} IP
	 * @param {number} port
	 * @param {string} mapName
	 */
	MapEngine.init = function init( ip, port, mapName )
	{
		_mapName = mapName;

		// Connect to char server
		Network.connect( Network.utils.longToIP( ip ), port, function onconnect( success ) {

			// Force reloading map
			MapRenderer.currentMap = '';

			// Fail to connect...
			if (!success) {
				UIManager.showErrorBox( DB.getMessage(1) );
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
			var startTick = Date.now();
			Network.setPing(function(){
				ping.clientTime = Date.now() - startTick;
				Network.sendPacket(ping);
			});
		}, true);

		// Do not hook multiple time
		if (_isInitialised) {
			return;
		}

		_isInitialised = true;

		MapControl.init();
		MapControl.onRequestWalk     = onRequestWalk;
		MapControl.onRequestStopWalk = onRequestStopWalk;
		MapControl.onRequestDropItem = onDropItem;


		// Hook packets
		Network.hookPacket( PACKET.ZC.AID,                 onReceiveAccountID );
		Network.hookPacket( PACKET.ZC.ACCEPT_ENTER,        onConnectionAccepted );
		Network.hookPacket( PACKET.ZC.ACCEPT_ENTER2,       onConnectionAccepted );
		Network.hookPacket( PACKET.ZC.ACCEPT_ENTER3,       onConnectionAccepted );
		Network.hookPacket( PACKET.ZC.NPCACK_MAPMOVE,      onMapChange );
		Network.hookPacket( PACKET.ZC.NPCACK_SERVERMOVE,   onServerChange );
		Network.hookPacket( PACKET.ZC.ACCEPT_QUIT,         onExitSuccess );
		Network.hookPacket( PACKET.ZC.REFUSE_QUIT,         onExitFail );
		Network.hookPacket( PACKET.ZC.RESTART_ACK,         onRestartAnswer );
		Network.hookPacket( PACKET.ZC.ACK_REQ_DISCONNECT,  onDisconnectAnswer );
		Network.hookPacket( PACKET.ZC.NOTIFY_TIME,         onPong );

		// Extend controller
		require('./MapEngine/Main').call();
		require('./MapEngine/NPC').call();
		require('./MapEngine/Entity').call();
		require('./MapEngine/Item').call();
		require('./MapEngine/PrivateMessage').call();
		require('./MapEngine/Storage').call();
		require('./MapEngine/Group').init();
		require('./MapEngine/Guild').init();
		require('./MapEngine/Skill').call();
		require('./MapEngine/ChatRoom').call();
		require('./MapEngine/Pet').call();
		require('./MapEngine/Store').call();
		require('./MapEngine/Trade').call();
		require('./MapEngine/Friends').init();

		// Prepare UI
		MiniMap.prepare();
		Escape.prepare();
		Inventory.prepare();
		Equipment.prepare();
		ShortCut.prepare();
		ChatRoomCreate.prepare();
		Emoticons.prepare();
		SkillList.prepare();
		PartyFriends.prepare();
		StatusIcons.prepare();
		BasicInfo.prepare();
		ChatBox.prepare();
		Guild.prepare();

		// Bind UI
		WinStats.onRequestUpdate        = onRequestStatUpdate;
		Equipment.onUnEquip             = onUnEquip;
		Equipment.onConfigUpdate        = onConfigUpdate;
		Equipment.onEquipItem           = onEquipItem;
		Equipment.onRemoveOption        = onRemoveOption;
		Inventory.onUseItem             = onUseItem;
		Inventory.onEquipItem           = onEquipItem;
		Escape.onExitRequest            = onExitRequest;
		Escape.onCharSelectionRequest   = onRestartRequest;
		Escape.onReturnSavePointRequest = onReturnSavePointRequest;
		Escape.onResurectionRequest     = onResurectionRequest;
		ChatBox.onRequestTalk           = onRequestTalk;
	};


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

		if ('sex' in pkt && pkt.sex < 2) {
			Session.Entity.sex = pkt.sex;
		}

		// Reset
		Session.petId         =     0;
		Session.hasParty      = false;
		Session.isPartyLeader = false;
		Session.hasGuild      = false;
		Session.guildRight    =     0;

		BasicInfo.update('blvl', Session.Character.level );
		BasicInfo.update('jlvl', Session.Character.joblevel );
		BasicInfo.update('zeny', Session.Character.money );
		BasicInfo.update('name', Session.Character.name );
		BasicInfo.update('job',  Session.Character.job );

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
			Emoticons.append();
			SkillList.append();
			PartyFriends.append();
			Guild.append();

			// Map loaded
			Network.sendPacket(
				new PACKET.CZ.NOTIFY_ACTORINIT()
			);
		};

		MapRenderer.setMap( pkt.mapName );
	}


	/**
	 * Change zone server
	 *
	 * @param {object} pkt - PACKET.ZC.NPCACK_SERVERMOVE
	 */
	function onServerChange( pkt )
	{
		jQuery(window).off('keydown.map');
		MapEngine.init( pkt.addr.ip, pkt.addr.port, pkt.mapName );
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
		ChatBox.addText( DB.getMessage(502), ChatBox.TYPE.ERROR);
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
			ChatBox.addText( DB.getMessage(502), ChatBox.TYPE.ERROR );
		}
		else {
			StatusIcons.clean();
			ChatBox.clean();
			ShortCut.clean();
			PartyFriends.clean();
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
				StatusIcons.clean();
				ChatBox.clean();
				ShortCut.clean();
				PartyFriends.clean();
				Renderer.stop();
				onExitSuccess();
				break;

			case 1:
				// Have to wait 10 sec
				ChatBox.addText( DB.getMessage(502), ChatBox.TYPE.ERROR);
				break;

			default:
		}
	}


	/**
	 * ChatBox talk
	 *
	 * @param {string} user
	 * @param {string} text
	 * @param {number} target
	 */
	function onRequestTalk( user, text, target )
	{
		var pkt;
		var flag_party = text[0] === '%' || KEYS.CTRL;
		var flag_guild = text[0] === '$' || KEYS.ALT;

		text = text.replace(/^(\$|\%)/, '');

		// Private messages
		if (user.length) {
			pkt          = new PACKET.CZ.WHISPER();
			pkt.receiver = user;
			pkt.msg      = text;
			Network.sendPacket(pkt);
			return;
		}

		// Set off/on flags
		if (flag_party) {
			target = (target & ~ChatBox.TYPE.PARTY) | (~target & ChatBox.TYPE.PARTY);
		}

		if (flag_guild) {
			target = (target & ~ChatBox.TYPE.GUILD) | (~target & ChatBox.TYPE.GUILD);
		}

		// Get packet
		if (target & ChatBox.TYPE.PARTY) {
			pkt = new PACKET.CZ.REQUEST_CHAT_PARTY();
		}
		else if (target & ChatBox.TYPE.GUILD) {
			pkt = new PACKET.CZ.GUILD_CHAT();
		}
		else {
			pkt = new PACKET.CZ.REQUEST_CHAT();
		}

		// send packet
		pkt.msg = Session.Entity.display.name + ' : ' + text;
		Network.sendPacket(pkt);
	}


	/**
	 * Remove cart/peco/falcon
	 */
	function onRemoveOption()
	{
		var pkt = new PACKET.CZ.REQ_CARTOFF();
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
	function onRequestWalk()
	{
		Events.clearTimeout(_walkTimer);

		// If siting, update direction
		if (Session.Entity.action === Session.Entity.ACTION.SIT /*|| KEYS.SHIFT see: http://forum.robrowser.com/index.php?topic=32240#msg32446 */) {
			Session.Entity.lookTo( Mouse.world.x, Mouse.world.y );

			var pkt     = new PACKET.CZ.CHANGE_DIRECTION();
			pkt.headDir = Session.Entity.headDir;
			pkt.dir     = Session.Entity.direction;
			Network.sendPacket(pkt);
			return;
		}

		walkIntervalProcess();
	}


	/**
	 * Stop moving
	 */
	function onRequestStopWalk()
	{
		Events.clearTimeout(_walkTimer);
	}


	/**
	 * Moving function
	 */
	function walkIntervalProcess()
	{
		// setTimeout isn't accurate, so reduce the value
		// to avoid possible errors.
		if (_walkLastTick + 450 > Renderer.tick) {
			return;
		}

		var isWalkable   = (Mouse.world.x > -1 && Mouse.world.y > -1);
		var isCurrentPos = (Math.round(Session.Entity.position[0]) === Mouse.world.x &&
		                    Math.round(Session.Entity.position[1]) === Mouse.world.y);

		if (isWalkable && !isCurrentPos) {
			var pkt = new PACKET.CZ.REQUEST_MOVE();

			if (!checkFreeCell(Mouse.world.x, Mouse.world.y, 1, pkt.dest)) {
				pkt.dest[0] = Mouse.world.x;
				pkt.dest[1] = Mouse.world.y;
			}

			Network.sendPacket(pkt);
		}

		Events.clearTimeout(_walkTimer);
		_walkTimer    =  Events.setTimeout( walkIntervalProcess, 500);
		_walkLastTick = +Renderer.tick;
	}


	/**
	 * Search free cells around a position
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} range
	 * @param {array} out
	 */
	function checkFreeCell(x, y, range, out)
	{
		var _x, _y, r;
		var d_x = Session.Entity.position[0] < x ? -1 : 1;
		var d_y = Session.Entity.position[1] < y ? -1 : 1;

		// Search possible positions
		for (r = 0; r <= range; ++r) {
			for (_x = -r; _x <= r; ++_x) {
				for (_y = -r; _y <= r; ++_y) {
					if (isFreeCell(x + _x * d_x, y + _y * d_y)) {
						out[0] = x + _x * d_x;
						out[1] = y + _y * d_y;
						return true;
					}
				}
			}
		}

		return false;
	}


	/**
	 * Does a cell is free (walkable, and no entity on)
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {returns} is free
	 */
	function isFreeCell(x, y)
	{
		if (!(Altitude.getCellType(x, y) & Altitude.TYPE.WALKABLE)) {
			return false;
		}

		var free = true;

		EntityManager.forEach(function(entity){
			if (Math.round(entity.position[0]) === x &&
			    Math.round(entity.position[1]) === y) {
				free = false;
				return false;
			}

			return true;
		});

		return free;
	}


	/**
	 * If the character moved to attack, once it finished to move ask to attack
	 */
	function onWalkEnd()
	{
		// No action to do ?
		if (Session.moveAction) {
			// Not sure why, but there is a synchronization error with the
			// server when moving to attack (wrong position).
			// So wait 50ms to be sure we are at the correct position before
			// performing an action
			Events.setTimeout(function(){
				if (Session.moveAction) {
					Network.sendPacket(Session.moveAction);
					Session.moveAction = null;
				}
			}, 50);
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
	return MapEngine;
});