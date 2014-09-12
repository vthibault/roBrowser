/**
 * UI/Components/SkillDescription/SkillDescription.js
 *
 * Skill Information
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
	var jQuery      = require('Utils/jquery');
	var SkillDB     = require('DB/Skills/SkillDescription');
	var Renderer    = require('Renderer/Renderer');
	var KEYS        = require('Controls/KeyEventHandler');
	var Mouse       = require('Controls/MouseEventHandler');
	var UIManager   = require('UI/UIManager');
	var UIComponent = require('UI/UIComponent');
	var htmlText    = require('text!./SkillDescription.html');
	var cssText     = require('text!./SkillDescription.css');


	/**
	 * Create Component
	 */
	var SkillDescription = new UIComponent( 'SkillDescription', htmlText, cssText );


	/**
	 * Once append to the DOM
	 */
	SkillDescription.onKeyDown = function onKeyDown( event )
	{
		if (event.which === KEYS.ESCAPE) {
			this.remove();
			event.stopImmediatePropagation();
			return false;
		}

		return true;
	};


	/**
	 * Click event function, remove UI once click somewhere else
	 */
	var clickHandler = function onClick(event) {
		if(jQuery(event.target).parents().index(SkillDescription.ui) === -1) {
			SkillDescription.remove();
		}
	}


	/**
	 * Once append
	 */
	SkillDescription.onAppend = function onAppend()
	{
		// Seems like "EscapeWindow" is execute first, push it before.
		var events = jQuery._data( window, 'events').keydown;
		events.unshift( events.pop() );

		// Bind close ui if click away from it
		jQuery(document).bind('click', clickHandler);
	};


	/**
	 * Once removed
	 */
	SkillDescription.onRemove = function onRemove()
	{
		jQuery(document).unbind('click', clickHandler);
	}


	/**
	 * Initialize UI
	 */
	SkillDescription.init = function init()
	{
		this.ui.find('.close').click(function(){
			this.remove();
		}.bind(this));

		this.draggable();
	};


	/**
	 * Add content to the box
	 *
	 * @param {number} skill id
	 */
	SkillDescription.setSkill = function setSkill( id )
	{
		this.ui.find('.content').text(SkillDB[id] || '...');

		this.ui.css({
			top:  Math.min( Mouse.screen.y + 10, Renderer.height - this.ui.height()),
			left: Math.min( Mouse.screen.x + 10, Renderer.width - this.ui.width())
		});
	};


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(SkillDescription);
});
