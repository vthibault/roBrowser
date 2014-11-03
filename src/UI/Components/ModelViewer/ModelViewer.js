/**
 * UI/Components/ModelViewer/ModelViewer.js
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
	var Configs            = require('Core/Configs');
	var Client             = require('Core/Client');
	var Model              = require('Loaders/Model');
	var Renderer           = require('Renderer/Renderer');
	var ModelRenderer      = require('Renderer/Map/Models');
	var Camera             = require('Renderer/Camera');

	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var htmlText           = require('text!./ModelViewer.html');
	var cssText            = require('text!./ModelViewer.css');

	var mat4               = glMatrix.mat4;
	var mat3               = glMatrix.mat3;


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
	 * @var {object} light structure
	 */
	var _light = {
		opacity:   1.0,
		ambient:   new Float32Array([1,1,1]),
		diffuse:   new Float32Array([0,0,0]),
		direction: new Float32Array([0,1,0]),
	};


	/**
	 * @var {object} model global parameters
	 */
	var _GlobalParameters = {
		position: new Float32Array(3),
		rotation: new Float32Array(3),
		scale:    new Float32Array([-0.075,-0.075,0.075]),
		filename: null
	};


	/**
	 * @var {mat4} model view mat
	 */
	var _modelView = new Float32Array(4*4);


	/**
	 * @var {mat3} normal Mat
	 */
	var _normalMat = new Float32Array(3*3);


	/**
	 * @var {object} current model
	 */
	var _model = null;


	/**
	 * Create GRFViewer component
	 */
	var Viewer = new UIComponent( 'GRFViewer', htmlText, cssText );


	/**
	 * Initialize Component
	 */
	Viewer.init = function Init()
	{
		// Initialize WebGL
		Renderer.init({
			alpha:              true,
			depth:              true,
			stencil:            false,
			antialias:          true,
			premultipliedAlpha: false,
		});
		Renderer.show();

		// Initialize the dropdown
		if (!Configs.get('API')) {
			initDropDown( this.ui.find('select').get(0) );
		}
		else {
			var hash      = decodeURIComponent(location.hash);
			location.hash = hash;
			loadModel( hash.substr(1) );
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
		Client.search(/data\\[^\0]+\.rsm/gi, function( list ) {
			var i, count;
			var hash;

			// Add selection
			for (i = 0, count = list.length; i < count; ++i){
				list[i] = list[i].replace(/\\/g,'/');
				select.add( new Option(list[i], list[i]), null );
			}

			// Bind change
			select.onchange = function() {
				loadModel(location.hash = this.value);
			};

			// Start loading a model ?
			hash          = decodeURIComponent(location.hash);
			location.hash = hash;

			// Load RSM from url ?
			if (hash.indexOf('.rsm' ) !== -1) {
				loadModel( hash.substr(1) );
				select.value = hash.substr(1);
			}
			else {
				loadModel( select.value );
			}

			Viewer.ui.find('.head').show();
			select.focus();
		});
	}


	/**
	 * Stop to render
	 */
	function stop()
	{
		var gl = Renderer.getContext();

		Renderer.stop();
		ModelRenderer.free(gl);
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	}


	/**
	 * Start loading a model
	 *
	 * @param {string} filename
	 */
	function loadModel( filename )
	{
		stop();

		Client.getFile( filename, function( buf ) {

			_model = new Model(buf);

			var data;
			var i, count, j, size, total, offset, length, pos;
			var objects = [], infos = [], meshes, index, object;
			var buffer;

			// Create model in world
			_GlobalParameters.filename = filename.replace('data/model/','');
			_model.createInstance( _GlobalParameters, 0, 0);

			// Compile model
			data  = _model.compile();
			count = data.meshes.length;
			total = 0;

			// Extract meshes
			for (i = 0, count = data.meshes.length; i < count; ++i) {
				meshes = data.meshes[i];
				index  = Object.keys(meshes);

				for (j = 0, size = index.length; j < size; ++j) {
					objects.push({
						texture: data.textures[index[j]],
						alpha:   _model.alpha,
						mesh:    meshes[index[j]]
					});

					total += meshes[index[j]].length;
				}
			}

			buffer   = new Float32Array(total);
			count    = objects.length;
			pos      = 0;
			offset   = 0;

			// Merge meshes to buffer
			for (i = 0; i < count; ++i) {
				object = objects[i];
				length = object.mesh.length;

				infos[i] = {
					texture:    'data/texture/' + object.texture,
					vertOffset: offset / 9,
					vertCount:  length / 9
				};

				// Add to buffer
				buffer.set( object.mesh, offset );
				offset += length;
			}

			// Load textures
			i = -1;
			function loadNextTexture()
			{

				// Loading complete, rendering...
				if ((++i) === count) {
					// Initialize renderer
					ModelRenderer.init( Renderer.getContext(), {
						buffer: buffer,
						infos:  infos
					});

					// Start rendering
					Renderer.render(render);
					return;
				}

				Client.loadFile( infos[i].texture, function( data ){
					infos[i].texture = data;
					loadNextTexture();
				}, loadNextTexture );
			}

			// Start loading textures
			loadNextTexture();
		});
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
		mat4.translate( _modelView, _modelView, [ 0, -_model.box.range[1]*0.1, -_model.box.range[1]*0.5-5 ] );
		mat4.rotateX(  _modelView, _modelView, (15/180) * Math.PI );
		mat4.rotateY(  _modelView, _modelView, ((tick)/1000*360/8) / 180 * Math.PI );

		// Calculate normal mat
		mat4.toInverseMat3( _modelView, _normalMat);
		mat3.transpose( _normalMat, _normalMat);

		// Clear screen, update camera
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

		ModelRenderer.render(gl, _modelView, Camera.projection, _normalMat, _fog, _light );
	}


	/**
	 * Export
	 */
	Viewer.loadModel = loadModel;
	Viewer.stop      = stop;


	/**
	 * Stored component and return it
	 */
	return UIManager.addComponent(Viewer);
});