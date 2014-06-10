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
	'use strict';


	/**
	 * Dependencies
	 */
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
	WinStats.init = function init()
	{
		this.statuspoint = 0;

		this.ui.find('.up button').mousedown(function(){
			switch (this.className) {
				case 'str': WinStats.onRequestUpdate( 13, 1 ); break;
				case 'agi': WinStats.onRequestUpdate( 14, 1 ); break;
				case 'vit': WinStats.onRequestUpdate( 15, 1 ); break;
				case 'int': WinStats.onRequestUpdate( 16, 1 ); break;
				case 'dex': WinStats.onRequestUpdate( 17, 1 ); break;
				case 'luk': WinStats.onRequestUpdate( 18, 1 ); break;
			}
		});
	};


	/**
	 * Stack to store things if the UI is not in html
	 */
	WinStats.stack = [];


	/**
	 * Execute elements in memory
	 */
	WinStats.onAppend = function onAppend()
	{
		var i, count;

		for (i = 0, count = this.stack.length; i < count; ++i) {
			this.update.apply( this, this.stack[i]);
		}

		this.stack.length = 0;
	};


	/**
	 * Update UI elements
	 *
	 * @param {string} type identifier
	 * @param {number} val1
	 * @param {number} val2 (optional)
	 */
	WinStats.update = function update( type, val )
	{
		var str;

		if (!this.__loaded) {
			this.stack.push(arguments);
			return;
		}

		switch (type) {
			case 'statuspoint':
				this.statuspoint = val;
				this.ui.find('.requirements div').each(function(){
					WinStats.ui.find('.up .'+ this.className)
						.css('opacity', parseInt(this.textContent, 10) <= val ? 1 : 0 );
				});
				this.ui.find('.' + type).text(val);
				break;

			case 'guildname':
			case 'atak':
			case 'matak':
			case 'def':
			case 'mdef':
			case 'hit':
			case 'flee':
			case 'critical':
				this.ui.find('.' + type).text(val);
				break;

			case 'aspd':
				this.ui.find('.' + type).text( Math.floor(200-val/10) );
				break;

			case 'atak2':
			case 'matak2':
			case 'def2':
			case 'mdef2':
			case 'flee2':
				str = val < 0 ? '- ' + (-val) : '+ ' + val;
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

			case 'str2':
			case 'agi2':
			case 'vit2':
			case 'int2':
			case 'dex2':
			case 'luk2':
				str = val < 0 ? '- ' + (-val) : val > 0 ? '+' + val : '';
				this.ui.find('.bonus .'+ type.replace('2','')).text( str );
				break;

			case 'str3':
			case 'agi3':
			case 'vit3':
			case 'int3':
			case 'dex3':
			case 'luk3':
				this.ui.find('.requirements .'+ type.replace('3','')).text(val);
				this.ui.find('.up .'+ type.replace('3','')).css('opacity', val <= this.statuspoint ? 1 : 0 );
				break;
		}
	};


	/**
	 * Abstract method to define
	 */
	WinStats.onRequestUpdate = function onRequestUpdate(/*id, amount*/){};


	/**
	 * Export it (don't add it to component list)
	 */
	return WinStats;
});
