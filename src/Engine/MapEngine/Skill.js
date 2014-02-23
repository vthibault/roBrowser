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
	"use strict";


	/**
	 * Load dependencies
	 */
	var DB            = require('DB/DBManager');
	var Network       = require('Network/NetworkManager');
	var PACKET        = require('Network/PacketStructure');
	var ShortCut      = require('UI/Components/ShortCut/ShortCut');


	/**
	 * List of skills
	 *
	 * @param {object} pkt - PACKET_ZC_SKILLINFO_LIST
	 */
	function SkillList( pkt )
	{
		// skillList
		/*
		out[i].SKID        = fp.readShort();
		out[i].type        = fp.readLong();
		out[i].level       = fp.readShort();
		out[i].spcost      = fp.readShort();
		out[i].attackRange = fp.readShort();
		out[i].skillName   = fp.readString(24);
		out[i].upgradable  = fp.readChar();
		*/
	}


	/**
	 * List of skills/items in hotkey
	 *
	 * @param {object} pkt - PACKET_ZC_SHORTCUT_KEY_LIST_V2
	 */
	function HotkeyList( pkt )
	{
		ShortCut.setList( pkt.ShortCutKey );
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
	ShortCut.onChange = function( index, isSkill, ID, count )
	{
		var pkt                 = new PACKET.CZ.SHORTCUT_KEY_CHANGE();
		pkt.Index               = index;
		pkt.ShortCutKey.isSkill = isSkill ? 1 : 0;
		pkt.ShortCutKey.ID      = ID;
		pkt.ShortCutKey.count   = count;

		Network.sendPacket(pkt);
	};


	/**
	 * Initialize
	 */
	return function SkillEngine()
	{
		//Network.hookPacket( PACKET.ZC.SKILLINFO_LIST,       SkillList );
		Network.hookPacket( PACKET.ZC.SHORTCUT_KEY_LIST,    HotkeyList );
		Network.hookPacket( PACKET.ZC.SHORTCUT_KEY_LIST_V2, HotkeyList );
	};
});