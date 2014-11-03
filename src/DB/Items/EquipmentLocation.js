/**
 * DB/Items/EquipmentLocation.js
 *
 * Location constant table
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function()
{
	"use strict";


	return {
		HEAD_BOTTOM: 1 << 0,
		WEAPON:      1 << 1,
		GARMENT:     1 << 2,
		ACCESSORY1:  1 << 3,
		ARMOR:       1 << 4,
		SHIELD:      1 << 5,
		SHOES:       1 << 6,
		ACCESSORY2:  1 << 7,
		HEAD_TOP:    1 << 8,
		HEAD_MID:    1 << 9,
		AMMO:        1 << 15
	};
});
