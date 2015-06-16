/**
 * controls/EntityControl.js
 *
 * Entity class
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function( require )
{
	'use strict';


	// Load dependencies
	var glMatrix    = require('utils/gl-matrix');
	var PathFinding = require('utils/PathFinding');
	var DB          = require('db/DBManager');
	var KEYS        = require('controls/KeyEventHandler');
	var Mouse       = require('controls/MouseEventHandler');
	var Preferences = require('preferences/Controls');
	var Camera      = require('renderer/Camera');
	var Session     = require('engine/SessionStorage');
	var Friends     = require('engine/Mapengine/Friends');
	var PACKET      = require('network/packets/structureTable');
	var Network     = require('network/networkManager');
	var Cursor      = require('UI/CursorManager');
	var InputBox    = require('UI/Components/InputBox/InputBox');
	var ChatRoom    = require('UI/Components/ChatRoom/ChatRoom');
	var ContextMenu = require('UI/Components/ContextMenu/ContextMenu');
	var Pet         = require('UI/Components/PetInformations/PetInformations');
	var Trade       = require('UI/Components/Trade/Trade');
	var getModule   = require;


	/**
	 * Import
	 */
	var mat4    = glMatrix.mat4;
	var vec2    = glMatrix.vec2;
	var _matrix = mat4.create();


	/*
	 * When mouse is over
	 */
	function onMouseOver()
	{
		var Entity = this.constructor;

		switch (this.objecttype) {
			case Entity.Type.PET:
				if (!Camera.action.active) {
					Cursor.setType( Cursor.ACTION.DEFAULT );
				}
				break;

			case Entity.Type.PC:
			case Entity.Type.ELEM:
			case Entity.Type.HOM:
				// TODO: Check for pvp flag ?
				if ((KEYS.SHIFT === false && Preferences.noshift === false) || this === Session.Entity)  {
					if (!Camera.action.active ) {
						Cursor.setType( Cursor.ACTION.DEFAULT );
					}
					break;
				}

				Cursor.setType( Cursor.ACTION.ATTACK );
				break;

			case Entity.Type.MOB:
				Cursor.setType( Cursor.ACTION.ATTACK );
				break;

			case Entity.Type.NPC:
				Cursor.setType( Cursor.ACTION.TALK, true );
				break;

			case Entity.Type.WARP:
				Cursor.setType( Cursor.ACTION.WARP );
				return;

			case Entity.Type.ITEM:
				Cursor.setType( Cursor.ACTION.PICK, true, 0 );
				break;
		}


		switch (this.display.load) {

			// Ask for the name
			case this.display.Type.NONE:
				this.display.load = this.display.Type.LOADING;

				var pkt = new PACKET.CZ.REQNAME();
				pkt.AID = this.GID;
				Network.sendPacket(pkt);
				break;

			// Nothing yet
			case this.display.Type.LOADING:
				break;

			// Display the name
			case this.display.Type.COMPLETE:
				mat4.multiply( _matrix, Camera.projection, this.matrix );
				this.display.render(_matrix);
				this.display.add();
				break;
		}
	}


	/**
	 * When mouse is not over yet
	 */
	function onMouseOut()
	{
		if (!Camera.action.active) {
			Cursor.setType( Cursor.ACTION.DEFAULT );
		}
		else {
			Cursor.setType( Cursor.ACTION.ROTATE );
		}

		if (this !== this.constructor.Manager.getFocusEntity()) {
			this.display.display = false;
			this.display.remove();
		}
	}
	

	/**
	 * When clicking on an Entity
	 *
	 */
	function onMouseDown()
	{
		var Entity = this.constructor;
		var pkt;

		switch (this.objecttype) {
			case Entity.Type.PET:
				break;

			case Entity.Type.ITEM:
				Cursor.setType( Cursor.ACTION.PICK, true, 2 );

				pkt       = new PACKET.CZ.ITEM_PICKUP();
				pkt.ITAID = this.GID;

				// Too far, walking to it
				if (vec2.distance(Session.Entity.position, this.position) > 2) {
					Session.moveAction = pkt;

					pkt         = new PACKET.CZ.REQUEST_MOVE();
					pkt.dest[0] = Mouse.world.x;
					pkt.dest[1] = Mouse.world.y;
					Network.sendPacket(pkt);

					return true;
				}

				Network.sendPacket(pkt);
				Session.Entity.lookTo( this.position[0], this.position[1] );
				return true;

			case Entity.Type.NPC:
				pkt      = new PACKET.CZ.CONTACTNPC();
				pkt.NAID = this.GID;
				pkt.type = 1; // 1 for NPC in Aegis
				Network.sendPacket(pkt);

				// Updare look
				Session.Entity.lookTo( this.position[0], this.position[1] );
				pkt = new PACKET.CZ.CHANGE_DIRECTION();
				pkt.headDir = Session.Entity.headDir;
				pkt.dir     = Session.Entity.direction;
				Network.sendPacket(pkt);
				return true;

			case Entity.Type.WARP:
				pkt         = new PACKET.CZ.REQUEST_MOVE();
				pkt.dest[0] = this.position[0];
				pkt.dest[1] = this.position[1];
				Network.sendPacket(pkt);
				break;
		}

		return false;
	}


	/**
	 * Stop clicking on an entity
	 */
	function onMouseUp()
	{
	}


	/**
	 * When clicking on an Entity
	 *
	 */
	function onContextMenu()
	{
		var Entity = this.constructor;
		var entity = this;

		switch (this.objecttype) {
			case Entity.Type.PET:
				if (Session.petId === this.GID) {
					ContextMenu.remove();
					ContextMenu.append();
					ContextMenu.addElement( DB.getMessage(596), Pet.ui.show.bind(Pet.ui)); // check pet status
					ContextMenu.addElement( DB.getMessage(592), Pet.reqPetFeed);           // Feed pet
					ContextMenu.addElement( DB.getMessage(593), Pet.reqPetAction);         // performance
					ContextMenu.addElement( DB.getMessage(595), Pet.reqUnEquipPet);        // unequip accessory
					ContextMenu.addElement( DB.getMessage(594), Pet.reqBackToEgg);         // return to egg shell
				}
				break;

			case Entity.Type.PC:
				/// TODO: complete it : 
				/// - check for admin action (kick, mute, ...)

				ContextMenu.remove();
				ContextMenu.append();
				//ContextMenu.addElement( DB.getMessage(1362), checkPlayerEquipment);

				// Trade option
				ContextMenu.addElement( DB.getMessage(87).replace('%s', this.display.name), function(){
					Trade.reqExchange(entity.GID, entity.display.name);
				});


				// Guild features
				if (Session.hasGuild) {
					if (Session.guildRight & 0x01 && !this.GUID) {
						// Send (%s) a Guild invitation
						ContextMenu.addElement( DB.getMessage(382).replace('%s', this.display.name), function(){
							getModule('engine/Mapengine/Guild').requestPlayerInvitation(entity.GID);
						});
					}

					if (Session.isGuildMaster && this.GUID && Session.Entity.GUID !== this.GUID) {
						ContextMenu.nextGroup();

						// Set this guild as an Alliance
						ContextMenu.addElement( DB.getMessage(399).replace('%s', this.display.name), function(){
							getModule('engine/Mapengine/Guild').requestAlliance(entity.GID);
						});

						// Set this guild as an Antagonist
						ContextMenu.addElement( DB.getMessage(403).replace('%s', this.display.name), function(){
							getModule('engine/Mapengine/Guild').requestHostility(entity.GID);
						});
					}
				}

				//ContextMenu.addElement( DB.getMessage(360), openPrivateMessageWindow);

				if (!Friends.isFriend(this.display.name)) {
					ContextMenu.nextGroup();
					ContextMenu.addElement( DB.getMessage(358), function(){
						Friends.addFriend(entity.display.name);
					});
				}

				if (Session.hasParty && Session.isPartyLeader) {
					ContextMenu.nextGroup();
					ContextMenu.addElement( DB.getMessage(88).replace('%s', this.display.name), function(){
						getModule('engine/Mapengine/Group').onRequestInvitation(entity.GID, entity.display.name);
					});
				}

				//ContextMenu.nextGroup();
				//ContextMenu.addElement( DB.getMessage(315), blockUserPrivateMessage);
				break;

			case Entity.Type.HOM:
				break;
		}

		return false;
	}


	/**
	 * Focus the entity
	 */
	function onFocus()
	{
		var Entity = this.constructor;
		var main   = Session.Entity;
		var pkt;

		switch (this.objecttype) {

			case Entity.Type.PC:
			case Entity.Type.ELEM:
			case Entity.Type.HOM:
				// TODO: add check for PVP/WOE mapflag
				if (KEYS.SHIFT === false && Preferences.noshift === false)  {
					if (!Camera.action.active) {
						Cursor.setType( Cursor.ACTION.DEFAULT );
					}
					break;
				}
			// no break intended.

			case Entity.Type.MOB:

				// Start rendering the lock on arrow
				this.attachments.add({
					uid:    'lockon',
					spr:    'data/sprite/cursors.spr',
					act:    'data/sprite/cursors.act',
					frame:   Cursor.ACTION.LOCK,
					repeat:  true,
					depth:   10.0,
				});

				var out   = [];
				var count = PathFinding.search(
					main.position[0] | 0, main.position[1] | 0,
					this.position[0] | 0, this.position[1] | 0,
					main.attackRange + 1,
					out
				);

				// Can't attack
				if (!count) {
					return true;
				}

				pkt           = new PACKET.CZ.REQUEST_ACT();
				pkt.action    = 7;
				pkt.targetGID = this.GID;

				// in range send packet
				if (count < 2) {
					Network.sendPacket(pkt);
					return true;
				}

				// Move to entity
				Session.moveAction = pkt;

				pkt         = new PACKET.CZ.REQUEST_MOVE();
				pkt.dest[0] = out[(count-1)*2 + 0];
				pkt.dest[1] = out[(count-1)*2 + 1];
				Network.sendPacket(pkt);
				return true;
		}

		return false;
	}


	/**
	 * Lost focus on entity
	 */
	function onFocusEnd()
	{
		var Entity = this.constructor;

		switch (this.objecttype) {
			case Entity.Type.PC:
			case Entity.Type.ELEM:
			case Entity.Type.HOM:
			case Entity.Type.MOB:
				if (Entity.Manager.getFocusEntity()) {
					Network.sendPacket(new PACKET.CZ.CANCEL_LOCKON());
				}
		}

		// Stop displaying name
		this.display.display = false;
		this.display.remove();

		// Stop rendering t he lock on arrow
		this.attachments.remove('lockon');
	}


	/**
	 * Open entity room (chat room, shop, ...)
	 */
	function onRoomEnter()
	{
		var pkt;
		var Room = this.room.constructor;

		switch (this.room.type) {

			case Room.Type.SELL_SHOP:
				pkt = new PACKET.CZ.REQ_CLICK_TO_BUYING_STORE();
				pkt.makerAID = this.room.id;
				Network.sendPacket(pkt);
				break;

			case Room.Type.BUY_SHOP:
				pkt = new PACKET.CZ.REQ_BUY_FROMMC();
				pkt.AID = this.room.id;
				Network.sendPacket(pkt);
				break;

			case Room.Type.PUBLIC_CHAT:
				pkt = new PACKET.CZ.REQ_ENTER_ROOM();
				pkt.roomID = this.room.id;
				pkt.passwd = '';
				Network.sendPacket(pkt);
				
				/* Prepare the chat room UI */
				ChatRoom.type  = 1; //public
				ChatRoom.title = this.room.title;
				ChatRoom.limit = this.room.limit;
				ChatRoom.count = this.room.count;
				break;

			case Room.Type.PRIVATE_CHAT:
				pkt = new PACKET.CZ.REQ_ENTER_ROOM();
				pkt.roomID = this.room.id;

				InputBox.append();
				InputBox.setType('pass', false);
				var self = this;
				InputBox.onSubmitRequest = function( pass ) {
					InputBox.remove();
					pkt.passwd = pass;
					Network.sendPacket(pkt);
					
					/* Prepare the chat room UI */
					ChatRoom.type  = 0; //private
					ChatRoom.title = self.room.title;
					ChatRoom.limit = self.room.limit;
					ChatRoom.count = self.room.count;
				};
				return;
		}
	}


	/**
	 * Export
	 */
	return function init()
	{
		this.onMouseOver   = onMouseOver;
		this.onMouseOut    = onMouseOut;
		this.onMouseDown   = onMouseDown;
		this.onMouseUp     = onMouseUp;
		this.onFocus       = onFocus;
		this.onFocusEnd    = onFocusEnd;
		this.onRoomEnter   = onRoomEnter;
		this.onContextMenu = onContextMenu;
	};
});