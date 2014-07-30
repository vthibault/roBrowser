/**
 * Audio/BGM.js
 *
 * BGM Manager
 *
 * Class to Manage BGM (RO background music)
 * Add support for Flash if the browser can not read .mp3 files.
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
 
define( ['require', 'Utils/jquery', 'Core/Client', 'Core/Configs', 'Preferences/Audio'],
function( require,         jQuery,        Client,        Configs,   Preferences )
{
	'use strict';


	/**
	 * BGM NameSpace
	 */
	var BGM = {};

	BGM.stat        = 0;
	BGM.position    = null;
	BGM.filename    = null;
	BGM.volume      = Preferences.BGM.volume;
	BGM.isPlaying   = 'false';

	BGM.audio       = document.createElement('audio');
	BGM.useHTML5    = false;
	BGM.extension   = 'mp3';

	// Test for BGMFileExtension config
	if (BGM.audio.canPlayType) {
		var extensions = Configs.get('BGMFileExtension', ['mp3']);

		while (extensions.length) {
			if (BGM.audio.canPlayType('audio/' + extensions[0]).replace(/no/i, '')) {
				BGM.extension = extensions[0];
				BGM.useHTML5  = true;
				break;
			}
			extentions.splice(0, 1);
		}
	}


	/**
	 * Initialize Flash
	 * If the browser don't support HTML5
	 */
	BGM.initFlash = function initFlash()
	{
		// Flash need the object to be in a global scope
		window.BGM = BGM;

		// Add the flash to the document
		BGM.flash  = jQuery([
			'<object type="application/x-shockwave-flash" data="' + require.toUrl('./mp3-player/mp3-player.swf') + '" width="0" height="0">',
				'<param name="AllowScriptAccess" value="always"/>',
				'<param name="FlashVars" value="listener=BGM&interval=1000"/>',
			'</object>'
		].join('\n')).appendTo('body')[0];

		// Flash onInit()
		BGM.onInit = function onInit() {
			BGM.position = 0;
			if (BGM.filename && Preferences.BGM.play) {
				BGM.play( BGM.filename );
			}
		};
	

		// Flash onUpdate (every 2ms)
		BGM.onUpdate = function onUpdate() {
			if (BGM.isPlaying === 'false' && BGM.filename) {
				BGM.play( BGM.filename );
			}
		};
	};


	/**
	 * Initialize HTML5 player
	 * Fixed a known bug
	 */
	BGM.initHTML5 = function initHTML5()
	{
		// Buggy looping for HTM5 Audio...
		if (typeof BGM.audio.loop == 'boolean') {
			BGM.audio.loop = true;
			return;
		}

		// Work around
		BGM.audio.addEventListener('ended', function(){
			BGM.audio.currentTime = 0;
			BGM.audio.play();
		}, false);
	};


	/**
	 * Play the audio file specify
	 *
	 * @param {string} filename
	 */
	BGM.play = function play( filename )
	{
		// Nothing to play
		if (!filename) {
			return;
		}

		// If it's the same file, check if it's already playing
		if (this.filename === filename) {
			if ((!this.useHTML5 && this.isPlaying == 'true') ||
				( this.useHTML5 && !this.audio.paused)) {
					return;
			}
		}

		// Just if flash is loaded, load the file.
		if ((this.useHTML5 || this.position !== null) && Preferences.BGM.play) {

			if (filename.match(/bgm/i)) {
				filename = filename.match(/\w+\.mp3/i).toString();
			}

			if (this.useHTML5) {
				filename = filename.replace(/mp3$/i, BGM.extension);
			}

			Client.loadFile( 'BGM/' + filename, function(url) {
				BGM.load(url);
			});
		}

		BGM.filename = filename;
	};


	/**
	 * Load the audio file
	 *
	 * @param {string} data (HTTP / DATA URI or BLOB)
	 */
	BGM.load = function load(data)
	{
		if (!Preferences.BGM.play) {
			return;
		}

		if (BGM.useHTML5) {
			BGM.audio.src    = data;
			BGM.audio.volume = this.volume;
			BGM.audio.play();
		}
		else if (BGM.flash.SetVariable) {
			BGM.flash.SetVariable('method:setUrl', data );
			BGM.flash.SetVariable('method:play', null );
			BGM.flash.SetVariable('enabled', 'true');
		}
	};


	/**
	 * Stop the BGM
	 */
	BGM.stop = function stop()
	{
		if (BGM.useHTML5) {
			BGM.audio.pause();
		}
		else if (BGM.flash.SetVariable) {
			BGM.flash.SetVariable('method:pause', null );
		}
	};


	/**
	 * Change the volume of the BGM
	 *
	 * @param {number} volume
	 */
	BGM.setVolume = function( volume )
	{
		BGM.volume  = volume;
		Preferences.BGM.volume = volume;
		Preferences.save();

		if (BGM.useHTML5) {
			BGM.audio.volume = volume;
		}
		else if (BGM.flash.SetVariable) {
			BGM.flash.SetVariable('method:setVolume', volume*100 );
		}
	};


	// Flash or HTML5 ?
	if (!BGM.useHTML5) {
		BGM.initFlash();
	}
	else {
		BGM.initHTML5();
	}

	/**
	 * Export
	 */
	return BGM;
});