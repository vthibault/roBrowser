/**
 * DB/EffectList.js
 *
 * List effects
 * TODO: complete the list, add informations about sound.
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function()
{
	"use strict";

	return {
		23: { str: 'stonecurse' },

		29: { str: 'lightning' },
		30: { str: 'thunderstorm',      wav: 'magician_thunderstorm' },

		41: { str: 'angelus',           wav: 'ef_angelus' },

		66: { str: 'cure',              wav: 'acolyte_cure' },
		67: { str: 'provoke',           wav: 'swordman_provoke' },
		68: { str: 'mvp',               wav: 'st_mvp'},
		69: { str: 'skidtrap',          wav: 'hunter_skidtrap' },

		75: { str: 'gloria',            wav: 'priest_gloria' },
		76: { str: 'magnificat',        wav: 'priest_magnificat' },
		77: { str: 'resurrection',      wav: 'priest_resurrection' },

		85: { str: 'lexaeterna',        wav: 'priest_lexaeterna' },
		86: { str: 'aspersio',          wav: 'priest_aspersio'  },
		87: { str: 'lexdivina',         wav: 'priest_lexdivina' },
		88: { str: 'suffragium',        wav: 'priest_suffrahium' },
		89: { str: 'stormgust',         wav: 'wizard_stormgust'},
		90: { str: 'lord',              wav: 'wizard_fire_ivy' },

		102: { str: 'black_hammerfall', wav: 'black_hammerfall' },
		103: { str: 'weaponperfection', wav: 'black_weapon_perfection' },
		104: { str: 'maximizepower' },

		111: { str: 'spring',           wav: 'hunter_springtrap' },
		112: { str: 'kyrie',            wav: 'priest_kyrie_eleison_a' },
		113: { str: 'magnus',           wav: 'priest_magnus' },

		154: { str: 'bs_refinesuccess', wav: 'bs_refinesuccess' },
		155: { str: 'bs_refinefailed',  wav: 'bs_refinefailed' },
	};
});