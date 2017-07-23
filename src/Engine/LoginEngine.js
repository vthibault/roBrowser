/**
 * Engine/LoginEngine.js
 *
 * Login Engine
 * Manage login server, connexion
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function( require )
{
	'use strict';


	// Load dependencies
	var TextEncoding = require('Vendors/text-encoding');
	var DB           = require('DB/DBManager');
	var BGM          = require('Audio/BGM');
	var Sound        = require('Audio/SoundManager');
	var Configs      = require('Core/Configs');
	var Thread       = require('Core/Thread');
	var Session      = require('Engine/SessionStorage');
	var CharEngine   = require('Engine/CharEngine');
	var Network      = require('Network/NetworkManager');
	var PACKET       = require('Network/PacketStructure');
	var PACKETVER    = require('Network/PacketVerManager');
	var Renderer     = require('Renderer/Renderer');
	var UIManager    = require('UI/UIManager');
	var WinList      = require('UI/Components/WinList/WinList');
	var WinPopup     = require('UI/Components/WinPopup/WinPopup');
	var WinLogin     = require('UI/Components/WinLogin/WinLogin');
	var getModule    = require;


	/**
	 * Creating WinLoading
	 */
	var WinLoading = WinPopup.clone('WinLoading');
	WinLoading.init = function(){
		this.ui.css({ top: (Renderer.height - 120) / 1.5, left: (Renderer.width - 280) / 2.0 });
		this.ui.find('.text').text( DB.getMessage(121) );
	};
	UIManager.addComponent(WinLoading);


	/**
	 * @var {object} server object stored in clientinfo.xml
	 */
	var _server = null;


	/**
	 * @var {array} char-servers list
	 */
	var _charServers = [];


	/**
	 * @var {string} Stored username to send as ping
	 */
	var _loginID = '';


	/**
	 * Init Game
	 */
	function init( server )
	{
		var charset;

		Configs.setServer(server);
		UIManager.removeComponents();
		Session.LangType = 'langtype' in server ? parseInt(server.langtype, 10) : 1; // default to SERVICETYPE_AMERICA

		/// Special thanks to curiosity, siriuswhite and ai4rei. See:
		/// - http://hercules.ws/wiki/Clientinfo.xml
		/// - http://forum.robrowser.com/index.php?topic=32231
		/// - http://siriuswhite.de/rodoc/codepage.html
		switch (Session.LangType) {
			case 0x00: // SERVICETYPE_KOREA
				if (Configs.get('disableKorean')) {
					charset = 'windows-1252';
					break;
				}

				console.warn('%c[Warning] You are using a Korean langtype. If you have some charset ' +
				             'problem set ROConfig.servers[<index>].disableKorean to true or use a proper langtype !',
				             'font-weight:bold; color:red; font-size:14px');

				charset = 'windows-949';
				break;

			// SERVICETYPE_AMERICA
			// SERVICETYPE_INDONESIA
			// SERVICETYPE_PHILIPPINE
			// SERVICETYPE_MALAYSIA
			// SERVICETYPE_SINGAPORE
			// SERVICETYPE_GERMANY
			// SERVICETYPE_INDIA
			// SERVICETYPE_AUSTRALIA
			default:
			case 0x0c: // SERVICETYPE_BRAZIL
			case 0x12: // SERVICETYPE_FRANCE
				charset = 'windows-1252';
				break;

			case 0x02: // SERVICETYPE_JAPAN
				charset = 'shift-jis';
				break;

			case 0x03: // SERVICETYPE_CHINA
				charset = 'gbk';
				break;

			case 0x04: // SERVICETYPE_TAIWAN
				charset = 'big5';
				break;

			case 0x05: // SERVICETYPE_THAI
				charset = 'windows-874';
				break;

			case 0x0e: // SERVICETYPE_RUSSIA
				charset = 'windows-1251';
				break;

			case 0x0f: // SERVICETYPE_VIETNAM
				charset = 'windows-1258';
				break;

			// Not supported by the encoder/decoder, jump to windows-1252
			//case 0x11: // SERVICETYPE_CHILE
			//	charset = 'windows-1145';
			//	break;

			case 0x14: // SERVICETYPE_UAE
				charset = 'windows-1256';
				break;
		}

		TextEncoding.setCharset(charset);
		_server = server;

		// Add support for "packetver" definition in Server listing
		var packetver    = String(Configs.get('packetver'));
		var remoteClient = Configs.get('remoteClient');
		var autoLogin    = Configs.get('autoLogin');
		var audioExt     = Configs.get('BGMFileExtension');

		// Server packetver
		if (packetver) {
			if (packetver.match(/^\d+$/)) {
				PACKETVER.value = parseInt(packetver, 10);
			}
		}

		if (!PACKETVER.value) {
			UIManager.showErrorBox('Sorry, no PACKETVER configs found.')
			return;
		}

		// Add support for remote client in server definition
		if (remoteClient) {
			Thread.send( 'SET_HOST', remoteClient);
		}

		// Server audio configuration
		if (audioExt) {
			BGM.setAvailableExtensions(audioExt);
		}

		// GMs account list from server
		Session.AdminList = server.adminList || [];

		// Hooking win_login
		WinLogin.onConnectionRequest = onConnectionRequest;
		WinLogin.onExitRequest       = onExitRequest;

		// Autologin features
		if (autoLogin instanceof Array && autoLogin[0] && autoLogin[1]) {
			onConnectionRequest.apply( null, autoLogin);
			Configs.set('autoLogin',null);
		}
		else {
			WinLogin.append();
		}

		// Hook packets
        if (PACKETVER.value >= 20170315) {
            Network.hookPacket( PACKET.AC.ACCEPT_LOGIN3,    onConnectionAccepted );
        } else {
            Network.hookPacket( PACKET.AC.ACCEPT_LOGIN,    onConnectionAccepted );
        }
		Network.hookPacket( PACKET.AC.REFUSE_LOGIN,    onConnectionRefused );
		Network.hookPacket( PACKET.AC.REFUSE_LOGIN_R2, onConnectionRefused );
		Network.hookPacket( PACKET.SC.NOTIFY_BAN,      onServerClosed );

    }


	/**
	 * Reload WinLogin
	 */
	function reload()
	{
		UIManager.removeComponents();
		WinLogin.onConnectionRequest = onConnectionRequest;
		WinLogin.onExitRequest       = onExitRequest;
		WinLogin.append();

		Network.close();
	}


	/**
	 * Trying to connect to Login server
	 *
	 * @param {string} username
	 * @param {string} password
	 */
	function onConnectionRequest( username, password )
	{
		// Play "¹öÆ°¼Ò¸®.wav" (possible problem with charset)
		Sound.play('\xB9\xF6\xC6\xB0\xBC\xD2\xB8\xAE.wav');

		// Add the loading screen
		// Store the ID to use for the ping
		WinLogin.remove();
		WinLoading.append();
		_loginID = username;

		// Try to connect
		Network.connect( _server.address, _server.port, function( success ) {
			// Fail to connect...
			if ( !success ) {
				UIManager.showErrorBox(DB.getMessage(1));
				return;
			}

			var pkt;
			var hash = Configs.get('clientHash');

			// Client hash config
			if (hash) {
				// Convert hexadecimal hash to binary
				if (/^[a-f0-9]+$/i.test(hash)) {
					var str = '';
					var i, count = hash.length;

					for (i = 0; i < count; i += 2) {
						str += String.fromCharCode(parseInt(hash.substr(i,2),16));
					}

					hash = str;
				}

				pkt           = new PACKET.CA.EXE_HASHCHECK();
				pkt.HashValue = hash;
				Network.sendPacket(pkt);
			}

			// Try to connect
			pkt            = new PACKET.CA.LOGIN();
			pkt.ID         = username;
			pkt.Passwd     = password;
			pkt.Version    = parseInt(_server.version, 10);
			pkt.clienttype = parseInt(_server.langtype, 10);
			Network.sendPacket(pkt);
		});
	}


	/**
	 * Go back to intro window
	 */
	function onExitRequest()
	{
		getModule('Engine/GameEngine').reload();
	}


	/**
	 * User selected a char-server
	 *
	 * @param {number} index in server list
	 */
	function onCharServerSelected( index )
	{
		// Play "¹öÆ°¼Ò¸®.wav" (encode to avoid problem with charset)
		Sound.play('\xB9\xF6\xC6\xB0\xBC\xD2\xB8\xAE.wav');

		WinList.remove();
		WinLoading.append();

		CharEngine.onExitRequest = reload;
		CharEngine.init( _charServers[index] );
	}


	/**
	 * Accepted connection from char-server
	 *
	 * @param {object} pkt - PACKET.AC.ACCEPT_LOGIN
	 */
	function onConnectionAccepted( pkt )
	{
		UIManager.removeComponents();

		Session.AuthCode  = pkt.AuthCode;
		Session.AID       = pkt.AID;
		Session.UserLevel = pkt.userLevel;
		Session.Sex       = pkt.Sex;
		_charServers      = pkt.ServerList;

		// Build list of servers
		var i, count = _charServers.length;
		var list     = new Array(count);
		for (i = 0; i < count; ++i) {
			list[i]  =  _charServers[i].property ? DB.getMessage(482) + ' ' : '';
			list[i] +=  _charServers[i].name;
			list[i] +=  _charServers[i].state    ? DB.getMessage(484) : ' ' + DB.getMessage(483).replace('%d', _charServers[i].usercount);
		}

		// No choice, connect directly to the server
		if (count === 1 && Configs.get('skipServerList')) {
			WinLoading.append();
			CharEngine.onExitRequest = reload;
			CharEngine.init(_charServers[0]);
		}

		// Have to select server in the list
		else {
			// Show window
			WinList.onIndexSelected = onCharServerSelected;
			WinList.onExitRequest   = function(){
				Network.close();
				WinList.remove();
				WinLogin.append();
			};
			WinList.append();
			WinList.setList(list);
		}

		// Set ping
		var ping = new PACKET.CA.CONNECT_INFO_CHANGED();
		ping.ID  = _loginID;
		Network.setPing(function(){
			Network.sendPacket(ping);
		});
	}


	/**
	 * Received data from server, connection refused
	 *
	 * @param {object} pkt - PACKET.AC.REFUSE_LOGIN
	 */
	function onConnectionRefused( pkt )
	{
		var error = 9;
		switch (pkt.ErrorCode) {
			case   0: error =    6; break; // Unregistered ID
			case   1: error =    7; break; // Incorrect Password
			case   2: error =    8; break; // This ID is expired
			case   3: error =    3; break; // Rejected from Server
			case   4: error =  266; break; // Checked: 'Login is currently unavailable. Please try again shortly.'- 2br
			case   5: error =  310; break; // Your Game's EXE file is not the latest version
			case   6: error =  449; break; // Your are Prohibited to log in until %s
			case   7: error =  264; break; // Server is jammed due to over populated
			case   8: error =  681; break; // Checked: 'This account can't connect the Sakray server.'
			case   9: error =  703; break; // 9 = MSI_REFUSE_BAN_BY_DBA
			case  10: error =  704; break; // 10 = MSI_REFUSE_EMAIL_NOT_CONFIRMED
			case  11: error =  705; break; // 11 = MSI_REFUSE_BAN_BY_GM
			case  12: error =  706; break; // 12 = MSI_REFUSE_TEMP_BAN_FOR_DBWORK
			case  13: error =  707; break; // 13 = MSI_REFUSE_SELF_LOCK
			case  14: error =  708; break; // 14 = MSI_REFUSE_NOT_PERMITTED_GROUP
			case  15: error =  709; break; // 15 = MSI_REFUSE_NOT_PERMITTED_GROUP
			case  99: error =  368; break; // 99 = This ID has been totally erased
			case 100: error =  809; break; // 100 = Login information remains at %s
			case 101: error =  810; break; // 101 = Account has been locked for a hacking investigation. Please contact the GM Team for more information
			case 102: error =  811; break; // 102 = This account has been temporarily prohibited from login due to a bug-related investigation
			case 103: error =  859; break; // 103 = This character is being deleted. Login is temporarily unavailable for the time being
			case 104: error =  860; break; // 104 = This character is being deleted. Login is temporarily unavailable for the time being
		}

		UIManager.showMessageBox(
			DB.getMessage(error).replace('%s', pkt.blockDate),
			null,
			function(){
				UIManager.removeComponents();
				WinLogin.append();
			}
		);

		Network.close();
	}


	/**
	 * Received closed connection from server
	 *
	 * @param {object} pkt - PACKET.SC.NOTIFY_BAN
	 */
	function onServerClosed( pkt )
	{
		var msg_id;

		switch (pkt.ErrorCode) {
			default:
			case 0:   msg_id =    3; break; // Server closed
			case 1:   msg_id =    4; break; // Server closed
			case 2:   msg_id =    5; break; // Someone has already logged in with this id
			case 3:   msg_id =    9; break; // Sync error ?
			case 4:   msg_id =  439; break; // Server is jammed due to overpopulation.
			case 5:   msg_id =  305; break; // You are underaged and cannot join this server.
			case 6:   msg_id =  764; break; // Trial players can't connect Pay to Play Server. (761)
			case 8:   msg_id =  440; break; // Server still recognizes your last login
			case 9:   msg_id =  529; break; // IP capacity of this Internet Cafe is full. Would you like to pay the personal base?
			case 10:  msg_id =  530; break; // You are out of available paid playing time. Game will be shut down automatically. (528)
			case 15:  msg_id =  579; break; // You have been forced to disconnect by the Game Master Team
			case 101: msg_id =  810; break; // Account has been locked for a hacking investigation.
			case 102: msg_id = 1179; break; // More than 10 connections sharing the same IP have logged into the game for an hour. (1176)
		}

		UIManager.showErrorBox( DB.getMessage(msg_id) );
		Network.close();
	}


	/**
	 * Export
	 */
	return {
		init:   init,
		reload: reload
	};
});
