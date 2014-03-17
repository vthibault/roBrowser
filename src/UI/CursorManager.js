/**
 * UI/CursorManager.js
 *
 * Display Cursor
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define([ 'require', 'Utils/jquery', 'Core/Client', 'Preferences/Graphics', 'Loaders/Sprite', 'Loaders/Action'],
function( require,         jQuery,        Client,               Graphics,           Sprite,           Action )
{
	'use strict';


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
		ROTATE:  4,
		ATTACK:  5,
		WARP:    7,
		PICK:    9,
		TARGET: 10
	};

	/**
	 * @var {boolean} block change ?
	 */
	Cursor.freeze = false;


	/**
	 * @var {boolean} magnetism while picking entites ?
	 * Work in progress
	 */
	Cursor.magnetism = true;


	/**
	 * @var {integer} Cursor.ACTION.* constant
	 */
	var _type = Cursor.ACTION.DEFAULT;


	/**
	 * @var {integer} tick
	 */
	var _tick = 0;


	/**
	 * @var {boolean} repeat animation ?
	 */
	var _norepeat = false;


	/**
	 * @var {integer} animation frame
	 */
	var _animation = 0;


	/**
	 * @var {boolean} play animation ?
	 */
	var _play = true;


	/**
	 * @var {string} last rendered image url
	 */
	var _lastURL = null;


	/**
	 * @var {number} last X position
	 */
	var _lastX = 0;


	/**
	 * @var {number} last Y position
	 */
	var _lastY = 0;


	/**
	 * @var {number} to don't render the same frame twice
	 */
	var _lastAnim = -1;


	/**
	 * @var {Array} images link list
	 */
	var _images = [];


	/**
	 * @var {CanvasElement}
	 */
	var _canvas;


	/**
	 * @var {CanvasRenderingContext2D} canvas context
	 */
	var _ctx;


	/**
	 * @var {Entity} generic entity to render cursor
	 */
	var _entity;


	/**
	 * @var {Sprite} sprite
	 */
	var _sprite;


	/**
	 * @var {Action} action
	 */
	var _action;


	/**
	 * @var {position} - just used to avoid memory leak
	 */
	var _position = new Uint16Array(2);


	var EntityManager, Entity, SpriteRenderer, Mouse;

	/**
	 * Load cursor data (action, sprite)
	 */
	Cursor.init = function init(fn)
	{
		// Already loaded
		if (_images.length) {
			fn();
			return;
		}

		Client.getFiles( ['data/sprite/cursors.spr', 'data/sprite/cursors.act'], function( spr, act ) {
			try {
				_sprite = new Sprite( spr );
				_action = new Action( act );
			}
			catch(e) {
				console.error('Cursor::init() - ' + e.message );
				return;
			}

			generateImages();
			bindMouseEvent();
			fn();
		});

		EntityManager  = require('Renderer/EntityManager');
		Entity         = require('Renderer/Entity/Entity');
		SpriteRenderer = require('Renderer/SpriteRenderer');
		Mouse          = require('Controls/MouseEventHandler');

		_canvas        = document.createElement('canvas');
		_canvas.width  = 50;
		_canvas.height = 60;
		_ctx           = _canvas.getContext('2d');
		_entity        = new Entity();
	};


	/**
	 * Build Image data
	 */
	function generateImages()
	{

		var i, j, size, count;
		var str, data;
		var canvas;

		_images.length = 0;

		// Build frames
		for (i = 0, count = _sprite.frames.length; i < count; ++i) {
			canvas = _sprite.getCanvasFromFrame(i);

			if (!canvas) {
				_images[i] = '';
				continue;
			}

			// Save canvas image to an URI object
			// TODO: wait for canvas.toBlob() API
			str    = atob( canvas.toDataURL('image/png').substr(22) );
			size   = str.length;
			data   = new Uint8Array(size);

			for (j = 0; j < size; ++j) {
				data[j] = str.charCodeAt(j);
			}

			_images[i] = URL.createObjectURL(new Blob([data], {type: 'image/png'}));
		}
	}


	/**
	 * Change the cursor for the button click event
	 */
	function bindMouseEvent()
	{
		// Add CSS rule for button
		var action = _action.actions[Cursor.ACTION.CLICK];
		var hover  = _images[action.animations[0].layers[0].index];
		var down   = _images[action.animations[1].layers[0].index];

		// Append CSS to head
		jQuery('head').append([
			'<style type="text/css">',
				'button { cursor: url(' + hover + '), auto; }',
				'button:active { cursor: url(' + down + '), auto; }',
			'</style>'
		].join('\n'));
	}


	/**
	 * Change cursor action
	 *
	 * @param {number} type - Cursor.ACTION.*
	 * @param {boolean} norepeat - repeat animation ?
	 * @param {number} animation numero (optional)
	 */
	Cursor.setType = function SetType( type, norepeat, animation )
	{
		if (Cursor.freeze) {
			return;
		}

		_type     = type;
		_tick     = Date.now();
		_norepeat = !!norepeat;
		_lastAnim = -1; // reset

		if (typeof animation !== 'undefined') {
			_animation = animation;
			_play      = false;
		}
		else {
			_animation = animation || 0;
			_play      = true;
		}
	};


	/**
	 * Render the cursor (update)
	 */
	Cursor.render = function render( tick )
	{
		// Not loaded yet.
		if (!Graphics.cursor || !_images.length) {
			return;
		}

		// New way
		var i, count;
		var action    = _action.actions[_type];
		var delay     = action.delay;
		var anim, frame;


		// Change animation based on frame
		switch (_type) {
			case Cursor.ACTION.DEFAULT:
				delay *= 2;
				break;

			case Cursor.ACTION.TARGET:
				delay /= 2;
				break;
		}


		if (_play) {
			frame = (tick - _tick) / delay | 0;
			if (_norepeat) {
				anim = Math.min( frame, action.animations.length - 1 );
			}
			else {
				anim = frame % action.animations.length;
			}
		}
		else {
			anim = _animation;
		}

		// Don't render the same animation twice
		// Save CPU...
		//if (anim === _lastAnim) {
		//	return;
		//}

		var animation  = action.animations[anim];
		var layers     = animation.layers;
		var  x = 1,  y = 19;
		var _x = 0, _y = 0;
		var url    = null;

		// Hardcoded ?
		switch (_type) {
			case Cursor.ACTION.TALK:
				x  = 20;
				y  = 40;
				_x = 20;
				_y = 20;
				break;
	
			case Cursor.ACTION.WARP:
				x = 10;
				y = 32;
				break;

			case Cursor.ACTION.ROTATE:
				x  = 18;
				y  = 26;
				_x = 10;
				break;

			case Cursor.ACTION.PICK:
				x  = 20;
				y  = 40;
				_x = 15;
				_y = 15;
				break;

			case Cursor.ACTION.TARGET:
				x  = 20;
				y  = 50;
				_x = 20;
				_y = 28;
				break;
		}

		// Cursor magnetism
		if (Cursor.magnetism) {
			var entity = EntityManager.getOverEntity();

			if (entity) {
				switch (entity.objecttype) {
					case Entity.TYPE_MOB:
					case Entity.TYPE_ITEM:
					_x += Math.floor( Mouse.screen.x - (entity.boundingRect.x1 + (entity.boundingRect.x2-entity.boundingRect.x1) / 2));
					_y += Math.floor( Mouse.screen.y - (entity.boundingRect.y1 + (entity.boundingRect.y2-entity.boundingRect.y1) / 2));
				}
			}
		}

		if (anim !== _lastAnim) {
			_lastAnim = anim;

			// Initialize context
			SpriteRenderer.bind2DContext(_ctx, x, y );
			_ctx.clearRect(0, 0, 50, 50);

			// Render layers
			for (i = 0, count = layers.length; i < count; ++i) {
				_entity.renderLayer( layers[i], _sprite, _sprite, _position, false );
			}

			// Display icons
			url = _canvas.toDataURL();
		}

		// Render only when there are changed
		if (_lastX !== _x || _lastY !== _y || (url && url !== _lastURL)) {
			_lastX   = _x;
			_lastY   = _y;
			_lastURL = url || _lastURL;

			if (_lastURL) {
				document.body.style.cursor = 'url('+ _lastURL +') ' + _lastX + ' ' + _lastY + ', auto';
			}
		}
	};


	/**
	 * Export
	 */
	return Cursor;
});