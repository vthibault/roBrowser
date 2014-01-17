/**
 * UI/Components/Intro/Preferences.js
 *
 * Manage User Preferences
 * *
 * @author Vincent Thibault
 */

define(['Core/Context', 'Core/Preferences', 'Preferences/Audio'], function( Context, Preferences, Audio )
{
	"use strict";


	/**
	 * Preferences structure
	 */
	var _preferences = Preferences.get('Window', {
		screensize:  '800x600',
		quality:      100,
		serverfile:  'clientinfo.xml',
		serverlist:  [],
		serverdef:   'serverfile',
		save:        true
	}, 1.1 );


	/**
	 * Load preferences
	 *
	 * @param {jQuery} ui
	 */
	function Load( ui )
	{
		ui.find('.screensize').val( _preferences.screensize );
		ui.find('.quality').val( _preferences.quality ).trigger('change');

		ui.find('.serverdef').attr('checked', false );
		ui.find('.serverdef[value="'+ _preferences.serverdef +'"]').attr('checked', 'true').trigger('click');
		ui.find('.clientinfo').val( _preferences.serverfile );
		
		ui.find('.bgmvol').val( Audio.BGM.volume * 100 ).trigger('change');;
		ui.find('.soundvol').val( Audio.Sound.volume * 100 ).trigger('change');

		if (!window.requestFileSystem && !window.webkitRequestFileSystem) {
			ui.find('.save').attr('disabled', 'disabled');
		}

		else if (ROConfig.hasOwnProperty('saveFiles') && ROConfig.saveFiles === false) {
			ui.find('.save').attr('disabled', 'disabled');
		}
		else {
			ui.find('.save').attr('checked', _preferences.saveFiles ? 'checked' : false );
		}

		var i, count;
		var serverlist = _preferences.serverlist;
		var $servers = ui.find('.servers').empty();

		for (i = 0, count = serverlist.length; i < count; ++i) {
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

		Apply();
	}


	/**
	 * Save preferences
	 *
	 * @param {jQuery} ui
	 */
	function Save( ui )
	{
		_preferences.screensize = ui.find('.screensize').val();
		_preferences.quality    = ui.find('.quality').val();
		_preferences.saveFiles  = ui.find('.save:checked').length ? true : false;

		var $servers = ui.find('.servers');
		var i, count = $servers.find('tr').length;
		var $server;

		if (ROConfig.serverEditMode) {
			_preferences.serverdef  = ui.find('.serverdef:checked').val();
			_preferences.serverfile = ui.find('.clientinfo').val();
			_preferences.serverlist = [];

			for (i = 0; i < count; ++i) {
				$server = $servers.find('tr:eq('+ i +')');
				_preferences.serverlist.push({
					display:   $server.find('.display').val(),
					address:   $server.find('.address').val().split(':')[0],
					port:      parseInt( $server.find('.address').val().split(':')[1], 10),
					version:   $server.find('.version').val(),
					langtype:  $server.find('.langtype').val(),
					packetver: $server.find('.packetver').val()
				});
			}
		}
		
		Audio.BGM.volume    = ui.find('.bgmvol').val() / 100;
		Audio.BGM.play      = Audio.BGM.volume > 0 ? true : false;
		Audio.Sound.volume  = ui.find('.soundvol').val() / 100;
		Audio.Sound.play    = Audio.Sound.volume > 0 ? true : false;

        Audio.save();

		_preferences.save();

		Apply()
	}


	/**
	 * Apply preferences
	 */
	function Apply()
	{
		var isFullScreen = Context.isFullScreen();

		// Full Screen support
		if (_preferences.screensize === "full") {
			if (!isFullScreen) {
				Context.requestFullScreen();
			}
		}
		else {

			if (isFullScreen) {
				Context.cancelFullScreen();
			}

			// Resizing
			if (Context.Is.POPUP) {
				var size = _preferences.screensize.split("x");

				// Only resize/move if needed
				if (size[0] != window.innerWidth && size[1] != window.innerHeight) {
					window.resizeTo( size[0], size[1] );
					window.moveTo( (screen.availWidth - size[0]) / 2, (screen.availHeight - size[1]) / 2 );
				}
			}
		}

		if (ROConfig.serverEditMode) {
			// Bind data
			if (_preferences.serverdef === 'serverlist') {
				ROConfig.servers = _preferences.serverlist;
			}
			else {
				ROConfig.servers = 'data/' + _preferences.serverfile;
			}
		}

		if (!ROConfig.hasOwnProperty('saveFiles') || ROConfig.saveFiles === true) {
			ROConfig.saveFiles = _preferences.saveFiles;
		}

		ROConfig.quality = _preferences.quality;
	}


	/**
	 * Export
	 */
	return {
		save: Save,
		load: Load
	};
});