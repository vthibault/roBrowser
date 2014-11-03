/**
 * Network/SocketHelpers/NodeSocket.js
 *
 * Use Node net.Socket() to connect on a server
 * Only used for now when compiled using node-webkit
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function()
{
	'use strict';


	/**
	 * Nodejs TCP Socket
	 *
	 * @param {string} url
	 */
	function Socket( host, port )
	{
		var self       = this;
		this.connected = false;
		this.socket    = window.requireNode('net').connect(port, host);

		this.socket.on('connect', function onConnect() {
			self.connected = true;
			self.onComplete( true );
		});

		this.socket.on('error', function onError() {
			if (!self.connected) {
				self.onComplete( false );
			}
		});

		this.socket.on('data', function onData(data) {
			self.onMessage(new Uint8Array(data));
		});

		this.socket.on('close', function onClose() {
			self.connected = false;
			this.destroy();

			if (self.onClose) {
				self.onClose();
			}
		});
	}


	/**
	 * @return is running in node-webkit
	 */
	Socket.isSupported = function isSupported()
	{
		return !!(window.requireNode);
	};


	/**
	 * Sending packet to applet
	 *
	 * @param {ArrayBuffer} buffer
	 */
	Socket.prototype.send = function Send( buffer )
	{
		if (this.connected) {
			this.socket.write(new Buffer(new Uint8Array(buffer)));
		}
	};


	/**
	 * Closing connection to server
	 */
	Socket.prototype.close = function Close()
	{
		if (this.connected) {
			this.socket.end();
			this.socket.destroy();
			this.connected = false;
		}
	};


	/**
	 * Export
	 */
	return Socket;
});