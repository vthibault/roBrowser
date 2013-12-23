/**
 * Renderer/EntityManager.js
 *
 * Manage Entity 
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(['./Entity/Entity', './SpriteRenderer', 'Controls/MouseEventHandler'],
function(         Entity,     SpriteRenderer,            Mouse )
{
	"use strict";


	var _list = [];

	/**
	 * Find an Entity and return its index
	 *
	 * @param {number} gid
	 * @returns {number} position
	 */
	function GetEntityIndex( gid )
	{
		var i, count = _list.length;
	
		for ( i=0; i<count; ++i ) {
			if ( _list[i].GID === gid ) {
				return i;
			}
		}
		return -1;
	}


	/**
	 * Find an Entity and return it
	 *
	 * @param {number} gid
	 * @returns {object} Entity
	 */
	function GetEntity( gid )
	{
		var index = GetEntityIndex(gid);
		if( index < 0 ) {
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
	function AddEntity( entity )
	{
		var index = GetEntityIndex( entity.GID );
		if( index < 0 ) {
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
	function Free()
	{
		var count = _list.length;
		while( count--) {
			_list[0].clean();
			delete _list[0];   // better to clean directly ?
			_list.splice(0,1); // Don't erase the first one.
		}
	}


	/**
	 * Remove an entity
	 * @param {number} gid
	 */
	function RemoveEntity( gid )
	{
		var index = GetEntityIndex( gid );
		if ( index > -1 ) {
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
	function GetOverEntity()
	{
		return _over;
	}


	/**
	 * Set over entity
	 */
	function SetOverEntity( target )
	{
		var target;
		var current = this.getOverEntity();

		if( target === current ) {
			return;
		}

		if( current ) {
			current.onMouseOut();
		}

		if( target ) {
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
	function GetFocusEntity()
	{
		return _focus;
	}


	/**
	 * Set over entity
	 * @param {Entity} entity
	 */
	function SetFocusEntity( entity )
	{
		_focus = entity;
	}


	/**
	 * Sort entities by z-Index
	 *
	 * @param {Entity} a
	 * @param {Entity} b
	 */
	function Sort( a, b )
	{
		var aDepth = a.depth + (a.GID%100) / 1000;
		var bDepth = b.depth + (b.GID%100) / 1000;

		return bDepth - aDepth;
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
	function Render( gl, modelView, projection, fog )
	{
		var i, count;
		var tick = Date.now();

		// Stop rendering if no units to render (should never happened...)
		if( !_list.length ) {
			return;
		}

		_list.sort(Sort);

		// Use program
		SpriteRenderer.bind3DContext( gl, modelView, projection, fog );

		// Rendering
		for ( i = 0, count = _list.length; i < count; ++i ) {
			// Remove from list
			if( _list[i].remove_tick && _list[i].remove_tick + _list[i].remove_delay < tick ) {
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
	 * Sort entities by z-index and priorities
	 *
	 * @param {Entity} a
	 * @param {Entity} b
	 */
	function SortByPriority( a, b )
	{
		var aDepth = a.depth + (a.GID%100) / 1000;
		var bDepth = b.depth + (b.GID%100) / 1000;

		if( a.objecttype !== b.objecttype ) {
			aDepth -= Entity.PickingPriority[a.objecttype] * 100;
			bDepth -= Entity.PickingPriority[b.objecttype] * 100;
		}

		return aDepth - bDepth;
	}


	/**
	 * Intersect Entities
	 *
	 * @param {mat4} modelView
	 * @param {mat4} projection
	 */
	function Intersect( modelView, projection )
	{
		var i, count;
		var entity;

		// Stop rendering if no units to render (should never happened...)
		if( !_list.length ) {
			return;
		}

		_list.sort(SortByPriority);

		var x = Mouse.screen.x;
		var y = Mouse.screen.y;

		for ( i = 0, count = _list.length; i < count; ++i ) {
			entity = _list[i];

			// No picking on dead entites
			if ( (entity.action !== entity.ACTION.DIE || entity.objecttype === Entity.TYPE_PC) && entity.remove_tick === 0 ) {
				if( x > entity.boundingRect.x1
				 && x < entity.boundingRect.x2
				 && y > entity.boundingRect.y1
				 && y < entity.boundingRect.y2
				) {
					return entity;
				}
			}
		}

		return null;
	}



	var EntityManager = {
		free:                 Free,
		add:                  AddEntity,
		remove:               RemoveEntity,
		get:                  GetEntity,

		getOverEntity:        GetOverEntity,
		setOverEntity:        SetOverEntity,
		getFocusEntity:       GetFocusEntity,
		setFocusEntity:       SetFocusEntity,

		render:               Render,
		intersect:            Intersect
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