/**
 * UI/Components/CharSelect/CharSelect.js
 *
 * Chararacter Selection windows
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function(require)
{
	"use strict";


	/**
	 * Dependencies
	 */
	var DB                 = require('DB/DBManager');
	var Preferences        = require('Core/Preferences');
 	var KEYS               = require('Controls/KeyEventHandler');
	var Renderer           = require('Renderer/Renderer');
	var Entity             = require('Renderer/Entity/Entity');
	var SpriteRenderer     = require('Renderer/SpriteRenderer');
	var Camera             = require('Renderer/Camera');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var htmlText           = require('text!./CharSelect.html');
	var cssText            = require('text!./CharSelect.css');


	/**
	 * Create Chararacter Selection namespace
	 */
	var CharSelect = new UIComponent( 'CharSelect', htmlText, cssText );


	/**
	 * Initialize UI
	 */
	CharSelect.init = function Init()
	{
		this.preferences   = Preferences.get('CharSelect', {
			index: 0
		}, 1.0 );

		this.maxSlots    = 3 * 9;
		this.ctx         = [];
		this.list        = [];
		this.slots       = [];
		this.entitySlots = [];
		this.index       = 0;

		var ui = this.ui;
		ui.css({ top: (Renderer.height-342)/2, left: (Renderer.width-576)/2 });
		this.draggable();

		// Bind buttons
		ui.find('.ok'    ).click( this.connect.bind(this) );
		ui.find('.cancel').click( this.cancel.bind(this) );
		ui.find('.make'  ).click( this.create.bind(this) );
		ui.find('.delete').click( this.suppress.bind(this) );

		ui.find('.arrow.left' ).mousedown(this.genericArrowDown(-1));
		ui.find('.arrow.right').mousedown(this.genericArrowDown(+1));

		// Bind canvas
		ui.find('.slot1').mousedown(this.genericCanvasDown(0));
		ui.find('.slot2').mousedown(this.genericCanvasDown(1));
		ui.find('.slot3').mousedown(this.genericCanvasDown(2));

		ui.find('canvas').
			dblclick(function(){
				if( CharSelect.slots[ CharSelect.index ] )
					CharSelect.connect();
				else
					CharSelect.create();
			}).
			each(function(){
				CharSelect.ctx.push( this.getContext('2d') );
			});
	};


	/**
	 * Generic method to handle mousedown on arrow
	 *
	 * @param {number} value to move
	 */
	CharSelect.genericArrowDown = function GenericArrowDown( value )
	{
		return function( event ) {
			this.moveTo( (this.index + this.maxSlots + value) % this.maxSlots );
			event.stopImmediatePropagation();
			return false;
		}.bind( CharSelect );
	};


	/**
	 * Generic method to handle mousedown on arrow
	 *
	 * @param {number} value to move
	 */
	CharSelect.genericCanvasDown = function GenericCanvasDown( value )
	{
		return function( event ) {
			this.moveTo( Math.floor(this.index / 3) * 3 + value );
			event.stopImmediatePropagation();
			return false;
		}.bind( CharSelect );
	};


	/**
	 * Once append to body
	 */
	CharSelect.onAppend = function onAppend()
	{
		this.index = this.preferences.index;

		this.ui.find('.slotinfo .content').text( DB.msgstringtable[2004] );
		this.ui.find('.slotinfo .number').text( this.list.length + ' / ' + this.maxSlots );
		this.ui.find('.pageinfo .count').text( this.maxSlots / 3 );

		// Update values
		this.moveTo( this.index );

		// Start rendering
		Renderer.render(this.render)
	};


	/**
	 * Stop rendering
	 */
	CharSelect.onRemove = function onRemove()
	{
		this.preferences.index = this.index;
		this.preferences.save();
		Renderer.stop();
	};


	/**
	 * Bind Key events
	 *
	 * @param {object} event
	 */
	CharSelect.onKeyDown = function BindKeyEvent( event )
	{
		switch( event.which ) {
			case KEYS.ESCAPE:
				this.cancel();
				break;
	
			case KEYS.LEFT:
				this.moveTo(this.index-1);
				break;

			case KEYS.RIGHT:
				this.moveTo(this.index+1);
				break;

			case KEYS.SUPR:
				if( this.slots[ this.index ] ) {
					this.suppress();
				}
				break;

			case KEYS.ENTER:
				if( this.slots[ this.index ] ) {
					this.connect();
				}
				else {
					this.create();
				}
				break;

			default:
				return true;
		}

		event.stopImmediatePropagation();
		return false;
	};


	/**
	 * Add players to window
	 *
	 * @param {object} pkt - packet structure
	 */
	CharSelect.setInfo = function setInfo( pkt )
	{
		this.maxSlots     = pkt.TotalSlotNum;
		this.sex          = pkt.sex;
		this.slots        = [];
		this.entitySlots  = [];
		this.list         = [];

		if( pkt.charInfo ) {
			var i, count = pkt.charInfo.length;
			for( i=0; i<count; ++i ) {
				this.addCharacter( pkt.charInfo[i] );
			}
		}

		this.ui.find('.slotinfo .number').text( this.list.length + ' / ' + this.maxSlots );
		this.ui.find('.pageinfo .count').text( this.maxSlots / 3 );
		this.moveTo( this.index );
	};


	/**
	 * Adding a Character to the list
	 *
	 * @param {object} character data
	 */
	CharSelect.addCharacter = function addCharacter( character )
	{
		character.sex = CharSelect.sex;
		this.list.push( character );
	 	this.slots[ character.CharNum ] = character;
		this.entitySlots[ character.CharNum ] = new Entity();
		this.entitySlots[ character.CharNum ].set( character );
	};


	/**
	 * Press "cancel" or ESCAPE key
	 */
	CharSelect.cancel = function Cancel()
	{
		UIManager.showPromptBox( DB.msgstringtable[17], "ok", "cancel", function(){
			CharSelect.onExitRequest();
		}, null);
	};


	/**
	 * Jumping to Character creation window
	 */
	CharSelect.create = function Create()
	{
		CharSelect.onCreateRequest( CharSelect.index );
	};


	/**
	 * Select Player, connect
	 */
	CharSelect.connect = function Connect() {
		if( CharSelect.slots[ CharSelect.index ] ) {
			CharSelect.preferences.index = CharSelect.index;
			CharSelect.preferences.save();
			CharSelect.onConnectRequest( CharSelect.slots[ CharSelect.index ] );
		}
	};


	/**
	 * Delete a character
	 */
	CharSelect.suppress = function Delete() {
		if( CharSelect.slots[ CharSelect.index ] ) {
			CharSelect.off('keydown');
			CharSelect.onDeleteRequest( CharSelect.slots[ CharSelect.index ].GID );
		}
	};


	/**
	 * Answer from server to delete a character
	 *
	 * @param {number} error id
	 */
	CharSelect.deleteAnswer = function DeleteAnswer( error )
	{
		this.on('keydown');

		switch( error ) {
			// Do nothing, just re-set the keydown
			case -2:
				return;

			// Success (clean up character)
			case -1:
				delete this.slots[ this.index ];
				delete this.entitySlots[ this.index ];

				var i=0;
				var count = this.list.length;

				while( i < count ) {
					if( this.list[i].CharNum === this.index ) {
						this.list.splice( i, 1 );
						--count;
					}
					else {
						i++;
					}
				}

				// Refresh UI
				this.moveTo( this.index );
				this.ui.find('.slotinfo .number').text( this.list.length + ' / ' + this.maxSlots );
				return;

			default: // Others error ?
			case  0: // Incorrect adress email
				UIManager.showMessageBox( DB.msgstringtable[301], "ok" );
				break;
		}
	};


	/**
	 * Move cursor, update window value
	 *
	 * @param {number} index
	 */
	CharSelect.moveTo = function MoveTo( index )
	{
		var ui = this.ui;
		var $charinfo = ui.find('.charinfo');

		// Set the last entity to idle
		var entity = this.entitySlots[this.index];
		if( entity ) {
			entity.setAction({
				action: entity.ACTION.IDLE,
				frame:  0,
				play:   true,
				repeat: true
			});
		}

		// Move
		this.index = (index + this.maxSlots) % this.maxSlots;
		ui.find('.box_select').
			removeClass('slot1 slot2 slot3').
			addClass('slot' + (this.index % 3 + 1));

		// Set page
		ui.find('.pageinfo .current').text( Math.floor( this.index / 3) + 1 );

		// Not found, just clean up.
		entity = this.entitySlots[this.index];
		if( !entity ) {
			$charinfo.find('div').empty();
			ui.find('.make').show();
			ui.find('.delete').hide();
			ui.find('.ok').hide();
			return;
		}

		// Animate the character
		entity.setAction({
			action: entity.ACTION.READYFIGHT,
			frame:  0,
			play:   true,
			repeat: true
		});

		// Bind new value
		ui.find('.make').hide();
		ui.find('.delete').show();
		ui.find('.ok').show();

		var info = this.slots[ this.index ];
		$charinfo.find('.name').text( info.name );
		$charinfo.find('.job').text( DB.mobname[info.job] || '' );
		$charinfo.find('.lvl').text( info.level );
		$charinfo.find('.exp').text( info.exp );
		$charinfo.find('.hp').text( info.hp );
		$charinfo.find('.sp').text( info.sp );

		//TODO: Check win_select.bmp size to insert it if needed ?
		//$charinfo.find('.map').text( info.lastMap || '' );
		$charinfo.find('.str').text( info.Str );
		$charinfo.find('.agi').text( info.Agi );
		$charinfo.find('.vit').text( info.Vit );
		$charinfo.find('.int').text( info.Int );
		$charinfo.find('.dex').text( info.Dex );
		$charinfo.find('.luk').text( info.Luk );
	};


	/**
	 * Render sprites to canvas
	 */
	CharSelect.render = function Render()
	{
		var i, idx = Math.floor( CharSelect.index / 3) * 3;
		Camera.direction = 4;

		for( i=0; i<3; ++i ) {
			CharSelect.ctx[i].clearRect(0, 0, CharSelect.ctx[i].canvas.width, CharSelect.ctx[i].canvas.height );
			if( CharSelect.entitySlots[idx+i] ) {
				SpriteRenderer.bind2DContext( CharSelect.ctx[i], 63, 130 );
				CharSelect.entitySlots[idx+i]._renderSub(0);
			}
		}
	};


	/**
	 * Callback to use
	 */
	CharSelect.onExitRequest    = function OnExitRequest(){};
	CharSelect.onDeleteRequest  = function OnDeleteRequest(){};
	CharSelect.onCreateRequest  = function OnCreateRequest(){};
	CharSelect.onConnectRequest = function OnConnectRequest(){};


	/**
	 * Create componentand export it
	 */
	return UIManager.addComponent(CharSelect);
});