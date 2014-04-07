/**
 * Controls/ScreenShot.js
 *
 * ScreenShot Manager
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
	var DB            = require('DB/DBManager');
	var Client        = require('Core/Client');
	var jQuery        = require('Utils/jquery');
	var html2canvas   = require('Utils/html2canvas');
	var KEYS          = require('Controls/KeyEventHandler');
	var ChatBox       = require('UI/Components/ChatBox/ChatBox');


	/**
	 * Key Listener
	 */
	jQuery(window).bind('keydown', function( event )
	{
		if( KEYS.ALT && event.which === KEYS.P ) {
			ScreenShot.take();
			event.stopImmediatePropagation();
			return false;
		}

		return true;
	});
	
	
	/**
	 * Initiate methods
	 */
	var ScreenShot = {};
	
	
	/**
	 * Take a ScreenShot
	 */
	ScreenShot.take = function takeScreenShot() {
		if(! ChatBox.ui) {
			return; //UI not loaded yet, cant display screenshot
		}

		html2canvas([document.body], {
			onrendered: this.process
		});
	}


	/**
	 * Process ScreenShot
	 */
	ScreenShot.process = function processScreenShot(canvas) {
		var context, date;
		var x, y;

		// Create a date to add to canvas
		date = new Date().toString();
		
		context = canvas.getContext('2d');
		
		// Input the timestamp on screenshot
		context.fillStyle = 'white';
		context.strokeStyle = 'black';
		
		x = 20;
		y = canvas.height - 5;
		
		context.font = 'bold 16px Arial';
		context.fillText(date, x, y);
		context.strokeText(date, x, y);
		
		context.fill();
		context.stroke();
		
		// Get and draw src_logo to canvas
		Client.loadFile( 'data/texture/scr_logo.bmp', function(url) {
			var src_logo = document.createElement('img');
			
			src_logo.src = url;
			
			x = canvas.width - src_logo.width - 20;
			y = canvas.height - src_logo.height - 5;
				
			context.drawImage(src_logo, x, y);
				
			ScreenShot.display(canvas, date);
		});	
	}
	
	
	/**
	 * Display the ScreenShot, this method is ment to be replaced by plugins if wanted.
	 */
	ScreenShot.display = function displayScreenShot(canvas, date) {
		var binary, data, url;
		var i, count;
		
		// We decode the base64 to get the binary of the png
		binary = atob( canvas.toDataURL('image/png').replace(/^data[^,]+,/,'') );
		count  = binary.length;
		data   = new Uint8Array(count);
 
		// We store the content in a buffer
		for (i = 0; i < count; ++i) {
			data[i] = binary.charCodeAt(i);
		}
 
		// We create a local image with the buffer
		url = window.URL.createObjectURL(new Blob([data], {type: 'image/png'}));

		ChatBox.addText('<a download="ScreenShot (' + date + ').png" href="'+ url +'" target="_blank">Screenshot (' + date + ')</a>', ChatBox.TYPE.INFO, null, true);
	}
	

	/**
	 * Exports
	 */
	 
	return ScreenShot;
});