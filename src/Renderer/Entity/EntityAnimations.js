/**
 * Renderer/EntityAnimations.js
 *
 * Manage entity special animations
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(['Renderer/Renderer'], function( Renderer )
{
	'use strict';


	/**
	 * @Constructor
	 * @param {object} Entity
	 */
	function Animations(entity)
	{
		this.entity = entity;
		this.list   = [];
	}


	/**
	 * Add an animation to the list
	 *
	 * @param {function} callback
	 */
	Animations.prototype.add = function add(callback)
	{
		this.list.push({
			tick:     Renderer.tick,
			callback: callback
		});
	};


	/**
	 * Process events
	 */
	Animations.prototype.process = function process()
	{
		var i, count;

		for (i = 0, count = this.list.length; i < count; ++i) {
			if (this.list[i].callback(Renderer.tick - this.list[i].tick)) {
				this.list.splice(i, 1);
				i--;
				count--;
			}
		}
	};


	/**
	 * Clean up events
	 */
	Animations.prototype.free = function free()
	{
		this.list.length = 0;
	};


	return function init() {
		this.animations = new Animations(this);
	};
});