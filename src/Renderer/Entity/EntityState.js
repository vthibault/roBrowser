/**
 * Renderer/EntityState.js
 *
 * Manage Entity files (attachments) to load once a view change
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function( require )
{
	'use strict';


	/**
	 * Load dependencies
	 */
	var StatusConst = require('DB/StatusConst');
	var MountTable  = require('DB/MountTable');
	var Session     = require('Engine/SessionStorage');


	/**
	 * Status color
	 */
	var _bodyStateColor   = new Float32Array([1,1,1,1]);
	var _healthStateColor = new Float32Array([1,1,1,1]);
	var _effectStateColor = new Float32Array([1,1,1,1]);


	/**
	 * Calculate new color
	 */
	function recalculateBlendingColor()
	{
		this.effectColor[0] = this._bodyStateColor[0] * this._healthStateColor[0] * this._effectStateColor[0];
		this.effectColor[1] = this._bodyStateColor[1] * this._healthStateColor[1] * this._effectStateColor[1];
		this.effectColor[2] = this._bodyStateColor[2] * this._healthStateColor[2] * this._effectStateColor[2];
		this.effectColor[3] = this._bodyStateColor[3] * this._healthStateColor[3] * this._effectStateColor[3];
	}


	/**
	 * Change body effect
	 * (Stone, sleep, freeze)
	 *
	 * @param {number} new value
	 */
	function updateBodyState( value )
	{
		if (value === this._bodyState) {
			return;
		}

		// Reset value
		this._bodyStateColor[0] = 1.0;
		this._bodyStateColor[1] = 1.0;
		this._bodyStateColor[2] = 1.0;
		this._bodyStateColor[3] = 1.0;


		// Remove previous effect
		switch (this._bodyState) {
			case StatusConst.BodyState.SLEEP:
				// detach data\sprite\ÀÌÆÑÆ®\status-sleep
				break;

			case StatusConst.BodyState.FREEZE:
				// detach data\sprite\ÀÌÆÑÆ®\¾óÀ½¶¯
				break;

			case StatusConst.BodyState.STUN:
				// detach data\sprite\ÀÌÆÑÆ®\status-stun
				break;
		}

		// Add new effect
		switch (value) {
			case StatusConst.BodyState.STONE:
				this._bodyStateColor[0] = 0.1;
				this._bodyStateColor[1] = 0.1;
				this._bodyStateColor[2] = 0.1;
				break;

			case StatusConst.BodyState.STONEWAIT:
				this._bodyStateColor[0] = 0.3;
				this._bodyStateColor[1] = 0.3;
				this._bodyStateColor[2] = 0.3;
				break;

			case StatusConst.BodyState.SLEEP:
				// attach data\sprite\ÀÌÆÑÆ®\status-sleep
				break;


			case StatusConst.BodyState.FREEZE:
				this._bodyStateColor[0] = 0.0;
				this._bodyStateColor[1] = 0.4;
				this._bodyStateColor[2] = 0.8;
				// attach data\sprite\ÀÌÆÑÆ®\¾óÀ½¶¯
				break;

			case StatusConst.BodyState.STUN:
				// attach data\sprite\ÀÌÆÑÆ®\status-stun
				break;
		}

		this._bodyState = value;
		recalculateBlendingColor.call(this);
	}


	/**
	 * Modify entity status (freeze, poison)
	 *
	 * @param {number} new value
	 */
	function updateHealthState( value )
	{
		if (value === this._healthState) {
			return;
		}

		this._healthStateColor[0] = 1.0;
		this._healthStateColor[1] = 1.0;
		this._healthStateColor[2] = 1.0;
		this._healthStateColor[3] = 1.0;

		// Curse
		if (value & StatusConst.HealthState.CURSE) {

			// Do not attach multiple times.
			if (!(this._healthState & StatusConst.HealthState.CURSE)) {
				// attach data/sprite/ÀÌÆÑÆ®/status-curse
			}

			this._healthStateColor[0] *= 0.50;
			this._healthStateColor[1] *= 0.15;
			this._healthStateColor[2] *= 0.10;
		}
		else if (!(value & StatusConst.HealthState.CURSE)) {
			// detach data/sprite/ÀÌÆÑÆ®/status-curse
		}

		// Poison
		if (value & StatusConst.HealthState.POISON) {
			this._healthStateColor[0] *= 0.9;
			this._healthStateColor[1] *= 0.4;
			this._healthStateColor[2] *= 0.8;
		}

		this._healthState = value;
		recalculateBlendingColor.call(this);
	}


	/**
	 * Update entity effect (invisible, ...)
	 *
	 * @param {number} new value
	 */
	function updateEffectState( value )
	{
		var costume = 0;


		this._effectStateColor[0] = 1.0;
		this._effectStateColor[1] = 1.0;
		this._effectStateColor[2] = 1.0;
		this._effectStateColor[3] = 1.0;


		// ------------------------
		// Riding
		// ------------------------


		var RIDING = (
			StatusConst.EffectState.RIDING  |
			StatusConst.EffectState.DRAGON1 |
			StatusConst.EffectState.DRAGON2 |
			StatusConst.EffectState.DRAGON3 |
			StatusConst.EffectState.DRAGON4 |
			StatusConst.EffectState.DRAGON5 |
			StatusConst.EffectState.WUGRIDER|
			StatusConst.EffectState.MADOGEAR
		);

		if (value & RIDING) {
			if (this._job in MountTable) {
				costume = MountTable[this._job];
			}
		}


		// ------------------------
		// Costume
		// ------------------------


		// Wedding clones
		if (value & StatusConst.EffectState.WEDDING) {
			costume = 22;
		}

		// Xmas costume 
		if (value & StatusConst.EffectState.XMAS) {
			costume = 26;
		}

		// Summer
		if (value & StatusConst.EffectState.SUMMER) {
			costume = 27;
		}


		// ------------------------
		// Effects
		// ------------------------


		// Never show option invisible
		if (value & StatusConst.EffectState.INVISIBLE) {
			this._effectStateColor[3] = 0.0;
		}

		// Cloack / Hide
		else if (value & (StatusConst.EffectState.HIDE|StatusConst.EffectState.CLOAK|StatusConst.EffectState.CHASEWALK)) {
			// Maya purple card
			if (Session.intravision) {
				this._effectStateColor[0] = 0.0;
				this._effectStateColor[1] = 0.0;
				this._effectStateColor[2] = 0.0;
			}
			else {
				this._effectStateColor[3] = 0.0;
			}
		}


		// ------------------------
		// Apply
		// ------------------------


		if (costume !== this.costume) {
			this.costume = costume;
			this.job     = this._job;
		}


		this._effectState = value;
		recalculateBlendingColor.call(this);
	}


	/**
	 * Hooking, export
	 */
	return function Init()
	{
		this._bodyStateColor   = new Float32Array([1, 1, 1, 1]);
		this._healthStateColor = new Float32Array([1, 1, 1, 1]);
		this._effectStateColor = new Float32Array([1, 1, 1, 1]);
		this.effectColor       = new Float32Array([1, 1, 1, 1]);


		Object.defineProperty(this, 'bodyState', {
			get: function(){ return this._bodyState },
			set: updateBodyState
		});

		Object.defineProperty(this, 'healthState', {
			get: function(){ return this._healthState },
			set: updateHealthState
		});

		Object.defineProperty(this, 'effectState', {
			get: function(){ return this._effectState },
			set: updateEffectState
		});
	};
});