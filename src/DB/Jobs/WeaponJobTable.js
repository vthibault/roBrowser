/**
 * DB/Jobs/WeaponJobTable.js
 *
 * Look up: job id -> ressource name
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(["./JobConst", "./JobNameTable"], function( JobId, JobNameTable)
{
	"use strict";

	var WeaponJobTable = {};

	// Extend
	var keys = Object.keys(JobNameTable);
	var i, count = keys.length;

	for (i = 0; i < count; ++i) {
		WeaponJobTable[ keys[i] ] = JobNameTable[ keys[i] ];
	}

	function duplicateEntry(origin) {
		var value = JobNameTable[origin];
		var i, count = arguments.length;

		for (i = 1; i < count; ++i) {
			WeaponJobTable[arguments[i]] = value;
		}
	}

	// Rewrite inheritance
	duplicateEntry(JobId.NOVICE,     JobId.NOVICE_H,     JobId.NOVICE_B);
	duplicateEntry(JobId.SWORDMAN,   JobId.SWORDMAN_H,   JobId.SWORDMAN_B);
	duplicateEntry(JobId.MAGICIAN,   JobId.MAGICIAN_H,   JobId.MAGICIAN_B);
	duplicateEntry(JobId.ARCHER,     JobId.ARCHER_H,     JobId.ARCHER_B);
	duplicateEntry(JobId.ACOLYTE,    JobId.ACOLYTE_H,    JobId.ACOLYTE_B);
	duplicateEntry(JobId.MERCHANT,   JobId.MERCHANT_H,   JobId.MERCHANT_B);
	duplicateEntry(JobId.THIEF,      JobId.THIEF_H,      JobId.THIEF_B);

	duplicateEntry(JobId.KNIGHT,     JobId.KNIGHT_H,     JobId.KNIGHT_B,     JobId.RUNE_KNIGHT,      JobId.RUNE_KNIGHT_H,      JobId.RUNE_KNIGHT_B);
	duplicateEntry(JobId.KNIGHT2,    JobId.KNIGHT2_H,    JobId.KNIGHT2_B,    JobId.RUNE_KNIGHT2,     JobId.RUNE_KNIGHT2_H,     JobId.RUNE_KNIGHT2_B);
	duplicateEntry(JobId.PRIEST,     JobId.PRIEST_H,     JobId.PRIEST_B,     JobId.ARCHBISHOP,       JobId.ARCHBISHOP_H,       JobId.ARCHBISHOP_B);
	duplicateEntry(JobId.WIZARD,     JobId.WIZARD_H,     JobId.WIZARD_B,     JobId.WARLOCK,          JobId.WARLOCK_H,          JobId.WARLOCK_B);
	duplicateEntry(JobId.BLACKSMITH, JobId.BLACKSMITH_H, JobId.BLACKSMITH_B, JobId.MECHANIC,         JobId.MECHANIC_H,         JobId.MECHANIC_B);
	duplicateEntry(JobId.HUNTER,     JobId.HUNTER_H,     JobId.HUNTER_B,     JobId.RANGER,           JobId.RANGER_H,           JobId.RANGER_B);
	duplicateEntry(JobId.ASSASSIN,   JobId.ASSASSIN_H,   JobId.ASSASSIN_B,   JobId.GUILLOTINE_CROSS, JobId.GUILLOTINE_CROSS_H, JobId.GUILLOTINE_CROSS_B);
	duplicateEntry(JobId.CRUSADER,   JobId.CRUSADER_H,   JobId.CRUSADER_B,   JobId.ROYAL_GUARD,      JobId.ROYAL_GUARD_H,      JobId.ROYAL_GUARD_B);
	duplicateEntry(JobId.CRUSADER2,  JobId.CRUSADER2_H,  JobId.CRUSADER2_B,  JobId.ROYAL_GUARD2,     JobId.ROYAL_GUARD2_H,     JobId.ROYAL_GUARD2_B);
	duplicateEntry(JobId.MONK,       JobId.MONK_H,       JobId.MONK_B,       JobId.SURA,             JobId.SURA_H,             JobId.SURA_B);
	duplicateEntry(JobId.SAGE,       JobId.SAGE_H,       JobId.SAGE_B,       JobId.SORCERER,         JobId.SORCERER_H,         JobId.SORCERER_B);
	duplicateEntry(JobId.ROGUE,      JobId.ROGUE_H,      JobId.ROGUE_B,      JobId.SHADOW_CHASER,    JobId.SHADOW_CHASER_H,    JobId.SHADOW_CHASER_B);
	duplicateEntry(JobId.ALCHEMIST,  JobId.ALCHEMIST_H,  JobId.ALCHEMIST_B,  JobId.GENETIC,          JobId.GENETIC_H,          JobId.GENETIC_B);
	duplicateEntry(JobId.BARD,       JobId.BARD_H,       JobId.BARD_B,       JobId.MINSTREL,         JobId.MINSTREL_H,         JobId.MINSTREL_B);
	duplicateEntry(JobId.DANCER,     JobId.DANCER_H,     JobId.DANCER_B,     JobId.WANDERER,         JobId.WANDERER_H,         JobId.WANDERER_B);

	// Exports
	return WeaponJobTable;
});