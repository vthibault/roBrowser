/**
 * UI/Components/WinLogin/WinLogin.js
 *
 * WinLogin windows
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
	var Client      = require('Core/Client');
	var Preferences = require('Core/Preferences');
	var Renderer    = require('Renderer/Renderer');
	var KEYS        = require('Controls/KeyEventHandler');
	var UIManager   = require('UI/UIManager');
	var UIComponent = require('UI/UIComponent');
	var htmlText    = require('text!./WinLogin.html');
	var cssText     = require('text!./WinLogin.css');


	/**
	 * Create WinLogin namespace
	 */
	var WinLogin = new UIComponent( 'WinLogin', htmlText, cssText );



	/**
	 * Initialize win_login UI - Inherit from UIComponent
	 */
	WinLogin.init = function Init()
	{
		this.preferences = Preferences.get('WinLogin', { saveID:true, ID:'' });

		var ui = this.ui;

		ui.css({ top: (Renderer.height - 120) / 1.5, left: (Renderer.width - 280) / 2.0 });
		this.draggable();

		// Save Elements
		this.inputUsername = ui.find('.user').mousedown(function(event){ this.focus(); this.value = ""; event.stopImmediatePropagation(); return false; });
		this.inputPassword = ui.find('.pass').mousedown(function(event){ this.focus(); this.value = ""; event.stopImmediatePropagation(); return false; });
		this.buttonSave    = ui.find('.save').mousedown(this.toggleSaveButton.bind(this));

		// Connect / Exit
		ui.find('.connect').click( this.connect.bind(this) );
		ui.find('.exit').click( this.exit.bind(this) );
	};


	/**
	 * Once the component is on html - InHerit from UIComponent
	 */
	WinLogin.onAppend = function OnAppend()
	{
		// Complete element
		this.inputUsername.val( this.preferences.saveID ? this.preferences.ID : '');
		this.inputPassword.val( '' );

		// Display save button
		Client.loadFile( 'chk_save' + ( this.preferences.saveID ? 'on' : 'off' ) + '.bmp', function( url ) {
			WinLogin.buttonSave.css('backgroundImage', 'url(' + url + ')');
		});

		if( this.preferences.ID.length ) {
			this.inputPassword.focus();
		}
		else {
			this.inputUsername.focus();
		}
	};


	/**
	 * When player press key - InHerit from UIComponent
	 *
	 * @param {object} event
     * @return {boolean}
	 */
	WinLogin.onKeyDown = function OnKeyDown( event )
	{
		switch( event.which )
		{
			case KEYS.ENTER:
				this.connect();
				event.stopImmediatePropagation();
				return false;

			case KEYS.ESCAPE:
				this.exit();
				event.stopImmediatePropagation();
				return false;

			case KEYS.TAB:
				var button = document.activeElement === this.inputUsername[0] ? this.inputPassword : this.inputUsername;
				button.focus().select();
				event.stopImmediatePropagation();
				return false;
		}

        return true;
	};


	/**
	 * Switch the save button
	 *
	 * @param {object} event
     * @return {boolean}
	 */
	WinLogin.toggleSaveButton = function ToggleSaveButton( event )
	{
		this.preferences.saveID = !this.preferences.saveID;

		Client.loadFile( 'chk_save' + ( this.preferences.saveID ? 'on' : 'off' ) + '.bmp', function( url ) {
			WinLogin.buttonSave.css('backgroundImage', 'url(' + url + ')');
		});

		event.stopImmediatePropagation();
		return false;
	};


	/**
	 * When the user click on Exit, or pressed "Escape"
	 */
	WinLogin.exit = function Exit()
	{
		this.onExitRequest();
		return false;
	};


	/**
	 * When user click on the button "connect", or press "enter".
     *
     * @return {boolean} false
	 */
	WinLogin.connect = function Connect()
	{
		var user = this.inputUsername.val();
		var pass = this.inputPassword.val();

		// Store variable in localStorage
		if ( this.preferences.saveID ) {
			this.preferences.saveID = true;
			this.preferences.ID     = user;
		}
		else {
			this.preferences.saveID = false;
			this.preferences.ID     = "";
		}

		Preferences.save( this.preferences );

		// Connect
		this.onConnectionRequest( user, pass );
		return false;
	};


	/**
	 * Abstract function once user want to connect
	 */
	WinLogin.onConnectionRequest = function OnConnectionRequest(){};


	/**
	 * Abstract function when user want to exit
	 */
	WinLogin.onExitRequest = function OnExitRequest(){};


	/**
	 * Create component based on view file and export it
	 */
	return UIManager.addComponent(WinLogin);
});