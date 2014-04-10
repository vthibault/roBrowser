/**
 * Preferences/BattleMode.js
 *
 * BattleMode preferences
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define( ['Core/Preferences', 'Controls/KeyEventHandler'], function( Preferences, KEYS )
{
	'use strict';


	/**
	 * Default keys
	 */
	var defaultKey = {};

	// Shortcut
	defaultKey[ KEYS.F1 ]  = { component:'ShortCut',        cmd:'EXECUTE', index:0 };
	defaultKey[ KEYS.F2 ]  = { component:'ShortCut',        cmd:'EXECUTE', index:1 };
	defaultKey[ KEYS.F3 ]  = { component:'ShortCut',        cmd:'EXECUTE', index:2 };
	defaultKey[ KEYS.F4 ]  = { component:'ShortCut',        cmd:'EXECUTE', index:3 };
	defaultKey[ KEYS.F5 ]  = { component:'ShortCut',        cmd:'EXECUTE', index:4 };
	defaultKey[ KEYS.F6 ]  = { component:'ShortCut',        cmd:'EXECUTE', index:5 };
	defaultKey[ KEYS.F7 ]  = { component:'ShortCut',        cmd:'EXECUTE', index:6 };
	defaultKey[ KEYS.F8 ]  = { component:'ShortCut',        cmd:'EXECUTE', index:7 };
	defaultKey[ KEYS.F9 ]  = { component:'ShortCut',        cmd:'EXECUTE', index:8 };
	defaultKey[ KEYS.F12 ] = { component:'ShortCut',        cmd:'EXTEND'           };

	// UI
	defaultKey[ KEYS.V ]   = { component:'BasicInfo',       cmd:'EXTEND', alt:true };
	defaultKey[ KEYS.Q ]   = { component:'Equipment',       cmd:'TOGGLE', alt:true };
	defaultKey[ KEYS.E ]   = { component:'Inventory',       cmd:'TOGGLE', alt:true };
	defaultKey[ KEYS.J ]   = { component:'PetInformations', cmd:'TOGGLE', alt:true };
	defaultKey[ KEYS.S ]   = { component:'SkillList',       cmd:'TOGGLE', alt:true };
	defaultKey[ KEYS.C ]   = { component:'ChatRoomCreate',  cmd:'TOGGLE', alt:true };

	/**
	 * Export
	 */
	return Preferences.get( 'BattleMode', defaultKey, 1.0 );
});