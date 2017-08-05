/**
 * UI/Components/VendingShop/VendingShop.js
 *
 * Character VendingShop Inventory
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 * In some cases the client will send packet twice.eg NORMAL_ITEMLIST4; fixit [skybook888] 
 *
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
	var Network          = require('Network/NetworkManager');
	var PACKET           = require('Network/PacketStructure');	
	var Client             = require('Core/Client');
	var Preferences        = require('Core/Preferences');
	var Mouse              = require('Controls/MouseEventHandler');
	var Renderer           = require('Renderer/Renderer');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var ItemInfo           = require('UI/Components/ItemInfo/ItemInfo');
	var Session    			= require('Engine/SessionStorage');
	var Vending          = require('UI/Components/Vending/Vending');
	var htmlText           = require('text!./VendingShop.html');
	var cssText            = require('text!./VendingShop.css');
	var getModule          = require;


	/**
	 * Create Component
	 */
	var VendingShop = new UIComponent( 'VendingShop', htmlText, cssText );



	/**
	 * Store inventory items
	 */
	VendingShop.list = [];


	/**
	 * @var {number} used to remember the window height
	 */
	var _realSize = 0;
	
	
	var _vendcount = 0;


	/**
	 * @var {Preferences} structure
	 */
	var _preferences = Preferences.get('VendingShop', {
		x:        200,
		y:        200,
		width:    8,
		height:   2,
		reduce:   false
	}, 1.0);


	/**
	 * Initialize UI
	 */
	VendingShop.init = function Init()
	{
		// Bind buttons
		this.ui.find('.btn.close').click(function(){
			VendingShop.onSubmit();
		});
		// on drop item
		this.ui
			.on('drop',     onDrop)
			.on('dragover', stopPropagation)

		// Items event
			.find('.container .content')
				.on('mousewheel DOMMouseScroll', onScroll)
				.on('mouseover',   '.item', onItemOver)
				.on('mouseout',    '.item', onItemOut)
				.on('dragstart',   '.item', onItemDragStart)
				.on('dragend',     '.item', onItemDragEnd)
				.on('contextmenu', '.item', onItemInfo)
				.on('dblclick',    '.item', onItemUsed);

		this.draggable(this.ui.find('.titlebar'));
	};
	

	/**
	 * Apply preferences once append to body
	 */
	VendingShop.onAppend = function OnAppend()
	{
		this.resize( _preferences.width, _preferences.height );

		this.ui.css({
			top:  Math.min( Math.max( 0, _preferences.y), Renderer.height - this.ui.height()),
			left: Math.min( Math.max( 0, _preferences.x), Renderer.width  - this.ui.width())
		});

		_realSize = _preferences.reduce ? 0 : this.ui.height();
		
		this.ui.find('.text.shopname').text("My Shop : "+Vending._shopname);
	};


	/**
	 * Remove Inventory from window (and so clean up items)
	 */
	VendingShop.onRemove = function OnRemove()
	{
	
		this.ui.find('.container .content').empty();
		this.list.length = 0;
		jQuery('.ItemInfo').remove();

		// Save preferences
		_preferences.reduce = !!_realSize;
		_preferences.y      =  parseInt(this.ui.css('top'), 10);
		_preferences.x      =  parseInt(this.ui.css('left'), 10);
		_preferences.width  =  Math.floor( (this.ui.width()  - (23 + 16 + 16 - 30)) / 32 );
		_preferences.height =  Math.floor( (this.ui.height() - (31 + 19 - 30     )) / 32 );
		_preferences.save();
		
		this.ui.hide();
		
	};


	/**
	 * Extend inventory window size
	 *
	 * @param {number} width
	 * @param {number} height
	 */
	VendingShop.resize = function Resize( width, height )
	{
		width  = Math.min( Math.max(width,  6), 9);
		height = Math.min( Math.max(height, 2), 6);

		this.ui.find('.container .content').css({
			width:  width  * 32 + 13, // 13 = scrollbar
			height: height * 32
		});

		this.ui.css({
			width:  16 + 16 + width  * 32,
			height: 31 + 19      + height * 32
		});
	};


	/**
	 * Get item object
	 *
	 * @param {number} id
	 * @returns {Item}
	 */
	VendingShop.getItemById = function GetItemById( id )
	{
		var i, count;
		var list = VendingShop.list;

		for (i = 0, count = list.length; i < count; ++i) {
			if (list[i].ITID === id) {
				return list[i];
			}
		}

		return null;
	};


	/**
	 * Search in a list for an item by its index
	 *
	 * @param {number} index
	 * @returns {Item}
	 */
	VendingShop.getItemByIndex = function getItemByIndex( index )
	{
		var i, count;
		var list = VendingShop.list;

		for (i = 0, count = list.length; i < count; ++i) {
			if (list[i].index === index) {
				return list[i];
			}
		}

		return null;
	};


	/**
	 * Add items to the list
	 * if the item index is exist you should clear it;[skybook888]
	 */
	VendingShop.setItems = function setItems(items)
	{
		var i, count;
		
		for (i = 0, count = items.length; i < count ; ++i) {
			var object= this.getItemByIndex(items[i].index);
			if(object){
				var item=this.removeItem(object.index,object.count);
			}
			if(this.addItemSub(items[i])){
				this.list.push(items[i]);
			}
		}
		
		this.ui.show();
	};
	

	/**
	 * Insert Item to inventory
	 *
	 * @param {object} Item
	 */
	VendingShop.addItem = function AddItem( item )
	{
		var object = this.getItemByIndex(item.index);
		//console.log("add");

		if (object) {
			object.count += item.count;
			this.ui.find('.item[data-index="'+ item.index +'"] .count').text( object.count );
			return;
		}

		object = jQuery.extend({}, item);
		if (this.addItemSub(object)) {
			this.list.push(object);
		}
	};


	/**
	 * Add item to inventory
	 *
	 * @param {object} Item
	 */
	VendingShop.addItemSub = function AddItemSub( item )
	{
		// Equip item (if not arrow)
		if (item.WearState && item.type !== ItemType.AMMO && item.type !== ItemType.CARD) {
			//Equipment.equip(item);
			return false;
		}

			var it      = DB.getItemInfo( item.ITID );
			var content = this.ui.find('.container .content');

			content.append(
				'<div class="item" data-index="'+ item.index +'" draggable="true">' +
					'<div class="icon"></div>' +
					'<div class="amount"><span class="count">' + (item.count || 1) + '</span></div>' +
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
		return true;
	};


	/**
	 * Remove item from inventory
	 *
	 * @param {number} index in inventory
	 * @param {number} count
	 */
	VendingShop.removeItem = function RemoveItem( index, count )
	{
		var i,ctr;
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
				return item;
			}
		}
		
		this.list.splice( this.list.indexOf(item), 1 );
		this.ui.find('.item[data-index="'+ item.index +'"]').remove();

		ctr = 0;
		for(i=0; i < this.list.length; i++)
		{
			if(this.list[i].count > 0)
			{
				ctr++;
			}			
		}
		
		if(ctr == 0)
		{
			this.onSubmit();
		}
/*
		var content = this.ui.find('.container .content');
		if (content.height() === content[0].scrollHeight) {
			this.ui.find('.hide').show();
		}
*/
		return item;
	};
	

	/**
	 * Remove item from inventory
	 *
	 * @param {number} index in inventory
	 * @param {number} count
	 */
	VendingShop.updateItem = function UpdateItem( index, count )
	{
		var item = this.getItemByIndex(index);

		if (!item) {
			return;
		}

		item.count = count;

		// Update quantity
		if (item.count > 0) {
			this.ui.find('.item[data-index="'+ item.index +'"] .count').text( item.count );
			return;
		}

		// no quantity, remove
		this.list.splice( this.list.indexOf(item), 1 );
		this.ui.find('.item[data-index="'+ item.index +'"]').remove();

		var content = this.ui.find('.container .content');
		if (content.height() === content[0].scrollHeight) {
			this.ui.find('.hide').show();
		}
	};



	/**
	 * Stop event propagation
	 */
	function stopPropagation( event )
	{
		event.stopImmediatePropagation();
		return false;
	}

	/**
	 * Hide/show inventory's content
	 */
	function onToggleReduction()
	{
		var ui = VendingShop.ui;

		if (_realSize) {
			ui.find('.panel').show();
			ui.height(_realSize);
			_realSize = 0;
		}
		else {
			_realSize = ui.height();
			ui.height(17);
			ui.find('.panel').hide();
		}
	}


	/**
	 * Update tab, reset inventory content
	 */
	function requestFilter()
	{
		VendingShop.ui.find('.container .content').empty();

		var list = VendingShop.list;
		var i, count;

		for (i = 0, count = list.length; i < count; ++i) {
			VendingShop.addItemSub( list[i] );
		}
	}


	/**
	 * Drop an item from storage to inventory
	 *
	 * @param {event}
	 */
	function onDrop( event )
	{
		event.stopImmediatePropagation();
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
	 * Show item name when mouse is over
	 */
	function onItemOver()
	{
		var idx  = parseInt( this.getAttribute('data-index'), 10);
		var item = VendingShop.getItemByIndex(idx);

		if (!item) {
			return;
		}

		// Get back data
		var pos     = jQuery(this).position();
		var overlay = VendingShop.ui.find('.overlay');

		// Display box
		overlay.show();
		overlay.css({top: pos.top, left:pos.left+35});
		overlay.text(DB.getItemName(item) + ' ' + (item.count || 1) + ' ea');

		if (item.IsIdentified) {
			overlay.removeClass('grey');
		}
		else {
			overlay.addClass('grey');
		}
	}


	/**
	 * Hide the item name
	 */
	function onItemOut()
	{
		VendingShop.ui.find('.overlay').hide();
	}


	/**
	 * Start dragging an item
	 */
	function onItemDragStart( event )
	{
		return;
	}


	/**
	 * Stop dragging an item
	 *
	 */
	function onItemDragEnd()
	{
		delete window._OBJ_DRAG_;
	}


	/**
	 * Get item info (open description window)
	 */
	function onItemInfo( event )
	{
		event.stopImmediatePropagation();

		var index = parseInt(this.getAttribute('data-index'), 10);
		var item  = VendingShop.getItemByIndex(index);

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
	}


	/**
	 * Ask to use an item
	 */
	function onItemUsed( event )
	{
		var index = parseInt(this.getAttribute('data-index'), 10);
		var item  = VendingShop.getItemByIndex(index);

		if (item) {
			VendingShop.useItem(item);
			onItemOut();
		}

		event.stopImmediatePropagation();
		return false;
	}
	
	/**
	 * Submit data to send items
	 */
	VendingShop.onSubmit = function onSubmit()
	{
		var pkt;
		pkt   = new PACKET.CZ.REQ_CLOSESTORE();
		Network.sendPacket(pkt);
		this.onRemove();
	};	
	
	

	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(VendingShop);
});