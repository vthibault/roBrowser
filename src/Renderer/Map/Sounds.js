/**
 * Renderer/Map/Sounds.js
 *
 * Play 3D sounds
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define( ['Utils/gl-matrix', 'Audio/SoundManager'],
function(        glMatrix,         SoundManager )
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
	function add( sound )
	{
		_list.push( sound );
	}


	/**
	 * Remove data from memory
	 */
	function free()
	{
		_list.length = 0;
	}


	/**
	 * Rendering sounds
	 *
	 * @param {vec3} position
	 */
	function render( position, tick )
	{
		var sound;
		var i, count = _list.length;

		for (i = 0; i < count; ++i) {
			sound = _list[i];

			// TODO: check for sound.height
			if (sound.tick < tick && vec3.dist(sound.pos, position) <= sound.range + sound.height) {
				SoundManager.play( sound.file, sound.vol );
				sound.tick = tick + sound.cycle * 1000;
			}
		}
	}


	/**
	 * Export
	 */
	return {
		add:    add,
		free:   free,
		render: render
	};
});