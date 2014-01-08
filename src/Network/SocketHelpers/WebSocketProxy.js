/**
 * Network/SocketHelpers/WebSocketProxy.js
 *
 * HTML5 WebSocket using a Proxy server
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['./WebSocket', 'Utils/BinaryWriter'], function( WebSocket, BinaryWriter )
{
	"use strict";


	/**
	 * WebSocket using a Proxy Server
	 *
	 * @param {string} host - server host
	 * @param {number} port - server port
	 * @param {string} proxy url ex: ws://127.0.0.1:6001/
	 */
	function Socket( host, port, proxy )
	{
		var self = this;

		if (!proxy.match(/\/$/)) {
			proxy += '/';
		}

		proxy += host + ':' + port;

		// send as ws://127.0.0.1:6001/127.0.0.1:6900
		WebSocket.call( this, proxy );

		// Erase to avoid sending onComplete data
		this.ws.onopen = function OnOpen(){
			// nothing here
		};

		// Hook on message (wait for initialization).
		this.ws.onmessage = function OnMessage( event )
		{
			// Normal behavior
			this.onmessage = function OnMessage( event )
			{
				self.onMessage( event.data );
			};

			self.connected = (event.data === 'true');
			self.onComplete( self.connected ); // success/fail
		};
	}


	/**
	 * InHerit from Websocket
	 */
	Socket.prototype = Object.create( WebSocket.prototype );
	

	/**
	 * Export
	 */
	return Socket;
});