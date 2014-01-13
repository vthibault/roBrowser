/**
 * UI/Components/Storage/Storage.js
 *
 * Account Storage
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
	var ItemInfo           = require('UI/Components/ItemInfo/ItemInfo')
	var Equipment          = require('UI/Components/Equipment/Equipment');
	var htmlText           = require('text!./Storage.html');
	var cssText            = require('text!./Storage.css');


	/**
	 * Create Component
	 */
	var Storage = new UIComponent( 'Storage', htmlText, cssText );


	/**
	 * Item type constants
	 */
	Storage.ITEM = {
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
	Storage.TAB = {
		ITEM:   0,
		KAFRA:  1,
		ARMOR:  2,
		ARMS:   3,
		AMMO:   4,
		CARD:   5,
		ETC:    6
	};


	/**
	 * Store inventory items
	 */
	Storage.list = [];


	/**
	 * @var {number} tab
	 */
	Storage.tab = Storage.TAB.ITEM;


	/**
	 * @var {number} used to remember the window height
	 */
	Storage.realSize = 0;


	/**
	 * Initialize UI
	 */
	Storage.init = function Init()
	{
		// Preferences structure
		this.preferences = Preferences.get('Storage', {
			x:        200,
			y:        500,
			width:    8,
			height:   60,
			tab:      0
		}, 1.0);

		// Bind buttons
		this.ui.find('.tabs button').mousedown(this.switchTab);
		this.ui.find('.footer .extend').mousedown( this.extend.bind(this) );
		this.ui.find('.footer .close').click( function() {
            console.log('close pressed');
            console.log(this)
            Storage.ui.hide();
            Storage.onClosePressed();
		} );
		
		// drag, drop items
		//this.ui.on('dragover',  this.onDragOver.bind(this) );
		//this.ui.on('dragleave', this.onDragLeave.bind(this) );
		//this.ui.on('drop',      this.onDragDrop.bind(this) );

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
				var items = Storage.list;
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

				for( i = 0, list = Storage.list, count = list.length; i < count; ++i ) {
					if( list[i].index === index ) {
						event.originalEvent.dataTransfer.setData("Text",
							JSON.stringify( window._OBJ_DRAG_ = {
								type: "item",
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

				for( i = 0, list = Storage.list, count = list.length; i < count; ++i ) {
					if( list[i].index === index ) {

						// Don't add the same UI twice, remove it
						if( ItemInfo.uid === list[i].ITID ) {
							ItemInfo.remove();
							break;
						}

						// Add ui to window
						ItemInfo.append();
						ItemInfo.uid = list[i].ITID;
						ItemInfo.I( list[i] );
						break;
					}
				}

				event.stopImmediatePropagation();
				return false;
			})

		this.draggable();
	};


	/**
	 * Apply preferences once append to body
	 */
	Storage.onAppend = function OnAppend()
    {   console.log('on append');
        this.tab = this.preferences.tab;
		Client.loadFile( DB.INTERFACE_PATH + "basic_interface/tab_itm_ex_0"+ (this.tab+1) +".bmp", function(data){
			Storage.ui.find('.tabs').css('backgroundImage', 'url("' + data + '")');
		});

		this.resize( this.preferences.width, this.preferences.height );

		this.ui.css({
			top:  Math.min( Math.max( 0, this.preferences.y), Renderer.height - this.ui.height()),
			left: Math.min( Math.max( 0, this.preferences.x), Renderer.width  - this.ui.width())
		});

		Storage.realSize = this.preferences.reduce ? 0 : this.ui.height();
	};


	/**
	 * Remove Storage from window (and so clean up items)
	 */
	Storage.onRemove = function OnRemove()
	{
		this.ui.find('.container .content').empty();
		this.list.length = 0;
		jQuery('.ItemInfo').remove();

		// Save preferences
		this.preferences.reduce = !!this.realSize;
		this.preferences.tab    =  this.tab;
		this.preferences.y      =  parseInt(this.ui.css('top'), 10);
		this.preferences.x      =  parseInt(this.ui.css('left'), 10);
		this.preferences.width  =  Math.floor( (this.ui.width()  - (23 + 16 + 16 - 30)) / 32 );
		this.preferences.height =  Math.floor( (this.ui.height() - (31 + 19 - 30     )) / 32 );
		this.preferences.save();
	};


	/**
	 * Storage requested
	 */
	Storage.openRequest = function openRequest( )
	{
			this.ui[0].parentNode.appendChild(this.ui[0]);
	};


	/**
	 * Extend Storage window size
	 */
	Storage.extend = function Extend( event )
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

			Storage.resize( w, h );
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
	 * Extend Storage window size
	 */
	Storage.resize = function Resize( width, height )
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
	Storage.switchTab = function SwitchTab( event )
	{
		var idx = jQuery(this).index();
		Storage.tab = idx;

		Client.loadFile("basic_interface/tab_itm_ex_0"+ (idx+1) +".bmp", function(data){
			Storage.ui.find('.tabs').css('backgroundImage', 'url("' + data + '")');
			Storage.filter(idx);
		});

		event.stopImmediatePropagation();
		return false;
	};


	/**
	 * Add items to the list
	 */
	Storage.setItems = function SetItems(items)
	{
		var i, count;

		for( i = 0, count = items.length; i < count ; ++i ) {
			if( this.addItemSub( items[i] ) ) {
				this.list.push( items[i] );
			}
		}
	};


	/**
	 * Insert Item to Storage
	 *
	 * @param {object} Item
	 */
	Storage.addItem = function AddItem( item )
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
	 * Add item to Storage
	 *
	 * @param {object} Item
	 */
	Storage.addItemSub = function AddItemSub( item )
	{
		var tab;
		var ui = this.ui;
		
		switch( item.type ) {
            case Storage.ITEM.HEALING:
			case Storage.ITEM.USABLE:
				tab = Storage.TAB.ITEM;
				break;
				
			case Storage.ITEM.USABLE_SKILL:
			case Storage.ITEM.USABLE_SKILL_UNK:
				tab = Storage.TAB.KAFRA;
				break;
				
			case Storage.ITEM.USABLE.EQUIP:
			case Storage.ITEM.USABLE.PETEQUIP:
                tab = Storage.TAB.ARMOR;
                break;

            case Storage.ITEM.USABLE.WEAPON:
                tab = Storage.TAB.ARMS;
                break;
                
            case Storage.ITEM.USABLE.AMMO:
                tab = Storage.TAB.AMMO;
                break;
                
            case Storage.ITEM.USABLE.CARD:
                tab = Storage.TAB.CARD;
                break;
			 
			default:
			case Storage.ITEM.ETC:
			case Storage.ITEM.PETEGG:
				tab = Storage.TAB.ETC;
				break;
		}

		if( tab === this.tab ) {
			var it      = DB.getItemInfo( item.ITID );

			Client.loadFile( DB.INTERFACE_PATH + 'item/' + ( item.IsIdentified ? it.identifiedResourceName : it.unidentifiedResourceName ) + '.bmp', function(data){
				var content = ui.find('.container .content');

				content.append(
					'<div class="item '+ item.index +'" draggable="true">' +
						'<button style="background-image:url(' + data + ')"></button>' +
						'<div class="amount">'+ (item.count ? '<span class="count">' + item.count + '</span>' + ' ' : '') + '</div>' +
						'<span class="name">' + ( item.RefiningLevel ? '+' + item.RefiningLevel + ' ' : '') + ( item.IsIdentified ? it.identifiedDisplayName : it.unidentifiedDisplayName ) + '</span>' +
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
	 * Remove item from Storage
	 *
	 * @param {number} index in Storage
	 */
	Storage.removeItem = function RemoveItem( index, count )
	{
		var i, size;

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
	Storage.filter = function Filter( tab )
	{
		this.ui.find('.container .content').empty();
		var i, count;

		for( i = 0, count = this.list.length; i < count; ++i ) {
			this.addItemSub( this.list[i] );
		}
	};
	
	/**
	 * Update or set the current amount of items in storage in ui
	 */
	Storage.setCurrent = function setCurrent( current ) {
	    this.ui.find('.footer .current').text(current);
	}
	
	/**
	 * Update or set the current limit of the storage in ui
	 */
	Storage.setLimit = function setCurrent( limit ) {
	    this.ui.find('.footer .limit').text(limit);
	}

    /**
     * Drag  & drop over item to storage
     */
	Storage.onDragDrop = function onDragDrop( event )
	{ console.log(1);
		var item, data;

		try {
			data = JSON.parse(
				event.originalEvent.dataTransfer.getData("Text")
			);
		}
		catch(e) {}
        console.log(data);
		// Just support items for now ?
		if( data && data.type === "item") {
			item = data.data;
            console.log(item);
            Storage.onDragToStorage( item.index, item.count );
		}

		event.stopImmediatePropagation();
		return false;
	};

	/**
	 * Callbacks
	 */
	Storage.onClosePressed = function(){};
	Storage.onDragToStorage = function(){};
	Storage.onDragFromStorage = function(){};


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(Storage);
});