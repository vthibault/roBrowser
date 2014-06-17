/**
 * Renderer/Map/Water.js
 *
 * Rendering water
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define( ['Utils/WebGL'], function( WebGL )
{
	'use strict';


	/**
	 * @var {WebGLProgram}
	 */
	var _program = null;


	/**
	 * @var {WebGLBuffer}
	 */
	var _buffer = null;


	/**
	 * @var {number} total vertices
	 */
	var _vertCount = 0;


	/**
	 * @var {Array} textures list
	 */
	var _textures = new Array(32);


	/**
	 * @var {number} wave speed
	 */
	var _waveSpeed = 0;


	/**
	 * @var {number} wave height
	 */
	var _waveHeight = 0;


	/**
	 * @var {number} wave pitch
	 */
	var _wavePitch = 0;


	/**
	 * @var {number} water height
	 */
	var _waterLevel = 0;


	/**
	 * @var {number} animation speed
	 */
	var _animSpeed = 0;


	/**
	 * @var {number} water opacity
	 */
	var _waterOpacity = 0.6;


	/**
	 * @var {string} vertex shader
	 */
	var _vertexShader   = [
		'attribute vec3 aPosition;',
		'attribute vec2 aTextureCoord;',

		'varying vec2 vTextureCoord;',

		'uniform mat4 uModelViewMat;',
		'uniform mat4 uProjectionMat;',

		'uniform float uWaveHeight;',
		'uniform float uWavePitch;',
		'uniform float uWaterOffset;',

		'const float PI = 3.14159265358979323846264;',

		'void main(void) {',
			'float x       = mod( aPosition.x, 2.0);',
			'float y       = mod( aPosition.z, 2.0);',
			'float diff    = x < 1.0 ? y < 1.0 ? 1.0 : -1.0 : 0.0;',
			'float Height  = sin((PI / 180.0) * (uWaterOffset + 0.5 * uWavePitch * (aPosition.x + aPosition.z + diff))) * uWaveHeight;',

			'gl_Position   = uProjectionMat * uModelViewMat * vec4( aPosition.x, aPosition.y + Height, aPosition.z, 1.0);',
			'vTextureCoord = aTextureCoord;',
		'}'
	].join('\n');


	/**
	 * @var {string} fragment shader
	 */
	var _fragmentShader = [
		'varying vec2 vTextureCoord;',

		'uniform sampler2D uDiffuse;',

		'uniform bool  uFogUse;',
		'uniform float uFogNear;',
		'uniform float uFogFar;',
		'uniform vec3  uFogColor;',

		'uniform vec3  uLightAmbient;',
		'uniform vec3  uLightDiffuse;',
		'uniform float uLightOpacity;',

		'uniform float uOpacity;',

		'void main(void) {',
			'gl_FragColor = vec4( texture2D( uDiffuse, vTextureCoord).rgb, uOpacity);',

			'if (uFogUse) {',
				'float depth     = gl_FragCoord.z / gl_FragCoord.w;',
				'float fogFactor = smoothstep( uFogNear, uFogFar, depth );',
				'gl_FragColor    = mix( gl_FragColor, vec4( uFogColor, gl_FragColor.w ), fogFactor );',
			'}',
		'}'
	].join('\n');


	/**
	 * Initialize water data
	 *
	 * @param {object} gl context
	 * @param {object} water data
	 */
	function init( gl, water )
	{
		var i;

		// Water informations
		_vertCount    = water.vertCount;
		_waveHeight   = water.waveHeight;
		_waveSpeed    = water.waveSpeed;
		_waterLevel   = water.level;
		_animSpeed    = water.animSpeed;
		_wavePitch    = water.wavePitch;
		_waterOpacity = water.type !== 4 && water.type !== 6 ? 0.6 : 1.0;

		// No water ?
		if (!_vertCount) {
			return;
		}

		// Link program	if not loaded
		if (!_program) {
			_program = WebGL.createShaderProgram( gl, _vertexShader, _fragmentShader );
		}

		// Bind mesh
		_buffer = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, _buffer );
		gl.bufferData( gl.ARRAY_BUFFER, water.mesh, gl.STATIC_DRAW );

		function onTextureLoaded( texture, i ){
			_textures[i] = texture;
		}

		// Bind water textures
		for (i = 0; i < 32; ++i) {
			WebGL.texture( gl, water.images[i], onTextureLoaded, i );
		}
	}


	/**
	 * Render water
	 *
	 * @param {object} gl context
	 * @param {mat4} modelView
	 * @param {mat4} projection
	 * @param {object} fog structure
	 * @param {object} light structure
	 * @param {number} tick (game tick)
	 */
	function render( gl, modelView, projection, fog, light, tick )
	{
		// If no water, don't need to process.
		if (!_vertCount) {
			return;
		}

		var uniform   = _program.uniform;
		var attribute = _program.attribute;
		var frame     = tick / (1000/60); // 60fps

		gl.useProgram( _program );

		// Bind matrix
		gl.uniformMatrix4fv( uniform.uModelViewMat,  false, modelView );
		gl.uniformMatrix4fv( uniform.uProjectionMat, false, projection );

		// Fog settings
		gl.uniform1i(  uniform.uFogUse,   fog.use && fog.exist );
		gl.uniform1f(  uniform.uFogNear,  fog.near );
		gl.uniform1f(  uniform.uFogFar,   fog.far  );
		gl.uniform3fv( uniform.uFogColor, fog.color );

		// Enable all attributes
		gl.enableVertexAttribArray( attribute.aPosition );
		gl.enableVertexAttribArray( attribute.aTextureCoord );

		gl.bindBuffer( gl.ARRAY_BUFFER, _buffer );

		// Link attribute
		gl.vertexAttribPointer( attribute.aPosition,     3, gl.FLOAT, false, 5*4, 0 );
		gl.vertexAttribPointer( attribute.aTextureCoord, 2, gl.FLOAT, false, 5*4, 3*4 );

		// Textures
		gl.activeTexture( gl.TEXTURE0 );
		gl.uniform1i( uniform.uDiffuse, 0 );

		// Water infos
		gl.uniform1f( uniform.uWaveHeight,  _waveHeight );
		gl.uniform1f( uniform.uOpacity,     _waterOpacity );
		gl.uniform1f( uniform.uWavePitch,   _wavePitch );
		gl.uniform1f( uniform.uWaterOffset, frame * _waveSpeed % 360 - 180);

		// Send mesh
		gl.bindTexture( gl.TEXTURE_2D, _textures[ frame / _animSpeed % 32 | 0 ] );
		gl.drawArrays(  gl.TRIANGLES,  0, _vertCount );
	
		// Is it needed ?
		gl.disableVertexAttribArray( attribute.aPosition );
		gl.disableVertexAttribArray( attribute.aTextureCoord );
	}


	/**
	 * Clean texture/buffer from memory
	 *
	 * @param {object} gl context
	 */
	function free( gl )
	{
		var i;

		if (_buffer) {
			gl.deleteBuffer( _buffer );
			_buffer = null;
		}

		if (_program) {
			gl.deleteProgram( _program );
			_program = null;
		}

		for (i = 0; i < 32; ++i) {
			if (_textures[i]) {
				gl.deleteTexture(_textures[i]);
				_textures[i] = null;
			}
		}
	}


	/**
	 * Export
	 */
	return {
		init:   init,
		free:   free,
		render: render
	};
});