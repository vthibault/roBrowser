/**
 * Renderer/Entity.js
 *
 * Entity class
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define( function( require )
{
	'use strict';


	/**
	 * Import
	 */
	var Renderer = require('Renderer/Renderer');
	var Altitude = require('Renderer/Map/Altitude');
	var Session  = require('Engine/SessionStorage');
	var Client   = require('Core/Client');
	var glMatrix = require('Utils/gl-matrix');
	var vec3     = glMatrix.vec3;
	var mat4     = glMatrix.mat4;


	/**
	 * @constructor Entity
	 * @param {object} data - entity data to bind with
	 */
	function Entity( data )
	{
		// Extend Entity
		require('Controls/EntityControl').call(this);
		require('./EntityAction').call(this);
		require('./EntityCast').call(this);
		require('./EntityLife').call(this);
		require('./EntityDisplay').call(this);
		require('./EntityDialog').call(this);
		require('./EntitySound').call(this);
		require('./EntityView').call(this);
		require('./EntityWalk').call(this);
		require('./EntityRender').call(this);
		require('./EntityRoom').call(this);
		require('./EntityState').call(this);
		require('./EntityAttachments').call(this);
		require('./EntityAnimations').call(this);

		this.boundingRect = { x1:0, y1:0, x2:0, y2:0 };
		this.matrix       = mat4.create();
		this.position     = vec3.create();

		// Bind data
		if (data) {
			this.clean();
			this.set( data );
		}
	}


	/**
	 * Constantes
	 */
	Entity.TYPE_EFFECT    = -3;
	Entity.TYPE_UNKNOWN   = -2;
	Entity.TYPE_WARP      = -1;
	Entity.TYPE_PC        =  0;
	Entity.TYPE_DISGUISED =  1;
	Entity.TYPE_MOB       =  5;
	Entity.TYPE_NPC       =  6;
	Entity.TYPE_PET       =  7;
	Entity.TYPE_HOM       =  8;
	Entity.TYPE_MERC      =  9;
	Entity.TYPE_ELEM      = 10;
	Entity.TYPE_ITEM      = 11;


	/**
	 * Priority in picking
	 */
	Entity.PickingPriority = {};
	Entity.PickingPriority[Entity.TYPE_MOB]       =  3;
	Entity.PickingPriority[Entity.TYPE_ITEM]      =  2;
	Entity.PickingPriority[Entity.TYPE_NPC]       =  1;
	Entity.PickingPriority[Entity.TYPE_UNKNOWN]   =  0;
	Entity.PickingPriority[Entity.TYPE_WARP]      =  0;
	Entity.PickingPriority[Entity.TYPE_PC]        =  0;
	Entity.PickingPriority[Entity.TYPE_DISGUISED] =  0;
	Entity.PickingPriority[Entity.TYPE_PET]       =  0;
	Entity.PickingPriority[Entity.TYPE_HOM]       =  0;
	Entity.PickingPriority[Entity.TYPE_MERC]      =  0;
	Entity.PickingPriority[Entity.TYPE_ELEM]      =  0;
	Entity.PickingPriority[Entity.TYPE_EFFECT]    = -1;


	/**
	 * Public methods
	 */
	Entity.prototype.objecttype   = Entity.TYPE_UNKNOWN;
	Entity.prototype.GID          = 0;
	Entity.prototype._bodyState   = 0;
	Entity.prototype._healthState = 0;
	Entity.prototype._effectState = 0;
	Entity.prototype._sex         = -1;
	Entity.prototype._job         = -1;
	Entity.prototype._bodypalette = 0;
	Entity.prototype._head        = -1;
	Entity.prototype._headpalette = 0;
	Entity.prototype._weapon      = -1;
	Entity.prototype._shield      = -1;
	Entity.prototype._accessory   = -1;
	Entity.prototype._accessory2  = -1;
	Entity.prototype._accessory3  = -1;
	Entity.prototype.GUID         = 0;
	Entity.prototype.GEmblemVer   = 0;
	Entity.prototype.honor        = 0;
	Entity.prototype.virtue       = 0;
	Entity.prototype.isPKModeON   = 0;
	Entity.prototype.xSize        = 5;
	Entity.prototype.ySize        = 5;
	Entity.prototype.state        = 0;
	Entity.prototype.clevel       = 0;
	Entity.prototype.action       = 0;
	Entity.prototype.costume      = 0;

	Entity.prototype.matrix       = null;
	Entity.prototype.depth        = 0;
	Entity.prototype.headDir      = 0;
	Entity.prototype.direction    = 0;
	Entity.prototype.position     = null;

	Entity.prototype.attack_range = 0;
	Entity.prototype.attack_speed = 300;

	Entity.prototype.effectColor  = null;
	Entity.prototype.isAdmin      = false;


	/**
	 * Initialized Entity data
	 */
	Entity.prototype.set = function Set( unit )
	{
		var keys;
		var i, count;

		// Erase previous data
		this.direction = 4;
		this.setAction({
			action: this.ACTION.IDLE,
			frame:  0,
			play:   true,
			repeat: true
		});

		// Load shadow
		Client.loadFile(this.files.shadow.spr, null, null, {to_rgba:true});
		Client.loadFile(this.files.shadow.act);

		this.isAdmin = Session.AdminList.indexOf(unit.GID) > -1;
		this.sex     = unit.hasOwnProperty('sex') ? unit.sex : this._sex;
		this.job     = unit.hasOwnProperty('job') ? unit.job : this._job;
		this.clothes = 0;
		keys         = Object.keys( unit );
		count        = keys.length;

		for (i = 0; i < count; ++i) {
			switch (keys[i]) {

				// Server send warp as npc,
				// roBrowser has a special type for warp.
				case 'objecttype':
					this.objecttype = (unit.job === 45) ? Entity.TYPE_WARP : unit.objecttype;
					require('./EntityAction').call(this);
					break;

				// Already set
				case 'sex':
				case 'job':
					break;

				// Not used ?
				case 'xSize':
				case 'ySize':
					break;

				case 'PosDir':
					this.direction   = ([ 4, 3, 2, 1, 0, 7, 6, 5 ])[(unit.PosDir[2]+8)%8];
					this.position[0] = unit.PosDir[0];
					this.position[1] = unit.PosDir[1];
					this.position[2] = Altitude.getCellHeight(  unit.PosDir[0],  unit.PosDir[1] );
					break;

				case 'state':
					var actions = [ this.ACTION.IDLE, this.ACTION.DIE, this.ACTION.SIT ];
					this.setAction({
						action: actions[unit.state],
						frame:  0,
						play:  true,
						repeat: unit.state !== 1
					});
					break;

				case 'action':
					this.setAction({
						action:unit.action,
						play:true,
						frame:0,
						repeat: unit.action !== 1
					});
					break;

				case 'actStartTime':
					this.animation.tick = unit.actStartTime;
					break;
	
				case 'speed':
					this.walk.speed = unit.speed;
					break;

				case 'moveStartTime':
					this.walk.tick = +Renderer.tick;
					break;

				case 'name':
					this.display.name = unit.name;
					this.display.update(
						this.objecttype === Entity.TYPE_MOB ? '#ffc6c6' :
						this.objecttype === Entity.TYPE_NPC ? '#94bdf7' :
						'white'
					);
					break;

				case 'MoveData':
					this.position[0] = unit.MoveData[0];
					this.position[1] = unit.MoveData[1];
					this.position[2] = Altitude.getCellHeight(  unit.MoveData[0],  unit.MoveData[1] );
					this.walkTo.apply( this, unit.MoveData );
					break;

				default:
					if (Entity.prototype.hasOwnProperty(keys[i]) || Entity.prototype.hasOwnProperty('_' + keys[i])) {
						this[keys[i]] = unit[keys[i]];
					}
					break;
			}
		}

		// Rendering life
		if (this.life.hp > -1 && this.life.hp_max > -1) {
			this.life.update();
			this.life.display = true;
		}
	};


	/**
	 * Remove Entity's attached GUI
	 */
	Entity.prototype.clean = function Clean()
	{
		// Remove UI elements
		this.life.clean();
		this.display.clean();
		this.dialog.clean();
		this.cast.clean();
		this.room.clean();
		this.attachments.remove('lockon');
		this.animations.free();

		// Remove
		this.remove_tick  = 0;
		this.remove_delay = 0;

		// Avoid collision with other Entity with same GID
		this.GID         += Math.random();
	};


	/**
	 * @var {integer} tick to remove
	 */
	Entity.prototype.remove_tick  = 0;


	/**
	 * @var {integer} time to wait to disapear
	 */
	Entity.prototype.remove_delay = 0;


	/**
	 * Remove Entity from screen (die, spam, etc.)
	 *
	 * @param {number} type
	 * @return {boolean} removed immediatly ?
	 */
	Entity.prototype.remove = function Remove( type )
	{
		switch (type) {

			// 0 - moved out of sight
			case 0:
				this.clean();
				this.remove_tick  = +Renderer.tick;
				this.remove_delay = 1000;
				break;
	
			// 1 - died
			case 1:
				var is_pc = this.objecttype === Entity.TYPE_PC;
				this.setAction({
					action: this.ACTION.DIE,
					repeat: is_pc,
					play:   true,
					frame:  0,
					next:   false
				});

				if (!is_pc) {
					this.clean();
					this.remove_tick  = +Renderer.tick;
					this.remove_delay = 5000;
				}
				break;

			// TODO: add effects.
			//case 2:  // 2 - logged out
			//case 3:  // 3 - teleported
			//case 4:  // trick dead ?
			default: // No other way ?
				this.clean();
				this.remove_tick  = Renderer.tick;
				this.remove_delay = 0;
				break;
		}
	};


	/**
	 * Look at a cell
	 *
	 * @param {number} to_x
	 * @param {number} to_y
	 */
	Entity.prototype.lookTo = function LookTo( to_x, to_y )
	{
		var x = Math.round(to_x-this.position[0]);
		var y = Math.round(to_y-this.position[1]);
		var dir;
	
		if (x >= 1 ) dir = y >= 1 ? 5 : y === 0 ? 6 : 7;
		if (x === 0) dir = y >= 1 ? 4 : 0;
		if (x <=-1 ) dir = y >= 1 ? 3 : y === 0 ? 2 : 1;

		this.direction = dir;

		// Todo:update head direction
	};


	/**
	 * Export
	 */
	return Entity;
});