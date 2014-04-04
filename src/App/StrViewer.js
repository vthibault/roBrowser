/**
 * App/StrViewer.js
 *
 * Show Str file effect
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

// Errors Handler (hack)
require.onError = function (err) {
	'use strict';

	if (require.defined('UI/Components/Error/Error')) {
		require('UI/Components/Error/Error').addTrace(err);
		return;
	}

	require(['UI/Components/Error/Error'], function( Errors ){
		Errors.addTrace(err);
	});
};

require({
	baseUrl: './src/',
	paths: {
		text:   'Vendors/text.require',
		jquery: 'Vendors/jquery-1.9.1'
	}
},
   ['Core/Thread', 'Core/Context', 'Core/Client', 'UI/Components/StrViewer/StrViewer'],
function( Thread,        Context,        Client,                           StrViewer ) {
	'use strict';

	function synchronise( event ) {
		Thread.delegate( event.source, event.origin );
		Thread.init();
		StrViewer.append();

		window.removeEventListener('message', synchronise, false);
	}

	// Resources sharing
	if (ROConfig.API) {
		window.addEventListener('message', synchronise, false);
		return;
	}

	// Wait for thread to be ready and run the modelviewer
	Thread.hook('THREAD_READY', function(){
		Client.onFilesLoaded = function(){
			StrViewer.append();
		};
		Client.init([]);
	});
	Thread.init();

});