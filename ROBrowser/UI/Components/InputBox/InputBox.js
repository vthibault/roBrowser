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
	var Renderer           = require('Renderer/Renderer');
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
		this.draggable();
		this.ui.css({ top: (Renderer.height-120)/1.5-49, left: (Renderer.width -280)/2+1 });
		this.ui.find('button').click( this.validate.bind(this) );
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
	};


	/**
	 * Validate input
	 *
	 * @param {ClickEvent}
	 */
	InputBox.validate = function Validate( event )
	{
		var text = this.ui.find('input').val();
		if( text.length && ( !this.ui.hasClass('number') || parseInt(text, 10) > 0 )) {
			this.onSubmitRequest( text );
		}
	};


	/**
	 * Set input type
	 *
	 * @param {string} input type (number or text)
	 */
	InputBox.setType = function( type )
	{
		switch( type ) {
			case 'number':
				this.ui.addClass('number');
				this.ui.find('.text').text( DB.msgstringtable[1256] );
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