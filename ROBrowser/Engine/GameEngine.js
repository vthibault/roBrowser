/**
 * Engine/GameEngine.js
 *
 * Game Engine
 * Global game Engine
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define([
	'Utils/jquery',
	'Utils/Queue',
	'Audio/SoundManager',
	'Audio/BGM',
	'DB/DBManager',
	'Core/Client',
	'Core/Thread',
	'Engine/LoginEngine',
	'Network/NetworkManager',
	'Renderer/Renderer',
	'UI/UIManager',
	'UI/CursorManager',
	'UI/Scrollbar',
	'UI/Background',
	'UI/Components/Intro/Intro',
	'UI/Components/WinList/WinList'
],
function(
	jQuery,
	Queue,
	Sound,
	BGM,
	DB,
	Client,
	Thread,
	LoginEngine,
	Network,
	Renderer,
	UIManager,
	Cursor,
	Scrollbar,
	Background,
	Intro,
	WinList
)
{
	"use strict";


	/**
	 * GameEngine NameSpace
	 */
	var GameEngine = {};


	/**
	 * @var {array} server list object
	 */
	GameEngine.servers = [];


	/**
	 * Initialize Game
	 */
	GameEngine.init = function Init()
	{
		var q = new Queue();

		// Waiting for the Thread to be ready
		q.add(function(){
			Thread.hook("THREAD_ERROR", OnThreadError );
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

		// Loading clientinfo
		q.add(function(){
			GameEngine.loadClientInfo(q.next);
		});

		// Loading Game file (txt, lua, lub)
		q.add(function(){
			DB.onReady = q.next;
			DB.init();
		});

		// Initialize cursor
		q.add(function(){
			Scrollbar.init();
			Cursor.init(q.next);
		});

		// Initialize Login
		q.add(function(){
			GameEngine.reload();
		});

		// Execute
		q.run();
	};


	/**
	 * Reload the game
	 */
	GameEngine.reload = function Reload()
	{
		BGM.play('01.mp3');
		UIManager.removeComponents();
		Network.close();

		// Setup background
		Background.init();
		Background.resize( Renderer.width, Renderer.height );
		Background.setImage( "bgi_temp.bmp", function(){

			// Display server list
			var list = new Array( GameEngine.servers.length );
			var i, count = list.length;
	
			for( i = 0; i < count; ++i ) {
				list[i] = GameEngine.servers[i].display;
			}

			WinList.append();
			WinList.setList( list );

			Renderer.stop();
		});

		// Hooking WinList
		WinList.onIndexSelected = GameEngine.onLoginServerSelected;
		WinList.onExitRequest   = GameEngine.onExit;
	};


	/**
	 * Once a server is selected
	 *
	 * @param {number} index in server list
	 */
	GameEngine.onLoginServerSelected = function OnLoginServerSelected( index )
	{
		// Play "¹öÆ°¼Ò¸®.wav" (possible problem with charset)
		Sound.play("\xB9\xF6\xC6\xB0\xBC\xD2\xB8\xAE.wav");

		WinList.remove();
		LoginEngine.onExitRequest = GameEngine.reload;
		LoginEngine.init( GameEngine.servers[index] );
	};


	/**
	 * Ask to exit window
	 */
	GameEngine.onExit = function OnExit()
	{
		Sound.stop();
		Renderer.stop();
		UIManager.removeComponents();

		Background.remove(function(){
			Intro.append();
		});
	};


	/**
	 * Loading clientinfo file
	 *
	 * @param {function} callback
	 */
	GameEngine.loadClientInfo = function LoadClientInfo( callback )
	{
		GameEngine.servers.length = 0;
		ROConfig.servers = ROConfig.servers || 'data/clientinfo.xml';

		if( ROConfig.servers instanceof Array ) {
			GameEngine.servers = ROConfig.servers;
			callback();
			return;
		}

		Client.loadFile( ROConfig.servers, function(xml)
		{
			// $.parseXML() don't parse buggy xml (and a lot of clientinfo.xml are not properly write)...
			xml = xml.replace(/^.*\<\?xml/, '<?xml');
			var parser = new DOMParser();
			var doc = parser.parseFromString(xml, "application/xml");

			var connections      = jQuery(doc).find('clientinfo connection');
			var stop             = connections.length - 1;
			var list             = [];

			connections.each(function(index, element){
				var connection = jQuery(element);

				list.push( connection.find('display:first').text() );
				GameEngine.servers.push({
					display:    connection.find('display:first').text(),
					desc:       connection.find('desc:first').text(),
					address:    connection.find('address:first').text(),
					port:       connection.find('port:first').text(),
					version:    connection.find('version:first').text(),
					langtype:   connection.find('langtype:first').text()
				});

				if( index === stop ) {
					callback();
				}
			});
		});
	};


	/**
	 * When getting an error from Thread
	 *
	 * @param {string} message
	 */
	function OnThreadError( message )
	{
		console.warn( message );
		// UI error ?
	}


	/**
	 * Export
	 */
	return GameEngine;
});