/**
 * Network/SocketHelpers/TCPSocket.js
 *
 * TCPSocket - discussed at W3C as part of the System Applications Working Group under the TCP and
 * UDP Socket API (formerly known as the Raw Sockets API) proposal.
 *
 * For now, it's only used by Firefox OS App or in Firefox by settings "dom.mozTCPSocket.enabled" to
 * "true" in about:config
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function()
{
	'use strict';


	/**
	 * Mozilla TCP Socket
	 *
	 * @param {string} url
	 */
	function Socket( host, port )
	{
		var self       = this;
		var TCPSocket  = navigator.TCPSocket || navigator.mozTCPSocket;

		this.socket    = TCPSocket.open(host, port, {binaryType:'arraybuffer'});
		this.connected = false;

		this.socket.onopen = function onOpen() {
			self.connected = true;
			self.onComplete( true );
		};

		this.socket.onerror = function onError() {
			if (!self.connected) {
				self.onComplete( false );
			}
		};

		this.socket.ondata = function onMessage(event) {
			self.onMessage( event.data );
		};

		this.socket.onclose = function onClose() {
			this.close();
			self.connected = false;

			if (self.onClose) {
				self.onClose();
			}
		};
	}


	/**
	 * @return is the TCPSocket supported
	 */
	Socket.isSupported = function isSupported()
	{
		return !!(navigator.TCPSocket || navigator.mozTCPSocket);
	};


	/**
	 * Sending packet to applet
	 *
	 * @param {ArrayBuffer} buffer
	 */
	Socket.prototype.send = function Send( buffer )
	{
		if (this.connected) {
			this.socket.send( buffer );
		}
	};


	/**
	 * Closing connection to server
	 */
	Socket.prototype.close = function Close()
	{
		if (this.connected) {
			this.socket.close();
			this.connected = false;
		}
	};


	/**
	 * Export
	 */
	return Socket;
});