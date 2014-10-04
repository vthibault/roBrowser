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

define(function( require )
{
	'use strict';


	// Load dependencies
	var jQuery      = require('Utils/jquery');
	var Queue       = require('Utils/Queue');
	var Sound       = require('Audio/SoundManager');
	var BGM         = require('Audio/BGM');
	var DB          = require('DB/DBManager');
	var Configs     = require('Core/Configs');
	var Client      = require('Core/Client');
	var Thread      = require('Core/Thread');
	var Context     = require('Core/Context');
	var LoginEngine = require('Engine/LoginEngine');
	var Network     = require('Network/NetworkManager');
	var Renderer    = require('Renderer/Renderer');
	var MapRenderer = require('Renderer/MapRenderer');
	var UIManager   = require('UI/UIManager');
	var Cursor      = require('UI/CursorManager');
	var Scrollbar   = require('UI/Scrollbar');
	var Background  = require('UI/Background');
	var Intro       = require('UI/Components/Intro/Intro');
	var WinList     = require('UI/Components/WinList/WinList');


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
			Client.onFilesLoaded = function(count){
				if (!Configs.get('remoteClient') && !count && !window.requireNode) {
					if (!Context.Is.APP) {
						alert( 'No client to initialize roBrowser');
					}
					else {
						// FIXME: no window.alert() in chrome app.
					}
					Intro.remove();
					Intro.append();
					return;
				}
				q._next();
			};

			if (Configs.get('skipIntro')) {
				Client.init([]);
				return;
			}

			Intro.onFilesSubmit = Client.init.bind(Client);
			Intro.append();
		});

		// Loading Game file (txt, lua, lub)
		q.add(function(){
			DB.onReady = function(){
				Background.setImage( 'bgi_temp.bmp'); // remove loading
				q._next();
			};
			DB.onProgress = function(i, count) {
				Background.setPercent( Math.floor(i/count * 100) );
			};
			UIManager.removeComponents();
			Background.init();
			Background.resize( Renderer.width, Renderer.height );
			Background.setImage( 'bgi_temp.bmp', function(){
				DB.init();
			});
		});

		q.add(function(){
			Thread.send('CLIENT_FILES_ALIAS', DB.mapalias );
			loadClientInfo(q.next);
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
		BGM.setAvailableExtensions( Configs.get('BGMFileExtension', ['mp3']) );
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
			else if (count === 1 && Configs.get('skipServerList')) {
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
			MapRenderer.free();
			BGM.play('01.mp3');
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
		var servers     = Configs.get('servers', 'data/clientinfo.xml');

		if (servers instanceof Array) {
			_servers = servers;
			callback();
			return;
		}

		_servers.length = 0;
		Client.loadFile( servers, function(xml)
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