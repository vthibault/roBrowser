/**
 * Controls/EntityControl.js
 *
 * Entity class
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define( [
	'Utils/gl-matrix', 'Utils/PathFinding',
	'Controls/KeyEventHandler', 'Controls/MouseEventHandler',
	'Renderer/Camera', 'Engine/SessionStorage',
	'Network/PacketStructure', 'Network/NetworkManager',
	'UI/CursorManager', 'UI/Components/InputBox/InputBox',
	'Preferences/Controls',
	'UI/Components/ChatRoom/ChatRoom'
], function(
	glMatrix, PathFinding,
	KEYS, Mouse,
	Camera, Session,
	PACKET, Network,
	Cursor, InputBox,
	Preferences,
	ChatRoom
)
{
	'use strict';


	/**
	 * Import
	 */
	var mat4    = glMatrix.mat4;
	var vec2    = glMatrix.vec2;
	var _matrix = mat4.create();


	/*
	 * When mouse is over
	 */
	function OnMouseOver()
	{
		var Entity = this.constructor;

		switch (this.objecttype) {
			case Entity.TYPE_PET:
				if (!Camera.action.active) {
					Cursor.setType( Cursor.ACTION.DEFAULT );
				}
				break;

			case Entity.TYPE_PC:
			case Entity.TYPE_ELEM:
			case Entity.TYPE_HOM:
				// TODO: Check for pvp flag ?
				if (KEYS.SHIFT === false && Preferences.noshift === false)  {
					if (!Camera.action.active ) {
						Cursor.setType( Cursor.ACTION.DEFAULT );
					}
					break;
				}

				Cursor.setType( Cursor.ACTION.ATTACK );
				break;

			case Entity.TYPE_MOB:
				Cursor.setType( Cursor.ACTION.ATTACK );
				break;

			case Entity.TYPE_NPC:
				Cursor.setType( Cursor.ACTION.TALK, true );
				break;

			case Entity.TYPE_WARP:
				Cursor.setType( Cursor.ACTION.WARP );
				return;

			case Entity.TYPE_ITEM:
				Cursor.setType( Cursor.ACTION.PICK, true, 0 );
				break;
		}


		switch (this.display.load) {

			// Ask for the name
			case this.display.TYPE.NONE:
				this.display.load = this.display.TYPE.LOADING;

				var pkt = new PACKET.CZ.REQNAME();
				pkt.AID = this.GID;
				Network.sendPacket(pkt);
				break;

			// Nothing yet
			case this.display.TYPE.LOADING:
				break;

			// Display the name
			case this.display.TYPE.COMPLETE:
				mat4.multiply( _matrix, Camera.projection, this.matrix );
				this.display.render(_matrix);
				this.display.add();
				break;
		}
	}


	/**
	 * When mouse is not over yet
	 */
	function OnMouseOut()
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
	function OnMouseDown()
	{
		var Entity = this.constructor;
		var pkt;

		switch (this.objecttype) {
			case Entity.TYPE_PET:
				break;

			case Entity.TYPE_ITEM:
				Cursor.setType( Cursor.ACTION.PICK, true, 2 );

				// Too far, walking to it
				if (vec2.distance(Session.Entity.position, this.position) > 2) {
					pkt         = new PACKET.CZ.REQUEST_MOVE();
					pkt.dest[0] = Mouse.world.x;
					pkt.dest[1] = Mouse.world.y;
					Network.sendPacket(pkt);

					Session.moveTarget = this;
					return true;
				}

				Session.Entity.lookTo( this.position[0], this.position[1] );

				pkt       = new PACKET.CZ.ITEM_PICKUP();
				pkt.ITAID = this.GID;
				Network.sendPacket(pkt);

				return true;

			case Entity.TYPE_NPC:
				pkt      = new PACKET.CZ.CONTACTNPC();
				pkt.NAID = this.GID;
				pkt.type = 0; // TODO: what is it for ?
				Network.sendPacket(pkt);

				// Updare look
				Session.Entity.lookTo( this.position[0], this.position[1] );
				pkt = new PACKET.CZ.CHANGE_DIRECTION();
				pkt.headDir = Session.Entity.headDir;
				pkt.dir     = Session.Entity.direction;
				Network.sendPacket(pkt);
				return true;

			case Entity.TYPE_WARP:
				break;
		}

		return false;
	}


	/**
	 * Stop clicking on an entity
	 */
	function OnMouseUp()
	{
	}


	/**
	 * Focus the entity
	 */
	function OnFocus()
	{
		var Entity = this.constructor;
		var main   = Session.Entity;
		var pkt;

		switch (this.objecttype) {

			case Entity.TYPE_PC:
			case Entity.TYPE_ELEM:
			case Entity.TYPE_HOM:
				// TODO: add check for PVP/WOE mapflag
				if (KEYS.SHIFT === false && Preferences.noshift === false)  {
					if (!Camera.action.active) {
						Cursor.setType( Cursor.ACTION.DEFAULT );
					}
					break;
				}
			// no break intended.

			case Entity.TYPE_MOB:
				var out   = [];
				var count = PathFinding.search(
					main.position[0] | 0, main.position[1] | 0,
					this.position[0] | 0, this.position[1] | 0,
					main.attack_range,
					out
				);

				// Can't attack
				if (!count) {
					return true;
				}

				// in range
				if (count <= main.attack_range) {
					pkt           = new PACKET.CZ.REQUEST_ACT();
					pkt.action    = 7;
					pkt.targetGID = this.GID;
					Network.sendPacket(pkt);
				}

				// Move to entity
				else {
					var _pkt     = new PACKET.CZ.REQUEST_MOVE();
					_pkt.dest[0] = out[ count - 1 ][0];
					_pkt.dest[1] = out[ count - 1 ][1];
					Network.sendPacket(_pkt);

					Session.moveTarget = this;
					return true;
				}


			return true;
		}

		return false;
	}


	/**
	 * Lost focus on entity
	 */
	function OnFocusEnd()
	{
		var Entity = this.constructor;

		switch (this.objecttype) {
			case Entity.TYPE_PC:
			case Entity.TYPE_ELEM:
			case Entity.TYPE_HOM:
			case Entity.TYPE_MOB:
				if (Entity.Manager.getFocusEntity()) {
					Network.sendPacket(new PACKET.CZ.CANCEL_LOCKON());
				}
		}

		// Stop displaying name
		this.display.display = false;
		this.display.remove();
	}


	/**
	 * Open entity room (chat room, shop, ...)
	 */
	function OnRoomEnter()
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
	return function Init()
	{
		this.onMouseOver = OnMouseOver;
		this.onMouseOut  = OnMouseOut;
		this.onMouseDown = OnMouseDown;
		this.onMouseUp   = OnMouseUp;
		this.onFocus     = OnFocus;
		this.onFocusEnd  = OnFocusEnd;
		this.onRoomEnter = OnRoomEnter;
	};
});