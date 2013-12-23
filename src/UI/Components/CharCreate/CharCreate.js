/**
 * UI/Components/CharCreate/CharCreate.js
 *
 * Chararacter Creation windows
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
	var Renderer           = require('Renderer/Renderer');
	var DB                 = require('DB/DBManager');
	var KEYS               = require('Controls/KeyEventHandler');
	var Entity             = require('Renderer/Entity/Entity');
	var SpriteRenderer     = require('Renderer/SpriteRenderer');
	var Camera             = require('Renderer/Camera');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var htmlText           = require('text!./CharCreate.html');
	var cssText            = require('text!./CharCreate.css');


	/**
	 * Create Chararacter Selection namespace
	 */
	var CharCreate = new UIComponent( 'CharCreate', htmlText, cssText );


	/**
	 * Initialize UI
	 */
	CharCreate.init = function Init()
	{
		this.graph   = this.ui.find('.graph canvas')[0].getContext('2d');
		this.chargen = {
			entity: new Entity(),
			ctx:    this.ui.find('.chargen canvas')[0].getContext('2d'),
			render: false,
			tick:   0
		};

		// Setup GUI
		this.ui.css({ top: (Renderer.height-342)/2, left: (Renderer.width-576)/2 });
		this.draggable();

		// Bind Events
		this.ui.find('.chargen .left' ).mousedown( this.updateCharacterGeneric('head', -1) );
		this.ui.find('.chargen .right').mousedown( this.updateCharacterGeneric('head', +1) );
		this.ui.find('.chargen .up'   ).mousedown( this.updateCharacterGeneric('headpalette', +1) );
		this.ui.find('.graph button'  ).mousedown( this.updateGraphic );

		this.ui.find('input').mousedown(function(event){
			this.select();
			event.stopImmediatePropagation();
		});

		this.ui.find('.cancel').click( this.cancel.bind(this) );
		this.ui.find('.make').click( this.create.bind(this) );
	};


	/**
	 * @var {boolean} account sex
	 */
	CharCreate.AccountSex = 0;


	/**
	 * Setter for AccountSex
	 *
	 * @param {number} sex
	 */
	CharCreate.setAccountSex = function SetAccountSex( sex )
	{
		this.AccountSex = sex;
	};


	/**
	 * Generic function to get a direct proxy to updateCharacter
	 *
	 * @param {string} type
	 * @param {number} value
	 */
	CharCreate.updateCharacterGeneric = function UpdateCharacterGeneric( type, value )
	{
		return function( event) {
			CharCreate.updateCharacter( type, value );
			event.stopImmediatePropagation();
			return false;
		}
	};


	/**
	 * Once add to HTML, start rendering
	 */
	CharCreate.onAppend = function OnAppend()
	{
		this.chargen.render = true;
		this.chargen.entity.set({ sex:this.AccountSex, job:0, head:2, action:0 });

		this.ui.find('input').val('').focus();

		Renderer.render(this.render);
		this.updateGraphic();
	};


	/**
	 * Remove component from HTML
	 * Stop rendering
	 */
	CharCreate.onRemove = function OnRemove()
	{
		Renderer.stop();
	};


	/**
	 * Key Handler
	 *
	 * @param {object} event
	 * @return {boolean}
	 */
	CharCreate.onKeyDown = function OnKeyDown( event )
	{
		switch(event.which) {
			case KEYS.ESCAPE:
				event.stopImmediatePropagation();
				this.cancel();
				return false;
		}

		return true;
	};


	/**
	 * Send back informations to send the packet
	 */
	CharCreate.create = function Create()
	{
		CharCreate.onCharCreationRequest(
			this.ui.find('input').val(),
			this.ui.find('.info .str').text(),
			this.ui.find('.info .agi').text(),
			this.ui.find('.info .vit').text(),
			this.ui.find('.info .int').text(),
			this.ui.find('.info .dex').text(),
			this.ui.find('.info .luk').text(),
			this.chargen.entity.head,
			this.chargen.entity.headpalette
		);
	};


	/**
	 * Exit the window
	 */
	CharCreate.cancel = function Cancel()
	{
		this.onExitRequest();
	};


	/**
	 * Update character hairstyle and haircolor
	 *
	 * @param {string} type (head or headpalette)
	 * @param {number} increment (-1 or +1)
	 */
	CharCreate.updateCharacter = function UpdateCharacter( type, increment )
	{
		switch( type ) {
			case "head":
				var head = this.chargen.entity.head + increment;
				if( head < 2 )  head = 26;
				if( head > 26 ) head =  2;
				this.chargen.entity.head = head;
				break;

			case "headpalette":
				this.chargen.entity.headpalette += increment;
				this.chargen.entity.headpalette %= 10;
				break;
		}

		this.render();
	};


	/**
	 * Update the polygon
	 */
	CharCreate.updateGraphic = function UpdateGraphic()
	{
		if( this !== CharCreate ) {
			// Can't be upper than 9
			if( CharCreate.ui.find('.info .' + this.className).text() == "9" ) {
				return;
			}

			// Relation table
			var group = {
				'str': 'int',
				'int': 'str',
				'vit': 'dex',
				'dex': 'vit',
				'luk': 'agi',
				'agi': 'luk'
			};

			// Update infos
			CharCreate.ui.find('.info .' +       this.className )[0].textContent++;
			CharCreate.ui.find('.info .' + group[this.className])[0].textContent--;

			CharCreate.updateGraphic();
			return;
		}

		// Update graphique.
		var ctx    = CharCreate.graph;
		var width  = ctx.canvas.width;
		var height = ctx.canvas.height;
		var i, x = width/2, y = height/2;
		var list = ['dex', 'agi', 'str', 'vit', 'luk', 'int'];

		ctx.clearRect(0, 0, width, height);
		ctx.save();
		ctx.fillStyle = "#7b94ce";
		ctx.translate(x, y);
		ctx.beginPath();  
		ctx.moveTo( 0, Math.floor( y/10 * ( parseInt(CharCreate.ui.find('.info .'+list[5]).text())+1 ) ) );

		for( i=0; i<6; i++ ) {
			ctx.rotate( 60 * Math.PI / 180 );
			ctx.lineTo( 0, Math.floor( y/10 * ( parseInt(CharCreate.ui.find('.info .'+list[i]).text())+1 )) );
		}

		ctx.closePath();  
		ctx.fill();
		ctx.restore();
	};


	/**
	 * Rendering the Character
	 */
	CharCreate.render = function Render( tick )
	{
		// Update direction each 500ms
		if( CharCreate.chargen.tick + 500 < tick ) {
			Camera.direction++;
			Camera.direction %= 8;
			CharCreate.chargen.tick = tick;
		}

		// Rendering
		SpriteRenderer.bind2DContext( CharCreate.chargen.ctx, 32, 115 );
		CharCreate.chargen.ctx.clearRect(0, 0, CharCreate.chargen.ctx.canvas.width, CharCreate.chargen.ctx.canvas.height );
		CharCreate.chargen.entity.renderEntity();
	};


	/**
	 * Callback to define
	 */
	CharCreate.onExitRequest = function OnExitRequest(){};


	/**
	 * Abstract callback to define
	 */
	CharCreate.onCharCreationRequest = function OnCharCreationRequest( name, Str, Agi, Vit, Int, Dex, Luk, hair, color ){};


	/**
	 * Create componentand export it
	 */
	return UIManager.addComponent(CharCreate);
});