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
	'use strict';


	/**
	 * Dependencies
	 */
	var jQuery             = require('Utils/jquery');
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
	var _index = 0;


	/**
	 * @var {number} NPC ID
	 */
	var _ownerID = 0;


	/**
	 * Initialize component
	 */
	NpcMenu.init = function init()
	{
		this.ui.find('.ok').click(validate);
		this.ui.find('.cancel').click(cancel);

		this.ui.css({
			top: Math.max(376, Renderer.height/2 + 76 ),
			left: Math.max( Renderer.width/3, 20)
		});

		this.draggable();

		// Scroll feature should block at each line
		var lastScrollPos = 0;
		this.ui.find('.content').on('scroll', function(){
			if (this.scrollTop > lastScrollPos) {
				this.scrollTop = Math.ceil(this.scrollTop/20) * 20;
			}
			else {
				this.scrollTop = Math.floor(this.scrollTop/20) * 20;
			}
			lastScrollPos = this.scrollTop;
		});
	};


	/**
	 * Clean up events
	 */
	NpcMenu.onRemove = function onRemove()
	{
		this.ui.find('.content div').unbind();
		this.ui.find('.content').empty();
	};


	/**
	 * Bind KeyDown event
	 */
	NpcMenu.onKeyDown = function onKeyDown(event)
	{
		var count, top;
		var content;

		switch (event.which) {

			case KEYS.ENTER:
				validate();
				break;

			case KEYS.ESCAPE:
				cancel();
				break;

			case KEYS.UP:
				count  = this.ui.find('.content div').length;
				_index = Math.max( _index - 1, 0 );

				this.ui.find('.content div').removeClass('selected');
				this.ui.find('.content div:eq('+ _index +')').addClass('selected');

				content = this.ui.find('.content')[0];
				top     = _index * 20;

				if (top < content.scrollTop) {
					content.scrollTop = top;
				}
				break;

			case KEYS.DOWN:
				count  = this.ui.find('.content div').length;
				_index = Math.min( _index + 1, count -1 );

				this.ui.find('.content div').removeClass('selected');
				this.ui.find('.content div:eq('+ _index +')').addClass('selected');

				content = this.ui.find('.content')[0];
				top     = _index * 20;

				if (top >= content.scrollTop + 80) {
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
		var content, list;
		var i, count;

		content  = this.ui.find('.content');
		list     = menu.split(':');
		_ownerID = gid;
		_index   = 0;

		content.empty();

		for (i = 0, count = list.length; i < count; ++i) {
			// Don't display empty menu
			if (list[i].length) {
				jQuery('<div/>')
					.text(list[i])
					.data('index', i)
					.appendTo(content);
			}
		}

		content.find('div')
			.mousedown(selectIndex)
			.dblclick(validate);

		content.find('div:first')
			.addClass('selected');
	};


	/**
	 * Submit an index
	 */
	function validate()
	{
		NpcMenu.onSelectMenu( _ownerID, _index + 1 );
	}


	/**
	 * Pressed cancel, client send "255" as value
	 */
	function cancel()
	{
		NpcMenu.onSelectMenu( _ownerID, 255 );
	}


	/**
	 * Select an index, change background color
	 */
	function selectIndex()
	{
		NpcMenu.ui.find('.content div').removeClass('selected');
		_index = parseInt(jQuery(this).data('index'), 10);
		NpcMenu.ui.find('.content div:eq('+ _index +')').addClass('selected');
	}


	/**
	 * Abstract callback to define
	 */
	NpcMenu.onSelectMenu = function OnSelectMenu(/*gid, index*/){};


	/**
	 * Create componentand export it
	 */
	return UIManager.addComponent(NpcMenu);
});