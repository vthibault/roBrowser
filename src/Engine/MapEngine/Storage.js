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
	var Inventory       = require('UI/Components/Inventory/Inventory');
	var Storage     = require('UI/Components/Storage/Storage');
	
	
	/**
	 * Store the item list while sending
	 * Same as pkg.ItemInfo structure.
	 */
	var itemBuffer = [];
	
	
	/**
	 * This packet will indicate that the storage should be opened, since the storage list has already been buffered by now.
	 * This packet will also update storage amount/limit info.
	 * @param {object} pkt - PACKET.ZC.NOTIFY_STOREITEM_COUNTINFO
	 */
    function RequestStorage( pkt )
    {
        if(! Storage.ui) { //first time init()
            console.log('appending storage');
            Storage.append();
        }
        
        if(! Storage.ui.is(':visible')) { //check if storage is not already open
            console.log('storage open')
            Storage.openRequest();
            console.log(itemBuffer);
            Storage.setItems( itemBuffer );
            
            itemBuffer = [];
        }
        
        console.log('Storage updated')
        Storage.setCurrent( pkt.curCount );
        Storage.setLimit( pkt.maxCount );
    }
    

	/**
	 * Add items to the storage listing buffer that will soon be open
	 * @param {object} pkt - PACKET.ZC.STORE_EQUIPMENT_ITEMLIST3 
	 */
    function StorageAddList( pkt )
    {
        for(var i in pkt.ItemInfo) {
            itemBuffer.push( pkt.ItemInfo[i] );
        }
    }
    
	
	/**
	 * Send storage close
	 * PACKET.CZ.CLOSE_STORE
	 */
	// 0xf7
	Storage.onClosePressed = function onClosePressed()
	{
        console.log('storage closed')
        var pkt = new PACKET.CZ.CLOSE_STORE();
        Network.sendPacket( pkt );
        
        Storage.remove();
	};
	
    
    /**
     * Send item to storage
     * PACKET.CZ.MOVE_ITEM_FROM_BODY_TO_STORE
     */
    Storage.onDragToStorage = function PutItemStorage( index, count )
    {
		var pkt = new PACKET.CZ.MOVE_ITEM_FROM_BODY_TO_STORE();
		pkt.index = index;
		pkt.count = count;
		Network.sendPacket( pkt );
    }
    
    
    /**
     * Send frm storage to inventory
     * PACKET.CZ.MOVE_ITEM_FROM_STORE_TO_BODY
     */
    Storage.onDragFromStorage = function GetItemStorage( index, count )
    {
		var pkt = new PACKET.CZ.MOVE_ITEM_FROM_STORE_TO_BODY();
		pkt.index = index;
		pkt.count = count;
		Network.sendPacket( pkt );
    }  
	
        
	/**
	 * Initialize
	 */
	return function ItemEngine()
	{
		Network.hookPacket( PACKET.ZC.STORE_NORMAL_ITEMLIST3,           StorageAddList );
		Network.hookPacket( PACKET.ZC.STORE_EQUIPMENT_ITEMLIST3,        StorageAddList ); 
		Network.hookPacket( PACKET.ZC.NOTIFY_STOREITEM_COUNTINFO,       RequestStorage );
        //Network.hookPacket( PACKET.ZC.ADD_ITEM_TO_STORE,                GetItemInventory );
		//Network.hookPacket( PACKET.ZC.ADD_ITEM_TO_STORE2,            GetItemInventory );
		//Network.hookPacket( PACKET.ZC.CLOSE_STORE,                    GetItemInventory );
		//Network.hookPacket( PACKET.ZC.DELETE_ITEM_FROM_STORE,         GetItemInventory );
	};
});
