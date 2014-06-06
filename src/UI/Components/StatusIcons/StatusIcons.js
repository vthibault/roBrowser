/**
 * UI/Components/StatusIcons/StatusIcons.js
 *
 * Status Icons UI
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function( require )
{
	'use strict';


	/**
	 * Dependencies
	 */
	var StatusTable        = require('DB/Status/StatusInfo');
	var jQuery             = require('Utils/jquery');
	var Texture            = require('Utils/Texture');
	var Client             = require('Core/Client');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');


	/**
	 * Create component
	 */
	var StatusIcons = new UIComponent( 'StatusIcons' );


	/**
	 * @var {Array} Informations waiting for UI to be ready
	 */
	var _stack = [];


	/**
	 * Initialize component
	 */
	StatusIcons.init = function Init()
	{
		this.ui = jQuery('<div/>');
		this.ui.attr('id', 'StatusIcons');
		this.ui.css({
			display:  'block',
			position: 'absolute',
			top:     166,
			right:   20,
			width:   34,
			zIndex:  50
		});
	};


	/**
	 * Once append
	 */
	StatusIcons.onAppend = function onAppend(){
		if (_stack.length) {
			var i, count = _stack.length;

			for (i = 0; i < count; ++i) {
				StatusIcons.update.apply(StatusIcons, _stack[i]);
			}

			_stack.length = 0;
		}
	};


	/**
	 * Clean up component
	 */
	StatusIcons.clean = function Clean()
	{
		this.ui.empty();
	};


	/**
	 * Update icon on screen
	 *
	 * @param {number} status id
	 * @param {number} enable/disable
	 * @param {number} life time
	 */
	StatusIcons.update = function Update( index, state, life )
	{
		var ui = this.ui;
		var target;

		if (!ui) {
			_stack.push([index, state, life]);
			return;
		}

		if (!(index in StatusTable)) {
			return;
		}

		target = ui.find('.effect' + index);

		if (!state) {
			target.remove();
			return;
		}

		if (!target.length && StatusTable[index].icon) {
			Client.loadFile( 'data/texture/effect/' + StatusTable[index].icon, function(data){
				Texture.load( data, function(){
					if (!ui.find('.effect' + index).length) {
						this.className = 'effect'+ index;
						ui.append(this);
					}
				});
			});
		}
	};


	/**
	 * Create component and return it
	 */
	return UIManager.addComponent(StatusIcons);
});