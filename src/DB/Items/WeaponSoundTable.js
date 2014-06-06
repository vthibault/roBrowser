/**
 * DB/Items/WeaponSoundTable.js
 *
 * Weapon sound table resources
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(["./WeaponType"], function( WeaponType )
{
	"use strict";


	var WeaponSound = {};

	WeaponSound[WeaponType.NONE]                  = "_hit_mace.wav";
	WeaponSound[WeaponType.SHORTSWORD]            = "_hit_sword.wav";
	WeaponSound[WeaponType.SWORD]                 = "_hit_sword.wav";
	WeaponSound[WeaponType.TWOHANDSWORD]          = "_hit_sword.wav";
	WeaponSound[WeaponType.SPEAR]                 = "_hit_spear.wav";
	WeaponSound[WeaponType.TWOHANDSPEAR]          = "_hit_spear.wav";
	WeaponSound[WeaponType.AXE]                   = "_hit_axe.wav";
	WeaponSound[WeaponType.TWOHANDAXE]            = "_hit_axe.wav";
	WeaponSound[WeaponType.MACE]                  = "_hit_mace.wav";
	WeaponSound[WeaponType.TWOHANDMACE]           = "_hit_mace.wav";
	WeaponSound[WeaponType.ROD]                   = "_hit_rod.wav";
	WeaponSound[WeaponType.BOW]                   = "_hit_arrow.wav";
	WeaponSound[WeaponType.KNUKLE]                = "_hit_mace.wav";
	WeaponSound[WeaponType.INSTRUMENT]            = "_hit_mace.wav";
	WeaponSound[WeaponType.WHIP]                  = "_hit_mace.wav";
	WeaponSound[WeaponType.BOOK]                  = "_hit_mace.wav";
	WeaponSound[WeaponType.CATARRH]               = "_hit_mace.wav";
	WeaponSound[WeaponType.GUN_HANDGUN]           = "_hit_±ÇÃÑ.wav";
	WeaponSound[WeaponType.GUN_RIFLE]             = "_hit_¶óÀÌÇÃ.wav";
	WeaponSound[WeaponType.GUN_GATLING]           = "_hit_mace.wav";
	WeaponSound[WeaponType.GUN_SHOTGUN]           = "_hit_mace.wav";
	WeaponSound[WeaponType.GUN_GRANADE]           = "_hit_mace.wav";
	WeaponSound[WeaponType.SYURIKEN]              = "_hit_mace.wav";
	WeaponSound[WeaponType.TWOHANDROD]            = "_hit_rod.wav";
	WeaponSound[WeaponType.SHORTSWORD_SHORTSWORD] = "_hit_mace.wav";
	WeaponSound[WeaponType.SWORD_SWORD]           = "_hit_mace.wav";
	WeaponSound[WeaponType.AXE_AXE]               = "_hit_mace.wav";
	WeaponSound[WeaponType.SHORTSWORD_SWORD]      = "_hit_mace.wav";
	WeaponSound[WeaponType.SHORTSWORD_AXE]        = "_hit_mace.wav";
	WeaponSound[WeaponType.SWORD_AXE]             = "_hit_mace.wav";


	return WeaponSound;
});