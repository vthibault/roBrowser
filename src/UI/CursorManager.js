/**
 * UI/CursorManager.js
 *
 * Display Cursor
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define([ 'require', 'Utils/jquery', 'Core/Client', 'Loaders/Sprite', 'Loaders/Action'],
function( require,         jQuery,        Client,           Sprite,           Action )
{
	"use strict";



	/**
	 * Cursor Constructor
	 */
	var Cursor = {};


	/**
	 * Cursor animation Constant
	 */
	Cursor.ACTION = {
		DEFAULT: 0,
		TALK:    1,
		CLICK:   2,
		TARGET:  3,
		ROTATE:  4,
		ATTACK:  5,
		WARP:    7,
		PICK:    9
	};


	/**
	 * @var {integer} Cursor.ACTION.* constant
	 */
	Cursor.type = Cursor.ACTION.DEFAULT;


	/**
	 * @var {integer} tick
	 */
	Cursor.tick = 0;


	/**
	 * @var {boolean} repeat animation ?
	 */
	Cursor.norepeat = false;


	/**
	 * @var {integer} animation frame
	 */
	Cursor.animation = 0;


	/**
	 * @var {boolean} play animation ?
	 */
	Cursor.play = true;


	/**
	 * @var {string} last rendered image url
	 */
	Cursor.lastURL = null;


	/**
	 * @var {number} to don't render the same frame twice
	 */
	Cursor.lastAnim = -1;


	/**
	 * @var {Array} images link list
	 */
	Cursor.images = [];


	var Entity;
	var SpriteRenderer;


	/**
	 * Load cursor data (action, sprite)
	 */
	Cursor.init = function Init(fn)
	{
		// Already loaded
		if( this.images.length ) {
			fn();
			return;
		}

		Client.getFiles( ["data/sprite/cursors.spr", "data/sprite/cursors.act"], function( spr, act ) {
			Cursor.sprite = new Sprite( spr );
			Cursor.action = new Action( act );
			Cursor.generateImages();
			Cursor.bindMouseEvent();
			fn();
		});

		Entity         = require('Renderer/Entity/Entity');
		SpriteRenderer = require('Renderer/SpriteRenderer');

		this.canvas = document.createElement('canvas');
		this.canvas.width  = 50;
		this.canvas.height = 60;
		this.ctx    = this.canvas.getContext('2d');
		this.entity = new Entity();
	};


	/**
	 * Build Image data
	 */
	Cursor.generateImages = function GenerateImages()
	{

		var i, j, size, count;
		var str;
		var canvas;

		this.images.length = 0;

		// Build frames
		for ( i = 0, count = this.sprite.frames.length; i < count; ++i ) {

			canvas = this.sprite.getCanvasFromFrame(i);

			if( !canvas ) {
				this.images[i] = '';
				continue;
			}

			// Save canvas image to an URI object
			// TODO: wait for canvas.toBlob() API
			str    = atob( canvas.toDataURL('image/png').substr(22) );
			size   = str.length;

			var data = new Uint8Array(size);

			for( j = 0; j < size; ++j) {
				data[j] = str.charCodeAt(j);
			}

			this.images[i] = URL.createObjectURL(new Blob([data],{type: "image/png"}));
		}
	};


	/**
	 * Change the cursor for the button click event
	 */
	Cursor.bindMouseEvent = function BindMouseEvent()
	{
		// Add CSS rule for button
		var action    = Cursor.action.actions[Cursor.ACTION.CLICK];
		var hover     = Cursor.images[action.animations[0].layers[0].index];
		var down      = Cursor.images[action.animations[1].layers[0].index];

		// Append CSS to head
		jQuery('head').append([
			'<style type="text/css">',
				'button { cursor: url(' + hover + '), auto; }',
				'button:active { cursor: url(' + down + '), auto; }',
			'</style>'
		].join("\n"));
	};


	/**
	 * Change cursor action
	 *
	 * @param {number} type - Cursor.ACTION.*
	 * @param {number} animation numero (optional)
	 * @param {boolean} norepeat - repeat animation ?
	 */
	Cursor.setType = function SetType( type, norepeat, animation )
	{
		this.type     = type;
		this.tick     = Date.now();
		this.norepeat = !!norepeat;
		this.lastAnim = -1; // reset

		if( typeof animation !== "undefined" ) {
			this.animation = animation;
			this.play      = false;
		}
		else {
			this.animation = animation || 0;
			this.play      = true;
		}
	};


	/**
	 * Render the cursor (update)
	 */
	Cursor.render = function Render( tick )
	{
		// Not loaded yet.
		if( !this.images.length ) {
			return;
		}


		// New way
		var i, count;
		var action    = this.action.actions[this.type];
		var delay     = action.delay * ( this.type === Cursor.ACTION.DEFAULT ? 2 : 1 );
		var anim, frame;

		if( this.play ) {
			frame = (tick - this.tick) / delay | 0;
			if( this.norepeat ) {
				anim = Math.min( frame, action.animations.length - 1 );
			}
			else {
				anim = frame % action.animations.length;
			}
		}
		else {
			anim = this.animation;
		}

		// Don't render the same animation twice
		// Save CPU...
		if( anim === this.lastAnim ) {
			return;
		}

		this.lastAnim = anim;
		var pos       = [ 0, 0 ];
		var animation = action.animations[anim];
		var layers    = animation.layers;
		var x = 1, y = 19;

		// Hardcoded ?
		switch( this.type ) {
			case Cursor.ACTION.TALK:
				x = 20;
				y = 40;
				break;
	
			case Cursor.ACTION.WARP:
				x = 10;
				y = 32;
				break;

			case Cursor.ACTION.ROTATE:
				x = 18;
				y = 26;
				break

			case Cursor.ACTION.PICK:
				x = 20;
				y = 40;
				break;
		}

		// Initialize context
		SpriteRenderer.bind2DContext( this.ctx, x, y );
		this.ctx.clearRect(0, 0, 50, 50);

		// Render layers
		for ( i=0, count=layers.length; i<count; ++i ) {
			this.entity.renderLayer( layers[i], this.sprite, this.sprite, pos, false );
		}

		// Display icons
		var url = this.canvas.toDataURL();
		if( url !== this.lastURL ) {
			document.body.style.cursor = 'url('+ url +'), auto';
			this.lastURL = url;
		}
	};


	/**
	 * Export
	 */
	return Cursor;
});