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
	var Preferences        = require('Core/Preferences');
	var Renderer           = require('Renderer/Renderer');
	var Mouse              = require('Controls/MouseEventHandler');
	var KEYS               = require('Controls/KeyEventHandler');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var InputBox           = require('UI/Components/InputBox/InputBox');
	var ItemInfo           = require('UI/Components/ItemInfo/ItemInfo');
	var Equipment          = require('UI/Components/Equipment/Equipment');
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
		// Preferences structure
		this.preferences = Preferences.get('Inventory', {
			x:        200,
			y:        200,
			width:    7,
			height:   4,
			show:     false,
			reduce:   false,
			tab:      this.TAB.USABLE
		}, 1.0);

		// Don't activate drag drop when clicking on buttons
		this.ui.find('.titlebar .base').mousedown(function( event ){
			event.stopImmediatePropagation();
		})

		// Bind buttons
		this.ui.find('.titlebar .mini').click(this.toggleReduction.bind(this));
		this.ui.find('.tabs button').mousedown(this.switchTab);
		this.ui.find('.footer .extend').mousedown( this.extend.bind(this) );
		this.ui.find('.titlebar .close').click(function(){
			Inventory.ui.hide();
			return false;
		});


		// on drop item
		this.ui.on('drop', function(event){
			var item, data;

			try {
				data = JSON.parse(
					event.originalEvent.dataTransfer.getData("Text")
				);
			}
			catch(e) {}

			// Just support items for now ?
			if( data && data.type === "item" && data.from === "storage") {
				item = data.data;

				// Have to specify how much
				if( item.count > 1 ) {
					InputBox.append();
					InputBox.setType("number", false);
					InputBox.onSubmitRequest = function OnSubmitRequest( count ) {
						InputBox.remove();
						require('UI/Components/Storage/Storage').reqRemoveItem(
							item.index,
							parseInt(count, 10 )
						);
					};
				}

				// Only one, don't have to specify
				else {
					require('UI/Components/Storage/Storage').reqRemoveItem( item.index, 1 );
				}
			}

			event.stopImmediatePropagation();
			return false;
		})

		this.ui.on('dragover', function(){
			event.stopImmediatePropagation();
			return false;
		});

		var overlay = this.ui.find('.overlay');
		var lastScrollPos = 0;

		this.ui.find('.container .content')

			// Scroll feature should block at each line
			.on('scroll', function(){
				if( this.scrollTop > lastScrollPos ) {
					this.scrollTop = Math.ceil(this.scrollTop/32) * 32;
				}
				else {
					this.scrollTop = Math.floor(this.scrollTop/32) * 32;
				}
				lastScrollPos = this.scrollTop;
			})


		// TODO: move all this part to GenericItemSkill.js

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
							( item.RefiningLevel ? '+' + item.RefiningLevel + ' ' : '') +
							( item.IsIdentified ? it.identifiedDisplayName : it.unidentifiedDisplayName ) +
							( it.slotCount ? ' [' + it.slotCount + ']' : '') + 
							' ' + ( item.count || 1 ) + ' ea'
						);

						if( item.IsIdentified ) {
							overlay.removeClass('grey');
						}
						else {
							overlay.addClass('grey');
						}
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

				var matches = this.className.match(/(\w+) (\d+)/);
				var index   = parseInt(matches[2], 10);
				var list, i, count;

				for( i = 0, list = Inventory.list, count = list.length; i < count; ++i ) {
					if( list[i].index === index ) {
						event.originalEvent.dataTransfer.setData("Text",
							JSON.stringify( window._OBJ_DRAG_ = {
								type: "item",
								from: "inventory",
								data:  list[i]
							})
						);
						break;
					}
				}

				// Stop component to be draggable
				jQuery(window).trigger('mouseup');
				overlay.hide();
			})

			// Clean up
			.on('dragend', '.item', function(event){
				delete window._OBJ_DRAG_;
			})

			// Right click on item
			.on('contextmenu', '.item', function(event) {
				var matches = this.className.match(/(\w+) (\d+)/);
				var index   = parseInt(matches[2], 10);
				var list;
				var i, count;

				for( i = 0, list = Inventory.list, count = list.length; i < count; ++i ) {
					if( list[i].index === index ) {

						// Don't add the same UI twice, remove it
						if( ItemInfo.uid === list[i].ITID ) {
							ItemInfo.remove();
							break;
						}

						// Add ui to window
						ItemInfo.append();
						ItemInfo.uid = list[i].ITID;
						ItemInfo.setItem( list[i] );
						break;
					}
				}

				event.stopImmediatePropagation();
				return false;
			})

			// Equip/Use item
			.on('dblclick', '.item', function(event) {
				var matches = this.className.match(/(\w+) (\d+)/);
				var index   = parseInt(matches[2], 10);
				var list;
				var i, count;

				for( i = 0, list = Inventory.list, count = list.length; i < count; ++i ) {
					if( list[i].index === index ) {
						switch( list[i].type ) {
							// Usable item
							case Inventory.ITEM.HEALING:
							case Inventory.ITEM.USABLE:
							//case Inventory.ITEM.USABLE_SKILL:
							case Inventory.ITEM.USABLE_UNK:
								Inventory.onUseItem( index );
								overlay.hide();
								break;

							// Equip item
							case Inventory.ITEM.WEAPON:
							case Inventory.ITEM.EQUIP:
							case Inventory.ITEM.PETEQUIP:
								if( list[i].IsIdentified && !list[i].IsDamaged ) {
									Inventory.onEquipItem( index, list[i].location );
									overlay.hide();
								}
								break;
						}
						break;
					}
				}

				event.stopImmediatePropagation();
				return false;
			});

		this.draggable();
	};


	/**
	 * Apply preferences once append to body
	 */
	Inventory.onAppend = function OnAppend()
	{
		// Apply preferences
		if( !this.preferences.show ) {
			this.ui.hide();
		}

		this.tab = this.preferences.tab;
		Client.loadFile( DB.INTERFACE_PATH + "basic_interface/tab_itm_0"+ (this.tab+1) +".bmp", function(data){
			Inventory.ui.find('.tabs').css('backgroundImage', 'url("' + data + '")');
		});

		this.resize( this.preferences.width, this.preferences.height );

		this.ui.css({
			top:  Math.min( Math.max( 0, this.preferences.y), Renderer.height - this.ui.height()),
			left: Math.min( Math.max( 0, this.preferences.x), Renderer.width  - this.ui.width())
		});

		Inventory.realSize = this.preferences.reduce ? 0 : this.ui.height();
		this.ui.find('.titlebar .mini').trigger('mousedown');
	};


	/**
	 * Remove Inventory from window (and so clean up items)
	 */
	Inventory.onRemove = function OnRemove()
	{
		this.ui.find('.container .content').empty();
		this.list.length = 0;
		jQuery('.ItemInfo').remove();

		// Save preferences
		this.preferences.show   =  this.ui.is(':visible');
		this.preferences.reduce = !!this.realSize;
		this.preferences.tab    =  this.tab;
		this.preferences.y      =  parseInt(this.ui.css('top'), 10);
		this.preferences.x      =  parseInt(this.ui.css('left'), 10);
		this.preferences.width  =  Math.floor( (this.ui.width()  - (23 + 16 + 16 - 30)) / 32 );
		this.preferences.height =  Math.floor( (this.ui.height() - (31 + 19 - 30     )) / 32 );
		this.preferences.save();
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
			if( this.ui.is(':visible') ) {
				this.ui[0].parentNode.appendChild(this.ui[0]);
			}
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
		width  = Math.min( Math.max(width,  6), 9);
		height = Math.min( Math.max(height, 2), 6);

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
	 * Modify tab, filter display entries
	 */
	Inventory.switchTab = function SwitchTab( event )
	{
		var idx = jQuery(this).index();
		Inventory.tab = idx;

		Client.loadFile("basic_interface/tab_itm_0"+ (idx+1) +".bmp", function(data){
			Inventory.ui.find('.tabs').css('backgroundImage', 'url("' + data + '")');
			Inventory.filter(idx);
		});

		event.stopImmediatePropagation();
		return false;
	};


	/**
	 * Hide/show inventory's content
	 */
	Inventory.toggleReduction = function ToggleReduction( event )
	{
		// TODO: fix this part
		if( this.realSize ) {
			this.ui.find('.panel').show();
			this.ui.height(this.realSize);
			this.realSize = 0;
		}
		else {
			this.realSize = this.ui.height();
			this.ui.height(17);
			this.ui.find('.panel').hide();
		}

		event.stopImmediatePropagation();
		return false;
	};


	/**
	 * Add items to the list
	 */
	Inventory.setItems = function SetItems(items)
	{
		var i, count;

		for( i = 0, count = items.length; i < count ; ++i ) {
			if( this.addItemSub( items[i] ) ) {
				this.list.push( items[i] );
			}
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

		if( this.addItemSub(item) ) {
			this.list.push(item);
		}
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

		// Equip item (if not arrow)
		if( item.WearState && item.WearState !== 32768 ) {
			Equipment.equip(item);
			return false;
		}

		if( tab === this.tab ) {
			var it      = DB.getItemInfo( item.ITID );

			Client.loadFile( DB.INTERFACE_PATH + 'item/' + ( item.IsIdentified ? it.identifiedResourceName : it.unidentifiedResourceName ) + '.bmp', function(data){
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

		return true;
	};


	/**
	 * Remove item from inventory
	 *
	 * @param {number} index in inventory
	 */
	Inventory.removeItem = function RemoveItem( index, count )
	{
		var i, size;
		
		if(count === 0) { //Count === 0 means the emulator failed to complete the operation, so dont remove the item frm the ui
            return null;
		}

		for( i = 0, size = this.list.length; i < size; ++i ) {

			if( this.list[i].index === index ) {
				if( this.list[i].count ) {
					this.list[i].count -= count;

					if( this.list[i].count > 0 ) {
						this.ui.find('.item.'+index + ' .count').text( this.list[i].count )
						return this.list[i];
					}
				}

				var item = this.list[i];
				this.list.splice( i, 1 );
				this.ui.find('.item.'+index).remove();

				var content = this.ui.find('.container .content');
				if( content.height() === content[0].scrollHeight ) {
					this.ui.find('.hide').show();
				}

				return item;
			}
		}

		return null;
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
	 * Abstract function to define
	 */
	Inventory.onUseItem   = function OnUseItem( index ){};
	Inventory.onEquipItem = function OnEquipItem( index, location ){};


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(Inventory);
});