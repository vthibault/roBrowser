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

 		// This should manage with preferences
 		this.ui.hide();

 		// Close button
 		ui.find('.titlebar .close').click(function(){
			Guild.ui.hide();
			return false;
		});

 		// Guild gui Tabs
 		ui.find("#tabs li").click(function(){
	        ui.find("#tabs li").removeClass('active');
	 	    jQuery(this).addClass("active");
	        ui.find(".tab_content").hide();
	        var selected_tab = jQuery(this).find("a").attr("href");
	        jQuery (selected_tab).fadeIn();

	        return false;
 		});

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

	Guild.members = {};

	Guild.exp = 0;


	/**
	 * Process shortcut
	 *
	 * @param {object} key
	 */
	Guild.onShortCut = function onShurtCut( key )
	{
		requestGuildInfo();
		
		switch (key.cmd) {
			case 'TOGGLE':
					Guild.onToggle();
				break;
		}
	};

	function requestGuildInfo() 
	{
		Guild.onGuildInfoRequest(Guild.INFO.BASIC);
		Guild.onGuildInfoRequest(Guild.INFO.MEMBERS);
	}

	Guild.onToggle = function onToggle () {
		this.ui.toggle();
		if (this.ui.is(':visible')) {
			this.ui[0].parentNode.appendChild(this.ui[0]);
		}
		else { // Fix Mouse.intersect bug
			this.ui.trigger('mouseleave');
		}
	}

	Guild.updateBasicInfo = function updateBasicInfo( data ) 
	{
		for(var i in data) 
			this.ui.find("#"+i).html(data[i]);

		//Maybe Not the best place to get experience
		console.log(data.exp);
		Guild.exp = data.exp;
	}


	Guild.addSubMembers = function addSubMembers( data ) 
	{
		Guild.members = data;

		//Need to refresh online users when message arrive
		Guild.updateOnlineMembers();

		//This for update meber list
		Guild.updateMemberList();
	}


	/**
	 * Refresh Online count on Basic info
	 */
	Guild.updateOnlineMembers = function updateOnlineMembers() 
	{
		var online = 0;

		for(var member in Guild.members)
			online += Guild.members[member].CurrentState;

		this.ui.find("#gmonline").html(online);
	}

	Guild.updateMemberList = function updateMemberList() {
		this.ui.find(".guild_members tbody").html("");
		for(var member in Guild.members) {
			var row = jQuery( document.createElement('tr') );
			row.append("<td>"+Guild.members[member].CharName+"</td>");
			row.append("<td>"+Guild.members[member].GPositionID+"</td>");
			row.append("<td>"+Guild.members[member].Job+"</td>");
			row.append("<td>"+Guild.members[member].Level+"</td>");
			row.append("<td>"+Guild.members[member].Memo+"</td>");
			var gexp = parseInt(Guild.exp);
			var mexp = parseInt(Guild.members[member].MemberExp);
			var devotion = (gexp) ? ( mexp /  gexp) * 100 : 0;
			row.append("<td>"+devotion+"%</td>"); 
			row.append("<td>"+Guild.members[member].MemberExp+"</td>");
			this.ui.find(".guild_members tbody").append(row);;
		}
			
		
	}



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