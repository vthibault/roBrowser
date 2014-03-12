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
	var SkillInfo     = require('DB/SkillInfo');
	var KEYS          = require('Controls/KeyEventHandler');
	var Mouse         = require('Controls/MouseEventHandler');
	var jQuery        = require('Utils/jquery');
	var Renderer      = require('Renderer/Renderer');
	var Entity        = require('Renderer/Entity/Entity');
	var EntityManager = require('Renderer/EntityManager');
	var UIManager     = require('UI/UIManager');
	var UIComponent   = require('UI/UIComponent');
	var Cursor        = require('UI/CursorManager');


	/**
	 * Create Announce component
	 */
	var SkillTargetSelection = new UIComponent( 'SkillTargetSelection' );


	/**
	 * @var {constant}
	 */
	SkillTargetSelection.TYPE = {
		ENEMY:   1,
		PLACE:   2,
		SELF:    4,
		FRIEND: 16,
		TRAP:   32,
		TARGET: 1|2|16|32
	};


	/**
	 * @var {number} target type (see constants)
	 */
	var _target = 0;


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
		_skillName.style.border         = "1px solid #555";

		_description.style.position     = 'absolute';
		_description.style.bottom       = '60px';
		_description.style.zIndex       = 100;
		_description.style.borderRadius = '3px';
		_description.style.border       = "1px solid #555";

		render( DB.msgstringtable[234], _description);

		this.ui = jQuery('<div id ="SkillTargetSelection"/>'); // just to not break things
		this.ui.append()
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
		jQuery(Renderer.canvas).one('mousedown.targetselection', intersectEntity);
		events = jQuery._data(Renderer.canvas, 'events').mousedown;
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
		jQuery(Renderer.canvas).off('mousedown.targetselection');

		Cursor.freeze = false;
		Cursor.setType(Cursor.ACTION.DEFAULT);

		if (_skillName.parentNode) {
			document.body.removeChild(_skillName);
		}

		if (_description.parentNode) {
			document.body.removeChild(_description);
		}
	};


	/**
	 * Add an announce with text and color
	 *
	 * @param {string} text to display
	 * @param {string} color
	 */
	SkillTargetSelection.set = function set( skill, target )
	{
		_target = target;
		_skill  = skill;

		if (!_target) {
			return;
		}

		// Render skillName
		var sk = SkillInfo[ skill.SKID ];
		render(sk.SkillName, _skillName);

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
	function intersectEntity(event)
	{
		SkillTargetSelection.remove();

		if (event.which !== 1) {
			return true;
		}

		if (_target & (SkillTargetSelection.TYPE.PLACE|SkillTargetSelection.TYPE.TRAP)) {
			SkillTargetSelection.onUseSkillToPos(_skill.SKID, _skill.level, Mouse.world.x, Mouse.world.y);
			event.stopImmediatePropagation();
			return false;
		}

		var entity = EntityManager.getOverEntity();
		var target = 0;

		if (entity) {
			switch (entity.objecttype) {
				case Entity.TYPE_MOB:
					target = SkillTargetSelection.TYPE.ENEMY;
					break;

				case Entity.TYPE_PC:
					target = SkillTargetSelection.TYPE.FRIEND;
					break;

				default:
					break;
			}

			if (target & _target) {
				SkillTargetSelection.onUseSkillToId(_skill.SKID, _skill.level, entity.GID);
			}
		}

		event.stopImmediatePropagation();
		return false;
	}


	/**
	 * Functions to define
	 */
	SkillTargetSelection.onUseSkillToId = function onUseSkillToId(/*id, level, GID*/){}
	SkillTargetSelection.onUseSkillToPos = function onUseSkillToId(/*id, level, x, y*/){}


	/**
	 * Create component and return it
	 */
	return UIManager.addComponent(SkillTargetSelection);
});
