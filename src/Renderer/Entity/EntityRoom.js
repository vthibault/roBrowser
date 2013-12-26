/**
 * Renderer/Entity/EntityRoom.js
 *
 * Shop / Chat room above entity's head
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(['Utils/gl-matrix', 'Renderer/Renderer', 'Core/Client', 'DB/DBManager' ], function( glMatrix, Renderer, Client, DB )
{
	"use strict";


	/**
	 * Private methods
	 */
	var vec4  = glMatrix.vec4;
	var _pos  = new Float32Array(4);
	var _size = new Float32Array(2);


	/**
	 * @Constructor Room
	 */
	function Room( owner )
	{
		this.owner   = owner;
		this.text    = '';
		this.display = false;
		this.ui      = null;
		this.type    = Room.Type.BUY_SHOP;
		this.id      = 0;
	}


	/**
	 * Constants
	 */
	Room.Type = {
		SELL_SHOP:    0,
		BUY_SHOP:     1,
		PUBLIC_CHAT:  2,
		PRIVATE_CHAT: 3,
	};



	/**
	 * Create a room
	 *
	 * @param {string} room title
	 * @param {id} target id
	 * @param {const} Room.Type constant
	 * @param {bool} is clickable ?
	 */
	Room.prototype.create = function Create( title, id, type, clickable )
	{
		var filename;

		if( this.ui === null ) {
			this.ui                       = document.createElement('div');
			this.ui.style.position        = 'absolute';
			this.ui.style.zIndex          = '45';
			this.ui.style.width           = '140px';
			this.ui.style.borderRadius    = '5px';
			this.ui.style.backgroundColor = 'white';
			this.ui.style.padding         = '2px';
			this.ui.style.letterSpacing   = '0px';
	
			var text = document.createElement('button');
			text.style.backgroundColor = 'transparent';
			text.style.border          = '1px solid #c1c6c2';
			text.style.height          = '24px';
			text.style.padding         = '0px';
			text.style.borderRadius    = '5px';
			text.style.width           = '100%';
			text.style.textAlign       = 'left';
			this.ui.appendChild(text);
		}

		switch( type ) {
			case Room.Type.SELL_SHOP:
				filename = "buyingshop";
				break;

			case Room.Type.BUY_SHOP:
				filename = "shop";
				break;

			case Room.Type.PRIVATE_CHAT:
				filename = "chat_close";
				break;

			default:
			case Room.Type.PUBLIC_CHAT:
				filename = "chat_open";
				break;
		}

		this.display    = true;
		this.type       = type;
		this.id         = id;
		text.ondblclick = clickable ? this.owner.onRoomEnter.bind(this.owner) : null;


		Client.loadFile( DB.INTERFACE_PATH + filename + ".bmp", function(url){
			text.innerHTML          = '<img src="'+ url +'" style="vertical-align:-8px"/> ' + title;
		});

		if( !this.ui.parentNode ) {
			document.body.appendChild(this.ui);
		}
	};


	/**
	 * Remove Room
	 */
	Room.prototype.remove = function Remove()
	{
		this.display = false;
		if ( this.ui && this.ui.parentNode ) {
			document.body.removeChild(this.ui);
		}
	};


	/**
	 * Clean Room
	 */
	Room.prototype.clean = function Clean()
	{
		this.remove();
		this.ui = null;
	};



	/**
	 * Rendering Room
	 *
	 * @param {mat4} matrix
	 */
	Room.prototype.render = function Render( matrix )
	{
		var ui = this.ui;
		var z;

		// Cast position
		_pos[0] =  0.0;
		_pos[1] =  140 / 35;
		_pos[2] =  0.0;
		_pos[3] =  1.0;

		// Set the viewport
		_size[0] = Renderer.width  / 2;
		_size[1] = Renderer.height / 2;

		// Project point to scene
		vec4.transformMat4( _pos, _pos, matrix );

		// Calculate position
		z = _pos[3] === 0.0 ? 1.0 : ( 1.0 / _pos[3] );
		_pos[0] = _size[0] + Math.round(_size[0] * (_pos[0] * z));
		_pos[1] = _size[1] - Math.round(_size[1] * (_pos[1] * z));

		ui.style.top  = (_pos[1] | 0 ) + "px";
		ui.style.left = ((_pos[0] - 70) | 0) + "px";
	};


	/**
	 * Export
	 */
	return function Init()
	{
		this.room = new Room(this);
	};
});