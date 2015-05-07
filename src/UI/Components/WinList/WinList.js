/**
 * UI/Components/WinList/WinList.js
 *
 * WinList windows
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
	var jQuery      = require('Utils/jquery');
	var Renderer    = require('Renderer/Renderer');
	var KEYS        = require('Controls/KeyEventHandler');
	var UIManager   = require('UI/UIManager');
	var UIComponent = require('UI/UIComponent');
	var htmlText    = require('text!./WinList.html');
	var cssText     = require('text!./WinList.css');


	/**
	 * Create WinList namespace
	 */
	var WinList = new UIComponent( 'WinList', htmlText, cssText );


	/**
	 * Initialize UI
	 */
	WinList.init = function init()
	{
		// Show at center.
		this.ui.css({
			top: (Renderer.height - 280)/1.5,
			left: (Renderer.width - 280)/2
		});
		this.draggable();

		this.ui_list = this.ui.find('.list:first');
		this.list    = null;
		this.index   = 0;

		// Click Events
		this.ui.find('.ok').click( this.selectIndex.bind(this) );
		this.ui.find('.cancel').click( this.exit.bind(this) );
	};


	/**
	 * Add elements to the list
	 *
	 * @param {Array} list object to display
	 */
	WinList.setList = function setList( list )
	{
		var i, count;

		this.list = list;
		this.ui_list.empty();

		function onSelectListIndex(event) {
			WinList.setIndex( jQuery(this).data('id') );
			event.stopImmediatePropagation();
			return false;
		}

		for (i = 0, count = list.length; i < count; ++i) {
			this.ui_list.append(
				jQuery('<div/>').
					addClass('menu_node').
					text(list[i]).
					data('id', i).
					mousedown(onSelectListIndex).
					dblclick(this.selectIndex.bind(this))
			);
		}

		this.setIndex( 0 );
	};


	/**
	 *  Cancel window
	 */
	WinList.exit = function exit()
	{
		WinList.onExitRequest();
	};


	/**
	 * Callback to use
	 */
	WinList.onExitRequest   = function onExitRequest(){};
	WinList.onIndexSelected = function onIndexSelected(){};


	/**
	 * Change selection
	 *
	 * @param {number} id in list
	 */
	WinList.setIndex = function setIndex( id )
	{
		if (id > -1 && id < this.list.length) {
			this.ui_list.find('div:eq('+ this.index +')').css('backgroundColor', 'transparent');
			this.ui_list.find('div:eq('+ id +')').css('backgroundColor', '#cde0ff');
			this.index = id;
		}
	};


	/**
	 * Select a server, callback
	 */
	WinList.selectIndex = function selectIndex()
	{
		this.onIndexSelected( this.index );
	};


	/**
	 * Key Management
	 *
	 * @param {object} event
	 */
	WinList.onKeyDown = function onKeyDown( event )
	{
		switch (event.which) {
			default:                                           return;
			case KEYS.ENTER:  this.selectIndex();              break;
			case KEYS.ESCAPE: this.exit();                     break;
			case KEYS.UP:     this.setIndex( this.index - 1 ); break;
			case KEYS.DOWN:   this.setIndex( this.index + 1 ); break;
		}
		event.stopImmediatePropagation();
	};


	/**
	 * Free variables once removed from HTML
	 */
	WinList.onRemove = function onRemove()
	{
		this.ui_list.empty();
		this.list  = null;
		this.index = 0;
	};


	/**
	 * Create component based on view file and export it
	 */
	return UIManager.addComponent(WinList);

});