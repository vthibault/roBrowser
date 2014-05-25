/**
 * DB/Jobs/JobNameTable.js
 *
 * Look up: job id -> ressource name
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(['./JobConst'], function( JobId )
{
	"use strict";


	var JobNameTable = {};

	JobNameTable[JobId.NOVICE]           = "\xC3\xCA\xBA\xB8\xC0\xDA";

	JobNameTable[JobId.SWORDMAN]         = "\xB0\xCB\xBB\xE7";
	JobNameTable[JobId.MAGICIAN]         = "\xB8\xB6\xB9\xFD\xBB\xE7";
	JobNameTable[JobId.ARCHER]           = "\xB1\xC3\xBC\xF6";
	JobNameTable[JobId.ACOLYTE]          = "\xBC\xBA\xC1\xF7\xC0\xDA";
	JobNameTable[JobId.MERCHANT]         = "\xBB\xF3\xC0\xCE";
	JobNameTable[JobId.THIEF]            = "\xB5\xB5\xB5\xCF";

	JobNameTable[JobId.KNIGHT]           = "\xB1\xE2\xBB\xE7"
	JobNameTable[JobId.PRIEST]           = "\xC7\xC1\xB8\xAE\xBD\xBA\xC6\xAE";
	JobNameTable[JobId.WIZARD]           = "\xC0\xA7\xC0\xFA\xB5\xE5";
	JobNameTable[JobId.BLACKSMITH]       = "\xC1\xA6\xC3\xB6\xB0\xF8";
	JobNameTable[JobId.HUNTER]           = "\xC7\xE5\xC5\xCD";
	JobNameTable[JobId.ASSASSIN]         = "\xBE\xEE\xBC\xBC\xBD\xC5";
	JobNameTable[JobId.KNIGHT2]          = "\xC6\xE4\xC4\xDA\xC6\xE4\xC4\xDA_\xB1\xE2\xBB\xE7";

	JobNameTable[JobId.CRUSADER]         = "\xC5\xA9\xB7\xE7\xBC\xBC\xC0\xCC\xB4\xF5";
	JobNameTable[JobId.MONK]             = "\xB8\xF9\xC5\xA9";
	JobNameTable[JobId.SAGE]             = "\xBC\xBC\xC0\xCC\xC1\xF6";
	JobNameTable[JobId.ROGUE]            = "\xB7\xCE\xB1\xD7";
	JobNameTable[JobId.ALCHEMIST]        = "\xBF\xAC\xB1\xDD\xBC\xFA\xBB\xE7";
	JobNameTable[JobId.BARD]             = "\xB9\xD9\xB5\xE5";
	JobNameTable[JobId.DANCER]           = "\xB9\xAB\xC8\xF1";
	JobNameTable[JobId.CRUSADER2]        = "\xBD\xC5\xC6\xE4\xC4\xDA\xC5\xA9\xB7\xE7\xBC\xBC\xC0\xCC\xB4\xF5";

	JobNameTable[JobId.SUPERNOVICE]      = "\xBD\xB4\xC6\xDB\xB3\xEB\xBA\xF1\xBD\xBA";
	JobNameTable[JobId.GUNSLINGER]       = "\xB0\xC7\xB3\xCA";
	JobNameTable[JobId.NINJA]            = "\xB4\xD1\xC0\xDA";
	JobNameTable[JobId.TAEKWON]          = "±Ç¼º";
	JobNameTable[JobId.STAR]             = "ÅÂ±Ç¼Ò³â";
	JobNameTable[JobId.STAR2]            = "±Ç¼ºÀ¶ÇÕ";
	JobNameTable[JobId.LINKER]           = "¼Ò¿ï¸µÄ¿",

	JobNameTable[JobId.MARRIED]          = "\xB0\xE1\xC8\xA5";
	JobNameTable[JobId.XMAS]             = "\xBB\xEA\xC5\xB8";
	JobNameTable[JobId.SUMMER]           = "\xBF\xA9\xB8\xA7";

	JobNameTable[JobId.KNIGHT_H]         = "\xB7\xCE\xB5\xE5\xB3\xAA\xC0\xCC\xC6\xAE";
	JobNameTable[JobId.PRIEST_H]         = "\xC7\xCF\xC0\xCC\xC7\xC1\xB8\xAE";
	JobNameTable[JobId.WIZARD_H]         = "\xC7\xCF\xC0\xCC\xC0\xA7\xC0\xFA\xB5\xE5";
	JobNameTable[JobId.BLACKSMITH_H]     = "\xC8\xAD\xC0\xCC\xC6\xAE\xBD\xBA\xB9\xCC\xBD\xBA";
	JobNameTable[JobId.HUNTER_H]         = "\xBD\xBA\xB3\xAA\xC0\xCC\xC6\xDB";
	JobNameTable[JobId.ASSASSIN_H]       = "\xBE\xEE\xBD\xD8\xBD\xC5\xC5\xA9\xB7\xCE\xBD\xBA";
	JobNameTable[JobId.KNIGHT2_H]        = "\xB7\xCE\xB5\xE5\xC6\xE4\xC4\xDA";
	JobNameTable[JobId.CRUSADER_H]       = "\xC6\xC8\xB6\xF3\xB5\xF2";
	JobNameTable[JobId.MONK_H]           = "\xC3\xA8\xC7\xC7\xBF\xC2";
	JobNameTable[JobId.SAGE_H]           = "\xC7\xC1\xB7\xCE\xC6\xE4\xBC\xAD";
	JobNameTable[JobId.ROGUE_H]          = "\xBD\xBA\xC5\xE4\xC4\xBF";
	JobNameTable[JobId.ALCHEMIST_H]      = "\xC5\xA9\xB8\xAE\xBF\xA1\xC0\xCC\xC5\xCD";
	JobNameTable[JobId.BARD_H]           = "\xC5\xAC\xB6\xF3\xBF\xEE";
	JobNameTable[JobId.DANCER_H]         = "\xC1\xFD\xBD\xC3";

	JobNameTable[JobId.RUNE_KNIGHT]      = "\xB7\xE9\xB3\xAA\xC0\xCC\xC6\xAE";
	JobNameTable[JobId.WARLOCK]          = "\xBF\xF6\xB7\xCF";
	JobNameTable[JobId.RANGER]           = "\xB7\xB9\xC0\xCE\xC1\xAE";
	JobNameTable[JobId.ARCHBISHOP]       = "\xBE\xC6\xC5\xA9\xBA\xF1\xBC\xF3";
	JobNameTable[JobId.MECHANIC]         = "\xB9\xCC\xC4\xC9\xB4\xD0";
	JobNameTable[JobId.GUILLOTINE_CROSS] = "\xB1\xE6\xB7\xCE\xC6\xBE\xC5\xA9\xB7\xCE\xBD\xBA";

	JobNameTable[JobId.ROYAL_GUARD]      = "\xB0\xA1\xB5\xE5";
	JobNameTable[JobId.SORCERER]         = "\xBC\xD2\xBC\xAD\xB7\xAF";
	JobNameTable[JobId.MINSTREL]         = "\xB9\xCE\xBD\xBA\xC6\xAE\xB7\xB2";
	JobNameTable[JobId.WANDERER]         = "\xBF\xF8\xB4\xF5\xB7\xAF";
	JobNameTable[JobId.SURA]             = "\xBD\xB4\xB6\xF3";
	JobNameTable[JobId.GENETIC]          = "\xC1\xA6\xB3\xD7\xB8\xAF";
	JobNameTable[JobId.SHADOW_CHASER]    = "\xBD\xA6\xB5\xB5\xBF\xEC\xC3\xBC\xC0\xCC\xBC\xAD";


	JobNameTable[JobId.RUNE_KNIGHT2]     = "\xB7\xE9\xB3\xAA\xC0\xCC\xC6\xAE\xBB\xDA\xB6\xEC";
	JobNameTable[JobId.ROYAL_GUARD2]     = "\xB1\xD7\xB8\xAE\xC6\xF9\xB0\xA1\xB5\xE5";
	JobNameTable[JobId.WOLF_RANGER]      = "\xB7\xB9\xC0\xCE\xC1\xAE\xB4\xC1\xB4\xEB";
	JobNameTable[JobId.MECHANIC2]        = "\xB8\xB6\xB5\xB5\xB1\xE2\xBE\xEE";

	//SUPERNOVICE2 : 4190,
	//SUPERNOVICE2_B : 4191,
	//KAGEROU : 4211,
	//OBORO : 4212,

	return JobNameTable;
});