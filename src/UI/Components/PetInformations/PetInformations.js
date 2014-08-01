/**
 * UI/Components/PetInformations/PetInformations.js
 *
 * Display pet informations
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
	var DB                   = require('DB/DBManager');
	var Client               = require('Core/Client');
	var Preferences          = require('Core/Preferences');
	var Renderer             = require('Renderer/Renderer');
	var UIManager            = require('UI/UIManager');
	var UIComponent          = require('UI/UIComponent');
	var htmlText             = require('text!./PetInformations.html');
	var cssText              = require('text!./PetInformations.css');


	/**
	 * Create Component
	 */
	var PetInformations = new UIComponent( 'PetInformations', htmlText, cssText );


	/**
	 * @var {Preferences} Window preferences
	 */
	var _preferences = Preferences.get('PetInformations', {
		x:        100,
		y:        200,
		show:     true,
	}, 1.0);


	/**
	 * Initialize component
	 */
	PetInformations.init = function init()
	{
		this.draggable(this.ui.find('.titlebar'));

		this.ui.find('.base').mousedown(stopPropagation);
		this.ui.find('.close').click(onClose);
		this.ui.find('.modify').click(onChangeName);
		this.ui.find('.command').change(onCommandSelected);

		if (!_preferences.show) {
			this.ui.hide();
		}

		this.ui.css({
			top:  Math.min( Math.max( 0, _preferences.y), Renderer.height - this.ui.height()),
			left: Math.min( Math.max( 0, _preferences.x), Renderer.width  - this.ui.width())
		});
	};


	/**
	 * Once remove from body, save user preferences
	 */
	PetInformations.onRemove = function onRemove()
	{
		// Save preferences
		_preferences.show   =  this.ui.is(':visible');
		_preferences.y      =  parseInt(this.ui.css('top'), 10);
		_preferences.x      =  parseInt(this.ui.css('left'), 10);
		_preferences.save();
	};


	/**
	 * Process shortcut
	 *
	 * @param {object} key
	 */
	PetInformations.onShortCut = function onShortCut( key )
	{
		// Not in body
		if (!this.ui) {
			return;
		}

		switch (key.cmd) {
			case 'TOGGLE':
				this.ui.toggle();
				if (this.ui.is(':visible')) {
					this.focus();
				}
				break;
		}
	};


	/**
	 * Update UI
	 *
	 * @param {object} pet info
	 */
	PetInformations.setInformations = function setInformations(info)
	{
		this.ui.find('.name').val(info.szName);
		this.ui.find('.level').text(info.nLevel);

		this.setHunger(info.nFullness);
		this.setIntimacy(info.nRelationship);

		this.ui.find('.accessory').text(DB.getMessage(info.ITID ? 598 : 600));

		Client.loadFile( DB.getPetIllustPath(info.job), function(data){
			this.ui.find('.content').css('backgroundImage', 'url('+ data +')');
		}.bind(this));

		if (!info.bModified) {
			this.ui.find('.name, .modify').removeClass('disabled').attr('disabled', false);
		}
		else {
			this.ui.find('.name, .modify').addClass('disabled').attr('disabled', true);
		}
	};


	/**
	 * Set intimacy
	 *
	 * @param {number} intimacy
	 */
	PetInformations.setIntimacy = function setIntimacy(val)
	{
		this.ui.find('.intimacy').text(DB.getMessage(
			val < 100 ? 672 :
			val < 250 ? 673 :
			val < 600 ? 669 :
			val < 900 ? 674 :
			675
		));
	};


	/**
	 * Set hunger value 
	 *
	 * @param {number} hunger
	 */
	PetInformations.setHunger = function setHunger(val)
	{
		this.ui.find('.hunger').text(DB.getMessage(
			val < 10 ? 667 :
			val < 25 ? 668 :
			val < 75 ? 669 :
			val < 90 ? 670 :
			671
		));
	};


	/**
	 * User just execute a command
	 */
	function onCommandSelected()
	{
		switch (this.value) {
			case 'feed':
				PetInformations.reqPetFeed();
				break;

			case 'action':
				PetInformations.reqPetAction();
				break;

			case 'release':
				PetInformations.reqBackToEgg();
				break;

			case 'unequip':
				PetInformations.reqUnEquipPet();
				break;

			default:
		}

		this.value = 'default';
	}


	/**
	 * Request to modify pet's name
	 */
	function onChangeName()
	{
		var input = PetInformations.ui.find('.name');
		PetInformations.reqNameEdit( input.val() );
	}


	/**
	 * Closing window
	 */
	function onClose()
	{
		PetInformations.ui.hide();
	}


	/**
	 * Stop event propagation
	 */
	function stopPropagation( event )
	{
		event.stopImmediatePropagation();
		return false;
	}


	/**
	 * Functions defined in Engine/MapEngine/Pet.js
	 */
	PetInformations.reqPetFeed    = function reqPetFeed(){};
	PetInformations.reqPetAction  = function reqPetAction(){};
	PetInformations.reqNameEdit   = function reqNameEdit(){};
	PetInformations.reqUnEquipPet = function reqUnEquipPet(){};
	PetInformations.reqBackToEgg  = function reqBackToEgg(){};


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(PetInformations);
});