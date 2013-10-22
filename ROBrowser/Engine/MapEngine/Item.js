/**
 * Engine/MapEngine/Item.js
 *
 * Item dropped to the ground
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
	var DB            = require('DB/DBManager');
	var Network       = require('Network/NetworkManager');
	var PACKET        = require('Network/PacketStructure');
	var ItemObject    = require('Renderer/ItemObject');
	var Altitude      = require('Renderer/Map/Altitude');
	var ChatBox       = require('UI/Components/ChatBox/ChatBox');
	var ItemObtain    = require('UI/Components/ItemObtain/ItemObtain');


	/**
	 * Spam an item on the map
	 *
	 * @param {object} pkt - PACKET.ZC.ITEM_ENTRY
	 */
	function Exist( pkt )
	{
		var x = pkt.xPos + pkt.subX / 8;
		var y = pkt.yPos + pkt.subY / 8;
		var z = Altitude.getCellHeight( x, y );

		ItemObject.add(
			pkt.ITAID,
			pkt.ITID,
			pkt.IsIdentified,
			pkt.count,
			x,
			y,
			z
		);
	}


	/**
	 * Spam a new item on the map
	 *
	 * @param {object} pkt - PACKET.ZC.ITEM_FALL_ENTRY
	 */
	function Create( pkt )
	{
		var x = pkt.xPos + pkt.subX / 8;
		var y = pkt.yPos + pkt.subY / 8;
		var z = Altitude.getCellHeight( x, y ) + 5.0;

		ItemObject.add(
			pkt.ITAID,
			pkt.ITID,
			pkt.IsIdentified,
			pkt.count,
			x,
			y,
			z
		);
	}


	/**
	 * Spam a new item on the map
	 *
	 * @param {object} pkt - PACKET.ZC.ITEM_DISAPPEAR
	 */
	function Remove( pkt )
	{
		ItemObject.remove( pkt.ITAID );
	}


	/**
	 * Answer when player pick the item
	 *
	 * @param {object} pkt - PACKET.ZC.ITEM_PICKUP_ACK3
	 */
	function PickAnswer( pkt )
	{
		// Fail
		if( pkt.result === 6 ) {
			ChatBox.addText( DB.msgstringtable[53], ChatBox.TYPE.ERROR );
			return;
		}

		

		ItemObtain.append();
		ItemObtain.set( pkt.ITID, pkt.IsIdentified, pkt.count );

		var it = DB.getItemInfo( pkt.ITID );
		ChatBox.addText(
			DB.msgstringtable[153].replace('%s', pkt.IsIdentified ? it.display : it._display ).replace('%d', pkt.count ),
			ChatBox.TYPE.BLUE
		);

		// TODO: add item to inventory
/*
		this.Index           = fp.readUShort();
		this.count           = fp.readUShort();
		this.ITID            = fp.readUShort();
		this.IsIdentified    = fp.readUChar();
		this.IsDamaged       = fp.readUChar();
		this.refiningLevel   = fp.readUChar();
		this.slot            = {};
		this.slot.card1 = fp.readUShort();
		this.slot.card2 = fp.readUShort();
		this.slot.card3 = fp.readUShort();
		this.slot.card4 = fp.readUShort();
		this.location        = fp.readUShort();
		this.type            = fp.readUChar();
		this.result          = fp.readUChar();
		this.HireExpireDate  = fp.readLong();
		this.bindOnEquipType = fp.readUShort();
*/
	}


	/**
	 * Initialize
	 */
	return function ItemEngine()
	{
		Network.hookPacket( PACKET.ZC.ITEM_ENTRY,       Exist );
		Network.hookPacket( PACKET.ZC.ITEM_FALL_ENTRY,  Create );
		Network.hookPacket( PACKET.ZC.ITEM_DISAPPEAR,   Remove );
		Network.hookPacket( PACKET.ZC.ITEM_PICKUP_ACK,  PickAnswer );
		Network.hookPacket( PACKET.ZC.ITEM_PICKUP_ACK2, PickAnswer );
		Network.hookPacket( PACKET.ZC.ITEM_PICKUP_ACK3, PickAnswer );
	};
});