/**
 * DB/Items/WeaponNameTable.js
 *
 * Weapon resource table name
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(['./WeaponType'], function( WeaponType )
{
	"use strict";


	var WeaponName = {};


	WeaponName[WeaponType.NONE]                  = "";
	WeaponName[WeaponType.SHORTSWORD]            = "_´Ü°Ë";
	WeaponName[WeaponType.SWORD]                 = "_°Ë";
	WeaponName[WeaponType.TWOHANDSWORD]          = "_°Ë";
	WeaponName[WeaponType.SPEAR]                 = "_Ã¢";
	WeaponName[WeaponType.TWOHANDSPEAR]          = "_Ã¢";
	WeaponName[WeaponType.AXE]                   = "_µµ³¢";
	WeaponName[WeaponType.TWOHANDAXE]            = "_µµ³¢";
	WeaponName[WeaponType.MACE]                  = "_Å¬·´";
	WeaponName[WeaponType.TWOHANDMACE]           = "_Å¬·´";
	WeaponName[WeaponType.ROD]                   = "_·Ôµå";
	WeaponName[WeaponType.BOW]                   = "_È°";
	WeaponName[WeaponType.KNUKLE]                = "_³ÊÅ¬";
	WeaponName[WeaponType.INSTRUMENT]            = "_¾Ç±â";
	WeaponName[WeaponType.WHIP]                  = "_Ã¤Âï";
	WeaponName[WeaponType.BOOK]                  = "_Ã¥";
	WeaponName[WeaponType.CATARRH]               = "_Ä«Å¸¸£_Ä«Å¸¸£";
	WeaponName[WeaponType.GUN_HANDGUN]           = "_±ÇÃÑ";
	WeaponName[WeaponType.GUN_RIFLE]             = "_±â°üÃÑ";
	WeaponName[WeaponType.GUN_GATLING]           = "_±â°üÃÑ";
	WeaponName[WeaponType.GUN_SHOTGUN]           = "_±â°üÃÑ";
	WeaponName[WeaponType.GUN_GRANADE]           = "_±â°üÃÑ";
	WeaponName[WeaponType.SYURIKEN]              = "_¼ö¸®°Ë";
	WeaponName[WeaponType.TWOHANDROD]            = "_·Ôµå";
	WeaponName[WeaponType.SHORTSWORD_SHORTSWORD] = "_´Ü°Ë_´Ü°Ë";
	WeaponName[WeaponType.SWORD_SWORD]           = "_°Ë_°Ë";
	WeaponName[WeaponType.AXE_AXE]               = "_µµ³¢_µµ³¢";
	WeaponName[WeaponType.SHORTSWORD_SWORD]      = "_´Ü°Ë_°Ë";
	WeaponName[WeaponType.SHORTSWORD_AXE]        = "_´Ü°Ë_µµ³¢";
	WeaponName[WeaponType.SWORD_AXE]             = "_°Ë_µµ³¢";


	return WeaponName;
});