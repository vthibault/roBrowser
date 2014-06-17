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
	'use strict';


	/**
	 * Dependencies
	 */
	var jQuery      = require('Utils/jquery');
	var KEYS        = require('Controls/KeyEventHandler');
	var UIManager   = require('UI/UIManager');
	var UIComponent = require('UI/UIComponent');
	var htmlText    = require('text!./Intro.html');
	var cssText     = require('text!./Intro.css');
	var Context     = require('Core/Context');
	var Configs     = require('Core/Configs');
	var Particle    = require('./Particle');
	var Preferences = require('./Preferences');
	var FileSystem  = require('./FileSystem');


	/**
	 * Create Intro component
	 */
	var Intro = new UIComponent( 'Intro', htmlText, cssText );


	/**
	 * @var {FileList}
	 */
	Intro.files = [];


	/**
	 * Manage Escape key to exit
	 */
	Intro.onKeyDown = function OnKeyDown( event )
	{
		// Exit fullScreen mode
		if (event.which === KEYS.ESCAPE) {

			if (Context.isFullScreen()) {
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
	Intro.init = function init()
	{
		if (!Configs.get('servers')) {
			Configs.set('_serverEditMode', true);
		}

		var ui = this.ui;

		preloadImages();

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
						});
					});
			});

		// Settings page
		ui.find('.btn_settings')
			.mousedown(function(){
				Preferences.load( ui );

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
			.on('drop', process )
			.on('dragover', function(){
				jQuery(this).addClass('over');
				return false;
			})
			.on('dragleave', function(){
				jQuery(this).removeClass('over');
				return false;
			});

		// Set file by clicking the box
		ui.find('input[type="file"]')
			.on('change', process );

		// Modify quality
		ui.find('.quality')
			.on('change', function(){
				ui.find('.quality_result').text( this.value + '%' );
			});

		// Clean cache
		ui.find('.clean')
			.click(function(){
				var parent = jQuery(this).hide().parent();
				parent.append(
					'<span><img src="'+ require.toUrl('./images/loading.gif')  +'"/> <i>Cleaning cache...</i></span>'
				);

				FileSystem.cleanup(function(){
					parent.find('span').remove();
					Intro.ui.find('.msg').text('');
				});
			});
	
		// Stop propagation in overlay to avoid hiding the page
		ui.find('.overlay')
			.on('click', 'input[type="text"], a, button', function( event ){
				if (this.nodeName === 'INPUT') {
					this.select();
				}
				event.stopImmediatePropagation();
			});

		// Not allow to edit server list
		if (!Configs.get('_serverEditMode')) {
			ui.find('.serveredit').hide();
		}
		
		// Modify volume
		ui.find('.bgmvol')
			.on('change', function(){
				ui.find('.bgmvol_result').text( this.value + '%' );
			});
		ui.find('.soundvol')
			.on('change', function(){
				ui.find('.soundvol_result').text( this.value + '%' );
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
				Preferences.save( ui );
				ui.find('.overlay')
					.animate({opacity:0}, 200, function(){
						ui.find('.overlay').hide();
					});
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
	 * Once append to body
	 */
	Intro.onAppend = function onAppend()
	{
		// Can't resize the window if it's not a popup/App
		if (!Context.Is.POPUP) {
			this.ui.find('.resolution').hide();
		}

		// Show content saved
		this.ui.find('.clean').hide();
		FileSystem.getSize(function(used){
			var msg = '';

			if (used) {
				if (used > 1024 * 1024 * 1024) {
					msg = (used / 1024 / 1024 / 1024).toFixed(2) + ' Go saved';
				}
				else if (used > 1024 * 1024) {
					msg = (used / 1024 / 1024).toFixed(2) + ' Mo saved';
				}
				else {
					msg = (used / 1024).toFixed(2) + ' Mo saved';
				}

				this.ui.find('.msg').text(msg);
				this.ui.find('.clean').show();
			}
		}.bind(this));

		// Hook resize
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

		// Initialize window and particle
		Particle.init( 100, this.ui.find('canvas')[0] );
	};


	/**
	 * Once removed
	 */
	Intro.onRemove = function onRemove()
	{
		jQuery(window).off('resize.intro');
		Particle.stop();
		this.ui.find('.overlay').hide();
	};


	/**
	 * Start loading images
	 */
	function preloadImages()
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
		Intro.ui.find('.icon img').attr('src', require.toUrl('./images/icon.png') );
		Intro.ui.find('.btn_about img').attr('src', require.toUrl('./images/about.png') );
		Intro.ui.find('.btn_settings img').attr('src', require.toUrl('./images/settings.png') );

		// Preload image
		(new Image()).src = require.toUrl('./images/play-down.png');
	}


	/**
	 * User submit files, get back files
	 * @param {object} event
	 * @return {boolean} false
	 */
	function process( event )
	{
		var i, count;

		var _dir_count   = 0;
		var _dir_loaded  = 0;
		var _file_count  = 0;
		var _file_loaded = 0;
		var _files       = [];

		event.stopImmediatePropagation();
		jQuery(this).removeClass('over');

		function processing(files) {
			if (files.length) {
				Intro.files.push.apply( Intro.files, files );
				Intro.ui.find('.msg').text( Intro.files.length + ' files selected' );
			}
		}

		// Extract files from directory
		function recursiveReader(entry, skip){
			if (entry.isFile) {
				++_file_count;
				entry.file(function(file){
					file.fullPath = entry.fullPath.substr(skip); // get rid of the "/"
					_files.push(file);
					if ((++_file_loaded) === _file_count && _dir_loaded === _dir_count) {
						processing(_files);
					}
				});
			}
			else if (entry.isDirectory) {
				++_dir_count;
				entry.createReader().readEntries(function(entries){
					for (var i = 0, count = entries.length; i < count; ++i) {
						recursiveReader(entries[i], skip);
					}
					if ((++_dir_loaded) === _dir_count && _file_loaded === _file_count) {
						processing(_files);
					}
				});
			}
		}

		// input[type="file"]
		if ('files' in this) {

			// In wekit we select the folder, not files.
			// we have to rewrite the relativePath to remove the main folder from it
			if (this.files.length) {
				var token = 'webkitRelativePath' in this.files[0] ? 'webkitRelativePath' :
				                  'relativePath' in this.files[0] ?       'relativePath' :
				                                                           null;
				if (token) {
					count = this.files.length;
					var baseFolder = /^[^(\/|\\)]+(\/|\\)/;

					for (i = 0; i < count; ++i) {
						this.files[i].fullPath = this.files[i][token].replace(baseFolder, '');
					}
				}
			}

			processing(this.files);
			return false;
		}

		// drag drop
		if (event.originalEvent.dataTransfer) {
			var data = event.originalEvent.dataTransfer;

			// Read directory content
			if (data.items && data.items.length && data.items[0].webkitGetAsEntry) {

				// If select a directory, have to remove the root folder for all files
				// inside this directory
				var skip  = 1;
				var entry = data.items[0].webkitGetAsEntry();
				if (data.items.length === 1 && entry.isDirectory) {
					skip = entry.fullPath.split('/')[1].length + 2;
				}

				for (i = 0, count = data.items.length; i < count; ++i) {
					recursiveReader( data.items[i].webkitGetAsEntry(), skip);
				}

				return false;
			}
			// Read files directly
			else if (data.files) {
				processing(data.files);
				return false;
			}
		}

		processing(_files);
		return false;
	}


	/**
	 * Callback to used.
	 */
	Intro.onFilesSubmit = function OnFilesSubmit(){};


	/**
	 * Stored component and return it
	 */
	return UIManager.addComponent(Intro);
});