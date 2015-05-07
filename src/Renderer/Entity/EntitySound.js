/**
 * Renderer/EntityWalk.js
 *
 * Manage entity walking action
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define( ['Audio/SoundManager'], function( SoundManager )
{
	'use strict';


	/**
	 * @Constructor
	 */
	function Sound()
	{
		this._lastActionId    = -1;
		this._lastAnimationId = -1;
		this._lastFileName    = null;
		this._animCounter     = -1;

		this.attackFile       = null;
	}

	/**
	 * Play a sound attached to an entity
	 *
	 * @param {string} sound name
	 * @param {number} action id
	 * @param {number} animation id
	 */
	Sound.prototype.play = function play( fileName, action, animation )
	{
		// Pet does not produce sound
		if (this.entity.objecttype === this.entity.constructor.TYPE_PET) {
			return;
		}

		// Do not replay the sound if there is no updates
		if (this._lastActionId    === action &&
			this._lastAnimationId === animation &&
			this._lastFileName    === fileName) {
			return;
		}

		this._lastActionId    = action;
		this._lastAnimationId = animation;
		this._lastFileName    = fileName;

		// Find Audio filename
		if (fileName === 'atk') {
			if (!this.attackFile) {
				return;
			}

			fileName = this.attackFile;
		}

		SoundManager.play(fileName);
	};


	/**
	 * Reset action and animation
	 */
	Sound.prototype.free = function free()
	{
		this._lastActionId    = -1;
		this._lastAnimationId = -1;
		this._lastFileName    = null;
		this._animCounter     = -1;
	};


	/**
	 * Reset sound counter to allow repeating sounds
	 * 
	 * @param {number} animation index
	 * @param {number} animation size
	 */
	 Sound.prototype.freeOnAnimationEnd = function freeOnAnimationEnd (anim, size)
	 {
		if (anim < size) {
			return;
		}

		var count = Math.floor(anim / size);

		if (this._animCounter !== count) {
			this.free();
			this._animCounter = count;
		}
	 };


	/**
	 * Initialize and export methods
	 */
	return function init()
	{
		this.sound = new Sound();
		this.sound.entity = this;
	};
});