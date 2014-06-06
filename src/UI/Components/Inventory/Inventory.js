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
	'use strict';


	/**
	 * Dependencies
	 */
	var DB                 = require('DB/DBManager');
	var ItemType           = require('DB/Items/ItemType');
	var jQuery             = require('Utils/jquery');
	var Client             = require('Core/Client');
	var Preferences        = require('Core/Preferences');
	var Renderer           = require('Renderer/Renderer');
	var Mouse              = require('Controls/MouseEventHandler');
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
	 * @var {number} used to remember the window height
	 */
	var _realSize = 0;


	/**
	 * @var {Preferences} structure
	 */
	var _preferences = Preferences.get('Inventory', {
		x:        200,
		y:        200,
		width:    7,
		height:   4,
		show:     false,
		reduce:   false,
		tab:      Inventory.TAB.USABLE
	}, 1.0);


	/**
	 * Initialize UI
	 */
	Inventory.init = function Init()
	{
		// Don't activate drag drop when clicking on buttons
		this.ui.find('.titlebar .base').mousedown(function( event ){
			event.stopImmediatePropagation();
			return false;
		});

		// Bind buttons
		this.ui.find('.titlebar .mini').click(ToggleReduction.bind(this));
		this.ui.find('.tabs button').mousedown(SwitchTab);
		this.ui.find('.footer .extend').mousedown(OnResize.bind(this));
		this.ui.find('.titlebar .close').click(function(){
			Inventory.ui.hide();
			return false;
		});


		// on drop item
		this.ui
			.on('drop', OnDrop)
			.on('dragover', function(event){
				event.stopImmediatePropagation();
				return false;
			});

		var overlay = this.ui.find('.overlay');

		this.ui.find('.container .content')

			// Scroll feature should block at each line
			.on('mousewheel DOMMouseScroll', onScroll)

			// Title feature
			.on('mouseover', '.item', function(){
				var idx  = parseInt( this.getAttribute('data-index'), 10);
				var item = Inventory.getItemByIndex(idx);

				if (!item) {
					return;
				}

				// Get back data
				var it   = DB.getItemInfo( item.ITID );
				var pos  = jQuery(this).position();

				// Display box
				overlay.show();
				overlay.css({top: pos.top, left:pos.left+35});
				overlay.html( DB.getItemName(item) + ' ' + ( item.count || 1 ) + ' ea'
				);

				if (item.IsIdentified) {
					overlay.removeClass('grey');
				}
				else {
					overlay.addClass('grey');
				}
			})

			// Stop title feature
			.on('mouseout', '.item', function(){
				overlay.hide();
			})

			// Stop drag drop feature
			.on('mousedown', '.item', function(event){
				event.stopImmediatePropagation();
			})

			// Item drag drop feature
			.on('dragstart', '.item', function(event){
				// Set image to the drag drop element
				var img = new Image();
				var url = this.firstChild.style.backgroundImage.match(/\(([^\)]+)/)[1];
				img.src = url.replace(/^\"/, '').replace(/\"$/, '');

				event.originalEvent.dataTransfer.setDragImage( img, 12, 12 );

				var index = parseInt(this.getAttribute('data-index'), 10);
				var item  = Inventory.getItemByIndex(index);

				if (!item) {
					return;
				}

				event.originalEvent.dataTransfer.setData('Text',
					JSON.stringify( window._OBJ_DRAG_ = {
						type: 'item',
						from: 'inventory',
						data:  item
					})
				);

				// Stop component to be draggable
				jQuery(window).trigger('mouseup');
				overlay.hide();
			})

			// Clean up
			.on('dragend', '.item', function(){
				delete window._OBJ_DRAG_;
			})

			// Right click on item
			.on('contextmenu', '.item', function(event) {
				var index   = parseInt(this.getAttribute('data-index'), 10);
				var item    = Inventory.getItemByIndex(index);

				event.stopImmediatePropagation();

				if (!item) {
					return false;
				}

				// Don't add the same UI twice, remove it
				if (ItemInfo.uid === item.ITID) {
					ItemInfo.remove();
					return false;
				}

				// Add ui to window
				ItemInfo.append();
				ItemInfo.uid = item.ITID;
				ItemInfo.setItem(item);
				return false;
			})

			// Equip/Use item
			.on('dblclick', '.item', function(event) {
				var index = parseInt(this.getAttribute('data-index'), 10);
				var item  = Inventory.getItemByIndex(index);

				if (item) {
					Inventory.useItem(item);
					overlay.hide();
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
		if (!_preferences.show) {
			this.ui.hide();
		}

		Client.loadFile( DB.INTERFACE_PATH + 'basic_interface/tab_itm_0'+ (_preferences.tab+1) +'.bmp', function(data){
			Inventory.ui.find('.tabs').css('backgroundImage', 'url("' + data + '")');
		});

		this.resize( _preferences.width, _preferences.height );

		this.ui.css({
			top:  Math.min( Math.max( 0, _preferences.y), Renderer.height - this.ui.height()),
			left: Math.min( Math.max( 0, _preferences.x), Renderer.width  - this.ui.width())
		});

		_realSize = _preferences.reduce ? 0 : this.ui.height();
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
		_preferences.show   =  this.ui.is(':visible');
		_preferences.reduce = !!_realSize;
		_preferences.y      =  parseInt(this.ui.css('top'), 10);
		_preferences.x      =  parseInt(this.ui.css('left'), 10);
		_preferences.width  =  Math.floor( (this.ui.width()  - (23 + 16 + 16 - 30)) / 32 );
		_preferences.height =  Math.floor( (this.ui.height() - (31 + 19 - 30     )) / 32 );
		_preferences.save();
	};


	/**
	 * Process shortcut
	 *
	 * @param {object} key
	 */
	Inventory.onShortCut = function onShurtCut( key )
	{
		switch (key.cmd) {
			case 'TOGGLE':
				this.ui.toggle();
				if (this.ui.is(':visible')) {
					this.ui[0].parentNode.appendChild(this.ui[0]);
				}
				else { // Fix Mouse.intersect bug
					this.ui.trigger('mouseleave');
				}
				break;
		}
	};


	/**
	 * Extend inventory window size
	 */
	function OnResize( event )
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

			if (w === lastWidth && h === lastHeight) {
				return;
			}

			Inventory.resize( w, h );
			lastWidth  = w;
			lastHeight = h;

			//Show or hide scrollbar
			if (content.height() === content[0].scrollHeight) {
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
			if (event.which === 1) {
				clearInterval(_Interval);
			}
		});

		event.stopImmediatePropagation();
		return false;
	}


	/**
	 * Extend inventory window size
	 *
	 * @param {number} width
	 * @param {number} height
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
	function SwitchTab( event )
	{
		var idx          = jQuery(this).index();
		_preferences.tab = parseInt(idx, 10);

		Client.loadFile(DB.INTERFACE_PATH + 'basic_interface/tab_itm_0'+ (idx+1) +'.bmp', function(data){
			Inventory.ui.find('.tabs').css('backgroundImage', 'url(' + data + ')');
			Filter.call(Inventory, idx);
		});

		event.stopImmediatePropagation();
		return false;
	}


	/**
	 * Hide/show inventory's content
	 */
	function ToggleReduction( event )
	{
		// TODO: fix this part
		if (_realSize) {
			this.ui.find('.panel').show();
			this.ui.height(_realSize);
			_realSize = 0;
		}
		else {
			_realSize = this.ui.height();
			this.ui.height(17);
			this.ui.find('.panel').hide();
		}

		event.stopImmediatePropagation();
		return false;
	}


	/**
	 * Update tabulation
	 */
	function Filter()
	{
		this.ui.find('.container .content').empty();
		var i, count;

		for (i = 0, count = this.list.length; i < count; ++i) {
			this.addItemSub( this.list[i] );
		}
	}

	/**
	 * Search in a list for an item by its index
	 *
	 * @param {number} index
	 * @returns {Item}
	 */
	Inventory.getItemByIndex = function getItemByIndex( index )
	{
		var i, count;
		var list = Inventory.list;

		for (i = 0, count = list.length; i < count; ++i) {
			if (list[i].index === index) {
				return list[i];
			}
		}

		return null;
	};


	/**
	 * Drop an item from storage to inventory
	 *
	 * @param {event}
	 */
	function OnDrop( event )
	{
		var item, data;
		event.stopImmediatePropagation();

		try {
			data = JSON.parse(event.originalEvent.dataTransfer.getData('Text'));
			item = data.data;
		}
		catch(e) {
			return false;
		}

		// Just allow item from storage
		if (data.type !== 'item' || data.from !== 'storage') {
			return false;
		}

		// Have to specify how much
		if (item.count > 1) {
			InputBox.append();
			InputBox.setType('number', false, item.count);
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

		return false;
	}


	/**
	 * Block the scroll to move 32px at each move
	 */
	function onScroll( event )
	{
		var delta;

		if (event.originalEvent.wheelDelta) {
			delta = event.originalEvent.wheelDelta / 120 ;
			if (window.opera) {
				delta = -delta;
			}
		}
		else if (event.originalEvent.detail) {
			delta = -event.originalEvent.detail;
		}

		this.scrollTop = Math.floor(this.scrollTop/32) * 32 - (delta * 32);
		event.stopImmediatePropagation();
		return false;
	}


	/**
	 * Add items to the list
	 */
	Inventory.setItems = function SetItems(items)
	{
		var i, count;

		for (i = 0, count = items.length; i < count ; ++i) {
			if (this.addItemSub( items[i] )) {
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
		var object = this.getItemByIndex(item.index);

		if (object) {
			object.count += item.count;
			this.ui.find('.item[data-index="'+ item.index +'"] .count').text( object.count );
			this.onUpdateItem(object.ITID, object.count);
			return;
		}

		if (this.addItemSub(item)) {
			this.list.push(item);
			this.onUpdateItem(item.ITID, item.count);
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

		switch (item.type) {
			case ItemType.HEALING:
			case ItemType.USABLE:
			case ItemType.USABLE_SKILL:
			case ItemType.USABLE_UNK:
				tab = Inventory.TAB.USABLE;
				break;

			case ItemType.WEAPON:
			case ItemType.EQUIP:
			case ItemType.PETEGG:
			case ItemType.PETEQUIP:
				tab = Inventory.TAB.EQUIP;
				break;

			default:
			case ItemType.ETC:
			case ItemType.CARD:
			case ItemType.AMMO:
				tab = Inventory.TAB.ETC;
				break;
		}

		// Equip item (if not arrow)
		if (item.WearState && item.type !== ItemType.AMMO && item.type !== ItemType.CARD) {
			Equipment.equip(item);
			return false;
		}

		if (tab === _preferences.tab) {
			var it      = DB.getItemInfo( item.ITID );
			var content = this.ui.find('.container .content');

			content.append(
				'<div class="item" data-index="'+ item.index +'" draggable="true">' +
					'<div class="icon"></div>' +
					'<div class="amount">'+ (item.count ? '<span class="count">' + item.count + '</span>' + ' ' : '') + '</div>' +
				'</div>'
			);

			if (content.height() < content[0].scrollHeight) {
				this.ui.find('.hide').hide();
			}
			else {
				this.ui.find('.hide').show();
			}

			Client.loadFile( DB.INTERFACE_PATH + 'item/' + ( item.IsIdentified ? it.identifiedResourceName : it.unidentifiedResourceName ) + '.bmp', function(data){
				content.find('.item[data-index="'+ item.index +'"] .icon').css('backgroundImage', 'url('+ data +')');
			});
		}

		return true;
	};


	/**
	 * Remove item from inventory
	 *
	 * @param {number} index in inventory
	 * @param {number} count
	 */
	Inventory.removeItem = function RemoveItem( index, count )
	{
		var item = this.getItemByIndex(index);

		// Emulator failed to complete the operation
		// do not remove item from inventory
		if (!item || count <= 0) {
			return null;
		}

		if (item.count) {
			item.count -= count;

			if (item.count > 0) {
				this.ui.find('.item[data-index="'+ item.index +'"] .count').text( item.count );
				this.onUpdateItem(item.ITID, item.count);
				return item;
			}
		}

		this.list.splice( this.list.indexOf(item), 1 );
		this.ui.find('.item[data-index="'+ item.index +'"]').remove();
		this.onUpdateItem(item.ITID, 0);

		var content = this.ui.find('.container .content');
		if (content.height() === content[0].scrollHeight) {
			this.ui.find('.hide').show();
		}

		return item;
	};


	/**
	 * Remove item from inventory
	 *
	 * @param {number} index in inventory
	 * @param {number} count
	 */
	Inventory.updateItem = function UpdateItem( index, count )
	{
		var item = this.getItemByIndex(index);

		if (!item) {
			return;
		}

		item.count = count;

		// Update quantity
		if (item.count > 0) {
			this.ui.find('.item[data-index="'+ item.index +'"] .count').text( item.count );
			this.onUpdateItem(item.ITID, item.count);
			return;
		}

		// no quantity, remove
		this.list.splice( this.list.indexOf(item), 1 );
		this.ui.find('.item[data-index="'+ item.index +'"]').remove();
		this.onUpdateItem(item.ITID, 0);

		var content = this.ui.find('.container .content');
		if (content.height() === content[0].scrollHeight) {
			this.ui.find('.hide').show();
		}
	};



	/**
	 * Use an item
	 *
	 * @param {Item} item
	 */
	Inventory.useItem = function UseItem( item )
	{
		switch (item.type) {

			// Usable item
			case ItemType.HEALING:
			case ItemType.USABLE:
			case ItemType.USABLE_UNK:
				Inventory.onUseItem( item.index );
				break;

			// Use card
			case ItemType.CARD:
				Inventory.onUseCard( item.index );
				break;

			case ItemType.USABLE_SKILL:
				break;

			// Equip item
			case ItemType.WEAPON:
			case ItemType.EQUIP:
			case ItemType.PETEQUIP:
			case ItemType.AMMO:
				if (item.IsIdentified && !item.IsDamaged) {
					Inventory.onEquipItem( item.index, item.location );
				}
				break;
		}

		return;
	};


	/**
	 * Get item object
	 *
	 * @param {number} id
	 * @returns {Item}
	 */
	Inventory.getItemById = function GetItemById( id )
	{
		var i, count;
		var list = Inventory.list;

		for (i = 0, count = list.length; i < count; ++i) {
			if (list[i].ITID === id) {
				return list[i];
			}
		}

		return null;
	};


	/**
	 * functions to define
	 */
	Inventory.onUseItem    = function OnUseItem(/* index */){};
	Inventory.onUseCard    = function onUseCard(/* index */){};
	Inventory.onEquipItem  = function OnEquipItem(/* index, location */){};
	Inventory.onUpdateItem = function OnUpdateItem(/* index, amount */){};


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(Inventory);
});