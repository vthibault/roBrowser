/**
 * DB/Jobs/WeaponAction.js
 *
 * Define attack action for each weapon
 * WeaponAction[<job>][<weapon type>]
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(['./JobConst', 'DB/Items/WeaponType'], function( JobId, WeaponType )
{
	"use strict";


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

	var WeaponAction = {};


	WeaponAction[JobId.NOVICE] =  [new function(){
		// female
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.ROD ]          = 1;
		this[ WeaponType.TWOHANDROD ]   = 1;
		this[ WeaponType.SWORD ]        = 1;
		this[ WeaponType.TWOHANDSWORD ] = 1;
		this[ WeaponType.AXE ]          = 1;
		this[ WeaponType.TWOHANDAXE ]   = 1;
		this[ WeaponType.MACE ]         = 1;
		this[ WeaponType.TWOHANDMACE ]  = 1;
		this[ WeaponType.SHORTSWORD ]   = 2;
	}, new function(){
		// male
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.SHORTSWORD ]   = 1;
		this[ WeaponType.ROD ]          = 2;
		this[ WeaponType.TWOHANDROD ]   = 2;
		this[ WeaponType.SWORD ]        = 2;
		this[ WeaponType.TWOHANDSWORD ] = 2;
		this[ WeaponType.AXE ]          = 2;
		this[ WeaponType.TWOHANDAXE ]   = 2;
		this[ WeaponType.MACE ]         = 2;
		this[ WeaponType.TWOHANDMACE ]  = 2;
	}];

	WeaponAction[JobId.SWORDMAN] = new function(){
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.SHORTSWORD ]   = 1;
		this[ WeaponType.SWORD ]        = 1;
		this[ WeaponType.TWOHANDSWORD ] = 1;
		this[ WeaponType.AXE ]          = 1;
		this[ WeaponType.TWOHANDAXE ]   = 1;
		this[ WeaponType.MACE ]         = 1;
		this[ WeaponType.TWOHANDMACE ]  = 1;
		this[ WeaponType.SPEAR ]        = 2;
		this[ WeaponType.TWOHANDSPEAR ] = 2;
	};

	WeaponAction[JobId.MAGICIA] = new function(){
		this[ WeaponType.NONE ]       = 0;
		this[ WeaponType.ROD ]        = 1;
		this[ WeaponType.TWOHANDROD ] = 1;
		this[ WeaponType.SHORTSWORD ] = 2;
	};

	WeaponAction[JobId.ARCHER] = new function(){
		this[ WeaponType.NONE ]       = 0;
		this[ WeaponType.BOW ]        = 1;
		this[ WeaponType.SHORTSWORD ] = 2;
	};

	WeaponAction[JobId.ACOLYTE] = new function(){
		this[ WeaponType.NONE ]        = 0;
		this[ WeaponType.ROD  ]        = 1;
		this[ WeaponType.TWOHANDROD ]  = 1;
		this[ WeaponType.MACE ]        = 1;
		this[ WeaponType.TWOHANDMACE ] = 1;
	};

	WeaponAction[JobId.MERCHANT] = new function(){
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.MACE ]         = 1;
		this[ WeaponType.TWOHANDMACE ]  = 1;
		this[ WeaponType.AXE  ]         = 1;
		this[ WeaponType.TWOHANDAXE ]   = 1;
		this[ WeaponType.SWORD ]        = 1;
		this[ WeaponType.TWOHANDSWORD ] = 1;
		this[ WeaponType.SHORTSWORD ]   = 2;
	};

	WeaponAction[JobId.THIEF] = new function(){
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.SWORD ]        = 1;
		this[ WeaponType.TWOHANDSWORD ] = 1;
		this[ WeaponType.SHORTSWORD ]   = 1;
		this[ WeaponType.BOW ]          = 2;
	};

	WeaponAction[JobId.KNIGHT] = new function(){
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.SHORTSWORD ]   = 1;
		this[ WeaponType.SWORD ]        = 1;
		this[ WeaponType.TWOHANDSWORD ] = 1;
		this[ WeaponType.TWOHANDMACE ]  = 1;
		this[ WeaponType.AXE  ]         = 1;
		this[ WeaponType.TWOHANDAXE ]   = 1;
		this[ WeaponType.SWORD ]        = 1;
		this[ WeaponType.MACE ]         = 1;
		this[ WeaponType.TWOHANDMACE ]  = 1;
		this[ WeaponType.SPEAR ]        = 2;
		this[ WeaponType.TWOHANDSPEAR ] = 2;
	};

	WeaponAction[JobId.PRIEsT] = new function(){
		this[ WeaponType.NONE ]        = 0;
		this[ WeaponType.ROD  ]        = 1;
		this[ WeaponType.TWOHANDROD ]  = 1;
		this[ WeaponType.MACE ]        = 1;
		this[ WeaponType.TWOHANDMACE ] = 1;
		this[ WeaponType.BOOK ]        = 2;
	};

	WeaponAction[JobId.WIZARD] = [new function(){
		// female
		this[ WeaponType.NONE ]       = 0;
		this[ WeaponType.SHORTSWORD ] = 1;
		this[ WeaponType.ROD  ]       = 2;
		this[ WeaponType.TWOHANDROD ] = 2;
	}, new function(){
		// male
		this[ WeaponType.NONE ]       = 0;
		this[ WeaponType.ROD  ]       = 1;
		this[ WeaponType.TWOHANDROD ] = 1;
		this[ WeaponType.SHORTSWORD ] = 2;
	}];

	WeaponAction[JobId.BLACKSMITH] = new function(){
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.SHORTSWORD ]   = 1;
		this[ WeaponType.SWORD ]        = 2;
		this[ WeaponType.TWOHANDSWORD ] = 2;
		this[ WeaponType.AXE ]          = 2;
		this[ WeaponType.TWOHANDAXE ]   = 2;
		this[ WeaponType.MACE ]         = 2;
		this[ WeaponType.TWOHANDMACE ]  = 2;
	};

	WeaponAction[JobId.HUNTER] = new function(){
		this[ WeaponType.NONE ]       = 0;
		this[ WeaponType.SHORTSWORD ] = 1;
		this[ WeaponType.BOW ]        = 2;
	};

	WeaponAction[JobId.ASSASSIN] = new function(){
		this[ WeaponType.NONE ]                  = 0;
		this[ WeaponType.SHORTSWORD ]            = 1;
		this[ WeaponType.SHORTSWORD_SHORTSWORD ] = 1;
		this[ WeaponType.SWORD_SWORD ]           = 1;
		this[ WeaponType.AXE_AXE ]               = 1;
		this[ WeaponType.SHORTSWORD_SWORD ]      = 1;
		this[ WeaponType.SHORTSWORD_AXE ]        = 1;
		this[ WeaponType.SWORD_AXE ]             = 1;
		this[ WeaponType.KATAR ]                 = 2;
	};

	WeaponAction[JobId.KNIGHT2] = new function(){
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.SHORTSWORD ]   = 1;
		this[ WeaponType.SWORD ]        = 1;
		this[ WeaponType.TWOHANDSWORD ] = 1;
		this[ WeaponType.AXE ]          = 1;
		this[ WeaponType.TWOHANDAXE ]   = 1;
		this[ WeaponType.MACE ]         = 1;
		this[ WeaponType.TWOHANDMACE ]  = 1;
		this[ WeaponType.SPEAR ]        = 2;
		this[ WeaponType.TWOHANDSPEAR ] = 2;
	};

	WeaponAction[JobId.CRUSADER] = new function(){
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.SHORTSWORD ]   = 1;
		this[ WeaponType.SWORD ]        = 1;
		this[ WeaponType.TWOHANDSWORD ] = 1;
		this[ WeaponType.AXE ]          = 1;
		this[ WeaponType.TWOHANDAXE ]   = 1;
		this[ WeaponType.MACE ]         = 1;
		this[ WeaponType.TWOHANDMACE ]  = 1;
		this[ WeaponType.SPEAR ]        = 2;
		this[ WeaponType.TWOHANDSPEAR ] = 2;
	};

	WeaponAction[JobId.MONK] = new function(){
		this[ WeaponType.NONE ]        = 0;
		this[ WeaponType.ROD  ]        = 1;
		this[ WeaponType.TWOHANDROD ]  = 1;
		this[ WeaponType.MACE ]        = 1;
		this[ WeaponType.TWOHANDMACE ] = 1;
		this[ WeaponType.KNUKLE ]      = 2;
	};

	WeaponAction[JobId.SAGE] = new function(){
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.SHORTSWORD ]   = 1;
		this[ WeaponType.ROD  ]         = 2;
		this[ WeaponType.TWOHANDROD ]   = 2;
		this[ WeaponType.BOOK ]         = 2;
	};

	WeaponAction[JobId.ROGUE] = new function(){
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.SWORD ]        = 1;
		this[ WeaponType.TWOHANDSWORD ] = 1;
		this[ WeaponType.SHORTSWORD ]   = 1;
		this[ WeaponType.BOW ]          = 2;
	};

	WeaponAction[JobId.ALCHEMIST] = new function(){
		this[ WeaponType.NONE ]         = 0; 
		this[ WeaponType.TWOHANDSWORD ] = 1;
		this[ WeaponType.SHORTSWORD ]   = 1;
		this[ WeaponType.SWORD ]        = 2;
		this[ WeaponType.AXE ]          = 2;
		this[ WeaponType.TWOHANDAXE ]   = 2;
		this[ WeaponType.MACE ]         = 2;
		this[ WeaponType.TWOHANDMACE ]  = 2;
	};

	WeaponAction[JobId.BARD] = new function(){
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.SHORTSWORD ]   = 0;
		this[ WeaponType.INSTRUMENT ]   = 1;
		this[ WeaponType.BOW ]          = 2;
	};

	WeaponAction[JobId.DANCER] = new function(){
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.SHORTSWORD ]   = 0;
		this[ WeaponType.WHIP ]         = 1;
		this[ WeaponType.BOW ]          = 2;
	};

	WeaponAction[JobId.CRUSADER2] = new function(){
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.SHORTSWORD ]   = 1;
		this[ WeaponType.SWORD ]        = 1;
		this[ WeaponType.TWOHANDSWORD ] = 1;
		this[ WeaponType.AXE ]          = 1;
		this[ WeaponType.TWOHANDAXE ]   = 1;
		this[ WeaponType.MACE ]         = 1;
		this[ WeaponType.SPEAR ]        = 2;
		this[ WeaponType.TWOHANDSPEAR ] = 2;
	};

	WeaponAction[JobId.SUPERNOVICE] = [new function(){
		//female
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.ROD  ]         = 1;
		this[ WeaponType.TWOHANDROD ]   = 1;
		this[ WeaponType.AXE ]          = 1;
		this[ WeaponType.TWOHANDAXE ]   = 1;
		this[ WeaponType.MACE ]         = 1;
		this[ WeaponType.TWOHANDMACE ]  = 1;
		this[ WeaponType.SWORD      ]   = 1;
		this[ WeaponType.SHORTSWORD ]   = 2;
	} , new function(){
		//male
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.SHORTSWORD ]   = 1;
		this[ WeaponType.ROD  ]         = 2;
		this[ WeaponType.TWOHANDROD ]   = 2;
		this[ WeaponType.AXE ]          = 2;
		this[ WeaponType.TWOHANDAXE ]   = 2;
		this[ WeaponType.MACE ]         = 2;
		this[ WeaponType.TWOHANDMACE ]  = 2;
		this[ WeaponType.SWORD      ]   = 2;
	}];


	/**
	 * Exports
	 */
	return WeaponAction;
});