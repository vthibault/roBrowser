/**
 * UI/Components/Announce/Announce.js
 *
 * Announce GUI
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
	var jQuery      = require('Utils/jquery');
	var Events      = require('Core/Events');
	var Renderer    = require('Renderer/Renderer');
	var UIManager   = require('UI/UIManager');
	var UIComponent = require('UI/UIComponent');


	/**
	 * Create Announce component
	 */
	var Announce = new UIComponent( 'Announce' );


	/**
	 * Mouse can cross this UI
	 */
	Announce.mouseMode = UIComponent.MouseMode.CROSS;


	/**
	 * @var {boolean} do not focus this UI
	 */
	Announce.needFocus = false;


	/**
	 * @var {TimeOut} timer
	 */
	var _timer = 0;


	/**
	 * @var {number} how many time the announce is display (20secs)
	 */
	var _life = 20 * 1000;


	/**
	 * Initialize component
	 */
	Announce.init = function init()
	{
		this.canvas = document.createElement('canvas');
		this.ctx    = this.canvas.getContext('2d');
		this.ui     = jQuery(this.canvas);

		this.ui.attr('id', 'Announce').css({
			position: 'absolute',
			top:       50,
			zIndex:    40
		});
	};


	/**
	 * Once removed from HTML, clean timer
	 */
	Announce.onRemove = function onRemove()
	{
		if (_timer) {
			Events.clearTimeout( _timer );
			this.timer = 0;
		}
	};


	/**
	 * Timer end, cleaning announce
	 */
	Announce.timeEnd = function timeEnd()
	{
		this.remove();
	};


	/**
	 * Add an announce with text and color
	 *
	 * @param {string} text to display
	 * @param {string} color
	 */
	Announce.set = function set( text, color )
	{
		var fontSize = 12;
		var maxWidth = 450;
		var lines    = [];

		var width    = 0;
		var result;
		var i, j, count;

		this.ctx.font = fontSize + 'px Arial';

		// Create lines
		while (text.length) {
			i = text.length;
			while (this.ctx.measureText(text.substr(0,i)).width > maxWidth) {
				i--;
			}

			result = text.substr(0,i);

			if (i !== text.length) {
				j = 0;
				while (result.indexOf(' ',j) !== -1) {
					j = result.indexOf(' ',j) + 1;
				}
			}

			lines.push( result.substr(0, j || result.length) );
			width = Math.max( width, this.ctx.measureText(lines[ lines.length-1 ]).width );
			text  = text.substr( lines[ lines.length-1 ].length, text.length );
		}


		// Get new canvas size
		this.canvas.width      = 20 + width;
		this.canvas.height     = 10 + ( fontSize + 5 ) * lines.length;
		this.canvas.style.left = ((Renderer.width - this.canvas.width) >> 1) + 'px';

		// Updating canvas size reset font value
		this.ctx.font          = fontSize + 'px Arial';

		// Display background
		this.ctx.fillStyle     = 'rgba(0,0,0,0.5)';
		this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height );

		// Display text
		this.ctx.fillStyle     = color || '#FFFF00';
		for (i = 0, count = lines.length; i < count; ++i) {
			this.ctx.fillText( lines[i], 10, 5 + fontSize + (fontSize+5) * i );
		}

		// Start tomer
		if (_timer) {
			Events.clearTimeout(_timer);
		}

		this.timer = Events.setTimeout( this.timeEnd.bind(this), _life );
	};


	/**
	 * Create component and return it
	 */
	return UIManager.addComponent(Announce);
});
