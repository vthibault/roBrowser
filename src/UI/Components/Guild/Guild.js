/**
 * UI/Components/Guild/Guild.js
 *
 * Chararacter Guild
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Javierlog08
 */
define(function(require)
{
	'use strict';

	/**
	 * Dependencies
	 */
	var DB                 = require('DB/DBManager');
	var jQuery             = require('Utils/jquery');
	var Client             = require('Core/Client');
	var Preferences        = require('Core/Preferences');
	var Renderer           = require('Renderer/Renderer');
	var Mouse              = require('Controls/MouseEventHandler');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var htmlText           = require('text!./Guild.html');
	var cssText            = require('text!./Guild.css');

	/**
	 * Create Component
	 */
	var Guild = new UIComponent( 'Guild', htmlText, cssText );

	Guild.init = function init()
 	{
 		var ui = this.ui;
 		ui.find("#tabs li").click(function(){
 			 //  First remove class "active" from currently active tab
	        ui.find("#tabs li").removeClass('active');
	 
	        //  Now add class "active" to the selected/clicked tab
	        jQuery(this).addClass("active");
	 
	        //  Hide all tab content
	        ui.find(".tab_content").hide();
	 
	        //  Here we get the href value of the selected tab
	        var selected_tab = jQuery(this).find("a").attr("href");
	 
	        //  Show the selected tab content
	        jQuery (selected_tab).fadeIn();
	 
	        //  At the end, we add return false so that the click on the link is not executed
	        return false;
 		});
 		//this.ui.find('.close').click(this.remove.bind(this));
 		this.draggable();
 	};

 	/**
	 * Guild Info Types
	 */
	Guild.INFO = {
		BASIC:       0,
		MEMBERS:     1,
		POSITION:    2,
		SKILLS:      3,
	};


	/**
	 * Process shortcut
	 *
	 * @param {object} key
	 */
	Guild.onShortCut = function onShurtCut( key )
	{
		Guild.onGuildInfoRequest(Guild.INFO.BASIC);
		Guild.onGuildInfoRequest(Guild.INFO.MEMBERS);
		console.log(this);
		switch (key.cmd) {
			case 'TOGGLE':
				this.ui.toggle();
				if (this.ui.is(':visible')) {
					this.ui[0].parentNode.appendChild(this.ui[0]);
				}
				else { // Fix Mouse.intersect bug
					this.ui.trigger('mouseleave');
				}
				break;
		}
	};

	/**
	 * When Requesting Guild Information Screen.
	 * @param {int}	type
	 *  BASIC:       0, //	Request packets ZC_GUILD_INFO2, MYGUILD_BASIC_INFO
	 *	MEMBERS:     1, //	Request packets ZC_MEMBERMGR_INFO, ZC_POSITION_ID_NAME_INFO
	 *	POSITION:    2, //	Request packets ZC_POSITION_ID_NAME_INFO, ZC_POSITION_INFO
	 *	SKILLS:      3, //	Request packets ZC_GUILD_SKILLINFO
	 */
	Guild.onGuildInfoRequest = function(/* request information type */){};

	/**
	 * Create componentand export it
	 */
	return UIManager.addComponent(Guild);

});