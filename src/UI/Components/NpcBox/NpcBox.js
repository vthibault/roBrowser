/**
 * UI/Components/NpcBox/NpcBox.js
 *
 * NPC Box windows
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
	var jQuery      = require('Utils/jquery');
	var KEYS        = require('Controls/KeyEventHandler');
	var Renderer    = require('Renderer/Renderer');
	var UIManager   = require('UI/UIManager');
	var UIComponent = require('UI/UIComponent');
	var htmlText    = require('text!./NpcBox.html');
	var cssText     = require('text!./NpcBox.css');


	/**
	 * Create NpcBox component
	 */
	var NpcBox = new UIComponent( 'NpcBox', htmlText, cssText );



	/**
	 * @var {boolean} does the box need to be clean up?
	 */
	NpcBox.needCleanUp = false;


	/**
	 * @var {integer} NPC GID
	 */
	NpcBox.ownerID = 0;


	/**
	 * Initialize Component
	 */
	NpcBox.init = function Init()
	{
		this.buttonNext    = this.ui.find('.next');
		this.buttonClose   = this.ui.find('.close');
		this.Content       = this.ui.find('.content');

		this.ui.css({ top: Math.max(100, Renderer.height/2 - 200), left: Math.max( Renderer.width/3, 20) });
		this.draggable();

		// Bind mouse
		this.buttonNext.click( NpcBox.next.bind(this) );
		this.buttonClose.click( NpcBox.close.bind(this) );
	};


	/**
	 * Once NPC Box is removed from HTML, clean up data
	 */
	NpcBox.onRemove = function OnRemove()
	{
		this.buttonNext.hide();
		this.buttonClose.hide();
		this.Content.text('');
		this.needCleanUp = false;
		this.ownerID     = 0;

		// Cutin system
		var cutin = document.getElementById('cutin');
		if( cutin ) {
			document.body.removeChild( cutin );
		}
	};


	/**
	 * Add support for Enter key
	 */
	NpcBox.onKeyDown = function OnKeyDown( event )
	{
		switch( event.which ) {
			case KEYS.ENTER:
				if( this.buttonNext.is(":visible") ) {
					this.next();
					break;
				}
				else if( this.buttonClose.is(":visible") ) {
					this.close();
					break;
				}
				return true;

			case KEYS.ESCAPE:
				if( this.buttonClose.is(":visible") ) {
					this.close;	
					break;
				}
				return true;

			default:
				return true;
		}

		event.stopImmediatePropagation();
		return false;
	};


	/**
	 * Add text to box
	 *
	 * @param {string} text to display
	 * @param {number} gid - npc id
	 */
	NpcBox.setText = function SetText( text, gid )
	{
		this.ownerID = gid;

		if( this.needCleanUp ) {
			this.needCleanUp = false;
			this.Content.text('');
		}

		this.Content.append( jQuery('<div/>').text(text) );
	};


	/**
	 * Add next button
	 *
	 * @param {number} gid - npc id
	 */
	NpcBox.addNext = function addNext( gid )
	{
		this.ownerID = gid;
		this.buttonNext.show();
	};


	/**
	 * Add close button
	 *
	 * @param {number} gid - npc id
	 */
	NpcBox.addClose = function addClose( gid )
	{
		this.ownerID = gid;
		this.buttonClose.show();
	};


	/**
	 * Press "next" button
	 */
	NpcBox.next = function Next()
	{
		this.needCleanUp = true;
		this.buttonNext.hide();
		this.onNextPressed( this.ownerID );
	};


	/**
	 * Press "close" button
	 */
	NpcBox.close = function Close()
	{
		this.needCleanUp = true;
		this.buttonClose.hide();
		this.onClosePressed( this.ownerID );
	};


	/**
	 * Callback
	 */
	NpcBox.onClosePressed = function OnClosePressed(){};
	NpcBox.onNextPressed  = function OnNextPressed(){};


	/**
	 * Create component based on view file and export it
	 */
	return UIManager.addComponent(NpcBox);
});