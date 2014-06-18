/**
 * Renderer/EntityAction.js
 *
 * Manage entity action
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(['Renderer/Renderer', 'DB/DBManager'], function( Renderer, DB )
{
	'use strict';


	/**
	 * Action frames
	 */
	function Action()
	{
		this.IDLE       =  0;
		this.ATTACK     = -2;

		this.WALK       = -1;
		this.SIT        = -1;
		this.PICKUP     = -1;
		this.READYFIGHT = -1;
		this.FREEZE     = -1;
		this.HURT       = -1;
		this.DIE        = -1;
		this.FREEZE2    = -1;
		this.ATTACK1    = -1;
		this.ATTACK2    = -1;
		this.ATTACK3    = -1;
		this.SKILL      = -1;
		this.ACTION     = -1;

		this.SPECIAL    = -1;
		this.PERF1      = -1;
		this.PERF2      = -1;
		this.PERF3      = -1;
	}


	/**
	 * Animation object
	 */
	function Animation()
	{
		this.tick    = 0;
		this.frame   = 0;
		this.repeat  = true;
		this.play    = true;
		this.next    = false;
		this.delay   = 0;
		this.save    = false;
	}


	/**
	 * Modify action, reinitialize animation
	 *
	 * @param {object} option
	 */
	function setAction( option )
	{
		var anim = this.animation;

		if (option.delay) {
			anim.delay   = option.delay + 0;
			option.delay = 0;
			anim.save    = option;
		}
		else {

			// Know attack frame based on weapon type
			if (option.action === this.ACTION.ATTACK) {
				if (this.objecttype === this.constructor.TYPE_PC) {
					var attack    = DB.getWeaponAction( this.weapon, this._job, this._sex );
					option.action = [ this.ACTION.ATTACK1, this.ACTION.ATTACK2, this.ACTION.ATTACK3 ][attack];
				}

				// No action loaded yet
				if (option.action === -2) {
					option.action = this.ACTION.ATTACK1;
				}
			}

			this.action = option.action === -1 || typeof option.action === 'undefined' ? this.ACTION.IDLE : option.action;
			anim.tick   = Renderer.tick + 0;
			anim.delay  = 0;
			anim.frame  = option.frame  || 0;
			anim.repeat = option.repeat || false;
			anim.play   = typeof option.play !== 'undefined' ? option.play : true;
			anim.next   = option.next   || false;
			anim.save   = false;

			// Reset sounds
			this.sound.free();
		}
	}


	/**
	 * Initialize Entity action
	 */
	return function Init()
	{
		this.ACTION    = new Action();
		this.animation = new Animation();
		this.setAction = setAction;
		var Entity     = this.constructor;

		switch (this.objecttype) {

			// Define action, base on type
			case Entity.TYPE_PC:
				this.ACTION.IDLE       = 0;
				this.ACTION.WALK       = 1;
				this.ACTION.SIT        = 2;
				this.ACTION.PICKUP     = 3;
				this.ACTION.READYFIGHT = 4;
				this.ACTION.ATTACK1    = 5;
				this.ACTION.HURT       = 6;
				this.ACTION.FREEZE     = 7;
				this.ACTION.DIE        = 8;
				this.ACTION.FREEZE2    = 9;
				this.ACTION.ATTACK2    = 10;
				this.ACTION.ATTACK3    = 11;
				this.ACTION.SKILL      = 12;
				break;

			// Mob action
			case Entity.TYPE_MOB:
				this.ACTION.IDLE   = 0;
				this.ACTION.WALK   = 1;
				this.ACTION.ATTACK = 2;
				this.ACTION.HURT   = 3;
				this.ACTION.DIE    = 4;
				break;

			case Entity.TYPE_PET:
				this.ACTION.IDLE     = 0;
				this.ACTION.WALK     = 1;
				this.ACTION.ATTACK   = 2;
				this.ACTION.HURT     = 3;
				this.ACTION.DIE      = 4;
				this.ACTION.SPECIAL  = 5;
				this.ACTION.PERF1    = 6;
				this.ACTION.PERF2    = 7;
				this.ACTION.PERF3    = 8;
				break;

			// NPC action
			case Entity.TYPE_NPC:
				this.ACTION.IDLE   = 0;
				// For those NPC that move with unitwalk scriptcommand
				this.ACTION.WALK   = 1;
				break;

			// When you see a warp with /effect, it's 3 times bigger.
			// TODO: put it somewhere else
			case Entity.TYPE_WARP:
				this.xSize       = 20;
				this.ySize       = 20;
				break;

			// Homunculus
			case Entity.TYPE_HOM:
				this.ACTION.IDLE    = 0;
				this.ACTION.WALK    = 1;
				this.ACTION.ATTACK  = 2;
				this.ACTION.HURT    = 3;
				this.ACTION.DIE     = 4;
				this.ACTION.ATTACK2 = 5;
				this.ACTION.ATTACK3 = 6;
				this.ACTION.ACTION  = 7;
				break;

			//TODO: define others Entities ACTION
			case Entity.TYPE_ELEM:
				break;
		}
	};
});