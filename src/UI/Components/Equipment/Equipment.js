/**
 * UI/Components/Equipment/Equipment.js
 *
 * Chararacter Equipment window
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
	var jQuery             = require('Utils/jquery');
	var Client             = require('Core/Client');
	var Preferences        = require('Core/Preferences');
	var Session            = require('Engine/SessionStorage');
	var Renderer           = require('Renderer/Renderer');
	var Camera             = require('Renderer/Camera');
	var SpriteRenderer     = require('Renderer/SpriteRenderer');
	var KEYS               = require('Controls/KeyEventHandler');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var ItemInfo           = require('UI/Components/ItemInfo/ItemInfo');
	var WinStats           = require('UI/Components/WinStats/WinStats');
	var htmlText           = require('text!./Equipment.html');
	var cssText            = require('text!./Equipment.css');


	/**
	 * Create Component
	 */
	var Equipment = new UIComponent( 'Equipment', htmlText, cssText );


	/**
	 * Location constants
	 */
	Equipment.LOCATION = {
		HEAD_BOTTOM: 1 << 0,
		WEAPON:      1 << 1,
		GARMENT:     1 << 2,
		ACCESSORY1:  1 << 3,
		ARMOR:       1 << 4,
		SHIELD:      1 << 5,
		SHOES:       1 << 6,
		ACCESSORY2:  1 << 7,
		HEAD_TOP:    1 << 8,
		HEAD_MID:    1 << 9
	};


	/**
	 * @var {Preference} window preferences
	 */
	var _preferences = Preferences.get('Equipment', {
		x:        480,
		y:        200,
		show:     false,
		reduce:   false,
		stats:    true
	}, 1.0);


	/**
	 * @var {Array} equipment list
	 */
	var _list = {};


	/**
	 * @var {CanvasRenderingContext2D} canvas context
	 */
	var _ctx;


	/**
	 * @var {boolean} show equipment to other people ?
	 */
	var _showEquip = false;


	/**
	 * Initialize UI
	 */
	Equipment.init = function init()
	{
		_ctx  = this.ui.find('canvas')[0].getContext('2d');

		// Append WinStats to content (hacked)
		WinStats.prepare();
		WinStats.__loaded = true;
		this.ui.find('.status_component').append(WinStats.ui);

		this.draggable();

		// Don't activate drag drop when clicking on buttons
		this.ui.find('.titlebar .base').mousedown(function( event ){
			event.stopImmediatePropagation();
		});

		// Bind events
		this.ui.find('.titlebar .mini').click(function(){
			Equipment.ui.find('.panel').toggle();
		});

		this.ui.find('.titlebar .close').click(function(){
			Equipment.ui.hide();
			return false;
		});

		// Show Status ?
		this.ui.find('.view_status').mousedown(toggleStatus);
		this.ui.find('.show_equip').mousedown(toggleEquip);

		// drag, drop items
		this.ui.on('dragover', onDragOver);
		this.ui.on('dragleave', onDragLeave);
		this.ui.on('drop', onDrop);

		// Bind items
		this.ui.find('.content')

			// Right click on item
			.on('contextmenu', '.item', function(event) {
				var index   = parseInt(this.getAttribute('data-index'), 10);
				var item    = _list[index];

				if (item) {

					// Don't add the same UI twice, remove it
					if (ItemInfo.uid === item.ITID) {
						ItemInfo.remove();
					}

					// Add ui to window
					else {
						ItemInfo.append();
						ItemInfo.uid =  item.ITID;
						ItemInfo.setItem( item );
					}
				}

				event.stopImmediatePropagation();
				return false;
			})

			// Want to unequip
			.on('dblclick', '.item', function() {
				var index   = parseInt(this.getAttribute('data-index'), 10);
				Equipment.onUnEquip( index );
				Equipment.ui.find('.overlay').remove();
			})

			// Stop drag drop feature
			.on('mousedown', '.item', function(event){
				event.stopImmediatePropagation();
			})

			// Title feature
			.on('mouseover', 'button', function(){
				var idx  = parseInt( this.parentNode.getAttribute('data-index'), 10);
				var item = _list[idx];

				if (!item) {
					return;
				}

				// Get back data
				var overlay = Equipment.ui.find('.overlay');
				var it      = DB.getItemInfo( item.ITID );
				var pos     = jQuery(this).position();

				// Display box
				overlay.show();
				overlay.css({top: pos.top-22, left:pos.left-22});
				overlay.html(
					( item.RefiningLevel ? '+' + item.RefiningLevel + ' ' : '') +
					( item.IsIdentified ? it.identifiedDisplayName : it.unidentifiedDisplayName ) +
					( it.slotCount ? ' [' + it.slotCount + ']' : '')
				);
			})

			// Stop title feature
			.on('mouseout', 'button', function(){
				Equipment.ui.find('.overlay').hide();
			});
	};


	/**
	 * Append to body
	 */
	Equipment.onAppend = function onAppend()
	{
		// Apply preferences
		this.ui.css({
			top:  Math.min( Math.max( 0, _preferences.y), Renderer.height - this.ui.height()),
			left: Math.min( Math.max( 0, _preferences.x), Renderer.width  - this.ui.width())
		});

		// Hide window ?
		if (!_preferences.show) {
			this.ui.hide();
		}

		// Reduce window ?
		if (_preferences.reduce) {
			this.ui.find('.panel').hide();
		}

		// Show status window ?
		if (!_preferences.stats) {
			this.ui.find('.status_component').hide();
			Client.loadFile( DB.INTERFACE_PATH + 'basic_interface/viewon.bmp', function(data){
				this.ui.find('.view_status').css('backgroundImage', 'url(' + data + ')');
			}.bind(this));
		}

		if (this.ui.find('canvas').is(':visible')) {
			Renderer.render(renderCharacter);
		}
	};


	/**
	 * Remove Inventory from window (and so clean up items)
	 */
	Equipment.onRemove = function onRemove()
	{
		// Stop rendering
		Renderer.stop(renderCharacter);

		// Clean equipments
		_list = {};
		this.ui.find('.col1, .col3').empty();

		// Save preferences
		_preferences.show   =  this.ui.is(':visible');
		_preferences.reduce =  this.ui.find('.panel').css('display') === 'none';
		_preferences.stats  =  this.ui.find('.status_component').css('display') !== 'none';
		_preferences.y      =  parseInt(this.ui.css('top'), 10);
		_preferences.x      =  parseInt(this.ui.css('left'), 10);
		_preferences.save();
	};


	/**
	 * Start/stop rendering character in UI
	 */
	Equipment.toggle = function toggle()
	{
		this.ui.toggle();

		if (this.ui.is(':visible')) {
			Renderer.render(renderCharacter);
		}
		else {
			Renderer.stop(renderCharacter);
		}
	};


	/**
	 * Key Listener
	 *
	 * @param {object} event
	 * @return {boolean}
	 */
	Equipment.onKeyDown = function onKeyDown( event )
	{
		if (KEYS.ALT && event.which === KEYS.Q) {
			this.ui.toggle();
			if (this.ui.is(':visible')) {
				Renderer.render(renderCharacter);
			}
			else {
				Renderer.stop(renderCharacter);

				// Fix Mouse.intersect bug
				this.ui.trigger('mouseleave');
			}
			event.stopImmediatePropagation();
			return false;
		}

		return true;
	};


	/**
	 * Show or hide equipment
	 *
	 * @param {boolean} on
	 */
	Equipment.setEquipConfig = function setEquipConfig( on )
	{
		_showEquip = on;

		Client.loadFile( DB.INTERFACE_PATH + 'checkbox_' + ( on ? '1' : '0' ) + '.bmp', function(data){
			Equipment.ui.find('.show_equip').css('backgroundImage', 'url(' + data + ')');
		});
	};


	/**
	 * Add an equipment to the window
	 *
	 * @param {Item} item
	 */
	Equipment.equip = function equip( item, location )
	{
		var it            = DB.getItemInfo( item.ITID );
		_list[item.index] = item;

		if (arguments.length === 1) {
			if ('location' in item) {
				location = item.location;
			}
			else if ('WearState' in item) {
				location = item.WearState;
			}
		}

		var ui = this.ui.find(getSelectorFromLocation(location));

		Client.loadFile( DB.INTERFACE_PATH + 'item/' + it.identifiedResourceName + '.bmp', function(data){
			var name  = ( item.RefiningLevel ? '+' + item.RefiningLevel + ' ' : '') + it.identifiedDisplayName;
			var lines = [];
			while (name.length) {
				lines.push( name.substr(0,13) );
				name = name.substr(13);
			}

			ui.html(
				'<div class="item" data-index="'+ item.index +'">' +
					'<button style="background-image:url(' + data + ')"></button>' +
					'<span>' +
						 lines.join('\n') +
					'</span>' +
				'</div>'
			);
		});
	};


	/**
	 * Remove equipment from window
	 *
	 * @param {number} item index
	 * @param {number} item location
	 */
	Equipment.unEquip = function unEquip( index, location )
	{
		var selector = getSelectorFromLocation( location );
		var item     = _list[ index ];

		this.ui.find( selector ).empty();
		delete _list[ index ];

		return item;
	};


	/**
	 * Display or not status window
	 */
	function toggleStatus()
	{
		var status = Equipment.ui.find('.status_component');
		var self   = Equipment.ui.find('.view_status');
		var state  = status.is(':visible') ? 'on' : 'off';

		status.toggle();

		Client.loadFile( DB.INTERFACE_PATH + 'basic_interface/view' + state + '.bmp', function(data){
			self.style.backgroundImage = 'url(' + data + ')';
		});

		return false;
	}


	/**
	 * Does player can see your equipment ?
	 */
	function toggleEquip()
	{
		Equipment.onConfigUpdate( 0, !_showEquip ? 1 : 0 );
		return false;
	}


	/**
	 * Rendering character
	 */
	var renderCharacter = function renderCharacterClosure()
	{
		var _cleanColor = new Float32Array([1.0, 1.0, 1.0, 1.0]);
		var _savedColor = new Float32Array(4);
		var _animation  = {
			tick:  0,
			frame: 0,
			repeat:true,
			play:  true,
			next:  false,
			delay: 0,
			save:  false
		};

		return function rencerCharacter()
		{
			var character = Session.Entity;
			var direction = character.direction;
			var headDir   = character.headDir;
			var action    = character.action;
			var animation = character.animation;

			// Set action
			Camera.direction    = 4;
			character.direction = 4;
			character.headDir   = 0;
			character.action    = character.ACTION.IDLE;
			character.animation = _animation;

			_savedColor.set(character.effectColor);
			character.effectColor.set(_cleanColor);

			// Rendering
			SpriteRenderer.bind2DContext( _ctx, 30, 130 );
			_ctx.clearRect(0, 0, _ctx.canvas.width, _ctx.canvas.height );
			character.renderEntity();

			// Revert changes
			character.direction = direction;
			character.headDir   = headDir;
			character.action    = action;
			character.animation = animation;
			character.effectColor.set(_savedColor);
		};
	}();


	/**
	 * Find elements in html base on item location
	 *
	 * @param {number} location
	 * @returns {string} selector
	 */
	function getSelectorFromLocation( location )
	{
		var selector = [];

		if (location & Equipment.LOCATION.HEAD_TOP)    selector.push('.head_top');
		if (location & Equipment.LOCATION.HEAD_MID)    selector.push('.head_mid');
		if (location & Equipment.LOCATION.HEAD_BOTTOM) selector.push('.head_bottom');
		if (location & Equipment.LOCATION.ARMOR)       selector.push('.armor');
		if (location & Equipment.LOCATION.WEAPON)      selector.push('.weapon');
		if (location & Equipment.LOCATION.SHIELD)      selector.push('.shield');
		if (location & Equipment.LOCATION.GARMENT)     selector.push('.garment');
		if (location & Equipment.LOCATION.SHOES)       selector.push('.shoes');
		if (location & Equipment.LOCATION.ACCESSORY1)  selector.push('.accessory1');
		if (location & Equipment.LOCATION.ACCESSORY2)  selector.push('.accessory2');

		return selector.join(', ');
	}


	/**
	 * Drag an item over the equipment, show where to place the item
	 */
	function onDragOver( event )
	{
		if (window._OBJ_DRAG_) {
			var data = window._OBJ_DRAG_;
			var item, selector, ui;

			// Just support items for now ?
			if (data.type === 'item') {
				item = data.data;

				// Only for TYPE.WEAPON and TYPE.EQUIP
				if ((item.type ===  4 || item.type === 5 || item.type === 10) && item.IsIdentified && !item.IsDamaged) {
					selector = getSelectorFromLocation( 'location' in item ? item.location : item.WearLocation );
					ui       = Equipment.ui.find(selector);

					Client.loadFile( DB.INTERFACE_PATH + 'basic_interface/item_invert.bmp', function(data){
						ui.css('backgroundImage', 'url('+ data + ')');
					});
				}
			}
		}

		event.stopImmediatePropagation();
		return false;
	}


	/**
	 * Drag out the window
	 */
	function onDragLeave( event )
	{
		Equipment.ui.find('td').css('backgroundImage','none');
		event.stopImmediatePropagation();
		return false;
	}



	/**
	 * Drop an item in the equipment, equip it if possible
	 */
	function onDrop( event )
	{
		var item, data;

		try {
			data = JSON.parse(
				event.originalEvent.dataTransfer.getData('Text')
			);
		}
		catch(e) {}

		// Just support items for now ?
		if (data && data.type === 'item') {
			item = data.data;

			// Only for TYPE.WEAPON and TYPE.EQUIP
			if ((item.type ===  4 || item.type === 5 || item.type === 10 ) && item.IsIdentified && !item.IsDamaged) {
				Equipment.ui.find('td').css('backgroundImage','none');
				Equipment.onEquipItem( item.index, 'location' in item ? item.location : item.WearState );
			}
		}

		event.stopImmediatePropagation();
		return false;
	}


	/**
	 * Method to define
	 */
	Equipment.onUnEquip      = function OnUnEquip(/* index */){};
	Equipment.onConfigUpdate = function OnConfigUpdate(/* type, value*/){};
	Equipment.onEquipItem    = function OnEquipItem(/* index, location */){};


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(Equipment);
});