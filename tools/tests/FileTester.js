/**
 * src/Tests/FileTester.js
 *
 * Client Thread
 * Manage the Client Thread to send data to it (let another Thread do the hard job : loading files, ...)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */


define(function( require )
{
	'use strict';


	// Always in development mode when running test (easier to debug)
	window.ROConfig = {
		development: true,
		saveFiles:   false
	};


	// Load dependencies
	var Client = require('Core/Client');
	var Thread = require('Core/Thread');
	var Memory = require('Core/MemoryManager');
	var Intro  = require('UI/Components/Intro/Intro');


	/**
	 * File Tester class
	 *
	 * @param {string} extention
	 * @param {function} callback
	 */
	function FileTester(ext, callback)
	{
		this.ext = ext;
		this.callback = callback;
	}


	/**
	 * @var {string} file extention
	 */
	FileTester.prototype.ext = '';


	/**
	 * @var {string} callback to execute
	 */
	FileTester.prototype.callback = null;


	/**
	 * Start to test files
	 */
	FileTester.prototype.start = function Start()
	{
		var _self = this;

		// Wait for initialisation
		Thread.hook('THREAD_READY', function(){
			Intro.onFilesSubmit = function( files ) {
				Client.onFilesLoaded = function(){
					Client.search( new RegExp('data\\\\[^\\0]+\\.'+ _self.ext, 'gi'), Test.bind(_self) );
				};
				Client.init( files );
			};
			Intro.append();
		});

		Thread.init();
	};


	/**
	 * Test files
	 *
	 * @var {Array} file list
	 */
	function Test( list )
	{
		var callback = this.callback;
		var ext      = this.ext;

		Intro.remove();

		document.body.innerHTML =
			'<h1>'+ ext.toUpperCase() +' tester</h1>' +
			'<p>Load each '+ ext +' files to detect errors</p>' +
			'<div><strong>Progress:</strong> <span id="log"></span></div>' +
			'<br/>' +
			'<div id="error">' +
				'<h1>Errors :</h1>' +
			'</div>';

		document.body.style.backgroundColor = 'white';
		document.body.style.overflow        = 'auto';
		document.body.style.userSelect      = 'text';

		var log   = document.getElementById('log');
		var error = document.getElementById('error');
		var errors = 0;
		var i, index = 0, count = list.length;
		var start = Date.now();

		for (i = 0; i < 5 && i < count; ++i) {
			loadNext(index++);
		}

		function loadNext(i){
			Client.getFile( list[i], function(data){
				try {
					var tick = (Date.now()-start);
					log.textContent = '[' + (i+1) + '/' + count + '] ' + '(' + Math.floor(((tick / i * count) - tick) * 0.001 + 1) + ' seconds) ' + list[i];
					callback(data);
				}
				catch(e){
					error.innerHTML += '<div style="margin-left:30px;"><h2>' + list[i] + '</h2>'+ e.message +'<pre>'+ e.stack +'</pre></div>';
					errors++;
				}

				// Remove from memory
				Memory.remove( null, list[i] );
				index++;

				if (index < count) {
					loadNext(index);
				}
	
				if (index === count+4) {
					alert( log.textContent = count + ' '+ ext +' files loaded and compiled, found ' + errors +' errors' );
				}
			});
		}
	}


	/**
	 * Export
	 */
	return FileTester;

});