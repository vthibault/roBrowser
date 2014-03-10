/**
 * Preferences/Audio.js
 *
 * Audio preferences
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define( ['Core/Preferences'], function( Preferences )
{
	'use strict';


	/**
	 * Export
	 */
	return Preferences.get( 'Audio', {

		BGM:   {
			play:   true,
			volume: 0.5
		},

		Sound: {
			play:   true,
			volume: 0.5
		}

	}, 1.0 );

});