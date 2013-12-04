/**
 * DB/WeaponTable.js
 *
 * Weapon Table ID
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function( require, exports )
{
	"use strict";

	// Auto-generated from data/lua files/datainfo/weapontable.lua

	var Weapon_IDs = exports['Weapon_IDs'] = new function(){
	
		this['WEAPONTYPE_NONE'] = 0,
		this['WEAPONTYPE_SHORTSWORD'] = 1,
		this['WEAPONTYPE_SWORD'] = 2,
		this['WEAPONTYPE_TWOHANDSWORD'] = 3,
		this['WEAPONTYPE_SPEAR'] = 4,
		this['WEAPONTYPE_TWOHANDSPEAR'] = 5,
		this['WEAPONTYPE_AXE'] = 6,
		this['WEAPONTYPE_TWOHANDAXE'] = 7,
		this['WEAPONTYPE_MACE'] = 8,
		this['WEAPONTYPE_TWOHANDMACE'] = 9,
		this['WEAPONTYPE_ROD'] = 10,
		this['WEAPONTYPE_BOW'] = 11,
		this['WEAPONTYPE_KNUKLE'] = 12,
		this['WEAPONTYPE_INSTRUMENT'] = 13,
		this['WEAPONTYPE_WHIP'] = 14,
		this['WEAPONTYPE_BOOK'] = 15,
		this['WEAPONTYPE_CATARRH'] = 16,
		this['WPCLASS_GUN_HANDGUN'] = 17,
		this['WPCLASS_GUN_RIFLE'] = 18,
		this['WPCLASS_GUN_GATLING'] = 19,
		this['WPCLASS_GUN_SHOTGUN'] = 20,
		this['WPCLASS_GUN_GRANADE'] = 21,
		this['WPCLASS_SYURIKEN'] = 22,
		this['WPCLASS_TWOHANDROD'] = 23,
		this['WPCLASS_LAST'] = 24,
		this['WEAPONTYPE_SHORTSWORD_SHORTSWORD'] = 25,
		this['WEAPONTYPE_SWORD_SWORD'] = 26,
		this['WEAPONTYPE_AXE_AXE'] = 27,
		this['WEAPONTYPE_SHORTSWORD_SWORD'] = 28,
		this['WEAPONTYPE_SHORTSWORD_AXE'] = 29,
		this['WEAPONTYPE_SWORD_AXE'] = 30
	}

	var WeaponNameTable = exports['WeaponNameTable'] = new function(){
	
		this[Weapon_IDs.WEAPONTYPE_NONE] = "",
		this[Weapon_IDs.WEAPONTYPE_SHORTSWORD] = "_´Ü°Ë",
		this[Weapon_IDs.WEAPONTYPE_SWORD] = "_°Ë",
		this[Weapon_IDs.WEAPONTYPE_TWOHANDSWORD] = "_°Ë",
		this[Weapon_IDs.WEAPONTYPE_SPEAR] = "_Ã¢",
		this[Weapon_IDs.WEAPONTYPE_TWOHANDSPEAR] = "_Ã¢",
		this[Weapon_IDs.WEAPONTYPE_AXE] = "_µµ³¢",
		this[Weapon_IDs.WEAPONTYPE_TWOHANDAXE] = "_µµ³¢",
		this[Weapon_IDs.WEAPONTYPE_MACE] = "_Å¬·´",
		this[Weapon_IDs.WEAPONTYPE_TWOHANDMACE] = "_Å¬·´",
		this[Weapon_IDs.WEAPONTYPE_ROD] = "_·Ôµå",
		this[Weapon_IDs.WEAPONTYPE_BOW] = "_È°",
		this[Weapon_IDs.WEAPONTYPE_KNUKLE] = "_³ÊÅ¬",
		this[Weapon_IDs.WEAPONTYPE_INSTRUMENT] = "_¾Ç±â",
		this[Weapon_IDs.WEAPONTYPE_WHIP] = "_Ã¤Âï",
		this[Weapon_IDs.WEAPONTYPE_BOOK] = "_Ã¥",
		this[Weapon_IDs.WEAPONTYPE_CATARRH] = "_Ä«Å¸¸£_Ä«Å¸¸£",
		this[Weapon_IDs.WPCLASS_GUN_HANDGUN] = "_±ÇÃÑ",
		this[Weapon_IDs.WPCLASS_GUN_RIFLE] = "_±â°üÃÑ",
		this[Weapon_IDs.WPCLASS_GUN_GATLING] = "_±â°üÃÑ",
		this[Weapon_IDs.WPCLASS_GUN_SHOTGUN] = "_±â°üÃÑ",
		this[Weapon_IDs.WPCLASS_GUN_GRANADE] = "_±â°üÃÑ",
		this[Weapon_IDs.WPCLASS_SYURIKEN] = "_¼ö¸®°Ë",
		this[Weapon_IDs.WPCLASS_TWOHANDROD] = "_·Ôµå",
		this[Weapon_IDs.WEAPONTYPE_SHORTSWORD_SHORTSWORD] = "_´Ü°Ë_´Ü°Ë",
		this[Weapon_IDs.WEAPONTYPE_SWORD_SWORD] = "_°Ë_°Ë",
		this[Weapon_IDs.WEAPONTYPE_AXE_AXE] = "_µµ³¢_µµ³¢",
		this[Weapon_IDs.WEAPONTYPE_SHORTSWORD_SWORD] = "_´Ü°Ë_°Ë",
		this[Weapon_IDs.WEAPONTYPE_SHORTSWORD_AXE] = "_´Ü°Ë_µµ³¢",
		this[Weapon_IDs.WEAPONTYPE_SWORD_AXE] = "_°Ë_µµ³¢"
	}

	var WeaponHitWaveNameTable = exports['WeaponHitWaveNameTable'] = new function(){
	
		this[Weapon_IDs.WEAPONTYPE_NONE] = "_hit_mace.wav",
		this[Weapon_IDs.WEAPONTYPE_SHORTSWORD] = "_hit_sword.wav",
		this[Weapon_IDs.WEAPONTYPE_SWORD] = "_hit_sword.wav",
		this[Weapon_IDs.WEAPONTYPE_TWOHANDSWORD] = "_hit_sword.wav",
		this[Weapon_IDs.WEAPONTYPE_SPEAR] = "_hit_spear.wav",
		this[Weapon_IDs.WEAPONTYPE_TWOHANDSPEAR] = "_hit_spear.wav",
		this[Weapon_IDs.WEAPONTYPE_AXE] = "_hit_axe.wav",
		this[Weapon_IDs.WEAPONTYPE_TWOHANDAXE] = "_hit_axe.wav",
		this[Weapon_IDs.WEAPONTYPE_MACE] = "_hit_mace.wav",
		this[Weapon_IDs.WEAPONTYPE_TWOHANDMACE] = "_hit_mace.wav",
		this[Weapon_IDs.WEAPONTYPE_ROD] = "_hit_rod.wav",
		this[Weapon_IDs.WEAPONTYPE_BOW] = "_hit_arrow.wav",
		this[Weapon_IDs.WEAPONTYPE_KNUKLE] = "_hit_mace.wav",
		this[Weapon_IDs.WEAPONTYPE_INSTRUMENT] = "_hit_mace.wav",
		this[Weapon_IDs.WEAPONTYPE_WHIP] = "_hit_mace.wav",
		this[Weapon_IDs.WEAPONTYPE_BOOK] = "_hit_mace.wav",
		this[Weapon_IDs.WEAPONTYPE_CATARRH] = "_hit_mace.wav",
		this[Weapon_IDs.WPCLASS_GUN_HANDGUN] = "_hit_±ÇÃÑ.wav",
		this[Weapon_IDs.WPCLASS_GUN_RIFLE] = "_hit_¶óÀÌÇÃ.wav",
		this[Weapon_IDs.WPCLASS_GUN_GATLING] = "_hit_mace.wav",
		this[Weapon_IDs.WPCLASS_GUN_SHOTGUN] = "_hit_mace.wav",
		this[Weapon_IDs.WPCLASS_GUN_GRANADE] = "_hit_mace.wav",
		this[Weapon_IDs.WPCLASS_SYURIKEN] = "_hit_mace.wav",
		this[Weapon_IDs.WPCLASS_TWOHANDROD] = "_hit_rod.wav",
		this[Weapon_IDs.WEAPONTYPE_SHORTSWORD_SHORTSWORD] = "_hit_mace.wav",
		this[Weapon_IDs.WEAPONTYPE_SWORD_SWORD] = "_hit_mace.wav",
		this[Weapon_IDs.WEAPONTYPE_AXE_AXE] = "_hit_mace.wav",
		this[Weapon_IDs.WEAPONTYPE_SHORTSWORD_SWORD] = "_hit_mace.wav",
		this[Weapon_IDs.WEAPONTYPE_SHORTSWORD_AXE] = "_hit_mace.wav",
		this[Weapon_IDs.WEAPONTYPE_SWORD_AXE] = "_hit_mace.wav"
	}
});