/**
 * Renderer/Map/Ground.js
 *
 * Rendering ground
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(['Utils/WebGL', 'Utils/Texture', 'Preferences/Map'],
function(      WebGL,         Texture,   Preferences )
{
	'use strict';


	/**
	 * @var {WebGLProgram}
	 */
	var _program       = null;


	/**
	 * @var {WebGBLuffer}
	 */
	var _buffer = null;


	/**
	 * @var {WebGLTexture}
	 */
	var _lightmap = null;


	/**
	 * @var {WebGLTexture}
	 */
	var _tileColor = null;


	/**
	 * @var {WebGLTexture}
	 */
	var _textureAtlas = null;


	/**
	 * @var {WebGLTexture}
	 */
	var _shadowMap = null;


	/**
	 * @var {number} total vertices count
	 */
	var _vertCount = 0;


	/**
	 * @var {number} Ground width
	 */
	var _width = 0;


	/**
	 * @var {number} Ground height
	 */
	var _height = 0;


	/**
	 * @var {string} Vertex Shader
	 */
	var _vertexShader   = [
		'attribute vec3 aPosition;',
		'attribute vec3 aVertexNormal;',
		'attribute vec2 aTextureCoord;',
		'attribute vec2 aLightmapCoord;',
		'attribute vec2 aTileColorCoord;',

		'varying vec2 vTextureCoord;',
		'varying vec2 vLightmapCoord;',
		'varying vec2 vTileColorCoord;',
		'varying float vLightWeighting;',

		'uniform mat4 uModelViewMat;',
		'uniform mat4 uProjectionMat;',

		'uniform vec3 uLightDirection;',
		'uniform mat3 uNormalMat;',

		'void main(void) {',
			'gl_Position     = uProjectionMat * uModelViewMat * vec4( aPosition, 1.0);',

			'vTextureCoord   = aTextureCoord;',
			'vLightmapCoord  = aLightmapCoord;',
			'vTileColorCoord = aTileColorCoord;',

			'vec4 lDirection  = uModelViewMat * vec4( uLightDirection, 0.0);',
			'vec3 dirVector   = normalize(lDirection.xyz);',
			'float dotProduct = dot( uNormalMat * aVertexNormal, dirVector );',
			'vLightWeighting  = max( dotProduct, 0.1 );',
		'}'
	].join('\n');


	/**
	 * @var {string} Fragment Shader
	 */
	var _fragmentShader = [
		'varying vec2 vTextureCoord;',
		'varying vec2 vLightmapCoord;',
		'varying vec2 vTileColorCoord;',
		'varying float vLightWeighting;',

		'uniform sampler2D uDiffuse;',
		'uniform sampler2D uLightmap;',
		'uniform sampler2D uTileColor;',
		'uniform bool uLightMapUse;',

		'uniform bool  uFogUse;',
		'uniform float uFogNear;',
		'uniform float uFogFar;',
		'uniform vec3  uFogColor;',

		'uniform vec3  uLightAmbient;',
		'uniform vec3  uLightDiffuse;',
		'uniform float uLightOpacity;',

		'void main(void) {',

			'vec4 texture = texture2D( uDiffuse,  vTextureCoord.st );',
			'float lightWeight = 1.0;',

			'if (texture.a == 0.0) {',
			'	discard;',
			'}',

			'if (vTileColorCoord.st != vec2(0.0,0.0)) {',
			'	texture    *= texture2D( uTileColor, vTileColorCoord.st);',
			'	lightWeight = vLightWeighting;',
			'}',

			'vec3 Ambient    = uLightAmbient * uLightOpacity;',
			'vec3 Diffuse    = uLightDiffuse * lightWeight;',

			'if (uLightMapUse) {',
				'vec4 lightmap   = texture2D( uLightmap, vLightmapCoord.st);',
				'vec4 LightColor = vec4( (Ambient + Diffuse) * lightmap.a, 1.0);',
				'vec4 ColorMap   = vec4( lightmap.rgb, 0.0 );',

				'gl_FragColor    = texture * clamp(LightColor, 0.0, 1.0) + ColorMap;',
			'}',
			'else {',
				'vec4 LightColor = vec4( Ambient + Diffuse, 1.0);',
				'gl_FragColor    = texture * clamp(LightColor, 0.0, 1.0);',
			'}',

			'if (uFogUse) {',
				'float depth     = gl_FragCoord.z / gl_FragCoord.w;',
				'float fogFactor = smoothstep( uFogNear, uFogFar, depth );',
				'gl_FragColor    = mix( gl_FragColor, vec4( uFogColor, gl_FragColor.w ), fogFactor );',
			'}',
		'}'
	].join('\n');


	/**
	 * Render ground
	 *
	 * @param {object} gl context
	 * @param {mat4} modelView
	 * @param {mat4} projection
	 * @param {mat3} normalMat
	 * @param {object} fog structure
	 * @param {object} light structure
	 */
	function render( gl, modelView, projection, normalMat, fog, light )
	{
		var uniform = _program.uniform;
		var attribute = _program.attribute;

		gl.useProgram( _program );

		// Bind matrix
		gl.uniformMatrix4fv( uniform.uModelViewMat,  false, modelView );
		gl.uniformMatrix4fv( uniform.uProjectionMat, false, projection );
		gl.uniformMatrix3fv( uniform.uNormalMat,     false, normalMat );

		// Bind light
		gl.uniform3fv( uniform.uLightDirection, light.direction );
		gl.uniform1f(  uniform.uLightOpacity,   light.opacity );
		gl.uniform3fv( uniform.uLightAmbient,   light.ambient );
		gl.uniform3fv( uniform.uLightDiffuse,   light.diffuse );

		// Render lightmap ?
		gl.uniform1i(  uniform.uLightMapUse, Preferences.lightmap );

		// Fog settings
		gl.uniform1i(  uniform.uFogUse,   fog.use && fog.exist );
		gl.uniform1f(  uniform.uFogNear,  fog.near );
		gl.uniform1f(  uniform.uFogFar,   fog.far  );
		gl.uniform3fv( uniform.uFogColor, fog.color );

		// Enable all attributes
		gl.enableVertexAttribArray( attribute.aPosition );
		gl.enableVertexAttribArray( attribute.aVertexNormal );
		gl.enableVertexAttribArray( attribute.aTextureCoord );
		gl.enableVertexAttribArray( attribute.aLightmapCoord );
		gl.enableVertexAttribArray( attribute.aTileColorCoord );

		gl.bindBuffer( gl.ARRAY_BUFFER, _buffer );

		// Link attribute
		gl.vertexAttribPointer( attribute.aPosition,       3, gl.FLOAT, false, 12*4,  0   );
		gl.vertexAttribPointer( attribute.aVertexNormal,   3, gl.FLOAT, false, 12*4,  3*4 );
		gl.vertexAttribPointer( attribute.aTextureCoord,   2, gl.FLOAT, false, 12*4,  6*4 );
		gl.vertexAttribPointer( attribute.aLightmapCoord,  2, gl.FLOAT, false, 12*4,  8*4 );
		gl.vertexAttribPointer( attribute.aTileColorCoord, 2, gl.FLOAT, false, 12*4, 10*4 );

		// Texture Atlas
		gl.activeTexture( gl.TEXTURE0 );
		gl.bindTexture( gl.TEXTURE_2D, _textureAtlas );
		gl.uniform1i( uniform.uDiffuse, 0 );

		// LightMap
		gl.activeTexture( gl.TEXTURE1 );
		gl.bindTexture( gl.TEXTURE_2D, _lightmap );
		gl.uniform1i( uniform.uLightmap, 1 );

		// Tile Color
		gl.activeTexture( gl.TEXTURE2 );
		gl.bindTexture( gl.TEXTURE_2D, _tileColor );
		gl.uniform1i( uniform.uTileColor, 2 );

		// Send mesh
		gl.drawArrays(  gl.TRIANGLES, 0, _vertCount );

		// Is it needed ?
		gl.disableVertexAttribArray( attribute.aPosition );
		gl.disableVertexAttribArray( attribute.aVertexNormal );
		gl.disableVertexAttribArray( attribute.aTextureCoord );
		gl.disableVertexAttribArray( attribute.aLightmapCoord );
		gl.disableVertexAttribArray( attribute.aTileColorCoord );
	}


	/**
	 * Prepare lightmap and send it to GPU
	 * Create a lightmap image with size power of two
	 *
	 * @param {object} gl context
	 * @param {object} lightmap
	 * @param {number} size
	 */
	function initLightmap( gl, lightmap, size )
	{
		var width, height;

		width  = WebGL.toPowerOfTwo( Math.round( Math.sqrt(size) ) * 8 );
		height = WebGL.toPowerOfTwo( Math.ceil(  Math.sqrt(size) ) * 8 );

		if (!_lightmap) {
			_lightmap = gl.createTexture();
		}

		// Send texture to GPU
		gl.bindTexture( gl.TEXTURE_2D, _lightmap );
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, lightmap );

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.generateMipmap( gl.TEXTURE_2D );
	}


	/**
	 * Prepare Tile Color and send it to GPU
	 *
	 * @param {object} gl
	 * @param {Array} tilescolor
	 * @param {number} width
	 * @param {number} height
	 */
	function initTileColor( gl, tilescolor, width, height )
	{

		var _width, _height, i, count;
		var smooth, canvas, ctx, imageData, data;

		// Build image
		canvas        = document.createElement('canvas');
		canvas.width  = width;
		canvas.height = height;
		ctx           = canvas.getContext('2d');
		imageData     = ctx.createImageData(width, height);
		data          = imageData.data;
		count         = data.length;

		// Set Image pixel
		for (i = 0; i < count; ++i) {
			data[i] = tilescolor[i];
		}
		ctx.putImageData( imageData, 0, 0 );

		// Build Image with power of two texture * 2 (to smooth)
		_width        = WebGL.toPowerOfTwo( width );
		_height       = WebGL.toPowerOfTwo( height );
		smooth        = document.createElement('canvas');
		smooth.width  = _width;
		smooth.height = _height;
		ctx           = smooth.getContext('2d');

		ctx.fillStyle = 'black';
		ctx.fillRect( 0, 0, _width, _height);
		ctx.drawImage( canvas, 0, 0, _width, _height );

		// Send texture to GPU
		if (!_tileColor) {
			_tileColor = gl.createTexture();
		}

		gl.bindTexture( gl.TEXTURE_2D, _tileColor );
		gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, smooth );
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.generateMipmap( gl.TEXTURE_2D );
	}


	/**
	 * Prepare textures and send it to GPU
	 * Create a texture atlas where we put all textures to avoid drawcall and optimize perfs
	 *
	 * @param {Object} gl context
	 * @param {Array} textures 's filename
	 */
	function initTextures( gl, textures )
	{
		var i, count, width, height, _width, loaded;
		var canvas, ctx;

		// Find texture size
		count  = textures.length;
		_width = Math.round( Math.sqrt(count) );
		width  = WebGL.toPowerOfTwo( _width * 258 );
		height = WebGL.toPowerOfTwo( Math.ceil(  Math.sqrt(count) ) * 258 );

		// Create canvas where we put all textures
		canvas        = document.createElement('canvas');
		canvas.width  = width;
		canvas.height = height;
		ctx           = canvas.getContext('2d');
		loaded        = 0;


		function onTextureCompleteBuildAtlas( success, i )
		{
			if (success) {
				var x = (i % _width) * 258;
				var y = Math.floor(i / _width) * 258;
				ctx.drawImage( this, x + 0, y + 0, 258, 258 ); // generate border
				ctx.drawImage( this, x + 1, y + 1, 256, 256 );
			}

			if ((++loaded) === count) {
				onTextureAtlasComplete(gl, canvas);
			}
		}

		// Fetch all images, and draw them in a mega-texture
		for (i = 0; i < count; ++i) {
			Texture.load(textures[i], onTextureCompleteBuildAtlas, i);
		}
	}


	/**
	 * Send the texture atlas to GPU
	 *
	 * @param {object} gl
	 * @param {object} atlas - canvas texture
	 */
	function onTextureAtlasComplete( gl, atlas )
	{
		// Bind to GPU
		if (!_textureAtlas) {
			_textureAtlas = gl.createTexture();
		}

		gl.bindTexture( gl.TEXTURE_2D, _textureAtlas );
		gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

		gl.generateMipmap( gl.TEXTURE_2D );
	}


	/**
	 * Prepare ground data
	 *
	 * @param {object} gl context
	 * @param {object} data - ground
	 */
	function init( gl, data )
	{
		_vertCount = data.meshVertCount;
		_width     = data.width;
		_height    = data.height;
		_shadowMap = data.shadowMap;

		// Bind buffer, sending mesh to GPU
		if (!_buffer) {
			_buffer = gl.createBuffer();
		}

		// Link program	if not loaded
		if (!_program) {
			_program = WebGL.createShaderProgram( gl, _vertexShader, _fragmentShader );
		}

		gl.bindBuffer( gl.ARRAY_BUFFER, _buffer );
		gl.bufferData( gl.ARRAY_BUFFER, data.mesh, gl.STATIC_DRAW );

		// Send lightmap to GPU
		initLightmap( gl, data.lightmap, data.lightmapSize );

		// Send Tile color to GPU
		initTileColor( gl, data.tileColor, data.width, data.height );

		// Send textures to GPU
		initTextures( gl, data.textures );
	}



	/**
	 * Clean texture/buffer from memory
	 *
	 * @param {object} gl context
	 */
	function free( gl )
	{
		if (_lightmap) {
			gl.deleteTexture( _lightmap );
			_lightmap = null;
		}

		if (_tileColor) {
			gl.deleteTexture( _tileColor );
			_tileColor = null;
		}

		if (_textureAtlas) {
			gl.deleteTexture( _textureAtlas );
			_textureAtlas = null;
		}

		if (_buffer) {
			gl.deleteBuffer( _buffer );
			_buffer = null;
		}

		_shadowMap = null;
		_vertCount = 0;
	}


	/**
	 * Return shadow factor
	 *
	 * @param {number} x
	 * @param {number} y
	 * @return {number} shadow factor
	 */
	function getShadowFactor( x, y )
	{
		// Map not loadead yet
		if (!_shadowMap) {
			return 1.0;
		}

		var _x, _y, factor = 0;

		// Player is at cell center
		x += 0.5;
		y += 0.5;

		// Get index
		_x = Math.floor( x / 2 ) * 8;
		_y = Math.floor( y / 2 ) * 8;

		// Add floor percent
		_x += Math.min( ( x & 1 ? 4 : 0) + Math.floor( (x % 1) * 4 ), 6);
		_y += Math.min( ( y & 1 ? 4 : 0) + Math.floor( (y % 1) * 4 ), 6);

		// Smooth shadowmap
		for (y = -3; y < 3; ++y) {
			for (x = -3; x < 3; ++x) {
				factor += _shadowMap[ (_x+x) + (_y+y) * _width * 8];
			}
		}

		// Get back value
		return factor / (6*6) / 255;
	}


	/**
	 * Export
	 */
	return {
		init:            init,
		free:            free,
		render:          render,
		getShadowFactor: getShadowFactor
	};
});