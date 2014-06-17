/**
 * Renderer/Effects/StrEffect.js
 *
 * Rendering Str File object
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(['Utils/WebGL', 'Utils/gl-matrix', 'Core/Client'], function( WebGL, glMatrix, Client )
{
	'use strict';


	var mat4 = glMatrix.mat4;


	/**
	 * Generic Vertex Shader
	 * @var {string}
	 */
	var _vertexShader = [
		'attribute vec2 aPosition;',
		'attribute vec2 aTextureCoord;',

		'varying vec2 vTextureCoord;',

		'uniform mat4 uModelViewMat;',
		'uniform mat4 uProjectionMat;',

		'uniform mat4 uSpriteAngle;',
		'uniform vec3 uSpritePosition;',
		'uniform vec2 uSpriteOffset;',

		'const float pixelRatio = 1.0 / 35.0;',

		'mat4 Project( mat4 mat, vec3 pos) {',

			// xyz = x(-z)y + middle of cell (0.5)
			'float x =  pos.x + 0.5;',
			'float y = -pos.z;',
			'float z =  pos.y + 0.5;',

			// Matrix translation
			'mat[3].x += mat[0].x * x + mat[1].x * y + mat[2].x * z;',
			'mat[3].y += mat[0].y * x + mat[1].y * y + mat[2].y * z;',
			'mat[3].z += mat[0].z * x + mat[1].z * y + mat[2].z * z;',
			'mat[3].w += mat[0].w * x + mat[1].w * y + mat[2].w * z;',

			// Spherical billboard
			'mat[0].xyz = vec3( 1.0, 0.0, 0.0 );',
			'mat[1].xyz = vec3( 0.0, 1.0, 0.0 );',
			'mat[2].xyz = vec3( 0.0, 0.0, 1.0 );',

			'return mat;',
		'}',

		'void main(void) {',
			'vTextureCoord = aTextureCoord;',

			// Calculate position base on angle and sprite offset/size
			'vec4 position = uSpriteAngle * vec4( aPosition.x * pixelRatio, -aPosition.y * pixelRatio, 0.0, 1.0 );',
			'position.x   += uSpriteOffset.x * pixelRatio;',
			'position.y   -= uSpriteOffset.y * pixelRatio + 0.5;',

			// Project to camera plane
			'gl_Position    = uProjectionMat * Project(uModelViewMat, uSpritePosition) * position;',
			'gl_Position.z -= 0.1;',
		'}'
	].join('\n');


	/**
	 * Generic Fragment Shader
	 * @var {string}
	 */
	var _fragmentShader = [
		'varying vec2 vTextureCoord;',

		'uniform vec4 uSpriteColor;',
		'uniform sampler2D uDiffuse;',

		'uniform bool  uFogUse;',
		'uniform float uFogNear;',
		'uniform float uFogFar;',
		'uniform vec3  uFogColor;',

		'void main(void) {',
			'gl_FragColor = texture2D( uDiffuse, vTextureCoord.st ) * uSpriteColor;',
			'if ( gl_FragColor.a == 0.0 ) {',
				'discard;',
			'}',

			'if ( uFogUse ) {',
				'float depth     = gl_FragCoord.z / gl_FragCoord.w;',
				'float fogFactor = smoothstep( uFogNear, uFogFar, depth );',
				'gl_FragColor    = mix( gl_FragColor, vec4( uFogColor, gl_FragColor.w ), fogFactor );',
			'}',
		'}'
	].join('\n');


	/**
	 * Look up table D3DX => OPENGL
	 */
	var D3DBLEND = {};


	/**
	 * @var {WebGLProgram}
	 */
	var _program = null;


	/**
	 * @var {WebGLBuffer}
	 */
	var _buffer = null;


	/**
	 * @var {float[16]} buffer
	 */
	var _bufferData = new Float32Array(4 * 4);


	/**
	 * @var mat4 matrix to generate rotation
	 */
	var _matrix = mat4.create();


	/**
	 * @var {number} last angle
	 */
	var _lastAngle = -1;


	/**
	 * StrEffect constructor
	 *
	 * @param {string} str effect file
	 */
	function StrEffect( filename, position, tick )
	{
		this.filename   = filename;
		this.startTick  = tick;
		this.position   = position;

		// If can't render it, just remove it.
		Client.loadFile( this.filename, null, function(){
			this.needCleanUp = true;
		}.bind(this));
	}


	/**
	 * Preparing for render
	 *
	 * @param {object} webgl context
	 */
	StrEffect.prototype.init = function init( gl )
	{
		this.ready = true;
	};


	/**
	 * Destroying data
	 *
	 * @param {object} webgl context
	 */
	StrEffect.prototype.free = function free( gl )
	{
		this.ready = false;
	};


	/**
	 * Render in 3D effect
	 *
	 * @param {object} gl
	 * @param {number} tick
	 */
	StrEffect.prototype.render = function renderClosure()
	{
		var anim = {
			frame     : 0,
			type      : 0,
			aniframe  : 0,
			anitype   : 0,
			srcalpha  : 1,
			destalpha : 1,
			mtpreset  : 0,
			delay     : 0.0,
			angle     : 0.0,
			color     : new Float32Array(4),
			pos       : new Float32Array(2),
			uv        : new Float32Array(8),
			xy        : new Float32Array(8)
		};

		return function render( gl, tick )
		{
			var strFile, layer;
			var i, keyIndex;

			strFile = Client.loadFile( this.filename );

			// Not loaded yet
			if (strFile === null) {
				return;
			}

			keyIndex = (tick - this.startTick) / 1000 * strFile.fps;

			for (i = 0; i < strFile.layernum; i++) {
				layer = strFile.layers[i];

				if (layer.materials.length) {
					if (calculateAnimation( layer, keyIndex, anim)) {
						if (layer.materials[anim.aniframe | 0]) {
							this.renderAnimation( gl, layer.materials[anim.aniframe | 0], anim);
						}
					}
				}
			}

			// animation ended
			if (keyIndex >= strFile.maxKey) {
				this.needCleanUp = true;
			}
		};
	}();


	/**
	 * Setup geometries, send data to GPU
	 *
	 * @param {object} webgl context
	 * @param {glTexture} webgl texture
	 * @param {StrAnimation} animation object
	 */
	StrEffect.prototype.renderAnimation = function renderAnimation( gl, material, anim )
	{
		var uniform   = _program.uniform;
		var attribute = _program.attribute;

		// Update geometries
		_bufferData[0]  = anim.xy[0];
		_bufferData[1]  = anim.xy[4];
		_bufferData[2]  = 0; //anim.uv[0];
		_bufferData[3]  = 0; //anim.uv[1];

		_bufferData[4]  = anim.xy[1];
		_bufferData[5]  = anim.xy[5];
		_bufferData[6]  = 1; //anim.uv[2];
		_bufferData[7]  = 0; //anim.uv[3];

		_bufferData[8]  = anim.xy[3];
		_bufferData[9]  = anim.xy[7];
		_bufferData[10] = 0; //anim.uv[4];
		_bufferData[11] = 1; //anim.uv[5];

		_bufferData[12] = anim.xy[2];
		_bufferData[13] = anim.xy[6];
		_bufferData[14] = 1; //anim.uv[6];
		_bufferData[15] = 1; //anim.uv[7];

		if (anim.angle !== _lastAngle) {
			mat4.identity(_matrix);
			mat4.rotateZ( _matrix, _matrix, - anim.angle / 180 * Math.PI );
			_lastAngle = anim.angle;
		}

		anim.pos[0] -= 320;
		anim.pos[1] -= 320;

		// Send effect parameters
		gl.uniform4fv( uniform.uSpriteColor,    anim.color );
		gl.uniform2fv( uniform.uSpriteOffset,   anim.pos );
		gl.uniform3fv( uniform.uSpritePosition, this.position );

		gl.uniformMatrix4fv( uniform.uSpriteAngle, false, _matrix );

		// Send new buffer
		gl.bindBuffer( gl.ARRAY_BUFFER, _buffer );

		// Link attribute
		gl.vertexAttribPointer( attribute.aPosition,     2, gl.FLOAT, false,  4*4, 0*4 );
		gl.vertexAttribPointer( attribute.aTextureCoord, 2, gl.FLOAT, false,  4*4, 2*4 );

		gl.bufferData( gl.ARRAY_BUFFER, _bufferData, gl.STREAM_DRAW );

		// Send texture and data
		gl.blendFunc( D3DBLEND[anim.srcalpha], D3DBLEND[anim.destalpha] );
		gl.bindTexture( gl.TEXTURE_2D, material );
		gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
	};


	/**
	 * Calculate effect animation base on the keyframe structure.
	 *
	 * @param {STRLayer} layer
	 * @param {number} key index
	 * @param {object} animation structure
	 */
	function calculateAnimation( layer, keyIndex, result )
	{
		var i, delta;
		var animations, from, to;
		var lastFrame  = 0;
		var lastSource = 0;
		var fromId = -1, toId = -1;

		animations = layer.animations;

		// Animations are sorted by the loader
		for (i = 0; i < layer.anikeynum; ++i) {
			if (animations[i].frame <= keyIndex) {
				if (animations[i].type === 0) fromId = i;
				if (animations[i].type === 1) toId   = i;
			}
			lastFrame = Math.max(lastFrame, animations[i].frame);

			if (animations[i].type === 0) {
				lastSource = Math.max(lastSource, animations[i].frame);
			}
		}

		// Nothing to render
		if (fromId < 0 || (toId < 0 && lastFrame < keyIndex)) {
			return false;
		}

		from             = animations[fromId];
		to               = animations[toId];
		delta            = keyIndex - from.frame;
		result.srcalpha  = from.srcalpha;
		result.destalpha = from.destalpha;

		// Static frame (or frame that can't be updated)
		if (toId !== fromId + 1 || to.frame !== from.frame) {

			// No other source
			if (to && lastSource <= from.frame) {
				return false;
			}

			result.angle     = from.angle;
			result.aniframe  = from.aniframe;

			result.color.set(from.color);
			result.pos.set(from.pos);
			result.uv.set(from.uv);
			result.xy.set(from.xy);

			return true;
		}

		// Morph animation
		result.color[0] = from.color[0] + to.color[0] * delta;
		result.color[1] = from.color[1] + to.color[1] * delta;
		result.color[2] = from.color[2] + to.color[2] * delta;
		result.color[3] = from.color[3] + to.color[3] * delta;

		result.uv[0] = from.uv[0] + to.uv[0] * delta;
		result.uv[1] = from.uv[1] + to.uv[1] * delta;
		result.uv[2] = from.uv[2] + to.uv[2] * delta;
		result.uv[3] = from.uv[3] + to.uv[3] * delta;
		result.uv[4] = from.uv[4] + to.uv[4] * delta;
		result.uv[5] = from.uv[5] + to.uv[5] * delta;
		result.uv[6] = from.uv[6] + to.uv[6] * delta;
		result.uv[7] = from.uv[7] + to.uv[7] * delta;

		result.xy[0] = from.xy[0] + to.xy[0] * delta;
		result.xy[1] = from.xy[1] + to.xy[1] * delta;
		result.xy[2] = from.xy[2] + to.xy[2] * delta;
		result.xy[3] = from.xy[3] + to.xy[3] * delta;
		result.xy[4] = from.xy[4] + to.xy[4] * delta;
		result.xy[5] = from.xy[5] + to.xy[5] * delta;
		result.xy[6] = from.xy[6] + to.xy[6] * delta;
		result.xy[7] = from.xy[7] + to.xy[7] * delta;

		result.angle  = from.angle  + to.angle  * delta;
		result.pos[0] = from.pos[0] + to.pos[0] * delta;
		result.pos[1] = from.pos[1] + to.pos[1] * delta;


		switch (to.anitype) {
			default: // bug fix
				result.aniframe = 0;
				break;

			case 1: // normal
				result.aniframe = from.aniframe + to.aniframe * delta;
				break;

			case 2: // Stop at end
				result.aniframe = Math.min(from.aniframe + to.delay * delta, layer.texcnt - 1);
				break;

			case 3: // Repeat
				result.aniframe = (from.aniframe + to.delay * delta) % layer.texcnt;
				break;

			case 4: // play reverse infinitly
				result.aniframe = (from.aniframe - to.delay * delta) % layer.texcnt;
				break;
		}

		return true;
	}


	/**
	 * Initialize StrEffect
	 *
	 * @param {object} gl context
	 */
	StrEffect.init = function init( gl )
	{
		if (!_buffer) {
			_buffer = gl.createBuffer();
		}

		if (!_program) {
			_program = WebGL.createShaderProgram( gl, _vertexShader, _fragmentShader );
		}

		D3DBLEND[1]  = gl.ZERO;
		D3DBLEND[2]  = gl.ONE;
		D3DBLEND[3]  = gl.SRC_COLOR;
		D3DBLEND[4]  = gl.ONE_MINUS_SRC_COLOR;
		D3DBLEND[5]  = gl.SRC_ALPHA;
		D3DBLEND[6]  = gl.ONE_MINUS_SRC_ALPHA;
		D3DBLEND[7]  = gl.DST_ALPHA;
		D3DBLEND[8]  = gl.ONE_MINUS_DST_ALPHA;
		D3DBLEND[9]  = gl.DST_COLOR;
		D3DBLEND[10] = gl.ONE_MINUS_DST_COLOR;
		D3DBLEND[11] = gl.SRC_ALPHA_SATURATE;
		D3DBLEND[14] = gl.CONSTANT_COLOR;
		D3DBLEND[15] = gl.ONE_MINUS_CONSTANT_ALPHA;

		this.ready = true;
	};


	/**
	 * Destroy Effect
	 *
	 * @param {object} webgl context
	 */
	StrEffect.free = function free( gl )
	{
		if (_program) {
			gl.deleteProgram(_program);
			_program = null;
		}

		if (_buffer) {
			gl.deleteBuffer(_buffer);
			_buffer = null;
		}

		this.ready = false;
	};


	/**
	 * Bind context
	 *
	 * @param {object} gl context
	 * @param {mat4} modelview
	 * @param {mat4} projection
	 * @param {object} fog structure
	 * @param {number} tick
	 */
	StrEffect.beforeRender = function beforeRender( gl, modelView, projection, fog, tick )
	{
		var uniform   = _program.uniform;
		var attribute = _program.attribute;

		gl.depthMask(false);
		gl.useProgram( _program );
		gl.uniformMatrix4fv( uniform.uModelViewMat,  false,  modelView );
		gl.uniformMatrix4fv( uniform.uProjectionMat, false,  projection );

		// Fog settings
		gl.uniform1f(  uniform.uFogNear,  fog.near * 100 );
		gl.uniform1f(  uniform.uFogFar,   fog.far  * 150 );
		gl.uniform3fv( uniform.uFogColor, fog.color );

		// Textures
		gl.uniform1i( uniform.uDiffuse, 0 );

		// Enable all attributes
		gl.enableVertexAttribArray( attribute.aPosition );
		gl.enableVertexAttribArray( attribute.aTextureCoord );

		gl.activeTexture( gl.TEXTURE0 );
	};


	/**
	 * Unbind 3D Context
	 *
	 * @param {object} gl context
	 */
	StrEffect.afterRender = function afterRender( gl )
	{
		gl.depthMask(true);

		gl.disableVertexAttribArray( _program.attribute.aPosition );
		gl.disableVertexAttribArray( _program.attribute.aTextureCoord );

		gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
	};


	/**
	 * Export
	 */
	return StrEffect;
});