/**
 * app/online.js
 *
 * Start roBrowser
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

require( {
	urlArgs: ROConfig.version,
	baseUrl: './src/',
	paths: {
		text:   'vendors/text.require',
		jquery: 'vendors/jquery-1.9.1'
	}
},
	['engine/GameEngine', 'core/Context', 'plugins/PluginManager'],
	function(GameEngine,        Context,           Plugins) {
		'use strict';

		Plugins.init();
		GameEngine.init();

		if (!Context.Is.APP) {
			window.onbeforeunload = function() {
				return 'Are you sure to exit roBrowser ?';
			};
		}
	}
);