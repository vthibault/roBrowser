/**
 * Renderer/Effects/Sky.js
 *
 * Rendering blue sky effects
 * TODO: Create a particle class to manage the process
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function( require )
{
	"use strict";


	/**
	 * Load dependencies
	 */
	var WebGL          = require('Utils/WebGL');
	var DB             = require('DB/DBManager');
	var Client         = require('Core/Client');
	var Session        = require('Engine/SessionStorage');
	var SpriteRenderer = require('Renderer/SpriteRenderer');
	var GLMatrix       = require('Utils/gl-matrix');
	var vec3           = GLMatrix.vec3;


	/**
	 * Renderer Namespace
	 */
	var MAX_CLOUDS   = 150;
	var _clouds      = new Array(MAX_CLOUDS);
	var _textures    = [];
	var _color       = null;
	var _display     = true;


	/**
	 * Prepare cloud data
	 *
	 * @param {object} gl context
	 * @param {string} mapname
	 */
	function Init( gl, mapname )
	{
		var color;
		var i;

		// Not found on weather, black sky, no cloud.
		if( !DB.weather.sky[mapname] ) {
			gl.clearColor( 0.0, 0.0, 0.0, 1.0);
			_display = false;
			return;
		}

		// Save color
		_color   = DB.weather.sky[mapname].cloudColor;
		color    = DB.weather.sky[mapname].skyColor;
		_display = true;
		gl.clearColor( color[0], color[1], color[2], color[3]);

		// Add images to GPU
		if( !_textures.length ) {
			_textures.length = 8;

			for( i=0; i<7; i++ ) {
				(function(i){
					Client.loadFile("data/texture/effect/cloud"+ (i+1) +".tga", function(buffer){
						WebGL.texture( gl, buffer, function( texture ) {
							_textures[i] = texture;
						});
					})
				})(i);
			}
		}
	}


	/**
	 * Set up cloud data
	 */
	function SetUpCloudData()
	{
		var i;

		// Add sprites to scene
		for( i=0; i<MAX_CLOUDS; i++ ) {
			if( !_clouds[i] ) {
				_clouds[i] = {
					position:  vec3.create(),
					direction: vec3.create()
				};
			}
			CloudInit(_clouds[i]);
			_clouds[i].sprite     = (Math.random()*(_textures.length-1)) | 0;
			_clouds[i].death_tick = _clouds[i].born_tick + Math.random()*8000;
			_clouds[i].born_tick  -= 2000;
		}

		// Sort by textures
		_clouds.sort(function(a,b){
			return a.sprite-b.sprite;
		});
	}


	/**
	 * Initialize cloud element
	 */
	function CloudInit( cloud )
	{
		var pos = Session.Entity.position;

		cloud.position[0]  =  pos[0] + (Math.random()*35 | 0) * (Math.random() > 0.5 ? 1 : -1);
		cloud.position[1]  =  pos[1] + (Math.random()*35 | 0) * (Math.random() > 0.5 ? 1 : -1);
		cloud.position[2]  = -10.0;

		cloud.direction[0] = Math.random()*0.02 - 0.01;
		cloud.direction[1] = Math.random()*0.02 - 0.01;
		cloud.direction[2] = Math.random()*0.002 - 0.001;

		cloud.born_tick    = Date.now();
		cloud.death_tick   = cloud.born_tick + 6*1000;
	}



	/**
	 * Rendering clouds on maps
	 *
	 * @param {object} gl context
	 * @param {mat4} modelView
	 * @param {mat4} projection
	 * @param {object} fog structure
	 * @param {number} tick - game tick
	 */
	function Render( gl, modelView, projection, fog, tick )
	{
		if( !_display ) {
			return;
		}

		var i, cloud, opacity;

		// Init program
		SpriteRenderer.bind3DContext( gl, modelView, projection, false, fog );

		// Base parameters
		SpriteRenderer.color.set(_color);
		SpriteRenderer.shadow    = 1.0;
		SpriteRenderer.pickindex = 0;
		SpriteRenderer.angle     = 0;
		SpriteRenderer.size[0]   = 15;
		SpriteRenderer.size[1]   = 15;
		SpriteRenderer.offset[0] = 0;
		SpriteRenderer.offset[1] = 0;
		SpriteRenderer.image.palette = null;

		for( i=0; i < MAX_CLOUDS; i++ ) {
			cloud   = _clouds[i];

			// Appear
			if( cloud.born_tick + 1000 > tick ) {
				opacity = (tick - cloud.born_tick) / 1000;
			}

			// Remove
			else if( cloud.death_tick + 2000 < tick ) {
				CloudInit(cloud);
				opacity = 0.0;
			}

			// Disapear
			else if( cloud.death_tick < tick ) {
				opacity = 1.0 - (tick - cloud.death_tick) / 2000;
			}

			// Default
			else {
				opacity = 1.0;
			}

			// Calculate position
			vec3.add( cloud.position, cloud.position, cloud.direction );
			SpriteRenderer.position.set(cloud.position);
			SpriteRenderer.color[3]      = opacity;
			SpriteRenderer.image.texture = _textures[cloud.sprite];

			SpriteRenderer.render();
		}

		// Clean up
		SpriteRenderer.unbind(gl);
	}


	/**
	 * Export
	 */
	return {
		init: Init,
		setUpCloudData: SetUpCloudData,
		render: Render
	};
});