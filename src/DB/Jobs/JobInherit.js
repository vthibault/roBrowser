/**
 * DB/Jobs/JobInherit.js
 *
 * Job inherit system
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(['./JobConst'], function( JobId )
{
	"use strict";

	var JobInherit = {};

	JobInherit[JobId.SWORDMAN]           = JobId.NOVICE;
	JobInherit[JobId.MAGICIAN]           = JobId.NOVICE;
	JobInherit[JobId.ARCHER]             = JobId.NOVICE;
	JobInherit[JobId.ACOLYTE]            = JobId.NOVICE;
	JobInherit[JobId.MERCHANT]           = JobId.NOVICE;
	JobInherit[JobId.THIEF]              = JobId.NOVICE;

	JobInherit[JobId.SUPERNOVICE]        = JobId.NOVICE;
	JobInherit[JobId.GUNSLINGER]         = JobId.NOVICE;
	JobInherit[JobId.NINJA]              = JobId.NOVICE;

	JobInherit[JobId.TAEKWON]            = JobId.NOVICE;
	JobInherit[JobId.STAR]               = JobId.TAEKWON;
	JobInherit[JobId.STAR2]              = JobId.STAR;
	JobInherit[JobId.LINKER]             = JobId.TAEKWON;

	JobInherit[JobId.KNIGHT]             = JobId.SWORDMAN;
	JobInherit[JobId.PRIEST]             = JobId.ACOLYTE;
	JobInherit[JobId.WIZARD]             = JobId.MAGICIAN;
	JobInherit[JobId.BLACKSMITH]         = JobId.MERCHANT;
	JobInherit[JobId.HUNTER]             = JobId.ARCHER;
	JobInherit[JobId.ASSASSIN]           = JobId.THIEF;
	JobInherit[JobId.KNIGHT2]            = JobId.KNIGHT;

	JobInherit[JobId.CRUSADER]           = JobId.SWORDMAN;
	JobInherit[JobId.MONK]               = JobId.ACOLYTE;
	JobInherit[JobId.SAGE]               = JobId.MAGICIAN;
	JobInherit[JobId.ROGUE]              = JobId.THIEF;
	JobInherit[JobId.ALCHEMIST]          = JobId.MERCHANT;
	JobInherit[JobId.BARD]               = JobId.ARCHER;
	JobInherit[JobId.DANCER]             = JobId.ARCHER;
	JobInherit[JobId.CRUSADER2]          = JobId.CRUSADER;

	JobInherit[JobId.NOVICE_H]           = JobId.NOVICE;
	JobInherit[JobId.SWORDMAN_H]         = JobId.SWORDMAN;
	JobInherit[JobId.MAGICIAN_H]         = JobId.MAGICIAN;
	JobInherit[JobId.ARCHER_H]           = JobId.ARCHER;
	JobInherit[JobId.ACOLYTE_H]          = JobId.ACOLYTE;
	JobInherit[JobId.MERCHANT_H]         = JobId.MERCHANT;
	JobInherit[JobId.THIEF_H]            = JobId.THIEF;
	JobInherit[JobId.KNIGHT_H]           = JobId.KNIGHT;
	JobInherit[JobId.KNIGHT1_H]          = JobId.KNIGHT2;
	JobInherit[JobId.PRIEST_H]           = JobId.PRIEST;
	JobInherit[JobId.WIZARD_H]           = JobId.WIZARD;
	JobInherit[JobId.BLACKSMITH_H]       = JobId.BLACKSMITH;
	JobInherit[JobId.HUNTER_H]           = JobId.HUNTER;
	JobInherit[JobId.ASSASSIN_H]         = JobId.ASSASSIN;
	JobInherit[JobId.CRUSADER_H]         = JobId.CRUSADER;
	JobInherit[JobId.CRUSADER2_H]        = JobId.CRUSADER2;
	JobInherit[JobId.MONK_H]             = JobId.MONK;
	JobInherit[JobId.SAGE_H]             = JobId.SAGE;
	JobInherit[JobId.ROGUE_H]            = JobId.ROGUE;
	JobInherit[JobId.ALCHEMIST_H]        = JobId.ALCHEMIST;
	JobInherit[JobId.BARD_H]             = JobId.BARD;
	JobInherit[JobId.DANCER_H]           = JobId.DANCER;

	JobInherit[JobId.NOVICE_B]           = JobId.NOVICE;
	JobInherit[JobId.SWORDMAN_B]         = JobId.SWORDMAN;
	JobInherit[JobId.MAGICIAN_B]         = JobId.MAGICIAN;
	JobInherit[JobId.ARCHER_B]           = JobId.ARCHER;	
	JobInherit[JobId.ACOLYTE_B]          = JobId.ACOLYTE;
	JobInherit[JobId.MERCHANT_B]         = JobId.MERCHANT;
	JobInherit[JobId.THIEF_B]            = JobId.THIEF;
	JobInherit[JobId.KNIGHT_B]           = JobId.KNIGHT;
	JobInherit[JobId.KNIGHT2_B]          = JobId.KNIGHT2;
	JobInherit[JobId.PRIEST_B]           = JobId.PRIEST;
	JobInherit[JobId.WIZARD_B]           = JobId.WIZARD;
	JobInherit[JobId.BLACKSMITH_B]       = JobId.BLACKSMITH;
	JobInherit[JobId.HUNTER_B]           = JobId.HUNTER;
	JobInherit[JobId.ASSASSIN_B]         = JobId.ASSASSIN;
	JobInherit[JobId.CRUSADER_B]         = JobId.CRUSADER;
	JobInherit[JobId.CRUSADER2_B]        = JobId.CRUSADER2;
	JobInherit[JobId.MONK_B]             = JobId.MONK;
	JobInherit[JobId.SAGE_B]             = JobId.SAGE;
	JobInherit[JobId.ROGUE_B]            = JobId.ROGUE;
	JobInherit[JobId.ALCHEMIST_B]        = JobId.ALCHEMIST;
	JobInherit[JobId.BARD_B]             = JobId.BARD;
	JobInherit[JobId.DANCER_B]           = JobId.DANCER;
	JobInherit[JobId.SUPERNOVICE_B]      = JobId.SUPERNOVICE;

	JobInherit[JobId.RUNE_KNIGHT]        = JobId.KNIGHT;
	JobInherit[JobId.WARLOCK]            = JobId.WIZARD;
	JobInherit[JobId.RANGER]             = JobId.HUNTER;
	JobInherit[JobId.ARCHBISHOP]         = JobId.PRIEST;
	JobInherit[JobId.MECHANIC]           = JobId.BLACKSMITH;
	JobInherit[JobId.GUILLOTINE_CROSS]   = JobId.ASSASSIN;
	JobInherit[JobId.RUNE_KNIGHT2]       = JobId.KNIGHT2;

	JobInherit[JobId.RUNE_KNIGHT_H]      = JobId.KNIGHT_H;
	JobInherit[JobId.WARLOCK_H]          = JobId.WIZARD_H;
	JobInherit[JobId.RANGER_H]           = JobId.HUNTER_H;
	JobInherit[JobId.ARCHBISHOP_H]       = JobId.PRIEST_H;
	JobInherit[JobId.MECHANIC_H]         = JobId.BLACKSMITH_H;
	JobInherit[JobId.GUILLOTINE_CROSS_H] = JobId.ASSASSIN_H;
	JobInherit[JobId.RUNE_KNIGHT2_H]     = JobId.KNIGHT2_H;

	JobInherit[JobId.ROYAL_GUARD]        = JobId.CRUSADER;
	JobInherit[JobId.SORCERER]           = JobId.SAGE;
	JobInherit[JobId.MINSTREL]           = JobId.BARD;
	JobInherit[JobId.WANDERER]           = JobId.DANCER;
	JobInherit[JobId.SURA]               = JobId.MONK;
	JobInherit[JobId.GENETIC]            = JobId.ALCHEMIST;	
	JobInherit[JobId.SHADOW_CHASER]      = JobId.ROGUE;
	JobInherit[JobId.ROYAL2_GUARD]       = JobId.CRUSADER2;

	JobInherit[JobId.ROYAL_GUARD_H]      = JobId.CRUSADER_H;
	JobInherit[JobId.SORCERER_H]         = JobId.SAGE_H;
	JobInherit[JobId.MINSTREL_H]         = JobId.BARD_H;
	JobInherit[JobId.WANDERER_H]         = JobId.DANCER_H;
	JobInherit[JobId.SURA_H]             = JobId.MONK_H;
	JobInherit[JobId.GENETIC_H]          = JobId.ALCHEMIST_H;
	JobInherit[JobId.SHADOW_CHASER_H]    = JobId.ROGUE_H;
	JobInherit[JobId.ROYAL_GUARD2_H]     = JobId.CRUSADER2_H;

	JobInherit[JobId.RUNE_KNIGHT_B]      = JobId.RUNE_KNIGHT;
	JobInherit[JobId.WARLOCK_B]          = JobId.WARLOCK;
	JobInherit[JobId.RANGER_B]           = JobId.RANGER;
	JobInherit[JobId.ARCHBISHOP_B]       = JobId.ARCHBISHOP;
	JobInherit[JobId.MECHANIC_B]         = JobId.MECHANIC;
	JobInherit[JobId.GUILLOTINE_CROSS_B] = JobId.GUILLOTINE_CROSS;
	JobInherit[JobId.RUNE_KNIGHT2_B]     = JobId.RUNE_KNIGHT2;

	JobInherit[JobId.ROYAL_GUARD_B]      = JobId.ROYAL_GUARD;
	JobInherit[JobId.SORCERER_B]         = JobId.SORCERER;
	JobInherit[JobId.MINSTREL_B]         = JobId.MINSTREL;
	JobInherit[JobId.WANDERER_B]         = JobId.WANDERER;
	JobInherit[JobId.SURA_B]             = JobId.SURA;
	JobInherit[JobId.GENETIC_B]          = JobId.GENETIC;
	JobInherit[JobId.SHADOW_CHASER_B]    = JobId.SHADOW_CHASER;
	JobInherit[JobId.ROYAL_GUARD2_B]     = JobId.ROYAL_GUARD2;

	JobInherit[JobId.SUPERNOVICE2]       = JobId.SUPERNOVICE;
	JobInherit[JobId.SUPERNOVICE2_B]     = JobId.SUPERNOVICE2;
	JobInherit[JobId.KAGEROU]            = JobId.NINJA;
	JobInherit[JobId.OBORO]              = JobId.NINJA;

	return JobInherit;
});