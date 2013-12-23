/**
 * Renderer/Map/Altitude.js
 *
 * Rendering altitude (used for color picking)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define( ['Utils/gl-matrix', 'Utils/PathFinding', 'Controls/MouseEventHandler'],
function(       glMatrix,          PathFinding,            Mouse )
{
	"use strict";


	var mat4 = glMatrix.mat4;
	var vec3 = glMatrix.vec3;
	var vec4 = glMatrix.vec4;


	/**
	 * @var {array} Cells where stored altitude
	 */
	var _cells       = null;


	/**
	 * @var {array} Altitudes cells type
	 */
	var _types       = null;


	/**
	 * @var {number} map width
	 */
	var _width       = 0;


	/**
	 * @var {number} map height
	 *
	 */
	var _height      = 0;


	/**
	 * @var {vec3} Ray start
	 */
	var _from     = vec3.create();


	/**
	 * @var {vec4} Ray end
	 */
	var _to       = vec4.create();


	/**
	 * @var {vec3} Ray direction
	 */
	var _unit     = vec3.create();


	/**
	 * @var {mat4} temporary matrix
	 */
	var _matrix   = mat4.create();


	/**
	 * Initialize Altitude mesh
	 *
	 * @param {object} gl context
	 * @param {object} data Altitude { mesh, vertCount, cells, width, height, colors }
	 */
	function Init( data )
	{
		// Extract 'type' from cells
		var cells = data.cells;
		var i, count = cells.length/5;

		var types = new Uint8Array(count);
		for( i = 0; i < count; ++i ) {
			types[i] = cells[i*5+4];
		}

		// Save information
		_cells     = data.cells;
		_types     = types;
		_width     = data.width;
		_height    = data.height;

		// Initialize PathFinding
		PathFinding.setGat({ width:_width, height:_height, cells:types, types:this.TYPE });
		this.width  = _width;
		this.height = _height;
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
	 * Intersect cell
	 *
	 * @param {mat4} modelView matrix
	 * @param {mat4} projection matrix
	 * @param {vec2} output vector
	 * @return {bool} success
	 */
	function Intersect( modelView, projection, out )
	{
		var i;

		// Extract camera position
		mat4.invert( _matrix, modelView );
		_from[0] = _matrix[12];
		_from[1] = _matrix[13];
		_from[2] = _matrix[14];

		// set two vectors with opposing z values
		_to[0] = (Mouse.screen.x / Mouse.screen.width)  * 2 - 1;
		_to[1] =-(Mouse.screen.y / Mouse.screen.height) * 2 + 1;
		_to[2] =  1.0; 
		_to[3] =  1.0;

		// Unproject
		mat4.multiply( _matrix, projection, modelView);
		mat4.invert( _matrix, _matrix );
		vec4.transformMat4( _to, _to, _matrix );

		_to[0] /= _to[3];
		_to[1] /= _to[3];
		_to[2] /= _to[3];

		// Extract direction
		vec3.sub( _unit, _to, _from );
		vec3.normalize(_unit, _unit);

		// Search
		for( i=0; i < 100; ++i ) {
			_from[0] += _unit[0];
			_from[1] += _unit[1];
			_from[2] += _unit[2];

			if( Math.abs( GetCellHeight( _from[0], _from[2]) + _from[1] ) < 0.5 ) {
				out[0] = _from[0];
				out[1] = _from[2];
				return true;
			}
		}

		return false;
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
		this.width              = 0;
		this.height             = 0;

		this.getCellType        = GetCellType;
		this.getCellHeight      = GetCellHeight;
		this.getCell            = GetCell;
		this.intersect          = Intersect;
	};
});