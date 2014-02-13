/**
 * UI/Components/BasicInfo/BasicInfo.js
 *
 * Chararacter Basic information windows
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
	var Client             = require('Core/Client');
	var KEYS               = require('Controls/KeyEventHandler');
	var Renderer           = require('Renderer/Renderer');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var htmlText           = require('text!./NpcMenu.html');
	var cssText            = require('text!./NpcMenu.css');


	/**
	 * Create NPC Menu component
	 */
	var NpcMenu = new UIComponent( 'NpcMenu', htmlText, cssText );


	/**
	 * @var {number} index selected in menu
	 */
	NpcMenu.index = 0;


	/**
	 * Initialize component
	 */
	NpcMenu.init = function OnInit()
	{
		this.ui.find('.ok').click( this.validate.bind(this) );
		this.ui.find('.cancel').click( this.cancel.bind(this) );

		this.ui.css({ top: Math.max(376, Renderer.height/2 + 76 ), left: Math.max( Renderer.width/3, 20) });

		this.draggable();

		// Scroll feature should block at each line
		var lastScrollPos = 0;
		this.ui.find('.content').on('scroll', function(){
			if( this.scrollTop > lastScrollPos ) {
				this.scrollTop = Math.ceil(this.scrollTop/20) * 20;
			}
			else {
				this.scrollTop = Math.floor(this.scrollTop/20) * 20;
			}
			lastScrollPos = this.scrollTop;
		});
	};


	/**
	 * Bind KeyDown event
	 */
	NpcMenu.onKeyDown = function(event)
	{
		switch( event.which ) {

			case KEYS.ENTER:
				this.validate();
				break;

			case KEYS.ESCAPE:
				this.cancel();
				break;

			case KEYS.UP:
				var count  = this.ui.find('.content div').length;
				this.index = Math.max( this.index - 1, 0 );

				this.ui.find('.content div').removeClass('selected');
				this.ui.find('.content div:eq('+ this.index +')').addClass('selected');

				var content = this.ui.find('.content')[0];
				var top     = this.index * 20;

				if( top < content.scrollTop ) {
					content.scrollTop = top;
				}
				break;

			case KEYS.DOWN:
				var count  = this.ui.find('.content div').length;
				this.index = Math.min( this.index + 1, count -1 );

				this.ui.find('.content div').removeClass('selected');
				this.ui.find('.content div:eq('+ this.index +')').addClass('selected');

				var content = this.ui.find('.content')[0];
				var top     = this.index * 20;

				if( top >= content.scrollTop + 80 ) {
					content.scrollTop = top - 60;
				}
				break;

			default:
				return true;
		}

		event.stopImmediatePropagation();
		return false;
	};


	/**
	 * Initialize menu
	 *
	 * @param {string} menu
	 * @param {number} gid - npc id
	 */
	NpcMenu.setMenu = function SetMenu( menu, gid )
	{
		this.ownerID = gid;
		this.list    = menu.split(':');
		this.index   = 0;

		var content = this.ui.find('.content');
		var i, count;

		content.empty();

		for( i = 0, count = this.list.length; i < count; ++i ) {
			// Don't display empty menu
			if( this.list[i].length ) {
				jQuery('<div/>')
					.text( this.list[i] )
					.data('index', i)
					.appendTo(content);
			}
		}

		content.find('div')
			.mousedown( this.selectIndex )
			.dblclick( this.validate.bind(this) );

		content.find('div:first')
			.addClass('selected');
	};


	/**
	 * Submit an index
	 */
	NpcMenu.validate = function Validate()
	{
		this.onSelectMenu( this.ownerID, this.index + 1 );
	};


	/**
	 * Pressed cancel, client send "255" as value
	 */
	NpcMenu.cancel = function Cancel()
	{
		this.onSelectMenu( this.ownerID, 255 );
	};


	/**
	 * Select an index, change background color
	 */
	NpcMenu.selectIndex = function SelectIndex()
	{
		NpcMenu.ui.find('.content div').removeClass('selected');
		NpcMenu.index = +jQuery(this).data('index');
		NpcMenu.ui.find('.content div:eq('+ NpcMenu.index +')').addClass('selected');
	};


	/**
	 * Abstract callback to define
	 */
	NpcMenu.onSelectMenu = function OnSelectMenu( gid, index ){};


	/**
	 * Create componentand export it
	 */
	return UIManager.addComponent(NpcMenu);
});