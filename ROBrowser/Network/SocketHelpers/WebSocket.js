/**
 * Network/SocketHelpers/WebSocket.js
 *
 * HTML5 WebSocket if the server support the protocole
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function()
{
	"use strict";


	/**
	 * HTML5 WebSocket System
	 *
	 * @param string host
	 * @param integer port
	 */
	function Socket( host, port )
	{
		var self           = this;
		this.connected     = false;

		// Open Websocket
		this.ws            = new WebSocket('ws://'+ host +':' + port + '/');
		this.ws.binaryType = 'arraybuffer';

		this.ws.onopen = function OnOpen()
		{
			self.connected = true;
			self.onComplete( true );
		};

		this.ws.onerror = function OnError()
		{
			if( !self.connected ) {
				self.onComplete( false );
			}
		};

		this.ws.onmessage = function OnMessage( event )
		{
			this.onMessage( event.data );	
		};

		this.ws.onclose = function OnClose()
		{
			this.close();

			if( self.onClose ) {
				self.onClose();
			}
		};
	}


	/**
	 * Sending packet to applet
	 *
	 * @param ArrayBuffer buffer
	 */
	Socket.prototype.send = function Send( buffer )
	{
		if ( this.connected ) {
			this.ws.send( buffer );
		}
	};


	/**
	 * Closing connection to server
	 */
	Socket.prototype.close = function Close()
	{
		if( this.connected ) {
			this.ws.close();
			this.connected = false;
		}
	};


	/**
	 * Export
	 */
	return Socket;
});