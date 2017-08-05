/**
 * UI/Components/Vending/Vending.js
 *
 * Chararacter Basic information windows
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
	var jQuery       = require('Utils/jquery');
	var DB           = require('DB/DBManager');
	var Network          = require('Network/NetworkManager');
	var PACKET           = require('Network/PacketStructure');	
	var ItemType     = require('DB/Items/ItemType');
	var Client       = require('Core/Client');
	var Preferences  = require('Core/Preferences');
	var Session      = require('Engine/SessionStorage');
	var Mouse        = require('Controls/MouseEventHandler');
	var KEYS         = require('Controls/KeyEventHandler');
	var UIManager    = require('UI/UIManager');
	var UIComponent  = require('UI/UIComponent');
	var ItemInfo     = require('UI/Components/ItemInfo/ItemInfo');
	var InputBox     = require('UI/Components/InputBox/InputBox');
	var ChatBox      = require('UI/Components/ChatBox/ChatBox');
	var CartItems          = require('UI/Components/CartItems/CartItems');
	var htmlText     = require('text!./Vending.html');
	var cssText      = require('text!./Vending.css');


	/**
	 * Create NPC Menu component
	 */
	var Vending = new UIComponent( 'Vending', htmlText, cssText );



	/**
	 * Freeze the mouse
	 */
	//Vending.mouseMode = UIComponent.MouseMode.FREEZE;


	/**
	 * @var {Preferences} 
	 */
	var _preferences = Preferences.get('Vending', {
		inputWindow: {
			x:    100,
			y:    100,
			height: 2
		},
		outputWindow: {
			x:    100 + 280 + 10,
			y:    100 + (7*32) - (2*32),
			height: 5
		},
		select_all: false
	}, 1.0);


	/**
	 * @var {Array} item list
	 */
	var _input = [];


	/**
	 * @var {Array} output list
	 */
	var _output = [];


	/**
	 * @var {number} type (buy/sell)
	 */
	var _type;
	
	var _shopname = '';


	/**
	 * Initialize component
	 */
	Vending.init = function init()
	{
		var ui           = this.ui;
		var InputWindow  = ui.find('.InputWindow');
		var OutputWindow = ui.find('.OutputWindow');

		// Client do not send packet
		//ui.find('.btn.cancel').click(this.remove.bind(this));
		ui.find('.btn.sell').click(function(){
			Vending.onSubmit();
		});
		this.ui.find('.btn.cancel').click(function(){
			Vending.onRemove();
		});


		// Items options
		ui.find('.content')
			.on('mousewheel DOMMouseScroll', onScroll)
			.on('contextmenu',      '.icon', onItemInfo)
			.on('dblclick',         '.item', onItemSelected)
			.on('mousedown',        '.item', onItemFocus)
			.on('dragstart',        '.item', onDragStart)
			.on('dragend',          '.item', function(){
				delete window._OBJ_DRAG_;
			});

		// Drop items
		ui.find('.InputWindow, .OutputWindow')
			.on('drop', onDrop)
			.on('dragover', function(event) {
				event.stopImmediatePropagation();
				return false;
			})
			.on('mousedown', function(){
				Vending.focus();
			});

		// Hacky drag drop
		this.draggable.call({ui: InputWindow },  InputWindow.find('.titlebar'));
		this.draggable.call({ui: OutputWindow }, OutputWindow.find('.titlebar'));
		
	};


	/**
	 * Player should not be able to move when the store is opened
	 */
	Vending.onAppend = function onAppend()
	{
		var InputWindow  = this.ui.find('.InputWindow');
		var OutputWindow = this.ui.find('.OutputWindow');

		InputWindow.css({  top:  _preferences.inputWindow.y,  left: _preferences.inputWindow.x });
		OutputWindow.css({ top:  _preferences.outputWindow.y, left: _preferences.outputWindow.x });

		resize( InputWindow.find('.content'),  _preferences.inputWindow.height );
		resize( OutputWindow.find('.content'), _preferences.outputWindow.height );

		// Seems like "EscapeWindow" is execute first, push it before.
		//var events = jQuery._data( window, 'events').keydown;
		//events.unshift( events.pop() );
		
		this.ui.hide();
	};
	
	/**
	 * Resize the content
	 *
	 * @param {jQueryElement} content
	 * @param {number} height
	 */
	function resize( content, height )
	{
		height = Math.min( Math.max(height, 2), 9);
		content.css('height', height * 32);
	}	


	/**
	 * Released movement and save preferences
	 */
	Vending.onRemove = function onRemove()
	{
		
		var InputWindow  = this.ui.find('.InputWindow');
		var OutputWindow = this.ui.find('.OutputWindow');

		_input.length    = 0;
		_output.length   = 0;

		_preferences.inputWindow.x       = parseInt( InputWindow.css('left'), 10);
		_preferences.inputWindow.y       = parseInt( InputWindow.css('top'), 10);
		_preferences.inputWindow.height  = InputWindow.find('.content').height() / 32 | 0;

		_preferences.outputWindow.x      = parseInt( OutputWindow.css('left'), 10);
		_preferences.outputWindow.y      = parseInt( OutputWindow.css('top'), 10);
		_preferences.outputWindow.height = OutputWindow.find('.content').height() / 32 | 0;

		_preferences.save();

		this.ui.find('.content').empty();
		
		this.ui.hide();
	};


	/**
	 * Key Listener
	 *
	 * Remove the UI when Escape key is pressed
	 */
	Vending.onKeyDown = function onKeyDown( event )
	{
		if (event.which === KEYS.ESCAPE) {
			this.remove();
			event.stopImmediatePropagation();
			return false;
		}

		return true;
	};
	
	

	/**
	 * Add items to list
	 *
	 * @param {Array} item list
	 */
	Vending.setList = function setList( items )
	{
		var i, count;
		var it, item, out, content;

		this.ui.find('.content').empty();

		_input.length  = 0;
		_output.length = 0;
		
		
		content        = this.ui.find('.InputWindow .content');
		
		{		
				for (i = 0, count = items.length; i < count; ++i) {
					

					if (!('index' in items[i])) {
						items[i].index = i;
					}
					
					
					items[i].count        = items[i].count || Infinity;
					items[i].IsIdentified = true;
					out                   = jQuery.extend({}, items[i]);
					out.count             = 0;

					addItem( content, items[i], true);

					_input[items[i].index]  = items[i];
					_output[items[i].index] = out;
				}
		}
	};




	/**
	 * Prettify zeny : 1000000 -> 1,000,000
	 *
	 * @param {number} zeny
	 * @param {boolean} use color
	 * @return {string}
	 */
	function prettyZeny( val, useStyle )
	{
		
		var list = val.toString().split('');
		var i, count = list.length;
		var str = '';

		for (i = 0; i < count; i++) {
			str = list[count-i-1] + (i && i%3 ===0 ? ',' : '') + str;
		}

		if (useStyle) {
			var style = [
				'color:#000000; text-shadow:1px 0px #00ffff;', // 0 - 9
				'color:#0000ff; text-shadow:1px 0px #ce00ce;', // 10 - 99
				'color:#0000ff; text-shadow:1px 0px #00ffff;', // 100 - 999
				'color:#ff0000; text-shadow:1px 0px #ffff00;', // 1,000 - 9,999
				'color:#ff18ff;',                              // 10,000 - 99,999
				'color:#0000ff;',                              // 100,000 - 999,999
				'color:#000000; text-shadow:1px 0px #00ff00;', // 1,000,000 - 9,999,999
				'color:#ff0000;',                              // 10,000,000 - 99,999,999
				'color:#000000; text-shadow:1px 0px #cece63;', // 100,000,000 - 999,999,999
				'color:#ff0000; text-shadow:1px 0px #ff007b;', // 1,000,000,000 - 9,999,999,999
			];
			str = '<span style="' + style[count-1] + '">' + str + '</span>';
		}

		return str;
	}


	/**
	 * Add item to the list
	 *
	 * @param {jQuery} content element
	 * @param {Item} item info
	 */
	function addItem( content, item , isinput)
	{
		var it      = DB.getItemInfo(item.ITID);
		var element = content.find('.item[data-index='+ item.index +']:first');
		var price;

		// 0 as amount ? remove it
		if (item.count === 0) {
			if (element.length) {
				element.remove();
			}
			return;
		}

		// Already here, update it
		// Note: just the amount can be updated ?
		if (element.length) {
			element.find('.amount').text(isFinite(item.count) ? item.count : '');
			return;
		}

		if(isinput==false)price = prettyZeny(item.price, false);
		//price = item.price;

		// Create it
		if(isinput == true)
		{
			content.append(
				'<div class="item" draggable="true" data-index="'+ item.index +'">' +
					'<div class="icon"></div>' +
					'<div class="amount">' + (isFinite(item.count) ? item.count : '') + '</div>' +
					'<div class="name">'+ jQuery.escape(DB.getItemName(item)) +'</div>' +
				'</div>'
			);		
		}
		else
		{
			content.append(
				'<div class="item" draggable="true" data-index="'+ item.index +'">' +
					'<div class="icon"></div>' +
					'<div class="amount">' + (isFinite(item.count) ? item.count : '') + '</div>' +
					'<div class="name">'+ jQuery.escape(DB.getItemName(item)) +'</div>' +
					'<div class="price">Price: '+ price +'</div>' +
				'</div>'
			);		
		}


		// Add the icon once loaded
		Client.loadFile( DB.INTERFACE_PATH + 'item/' + (item.IsIdentified ? it.identifiedResourceName : it.unidentifiedResourceName) + '.bmp', function(data){
			content.find('.item[data-index="'+ item.index +'"] .icon').css('backgroundImage', 'url('+ data +')');
		});
	}


	/**
	 * Transfer item from input to output (or the inverse)
	 *
	 * @param {jQueryElement} from content (input / output)
	 * @param {jQueryElement} to content (input / output)
	 * @param {boolean} is adding the content to the output element
	 * @param {number} item index
	 * @param {number} amount
	 */
	var transferItem = function transferItemQuantityClosure()
	{
		var tmpItem = {
			ITID:   0,
			count:  0,
			price:  0,
			index:  0
		};

		return function transferItem(fromContent, toContent, isAdding, index, count)
		{
			// Add item to the list
			if (isAdding) {

				_output[index].count = Math.min( _output[index].count + count, _input[index].count);

				// Update input ui item amount
				tmpItem.ITID  = _input[index].ITID;
				tmpItem.count = _input[index].count - _output[index].count;
				tmpItem.price = _input[index].price;
				tmpItem.index = _input[index].index;

				addItem( fromContent, tmpItem, true);
				addItem( toContent, _output[index], false);
			}

			// Remove item
			else {
				count = Math.min(count, _output[index].count);
				if (!count) {
					return;
				}

				_output[index].count -= count;

				// Update input ui item amount
				tmpItem.ITID  = _input[index].ITID;
				tmpItem.count = _input[index].count + _output[index].count;
				tmpItem.price = _input[index].price;
				tmpItem.index = _input[index].index;

				addItem( fromContent, _output[index], false);
				addItem( toContent,   tmpItem, true);
			}

			//Vending.calculateCost();
		};
	}();


	/**
	 * Request move item from box to another
	 *
	 * @param {number} item index
	 * @param {jQueryElement} from the content
	 * @param {jQueryElement} to the content
	 * @param {boolean} add the content to the output box ?
	 */
	function requestMoveItem( index, fromContent, toContent, isAdding)
	{
		var item, count, item_price;
		var isStackable;

		item        = isAdding ? _input[index] : _output[index];
		
		isStackable = (
			item.type !== ItemType.WEAPON &&
			item.type !== ItemType.EQUIP  &&
			item.type !== ItemType.PETEGG &&
			item.type !== ItemType.PETEQUIP
		);

		if (isAdding) {
			count = isFinite(_input[index].count) ? _input[index].count : 1;
		}
		else {
			count = _output[index].count;
		}

		/*// Can't buy more than one same stackable item
		if ((_type === Vending.Type.BUY || _type === Vending.Type.VENDING_STORE) && !isStackable && isAdding) {
			if (toContent.find('.item[data-index="'+ item.index +'"]:first').length) {
				return false;
			}
		}*/

		// Just one item amount
		if (item.count === 1 || !isStackable/* || (_type === Vending.Type.SELL && _preferences.select_all)*/) {
			
			if(isAdding)
			{
				// Have to specify an price
				InputBox.append();
				InputBox.setType('price', false, item_price);
				InputBox.onSubmitRequest = function(item_price) {
					InputBox.remove();
					_output[index].price = item_price;
					if(item_price > 0)
					{
						transferItem(fromContent, toContent, isAdding, index, isFinite(item.count) ? item.count : 1 );
					}
				};
			}
			else
			{			
				transferItem(fromContent, toContent, isAdding, index, isFinite(item.count) ? item.count : 1 );
			}
			return false;
		}

		// Have to specify an amount
		InputBox.append();
		InputBox.setType('number', false, count);
		InputBox.onSubmitRequest = function(count) {
			InputBox.remove();
			if (count > 0) {
				
				if(isAdding)
				{
					// Have to specify an price
					InputBox.append();
					InputBox.setType('price', false, item_price);
					InputBox.onSubmitRequest = function(item_price) {
						InputBox.remove();
						_output[index].price = item_price;
						if(item_price > 0)
						{
							transferItem(fromContent, toContent, isAdding, index, count);
						}
					};
				}
				else
				{			
					transferItem(fromContent, toContent, isAdding, index, count);
				}
			}
		};
	}


	/**
	 * Drop an input in the InputWindow or OutputWindow
	 *
	 * @param {jQueryEvent} event
	 */
	function onDrop( event )
	{
		var data;

		event.stopImmediatePropagation();

		try {
			data  = JSON.parse(event.originalEvent.dataTransfer.getData('Text'));
		}
		catch(e) {
			return false;
		}

		// Just allow item from store
		if (data.type !== 'item' || data.from !== 'Vending' || data.container === this.className) {
			return false;
		}

		requestMoveItem(
			data.index,
			jQuery('.' + data.container + ' .content'),
			jQuery(this).find('.content'),
			this.className === 'OutputWindow'
		);

		return false;
	}


	/**
	 * Get informations about an item
	 */
	function onItemInfo(event)
	{
		var index = parseInt( this.parentNode.getAttribute('data-index'), 10);
		var item  = _input[index];

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
	}


	/**
	 * Select an item, put it on the other box
	 */
	function onItemSelected()
	{
		var input, from, to;

		if (_type === Vending.Type.BUY || _type === Vending.Type.VENDING_STORE) {
			return;
		}

		input = Vending.ui.find('.InputWindow:first');

		if (jQuery.contains(input.get(0), this)) {
			from = input;
			to   = Vending.ui.find('.OutputWindow:first');
		}
		else {
			from = Vending.ui.find('.OutputWindow:first');
			to   = input;
		}

		requestMoveItem(
			parseInt( this.getAttribute('data-index'), 10),
			from.find('.content:first'),
			to.find('.content:first'),
			from === input
		);
	}


	/**
	 * Focus an item
	 */
	function onItemFocus()
	{
		Vending.ui.find('.item.selected').removeClass('selected');
		jQuery(this).addClass('selected');
	}


	/**
	 * Update scroll by block (32px)
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
		return false;
	}


	/**
	 * Start dragging an item
	 */
	function onDragStart( event )
	{
		var container, img, url;
		var InputWindow, OutputWindow;

		InputWindow  = Vending.ui.find('.InputWindow:first').get(0);
		OutputWindow = Vending.ui.find('.OutputWindow:first').get(0);

		container = (jQuery.contains(InputWindow, this) ? InputWindow : OutputWindow).className;
		img       = new Image();
		url       = this.firstChild.style.backgroundImage.match(/\(([^\)]+)/)[1].replace(/"/g, '');
		img.src   = url;

		event.originalEvent.dataTransfer.setDragImage( img, 12, 12 );
		event.originalEvent.dataTransfer.setData('Text',
			JSON.stringify( window._OBJ_DRAG_ = {
				type:      'item',
				from:      'Vending',
				container: container,
				index:     this.getAttribute('data-index')
			})
		);
	}

	Vending.onVendingSkill = function onVendingSkill()
	{
		//console.log("Vending.onVendingSkill");
		this.setList(CartItems.list);
		this.ui.show();
	};


	Vending.onSubmit = function onSubmit()
	{
		
		var output;
		var i, count,shopname,ctr = 0;

		output = [];
		count  = _output.length;
		
		shopname = this.ui.find('.shopname').val();

		for (i = 0; i < count; ++i) {
			if (_output[i] && _output[i].count) {
				output.push(_output[i]);
				ctr++;
			}
		}
		
		if(ctr < 1)
		{
			this.onRemove();
			return;
		}		
	
        var pkt = new PACKET.CZ.REQ_OPENSTORE2();
		pkt.storeName = shopname;
		pkt.result = 1;
		pkt.storeList = output;
		
		if(!shopname)
		{
			InputBox.append();
			InputBox.setType('shopname', false, shopname);
			InputBox.onSubmitRequest = function(shopname) {
				InputBox.remove();
				pkt.storeName = shopname;
				if(shopname)
				{
					this._shopname = shopname;
					Network.sendPacket(pkt);
				}
			};
		}
		else
		{
			this._shopname = shopname;
			Network.sendPacket(pkt);
		}	
		
		this.onRemove();
		 
	};


	/**
	 * Create componentand export it
	 */
	return UIManager.addComponent(Vending);
});