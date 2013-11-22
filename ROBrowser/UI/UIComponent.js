/**
 * UI/UIComponent.js
 *
 * Manage Component
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define( ['Utils/jquery', 'DB/DBManager', 'Core/Client', 'Controls/MouseEventHandler'],
function(       jQuery,      DB,               Client,            Mouse )
{
	"use strict";


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
	 * @var {boolean} is Component ready ?
	 */
	UIComponent.__loaded = false;


	/**
	 * Prepare the component to be used
	 */
	UIComponent.prototype.prepare = function Prepare()
	{
		if( this._htmlText ) {
			this.ui = jQuery(this._htmlText);
			this.ui.css('zIndex', 50);
		}

		// Add style to view
		if( this._cssText ) {
			var style = jQuery('style:first');
			if( !style.length ) {
				style = jQuery('<style type="text/css"></style>').appendTo('head');
			}

			// Avoid adding css each time the same component is created
			if( style.text().indexOf("\n\n/** " + this.name + " **/\n") === -1 ) {
				style.append("\n\n/** " + this.name + " **/\n" + this._cssText);
			}
			jQuery('body').append(this.ui);
		}


		// Prepare html
		if( this._htmlText ) {
			this.ui.each( this.parseHTML ).find('*').each( this.parseHTML );
		}

		// Initialize
		if( this.init ) {
			this.init();
		}

		if( this._htmlText ) {
			this.ui.detach();
		}
	};


	/**
	 * Remove a component from HTML
	 */
	UIComponent.prototype.remove = function Remove()
	{
		if( this.__loaded && this.ui.parent().length ) {
			if( this.onRemove ) {
				this.onRemove();
			}

			if( this.onKeyDown ) {
				jQuery(window).off('keydown.' + this.name);
			}

			this.ui.detach();
		}
	};


	/**
	 * Add the component to HTML
	 */
	UIComponent.prototype.append = function Append()
	{
		if( !this.__loaded) {
			this.prepare();
			this.__loaded = true;

			// Hack to fix async preferences on Chrome App...
			setTimeout( this.append.bind(this), 10 );
			return;
		}

		this.ui.appendTo('body');

		if( this.onKeyDown ) {
			jQuery(window).on('keydown.' + this.name, this.onKeyDown.bind(this));
		}

		if( this.onAppend ) {
			this.onAppend();
		}
	};


	/**
	 * Clone a component
	 *
	 * @param {string} name - new component name
	 */
	UIComponent.prototype.clone = function Clone( name, full )
	{
		var ui = new UIComponent( name, this._htmlText, this._cssText );

		if( full ) {
			var keys = Object.keys(this);
			var i, count = keys.length;

			for( i = 0; i < count; ++i ) {
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
	UIComponent.prototype.on = function On( type )
	{
		switch( type.toLowerCase() ) {
			case 'keydown':
				if( this.onKeyDown ) {
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
	UIComponent.prototype.off = function Off( type )
	{
		switch( type.toLowerCase() ) {
			case 'keydown':
				jQuery(window).off('keydown.' + this.name);
				break;
		}
	};


	/**
	 * Drag an element
	 */
	UIComponent.prototype.draggable = function Draggable( element )
	{
		var container = this.ui;

		// Global variable
		if( !element ) {
			element = this.ui;
		}

		// Drag drop stuff
		element.mousedown( function(event) {

			// Only on left click
			if ( event.which !== 1 ) {
				return;
			}

			var x, y, width, height, drag;

			// Don't propagate event.
			event.stopImmediatePropagation();

			// Set element over others components
			element.css('zIndex', 51);

			x = container.position().left - Mouse.screen.x;
			y = container.position().top  - Mouse.screen.y;
			width  = container.width();
			height = container.height();

			// Start the loop
			container.stop();
			drag = setInterval( function() {
				var x_      = Mouse.screen.x + x;
				var y_      = Mouse.screen.y + y;
				var opacity = parseFloat(container.css('opacity')||1) - 0.02;

				// Magnet on border
				if ( x_ < 10 && x_ > -10 ) {
					x_ = 0;
				}
				if ( y_ < 10 && y_ > -10 ) {
					y_ = 0;
				}

				if ( x_ + width > Mouse.screen.width  - 10 && x_ + width < Mouse.screen.width + 10 ) {
					x_ = Mouse.screen.width - width;
				}

				if ( y_ + height > Mouse.screen.height - 10 && y_ + height < Mouse.screen.height+ 10 ) {
					y_ = Mouse.screen.height- height;
				}

				container.css({ top: y_, left: x_, opacity: Math.max(opacity,0.7) });
			}, 30 );

			// Stop the drag (need to focus on window to avoid possible errors...)
			jQuery(window).on('mouseup.dragdrop', function(event){
				// Only on left click
				if ( event.which !== 1 && !event.isTrigger ) {
					return;
				}

				// Get back zIndex, push the element to the end to be over others components
				setTimeout(function(){
					element.css('zIndex', 50);
					element[0].parentNode.appendChild(element[0]);
				}, 1);

				container.stop().animate({ opacity:1.0 }, 500 );
				clearInterval(drag);

				jQuery(window).off('mouseup.dragdrop');
			});
		});
	
		return this;
	};


	/**
	 * Parse a component html view (data-* attributes)
	 */
	UIComponent.prototype.parseHTML = function ParseHTML()
	{
		var $node      = jQuery(this);
		var background = $node.data('background');
		var preload    = $node.data('preload');
		var hover      = $node.data('hover');
		var down       = $node.data('down');
		var preloads, i, count;

		var bg_uri    = null;
		var hover_uri = null;

		// Default background
		if ( background ) {
			Client.loadFile( DB.INTERFACE_PATH + background, function(dataURI) {
				bg_uri = dataURI;
				$node.css('backgroundImage', 'url(' + bg_uri + ')');
			});
		}

		// On mouse over
		if ( hover ) {
			Client.loadFile( DB.INTERFACE_PATH + hover, function(dataURI){
				hover_uri = dataURI;
				$node.mouseover(function(){ $node.css('backgroundImage', 'url(' + hover_uri + ')') });
				$node.mouseout( function(){ $node.css('backgroundImage', 'url(' + bg_uri    + ')') });
			});
		}
	
		// On mouse down
		if ( down ) {
			Client.loadFile( DB.INTERFACE_PATH + down, function(dataURI){
				$node.mousedown(function(event){ $node.css('backgroundImage', 'url(' + dataURI + ')'); event.stopImmediatePropagation(); });
				$node.mouseup(  function()     { $node.css('backgroundImage', 'url(' + (hover_uri||bg_uri) + ')') });
			});
		}
	
		// Preload images ?
		if ( preload ) {
			preloads = preload.split(';');
			for ( i=0, count=preloads.length; i<count; ++i ) {
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