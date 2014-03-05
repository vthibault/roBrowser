/**
 * Engine/CharEngine.js
 *
 * Char Engine
 * Manage char server, connection, character selection / creation / deletion, etc.
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define([
	'require',
	'Utils/jquery',
	'DB/DBManager',
	'Audio/SoundManager',
	'Engine/SessionStorage',
	'Engine/MapEngine',
	'Network/NetworkManager',
	'Network/PacketStructure',
	'Network/PacketVerManager',
	'Renderer/Renderer',
	'UI/UIManager',
	'UI/Background',
	'UI/Components/CharSelect/CharSelect',
	'UI/Components/CharCreate/CharCreate',
	'UI/Components/WinPopup/WinPopup',
	'UI/Components/InputBox/InputBox'
], function(
	require,
	jQuery,
	DB,
	Sound,
	Session,
	MapEngine,
	Network,
	PACKET,
	PACKETVER,
	Renderer,
	UIManager,
	Background,
	CharSelect,
	CharCreate,
	WinPopup,
	InputBox
)
{
	"use strict";


	/**
	 * @var {object} server data
	 */
	var _server = null;


	/**
	 * @var {number} where to create character ?
	 */
	var _creationSlot = 0;


	/*
	 * Connect to char server
	 */
	function Init( server )
	{
		// Storing variable
		_server = server;

		// Connect to char server
		Network.connect( Network.utils.longToIP( server.ip ), server.port, function( success ){

			// Fail to connect...
			if ( !success ) {
				UIManager.showErrorBox( DB.msgstringtable[1] );
				return;
			}

			// Success, try to connect
			var pkt        = new PACKET.CH.ENTER();
			pkt.AID        = Session.AID;
			pkt.AuthCode   = Session.AuthCode;
			pkt.userLevel  = Session.UserLevel;
			pkt.Sex        = Session.Sex;
			pkt.clientType = Session.LangType;
			Network.sendPacket(pkt);

			// Server send back (new) AID
			Network.read(function(fp){
				Session.AID = fp.readLong();
			});
		});

		// Hook packets
		Network.hookPacket( PACKET.HC.ACCEPT_ENTER_NEO_UNION,        OnConnectionAccepted );
		Network.hookPacket( PACKET.HC.REFUSE_ENTER,                  OnConnectionRefused );
		Network.hookPacket( PACKET.HC.ACCEPT_MAKECHAR_NEO_UNION,     OnCreationSuccess );
		Network.hookPacket( PACKET.HC.REFUSE_MAKECHAR,               OnCreationFail );
		Network.hookPacket( PACKET.HC.ACCEPT_DELETECHAR,             OnDeleteAnswer );
		Network.hookPacket( PACKET.HC.REFUSE_DELETECHAR,             OnDeleteAnswer );
		Network.hookPacket( PACKET.HC.NOTIFY_ZONESVR,                OnReceiveMapInfo );
		Network.hookPacket( PACKET.HC.ACCEPT_ENTER_NEO_UNION_HEADER, OnConnectionAccepted );
		Network.hookPacket( PACKET.HC.ACCEPT_ENTER_NEO_UNION_LIST,   OnConnectionAccepted );
	}


	/**
	 * Reload Char-Select
	 */
	function Reload()
	{
		Network.close();
		Background.setImage( 'bgi_temp.bmp', function() {
			UIManager.removeComponents();
			Init( _server );
		});
	}


	/**
	 * Request to go back to Login Window
	 */
	function OnExitRequest()
	{
		require('Engine/LoginEngine').reload();
	}


	/**
	 * Connection accepted from char-server
	 * Displaying Character list
	 *
	 * @param {object} pkt - PACKET.HC.ACCEPT_ENTER_NEO_UNION
	 */
	function OnConnectionAccepted( pkt )
	{
		pkt.sex = Session.Sex;

		// Start sending ping
		var ping = new PACKET.CZ.PING();
		ping.AID = Session.AID;
		Network.setPing(function(){
			Network.sendPacket(ping);
		});

		UIManager.getComponent('WinLoading').remove();

		// Initialize window
		CharSelect.onExitRequest    = OnExitRequest;
		CharSelect.onConnectRequest = OnConnectRequest;
		CharSelect.onCreateRequest  = OnCreateRequest;
		CharSelect.onDeleteRequest  = OnDeleteRequest;
		CharSelect.append();
		CharSelect.setInfo( pkt );
	}


	/**
	 * Server don't want the user to connect
	 *
	 * @param {object} pkt - PACKET.HC.REFUSE_ENTER
	 */
	function OnConnectionRefused( pkt )
	{
		var msg_id;

		switch( pkt.ErrorCode ) {
			default:
			case 0: msg_id = 3; break;
			// other types ?
		}

		UIManager.showErrorBox( DB.msgstringtable[msg_id] );
	}


	/**
	 * User want to delete a character
	 *
	 * @param {number} charID - Character ID
	 */
	function OnDeleteRequest( charID )
	{
		var _ui_box;
		var _email;
		var _overlay;
		var _time_end;
		var _render = false;
		var _canvas, _ctx, _width, _height;
		var _TimeOut;

		// Delete the character
		function DeleteCharacter() {
			var pkt = new PACKET.CH.DELETE_CHAR();
			pkt.GID = charID;
			pkt.key = _email;
			Network.sendPacket(pkt);
		}

		// Cancel the prompt
		function onCancel() {
			InputBox.remove();
			_ui_box.remove();
			_overlay.detach();
			clearTimeout(_TimeOut);
			OnDeleteAnswer(-2);
		}

		// Ask the mail
		function onOk(){
			InputBox.append();
			InputBox.setType('mail', true);
			InputBox.ui.css('zIndex',101);
			InputBox.onSubmitRequest = onSubmit;
			_ui_box.append(); // don't remove message box
		}

		// Display prompt message
		_ui_box  = UIManager.showPromptBox( DB.msgstringtable[19], "ok", "cancel", onOk, onCancel);
		_overlay = jQuery('<div/>').addClass('win_popup_overlay').appendTo('body');

		// Submit the mail
		function onSubmit(email){
			_email = email;
			InputBox.remove();
			_ui_box.remove();

			// Stop rendering...
			_ui_box = UIManager.showMessageBox( DB.msgstringtable[296].replace("%d",10), 'cancel', function(){
				_render = false;
				onCancel();
			});

			// Build canvas
			_canvas = document.createElement('canvas');
			_ctx    = _canvas.getContext('2d');
			_width  = _canvas.width  = 240;
			_height = _canvas.height = 15;
			_canvas.style.marginTop = "10px";
			_canvas.style.marginLeft= "20px";
			_ui_box.ui.append(_canvas);

			// Parameter
			_time_end = (new Date).getTime() + 10000;
			_render  = true;

			// Start the timing
			Render();
		}

		// Rendering
		function Render() {
			// Calculate percent
			var time_left = _time_end - (new Date).getTime();
			var percent   =  Math.round( 100 - time_left / 100 );

			// Delete character
			if ( percent >= 100 ) {
				_ui_box.remove();
				_overlay.detach();
				DeleteCharacter();
				return;
			}

			// Update text
			_ui_box.ui.find('.text').text( DB.msgstringtable[296].replace("%d", Math.round(10-percent/10) ) );

			// Update progressbar
			_ctx.clearRect(0, 0, _width, _height);
			_ctx.fillStyle = "rgb(0,255,255)";
			_ctx.fillRect( 0, 0, _width, _height );
			_ctx.fillStyle = "rgb(140,140,140)";
			_ctx.fillRect( 1, 1, _width-2 , _height-2 );
			_ctx.fillStyle = "rgb(66,99,165)";
			_ctx.fillRect( 2, 2, Math.round(percent*(_width-4)/100) , _height-4 );
			_ctx.fillStyle = "rgb(255,255,0)";
			_ctx.fillText( percent + '%' ,  ( _width - _ctx.measureText( percent+'%').width ) * 0.5 , 12  );

			_TimeOut = setTimeout( Render, 30);
		}
	}


	/*
	 * Answer from server to delete character
	 *
	 * @param {object} PACKET.HC.REFUSE_DELETECHAR or PACKET.HC.ACCEPT_DELETECHAR
	 */
	function OnDeleteAnswer(pkt)
	{
		var result = typeof( pkt.ErrorCode ) === "undefined" ? -1 : pkt.ErrorCode;
		CharSelect.deleteAnswer(result);
	}


	/**
	 * Asking from CharSelect to create a character, moving to CharCreate window
	 *
	 * @param {number} index - slot where to create character
	 */
	function OnCreateRequest( index )
	{
		_creationSlot = index;
		CharSelect.remove();
		CharCreate.setAccountSex( Session.Sex );
		CharCreate.onCharCreationRequest = OnCharCreationRequest;
		CharCreate.onExitRequest = function(){
			CharCreate.remove();
			CharSelect.append();
		};
		CharCreate.append();
	}


	/**
	 * User want to create a character, send data to server
	 *
	 * @param {string} name
	 * @param {number} Str - strength stat
	 * @param {number} Agi - agility stat
	 * @param {number} Vit - vitality stat
	 * @param {number} Int - intelligence stat
	 * @param {number} Dex - dexterity stat
	 * @param {number} Luk - luck stat
	 * @param {number} hair - hair style
	 * @param {number} color - hair color
	 */
	function OnCharCreationRequest( name, Str, Agi, Vit, Int, Dex, Luk, hair, color )
	{
		var pkt;

		// Old Packet required stats
		if( PACKETVER.min < 20120307 ) {
			pkt = new PACKET.CH.MAKE_CHAR();
			pkt.Str  = Str;
			pkt.Agi  = Agi;
			pkt.Vit  = Vit;
			pkt.Int  = Int;
			pkt.Dex  = Dex;
			pkt.Luk  = Luk;
		}
		else {
			pkt = new PACKET.CH.MAKE_CHAR2();
		}

		pkt.name    = name;
		pkt.head    = hair;
		pkt.headPal = color;
		pkt.CharNum = _creationSlot;

		Network.sendPacket(pkt);
	}


	/**
	 * Success to create a character
	 *
	 * @param {object} pkt - PACKET.HC.ACCEPT_MAKECHAR_NEO_UNION
	 */
	function OnCreationSuccess( pkt )
	{
		CharCreate.remove();
		CharSelect.addCharacter( pkt.charinfo );
		CharSelect.append();
	}


	/**
	 * Fail to create a character
	 *
	 * @param {object} pkt - PACKET.HC.REFUSE_MAKECHAR
	 */
	function OnCreationFail( pkt )
	{
		var msg_id;

		switch( pkt.ErrorCode ) {
			case 0x00: msg_id =   10;  break; // 'Charname already exists'
			case 0x01: msg_id =  298;  break; // 'You are underaged'
			case 0x02: msg_id = 1272;  break; // 'Symbols in Character Names are forbidden'
			case 0x03: msg_id = 1355;  break; // 'You are not elegible to open the Character Slot.'
			default:
			case 0xFF: msg_id =   11;  break; // 'Char creation denied'
		}

		UIManager.showMessageBox( DB.msgstringtable[msg_id], "ok" );
	}


	/**
	 * User ask to connect with its player
	 *
	 * @param {object} entity to connect with
	 */
	function OnConnectRequest( entity )
	{
		// Play sound
		Sound.play("\xB9\xF6\xC6\xB0\xBC\xD2\xB8\xAE.wav");

		CharSelect.remove();
		UIManager.getComponent('WinLoading').append();
		Session.Character = entity;

		var pkt = new PACKET.CH.SELECT_CHAR();
		pkt.CharNum = entity.CharNum;
		Network.sendPacket(pkt);	
	}


	/**
	 * Player selection successful, get mapserver information to connect
	 *
	 * @param {object} pkt - PACKET.HC.NOTIFY_ZONESVR
	 */
	function OnReceiveMapInfo( pkt )
	{
		MapEngine.init( pkt.addr.ip, pkt.addr.port, pkt.GID, pkt.mapName);
	}


	// TODO: Add support for captcha, rename, changeslot and pincode.
	/*
	 * Captcha
	 *
	 * S 07e5 PACKET.CH.ENTER_CHECKBOT - Request for the captcha ?
	 * S 07e7 PACKET.CH.CHECKBOT - Send code
	 * R 07e8 PACKET.HC.CHECKBOT - image url ?
	 * R 07e9 PACKET.HC.CHECKBOT_RESULT - Result for captcha
	 */

	/*
	 * Rename (http://ragnarok.levelupgames.ph/main/new-loki-server-merge-faq/)
	 *
	 * S 08fc <char ID>.l <new name>.24B (new one) - Ask if valid
	 * S 028d PACKET.CH.REQ_IS_VALID_CHARNAME - Ask if valid
	 * R 028e PACKET.HC.ACK_IS_VALID_CHARNAME - Result
	 * S 028f PACKET.CH.REQ_CHANGE_CHARNAME (confirm)
	 */

	/*
	 * Change slot (http://ragnarok.levelupgames.ph/main/new-loki-server-merge-faq/)
	 *
	 * S 08d4 <from>.W <to>.W <unk>.W
	 * R 08d5 <len>.W <success>.W <unk>.W 
	 */

	/*
	 * Pincode
	 *
	 * S 08b8 <AID>.L <data>.4B - check PIN
	 * S 08c5 <AID>.L <data>.4B - request for PIN button ?
	 * S 08be <AID>.L <old>.4B <new>.4B - change PIN
	 * S 08ba <AID>.L <new>.4B - set PIN
	 * R 08b9 <seed>.L <AID>.L <state>.W
	 *	State:
	 *	0 = pin is correct
	 *	1 = ask for pin - client sends 0x8b8
	 *	2 = create new pin - client sends 0x8ba
	 *	3 = pin must be changed - client 0x8be
	 *	4 = create new pin ?? - client sends 0x8ba
	 *	5 = client shows msgstr(1896)
	 *	6 = client shows msgstr(1897) Unable to use your KSSN number
	 *	7 = char select window shows a button - client sends 0x8c5
	 *	8 = pincode was incorrect
	 */


	/**
	 * Export
	 */
	return {
		init:   Init,
		reload: Reload
	};
});