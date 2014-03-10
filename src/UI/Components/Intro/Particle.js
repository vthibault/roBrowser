/**
 * UI/Components/Intro/Particles.js
 *
 * Manage Intro Particles
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function( require )
{
	'use strict';

	/**
	 * @Constructor
	 */
	function Particle( width, height ) {

		this.rmax = 10;
		this.xmax = 5;
		this.ymax = 2;

		this.x    = width  * Math.random();
		this.y    = height * Math.random();
		this.r    = (this.rmax-1) * Math.random() + 1;

		this.c    = Math.floor( 255 * Math.random() );

		this.dx   = Math.random() * this.xmax * 2 - this.xmax;
		this.dy   = Math.random() * this.ymax * 2 - this.ymax;
		this.dc   = Math.random() > 0.5 ? 1 : -1;

		this.life  = 100 * ( this.r/ this.rmax );
		this.ratio = Math.random() * this.life;

		this.stop = Math.random() * 0.2 + 0.4;
		this.t    = Math.random() + 1;
	}


	/**
	 * Cross Browser animation Frame
	 */
	Particle.requestRender = window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame                ||
		window.mozRequestAnimationFrame                   ||
		window.oRequestAnimationFrame                     ||
		window.msRequestAnimationFrame                    ||
		function(callback){
			window.setTimeout( callback, 1000/60 );
		};


	/**
	 * Initialize particles
	 *
	 * @param {number} particles count
	 */
	Particle.init = function Init( count, canvas )
	{
		this.list   = new Array(count);

		this.width  = canvas.width;
		this.height = canvas.height;
		this.canvas = canvas;
		this.ctx    = canvas.getContext('2d');
		this.ctx.globalCompositeOperation = 'lighter';

		this.bg     = new Image();
		this.bg.src = require.toUrl('./images/background.jpg');
		this.bg.onload = function(){ this.ready = true; };

		for (var i = 0; i < count; ++i) {
			this.list[i] = new Particle( this.width, this.height );
		}

		this.process = true;
		this.tick    =    0;
		this.render();
	};


	/**
	 * Stop particles
	 */
	Particle.stop = function Stop()
	{
		this.process = false;
	};


	/**
	 * Render particles
	 */
	Particle.render = function Render()
	{
		var now = Date.now();
		var i, count;

		if (now - this.tick > 50) {
			this.ctx.clearRect( 0, 0, this.width, this.height );
			if (this.bg.ready) {
				this.ctx.drawImage(this.bg, 0, 0);
			}

			for (i = 0, count = this.list.length; i < count; ++i) {
				this.list[i].move( 0, 0, this.width, this.height );
				this.list[i].render( this.ctx );
			}

			this.tick = now;
		}

		if (this.process) {
			this.requestRender.call(
				window,
				this.render.bind(this),
				this.canvas
			);
		}
	};


	/**
	 * Render particle
	 *
	 * @param {Canvas2DContext}
	 */
	Particle.prototype.render = function Render( ctx )
	{
		this.ratio += this.t;
		if (this.ratio <= 0 || this.ratio >= this.life) {
			this.t *= -1;
		}

		var opacity  = (1 - ( this.ratio / this.life )).toFixed(2);
		var radius   = this.r * opacity;
		var gradient = ctx.createRadialGradient(
			this.x | 0, this.y | 0,  0,
			this.x | 0, this.y | 0, (radius <= 0 ? 1 : radius | 0)
		);

		ctx.beginPath();
		ctx.arc( this.x | 0, this.y | 0, this.r | 0, 0, Math.PI * 2, true);
		ctx.closePath();

		gradient.addColorStop(0.0, 'rgba(255,255,255,' + opacity + ')');
		gradient.addColorStop(this.stop, 'rgba('+ this.c +',100,255,' + (opacity*0.6) + ')');
		gradient.addColorStop(1.0, 'rgba('+ this.c +',100,255,0)');

		ctx.fillStyle = gradient;
		ctx.fill();
	};


	/**
	 * Move particle in a rectangle
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} width
	 * @param {number} height
	 */
	Particle.prototype.move = function Move( x, y, width, height )
	{
		this.x += (this.ratio/this.life) * this.dx;
		this.y += (this.ratio/this.life) * this.dy;
		this.c += this.dc;

		// Bound
		if (this.x >= width)  this.dx = -1;
		else if (this.x <= x) this.dx =  1;

		if (this.y >= height) this.dy = -1;
		else if (this.y <= y) this.dy =  1;

		if (this.c >= 255)    this.dc = -1;
		else if (this.c <= 0) this.dc =  1;
	};


	/**
	 * Export class
	 */
	return Particle;
});