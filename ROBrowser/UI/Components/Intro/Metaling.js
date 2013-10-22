/**
 * UI/Components/Intro/Metaling.js
 *
 * Metaling Manager
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function( require )
{
	"use strict";


	/**
	 * Metaling namespace
	 */
	var Metaling = {};


	/**
	 * Constants
	 */
	Metaling.TYPE = {
		LOVE:  0,
		HAPPY: 1,
		SAD:   2,
		BAD:   3,
		LOAD:  4
	};


	/**
	 * Initialize Metaling
	 *
	 * @param {object} canvas
	 * @param {function} callback once everything is ready
	 */
	Metaling.init = function Init( canvas, callback )
	{
		this._canvas       = canvas;
		this._ctx          = this._canvas.getContext('2d');
		this._spriteSheet  = [ 0, 192, 394, 586, 777 ];
		this._image        = new Image();
		this._type         = Metaling.TYPE.SAD;

		var self = this;
		this._image.src    = require.toUrl('./metaling-sprite.png');
		this._image.onload = function() {
			self._canvas.width  = 192;
			self._canvas.height = self._image.height;
			self._type          = Metaling.TYPE.SAD;
			self.update();

			if( callback ) {
				callback();
			}
		};
	};


	/**
	 * Updating metaling image
	 */
	Metaling.update = function Update()
	{
		this._ctx.clearRect( 0, 0, this._canvas.width, this._canvas.height );
		this._ctx.drawImage( this._image,
			this._spriteSheet[this._type+0], 0,
			this._spriteSheet[this._type+1] - this._spriteSheet[this._type+0], this._image.height,
			0, 0,
			192, this._image.height
		);
	};


	/**
	 * Changing metaling image
	 */
	Metaling.setType = function SetType( type )
	{
		this._type = type;

		switch( type ) {

			case Metaling.TYPE.LOVE:
				this._canvas.className = "metal_drop_over";
				break;

			case Metaling.TYPE.SAD:
				this._canvas.className = "metal_default";
				break;

			case Metaling.TYPE.BAD:
				this._canvas.className = "metal_error";
				break;

			case Metaling.TYPE.LOAD:
				this._canvas.className = "metal_drop";
				this._type = Metaling.TYPE.HAPPY;
				break;
		}

		this.update();
	};


	/**
	 * Export
	 */
	return Metaling;
});