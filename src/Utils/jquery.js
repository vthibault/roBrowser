/**
 * Utils/jquery.js
 *
 * Extend jquery
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['jquery', 'DB/DBManager'], function( jQuery, DB )
{
	'use strict';


	/**
	 * Overwrite text() to support npc code
	 *
	 * @param {string} value
	 */
	jQuery.fn.text = function( text ) {
		return jQuery.access( this, function( value ) {

			if (value === undefined) {
				return jQuery.text( this );
			}

			var reg, txt, result;

			// Escape, secure entry
			value = String(value);
			txt   = jQuery.escape(value);

			// Msg color ^000000
			reg = /\^([a-fA-F0-9]{6})/ ;
			while ((result = reg.exec(txt))) {
				txt = txt.replace( result[0], '<span style="color:#' + result[1] + '">') + '</span>';
			}

			// Hiding hack ^nItemID^502
			reg = /\^nItemID\^(\d+)/g;
			while ((result = reg.exec(txt))) {
				txt = txt.replace( result[0], DB.getItemInfo(result[1]).identifiedDisplayName );
			}

			// Line feed feature
			txt = txt.replace(/\n/g, '<br/>');

			return jQuery(this).html( txt );

		}, null, text, arguments.length );
	};


	/**
	 * Escape special chars from a string
	 *
	 * @param {string} text
	 * @returns {string} encoded string
	 */
	jQuery.escape = (function escapeClosure(){
		var element = document.createElement('div');

		return function escape(text) {
			element.textContent = text;
			return element.innerHTML;
		};
	})();


	/**
	 * Export
	 */
	return jQuery.noConflict( true );
});