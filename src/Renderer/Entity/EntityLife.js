/**
 * renderer/EntityLife.js
 *
 * Manage Entity Life GUI
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(['utils/gl-matrix', 'renderer/Renderer'], function( glMatrix, Renderer )
{
	'use strict';


	/**
	 * Global methods
	 */
	var vec4  = glMatrix.vec4;
	var _pos  = new Float32Array(4);
	var _size = new Float32Array(2);


	/**
	 * Life class
	 */
	function Life()
	{
		this.hp      = -1;
		this.sp      = -1;
		this.hpMax   = -1;
		this.spMax   = -1;
		this.display = false;
		this.canvas  = document.createElement('canvas');
		this.ctx     = this.canvas.getContext('2d');
		this.canvas.style.position = 'absolute';
		this.canvas.style.zIndex   = 1;
		this.entity  = null;
	}


	/**
	 * Remove Life GUI
	 */
	Life.prototype.remove = function remove()
	{
		this.display = false;
		if (this.canvas.parentNode) {
			document.body.removeChild(this.canvas);
		}
	};


	/**
	 * Clean Up Life
	 */
	Life.prototype.clean = function clean()
	{
		this.remove();
		//this.ctx    = null;
		//this.canvas = null;
	};


	/**
	 * Update life
	 */
	Life.prototype.update = function update()
	{
		var width  = 60, height =  5;
		var Entity = this.entity.constructor;

		// Don't display it, if negatives values.
		if (this.hp < 0 || this.hpMax < 0) {
			this.remove();
			return;
		}

		// Init variables
		this.display = true;
		var ctx      = this.ctx;
		var hpPer   = this.hp / this.hpMax;
		var sp       = this.sp > -1 && this.spMax > -1;
		var spPer   = this.sp / this.spMax;

		if (sp) {
			height += 4;
		}

		// Draw life
		ctx.canvas.width  = width;
		ctx.canvas.height = height;

		// border
		ctx.fillStyle = '#10189c';
		ctx.fillRect( 0, 0, width, height );

		// empty
		ctx.fillStyle = '#424242';
		ctx.fillRect( 1, 1, width-2, height-2 );
	
		// Display HP
		if (this.entity.objecttype === Entity.Type.MOB) {
			ctx.fillStyle = ( hpPer < 0.25 ) ? '#FFFF00' : '#FF00E7';
		}
		else if (this.entity.objecttype === Entity.Type.PET) {
			ctx.fillStyle = ( hpPer < 0.25 ) ? '#FFFF00' : '#FFE7E7';
		}
		else {
			ctx.fillStyle = ( hpPer < 0.25 ) ? '#FF0000' : '#10ef21';
		}

		ctx.fillRect( 1, 1, Math.round( (width-2) * hpPer ), 3 );

		// Display SP
		if (sp) {
			ctx.fillStyle = '#10189c';
			ctx.fillRect( 0, 4, width, 1);
			ctx.fillStyle = '#1863de';
			ctx.fillRect( 1, 5, Math.round( (width-2) * spPer ), 3 );
		}
	};


	/**
	 * Rendering life
	 *
	 * @param {mat4} matrix
	 */
	Life.prototype.render = function render( matrix )
	{
		var canvas = this.canvas;
		var z;

		// Cast position
		_pos[0] =  0.0;
		_pos[1] = -0.5;
		_pos[2] =  0.0;
		_pos[3] =  1.0;

		// Set the viewport
		_size[0] = Renderer.width  / 2;
		_size[1] = Renderer.height / 2;

		// Project point to scene
		vec4.transformMat4( _pos, _pos, matrix );

		// Calculate position
		z = _pos[3] === 0.0 ? 1.0 : ( 1.0 / _pos[3] );
		_pos[0] = _size[0] + Math.round(_size[0] * (_pos[0] * z));
		_pos[1] = _size[1] - Math.round(_size[1] * (_pos[1] * z));

		canvas.style.top  = (_pos[1] | 0 ) + 'px';
		canvas.style.left = ((_pos[0] - canvas.width / 2) | 0) + 'px';

		// Append to body
		if (!canvas.parentNode) {
			document.body.appendChild(canvas);
		}
	};


	/**
	 * Export
	 */
	return function init()
	{
		this.life        = new Life();
		this.life.entity = this;
	};
});