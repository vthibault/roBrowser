/**
 * Renderer/SpriteRenderer.js
 *
 * Rendering sprite in 2D or 3D context
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(["Utils/WebGL", "Utils/gl-matrix", "./Camera"],
function(      WebGL,         glMatrix,      Camera )
{
	"use strict";


	/**
	 * Import
	 */
	var mat4 = glMatrix.mat4;


	/**
	 * Generic Vertex Shader
	 * @var {string}
	 */
	var _vertexShader = [
		"attribute vec2 aPosition;",
		"attribute vec2 aTextureCoord;",

		"varying vec2 vTextureCoord;",

		"uniform mat4 uModelViewMat;",
		"uniform mat4 uViewModelMat;",
		"uniform mat4 uProjectionMat;",

		"uniform vec2 uSpriteRendererSize;",
		"uniform vec2 uSpriteRendererOffset;",
		"uniform mat4 uSpriteRendererAngle;",
		"uniform vec3 uSpriteRendererPosition;",
		"uniform float uSpriteRendererDepth;",
		"uniform float uSpriteRendererZindex;",

		"void main(void) {",
			"vTextureCoord = aTextureCoord;",

			"vec3 CameraPosition = uViewModelMat[3].xyz;",
			"vec3 X = uViewModelMat[0].xyz;",
			"vec3 Y = uViewModelMat[1].xyz;",

			"vec2 offset = vec2(uSpriteRendererSize.x * aPosition.x, uSpriteRendererSize.y * aPosition.y);",
			"offset      = (uSpriteRendererAngle * vec4(offset, 0.0, 1.0)).xy;",
			"offset.x   += uSpriteRendererOffset.x;",
			"offset.y   -= uSpriteRendererOffset.y + 0.5;",

			"vec3 SpritePosition = vec3( uSpriteRendererPosition.x + 0.5, -uSpriteRendererPosition.z, uSpriteRendererPosition.y + 0.5);",
			"vec3 WorldPosition  = SpritePosition + (offset.x * X) + (offset.y * Y);",
			"vec4 Position = uModelViewMat * vec4(WorldPosition, 1.0);",

			"gl_Position = uProjectionMat * Position;",

			// - center of x axis
			// - offset y + 0.25 (avoid sprite collision at the bottom with the ground)
			"vec3 pos = SpritePosition + (uSpriteRendererSize.y * aPosition.y - uSpriteRendererOffset.y - 0.25) * Y;",

			// Project to vertical axis
			"vec3 unit = normalize(CameraPosition-pos);",
			"vec3 up   = vec3(0.0, 0.0, 1.0);",

			"float dotNumerator   = dot((SpritePosition - pos), up);",
			"float dotDenominator = dot(unit, up);",

			"if (dotDenominator != 0.0) {",
				"float length  = dotNumerator / dotDenominator;",
				"vec4 clip     = uProjectionMat * uModelViewMat * vec4(pos + unit * length, 1.0);",
				"gl_Position.z = clip.z * gl_Position.w / clip.w;",
			"}",

			// custom sprite depth
			"gl_Position.z -= uSpriteRendererZindex * 0.01 + uSpriteRendererDepth;",
		"}"
	].join("\n");


	/**
	 * Generic Fragment Shader
	 * @var {string}
	 */
	var _fragmentShader = [
		"varying vec2 vTextureCoord;",

		"uniform sampler2D uDiffuse;",
		"uniform sampler2D uPalette;",

		"uniform bool uUsePal;",
		"uniform vec4 uSpriteRendererColor;",

		"uniform bool  uFogUse;",
		"uniform float uFogNear;",
		"uniform float uFogFar;",
		"uniform vec3  uFogColor;",

		"uniform float uShadow;",
		"uniform vec2 uTextSize;",

		// With palette we don't have a good result because of the gl.NEAREST, so smooth it.
		"vec4 bilinearSample(vec2 uv, sampler2D indexT, sampler2D LUT) {",
			"vec2 TextInterval = 1.0 / uTextSize;",

			"float tlLUT = texture2D(indexT, uv ).x;",
			"float trLUT = texture2D(indexT, uv + vec2(TextInterval.x, 0.0)).x;",
			"float blLUT = texture2D(indexT, uv + vec2(0.0, TextInterval.y)).x;",
			"float brLUT = texture2D(indexT, uv + TextInterval).x;",

			"vec4 transparent = vec4( 0.5, 0.5, 0.5, 0.0);",

			"vec4 tl = tlLUT == 0.0 ? transparent : vec4( texture2D(LUT, vec2(tlLUT,1.0)).rgb, 1.0);",
			"vec4 tr = trLUT == 0.0 ? transparent : vec4( texture2D(LUT, vec2(trLUT,1.0)).rgb, 1.0);",
			"vec4 bl = blLUT == 0.0 ? transparent : vec4( texture2D(LUT, vec2(blLUT,1.0)).rgb, 1.0);",
			"vec4 br = brLUT == 0.0 ? transparent : vec4( texture2D(LUT, vec2(brLUT,1.0)).rgb, 1.0);",

			"vec2 f  = fract( uv.xy * uTextSize );",
			"vec4 tA = mix( tl, tr, f.x );",
			"vec4 tB = mix( bl, br, f.x );",

			"return mix( tA, tB, f.y );",
		"}",

		"void main(void) {",

			// Don't render if it's not shown.
			"if (uSpriteRendererColor.a == 0.0) {",
				"discard;",
			"}",

			// Calculate texture
			"vec4 texture;",
			"if (uUsePal) {",
				"texture = bilinearSample( vTextureCoord, uDiffuse, uPalette );",
			"}",
			"else {",
				"texture = texture2D( uDiffuse, vTextureCoord );",
			"}",

			// No alpha, skip.
			"if (texture.a == 0.0) {",
				"discard;",
			"}",

			// Apply shadow, apply color
			"texture.rgb   *= uShadow;",
			"gl_FragColor   = texture * uSpriteRendererColor;",

			// Fog feature
			"if (uFogUse) {",
				"float depth     = gl_FragCoord.z / gl_FragCoord.w;",
				"float fogFactor = smoothstep( uFogNear, uFogFar, depth );",
				"gl_FragColor    = mix( gl_FragColor, vec4( uFogColor, gl_FragColor.w ), fogFactor );",
			"}",
		"}"
	].join("\n");



	/**
	 * Sprite Renderer NameSpace
	 */
	var SpriteRenderer = {};


	/**
	 * @var {function} functions to use to render
	 */
	SpriteRenderer.render = null;


	/**
	 * @var {number} sprite shadow (mult * color)
	 */
	SpriteRenderer.shadow = 1.0;


	/**
	 * @var {number} sprite angle rotation
	 */
	SpriteRenderer.angle = 0;


	/**
	 * @var {number} depth
	 */
	SpriteRenderer.depth = 0.0;


	/**
	 * @var {number} z-index
	 */
	SpriteRenderer.zIndex = 0;


	/**
	 * @var {Float32Array[3]} sprite position in 3D world
	 */
	SpriteRenderer.position = new Float32Array(3);


	/**
	 * @var {Float32Array[4]} sprite color (color * color)
	 */
	SpriteRenderer.color = new Float32Array(4);


	/**
	 * @var {Float32Array[2]} sprite size
	 */
	SpriteRenderer.size = new Float32Array(2);


	/**
	 * @var {Float32Array[2]} sprite offset position
	 */
	SpriteRenderer.offset = new Float32Array(2);


	/**
	 * @var {object} sprite image information
	 */
	SpriteRenderer.image = {
		texture: null,
		palette: null,
		size:    new Float32Array(2)
	};


	/**
	 * @var {object} sprite imageData (for 2D context)
	 */
	SpriteRenderer.sprite = null;


	/**
	 * @var {object} sprite palette (for 2D context)
	 */
	SpriteRenderer.palette = null;


	/**
	 * @var {number} groupid used (avoid draw call)
	 */
	SpriteRenderer.groupId = 0;


	/**
	 * @var {WebGLProgram}
	 */
	var _program = null;


	/**
	 * @var {WebGLBuffer}
	 */
	var _buffer = null;


	/**
	 * @var {CanvasRenderingContext2D} canvas context
	 */
	var _ctx = null;


	/**
	 * @var {WebGLRenderingContext} 3d context
	 */
	var _gl = null;


	/**
	 * @var {number} group id
	 * Used to know if we have to bind texture again
	 */
	var _groupId = 0;


	/**
	 * @var {number} last group id
	 */
	var _lastGroupId = 0;


	/**
	 * @var {number} last shadow used
	 */
	var _shadow = null;


	/**
	 * @var {number} last rotation angle used
	 */
	var _angle = null;

	/**
	 * @var {number} last depth operation
	 */
	var _depth = null;


	/**
	 * @var {object} last texture used
	 */
	var _texture = null;


	/**
	 * @var {boolean} do we use palette ?
	 */
	var _usepal = null;


	/**
	 * @var {Uint16Array} position in 2D canvas 
	 */
	var _pos = new Uint16Array(2);


	/**
	 * @var {mat4} last generated matrix (used for rotation)
	 */
	var _matrix = new Float32Array(4*4);


	/**
	 * Initialize SpriteRenderer Renderer
	 *
	 * @param {object} gl context
	 */
	SpriteRenderer.init = function init( gl )
	{
		if (!_buffer) {
			_buffer = gl.createBuffer();
			gl.bindBuffer( gl.ARRAY_BUFFER, _buffer );
			gl.bufferData( gl.ARRAY_BUFFER, new Float32Array([
				-0.5, +0.5, 0.0, 0.0,
				+0.5, +0.5, 1.0, 0.0,
				-0.5, -0.5, 0.0, 1.0,
				+0.5, -0.5, 1.0, 1.0
			]), gl.STATIC_DRAW );
		}

		if (!_program) {
			_program = WebGL.createShaderProgram( gl, _vertexShader, _fragmentShader );
		}
	};


	/**
	 * Initialize 3D Context
	 *
	 * @param {object} gl context
	 * @param {mat4} modelView
	 * @param {mat4} projection
	 * @param {object} fog structure
	 */
	SpriteRenderer.bind3DContext = function Bind3dContext( gl, modelView, projection, fog )
	{
		var attribute = _program.attribute;
		var uniform   = _program.uniform;

		gl.useProgram( _program );
		gl.uniformMatrix4fv( uniform.uProjectionMat, false,  projection );
		gl.uniformMatrix4fv( uniform.uModelViewMat,  false,  modelView );
		gl.uniformMatrix4fv( uniform.uViewModelMat,  false,  mat4.invert(_matrix, modelView) );

		// Fog settings
		gl.uniform1i(  uniform.uFogUse,   fog.use && fog.exist );
		gl.uniform1f(  uniform.uFogNear,  fog.near );
		gl.uniform1f(  uniform.uFogFar,   fog.far );
		gl.uniform3fv( uniform.uFogColor, fog.color );

		// Textures
		gl.uniform1i( uniform.uDiffuse, 0 );
		gl.uniform1i( uniform.uPalette, 1 );

		// Enable all attributes
		gl.enableVertexAttribArray( attribute.aPosition );
		gl.enableVertexAttribArray( attribute.aTextureCoord );
		gl.bindBuffer( gl.ARRAY_BUFFER, _buffer );

		// Link attribute
		gl.vertexAttribPointer( attribute.aPosition,     2, gl.FLOAT, false,  4*4, 0   );
		gl.vertexAttribPointer( attribute.aTextureCoord, 2, gl.FLOAT, false,  4*4, 2*4 );

		// Binding 3D context
		this.render = RenderCanvas3D;

		_gl = gl;
		_groupId++;
	};


	/**
	 * Unbind 3D Context
	 *
	 * @param {object} gl context
	 */
	SpriteRenderer.unbind = function unBind( gl )
	{
		var attribute = _program.attribute;

		gl.disableVertexAttribArray( attribute.aPosition );
		gl.disableVertexAttribArray( attribute.aTextureCoord );
		gl.disableVertexAttribArray( attribute.aIsUp );
	};


	/**
	 * Prepare to render on 2D context.
	 *
	 * @param {object} ctx canvas context
	 * @param {number} x position
	 * @param {number} y position
	 */
	SpriteRenderer.bind2DContext = function Bind2DContext( ctx, x, y )
	{
		_ctx        = ctx;
		_pos[0]     = x;
		_pos[1]     = y;
		this.render = RenderCanvas2D;
	};


	/**
	 * Render in 3D mode
	 */
	function RenderCanvas3D()
	{
		// Nothing to render ?
		if (!this.image.texture || !this.color[3]) {
			return;
		}

		// gl.uniform* seems to be expensive
		// cache values to avoid flooding the GPU and reducing perf.

		var uniform = _program.uniform;
		var gl      = _gl;
		var use_pal = this.image.palette !== null;

		if (this.shadow !== _shadow) {
			gl.uniform1f( uniform.uShadow, _shadow = this.shadow);
		}
		gl.uniform3fv( uniform.uSpriteRendererPosition, this.position );

		// Palette
		if (use_pal) {
			gl.activeTexture( gl.TEXTURE1 );
			gl.bindTexture( gl.TEXTURE_2D,    this.image.palette );
			gl.uniform2fv( uniform.uTextSize, this.image.size );
			gl.activeTexture( gl.TEXTURE0 );
		}

		if (_usepal !== use_pal) {
			gl.uniform1i(  uniform.uUsePal, _usepal = use_pal );
		}

		if (this.depth !== _depth) {
			gl.uniform1f( uniform.uSpriteRendererDepth, _depth = this.depth);
		}

		gl.uniform1f( uniform.uSpriteRendererZindex, this.zIndex++ );

		// Rotate
		if (this.angle !== _angle) {
			_angle = this.angle;

			mat4.identity(_matrix);
			if (_angle) {
				mat4.rotateZ( _matrix, _matrix, - _angle / 180 * Math.PI );
			}

			gl.uniformMatrix4fv( uniform.uSpriteRendererAngle, false, _matrix );
		}

		gl.uniform4fv( uniform.uSpriteRendererColor,  this.color );
		gl.uniform2fv( uniform.uSpriteRendererSize,   this.size );
		gl.uniform2fv( uniform.uSpriteRendererOffset, this.offset );

		// Avoid binding the new texture 150 times if it's the same.
		if (_groupId !== _lastGroupId || _texture !== this.image.texture) {
			_lastGroupId = _groupId;
			gl.bindTexture( gl.TEXTURE_2D, _texture = this.image.texture );
		}
		gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
	}


	/**
	 * Render in 2D
	 */
	var RenderCanvas2D = function RenderCanvas2DClosure()
	{
		var canvas, ctx, imageData;

		canvas         = document.createElement("canvas");
		ctx            = canvas.getContext("2d");
		canvas.width   = 20;
		canvas.height  = 20;
		imageData      = ctx.createImageData(canvas.width, canvas.height);

		return function RenderCanvas2D()
		{
			// Nothing to render
			if (this.sprite.width <= 0 || this.sprite.height <= 0) {
				return;
			}

			var scale_x, scale_y, idx1, idx2;
			var x, y, _x, _y, width, height, outputWidth;
			var pal, frame, color;
			var input, output;

			scale_x  = 1.0;
			scale_y  = 1.0;
			_x       = _pos[0] + this.offset[0] * 35;
			_y       = _pos[1] + this.offset[1] * 35;
			pal      = this.palette;
			frame    = this.sprite;
			width    = frame.width;
			height   = frame.height;

			// Divide by 35 in the entity renderer
			this.size[0] *= 35;
			this.size[1] *= 35;

			// Mirror feature
			if (this.size[0] < 0) {
				scale_x      *= -1;
				this.size[0] *= -1;
			}

			if (this.size[1] < 0) {
				scale_y      *= -1;
				this.size[1] *= -1;
			}

			// Resize canvas from memory
			if (width > canvas.width || height > canvas.height) {
				canvas.width  = width;
				canvas.height = height;
				imageData     = ctx.createImageData(width, height);
			}

			output      = imageData.data;
			input       = frame.data;
			color       = this.color;
			outputWidth = canvas.width;

			// RGBA images
			if (this.sprite.type === 1) {
				for (y = 0; y < height; ++y) {
					for (x = 0; x < width; ++x) {
						idx1 = (x + y * outputWidth) * 4;
						idx2 = (x + y * width) * 4;
						output[idx1 + 0] = input[idx2 + 0] * color[0];
						output[idx1 + 1] = input[idx2 + 1] * color[1];
						output[idx1 + 2] = input[idx2 + 2] * color[2];
						output[idx1 + 3] = input[idx2 + 3] * color[3];
					}
				}
			}

			// Palettes
			else {
				for (y = 0; y < height; ++y) {
					for (x = 0; x < width; ++x) {
						idx1 = (y * outputWidth + x) * 4;
						idx2 = input[y * width + x] * 4;
						output[idx1 + 0] = pal[idx2 + 0] * color[0];
						output[idx1 + 1] = pal[idx2 + 1] * color[1];
						output[idx1 + 2] = pal[idx2 + 2] * color[2];
						output[idx1 + 3] = input[y * width + x] ? 255 * color[3] : 0;
					}
				}
			}

			// Insert into the canvas
			ctx.putImageData( imageData, 0, 0, 0, 0, width, height);

			// Render sprite in context
			_ctx.save();
			_ctx.translate( _x | 0, _y | 0 );
			_ctx.rotate( this.angle / 180 * Math.PI );
			_ctx.scale( scale_x, scale_y );
			_ctx.drawImage(
				 canvas,
				 0,                  0,
				 width,              height,
				-this.size[0] >> 1, -this.size[1] >> 1,
				 width,              height
			);
			_ctx.restore();
		};
	}();


	/**
	 * Export
	 */
	return SpriteRenderer;
});