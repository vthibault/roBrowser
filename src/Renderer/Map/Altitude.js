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
	'use strict';


	/**
	 * Altitude Namespace
	 */
	var Altitude = {};


	/**
	 * @var {number} map width
	 */
	Altitude.width = 0;


	/**
	 * @var {number} map height
	 */
	Altitude.height = 0;


	/**
	 * @var {object} enum cell type
	 * (Copy from Loaders/Altitude.js)
	 */
	Altitude.TYPE = {
		NONE:     1 << 0,
		WALKABLE: 1 << 1,
		WATER:    1 << 2,
		SNIPABLE: 1 << 3
	};


	/**
	 * @var {number} ray intersection count
	 */
	Altitude.MAX_INTERSECT_COUNT = 100;


	/**
	 * @var {array} Cells where stored altitude
	 */
	var _cells = null;


	/**
	 * @var {array} Altitudes cells type
	 */
	var _types = null;


	/**
	 * Initialize Altitude mesh
	 *
	 * @param {object} gl context
	 * @param {object} data Altitude { mesh, vertCount, cells, width, height, colors }
	 */
	Altitude.init = function init( data )
	{
		// Extract 'type' from cells
		var cells = data.cells;
		var i, count = cells.length/5;
		var types = new Uint8Array(count);

		for (i = 0; i < count; ++i) {
			types[i] = cells[i*5+4];
		}

		// Save information
		_cells          = data.cells;
		_types          = types;
		Altitude.width  = data.width;
		Altitude.height = data.height;

		// Initialize PathFinding
		PathFinding.setGat({
			width:  Altitude.width,
			height: Altitude.height,
			cells:  types,
			types:  Altitude.TYPE
		});
	};


	/**
	 * Get back cell data
	 *
	 * @param {number} x
	 * @param {number} y
	 * @return {Array} cell
	 */
	Altitude.getCell = function getCellClosure()
	{
		var tmp = new Float32Array(5);

		return function getCell(x, y)
		{
			var index = (Math.floor(x) + Math.floor(y) * Altitude.width) * 5;

			tmp[0] = _cells[index+0];
			tmp[1] = _cells[index+1];
			tmp[2] = _cells[index+2];
			tmp[3] = _cells[index+3];
			tmp[4] = _cells[index+4];

			return tmp;
		};
	}();


	


	/**
	 * Return cell type
	 *
	 * @param {number} x
	 * @param {number} y
	 * @return {number} cell type
	 */
	Altitude.getCellType = function getCellType(x, y)
	{
		return _types[ x + y * Altitude.width ];
	};


	/**
	 * Return cell height
	 *
	 * @param {number} x
	 * @param {number} y
	 * @return {number} height
	 */
	Altitude.getCellHeight = function getCellHeight( x, y )
	{
		// Map not loaded yet ?
		if (!_cells) {
			return 0.0;
		}

		var index, x1, x2;

		index  = (Math.floor(x) + Math.floor(y) * Altitude.width) * 5;

		x      = x % 1;
		y      = y % 1;
		x1     = _cells[index+0] + (_cells[index+1]-_cells[index+0]) * x;
		x2     = _cells[index+2] + (_cells[index+3]-_cells[index+2]) * x;

		return - (x1 + ( x2 - x1 ) * y);
	};


	/**
	 * Intersect cell
	 *
	 * @param {mat4} modelView matrix
	 * @param {mat4} projection matrix
	 * @param {vec2} output vector
	 * @return {bool} success
	 */
	Altitude.intersect = function intersectClosure()
	{
		var mat4    = glMatrix.mat4;
		var vec3    = glMatrix.vec3;
		var vec4    = glMatrix.vec4;

		var _from   = vec3.create();
		var _to     = vec4.create();
		var _unit   = vec3.create();
		var _matrix = mat4.create();

		return function intersect( modelView, projection, out )
		{
			var i, count = Altitude.MAX_INTERSECT_COUNT;

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
			for (i = 0; i < count; ++i) {
				_from[0] += _unit[0];
				_from[1] += _unit[1];
				_from[2] += _unit[2];

				if (Math.abs(Altitude.getCellHeight( _from[0], _from[2]) + _from[1]) < 0.5) {
					out[0] = _from[0];
					out[1] = _from[2];
					return true;
				}
			}

			return false;
		};
	}();


	/**
	 * Export
	 */
	return Altitude;
});