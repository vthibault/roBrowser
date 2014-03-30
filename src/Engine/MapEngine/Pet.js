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
	var Network              = require('Network/NetworkManager');
	var PACKET               = require('Network/PacketStructure');
	var Renderer             = require('Renderer/Renderer');
	var SlotMachine          = require('UI/Components/SlotMachine/SlotMachine');
	var SkillTargetSelection = require('UI/Components/SkillTargetSelection/SkillTargetSelection');
	var ItemSelection        = require('UI/Components/ItemSelection/ItemSelection');


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
		ItemSelection.append();
		ItemSelection.setList(pkt.eggList);
		ItemSelection.onIndexSelected = function(index) {
			var pkt   = new PACKET.CZ.SELECT_PETEGG();
			pkt.index = index;
			Network.sendPacket(pkt);
		};
	}


	/**
	 * Initialize
	 */
	return function NPCEngine()
	{
		Network.hookPacket( PACKET.ZC.START_CAPTURE,      onStartCapture);
		Network.hookPacket( PACKET.ZC.TRYCAPTURE_MONSTER, onCaptureResult);
		Network.hookPacket( PACKET.ZC.PETEGG_LIST,        onPetList);
	};
});