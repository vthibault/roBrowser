/**
 * Renderer/EntityView.js
 *
 * Manage Entity files (attachments) to load once a view change
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(['Core/Client', 'DB/DBManager', './EntityAction'], function( Client, DB, EntityAction )
{
	"use strict";


	/**
	 * Files to display a view
	 */
	function ViewFiles( spr, act, pal )
	{
		this.spr = spr || null;
		this.act = act || null;
		this.pal = pal || null;
	}


	/**
	 * View structure
	 */
	function View()
	{
		this.body       = new ViewFiles();
		this.head       = new ViewFiles();
		this.weapon     = new ViewFiles();
		this.shield     = new ViewFiles();
		this.accessory  = new ViewFiles();
		this.accessory2 = new ViewFiles();
		this.accessory3 = new ViewFiles();
		this.shadow     = new ViewFiles('data/sprite/shadow.spr', 'data/sprite/shadow.act');
	}


	/**
	 * If changing sex, all files have to be reload
	 * (not used in game but can be used in a next update or in offline mode)
	 */
	function UpdateSex( sex )
	{
		this._sex        = sex;
		this.job         = this._job;
		this.bodypalette = this._bodypalette;
		this.head        = this._head;
		this.headpalette = this._headpalette;
		this.weapon      = this._weapon;
		this.shield      = this._shield;
		this.accessory   = this._accessory;
		this.accessory2  = this._accessory2;
		this.accessory3  = this._accessory3;
	}


	/**
	 * Updating job
	 */
	function UpdateBody( job )
	{
		var path   = DB.getBodyPath( job, this._sex );
		var  _this = this;
		var Entity = this.constructor;
		_this._job = job;

		// Define Object type based on its id
		// TODO: find a better way ?
		this.objecttype = (
			job < 45   ? Entity.TYPE_PC   :
			job < 46   ? Entity.TYPE_WARP :
			job < 1000 ? Entity.TYPE_NPC  :
			job < 4000 ? Entity.TYPE_MOB  :
			job < 6000 ? Entity.TYPE_PC   :
			job < 7000 ? Entity.TYPE_HOM  :
						 Entity.TYPE_MERC
		);

		// Reload actions frames (the type can change...)
		EntityAction.call(this);

		// Loading
		if( path === null ) { // warp ?
			return;
		}

		Client.loadFile(path + ".act", null, null, []);
		Client.loadFile(path + ".spr", function(){
			_this.files.body.spr = path + ".spr";
			_this.files.body.act = path + ".act";

			// Update sprites
			_this.bodypalette = _this._bodypalette;
			_this.weapon      = _this._weapon;
			_this.shield      = _this._shield;
		}, null, []);
	}


	/**
	 * Update body palette
	 */
	function UpdateBodyPalette( pal )
	{
		var _this = this;

		if( pal ) {
			var path = DB.getBodyPalPath( this._job, pal, this._sex);
			Client.loadFile( path, function(){
				_this._bodypalette   = pal;
				_this.files.body.pal = path;
			}, null, []);
		}
		else {
			this.files.body.pal = null;
		}
	}


	/**
	 * Update head
	 */
	function UpdateHead( head )
	{
		var _this  = this;
		var path   = DB.getHeadPath( head, this._sex );

		Client.loadFile(path + ".act", null, null, []);
		Client.loadFile(path + ".spr", function(){
			_this._head          = head;
			_this.files.head.spr = path + ".spr";
			_this.files.head.act = path + ".act";
			_this.headpalette = _this._headpalette;
		}, null, null, []);
	}


	/**
	 * Update head palette
	 */
	function UpdateHeadPalette( pal )
	{
		var _this = this;

		if( pal ) {
			var path = DB.getHeadPalPath( this._head, pal, this._sex);
			Client.loadFile( path, function(){
				_this._headpalette   = pal;
				_this.files.head.pal = path;
			}, null, []);
		}
		else {
			this.files.head.pal = null;
		}
	}


	/**
	 * Update Generic function to load hats, weapons and shields
	 */
	function UpdateGeneric( type, func )
	{
		return function( val ) {
			if( !val ) {
				this["_"+type] = 0;
				return;
			}
	
			var _this = this;
			var path;

			if( type === 'weapon' || type === 'shield' ) {
				path  = DB[func]( val, this._job, this._sex );
			}
			else {
				path  = DB[func]( val, this._sex );
			}

			if( !path ) {
				return;	
			}
	
			Client.loadFile(path + ".act", null, null, []);
			Client.loadFile(path + ".spr", function(){
				_this['_'+type] = val;
				_this.files[type].spr = path + ".spr";
				_this.files[type].act = path + ".act";

			// The generic just used : weapon, shield, accessory.
			// This sprites don't use external palettes, so compile it now to rgba.
			}, null, {to_rgba:true});
		};
	}


	/**
	 * Hooking, export
	 */
	return function Init()
	{
        this.files = new View();

		// Getters
		this.__defineGetter__("job",         function(){ return this._job });
		this.__defineGetter__("sex",         function(){ return this._sex });
		this.__defineGetter__("bodypalette", function(){ return this._bodypalette });
		this.__defineGetter__("head",        function(){ return this._head });
		this.__defineGetter__("headpalette", function(){ return this._headpalette });
		this.__defineGetter__("weapon",      function(){ return this._weapon });
		this.__defineGetter__("shield",      function(){ return this._shield });
		this.__defineGetter__("accessory",   function(){ return this._accessory });
		this.__defineGetter__("accessory2",  function(){ return this._accessory2 });
		this.__defineGetter__("accessory3",  function(){ return this._accessory3 });

		// Setters
		this.__defineSetter__("sex",         UpdateSex );
		this.__defineSetter__("job",         UpdateBody );
		this.__defineSetter__("bodypalette", UpdateBodyPalette );
		this.__defineSetter__("head",        UpdateHead );
		this.__defineSetter__("headpalette", UpdateHeadPalette );
		this.__defineSetter__("weapon",      UpdateGeneric("weapon", "getWeaponPath") );
		this.__defineSetter__("shield",      UpdateGeneric("shield", "getShieldPath") );
		this.__defineSetter__("accessory",   UpdateGeneric("accessory", "getHatPath") );
		this.__defineSetter__("accessory2",  UpdateGeneric("accessory2", "getHatPath") );
		this.__defineSetter__("accessory3",  UpdateGeneric("accessory3", "getHatPath") );
	};
});