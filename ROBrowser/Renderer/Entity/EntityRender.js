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
	 * Import
	 */
	var mat4    = glMatrix.mat4;
	var _matrix = new Float32Array(4*4);
	var _vector = new Float32Array(4);


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
					this.position[2] * 0.8
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
	function RenderGUI( modelView, projection )
	{
		// Set up Camera
		mat4.translate( _matrix, modelView, [
			 this.position[0] + 0.5,
			-this.position[2],
			 this.position[1] + 0.5
		]);

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

		mat4.multiplyVec4( _matrix, _vector );
		this.depth = _vector[3];

		// Display UI
		if( this.life.display )    this.life.render( _matrix );
		if( this.display.display ) this.display.render( _matrix );
		if( this.dialog.display )  this.dialog.render( _matrix );
		if( this.cast.display )    this.cast.render( _matrix );
	}



	/**
	 * Render Entity
	 *
	 * @param {number} pick_color - color index for picking
	 */
	function RenderSub( pick_color )
	{
		// Update shadow
		SpriteRenderer.shadow    = Ground.getShadowFactor( this.position[0], this.position[2] );
		SpriteRenderer.pickindex = pick_color;

		var animation  = this.animation;
		var position   = [0, 0];
		var Entity     = this.constructor;

		// Animation change ! Get it now
		if ( animation.save && animation.delay < Renderer.tick ) {
			this.setAction(animation.save);
		}

		// Picking only render body.
		if( pick_color ) {
			SpriteRenderer.position.set(this.position);
			this._renderElement( this.files.body, 'body', position, true );
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
				this._renderElement( this.files.shadow, 'shadow', position, false );
				this.xSize = this.ySize = 5;
			}
			else {
				this._renderElement( this.files.shadow, 'shadow', position, false );
			}
		}

		SpriteRenderer.position.set(this.position);

		// Shield is behind on some position, seems to be hardcoded by the client
		if( this.objecttype === Entity.TYPE_PC && this.shield && behind ) {
			this._renderElement( this.files.shield, 'shield', position, true );
		}

		// Draw body, get head position
		this._renderElement( this.files.body, 'body', position, true );

		if( this.objecttype === Entity.TYPE_PC ) {
			// Draw Head
			this._renderElement( this.files.head, 'head', position, false);

			// Draw Hats
			if( this.accessory ) {
				this._renderElement( this.files.accessory, 'head', position, false);
			}

			if( this.accessory2 && this.accessory2 !== this.accessory ) {
				this._renderElement( this.files.accessory2, 'head', position, false);
			}

			if( this.accessory3 && this.accessory3 !== this.accessory2 && this.accessory3 !== this.accessory ) {
				this._renderElement( this.files.accessory3, 'head', position, false);
			}

			// Draw Others elements
			if( this.weapon ) {
				this._renderElement( this.files.weapon, 'weapon', position, true );
			}

			if( this.shield && !behind ) {
				this._renderElement( this.files.shield, 'shield', position, true );
			}
		}
	}




	/**
	 * Render each Entity elements (body, head, hats, ...)
	 *
	 * @param {object} files {spr, act, pal}
	 * @param {string} type
	 * @param {vec2}   position (reference)
	 * @param {boolean} is_main - true if it's the main element (body)
     */
	function RenderElement( files, type, position, is_main )
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
		var info         = this._calcAnimation( this.action, action, type, Renderer.tick - this.animation.tick );
		var animation_id = info[0];
		var sound_delay  = info[1];
		var animation    = action.animations[animation_id];
		var layers       = animation.layers;

		// Play sound
		if( animation.sound > -1 ) {
			this.soundPlay( act.sounds [animation.sound], sound_delay );
		}

		var pos = [0, 0];
		if ( animation.pos.length && !is_main ) {
			pos[0] = position[0] - animation.pos[0].x;
			pos[1] = position[1] - animation.pos[0].y;
		}

		// Render all frames
		for ( var i=0, count=layers.length; i<count; ++i ) {
			this._renderLayer( layers[i], spr, pal, pos );
		}

		// Save reference
		if( is_main && animation.pos.length ) {
			position[0] = animation.pos[0].x;
			position[1] = animation.pos[0].y;
		}
	}


	/**
	 * Calculate animations
	 */
	function CalcAnimation( ACTION, action, type, time_passed )
	{
		// To avoid look up
		var animations_count  = action.animations.length;
		var animations_length = animations_count + 0;
		var delay             = action.delay + 0;
		var Entity            = this.constructor;
		var headDir           = 0;

		// Fix for shadow
		if( type === "shadow" ) {
			return [0, 0];
		}

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
			animations_count /= 3;
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
			anim = animation.frame;
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
		}

		// anim %= animations_length;

		return [ anim, delay ];
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
		var width   = spr.frames[ index ].width;
		var height  = spr.frames[ index ].height;

		if( !is_rgba ) {
			SpriteRenderer.image.palette = pal.texture;
			SpriteRenderer.image.size[0] = width;
			SpriteRenderer.image.size[1] = height;
		}

		// RGBA is at the end of the spr.
		else if ( layer.spr_type === 1 ) {
			index += spr.old_rgba_index;
		}

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