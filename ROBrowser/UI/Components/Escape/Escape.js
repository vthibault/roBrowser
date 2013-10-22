/**
 * UI/Components/Escape/Escape.js
 *
 * Game Escape window, manage options
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
	var KEYS               = require('Controls/KeyEventHandler');
	var Renderer           = require('Renderer/Renderer');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var htmlText           = require('text!./Escape.html');
	var cssText            = require('text!./Escape.css');


	/**
	 * Create Escape window component
	 */
	var Escape = new UIComponent( 'Escape', htmlText, cssText );


	/**
	 * Initialize UI
	 */
	Escape.init = function Init()
	{
		this.ui.css({ top: (Renderer.height-this.ui.height()) * 0.75, left:(Renderer.width-this.ui.width()) * 0.5 });
		this.draggable();
	};


	/**
	 * Window must not be visible once append
	 * but need to be here to manage key event
	 */
	Escape.onAppend = function OnAppend()
	{
		this.ui.hide();

		// Only used in specific case
		this.ui.find('button').show();
		this.ui.find('.resurection, .savepoint').hide();

		this.ui.find('.resurection').click(this.onResurectionRequest);
		this.ui.find('.savepoint').click(this.onReturnSavePointRequest);
		this.ui.find('.charselect').click(this.onCharSelectionRequest);
		this.ui.find('.exit').click(this.onExitRequest);
		this.ui.find('.cancel').click(function(){ Escape.ui.hide(); });
	};


	/**
	 * Key Listener
     *
     * @param {object} event
     * @return {boolean}
	 */
	Escape.onKeyDown = function OnKeyDown( event )
	{
		if( event.which === KEYS.ESCAPE ) {

			if( this.ui.is(':visible') ) {
				this.ui.hide();	
			}
			else {
				this.ui.show();	
			}

			event.stopImmediatePropagation();
            return false;
		}

        return true;
	};


	/**
	 * @var {function} callback when player want to resuret using Token of Siegfried
	 */
	Escape.onResurectionRequest = function OnResurectionRequest(){};


	/**
	 * @var {function} callback to define to disconnect from game
	 */
	Escape.onExitRequest = function OnExitRequest(){};


	/**
	 * @var {function} callback when player want to resurect using Token of Siegfried
	 */
	Escape.onReturnSavePointRequest = function OnReturnSavePointRequest(){};


	/**
	 * @var {function} callback when player want to return to char selection
	 */
	Escape.onCharSelectionRequest = function OnCharSelectionRequest(){};


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(Escape);
});