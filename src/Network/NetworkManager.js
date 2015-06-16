/**
 * network/networkManager.js
 *
 * Network Manager
 * Manage sockets and packets
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function( require )
{
	'use strict';


	// Load dependencies
	var Configs         = require('core/Configs');
	var Context         = require('core/Context');
	var PACKETVER       = require('./PacketVerManager');
	var packetRegister  = require('./packets/registerTable');
	var packetVersions  = require( './packets/versionTable');
	var PacketEncryptor = require('./PacketEncryptor');
	var PacketParser    = require('./PacketParser');
	var ChromeSocket    = require('./sockets/ChromeSocket');
	var JavaSocket      = require('./sockets/JavaSocket');
	var WebSocket       = require('./sockets/WebSocket');
	var TCPSocket       = require('./sockets/TCPSocket');
	var NodeSocket      = require('./sockets/NodeSocket');
	var getModule       = require;


	/**
	 * @Constructor NetworkManager
	 */
	function NetworkManager() {
		this.packetParser = new PacketParser();
		this.packetEncryptor = new PacketEncryptor();

		this._sockets = [];
		this._currentSocket = null;


		this.packetParser.registerPackets(packetRegister);
		PACKETVER.init(packetVersions);
	}


	/**
	 * Connect to a server
	 *
	 * @param {string} host
	 * @param {number} port
	 * @param {function} callback once connected or not
	 * @param {boolean} is zone server ?
	 */
	NetworkManager.prototype.connect = function connect( host, port, callback, isZone) {
		var socket, Socket, net = this;

		Socket            = this.getSupportedSocket();
		socket            = new Socket(host, port, Configs.get('socketProxy', null));
		socket.isZone     = !!isZone;

		socket.onClose    = function onclose() {
			net.onClose(socket);
		};

		socket.onMessage = function onMessage(buffer) {
			net.onmessage(buffer);
		};

		socket.onComplete = function onComplete(success) {
			var msg   = 'Fail';
			var color = 'red';

			if (success) {
				msg   = 'Success';
				color = 'green';

				if (net._currentSocket) {
					clearInterval(net._currentSocket.ping);
				}

				if (socket.isZone) {
					net.packetEncryptor.init(Configs.get('packetKeys'), Configs.get('packetver'));
				}

				net._sockets.push(socket);
				net._currentSocket = socket;
			}

			console.log( '%c[Network] ' + msg + ' to connect to ' + host + ':' + port, 'font-weight:bold;color:' + color);
			callback.call( this, success);
		};
	};


	/**
	 * Get supported Socket lib
	 * 
	 * @return {Socket}
	 */
	NetworkManager.prototype.getSupportedSocket = function getSupportedSocket() {
		// Chrome App
		if (Context.Is.APP) {
			return ChromeSocket;
		}

		// Firefox OS App
		if (TCPSocket.isSupported()) {
			return TCPSocket;
		}

		// node-webkit
		if (NodeSocket.isSupported()) {
			return NodeSocket;
		}

		// Web Socket with proxy
		if (Configs.get('socketProxy', null)) {
			return WebSocket;
		}
	
		// Sno support, then java...
		return JavaSocket;
	};


	/**
	 * Send a packet to the server
	 *
	 * @param Packet
	 */
	NetworkManager.prototype.sendPacket = function sendPacket( packet ) {
		console.log( '%c[Network] Send: ', 'color:#007070', packet );
		var pkt = packet.build();

		// Encrypt packet
		if (this._currentSocket && this._currentSocket.isZone) {
			this.packetEncryptor.encrypt(pkt.view);
		}

		this.send( pkt.buffer );
	};


	/**
	 * Send buffer to the server
	 *
	 * @param {ArrayBuffer} buffer
	 */
	NetworkManager.prototype.send = function send( buffer ) {
		if (this._currentSocket) {
			this._currentSocket.send( buffer );
		}
	};


	/**
	 * Hook a Packet
	 *
	 * @param {object} packet
	 * @param {function} callback to use packet
	 */
	NetworkManager.prototype.hookPacket = function hookPacket( packet, callback ) {
		this.packetParser.getPacket(packet).callback = callback;
	};


	/**
	 * Received data from server
	 *
	 * @param {ArrayBuffer} buffer
	 */
	NetworkManager.prototype.onmessage = function onMessage( buffer ) {
		var packet;

		this.packetParser.addBuffer(buffer);

		if (this._readCallback) {
			this._readCallback(this.packetParser._reader);
			this._readCallback = null;
			return;
		}

		while ((packet = this.packetParser.parse(buffer)) !== null) {
			console.log( '%c[Network] Recv:', 'color:#900090', packet._instance, packet.callback ? '' : '(no callback)'  );

			if (packet.callback) {
				packet.callback(packet._instance);
			}
		}
	};


	/**
	 * Add a read next buffer callback
	 * 
	 * @param {function} callback to execute
	 */
	NetworkManager.prototype.read = function read( callback ) {
		this._readCallback = callback;
	};


	/**
	 * Communication end
	 * Server ask to close the socket
	 */
	NetworkManager.prototype.onClose = function onClose( socket ) {
		var idx = this._sockets.indexOf(socket);

		if (socket === this._currentSocket) {
			console.warn('[Network] Disconnect from server');

			if (socket.ping) {
				clearInterval(socket.ping);
			}

			getModule('UI/UIManager').showErrorBox('Disconnected from Server.');
		}

		if (idx !== -1) {
			this._sockets.splice(idx, 1);
		}
	};


	/**
	 * Close connection with server
	 */
	NetworkManager.prototype.close = function close() {
		if (!this._currentSocket) {
			return;
		}

		this._currentSocket.close();

		if (this._currentSocket.izZone) {
			this.packetEncryptor.free();
		}

		clearInterval(this._currentSocket.ping);

		var pos = this._sockets.indexOf(this._currentSocket);
		this._currentSocket = null;

		if (pos !== -1) {
			this._sockets.splice(pos, 1);
		}
	};


	/**
	 * Define a ping
	 *
	 * @param callback
	 */
	NetworkManager.prototype.setPing = function setPing( callback ) {
		if (!this._currentSocket) {
			return;
		}

		clearInterval(this._currentSocket.ping);
		this._currentSocket.ping = setInterval( callback, 10000);

		while (this._sockets.length > 1) {
			if (this._currentSocket !== this._sockets[0]) {
				this._sockets[0].close();
				this._sockets.splice( 0, 1 );
			}
		}
	};


	/**
	 * Get back ip from long
	 *
	 * @param {number} long ip
	 * @return {string} ip
	 */
	NetworkManager.prototype.utils = {
		longToIP: (function utilsLongToIPClosure() {
			var buf    = new ArrayBuffer(4);
			var uint8  = new Uint8Array(buf);
			var uint32 = new Uint32Array(buf);
	
			return function utilsLongToIP( long ) {
				uint32[0]  = long;
				return Array.prototype.join.call( uint8, '.');
			};
		})()
	};


	return (new NetworkManager());
});