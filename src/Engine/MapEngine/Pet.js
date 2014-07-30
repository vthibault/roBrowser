/**
 * Engine/MapEngine/Pet.js
 *
 * Manage Pets
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function( require )
{
	'use strict';


	/**
	 * Load dependencies
	 */
	var DB                   = require('DB/DBManager');
	var Network              = require('Network/NetworkManager');
	var PACKET               = require('Network/PacketStructure');
	var Client               = require('Core/Client');
	var Session              = require('Engine/SessionStorage');
	var EntityManager        = require('Renderer/EntityManager');
	var UIManager            = require('UI/UIManager');
	var SlotMachine          = require('UI/Components/SlotMachine/SlotMachine');
	var SkillTargetSelection = require('UI/Components/SkillTargetSelection/SkillTargetSelection');
	var ItemSelection        = require('UI/Components/ItemSelection/ItemSelection');
	var ChatBox              = require('UI/Components/ChatBox/ChatBox');
	var PetInformations      = require('UI/Components/PetInformations/PetInformations');


	/**
	 * Server ask to select a monster
	 *
	 * @param {object} pkt - PACKET.ZC.START_CAPTURE
	 */
	function onStartCapture( pkt )
	{
		var fakeSkill = { SKID:-10, level:0 };

		SkillTargetSelection.append();
		SkillTargetSelection.set( fakeSkill, SkillTargetSelection.TYPE.PET, 'Capture Monster');
		SkillTargetSelection.onPetSelected = function onPetSelected(gid){
			SlotMachine.append();
			SlotMachine.onTry = function onTry(){
				var pkt       = new PACKET.CZ.TRYCAPTURE_MONSTER();
				pkt.targetAID = gid;
				Network.sendPacket(pkt);
			};
		};
	}


	/**
	 * Received capture result from server
	 *
	 * @param {object} pkt - PACKET.ZC.TRYCAPTURE_MONSTER
	 */
	function onCaptureResult( pkt )
	{
		SlotMachine.setResult( pkt.result );
	}


	/**
	 * Get pet list from server
	 *
	 * @param {object} pkt - PACKET.ZC.PETEGG_LIST
	 */
	function onPetList( pkt )
	{
		if (!pkt.eggList.length) {
			return;
		}

		ItemSelection.append();
		ItemSelection.setList(pkt.eggList);
		ItemSelection.setTitle(DB.getMessage(599));
		ItemSelection.onIndexSelected = function(index) {
			if (index > -1) {
				var pkt   = new PACKET.CZ.SELECT_PETEGG();
				pkt.index = index;
				Network.sendPacket(pkt);
			}
		};
	}


	/**
	 * Get own pet information from server
	 *
	 * @param {object} pkt - PACKET.ZC.PROPERTY_PET
	 */
	function onPetInformation( pkt )
	{
		PetInformations.append();
		PetInformations.setInformations( pkt );

		if (Session.petId) {
			var entity = EntityManager.get(Session.petId);
			if (entity) {
				entity.life.hp     = pkt.nFullness;
				entity.life.hp_max = 100;
				entity.life.update();
			}
		}
	}


	/**
	 * Result from feeding your pet
	 *
	 * @param {object} pkt - PACKET.ZC.FEED_PET
	 */
	function onFeedResult( pkt )
	{
		// Fail to feed
		if (!pkt.cRet) {
			ChatBox.addText( DB.getMessage(591).replace('%s', DB.getItemInfo(pkt.ITID).identifiedDisplayName), ChatBox.TYPE.ERROR);
			return;
		}

		// success, what to do ? Action feed ? or is it sent by server ?
	}


	/**
	 * Update pet information
	 *
	 * @param {object} pkt - PACKET.ZC.CHANGESTATE_PET
	 */
	function onPetInformationUpdate( pkt )
	{
		var entity = EntityManager.get(pkt.GID);
		var path;

		if (!entity) {
			return;
		}

		switch (pkt.type) {
			case 0: // know what our pet is
				Session.petId = pkt.GID; // should we delete it later ?
				break;

			case 1:
				PetInformations.setIntimacy(pkt.data);
				break;

			case 2:
				PetInformations.setHunger(pkt.data);
				entity.life.hp     = pkt.data;
				entity.life.hp_max = 100;
				entity.life.update();
				break;

			case 3: /// 3 = accessory ID
				if (pkt.data) {
					path = DB.getPetEquipPath(pkt.data);
				}

				if (!path && entity.files.body.spr) {
					path = entity.files.body.spr.replace(/\.spr$/i, '.act');
				}

				if (path) {
					Client.loadFile( path, function(){ entity.files.body.act = path; });
				}
				break;

			case 4: /// 4 = performance (data = 1~3: normal, 4: special)
				var action = [ entity.ACTION.PERF1, entity.ACTION.PERF2, entity.ACTION.PERF3, entity.ACTION.SPECIAL ];
				entity.setAction({
					action: action[ (pkt.data-1 + action.length) % action.length ],
					frame:  0,
					repeat: false,
					play:   true,
					next: {
						action: entity.ACTION.IDLE,
						frame:  0,
						repeat: true,
						play:   true,
						next:   false
					}
				});
				break;

			case 5: /// 5 = accessory

		}
	}


	/**
	 * Perform a pet action
	 *
	 * @param {object} pkt - PACKET.ZC.PET_ACT
	 */
	function onPetAction( pkt )
	{
		var entity = EntityManager.get(pkt.GID);
		if (!entity) {
			return;
		}

		switch (pkt.data) {
			case 0:  // feeding
			case 1:  // hunting
			case 2:  // danger
			case 3:  // dead
			case 4:  // stand (normal)
			case 5:  // special performance
			case 6:  // level up
			case 7:  // performance 1
			case 8:  // performance 2
			case 9:  // performance 3
			case 10: // log-in greeting (connect)
		}
	}


	/**
	 * Client request to feed QPet.
	 */
	PetInformations.reqPetFeed = function reqPetFeed()
	{
		// Are you sure you want to feed your pet ?
		UIManager.showPromptBox(DB.getMessage(601), 'ok', 'cancel', function(){
			var pkt  = new PACKET.CZ.COMMAND_PET();
			pkt.cSub = 1;
			Network.sendPacket(pkt);
		});
	};


	/**
	 * Client request to do a performance
	 */
	PetInformations.reqPetAction = function reqPetAction()
	{
		var pkt  = new PACKET.CZ.COMMAND_PET();
		pkt.cSub = 2;
		Network.sendPacket(pkt);
	};


	/**
	 * Qpet -> Egg
	 */
	PetInformations.reqBackToEgg = function reqBackToEgg()
	{
		var pkt  = new PACKET.CZ.COMMAND_PET();
		pkt.cSub = 3;
		Network.sendPacket(pkt);

		PetInformations.remove();
	};


	/**
	 * UnEquip pet accessory
	 */
	PetInformations.reqUnEquipPet = function reqUnEquipPet()
	{
		var pkt  = new PACKET.CZ.COMMAND_PET();
		pkt.cSub = 4;
		Network.sendPacket(pkt);
	};



	/**
	 * Rename QPet
	 *
	 * @param {string} new pet name
	 */
	PetInformations.reqNameEdit   = function reqNameEdit(name)
	{
		var pkt    = new PACKET.CZ.RENAME_PET();
		pkt.szName = name;
		Network.sendPacket(pkt);
	};


	/// PACKET.CZ.PETEGG_INFO | Not implemented client side ?
	/// PACKET.CZ.COMMAND_PET | 0 = pet information ??? Already sent by server ?
	/// PACKET.CZ.PET_ACT     | not needed.


	/**
	 * Initialize
	 */
	return function NPCEngine()
	{
		Network.hookPacket( PACKET.ZC.START_CAPTURE,      onStartCapture);
		Network.hookPacket( PACKET.ZC.TRYCAPTURE_MONSTER, onCaptureResult);
		Network.hookPacket( PACKET.ZC.PETEGG_LIST,        onPetList);
		Network.hookPacket( PACKET.ZC.PROPERTY_PET,       onPetInformation);
		Network.hookPacket( PACKET.ZC.FEED_PET,           onFeedResult);
		Network.hookPacket( PACKET.ZC.CHANGESTATE_PET,    onPetInformationUpdate);
		Network.hookPacket( PACKET.ZC.PET_ACT,            onPetAction);
	};
});