/**
 * api.js
 *
 * Robrowser application entry, starting instance.
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */


(function ROAPI(){


	'use strict';


	/**
	 * @Constructor 
	 */
	function ROBrowser( options ){
		if (typeof options === 'object') {
			var key;

			for (key in options) {
				if (ROBrowser.prototype.hasOwnProperty( key )) {
					this[ key ] = options[key];
				}
			}
		}
	}


	/**
	 * @Enum Robrowser type
	 */
	ROBrowser.TYPE = {
		POPUP:  1,
		FRAME:  2
	};


	/**
	 * @Enum Robrowser Applications
	 */
	ROBrowser.APP = {
		ONLINE:      1,
		MAPVIEWER:   2,
		GRFVIEWER:   3,
		MODELVIEWER: 4,
		STRVIEWER:   5
	};


	/**
	 * @var {number} screen width
	 */
	ROBrowser.prototype.width = 0;


	/**
	 * @var {number} screen height
	 */
	ROBrowser.prototype.height = 0;


	/**
	 * @var {mixed} grf listing
	 *
	 * a) {Array} of GRFs: 
	 *    [ 'custom.grf', 'palette.grf', 'data.grf' ]
	 *
	 * b) {string} DATA.INI filename to load
	 *    'DATA.INI'
	 *
	 * c) {RegExp} to filter grf files:
	 *     /\.grf$/i
	 */
	ROBrowser.prototype.grfList = null;


	/**
	 * @var {servers} server listing
	 *
	 * a) {string} clientinfo file to load
	 *    'data/clientinfo.xml'
	 *
	 * b) {Array} server list to display:
	 */
	ROBrowser.prototype.servers = 'data/clientinfo.xml';


	/**
	 * @var {string} Host where to download files
	 */
	ROBrowser.prototype.remoteClient = 'http://grf.robrowser.com/';


	/**
	 * @var {number|string} packet version
	 *
	 * Supported value:
	 *    a) YYYYMMDD     (number: date you want)
	 *    c) 'executable' (detect packetver from executable compilation date)
	 */
	ROBrowser.prototype.packetver    = 'auto';


	/**
	 * @var {number} character info block size
	 * If not set, it will try to guess the type based on the packetver and the block total length
	 */
	ROBrowser.prototype.charBlockSize = 0;


	/**
	 * @var {string} client hash to send to server
	 */
	ROBrowser.prototype.clientHash = null;


	/**
	 * @var {constant} application name (see: ROBrowser.APP.* )
	 *
	 * Known applications:
	 *   a) ROBrowser.APP.ONLINE    - RoBrowser online mode
	 *   b) ROBrowser.APP.GRFVIEWER - parse and visualize GRF contents
	 *   c) ROBrowser.APP.MAPVIEWER - parse and visualize maps
	 */
	ROBrowser.prototype.application = ROBrowser.APP.ONLINE;


	/**
	 * @var {constant} container type (see: ROBrowser.TYPE.POPUP)
	 */
	ROBrowser.prototype.type = ROBrowser.TYPE.POPUP;


	/**
	 * @var {string} element ID
	 * If using container type 'frame', place the content in the HTMLElement specify
	 */
	ROBrowser.prototype.target = null;


	/**
	 * @var {boolean} is in development mode ?
	 */
	ROBrowser.prototype.development = false;


	/**
	 * @var {function} callback to execute once roBrowser is ready
	 */
	ROBrowser.prototype.onReady = null;


	/**
	 * @var {boolean} use API once ready ?
	 */
	ROBrowser.prototype.api = false;


	/**
	 * @var {string} proxy server ex: 'ws://pserver.com:5200/'
	 */
	ROBrowser.prototype.socketProxy = null;


	/**
	 * @var {integer|boolean|array} packetKeys
	 * see: http://hercules.ws/board/topic/1105-hercules-wpe-free-june-14th-patch/
	 *
	 * Supported value:
	 * - integer : client date,
	 *         ex: packetKeys: 20131223,
	 * - boolean : supported ? If it's the case, will use the executable compiled date to get the keys
	 *         ex: packetKeys: true,
	 * - array: the keys you want to use:
	 *         ex: packetKeys: [0xFF2615DE, 0x96AAE533, 0x1166CC33],
	 */
	ROBrowser.prototype.packetKeys = false;


	/**
	 * @var {boolean} should we save files in chrome filesystem ?
	 * 
	 * If set to true, then we try to save the files loaded from server/grfs on a filesystem to load
	 * them faster the next time.
	 * 
	 * Only working on Chrome, status: deprecated.
	 */
	ROBrowser.prototype.saveFiles = false;


	/**
	 * @var {boolean} skip server list if only one server define ?
	 *
	 * If set to true and the server list (clientinfo, char-server list) just have one
	 * element defined, the window will be skipped and you will auto-connect to the server.
	 *
	 * Set to false, will display the server list even if there is just one server set.
	 */
	ROBrowser.prototype.skipServerList = true;


	/**
	 * @var {boolean} do we skip the intro ?
	 * Note: if you skip it, the user will not be able to load their local fullclient
	 */
	ROBrowser.prototype.skipIntro = false;


	/**
	 * @var {Array} do you want to auto-login to the server ?
	 * Can be used in a securized session to auto-connect to the server without inserting login-pass (ie: Facebook app ?)
	 * Using as autoLogin: ["username", "userpass"]
	 */
	ROBrowser.prototype.autoLogin = [];


	/**
	 * @var {mixed} set a version to avoid browser cache problem so
	 * your users wil get the latest version running instead of a
	 * cached one.
	 */
	ROBrowser.prototype.version = '';


	/**
	 * @var {Array} list of extensions you want to use for your BGMs.
	 * It will test each extensions until there is one it can read.
	 *
	 * Examples: ['ogg', 'mp4', 'mp3']
	 * Will try to see if it can load '.ogg' audio file, if it fail, will try to see if it can load .mp4, etc.
	 */
	ROBrowser.prototype.BGMFileExtension = ['mp3'];


	/**
	 * @var {Object} Define plugin to execute
	 * It will test each extensions until there is one it can read.
	 */
	ROBrowser.prototype.plugins = {};


	/**
	 * @var {string} roBrowser api window path
	 */
	ROBrowser.prototype.baseUrl = (function(){
		var script = document.getElementsByTagName('script');
		return script[ script.length -1 ].src
			.replace(/\/[^\/]+\.js.*/, '/api.js') // redirect compiled script
			.replace(/\/src\/.*/, '/api.js');     // fix error with cache (FF)
	})().replace('.js', '.html');


	/**
	 * Start ROBrowser Instance
	 */
	ROBrowser.prototype.start = function Start()
	{
		switch (this.type) {

			// Create Popup
			case ROBrowser.TYPE.POPUP:
				this.width  = this.width  || '800';
				this.height = this.height || '600';

				this._APP = window.open(
					this.baseUrl + '?' + this.version,
					'_blank',
					[
						'directories=0',
						'fullscreen=0',
						'top='  + ( (window.innerHeight||document.body.clientHeight)-this.height) / 2,
						'left=' + ( (window.innerWidth ||document.body.clientWidth) -this.width ) / 2,
						'height='+ this.height,
						'width=' + this.width,
						'location=0',
						'menubar=0',
						'resizable=0',
						'scrollbars=0',
						'status=0',
						'toolbar=0'
					].join(',')
				);
				break;

			// Append ROBrowser to an element
			case ROBrowser.TYPE.FRAME:
				this.width  = this.width  || '100%';
				this.height = this.height || '100%';

				var frame          = document.createElement('iframe');
				frame.src          = this.baseUrl + '?' + Math.random(); // fix bug on firefox
				frame.width        = this.width;
				frame.height       = this.height;
				frame.style.border = 'none';

				frame.setAttribute('allowfullscreen', 'true');
				frame.setAttribute('webkitallowfullscreen', 'true');
				frame.setAttribute('mozallowfullscreen', 'true');

				if (this.target) {
					while (this.target.firstChild) {
						this.target.removeChild( this.target.firstChild );
					}
					this.target.appendChild(frame);
				}

				this._APP = frame.contentWindow;
				break;
		}


		// Get back application name
		switch (this.application) {
			case ROBrowser.APP.ONLINE:
				this.application = 'Online';
				break;

			case ROBrowser.APP.MAPVIEWER:
				this.application = 'MapViewer';
				break;

			case ROBrowser.APP.GRFVIEWER:
				this.application = 'GrfViewer';
				break;

			case ROBrowser.APP.MODELVIEWER:
				this.application = 'ModelViewer';
				break;

			case ROBrowser.APP.STRVIEWER:
				this.application = 'StrViewer';
				break;
		}


		// Wait for robrowser to be ready
		var _this = this;
		function OnMessage( event ) {
			if (_this.baseUrl.indexOf(event.origin) === 0) {
				clearInterval( _this._Interval );
				window.removeEventListener( 'message', OnMessage, false );

				if (_this.onReady) {
					_this.onReady();
				}
			}
		}

		// Start waiting for robrowser
		this._Interval = setInterval( WaitForInitialization.bind(this), 100 );
		window.addEventListener('message', OnMessage, false );
	};


	/**
	 * Spam the window until there is an answer
	 * No onload event from external iframe/popup
	 */
	function WaitForInitialization()
	{
		this._APP.postMessage({
			application:      this.application,
			servers:          this.servers,
			grfList:          this.grfList,
			remoteClient:     this.remoteClient,
			packetver:        this.packetver,
			development:      this.development,
			api:              this.api,
			socketProxy:      this.socketProxy,
			packetKeys:       this.packetKeys,
			saveFiles:        this.saveFiles,
			skipServerList:   this.skipServerList,
			skipIntro:        this.skipIntro,
			autoLogin:        this.autoLogin,
			version:          this.version,
			clientHash:       this.clientHash,
			plugins:          this.plugins,
			charBlockSize:    this.charBlockSize,
			BGMFileExtension: this.BGMFileExtension
		}, '*');
	}


	/**
	 * Export
	 */
	window.ROBrowser = ROBrowser;
})();