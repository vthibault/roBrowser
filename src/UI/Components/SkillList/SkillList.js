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
	var SkillInfo            = require('DB/Skills/SkillInfo');
	var jQuery               = require('Utils/jquery');
	var Client               = require('Core/Client');
	var Preferences          = require('Core/Preferences');
	var Renderer             = require('Renderer/Renderer');
	var Mouse                = require('Controls/MouseEventHandler');
	var UIManager            = require('UI/UIManager');
	var UIComponent          = require('UI/UIComponent');
	var SkillTargetSelection = require('UI/Components/SkillTargetSelection/SkillTargetSelection');
	var SkillDescription     = require('UI/Components/SkillDescription/SkillDescription');
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
	var _btnIncSkill;


	/**
	 * @var {number} skill points
	 */
	var _points = 0;


	/**
	 * @var {jQuery} button that appeared when level up
	 */
	var _btnLevelUp;


	/**
	 * Initialize UI
	 */
	SkillList.init = function init()
	{
		this.ui.find('.titlebar .base').mousedown(stopPropagation);
		this.ui.find('.footer .extend').mousedown(onResize);
		this.ui.find('.titlebar .close').click(onClose);

		// Get level up button
		_btnIncSkill = this.ui.find('.btn.levelup').detach().click(onRequestSkillUp);

		// Get button to open skill when level up
		_btnLevelUp = jQuery('#lvlup_job').detach();
		_btnLevelUp.click(function(){
			_btnLevelUp.detach();
			SkillList.ui.show();
			SkillList.ui.parent().append(SkillList.ui);
		}).mousedown(stopPropagation);

		// Bind skills
		this.ui
			.on('dblclick',    '.skill .icon, .skill .name', onRequestUseSkill)
			.on('contextmenu', '.skill .icon, .skill .name', onRequestSkillInfo)
			.on('mousedown',   '.selectable', onSkillFocus)
			.on('dragstart',   '.skill',      onSkillDragStart)
			.on('dragend',     '.skill',      onSkillDragEnd);

		this.draggable(this.ui.find('.titlebar'));
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
		_btnLevelUp.detach();

		// Save preferences
		_preferences.show   =  this.ui.is(':visible');
		_preferences.y      =  parseInt(this.ui.css('top'), 10);
		_preferences.x      =  parseInt(this.ui.css('left'), 10);
		_preferences.width  =  Math.floor( this.ui.find('.content').width()  / 32 );
		_preferences.height =  Math.floor( this.ui.find('.content').height() / 32 );
		_preferences.save();
	};


	/**
	 * Show/Hide UI
	 */
	SkillList.toggle = function toggle()
	{
		this.ui.toggle();

		if (this.ui.is(':visible')) {
			this.focus();
			_btnLevelUp.detach();
		}
	};


	/**
	 * Process shortcut
	 *
	 * @param {object} key
	 */
	SkillList.onShortCut = function onShortCut( key )
	{
		switch (key.cmd) {
			case 'TOGGLE':
				this.toggle();
				break;
		}
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

		// Already in list, update it instead of duplicating it
		if (this.ui.find('.skill.id' + skill.SKID + ':first').length) {
			this.updateSkill( skill );
			return;
		}

		var sk        = SkillInfo[ skill.SKID ];
		var levelup   = _btnIncSkill.clone(true);
		var className = !skill.level ? 'disabled' : skill.type ? 'active' : 'passive';
		var element   = jQuery(
			'<tr class="skill id' + skill.SKID + ' ' + className + '" data-index="'+ skill.SKID +'" draggable="true">' +
				'<td class="icon"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" width="24" height="24" /></td>' +
				'<td class="levelupcontainer"></td>' +
				'<td class=selectable>' +
					'<div class="name">' +
						jQuery.escape(sk.SkillName)  +'<br/>' +
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
		this.parseHTML.call(levelup);

		Client.loadFile( DB.INTERFACE_PATH + 'item/' + sk.Name + '.bmp', function(data){
			element.find('.icon img').attr('src', data);
		});

		_list.push(skill);
		this.onUpdateSkill( skill.SKID, skill.level);
	};


	/**
	 * Remove skill from list
	 */
	SkillList.removeSkill = function removeSkill()
	{
		// Not implemented by gravity ? server have to send the whole list again ?
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
		element = this.ui.find('.skill.id' + skill.SKID + ':first');
		element.find('.level .current, .level .max').text(skill.level);
		element.find('.spcost').text(skill.spcost);

		element.removeClass('active passive disabled');
		element.addClass(!skill.level ? 'disabled' : skill.type ? 'active' : 'passive');

		if (skill.upgradable && _points) {
			element.find('.levelup').show();
		}
		else {
			element.find('.levelup').hide();
		}

		this.onUpdateSkill( skill.SKID, skill.level);
	};


	/**
	 * Use a skill index
	 *
	 * @param {number} skill id
	 */
	SkillList.useSkillID = function useSkillID( id )
	{
		var skill = getSkillById(id);

		if (!skill || !skill.level || !skill.type) {
			return;
		}

		SkillList.useSkill( skill );
	};


	/**
	 * Use a skill
	 *
	 * @param {object} skill
	 */
	SkillList.useSkill = function useSkill( skill )
	{
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
	 * Add the button when leveling up
	 */
	SkillList.onLevelUp = function onLevelUp()
	{
		_btnLevelUp.appendTo('body');
	};


	/**
	 * Stop event propagation
	 */
	function stopPropagation( event )
	{
		event.stopImmediatePropagation();
		return false;
	}


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
	function onResize()
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
		jQuery(window).on('mouseup.resize', function(event){
			if (event.which === 1) {
				clearInterval(_Interval);
				jQuery(window).off('mouseup.resize');
			}
		});
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
	 * Closing window
	 */
	function onClose()
	{
		SkillList.ui.hide();
	}


	/**
	 * Request to upgrade a skill
	 */
	function onRequestSkillUp()
	{
		var index = this.parentNode.parentNode.getAttribute('data-index');
		SkillList.onIncreaseSkill(
			parseInt(index, 10)
		);
	}


	/**
	 * Request to use a skill
	 */
	function onRequestUseSkill()
	{
		var main  = jQuery(this).parent();

		if (!main.hasClass('skill')) {
			main = main.parent();
		}

		SkillList.useSkillID(parseInt(main.data('index'), 10));
	}


	/**
	 * Request to get skill info (right click on a skill)
	 */
	function onRequestSkillInfo()
	{
		var main = jQuery(this).parent();
		var skill;

		if (!main.hasClass('skill')) {
			main = main.parent();
		}

		skill = getSkillById(parseInt(main.data('index'), 10));

		// Don't add the same UI twice, remove it
		if (SkillDescription.uid === skill.SKID) {
			SkillDescription.remove();
			return;
		}

		// Add ui to window
		SkillDescription.append();
		SkillDescription.setSkill(skill.SKID);
	}


	/**
	 * Focus a skill in the list (background color changed)
	 */
	function onSkillFocus()
	{
		var main = jQuery(this).parent();

		if (!main.hasClass('skill')) {
			main = main.parent();
		}

		SkillList.ui.find('.skill').removeClass('selected');
		main.addClass('selected');
	}


	/**
	 * Start to drag a skill (to put it on the hotkey UI ?)
	 */
	function onSkillDragStart( event )
	{
		var index = parseInt(this.getAttribute('data-index'), 10);
		var skill = getSkillById(index);

		// Can't drag a passive skill (or disabled)
		if (!skill || !skill.level || !skill.type) {
			return stopPropagation(event);
		}

		var img   = new Image();
		img.src   = this.firstChild.firstChild.src;

		event.originalEvent.dataTransfer.setDragImage( img, 12, 12 );
		event.originalEvent.dataTransfer.setData('Text',
			JSON.stringify( window._OBJ_DRAG_ = {
				type: 'skill',
				from: 'SkillList',
				data:  skill
			})
		);
	}


	/**
	 * Stop the drag drop action, clean up
	 */
	function onSkillDragEnd()
	{
		delete window._OBJ_DRAG_;
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
