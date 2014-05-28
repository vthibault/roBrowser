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
	var Entity             = require('Renderer/Entity/Entity');
	var SpriteRenderer     = require('Renderer/SpriteRenderer');
	var Camera             = require('Renderer/Camera');
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

	/**
	 * Guild Members List
	 */
	Guild.members = new Array();

	/**
	 * Guild Member Object.
	 */
	Guild.member = function( member ) {
		this._entity = new Entity();
		this._entity._head        = member.HeadType;
		this._entity._headpalette = member.HeadPalette;
		this._entity._sex         = member.Sex;
		this._entity.objecttype   = Entity.TYPE_PC;
		this._entity.files.shadow.spr = null;

		var canvas = document.createElement('canvas');
			canvas.width  = 30;
			canvas.height = 30;

		this._ctx = canvas.getContext('2d');
		SpriteRenderer.bind2DContext(this._ctx, 15,45);
		this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);

		Camera.direction = 4;
		this._entity.set(this);
		this._entity.renderEntity();

		var gexp = parseInt(Guild.exp);
		var mexp = parseInt(member.MemberExp);

		this.CharName = member.CharName;
		this.GPositionID = member.GPositionID;
		this.Job = member.Job;
		this.Level = member.Level;
		this.Memo = member.Memo;
		this.Devotion = (gexp) ? ( mexp /  gexp) * 100 : 0;
		this.MemberExp = member.MemberExp;
	}

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
		Guild.exp = data.exp;
	}


	Guild.addSubMembers = function addSubMembers( data ) 
	{
		Guild.members = new Array();

		for(var member in data)
			Guild.members.push(new Guild.member(data[member]));
			

		//Need to refresh online users when message arrive
		//Guild.updateOnlineMembers();

		//This to update meber list
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

	Guild.updateMemberList = function updateMemberList() 
	{
		this.ui.find(".guild_members tbody").html("");
		for(var i = 0; i < Guild.members.length; i++) {
			var row = jQuery( document.createElement('tr') );
			for(var prop in Guild.members[i])
				if(!prop.match(/_/g)) // Only Public props
					row.append("<td>"+Guild.members[i][prop]+"</td>");

			// Apend guild member head to the first <<TD>> only			
			row.find("td").eq(0).prepend(jQuery(Guild.members[i]._ctx.canvas).addClass("member_avatar"));

			this.ui.find(".guild_members tbody").append(row);
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