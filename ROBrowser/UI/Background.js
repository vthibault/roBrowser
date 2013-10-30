/**
 * UI/Background.js
 *
 * Background Manager
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define( function( require )
{
	"use strict";


	/**
	 * Load dependencies
	 */
	var DB     = require('DB/DBManager');
	var jQuery = require('Utils/jquery');
	var Client = require('Core/Client');


	/**
	 * Background Namespace
	 */
	var Background = {};


	/**
	 * Background canvas element
	 */
	Background.canvas = jQuery('<canvas/>')
		.css({ position: 'absolute', top: 0, left: 0, zIndex:-1 });


	/**
	 * Background context
	 */
	Background.ctx = Background.canvas[0].getContext('2d');


	/**
	 * Background overlay (used for transition)
	 */
	Background.overlay = jQuery('<div/>')
		.css({ position: 'absolute', top: 0, left: 0, zIndex:1000, backgroundColor:'black', opacity:0 });


	/**
	 * Background loading progress
	 * @var {integer} percent
	 */
	Background.progress = -1;


	/**
	 * Background Image
	 */
	Background.image = new Image();


	/**
	 * Background loading screen
	 */
	Background.loading = [];


	/**
	 * Initialize Background component
	 *
	 * @param {Array} loading - Array of loading filenames stored in clientinfo.xml
	 */
	Background.init = function Init( loading )
	{
		this.progress = 0;

		this.resize();

		if( loading ) {
			this.loading = loading;
			return;
		}

		// Generate default loadings
		this.loading.length = 10;
		for ( var i=1; i<=10; ++i ) {
			this.loading[i-1] = 'loading' + ( i < 10 ? '0' + i : i ) + '.jpg';
		}
	};


	/**
	 * Resize the background
	 */
	Background.resize = function Resize( width, height )
	{
		this.canvas[0].width   = width;
		this.canvas[0].height  = height;
		this.overlay.css({ width:width, height:height });

		this.ctx.fillStyle = "black";
		this.ctx.fillRect( 0, 0, width, height );

		this.render();
	};


	/**
	 * Render background (or a black background if no image is loaded yet)
	 */
	Background.render = function Render()
	{
		if( this.image.complete && this.image.width ) {
			this.ctx.drawImage( this.image, 0, 0, this.canvas[0].width, this.canvas[0].height );
		}
		else {
			this.ctx.fillStyle="#000";
			this.ctx.fillRect( 0, 0, this.canvas[0].width, this.canvas[0].height );
		}

		if( this.progress > -1 ) {
			this.setPercent( this.progress );
		}
	};


	/**
	 * Set an image as background
	 *
	 * @param {string} filename
	 * @param {function} callback once the image is loaded (optional)
	 */
	Background.setImage = function SetImage( filename, callback )
	{
		var exist = !!this.canvas[0].parentNode;
		this.progress = -1;
		this.render();


		// Get and load Image
		Client.loadFile( DB.INTERFACE_PATH + filename, function(url) {
			if( url !== Background.image.src ) {
				Background.image.src = url;
				Background.image.onload  = function(){
					Background.render();
				};
			}

			if( exist && callback ) {
				callback();
			}
		}, function(){
			if( exist && callback ) {
				callback();
			}
		});

		// Add transition only if the background isn't here
		if( !exist ) {
			this.transition(function(){
				Background.canvas.appendTo('body');
				if( callback ) {
					callback();
				}
			});
		}
	};


	/**
	 * Add loading background
	 *
	 * @param {function} callback once the loading is display (optional)
	 */
	Background.setLoading = function SetLoading( callback )
	{
		var index = Math.floor( Math.random() * Background.loading.length );

		Background.setImage( Background.loading[index] || 'loading01.jpg', function() {
			Background.canvas.css('zIndex', 999 );
			Background.setPercent(0.0);

			if( callback ) {
				callback();
			}
		});
	};


	/**
	 * Remove background
	 *
	 * @param {function} callback once the overlay hide the window (optional)
	 */
	Background.remove = function Remove( callback )
	{
		this.transition(function(){
			Background.canvas.css('zIndex', -1 );
			Background.canvas.remove();

			if( callback ) {
				callback();
			}
		});
	};


	/**
	 * Play with the overlay
	 *
	 * @param {function} callback once the overlay hide the window
	 */
	Background.transition = function Transition( callback )
	{
		this.overlay
			.stop()
			.css( 'opacity', 0 )
			.appendTo('body')
			.animate({ opacity: 1.0 }, 500, function(){
				callback();

				Background.overlay
					.stop()
					.animate({ opacity: 0 }, 500,function(){
						Background.overlay.remove();
					});
			});
	};


	/**
	 * Adding progress bar to background
	 *
	 * @param {number} percent
	 */
	Background.setPercent = function SetPercent( percent )
	{
		var x, y, width, height;

		this.progress = Math.min( Math.floor(percent), 100 );

		width         = 240;
		height        = 15;
		x             = Math.floor( ( this.canvas[0].width - width ) * 0.5 );
		y             = Math.floor( this.canvas[0].height * 0.75 );

		// Draw Rectangle border
		this.ctx.fillStyle = "rgb(0,255,255)";
		this.ctx.fillRect( x, y, width, height );

		// Draw Rectangle "empty"
		this.ctx.fillStyle = "rgb(140,140,140)";
		this.ctx.fillRect( x+1, y+1, width-2 , height-2 );

		// Draw progressbar
		this.ctx.fillStyle = "rgb(66,99,165)";
		this.ctx.fillRect( x+2, y+2, Math.floor( percent * (width-4) * 0.01 ), height-4 );

		// Draw percent
		this.ctx.fillStyle = "rgb(255,255,0)";
		this.ctx.fillText( percent + '%' ,  Math.floor( ( this.canvas[0].width - this.ctx.measureText( percent + '%' ).width ) * 0.5 ), y + 11  );
	};


	/**
	 * Export
	 */
	return Background;
});