/**
 * UI/Components/CartItems/CartItems.js
 *
 * Character CartItems Inventory
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
	var Client             = require('Core/Client');
	var Preferences        = require('Core/Preferences');
	var Renderer           = require('Renderer/Renderer');
	var Mouse              = require('Controls/MouseEventHandler');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var InputBox           = require('UI/Components/InputBox/InputBox');
	var ItemInfo           = require('UI/Components/ItemInfo/ItemInfo');
	var Session    			= require('Engine/SessionStorage');
	var htmlText           = require('text!./CartItems.html');
	var cssText            = require('text!./CartItems.css');
	var getModule          = require;


	/**
	 * Create Component
	 */
	var CartItems = new UIComponent( 'CartItems', htmlText, cssText );



	/**
	 * Store inventory items
	 */
	CartItems.list = [];


	/**
	 * @var {number} used to remember the window height
	 */
	var _realSize = 0;


	/**
	 * @var {Preferences} structure
	 */
	var _preferences = Preferences.get('CartItems', {
		x:        200,
		y:        200,
		width:    7,
		height:   4,
		show:     false,
		reduce:   false
	}, 1.0);


	/**
	 * Initialize UI
	 */
	CartItems.init = function Init()
	{
		// Bind buttons
		this.ui.find('.titlebar .base').mousedown(stopPropagation);
		this.ui.find('.titlebar .mini').click(onToggleReduction);
		this.ui.find('.footer .extend').mousedown(onResize);
		this.ui.find('.titlebar .close').click(function(){
			CartItems.ui.hide();
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
	CartItems.onAppend = function OnAppend()
	{
		if(Session.Entity.hasCart ==  false)
		{
			this.ui.hide();
		}
		
		// Apply preferences
		if (!_preferences.show) {
			this.ui.hide();
		}

		/*Client.loadFile( DB.INTERFACE_PATH + 'basic_interface/tab_itm_0'+ (_preferences.tab+1) +'.bmp', function(data){
			CartItems.ui.find('.tabs').css('backgroundImage', 'url("' + data + '")');
		});*/

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
	CartItems.onRemove = function OnRemove()
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
	CartItems.onShortCut = function onShurtCut( key )
	{
		console.log("CartItems.onShortCut : "+Session.Entity.hasCart);
		
		if(Session.Entity.hasCart ==  false)
		{
			return;
		}
		
		switch (key.cmd) {
			case 'TOGGLE':
				this.ui.toggle();
				if (this.ui.is(':visible')) {
					this.focus();
				}
				else {
					// Chrome bug
					// when clicking double clicking an a weapon to equip
					// the item disapear, if you don't move the mouse and
					// triggered ALT+E then, the window disapear and you
					// can't trigger the scene anymore
					this.ui.trigger('mouseleave');
				}
				break;
		}
	};


	/**
	 * Extend inventory window size
	 *
	 * @param {number} width
	 * @param {number} height
	 */
	CartItems.resize = function Resize( width, height )
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
	CartItems.getItemById = function GetItemById( id )
	{
		var i, count;
		var list = CartItems.list;

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
	CartItems.getItemByIndex = function getItemByIndex( index )
	{
		var i, count;
		var list = CartItems.list;

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
	CartItems.setItems = function SetItems(items)
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
		
	};
	

	CartItems.setCartInfo = function SetCartInfo(curCount, maxCount, curWeight, maxWeight)
	{
		this.ui.find('.ncnt').text(curCount);
		this.ui.find('.mcnt').text(maxCount);
		this.ui.find('.nwt').text(curWeight);
		this.ui.find('.mwt').text(maxWeight);
	};	


	/**
	 * Insert Item to inventory
	 *
	 * @param {object} Item
	 */
	CartItems.addItem = function AddItem( item )
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
	CartItems.addItemSub = function AddItemSub( item )
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
	CartItems.removeItem = function RemoveItem( index, count )
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
				return item;
			}
		}
		
		this.list.splice( this.list.indexOf(item), 1 );
		this.ui.find('.item[data-index="'+ item.index +'"]').remove();

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
	CartItems.updateItem = function UpdateItem( index, count )
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
	 * Extend inventory window size
	 */
	function onResize()
	{
		var ui      = CartItems.ui;
		var content = ui.find('.container .content');
		var hide    = ui.find('.hide');
		var top     = ui.position().top;
		var left    = ui.position().left;
		var lastWidth  = 0;
		var lastHeight = 0;
		var _Interval;

		function resizing()
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

			CartItems.resize( w, h );
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
		_Interval = setInterval( resizing, 30);

		// Stop resizing on left click
		jQuery(window).on('mouseup.resize', function(event){
			if (event.which === 1) {
				clearInterval(_Interval);
				jQuery(window).off('mouseup.resize');
			}
		});
	}



	/**
	 * Hide/show inventory's content
	 */
	function onToggleReduction()
	{
		var ui = CartItems.ui;

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
		CartItems.ui.find('.container .content').empty();

		var list = CartItems.list;
		var i, count;

		for (i = 0, count = list.length; i < count; ++i) {
			CartItems.addItemSub( list[i] );
		}
	}


	/**
	 * Drop an item from storage to inventory
	 *
	 * @param {event}
	 */
	function onDrop( event )
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
		if (data.type !== 'item' || (data.from !== 'Storage' && data.from !== 'Inventory')) {
			return false;
		}

		// Have to specify how much
		if (item.count > 1) {
			InputBox.append();
			InputBox.setType('number', false, item.count);
			InputBox.onSubmitRequest = function OnSubmitRequest( count ) {
				InputBox.remove();
				
					switch(data.from)
					{
					case 'Storage':
						getModule('UI/Components/Storage/Storage').reqMoveItemToCart(
							item.index,
							parseInt(count, 10 )
							);
					break;
					
					case 'Inventory':
						getModule('UI/Components/Inventory/Inventory').reqMoveItemToCart(
							item.index,
							parseInt(count, 10 )
							);
					break;					
				
					}					
			};
			return false;
		}

		switch(data.from)
		{
			case 'Storage':
				getModule('UI/Components/Storage/Storage').reqMoveItemToCart( item.index, 1 );
			break;
					
			case 'Inventory':
				getModule('UI/Components/Inventory/Inventory').reqMoveItemToCart( item.index, 1 );
			break;							
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
	 * Show item name when mouse is over
	 */
	function onItemOver()
	{
		var idx  = parseInt( this.getAttribute('data-index'), 10);
		var item = CartItems.getItemByIndex(idx);

		if (!item) {
			return;
		}

		// Get back data
		var pos     = jQuery(this).position();
		var overlay = CartItems.ui.find('.overlay');

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
		CartItems.ui.find('.overlay').hide();
	}


	/**
	 * Start dragging an item
	 */
	function onItemDragStart( event )
	{
		var index = parseInt(this.getAttribute('data-index'), 10);
		var item  = CartItems.getItemByIndex(index);

		if (!item) {
			return;
		}

		// Set image to the drag drop element
		var img   = new Image();
		var url   = this.firstChild.style.backgroundImage.match(/\(([^\)]+)/)[1];
		img.src   = url.replace(/^\"/, '').replace(/\"$/, '');

		event.originalEvent.dataTransfer.setDragImage( img, 12, 12 );
		event.originalEvent.dataTransfer.setData('Text',
			JSON.stringify( window._OBJ_DRAG_ = {
				type: 'item',
				from: 'CartItems',
				data:  item
			})
		);

		onItemOut();
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
		var item  = CartItems.getItemByIndex(index);

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
		var item  = CartItems.getItemByIndex(index);

		if (item) {
			CartItems.useItem(item);
			onItemOut();
		}

		event.stopImmediatePropagation();
		return false;
	}
	
	
	CartItems.reqRemoveItem   = function reqRemoveItem(){};

	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(CartItems);
});