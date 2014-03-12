/**
 * UI/Components/SkillList/SkillList.js
 *
 * Chararacter Skill Window
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
+ */
define(function(require)
{
	'use strict';


	/**
	 * Dependencies
	 */
	var DB                   = require('DB/DBManager');
	var SkillInfo            = require('DB/SkillInfo');
	//var SkillDescription     = require('DB/SkillDescription');
	var jQuery               = require('Utils/jquery');
	var Client               = require('Core/Client');
	var Preferences          = require('Core/Preferences');
	var Renderer             = require('Renderer/Renderer');
	var Mouse                = require('Controls/MouseEventHandler');
	var KEYS                 = require('Controls/KeyEventHandler');
	var UIManager            = require('UI/UIManager');
	var UIComponent          = require('UI/UIComponent');
	var SkillTargetSelection = require('UI/Components/SkillTargetSelection/SkillTargetSelection');
	var htmlText             = require('text!./SkillList.html');
	var cssText              = require('text!./SkillList.css');



	/**
	 * Create Component
	 */
	var SkillList = new UIComponent( 'SkillList', htmlText, cssText );


	/**
	 * @var {Preferences} window preferences
	 */
	var _preferences = Preferences.get('SkillList', {
		x:        100,
		y:        200,
		width:    8,
		height:   8,
		show:     false,
	}, 1.0);


	/**
	 * @var {Array} Skill List
	 * { SKID, type, level, spcost, attackRange, skillName, upgradable }
	 */
	var _list = [];


	/**
	 * @var {jQuery} level up button reference
	 */
	var _levelupBtn;


	/**
	 * @var {number} skill points
	 */
	var _points = 0;


	/**
	 * Initialize UI
	 */
	SkillList.init = function init()
	{
		// Don't activate drag drop when clicking on buttons
		this.ui.find('.titlebar .base').mousedown(function(event){
			event.stopImmediatePropagation();
			return false;
		});

		// Bind buttons
		this.ui.find('.footer .extend').mousedown(onResize);
		this.ui.find('.titlebar .close').click(function(){
			SkillList.ui.hide();
			return false;
		});

		// Get level up button
		_levelupBtn = this.ui.find('.btn.levelup').detach();
		_levelupBtn.click(function(){
			var index = this.parentNode.parentNode.getAttribute('data-index');
			SkillList.onIncreaseSkill(
				parseInt(index, 10)
			);
		});

		// TODO:
		this.ui

			// Use skill
			.on('dblclick', '.skill .icon, .skill .name', function(){
				var main  = jQuery(this).parent();

				if (!main.hasClass('skill')) {
					main = main.parent();
				}

				SkillList.useSkill(parseInt(main.data('index'), 10));
			})

			// background color
			.on('mousedown', '.selectable', function(event){
				var main = jQuery(this).parent();

				if (!main.hasClass('skill')) {
					main = main.parent();
				}

				SkillList.ui.find('.skill').removeClass('selected');
				main.addClass('selected');

				event.stopImmediatePropagation();
			})

			// Stop drag drop
			.on('mousedown', '.skill', function(event){
				event.stopImmediatePropagation();
			})

			// Item drag drop feature
			.on('dragstart', '.skill', function(event){
				var index = parseInt(this.getAttribute('data-index'), 10);
				var skill = getSkillById(index);

				// Can't drag a passive skill (or disabled)
				if (!skill || !skill.level || !skill.type) {
					event.stopImmediatePropagation();
					return false;
				}

				var img   = new Image();
				img.src   = this.firstChild.firstChild.src;

				event.originalEvent.dataTransfer.setDragImage( img, 12, 12 );
				event.originalEvent.dataTransfer.setData('Text',
					JSON.stringify( window._OBJ_DRAG_ = {
						type: 'skill',
						from: 'skilllist',
						data:  skill
					})
				);
			})

			// Clean up
			.on('dragend', '.skill', function(){
				delete window._OBJ_DRAG_;
			});

		this.draggable();
	};


	/**
	 * Apply preferences once append to body
	 */
	SkillList.onAppend = function onAppend()
	{
		// Apply preferences
		if (!_preferences.show) {
			this.ui.hide();
		}

		resize(_preferences.width, _preferences.height);
		this.ui.css({
			top:  Math.min( Math.max( 0, _preferences.y), Renderer.height - this.ui.height()),
			left: Math.min( Math.max( 0, _preferences.x), Renderer.width  - this.ui.width())
		});
	};


	/**
	 * Remove Skill window from DROM
	 */
	SkillList.onRemove = function onRemove()
	{
		this.ui.find('.container .content').empty();
		_list.length = 0;

		// Save preferences
		_preferences.show   =  this.ui.is(':visible');
		_preferences.y      =  parseInt(this.ui.css('top'), 10);
		_preferences.x      =  parseInt(this.ui.css('left'), 10);
		_preferences.width  =  Math.floor( this.ui.find('.content').width()  / 32 );
		_preferences.height =  Math.floor( this.ui.find('.content').height() / 32 );
		_preferences.save();
	};


	/**
	 * Key Listener
	 *
	 * @param {object} event
	 * @return {boolean}
	 */
	SkillList.onKeyDown = function OnKeyDown( event )
	{
		if (KEYS.ALT && event.which === KEYS.S) {
			this.ui.toggle();

			// Fix zIndex
			if (this.ui.is(':visible')) {
				this.ui.parent().append(this.ui);
			}

			event.stopImmediatePropagation();
			return false;
		}

		return true;
	};


	/**
	 * Add skills to the list
	 */
	SkillList.setSkills = function setSkills( skills )
	{
		var i, count;

		for (i = 0, count = _list.length; i < count; ++i) {
			this.onUpdateSkill( _list[i].SKID, 0);
		}

		_list.length = 0;
		this.ui.find('.content table').empty();

		for (i = 0, count = skills.length; i < count; ++i) {
			this.addSkill( skills[i] );
		}
	};


	/**
	 * Insert skill to list
	 *
	 * @param {object} skill
	 */
	SkillList.addSkill = function addSkill( skill )
	{
		// Custom skill ?
		if (!(skill.SKID in SkillInfo)) {
			return;
		}

		var sk = SkillInfo[ skill.SKID ];

		Client.loadFile( DB.INTERFACE_PATH + 'item/' + sk.Name + '.bmp', function(data){
			var levelup   = _levelupBtn.clone(true);
			var className = !skill.level ? 'disabled' : skill.type ? 'active' : 'passive';
			var element   = jQuery(
				'<tr class="skill id' + skill.SKID + ' ' + className + '" data-index="'+ skill.SKID +'" draggable="true">' +
					'<td class="icon"><img src="'+ data +'" width="24" height="24" /></td>' +
					'<td class="levelupcontainer"></td>' +
					'<td class=selectable>' +
						'<div class="name">' +
							sk.SkillName  +'<br/>' +
							'<span class="level">' +
							(
								sk.bSeperateLv ? 'Lv : <span class="current">'+ skill.level + '</span> / <span class="max">' + skill.level + '</span>'
								               : 'Lv : <span class="current">'+ skill.level +'</span>'
							) +
							'</span>' +
						'</div>' +
					'</td>' +
					'<td class="selectable type">' +
						'<div class="consume">' +
						(
							skill.type ? 'Sp : <span class="spcost">' + skill.spcost + '</span>' : 'Passive'
						) +
						'</div>' +
					'</td>' +
				'</tr>'
			);

			if (!skill.upgradable || !_points) {
				levelup.hide();
			}

			element.find('.levelupcontainer').append( levelup );
			SkillList.ui.find('.content table').append(element);

		});

		_list.push(skill);
		this.onUpdateSkill( skill.SKID, skill.level);
	};


	/**
	 * Remove skill from list
	 */
	SkillList.removeSkill = function removeSkill()
	{
	};



	/**
	 * Update skill
	 *
	 * @param {object} skill : { SKID, level, spcost, attackRange, upgradable }
	 */
	SkillList.updateSkill = function updateSkill( skill )
	{
		var target = getSkillById(skill.SKID);
		var element;

		if (!target) {
			return;
		}

		// Update Memory
		target.level       = skill.level;
		target.spcost      = skill.spcost;
		target.attackRange = skill.attackRange;
		target.upgradable  = skill.upgradable;

		// Update UI
		element = this.ui.find('.skill .id' + skill.SKID + ':first');
		element.find('.level .current, .level .max').text(skill.level);
		element.find('.spcost').text(skill.spcost);

		element.removeClass('active passive disabled');
		element.addClass(!skill.level ? 'disabled' : skill.type ? 'active' : 'passive');

		if (skill.upgradable) {
			element.find('.levelup').show();
		}
		else {
			element.find('.levelup').hide();
		}

		this.onUpdateSkill( skill.SKID, skill.level);
	};



	/**
	 * Use a skill
	 *
	 * @param {number} skill id
	 */
	SkillList.useSkill = function useSkill( id )
	{
		var skill = getSkillById(id);

		if (!skill || !skill.level || !skill.type) {
			return;
		}

		// Self
		if (skill.type & SkillTargetSelection.TYPE.SELF) {
			this.onUseSkill( skill.SKID, skill.level);
		}

		// no elseif intended (see flying kick).
		if (skill.type & SkillTargetSelection.TYPE.TARGET) {
			SkillTargetSelection.append();
			SkillTargetSelection.set(skill, skill.type);
		}
	};


	/**
	 * Set skill points amount
	 *
	 * @param {number} skill points count
	 */
	SkillList.setPoints = function SetPoints( amount )
	{
		var i, count;
		this.ui.find('.skpoints_count').text(amount);

		// Do not need to update the UI
		if ((!_points) === (!amount)) {
			_points = amount;
			return;
		}

		_points = amount;
		count   = _list.length;

		for (i = 0; i < count; ++i) {
			if (_list[i].upgradable && amount) {
				this.ui.find('.skill.id' + _list[i].SKID + ' .levelup').show();
			}
			else {
				this.ui.find('.skill.id' + _list[i].SKID + ' .levelup').hide();
			}
		}
	};


	/**
	 * Find a skill by it's id
	 *
	 * @param {number} skill id
	 * @returns {Skill}
	 */
	function getSkillById( id )
	{
		var i, count = _list.length;

		for (i = 0; i < count; ++i) {
			if (_list[i].SKID === id) {
				return _list[i];
			}
		}

		return null;
	}


	/**
	 * Extend SkillList window size
	 */
	function onResize( event )
	{
		var ui      = SkillList.ui;
		var top     = ui.position().top;
		var left    = ui.position().left;
		var lastWidth  = 0;
		var lastHeight = 0;
		var _Interval;

		function resizing()
		{
			var extraX = -6;
			var extraY = 32;

			var w = Math.floor( (Mouse.screen.x - left - extraX) / 32 );
			var h = Math.floor( (Mouse.screen.y - top  - extraY) / 32 );

			// Maximum and minimum window size
			w = Math.min( Math.max(w, 8), 8);
			h = Math.min( Math.max(h, 4), 10);

			if (w === lastWidth && h === lastHeight) {
				return;
			}

			resize( w, h );
			lastWidth  = w;
			lastHeight = h;
		}

		// Start resizing
		_Interval = setInterval(resizing, 30);

		// Stop resizing on left click
		jQuery(window).one('mouseup', function(event){
			if (event.which === 1) {
				clearInterval(_Interval);
			}
		});

		event.stopImmediatePropagation();
		return false;
	}


	/**
	 * Extend SkillList window size
	 *
	 * @param {number} width
	 * @param {number} height
	 */
	function resize( width, height )
	{
		width  = Math.min( Math.max(width,  8), 8);
		height = Math.min( Math.max(height, 4), 10);

		SkillList.ui.find('.content').css({
			width:  width  * 32,
			height: height * 32
		});
	}


	/**
	 * Abstract function to define
	 */
	SkillList.onUseSkill      = function onUseItem(){};
	SkillList.onIncreaseSkill = function onIncreaseSkill() {};
	SkillList.onUpdateSkill   = function onUpdateSkill(){};
	SkillList.getSkillById    = getSkillById;


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(SkillList);
});