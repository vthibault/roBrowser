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

		// warp ?
		if( path === null ) {
			return;
		}

		// granny model ? :(
		// Display a poring instead
		if( path.match(/\.gr2$/i) ) {
			path = DB.getBodyPath( 1002, this._sex );
		}

		// Loading
		Client.loadFile(path + ".act");
		Client.loadFile(path + ".spr", function(){
			_this.files.body.spr = path + ".spr";
			_this.files.body.act = path + ".act";

			// Update sprites
			_this.bodypalette = _this._bodypalette;
			_this.weapon      = _this._weapon;
			_this.shield      = _this._shield;
		}, null, {to_rgba:_this.objecttype !== Entity.TYPE_PC});
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
			});
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
		this._head = head;

		Client.loadFile(path + ".act");
		Client.loadFile(path + ".spr", function(){
			_this.files.head.spr = path + ".spr";
			_this.files.head.act = path + ".act";

			// Reload head palette
			_this.headpalette = _this._headpalette;
		});
	}


	/**
	 * Update head palette
	 */
	function UpdateHeadPalette( pal )
	{
		var _this         = this;
		this._headpalette = pal;

		if( pal ) {
			var path = DB.getHeadPalPath( this._head, pal, this._sex);
			Client.loadFile( path, function(){
				_this.files.head.pal = path;
			});
		}
		else {
			this.files.head.pal = null;
		}
	}


	/**
	 * Update Generic function to load hats, weapons and shields
	 */
	function UpdateGeneric( type, func, fallback )
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
				this.files[type].spr = null;
				this.files[type].act = null;
				this.files[type].pal = null;

				// Load weapon sound
				if( type === 'weapon') {
					this.weapon_sound = DB.getWeaponSound( val );
				}
				return;
			}

			var _val = val;

			function LoadView( path, final ) {
				Client.loadFile(path + ".act");
				Client.loadFile(path + ".spr", function(){
					_this['_'+type] = _val;
					_this.files[type].spr = path + ".spr";
					_this.files[type].act = path + ".act";

					// Load weapon sound
					if( type === 'weapon' ) {
						_this.weapon_sound = DB.getWeaponSound( _val );
					}
				},

				// if weapon isn't loaded, try to load the default sprite for the weapon type
				function(){
					if( fallback && !final ) {
						_val = DB[fallback](val);
						path = DB[func]( _val, _this._job, _this._sex );
						if( path ) {
							LoadView( path, true );
						}
					}

				// The generic just used : weapon, shield, accessory.
				// This sprites don't use external palettes, so compile it now to rgba.
				}, {to_rgba:true});
			}

			LoadView(path);
		};
	}


	/**
	 * Hooking, export
	 */
	return function Init()
	{
		this.files = new View();

		Object.defineProperty(this, "sex", {
			get: function(){ return this._sex },
			set: UpdateSex
		});

		Object.defineProperty(this, "job", {
			get: function(){ return this._job },
			set: UpdateBody
		});

		Object.defineProperty(this, "bodypalette", {
			get: function(){ return this._bodypalette },
			set: UpdateBodyPalette
		});

		Object.defineProperty(this, "head", {
			get: function(){ return this._head },
			set: UpdateHead
		});

		Object.defineProperty(this, "headpalette", {
			get: function(){ return this._headpalette },
			set: UpdateHeadPalette
		});

		Object.defineProperty(this, "weapon", {
			get: function(){ return this._weapon },
			set: UpdateGeneric("weapon", "getWeaponPath", "getWeaponViewID")
		});

		Object.defineProperty(this, "shield", {
			get: function(){ return this._shield },
			set: UpdateGeneric("shield", "getShieldPath")
		});

		Object.defineProperty(this, "accessory", {
			get: function(){ return this._accessory },
			set: UpdateGeneric("accessory", "getHatPath")
		});

		Object.defineProperty(this, "accessory2", {
			get: function(){ return this._accessory2 },
			set: UpdateGeneric("accessory2", "getHatPath")
		});

		Object.defineProperty(this, "accessory3", {
			get: function(){ return this._accessory3 },
			set: UpdateGeneric("accessory3", "getHatPath")
		});
	};
});