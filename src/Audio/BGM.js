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
 
define( ['require', 'Utils/jquery', 'Core/Client', 'Preferences/Audio'],
function( require,         jQuery,        Client,   Preferences )
{
	'use strict';


	/**
	 * BGM NameSpace
	 */
	var BGM = {};

	// Flash global variables
	BGM.stat        = 0;
	BGM.position    = null;
	BGM.filename    = null;
	BGM.volume      = Preferences.BGM.volume;
	BGM.isPlaying   = 'false';

	BGM.audio       = document.createElement('audio');
	BGM.useHTML5    = false;
	BGM.extension   = 'mp3';
	BGM.isInit      = false;


	/**
	 * Initialize Flash
	 * If the browser don't support HTML5
	 */
	BGM.initFlash = function initFlash()
	{
		if (BGM.isInit) {
			return;
		}

		// Flash need the object to be in a global scope
		window.BGM = BGM;
		BGM.isInit = true;

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
		if (BGM.isInit) {
			return;
		}

		BGM.isInit = true;

		// Buggy looping for HTM5 Audio...
		if (typeof BGM.audio.loop === 'boolean') {
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
	 * Test audio extension from a list to see what format the browser can read
	 * If the browser can't read audio files, a flash callback will be used.
	 *
	 * @param {Array} extensions list
	 */
	BGM.setAvailableExtensions = function setAvailableExtensions( extensions )
	{
		var i, count;
		var audio = this.audio;

		this.useHTML5 = false;

		// Test for BGMFileExtension config
		if (!audio.canPlayType) {
			BGM.initFlash();
			return;
		}

		if (!extensions || !extensions.length) {
			extensions = ['mp3'];
		}

		// Find supported audio file from list
		for (i = 0, count = extensions.length; i < count; ++i) {
			if (audio.canPlayType('audio/' + extensions[i]).replace(/no/i, '')) {
				this.extension = extensions[i];
				this.useHTML5  = true;
				BGM.initHTML5();
				return;
			}
		}

		BGM.initFlash();
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

		// Remove the "BGM/" part
		if (filename.match(/bgm/i)) {
			filename = filename.match(/\w+\.mp3/i).toString();
		}

		// If it's the same file, check if it's already playing
		if (this.filename === filename) {
			if ((!this.useHTML5 && this.isPlaying == 'true') ||
				( this.useHTML5 && !this.audio.paused)) {
					return;
			}
		}
		else {
			this.filename = filename;
		}

		// Just if flash is loaded, load the file.
		if ((this.useHTML5 || this.position !== null) && Preferences.BGM.play) {
			Client.loadFile( 'BGM/' + filename, function(url) {
				BGM.load(url);
			});
		}
	};


	/**
	 * Load the audio file
	 *
	 * @param {string} url (HTTP / DATA URI or BLOB)
	 */
	BGM.load = function load(url)
	{
		if (!Preferences.BGM.play) {
			return;
		}

		// Add support for other extensions, only supported with
		// remote audio files.
		if (!url.match(/^(blob|data)\:/) && BGM.useHTML5){
			url = url.replace(/mp3$/i, BGM.extension);
		}

		// HTML5 audio
		if (BGM.useHTML5) {
			BGM.audio.src    = url;
			BGM.audio.volume = this.volume;
			BGM.audio.play();
		}

		// Flash fallback
		else if (BGM.flash.SetVariable) {
			BGM.flash.SetVariable('method:setUrl', url );
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
	BGM.setVolume = function setVolume( volume )
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


	/**
	 * Export
	 */
	return BGM;
});