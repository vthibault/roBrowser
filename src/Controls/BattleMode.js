/**
 * Controls/BattleMode.js
 *
 * Manage the battle mode
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function(require)
{
	"use strict";
	
	
	/**
	 * Dependencies
	 */
	var KEYS        = require('Controls/KeyEventHandler');
	var Preferences = require('Preferences/BattleMode');
	var UIManager   = require('UI/UIManager');


	/**
	 * Create Namespace
	 */
	var BattleMode  = {};


	/**
	 * BattleMode processing
	 */
	BattleMode.process = function process( keyId )
	{
		var key = Preferences[keyId];

		if (key &&
		   (!key.shift || KEYS.SHIFT) &&
		   (!key.alt   || KEYS.ALT)   &&
		   (!key.ctrl  || KEYS.CTRL)
		) {
			UIManager.getComponent(key.component).onShortCut(key);
			return true;
		}

		return false;
	};


	/**
	 * Exports
	 */
	return BattleMode;
});