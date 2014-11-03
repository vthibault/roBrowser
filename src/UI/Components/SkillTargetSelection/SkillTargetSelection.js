/**
 * UI/Components/SkillTargetSelection/SkillTargetSelection.js
 *
 * Target selection screen when using skill
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function(require)
{
	'use strict';


	/**
	 * Dependencies
	 */
	var DB            = require('DB/DBManager');
	var SkillInfo     = require('DB/Skills/SkillInfo');
	var KEYS          = require('Controls/KeyEventHandler');
	var Mouse         = require('Controls/MouseEventHandler');
	var jQuery        = require('Utils/jquery');
	var Renderer      = require('Renderer/Renderer');
	var Entity        = require('Renderer/Entity/Entity');
	var EntityManager = require('Renderer/EntityManager');
	var Session       = require('Engine/SessionStorage');
	var Controls      = require('Preferences/Controls');
	var UIManager     = require('UI/UIManager');
	var UIComponent   = require('UI/UIComponent');
	var Cursor        = require('UI/CursorManager');


	/**
	 * Create Announce component
	 */
	var SkillTargetSelection = new UIComponent( 'SkillTargetSelection' );


	/**
	 * Mouse can cross this UI
	 */
	SkillTargetSelection.mouseMode = UIComponent.MouseMode.CROSS;


	/**
	 * @var {constant}
	 */
	SkillTargetSelection.TYPE = {
		ENEMY:   1,
		PLACE:   2,
		SELF:    4,
		FRIEND: 16,
		TRAP:   32,
		TARGET: 1|2|16|32,
		PET:    64
	};


	/**
	 * @var {number} target type (see constants)
	 */
	var _flag = 0;


	/**
	 * @var {Skill} skill structure
	 */
	var _skill;


	/**
	 * @var {CanvasElement} container for skill name
	 */
	var _skillName;


	/**
	 * @var {CanvasElement} container for desciption
	 */
	var _description;


	/**
	 * Initialize component
	 */
	SkillTargetSelection.init = function init()
	{
		_skillName   = document.createElement('canvas');
		_description = document.createElement('canvas');

		_skillName.style.position       = 'absolute';
		_skillName.style.top            = '45px';
		_skillName.style.zIndex         = 100;
		_skillName.style.borderRadius   = '3px';
		_skillName.style.border         = '1px solid #555';

		_description.style.position     = 'absolute';
		_description.style.bottom       = '60px';
		_description.style.zIndex       = 100;
		_description.style.borderRadius = '3px';
		_description.style.border       = '1px solid #555';

		render( DB.getMessage(234), _description);

		this.ui = jQuery('<div id ="SkillTargetSelection"/>'); // just to not break things
		this.ui.append();
	};


	/**
	 * Append to body
	 */
	SkillTargetSelection.onAppend = function onAppend()
	{
		var events;

		if (!_skillName.parentNode) {
			document.body.appendChild(_skillName);
		}

		if (!_description.parentNode) {
			document.body.appendChild(_description);
		}

		// Execute onKeyDown BEFORE the one executed by Escape window
		events = jQuery._data( window, 'events').keydown;
		events.unshift( events.pop() );

		// Execute before *request move* / *request attack*
		jQuery(window).one('mousedown.targetselection', intersectEntities);
		events = jQuery._data(window, 'events').mousedown;
		events.unshift( events.pop() );
	};


	/**
	 * Possible to exit using ESCAPE
	 */
	SkillTargetSelection.onKeyDown = function onKeyDown(event)
	{
		if (event.which === KEYS.ESCAPE) {
			this.remove();
			event.stopImmediatePropagation();
			return false;
		}

		return true;
	};


	/**
	 * Remove from body
	 */
	SkillTargetSelection.onRemove = function onRemove()
	{
		jQuery(window).off('mousedown.targetselection');

		Cursor.blockMagnetism = false;
		Cursor.freeze         = false;
		Cursor.setType(Cursor.ACTION.DEFAULT);

		if (_skillName.parentNode) {
			document.body.removeChild(_skillName);
		}

		if (_description.parentNode) {
			document.body.removeChild(_description);
		}
	};


	/**
	 * Set informations for the target
	 *
	 * @param {object} skill
	 * @param {number} skill type
	 * @param {string} description name (optional)
	 */
	SkillTargetSelection.set = function set( skill, target, description )
	{
		_flag = target;
		_skill  = skill;

		if (!_flag) {
			return;
		}

		if (_flag & (SkillTargetSelection.TYPE.PLACE|SkillTargetSelection.TYPE.TRAP)) {
			Cursor.blockMagnetism = true;
		}

		// Render skillName
		var sk = SkillInfo[ skill.SKID ];
		render(description || sk.SkillName, _skillName);

		Cursor.setType( Cursor.ACTION.TARGET);
		Cursor.freeze = true;
	};


	/**
	 * Render text into the canvas
	 *
	 * @param {string} text to render
	 * @param {CanvasElement} canvas node
	 */
	function render(text, canvas)
	{
		var fontSize = 12;
		var ctx      = canvas.getContext('2d');

		ctx.font      = fontSize + 'px Arial';
		canvas.width  = ctx.measureText(text).width + 7 * 2;
		canvas.height = 23;

		ctx.font      = fontSize + 'px Arial';
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'rgba(0,0,0,0.5)';
		ctx.fillRect( 0, 0, canvas.width, canvas.height);

		ctx.fillStyle = 'black';
		ctx.fillText( text, 8, 17);

		ctx.fillStyle = '#00FF00';
		ctx.fillText( text, 7, 16);

		canvas.style.left = ((Renderer.width - canvas.width) >> 1) + 'px';
	}


	/**
	 * Intersect entity when clicking
	 */
	function intersectEntities(event)
	{
		SkillTargetSelection.remove();

		if (!Mouse.intersect) {
			return false;
		}

		// Only left click
		if (event.which !== 1) {
			return true;
		}

		event.stopImmediatePropagation();

		// Zone skill
		if (_flag & (SkillTargetSelection.TYPE.PLACE|SkillTargetSelection.TYPE.TRAP)) {
			SkillTargetSelection.onUseSkillToPos(_skill.SKID, _skill.level, Mouse.world.x, Mouse.world.y);
			return false;
		}

		// Get entity
		var entity = EntityManager.getOverEntity();

		if (!entity) {
			return false;
		}

		intersectEntity(entity);
		return false;
	}


	/**
	 * Intersect with an entity
	 *
	 * @param {object} entity
	 */
	function intersectEntity(entity)
	{
		var target = 0;

		// Get target type
		switch (entity.objecttype) {
			case Entity.TYPE_MOB:
				target = SkillTargetSelection.TYPE.ENEMY | SkillTargetSelection.TYPE.PET;
				break;

			case Entity.TYPE_PC:
			case Entity.TYPE_HOM:
			case Entity.TYPE_MERC:
			case Entity.TYPE_ELEM:
				target = SkillTargetSelection.TYPE.FRIEND;
				break;

			// Can't use skill on this type
			// (warp, npc, items, effects...)
			default:
				return;
		}

		// This skill can't be casted on this type
		if (!(target & _flag) && !KEYS.SHIFT && !Controls.noshift) {
			return;
		}

		// Pet capture
		if (_flag === SkillTargetSelection.TYPE.PET) {
			SkillTargetSelection.onPetSelected(entity.GID);
			return;
		}

		// Can't cast evil skill on your self
		if ((_flag & SkillTargetSelection.TYPE.ENEMY) && entity === Session.Entity) {
			return;
		}

		// Cast skill
		SkillTargetSelection.onUseSkillToId(_skill.SKID, _skill.level, entity.GID);
		return;
	}


	/**
	 * Intersect with an entity ID
	 * (used in party UI)
	 */
	SkillTargetSelection.intersectEntityId = function intersectEntityId(id)
	{
		var entity = EntityManager.get(id);
		if (entity) {
			intersectEntity(entity);
		}
	};



	/**
	 * Functions to define
	 */
	SkillTargetSelection.onUseSkillToId = function onUseSkillToId(/*id, level, GID*/){};
	SkillTargetSelection.onUseSkillToPos = function onUseSkillToId(/*id, level, x, y*/){};


	/**
	 * Create component and return it
	 */
	return UIManager.addComponent(SkillTargetSelection);
});
