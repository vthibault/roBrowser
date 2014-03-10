/**
 * UI/Components/SoundOption/SoundOption.js
 *
 * Manage sound volume
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
	var Preferences   = require('Core/Preferences');
	var AudioSettings = require('Preferences/Audio');
	var AudioManager  = require('Audio/BGM');
	var SoundManager  = require('Audio/SoundManager');
	var UIManager     = require('UI/UIManager');
	var UIComponent   = require('UI/UIComponent');
	var htmlText      = require('text!./SoundOption.html');
	var cssText       = require('text!./SoundOption.css');


	/**
	 * Create Sound Settings Component
	 */
	var SoundOption = new UIComponent( 'SoundOption', htmlText, cssText );


	/**
	 * @var {Preferences} window option
	 */
	var _preferences=  Preferences.get('SoundOption', {
		x:    300,
		y:    300,
	}, 1.0);


	/**
	 * Initialize UI
	 */
	SoundOption.init = function Init()
	{
		this.ui.find('.close').click(function(){
			this.remove();
		}.bind(this));

		//Avoid drag and drop in input elements
		this.ui.find('input').mousedown(function(event){
			event.stopImmediatePropagation();
		});

		this.ui.find('.sound').change(function(){
			AudioSettings.Sound.volume = parseInt(this.value, 10) / 100;
			AudioSettings.save();

			SoundManager.setVolume( AudioSettings.Sound.volume );
		});

		this.ui.find('.bgm').change(function(){
			AudioSettings.BGM.volume = parseInt(this.value, 10) / 100;
			AudioSettings.save();

			AudioManager.setVolume( AudioSettings.BGM.volume );
		});

		this.ui.find('.sound_state').change(function(){
			var oldVolume            = AudioSettings.Sound.volume;
			AudioSettings.Sound.play = this.checked;

			if (this.checked) {
				SoundManager.setVolume(AudioSettings.Sound.volume);
			}
			else {
				SoundManager.setVolume(0);
				SoundManager.stop();
			}

			AudioSettings.Sound.volume = oldVolume; // setVolume modify the value, get it back
			AudioSettings.save();
		});

		this.ui.find('.bgm_state').change(function(){
			AudioSettings.BGM.play = this.checked;
			AudioSettings.save();

			if (this.checked) {
				AudioManager.play(AudioManager.filename);
			}
			else {
				AudioManager.stop();
			}
		});

		this.draggable();
	};



	/**
	 * When append the element to html
	 * Execute elements in memory
	 */
	SoundOption.onAppend = function OnAppend()
	{
		this.ui.css({
			top:     _preferences.y,
			left:    _preferences.x
		});

		this.ui.find('.sound').val(AudioSettings.Sound.volume * 100);
		this.ui.find('.bgm').val( AudioSettings.BGM.volume * 100);
		this.ui.find('.sound_state')[0].checked = AudioSettings.Sound.play;
		this.ui.find('.bgm_state')[0].checked   = AudioSettings.BGM.play;
	};


	/**
	 * Once remove, save preferences
	 */
	SoundOption.onRemove = function OnRemove()
	{
		_preferences.x    = parseInt(this.ui.css('left'), 10);
		_preferences.y    = parseInt(this.ui.css('top'), 10);
		_preferences.save();
	};


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(SoundOption);
});