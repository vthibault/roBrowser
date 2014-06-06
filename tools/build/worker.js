importScripts('r.js?' + Date.now());

// Load min.require.js
var xhr = new XMLHttpRequest();
xhr.open('GET', 'require.js?' + Date.now(), false);
xhr.send();
var requirejslib = xhr.responseText;

// Logging informations
function onlog(text) {
	postMessage({
		type:   'status',
		message: text
	});
}

// Urg an error...
function onerror(text) {
	postMessage({
		type:   'error',
		message: text
	})
}

// Output the generated script in the box
function outputApp(appName) {
	var header = [
		'/*',
		' * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).',
		' * @author Vincent Thibault and the community',
		' */',
	].join("\n");

	return function outputScript(text) {
		// Remove importScripts(requirejs), included directly
		text = text.replace(/importScripts\([^\)]+\)(\,|\;|\n)?/, '');
		postMessage({
			type:   'result',
			app:     appName,
			content: header + "\n\n" +  requirejslib + "\n\n" + text
		});
	};
}

// Compiling scripts
function buildApp(appName) {
	requirejs.optimize({

		// Initialize configs
		name:        appName,
		baseUrl:     '../../src/',
		useStrict:   true,

		// Don't have minimum time loading, remove cache
		waitSeconds: Infinity,
		urlArgs:     Date.now(),

		// Shortcut used in the app
		paths: {
			text:   'Vendors/text.require',
			jquery: 'Vendors/jquery-1.9.1'
		},

		// Minify scripts
		optimize: 'uglify',
		uglify: {
			ascii_only: true
		},

		// Logs
		log: onlog,

		// Errors
		error: onerror,

		// Output
		out: outputApp(appName),
	});
}

// Receving data
onmessage = function onmessage(event){
	switch (event.data.type) {
		case 'build':
			buildApp(event.data.app);
			break;
	}
};