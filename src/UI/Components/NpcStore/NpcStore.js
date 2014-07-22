/**
 * UI/Components/NpcStore/NpcStore.js
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
	var MsgStringIDs = require('DB/MsgStringIds');
	var ItemType     = require('DB/Items/ItemType');
	var Client       = require('Core/Client');
	var Preferences  = require('Core/Preferences');
	var Events       = require('Core/Events');
	var Session      = require('Engine/SessionStorage');
	var Mouse        = require('Controls/MouseEventHandler');
	var KEYS         = require('Controls/KeyEventHandler');
	var UIManager    = require('UI/UIManager');
	var UIComponent  = require('UI/UIComponent');
	var ItemInfo     = require('UI/Components/ItemInfo/ItemInfo');
	var InputBox     = require('UI/Components/InputBox/InputBox');
	var ChatBox      = require('UI/Components/ChatBox/ChatBox');
	var Inventory    = require('UI/Components/Inventory/Inventory');
	var htmlText     = require('text!./NpcStore.html');
	var cssText      = require('text!./NpcStore.css');


	/**
	 * Create NPC Menu component
	 */
	var NpcStore = new UIComponent( 'NpcStore', htmlText, cssText );


	/**
	 * @var {enum} Store type
	 */
	NpcStore.Type = {
		BUY:  0,
		SELL: 1
	};


	/**
	 * @var {Preferences} 
	 */
	var _preferences = Preferences.get('NpcStore', {
		inputWindow: {
			x:    100,
			y:    100,
			height: 7
		},
		outputWindow: {
			x:    100 + 280 + 10,
			y:    100 + (7*32) - (2*32),
			height: 2
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


	/**
	 * Initialize component
	 */
	NpcStore.init = function init()
	{
		var ui           = this.ui;
		var InputWindow  = ui.find('.InputWindow');
		var OutputWindow = ui.find('.OutputWindow');

		// Client do not send packet
		ui.find('.btn.cancel').click(this.remove.bind(this));
		ui.find('.btn.buy, .btn.sell').click(this.submit.bind(this));
		ui.find('.selectall').mousedown(function(){
			_preferences.select_all = !_preferences.select_all;

			Client.loadFile(DB.INTERFACE_PATH + 'checkbox_' + (_preferences.select_all ? 1 : 0) + '.bmp', function(data){
				this.style.backgroundImage = 'url('+ data +')';
			}.bind(this));
		});

		// Resize
		InputWindow.find('.resize').mousedown(function(event){ onResize(InputWindow); event.stopImmediatePropagation(); return false; });
		OutputWindow.find('.resize').mousedown(function(event){ onResize(OutputWindow); event.stopImmediatePropagation(); return false; });

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
			});

		// Hacky drag drop
		this.draggable.call({ui: InputWindow  });
		this.draggable.call({ui: OutputWindow });
	};


	/**
	 * Player should not be able to move when the store is opened
	 */
	NpcStore.onAppend = function onAppend()
	{
		var InputWindow  = this.ui.find('.InputWindow');
		var OutputWindow = this.ui.find('.OutputWindow');
		Mouse.intersect  = false;

		InputWindow.css({  top:  _preferences.inputWindow.y,  left: _preferences.inputWindow.x });
		OutputWindow.css({ top:  _preferences.outputWindow.y, left: _preferences.outputWindow.x });

		Client.loadFile(DB.INTERFACE_PATH + 'checkbox_' + (_preferences.select_all ? 1 : 0) + '.bmp', function(data){
			this.ui.find('.selectall:first').css('backgroundImage', 'url('+ data +')');
		}.bind(this));

		resize( InputWindow.find('.content'),  _preferences.inputWindow.height );
		resize( OutputWindow.find('.content'), _preferences.outputWindow.height );

		// Seems like "EscapeWindow" is execute first, push it before.
		var events = jQuery._data( window, 'events').keydown;
		events.unshift( events.pop() );
	};


	/**
	 * Released movement and save preferences
	 */
	NpcStore.onRemove = function onRemove()
	{
		var InputWindow  = this.ui.find('.InputWindow');
		var OutputWindow = this.ui.find('.OutputWindow');

		Mouse.intersect  = true;
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
		this.ui.find('.total .result').text(0);
	};


	/**
	 * Key Listener
	 *
	 * Remove the UI when Escape key is pressed
	 */
	NpcStore.onKeyDown = function onKeyDown( event )
	{
		if (event.which === KEYS.ESCAPE) {
			this.remove();
			event.stopImmediatePropagation();
			return false;
		}

		return true;
	};


	/**
	 * Specify the type of the shop
	 *
	 * @param {number} type (see NpcStore.Type.*)
	 */
	NpcStore.setType = function setType(type)
	{
		switch (type) {
			case NpcStore.Type.BUY:
				this.ui.find('.WinSell').hide();
				this.ui.find('.WinBuy').show();
				break;

			case NpcStore.Type.SELL:
				this.ui.find('.WinBuy').hide();
				this.ui.find('.WinSell').show();
				break;
		}

		_type = type;
	};


	/**
	 * Add items to list
	 *
	 * @param {Array} item list
	 */
	NpcStore.setList = function setList( items )
	{
		var i, count;
		var it, item, out, content;

		this.ui.find('.content').empty();
		this.ui.find('.total .result').text(0);

		_input.length  = 0;
		_output.length = 0;
		content        = this.ui.find('.InputWindow .content');

		switch (_type) {

			case NpcStore.Type.BUY:
				for (i = 0, count = items.length; i < count; ++i) {
					items[i].index        = i;
					items[i].count        = items[i].count || Infinity;
					items[i].IsIdentified = true;
					out                   = jQuery.extend({}, items[i]);
					out.count             = 0;

					addItem( content, items[i]);

					_input.push(items[i]);
					_output.push(out);
				}
				break;

			case NpcStore.Type.SELL:
				for (i = 0, count = items.length; i < count; ++i) {
					it = Inventory.getItemByIndex(items[i].index);

					if (it) {
						item                 = jQuery.extend({}, it);
						item.price           = items[i].price;
						item.overchargeprice = items[i].overchargeprice;
						item.count           = ('count' in item) ? item.count : 1;

						out                  = jQuery.extend({}, item);
						out.count            = 0;

						addItem( content, item);

						_input[item.index]  = item;
						_output[item.index] = out;
					}
				}
				break;
		}
	};


	/**
	 * Submit data to send items
	 */
	NpcStore.submit = function submit()
	{
		var output;
		var i, count;

		output = [];
		count  = _output.length;

		for (i = 0; i < count; ++i) {
			if (_output[i] && _output[i].count) {
				output.push(_output[i]);
			}
		}

		NpcStore.onSubmit( output );
	};


	/**
	 * Calculate the cost of all items in the output box
	 *
	 * @return {number}
	 */
	NpcStore.calculateCost = function calculateCost()
	{
		var i, count, total;

		total = 0;
		count = _output.length;

		for (i = 0; i < count; ++i) {
			if (_output[i]) {
				total += (_output[i].discountprice || _output[i].overchargeprice || _output[i].price) * _output[i].count;
			}
		}

		this.ui.find('.total .result').text(total);

		return total;
	};


	/**
	 * Add item to the list
	 *
	 * @param {jQuery} content element
	 * @param {Item} item info
	 */
	function addItem( content, item )
	{
		var it = DB.getItemInfo( item.ITID );
		var element = content.find('.item[data-index='+ item.index +']:first');

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


		// Create it
		content.append(
			'<div class="item" draggable="true" data-index="'+ item.index +'">' +
				'<div class="icon"></div>' +
				'<div class="amount">' + (isFinite(item.count) ? item.count : '') + '</div>' +
				'<div class="name">'+ it.identifiedDisplayName +'</div>' +
				'<div class="price">'+ (item.discountprice || item.overchargeprice || item.price) +'</div>' +
				'<div class="unity">Z</div>' +
			'</div>'
		);

		// Add the icon once loaded
		Client.loadFile( DB.INTERFACE_PATH + 'item/' + it.identifiedResourceName + '.bmp', function(data){
			content.find('.item[data-index="'+ item.index +'"] .icon').css('backgroundImage', 'url('+ data +')');
		});
	}


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
	 * Resizing window
	 *
	 * @param {jQueryElement} ui element
	 */
	function onResize( ui )
	{
		var top        = ui.position().top;
		var content    = ui.find('.content:first');
		var lastHeight = 0;
		var interval;

		function resizing()
		{
			var extraY = 31 + 19 - 30;
			var h = Math.floor( (Mouse.screen.y - top  - extraY) / 32 );

			// Maximum and minimum window size
			h = Math.min( Math.max(h, 2), 9);
			if (h === lastHeight) {
				return;
			}

			resize( content, h );
			lastHeight = h;
		}

		// Start resizing
		interval = setInterval( resizing, 30);

		// Stop resizing
		jQuery(window).one('mouseup', function(event){
			// Only on left click
			if (event.which === 1) {
				clearInterval(interval);
			}
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

				// You don't have enough zeny
				if (_type === NpcStore.Type.BUY) {
					if (NpcStore.calculateCost() + _input[index].discountprice * count > Session.zeny) {
						ChatBox.addText( DB.getMessage(MsgStringIDs.MSI_INSUFFICIENT_MONEY), ChatBox.TYPE.ERROR);
						return;
					}
				}

				_output[index].count = Math.min( _output[index].count + count, _input[index].count);

				// Update input ui item amount
				tmpItem.ITID  = _input[index].ITID;
				tmpItem.count = _input[index].count - _output[index].count;
				tmpItem.price = _input[index].price;
				tmpItem.index = _input[index].index;

				addItem( fromContent, tmpItem);
				addItem( toContent, _output[index]);
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

				addItem( fromContent, _output[index]);
				addItem( toContent,   tmpItem);
			}

			NpcStore.calculateCost();
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
		var item, count;
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

		// Can't buy more than one same stackable item
		if (_type === NpcStore.Type.BUY && !isStackable && isAdding) {
			if (toContent.find('.item[data-index="'+ item.index +'"]:first').length) {
				return false;
			}
		}

		// Just one item amount
		if (item.count === 1 || (_type === NpcStore.Type.SELL && _preferences.select_all) || !isStackable) {
			transferItem(fromContent, toContent, isAdding, index, isFinite(item.count) ? item.count : 1 );
			return false;
		}

		// Have to specify an amount
		InputBox.append();
		InputBox.setType('number', false, count);
		InputBox.onSubmitRequest = function(count) {
			InputBox.remove();
			if (count > 0) {
				transferItem(fromContent, toContent, isAdding, index, count);
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
		if (data.type !== 'item' || data.from !== 'store' || data.container === this.className) {
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

		if (_type === NpcStore.Type.BUY) {
			return;
		}

		input = NpcStore.ui.find('.InputWindow:first');

		if (jQuery.contains(input.get(0), this)) {
			from = input;
			to   = NpcStore.ui.find('.OutputWindow:first');
		}
		else {
			from = NpcStore.ui.find('.OutputWindow:first');
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
	var onItemFocus = function onItemFocusClosure()
	{
		var $window = jQuery(window);

		function stopDragDrop() {
			$window.trigger('mouseup');
		}

		return function onItemFocus( event )
		{
			NpcStore.ui.find('.item.selected').removeClass('selected');
			jQuery(this).addClass('selected');

			Events.setTimeout( stopDragDrop, 4);
			event.stopImmediatePropagation();
		};
	}();


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

		InputWindow  = NpcStore.ui.find('.InputWindow:first').get(0);
		OutputWindow = NpcStore.ui.find('.OutputWindow:first').get(0);

		container = (jQuery.contains(InputWindow, this) ? InputWindow : OutputWindow).className;
		img       = new Image();
		url       = this.firstChild.style.backgroundImage.match(/\(([^\)]+)/)[1].replace(/"/g, '');
		img.src   = url;

		event.originalEvent.dataTransfer.setDragImage( img, 12, 12 );
		event.originalEvent.dataTransfer.setData('Text',
			JSON.stringify( window._OBJ_DRAG_ = {
				type:      'item',
				from:      'store',
				container: container,
				index:     this.getAttribute('data-index')
			})
		);
	}


	/**
	 * Exports
	 */
	NpcStore.onSubmit = function onSubmit(/* itemList */) {};


	/**
	 * Create componentand export it
	 */
	return UIManager.addComponent(NpcStore);
});