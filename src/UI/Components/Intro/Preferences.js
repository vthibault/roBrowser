/**
 * UI/Components/Intro/Preferences.js
 *
 * Manage User Preferences
 * *
 * @author Vincent Thibault
 */

define(['Utils/jquery', 'Core/Configs', 'Core/Context', 'Core/Preferences', 'Preferences/Audio', 'Preferences/Graphics'],
function(      jQuery,        Configs,        Context,        Preferences,               Audio,               Graphics )
{
	'use strict';


	/**
	 * Preferences structure
	 */
	var _preferences = Preferences.get('Window', {
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
	function load( ui )
	{
		if (Graphics.screensize === 'full' && !Context.isFullScreen()) {
			Graphics.screensize = '800x600';
		}

		ui.find('.screensize').val( Graphics.screensize );
		ui.find('.quality').val( Graphics.quality ).trigger('change');

		ui.find('.serverdef').attr('checked', false );
		ui.find('.cursor').attr('checked', Graphics.cursor);
		ui.find('.serverdef[value="'+ _preferences.serverdef +'"]').attr('checked', 'true').trigger('click');
		ui.find('.clientinfo').val( _preferences.serverfile );
		
		ui.find('.bgmvol').val( Audio.BGM.volume * 100 ).trigger('change');
		ui.find('.soundvol').val( Audio.Sound.volume * 100 ).trigger('change');

		if (!window.requestFileSystem && !window.webkitRequestFileSystem) {
			Configs.set('saveFiles', false);
			ui.find('.save').attr('disabled', 'disabled');
		}
		else if (!Configs.get('saveFiles')) {
			ui.find('.save').attr('disabled', 'disabled');
		}
		else {
			ui.find('.save').attr('checked', _preferences.saveFiles ? 'checked' : false );
		}

		var i, count;
		var serverlist = _preferences.serverlist;
		var $servers = ui.find('.servers').empty();
		var element = jQuery(
			'<tr>' +
			'	<td><input type="text" class="display"/></td>'   +
			'	<td><input type="text" class="address"/></td>'   +
			'	<td><input type="text" class="version"/></td>'   +
			'	<td><input type="text" class="langtype"/></td>'  +
			'	<td><input type="text" class="packetver"/></td>' +
			'	<td><button class="btn_delete"></button></td>'   +
			'</tr>'
		);

		for (i = 0, count = serverlist.length; i < count; ++i) {
			var server = element.clone();

			server.find('.display').val(serverlist[i].display);
			server.find('.address').val(serverlist[i].address +':'+ serverlist[i].port);
			server.find('.version').val(serverlist[i].version);
			server.find('.langtype').val(serverlist[i].langtype);
			server.find('.packetver').val(serverlist[i].packetver);

			$servers.append(server);
		}


		apply();
	}


	/**
	 * Save preferences
	 *
	 * @param {jQuery} ui
	 */
	function save( ui )
	{
		Graphics.screensize    = ui.find('.screensize').val();
		Graphics.quality       = ui.find('.quality').val();
		Graphics.cursor        = ui.find('.cursor:checked').length ? true : false;
		_preferences.saveFiles = ui.find('.save:checked').length   ? true : false;

		var $servers = ui.find('.servers');
		var i, count = $servers.find('tr').length;
		var $server;

		if (Configs.get('_serverEditMode')) {
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
        Graphics.save();
		_preferences.save();

		apply();
	}


	/**
	 * Apply preferences
	 */
	function apply()
	{
		var isFullScreen = Context.isFullScreen();

		// Full Screen support
		if (Graphics.screensize === 'full') {
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
				var size = Graphics.screensize.split('x');

				// Only resize/move if needed
				if (size[0] != window.innerWidth && size[1] != window.innerHeight) {
					window.resizeTo( size[0], size[1] );
					window.moveTo( (screen.availWidth - size[0]) / 2, (screen.availHeight - size[1]) / 2 );
				}
			}
		}

		if (Configs.get('_serverEditMode')) {
			if (_preferences.serverdef === 'serverlist') {
				Configs.set('servers', _preferences.serverlist );
			}
			else {
				Configs.set('servers', 'data/' + _preferences.serverfile );
			}
		}

		Configs.set('saveFiles', _preferences.saveFiles);
		Configs.set('quality',   Graphics.quality);
	}


	/**
	 * Export
	 */
	return {
		save: save,
		load: load
	};
});