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

	WeaponAction[JobId.PRIEST] = new function(){
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
		this[ WeaponType.SWORD ]                 = 1;
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
		this[ WeaponType.SHORTSWORD ]   = 1;
		this[ WeaponType.TWOHANDSWORD ] = 2;
		this[ WeaponType.SWORD ]        = 2;
		this[ WeaponType.AXE ]          = 2;
		this[ WeaponType.TWOHANDAXE ]   = 2;
		this[ WeaponType.MACE ]         = 2;
		this[ WeaponType.TWOHANDMACE ]  = 2;
	};

	WeaponAction[JobId.BARD] = new function(){
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.SHORTSWORD ]   = 1;
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
		this[ WeaponType.SWORD ]        = 1;
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
		this[ WeaponType.SWORD ]        = 2;
	}];

	WeaponAction[JobId.NINJA] = new function(){
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.SHORTSWORD ]   = 1;
		this[ WeaponType.SYURIKEN ]     = 2;
	};

	WeaponAction[JobId.GUNSLINGER] = new function(){
		// I don't get when 0 is used ? seems like a grenade launcher.
		this[ WeaponType.NONE ]         = 1;
		this[ WeaponType.GUN_HANDGUN ]  = 1;
		this[ WeaponType.GUN_SHOTGUN ]  = 1;
		this[ WeaponType.GUN_GATLING ]  = 2;
		this[ WeaponType.GUN_RIFLE ]    = 2;
		this[ WeaponType.GUN_GRANADE ]  = 2;
	};

	// I don't get where the weapon sprites are located.
	WeaponAction[JobId.LINKER] = [new function(){
		// female
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.SHORTSWORD ]   = 1;
		this[ WeaponType.ROD ]          = 2;
		this[ WeaponType.TWOHANDROD ]   = 2;
	}, new function(){
		// male
		this[ WeaponType.NONE ]         = 0;
		this[ WeaponType.ROD ]          = 1;
		this[ WeaponType.TWOHANDROD ]   = 1;
		this[ WeaponType.SHORTSWORD ]   = 2;
	}];


	function duplicateEntry(origin) {
		var value = WeaponAction[origin];
		var i, count = arguments.length;

		for (i = 1; i < count; ++i) {
			WeaponAction[arguments[i]] = value;
		}
	}


	// Inherit
	duplicateEntry(JobId.NOVICE,     JobId.NOVICE_H,     JobId.NOVICE_B);
	duplicateEntry(JobId.SWORDMAN,   JobId.SWORDMAN_H,   JobId.SWORDMAN_B);
	duplicateEntry(JobId.MAGICIAN,   JobId.MAGICIAN_H,   JobId.MAGICIAN_B);
	duplicateEntry(JobId.ARCHER,     JobId.ARCHER_H,     JobId.ARCHER_B);
	duplicateEntry(JobId.ACOLYTE,    JobId.ACOLYTE_H,    JobId.ACOLYTE_B);
	duplicateEntry(JobId.MERCHANT,   JobId.MERCHANT_H,   JobId.MERCHANT_B);
	duplicateEntry(JobId.THIEF,      JobId.THIEF_H,      JobId.THIEF_B);
	duplicateEntry(JobId.KNIGHT,     JobId.KNIGHT_B,     JobId.KNIGHT_H,     JobId.RUNE_KNIGHT,      JobId.RUNE_KNIGHT_H,      JobId.RUNE_KNIGHT_B);
	duplicateEntry(JobId.KNIGHT2,    JobId.KNIGHT2_B,    JobId.KNIGHT2_H,    JobId.RUNE_KNIGHT2,     JobId.RUNE_KNIGHT2_H,     JobId.RUNE_KNIGHT2_B);
	duplicateEntry(JobId.PRIEST,     JobId.PRIEST_B,     JobId.PRIEST_H,     JobId.ARCHBISHOP,       JobId.ARCHBISHOP_H,       JobId.ARCHBISHOP_B);
	duplicateEntry(JobId.WIZARD,     JobId.WIZARD_B,     JobId.WIZARD_H,     JobId.WARLOCK,          JobId.WARLOCK_H,          JobId.WARLOCK_B);
	duplicateEntry(JobId.BLACKSMITH, JobId.BLACKSMITH_B, JobId.BLACKSMITH_H, JobId.MECHANIC,         JobId.MECHANIC_H,         JobId.MECHANIC_B);
	duplicateEntry(JobId.HUNTER,     JobId.HUNTER_B,     JobId.HUNTER_H,     JobId.RANGER,           JobId.RANGER_H,           JobId.RANGER_B);
	duplicateEntry(JobId.ASSASSIN,   JobId.ASSASSIN_B,   JobId.ASSASSIN_H,   JobId.GUILLOTINE_CROSS, JobId.GUILLOTINE_CROSS_H, JobId.GUILLOTINE_CROSS_B);
	duplicateEntry(JobId.CRUSADER,   JobId.CRUSADER_B,   JobId.CRUSADER_H,   JobId.ROYAL_GUARD,      JobId.ROYAL_GUARD_H,      JobId.ROYAL_GUARD_B);
	duplicateEntry(JobId.CRUSADER2,  JobId.CRUSADER2_B,  JobId.CRUSADER2_H,  JobId.ROYAL_GUARD2,     JobId.ROYAL_GUARD2_H,     JobId.ROYAL_GUARD2_B);
	duplicateEntry(JobId.MONK,       JobId.MONK_B,       JobId.MONK_H,       JobId.SURA,             JobId.SURA_H,             JobId.SURA_B);
	duplicateEntry(JobId.SAGE,       JobId.SAGE_B,       JobId.SAGE_H,       JobId.SORCERER,         JobId.SORCERER_H,         JobId.SORCERER_B);
	duplicateEntry(JobId.ROGUE,      JobId.ROGUE_B,      JobId.ROGUE_H,      JobId.SHADOW_CHASER,    JobId.SHADOW_CHASER_H,    JobId.SHADOW_CHASER_B);
	duplicateEntry(JobId.ALCHEMIST,  JobId.ALCHEMIST_B,  JobId.ALCHEMIST_H,  JobId.GENETIC,          JobId.GENETIC_H,          JobId.GENETIC_B);
	duplicateEntry(JobId.BARD,       JobId.BARD_B,       JobId.BARD_H,       JobId.MINSTREL,         JobId.MINSTREL_H,         JobId.MINSTREL_B);
	duplicateEntry(JobId.DANCER,     JobId.DANCER_B,     JobId.DANCER_H,     JobId.WANDERER,         JobId.WANDERER_H,         JobId.WANDERER_B);


	/**
	 * Exports
	 */
	return WeaponAction;
});