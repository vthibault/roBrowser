(function Builder(){

	'use strict';

	var panel, loading, status, result;
	var thread  = new Worker('worker.js');

	// Listening data received from thread
	thread.onmessage = function(event) {
		switch (event.data.type) {
			case 'status':
				status.textContent = event.data.message;
				break;

			case 'error':
				status.textContent = event.data.message;
				document.querySelector('#loading .gear-loading').classList.add('hide');
				thread.onmessage = null;
				break;

			case 'result':
				loading.className = 'hide';
				result.className  = '';

				var appName = event.data.app.replace(/^[^\/]+\//,'') + '.js';
				var blob    = new Blob([event.data.content], { type:'application/javascript' });
				var a       = result.querySelector('a');

				result.querySelector('.location').textContent = location.href.replace(/tools\/build.*/,'') + appName;
				a.href = window.URL.createObjectURL(blob);
				a.download = appName;
				a.onclick = function() {
					result.className = 'hide';
					panel.className  = '';
				};
				break;
		}
	};

	// Compile module
	function compile() {
		if (panel.className === 'hide') {
			return;
		}

		panel.className   = 'hide';
		loading.className = '';

		thread.postMessage({ type:'build', app:this.getAttribute('data-app') });
	}

	// Hook button
	window.addEventListener('load', function(){
		panel   = document.getElementById('panel');
		loading = document.getElementById('loading');
		result  = document.getElementById('result');
		status  = document.querySelector('#loading .status');

		panel.className  = '';

		var elements = document.querySelectorAll('.group');
		var i, count = elements.length;

		for (i = 0; i < count; ++i) {
			elements[i].addEventListener('mousedown', compile, false);
		}
	}, false);
})();