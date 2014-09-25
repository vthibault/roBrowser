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
	 * @var {enum} Mouse mode
	 */
	UIComponent.MouseMode = {
		CROSS:  0, // cross the ui and intersect with scene
		STOP:   1, // don't intersect the scene if mouse over the ui
		FREEZE: 2  // don't intersect the scene if ui is alive in scene
	};


	/**
	 * @var {number} mouse behavior
	 */
	UIComponent.prototype.mouseMode = UIComponent.MouseMode.STOP;


	/**
	 * @var {boolean} is Component ready ?
	 */
	UIComponent.prototype.__loaded = false;


	/**
	 * @var {boolean} is Component active ?
	 */
	UIComponent.prototype.__active = false;


	/**
	 * @var {boolean} focus element zIndex ? 
	 */
	UIComponent.prototype.needFocus = true;


	/**
	 * Prepare the component to be used
	 */
	UIComponent.prototype.prepare = function prepare()
	{
		if (this.__loaded) {
			return;
		}

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

		// If the ui don't allow to be crossed by mouse to intersect the scene then
		// _enter variable is here to fix a recurrent bug in mouseenter and mouseleave
		// when mouseenter can be triggered multiples time
		if (this.mouseMode === UIComponent.MouseMode.STOP) {
			var _intersect, _enter = 0;
			var element = this.__mouseStopBlock || this.ui;

			// stop intersection
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

			// restore previous state
			element.mouseleave(function(){
				if (_enter > 0) {
					_enter--;

					if(_enter === 0 && _intersect) {
						Mouse.intersect = true;
						getModule('Renderer/EntityManager').setOverEntity(null);
					}
				}
			});

			// Custom fix for firefox, mouseleave isn't trigger when element is
			// removed from body, test case: http://jsfiddle.net/7h4sj/
			element.on('x_remove', function(){
				if (_enter > 0) {
					_enter = 0;
					if(_intersect) {
						Mouse.intersect = true;
						getModule('Renderer/EntityManager').setOverEntity(null);
					}
				}
			});

			// Do not cross
			element.on('touchstart', function(event){
				event.stopImmediatePropagation();
			});

			// Focus the UI on mousedown
			element.mousedown(this.focus.bind(this));
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

			this.ui.trigger('x_remove');
			this.ui.detach();

			if (this.mouseMode === UIComponent.MouseMode.FREEZE) {
				Mouse.intersect = true;
			}
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
			jQuery(window).off('keydown.' + this.name).on('keydown.' + this.name, this.onKeyDown.bind(this));
		}

		if (this.mouseMode === UIComponent.MouseMode.FREEZE) {
			Mouse.intersect = false;
			Cursor.setType( Cursor.ACTION.DEFAULT );
		}

		if (this.onAppend) {
			this.onAppend();
		}

		this.focus();
	};


	/**
	 * Focus the UI
	 * (stay at the top of others)
	 */
	UIComponent.prototype.focus = function focus()
	{
		if (!this.manager || !this.needFocus) {
			return;
		}

		var components = this.manager.components;
		var name, zIndex, list = [];
		var i, count, j;

		// Store components zIndex in a list
		for (name in components) {
			if (this !== components[name] && components[name].__active && components[name].needFocus) {
				zIndex = parseInt(components[name].ui.css('zIndex'), 10);
				list[zIndex-50] = zIndex;
			}
		}

		// Re-organize it to have a linear zIndex order (remove gap)
		for (i = 0, j = 0, count = list.length; i < count; ++i) {
			if (!list[i]) {
				j++;
				continue;
			}
			list[i] -= j;
		}

		// Apply new zIndex to list
		for (name in components) {
			if (this !== components[name] && components[name].__active && components[name].needFocus) {
				zIndex = parseInt(components[name].ui.css('zIndex'), 10);
				components[name].ui.css('zIndex', list[zIndex-50]);
			}
		}

		// Push our zIndex at top
		this.ui.css('zIndex', list.length + 50 - j);
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

		// Global variable
		if (!element) {
			element = this.ui;
		}

		// Drag drop stuff
		element.on('mousedown touchstart', function(event) {
			if (event.type === 'touchstart') {
				Mouse.screen.x = event.originalEvent.touches[0].pageX;
				Mouse.screen.y = event.originalEvent.touches[0].pageY;
			}

			// Only on left click
			else if (event.which !== 1) {
				return;
			}

			var x, y, width, height, drag;
			x      = container.position().left - Mouse.screen.x;
			y      = container.position().top  - Mouse.screen.y;
			width  = container.width();
			height = container.height();

			// Start the loop
			container.stop();
			drag = Events.setTimeout( dragging, 15);

			// Stop the drag (need to focus on window to avoid possible errors...)
			jQuery(window).on('mouseup.dragdrop touchend.dragdrop', function(event){
				if (event.type === 'touchend' || event.which === 1 || event.isTrigger) {
					container.stop().animate({ opacity:1.0 }, 500 );
					Events.clearTimeout(drag);
					jQuery(window).off('mouseup.dragdrop touchend.dragdrop');
				}
			});

			// Process dragging
			function dragging() {
				var x_      = Mouse.screen.x + x;
				var y_      = Mouse.screen.y + y;
				var opacity = parseFloat(container.css('opacity')||1) - 0.02;

				// Magnet on border
				if (Math.abs(x_) < 10) {
					x_ = 0;
				}
				if (Math.abs(y_) < 10) {
					y_ = 0;
				}

				if (Math.abs((x_ + width) - Mouse.screen.width) < 10) {
					x_ = Mouse.screen.width - width;
				}

				if (Math.abs((y_ + height) - Mouse.screen.height) < 10) {
					y_ = Mouse.screen.height - height;
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
		if (msgId && DB.getMessage(msgId, '')) {
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