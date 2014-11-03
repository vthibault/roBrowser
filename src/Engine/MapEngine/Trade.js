/**
 * Engine/MapEngine/Trade.js
 *
 * Manage Trade packets and UI
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
	var DB        = require('DB/DBManager');
	var Network   = require('Network/NetworkManager');
	var PACKET    = require('Network/PacketStructure');
	var Trade     = require('UI/Components/Trade/Trade');
	var ChatBox   = require('UI/Components/ChatBox/ChatBox');
	var UIManager = require('UI/UIManager');


	/**
	 * Convert GID to a random string
	 * It's used in the official client
	 *
	 * @param {number} GID
	 * @param {string} randrom string
	 */
	function tradeGIDEncoding(GID)
	{
		var table = 'ROHUTNASEW';
		var str, out;
		var i, count;

		str = String(GID);
		out = '';

		for (i = 0, count = str.length; i < count; ++i) {
			out += table[ str[i] ];
		}

		return out;
	}


	/**
	 * Someone ask to start a trade
	 * @param {object} pkt - PACKET.ZC.REQ_EXCHANGE_ITEM
	 */
	function onTradeRequest( pkt )
	{
		function answer(value) {
			return function() {
				var pkt    = new PACKET.CZ.ACK_EXCHANGE_ITEM();
				pkt.result = value;
				Network.sendPacket(pkt);
			};
		}

		var text    = '(' + pkt.name + ') ' + DB.getMessage(93);
		Trade.title = pkt.name;

		if ('level' in pkt && 'GID' in pkt) {
			text        += '\nPN: ' + tradeGIDEncoding(pkt.GID)+ '\xa0\xa0\xa0\xa0\xa0Lv.' + pkt.level;
		}

		UIManager.showPromptBox( text, 'ok', 'cancel', answer(3), answer(4));
	}


	/**
	 * Result about trade ask
	 * @param {object} pkt - PACKET.ZC.ACK_EXCHANGE_ITEM
	 */
	function onTradeRequestAnswer( pkt )
	{
		switch (pkt.result) {
			case 0: // Char is too far
				ChatBox.addText( DB.getMessage(70), ChatBox.TYPE.ERROR);
				break;


			case 1: // Character does not exist
				ChatBox.addText( DB.getMessage(71), ChatBox.TYPE.ERROR);
				break;

			case 2: // In another deal
				ChatBox.addText( DB.getMessage(72), ChatBox.TYPE.ERROR);
				break;

			case 3:
				if ('level' in pkt && 'GID' in pkt) {
					Trade.title +='  Lv' + pkt.level + ' (' + tradeGIDEncoding(pkt.GID) +')';
				}
				Trade.append();
				break;

			case 4: // Cancel
				ChatBox.addText( DB.getMessage(74), ChatBox.TYPE.ERROR);
				break;

			case 5: // AFK ?
				break;
		}
	}


	/**
	 * Try to add an item to the list
	 *
	 * @param {number} item index in inventory
	 * @param {number} count
	 */
	Trade.reqAddItem = function reqAddItem( index, count )
	{
		var pkt   = new PACKET.CZ.ADD_EXCHANGE_ITEM();
		pkt.index = index;
		pkt.count = count;

		Network.sendPacket(pkt);
	};


	/**
	 * Response from the server when requesting to add an item.
	 *
	 * @param {object} pkt - PACKET.ZC.ACK_ADD_EXCHANGE_ITEM
	 */
	function onAddItemResult( pkt )
	{
		switch (pkt.result) {
			case 1: // overweight
				ChatBox.addText( DB.getMessage(73), ChatBox.TYPE.ERROR);
				break;

			case 2: // trade canceled
				ChatBox.addText( DB.getMessage(74), ChatBox.TYPE.ERROR);
				break;
		}

		Trade.addItemFromInventory(pkt.Index, pkt.result === 0);
	}


	/**
	 * Oher user added another item
	 *
	 * @param {object} pkt - PACKET.ZC.ADD_EXCHANGE_ITEM
	 */
	function onItemAdded( pkt )
	{
		Trade.addItem(pkt);
	}


	/**
	 * Reject deal
	 */
	Trade.onCancel = function onCancel()
	{
		var pkt = new PACKET.CZ.CANCEL_EXCHANGE_ITEM();
		Network.sendPacket(pkt);
	};


	/**
	 * Deal canceled
	 *
	 * @param {object} pkt - PACKET.ZC.CANCEL_EXCHANGE_ITEM
	 */
	function onTradeCancel( pkt )
	{
		ChatBox.addText( DB.getMessage(74), ChatBox.TYPE.ERROR);
		Trade.remove();
	}


	/**
	 * Conclude the deal
	 */
	Trade.onConclude = function onConclude()
	{
		var pkt = new PACKET.CZ.CONCLUDE_EXCHANGE_ITEM();
		Network.sendPacket(pkt);
	};


	/**
	 * Conclude a part of the trade
	 *
	 * @param {object} pkt - PACKET.ZC.CONCLUDE_EXCHANGE_ITEM
	 */
	function onTradeConclude( pkt )
	{
		Trade.conclude( pkt.who ? 'recv' : 'send' );
	}


	/**
	 * Submit the trade
	 */
	Trade.onTradeSubmit = function onTradeSubmit()
	{
		var pkt = new PACKET.CZ.EXEC_EXCHANGE_ITEM();
		Network.sendPacket(pkt);
	};


	/**
	 * Result of the deal
	 *
	 * @param {object} pkt - PACKET.ZC.EXEC_EXCHANGE_ITEM
	 */
	function onTradeSubmitAnswer( pkt )
	{
		// Fail
		if (pkt.result === 1) {
			ChatBox.addText( DB.getMessage(76), ChatBox.TYPE.ERROR);
			Trade.remove();
			return;
		}

		//TODO: Give items...
		ChatBox.addText( DB.getMessage(75), ChatBox.TYPE.BLUE);
		Trade.remove();
	}


	/**
	 * Request to start a deal with another player
	 *
	 * @param {number} GID
	 */
	Trade.reqExchange = function requestExhange( GID, name ) {
		var pkt = new PACKET.CZ.REQ_EXCHANGE_ITEM();
		pkt.AID = GID;
		Network.sendPacket(pkt);

		Trade.title = name;
	};


	/**
	 * Initialize
	 */
	return function MainEngine()
	{
		Network.hookPacket(PACKET.ZC.REQ_EXCHANGE_ITEM,      onTradeRequest);
		Network.hookPacket(PACKET.ZC.REQ_EXCHANGE_ITEM2,     onTradeRequest);
		Network.hookPacket(PACKET.ZC.ACK_EXCHANGE_ITEM,      onTradeRequestAnswer);
		Network.hookPacket(PACKET.ZC.ACK_EXCHANGE_ITEM2,     onTradeRequestAnswer);
		Network.hookPacket(PACKET.ZC.ACK_ADD_EXCHANGE_ITEM,  onAddItemResult);
		Network.hookPacket(PACKET.ZC.ADD_EXCHANGE_ITEM,      onItemAdded);
		Network.hookPacket(PACKET.ZC.ADD_EXCHANGE_ITEM2,     onItemAdded);
		Network.hookPacket(PACKET.ZC.CANCEL_EXCHANGE_ITEM,   onTradeCancel);
		Network.hookPacket(PACKET.ZC.CONCLUDE_EXCHANGE_ITEM, onTradeConclude);
		Network.hookPacket(PACKET.ZC.EXEC_EXCHANGE_ITEM,     onTradeSubmitAnswer);
	};
});