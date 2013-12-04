/**
 * DB/WeaponAction.js
 *
 * Define attack action for each weapon
 * WeaponAction[<job>][<weapon type>]
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(['./WeaponTable'], function( WeaponTable )
{
	"use strict";


	var Type = WeaponTable.Weapon_IDs;

/*
	TODO:
		knight2
		21: "Crusader",
		24: "Gunslinger",
		25: "Ninja",
		advance
		3rd
*/

	/**
	 * Export Array like object
	 */
	return new function(){

		// Novice
		this[0] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 1;
			this[ Type.WEAPONTYPE_SWORD ]        = 2;
			this[ Type.WEAPONTYPE_TWOHANDSWORD ] = 2;
			this[ Type.WEAPONTYPE_AXE ]          = 2;
			this[ Type.WEAPONTYPE_TWOHANDAXE ]   = 2;
			this[ Type.WEAPONTYPE_MACE ]         = 2;
			this[ Type.WEAPONTYPE_TWOHANDMACE ]  = 2;
		};

		// Swordman
		this[1] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 1;
			this[ Type.WEAPONTYPE_SWORD ]        = 1;
			this[ Type.WEAPONTYPE_TWOHANDSWORD ] = 1;
			this[ Type.WEAPONTYPE_AXE ]          = 1;
			this[ Type.WEAPONTYPE_TWOHANDAXE ]   = 1;
			this[ Type.WEAPONTYPE_MACE ]         = 1;
			this[ Type.WEAPONTYPE_TWOHANDMACE ]  = 1;
			this[ Type.WEAPONTYPE_SPEAR ]        = 2;
			this[ Type.WEAPONTYPE_TWOHANDSPEAR ] = 2;
		};

		// Mage
		this[2] = new function(){
			this[ Type.WEAPONTYPE_NONE ]       = 0;
			this[ Type.WEAPONTYPE_ROD ]        = 1;
			this[ Type.WPCLASS_TWOHANDROD ]    = 1;
			this[ Type.WEAPONTYPE_SHORTSWORD ] = 2;
		};

		// Archer
		this[3] = new function(){
			this[ Type.WEAPONTYPE_NONE ]       = 0;
			this[ Type.WEAPONTYPE_BOW ]        = 1;
			this[ Type.WEAPONTYPE_SHORTSWORD ] = 2;
		};

		// Acolyte
		this[4] = new function(){
			this[ Type.WEAPONTYPE_NONE ]        = 0;
			this[ Type.WEAPONTYPE_ROD  ]        = 1;
			this[ Type.WEAPONTYPE_TWOHANDROD ]  = 1;
			this[ Type.WEAPONTYPE_MACE ]        = 2;
			this[ Type.WEAPONTYPE_TWOHANDMACE ] = 2;
		};

		// Merchant
		this[5] = new function(){
			this[ Type.WEAPONTYPE_NONE ]        = 0;
			this[ Type.WEAPONTYPE_MACE ]        = 1;
			this[ Type.WEAPONTYPE_TWOHANDMACE ] = 1;
			this[ Type.WEAPONTYPE_AXE  ]        = 2;
			this[ Type.WEAPONTYPE_TWOHANDAXE ]  = 2;
		};

		// Thief
		this[6] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0;
			this[ Type.WEAPONTYPE_SWORD ]        = 1;
			this[ Type.WEAPONTYPE_TWOHANDSWORD ] = 1;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 1;
			this[ Type.WEAPONTYPE_BOW ]          = 2;
		};

		// Knight
		this[7] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 0;
			this[ Type.WEAPONTYPE_SWORD ]        = 1;
			this[ Type.WEAPONTYPE_TWOHANDSWORD ] = 1;
			this[ Type.WEAPONTYPE_SPEAR ]        = 2;
			this[ Type.WEAPONTYPE_TWOHANDSPEAR ] = 2;
		};

		// Priest
		this[8] = new function(){
			this[ Type.WEAPONTYPE_NONE ]        = 0;
			this[ Type.WEAPONTYPE_ROD  ]        = 1;
			this[ Type.WEAPONTYPE_TWOHANDROD ]  = 1;
			this[ Type.WEAPONTYPE_MACE ]        = 1;
			this[ Type.WEAPONTYPE_TWOHANDMACE ] = 1;
			this[ Type.WEAPONTYPE_BOOK ]        = 2;
		};

		// Wizard
		this[9] = new function(){
			this[ Type.WEAPONTYPE_NONE ]       = 0;
			this[ Type.WEAPONTYPE_SHORTSWORD ] = 0;
			this[ Type.WEAPONTYPE_ROD  ]       = 1;
			this[ Type.WEAPONTYPE_TWOHANDROD ] = 1;
			this[ Type.WEAPONTYPE_BOOK ]       = 2;
		};

		// Blacksmith
		this[10] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 1;
			this[ Type.WEAPONTYPE_SWORD ]        = 2;
			this[ Type.WEAPONTYPE_TWOHANDSWORD ] = 2;
			this[ Type.WEAPONTYPE_AXE ]          = 2;
			this[ Type.WEAPONTYPE_TWOHANDAXE ]   = 2;
			this[ Type.WEAPONTYPE_MACE ]         = 2;
			this[ Type.WEAPONTYPE_TWOHANDMACE ]  = 2;
		};

		// Hunter
		this[11] = new function(){
			this[ Type.WEAPONTYPE_NONE ]       = 0;
			this[ Type.WEAPONTYPE_SHORTSWORD ] = 1;
			this[ Type.WEAPONTYPE_BOW ]        = 2;
		};

		// Assassin
		this[12] = new function(){
			this[ Type.WEAPONTYPE_NONE ]                  = 0;
			this[ Type.WEAPONTYPE_SHORTSWORD ]            = 0;
			this[ Type.WEAPONTYPE_KATAR ]                 = 1;
			this[ Type.WEAPONTYPE_SHORTSWORD_SHORTSWORD ] = 2;
			this[ Type.WEAPONTYPE_SWORD_SWORD ]           = 2;
			this[ Type.WEAPONTYPE_AXE_AXE ]               = 2;
			this[ Type.WEAPONTYPE_SHORTSWORD_SWORD ]      = 2;
			this[ Type.WEAPONTYPE_SHORTSWORD_AXE ]        = 2;
			this[ Type.WEAPONTYPE_SWORD_AXE ]             = 2;
		};

		// Knight
		this[13] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 1;
			this[ Type.WEAPONTYPE_SWORD ]        = 1;
			this[ Type.WEAPONTYPE_TWOHANDSWORD ] = 1;
			this[ Type.WEAPONTYPE_AXE ]          = 1;
			this[ Type.WEAPONTYPE_TWOHANDAXE ]   = 1;
			this[ Type.WEAPONTYPE_MACE ]         = 1;
			this[ Type.WEAPONTYPE_TWOHANDMACE ]  = 1;
			this[ Type.WEAPONTYPE_SPEAR ]        = 2;
			this[ Type.WEAPONTYPE_TWOHANDSPEAR ] = 2;
		};

		// Crusader
		this[14] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 0;
			this[ Type.WEAPONTYPE_SWORD ]        = 0;
			this[ Type.WEAPONTYPE_TWOHANDSWORD ] = 0;
			this[ Type.WEAPONTYPE_AXE ]          = 0;
			this[ Type.WEAPONTYPE_TWOHANDAXE ]   = 0;
			this[ Type.WEAPONTYPE_MACE ]         = 0;
			this[ Type.WEAPONTYPE_TWOHANDMACE ]  = 0;
			this[ Type.WEAPONTYPE_SPEAR ]        = 1;
			this[ Type.WEAPONTYPE_TWOHANDSPEAR ] = 1;
		};

		// Monk
		this[15] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0;
		};

		// Sage
		this[16] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 1;
			this[ Type.WEAPONTYPE_ROD  ]         = 2;
			this[ Type.WEAPONTYPE_TWOHANDROD ]   = 2;
			// rod ?
		};

		// Rogue
		this[17] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0;
			this[ Type.WEAPONTYPE_SWORD ]        = 0;
			this[ Type.WEAPONTYPE_TWOHANDSWORD ] = 0;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 1;
			this[ Type.WEAPONTYPE_BOW ]          = 2;
		};

		// Alchemist
		this[18] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0; // ??
			this[ Type.WEAPONTYPE_SWORD ]        = 2;
			this[ Type.WEAPONTYPE_TWOHANDSWORD ] = 2;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 1;
		};

		// Bard
		this[19] =
		this[20] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0; // ??
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 0; // ??
			this[ Type.WEAPONTYPE_INSTRUMENT ]   = 1;
			this[ Type.WEAPONTYPE_BOW          ] = 2;
		};

		// Super Novice
		this[23] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0; // ??
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 1; 
			this[ Type.WEAPONTYPE_SWORD      ]   = 2;
			this[ Type.WEAPONTYPE_ROD  ]         = 2;
			this[ Type.WEAPONTYPE_TWOHANDROD ]   = 2;
			this[ Type.WEAPONTYPE_AXE ]          = 2;
			this[ Type.WEAPONTYPE_TWOHANDAXE ]   = 2;
			this[ Type.WEAPONTYPE_MACE ]         = 2;
			this[ Type.WEAPONTYPE_TWOHANDMACE ]  = 2;
		};
	};
});