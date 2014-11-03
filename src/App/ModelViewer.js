/**
 * App/ModelViewer.js
 *
 * Show Gravity models (rsm files)
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
   ['Core/Configs', 'Core/Thread', 'Core/Context', 'Core/Client', 'UI/Components/ModelViewer/ModelViewer'],
function( Configs,        Thread,        Context,        Client,                             ModelViewer ) {
	'use strict';

	function onAPIMessage( event ) {
		if (typeof event.data !== 'object') {
			return;
		}

		switch (event.data.type) {
			case 'init':
				Thread.delegate( event.source, event.origin );
				Thread.init();
				ModelViewer.append();
				break;

			case 'load':
				ModelViewer.loadModel(event.data.data);
				event.stopPropagation();
				break;

			case 'stop':
				ModelViewer.stop();
				event.stopPropagation();
				break;
		}
	}

	// Resources sharing
	if (Configs.get('API')) {
		window.addEventListener('message', onAPIMessage, false);
		return;
	}

	// Wait for thread to be ready and run the modelviewer
	Thread.hook('THREAD_READY', function(){
		Client.onFilesLoaded = function(){
			ModelViewer.append();
		};
		Client.init([]);
	});
	Thread.init();

});