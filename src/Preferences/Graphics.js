/**
 * Preferences/Graphics.js
 *
 * Graphics preferences
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
	return Preferences.get( 'Graphics', {

		/**
		 * Game size
		 */
		screensize:  '800x600',

		/*
		 * Game quality detail
		 * 100: Full
		 */
		quality:     100,


		/**
		 * Do we show official game cursor ?
		 */
		cursor:      true

	}, 1.1 );

});