/**
 * DB/SkillUnit.js
 *
 * Zone effects
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(['./SkillId'], function( SkillId )
{
	'use strict';

	return {
		0x7e: SkillId.MG_SAFETYWALL,
		0x7f: SkillId.MG_FIREWALL,
		0x85: SkillId.AL_PNEUMA,
		0x81: SkillId.AL_WARP,
		0x83: SkillId.PR_SANCTUARY,
		0x84: SkillId.PR_MAGNUS,

		// Lots of skills in 0x86, I think it does nothing
		//0x86: AC_SHOWER MG_THUNDERSTORM WZ_HEAVENDRIVE, CR_GRANDCROSS, SG_SUN_WARM, SG_MOON_WARM GS_DESPERADO

		0x87: SkillId.WZ_FIREPILLAR,
		0x8d: SkillId.WZ_ICEWALL,
		0x8e: SkillId.WZ_QUAGMIRE,
		0x8f: SkillId.HT_BLASTMINE,

		0x90: SkillId.HT_SKIDTRAP,
		0x91: SkillId.HT_ANKLESNARE,
		0x92: SkillId.AS_VENOMDUST,
		0x93: SkillId.HT_LANDMINE,
		0x94: SkillId.HT_SHOCKWAVE,
		0x95: SkillId.HT_SANDMAN,
		0x96: SkillId.HT_FLASHER,
		0x97: SkillId.HT_FREEZINGTRAP,
		0x98: SkillId.HT_CLAYMORETRAP,
		0x99: SkillId.HT_TALKIEBOX,
		0x9a: SkillId.SA_VOLCANO,
		0x9b: SkillId.SA_DELUGE,
		0x9c: SkillId.SA_VIOLENTGALE,
		0x9d: SkillId.SA_LANDPROTECTOR,
		0x9e: SkillId.BD_LULLABY,
		0x9f: SkillId.BD_RICHMANKIM,

		0xa0: SkillId.BD_ETERNALCHAOS,
		0xa1: SkillId.BD_DRUMBATTLEFIELD,
		0xa2: SkillId.BD_RINGNIBELUNGEN,
		0xa3: SkillId.BD_ROKISWEIL,
		0xa4: SkillId.BD_INTOABYSS,
		0xa5: SkillId.BD_SIEGFRIED,
		0xa6: SkillId.BA_DISSONANCE,
		0xa7: SkillId.BA_WHISTLE,
		0xa8: SkillId.BA_ASSASSINCROSS,
		0xa9: SkillId.BA_POEMBRAGI,
		0xaa: SkillId.BA_APPLEIDUN,
		0xab: SkillId.DC_UGLYDANCE,
		0xac: SkillId.DC_HUMMING,
		0xad: SkillId.DC_DONTFORGETME,
		0xae: SkillId.DC_FORTUNEKISS,
		0xaf: SkillId.DC_SERVICEFORYOU,

		0xb0: SkillId.RG_GRAFFITI,
		0xb1: SkillId.AM_DEMONSTRATION,
		//0xb2: SkillId.WE_CALLPARTNER, WE_CALLBABY, WE_CALLPARENT
		0xb3: SkillId.PA_GOSPEL,
		0xb4: SkillId.HP_BASILICA,
		0xb5: SkillId.CG_MOONLIT,
		0xb6: SkillId.PF_FOGWALL,
		0xb7: SkillId.PF_SPIDERWEB,
		0xb8: SkillId.HW_GRAVITATION,
		0xb9: SkillId.CG_HERMODE,
		0xbb: SkillId.NJ_SUITON,
		0xbc: SkillId.NJ_TATAMIGAESHI,
		0xbd: SkillId.NJ_KAENSIN,
		0xbe: SkillId.GS_GROUNDDRIFT,

		0xc1: SkillId.GD_LEADERSHIP,
		0xc2: SkillId.GD_GLORYWOUNDS,
		0xc3: SkillId.GD_SOULCOLD,
		0xc4: SkillId.GD_HAWKEYES,
		0xc7: SkillId.NPC_EVILLAND,
		0xca: SkillId.AB_EPICLESIS,
		0xcb: SkillId.WL_EARTHSTRAIN,
		0xcc: SkillId.SC_MANHOLE,
		0xcd: SkillId.SC_DIMENSIONDOOR,
		0xce: SkillId.SC_CHAOSPANIC,
		0xcf: SkillId.SC_MAELSTROM,

		0xd0: SkillId.SC_BLOODYLUST,
		0xd1: SkillId.SC_FEINTBOMB,
		0xd2: SkillId.RA_MAGENTATRAP,
		0xd3: SkillId.RA_COBALTTRAP,
		0xd4: SkillId.RA_MAIZETRAP,
		0xd5: SkillId.RA_VERDURETRAP,
		0xd6: SkillId.RA_FIRINGTRAP,
		0xd7: SkillId.RA_ICEBOUNDTRAP,
		0xd8: SkillId.RA_ELECTRICSHOCKER,
		0xd9: SkillId.RA_CLUSTERBOMB,
		0xda: SkillId.WM_REVERBERATION,
		0xdb: SkillId.WM_SEVERE_RAINSTORM,
		0xdc: SkillId.SO_FIREWALK,
		0xdd: SkillId.SO_ELECTRICWALK,
		0xde: SkillId.WM_POEMOFNETHERWORLD,
		0xdf: SkillId.SO_PSYCHIC_WAVE,

		0xe0: SkillId.SO_CLOUD_KILL,
		0xe1: SkillId.GC_POISONSMOKE,
		0xe2: SkillId.NC_NEUTRALBARRIER,
		0xe3: SkillId.NC_STEALTHFIELD,
		0xe4: SkillId.SO_WARMER,
		0xe5: SkillId.GN_THORNS_TRAP,
		0xe6: SkillId.GN_WALLOFTHORN,
		0xe7: SkillId.GN_DEMONIC_FIRE,
		0xe8: SkillId.GN_FIRE_EXPANSION_SMOKE_POWDER,
		0xe9: SkillId.GN_FIRE_EXPANSION_TEAR_GAS,
		0xea: SkillId.GN_HELLS_PLANT,
		0xeb: SkillId.SO_VACUUM_EXTREME,
		0xec: SkillId.LG_BANDING,
		0xed: SkillId.EL_FIRE_MANTLE,
		0xee: SkillId.EL_WATER_BARRIER,
		0xef: SkillId.EL_ZEPHYR,

		0xf0: SkillId.EL_POWER_OF_GAIA,
		0xf1: SkillId.SO_FIRE_INSIGNIA,
		0xf2: SkillId.SO_WATER_INSIGNIA,
		0xf3: SkillId.SO_WIND_INSIGNIA,
		0xf4: SkillId.SO_EARTH_INSIGNIA,
		0xf5: SkillId.MH_POISON_MIST,
		0xf6: SkillId.MH_LAVA_SLIDE,
		0xf7: SkillId.MH_VOLCANIC_ASH,
		0xf8: SkillId.KO_ZENKAI,
		0xfc: SkillId.KO_MAKIBISHI,
		0xfd: SkillId.NPC_VENOMFOG,
		0xfe: SkillId.SC_SCAPE,

		0x101: SkillId.NC_MAGMA_ERUPTION,
		0x104: SkillId.RL_B_TRAP,
	};
});