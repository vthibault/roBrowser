/**
 * UI/Components/ItemInfo/ItemInfo.js
 *
 * Item Information
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
	var jQuery             = require('Utils/jquery');
	var DB                 = require('DB/DBManager');
	var Client             = require('Core/Client');
	var KEYS               = require('Controls/KeyEventHandler');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var htmlText           = require('text!./ItemInfo.html');
	var cssText            = require('text!./ItemInfo.css');


	/**
	 * Create Component
	 */
	var ItemInfo = new UIComponent( 'ItemInfo', htmlText, cssText );


	/**
	 * @var {number} ItemInfo unique id
	 */
	ItemInfo.uid = -1;


	/**
	 * Once append to the DOM
	 */
	ItemInfo.onKeyDown = function OnKeyDown( event )
	{
		if( event.which === KEYS.ESCAPE ) {
			ItemInfo.remove();
			event.stopImmediatePropagation();
			return false;
		}

		return true;
	};


	/**
	 * Once append
	 */
	ItemInfo.onAppend = function OnAppend()
	{
		// Seems like "EscapeWindow" is execute first, push it before.
		var events = jQuery._data( window, 'events').keydown;
		events.unshift( events.pop() );
	};


	/**
	 * Once removed from html
	 */
	ItemInfo.onRemove = function OnRemove()
	{
		this.uid = -1;
	};


	/**
	 * Initialize UI
	 */
	ItemInfo.init = function Init()
	{
		var ui = this.ui;

		this.ui.css({ top: 200, left:200 });

		this.ui.find('.close').click(function(){
			ItemInfo.remove();
		});

		this.draggable();
	};


	/**
	 * Bind component
	 */
	ItemInfo.setItem = function SetItem( item )
	{
		var it   = DB.getItemInfo( item.ITID );
		var ui   = this.ui;

		Client.loadFile( DB.INTERFACE_PATH + 'collection/' + ( item.IsIdentified ? it.identifiedResourceName : it.unidentifiedResourceName ) + '.bmp', function(data){
			ui.find('.collection').css('backgroundImage', 'url('+data+')' );
		});

		ui.find('.title').text( item.IsIdentified ? it.identifiedDisplayName : it.unidentifiedDisplayName );
		ui.find('.description').text( item.IsIdentified ? it.identifiedDescriptionName : it.unidentifiedDescriptionName );

		// TODO: add cards if type === equip
		// TODO: add card image if type === card
	};

	
	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(ItemInfo);
});