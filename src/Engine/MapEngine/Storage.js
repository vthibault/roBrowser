/**
 * Engine/MapEngine/Storage.js
 *
 * Manage Storage sockets
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
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
	var Storage       = require('UI/Components/Storage/Storage');
	
	
	/*
	 * This will hold the items to append to storage
	 * Since STORE_EQUIPMENT_ITEMLIST packets are sent before NOTIFY_STOREITEM_COUNTINFO
	 * And they are only sent if theres item's on storage!
	 */
	var itemBuffer = [];


	/**
	 * Get storage informations
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_STOREITEM_COUNTINFO
	 */
	function OnStorageInfo( pkt )
	{
		Storage.append();
		Storage.setItemInfo( pkt.curCount, pkt.maxCount );
		Storage.setItems( itemBuffer );
		
		itemBuffer = [];
	}


	/**
	 * Add items to storage
	 *
	 * @param {object} pkt - PACKET.ZC.STORE_EQUIPMENT_ITEMLIST3 
	 */
	function StorageAddItemList( pkt )
	{
		itemBuffer = itemBuffer.concat( pkt.ItemInfo );
	}


	/**
	 * Receive update from server to add item into the storage
	 *
	 * @param {object} pkt - PACKET.ZC.ADD_ITEM_TO_STORE
	 */
	function OnStorageItemAdded( pkt )
	{
		Storage.addItem(pkt);
	}


	/**
	 * Remove item from storage
	 *
	 * @param {object} pkt - PACKET.ZC.DELETE_ITEM_FROM_STORE
	 */
	function OnStorageItemRemoved( pkt )
	{
		Storage.removeItem( pkt.index, pkt.count );
	}


	/**
	 * Server want you to close the storage
	 *
	 * @param {object} pkt - PACKET.ZC.CLOSE_STORE
	 */
	function  OnStorageClose( pkt )
	{
		Storage.remove();
	}


	/**
	 * Send storage close
	 * PACKET.CZ.CLOSE_STORE
	 */
	Storage.onClosePressed = function onClosePressed()
	{
		var pkt = new PACKET.CZ.CLOSE_STORE();
		Network.sendPacket( pkt );

		Storage.remove();
	};


	/**
	 * Send item to storage
	 * PACKET.CZ.MOVE_ITEM_FROM_BODY_TO_STORE
	 */
	Storage.reqAddItem = function ReqAddItem( index, count )
	{
		if (count <= 0) {
			return;
		}

		var pkt   = new PACKET.CZ.MOVE_ITEM_FROM_BODY_TO_STORE();
		pkt.index = index;
		pkt.count = count;
		Network.sendPacket( pkt );
	};


	/**
	 * Send frm storage to inventory
	 * PACKET.CZ.MOVE_ITEM_FROM_STORE_TO_BODY
	 */
	Storage.reqRemoveItem = function ReqRemoveItem( index, count )
	{
		if (count <= 0) {
			return;
		}

		var pkt   = new PACKET.CZ.MOVE_ITEM_FROM_STORE_TO_BODY();
		pkt.index = index;
		pkt.count = count;
		Network.sendPacket( pkt );
	};


	/**
	 * Initialize
	 */
	return function ItemEngine()
	{
		Network.hookPacket( PACKET.ZC.STORE_NORMAL_ITEMLIST,      StorageAddItemList );
		Network.hookPacket( PACKET.ZC.STORE_NORMAL_ITEMLIST2,     StorageAddItemList );
		Network.hookPacket( PACKET.ZC.STORE_NORMAL_ITEMLIST3,     StorageAddItemList );
		Network.hookPacket( PACKET.ZC.STORE_EQUIPMENT_ITEMLIST,   StorageAddItemList );
		Network.hookPacket( PACKET.ZC.STORE_EQUIPMENT_ITEMLIST2,  StorageAddItemList ); 
		Network.hookPacket( PACKET.ZC.STORE_EQUIPMENT_ITEMLIST3,  StorageAddItemList ); 
		Network.hookPacket( PACKET.ZC.NOTIFY_STOREITEM_COUNTINFO, OnStorageInfo);
		Network.hookPacket( PACKET.ZC.ADD_ITEM_TO_STORE,          OnStorageItemAdded );
		Network.hookPacket( PACKET.ZC.ADD_ITEM_TO_STORE2,         OnStorageItemAdded );
		Network.hookPacket( PACKET.ZC.CLOSE_STORE,                OnStorageClose );
		Network.hookPacket( PACKET.ZC.DELETE_ITEM_FROM_STORE,     OnStorageItemRemoved );
	};
});