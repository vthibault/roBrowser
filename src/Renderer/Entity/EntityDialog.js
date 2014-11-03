/**
 * Renderer/EntityDialog.js
 *
 * Manage Entity Dialog box
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(['Utils/gl-matrix', 'Core/Events', 'Renderer/Renderer'], function( glMatrix, Events, Renderer )
{
	'use strict';


	/**
	 * Global methods
	 */
	var vec4  = glMatrix.vec4;
	var _pos  = new Float32Array(4);
	var _size = new Float32Array(2);


	// Helper to render round rectangle
	function roundRect(ctx, x, y, width, height, radius)
	{
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
		ctx.closePath();
	}


	/**
	 * Dialog class
	 */
	function Dialog()
	{
		this.text    = '';
		this.tick    = 0;
		this.timeout = null;
		this.display = false;

		this.canvas  = document.createElement('canvas');
		this.ctx     = this.canvas.getContext('2d');
		this.canvas.style.position = 'absolute';
		this.canvas.style.zIndex   = 1;
	}


	/**
	 * Add a message
	 *
	 * @param {string} text message
	 * @param {string} fontColor
	 */
	Dialog.prototype.set = function Set( text, fontColor )
	{
		// Save info
		this.text    = text;
		this.tick    = Renderer.tick;
		this.display = true;

		// Init variables
		var ctx        = this.ctx;
		var max_width  = 250;
		var fontSize   =  12;
		var lines      =  [];
		var width = 0, i, j;
		var result;
		var color = fontColor || 'white';

		ctx.font   = fontSize + 'px Arial';

		// Parse lines, depend on text size.
		while (text.length) {
			i = text.length;
			while (ctx.measureText(text.substr(0,i)).width > max_width) {
				i--;
			}

			result = text.substr(0,i);

			if (i !== text.length) {
				j = 0;
				while (result.indexOf(' ',j) !== -1) {
					j = result.indexOf(' ',j) + 1;
				}
			}
	
			lines.push( result.substr(0, j|| result.length) );
			width = Math.max( width, ctx.measureText(lines[ lines.length-1 ]).width );
			text  = text.substr( lines[ lines.length-1 ].length, text.length );
		}

		// Margin of 10
		ctx.canvas.width  = 14 + width;
		ctx.canvas.height =  8 + ( fontSize + 5 ) * lines.length;
		ctx.font = fontSize + 'px Arial';

		// Build dialog
		ctx.fillStyle = 'rgba(0,0,0,0.4)';
		ctx.fillRect( 0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.strokeStyle = '#525252';
		roundRect(ctx, 0.5, 0.5, ctx.canvas.width-1, ctx.canvas.height-1, 2);
		ctx.stroke();

		for (i = 0, j = lines.length; i < j; ++i) {
			// Render twice to get it a little brighter
			ctx.fillStyle = 'black';
			ctx.fillText( lines[i], 8, 5 + fontSize + (fontSize+5) * i );
			ctx.fillStyle = color;
			ctx.fillText( lines[i], 7, 4 + fontSize + (fontSize+5) * i );
		}

		// Remove or rewrite canvas
		if (this.timeout) {
			Events.clearTimeout(this.timeout);
		}

		// Remove next 5 secs.
		this.timeout = Events.setTimeout(function(){
			this.timeout = null;
			this.remove();
		}.bind(this), 5000 );
	};


	/**
	 * Remove GUI from html
	 */
	Dialog.prototype.remove = function Remove()
	{
		// Clean timeout
		if (this.timeout) {
			Events.clearTimeout(this.timeout);
			this.timeout = null;
		}

		// Remove element
		if (this.canvas.parentNode) {
			document.body.removeChild(this.canvas);
		}

		this.display =  false;
		this.text    =  '';
	};


	/**
	 * Clean up dialog
	 */
	Dialog.prototype.clean = function Clean()
	{
		this.remove();
		//this.canvas = null;
		//this.ctx    = null;
	};


	/**
	 * Rendering dialog box
	 */
	Dialog.prototype.render = function Render( matrix )
	{
		var canvas = this.canvas;
		var z;

		// Cast position
		_pos[0] =  0.0;
		_pos[1] =  90 / 35;
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

		canvas.style.top  = ((_pos[1] - canvas.height - 2) | 0) + 'px';
		canvas.style.left = ((_pos[0] - canvas.width/2) | 0) + 'px';

		// Append to body
		if (!canvas.parentNode) {
			document.body.appendChild(canvas);
		}
	};


	/**
	 * Export
	 */
	return function Init()
	{
		this.dialog = new Dialog();
	};
});