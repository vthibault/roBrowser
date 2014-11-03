chrome.app.runtime.onLaunched.addListener(function() {
	// Center window on screen.
	var screenWidth  = screen.availWidth;
	var screenHeight = screen.availHeight;
	var width  = 800;
	var height = 600;

	chrome.app.window.create('applications/window.html', {
		bounds: {
			width:  width,
			height: height,
			left:   Math.round((screenWidth-width)/2),
			top:    Math.round((screenHeight-height)/2)
		},
		resizable: false
	});
});