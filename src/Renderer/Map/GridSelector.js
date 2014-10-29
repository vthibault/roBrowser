/**
 * Renderer/Map/GridSelectior.js
 *
 * Rendering Grid Selector
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define( ['Renderer/Map/Altitude', 'Core/Client', 'Utils/WebGL', 'Utils/Texture'],
function(              Altitude,        Client,         WebGL,         Texture )
{
	'use strict';


	/**
	 * @var {WebGLProgram}
	 */
	var _program = null;


	/**
	 * param {WebGLBuffer}
	 */
	var _buffer = null;


	/**
	 * @var {WebGLTexture} texture of the grid
	 */
	var _texture = null;


	/**
	 * @var {string} last position rendered
	 */
	var _xy = null;


	/**
	 * WebGL buffer array
	 * x, y, z, u, v
	 */
	var _buffer_data = new Float32Array([
		0.0, 0.0, 0.0, 0.0, 0.0,
		0.0, 0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 0.0, 1.0,
		0.0, 0.0, 0.0, 1.0, 1.0
	]);


	/**
	 * @var {string} vertex shader
	 */
	var _vertexShader   = [
		'attribute vec3 aPosition;',
		'attribute vec2 aTextCoord;',

		'varying vec2 vTextureCoord;',

		'uniform mat4 uModelViewMat;',
		'uniform mat4 uProjectionMat;',

		'void main(void) {',
		'	gl_Position    = uProjectionMat * uModelViewMat * vec4( aPosition.xyz, 1.0) ;',
		'	gl_Position.z -= 0.01;',
		'	vTextureCoord  = aTextCoord;',
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

		'void main(void) {',
		'	gl_FragColor = texture2D( uDiffuse, vTextureCoord.st);',

		'	if (uFogUse) {',
		'		float depth     = gl_FragCoord.z / gl_FragCoord.w;',
		'		float fogFactor = smoothstep( uFogNear, uFogFar, depth );',
		'		gl_FragColor    = mix( gl_FragColor, vec4( uFogColor, gl_FragColor.w ), fogFactor );',
		'	}',
		'}'
	].join('\n');


	/**
	 * Initialize Grid
	 *
	 * @param {object} gl context
	 */
	function init( gl )
	{
		Client.loadFile('data/texture/grid.tga', function(buffer){
			Texture.load( buffer, function(success){
				if (!success) {
					return;
				}

				var canvas = document.createElement('canvas');
				var ctx    = canvas.getContext('2d');

				canvas.width  = WebGL.toPowerOfTwo(this.width);
				canvas.height = WebGL.toPowerOfTwo(this.height);
				
				ctx.globalAlpha = 0.6;
				ctx.drawImage( this, 0, 0, canvas.width, canvas.height );
				ctx.fillStyle = 'rgb( 50, 240, 160)';
				ctx.globalCompositeOperation = 'source-atop';
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				_texture = gl.createTexture();
				gl.bindTexture( gl.TEXTURE_2D, _texture );
				gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas );
				gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				gl.generateMipmap( gl.TEXTURE_2D );
			});
		});

		_buffer  = gl.createBuffer();
		_program = WebGL.createShaderProgram( gl, _vertexShader, _fragmentShader );

		gl.bindBuffer( gl.ARRAY_BUFFER, _buffer );
	}


	/**
	 * Render Grid Selection
	 *
	 * @param {object} gl context
	 * @param {mat4} modelView
	 * @param {mat4} projection
	 * @param {object} fog structure
	 * @param {number} x
	 * @param {number} y
	 */
	function render( gl, modelView, projection, fog, x, y )
	{
		// Texture not loaded yet
		if (!_texture) {
			return;
		}

		var uniform   = _program.uniform;
		var attribute = _program.attribute;
		var z;

		gl.useProgram( _program );

		// Bind matrix
		gl.uniformMatrix4fv( uniform.uModelViewMat,  false, modelView );
		gl.uniformMatrix4fv( uniform.uProjectionMat, false, projection );

		// Fog settings
		gl.uniform1i(  uniform.uFogUse,   fog.use && fog.exist );
		gl.uniform1f(  uniform.uFogNear,  fog.near );
		gl.uniform1f(  uniform.uFogFar,   fog.far  );
		gl.uniform3fv( uniform.uFogColor, fog.color );

		gl.enableVertexAttribArray( attribute.aPosition );
		gl.enableVertexAttribArray( attribute.aTextCoord );
		gl.bindBuffer( gl.ARRAY_BUFFER, _buffer );

		// Link attributes
		gl.vertexAttribPointer( attribute.aPosition,  3, gl.FLOAT, false, 5*4, 0 );
		gl.vertexAttribPointer( attribute.aTextCoord, 2, gl.FLOAT, false, 5*4, 3*4);

		// Textures
		gl.activeTexture( gl.TEXTURE0 );
		gl.uniform1i( uniform.uDiffuse, 0 );

		// Update buffer only if there is a change
		if (_xy !== x+''+y) {
			_xy = x+''+y;
			z   = Altitude.getCell(x, y);

			_buffer_data[0]  = _buffer_data[10] = x+0;
			_buffer_data[2]  = _buffer_data[7]  = y+0;
			_buffer_data[5]  = _buffer_data[15] = x+1;
			_buffer_data[12] = _buffer_data[17] = y+1;
			_buffer_data[1]  = z[0];
			_buffer_data[6]  = z[1];
			_buffer_data[11] = z[2];
			_buffer_data[16] = z[3];

			gl.bufferData( gl.ARRAY_BUFFER, _buffer_data, gl.STREAM_DRAW );
		}

		// Send mesh
		gl.bindTexture( gl.TEXTURE_2D, _texture );
		gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

		// Is it needed ?
		gl.disableVertexAttribArray( attribute.aPosition );
		gl.disableVertexAttribArray( attribute.aTextCoord );
	}



	/**
	 * Clean texture/buffer from memory
	 *
	 * @param {object} gl context
	 */
	function free( gl )
	{
		if (_buffer) {
			gl.deleteBuffer( _buffer );
			_buffer = null;
		}

		if (_texture) {
			gl.deleteTexture( _texture );
			_texture = null;
		}

		if (_program) {
			gl.deleteProgram( _program );
			_program = null;
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
