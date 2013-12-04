/**
 * App/GrfViewer.js
 *
 * Start GRF Viewer instance using ROBrowser
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

// Errors Handler (hack)
require.onError = function (err) {
	if( require.defined('UI/Components/Error/Error') ) {
		require('UI/Components/Error/Error').addTrace(err);
		return;
	}

	require(['UI/Components/Error/Error'], function( Errors ){
		Errors.addTrace(err)
	});
};

require({
	baseUrl: document.scripts[document.scripts.length-1].src.replace(/\/([^\/]+)\/([^\/]+)$/, '') + '/',
	paths: {
		text:   "Vendors/text.require",
		jquery: "Vendors/jquery-1.9.1"
	}
}, ['UI/Components/GrfViewer/GrfViewer'], function( GRFViewer )
{
	"use strict";

	GRFViewer.append();
});