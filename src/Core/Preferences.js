/**
 * Core/Preferences.js
 *
 * Store informations in local storage (window position, noctrl, etc.)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define([ './Context' ], function( Context )
{
	'use strict';


	var Storage = Context.Is.APP ?
		window.chrome.storage.local :
		{
			get: function Get( key, fn ){
				var out = {};
				out[key] = localStorage.getItem(key);
				fn( out );
			},
			set: function Set( obj, fn ) {
				var keys = Object.keys( obj );
				var i, count;

				for (i = 0, count = keys.length; i < count; ++i) {
					localStorage.setItem( keys[i], obj[ keys[i] ] );
				}

				if (fn) {
					fn();
				}
			}
		};


	/**
	 * Get back values
	 *
	 * @param {string} key
	 * @param {mixed} default value
	 * @param {number} optional version
	 */
	function get( key, def, version )
	{
		Storage.get( key, function( value ){
			var data, keys;
			var i, count;

			version   = version || 0.0;

			// Not existing, storing it
			if (!value[key] || JSON.parse(value[key])._version !== version) {
				save( def );
				return;
			}

			data          = JSON.parse( value[key] );
			data._key     = key;
			data._version = version;
			data.save     = selfSave;

			keys          = Object.keys(data);
			count         = keys.length;

			for (i = 0; i < count; ++i) {
				def[ keys[i] ] = data[ keys[i] ];
			}
		});

		def._key     = key;
		def._version = version;
		def.save     = selfSave;

		return def;
	}


	/**
	 * Save value in storage
	 *
	 * @param {string} key
	 * @param {object} value to store
	 */
	function save( data )
	{
		var key = data._key;
		delete data._key;
		delete data.save;

		var store = {};
		store[key] = JSON.stringify(data);

		Storage.set( store );

		data._key  = key;
		data.save  = selfSave;
	}


	/**
	 * Save from object
	 */
	function selfSave()
	{
		save( this );
	}


	/**
	 *
	 */
	return {
		get:  get,
		save: save
	};
});