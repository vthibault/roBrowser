/**
 * Renderer/EntityManager.js
 *
 * Manage Entity 
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(['./Entity/Entity', './SpriteRenderer'],
function(         Entity,     SpriteRenderer )
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
	function SetOverEntity( entity )
	{
		_over = entity;
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
	 * Return entity by it's color
	 *
	 * @param {Array} color
	 * @return {Entity}
	 */
	function GetEntityByColor( color )
	{
		var index  = color[0] | color[1] << 8;
		return _list[index - 1];
	}


	/**
	 * Process the mouse over / out based on sent color
	 *
	 * @param {Array} color (rgba)
	 */
	function SetOverEntityByColor( color )
	{
		var target;
		var current = this.getOverEntity();

		// Flag to detect an entity
		if( color[2] === 0xff  ) {
			target = GetEntityByColor( color );

			if( current ) {
				if( current === target ) {
					return;
				}
				current.onMouseOut();
			}

			if( target ) {
				SetOverEntity( target );
				target.onMouseOver();
			}
		}

		// Well, not over an entity.
		else if( current ) {
			current.onMouseOut();
			SetOverEntity( null );
		}
	}


	/**
	 * Render all entities (picking or not)
	 *
	 * @param {object} gl webgl context
	 * @param {mat4} modelView
	 * @param {mat4} projection
	 * @param {boolean} picking - do we render picking ?
	 * @param {object} fog structure
	 *
	 * Infos: RO Game doesn't seems to render ambiant and diffuse on Sprites
	 */
	function Render( gl, modelView, projection, picking, fog )
	{
		var i, count, j = 0;
		var tick = Date.now();

		if( picking ) {
			_list.sort(function(a, b){
				return b.depth - a.depth;
			});
		}

		// Stop rendering if no units to render (should never happened...)
		if( !_list.length ) {
			return;
		}

		// Use program
		SpriteRenderer.bind3DContext( gl, modelView, projection, picking, fog );

		// Rendering
		for ( i = 0, count = _list.length; i < count; ++i ) {
			if( picking ) {
				j++;
			}

			// Remove from list
			if( _list[i].remove_tick && _list[i].remove_tick + _list[i].remove_delay < tick ) {
				_list[i].clean();
				_list.splice(i, 1);
				i--;
				count--;
				continue;
			}

			_list[i].render( modelView, projection, j);
		}

		// Clean program
		SpriteRenderer.unbind( gl );
	}



	var EntityManager = {
		free:   Free,
		add:    AddEntity,
		remove: RemoveEntity,
		get:    GetEntity,

		getOverEntity:        GetOverEntity,
		setOverEntity:        SetOverEntity,
		getFocusEntity:       GetFocusEntity,
		setFocusEntity:       SetFocusEntity,
		getEntityByColor:     GetEntityByColor,
		setOverEntityByColor: SetOverEntityByColor,

		render: Render
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