/**
 * Renderer/EntityRender.js
 *
 * Entity class
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define( function( require )
{
	'use strict';


	/**
	 * Load dependencies
	 */
	var glMatrix       = require('Utils/gl-matrix');
	var Camera         = require('Renderer/Camera');
	var Client         = require('Core/Client');
	var Renderer       = require('Renderer/Renderer');
	var SpriteRenderer = require('Renderer/SpriteRenderer');
	var Ground         = require('Renderer/Map/Ground');
	var Altitude       = require('Renderer/Map/Altitude');


	/**
	 * Render an Entity
	 *
	 * @param {mat4} modelView
	 * @param {mat4} projection
	 */
	function render( modelView, projection )
	{
		// Process action
		this.animations.process();

		// Move character if walking
		if (this.action === this.ACTION.WALK) {
			this.walkProcess();
		}

		this.boundingRect.x1 =  Infinity;
		this.boundingRect.y1 = -Infinity;
		this.boundingRect.x2 = -Infinity;
		this.boundingRect.y2 =  Infinity;

		// Render it only if visible
		if (this.effectColor[3]) {
			this.renderEntity();
			this.attachments.render(Renderer.tick);
		}

		// Update character UI (life, dialog, etc.)
		renderGUI( this, modelView, projection );
	}


	/**
	 * Calculate zIndex and render UI elements
	 *
	 * @param {Entity}
	 * @param {mat4} modelView
	 * @param {mat4} projection
	 */
	var renderGUI = function renderGUIClosure()
	{
		var mat4    = glMatrix.mat4;
		var vec4    = glMatrix.vec4;
		var _matrix = mat4.create();
		var _vector = vec4.create();

		return function renderGUI( entity, modelView, projection )
		{
			// Move to camera
			_vector[0] =  entity.position[0] + 0.5;
			_vector[1] = -entity.position[2];
			_vector[2] =  entity.position[1] + 0.5;
			mat4.translate( _matrix, modelView, _vector);

			// Set-up Spherical billboard
			_matrix[0] = 1.0; _matrix[1] = 0.0; _matrix[2]  = 0.0;
			_matrix[4] = 0.0; _matrix[5] = 1.0; _matrix[6]  = 0.0;
			_matrix[8] = 0.0; _matrix[9] = 0.0; _matrix[10] = 1.0;

			// Project to screen
			mat4.multiply( _matrix, projection, _matrix );

			if (entity.effectColor[3] && entity._job !== 139) {
				calculateBoundingRect( entity, _matrix );
			}

			// Get depth for rendering order
			_vector[0] = 0.0;
			_vector[1] = 0.0;
			_vector[2] = 0.0;
			_vector[3] = 1.0;

			vec4.transformMat4( _vector, _vector, _matrix );
			entity.depth = _vector[3];

			// Display UI
			if (entity.life.display)    entity.life.render( _matrix );
			if (entity.display.display) entity.display.render( _matrix );
			if (entity.dialog.display)  entity.dialog.render( _matrix );
			if (entity.cast.display)    entity.cast.render( _matrix );
			if (entity.room.display)    entity.room.render( _matrix );
		};
	}();


	/**
	 * Calculate Bounding Rectangle
	 *
	 * @param {Entity}
	 * @param {mat4}
	 */
	var calculateBoundingRect = function calculateBoundingRectClosure()
	{
		var vec4   = glMatrix.vec4;
		var size   = glMatrix.vec2.create();
		var vector = vec4.create();
		var out    = vec4.create();

		function projectPoint(x, y, matrix) {
			vector[0] = x;
			vector[1] = y;
			vector[2] = 0.0;
			vector[3] = 1.0;

			vec4.transformMat4(out, vector, matrix);

			out[3]  = (out[3] === 0.0) ? 1.0 : (1.0 / out[3]);
			out[0] *= out[3];
			out[1] *= out[3];
		}


		return function calculateBoundingRect( entity, matrix )
		{
			var minSize, fx, fy;
			var tmp, rect;
			
			fx = entity.xSize / 175;
			fy = entity.ySize / 175;

			size[0] = Renderer.width  * 0.5;
			size[1] = Renderer.height * 0.5;

			rect    = entity.boundingRect;
			minSize = (entity.objecttype === entity.constructor.TYPE_ITEM) ? 30 : 60;

			// No body ? Default picking (sprite 110 for example)
			if (rect.x1 === Infinity || rect.x2 ===-Infinity ||
			    rect.y1 ===-Infinity || rect.y2 === Infinity) {
				rect.x1 = -25;
				rect.x2 = +25;
				rect.y1 = +45;
				rect.y2 =   0;
			}

			// Swap x1 and x2 if needed
			if (rect.x1 > rect.x2) {
				tmp     = rect.x1;
				rect.x1 = rect.x2;
				rect.x2 = tmp;
			}

			// Top left
			projectPoint(rect.x1 * fx, rect.y1 * fy, matrix);
			rect.x1 = size[0] + (size[0] * out[0]);
			rect.y1 = size[1] - (size[1] * out[1]);

			// Bottom right
			projectPoint(rect.x2 * fx, rect.y2 * fy, matrix);
			rect.x2 = size[0] + (size[0] * out[0]);
			rect.y2 = size[1] - (size[1] * out[1]);

			// Cap it to minSize
			if (rect.x2 - rect.x1 < minSize) {
				rect.x1 = (rect.x1 + rect.x2) * 0.5 - (minSize * 0.5);
				rect.x2 = rect.x1 + minSize;
			}

			if (rect.y2 - rect.y1 < minSize) {
				rect.y1 = (rect.y1 + rect.y2) * 0.5 - (minSize * 0.5);
				rect.y2 = rect.y1 + minSize;
			}
		};
	}();


	/**
	 * Render Entity
	 */
	var renderEntity = function renderEntityClosure()
	{
		var _position = new Int32Array(2);

		return function renderEntity()
		{
			// Update shadow
			SpriteRenderer.shadow = Ground.getShadowFactor( this.position[0], this.position[1] );
			SpriteRenderer.zIndex = 1;
			
			var animation  = this.animation;
			var Entity     = this.constructor;
			_position[0]   = 0;
			_position[1]   = 0;

			// Animation change ! Get it now
			if (animation.save && animation.delay < Renderer.tick) {
				this.setAction(animation.save);
			}

			// Avoid look up, render as IDLE all not supported frames
			var action    = this.action < 0 ? this.ACTION.IDLE : this.action;
			var direction = (Camera.direction + this.direction + 8) % 8;
			var behind    = direction > 1 && direction < 6;

			// Render shadow (shadow isn't render when player is sit or dead).
			if (action !== this.ACTION.DIE && action !== this.ACTION.SIT) {
	
				// Shadow is base on gat height
				SpriteRenderer.position[0] = this.position[0];
				SpriteRenderer.position[1] = this.position[1];
				SpriteRenderer.position[2] = Altitude.getCellHeight(this.position[0], this.position[1]);

				renderElement( this, this.files.shadow, 'shadow', _position, false );
			}

			SpriteRenderer.position.set(this.position);

			// Shield is behind on some position, seems to be hardcoded by the client
			if (this.objecttype === Entity.TYPE_PC && this.shield && behind) {
				renderElement( this, this.files.shield, 'shield', _position, true );
			}

			// Draw body, get head position
			renderElement( this, this.files.body, 'body', _position, true );

			if (this.objecttype === Entity.TYPE_PC) {
				// Draw Head
				renderElement( this, this.files.head, 'head', _position, false);

				// Hat Bottom
				if (this.accessory > 0) {
					renderElement( this, this.files.accessory, 'head', _position, false);
				}

				// Hat Middle
				if (this.accessory3 > 0 && this.accessory3 !== this.accessory2 && this.accessory3 !== this.accessory) {
					renderElement( this, this.files.accessory3, 'head', _position, false);
				}

				// Hat Top
				if (this.accessory2 > 0 && this.accessory2 !== this.accessory) {
					renderElement( this, this.files.accessory2, 'head', _position, false);
				}

				// Draw Others elements
				if (this.weapon > 0) {
					renderElement( this, this.files.weapon, 'weapon', _position, true );
				}

				if (this.shield > 0 && !behind) {
					renderElement( this, this.files.shield, 'shield', _position, true );
				}
			}
		};
	}();




	/**
	 * Render each Entity elements (body, head, hats, ...)
	 *
	 * @param {Entity}
	 * @param {object} files {spr, act, pal}
	 * @param {string} type
	 * @param {vec2}   position (reference)
	 * @param {boolean} is_main - true if it's the main element (body)
	 */
	var renderElement = function renderElementClosure()
	{
		var _position = new Int32Array(2);

		return function renderElement( entity, files, type, position, is_main )
		{
			// Nothing to render
			if (!files.spr || !files.act) {
				return;
			}

			// Get back sprite and act
			var spr = Client.loadFile(files.spr);
			var act = Client.loadFile(files.act);
	
			// Not loaded yet
			if (!spr || !act) {
				return;
			}

			// If palette, load palette, else get back sprite palette
			var pal = (files.pal && Client.loadFile(files.pal)) || spr;

			// Obtain animations from the action and direction.
			var action = act.actions[
				(( entity.action * 8 ) +                         // Action
				( Camera.direction + entity.direction + 8 ) % 8  // Direction
				) % act.actions.length ];                        // Avoid overflow on action (ex: if there is just one action)

			// Find animation
			var animation_id = calcAnimation( entity, action, type, Renderer.tick - entity.animation.tick);
			var animation    = action.animations[animation_id];
			var layers       = animation.layers;

			// Play sound
			if (animation.sound > -1) {
				entity.sound.play( act.sounds[animation.sound], entity.action, animation_id );
			}

			_position[0] = 0;
			_position[1] = 0;

			if (animation.pos.length && !is_main) {
				_position[0] = position[0] - animation.pos[0].x;
				_position[1] = position[1] - animation.pos[0].y;
			}

			// Render all frames
			for (var i=0, count=layers.length; i<count; ++i) {
				entity.renderLayer( layers[i], spr, pal, files.size, _position, type === 'body' );
			}

			// Save reference
			if (is_main && animation.pos.length) {
				position[0] = animation.pos[0].x;
				position[1] = animation.pos[0].y;
			}
		};
	}();


    /**
     * Get animation delay
     * TODO: search how works the delay on walk and aspd.
     *
     * @param {string} type
     * @param {string} entity
     * @param {object} act
     * @returns {number} delay
     */
    function getAnimationDelay(type, entity, act) {
        if (type === 'body' && entity.action === entity.ACTION.WALK) {
            return act.delay / 150 * entity.walk.speed;
        }

        // Delay on attack
        if (entity.action === entity.ACTION.ATTACK  ||
            entity.action === entity.ACTION.ATTACK1 ||
            entity.action === entity.ACTION.ATTACK2 ||
            entity.action === entity.ACTION.ATTACK3) {
            return entity.attack_speed / act.animations.length;
        }

        return act.delay;
    }


	/**
	 * Calculate animations
	 */
	function calcAnimation( entity, act, type, tick)
	{
		// Fix for shadow
		if (type === 'shadow') {
			return 0;
		}

		// To avoid look up
		var ACTION    = entity.ACTION;
		var action    = entity.action;
		var animation = entity.animation;
		var animCount = act.animations.length;
		var animSize  = animCount;
		var isIdle    = (action === ACTION.IDLE || action === ACTION.SIT);
		var delay     = getAnimationDelay(type, entity, act);
		var headDir   = 0;
		var anim      = 0;

		// Get rid of doridori
		if (type === 'body' && entity.objecttype === entity.constructor.TYPE_PC && isIdle) {
			return entity.headDir;
		}

		// Don't play, so stop at the current frame.
		if (animation.play === false) {
			return Math.min(animation.frame, animSize-1);
		}

		// If hat/hair, divide to 3 since there is doridori include
		// TODO: fixed, just on IDLE and SIT ?
		if (type === 'head' && isIdle) {
			animCount = Math.floor(animCount / 3);
			headDir   = entity.headDir;
		}

		// Repeatable
		if (animation.repeat) {
			anim = Math.floor(tick / delay);

			entity.sound.freeOnAnimationEnd(anim, animCount);

			anim %= animCount;
			anim += animCount * headDir; // get rid of doridori
			anim += animation.frame;     // don't forget the previous frame
			anim %= animSize;            // avoid overflow

			return anim;
		}

		// No repeat
		anim = (
			Math.min(tick / delay | 0, animCount || animCount -1)  // Avoid an error if animation = 0, search for -1 :(
			+ animCount * headDir // get rid of doridori
			+ animation.frame     // previous frame
		);

		if (type === 'body' && anim >= animSize - 1) {
			animation.frame = anim = animSize - 1;
			animation.play  = false;
			if (animation.next) {
				entity.setAction( animation.next );
			}
		}

		return Math.min( anim, animCount-1 );
	}


	/**
	 * Render ROSprite Render
	 *
	 * @param {object} layer structure
	 * @param {object} spr sprite structure
	 * @param {object} pal palette structure
	 * @param {float}  sprite size
	 * @param {Array} pos [x,y] where to render the sprite
	 * @param {bool} is main body
	 */
	function renderLayer( layer, spr, pal, size, pos, isbody )
	{
		// If there is nothing to render
		if (layer.index < 0) {
			return;
		}

		SpriteRenderer.image.palette = null;
		SpriteRenderer.sprite        = spr.frames[layer.index];
		SpriteRenderer.palette       = pal.palette;

		var index   = layer.index + 0;
		var is_rgba = layer.spr_type === 1 || spr.rgba_index === 0;

		if (!is_rgba) {
			SpriteRenderer.image.palette = pal.texture;
			SpriteRenderer.image.size[0] = spr.frames[ index ].width;
			SpriteRenderer.image.size[1] = spr.frames[ index ].height;
		}

		// RGBA is at the end of the spr.
		else if (layer.spr_type === 1) {
			index += spr.old_rgba_index;
		}

		var frame  = spr.frames[ index ];
		var width  = frame.width;
		var height = frame.height;

		// Apply the scale
		width  *= layer.scale[0] * size;
		height *= layer.scale[1] * size;


		// Get the entity bounding rect
		if (isbody) {
			var w = (frame.originalWidth  * layer.scale[0] * size) / 2;
			var h = (frame.originalHeight * layer.scale[1] * size) / 2;

			this.boundingRect.x1 = Math.min( this.boundingRect.x1,  (layer.pos[0] + pos[0]) - w );
			this.boundingRect.y1 = Math.max( this.boundingRect.y1, -(layer.pos[1] + pos[1]) + h );
			this.boundingRect.x2 = Math.max( this.boundingRect.x2,  (layer.pos[0] + pos[0]) + w );
			this.boundingRect.y2 = Math.min( this.boundingRect.y2, -(layer.pos[1] + pos[1]) - h );
		}

		// Image inverted
		if (layer.is_mirror) {
			width = -width;
		}

		// copy color
		SpriteRenderer.color[0] = layer.color[0] * this.effectColor[0];
		SpriteRenderer.color[1] = layer.color[1] * this.effectColor[1];
		SpriteRenderer.color[2] = layer.color[2] * this.effectColor[2];
		SpriteRenderer.color[3] = layer.color[3] * this.effectColor[3];

		// apply disapear
		if (this.remove_tick) {
			SpriteRenderer.color[3] *= 1 - ( Renderer.tick - this.remove_tick  ) / this.remove_delay;
		}

		// Store shader info
		SpriteRenderer.angle         = layer.angle;
		SpriteRenderer.size[0]       = width;
		SpriteRenderer.size[1]       = height;
		SpriteRenderer.offset[0]     = layer.pos[0] + pos[0];
		SpriteRenderer.offset[1]     = layer.pos[1] + pos[1];
		SpriteRenderer.xSize         = this.xSize;
		SpriteRenderer.ySize         = this.ySize;
		SpriteRenderer.image.texture = frame.texture;

		// Draw Sprite
		SpriteRenderer.render();
	}


	/**
	 * Export
	 */
	return function Init()
	{
		this.render         = render;
		this.renderLayer    = renderLayer;
		this.renderEntity   = renderEntity;
	};
});