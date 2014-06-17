/**
 * UI/Scrollbar.js
 *
 * Manage custom scrollbar
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define( ['Utils/jquery', 'Utils/Texture', 'DB/DBManager', 'Core/Client' ],
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
	ScrollBar.init = function Init()
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
			function( down, mid, up, base_down, base_mid, base_up ) {

				Texture.load( base_down, function(){
					var base_down = this;
					Texture.load( base_mid, function(){
						var base_mid = this;
						Texture.load( base_up, function(){
							var base_up = this;
							var base    = document.createElement('canvas');
							var ctx     = base.getContext('2d');
							base.width  = base_up.width;
							base.height = base_up.height + base_mid.height + base_down.height;

							ctx.drawImage( base_up, 0, 0);
							ctx.drawImage( base_mid, 0, base_up.height);
							ctx.drawImage( base_down, 0, base_up.height + base_mid.height );

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