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
	var Inventory     = require('UI/Components/Inventory/Inventory');


	/**
	 * Spam an item on the map
	 *
	 * @param {object} pkt - PACKET.ZC.ITEM_ENTRY
	 */
	function Exist( pkt )
	{
		var x = pkt.xPos - 0.5 + pkt.subX / 12;
		var y = pkt.yPos - 0.5 + pkt.subY / 12;
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
		var x = pkt.xPos - 0.5 + pkt.subX / 12;
		var y = pkt.yPos - 0.5 + pkt.subY / 12;
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
			DB.msgstringtable[153].replace('%s', pkt.IsIdentified ? it.identifiedDisplayName : it.unidentifiedDisplayName ).replace('%d', pkt.count ),
			ChatBox.TYPE.BLUE
		);

		Inventory.addItem(pkt);
	}


	/**
	 * Generic function to add items to inventory
	 *
	 * @param {object} pkt - PACKET.ZC.EQUIPMENT_ITEMLIST
	 */
	function InventoryList( pkt )
	{
		Inventory.setItems( pkt.itemInfo || pkt.ItemInfo );
	}


	/**
	 * Remove item from inventory
	 *
	 * @param {object} pkt - PACKET.ZC.ITEM_THROW_ACK
	 */
	function InventoryRemoveItem( pkt )
	{
		Inventory.removeItem( pkt.Index, pkt.count );
	}


	/**
	 * Initialize
	 */
	return function ItemEngine()
	{
		Network.hookPacket( PACKET.ZC.ITEM_ENTRY,          Exist );
		Network.hookPacket( PACKET.ZC.ITEM_FALL_ENTRY,     Create );
		Network.hookPacket( PACKET.ZC.ITEM_DISAPPEAR,      Remove );
		Network.hookPacket( PACKET.ZC.ITEM_PICKUP_ACK,     PickAnswer );
		Network.hookPacket( PACKET.ZC.ITEM_PICKUP_ACK2,    PickAnswer );
		Network.hookPacket( PACKET.ZC.ITEM_PICKUP_ACK3,    PickAnswer );
		Network.hookPacket( PACKET.ZC.ITEM_THROW_ACK,      InventoryRemoveItem );
		Network.hookPacket( PACKET.ZC.NORMAL_ITEMLIST,     InventoryList );
		Network.hookPacket( PACKET.ZC.NORMAL_ITEMLIST2,    InventoryList );
		Network.hookPacket( PACKET.ZC.NORMAL_ITEMLIST3,    InventoryList );
		Network.hookPacket( PACKET.ZC.EQUIPMENT_ITEMLIST,  InventoryList );
		Network.hookPacket( PACKET.ZC.EQUIPMENT_ITEMLIST2, InventoryList );
		Network.hookPacket( PACKET.ZC.EQUIPMENT_ITEMLIST3, InventoryList );
	};
});