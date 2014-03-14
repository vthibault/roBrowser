/**
 * Renderer/EntityManager.js
 *
 * Manage Entity 
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(['./Entity/Entity', './SpriteRenderer', 'Controls/MouseEventHandler', 'Controls/KeyEventHandler'],
function(         Entity,     SpriteRenderer,            Mouse,                        KEYS )
{
	'use strict';


	var _list = [];

	/**
	 * Find an Entity and return its index
	 *
	 * @param {number} gid
	 * @returns {number} position
	 */
	function getEntityIndex( gid )
	{
		var i, count = _list.length;
	
		for (i = 0; i < count; ++i) {
			if (_list[i].GID === gid) {
				return i;
			}
		}

		return -1;
	}


	/**
	 * Fetch all entities using a callback
	 *
	 * @param {function} callback
	 */
	function forEach( callback )
	{
		var i, count = _list.length;
	
		for (i = 0; i < count; ++i) {
			if (callback(_list[i]) === false) {
				return;
			}
		}
	}


	/**
	 * Find an Entity and return it
	 *
	 * @param {number} gid
	 * @returns {object} Entity
	 */
	function getEntity( gid )
	{
		var index = getEntityIndex(gid);
		if (index < 0) {
			return null;
		}

		return _list[index];
	}


	/**
	 * Add or replace entity
	 *
	 * @param {object} entity
	 * @return {object}
	 */
	function addEntity( entity )
	{
		var index = getEntityIndex( entity.GID );
		if (index < 0) {
			index = _list.push( entity ) - 1;
		}
		else {
			_list[index].set(entity);
		}

		return _list[index];
	}


	/**
	 * Clean up entities from list
	 */
	function free()
	{
		var count = _list.length;

		while (count--) {
			_list[0].clean();
			delete _list[0];   // better to clean directly ?
			_list.splice(0,1); // Don't erase the first one.
		}
	}


	/**
	 * Remove an entity
	 * @param {number} gid
	 */
	function removeEntity( gid )
	{
		var index = getEntityIndex( gid );

		if (index > -1) {
			_list[index].clean();
			_list.splice( index, 1 );
		}
	}


	/**
	 * @var {Entity} mouse over
	 */
	var _over = null;


	/**
	 * Return the entity the mouse is over
	 */
	function getOverEntity()
	{
		return _over;
	}


	/**
	 * Set over entity
	 */
	var _saveShift = false;
	function setOverEntity( target )
	{
		var current = _over;

		if (target === current && _saveShift === KEYS.SHIFT) {
			return;
		}

		_saveShift = KEYS.SHIFT;

		if (current) {
			current.onMouseOut();
		}

		if (target) {
			_over = target;
			target.onMouseOver();
		}
		else {
			_over = null;
		}
	}


	/**
	 * @var {Entity} target
	 */
	var _focus = null;


	/**
	 * Return the entity selected by the user
	 */
	function getFocusEntity()
	{
		return _focus;
	}


	/**
	 * Set over entity
	 * @param {Entity} entity
	 */
	function setFocusEntity( entity )
	{
		_focus = entity;
	}


	/**
	 * Sort entities by z-Index
	 *
	 * @param {Entity} a
	 * @param {Entity} b
	 */
	function sort(  a, b )
	{
		var aDepth = a.depth + (a.GID%100) / 1000;
		var bDepth = b.depth + (b.GID%100) / 1000;

		return bDepth - aDepth;
	}


	/**
	 * Sort entities by z-index and priorities
	 *
	 * @param {Entity} a
	 * @param {Entity} b
	 */
	function sortByPriority( a, b )
	{
		var aDepth = a.depth + (a.GID%100) / 1000;
		var bDepth = b.depth + (b.GID%100) / 1000;

		if (a.objecttype !== b.objecttype) {
			aDepth -= Entity.PickingPriority[a.objecttype] * 100;
			bDepth -= Entity.PickingPriority[b.objecttype] * 100;
		}

		return aDepth - bDepth;
	}


	/**
	 * Render all entities (picking or not)
	 *
	 * @param {object} gl webgl context
	 * @param {mat4} modelView
	 * @param {mat4} projection
	 * @param {object} fog structure
	 *
	 * Infos: RO Game doesn't seems to render ambiant and diffuse on Sprites
	 */
	function render( gl, modelView, projection, fog )
	{
		var i, count;
		var tick = Date.now();

		// Stop rendering if no units to render (should never happened...)
		if (!_list.length) {
			return;
		}

		_list.sort(sort);

		// Use program
		SpriteRenderer.bind3DContext( gl, modelView, projection, fog );

		// Rendering
		for (i = 0, count = _list.length; i < count; ++i) {
			// Remove from list
			if (_list[i].remove_tick && _list[i].remove_tick + _list[i].remove_delay < tick) {
				_list[i].clean();
				_list.splice(i, 1);
				i--;
				count--;
				continue;
			}

			_list[i].render( modelView, projection);
		}

		// Clean program
		SpriteRenderer.unbind( gl );
	}


	/**
	 * Intersect Entities
	 */
	function intersect()
	{
		var i, count;
		var entity;

		// Stop rendering if no units to render (should never happened...)
		if (!_list.length) {
			return;
		}

		_list.sort(sortByPriority);

		var x = Mouse.screen.x;
		var y = Mouse.screen.y;

		for (i = 0, count = _list.length; i < count; ++i) {
			entity = _list[i];

			// No picking on dead entites
			if ((entity.action !== entity.ACTION.DIE || entity.objecttype === Entity.TYPE_PC) && entity.remove_tick === 0) {
				if (x > entity.boundingRect.x1 &&
				    x < entity.boundingRect.x2 &&
				    y > entity.boundingRect.y1 &&
				    y < entity.boundingRect.y2) {
					return entity;
				}
			}
		}

		return null;
	}



	var EntityManager = {
		free:                 free,
		add:                  addEntity,
		remove:               removeEntity,
		get:                  getEntity,
		forEach:              forEach,

		getOverEntity:        getOverEntity,
		setOverEntity:        setOverEntity,
		getFocusEntity:       getFocusEntity,
		setFocusEntity:       setFocusEntity,

		render:               render,
		intersect:            intersect
	};


	/**
	 * Get access to manager from Entity object
	 */
	Entity.Manager = EntityManager;


	/**
	 * Export
	 */
	return EntityManager;
});