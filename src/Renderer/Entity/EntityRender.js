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
	"use strict";


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
	 * @param {number} pick_index - color id to display
	 */
	function Render( modelView, projection, pick_index )
	{
		// Process sprite and render theme
		if( pick_index === 0 ) {

			// Item falling
			if( this.objecttype === this.constructor.TYPE_ITEM ) {
				this.position[2] = Math.max(
					Altitude.getCellHeight( this.position[0], this.position[1] ),
					this.position[2] - 0.4
				);
			}

			// Move character if walking
			if ( this.action === this.ACTION.WALK ) {
				this.walkProcess();
			}

			// Update character UI (life, dialog, etc.)
			this._renderGUI( modelView, projection );

			// Render it
			this._renderSub(0);
			return;
		}

		// No picking on dead entity (except if human)
		// and no render entity removed
		if ( (this.action !== this.ACTION.DIE || this.objecttype === this.constructor.TYPE_PC) && this.remove_tick === 0 ) {
			this._renderSub(pick_index);
		}
	}


	/**
	 * Calculate zIndex and render UI elements
	 *
	 * @param {mat4} modelView
	 * @param {mat4} projection
	 */
	var RenderGUI = function RenderGUIClosure()
	{
		var mat4    = glMatrix.mat4;
		var vec4    = glMatrix.vec4;
		var _matrix = mat4.create();
		var _vector = vec4.create();

		return function RenderGUI( modelView, projection )
		{
			// Move to camera
			_vector[0] =  this.position[0] + 0.5;
			_vector[1] = -this.position[2];
			_vector[2] =  this.position[1] + 0.5;
			mat4.translate( _matrix, modelView, _vector);
	
			// Set-up Spherical billboard
			_matrix[0] = 1.0; _matrix[1] = 0.0; _matrix[2]  = 0.0;
			_matrix[4] = 0.0; _matrix[5] = 1.0; _matrix[6]  = 0.0;
			_matrix[8] = 0.0; _matrix[9] = 0.0; _matrix[10] = 1.0;
	
			// Project to screen
			mat4.multiply( _matrix, projection, _matrix );
	
			// Get depth for rendering order
			_vector[0] = 0.0;
			_vector[1] = 0.0;
			_vector[2] = 0.0;
			_vector[3] = 1.0;
	
			vec4.transformMat4( _vector, _vector, _matrix );
			this.depth = _vector[3];
	
			// Display UI
			if( this.life.display )    this.life.render( _matrix );
			if( this.display.display ) this.display.render( _matrix );
			if( this.dialog.display )  this.dialog.render( _matrix );
			if( this.cast.display )    this.cast.render( _matrix );
		};
	}();



	/**
	 * Render Entity
	 *
	 * @param {number} pick_color - color index for picking
	 */
	var RenderSub = function RenderSubClosure()
	{
		var _position = new Int32Array(2);

		return function RenderSub( pick_color )
		{
			// Update shadow
			SpriteRenderer.shadow    = Ground.getShadowFactor( this.position[0], this.position[1] );
			SpriteRenderer.pickindex = pick_color;
	
			var animation  = this.animation;
			var Entity     = this.constructor;
			_position[0]   = 0;
			_position[1]   = 0;
	
			// Animation change ! Get it now
			if ( animation.save && animation.delay < Renderer.tick ) {
				this.setAction(animation.save);
			}
	
			// Picking only render body.
			if( pick_color ) {
				SpriteRenderer.position.set(this.position);
				this._renderElement( this.files.body, 'body', _position, true );
				return;
			}
	
			// Avoid look up, render as IDLE all not supported frames
			var action    = this.action === -1 ? this.ACTION.IDLE : this.action;
			var direction = ( Camera.direction + this.direction + 8 ) % 8;
			var behind    = direction > 1 && direction < 6;
	
			// Render shadow (shadow isn't render when player is sit or dead).
			if( action !== this.ACTION.DIE && action !== this.ACTION.SIT ) {
	
				// Shadow is base on gat height
				SpriteRenderer.position[0] = this.position[0];
				SpriteRenderer.position[1] = this.position[1];
				SpriteRenderer.position[2] = Altitude.getCellHeight(this.position[0], this.position[1]);
	
				// Item shadow is smaller
				// TODO: find a better way
				if( this.objecttype === Entity.TYPE_ITEM ) {
					this.xSize = this.ySize = 10;
					this._renderElement( this.files.shadow, 'shadow', _position, false );
					this.xSize = this.ySize = 5;
				}
				else {
					this._renderElement( this.files.shadow, 'shadow', _position, false );
				}
			}
	
			SpriteRenderer.position.set(this.position);
	
			// Shield is behind on some position, seems to be hardcoded by the client
			if( this.objecttype === Entity.TYPE_PC && this.shield && behind ) {
				this._renderElement( this.files.shield, 'shield', _position, true );
			}
	
			// Draw body, get head position
			this._renderElement( this.files.body, 'body', _position, true );
	
			if( this.objecttype === Entity.TYPE_PC ) {
				// Draw Head
				this._renderElement( this.files.head, 'head', _position, false);
	
				// Draw Hats
				if( this.accessory ) {
					this._renderElement( this.files.accessory, 'head', _position, false);
				}
	
				if( this.accessory2 && this.accessory2 !== this.accessory ) {
					this._renderElement( this.files.accessory2, 'head', _position, false);
				}
	
				if( this.accessory3 && this.accessory3 !== this.accessory2 && this.accessory3 !== this.accessory ) {
					this._renderElement( this.files.accessory3, 'head', _position, false);
				}
	
				// Draw Others elements
				if( this.weapon ) {
					this._renderElement( this.files.weapon, 'weapon', _position, true );
				}
	
				if( this.shield && !behind ) {
					this._renderElement( this.files.shield, 'shield', _position, true );
				}
			}
		};
	}();




	/**
	 * Render each Entity elements (body, head, hats, ...)
	 *
	 * @param {object} files {spr, act, pal}
	 * @param {string} type
	 * @param {vec2}   position (reference)
	 * @param {boolean} is_main - true if it's the main element (body)
	 */
	var RenderElement = function RenderElementClosure()
	{
		var _result   = new Array(2);
		var _position = new Int32Array(2);

		return function RenderElement( files, type, position, is_main )
		{
			// Nothing to render
			if( !files.spr || !files.act ) {
				return;
			}
	
			// Get back sprite and act
			var spr = Client.loadFile(files.spr);
			var act = Client.loadFile(files.act);
	
			// Not loaded yet
			if( !spr || !act ) {
				return;
			}
	
			// If palette, load palette, else get back sprite palette
			var pal = (files.pal && Client.loadFile(files.pal)) || spr;
	
			// Obtain animations from the action and direction.
			var action = act.actions[
				(( this.action * 8 ) +                         // Action
				( Camera.direction + this.direction + 8 ) % 8  // Direction
				) % act.actions.length ];                      // Avoid overflow on action (ex: if there is just one action)
	
			// Find animation
			var info         = this._calcAnimation( this.action, action, type, Renderer.tick - this.animation.tick, _result );
			var animation_id = _result[0];
			var sound_delay  = _result[1];
			var animation    = action.animations[animation_id];
			var layers       = animation.layers;

			// Play sound
			if( animation.sound > -1 ) {
				this.soundPlay( act.sounds [animation.sound], sound_delay );
			}
	
			_position[0] = 0;
			_position[1] = 0;

			if ( animation.pos.length && !is_main ) {
				_position[0] = position[0] - animation.pos[0].x;
				_position[1] = position[1] - animation.pos[0].y;
			}
	
			// Render all frames
			for ( var i=0, count=layers.length; i<count; ++i ) {
				this._renderLayer( layers[i], spr, pal, _position );
			}

			// Save reference
			if( is_main && animation.pos.length ) {
				position[0] = animation.pos[0].x;
				position[1] = animation.pos[0].y;
			}
		};
	}();


	/**
	 * Calculate animations
	 */
	function CalcAnimation( ACTION, action, type, time_passed, out )
	{
		// Fix for shadow
		if( type === "shadow" ) {
			out[0] = 0;
			out[1] = 0;
			return;
		}

		// To avoid look up
		var animations_count  = action.animations.length;
		var animations_length = animations_count + 0;
		var delay             = action.delay + 0;
		var Entity            = this.constructor;
		var headDir           = 0;

		// Delay on walk
		// TODO: search how works the delay on walk and aspd.
		if( type === "body" && ACTION === this.ACTION.WALK ) {
			delay = delay / 150 * this.walk.speed;
		}

		// Delay on attack
		else if( ACTION === this.ACTION.ATTACK  || ACTION === this.ACTION.ATTACK2 || ACTION === this.ACTION.ATTACK3 ) {
			delay = this.attack_speed / animations_count * 2;
		}


		// If hat/hair, divide to 3 since there is doridori include
		// TODO: fixed, just on IDLE and SIT ?
		if( type === "head" && ( ACTION === this.ACTION.IDLE || ACTION === this.ACTION.SIT ) ) {
			animations_count  = Math.floor( animations_count / 3 );
			headDir           = this.headDir + 0;
		}


		// Animation stuff
		var anim, animation = this.animation;

		// Get rid of doridori
		if ( type === "body" && this.objecttype === Entity.TYPE_PC && ( ACTION === this.ACTION.IDLE || ACTION === this.ACTION.SIT ) ) {
			anim = this.headDir;
		}

		// Don't play, so stop at the current frame.
		else if ( animation.play === false ) {
			anim = Math.min(animation.frame, animations_length-1);
		}

		// Repeatable, so stop at the last frame.
		else if ( animation.repeat ) {
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
				+ animation.frame                 // previous frame
			);

			if ( type === "body" && anim >= animations_length - 1 ) {
				animation.frame = anim = animations_length - 1;
				animation.play  = false;
				if ( animation.next ) {
					this.setAction( animation.next );
				}
			}

			anim = Math.min( anim, animations_count-1 );
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
	 * @param {Array} pos [x,y] where to render the sprite
	 */
	function RenderLayer( layer, spr, pal, pos )
	{
		// If there is nothing to render
		if ( layer.index < 0 ) {
			return;
		}

		SpriteRenderer.image.palette = null;
		SpriteRenderer.sprite        = spr.frames[layer.index];
		SpriteRenderer.palette       = pal.palette;

		var index   = layer.index + 0;
		var is_rgba = layer.spr_type === 1 || spr.rgba_index === 0;

		if( !is_rgba ) {
			SpriteRenderer.image.palette = pal.texture;
			SpriteRenderer.image.size[0] = spr.frames[ index ].width
			SpriteRenderer.image.size[1] = spr.frames[ index ].height
		}

		// RGBA is at the end of the spr.
		else if ( layer.spr_type === 1 ) {
			index += spr.old_rgba_index;
		}

		var width   = spr.frames[ index ].width;
		var height  = spr.frames[ index ].height;

		// Image inverted
		if ( layer.is_mirror ) {
			width = -width;
		}

		// Apply the scale
		width  *= layer.scale[0];
		height *= layer.scale[1];

		// Image rotation
		SpriteRenderer.angle = layer.angle;

		// Re-positionning image
		// The sprite in world should be a factor of 35 (not sure)
		var x = ( layer.pos[0] + pos[0] ) / ( this.xSize * 7 );
		var y = ( layer.pos[1] + pos[1] ) / ( this.ySize * 7 ) - 0.5; // in the middle of the cell: -0.5
		width  /= ( this.xSize * 7 );
		height /= ( this.ySize * 7 );


		// copy color
		SpriteRenderer.color[0] = layer.color[0];
		SpriteRenderer.color[1] = layer.color[1];
		SpriteRenderer.color[2] = layer.color[2];
		SpriteRenderer.color[3] = layer.color[3];

		// apply disapear
		if ( this.remove_tick ) {
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
		this.render         = Render;
		this._renderGUI     = RenderGUI;
		this._renderSub     = RenderSub;
		this._renderElement = RenderElement;
		this._renderLayer   = RenderLayer;
		this._calcAnimation = CalcAnimation;
	};
});