/**
 * Renderer/Camera.js
 *
 * Camera class
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function( require )
{
	'use strict';

	/**
	 * Load dependencies
	 */
	var KEYS        = require('Controls/KeyEventHandler');
	var Mouse       = require('Controls/MouseEventHandler');
	var Events      = require('Core/Events');
	var Preferences = require('Preferences/Camera');
	var glMatrix    = require('Utils/gl-matrix');
	var mat4        = glMatrix.mat4;
	var mat3        = glMatrix.mat3;
	var vec2        = glMatrix.vec2;
	var vec3        = glMatrix.vec3;
	var _position   = vec3.create();


	/**
	 * Camera Namespace
	 */
	var Camera = {};


	/**
	 * Projection matrix
	 * @var {mat4} projection
	 */
	Camera.projection = mat4.create();


	/**
	 * ModelView matrix
	 * @var {mat4} modelView
	 */
	Camera.modelView = mat4.create();


	/**
	 * ModelView matrix
	 * @var {mat4} modelView
	 */
	Camera.normalMat = mat3.create();


	/**
	 * @var {number} zoom
	 */
	Camera.zoom      = Preferences.zoom;

	/**
	 * @var {number} zoomFinal
	 */
	Camera.zoomFinal = Preferences.zoom;


	/**
	 * @var {vec2} angle rotation
	 */
	Camera.angle      = vec2.create();


	/**
	 * @var {vec2} angle final rotation
	 */
	Camera.angleFinal = vec2.create();


	/**
	 * @var {vec3}
	 */
	Camera.position = vec3.create();


	/**
	 * @var {Entity} Entity currently attached by the camera
	 */
	Camera.target = null;


	/**
	 * @var {number}
	 */
	Camera.lastTick = 0;


	/**
	 * @var {number} camera zoom
	 */
	Camera.MAX_ZOOM = 10;
	

	/**
	 * @var {number} Camera direction
	 */
	Camera.direction    =    0;
	Camera.altitudeFrom =  -50;
	Camera.altitudeTo   =  -65;
	Camera.rotationFrom = -360;
	Camera.rotationTo   =  360;
	Camera.range        =  240;


	/**
	 * @var {object} Camera action informations (right click)
	 */
	Camera.action = {
		active: false,
		tick:   0,
		x:      0,
		y:      0
	};


	/**
	 * Attach player
	 *
	 * @param {object} target - Entity player to attach
	 */
	Camera.setTarget = function SetTarget( target )
	{
		this.target = target;
	};


	/**
	 * Get camera latitude
	 *
	 * @return {number} latitude
	 */
	Camera.getLatitude = function GetLatitude()
	{
		return this.angle[0] - 180.0;
	};


	/**
	 * Initialize Camera
	 */
	Camera.init = function Init()
	{
		this.lastTick  = Date.now();

		this.angle[0]      = 240.0;
		this.angle[1]      = this.rotationFrom % 360.0;
		this.angleFinal[0] = this.range % 360.0;
		this.angleFinal[1] = this.rotationFrom % 360.0;
	
		this.position[0] = -this.target.position[0];
		this.position[1] = -this.target.position[1];
		this.position[2] =  this.target.position[2];
	};
	
	
	/**
	 * Save the camera settings
	 */
	Camera.save = function SaveClosure()
	{
		var _pending = false;

		function save() {
			_pending         = false;
			Preferences.zoom = Camera.zoomFinal;
			Preferences.save();
		}

		return function saving() {
			// Save camera settings after 3 seconds
			if (!_pending) {
				Events.setTimeout( save, 3000);
				_pending = true;
			}
		};
	}();


	/**
	 * Rotate the camera
	 *
	 * @param {boolean} active - is mouse down ?
	 */
	Camera.rotate = function Rotate( active )
	{
		var action = this.action;
		var tick   = Date.now();

		if (!active) {
			action.active = false;
			return;
		}

		// Check for double click (reset angle and zoom)
		if (action.tick + 500 > tick &&
		    Math.abs(action.x-Mouse.screen.x) < 10 && // Check the mouse position to avoid bug while rotating
		    Math.abs(action.y-Mouse.screen.y) < 10) { // to fast the camera...

			if (KEYS.SHIFT) {
				this.angleFinal[0] = +this.range;
			}
			if (KEYS.CTRL) {
				this.zoomFinal = 0.0;
			}
			else {
				this.angleFinal[1] = 0;
			}
		}

		// Save position and tick (for double click)
		action.x       = Mouse.screen.x;
		action.y       = Mouse.screen.y;
		action.tick    = tick;
		action.active  = true;
	};


	/**
	 * Process action when right click is down
	 */
	Camera.processMouseAction = function ProcessMouseAction()
	{
		// Rotate Z
		if (KEYS.SHIFT) {
			this.angleFinal[0] += ( Mouse.screen.y - this.action.y ) / Mouse.screen.height * 300;
			this.angleFinal[0]  = Math.max( this.angleFinal[0], 190 );
			this.angleFinal[0]  = Math.min( this.angleFinal[0], 270 );
		}

		// Zoom
		else if (KEYS.CTRL) {
			this.zoomFinal -= ( Mouse.screen.y - this.action.y  ) / Mouse.screen.height * 150;
			this.zoomFinal  = Math.min( this.zoomFinal, Math.abs(this.altitudeTo-this.altitudeFrom) * this.MAX_ZOOM );
			this.zoomFinal  = Math.max( this.zoomFinal,  2.0 );
		}

		// Rotate
		else {
			this.angleFinal[1] -= ( Mouse.screen.x - this.action.x ) / Mouse.screen.width * 720;

			if (this.angle[1] > 180 && this.angleFinal[1] > 180) {
				this.angle[1]      -= 360;
				this.angleFinal[1] -= 360;
			}

			else if (this.angle[1] < -180 && this.angleFinal[1]) {
				this.angle[1]      += 360;
				this.angleFinal[1] += 360;
			}

			this.angleFinal[1] = Math.max( this.angleFinal[1], this.rotationFrom );
			this.angleFinal[1] = Math.min( this.angleFinal[1], this.rotationTo );
		}

		// Update last check
		this.action.x = +Mouse.screen.x ;
		this.action.y = +Mouse.screen.y ;
		
		this.save();
	};


	/**
	 * Process a MouseWheel, zoom.
	 *
	 * @param {number} delta (zoom)
	 */
	Camera.setZoom = function SetZoom( delta )
	{
		this.zoomFinal += delta * 15;
		this.zoomFinal  = Math.min( this.zoomFinal, Math.abs(this.altitudeTo-this.altitudeFrom) * this.MAX_ZOOM );
		this.zoomFinal  = Math.max( this.zoomFinal,  2.0 );
		
		this.save();
	};


	/**
	 * Update the camera
	 *
	 * @param {number} tick
	 */
	Camera.update = function Update( tick )
	{
		var lerp      = Math.min( (tick - this.lastTick) * 0.006, 1.0);
		this.lastTick = tick;

		// Update camera from mouse movement
		if (this.action.x !== -1 && this.action.y !== -1 && this.action.active) {
			this.processMouseAction();
		}

		// Move Camera
		if (Preferences.smooth) {
			this.position[0] += ( -this.target.position[0] - this.position[0] ) * lerp ;
			this.position[1] += ( -this.target.position[1] - this.position[1] ) * lerp ;
			this.position[2] += (  this.target.position[2] - this.position[2] ) * lerp ;
		}
		else {
			this.position[0] = -this.target.position[0];
			this.position[1] = -this.target.position[1];
			this.position[2] =  this.target.position[2];
		}

		// Zoom
		this.zoom        += ( this.zoomFinal - this.zoom ) * lerp * 2.0;
		
		// Angle
		this.angle[0]    += ( this.angleFinal[0] - this.angle[0] ) * lerp * 2.0;
		this.angle[1]    += ( this.angleFinal[1] - this.angle[1] ) * lerp * 2.0;
		this.angle[0]    %=   360;
		this.angle[1]    %=   360;

		// Find Camera direction (for NPC direction)
		this.direction    = Math.floor( ( this.angle[1] + 22.5 ) / 45 ) % 8;

		// Calculate new modelView mat
		var matrix = this.modelView;
		mat4.identity( matrix );
		mat4.translateZ( matrix, (this.altitudeFrom - this.zoom) / 2 );
		mat4.rotateX( matrix, matrix, this.angle[0] / 180 * Math.PI );
		mat4.rotateY( matrix, matrix, this.angle[1] / 180 * Math.PI );

		// Center of the cell and inversed Y-Z axis
		_position[0] = this.position[0] - 0.5;
		_position[1] = this.position[2];
		_position[2] = this.position[1] - 0.5;
		mat4.translate( matrix, matrix, _position );

		mat4.toInverseMat3(matrix, this.normalMat);
		mat3.transpose(this.normalMat, this.normalMat);
	};


	/**
	 * Export
	 */
	return Camera;
});