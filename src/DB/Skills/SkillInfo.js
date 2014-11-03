/**
 * DB/Skills/SkillInfo.js
 *
 * Manage skills
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(["./SkillConst", "DB/Jobs/JobConst"], function( SK, JobId )
{
	"use strict";


	var SkillInfo = {};


	SkillInfo[SK.SN_WINDWALK] = {
		Name: "SN_WINDWALK",
		SkillName : "Wind Walk",
		MaxLv : 10,
		SpAmount : [ 46, 52, 58, 64, 70, 76, 82, 88, 94, 100 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AC_CONCENTRATION,9 ]
		]
	};

	SkillInfo[SK.AL_RUWACH] = {
		Name: "AL_RUWACH",
		SkillName : "Ruwach",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 10 ]
	};

	SkillInfo[SK.WS_MELTDOWN] = {
		Name: "WS_MELTDOWN",
		SkillName : "Melt Down",
		MaxLv : 10,
		SpAmount : [ 50, 50, 60, 60, 70, 70, 80, 80, 90, 90 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BS_SKINTEMPER,3 ],
			[ SK.BS_HILTBINDING,1 ],
			[ SK.BS_WEAPONRESEARCH,5 ],
			[ SK.BS_OVERTHRUST,3 ]
		]
	};

	SkillInfo[SK.WS_CREATECOIN] = {
		Name: "WS_CREATECOIN",
		SkillName : "Create Coin",
		MaxLv : 3,
		SpAmount : [ 10, 20, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	SkillInfo[SK.MER_MAGNIFICAT] = {
		Name: "MER_MAGNIFICAT",
		SkillName : "Magnificat",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.WS_CREATENUGGET] = {
		Name: "WS_CREATENUGGET",
		SkillName : "Create Nugget",
		MaxLv : 3,
		SpAmount : [ 10, 20, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	SkillInfo[SK.WS_CARTBOOST] = {
		Name: "WS_CARTBOOST",
		SkillName : "Cart Boost",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.MC_PUSHCART,5 ],
			[ SK.BS_HILTBINDING,1 ],
			[ SK.MC_CARTREVOLUTION ],
			[ SK.MC_CHANGECART ]
		]
	};

	SkillInfo[SK.WS_SYSTEMCREATE] = {
		Name: "WS_SYSTEMCREATE",
		SkillName : "Auto Attack System",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 7 ]
	};

	SkillInfo[SK.ST_CHASEWALK] = {
		Name: "ST_CHASEWALK",
		SkillName : "Chase Walk",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.TF_HIDING,5 ],
			[ SK.RG_TUNNELDRIVE,3 ]
		]
	};

	SkillInfo[SK.ST_REJECTSWORD] = {
		Name: "ST_REJECTSWORD",
		SkillName : "Reject Sword",
		MaxLv : 5,
		SpAmount : [ 10, 15, 20, 25, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.ST_STEALBACKPACK] = {
		Name: "ST_STEALBACKPACK",
		SkillName : "Steal Backpack",
		MaxLv : 5,
		SpAmount : [ 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.EL_HEATER] = {
		Name: "EL_HEATER",
		SkillName : "Heater",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.CR_ALCHEMY] = {
		Name: "CR_ALCHEMY",
		SkillName : "Alchemy",
		MaxLv : 0,
		SpAmount : [ ],
		bSeperateLv : false,
		AttackRange : [ ]
	};

	SkillInfo[SK.CR_SYNTHESISPOTION] = {
		Name: "CR_SYNTHESISPOTION",
		SkillName : "Synthesis Potion",
		MaxLv : 0,
		SpAmount : [ ],
		bSeperateLv : false,
		AttackRange : [ ]
	};

	SkillInfo[SK.CG_ARROWVULCAN] = {
		Name: "CG_ARROWVULCAN",
		SkillName : "Arrow Vulcan",
		MaxLv : 10,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		NeedSkillList : new function(){
			this[JobId.JT_BARD_H] = [
				[ SK.AC_DOUBLE,5 ],
				[ SK.AC_SHOWER,5 ],
				[ SK.BA_MUSICALSTRIKE,1 ]
			];
			this[JobId.JT_DANCER_H] = [
				[ SK.AC_DOUBLE,5 ],
				[ SK.AC_SHOWER,5 ],
				[ SK.DC_THROWARROW,1 ]
			]
		},
		ActionType: "ATTACK"
	};

	SkillInfo[SK.CG_MOONLIT] = {
		Name: "CG_MOONLIT",
		SkillName : "Moonlit Water Mill",
		MaxLv : 5,
		SpAmount : [ 30, 40, 50, 60, 70 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		NeedSkillList : new function(){
			this[JobId.JT_BARD_H] = [
				[ SK.AC_CONCENTRATION,5 ],
				[ SK.BA_MUSICALLESSON,7 ]
			];
			this[JobId.JT_DANCER_H] = [
				[ SK.AC_CONCENTRATION,5 ],
				[ SK.DC_DANCINGLESSON,7 ]
			]
		}
	};

	SkillInfo[SK.CG_MARIONETTE] = {
		Name: "CG_MARIONETTE",
		SkillName : "Marionette Control",
		MaxLv : 1,
		SpAmount : [ 100 ],
		bSeperateLv : false,
		AttackRange : [ 7 ],
		NeedSkillList : new function(){
			this[JobId.JT_BARD_H] = [
				[ SK.AC_CONCENTRATION,10 ],
				[ SK.BA_MUSICALLESSON,5 ]
			];
			this[JobId.JT_DANCER_H] = [
				[ SK.AC_CONCENTRATION,10 ],
				[ SK.DC_DANCINGLESSON,5 ]
			]
		}
	};

	SkillInfo[SK.LK_SPIRALPIERCE] = {
		Name: "LK_SPIRALPIERCE",
		SkillName : "Spiral Pierce",
		MaxLv : 5,
		SpAmount : [ 18, 21, 24, 27, 30 ],
		bSeperateLv : true,
		AttackRange : [ 4, 4, 4, 4, 4 ],
		_NeedSkillList : [
			[ SK.KN_SPEARMASTERY,5 ],
			[ SK.KN_PIERCE,5 ],
			[ SK.KN_RIDING,1 ],
			[ SK.KN_SPEARSTAB,5 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.LK_HEADCRUSH] = {
		Name: "LK_HEADCRUSH",
		SkillName : "Head Crush",
		MaxLv : 5,
		SpAmount : [ 23, 23, 23, 23, 23 ],
		bSeperateLv : false,
		AttackRange : [ 4, 4, 4, 4, 4 ],
		_NeedSkillList : [
			[ SK.KN_SPEARMASTERY,9 ],
			[ SK.KN_RIDING,1 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.LK_JOINTBEAT] = {
		Name: "LK_JOINTBEAT",
		SkillName : "Joint Beat",
		MaxLv : 10,
		SpAmount : [ 12, 12, 14, 14, 16, 16, 18, 18, 20, 20 ],
		bSeperateLv : true,
		AttackRange : [ 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ],
		_NeedSkillList : [
			[ SK.KN_CAVALIERMASTERY,3 ],
			[ SK.LK_HEADCRUSH,3 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.AL_PNEUMA] = {
		Name: "AL_PNEUMA",
		SkillName : "Pneuma",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SK.AL_WARP,4 ]
		]
	};

	SkillInfo[SK.HW_NAPALMVULCAN] = {
		Name: "HW_NAPALMVULCAN",
		SkillName : "Napalm Vulcan",
		MaxLv : 5,
		SpAmount : [ 10, 25, 40, 55, 70 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_NAPALMBEAT,5 ]
		]
	};

	SkillInfo[SK.CH_SOULCOLLECT] = {
		Name: "CH_SOULCOLLECT",
		SkillName : "Dangerous Soul Collect",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.MO_EXPLOSIONSPIRITS,5 ]
		]
	};

	SkillInfo[SK.PF_MINDBREAKER] = {
		Name: "PF_MINDBREAKER",
		SkillName : "Mind Breaker",
		MaxLv : 5,
		SpAmount : [ 12, 15, 18, 21, 24 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_SRECOVERY,3 ],
			[ SK.PF_SOULBURN,2 ]
		]
	};

	SkillInfo[SK.PF_MEMORIZE] = {
		Name: "PF_MEMORIZE",
		SkillName : "Memorize",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.SA_ADVANCEDBOOK,5 ],
			[ SK.SA_FREECAST,5 ],
			[ SK.SA_AUTOSPELL,1 ]
		]
	};

	SkillInfo[SK.PF_FOGWALL] = {
		Name: "PF_FOGWALL",
		SkillName : "Wall of Fog",
		MaxLv : 1,
		SpAmount : [ 25 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SK.SA_VIOLENTGALE,2 ],
			[ SK.SA_DELUGE,2 ]
		]
	};

	SkillInfo[SK.PF_SPIDERWEB] = {
		Name: "PF_SPIDERWEB",
		SkillName : "Spider Web",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SK.SA_DRAGONOLOGY,4 ]
		]
	};

	SkillInfo[SK.ASC_METEORASSAULT] = {
		Name: "ASC_METEORASSAULT",
		SkillName : "Meteor Assault",
		MaxLv : 10,
		SpAmount : [ 10, 12, 14, 16, 18, 20, 22, 24, 26, 28 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AS_KATAR,5 ],
			[ SK.AS_RIGHT,3 ],
			[ SK.AS_SONICBLOW,5 ],
			[ SK.ASC_BREAKER,1 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.ASC_CDP] = {
		Name: "ASC_CDP",
		SkillName : "Create Deadly Poison",
		MaxLv : 1,
		SpAmount : [ 50 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.TF_POISON,10 ],
			[ SK.TF_DETOXIFY,1 ],
			[ SK.AS_ENCHANTPOISON,5 ]
		]
	};

	SkillInfo[SK.WE_BABY] = {
		Name: "WE_BABY",
		SkillName : "Mom, Dad, I love you!",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
	};

	SkillInfo[SK.WE_CALLPARENT] = {
		Name: "WE_CALLPARENT",
		SkillName : "Mom, Dad, I miss you!",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.WE_CALLBABY] = {
		Name: "WE_CALLBABY",
		SkillName : "Come to me, honey~",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.TK_RUN] = {
		Name: "TK_RUN",
		SkillName : "Running",
		MaxLv : 10,
		SpAmount : [ 100, 90, 80, 70, 60, 50, 40, 30, 20, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.TK_READYSTORM] = {
		Name: "TK_READYSTORM",
		SkillName : "Prepare Whirlwind Kick",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.TK_STORMKICK,1 ]
		]
	};

	SkillInfo[SK.TK_STORMKICK] = {
		Name: "TK_STORMKICK",
		SkillName : "Whirlwind Kick",
		MaxLv : 7,
		SpAmount : [ 14, 12, 10, 8, 6, 4, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.TK_READYDOWN] = {
		Name: "TK_READYDOWN",
		SkillName : "Prepare Axe Kick",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.TK_DOWNKICK,1 ]
		]
	};

	SkillInfo[SK.TK_DOWNKICK] = {
		Name: "TK_DOWNKICK",
		SkillName : "Axe Kick",
		MaxLv : 7,
		SpAmount : [ 14, 12, 10, 8, 6, 4, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.AL_TELEPORT] = {
		Name: "AL_TELEPORT",
		SkillName : "Teleportation",
		MaxLv : 2,
		SpAmount : [ 10, 9 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1 ],
		_NeedSkillList : [
			[ SK.AL_RUWACH,1 ]
		]
	};

	SkillInfo[SK.TK_READYTURN] = {
		Name: "TK_READYTURN",
		SkillName : "Prepare Round Kick",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.TK_TURNKICK,1 ]
		]
	};

	SkillInfo[SK.TK_TURNKICK] = {
		Name: "TK_TURNKICK",
		SkillName : "Round Kick",
		MaxLv : 7,
		SpAmount : [ 14, 12, 10, 8, 6, 4, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.TK_READYCOUNTER] = {
		Name: "TK_READYCOUNTER",
		SkillName : "Prepare Counter Kick",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.TK_COUNTER,1 ]
		]
	};

	SkillInfo[SK.TK_COUNTER] = {
		Name: "TK_COUNTER",
		SkillName : "Counter Kick",
		MaxLv : 7,
		SpAmount : [ 14, 12, 10, 8, 6, 4, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.TK_DODGE] = {
		Name: "TK_DODGE",
		SkillName : "Break Fall",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.TK_JUMPKICK,7 ]
		]
	};

	SkillInfo[SK.TK_JUMPKICK] = {
		Name: "TK_JUMPKICK",
		SkillName : "Flying Side Kick",
		MaxLv : 7,
		SpAmount : [ 70, 60, 50, 40, 30, 20, 10 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9 ],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.TK_HPTIME] = {
		Name: "TK_HPTIME",
		SkillName : "Peaceful Rest",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.TK_SPTIME] = {
		Name: "TK_SPTIME",
		SkillName : "Enjoyable Rest",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.TK_POWER] = {
		Name: "TK_POWER",
		SkillName : "Fighting Chant",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.TK_SEVENWIND] = {
		Name: "TK_SEVENWIND",
		SkillName : "Warm Wind",
		MaxLv : 7,
		SpAmount : [ 20, 20, 20, 20, 50, 50, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.TK_HPTIME,5 ],
			[ SK.TK_SPTIME,5 ],
			[ SK.TK_POWER,5 ]
		]
	};

	SkillInfo[SK.TK_HIGHJUMP] = {
		Name: "TK_HIGHJUMP",
		SkillName : "High Jump",
		MaxLv : 5,
		SpAmount : [ 50, 50, 50, 50, 50 ],
		bSeperateLv : true,
		AttackRange : [ 2, 4, 6, 8, 10 ]
	};

	SkillInfo[SK.SG_FEEL] = {
		Name: "SG_FEEL",
		SkillName : "Feeling",
		MaxLv : 3,
		SpAmount : [ 100, 100, 100 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ]
	};

	SkillInfo[SK.SG_SUN_WARM] = {
		Name: "SG_SUN_WARM",
		SkillName : "Warmth of the Sun",
		MaxLv : 3,
		SpAmount : [ 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SG_FEEL,1 ]
		]
	};

	SkillInfo[SK.SG_MOON_WARM] = {
		Name: "SG_MOON_WARM",
		SkillName : "Warmth of the Moon",
		MaxLv : 3,
		SpAmount : [ 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SG_FEEL,2 ]
		]
	};

	SkillInfo[SK.SG_STAR_WARM] = {
		Name: "SG_STAR_WARM",
		SkillName : "Warmth of the Stars",
		MaxLv : 3,
		SpAmount : [ 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SG_FEEL,3 ]
		]
	};

	SkillInfo[SK.SG_SUN_COMFORT] = {
		Name: "SG_SUN_COMFORT",
		SkillName : "Comfort of the Sun",
		MaxLv : 4,
		SpAmount : [ 70, 60, 50, 40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SG_FEEL,1 ]
		]
	};

	SkillInfo[SK.AL_WARP] = {
		Name: "AL_WARP",
		SkillName : "Warp Portal",
		MaxLv : 4,
		SpAmount : [ 35, 32, 29, 26 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.AL_TELEPORT,2 ]
		]
	};

	SkillInfo[SK.SG_MOON_COMFORT] = {
		Name: "SG_MOON_COMFORT",
		SkillName : "Comfort of the Moon",
		MaxLv : 4,
		SpAmount : [ 70, 60, 50 ,40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SG_FEEL,2 ]
		]
	};

	SkillInfo[SK.SG_STAR_COMFORT] = {
		Name: "SG_STAR_COMFORT",
		SkillName : "Comfort of the Stars",
		MaxLv : 4,
		SpAmount : [ 70, 60, 50 ,40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SG_FEEL,3 ]
		]
	};

	SkillInfo[SK.SG_HATE] = {
		Name: "SG_HATE",
		SkillName : "Hatred",
		MaxLv : 3,
		SpAmount : [ 100, 100, 100 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9 ]
	};

	SkillInfo[SK.SG_SUN_ANGER] = {
		Name: "SG_SUN_ANGER",
		SkillName : "Anger of the Sun",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SG_HATE,1 ]
		]
	};

	SkillInfo[SK.SG_MOON_ANGER] = {
		Name: "SG_MOON_ANGER",
		SkillName : "Anger of the Moon",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SG_HATE,2 ]
		]
	};

	SkillInfo[SK.SG_STAR_ANGER] = {
		Name: "SG_STAR_ANGER",
		SkillName : "Anger of the Stars",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SG_HATE,3 ]
		]
	};

	SkillInfo[SK.SG_SUN_BLESS] = {
		Name: "SG_SUN_BLESS",
		SkillName : "Blessing of the Sun",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SG_FEEL,1 ],
			[ SK.SG_HATE,1 ]
		]
	};

	SkillInfo[SK.SG_MOON_BLESS] = {
		Name: "SG_MOON_BLESS",
		SkillName : "Blessing of the Moon",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SG_FEEL,2 ],
			[ SK.SG_HATE,2 ]
		]
	};

	SkillInfo[SK.SG_STAR_BLESS] = {
		Name: "SG_STAR_BLESS",
		SkillName : "Blessing of the Stars",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SG_FEEL,3 ],
			[ SK.SG_HATE,3 ]
		]
	};

	SkillInfo[SK.SG_DEVIL] = {
		Name: "SG_DEVIL",
		SkillName : "Demon",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.GD_DEVELOPMENT] = {
		Name: "GD_DEVELOPMENT",
		SkillName : "Emsolute Develop",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.SG_FRIEND] = {
		Name: "SG_FRIEND",
		SkillName : "Friend",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	SkillInfo[SK.SG_KNOWLEDGE] = {
		Name: "SG_KNOWLEDGE",
		SkillName : "Knowledge",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.SG_FUSION] = {
		Name: "SG_FUSION",
		SkillName : "Union",
		MaxLv : 1,
		Type : "Soul",
		SpAmount : [ 100 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.SG_KNOWLEDGE,9 ]
		]
	};

	SkillInfo[SK.SL_ALCHEMIST] = {
		Name: "SL_ALCHEMIST",
		SkillName : "Alchemist Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.AM_BERSERKPITCHER] = {
		Name: "AM_BERSERKPITCHER",
		SkillName : "Berserk Pitcher",
		MaxLv : 1,
		Type : "Soul",
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.SL_MONK] = {
		Name: "SL_MONK",
		SkillName : "Monk Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.AL_HEAL] = {
		Name: "AL_HEAL",
		SkillName : "Heal",
		MaxLv : 10,
		SpAmount : [ 13, 16, 19, 22, 25, 28, 31, 34, 37, 40 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		NeedSkillList : new function(){
			this[JobId.JT_CRUSADER] = [
				[ SK.CR_TRUST,10 ],
				[ SK.AL_DEMONBANE,5 ]
			]
		}
	};

	SkillInfo[SK.SL_STAR] = {
		Name: "SL_STAR",
		SkillName : "Star Gladiator Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.SL_SAGE] = {
		Name: "SL_SAGE",
		SkillName : "Sage Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.MER_QUICKEN] = {
		Name: "MER_QUICKEN",
		SkillName : "Two-Hand Quicken",
		MaxLv : 10,
		SpAmount : [ 14, 18, 22, 26, 30, 34, 38, 42, 46, 50 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.SL_CRUSADER] = {
		Name: "SL_CRUSADER",
		SkillName : "Crusader Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.SL_SUPERNOVICE] = {
		Name: "SL_SUPERNOVICE",
		SkillName : "Super Novice Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SL_STAR,1 ]
		]

	};

	SkillInfo[SK.SL_KNIGHT] = {
		Name: "SL_KNIGHT",
		SkillName : "Knight Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SL_CRUSADER,1 ]
		]
	};

	SkillInfo[SK.SL_WIZARD] = {
		Name: "SL_WIZARD",
		SkillName : "Wizard Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SL_SAGE,1 ]
		]
	};

	SkillInfo[SK.SL_PRIEST] = {
		Name: "SL_PRIEST",
		SkillName : "Priest Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SL_MONK,1 ]
		]
	};

	SkillInfo[SK.SL_BARDDANCER] = {
		Name: "SL_BARDDANCER",
		SkillName : "Bard and Dancer Spirits",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.EL_TROPIC] = {
		Name: "EL_TROPIC",
		SkillName : "Tropic",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.SL_ROGUE] = {
		Name: "SL_ROGUE",
		SkillName : "Rogue Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SL_ASSASIN,1 ]
		]
	};

	SkillInfo[SK.SL_ASSASIN] = {
		Name: "SL_ASSASIN",
		SkillName : "Assassin Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.SL_BLACKSMITH] = {
		Name: "SL_BLACKSMITH",
		SkillName : "Blacksmith Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SL_ALCHEMIST,1 ]
		]
	};

	SkillInfo[SK.BS_ADRENALINE2] = {
		Name: "BS_ADRENALINE2",
		SkillName : "Full Adrenaline Rush",
		MaxLv : 1,
		Type : "Soul",
		SpAmount : [ 64 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.BS_ADRENALINE,5 ]
		]
	};

	SkillInfo[SK.SL_HUNTER] = {
		Name: "SL_HUNTER",
		SkillName : "Hunter Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SL_BARDDANCER,1 ]
		]
	};

	SkillInfo[SK.SL_SOULLINKER] = {
		Name: "SL_SOULLINKER",
		SkillName : "Soul Linker Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SL_STAR,1 ]
		]
	};

	SkillInfo[SK.SL_KAIZEL] = {
		Name: "SL_KAIZEL",
		SkillName : "Kaizel",
		MaxLv : 7,
		SpAmount : [ 120, 110, 100, 90, 80, 70, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SL_PRIEST,1 ]
		]
	};

	SkillInfo[SK.SL_KAAHI] = {
		Name: "SL_KAAHI",
		SkillName : "Kaahi",
		MaxLv : 7,
		SpAmount : [ 30, 30, 30, 30, 30, 30, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SL_CRUSADER,1 ],
			[ SK.SL_MONK,1 ],
			[ SK.SL_PRIEST,1 ]
		]
	};

	SkillInfo[SK.AL_INCAGI] = {
		Name: "AL_INCAGI",
		SkillName : "Increase Agility",
		MaxLv : 10,
		SpAmount : [ 18, 21, 24, 27, 30, 33, 36, 39, 42, 45 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.AL_HEAL,3]
		]
	};

	SkillInfo[SK.SL_KAUPE] = {
		Name: "SL_KAUPE",
		SkillName : "Kaupe",
		MaxLv : 3,
		SpAmount : [ 20, 30, 40 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SL_ASSASIN,1 ],
			[ SK.SL_ROGUE,1 ]
		]
	};

	SkillInfo[SK.SL_KAITE] = {
		Name: "SL_KAITE",
		SkillName : "Kaite",
		MaxLv : 7,
		SpAmount : [ 70, 70, 70, 70, 70, 70, 70 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SL_SAGE,1 ],
			[ SK.SL_WIZARD,1 ]
		]
	};

	SkillInfo[SK.SL_KAINA] = {
		Name: "SL_KAINA",
		SkillName : "Kaina",
		MaxLv : 7,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.TK_SPTIME,1 ]
		]
	};

	SkillInfo[SK.SL_STIN] = {
		Name: "SL_STIN",
		SkillName : "Estin",
		MaxLv : 7,
		SpAmount : [ 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SL_WIZARD,1 ]
		]
	};

	SkillInfo[SK.SL_STUN] = {
		Name: "SL_STUN",
		SkillName : "Estun",
		MaxLv : 7,
		SpAmount : [ 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SL_WIZARD,1 ]
		]
	};

	SkillInfo[SK.SL_SMA] = {
		Name: "SL_SMA",
		SkillName : "Esma",
		MaxLv : 10,
		SpAmount : [ 8, 16, 24, 32, 40, 48, 56, 64, 72, 80 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SL_STIN,7 ],
			[ SK.SL_STUN,7 ]
		]
	};

	SkillInfo[SK.SL_SWOO] = {
		Name: "SL_SWOO",
		SkillName : "Eswoo",
		MaxLv : 7,
		SpAmount : [ 75, 65, 55, 45, 35, 25, 15 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SL_PRIEST,1 ]
		]
	};

	SkillInfo[SK.SL_SKE] = {
		Name: "SL_SKE",
		SkillName : "Eske",
		MaxLv : 3,
		SpAmount : [ 45, 30, 15 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SL_KNIGHT,1 ]
		]
	};

	SkillInfo[SK.SL_SKA] = {
		Name: "SL_SKA",
		SkillName : "Eska",
		MaxLv : 3,
		SpAmount : [ 100, 80, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SL_MONK,1 ]
		]
	};

	SkillInfo[SK.ST_PRESERVE] = {
		Name: "ST_PRESERVE",
		SkillName : "Preserve",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.RG_PLAGIARISM,10 ]
		]
	};

	SkillInfo[SK.ST_FULLSTRIP] = {
		Name: "ST_FULLSTRIP",
		SkillName : "Full Strip",
		MaxLv : 5,
		SpAmount : [ 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RG_STRIPWEAPON,5 ]
		]
	};

	SkillInfo[SK.WS_WEAPONREFINE] = {
		Name: "WS_WEAPONREFINE",
		SkillName : "Weapon Refine",
		MaxLv : 10,
		SpAmount : [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BS_WEAPONRESEARCH,10 ]
		]
	};

	SkillInfo[SK.CR_SLIMPITCHER] = {
		Name: "CR_SLIMPITCHER",
		SkillName : "Slim Potion Pitcher",
		MaxLv : 10,
		SpAmount : [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.AM_POTIONPITCHER,5 ]
		]
	};

	SkillInfo[SK.CR_FULLPROTECTION] = {
		Name: "CR_FULLPROTECTION",
		SkillName : "Full Chemical Protection",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AM_CP_WEAPON,5 ],
			[ SK.AM_CP_ARMOR,5 ],
			[ SK.AM_CP_SHIELD,5 ],
			[ SK.AM_CP_HELM,5 ],
		]
	};

	SkillInfo[SK.AL_DECAGI] = {
		Name: "AL_DECAGI",
		SkillName : "Decrease Agility",
		MaxLv : 10,
		SpAmount : [ 15, 17, 19, 21, 23, 25, 27, 29, 31, 33 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.AL_INCAGI, 1 ]
		]
	};

	SkillInfo[SK.PA_SHIELDCHAIN] = {
		Name: "PA_SHIELDCHAIN",
		SkillName : "Shield Chain",
		MaxLv : 5,
		SpAmount : [ 28, 31, 34, 37, 40 ],
		bSeperateLv : true,
		AttackRange : [ 4, 4, 4, 4, 4 ],
		_NeedSkillList : [
			[ SK.CR_SHIELDBOOMERANG,5 ]
		]
	};

	SkillInfo[SK.HP_MANARECHARGE] = {
		Name: "HP_MANARECHARGE",
		SkillName : "Mana Recharge",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.PR_MACEMASTERY,10 ],
			[ SK.AL_DEMONBANE,10 ]
		]
	};

	SkillInfo[SK.PF_DOUBLECASTING] = {
		Name: "PF_DOUBLECASTING",
		SkillName : "Double Casting",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SA_AUTOSPELL,1 ]
		]
	};

	SkillInfo[SK.HW_GANBANTEIN] = {
		Name: "HW_GANBANTEIN",
		SkillName : "Ganbantein",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 18 ],
		_NeedSkillList : [
			[ SK.WZ_ESTIMATION,1 ],
			[ SK.WZ_ICEWALL,1 ]
		]
	};

	SkillInfo[SK.HW_GRAVITATION] = {
		Name: "HW_GRAVITATION",
		SkillName : "Gravitation Field",
		MaxLv : 5,
		SpAmount : [ 20, 40, 60, 80, 100 ],
		bSeperateLv : true,
		AttackRange : [ 18, 18, 18, 18, 18 ],
		_NeedSkillList : [
			[ SK.WZ_QUAGMIRE,1 ],
			[ SK.HW_MAGICCRASHER,1 ],
			[ SK.HW_MAGICPOWER,10 ]
		]
	};

	SkillInfo[SK.WS_CARTTERMINATION] = {
		Name: "WS_CARTTERMINATION",
		SkillName : "Cart Termination",
		MaxLv : 10,
		SpAmount : [ 15, 15, 15, 15, 15, 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.MC_MAMMONITE,10 ],
			[ SK.BS_HAMMERFALL,5 ],
			[ SK.WS_CARTBOOST,1 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.WS_OVERTHRUSTMAX] = {
		Name: "WS_OVERTHRUSTMAX",
		SkillName : "Maximum Over Thrust",
		MaxLv : 5,
		SpAmount : [ 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BS_OVERTHRUST,5 ]
		]
	};

	SkillInfo[SK.CG_LONGINGFREEDOM] = {
		Name: "CG_LONGINGFREEDOM",
		SkillName : "Longing for Freedom",
		MaxLv : 5,
		SpAmount : [ 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		NeedSkillList : new function(){
			this[JobId.JT_BARD_H] = [
				[ SK.CG_MARIONETTE,1 ],
				[ SK.BA_DISSONANCE,3 ],
				[ SK.BA_MUSICALLESSON,10 ]
			];
			this[JobId.JT_DANCER_H] = [
				[ SK.CG_MARIONETTE,1 ],
				[ SK.DC_UGLYDANCE,3 ],
				[ SK.DC_DANCINGLESSON,10 ]
			]
		}
	};

	SkillInfo[SK.CG_HERMODE] = {
		Name: "CG_HERMODE",
		SkillName : "Wand of Hermode",
		MaxLv : 5,
		SpAmount : [ 20, 30, 40, 50, 60 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		NeedSkillList : new function(){
			this[JobId.JT_BARD_H] = [
				[ SK.AC_CONCENTRATION,10 ],
				[ SK.BA_MUSICALLESSON,10 ]
			];
			this[JobId.JT_DANCER_H] = [
				[ SK.AC_CONCENTRATION,10 ],
				[ SK.DC_DANCINGLESSON,10 ]
			]
		}
	};

	SkillInfo[SK.CG_TAROTCARD] = {
		Name: "CG_TAROTCARD",
		SkillName : "Tarot Card of Fate",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		NeedSkillList : new function(){
			this[JobId.JT_BARD_H] = [
				[ SK.AC_CONCENTRATION,10 ],
				[ SK.BA_DISSONANCE,3 ]
			];
			this[JobId.JT_DANCER_H] = [
				[ SK.AC_CONCENTRATION,10 ],
				[ SK.DC_UGLYDANCE,3 ]
			]
		}
	};

	SkillInfo[SK.CR_ACIDDEMONSTRATION] = {
		Name: "CR_ACIDDEMONSTRATION",
		SkillName : "Acid Demonstration",
		MaxLv : 10,
		SpAmount : [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.AM_DEMONSTRATION,5 ],
			[ SK.AM_ACIDTERROR,5 ]
		]
	};

	SkillInfo[SK.CR_CULTIVATION] = {
		Name: "CR_CULTIVATION",
		SkillName : "Plant Cultivation",
		MaxLv : 2,
		SpAmount : [ 10, 10 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1 ]
	};

	SkillInfo[SK.TK_MISSION] = {
		Name: "TK_MISSION",
		SkillName : "TaeKwon Mission",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.TK_POWER,5 ]
		]
	};

	SkillInfo[SK.SL_HIGH] = {
		Name: "SL_HIGH",
		SkillName : "Rebirth Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SL_SUPERNOVICE,5 ]
		]
	};

	SkillInfo[SK.KN_ONEHAND] = {
		Name: "KN_ONEHAND",
		SkillName : "One-Hand Quicken",
		MaxLv : 1,
		Type : "Soul",
		SpAmount : [ 100, 100, 100, 100, 100, 100, 100, 100, 100, 100 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.KN_TWOHANDQUICKEN,10 ]
		]
	};

	SkillInfo[SK.AL_HOLYWATER] = {
		Name: "AL_HOLYWATER",
		SkillName : "Aqua Benedicta",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
	};

	SkillInfo[SK.AM_TWILIGHT1] = {
		Name: "AM_TWILIGHT1",
		SkillName : "Twilight Alchemy",
		MaxLv : 1,
		Type : "Soul",
		SpAmount : [ 200 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.AM_PHARMACY,10 ]
		]
	};

	SkillInfo[SK.AM_TWILIGHT2] = {
		Name: "AM_TWILIGHT2",
		SkillName : "Twilight Alchemy",
		MaxLv : 1,
		Type : "Soul",
		SpAmount : [ 200 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.AM_PHARMACY,10 ]
		]
	};

	SkillInfo[SK.AM_TWILIGHT3] = {
		Name: "AM_TWILIGHT3",
		SkillName : "Twilight Alchemy",
		MaxLv : 1,
		Type : "Soul",
		SpAmount : [ 200 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.AM_PHARMACY,10 ]
		]
	};

	SkillInfo[SK.HT_POWER] = {
		Name: "HT_POWER",
		SkillName : "Beast Strafing",
		MaxLv : 1,
		Type : "Soul",
		SpAmount : [ 12 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SK.AC_DOUBLE,10 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.GS_GLITTERING] = {
		Name: "GS_GLITTERING",
		SkillName : "Flip the Coin",
		MaxLv : 5,
		SpAmount : [ 2, 2, 2, 2, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
	};

	SkillInfo[SK.RK_ENCHANTBLADE] = {
		Name: "RK_ENCHANTBLADE",
		SkillName : "Enchant Blade",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RK_RUNEMASTERY,2 ]
		]
	};

	SkillInfo[SK.GS_FLING] = {
		Name: "GS_FLING",
		SkillName : "Fling",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SK.GS_GLITTERING,1 ]
		]
	};

	SkillInfo[SK.RK_WINDCUTTER] = {
		Name: "RK_WINDCUTTER",
		SkillName : "Wind Cutter",
		MaxLv : 5,
		SpAmount : [ 20, 24, 28, 32, 36 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RK_ENCHANTBLADE,5 ]
		]
	};

	SkillInfo[SK.GS_TRIPLEACTION] = {
		Name: "GS_TRIPLEACTION",
		SkillName : "Triple Action",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SK.GS_GLITTERING,1 ],
			[ SK.GS_CHAINACTION,10 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.RK_DRAGONHOWLING] = {
		Name: "RK_DRAGONHOWLING",
		SkillName : "Dragon Howling",
		MaxLv : 5,
		SpAmount : [ 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RK_DRAGONTRAINING,2 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.GS_BULLSEYE] = {
		Name: "GS_BULLSEYE",
		SkillName : "Bull's Eye",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SK.GS_GLITTERING,5 ],
			[ SK.GS_TRACKING,10 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.RK_REFRESH] = {
		Name: "RK_REFRESH",
		SkillName : "Refresh",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
	};

	SkillInfo[SK.GS_MADNESSCANCEL] = {
		Name: "GS_MADNESSCANCEL",
		SkillName : "Madness Canceller",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.GS_GATLINGFEVER,10 ],
			[ SK.GS_GLITTERING,4 ]
		]
	};

	SkillInfo[SK.RK_STORMBLAST] = {
		Name: "RK_STORMBLAST",
		SkillName : "Storm Blast",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
	};

	SkillInfo[SK.GS_ADJUSTMENT] = {
		Name: "GS_ADJUSTMENT",
		SkillName : "Adjustment",
		MaxLv : 1,
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.GS_GLITTERING,4 ],
			[ SK.GS_DISARM,5 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.GC_VENOMIMPRESS] = {
		Name: "GC_VENOMIMPRESS",
		SkillName : "Venom Impress",
		MaxLv : 5,
		SpAmount : [ 12, 16, 20, 24, 28 ],
		bSeperateLv : true,
		AttackRange : [ 10, 10, 10, 10, 10 ]
	};

	SkillInfo[SK.GS_INCREASING] = {
		Name: "GS_INCREASING",
		SkillName : "Increasing Accuracy",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.GS_GLITTERING,2 ],
			[ SK.GS_SNAKEEYE,10 ]
		]
	};

	SkillInfo[SK.GC_CREATENEWPOISON] = {
		Name: "GC_CREATENEWPOISON",
		SkillName : "Create New Poison",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.GC_RESEARCHNEWPOISON,1 ]
		]
	};

	SkillInfo[SK.GS_MAGICALBULLET] = {
		Name: "GS_MAGICALBULLET",
		SkillName : "Magical Bullet",
		MaxLv : 1,
		SpAmount : [ 7 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SK.GS_GLITTERING,1 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.GC_COUNTERSLASH] = {
		Name: "GC_COUNTERSLASH",
		SkillName : "Counter Slash",
		MaxLv : 5,
		SpAmount : [ 5, 8, 11, 14, 17 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.GC_WEAPONBLOCKING,1 ]
		]
	};

	SkillInfo[SK.GS_CRACKER] = {
		Name: "GS_CRACKER",
		SkillName : "Cracker",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SK.GS_GLITTERING,1 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.GC_CLOAKINGEXCEED] = {
		Name: "GC_CLOAKINGEXCEED",
		SkillName : "Cloaking Exceed",
		MaxLv : 5,
		SpAmount : [ 45, 45, 45, 45, 45 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AS_CLOAKING,3 ]
		]
	};

	SkillInfo[SK.GS_SINGLEACTION] = {
		Name: "GS_SINGLEACTION",
		SkillName : "Single Action",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.GC_CROSSRIPPERSLASHER] = {
		Name: "GC_CROSSRIPPERSLASHER",
		SkillName : "Cross Ripper Slasher",
		MaxLv : 5,
		SpAmount : [ 20, 24, 28, 32, 36 ],
		bSeperateLv : true,
		AttackRange : [ 9, 10, 11, 12, 13 ],
		_NeedSkillList : [
			[ SK.GC_ROLLINGCUTTER,1 ]
		]
	};

	SkillInfo[SK.GS_SNAKEEYE] = {
		Name: "GS_SNAKEEYE",
		SkillName : "Snake's Eye",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	SkillInfo[SK.AB_CLEMENTIA] = {
		Name: "AB_CLEMENTIA",
		SkillName : "Clementia",
		MaxLv : 3,
		SpAmount : [ 280, 320, 360 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AL_BLESSING,1 ]
		]
	};

	SkillInfo[SK.SM_SWORD] = {
		Name: "SM_SWORD",
		SkillName : "Sword Mastery",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	SkillInfo[SK.AL_CRUCIS] = {
		Name: "AL_CRUCIS",
		SkillName : "Signum Crucis",
		MaxLv : 10,
		SpAmount : [ 35, 35, 35, 35, 35, 35, 35, 35, 35, 35 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AL_DEMONBANE,3 ]
		]
	};

	SkillInfo[SK.GS_TRACKING] = {
		Name: "GS_TRACKING",
		SkillName : "Tracking",
		MaxLv : 10,
		SpAmount : [ 15, 20, 25, 30, 35, 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.GS_SINGLEACTION,5 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.GS_DISARM] = {
		Name: "GS_DISARM",
		SkillName : "Disarm",
		MaxLv : 5,
		SpAmount : [ 15, 20, 25, 30, 35 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.GS_TRACKING,7 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.GS_PIERCINGSHOT] = {
		Name: "GS_PIERCINGSHOT",
		SkillName : "Piercing Shot",
		MaxLv : 5,
		SpAmount : [ 11, 12, 13, 14, 15 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.GS_TRACKING,5 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.GS_RAPIDSHOWER] = {
		Name: "GS_RAPIDSHOWER",
		SkillName : "Rapid Shower",
		MaxLv : 10,
		SpAmount : [ 22, 24, 26, 28, 30, 32, 34, 36, 38, 40 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.GS_CHAINACTION,3 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.GS_DESPERADO] = {
		Name: "GS_DESPERADO",
		SkillName : "Desperado",
		MaxLv : 10,
		SpAmount : [ 32, 34, 36, 38, 40, 42, 44, 46, 48, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.GS_RAPIDSHOWER,5 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.GS_GATLINGFEVER] = {
		Name: "GS_GATLINGFEVER",
		SkillName : "Gatling Fever",
		MaxLv : 10,
		SpAmount : [ 30, 32, 34, 36, 38, 40, 42, 44, 46, 48 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.GS_RAPIDSHOWER,7 ],
			[ SK.GS_DESPERADO,5 ]
		]
	};

	SkillInfo[SK.GS_DUST] = {
		Name: "GS_DUST",
		SkillName : "Dust",
		MaxLv : 10,
		SpAmount : [ 3, 6, 9, 12, 15, 18, 21, 24, 27, 30 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.GS_SINGLEACTION,5 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.GS_FULLBUSTER] = {
		Name: "GS_FULLBUSTER",
		SkillName : "Full Buster",
		MaxLv : 10,
		SpAmount : [ 20, 25, 30, 35, 40, 45, 50, 55, 60, 65 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.GS_DUST,3 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.GS_SPREADATTACK] = {
		Name: "GS_SPREADATTACK",
		SkillName : "Spread Attack",
		MaxLv : 10,
		SpAmount : [ 15, 20, 25, 30, 35, 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.GS_FULLBUSTER,5 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.GS_GROUNDDRIFT] = {
		Name: "GS_GROUNDDRIFT",
		SkillName : "Ground Drift",
		MaxLv : 10,
		SpAmount : [ 4, 8, 12, 16, 20, 24, 28, 32, 36, 40 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.GS_SPREADATTACK,7 ],
			[ SK.GS_FULLBUSTER,5 ]
		]
	};

	SkillInfo[SK.NJ_TOBIDOUGU] = {
		Name: "NJ_TOBIDOUGU",
		SkillName : "Throwing Mastery",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	SkillInfo[SK.NJ_SYURIKEN] = {
		Name: "NJ_SYURIKEN",
		SkillName : "Throw Shuriken",
		MaxLv : 10,
		SpAmount : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.NJ_TOBIDOUGU,1 ]
		]
	};

	SkillInfo[SK.NJ_KUNAI] = {
		Name: "NJ_KUNAI",
		SkillName : "Throw Kunai",
		MaxLv : 5,
		SpAmount : [ 30, 25, 20, 15, 10 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.NJ_SYURIKEN,5 ]
		]
	};

	SkillInfo[SK.NJ_HUUMA] = {
		Name: "NJ_HUUMA",
		SkillName : "Throw Fuuma Shuriken",
		MaxLv : 5,
		SpAmount : [ 20, 25, 30, 35, 40 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.NJ_TOBIDOUGU,5 ],
			[ SK.NJ_KUNAI,5 ]
		]
	};

	SkillInfo[SK.NJ_ZENYNAGE] = {
		Name: "NJ_ZENYNAGE",
		SkillName : "Throw Zeny",
		MaxLv : 10,
		SpAmount : [ 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7, 7, 7, 7, 7, 7 ],
		_NeedSkillList : [
			[ SK.NJ_TOBIDOUGU,10 ],
			[ SK.NJ_HUUMA,5 ]
		]
	};

	SkillInfo[SK.AL_ANGELUS] = {
		Name: "AL_ANGELUS",
		SkillName : "Angelus",
		MaxLv : 10,
		SpAmount : [ 23,26, 29, 32, 35, 38, 41, 44, 47, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AL_DP,3 ]
		]
	};

	SkillInfo[SK.NJ_KASUMIKIRI] = {
		Name: "NJ_KASUMIKIRI",
		SkillName : "Mist Slash",
		MaxLv : 10,
		SpAmount : [ 15, 15, 15, 15, 15, 15, 15, 15, 15, 15 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.NJ_SHADOWJUMP,1 ]
		]
	};

	SkillInfo[SK.NJ_SHADOWJUMP] = {
		Name: "NJ_SHADOWJUMP",
		SkillName : "Shadow Jump",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 6, 8, 10, 12, 14 ],
		_NeedSkillList : [
			[ SK.NJ_TATAMIGAESHI,1 ]
		]
	};

	SkillInfo[SK.NJ_KIRIKAGE] = {
		Name: "NJ_KIRIKAGE",
		SkillName : "Shadow Slash",
		MaxLv : 5,
		SpAmount : [ 14, 16, 18, 20, 22 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.NJ_KASUMIKIRI,5 ]
		]
	};

	SkillInfo[SK.NJ_UTSUSEMI] = {
		Name: "NJ_UTSUSEMI",
		SkillName : "Cast-off Ciceda Shell",
		MaxLv : 5,
		SpAmount : [ 12, 15, 18, 21, 24 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.NJ_SHADOWJUMP,5 ]
		]
	};

	SkillInfo[SK.NJ_BUNSINJYUTSU] = {
		Name: "NJ_BUNSINJYUTSU",
		SkillName : "Illusionary Shadow",
		MaxLv : 10,
		SpAmount : [ 30, 32, 34, 36, 38, 40, 42, 44, 46, 48 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.NJ_NEN,1 ],
			[ SK.NJ_UTSUSEMI,4 ],
			[ SK.NJ_KIRIKAGE,3 ]
		]
	};

	SkillInfo[SK.NJ_NINPOU] = {
		Name: "NJ_NINPOU",
		SkillName : "Ninpou Training",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	SkillInfo[SK.NJ_KOUENKA] = {
		Name: "NJ_KOUENKA",
		SkillName : "Crimson Fire Blossom",
		MaxLv : 10,
		SpAmount : [ 18, 20, 22, 24, 26, 28, 30, 32, 34, 36 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.NJ_NINPOU,1 ]
		]
	};

	SkillInfo[SK.NJ_KAENSIN] = {
		Name: "NJ_KAENSIN",
		SkillName : "Crimson Fire Formation",
		MaxLv : 10,
		SpAmount : [ 25, 25, 25, 25, 25, 25, 25, 25, 25, 25 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.NJ_KOUENKA,5 ]
		]
	};

	SkillInfo[SK.NJ_BAKUENRYU] = {
		Name: "NJ_BAKUENRYU",
		SkillName : "Dragon Fire Formation",
		MaxLv : 5,
		SpAmount : [ 20, 25, 30, 35, 40 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.NJ_NINPOU,10 ],
			[ SK.NJ_KAENSIN,7 ]
		]
	};

	SkillInfo[SK.NJ_HYOUSENSOU] = {
		Name: "NJ_HYOUSENSOU",
		SkillName : "Lightning Spear of Ice",
		MaxLv : 10,
		SpAmount : [ 15, 18, 21, 24, 27, 30, 33, 36, 39, 42 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.NJ_NINPOU,1 ]
		]
	};

	SkillInfo[SK.NJ_SUITON] = {
		Name: "NJ_SUITON",
		SkillName : "Water Escape Technique",
		MaxLv : 10,
		SpAmount : [ 15, 18, 21, 24, 27, 30, 33, 36, 39, 42 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.NJ_HYOUSENSOU,5 ]
		]
	};

	SkillInfo[SK.NJ_HYOUSYOURAKU] = {
		Name: "NJ_HYOUSYOURAKU",
		SkillName : "Falling Ice Pillar",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.NJ_NINPOU,10 ],
			[ SK.NJ_SUITON,7 ]
		]
	};

	SkillInfo[SK.NJ_HUUJIN] = {
		Name: "NJ_HUUJIN",
		SkillName : "Wind Blade",
		MaxLv : 10,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.NJ_NINPOU,1 ]
		]
	};

	SkillInfo[SK.NJ_RAIGEKISAI] = {
		Name: "NJ_RAIGEKISAI",
		SkillName : "Lightning Crash",
		MaxLv : 5,
		SpAmount : [ 16, 20, 24, 28, 32 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.NJ_HUUJIN,5 ]
		]
	};

	SkillInfo[SK.NJ_KAMAITACHI] = {
		Name: "NJ_KAMAITACHI",
		SkillName : "North Wind",
		MaxLv : 5,
		SpAmount : [ 24, 28, 32, 36, 40 ],
		bSeperateLv : true,
		AttackRange : [ 5, 6, 7, 8, 9 ],
		_NeedSkillList : [
			[ SK.NJ_NINPOU,10 ],
			[ SK.NJ_RAIGEKISAI,5 ]
		]
	};

	SkillInfo[SK.AL_BLESSING] = {
		Name: "AL_BLESSING",
		SkillName : "Blessing",
		MaxLv : 10,
		SpAmount : [ 28, 32, 36, 40, 44, 48, 52, 56, 60, 64 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.AL_DP,5 ]
		]
	};

	SkillInfo[SK.NJ_ISSEN] = {
		Name: "NJ_ISSEN",
		SkillName : "Final Strike",
		MaxLv : 10,
		SpAmount : [ 55, 60, 65, 70, 75, 80, 85, 90, 95, 100 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SK.NJ_TOBIDOUGU,7 ],
			[ SK.NJ_NEN,1 ],
			[ SK.NJ_KIRIKAGE,5 ]
		]
	};

	SkillInfo[SK.MB_FIGHTING] = {
		Name: "MB_FIGHTING",
		SkillName : "Munak Fighting",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MB_NEUTRAL] = {
		Name: "MB_NEUTRAL",
		SkillName : "Bongun Neutral",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MB_TAIMING_PUTI] = {
		Name: "MB_TAIMING_PUTI",
		SkillName : "Pet Friend",
		MaxLv : 7,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MB_WHITEPOTION] = {
		Name: "MB_WHITEPOTION",
		SkillName : "Ordering White Potion",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.MB_MENTAL] = {
		Name: "MB_MENTAL",
		SkillName : "Ordering Mental",
		MaxLv : 1,
		SpAmount : [ 60 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.MB_CARDPITCHER] = {
		Name: "MB_CARDPITCHER",
		SkillName : "Card Pitcher",
		MaxLv : 10,
		SpAmount : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.MB_PETPITCHER] = {
		Name: "MB_PETPITCHER",
		SkillName : "Pet Pitcher",
		MaxLv : 10,
		SpAmount : [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MB_BODYSTUDY] = {
		Name: "MB_BODYSTUDY",
		SkillName : "Body Studying",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MB_BODYALTER] = {
		Name: "MB_BODYALTER",
		SkillName : "Body Altering",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.MB_PETMEMORY] = {
		Name: "MB_PETMEMORY",
		SkillName : "Pet Memory",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.MB_M_TELEPORT] = {
		Name: "MB_M_TELEPORT",
		SkillName : "Munak Teleport",
		MaxLv : 5,
		SpAmount : [ 50, 40, 30, 20, 10 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.MB_B_GAIN] = {
		Name: "MB_B_GAIN",
		SkillName : "Bongun Gain",
		MaxLv : 7,
		SpAmount : [ 12, 15, 18, 21, 24, 27, 30 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.MB_M_GAIN] = {
		Name: "MB_M_GAIN",
		SkillName : "Munak Gain",
		MaxLv : 7,
		SpAmount : [ 1, 1, 1, 1, 1, 1, 1 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.MB_MISSION] = {
		Name: "MB_MISSION",
		SkillName : "Taming Mission",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.AL_CURE] = {
		Name: "AL_CURE",
		SkillName : "Cure",
		MaxLv : 1,
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SK.AL_HEAL,2 ]
		],
		NeedSkillList : new function(){
			this[JobId.JT_CRUSADER] = [
				[ SK.CR_TRUST,5 ]
			]
		}
	};

	SkillInfo[SK.MB_MUNAKBALL] = {
		Name: "MB_MUNAKBALL",
		SkillName : "Munak Ball",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.MB_SCROLL] = {
		Name: "MB_SCROLL",
		SkillName : "Bongun Scroll",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MB_B_GATHERING] = {
		Name: "MB_B_GATHERING",
		SkillName : "Bongun Gathering",
		MaxLv : 7,
		SpAmount : [ 17, 15, 13, 11, 9, 7, 5 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MB_M_GATHERING] = {
		Name: "MB_M_GATHERING",
		SkillName : "Munak Gathering",
		MaxLv : 7,
		SpAmount : [ 32, 30, 28, 26, 24, 22, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MB_B_EXCLUDE] = {
		Name: "MB_B_EXCLUDE",
		SkillName : "Bongun Exclude",
		MaxLv : 5,
		SpAmount : [ 180, 160, 140, 120, 100 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.MB_B_DRIFT] = {
		Name: "MB_B_DRIFT",
		SkillName : "Bongun Drift",
		MaxLv : 5,
		SpAmount : [ 50, 40, 30, 20, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MB_B_WALLRUSH] = {
		Name: "MB_B_WALLRUSH",
		SkillName : "Bongun Wall Rush",
		MaxLv : 7,
		SpAmount : [ 9, 10, 11, 12, 13, 14, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MB_M_WALLRUSH] = {
		Name: "MB_M_WALLRUSH",
		SkillName : "Munak Wall Rush",
		MaxLv : 7,
		SpAmount : [ 9, 10, 11, 12, 13, 14, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MB_B_WALLSHIFT] = {
		Name: "MB_B_WALLSHIFT",
		SkillName : "Bongun Wall Shift",
		MaxLv : 5,
		SpAmount : [ 13, 11, 9, 7, 5 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MB_M_WALLCRASH] = {
		Name: "MB_M_WALLCRASH",
		SkillName : "Munak Wall Crash",
		MaxLv : 7,
		SpAmount : [ 27, 25, 23, 21, 19, 17, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MB_M_REINCARNATION] = {
		Name: "MB_M_REINCARNATION",
		SkillName : "Munak Reincarnation",
		MaxLv : 5,
		SpAmount : [ 50, 50, 50, 50, 50 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MB_B_EQUIP] = {
		Name: "MB_B_EQUIP",
		SkillName : "Bongun Almighty",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.SL_DEATHKNIGHT] = {
		Name: "SL_DEATHKNIGHT",
		SkillName : "Death Knight Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.SL_COLLECTOR] = {
		Name: "SL_COLLECTOR",
		SkillName : "Dark Collector Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.SL_NINJA] = {
		Name: "SL_NINJA",
		SkillName : "Ninja Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.MC_INCCARRY] = {
		Name: "MC_INCCARRY",
		SkillName : "Enlarge Weight Limit",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.AM_TWILIGHT4] = {
		Name: "AM_TWILIGHT4",
		SkillName : "Twilight Alchemy",
		MaxLv : 1,
		SpAmount : [ 200 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.DE_BERSERKAIZER] = {
		Name: "DE_BERSERKAIZER",
		SkillName : "Berserk Kaizer",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.DA_DARKPOWER] = {
		Name: "DA_DARKPOWER",
		SkillName : "Dark Soul Power",
		MaxLv : 1,
		SpAmount : [ 50 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.DE_PASSIVE] = {
		Name: "DE_PASSIVE",
		SkillName : "Death Passive",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.DE_PATTACK] = {
		Name: "DE_PATTACK",
		SkillName : "Death Passive Attack",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DE_PSPEED] = {
		Name: "DE_PSPEED",
		SkillName : "Death Passive Speed",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DE_PDEFENSE] = {
		Name: "DE_PDEFENSE",
		SkillName : "Death Passive Defense",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DE_PCRITICAL] = {
		Name: "DE_PCRITICAL",
		SkillName : "Death Passive Critical",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DE_PHP] = {
		Name: "DE_PHP",
		SkillName : "Death Passive HP",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DE_PSP] = {
		Name: "DE_PSP",
		SkillName : "Death Passive SP",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DE_RESET] = {
		Name: "DE_RESET",
		SkillName : "Death Optimize",
		MaxLv : 1,
		SpAmount : [ 280 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.DE_RANKING] = {
		Name: "DE_RANKING",
		SkillName : "Death Ranking",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.DE_PTRIPLE] = {
		Name: "DE_PTRIPLE",
		SkillName : "Death Passive Triple",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.DE_ENERGY] = {
		Name: "DE_ENERGY",
		SkillName : "Death Energy",
		MaxLv : 5,
		SpAmount : [ 1, 1, 1, 1, 1 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MC_DISCOUNT] = {
		Name: "MC_DISCOUNT",
		SkillName : "Discount",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.MC_INCCARRY,3 ]
		]
	};

	SkillInfo[SK.DE_SLASH] = {
		Name: "DE_SLASH",
		SkillName : "Death Slash",
		MaxLv : 5,
		SpAmount : [ 10, 8, 6, 4, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DE_COIL] = {
		Name: "DE_COIL",
		SkillName : "Death Coil",
		MaxLv : 7,
		SpAmount : [ 8, 10, 12, 14, 16, 18, 20 ],
		bSeperateLv : false,
		AttackRange : [ 7, 7, 7, 7, 7, 7, 7 ]
	};

	SkillInfo[SK.DE_WAVE] = {
		Name: "DE_WAVE",
		SkillName : "Death Wave",
		MaxLv : 7,
		SpAmount : [ 55, 50, 45, 40, 35, 30, 25 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DE_REBIRTH] = {
		Name: "DE_REBIRTH",
		SkillName : "Death Reverse Energy",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	SkillInfo[SK.DE_AURA] = {
		Name: "DE_AURA",
		SkillName : "Death Aura",
		MaxLv : 7,
		SpAmount : [ 80, 75, 70, 65, 60, 55, 50 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DE_FREEZER] = {
		Name: "DE_FREEZER",
		SkillName : "Death Freezer",
		MaxLv : 7,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 7, 7, 7, 7, 7, 7, 7 ]
	};

	SkillInfo[SK.DE_CHANGEATTACK] = {
		Name: "DE_CHANGEATTACK",
		SkillName : "Death Change Attack",
		MaxLv : 7,
		SpAmount : [ 80, 70, 60, 50, 40, 30, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DE_PUNISH] = {
		Name: "DE_PUNISH",
		SkillName : "Death Punish",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DE_POISON] = {
		Name: "DE_POISON",
		SkillName : "Death Poison Slash",
		MaxLv : 7,
		SpAmount : [ 14, 12, 10, 8, 6, 4, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DE_INSTANT] = {
		Name: "DE_INSTANT",
		SkillName : "Death Instant Barrier",
		MaxLv : 7,
		SpAmount : [ 50, 100, 150, 200, 250, 300, 350 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DE_WARNING] = {
		Name: "DE_WARNING",
		SkillName : "Death Warning",
		MaxLv : 7,
		SpAmount : [ 50, 50, 50, 50, 50, 50, 50 ],
		bSeperateLv : false,
		AttackRange : [ 7, 7, 7, 7, 7, 7, 7 ]
	};

	SkillInfo[SK.DE_RANKEDKNIFE] = {
		Name: "DE_RANKEDKNIFE",
		SkillName : "Death Knife",
		MaxLv : 7,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 7, 7, 7, 7, 7, 7, 7 ]
	};

	SkillInfo[SK.DE_RANKEDGRADIUS] = {
		Name: "DE_RANKEDGRADIUS",
		SkillName : "Death Gradius",
		MaxLv : 7,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DE_GAUGE] = {
		Name: "DE_GAUGE",
		SkillName : "Mighty Gauge",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.DE_GTIME] = {
		Name: "DE_GTIME",
		SkillName : "Mighty Time Charge",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MC_OVERCHARGE] = {
		Name: "MC_OVERCHARGE",
		SkillName : "Overcharge",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.MC_DISCOUNT,3 ]
		]
	};

	SkillInfo[SK.DE_GSKILL] = {
		Name: "DE_GSKILL",
		SkillName : "Mighty Skill Charge",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DE_GKILL] = {
		Name: "DE_GKILL",
		SkillName : "Mighty Kill Charge",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DE_ACCEL] = {
		Name: "DE_ACCEL",
		SkillName : "Dead Acceleration",
		MaxLv : 5,
		SpAmount : [ 50, 40, 30, 20, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DE_BLOCKDOUBLE] = {
		Name: "DE_BLOCKDOUBLE",
		SkillName : "Dead Double Blocking",
		MaxLv : 3,
		SpAmount : [ 40, 30, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	SkillInfo[SK.DE_BLOCKMELEE] = {
		Name: "DE_BLOCKMELEE",
		SkillName : "Dead Near(Melee) Blocking",
		MaxLv : 3,
		SpAmount : [ 40, 30, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	SkillInfo[SK.DE_BLOCKFAR] = {
		Name: "DE_BLOCKFAR",
		SkillName : "Dead Distance(Range) Blocking",
		MaxLv : 3,
		SpAmount : [ 100, 75, 50 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	SkillInfo[SK.DE_FRONTATTACK] = {
		Name: "DE_FRONTATTACK",
		SkillName : "Dead Rush Attack",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	SkillInfo[SK.DE_DANGERATTACK] = {
		Name: "DE_DANGERATTACK",
		SkillName : "Dead Dangerous Attack",
		MaxLv : 10,
		SpAmount : [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	SkillInfo[SK.DE_TWINATTACK] = {
		Name: "DE_TWINATTACK",
		SkillName : "Dead Twin Attack",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	SkillInfo[SK.DE_WINDATTACK] = {
		Name: "DE_WINDATTACK",
		SkillName : "Dead Storm Attack",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 50, 50, 50, 50, 50 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	SkillInfo[SK.DE_WATERATTACK] = {
		Name: "DE_WATERATTACK",
		SkillName : "Dead Water Attack",
		MaxLv : 10,
		SpAmount : [ 40, 40, 40, 40, 40, 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	SkillInfo[SK.DA_ENERGY] = {
		Name: "DA_ENERGY",
		SkillName : "Dark Energy",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DA_CLOUD] = {
		Name: "DA_CLOUD",
		SkillName : "Dark Cloud",
		MaxLv : 10,
		SpAmount : [ 40, 40, 40, 40, 40, 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	SkillInfo[SK.DA_FIRSTSLOT] = {
		Name: "DA_FIRSTSLOT",
		SkillName : "Dark First Fantasy",
		MaxLv : 5,
		SpAmount : [ 100, 90, 80, 70, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.DA_HEADDEF] = {
		Name: "DA_HEADDEF",
		SkillName : "Dark Head Defense",
		MaxLv : 4,
		SpAmount : [ 60, 60, 60, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9 ]
	};

	SkillInfo[SK.MC_PUSHCART] = {
		Name: "MC_PUSHCART",
		SkillName : "Pushcart",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.MC_INCCARRY,5 ]
		]
	};

	SkillInfo[SK.DA_TRANSFORM] = {
		Name: "DA_TRANSFORM",
		SkillName : "Dark Transform",
		MaxLv : 5,
		SpAmount : [ 180, 150, 120, 90, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.DA_EXPLOSION] = {
		Name: "DA_EXPLOSION",
		SkillName : "Dark Explosion",
		MaxLv : 5,
		SpAmount : [ 140, 120, 100, 80, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.DA_REWARD] = {
		Name: "DA_REWARD",
		SkillName : "Dark Reward",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.DA_CRUSH] = {
		Name: "DA_CRUSH",
		SkillName : "Dark Crush",
		MaxLv : 5,
		SpAmount : [ 130, 110, 90, 70, 50 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.DA_ITEMREBUILD] = {
		Name: "DA_ITEMREBUILD",
		SkillName : "Dark Item Rebuild",
		MaxLv : 5,
		SpAmount : [ 50, 40, 30, 20, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DA_ILLUSION] = {
		Name: "DA_ILLUSION",
		SkillName : "Dark Illusion",
		MaxLv : 5,
		SpAmount : [ 120, 100, 80, 60, 40 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.DA_NUETRALIZE] = {
		Name: "DA_NUETRALIZE",
		SkillName : "Dark Nuetralize",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DA_RUNNER] = {
		Name: "DA_RUNNER",
		SkillName : "Dark Runner",
		MaxLv : 5,
		SpAmount : [ 50, 40, 30, 20, 10 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ]
	};

	SkillInfo[SK.DA_TRANSFER] = {
		Name: "DA_TRANSFER",
		SkillName : "Dark Transfer",
		MaxLv : 5,
		SpAmount : [ 70, 60, 50, 40, 30 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ]
	};

	SkillInfo[SK.DA_WALL] = {
		Name: "DA_WALL",
		SkillName : "Dark Wall",
		MaxLv : 5,
		SpAmount : [ 10, 20, 30, 40, 50 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.RETURN_TO_ELDICASTES] = {
		Name: "RETURN_TO_ELDICASTES",
		SkillName : "Return to Eldicastes",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.DA_REVENGE] = {
		Name: "DA_REVENGE",
		SkillName : "Dark Revenge",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.DA_EARPLUG] = {
		Name: "DA_EARPLUG",
		SkillName : "Dark Ear Plug",
		MaxLv : 5,
		SpAmount : [ 60, 60, 60, 60, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.DA_CONTRACT] = {
		Name: "DA_CONTRACT",
		SkillName : "Black Gemstone Contract",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.DA_BLACK] = {
		Name: "DA_BLACK",
		SkillName : "Black Gemstone Magic",
		MaxLv : 5,
		SpAmount : [ 60, 60, 60, 60, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.MC_IDENTIFY] = {
		Name: "MC_IDENTIFY",
		SkillName : "Identify",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.DA_MAGICCART] = {
		Name: "DA_MAGICCART",
		SkillName : "Collector Magic Cart",
		MaxLv : 5,
		SpAmount : [ 50, 40, 30, 20, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DA_COPY] = {
		Name: "DA_COPY",
		SkillName : "Collector Copy",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.DA_CRYSTAL] = {
		Name: "DA_CRYSTAL",
		SkillName : "Collector Crystal",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.DA_EXP] = {
		Name: "DA_EXP",
		SkillName : "Collector Experience",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.DA_CARTSWING] = {
		Name: "DA_CARTSWING",
		SkillName : "Collector Magical Cart Swing",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DA_REBUILD] = {
		Name: "DA_REBUILD",
		SkillName : "Collector Human Rebuild",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.DA_JOBCHANGE] = {
		Name: "DA_JOBCHANGE",
		SkillName : "Collector Novice Job Change",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DA_EDARKNESS] = {
		Name: "DA_EDARKNESS",
		SkillName : "Collector Emperium Darkness",
		MaxLv : 5,
		SpAmount : [ 1100, 900, 700, 500, 300 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.DA_EGUARDIAN] = {
		Name: "DA_EGUARDIAN",
		SkillName : "Collector Emperium Guardian",
		MaxLv : 5,
		SpAmount : [ 1300, 1100, 900, 700, 500 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DA_TIMEOUT] = {
		Name: "DA_TIMEOUT",
		SkillName : "Collector Time Out",
		MaxLv : 3,
		SpAmount : [ 500, 300, 100 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9 ]
	};

	SkillInfo[SK.ALL_TIMEIN] = {
		Name: "ALL_TIMEIN",
		SkillName : "Time In",
		MaxLv : 1,
		SpAmount : [ 100 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.DA_ZENYRANK] = {
		Name: "DA_ZENYRANK",
		SkillName : "Collector Ranking",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.DA_ACCESSORYMIX] = {
		Name: "DA_ACCESSORYMIX",
		SkillName : "Collector  Mix",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.NPC_EARTHQUAKE] = {
		Name: "NPC_EARTHQUAKE",
		SkillName : "Earth Quake",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	SkillInfo[SK.EL_CIRCLE_OF_FIRE] = {
		Name: "EL_CIRCLE_OF_FIRE",
		SkillName : "Circle of Fire",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.MC_VENDING] = {
		Name: "MC_VENDING",
		SkillName : "Vending",
		MaxLv : 10,
		SpAmount : [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.MC_PUSHCART,3 ]
		]
	};

	SkillInfo[SK.EL_TIDAL_WEAPON] = {
		Name: "EL_TIDAL_WEAPON",
		SkillName : "Tidal Weapon",
		MaxLv : 1,
		SpAmount : [ 80 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.NPC_DRAGONFEAR] = {
		Name: "NPC_DRAGONFEAR",
		SkillName : "Dragon Fear",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 6, 6, 6, 6, 6 ]
	};

	SkillInfo[SK.NPC_PULSESTRIKE] = {
		Name: "NPC_PULSESTRIKE",
		SkillName : "Pulse Strike",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.NPC_HELLJUDGEMENT] = {
		Name: "NPC_HELLJUDGEMENT",
		SkillName : "Hell Judgement",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	SkillInfo[SK.NPC_WIDESILENCE] = {
		Name: "NPC_WIDESILENCE",
		SkillName : "Wide Silence",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.NPC_WIDEFREEZE] = {
		Name: "NPC_WIDEFREEZE",
		SkillName : "Wide Freeze",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.NPC_WIDEBLEEDING] = {
		Name: "NPC_WIDEBLEEDING",
		SkillName : "Wide Bleeding",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.NPC_WIDESTONE] = {
		Name: "NPC_WIDESTONE",
		SkillName : "Wide Stone",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.NPC_WIDECONFUSE] = {
		Name: "NPC_WIDECONFUSE",
		SkillName : "Wide Confuse",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.NPC_WIDESLEEP] = {
		Name: "NPC_WIDESLEEP",
		SkillName : "Wide Sleep",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.NPC_EVILLAND] = {
		Name: "NPC_EVILLAND",
		SkillName : "Evil Land",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 7, 7, 7, 7, 7, 7, 7, 7, 7, 7 ]
	};

	SkillInfo[SK.MC_MAMMONITE] = {
		Name: "MC_MAMMONITE",
		SkillName : "Mammonite",
		MaxLv : 10,
		SpAmount : [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.NPC_SLOWCAST] = {
		Name: "NPC_SLOWCAST",
		SkillName : "Slow Cast",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.NPC_CRITICALWOUND] = {
		Name: "NPC_CRITICALWOUND",
		SkillName : "Critical Wound",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 7, 7, 7, 7, 7 ]
	};

	SkillInfo[SK.NPC_STONESKIN] = {
		Name: "NPC_STONESKIN",
		SkillName : "Stone Skin",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.NPC_ANTIMAGIC] = {
		Name: "NPC_ANTIMAGIC",
		SkillName : "Anti Magic",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.NPC_WIDECURSE] = {
		Name: "NPC_WIDECURSE",
		SkillName : "Wide Curse",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.NPC_WIDESTUN] = {
		Name: "NPC_WIDESTUN",
		SkillName : "Wide Stun",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.NPC_VAMPIRE_GIFT] = {
		Name: "NPC_VAMPIRE_GIFT",
		SkillName : "Vampire Gift",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.NPC_WIDESOULDRAIN] = {
		Name: "NPC_WIDESOULDRAIN",
		SkillName : "Wide Soul Drain",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.ALL_INCCARRY] = {
		Name: "ALL_INCCARRY",
		SkillName : "Enlarge Weight Limit R",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.NPC_HELLPOWER] = {
		Name: "NPC_HELLPOWER",
		SkillName : "Hell Power",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 7 ]
	};

	SkillInfo[SK.AC_OWL] = {
		Name: "AC_OWL",
		SkillName : "Owl's Eye",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.GM_SANDMAN] = {
		Name: "GM_SANDMAN",
		SkillName : "Goodnight, Sweetie",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.ALL_CATCRY] = {
		Name: "ALL_CATCRY",
		SkillName : "Crying Monster",
		MaxLv : 1,
		SpAmount : [ 50 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.ALL_PARTYFLEE] = {
		Name: "ALL_PARTYFLEE",
		SkillName : "Blow! Flower Wind",
		MaxLv : 10,
		SpAmount : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.ALL_ANGEL_PROTECT] = {
		Name: "ALL_ANGEL_PROTECT",
		SkillName : "Thank You",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 6 ]
	};

	SkillInfo[SK.ALL_DREAM_SUMMERNIGHT] = {
		Name: "ALL_DREAM_SUMMERNIGHT",
		SkillName : "A Dream Of Summer Night",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.ALL_REVERSEORCISH] = {
		Name: "ALL_REVERSEORCISH",
		SkillName : "Reverse Orcish",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.ALL_WEWISH] = {
		Name: "ALL_WEWISH",
		SkillName : "We Wish",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.AC_VULTURE] = {
		Name: "AC_VULTURE",
		SkillName : "Vulture's Eye",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AC_OWL,3 ]
		],
		NeedSkillList : new function(){
			this[JobId.JT_ROGUE] = [
			
			]
		}
	};

	SkillInfo[SK.AC_CONCENTRATION] = {
		Name: "AC_CONCENTRATION",
		SkillName : "Attention Concentrate",
		MaxLv : 10,
		SpAmount : [ 25, 30, 35, 40, 45, 50, 55, 60, 65, 70 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AC_VULTURE,1 ]
		]
	};

	SkillInfo[SK.AC_DOUBLE] = {
		Name: "AC_DOUBLE",
		SkillName : "Double Strafing",
		MaxLv : 10,
		SpAmount : [ 12, 12, 12, 12, 12, 12, 12, 12, 12, 12 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		NeedSkillList : new function(){
			this[JobId.JT_ROGUE] = [
				[ SK.AC_VULTURE,10 ]
			]
		},
		ActionType: "ATTACK"
	};

	SkillInfo[SK.HLIF_HEAL] = {
		Name: "HLIF_HEAL",
		SkillName : "Touch of Heal",
		MaxLv : 5,
		SpAmount : [ 13, 16, 19, 22, 25 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.HFLI_MOON] = {
		Name: "HFLI_MOON",
		SkillName : "Moonlight",
		MaxLv : 5,
		SpAmount : [ 4, 8, 12, 16, 20 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MH_XENO_SLASHER] = {
		Name: "MH_XENO_SLASHER",
		SkillName : "Xeno Slasher",
		MaxLv : 5,
		SpAmount : [ 90, 100, 110, 120, 130 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ]
	};

	SkillInfo[SK.MH_STEINWAND] = {
		Name: "MH_STEINWAND",
		SkillName : "Stone Wall",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MH_LAVA_SLIDE] = {
		Name: "MH_LAVA_SLIDE",
		SkillName : "Lava Slide",
		MaxLv : 5,
		SpAmount : [ 30, 35, 40, 45, 50 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ]
	};

	SkillInfo[SK.AC_SHOWER] = {
		Name: "AC_SHOWER",
		SkillName : "Arrow Shower",
		MaxLv : 10,
		SpAmount : [ 15, 15, 15, 15, 15, 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.AC_DOUBLE,5 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.GD_KAFRACONTRACT] = {
		Name: "GD_KAFRACONTRACT",
		SkillName : "Kafra Contract",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.SM_TWOHAND] = {
		Name: "SM_TWOHAND",
		SkillName : "Two-Handed Sword Mastery",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SM_SWORD,1 ]
		]
	};

	SkillInfo[SK.TF_DOUBLE] = {
		Name: "TF_DOUBLE",
		SkillName : "Double Attack",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MA_LANDMINE] = {
		Name: "MA_LANDMINE",
		SkillName : "Land Mine",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ]
	};

	SkillInfo[SK.MER_REGAIN] = {
		Name: "MER_REGAIN",
		SkillName : "Regain",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.EL_FIRE_CLOAK] = {
		Name: "EL_FIRE_CLOAK",
		SkillName : "Fire Cloak",
		MaxLv : 1,
		SpAmount : [ 60 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.TF_MISS] = {
		Name: "TF_MISS",
		SkillName : "Increase Dodge",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.EL_WIND_SLASH] = {
		Name: "EL_WIND_SLASH",
		SkillName : "Wind Slash",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 11 ]
	};

	SkillInfo[SK.TF_STEAL] = {
		Name: "TF_STEAL",
		SkillName : "Steal",
		MaxLv : 10,
		SpAmount : [ 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.TF_HIDING] = {
		Name: "TF_HIDING",
		SkillName : "Hiding",
		MaxLv : 10,
		SpAmount : [ 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.TF_STEAL,5 ]
		]
	};

	SkillInfo[SK.TF_POISON] = {
		Name: "TF_POISON",
		SkillName : "Envenom",
		MaxLv : 10,
		SpAmount : [ 12, 12, 12, 12, 12, 12, 12, 12, 12, 12 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.TF_DETOXIFY] = {
		Name: "TF_DETOXIFY",
		SkillName : "Detoxify",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SK.TF_POISON,3 ]
		]
	};

	SkillInfo[SK.ALL_RESURRECTION] = {
		Name: "ALL_RESURRECTION",
		SkillName : "Resurrection",
		MaxLv : 4,
		SpAmount : [ 60, 60, 60, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_SRECOVERY,4 ],
			[ SK.PR_STRECOVERY,1 ]
		]
	};

	SkillInfo[SK.KN_SPEARMASTERY] = {
		Name: "KN_SPEARMASTERY",
		SkillName : "Spear Mastery",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	};

	SkillInfo[SK.GD_GUARDRESEARCH] = {
		Name: "GD_GUARDRESEARCH",
		SkillName : "Guardian Research",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.KN_PIERCE] = {
		Name: "KN_PIERCE",
		SkillName : "Pierce",
		MaxLv : 10,
		SpAmount : [ 7, 7, 7, 7, 7, 7, 7, 7, 7, 7 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.KN_SPEARMASTERY,1 ]
		]
	};

	SkillInfo[SK.MA_SANDMAN] = {
		Name: "MA_SANDMAN",
		SkillName : "Sandman",
		MaxLv : 5,
		SpAmount : [ 12, 12, 12, 12, 12 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ]
	};

	SkillInfo[SK.MER_TENDER] = {
		Name: "MER_TENDER",
		SkillName : "Tender",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.EL_FIRE_MANTLE] = {
		Name: "EL_FIRE_MANTLE",
		SkillName : "Fire Mantle",
		MaxLv : 1,
		SpAmount : [ 80 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.KN_BRANDISHSPEAR] = {
		Name: "KN_BRANDISHSPEAR",
		SkillName : "Brandish Spear",
		MaxLv : 10,
		SpAmount : [ 12, 12, 12, 12, 12, 12, 12, 12, 12, 12 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.KN_RIDING,1 ],
			[ SK.KN_SPEARSTAB,3 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.EL_HURRICANE] = {
		Name: "EL_HURRICANE",
		SkillName : "Hurricane",
		MaxLv : 1,
		SpAmount : [ 60 ],
		bSeperateLv : false,
		AttackRange : [ 11 ]
	};
	
	SkillInfo[SK.KN_SPEARSTAB] = {
		Name: "KN_SPEARSTAB",
		SkillName : "Spear Stab",
		MaxLv : 10,
		SpAmount : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		bSeperateLv : true,
		AttackRange : [ 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ],
		_NeedSkillList : [
			[ SK.KN_PIERCE,5 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.KN_SPEARBOOMERANG] = {
		Name: "KN_SPEARBOOMERANG",
		SkillName : "Spear Boomerang",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 3, 5, 7, 9, 11 ],
		_NeedSkillList : [
			[ SK.KN_PIERCE,3 ]
		]
	};

	SkillInfo[SK.KN_TWOHANDQUICKEN] = {
		Name: "KN_TWOHANDQUICKEN",
		SkillName : "Two-Hand Quicken",
		MaxLv : 10,
		SpAmount : [ 14, 18, 22, 26, 30, 34, 38, 42, 46, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SM_TWOHAND,1 ]
		]
	};

	SkillInfo[SK.KN_AUTOCOUNTER] = {
		Name: "KN_AUTOCOUNTER",
		SkillName : "Auto Counter",
		MaxLv : 5,
		SpAmount : [ 3, 3, 3, 3, 3 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SM_TWOHAND,1 ]
		]
	};

	SkillInfo[SK.KN_BOWLINGBASH] = {
		Name: "KN_BOWLINGBASH",
		SkillName : "Bowling Bash",
		MaxLv : 10,
		SpAmount : [ 13, 14, 15, 16, 17, 18, 19, 20, 21, 22 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.SM_BASH,10 ],
			[ SK.SM_MAGNUM,3 ],
			[ SK.SM_TWOHAND,5 ],
			[ SK.KN_TWOHANDQUICKEN,10 ],
			[ SK.KN_AUTOCOUNTER,5 ]
		],
		NeedSkillList : new function(){
			this[JobId.JT_SUPERNOVICE2] = [
				[ SK.KN_AUTOCOUNTER,5 ]
			]
		},
		ActionType: "ATTACK"
	};

	SkillInfo[SK.KN_CHARGEATK] = {
		Name: "KN_CHARGEATK",
		SkillName : "Charge Attack",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 14 ]
	};

	SkillInfo[SK.CR_SHRINK] = {
		Name: "CR_SHRINK",
		SkillName : "Shrink",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.AS_SONICACCEL] = {
		Name: "AS_SONICACCEL",
		SkillName : "Sonic Acceleration",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.AS_VENOMKNIFE] = {
		Name: "AS_VENOMKNIFE",
		SkillName : "Throw Venom Knife",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.RG_CLOSECONFINE] = {
		Name: "RG_CLOSECONFINE",
		SkillName : "Close Confine",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 25 ],
		bSeperateLv : false,
		AttackRange : [ 2 ]
	};

	SkillInfo[SK.WZ_SIGHTBLASTER] = {
		Name: "WZ_SIGHTBLASTER",
		SkillName : "Sight Blaster",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.KN_RIDING] = {
		Name: "KN_RIDING",
		SkillName : "Riding",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.SM_ENDURE,1 ]
		]
	};

	SkillInfo[SK.SA_ELEMENTWATER] = {
		Name: "SA_ELEMENTWATER",
		SkillName : "Elemental Change (Water)",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.HT_PHANTASMIC] = {
		Name: "HT_PHANTASMIC",
		SkillName : "Phantasmic Arrow",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.BA_PANGVOICE] = {
		Name: "BA_PANGVOICE",
		SkillName : "Pang Voice",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.DC_WINKCHARM] = {
		Name: "DC_WINKCHARM",
		SkillName : "Wink of Charm",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.BS_UNFAIRLYTRICK] = {
		Name: "BS_UNFAIRLYTRICK",
		SkillName : "Unfair Trick",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.BS_GREED] = {
		Name: "BS_GREED",
		SkillName : "Greed",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.PR_REDEMPTIO] = {
		Name: "PR_REDEMPTIO",
		SkillName : "Redemptio",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 400 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.MO_KITRANSLATION] = {
		Name: "MO_KITRANSLATION",
		SkillName : "Ki Translation",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.MO_BALKYOUNG] = {
		Name: "MO_BALKYOUNG",
		SkillName : "Ki Explosion",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.SA_ELEMENTGROUND] = {
		Name: "SA_ELEMENTGROUND",
		SkillName : "Elemental Change (Earth)",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.SA_ELEMENTFIRE] = {
		Name: "SA_ELEMENTFIRE",
		SkillName : "Elemental Change (Fire)",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.SA_ELEMENTWIND] = {
		Name: "SA_ELEMENTWIND",
		SkillName : "Elemental Change (Wind)",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.SM_RECOVERY] = {
		Name: "SM_RECOVERY",
		SkillName : "Increase Recuperative Power",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.KN_CAVALIERMASTERY] = {
		Name: "KN_CAVALIERMASTERY",
		SkillName : "Cavalry Mastery",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.KN_RIDING,1 ]
		]
	};

	SkillInfo[SK.AB_HIGHNESSHEAL] = {
		Name: "AB_HIGHNESSHEAL",
		SkillName : "Highness Heal",
		MaxLv : 5,
		SpAmount : [ 70, 100, 130, 160, 190 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.AB_RENOVATIO,1 ]
		]
	};

	SkillInfo[SK.AB_DUPLELIGHT_MELEE] = {
		Name: "AB_DUPLELIGHT_MELEE",
		SkillName : "Duple Light (Melee)",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 11, 11, 11, 11, 11, 11, 11, 11, 11, 11 ]
	};

	SkillInfo[SK.MER_BENEDICTION] = {
		Name: "MER_BENEDICTION",
		SkillName : "Benediction",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.PR_MACEMASTERY] = {
		Name: "PR_MACEMASTERY",
		SkillName : "Mace Mastery",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.EL_WATER_SCREEN] = {
		Name: "EL_WATER_SCREEN",
		SkillName : "Water Screen",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.PR_IMPOSITIO] = {
		Name: "PR_IMPOSITIO",
		SkillName : "Impositio Manus",
		MaxLv : 5,
		SpAmount : [ 13, 16, 19, 22, 25 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.EL_HURRICANE_ATK] = {
		Name: "EL_HURRICANE_ATK",
		SkillName : "Hurricane",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 7 ]
	};

	SkillInfo[SK.PR_SUFFRAGIUM] = {
		Name: "PR_SUFFRAGIUM",
		SkillName : "Suffragium",
		MaxLv : 3,
		SpAmount : [ 8, 8, 8 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.PR_IMPOSITIO,2 ]
		]
	};

	SkillInfo[SK.PR_ASPERSIO] = {
		Name: "PR_ASPERSIO",
		SkillName : "Aspersio",
		MaxLv : 5,
		SpAmount : [ 14, 18, 22, 26, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.AL_HOLYWATER,1 ],
			[ SK.PR_IMPOSITIO,3 ]
		]
	};

	SkillInfo[SK.PR_BENEDICTIO] = {
		Name: "PR_BENEDICTIO",
		SkillName : "B.S Sacramenti",
		MaxLv : 5,
		SpAmount : [ 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.PR_ASPERSIO,5 ],
			[ SK.PR_GLORIA,3 ]
		]
	};

	SkillInfo[SK.WL_SIENNAEXECRATE] = {
		Name: "WL_SIENNAEXECRATE",
		SkillName : "Sienna Execrate",
		MaxLv : 5,
		SpAmount : [ 32, 34, 36, 38, 40 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ],
		_NeedSkillList : [
			[ SK.WL_SUMMONSTONE,1 ]
		]
	};

	SkillInfo[SK.WL_CRIMSONROCK] = {
		Name: "WL_CRIMSONROCK",
		SkillName : "Crimson Rock",
		MaxLv : 5,
		SpAmount : [ 60, 70, 80, 90, 100 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.WL_SUMMONFB,1 ]
		]
	};

	SkillInfo[SK.WL_SUMMONBL] = {
		Name: "WL_SUMMONBL",
		SkillName : "Summon Lightning Ball",
		MaxLv : 5,
		SpAmount : [ 10, 12, 14, 16, 18 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.WZ_VERMILION,1 ]
		]
	};

	SkillInfo[SK.WL_READING_SB] = {
		Name: "WL_READING_SB",
		SkillName : "Reading Spellbook",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.PR_SANCTUARY] = {
		Name: "PR_SANCTUARY",
		SkillName : "Sanctuary",
		MaxLv : 10,
		SpAmount : [ 15, 18, 21, 24, 27, 30, 33, 36, 39, 42 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.AL_HEAL,1 ]
		]
	};

	SkillInfo[SK.RA_CLUSTERBOMB] = {
		Name: "RA_CLUSTERBOMB",
		SkillName : "Cluster Bomb",
		MaxLv : 5,
		SpAmount : [ 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.RA_RESEARCHTRAP,3 ]
		]
	};

	SkillInfo[SK.RA_WUGSTRIKE] = {
		Name: "RA_WUGSTRIKE",
		SkillName : "Warg Strike",
		MaxLv : 5,
		SpAmount : [ 20, 22, 24, 26, 28 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.RA_TOOTHOFWUG,1 ]
		]
	};

	SkillInfo[SK.RA_CAMOUFLAGE] = {
		Name: "RA_CAMOUFLAGE",
		SkillName : "Camouflage",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RA_RANGERMAIN,1 ]
		]
	};

	SkillInfo[SK.RA_MAIZETRAP] = {
		Name: "RA_MAIZETRAP",
		SkillName : "Maize Trap",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 3 ],
		_NeedSkillList : [
			[ SK.RA_RESEARCHTRAP,1 ]
		]
	};

	SkillInfo[SK.NC_MADOLICENCE] = {
		Name: "NC_MADOLICENCE",
		SkillName : "Magic Gear License",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.NC_FLAMELAUNCHER] = {
		Name: "NC_FLAMELAUNCHER",
		SkillName : "Flare Launcher",
		MaxLv : 3,
		SpAmount : [ 20, 20, 20 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7 ],
		_NeedSkillList : [
			[ SK.NC_VULCANARM,1 ]
		]
	};

	SkillInfo[SK.NC_HOVERING] = {
		Name: "NC_HOVERING",
		SkillName : "Hovering",
		MaxLv : 1,
		SpAmount : [ 25 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.NC_ACCELERATION,1 ]
		]
	};

	SkillInfo[SK.PR_SLOWPOISON] = {
		Name: "PR_SLOWPOISON",
		SkillName : "Slow Poison",
		MaxLv : 4,
		SpAmount : [ 6, 8, 10, 12 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9 ]
	};

	SkillInfo[SK.NC_ANALYZE] = {
		Name: "NC_ANALYZE",
		SkillName : "Analyze",
		MaxLv : 3,
		SpAmount : [ 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.NC_INFRAREDSCAN,1 ]
		]
	};

	SkillInfo[SK.NC_REPAIR] = {
		Name: "NC_REPAIR",
		SkillName : "Repair",
		MaxLv : 5,
		SpAmount : [ 25, 30, 35, 40, 45 ],
		bSeperateLv : true,
		AttackRange : [ 5, 6, 7, 8, 9 ],
		_NeedSkillList : [
			[ SK.NC_MADOLICENCE,2 ]
		]
	};

	SkillInfo[SK.NC_POWERSWING] = {
		Name: "NC_POWERSWING",
		SkillName : "Power Swing",
		MaxLv : 5,
		SpAmount : [ 10, 12, 14, 16, 18 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.NC_AXEBOOMERANG,3 ]
		]
	};

	SkillInfo[SK.NC_DISJOINT] = {
		Name: "NC_DISJOINT",
		SkillName : "FAW - Removal",
		MaxLv : 1,
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 5 ],
		_NeedSkillList : [
			[ SK.NC_SILVERSNIPER,1 ]
		]
	};

	SkillInfo[SK.SC_SHADOWFORM] = {
		Name: "SC_SHADOWFORM",
		SkillName : "Shadow Form",
		MaxLv : 5,
		SpAmount : [ 40, 50, 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SK.RG_TUNNELDRIVE,3 ]
		]
	};

	SkillInfo[SK.SC_DEADLYINFECT] = {
		Name: "SC_DEADLYINFECT",
		SkillName : "Deadly Infect",
		MaxLv : 5,
		SpAmount : [ 40, 44, 48, 52, 56 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SC_SHADOWFORM,3 ],
			[ SK.SC_AUTOSHADOWSPELL,5 ]
		]
	};

	SkillInfo[SK.SC_LAZINESS] = {
		Name: "SC_LAZINESS",
		SkillName : "Masquerade - Lazieness",
		MaxLv : 3,
		SpAmount : [ 30, 40, 50 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.SC_ENERVATION,1 ],
			[ SK.SC_GROOMY,1 ],
			[ SK.SC_IGNORANCE,1 ]
		]
	};

	SkillInfo[SK.PR_STRECOVERY] = {
		Name: "PR_STRECOVERY",
		SkillName : "Recovery",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.SC_BLOODYLUST] = {
		Name: "SC_BLOODYLUST",
		SkillName : "Bloody Lust",
		MaxLv : 3,
		SpAmount : [ 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7 ],
		_NeedSkillList : [
			[ SK.SC_DIMENSIONDOOR,3 ]
		]
	};

	SkillInfo[SK.LG_CANNONSPEAR] = {
		Name: "LG_CANNONSPEAR",
		SkillName : "Cannon Spear",
		MaxLv : 5,
		SpAmount : [ 12, 16, 20, 24, 28 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.LG_PINPOINTATTACK,1 ]
		]
	};

	SkillInfo[SK.LG_REFLECTDAMAGE] = {
		Name: "LG_REFLECTDAMAGE",
		SkillName : "Reflect Damage",
		MaxLv : 5,
		SpAmount : [ 60, 80, 100, 120, 140 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.CR_REFLECTSHIELD,5 ]
		]
	};

	SkillInfo[SK.LG_SHIELDSPELL] = {
		Name: "LG_SHIELDSPELL",
		SkillName : "Shield Spell",
		MaxLv : 3,
		SpAmount : [ 50, 50, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.LG_SHIELDPRESS,3 ],
			[ SK.LG_EARTHDRIVE,2 ]
		]
	};

	SkillInfo[SK.LG_BANDING] = {
		Name: "LG_BANDING",
		SkillName : "Banding",
		MaxLv : 5,
		SpAmount : [ 30, 36, 42, 48, 54 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.LG_PINPOINTATTACK,3 ],
			[ SK.LG_RAGEBURST,1 ]
		]
	};

	SkillInfo[SK.LG_EARTHDRIVE] = {
		Name: "LG_EARTHDRIVE",
		SkillName : "Earth Drive",
		MaxLv : 5,
		SpAmount : [ 52, 60, 68, 76, 84 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.LG_REFLECTDAMAGE,3 ]
		]
	};

	SkillInfo[SK.SR_SKYNETBLOW] = {
		Name: "SR_SKYNETBLOW",
		SkillName : "Skynet Blow",
		MaxLv : 5,
		SpAmount : [ 8, 9, 10, 11, 12 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SR_DRAGONCOMBO,3 ]
		]
	};

	SkillInfo[SK.PR_KYRIE] = {
		Name: "PR_KYRIE",
		SkillName : "Kyrie Eleison",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 25, 25, 25, 30, 30, 30, 35 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.AL_ANGELUS,2 ]
		]
	};

	SkillInfo[SK.SR_LIGHTNINGWALK] = {
		Name: "SR_LIGHTNINGWALK",
		SkillName : "Lightning Walk",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SR_WINDMILL,1 ]
		]
	};

	SkillInfo[SK.SR_GATEOFHELL] = {
		Name: "SR_GATEOFHELL",
		SkillName : "Gate of Hell",
		MaxLv : 10,
		SpAmount : [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 2, 3, 3, 4, 4, 5, 5, 6, 7 ],
		_NeedSkillList : [
			[ SK.SR_TIGERCANNON,5 ],
			[ SK.SR_RAISINGDRAGON,5 ]
		]
	};

	SkillInfo[SK.SR_GENTLETOUCH_CHANGE] = {
		Name: "SR_GENTLETOUCH_CHANGE",
		SkillName : "Gentle Touch (Change)",
		MaxLv : 5,
		SpAmount : [ 40, 50, 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.SR_GENTLETOUCH_CURE,4 ]
		]
	};

	SkillInfo[SK.WA_SYMPHONY_OF_LOVER] = {
		Name: "WA_SYMPHONY_OF_LOVER",
		SkillName : "Symphony of Lovers",
		MaxLv : 5,
		SpAmount : [ 60, 69, 78, 87, 96 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.WM_LULLABY_DEEPSLEEP,1 ]
		]
	};

	SkillInfo[SK.PR_MAGNIFICAT] = {
		Name: "PR_MAGNIFICAT",
		SkillName : "Magnificat",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MI_HARMONIZE] = {
		Name: "MI_HARMONIZE",
		SkillName : "Harmonize",
		MaxLv : 5,
		SpAmount : [ 70, 75, 80, 85, 90 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.WM_LULLABY_DEEPSLEEP,1 ]
		]
	};

	SkillInfo[SK.PR_GLORIA] = {
		Name: "PR_GLORIA",
		SkillName : "Gloria",
		MaxLv : 5,
		SpAmount : [ 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.PR_KYRIE,4 ],
			[ SK.PR_MAGNIFICAT,3 ]
		],
		NeedSkillList : new function(){
			this[JobId.JT_SUPERNOVICE2] = [
				[ SK.PR_SANCTUARY,7 ]
			]
		}
	};

	SkillInfo[SK.WM_POEMOFNETHERWORLD] = {
		Name: "WM_POEMOFNETHERWORLD",
		SkillName : "Poem of the Netherworld",
		MaxLv : 5,
		SpAmount : [ 12, 16, 20, 24, 28 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.WM_LESSON,1 ]
		]
	};

	SkillInfo[SK.WM_SIRCLEOFNATURE] = {
		Name: "WM_SIRCLEOFNATURE",
		SkillName : "Circle of Life's Melody",
		MaxLv : 5,
		SpAmount : [ 42, 46, 50, 54, 58 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.WM_LESSON,1 ]
		]
	};

	SkillInfo[SK.PR_LEXDIVINA] = {
		Name: "PR_LEXDIVINA",
		SkillName : "Lex Divina",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 18, 16, 14, 12, 10 ],
		bSeperateLv : false,
		AttackRange : [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SK.AL_RUWACH,1 ]
		]
	};

	SkillInfo[SK.WM_LERADS_DEW] = {
		Name: "WM_LERADS_DEW",
		SkillName : "Lerad's Dew",
		MaxLv : 5,
		SpAmount : [ 120, 130, 140, 150, 160 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		NeedSkillList : new function(){
			this[JobId.JT_MINSTREL] = [
				[ SK.MI_HARMONIZE,1 ],
				[ SK.MI_RUSH_WINDMILL,1 ],
				[ SK.MI_ECHOSONG,1 ]
			];
			this[JobId.JT_WANDERER] = [
				[ SK.WA_SWING_DANCE,1 ],
				[ SK.WA_SYMPHONY_OF_LOVER,1 ],
				[ SK.WA_MOONLIT_SERENADE,1 ]
			]
		}
	};

	SkillInfo[SK.SO_FIREWALK] = {
		Name: "SO_FIREWALK",
		SkillName : "Fire Walk",
		MaxLv : 5,
		SpAmount : [ 30, 34, 38, 42, 46 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SA_VOLCANO,1 ]
		]
	};

	SkillInfo[SK.SO_DIAMONDDUST] = {
		Name: "SO_DIAMONDDUST",
		SkillName : "Diamond Dust",
		MaxLv : 5,
		SpAmount : [ 50, 56, 62, 68, 74 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SA_DELUGE,3 ]
		]
	};

	SkillInfo[SK.SO_STRIKING] = {
		Name: "SO_STRIKING",
		SkillName : "Striking",
		MaxLv : 5,
		SpAmount : [ 50, 55, 60, 65, 70 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SA_FLAMELAUNCHER,1 ],
			[ SK.SA_FROSTWEAPON,1 ],
			[ SK.SA_LIGHTNINGLOADER,1 ],
			[ SK.SA_SEISMICWEAPON,1 ]
		]
	};

	SkillInfo[SK.SO_ARRULLO] = {
		Name: "SO_ARRULLO",
		SkillName : "Arrullo",
		MaxLv : 5,
		SpAmount : [ 30, 35, 40, 45, 50 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 9 ],
		_NeedSkillList : [
			[ SK.SO_WARMER,2 ]
		]
	};

	SkillInfo[SK.PR_TURNUNDEAD] = {
		Name: "PR_TURNUNDEAD",
		SkillName : "Turn Undead",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SK.ALL_RESURRECTION,1 ],
			[ SK.PR_LEXDIVINA,3 ]
		]
	};

	SkillInfo[SK.SO_EL_SYMPATHY] = {
		Name: "SO_EL_SYMPATHY",
		SkillName : "Spirit Sympathy",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SO_EL_CONTROL,3 ]
		]
	};

	SkillInfo[SK.SO_WIND_INSIGNIA] = {
		Name: "SO_WIND_INSIGNIA",
		SkillName : "Wind Insignia",
		MaxLv : 3,
		SpAmount : [ 22, 30, 38 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SO_SUMMON_VENTUS,3 ]
		]
	};

	SkillInfo[SK.GN_REMODELING_CART] = {
		Name: "GN_REMODELING_CART",
		SkillName : "Cart Remodeling",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
	};

	SkillInfo[SK.GN_THORNS_TRAP] = {
		Name: "GN_THORNS_TRAP",
		SkillName : "Thorn Trap",
		MaxLv : 5,
		SpAmount : [ 22, 26, 30, 34, 38 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.GN_S_PHARMACY,2 ]
		]
	};

	SkillInfo[SK.GN_CRAZYWEED] = {
		Name: "GN_CRAZYWEED",
		SkillName : "Crazy Weed",
		MaxLv : 10,
		SpAmount : [ 24, 28, 32, 36, 40, 44, 48, 52, 56, 60 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11, 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.GN_WALLOFTHORN,3 ]
		]
	};

	SkillInfo[SK.PR_LEXAETERNA] = {
		Name: "PR_LEXAETERNA",
		SkillName : "Lex Aeterna",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SK.PR_LEXDIVINA,5 ]
		]
	};

	SkillInfo[SK.GN_MIX_COOKING] = {
		Name: "GN_MIX_COOKING",
		SkillName : "Mix Cooking",
		MaxLv : 2,
		SpAmount : [ 5, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1 ],
		_NeedSkillList : [
			[ SK.GN_S_PHARMACY,1 ]
		]
	};

	SkillInfo[SK.GD_EXTENSION] = {
		Name: "GD_EXTENSION",
		SkillName : "Guild Extension",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.AB_SECRAMENT] = {
		Name: "AB_SECRAMENT",
		SkillName : "Sacrament",
		MaxLv : 5,
		SpAmount : [ 100, 120, 140, 160, 180 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.AB_EXPIATIO,1 ],
			[ SK.AB_EPICLESIS,1 ]
		]
	};

	SkillInfo[SK.PR_MAGNUS] = {
		Name: "PR_MAGNUS",
		SkillName : "Magnus Exorcismus",
		MaxLv : 10,
		SpAmount : [ 40, 42, 44, 46, 48, 50, 52, 54, 56, 58 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_SAFETYWALL,1 ],
			[ SK.PR_LEXAETERNA,1 ],
			[ SK.PR_TURNUNDEAD,3 ]
		]
	};

	SkillInfo[SK.ALL_BUYING_STORE] = {
		Name: "ALL_BUYING_STORE",
		SkillName : "Open Buying Store",
		MaxLv : 2,
		SpAmount : [ 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1 ],
	};

	SkillInfo[SK.SM_BASH] = {
		Name: "SM_BASH",
		SkillName : "Bash",
		MaxLv : 10,
		SpAmount : [ 8, 8, 8, 8, 8, 15, 15, 15, 15, 15 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.WZ_FIREPILLAR] = {
		Name: "WZ_FIREPILLAR",
		SkillName : "Fire Pillar",
		MaxLv : 10,
		SpAmount : [ 75, 75, 75, 75, 75, 75, 75, 75, 75, 75 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_FIREWALL,1 ]
		]
	};

	SkillInfo[SK.MA_REMOVETRAP] = {
		Name: "MA_REMOVETRAP",
		SkillName : "Remove Trap",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 2 ],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.MER_RECUPERATE] = {
		Name: "MER_RECUPERATE",
		SkillName : "Recuperate",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.WZ_SIGHTRASHER] = {
		Name: "WZ_SIGHTRASHER",
		SkillName : "Sightrasher",
		MaxLv : 10,
		SpAmount : [ 35, 37, 39, 41, 43, 45, 47, 49, 51, 53 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.MG_SIGHT,1 ],
			[ SK.MG_LIGHTNINGBOLT,1 ]
		]
	};

	SkillInfo[SK.EL_WATER_DROP] = {
		Name: "EL_WATER_DROP",
		SkillName : "Water Drop",
		MaxLv : 1,
		SpAmount : [ 60 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.WZ_FIREIVY] = {
		Name: "WZ_FIREIVY",
		SkillName : "Fire Ivy",
		MaxLv : 0,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ ]
	};

	SkillInfo[SK.EL_TYPOON_MIS] = {
		Name: "EL_TYPOON_MIS",
		SkillName : "Typhoon Missile",
		MaxLv : 1,
		SpAmount : [ 80 ],
		bSeperateLv : false,
		AttackRange : [ 11 ]
	};

	SkillInfo[SK.WZ_METEOR] = {
		Name: "WZ_METEOR",
		SkillName : "Meteor Storm",
		MaxLv : 10,
		SpAmount : [ 20, 24, 30, 34, 40, 44, 50, 54, 60, 64 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_THUNDERSTORM,1 ],
			[ SK.WZ_SIGHTRASHER,2 ]
		]
	};

	SkillInfo[SK.WZ_JUPITEL] = {
		Name: "WZ_JUPITEL",
		SkillName : "Jupitel Thunder",
		MaxLv : 10,
		SpAmount : [ 20, 23, 26, 29, 32, 35, 38, 41, 44, 47 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_NAPALMBEAT,1 ],
			[ SK.MG_LIGHTNINGBOLT,1 ]
		]
	};

	SkillInfo[SK.WZ_VERMILION] = {
		Name: "WZ_VERMILION",
		SkillName : "Lord of Vermilion",
		MaxLv : 10,
		SpAmount : [ 60, 64, 68, 72, 76, 80, 84, 88, 92, 96 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_THUNDERSTORM,1 ],
			[ SK.WZ_JUPITEL,5 ]
		]
	};

	SkillInfo[SK.WZ_WATERBALL] = {
		Name: "WZ_WATERBALL",
		SkillName : "Water Ball",
		MaxLv : 5,
		SpAmount : [ 15, 20, 20, 25, 25 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_COLDBOLT,1 ],
			[ SK.MG_LIGHTNINGBOLT,1 ]
		]
	};

	SkillInfo[SK.WZ_ICEWALL] = {
		Name: "WZ_ICEWALL",
		SkillName : "Ice Wall",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_STONECURSE,1 ],
			[ SK.MG_FROSTDIVER,1 ]
		]
	};

	SkillInfo[SK.WZ_FROSTNOVA] = {
		Name: "WZ_FROSTNOVA",
		SkillName : "Frost Nova",
		MaxLv : 10,
		SpAmount : [ 45, 43, 41, 39, 37, 35, 33, 31, 29, 27 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.WZ_ICEWALL,1 ]
		]
	};

	SkillInfo[SK.WZ_STORMGUST] = {
		Name: "WZ_STORMGUST",
		SkillName : "Storm Gust",
		MaxLv : 10,
		SpAmount : [ 78, 78, 78, 78, 78, 78, 78, 78, 78, 78 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_FROSTDIVER,1 ],
			[ SK.WZ_JUPITEL,3 ]
		]
	};

	SkillInfo[SK.WZ_EARTHSPIKE] = {
		Name: "WZ_EARTHSPIKE",
		SkillName : "Earth Spike",
		MaxLv : 5,
		SpAmount : [ 12, 14, 16, 18, 20 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
				[ SK.MG_STONECURSE,1 ]
		],
		NeedSkillList : new function(){
			this[JobId.JT_SAGE] = [
				[ SK.SA_SEISMICWEAPON,1 ]
			]
		}
	};

	SkillInfo[SK.WZ_HEAVENDRIVE] = {
		Name: "WZ_HEAVENDRIVE",
		SkillName : "Heaven's Drive",
		MaxLv : 5,
		SpAmount : [ 28, 32, 36, 40, 44 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.WZ_EARTHSPIKE,3 ]
		],
		NeedSkillList : new function(){
			this[JobId.JT_SAGE] = [
				[ SK.WZ_EARTHSPIKE,1 ]
			]
		}
	};

	SkillInfo[SK.WZ_QUAGMIRE] = {
		Name: "WZ_QUAGMIRE",
		SkillName : "Quagmire",
		MaxLv : 5,
		SpAmount : [ 5, 10, 15, 20, 25 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.WZ_HEAVENDRIVE,1 ]
		]
	};

	SkillInfo[SK.WZ_ESTIMATION] = {
		Name: "WZ_ESTIMATION",
		SkillName : "Monster Property",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.HLIF_BRAIN] = {
		Name: "HLIF_BRAIN",
		SkillName : "Brain Surgery",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.HFLI_SPEED] = {
		Name: "HFLI_SPEED",
		SkillName : "Over Speed",
		MaxLv : 5,
		SpAmount : [ 30, 40, 50, 60, 70 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MH_NEEDLE_OF_PARALYZE] = {
		Name: "MH_NEEDLE_OF_PARALYZE",
		SkillName : "Needle of Paralyze",
		MaxLv : 5,
		SpAmount : [ 48, 60, 72, 84, 96 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 5, 5, 5 ],
	};

	SkillInfo[SK.MH_STYLE_CHANGE] = {
		Name: "MH_STYLE_CHANGE",
		SkillName : "Style Change",
		MaxLv : 1,
		SpAmount : [ 35 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.MH_ANGRIFFS_MODUS] = {
		Name: "MH_ANGRIFFS_MODUS",
		SkillName : "Attack Mode",
		MaxLv : 5,
		SpAmount : [ 60, 65, 70, 75, 80 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MH_VOLCANIC_ASH] = {
		Name: "MH_VOLCANIC_ASH",
		SkillName : "Volcanic Ash",
		MaxLv : 5,
		SpAmount : [ 60, 65, 70, 75, 80 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ]
	};

	SkillInfo[SK.BS_IRON] = {
		Name: "BS_IRON",
		SkillName : "Iron Tempering",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.GD_GLORYGUILD] = {
		Name: "GD_GLORYGUILD",
		SkillName : "Guild's Glory",
		MaxLv : 0,
		SpAmount : [ ],
		bSeperateLv : false,
		AttackRange : [ ]
	};

	SkillInfo[SK.BS_STEEL] = {
		Name: "BS_STEEL",
		SkillName : "Steel Tempering",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BS_IRON,1 ],
		]
	};

	SkillInfo[SK.SM_PROVOKE] = {
		Name: "SM_PROVOKE",
		SkillName : "Provoke",
		MaxLv : 10,
		SpAmount : [ 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.BS_ENCHANTEDSTONE] = {
		Name: "BS_ENCHANTEDSTONE",
		SkillName : "Enchanted Stone Craft",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BS_IRON,1 ]
		]
	};

	SkillInfo[SK.MA_CHARGEARROW] = {
		Name: "MA_CHARGEARROW",
		SkillName : "Charge Arrow",
		MaxLv : 1,
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.MER_MENTALCURE] = {
		Name: "MER_MENTALCURE",
		SkillName : "Mental Cure",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.BS_ORIDEOCON] = {
		Name: "BS_ORIDEOCON",
		SkillName : "Research Oridecon",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BS_ENCHANTEDSTONE,1 ]
		]
	};

	SkillInfo[SK.EL_WATER_BARRIER] = {
		Name: "EL_WATER_BARRIER",
		SkillName : "Water Barrier",
		MaxLv : 1,
		SpAmount : [ 80 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.BS_DAGGER] = {
		Name: "BS_DAGGER",
		SkillName : "Smith Dagger",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	SkillInfo[SK.EL_TYPOON_MIS_ATK] = {
		Name: "EL_TYPOON_MIS_ATK",
		SkillName : "Typhoon Missile",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 11 ]
	};

	SkillInfo[SK.BS_SWORD] = {
		Name: "BS_SWORD",
		SkillName : "Smith Sword",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BS_DAGGER,1 ]
		]
	};

	SkillInfo[SK.BS_TWOHANDSWORD] = {
		Name: "BS_TWOHANDSWORD",
		SkillName : "Smith Two-Handed Sword",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BS_SWORD,1 ]
		]
	};

	SkillInfo[SK.BS_AXE] = {
		Name: "BS_AXE",
		SkillName : "Smith Axe",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BS_SWORD,2 ]
		]
	};

	SkillInfo[SK.BS_MACE] = {
		Name: "BS_MACE",
		SkillName : "Smith Mace",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BS_KNUCKLE,1 ]
		]		
	};

	SkillInfo[SK.BS_KNUCKLE] = {
		Name: "BS_KNUCKLE",
		SkillName : "Smith Brass Knuckle",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BS_DAGGER, 1 ]
		]
	};

	SkillInfo[SK.BS_SPEAR] = {
		Name: "BS_SPEAR",
		SkillName : "Smith Spear",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BS_DAGGER,2 ]
		]
	};

	SkillInfo[SK.BS_HILTBINDING] = {
		Name: "BS_HILTBINDING",
		SkillName : "Hilt Binding",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.BS_FINDINGORE] = {
		Name: "BS_FINDINGORE",
		SkillName : "Finding Ore",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.BS_HILTBINDING,1 ],
			[ SK.BS_STEEL,1 ]
		]

	};

	SkillInfo[SK.BS_WEAPONRESEARCH] = {
		Name: "BS_WEAPONRESEARCH",
		SkillName : "Weaponry Research",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BS_HILTBINDING,1 ]
		]
	};

	SkillInfo[SK.BS_REPAIRWEAPON] = {
		Name: "BS_REPAIRWEAPON",
		SkillName : "Repair Weapon",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 2 ],
		_NeedSkillList : [
			[ SK.BS_WEAPONRESEARCH,1 ]
		]
	};

	SkillInfo[SK.BS_SKINTEMPER] = {
		Name: "BS_SKINTEMPER",
		SkillName : "Skin Tempering",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.BS_HAMMERFALL] = {
		Name: "BS_HAMMERFALL",
		SkillName : "Hammer Fall",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.GD_LEADERSHIP] = {
		Name: "GD_LEADERSHIP",
		SkillName : "Great Leadership",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.BS_ADRENALINE] = {
		Name: "BS_ADRENALINE",
		SkillName : "Adrenaline Rush",
		MaxLv : 5,
		SpAmount : [ 20, 23, 26, 29, 32 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BS_HAMMERFALL,2 ]
		]
	};

	SkillInfo[SK.SM_MAGNUM] = {
		Name: "SM_MAGNUM",
		SkillName : "Magnum Break",
		MaxLv : 10,
		SpAmount : [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SM_BASH,5 ]
		]
	};

	SkillInfo[SK.BS_WEAPONPERFECT] = {
		Name: "BS_WEAPONPERFECT",
		SkillName : "Weapon Perfection",
		MaxLv : 5,
		SpAmount : [ 18, 16, 14, 12, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BS_WEAPONRESEARCH,2 ],
			[ SK.BS_ADRENALINE,2 ]
		]
	};

	SkillInfo[SK.MA_SHARPSHOOTING] = {
		Name: "MA_SHARPSHOOTING",
		SkillName : "Sharp Shooting",
		MaxLv : 5,
		SpAmount : [ 18, 21, 24, 27, 30 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.MER_COMPRESS] = {
		Name: "MER_COMPRESS",
		SkillName : "Compress",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.BS_OVERTHRUST] = {
		Name: "BS_OVERTHRUST",
		SkillName : "Over Thrust",
		MaxLv : 5,
		SpAmount : [ 18, 16, 14, 12, 10 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BS_ADRENALINE,3 ]
		]
	};

	SkillInfo[SK.EL_WIND_STEP] = {
		Name: "EL_WIND_STEP",
		SkillName : "Wind Step",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.BS_MAXIMIZE] = {
		Name: "BS_MAXIMIZE",
		SkillName : "Maximize Power",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BS_WEAPONPERFECT,3 ],
			[ SK.BS_OVERTHRUST,2 ]
		]
	};

	SkillInfo[SK.EL_STONE_HAMMER] = {
		Name: "EL_STONE_HAMMER",
		SkillName : "Stone Hammer",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 5 ]
	};

	SkillInfo[SK.HT_SKIDTRAP] = {
		Name: "HT_SKIDTRAP",
		SkillName : "Skid Trap",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		ActionType: "PICKUP"
	};

	SkillInfo[SK.HT_LANDMINE] = {
		Name: "HT_LANDMINE",
		SkillName : "Land Mine",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		ActionType: "PICKUP"
	};

	SkillInfo[SK.HT_ANKLESNARE] = {
		Name: "HT_ANKLESNARE",
		SkillName : "Ankle Snare",
		MaxLv : 5,
		SpAmount : [ 12, 12, 12, 12, 12 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.HT_SKIDTRAP,1 ]
		],
		ActionType: "PICKUP"
	};

	SkillInfo[SK.HT_SHOCKWAVE] = {
		Name: "HT_SHOCKWAVE",
		SkillName : "Shockwave Trap",
		MaxLv : 5,
		SpAmount : [ 45, 45, 45, 45, 45 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.HT_ANKLESNARE,1 ]
		],
		ActionType: "PICKUP"
	};

	SkillInfo[SK.HT_SANDMAN] = {
		Name: "HT_SANDMAN",
		SkillName : "Sandman",
		MaxLv : 5,
		SpAmount : [ 12, 12, 12, 12, 12 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.HT_FLASHER,1 ]
		],
		ActionType: "PICKUP"
	};

	SkillInfo[SK.HT_FLASHER] = {
		Name: "HT_FLASHER",
		SkillName : "Flasher",
		MaxLv : 5,
		SpAmount : [ 12, 12, 12, 12, 12 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.HT_SKIDTRAP,1 ]
		],
		ActionType: "PICKUP"
	};

	SkillInfo[SK.HT_FREEZINGTRAP] = {
		Name: "HT_FREEZINGTRAP",
		SkillName : "Freezing Trap",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.HT_FLASHER,1 ]
		],
		ActionType: "PICKUP"
	};

	SkillInfo[SK.HT_BLASTMINE] = {
		Name: "HT_BLASTMINE",
		SkillName : "Blast Mine",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.HT_LANDMINE,1 ],
			[ SK.HT_SANDMAN,1 ],
			[ SK.HT_FREEZINGTRAP,1 ]
		],
		ActionType: "PICKUP"
	};

	SkillInfo[SK.HT_CLAYMORETRAP] = {
		Name: "HT_CLAYMORETRAP",
		SkillName : "Claymore Trap",
		MaxLv : 5,
		SpAmount : [ 15, 15, 15, 15, 15 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.HT_SHOCKWAVE,1 ],
			[ SK.HT_BLASTMINE,1 ]
		],
		ActionType: "PICKUP"
	};

	SkillInfo[SK.HT_REMOVETRAP] = {
		Name: "HT_REMOVETRAP",
		SkillName : "Remove Trap",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 2 ],
		_NeedSkillList : [
			[ SK.HT_LANDMINE,1 ]
		],
		NeedSkillList : new function(){
			this[JobId.JT_ROGUE] = [
				[ SK.AC_DOUBLE,5 ]
			]
		},
		ActionType: "PICKUP"
	};

	SkillInfo[SK.HT_TALKIEBOX] = {
		Name: "HT_TALKIEBOX",
		SkillName : "Talkie Box",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 3 ],
		_NeedSkillList : [
			[ SK.HT_REMOVETRAP,1 ],
			[ SK.HT_SHOCKWAVE,1 ]
		],
		ActionType: "PICKUP"
	};

	SkillInfo[SK.RK_SONICWAVE] = {
		Name: "RK_SONICWAVE",
		SkillName : "Sonic Wave",
		MaxLv : 5,
		SpAmount : [ 30, 35, 40, 45, 50 ],
		bSeperateLv : true,
		AttackRange : [ 7, 8, 9, 10, 11 ],
		_NeedSkillList : [
			[ SK.RK_ENCHANTBLADE,3 ]
		]
	};

	SkillInfo[SK.RK_HUNDREDSPEAR] = {
		Name: "RK_HUNDREDSPEAR",
		SkillName : "Hundred Spear",
		MaxLv : 10,
		SpAmount : [ 60, 60, 60, 60, 60, 60, 60, 60, 60, 60 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SK.RK_PHANTOMTHRUST,3 ]
		]
	};

	SkillInfo[SK.RK_IGNITIONBREAK] = {
		Name: "RK_IGNITIONBREAK",
		SkillName : "Ignition Break",
		MaxLv : 5,
		SpAmount : [ 35, 40, 45, 50, 55 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RK_DEATHBOUND,5 ],
			[ SK.RK_SONICWAVE,2 ],
			[ SK.RK_WINDCUTTER,3 ]
		]
	};

	SkillInfo[SK.RK_DRAGONBREATH] = {
		Name: "RK_DRAGONBREATH",
		SkillName : "Dragon Breath",
		MaxLv : 10,
		SpAmount : [ 30, 35, 40, 45, 50, 55, 60, 65, 70, 75 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.RK_DRAGONTRAINING,2 ]
		]
	};

	SkillInfo[SK.RK_RUNEMASTERY] = {
		Name: "RK_RUNEMASTERY",
		SkillName : "Rune Mastery",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.RK_CRUSHSTRIKE] = {
		Name: "RK_CRUSHSTRIKE",
		SkillName : "Crush Strike",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.HT_BEASTBANE] = {
		Name: "HT_BEASTBANE",
		SkillName : "Beast Bane",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.RK_VITALITYACTIVATION] = {
		Name: "RK_VITALITYACTIVATION",
		SkillName : "Vitality Activation",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.RK_FIGHTINGSPIRIT] = {
		Name: "RK_FIGHTINGSPIRIT",
		SkillName : "Fightning Spirit",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.RK_PHANTOMTHRUST] = {
		Name: "RK_PHANTOMTHRUST",
		SkillName : "Phantom Thrust",
		MaxLv : 5,
		SpAmount : [ 15, 18, 21, 24, 27 ],
		bSeperateLv : true,
		AttackRange : [ 5, 6, 7, 8, 9 ],
		_NeedSkillList : [
			[ SK.KN_BRANDISHSPEAR,2 ]
		]
	};

	SkillInfo[SK.GC_CROSSIMPACT] = {
		Name: "GC_CROSSIMPACT",
		SkillName : "Cross Impact",
		MaxLv : 5,
		SpAmount : [ 25, 25, 25, 25, 25 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.AS_SONICBLOW,10 ]
		]
	};

	SkillInfo[SK.GC_RESEARCHNEWPOISON] = {
		Name: "GC_RESEARCHNEWPOISON",
		SkillName : "Research New Poison",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.GC_ANTIDOTE] = {
		Name: "GC_ANTIDOTE",
		SkillName : "Antidote",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 5 ],
		_NeedSkillList : [
			[ SK.GC_RESEARCHNEWPOISON,5 ]
		]
	};

	SkillInfo[SK.GC_WEAPONBLOCKING] = {
		Name: "GC_WEAPONBLOCKING",
		SkillName : "Weapon Blocking",
		MaxLv : 5,
		SpAmount : [ 40, 36, 32, 28, 24 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AS_LEFT,5 ]
		]
	};

	SkillInfo[SK.HT_FALCON] = {
		Name: "HT_FALCON",
		SkillName : "Falconry Mastery",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.HT_BEASTBANE,1 ]
		]
	};

	SkillInfo[SK.GC_POISONSMOKE] = {
		Name: "GC_POISONSMOKE",
		SkillName : "Poison Smoke",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SK.GC_POISONINGWEAPON,5 ],
			[ SK.GC_VENOMPRESSURE,5 ]
		]
	};

	SkillInfo[SK.GC_PHANTOMMENACE] = {
		Name: "GC_PHANTOMMENACE",
		SkillName : "Phantom Menace",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.GC_CLOAKINGEXCEED,5 ],
			[ SK.GC_DARKILLUSION,5 ]
		]
	};

	SkillInfo[SK.GC_ROLLINGCUTTER] = {
		Name: "GC_ROLLINGCUTTER",
		SkillName : "Rolling Cutter",
		MaxLv : 5,
		SpAmount : [ 5, 5, 5, 5, 5 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AS_SONICBLOW,10 ]
		]
	};

	SkillInfo[SK.AB_JUDEX] = {
		Name: "AB_JUDEX",
		SkillName : "Judex",
		MaxLv : 5,
		SpAmount : [ 20, 23, 26, 29, 32 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.PR_TURNUNDEAD,1 ]
		]
	};

	SkillInfo[SK.AB_ADORAMUS] = {
		Name: "AB_ADORAMUS",
		SkillName : "Adoramus",
		MaxLv : 10,
		SpAmount : [ 20, 24, 28, 32, 36, 40, 44, 48, 52, 56 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11, 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.AB_JUDEX,5 ],
			[ SK.AB_ANCILLA,1 ],
			[ SK.PR_MAGNUS,1 ]
		]
	};

	SkillInfo[SK.AB_CANTO] = {
		Name: "AB_CANTO",
		SkillName : "Canto Candidus",
		MaxLv : 3,
		SpAmount : [ 200, 220, 240 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AL_INCAGI,1 ]
		]
	};

	SkillInfo[SK.SM_ENDURE] = {
		Name: "SM_ENDURE",
		SkillName : "Endure",
		MaxLv : 10,
		SpAmount : [ 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SM_PROVOKE,5 ]
		]
	};

	SkillInfo[SK.HT_STEELCROW] = {
		Name: "HT_STEELCROW",
		SkillName : "Steel Crow",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.HT_BLITZBEAT,5 ]
		]
	};

	SkillInfo[SK.AB_LAUDARAMUS] = {
		Name: "AB_LAUDARAMUS",
		SkillName : "Lauda Ramus",
		MaxLv : 4,
		SpAmount : [ 50, 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.AB_LAUDAAGNUS,2 ]
		]
	};

	SkillInfo[SK.AB_CLEARANCE] = {
		Name: "AB_CLEARANCE",
		SkillName : "Clearance",
		MaxLv : 5,
		SpAmount : [ 54, 60, 66, 72, 78 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.AB_LAUDARAMUS,2 ]
		]
	};

	SkillInfo[SK.AB_DUPLELIGHT_MAGIC] = {
		Name: "AB_DUPLELIGHT_MAGIC",
		SkillName : "Duple Light (Magic)",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 11, 11, 11, 11, 11, 11, 11, 11, 11, 11 ]
	};

	SkillInfo[SK.HT_BLITZBEAT] = {
		Name: "HT_BLITZBEAT",
		SkillName : "Blitz Beat",
		MaxLv : 5,
		SpAmount : [ 10, 13, 16, 19, 22 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SK.HT_FALCON,1 ]
		]
	};

	SkillInfo[SK.HT_DETECTING] = {
		Name: "HT_DETECTING",
		SkillName : "Detecting",
		MaxLv : 4,
		SpAmount : [ 8, 8, 8, 8 ],
		bSeperateLv : false,
		AttackRange : [ 3, 5, 7, 9 ],
		_NeedSkillList : [
			[ SK.AC_CONCENTRATION,1 ],
			[ SK.HT_FALCON,1 ]
		]
	};

	SkillInfo[SK.HT_SPRINGTRAP] = {
		Name: "HT_SPRINGTRAP",
		SkillName : "Spring Trap",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 4, 5, 6, 7, 8 ],
		_NeedSkillList : [
			[ SK.HT_FALCON ],
			[ SK.HT_REMOVETRAP,1 ]
		]
	};

	SkillInfo[SK.EL_WIND_CURTAIN] = {
		Name: "EL_WIND_CURTAIN",
		SkillName : "Wind Curtain",
		MaxLv : 1,
		SpAmount : [ 60 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.AS_RIGHT] = {
		Name: "AS_RIGHT",
		SkillName : "Right-Hand Mastery",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.EL_ROCK_CRUSHER] = {
		Name: "EL_ROCK_CRUSHER",
		SkillName : "Rock Crusher",
		MaxLv : 1,
		SpAmount : [ 60 ],
		bSeperateLv : false,
		AttackRange : [ 3 ]
	};

	SkillInfo[SK.AS_LEFT] = {
		Name: "AS_LEFT",
		SkillName : "Left-Hand Mastery",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AS_RIGHT,2 ]
		]
	};

	SkillInfo[SK.AS_KATAR] = {
		Name: "AS_KATAR",
		SkillName : "Katar Mastery",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.AS_CLOAKING] = {
		Name: "AS_CLOAKING",
		SkillName : "Cloaking",
		MaxLv : 10,
		SpAmount : [ 15, 15, 15, 15, 15, 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.TF_HIDING,2 ]
		]
	};

	SkillInfo[SK.AS_SONICBLOW] = {
		Name: "AS_SONICBLOW",
		SkillName : "Sonic Blow",
		MaxLv : 10,
		SpAmount : [ 16, 18, 20, 22, 24, 26, 28, 30, 32, 34 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AS_KATAR,4 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.AS_GRIMTOOTH] = {
		Name: "AS_GRIMTOOTH",
		SkillName : "Grimtooth",
		MaxLv : 5,
		SpAmount : [ 3, 3, 3, 3, 3 ],
		bSeperateLv : false,
		AttackRange : [ 2, 3, 4, 5, 6 ],
		_NeedSkillList : [
			[ SK.AS_CLOAKING,2 ],
			[ SK.AS_SONICBLOW,5 ]
		]
	};

	SkillInfo[SK.AS_ENCHANTPOISON] = {
		Name: "AS_ENCHANTPOISON",
		SkillName : "Enchant Poison",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.TF_POISON,1 ]
		]
	};

	SkillInfo[SK.WL_RADIUS] = {
		Name: "WL_RADIUS",
		SkillName : "Radius",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	SkillInfo[SK.WL_HELLINFERNO] = {
		Name: "WL_HELLINFERNO",
		SkillName : "Hell Inferno",
		MaxLv : 5,
		SpAmount : [ 35, 40, 45, 50, 55 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.WL_CRIMSONROCK,2 ]
		]
	};

	SkillInfo[SK.WL_EARTHSTRAIN] = {
		Name: "WL_EARTHSTRAIN",
		SkillName : "Earth Strain",
		MaxLv : 5,
		SpAmount : [ 70, 78, 86, 94, 102 ],
		bSeperateLv : true,
		AttackRange : [ 6, 6, 6, 6, 6 ],
		_NeedSkillList : [
			[ SK.WL_SIENNAEXECRATE,2 ]
		]
	};

	SkillInfo[SK.AS_POISONREACT] = {
		Name: "AS_POISONREACT",
		SkillName : "Poison React",
		MaxLv : 10,
		SpAmount : [ 25, 30, 35, 40, 45, 50, 55, 60, 45, 45 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AS_ENCHANTPOISON,3 ]
		]
	};

	SkillInfo[SK.WL_SUMMONWB] = {
		Name: "WL_SUMMONWB",
		SkillName : "Summon Water Ball",
		MaxLv : 5,
		SpAmount : [ 10, 12, 14, 16, 18 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.WZ_STORMGUST,1 ]
		]
	};

	SkillInfo[SK.WL_FREEZE_SP] = {
		Name: "WL_FREEZE_SP",
		SkillName : "Freeze Spell",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.AS_VENOMDUST] = {
		Name: "AS_VENOMDUST",
		SkillName : "Venom Dust",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.AS_ENCHANTPOISON,5 ]
		]
	};

	SkillInfo[SK.RA_WUGMASTERY] = {
		Name: "RA_WUGMASTERY",
		SkillName : "Warg Mastery",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.RA_WUGBITE] = {
		Name: "RA_WUGBITE",
		SkillName : "Warg Bite",
		MaxLv : 5,
		SpAmount : [ 40, 44, 46, 48, 50 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.RA_WUGSTRIKE,1 ]
		]
	};

	SkillInfo[SK.RA_RESEARCHTRAP] = {
		Name: "RA_RESEARCHTRAP",
		SkillName : "Research Trap",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.HT_CLAYMORETRAP,1 ],
			[ SK.HT_REMOVETRAP,1 ]
		]
	};

	SkillInfo[SK.AS_SPLASHER] = {
		Name: "AS_SPLASHER",
		SkillName : "Venom Splasher",
		MaxLv : 10,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AS_VENOMDUST,5 ],
			[ SK.AS_POISONREACT,5 ]
		]
	};

	SkillInfo[SK.NC_BOOSTKNUCKLE] = {
		Name: "NC_BOOSTKNUCKLE",
		SkillName : "Boost Knuckle",
		MaxLv : 5,
		SpAmount : [ 3, 6, 9, 12, 15 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.NC_MADOLICENCE,1 ]
		]
	};

	SkillInfo[SK.NC_COLDSLOWER] = {
		Name: "NC_COLDSLOWER",
		SkillName : "Cold Slower",
		MaxLv : 3,
		SpAmount : [ 20, 20, 20 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7 ],
		_NeedSkillList : [
			[ SK.NC_VULCANARM,3 ]
		]
	};

	SkillInfo[SK.NC_F_SIDESLIDE] = {
		Name: "NC_F_SIDESLIDE",
		SkillName : "Front Side Slide",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.NC_HOVERING,1 ]
		]
	};

	SkillInfo[SK.NV_FIRSTAID] = {
		Name: "NV_FIRSTAID",
		SkillName : "First Aid",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 3 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.NC_MAGNETICFIELD] = {
		Name: "NC_MAGNETICFIELD",
		SkillName : "Magnetic Field",
		MaxLv : 3,
		SpAmount : [ 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.NC_EMERGENCYCOOL,1 ]
		]
	};

	SkillInfo[SK.NC_TRAININGAXE] = {
		Name: "NC_TRAININGAXE",
		SkillName : "Axe Training",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.NC_AXETORNADO] = {
		Name: "NC_AXETORNADO",
		SkillName : "Axe Tornado",
		MaxLv : 5,
		SpAmount : [ 18, 20, 22, 24, 26 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.NC_TRAININGAXE,1 ]
		]
	};

	SkillInfo[SK.NV_TRICKDEAD] = {
		Name: "NV_TRICKDEAD",
		SkillName : "Trick Dead",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.SC_TRIANGLESHOT] = {
		Name: "SC_TRIANGLESHOT",
		SkillName : "Triangle Shot",
		MaxLv : 10,
		SpAmount : [ 22, 24, 26, 28, 30, 32, 34, 36, 38, 40 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 9, 9, 9, 9, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.AC_DOUBLE,7 ]
		]
	};

	SkillInfo[SK.SC_ENERVATION] = {
		Name: "SC_ENERVATION",
		SkillName : "Masquerade - Enervation",
		MaxLv : 3,
		SpAmount : [ 30, 40, 50 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.SC_BODYPAINT,1 ]
		]
	};

	SkillInfo[SK.MG_SRECOVERY] = {
		Name: "MG_SRECOVERY",
		SkillName : "Increase Spiritual Power",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.SM_MOVINGRECOVERY] = {
		Name: "SM_MOVINGRECOVERY",
		SkillName : "Moving HP Recovery",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.SC_FEINTBOMB] = {
		Name: "SC_FEINTBOMB",
		SkillName : "Feint Bomb",
		MaxLv : 3,
		SpAmount : [ 24, 28, 32 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SC_DIMENSIONDOOR,3 ]
		]
	};

	SkillInfo[SK.LG_BANISHINGPOINT] = {
		Name: "LG_BANISHINGPOINT",
		SkillName : "Banishing Point",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 25, 25, 25, 25, 25 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7, 7, 7, 7, 7, 7 ],
		_NeedSkillList : [
			[ SK.KN_SPEARMASTERY,1 ]
		]
	};

	SkillInfo[SK.LG_PINPOINTATTACK] = {
		Name: "LG_PINPOINTATTACK",
		SkillName : "Pinpoint Attack",
		MaxLv : 5,
		SpAmount : [ 50, 50, 50, 50, 50 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SK.LG_BANISHINGPOINT,5 ]
		]
	};

	SkillInfo[SK.SM_FATALBLOW] = {
		Name: "SM_FATALBLOW",
		SkillName : "Fatal Blow",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.LG_MOONSLASHER] = {
		Name: "LG_MOONSLASHER",
		SkillName : "Moon Slasher",
		MaxLv : 5,
		SpAmount : [ 20, 24, 28, 32, 36 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.KN_SPEARMASTERY,1 ]
		]
	};

	SkillInfo[SK.LG_HESPERUSLIT] = {
		Name: "LG_HESPERUSLIT",
		SkillName : "Hesperuslit",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.LG_PRESTIGE,3 ],
			[ SK.LG_BANDING,3 ]
		]
	};

	SkillInfo[SK.SR_EARTHSHAKER] = {
		Name: "SR_EARTHSHAKER",
		SkillName : "Earth Shaker",
		MaxLv : 5,
		SpAmount : [ 20, 25, 30, 35, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SR_DRAGONCOMBO,1 ],
			[ SK.SR_CURSEDCIRCLE,1 ]
		]
	};

	SkillInfo[SK.SM_AUTOBERSERK] = {
		Name: "SM_AUTOBERSERK",
		SkillName : "Auto Berserk",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.SR_KNUCKLEARROW] = {
		Name: "SR_KNUCKLEARROW",
		SkillName : "Knuckle Arrow",
		MaxLv : 5,
		SpAmount : [ 10, 15, 20, 25, 30 ],
		bSeperateLv : false,
		AttackRange : [ 7, 8, 9, 10, 11 ],
		_NeedSkillList : [
			[ SK.SR_LIGHTNINGWALK,3 ],
			[ SK.SR_RAMPAGEBLASTER,3 ]
		]
	};

	SkillInfo[SK.SR_ASSIMILATEPOWER] = {
		Name: "SR_ASSIMILATEPOWER",
		SkillName : "Assimilate Power",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.MO_ABSORBSPIRITS,1 ],
			[ SK.SR_POWERVELOCITY,1 ]
		]
	};

	SkillInfo[SK.SR_GENTLETOUCH_QUIET] = {
		Name: "SR_GENTLETOUCH_QUIET",
		SkillName : "Gentle Touch (Quiet)",
		MaxLv : 5,
		SpAmount : [ 20, 25, 30, 35, 40 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.SR_POWERVELOCITY,1 ]
		]
	};

	SkillInfo[SK.AC_MAKINGARROW] = {
		Name: "AC_MAKINGARROW",
		SkillName : "Making Arrow",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.WA_MOONLIT_SERENADE] = {
		Name: "WA_MOONLIT_SERENADE",
		SkillName : "Moonlight Serenade",
		MaxLv : 5,
		SpAmount : [ 84, 96, 108, 120, 134 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.WM_LULLABY_DEEPSLEEP,1 ]
		]
	};

	SkillInfo[SK.AC_CHARGEARROW] = {
		Name: "AC_CHARGEARROW",
		SkillName : "Charge Arrow",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.TF_SPRINKLESAND] = {
		Name: "TF_SPRINKLESAND",
		SkillName : "Sprinkle Sand",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 9 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.TF_BACKSLIDING] = {
		Name: "TF_BACKSLIDING",
		SkillName : "Back Sliding",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 7 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.TF_PICKSTONE] = {
		Name: "TF_PICKSTONE",
		SkillName : "Pick Stone",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 2 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.WM_VOICEOFSIREN] = {
		Name: "WM_VOICEOFSIREN",
		SkillName : "Siren's Voice",
		MaxLv : 5,
		SpAmount : [ 48, 56, 64, 72, 80 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.WM_POEMOFNETHERWORLD,3 ]
		]
	};

	SkillInfo[SK.WM_RANDOMIZESPELL] = {
		Name: "WM_RANDOMIZESPELL",
		SkillName : "Randomize Spell",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.WM_POEMOFNETHERWORLD,1 ]
		]
	};

	SkillInfo[SK.TF_THROWSTONE] = {
		Name: "TF_THROWSTONE",
		SkillName : "Throw Stone",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 2 ],
		bSeperateLv : false,
		AttackRange : [ 7 ]
	};

	SkillInfo[SK.WM_MELODYOFSINK] = {
		Name: "WM_MELODYOFSINK",
		SkillName : "Melody of Sink",
		MaxLv : 5,
		SpAmount : [ 120, 130, 140, 150, 160 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.WM_SONG_OF_MANA,1 ]
		]
	};


	SkillInfo[SK.MC_CARTREVOLUTION] = {
		Name: "MC_CARTREVOLUTION",
		SkillName : "Cart Revolution",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 12 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.SO_POISON_BUSTER] = {
		Name: "SO_POISON_BUSTER",
		SkillName : "Poison Buster",
		MaxLv : 5,
		SpAmount : [ 70, 90, 110, 130, 150 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SO_CLOUD_KILL,2 ]
		]
	};


	SkillInfo[SK.SO_WARMER] = {
		Name: "SO_WARMER",
		SkillName : "Warmer",
		MaxLv : 5,
		SpAmount : [ 40, 52, 64, 76, 88 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SA_VOLCANO,1 ],
			[ SK.SA_VIOLENTGALE,1 ]
		]
	};

	SkillInfo[SK.SO_EL_CONTROL] = {
		Name: "SO_EL_CONTROL",
		SkillName : "Spirit Control",
		MaxLv : 4,
		SpAmount : [ 10, 10, 10, 10 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SO_EL_ANALYSIS,1 ]
		]
	};

	SkillInfo[SK.MC_CHANGECART] = {
		Name: "MC_CHANGECART",
		SkillName : "Change Cart",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.SO_EL_CURE] = {
		Name: "SO_EL_CURE",
		SkillName : "Spirit Recovery",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.SO_EL_SYMPATHY,1 ]
		]
	};

	SkillInfo[SK.SO_EARTH_INSIGNIA] = {
		Name: "SO_EARTH_INSIGNIA",
		SkillName : "Earth Insignia",
		MaxLv : 3,
		SpAmount : [ 22, 30, 38 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SO_SUMMON_TERA,3 ]
		]
	};

	SkillInfo[SK.MC_LOUD] = {
		Name: "MC_LOUD",
		SkillName : "Loud Exclamation",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 8 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
	};

	SkillInfo[SK.GN_BLOOD_SUCKER] = {
		Name: "GN_BLOOD_SUCKER",
		SkillName : "Blood Sucker",
		MaxLv : 5,
		SpAmount : [ 30, 35, 40, 45, 50 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.GN_S_PHARMACY,3 ]
		]
	};

	SkillInfo[SK.AL_HOLYLIGHT] = {
		Name: "AL_HOLYLIGHT",
		SkillName : "Holy Light",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
	};

	SkillInfo[SK.GN_MAKEBOMB] = {
		Name: "GN_MAKEBOMB",
		SkillName : "Create Bomb",
		MaxLv : 2,
		SpAmount : [ 5, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1 ],
		_NeedSkillList : [
			[ SK.GN_MIX_COOKING,1 ]
		]
	};

	SkillInfo[SK.GD_SOULCOLD] = {
		Name: "GD_SOULCOLD",
		SkillName : "Soul of Cold",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MG_ENERGYCOAT] = {
		Name: "MG_ENERGYCOAT",
		SkillName : "Energy Coat",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
	};

	SkillInfo[SK.ALL_GUARDIAN_RECALL] = {
		Name: "ALL_GUARDIAN_RECALL",
		SkillName : "Guardian Recall",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
	};

	SkillInfo[SK.MG_SIGHT] = {
		Name: "MG_SIGHT",
		SkillName : "Sight",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
	};
	
	SkillInfo[SK.MS_BASH] = {
		Name: "MS_BASH",
		SkillName : "Bash",
		MaxLv : 10,
		SpAmount : [ 8, 8, 8, 8, 8, 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.ML_BRANDISH] = {
		Name: "ML_BRANDISH",
		SkillName : "Brandish Spear",
		MaxLv : 10,
		SpAmount : [ 12, 12, 12, 12, 12, 12, 12, 12, 12, 12 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ]
	};

	SkillInfo[SK.MER_AUTOBERSERK] = {
		Name: "MER_AUTOBERSERK",
		SkillName : "Auto Berserk",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.EL_ZEPHYR] = {
		Name: "EL_ZEPHYR",
		SkillName : "Zephyr",
		MaxLv : 1,
		SpAmount : [ 80 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.EL_FIRE_ARROW] = {
		Name: "EL_FIRE_ARROW",
		SkillName : "Fire Arrow",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 6 ]
	};

	SkillInfo[SK.EL_ROCK_CRUSHER_ATK] = {
		Name: "EL_ROCK_CRUSHER_ATK",
		SkillName : "Rock Crusher",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 5 ]
	};

	SkillInfo[SK.MG_NAPALMBEAT] = {
		Name: "MG_NAPALMBEAT",
		SkillName : "Napalm Beat",
		MaxLv : 10,
		SpAmount : [ 9, 9, 9, 12, 12, 12, 15, 15, 15, 18 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.HAMI_CASTLE] = {
		Name: "HAMI_CASTLE",
		SkillName : "Castling",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.HVAN_CAPRICE] = {
		Name: "HVAN_CAPRICE",
		SkillName : "Caprice",
		MaxLv : 5,
		SpAmount : [ 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.MH_PAIN_KILLER] = {
		Name: "MH_PAIN_KILLER",
		SkillName : "Pain Killer",
		MaxLv : 5,
		SpAmount : [ 48, 52, 56, 60, 64 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MH_SILVERVEIN_RUSH] = {
		Name: "MH_SILVERVEIN_RUSH",
		SkillName : "Silver Bain Rush",
		MaxLv : 5,
		SpAmount : [ 10, 15, 20, 25, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MH_CBC] = {
		Name: "MH_CBC",
		SkillName : "Continual Break Combo",
		MaxLv : 5,
		SpAmount : [ 10, 20, 30, 40, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.GD_HAWKEYES] = {
		Name: "GD_HAWKEYES",
		SkillName : "Sharp Hawk Eyes",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MG_SAFETYWALL] = {
		Name: "MG_SAFETYWALL",
		SkillName : "Safety Wall",
		MaxLv : 10,
		SpAmount : [ 30, 30, 30, 35, 35, 35, 40, 40, 40, 40 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_NAPALMBEAT,7],
			[ SK.MG_SOULSTRIKE,5 ]
		],
		NeedSkillList : new function(){
			this[JobId.JT_PRIEST] = [
				[ SK.PR_SANCTUARY,3 ],
				[ SK.PR_ASPERSIO,4 ],
			];
		}
	};


	SkillInfo[SK.MS_MAGNUM] = {
		Name: "MS_MAGNUM",
		SkillName : "Magnum Break",
		MaxLv : 10,
		SpAmount : [ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.ML_SPIRALPIERCE] = {
		Name: "ML_SPIRALPIERCE",
		SkillName : "Spiral Pierce",
		MaxLv : 5,
		SpAmount : [ 18, 21, 24, 27, 30 ],
		bSeperateLv : false,
		AttackRange : [ 4, 4, 4, 4, 4 ]
	};

	SkillInfo[SK.MER_DECAGI] = {
		Name: "MER_DECAGI",
		SkillName : "Decrease Agility",
		MaxLv : 10,
		SpAmount : [ 15, 17, 19, 21, 23, 25, 27, 29, 31, 33 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};
	
	SkillInfo[SK.EL_SOLID_SKIN] = {
		Name: "EL_SOLID_SKIN",
		SkillName : "Solid Skin",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.EL_FIRE_BOMB] = {
		Name: "EL_FIRE_BOMB",	
		SkillName : "Fire Bomb",
		MaxLv : 1,
		SpAmount : [ 60 ],
		bSeperateLv : false,
		AttackRange : [ 6 ]
	};

	SkillInfo[SK.EL_STONE_RAIN] = {
		Name: "EL_STONE_RAIN",
		SkillName : "Stone Rain",
		MaxLv : 1,
		SpAmount : [ 80 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.MG_SOULSTRIKE] = {
		Name: "MG_SOULSTRIKE",
		SkillName : "Soul Strike",
		MaxLv : 10,
		SpAmount : [ 18, 14, 24, 20, 30, 26, 36, 32, 42, 38 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_NAPALMBEAT,4 ]
		]
	};

	SkillInfo[SK.RG_SNATCHER] = {
		Name: "RG_SNATCHER",
		SkillName : "Snatcher",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.TF_STEAL,1 ]
		]
	};

	SkillInfo[SK.RG_STEALCOIN] = {
		Name: "RG_STEALCOIN",
		SkillName : "Steal Coin",
		MaxLv : 10,
		SpAmount : [ 15, 15, 15, 15, 15, 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RG_SNATCHER,4 ]
		]
	};

	SkillInfo[SK.RG_BACKSTAP] = {
		Name: "RG_BACKSTAP",
		SkillName : "Back Stab",
		MaxLv : 10,
		SpAmount : [ 16, 16, 16, 16, 16, 16, 16, 16, 16, 16 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RG_STEALCOIN,4 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.RG_TUNNELDRIVE] = {
		Name: "RG_TUNNELDRIVE",
		SkillName : "Tunnel Drive",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.TF_HIDING,1 ]
		]
	};

	SkillInfo[SK.RG_RAID] = {
		Name: "RG_RAID",
		SkillName : "Raid",
		MaxLv : 5,
		SpAmount : [ 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RG_TUNNELDRIVE,2 ],
			[ SK.RG_BACKSTAP,2 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.RG_STRIPWEAPON] = {
		Name: "RG_STRIPWEAPON",
		SkillName : "Strip Weapon",
		MaxLv : 5,
		SpAmount : [ 17, 19, 21, 23, 25 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RG_STRIPARMOR,5 ]
		]
	};

	SkillInfo[SK.RG_STRIPSHIELD] = {
		Name: "RG_STRIPSHIELD",
		SkillName : "Strip Shield",
		MaxLv : 5,
		SpAmount : [ 12, 14, 16, 18, 20 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RG_STRIPHELM,5 ]
		]
	};

	SkillInfo[SK.RG_STRIPARMOR] = {
		Name: "RG_STRIPARMOR",
		SkillName : "Strip Armor",
		MaxLv : 5,
		SpAmount : [ 17, 19, 21, 23, 25 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RG_STRIPSHIELD,5 ]
		]
	};

	SkillInfo[SK.RG_STRIPHELM] = {
		Name: "RG_STRIPHELM",
		SkillName : "Strip Helm",
		MaxLv : 5,
		SpAmount : [ 12, 14, 16, 18, 20 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RG_STEALCOIN,2 ]
		]
	};

	SkillInfo[SK.RG_INTIMIDATE] = {
		Name: "RG_INTIMIDATE",
		SkillName : "Intimidate",
		MaxLv : 5,
		SpAmount : [ 13, 16, 19, 22, 25 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RG_BACKSTAP,4 ],
			[ SK.RG_RAID,5 ]
		]

	};

	SkillInfo[SK.RG_GRAFFITI] = {
		Name: "RG_GRAFFITI",
		SkillName : "Graffiti",
		MaxLv : 1,
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.RG_FLAGGRAFFITI,5 ]
		]
	};

	SkillInfo[SK.GD_BATTLEORDER] = {
		Name: "GD_BATTLEORDER",
		SkillName : "Battle Orders",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};


	SkillInfo[SK.RG_FLAGGRAFFITI] = {
		Name: "RG_FLAGGRAFFITI",
		SkillName : "Flag Graffiti",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RG_CLEANER,1 ]
		]
	};

	SkillInfo[SK.RG_CLEANER] = {
		Name: "RG_CLEANER",
		SkillName : "Cleaner",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.RG_GANGSTER,1 ]
		]
	};

	SkillInfo[SK.RG_GANGSTER] = {
		Name: "RG_GANGSTER",
		SkillName : "Gangster's Paradise",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.RG_STRIPSHIELD,3 ]
		]
	};

	SkillInfo[SK.GD_ITEMEMERGENCYCALL] = {
		Name: "GD_ITEMEMERGENCYCALL",
		SkillName : "Item Emergency Call",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	SkillInfo[SK.MG_COLDBOLT] = {
		Name: "MG_COLDBOLT",
		SkillName : "Cold Bolt",
		MaxLv : 10,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.RG_COMPULSION] = {
		Name: "RG_COMPULSION",
		SkillName : "Compulsion Discount",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RG_GANGSTER,1 ]
		]
	};

	SkillInfo[SK.DE_GPAIN] = {
		Name: "DE_GPAIN",
		SkillName : "Mighty Pain Charge",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MS_BOWLINGBASH] = {
		Name: "MS_BOWLINGBASH",
		SkillName : "Bowling Bash",
		MaxLv : 10,
		SpAmount : [ 13, 14, 15, 16, 17, 18, 19, 20, 21, 22 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ]
	};

	SkillInfo[SK.ML_DEFENDER] = {
		Name: "ML_DEFENDER",
		SkillName : "Defender",
		MaxLv : 5,
		SpAmount : [ 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.RG_PLAGIARISM] = {
		Name: "RG_PLAGIARISM",
		SkillName : "Plagiarism",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RG_INTIMIDATE,5 ],
		]
	};

	SkillInfo[SK.SR_DRAGONCOMBO] = {
		Name: "SR_DRAGONCOMBO",
		SkillName : "Dragon Combo",
		MaxLv : 10,
		SpAmount : [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.MO_TRIPLEATTACK,5 ]
		]
	};

	SkillInfo[SK.SC_STRIPACCESSARY] = {
		Name: "SC_STRIPACCESSARY",
		SkillName : "Strip Accessory",
		MaxLv : 5,
		SpAmount : [ 15, 18, 21, 24, 27 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.RG_STRIPWEAPON,1 ]
		]
	};

	SkillInfo[SK.GD_GLORYWOUNDS] = {
		Name: "GD_GLORYWOUNDS",
		SkillName : "Wounds of Glory",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};


	SkillInfo[SK.AM_AXEMASTERY] = {
		Name: "AM_AXEMASTERY",
		SkillName : "Axe Mastery",
		MaxLv : 10,	
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.GD_GUARDUP] = {
		Name: "GD_GUARDUP",
		SkillName : "Build up the Guardian",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	SkillInfo[SK.GD_APPROVAL] = {
		Name: "GD_APPROVAL",
		SkillName : "Approval",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.MER_INCAGI] = {
		Name: "MER_INCAGI",
		SkillName : "Increase Agility",
		MaxLv : 10,	
		SpAmount : [ 18, 21, 24, 27, 30, 33, 36, 39, 42, 45 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.AM_LEARNINGPOTION] = {
		Name: "AM_LEARNINGPOTION",
		SkillName : "Learning Potion",
		MaxLv  : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MER_BLESSING] = {
		Name: "MER_BLESSING",
		SkillName : "Blessing",
		MaxLv : 10,
		SpAmount : [ 28, 32, 36, 40, 44, 48, 52, 56, 60, 64 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};
	
	SkillInfo[SK.MER_KYRIE] = {
		Name: "MER_KYRIE",
		SkillName : "Kyrie Eleison",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 25, 25, 25, 30, 30, 30, 35 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.EL_STONE_SHIELD] = {
		Name: "EL_STONE_SHIELD",
		SkillName : "Stone Shield",
		MaxLv : 1,
		SpAmount : [ 60 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.AM_PHARMACY] = {
		Name: "AM_PHARMACY",
		SkillName : "Pharmacy",
		MaxLv : 10,
		SpAmount : [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AM_LEARNINGPOTION,5 ]
		]
	};

	SkillInfo[SK.MER_ESTIMATION] = {
		Name: "MER_ESTIMATION",
		SkillName : "Monster Property",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.MER_LEXDIVINA] = {
		Name: "MER_LEXDIVINA",
		SkillName : "Lex Divina",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 18, 16, 14, 12, 10 ],
		bSeperateLv : false,
		AttackRange : [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ]
	};

	SkillInfo[SK.MER_SCAPEGOAT] = {
		Name: "MER_SCAPEGOAT",
		SkillName : "Scapegoat",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.AM_DEMONSTRATION] = {
		Name: "AM_DEMONSTRATION",
		SkillName : "Demonstration",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.AM_PHARMACY,4 ]
		]
	};

	SkillInfo[SK.MER_PROVOKE] = {
		Name: "MER_PROVOKE",
		SkillName : "Provoke",
		MaxLv : 10,
		SpAmount : [ 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.MER_CRASH] = {
		Name: "MER_CRASH",
		SkillName : "Crash",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
	};

	SkillInfo[SK.MER_SIGHT] = {
		Name: "MER_SIGHT",
		SkillName : "Sight",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.AM_ACIDTERROR] = {
		Name: "AM_ACIDTERROR",
		SkillName : "Acid Terror",
		MaxLv : 5,
		SpAmount : [ 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.AM_PHARMACY,5 ]
		]
	};

	SkillInfo[SK.LG_SHIELDPRESS] = {
		Name: "LG_SHIELDPRESS",
		SkillName : "Shield Press",
		MaxLv : 5,
		SpAmount : [ 10, 12, 14, 16, 18 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.CR_SHIELDCHARGE,3 ]
		]
	};

	SkillInfo[SK.ML_AUTOGUARD] = {
		Name: "ML_AUTOGUARD",
		SkillName : "Auto Guard",
		MaxLv : 10,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.ML_PIERCE] = {
		Name: "ML_PIERCE",
		SkillName : "Pierce",
		MaxLv : 10,
		SpAmount : [ 7, 7, 7, 7, 7, 7, 7, 7, 7, 7 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ]
	};

	SkillInfo[SK.AM_POTIONPITCHER] = {
		Name: "AM_POTIONPITCHER",
		SkillName : "Potion Pitcher",
		MaxLv : 5,
		SpAmount : [ 1, 1, 1, 1, 1 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.AM_PHARMACY,3 ]
		]		
	};

	SkillInfo[SK.MA_FREEZINGTRAP] = {
		Name: "MA_FREEZINGTRAP",
		SkillName : "Freezing Trap",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ],
	};


	SkillInfo[SK.MA_SKIDTRAP] = {
		Name: "MA_SKIDTRAP",
		SkillName : "Skid Trap",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ],
	};

	SkillInfo[SK.MA_SHOWER] = {
		Name: "MA_SHOWER",
		SkillName : "Arrow Shower",
		MaxLv : 10,
		SpAmount : [ 15, 15, 15, 15, 15, 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.AM_CANNIBALIZE] = {
		Name: "AM_CANNIBALIZE",
		SkillName : "Bio Cannibalize",
		MaxLv : 5,
		SpAmount : [ 20, 20, 20, 20, 20 ],
		bSeperateLv : true,
		AttackRange : [ 4, 4, 4, 4, 4 ],
		_NeedSkillList : [
			[ SK.AM_PHARMACY,6 ]
		]		
	};

	SkillInfo[SK.MA_DOUBLE] = {
		Name: "MA_DOUBLE",
		SkillName : "Double Strafing",
		MaxLv : 10,
		SpAmount : [ 12, 12, 12, 12, 12, 12, 12, 12, 12, 12 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.MS_BERSERK] = {
		Name: "MS_BERSERK",
		SkillName : "Berserk",
		MaxLv : 1,
		SpAmount : [ 200 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.MS_REFLECTSHIELD] = {
		Name: "MS_REFLECTSHIELD",
		SkillName : "Reflect Shield",
		MaxLv : 10,
		SpAmount : [ 35, 40, 45, 50, 55, 60, 65, 70, 75, 80 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.AM_SPHEREMINE] = {
		Name: "AM_SPHEREMINE",
		SkillName : "Sphere Mine",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AM_PHARMACY,2 ]
		]
	};

	SkillInfo[SK.MS_PARRYING] = {
		Name: "MS_PARRYING",
		SkillName : "Parrying",
		MaxLv : 10,
		SpAmount : [ 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MH_PYROCLASTIC] = {
		Name: "MH_PYROCLASTIC",
		SkillName : "Pyroclastic",
		MaxLv : 5,
		SpAmount : [ 20, 28, 36, 44, 52 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MH_GRANITIC_ARMOR] = {
		Name: "MH_GRANITIC_ARMOR",
		SkillName : "Granitic Armor",
		MaxLv : 5,
		SpAmount : [ 54, 58, 62, 66, 70 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};


	SkillInfo[SK.AM_CP_WEAPON] = {
		Name: "AM_CP_WEAPON",
		SkillName : "Chemical Protection Weapon",
		MaxLv : 5,
		SpAmount : [ 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AM_CP_ARMOR,3 ]
		]
	};

	SkillInfo[SK.MH_MAGMA_FLOW] = {
		Name: "MH_MAGMA_FLOW",
		SkillName : "Magma Flow",
		MaxLv : 5,
		SpAmount : [ 34, 38, 42, 46, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.EL_BLAST] = {
		Name: "EL_BLAST",
		SkillName : "Blast",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};
	
	SkillInfo[SK.MH_TINDER_BREAKER] = {
		Name: "MH_TINDER_BREAKER",
		SkillName : "Tinder Breaker",
		MaxLv : 5,
		SpAmount : [ 20, 25, 30, 35, 40 ],
		bSeperateLv : true,
		AttackRange : [ 3, 4, 5, 6, 7 ]
	};

	SkillInfo[SK.AM_CP_SHIELD] = {
		Name: "AM_CP_SHIELD",
		SkillName : "Chemical Protection Shield",
		MaxLv : 5,
		SpAmount : [ 25, 25, 25, 25, 25 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AM_CP_HELM,3 ]
		]
	};

	SkillInfo[SK.MH_HEILIGE_STANGE] = {
		Name: "MH_HEILIGE_STANGE",
		SkillName : "Holy Pole",
		MaxLv : 5,
		SpAmount : [ 60, 68, 76, 84, 100 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.MH_GOLDENE_FERSE] = {
		Name: "MH_GOLDENE_FERSE",
		SkillName : "Golden Heel",
		MaxLv : 5,
		SpAmount : [ 60, 65, 70, 75, 80 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
	};

	SkillInfo[SK.NPC_ALLHEAL] = {
		Name: "NPC_ALLHEAL",
		SkillName : "All Heal",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.AM_CP_ARMOR] = {
		Name: "AM_CP_ARMOR",
		SkillName : "Chemical Protection Armor",
		MaxLv : 5,
		SpAmount : [ 25, 25, 25, 25, 25 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AM_CP_SHIELD,3 ]
		]
	};

	SkillInfo[SK.EL_PETROLOGY] = {
		Name: "EL_PETROLOGY",
		SkillName : " Petrology",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};
	
	SkillInfo[SK.MH_SONIC_CRAW] = {
		Name: "MH_SONIC_CRAW",
		SkillName : "Sonic Claw",
		MaxLv : 5,
		SpAmount : [ 20, 25, 30, 35, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MH_SILENT_BREEZE] = {
		Name: "MH_SILENT_BREEZE",
		SkillName : "Silent Breeze",
		MaxLv : 5,
		SpAmount : [ 45, 54, 63, 72, 81 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 7, 7, 9 ],
	};

	SkillInfo[SK.AM_CP_HELM] = {
		Name: "AM_CP_HELM",
		SkillName : "Chemical Protection Helm",
		MaxLv : 5,
		SpAmount : [ 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AM_PHARMACY,2 ]
		]
	};

	SkillInfo[SK.MH_ERASER_CUTTER] = {
		Name: "MH_ERASER_CUTTER",
		SkillName : "Eraser Cutter",
		MaxLv : 5,
		SpAmount : [ 25, 30, 35, 40, 45 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ]
	};

	SkillInfo[SK.MH_OVERED_BOOST] = {
		Name: "MH_OVERED_BOOST",
		SkillName : "Overed Boost",
		MaxLv : 5,
		SpAmount : [ 70, 90, 110, 130, 150 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MH_LIGHT_OF_REGENE] = {
		Name: "MH_LIGHT_OF_REGENE",
		SkillName : "Light of Regene",
		MaxLv : 5,
		SpAmount : [ 40, 50, 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.AM_BIOETHICS] = {
		Name: "AM_BIOETHICS",
		SkillName : "Bioethics",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.MH_POISON_MIST] = {
		Name: "MH_POISON_MIST",
		SkillName : "Poison Mist",
		MaxLv : 5,
		SpAmount : [ 65, 75, 85, 95, 105 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 5, 5, 5 ]
	};

	SkillInfo[SK.MH_SUMMON_LEGION] = {
		Name: "MH_SUMMON_LEGION",
		SkillName : "Summon Legion",
		MaxLv : 5,
		SpAmount : [ 60, 80, 100, 120, 140 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.HVAN_EXPLOSION] = {
		Name: "HVAN_EXPLOSION",
		SkillName : "Bio Explosion",
		MaxLv : 3,		
		SpAmount : [ 1, 1, 1 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ]
	};

	SkillInfo[SK.AM_BIOTECHNOLOGY] = {
		Name: "AM_BIOTECHNOLOGY",
		SkillName : "Biotechnology",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.SA_CREATECON] = {
		Name: "SA_CREATECON",
		SkillName : "Create Elemental Converter",
		MaxLv : 1,
		Type : "Quest",
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.EL_WILD_STORM] = {
		Name: "EL_WILD_STORM",
		SkillName : "Wild Storm",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.MG_FROSTDIVER] = {
		Name: "MG_FROSTDIVER",
		SkillName : "Frost Diver",
		MaxLv : 10,
		SpAmount : [ 25, 24, 23, 22, 21, 20, 19, 18, 17, 16 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_COLDBOLT,5 ]
		]
	};

	SkillInfo[SK.AM_CREATECREATURE] = {
		Name: "AM_CREATECREATURE",
		SkillName : "Create Creature",
		MaxLv : 5,
		SpAmount : [ 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.HFLI_SBR44] = {
		Name: "HFLI_SBR44",
		SkillName : "S.B.R.44",
		MaxLv : 3,
		SpAmount : [ 1, 1, 1 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9 ]
	};

	SkillInfo[SK.HFLI_FLEET] = {
		Name: "HFLI_FLEET",
		SkillName : "Fleet Move",
		MaxLv : 5,
		SpAmount : [ 30, 40, 50, 60, 70 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.HAMI_BLOODLUST] = {
		Name: "HAMI_BLOODLUST",
		SkillName : "Blood Lust",
		MaxLv : 3,
		SpAmount : [ 120, 120, 120 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ]
	};

	SkillInfo[SK.AM_CULTIVATION] = {
		Name: "AM_CULTIVATION",
		SkillName : "Cultivation",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.HAMI_SKIN] = {
		Name: "HAMI_SKIN",
		SkillName : "Adamantium Skin",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.EL_CURSED_SOIL] = {
		Name: "EL_CURSED_SOIL",
		SkillName : "Cursed Soil",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.HLIF_CHANGE] = {
		Name: "HLIF_CHANGE",
		SkillName : "Mental Change",
		MaxLv : 3,
		SpAmount : [ 100, 100, 100 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	SkillInfo[SK.AM_FLAMECONTROL] = {
		Name: "AM_FLAMECONTROL",
		SkillName : "Flame Control",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.HLIF_AVOID] = {
		Name: "HLIF_AVOID",
		SkillName : "Emergency Avoid",
		MaxLv : 5,
		SpAmount : [ 20, 25, 30, 35, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.LG_OVERBRAND] = {
		Name: "LG_OVERBRAND",
		SkillName : "Overbrand",
		MaxLv : 5,
		SpAmount : [ 20, 30, 40, 50, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.LG_MOONSLASHER,3 ],
			[ SK.LG_PINPOINTATTACK,1 ]
		]
	};

	SkillInfo[SK.ALL_ODINS_RECALL] = {
		Name: "ALL_ODINS_RECALL",
		SkillName : "Odin's Recall",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.AM_CALLHOMUN] = {
		Name: "AM_CALLHOMUN",
		SkillName : "Call Homunculus",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.AM_REST,1 ]
		]
	};

	SkillInfo[SK.SR_RIDEINLIGHTNING] = {
		Name: "SR_RIDEINLIGHTNING",
		SkillName : "Ride in Lightning",
		MaxLv : 5,
		SpAmount : [ 40, 50, 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.MO_FINGEROFFENSIVE,3 ]
		]
	};

	SkillInfo[SK.SR_HOWLINGOFLION] = {
		Name: "SR_HOWLINGOFLION",
		SkillName : "Howling of Lion",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SR_RIDEINLIGHTNING,3 ],
			[ SK.SR_ASSIMILATEPOWER,1 ]
		]
	};

	SkillInfo[SK.SR_TIGERCANNON] = {
		Name: "SR_TIGERCANNON",
		SkillName : "Tiger Cannon",
		MaxLv : 10,
		SpAmount : [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SR_FALLENEMPIRE,3 ]
		]
	};

	SkillInfo[SK.AM_REST] = {
		Name: "AM_REST",
		SkillName : "Rest",
		MaxLv : 1,
		SpAmount : [ 50 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.AM_BIOETHICS,1 ]
		]
	};

	SkillInfo[SK.GN_CHANGEMATERIAL] = {
		Name: "GN_CHANGEMATERIAL",
		SkillName : "Change Material",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.GN_SLINGITEM] = {
		Name: "GN_SLINGITEM",
		SkillName : "Sling Item",
		MaxLv : 1,
		SpAmount : [ 4 ],
		bSeperateLv : false,
		AttackRange : [ 11 ],
		_NeedSkillList : [
			[ SK.GN_CHANGEMATERIAL,1 ]
		]
	};

	SkillInfo[SK.GN_MANDRAGORA] = {
		Name: "GN_MANDRAGORA",
		SkillName : "Howling of Mandragora",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.GN_HELLS_PLANT,3 ]
		]
	};

	SkillInfo[SK.AM_DRILLMASTER] = {
		Name: "AM_DRILLMASTER",
		SkillName : "Drillmaster",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.GN_HELLS_PLANT] = {
		Name: "GN_HELLS_PLANT",
		SkillName : "Hell's Plant",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.GN_BLOOD_SUCKER,3 ]
		]
	};

	SkillInfo[SK.GN_FIRE_EXPANSION] = {
		Name: "GN_FIRE_EXPANSION",
		SkillName : "Fire Expansion",
		MaxLv : 5,
		SpAmount : [ 30, 35, 40, 45, 50 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.GN_DEMONIC_FIRE,3 ]
		]
	};

	SkillInfo[SK.GN_DEMONIC_FIRE] = {
		Name: "GN_DEMONIC_FIRE",
		SkillName : "Demonic Fire",
		MaxLv : 5,
		SpAmount : [ 24, 28, 32, 36, 40 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.GN_SPORE_EXPLOSION,3 ]
		]
	};
	SkillInfo[SK.AM_HEALHOMUN] = {
		Name: "AM_HEALHOMUN",
		SkillName : "Heal Homunculus",
		MaxLv : 10,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
	};

	SkillInfo[SK.GN_WALLOFTHORN] = {
		Name: "GN_WALLOFTHORN",
		SkillName : "Wall of Thorns",
		MaxLv : 5,
		SpAmount : [ 40, 50, 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.GN_THORNS_TRAP,3 ]
		]
	};

	SkillInfo[SK.SR_CRESCENTELBOW] = {
		Name: "SR_CRESCENTELBOW",
		SkillName : "Crescent Elbow",
		MaxLv : 5,
		SpAmount : [ 80, 80, 80, 80, 80 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SR_SKYNETBLOW,1 ]
		]
	};

	SkillInfo[SK.GN_CARTBOOST] = {
		Name: "GN_CARTBOOST",
		SkillName : "Cart Boost",
		MaxLv : 5,
		SpAmount : [ 20, 24, 28, 32, 36 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.GN_REMODELING_CART,3 ]
		]
	};

	SkillInfo[SK.AM_RESURRECTHOMUN] = {
		Name: "AM_RESURRECTHOMUN",
		SkillName : "Resurrect Homunculus",
		MaxLv : 5,
		SpAmount : [ 74, 68, 62, 56, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AM_CALLHOMUN,1 ]
		]
	};

	SkillInfo[SK.GN_CARTCANNON] = {
		Name: "GN_CARTCANNON",
		SkillName : "Cart Cannon",
		MaxLv : 5,
		SpAmount : [ 40, 42, 46, 48, 50 ],
		bSeperateLv : true,
		AttackRange : [ 7, 8, 9, 10, 11 ],
		_NeedSkillList : [
			[ SK.GN_REMODELING_CART,2 ]
		]
	};

	SkillInfo[SK.GN_CART_TORNADO] = {
		Name: "GN_CART_TORNADO",
		SkillName : "Cart Tornado",
		MaxLv : 5,
		SpAmount : [ 30, 30, 30, 30, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.GN_REMODELING_CART,1 ]
		]
	};

	SkillInfo[SK.GN_TRAINING_SWORD] = {
		Name: "GN_TRAINING_SWORD",
		SkillName : "Sword Training",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
	};

	SkillInfo[SK.CR_TRUST] = {
		Name: "CR_TRUST",
		SkillName : "Faith",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.EL_WATER_SCREW_ATK] = {
		Name: "EL_WATER_SCREW_ATK",
		SkillName : "Water Screw",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.EL_WATER_SCREW] = {
		Name: "EL_WATER_SCREW",
		SkillName : "Water Screw",
		MaxLv : 1,
		SpAmount : [ 60 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.EL_ICE_NEEDLE] = {
		Name: "EL_ICE_NEEDLE",
		SkillName : "Ice Needle",
		MaxLv : 1,
		SpAmount : [ 40 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.CR_AUTOGUARD] = {
		Name: "CR_AUTOGUARD",
		SkillName : "Auto Guard",
		MaxLv : 10,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.EL_FIRE_WAVE_ATK] = {
		Name: "EL_FIRE_WAVE_ATK",
		SkillName : "Fire Wave",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 6 ]
	};

	SkillInfo[SK.EL_FIRE_WAVE] = {
		Name: "EL_FIRE_WAVE",
		SkillName : "Fire Wave",
		MaxLv : 1,
		SpAmount : [ 80 ],
		bSeperateLv : false,
		AttackRange : [ 6 ]
	};

	SkillInfo[SK.EL_FIRE_BOMB_ATK] = {
		Name: "EL_FIRE_BOMB_ATK",
		SkillName : "Fire Bomb",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 6 ]
	};

	SkillInfo[SK.CR_SHIELDCHARGE] = {
		Name: "CR_SHIELDCHARGE",
		SkillName : "Shield Charge",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.CR_AUTOGUARD,5 ]
		]
	};

	SkillInfo[SK.EL_UPHEAVAL] = {
		Name: "EL_UPHEAVAL",
		SkillName : "Upheaval",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.HAMI_DEFENCE] = {
		Name: "HAMI_DEFENCE",
		SkillName : "Defense",
		MaxLv : 5,
		SpAmount : [ 20, 25, 30, 35, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.HVAN_CHAOTIC] = {
		Name: "HVAN_CHAOTIC",
		SkillName : "Chaotic Benediction",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.CR_SHIELDBOOMERANG] = {
		Name: "CR_SHIELDBOOMERANG",
		SkillName : "Shield Boomerang",
		MaxLv : 5,
		SpAmount : [ 12, 12, 12, 12, 12 ],
		bSeperateLv : false,
		AttackRange : [ 3, 5, 7, 9, 11 ],
		_NeedSkillList : [
			[ SK.CR_SHIELDCHARGE,3 ]
		]
	};

	SkillInfo[SK.MH_MIDNIGHT_FRENZY] = {
		Name: "MH_MIDNIGHT_FRENZY",
		SkillName : "Midnight Frenzy",
		MaxLv : 5,
		SpAmount : [ 8, 16, 24, 32, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MH_EQC] = {
		Name: "MH_EQC",
		SkillName : "Eternal Quick Combo",
		MaxLv : 5,
		SpAmount : [ 24, 28, 32, 36, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.EL_GUST] = {
		Name: "EL_GUST",
		SkillName : "Gust",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.CR_REFLECTSHIELD] = {
		Name: "CR_REFLECTSHIELD",
		SkillName : "Reflect Shield",
		MaxLv : 10,
		SpAmount : [ 35, 40, 45, 50, 55, 60, 65, 70, 75, 80 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.CR_SHIELDBOOMERANG,3 ]
		]
	};

	SkillInfo[SK.EL_CHILLY_AIR] = {
		Name: "EL_CHILLY_AIR",
		SkillName : "Cool Air",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.EL_COOLER] = {
		Name: "EL_COOLER",
		SkillName : "Cooler",
		MaxLv : 0,
		SpAmount : [ ],
		bSeperateLv : false,
		AttackRange : [ ]
	};

	SkillInfo[SK.GD_REGENERATION] = {
		Name: "GD_REGENERATION",
		SkillName : "Regeneration",
		MaxLv : 3,
		SpAmount : [ 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ]
	};

	SkillInfo[SK.CR_HOLYCROSS] = {
		Name: "CR_HOLYCROSS",
		SkillName : "Holy Cross",
		MaxLv : 10,
		SpAmount : [ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.CR_TRUST,7 ]
		]
	};

	SkillInfo[SK.SO_CLOUD_KILL] = {
		Name: "SO_CLOUD_KILL",
		SkillName : "Cloud Kill",
		MaxLv : 5,
		SpAmount : [ 48, 56, 64, 70, 78 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.WZ_HEAVENDRIVE,5 ]
		]
	};

	SkillInfo[SK.EL_AQUAPLAY] = {
		Name: "EL_AQUAPLAY",
		SkillName : "Aqua Play",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.SO_EL_ACTION] = {
		Name: "SO_EL_ACTION",
		SkillName : "Elemental Action",
		MaxLv : 1,
		SpAmount : [ 50 ],
		bSeperateLv : false,
		AttackRange : [ 5 ],
		_NeedSkillList : [
			[ SK.SO_EL_CONTROL,3 ]
		]
	};

	SkillInfo[SK.CR_GRANDCROSS] = {
		Name: "CR_GRANDCROSS",
		SkillName : "Grand Cross",
		MaxLv : 10,
		SpAmount : [ 37, 44, 51, 58, 65, 72, 78, 86, 93, 100 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.CR_TRUST,10 ],
			[ SK.CR_HOLYCROSS,6 ]
		]
	};

	SkillInfo[SK.SO_WATER_INSIGNIA] = {
		Name: "SO_WATER_INSIGNIA",
		SkillName : "Water Insignia",
		MaxLv : 3,
		SpAmount : [ 22, 30, 38 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SO_SUMMON_AQUA,3 ]
		]
	};

	SkillInfo[SK.SR_RAISINGDRAGON] = {
		Name: "SR_RAISINGDRAGON",
		SkillName : "Raising Dragon",
		MaxLv : 10,
		SpAmount : [ 120, 120, 120, 120, 120, 120, 120, 120, 120, 120 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SR_RAMPAGEBLASTER,3 ],
			[ SK.SR_GENTLETOUCH_ENERGYGAIN,3 ]
		]
	};

	SkillInfo[SK.SR_POWERVELOCITY] = {
		Name: "SR_POWERVELOCITY",
		SkillName : "Power Velocity",
		MaxLv : 1,
		SpAmount : [ 50 ],
		bSeperateLv : false,
		AttackRange : [ 3 ],
		_NeedSkillList : [
			[ SK.MO_CALLSPIRITS,5 ]
		]
	};

	SkillInfo[SK.CR_DEVOTION] = {
		Name: "CR_DEVOTION",
		SkillName : "Devotion",
		MaxLv : 5,
		SpAmount : [ 25, 25, 25, 25, 25 ],
		bSeperateLv : false,
		AttackRange : [ 7, 8, 9, 10, 11 ],
		_NeedSkillList : [
			[ SK.CR_GRANDCROSS,4 ],
			[ SK.CR_REFLECTSHIELD,5 ]
		]
	};

	SkillInfo[SK.SO_SUMMON_AQUA] = {
		Name: "SO_SUMMON_AQUA",
		SkillName : "Summon Aqua",
		MaxLv : 3,
		SpAmount : [ 100, 150, 200 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SO_EL_CONTROL,1 ],
			[ SK.SO_DIAMONDDUST,3 ]
		]
	};

	SkillInfo[SK.NV_BASIC] = {
		Name: "NV_BASIC",
		SkillName : "Basic Skill",
		MaxLv : 9,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MG_STONECURSE] = {
		Name: "MG_STONECURSE",
		SkillName : "Stone Curse",
		MaxLv : 10,
		SpAmount : [ 25, 24, 23, 22, 21, 20, 19, 18, 17, 16 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ]
	};

	SkillInfo[SK.CR_PROVIDENCE] = {
		Name: "CR_PROVIDENCE",
		SkillName : "Providence",
		MaxLv : 5,
		SpAmount : [ 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.AL_DP,5 ],
			[ SK.AL_HEAL,5 ]
		]
	};

	SkillInfo[SK.AB_EUCHARISTICA] = {
		Name: "AB_EUCHARISTICA",
		SkillName : "Eucharistica",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AB_EXPIATIO,1 ],
			[ SK.AB_EPICLESIS,1 ]
		]
	};

	SkillInfo[SK.CR_DEFENDER] = {
		Name: "CR_DEFENDER",
		SkillName : "Defender",
		MaxLv : 5,
		SpAmount : [ 30, 30, 30, 30, 30 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.CR_SHIELDBOOMERANG,1 ]
		]
	};

	SkillInfo[SK.AB_SILENTIUM] = {
		Name: "AB_SILENTIUM",
		SkillName : "Silentium",
		MaxLv : 5,
		SpAmount : [ 64, 68, 72, 76, 80 ],
		bSeperateLv : true,
		AttackRange : [ 4, 5, 6, 7, 8 ],
		_NeedSkillList : [
			[ SK.AB_CLEARANCE,1 ]
		]
	};

	SkillInfo[SK.CR_SPEARQUICKEN] = {
		Name: "CR_SPEARQUICKEN",
		SkillName : "Spear Quicken",
		MaxLv : 10,
		SpAmount : [ 24, 28, 32, 36, 40, 44, 48, 52, 56, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.KN_SPEARMASTERY,10 ]
		]
	};

	SkillInfo[SK.SO_SUMMON_TERA] = {
		Name: "SO_SUMMON_TERA",
		SkillName : "Summon Tera",
		MaxLv : 3,
		SpAmount : [ 100, 150, 200 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SO_EL_CONTROL,1 ],
			[ SK.SO_EARTHGRAVE,3 ],
		]
	};

	SkillInfo[SK.MO_IRONHAND] = {
		Name: "MO_IRONHAND",
		SkillName : "Iron Hand",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AL_DEMONBANE,10 ],
			[ SK.AL_DP,10 ]
		]
	};

	SkillInfo[SK.SO_SUMMON_VENTUS] = {
		Name: "SO_SUMMON_VENTUS",
		SkillName : "Summon Ventus",
		MaxLv : 3,
		SpAmount : [ 100, 150, 200 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SO_EL_CONTROL,1 ],
			[ SK.SO_VARETYR_SPEAR,3 ]
		]
	};

	SkillInfo[SK.MO_SPIRITSRECOVERY] = {
		Name: "MO_SPIRITSRECOVERY",
		SkillName : "Spirits Recovery",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.MO_BLADESTOP,2 ]
		]
	};

	SkillInfo[SK.SO_EL_ANALYSIS] = {
		Name: "SO_EL_ANALYSIS",
		SkillName : "Four Spirity Analysis",
		MaxLv : 2,
		SpAmount : [ 10, 20 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1 ],
		_NeedSkillList : [
			[ SK.SA_FLAMELAUNCHER,1 ],
			[ SK.SA_FROSTWEAPON,1 ],
			[ SK.SA_LIGHTNINGLOADER,1 ],
			[ SK.SA_SEISMICWEAPON,1 ]
		]
	};

	SkillInfo[SK.MO_CALLSPIRITS] = {
		Name: "MO_CALLSPIRITS",
		SkillName : "Call Spirits",
		MaxLv : 5,
		SpAmount : [ 8, 8, 8, 8, 8 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.MO_IRONHAND,2 ]
		]
	};

	SkillInfo[SK.SO_VARETYR_SPEAR] = {
		Name: "SO_VARETYR_SPEAR",
		SkillName : "Varetyr Spear",
		MaxLv : 5,
		SpAmount : [ 55, 62, 69, 76, 83 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SA_SEISMICWEAPON,1 ],
			[ SK.SA_VIOLENTGALE,4 ]
		]
	};

	SkillInfo[SK.MO_ABSORBSPIRITS] = {
		Name: "MO_ABSORBSPIRITS",
		SkillName : "Absorb Spirits",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SK.MO_CALLSPIRITS,5 ]
		]
	};

	SkillInfo[SK.SO_VACUUM_EXTREME] = {
		Name: "SO_VACUUM_EXTREME",
		SkillName : "Vacuum Extreme",
		MaxLv : 5,
		SpAmount : [ 34, 42, 50, 58, 66 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SA_LANDPROTECTOR,2 ]
		]
	};

	SkillInfo[SK.MO_TRIPLEATTACK] = {
		Name: "MO_TRIPLEATTACK",
		SkillName : "Triple Attack",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.MO_DODGE,5 ]
		]
	};

	SkillInfo[SK.EL_POWER_OF_GAIA] = {
		Name: "EL_POWER_OF_GAIA",
		SkillName : "Power of Gaia",
		MaxLv : 1,
		SpAmount : [ 80 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.MO_BODYRELOCATION] = {
		Name: "MO_BODYRELOCATION",
		SkillName : "Body Relocation",
		MaxLv : 1,
		SpAmount : [ 14 ],
		bSeperateLv : false,
		AttackRange : [ 18 ],
		_NeedSkillList : [
			[ SK.MO_SPIRITSRECOVERY,2 ],
			[ SK.MO_EXTREMITYFIST,3 ],
			[ SK.MO_STEELBODY,3 ]
		]
	};

	SkillInfo[SK.SR_GENTLETOUCH_ENERGYGAIN] = {
		Name: "SR_GENTLETOUCH_ENERGYGAIN",
		SkillName : "Gentle Touch - Energy Gain",
		MaxLv : 5,
		SpAmount : [ 40, 50, 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SR_GENTLETOUCH_QUIET,3 ]
		]
	};

	SkillInfo[SK.MO_DODGE] = {
		Name: "MO_DODGE",
		SkillName : "Dodge",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.MO_IRONHAND,5 ],
			[ SK.MO_CALLSPIRITS,5 ]
		]		
	};

	SkillInfo[SK.SO_EARTHGRAVE] = {
		Name: "SO_EARTHGRAVE",
		SkillName : "Earth Grave",
		MaxLv : 5,
		SpAmount : [ 62, 70, 78, 86, 94 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.WZ_EARTHSPIKE,5 ]
		]
	};

	SkillInfo[SK.MO_INVESTIGATE] = {
		Name: "MO_INVESTIGATE",
		SkillName : "Investigate",
		MaxLv : 5,
		SpAmount : [ 10, 14, 17, 19, 20 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.MO_CALLSPIRITS,5 ]
		]		
	};

	SkillInfo[SK.SO_SPELLFIST] = {
		Name: "SO_SPELLFIST",
		SkillName : "Spell Fist",
		MaxLv : 5,
		SpAmount : [ 40, 44, 48, 52, 56 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SA_AUTOSPELL,4 ]
		]
	};

	SkillInfo[SK.MO_FINGEROFFENSIVE] = {
		Name: "MO_FINGEROFFENSIVE",
		SkillName : "Finger Offensive",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MO_INVESTIGATE,3 ]
		]		
	};

	SkillInfo[SK.SO_ELECTRICWALK] = {
		Name: "SO_ELECTRICWALK",
		SkillName : "Electric Walk",
		MaxLv : 5,
		SpAmount : [ 30, 34, 38, 42, 46 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SA_VIOLENTGALE,1 ]
		]
	};

	SkillInfo[SK.MO_STEELBODY] = {
		Name: "MO_STEELBODY",
		SkillName : "Steel Body",
		MaxLv : 5,
		SpAmount : [ 200, 200, 200, 200, 200 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.MO_COMBOFINISH,3 ]
		]			
	};

	SkillInfo[SK.WM_UNLIMITED_HUMMING_VOICE] = {
		Name: "WM_UNLIMITED_HUMMING_VOICE",
		SkillName : "Unlimited Humming Voice",
		MaxLv : 5,
		SpAmount : [ 120, 130, 140, 150, 160 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.WM_BEYOND_OF_WARCRY,1 ],
			[ SK.WM_SOUND_OF_DESTRUCTION,1 ]
		]
	};

	SkillInfo[SK.MO_BLADESTOP] = {
		Name: "MO_BLADESTOP",
		SkillName : "Blade Stop",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.MO_DODGE,5 ]
		]	
	};

	SkillInfo[SK.WA_SWING_DANCE] = {
		Name: "WA_SWING_DANCE",
		SkillName : "Swing Dance",
		MaxLv : 5,
		SpAmount : [ 96, 112, 128, 144, 160 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.WM_LULLABY_DEEPSLEEP,1 ]
		]
	};

	SkillInfo[SK.MO_EXPLOSIONSPIRITS] = {
		Name: "MO_EXPLOSIONSPIRITS",
		SkillName : "Critical Explosion",
		MaxLv : 5,
		SpAmount : [ 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.MO_ABSORBSPIRITS,1 ]
		]	
	};

	SkillInfo[SK.WM_SATURDAY_NIGHT_FEVER] = {
		Name: "WM_SATURDAY_NIGHT_FEVER",
		SkillName : "Saturday Night Fever",
		MaxLv : 5,
		SpAmount : [ 150, 160, 170, 180, 190 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.WM_DANCE_WITH_WUG,1 ]
		]
	};

	SkillInfo[SK.MO_EXTREMITYFIST] = {
		Name: "MO_EXTREMITYFIST",
		SkillName : "Asura Strike",
		MaxLv : 5,
		SpAmount : [ 1, 1, 1, 1, 1 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.MO_EXPLOSIONSPIRITS,3 ],
			[ SK.MO_FINGEROFFENSIVE,3 ]
		]	
	};

	SkillInfo[SK.MG_FIREBALL] = {
		Name: "MG_FIREBALL",
		SkillName : "Fire Ball",
		MaxLv : 10,
		SpAmount : [ 25, 25, 25, 25, 25, 25, 25, 25, 25, 25 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_FIREBOLT, 4 ]
		]
	};

	SkillInfo[SK.MO_CHAINCOMBO] = {
		Name: "MO_CHAINCOMBO",
		SkillName : "Chain Combo",
		MaxLv : 5,
		SpAmount : [ 11, 12, 13, 14, 15 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.MO_TRIPLEATTACK,5 ]
		]	
	};

	SkillInfo[SK.WM_SOUND_OF_DESTRUCTION] = {
		Name: "WM_SOUND_OF_DESTRUCTION",
		SkillName : "Sound of Destruction",
		MaxLv : 5,
		SpAmount : [ 50, 60, 70, 80, 90 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.WM_SATURDAY_NIGHT_FEVER,3 ],
			[ SK.WM_MELODYOFSINK,3 ]
		]
	};

	SkillInfo[SK.MO_COMBOFINISH] = {
		Name: "MO_COMBOFINISH",
		SkillName : "Combo Finish",
		MaxLv : 5,
		SpAmount : [ 11, 12, 13, 14, 15 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.MO_CHAINCOMBO,3 ]
		]	
	};

	SkillInfo[SK.WM_DANCE_WITH_WUG] = {
		Name: "WM_DANCE_WITH_WUG",
		SkillName : "Dance with a Warg",
		MaxLv : 5,
		SpAmount : [ 120, 140, 160, 180, 200 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		NeedSkillList : new function(){
			this[JobId.JT_MINSTREL] = [
				[ SK.MI_HARMONIZE,1 ],
				[ SK.MI_RUSH_WINDMILL,1 ],
				[ SK.MI_ECHOSONG,1 ]
			];
			this[JobId.JT_WANDERER] = [
				[ SK.WA_SWING_DANCE,1 ],
				[ SK.WA_SYMPHONY_OF_LOVER,1 ],
				[ SK.WA_MOONLIT_SERENADE,1 ]
			]
		}
	};

	SkillInfo[SK.SA_ADVANCEDBOOK] = {
		Name: "SA_ADVANCEDBOOK",
		SkillName : "Advanced Book",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.WM_SONG_OF_MANA] = {
		Name: "WM_SONG_OF_MANA",
		SkillName : "Song of Mana",
		MaxLv : 5,
		SpAmount : [ 120, 140, 160, 180, 200 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		NeedSkillList : new function(){
			this[JobId.JT_MINSTREL] = [
				[ SK.MI_HARMONIZE,1 ],
				[ SK.MI_RUSH_WINDMILL,1 ],
				[ SK.MI_ECHOSONG,1 ]
			];
			this[JobId.JT_WANDERER] = [
				[ SK.WA_SWING_DANCE,1 ],
				[ SK.WA_SYMPHONY_OF_LOVER,1 ],
				[ SK.WA_MOONLIT_SERENADE,1 ]
			]
		}
	};

	SkillInfo[SK.SA_CASTCANCEL] = {
		Name: "SA_CASTCANCEL",
		SkillName : "Cast Cancel",
		MaxLv : 5,
		SpAmount : [ 2, 2, 2, 2, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SA_ADVANCEDBOOK,2 ]
		]	
	};

	SkillInfo[SK.WL_WHITEIMPRISON] = {
		Name: "WL_WHITEIMPRISON",
		SkillName : "White Imprison",
		MaxLv : 5,
		SpAmount : [ 50, 55, 60, 65, 70 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.WL_SOULEXPANSION,3 ]
		]
	};

	SkillInfo[SK.SA_MAGICROD] = {
		Name: "SA_MAGICROD",
		SkillName : "Magic Rod",
		MaxLv : 5,
		SpAmount : [ 2, 2, 2, 2, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SA_ADVANCEDBOOK,4 ]
		]	

	};

	SkillInfo[SK.WL_STASIS] = {
		Name: "WL_STASIS",
		SkillName : "Stasis",
		MaxLv : 5,
		SpAmount : [ 50, 60, 70, 80, 90 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.WL_DRAINLIFE,1 ]
		]
	};

	SkillInfo[SK.SA_SPELLBREAKER] = {
		Name: "SA_SPELLBREAKER",
		SkillName : "Spell Breaker",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SA_MAGICROD,1 ]
		]
	};

	SkillInfo[SK.WL_TETRAVORTEX] = {
		Name: "WL_TETRAVORTEX",
		SkillName : "Tetra Vortex",
		MaxLv : 5,
		SpAmount : [ 120, 150, 180, 210, 240 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.WL_CHAINLIGHTNING,5 ],
			[ SK.WL_HELLINFERNO,5 ],
			[ SK.WL_JACKFROST,5 ],
			[ SK.WL_EARTHSTRAIN,5 ]
		]
	};

	SkillInfo[SK.SA_FREECAST] = {
		Name: "SA_FREECAST",
		SkillName : "Free Cast",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SA_CASTCANCEL,1 ]
		]
	};

	SkillInfo[SK.WM_GREAT_ECHO] = {
		Name: "WM_GREAT_ECHO",
		SkillName : "Great Echo",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.WM_METALICSOUND,1 ]
		]
	};

	SkillInfo[SK.SA_AUTOSPELL] = {
		Name: "SA_AUTOSPELL",
		SkillName : "Auto Spell",
		MaxLv : 10,
		SpAmount : [ 35, 35, 35, 35, 35, 35, 35, 35, 35, 35 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SA_FREECAST,4 ]
		]		
	};

	SkillInfo[SK.RA_ARROWSTORM] = {
		Name: "RA_ARROWSTORM",
		SkillName : "Arrow Storm",
		MaxLv : 10,
		SpAmount : [ 30, 32, 34, 36, 38, 40, 42, 44, 46, 48 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.RA_AIMEDBOLT,5 ]
		]
	};

	SkillInfo[SK.SA_FLAMELAUNCHER] = {
		Name: "SA_FLAMELAUNCHER",
		SkillName : "Flame Launcher",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_FIREBOLT,1 ],
			[ SK.SA_ADVANCEDBOOK,5 ]
		]		
	};

	SkillInfo[SK.RA_WUGRIDER] = {
		Name: "RA_WUGRIDER",
		SkillName : "Warg Rider",
		MaxLv : 3,
		SpAmount : [ 2, 2, 2 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RA_WUGMASTERY,1 ]
		]
	};

	SkillInfo[SK.SA_FROSTWEAPON] = {
		Name: "SA_FROSTWEAPON",
		SkillName : "Frost Weapon",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_COLDBOLT,1 ],
			[ SK.SA_ADVANCEDBOOK,5 ]
		]	
	};

	SkillInfo[SK.RA_MAGENTATRAP] = {
		Name: "RA_MAGENTATRAP",
		SkillName : "Magenta Trap",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 3 ],
		_NeedSkillList : [
			[ SK.RA_RESEARCHTRAP,1 ]
		]
	};

	SkillInfo[SK.SA_LIGHTNINGLOADER] = {
		Name: "SA_LIGHTNINGLOADER",
		SkillName : "Lightning Loader",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_LIGHTNINGBOLT,1 ],
			[ SK.SA_ADVANCEDBOOK,5 ]
		]	
	};

	SkillInfo[SK.NC_PILEBUNKER] = {
		Name: "NC_PILEBUNKER",
		SkillName : "Pile Bunker",
		MaxLv : 3,
		SpAmount : [ 50, 50, 50 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.NC_BOOSTKNUCKLE,2 ]
		]
	};

	SkillInfo[SK.SA_SEISMICWEAPON] = {
		Name: "SA_SEISMICWEAPON",
		SkillName : "Seismic Weapon",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_STONECURSE,1 ],
			[ SK.SA_ADVANCEDBOOK,5 ]
		]
	};

	SkillInfo[SK.NC_B_SIDESLIDE] = {
		Name: "NC_B_SIDESLIDE",
		SkillName : "Back Side Slide",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.NC_HOVERING,1 ]
		]
	};

	SkillInfo[SK.SA_DRAGONOLOGY] = {
		Name: "SA_DRAGONOLOGY",
		SkillName : "Dragonology",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SA_ADVANCEDBOOK,9 ]
		]
	};

	SkillInfo[SK.NC_NEUTRALBARRIER] = {
		Name: "NC_NEUTRALBARRIER",
		SkillName : "Neutral Barrier",
		MaxLv : 3,
		SpAmount : [ 80, 90, 100 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.NC_MAGNETICFIELD,2 ]
		]
	};

	SkillInfo[SK.SA_VOLCANO] = {
		Name: "SA_VOLCANO",
		SkillName : "Volcano",
		MaxLv : 5,
		SpAmount : [ 48, 46, 44, 42, 40 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.SA_FLAMELAUNCHER,2 ]
		]
	};

	SkillInfo[SK.NC_SILVERSNIPER] = {
		Name: "NC_SILVERSNIPER",
		SkillName : "FAW - Silver Sniper",
		MaxLv : 5,
		SpAmount : [ 25, 30, 35, 40, 45 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.NC_RESEARCHFE,2 ]
		]
	};

	SkillInfo[SK.SA_DELUGE] = {
		Name: "SA_DELUGE",
		SkillName : "Deluge",
		MaxLv : 5,
		SpAmount : [ 48, 46, 44, 42, 40 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.SA_FROSTWEAPON,2 ]
		]
	};

	SkillInfo[SK.SC_BODYPAINT] = {
		Name: "SC_BODYPAINT",
		SkillName : "Body Painting",
		MaxLv : 5,
		SpAmount : [ 10, 15, 20, 25, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
	};

	SkillInfo[SK.SA_VIOLENTGALE] = {
		Name: "SA_VIOLENTGALE",
		SkillName : "Violent Gale",
		MaxLv : 5,
		SpAmount : [ 48, 46, 44, 42, 40 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.SA_LIGHTNINGLOADER,2 ]
		]
	};

	SkillInfo[SK.MG_FIREWALL] = {
		Name: "MG_FIREWALL",
		SkillName : "Fire Wall",
		MaxLv : 10,
		SpAmount : [ 40, 40, 40, 40, 40, 40, 40, 40, 40, 40 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_SIGHT,1 ],
			[ SK.MG_FIREBALL,5 ]
		]
	};

	SkillInfo[SK.SA_LANDPROTECTOR] = {
		Name: "SA_LANDPROTECTOR",
		SkillName : "Land Protector",
		MaxLv : 5,
		SpAmount : [ 66, 62, 58, 54, 50 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.SA_DELUGE,3 ],
			[ SK.SA_VIOLENTGALE,3 ],
			[ SK.SA_VOLCANO,3 ]
		]
	};

	SkillInfo[SK.WM_GLOOMYDAY] = {
		Name: "WM_GLOOMYDAY",
		SkillName : "Gloomy Day",
		MaxLv : 5,
		SpAmount : [ 60, 75, 90, 105, 120 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.WM_RANDOMIZESPELL,1 ]
		]
	};

	SkillInfo[SK.SA_DISPELL] = {
		Name: "SA_DISPELL",
		SkillName : "Dispell",
		MaxLv : 5,
		SpAmount : [ 1, 1, 1, 1, 1 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SA_SPELLBREAKER,3 ]
		]	
	};

	SkillInfo[SK.LG_FORCEOFVANGUARD] = {
		Name: "LG_FORCEOFVANGUARD",
		SkillName : "Force of Vanguard",
		MaxLv : 5,
		SpAmount : [ 30, 30, 30, 30, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.SA_ABRACADABRA] = {
		Name: "SA_ABRACADABRA",
		SkillName : "Abracadabra",
		MaxLv : 10,
		SpAmount : [ 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SA_AUTOSPELL,5 ],
			[ SK.SA_DISPELL,1 ],
			[ SK.SA_LANDPROTECTOR,1 ]
		]	
	};

	SkillInfo[SK.LG_RAYOFGENESIS] = {
		Name: "LG_RAYOFGENESIS",
		SkillName : "Ray of Genesis",
		MaxLv : 5,
		SpAmount : [ 60, 65, 70, 75, 80 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.CR_GRANDCROSS,5 ]
		]
	};

	SkillInfo[SK.SA_MONOCELL] = {
		Name: "SA_MONOCELL",
		SkillName : "Monocell",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.SR_FALLENEMPIRE] = {
		Name: "SR_FALLENEMPIRE",
		SkillName : "Fallen Empire",
		MaxLv : 5,
		SpAmount : [ 20, 30, 40, 50, 60 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SR_DRAGONCOMBO,1 ]
		]
	};

	SkillInfo[SK.SA_CLASSCHANGE] = {
		Name: "SA_CLASSCHANGE",
		SkillName : "Class Change",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.SR_WINDMILL] = {
		Name: "SR_WINDMILL",
		SkillName : "Windmill",
		MaxLv : 1,
		SpAmount : [ 45 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.SR_CURSEDCIRCLE,1 ]
		]
	};

	SkillInfo[SK.SA_SUMMONMONSTER] = {
		Name: "SA_SUMMONMONSTER",
		SkillName : "Summon Monster",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.SR_GENTLETOUCH_CURE] = {
		Name: "SR_GENTLETOUCH_CURE",
		SkillName : "Gentle Touch (Cure)",
		MaxLv : 5,
		SpAmount : [ 40, 50, 60, 70, 80 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.SR_POWERVELOCITY,1 ]
		]
	};

	SkillInfo[SK.SA_REVERSEORCISH] = {
		Name: "SA_REVERSEORCISH",
		SkillName : "Reverse Orcish",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.WM_LULLABY_DEEPSLEEP] = {
		Name: "WM_LULLABY_DEEPSLEEP",
		SkillName : "Deep Sleep Lullaby",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.WM_LESSON,1 ]
		]
	};

	SkillInfo[SK.SA_DEATH] = {
		Name: "SA_DEATH",
		SkillName : "Death",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.WM_DEADHILLHERE] = {
		Name: "WM_DEADHILLHERE",
		SkillName : "Valley of Death",
		MaxLv : 5,
		SpAmount : [ 50, 53, 56, 59, 62 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ],
		_NeedSkillList : [
			[ SK.WM_SIRCLEOFNATURE,3 ]
		]
	};

	SkillInfo[SK.SA_FORTUNE] = {
		Name: "SA_FORTUNE",
		SkillName : "Fortune",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.WM_SEVERE_RAINSTORM] = {
		Name: "WM_SEVERE_RAINSTORM",
		SkillName : "Severe Rainstorm",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		NeedSkillList : new function(){
			this[JobId.JT_MINSTREL] = [
				[ SK.BA_MUSICALSTRIKE,5 ]
			];
			this[JobId.JT_WANDERER] = [
				[ SK.DC_THROWARROW,5 ]
			]
		}
	};

	SkillInfo[SK.SA_TAMINGMONSTER] = {
		Name: "SA_TAMINGMONSTER",
		SkillName : "Taming Monster",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.MI_RUSH_WINDMILL] = {
		Name: "MI_RUSH_WINDMILL",
		SkillName : "Windmill Swing Attack",
		MaxLv : 5,
		SpAmount : [ 82, 88, 94, 100, 106 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.WM_LULLABY_DEEPSLEEP,1 ]
		]
	};

	SkillInfo[SK.SA_QUESTION] = {
		Name: "SA_QUESTION",
		SkillName : "?",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.WM_REVERBERATION] = {
		Name: "WM_REVERBERATION",
		SkillName : "Reverberation",
		MaxLv : 5,
		SpAmount : [ 28, 32, 38, 42, 48 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		NeedSkillList : new function(){
			this[JobId.JT_MINSTREL] = [
				[ SK.BA_DISSONANCE,5 ]
			];
			this[JobId.JT_WANDERER] = [
				[ SK.DC_UGLYDANCE,5 ]
			]
		}
	};

	SkillInfo[SK.SA_GRAVITY] = {
		Name: "SA_GRAVITY",
		SkillName : "Gravity",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.WM_METALICSOUND] = {
		Name: "WM_METALICSOUND",
		SkillName : "Metalic Sound",
		MaxLv : 5,
		SpAmount : [ 64, 68, 72, 76, 80 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.WM_DOMINION_IMPULSE,1 ]
		]
	};

	SkillInfo[SK.SA_LEVELUP] = {
		Name: "SA_LEVELUP",
		SkillName : "Level Up",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.WM_LESSON] = {
		Name: "WM_LESSON",
		SkillName : "Lesson",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.SA_INSTANTDEATH] = {
		Name: "SA_INSTANTDEATH",
		SkillName : "Instant Death",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MI_ECHOSONG] = {
		Name: "MI_ECHOSONG",
		SkillName : "Echo Song",
		MaxLv : 5,
		SpAmount : [ 86, 92, 98, 104, 110 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.WM_LULLABY_DEEPSLEEP,1 ]
		]
	};

	SkillInfo[SK.SA_FULLRECOVERY] = {
		Name: "SA_FULLRECOVERY",
		SkillName : "Full Recovery",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.WM_DOMINION_IMPULSE] = {
		Name: "WM_DOMINION_IMPULSE",
		SkillName : "Dominion Impulse",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 11 ],
		_NeedSkillList : [
			[ SK.WM_REVERBERATION,1 ]
		]
	};

	SkillInfo[SK.SA_COMA] = {
		Name: "SA_COMA",
		SkillName : "Coma",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.MG_FIREBOLT] = {
		Name: "MG_FIREBOLT",
		SkillName : "Fire Bolt",
		MaxLv : 10,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.BD_ADAPTATION] = {
		Name: "BD_ADAPTATION",
		SkillName : "Adaptation to Circumstances",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.WM_BEYOND_OF_WARCRY] = {
		Name: "WM_BEYOND_OF_WARCRY",
		SkillName : "Warcry of Beyond",
		MaxLv : 5,
		SpAmount : [ 120, 130, 140, 150, 160 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.WM_LERADS_DEW,1 ]
		]
	};

	SkillInfo[SK.BD_ENCORE] = {
		Name: "BD_ENCORE",
		SkillName : "Encore",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.BD_ADAPTATION,1 ]
		]	
	};

	SkillInfo[SK.SR_GENTLETOUCH_REVITALIZE] = {
		Name: "SR_GENTLETOUCH_REVITALIZE",
		SkillName : "Gentle Touch (Revitalize)",
		MaxLv : 5,
		SpAmount : [ 40, 50, 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.SR_GENTLETOUCH_CHANGE,5 ]
		]
	};

	SkillInfo[SK.BD_LULLABY] = {
		Name: "BD_LULLABY",
		SkillName : "Lullaby",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		NeedSkillList : new function(){
			this[JobId.JT_BARD] = [
				[ SK.BA_WHISTLE,10 ]
			];
			this[JobId.JT_DANCER] = [
				[ SK.DC_HUMMING,10 ]
			]
		}
	};

	SkillInfo[SK.SO_PSYCHIC_WAVE] = {
		Name: "SO_PSYCHIC_WAVE",
		SkillName : "Psychic Wave",
		MaxLv : 5,
		SpAmount : [ 48, 56, 64, 70, 78 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SA_DISPELL,2 ]
		]
	};

	SkillInfo[SK.BD_RICHMANKIM] = {
		Name: "BD_RICHMANKIM",
		SkillName : "Mr. Kim A Rich Man",
		MaxLv : 5,
		SpAmount : [ 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BD_SIEGFRIED,3 ]
		]	
	};

	SkillInfo[SK.SO_SUMMON_AGNI] = {
		Name: "SO_SUMMON_AGNI",
		SkillName : "Summon Agni",
		MaxLv : 3,
		SpAmount : [ 100, 150, 200 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SO_EL_CONTROL,1 ],
			[ SK.SO_WARMER,3 ]
		]
	};

	SkillInfo[SK.BD_ETERNALCHAOS] = {
		Name: "BD_ETERNALCHAOS",
		SkillName : "Eternal Chaos",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.BD_ROKISWEIL,1 ]
		]	
	};

	SkillInfo[SK.SO_FIRE_INSIGNIA] = {
		Name: "SO_FIRE_INSIGNIA",
		SkillName : "Fire Insignia",
		MaxLv : 3,
		SpAmount : [ 22, 30, 38 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SO_SUMMON_AGNI,3 ]
		]
	};

	SkillInfo[SK.BD_DRUMBATTLEFIELD] = {
		Name: "BD_DRUMBATTLEFIELD",
		SkillName : "A Drum on the Battlefield",
		MaxLv : 5,
		SpAmount : [ 38, 41, 44, 47, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		NeedSkillList : new function(){
			this[JobId.JT_BARD] = [
				[ SK.BA_APPLEIDUN,10 ]
			];
			this[JobId.JT_DANCER] = [
				[ SK.DC_SERVICEFORYOU,10 ]
			]
		}
	};

	SkillInfo[SK.SR_CURSEDCIRCLE] = {
		Name: "SR_CURSEDCIRCLE",
		SkillName : "Cursed Circle",
		MaxLv : 5,
		SpAmount : [ 40, 60, 80, 100, 120 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.MO_BLADESTOP,2 ],
			[ SK.SR_GENTLETOUCH_QUIET,2 ]
		]
	};

	SkillInfo[SK.BD_RINGNIBELUNGEN] = {
		Name: "BD_RINGNIBELUNGEN",
		SkillName : "The Ring of Nibelungen",
		MaxLv : 5,
		SpAmount : [ 38, 41, 44, 47, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BD_DRUMBATTLEFIELD,3 ]
		]	
	};

	SkillInfo[SK.GN_SPORE_EXPLOSION] = {
		Name: "GN_SPORE_EXPLOSION",
		SkillName : "Spore Explosion",
		MaxLv : 5,
		SpAmount : [ 55, 60, 65, 70, 75 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.GN_S_PHARMACY,4 ]
		]
	};

	SkillInfo[SK.BD_ROKISWEIL] = {
		Name: "BD_ROKISWEIL",
		SkillName : "Loki's Veil",
		MaxLv : 1,
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		NeedSkillList : new function(){
			this[JobId.JT_BARD] = [
				[ SK.BA_ASSASSINCROSS,10 ]
			];
			this[JobId.JT_DANCER] = [
				[ SK.DC_DONTFORGETME,10 ]
			]
		}
	};

	SkillInfo[SK.SR_RAMPAGEBLASTER] = {
		Name: "SR_RAMPAGEBLASTER",
		SkillName : "Rampage Blaster",
		MaxLv : 5,
		SpAmount : [ 150, 150, 150, 150, 150 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SR_EARTHSHAKER,2 ]
		]
	};

	SkillInfo[SK.BD_INTOABYSS] = {
		Name: "BD_INTOABYSS",
		SkillName : "Into the Abyss",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.BD_LULLABY,1 ]
		]
	};

	SkillInfo[SK.GN_S_PHARMACY] = {
		Name: "GN_S_PHARMACY",
		SkillName : "Special Pharmacy",
		MaxLv : 10,
		SpAmount : [ 12, 12, 12, 12, 12, 12, 12, 12, 12, 12 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.BD_SIEGFRIED] = {
		Name: "BD_SIEGFRIED",
		SkillName : "Invulnerable Siegfried",
		MaxLv : 5,
		SpAmount : [ 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		NeedSkillList : new function(){
			this[JobId.JT_BARD] = [
				[ SK.BA_POEMBRAGI,10 ]
			];
			this[JobId.JT_DANCER] = [
				[ SK.DC_FORTUNEKISS,10 ]
			]
		}
	};

	SkillInfo[SK.GD_RESTORE] = {
		Name: "GD_RESTORE",
		SkillName : "Restore",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.BD_RAGNAROK] = {
		Name: "BD_RAGNAROK",
		SkillName : "Ragnarok",
		MaxLv : 0,
		SpAmount : [ ],
		bSeperateLv : false,
		AttackRange : [ ]
	};

	SkillInfo[SK.LG_INSPIRATION] = {
		Name: "LG_INSPIRATION",
		SkillName : "Inspiration",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.LG_PIETY,5 ],
			[ SK.LG_RAYOFGENESIS,4 ],
			[ SK.LG_SHIELDSPELL,3 ]
		]
	};

	SkillInfo[SK.BA_MUSICALLESSON] = {
		Name: "BA_MUSICALLESSON",
		SkillName : "Musical Lesson",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.LG_PIETY] = {
		Name: "LG_PIETY",
		SkillName : "Piety",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.CR_TRUST,3 ]
		]
	};

	SkillInfo[SK.BA_MUSICALSTRIKE] = {
		Name: "BA_MUSICALSTRIKE",
		SkillName : "Musical Strike",
		MaxLv : 5,
		SpAmount : [ 1, 3, 5, 7, 9, ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.BA_MUSICALLESSON,3 ]
		]
	};

	SkillInfo[SK.LG_PRESTIGE] = {
		Name: "LG_PRESTIGE",
		SkillName : "Prestige",
		MaxLv : 5,
		SpAmount : [ 75, 80, 85, 90, 95 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.LG_TRAMPLE,3 ]
		]
	};

	SkillInfo[SK.BA_DISSONANCE] = {
		Name: "BA_DISSONANCE",
		SkillName : "Dissonance",
		MaxLv : 5,
		SpAmount : [ 18, 21, 24, 27, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BD_ADAPTATION,1 ],
			[ SK.BA_MUSICALLESSON,1 ]
		]
	};

	SkillInfo[SK.ALL_ODINS_POWER] = {
		Name: "ALL_ODINS_POWER",
		SkillName : "Odin's Power",
		MaxLv : 2,
		SpAmount : [ 70, 100 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9 ]
	};

	SkillInfo[SK.BA_FROSTJOKE] = {
		Name: "BA_FROSTJOKE",
		SkillName : "Frost Joke",
		MaxLv : 5,
		SpAmount : [ 12, 14, 16, 18, 20 ],
		bSeperateLv : true,
		AttackRange : [ ],
		_NeedSkillList : [
			[ SK.BD_ENCORE,1 ]
		]
	};

	SkillInfo[SK.LG_EXEEDBREAK] = {
		Name: "LG_EXEEDBREAK",
		SkillName : "Exceed Break",
		MaxLv : 5,
		SpAmount : [ 20, 32, 44, 56, 68 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.LG_BANISHINGPOINT,3 ]
		]
	};

	SkillInfo[SK.BA_WHISTLE] = {
		Name: "BA_WHISTLE",
		SkillName : "A Whistle",
		MaxLv : 10,
		SpAmount : [ 24, 28, 32, 36, 40, 44, 48, 52, 56, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BA_DISSONANCE,3 ]
		]
	};

	SkillInfo[SK.MG_LIGHTNINGBOLT] = {
		Name: "MG_LIGHTNINGBOLT",
		SkillName : "Lightning Bolt",
		MaxLv : 10,
		SpAmount : [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.BA_ASSASSINCROSS] = {
		Name: "BA_ASSASSINCROSS",
		SkillName : "Assassin Cross of Sunset",
		MaxLv : 10,
		SpAmount : [ 38, 41, 44, 47, 50, 53, 56, 59, 62, 65 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BA_DISSONANCE,3 ]
		]
	};

	SkillInfo[SK.LG_RAGEBURST] = {
		Name: "LG_RAGEBURST",
		SkillName : "Rage Burst",
		MaxLv : 1,
		SpAmount : [ 150 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.LG_FORCEOFVANGUARD,1 ]
		]
	};

	SkillInfo[SK.BA_POEMBRAGI] = {
		Name: "BA_POEMBRAGI",
		SkillName : "A Poem of Bragi",
		MaxLv : 10,
		SpAmount : [ 40, 45, 50, 55, 60, 65, 70, 75, 80, 85 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BA_DISSONANCE,3 ]
		]
	};

	SkillInfo[SK.ML_DEVOTION] = {
		Name: "ML_DEVOTION",
		SkillName : "Devotion",
		MaxLv : 5,
		SpAmount : [ 25, 25, 25, 25, 25 ],
		bSeperateLv : false,
		AttackRange : [ 7, 8, 9, 10, 11 ],
	};

	SkillInfo[SK.BA_APPLEIDUN] = {
		Name: "BA_APPLEIDUN",
		SkillName : "The Apple of Idun",
		MaxLv : 10,
		SpAmount : [ 40, 45, 50, 55, 60, 65, 70, 75, 80, 85 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BA_DISSONANCE,3 ]
		]
	};

	SkillInfo[SK.LG_TRAMPLE] = {
		Name: "LG_TRAMPLE",
		SkillName : "Trample",
		MaxLv : 3,
		SpAmount : [ 30, 45, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ]
	};

	SkillInfo[SK.DC_DANCINGLESSON] = {
		Name: "DC_DANCINGLESSON",
		SkillName : "Dancing Lesson",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.SC_MAELSTROM] = {
		Name: "SC_MAELSTROM",
		SkillName : "Maelstrom",
		MaxLv : 3,
		SpAmount : [ 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7 ],
		_NeedSkillList : [
			[ SK.SC_CHAOSPANIC,3 ],
			[ SK.SC_UNLUCKY,3 ]
		]
	};

	SkillInfo[SK.DC_THROWARROW] = {
		Name: "DC_THROWARROW",
		SkillName : "Throw Arrow",
		MaxLv : 5,
		SpAmount : [ 1, 3, 5, 7, 9 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.DC_DANCINGLESSON,3 ]
		]
	};

	SkillInfo[SK.SC_CHAOSPANIC] = {
		Name: "SC_CHAOSPANIC",
		SkillName : "Chaos Panic",
		MaxLv : 3,
		SpAmount : [ 30, 36, 42 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7 ],
		_NeedSkillList : [
			[ SK.SC_MANHOLE,1 ]
		]
	};

	SkillInfo[SK.DC_UGLYDANCE] = {
		Name: "DC_UGLYDANCE",
		SkillName : "Ugly Dance",
		MaxLv : 5,
		SpAmount : [ 23, 26, 29, 32, 35 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BD_ADAPTATION,1 ],
			[ SK.DC_DANCINGLESSON,1 ]
		]
	};

	SkillInfo[SK.SC_DIMENSIONDOOR] = {
		Name: "SC_DIMENSIONDOOR",
		SkillName : "Dimension Door",
		MaxLv : 3,
		SpAmount : [ 30, 36, 42 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7 ],
		_NeedSkillList : [
			[ SK.SC_MANHOLE,1 ]
		]
	};

	SkillInfo[SK.DC_SCREAM] = {
		Name: "DC_SCREAM",
		SkillName : "Scream",
		MaxLv : 5,
		SpAmount : [ 12, 14, 16, 18, 20 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.BD_ENCORE,1 ]
		]
	};

	SkillInfo[SK.SC_MANHOLE] = {
		Name: "SC_MANHOLE",
		SkillName : "Manhole",
		MaxLv : 3,
		SpAmount : [ 20, 25, 30 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7 ],
		_NeedSkillList : [
			[ SK.RG_FLAGGRAFFITI,1 ]
		]
	};

	SkillInfo[SK.DC_HUMMING] = {
		Name: "DC_HUMMING",
		SkillName : "Humming",
		MaxLv : 10,
		SpAmount : [ 22, 24, 26, 28, 30, 32, 34, 36, 38, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.DC_UGLYDANCE,3 ]
		]
	};

	SkillInfo[SK.EL_PYROTECHNIC] = {
		Name: "EL_PYROTECHNIC",
		SkillName : "Pyrotechnic",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.DC_DONTFORGETME] = {
		Name: "DC_DONTFORGETME",
		SkillName : "Please Don't Forget Me",
		MaxLv : 10,
		SpAmount : [ 28, 31, 34, 37, 40, 43, 46, 49, 52, 55 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.DC_UGLYDANCE,3 ]
		]
	};

	SkillInfo[SK.SC_WEAKNESS] = {
		Name: "SC_WEAKNESS",
		SkillName : "Masquerade - Weakness",
		MaxLv : 3,
		SpAmount : [ 30, 40, 50 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.SC_ENERVATION,1 ],
			[ SK.SC_GROOMY,1 ],
			[ SK.SC_IGNORANCE,1 ]
		]
	};

	SkillInfo[SK.DC_FORTUNEKISS] = {
		Name: "DC_FORTUNEKISS",
		SkillName : "Fortune's Kiss",
		MaxLv : 10,
		SpAmount : [ 43, 46, 49, 52, 55, 58, 61, 64, 67, 70 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.DC_UGLYDANCE,3 ]
		]
	};

	SkillInfo[SK.SC_UNLUCKY] = {
		Name: "SC_UNLUCKY",
		SkillName : "Masquerade - Unlucky",
		MaxLv : 3,
		SpAmount : [ 30, 40, 50 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.SC_LAZINESS,1 ],
			[ SK.SC_WEAKNESS,1 ]
		]
	};

	SkillInfo[SK.DC_SERVICEFORYOU] = {
		Name: "DC_SERVICEFORYOU",
		SkillName : "Service for You",
		MaxLv : 10,
		SpAmount : [ 40, 45, 50, 55, 60, 65, 70, 75, 80, 85 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.DC_UGLYDANCE,3 ]
		]
	};

	SkillInfo[SK.SC_IGNORANCE] = {
		Name: "SC_IGNORANCE",
		SkillName : "Masquerade - Ignorance",
		MaxLv : 3,
		SpAmount : [ 30, 40, 50 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.SC_BODYPAINT,1 ]
		]
	};

	SkillInfo[SK.SC_GROOMY] = {
		Name: "SC_GROOMY",
		SkillName : "Masquerade - Groomy",
		MaxLv : 3,
		SpAmount : [ 30, 40, 50 ],
		bSeperateLv : true,
		AttackRange : [ 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.SC_BODYPAINT,1 ]
		]
	};

	SkillInfo[SK.SC_INVISIBILITY] = {
		Name: "SC_INVISIBILITY",
		SkillName : "Invisibility",
		MaxLv : 5,
		SpAmount : [ 100, 100, 100, 100, 100 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SC_UNLUCKY,3 ],
			[ SK.SC_AUTOSHADOWSPELL,7 ],
			[ SK.SC_DEADLYINFECT,5 ]
		]
	};

	SkillInfo[SK.SC_AUTOSHADOWSPELL] = {
		Name: "SC_AUTOSHADOWSPELL",
		SkillName : "Auto Shadow Spell",
		MaxLv : 10,
		SpAmount : [ 40, 45, 50, 55, 60, 65, 70, 75, 80, 85 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SC_REPRODUCE,5 ]
		]
	};

	SkillInfo[SK.SC_REPRODUCE] = {
		Name: "SC_REPRODUCE",
		SkillName : "Reproduce",
		MaxLv : 10,
		SpAmount : [ 40, 45, 50, 55, 60, 65, 70, 75, 80, 85 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RG_PLAGIARISM,5 ]
		]
	};

	SkillInfo[SK.SC_FATALMENACE] = {
		Name: "SC_FATALMENACE",
		SkillName : "Fatal Menace",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RG_INTIMIDATE,5 ]
		]
	};

	SkillInfo[SK.NC_MAGICDECOY] = {
		Name: "NC_MAGICDECOY",
		SkillName : "FAW - Magic Decoy",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.NC_SILVERSNIPER,2 ]
		]
	};

	SkillInfo[SK.WE_MALE] = {
		Name: "WE_MALE",
		SkillName : "I'll save you",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.NC_AXEBOOMERANG] = {
		Name: "NC_AXEBOOMERANG",
		SkillName : "Axe Boomerang",
		MaxLv : 5,
		SpAmount : [ 20, 22, 24, 26, 28 ],
		bSeperateLv : true,
		AttackRange : [ 5, 6, 7, 8, 9 ],
		_NeedSkillList : [
			[ SK.NC_TRAININGAXE,1 ]
		]
	};

	SkillInfo[SK.WE_FEMALE] = {
		Name: "WE_FEMALE",
		SkillName : "I'll sacrifice myself for you",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.MG_THUNDERSTORM] = {
		Name: "MG_THUNDERSTORM",
		SkillName : "Thunder Storm",
		MaxLv : 10,
		SpAmount : [ 29, 34, 39, 44, 49, 54, 59, 64, 69, 74 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.MG_LIGHTNINGBOLT,4 ]
		]
	};

	SkillInfo[SK.WE_CALLPARTNER] = {
		Name: "WE_CALLPARTNER",
		SkillName : "I miss you",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.NC_RESEARCHFE] = {
		Name: "NC_RESEARCHFE",
		SkillName : "Research Fire / Earth",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.ITM_TOMAHAWK] = {
		Name: "ITM_TOMAHAWK",
		SkillName : "Throw Tomahawk",
		MaxLv : 1,
		SpAmount : [ 1 ],
		bSeperateLv : false,
		AttackRange : [ 9 ]
	};

	SkillInfo[SK.NC_STEALTHFIELD] = {
		Name: "NC_STEALTHFIELD",
		SkillName : "Stealth Field",
		MaxLv : 3,
		SpAmount : [ 80, 100, 120 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.NC_ANALYZE,3 ],
			[ SK.NC_NEUTRALBARRIER,2 ]
		]
	};

	SkillInfo[SK.NC_INFRAREDSCAN] = {
		Name: "NC_INFRAREDSCAN",
		SkillName : "Infrared Scan",
		MaxLv : 1,
		SpAmount : [ 45 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.NC_SHAPESHIFT,2 ]
		]
	};

	SkillInfo[SK.NC_EMERGENCYCOOL] = {
		Name: "NC_EMERGENCYCOOL",
		SkillName : "Emergency Cool",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.NC_SELFDESTRUCTION,2 ]
		]
	};

	SkillInfo[SK.NC_SHAPESHIFT] = {
		Name: "NC_SHAPESHIFT",
		SkillName : "Shape Shift",
		MaxLv : 4,
		SpAmount : [ 100, 100, 100, 100 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.NC_MAINFRAME,2 ]
		]
	};

	SkillInfo[SK.NC_SELFDESTRUCTION] = {
		Name: "NC_SELFDESTRUCTION",
		SkillName : "Self Destruction",
		MaxLv : 3,
		SpAmount : [ 200, 200, 200 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.NC_MAINFRAME,2 ]
		]
	};

	SkillInfo[SK.NC_MAINFRAME] = {
		Name: "NC_MAINFRAME",
		SkillName : "Mainframe Restructure",
		MaxLv : 4,
		SpAmount : [ 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.NC_MADOLICENCE,4 ]
		]
	};

	SkillInfo[SK.NC_ACCELERATION] = {
		Name: "NC_ACCELERATION",
		SkillName : "Acceleration",
		MaxLv : 3,
		SpAmount : [ 20, 40, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.NC_MADOLICENCE,1 ]
		]
	};

	SkillInfo[SK.NC_ARMSCANNON] = {
		Name: "NC_ARMSCANNON",
		SkillName : "Arms Cannon",
		MaxLv : 3,
		SpAmount : [ 30, 45, 60 ],
		bSeperateLv : true,
		AttackRange : [ 9, 11, 13 ],
		_NeedSkillList : [
			[ SK.NC_FLAMELAUNCHER,2 ],
			[ SK.NC_COLDSLOWER,2 ]
		]
	};

	SkillInfo[SK.NC_VULCANARM] = {
		Name: "NC_VULCANARM",
		SkillName : "Vulcan Arm",
		MaxLv : 3,
		SpAmount : [ 2, 4, 6 ],
		bSeperateLv : true,
		AttackRange : [ 13, 13, 13 ],
		_NeedSkillList : [
			[ SK.NC_BOOSTKNUCKLE,2 ]
		]
	};

	SkillInfo[SK.RA_ICEBOUNDTRAP] = {
		Name: "RA_ICEBOUNDTRAP",
		SkillName : "Ice Bound Trap",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.RA_DETONATOR,1 ]
		]
	};

	SkillInfo[SK.RA_FIRINGTRAP] = {
		Name: "RA_FIRINGTRAP",
		SkillName : "Firing Trap",
		MaxLv : 5,
		SpAmount : [ 10, 10, 10, 10, 10 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.RA_DETONATOR,1 ]
		]
	};

	SkillInfo[SK.RA_VERDURETRAP] = {
		Name: "RA_VERDURETRAP",
		SkillName : "Verdure Trap",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 3 ],
		_NeedSkillList : [
			[ SK.RA_RESEARCHTRAP,1 ]
		]
	};

	SkillInfo[SK.RA_COBALTTRAP] = {
		Name: "RA_COBALTTRAP",
		SkillName : "Cobalt Trap",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 3 ],
		_NeedSkillList : [
			[ SK.RA_RESEARCHTRAP,1 ]
		]
	};

	SkillInfo[SK.RA_SENSITIVEKEEN] = {
		Name: "RA_SENSITIVEKEEN",
		SkillName : "Sensitive Keen",
		MaxLv : 5,
		SpAmount : [ 12, 12, 12, 12, 12 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RA_TOOTHOFWUG,3 ]
		]
	};

	SkillInfo[SK.RA_TOOTHOFWUG] = {
		Name: "RA_TOOTHOFWUG",
		SkillName : "Tooth of Warg",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RA_WUGMASTERY,1 ]
		]
	};

	SkillInfo[SK.RA_WUGDASH] = {
		Name: "RA_WUGDASH",
		SkillName : "Warg Dash",
		MaxLv : 1,
		SpAmount : [ 4 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.RA_WUGRIDER,1 ]
		]
	};

	SkillInfo[SK.RA_ELECTRICSHOCKER] = {
		Name: "RA_ELECTRICSHOCKER",
		SkillName : "Electric Shocker",
		MaxLv : 5,
		SpAmount : [ 35, 35, 35, 35, 35 ],
		bSeperateLv : false,
		AttackRange : [ 3, 3, 3, 3, 3 ],
		_NeedSkillList : [
			[ SK.HT_SHOCKWAVE,5 ]
		]
	};

	SkillInfo[SK.RA_DETONATOR] = {
		Name: "RA_DETONATOR",
		SkillName : "Detonator",
		MaxLv : 1,
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SK.RA_CLUSTERBOMB,3 ]
		]
	};

	SkillInfo[SK.RA_AIMEDBOLT] = {
		Name: "RA_AIMEDBOLT",
		SkillName : "Aimed Bolt",
		MaxLv : 10,
		SpAmount : [ 30, 32, 34, 36, 38, 40, 42, 44, 46, 48 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.HT_ANKLESNARE,5 ]
		]
	};

	SkillInfo[SK.RA_RANGERMAIN] = {
		Name: "RA_RANGERMAIN",
		SkillName : "Ranger Main",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]		
	};

	SkillInfo[SK.RA_FEARBREEZE] = {
		Name: "RA_FEARBREEZE",
		SkillName : "Fear Breeze",
		MaxLv : 5,
		SpAmount : [ 55, 60, 65, 70, 75 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.RA_ARROWSTORM,5 ],
			[ SK.RA_CAMOUFLAGE,1 ]
		]
	};

	SkillInfo[SK.WL_RELEASE] = {
		Name: "WL_RELEASE",
		SkillName : "Release",
		MaxLv : 2,
		SpAmount : [ 3, 20 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11 ]
	};

	SkillInfo[SK.WL_SUMMONSTONE] = {
		Name: "WL_SUMMONSTONE",
		SkillName : "Summon Stone",
		MaxLv : 5,
		SpAmount : [ 10, 12, 14, 16, 18 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.WZ_HEAVENDRIVE,1 ]
		]
	};

	SkillInfo[SK.WL_SUMMONFB] = {
		Name: "WL_SUMMONFB",
		SkillName : "Summon Fire Ball",
		MaxLv : 5,
		SpAmount : [ 10, 12, 14, 16, 18 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.WZ_METEOR,1 ]
		]
	};

	SkillInfo[SK.WL_CHAINLIGHTNING] = {
		Name: "WL_CHAINLIGHTNING",
		SkillName : "Chain Lightning",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.WL_SUMMONBL,1 ]
		]
	};

	SkillInfo[SK.WL_COMET] = {
		Name: "WL_COMET",
		SkillName : "Comet",
		MaxLv : 5,
		SpAmount : [ 480, 560, 640, 720, 800 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.WL_HELLINFERNO,3 ]
		]
	};

	SkillInfo[SK.WL_DRAINLIFE] = {
		Name: "WL_DRAINLIFE",
		SkillName : "Drain Life",
		MaxLv : 5,
		SpAmount : [ 20, 24, 28, 32, 36 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.WL_RADIUS,1 ]
		]
	};

	SkillInfo[SK.WL_RECOGNIZEDSPELL] = {
		Name: "WL_RECOGNIZEDSPELL",
		SkillName : "Recognized Spell",
		MaxLv : 5,
		SpAmount : [ 100, 120, 140, 160, 180 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.WL_RELEASE,2 ],
			[ SK.WL_STASIS,1 ],
			[ SK.WL_WHITEIMPRISON,1 ]
		]
	};

	SkillInfo[SK.AL_DP] = {
		Name: "AL_DP",
		SkillName : "Divine Protection",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		NeedSkillList : new function(){
			this[JobId.JT_CRUSADER] = [
				[ SK.AL_CURE,1 ]
			]
		}
	};

	SkillInfo[SK.WL_MARSHOFABYSS] = {
		Name: "WL_MARSHOFABYSS",
		SkillName : "Marsh of Abyss",
		MaxLv : 5,
		SpAmount : [ 40, 42, 44, 46, 48 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.WZ_QUAGMIRE,1 ]
		]
	};

	SkillInfo[SK.WL_JACKFROST] = {
		Name: "WL_JACKFROST",
		SkillName : "Jack Frost",
		MaxLv : 5,
		SpAmount : [ 50, 60, 70, 80, 90 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.WL_FROSTMISTY,2 ]
		]
	};

	SkillInfo[SK.WL_FROSTMISTY] = {
		Name: "WL_FROSTMISTY",
		SkillName : "Frost Misty",
		MaxLv : 5,
		SpAmount : [ 40, 48, 56, 64, 72 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.WL_SUMMONWB,1 ]
		]
	};

	SkillInfo[SK.WL_SOULEXPANSION] = {
		Name: "WL_SOULEXPANSION",
		SkillName : "Soul Expansion",
		MaxLv : 5,
		SpAmount : [ 30, 35, 40, 45, 50 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.WL_DRAINLIFE,1 ]
		]
	};

	SkillInfo[SK.AB_DUPLELIGHT] = {
		Name: "AB_DUPLELIGHT",
		SkillName : "Duple Light",
		MaxLv : 10,
		SpAmount : [ 55, 60, 65, 70, 75, 80, 85, 90, 95, 100 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11, 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.PR_ASPERSIO,1 ]
		]
	};

	SkillInfo[SK.AB_EXPIATIO] = {
		Name: "AB_EXPIATIO",
		SkillName : "Expiatio",
		MaxLv : 5,
		SpAmount : [ 35, 40, 45, 50, 55 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.AB_DUPLELIGHT,5 ],
			[ SK.AB_ORATIO,5 ]
		]
	};

	SkillInfo[SK.LK_AURABLADE] = {
		Name: "LK_AURABLADE",
		SkillName : "Aura Blade",
		MaxLv : 5,
		SpAmount : [ 18, 26, 34, 42, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SM_MAGNUM,5 ],
			[ SK.SM_TWOHAND,5 ]
		]
	};

	SkillInfo[SK.AB_RENOVATIO] = {
		Name: "AB_RENOVATIO",
		SkillName : "Renovatio",
		MaxLv : 1,
		SpAmount : [ 70 ],
		bSeperateLv : false,
		AttackRange : [ 11 ],
		_NeedSkillList : [
			[ SK.AB_CHEAL,3 ]
		]
	};

	SkillInfo[SK.LK_PARRYING] = {
		Name: "LK_PARRYING",
		SkillName : "Parrying",
		MaxLv : 10,
		SpAmount : [ 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SM_PROVOKE,5 ],
			[ SK.SM_TWOHAND,10 ],
			[ SK.KN_TWOHANDQUICKEN,3 ]
		]
	};

	SkillInfo[SK.AB_LAUDAAGNUS] = {
		Name: "AB_LAUDAAGNUS",
		SkillName : "Lauda Agnus",
		MaxLv : 4,
		SpAmount : [ 50, 60, 70, 80 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.PR_STRECOVERY,1 ]
		]
	};

	SkillInfo[SK.LK_CONCENTRATION] = {
		Name: "LK_CONCENTRATION",
		SkillName : "Concentration",
		MaxLv : 5,
		SpAmount : [ 14, 18, 22, 26, 30 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.SM_RECOVERY,5 ],
			[ SK.KN_SPEARMASTERY,5 ],
			[ SK.KN_RIDING,1 ]
		]
	};

	SkillInfo[SK.AB_ORATIO] = {
		Name: "AB_ORATIO",
		SkillName : "Oratio",
		MaxLv : 10,
		SpAmount : [ 35, 38, 41, 44, 47, 50, 53, 56, 59, 62 ],
		bSeperateLv : false,
		AttackRange : [ 11, 11, 11, 11, 11, 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.AB_PRAEFATIO,5 ]
		]
	};

	SkillInfo[SK.LK_TENSIONRELAX] = {
		Name: "LK_TENSIONRELAX",
		SkillName : "Tension Relax",
		MaxLv : 1,
		SpAmount : [ 15 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.SM_PROVOKE,5 ],
			[ SK.SM_RECOVERY,10 ],
			[ SK.SM_ENDURE,3 ]
		]
	};
	SkillInfo[SK.AB_PRAEFATIO] = {
		Name: "AB_PRAEFATIO",
		SkillName : "Praefatio",
		MaxLv : 10,
		SpAmount : [ 90, 100, 110, 120, 130, 140, 150, 160, 170, 180 ],
		bSeperateLv : false,
		AttackRange : [ 11, 11, 11, 11, 11, 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.PR_KYRIE,1 ]
		]
	};

	SkillInfo[SK.LK_BERSERK] = {
		Name: "LK_BERSERK",
		SkillName : "Berserk",
		MaxLv : 1,
		SpAmount : [ 200 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.AB_EPICLESIS] = {
		Name: "AB_EPICLESIS",
		SkillName : "Epiclesis",
		MaxLv : 5,
		SpAmount : [ 300, 300, 300, 300, 300 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.AB_ANCILLA,1 ],
			[ SK.AB_HIGHNESSHEAL,1 ]
		]
	};

	SkillInfo[SK.AB_CHEAL] = {
		Name: "AB_CHEAL",
		SkillName : "Coluceo Heal",
		MaxLv : 3,
		SpAmount : [ 200, 220, 240 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AL_HEAL,1 ]
		]
	};

	SkillInfo[SK.AB_ANCILLA] = {
		Name: "AB_ANCILLA",
		SkillName : "Ancilla",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.AB_CLEMENTIA,3 ]
		]
	};

	SkillInfo[SK.HP_ASSUMPTIO] = {
		Name: "HP_ASSUMPTIO",
		SkillName : "Assumptio",
		MaxLv : 5,
		SpAmount : [ 20, 30, 40, 50, 60 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.AL_ANGELUS,1 ],
			[ SK.MG_SRECOVERY,3 ],
			[ SK.PR_IMPOSITIO,3 ]
		]
	};

	SkillInfo[SK.GC_HALLUCINATIONWALK] = {
		Name: "GC_HALLUCINATIONWALK",
		SkillName : "Hallucination Walk",
		MaxLv : 5,
		SpAmount : [ 100, 100, 100, 100, 100 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.GC_PHANTOMMENACE,1 ]
		]
	};

	SkillInfo[SK.HP_BASILICA] = {
		Name: "HP_BASILICA",
		SkillName : "Basilica",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.PR_GLORIA,2 ],
			[ SK.MG_SRECOVERY,1 ],
			[ SK.PR_KYRIE,3 ]
		]
	};

	SkillInfo[SK.GC_VENOMPRESSURE] = {
		Name: "GC_VENOMPRESSURE",
		SkillName : "Venom Pressure",
		MaxLv : 5,
		SpAmount : [ 30, 40, 50, 60, 70 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.GC_WEAPONBLOCKING,1 ],
			[ SK.GC_POISONINGWEAPON,3 ]
		]
	};

	SkillInfo[SK.HP_MEDITATIO] = {
		Name: "HP_MEDITATIO",
		SkillName : "Meditatio",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.MG_SRECOVERY,5 ],
			[ SK.PR_LEXDIVINA,5 ],
			[ SK.PR_ASPERSIO,3 ]
		]
	};

	SkillInfo[SK.GC_WEAPONCRUSH] = {
		Name: "GC_WEAPONCRUSH",
		SkillName : "Weapon Crush",
		MaxLv : 5,
		SpAmount : [ 20, 20, 20, 20, 20 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.GC_WEAPONBLOCKING,1 ]
		]
	};

	SkillInfo[SK.HW_SOULDRAIN] = {
		Name: "HW_SOULDRAIN",
		SkillName : "Soul Drain",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.MG_SRECOVERY,5 ],
			[ SK.MG_SOULSTRIKE,7 ]
		]
	};

	SkillInfo[SK.GC_POISONINGWEAPON] = {
		Name: "GC_POISONINGWEAPON",
		SkillName : "Poisoning Weapon",
		MaxLv : 5,
		SpAmount : [ 20, 24, 28, 32, 36 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.GC_CREATENEWPOISON,1 ]
		]
	};

	SkillInfo[SK.HW_MAGICCRASHER] = {
		Name: "HW_MAGICCRASHER",
		SkillName : "Magic Crasher",
		MaxLv : 1,
		SpAmount : [ 8 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SK.MG_SRECOVERY,1 ],
		]
	};

	SkillInfo[SK.GC_DARKILLUSION] = {
		Name: "GC_DARKILLUSION",
		SkillName : "Dark Illusion",
		MaxLv : 5,
		SpAmount : [ 40, 40, 40, 40, 40 ],
		bSeperateLv : true,
		AttackRange : [ 5, 6, 7, 8, 9 ],
		_NeedSkillList : [
			[ SK.GC_CROSSIMPACT,3 ]
		]
	};

	SkillInfo[SK.HW_MAGICPOWER] = {
		Name: "HW_MAGICPOWER",
		SkillName : "Amplify Magic Power",
		MaxLv : 10,
		SpAmount : [ 14, 18, 22, 26, 30, 34, 38, 42, 46, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.RK_ABUNDANCE] = {
		Name: "RK_ABUNDANCE",
		SkillName : "Abundance",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.PA_PRESSURE] = {
		Name: "PA_PRESSURE",
		SkillName : "Pressure",
		MaxLv : 5,
		SpAmount : [ 30, 35, 40, 45, 50 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SM_ENDURE,5 ],
			[ SK.CR_TRUST,5 ],
			[ SK.CR_SHIELDCHARGE,2 ]
		]
	};

	SkillInfo[SK.AL_DEMONBANE] = {
		Name: "AL_DEMONBANE",
		SkillName : "Demon Bane",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AL_DP,3 ]
		]
	};

	SkillInfo[SK.PA_SACRIFICE] = {
		Name: "PA_SACRIFICE",
		SkillName : "Sacrifice",
		MaxLv : 5,
		SpAmount : [ 100, 100, 100, 100, 100 ],
		bSeperateLv : false,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.SM_ENDURE,1 ],
			[ SK.CR_DEVOTION,3 ]
		]
	};

	SkillInfo[SK.RK_STONEHARDSKIN] = {
		Name: "RK_STONEHARDSKIN",
		SkillName : "Stonehard Skin",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.PA_GOSPEL] = {
		Name: "PA_GOSPEL",
		SkillName : "Gospel",
		MaxLv : 10,
		SpAmount : [ 80, 80, 80, 80, 80, 100, 100, 100, 100, 100 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.CR_TRUST,8 ],
			[ SK.AL_DP,3 ],
			[ SK.AL_DEMONBANE,5 ]
		]
	};

	SkillInfo[SK.RK_GIANTGROWTH] = {
		Name: "RK_GIANTGROWTH",
		SkillName : "Giant Growth",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.CH_PALMSTRIKE] = {
		Name: "CH_PALMSTRIKE",
		SkillName : "Palm Push Strike",
		MaxLv : 5,
		SpAmount : [ 2, 4, 6, 8, 10 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.MO_IRONHAND,7 ],
			[ SK.MO_CALLSPIRITS,5 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.RK_MILLENNIUMSHIELD] = {
		Name: "RK_MILLENNIUMSHIELD",
		SkillName : "Millennium Shield",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.CH_TIGERFIST] = {
		Name: "CH_TIGERFIST",
		SkillName : "Tiger Knuckle Fist",
		MaxLv : 5,
		SpAmount : [ 4, 6, 8, 10, 12 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.MO_IRONHAND,5 ],
			[ SK.MO_TRIPLEATTACK,5 ],
			[ SK.MO_COMBOFINISH,3 ]
		]
	};

	SkillInfo[SK.RK_DRAGONTRAINING] = {
		Name: "RK_DRAGONTRAINING",
		SkillName : "Dragon Training",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.KN_CAVALIERMASTERY,1 ]
		]
	};

	SkillInfo[SK.CH_CHAINCRUSH] = {
		Name: "CH_CHAINCRUSH",
		SkillName : "Chain Crush Combo",
		MaxLv : 10,
		SpAmount : [ 4, 6, 8, 10, 12, 14, 16, 18, 20, 22 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.MO_IRONHAND,5 ],
			[ SK.MO_CALLSPIRITS,5 ],
			[ SK.CH_TIGERFIST,2 ]
		]
	};

	SkillInfo[SK.RK_DEATHBOUND] = {
		Name: "RK_DEATHBOUND",
		SkillName : "Death Bound",
		MaxLv : 10,
		SpAmount : [ 50, 60, 65, 70, 75, 80, 85, 90, 95, 100 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.KN_AUTOCOUNTER,1 ],
			[ SK.RK_ENCHANTBLADE,2 ]
		]
	};

	SkillInfo[SK.PF_HPCONVERSION] = {
		Name: "PF_HPCONVERSION",
		SkillName : "Health Conversion",
		MaxLv : 5,
		SpAmount : [ 1, 2, 3, 4, 5 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.MG_SRECOVERY,1 ],
			[ SK.SA_MAGICROD,1 ]
		]
	};

	SkillInfo[SK.HVAN_INSTRUCT] = {
		Name: "HVAN_INSTRUCT",
		SkillName : "Change Instruction",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.PF_SOULCHANGE] = {
		Name: "PF_SOULCHANGE",
		SkillName : "Soul Change",
		MaxLv : 1,
		SpAmount : [ 5 ],
		bSeperateLv : false,
		AttackRange : [ 9 ],
		_NeedSkillList : [
			[ SK.SA_MAGICROD,3 ],
			[ SK.SA_SPELLBREAKER,2 ]
		]
	};

	SkillInfo[SK.MH_STAHL_HORN] = {
		Name: "MH_STAHL_HORN",
		SkillName : "Steel's Horn",
		MaxLv : 5,
		SpAmount : [ 40, 45, 50, 55, 60 ],
		bSeperateLv : true,
		AttackRange : [ 5, 6, 7, 8, 9 ]
	};

	SkillInfo[SK.PF_SOULBURN] = {
		Name: "PF_SOULBURN",
		SkillName : "Soul Burn",
		MaxLv : 5,
		SpAmount : [ 80, 90, 100, 110, 120 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.SA_CASTCANCEL,5 ],
			[ SK.SA_MAGICROD,3 ],
			[ SK.SA_DISPELL,3 ]
		]
	};

	SkillInfo[SK.NPC_MAGICMIRROR] = {
		Name: "NPC_MAGICMIRROR",
		SkillName : "Magic Mirror",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.ASC_KATAR] = {
		Name: "ASC_KATAR",
		SkillName : "Advanced Katar Research",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.TF_DOUBLE,5 ],
			[ SK.AS_KATAR,7 ]
		]
	};

	SkillInfo[SK.DA_DREAM] = {
		Name: "DA_DREAM",
		SkillName : "Black Dream Of Gemstone",
		MaxLv : 5,
		SpAmount : [ 600, 500, 400, 300, 200 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.DA_SPACE] = {
		Name: "DA_SPACE",
		SkillName : "Dark Twilight",
		MaxLv : 5,
		SpAmount : [ 120, 100, 80, 60, 40 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.GD_EMERGENCYCALL] = {
		Name: "GD_EMERGENCYCALL",
		SkillName : "Emergency Call",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.ASC_EDP] = {
		Name: "ASC_EDP",
		SkillName : "Enchant Deadly Poison",
		MaxLv : 5,
		SpAmount : [ 60, 70, 80, 90, 100 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.ASC_CDP,1 ]
		]
	};

	SkillInfo[SK.DE_NIGHTMARE] = {
		Name: "DE_NIGHTMARE",
		SkillName : "Death Nightmare",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 4 ]
	};

	SkillInfo[SK.ASC_BREAKER] = {
		Name: "ASC_BREAKER",
		SkillName : "Soul Breaker",
		MaxLv : 10,
		SpAmount : [ 20, 20, 20, 20, 20, 30, 30, 30, 30, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.TF_DOUBLE,5 ],
			[ SK.TF_POISON,5 ],
			[ SK.AS_CLOAKING,3 ],
			[ SK.AS_ENCHANTPOISON,6 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.SL_GUNNER] = {
		Name: "SL_GUNNER",
		SkillName : "Gunslinger Spirit",
		MaxLv : 5,
		SpAmount : [ 460, 360, 260, 160, 60 ],
		bSeperateLv : false,
		AttackRange : [ 9, 9, 9, 9, 9 ]
	};

	SkillInfo[SK.SN_SIGHT] = {
		Name: "SN_SIGHT",
		SkillName : "True Sight",
		MaxLv : 10,
		SpAmount : [ 20, 20, 25, 25, 30, 30, 35, 35, 40, 40 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.AC_OWL,10 ],
			[ SK.AC_VULTURE,10 ],
			[ SK.AC_CONCENTRATION,10 ],
			[ SK.HT_FALCON,1 ]
		]
	};

	SkillInfo[SK.MB_MUNAKKNOWLEDGE] = {
		Name: "MB_MUNAKKNOWLEDGE",
		SkillName : "Taming Master",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 4 ]
	};

	SkillInfo[SK.SN_FALCONASSAULT] = {
		Name: "SN_FALCONASSAULT",
		SkillName : "Falcon Assault",
		MaxLv : 5,
		SpAmount : [ 30, 34, 38, 42, 46 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.AC_VULTURE,5 ],
			[ SK.HT_FALCON,1 ],
			[ SK.HT_BLITZBEAT,5 ],
			[ SK.HT_STEELCROW,3 ]
		]
	};

	SkillInfo[SK.NJ_NEN] = {
		Name: "NJ_NEN",
		SkillName : "Soul",
		MaxLv : 5,
		SpAmount : [ 20, 30, 40, 50, 60 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.NJ_NINPOU,5 ]
		]
	};

	SkillInfo[SK.SN_SHARPSHOOTING] = {
		Name: "SN_SHARPSHOOTING",
		SkillName : "Sharp Shooting",
		MaxLv : 5,
		SpAmount : [ 18, 21, 24, 27, 30 ],
		bSeperateLv : true,
		AttackRange : [ 9, 9, 9, 9, 9 ],
		_NeedSkillList : [
			[ SK.AC_DOUBLE,5 ],
			[ SK.AC_CONCENTRATION,10 ]
		],
		ActionType: "ATTACK"
	};

	SkillInfo[SK.NJ_TATAMIGAESHI] = {
		Name: "NJ_TATAMIGAESHI",
		SkillName : "Reverse Tatami",
		MaxLv : 5,
		SpAmount : [ 15, 15, 15, 15, 15 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.GS_CHAINACTION] = {
		Name: "GS_CHAINACTION",
		SkillName : "Chain Action",
		MaxLv : 10,
		SpAmount : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.GS_SINGLEACTION,1 ]
		]
	};

	SkillInfo[SK.KO_YAMIKUMO] = {
		Name: "KO_YAMIKUMO",
		SkillName : "Shadow Cloud",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.NJ_KIRIKAGE,5 ]
		]
	};

	SkillInfo[SK.KO_RIGHT] = {
		Name: "KO_RIGHT",
		SkillName : "Right Hand Mastery",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.KO_LEFT] = {
		Name: "KO_LEFT",
		SkillName : "Left Hand Mastery",
		MaxLv : 5,
		SpAmount : [ 0, 0, 0, 0, 0 ],
		bSeperateLv : false,
		AttackRange : [ 1, 1, 1, 1, 1 ]
	};

	SkillInfo[SK.KO_JYUMONJIKIRI] = {
		Name: "KO_JYUMONJIKIRI",
		SkillName : "Cross Strike",
		MaxLv : 5,
		SpAmount : [ 10, 12, 14, 16, 18 ],
		bSeperateLv : true,
		AttackRange : [ 3, 4, 5, 6, 7 ],
		_NeedSkillList : [
			[ SK.KO_YAMIKUMO,1 ]
		]
	};

	SkillInfo[SK.KO_SETSUDAN] = {
		Name: "KO_SETSUDAN",
		SkillName : "Setsudan",
		MaxLv : 5,
		SpAmount : [ 12, 16, 20, 24, 28 ],
		bSeperateLv : true,
		AttackRange : [ 2, 2, 2, 2, 2 ],
		_NeedSkillList : [
			[ SK.KO_JYUMONJIKIRI,2 ]
		]
	};

	SkillInfo[SK.KO_BAKURETSU] = {
		Name: "KO_BAKURETSU",
		SkillName : "Exploding Kunai",
		MaxLv : 5,
		SpAmount : [ 5, 6, 7, 8, 9 ],
		bSeperateLv : true,
		AttackRange : [ 7, 8, 9, 10, 11 ],
		_NeedSkillList : [
			[ SK.NJ_KUNAI,5 ]
		]
	};

	SkillInfo[SK.KO_HAPPOKUNAI] = {
		Name: "KO_HAPPOKUNAI",
		SkillName : " Happo Kunai",
		MaxLv : 5,
		SpAmount : [ 12, 14, 16, 18, 20 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.KO_BAKURETSU,1 ]
		]
	};

	SkillInfo[SK.KO_MUCHANAGE] = {
		Name: "KO_MUCHANAGE",
		SkillName : "Overthrow",
		MaxLv : 10,
		SpAmount : [ 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ],
		bSeperateLv : true,
		AttackRange : [ 11, 11, 11, 11, 11, 11, 11, 11, 11, 11 ],
		_NeedSkillList : [
			[ SK.KO_MAKIBISHI,3 ]
		]
	};

	SkillInfo[SK.KO_HUUMARANKA] = {
		Name: "KO_HUUMARANKA",
		SkillName : "Huuma Ranka",
		MaxLv : 5,
		SpAmount : [ 24, 28, 32, 36, 40 ],
		bSeperateLv : true,
		AttackRange : [ 9, 10, 11, 12, 13 ],
		_NeedSkillList : [
			[ SK.NJ_HUUMA,5 ]
		]
	};

	SkillInfo[SK.KO_MAKIBISHI] = {
		Name: "KO_MAKIBISHI",
		SkillName : "Makibishi",
		MaxLv : 5,
		SpAmount : [ 9, 12, 15, 18, 21 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ],
		_NeedSkillList : [
			[ SK.NJ_ZENYNAGE,1 ]
		]
	};

	SkillInfo[SK.KO_MEIKYOUSISUI] = {
		Name: "KO_MEIKYOUSISUI",
		SkillName : "Meikyousisui",
		MaxLv : 5,
		SpAmount : [ 100, 100, 100, 100, 100 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.NJ_NINPOU,10 ]
		]
	};

	SkillInfo[SK.KO_ZANZOU] = {
		Name: "KO_ZANZOU",
		SkillName : "Illusion - Afterimage",
		MaxLv : 5,
		SpAmount : [ 40, 44, 48, 52, 56 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.NJ_UTSUSEMI,1 ]
		]
	};

	SkillInfo[SK.KO_KYOUGAKU] = {
		Name: "KO_KYOUGAKU",
		SkillName : "Illusion - Shock",
		MaxLv : 5,
		SpAmount : [ 40, 44, 48, 52, 56 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SK.KO_GENWAKU,2 ]
		]
	};

	SkillInfo[SK.KO_JYUSATSU] = {
		Name: "KO_JYUSATSU",
		SkillName : "Illusion - Killing Curse",
		MaxLv : 5,
		SpAmount : [ 40, 44, 48, 52, 56 ],
		bSeperateLv : true,
		AttackRange : [ 5, 5, 5, 5, 5 ],
		_NeedSkillList : [
			[ SK.KO_KYOUGAKU,3 ]
		]
	};

	SkillInfo[SK.KO_KAHU_ENTEN] = {
		Name: "KO_KAHU_ENTEN",
		SkillName : "Kahu Enten",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.KO_HYOUHU_HUBUKI] = {
		Name: "KO_HYOUHU_HUBUKI",
		SkillName : "Hyouhu Hubuki",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.KO_KAZEHU_SEIRAN] = {
		Name: "KO_KAZEHU_SEIRAN",
		SkillName : "Kazehu Seiran",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.KO_DOHU_KOUKAI] = {
		Name: "KO_DOHU_KOUKAI",
		SkillName : "Dohu Koukai",
		MaxLv : 1,
		SpAmount : [ 20 ],
		bSeperateLv : false,
		AttackRange : [ 1 ]
	};

	SkillInfo[SK.KO_KAIHOU] = {
		Name: "KO_KAIHOU",
		SkillName : "Technique Kaihou",
		MaxLv : 1,
		SpAmount : [ 10 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.KO_KAHU_ENTEN,1 ],
			[ SK.KO_HYOUHU_HUBUKI,1 ],
			[ SK.KO_KAZEHU_SEIRAN,1 ],
			[ SK.KO_DOHU_KOUKAI,1 ]
		]
	};

	SkillInfo[SK.KO_ZENKAI] = {
		Name: "KO_ZENKAI",
		SkillName : "Zenkai",
		MaxLv : 1,
		SpAmount : [ 30 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
		_NeedSkillList : [
			[ SK.KO_KAIHOU,1 ],
			[ SK.KO_IZAYOI,1 ]
		]
	};

	SkillInfo[SK.KO_GENWAKU] = {
		Name: "KO_GENWAKU",
		SkillName : "Genwaku",
		MaxLv : 5,
		SpAmount : [ 40, 44, 48, 52, 56 ],
		bSeperateLv : true,
		AttackRange : [ 5, 6, 7, 8, 9 ],
		_NeedSkillList : [
			[ SK.NJ_UTSUSEMI,1 ]
		]
	};

	SkillInfo[SK.KO_IZAYOI] = {
		Name: "KO_IZAYOI",
		SkillName : "16th Night",
		MaxLv : 5,
		SpAmount : [ 70, 75, 80, 85, 90 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.NJ_NINPOU,5 ]
		]
	};

	SkillInfo[SK.KG_KAGEHUMI] = {
		Name: "KG_KAGEHUMI",
		SkillName : "Shadow Step",
		MaxLv : 5,
		SpAmount : [ 25, 30, 35, 40, 45 ],
		bSeperateLv : true,
		AttackRange : [ 5, 7, 9, 11, 13 ],
		_NeedSkillList : [
			[ SK.KO_ZANZOU,1 ]
		]
	};

	SkillInfo[SK.KG_KYOMU] = {
		Name: "KG_KYOMU",
		SkillName : "Kyomu",
		MaxLv : 5,
		SpAmount : [ 50, 50, 50, 50, 50 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.KG_KAGEHUMI,2 ]
		]
	};

	SkillInfo[SK.KG_KAGEMUSYA] = {
		Name: "KG_KAGEMUSYA",
		SkillName : "Shadow Warrior",
		MaxLv : 5,
		SpAmount : [ 60, 65, 70, 75, 80 ],
		bSeperateLv : true,
		AttackRange : [ 1, 1, 1, 1, 1 ],
		_NeedSkillList : [
			[ SK.KG_KYOMU,3 ]
		]
	};

	SkillInfo[SK.OB_ZANGETSU] = {
		Name: "OB_ZANGETSU",
		SkillName : "Distorted Crescent Moon",
		MaxLv : 5,
		SpAmount : [ 60, 70, 80, 90, 100 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ],
		_NeedSkillList : [
			[ SK.KO_GENWAKU,1 ]
		]
	};

	SkillInfo[SK.OB_OBOROGENSOU] = {
		Name: "OB_OBOROGENSOU",
		SkillName : "Oboro Gensou",
		MaxLv : 5,
		SpAmount : [ 55, 60, 65, 70, 75 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ],
		_NeedSkillList : [
			[ SK.OB_AKAITSUKI,3 ]
		]
	};

	SkillInfo[SK.OB_AKAITSUKI] = {
		Name: "OB_AKAITSUKI",
		SkillName : "Ominous Crimson Moonlight",
		MaxLv : 5,
		SpAmount : [ 20, 30, 40, 50, 60 ],
		bSeperateLv : true,
		AttackRange : [ 7, 7, 7, 7, 7 ],
		_NeedSkillList : [
			[ SK.OB_ZANGETSU,2 ]
		]
	};

	SkillInfo[SK.ECLAGE_RECALL] = {
		Name: "ECLAGE_RECALL",
		SkillName : "Return to Eclage",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 1 ],
	};

	SkillInfo[SK.ECL_SNOWFLIP] = {
		Name: "ECL_SNOWFLIP",
		SkillName : "Snow Flip",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 7 ],
	};

	SkillInfo[SK.ECL_PEONYMAMY] = {
		Name: "ECL_PEONYMAMY",
		SkillName : "�����ϸ���",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 7 ],
	};

	SkillInfo[SK.ECL_SADAGUI] = {
		Name: "ECL_SADAGUI",
		SkillName : "���ٱ�",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 7 ],
	};

	SkillInfo[SK.ECL_SEQUOIADUST] = {
		Name: "ECL_SEQUOIADUST",
		SkillName : "Sequoia Dust",
		MaxLv : 1,
		SpAmount : [ 0 ],
		bSeperateLv : false,
		AttackRange : [ 7 ],
	};


	return SkillInfo;
});