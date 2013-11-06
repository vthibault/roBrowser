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
	'Utils/gl-matrix', 'Controls/KeyEventHandler',
	'Renderer/Camera',
	'Network/PacketStructure', 'Network/NetworkManager',
	'UI/CursorManager', 'Preferences/Controls'
], function(
	glMatrix, KEYS,
	Camera,
	PACKET, Network,
	Cursor, Preferences
)
{
	"use strict";


	/**
	 * Import
	 */
	var mat4    = glMatrix.mat4;
	var _matrix = mat4.create();


	/*
	 * When mouse is over
	 */
	function OnMouseOver()
	{
		var Entity = this.constructor;

		switch( this.objecttype ) {
			case Entity.TYPE_PET:
				if( !Camera.action.active ) {
					Cursor.setType( Cursor.ACTION.DEFAULT );
				}
				break;

			case Entity.TYPE_PC:
			case Entity.TYPE_ELEM:
			case Entity.TYPE_HOM:
				// TODO: Check for pvp flag ?
				if( !KEYS.shift || Preferences.noshift === false ) {
					if( !Camera.action.active ) {
						Cursor.setType( Cursor.ACTION.DEFAULT );
					}
					break;
				}
				// continue to TYPE_MOB

			case Entity.TYPE_MOB:
				Cursor.setType( Cursor.ACTION.ATTACK );
				break;

			case Entity.TYPE_NPC:
				Cursor.setType( Cursor.ACTION.TALK, true );
				break;

			case Entity.TYPE_WARP:
				Cursor.setType( Cursor.ACTION.WARP );
				break;

			case Entity.TYPE_ITEM:
				Cursor.setType( Cursor.ACTION.PICK, true, 0 );
				break;
		}


		switch( this.display.load ) {

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
		if( !Camera.action.active ) {
			Cursor.setType( Cursor.ACTION.DEFAULT );
		}
		else {
			Cursor.setType( Cursor.ACTION.ROTATE );
		}

		if( this !== this.constructor.Manager.getFocusEntity() ) {
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

		switch( this.objecttype ) {
			case Entity.TYPE_PET:
				break;

			case Entity.TYPE_ITEM:
				Cursor.setType( Cursor.ACTION.PICK, true, 2 );
				Camera.target.lookTo( this.position[0], this.position[1] );

				pkt = new PACKET.CZ.ITEM_PICKUP();
				pkt.ITAID = this.GID;
				Network.sendPacket(pkt);
				break;

			case Entity.TYPE_NPC:
				pkt      = new PACKET.CZ.CONTACTNPC();
				pkt.NAID = this.GID;
				pkt.type = 0; // TODO: what is it for ?
				Network.sendPacket(pkt);

				// Updare look
				Camera.target.lookTo( this.position[0], this.position[1] );
				pkt = new PACKET.CZ.CHANGE_DIRECTION();
				pkt.headDir = Camera.target.headDir;
				pkt.dir     = Camera.target.direction;
				Network.sendPacket(pkt);
				break;

			case Entity.TYPE_WARP:
				break;
		}
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
		var pkt;

		switch( this.objecttype ) {

			case Entity.TYPE_PC:
			case Entity.TYPE_ELEM:
			case Entity.TYPE_HOM:
				// TODO: add check for PVP/WOE mapflag
				if( !KEYS.shift || Preferences.noshift === false ) {
					if( !Camera.action.active ) {
						Cursor.setType( Cursor.ACTION.DEFAULT );
					}
					break;
				}
				// no break intended.

			case Entity.TYPE_MOB:
				pkt = new PACKET.CZ.REQUEST_ACT();
				pkt.action = 7;
				pkt.targetGID = this.GID;
				Network.sendPacket(pkt);
				break;
		}
	}


	/**
	 * Lost focus on entity
	 */
	function OnFocusEnd()
	{
		var Entity = this.constructor;

		switch( this.objecttype ) {
			case Entity.TYPE_PC:
			case Entity.TYPE_ELEM:
			case Entity.TYPE_HOM:
			case Entity.TYPE_MOB:
				if( Entity.Manager.getFocusEntity() ) {
					Network.sendPacket(new PACKET.CZ.CANCEL_LOCKON());
				}
		}

		// Stop displaying name
		this.display.display = false;
		this.display.remove();
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
	};
});