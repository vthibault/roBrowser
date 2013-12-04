/**
 * App/MapViewer.js
 *
 * Start a hacked map-viewer
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

// Errors Handler (hack)
require.onError = function (err) {
	if( require.defined('UI/Components/Error/Error') ) {
		require('UI/Components/Error/Error').addTrace(err.message);
		return;
	}

	require(['UI/Components/Error/Error'], function( Errors ){
		Errors.addTrace(err.message)
	});
};


require({
	baseUrl: document.scripts[document.scripts.length-1].src.replace(/\/([^\/]+)\/([^\/]+)$/, '') + '/',
	paths: {
		text:   "Vendors/text.require",
		jquery: "Vendors/jquery-1.9.1"
	}
},
	['Utils/Queue',
	 'Core/Client', 'Core/Thread',
	 'Renderer/Renderer', 'Renderer/MapRenderer', 'Renderer/Camera', 'Renderer/Map/Altitude', 'Renderer/Entity/Entity',
	 'Controls/MouseEventHandler', 'Controls/MapControl',
	 'UI/Components/Intro/Intro'],

function(
	Queue,
	Client, Thread,
	Renderer, MapRenderer, Camera, Altitude, Entity,
	Mouse, MapControl,
	Intro
) {

	"use strict";


	/**
	 * MapViewer namespace
	 */
	var MapViewer = {};


	/**
	 * @var {object} Entity to target
	 */
	MapViewer.spot = new Entity();


	/**
	 * @var {HTMLElement} <select>
	 */
	MapViewer.dropDown = null;


	/**
	 * Initialize MapViewer
	 */
	MapViewer.init = function Init()
	{
		var q = new Queue();

		// Waiting for the Thread to be ready
		q.add(function(){
			Thread.hook("THREAD_READY", q.next );
			Thread.init();
		});

		// Initialize renderer
		q.add(function(){
			Renderer.init();
			q._next();
		});

		// Start Intro, wait the user to add files
		q.add(function(){
			Intro.onFilesSubmit = function( files ) {
				Client.onFilesLoaded = q.next;
				Client.init( files );
			};
			Intro.append();
		});

		// Start the MapViewer instance
		q.add(function(){
			Intro.remove();

			MapRenderer.onLoad = MapViewer.onLoad;
			MapRenderer.setMap('guild_vs4.rsw');
			MapControl.call(MapViewer);

			// Initialize dropdown
			Client.search(/data\\([^\0]+\.rsw)/gi, function( mapList ) {
				var i, count;

				mapList.sort();

				MapViewer.dropDown = document.createElement('select');
				MapViewer.dropDown.style.zIndex   = 50;
				MapViewer.dropDown.style.position = "relative";

				for( i = 0, count = mapList.length; i<count; ++i ) {
					mapList[i] = mapList[i].substr(5); // Remove 'data\\' part
					MapViewer.dropDown.add( new Option( mapList[i], mapList[i]), null );
				}

				MapViewer.dropDown.onchange = function OnChange() {
					MapRenderer.setMap( this.value );
					document.body.removeChild( MapViewer.dropDown );
				};
			});
		});

		// Start queue system
		q.run();
	};


	/**
	 * Once map is ready to render
	 */
	MapViewer.onLoad = function()
	{
		document.body.appendChild( MapViewer.dropDown );

		MapViewer.spot.position[0] = Altitude.width  >> 1;
		MapViewer.spot.position[1] = Altitude.height >> 1;
		MapViewer.spot.position[2] = Altitude.getCellHeight( MapViewer.spot.position[0], MapViewer.spot.position[1] );

		Camera.setTarget( MapViewer.spot );
		Camera.init();

		Camera.altitudeTo = -200;
		Camera.zoomFinal  =  200;
	};


	/**
	 * Overwrite Map Engine mouse down
	 */
	MapViewer.onMouseDown = function OnMouseDown()
	{
		if( Mouse.world.x > -1 && Mouse.world.y > -1 ) {
			MapViewer.spot.position[0] = Mouse.world.x;
			MapViewer.spot.position[1] = Mouse.world.y;
			MapViewer.spot.position[2] = Mouse.world.z;
		}
	};


	/**
	 * Mouse up on canvas
	 * Nothing to do here
	 */
	MapViewer.onMouseUp = function OnMouseUp(){};


	/**
	 * Starting map-viewer
	 */
	MapViewer.init();
});