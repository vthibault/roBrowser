/**
 * UI/UIComponent.js
 *
 * Manage Component
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function( require )
{
	'use strict';


	// Load dependencies
	var CommonCSS = require('text!./Common.css');
	var jQuery    = require('Utils/jquery');
	var Cursor    = require('./CursorManager');
	var DB        = require('DB/DBManager');
	var Client    = require('Core/Client');
	var Events    = require('Core/Events');
	var Mouse     = require('Controls/MouseEventHandler');
	var getModule = require;


	/**
	 * Create a component
	 *
	 * @param {string} name
	 * @param {string} htmlText content
	 * @param {string} cssText content
	 */
	function UIComponent( name, htmlText, cssText )
	{
		this.name      = name;
		this._htmlText = htmlText || null;
		this._cssText  = cssText  || null;
	}


	/**
	 * @var {jQueryElement} <style>
	 */
	var _style = jQuery('style:first');
	if (!_style.length) {
		_style = jQuery('<style type="text/css"></style>').appendTo('head');
	}
	_style.append(CommonCSS);


	/**
	 * @var {boolean} is Component ready ?
	 */
	UIComponent.prototype.__loaded = false;


	/**
	 * @var {boolean} is Component active ?
	 */
	UIComponent.prototype.__active = false;


	/**
	 * Prepare the component to be used
	 */
	UIComponent.prototype.prepare = function prepare()
	{
		if (this._htmlText) {
			this.ui = jQuery(this._htmlText);
			this.ui.css('zIndex', 50);
		}

		// Add style to view
		if (this._cssText) {
			// Avoid adding css each time the same component is created
			if (_style.text().indexOf('\n\n/** ' + this.name + ' **/\n') === -1) {
				_style.append('\n\n/** ' + this.name + ' **/\n' + this._cssText);
			}
			jQuery('body').append(this.ui);
		}

		// Prepare html
		if (this._htmlText) {
			this.ui.each( this.parseHTML ).find('*').each( this.parseHTML );
		}

		// Initialize
		if (this.init) {
			this.init();
		}

		if (this._htmlText) {
			this.ui.detach();
		}

		this.__loaded = true;
	};


	/**
	 * Remove a component from HTML
	 */
	UIComponent.prototype.remove = function remove()
	{
		this.__active = false;

		if (this.__loaded && this.ui.parent().length) {
			if (this.onRemove) {
				this.onRemove();
			}

			if (this.onKeyDown) {
				jQuery(window).off('keydown.' + this.name);
			}

			this.ui.trigger('mouseleave');
			this.ui.detach();
		}
	};


	/**
	 * Add the component to HTML
	 */
	UIComponent.prototype.append = function append()
	{
		this.__active = true;

		if (!this.__loaded) {
			this.prepare();

			// Hack to fix async preferences on Chrome App...
			// Check if we still want to display it.
			Events.setTimeout(function(){
				if (this.__active) {
					this.append();
				}
			}.bind(this), 10 );
			return;
		}

		this.ui.appendTo('body');
		
		if (this.onKeyDown) {
			jQuery(window).on('keydown.' + this.name, this.onKeyDown.bind(this));
		}

		if (this.onAppend) {
			this.onAppend();
		}
	};


	/**
	 * Clone a component
	 *
	 * @param {string} name - new component name
	 */
	UIComponent.prototype.clone = function clone( name, full )
	{
		var ui = new UIComponent( name, this._htmlText, this._cssText );

		if (full) {
			var keys = Object.keys(this);
			var i, count = keys.length;

			for (i = 0; i < count; ++i) {
				ui[ keys[i] ] = this[ keys[i] ];
			}
		}

		return ui;
	};


	/**
	 * Enable a type (keydown is the only one supported yet)
	 *
	 * @param {string} type to enable
	 */
	UIComponent.prototype.on = function on( type )
	{
		switch (type.toLowerCase()) {
			case 'keydown':
				if (this.onKeyDown) {
					jQuery(window)
						.off('keydown.' + this.name)
						.on( 'keydown.' + this.name, this.onKeyDown.bind(this) );
				}
				break;
		}
	};


	/**
	 * Disable a type (keydown is the only one supported yet)
	 *
	 * @param {string} type to disable
	 */
	UIComponent.prototype.off = function off( type )
	{
		switch (type.toLowerCase()) {
			case 'keydown':
				jQuery(window).off('keydown.' + this.name);
				break;
		}
	};


	/**
	 * Drag an element
	 */
	UIComponent.prototype.draggable = function draggable( element )
	{
		var container = this.ui;
		var _intersect, _enter = 0;

		// Global variable
		if (!element) {
			element = this.ui;
		}

		// Draggable elements stop the mouse to intersect with the scene
		// _enter variable is here to fix a recurrent bug in mouseenter and mouseleave
		// when mouseenter can be triggered multiples time
		element.mouseenter(function(){
			if (_enter === 0) {
				_intersect = Mouse.intersect;
				_enter++;
				if (_intersect) {
					Mouse.intersect = false;
					Cursor.setType( Cursor.ACTION.DEFAULT );
				}
			}
		});

		element.mouseleave(function(){
			if (_enter > 0) {
				_enter--;
			}

			if(_intersect) {
				Mouse.intersect = true;
				getModule('Renderer/EntityManager').setOverEntity(null);
			}
		});

		// Drag drop stuff
		element.mousedown( function(event) {

			// Only on left click
			if (event.which !== 1) {
				return;
			}

			var x, y, width, height, drag;
			var updateDepth = element.css('zIndex') == 50;

			// Don't propagate event.
			event.stopImmediatePropagation();

			// Set element over others components
			if (updateDepth) {
				element.css('zIndex', 51);
			}

			x = container.position().left - Mouse.screen.x;
			y = container.position().top  - Mouse.screen.y;
			width  = container.width();
			height = container.height();

			// Start the loop
			container.stop();
			drag = Events.setTimeout( dragging, 15);

			// Stop the drag (need to focus on window to avoid possible errors...)
			jQuery(window).on('mouseup.dragdrop', function(event){
				// Only on left click
				if (event.which !== 1 && !event.isTrigger) {
					return;
				}

				// Get back zIndex, push the element to the end to be over others components
				if (updateDepth) {
					Events.setTimeout(function(){
						element.css('zIndex', 50);
						if (element[0].parentNode) {
							element[0].parentNode.appendChild(element[0]);
						}
					}, 1);
				}

				container.stop().animate({ opacity:1.0 }, 500 );
				Events.clearTimeout(drag);
				jQuery(window).off('mouseup.dragdrop');
			});

			// Process dragging
			function dragging() {
				var x_      = Mouse.screen.x + x;
				var y_      = Mouse.screen.y + y;
				var opacity = parseFloat(container.css('opacity')||1) - 0.02;

				// Magnet on border
				if (x_ < 10 && x_ > -10) {
					x_ = 0;
				}
				if (y_ < 10 && y_ > -10) {
					y_ = 0;
				}

				if (x_ + width > Mouse.screen.width  - 10 && x_ + width < Mouse.screen.width + 10) {
					x_ = Mouse.screen.width - width;
				}

				if (y_ + height > Mouse.screen.height - 10 && y_ + height < Mouse.screen.height+ 10) {
					y_ = Mouse.screen.height- height;
				}

				container.css({ top: y_, left: x_, opacity: Math.max(opacity,0.7) });
				drag = Events.setTimeout( dragging, 15);
			}
		});
	
		return this;
	};


	/**
	 * Parse a component html view (data-* attributes)
	 */
	UIComponent.prototype.parseHTML = function parseHTML()
	{
		var $node      = jQuery(this);
		var background = $node.data('background');
		var preload    = $node.data('preload');
		var hover      = $node.data('hover');
		var down       = $node.data('down');
		var msgId      = $node.data('text');

		var preloads, i, count;

		var bg_uri    = null;
		var hover_uri = null;

		// text
		if (msgId) {
			$node.text( DB.getMessage(msgId, '') );
		}

		// Default background
		if (background) {
			Client.loadFile( DB.INTERFACE_PATH + background, function(dataURI) {
				bg_uri = dataURI;
				$node.css('backgroundImage', 'url(' + bg_uri + ')');
			});
		}

		// On mouse over
		if (hover) {
			Client.loadFile( DB.INTERFACE_PATH + hover, function(dataURI){
				hover_uri = dataURI;
				$node.mouseover(function(){ this.style.backgroundImage = 'url(' + hover_uri + ')'; });
				$node.mouseout( function(){ this.style.backgroundImage = 'url(' + bg_uri    + ')'; });
			});
		}
	
		// On mouse down
		if (down) {
			Client.loadFile( DB.INTERFACE_PATH + down, function(dataURI){
				$node.mousedown(function(event){ this.style.backgroundImage = 'url(' + dataURI + ')'; event.stopImmediatePropagation(); });
				$node.mouseup(  function()     { this.style.backgroundImage = 'url(' + (hover_uri||bg_uri) + ')'; });
			});

			if (!hover) {
				$node.mouseout( function(){ this.style.backgroundImage = 'url(' + bg_uri + ')'; });
			}
		}
	
		// Preload images ?
		if (preload) {
			preloads = preload.split(';');
			for (i = 0, count = preloads.length; i < count; ++i) {
				preloads[i] = DB.INTERFACE_PATH + jQuery.trim(preloads[i]);
			}
			Client.loadFiles( preloads );
		}
	};


	/**
	 * Export
	 */
	return UIComponent;
});