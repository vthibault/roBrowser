/**
 * Renderer/Effects.js
 *
 * Effects Manager
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function()
{
	'use strict';


	/**
	 * @var {object} saved webgl context
	 */
	var _gl;


	/**
	 * @var {object} effect listing
	 */
	var _list = {};


	/**
	 * @var {object} Effects namespace
	 */
	var Effects = {};


	/**
	 * Initialize effects manager
	 */
	Effects.init = function init(gl)
	{
		_gl = gl;
	};


	/**
	 * Add effect to the render list
	 *
	 * @param {function} effect
	 * @param {mixed} effect unique id
	 */
	Effects.add = function add(effect, uid)
	{
		var name   = effect.constructor.name;

		if (!(name in _list)) {
			_list[name] = [];

			if (effect.constructor.init) {
				effect.constructor.init(_gl);
			}
		}

		if (effect.init) {
			effect.init(_gl);
		}

		effect._uid = uid;
		_list[name].push(effect);
	};


	/**
	 * Remove an effect
	 *
	 * @param {effect} TODO
	 * @param {mixed} effect unique id
	 */
	Effects.remove = function remove(effect, uid)
	{
		if (!(effect.name in _list)) {
			return;
		}

		var list = _list[effect.name];
		var i, count = list.length;

		for (i = 0; i < count; ++i) {
			if (list[i]._uid === uid) {
				if (list[i].free) {
					list[i].free(_gl);
				}
				list.splice(i, 1);
				i--;
				count--;
			}
		}

		if (!count) {
			if (effect.free) {
				effect.free(_gl);
			}
			delete _list[effect.name];
		}
	};


	/**
	 * Destroy all effects
	 */
	Effects.free = function free( gl )
	{
		var keys = Object.keys(_list);
		var i, j, size, count;
		var list, constructor;

		for (i = 0, count = keys.length; i < count; ++i) {
			list        = _list[ keys[i] ];
			constructor = list[0].constructor;

			for (j = 0, size = list.length; j < size; ++j) {
				if (list[j].free) {
					list[j].free(gl);
				}
			}

			if (constructor.free) {
				constructor.free(gl);
			}

			delete _list[ keys[i] ];
		}
	};


	/**
	 * Renderering all effects
	 *
	 * @param {object} webgl context
	 * @param {mat4} modelView matrix
	 * @param {mat4} projection matrix
	 * @param {mat3} normal matrix
	 * @param {object} fog structure
	 * @param {object} light structure
	 * @param {number} game tick
	 */
	Effects.render = function render(gl, modelView, projection, fog, tick)
	{
		var keys = Object.keys(_list);
		var i, count = keys.length;
		var j, size;
		var list, constructor;

		for (i = 0; i < count; ++i) {
			list        = _list[ keys[i] ];

			if (!list.length) {
				delete _list[ keys[i] ];
				continue;
			}

			constructor = list[0].constructor;

			if (constructor.ready) {
				constructor.beforeRender(gl, modelView, projection, fog, tick);

				for (j = 0, size = list.length; j < size; ++j) {
					if (list[j].ready) {
						list[j].render(gl, tick);
					}

					if (list[j].needCleanUp) {
						list[j].free(gl);
						list.splice( j, 1);
						j--;
						size--;
					} 
				}

				constructor.afterRender(gl);

				if (size === 0) {
					constructor.free(gl);
					delete _list[keys[i]];
				}
			}
		}
	};


	/**
	 * Export
	 */
	return Effects;
});