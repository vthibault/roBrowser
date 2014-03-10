/**
 * UI/Components/ItemObtain/ItemObtain.js
 *
 * Item Obtain window (when you get an item, a window popup near the announce box)
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
	var Client             = require('Core/Client');
	var Renderer           = require('Renderer/Renderer');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var htmlText           = require('text!./ItemObtain.html');
	var cssText            = require('text!./ItemObtain.css');


	/**
	 * Create component
	 */
	var ItemObtain = new UIComponent( 'ItemObtain', htmlText, cssText );


	/**
	 * @var {TimeOut} timer
	 */
	var _timer = 0;


	/**
	 * @var {number} time to display
	 */
	var _life = 5 * 1000;


	/**
	 * Initialize component
	 */
	ItemObtain.init = function init()
	{
		this.ui.css('zIndex', 45); // Between Interface and Game Announce
	};


	/**
	 * Once removed from HTML, clean timer
	 */
	ItemObtain.onRemove = function onRemove()
	{
		if (_timer) {
			clearTimeout(_timer);
			_timer = 0;
		}
	};


	/**
	 * Timer end, cleaning box
	 */
	ItemObtain.timeEnd = function timeEnd()
	{
		this.remove();
	};


	/**
	 * Add item informations
	 *
	 * @param {number} itemid
	 * @param {boolean} identify
	 * @param {number} amount
	 */
	ItemObtain.set = function set( itemid, identify, amount )
	{
		var it       = DB.getItemInfo( itemid );
		var display  = identify ? it.identifiedDisplayName  : it.unidentifiedDisplayName;
		var resource = identify ? it.identifiedResourceName : it.unidentifiedResourceName;

		this.ui.find('.content').html(
			'<img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" width="24" height="24" /> ' +
			display + ' ' + DB.msgstringtable[696].replace('%d', amount)
		);

		this.ui.css('left', ( Renderer.width - (this.ui.width()) ) >> 1 );

		Client.loadFile( DB.INTERFACE_PATH + 'item/' + resource + '.bmp', (function(url){
			this.ui.find('img').attr('src', url);
		}).bind(this));

		// Start tomer
		if (_timer) {
			clearTimeout(_timer);
		}

		_timer = setTimeout( this.timeEnd.bind(this), _life );
	};


	/**
	 * Create component and return it
	 */
	return UIManager.addComponent(ItemObtain);
});
