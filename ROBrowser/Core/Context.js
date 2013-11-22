/**
 * Core/Context.js
 *
 * Application Context
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function()
{
	"use strict";


	var Context = {};


	/**
	 * Get Informations about current Context
	 */
	Context.Is = {
		APP:   !!(window.chrome && chrome.app && chrome.app.window),
		POPUP: !!(window.opener),
		FRAME:    window.top !== window.self
	};


	/**
	 * Check if roBrowser is in FullScreen
	 * @returns {boolean} is in fullscreen
	 */
	Context.isFullScreen = function IsFullScreen()
	{
		return (
			document.fullscreenElement ||
			document.mozFullScreenElement ||
			document.webkitFullscreenElement ||
			( Context.Is.APP && chrome.app.window.current().isFullscreen() )
		);
	};


	/**
	 * Try to launch roBrowser in Full Screen
	 */
	Context.requestFullScreen = function RequestFullScreen()
	{
		if( Context.Is.APP ) {
			chrome.app.window.current().fullscreen();
			return;
		}

		if( !Context.isFullScreen() ) {
			var element = document.documentElement;

			if( element.requestFullscreen) {
				element.requestFullscreen();
			}
			else if( element.mozRequestFullScreen ) {
				element.mozRequestFullScreen();
			}
			else if( element.webkitRequestFullscreen ) {
				element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		}
	};


	/**
	 * Try to cancel roBrowser full screen
	 */
	Context.cancelFullScreen = function CancelFullScreen()
	{
		if( Context.Is.APP ) {
			chrome.app.window.current().restore();
			return;
		}

		if( document.cancelFullScreen ) {
			document.cancelFullScreen();
		}
		else if( document.mozCancelFullScreen ) {
			document.mozCancelFullScreen();
		}
		else if(document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	};


	/**
	 * Export
	 */
	return Context;
});