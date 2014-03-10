/**
 * UI/Components/GrfViewer/History.js
 *
 * Intro Manager
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function()
{
	'use strict';


	/**
	 * @var {Array} cache history
	 */
	var _history = [];


	/**
	 * @var {number} position in history
	 */
	var _index = -1;


	/**
	 * @var {object} previous jquery button
	 */
	var _previous;


	/**
	 * @var {object} next jquery button
	 */
	var _next;


	/**
	 * Initialize history with buttons
	 *
	 * @param {object} previous jquery button
	 * @param {object} next jquery button
	 */
	function init( previous, next )
	{
		_previous = previous;
		_next     = next;

		_previous.removeClass('on');
		_next.removeClass('on');
	}


	/**
	 * Set a new link to cache
	 *
	 * @param {string} link
	 */
	function push( link )
	{
		_history.length = (++_index);
		_history.push( link );

		_next.removeClass('on');

		if (_history.length > 1) {
			_previous.addClass('on');
		}
	}


	/**
	 * Move forward in history
	 *
	 * @return {string} url
	 */
	function next()
	{
		if (_index + 1 >= _history.length) {
			return null;
		}

		_previous.addClass('on');
		if (_index + 1 >= _history.length) {
			_next.removeClass('on');
		}

		return _history[++_index];
	}


	/**
	 * Move back to history
	 *
	 * @return {string} url
	 */
	function previous()
	{
		if (_index - 1 < 0) {
			return null;
		}

		_next.addClass('on');
		if (_index - 2 < 0) {
			_previous.removeClass('on');
		}

		return _history[ --_index ];
	}


	/**
	 * Export
	 */
	return {
		push:     push,
		next:     next,
		previous: previous,
		init:     init
	};
});