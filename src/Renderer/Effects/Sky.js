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
	'use strict';


	/**
	 * Load dependencies
	 */
	var WebGL          = require('Utils/WebGL');
	var WeatherTable   = require('DB/Effects/WeatherEffect');
	var Client         = require('Core/Client');
	var Session        = require('Engine/SessionStorage');
	var SpriteRenderer = require('Renderer/SpriteRenderer');
	var vec3           = require('Utils/gl-matrix').vec3;


	/**
	 * @var {number} number of clouds to render
	 */
	var MAX_CLOUDS = 150;


	/**
	 * @var {Array} clouds particles
	 */
	var _clouds = new Array(MAX_CLOUDS);


	/**
	 * @var {Array} textures list
	 */
	var _textures = [];


	/**
	 * @var {vec4} RGBA color
	 */
	var _color = null;


	/**
	 * @var {boolean} display clouds ?
	 */
	var _display     = true;


	/**
	 * Prepare cloud data
	 *
	 * @param {object} gl context
	 * @param {string} mapname
	 */
	function init( gl, mapname )
	{
		var color;
		var i;

		// Not found on weather, black sky, no cloud.
		if (!WeatherTable.sky[mapname]) {
			gl.clearColor( 0.0, 0.0, 0.0, 1.0);
			_display = false;
			return;
		}

		// Save color
		_color   = WeatherTable.sky[mapname].cloudColor;
		color    = WeatherTable.sky[mapname].skyColor;
		_display = true;

		gl.clearColor( color[0], color[1], color[2], color[3]);

		// Add images to GPU
		if (!_textures.length) {
			_textures.length = 8;

			for (i = 0; i < 7; i++) {
				loadCloudTexture(gl, i);
			}
		}
	}


	/**
	 * Loading cloud texture index
	 *
	 * @param {object} gl context
	 * @param {number} cloud texture index
	 */
	function loadCloudTexture( gl, i )
	{
		Client.loadFile('data/texture/effect/cloud' + (i+1) + '.tga', function(buffer) {
			WebGL.texture( gl, buffer, function(texture) {
				_textures[i] = texture;
			});
		});
	}


	/**
	 * Set up cloud data
	 */
	function setUpCloudData()
	{
		var i;

		// Add sprites to scene
		for (i = 0; i < MAX_CLOUDS; i++) {
			if (!_clouds[i]) {
				_clouds[i] = {
					position:   vec3.create(),
					direction:  vec3.create(),
					born_tick:  0,
					death_tick: 0
				};
			}
			cloudInit(_clouds[i]);
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
	function cloudInit( cloud )
	{
		var pos = Session.Entity.position;

		cloud.position[0]  = pos[0] + (Math.random()*35 | 0) * (Math.random() > 0.5 ? 1 : -1);
		cloud.position[1]  = pos[1] + (Math.random()*35 | 0) * (Math.random() > 0.5 ? 1 : -1);
		cloud.position[2]  = -10.0;

		cloud.direction[0] = Math.random()*0.02  - 0.01;
		cloud.direction[1] = Math.random()*0.02  - 0.01;
		cloud.direction[2] = Math.random()*0.002 - 0.001;

		cloud.born_tick    = cloud.death_tick ? cloud.death_tick + 2000 : Date.now();
		cloud.death_tick   = cloud.born_tick + 6000;
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
	function render( gl, modelView, projection, fog, tick )
	{
		if (!_display) {
			return;
		}

		var i, cloud, opacity;

		// Init program
		SpriteRenderer.bind3DContext( gl, modelView, projection, fog );

		// Base parameters
		SpriteRenderer.color.set(_color);
		SpriteRenderer.shadow        = 1.0;
		SpriteRenderer.angle         = 0;
		SpriteRenderer.size[0]       = 500;
		SpriteRenderer.size[1]       = 500;
		SpriteRenderer.offset[0]     = 0;
		SpriteRenderer.offset[1]     = 0;
		SpriteRenderer.image.palette = null;
		SpriteRenderer.depth         = 0;
		gl.depthMask(false);

		for (i = 0; i < MAX_CLOUDS; i++) {
			cloud = _clouds[i];

			// Appear
			if (cloud.born_tick + 1000 > tick) {
				opacity = (tick - cloud.born_tick) / 1000;
			}

			// Remove
			else if (cloud.death_tick + 2000 < tick) {
				cloudInit(cloud);
				opacity = 0.0;
			}

			// Disapear
			else if (cloud.death_tick < tick) {
				opacity = 1.0 - (tick - cloud.death_tick) / 2000;
			}

			// Default
			else {
				opacity = 1.0;
			}

			SpriteRenderer.zIndex        = 0;
			SpriteRenderer.color[3]      = opacity;
			SpriteRenderer.image.texture = _textures[cloud.sprite];

			// Calculate position
			vec3.add( cloud.position, cloud.position, cloud.direction );
			SpriteRenderer.position.set(cloud.position);
			SpriteRenderer.render();
		}

		// Clean up
		SpriteRenderer.unbind(gl);
		gl.depthMask(true);
	}


	/**
	 * Export
	 */
	return {
		init:           init,
		setUpCloudData: setUpCloudData,
		render:         render
	};
});