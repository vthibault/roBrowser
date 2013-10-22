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
	"use strict";


	/**
	 * Dependencies
	 */
	var jQuery             = require('Utils/jquery');
	var Renderer           = require('Renderer/Renderer');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');


	/**
	 * Create Announce component
	 */
	var Announce = new UIComponent( 'Announce' );


	/**
	 * @var {TimeOut} timer
	 */
	Announce.timer = 0;


	/**
	 * @var {number} how many time the announce is display (20secs)
	 */
	Announce.life = 20 * 1000;


	/**
	 * Initialize component
	 */
	Announce.init = function Init()
	{
		this.canvas = document.createElement('canvas');
		this.ctx    = this.canvas.getContext('2d');
		this.ui     = jQuery(this.canvas);

		this.ui.attr('id', 'Announce').css({ position:'absolute', top:50, zIndex:40 });
	};


	/**
	 * Once removed from HTML, clean timer
	 */
	Announce.onRemove = function OnRemove()
	{
		if( this.timer ) {
			clearTimeout( this.timer );
			this.timer = 0;	
		}
	};


	/**
	 * Timer end, cleaning announce
	 */
	Announce.timeEnd = function TimeEnd()
	{
		this.remove();
	};


	/**
	 * Add an announce with text and color
	 *
	 * @param {string} text to display
	 * @param {string} color
	 */
	Announce.set = function Set( text, color )
	{
		var FontSize = 12;
		var MaxWidth = 450;
		var lines    = [];

		var width    = 0;
		var str, result;
		var i, j, count;

		this.ctx.font = FontSize + "px Arial";

		// Create lines
		while ( text.length ) {
            i = text.length;
            while( this.ctx.measureText(text.substr(0,i)).width > MaxWidth ) {
                i--;
            }

			result = text.substr(0,i);

			if ( i !== text.length ) {
                j = 0;
				while( result.indexOf(" ",j) !== -1 ) {
                    j = result.indexOf(" ",j) + 1;
                }
            }

			lines.push( result.substr(0, j || result.length) );
			width = Math.max( width, this.ctx.measureText(lines[ lines.length-1 ]).width );
			text  = text.substr( lines[ lines.length-1 ].length, text.length );
		}


		// Get new canvas size
		this.canvas.width      = 20 + width;
		this.canvas.height     = 10 + ( FontSize + 5 ) * lines.length;
		this.canvas.style.left = ( (Renderer.width - this.canvas.width) >> 1 ) + "px";

		// Updating canvas size reset font value
		this.ctx.font          = FontSize + "px Arial";

		// Display background
		this.ctx.fillStyle     = "rgba(0,0,0,0.5)";
		this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height );

		// Display text
		this.ctx.fillStyle = color || '#FFFF00';
		for ( i = 0, count = lines.length; i < count; ++i ) {
			this.ctx.fillText( lines[i], 10, 5 + FontSize + (FontSize+5) * i );
		}

		// Start tomer
		if( this.timer ) {
			clearTimeout( this.timer );	
		}

		this.timer = setTimeout( this.timeEnd.bind(this), this.life );
	};


	/**
	 * Create component and return it
	 */
	return UIManager.addComponent(Announce);
});
