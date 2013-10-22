/**
 * Vendors/jquery.js
 *
 * jQuery support for AMD is bad, have to use a hack to get it work
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['jquery'], function( jQuery ){
	return jQuery.noConflict( true );
});