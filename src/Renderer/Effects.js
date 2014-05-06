/**
 * Renderer/Effects.js
 *
 * Effects Manager
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function( require )
{
	'use strict';


	/**
	 * Load dependencies
	 */
	var EffectDB      = require('DB/EffectList');
	var SkillEffect   = require('DB/SkillEffectList');
	var SkillUnit     = require('DB/SkillUnit');
	var Cylinder      = require('Renderer/Effects/Cylinder');
	var StrEffect     = require('Renderer/Effects/StrEffect');
	var SpriteEffect  = require('Renderer/Effects/SpriteEffect');
	var EntityManager = require('Renderer/EntityManager');
	var Renderer      = require('Renderer/Renderer');
	var Altitude      = require('Renderer/Map/Altitude');
	var Sound         = require('Audio/SoundManager');
	var Preferences   = require('Preferences/Map');


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
	 * @param {boolean} persistent
	 */
	Effects.add = function add(effect, uid, persistent)
	{
		var name   = effect.constructor.name;

		if (!(name in _list)) {
			_list[name] = [];

			if (effect.constructor.init) {
				effect.constructor.init(_gl);
			}

			if (!effect.constructor.renderBeforeEntities) {
				effect.constructor.renderBeforeEntities = false;
			}
		}

		if (effect.init) {
			effect.init(_gl);
		}

		effect._uid        = uid;
		effect._persistent = !!persistent;

		_list[name].push(effect);
	};


	/**
	 * Remove an effect
	 *
	 * @param {effect}
	 * @param {mixed} effect unique id
	 */
	Effects.remove = function removeClosure()
	{
		function clean(name, uid) {
			var list;
			var i, count;

			list  = _list[name];
			count = list.length;

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
				//if (effect.free) {
				//	effect.free(_gl);
				//}
				delete _list[name];
			}
		}

		return function remove(effect, uid)
		{
			if (!effect) {
				var i, count;
				var keys = Object.keys(_list);

				for (i = 0, count = keys.length; i < count; ++i) {
					clean( keys[i], uid);
				}

				return;
			}

			if (effect.name in _list) {
				clean( effect.name, uid);
			}
		};
	}();


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
	 * @param {boolean} render before entities ?
	 */
	Effects.render = function render(gl, modelView, projection, fog, tick, renderBeforeEntities )
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

			// Will be render after/before.
			if (constructor.renderBeforeEntities !== renderBeforeEntities) {
				continue;
			}

			if (constructor.ready) {
				constructor.beforeRender(gl, modelView, projection, fog, tick);

				for (j = 0, size = list.length; j < size; ++j) {
					if (list[j].ready) {
						list[j].render(gl, tick);
					}

					if (list[j].needCleanUp) {
						if (list[j]._persistent) {
							list[j].startTick   = tick;
							list[j].needCleanUp = false;
							continue;
						}

						if (list[j].free) {
							list[j].free(gl);
						}
						list.splice( j, 1);
						j--;
						size--;
					} 
				}

				constructor.afterRender(gl);

				if (size === 0) {
					if (constructor.free) {
						constructor.free(gl);
					}
					delete _list[keys[i]];
				}
			}
		}
	};


	/**
	 * Spam an effect to the scene
	 *
	 * @param {number} effect id
	 * @param {number} owner aid
	 * @param {Array} position
	 * @param {number} tick
	 */
	Effects.spam = function spam( effectId, AID, position, tick )
	{
		var effects, effect, entity;
		var i, count, pos;

		// No effect mode (/effect)
		if (!Preferences.effect) {
			return;
		}

		// Not found
		if (!(effectId in EffectDB)) {
			return;
		}

		entity  = EntityManager.get(AID);
		effects = EffectDB[effectId];

		// No position to work with
		if (!position && !entity) {
			return;
		}

		for (i = 0, count = effects.length; i < count; ++i) {
			effect = effects[i];

			switch (effect.type) {
				case 'SPR':
					Effects.spamSPR( effect, AID, position, tick );
					break;

				case 'STR':
					Effects.spamSTR( effect, AID, position, tick );
					break;

				case 'FUNC':
					break;

				case 'CYLINDER':
					if (entity) {
						Effects.add(new Cylinder( entity, effect.topSize, effect.bottomSize, effect.height, effect.textureName, tick), AID);
					}
					break;
			}
		}
	};


	/**
	 * Spam an effect to the scene
	 *
	 * @param {object} effect
	 * @param {number} owner aid
	 * @param {Array} position
	 * @param {number} tick
	 */
	Effects.spamSTR = function spamSTR( effect, AID, position, tick )
	{
		var filename, entity;

		if (!position) {
			entity = EntityManager.get(AID);

			if (!entity) {
				return;
			}

			// Get reference
			if (effect.attachedEntity) {
				position = entity.position;
			}

			// copy
			else {
				position    = new Array(3);
				position[0] = entity.position[0];
				position[1] = entity.position[1];
				position[2] = entity.position[2];
			}
		}

		// Get STR file
		if (Preferences.mineffect && effect.min) {
			filename = effect.min;
		}
		else {
			filename = effect.file;
		}

		// Randomize STR file name
		if (effect.rand) {
			filename = filename.replace('%d', Math.round(effect.rand[0] + (effect.rand[1]-effect.rand[0]) * Math.random()) );
		}

		// Play sound
		if (effect.wav) {
			Sound.play(effect.wav + '.wav');
		}

		// Start effect
		Effects.add(new StrEffect('data/texture/effect/' + filename + '.str', position, tick || Renderer.tick), AID );
	};


	/**
	 * Spam an effect to the scene
	 *
	 * @param {object} effect
	 * @param {number} owner aid
	 * @param {Array} position
	 * @param {number} tick
	 */
	Effects.spamSPR = function spamSPR( effect, AID, position, tick )
	{
		var entity;

		// Play sound
		if (effect.wav) {
			Sound.play(effect.wav + '.wav');
		}

		if (!position) {
			entity = EntityManager.get(AID);

			if (!entity) {
				return;
			}

			// Get reference
			if (effect.attachedEntity) {
				position = entity.position;
			}

			// copy
			else {
				position    = new Array(3);
				position[0] = entity.position[0];
				position[1] = entity.position[1];
				position[2] = entity.position[2];
			}
		}

		// Zone effect
		if (!effect.attachedEntity) {
			Effects.add(new SpriteEffect({
				file:        effect.file,
				head:      !!effect.head,
				direction: !!effect.direction,
				position:    position,
				tick:        Renderer.tick
			}));
			return;
		}

		// Sprite effect
		entity.attachments.add({
			file:        effect.file,
			head:      !!effect.head,
			direction: !!effect.direction,
			position:    position
		});
	};


	/**
	 * Spam effect on ground
	 *
	 * @param {number} unit id
	 * @param {number} position x
	 * @param {number} position y
	 * @param {number} skill unique id
	 */
	Effects.spamSkillZone = function spamUnit( unit_id, xPos, yPos, uid )
	{
		// No effect mode (/effect)
		if (!Preferences.effect) {
			return;
		}

		var skillId, effectId;
		var filename, effect, skill, pos;

		if (!(unit_id in SkillUnit)) {
			return;
		}

		skillId = SkillUnit[unit_id];

		if (!(skillId in SkillEffect)) {
			return;
		}

		skill = SkillEffect[skillId];

		if (!skill.groundEffectId) {
			return;
		}

		effectId = skill.groundEffectId;

		if (!(effectId in EffectDB)) {
			return;
		}

		effect   = EffectDB[effectId];
		pos      = [ xPos, yPos, Altitude.getCellHeight( xPos, yPos) ];
		filename = (Preferences.mineffect && effect.str_min) || effect.str;

		if (filename) {
			if (effect.random) {
				filename = filename.replace('%d', Math.round(effect.random[0] + (effect.random[1]-effect.random[0]) * Math.random()) );
			}

			Effects.add(new StrEffect('data/texture/effect/' + filename + '.str', pos, Renderer.tick), uid, true );
		}

		if (effect.wav) {
			Sound.play(effect.wav + '.wav');
		}
	};


	/**
	 * Spam a skill on a target
	 *
	 * @param {number} skill id
	 * @param {number} target aid
	 * @param {Array} position
	 * @param {number} tick
	 */
	Effects.spamSkill = function spamSkill( skillId, AID, position, tick )
	{
		if (!(skillId in SkillEffect)) {
			return;
		}

		Effects.spam( SkillEffect[skillId].effectId, AID, position, tick);
	};


	/**
	 * Spam skill hit
	 *
	 * @param {number} skill id
	 * @param {number} target aid
	 * @param {number} tick
	 */
	Effects.spamSkillHit = function spamSkillHit( skillId, AID, tick)
	{
		if (!(skillId in SkillEffect)) {
			return;
		}

		if (SkillEffect[skillId].hitEffectId) {
			Effects.spam( SkillEffect[skillId].hitEffectId, AID, null, tick);
		}
	};


	/**
	 * Export
	 */
	return Effects;
});