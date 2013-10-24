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
		this.mark        = [];
		this.preferences = Preferences.get('MiniMap', { zoom:1.0, opacity:1.0 });

		this.updateZoom( this.preferences.zoom );
		this.toggleOpacity( this.preferences.opacity );

		this.arrow = new Image();
		this.map   = new Image();

		this.arrow.onload = this.map.onload = this.render.bind(this);

		this.zoom      = 0.0;
		this.opacity   = 1.0;

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

		Renderer.render(this.render.bind(this));
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
		this.mark.length  = 0;
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
	 * Add a npc mark to minimap
	 *
	 * @param {number} key id
	 * @param {number} x position
	 * @param {number} y position
	 * @param {Array} color
	 */
	MiniMap.addNpcMark = function AddNPCMark( key, x, y, lcolor, time )
	{
		var i, count = this.mark.length;
		var color = [
			( lcolor & 0x00ff0000 ) >> 16,
			( lcolor & 0x0000ff00 ) >> 8,
			( lcolor & 0x000000ff )
		];

		for( i=0; i<count; ++i ) {
			if( this.mark[i].key === key ) {
				this.mark[i].x     = x;
				this.mark[i].y     = y;
				this.mark[i].color = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
				this.mark[i].tick  = Renderer.tick + time
				return;
			}
		}

		this.mark.push({
			key:    key,
			x:      x,
			y:      y,
			color: 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')',
			tick:  Renderer.tick + time
		})
	};


	/**
	 * Remove a NPC mark from minimap
	 *
	 * @param {number} key id
	 */
	MiniMap.removeNpcMark = function RemoveNPCMark( key )
	{
		var i, count = this.mark.length;

		for( i=0; i<count; ++i ) {
			if( this.mark[i].key === key ) {
				this.mark.splice(i, 1);
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
	MiniMap.render = function Render( tick )
	{
		var width   = Altitude.width;
		var height  = Altitude.height;
		var pos     = Camera.target.position;
		var max     = Math.max(width, height);
		var f       = 1 / max  * 128;
		var start_x = (max-width)  / 2 * f;
		var start_y = (height-max) / 2 * f;

		var i, count, dot;
		var ctx = this.ctx;

		// Rendering map
		ctx.clearRect( 0, 0, 128, 128 );

		if( this.map.complete && this.map.width ) {
			ctx.drawImage( this.map, 0, 0, 128, 128 );
		}

		// Render attached player arrow
		if( this.arrow.complete && this.arrow.width ) {
			ctx.save();
			ctx.translate( start_x + pos[0] * f, start_y + 128 - pos[1] * f );
			ctx.rotate( ( Camera.target.direction + 4 ) * 45 * Math.PI / 180 );
			ctx.drawImage( this.arrow, -this.arrow.width * 0.5, -this.arrow.height * 0.5 );
			ctx.restore();
		}

		// Render NPC mark
		if( tick % 1000 > 500 ) { // blink effect

			count = this.mark.length;

			for( i=0; i<count; ++i ) {
				dot = this.mark[i];

				// Auto remove feature
				if( dot.tick < Renderer.tick ) {
					this.mark.splice( i, 1 );
					i--;
					count--;
					continue;
				}

				// Render mark
				ctx.fillStyle = dot.color;
				ctx.fillRect( start_x + dot.x * f - 1, start_y + 128 - dot.y * f - 4, 2, 8 );
				ctx.fillRect( start_x + dot.x * f - 4, start_y + 128 - dot.y * f - 1, 8, 2 );
			}
		}

		// Render party members
		count = this.party.length;
		for( i=0; i<count; ++i ) {
			dot           = this.party[i];
			ctx.fillStyle = "white";
			ctx.fillRect( start_x + dot.x * f - 3, start_y + 128 - dot.y * f - 3, 6, 6 );
			ctx.fillStyle = dot.color;
			ctx.fillRect( start_x + dot.x * f - 2, start_y + 128 - dot.y * f - 2, 4, 4 );
		}

		// Render guild members
		count           = this.guild.length;
		ctx.fillStyle   = 'rgb(0.9,0.7,0.8)';
		ctx.strokeStyle = 'white';
		for( i=0; i<count; ++i ) {
			dot = this.guild[i];
			ctx.moveTo( start_x + dot.x * f + 0, start_y + 128 - dot.y * f - 3 );
			ctx.lineTo( start_x + dot.x * f + 3, start_y + 128 - dot.y * f + 3 );
			ctx.lineTo( start_x + dot.x * f - 3, start_y + 128 - dot.y * f + 3 );
		}
		ctx.stroke();
		ctx.fill();
	};


	/**
	 * Create component and return it
	 */
	return UIManager.addComponent(MiniMap);
});
