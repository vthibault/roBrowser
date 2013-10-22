/**
 * UI/Components/MiniMap.js
 *
 * MiniMap UI
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
	var Client             = require('Core/Client');
	var Preferences        = require('Core/Preferences');
	var Renderer           = require('Renderer/Renderer');
	var Camera             = require('Renderer/Camera');
	var Altitude           = require('Renderer/Map/Altitude');
	var KEYS               = require('Controls/KeyEventHandler');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var htmlText           = require('text!./MiniMap.html');
	var cssText            = require('text!./MiniMap.css');


	/**
	 * Create MiniMap component
	 */
	var MiniMap = new UIComponent( 'MiniMap', htmlText, cssText );


	/**
	 * Initialize minimap
	 */
	MiniMap.init = function Init()
	{
		this.party       = [];
		this.guild       = [];
		this.preferences = Preferences.get('MiniMap', { zoom:1.0, opacity:1.0 });

		this.updateZoom( this.preferences.zoom );
		this.toggleOpacity( this.preferences.opacity );

		this.arrow = new Image();
		this.map   = new Image();

		this.arrow.onload = this.map.onload = this.render.bind(this);

		this.zoom      = 0.0;
		this.opacity   = 1.0;
		this.rendering = false;

		// Bind DOM elements
		this.zoomPlus  = this.ui.find('.plus');
		this.zoomMinus = this.ui.find('.minus');
		this.ctx       = this.ui.find('canvas')[0].getContext('2d');

		this.zoomPlus.mousedown(this.genericUpdateZoom(+1));
		this.zoomMinus.mousedown(this.genericUpdateZoom(-1));
	};


	/**
	 * Generic zoom feature
	 *
	 * @param {number} value (zoom)
	 */
	MiniMap.genericUpdateZoom = function GenericUpdateZoom( value )
	{
		return function() {
			MiniMap.updateZoom( value );
		};
	};


	/**
	 * Once append to HTML
	 */
	MiniMap.onAppend = function OnAppend()
	{
		Client.loadFile('/map/map_arrow.bmp', function(dataURI){
			MiniMap.arrow.src = dataURI;
		});

		this.rendering = true;
		this.render();
	};


	/**
	 * Set map
	 *
	 * @param {string} mapname
	 */
	MiniMap.setMap = function SetMap( mapname )
	{
		Client.loadFile('map/' + mapname.replace(/\..*/,'.bmp'), function(dataURI){
			MiniMap.map.src = dataURI;
		});
	};


	/**
	 * KeyDown Handler
	 *
	 * @param {object} event
     * @return {boolean}
	 */
	MiniMap.onKeyDown = function OnKeyDown( event )
	{
		// Will not work on Chrome :(
		if( event.which === KEYS.TAB && KEYS.CTRL ) {
			this.toggleOpacity();
			event.stopImmediatePropagation();
			return false;
		}

        return true;
	};


	/**
	 * Once removed from HTML
	 */
	MiniMap.onRemove = function OnRemove()
	{
		// Clean up memory
		this.party.length = 0;
		this.guild.length = 0;
		this.rendering    = false;
	};


	/**
	 * Add a party mark to minimap
	 *
	 * @param {number} key account id
	 * @param {number} x position
	 * @param {number} y position
	 */
	MiniMap.addPartyMemberMark = function AddPartyMember( key, x, y)
	{
		var i, count = this.party.length;
		var r = Math.random;

		for( i=0; i<count; ++i ) {
			if( this.party[i].key === key ) {
				this.party[i].x = x;
				this.party[i].y = y;
				return;
			}
		}

		this.party.push({
			key: key,
			x:   x,
			y:   y,
			color: "rgb("+  [ r()*255 | 0, r()*255 | 0, r()*255 | 0] +")"
		});
	};


	/**
	 * Remove a party mark from minimap
	 *
	 * @param {number} key account id
	 */
	MiniMap.removePartyMemberMark = function RemovePartyMemberMark( key )
	{
		var i, count = this.party.length;

		for( i=0; i<count; ++i ) {
			if( this.party[i].key === key ) {
				this.party.splice(i, 1);
				break;
			}
		}
	};


	/**
	 * Add a guild mark to minimap
	 *
	 * @param {number} key account id
	 * @param {number} x position
	 * @param {number} y position
	 */
	MiniMap.addGuildMemberMark = function AddGuildMemberMark( key, x, y )
	{
		var i, count = this.guild.length;

		for( i=0; i<count; ++i ) {
			if( this.guild[i].key === key ) {
				this.guild[i].x = x;
				this.guild[i].y = y;
				return;
			}
		}

		this.guild.push({
			key: key,
			x:   x,
			y:   y
		})
	};


	/**
	 * Remove a guild mark from minimap
	 *
	 * @param {number} key account id
	 */
	MiniMap.removeGuildMemberMark = function RemoveGuildMemberMark( key )
	{
		var i, count = this.guild.length;

		for( i=0; i<count; ++i ) {
			if( this.guild[i].key === key ) {
				this.guild.splice(i, 1);
				break;
			}
		}
	};


	/**
	 * Change zoom
	 * TODO: implement zoom feature in minimap.
	 */
	MiniMap.updateZoom = function UpdateZoom( value )
	{
		// this.preferences.zoom = ...;
		// this.preferences.save();
	};


	/**
	 * Change window opacity
	 */
	MiniMap.toggleOpacity = function ToggleOpacity()
	{
		this.opacity = ( this.opacity + 2 ) % 3;
		this.preferences.opacity = this.opacity;
		this.preferences.save();

		switch( this.opacity ) {
			case 0:
				this.ui.hide();
				break;

			case 1:
				this.ctx.globalAlpha = 0.5;
				this.ui.show();
				break;

			case 2:
				this.ctx.globalAlpha = 1.0;
				this.ui.show();
				break;
		}
	};


	/**
	 * Render GUI
	 */
	MiniMap.render = function Render()
	{
		var width  = Altitude.width;
		var height = Altitude.height;
		var pos    = Camera.target.position;
		var fx     = 1 / width  * 128;
		var fy     = 1 / height * 128;
		var i, count, player;
		var ctx = this.ctx;

		// Rendering map
		ctx.clearRect( 0, 0, 128, 128 );

		if( this.map.complete && this.map.width ) {
			ctx.drawImage( this.map, 0, 0, 128, 128 );
		}

		// Render attached player arrow
		if( this.arrow.complete && this.arrow.width ) {
			ctx.save();
			ctx.translate( pos[0] * fx, 128 - pos[1] * fy );
			ctx.rotate( ( Camera.target.direction + 4 ) * 45 * Math.PI / 180 );
			ctx.drawImage( this.arrow, -this.arrow.width * 0.5, -this.arrow.height * 0.5 );
			ctx.restore();
		}

		// Render party members
		count = this.party.length;
		for( i=0; i<count; ++i ) {
			player        = this.party[i];
			ctx.fillStyle = "white";
			ctx.fillRect( player.x * fx - 3, 128 - player.y * fy - 3, 6, 6 );
			ctx.fillStyle = player.color;
			ctx.fillRect( player.x * fx - 2, 128 - player.y * fy - 2, 4, 4 );
		}

		// Render guild members
		count           = this.guild.length;
		ctx.fillStyle   = 'rgb(0.9,0.7,0.8)';
		ctx.strokeStyle = 'white';
		for( i=0; i<count; ++i ) {
			player = this.guild[i];
			ctx.moveTo( player.x * fx + 0,  128 - player.y * fy - 3 );
			ctx.lineTo( player.x * fx + 3,  128 - player.y * fy + 3 );
			ctx.lineTo( player.x * fx - 3,  128 - player.y * fy + 3 );
		}
		ctx.stroke();
		ctx.fill();

		// Continue to render
		if ( this.rendering ) {
			requestAnimationFrame( this.render.bind(this), this.ui[0] );
		}
	};


	/**
	 * Create component and return it
	 */
	return UIManager.addComponent(MiniMap);
});
