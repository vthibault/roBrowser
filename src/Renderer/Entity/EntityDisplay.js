/**
 * Renderer/EntityDisplay.js
 *
 * Manage Entity Display (pseudo + guild + party)
 * Writing to canvas is very ugly, this file contain some hack to get some best results on Firefox and Chrome.
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(['Utils/gl-matrix', 'Renderer/Renderer'], function( glMatrix, Renderer )
{
	"use strict";


	/**
	 * Global methods
	 */
	var vec4  = glMatrix.vec4;
	var _pos  = new Float32Array(4);
	var _size = new Float32Array(2);


	// Some helper for Firefox to render text-border
	if (CanvasRenderingContext2D != 'undefined') {
		CanvasRenderingContext2D.prototype.outlineText = 
			function outlineText(txt, x, y) {
				this.fillText( txt, x-1, y );
				this.fillText( txt, x,   y-1 );
				this.fillText( txt, x+1, y );
				this.fillText( txt, x,   y+1 );
			}
	}

	// Some helper for Chrome to render text-border
	function multiShadow( ctx, text, x, y, offsetX, offsetY, blur) {
		ctx.textBaseline = "top";
		ctx.lineWidth = 1;
		ctx.shadowColor = '#000';
		ctx.shadowBlur = blur;
		ctx.shadowOffsetX = offsetX;
		ctx.shadowOffsetY = offsetY;
		ctx.fillStyle = "black";
		ctx.fillText(text, x, y);
	}


	/**
	 * Display structure
	 */
	function Display()
	{
		this.TYPE = {
			NONE:     0,
			LOADING:  1,
			COMPLETE: 2
		};

		this.load       =  this.TYPE.NONE;
		this.name       =  "";
		this.party_name =  "";
		this.guild_name =  "";
		this.guild_rank =  "";
		this.emblem     =  null;
		this.display    =  false;
		this.canvas     =  document.createElement('canvas');
		this.ctx        =  this.canvas.getContext('2d');
		this.canvas.style.position = "absolute";
		this.canvas.style.zIndex   = 1;
	}


	/**
	 * Add GUI to html
	 */
	Display.prototype.add = function Add()
	{
		if( this.canvas && !this.canvas.parentNode ) {
			document.body.appendChild(this.canvas);
		}
		this.display = true;
	};


	/**
	 * Remove GUI from html
	 */
	Display.prototype.remove = function Remove()
	{
		if ( this.canvas && this.canvas.parentNode ) {
			document.body.removeChild(this.canvas);
		}
		this.display = false;
	};


	/**
	 * Clean it (remove informations)
	 */
	Display.prototype.clean = function Clean()
	{
		this.remove();
		//this.canvas = null;
		//this.ctx    = null;
	};


	/**
	 * Update the display
	 * @param {string} color
	 */
	Display.prototype.update = function Update( color )
	{
		// Setup variables
		var lines    = new Array(2);
		var fontSize = 12;
		var ctx      = this.ctx;
		var start_x  = (this.emblem ? 26 : 0) + 5;
		var width, height;

		// Skip the "#" in the pseudo
		lines[0] = this.name.split("#")[0];
		lines[1] = "";

		// Add the party name
		if ( this.party_name.length ) {
			lines[0] += " (" + this.party_name + ")";
		}

		// Add guild name
		if ( this.guild_name.length ) {
			lines[1]  = this.guild_name;

			// Add guild rank
			if ( this.guild_rank.length ) {
				lines[1] +=  " [" + this.guild_rank + "]";
			}
		}

		// Setup the canvas
		ctx.font          = fontSize + "px Arial";
		width             = Math.max( ctx.measureText(lines[0]).width, ctx.measureText(lines[1]).width ) + start_x + 5;
		height            = fontSize * 3 * (lines[1].length ? 2 : 1);
		ctx.canvas.width  = width;
		ctx.canvas.height = height;


		// Draw emblem
		if ( this.emblem ) {
			ctx.drawImage( this.emblem, 0, 0 );
		}


		// TODO: complete the color list in the Entity display
		color = color || "white";
		ctx.font         = fontSize + "px Arial";
		ctx.textBaseline = "top"; 

		// Chrome hack
		if( window.chrome ) {
			multiShadow(ctx, lines[0], start_x, 0,  0, -1, 0);
			multiShadow(ctx, lines[0], start_x, 0,  0,  1, 0);
			multiShadow(ctx, lines[0], start_x, 0, -1,  0, 0);
			multiShadow(ctx, lines[0], start_x, 0,  1,  0, 0);
			multiShadow(ctx, lines[1], start_x, fontSize * 1.5,  0, -1, 0);
			multiShadow(ctx, lines[1], start_x, fontSize * 1.5,  0,  1, 0);
			multiShadow(ctx, lines[1], start_x, fontSize * 1.5, -1,  0, 0);
			multiShadow(ctx, lines[1], start_x, fontSize * 1.5,  1,  0, 0);
			ctx.fillStyle   = color;
			ctx.strokeStyle = "black";
			ctx.strokeText(lines[0], start_x, 0);
			ctx.fillText(  lines[0], start_x, 0);
			ctx.strokeText(lines[1], start_x, fontSize * 1.5);
			ctx.fillText(  lines[1], start_x, fontSize * 1.5);
		}

		// Firefox hack
		else {
			ctx.translate(0.5, 0.5);
			ctx.fillStyle    = "black";
			ctx.outlineText( lines[0], start_x, 0 );  
			ctx.outlineText( lines[1], start_x, fontSize * 1.5 );  
			ctx.fillStyle    = color;
			ctx.fillText( lines[0], start_x, 0 );  
			ctx.fillText( lines[1], start_x, fontSize * 1.5 );
		}
	};


	/**
	 * Rendering GUI
	 */
	Display.prototype.render = function( matrix )
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


		canvas.style.top  = ((_pos[1] + 15 ) | 0) + "px";
		canvas.style.left = ((_pos[0] - canvas.width / 2) | 0) + "px";
	};


	/**
	 * Exporting
	 */
	return function Init()
	{
		this.display = new Display();
	};
});