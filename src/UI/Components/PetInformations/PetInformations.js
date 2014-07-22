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
	var MsgStringIDs = require('DB/MsgStringIds');
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
		var ui = this.ui;

		this.draggable();

		ui.find('.close').mousedown(function(event){
			ui.hide();
			event.stopImmediatePropagation();
		});

		ui.find('.name').mousedown(function(event){
			event.stopImmediatePropagation();
		});

		ui.find('.modify').mousedown(function(event){
			event.stopImmediatePropagation();
			PetInformations.reqNameEdit( ui.find('.name').val() );
		});

		ui.find('.command').mousedown(function(event){
			event.stopImmediatePropagation();
		});

		ui.find('.command').change(function(){
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
		});
	};


	/**
	 * Once append to body, remember of user configs
	 */
	PetInformations.onAppend = function onAppend()
	{
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
					this.ui[0].parentNode.appendChild(this.ui[0]);
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

		this.ui.find('.accessory').text(DB.getMessage(info.ITID ? MsgStringIDs.MSI_ITEM_EQUIPED : MsgStringIDs.MSI_ITEM_UNEQUIPED));

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
			val < 100 ? MsgStringIDs.MSI_VERY_AWKWARD :
			val < 250 ? MsgStringIDs.MSI_AWKWARD :
			val < 600 ? MsgStringIDs.MSI_NORMAL :
			val < 900 ? MsgStringIDs.MSI_FRIENDLY :
			MsgStringIDs.MSI_VERY_FRIENDLY
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
			val < 10 ? MsgStringIDs.MSI_VERY_HUNGRY :
			val < 25 ? MsgStringIDs.MSI_HUNGRY :
			val < 75 ? MsgStringIDs.MSI_NORMAL :
			val < 90 ? MsgStringIDs.MSI_REPLETE :
			MsgStringIDs.MSI_VERY_REPLETE
		));
	};


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