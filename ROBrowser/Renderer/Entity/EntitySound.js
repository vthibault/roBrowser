/**
 * Renderer/EntityWalk.js
 *
 * Manage entity walking action
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define( ['Audio/SoundManager', 'Renderer/Renderer'], function( SoundManager, Renderer )
{
	"use strict";


	/**
	 * Sound Class
	 */
	function Sound( name, timeEnd )
	{
		this.timeEnd = timeEnd;
		this.name    = name;
	}


	// Play a sound
	function SoundPlay( name, delay )
	{
		var i = 0, count = this.sounds.length;
		var now  = Renderer.tick;
		var play = true;
		var wavFileName = "";

		while( i < count ) {
			if( this.sounds[i].timeEnd < now ) {
				this.sounds.splice( i, 1 );
				count--;
				continue;
			}

			// Don't play the sound, have a delay to wait
			if( this.sounds[i].name === name ) {
				play = false;
			}

			i++;
		}

		// Don't play sound
		if( play === false ) {
			return;
		}

		// Find Audio filename
		if( name === "atk" ) {
			if( this.weapon_sound ) {
				Sound.play( this.weapon_sound );
			}
		}
		else {
			wavFileName = name;	
		}

		// Play the sound
		if( wavFileName !== "" ) {
			this.sounds.push(new Sound( wavFileName, now + delay ));
			SoundManager.play( wavFileName );
		}
	};


	/**
	 * Initialize and export methods
	 */
	return function Init()
	{
		this.sounds = [];
		this.soundPlay = SoundPlay;
	}
});