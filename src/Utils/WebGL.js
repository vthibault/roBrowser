/**
 * Utils/WebGL.js
 *
 * WebGL Helper function
 *
 * Trying to define here some functions related to webgl.
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
 
define( ['Utils/Texture'], function( Texture )
{
	'use strict';


	/**
	 * Get WebGL Context
	 *
	 * @param {object} canvas element
	 * @param {object} parameters
	 *
	 * @return {object} webgl context
	 */
	function getContext( canvas, parameters )
	{
		var gl = null;
		var args = ['webgl', 'experimental-webgl'];
		var i, count = args.length;

		// Default options
		if (!parameters) {
			parameters = {
				alpha:              false,
				depth:              true,
				stencil:            false,
				antialias:          false,
				premultipliedAlpha: false,
			};
		}

		// Find the context
		if (canvas.getContext && window.WebGLRenderingContext) {
			for (i = 0; i < count; ++i) {
				try {
					gl = canvas.getContext( args[i], parameters );
					if (gl)
						break;
				} catch(e) {}
			}
		}

		// :(
		if (!gl) {
			throw new Error('WebGL::getContext() - Can\'t find a valid context, is WebGL supported ?');
		}

		return gl;
	}


	/**
	 * Compile Webgl shader (fragment and vertex)
	 *
	 * @param {object} gl context
	 * @param {string} source
	 * @param {number} type (fragment or shader constant)
	 */
	function compileShader( gl, source, type)
	{
		var shader, error;

		// Compile shader
		shader = gl.createShader(type);
		gl.shaderSource(shader, 'precision mediump float;' + source);
		gl.compileShader(shader);

		// Is there an error ?
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			error = gl.getShaderInfoLog(shader);
			gl.deleteShader(shader);

			throw new Error('WebGL::CompileShader() - Fail to compile shader : ' + error);
		}

		return shader;
	}


	/**
	 * Create a Program from a webgl shader
	 *
	 * @param {object} gl context
	 * @param {string} vertexShader
	 * @param {string} fragmentShader
	 */
	function createShaderProgram( gl, vertexShader, fragmentShader )
	{
		var shaderProgram,
		    vs, fs,
			attrib, uniform,
			i, count,
			error;

		// Compile shader and attach them
		shaderProgram = gl.createProgram();
		vs = compileShader( gl, vertexShader  , gl.VERTEX_SHADER );
		fs = compileShader( gl, fragmentShader, gl.FRAGMENT_SHADER );

		gl.attachShader(shaderProgram, vs);
		gl.attachShader(shaderProgram, fs);
		gl.linkProgram(shaderProgram);

		// Is there an error
		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
			error = gl.getProgramInfoLog(shaderProgram);
			gl.deleteProgram(shaderProgram);
			gl.deleteShader(vs);
			gl.deleteShader(fs);

			throw new Error('WebGL::CreateShaderProgram() - Fail to link shaders : ' + error);
		}

		// Get back attributes
		count = gl.getProgramParameter(shaderProgram, gl.ACTIVE_ATTRIBUTES);
		shaderProgram.attribute = {};

		for (i = 0; i < count; i++) {
			attrib = gl.getActiveAttrib(shaderProgram, i);
			shaderProgram.attribute[attrib.name] = gl.getAttribLocation(shaderProgram, attrib.name);
		}

		// Get back uniforms
		count = gl.getProgramParameter(shaderProgram, gl.ACTIVE_UNIFORMS);
		shaderProgram.uniform = {};

		for (i = 0; i < count; i++) {
			uniform = gl.getActiveUniform(shaderProgram, i);
			shaderProgram.uniform[uniform.name] = gl.getUniformLocation(shaderProgram, uniform.name);
		}

		return shaderProgram;
	}


	/**
	 * Webgl Require textures to be power of two size
	 *
	 * @param {number} num
	 * @return {number}
	 */
	function toPowerOfTwo( num )
	{
		return Math.pow( 2, Math.ceil( Math.log(num)/Math.log(2) ) );
	}


	/**
	 * Load an image and push it to GPU
	 *
	 * @param {object} gl context
	 * @param {string} url
	 * @param {function} callback once the image is on gpu
	 */
	function texture( gl, url, callback )
	{
		var args = Array.prototype.slice.call(arguments, 3);

		Texture.load( url, function( success ) {
			if (!success) {
				return;
			}

			var canvas, ctx, texture;

			canvas        = document.createElement('canvas');
			canvas.width  = toPowerOfTwo(this.width);
			canvas.height = toPowerOfTwo(this.height);
			ctx           = canvas.getContext('2d');
			ctx.drawImage( this, 0, 0, canvas.width, canvas.height );

			texture = gl.createTexture();
			gl.bindTexture( gl.TEXTURE_2D, texture );
			gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas );
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.generateMipmap( gl.TEXTURE_2D );

			args.unshift( texture );
			callback.apply( null, args );
		});
	}


	/**
	 * Export
	 */
	return {
		getContext:          getContext,
		createShaderProgram: createShaderProgram,
		toPowerOfTwo:        toPowerOfTwo,
		texture:             texture
	};
});