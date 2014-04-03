/**
 * Renderer/Entity/EntityRoom.js
 *
 * Shop / Chat room above entity's head
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(['Utils/gl-matrix', 'Renderer/Renderer', 'Core/Client', 'DB/DBManager', 'UI/Components/EntityRoom/EntityRoom' ],
function(       glMatrix,            Renderer,        Client,      DB,                                   EntityRoom)
{
	'use strict';


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
		this.node    = null;
		this.type    = Room.Type.BUY_SHOP;
		this.id      = 0;
		this.title   = '';
		this.count   = 0;
		this.limit   = 0;
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
	Room.prototype.create = function create( title, id, type, clickable )
	{
		var self = this;

		this.node = EntityRoom.clone('EntityRoom', true);
		this.node.init = function init()
		{
			var filename;

			switch (type) {
				case Room.Type.SELL_SHOP:
					filename = 'buyingshop';
					break;

				case Room.Type.BUY_SHOP:
					filename = 'shop';
					break;

				case Room.Type.PRIVATE_CHAT:
					filename = 'chat_close';
					break;

				default:
				case Room.Type.PUBLIC_CHAT:
					filename = 'chat_open';
					break;
			}

			self.type = type;
			self.id   = id;

			if (clickable) {
				self.node.onEnter = self.owner.onRoomEnter.bind(self.owner);
			}

			Client.loadFile( DB.INTERFACE_PATH + filename + '.bmp', function(url){
				self.display = true;

				if (self.node) {
					self.node.setTitle( title, url );
				}
			});
		};

		this.node.append();
	};


	/**
	 * Remove Room
	 */
	Room.prototype.remove = function remove()
	{
		this.display = false;
		if (this.node) {
			this.node.remove();
		}
	};


	/**
	 * Clean Room
	 */
	Room.prototype.clean = function clean()
	{
		this.remove();
		this.node = null;
	};



	/**
	 * Rendering Room
	 *
	 * @param {mat4} matrix
	 */
	Room.prototype.render = function render( matrix )
	{
		var ui = this.node.ui[0];
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

		ui.style.top  = (_pos[1] | 0 ) + 'px';
		ui.style.left = ((_pos[0] - 70) | 0) + 'px';
	};


	/**
	 * Export
	 */
	return function Init()
	{
		this.room = new Room(this);
	};
});