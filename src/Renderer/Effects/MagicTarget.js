/**
 * Renderer/Effects/MagicTarget.js
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
	var glMatrix = require('Utils/gl-matrix');
	var SkillId  = require('DB/Skills/SkillConst');
	var Client   = require('Core/Client');
	var Altitude = require('Renderer/Map/Altitude');


	/**
	 * @var {WebGLTexture}
	 */
	var _texture;


	/**
	 * @var {WebGLProgram}
	 */
	var _program;


	/**
	 * @var {mat4}
	 */
	var mat4 = glMatrix.mat4;


	/**
	 * @var {mat4} rotation matrix
	 */
	var _matrix = mat4.create();


	/**
	 * @var {object} CastSize for each skill
	 */
	var CastSize = {};
	CastSize[ SkillId.MG_SAFETYWALL ]     =  1;
	CastSize[ SkillId.MG_FIREWALL ]       =  1;
	CastSize[ SkillId.MG_THUNDERSTORM ]   =  5;
	CastSize[ SkillId.AL_WARP ]           =  1;
	CastSize[ SkillId.PR_SANCTUARY ]      =  7;
	CastSize[ SkillId.PR_MAGNUS ]         =  7;
	CastSize[ SkillId.WZ_FIREPILLAR ]     =  1;
	CastSize[ SkillId.WZ_METEOR ]         = 13;
	CastSize[ SkillId.WZ_VERMILION ]      = 13;
	CastSize[ SkillId.WZ_STORMGUST ]      = 13;
	CastSize[ SkillId.WZ_HEAVENDRIVE ]    =  7;
	CastSize[ SkillId.WZ_QUAGMIRE ]       =  7;
	CastSize[ SkillId.AM_DEMONSTRATION ]  =  1;
	CastSize[ SkillId.AM_CANNIBALIZE ]    =  1;
	CastSize[ SkillId.AM_SPHEREMINE ]     =  1;
	CastSize[ SkillId.SA_VOLCANO ]        = 13;
	CastSize[ SkillId.SA_DELUGE ]         = 13;
	CastSize[ SkillId.SA_VIOLENTGALE ]    = 13;
	CastSize[ SkillId.SA_LANDPROTECTOR]   = 13;
	CastSize[ SkillId.CR_SLIMPITCHER ]    =  7;
	CastSize[ SkillId.HW_GANBANTEIN ]     =  1;
	CastSize[ SkillId.HW_GRAVITATION ]    =  7;
	CastSize[ SkillId.CR_CULTIVATION ]    =  7;


	/**
	 * @var {string} Vertex Shader
	 */
	var _vertexShader   = [
		'attribute vec3 aPosition;',
		'attribute vec2 aTextureCoord;',

		'varying vec2 vTextureCoord;',

		'uniform mat4 uModelViewMat;',
		'uniform mat4 uProjectionMat;',
		'uniform mat4 uRotationMat;',

		'void main(void) {',
			'gl_Position    = uProjectionMat * uModelViewMat * vec4( aPosition, 1.0);',
			'gl_Position.z -= 0.01;',

			'vTextureCoord  = (uRotationMat * vec4( aTextureCoord - 0.5, 1.0, 1.0)).xy + 0.5;',
		'}'
	].join('\n');


	/**
	 * @var {string} Fragment Shader
	 */
	var _fragmentShader = [
		'varying vec2 vTextureCoord;',

		'uniform sampler2D uDiffuse;',

		'uniform bool  uFogUse;',
		'uniform float uFogNear;',
		'uniform float uFogFar;',
		'uniform vec3  uFogColor;',

		'void main(void) {',
			'vec4 texture = texture2D( uDiffuse,  vTextureCoord.st );',

			'if (texture.a == 0.0) {',
			'	discard;',
			'}',

			'gl_FragColor = texture;',

			'if (uFogUse) {',
				'float depth     = gl_FragCoord.z / gl_FragCoord.w;',
				'float fogFactor = smoothstep( uFogNear, uFogFar, depth );',
				'gl_FragColor    = mix( gl_FragColor, vec4( uFogColor, gl_FragColor.w ), fogFactor );',
			'}',
		'}'
	].join('\n');


	/**
	 * MagicTarget constructor
	 *
	 * @param {number} position x
	 * @param {number} position y
	 * @param {number} cast size
	 * @param {number} tick to remove it
	 */
	function MagicTarget( id, x, y, endLifeTime )
	{
		this.x           = x;
		this.y           = y;
		this.size        = CastSize[id] || 1;
		this.endLifeTime = endLifeTime;
	}


	/**
	 * Preparing for render
	 *
	 * @param {object} webgl context
	 */
	MagicTarget.prototype.init = function init( gl )
	{
		var data       = Altitude.generatePlane( this.x, this.y, this.size);
		this.buffer    = gl.createBuffer();
		this.vertCount = data.length / 5;

		gl.bindBuffer( gl.ARRAY_BUFFER, this.buffer );
		gl.bufferData( gl.ARRAY_BUFFER, data, gl.STATIC_DRAW );

		this.ready  = true;
	};


	/**
	 * Destroying data
	 *
	 * @param {object} webgl context
	 */
	MagicTarget.prototype.free = function free( gl )
	{
		gl.deleteBuffer(this.buffer);
		this.ready = false;
	};


	/**
	 * Rendering cast
	 *
	 * @param {object} wegl context
	 */
	MagicTarget.prototype.render = function render( gl, tick )
	{
		var attribute = _program.attribute;

		gl.bindBuffer( gl.ARRAY_BUFFER, this.buffer );

		gl.vertexAttribPointer( attribute.aPosition,     3, gl.FLOAT, false, 5*4,  0   );
		gl.vertexAttribPointer( attribute.aTextureCoord, 2, gl.FLOAT, false, 5*4,  3*4 );
		gl.drawArrays( gl.TRIANGLES, 0, this.vertCount );

		this.needCleanUp = this.endLifeTime < tick;
	};





	/**
	 * Initialize effect
	 * 
	 * @param {object} webgl context
	 */
	MagicTarget.init = function init(gl)
	{
		_program = WebGL.createShaderProgram( gl, _vertexShader, _fragmentShader );

		Client.loadFile('data/texture/effect/magic_target.tga', function(buffer) {
			WebGL.texture( gl, buffer, function(texture) {
				_texture = texture;
				MagicTarget.ready = true;
			});
		});
	};


	/**
	 * @var {boolean} should we render it before entities ?
	 */
	MagicTarget.renderBeforeEntities = true;


	/**
	 * Destroy objects
	 *
	 * @param {object} webgl context
	 */
	MagicTarget.free = function free(gl)
	{
		if (_texture) {
			gl.deleteTexture(_texture);
			_texture = null;
		}

		if (_program) {
			gl.deleteProgram(_program);
			_program = null;
		}

		this.ready = false;
	};


	/**
	 * Before render, set up program
	 *
	 * @param {object} webgl context
	 */
	MagicTarget.beforeRender = function beforeRender(gl, modelView, projection, fog, tick)
	{
		var uniform   = _program.uniform;
		var attribute = _program.attribute;

		mat4.identity(_matrix);
		mat4.rotateZ( _matrix, _matrix, (tick/1000*40) / 180 * Math.PI);

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
	};


	/**
	 * After render, clean attributes
	 *
	 * @param {object} webgl context
	 */
	MagicTarget.afterRender = function afterRender(gl)
	{
		gl.disableVertexAttribArray( _program.attribute.aPosition );
		gl.disableVertexAttribArray( _program.attribute.aTextureCoord );
	};


	/**
	 * Export
	 */
	return MagicTarget;
});