/**
 * UI/CursorManager.js
 *
 * Display Cursor
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function( require )
{
	'use strict';


	// Load dependencies
	var jQuery        = require('Utils/jquery');
	var Client        = require('Core/Client');
	var MemoryManager = require('Core/MemoryManager');
	var Graphics      = require('Preferences/Graphics');
	var Sprite        = require('Loaders/Sprite');
	var Action        = require('Loaders/Action');
	var getModule     = require;


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
		LOCK:    3,
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
	 */
	Cursor.magnetism = true;


	/**
	 * @var {boolean} force disabled magnetism
	 * Used to cast zone skill to ground
	 */
	Cursor.blockMagnetism = false;


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
	 * @var {number} last style id rendered
	 */
	var _lastStyleId = -1;


	/**
	 * @var {number} last rendered position x
	 */
	var _lastX = 0;


	/**
	 * @var {number} last renderer position y
	 */
	var _lastY = 0;


	/**
	 * @var {Array} css style list
	 */
	var _compiledStyle = [];


	/**
	 * @var {Sprite} sprite
	 */
	var _sprite;


	/**
	 * @var {Action} action
	 */
	var _action;


	/**
	 * Define sprite informations (hardcoded)
	 */
	var ActionInformations = {};
	ActionInformations[ Cursor.ACTION.DEFAULT ] = { drawX:  1, drawY: 19, startX:  0, startY:  0, delayMult: 2.0 };
	ActionInformations[ Cursor.ACTION.TALK    ] = { drawX: 20, drawY: 40, startX: 20, startY: 20, delayMult: 1.0 };
	ActionInformations[ Cursor.ACTION.WARP    ] = { drawX: 10, drawY: 32, startX:  0, startY:  0, delayMult: 1.0 };
	ActionInformations[ Cursor.ACTION.ROTATE  ] = { drawX: 18, drawY: 26, startX: 10, startY:  0, delayMult: 1.0 };
	ActionInformations[ Cursor.ACTION.PICK    ] = { drawX: 20, drawY: 40, startX: 15, startY: 15, delayMult: 1.0 };
	ActionInformations[ Cursor.ACTION.TARGET  ] = { drawX: 20, drawY: 50, startX: 20, startY: 28, delayMult: 0.5 };


	var EntityManager, Entity, SpriteRenderer, Mouse;


	/**
	 * Load cursor data (action, sprite)
	 */
	Cursor.init = function init(fn)
	{
		// Already loaded
		if (_sprite) {
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

			// Load it properly later using webgl
			MemoryManager.remove(null, 'data/sprite/cursors.spr');
			MemoryManager.remove(null, 'data/sprite/cursors.act');

			bindMouseEvent();
			preCompiledAnimations();
			fn();

		});

		EntityManager  = getModule('Renderer/EntityManager');
		Entity         = getModule('Renderer/Entity/Entity');
		SpriteRenderer = getModule('Renderer/SpriteRenderer');
		Mouse          = getModule('Controls/MouseEventHandler');
	};



	/**
	 * Change the cursor for the button click event
	 */
	function bindMouseEvent()
	{
		// Convert an image from an action to a blob url
		function generateImage(index)
		{
			var canvas, binary, data;
			var i, count;

			canvas = _sprite.getCanvasFromFrame(index);
			if (!canvas) {
				return '';
			}

			binary = atob( canvas.toDataURL('image/png').replace(/^data[^,]+,/,'') );
			count  = binary.length;
			data   = new Uint8Array(count);

			for (i = 0; i < count; ++i) {
				data[i] = binary.charCodeAt(i);
			}

			return URL.createObjectURL(new Blob([data], {type: 'image/png'}));
		}

		// Add CSS rule for button
		var action = _action.actions[Cursor.ACTION.CLICK];
		var hover  = generateImage(action.animations[0].layers[0].index);
		var down   = generateImage(action.animations[1].layers[0].index);

		// Append CSS to head
		jQuery('head').append([
			'<style type="text/css">',
				'button { cursor: url(' + hover + '), auto; }',
				'button:active { cursor: url(' + down + '), auto; }',
			'</style>'
		].join('\n'));
	}


	/**
	 * Start pre-compiling animation to avoid building sprites
	 * during the rendering loop
	 */
	function preCompiledAnimations()
	{
		var i, j, k, count, size, total, pos;
		var action, animation, info;
		var canvas, ctx, entity;
		var binary, data, dataURI;
		var dataURIList, position;

		// Start initializing variables
		canvas         = document.createElement('canvas');
		canvas.width   = 50;
		canvas.height  = 50;
		ctx            = canvas.getContext('2d');
		entity         = new Entity();
		dataURIList    = [];
		_compiledStyle = [];
		position       = [0,0];

		// Start compiling animation
		for (i = 0, count = _action.actions.length; i < count; ++i) {

			action = _action.actions[i];
			info   = ActionInformations[i] || ActionInformations[ Cursor.ACTION.DEFAULT ];

			for (j = 0, size = action.animations.length; j < size; ++j) {

				animation = action.animations[j];

				// Initialize context
				SpriteRenderer.bind2DContext(ctx, info.drawX, info.drawY );
				ctx.clearRect(0, 0, 50, 50);

				// Render layers
				for (k = 0, total = animation.layers.length; k < total; ++k) {
					entity.renderLayer( animation.layers[k], _sprite, _sprite, 1.0, position, false);
				}

				dataURI = canvas.toDataURL('image/png');
				pos     = dataURIList.indexOf(dataURI);

				// Already build
				if (pos > -1) {
					animation.compiledStyleIndex = pos;
					continue;
				}

				// Modify the canvas to a file object
				binary = atob( dataURI.replace(/^data[^,]+,/,'') );
				total  = binary.length;
				data   = new Uint8Array(total);

				for (k = 0; k < total; ++k) {
					data[k] = binary.charCodeAt(k);
				}

				// Store it.
				animation.compiledStyleIndex = _compiledStyle.length;

				dataURIList.push(dataURI);
				_compiledStyle.push(URL.createObjectURL(new Blob([data.buffer], {type:'image/png'})));
			}
		}
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
		if (!Graphics.cursor || !_compiledStyle.length) {
			return;
		}

		var info   = ActionInformations[_type] || ActionInformations[Cursor.ACTION.DEFAULT];
		var action = _action.actions[_type];
		var anim   = _animation;
		var delay  = action.delay * info.delayMult;
		var x      = info.startX;
		var y      = info.startY;
		var animation;

		// Repeat / No-repeat features
		if (_play) {
			var frame = (tick - _tick) / delay | 0;
			if (_norepeat) {
				anim = Math.min( frame, action.animations.length - 1 );
			}
			else {
				anim = frame % action.animations.length;
			}
		}

		animation = action.animations[anim];

		// Issue #61 - Not able to reproduce
		// If someone got more informations...
		if (!animation) {
			return;
		}

		// Cursor magnetism
		if (Cursor.magnetism && !Cursor.blockMagnetism) {
			var entity = EntityManager.getOverEntity();

			if (entity &&
			    (entity.objecttype === Entity.TYPE_MOB ||
			     entity.objecttype === Entity.TYPE_ITEM)) {
				x += Math.floor( Mouse.screen.x - (entity.boundingRect.x1 + (entity.boundingRect.x2-entity.boundingRect.x1) / 2));
				y += Math.floor( Mouse.screen.y - (entity.boundingRect.y1 + (entity.boundingRect.y2-entity.boundingRect.y1) / 2));
			}
		}

		// Rendering if cursor changed
		if (animation.compiledStyleIndex !== _lastStyleId || x !== _lastX || y !== _lastY) {
			_lastStyleId = animation.compiledStyleIndex;
			_lastX       = x;
			_lastY       = y;

			document.body.style.cursor = 'url(' + _compiledStyle[_lastStyleId] + ') ' + x + ' ' + y + ', auto';
		}
	};


	/**
	 * Export
	 */
	return Cursor;
});