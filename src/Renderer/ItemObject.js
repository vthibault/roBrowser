/**
 * Renderer/ItemObject.js
 *
 * Manage Items in ground
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(['DB/DBManager', './EntityManager', './Entity/Entity', 'Renderer/Map/Altitude'],
function(   DB,            EntityManager,            Entity,                Altitude)
{
	'use strict';


	/**
	 * Find an Entity and return its index
	 *
	 * @param {number} gid
	 * @param {number} itemid
	 * @param {boolean} identify
	 * @param {number} count
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 */
	function add( gid, itemid, identify, count, x, y, z )
	{
		var it     = DB.getItemInfo(itemid);
		var path   = DB.getItemPath(itemid, identify);
		var entity = new Entity();
		var name   = identify ? it.identifiedDisplayName : it.unidentifiedDisplayName;

		entity.GID          = gid;
		entity.objecttype   = Entity.TYPE_ITEM;
		entity.position[0]  = x;
		entity.position[1]  = y;
		entity.position[2]  = z;

		entity.display.load = entity.display.TYPE.COMPLETE;
		entity.display.name = DB.getMessage(183).replace('%s', name).replace('%d', count);
		entity.display.update('#FFEF94');

		entity.files.body.spr = path + '.spr';
		entity.files.body.act = path + '.act';

		entity.files.shadow.size = 0.25;

		// Item falling
		entity.animations.add(function(tick) {
			var level          = Altitude.getCellHeight(entity.position[0], entity.position[1]);
			entity.position[2] = Math.max(level, z - (tick / 40));

			return entity.position[2] === level;
		});


		EntityManager.add(entity);
	}


	/**
	 * Remove an object from ground
	 *
	 * @param {number} gid
	 */
	function remove( gid )
	{
		EntityManager.remove(gid);
	}


	/**
	 * Export
	 */
	return {
		add:    add,
		remove: remove
	};
});