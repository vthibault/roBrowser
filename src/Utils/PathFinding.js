/**
 * Utils/PathFinding.js
 *
 * Path Finding Algorithm (A*)
 *
 * Trying to find the shortest path between two positions.
 * This file is based on eAthena/rAthena code, optimized for JS : http://svn.code.sf.net/p/rathena/svn/trunk/src/map/path.c
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function()
{
	'use strict';


	// World object
	var GAT = {
		width:     0,
		height:    0,
		cells:  null,
		type:   null
	};


	var MAX_HEAP     = 150;
	var MAX_WALKPATH = 32;


	// Memory
	var _heap        = new Uint32Array(MAX_HEAP);
	var _heap_clean  = new Uint32Array(MAX_HEAP);

	var short_clean  = new Uint16Array(MAX_WALKPATH*MAX_WALKPATH);
	var char_clean   = new Uint8Array(MAX_WALKPATH*MAX_WALKPATH);
	var dc           = new Uint8Array(4);

	// struct tmp_path {
		/* short   */ var _x      = new Uint16Array(MAX_WALKPATH*MAX_WALKPATH);
		/* short   */ var _y      = new Uint16Array(MAX_WALKPATH*MAX_WALKPATH);
		/* short   */ var _dist   = new Uint16Array(MAX_WALKPATH*MAX_WALKPATH);
		/* short   */ var _cost   = new Uint16Array(MAX_WALKPATH*MAX_WALKPATH);
		/* short   */ var _before = new Uint16Array(MAX_WALKPATH*MAX_WALKPATH);
		/* boolean */ var _flag   = new Uint8Array(MAX_WALKPATH*MAX_WALKPATH);
	// };



	// Should be convert to inline code by the browser (V8)
	function calc_index(x, y)
	{
		return ( x + y * MAX_WALKPATH ) & ( MAX_WALKPATH * MAX_WALKPATH - 1);
	}

	function calc_cost(i, x1, y1)
	{
		return ( Math.abs(x1-_x[i]) + Math.abs(y1-_y[i]) ) * 10 + _dist[i];
	}


	/**
	 * Heap push (helper function)
	 *
	 * @param {Uint32Array} heap
	 * @param {number} index
	 */
	function push_heap_path(heap, index)
	{
		var i, h = heap[0]++;

		for (i = (h-1)>>1; h > 0 && _cost[index] < _cost[heap[i+1]]; i = (h-1)>>1) {
			heap[h+1] = heap[i+1];
			h = i;
		}

		heap[h+1] = index;
	}


	/**
	 * Heap update (helper function)
	 * Move toward the root because cost has decreased.
	 *
	 * @param {Uint32Array} heap
	 * @param {number} index
	 */
	function update_heap_path( heap, index )
	{
		var i, h, cost;

		h=0;
		for (h = 0; h < heap[0] && heap[h+1] !== index; ++h);


		if (h === heap[0]) {
			throw new Error('PathFinding::update_heap_path() - Error updating head path');
		}

		cost = _cost[index];

		for (i = (h-1)>>1; h > 0 && cost < _cost[heap[i+1]]; i = (h-1)>>1) {
			heap[h+1] = heap[i+1];
			h = i;
		}

		heap[h+1] = index;
	}


	/**
	 * Heap pop (helper function)
	 *
	 * @param {Uint32Array} heap
	 * @return {number}
	 */
	function pop_heap_path( heap )
	{
		var i, h, k, ret, last, cost;

		if (heap[0] <= 0)
			return -1;

		ret  = +heap[1];
		last = +heap[heap[0]--];
		cost = _cost[last];

		for (h = 0, k = 2; k < heap[0]; k = k*2+2) {
			if (_cost[heap[k+1]] > _cost[heap[k]]) {
				k--;
			}
			heap[h+1] = +heap[k+1];
			h = k;
		}

		if (k === heap[0]) {
			heap[h+1] = +heap[k];
			h = k-1;
		}

		for (i = (h-1)>>1; h > 0 && _cost[heap[i+1]] > cost; i = (h-1)>>1) {
			heap[h+1] = heap[i+1];
			h = i;
		}

		heap[h+1] = last;

		return ret;
	}


	/**
	 * calculate cost for the specified position
	 *
	 * @param {Uint32Array} heap
	 * @param {number} x
	 * @param {number} y
	 * @param {number} dist
	 * @param {number} before
	 * @param {number} cost
	 */
	function add_path( heap, x, y, dist, before, cost )
	{
		var i = calc_index(x,y);

		if (_x[i] === x && _y[i] === y) {

			if (_dist[i] > dist) {
				_dist[i]   = dist;
				_before[i] = before;
				_cost[i]   = cost;
	
				if (_flag[i]) {
					push_heap_path(heap, i);
				}
				else {
					update_heap_path(heap, i);
				}
	
				_flag[i]   = 0;
			}

			return 0;
		}

		if (_x[i] || _y[i]) {
			return 1;
		}

		_x[i]      = x;
		_y[i]      = y;
		_dist[i]   = dist;
		_before[i] = before;
		_cost[i]   = cost;
		_flag[i]   = 0;

		push_heap_path(heap, i);
		return 0;
	}


	/**
	 * Copy Gat cell types info to local.
	 *
	 * @param {object} gat - Altitude info
	 */
	function setGat( gat )
	{
		GAT.width  = gat.width;
		GAT.height = gat.height;
		GAT.cells  = gat.cells;
		GAT.type   = gat.types;
	}


	/**
	 * Find the direct patch between two points
	 *
	 * @param {number} x0
	 * @param {number} y0
	 * @param {number} x1
	 * @param {number} y1
	 * @param {Array} out
	 * @param {number} range
	 * @param {type} type - see Altitude.TYPE.* consts
	 */
	function searchLong( x0, y0, x1, y1, range, out, type )
	{
		var i, dx, dy, x, y;
		var types = GAT.cells;
		var width = GAT.width;

		dx   = ((dx = x1-x0)) ? ((dx<0) ? -1 : 1) : 0;
		dy   = ((dy = y1-y0)) ? ((dy<0) ? -1 : 1) : 0;
		x    = x0;
		y    = y0;
		i    = 0;

		out[0] = x0;
		out[1] = y0;

		while ((i++) < MAX_WALKPATH) {
			x         += dx;
			y         += dy;

			out[i*2+0] = x;
			out[i*2+1] = y;

			if (x === x1) dx = 0;
			if (y === y1) dy = 0;

			if ((dx === 0 && dy === 0) || (types[x + y * width] & type) === 0) {
				break;
			}
		}

		if (x === x1 && y === y1) {
			// Range feature
			if (range > 0) {
				for (x = 0; x < i; ++x) {
					if (Math.abs(out[x*2+0]-x1) <= range && Math.abs(out[x*2+1]-y1) <= range) {
						return x + 1;
					}
				}
			}

			return i+1;
		}

		// Range feature
		if (range > 0) {
			x = x1 - x0;
			y = y1 - y0;
			if (Math.sqrt(x*x + y*y) <= range) {
				return searchLong( x0, y0, x1, y1, 0, out, GAT.type.SNIPABLE );
			}
		}

		return 0;
	}


	/**
	 * Find the path between two points.
	 *
	 * @param {vec2} from
	 * @param {vec2} to
	 * @param {number} range
	 * @param {Array} out
	 */
	function search( x0, y0, x1, y1, range, out )
	{
		var heap;
		var x, y, i, j, rp, xs, ys;
		var e, f, len, dist, cost;

		// Import world
		var width  = GAT.width;
		var height = GAT.height;
		var types  = GAT.cells;
		var TYPE   = GAT.type;

		// Direct search
		i = searchLong( x0, y0, x1, y1, range, out, TYPE.WALKABLE );
		if (i) {
			return i;
		}

		// Clean variables (avoid garbage collection problem)
		_heap.set(_heap_clean);
		_x.set(short_clean);
		_y.set(short_clean);
		_dist.set(short_clean);
		_cost.set(short_clean);
		_before.set(short_clean);
		_flag.set(char_clean);

		heap     = _heap;
		out[0]   = x0;
		out[1]   = y0;

		i        = calc_index(x0, y0);
		_x[i]    = x0;
		_y[i]    = y0;
		_cost[i] = calc_cost(i, x1, y1);

		heap[0]  = 0;
		push_heap_path(heap, i);


		xs = width  - 1;
		ys = height - 1;

		while (true) {

			// Clean up variables
			e     = 0;
			f     = 0;

			dc[0] = 0;
			dc[1] = 0;
			dc[2] = 0;
			dc[3] = 0;

			rp    = pop_heap_path(heap);

			// No path found.
			if (rp < 0) {
				return 0;
			}

			x     = _x[rp];
			y     = _y[rp];
			dist  = _dist[rp] + 10;
			cost  = _cost[rp];


			// Finished
			if (x === x1 && y === y1) {
				break;
			}

			if (y < ys && types[ (x+0) + (y+1) * width ] & TYPE.WALKABLE) {
				dc[0] = (y >= y1 ? 20 : 0);
				f    |= 1;
				e    += add_path( heap, x+0, y+1, dist, rp, cost + dc[0] );
			}

			if (x > 0 && types[ (x-1) + (y+0) * width ] & TYPE.WALKABLE) {
				dc[1] = (x <= x1 ? 20 : 0);
				f    |= 2;
				e    += add_path( heap, x-1, y+0, dist, rp, cost + dc[1] );
			}

			if (y > 0 && types[ (x+0) + (y-1) * width ] & TYPE.WALKABLE) {
				dc[2] = (y <= y1 ? 20 : 0);
				f    |= 4;
				e    += add_path( heap, x+0, y-1, dist, rp, cost + dc[2] );
			}

			if (x < xs && types[ (x+1) + (y+0) * width ] & TYPE.WALKABLE) {
				dc[3] = (x >= x1 ? 20 : 0);
				f    |= 8;
				e    += add_path( heap, x+1, y+0, dist, rp, cost + dc[3] );
			}

			// Diagonals
			if ((f & (2+1)) === 2+1 && types[ (x-1) + (y+1) * width ] & TYPE.WALKABLE) {
				e += add_path( heap, x-1, y+1, dist+4, rp, cost + dc[1] + dc[0] - 6 );
			}

			if ((f & (2+4)) === 2+4 && types[ (x-1) + (y-1) * width ] & TYPE.WALKABLE) {
				e += add_path( heap, x-1, y-1, dist+4, rp ,cost + dc[1] + dc[2] - 6 );
			}

			if ((f & (8+4)) === 8+4 && types[ (x+1) + (y-1) * width ] & TYPE.WALKABLE) {
				e += add_path( heap, x+1, y-1, dist+4, rp, cost + dc[3] + dc[2] - 6 );
			}

			if ((f & (8+1)) === 8+1 && types[ (x+1) + (y+1) * width ] & TYPE.WALKABLE) {
				e += add_path( heap, x+1, y+1, dist+4, rp, cost + dc[3] + dc[0] - 6 );
			}

			_flag[rp] = 1;

			// Too much... ending.
			if (e || heap[0] >= MAX_HEAP - 5) {
				return 0;
			}
		}


		// Reorganize Path
		for (len = 0, i = rp; len < 100 && i !== calc_index(x0, y0); i=_before[i], len++);


		for (i = rp, j = len-1; j >=0; i = _before[i], j--) {
			out[(j+1)*2+0] = _x[i];
			out[(j+1)*2+1] = _y[i];
		}

		return len+1;
	}


	// Exports
	return {
		search:     search,
		searchLong: searchLong,
		setGat:     setGat
	};
});