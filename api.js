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


	"use strict";


	/**
	 * @Constructor 
	 */
	function ROBrowser( options ){
		if( typeof options === "object") {
			var key;

			for( key in options ) {
				if( ROBrowser.prototype.hasOwnProperty( key ) ) {
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
		ONLINE:    1,
		MAPVIEWER: 2,
		GRFVIEWER: 3
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
	 *    [ "custom.grf", "palette.grf", "data.grf" ]
	 *
	 * b) {string} DATA.INI filename to load
	 *    "DATA.INI"
	 *
	 * c) {RegExp} to filter grf files:
	 *     /\.grf$/i
	 */
	ROBrowser.prototype.grfList = null;


	/**
	 * @var {servers} server listing
	 *
	 * a) {string} clientinfo file to load
	 *    "data/clientinfo.xml"
	 *
	 * b) {Array} server list to display:
	 */
	ROBrowser.prototype.servers = "data/clientinfo.xml";


	/**
	 * @var {string} Host where to download files
	 */
	ROBrowser.prototype.remoteClient = "http://grf.robrowser.com/";


	/**
	 * @var {number|string} packet version
	 *
	 * Supported value:
	 *    a) YYYYMMDD     (number: date you want)
	 *    b) "auto"       (detect packetver from client and packets received from server)
	 *    c) "executable" (detect packetver from executable compilation date)
	 */
	ROBrowser.prototype.packetver    = 'auto';


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
	 * If using container type "frame", place the content in the HTMLElement specify
	 */
	ROBrowser.prototype.target = null;


	/**
	 * @var {string} roBrowser api window path
	 */
	ROBrowser.prototype.baseUrl = (function(){
		var script = document.getElementsByTagName('script');
		return script[ script.length -1 ].src;
	})().replace('.js', '.html');


	/**
	 * Start ROBrowser Instance
	 */
	ROBrowser.prototype.start = function Start()
	{
		switch( this.type ) {

			// Create Popup
			case ROBrowser.TYPE.POPUP:
				this.width  = this.width  || '800';
				this.height = this.height || '600';

				this._APP = window.open(
					this.baseUrl,
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
				frame.src          = this.baseUrl;
				frame.width        = this.width;
				frame.height       = this.height;
				frame.style.border = "none";

				if( this.target ) {
					while( this.target.firstChild ) {
						this.target.removeChild( this.target.firstChild );
					}
					this.target.appendChild(frame);
				}

				this._APP = frame.contentWindow;
				break;
		}


		// Get back application name
		switch( this.application ) {
			case ROBrowser.APP.ONLINE:
				this.application = 'Online';
				break;	

			case ROBrowser.APP.MAPVIEWER:
				this.application = 'MapViewer';
				break;

			case ROBrowser.APP.GRFVIEWER:
				this.application = 'GrfViewer';
				break;
		}


		// Wait for robrowser to be ready
		var _this = this;
		function OnMessage() {
			if( _this.baseUrl.indexOf(event.origin) === 0 ) {
				clearInterval( _this._Interval );
				window.removeEventListener( 'message', OnMessage, false );
			}
		}

		// Start waiting for robrowser
		this._Interval  = setInterval( WaitForInitialization.bind(this), 100 );
		window.addEventListener( 'message', OnMessage, false );
	};


	/**
	 * Spam the window until there is an answer
	 * No onload event from external iframe/popup
	 */
	function WaitForInitialization()
	{
		this._APP.postMessage({
			application:  this.application,
			servers:      this.server,
			grfList:      this.grfList,
			remoteClient: this.remoteClient,
			packetver:    this.packetver
		}, '*');
	}


	/**
	 * Export
	 */
	window.ROBrowser = ROBrowser;

})();