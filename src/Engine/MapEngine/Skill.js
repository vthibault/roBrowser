/**
 * Engine/MapEngine/Skill.js
 *
 * Manage skills
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
	var SkillId              = require('DB/Skills/SkillConst');
	var PathFinding          = require('Utils/PathFinding');
	var Session              = require('Engine/SessionStorage');
	var Network              = require('Network/NetworkManager');
	var PACKET               = require('Network/PacketStructure');
	var EntityManager        = require('Renderer/EntityManager');
	var EffectManager        = require('Renderer/EffectManager');
	var Altitude             = require('Renderer/Map/Altitude');
	var ShortCut             = require('UI/Components/ShortCut/ShortCut');
	var ChatBox              = require('UI/Components/ChatBox/ChatBox');
	var SkillWindow          = require('UI/Components/SkillList/SkillList');
	var SkillTargetSelection = require('UI/Components/SkillTargetSelection/SkillTargetSelection');
	var ItemSelection        = require('UI/Components/ItemSelection/ItemSelection');
	var Inventory            = require('UI/Components/Inventory/Inventory');
	var NpcMenu              = require('UI/Components/NpcMenu/NpcMenu');


	/**
	 * Spam an effect
	 *
	 * 0 = base level up
	 * 1 = job level up
	 * 2 = refine failure
	 * 3 = refine success
	 * 4 = game over
	 * 5 = pharmacy success
	 * 6 = pharmacy failure
	 * 7 = base level up (super novice)
	 * 8 = job level up (super novice)
	 * 9 = base level up (taekwon)
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_EFFECT
	 */
	function onSpecialEffect( pkt )
	{
		var EnumEffect = [
			371,
			158,
			155,
			154,
			-1,   // game over
			305,
			306,
			// TODO: find level up effect
			371,
			158,
			371
		];

		if (EnumEffect[pkt.effectID] > -1) {
			EffectManager.spam(EnumEffect[pkt.effectID], pkt.AID);
		}
	}


	/**
	 * Spam an effect
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_EFFECT2
	 */
	function onEffect( pkt )
	{
		EffectManager.spam(pkt.effectID, pkt.AID);
	}


	/**
	 * Display an effect to the scene
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_GROUNDSKILL  
	 */
	function onSkillToGround( pkt )
	{
		var position = new Array(3);
		position[0]  = pkt.xPos;
		position[1]  = pkt.yPos;
		position[2]  = Altitude.getCellHeight(pkt.xPos, pkt.yPos);

		EffectManager.spamSkill(pkt.SKID, pkt.AID, position);
	}



	/**
	 * Failed to cast a skill
	 *
	 * @param {object} pkt - PACKET.ZC.ACK_TOUSESKILL
	 */
	function onSkillResult( pkt )
	{

		// Yeah success !
		if (pkt.result) {
			return;
		}

		var error = 0;

		if (pkt.NUM) {
			switch (pkt.SKID) {

				default:
					error = 204;
					break;

				case SkillId.NV_BASIC:
					error = pkt.NUM < 7 ? 159 + pkt.NUM : pkt.NUM == 7 ? 383 : 0;
					break;

				case SkillId.AL_WARP:
					error = 214;
					break;

				case SkillId.TF_STEAL:
					error = 205;
					break;

				case SkillId.TF_POISON:
					error = 207;
					break;
			}
		}

		else {
			switch (pkt.cause) {
				case 1:  error = 202; break;
				case 2:  error = 203; break;
				case 3:  error = 808; break;
				case 4:  error = 219; break;
				case 5:  error = 233; break;
				case 6:  error = 239; break;
				case 7:  error = 246; break;
				case 8:  error = 247; break;
				case 9:  error = 580; break;
				case 10: error = 285; break;
				case 83: error = 661; break;
			}
		}

		if (error) {
			ChatBox.addText( DB.getMessage(error), ChatBox.TYPE.ERROR );
		}
	}


	/**
	 * List of skills
	 *
	 * @param {object} pkt - PACKET_ZC_SKILLINFO_LIST
	 */
	function onSkillList( pkt )
	{
		SkillWindow.setSkills( pkt.skillList );
	}


	/**
	 * Update a specified skill
	 *
	 * @param {object} pkt - PACKET.ZC.SKILLINFO_UPDATE
	 */
	function onSkillUpdate( pkt )
	{
		SkillWindow.updateSkill( pkt );
	}


	/**
	 * List of skills/items in hotkey
	 *
	 * @param {object} pkt - PACKET_ZC_SHORTCUT_KEY_LIST_V2
	 */
	function onShortCutList( pkt )
	{
		ShortCut.setList( pkt.ShortCutKey );
	}


	/**
	 * Add new skill to the list
	 *
	 * @param {object} pkt - PACKET.ZC.ADD_SKILL
	 */
	function onSkillAdded( pkt)
	{
		SkillWindow.addSkill( pkt );
	}


	/**
	 * Server notify use that we need to cast a skill
	 *
	 * @param {object} pkt - PACKET.ZC.AUTORUN_SKILL
	 */
	function onAutoCastSkill( pkt )
	{
		SkillWindow.useSkill(pkt.data);
	}


	/**
	 * Get a list of item to identify
	 *
	 * @param {object} pkt - PACKET.ZC.ITEMIDENTIFY_LIST
	 */
	function onIdentifyList( pkt )
	{
		if (!pkt.ITIDList.length) {
			return;
		}

		ItemSelection.append();
		ItemSelection.setList(pkt.ITIDList);
		ItemSelection.setTitle(DB.getMessage(521));
		ItemSelection.onIndexSelected = function(index) {
			if (index >= 0) {
				var pkt   = new PACKET.CZ.REQ_ITEMIDENTIFY();
				pkt.index = index;
				Network.sendPacket(pkt);
			}
		};
	}


	/**
	 * Get the result once item identified
	 *
	 * @param {object} pkt - PACKET.ZC.ACK_ITEMIDENTIFY
	 */
	function onIdentifyResult( pkt )
	{
		// Self closed, no message.
		if (pkt.index < 0) {
			return;
		}

		switch (pkt.result) {
			case 0: // success
				ChatBox.addText( DB.getMessage(491), ChatBox.TYPE.BLUE);

				// Remove old item
				var item = Inventory.removeItem(pkt.index, 1);

				// Add new item updated
				if (item) {
					item.IsIdentified = true;
					Inventory.addItem(item);
				}
				break;

			case 1: // Fail
				ChatBox.addText( DB.getMessage(492), ChatBox.TYPE.ERROR);
				break;
		}
	}


	/**
	 * Get a list of skills to use for auto-spell
	 *
	 * @param {object} pkt - PACKET.ZC.AUTOSPELLLIST
	 */
	function onAutoSpellList( pkt )
	{
		if (!pkt.SKID.length) {
			return;
		}

		ItemSelection.append();
		ItemSelection.setList(pkt.SKID, true);
		ItemSelection.setTitle(DB.getMessage(697));
		ItemSelection.onIndexSelected = function(index) {
			if (index >= 0) {
				var pkt   = new PACKET.CZ.SELECTAUTOSPELL();
				pkt.SKID  = index;
				Network.sendPacket(pkt);
			}
		};
	}


	/**
	 * Manage menu to select zone to warp on
	 *
	 * @param {object} pkt - PACKET.ZC.WARPLIST
	 */
	function onTeleportList( pkt )
	{
		// Clone NPC box
		var WarpList = NpcMenu.clone('WarpList', true);

		// Once selected
		WarpList.onSelectMenu = function(skillid, index) {
			WarpList.remove();

			var _pkt     = new PACKET.CZ.SELECT_WARPPOINT();
			_pkt.SKID    = skillid;
			_pkt.mapName = pkt.mapName[index-1] || 'cancel';
			Network.sendPacket(_pkt);
		};

		WarpList.onAppend = function() {
			var i, count;
			var mapNames = [];

			for (i = 0, count = pkt.mapName.length; i < count; ++i) {
				mapNames[i] = DB.getMapName(pkt.mapName[i], pkt.mapName[i]);
			}

			WarpList.setMenu(mapNames.join(':') + ':Cancel', pkt.SKID);
			WarpList.ui.find('.title').text(DB.getMessage(213));
		};

		WarpList.append();
	}


	/**
	 * Get error message from teleportation skill
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_MAPINFO
	 */
	function onTeleportResult( pkt )
	{
		switch (pkt.type) {
			case 0: //Unable to Teleport in this area
				ChatBox.addText( DB.getMessage(500), ChatBox.TYPE.ERROR);
				break;

			case 1: //Saved point cannot be memorized.
				ChatBox.addText( DB.getMessage(501), ChatBox.TYPE.ERROR);
				break;
		}
	}


	/**
	 * Result of /memo command
	 *
	 * @param {object} pkt - PACKET.ZC.ACK_REMEMBER_WARPPOINT
	 */
	function onMemoResult( pkt )
	{
		switch (pkt.errorCode) {
			case 0: // Saved location as a Memo Point for Warp skill.
				ChatBox.addText( DB.getMessage(217), ChatBox.TYPE.BLUE);
				break;

			case 1: // Skill Level is not high enough.
				ChatBox.addText( DB.getMessage(214), ChatBox.TYPE.ERROR);
				break;

			case 2: // You haven't learned Warp.
				ChatBox.addText( DB.getMessage(216), ChatBox.TYPE.ERROR);
				break;
		}
	}


	/**
	 * Send back informations from server
	 * The user want to modify the shortcut
	 *
	 * @param {number} shortcut index
	 * @param {boolean|number} isSkill
	 * @param {number} ID
	 * @param {number} count / level
	 */
	ShortCut.onChange = function onChange( index, isSkill, ID, count )
	{
		var pkt                 = new PACKET.CZ.SHORTCUT_KEY_CHANGE();
		pkt.Index               = index;
		pkt.ShortCutKey.isSkill = isSkill ? 1 : 0;
		pkt.ShortCutKey.ID      = ID;
		pkt.ShortCutKey.count   = count;

		Network.sendPacket(pkt);
	};


	/**
	 * User want to level up a skill
	 *
	 * @param {number} skill id
	 */
	SkillWindow.onIncreaseSkill = function onIncreaseSkill( SKID )
	{
		var pkt  = new PACKET.CZ.UPGRADE_SKILLLEVEL();
		pkt.SKID = SKID;

		Network.sendPacket(pkt);
	};


	/**
	 * Cast a skill on someone
	 *
	 * @param {number} skill id
	 * @param {number} level
	 * @param {optional|number} target game id
	 */
	SkillWindow.onUseSkill = SkillTargetSelection.onUseSkillToId  = function onUseSkill( id, level, targetID)
	{
		var entity, skill, target, pkt, out;
		var count, range;

		entity = Session.Entity;
		target = EntityManager.get(targetID) || entity;
		skill  = SkillWindow.getSkillById(id);
		out    = [];

		if (skill) {
			range = skill.attackRange + 1;
		}
		else {
			range = entity.attack_range;
		}

		count = PathFinding.searchLong(
			entity.position[0] | 0, entity.position[1] | 0,
			target.position[0] | 0, target.position[1] | 0,
			range,
			out,
			Altitude.TYPE.WALKABLE
		);

		// Can't attack to this point
		if (!count) {
			return;
		}

		pkt               = new PACKET.CZ.USE_SKILL();
		pkt.SKID          = id;
		pkt.selectedLevel = level;
		pkt.targetID      = targetID || Session.Entity.GID;

		// In range
		if (count < 2 || target === entity) {
			Network.sendPacket(pkt);
			return;
		}

		// Save the packet
		Session.moveAction = pkt;

		// Move to position
		pkt         = new PACKET.CZ.REQUEST_MOVE();
		pkt.dest[0] = out[(count-1)*2 + 0];
		pkt.dest[1] = out[(count-1)*2 + 1];
		Network.sendPacket(pkt);
	};



	/**
	 * Cast a skill on the ground
	 *
	 * @param {number} skill id
	 * @param {number} level
	 * @param {number} position x
	 * @param {number} position y
	 */
	SkillTargetSelection.onUseSkillToPos = function onUseSkillToPos(id, level, x, y)
	{
		var pos, entity, pkt, out, skill;
		var count, range;

		entity = Session.Entity;
		pos    = entity.position;
		skill  = SkillWindow.getSkillById(id);
		out    = [];

		if (skill) {
			range = skill.attackRange + 1;
		}
		else {
			range = entity.attack_range;
		}

		count = PathFinding.searchLong(
			pos[0] | 0, pos[1] | 0,
			x      | 0, y      | 0,
			range,
			out,
			Altitude.TYPE.WALKABLE
		);

		// Can't attack to this point
		if (!count) {
			return;
		}

		pkt               = new PACKET.CZ.USE_SKILL_TOGROUND();
		pkt.SKID          = id;
		pkt.selectedLevel = level;
		pkt.xPos          = x;
		pkt.yPos          = y;

		// In range
		if (count < 2) {
			Network.sendPacket(pkt);
			return;
		}

		// Save the packet and move to the position
		Session.moveAction = pkt;
		pkt                = new PACKET.CZ.REQUEST_MOVE();
		pkt.dest[0]        = out[(count-1)*2 + 0];
		pkt.dest[1]        = out[(count-1)*2 + 1];
		Network.sendPacket(pkt);
	};


	/**
	 * Initialize
	 */
	return function SkillEngine()
	{
		Network.hookPacket( PACKET.ZC.SKILLINFO_LIST,         onSkillList );
		Network.hookPacket( PACKET.ZC.SKILLINFO_UPDATE,       onSkillUpdate );
		Network.hookPacket( PACKET.ZC.ADD_SKILL,              onSkillAdded );
		Network.hookPacket( PACKET.ZC.SHORTCUT_KEY_LIST,      onShortCutList );
		Network.hookPacket( PACKET.ZC.SHORTCUT_KEY_LIST_V2,   onShortCutList );
		Network.hookPacket( PACKET.ZC.SHORTCUT_KEY_LIST_V3,   onShortCutList );
		Network.hookPacket( PACKET.ZC.ACK_TOUSESKILL,         onSkillResult );
		Network.hookPacket( PACKET.ZC.NOTIFY_EFFECT,          onSpecialEffect );
		Network.hookPacket( PACKET.ZC.NOTIFY_EFFECT2,         onEffect );
		Network.hookPacket( PACKET.ZC.NOTIFY_EFFECT3,         onEffect );
		Network.hookPacket( PACKET.ZC.NOTIFY_GROUNDSKILL,     onSkillToGround );
		Network.hookPacket( PACKET.ZC.AUTORUN_SKILL,          onAutoCastSkill );
		Network.hookPacket( PACKET.ZC.ITEMIDENTIFY_LIST,      onIdentifyList );
		Network.hookPacket( PACKET.ZC.ACK_ITEMIDENTIFY,       onIdentifyResult );
		Network.hookPacket( PACKET.ZC.AUTOSPELLLIST,          onAutoSpellList );
		Network.hookPacket( PACKET.ZC.WARPLIST,               onTeleportList );
		Network.hookPacket( PACKET.ZC.NOTIFY_MAPINFO,         onTeleportResult );
		Network.hookPacket( PACKET.ZC.ACK_REMEMBER_WARPPOINT, onMemoResult );
	};
});