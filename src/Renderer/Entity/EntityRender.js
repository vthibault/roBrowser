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
		// Item falling
		if (this.objecttype === this.constructor.TYPE_ITEM) {
			this.position[2] = Math.max(
				Altitude.getCellHeight( this.position[0], this.position[1] ),
				this.position[2] - 0.4
			);
		}

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

		return function calculateBoundingRect( entity, matrix )
		{
			var z;
			var xFactor = 1 / (7 * entity.xSize);
			var yFactor = 1 / (7 * entity.ySize);

			// No body ? Default picking (sprite 110 for example)
			if (entity.boundingRect.x1 === Infinity ||
			    entity.boundingRect.x2 ===-Infinity ||
			    entity.boundingRect.y1 ===-Infinity ||
			    entity.boundingRect.y2 === Infinity) {
				entity.boundingRect.x1 = -25;
				entity.boundingRect.x2 = +25;
				entity.boundingRect.y1 = +45;
				entity.boundingRect.y2 =   0;
			}

			size[0]   = Renderer.width  * 0.5;
			size[1]   = Renderer.height * 0.5;
			vector[2] =  0.0;
			vector[3] =  1.0;

			// Swap x1 and x2 if needed
			if (entity.boundingRect.x1 > entity.boundingRect.x2) {
				z = entity.boundingRect.x1;
				entity.boundingRect.x1 = entity.boundingRect.x2;
				entity.boundingRect.x2 = z;
			}


			// Top left
			vector[0] = entity.boundingRect.x1 * xFactor;
			vector[1] = entity.boundingRect.y1 * yFactor;
			vec4.transformMat4( out, vector, matrix );

			z = out[3] === 0.0 ? 1.0 : ( 1.0 / out[3] );
			entity.boundingRect.x1 = size[0] + Math.round(size[0] * (out[0] * z));
			entity.boundingRect.y1 = size[1] - Math.round(size[1] * (out[1] * z));


			// Bottom right
			vector[0] = entity.boundingRect.x2 * xFactor;
			vector[1] = entity.boundingRect.y2 * yFactor;
			vec4.transformMat4( out, vector, matrix );

			z = out[3] === 0.0 ? 1.0 : ( 1.0 / out[3] );
			entity.boundingRect.x2 = size[0] + Math.round(size[0] * (out[0] * z));
			entity.boundingRect.y2 = size[1] - Math.round(size[1] * (out[1] * z));


			// Don't resize item
			if (entity.objecttype !== entity.constructor.TYPE_ITEM) {

				// Minimum picking size is 45x45 (official client feature)
				if (entity.boundingRect.x2 - entity.boundingRect.x1 < 90) {
					entity.boundingRect.x1 = (entity.boundingRect.x1 + entity.boundingRect.x2) * 0.5 - 45;
					entity.boundingRect.x2 = (entity.boundingRect.x1 + entity.boundingRect.x2) * 0.5 + 45;
				}

				if (entity.boundingRect.y2 - entity.boundingRect.y1 < 90) {
					entity.boundingRect.y1 = (entity.boundingRect.y1 + entity.boundingRect.y2) * 0.5 - 45;
					entity.boundingRect.y2 = (entity.boundingRect.y1 + entity.boundingRect.y2) * 0.5 + 45;
				}
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

				// Item shadow is smaller
				// TODO: find a better way
				if (this.objecttype === Entity.TYPE_ITEM) {
					this.xSize = this.ySize = 10;
					renderElement( this, this.files.shadow, 'shadow', _position, false );
					this.xSize = this.ySize = 5;
				}
				else {
					renderElement( this, this.files.shadow, 'shadow', _position, false );
				}
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
		var _result   = new Array(2);
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
				) % act.actions.length ];                      // Avoid overflow on action (ex: if there is just one action)

			// Find animation
			calcAnimation( entity, entity.action, action, type, Renderer.tick - entity.animation.tick, _result );
			var animation_id = _result[0];
			var sound_delay  = _result[1];
			var animation    = action.animations[animation_id];
			var layers       = animation.layers;

			// Play sound
			if (animation.sound > -1) {
				entity.soundPlay( act.sounds[animation.sound], sound_delay );
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
	 * Calculate animations
	 */
	function calcAnimation( entity, ACTION, action, type, time_passed, out )
	{
		// Fix for shadow
		if (type === 'shadow') {
			out[0] = 0;
			out[1] = 0;
			return;
		}

		// To avoid look up
		var animations_count  = action.animations.length;
		var animations_length = animations_count + 0;
		var delay             = action.delay + 0;
		var Entity            = entity.constructor;
		var headDir           = 0;

		// Delay on walk
		// TODO: search how works the delay on walk and aspd.
		if (type === 'body' && ACTION === entity.ACTION.WALK) {
			delay = delay / 150 * entity.walk.speed;
		}

		// Delay on attack
		else if (ACTION === entity.ACTION.ATTACK || ACTION === entity.ACTION.ATTACK1 || ACTION === entity.ACTION.ATTACK2 || ACTION === entity.ACTION.ATTACK3) {
			delay = entity.attack_speed / animations_count;
		}


		// If hat/hair, divide to 3 since there is doridori include
		// TODO: fixed, just on IDLE and SIT ?
		if (type === 'head' && ( ACTION === entity.ACTION.IDLE || ACTION === entity.ACTION.SIT )) {
			animations_count  = Math.floor( animations_count / 3 );
			headDir           = entity.headDir + 0;
		}


		// Animation stuff
		var anim, animation = entity.animation;

		// Get rid of doridori
		if (type === 'body' && entity.objecttype === Entity.TYPE_PC && ( ACTION === entity.ACTION.IDLE || ACTION === entity.ACTION.SIT )) {
			anim = entity.headDir;
		}

		// Don't play, so stop at the current frame.
		else if (animation.play === false) {
			anim  = Math.min(animation.frame, animations_length-1);
			delay = Infinity;
		}

		// Repeatable
		else if (animation.repeat) {
			anim = (
				Math.floor( time_passed / delay )  // animation based on time (with floor hack)
				% animations_count                 // avoid overflow, it's repeatable
				+ animations_count * headDir       // get rid of doridori
				+ animation.frame                  // don't forget the previous frame
			) % animations_length ;                // repeatable.
		}

		// No repeat
		else {
			anim = (
				Math.min( time_passed / delay | 0, animations_count || animations_count -1 )  // Avoid an error if animation = 0, search for -1 :(
				+ animations_count * headDir // get rid of doridori
				+ animation.frame            // previous frame
			);

			if (type === 'body' && anim >= animations_length - 1) {
				animation.frame = anim = animations_length - 1;
				animation.play  = false;
				if (animation.next) {
					entity.setAction( animation.next );
				}
			}

			anim  = Math.min( anim, animations_count-1 );
			delay = Infinity;
		}

		// Export
		out[0] = anim;
		out[1] = delay;
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

		var width   = spr.frames[ index ].width;
		var height  = spr.frames[ index ].height;

		// Apply the scale
		width  *= layer.scale[0] * size;
		height *= layer.scale[1] * size;


		// Get the entity bounding rect
		if (isbody) {
			this.boundingRect.x1 = Math.min( this.boundingRect.x1,  (layer.pos[0] + pos[0]) - width /2 );
			this.boundingRect.y1 = Math.max( this.boundingRect.y1, -(layer.pos[1] + pos[1]) + height/2 );
			this.boundingRect.x2 = Math.max( this.boundingRect.x2,  (layer.pos[0] + pos[0]) + width /2 );
			this.boundingRect.y2 = Math.min( this.boundingRect.y2, -(layer.pos[1] + pos[1]) - height/2 );
		}

		// Image rotation
		SpriteRenderer.angle = layer.angle;

		// Image inverted
		if (layer.is_mirror) {
			width = -width;
		}

		// Re-positionning image
		// The sprite in world should be a factor of 35 (not sure)
		var x = ( layer.pos[0] + pos[0] ) / ( this.xSize * 7 );
		var y = ( layer.pos[1] + pos[1] ) / ( this.ySize * 7 ) - 0.5; // in the middle of the cell: -0.5
		width  /= ( this.xSize * 7 );
		height /= ( this.ySize * 7 );


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
		SpriteRenderer.size[0]       = width;
		SpriteRenderer.size[1]       = height;
		SpriteRenderer.offset[0]     = x;
		SpriteRenderer.offset[1]     = y;
		SpriteRenderer.image.texture = spr.frames[ index ].texture;

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