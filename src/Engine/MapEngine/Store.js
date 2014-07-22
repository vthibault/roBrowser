/**
 * Engine/MapEngine/Store.js
 *
 * Manage npc store (buy/sell items)
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
	var DB            = require('DB/DBManager');
	var MsgStringIDs = require('DB/MsgStringIds');
	var Network       = require('Network/NetworkManager');
	var PACKET        = require('Network/PacketStructure');
	var NpcStore      = require('UI/Components/NpcStore/NpcStore');
	var ChatBox       = require('UI/Components/ChatBox/ChatBox');


	/**
	 * Received items list to buy from npc
	 *
	 * @param {object} pkt - PACKET.ZC.PC_PURCHASE_ITEMLIST
	 */
	function onBuyList( pkt )
	{
		NpcStore.append();
		NpcStore.setType(NpcStore.Type.BUY);
		NpcStore.setList(pkt.itemList);
		NpcStore.onSubmit = function(itemList) {
			var i, count;
			var pkt;

			pkt   = new PACKET.CZ.PC_PURCHASE_ITEMLIST();
			count = itemList.length;

			for (i = 0; i < count; ++i) {
				pkt.itemList.push({
					ITID:  itemList[i].ITID,
					count: itemList[i].count
				});
			}

			Network.sendPacket(pkt);
		};
	}


	/**
	 * Received purchased informations
	 *
	 * @param {object} pkt - PACKET_ZC_PC_PURCHASE_RESULT
	 */
	function onBuyResult( pkt )
	{
		NpcStore.remove();

		switch (pkt.result) {
			case 0:  ChatBox.addText( DB.getMessage(MsgStringIDs.MSI_DEAL_SECCESS),   ChatBox.TYPE.BLUE);  break; // success
			case 1:  ChatBox.addText( DB.getMessage(MsgStringIDs.MSI_INSUFFICIENT_MONEY),   ChatBox.TYPE.ERROR); break; // zeny
			case 2:  ChatBox.addText( DB.getMessage(MsgStringIDs.MSI_OVER_WEIGHT),   ChatBox.TYPE.ERROR); break; // overweight
			case 4:  ChatBox.addText( DB.getMessage(MsgStringIDs.MSI_INSUFFICIENT_STOCK),  ChatBox.TYPE.ERROR); break; // out of stock
			case 5:  ChatBox.addText( DB.getMessage(MsgStringIDs.MSI_FAIL_BUY_ITEM_ITEM_EXCHANGING),  ChatBox.TYPE.ERROR); break; // trade
			// case 6: 6 = Because the store information was incorrect the item was not purchased.
			case 7:  ChatBox.addText( DB.getMessage(MsgStringIDs.MSI_FAIL_OPEN_STORE), ChatBox.TYPE.ERROR); break; // no sale information
			default: ChatBox.addText( DB.getMessage(MsgStringIDs.MSI_DEAL_FAIL),   ChatBox.TYPE.ERROR); break; // deal failed
		}
	}


	/**
	 * Received items list to buy from npc
	 *
	 * @param {object} pkt - PACKET.ZC.PC_SELL_ITEMLIST
	 */
	function onSellList( pkt )
	{
		NpcStore.append();
		NpcStore.setType(NpcStore.Type.SELL);
		NpcStore.setList(pkt.itemList);
		NpcStore.onSubmit = function(itemList) {
			var i, count;
			var pkt;

			pkt   = new PACKET.CZ.PC_SELL_ITEMLIST();
			count = itemList.length;

			for (i = 0; i < count; ++i) {
				pkt.itemList.push({
					index: itemList[i].index,
					count: itemList[i].count
				});
			}

			Network.sendPacket(pkt);
		};
	}


	/**
	 * Receive sell list result
	 *
	 * @param {object} pkt - PACKET_ZC.PC.SELL_RESULT
	 */
	function onSellResult( pkt )
	{
		NpcStore.remove();

		// success
		if (pkt.result === 0) {
			ChatBox.addText( DB.getMessage(MsgStringIDs.MSI_DEAL_SECCESS), ChatBox.TYPE.BLUE);
		}

		// Fail
		else {
			ChatBox.addText( DB.getMessage(MsgStringIDs.MSI_DEAL_FAIL), ChatBox.TYPE.ERROR);
		}
	}


	/**
	 * Initialize
	 */
	return function MainEngine()
	{
		Network.hookPacket( PACKET.ZC.PC_PURCHASE_ITEMLIST, onBuyList );
		Network.hookPacket( PACKET.ZC.PC_PURCHASE_RESULT,   onBuyResult );
		Network.hookPacket( PACKET.ZC.PC_SELL_ITEMLIST,     onSellList );
		Network.hookPacket( PACKET.ZC.PC_SELL_RESULT,       onSellResult );
	};
});