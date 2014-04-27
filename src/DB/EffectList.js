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
		25:  { attachedEntity: false,  str: 'firewall%d',        wav: 'effect/ef_firewall',                random:[1,2] },

		29:  { attachedEntity: true,   str: 'lightning' },
		30:  { attachedEntity: false,  str: 'thunderstorm',      wav: 'effect/magician_thunderstorm' },

		40:  { attachedEntity: true,   str: 'cross' },
		41:  { attachedEntity: true,   str: 'angelus',           wav: 'effect/ef_angelus',                 str_min: 'jong_mini' },

		49:  { attachedEntity: true,   str: 'firehit%d',         wav: 'effect/ef_firehit',                 random:[1,3] },

		52:  { attachedEntity: true,   str: 'windhit%d',                                                   random:[1,3] },

		64:  { attachedEntity: true,   str: 'arrowshot' },
		65:  { attachedEntity: true,   str: 'invenom' },
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
		92:  { attachedEntity: false,  str: 'meteor%d',          wav: 'effect/priest_meteor',              random:[1,4] },

		94:  { attachedEntity: true,   str: 'ufidel_pang' },
		95:  { attachedEntity: false,  str: 'quagmire' },
		96:  { attachedEntity: false,  str: 'firepillar',        wav: 'effect/wizard_fire_pillar_a' },
		97:  { attachedEntity: false,  str: 'firepillarbomp',    wav: 'effect/wizard_fire_pillar_b' },

		101: { attachedEntity: true,   str: 'repairweapon',      wav: 'effect/black_weapon_repear' },
		102: { attachedEntity: false,  str: 'crashearth',        wav: 'effect/black_hammerfall' },
		103: { attachedEntity: true,   str: 'weaponperfection',  wav: 'effect/black_weapon_perfection',    str_min: 'weaponperfection_min' },
		104: { attachedEntity: true,   str: 'maximizepower',     wav: 'effect/black_maximize_power_sword', str_min: 'maximize_min' },

		106: { attachedEntity: false,  str: 'blastmine',         wav: 'effect/hunter_blastmine' },
		107: { attachedEntity: false,  str: 'claymore',          wav: 'effect/hunter_claymoretrap' },
		108: { attachedEntity: false,  str: 'freezing',          wav: 'effect/hunter_freezingtrap' },
		109: { attachedEntity: false,  str: 'bubble%d',                                                    random:[1,4] },
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

		133: { attachedEntity: true,   str: 'freeze' },
		134: { attachedEntity: true,   str: 'freezed' },
		135: { attachedEntity: true,   str: 'icecrash'},
		136: { attachedEntity: false,  str: 'slowp' },

		139: { attachedEntity: false,  str: 'sandman',           wav: 'effect/hunter_sandman' },

		141: { attachedEntity: false,  str: 'pneuma%d',                                                     random:[1,3] },

		143: { attachedEntity: true,   str: 'sonicblow' },
		144: { attachedEntity: true,   str: 'brandish2',         wav: 'effect/knight_brandish_spear' },
		145: { attachedEntity: true,   str: 'shockwave',         wav: 'effect/hunter_shockwavetrap' },
		146: { attachedEntity: true,   str: 'shockwavehit' },
		147: { attachedEntity: true,   str: 'earthhit' },
		148: { attachedEntity: true,   str: 'pierce' },
		149: { attachedEntity: true,   str: 'bowling',           wav: 'effect/knight_bowling_bash' },
		150: { attachedEntity: true,   str: 'spearstab' },
		151: { attachedEntity: true,   str: 'spearboomerang',    wav: 'effect/knight_spear_boomerang' },
		152: { attachedEntity: true,   str: 'holyhit' },
		153: { attachedEntity: true,   str: 'concentration',     wav: 'effect/ac_concentration' },
		154: { attachedEntity: true,   str: 'bs_refinesuccess',  wav: 'effect/bs_refinesuccess' },
		155: { attachedEntity: true,   str: 'bs_refinefailed',   wav: 'effect/bs_refinefailed' },
		// not used because not in RO game data (causing error in the official client)
		// 156: jobchange
		// 157: levelup
		158: { attachedEntity: true,   str: 'joblvup' },

		// 167: tamingsuccess
		// 168: tamingfailed
		169: { attachedEntity: true,   str: 'energycoat' },
		170: { attachedEntity: true,   str: 'cartrevolution'},

		181: { attachedEntity: true,   str: 'mentalbreak' },
		182: { attachedEntity: true,   str: 'magical' },
		183: { attachedEntity: true,   str: 'sui_explosion' },

		185: { attachedEntity: true,   str: 'suicide' },

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

		199: { attachedEntity: false,  str: 'pong%d',           random:[1,3] },

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

		218: { attachedEntity: true,   str: 'ÁýÁß' },
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
		273: { attachedEntity: true,   str: '¿¬È¯' },

		305: { attachedEntity: true,   str: 'p_success' },
		306: { attachedEntity: true,   str: 'p_failed' },

		311: { attachedEntity: true,   str: 'loud.str' },
		315: { attachedEntity: false,  str: 'safetywall' },

		337: { attachedEntity: true,   str: 'joblvup' },

		369: { attachedEntity: true,   str: 'twohand' },

		371: { attachedEntity: true,   str: 'angel',             wav: 'levelup' },
		372: { attachedEntity: true,   str: 'devil' },

		390: { attachedEntity: true,   str: 'melt' },
		391: { attachedEntity: true,   str: 'cart' },
		392: { attachedEntity: true,   str: 'sword' },

		406: { attachedEntity: true,   str: '¼Ò¿ï¹ø' },
		407: { attachedEntity: true,   str: '»ç¶÷È¿°ú' },

		440: { attachedEntity: true,   str: 'asum' },

		491: { attachedEntity: true,   str: 'Âý½Ò¶±' },
		492: { attachedEntity: true,   str: 'ramadan' },

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

		603: { attachedEntity: true,   str: 'firehit%d', random:[1,3] },

		608: { attachedEntity: true,   str: 'cook_suc' },
		609: { attachedEntity: true,   str: 'cook_fail' },

		612: { attachedEntity: true,   str: 'itempokjuk' },

		635: { attachedEntity: false,  str: 'fire_dragon' },
		636: { attachedEntity: false,  str: 'icy' },

		646: { attachedEntity: true,   str: 'Æ®·¢Å·' },

		649: { attachedEntity: true,   str: 'ºÒ½º¾ÆÀÌ' },

		668: { attachedEntity: true,   str: 'dragon_h' },
		669: { attachedEntity: true,   str: 'wideb' },
		670: { attachedEntity: true,   str: 'dfear' },

		677: { attachedEntity: true,   str: 'cwound' },

		699: { attachedEntity: true,   str: 'flower_leaf' },

		704: { attachedEntity: true,   str: 'mobile_ef02' },
		705: { attachedEntity: true,   str: 'mobile_ef01' },
		706: { attachedEntity: true,   str: 'mobile_ef03' },

		708: { attachedEntity: false,  str: 'storm_min' },
		709: { attachedEntity: false,  str: 'pokjuk_jap' },

		717: { attachedEntity: true,   str: 'angelus',           wav: 'effect/ef_angelus',                 str_min: 'jong_mini' },

		721: { attachedEntity: true,   str: 'ado' },
		722: { attachedEntity: true,   str: 'ÀÌ±×´Ï¼Çºê·¹ÀÌÅ©' },

		727: { attachedEntity: true,   str: 'crimson_r' },
		728: { attachedEntity: true,   str: 'hell_in' },

		731: { attachedEntity: true,   str: 'dragon_h' },

		734: { attachedEntity: true,   str: 'chainlight' },

		745: { attachedEntity: true,   str: 'aimed' },
		746: { attachedEntity: true,   str: 'arrowstorm' },
		747: { attachedEntity: true,   str: 'laulamus' },
		748: { attachedEntity: true,   str: 'lauagnus' },
		749: { attachedEntity: true,   str: 'mil_shield' },
		750: { attachedEntity: true,   str: 'concentration' },

		756: { attachedEntity: true,   str: '¹ö¼­Å©' },

		795: { attachedEntity: true,   str: 'powerswing' },
		813: { attachedEntity: true,   str: 'enervation' },
		814: { attachedEntity: true,   str: 'groomy' },
		815: { attachedEntity: true,   str: 'ignorance' },
		816: { attachedEntity: true,   str: 'laziness' },
		817: { attachedEntity: true,   str: 'unlucky' },
		818: { attachedEntity: true,   str: 'weakness' },

		920: { attachedEntity: true,   str: 'firewall_per' },

		926: { attachedEntity: true,   str: 'hunter_shockwave_blue' },

		959: { attachedEntity: true,   str: 'poison_mist' },
		960: { attachedEntity: true,   str: 'eraser_cutter' },

		964: { attachedEntity: true,   str: 'lava_slide' },
		965: { attachedEntity: true,   str: 'sonic_claw' },
		966: { attachedEntity: true,   str: 'tinder' },
		967: { attachedEntity: true,   str: 'mid_frenzy' },

		975: { attachedEntity: true,   str: 'vash00' },

		987: { attachedEntity: true,   str: 'rwc2011' },
		988: { attachedEntity: true,   str: 'rwc2011_2' },

		1015: { attachedEntity: true,  str: 'rune_success' },
		1016: { attachedEntity: true,  str: 'rune_fail' },
		1017: { attachedEntity: true,  str: 'changematerial_su' },
		1018: { attachedEntity: true,  str: 'changematerial_fa' },
		1019: { attachedEntity: true,  str: 'Guardian' },
		1020: { attachedEntity: true,  str: 'bubble%d_1', random:[1,4] },
		1021: { attachedEntity: true,  str: 'dust' },

		1029: { attachedEntity: true,  str: 'dancingblade' },
		1031: { attachedEntity: true,  str: 'invincibleoff2' },

		1033: { attachedEntity: true,  str: 'devil' },

		1040: { attachedEntity: true,  str: 'gc_darkcrow' },

		1042: { attachedEntity: true,  str: 'all_full_throttle' },
		1043: { attachedEntity: true,  str: 'sr_flashcombo' },
		1044: { attachedEntity: true,  str: 'rk_luxanima' },

		1046: { attachedEntity: true,  str: 'so_elemental_shield' },
		1047: { attachedEntity: true,  str: 'ab_offertorium' },
		1048: { attachedEntity: true,  str: 'wl_telekinesis_intense' },
		1049: { attachedEntity: true,  str: 'gn_illusiondoping' },
		1050: { attachedEntity: true,  str: 'nc_magma_eruption' },

		1055: { attachedEntity: true,  str: 'chill' },
		1057: { attachedEntity: true,  str: 'ab_offertorium_ring' },
		1062: { attachedEntity: true,  str: 'stormgust' },
	};
});