/**
 * Renderer/MapRenderer.js
 *
 * Rendering sprite in 2D or 3D context
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
	var Thread         = require('Core/Thread');
	var SoundManager   = require('Audio/SoundManager');
	var BGM            = require('Audio/BGM');
	var DB             = require('DB/DBManager');
	var UIManager      = require('UI/UIManager');
	var Background     = require('UI/Background');
	var Session        = require('Engine/SessionStorage');
	var MemoryManager  = require('Core/MemoryManager');
	var Mouse          = require('Controls/MouseEventHandler');
	var Renderer       = require('Renderer/Renderer');
	var Camera         = require('Renderer/Camera');
	var EntityManager  = require('Renderer/EntityManager');
	var GridSelector   = require('Renderer/Map/GridSelector');
	var Ground         = require('Renderer/Map/Ground');
	var Altitude       = require('Renderer/Map/Altitude');
	var Water          = require('Renderer/Map/Water');
	var Models         = require('Renderer/Map/Models');
	var Sounds         = require('Renderer/Sounds');
	var SpriteRenderer = require('Renderer/SpriteRenderer');
	var Sky            = require('Renderer/Effects/Sky');
	var Damage         = require('Renderer/Effects/Damage');

	var MapPreferences = require('Preferences/Map');



	/**
	 * Renderer Namespace
	 */
	var MapRenderer = {};


	/**
	 * @var {string} current map's name
	 */
	MapRenderer.currentMap = "";


	/**
	 * @var {object} Global Light Structure
	 */
	MapRenderer.light = null;


	/**
	 * @var {object} Water Structure
	 */
	MapRenderer.water = null;


	/**
	 * @var {array} Sounds object
	 */
	MapRenderer.sounds = null;


	/**
	 * @var {Object} Fog structure
	 */
	MapRenderer.fog = {
		use:    MapPreferences.useFog,
		exist:  true,
		far:    30,
		near:   180,
		factor: 1.0,
		color:  new Float32Array([1,1,1])
	};


	/**
	 * Load a map
	 *
	 * @param {string} mapname to load
	 */
	MapRenderer.setMap = function LoadMap( mapname )
	{
		// Clean objects
		SoundManager.stop();
		Renderer.stop();
		UIManager.removeComponents();

		// Don't reload a map when it's just a local teleportation
		if( this.currentMap !== mapname ) {
			BGM.stop();
			this.currentMap = mapname;

			// Parse the filename (ugly RO)
			var filename = mapname.replace(/\.gat$/i, '.rsw');
			if( filename in DB.mapalias ) {
				filename = DB.mapalias[filename];
			}

			Background.setLoading(function() {
				// Hooking Thread
				Thread.hook('MAP_PROGRESS', MapRenderer.onProgressUpdate.bind(MapRenderer) );
				Thread.hook('MAP_WORLD',    MapRenderer.onWorldComplete.bind(MapRenderer) );
				Thread.hook('MAP_GROUND',   MapRenderer.onGroundComplete.bind(MapRenderer) );
				Thread.hook('MAP_ALTITUDE', MapRenderer.onAltitudeComplete.bind(MapRenderer) );
				Thread.hook('MAP_MODELS',   MapRenderer.onModelsComplete.bind(MapRenderer) );

				// Start Loading
				MapRenderer.free();
				Renderer.remove();
				Thread.send('LOAD_MAP', filename, MapRenderer.onMapComplete.bind(MapRenderer) );
			});

			return;
		}

		var gl = Renderer.getContext();
		EntityManager.free();
		Damage.free( gl );

		// Basic TP
		Background.remove(function(){
			MapRenderer.onLoad();
			Sky.setUpCloudData();

			Renderer.render( MapRenderer.onRender );
		});
	};


	/**
	 * Clean up data
	 */
	MapRenderer.free = function Free()
	{
		var gl = Renderer.getContext();

		EntityManager.free();
		GridSelector.free( gl );
		Sounds.free();
		Ground.free( gl );
		Water.free( gl );
		Models.free( gl );
		Damage.free( gl );

		this.light  = null;
		this.water  = null;
		this.sounds = null;
	};


	/**
	 * Received progress from Thread
	 *
	 * @param {number} percent (progress)
	 */
	MapRenderer.onProgressUpdate = function OnProgressUpdate( percent )
	{
		Background.setPercent( percent );
	};


	/**
	 * Received parsed world
	 */
	MapRenderer.onWorldComplete = function OnWorldComplete( data )
	{
		this.light  = data.light;
		this.water  = data.water;
		this.sounds = data.sound;

		// Calculate light direction
		this.light.direction = new Float32Array(3);
		var longitude        = this.light.longitude * Math.PI / 180;
		var latitude         = this.light.latitude  * Math.PI / 180;

		this.light.direction[0] = -Math.cos(longitude) * Math.sin(latitude);
		this.light.direction[1] = -Math.cos(latitude);
		this.light.direction[2] = -Math.sin(longitude) * Math.sin(latitude);
	};


	/**
	 * Received ground data from Thread
	 */
	MapRenderer.onGroundComplete = function OnGroundComplete( data )
	{
		var gl = Renderer.getContext();

		this.water.mesh      = data.waterMesh;
		this.water.vertCount = data.waterVertCount;

		Ground.init( gl, data );
		Water.init( gl, this.water );

		// Initialize sounds
		var i, count = this.sounds.length;
		var tmp;
		for( i = 0; i < count; ++i ) {
			tmp = -this.sounds[i].pos[1];
			this.sounds[i].pos[0] += data.width;
			this.sounds[i].pos[1]  = this.sounds[i].pos[2] + data.height;
			this.sounds[i].pos[2]  = tmp;
			this.sounds[i].range  *= 0.2;
			this.sounds[i].tick    =   0;

			Sounds.add(this.sounds[i]);
		}
	};


	/**
	 * Receiving parsed GAT from Thread
	 */
	MapRenderer.onAltitudeComplete = function OnAltitudeComplete( data )
	{
		var gl = Renderer.getContext();
		Altitude.init( gl, data );
		GridSelector.init( gl );
	};


	/**
	 * Receiving parsed RSMs from Thread
	 */
	MapRenderer.onModelsComplete = function OnModelsComplete( data )
	{
		Models.init( Renderer.getContext(), data );
	};


	/**
	 * Once the map finished to load
	 */
	MapRenderer.onMapComplete = function OnMapComplete( success, error )
	{
		var worldResource = this.currentMap.replace(/\.gat$/i, '.rsw');

		// Problem during loading ?
		if( !success ) {
			UIManager.showErrorBox( error );
			return;
		}

		// Play BGM
		BGM.play( DB.mp3[worldResource] || '01.mp3' );

		// Apply fog to map
		this.fog.exist = !!DB.fog[worldResource];
		if( this.fog.exist ) {
			this.fog.near   = DB.fog[worldResource].near * 100;
			this.fog.far    = DB.fog[worldResource].far  * 150;
			this.fog.factor = DB.fog[worldResource].factor;
			this.fog.color.set( DB.fog[worldResource].color );
		}

		// Initialize renderers
		Renderer.init();
		var gl = Renderer.getContext();

		SpriteRenderer.init(gl);
		Sky.init( gl, worldResource );
		Damage.init(gl);

		// Starting to render
		Background.remove(function(){
			MapRenderer.onLoad();
			Sky.setUpCloudData();

			// Display game
			Renderer.show();
			Renderer.render( MapRenderer.onRender );
		});
	};


	/**
	 * Rendering world
	 *
	 * @param {number} tick - game tick
	 * @param {object} gl context
	 */
	MapRenderer.onRender = function OnRender( tick, gl )
	{
		var fog   = MapRenderer.fog;
		fog.use   = MapPreferences.fog;
		var light = MapRenderer.light;

		var modelView, projection, normalMat;
		var color;
		var pos, x, y;

		// Clean mouse position in world
		Mouse.world.x =  -1;
		Mouse.world.y =  -1;
		Mouse.world.z =  -1;

		// Clear screen, update camera
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
		Camera.update( tick );

		modelView  = Camera.modelView;
		projection = Camera.projection;
		normalMat  = Camera.normalMat;

		// Find color from picking elements
		color = Renderer.getPickingColor(function(){
			Altitude.render( gl, modelView, projection );
			EntityManager.render( gl, modelView, projection, true, fog );
		});

		Ground.render(gl, modelView, projection, normalMat, fog, light );
		Models.render(gl, modelView, projection, normalMat, fog, light );

		EntityManager.setOverEntityByColor( color );

		// Gat picking
		pos = Altitude.getPositionByColor( color );
		if( pos ) {
			x    = pos[0];
			y    = pos[1];

			// Walkable
			if( (Altitude.getCellType( x, y ) & Altitude.TYPE.WALKABLE) ) {
				GridSelector.render( gl, modelView, projection, fog, x, y );
				Mouse.world.x =  x;
				Mouse.world.y =  y;
				Mouse.world.z =  Altitude.getCellHeight( x, y );
			}
		}

		EntityManager.render( gl, modelView, projection, false, fog );
		Water.render( gl, modelView, projection, fog, light, tick );

		// Display clouds on maps
		Sky.render( gl, modelView, projection, fog, tick );

		// Rendering effects
		Damage.render( gl, modelView, projection, fog, tick );
		//Effects.render( gl, modelView, projection, fog );

		// Play sounds
		Sounds.render( Session.Entity.position, tick );


		// Clean up
		MemoryManager.clean(gl, tick);
	};


	/**
	 * Callback to execute once the map is loaded
	 */
	MapRenderer.onLoad = function OnLoad()
	{
	};


	/**
	 * Export
	 */
	return MapRenderer;
});