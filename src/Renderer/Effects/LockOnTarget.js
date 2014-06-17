/**
 * Renderer/Effects/LockOnTarget.js
 *
 * Rendering casting on ground (rotating plane)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function( require ) {

	'use strict';


	// Load dependencies
	var WebGL    = require('Utils/WebGL');
	var Texture  = require('Utils/Texture');
	var glMatrix = require('Utils/gl-matrix');
	var Client   = require('Core/Client');


	/**
	 * @var {WebGLTexture}
	 */
	var _texture;


	/**
	 * @var {WebGLProgram}
	 */
	var _program;


	/**
	 * @var {WebGLBuffer}
	 */
	var _buffer;


	/**
	 * @var {mat4}
	 */
	var mat4 = glMatrix.mat4;


	/**
	 * @var {mat4} rotation matrix
	 */
	var _matrix = mat4.create();


	/**
	 * @var {string} Vertex Shader
	 */
	var _vertexShader   = [
		'attribute vec2 aPosition;',
		'attribute vec2 aTextureCoord;',

		'varying vec2 vTextureCoord;',

		'uniform mat4 uModelViewMat;',
		'uniform mat4 uProjectionMat;',
		'uniform mat4 uRotationMat;',

		'uniform vec3 uPosition;',
		'uniform float uSize;',

		'void main(void) {',
			'vec4 position  = vec4(uPosition.x + 0.5, -uPosition.z, uPosition.y + 0.5, 1.0);',
			'position      += vec4(aPosition.x * uSize, 0.0, aPosition.y * uSize, 0.0) * uRotationMat;',

			'gl_Position    = uProjectionMat * uModelViewMat * position;',
			'gl_Position.z -= 0.02;',

			'vTextureCoord  = aTextureCoord;',
		'}'
	].join('\n');


	/**
	 * @var {string} Fragment Shader
	 */
	var _fragmentShader = [
		'varying vec2 vTextureCoord;',

		'uniform sampler2D uDiffuse;',
		'uniform float uColor;',

		'uniform bool  uFogUse;',
		'uniform float uFogNear;',
		'uniform float uFogFar;',
		'uniform vec3  uFogColor;',

		'void main(void) {',
			'vec4 texture = texture2D( uDiffuse,  vTextureCoord.st );',

			'if (texture.a == 0.0) {',
			'	discard;',
			'}',

			'gl_FragColor     = texture;',
			'gl_FragColor.gb *= uColor;',

			'if (uFogUse) {',
				'float depth     = gl_FragCoord.z / gl_FragCoord.w;',
				'float fogFactor = smoothstep( uFogNear, uFogFar, depth );',
				'gl_FragColor    = mix( gl_FragColor, vec4( uFogColor, gl_FragColor.w ), fogFactor );',
			'}',
		'}'
	].join('\n');


	/**
	 * LockOnTarget constructor
	 *
	 * @param {Entity} target entity
	 * @param {number} tick to remove it
	 */
	function LockOnTarget( target, startLifeTime, endLifeTime )
	{
		this.target        = target;
		this.startLifeTime = startLifeTime;
		this.endLifeTime   = endLifeTime;
	}


	/**
	 * Preparing for render
	 *
	 * @param {object} webgl context
	 */
	LockOnTarget.prototype.init = function init( gl )
	{
		this.ready  = true;
	};


	/**
	 * Destroying data
	 *
	 * @param {object} webgl context
	 */
	LockOnTarget.prototype.free = function free( gl )
	{
		this.ready = false;
	};


	/**
	 * Rendering cast
	 *
	 * @param {object} wegl context
	 */
	LockOnTarget.prototype.render = function render( gl, tick )
	{
		var time = tick - this.startLifeTime;
		var color = 20-(Math.floor(time/20)%20);
		color /= 20;

		// Animation
		time /= 50;
		time  = Math.max(time, 1);
		time  = Math.min(time, 5);

		gl.uniform3fv( _program.uniform.uPosition,  this.target.position);
		gl.uniform1f(  _program.uniform.uSize,      (6-time)*3);
		gl.uniform1f(  _program.uniform.uColor,     color);

		gl.drawArrays( gl.TRIANGLES, 0, 6 );

		this.needCleanUp = this.endLifeTime < tick;
	};


	/**
	 * Initialize effect
	 * 
	 * @param {object} webgl context
	 */
	LockOnTarget.init = function init(gl)
	{
		_program = WebGL.createShaderProgram( gl, _vertexShader, _fragmentShader );
		_buffer  = gl.createBuffer();

		gl.bindBuffer( gl.ARRAY_BUFFER, _buffer );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array([
			-0.5, -0.5, 0.0, 0.0,
			+0.5, -0.5, 1.0, 0.0,
			+0.5, +0.5, 1.0, 1.0,
			+0.5, +0.5, 1.0, 1.0,
			-0.5, +0.5, 0.0, 1.0,
			-0.5, -0.5, 0.0, 0.0
		]), gl.STATIC_DRAW );

		Client.loadFile('data/texture/effect/lockon128.tga', function(buffer) {
			Texture.load(buffer, function() {
				var ctx = this.getContext('2d');
				ctx.save();
				ctx.translate(  this.width/2,  this.height/2 );
				ctx.rotate( 45 / 180 * Math.PI);
				ctx.translate( -this.width/2, -this.height/2 );
				ctx.drawImage( this, 0, 0);
				ctx.restore();

				_texture = gl.createTexture();
				gl.bindTexture( gl.TEXTURE_2D, _texture );
				gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this);
				gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				gl.generateMipmap( gl.TEXTURE_2D );

				LockOnTarget.ready = true;
			});
		});
	};


	/**
	 * @var {boolean} should we render it before entities ?
	 */
	LockOnTarget.renderBeforeEntities = true;


	/**
	 * Destroy objects
	 *
	 * @param {object} webgl context
	 */
	LockOnTarget.free = function free(gl)
	{
		if (_texture) {
			gl.deleteTexture(_texture);
			_texture = null;
		}

		if (_program) {
			gl.deleteProgram(_program);
			_program = null;
		}

		if (_buffer) {
			gl.deleteBuffer(_buffer);
		}

		this.ready = false;
	};


	/**
	 * Before render, set up program
	 *
	 * @param {object} webgl context
	 */
	LockOnTarget.beforeRender = function beforeRender(gl, modelView, projection, fog, tick)
	{
		var uniform   = _program.uniform;
		var attribute = _program.attribute;

		mat4.identity(_matrix);
		mat4.rotateY( _matrix, _matrix, (tick/4) / 180 * Math.PI);

		gl.useProgram( _program );

		// Bind matrix
		gl.uniformMatrix4fv( uniform.uModelViewMat,  false, modelView );
		gl.uniformMatrix4fv( uniform.uProjectionMat, false, projection );
		gl.uniformMatrix4fv( uniform.uRotationMat,   false, _matrix);

		// Fog settings
		gl.uniform1i(  uniform.uFogUse,   fog.use && fog.exist );
		gl.uniform1f(  uniform.uFogNear,  fog.near );
		gl.uniform1f(  uniform.uFogFar,   fog.far  );
		gl.uniform3fv( uniform.uFogColor, fog.color );

		// Texture
		gl.activeTexture( gl.TEXTURE0 );
		gl.bindTexture( gl.TEXTURE_2D, _texture );
		gl.uniform1i( uniform.uDiffuse, 0 );

		// Enable all attributes
		gl.enableVertexAttribArray( attribute.aPosition );
		gl.enableVertexAttribArray( attribute.aTextureCoord );

		gl.bindBuffer( gl.ARRAY_BUFFER, _buffer );

		gl.vertexAttribPointer( attribute.aPosition,     2, gl.FLOAT, false, 4*4,  0   );
		gl.vertexAttribPointer( attribute.aTextureCoord, 2, gl.FLOAT, false, 4*4,  2*4 );
	};


	/**
	 * After render, clean attributes
	 *
	 * @param {object} webgl context
	 */
	LockOnTarget.afterRender = function afterRender(gl)
	{
		gl.disableVertexAttribArray( _program.attribute.aPosition );
		gl.disableVertexAttribArray( _program.attribute.aTextureCoord );
	};


	/**
	 * Export
	 */
	return LockOnTarget;
});