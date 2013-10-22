/**
 * Renderer/Map/Altitude.js
 *
 * Rendering altitude (used for color picking)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define( ['Utils/WebGL', 'Utils/PathFinding'],
function(       WebGL,         PathFinding )
{
	"use strict";


	/**
	 * Private variables
	 */
	var _program     = null;
	var _buffer      = null;
	var _vertCount   = 0;

	var _colors      = null;
	var _cells       = null;
	var _types       = null;

	var _width       = 0;
	var _height      = 0;


	/**
	 * @var {string} vertex shader
	 */
	var _vertexShader   = '\
		attribute vec3 aPosition;\
		attribute vec3 aPickColor;\
		\
		varying vec3 vPickColor;\
		\
		uniform mat4 uModelViewMat;\
		uniform mat4 uProjectionMat;\
		\
		void main(void) {\
			vPickColor  =  aPickColor;\
			gl_Position =  uProjectionMat * uModelViewMat * vec4( aPosition, 1.0);\
		}';


	/**
	 * @var {string} fragment shader
	 */
	var _fragmentShader = '\
		varying vec3 vPickColor;\
		\
		void main(void) {\
			gl_FragColor = vec4( vPickColor, 1.0 );\
		}';


	/**
	 * Initialize Altitude mesh
	 *
	 * @param {object} gl context
	 * @param {object} data Altitude { mesh, vertCount, cells, width, height, colors }
	 */
	function Init( gl, data )
	{
		// Extract 'type' from cells
		var cells = data.cells;
		var i, count = cells.length/5;

		var types = new Uint8Array(count);
		for( i = 0; i < count; ++i ) {
			types[i] = cells[i*5+4];
		}

		// Save information
		_vertCount = data.vertCount;
		_cells     = data.cells;
		_types     = types;
		_width     = data.width;
		_height    = data.height;
		_colors    = data.colors;

		// Initialize PathFinding
		PathFinding.setGat({ width:_width, height:_height, cells:types, types:this.TYPE });
		this.width  = _width;
		this.height = _height;

		// Bind new mesh
		if( !_buffer ) {
			_buffer = gl.createBuffer();
		}

		// Link program	if not loaded
		if( !_program ) {
			_program = WebGL.createShaderProgram( gl, _vertexShader, _fragmentShader );
		}

		gl.bindBuffer( gl.ARRAY_BUFFER, _buffer );
		gl.bufferData( gl.ARRAY_BUFFER, data.mesh, gl.STATIC_DRAW );
	}


	/**
	 * Rendering Altitude
	 *
	 * @param {object} gl context
	 * @param {mat4} modelView
	 * @param {mat4} projection
	 */
	function Render( gl, modelView, projection )
	{
		var uniform   = _program.uniform;
		var attribute = _program.attribute;
	
		gl.useProgram( _program );

		// Bind matrix
		gl.uniformMatrix4fv( uniform.uModelViewMat,  false,  modelView );
		gl.uniformMatrix4fv( uniform.uProjectionMat, false,  projection );

		gl.enableVertexAttribArray( attribute.aPosition );
		gl.enableVertexAttribArray( attribute.aPickColor );
		gl.bindBuffer( gl.ARRAY_BUFFER, _buffer );
	
		// Link attribute
		gl.vertexAttribPointer( attribute.aPosition,  3, gl.FLOAT, false, 6*4,   0);
		gl.vertexAttribPointer( attribute.aPickColor, 3, gl.FLOAT, false, 6*4, 3*4);
		gl.drawArrays( gl.TRIANGLES, 0, _vertCount );

		// Is it needed ?
		gl.disableVertexAttribArray( attribute.aPosition );
		gl.disableVertexAttribArray( attribute.aPickColor );
	}


	/**
	 * Clean texture/buffer from memory
	 *
	 * @param {object} gl context
	 */
	function Free( gl )
	{
		if( _buffer ) {
			gl.deleteBuffer( _buffer );
			_buffer = null;
		}

		if( _program ) {
			gl.deleteProgram( _program );
			_program = null;
		}
	}


	/**
	 * Return cell position by a color
	 *
	 * @param {Array} color (rgba)
	 * @return {object} cell
	 */
	function GetPositionByColor( color )
	{
		return _colors[ color[0] | color[1]<<8 | color[2]<<16 ];
	}


	/**
	 * Get back cell data
	 *
	 * @param {number} x
	 * @param {number} y
	 * @return {Array} cell
	 */
	function GetCell( x, y )
	{
		var index = ( Math.floor(x) + Math.floor(y) * _width ) * 5;
		var vec4  = GetCell.__tmp;

		vec4[0] = _cells[index+0];
		vec4[1] = _cells[index+1];
		vec4[2] = _cells[index+2];
		vec4[3] = _cells[index+3];
		vec4[4] = _cells[index+4];

		return vec4;
	}


	/**
	 * @var {vec4} tmp to avoid memory allocation
	 */
	GetCell.__tmp = new Float32Array(5);


	/**
	 * Return cell type
	 *
	 * @param {number} x
	 * @param {number} y
	 * @return {number} cell type
	 */
	function GetCellType(x, y)
	{
		return _types[ x + y * _width ];
	}


	/**
	 * Return cell height
	 *
	 * @param {number} x
	 * @param {number} y
	 * @return {number} height
	 */
	function GetCellHeight( x, y )
	{
		// Map not loaded yet ?
		if( !_cells ) {
			return 0.0;
		}

		var index, x1, x2;

		index  = ( Math.floor(x) + Math.floor(y) * _width ) * 5;

		x      = x % 1;
		y      = y % 1;
		x1     = _cells[index+0] + (_cells[index+1]-_cells[index+0]) * x;
		x2     = _cells[index+2] + (_cells[index+3]-_cells[index+2]) * x;

		return - ( x1 + ( x2 - x1 ) * y );
	}


	/**
	 * Export
	 */
	return new function Altitude()
	{
		// Copy from Loaders/Altitude.js
		this.TYPE = {
			NONE:     1 << 0,
			WALKABLE: 1 << 1,
			WATER:    1 << 2,
			SNIPABLE: 1 << 3
		};

		this.init               = Init;
		this.render             = Render;
		this.free               = Free;
		this.width              = 0;
		this.height             = 0;

		this.getPositionByColor = GetPositionByColor;
		this.getCellType        = GetCellType;
		this.getCellHeight      = GetCellHeight;
		this.getCell            = GetCell;
	};
});