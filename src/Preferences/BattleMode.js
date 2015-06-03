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
	defaultKey[ KEYS.F1 ]  = { component:'ShortCut',        cmd:'EXECUTE0' };
	defaultKey[ KEYS.F2 ]  = { component:'ShortCut',        cmd:'EXECUTE1' };
	defaultKey[ KEYS.F3 ]  = { component:'ShortCut',        cmd:'EXECUTE2' };
	defaultKey[ KEYS.F4 ]  = { component:'ShortCut',        cmd:'EXECUTE3' };
	defaultKey[ KEYS.F5 ]  = { component:'ShortCut',        cmd:'EXECUTE4' };
	defaultKey[ KEYS.F6 ]  = { component:'ShortCut',        cmd:'EXECUTE5' };
	defaultKey[ KEYS.F7 ]  = { component:'ShortCut',        cmd:'EXECUTE6' };
	defaultKey[ KEYS.F8 ]  = { component:'ShortCut',        cmd:'EXECUTE7' };
	defaultKey[ KEYS.F9 ]  = { component:'ShortCut',        cmd:'EXECUTE8' };
	defaultKey[ KEYS.F12 ] = { component:'ShortCut',        cmd:'EXTEND'   };

	// UI
	defaultKey[ KEYS.C ]   = { component:'ChatRoomCreate',  cmd:'TOGGLE', alt:true };
	defaultKey[ KEYS.E ]   = { component:'Inventory',       cmd:'TOGGLE', alt:true };
	defaultKey[ KEYS.G ]   = { component:'Guild',           cmd:'TOGGLE', alt:true };
	defaultKey[ KEYS.J ]   = { component:'PetInformations', cmd:'TOGGLE', alt:true };
	defaultKey[ KEYS.L ]   = { component:'Emoticons',       cmd:'TOGGLE', alt:true };
	defaultKey[ KEYS.Q ]   = { component:'Equipment',       cmd:'TOGGLE', alt:true };
	defaultKey[ KEYS.S ]   = { component:'SkillList',       cmd:'TOGGLE', alt:true };
	defaultKey[ KEYS.V ]   = { component:'BasicInfo',       cmd:'EXTEND', alt:true };
	defaultKey[ KEYS.H ]   = { component:'PartyFriends',    cmd:'FRIEND', alt:true };
	defaultKey[ KEYS.Z ]   = { component:'PartyFriends',    cmd:'PARTY',  alt:true };


	/**
	 * Export
	 */
	return Preferences.get( 'BattleMode', defaultKey, 1.5 );
});