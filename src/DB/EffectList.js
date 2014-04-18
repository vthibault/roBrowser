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
		10:  { attachedEntity: true,   str: 'maemor',                                                      str_min: 'memor_min' },

		13:  { attachedEntity: false,  str: 'magician_safe' },

		23:  { attachedEntity: true,   str: 'stonecurse' },
		25:  { attachedEntity: false,  str: 'firewall2',         wav: 'effect/ef_firewall' },

		29:  { attachedEntity: true,   str: 'lightning' },
		30:  { attachedEntity: false,  str: 'thunderstorm',      wav: 'effect/magician_thunderstorm' },

		40:  { attachedEntity: true,   str: 'cross' },
		41:  { attachedEntity: true,   str: 'angelus',           wav: 'effect/ef_angelus' },

		49:  { attachedEntity: true,   str: 'firehit',           wav: 'effect/ef_firehit' },

		52:  { attachedEntity: true,   str: 'windhit' },

		66:  { attachedEntity: true,   str: 'cure',              wav: 'effect/acolyte_cure',               str_min: 'cure_min' },
		67:  { attachedEntity: true,   str: 'provoke',           wav: 'effect/swordman_provoke' },
		68:  { attachedEntity: true,   str: 'mvp',               wav: 'effect/st_mvp'},
		69:  { attachedEntity: false,  str: 'skidtrap',          wav: 'effect/hunter_skidtrap' },
		70:  { attachedEntity: true,   str: 'brandish',          wav: 'effect/knight_brandish_spear' },

		75:  { attachedEntity: true,   str: 'gloria',            wav: 'effect/priest_gloria',              str_min: 'gloria_min' },
		76:  { attachedEntity: true,   str: 'magnificat',        wav: 'effect/priest_magnificat',          str_min: 'magnificat_min' },
		77:  { attachedEntity: true,   str: 'resurrection',      wav: 'effect/priest_resurrection',        str_min: 'resurrection_min' },
		78:  { attachedEntity: true,   str: 'recovery',          wav: 'effect/priest_recovery' },

		83:  { attachedEntity: false,  str: 'sanctuary',         wav: 'effect/priest_sanctuary' },
		84:  { attachedEntity: true,   str: 'impositio',         wav: 'effect/priest_impositio' },
		85:  { attachedEntity: true,   str: 'lexaeterna',        wav: 'effect/priest_lexaeterna',          str_min: 'lexaeterna_min' },
		86:  { attachedEntity: true,   str: 'aspersio',          wav: 'effect/priest_aspersio'  },
		87:  { attachedEntity: true,   str: 'lexdivina',         wav: 'effect/priest_lexdivina' },
		88:  { attachedEntity: true,   str: 'suffragium',        wav: 'effect/priest_suffrahium',          str_min: 'suffragium_min' },
		89:  { attachedEntity: false,  str: 'stormgust',         wav: 'effect/wizard_stormgust',           str_min: 'storm_min' },
		90:  { attachedEntity: false,  str: 'lord',              wav: 'effect/wizard_fire_ivy' },
		91:  { attachedEntity: true,   str: 'benedictio',        wav: 'effect/priest_benedictio' },
		92:  { attachedEntity: false,  str: 'meteor1',           wav: 'effect/priest_meteor' },

		94:  { attachedEntity: true,   str: 'ufidel_pang' },
		95:  { attachedEntity: false,  str: 'quagmire' },
		96:  { attachedEntity: false,  str: 'firepillar',        wav: 'effect/wizard_fire_pillar_a' },
		97:  { attachedEntity: false,  str: 'firepillarbomp',    wav: 'effect/wizard_fire_pillar_b' },

		101: { attachedEntity: true,   str: 'repairweapon',      wav: 'effect/black_weapon_repear' },
		102: { attachedEntity: false,  str: 'black_hammerfall',  wav: 'effect/black_hammerfall' },
		103: { attachedEntity: true,   str: 'weaponperfection',  wav: 'effect/black_weapon_perfection',    str_min: 'weaponperfection_min' },
		104: { attachedEntity: true,   str: 'maximizepower',     wav: 'effect/black_maximize_power_sword', str_min: 'maximize_min' },

		106: { attachedEntity: false,  str: 'blastmine',         wav: 'effect/hunter_blastmine' },
		107: { attachedEntity: false,  str: 'claymore',          wav: 'effect/hunter_claymoretrap' },
		108: { attachedEntity: false,  str: 'freezing',          wav: 'effect/hunter_freezingtrap' },
		109: { attachedEntity: false,  str: 'bubble' },
		110: { attachedEntity: false,  str: 'gaspush',           wav: 'effect/se_gas_pushhh' },
		111: { attachedEntity: false,  str: 'spring',            wav: 'effect/hunter_springtrap' },
		112: { attachedEntity: true,   str: 'kyrie',             wav: 'effect/priest_kyrie_eleison_a',     str_min: 'kyrie_min' },
		113: { attachedEntity: false,  str: 'magnus',            wav: 'effect/priest_magnus' },

		124: { attachedEntity: false,  str: 'venomdust',         wav: 'effect/assasin_venomdust' },

		126: { attachedEntity: true,   str: 'poisonreact_1st',   wav: 'effect/assasin_poisonreact' },
		127: { attachedEntity: true,   str: 'poisonreact',       wav: 'effect/assasin_poisonreact' }, 

		129: { attachedEntity: true,   str: 'venomsplasher',     wav: 'effect/assasin_venomsplasher' },
		130: { attachedEntity: true,   str: 'twohand',           wav: 'effect/knight_twohandquicken' },
		131: { attachedEntity: true,   str: 'autocounter',       wav: 'effect/knight_autocounter' },

		133: { attachedEntity: true,   str: 'ice_status' },
		134: { attachedEntity: true,   str: 'icestatusing' },
		135: { attachedEntity: true,   str: 'icecrash'},

		139: { attachedEntity: false,  str: 'sandman',           wav: 'effect/hunter_sandman' },

		141: { attachedEntity: false,  str: 'pneuma1' },

		143: { attachedEntity: true,   str: 'sonicblow' },
		144: { attachedEntity: true,   str: 'brandish2',         wav: 'effect/knight_brandish_spear' },
		145: { attachedEntity: true,   str: 'shockwave',         wav: 'effect/hunter_shockwavetrap' },
		146: { attachedEntity: true,   str: 'shockwavehit' },

		148: { attachedEntity: true,   str: 'pierce' },
		149: { attachedEntity: true,   str: 'bowling',           wav: 'effect/knight_bowling_bash' },
		150: { attachedEntity: true,   str: 'spearstab' },
		151: { attachedEntity: true,   str: 'spearboomerang',    wav: 'effect/knight_spear_boomerang' },
		152: { attachedEntity: true,   str: 'holyhit' },
		153: { attachedEntity: true,   str: 'ac_concentration',  wav: 'effect/ac_concentration' },
		154: { attachedEntity: true,   str: 'bs_refinesuccess',  wav: 'effect/bs_refinesuccess' },
		155: { attachedEntity: true,   str: 'bs_refinefailed',   wav: 'effect/bs_refinefailed' },

		158: { attachedEntity: true,   str: 'joblvup' },

		169: { attachedEntity: true,   str: 'energycoat' },
		170: { attachedEntity: true,   str: 'cartrevolution'},

		181: { attachedEntity: true,   str: 'mentalbreak' },
		182: { attachedEntity: true,   str: 'magical' },
		//183: self destruction ?

		186: { attachedEntity: true,   str: 'yunta_1' },
		187: { attachedEntity: true,   str: 'yunta_2' },
		188: { attachedEntity: true,   str: 'yunta_3' },
		189: { attachedEntity: true,   str: 'yunta_4' },
		190: { attachedEntity: true,   str: 'yunta_5' },
		191: { attachedEntity: true,   str: 'homing' },
		192: { attachedEntity: true,   str: 'poison' },
		193: { attachedEntity: true,   str: 'silence' },
		194: { attachedEntity: true,   str: 'stun' },
		195: { attachedEntity: true,   str: 'stonecurse',  }, // second stone curse ?

		197: { attachedEntity: true,   str: 'sleep' },
		199: { attachedEntity: false,  str: 'pong' }, // pong1 pong2 , ... ?

		204: { attachedEntity: true,   str: '»¡°£Æ÷¼Ç' },
		205: { attachedEntity: true,   str: 'ÁÖÈ«Æ÷¼Ç' },
		206: { attachedEntity: true,   str: '³ë¶õÆ÷¼Ç' },
		207: { attachedEntity: true,   str: 'ÇÏ¾áÆ÷¼Ç' },
		208: { attachedEntity: true,   str: 'ÆÄ¶õÆ÷¼Ç' },
		209: { attachedEntity: true,   str: 'ÃÊ·ÏÆ÷¼Ç' },
		210: { attachedEntity: true,   str: 'fruit' },
		211: { attachedEntity: true,   str: 'fruit_' },

		213: { attachedEntity: true,   str: 'deffender' },
		214: { attachedEntity: true,   str: 'keeping' },

		219: { attachedEntity: true,   str: '°¢¼º' },
		220: { attachedEntity: true,   str: '¹ö¼­Å©' },

		234: { attachedEntity: true,   str: 'spell' },
		235: { attachedEntity: true,   str: 'µð½ºÆç' },

		244: { attachedEntity: true,   str: '¸ÅÁ÷·Îµå' },
		245: { attachedEntity: true,   str: 'holy_cross',        wav: 'effect/cru_holycross' },
		246: { attachedEntity: true,   str: 'shield_charge' },

		248: { attachedEntity: true,   str: 'providence' },
		249: { attachedEntity: true,   str: 'twohand' },
		251: { attachedEntity: true,   str: 'devotion' },

		255: { attachedEntity: true,   str: 'enc_fire' },
		256: { attachedEntity: true,   str: 'enc_ice' },
		257: { attachedEntity: true,   str: 'enc_wind' },
		258: { attachedEntity: true,   str: 'enc_earth' },

		268: { attachedEntity: true,   str: 'steal_coin' },
		269: { attachedEntity: true,   str: 'strip_weapon',      wav: 'effect/t_º®Æ¨±è' },
		270: { attachedEntity: true,   str: 'strip_shield',      wav: 'effect/t_º®Æ¨±è' },
		271: { attachedEntity: true,   str: 'strip_armor',       wav: 'effect/t_º®Æ¨±è' },
		272: { attachedEntity: true,   str: 'strip_helm',        wav: 'effect/t_º®Æ¨±è' },

		305: { attachedEntity: true,   str: 'p_success' },
		306: { attachedEntity: true,   str: 'p_failed' },

		311: { attachedEntity: true,   str: 'loud.str' },
		315: { attachedEntity: false,  str: 'safetywall' },

		337: { attachedEntity: true,   str: 'joblvup' },

		371: { attachedEntity: true,   str: 'angel',             wav: 'levelup' },
		372: { attachedEntity: true,   str: 'devil' },

		390: { attachedEntity: true,   str: 'melt' },
		391: { attachedEntity: true,   str: 'cart' },
		392: { attachedEntity: true,   str: 'sword' },

		440: { attachedEntity: true,   str: 'asum' },

		507: { attachedEntity: true,   str: 'mapae' },
		508: { attachedEntity: true,   str: 'itempokjuk' },

		565: { attachedEntity: true,   str: 'moonlight_1' },
		566: { attachedEntity: true,   str: 'moonlight_2' },
		567: { attachedEntity: true,   str: 'moonlight_3' },
		568: { attachedEntity: true,   str: 'h_levelup' },
		569: { attachedEntity: true,   str: 'defense' },

		593: { attachedEntity: true,   str: 'food_str' },
		594: { attachedEntity: true,   str: 'food_int' },
		595: { attachedEntity: true,   str: 'food_vit' },
		596: { attachedEntity: true,   str: 'food_agi' },
		597: { attachedEntity: true,   str: 'food_dex' },
		598: { attachedEntity: true,   str: 'food_luk' },

		608: { attachedEntity: true,   str: 'cook_suc' },
		609: { attachedEntity: true,   str: 'cook_fail' },

		635: { attachedEntity: false,  str: 'fire_dragon' },
		636: { attachedEntity: false,  str: 'icy' },

		646: { attachedEntity: true,   str: 'Æ®·¢Å·' },

		649: { attachedEntity: true,   str: 'ºÒ½º¾ÆÀÌ' },

		668: { attachedEntity: true,   str: 'dragon_h' },

		670: { attachedEntity: true,   str: 'dfear' },

		677: { attachedEntity: true,   str: 'cwound' },
	};
});