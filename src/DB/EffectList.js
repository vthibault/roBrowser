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
	'use strict';

	return {
		23:  { attachedEntity: true,   str: 'stonecurse' },

		29:  { attachedEntity: true,   str: 'lightning' },
		30:  { attachedEntity: false,  str: 'thunderstorm',      wav: 'magician_thunderstorm' },

		41:  { attachedEntity: true,   str: 'angelus',           wav: 'ef_angelus' },

		66:  { attachedEntity: true,   str: 'cure',              wav: 'acolyte_cure' },
		67:  { attachedEntity: true,   str: 'provoke',           wav: 'swordman_provoke' },
		68:  { attachedEntity: true,   str: 'mvp',               wav: 'st_mvp'},
		69:  { attachedEntity: false,  str: 'skidtrap',          wav: 'hunter_skidtrap' },

		75:  { attachedEntity: true,   str: 'gloria',            wav: 'priest_gloria' },
		76:  { attachedEntity: true,   str: 'magnificat',        wav: 'priest_magnificat' },
		77:  { attachedEntity: true,   str: 'resurrection',      wav: 'priest_resurrection' },

		85:  { attachedEntity: true,   str: 'lexaeterna',        wav: 'priest_lexaeterna' },
		86:  { attachedEntity: true,   str: 'aspersio',          wav: 'priest_aspersio'  },
		87:  { attachedEntity: true,   str: 'lexdivina',         wav: 'priest_lexdivina' },
		88:  { attachedEntity: true,   str: 'suffragium',        wav: 'priest_suffrahium' },
		89:  { attachedEntity: false,  str: 'stormgust',         wav: 'wizard_stormgust'},
		90:  { attachedEntity: false,  str: 'lord',              wav: 'wizard_fire_ivy' },

		102: { attachedEntity: false,  str: 'black_hammerfall', wav: 'black_hammerfall' },
		103: { attachedEntity: true,   str: 'weaponperfection', wav: 'black_weapon_perfection' },
		104: { attachedEntity: true,   str: 'maximizepower' },

		111: { attachedEntity: false,  str: 'spring',           wav: 'hunter_springtrap' },
		112: { attachedEntity: true,   str: 'kyrie',            wav: 'priest_kyrie_eleison_a' },
		113: { attachedEntity: false,  str: 'magnus',           wav: 'priest_magnus' },

		154: { attachedEntity: true,   str: 'bs_refinesuccess', wav: 'bs_refinesuccess' },
		155: { attachedEntity: true,   str: 'bs_refinefailed',  wav: 'bs_refinefailed' },
	};
});