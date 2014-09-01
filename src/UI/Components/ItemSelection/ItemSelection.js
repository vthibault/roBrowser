/**
 * UI/Components/ItemSelection/ItemSelection.js
 *
 * ItemSelection windows
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
	var DB          = require('DB/DBManager');
	var SkillInfo   = require('DB/Skills/SkillInfo');
	var Client      = require('Core/Client');
	var Renderer    = require('Renderer/Renderer');
	var UIManager   = require('UI/UIManager');
	var UIComponent = require('UI/UIComponent');
	var Inventory   = require('UI/Components/Inventory/Inventory');
	var htmlText    = require('text!./ItemSelection.html');
	var cssText     = require('text!./ItemSelection.css');


	/**
	 * Create ItemSelection namespace
	 */
	var ItemSelection = new UIComponent( 'ItemSelection', htmlText, cssText );


	/**
	 * Initialize UI
	 */
	ItemSelection.init = function init()
	{
		// Show at center.
		this.ui.css({
			top:  (Renderer.height- 200)/2,
			left: (Renderer.width - 200)/2
		});

		this.list  = this.ui.find('.list:first');
		this.index = 0;

		this.draggable(this.ui.find('.head'));

		// Click Events
		this.ui.find('.ok').click( this.selectIndex.bind(this) );
		this.ui.find('.cancel').click(function(){
			this.index = -1;
			this.selectIndex();
		}.bind(this) );

		// Bind events
		this.ui
			.on('dblclick', '.item', this.selectIndex.bind(this))
			.on('mousedown', '.item', function(){
				ItemSelection.setIndex( Math.floor(this.getAttribute('data-index')) );
			});
	};


	/**
	 * Add elements to the list
	 *
	 * @param {Array} list object to display
	 */
	ItemSelection.setList = function setList( list, isSkill )
	{
		var i, count;
		var item, it, file, name;

		ItemSelection.list.empty();

		for (i = 0, count = list.length; i < count; ++i) {
			if (isSkill) {
				item = SkillInfo[list[i]];
				file = item.Name;
				name = item.SkillName;
			}
			else {
				item = Inventory.getItemByIndex(list[i]);
				it   = DB.getItemInfo( item.ITID );
				file = item.IsIdentified ? it.identifiedResourceName : it.unidentifiedResourceName;
				name = item.IsIdentified ? it.identifiedDisplayName : it.unidentifiedDisplayName;
			}

			addElement( DB.INTERFACE_PATH + 'item/' + file + '.bmp', list[i], name);
		}

		this.setIndex(list[0]);
	};


	/**
	 * Add an element to the list
	 *
	 * @param {string} image url
	 * @param {index} index in list
	 * @param {string} element name
	 */
	function addElement( url, index, name)
	{
		ItemSelection.list.append(
			'<div class="item" data-index="'+ index +'">' +
				'<div class="icon"></div>' +
				'<span class="name">' + jQuery.escape(name) + '</span>' +
			'</div>'
		);

		Client.loadFile( url, function(data){
			ItemSelection.list
				.find('div[data-index='+ index +'] .icon')
				.css('backgroundImage', 'url('+ data +')');
		});
	}


	/**
	 * Change selection
	 *
	 * @param {number} id in list
	 */
	ItemSelection.setIndex = function setIndex( id )
	{
		this.list.find('div[data-index='+ this.index +']').css('backgroundColor', 'transparent');
		this.list.find('div[data-index='+ id         +']').css('backgroundColor', '#cde0ff');
		this.index = id;
	};


	/**
	 * Select a server, callback
	 */
	ItemSelection.selectIndex = function selectIndex()
	{
		this.onIndexSelected( this.index );
		this.remove();
	};



	/**
	 * Free variables once removed from HTML
	 */
	ItemSelection.onRemove = function onRemove()
	{
		this.index = 0;
	};


	/**
	 * Set new window name
	 *
	 * @param {string} title
	 */
	ItemSelection.setTitle = function setTitle( title )
	{
		this.ui.find('.head .text').text( title );
	};


	/**
	 * Functions to define
	 */
	ItemSelection.onIndexSelected = function onIndexSelected(){};


	/**
	 * Create component based on view file and export it
	 */
	return UIManager.addComponent(ItemSelection);
});