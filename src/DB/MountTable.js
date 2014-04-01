/**
 * DB/MountTable.js
 *
 * Look at table to convert based job to its mount job
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function()
{
	'use strict';


	return {
		// Base
		7    : 13   , // knight
		14   : 21   , // cruzader

		// Baby
		4030 : 4036 , // baby knight
		4037 : 4044 , // baby crusader

		// Rebirth
		4008 : 4014 , // lord knight
		4015 : 4022 , // paladin

		// 3rd
		4054 : 4080 , // rune knight
		4060 : 4081 , // rune knight T
		4066 : 4082 , // royal guard
		4073 : 4083 , // royal guard T
		4056 : 4084 , // ranger
		4062 : 4085 , // ranger T
		4058 : 4086 , // mechanic
		4064 : 4087 , // mechanic 2

		// Baby 3rd
		4096 : 4109 , // Baby rune
		4102 : 4110 , // Baby guard
		4098 : 4111 , // Baby ranger
		4100 : 4112 , // Baby mechanic
	};
});