/**
 * Engine/MapEngine/NPC.js
 *
 * Manage Entity based on received packets from server
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function( require )
{
	'use strict';


	/**
	 * Load dependencies
	 */
	var jQuery        = require('Utils/jquery');
	var DB            = require('DB/DBManager');
	var Sound         = require('Audio/SoundManager');
	var BGM           = require('Audio/BGM');
	var Client        = require('Core/Client');
	var Session       = require('Engine/SessionStorage');
	var Network       = require('Network/NetworkManager');
	var PACKET        = require('Network/PacketStructure');
	var Renderer      = require('Renderer/Renderer');
	var NpcBox        = require('UI/Components/NpcBox/NpcBox');
	var InputBox      = require('UI/Components/InputBox/InputBox');
	var NpcMenu       = require('UI/Components/NpcMenu/NpcMenu');
	var WinPopup      = require('UI/Components/WinPopup/WinPopup');
	var MiniMap       = require('UI/Components/MiniMap/MiniMap');


	/**
	 * NPC write a message
	 *
	 * @param {object} pkt - PACKET.ZC.SAY_DIALOG
	 */
	function onMessage( pkt )
	{
		NpcBox.append();
		NpcBox.setText( pkt.msg, pkt.NAID);
	}


	/**
	 * Display a "next" button
	 *
	 * @param {object} pkt - PACKET_ZC_WAIT_DIALOG
	 */
	function onNextAppear( pkt )
	{
		NpcBox.append();
		NpcBox.addNext( pkt.NAID );
	}


	/**
	 * Display a "close button"
	 *
	 * @param {object} pkt - PACKET.ZC.CLOSE_DIALOG
	 */
	function onCloseAppear( pkt )
	{
		// Should not happened, but sometimes dev write a "close" in script instead of
		// a "end" when there is no message.
		if (NpcBox.ui && NpcBox.ui.is(':visible'))  {
			NpcBox.addClose( pkt.NAID );
		}
	}


	/**
	 * Server want to close a npc
	 *
	 * @param {object} pkt - PACKET.ZC.CLOSE_SCRIPT
	 */
	function onCloseScript( pkt )
	{
		if (NpcBox.ownerID === pkt.NAID) {
			NpcBox.remove();
			NpcMenu.remove();

			var cutin = document.getElementById('cutin');
			if (cutin && cutin.parentNode) {
				document.body.removeChild(cutin);
			}
		}
	}


	/**
	 * Display a menu
	 *
	 * @param {object} pkt - PACKET.ZC.MENU_LIST
	 */
	function onMenuAppear( pkt )
	{
		NpcMenu.append();
		NpcMenu.setMenu( pkt.msg, pkt.NAID );

		NpcMenu.onSelectMenu = function onSelectMenu( NAID, index ){
			NpcMenu.remove();

			// Remove npc box when pressed "cancel"
			if (index === 255) {
				NpcBox.remove();
			}

			var pkt  = new PACKET.CZ.CHOOSE_MENU();
			pkt.NAID = NAID;
			pkt.num  = index;
			Network.sendPacket(pkt);
		};
	}


	/**
	 * Display input
	 *
	 * @param {object} pkt - PACKET.ZC.OPEN_EDITDLG or PACKET.ZC.OPEN_EDITDLGSTR
	 */
	function onInputAppear( pkt )
	{
		var type = pkt instanceof PACKET.ZC.OPEN_EDITDLGSTR ? 'text' : 'number';
		var id = pkt.NAID;

		InputBox.onAppend = function OnAppend()
		{
			InputBox.setType(type, true);
		};

		InputBox.onSubmitRequest = function OnSubmitRequest( data )
		{
			InputBox.remove();
			var pkt;

			switch (type) {
				case 'text':
					pkt     = new PACKET.CZ.INPUT_EDITDLGSTR();
					pkt.msg = data;
					break;

				default:
				case 'number':
					pkt       = new PACKET.CZ.INPUT_EDITDLG();
					pkt.value = data;
					break;
			}

			pkt.NAID = id;
			Network.sendPacket(pkt);
		};

		InputBox.append();
	}


	/**
	 * On Shop selection (buy/sell)
	 * @param {object} pkt - PACKET.ZC.SELECT_DEALTYPE
	 */
	function onDealSelection( pkt )
	{
		var WinDeal = WinPopup.clone('WinDeal');
		var NAID    = pkt.NAID;

		WinDeal.init = function Init()
		{
			this.draggable();
			this.ui.find('.text').text( DB.getMessage(92) );

			this.ui.css({
				top:  (Renderer.height) / 1.5,
				left: (Renderer.width -280) / 2.0,
				zIndex: 100
			});

			this.ui.find('.btns').append(

				jQuery('<button/>').
					addClass('btn').
					data('background', 'btn_buy.bmp').
					data('hover',      'btn_buy_a.bmp').
					data('down',       'btn_buy_b.bmp').
					one('click',function(){
						WinDeal.remove();
						var _pkt  = new PACKET.CZ.ACK_SELECT_DEALTYPE();
						_pkt.type = 0;
						_pkt.NAID = NAID;
						Network.sendPacket(_pkt);
					}).
					each( this.parseHTML ),

				jQuery('<button/>').
					addClass('btn').
					data('background', 'btn_sell.bmp').
					data('hover',      'btn_sell_a.bmp').
					data('down',       'btn_sell_b.bmp').
					one('click',function(){
						WinDeal.remove();
						var _pkt  = new PACKET.CZ.ACK_SELECT_DEALTYPE();
						_pkt.type = 1;
						_pkt.NAID = NAID;
						Network.sendPacket(_pkt);
					}).
					each( this.parseHTML ),

				jQuery('<button/>').
					addClass('btn').
					data('background', 'btn_cancel.bmp').
					data('hover',      'btn_cancel_a.bmp').
					data('down',       'btn_cancel_b.bmp').
					one('click',function(){
						WinDeal.remove();
					}).
					each( this.parseHTML )
			);

		};

		WinDeal.append();
	}


	/**
	 * Receive NPC image to display
	 * @param {object} pkt - PACKET.ZC.SHOW_IMAGE
	 */
	function onCutin( pkt )
	{
		// Only one instance of cutin
		var cutin = document.getElementById('cutin');
		if (cutin) {
			document.body.removeChild( cutin );
		}

		// Sending empty string just hide the cutin
		if (!pkt.imageName.length) {
			return;
		}

		if (pkt.imageName.indexOf('.') === -1) {
			pkt.imageName += '.bmp';
		}

		Client.loadFile( DB.INTERFACE_PATH + 'illust/' + pkt.imageName, function( url ){

			// If the npc box is already closed, don't show the image
			if (!NpcBox.ui || !NpcBox.ui.is(':visible')) {
				return;
			}

			var img            = new Image();
			img.src            = url;
			img.style.position = 'absolute';
			img.style.zIndex   = 40;
			img.id             = 'cutin';
			img.draggable      = false;

			switch (pkt.type) {
				default:
					return;

				case 0:
					img.style.bottom = '0px';
					img.style.left   = '0px';
					break;

				case 1:
					img.style.bottom     = '0px';
					img.style.left       = '50%';
					img.style.marginLeft = '-' + Math.floor(img.width / 2) + 'px';
					break;

				case 2:
					img.style.bottom = '0px';
					img.style.right  = '0px';
					break;

				case 3:
					// TODO: extend cutin system
					// break;

				case 4:
					img.style.top        = '50%';
					img.style.left       = '50%';
					img.style.marginLeft = '-' + Math.floor(img.width / 2)  + 'px';
					img.style.marginTop  = '-' + Math.floor(img.height / 2) + 'px';
					break;
			}

			document.body.appendChild(img);
		});
	}


	/**
	 * NPC put a mark on minimap
	 * @param {object} pkt - PACKET.ZC.COMPASS
	 */
	function onMinimapMarker( pkt )
	{
		// TODO: do we need to use NPC ID ? (pkt.NAID)

		switch (pkt.type) {

			// Add a mark for 15 seconds
			case 0:
				MiniMap.addNpcMark( pkt.id, pkt.xPos, pkt.yPos, pkt.color, 15000 );
				break;

			// Add a mark
			case 1:
				MiniMap.addNpcMark( pkt.id, pkt.xPos, pkt.yPos, pkt.color, Infinity );
				break;

			// Remove a mark
			case 2:
				MiniMap.removeNpcMark( pkt.id );
				break;
		}
	}


	/**
	 * Receive progressbar
	 *
	 * @param {object} pkt - PACKET_ZC_PROGRESS
	 */
	function onProgressBar( pkt )
	{
		Session.Entity.cast.onComplete = function(){
			var pkt = new PACKET.CZ.PROGRESS();
			Network.sendPacket(pkt);
		};

		var rgb = 'rgb(' + ([
				( pkt.color & 0x00ff0000 ) >> 16,
				( pkt.color & 0x0000ff00 ) >> 8,
				( pkt.color & 0x000000ff )
			]).join(',') + ')';

		// Color added only if the progressbar isn't black
		Session.Entity.cast.set( pkt.time * 1000, pkt.color ? rgb : null );
	}


	/**
	 * Stop Progressbar
	 *
	 * @param {object} pkt - PACKET.CZ.PROGRESS
	 */
	function onProgressBarStop()
	{
		Session.Entity.cast.remove();
	}


	/**
	 * Received sound from NPC
	 *
	 * @param {object} pkt - PACKET.ZC.SOUND
	 */
	function onSound( pkt )
	{
		switch (pkt.act) {

			// Play once
			case 0:
			case 1:
				Sound.play( pkt.fileName );
				break;

			// From rathena, should stop a sound but doesn't seems to work in official client ?
			case 2:
				Sound.stop( pkt.fileName );
				break;
		}

		// TODO: 3D sound based on npc(pkt.NAID) position ?
		// what is pkt.term ?
	}


	/**
	 * Received bgm from npc
	 *
	 * @param {object} pkt - PACKET.ZC.PLAY_NPC_BGM
	 */
	function onBGM( pkt )
	{
		if (!pkt.Bgm.match(/\.mp3$/i)) {
			pkt.Bgm += '.mp3';
		}

		BGM.play( pkt.Bgm );
	}


	/**
	 * Next button pressed
	 *
	 * @param {number} NAID - npc id
	 */
	NpcBox.onNextPressed = function onNextPressed( NAID )
	{
		var pkt  = new PACKET.CZ.REQ_NEXT_SCRIPT();
		pkt.NAID = NAID;
		Network.sendPacket( pkt );
	};


	/**
	 * Close button pressed
	 *
	 * @param {number} NAID - npc id
	 */
	NpcBox.onClosePressed = function onClosePressed( NAID )
	{
		var pkt  = new PACKET.CZ.CLOSE_DIALOG();
		pkt.NAID = NAID;
		Network.sendPacket( pkt );

		NpcBox.remove();
	};



	/**
	 * Initialize
	 */
	return function NPCEngine()
	{
		Network.hookPacket( PACKET.ZC.SAY_DIALOG,      onMessage );
		Network.hookPacket( PACKET.ZC.WAIT_DIALOG,     onNextAppear );
		Network.hookPacket( PACKET.ZC.CLOSE_DIALOG,    onCloseAppear );
		Network.hookPacket( PACKET.ZC.OPEN_EDITDLG,    onInputAppear );
		Network.hookPacket( PACKET.ZC.OPEN_EDITDLGSTR, onInputAppear );
		Network.hookPacket( PACKET.ZC.MENU_LIST,       onMenuAppear );
		Network.hookPacket( PACKET.ZC.SELECT_DEALTYPE, onDealSelection );
		Network.hookPacket( PACKET.ZC.SHOW_IMAGE,      onCutin );
		Network.hookPacket( PACKET.ZC.SHOW_IMAGE2,     onCutin );
		Network.hookPacket( PACKET.ZC.COMPASS,         onMinimapMarker );
		Network.hookPacket( PACKET.ZC.PROGRESS,        onProgressBar );
		Network.hookPacket( PACKET.ZC.PROGRESS_CANCEL, onProgressBarStop );
		Network.hookPacket( PACKET.ZC.SOUND,           onSound );
		Network.hookPacket( PACKET.ZC.PLAY_NPC_BGM,    onBGM );
		Network.hookPacket( PACKET.ZC.CLOSE_SCRIPT,    onCloseScript );
	};
});