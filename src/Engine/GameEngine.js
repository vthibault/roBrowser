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
	'Core/Context',
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
	Context,
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
	'use strict';


	/**
	 * @var {Array} Login server list
	 */
	var _servers = [];


	/**
	 * @var {boolean} is thread ready ? (fix)
	 */
	var _thread_ready = false;


	/**
	 * Initialize Game
	 */
	function init()
	{
		var q = new Queue();

		// Waiting for the Thread to be ready
		q.add(function(){
			if (!_thread_ready) {
				Thread.hook('THREAD_ERROR', onThreadError );
				Thread.hook('THREAD_LOG',   onThreadLog );
				Thread.hook('THREAD_READY', function(){
					_thread_ready = true;
					q._next();
				});
				Thread.init();
			}
			else {
				q._next();
			}
		});

		// Initialize renderer
		q.add(function(){
			Renderer.init();
			q._next();
		});

		// Start Intro, wait the user to add files
		q.add(function(){
			Intro.onFilesSubmit = function( files ) {
				Client.onFilesLoaded = function(count){
					if (!ROConfig.remoteClient && !count) {
						try {
							alert( 'No client to initialize roBrowser');
						}
						catch(e){
							// FIXME: no window.alert() in chrome app.
						}
						Intro.remove();
						Intro.append();
						return;
					}
					q._next();
				};
				Client.init( files );
			};
			Intro.append();
		});

		// Loading clientinfo
		q.add(function(){
			loadClientInfo(q.next);
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
			reload();
		});


		Context.checkSupport();

		// Execute
		q.run();
	}


	/**
	 * Reload the game
	 */
	function reload()
	{
		BGM.play('01.mp3');
		UIManager.removeComponents();
		Network.close();

		// Setup background
		Background.init();
		Background.resize( Renderer.width, Renderer.height );
		Background.setImage( 'bgi_temp.bmp', function(){

			// Display server list
			var list = new Array( _servers.length );
			var i, count = list.length;

			// WTF no servers ?
			if (count === 0) {
				UIManager.showMessageBox( 'Sorry, no server found.', 'ok', init);
			}

			// Just 1 server, skip the WinList
			else if (count === 1 && ROConfig.skipServerList) {
				LoginEngine.onExitRequest = reload;
				LoginEngine.init( _servers[0] );
			}
			else {
				for (i = 0; i < count; ++i) {
					list[i] = _servers[i].display;
				}

				WinList.append();
				WinList.setList( list );
			}

			Renderer.stop();
		});

		// Hooking WinList
		WinList.onIndexSelected = onLoginServerSelected;
		WinList.onExitRequest   = onExit;
	}


	/**
	 * Once a server is selected
	 *
	 * @param {number} index in server list
	 */
	function onLoginServerSelected( index )
	{
		// Play "¹öÆ°¼Ò¸®.wav" (possible problem with charset)
		Sound.play('\xB9\xF6\xC6\xB0\xBC\xD2\xB8\xAE.wav');

		WinList.remove();
		LoginEngine.onExitRequest = reload;
		LoginEngine.init( _servers[index] );
	}


	/**
	 * Ask to exit window
	 */
	function onExit()
	{
		Sound.stop();
		Renderer.stop();
		UIManager.removeComponents();
		Background.remove(init);
	}


	/**
	 * Loading clientinfo file
	 *
	 * @param {function} callback
	 */
	function loadClientInfo( callback )
	{
		_servers.length = 0;
		ROConfig.servers = ROConfig.servers || 'data/clientinfo.xml';

		if (ROConfig.servers instanceof Array) {
			_servers = ROConfig.servers;
			callback();
			return;
		}

		Client.loadFile( ROConfig.servers, function(xml)
		{
			// $.parseXML() don't parse buggy xml (and a lot of clientinfo.xml are not properly write)...
			xml = xml.replace(/^.*<\?xml/, '<?xml');
			var parser = new DOMParser();
			var doc = parser.parseFromString(xml, 'application/xml');

			var connections      = jQuery(doc).find('clientinfo connection');
			var stop             = connections.length - 1;
			var list             = [];

			if (!connections.length) {
				callback();
			}

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
					packetver:  connection.find('packetver:first').text(),
					adminList:  (function(){
						var list   = [];
						connection.find('yellow admin, aid admin').each(function(){
							list.push(parseInt(this.textContent,10));
						});
						return list;
					})()
				});

				if (index === stop) {
					callback();
				}
			});
		}, callback );
	}


	/**
	 * When getting an error from Thread
	 *
	 * @param {Array} data
	 */
	function onThreadError( data )
	{
		console.warn.apply( console, data );
	}


	/**
	 * Received log from Thread
	 *
	 * @param {Array} data
	 */
	function onThreadLog( data )
	{
		console.log.apply( console, data );
	}


	/**
	 * Export
	 */
	return {
		init:           init,
		reload:         reload
	};
});