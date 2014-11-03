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
	'use strict';


	/**
	 * Sound memory
	 */
	var _sounds = [];


	/**
	 * Re-usable sounds
	 */
	var _cache = [];


	/**
	 * @Constructor
	 */
	var SoundManager = {};


	/**
	 * @var {float} sound volume
	 *
	 */
	SoundManager.volume = Preferences.Sound.volume;


	/**
	 * Play a wav sound
	 *
	 * @param {string} filename
	 * @param {optional|number} vol (volume)
	 */
	SoundManager.play = function play( filename, vol ) {
		var volume;

		// Sound volume * Global volume
		if (vol) {
			volume = vol * this.volume;
		}
		else {
			volume = this.volume;
		}

		// Don't play sound if you can't hear it or sound is stopped
		if (volume <= 0 || !Preferences.Sound.play) {
			return;
		}

		// Re-usable sound
		var sound = getSoundFromCache(filename);
		if (sound) {
			sound.volume  = Math.min(volume,1.0);
			sound._volume = volume;
			sound.tick    = Date.now();
			sound.play();
			_sounds.push(sound);
			return;
		}

		// Get the sound from client.
		Client.loadFile( 'data/wav/' + filename, function( url ) {
			var i, count = _sounds.length;
			var sound, tick = Date.now();

			// Wait a delay to replay a sound
			for (i = 0; i < count; ++i) {
				if (_sounds[i].src === url && _sounds[i].tick > tick - 100) {
					return;
				}
			}

			// Initialiaze the sound and play it
			sound             = document.createElement('audio');
			sound.filename    = filename;
			sound.src         = url;
			sound.tick        = tick;
			sound.volume      = Math.min(volume,1.0);
			sound._volume     = volume;

			sound.addEventListener('ended', onSoundEnded, false);
			sound.play();

			// Add it to the list
			_sounds.push(sound);
		});
	};


	/**
	 * Stop a specify sound, or all sounds.
	 *
	 * @param {optional|string} filename to stop
	 */
	SoundManager.stop = function stop( filename )
	{
		var i, count, list;

		if (filename) {
			for (i = 0, count = _sounds.length; i < count; ++i) {
				if (_sounds[i].filename === filename) {
					_sounds[i].pause();
					_sounds.splice(i, 1);
					i--;
					count--;
				}
			}
			return;
		}

		// Remove from memory
		for (count = _sounds.length; count > 0; --count) {
			_sounds[0].pause();
			_sounds.splice(0, 1);
		}

		// Remove from cache
		list = Memory.search(/\.wav$/);
		for (i = 0, count = list.length; i < count; ++i) {
			Memory.remove( list[i] );
		}
	};


	/**
	 * Change volume of all sounds
	 *
	 * @param {number} volume
	 */
	SoundManager.setVolume = function setVolume( volume )
	{
		var i, count = _sounds.length;
		this.volume  = Math.min( volume, 1.0);

		Preferences.Sound.volume = this.volume;
		Preferences.save();

		for (i = 0; i < count; i++) {
			_sounds[i].volume = Math.min( _sounds[i]._volume * this.volume, 1.0);
		}
	};


	/**
	 * Move sound to cache.
	 * ff we have a request to play the same sound again, get it back
	 * Will avoid to re-create sound object at each request (re-usable object)
	 */
	function onSoundEnded()
	{
		var pos = _sounds.indexOf(this);

		if (pos !== -1) {
			_sounds.splice( pos, 1);
		}

		this.tick = Date.now();
		_cache.push(this);
	}


	/**
	 * Remove sound from cache and return it
	 * Check at the same time to remove sound not used since some times.
	 *
	 * @param {string} filename
	 * @param {Audio} sound element
	 */
	function getSoundFromCache(filename)
	{
		var i, tick = Date.now(), count = _cache.length;
		var out = null;

		for (i = 0; i < count; i++) {
			if (!out && _cache[i].filename === filename) {
				out      = _cache[i];
				out.tick = tick;
				_cache.splice(i, 1);
				i--;
				count--;
				continue;
			}

			// remove
			if (_cache[i].tick + 60000 < tick) {
				_cache.splice(i, 1);
				i--;
				count--;
				continue;
			}
		}

		return out;
	}


	/**
	 * Export
	 */
	return SoundManager;

});