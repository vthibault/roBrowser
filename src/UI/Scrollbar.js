/**
 * UI/Scrollbar.js
 *
 * Manage custom scrollbar
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define( ['utils/jquery', 'utils/Texture', 'db/DBManager', 'core/Client' ],
function(       jQuery,         Texture,      DB,               Client )
{
	'use strict';


	/**
	 * ScrollBar Namespace
	 */
	var ScrollBar = {};


	/**
	 * @var {boolean} does the scrollbar completely loaded ?
	 */
	ScrollBar.complete = false;


	/**
	 * Initialize scrollbar
	 */
	ScrollBar.init = function init()
	{
		// Already loaded
		if (ScrollBar.complete) {
			return;
		}

		//Custom scrollbar
		Client.loadFiles(
			[ DB.INTERFACE_PATH + 'scroll0down.bmp',
			  DB.INTERFACE_PATH + 'scroll0mid.bmp',
			  DB.INTERFACE_PATH + 'scroll0up.bmp',
			  DB.INTERFACE_PATH + 'scroll0bar_down.bmp',
			  DB.INTERFACE_PATH + 'scroll0bar_mid.bmp',
			  DB.INTERFACE_PATH + 'scroll0bar_up.bmp' ],
			function( down, mid, up, baseDown, baseMid, baseUp ) {

				Texture.load( baseDown, function(){
					var baseDown = this;
					Texture.load( baseMid, function(){
						var baseMid = this;
						Texture.load( baseUp, function(){
							var baseUp  = this;
							var base    = document.createElement('canvas');
							var ctx     = base.getContext('2d');
							base.width  = baseUp.width;
							base.height = baseUp.height + baseMid.height + baseDown.height;

							ctx.drawImage( baseUp, 0, 0);
							ctx.drawImage( baseMid, 0, baseUp.height);
							ctx.drawImage( baseDown, 0, baseUp.height + baseMid.height );

							jQuery('style:first').append([
								'::-webkit-scrollbar { width: 13px; height: 12px; }',
								'::-webkit-scrollbar-button:vertical:start:increment,',
								'::-webkit-scrollbar-button:vertical:end:decrement { display: none;}',
								'::-webkit-scrollbar-button:start:decrement,',
								'::-webkit-scrollbar-button:end:increment { display: block; }',
								'::-webkit-scrollbar-corner:vertical {display:none;}',
								'::-webkit-scrollbar-resizer:vertical {display:none;}',
								'::-webkit-scrollbar-button:vertical:increment { background-repeat:no-repeat; height:13px;}',
								'::-webkit-scrollbar-button:vertical:decrement { background-repeat:no-repeat; height:12px;}',
								'::-webkit-scrollbar-track-piece:vertical {background-repeat:repeat-y;}',
								'::-webkit-scrollbar-thumb:vertical{border-color: transparent;border-width: 4px 0;min-height: 6px;}',

								'::-webkit-scrollbar-button:vertical:increment { background-image: url('+ down +');}',
								'::-webkit-scrollbar-button:vertical:decrement { background-image: url('+ up + ');}',
								'::-webkit-scrollbar-track-piece:vertical { background-image: url('+ mid +');}',
								'::-webkit-scrollbar-thumb:vertical{ -webkit-border-image: url('+ base.toDataURL() +') 4 0 4 0;}'
							].join('\n'));

							ScrollBar.complete = true;
						});
					});
				});
			}
		);
	};


	/**
	 * Export
	 */
	return ScrollBar;
});