/**
 * UI/Components/Inventory/Inventory.js
 *
 * Chararacter Inventory
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function(require)
{
	"use strict";


	/**
	 * Dependencies
	 */
	var DB                 = require('DB/DBManager');
	var jQuery             = require('Utils/jquery');
	var Client             = require('Core/Client');
	var Mouse              = require('Controls/MouseEventHandler');
	var KEYS               = require('Controls/KeyEventHandler');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var htmlText           = require('text!./Inventory.html');
	var cssText            = require('text!./Inventory.css');



	/**
	 * Create Component
	 */
	var Inventory = new UIComponent( 'Inventory', htmlText, cssText );


	/**
	 * Item type constants
	 */
	Inventory.ITEM = {
		HEALING:       0,
		USABLE:        2,
		ETC:           3,
		WEAPON:        4,
		EQUIP:         5,
		CARD:          6,
		PETEGG:        7,
		PETEQUIP:      8,
		AMMO:         10,
		USABLE_SKILL: 11,
		USABLE_UNK:   18
	};


	/**
	 * Tab constant
	 */
	Inventory.TAB = {
		USABLE: 0,
		EQUIP:  1,
		ETC:    2
	};


	/**
	 * Store inventory items
	 */
	Inventory.list = [];


	/**
	 * @var {number} tab
	 */
	Inventory.tab = Inventory.TAB.USABLE;


	/**
	 * @var {number} used to remember the window height
	 */
	Inventory.realSize = 0;


	/**
	 * Initialize UI
	 */
	Inventory.init = function Init()
	{
		this.ui.css({ top: 200, left:200 });
		this.resize( 7, 4 );

		this.ui.find('.titlebar .mini').mousedown(function(){
			// TODO: fix this part
			if( Inventory.realSize ) {
				Inventory.ui.find('.panel').show();
				Inventory.ui.height(Inventory.realSize);
				Inventory.realSize = 0;
			}
			else {
				Inventory.realSize = Inventory.ui.height();
				Inventory.ui.height(17);
				Inventory.ui.find('.panel').hide();
			}
		});

		this.ui.find('.titlebar .close').mousedown(function(){
			Inventory.ui.hide();
		});

		this.ui.find('.tabs button').mousedown(function(){
			var idx = jQuery(this).index();
			Inventory.tab = idx;

			Client.loadFile("basic_interface/tab_itm_0"+ (idx+1) +".bmp", function(data){
				Inventory.ui.find('.tabs').css('backgroundImage', 'url("' + data + '")');
				Inventory.filter(idx);
			});

			event.stopImmediatePropagation();
			return false;
		});

		this.ui.find('.footer .extend').mousedown(
			this.extend.bind(this)
		);


		var overlay = this.ui.find('.overlay');
		this.ui.find('.container .content')

			// Scroll feature should block at each line
			.on('scroll', function(){
				this.scrollTop = Math.floor( this.scrollTop / 32 ) * 32;
			})

			// Title feature
			.on('mouseover', '.item', function(){
				var i, count;
				var items = Inventory.list;
				var idx  = parseInt( this.className.match(/ (\d+)$/)[1], 10);

				for( i = 0, count = items.length; i < count ; ++i ) {
					if( items[i].index === idx ) {

						// Get back data
						var item = items[i];
						var it   = DB.getItemInfo( item.ITID );
						var pos  = jQuery(this).position();

						// Display box
						overlay.show();
						overlay.css({top: pos.top, left:pos.left+35});
						overlay.html(
							(item.count ? '<span class="count">' + item.count + '</span> ' : '') +
							( item.IsIdentified ? it.display : it._display )
						);
						break;
					}
				}
			})

			// Stop title feature
			.on('mouseout', '.item', function(){
				overlay.hide();
			})

			// Item drag drop feature
			.on('dragstart', '.item', function(event){
				// Set image to the drag drop element
				var img = new Image();
				img.src = this.firstChild.style.backgroundImage.match(/\(([^\)]+)/)[1];
				event.originalEvent.dataTransfer.setDragImage( img, 12, 12 );

				// Save item class : ".item <id>",
				event.originalEvent.dataTransfer.setData("Text", this.className);

				// Stop component to be draggable
				jQuery(window).trigger('mouseup');
				overlay.hide();
			})

		this.draggable();
	};


	/**
	 * Hide inventory when append to body
	 */
	Inventory.onAppend = function OnAppend()
	{
		this.ui.hide();
	};


	/**
	 * Remove Inventory from window (and so clean up items)
	 */
	Inventory.onRemove = function OnRemove()
	{
		this.ui.find('.container .content').empty();
	};


	/**
	 * Key Listener
	 *
	 * @param {object} event
	 * @return {boolean}
	 */
	Inventory.onKeyDown = function OnKeyDown( event )
	{
		if( KEYS.ALT && event.which === KEYS.E ) {
			this.ui.toggle();
			event.stopImmediatePropagation();
			return false;
		}

		return true;
	};


	/**
	 * Extend inventory window size
	 */
	Inventory.extend = function Extend( event )
	{
		var ui      = this.ui;
		var content = ui.find('.container .content');
		var hide    = ui.find('.hide');
		var top     = ui.position().top;
		var left    = ui.position().left;
		var lastWidth  = 0;
		var lastHeight = 0;
		var _Interval;

		function Resizing()
		{
			var extraX = 23 + 16 + 16 - 30;
			var extraY = 31 + 19 - 30;

			var w = Math.floor( (Mouse.screen.x - left - extraX) / 32 );
			var h = Math.floor( (Mouse.screen.y - top  - extraY) / 32 );

			// Maximum and minimum window size
			w = Math.min( Math.max(w, 6), 9);
			h = Math.min( Math.max(h, 2), 6);

			if( w === lastWidth && h === lastHeight ) {
				return;
			}

			Inventory.resize( w, h );
			lastWidth  = w;
			lastHeight = h;

			//Show or hide scrollbar
			if( content.height() === content[0].scrollHeight ) {
				hide.show();
			}
			else {
				hide.hide();
			}
		}

		// Start resizing
		_Interval = setInterval( Resizing, 30);

		// Stop resizing
		jQuery(window).one('mouseup', function(event){
			// Only on left click
			if ( event.which === 1 ) {
				clearInterval(_Interval);
			}
		});

		event.stopImmediatePropagation();
		return false;
	};


	/**
	 * Extend inventory window size
	 */
	Inventory.resize = function Resize( width, height )
	{
		this.ui.find('.container .content').css({
			width:  width  * 32 + 13, // 13 = scrollbar
			height: height * 32
		});

		this.ui.css({
			width:  23 + 16 + 16 + width  * 32,
			height: 31 + 19      + height * 32
		});
	};


	/**
	 * Add items to the list
	 */
	Inventory.setItems = function SetItems(items)
	{
		var i, count;

		for( i = 0, count = items.length; i < count ; ++i ) {
			this.addItemSub( items[i] );
			this.list.push(items[i]);
		}
	};


	/**
	 * Insert Item to inventory
	 *
	 * @param {object} Item
	 */
	Inventory.addItem = function AddItem( item )
	{
		var i, size;

		for( i = 0, size = this.list.length; i < size; ++i ) {

			if( this.list[i].index === item.index ) {
				this.list[i].count += item.count;
				this.ui.find('.item.'+ item.index + ' .count').text( this.list[i].count )
				return;
			}
		}

		this.addItemSub(item);
		this.list.push(item);
	};


	/**
	 * Add item to inventory
	 *
	 * @param {object} Item
	 */
	Inventory.addItemSub = function AddItemSub( item )
	{
		var tab;
		var ui = this.ui;

		switch( item.type ) {
			case Inventory.ITEM.HEALING:
			case Inventory.ITEM.USABLE:
			case Inventory.ITEM.USABLE_SKILL:
			case Inventory.ITEM.USABLE_UNK:
				tab = Inventory.TAB.USABLE;
				break;

			case Inventory.ITEM.WEAPON:
			case Inventory.ITEM.EQUIP:
			case Inventory.ITEM.PETEGG:
			case Inventory.ITEM.PETEQUIP:
				tab = Inventory.TAB.EQUIP;
				break;

			default:
			case Inventory.ITEM.ETC:
			case Inventory.ITEM.CARD:
			case Inventory.ITEM.AMMO:
				tab = Inventory.TAB.ETC;
				break;
		}

		if( tab === this.tab ) {
			var it      = DB.getItemInfo( item.ITID );
			var path    = 'data/texture/\xc0\xaf\xc0\xfa\xc0\xce\xc5\xcd\xc6\xe4\xc0\xcc\xbd\xba/item/';


			Client.loadFile( path + ( item.IsIdentified ? it.resource : it._resource ) + '.bmp', function(data){
				var content = ui.find('.container .content');

				content.append(
					'<div class="item '+ item.index +'" draggable="true">' +
						'<button style="background-image:url(' + data + ')"></button>' +
						'<div class="amount">'+ (item.count ? '<span class="count">' + item.count + '</span>' + ' ' : '') + '</div>' +
					'</div>'
				);

				if( content.height() < content[0].scrollHeight ) {
					ui.find('.hide').hide();
				}
			});
		}
	};


	/**
	 * Remove item from inventory
	 *
	 * @param {number} index in inventory
	 */
	Inventory.removeItem = function RemoveItem( index, count )
	{
		var i, size;

		for( i = 0, size = this.list.length; i < size; ++i ) {

			if( this.list[i].index === index ) {
				if( this.list[i].count ) {
					this.list[i].count -= count;

					if( this.list[i].count > 0 ) {
						this.ui.find('.item.'+index + ' .count').text( this.list[i].count )
						return;
					}
				}

				this.list.splice( i, 1 );
				this.ui.find('.item.'+index).remove();
				break;
			}
		}

		var content = this.ui.find('.container .content');
		if( content.height() === content[0].scrollHeight ) {
			this.ui.find('.hide').show();
		}
	};


	/**
	 * Update tabulation
	 */
	Inventory.filter = function Filter(tab)
	{
		this.ui.find('.container .content').empty();
		var i, count;

		for( i = 0, count = this.list.length; i < count; ++i ) {
			this.addItemSub( this.list[i] );
		}
	};


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(Inventory);
});