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
		24: gunslinger
		25: ninja
		4046: taekwon
		4047: star gladiator
		4048: star gladiator (fly)
		4049: soul linker
		2nd job, 3rd job
*/

	var inheritJob = {
		// Rebith
		4001: 0,
		4002: 1,
		4003: 2,
		4004: 3,
		4005: 4,
		4006: 5,
		4007: 6,

		// Baby
		4023: 0,
		4024: 1,
		4025: 2,
		4026: 3,
		4027: 4,
		4028: 5,
		4029: 6,
		4030: 7,
		4031: 8,
		4032: 9,
		4033: 10,
		4034: 11,
		4035: 12,
		4036: 13,
		4037: 14,
		4038: 15,
		4039: 16,
		4040: 17,
		4041: 18,
		4042: 19,
		4043: 20,
		4044: 21,
		4045: 23,
	};


	/**
	 * Export Array like object
	 */
	return new function(){

		// Novice
		this[0] = [new function(){
			// female
			this[ Type.WEAPONTYPE_NONE ]         = 0;
			this[ Type.WEAPONTYPE_ROD ]          = 1;
			this[ Type.WPCLASS_TWOHANDROD ]      = 1;
			this[ Type.WEAPONTYPE_SWORD ]        = 1;
			this[ Type.WEAPONTYPE_TWOHANDSWORD ] = 1;
			this[ Type.WEAPONTYPE_AXE ]          = 1;
			this[ Type.WEAPONTYPE_TWOHANDAXE ]   = 1;
			this[ Type.WEAPONTYPE_MACE ]         = 1;
			this[ Type.WEAPONTYPE_TWOHANDMACE ]  = 1;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 2;
		}, new function(){
			// male
			this[ Type.WEAPONTYPE_NONE ]         = 0;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 1;
			this[ Type.WEAPONTYPE_ROD ]          = 2;
			this[ Type.WPCLASS_TWOHANDROD ]      = 2;
			this[ Type.WEAPONTYPE_SWORD ]        = 2;
			this[ Type.WEAPONTYPE_TWOHANDSWORD ] = 2;
			this[ Type.WEAPONTYPE_AXE ]          = 2;
			this[ Type.WEAPONTYPE_TWOHANDAXE ]   = 2;
			this[ Type.WEAPONTYPE_MACE ]         = 2;
			this[ Type.WEAPONTYPE_TWOHANDMACE ]  = 2;
		}];

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
			this[ Type.WEAPONTYPE_MACE ]        = 1;
			this[ Type.WEAPONTYPE_TWOHANDMACE ] = 1;
		};

		// Merchant
		this[5] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0;
			this[ Type.WEAPONTYPE_MACE ]         = 1;
			this[ Type.WEAPONTYPE_TWOHANDMACE ]  = 1;
			this[ Type.WEAPONTYPE_AXE  ]         = 1;
			this[ Type.WEAPONTYPE_TWOHANDAXE ]   = 1;
			this[ Type.WEAPONTYPE_SWORD ]        = 1;
			this[ Type.WEAPONTYPE_TWOHANDSWORD ] = 1;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 2;
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
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 1;
			this[ Type.WEAPONTYPE_SWORD ]        = 1;
			this[ Type.WEAPONTYPE_TWOHANDSWORD ] = 1;
			this[ Type.WEAPONTYPE_TWOHANDMACE ]  = 1;
			this[ Type.WEAPONTYPE_AXE  ]         = 1;
			this[ Type.WEAPONTYPE_TWOHANDAXE ]   = 1;
			this[ Type.WEAPONTYPE_SWORD ]        = 1;
			this[ Type.WEAPONTYPE_MACE ]         = 1;
			this[ Type.WEAPONTYPE_TWOHANDMACE ]  = 1;
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
		this[9] = [new function(){
			// female
			this[ Type.WEAPONTYPE_NONE ]       = 0;
			this[ Type.WEAPONTYPE_SHORTSWORD ] = 1;
			this[ Type.WEAPONTYPE_ROD  ]       = 2;
			this[ Type.WEAPONTYPE_TWOHANDROD ] = 2;
		}, new function(){
			// male
			this[ Type.WEAPONTYPE_NONE ]       = 0;
			this[ Type.WEAPONTYPE_ROD  ]       = 1;
			this[ Type.WEAPONTYPE_TWOHANDROD ] = 1;
			this[ Type.WEAPONTYPE_SHORTSWORD ] = 2;
		}];

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
			this[ Type.WEAPONTYPE_SHORTSWORD ]            = 1;
			this[ Type.WEAPONTYPE_SHORTSWORD_SHORTSWORD ] = 1;
			this[ Type.WEAPONTYPE_SWORD_SWORD ]           = 1;
			this[ Type.WEAPONTYPE_AXE_AXE ]               = 1;
			this[ Type.WEAPONTYPE_SHORTSWORD_SWORD ]      = 1;
			this[ Type.WEAPONTYPE_SHORTSWORD_AXE ]        = 1;
			this[ Type.WEAPONTYPE_SWORD_AXE ]             = 1;
			this[ Type.WEAPONTYPE_KATAR ]                 = 2;
		};

		// Knight (peco)
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

		// Monk
		this[15] = new function(){
			this[ Type.WEAPONTYPE_NONE ]        = 0;
			this[ Type.WEAPONTYPE_ROD  ]        = 1;
			this[ Type.WEAPONTYPE_TWOHANDROD ]  = 1;
			this[ Type.WEAPONTYPE_MACE ]        = 1;
			this[ Type.WEAPONTYPE_TWOHANDMACE ] = 1;
			this[ Type.WEAPONTYPE_KNUKLE ]      = 2;
		};

		// Sage
		this[16] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 1;
			this[ Type.WEAPONTYPE_ROD  ]         = 2;
			this[ Type.WEAPONTYPE_TWOHANDROD ]   = 2;
			this[ Type.WEAPONTYPE_BOOK ]         = 2;
		};

		// Rogue
		this[17] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0;
			this[ Type.WEAPONTYPE_SWORD ]        = 1;
			this[ Type.WEAPONTYPE_TWOHANDSWORD ] = 1;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 1;
			this[ Type.WEAPONTYPE_BOW ]          = 2;
		};

		// Alchemist
		this[18] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0; 
			this[ Type.WEAPONTYPE_TWOHANDSWORD ] = 1;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 1;
			this[ Type.WEAPONTYPE_SWORD ]        = 2;
			this[ Type.WEAPONTYPE_AXE ]          = 2;
			this[ Type.WEAPONTYPE_TWOHANDAXE ]   = 2;
			this[ Type.WEAPONTYPE_MACE ]         = 2;
			this[ Type.WEAPONTYPE_TWOHANDMACE ]  = 2;
		};

		// Bard
		this[19] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 0;
			this[ Type.WEAPONTYPE_INSTRUMENT ]   = 1;
			this[ Type.WEAPONTYPE_BOW ]          = 2;
		};

		// Dancer
		this[20] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 0;
			this[ Type.WEAPONTYPE_WHIP ]         = 1;
			this[ Type.WEAPONTYPE_BOW ]          = 2;
		};

		// Crusader (mount)
		this[21] = new function(){
			this[ Type.WEAPONTYPE_NONE ]         = 0;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 1;
			this[ Type.WEAPONTYPE_SWORD ]        = 1;
			this[ Type.WEAPONTYPE_TWOHANDSWORD ] = 1;
			this[ Type.WEAPONTYPE_AXE ]          = 1;
			this[ Type.WEAPONTYPE_TWOHANDAXE ]   = 1;
			this[ Type.WEAPONTYPE_MACE ]         = 1;
			this[ Type.WEAPONTYPE_SPEAR ]        = 2;
			this[ Type.WEAPONTYPE_TWOHANDSPEAR ] = 2;
		};

		// Super Novice
		this[23] = [new function(){
			//female
			this[ Type.WEAPONTYPE_NONE ]         = 0;
			this[ Type.WEAPONTYPE_ROD  ]         = 1;
			this[ Type.WEAPONTYPE_TWOHANDROD ]   = 1;
			this[ Type.WEAPONTYPE_AXE ]          = 1;
			this[ Type.WEAPONTYPE_TWOHANDAXE ]   = 1;
			this[ Type.WEAPONTYPE_MACE ]         = 1;
			this[ Type.WEAPONTYPE_TWOHANDMACE ]  = 1;
			this[ Type.WEAPONTYPE_SWORD      ]   = 1;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 2;
		} , new function(){
			//male
			this[ Type.WEAPONTYPE_NONE ]         = 0;
			this[ Type.WEAPONTYPE_SHORTSWORD ]   = 1;
			this[ Type.WEAPONTYPE_ROD  ]         = 2;
			this[ Type.WEAPONTYPE_TWOHANDROD ]   = 2;
			this[ Type.WEAPONTYPE_AXE ]          = 2;
			this[ Type.WEAPONTYPE_TWOHANDAXE ]   = 2;
			this[ Type.WEAPONTYPE_MACE ]         = 2;
			this[ Type.WEAPONTYPE_TWOHANDMACE ]  = 2;
			this[ Type.WEAPONTYPE_SWORD      ]   = 2;
		}];

		// Inherit job
		for (var job in inheritJob) {
			this[job] = this[inheritJob[job]];
		}
	};
});