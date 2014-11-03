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
	'use strict';


	/**
	 * Dependencies
	 */
	var DB                   = require('DB/DBManager');
	var ItemType             = require('DB/Items/ItemType');
	var SkillInfo            = require('DB/Skills/SkillInfo');
	var jQuery               = require('Utils/jquery');
	var Client               = require('Core/Client');
	var Preferences          = require('Core/Preferences');
	var Renderer             = require('Renderer/Renderer');
	var Mouse                = require('Controls/MouseEventHandler');
	var UIManager            = require('UI/UIManager');
	var UIComponent          = require('UI/UIComponent');
	var ItemInfo             = require('UI/Components/ItemInfo/ItemInfo');
	var Inventory            = require('UI/Components/Inventory/Inventory');
	var SkillWindow          = require('UI/Components/SkillList/SkillList');
	var SkillDescription     = require('UI/Components/SkillDescription/SkillDescription');
	var SkillTargetSelection = require('UI/Components/SkillTargetSelection/SkillTargetSelection');
	var htmlText             = require('text!./ShortCut.html');
	var cssText              = require('text!./ShortCut.css');


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
	ShortCut.init = function init()
	{
		this.ui.find('.resize').mousedown(onResize);
		this.ui.find('.close').mousedown(stopPropagation).click(onClose);

		this.ui
			// Dropping to the shortcut
			.on('drop',     '.container', onDrop)
			.on('dragover', '.container', stopPropagation)

			// Icons
			.on('dragstart',   '.icon', onDragStart)
			.on('dragend',     '.icon', onDragEnd)
			.on('dblclick',    '.icon', onUseShortCut)
			.on('contextmenu', '.icon', onElementInfo)
			.on('mousedown',   '.icon', function(event){
				event.stopImmediatePropagation();
			});

		this.draggable();
	};


	/**
	 * Append to body
	 */
	ShortCut.onAppend = function onAppend()
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
	ShortCut.onRemove = function onRemove()
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
	ShortCut.clean = function clean()
	{
		_list.length = 0;
		this.ui.find('.container').empty();
	};


	/**
	 * Process shortcut
	 *
	 * @param {object} key
	 */
	ShortCut.onShortCut = function onShurtCut( key )
	{
		switch (key.cmd.replace(/\d+$/, '')) {
			case 'EXECUTE':
				clickElement( parseInt( key.cmd.match(/\d+$/).toString(), 10) );
				break;

			case 'EXTEND':
				_preferences.size = (_preferences.size + 1) % (_rowCount + 1);
				_preferences.save();
				this.ui.css('height', _preferences.size * 34 );
				break;
		}
	};


	/**
	 * Bind UI with list of shortcut
	 *
	 * @param {Array} shortcut list
	 */
	ShortCut.setList = function setList( list )
	{
		var i, count;
		var skill;

		this.ui.find('.container').empty();
		_list.length = list.length;
		_rowCount    = Math.min( 4, Math.floor(list.length / 9) );

		for (i = 0, count = list.length; i < count; ++i) {
			if (list[i].isSkill) {
				skill = SkillWindow.getSkillById(list[i].ID);
				if (skill && skill.level) {
					addElement( i, true, list[i].ID, list[i].count || skill.level );
				}
				else {
					if (!_list[i]) {
						_list[i] = {};
					}

					_list[i].isSkill = true;
					_list[i].ID      = list[i].ID;
					_list[i].count   = list[i].count;
				}
			}
			else {
				addElement( i, list[i].isSkill, list[i].ID, list[i].count );
			}
		}
	};


	/**
	 * Set element data
	 *
	 * @param {boolean} is a skill ?
	 * @param {number} id
	 * @param {number} count
	 */
	ShortCut.setElement = function setElement( isSkill, ID, count )
	{
		var i, size;

		for (i = 0, size = _list.length; i < size; ++i) {
			if (_list[i] && _list[i].isSkill == isSkill && _list[i].ID === ID) {
				addElement( i, isSkill, ID, count);
			}
		}
	};


	/**
	 * Stop event propagation
	 */
	function stopPropagation(event)
	{
		event.stopImmediatePropagation();
		return false;
	}


	/**
	 * Resizing hotkey window
	 */
	function onResize( event )
	{
		var ui = ShortCut.ui;
		var top = ui.position().top;
		var lastHeight = 0;
		var _Interval;

		function resizing()
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
		_Interval = setInterval( resizing, 30);

		// Stop resizing on left click
		jQuery(window).on('mouseup.resize', function(event){
			if (event.which === 1) {
				clearInterval(_Interval);
				jQuery(window).off('mouseup.resize');
			}
		});

		return stopPropagation(event);
	}


	/**
	 * Add an element to shortcut
	 *
	 * @param {number} index of the element
	 * @param {boolean} is a skill ?
	 * @param {number} ID
	 * @param {number} count or level
	 */
	function addElement( index, isSkill, ID, count )
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
			// Do not display if no level.
			if (!count) {
				return;
			}

			file = SkillInfo[ID].Name;
			name = SkillInfo[ID].SkillName;
		}
		else {
			var item = Inventory.getItemById(ID);

			// Do not display items not in inventory
			if (!item) {
				return;
			}

			var it = DB.getItemInfo(ID);
			file   = item.IsIdentified ? it.identifiedResourceName : it.unidentifiedResourceName;
			name   = DB.getItemName(item);

			// If equipment, do not display count
			if (item.type === ItemType.WEAPON || item.type === ItemType.EQUIP) {
				count = 1;
			}

			// Get item count
			else {
				count = item.count;
			}

			// Do not display item if there is none in the inventory
			if (!count) {
				return;
			}
		}

		Client.loadFile( DB.INTERFACE_PATH + 'item/' + file + '.bmp', function(url){
			ui.html(
				'<div draggable="true" class="icon">' +
					'<div class="img"></div>' +
					'<div class="amount"></div>' +
					'<span class="name"></span>' +
				'</div>'
			);

			ui.find('.img').css('backgroundImage', 'url('+ url +')');
			ui.find('.amount').text(count);
			ui.find('.name').text(name);
		});
	}


	/**
	 * Remove an element from shortcut
	 *
	 * @param {boolean} is a skill ?
	 * @param {number} ID of the element to remove
	 * @param {number} row id
	 */
	function removeElement( isSkill, ID, row )
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
	 * Drop something in the shortcut
	 * Does the client allow other source than shortcut, inventory
	 * and skill window to save to shortcut ?
	 */
	function onDrop( event )
	{
		var data, element;
		var index = parseInt(this.getAttribute('data-index'), 10);
		var row   = Math.floor( index / 9 );

		event.stopImmediatePropagation();

		try {
			data    = JSON.parse(event.originalEvent.dataTransfer.getData('Text'));
			element = data.data;
		}
		catch(e) {
			return false;
		}

		// Do not process others things than item and skill
		if (data.type !== 'item' && data.type !== 'skill') {
			return false;
		}

		switch (data.from) {
			case 'SkillList':
				ShortCut.onChange( index, true, element.SKID, element.level);
				removeElement( true, element.SKID, row);
				addElement( index, true, element.SKID, element.level);
				break;

			case 'Inventory':
				ShortCut.onChange( index, false, element.ITID, 0);
				removeElement( false, element.ITID, row);
				addElement( index, false, element.ITID, 0);
				break;

			case 'ShortCut':
				ShortCut.onChange( index, element.isSkill, element.ID, element.count);
				removeElement( element.isSkill, element.ID, row);
				addElement( index, element.isSkill, element.ID, element.count);
				break;
		}

		return false;
	}


	/**
	 * Stop the drag and drop
	 */
	function onDragEnd()
	{
		delete window._OBJ_DRAG_;
		this.classList.remove('hide');
	}


	/**
	 * Prepare data to be store in the dragged element
	 * to change prosition in the shortcut.
	 */
	function onDragStart( event )
	{
		var img, index;

		index = parseInt(this.parentNode.getAttribute('data-index'), 10);
		this.classList.add('hide');

		// Extract image from css to get it when dragging the element
		img     = new Image();
		img.src = this.firstChild.style.backgroundImage.match(/\(([^\)]+)/)[1];

		event.originalEvent.dataTransfer.setDragImage( img, 12, 12 );
		event.originalEvent.dataTransfer.setData('Text',
			JSON.stringify( window._OBJ_DRAG_ = {
				type: _list[index].isSkill ? 'skill' : 'item',
				from: 'ShortCut',
				data: _list[index]
			})
		);
	}


	/**
	 * Get informations from a skill/item when
	 * using right click on it.
	 */
	function onElementInfo( event )
	{
		var index   = parseInt(this.parentNode.getAttribute('data-index'), 10);
		var element = _list[index];

		event.stopImmediatePropagation();

		// Display skill informations
		if (element.isSkill) {
			if (SkillDescription.uid === _list[index].ID) {
				SkillDescription.remove();
			}
			else {
				SkillDescription.append();
				SkillDescription.setSkill( _list[index].ID );
			}
		}

		// Display item informations
		else {

			if (ItemInfo.uid === _list[index].ID) {
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
	 * Click on a shortcut
	 */
	function onUseShortCut()
	{
		var index = parseInt(this.parentNode.getAttribute('data-index'), 10);
		clickElement(index);
	}


	/**
	 * Clicking on a shortcut
	 *
	 * @param {number} shortcut index
	 */
	function clickElement( index )
	{
		var shortcut = _list[index];

		SkillTargetSelection.remove();

		// Nothing here ?
		if (!shortcut) {
			return;
		}

		// Execute skill
		if (shortcut.isSkill) {
			SkillWindow.useSkillID(shortcut.ID);
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
	 * Closing the window
	 */
	function onClose()
	{
		ShortCut.ui.css('height', 0);
		_preferences.size = 0;
		_preferences.save();
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
	 * Hook Skill List, get informations when there is a change
	 * to update the shortcut
	 *
	 * @param {number} skill id
	 * @param {number} level
	 */
	SkillWindow.onUpdateSkill = function( id, level)
	{
		ShortCut.setElement( true, id, level);
	};


	/**
	 * Method to define to notify a change.
	 *
	 * @param {number} index
	 * @param {boolean} isSkill
	 * @param {number} id
	 * @param {number} count
	 */
	ShortCut.onChange = function OnConfigUpdate(/*index, isSkill, ID, count*/){};


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(ShortCut);
});
