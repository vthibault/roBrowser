/**
 * UI/Components/StrViewer/StrViewer.js
 *
 * Model Viewer (rsm file)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function(require)
{
	'use strict';


	/**
	 * Load dependencies
	 */
	var glMatrix           = require('Utils/gl-matrix');
	var Client             = require('Core/Client');
	var Configs            = require('Core/Configs');
	var Renderer           = require('Renderer/Renderer');
	var EffectManager      = require('Renderer/EffectManager');
	var StrEffect          = require('Renderer/Effects/StrEffect');
	var Camera             = require('Renderer/Camera');

	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var htmlText           = require('text!./StrViewer.html');
	var cssText            = require('text!./StrViewer.css');

	var mat4               = glMatrix.mat4;


	/**
	 * @var {object} fog structure
	 */
	var _fog   = {
		use:    false,
		exist:  true,
		far:    30,
		near:   180,
		factor: 1.0,
		color:  new Float32Array([1,1,1])
	};


	/**
	 * @var {object} model View mat
	 */
	var _modelView = mat4.create();


	/**
	 * @var {StrEffect} current effect
	 */
	var _strObject = null;


	/**
	 * Create GRFViewer component
	 */
	var Viewer = new UIComponent( 'StrViewer', htmlText, cssText );


	/**
	 * Initialize Component
	 */
	Viewer.init = function Init()
	{
		// Initialize WebGL
		Renderer.init({
			alpha:              false,
			depth:              true,
			stencil:            false,
			antialias:          true,
			premultipliedAlpha: false,
		});

		Renderer.show();
		EffectManager.init(Renderer.getContext());
		Client.init([]);

		// Initialize the dropdown
		if (!Configs.get('API')) {
			initDropDown( this.ui.find('select').get(0) );
		}
		else {
			var hash      = decodeURIComponent(location.hash);
			location.hash = hash;
			loadEffect( hash.substr(1) );
		}
	};


	/**
	 * Initialise Drop Down list
	 *
	 * @param {HTMLElement} drop down
	 */
	function initDropDown( select )
	{
		// Search RSMs from the client
		Client.search(/data\\[^\0]+\.str/gi, function( list ) {
			var i, count;
			var hash;

			list.sort();

			// Add selection
			for (i = 0, count = list.length; i < count; ++i){
				list[i] = list[i].replace(/\\/g,'/');
				select.add( new Option(list[i], list[i]), null );
			}

			// Bind change
			select.onchange = function() {
				loadEffect(location.hash = this.value);
			};

			// Start loading a model ?
			hash          = decodeURIComponent(location.hash);
			location.hash = hash;

			// Load RSM from url ?
			if (hash.indexOf('.rsm' ) !== -1) {
				loadEffect( hash.substr(1) );
				select.value = hash.substr(1);
			}
			else {
				loadEffect( select.value );
			}

			Viewer.ui.find('.head').show();
			select.focus();
		});
	}


	/**
	 * Start loading an effect
	 *
	 * @param {string} filename
	 */
	function loadEffect( filename )
	{
		stop();

		Client.loadFile( filename, function(buf) {

			if (_strObject) {
				_strObject._needCleanUp = true;
			}

			_strObject = new StrEffect( filename, [0,0,0], Renderer.tick);
			_strObject._needCleanUp = false;

			// Hacky way
			Object.defineProperty( _strObject, 'needCleanUp', {
				// Get stat
				get: function(){ return this._needCleanUp; },

				// Repeat
				set: function(val){
					if (val) {
						this.startTick = Renderer.tick;
					}
				}
			});


			EffectManager.add( _strObject, 0);
			Renderer.render(render);
		});
	}


	/**
	 * Stop to render
	 */
	function stop()
	{
		var gl = Renderer.getContext();

		Renderer.stop();
		EffectManager.free(gl);
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	}


	/**
	 * Rendering scene
	 *
	 * @param {number} tick
	 * @param {object} webgl context
	 */
	function render( tick, gl )
	{
		// Updating camera position
		mat4.identity( _modelView );
		mat4.translate( _modelView, _modelView, [ 0, -3, -50] );
		mat4.rotateX( _modelView, _modelView, (50/180) * Math.PI );

		// Clear screen, update camera
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

		EffectManager.render( gl, _modelView, Camera.projection, _fog, tick, false);
	}


	/**
	 * Exports methods
	 */
	Viewer.loadEffect = loadEffect;
	Viewer.stop       = stop;


	/**
	 * Stored component and return it
	 */
	return UIManager.addComponent(Viewer);
});