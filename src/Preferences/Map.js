/**
 * Preferences/Map.js
 *
 * Map user preferences
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define( ['Core/Preferences'], function( Preferences )
{
	"use strict";


	/**
	 * Export
	 */
	return Preferences.get( 'Map', {
		fog:      true,
		lightmap: true,
		effect:   false,  // not used yet
		miss:     true    // show "miss" damage ?
	}, 1.0 );
});