/**
 * Renderer/Effects/SpriteEffect.js
 *
 * Rendering sprite as effect
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(['Core/Client', 'Renderer/SpriteRenderer'],
function(     Client,            SpriteRenderer )
{
	'use strict';


	/**
	 * SpriteEffect constructor
	 *
	 * @param {object} options
	 */
	function SpriteEffect( options )
	{
		this.entity    = options.entity || null;
		this.position  = options.entity ? options.entity.position : options.position;
		this.spr       = options.spr  || 'data/sprite/\xc0\xcc\xc6\xd1\xc6\xae/' + options.file + '.spr';
		this.act       = options.act  || 'data/sprite/\xc0\xcc\xc6\xd1\xc6\xae/' + options.file + '.act';
		this.tick      = options.tick || 0;
		this.uid       = options.uid;
		this.color     = options.color || [1.0, 1.0, 1.0, 1.0];
		this.head      = options.head  || false;
		this.direction = options.direction || false;
		this.frame     = options.frame || 0;
		this.depth     = options.depth || 0;
		this.autoClean = 'autoClean' in options ? options.autoClean : true;
		this.ready     = true;

		// Prepare sprite
		Client.loadFile(this.spr, null, null, {to_rgba:true});
	}


	/**
	 * Render in 3D effect
	 *
	 * @param {object} gl
	 * @param {number} tick
	 */
	SpriteEffect.prototype.render = function renderClosure()
	{
		var position = new Int16Array(2);

		return function render(gl, tick)
		{
			var spr, act;
			var frame, animations, layers;
			var delay, animation, i, count;

			spr   = Client.loadFile(this.spr);
			act   = Client.loadFile(this.act);

			if (!spr || !act) {
				return;
			}

			position[1]            = this.head ? -100 : 0;
			frame                  = ( this.direction ? (Camera.direction + this.entity.direction + 8) % 8 : this.frame) % act.actions.length;
			animations             = act.actions[frame].animations;
			delay                  = act.actions[frame].delay;

			SpriteRenderer.depth   = this.depth;
			SpriteRenderer.shadow  = 1.0;
			SpriteRenderer.position.set(this.position);

			// pause
			if (this.repeat) {
				layers = animations[ Math.floor((tick - this.tick) / delay) % animations.length].layers;
			}

			// stop at end
			else {
				animation = Math.min( Math.floor((tick - this.tick) / delay), animations.length-1);
				layers    = animations[animation].layers;

				if (animation === animations.length - 1 && this.autoClean) {
					this.needCleanUp = true;
				}
			}

			// render layers
			for (i = 0, count = layers.length; i < count; ++i) {
				this.renderLayer(layers[i], spr, position);
			}
		};
	}();


	/**
	 * Render Layer
	 *
	 * @param {object} layer
	 * @param {object} sprite
	 * @param {vec2} position
	 */
	SpriteEffect.prototype.renderLayer = function renderLayer(layer, spr, pos)
	{
		var index, is_rgba, x, y, width, height;

		// If there is nothing to render
		if (layer.index < 0) {
			return;
		}

		SpriteRenderer.image.palette = null;
		SpriteRenderer.sprite        = spr.frames[layer.index];
		SpriteRenderer.palette       = spr.palette;

		index   = layer.index + 0;
		is_rgba = layer.spr_type === 1 || spr.rgba_index === 0;

		if (!is_rgba) {
			SpriteRenderer.image.palette = spr.texture;
			SpriteRenderer.image.size[0] = spr.frames[ index ].width;
			SpriteRenderer.image.size[1] = spr.frames[ index ].height;
		}

		// RGBA is at the end of the spr.
		else if (layer.spr_type === 1) {
			index += spr.old_rgba_index;
		}

		width   = spr.frames[ index ].width;
		height  = spr.frames[ index ].height;

		// Apply the scale
		width  *= layer.scale[0];
		height *= layer.scale[1];

		// Image rotation
		SpriteRenderer.angle = layer.angle;

		// Image inverted
		if (layer.is_mirror) {
			width = -width;
		}

		// Re-positionning image
		// The sprite in world should be a factor of 35 (not sure)
		x       = ( layer.pos[0] + pos[0] ) / ( 5 * 7 );
		y       = ( layer.pos[1] + pos[1] ) / ( 5 * 7 ) - 0.5; // in the middle of the cell: -0.5
		width  /= ( 5 * 7 );
		height /= ( 5 * 7 );

		// copy color
		SpriteRenderer.color[0] = layer.color[0] * this.color[0];
		SpriteRenderer.color[1] = layer.color[1] * this.color[1];
		SpriteRenderer.color[2] = layer.color[2] * this.color[2];
		SpriteRenderer.color[3] = layer.color[3] * this.color[3];

		// Store shader info
		SpriteRenderer.size[0]   = width;
		SpriteRenderer.size[1]   = height;
		SpriteRenderer.offset[0] = x;
		SpriteRenderer.offset[1] = y;

		SpriteRenderer.image.texture = spr.frames[ index ].texture;

		// Draw Sprite
		SpriteRenderer.render();
	};


	/**
	 * Initialize SpriteRenderer Renderer
	 *
	 * @param {object} gl context
	 */
	SpriteEffect.ready = function init( gl )
	{
		SpriteRenderer.init(gl);
		this.ready = true;
	};


	/**
	 * Bind context
	 *
	 * @param {object} gl context
	 * @param {mat4} modelview
	 * @param {mat4} projection
	 * @param {object} fog structure
	 * @param {number} tick
	 */
	SpriteEffect.beforeRender = function beforeRender( gl, modelView, projection, fog, tick )
	{
		SpriteRenderer.bind3DContext( gl, modelView, projection, fog );
	};


	/**
	 * Unbind 3D Context
	 *
	 * @param {object} gl context
	 */
	SpriteEffect.afterRender = function afterRender( gl )
	{
		SpriteRenderer.unbind(gl);
	};


	/**
	 * Export
	 */
	return SpriteEffect;
});