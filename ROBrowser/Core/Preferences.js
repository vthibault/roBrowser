/**
 * Core/Preferences.js
 *
 * Store informations in local storage (window position, noctrl, etc.)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function()
{
	"use strict";


	/**
	 * Get back values
	 *
	 * @param {string} key
	 * @param {mixed} default value
	 * @param {number} optional version
	 */
	function Get( key, def, version )
	{
		var value = localStorage.getItem(key);
		version   = version || 0.0

		// Not existing, storing it
		if( value === null || JSON.parse(value)._version !== version ) {
			if( def ) {
				def._key     = key;
				def._version = version;
				def.save     = SelfSave;
				Save( def );
				return def;
			}

			return null;
		}

		var data     = JSON.parse( value );
		data._key    = key;
		def._version = version;
		data.save    = SelfSave;

		return data;
	}


	/**
	 * Save value in storage
	 *
	 * @param {string} key
	 * @param {object} value to store
	 */
	function Save( data )
	{
		var key = data._key;
		delete data._key;
		delete data._save;

		localStorage.setItem( key, JSON.stringify(data) );	

		data._key  = key;
		data._save = SelfSave;
	}


	/**
	 * Save from object
	 */
	function SelfSave()
	{
		Save( this );
	}


	/**
	 *
	 */
	return {
		get:  Get,
		save: Save
	};
});