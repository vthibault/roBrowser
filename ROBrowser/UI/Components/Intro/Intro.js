/**
 * UI/Components/Intro/Intro.js
 *
 * Intro Manager
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
	var jQuery      = require('Utils/jquery');
	var KEYS        = require('Controls/KeyEventHandler');
	var UIManager   = require('UI/UIManager');
	var UIComponent = require('UI/UIComponent');
	var htmlText    = require('text!./Intro.html');
	var cssText     = require('text!./Intro.css');
	var Particle    = require('./Particle');
	var Preferences = require('Core/Preferences');
	var Context     = require('Core/Context');


	/**
	 * Create Intro component
	 */
	var Intro = new UIComponent( 'Intro', htmlText, cssText );


	/**
	 * Files to load
	 */
	Intro.files = [];


	/**
	 * Intro preferences
	 */
	Intro.preferences = Preferences.get('Window', {
		screensize:  '800x600',
		quality:      100,
		serverfile:  'clientinfo.xml',
		serverlist:  [],
		serverdef:   'serverlist'
	}, 1.0 );


	/**
	 * Manage Escape key to exit
	 */
	Intro.onKeyDown = function OnKeyDown( event )
	{
		// Exit fullScreen mode
		if( event.which === KEYS.ESCAPE ) {

			if( Context.isFullScreen() ) {
				Context.cancelFullScreen();
			}

			event.stopImmediatePropagation();
			return false;
		}

		return true;
	};


	/**
	 * Initialize Metaling
	 */
	Intro.init = function Init()
	{
		var ui = this.ui;

		this.preloadImages();

		// About page
		ui.find('.btn_about')
			.mousedown(function(){
				var $about =  ui.find('.overlay.about');
				$about
					.show()
					.animate({opacity:1}, 200)
					.click(function(){
						$about.animate({opacity:0}, 200, function(){
							$about.hide();
						})
					});
			});

		// Settings page
		ui.find('.btn_settings')
			.mousedown(function(){
				ui.find('.overlay.settings')
					.show()
					.animate({opacity:1}, 200);
			});

		// Box to set files
		ui.find('.box')
			.mouseover(function(){
				jQuery(this).addClass('over');
			})
			.mouseout(function(){
				jQuery(this).removeClass('over');
			})
			.click(function(){
				ui.find('input[type="file"]').click();
			})
			.on('drop', this.process )
			.on('dragover', function(){
				jQuery(this).addClass('over');
				return false;
			})
			.on('dragleave', function(){
				jQuery(this).removeClass('over');
				return false;
			})

		// Input handler
		ui.find('input[type="file"]')
			.on('change', this.process );



		// Modify quality
		ui.find('.quality')
			.on('change', function(){
				ui.find('.quality_result').text( this.value + '%' );
			});

		// Stop propagation in overlay to avoid hiding the page
		ui.find('.overlay')
			.on('click', 'input[type="text"], a, button', function( event ){
				if( this.nodeName === 'INPUT' ) {
					this.select();
				}
				event.stopImmediatePropagation();
			});

		// Add Server
		ui.find('.btn_add')
			.on('click', function(){
				var $serverlist = ui.find('.servers');
				var count = $serverlist.find('tr').length;
				$serverlist.append(
					'<tr>' +
					'	<td><input type="text" class="display" value="Server '+ count +'"/></td>' +
					'	<td><input type="text" class="address" value="127.0.0.1:6900"/></td>' +
					'	<td><input type="text" class="version"value="22"/></td>' +
					'	<td><input type="text" class="langtype" value="12"/></td>' +
					'	<td><input type="text" class="packetver"value="auto"/></td>' +
					'	<td><button class="btn_delete"></button></td>' +
					'</tr>'
				);

				$serverlist.find('tr :eq('+ count +') input:first').focus();
			});

		ui.find('.btn_save')
			.on('click', function(){
				Intro.savePreferences();
				ui.find('.overlay')
					.animate({opacity:0}, 200, function(){
						ui.find('.overlay').hide();
					})
			});

		ui.find('.serverlist tbody')
			.on('click', '.btn_delete', function(){
				jQuery(this).parent().parent().remove();
			});

		// Start roBrowser
		ui.find('.btn_play')
			.click(function(){
				ui.find('.overlay.loading')
					.show()
					.animate({opacity:1}, 200);

				Intro.onFilesSubmit( Intro.files );
			});
	};


	/**
	 * Resize window
	 */
	Intro.onAppend = function OnAppend()
	{
		var $window = jQuery(window);
		var $intro  = this.ui.find('.intro');

		$window.on('resize.intro',function(){
			$intro.css(
				'transform',
				'scale('+
					$window.width()  / $intro.width()  +
					',' +
					$window.height() / $intro.height() +
				')'
			);
		});

		$window.trigger('resize.intro');

		Particle.init( 100, this.ui.find('canvas')[0] );

		this.loadPreferences();
	};


	/**
	 * Remove auto-resize
	 */
	Intro.onRemove = function OnRemove()
	{
		jQuery(window).off('resize.intro');
		Particle.stop();
		this.ui.find('.overlay.loading').hide();
	}


	/**
	 * Load images to add some styles to the Intro
	 */
	Intro.preloadImages = function PreloadImages()
	{
		// Background images
		jQuery('style:first').append([
			'#intro .intro { background-image:url(' + require.toUrl('./images/background.jpg') + '); }',
			'#intro .ribbon { background-image:url(' + require.toUrl('./images/ribbon.png') + '); }',
			'#intro .box { background-image:url(' + require.toUrl('./images/box.jpg') + '); }',
			'#intro .btn_play { background-image:url(' + require.toUrl('./images/play.png') + '); }',
			'#intro .btn_play:hover { background-image:url(' + require.toUrl('./images/play-down.png') + '); }',
			'#intro .btn_add { background-image:url('+ require.toUrl('./images/add-server.jpg') +'); }',
			'#intro .btn_save { background-image:url('+ require.toUrl('./images/save.jpg') + '); }',
			'#intro .btn_delete { background-image:url('+ require.toUrl('./images/delete.png') + '); }'
		].join('\n'));

		// Add images to IMG tag
		this.ui.find('.icon img').attr('src', require.toUrl('./images/icon.png') );
		this.ui.find('.btn_about img').attr('src', require.toUrl('./images/about.png') );
		this.ui.find('.btn_settings img').attr('src', require.toUrl('./images/settings.png') );

		// Preload image
		(new Image).src = require.toUrl('./images/play-down.png');
	};


	/**
	 * Bind html with preferences
	 */
	Intro.loadPreferences = function LoadPreferences()
	{
		this.ui.find('.screensize').val( this.preferences.screensize );
		this.ui.find('.quality').val( this.preferences.quality ).trigger('change');

		this.ui.find('.serverdef').attr('checked', false );
		this.ui.find('.serverdef[value="'+ this.preferences.serverdef +'"]').attr('checked', 'checked');
		this.ui.find('.clientinfo').val( this.preferences.serverfile );

		var i, count;
		var serverlist = this.preferences.serverlist;
		var $servers = this.ui.find('.servers').empty();

		for( i = 0, count = serverlist.length; i < count; ++i ) {
			$servers.append(
				'<tr>' +
				'	<td><input type="text" class="display" value="'+ serverlist[i].display +'"/></td>' +
				'	<td><input type="text" class="address" value="'+ serverlist[i].address +':'+ serverlist[i].port +'"/></td>' +
				'	<td><input type="text" class="version" value="'+ serverlist[i].version +'"/></td>' +
				'	<td><input type="text" class="langtype" value="'+ serverlist[i].langtype +'"/></td>' +
				'	<td><input type="text" class="packetver" value="'+ serverlist[i].packetver + '"/></td>' +
				'	<td><button class="btn_delete"></button></td>' +
				'</tr>'
			);
		}

		this.applyPreferences();
	};


	/**
	 * Save preferences to user storage.
	 */
	Intro.savePreferences = function SavePreferences()
	{
		this.preferences.screensize = this.ui.find('.screensize').val();
		this.preferences.quality    = this.ui.find('.quality').val();
		this.preferences.serverdef  = this.ui.find('.serverdef:checked').val();
		this.preferences.serverfile = this.ui.find('.clientinfo').val();
		this.preferences.serverlist = [];

		var $servers = this.ui.find('.servers');
		var i, count = $servers.find('tr').length;
		var $server;

		for( i = 0; i < count; ++i ) {
			$server = $servers.find('tr:eq('+ i +')');
			this.preferences.serverlist.push({
				display:   $server.find('.display').val(),
				address:   $server.find('.address').val().split(':')[0],
				port:      parseInt( $server.find('.address').val().split(':')[1], 10),
				version:   $server.find('.version').val(),
				langtype:  $server.find('.langtype').val(),
				packetver: $server.find('.packetver').val()
			});
		}

		this.preferences.save();
		this.applyPreferences();
	};


	/**
	 * Apply preferences, resize window, etc
	 */
	Intro.applyPreferences = function ApplyPreferences()
	{
		window.ROConfig = window.ROConfig || {};

		var isFullScreen = Context.isFullScreen();

		// Full Screen support
		if( this.preferences.screensize === "full" ) {
			if(!isFullScreen ) {
				Context.requestFullScreen();
			}
		}
		else {
	
			if( isFullScreen ) {
				Context.cancelFullScreen();
			}

			// Resizing
			if( Context.Is.POPUP ) {
				var size = this.preferences.screensize.split("x");
				window.resizeTo( size[0], size[1] );
				window.moveTo( (screen.availWidth - size[0]) / 2, (screen.availHeight - size[1]) / 2 );
			}
		}

		// Bind data
		if( this.preferences.serverdef === 'serverlist' ) {
			ROConfig.servers = this.preferences.serverlist;
		}
		else {
			ROConfig.servers = 'data/' + this.preferences.serverfile;
		}

		ROConfig.quality = this.preferences.quality;
	};


	/**
	 * User submit files, get back files
	 * @param {object} event
	 * @return {boolean} false
	 */
	Intro.process = function Process( event )
	{
		jQuery(this).removeClass('over');

		var files = this.files || ( event.originalEvent.dataTransfer && event.originalEvent.dataTransfer.files ) || [];

		if( files.length ) {
			Intro.files.push.apply( Intro.files, files );
			Intro.ui.find('.msg').text( Intro.files.length + ' files selected' );
		}

		event.stopImmediatePropagation();
		return false;
	};


	/**
	 * Callback to used.
	 */
	Intro.onFilesSubmit = function OnFilesSubmit( files ){};


	/**
	 * Stored component and return it
	 */
	return UIManager.addComponent(Intro);
});