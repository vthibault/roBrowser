/**
 * Audio/SoundManager.js
 *
 * Sound Manager
 *
 * Manage sounds effects
 * All browsers seems to support .wav file (with HTML5), so don't need a flash callback here
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['Core/Client', 'Preferences/Audio', 'Core/MemoryManager'],
function(      Client,          Preferences,              Memory )
{
	"use strict";


	/**
	 * Sound memory
	 */
	var _sounds = [];


	/**
	 * Play a wav sound
	 *
	 * @param {string} filename
	 * @param {number} vol (volume)
	 */
	function Play( filename, vol ) {
		var volume;

		// Sound volume * Global volume
		if ( vol ) {
			volume = vol * this.volume;
		}
		else {
			volume = this.volume;
		}

		// Don't play sound if you can't hear it or sound is stopped
		if ( volume <= 0 || !Preferences.Sound.play ) {
			return;
		}

		// Get the sound from client.
		Client.loadFile( "data/wav/" + filename, function( url ) {
			var sound = document.createElement('audio');

			// Initialiaze the sound and play it
			sound.src         = url;
			sound.volume      = Math.min(volume,1.0);
			sound._volume     = volume;
			sound.play();

			// Once the sound finish, remove it from memory
			sound.addEventListener('ended', function Remove(){
				var pos = _sounds.indexOf(this);
				if( pos !== -1 ) {
					_sounds.splice( pos, 1 );
				}
			}, false);

			// Add it to the list
			_sounds.push(sound);
		});
	}


	/**
	 * Stop all sound and clean data from memory
	 */
	function Stop()
	{
		var i, count, list;

		// Remove from memory
		for( i=0, count=_sounds.length; i<count; ++i ) {
			_sounds[0].pause();
			_sounds.splice(0, 1);
		}

		// Remove from cache
		list = Memory.search(/\.wav$/);
		for( i=0, count=list.length; i<count; ++i ) {
			Memory.remove( list[i] );
		}
	}


	/**
	 * Change volume of all sounds
	 *
	 * @param {number} volume
	 */
	function setVolume( volume )
	{
		var i, count = _sounds.length;
		this.volume  = Math.min( volume, 1.0);

		Preferences.Sound.volume = this.volume;
		Preferences.save();

		for( i=0; i<count; i++ ) {
			_sounds[i].volume = Math.min( _sounds[i]._volume * this.volume, 1.0);
		}
	}


	/**
	 * Export
	 */
	return {
		volume:    Preferences.Sound.volume,
		play:      Play,
		stop:      Stop,
		setVolume: setVolume
	};

});