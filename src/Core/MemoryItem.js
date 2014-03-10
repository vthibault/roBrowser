/**
 * Core/MemoryItem.js
 *
 * Cache Item into memory
 * Used to manage each object in cache, manage callbacks etc.
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function()
{
	'use strict';


	/**
	 * Object stored in cache
	 * @var MemoryItem
	 */
	function MemoryItem( onload, onerror )
	{
		// Private variables
		this._onload  = [];
		this._onerror = [];

		// Store callback
		// One cache item can have multple callback.
		if (onload) {
			this.addEventListener('load', onload);
		}

		if (onerror) {
			this.addEventListener('error', onerror);
		}
	}


	/**
	 * Data of the cached Item
	 * @var mixed
	 */
	MemoryItem.prototype._data  = null;


	/**
	 * Error informatio,
	 * @var {string}
	 */
	MemoryItem.prototype._error = '';


	/**
	 * Is the item loaded ?
	 * @var boolean complete
	 */
	MemoryItem.prototype.complete = false;


	/**
	 * Save the last time the item was called from cache
	 * Is used to remove old item from cache
	 * @var integer lastTimeUsed
	 */
	MemoryItem.prototype.lastTimeUsed = 0;


	/**
	 * Get data from Item
	 *
	 * @return mixed
	 */
	Object.defineProperty( MemoryItem.prototype, 'data', {
		get : function(){
			this.lastTimeUsed = Date.now();
			return this._data;
		}
	});


	/**
	 * Once the item in cache is load, execute all callback
	 *
	 * @param mixed data
	 */
	MemoryItem.prototype.addEventListener = function addEventListener( event, callback )
	{
		if (!(callback instanceof Function)) {
			throw new Error('MemoryItem::addEventListener() - callback must be a function !');
		}

		switch (event.toLowerCase()) {
			case 'load':
				if (this.complete) {
					if (this._data) {
						callback(this._data);
					}
					return;
				}

				this._onload.push(callback);
				break;

			case 'error':
				if (this.complete) {
					if (this._error) {
						callback(this._error);
					}
					return;
				}

				this._onerror.push(callback);
				break;

			default:
				throw new Error('MemoryItem::addEventListener() - Invalid event "'+ event +'" used.');
		}
	};


	/**
	 * Once the item in cache is load, execute all callback
	 *
	 * @param {mixed} data
	 */
	MemoryItem.prototype.onload = function onLoad( data )
	{
		var i, size;

		this._data        = data;
		this.complete     = true;
		this.lastTimeUsed = Date.now();

		for (i = 0, size = this._onload.length; i < size; ++i) {
			this._onload[i]( data );
		}

		this._onload.length  = 0;
		this._onerror.length = 0;
	};


	/**
	 * When an error occured with the item
	 *
	 * @param {string} error - optional
	 */
	MemoryItem.prototype.onerror = function OnError( error )
	{
		var i, size;

		this._error       = error;
		this.complete     = true;
		this.lastTimeUsed = Date.now();

		for (i = 0, size = this._onerror.length; i < size; ++i) {
			this._onerror[i]( error );
		}

		this._onload.length  = 0;
		this._onerror.length = 0;
	};


	/**
	 * Export
	 */
	return MemoryItem;

});