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

define([
	'require',
	'DB/DBManager',
	'Audio/SoundManager',
	'Engine/SessionStorage',
	'Engine/CharEngine',
	'Network/NetworkManager',
	'Network/PacketStructure',
	'Network/PacketVerManager',
	'Renderer/Renderer',
	'UI/UIManager',
	'UI/Components/WinList/WinList',
	'UI/Components/WinLogin/WinLogin',
	'UI/Components/WinPopup/WinPopup'
],
function(
	require,
	DB,
	Sound,
	Session,
	CharEngine,
	Network,
	PACKET,
	PACKETVER,
	Renderer,
	UIManager,
	WinList,
	WinLogin,
	WinPopup
)
{
	"use strict";


	/**
	 * Creating WinLoading
	 */
	var WinLoading = WinPopup.clone('WinLoading');
	WinLoading.init = function(){
		this.ui.css({ top: (Renderer.height - 120) / 1.5, left: (Renderer.width - 280) / 2.0 });
		this.ui.find('.text').text( DB.msgstringtable[121] );
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
	var _loginID = "";


	/**
	 * Init Game
	 */
	function Init( server )
	{
		UIManager.removeComponents();

		Session.LangType = parseInt(server.langtype, 10);
		_server = server;

		// Add support for "packetver" definition in Server listing
		if (server.packetver) {
			ROConfig.packetver = server.packetver;

			if (server.packetver.match(/^\d+$/)) {
				PACKETVER.min = date;
				PACKETVER.max = date;
			}
			else if (server.packetver.match(/auto/i)) {
				PACKETVER.min = 0;
				PACKETVER.max = Infinity;
			}
			// executable already used
		}

		// Hooking win_login
		WinLogin.onConnectionRequest = OnConnectionRequest;
		WinLogin.onExitRequest       = OnExitRequest;
		WinLogin.append();

		// Hook packets
		Network.hookPacket( PACKET.AC.ACCEPT_LOGIN,    OnConnectionAccepted );
		Network.hookPacket( PACKET.AC.REFUSE_LOGIN,    OnConnectionRefused );
		Network.hookPacket( PACKET.AC.REFUSE_LOGIN_R2, OnConnectionRefused );
		Network.hookPacket( PACKET.SC.NOTIFY_BAN,      OnServerClosed );
	}


	/**
	 * Reload WinLogin
	 */
	function Reload()
	{
		UIManager.removeComponents();
		WinLogin.onConnectionRequest = OnConnectionRequest;
		WinLogin.onExitRequest       = OnExitRequest;
		WinLogin.append();
	}


	/**
	 * Trying to connect to Login server
	 *
	 * @param {string} username
	 * @param {string} password
	 */
	function OnConnectionRequest( username, password )
	{
		// Play "¹öÆ°¼Ò¸®.wav" (possible problem with charset)
		Sound.play("\xB9\xF6\xC6\xB0\xBC\xD2\xB8\xAE.wav");

		// Add the loading screen
		// Store the ID to use for the ping
		WinLogin.remove();
		WinLoading.append();
		_loginID = username;

		// Try to connect
		Network.connect( _server.address, _server.port, function( success ) {
			// Fail to connect...
			if ( !success ) {
				UIManager.showErrorBox(DB.msgstringtable[1]);
				return;
			}

			// Success, try to connect
			var pkt        = new PACKET.CA.LOGIN();
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
	function OnExitRequest()
	{
		require('Engine/GameEngine').reload();
	}


	/**
	 * User selected a char-server
	 *
	 * @param {number} index in server list
	 */
	function OnCharServerSelected( index )
	{
		// Play "¹öÆ°¼Ò¸®.wav" (encode to avoid problem with charset)
		Sound.play("\xB9\xF6\xC6\xB0\xBC\xD2\xB8\xAE.wav");

		WinList.remove();
		WinLoading.append();

		CharEngine.onExitRequest = Reload;
		CharEngine.init( _charServers[index] );
	}


	/**
	 * Accepted connection from char-server
	 *
	 * @param {object} pkt - PACKET.AC.ACCEPT_LOGIN
	 */
	function OnConnectionAccepted( pkt )
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
		for( i = 0; i < count; ++i ) {
			list[i]  =  _charServers[i].property ? DB.msgstringtable[481] + " " : "";
			list[i] +=  _charServers[i].name;
			list[i] +=  _charServers[i].state    ? DB.msgstringtable[484] : " " + DB.msgstringtable[483].replace("%d", _charServers[i].usercount);
		}

		// Show window
		WinList.onIndexSelected = OnCharServerSelected;
		WinList.onExitRequest   = function(){
			Network.close();
			WinList.remove();
			WinLogin.append();
		};
		WinList.setList(list);
		WinList.append();


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
	function OnConnectionRefused( pkt )
	{
		var error = 9;
		switch ( pkt.ErrorCode ) {
			case   0: error =    6; break; // Unregistered ID
			case   1: error =    7; break; // Incorrect Password
			case   2: error =    8; break; // This ID is expired
			case   3: error =    3; break; // Rejected from Server
			case   4: error =  704; break; // You have been blocked by the GM Team - TODO: check it
			case   5: error =  310; break; // Your Game's EXE file is not the latest version
			case   6: error =  449; break; // Your are Prohibited to log in until %s
			case   7: error =  264; break; // Server is jammed due to over populated
			case   8: error =  681; break; // 8 = No more accounts may be connected from this company - TODO: check it
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
			DB.msgstringtable[error].replace('%s', pkt.blockDate),
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
	function OnServerClosed( pkt )
	{
		var msg_id;

		switch( pkt.ErrorCode ) {
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

		UIManager.showErrorBox( DB.msgstringtable[msg_id] );
		Network.close();
	}


	/**
	 * Export
	 */
	return {
		init:   Init,
		reload: Reload
	};
});