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
	 * @param {string} proxy url ex: http://127.0.0.1:6001/
	 */
	function Socket( host, port, proxy )
	{
		var fragments  = proxy.match(/(\/\/)?([^:]+):(\d+)$/);
		var _connected = false;

		WebSocket.call( this, fragments[2], fragments[3] );

		// Hook to send game server to proxy
		this.__defineSetter( 'connected', function( value ) {

			if( value ) {
				var data = host + ":" + port;
				var fp   = new BinaryWriter( data.length );
				fp.writeString(data);
				this.send( fp.buffer );
			}

			_connected = value;
		});

		this.__defineGetter( 'connected', function() {
			return _connected;
		});
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