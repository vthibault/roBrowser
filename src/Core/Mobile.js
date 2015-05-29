/**
 * Core/Mobile.js
 *
 * Help to handle touch devices
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
// TODO: resize event on mobile keyboard bug
// TODO: body overflow
// TODO: responsive design
define(function( require )
{
	'use strict';


	/**
	 * Import dependencies
	 */
	var jQuery    = require('Utils/jquery');
	var Context   = require('Core/Context');
	var Events    = require('Core/Events');
	var Camera    = require('Renderer/Camera');
	var Mouse     = require('Controls/MouseEventHandler');
	var KEYS      = require('Controls/KeyEventHandler');


	/**
	 * @namespace Mobile
	 */
	var Mobile = {};


	/**
	 * @var {boolean} is doing a gesture ?
	 */
	var _processGesture = false;


	/**
	 * @var {number} save angle and scale value
	 */
	var _scale, _angle, _touches, _intersect;


	/**
	 * Timer to detect delayed click
	 */
	var _timer = -1;


	/**
	 * Initialize
	 */
	Mobile.init = function init()
	{
	};


	/**
	 * Remove autofocus on mobile.
	 * Let the user decide to focus an input/textarea by himself
	 */
	var remoteAutoFocus = (function removeAutoFocusClosure()
	{
		var _done = false;

		return function removeAutoFocus() {
			if (_done) {
				return;
			}

			jQuery.fn.focus  = function() {};
			jQuery.fn.select = function() {};
			_done            = true;
		};
	})();


	/**
	 * Return distance between touches
	 *
	 * @param {TouchList} touches
	 * @return {number} distance
	 */
	function touchDistance(touches)
	{
		var x = touches[0].pageX - touches[1].pageX;
		var y = touches[0].pageY - touches[1].pageY;

		return Math.sqrt(x*x + y*y);
	}


	/**
	 * Get angle from touches
	 *
	 * @param {TouchList} touches
	 * @return {number} rotation angle
	 */
	function touchAngle(touches)
	{
		var x = touches[0].pageX - touches[1].pageX;
		var y = touches[0].pageY - touches[1].pageY;

		return Math.atan2(y, x) * 180 / Math.PI;
	}


	/**
	 * Get translation size (width)
	 *
	 * @param {TouchList} old touches
	 * @param {TouchList} new touches
	 */
	function touchTranslationX(oldTouches, touches)
	{
		var x1 = touches[0].pageX - oldTouches[0].pageX;
		var x2 = touches[1].pageX - oldTouches[1].pageX;

		if ((x1 && x2) &&                // need a direction
		   ((x1 < 0) === (x2 < 0)) &&    // same direction
		   (Math.abs(1-(x1/x2)) < 0.25)  // need a coordinate movement
		) {
			return (x1 + x2) >> 1;
		}

		return 0;
	}


	/**
	 * Get translation size (height)
	 *
	 * @param {TouchList} old touches
	 * @param {TouchList} new touches
	 */
	function touchTranslationY(oldTouches, touches)
	{
		var y1 = touches[0].pageY - oldTouches[0].pageY;
		var y2 = touches[1].pageY - oldTouches[1].pageY;

		if ((y1 && y2) &&                // need a direction
		   ((y1 < 0) === (y2 < 0)) &&    // same direction
		   (Math.abs(1-(y1/y2)) < 0.25)  // need a coordinate movement
		) {
			return (y1 + y2) >> 1;
		}

		return 0;
	}


	/**
	 * Start touching the screen
	 * Process gesture, or action
	 */
	var onTouchStart = function onTouchStartClosure()
	{
		function delayedClick() {
			// Only process mousedown if not doing a gesture
			if (!_processGesture) {
				_timer = -1;

				if (Mobile.onTouchStart) {
					Mobile.onTouchStart();
				}

				if (!_intersect) {
					if (Mobile.onTouchEnd) {
						Mobile.onTouchEnd();
					}
				}

				Mouse.intersect = _intersect;
			}
		}

		return function onTouchStart(event)
		{
			remoteAutoFocus();
			_touches = event.originalEvent.touches;
			event.stopImmediatePropagation();

			// Delayed click (to detect gesture)
			if (_timer > -1) {
				Events.clearTimeout(_timer);
				_timer = -1;
			}

			// Gesture
			if (_touches.length > 1) {
				_scale          = touchDistance(_touches);
				_angle          = touchAngle(_touches);
				_processGesture = true;
				return false;
			}

			Mouse.screen.x  = _touches[0].pageX;
			Mouse.screen.y  = _touches[0].pageY;
			Mouse.intersect = true;
			_intersect      = true;

			_timer = Events.setTimeout( delayedClick, 200);
			return false;
		};
	}();


	/**
	 * Hook touch end to know when a gesture end
	 * process OnMouseUp if no gesture detected
	 */
	function onTouchEnd(event)
	{
		if (_processGesture) {
			_processGesture = false;
			KEYS.SHIFT      = false;
			Camera.rotate(false);
			return;
		}

		if (_timer > -1) {
			_intersect = false;
			return;
		}

		if (Mobile.onTouchEnd) {
			Mobile.onTouchEnd();
		}

		Mouse.intersect = false;
	}


	/**
	 * Process gesture (scale, rotate)
	 * Else move.
	 */
	function onTouchMove(event)
	{
		event.stopImmediatePropagation();

		var touches = event.originalEvent.touches;

		Mouse.screen.x = touches[0].pageX;
		Mouse.screen.y = touches[0].pageY;

		// Not in gesture, just process
		if (!_processGesture) {
			return;
		}

		var scale = touchDistance(touches) - _scale;
		//var angle = touchAngle(touches) / _angle;
		var x     = Math.abs(touchTranslationX(_touches, touches));
		var y     = Math.abs(touchTranslationY(_touches, touches));

		if (!Camera.action.active && (x > 10 || y > 10)) {
			KEYS.SHIFT = (y > x);
			Camera.rotate(true);
			return;
		}

		// Process zoom
		if (Math.abs(scale) > 10) {
			Camera.zoomFinal += scale * 0.1;
			Camera.zoomFinal = Math.min( Camera.zoomFinal, Math.abs(Camera.altitudeTo-Camera.altitudeFrom) * Camera.MAX_ZOOM );
			Camera.zoomFinal = Math.max( Camera.zoomFinal,  2.0 );
		}
	}


	// Add full screen on mobile (sux to have the browser title bar)
	if (Math.max(screen.availHeight,screen.availWidth) <= 800) {
		// Mobile app (in future ?)
		if (Context.Is.APP) {
			Context.requestFullScreen();
		}
		// Fullscreen on action
		else {
			jQuery(window).on('touchstart', function(){
				if (!Context.isFullScreen()) {
					Context.requestFullScreen();
				}
			});
		}
	}


	// Touch controls
	jQuery(window)
		.on('touchstart', onTouchStart)
		.on('touchend',   onTouchEnd)
		.on('touchmove',  onTouchMove);


	/**
	 * Exports
	 */
	return Mobile;
});