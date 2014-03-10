/**
 * Renderer/EntityWalk.js
 *
 * Manage entity walking action
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define( function( require )
{
	'use strict';

	/**
	 *  Load dependencies
	 */
	var PathFinding = require('Utils/PathFinding');
	var Renderer    = require('Renderer/Renderer');
	var Altitude    = require('Renderer/Map/Altitude');


	/**
	 * Direction look up table
	 */
	var DIRECTION = [
		[1,2,3],
		[0,0,4],
		[7,6,5]
	];


	/**
	 * Walk save structure
	 */
	function WalkStructure()
	{
		this.speed =  150;
		this.tick  =  0;
		this.path  =  [];
		this.pos   =  new Float32Array(3);
	}


	/**
	 * Want to move to a cell
	 *
	 * @param {number} from_x
	 * @param {number} from_y
	 * @param {number} to_x
	 * @param {number} to_y
	 * @param {number} range optional
	 */
	function WalkTo( from_x, from_y, to_x, to_y, range )
	{
		var path  = [];
		var count = PathFinding.search( from_x | 0, from_y | 0, to_x | 0, to_y | 0, range || 0, path );

		if (count) {
			path.length = count;
			path.shift();

			if (count === 2 && path[0][0] === from_x && path[0][1] === from_y){
				return;
			}

			this.walk.pos.set(this.position);
			this.walk.path = path;
			this.walk.tick = Renderer.tick;

			this.headDir   = 0;

			if (this.action !== this.ACTION.WALK) {
				this.setAction({
					action: this.ACTION.WALK,
					frame:  0,
					repeat: true,
					play:   true
				});
			}
		}
	}


	/**
	 * Process walking
	 */
	function WalkProcess()
	{
		var pos  = this.position;
		var walk = this.walk;
		var path = walk.path;

		var x, y, speed;
		var TICK = Renderer.tick;
		var delay = 0;

		if (path.length) {

			// Calculate new position, base on time and walk speed.
			while (path.length) {
				x = path[0][0] - (walk.pos[0]);
				y = path[0][1] - (walk.pos[1]);

				// Seems like walking on diagonal is slower ?
				speed = ( x && y ) ? walk.speed / 0.6 : walk.speed;

				// New position :)
				if (TICK - walk.tick <= speed) {
					break;
				}

				walk.tick += speed;
				walk.pos.set(path.shift());
			}

			// Calculate and store new position
			// TODO: check the min() part.

			delay  = Math.min(speed, TICK-walk.tick);

			// Should not happened, avoid division by 0
			if (!delay) {
				delay = 150;
			}

			pos[0] = walk.pos[0] + x / (speed / delay);
			pos[1] = walk.pos[1] + y / (speed / delay);
			pos[2] = Altitude.getCellHeight( pos[0], pos[1] );

			// Update player direction while walking
			if (path.length) {
				this.direction = DIRECTION[(x>0?1:x<0?-1:0)+1][(y>0?1:y<0?-1:0)+1];
				return;
			}
		}

		// Stop walking
		this.setAction({
			action: this.ACTION.IDLE,
			frame:  0,
			play:   true,
			repeat: true
		});

		this.onWalkEnd();

		pos[0] = Math.round(pos[0]);
		pos[1] = Math.round(pos[1]);
		pos[2] = Altitude.getCellHeight( pos[0], pos[1] );
	}


	/**
	 * Initialize and export methods
	 */
	return function Init()
	{
		this.walk        = new WalkStructure();
		this.walkTo      = WalkTo;
		this.walkProcess = WalkProcess;
		this.onWalkEnd   = function(){};
	};
});

