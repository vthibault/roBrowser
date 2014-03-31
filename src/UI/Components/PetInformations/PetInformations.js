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
	var UIManager            = require('UI/UIManager');
	var UIComponent          = require('UI/UIComponent');
	var KEYS                 = require('Controls/KeyEventHandler');
	var htmlText             = require('text!./PetInformations.html');
	var cssText              = require('text!./PetInformations.css');


	/**
	 * Create Component
	 */
	var PetInformations = new UIComponent( 'PetInformations', htmlText, cssText );


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
					UIManager.showPromptBox( DB.msgstringtable[601], 'ok', 'cancel', function(){
						PetInformations.reqPetFeed();
					}, null);
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
	 * Bind keys
	 */
	PetInformations.onKeyDown = function onKeyDown(event)
	{
		if (KEYS.ALT && event.which === KEYS.J) {
			this.ui.toggle();
			if (this.ui.is(':visible')) {
				this.ui[0].parentNode.appendChild(this.ui[0]);
			}
			event.stopImmediatePropagation();
			return false;
		}

		return true;
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

		this.ui.find('.accessory').text(DB.msgstringtable[info.ITID ? 598 : 600]);

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
		this.ui.find('.intimacy').text(DB.msgstringtable[
			val < 100 ? 672 :
			val < 250 ? 673 :
			val < 600 ? 669 :
			val < 900 ? 674 :
			675
		]);
	};


	/**
	 * Set hunger value 
	 *
	 * @param {number} hunger
	 */
	PetInformations.setHunger = function setHunger(val)
	{
		this.ui.find('.hunger').text(DB.msgstringtable[
			val < 10 ? 667 :
			val < 25 ? 668 :
			val < 75 ? 669 :
			val < 90 ? 670 :
			671
		]);
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