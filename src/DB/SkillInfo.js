/**
 * DB/SkillInfo.js
 *
 * Manage skills
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(['./SkillId', './JobID'], function( SKID, JOBID )
{
	"use strict";


	var exports = {};


	exports[SKID.SN_WINDWALK] = {
		Name: "SN_WINDWALK",
		SkillName : "Wind Walk",
		MaxLv : 10,
		SpAmount : [ 46, 52, 58, 64, 70, 76, 82, 88, 94, 100 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AC_CONCENTRATION,9 ]
		]
	};

	exports[SKID.AL_RUWACH] = {
		Name: "AL_RUWACH",
		SkillName : "Ruwach",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 10 ]
	};

	exports[SKID.WS_MELTDOWN] = {
		Name: "WS_MELTDOWN",
		SkillName : "Melt Down",
		MaxLv : 10,
		SpAmount : [ 50, 50, 60, 60, 70, 70, 80, 80, 90, 90 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BS_SKINTEMPER,3 ],
			[ SKID.BS_HILTBINDING,1 ],
			[ SKID.BS_WEAPONRESEARCH,5 ],
			[ SKID.BS_OVERTHRUST,3 ]
		]
	};

	exports[SKID.WS_CREATECOIN] = {
		Name: "WS_CREATECOIN",
		SkillName : "Create Coin",
		MaxLv : 3,
		SpAmount : [ 10, 20, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	exports[SKID.MER_MAGNIFICAT] = {
		Name: "MER_MAGNIFICAT",
		SkillName : "Magnificat",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.WS_CREATENUGGET] = {
		Name: "WS_CREATENUGGET",
		SkillName : "Create Nugget",
		MaxLv : 3,
		SpAmount : [ 10, 20, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	exports[SKID.WS_CARTBOOST] = {
		Name: "WS_CARTBOOST",
		SkillName : "Cart Boost",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.MC_PUSHCART,5 ],
			[ SKID.BS_HILTBINDING,1 ],
			[ SKID.MC_CARTREVOLUTION ],
			[ SKID.MC_CHANGECART ]
		]
	};

	exports[SKID.WS_SYSTEMCREATE] = {
		Name: "WS_SYSTEMCREATE",
		SkillName : "Auto Attack System",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 7 ]
	};

	exports[SKID.ST_CHASEWALK] = {
		Name: "ST_CHASEWALK",
		SkillName : "Chase Walk",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.TF_HIDING,5 ],
			[ SKID.RG_TUNNELDRIVE,3 ]
		]
	};

	exports[SKID.ST_REJECTSWORD] = {
		Name: "ST_REJECTSWORD",
		SkillName : "Reject Sword",
		MaxLv : 5,
		SpAmount : [ 10, 15, 20, 25, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.ST_STEALBACKPACK] = {
		Name: "ST_STEALBACKPACK",
		SkillName : "Steal Backpack",
		MaxLv : 5,
		SpAmount : [ 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.EL_HEATER] = {
		Name: "EL_HEATER",
		SkillName : "Heater",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.CR_ALCHEMY] = {
		Name: "CR_ALCHEMY",
		SkillName : "Alchemy",
		MaxLv : 0,
		SpAmount : [ ],
		bSeperateLv : false,
		AttackRange : [ ]
	};

	exports[SKID.CR_SYNTHESISPOTION] = {
		Name: "CR_SYNTHESISPOTION",
		SkillName : "Synthesis Potion",
		MaxLv : 0,
		SpAmount : [ ],
		bSeperateLv : false,
		AttackRange : [ ]
	};

	exports[SKID.CG_ARROWVULCAN] = {
		Name: "CG_ARROWVULCAN",
		SkillName : "Arrow Vulcan",
		MaxLv : 10,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		NeedSkillList : new function(){
			this[JOBID.JT_BARD_H] = [
				[ SKID.AC_DOUBLE,5 ],
				[ SKID.AC_SHOWER,5 ],
				[ SKID.BA_MUSICALSTRIKE,1 ]
			];
			this[JOBID.JT_DANCER_H] = [
				[ SKID.AC_DOUBLE,5 ],
				[ SKID.AC_SHOWER,5 ],
				[ SKID.DC_THROWARROW,1 ]
			]
		}
	};

	exports[SKID.CG_MOONLIT] = {
		Name: "CG_MOONLIT",
		SkillName : "Moonlit Water Mill",
		MaxLv : 5,
		SpAmount : [ 30, 40, 50, 60, 70 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		NeedSkillList : new function(){
			this[JOBID.JT_BARD_H] = [
				[ SKID.AC_CONCENTRATION,5 ],
				[ SKID.BA_MUSICALLESSON,7 ]
			];
			this[JOBID.JT_DANCER_H] = [
				[ SKID.AC_CONCENTRATION,5 ],
				[ SKID.DC_DANCINGLESSON,7 ]
			]
		}
	};

	exports[SKID.CG_MARIONETTE] = {
		Name: "CG_MARIONETTE",
		SkillName : "Marionette Control",
		MaxLv : 1,
		SpAmount : [ 100 ],
		bSeperateLv : false,
		AttackRange : [ 7 ],
		NeedSkillList : new function(){
			this[JOBID.JT_BARD_H] = [
				[ SKID.AC_CONCENTRATION,10 ],
				[ SKID.BA_MUSICALLESSON,5 ]
			];
			this[JOBID.JT_DANCER_H] = [
				[ SKID.AC_CONCENTRATION,10 ],
				[ SKID.DC_DANCINGLESSON,5 ]
			]
		}
	};

	exports[SKID.LK_SPIRALPIERCE] = {
		Name: "LK_SPIRALPIERCE",
		SkillName : "Spiral Pierce",
		MaxLv : 5,
		SpAmount : [ 18, 21, 24, 27, 30 ],
		bSeperateLv : true,
		AttackRange : [ 4, 4, 4, 4, 4 ],
		_NeedSkillList : [
			[ SKID.KN_SPEARMASTERY,5 ],
			[ SKID.KN_PIERCE,5 ],
			[ SKID.KN_RIDING,1 ],
			[ SKID.KN_SPEARSTAB,5 ]
		]
	};

	exports[SKID.LK_HEADCRUSH] = {
		Name: "LK_HEADCRUSH",
		SkillName : "Head Crush",
		MaxLv : 5,
		SpAmount : [ 23, 23, 23, 23, 23 ],
		bSeperateLv : false,
		AttackRange : [ 4, 4, 4, 4, 4 ],
		_NeedSkillList : [
			[ SKID.KN_SPEARMASTERY,9 ],
			[ SKID.KN_RIDING,1 ]
		]
	};

	exports[SKID.LK_JOINTBEAT] = {
		Name: "LK_JOINTBEAT",
		SkillName : "Joint Beat",
		MaxLv : 10,
		SpAmount : [ 12, 12, 14, 14, 16, 16, 18, 18, 20, 20 ],
		bSeperateLv : true,
		AttackRange : [ 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ],
		_NeedSkillList : [
			[ SKID.KN_CAVALIERMASTERY,3 ],
			[ SKID.LK_HEADCRUSH,3 ]
		]
	};

	exports[SKID.AL_PNEUMA] = {
		Name: "AL_PNEUMA",
		SkillName : "Pneuma",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [ 
			[ SKID.AL_WARP,4 ]
		]
	};

	exports[SKID.HW_NAPALMVULCAN] = {
		Name: "HW_NAPALMVULCAN",
		SkillName : "Napalm Vulcan",
		MaxLv : 5,
		SpAmount : [ 10, 25, 40, 55, 70 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_NAPALMBEAT,5 ]
		]
	};

	exports[SKID.CH_SOULCOLLECT] = {
		Name: "CH_SOULCOLLECT",
		SkillName : "Dangerous Soul Collect",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.MO_EXPLOSIONSPIRITS,5 ]
		]
	};

	exports[SKID.PF_MINDBREAKER] = {
		Name: "PF_MINDBREAKER",
		SkillName : "Mind Breaker",
		MaxLv : 5,
		SpAmount : [ 12, 15, 18, 21, 24 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_SRECOVERY,3 ],
			[ SKID.PF_SOULBURN,2 ]
		]
	};

	exports[SKID.PF_MEMORIZE] = {
		Name: "PF_MEMORIZE",
		SkillName : "Memorize",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.SA_ADVANCEDBOOK,5 ],
			[ SKID.SA_FREECAST,5 ],
			[ SKID.SA_AUTOSPELL,1 ]
		]
	};

	exports[SKID.PF_FOGWALL] = {
		Name: "PF_FOGWALL",
		SkillName : "Wall of Fog",
		MaxLv : 1,
		SpAmount : [ 25 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SKID.SA_VIOLENTGALE,2 ],
			[ SKID.SA_DELUGE,2 ]
		]
	};

	exports[SKID.PF_SPIDERWEB] = {
		Name: "PF_SPIDERWEB",
		SkillName : "Spider Web",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SKID.SA_DRAGONOLOGY,4 ]
		]
	};

	exports[SKID.ASC_METEORASSAULT] = {
		Name: "ASC_METEORASSAULT",
		SkillName : "Meteor Assault",
		MaxLv : 10,
		SpAmount : [ 10, 12, 14, 16, 18, 20, 22, 24, 26, 28 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AS_KATAR,5 ],
			[ SKID.AS_RIGHT,3 ],
			[ SKID.AS_SONICBLOW,5 ],
			[ SKID.ASC_BREAKER,1 ]
		]
	};

	exports[SKID.ASC_CDP] = {
		Name: "ASC_CDP",
		SkillName : "Create Deadly Poison",
		MaxLv : 1,
		SpAmount : [ 50 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.TF_POISON,10 ],
			[ SKID.TF_DETOXIFY,1 ],
			[ SKID.AS_ENCHANTPOISON,5 ]
		]
	};

	exports[SKID.WE_BABY] = {
		Name: "WE_BABY",
		SkillName : "Mom, Dad, I love you!",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
	};

	exports[SKID.WE_CALLPARENT] = {
		Name: "WE_CALLPARENT",
		SkillName : "Mom, Dad, I miss you!",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.WE_CALLBABY] = {
		Name: "WE_CALLBABY",
		SkillName : "Come to me, honey~",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.TK_RUN] = {
		Name: "TK_RUN",
		SkillName : "Running",
		MaxLv : 10,
		SpAmount : [ 100, 90, 80, 70, 60, 50, 40, 30, 20, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.TK_READYSTORM] = {
		Name: "TK_READYSTORM",
		SkillName : "Prepare Whirlwind Kick",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.TK_STORMKICK,1 ]
		]
	};

	exports[SKID.TK_STORMKICK] = {
		Name: "TK_STORMKICK",
		SkillName : "Whirlwind Kick",
		MaxLv : 7,
		SpAmount : [ 14, 12, 10, 8, 6, 4, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.TK_READYDOWN] = {
		Name: "TK_READYDOWN",
		SkillName : "Prepare Axe Kick",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.TK_DOWNKICK,1 ]
		]
	};

	exports[SKID.TK_DOWNKICK] = {
		Name: "TK_DOWNKICK",
		SkillName : "Axe Kick",
		MaxLv : 7,
		SpAmount : [ 14, 12, 10, 8, 6, 4, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.AL_TELEPORT] = {
		Name: "AL_TELEPORT",
		SkillName : "Teleportation",
		MaxLv : 2,
		SpAmount : [ 10, 9 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1 ],
		_NeedSkillList : [
			[ SKID.AL_RUWACH,1 ]
		]
	};

	exports[SKID.TK_READYTURN] = {
		Name: "TK_READYTURN",
		SkillName : "Prepare Round Kick",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.TK_TURNKICK,1 ]
		]
	};

	exports[SKID.TK_TURNKICK] = {
		Name: "TK_TURNKICK",
		SkillName : "Round Kick",
		MaxLv : 7,
		SpAmount : [ 14, 12, 10, 8, 6, 4, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.TK_READYCOUNTER] = {
		Name: "TK_READYCOUNTER",
		SkillName : "Prepare Counter Kick",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.TK_COUNTER,1 ]
		]
	};

	exports[SKID.TK_COUNTER] = {
		Name: "TK_COUNTER",
		SkillName : "Counter Kick",
		MaxLv : 7,
		SpAmount : [ 14, 12, 10, 8, 6, 4, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.TK_DODGE] = {
		Name: "TK_DODGE",
		SkillName : "Break Fall",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.TK_JUMPKICK,7 ]
		]
	};

	exports[SKID.TK_JUMPKICK] = {
		Name: "TK_JUMPKICK",
		SkillName : "Flying Side Kick",
		MaxLv : 7,
		SpAmount : [ 70, 60, 50, 40, 30, 20, 10 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.TK_HPTIME] = {
		Name: "TK_HPTIME",
		SkillName : "Peaceful Rest",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.TK_SPTIME] = {
		Name: "TK_SPTIME",
		SkillName : "Enjoyable Rest",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.TK_POWER] = {
		Name: "TK_POWER",
		SkillName : "Fighting Chant",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.TK_SEVENWIND] = {
		Name: "TK_SEVENWIND",
		SkillName : "Warm Wind",
		MaxLv : 7,
		SpAmount : [ 20, 20, 20, 20, 50, 50, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.TK_HPTIME,5 ],
			[ SKID.TK_SPTIME,5 ],
			[ SKID.TK_POWER,5 ]
		]
	};

	exports[SKID.TK_HIGHJUMP] = {
		Name: "TK_HIGHJUMP",
		SkillName : "High Jump",
		MaxLv : 5,
		SpAmount : [ 50, 50, 50, 50, 50 ],
		bSeperateLv : true,
		AttackRange : [ 2, 4, 6, 8, 10 ]
	};

	exports[SKID.SG_FEEL] = {
		Name: "SG_FEEL",
		SkillName : "Feeling",
		MaxLv : 3,
		SpAmount : [ 100, 100, 100 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ]
	};

	exports[SKID.SG_SUN_WARM] = {
		Name: "SG_SUN_WARM",
		SkillName : "Warmth of the Sun",
		MaxLv : 3,
		SpAmount : [ 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SG_FEEL,1 ]
		]
	};

	exports[SKID.SG_MOON_WARM] = {
		Name: "SG_MOON_WARM",
		SkillName : "Warmth of the Moon",
		MaxLv : 3,
		SpAmount : [ 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SG_FEEL,2 ]
		]
	};

	exports[SKID.SG_STAR_WARM] = {
		Name: "SG_STAR_WARM",
		SkillName : "Warmth of the Stars",
		MaxLv : 3,
		SpAmount : [ 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SG_FEEL,3 ]
		]
	};

	exports[SKID.SG_SUN_COMFORT] = {
		Name: "SG_SUN_COMFORT",
		SkillName : "Comfort of the Sun",
		MaxLv : 4,
		SpAmount : [ 70, 60, 50, 40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SG_FEEL,1 ]
		]
	};

	exports[SKID.AL_WARP] = {
		Name: "AL_WARP",
		SkillName : "Warp Portal",
		MaxLv : 4,
		SpAmount : [ 35, 32, 29, 26 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.AL_TELEPORT,2 ]
		]
	};

	exports[SKID.SG_MOON_COMFORT] = {
		Name: "SG_MOON_COMFORT",
		SkillName : "Comfort of the Moon",
		MaxLv : 4,
		SpAmount : [ 70, 60, 50 ,40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SG_FEEL,2 ]
		]
	};

	exports[SKID.SG_STAR_COMFORT] = {
		Name: "SG_STAR_COMFORT",
		SkillName : "Comfort of the Stars",
		MaxLv : 4,
		SpAmount : [ 70, 60, 50 ,40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SG_FEEL,3 ]
		]
	};

	exports[SKID.SG_HATE] = {
		Name: "SG_HATE",
		SkillName : "Hatred",
		MaxLv : 3,
		SpAmount : [ 100, 100, 100 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9 ]
	};

	exports[SKID.SG_SUN_ANGER] = {
		Name: "SG_SUN_ANGER",
		SkillName : "Anger of the Sun",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SG_HATE,1 ]
		]
	};

	exports[SKID.SG_MOON_ANGER] = {
		Name: "SG_MOON_ANGER",
		SkillName : "Anger of the Moon",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SG_HATE,2 ]
		]
	};

	exports[SKID.SG_STAR_ANGER] = {
		Name: "SG_STAR_ANGER",
		SkillName : "Anger of the Stars",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SG_HATE,3 ]
		]
	};

	exports[SKID.SG_SUN_BLESS] = {
		Name: "SG_SUN_BLESS",
		SkillName : "Blessing of the Sun",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SG_FEEL,1 ],
			[ SKID.SG_HATE,1 ]
		]
	};

	exports[SKID.SG_MOON_BLESS] = {
		Name: "SG_MOON_BLESS",
		SkillName : "Blessing of the Moon",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SG_FEEL,2 ],
			[ SKID.SG_HATE,2 ]
		]
	};

	exports[SKID.SG_STAR_BLESS] = {
		Name: "SG_STAR_BLESS",
		SkillName : "Blessing of the Stars",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SG_FEEL,3 ],
			[ SKID.SG_HATE,3 ]
		]
	};

	exports[SKID.SG_DEVIL] = {
		Name: "SG_DEVIL",
		SkillName : "Demon",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.GD_DEVELOPMENT] = {
		Name: "GD_DEVELOPMENT",
		SkillName : "Emsolute Develop",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.SG_FRIEND] = {
		Name: "SG_FRIEND",
		SkillName : "Friend",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	exports[SKID.SG_KNOWLEDGE] = {
		Name: "SG_KNOWLEDGE",
		SkillName : "Knowledge",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.SG_FUSION] = {
		Name: "SG_FUSION",
		SkillName : "Union",
		MaxLv : 1,
		Type : "Soul",
		SpAmount : [ 100 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.SG_KNOWLEDGE,9 ]
		]
	};

	exports[SKID.SL_ALCHEMIST] = {
		Name: "SL_ALCHEMIST",
		SkillName : "Alchemist Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.AM_BERSERKPITCHER] = {
		Name: "AM_BERSERKPITCHER",
		SkillName : "Berserk Pitcher",
		MaxLv : 1,
		Type : "Soul",
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.SL_MONK] = {
		Name: "SL_MONK",
		SkillName : "Monk Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.AL_HEAL] = {
		Name: "AL_HEAL",
		SkillName : "Heal",
		MaxLv : 10,
		SpAmount : [ 13, 16, 19, 22, 25, 28, 31, 34, 37, 40 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		NeedSkillList : new function(){
			this[JOBID.JT_CRUSADER] = [
				[ SKID.CR_TRUST,10 ],
				[ SKID.AL_DEMONBANE,5 ]
			]
		}
	};

	exports[SKID.SL_STAR] = {
		Name: "SL_STAR",
		SkillName : "Star Gladiator Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.SL_SAGE] = {
		Name: "SL_SAGE",
		SkillName : "Sage Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.MER_QUICKEN] = {
		Name: "MER_QUICKEN",
		SkillName : "Two-Hand Quicken",
		MaxLv : 10,
		SpAmount : [ 14, 18, 22, 26, 30, 34, 38, 42, 46, 50 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ] 
	};

	exports[SKID.SL_CRUSADER] = {
		Name: "SL_CRUSADER",
		SkillName : "Crusader Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.SL_SUPERNOVICE] = {
		Name: "SL_SUPERNOVICE",
		SkillName : "Super Novice Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SL_STAR,1 ]
		]

	};

	exports[SKID.SL_KNIGHT] = {
		Name: "SL_KNIGHT",
		SkillName : "Knight Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SL_CRUSADER,1 ]
		]
	};

	exports[SKID.SL_WIZARD] = {
		Name: "SL_WIZARD",
		SkillName : "Wizard Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SL_SAGE,1 ]
		]
	};

	exports[SKID.SL_PRIEST] = {
		Name: "SL_PRIEST",
		SkillName : "Priest Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SL_MONK,1 ]
		]
	};

	exports[SKID.SL_BARDDANCER] = {
		Name: "SL_BARDDANCER",
		SkillName : "Bard and Dancer Spirits",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.EL_TROPIC] = {
		Name: "EL_TROPIC",
		SkillName : "Tropic",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.SL_ROGUE] = {
		Name: "SL_ROGUE",
		SkillName : "Rogue Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SL_ASSASIN,1 ]
		]
	};

	exports[SKID.SL_ASSASIN] = {
		Name: "SL_ASSASIN",
		SkillName : "Assassin Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.SL_BLACKSMITH] = {
		Name: "SL_BLACKSMITH",
		SkillName : "Blacksmith Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SL_ALCHEMIST,1 ]
		]
	};

	exports[SKID.BS_ADRENALINE2] = {
		Name: "BS_ADRENALINE2",
		SkillName : "Full Adrenaline Rush",
		MaxLv : 1,
		Type : "Soul",
		SpAmount : [ 64 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.BS_ADRENALINE,5 ]
		]
	};

	exports[SKID.SL_HUNTER] = {
		Name: "SL_HUNTER",
		SkillName : "Hunter Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SL_BARDDANCER,1 ]
		]
	};

	exports[SKID.SL_SOULLINKER] = {
		Name: "SL_SOULLINKER",
		SkillName : "Soul Linker Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SL_STAR,1 ]
		]
	};

	exports[SKID.SL_KAIZEL] = {
		Name: "SL_KAIZEL",
		SkillName : "Kaizel",
		MaxLv : 7,
		SpAmount : [ 120, 110, 100, 90, 80, 70, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SL_PRIEST,1 ]
		]
	};

	exports[SKID.SL_KAAHI] = {
		Name: "SL_KAAHI",
		SkillName : "Kaahi",
		MaxLv : 7,
		SpAmount : [ 30, 30, 30, 30, 30, 30, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SL_CRUSADER,1 ],
			[ SKID.SL_MONK,1 ],
			[ SKID.SL_PRIEST,1 ]
		]
	};

	exports[SKID.AL_INCAGI] = {
		Name: "AL_INCAGI",
		SkillName : "Increase Agility",
		MaxLv : 10,
		SpAmount : [ 18, 21, 24, 27, 30, 33, 36, 39, 42, 45 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.AL_HEAL,3]
		]
	};

	exports[SKID.SL_KAUPE] = {
		Name: "SL_KAUPE",
		SkillName : "Kaupe",
		MaxLv : 3,
		SpAmount : [ 20, 30, 40 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SL_ASSASIN,1 ],
			[ SKID.SL_ROGUE,1 ]
		]
	};

	exports[SKID.SL_KAITE] = {
		Name: "SL_KAITE",
		SkillName : "Kaite",
		MaxLv : 7,
		SpAmount : [ 70, 70, 70, 70, 70, 70, 70 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SL_SAGE,1 ],
			[ SKID.SL_WIZARD,1 ]
		]
	};

	exports[SKID.SL_KAINA] = {
		Name: "SL_KAINA",
		SkillName : "Kaina",
		MaxLv : 7,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.TK_SPTIME,1 ]
		]
	};

	exports[SKID.SL_STIN] = {
		Name: "SL_STIN",
		SkillName : "Estin",
		MaxLv : 7,
		SpAmount : [ 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SL_WIZARD,1 ]
		]
	};

	exports[SKID.SL_STUN] = {
		Name: "SL_STUN",
		SkillName : "Estun",
		MaxLv : 7,
		SpAmount : [ 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SL_WIZARD,1 ]
		]
	};

	exports[SKID.SL_SMA] = {
		Name: "SL_SMA",
		SkillName : "Esma",
		MaxLv : 10,
		SpAmount : [ 8, 16, 24, 32, 40, 48, 56, 64, 72, 80 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SL_STIN,7 ],
			[ SKID.SL_STUN,7 ]
		]
	};

	exports[SKID.SL_SWOO] = {
		Name: "SL_SWOO",
		SkillName : "Eswoo",
		MaxLv : 7,
		SpAmount : [ 75, 65, 55, 45, 35, 25, 15 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SL_PRIEST,1 ]
		]
	};

	exports[SKID.SL_SKE] = {
		Name: "SL_SKE",
		SkillName : "Eske",
		MaxLv : 3,
		SpAmount : [ 45, 30, 15 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SL_KNIGHT,1 ]
		]
	};

	exports[SKID.SL_SKA] = {
		Name: "SL_SKA",
		SkillName : "Eska",
		MaxLv : 3,
		SpAmount : [ 100, 80, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SL_MONK,1 ]
		]
	};

	exports[SKID.ST_PRESERVE] = {
		Name: "ST_PRESERVE",
		SkillName : "Preserve",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.RG_PLAGIARISM,10 ]
		]
	};

	exports[SKID.ST_FULLSTRIP] = {
		Name: "ST_FULLSTRIP",
		SkillName : "Full Strip",
		MaxLv : 5,
		SpAmount : [ 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RG_STRIPWEAPON,5 ]
		]
	};

	exports[SKID.WS_WEAPONREFINE] = {
		Name: "WS_WEAPONREFINE",
		SkillName : "Weapon Refine",
		MaxLv : 10,
		SpAmount : [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BS_WEAPONRESEARCH,10 ]
		]
	};

	exports[SKID.CR_SLIMPITCHER] = {
		Name: "CR_SLIMPITCHER",
		SkillName : "Slim Potion Pitcher",
		MaxLv : 10,
		SpAmount : [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.AM_POTIONPITCHER,5 ]
		]
	};

	exports[SKID.CR_FULLPROTECTION] = {
		Name: "CR_FULLPROTECTION",
		SkillName : "Full Chemical Protection",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AM_CP_WEAPON,5 ],
			[ SKID.AM_CP_ARMOR,5 ],
			[ SKID.AM_CP_SHIELD,5 ],
			[ SKID.AM_CP_HELM,5 ],
		]
	};

	exports[SKID.AL_DECAGI] = {
		Name: "AL_DECAGI",
		SkillName : "Decrease Agility",		
		MaxLv : 10,
		SpAmount : [ 15, 17, 19, 21, 23, 25, 27, 29, 31, 33 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.AL_INCAGI, 1 ]
		]
	};

	exports[SKID.PA_SHIELDCHAIN] = {
		Name: "PA_SHIELDCHAIN",
		SkillName : "Shield Chain",
		MaxLv : 5,
		SpAmount : [ 28, 31, 34, 37, 40 ],
		bSeperateLv : true,
		AttackRange : [ 4, 4, 4, 4, 4 ],
		_NeedSkillList : [
			[ SKID.CR_SHIELDBOOMERANG,5 ]
		]
	};

	exports[SKID.HP_MANARECHARGE] = {
		Name: "HP_MANARECHARGE",
		SkillName : "Mana Recharge",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.PR_MACEMASTERY,10 ],
			[ SKID.AL_DEMONBANE,10 ]
		]
	};

	exports[SKID.PF_DOUBLECASTING] = {
		Name: "PF_DOUBLECASTING",
		SkillName : "Double Casting",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SA_AUTOSPELL,1 ]
		]
	};

	exports[SKID.HW_GANBANTEIN] = {
		Name: "HW_GANBANTEIN",
		SkillName : "Ganbantein",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 18 ],
		_NeedSkillList : [
			[ SKID.WZ_ESTIMATION,1 ],
			[ SKID.WZ_ICEWALL,1 ]
		]
	};

	exports[SKID.HW_GRAVITATION] = {
		Name: "HW_GRAVITATION",
		SkillName : "Gravitation Field",
		MaxLv : 5,
		SpAmount : [ 20, 40, 60, 80, 100 ],
		bSeperateLv : true,
		AttackRange : [ 18, 18, 18, 18, 18 ],
		_NeedSkillList : [
			[ SKID.WZ_QUAGMIRE,1 ],
			[ SKID.HW_MAGICCRASHER,1 ],
			[ SKID.HW_MAGICPOWER,10 ]
		]
	};

	exports[SKID.WS_CARTTERMINATION] = {
		Name: "WS_CARTTERMINATION",
		SkillName : "Cart Termination",
		MaxLv : 10,
		SpAmount : [ 15, 15, 15, 15, 15, 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.MC_MAMMONITE,10 ],
			[ SKID.BS_HAMMERFALL,5 ],
			[ SKID.WS_CARTBOOST,1 ]
		]
	};

	exports[SKID.WS_OVERTHRUSTMAX] = {
		Name: "WS_OVERTHRUSTMAX",
		SkillName : "Maximum Over Thrust",
		MaxLv : 5,
		SpAmount : [ 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BS_OVERTHRUST,5 ]
		]
	};

	exports[SKID.CG_LONGINGFREEDOM] = {
		Name: "CG_LONGINGFREEDOM",
		SkillName : "Longing for Freedom",
		MaxLv : 5,
		SpAmount : [ 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		NeedSkillList : new function(){
			this[JOBID.JT_BARD_H] = [
				[ SKID.CG_MARIONETTE,1 ],
				[ SKID.BA_DISSONANCE,3 ],
				[ SKID.BA_MUSICALLESSON,10 ]
			];
			this[JOBID.JT_DANCER_H] = [
				[ SKID.CG_MARIONETTE,1 ],
				[ SKID.DC_UGLYDANCE,3 ],
				[ SKID.DC_DANCINGLESSON,10 ]
			]
		}
	};

	exports[SKID.CG_HERMODE] = {
		Name: "CG_HERMODE",
		SkillName : "Wand of Hermode",
		MaxLv : 5,
		SpAmount : [ 20, 30, 40, 50, 60 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		NeedSkillList : new function(){
			this[JOBID.JT_BARD_H] = [
				[ SKID.AC_CONCENTRATION,10 ],
				[ SKID.BA_MUSICALLESSON,10 ]
			];
			this[JOBID.JT_DANCER_H] = [
				[ SKID.AC_CONCENTRATION,10 ],
				[ SKID.DC_DANCINGLESSON,10 ]
			]
		}
	};

	exports[SKID.CG_TAROTCARD] = {
		Name: "CG_TAROTCARD",
		SkillName : "Tarot Card of Fate",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		NeedSkillList : new function(){
			this[JOBID.JT_BARD_H] = [
				[ SKID.AC_CONCENTRATION,10 ],
				[ SKID.BA_DISSONANCE,3 ]
			];
			this[JOBID.JT_DANCER_H] = [
				[ SKID.AC_CONCENTRATION,10 ],
				[ SKID.DC_UGLYDANCE,3 ]
			]
		}
	};

	exports[SKID.CR_ACIDDEMONSTRATION] = {
		Name: "CR_ACIDDEMONSTRATION",
		SkillName : "Acid Demonstration",
		MaxLv : 10,
		SpAmount : [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.AM_DEMONSTRATION,5 ],
			[ SKID.AM_ACIDTERROR,5 ]
		]
	};

	exports[SKID.CR_CULTIVATION] = {
		Name: "CR_CULTIVATION",
		SkillName : "Plant Cultivation",
		MaxLv : 2,
		SpAmount : [ 10, 10 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1 ]
	};

	exports[SKID.TK_MISSION] = {
		Name: "TK_MISSION",
		SkillName : "TaeKwon Mission",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.TK_POWER,5 ]
		]
	};

	exports[SKID.SL_HIGH] = {
		Name: "SL_HIGH",
		SkillName : "Rebirth Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SL_SUPERNOVICE,5 ]
		]
	};

	exports[SKID.KN_ONEHAND] = {
		Name: "KN_ONEHAND",
		SkillName : "One-Hand Quicken",
		MaxLv : 1,
		Type : "Soul",
		SpAmount : [ 100, 100, 100, 100, 100, 100, 100, 100, 100, 100 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.KN_TWOHANDQUICKEN,10 ]
		]
	};

	exports[SKID.AL_HOLYWATER] = {
		Name: "AL_HOLYWATER",
		SkillName : "Aqua Benedicta",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
	};

	exports[SKID.AM_TWILIGHT1] = {
		Name: "AM_TWILIGHT1",
		SkillName : "Twilight Alchemy",
		MaxLv : 1,
		Type : "Soul",
		SpAmount : [ 200 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.AM_PHARMACY,10 ]
		]
	};

	exports[SKID.AM_TWILIGHT2] = {
		Name: "AM_TWILIGHT2",
		SkillName : "Twilight Alchemy",
		MaxLv : 1,
		Type : "Soul",
		SpAmount : [ 200 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.AM_PHARMACY,10 ]
		]
	};

	exports[SKID.AM_TWILIGHT3] = {
		Name: "AM_TWILIGHT3",
		SkillName : "Twilight Alchemy",
		MaxLv : 1,
		Type : "Soul",
		SpAmount : [ 200 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.AM_PHARMACY,10 ]
		]
	};

	exports[SKID.HT_POWER] = {
		Name: "HT_POWER",
		SkillName : "Beast Strafing",
		MaxLv : 1,
		Type : "Soul",
		SpAmount : [ 12 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SKID.AC_DOUBLE,10 ]
		]
	};

	exports[SKID.GS_GLITTERING] = {
		Name: "GS_GLITTERING",
		SkillName : "Flip the Coin",
		MaxLv : 5,
		SpAmount : [ 2, 2, 2, 2, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
	};

	exports[SKID.RK_ENCHANTBLADE] = {
		Name: "RK_ENCHANTBLADE",
		SkillName : "Enchant Blade",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RK_RUNEMASTERY,2 ]
		]
	};

	exports[SKID.GS_FLING] = {
		Name: "GS_FLING",
		SkillName : "Fling",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SKID.GS_GLITTERING,1 ]
		]
	};

	exports[SKID.RK_WINDCUTTER] = {
		Name: "RK_WINDCUTTER",
		SkillName : "Wind Cutter",
		MaxLv : 5,
		SpAmount : [ 20, 24, 28, 32, 36 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RK_ENCHANTBLADE,5 ]
		]
	};

	exports[SKID.GS_TRIPLEACTION] = {
		Name: "GS_TRIPLEACTION",
		SkillName : "Triple Action",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SKID.GS_GLITTERING,1 ],
			[ SKID.GS_CHAINACTION,10 ]
		]
	};

	exports[SKID.RK_DRAGONHOWLING] = {
		Name: "RK_DRAGONHOWLING",
		SkillName : "Dragon Howling",
		MaxLv : 5,
		SpAmount : [ 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RK_DRAGONTRAINING,2 ]
		]
	};

	exports[SKID.GS_BULLSEYE] = {
		Name: "GS_BULLSEYE",
		SkillName : "Bull's Eye",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SKID.GS_GLITTERING,5 ],
			[ SKID.GS_TRACKING,10 ]
		]
	};

	exports[SKID.RK_REFRESH] = {
		Name: "RK_REFRESH",
		SkillName : "Refresh",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
	};

	exports[SKID.GS_MADNESSCANCEL] = {
		Name: "GS_MADNESSCANCEL",
		SkillName : "Madness Canceller",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.GS_GATLINGFEVER,10 ],
			[ SKID.GS_GLITTERING,4 ]
		]
	};

	exports[SKID.RK_STORMBLAST] = {
		Name: "RK_STORMBLAST",
		SkillName : "Storm Blast",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
	};

	exports[SKID.GS_ADJUSTMENT] = {
		Name: "GS_ADJUSTMENT",
		SkillName : "Adjustment",
		MaxLv : 1,
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.GS_GLITTERING,4 ],
			[ SKID.GS_DISARM,5 ]
		]
	};

	exports[SKID.GC_VENOMIMPRESS] = {
		Name: "GC_VENOMIMPRESS",
		SkillName : "Venom Impress",
		MaxLv : 5,
		SpAmount : [ 12, 16, 20, 24, 28 ],
		bSeperateLv : true,
		AttackRange : [ 10, 10, 10, 10, 10 ]
	};

	exports[SKID.GS_INCREASING] = {
		Name: "GS_INCREASING",
		SkillName : "Increasing Accuracy",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.GS_GLITTERING,2 ],
			[ SKID.GS_SNAKEEYE,10 ]
		]
	};

	exports[SKID.GC_CREATENEWPOISON] = {
		Name: "GC_CREATENEWPOISON",
		SkillName : "Create New Poison",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.GC_RESEARCHNEWPOISON,1 ]
		]
	};

	exports[SKID.GS_MAGICALBULLET] = {
		Name: "GS_MAGICALBULLET",
		SkillName : "Magical Bullet",
		MaxLv : 1,
		SpAmount : [ 7 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SKID.GS_GLITTERING,1 ]
		]
	};

	exports[SKID.GC_COUNTERSLASH] = {
		Name: "GC_COUNTERSLASH",
		SkillName : "Counter Slash",
		MaxLv : 5,
		SpAmount : [ 5, 8, 11, 14, 17 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.GC_WEAPONBLOCKING,1 ]
		]
	};

	exports[SKID.GS_CRACKER] = {
		Name: "GS_CRACKER",
		SkillName : "Cracker",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SKID.GS_GLITTERING,1 ]
		]
	};

	exports[SKID.GC_CLOAKINGEXCEED] = {
		Name: "GC_CLOAKINGEXCEED",
		SkillName : "Cloaking Exceed",
		MaxLv : 5,
		SpAmount : [ 45, 45, 45, 45, 45 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AS_CLOAKING,3 ]
		]
	};

	exports[SKID.GS_SINGLEACTION] = {
		Name: "GS_SINGLEACTION",
		SkillName : "Single Action",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	exports[SKID.GC_CROSSRIPPERSLASHER] = {
		Name: "GC_CROSSRIPPERSLASHER",
		SkillName : "Cross Ripper Slasher",
		MaxLv : 5,
		SpAmount : [ 20, 24, 28, 32, 36 ],
		bSeperateLv : true,
		AttackRange : [ 9, 10, 11, 12, 13 ],
		_NeedSkillList : [
			[ SKID.GC_ROLLINGCUTTER,1 ]
		]
	};

	exports[SKID.GS_SNAKEEYE] = {
		Name: "GS_SNAKEEYE",
		SkillName : "Snake's Eye",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	exports[SKID.AB_CLEMENTIA] = {
		Name: "AB_CLEMENTIA",
		SkillName : "Clementia",
		MaxLv : 3,
		SpAmount : [ 280, 320, 360 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AL_BLESSING,1 ]
		]
	};

	exports[SKID.SM_SWORD] = {
		Name: "SM_SWORD",
		SkillName : "Sword Mastery",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	exports[SKID.AL_CRUCIS] = {
		Name: "AL_CRUCIS",
		SkillName : "Signum Crucis",		
		MaxLv : 10,
		SpAmount : [ 35, 35, 35, 35, 35, 35, 35, 35, 35, 35 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AL_DEMONBANE,3 ]
		]
	};

	exports[SKID.GS_TRACKING] = {
		Name: "GS_TRACKING",
		SkillName : "Tracking",
		MaxLv : 10,
		SpAmount : [ 15, 20, 25, 30, 35, 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.GS_SINGLEACTION,5 ]
		]
	};

	exports[SKID.GS_DISARM] = {
		Name: "GS_DISARM",
		SkillName : "Disarm",
		MaxLv : 5,
		SpAmount : [ 15, 20, 25, 30, 35 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.GS_TRACKING,7 ]
		]
	};

	exports[SKID.GS_PIERCINGSHOT] = {
		Name: "GS_PIERCINGSHOT",
		SkillName : "Piercing Shot",
		MaxLv : 5,
		SpAmount : [ 11, 12, 13, 14, 15 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.GS_TRACKING,5 ]
		]
	};

	exports[SKID.GS_RAPIDSHOWER] = {
		Name: "GS_RAPIDSHOWER",
		SkillName : "Rapid Shower",
		MaxLv : 10,
		SpAmount : [ 22, 24, 26, 28, 30, 32, 34, 36, 38, 40 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.GS_CHAINACTION,3 ]
		]
	};

	exports[SKID.GS_DESPERADO] = {
		Name: "GS_DESPERADO",
		SkillName : "Desperado",
		MaxLv : 10,
		SpAmount : [ 32, 34, 36, 38, 40, 42, 44, 46, 48, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.GS_RAPIDSHOWER,5 ]
		]
	};

	exports[SKID.GS_GATLINGFEVER] = {
		Name: "GS_GATLINGFEVER",
		SkillName : "Gatling Fever",
		MaxLv : 10,
		SpAmount : [ 30, 32, 34, 36, 38, 40, 42, 44, 46, 48 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.GS_RAPIDSHOWER,7 ],
			[ SKID.GS_DESPERADO,5 ]
		]
	};

	exports[SKID.GS_DUST] = {
		Name: "GS_DUST",
		SkillName : "Dust",
		MaxLv : 10,
		SpAmount : [ 3, 6, 9, 12, 15, 18, 21, 24, 27, 30 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.GS_SINGLEACTION,5 ]
		]
	};

	exports[SKID.GS_FULLBUSTER] = {
		Name: "GS_FULLBUSTER",
		SkillName : "Full Buster",
		MaxLv : 10,
		SpAmount : [ 20, 25, 30, 35, 40, 45, 50, 55, 60, 65 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.GS_DUST,3 ]
		]
	};

	exports[SKID.GS_SPREADATTACK] = {
		Name: "GS_SPREADATTACK",
		SkillName : "Spread Attack",
		MaxLv : 10,
		SpAmount : [ 15, 20, 25, 30, 35, 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.GS_FULLBUSTER,5 ]
		]
	};

	exports[SKID.GS_GROUNDDRIFT] = {
		Name: "GS_GROUNDDRIFT",
		SkillName : "Ground Drift",
		MaxLv : 10,
		SpAmount : [ 4, 8, 12, 16, 20, 24, 28, 32, 36, 40 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.GS_SPREADATTACK,7 ],
			[ SKID.GS_FULLBUSTER,5 ]
		]
	};

	exports[SKID.NJ_TOBIDOUGU] = {
		Name: "NJ_TOBIDOUGU",
		SkillName : "Throwing Mastery",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	exports[SKID.NJ_SYURIKEN] = {
		Name: "NJ_SYURIKEN",
		SkillName : "Throw Shuriken",
		MaxLv : 10,
		SpAmount : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.NJ_TOBIDOUGU,1 ]
		]
	};

	exports[SKID.NJ_KUNAI] = {
		Name: "NJ_KUNAI",
		SkillName : "Throw Kunai",
		MaxLv : 5,
		SpAmount : [ 30, 25, 20, 15, 10 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.NJ_SYURIKEN,5 ]
		]
	};

	exports[SKID.NJ_HUUMA] = {
		Name: "NJ_HUUMA",
		SkillName : "Throw Fuuma Shuriken",
		MaxLv : 5,
		SpAmount : [ 20, 25, 30, 35, 40 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.NJ_TOBIDOUGU,5 ],
			[ SKID.NJ_KUNAI,5 ]
		]
	};

	exports[SKID.NJ_ZENYNAGE] = {
		Name: "NJ_ZENYNAGE",
		SkillName : "Throw Zeny",
		MaxLv : 10,
		SpAmount : [ 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7, 7, 7, 7, 7, 7 ],
		_NeedSkillList : [
			[ SKID.NJ_TOBIDOUGU,10 ],
			[ SKID.NJ_HUUMA,5 ]
		]
	};

	exports[SKID.AL_ANGELUS] = {
		Name: "AL_ANGELUS",
		SkillName : "Angelus",
		MaxLv : 10,
		SpAmount : [ 23,26, 29, 32, 35, 38, 41, 44, 47, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AL_DP,3 ]
		]
	};

	exports[SKID.NJ_KASUMIKIRI] = {
		Name: "NJ_KASUMIKIRI",
		SkillName : "Mist Slash",
		MaxLv : 10,
		SpAmount : [ 15, 15, 15, 15, 15, 15, 15, 15, 15, 15 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.NJ_SHADOWJUMP,1 ]
		]
	};

	exports[SKID.NJ_SHADOWJUMP] = {
		Name: "NJ_SHADOWJUMP",
		SkillName : "Shadow Jump",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 6, 8, 10, 12, 14 ],
		_NeedSkillList : [
			[ SKID.NJ_TATAMIGAESHI,1 ]
		]
	};

	exports[SKID.NJ_KIRIKAGE] = {
		Name: "NJ_KIRIKAGE",
		SkillName : "Shadow Slash",
		MaxLv : 5,
		SpAmount : [ 14, 16, 18, 20, 22 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.NJ_KASUMIKIRI,5 ]
		]
	};

	exports[SKID.NJ_UTSUSEMI] = {
		Name: "NJ_UTSUSEMI",
		SkillName : "Cast-off Ciceda Shell",
		MaxLv : 5,
		SpAmount : [ 12, 15, 18, 21, 24 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.NJ_SHADOWJUMP,5 ]
		]
	};

	exports[SKID.NJ_BUNSINJYUTSU] = {
		Name: "NJ_BUNSINJYUTSU",
		SkillName : "Illusionary Shadow",
		MaxLv : 10,
		SpAmount : [ 30, 32, 34, 36, 38, 40, 42, 44, 46, 48 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.NJ_NEN,1 ],
			[ SKID.NJ_UTSUSEMI,4 ],
			[ SKID.NJ_KIRIKAGE,3 ]
		]
	};

	exports[SKID.NJ_NINPOU] = {
		Name: "NJ_NINPOU",
		SkillName : "Ninpou Training",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	exports[SKID.NJ_KOUENKA] = {
		Name: "NJ_KOUENKA",
		SkillName : "Crimson Fire Blossom",
		MaxLv : 10,
		SpAmount : [ 18, 20, 22, 24, 26, 28, 30, 32, 34, 36 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.NJ_NINPOU,1 ]
		]
	};

	exports[SKID.NJ_KAENSIN] = {
		Name: "NJ_KAENSIN",
		SkillName : "Crimson Fire Formation",
		MaxLv : 10,
		SpAmount : [ 25, 25, 25, 25, 25, 25, 25, 25, 25, 25 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.NJ_KOUENKA,5 ]
		]
	};

	exports[SKID.NJ_BAKUENRYU] = {
		Name: "NJ_BAKUENRYU",
		SkillName : "Dragon Fire Formation",
		MaxLv : 5,
		SpAmount : [ 20, 25, 30, 35, 40 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.NJ_NINPOU,10 ],
			[ SKID.NJ_KAENSIN,7 ]
		]
	};

	exports[SKID.NJ_HYOUSENSOU] = {
		Name: "NJ_HYOUSENSOU",
		SkillName : "Lightning Spear of Ice",
		MaxLv : 10,
		SpAmount : [ 15, 18, 21, 24, 27, 30, 33, 36, 39, 42 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.NJ_NINPOU,1 ]
		]
	};

	exports[SKID.NJ_SUITON] = {
		Name: "NJ_SUITON",
		SkillName : "Water Escape Technique",
		MaxLv : 10,
		SpAmount : [ 15, 18, 21, 24, 27, 30, 33, 36, 39, 42 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.NJ_HYOUSENSOU,5 ]
		]
	};

	exports[SKID.NJ_HYOUSYOURAKU] = {
		Name: "NJ_HYOUSYOURAKU",
		SkillName : "Falling Ice Pillar",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.NJ_NINPOU,10 ],
			[ SKID.NJ_SUITON,7 ]
		]
	};

	exports[SKID.NJ_HUUJIN] = {
		Name: "NJ_HUUJIN",
		SkillName : "Wind Blade",
		MaxLv : 10,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.NJ_NINPOU,1 ]
		]
	};

	exports[SKID.NJ_RAIGEKISAI] = {
		Name: "NJ_RAIGEKISAI",
		SkillName : "Lightning Crash",
		MaxLv : 5,
		SpAmount : [ 16, 20, 24, 28, 32 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.NJ_HUUJIN,5 ]
		]
	};

	exports[SKID.NJ_KAMAITACHI] = {
		Name: "NJ_KAMAITACHI",
		SkillName : "North Wind",
		MaxLv : 5,
		SpAmount : [ 24, 28, 32, 36, 40 ],
		bSeperateLv : true,
		AttackRange : [ 5, 6, 7, 8, 9 ],
		_NeedSkillList : [
			[ SKID.NJ_NINPOU,10 ],
			[ SKID.NJ_RAIGEKISAI,5 ]
		]
	};

	exports[SKID.AL_BLESSING] = {
		Name: "AL_BLESSING",
		SkillName : "Blessing",		
		MaxLv : 10,
		SpAmount : [ 28, 32, 36, 40, 44, 48, 52, 56, 60, 64 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.AL_DP,5 ]
		]
	};

	exports[SKID.NJ_ISSEN] = {
		Name: "NJ_ISSEN",
		SkillName : "Final Strike",
		MaxLv : 10,
		SpAmount : [ 55, 60, 65, 70, 75, 80, 85, 90, 95, 100 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SKID.NJ_TOBIDOUGU,7 ],
			[ SKID.NJ_NEN,1 ],
			[ SKID.NJ_KIRIKAGE,5 ]
		]
	};

	exports[SKID.MB_FIGHTING] = {
		Name: "MB_FIGHTING",
		SkillName : "Munak Fighting",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MB_NEUTRAL] = {
		Name: "MB_NEUTRAL",
		SkillName : "Bongun Neutral",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MB_TAIMING_PUTI] = {
		Name: "MB_TAIMING_PUTI",
		SkillName : "Pet Friend",
		MaxLv : 7,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MB_WHITEPOTION] = {
		Name: "MB_WHITEPOTION",
		SkillName : "Ordering White Potion",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.MB_MENTAL] = {
		Name: "MB_MENTAL",
		SkillName : "Ordering Mental",
		MaxLv : 1,
		SpAmount : [ 60 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.MB_CARDPITCHER] = {
		Name: "MB_CARDPITCHER",
		SkillName : "Card Pitcher",
		MaxLv : 10,
		SpAmount : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.MB_PETPITCHER] = {
		Name: "MB_PETPITCHER",
		SkillName : "Pet Pitcher",
		MaxLv : 10,
		SpAmount : [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MB_BODYSTUDY] = {
		Name: "MB_BODYSTUDY",
		SkillName : "Body Studying",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MB_BODYALTER] = {
		Name: "MB_BODYALTER",
		SkillName : "Body Altering",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.MB_PETMEMORY] = {
		Name: "MB_PETMEMORY",
		SkillName : "Pet Memory",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.MB_M_TELEPORT] = {
		Name: "MB_M_TELEPORT",
		SkillName : "Munak Teleport",
		MaxLv : 5,
		SpAmount : [ 50, 40, 30, 20, 10 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.MB_B_GAIN] = {
		Name: "MB_B_GAIN",
		SkillName : "Bongun Gain",
		MaxLv : 7,
		SpAmount : [ 12, 15, 18, 21, 24, 27, 30 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.MB_M_GAIN] = {
		Name: "MB_M_GAIN",
		SkillName : "Munak Gain",
		MaxLv : 7,
		SpAmount : [ 1, 1, 1, 1, 1, 1, 1 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.MB_MISSION] = {
		Name: "MB_MISSION",
		SkillName : "Taming Mission",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.AL_CURE] = {
		Name: "AL_CURE",
		SkillName : "Cure",
		MaxLv : 1,
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SKID.AL_HEAL,2 ]
		],
		NeedSkillList : new function(){
			this[JOBID.JT_CRUSADER] = [
				[ SKID.CR_TRUST,5 ]
			]
		}
	};

	exports[SKID.MB_MUNAKBALL] = {
		Name: "MB_MUNAKBALL",
		SkillName : "Munak Ball",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.MB_SCROLL] = {
		Name: "MB_SCROLL",
		SkillName : "Bongun Scroll",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MB_B_GATHERING] = {
		Name: "MB_B_GATHERING",
		SkillName : "Bongun Gathering",
		MaxLv : 7,
		SpAmount : [ 17, 15, 13, 11, 9, 7, 5 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MB_M_GATHERING] = {
		Name: "MB_M_GATHERING",
		SkillName : "Munak Gathering",
		MaxLv : 7,
		SpAmount : [ 32, 30, 28, 26, 24, 22, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MB_B_EXCLUDE] = {
		Name: "MB_B_EXCLUDE",
		SkillName : "Bongun Exclude",
		MaxLv : 5,
		SpAmount : [ 180, 160, 140, 120, 100 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.MB_B_DRIFT] = {
		Name: "MB_B_DRIFT",
		SkillName : "Bongun Drift",
		MaxLv : 5,
		SpAmount : [ 50, 40, 30, 20, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MB_B_WALLRUSH] = {
		Name: "MB_B_WALLRUSH",
		SkillName : "Bongun Wall Rush",
		MaxLv : 7,
		SpAmount : [ 9, 10, 11, 12, 13, 14, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MB_M_WALLRUSH] = {
		Name: "MB_M_WALLRUSH",
		SkillName : "Munak Wall Rush",
		MaxLv : 7,
		SpAmount : [ 9, 10, 11, 12, 13, 14, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MB_B_WALLSHIFT] = {
		Name: "MB_B_WALLSHIFT",
		SkillName : "Bongun Wall Shift",
		MaxLv : 5,
		SpAmount : [ 13, 11, 9, 7, 5 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MB_M_WALLCRASH] = {
		Name: "MB_M_WALLCRASH",
		SkillName : "Munak Wall Crash",
		MaxLv : 7,
		SpAmount : [ 27, 25, 23, 21, 19, 17, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MB_M_REINCARNATION] = {
		Name: "MB_M_REINCARNATION",
		SkillName : "Munak Reincarnation",
		MaxLv : 5,
		SpAmount : [ 50, 50, 50, 50, 50 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MB_B_EQUIP] = {
		Name: "MB_B_EQUIP",
		SkillName : "Bongun Almighty",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.SL_DEATHKNIGHT] = {
		Name: "SL_DEATHKNIGHT",
		SkillName : "Death Knight Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.SL_COLLECTOR] = {
		Name: "SL_COLLECTOR",
		SkillName : "Dark Collector Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.SL_NINJA] = {
		Name: "SL_NINJA",
		SkillName : "Ninja Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.MC_INCCARRY] = {
		Name: "MC_INCCARRY",
		SkillName : "Enlarge Weight Limit",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.AM_TWILIGHT4] = {
		Name: "AM_TWILIGHT4",
		SkillName : "Twilight Alchemy",
		MaxLv : 1,
		SpAmount : [ 200 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.DE_BERSERKAIZER] = {
		Name: "DE_BERSERKAIZER",
		SkillName : "Berserk Kaizer",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.DA_DARKPOWER] = {
		Name: "DA_DARKPOWER",
		SkillName : "Dark Soul Power",
		MaxLv : 1,
		SpAmount : [ 50 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.DE_PASSIVE] = {
		Name: "DE_PASSIVE",
		SkillName : "Death Passive",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.DE_PATTACK] = {
		Name: "DE_PATTACK",
		SkillName : "Death Passive Attack",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DE_PSPEED] = {
		Name: "DE_PSPEED",
		SkillName : "Death Passive Speed",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DE_PDEFENSE] = {
		Name: "DE_PDEFENSE",
		SkillName : "Death Passive Defense",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DE_PCRITICAL] = {
		Name: "DE_PCRITICAL",
		SkillName : "Death Passive Critical",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DE_PHP] = {
		Name: "DE_PHP",
		SkillName : "Death Passive HP",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DE_PSP] = {
		Name: "DE_PSP",
		SkillName : "Death Passive SP",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DE_RESET] = {
		Name: "DE_RESET",
		SkillName : "Death Optimize",
		MaxLv : 1,
		SpAmount : [ 280 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.DE_RANKING] = {
		Name: "DE_RANKING",
		SkillName : "Death Ranking",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.DE_PTRIPLE] = {
		Name: "DE_PTRIPLE",
		SkillName : "Death Passive Triple",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.DE_ENERGY] = {
		Name: "DE_ENERGY",
		SkillName : "Death Energy",
		MaxLv : 5,
		SpAmount : [ 1, 1, 1, 1, 1 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MC_DISCOUNT] = {
		Name: "MC_DISCOUNT",
		SkillName : "Discount",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.MC_INCCARRY,3 ]
		]
	};

	exports[SKID.DE_SLASH] = {
		Name: "DE_SLASH",
		SkillName : "Death Slash",
		MaxLv : 5,
		SpAmount : [ 10, 8, 6, 4, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DE_COIL] = {
		Name: "DE_COIL",
		SkillName : "Death Coil",
		MaxLv : 7,
		SpAmount : [ 8, 10, 12, 14, 16, 18, 20 ],
		bSeperateLv : false,
		AttackRange : [ 7, 7, 7, 7, 7, 7, 7 ]
	};

	exports[SKID.DE_WAVE] = {
		Name: "DE_WAVE",
		SkillName : "Death Wave",
		MaxLv : 7,
		SpAmount : [ 55, 50, 45, 40, 35, 30, 25 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DE_REBIRTH] = {
		Name: "DE_REBIRTH",
		SkillName : "Death Reverse Energy",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	exports[SKID.DE_AURA] = {
		Name: "DE_AURA",
		SkillName : "Death Aura",
		MaxLv : 7,
		SpAmount : [ 80, 75, 70, 65, 60, 55, 50 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DE_FREEZER] = {
		Name: "DE_FREEZER",
		SkillName : "Death Freezer",
		MaxLv : 7,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 7, 7, 7, 7, 7, 7, 7 ]
	};

	exports[SKID.DE_CHANGEATTACK] = {
		Name: "DE_CHANGEATTACK",
		SkillName : "Death Change Attack",
		MaxLv : 7,
		SpAmount : [ 80, 70, 60, 50, 40, 30, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DE_PUNISH] = {
		Name: "DE_PUNISH",
		SkillName : "Death Punish",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DE_POISON] = {
		Name: "DE_POISON",
		SkillName : "Death Poison Slash",
		MaxLv : 7,
		SpAmount : [ 14, 12, 10, 8, 6, 4, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DE_INSTANT] = {
		Name: "DE_INSTANT",
		SkillName : "Death Instant Barrier",
		MaxLv : 7,
		SpAmount : [ 50, 100, 150, 200, 250, 300, 350 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DE_WARNING] = {
		Name: "DE_WARNING",
		SkillName : "Death Warning",
		MaxLv : 7,
		SpAmount : [ 50, 50, 50, 50, 50, 50, 50 ],
		bSeperateLv : false,
		AttackRange : [ 7, 7, 7, 7, 7, 7, 7 ]
	};

	exports[SKID.DE_RANKEDKNIFE] = {
		Name: "DE_RANKEDKNIFE",
		SkillName : "Death Knife",
		MaxLv : 7,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 7, 7, 7, 7, 7, 7, 7 ]
	};

	exports[SKID.DE_RANKEDGRADIUS] = {
		Name: "DE_RANKEDGRADIUS",
		SkillName : "Death Gradius",
		MaxLv : 7,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DE_GAUGE] = {
		Name: "DE_GAUGE",
		SkillName : "Mighty Gauge",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.DE_GTIME] = {
		Name: "DE_GTIME",
		SkillName : "Mighty Time Charge",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MC_OVERCHARGE] = {
		Name: "MC_OVERCHARGE",
		SkillName : "Overcharge",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.MC_DISCOUNT,3 ]
		]
	};

	exports[SKID.DE_GSKILL] = {
		Name: "DE_GSKILL",
		SkillName : "Mighty Skill Charge",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DE_GKILL] = {
		Name: "DE_GKILL",
		SkillName : "Mighty Kill Charge",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DE_ACCEL] = {
		Name: "DE_ACCEL",
		SkillName : "Dead Acceleration",
		MaxLv : 5,
		SpAmount : [ 50, 40, 30, 20, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DE_BLOCKDOUBLE] = {
		Name: "DE_BLOCKDOUBLE",
		SkillName : "Dead Double Blocking",
		MaxLv : 3,
		SpAmount : [ 40, 30, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	exports[SKID.DE_BLOCKMELEE] = {
		Name: "DE_BLOCKMELEE",
		SkillName : "Dead Near(Melee) Blocking",
		MaxLv : 3,
		SpAmount : [ 40, 30, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	exports[SKID.DE_BLOCKFAR] = {
		Name: "DE_BLOCKFAR",
		SkillName : "Dead Distance(Range) Blocking",
		MaxLv : 3,
		SpAmount : [ 100, 75, 50 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	exports[SKID.DE_FRONTATTACK] = {
		Name: "DE_FRONTATTACK",
		SkillName : "Dead Rush Attack",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	exports[SKID.DE_DANGERATTACK] = {
		Name: "DE_DANGERATTACK",
		SkillName : "Dead Dangerous Attack",
		MaxLv : 10,
		SpAmount : [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	exports[SKID.DE_TWINATTACK] = {
		Name: "DE_TWINATTACK",
		SkillName : "Dead Twin Attack",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	exports[SKID.DE_WINDATTACK] = {
		Name: "DE_WINDATTACK",
		SkillName : "Dead Storm Attack",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 50, 50, 50, 50, 50 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	exports[SKID.DE_WATERATTACK] = {
		Name: "DE_WATERATTACK",
		SkillName : "Dead Water Attack",
		MaxLv : 10,
		SpAmount : [ 40, 40, 40, 40, 40, 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	exports[SKID.DA_ENERGY] = {
		Name: "DA_ENERGY",
		SkillName : "Dark Energy",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DA_CLOUD] = {
		Name: "DA_CLOUD",
		SkillName : "Dark Cloud",
		MaxLv : 10,
		SpAmount : [ 40, 40, 40, 40, 40, 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	exports[SKID.DA_FIRSTSLOT] = {
		Name: "DA_FIRSTSLOT",
		SkillName : "Dark First Fantasy",
		MaxLv : 5,
		SpAmount : [ 100, 90, 80, 70, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.DA_HEADDEF] = {
		Name: "DA_HEADDEF",
		SkillName : "Dark Head Defense",
		MaxLv : 4,
		SpAmount : [ 60, 60, 60, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9 ]
	};

	exports[SKID.MC_PUSHCART] = {
		Name: "MC_PUSHCART",
		SkillName : "Pushcart",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.MC_INCCARRY,5 ]
		]
	};

	exports[SKID.DA_TRANSFORM] = {
		Name: "DA_TRANSFORM",
		SkillName : "Dark Transform",
		MaxLv : 5,
		SpAmount : [ 180, 150, 120, 90, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.DA_EXPLOSION] = {
		Name: "DA_EXPLOSION",
		SkillName : "Dark Explosion",
		MaxLv : 5,
		SpAmount : [ 140, 120, 100, 80, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.DA_REWARD] = {
		Name: "DA_REWARD",
		SkillName : "Dark Reward",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.DA_CRUSH] = {
		Name: "DA_CRUSH",
		SkillName : "Dark Crush",
		MaxLv : 5,
		SpAmount : [ 130, 110, 90, 70, 50 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.DA_ITEMREBUILD] = {
		Name: "DA_ITEMREBUILD",
		SkillName : "Dark Item Rebuild",
		MaxLv : 5,
		SpAmount : [ 50, 40, 30, 20, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DA_ILLUSION] = {
		Name: "DA_ILLUSION",
		SkillName : "Dark Illusion",
		MaxLv : 5,
		SpAmount : [ 120, 100, 80, 60, 40 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.DA_NUETRALIZE] = {
		Name: "DA_NUETRALIZE",
		SkillName : "Dark Nuetralize",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DA_RUNNER] = {
		Name: "DA_RUNNER",
		SkillName : "Dark Runner",
		MaxLv : 5,
		SpAmount : [ 50, 40, 30, 20, 10 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ]
	};

	exports[SKID.DA_TRANSFER] = {
		Name: "DA_TRANSFER",
		SkillName : "Dark Transfer",
		MaxLv : 5,
		SpAmount : [ 70, 60, 50, 40, 30 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ]
	};

	exports[SKID.DA_WALL] = {
		Name: "DA_WALL",
		SkillName : "Dark Wall",
		MaxLv : 5,
		SpAmount : [ 10, 20, 30, 40, 50 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.RETURN_TO_ELDICASTES] = {
		Name: "RETURN_TO_ELDICASTES",
		SkillName : "Return to Eldicastes",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.DA_REVENGE] = {
		Name: "DA_REVENGE",
		SkillName : "Dark Revenge",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.DA_EARPLUG] = {
		Name: "DA_EARPLUG",
		SkillName : "Dark Ear Plug",
		MaxLv : 5,
		SpAmount : [ 60, 60, 60, 60, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.DA_CONTRACT] = {
		Name: "DA_CONTRACT",
		SkillName : "Black Gemstone Contract",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.DA_BLACK] = {
		Name: "DA_BLACK",
		SkillName : "Black Gemstone Magic",
		MaxLv : 5,
		SpAmount : [ 60, 60, 60, 60, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.MC_IDENTIFY] = {
		Name: "MC_IDENTIFY",
		SkillName : "Identify",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.DA_MAGICCART] = {
		Name: "DA_MAGICCART",
		SkillName : "Collector Magic Cart",
		MaxLv : 5,
		SpAmount : [ 50, 40, 30, 20, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DA_COPY] = {
		Name: "DA_COPY",
		SkillName : "Collector Copy",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.DA_CRYSTAL] = {
		Name: "DA_CRYSTAL",
		SkillName : "Collector Crystal",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.DA_EXP] = {
		Name: "DA_EXP",
		SkillName : "Collector Experience",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.DA_CARTSWING] = {
		Name: "DA_CARTSWING",
		SkillName : "Collector Magical Cart Swing",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DA_REBUILD] = {
		Name: "DA_REBUILD",
		SkillName : "Collector Human Rebuild",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.DA_JOBCHANGE] = {
		Name: "DA_JOBCHANGE",
		SkillName : "Collector Novice Job Change",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DA_EDARKNESS] = {
		Name: "DA_EDARKNESS",
		SkillName : "Collector Emperium Darkness",
		MaxLv : 5,
		SpAmount : [ 1100, 900, 700, 500, 300 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.DA_EGUARDIAN] = {
		Name: "DA_EGUARDIAN",
		SkillName : "Collector Emperium Guardian",
		MaxLv : 5,
		SpAmount : [ 1300, 1100, 900, 700, 500 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DA_TIMEOUT] = {
		Name: "DA_TIMEOUT",
		SkillName : "Collector Time Out",
		MaxLv : 3,
		SpAmount : [ 500, 300, 100 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9 ]
	};

	exports[SKID.ALL_TIMEIN] = {
		Name: "ALL_TIMEIN",
		SkillName : "Time In",
		MaxLv : 1,
		SpAmount : [ 100 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.DA_ZENYRANK] = {
		Name: "DA_ZENYRANK",
		SkillName : "Collector Ranking",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.DA_ACCESSORYMIX] = {
		Name: "DA_ACCESSORYMIX",
		SkillName : "Collector  Mix",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.NPC_EARTHQUAKE] = {
		Name: "NPC_EARTHQUAKE",
		SkillName : "Earth Quake",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	exports[SKID.EL_CIRCLE_OF_FIRE] = {
		Name: "EL_CIRCLE_OF_FIRE",
		SkillName : "Circle of Fire",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.MC_VENDING] = {
		Name: "MC_VENDING",
		SkillName : "Vending",
		MaxLv : 10,
		SpAmount : [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.MC_PUSHCART,3 ]
		]
	};

	exports[SKID.EL_TIDAL_WEAPON] = {
		Name: "EL_TIDAL_WEAPON",
		SkillName : "Tidal Weapon",
		MaxLv : 1,
		SpAmount : [ 80 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.NPC_DRAGONFEAR] = {
		Name: "NPC_DRAGONFEAR",
		SkillName : "Dragon Fear",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 6, 6, 6, 6, 6 ]
	};

	exports[SKID.NPC_PULSESTRIKE] = {
		Name: "NPC_PULSESTRIKE",
		SkillName : "Pulse Strike",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.NPC_HELLJUDGEMENT] = {
		Name: "NPC_HELLJUDGEMENT",
		SkillName : "Hell Judgement",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	exports[SKID.NPC_WIDESILENCE] = {
		Name: "NPC_WIDESILENCE",
		SkillName : "Wide Silence",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.NPC_WIDEFREEZE] = {
		Name: "NPC_WIDEFREEZE",
		SkillName : "Wide Freeze",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.NPC_WIDEBLEEDING] = {
		Name: "NPC_WIDEBLEEDING",
		SkillName : "Wide Bleeding",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.NPC_WIDESTONE] = {
		Name: "NPC_WIDESTONE",
		SkillName : "Wide Stone",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.NPC_WIDECONFUSE] = {
		Name: "NPC_WIDECONFUSE",
		SkillName : "Wide Confuse",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.NPC_WIDESLEEP] = {
		Name: "NPC_WIDESLEEP",
		SkillName : "Wide Sleep",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.NPC_EVILLAND] = {
		Name: "NPC_EVILLAND",
		SkillName : "Evil Land",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 7, 7, 7, 7, 7, 7, 7, 7, 7, 7 ]
	};

	exports[SKID.MC_MAMMONITE] = {
		Name: "MC_MAMMONITE",
		SkillName : "Mammonite",
		MaxLv : 10,
		SpAmount : [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.NPC_SLOWCAST] = {
		Name: "NPC_SLOWCAST",
		SkillName : "Slow Cast",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.NPC_CRITICALWOUND] = {
		Name: "NPC_CRITICALWOUND",
		SkillName : "Critical Wound",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 7, 7, 7, 7, 7 ]
	};

	exports[SKID.NPC_STONESKIN] = {
		Name: "NPC_STONESKIN",
		SkillName : "Stone Skin",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.NPC_ANTIMAGIC] = {
		Name: "NPC_ANTIMAGIC",
		SkillName : "Anti Magic",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.NPC_WIDECURSE] = {
		Name: "NPC_WIDECURSE",
		SkillName : "Wide Curse",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.NPC_WIDESTUN] = {
		Name: "NPC_WIDESTUN",
		SkillName : "Wide Stun",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.NPC_VAMPIRE_GIFT] = {
		Name: "NPC_VAMPIRE_GIFT",
		SkillName : "Vampire Gift",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.NPC_WIDESOULDRAIN] = {
		Name: "NPC_WIDESOULDRAIN",
		SkillName : "Wide Soul Drain",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.ALL_INCCARRY] = {
		Name: "ALL_INCCARRY",
		SkillName : "Enlarge Weight Limit R",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.NPC_HELLPOWER] = {
		Name: "NPC_HELLPOWER",
		SkillName : "Hell Power",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 7 ]
	};

	exports[SKID.AC_OWL] = {
		Name: "AC_OWL",
		SkillName : "Owl's Eye",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.GM_SANDMAN] = {
		Name: "GM_SANDMAN",
		SkillName : "Goodnight, Sweetie",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.ALL_CATCRY] = {
		Name: "ALL_CATCRY",
		SkillName : "Crying Monster",
		MaxLv : 1,
		SpAmount : [ 50 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.ALL_PARTYFLEE] = {
		Name: "ALL_PARTYFLEE",
		SkillName : "Blow! Flower Wind",
		MaxLv : 10,
		SpAmount : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.ALL_ANGEL_PROTECT] = {
		Name: "ALL_ANGEL_PROTECT",
		SkillName : "Thank You",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 6 ]
	};

	exports[SKID.ALL_DREAM_SUMMERNIGHT] = {
		Name: "ALL_DREAM_SUMMERNIGHT",
		SkillName : "A Dream Of Summer Night",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.ALL_REVERSEORCISH] = {
		Name: "ALL_REVERSEORCISH",
		SkillName : "Reverse Orcish",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.ALL_WEWISH] = {
		Name: "ALL_WEWISH",
		SkillName : "We Wish",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.AC_VULTURE] = {
		Name: "AC_VULTURE",
		SkillName : "Vulture's Eye",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AC_OWL,3 ]
		],
		NeedSkillList : new function(){
			this[JOBID.JT_ROGUE] = [
			
			]
		}
	};

	exports[SKID.AC_CONCENTRATION] = {
		Name: "AC_CONCENTRATION",
		SkillName : "Attention Concentrate",
		MaxLv : 10,
		SpAmount : [ 25, 30, 35, 40, 45, 50, 55, 60, 65, 70 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AC_VULTURE,1 ]
		]
	};

	exports[SKID.AC_DOUBLE] = {
		Name: "AC_DOUBLE",
		SkillName : "Double Strafing",
		MaxLv : 10,
		SpAmount : [ 12, 12, 12, 12, 12, 12, 12, 12, 12, 12 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		NeedSkillList : new function(){
			this[JOBID.JT_ROGUE] = [
				[ SKID.AC_VULTURE,10 ]
			]
		}
	};

	exports[SKID.HLIF_HEAL] = {
		Name: "HLIF_HEAL",
		SkillName : "Touch of Heal",
		MaxLv : 5,
		SpAmount : [ 13, 16, 19, 22, 25 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.HFLI_MOON] = {
		Name: "HFLI_MOON",
		SkillName : "Moonlight",
		MaxLv : 5,
		SpAmount : [ 4, 8, 12, 16, 20 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MH_XENO_SLASHER] = {
		Name: "MH_XENO_SLASHER",
		SkillName : "Xeno Slasher",
		MaxLv : 5,
		SpAmount : [ 90, 100, 110, 120, 130 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ]
	};

	exports[SKID.MH_STEINWAND] = {
		Name: "MH_STEINWAND",
		SkillName : "Stone Wall",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MH_LAVA_SLIDE] = {
		Name: "MH_LAVA_SLIDE",
		SkillName : "Lava Slide",
		MaxLv : 5,
		SpAmount : [ 30, 35, 40, 45, 50 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ]
	};

	exports[SKID.AC_SHOWER] = {
		Name: "AC_SHOWER",
		SkillName : "Arrow Shower",
		MaxLv : 10,
		SpAmount : [ 15, 15, 15, 15, 15, 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.AC_DOUBLE,5 ]
		]
	};

	exports[SKID.GD_KAFRACONTRACT] = {
		Name: "GD_KAFRACONTRACT",
		SkillName : "Kafra Contract",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.SM_TWOHAND] = {
		Name: "SM_TWOHAND",
		SkillName : "Two-Handed Sword Mastery",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SM_SWORD,1 ]
		]
	};

	exports[SKID.TF_DOUBLE] = {
		Name: "TF_DOUBLE",
		SkillName : "Double Attack",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MA_LANDMINE] = {
		Name: "MA_LANDMINE",
		SkillName : "Land Mine",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ]
	};

	exports[SKID.MER_REGAIN] = {
		Name: "MER_REGAIN",
		SkillName : "Regain",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.EL_FIRE_CLOAK] = {
		Name: "EL_FIRE_CLOAK",
		SkillName : "Fire Cloak",
		MaxLv : 1,
		SpAmount : [ 60 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.TF_MISS] = {
		Name: "TF_MISS",
		SkillName : "Increase Dodge",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.EL_WIND_SLASH] = {
		Name: "EL_WIND_SLASH",
		SkillName : "Wind Slash",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 11 ]
	};

	exports[SKID.TF_STEAL] = {
		Name: "TF_STEAL",
		SkillName : "Steal",
		MaxLv : 10,
		SpAmount : [ 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.TF_HIDING] = {
		Name: "TF_HIDING",
		SkillName : "Hiding",
		MaxLv : 10,
		SpAmount : [ 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.TF_STEAL,5 ]
		]
	};

	exports[SKID.TF_POISON] = {
		Name: "TF_POISON",
		SkillName : "Envenom",
		MaxLv : 10,
		SpAmount : [ 12, 12, 12, 12, 12, 12, 12, 12, 12, 12 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ]
	};

	exports[SKID.TF_DETOXIFY] = {
		Name: "TF_DETOXIFY",
		SkillName : "Detoxify",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SKID.TF_POISON,3 ]
		]
	};

	exports[SKID.ALL_RESURRECTION] = {
		Name: "ALL_RESURRECTION",
		SkillName : "Resurrection",
		MaxLv : 4,
		SpAmount : [ 60, 60, 60, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_SRECOVERY,4 ],
			[ SKID.PR_STRECOVERY,1 ]
		]
	};

	exports[SKID.KN_SPEARMASTERY] = {
		Name: "KN_SPEARMASTERY",
		SkillName : "Spear Mastery",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	exports[SKID.GD_GUARDRESEARCH] = {
		Name: "GD_GUARDRESEARCH",
		SkillName : "Guardian Research",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.KN_PIERCE] = {
		Name: "KN_PIERCE",
		SkillName : "Pierce",
		MaxLv : 10,
		SpAmount : [ 7, 7, 7, 7, 7, 7, 7, 7, 7, 7 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.KN_SPEARMASTERY,1 ]
		]
	};

	exports[SKID.MA_SANDMAN] = {
		Name: "MA_SANDMAN",
		SkillName : "Sandman",
		MaxLv : 5,
		SpAmount : [ 12, 12, 12, 12, 12 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ]
	};

	exports[SKID.MER_TENDER] = {
		Name: "MER_TENDER",
		SkillName : "Tender",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.EL_FIRE_MANTLE] = {
		Name: "EL_FIRE_MANTLE",
		SkillName : "Fire Mantle",
		MaxLv : 1,
		SpAmount : [ 80 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.KN_BRANDISHSPEAR] = {
		Name: "KN_BRANDISHSPEAR",
		SkillName : "Brandish Spear",
		MaxLv : 10,
		SpAmount : [ 12, 12, 12, 12, 12, 12, 12, 12, 12, 12 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.KN_RIDING,1 ],
			[ SKID.KN_SPEARSTAB,3 ]
		]
	};

	exports[SKID.EL_HURRICANE] = {
		Name: "EL_HURRICANE",
		SkillName : "Hurricane",
		MaxLv : 1,
		SpAmount : [ 60 ],
		bSeperateLv : false,
		AttackRange : [ 11 ]
	};
	
	exports[SKID.KN_SPEARSTAB] = {
		Name: "KN_SPEARSTAB",
		SkillName : "Spear Stab",
		MaxLv : 10,
		SpAmount : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		bSeperateLv : true,
		AttackRange : [ 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ],
		_NeedSkillList : [
			[ SKID.KN_PIERCE,5 ]
		]
	};

	exports[SKID.KN_SPEARBOOMERANG] = {
		Name: "KN_SPEARBOOMERANG",
		SkillName : "Spear Boomerang",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 3, 5, 7, 9, 11 ],
		_NeedSkillList : [
			[ SKID.KN_PIERCE,3 ]
		]
	};

	exports[SKID.KN_TWOHANDQUICKEN] = {
		Name: "KN_TWOHANDQUICKEN",
		SkillName : "Two-Hand Quicken",
		MaxLv : 10,
		SpAmount : [ 14, 18, 22, 26, 30, 34, 38, 42, 46, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SM_TWOHAND,1 ]
		]
	};

	exports[SKID.KN_AUTOCOUNTER] = {
		Name: "KN_AUTOCOUNTER",
		SkillName : "Auto Counter",
		MaxLv : 5,
		SpAmount : [ 3, 3, 3, 3, 3 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SM_TWOHAND,1 ]
		]
	};

	exports[SKID.KN_BOWLINGBASH] = {
		Name: "KN_BOWLINGBASH",
		SkillName : "Bowling Bash",
		MaxLv : 10,
		SpAmount : [ 13, 14, 15, 16, 17, 18, 19, 20, 21, 22 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.SM_BASH,10 ],
			[ SKID.SM_MAGNUM,3 ],
			[ SKID.SM_TWOHAND,5 ],
			[ SKID.KN_TWOHANDQUICKEN,10 ],
			[ SKID.KN_AUTOCOUNTER,5 ]
		],
		NeedSkillList : new function(){
			this[JOBID.JT_SUPERNOVICE2] = [
				[ SKID.KN_AUTOCOUNTER,5 ]
			]
		}
	};

	exports[SKID.KN_CHARGEATK] = {
		Name: "KN_CHARGEATK",
		SkillName : "Charge Attack",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 14 ]
	};

	exports[SKID.CR_SHRINK] = {
		Name: "CR_SHRINK",
		SkillName : "Shrink",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.AS_SONICACCEL] = {
		Name: "AS_SONICACCEL",
		SkillName : "Sonic Acceleration",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.AS_VENOMKNIFE] = {
		Name: "AS_VENOMKNIFE",
		SkillName : "Throw Venom Knife",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.RG_CLOSECONFINE] = {
		Name: "RG_CLOSECONFINE",
		SkillName : "Close Confine",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 25 ],
		bSeperateLv : false,
		AttackRange : [ 2 ]
	};

	exports[SKID.WZ_SIGHTBLASTER] = {
		Name: "WZ_SIGHTBLASTER",
		SkillName : "Sight Blaster",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.KN_RIDING] = {
		Name: "KN_RIDING",
		SkillName : "Riding",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.SM_ENDURE,1 ]
		]
	};

	exports[SKID.SA_ELEMENTWATER] = {
		Name: "SA_ELEMENTWATER",
		SkillName : "Elemental Change (Water)",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.HT_PHANTASMIC] = {
		Name: "HT_PHANTASMIC",
		SkillName : "Phantasmic Arrow",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.BA_PANGVOICE] = {
		Name: "BA_PANGVOICE",
		SkillName : "Pang Voice",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.DC_WINKCHARM] = {
		Name: "DC_WINKCHARM",
		SkillName : "Wink of Charm",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.BS_UNFAIRLYTRICK] = {
		Name: "BS_UNFAIRLYTRICK",
		SkillName : "Unfair Trick",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.BS_GREED] = {
		Name: "BS_GREED",
		SkillName : "Greed",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.PR_REDEMPTIO] = {
		Name: "PR_REDEMPTIO",
		SkillName : "Redemptio",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 400 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.MO_KITRANSLATION] = {
		Name: "MO_KITRANSLATION",
		SkillName : "Ki Translation",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.MO_BALKYOUNG] = {
		Name: "MO_BALKYOUNG",
		SkillName : "Ki Explosion",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.SA_ELEMENTGROUND] = {
		Name: "SA_ELEMENTGROUND",
		SkillName : "Elemental Change (Earth)",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.SA_ELEMENTFIRE] = {
		Name: "SA_ELEMENTFIRE",
		SkillName : "Elemental Change (Fire)",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.SA_ELEMENTWIND] = {
		Name: "SA_ELEMENTWIND",
		SkillName : "Elemental Change (Wind)",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.SM_RECOVERY] = {
		Name: "SM_RECOVERY",
		SkillName : "Increase Recuperative Power",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.KN_CAVALIERMASTERY] = {
		Name: "KN_CAVALIERMASTERY",
		SkillName : "Cavalry Mastery",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.KN_RIDING,1 ]
		]
	};

	exports[SKID.AB_HIGHNESSHEAL] = {
		Name: "AB_HIGHNESSHEAL",
		SkillName : "Highness Heal",
		MaxLv : 5,
		SpAmount : [ 70, 100, 130, 160, 190 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.AB_RENOVATIO,1 ]
		]
	};

	exports[SKID.AB_DUPLELIGHT_MELEE] = {
		Name: "AB_DUPLELIGHT_MELEE",
		SkillName : "Duple Light (Melee)",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 11, 11, 11, 11, 11, 11, 11, 11, 11, 11 ]
	};

	exports[SKID.MER_BENEDICTION] = {
		Name: "MER_BENEDICTION",
		SkillName : "Benediction",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.PR_MACEMASTERY] = {
		Name: "PR_MACEMASTERY",
		SkillName : "Mace Mastery",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.EL_WATER_SCREEN] = {
		Name: "EL_WATER_SCREEN",
		SkillName : "Water Screen",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.PR_IMPOSITIO] = {
		Name: "PR_IMPOSITIO",
		SkillName : "Impositio Manus",
		MaxLv : 5,
		SpAmount : [ 13, 16, 19, 22, 25 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.EL_HURRICANE_ATK] = {
		Name: "EL_HURRICANE_ATK",
		SkillName : "Hurricane",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 7 ]
	};

	exports[SKID.PR_SUFFRAGIUM] = {
		Name: "PR_SUFFRAGIUM",
		SkillName : "Suffragium",
		MaxLv : 3,
		SpAmount : [ 8, 8, 8 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.PR_IMPOSITIO,2 ]
		]
	};

	exports[SKID.PR_ASPERSIO] = {
		Name: "PR_ASPERSIO",
		SkillName : "Aspersio",
		MaxLv : 5,
		SpAmount : [ 14, 18, 22, 26, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.AL_HOLYWATER,1 ],
			[ SKID.PR_IMPOSITIO,3 ]
		]
	};

	exports[SKID.PR_BENEDICTIO] = {
		Name: "PR_BENEDICTIO",
		SkillName : "B.S Sacramenti",
		MaxLv : 5,
		SpAmount : [ 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.PR_ASPERSIO,5 ],
			[ SKID.PR_GLORIA,3 ]
		]
	};

	exports[SKID.WL_SIENNAEXECRATE] = {
		Name: "WL_SIENNAEXECRATE",
		SkillName : "Sienna Execrate",
		MaxLv : 5,
		SpAmount : [ 32, 34, 36, 38, 40 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ],
		_NeedSkillList : [
			[ SKID.WL_SUMMONSTONE,1 ]
		]
	};

	exports[SKID.WL_CRIMSONROCK] = {
		Name: "WL_CRIMSONROCK",
		SkillName : "Crimson Rock",
		MaxLv : 5,
		SpAmount : [ 60, 70, 80, 90, 100 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.WL_SUMMONFB,1 ]
		]
	};

	exports[SKID.WL_SUMMONBL] = {
		Name: "WL_SUMMONBL",
		SkillName : "Summon Lightning Ball",
		MaxLv : 5,
		SpAmount : [ 10, 12, 14, 16, 18 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.WZ_VERMILION,1 ]
		]
	};

	exports[SKID.WL_READING_SB] = {
		Name: "WL_READING_SB",
		SkillName : "Reading Spellbook",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.PR_SANCTUARY] = {
		Name: "PR_SANCTUARY",
		SkillName : "Sanctuary",
		MaxLv : 10,
		SpAmount : [ 15, 18, 21, 24, 27, 30, 33, 36, 39, 42 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.AL_HEAL,1 ]
		]
	};

	exports[SKID.RA_CLUSTERBOMB] = {
		Name: "RA_CLUSTERBOMB",
		SkillName : "Cluster Bomb",
		MaxLv : 5,
		SpAmount : [ 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.RA_RESEARCHTRAP,3 ]
		]
	};

	exports[SKID.RA_WUGSTRIKE] = {
		Name: "RA_WUGSTRIKE",
		SkillName : "Warg Strike",
		MaxLv : 5,
		SpAmount : [ 20, 22, 24, 26, 28 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.RA_TOOTHOFWUG,1 ]
		]
	};

	exports[SKID.RA_CAMOUFLAGE] = {
		Name: "RA_CAMOUFLAGE",
		SkillName : "Camouflage",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RA_RANGERMAIN,1 ]
		]
	};

	exports[SKID.RA_MAIZETRAP] = {
		Name: "RA_MAIZETRAP",
		SkillName : "Maize Trap",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 3 ],
		_NeedSkillList : [
			[ SKID.RA_RESEARCHTRAP,1 ]
		]
	};

	exports[SKID.NC_MADOLICENCE] = {
		Name: "NC_MADOLICENCE",
		SkillName : "Magic Gear License",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.NC_FLAMELAUNCHER] = {
		Name: "NC_FLAMELAUNCHER",
		SkillName : "Flare Launcher",
		MaxLv : 3,
		SpAmount : [ 20, 20, 20 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7 ],
		_NeedSkillList : [
			[ SKID.NC_VULCANARM,1 ]
		]
	};

	exports[SKID.NC_HOVERING] = {
		Name: "NC_HOVERING",
		SkillName : "Hovering",
		MaxLv : 1,
		SpAmount : [ 25 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.NC_ACCELERATION,1 ]
		]
	};

	exports[SKID.PR_SLOWPOISON] = {
		Name: "PR_SLOWPOISON",
		SkillName : "Slow Poison",
		MaxLv : 4,
		SpAmount : [ 6, 8, 10, 12 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9 ]
	};

	exports[SKID.NC_ANALYZE] = {
		Name: "NC_ANALYZE",
		SkillName : "Analyze",
		MaxLv : 3,
		SpAmount : [ 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.NC_INFRAREDSCAN,1 ]
		]
	};

	exports[SKID.NC_REPAIR] = {
		Name: "NC_REPAIR",
		SkillName : "Repair",
		MaxLv : 5,
		SpAmount : [ 25, 30, 35, 40, 45 ],
		bSeperateLv : true,
		AttackRange : [ 5, 6, 7, 8, 9 ],
		_NeedSkillList : [
			[ SKID.NC_MADOLICENCE,2 ]
		]
	};

	exports[SKID.NC_POWERSWING] = {
		Name: "NC_POWERSWING",
		SkillName : "Power Swing",
		MaxLv : 5,
		SpAmount : [ 10, 12, 14, 16, 18 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.NC_AXEBOOMERANG,3 ]
		]
	};

	exports[SKID.NC_DISJOINT] = {
		Name: "NC_DISJOINT",
		SkillName : "FAW - Removal",
		MaxLv : 1,
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 5 ],
		_NeedSkillList : [
			[ SKID.NC_SILVERSNIPER,1 ]
		]
	};

	exports[SKID.SC_SHADOWFORM] = {
		Name: "SC_SHADOWFORM",
		SkillName : "Shadow Form",
		MaxLv : 5,
		SpAmount : [ 40, 50, 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SKID.RG_TUNNELDRIVE,3 ]
		]
	};

	exports[SKID.SC_DEADLYINFECT] = {
		Name: "SC_DEADLYINFECT",
		SkillName : "Deadly Infect",
		MaxLv : 5,
		SpAmount : [ 40, 44, 48, 52, 56 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SC_SHADOWFORM,3 ],
			[ SKID.SC_AUTOSHADOWSPELL,5 ]
		]
	};

	exports[SKID.SC_LAZINESS] = {
		Name: "SC_LAZINESS",
		SkillName : "Masquerade - Lazieness",
		MaxLv : 3,
		SpAmount : [ 30, 40, 50 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.SC_ENERVATION,1 ],
			[ SKID.SC_GROOMY,1 ],
			[ SKID.SC_IGNORANCE,1 ]
		]
	};

	exports[SKID.PR_STRECOVERY] = {
		Name: "PR_STRECOVERY",
		SkillName : "Recovery",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.SC_BLOODYLUST] = {
		Name: "SC_BLOODYLUST",
		SkillName : "Bloody Lust",
		MaxLv : 3,
		SpAmount : [ 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7 ],
		_NeedSkillList : [
			[ SKID.SC_DIMENSIONDOOR,3 ]
		]
	};

	exports[SKID.LG_CANNONSPEAR] = {
		Name: "LG_CANNONSPEAR",
		SkillName : "Cannon Spear",
		MaxLv : 5,
		SpAmount : [ 12, 16, 20, 24, 28 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.LG_PINPOINTATTACK,1 ]
		]
	};

	exports[SKID.LG_REFLECTDAMAGE] = {
		Name: "LG_REFLECTDAMAGE",
		SkillName : "Reflect Damage",
		MaxLv : 5,
		SpAmount : [ 60, 80, 100, 120, 140 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.CR_REFLECTSHIELD,5 ]
		]
	};

	exports[SKID.LG_SHIELDSPELL] = {
		Name: "LG_SHIELDSPELL",
		SkillName : "Shield Spell",
		MaxLv : 3,
		SpAmount : [ 50, 50, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.LG_SHIELDPRESS,3 ],
			[ SKID.LG_EARTHDRIVE,2 ]
		]
	};

	exports[SKID.LG_BANDING] = {
		Name: "LG_BANDING",
		SkillName : "Banding",
		MaxLv : 5,
		SpAmount : [ 30, 36, 42, 48, 54 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.LG_PINPOINTATTACK,3 ],
			[ SKID.LG_RAGEBURST,1 ]
		]
	};

	exports[SKID.LG_EARTHDRIVE] = {
		Name: "LG_EARTHDRIVE",
		SkillName : "Earth Drive",
		MaxLv : 5,
		SpAmount : [ 52, 60, 68, 76, 84 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.LG_REFLECTDAMAGE,3 ]
		]
	};

	exports[SKID.SR_SKYNETBLOW] = {
		Name: "SR_SKYNETBLOW",
		SkillName : "Skynet Blow",
		MaxLv : 5,
		SpAmount : [ 8, 9, 10, 11, 12 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SR_DRAGONCOMBO,3 ]
		]
	};

	exports[SKID.PR_KYRIE] = {
		Name: "PR_KYRIE",
		SkillName : "Kyrie Eleison",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 25, 25, 25, 30, 30, 30, 35 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.AL_ANGELUS,2 ]
		]
	};

	exports[SKID.SR_LIGHTNINGWALK] = {
		Name: "SR_LIGHTNINGWALK",
		SkillName : "Lightning Walk",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SR_WINDMILL,1 ]
		]
	};

	exports[SKID.SR_GATEOFHELL] = {
		Name: "SR_GATEOFHELL",
		SkillName : "Gate of Hell",
		MaxLv : 10,
		SpAmount : [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 2, 3, 3, 4, 4, 5, 5, 6, 7 ],
		_NeedSkillList : [
			[ SKID.SR_TIGERCANNON,5 ],
			[ SKID.SR_RAISINGDRAGON,5 ]
		]
	};

	exports[SKID.SR_GENTLETOUCH_CHANGE] = {
		Name: "SR_GENTLETOUCH_CHANGE",
		SkillName : "Gentle Touch (Change)",
		MaxLv : 5,
		SpAmount : [ 40, 50, 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.SR_GENTLETOUCH_CURE,4 ]
		]
	};

	exports[SKID.WA_SYMPHONY_OF_LOVER] = {
		Name: "WA_SYMPHONY_OF_LOVER",
		SkillName : "Symphony of Lovers",
		MaxLv : 5,
		SpAmount : [ 60, 69, 78, 87, 96 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.WM_LULLABY_DEEPSLEEP,1 ]
		]
	};

	exports[SKID.PR_MAGNIFICAT] = {
		Name: "PR_MAGNIFICAT",
		SkillName : "Magnificat",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MI_HARMONIZE] = {
		Name: "MI_HARMONIZE",
		SkillName : "Harmonize",
		MaxLv : 5,
		SpAmount : [ 70, 75, 80, 85, 90 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.WM_LULLABY_DEEPSLEEP,1 ]
		]
	};

	exports[SKID.PR_GLORIA] = {
		Name: "PR_GLORIA",
		SkillName : "Gloria",
		MaxLv : 5,
		SpAmount : [ 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.PR_KYRIE,4 ],
			[ SKID.PR_MAGNIFICAT,3 ]
		],
		NeedSkillList : new function(){
			this[JOBID.JT_SUPERNOVICE2] = [
				[ SKID.PR_SANCTUARY,7 ]
			]
		}
	};

	exports[SKID.WM_POEMOFNETHERWORLD] = {
		Name: "WM_POEMOFNETHERWORLD",
		SkillName : "Poem of the Netherworld",
		MaxLv : 5,
		SpAmount : [ 12, 16, 20, 24, 28 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.WM_LESSON,1 ]
		]
	};

	exports[SKID.WM_SIRCLEOFNATURE] = {
		Name: "WM_SIRCLEOFNATURE",
		SkillName : "Circle of Life's Melody",
		MaxLv : 5,
		SpAmount : [ 42, 46, 50, 54, 58 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.WM_LESSON,1 ]
		]
	};

	exports[SKID.PR_LEXDIVINA] = {
		Name: "PR_LEXDIVINA",
		SkillName : "Lex Divina",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 18, 16, 14, 12, 10 ],
		bSeperateLv : false,
		AttackRange : [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SKID.AL_RUWACH,1 ]
		]
	};

	exports[SKID.WM_LERADS_DEW] = {
		Name: "WM_LERADS_DEW",
		SkillName : "Lerad's Dew",
		MaxLv : 5,
		SpAmount : [ 120, 130, 140, 150, 160 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		NeedSkillList : new function(){
			this[JOBID.JT_MINSTREL] = [
				[ SKID.MI_HARMONIZE,1 ],
				[ SKID.MI_RUSH_WINDMILL,1 ],
				[ SKID.MI_ECHOSONG,1 ]
			];
			this[JOBID.JT_WANDERER] = [
				[ SKID.WA_SWING_DANCE,1 ],
				[ SKID.WA_SYMPHONY_OF_LOVER,1 ],
				[ SKID.WA_MOONLIT_SERENADE,1 ]
			]
		}
	};

	exports[SKID.SO_FIREWALK] = {
		Name: "SO_FIREWALK",
		SkillName : "Fire Walk",
		MaxLv : 5,
		SpAmount : [ 30, 34, 38, 42, 46 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SA_VOLCANO,1 ]
		]
	};

	exports[SKID.SO_DIAMONDDUST] = {
		Name: "SO_DIAMONDDUST",
		SkillName : "Diamond Dust",
		MaxLv : 5,
		SpAmount : [ 50, 56, 62, 68, 74 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SA_DELUGE,3 ]
		]
	};

	exports[SKID.SO_STRIKING] = {
		Name: "SO_STRIKING",
		SkillName : "Striking",
		MaxLv : 5,
		SpAmount : [ 50, 55, 60, 65, 70 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SA_FLAMELAUNCHER,1 ],
			[ SKID.SA_FROSTWEAPON,1 ],
			[ SKID.SA_LIGHTNINGLOADER,1 ],
			[ SKID.SA_SEISMICWEAPON,1 ]
		]
	};

	exports[SKID.SO_ARRULLO] = {
		Name: "SO_ARRULLO",
		SkillName : "Arrullo",
		MaxLv : 5,
		SpAmount : [ 30, 35, 40, 45, 50 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 9 ],
		_NeedSkillList : [
			[ SKID.SO_WARMER,2 ]
		]
	};

	exports[SKID.PR_TURNUNDEAD] = {
		Name: "PR_TURNUNDEAD",
		SkillName : "Turn Undead",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SKID.ALL_RESURRECTION,1 ],
			[ SKID.PR_LEXDIVINA,3 ]
		]
	};

	exports[SKID.SO_EL_SYMPATHY] = {
		Name: "SO_EL_SYMPATHY",
		SkillName : "Spirit Sympathy",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SO_EL_CONTROL,3 ]
		]
	};

	exports[SKID.SO_WIND_INSIGNIA] = {
		Name: "SO_WIND_INSIGNIA",
		SkillName : "Wind Insignia",
		MaxLv : 3,
		SpAmount : [ 22, 30, 38 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SO_SUMMON_VENTUS,3 ]
		]
	};

	exports[SKID.GN_REMODELING_CART] = {
		Name: "GN_REMODELING_CART",
		SkillName : "Cart Remodeling",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
	};

	exports[SKID.GN_THORNS_TRAP] = {
		Name: "GN_THORNS_TRAP",
		SkillName : "Thorn Trap",
		MaxLv : 5,
		SpAmount : [ 22, 26, 30, 34, 38 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.GN_S_PHARMACY,2 ]
		]
	};

	exports[SKID.GN_CRAZYWEED] = {
		Name: "GN_CRAZYWEED",
		SkillName : "Crazy Weed",
		MaxLv : 10,
		SpAmount : [ 24, 28, 32, 36, 40, 44, 48, 52, 56, 60 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11, 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.GN_WALLOFTHORN,3 ]
		]
	};

	exports[SKID.PR_LEXAETERNA] = {
		Name: "PR_LEXAETERNA",
		SkillName : "Lex Aeterna",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SKID.PR_LEXDIVINA,5 ]
		]
	};

	exports[SKID.GN_MIX_COOKING] = {
		Name: "GN_MIX_COOKING",
		SkillName : "Mix Cooking",
		MaxLv : 2,
		SpAmount : [ 5, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1 ],
		_NeedSkillList : [
			[ SKID.GN_S_PHARMACY,1 ]
		]
	};

	exports[SKID.GD_EXTENSION] = {
		Name: "GD_EXTENSION",
		SkillName : "Guild Extension",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.AB_SECRAMENT] = {
		Name: "AB_SECRAMENT",
		SkillName : "Sacrament",
		MaxLv : 5,
		SpAmount : [ 100, 120, 140, 160, 180 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.AB_EXPIATIO,1 ],
			[ SKID.AB_EPICLESIS,1 ]
		]
	};

	exports[SKID.PR_MAGNUS] = {
		Name: "PR_MAGNUS",
		SkillName : "Magnus Exorcismus",
		MaxLv : 10,
		SpAmount : [ 40, 42, 44, 46, 48, 50, 52, 54, 56, 58 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_SAFETYWALL,1 ],
			[ SKID.PR_LEXAETERNA,1 ],
			[ SKID.PR_TURNUNDEAD,3 ]
		]
	};

	exports[SKID.ALL_BUYING_STORE] = {
		Name: "ALL_BUYING_STORE",
		SkillName : "Open Buying Store",
		MaxLv : 2,
		SpAmount : [ 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1 ],
	};

	exports[SKID.SM_BASH] = {
		Name: "SM_BASH",
		SkillName : "Bash",
		MaxLv : 10,
		SpAmount : [ 8, 8, 8, 8, 8, 15, 15, 15, 15, 15 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.WZ_FIREPILLAR] = {
		Name: "WZ_FIREPILLAR",
		SkillName : "Fire Pillar",
		MaxLv : 10,
		SpAmount : [ 75, 75, 75, 75, 75, 75, 75, 75, 75, 75 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_FIREWALL,1 ]
		]
	};

	exports[SKID.MA_REMOVETRAP] = {
		Name: "MA_REMOVETRAP",
		SkillName : "Remove Trap",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 2 ]
	};

	exports[SKID.MER_RECUPERATE] = {
		Name: "MER_RECUPERATE",
		SkillName : "Recuperate",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.WZ_SIGHTRASHER] = {
		Name: "WZ_SIGHTRASHER",
		SkillName : "Sightrasher",
		MaxLv : 10,
		SpAmount : [ 35, 37, 39, 41, 43, 45, 47, 49, 51, 53 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.MG_SIGHT,1 ],
			[ SKID.MG_LIGHTNINGBOLT,1 ]
		]
	};

	exports[SKID.EL_WATER_DROP] = {
		Name: "EL_WATER_DROP",
		SkillName : "Water Drop",
		MaxLv : 1,
		SpAmount : [ 60 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.WZ_FIREIVY] = {
		Name: "WZ_FIREIVY",
		SkillName : "Fire Ivy",
		MaxLv : 0,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ ]
	};

	exports[SKID.EL_TYPOON_MIS] = {
		Name: "EL_TYPOON_MIS",
		SkillName : "Typhoon Missile",
		MaxLv : 1,
		SpAmount : [ 80 ],
		bSeperateLv : false,
		AttackRange : [ 11 ]
	};

	exports[SKID.WZ_METEOR] = {
		Name: "WZ_METEOR",
		SkillName : "Meteor Storm",
		MaxLv : 10,
		SpAmount : [ 20, 24, 30, 34, 40, 44, 50, 54, 60, 64 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_THUNDERSTORM,1 ],
			[ SKID.WZ_SIGHTRASHER,2 ]
		]
	};

	exports[SKID.WZ_JUPITEL] = {
		Name: "WZ_JUPITEL",
		SkillName : "Jupitel Thunder",
		MaxLv : 10,
		SpAmount : [ 20, 23, 26, 29, 32, 35, 38, 41, 44, 47 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_NAPALMBEAT,1 ],
			[ SKID.MG_LIGHTNINGBOLT,1 ]
		]
	};

	exports[SKID.WZ_VERMILION] = {
		Name: "WZ_VERMILION",
		SkillName : "Lord of Vermilion",
		MaxLv : 10,
		SpAmount : [ 60, 64, 68, 72, 76, 80, 84, 88, 92, 96 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_THUNDERSTORM,1 ],
			[ SKID.WZ_JUPITEL,5 ]
		]
	};

	exports[SKID.WZ_WATERBALL] = {
		Name: "WZ_WATERBALL",
		SkillName : "Water Ball",
		MaxLv : 5,
		SpAmount : [ 15, 20, 20, 25, 25 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_COLDBOLT,1 ],
			[ SKID.MG_LIGHTNINGBOLT,1 ]
		]
	};

	exports[SKID.WZ_ICEWALL] = {
		Name: "WZ_ICEWALL",
		SkillName : "Ice Wall",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_STONECURSE,1 ],
			[ SKID.MG_FROSTDIVER,1 ]
		]
	};

	exports[SKID.WZ_FROSTNOVA] = {
		Name: "WZ_FROSTNOVA",
		SkillName : "Frost Nova",
		MaxLv : 10,
		SpAmount : [ 45, 43, 41, 39, 37, 35, 33, 31, 29, 27 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.WZ_ICEWALL,1 ]
		]
	};

	exports[SKID.WZ_STORMGUST] = {
		Name: "WZ_STORMGUST",
		SkillName : "Storm Gust",
		MaxLv : 10,
		SpAmount : [ 78, 78, 78, 78, 78, 78, 78, 78, 78, 78 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_FROSTDIVER,1 ],
			[ SKID.WZ_JUPITEL,3 ]
		]
	};

	exports[SKID.WZ_EARTHSPIKE] = {
		Name: "WZ_EARTHSPIKE",
		SkillName : "Earth Spike",
		MaxLv : 5,
		SpAmount : [ 12, 14, 16, 18, 20 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
				[ SKID.MG_STONECURSE,1 ]
		],
		NeedSkillList : new function(){
			this[JOBID.JT_SAGE] = [
				[ SKID.SA_SEISMICWEAPON,1 ]
			]
		}
	};

	exports[SKID.WZ_HEAVENDRIVE] = {
		Name: "WZ_HEAVENDRIVE",
		SkillName : "Heaven's Drive",
		MaxLv : 5,
		SpAmount : [ 28, 32, 36, 40, 44 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.WZ_EARTHSPIKE,3 ]
		],
		NeedSkillList : new function(){
			this[JOBID.JT_SAGE] = [
				[ SKID.WZ_EARTHSPIKE,1 ]
			]
		}
	};

	exports[SKID.WZ_QUAGMIRE] = {
		Name: "WZ_QUAGMIRE",
		SkillName : "Quagmire",
		MaxLv : 5,
		SpAmount : [ 5, 10, 15, 20, 25 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.WZ_HEAVENDRIVE,1 ]
		]
	};

	exports[SKID.WZ_ESTIMATION] = {
		Name: "WZ_ESTIMATION",
		SkillName : "Monster Property",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.HLIF_BRAIN] = {
		Name: "HLIF_BRAIN",
		SkillName : "Brain Surgery",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.HFLI_SPEED] = {
		Name: "HFLI_SPEED",
		SkillName : "Over Speed",
		MaxLv : 5,
		SpAmount : [ 30, 40, 50, 60, 70 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MH_NEEDLE_OF_PARALYZE] = {
		Name: "MH_NEEDLE_OF_PARALYZE",
		SkillName : "Needle of Paralyze",
		MaxLv : 5,
		SpAmount : [ 48, 60, 72, 84, 96 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 5, 5, 5 ],
	};

	exports[SKID.MH_STYLE_CHANGE] = {
		Name: "MH_STYLE_CHANGE",
		SkillName : "Style Change",
		MaxLv : 1,
		SpAmount : [ 35 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};	

	exports[SKID.MH_ANGRIFFS_MODUS] = {
		Name: "MH_ANGRIFFS_MODUS",
		SkillName : "Attack Mode",
		MaxLv : 5,
		SpAmount : [ 60, 65, 70, 75, 80 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MH_VOLCANIC_ASH] = {
		Name: "MH_VOLCANIC_ASH",
		SkillName : "Volcanic Ash",
		MaxLv : 5,
		SpAmount : [ 60, 65, 70, 75, 80 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ]
	};

	exports[SKID.BS_IRON] = {
		Name: "BS_IRON",
		SkillName : "Iron Tempering",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.GD_GLORYGUILD] = {
		Name: "GD_GLORYGUILD",
		SkillName : "Guild's Glory",
		MaxLv : 0,
		SpAmount : [ ],
		bSeperateLv : false,
		AttackRange : [ ]
	};

	exports[SKID.BS_STEEL] = {
		Name: "BS_STEEL",
		SkillName : "Steel Tempering",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BS_IRON,1 ],
		]
	};

	exports[SKID.SM_PROVOKE] = {
		Name: "SM_PROVOKE",
		SkillName : "Provoke",
		MaxLv : 10,
		SpAmount : [ 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.BS_ENCHANTEDSTONE] = {
		Name: "BS_ENCHANTEDSTONE",
		SkillName : "Enchanted Stone Craft",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BS_IRON,1 ]
		]
	};

	exports[SKID.MA_CHARGEARROW] = {
		Name: "MA_CHARGEARROW",
		SkillName : "Charge Arrow",
		MaxLv : 1,
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.MER_MENTALCURE] = {
		Name: "MER_MENTALCURE",
		SkillName : "Mental Cure",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.BS_ORIDEOCON] = {
		Name: "BS_ORIDEOCON",
		SkillName : "Research Oridecon",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BS_ENCHANTEDSTONE,1 ]
		]
	};

	exports[SKID.EL_WATER_BARRIER] = {
		Name: "EL_WATER_BARRIER",
		SkillName : "Water Barrier",
		MaxLv : 1,
		SpAmount : [ 80 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.BS_DAGGER] = {
		Name: "BS_DAGGER",
		SkillName : "Smith Dagger",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	exports[SKID.EL_TYPOON_MIS_ATK] = {
		Name: "EL_TYPOON_MIS_ATK",
		SkillName : "Typhoon Missile",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 11 ]
	};

	exports[SKID.BS_SWORD] = {
		Name: "BS_SWORD",
		SkillName : "Smith Sword",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BS_DAGGER,1 ]
		]
	};

	exports[SKID.BS_TWOHANDSWORD] = {
		Name: "BS_TWOHANDSWORD",
		SkillName : "Smith Two-Handed Sword",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BS_SWORD,1 ]
		]
	};

	exports[SKID.BS_AXE] = {
		Name: "BS_AXE",
		SkillName : "Smith Axe",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BS_SWORD,2 ]
		]
	};

	exports[SKID.BS_MACE] = {
		Name: "BS_MACE",
		SkillName : "Smith Mace",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BS_KNUCKLE,1 ]
		]		
	};

	exports[SKID.BS_KNUCKLE] = {
		Name: "BS_KNUCKLE",
		SkillName : "Smith Brass Knuckle",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BS_DAGGER, 1 ]
		]
	};

	exports[SKID.BS_SPEAR] = {
		Name: "BS_SPEAR",
		SkillName : "Smith Spear",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BS_DAGGER,2 ]
		]
	};

	exports[SKID.BS_HILTBINDING] = {
		Name: "BS_HILTBINDING",
		SkillName : "Hilt Binding",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.BS_FINDINGORE] = {
		Name: "BS_FINDINGORE",
		SkillName : "Finding Ore",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.BS_HILTBINDING,1 ],
			[ SKID.BS_STEEL,1 ]
		]

	};

	exports[SKID.BS_WEAPONRESEARCH] = {
		Name: "BS_WEAPONRESEARCH",
		SkillName : "Weaponry Research",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BS_HILTBINDING,1 ]
		]
	};

	exports[SKID.BS_REPAIRWEAPON] = {
		Name: "BS_REPAIRWEAPON",
		SkillName : "Repair Weapon",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 2 ],
		_NeedSkillList : [
			[ SKID.BS_WEAPONRESEARCH,1 ]
		]
	};

	exports[SKID.BS_SKINTEMPER] = {
		Name: "BS_SKINTEMPER",
		SkillName : "Skin Tempering",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.BS_HAMMERFALL] = {
		Name: "BS_HAMMERFALL",
		SkillName : "Hammer Fall",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.GD_LEADERSHIP] = {
		Name: "GD_LEADERSHIP",
		SkillName : "Great Leadership",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.BS_ADRENALINE] = {
		Name: "BS_ADRENALINE",
		SkillName : "Adrenaline Rush",
		MaxLv : 5,
		SpAmount : [ 20, 23, 26, 29, 32 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BS_HAMMERFALL,2 ]
		]
	};

	exports[SKID.SM_MAGNUM] = {
		Name: "SM_MAGNUM",
		SkillName : "Magnum Break",
		MaxLv : 10,
		SpAmount : [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SM_BASH,5 ]
		]
	};

	exports[SKID.BS_WEAPONPERFECT] = {
		Name: "BS_WEAPONPERFECT",
		SkillName : "Weapon Perfection",
		MaxLv : 5,
		SpAmount : [ 18, 16, 14, 12, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BS_WEAPONRESEARCH,2 ],
			[ SKID.BS_ADRENALINE,2 ]
		]
	};

	exports[SKID.MA_SHARPSHOOTING] = {
		Name: "MA_SHARPSHOOTING",
		SkillName : "Sharp Shooting",
		MaxLv : 5,
		SpAmount : [ 18, 21, 24, 27, 30 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.MER_COMPRESS] = {
		Name: "MER_COMPRESS",
		SkillName : "Compress",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.BS_OVERTHRUST] = {
		Name: "BS_OVERTHRUST",
		SkillName : "Over Thrust",
		MaxLv : 5,
		SpAmount : [ 18, 16, 14, 12, 10 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BS_ADRENALINE,3 ]
		]
	};

	exports[SKID.EL_WIND_STEP] = {
		Name: "EL_WIND_STEP",
		SkillName : "Wind Step",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.BS_MAXIMIZE] = {
		Name: "BS_MAXIMIZE",
		SkillName : "Maximize Power",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BS_WEAPONPERFECT,3 ],
			[ SKID.BS_OVERTHRUST,2 ]
		]
	};

	exports[SKID.EL_STONE_HAMMER] = {
		Name: "EL_STONE_HAMMER",
		SkillName : "Stone Hammer",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 5 ]
	};

	exports[SKID.HT_SKIDTRAP] = {
		Name: "HT_SKIDTRAP",
		SkillName : "Skid Trap",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ]
	};

	exports[SKID.HT_LANDMINE] = {
		Name: "HT_LANDMINE",
		SkillName : "Land Mine",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ]
	};

	exports[SKID.HT_ANKLESNARE] = {
		Name: "HT_ANKLESNARE",
		SkillName : "Ankle Snare",
		MaxLv : 5,
		SpAmount : [ 12, 12, 12, 12, 12 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.HT_SKIDTRAP,1 ]
		]
	};

	exports[SKID.HT_SHOCKWAVE] = {
		Name: "HT_SHOCKWAVE",
		SkillName : "Shockwave Trap",
		MaxLv : 5,
		SpAmount : [ 45, 45, 45, 45, 45 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.HT_ANKLESNARE,1 ]
		]
	};

	exports[SKID.HT_SANDMAN] = {
		Name: "HT_SANDMAN",
		SkillName : "Sandman",
		MaxLv : 5,
		SpAmount : [ 12, 12, 12, 12, 12 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.HT_FLASHER,1 ]
		]

	};

	exports[SKID.HT_FLASHER] = {
		Name: "HT_FLASHER",
		SkillName : "Flasher",
		MaxLv : 5,
		SpAmount : [ 12, 12, 12, 12, 12 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.HT_SKIDTRAP,1 ]
		]
	};

	exports[SKID.HT_FREEZINGTRAP] = {
		Name: "HT_FREEZINGTRAP",
		SkillName : "Freezing Trap",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.HT_FLASHER,1 ]
		]
	};

	exports[SKID.HT_BLASTMINE] = {
		Name: "HT_BLASTMINE",
		SkillName : "Blast Mine",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.HT_LANDMINE,1 ],
			[ SKID.HT_SANDMAN,1 ],
			[ SKID.HT_FREEZINGTRAP,1 ]
		]
	};

	exports[SKID.HT_CLAYMORETRAP] = {
		Name: "HT_CLAYMORETRAP",
		SkillName : "Claymore Trap",
		MaxLv : 5,
		SpAmount : [ 15, 15, 15, 15, 15 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.HT_SHOCKWAVE,1 ],
			[ SKID.HT_BLASTMINE,1 ]
		]
	};

	exports[SKID.HT_REMOVETRAP] = {
		Name: "HT_REMOVETRAP",
		SkillName : "Remove Trap",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 2 ],
		_NeedSkillList : [
			[ SKID.HT_LANDMINE,1 ]
		],
		NeedSkillList : new function(){
			this[JOBID.JT_ROGUE] = [
				[ SKID.AC_DOUBLE,5 ]
			]
		}
	};

	exports[SKID.HT_TALKIEBOX] = {
		Name: "HT_TALKIEBOX",
		SkillName : "Talkie Box",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 3 ],
		_NeedSkillList : [
			[ SKID.HT_REMOVETRAP,1 ],
			[ SKID.HT_SHOCKWAVE,1 ]
		]
	};

	exports[SKID.RK_SONICWAVE] = {
		Name: "RK_SONICWAVE",
		SkillName : "Sonic Wave",
		MaxLv : 5,
		SpAmount : [ 30, 35, 40, 45, 50 ],
		bSeperateLv : true,
		AttackRange : [ 7, 8, 9, 10, 11 ],
		_NeedSkillList : [
			[ SKID.RK_ENCHANTBLADE,3 ]
		]
	};

	exports[SKID.RK_HUNDREDSPEAR] = {
		Name: "RK_HUNDREDSPEAR",
		SkillName : "Hundred Spear",
		MaxLv : 10,
		SpAmount : [ 60, 60, 60, 60, 60, 60, 60, 60, 60, 60 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SKID.RK_PHANTOMTHRUST,3 ]
		]
	};

	exports[SKID.RK_IGNITIONBREAK] = {
		Name: "RK_IGNITIONBREAK",
		SkillName : "Ignition Break",
		MaxLv : 5,
		SpAmount : [ 35, 40, 45, 50, 55 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RK_DEATHBOUND,5 ],
			[ SKID.RK_SONICWAVE,2 ],
			[ SKID.RK_WINDCUTTER,3 ]
		]
	};

	exports[SKID.RK_DRAGONBREATH] = {
		Name: "RK_DRAGONBREATH",
		SkillName : "Dragon Breath",
		MaxLv : 10,
		SpAmount : [ 30, 35, 40, 45, 50, 55, 60, 65, 70, 75 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.RK_DRAGONTRAINING,2 ]
		]
	};

	exports[SKID.RK_RUNEMASTERY] = {
		Name: "RK_RUNEMASTERY",
		SkillName : "Rune Mastery",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.RK_CRUSHSTRIKE] = {
		Name: "RK_CRUSHSTRIKE",
		SkillName : "Crush Strike",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.HT_BEASTBANE] = {
		Name: "HT_BEASTBANE",
		SkillName : "Beast Bane",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.RK_VITALITYACTIVATION] = {
		Name: "RK_VITALITYACTIVATION",
		SkillName : "Vitality Activation",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.RK_FIGHTINGSPIRIT] = {
		Name: "RK_FIGHTINGSPIRIT",
		SkillName : "Fightning Spirit",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.RK_PHANTOMTHRUST] = {
		Name: "RK_PHANTOMTHRUST",
		SkillName : "Phantom Thrust",
		MaxLv : 5,
		SpAmount : [ 15, 18, 21, 24, 27 ],
		bSeperateLv : true,
		AttackRange : [ 5, 6, 7, 8, 9 ],
		_NeedSkillList : [
			[ SKID.KN_BRANDISHSPEAR,2 ]
		]
	};

	exports[SKID.GC_CROSSIMPACT] = {
		Name: "GC_CROSSIMPACT",
		SkillName : "Cross Impact",
		MaxLv : 5,
		SpAmount : [ 25, 25, 25, 25, 25 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.AS_SONICBLOW,10 ]
		]
	};

	exports[SKID.GC_RESEARCHNEWPOISON] = {
		Name: "GC_RESEARCHNEWPOISON",
		SkillName : "Research New Poison",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.GC_ANTIDOTE] = {
		Name: "GC_ANTIDOTE",
		SkillName : "Antidote",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 5 ],
		_NeedSkillList : [
			[ SKID.GC_RESEARCHNEWPOISON,5 ]
		]
	};

	exports[SKID.GC_WEAPONBLOCKING] = {
		Name: "GC_WEAPONBLOCKING",
		SkillName : "Weapon Blocking",
		MaxLv : 5,
		SpAmount : [ 40, 36, 32, 28, 24 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AS_LEFT,5 ]
		]
	};

	exports[SKID.HT_FALCON] = {
		Name: "HT_FALCON",
		SkillName : "Falconry Mastery",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.HT_BEASTBANE,1 ]
		]
	};

	exports[SKID.GC_POISONSMOKE] = {
		Name: "GC_POISONSMOKE",
		SkillName : "Poison Smoke",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SKID.GC_POISONINGWEAPON,5 ],
			[ SKID.GC_VENOMPRESSURE,5 ]
		]
	};

	exports[SKID.GC_PHANTOMMENACE] = {
		Name: "GC_PHANTOMMENACE",
		SkillName : "Phantom Menace",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.GC_CLOAKINGEXCEED,5 ],
			[ SKID.GC_DARKILLUSION,5 ]
		]
	};

	exports[SKID.GC_ROLLINGCUTTER] = {
		Name: "GC_ROLLINGCUTTER",
		SkillName : "Rolling Cutter",
		MaxLv : 5,
		SpAmount : [ 5, 5, 5, 5, 5 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AS_SONICBLOW,10 ]
		]
	};

	exports[SKID.AB_JUDEX] = {
		Name: "AB_JUDEX",
		SkillName : "Judex",
		MaxLv : 5,
		SpAmount : [ 20, 23, 26, 29, 32 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.PR_TURNUNDEAD,1 ]
		]
	};

	exports[SKID.AB_ADORAMUS] = {
		Name: "AB_ADORAMUS",
		SkillName : "Adoramus",
		MaxLv : 10,
		SpAmount : [ 20, 24, 28, 32, 36, 40, 44, 48, 52, 56 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11, 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.AB_JUDEX,5 ],
			[ SKID.AB_ANCILLA,1 ],
			[ SKID.PR_MAGNUS,1 ]
		]
	};

	exports[SKID.AB_CANTO] = {
		Name: "AB_CANTO",
		SkillName : "Canto Candidus",
		MaxLv : 3,
		SpAmount : [ 200, 220, 240 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AL_INCAGI,1 ]
		]
	};

	exports[SKID.SM_ENDURE] = {
		Name: "SM_ENDURE",
		SkillName : "Endure",
		MaxLv : 10,
		SpAmount : [ 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SM_PROVOKE,5 ]
		]
	};

	exports[SKID.HT_STEELCROW] = {
		Name: "HT_STEELCROW",
		SkillName : "Steel Crow",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.HT_BLITZBEAT,5 ]
		]
	};

	exports[SKID.AB_LAUDARAMUS] = {
		Name: "AB_LAUDARAMUS",
		SkillName : "Lauda Ramus",
		MaxLv : 4,
		SpAmount : [ 50, 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.AB_LAUDAAGNUS,2 ]
		]
	};

	exports[SKID.AB_CLEARANCE] = {
		Name: "AB_CLEARANCE",
		SkillName : "Clearance",
		MaxLv : 5,
		SpAmount : [ 54, 60, 66, 72, 78 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.AB_LAUDARAMUS,2 ]
		]
	};

	exports[SKID.AB_DUPLELIGHT_MAGIC] = {
		Name: "AB_DUPLELIGHT_MAGIC",
		SkillName : "Duple Light (Magic)",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 11, 11, 11, 11, 11, 11, 11, 11, 11, 11 ]
	};

	exports[SKID.HT_BLITZBEAT] = {
		Name: "HT_BLITZBEAT",
		SkillName : "Blitz Beat",
		MaxLv : 5,
		SpAmount : [ 10, 13, 16, 19, 22 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SKID.HT_FALCON,1 ]
		]
	};

	exports[SKID.HT_DETECTING] = {
		Name: "HT_DETECTING",
		SkillName : "Detecting",
		MaxLv : 4,
		SpAmount : [ 8, 8, 8, 8 ],
		bSeperateLv : false,
		AttackRange : [ 3, 5, 7, 9 ],
		_NeedSkillList : [
			[ SKID.AC_CONCENTRATION,1 ],
			[ SKID.HT_FALCON,1 ]
		]
	};

	exports[SKID.HT_SPRINGTRAP] = {
		Name: "HT_SPRINGTRAP",
		SkillName : "Spring Trap",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 4, 5, 6, 7, 8 ],
		_NeedSkillList : [
			[ SKID.HT_FALCON ],
			[ SKID.HT_REMOVETRAP,1 ]
		]
	};

	exports[SKID.EL_WIND_CURTAIN] = {
		Name: "EL_WIND_CURTAIN",
		SkillName : "Wind Curtain",
		MaxLv : 1,
		SpAmount : [ 60 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.AS_RIGHT] = {
		Name: "AS_RIGHT",
		SkillName : "Right-Hand Mastery",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.EL_ROCK_CRUSHER] = {
		Name: "EL_ROCK_CRUSHER",
		SkillName : "Rock Crusher",
		MaxLv : 1,
		SpAmount : [ 60 ],
		bSeperateLv : false,
		AttackRange : [ 3 ]
	};

	exports[SKID.AS_LEFT] = {
		Name: "AS_LEFT",
		SkillName : "Left-Hand Mastery",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AS_RIGHT,2 ]
		]
	};

	exports[SKID.AS_KATAR] = {
		Name: "AS_KATAR",
		SkillName : "Katar Mastery",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.AS_CLOAKING] = {
		Name: "AS_CLOAKING",
		SkillName : "Cloaking",
		MaxLv : 10,
		SpAmount : [ 15, 15, 15, 15, 15, 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.TF_HIDING,2 ]
		]
	};

	exports[SKID.AS_SONICBLOW] = {
		Name: "AS_SONICBLOW",
		SkillName : "Sonic Blow",
		MaxLv : 10,
		SpAmount : [ 16, 18, 20, 22, 24, 26, 28, 30, 32, 34 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AS_KATAR,4 ]
		]
	};

	exports[SKID.AS_GRIMTOOTH] = {
		Name: "AS_GRIMTOOTH",
		SkillName : "Grimtooth",
		MaxLv : 5,
		SpAmount : [ 3, 3, 3, 3, 3 ],
		bSeperateLv : false,
		AttackRange : [ 2, 3, 4, 5, 6 ],
		_NeedSkillList : [
			[ SKID.AS_CLOAKING,2 ],
			[ SKID.AS_SONICBLOW,5 ]
		]
	};

	exports[SKID.AS_ENCHANTPOISON] = {
		Name: "AS_ENCHANTPOISON",
		SkillName : "Enchant Poison",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.TF_POISON,1 ]
		]
	};

	exports[SKID.WL_RADIUS] = {
		Name: "WL_RADIUS",
		SkillName : "Radius",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	exports[SKID.WL_HELLINFERNO] = {
		Name: "WL_HELLINFERNO",
		SkillName : "Hell Inferno",
		MaxLv : 5,
		SpAmount : [ 35, 40, 45, 50, 55 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.WL_CRIMSONROCK,2 ]
		]
	};

	exports[SKID.WL_EARTHSTRAIN] = {
		Name: "WL_EARTHSTRAIN",
		SkillName : "Earth Strain",
		MaxLv : 5,
		SpAmount : [ 70, 78, 86, 94, 102 ],
		bSeperateLv : true,
		AttackRange : [ 6, 6, 6, 6, 6 ],
		_NeedSkillList : [
			[ SKID.WL_SIENNAEXECRATE,2 ]
		]
	};

	exports[SKID.AS_POISONREACT] = {
		Name: "AS_POISONREACT",
		SkillName : "Poison React",
		MaxLv : 10,
		SpAmount : [ 25, 30, 35, 40, 45, 50, 55, 60, 45, 45 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AS_ENCHANTPOISON,3 ]
		]
	};

	exports[SKID.WL_SUMMONWB] = {
		Name: "WL_SUMMONWB",
		SkillName : "Summon Water Ball",
		MaxLv : 5,
		SpAmount : [ 10, 12, 14, 16, 18 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.WZ_STORMGUST,1 ]
		]
	};

	exports[SKID.WL_FREEZE_SP] = {
		Name: "WL_FREEZE_SP",
		SkillName : "Freeze Spell",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.AS_VENOMDUST] = {
		Name: "AS_VENOMDUST",
		SkillName : "Venom Dust",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.AS_ENCHANTPOISON,5 ]
		]
	};

	exports[SKID.RA_WUGMASTERY] = {
		Name: "RA_WUGMASTERY",
		SkillName : "Warg Mastery",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.RA_WUGBITE] = {
		Name: "RA_WUGBITE",
		SkillName : "Warg Bite",
		MaxLv : 5,
		SpAmount : [ 40, 44, 46, 48, 50 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.RA_WUGSTRIKE,1 ]
		]
	};

	exports[SKID.RA_RESEARCHTRAP] = {
		Name: "RA_RESEARCHTRAP",
		SkillName : "Research Trap",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.HT_CLAYMORETRAP,1 ],
			[ SKID.HT_REMOVETRAP,1 ]
		]
	};

	exports[SKID.AS_SPLASHER] = {
		Name: "AS_SPLASHER",
		SkillName : "Venom Splasher",
		MaxLv : 10,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AS_VENOMDUST,5 ],
			[ SKID.AS_POISONREACT,5 ]
		]
	};

	exports[SKID.NC_BOOSTKNUCKLE] = {
		Name: "NC_BOOSTKNUCKLE",
		SkillName : "Boost Knuckle",
		MaxLv : 5,
		SpAmount : [ 3, 6, 9, 12, 15 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.NC_MADOLICENCE,1 ]
		]
	};

	exports[SKID.NC_COLDSLOWER] = {
		Name: "NC_COLDSLOWER",
		SkillName : "Cold Slower",
		MaxLv : 3,
		SpAmount : [ 20, 20, 20 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7 ],
		_NeedSkillList : [
			[ SKID.NC_VULCANARM,3 ]
		]
	};

	exports[SKID.NC_F_SIDESLIDE] = {
		Name: "NC_F_SIDESLIDE",
		SkillName : "Front Side Slide",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.NC_HOVERING,1 ]
		]
	};

	exports[SKID.NV_FIRSTAID] = {
		Name: "NV_FIRSTAID",
		SkillName : "First Aid",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 3 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.NC_MAGNETICFIELD] = {
		Name: "NC_MAGNETICFIELD",
		SkillName : "Magnetic Field",
		MaxLv : 3,
		SpAmount : [ 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.NC_EMERGENCYCOOL,1 ]
		]
	};

	exports[SKID.NC_TRAININGAXE] = {
		Name: "NC_TRAININGAXE",
		SkillName : "Axe Training",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.NC_AXETORNADO] = {
		Name: "NC_AXETORNADO",
		SkillName : "Axe Tornado",
		MaxLv : 5,
		SpAmount : [ 18, 20, 22, 24, 26 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.NC_TRAININGAXE,1 ]
		]
	};

	exports[SKID.NV_TRICKDEAD] = {
		Name: "NV_TRICKDEAD",
		SkillName : "Trick Dead",	
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.SC_TRIANGLESHOT] = {
		Name: "SC_TRIANGLESHOT",
		SkillName : "Triangle Shot",
		MaxLv : 10,
		SpAmount : [ 22, 24, 26, 28, 30, 32, 34, 36, 38, 40 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 9, 9, 9, 9, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.AC_DOUBLE,7 ]
		]
	};

	exports[SKID.SC_ENERVATION] = {
		Name: "SC_ENERVATION",
		SkillName : "Masquerade - Enervation",
		MaxLv : 3,
		SpAmount : [ 30, 40, 50 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.SC_BODYPAINT,1 ]
		]
	};

	exports[SKID.MG_SRECOVERY] = {
		Name: "MG_SRECOVERY",
		SkillName : "Increase Spiritual Power",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.SM_MOVINGRECOVERY] = {
		Name: "SM_MOVINGRECOVERY",
		SkillName : "Moving HP Recovery",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.SC_FEINTBOMB] = {
		Name: "SC_FEINTBOMB",
		SkillName : "Feint Bomb",
		MaxLv : 3,
		SpAmount : [ 24, 28, 32 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SC_DIMENSIONDOOR,3 ]
		]
	};

	exports[SKID.LG_BANISHINGPOINT] = {
		Name: "LG_BANISHINGPOINT",
		SkillName : "Banishing Point",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 25, 25, 25, 25, 25 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7, 7, 7, 7, 7, 7 ],
		_NeedSkillList : [
			[ SKID.KN_SPEARMASTERY,1 ]
		]
	};

	exports[SKID.LG_PINPOINTATTACK] = {
		Name: "LG_PINPOINTATTACK",
		SkillName : "Pinpoint Attack",
		MaxLv : 5,
		SpAmount : [ 50, 50, 50, 50, 50 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SKID.LG_BANISHINGPOINT,5 ]
		]
	};

	exports[SKID.SM_FATALBLOW] = {
		Name: "SM_FATALBLOW",
		SkillName : "Fatal Blow",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.LG_MOONSLASHER] = {
		Name: "LG_MOONSLASHER",
		SkillName : "Moon Slasher",
		MaxLv : 5,
		SpAmount : [ 20, 24, 28, 32, 36 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.KN_SPEARMASTERY,1 ]
		]
	};

	exports[SKID.LG_HESPERUSLIT] = {
		Name: "LG_HESPERUSLIT",
		SkillName : "Hesperuslit",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.LG_PRESTIGE,3 ],
			[ SKID.LG_BANDING,3 ]
		]
	};

	exports[SKID.SR_EARTHSHAKER] = {
		Name: "SR_EARTHSHAKER",
		SkillName : "Earth Shaker",
		MaxLv : 5,
		SpAmount : [ 20, 25, 30, 35, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SR_DRAGONCOMBO,1 ],
			[ SKID.SR_CURSEDCIRCLE,1 ]
		]
	};

	exports[SKID.SM_AUTOBERSERK] = {
		Name: "SM_AUTOBERSERK",
		SkillName : "Auto Berserk",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.SR_KNUCKLEARROW] = {
		Name: "SR_KNUCKLEARROW",
		SkillName : "Knuckle Arrow",
		MaxLv : 5,
		SpAmount : [ 10, 15, 20, 25, 30 ],
		bSeperateLv : false,
		AttackRange : [ 7, 8, 9, 10, 11 ],
		_NeedSkillList : [
			[ SKID.SR_LIGHTNINGWALK,3 ],
			[ SKID.SR_RAMPAGEBLASTER,3 ]
		]
	};

	exports[SKID.SR_ASSIMILATEPOWER] = {
		Name: "SR_ASSIMILATEPOWER",
		SkillName : "Assimilate Power",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.MO_ABSORBSPIRITS,1 ],
			[ SKID.SR_POWERVELOCITY,1 ]
		]
	};

	exports[SKID.SR_GENTLETOUCH_QUIET] = {
		Name: "SR_GENTLETOUCH_QUIET",
		SkillName : "Gentle Touch (Quiet)",
		MaxLv : 5,
		SpAmount : [ 20, 25, 30, 35, 40 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.SR_POWERVELOCITY,1 ]
		]
	};

	exports[SKID.AC_MAKINGARROW] = {
		Name: "AC_MAKINGARROW",
		SkillName : "Making Arrow",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.WA_MOONLIT_SERENADE] = {
		Name: "WA_MOONLIT_SERENADE",
		SkillName : "Moonlight Serenade",
		MaxLv : 5,
		SpAmount : [ 84, 96, 108, 120, 134 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.WM_LULLABY_DEEPSLEEP,1 ]
		]
	};

	exports[SKID.AC_CHARGEARROW] = {
		Name: "AC_CHARGEARROW",
		SkillName : "Charge Arrow",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.TF_SPRINKLESAND] = {
		Name: "TF_SPRINKLESAND",
		SkillName : "Sprinkle Sand",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 9 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.TF_BACKSLIDING] = {
		Name: "TF_BACKSLIDING",
		SkillName : "Back Sliding",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 7 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.TF_PICKSTONE] = {
		Name: "TF_PICKSTONE",
		SkillName : "Pick Stone",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 2 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.WM_VOICEOFSIREN] = {
		Name: "WM_VOICEOFSIREN",
		SkillName : "Siren's Voice",
		MaxLv : 5,
		SpAmount : [ 48, 56, 64, 72, 80 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.WM_POEMOFNETHERWORLD,3 ]
		]
	};

	exports[SKID.WM_RANDOMIZESPELL] = {
		Name: "WM_RANDOMIZESPELL",
		SkillName : "Randomize Spell",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.WM_POEMOFNETHERWORLD,1 ]
		]
	};

	exports[SKID.TF_THROWSTONE] = {
		Name: "TF_THROWSTONE",
		SkillName : "Throw Stone",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 2 ],
		bSeperateLv : false,
		AttackRange : [ 7 ]
	};

	exports[SKID.WM_MELODYOFSINK] = {
		Name: "WM_MELODYOFSINK",
		SkillName : "Melody of Sink",
		MaxLv : 5,
		SpAmount : [ 120, 130, 140, 150, 160 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.WM_SONG_OF_MANA,1 ]
		]
	};


	exports[SKID.MC_CARTREVOLUTION] = {
		Name: "MC_CARTREVOLUTION",
		SkillName : "Cart Revolution",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 12 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.SO_POISON_BUSTER] = {
		Name: "SO_POISON_BUSTER",
		SkillName : "Poison Buster",
		MaxLv : 5,
		SpAmount : [ 70, 90, 110, 130, 150 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SO_CLOUD_KILL,2 ]
		]
	};


	exports[SKID.SO_WARMER] = {
		Name: "SO_WARMER",
		SkillName : "Warmer",
		MaxLv : 5,
		SpAmount : [ 40, 52, 64, 76, 88 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SA_VOLCANO,1 ],
			[ SKID.SA_VIOLENTGALE,1 ]
		]
	};

	exports[SKID.SO_EL_CONTROL] = {
		Name: "SO_EL_CONTROL",
		SkillName : "Spirit Control",
		MaxLv : 4,
		SpAmount : [ 10, 10, 10, 10 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SO_EL_ANALYSIS,1 ]
		]
	};

	exports[SKID.MC_CHANGECART] = {
		Name: "MC_CHANGECART",
		SkillName : "Change Cart",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.SO_EL_CURE] = {
		Name: "SO_EL_CURE",
		SkillName : "Spirit Recovery",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.SO_EL_SYMPATHY,1 ]
		]
	};	

	exports[SKID.SO_EARTH_INSIGNIA] = {
		Name: "SO_EARTH_INSIGNIA",
		SkillName : "Earth Insignia",
		MaxLv : 3,
		SpAmount : [ 22, 30, 38 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SO_SUMMON_TERA,3 ]
		]		
	};

	exports[SKID.MC_LOUD] = {
		Name: "MC_LOUD",
		SkillName : "Loud Exclamation",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 8 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
	};

	exports[SKID.GN_BLOOD_SUCKER] = {
		Name: "GN_BLOOD_SUCKER",
		SkillName : "Blood Sucker",
		MaxLv : 5,
		SpAmount : [ 30, 35, 40, 45, 50 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.GN_S_PHARMACY,3 ]
		]
	};

	exports[SKID.AL_HOLYLIGHT] = {
		Name: "AL_HOLYLIGHT",
		SkillName : "Holy Light",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
	};

	exports[SKID.GN_MAKEBOMB] = {
		Name: "GN_MAKEBOMB",
		SkillName : "Create Bomb",
		MaxLv : 2,
		SpAmount : [ 5, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1 ],
		_NeedSkillList : [
			[ SKID.GN_MIX_COOKING,1 ]
		]
	};

	exports[SKID.GD_SOULCOLD] = {
		Name: "GD_SOULCOLD",
		SkillName : "Soul of Cold",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MG_ENERGYCOAT] = {
		Name: "MG_ENERGYCOAT",
		SkillName : "Energy Coat",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
	};

	exports[SKID.ALL_GUARDIAN_RECALL] = {
		Name: "ALL_GUARDIAN_RECALL",
		SkillName : "Guardian Recall",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
	};

	exports[SKID.MG_SIGHT] = {
		Name: "MG_SIGHT",
		SkillName : "Sight",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
	};
	
	exports[SKID.MS_BASH] = {
		Name: "MS_BASH",
		SkillName : "Bash",
		MaxLv : 10,
		SpAmount : [ 8, 8, 8, 8, 8, 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.ML_BRANDISH] = {
		Name: "ML_BRANDISH",
		SkillName : "Brandish Spear",
		MaxLv : 10,
		SpAmount : [ 12, 12, 12, 12, 12, 12, 12, 12, 12, 12 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ]
	};

	exports[SKID.MER_AUTOBERSERK] = {
		Name: "MER_AUTOBERSERK",
		SkillName : "Auto Berserk",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.EL_ZEPHYR] = {
		Name: "EL_ZEPHYR",
		SkillName : "Zephyr",
		MaxLv : 1,
		SpAmount : [ 80 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.EL_FIRE_ARROW] = {
		Name: "EL_FIRE_ARROW",
		SkillName : "Fire Arrow",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 6 ]
	};

	exports[SKID.EL_ROCK_CRUSHER_ATK] = {
		Name: "EL_ROCK_CRUSHER_ATK",
		SkillName : "Rock Crusher",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 5 ]
	};

	exports[SKID.MG_NAPALMBEAT] = {
		Name: "MG_NAPALMBEAT",
		SkillName : "Napalm Beat",
		MaxLv : 10,
		SpAmount : [ 9, 9, 9, 12, 12, 12, 15, 15, 15, 18 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.HAMI_CASTLE] = {
		Name: "HAMI_CASTLE",
		SkillName : "Castling",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.HVAN_CAPRICE] = {
		Name: "HVAN_CAPRICE",
		SkillName : "Caprice",
		MaxLv : 5,
		SpAmount : [ 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.MH_PAIN_KILLER] = {
		Name: "MH_PAIN_KILLER",
		SkillName : "Pain Killer",
		MaxLv : 5,
		SpAmount : [ 48, 52, 56, 60, 64 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MH_SILVERVEIN_RUSH] = {
		Name: "MH_SILVERVEIN_RUSH",
		SkillName : "Silver Bain Rush",
		MaxLv : 5,
		SpAmount : [ 10, 15, 20, 25, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MH_CBC] = {
		Name: "MH_CBC",
		SkillName : "Continual Break Combo",
		MaxLv : 5,
		SpAmount : [ 10, 20, 30, 40, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.GD_HAWKEYES] = {
		Name: "GD_HAWKEYES",
		SkillName : "Sharp Hawk Eyes",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MG_SAFETYWALL] = {
		Name: "MG_SAFETYWALL",
		SkillName : "Safety Wall",
		MaxLv : 10,
		SpAmount : [ 30, 30, 30, 35, 35, 35, 40, 40, 40, 40 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_NAPALMBEAT,7],
			[ SKID.MG_SOULSTRIKE,5 ]
		],
		NeedSkillList : new function(){ 
			this[JOBID.JT_PRIEST] = [
				[ SKID.PR_SANCTUARY,3 ],
				[ SKID.PR_ASPERSIO,4 ],
			]
		}
	};


	exports[SKID.MS_MAGNUM] = {
		Name: "MS_MAGNUM",
		SkillName : "Magnum Break",
		MaxLv : 10,
		SpAmount : [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.ML_SPIRALPIERCE] = {
		Name: "ML_SPIRALPIERCE",
		SkillName : "Spiral Pierce",
		MaxLv : 5,
		SpAmount : [ 18, 21, 24, 27, 30 ],
		bSeperateLv : false,
		AttackRange : [ 4, 4, 4, 4, 4 ]
	};

	exports[SKID.MER_DECAGI] = {
		Name: "MER_DECAGI",
		SkillName : "Decrease Agility",
		MaxLv : 10,
		SpAmount : [ 15, 17, 19, 21, 23, 25, 27, 29, 31, 33 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};
	
	exports[SKID.EL_SOLID_SKIN] = {
		Name: "EL_SOLID_SKIN",
		SkillName : "Solid Skin",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.EL_FIRE_BOMB] = {
		Name: "EL_FIRE_BOMB",	
		SkillName : "Fire Bomb",
		MaxLv : 1,
		SpAmount : [ 60 ],
		bSeperateLv : false,
		AttackRange : [ 6 ]
	};

	exports[SKID.EL_STONE_RAIN] = {
		Name: "EL_STONE_RAIN",
		SkillName : "Stone Rain",
		MaxLv : 1,
		SpAmount : [ 80 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.MG_SOULSTRIKE] = {
		Name: "MG_SOULSTRIKE",
		SkillName : "Soul Strike",
		MaxLv : 10,
		SpAmount : [ 18, 14, 24, 20, 30, 26, 36, 32, 42, 38 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_NAPALMBEAT,4 ]
		]
	};

	exports[SKID.RG_SNATCHER] = {
		Name: "RG_SNATCHER",
		SkillName : "Snatcher",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.TF_STEAL,1 ]
		]
	};

	exports[SKID.RG_STEALCOIN] = {
		Name: "RG_STEALCOIN",
		SkillName : "Steal Coin",
		MaxLv : 10,
		SpAmount : [ 15, 15, 15, 15, 15, 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RG_SNATCHER,4 ]
		]
	};

	exports[SKID.RG_BACKSTAP] = {
		Name: "RG_BACKSTAP",
		SkillName : "Back Stab",
		MaxLv : 10,
		SpAmount : [ 16, 16, 16, 16, 16, 16, 16, 16, 16, 16 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RG_STEALCOIN,4 ]
		]
	};

	exports[SKID.RG_TUNNELDRIVE] = {
		Name: "RG_TUNNELDRIVE",
		SkillName : "Tunnel Drive",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.TF_HIDING,1 ]
		]
	};

	exports[SKID.RG_RAID] = {
		Name: "RG_RAID",
		SkillName : "Raid",
		MaxLv : 5,
		SpAmount : [ 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RG_TUNNELDRIVE,2 ],
			[ SKID.RG_BACKSTAP,2 ]
		]

	};

	exports[SKID.RG_STRIPWEAPON] = {
		Name: "RG_STRIPWEAPON",
		SkillName : "Strip Weapon",
		MaxLv : 5,
		SpAmount : [ 17, 19, 21, 23, 25 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RG_STRIPARMOR,5 ]
		]
	};

	exports[SKID.RG_STRIPSHIELD] = {
		Name: "RG_STRIPSHIELD",
		SkillName : "Strip Shield",
		MaxLv : 5,
		SpAmount : [ 12, 14, 16, 18, 20 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RG_STRIPHELM,5 ]
		]
	};

	exports[SKID.RG_STRIPARMOR] = {
		Name: "RG_STRIPARMOR",
		SkillName : "Strip Armor",
		MaxLv : 5,
		SpAmount : [ 17, 19, 21, 23, 25 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RG_STRIPSHIELD,5 ]
		]
	};

	exports[SKID.RG_STRIPHELM] = {
		Name: "RG_STRIPHELM",
		SkillName : "Strip Helm",
		MaxLv : 5,
		SpAmount : [ 12, 14, 16, 18, 20 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RG_STEALCOIN,2 ]
		]
	};

	exports[SKID.RG_INTIMIDATE] = {
		Name: "RG_INTIMIDATE",
		SkillName : "Intimidate",
		MaxLv : 5,
		SpAmount : [ 13, 16, 19, 22, 25 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RG_BACKSTAP,4 ],
			[ SKID.RG_RAID,5 ]
		]

	};

	exports[SKID.RG_GRAFFITI] = {
		Name: "RG_GRAFFITI",
		SkillName : "Graffiti",
		MaxLv : 1,
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.RG_FLAGGRAFFITI,5 ]
		]
	};

	exports[SKID.GD_BATTLEORDER] = {
		Name: "GD_BATTLEORDER",
		SkillName : "Battle Orders",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};


	exports[SKID.RG_FLAGGRAFFITI] = {
		Name: "RG_FLAGGRAFFITI",
		SkillName : "Flag Graffiti",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RG_CLEANER,1 ]
		]
	};

	exports[SKID.RG_CLEANER] = {
		Name: "RG_CLEANER",
		SkillName : "Cleaner",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.RG_GANGSTER,1 ]
		]
	};

	exports[SKID.RG_GANGSTER] = {
		Name: "RG_GANGSTER",
		SkillName : "Gangster's Paradise",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.RG_STRIPSHIELD,3 ]
		]
	};

	exports[SKID.GD_ITEMEMERGENCYCALL] = {
		Name: "GD_ITEMEMERGENCYCALL",
		SkillName : "Item Emergency Call",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	exports[SKID.MG_COLDBOLT] = {
		Name: "MG_COLDBOLT",
		SkillName : "Cold Bolt",
		MaxLv : 10,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.RG_COMPULSION] = {
		Name: "RG_COMPULSION",
		SkillName : "Compulsion Discount",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RG_GANGSTER,1 ]
		]
	};

	exports[SKID.DE_GPAIN] = {
		Name: "DE_GPAIN",
		SkillName : "Mighty Pain Charge",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MS_BOWLINGBASH] = {
		Name: "MS_BOWLINGBASH",
		SkillName : "Bowling Bash",
		MaxLv : 10,
		SpAmount : [ 13, 14, 15, 16, 17, 18, 19, 20, 21, 22 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ]
	};

	exports[SKID.ML_DEFENDER] = {
		Name: "ML_DEFENDER",
		SkillName : "Defender",
		MaxLv : 5,
		SpAmount : [ 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.RG_PLAGIARISM] = {
		Name: "RG_PLAGIARISM",
		SkillName : "Plagiarism",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RG_INTIMIDATE,5 ],
		]
	};

	exports[SKID.SR_DRAGONCOMBO] = {
		Name: "SR_DRAGONCOMBO",
		SkillName : "Dragon Combo",
		MaxLv : 10,
		SpAmount : [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.MO_TRIPLEATTACK,5 ]
		]
	};

	exports[SKID.SC_STRIPACCESSARY] = {
		Name: "SC_STRIPACCESSARY",
		SkillName : "Strip Accessory",
		MaxLv : 5,
		SpAmount : [ 15, 18, 21, 24, 27 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.RG_STRIPWEAPON,1 ]
		]
	};

	exports[SKID.GD_GLORYWOUNDS] = {
		Name: "GD_GLORYWOUNDS",
		SkillName : "Wounds of Glory",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};


	exports[SKID.AM_AXEMASTERY] = {
		Name: "AM_AXEMASTERY",
		SkillName : "Axe Mastery",
		MaxLv : 10,	
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.GD_GUARDUP] = {
		Name: "GD_GUARDUP",
		SkillName : "Build up the Guardian",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	exports[SKID.GD_APPROVAL] = {
		Name: "GD_APPROVAL",
		SkillName : "Approval",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.MER_INCAGI] = {
		Name: "MER_INCAGI",
		SkillName : "Increase Agility",
		MaxLv : 10,	
		SpAmount : [ 18, 21, 24, 27, 30, 33, 36, 39, 42, 45 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.AM_LEARNINGPOTION] = {
		Name: "AM_LEARNINGPOTION",
		SkillName : "Learning Potion",
		MaxLv  : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MER_BLESSING] = {
		Name: "MER_BLESSING",
		SkillName : "Blessing",
		MaxLv : 10,
		SpAmount : [ 28, 32, 36, 40, 44, 48, 52, 56, 60, 64 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};
	
	exports[SKID.MER_KYRIE] = {
		Name: "MER_KYRIE",
		SkillName : "Kyrie Eleison",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 25, 25, 25, 30, 30, 30, 35 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.EL_STONE_SHIELD] = {
		Name: "EL_STONE_SHIELD",
		SkillName : "Stone Shield",
		MaxLv : 1,
		SpAmount : [ 60 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.AM_PHARMACY] = {
		Name: "AM_PHARMACY",
		SkillName : "Pharmacy",
		MaxLv : 10,
		SpAmount : [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AM_LEARNINGPOTION,5 ]
		]
	};

	exports[SKID.MER_ESTIMATION] = {
		Name: "MER_ESTIMATION",
		SkillName : "Monster Property",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.MER_LEXDIVINA] = {
		Name: "MER_LEXDIVINA",
		SkillName : "Lex Divina",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 18, 16, 14, 12, 10 ],
		bSeperateLv : false,
		AttackRange : [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ]
	};

	exports[SKID.MER_SCAPEGOAT] = {
		Name: "MER_SCAPEGOAT",
		SkillName : "Scapegoat",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.AM_DEMONSTRATION] = {
		Name: "AM_DEMONSTRATION",
		SkillName : "Demonstration",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.AM_PHARMACY,4 ]
		]
	};

	exports[SKID.MER_PROVOKE] = {
		Name: "MER_PROVOKE",
		SkillName : "Provoke",
		MaxLv : 10,
		SpAmount : [ 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.MER_CRASH] = {
		Name: "MER_CRASH",
		SkillName : "Crash",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
	};

	exports[SKID.MER_SIGHT] = {
		Name: "MER_SIGHT",
		SkillName : "Sight",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.AM_ACIDTERROR] = {
		Name: "AM_ACIDTERROR",
		SkillName : "Acid Terror",
		MaxLv : 5,
		SpAmount : [ 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.AM_PHARMACY,5 ]
		]
	};

	exports[SKID.LG_SHIELDPRESS] = {
		Name: "LG_SHIELDPRESS",
		SkillName : "Shield Press",
		MaxLv : 5,
		SpAmount : [ 10, 12, 14, 16, 18 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.CR_SHIELDCHARGE,3 ]
		]
	};

	exports[SKID.ML_AUTOGUARD] = {
		Name: "ML_AUTOGUARD",
		SkillName : "Auto Guard",
		MaxLv : 10,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.ML_PIERCE] = {
		Name: "ML_PIERCE",
		SkillName : "Pierce",
		MaxLv : 10,
		SpAmount : [ 7, 7, 7, 7, 7, 7, 7, 7, 7, 7 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ]
	};

	exports[SKID.AM_POTIONPITCHER] = {
		Name: "AM_POTIONPITCHER",
		SkillName : "Potion Pitcher",
		MaxLv : 5,
		SpAmount : [ 1, 1, 1, 1, 1 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.AM_PHARMACY,3 ]
		]		
	};

	exports[SKID.MA_FREEZINGTRAP] = {
		Name: "MA_FREEZINGTRAP",
		SkillName : "Freezing Trap",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ],
	};


	exports[SKID.MA_SKIDTRAP] = {
		Name: "MA_SKIDTRAP",
		SkillName : "Skid Trap",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ],
	};

	exports[SKID.MA_SHOWER] = {
		Name: "MA_SHOWER",
		SkillName : "Arrow Shower",
		MaxLv : 10,
		SpAmount : [ 15, 15, 15, 15, 15, 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.AM_CANNIBALIZE] = {
		Name: "AM_CANNIBALIZE",
		SkillName : "Bio Cannibalize",
		MaxLv : 5,
		SpAmount : [ 20, 20, 20, 20, 20 ],
		bSeperateLv : true,
		AttackRange : [ 4, 4, 4, 4, 4 ],
		_NeedSkillList : [
			[ SKID.AM_PHARMACY,6 ]
		]		
	};

	exports[SKID.MA_DOUBLE] = {
		Name: "MA_DOUBLE",
		SkillName : "Double Strafing",
		MaxLv : 10,
		SpAmount : [ 12, 12, 12, 12, 12, 12, 12, 12, 12, 12 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.MS_BERSERK] = {
		Name: "MS_BERSERK",
		SkillName : "Berserk",
		MaxLv : 1,
		SpAmount : [ 200 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.MS_REFLECTSHIELD] = {
		Name: "MS_REFLECTSHIELD",
		SkillName : "Reflect Shield",
		MaxLv : 10,
		SpAmount : [ 35, 40, 45, 50, 55, 60, 65, 70, 75, 80 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.AM_SPHEREMINE] = {
		Name: "AM_SPHEREMINE",
		SkillName : "Sphere Mine",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AM_PHARMACY,2 ]
		]
	};

	exports[SKID.MS_PARRYING] = {
		Name: "MS_PARRYING",
		SkillName : "Parrying",
		MaxLv : 10,
		SpAmount : [ 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MH_PYROCLASTIC] = {
		Name: "MH_PYROCLASTIC",
		SkillName : "Pyroclastic",
		MaxLv : 5,
		SpAmount : [ 20, 28, 36, 44, 52 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MH_GRANITIC_ARMOR] = {
		Name: "MH_GRANITIC_ARMOR",
		SkillName : "Granitic Armor",
		MaxLv : 5,
		SpAmount : [ 54, 58, 62, 66, 70 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};


	exports[SKID.AM_CP_WEAPON] = {
		Name: "AM_CP_WEAPON",
		SkillName : "Chemical Protection Weapon",
		MaxLv : 5,
		SpAmount : [ 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AM_CP_ARMOR,3 ]
		]
	};

	exports[SKID.MH_MAGMA_FLOW] = {
		Name: "MH_MAGMA_FLOW",
		SkillName : "Magma Flow",
		MaxLv : 5,
		SpAmount : [ 34, 38, 42, 46, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.EL_BLAST] = {
		Name: "EL_BLAST",
		SkillName : "Blast",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};
	
	exports[SKID.MH_TINDER_BREAKER] = {
		Name: "MH_TINDER_BREAKER",
		SkillName : "Tinder Breaker",
		MaxLv : 5,
		SpAmount : [ 20, 25, 30, 35, 40 ],
		bSeperateLv : true,
		AttackRange : [ 3, 4, 5, 6, 7 ]
	};

	exports[SKID.AM_CP_SHIELD] = {
		Name: "AM_CP_SHIELD",
		SkillName : "Chemical Protection Shield",
		MaxLv : 5,
		SpAmount : [ 25, 25, 25, 25, 25 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AM_CP_HELM,3 ]
		]
	};

	exports[SKID.MH_HEILIGE_STANGE] = {
		Name: "MH_HEILIGE_STANGE",
		SkillName : "Holy Pole",
		MaxLv : 5,
		SpAmount : [ 60, 68, 76, 84, 100 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.MH_GOLDENE_FERSE] = {
		Name: "MH_GOLDENE_FERSE",
		SkillName : "Golden Heel",
		MaxLv : 5,
		SpAmount : [ 60, 65, 70, 75, 80 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
	};

	exports[SKID.NPC_ALLHEAL] = {
		Name: "NPC_ALLHEAL",
		SkillName : "All Heal",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.AM_CP_ARMOR] = {
		Name: "AM_CP_ARMOR",
		SkillName : "Chemical Protection Armor",
		MaxLv : 5,
		SpAmount : [ 25, 25, 25, 25, 25 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AM_CP_SHIELD,3 ]
		]
	};

	exports[SKID.EL_PETROLOGY] = {
		Name: "EL_PETROLOGY",
		SkillName : " Petrology",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};
	
	exports[SKID.MH_SONIC_CRAW] = {
		Name: "MH_SONIC_CRAW",
		SkillName : "Sonic Claw",
		MaxLv : 5,
		SpAmount : [ 20, 25, 30, 35, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MH_SILENT_BREEZE] = {
		Name: "MH_SILENT_BREEZE",
		SkillName : "Silent Breeze",
		MaxLv : 5,
		SpAmount : [ 45, 54, 63, 72, 81 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 7, 7, 9 ],
	};

	exports[SKID.AM_CP_HELM] = {
		Name: "AM_CP_HELM",
		SkillName : "Chemical Protection Helm",
		MaxLv : 5,
		SpAmount : [ 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AM_PHARMACY,2 ]
		]
	};

	exports[SKID.MH_ERASER_CUTTER] = {
		Name: "MH_ERASER_CUTTER",
		SkillName : "Eraser Cutter",
		MaxLv : 5,
		SpAmount : [ 25, 30, 35, 40, 45 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ]
	};

	exports[SKID.MH_OVERED_BOOST] = {
		Name: "MH_OVERED_BOOST",
		SkillName : "Overed Boost",
		MaxLv : 5,
		SpAmount : [ 70, 90, 110, 130, 150 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MH_LIGHT_OF_REGENE] = {
		Name: "MH_LIGHT_OF_REGENE",
		SkillName : "Light of Regene",
		MaxLv : 5,
		SpAmount : [ 40, 50, 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.AM_BIOETHICS] = {
		Name: "AM_BIOETHICS",
		SkillName : "Bioethics",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.MH_POISON_MIST] = {
		Name: "MH_POISON_MIST",
		SkillName : "Poison Mist",
		MaxLv : 5,
		SpAmount : [ 65, 75, 85, 95, 105 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 5, 5, 5 ]
	};

	exports[SKID.MH_SUMMON_LEGION] = {
		Name: "MH_SUMMON_LEGION",
		SkillName : "Summon Legion",
		MaxLv : 5,
		SpAmount : [ 60, 80, 100, 120, 140 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.HVAN_EXPLOSION] = {
		Name: "HVAN_EXPLOSION",
		SkillName : "Bio Explosion",
		MaxLv : 3,		
		SpAmount : [ 1, 1, 1 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ]
	};

	exports[SKID.AM_BIOTECHNOLOGY] = {
		Name: "AM_BIOTECHNOLOGY",
		SkillName : "Biotechnology",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.SA_CREATECON] = {
		Name: "SA_CREATECON",
		SkillName : "Create Elemental Converter",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.EL_WILD_STORM] = {
		Name: "EL_WILD_STORM",
		SkillName : "Wild Storm",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.MG_FROSTDIVER] = {
		Name: "MG_FROSTDIVER",
		SkillName : "Frost Diver",
		MaxLv : 10,
		SpAmount : [ 25, 24, 23, 22, 21, 20, 19, 18, 17, 16 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_COLDBOLT,5 ]
		]
	};

	exports[SKID.AM_CREATECREATURE] = {
		Name: "AM_CREATECREATURE",
		SkillName : "Create Creature",
		MaxLv : 5,
		SpAmount : [ 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.HFLI_SBR44] = {
		Name: "HFLI_SBR44",
		SkillName : "S.B.R.44",
		MaxLv : 3,
		SpAmount : [ 1, 1, 1 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9 ]
	};

	exports[SKID.HFLI_FLEET] = {
		Name: "HFLI_FLEET",
		SkillName : "Fleet Move",
		MaxLv : 5,
		SpAmount : [ 30, 40, 50, 60, 70 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.HAMI_BLOODLUST] = {
		Name: "HAMI_BLOODLUST",
		SkillName : "Blood Lust",
		MaxLv : 3,
		SpAmount : [ 120, 120, 120 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ]
	};

	exports[SKID.AM_CULTIVATION] = {
		Name: "AM_CULTIVATION",
		SkillName : "Cultivation",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.HAMI_SKIN] = {
		Name: "HAMI_SKIN",
		SkillName : "Adamantium Skin",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.EL_CURSED_SOIL] = {
		Name: "EL_CURSED_SOIL",
		SkillName : "Cursed Soil",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.HLIF_CHANGE] = {
		Name: "HLIF_CHANGE",
		SkillName : "Mental Change",
		MaxLv : 3,
		SpAmount : [ 100, 100, 100 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	exports[SKID.AM_FLAMECONTROL] = {
		Name: "AM_FLAMECONTROL",
		SkillName : "Flame Control",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.HLIF_AVOID] = {
		Name: "HLIF_AVOID",
		SkillName : "Emergency Avoid",
		MaxLv : 5,
		SpAmount : [ 20, 25, 30, 35, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.LG_OVERBRAND] = {
		Name: "LG_OVERBRAND",
		SkillName : "Overbrand",
		MaxLv : 5,
		SpAmount : [ 20, 30, 40, 50, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.LG_MOONSLASHER,3 ],
			[ SKID.LG_PINPOINTATTACK,1 ]
		]
	};

	exports[SKID.ALL_ODINS_RECALL] = {
		Name: "ALL_ODINS_RECALL",
		SkillName : "Odin's Recall",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.AM_CALLHOMUN] = {
		Name: "AM_CALLHOMUN",
		SkillName : "Call Homunculus",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.AM_REST,1 ]
		]
	};

	exports[SKID.SR_RIDEINLIGHTNING] = {
		Name: "SR_RIDEINLIGHTNING",
		SkillName : "Ride in Lightning",
		MaxLv : 5,
		SpAmount : [ 40, 50, 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.MO_FINGEROFFENSIVE,3 ]
		]
	};

	exports[SKID.SR_HOWLINGOFLION] = {
		Name: "SR_HOWLINGOFLION",
		SkillName : "Howling of Lion",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SR_RIDEINLIGHTNING,3 ],
			[ SKID.SR_ASSIMILATEPOWER,1 ]
		]
	};

	exports[SKID.SR_TIGERCANNON] = {
		Name: "SR_TIGERCANNON",
		SkillName : "Tiger Cannon",
		MaxLv : 10,
		SpAmount : [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SR_FALLENEMPIRE,3 ]
		]
	};

	exports[SKID.AM_REST] = {
		Name: "AM_REST",
		SkillName : "Rest",
		MaxLv : 1,
		SpAmount : [ 50 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.AM_BIOETHICS,1 ]
		]
	};

	exports[SKID.GN_CHANGEMATERIAL] = {
		Name: "GN_CHANGEMATERIAL",
		SkillName : "Change Material",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.GN_SLINGITEM] = {
		Name: "GN_SLINGITEM",
		SkillName : "Sling Item",
		MaxLv : 1,
		SpAmount : [ 4 ],
		bSeperateLv : false,
		AttackRange : [ 11 ],
		_NeedSkillList : [
			[ SKID.GN_CHANGEMATERIAL,1 ]
		]
	};

	exports[SKID.GN_MANDRAGORA] = {
		Name: "GN_MANDRAGORA",
		SkillName : "Howling of Mandragora",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.GN_HELLS_PLANT,3 ]
		]
	};

	exports[SKID.AM_DRILLMASTER] = {
		Name: "AM_DRILLMASTER",
		SkillName : "Drillmaster",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.GN_HELLS_PLANT] = {
		Name: "GN_HELLS_PLANT",
		SkillName : "Hell's Plant",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.GN_BLOOD_SUCKER,3 ]
		]
	};

	exports[SKID.GN_FIRE_EXPANSION] = {
		Name: "GN_FIRE_EXPANSION",
		SkillName : "Fire Expansion",
		MaxLv : 5,
		SpAmount : [ 30, 35, 40, 45, 50 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.GN_DEMONIC_FIRE,3 ]
		]
	};

	exports[SKID.GN_DEMONIC_FIRE] = {
		Name: "GN_DEMONIC_FIRE",
		SkillName : "Demonic Fire",
		MaxLv : 5,
		SpAmount : [ 24, 28, 32, 36, 40 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.GN_SPORE_EXPLOSION,3 ]
		]
	};
	exports[SKID.AM_HEALHOMUN] = {
		Name: "AM_HEALHOMUN",
		SkillName : "Heal Homunculus",
		MaxLv : 10,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
	};

	exports[SKID.GN_WALLOFTHORN] = {
		Name: "GN_WALLOFTHORN",
		SkillName : "Wall of Thorns",
		MaxLv : 5,
		SpAmount : [ 40, 50, 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.GN_THORNS_TRAP,3 ]
		]
	};

	exports[SKID.SR_CRESCENTELBOW] = {
		Name: "SR_CRESCENTELBOW",
		SkillName : "Crescent Elbow",
		MaxLv : 5,
		SpAmount : [ 80, 80, 80, 80, 80 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SR_SKYNETBLOW,1 ]
		]
	};

	exports[SKID.GN_CARTBOOST] = {
		Name: "GN_CARTBOOST",
		SkillName : "Cart Boost",
		MaxLv : 5,
		SpAmount : [ 20, 24, 28, 32, 36 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.GN_REMODELING_CART,3 ]
		]
	};

	exports[SKID.AM_RESURRECTHOMUN] = {
		Name: "AM_RESURRECTHOMUN",
		SkillName : "Resurrect Homunculus",
		MaxLv : 5,
		SpAmount : [ 74, 68, 62, 56, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AM_CALLHOMUN,1 ]
		]
	};

	exports[SKID.GN_CARTCANNON] = {
		Name: "GN_CARTCANNON",
		SkillName : "Cart Cannon",
		MaxLv : 5,
		SpAmount : [ 40, 42, 46, 48, 50 ],
		bSeperateLv : true,
		AttackRange : [ 7, 8, 9, 10, 11 ],
		_NeedSkillList : [
			[ SKID.GN_REMODELING_CART,2 ]
		]
	};

	exports[SKID.GN_CART_TORNADO] = {
		Name: "GN_CART_TORNADO",
		SkillName : "Cart Tornado",
		MaxLv : 5,
		SpAmount : [ 30, 30, 30, 30, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.GN_REMODELING_CART,1 ]
		]
	};

	exports[SKID.GN_TRAINING_SWORD] = {
		Name: "GN_TRAINING_SWORD",
		SkillName : "Sword Training",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
	};

	exports[SKID.CR_TRUST] = {
		Name: "CR_TRUST",
		SkillName : "Faith",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.EL_WATER_SCREW_ATK] = {
		Name: "EL_WATER_SCREW_ATK",
		SkillName : "Water Screw",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.EL_WATER_SCREW] = {
		Name: "EL_WATER_SCREW",
		SkillName : "Water Screw",
		MaxLv : 1,
		SpAmount : [ 60 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.EL_ICE_NEEDLE] = {
		Name: "EL_ICE_NEEDLE",
		SkillName : "Ice Needle",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.CR_AUTOGUARD] = {
		Name: "CR_AUTOGUARD",
		SkillName : "Auto Guard",
		MaxLv : 10,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.EL_FIRE_WAVE_ATK] = {
		Name: "EL_FIRE_WAVE_ATK",
		SkillName : "Fire Wave",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 6 ]
	};

	exports[SKID.EL_FIRE_WAVE] = {
		Name: "EL_FIRE_WAVE",
		SkillName : "Fire Wave",
		MaxLv : 1,
		SpAmount : [ 80 ],
		bSeperateLv : false,
		AttackRange : [ 6 ]
	};

	exports[SKID.EL_FIRE_BOMB_ATK] = {
		Name: "EL_FIRE_BOMB_ATK",
		SkillName : "Fire Bomb",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 6 ]
	};

	exports[SKID.CR_SHIELDCHARGE] = {
		Name: "CR_SHIELDCHARGE",
		SkillName : "Shield Charge",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.CR_AUTOGUARD,5 ]
		]
	};

	exports[SKID.EL_UPHEAVAL] = {
		Name: "EL_UPHEAVAL",
		SkillName : "Upheaval",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.HAMI_DEFENCE] = {
		Name: "HAMI_DEFENCE",
		SkillName : "Defense",
		MaxLv : 5,
		SpAmount : [ 20, 25, 30, 35, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.HVAN_CHAOTIC] = {
		Name: "HVAN_CHAOTIC",
		SkillName : "Chaotic Benediction",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.CR_SHIELDBOOMERANG] = {
		Name: "CR_SHIELDBOOMERANG",
		SkillName : "Shield Boomerang",
		MaxLv : 5,
		SpAmount : [ 12, 12, 12, 12, 12 ],
		bSeperateLv : false,
		AttackRange : [ 3, 5, 7, 9, 11 ],
		_NeedSkillList : [
			[ SKID.CR_SHIELDCHARGE,3 ]
		]
	};

	exports[SKID.MH_MIDNIGHT_FRENZY] = {
		Name: "MH_MIDNIGHT_FRENZY",
		SkillName : "Midnight Frenzy",
		MaxLv : 5,
		SpAmount : [ 8, 16, 24, 32, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MH_EQC] = {
		Name: "MH_EQC",
		SkillName : "Eternal Quick Combo",
		MaxLv : 5,
		SpAmount : [ 24, 28, 32, 36, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.EL_GUST] = {
		Name: "EL_GUST",
		SkillName : "Gust",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.CR_REFLECTSHIELD] = {
		Name: "CR_REFLECTSHIELD",
		SkillName : "Reflect Shield",
		MaxLv : 10,
		SpAmount : [ 35, 40, 45, 50, 55, 60, 65, 70, 75, 80 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.CR_SHIELDBOOMERANG,3 ]
		]
	};

	exports[SKID.EL_CHILLY_AIR] = {
		Name: "EL_CHILLY_AIR",
		SkillName : "Cool Air",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.EL_COOLER] = {
		Name: "EL_COOLER",
		SkillName : "Cooler",
		MaxLv : 0,
		SpAmount : [ ],
		bSeperateLv : false,
		AttackRange : [ ]
	};

	exports[SKID.GD_REGENERATION] = {
		Name: "GD_REGENERATION",
		SkillName : "Regeneration",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	exports[SKID.CR_HOLYCROSS] = {
		Name: "CR_HOLYCROSS",
		SkillName : "Holy Cross",
		MaxLv : 10,
		SpAmount : [ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.CR_TRUST,7 ]
		]
	};

	exports[SKID.SO_CLOUD_KILL] = {
		Name: "SO_CLOUD_KILL",
		SkillName : "Cloud Kill",
		MaxLv : 5,
		SpAmount : [ 48, 56, 64, 70, 78 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.WZ_HEAVENDRIVE,5 ]
		]
	};

	exports[SKID.EL_AQUAPLAY] = {
		Name: "EL_AQUAPLAY",
		SkillName : "Aqua Play",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.SO_EL_ACTION] = {
		Name: "SO_EL_ACTION",
		SkillName : "Elemental Action",
		MaxLv : 1,
		SpAmount : [ 50 ],
		bSeperateLv : false,
		AttackRange : [ 5 ],
		_NeedSkillList : [
			[ SKID.SO_EL_CONTROL,3 ]
		]
	};

	exports[SKID.CR_GRANDCROSS] = {
		Name: "CR_GRANDCROSS",
		SkillName : "Grand Cross",
		MaxLv : 10,
		SpAmount : [ 37, 44, 51, 58, 65, 72, 78, 86, 93, 100 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.CR_TRUST,10 ],
			[ SKID.CR_HOLYCROSS,6 ]
		]
	};

	exports[SKID.SO_WATER_INSIGNIA] = {
		Name: "SO_WATER_INSIGNIA",
		SkillName : "Water Insignia",
		MaxLv : 3,
		SpAmount : [ 22, 30, 38 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SO_SUMMON_AQUA,3 ]
		]
	};

	exports[SKID.SR_RAISINGDRAGON] = {
		Name: "SR_RAISINGDRAGON",
		SkillName : "Raising Dragon",
		MaxLv : 10,
		SpAmount : [ 120, 120, 120, 120, 120, 120, 120, 120, 120, 120 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SR_RAMPAGEBLASTER,3 ],
			[ SKID.SR_GENTLETOUCH_ENERGYGAIN,3 ]
		]
	};

	exports[SKID.SR_POWERVELOCITY] = {
		Name: "SR_POWERVELOCITY",
		SkillName : "Power Velocity",
		MaxLv : 1,
		SpAmount : [ 50 ],
		bSeperateLv : false,
		AttackRange : [ 3 ],
		_NeedSkillList : [
			[ SKID.MO_CALLSPIRITS,5 ]
		]
	};

	exports[SKID.CR_DEVOTION] = {
		Name: "CR_DEVOTION",
		SkillName : "Devotion",
		MaxLv : 5,
		SpAmount : [ 25, 25, 25, 25, 25 ],
		bSeperateLv : false,
		AttackRange : [ 7, 8, 9, 10, 11 ],
		_NeedSkillList : [
			[ SKID.CR_GRANDCROSS,4 ],
			[ SKID.CR_REFLECTSHIELD,5 ]
		]
	};

	exports[SKID.SO_SUMMON_AQUA] = {
		Name: "SO_SUMMON_AQUA",
		SkillName : "Summon Aqua",
		MaxLv : 3,
		SpAmount : [ 100, 150, 200 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SO_EL_CONTROL,1 ],
			[ SKID.SO_DIAMONDDUST,3 ]
		]
	};

	exports[SKID.NV_BASIC] = {
		Name: "NV_BASIC",
		SkillName : "Basic Skill",
		MaxLv : 9,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MG_STONECURSE] = {
		Name: "MG_STONECURSE",
		SkillName : "Stone Curse",
		MaxLv : 10,
		SpAmount : [ 25, 24, 23, 22, 21, 20, 19, 18, 17, 16 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ]
	};

	exports[SKID.CR_PROVIDENCE] = {
		Name: "CR_PROVIDENCE",
		SkillName : "Providence",
		MaxLv : 5,
		SpAmount : [ 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.AL_DP,5 ],
			[ SKID.AL_HEAL,5 ]
		]
	};

	exports[SKID.AB_EUCHARISTICA] = {
		Name: "AB_EUCHARISTICA",
		SkillName : "Eucharistica",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AB_EXPIATIO,1 ],
			[ SKID.AB_EPICLESIS,1 ]
		]
	};

	exports[SKID.CR_DEFENDER] = {
		Name: "CR_DEFENDER",
		SkillName : "Defender",
		MaxLv : 5,
		SpAmount : [ 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.CR_SHIELDBOOMERANG,1 ]
		]
	};

	exports[SKID.AB_SILENTIUM] = {
		Name: "AB_SILENTIUM",
		SkillName : "Silentium",
		MaxLv : 5,
		SpAmount : [ 64, 68, 72, 76, 80 ],
		bSeperateLv : true,
		AttackRange : [ 4, 5, 6, 7, 8 ],
		_NeedSkillList : [
			[ SKID.AB_CLEARANCE,1 ]
		]
	};

	exports[SKID.CR_SPEARQUICKEN] = {
		Name: "CR_SPEARQUICKEN",
		SkillName : "Spear Quicken",
		MaxLv : 10,
		SpAmount : [ 24, 28, 32, 36, 40, 44, 48, 52, 56, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.KN_SPEARMASTERY,10 ]
		]
	};

	exports[SKID.SO_SUMMON_TERA] = {
		Name: "SO_SUMMON_TERA",
		SkillName : "Summon Tera",
		MaxLv : 3,
		SpAmount : [ 100, 150, 200 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SO_EL_CONTROL,1 ],
			[ SKID.SO_EARTHGRAVE,3 ],
		]
	};

	exports[SKID.MO_IRONHAND] = {
		Name: "MO_IRONHAND",
		SkillName : "Iron Hand",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AL_DEMONBANE,10 ],
			[ SKID.AL_DP,10 ]
		]
	};

	exports[SKID.SO_SUMMON_VENTUS] = {
		Name: "SO_SUMMON_VENTUS",
		SkillName : "Summon Ventus",
		MaxLv : 3,
		SpAmount : [ 100, 150, 200 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SO_EL_CONTROL,1 ],
			[ SKID.SO_VARETYR_SPEAR,3 ]
		]
	};

	exports[SKID.MO_SPIRITSRECOVERY] = {
		Name: "MO_SPIRITSRECOVERY",
		SkillName : "Spirits Recovery",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.MO_BLADESTOP,2 ]
		]
	};

	exports[SKID.SO_EL_ANALYSIS] = {
		Name: "SO_EL_ANALYSIS",
		SkillName : "Four Spirity Analysis",
		MaxLv : 2,
		SpAmount : [ 10, 20 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1 ],
		_NeedSkillList : [
			[ SKID.SA_FLAMELAUNCHER,1 ],
			[ SKID.SA_FROSTWEAPON,1 ],
			[ SKID.SA_LIGHTNINGLOADER,1 ],
			[ SKID.SA_SEISMICWEAPON,1 ]
		]
	};

	exports[SKID.MO_CALLSPIRITS] = {
		Name: "MO_CALLSPIRITS",
		SkillName : "Call Spirits",
		MaxLv : 5,
		SpAmount : [ 8, 8, 8, 8, 8 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.MO_IRONHAND,2 ]
		]
	};

	exports[SKID.SO_VARETYR_SPEAR] = {
		Name: "SO_VARETYR_SPEAR",
		SkillName : "Varetyr Spear",
		MaxLv : 5,
		SpAmount : [ 55, 62, 69, 76, 83 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SA_SEISMICWEAPON,1 ],
			[ SKID.SA_VIOLENTGALE,4 ]
		]
	};

	exports[SKID.MO_ABSORBSPIRITS] = {
		Name: "MO_ABSORBSPIRITS",
		SkillName : "Absorb Spirits",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SKID.MO_CALLSPIRITS,5 ]
		]
	};

	exports[SKID.SO_VACUUM_EXTREME] = {
		Name: "SO_VACUUM_EXTREME",
		SkillName : "Vacuum Extreme",
		MaxLv : 5,
		SpAmount : [ 34, 42, 50, 58, 66 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SA_LANDPROTECTOR,2 ]
		]
	};

	exports[SKID.MO_TRIPLEATTACK] = {
		Name: "MO_TRIPLEATTACK",
		SkillName : "Triple Attack",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.MO_DODGE,5 ]
		]
	};

	exports[SKID.EL_POWER_OF_GAIA] = {
		Name: "EL_POWER_OF_GAIA",
		SkillName : "Power of Gaia",
		MaxLv : 1,
		SpAmount : [ 80 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.MO_BODYRELOCATION] = {
		Name: "MO_BODYRELOCATION",
		SkillName : "Body Relocation",
		MaxLv : 1,
		SpAmount : [ 14 ],
		bSeperateLv : false,
		AttackRange : [ 18 ],
		_NeedSkillList : [
			[ SKID.MO_SPIRITSRECOVERY,2 ],
			[ SKID.MO_EXTREMITYFIST,3 ],
			[ SKID.MO_STEELBODY,3 ]
		]
	};

	exports[SKID.SR_GENTLETOUCH_ENERGYGAIN] = {
		Name: "SR_GENTLETOUCH_ENERGYGAIN",
		SkillName : "Gentle Touch - Energy Gain",
		MaxLv : 5,
		SpAmount : [ 40, 50, 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SR_GENTLETOUCH_QUIET,3 ]
		]
	};

	exports[SKID.MO_DODGE] = {
		Name: "MO_DODGE",
		SkillName : "Dodge",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.MO_IRONHAND,5 ],
			[ SKID.MO_CALLSPIRITS,5 ]
		]		
	};

	exports[SKID.SO_EARTHGRAVE] = {
		Name: "SO_EARTHGRAVE",
		SkillName : "Earth Grave",
		MaxLv : 5,
		SpAmount : [ 62, 70, 78, 86, 94 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.WZ_EARTHSPIKE,5 ]
		]
	};

	exports[SKID.MO_INVESTIGATE] = {
		Name: "MO_INVESTIGATE",
		SkillName : "Investigate",
		MaxLv : 5,
		SpAmount : [ 10, 14, 17, 19, 20 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.MO_CALLSPIRITS,5 ]
		]		
	};

	exports[SKID.SO_SPELLFIST] = {
		Name: "SO_SPELLFIST",
		SkillName : "Spell Fist",
		MaxLv : 5,
		SpAmount : [ 40, 44, 48, 52, 56 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SA_AUTOSPELL,4 ]
		]
	};

	exports[SKID.MO_FINGEROFFENSIVE] = {
		Name: "MO_FINGEROFFENSIVE",
		SkillName : "Finger Offensive",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MO_INVESTIGATE,3 ]
		]		
	};

	exports[SKID.SO_ELECTRICWALK] = {
		Name: "SO_ELECTRICWALK",
		SkillName : "Electric Walk",
		MaxLv : 5,
		SpAmount : [ 30, 34, 38, 42, 46 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SA_VIOLENTGALE,1 ]
		]
	};

	exports[SKID.MO_STEELBODY] = {
		Name: "MO_STEELBODY",
		SkillName : "Steel Body",
		MaxLv : 5,
		SpAmount : [ 200, 200, 200, 200, 200 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.MO_COMBOFINISH,3 ]
		]			
	};

	exports[SKID.WM_UNLIMITED_HUMMING_VOICE] = {
		Name: "WM_UNLIMITED_HUMMING_VOICE",
		SkillName : "Unlimited Humming Voice",
		MaxLv : 5,
		SpAmount : [ 120, 130, 140, 150, 160 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.WM_BEYOND_OF_WARCRY,1 ],
			[ SKID.WM_SOUND_OF_DESTRUCTION,1 ]
		]
	};

	exports[SKID.MO_BLADESTOP] = {
		Name: "MO_BLADESTOP",
		SkillName : "Blade Stop",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.MO_DODGE,5 ]
		]	
	};

	exports[SKID.WA_SWING_DANCE] = {
		Name: "WA_SWING_DANCE",
		SkillName : "Swing Dance",
		MaxLv : 5,
		SpAmount : [ 96, 112, 128, 144, 160 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.WM_LULLABY_DEEPSLEEP,1 ]
		]
	};

	exports[SKID.MO_EXPLOSIONSPIRITS] = {
		Name: "MO_EXPLOSIONSPIRITS",
		SkillName : "Critical Explosion",
		MaxLv : 5,
		SpAmount : [ 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.MO_ABSORBSPIRITS,1 ]
		]	
	};

	exports[SKID.WM_SATURDAY_NIGHT_FEVER] = {
		Name: "WM_SATURDAY_NIGHT_FEVER",
		SkillName : "Saturday Night Fever",
		MaxLv : 5,
		SpAmount : [ 150, 160, 170, 180, 190 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.WM_DANCE_WITH_WUG,1 ]
		]
	};

	exports[SKID.MO_EXTREMITYFIST] = {
		Name: "MO_EXTREMITYFIST",
		SkillName : "Asura Strike",
		MaxLv : 5,
		SpAmount : [ 1, 1, 1, 1, 1 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.MO_EXPLOSIONSPIRITS,3 ],
			[ SKID.MO_FINGEROFFENSIVE,3 ]
		]	
	};

	exports[SKID.MG_FIREBALL] = {
		Name: "MG_FIREBALL",
		SkillName : "Fire Ball",
		MaxLv : 10,
		SpAmount : [ 25, 25, 25, 25, 25, 25, 25, 25, 25, 25 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_FIREBOLT, 4 ]
		]
	};

	exports[SKID.MO_CHAINCOMBO] = {
		Name: "MO_CHAINCOMBO",
		SkillName : "Chain Combo",
		MaxLv : 5,
		SpAmount : [ 11, 12, 13, 14, 15 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.MO_TRIPLEATTACK,5 ]
		]	
	};

	exports[SKID.WM_SOUND_OF_DESTRUCTION] = {
		Name: "WM_SOUND_OF_DESTRUCTION",
		SkillName : "Sound of Destruction",
		MaxLv : 5,
		SpAmount : [ 50, 60, 70, 80, 90 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.WM_SATURDAY_NIGHT_FEVER,3 ],
			[ SKID.WM_MELODYOFSINK,3 ]
		]
	};

	exports[SKID.MO_COMBOFINISH] = {
		Name: "MO_COMBOFINISH",
		SkillName : "Combo Finish",
		MaxLv : 5,
		SpAmount : [ 11, 12, 13, 14, 15 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.MO_CHAINCOMBO,3 ]
		]	
	};

	exports[SKID.WM_DANCE_WITH_WUG] = {
		Name: "WM_DANCE_WITH_WUG",
		SkillName : "Dance with a Warg",
		MaxLv : 5,
		SpAmount : [ 120, 140, 160, 180, 200 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		NeedSkillList : new function(){
			this[JOBID.JT_MINSTREL] = [
				[ SKID.MI_HARMONIZE,1 ],
				[ SKID.MI_RUSH_WINDMILL,1 ],
				[ SKID.MI_ECHOSONG,1 ]
			];
			this[JOBID.JT_WANDERER] = [
				[ SKID.WA_SWING_DANCE,1 ],
				[ SKID.WA_SYMPHONY_OF_LOVER,1 ],
				[ SKID.WA_MOONLIT_SERENADE,1 ]
			]
		}
	};

	exports[SKID.SA_ADVANCEDBOOK] = {
		Name: "SA_ADVANCEDBOOK",
		SkillName : "Advanced Book",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.WM_SONG_OF_MANA] = {
		Name: "WM_SONG_OF_MANA",
		SkillName : "Song of Mana",
		MaxLv : 5,
		SpAmount : [ 120, 140, 160, 180, 200 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		NeedSkillList : new function(){
			this[JOBID.JT_MINSTREL] = [
				[ SKID.MI_HARMONIZE,1 ],
				[ SKID.MI_RUSH_WINDMILL,1 ],
				[ SKID.MI_ECHOSONG,1 ]
			];
			this[JOBID.JT_WANDERER] = [
				[ SKID.WA_SWING_DANCE,1 ],
				[ SKID.WA_SYMPHONY_OF_LOVER,1 ],
				[ SKID.WA_MOONLIT_SERENADE,1 ]
			]
		}
	};

	exports[SKID.SA_CASTCANCEL] = {
		Name: "SA_CASTCANCEL",
		SkillName : "Cast Cancel",
		MaxLv : 5,
		SpAmount : [ 2, 2, 2, 2, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SA_ADVANCEDBOOK,2 ]
		]	
	};

	exports[SKID.WL_WHITEIMPRISON] = {
		Name: "WL_WHITEIMPRISON",
		SkillName : "White Imprison",
		MaxLv : 5,
		SpAmount : [ 50, 55, 60, 65, 70 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.WL_SOULEXPANSION,3 ]
		]
	};

	exports[SKID.SA_MAGICROD] = {
		Name: "SA_MAGICROD",
		SkillName : "Magic Rod",
		MaxLv : 5,
		SpAmount : [ 2, 2, 2, 2, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SA_ADVANCEDBOOK,4 ]
		]	

	};

	exports[SKID.WL_STASIS] = {
		Name: "WL_STASIS",
		SkillName : "Stasis",
		MaxLv : 5,
		SpAmount : [ 50, 60, 70, 80, 90 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.WL_DRAINLIFE,1 ]
		]
	};

	exports[SKID.SA_SPELLBREAKER] = {
		Name: "SA_SPELLBREAKER",
		SkillName : "Spell Breaker",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SA_MAGICROD,1 ]
		]
	};

	exports[SKID.WL_TETRAVORTEX] = {
		Name: "WL_TETRAVORTEX",
		SkillName : "Tetra Vortex",
		MaxLv : 5,
		SpAmount : [ 120, 150, 180, 210, 240 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.WL_CHAINLIGHTNING,5 ],
			[ SKID.WL_HELLINFERNO,5 ],
			[ SKID.WL_JACKFROST,5 ],
			[ SKID.WL_EARTHSTRAIN,5 ]
		]
	};

	exports[SKID.SA_FREECAST] = {
		Name: "SA_FREECAST",
		SkillName : "Free Cast",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SA_CASTCANCEL,1 ]
		]
	};

	exports[SKID.WM_GREAT_ECHO] = {
		Name: "WM_GREAT_ECHO",
		SkillName : "Great Echo",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.WM_METALICSOUND,1 ]
		]
	};

	exports[SKID.SA_AUTOSPELL] = {
		Name: "SA_AUTOSPELL",
		SkillName : "Auto Spell",
		MaxLv : 10,
		SpAmount : [ 35, 35, 35, 35, 35, 35, 35, 35, 35, 35 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SA_FREECAST,4 ]
		]		
	};

	exports[SKID.RA_ARROWSTORM] = {
		Name: "RA_ARROWSTORM",
		SkillName : "Arrow Storm",
		MaxLv : 10,
		SpAmount : [ 30, 32, 34, 36, 38, 40, 42, 44, 46, 48 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.RA_AIMEDBOLT,5 ]
		]
	};

	exports[SKID.SA_FLAMELAUNCHER] = {
		Name: "SA_FLAMELAUNCHER",
		SkillName : "Flame Launcher",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_FIREBOLT,1 ],
			[ SKID.SA_ADVANCEDBOOK,5 ]
		]		
	};

	exports[SKID.RA_WUGRIDER] = {
		Name: "RA_WUGRIDER",
		SkillName : "Warg Rider",
		MaxLv : 3,
		SpAmount : [ 2, 2, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RA_WUGMASTERY,1 ]
		]
	};

	exports[SKID.SA_FROSTWEAPON] = {
		Name: "SA_FROSTWEAPON",
		SkillName : "Frost Weapon",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_COLDBOLT,1 ],
			[ SKID.SA_ADVANCEDBOOK,5 ]
		]	
	};

	exports[SKID.RA_MAGENTATRAP] = {
		Name: "RA_MAGENTATRAP",
		SkillName : "Magenta Trap",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 3 ],
		_NeedSkillList : [
			[ SKID.RA_RESEARCHTRAP,1 ]
		]
	};

	exports[SKID.SA_LIGHTNINGLOADER] = {
		Name: "SA_LIGHTNINGLOADER",
		SkillName : "Lightning Loader",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_LIGHTNINGBOLT,1 ],
			[ SKID.SA_ADVANCEDBOOK,5 ]
		]	
	};

	exports[SKID.NC_PILEBUNKER] = {
		Name: "NC_PILEBUNKER",
		SkillName : "Pile Bunker",
		MaxLv : 3,
		SpAmount : [ 50, 50, 50 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.NC_BOOSTKNUCKLE,2 ]
		]
	};

	exports[SKID.SA_SEISMICWEAPON] = {
		Name: "SA_SEISMICWEAPON",
		SkillName : "Seismic Weapon",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_STONECURSE,1 ],
			[ SKID.SA_ADVANCEDBOOK,5 ]
		]
	};

	exports[SKID.NC_B_SIDESLIDE] = {
		Name: "NC_B_SIDESLIDE",
		SkillName : "Back Side Slide",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.NC_HOVERING,1 ]
		]
	};

	exports[SKID.SA_DRAGONOLOGY] = {
		Name: "SA_DRAGONOLOGY",
		SkillName : "Dragonology",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SA_ADVANCEDBOOK,9 ]
		]
	};

	exports[SKID.NC_NEUTRALBARRIER] = {
		Name: "NC_NEUTRALBARRIER",
		SkillName : "Neutral Barrier",
		MaxLv : 3,
		SpAmount : [ 80, 90, 100 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.NC_MAGNETICFIELD,2 ]
		]
	};

	exports[SKID.SA_VOLCANO] = {
		Name: "SA_VOLCANO",
		SkillName : "Volcano",
		MaxLv : 5,
		SpAmount : [ 48, 46, 44, 42, 40 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.SA_FLAMELAUNCHER,2 ]
		]
	};

	exports[SKID.NC_SILVERSNIPER] = {
		Name: "NC_SILVERSNIPER",
		SkillName : "FAW - Silver Sniper",
		MaxLv : 5,
		SpAmount : [ 25, 30, 35, 40, 45 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.NC_RESEARCHFE,2 ]
		]
	};

	exports[SKID.SA_DELUGE] = {
		Name: "SA_DELUGE",
		SkillName : "Deluge",
		MaxLv : 5,
		SpAmount : [ 48, 46, 44, 42, 40 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.SA_FROSTWEAPON,2 ]
		]
	};

	exports[SKID.SC_BODYPAINT] = {
		Name: "SC_BODYPAINT",
		SkillName : "Body Painting",
		MaxLv : 5,
		SpAmount : [ 10, 15, 20, 25, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
	};

	exports[SKID.SA_VIOLENTGALE] = {
		Name: "SA_VIOLENTGALE",
		SkillName : "Violent Gale",
		MaxLv : 5,
		SpAmount : [ 48, 46, 44, 42, 40 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.SA_LIGHTNINGLOADER,2 ]
		]
	};

	exports[SKID.MG_FIREWALL] = {
		Name: "MG_FIREWALL",
		SkillName : "Fire Wall",
		MaxLv : 10,
		SpAmount : [ 40, 40, 40, 40, 40, 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_SIGHT,1 ],
			[ SKID.MG_FIREBALL,5 ]
		]
	};

	exports[SKID.SA_LANDPROTECTOR] = {
		Name: "SA_LANDPROTECTOR",
		SkillName : "Land Protector",
		MaxLv : 5,
		SpAmount : [ 66, 62, 58, 54, 50 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.SA_DELUGE,3 ],
			[ SKID.SA_VIOLENTGALE,3 ],
			[ SKID.SA_VOLCANO,3 ]
		]
	};

	exports[SKID.WM_GLOOMYDAY] = {
		Name: "WM_GLOOMYDAY",
		SkillName : "Gloomy Day",
		MaxLv : 5,
		SpAmount : [ 60, 75, 90, 105, 120 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.WM_RANDOMIZESPELL,1 ]
		]
	};

	exports[SKID.SA_DISPELL] = {
		Name: "SA_DISPELL",
		SkillName : "Dispell",
		MaxLv : 5,
		SpAmount : [ 1, 1, 1, 1, 1 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SA_SPELLBREAKER,3 ]
		]	
	};

	exports[SKID.LG_FORCEOFVANGUARD] = {
		Name: "LG_FORCEOFVANGUARD",
		SkillName : "Force of Vanguard",
		MaxLv : 5,
		SpAmount : [ 30, 30, 30, 30, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.SA_ABRACADABRA] = {
		Name: "SA_ABRACADABRA",
		SkillName : "Abracadabra",
		MaxLv : 10,
		SpAmount : [ 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SA_AUTOSPELL,5 ],
			[ SKID.SA_DISPELL,1 ],
			[ SKID.SA_LANDPROTECTOR,1 ]
		]	
	};

	exports[SKID.LG_RAYOFGENESIS] = {
		Name: "LG_RAYOFGENESIS",
		SkillName : "Ray of Genesis",
		MaxLv : 5,
		SpAmount : [ 60, 65, 70, 75, 80 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.CR_GRANDCROSS,5 ]
		]
	};

	exports[SKID.SA_MONOCELL] = {
		Name: "SA_MONOCELL",
		SkillName : "Monocell",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.SR_FALLENEMPIRE] = {
		Name: "SR_FALLENEMPIRE",
		SkillName : "Fallen Empire",
		MaxLv : 5,
		SpAmount : [ 20, 30, 40, 50, 60 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SR_DRAGONCOMBO,1 ]
		]
	};

	exports[SKID.SA_CLASSCHANGE] = {
		Name: "SA_CLASSCHANGE",
		SkillName : "Class Change",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.SR_WINDMILL] = {
		Name: "SR_WINDMILL",
		SkillName : "Windmill",
		MaxLv : 1,
		SpAmount : [ 45 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.SR_CURSEDCIRCLE,1 ]
		]
	};

	exports[SKID.SA_SUMMONMONSTER] = {
		Name: "SA_SUMMONMONSTER",
		SkillName : "Summon Monster",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.SR_GENTLETOUCH_CURE] = {
		Name: "SR_GENTLETOUCH_CURE",
		SkillName : "Gentle Touch (Cure)",
		MaxLv : 5,
		SpAmount : [ 40, 50, 60, 70, 80 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.SR_POWERVELOCITY,1 ]
		]
	};

	exports[SKID.SA_REVERSEORCISH] = {
		Name: "SA_REVERSEORCISH",
		SkillName : "Reverse Orcish",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.WM_LULLABY_DEEPSLEEP] = {
		Name: "WM_LULLABY_DEEPSLEEP",
		SkillName : "Deep Sleep Lullaby",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.WM_LESSON,1 ]
		]
	};

	exports[SKID.SA_DEATH] = {
		Name: "SA_DEATH",
		SkillName : "Death",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.WM_DEADHILLHERE] = {
		Name: "WM_DEADHILLHERE",
		SkillName : "Valley of Death",
		MaxLv : 5,
		SpAmount : [ 50, 53, 56, 59, 62 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ],
		_NeedSkillList : [
			[ SKID.WM_SIRCLEOFNATURE,3 ]
		]
	};

	exports[SKID.SA_FORTUNE] = {
		Name: "SA_FORTUNE",
		SkillName : "Fortune",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.WM_SEVERE_RAINSTORM] = {
		Name: "WM_SEVERE_RAINSTORM",
		SkillName : "Severe Rainstorm",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		NeedSkillList : new function(){
			this[JOBID.JT_MINSTREL] = [
				[ SKID.BA_MUSICALSTRIKE,5 ]
			];
			this[JOBID.JT_WANDERER] = [
				[ SKID.DC_THROWARROW,5 ]
			]
		}
	};

	exports[SKID.SA_TAMINGMONSTER] = {
		Name: "SA_TAMINGMONSTER",
		SkillName : "Taming Monster",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.MI_RUSH_WINDMILL] = {
		Name: "MI_RUSH_WINDMILL",
		SkillName : "Windmill Swing Attack",
		MaxLv : 5,
		SpAmount : [ 82, 88, 94, 100, 106 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.WM_LULLABY_DEEPSLEEP,1 ]
		]
	};

	exports[SKID.SA_QUESTION] = {
		Name: "SA_QUESTION",
		SkillName : "?",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.WM_REVERBERATION] = {
		Name: "WM_REVERBERATION",
		SkillName : "Reverberation",
		MaxLv : 5,
		SpAmount : [ 28, 32, 38, 42, 48 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		NeedSkillList : new function(){
			this[JOBID.JT_MINSTREL] = [
				[ SKID.BA_DISSONANCE,5 ]
			];
			this[JOBID.JT_WANDERER] = [
				[ SKID.DC_UGLYDANCE,5 ]
			]
		}
	};

	exports[SKID.SA_GRAVITY] = {
		Name: "SA_GRAVITY",
		SkillName : "Gravity",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.WM_METALICSOUND] = {
		Name: "WM_METALICSOUND",
		SkillName : "Metalic Sound",
		MaxLv : 5,
		SpAmount : [ 64, 68, 72, 76, 80 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.WM_DOMINION_IMPULSE,1 ]
		]
	};

	exports[SKID.SA_LEVELUP] = {
		Name: "SA_LEVELUP",
		SkillName : "Level Up",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.WM_LESSON] = {
		Name: "WM_LESSON",
		SkillName : "Lesson",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.SA_INSTANTDEATH] = {
		Name: "SA_INSTANTDEATH",
		SkillName : "Instant Death",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MI_ECHOSONG] = {
		Name: "MI_ECHOSONG",
		SkillName : "Echo Song",
		MaxLv : 5,
		SpAmount : [ 86, 92, 98, 104, 110 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.WM_LULLABY_DEEPSLEEP,1 ]
		]
	};

	exports[SKID.SA_FULLRECOVERY] = {
		Name: "SA_FULLRECOVERY",
		SkillName : "Full Recovery",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.WM_DOMINION_IMPULSE] = {
		Name: "WM_DOMINION_IMPULSE",
		SkillName : "Dominion Impulse",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 11 ],
		_NeedSkillList : [
			[ SKID.WM_REVERBERATION,1 ]
		]
	};

	exports[SKID.SA_COMA] = {
		Name: "SA_COMA",
		SkillName : "Coma",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.MG_FIREBOLT] = {
		Name: "MG_FIREBOLT",
		SkillName : "Fire Bolt",
		MaxLv : 10,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.BD_ADAPTATION] = {
		Name: "BD_ADAPTATION",
		SkillName : "Adaptation to Circumstances",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.WM_BEYOND_OF_WARCRY] = {
		Name: "WM_BEYOND_OF_WARCRY",
		SkillName : "Warcry of Beyond",
		MaxLv : 5,
		SpAmount : [ 120, 130, 140, 150, 160 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.WM_LERADS_DEW,1 ]
		]
	};

	exports[SKID.BD_ENCORE] = {
		Name: "BD_ENCORE",
		SkillName : "Encore",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.BD_ADAPTATION,1 ]
		]	
	};

	exports[SKID.SR_GENTLETOUCH_REVITALIZE] = {
		Name: "SR_GENTLETOUCH_REVITALIZE",
		SkillName : "Gentle Touch (Revitalize)",
		MaxLv : 5,
		SpAmount : [ 40, 50, 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.SR_GENTLETOUCH_CHANGE,5 ]
		]
	};

	exports[SKID.BD_LULLABY] = {
		Name: "BD_LULLABY",
		SkillName : "Lullaby",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		NeedSkillList : new function(){
			this[JOBID.JT_BARD] = [
				[ SKID.BA_WHISTLE,10 ]
			];
			this[JOBID.JT_DANCER] = [
				[ SKID.DC_HUMMING,10 ]
			]
		}
	};

	exports[SKID.SO_PSYCHIC_WAVE] = {
		Name: "SO_PSYCHIC_WAVE",
		SkillName : "Psychic Wave",
		MaxLv : 5,
		SpAmount : [ 48, 56, 64, 70, 78 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SA_DISPELL,2 ]
		]
	};

	exports[SKID.BD_RICHMANKIM] = {
		Name: "BD_RICHMANKIM",
		SkillName : "Mr. Kim A Rich Man",
		MaxLv : 5,
		SpAmount : [ 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BD_SIEGFRIED,3 ]
		]	
	};

	exports[SKID.SO_SUMMON_AGNI] = {
		Name: "SO_SUMMON_AGNI",
		SkillName : "Summon Agni",
		MaxLv : 3,
		SpAmount : [ 100, 150, 200 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SO_EL_CONTROL,1 ],
			[ SKID.SO_WARMER,3 ]
		]
	};

	exports[SKID.BD_ETERNALCHAOS] = {
		Name: "BD_ETERNALCHAOS",
		SkillName : "Eternal Chaos",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.BD_ROKISWEIL,1 ]
		]	
	};

	exports[SKID.SO_FIRE_INSIGNIA] = {
		Name: "SO_FIRE_INSIGNIA",
		SkillName : "Fire Insignia",
		MaxLv : 3,
		SpAmount : [ 22, 30, 38 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SO_SUMMON_AGNI,3 ]
		]
	};

	exports[SKID.BD_DRUMBATTLEFIELD] = {
		Name: "BD_DRUMBATTLEFIELD",
		SkillName : "A Drum on the Battlefield",
		MaxLv : 5,
		SpAmount : [ 38, 41, 44, 47, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		NeedSkillList : new function(){
			this[JOBID.JT_BARD] = [
				[ SKID.BA_APPLEIDUN,10 ]
			];
			this[JOBID.JT_DANCER] = [
				[ SKID.DC_SERVICEFORYOU,10 ]
			]
		}
	};

	exports[SKID.SR_CURSEDCIRCLE] = {
		Name: "SR_CURSEDCIRCLE",
		SkillName : "Cursed Circle",
		MaxLv : 5,
		SpAmount : [ 40, 60, 80, 100, 120 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.MO_BLADESTOP,2 ],
			[ SKID.SR_GENTLETOUCH_QUIET,2 ]
		]
	};

	exports[SKID.BD_RINGNIBELUNGEN] = {
		Name: "BD_RINGNIBELUNGEN",
		SkillName : "The Ring of Nibelungen",
		MaxLv : 5,
		SpAmount : [ 38, 41, 44, 47, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BD_DRUMBATTLEFIELD,3 ]
		]	
	};

	exports[SKID.GN_SPORE_EXPLOSION] = {
		Name: "GN_SPORE_EXPLOSION",
		SkillName : "Spore Explosion",
		MaxLv : 5,
		SpAmount : [ 55, 60, 65, 70, 75 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.GN_S_PHARMACY,4 ]
		]
	};

	exports[SKID.BD_ROKISWEIL] = {
		Name: "BD_ROKISWEIL",
		SkillName : "Loki's Veil",
		MaxLv : 1,
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		NeedSkillList : new function(){
			this[JOBID.JT_BARD] = [
				[ SKID.BA_ASSASSINCROSS,10 ]
			];
			this[JOBID.JT_DANCER] = [
				[ SKID.DC_DONTFORGETME,10 ]
			]
		}
	};

	exports[SKID.SR_RAMPAGEBLASTER] = {
		Name: "SR_RAMPAGEBLASTER",
		SkillName : "Rampage Blaster",
		MaxLv : 5,
		SpAmount : [ 150, 150, 150, 150, 150 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SR_EARTHSHAKER,2 ]
		]
	};

	exports[SKID.BD_INTOABYSS] = {
		Name: "BD_INTOABYSS",
		SkillName : "Into the Abyss",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.BD_LULLABY,1 ]
		]
	};

	exports[SKID.GN_S_PHARMACY] = {
		Name: "GN_S_PHARMACY",
		SkillName : "Special Pharmacy",
		MaxLv : 10,
		SpAmount : [ 12, 12, 12, 12, 12, 12, 12, 12, 12, 12 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.BD_SIEGFRIED] = {
		Name: "BD_SIEGFRIED",
		SkillName : "Invulnerable Siegfried",
		MaxLv : 5,
		SpAmount : [ 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		NeedSkillList : new function(){
			this[JOBID.JT_BARD] = [
				[ SKID.BA_POEMBRAGI,10 ]
			];
			this[JOBID.JT_DANCER] = [
				[ SKID.DC_FORTUNEKISS,10 ]
			]
		}
	};

	exports[SKID.GD_RESTORE] = {
		Name: "GD_RESTORE",
		SkillName : "Restore",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.BD_RAGNAROK] = {
		Name: "BD_RAGNAROK",
		SkillName : "Ragnarok",
		MaxLv : 0,
		SpAmount : [ ],
		bSeperateLv : false,
		AttackRange : [ ]
	};

	exports[SKID.LG_INSPIRATION] = {
		Name: "LG_INSPIRATION",
		SkillName : "Inspiration",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.LG_PIETY,5 ],
			[ SKID.LG_RAYOFGENESIS,4 ],
			[ SKID.LG_SHIELDSPELL,3 ]
		]
	};

	exports[SKID.BA_MUSICALLESSON] = {
		Name: "BA_MUSICALLESSON",
		SkillName : "Musical Lesson",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.LG_PIETY] = {
		Name: "LG_PIETY",
		SkillName : "Piety",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.CR_TRUST,3 ]
		]
	};

	exports[SKID.BA_MUSICALSTRIKE] = {
		Name: "BA_MUSICALSTRIKE",
		SkillName : "Musical Strike",
		MaxLv : 5,
		SpAmount : [ 1, 3, 5, 7, 9, ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.BA_MUSICALLESSON,3 ]
		]
	};

	exports[SKID.LG_PRESTIGE] = {
		Name: "LG_PRESTIGE",
		SkillName : "Prestige",
		MaxLv : 5,
		SpAmount : [ 75, 80, 85, 90, 95 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.LG_TRAMPLE,3 ]
		]
	};

	exports[SKID.BA_DISSONANCE] = {
		Name: "BA_DISSONANCE",
		SkillName : "Dissonance",
		MaxLv : 5,
		SpAmount : [ 18, 21, 24, 27, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BD_ADAPTATION,1 ],
			[ SKID.BA_MUSICALLESSON,1 ]
		]
	};

	exports[SKID.ALL_ODINS_POWER] = {
		Name: "ALL_ODINS_POWER",
		SkillName : "Odin's Power",
		MaxLv : 2,
		SpAmount : [ 70, 100 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9 ]
	};

	exports[SKID.BA_FROSTJOKE] = {
		Name: "BA_FROSTJOKE",
		SkillName : "Frost Joke",
		MaxLv : 5,
		SpAmount : [ 12, 14, 16, 18, 20 ],
		bSeperateLv : true,
		AttackRange : [ ],
		_NeedSkillList : [
			[ SKID.BD_ENCORE,1 ]
		]
	};

	exports[SKID.LG_EXEEDBREAK] = {
		Name: "LG_EXEEDBREAK",
		SkillName : "Exceed Break",
		MaxLv : 5,
		SpAmount : [ 20, 32, 44, 56, 68 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.LG_BANISHINGPOINT,3 ]
		]
	};

	exports[SKID.BA_WHISTLE] = {
		Name: "BA_WHISTLE",
		SkillName : "A Whistle",
		MaxLv : 10,
		SpAmount : [ 24, 28, 32, 36, 40, 44, 48, 52, 56, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BA_DISSONANCE,3 ]
		]
	};

	exports[SKID.MG_LIGHTNINGBOLT] = {
		Name: "MG_LIGHTNINGBOLT",
		SkillName : "Lightning Bolt",
		MaxLv : 10,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	exports[SKID.BA_ASSASSINCROSS] = {
		Name: "BA_ASSASSINCROSS",
		SkillName : "Assassin Cross of Sunset",
		MaxLv : 10,
		SpAmount : [ 38, 41, 44, 47, 50, 53, 56, 59, 62, 65 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BA_DISSONANCE,3 ]
		]
	};

	exports[SKID.LG_RAGEBURST] = {
		Name: "LG_RAGEBURST",
		SkillName : "Rage Burst",
		MaxLv : 1,
		SpAmount : [ 150 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.LG_FORCEOFVANGUARD,1 ]
		]
	};

	exports[SKID.BA_POEMBRAGI] = {
		Name: "BA_POEMBRAGI",
		SkillName : "A Poem of Bragi",
		MaxLv : 10,
		SpAmount : [ 40, 45, 50, 55, 60, 65, 70, 75, 80, 85 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BA_DISSONANCE,3 ]
		]
	};

	exports[SKID.ML_DEVOTION] = {
		Name: "ML_DEVOTION",
		SkillName : "Devotion",
		MaxLv : 5,
		SpAmount : [ 25, 25, 25, 25, 25 ],
		bSeperateLv : false,
		AttackRange : [ 7, 8, 9, 10, 11 ],
	};

	exports[SKID.BA_APPLEIDUN] = {
		Name: "BA_APPLEIDUN",
		SkillName : "The Apple of Idun",
		MaxLv : 10,
		SpAmount : [ 40, 45, 50, 55, 60, 65, 70, 75, 80, 85 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BA_DISSONANCE,3 ]
		]
	};

	exports[SKID.LG_TRAMPLE] = {
		Name: "LG_TRAMPLE",
		SkillName : "Trample",
		MaxLv : 3,
		SpAmount : [ 30, 45, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ]
	};

	exports[SKID.DC_DANCINGLESSON] = {
		Name: "DC_DANCINGLESSON",
		SkillName : "Dancing Lesson",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.SC_MAELSTROM] = {
		Name: "SC_MAELSTROM",
		SkillName : "Maelstrom",
		MaxLv : 3,
		SpAmount : [ 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7 ],
		_NeedSkillList : [
			[ SKID.SC_CHAOSPANIC,3 ],
			[ SKID.SC_UNLUCKY,3 ]
		]
	};

	exports[SKID.DC_THROWARROW] = {
		Name: "DC_THROWARROW",
		SkillName : "Throw Arrow",
		MaxLv : 5,
		SpAmount : [ 1, 3, 5, 7, 9 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.DC_DANCINGLESSON,3 ]
		]
	};

	exports[SKID.SC_CHAOSPANIC] = {
		Name: "SC_CHAOSPANIC",
		SkillName : "Chaos Panic",
		MaxLv : 3,
		SpAmount : [ 30, 36, 42 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7 ],
		_NeedSkillList : [
			[ SKID.SC_MANHOLE,1 ]
		]
	};

	exports[SKID.DC_UGLYDANCE] = {
		Name: "DC_UGLYDANCE",
		SkillName : "Ugly Dance",
		MaxLv : 5,
		SpAmount : [ 23, 26, 29, 32, 35 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BD_ADAPTATION,1 ],
			[ SKID.DC_DANCINGLESSON,1 ]
		]
	};

	exports[SKID.SC_DIMENSIONDOOR] = {
		Name: "SC_DIMENSIONDOOR",
		SkillName : "Dimension Door",
		MaxLv : 3,
		SpAmount : [ 30, 36, 42 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7 ],
		_NeedSkillList : [
			[ SKID.SC_MANHOLE,1 ]
		]
	};

	exports[SKID.DC_SCREAM] = {
		Name: "DC_SCREAM",
		SkillName : "Scream",
		MaxLv : 5,
		SpAmount : [ 12, 14, 16, 18, 20 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.BD_ENCORE,1 ]
		]
	};

	exports[SKID.SC_MANHOLE] = {
		Name: "SC_MANHOLE",
		SkillName : "Manhole",
		MaxLv : 3,
		SpAmount : [ 20, 25, 30 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7 ],
		_NeedSkillList : [
			[ SKID.RG_FLAGGRAFFITI,1 ]
		]
	};

	exports[SKID.DC_HUMMING] = {
		Name: "DC_HUMMING",
		SkillName : "Humming",
		MaxLv : 10,
		SpAmount : [ 22, 24, 26, 28, 30, 32, 34, 36, 38, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.DC_UGLYDANCE,3 ]
		]
	};

	exports[SKID.EL_PYROTECHNIC] = {
		Name: "EL_PYROTECHNIC",
		SkillName : "Pyrotechnic",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.DC_DONTFORGETME] = {
		Name: "DC_DONTFORGETME",
		SkillName : "Please Don't Forget Me",
		MaxLv : 10,
		SpAmount : [ 28, 31, 34, 37, 40, 43, 46, 49, 52, 55 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.DC_UGLYDANCE,3 ]
		]
	};

	exports[SKID.SC_WEAKNESS] = {
		Name: "SC_WEAKNESS",
		SkillName : "Masquerade - Weakness",
		MaxLv : 3,
		SpAmount : [ 30, 40, 50 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.SC_ENERVATION,1 ],
			[ SKID.SC_GROOMY,1 ],
			[ SKID.SC_IGNORANCE,1 ]
		]
	};

	exports[SKID.DC_FORTUNEKISS] = {
		Name: "DC_FORTUNEKISS",
		SkillName : "Fortune's Kiss",
		MaxLv : 10,
		SpAmount : [ 43, 46, 49, 52, 55, 58, 61, 64, 67, 70 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.DC_UGLYDANCE,3 ]
		]
	};

	exports[SKID.SC_UNLUCKY] = {
		Name: "SC_UNLUCKY",
		SkillName : "Masquerade - Unlucky",
		MaxLv : 3,
		SpAmount : [ 30, 40, 50 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.SC_LAZINESS,1 ],
			[ SKID.SC_WEAKNESS,1 ]
		]
	};

	exports[SKID.DC_SERVICEFORYOU] = {
		Name: "DC_SERVICEFORYOU",
		SkillName : "Service for You",
		MaxLv : 10,
		SpAmount : [ 40, 45, 50, 55, 60, 65, 70, 75, 80, 85 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.DC_UGLYDANCE,3 ]
		]
	};

	exports[SKID.SC_IGNORANCE] = {
		Name: "SC_IGNORANCE",
		SkillName : "Masquerade - Ignorance",
		MaxLv : 3,
		SpAmount : [ 30, 40, 50 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.SC_BODYPAINT,1 ]
		]
	};

	exports[SKID.SC_GROOMY] = {
		Name: "SC_GROOMY",
		SkillName : "Masquerade - Groomy",
		MaxLv : 3,
		SpAmount : [ 30, 40, 50 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.SC_BODYPAINT,1 ]
		]
	};

	exports[SKID.SC_INVISIBILITY] = {
		Name: "SC_INVISIBILITY",
		SkillName : "Invisibility",
		MaxLv : 5,
		SpAmount : [ 100, 100, 100, 100, 100 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SC_UNLUCKY,3 ],
			[ SKID.SC_AUTOSHADOWSPELL,7 ],
			[ SKID.SC_DEADLYINFECT,5 ]
		]
	};

	exports[SKID.SC_AUTOSHADOWSPELL] = {
		Name: "SC_AUTOSHADOWSPELL",
		SkillName : "Auto Shadow Spell",
		MaxLv : 10,
		SpAmount : [ 40, 45, 50, 55, 60, 65, 70, 75, 80, 85 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SC_REPRODUCE,5 ]
		]
	};

	exports[SKID.SC_REPRODUCE] = {
		Name: "SC_REPRODUCE",
		SkillName : "Reproduce",
		MaxLv : 10,
		SpAmount : [ 40, 45, 50, 55, 60, 65, 70, 75, 80, 85 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RG_PLAGIARISM,5 ]
		]
	};

	exports[SKID.SC_FATALMENACE] = {
		Name: "SC_FATALMENACE",
		SkillName : "Fatal Menace",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RG_INTIMIDATE,5 ]
		]
	};

	exports[SKID.NC_MAGICDECOY] = {
		Name: "NC_MAGICDECOY",
		SkillName : "FAW - Magic Decoy",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.NC_SILVERSNIPER,2 ]
		]
	};

	exports[SKID.WE_MALE] = {
		Name: "WE_MALE",
		SkillName : "I'll save you",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.NC_AXEBOOMERANG] = {
		Name: "NC_AXEBOOMERANG",
		SkillName : "Axe Boomerang",
		MaxLv : 5,
		SpAmount : [ 20, 22, 24, 26, 28 ],
		bSeperateLv : true,
		AttackRange : [ 5, 6, 7, 8, 9 ],
		_NeedSkillList : [
			[ SKID.NC_TRAININGAXE,1 ]
		]
	};

	exports[SKID.WE_FEMALE] = {
		Name: "WE_FEMALE",
		SkillName : "I'll sacrifice myself for you",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.MG_THUNDERSTORM] = {
		Name: "MG_THUNDERSTORM",
		SkillName : "Thunder Storm",
		MaxLv : 10,
		SpAmount : [ 29, 34, 39, 44, 49, 54, 59, 64, 69, 74 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.MG_LIGHTNINGBOLT,4 ]
		]
	};

	exports[SKID.WE_CALLPARTNER] = {
		Name: "WE_CALLPARTNER",
		SkillName : "I miss you",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.NC_RESEARCHFE] = {
		Name: "NC_RESEARCHFE",
		SkillName : "Research Fire / Earth",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.ITM_TOMAHAWK] = {
		Name: "ITM_TOMAHAWK",
		SkillName : "Throw Tomahawk",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	exports[SKID.NC_STEALTHFIELD] = {
		Name: "NC_STEALTHFIELD",
		SkillName : "Stealth Field",
		MaxLv : 3,
		SpAmount : [ 80, 100, 120 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.NC_ANALYZE,3 ],
			[ SKID.NC_NEUTRALBARRIER,2 ]
		]
	};

	exports[SKID.NC_INFRAREDSCAN] = {
		Name: "NC_INFRAREDSCAN",
		SkillName : "Infrared Scan",
		MaxLv : 1,
		SpAmount : [ 45 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.NC_SHAPESHIFT,2 ]
		]
	};

	exports[SKID.NC_EMERGENCYCOOL] = {
		Name: "NC_EMERGENCYCOOL",
		SkillName : "Emergency Cool",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.NC_SELFDESTRUCTION,2 ]
		]
	};

	exports[SKID.NC_SHAPESHIFT] = {
		Name: "NC_SHAPESHIFT",
		SkillName : "Shape Shift",
		MaxLv : 4,
		SpAmount : [ 100, 100, 100, 100 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.NC_MAINFRAME,2 ]
		]
	};

	exports[SKID.NC_SELFDESTRUCTION] = {
		Name: "NC_SELFDESTRUCTION",
		SkillName : "Self Destruction",
		MaxLv : 3,
		SpAmount : [ 200, 200, 200 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.NC_MAINFRAME,2 ]
		]
	};

	exports[SKID.NC_MAINFRAME] = {
		Name: "NC_MAINFRAME",
		SkillName : "Mainframe Restructure",
		MaxLv : 4,
		SpAmount : [ 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.NC_MADOLICENCE,4 ]
		]
	};

	exports[SKID.NC_ACCELERATION] = {
		Name: "NC_ACCELERATION",
		SkillName : "Acceleration",
		MaxLv : 3,
		SpAmount : [ 20, 40, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.NC_MADOLICENCE,1 ]
		]
	};

	exports[SKID.NC_ARMSCANNON] = {
		Name: "NC_ARMSCANNON",
		SkillName : "Arms Cannon",
		MaxLv : 3,
		SpAmount : [ 30, 45, 60 ],
		bSeperateLv : true,
		AttackRange : [ 9, 11, 13 ],
		_NeedSkillList : [
			[ SKID.NC_FLAMELAUNCHER,2 ],
			[ SKID.NC_COLDSLOWER,2 ]
		]
	};

	exports[SKID.NC_VULCANARM] = {
		Name: "NC_VULCANARM",
		SkillName : "Vulcan Arm",
		MaxLv : 3,
		SpAmount : [ 2, 4, 6 ],
		bSeperateLv : true,
		AttackRange : [ 13, 13, 13 ],
		_NeedSkillList : [
			[ SKID.NC_BOOSTKNUCKLE,2 ]
		]
	};

	exports[SKID.RA_ICEBOUNDTRAP] = {
		Name: "RA_ICEBOUNDTRAP",
		SkillName : "Ice Bound Trap",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.RA_DETONATOR,1 ]
		]
	};

	exports[SKID.RA_FIRINGTRAP] = {
		Name: "RA_FIRINGTRAP",
		SkillName : "Firing Trap",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.RA_DETONATOR,1 ]
		]
	};

	exports[SKID.RA_VERDURETRAP] = {
		Name: "RA_VERDURETRAP",
		SkillName : "Verdure Trap",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 3 ],
		_NeedSkillList : [
			[ SKID.RA_RESEARCHTRAP,1 ]
		]
	};

	exports[SKID.RA_COBALTTRAP] = {
		Name: "RA_COBALTTRAP",
		SkillName : "Cobalt Trap",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 3 ],
		_NeedSkillList : [
			[ SKID.RA_RESEARCHTRAP,1 ]
		]
	};

	exports[SKID.RA_SENSITIVEKEEN] = {
		Name: "RA_SENSITIVEKEEN",
		SkillName : "Sensitive Keen",
		MaxLv : 5,
		SpAmount : [ 12, 12, 12, 12, 12 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RA_TOOTHOFWUG,3 ]
		]
	};

	exports[SKID.RA_TOOTHOFWUG] = {
		Name: "RA_TOOTHOFWUG",
		SkillName : "Tooth of Warg",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RA_WUGMASTERY,1 ]
		]
	};

	exports[SKID.RA_WUGDASH] = {
		Name: "RA_WUGDASH",
		SkillName : "Warg Dash",
		MaxLv : 1,
		SpAmount : [ 4 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.RA_WUGRIDER,1 ]
		]
	};

	exports[SKID.RA_ELECTRICSHOCKER] = {
		Name: "RA_ELECTRICSHOCKER",
		SkillName : "Electric Shocker",
		MaxLv : 5,
		SpAmount : [ 35, 35, 35, 35, 35 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SKID.HT_SHOCKWAVE,5 ]
		]
	};

	exports[SKID.RA_DETONATOR] = {
		Name: "RA_DETONATOR",
		SkillName : "Detonator",
		MaxLv : 1,
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SKID.RA_CLUSTERBOMB,3 ]
		]
	};

	exports[SKID.RA_AIMEDBOLT] = {
		Name: "RA_AIMEDBOLT",
		SkillName : "Aimed Bolt",
		MaxLv : 10,
		SpAmount : [ 30, 32, 34, 36, 38, 40, 42, 44, 46, 48 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.HT_ANKLESNARE,5 ]
		]
	};

	exports[SKID.RA_RANGERMAIN] = {
		Name: "RA_RANGERMAIN",
		SkillName : "Ranger Main",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]		
	};

	exports[SKID.RA_FEARBREEZE] = {
		Name: "RA_FEARBREEZE",
		SkillName : "Fear Breeze",
		MaxLv : 5,
		SpAmount : [ 55, 60, 65, 70, 75 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.RA_ARROWSTORM,5 ],
			[ SKID.RA_CAMOUFLAGE,1 ]
		]
	};

	exports[SKID.WL_RELEASE] = {
		Name: "WL_RELEASE",
		SkillName : "Release",
		MaxLv : 2,
		SpAmount : [ 3, 20 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11 ]
	};

	exports[SKID.WL_SUMMONSTONE] = {
		Name: "WL_SUMMONSTONE",
		SkillName : "Summon Stone",
		MaxLv : 5,
		SpAmount : [ 10, 12, 14, 16, 18 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.WZ_HEAVENDRIVE,1 ]
		]
	};

	exports[SKID.WL_SUMMONFB] = {
		Name: "WL_SUMMONFB",
		SkillName : "Summon Fire Ball",
		MaxLv : 5,
		SpAmount : [ 10, 12, 14, 16, 18 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.WZ_METEOR,1 ]
		]
	};

	exports[SKID.WL_CHAINLIGHTNING] = {
		Name: "WL_CHAINLIGHTNING",
		SkillName : "Chain Lightning",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.WL_SUMMONBL,1 ]
		]
	};

	exports[SKID.WL_COMET] = {
		Name: "WL_COMET",
		SkillName : "Comet",
		MaxLv : 5,
		SpAmount : [ 480, 560, 640, 720, 800 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.WL_HELLINFERNO,3 ]
		]
	};

	exports[SKID.WL_DRAINLIFE] = {
		Name: "WL_DRAINLIFE",
		SkillName : "Drain Life",
		MaxLv : 5,
		SpAmount : [ 20, 24, 28, 32, 36 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.WL_RADIUS,1 ]
		]
	};

	exports[SKID.WL_RECOGNIZEDSPELL] = {
		Name: "WL_RECOGNIZEDSPELL",
		SkillName : "Recognized Spell",
		MaxLv : 5,
		SpAmount : [ 100, 120, 140, 160, 180 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.WL_RELEASE,2 ],
			[ SKID.WL_STASIS,1 ],
			[ SKID.WL_WHITEIMPRISON,1 ]
		]
	};

	exports[SKID.AL_DP] = {
		Name: "AL_DP",
		SkillName : "Divine Protection",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		NeedSkillList : new function(){
			this[JOBID.JT_CRUSADER] = [
				[ SKID.AL_CURE,1 ]
			]
		}
	};

	exports[SKID.WL_MARSHOFABYSS] = {
		Name: "WL_MARSHOFABYSS",
		SkillName : "Marsh of Abyss",
		MaxLv : 5,
		SpAmount : [ 40, 42, 44, 46, 48 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.WZ_QUAGMIRE,1 ]
		]
	};

	exports[SKID.WL_JACKFROST] = {
		Name: "WL_JACKFROST",
		SkillName : "Jack Frost",
		MaxLv : 5,
		SpAmount : [ 50, 60, 70, 80, 90 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.WL_FROSTMISTY,2 ]
		]
	};

	exports[SKID.WL_FROSTMISTY] = {
		Name: "WL_FROSTMISTY",
		SkillName : "Frost Misty",
		MaxLv : 5,
		SpAmount : [ 40, 48, 56, 64, 72 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.WL_SUMMONWB,1 ]
		]
	};

	exports[SKID.WL_SOULEXPANSION] = {
		Name: "WL_SOULEXPANSION",
		SkillName : "Soul Expansion",
		MaxLv : 5,
		SpAmount : [ 30, 35, 40, 45, 50 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.WL_DRAINLIFE,1 ]
		]
	};

	exports[SKID.AB_DUPLELIGHT] = {
		Name: "AB_DUPLELIGHT",
		SkillName : "Duple Light",
		MaxLv : 10,
		SpAmount : [ 55, 60, 65, 70, 75, 80, 85, 90, 95, 100 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11, 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.PR_ASPERSIO,1 ]
		]
	};

	exports[SKID.AB_EXPIATIO] = {
		Name: "AB_EXPIATIO",
		SkillName : "Expiatio",
		MaxLv : 5,
		SpAmount : [ 35, 40, 45, 50, 55 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.AB_DUPLELIGHT,5 ],
			[ SKID.AB_ORATIO,5 ]
		]
	};

	exports[SKID.LK_AURABLADE] = {
		Name: "LK_AURABLADE",
		SkillName : "Aura Blade",
		MaxLv : 5,
		SpAmount : [ 18, 26, 34, 42, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SM_MAGNUM,5 ],
			[ SKID.SM_TWOHAND,5 ]
		]
	};

	exports[SKID.AB_RENOVATIO] = {
		Name: "AB_RENOVATIO",
		SkillName : "Renovatio",
		MaxLv : 1,
		SpAmount : [ 70 ],
		bSeperateLv : false,
		AttackRange : [ 11 ],
		_NeedSkillList : [
			[ SKID.AB_CHEAL,3 ]
		]
	};

	exports[SKID.LK_PARRYING] = {
		Name: "LK_PARRYING",
		SkillName : "Parrying",
		MaxLv : 10,
		SpAmount : [ 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SM_PROVOKE,5 ],
			[ SKID.SM_TWOHAND,10 ],
			[ SKID.KN_TWOHANDQUICKEN,3 ]
		]
	};

	exports[SKID.AB_LAUDAAGNUS] = {
		Name: "AB_LAUDAAGNUS",
		SkillName : "Lauda Agnus",
		MaxLv : 4,
		SpAmount : [ 50, 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.PR_STRECOVERY,1 ]
		]
	};

	exports[SKID.LK_CONCENTRATION] = {
		Name: "LK_CONCENTRATION",
		SkillName : "Concentration",
		MaxLv : 5,
		SpAmount : [ 14, 18, 22, 26, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.SM_RECOVERY,5 ],
			[ SKID.KN_SPEARMASTERY,5 ],
			[ SKID.KN_RIDING,1 ]
		]
	};

	exports[SKID.AB_ORATIO] = {
		Name: "AB_ORATIO",
		SkillName : "Oratio",
		MaxLv : 10,
		SpAmount : [ 35, 38, 41, 44, 47, 50, 53, 56, 59, 62 ],
		bSeperateLv : false,
		AttackRange : [ 11, 11, 11, 11, 11, 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.AB_PRAEFATIO,5 ]
		]
	};

	exports[SKID.LK_TENSIONRELAX] = {
		Name: "LK_TENSIONRELAX",
		SkillName : "Tension Relax",
		MaxLv : 1,
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.SM_PROVOKE,5 ],
			[ SKID.SM_RECOVERY,10 ],
			[ SKID.SM_ENDURE,3 ]
		]
	};
	exports[SKID.AB_PRAEFATIO] = {
		Name: "AB_PRAEFATIO",
		SkillName : "Praefatio",
		MaxLv : 10,
		SpAmount : [ 90, 100, 110, 120, 130, 140, 150, 160, 170, 180 ],
		bSeperateLv : false,
		AttackRange : [ 11, 11, 11, 11, 11, 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.PR_KYRIE,1 ]
		]
	};

	exports[SKID.LK_BERSERK] = {
		Name: "LK_BERSERK",
		SkillName : "Berserk",
		MaxLv : 1,
		SpAmount : [ 200 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.AB_EPICLESIS] = {
		Name: "AB_EPICLESIS",
		SkillName : "Epiclesis",
		MaxLv : 5,
		SpAmount : [ 300, 300, 300, 300, 300 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.AB_ANCILLA,1 ],
			[ SKID.AB_HIGHNESSHEAL,1 ]
		]
	};

	exports[SKID.AB_CHEAL] = {
		Name: "AB_CHEAL",
		SkillName : "Coluceo Heal",
		MaxLv : 3,
		SpAmount : [ 200, 220, 240 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AL_HEAL,1 ]
		]
	};

	exports[SKID.AB_ANCILLA] = {
		Name: "AB_ANCILLA",
		SkillName : "Ancilla",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.AB_CLEMENTIA,3 ]
		]
	};

	exports[SKID.HP_ASSUMPTIO] = {
		Name: "HP_ASSUMPTIO",
		SkillName : "Assumptio",
		MaxLv : 5,
		SpAmount : [ 20, 30, 40, 50, 60 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.AL_ANGELUS,1 ],
			[ SKID.MG_SRECOVERY,3 ],
			[ SKID.PR_IMPOSITIO,3 ]
		]
	};

	exports[SKID.GC_HALLUCINATIONWALK] = {
		Name: "GC_HALLUCINATIONWALK",
		SkillName : "Hallucination Walk",
		MaxLv : 5,
		SpAmount : [ 100, 100, 100, 100, 100 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.GC_PHANTOMMENACE,1 ]
		]
	};

	exports[SKID.HP_BASILICA] = {
		Name: "HP_BASILICA",
		SkillName : "Basilica",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.PR_GLORIA,2 ],
			[ SKID.MG_SRECOVERY,1 ],
			[ SKID.PR_KYRIE,3 ]
		]
	};

	exports[SKID.GC_VENOMPRESSURE] = {
		Name: "GC_VENOMPRESSURE",
		SkillName : "Venom Pressure",
		MaxLv : 5,
		SpAmount : [ 30, 40, 50, 60, 70 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.GC_WEAPONBLOCKING,1 ],
			[ SKID.GC_POISONINGWEAPON,3 ]
		]
	};

	exports[SKID.HP_MEDITATIO] = {
		Name: "HP_MEDITATIO",
		SkillName : "Meditatio",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.MG_SRECOVERY,5 ],
			[ SKID.PR_LEXDIVINA,5 ],
			[ SKID.PR_ASPERSIO,3 ]
		]
	};

	exports[SKID.GC_WEAPONCRUSH] = {
		Name: "GC_WEAPONCRUSH",
		SkillName : "Weapon Crush",
		MaxLv : 5,
		SpAmount : [ 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.GC_WEAPONBLOCKING,1 ]
		]
	};

	exports[SKID.HW_SOULDRAIN] = {
		Name: "HW_SOULDRAIN",
		SkillName : "Soul Drain",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.MG_SRECOVERY,5 ],
			[ SKID.MG_SOULSTRIKE,7 ]
		]
	};

	exports[SKID.GC_POISONINGWEAPON] = {
		Name: "GC_POISONINGWEAPON",
		SkillName : "Poisoning Weapon",
		MaxLv : 5,
		SpAmount : [ 20, 24, 28, 32, 36 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.GC_CREATENEWPOISON,1 ]
		]
	};

	exports[SKID.HW_MAGICCRASHER] = {
		Name: "HW_MAGICCRASHER",
		SkillName : "Magic Crasher",
		MaxLv : 1,
		SpAmount : [ 8 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SKID.MG_SRECOVERY,1 ],
		]
	};

	exports[SKID.GC_DARKILLUSION] = {
		Name: "GC_DARKILLUSION",
		SkillName : "Dark Illusion",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : true,
		AttackRange : [ 5, 6, 7, 8, 9 ],
		_NeedSkillList : [
			[ SKID.GC_CROSSIMPACT,3 ]
		]
	};

	exports[SKID.HW_MAGICPOWER] = {
		Name: "HW_MAGICPOWER",
		SkillName : "Amplify Magic Power",
		MaxLv : 10,
		SpAmount : [ 14, 18, 22, 26, 30, 34, 38, 42, 46, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.RK_ABUNDANCE] = {
		Name: "RK_ABUNDANCE",
		SkillName : "Abundance",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.PA_PRESSURE] = {
		Name: "PA_PRESSURE",
		SkillName : "Pressure",
		MaxLv : 5,
		SpAmount : [ 30, 35, 40, 45, 50 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SM_ENDURE,5 ],
			[ SKID.CR_TRUST,5 ],
			[ SKID.CR_SHIELDCHARGE,2 ]
		]
	};

	exports[SKID.AL_DEMONBANE] = {
		Name: "AL_DEMONBANE",
		SkillName : "Demon Bane",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AL_DP,3 ]
		]
	};

	exports[SKID.PA_SACRIFICE] = {
		Name: "PA_SACRIFICE",
		SkillName : "Sacrifice",
		MaxLv : 5,
		SpAmount : [ 100, 100, 100, 100, 100 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.SM_ENDURE,1 ],
			[ SKID.CR_DEVOTION,3 ]
		]
	};

	exports[SKID.RK_STONEHARDSKIN] = {
		Name: "RK_STONEHARDSKIN",
		SkillName : "Stonehard Skin",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.PA_GOSPEL] = {
		Name: "PA_GOSPEL",
		SkillName : "Gospel",
		MaxLv : 10,
		SpAmount : [ 80, 80, 80, 80, 80, 100, 100, 100, 100, 100 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.CR_TRUST,8 ],
			[ SKID.AL_DP,3 ],
			[ SKID.AL_DEMONBANE,5 ]
		]
	};

	exports[SKID.RK_GIANTGROWTH] = {
		Name: "RK_GIANTGROWTH",
		SkillName : "Giant Growth",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.CH_PALMSTRIKE] = {
		Name: "CH_PALMSTRIKE",
		SkillName : "Palm Push Strike",
		MaxLv : 5,
		SpAmount : [ 2, 4, 6, 8, 10 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.MO_IRONHAND,7 ],
			[ SKID.MO_CALLSPIRITS,5 ]
		]
	};

	exports[SKID.RK_MILLENNIUMSHIELD] = {
		Name: "RK_MILLENNIUMSHIELD",
		SkillName : "Millennium Shield",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.CH_TIGERFIST] = {
		Name: "CH_TIGERFIST",
		SkillName : "Tiger Knuckle Fist",
		MaxLv : 5,
		SpAmount : [ 4, 6, 8, 10, 12 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.MO_IRONHAND,5 ],
			[ SKID.MO_TRIPLEATTACK,5 ],
			[ SKID.MO_COMBOFINISH,3 ]
		]
	};

	exports[SKID.RK_DRAGONTRAINING] = {
		Name: "RK_DRAGONTRAINING",
		SkillName : "Dragon Training",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.KN_CAVALIERMASTERY,1 ]
		]
	};

	exports[SKID.CH_CHAINCRUSH] = {
		Name: "CH_CHAINCRUSH",
		SkillName : "Chain Crush Combo",
		MaxLv : 10,
		SpAmount : [ 4, 6, 8, 10, 12, 14, 16, 18, 20, 22 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.MO_IRONHAND,5 ],
			[ SKID.MO_CALLSPIRITS,5 ],
			[ SKID.CH_TIGERFIST,2 ]
		]
	};

	exports[SKID.RK_DEATHBOUND] = {
		Name: "RK_DEATHBOUND",
		SkillName : "Death Bound",
		MaxLv : 10,
		SpAmount : [ 50, 60, 65, 70, 75, 80, 85, 90, 95, 100 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.KN_AUTOCOUNTER,1 ],
			[ SKID.RK_ENCHANTBLADE,2 ]
		]
	};

	exports[SKID.PF_HPCONVERSION] = {
		Name: "PF_HPCONVERSION",
		SkillName : "Health Conversion",
		MaxLv : 5,
		SpAmount : [ 1, 2, 3, 4, 5 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.MG_SRECOVERY,1 ],
			[ SKID.SA_MAGICROD,1 ]
		]
	};

	exports[SKID.HVAN_INSTRUCT] = {
		Name: "HVAN_INSTRUCT",
		SkillName : "Change Instruction",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.PF_SOULCHANGE] = {
		Name: "PF_SOULCHANGE",
		SkillName : "Soul Change",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SKID.SA_MAGICROD,3 ],
			[ SKID.SA_SPELLBREAKER,2 ]
		]
	};

	exports[SKID.MH_STAHL_HORN] = {
		Name: "MH_STAHL_HORN",
		SkillName : "Steel's Horn",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 5, 6, 7, 8, 9 ]
	};

	exports[SKID.PF_SOULBURN] = {
		Name: "PF_SOULBURN",
		SkillName : "Soul Burn",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.SA_CASTCANCEL,5 ],
			[ SKID.SA_MAGICROD,3 ],
			[ SKID.SA_DISPELL,3 ]
		]
	};

	exports[SKID.NPC_MAGICMIRROR] = {
		Name: "NPC_MAGICMIRROR",
		SkillName : "Magic Mirror",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	exports[SKID.ASC_KATAR] = {
		Name: "ASC_KATAR",
		SkillName : "Advanced Katar Research",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.TF_DOUBLE,5 ],
			[ SKID.AS_KATAR,7 ]
		]
	};

	exports[SKID.DA_DREAM] = {
		Name: "DA_DREAM",
		SkillName : "Black Dream Of Gemstone",
		MaxLv : 5,
		SpAmount : [ 600, 500, 400, 300, 200 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.DA_SPACE] = {
		Name: "DA_SPACE",
		SkillName : "Dark Twilight",
		MaxLv : 5,
		SpAmount : [ 120, 100, 80, 60, 40 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.GD_EMERGENCYCALL] = {
		Name: "GD_EMERGENCYCALL",
		SkillName : "Emergency Call",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.ASC_EDP] = {
		Name: "ASC_EDP",
		SkillName : "Enchant Deadly Poison",
		MaxLv : 5,
		SpAmount : [ 60, 70, 80, 90, 100 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.ASC_CDP,1 ]
		]
	};

	exports[SKID.DE_NIGHTMARE] = {
		Name: "DE_NIGHTMARE",
		SkillName : "Death Nightmare",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 4 ]
	};

	exports[SKID.ASC_BREAKER] = {
		Name: "ASC_BREAKER",
		SkillName : "Soul Breaker",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 30, 30, 30, 30, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.TF_DOUBLE,5 ],
			[ SKID.TF_POISON,5 ],
			[ SKID.AS_CLOAKING,3 ],
			[ SKID.AS_ENCHANTPOISON,6 ]
		]
	};

	exports[SKID.SL_GUNNER] = {
		Name: "SL_GUNNER",
		SkillName : "Gunslinger Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	exports[SKID.SN_SIGHT] = {
		Name: "SN_SIGHT",
		SkillName : "True Sight",
		MaxLv : 10,
		SpAmount : [ 20, 20, 25, 25, 30, 30, 35, 35, 40, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.AC_OWL,10 ],
			[ SKID.AC_VULTURE,10 ],
			[ SKID.AC_CONCENTRATION,10 ],
			[ SKID.HT_FALCON,1 ]
		]
	};

	exports[SKID.MB_MUNAKKNOWLEDGE] = {
		Name: "MB_MUNAKKNOWLEDGE",
		SkillName : "Taming Master",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 4 ]
	};

	exports[SKID.SN_FALCONASSAULT] = {
		Name: "SN_FALCONASSAULT",
		SkillName : "Falcon Assault",
		MaxLv : 5,
		SpAmount : [ 30, 34, 38, 42, 46 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.AC_VULTURE,5 ],
			[ SKID.HT_FALCON,1 ],
			[ SKID.HT_BLITZBEAT,5 ],
			[ SKID.HT_STEELCROW,3 ]
		]
	};

	exports[SKID.NJ_NEN] = {
		Name: "NJ_NEN",
		SkillName : "Soul",
		MaxLv : 5,
		SpAmount : [ 20, 30, 40, 50, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.NJ_NINPOU,5 ]
		]
	};

	exports[SKID.SN_SHARPSHOOTING] = {
		Name: "SN_SHARPSHOOTING",
		SkillName : "Sharp Shooting",
		MaxLv : 5,
		SpAmount : [ 18, 21, 24, 27, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SKID.AC_DOUBLE,5 ],
			[ SKID.AC_CONCENTRATION,10 ]
		]
	};

	exports[SKID.NJ_TATAMIGAESHI] = {
		Name: "NJ_TATAMIGAESHI",
		SkillName : "Reverse Tatami",
		MaxLv : 5,
		SpAmount : [ 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
	};

	exports[SKID.GS_CHAINACTION] = {
		Name: "GS_CHAINACTION",
		SkillName : "Chain Action",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.GS_SINGLEACTION,1 ]
		]
	};

	exports[SKID.KO_YAMIKUMO] = {
		Name: "KO_YAMIKUMO",
		SkillName : "Shadow Cloud",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.NJ_KIRIKAGE,5 ]
		]
	};

	exports[SKID.KO_RIGHT] = {
		Name: "KO_RIGHT",
		SkillName : "Right Hand Mastery",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.KO_LEFT] = {
		Name: "KO_LEFT",
		SkillName : "Left Hand Mastery",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	exports[SKID.KO_JYUMONJIKIRI] = {
		Name: "KO_JYUMONJIKIRI",
		SkillName : "Cross Strike",
		MaxLv : 5,
		SpAmount : [ 10, 12, 14, 16, 18 ],
		bSeperateLv : true,
		AttackRange : [ 3, 4, 5, 6, 7 ],
		_NeedSkillList : [
			[ SKID.KO_YAMIKUMO,1 ]
		]
	};

	exports[SKID.KO_SETSUDAN] = {
		Name: "KO_SETSUDAN",
		SkillName : "Setsudan",
		MaxLv : 5,
		SpAmount : [ 12, 16, 20, 24, 28 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SKID.KO_JYUMONJIKIRI,2 ]
		]
	};

	exports[SKID.KO_BAKURETSU] = {
		Name: "KO_BAKURETSU",
		SkillName : "Exploding Kunai",
		MaxLv : 5,
		SpAmount : [ 5, 6, 7, 8, 9 ],
		bSeperateLv : true,
		AttackRange : [ 7, 8, 9, 10, 11 ],
		_NeedSkillList : [
			[ SKID.NJ_KUNAI,5 ]
		]
	};

	exports[SKID.KO_HAPPOKUNAI] = {
		Name: "KO_HAPPOKUNAI",
		SkillName : " Happo Kunai",
		MaxLv : 5,
		SpAmount : [ 12, 14, 16, 18, 20 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.KO_BAKURETSU,1 ]
		]
	};

	exports[SKID.KO_MUCHANAGE] = {
		Name: "KO_MUCHANAGE",
		SkillName : "Overthrow",
		MaxLv : 10,
		SpAmount : [ 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11, 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SKID.KO_MAKIBISHI,3 ]
		]
	};

	exports[SKID.KO_HUUMARANKA] = {
		Name: "KO_HUUMARANKA",
		SkillName : "Huuma Ranka",
		MaxLv : 5,
		SpAmount : [ 24, 28, 32, 36, 40 ],
		bSeperateLv : true,
		AttackRange : [ 9, 10, 11, 12, 13 ],
		_NeedSkillList : [
			[ SKID.NJ_HUUMA,5 ]
		]
	};

	exports[SKID.KO_MAKIBISHI] = {
		Name: "KO_MAKIBISHI",
		SkillName : "Makibishi",
		MaxLv : 5,
		SpAmount : [ 9, 12, 15, 18, 21 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ],
		_NeedSkillList : [
			[ SKID.NJ_ZENYNAGE,1 ]
		]
	};

	exports[SKID.KO_MEIKYOUSISUI] = {
		Name: "KO_MEIKYOUSISUI",
		SkillName : "Meikyousisui",
		MaxLv : 5,
		SpAmount : [ 100, 100, 100, 100, 100 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.NJ_NINPOU,10 ]
		]
	};

	exports[SKID.KO_ZANZOU] = {
		Name: "KO_ZANZOU",
		SkillName : "Illusion - Afterimage",
		MaxLv : 5,
		SpAmount : [ 40, 44, 48, 52, 56 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.NJ_UTSUSEMI,1 ]
		]
	};

	exports[SKID.KO_KYOUGAKU] = {
		Name: "KO_KYOUGAKU",
		SkillName : "Illusion - Shock",
		MaxLv : 5,
		SpAmount : [ 40, 44, 48, 52, 56 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SKID.KO_GENWAKU,2 ]
		]
	};

	exports[SKID.KO_JYUSATSU] = {
		Name: "KO_JYUSATSU",
		SkillName : "Illusion - Killing Curse",
		MaxLv : 5,
		SpAmount : [ 40, 44, 48, 52, 56 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SKID.KO_KYOUGAKU,3 ]
		]
	};

	exports[SKID.KO_KAHU_ENTEN] = {
		Name: "KO_KAHU_ENTEN",
		SkillName : "Kahu Enten",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.KO_HYOUHU_HUBUKI] = {
		Name: "KO_HYOUHU_HUBUKI",
		SkillName : "Hyouhu Hubuki",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.KO_KAZEHU_SEIRAN] = {
		Name: "KO_KAZEHU_SEIRAN",
		SkillName : "Kazehu Seiran",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.KO_DOHU_KOUKAI] = {
		Name: "KO_DOHU_KOUKAI",
		SkillName : "Dohu Koukai",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	exports[SKID.KO_KAIHOU] = {
		Name: "KO_KAIHOU",
		SkillName : "Technique Kaihou",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.KO_KAHU_ENTEN,1 ],
			[ SKID.KO_HYOUHU_HUBUKI,1 ],
			[ SKID.KO_KAZEHU_SEIRAN,1 ],
			[ SKID.KO_DOHU_KOUKAI,1 ]
		]
	};

	exports[SKID.KO_ZENKAI] = {
		Name: "KO_ZENKAI",
		SkillName : "Zenkai",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SKID.KO_KAIHOU,1 ],
			[ SKID.KO_IZAYOI,1 ]
		]
	};

	exports[SKID.KO_GENWAKU] = {
		Name: "KO_GENWAKU",
		SkillName : "Genwaku",
		MaxLv : 5,
		SpAmount : [ 40, 44, 48, 52, 56 ],
		bSeperateLv : true,
		AttackRange : [ 5, 6, 7, 8, 9 ],
		_NeedSkillList : [
			[ SKID.NJ_UTSUSEMI,1 ]
		]
	};

	exports[SKID.KO_IZAYOI] = {
		Name: "KO_IZAYOI",
		SkillName : "16th Night",
		MaxLv : 5,
		SpAmount : [ 70, 75, 80, 85, 90 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.NJ_NINPOU,5 ]
		]
	};

	exports[SKID.KG_KAGEHUMI] = {
		Name: "KG_KAGEHUMI",
		SkillName : "Shadow Step",
		MaxLv : 5,
		SpAmount : [ 25, 30, 35, 40, 45 ],
		bSeperateLv : true,
		AttackRange : [ 5, 7, 9, 11, 13 ],
		_NeedSkillList : [
			[ SKID.KO_ZANZOU,1 ]
		]
	};

	exports[SKID.KG_KYOMU] = {
		Name: "KG_KYOMU",
		SkillName : "Kyomu",
		MaxLv : 5,
		SpAmount : [ 50, 50, 50, 50, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.KG_KAGEHUMI,2 ]
		]
	};

	exports[SKID.KG_KAGEMUSYA] = {
		Name: "KG_KAGEMUSYA",
		SkillName : "Shadow Warrior",
		MaxLv : 5,
		SpAmount : [ 60, 65, 70, 75, 80 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SKID.KG_KYOMU,3 ]
		]
	};

	exports[SKID.OB_ZANGETSU] = {
		Name: "OB_ZANGETSU",
		SkillName : "Distorted Crescent Moon",
		MaxLv : 5,
		SpAmount : [ 60, 70, 80, 90, 100 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ],
		_NeedSkillList : [
			[ SKID.KO_GENWAKU,1 ]
		]
	};

	exports[SKID.OB_OBOROGENSOU] = {
		Name: "OB_OBOROGENSOU",
		SkillName : "Oboro Gensou",
		MaxLv : 5,
		SpAmount : [ 55, 60, 65, 70, 75 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ],
		_NeedSkillList : [
			[ SKID.OB_AKAITSUKI,3 ]
		]
	};

	exports[SKID.OB_AKAITSUKI] = {
		Name: "OB_AKAITSUKI",
		SkillName : "Ominous Crimson Moonlight",
		MaxLv : 5,
		SpAmount : [ 20, 30, 40, 50, 60 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ],
		_NeedSkillList : [
			[ SKID.OB_ZANGETSU,2 ]
		]
	};

	exports[SKID.ECLAGE_RECALL] = {
		Name: "ECLAGE_RECALL",
		SkillName : "Return to Eclage",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
	};

	exports[SKID.ECL_SNOWFLIP] = {
		Name: "ECL_SNOWFLIP",
		SkillName : "Snow Flip",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 7 ],
	};

	exports[SKID.ECL_PEONYMAMY] = {
		Name: "ECL_PEONYMAMY",
		SkillName : "�����ϸ���",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 7 ],
	};

	exports[SKID.ECL_SADAGUI] = {
		Name: "ECL_SADAGUI",
		SkillName : "���ٱ�",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 7 ],
	};

	exports[SKID.ECL_SEQUOIADUST] = {
		Name: "ECL_SEQUOIADUST",
		SkillName : "Sequoia Dust",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 7 ],
	};


	return exports;
});