/**
 * UI/Components/ShortCut/ShortCut.js
 *
 * ShortCut windows component
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
	var SkillInfo          = require('DB/SkillInfo');
	var jQuery             = require('Utils/jquery');
	var Client             = require('Core/Client');
	var Preferences        = require('Core/Preferences');
	var Renderer           = require('Renderer/Renderer');
	var KEYS               = require('Controls/KeyEventHandler');
	var Mouse              = require('Controls/MouseEventHandler');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var ItemInfo           = require('UI/Components/ItemInfo/ItemInfo');
	var Inventory          = require('UI/Components/Inventory/Inventory');
	//var SkillInfoWindow  = require('UI/Components/SkillInfo/SkillInfo');
	//var SkillWindow      = require('UI/Components/Skill/Skill')
	var htmlText           = require('text!./ShortCut.html');
	var cssText            = require('text!./ShortCut.css');


	/**
	 * Create Component
	 */
	var ShortCut = new UIComponent( 'ShortCut', htmlText, cssText );


	/**
	 * @var {Array} ShortCut list
	 */
	var _list = [];


	/**
	 * @var {number} max number of rows
	 */
	var _rowCount = 0;


	/**
	 * @var {Preference} structure to save informations about shortcut
	 */
	var _preferences = Preferences.get('ShortCut', {
		x:        480,
		y:        0,
		size:     1,
	}, 1.0);


	/**
	 * Initialize UI
	 */
	ShortCut.init = function Init()
	{
		this.ui.find('.resize').mousedown(OnResize);

		this.ui.find('.close').click(function(event){
			ShortCut.ui.css('height', 0);
			_preferences.size = 0;
			_preferences.save();

			event.stopImmediatePropagation();
			return false;
		});

		// Dropping to the shortcut
		this.ui.on('drop', '.container', OnDrop);
		this.ui.on('dragover', '.container', function(){
			event.stopImmediatePropagation();
			return false;
		});

		// Drag from the shortcut from somewhere else
		this.ui.on('dragstart', '.icon', OnDrag);
		this.ui.on('dragend', '.icon', function(){
			delete window._OBJ_DRAG_;
		});

		// Click.
		this.ui.on('dblclick', '.icon', function(event){
			var index = parseInt(this.parentNode.getAttribute('data-index'), 10);
			ClickElement(index);
			event.stopImmediatePropagation();
			return false;
		});

		this.ui.on('contextmenu', '.icon', OnElementInfo);

		this.draggable();
	};


	/**
	 * Append to body
	 */
	ShortCut.onAppend = function OnAppend()
	{
		// Apply preferences
		this.ui.css({
			top:  Math.min( Math.max( 0, _preferences.y), Renderer.height - this.ui.height()),
			left: Math.min( Math.max( 0, _preferences.x), Renderer.width  - this.ui.width()),
			height: 34 * _preferences.size
		});
	};


	/**
	 * When removed, clean up
	 */
	ShortCut.onRemove = function OnRemove()
	{
		// Save preferences
		_preferences.y      = parseInt(this.ui.css('top'), 10);
		_preferences.x      = parseInt(this.ui.css('left'), 10);
		_preferences.size   = Math.floor( parseInt(this.ui.css('height'),10) / 34 );
		_preferences.save();
	};


	/**
	 * Request to clean the list
	 * Used only from MapEngine when exiting the game
	 */
	ShortCut.clean = function Clean()
	{
		_list.length = 0;
		this.ui.find('.container').empty();
	};


	/**
	 * Key Listener
	 *
	 * @param {object} event
	 * @return {boolean}
	 */
	ShortCut.onKeyDown = function OnKeyDown( event )
	{
		switch (event.which)
		{
			// TODO: remove KEYS.Fx and replace with user settings
			case KEYS.F1:  ClickElement(0); break;
			case KEYS.F2:  ClickElement(1); break;
			case KEYS.F3:  ClickElement(2); break;
			case KEYS.F4:  ClickElement(3); break;
			case KEYS.F5:  ClickElement(4); break;
			case KEYS.F6:  ClickElement(5); break;
			case KEYS.F7:  ClickElement(6); break;
			case KEYS.F8:  ClickElement(7); break;
			case KEYS.F9:  ClickElement(8); break;

			case KEYS.F12:
				_preferences.size = (_preferences.size + 1) % (_rowCount + 1);
				_preferences.save();
				this.ui.css('height', _preferences.size * 34 );
				break;

			default:
				return true;
		}

		event.stopImmediatePropagation();
		return false;
	};


	/**
	 * Bind UI with list of shortcut
	 *
	 * @param {Array} shortcut list
	 */
	ShortCut.setList = function SetList( list )
	{
		var i, count;

		this.ui.find('.container').empty();
		_list.length = list.length;
		_rowCount    = Math.min( 4, Math.floor(list.length / 9) );

		for (i = 0, count = list.length; i < count; ++i) {
			if (list[i].ID) {
				AddElement( i, list[i].isSkill, list[i].ID, list[i].count )
			}
		}
	};


	/**
	 * Resizing hotkey window
	 */
	function OnResize()
	{
		var ui      = ShortCut.ui;
		var top     = ui.position().top;
		var lastHeight = 0;
		var _Interval;

		function Resizing()
		{
			var h = Math.floor( (Mouse.screen.y - top ) / 34 + 1 );

			// Maximum and minimum window size
			h = Math.min( Math.max(h, 1), _rowCount);

			if (h === lastHeight) {
				return;
			}

			ui.css('height', h * 34);
			_preferences.size = h;
			_preferences.save();
			lastHeight = h;
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
	 * Add an element to shortcut
	 *
	 * @param {number} index of the element
	 * @param {boolean} is a skill ?
	 * @param {number} ID
	 * @param {number} count or level
	 */
	function AddElement( index, isSkill, ID, count )
	{
		var file, name;
		var ui = ShortCut.ui.find('.container:eq(' + index + ')').empty();

		if (!_list[index]) {
			_list[index] = {};
		}

		_list[index].isSkill = isSkill;
		_list[index].ID      = ID;
		_list[index].count   = count;

		if (isSkill) {
			file = SkillInfo[ID].Name;
			name = SkillInfo[ID].SkillName;
		}
		else {
			var item = DB.getItemInfo(ID)
			file     = item.identifiedResourceName;
			name     = item.identifiedDisplayName;
			var it   = Inventory.getItemById(ID);

			// Do not display items not int inventory
			if (!it) {
				return;
			}

			// If equipment, do not display count
			else if (it.type === Inventory.ITEM.WEAPON || it.type === Inventory.ITEM.EQUIP) {
				count = 1;
			}

			// Get item count
			else {
				count = it.count;
			}

			// Do not display item if there is none in the inventory
			if (!count) {
				return;
			}
		}

		Client.loadFile( DB.INTERFACE_PATH + 'item/' + file + '.bmp', function(data){
			ui.html(
				'<div draggable="true" class="icon">' +
					'<div class="img" style="background-image:url(' + data + ')"></div>' +
					'<div class="amount">'+ count + '</div>' +
					'<span class="name">' + name + '</span>' +
				'</div>'
			);
		});
	}


	/**
	 * Remove an element from shortcut
	 *
	 * @param {boolean} is a skill ?
	 * @param {number} ID of the element to remove
	 * @param {number} row id
	 */
	function RemoveElement( isSkill, ID, row )
	{
		var i, count;

		// Do not need to modify empty slot
		if (!ID) {
			return;
		}

		for (i = row * 9, count = Math.min(_list.length, row * 9 + 9); i < count; ++i) {
			if (_list[i] && _list[i].isSkill == isSkill && _list[i].ID === ID) {
				ShortCut.ui.find('.container:eq(' + i + ')').empty();
				_list[i].isSkill = 0;
				_list[i].ID      = 0;
				_list[i].count   = 0;

				ShortCut.onChange( i, 0, 0, 0);
			}
		}
	}


	/**
	 * Set element data
	 *
	 * @param {boolean} is a skill ?
	 * @param {number} id
	 * @param {number} count
	 */
	ShortCut.setElement = function SetElement( isSkill, ID, count )
	{
		var i, count;

		for (i = 0, count = _list.length; i < count; ++i) {
			if (_list[i] && _list[i].isSkill == isSkill && _list[i].ID === ID) {
				AddElement( i, isSkill, ID, count);
			}
		}
	};


	/**
	 * Drop something in the shortcut
	 * Does the client allow other source than shortcut, inventory
	 * and skill window to save to shortcut ?
	 */
	function OnDrop( event )
	{
		var data, element;
		var index = parseInt(this.getAttribute('data-index'), 10);
		var row   = Math.floor( index / 9 );

		event.stopImmediatePropagation();

		try {
			data    = JSON.parse(event.originalEvent.dataTransfer.getData("Text"));
			element = data.data;
		}
		catch(e) {
			return false;
		}

		// Do not process others things than item and skill
		if (data.type !== "item" && data.type !== "skill") {
			return false;
		}

		// Do not process things that don't come from inventory, skill window and shortcut itself
		if (data.from !== "inventory" && data.from !== "skill" && data.from !== "shortcut") {
			return false;
		}

		// Process
		if (data.from === 'skill') {
			ShortCut.onChange( index, true, element.SKID, element.level);
			RemoveElement( true, element.SKID, row);
			AddElement( index, true, element.SKID, element.level);
		}
		else if (data.from === 'inventory') {
			ShortCut.onChange( index, false, element.ITID, 0);
			RemoveElement( false, element.ITID, row);
			AddElement( index, false, element.ITID, 0);
		}
		else if (data.from === 'shortcut') {
			ShortCut.onChange( index, element.isSkill, element.ID, 0);
			RemoveElement( element.isSkill, element.ID, row);
			AddElement( index, element.isSkill, element.ID, 0);
		}

		return false;
	}


	/**
	 * Prepare data to be store in the dragged element
	 * to change prosition in the shortcut.
	 */
	function OnDrag( event )
	{
		var img, index;

		index  = parseInt(this.parentNode.getAttribute('data-index'), 10);

		// Extract image from css to get it when dragging the element
		img     = new Image();
		img.src = this.firstChild.style.backgroundImage.match(/\(([^\)]+)/)[1];
		event.originalEvent.dataTransfer.setDragImage( img, 12, 12 );

		event.originalEvent.dataTransfer.setData("Text",
			JSON.stringify( window._OBJ_DRAG_ = {
				type: _list[index].isSkill ? "skill" : "item",
				from: "shortcut",
				data:  _list[index]
			})
		);

		// Stop component to be draggable
		jQuery(window).trigger('mouseup');
	}


	/**
	 * Get informations from a skill/item when
	 * using right click on it.
	 */
	function OnElementInfo( event )
	{
		var index   = parseInt(this.parentNode.getAttribute('data-index'), 10);
		var element = _list[index];

		event.stopImmediatePropagation();

		// Display skill informations
		if (element.isSkill) {
/*
			if (SkillInfoWindow.uid === _list[index].ID) {
				SkillInfoWindow.remove();
				return false;
			}

			SkillInfoWindow.append();
			SkillInfoWindow.uid = _list[index].ID;
			SkillInfoWindow.setSkill( _list[index] );
*/
		}

		// Display item informations
		else {

			if( ItemInfo.uid === _list[index].ID ) {
				ItemInfo.remove();
				return false;
			}

			ItemInfo.append();
			ItemInfo.uid = _list[index].ID;
			ItemInfo.setItem(Inventory.getItemById(_list[index].ID ));
		}

		return false;
	}


	/**
	 * Clicking on a shortcut
	 *
	 * @param {number} shortcut index
	 */
	function ClickElement( index )
	{
		var shortcut = _list[index];

		// Nothing here ?
		if (!shortcut) {
			return;
		}

		// Execute skill
		if (shortcut.isSkill) {
			//SkillWindow.useSkill( _list[index].ID, _list[index].count );
		}

		// Use the item
		else {
			var item = Inventory.getItemById( _list[index].ID );
			if (item) {
				Inventory.useItem( item );
			}
		}
	}


	/**
	 * Hook Inventory, get informations when there is a change
	 * to update the shortcut
	 *
	 * @param {number} index
	 * @param {number} count
	 */
	Inventory.onUpdateItem = function( index, count)
	{
		ShortCut.setElement( false, index, count);
	};


	/**
	 * Method to define to notify a change.
	 *
	 * @param {number} index
	 * @param {boolean} isSkill
	 * @param {number} id
	 * @param {number} count
	 */
	ShortCut.onChange   = function OnConfigUpdate(index, isSkill, ID, count){};


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(ShortCut);
});