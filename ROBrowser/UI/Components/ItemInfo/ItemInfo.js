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
	var DB                 = require('DB/DBManager');
	var Client             = require('Core/Client');
	//var Mouse              = require('Controls/MouseEventHandler');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var htmlText           = require('text!./ItemInfo.html');
	var cssText            = require('text!./ItemInfo.css');


	/**
	 * Create Component
	 */
	var ItemInfo = new UIComponent( 'ItemInfo', htmlText, cssText );

 
	/**
	 * Initialize UI
	 */
	ItemInfo.init = function Init()
	{
		var ui = this.ui;

		this.ui.css({ top: 200, left:200 });

		this.ui.find('.close').mousedown(function(){
			ui.remove();
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

		// add cards if type === equip
		// add card image if type === card
	};

	
	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(ItemInfo);
});