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
	'use strict';


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
		this.draggable();
		this.ui.css({ top: (Renderer.height-120)/1.5-49, left: (Renderer.width -280)/2+1 });
		this.ui.find('button').click(validate.bind(this));
		this.ui.find('input').mousedown(function(event) {
			event.stopImmediatePropagation();
		});

		this.overlay = jQuery('<div/>')
			.addClass('win_popup_overlay')
			.css('zIndex', 30)
			.click(function(){
				this.remove();
			}.bind(this));
	};


	/**
	 * Once in HTML, focus the input
	 */
	InputBox.onAppend = function OnAppend()
	{
		this.ui.find('input').select();
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
		if (!this.isPersistent && event.which === KEYS.ENTER) {
			validate.call(this);
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
	function validate()
	{
		var text = this.ui.find('input').val();

		if (!this.isPersistent || text.length) {

			if (this.ui.hasClass('number')) {
				text = parseInt(text, 10) | 0;
			}

			this.onSubmitRequest( text );
		}
	}


	/**
	 * Set input type
	 *
	 * @param {string} input type (number or text)
	 * @param {boolean} is the popup persistent ? false : clicking in any part of the game will remove the input
	 * @param {string|number} default value to show in the input
	 */
	InputBox.setType = function setType( type, isPersistent, defaultVal )
	{
		this.isPersistent = !!isPersistent;

		if (!this.isPersistent) {
			this.overlay.appendTo('body');
		}

		switch (type) {
			case 'number':
				this.ui.addClass('number');
				this.ui.find('.text').text( DB.getMessage(1259) );
				this.ui.find('input').attr('type', 'text');
				defaultVal = defaultVal || 0;
				break;

			case 'text':
				this.ui.removeClass('number');
				this.ui.find('.text').text('');
				this.ui.find('input').attr('type', 'text');
				break;

			case 'pass':
				this.ui.removeClass('number');
				this.ui.find('.text').text('');
				this.ui.find('input').attr('type', 'password');
				break;

			case 'mail':
				this.ui.removeClass('number');
				this.ui.find('.text').text( DB.getMessage(300) );
				this.ui.find('input').attr('type', 'password');
				break;
		}

		if (typeof defaultVal !== 'undefined') {
			this.ui.find('input')
				.val( defaultVal )
				.select();
		}
	};


	/**
	 * Callback to define
	 */
	InputBox.onSubmitRequest = function OnSubmitRequest(){};


	/**
	 * Stored component and return it
	 */
	return UIManager.addComponent(InputBox);
});