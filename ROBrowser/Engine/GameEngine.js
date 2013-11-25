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
	 * @var {Array} Login server list
	 */
	var _servers = [];


	/**
	 * Initialize Game
	 */
	function Init()
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
			LoadClientInfo(q.next);
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
			Reload();
		});

		// Execute
		q.run();
	}


	/**
	 * Reload the game
	 */
	function Reload()
	{
		BGM.play('01.mp3');
		UIManager.removeComponents();
		Network.close();

		// Setup background
		Background.init();
		Background.resize( Renderer.width, Renderer.height );
		Background.setImage( "bgi_temp.bmp", function(){

			// Display server list
			var list = new Array( _servers.length );
			var i, count = list.length;
	
			for( i = 0; i < count; ++i ) {
				list[i] = _servers[i].display;
			}

			WinList.append();
			WinList.setList( list );

			Renderer.stop();
		});

		// Hooking WinList
		WinList.onIndexSelected = OnLoginServerSelected;
		WinList.onExitRequest   = OnExit;
	}


	/**
	 * Once a server is selected
	 *
	 * @param {number} index in server list
	 */
	function OnLoginServerSelected( index )
	{
		// Play "¹öÆ°¼Ò¸®.wav" (possible problem with charset)
		Sound.play("\xB9\xF6\xC6\xB0\xBC\xD2\xB8\xAE.wav");

		WinList.remove();
		LoginEngine.onExitRequest = Reload;
		LoginEngine.init( _servers[index] );
	}


	/**
	 * Ask to exit window
	 */
	function OnExit()
	{
		Sound.stop();
		Renderer.stop();
		UIManager.removeComponents();

		Background.remove(function(){
			Init();
		});
	}


	/**
	 * Loading clientinfo file
	 *
	 * @param {function} callback
	 */
	function LoadClientInfo( callback )
	{
		_servers.length = 0;
		ROConfig.servers = ROConfig.servers || 'data/clientinfo.xml';

		if( ROConfig.servers instanceof Array ) {
			_servers = ROConfig.servers;
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
				_servers.push({
					display:    connection.find('display:first').text(),
					desc:       connection.find('desc:first').text(),
					address:    connection.find('address:first').text(),
					port:       connection.find('port:first').text(),
					version:    connection.find('version:first').text(),
					langtype:   connection.find('langtype:first').text(),
					packetver:  connection.find('packetver:first').text()
				});

				if( index === stop ) {
					callback();
				}
			});
		});
	}


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
	return {
		init:           Init,
		reload:         Reload
	};
});