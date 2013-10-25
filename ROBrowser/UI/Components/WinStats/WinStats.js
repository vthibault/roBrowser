/**
 * UI/Components/WinStats/WinStats.js
 *
 * Chararacter Statistiques Informations
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
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var htmlText           = require('text!./WinStats.html');
	var cssText            = require('text!./WinStats.css');


	/**
	 * Create component
	 */
	var WinStats = new UIComponent( 'WinStats', htmlText, cssText );


	/**
	 * Initialize UI
	 */
	WinStats.init = function Init()
	{
		this.ui.find('.up button').mousedown(function(){
			switch( this.className ) {
				case 'str': WinStats.OnRequestUpdate( 13, 1 ); break;
				case 'agi': WinStats.OnRequestUpdate( 14, 1 ); break;
				case 'vit': WinStats.OnRequestUpdate( 15, 1 ); break;
				case 'int': WinStats.OnRequestUpdate( 16, 1 ); break;
				case 'dex': WinStats.OnRequestUpdate( 17, 1 ); break;
				case 'luk': WinStats.OnRequestUpdate( 18, 1 ); break;
			}
		});

		this.draggable();
	};


	/**
	 * Stack to store things if the UI is not in html
	 */
	WinStats.stack = [];


	/**
	 * Execute elements in memory
	 */
	WinStats.onAppend = function OnAppend()
	{
		var i, count;

		for( i = 0, count = this.stack.length; i < count; ++i ) {
			this.update.apply( this, this.stack[i]);
		}

		this.stack.length = 0;
		this.ui.hide();
	};


	/**
	 * Update UI elements
	 *
	 * @param {string} type identifier
	 * @param {number} val1
	 * @param {number} val2 (optional)
	 */
	WinStats.update = function Update( type, val )
	{
		if( !this.__loaded ){
			this.stack.push(arguments);
			return;
		}

		switch( type ) {
			case 'guildname':
			case 'statuspoint':
			case 'atak':
			case 'matak':
			case 'def':
			case 'mdef':
			case 'hit':
			case 'flee':
			case 'critical':
			case 'aspd':
				this.ui.find('.' + type).text(val);
				break;

			case 'atak2':
			case 'matak2':
			case 'def2':
			case 'mdef2':
			case 'flee2':
				var str = val < 0 ? '- ' + (-val) : '+ ' + val;
				this.ui.find('.' + type).text(str);
				break;

			case 'str':
			case 'agi':
			case 'vit':
			case 'int':
			case 'dex':
			case 'luk':
				this.ui.find('.stats .'+ type).text(val);
				break;

			case 'str3':
			case 'agi3':
			case 'vit3':
			case 'int3':
			case 'dex3':
			case 'luk3':
				this.ui.find('.requirements .'+ type.replace('3','')).text(val);
				break;
		}
	};


	/**
	 * Abstract method to define
	 */
	WinStats.OnRequestUpdate = function OnRequestUpdate(id, amount){};


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(WinStats);
});