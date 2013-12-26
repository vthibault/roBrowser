/**
 * UI/Components/EntityRoom/EntityRoom.js
 *
 * Entity room (chat room, shop room, ...)
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
	var htmlText           = require('text!./EntityRoom.html');
	var cssText            = require('text!./EntityRoom.css');


	/**
	 * Createcomponent
	 */
	var EntityRoom = new UIComponent( 'EntityRoom', htmlText, cssText );



	/**
	 * Once in HTML, focus the input
	 */
	EntityRoom.onAppend = function OnAppend()
	{
		this.ui.find('button').dblclick(this.onEnter);
		this.ui.css('zIndex', 45);
	};


	/**
	 * Remove data from UI
	 */
	EntityRoom.onRemove = function OnRemove()
	{
		this.ui.find('button').unbind();
	};


	/**
	 * Define title and icons
	 *
	 * @param {string} title
	 * @param {string} url - icon url
	 */
	EntityRoom.setTitle = function SetTitle( title, url )
	{
		this.ui.find('button').css('backgroundImage', 'url('+ url +')');
		this.ui.find('.title, .overlay').text(title);
	};


	/**
	 * function to define
	 */
	EntityRoom.onEnter = function OnEnter(){};


	/**
	 * Stored component and return it
	 */
	return UIManager.addComponent(EntityRoom);
});