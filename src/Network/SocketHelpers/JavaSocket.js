/**
 * Network/SocketHelpers/JavaSocket.js
 *
 * Socket Manager provide by JAVA
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define([ 'require', 'Utils/jquery'], function( require, jQuery )
{
	'use strict';


	/**
	 * Java Socket System
	 *
	 * @param {string} host
	 * @param {number} port
	 */
	function Socket( host, port )
	{
		this.connected = false;
		this.host      = host;
		this.port      = port;

		// Generate new ID
		this.id        = this.constructor.list.push(this) - 1;

		// Create applet
		this.applet    = jQuery('<applet/>')
			.attr({ archive: require.toUrl('./Java/JavaSocketBridge.jar'), code:'JavaSocketBridge.class', width:0, height:0 })
			.html('<param name="id" value="'+ this.id +'"/>')
			.appendTo('body')[0];
	}


	/**
	 * All sockets are stored in the list
	 * @var Socket[]
	 */
	Socket.list = [];


	/**
	 * Connect to the server
	 */
	Socket.prototype.connect = function SocketConnect()
	{
		this.applet.connect( this.host, this.port );
	};


	/**
	 * Sending packet to applet
	 *
	 * @param {ArrayBuffer} buffer
	 */
	Socket.prototype.send = function Send( buffer )
	{
		if (this.connected) {

			// Applet don't fully support binary string
			// So encoding to hex before sending
			var data = new Uint8Array(buffer);
			var i, count = data.length;
			var hex  = '';

			for (i = 0; i < count; i++) {
				hex += data[i].toString(16).replace(/^([\da-f])$/, '0$1');
			}

			this.applet.send(hex);
		}
	};


	/**
	 * Closing connection to server
	 */
	Socket.prototype.close = function Close()
	{
		if (this.connected) {
			// Don't need to disconnect, removing it from html will execute all we need in the JAVA class
			//this.applet.disconnect();

			if (this.applet.parentNode) {
				document.body.removeChild(this.applet);
			}

			this.constructor.list[this.id] = null;
			this.connected = false;
		}
	};


	/**
	 * Once JAVA applet is ready, connect to server
	 */
	Socket.prototype.__onReady = function onReady()
	{
		this.connect();
	};


	/**
	 * Once the connection is complete
	 *
	 * @param {boolean} success
	 */
	Socket.prototype.__onComplete = function onComplete( success )
	{
		this.connected = success;

		if (this.onComplete) {
			this.onComplete(success);
		}
	};


	/**
	 * Closed connection from server
	 */
	Socket.prototype.__onClose = function onClose()
	{
		if (this.applet.parentNode) {
			document.body.removeChild(this.applet);
		}

		this.connected = false;
		this.constructor.list[this.id] = null;

		if (this.onClose) {
			this.onClose();
		}
	};


	/**
	 * Data received from server
	 *
	 * @param {string} hexadecimal
	 */
	Socket.prototype.__onReceive = function onReceive( hex )
	{
		var i, count = hex.length >> 1;
		var data = new Uint8Array( count );
	
		for (i = 0; i < count; i++) {
			data[i] = parseInt( hex.substr(i*2,2).replace(/[^a-f0-9]/gi, ''), 16 );
		}

		if (this.onMessage) {
			this.onMessage( data.buffer );
		}
	};


	/**
	 * Once JAVA is ready
	 *
	 * @param {number} id
	 */
	window.javasocketbridge_onready = function SocketOnReady( id )
	{
		if (Socket.list[id]) {
			Socket.list[id].__onReady();
		}
	};


	/**
	 * Java connect to server answer
	 *
	 * @param {number} id
	 * @param {boolean} result
	 */
	window.javasocketbridge_oncomplete = function SocketOnComplete( id, result)
	{
		if (Socket.list[id]) {
			Socket.list[id].__onComplete(!!result);
		}
	};


	/**
	 * Java, server want to close the connection
	 *
	 * @param {number} id
	 */
	window.javasocketbridge_onclose = function( id )
	{
		if (Socket.list[id]) {
			Socket.list[id].__onClose();
		}
	};


	/**
	 * Java Received data from server
	 *
	 * @param {number} id
	 * @param {string} data
	 */
	window.javasocketbridge_onmessage = function( id, data )
	{
		if (Socket.list[id]) {
			Socket.list[id].__onReceive( String(data) );
		}
	};


	/**
	 * Export
	 */
	return Socket;

});