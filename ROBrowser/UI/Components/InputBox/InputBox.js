/**
 * UI/Components/InputBox/InputBox.js
 *
 * NPC input GUI
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
	var Renderer           = require('Renderer/Renderer');
	var KEYS               = require('Controls/KeyEventHandler');
	var DB                 = require('DB/DBManager');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var htmlText           = require('text!./InputBox.html');
	var cssText            = require('text!./InputBox.css');


	/**
	 * Create NpcBox component
	 */
	var InputBox = new UIComponent( 'InputBox', htmlText, cssText );


	/**
	 * Initialize GUI
	 */
	InputBox.init = function Init()
	{
		var self = this;

		this.draggable();
		this.ui.css({ top: (Renderer.height-120)/1.5-49, left: (Renderer.width -280)/2+1 });
		this.ui.find('button').click( this.validate.bind(this) );

		this.overlay = jQuery('<div/>')
			.addClass('win_popup_overlay')
			.css('zIndex', 30)
			.click(function(){
				self.remove();
			})
		;
	};


	/**
	 * Once in HTML, focus the input
	 */
	InputBox.onAppend = function OnAppend()
	{
		this.ui.find('input').focus();
	};


	/**
	 * Remove data from UI
	 */
	InputBox.onRemove = function OnRemove()
	{
		this.ui.find('input').val('');
		this.ui.find('.text').text('');
		this.overlay.detach();
	};


	/**
	 * Key Listener
	 *
	 * @param {object} event
	 * @return {boolean}
	 */
	InputBox.onKeyDown = function OnKeyDown( event )
	{
		if( !this.isPersistent && event.which === KEYS.ENTER ) {
			this.validate();
			event.stopImmediatePropagation();
			return false;
		}

		return true;
	};


	/**
	 * Validate input
	 *
	 * @param {ClickEvent}
	 */
	InputBox.validate = function Validate()
	{
		var text = this.ui.find('input').val();
		if( !this.isPersistent || text.length && ( !this.ui.hasClass('number') || parseInt(text, 10) > 0 )) {
			this.onSubmitRequest( text );
		}
	};


	/**
	 * Set input type
	 *
	 * @param {string} input type (number or text)
	 */
	InputBox.setType = function( type, isPersistent )
	{
		this.isPersistent = !!isPersistent;

		if( !this.isPersistent ) {
			this.overlay.appendTo('body');
		}

		switch( type ) {
			case 'number':
				this.ui.addClass('number');
				this.ui.find('.text').text( DB.msgstringtable[1259] );
				this.ui.find('input').attr('type', 'text').val(0).select();
				break;
	
			case 'text':
				this.ui.removeClass('number');
				this.ui.find('.text').text('');
				this.ui.find('input').attr('type', 'text');
				break;

			case 'mail':
				this.ui.removeClass('number');
				this.ui.find('.text').text( DB.msgstringtable[300] );
				this.ui.find('input').attr('type', 'password');
				break;
		}
	};


	/**
	 * Callback to define
	 */
	InputBox.onSubmitRequest = function OnSubmitRequest(text){};


	/**
	 * Stored component and return it
	 */
	return UIManager.addComponent(InputBox);
});