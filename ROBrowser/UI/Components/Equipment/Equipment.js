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
	"use strict";


	/**
	 * Dependencies
	 */
	var DB                 = require('DB/DBManager');
	var jQuery             = require('Utils/jquery');
	var Client             = require('Core/Client');
	var Preferences        = require('Core/Preferences');
	var Renderer           = require('Renderer/Renderer');
	var Camera             = require('Renderer/Camera');
	var SpriteRenderer     = require('Renderer/SpriteRenderer');
	var Entity             = require('Renderer/Entity/Entity');
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
	 * Storage to store equipment list
	 */
	Equipment.list = {};


	/**
	 * Initialize UI
	 */
	Equipment.init = function Init()
	{
		this.ctx    = this.ui.find('canvas')[0].getContext('2d');
		this.entity = new Entity(Camera.target);

		// Append WinStats to content
		WinStats.prepare();
		WinStats.__loaded = true;
		this.ui.find('.status_component').append(WinStats.ui);

		this.initPreferences();
		this.draggable();

		// Bind events
		this.ui.find('.titlebar .mini').mousedown(function(){
			Equipment.ui.find('.panel').toggle();
		});

		this.ui.find('.titlebar .close').mousedown(function(){
			Equipment.ui.hide();
			return false;
		});

		// Show Status ?
		this.ui.find('.view_status').mousedown(this.toggleStatus);
		this.ui.find('.show_equip').mousedown(this.toggleEquip);


		// Bind items
		this.ui.find('.content')

			// Right click on item
			.on('contextmenu', '.item', function(event) {
				var matches = this.className.match(/(\w+) (\d+)/);
				var index   = parseInt(matches[2], 10);
				var item    = Equipment.list[index];
				var box, ui;

				if( item ) {
					ui = jQuery('.ItemInfo.item' + item.ITID );

					// Don't add the same UI twice, remove it
					if( ui.length ) {
						ui.remove();
					}

					// Add ui to window
					else {
						box = ItemInfo.clone('ItemInfo', true);
						box.append();
						box.ui.addClass('item' + item.ITID );
						box.setItem( item );
					}
				}

				event.stopImmediatePropagation();
				return false;
			})

			// Want to unequip
			.on('dblclick', '.item', function(event) {
				var matches = this.className.match(/(\w+) (\d+)/);
				var index   = parseInt(matches[2], 10);
				Equipment.onUnEquip( index );
			});
	};


	/**
	 * Append to body
	 */
	Equipment.onAppend = function OnAppend()
	{
		Renderer.render(this.renderCharacter);
	};


	/**
	 * Remove Inventory from window (and so clean up items)
	 */
	Equipment.onRemove = function OnRemove()
	{
		// Stop rendering
		Renderer.stop(this.renderCharacter);

		// Clean equipments
		this.list = {};
		this.ui.find('.col1, .col3').empty();

		// Save preferences
		this.preferences.show   =  this.ui.is(':visible');
		this.preferences.reduce = !this.ui.find('.panel').is(':visible');
		this.preferences.stats  =  this.ui.find('.status_component').is(':visible');
		this.preferences.y      =  this.ui.position().top;
		this.preferences.x      =  this.ui.position().left;
		this.preferences.save();
	};


	/**
	 * Key Listener
	 *
	 * @param {object} event
	 * @return {boolean}
	 */
	Equipment.onKeyDown = function OnKeyDown( event )
	{
		if( KEYS.ALT && event.which === KEYS.Q ) {
			this.ui.toggle();
			event.stopImmediatePropagation();
			return false;
		}

		return true;
	};


	/**
	 * Initialize preferences
	 */
	Equipment.initPreferences = function InitPreferences()
	{
		// Preferences structure
		this.preferences = Preferences.get('Equipment', {
			x:        480,
			y:        200,
			show:     false,
			reduce:   false,
			stats:    true,
			equip:    false
		}, 1.0);

		// Apply preferences
		this.ui.css({
			top:  Math.min( Math.max( 0, this.preferences.y), Renderer.height - this.ui.height()),
			left: Math.min( Math.max( 0, this.preferences.x), Renderer.width  - this.ui.width())
		});

		// Hide window ?
		if( !this.preferences.show ) {
			this.ui.hide();
		}

		// Reduce window ?
		if( this.preferences.reduce ) {
			this.ui.find('.panel').hide();
		}

		// Show status window ?
		if( !this.preferences.stats ) {
			this.ui.find('.status_component').hide();
			Client.loadFile( DB.INTERFACE_PATH + 'basic_interface/viewon.bmp', function(data){
				Equipment.ui.find('.view_status').css('backgroundImage', 'url(' + data + ')');
			});
		}

		// Show equipment ?
		if( this.preferences.equip ) {
			Client.loadFile( DB.INTERFACE_PATH + 'checkbox_1.bmp', function(data){
				Equipment.ui.find('.show_equip').css('backgroundImage', 'url(' + data + ')');
			});
		}
	};


	/**
	 * Display or not status window
	 */
	Equipment.toggleStatus = function ToggleStatus()
	{
		var ui     = this;
		var status = Equipment.ui.find('.status_component');
		var state  = status.is(':visible') ? 'on' : 'off';

		status.toggle();

		Client.loadFile( DB.INTERFACE_PATH + 'basic_interface/view' + state + '.bmp', function(data){
			ui.style.backgroundImage = 'url(' + data + ')';
		});

		return false;
	};


	/**
	 * Does player can see your equipment ?
	 */
	Equipment.toggleEquip = function ToggleEquip()
	{
		Equipment.preferences.equip = !Equipment.preferences.equip;
		var file = Equipment.preferences.equip ? 'checkbox_1.bmp' : 'checkbox_0.bmp';
		var ui   = this;

		Client.loadFile( DB.INTERFACE_PATH + file, function(data){
			ui.style.backgroundImage = 'url(' + data + ')';
		});

		return false;
	};


	/**
	 * Rendering character
	 */
	Equipment.renderCharacter = function RenderCharacter()
	{
		// 2D render use much CPU, dont render it if not visible.
		if( Equipment.ui.is(':visible') ) {
			var ctx = Equipment.ctx;

			// Rendering
			SpriteRenderer.bind2DContext( ctx, 30, 130 );
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height );

			Camera.direction = 4;
			Equipment.entity._renderSub(0);
		}
	};


	/**
	 * Find elements in html base on item location
	 *
	 * @param {number} location
	 * @returns {string} selector
	 */
	function GetSelectorFromLocation( location )
	{
		var selector = [];

		if( location & Equipment.LOCATION.HEAD_TOP )    selector.push(".head_top");
		if( location & Equipment.LOCATION.HEAD_MID )    selector.push(".head_mid");
		if( location & Equipment.LOCATION.HEAD_BOTTOM ) selector.push(".head_bottom");
		if( location & Equipment.LOCATION.ARMOR )       selector.push(".armor");
		if( location & Equipment.LOCATION.WEAPON )      selector.push(".weapon");
		if( location & Equipment.LOCATION.SHIELD )      selector.push(".shield");
		if( location & Equipment.LOCATION.GARMENT )     selector.push(".garment");
		if( location & Equipment.LOCATION.SHOES )       selector.push(".shoes");
		if( location & Equipment.LOCATION.ACCESSORY1 )  selector.push(".accessory1");
		if( location & Equipment.LOCATION.ACCESSORY2 )  selector.push(".accessory2");

		return selector.join(', ');
	}


	/**
	 * Add an equipment to the window
	 *
	 * @param {Item} item
	 */
	Equipment.equip = function Equip( item, location )
	{
		this.list[ item.index] = item;
		var it = DB.getItemInfo( item.ITID );
		var ui = this.ui.find(
			GetSelectorFromLocation(
				arguments.length === 2 ? location : item.location
			)
		);

		Client.loadFile( DB.INTERFACE_PATH + 'item/' + it.identifiedResourceName + '.bmp', function(data){
			var name  = ( item.RefiningLevel ? '+' + item.RefiningLevel + ' ' : '') + it.identifiedDisplayName;
			var lines = []
			while( name.length ) {
				lines.push( name.substr(0,13) );
				name = name.substr(13);
			}

			ui.html(
				'<div class="item '+ item.index +'">' +
					'<button style="background-image:url(' + data + ')"></button>' +
					'<span>' +
						 lines.join("\n") +
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
	Equipment.unEquip = function( index, location )
	{
		var selector = GetSelectorFromLocation( location );
		this.ui.find( selector ).empty();
		var item = this.list[ index ];
		delete this.list[ index ];

		return item;
	};


	/**
	 * Abstract method to define
	 */
	Equipment.onUnEquip = function onUnEquip( index ){};


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(Equipment);
});