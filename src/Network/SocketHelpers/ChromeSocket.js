/**
 * Network/SocketHelpers/ChromeSocket.js
 *
 * Socket Manager provide by Chrome (Desktop App)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function()
{
	"use strict";


	/**
	 * Chrome Socket System
	 *
	 * @param {string} host
	 * @param {number} port
	 */
	function Socket( host, port )
	{
		this.connected = false;
		this.socketID  = 0;
		this.host      = host;
		this.port      = port;

		chrome.socket.create("tcp", {}, this.__onReady.bind(this));
	}



	/**
	 * Connect to the server
	 */
	Socket.prototype.connect = function SocketConnect()
	{
		chrome.socket.connect( this.socketID, this.host, parseInt(this.port, 10), this.__onComplete.bind(this));
	};


	/**
	 * Sending packet to applet
	 *
	 * @param {ArrayBuffer} buffer
	 */
	Socket.prototype.send = function Send( buffer )
	{
		if (this.connected) {
			chrome.socket.write( this.socketID, buffer, this.__onWrite.bind(this));
		}
	};


	/**
	 * Closing connection to server
	 */
	Socket.prototype.close = function Close()
	{
		if (this.connected) {
			chrome.socket.disconnect( this.socketID );
			chrome.socket.destroy( this.socketID );
			this.connected = false;
			this.socketID  = 0;
		}
	};


	/**
	 * Once Socket created
	 *
	 * @param {object} create_info - SocketCreateinfo
	 */
	Socket.prototype.__onReady = function onReady(create_info)
	{
		this.socketID = create_info.socketId;
		this.connect();
	};


	/**
	 * Once the connection is complete
	 *
	 * @param {boolean} success
	 */
	Socket.prototype.__onComplete = function onComplete( success )
	{
		this.connected = success >= 0;

		if (this.onComplete) {
			this.onComplete(this.connected);
		}

		// Start receiving data
		if (this.connected) {
			this.__onReceive();
		}
	};


	/**
	 * Once the connection is complete
	 */
	Socket.prototype.__onClose = function onClose()
	{
		this.close();

		if (this.onClose) {
			this.onClose();
		}
	};


	/**
	 * Once data is sent to server
	 *
	 * @param {object} writeInfo
	 */
	Socket.prototype.__onWrite = function onWrite()
	{
	};


	/**
	 * Data received from server
	 *
	 * @param {object} readInfo object
	 */
	Socket.prototype.__onReceive = function onReceive( readInfo )
	{
		if (readInfo) {
			// resultCode value: http://src.chromium.org/svn/trunk/src/net/base/net_error_list.h
			if (readInfo.resultCode < 0) {
				this.__onClose();
				return;
			}

			if (this.onMessage) {
				this.onMessage( readInfo.data );
			}
		}

		chrome.socket.read( this.socketID, null, this.__onReceive.bind(this));
	};


	/**
	 * Export
	 */
	return Socket;
});