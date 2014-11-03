/**
 * Renderer/Map/Effects.js
 *
 * Display 3D effects
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define( ['Utils/gl-matrix', 'Renderer/EffectManager'],
function(        glMatrix,            EffectManager)
{
	'use strict';


	/**
	 * Sound renderer namespace
	 */
	var vec3   = glMatrix.vec3;
	var _list  = [];


	/**
	 * Add 3D sound to the list
	 */
	function add( effect )
	{
		_list.push( effect );
	}


	/**
	 * Remove data from memory
	 */
	function free()
	{
		_list.length = 0;
	}


	/**
	 * Add effects to scene
	 *
	 * @param {vec3} position
	 */
	function spam( position, tick )
	{
		var effect;
		var i, count = _list.length;

		for (i = 0; i < count; ++i) {
			effect = _list[i];

			// distance need to be less than 25 cells (seems like it's
			// how the official client handle it).
			if (effect.tick < tick && vec3.dist(effect.pos, position) < 25) {
				EffectManager.spam( effect.id, -1, effect.pos);
				effect.tick = tick + effect.delay;
			}
		}
	}


	/**
	 * Export
	 */
	return {
		add:    add,
		free:   free,
		spam:   spam
	};
});