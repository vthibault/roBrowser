/**
 * UI/Components/ItemInfo/ItemInfo.js
 *
 * Item Information
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function(require)
{
	'use strict';


	/**
	 * Dependencies
	 */
	var jQuery             = require('Utils/jquery');
	var DB                 = require('DB/DBManager');
	var ItemType           = require('DB/Items/ItemType');
	var Client             = require('Core/Client');
	var KEYS               = require('Controls/KeyEventHandler');
	var CardIllustration   = require('UI/Components/CardIllustration/CardIllustration');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var htmlText           = require('text!./ItemInfo.html');
	var cssText            = require('text!./ItemInfo.css');


	/**
	 * Create Component
	 */
	var ItemInfo = new UIComponent( 'ItemInfo', htmlText, cssText );


	/**
	 * @var {number} ItemInfo unique id
	 */
	ItemInfo.uid = -1;


	/**
	 * Once append to the DOM
	 */
	ItemInfo.onKeyDown = function onKeyDown( event )
	{
		if (event.which === KEYS.ESCAPE) {
			ItemInfo.remove();
			event.stopImmediatePropagation();
			return false;
		}

		return true;
	};


	/**
	 * Once append
	 */
	ItemInfo.onAppend = function onAppend()
	{
		// Seems like "EscapeWindow" is execute first, push it before.
		var events = jQuery._data( window, 'events').keydown;
		events.unshift( events.pop() );
	};


	/**
	 * Once removed from html
	 */
	ItemInfo.onRemove = function onRemove()
	{
		this.uid = -1;
	};


	/**
	 * Initialize UI
	 */
	ItemInfo.init = function init()
	{
		this.ui.css({ top: 200, left:200 });

		this.ui.find('.close')
			.mousedown(function(event){
				event.stopImmediatePropagation();
				return false;
			})
			.click(this.remove.bind(this));

		// Ask to see card.
		this.ui.find('.view').click(function(){
			CardIllustration.append();
			CardIllustration.setCard(this.item);
		}.bind(this));

		this.draggable(this.ui.find('.title'));
	};


	/**
	 * Bind component
	 *
	 * @param {object} item
	 */
	ItemInfo.setItem = function setItem( item )
	{
		var it = DB.getItemInfo( item.ITID );
		var ui = this.ui;
		var cardList = ui.find('.cardlist .border');

		this.item = it;
		Client.loadFile( DB.INTERFACE_PATH + 'collection/' + ( item.IsIdentified ? it.identifiedResourceName : it.unidentifiedResourceName ) + '.bmp', function(data){
			ui.find('.collection').css('backgroundImage', 'url('+data+')' );
		});


		ui.find('.title').text( item.IsIdentified ? it.identifiedDisplayName : it.unidentifiedDisplayName );
		ui.find('.description').text( item.IsIdentified ? it.identifiedDescriptionName : it.unidentifiedDescriptionName );

		// Add view button (for cards)
		if (item.type === ItemType.CARD) {
			ui.find('.view').show();
		}
		else {
			ui.find('.view').hide();
		}

		// TODO: add item owner name
		switch (cardList.slot1) {
			case 0x00FF: // FORGE
			case 0x00FE: // CREATE
			case 0xFF00: // PET
				break;
		}

		switch (item.type) {
			// Not an equipement = no card
			default:
				cardList.parent().hide();
				break;

			case ItemType.WEAPON:
			case ItemType.EQUIP:
			case ItemType.PETEGG:
				var slotCount = it.slotCount || 0;
				var i;

				cardList.parent().show();
				cardList.empty();

				for (i = 0; i < 4; ++i) {
					addCard(cardList, (item.slot && item.slot['card' + (i+1)]) || 0, i, slotCount);
				}
				break;
		}
	};


	/**
	 * Add a card into a slot
	 *
	 * @param {object} jquery cart list DOM
	 * @param {number} item id
	 * @param {number} index
	 * @param {number} max slots
	 */
	function addCard( cardList, itemId, index, maxSlots )
	{
		var file, name = '';
		var card = DB.getItemInfo(itemId);

		if (itemId && card) {
			file = 'item/' + card.identifiedResourceName + '.bmp';
			name = '<div class="name">'+ jQuery.escape(card.identifiedDisplayName) + '</div>';
		}
		else if (index < maxSlots) {
			file = 'empty_card_slot.bmp';
		}
		else {
			file = 'disable_card_slot.bmp';
		}

		cardList.append(
			'<div class="item" data-index="'+ index +'">' +
				'<div class="icon"></div>' +
				name +
			'</div>'
		);

		Client.loadFile( DB.INTERFACE_PATH + file, function(data) {
			var element = cardList.find('.item[data-index="'+ index +'"] .icon');
			element.css('backgroundImage', 'url('+ data +')');

			if (itemId && card) {
				element.on('contextmenu',function(){
					ItemInfo.setItem({
						ITID:         itemId,
						IsIdentified: true,
						type:         6
					});
					return false;
				});
			}
		});
	}

	
	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(ItemInfo);
});