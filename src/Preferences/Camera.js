/**
 * Preferences/Camera.js
 *
 * Camera user preferences
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
	return Preferences.get( 'Camera', {
		smooth:  true,
		zoom:    50.0
	}, 1.1 );
});