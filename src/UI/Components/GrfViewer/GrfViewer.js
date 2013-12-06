/**
 * UI/Components/GrfViewer/GrfViewer.js
 *
 * Game File Viewer
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

	var Client             = require('Core/Client');
	var Thread             = require('Core/Thread');
	var Memory             = require('Core/MemoryManager');

	var KEYS               = require('Controls/KeyEventHandler');

	var Sprite             = require('Loaders/Sprite');
	var Targa              = require('Loaders/Targa');

	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');

	var htmlText           = require('text!./GrfViewer.html');
	var cssText            = require('text!./GrfViewer.css');
	var History            = require('./History');


	// Ugly, require api.js to display models
	require('../../../../api');



	/**
	 * Create GRFViewer component
	 */
	var Viewer = new UIComponent( 'GRFViewer', htmlText, cssText );


	/**
	 * @var {number} The display is done asynchronus, keep reference of the thread
	 */
	Viewer.thread      = 0;


	/**
	 * @var {number} action id, to stop doing things when the action change
	 */
	Viewer.actionID    =  0;


	/**
	 * Initialize Component
	 */
	Viewer.init = function Init()
	{
		Thread.hook("THREAD_READY", function(){
			if( window.ROConfig && ROConfig.remoteClient ) {
				Thread.send( "SET_HOST", ROConfig.remoteClient );
			}
		});
		Thread.init();

		jQuery('head:first').append(
			'<style type="text/css">\
				#previous { background-image:url(' + require.toUrl('./Icons/arw-left.png') + '); }\
				#next     { background-image:url(' + require.toUrl('./Icons/arw-right.png') + '); }\
				#progress { background-image:url(' + require.toUrl('./Icons/load.gif') + '); }\
			</style>'
		);

		// Drag drop the GRF.
		var box = this.ui.find('#info');

		box
			.on('dragover',  function(){ box.css('background', '#DFD'); return false; })
			.on('dragleave', function(){ box.css('background', '#EEE'); return false; })
			.on('drop', function(event){ box.css('background', '#EEE'); Viewer.processGRF(event.originalEvent); return false; });

		this.ui.find('#file').change(Viewer.processGRF);

		// Initialize toolbar
		Viewer.initToolBar();

		// Initialize history
		History.init(
			this.ui.find('#previous'),
			this.ui.find('#next')
		);
	};


	/**
	 * Once append to body, initialize elements
	 */
	Viewer.onAppend = function OnAppend()
	{
		Viewer.moveToDirectory('/', true );
	};


	/**
	 * Initialize tool bar
	 */
	Viewer.initToolBar = function InitToolBar()
	{
		// Path submit
		this.ui.find('#path').keydown(function(event){
			if ( event.which === KEYS.ENTER ) {
				var value = this.value.replace(/^\s+|\s+$/g, '');
				if ( value.substr(-1) !== "/" ) {
					value += "/";
				}
				Viewer.moveToDirectory( value, true );
			}
		});

		// History before
		this.ui.find('#previous').click(function(){
			var path = History.previous();
			if( path ) {
				Viewer.moveToDirectory( path, false );
			}
		});

		// History after
		this.ui.find('#next').click(function(){
			var path = History.next();
			if( path ) {
				Viewer.moveToDirectory( path, false );
			}
		});

		// Search toolbar
		this.ui.find('#search')
			.focus(function(){ this.value = '' })
			.blur(function(){ this.value = this.value || 'Search...' })
			.keydown( function(event) {
				if ( event.which === KEYS.ENTER ) {
					var value = this.value.replace(/^\s+|\s+$/g, '');
					if ( value.length > 2 ) {
						Viewer.moveToDirectory( 'search/' + value, true );
					}
				}
			});
	};


	/**
	 * Context Menu feature
	 *
	 * @param {HTMLElement} icon
	 * @param {object} event
	 */
	Viewer.showContextMenu = function ShowContextMenu( icon, event )
	{
		var _contextmenu = this.ui.find('#contextmenu');
		var _open = _contextmenu.find('.open:first');
		var _save = _contextmenu.find('.save:first');
		var _info = _contextmenu.find('.info:first');
		var _icon = jQuery(icon);

		_contextmenu.css({
			left: event.pageX,
			top:  event.pageY
		}).show();

		 jQuery(window).one('mousedown', function(){
			 _contextmenu.hide();
		 });

		 // Clean up
		_open.removeClass('disable').off('mousedown');
		_save.removeClass('disable').off('mousedown');
		_info.removeClass('disable').off('mousedown');

		// Open
		if( _icon.hasClass('file') ) {
			_open.addClass('disable');
		}
		else {
			_open.one('mousedown', function(){
				_icon.click();
			})
		}

		// Save
		if( _icon.hasClass('directory') ) {
			_save.addClass('disable');
		}
		else {
			_save.one('mousedown', function(){
				Client.getFile( _icon.data('path'), function( buffer) {
					// Create temporary url, move to it and release it
					var url       = URL.createObjectURL(new Blob([buffer],{type: "application/octet-stream"}));
					location.href = url;
					setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
				});
			})
		}

		// Properties
		// not supported yet.
		_info.addClass('disable');

		// Don't remove the contextmenu when clicking on disable options.
		_contextmenu.find('.disable').on('mousedown',function(){
			return false;
		});
	};


	/**
	 * Move to a path
	 *
	 * @param {string} path to move
	 * @param {boolean} save in history
	 */
	Viewer.moveToDirectory = function MoveToDirectory( path, save )
	{
		path = decodeURIComponent(path) || '/';
		path = path.replace(/\\/g, '/');

		if ( path.substr(0,1) === '/' ) {
			path = path.substr(1);
		}

		if ( path.match(/^search\//) ) {
			Viewer.search( path.substr(7) );
		}
		else {
			Viewer.showDirectory( path );
		}

		// Update history
		if( save ) {
			History.push( path );
		}
	};


	/**
	 * Load GRF files
	 *
	 * @param {object} event
	 * @return {boolean} false
	 */
	Viewer.processGRF = function(event)
	{
		Client.onFilesLoaded = function(){
			Viewer.moveToDirectory('data/', true);
 		};
		Client.init( (event.dataTransfer || event.target).files );

		event.preventDefault();
		event.stopPropagation();
		return false;
	};


	/**
	 * Move to a specify path
	 *
	 * @param {string} path
	 */
	Viewer.showDirectory = function ShowDirectory( path )
	{
		// Stop displaying
		clearTimeout(Viewer.thread);

		// Clean up Input
		path = decodeURIComponent(path) || '/';
		path = path.replace(/\\/g, '/');
		if ( path.substr(0,1) === '/' ) {
			path = path.substr(1);
		}

		// Build regex
		var directory = path.replace( /\//g, '\\\\');
		var reg       = directory + "([^(\\0|\\\\)]+)";

		// Clean windows
		this.ui.find('#path').val(path);
		this.ui.find('.icon').unbind().remove();
		this.ui.find('#progress').show();
		this.ui.find('#msg').hide();

		// Go back to the home
		if ( !path.length ) {
			this.ui.find('#info').show();
			this.renderFiles(['data']);
			return;
		}

		this.ui.find('#info').hide();

		// Changing action to avoid conflict
		var actionID = ++this.actionID;


		// Send request
		Client.search( new RegExp(reg, "gi"), function( list ) {
			// Request something else, stop.
			if ( actionID !== Viewer.actionID ) {
				return;
			}

			// Organize files and directory and render them
			list.sort(Viewer.sortFiles);
			Viewer.renderFiles( list );
		});
	};


	/**
	 * Search files (apply a regex on fileList) and show the result
	 *
	 * @param {string} keyword
	 */
	Viewer.search = function Search( keyword )
	{
		// Escape regex, and complete it
		var search    = keyword.replace(/(\.|\\|\+|\*|\?|\[|\^|\]|\$|\(|\)|\{|\}|\=|\!|\<|\>|\||\:|\-)/g, '\\$1'); 
		var reg       = "data\\\\([^(\\0\\)]+)?" + search + "([^(\\0|\\\\)]+)?";

		// Clean path
		this.ui.find('.icon').unbind().remove();
		this.ui.find('#progress').show();
		this.ui.find('#info').hide();
		this.ui.find('#msg').hide();

		// Avoid merging requests
		var actionID = ++this.actionID;

		// Send request
		Client.search( new RegExp(reg, "gi"), function( list ) {
			// Request something else, stop.
			if ( actionID !== Viewer.actionID ) {
				return;
			}

			// Organize files and directory and render them
			list.sort(Viewer.sortFiles);
			Viewer.renderFiles( list );
		});
	};


	/**
	 * Organize file listing
	 * Directory first, and organized by alpha
	 *
	 * @param {string} a file's name
	 * @param {string} b file's name
	 * @return {number}
	 */
	Viewer.sortFiles = function SortFiles( a, b )
	{
		var _a, _b;
		a  = a.replace(/.*\\/,'');
		b  = b.replace(/.*\\/,'');
		_a = a.indexOf('.') !== -1;
		_b = b.indexOf('.') !== -1;

		if ( _a === _b ) return a > b ? 1 : -1;
		if ( _a ) return  1;
		return -1;
	};


	/**
	 * Showing file list on the screen
	 *
	 * @param {Array} list of files and directories
	 */
	Viewer.renderFiles = function RenderFiles( list )
	{
		// Show
		this.ui.find('#progress').hide();

		// No file in directory ? (or error : the file isn't a directory)
		if ( !list.length ) {
			this.ui.find('#msg').text('No file found.').show();
			return;
		}

		var i, count, img;
		var reg = /(.*\\)/;
		var type, attr;

		i     = 0;
		count = list.length;

		// Avoid freeze, stream to display files
		function StreamExecute()
		{
			var j;
			var html = "";

			for ( j=0; j<200 && i+j < count; ++j ) {
				type  = Viewer.getFileIcon(list[j+i]);
				attr  = '';

				// Binding event in html instead of in javascript is far faster because of a native parsing (tested).
				if ( type === 'directory' )  attr = ' onclick="Viewer.onDirectoryClick.call(this)"';
				else if ( type === 'audio' ) attr = ' onclick="Viewer.onAudioClick.call(this)"';
				else if ( type === 'img' )   attr = ' onclick="Viewer.onImageClick.call(this)"';
				else if ( type === '3d' )    attr = ' onclick="Viewer.onObjectClick.call(this)"';
				else if ( type === 'txt' )   attr = ' onclick="Viewer.onTextClick.call(this)"';
				else if ( type === 'map' )   attr = ' onclick="Viewer.onWorldClick.call(this)"';

				html +=
					'<div class="icon '+ type +'" data-path="'+ list[j+i] +'"'+ attr +' oncontextmenu="Viewer.showContextMenu(this,event); return false;">\
						<img src="'+ require.toUrl('./Icons/' + type +'.png') + '" width="48" height="48"/><br/>\
						'+ list[j+i].replace(reg,'') +'\
					</div>';
			}

			jQuery(html).appendTo('#grfviewer');
	
			i += j;

			if ( i < count ) {
				Viewer.thread = setTimeout( StreamExecute, 4 );
			}
		}

		StreamExecute();
		Viewer.displayImagesThumbnail( count );
	};


	/**
	 * Get file thumbnail based on its extention
	 *
	 * @param {string} filename
	 * @return {string} icon name
	 */
	Viewer.getFileIcon = function GetFileIcon( filename )
	{
		var ext = filename.split(/\.([^\.]+)$/)[1] || 'dir';
		var img = '';

		switch( ext.toLowerCase() ) {
			default:
				img = 'file';
				break;

			case 'dir':
				img = 'directory';
				break;

			case 'xml':
			case 'txt':
			case 'lua':
				img = 'txt';
				break;

			case 'jpg':
			case 'bmp':
			case 'tga':
			case 'jpeg':
			case 'spr':
			case 'pal':
				img = 'img';
				break;

			case 'wav':
			case 'mp3':
				img = 'audio';
				break;

			case 'rsm':
				img = '3d';
				break;

			case 'rsw':
				img = 'map';
				break;
		}

		return img;
	};


	/**
	 * Display real thumbnails for each known file
	 */
	Viewer.displayImagesThumbnail = function DisplayImagesTumbnail()
	{
		// Stored action to know if user act during the process
		var actionID = this.actionID + 0; 

		function Process()
		{
			// Stop here if we change page.
			if ( actionID !== Viewer.actionID ) {
				return;
			}

			var nodes = jQuery('.img:lt(5)');
			var load  = 0;
			var total = nodes.length;

			// All thumbnails are already rendered
			if( !total ) {
				return;
			}

			// Work with current loaded files
			nodes.each(function(){

				var self = jQuery(this);
				
				Client.getFile( self.data('path'), function( data ) {

					// Clean from memory...
					// and avoid to fetch it later
					Memory.remove(self.data('path'));
					self.removeClass('img');

					var url = Viewer.getImageThumbnail( self.data('path'), data );

					// Display image
					if( url ) {
						self.find('img:first').attr('src', url );
					}

					// Fetch next range.
					if ( (++load) >= total ) {
						setTimeout( Process, 4 );
					}
				});
			});
		}

		Process();
	};


	/**
	 * Generate thumbnail for a file
	 *
	 * @param {string} filename
	 * @param {ArrayBuffer} data
	 * @return {string|null} url generated
	 */
	Viewer.getImageThumbnail = function GetImageThumbnail( filename, data )
	{
		var canvas;
		var ext = filename.substr(-3).toLowerCase();

		switch( ext ) {

			// Sprite support
			case 'spr':
				var spr = new Sprite( data );
				canvas = spr.getCanvasFromFrame(0);
				return canvas.toDataURL();

			// Palette support
			case 'pal':
				canvas  = document.createElement('canvas');
				var ctx = canvas.getContext('2d');
				var imageData, i, count;
				var palette = new Uint8Array(data);

				// 16 * 16 = 256
				canvas.width  = 16;
				canvas.height = 16;
				imageData     = ctx.createImageData( canvas.width, canvas.height );

				for ( i = 0, count = imageData.data.length; i < count; i += 4 ) {
					imageData.data[i+0] = palette[i+0];
					imageData.data[i+1] = palette[i+1];
					imageData.data[i+2] = palette[i+2];
					imageData.data[i+3] = 255;
				}
	
				ctx.putImageData( imageData, 0, 0 );
				return canvas.toDataURL();

			// Targa support
			case 'tga':
				var tga = new Targa();
				tga.load( new Uint8Array(data) );
				return tga.getDataURL();

			// Image Support
			default:
				return URL.createObjectURL(
					new Blob( [data], { type: "image/" + ext })
				);
		}
	};


	/**
	 * User click on directory, open it
	 */
	Viewer.onDirectoryClick = function OnDirectoryClick()
	{
		Viewer.moveToDirectory( jQuery(this).data('path') + '/', true );
	};


	/**
	 * User click on an audio file, play it
	 */
	Viewer.onAudioClick = function OnAudioClick()
	{
		var path = jQuery(this).data('path');
		var box  = Viewer.ui.find('#preview .box');
		Viewer.ui.find('#progress').show();

		Client.loadFile( path, function(url) {
			// Create audio
			var audio         = document.createElement('audio');
			audio.src         = url;
			audio.controls    = true;
			audio.play();

			// Show it on a box
			box
				.css('top', ( jQuery(window).height() - 100 ) / 2 )
				.html( jQuery(audio).click(function(event){
					event.stopPropagation();
				}));
	
			jQuery('#progress').hide();
			jQuery('#preview').show().one('click',function(){
				jQuery(this).hide();
				box.find('audio').unbind();
			});
		});
	};


	/**
	 * User click on an image, render it
	 */
	Viewer.onImageClick = function OnImageClick()
	{
		var ui = Viewer.ui;
		var path = jQuery(this).data('path');
		var box  = ui.find('#preview .box').html('');
		ui.find('#progress').show();

		Client.getFile( path, function(data)
		{
			var i, count, canvas;

			switch( path.substr(-3) ) {

				// Sprite support
				case 'spr':
					var spr = new Sprite(data);
					box
						.css('top', 200)
						.html('');

					for ( i = 0, count = spr.frames.length; i < count; ++i ) {
						canvas = spr.getCanvasFromFrame( i );
						if( canvas ) {
							box.append(canvas);
						}
					}
					break;

				// Palette support
				case 'pal':
					var palette = new Uint8Array(data);
					canvas  = document.createElement('canvas');
					var ctx = canvas.getContext('2d');

					canvas.width = 128;
					canvas.height = 128;

					for ( i = 0, count = palette.length; i < count; i += 4 ) {
						ctx.fillStyle = "rgb(" + palette[i+0] + "," + palette[i+1] + "," + palette[i+2] + ")";
						ctx.fillRect( ( (i/4|0) % 16 )  * 8, ( (i/4|0) / 16 | 0 )  * 8, 8, 8 );
					}

					box
						.css('top', jQuery(window).height() / 2 - 64 )
						.html( canvas );
					break;

				// Targa support
				case 'tga':
					var tga = new Targa();
					tga.load( new Uint8Array(data) );
					box
						.css('top', jQuery(window).height() / 2 - 64 )
						.html( tga.getCanvas() );
						break;

				// Image Support
				default:
					var url = URL.createObjectURL(
						new Blob( [data], { type: "image/" + path.substr(-3) })
					);
					var img = new Image();
					img.src = url;
					img.onload = function() {
						box
							.css('top', (jQuery(window).height()-this.height)/2 )
							.html(this);
					};
					break;
			}

			// Display progress bar
			ui.find('#preview').show();
			ui.find('#progress').hide();
			ui.find('#preview').one('click',function(){
				jQuery(this).hide();
			});
		});
	};


	/**
	 * User click on a model, render it using ModelViewer
	 */
	Viewer.onObjectClick = function OnObjectClick()
	{
		var path = jQuery(this).data('path');
		var ready = false;
		Viewer.ui.find('#progress').show();

		// Show iframe
		jQuery('#preview .box').css('top', (jQuery(window).height()-300)* 0.5 );
		jQuery('#preview').show();
		jQuery('#progress').hide();

		// Include App
		var App = new ROBrowser({
			target:        jQuery('#preview .box').get(0),
			type:          ROBrowser.TYPE.FRAME,
			application:   ROBrowser.APP.MODELVIEWER,
			development:   ROConfig.development,
			api:           true,
			width:         500,
			height:        300
		});
		App.start();

		// Ressource sharing
		function OnMessage(event) {
			ready = true;

			switch( event.data.type ) {
				case 'SYNC':
				case 'SET_HOST':
				case 'CLEAN_GRF':
					return;

				default:
					Thread.send( event.data.type, event.data.data, function(){
						App._APP.postMessage({
							arguments: Array.prototype.slice.call(arguments, 0),
							uid:       event.data.uid
						}, location.origin);
					});
			}
		}

		// Wait for synchronisation with frame
		function Synchronise(){
			if( !ready ) {
				App._APP.postMessage('SYNC', location.origin);
				setTimeout(Synchronise, 4);
			}
		}

		// Once app is ready
		App.onReady = function(){
			App._APP.location.href = "#" + path.replace(/\\/g,'/');
			App._APP.frameElement.style.border = "1px solid grey";
			App._APP.frameElement.style.backgroundColor = "#45484d";
			window.addEventListener("message", OnMessage, false);
			Synchronise();
		};

		// Unload app
		jQuery('#preview').one('click',function(){
			jQuery(this).hide();
			window.removeEventListener('message', OnMessage, false);
		});
	};


	/**
	 * User click on a map, render it using MapViewer
	 */
	Viewer.onWorldClick = function OnWorldClick()
	{
		var path = jQuery(this).data('path');
		var ready = false;
		Viewer.ui.find('#progress').show();

		// Show iframe
		jQuery('#preview .box').css('top', (jQuery(window).height()-600)* 0.5 );
		jQuery('#preview').show();
		jQuery('#progress').hide();
		document.body.style.overflow = "hidden";

		// Include App
		var App = new ROBrowser({
			target:        jQuery('#preview .box').get(0),
			type:          ROBrowser.TYPE.FRAME,
			application:   ROBrowser.APP.MAPVIEWER,
			development:   ROConfig.development,
			api:           true,
			width:         800,
			height:        600
		});
		App.start();

		// Wait for synchronisation with frame
		function Synchronise(){
			if( !ready ) {
				App._APP.postMessage('SYNC', location.origin);
				setTimeout(Synchronise, 4);
			}
		}

		// Ressource sharing
		function OnMessage(event) {
			ready = true;

			switch( event.data.type ) {
				case 'SYNC':
				case 'SET_HOST':
				case 'CLEAN_GRF':
					return;

				default:
					Thread.send( event.data.type, event.data.data, function(){
						App._APP.postMessage({
							arguments: Array.prototype.slice.call(arguments, 0),
							uid:       event.data.uid
						}, location.origin);
					});
			}
		}

		// Redirect Thread result to frame
		function ThreadRedirect( type ) {
			Thread.hook( type, function(data){
				App._APP.postMessage({
					type: type,
					data: data
				}, location.origin );
			});
		}

		// Once app is ready
		App.onReady = function(){
			App._APP.location.href = "#" + path.replace(/\\/g,'/');
			App._APP.frameElement.style.border = "1px solid grey";
			App._APP.frameElement.style.backgroundColor = "#45484d";

			// Hook Tread Map loading
			ThreadRedirect('MAP_PROGRESS');
			ThreadRedirect('MAP_WORLD');
			ThreadRedirect('MAP_GROUND');
			ThreadRedirect('MAP_ALTITUDE');
			ThreadRedirect('MAP_MODELS');

			window.addEventListener("message", OnMessage, false);
			Synchronise();
		};

		// Unload app
		jQuery('#preview').one('click',function(){
			jQuery(this).hide();
			document.body.style.overflow = "auto";
			window.removeEventListener('message', OnMessage, false);
		});
	};


	/**
	 *  User click on text, display it
	 */
	Viewer.onTextClick = function OnTextClick()
	{
		var path = jQuery(this).data('path');
		var progress = Viewer.ui.find('#progress');
		var box      = Viewer.ui.find('#preview .box');

		progress.show();

		Client.loadFile( path, function( text ) {
			box
				.css('top', ( jQuery(window).height()-300 ) / 2 )
				.html(
					jQuery('<pre/>')
					.text(text)
					.click(function(event){
						event.stopPropagation()
					})
					.css({
						 background:'white',
						 width:'500px',
						 display:'inline-block',
						 height:'300px',
						 overflow:'scroll',
						 textAlign:'left',
						 padding:'10px'
					})
				);

			progress.hide();
			jQuery('#preview')
				.show()
				.one('click',function(){
					jQuery(this).hide();
					box.find('pre').unbind();
				});
		});
	};


	/**
	 * Export it as global variable
	 * (need to be use to reference HTML event)
	 */
	window.Viewer = Viewer;


	/**
	 * Stored component and return it
	 */
	return UIManager.addComponent(Viewer);
});