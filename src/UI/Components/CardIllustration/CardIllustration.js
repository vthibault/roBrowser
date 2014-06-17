/**
 * UI/Components/CardIllustration/CardIllustration.js
 *
 * Card image
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
	var DB                 = require('DB/DBManager');
	var Client             = require('Core/Client');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var htmlText           = require('text!./CardIllustration.html');
	var cssText            = require('text!./CardIllustration.css');


	/**
	 * Create Component
	 */
	var CardIllustration = new UIComponent( 'CardIllustration', htmlText, cssText );


	/**
	 * Initialize events
	 */
	CardIllustration.init = function init()
	{
		this.ui.find('.close').click(this.remove.bind(this));
		this.draggable();
	};


	/**
	 * Show image
	 *
	 * @param {object} item
	 */
	CardIllustration.setCard = function setCard( item )
	{
		this.ui.find('.titlebar .text').text( item.identifiedDisplayName );
		this.ui.find('.content').css('backgroundImage', 'none' );

		Client.loadFile( DB.INTERFACE_PATH + 'cardbmp/' + item.illustResourcesName + '.bmp', function(data){
			this.ui.find('.content').css('backgroundImage', 'url('+data+')' );
		}.bind(this));
	};

	
	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(CardIllustration);
});