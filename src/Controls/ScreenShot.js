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
	var jQuery             = require('Utils/jquery');
	var html2canvas        = require('Utils/html2canvas');
	var KEYS               = require('Controls/KeyEventHandler');
	var ChatBox            = require('UI/Components/ChatBox/ChatBox');


	/**
	 * Key Listener
	 */
	jQuery(window).bind('keydown', function( event )
	{
		if( KEYS.ALT && event.which === KEYS.P ) {
			takeScreenShot();
			event.stopImmediatePropagation();
			return false;
		}

		return true;
	});;
	
	
	/**
	 * Take a ScreenShot
	 */
	function takeScreenShot() {
		if(! ChatBox.ui) {
			return; //UI not loaded yet, cant display screenshot
		}

		html2canvas([document.body], {
			onrendered: processScreenShot
		});
	}


	/**
	 * Process ScreenShot
	 */
	function processScreenShot(canvas) {
		var context, binary, data, url, date;
		var i, count, x, y;

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
	 
	return;
});