/**
 * DB/Jobs/MountTable.js
 *
 * Look up table <job> => <job mount>
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(['./JobConst'], function( JobId )
{
	'use strict';


	var MountTable = {};

	// MountTable[<Base job>]       = <Mount job>

	MountTable[JobId.KNIGHT]        = JobId.KNIGHT2;
	MountTable[JobId.CRUSADER]      = JobId.CRUSADER2;
	MountTable[JobId.KNIGHT_H]      = JobId.KNIGHT2_H;
	MountTable[JobId.CRUSADER_H]    = JobId.CRUSADER2_H;

	MountTable[JobId.KNIGHT_B]      = JobId.KNIGHT2_B;
	MountTable[JobId.CRUSADER_B]    = JobId.CRUSADER2_B;

	MountTable[JobId.RUNE_KNIGHT]   = JobId.RUNE_KNIGHT2;
	MountTable[JobId.RUNE_KNIGHT_H] = JobId.RUNE_KNIGHT2_H;
	MountTable[JobId.RUNE_KNIGHT_B] = JobId.RUNE_KNIGHT2_B;

	MountTable[JobId.ROYAL_GUARD]   = JobId.ROYAL_GUARD2;
	MountTable[JobId.ROYAL_GUARD_H] = JobId.ROYAL_GUARD2_H;
	MountTable[JobId.ROYAL_GUARD_B] = JobId.ROYAL_GUARD2_B;

	MountTable[JobId.RANGER]        = JobId.RANGER2;
	MountTable[JobId.RANGER_H]      = JobId.RANGER2_H;
	MountTable[JobId.RANGER_B]      = JobId.RANGER2_B;

	MountTable[JobId.MECHANIC]      = JobId.MECHANIC2;
	MountTable[JobId.MECHANIC_H]    = JobId.MECHANIC2_H;
	MountTable[JobId.MECHANIC_B]    = JobId.MECHANIC2_B;

	return MountTable;
});