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
	'use strict';


	/**
	 * Dependencies
	 */
	var DB                 = require('DB/DBManager');
	var MonsterTable       = require('DB/Monsters/MonsterTable');
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
	 * @var {Preferences} save where the cursor position is
	 */
	var _preferences = Preferences.get('CharSelect', {
		index: 0
	}, 1.0 );


	/**
	 * @var {number} max slots
	 */
	var _maxSlots = 3 * 9;


	/**
	 * var {Array} list of characters
	 */
	var _list = [];


	/**
	 * @var {Array} list of characters (index by slot)
	 */
	var _slots = [];


	/**
	 * @var {Array} list of entities (index by slot)
	 */
	var _entitySlots = [];


	/**
	 * @var {number} selector index
	 */
	var _index = 0;


	/**
	 * @var {Array} canvas context
	 */
	var _ctx = [];


	/**
	 * var {number} sex
	 */
	var _sex = 0;


	/**
	 * Initialize UI
	 */
	CharSelect.init = function Init()
	{
		var ui = this.ui;

		ui.css({
			top:  (Renderer.height-342)/2,
			left: (Renderer.width-576)/2
		});

		// Bind buttons
		ui.find('.ok'    ).click(connect);
		ui.find('.cancel').click(cancel);
		ui.find('.make'  ).click(create);
		ui.find('.delete').click(suppress);

		ui.find('.arrow.left' ).mousedown(genericArrowDown(-1));
		ui.find('.arrow.right').mousedown(genericArrowDown(+1));

		// Bind canvas
		ui.find('.slot1').mousedown(genericCanvasDown(0));
		ui.find('.slot2').mousedown(genericCanvasDown(1));
		ui.find('.slot3').mousedown(genericCanvasDown(2));

		ui.find('canvas').
			dblclick(function(){
				if (_slots[_index]) {
					connect();
				}
				else {
					create();
				}
			}).
			each(function(){
				_ctx.push( this.getContext('2d') );
			});

		this.draggable();
	};


	/**
	 * Once append to body
	 */
	CharSelect.onAppend = function onAppend()
	{
		_index = _preferences.index;

		this.ui.find('.slotinfo .number').text( _list.length + ' / ' + _maxSlots );
		this.ui.find('.pageinfo .count').text( _maxSlots / 3 );

		// Update values
		moveCursorTo(_index);

		// Start rendering
		Renderer.render(render);
	};


	/**
	 * Stop rendering
	 */
	CharSelect.onRemove = function onRemove()
	{
		_preferences.index = _index;
		_preferences.save();
		Renderer.stop();
	};


	/**
	 * Bind Key events
	 *
	 * @param {object} event
	 */
	CharSelect.onKeyDown = function onKeyDown( event )
	{
		switch (event.which) {
			case KEYS.ESCAPE:
				cancel();
				break;
	
			case KEYS.LEFT:
				moveCursorTo(_index-1);
				break;

			case KEYS.RIGHT:
				moveCursorTo(_index+1);
				break;

			case KEYS.SUPR:
				if (_slots[_index]) {
					suppress();
				}
				break;

			case KEYS.ENTER:
				if (_slots[_index]) {
					connect();
				}
				else {
					create();
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
		_maxSlots           = Math.floor((pkt.TotalSlotNum + pkt.PremiumStartSlot) || 9); // default 9 ?
		_sex                = pkt.sex;
		_slots.length       = 0;
		_entitySlots.length = 0;
		_list.length        = 0;

		if (pkt.charInfo) {
			var i, count = pkt.charInfo.length;
			for (i = 0; i < count; ++i) {
				CharSelect.addCharacter( pkt.charInfo[i] );

				// Guess the max slot
				// required if the client is < 20100413 and have more than 9 slots
				_maxSlots = Math.max( _maxSlots, Math.floor(pkt.charInfo[i].CharNum / 3 + 1) * 3 );
			}
		}

		this.ui.find('.slotinfo .number').text( _list.length + ' / ' + _maxSlots );
		this.ui.find('.pageinfo .count').text( _maxSlots / 3 );

		moveCursorTo( _index );
	};


	/**
	 * Answer from server to delete a character
	 *
	 * @param {number} error id
	 */
	CharSelect.deleteAnswer = function DeleteAnswer( error )
	{
		this.on('keydown');

		switch (error) {
			// Do nothing, just re-set the keydown
			case -2:
				return;

			// Success (clean up character)
			case -1:
				delete _slots[_index];
				delete _entitySlots[_index];

				var i = 0;
				var count = _list.length;

				while (i < count) {
					if (_list[i].CharNum === _index) {
						_list.splice( i, 1 );
						--count;
					}
					else {
						i++;
					}
				}

				// Refresh UI
				moveCursorTo( _index );
				this.ui.find('.slotinfo .number').text( _list.length + ' / ' + _maxSlots );
				return;

			default: // Others error ?
			case  0: // Incorrect adress email
				UIManager.showMessageBox( DB.getMessage(301), 'ok' );
				break;
		}
	};


	/**
	 * Adding a Character to the list
	 *
	 * @param {object} character data
	 */
	CharSelect.addCharacter = function addCharacter( character )
	{
		if (!('sex' in character) || character.sex === 99) {
			character.sex = _sex;
		}

		_list.push( character );
		_slots[ character.CharNum ] = character;

		_entitySlots[ character.CharNum ] = new Entity();
		_entitySlots[ character.CharNum ].set( character );
	};


	/**
	 * Callback to use
	 */
	CharSelect.onExitRequest    = function onExitRequest(){};
	CharSelect.onDeleteRequest  = function onDeleteRequest(){};
	CharSelect.onCreateRequest  = function onCreateRequest(){};
	CharSelect.onConnectRequest = function onConnectRequest(){};


	/**
	 * Generic method to handle mousedown on arrow
	 *
	 * @param {number} value to move
	 */
	function genericArrowDown( value )
	{
		return function( event ) {
			moveCursorTo((_index + _maxSlots + value) % _maxSlots );
			event.stopImmediatePropagation();
			return false;
		};
	}


	/**
	 * Generic method to handle mousedown on arrow
	 *
	 * @param {number} value to move
	 */
	function genericCanvasDown( value )
	{
		return function( event ) {
			moveCursorTo( Math.floor(_index / 3) * 3 + value );
			event.stopImmediatePropagation();
			return false;
		};
	}


	/**
	 * Press "cancel" or ESCAPE key
	 */
	function cancel()
	{
		UIManager.showPromptBox( DB.getMessage(17), 'ok', 'cancel', function(){
			CharSelect.onExitRequest();
		}, null);
	}


	/**
	 * Jumping to Character creation window
	 */
	function create()
	{
		CharSelect.onCreateRequest( _index );
	}


	/**
	 * Select Player, connect
	 */
	function connect() {
		if (_slots[_index]) {
			_preferences.index = _index;
			_preferences.save();
			CharSelect.onConnectRequest( _slots[_index] );
		}
	}


	/**
	 * Delete a character
	 */
	function suppress() {
		if (_slots[_index]) {
			CharSelect.off('keydown');
			CharSelect.onDeleteRequest( _slots[_index].GID );
		}
	}


	/**
	 * Move cursor, update window value
	 *
	 * @param {number} index
	 */
	function moveCursorTo( index )
	{
		var ui = CharSelect.ui;
		var $charinfo = ui.find('.charinfo');

		// Set the last entity to idle
		var entity = _entitySlots[_index];
		if (entity) {
			entity.setAction({
				action: entity.ACTION.IDLE,
				frame:  0,
				play:   true,
				repeat: true
			});
		}

		// Move
		_index = (index + _maxSlots) % _maxSlots;
		ui.find('.box_select').
			removeClass('slot1 slot2 slot3').
			addClass('slot' + (_index % 3 + 1));

		// Set page
		ui.find('.pageinfo .current').text( Math.floor( _index / 3) + 1 );

		// Not found, just clean up.
		entity = _entitySlots[_index];
		if (!entity) {
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

		var info = _slots[_index];
		$charinfo.find('.name').text( info.name );
		$charinfo.find('.job').text( MonsterTable[info.job] || '' );
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
	}


	/**
	 * Render sprites to canvas
	 */
	function render()
	{
		var i, count, idx;

		Camera.direction = 4;
		idx              = Math.floor(_index / 3) * 3;
		count            = _ctx.length;


		for (i = 0; i < count; ++i) {
			_ctx[i].clearRect(0, 0, _ctx[i].canvas.width, _ctx[i].canvas.height);

			if (_entitySlots[idx+i]) {
				SpriteRenderer.bind2DContext(_ctx[i], 63, 130);
				_entitySlots[idx+i].renderEntity();
			}
		}
	}


	/**
	 * Create componentand export it
	 */
	return UIManager.addComponent(CharSelect);
});