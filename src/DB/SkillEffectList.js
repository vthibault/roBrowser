/**
 * DB/SkillEffectList.js
 *
 * List of skills with informations (in progress)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(['./EffectList'], function( EffectList )
{
	'use strict';

	return {
		6:   { effectId:  67 }, // provoke
		16:  { effectId:  23 }, // stone curse
		20:  { effectId:  29 }, // lightning bolt
		21:  { effectId:  30 }, // thunderstorm
		33:  { effectId:  41 }, // angelus
		35:  { effectId:  66 }, // cure.
		54:  { effectId:  77 }, // resurection
		67:  { effectId:  88 }, // suffragium
		68:  { effectId:  86 }, // aspersio
		73:  { effectId: 112 }, // kyrie elyson
		74:  { effectId:  76 }, // magnificat
		75:  { effectId:  75 }, // gloria
		76:  { effectId:  87 }, // lex divina
		78:  { effectId:  85 }, // lex aeterna
		79:  { effectId: 113 }, // magnus exorcimus
		85:  { effectId:  90 }, // lord of vermilion
		89:  { effectId:  89 }, // storm Gust
		110: { effectId: 102 }, // hammer fall
		112: { effectId: 103 }, // weapon perfection
		114: { effectId: 104 }, // maximize power
		131: { effectId: 111 }, // sprint trap
	};

});