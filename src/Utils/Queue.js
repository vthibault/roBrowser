/**
 * Utils/Queue.js
 *
 * Queue System
 *
 * Helper to manage queue
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function()
{
	'use strict';


	/**
	 * Queue Constructor
	 *
	 */
	function Queue()
	{
		this.list = [];
	}


	/**
	 * Add function to queue
	 *
	 * @param {function} callback
	 */
	Queue.prototype.add = function Add(callback)
	{
		this.list.push(callback);
	};


	/**
	 * Continue the queue
	 */
	Queue.prototype._next = function _Next()
	{
		if (this.list.length) {
			this.list.shift().call(this);
		}
	};


	/**
	 * To avoid problem with constructor, define it
	 */
	Object.defineProperty( Queue.prototype, 'next', {
		get : function(){ return this._next.bind(this); }
	});


	/**
	 * Start running queue
	 */
	Queue.prototype.run = function Run()
	{
		this.next();
	};


	/**
	 * Export
	 */
	return Queue;
});