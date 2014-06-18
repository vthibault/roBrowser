/**
 * Loaders/Sprite.js
 *
 * Loaders for Gravity .spr file (Sprite)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['Utils/BinaryReader'], function( BinaryReader )
{
	'use strict';


	/**
	 * Sprite Constructor
	 *
	 * @param {ArrayBuffer} data - optional data to work with
	 */
	function SPR( data )
	{
		if (data) {
			this.load(data);
		}
	}


	/**
	 * Sprite Constants
	 */
	SPR.TYPE_PAL  = 0;
	SPR.TYPE_RGBA = 1;


	/**
	 * Sprite public methods
	 */
	SPR.prototype.fp             = null;
	SPR.prototype.header         = 'SP';
	SPR.prototype.version        = 0.0;
	SPR.prototype.indexed_count  = 0;
	SPR.prototype._indexed_count = 0;
	SPR.prototype.rgba_count     = 0;
	SPR.prototype.rgba_index     = 0;
	SPR.prototype.palette        = null;
	SPR.prototype.frames         = null;


	/**
	 * Load a Sprite data
	 *
	 * @param {ArrayBuffer} data - file content
	 */
	SPR.prototype.load = function load(data)
	{
		this.fp      = new BinaryReader(data);
		this.header  = this.fp.readBinaryString(2);
		this.version = this.fp.readUByte()/10 + this.fp.readUByte();

		if (this.header != 'SP') {
			throw new Error('SPR::load() - Incorrect header "' + this.header + '", must be "SP"');
		}

		this.indexed_count  = this.fp.readUShort();
		this._indexed_count = this.indexed_count + 0;

		if (this.version > 1.1) {
			this.rgba_count = this.fp.readUShort();
		}

		this.frames      = new Array(this.indexed_count + this.rgba_count);
		this.rgba_index  = this.indexed_count;


		if (this.version < 2.1) {
			this.readIndexedImage();
		}
		else {
			this.readIndexedImageRLE();
		}

		this.readRgbaImage();

		// Read palettes.
		if (this.version > 1.0) {
			this.palette = new Uint8Array( this.fp.buffer, this.fp.length-1024, 1024 );
		}
	};


	/**
	 * Parse SPR indexed images
	 */
	SPR.prototype.readIndexedImage = function readIndexedImage()
	{
		var pal_count = this.indexed_count;
		var fp        = this.fp;
		var i, width, height;
		var frames    = this.frames;

		for (i = 0; i < pal_count; ++i) {
			width     =  fp.readUShort();
			height    =  fp.readUShort();
			frames[i] = {
				type:   SPR.TYPE_PAL,
				width:  width,
				height: height,
				data:   new Uint8Array( fp.buffer, fp.tell(), width * height )
			};

			fp.seek( width * height, SEEK_CUR );
		}
	};


	/**
	 * Parse SPR indexed images encoded with RLE
	 */
	SPR.prototype.readIndexedImageRLE = function readIndexedImageRLE()
	{
		var pal_count = this.indexed_count;
		var fp        = this.fp;
		var i, width, height, size, data, index, c, count, j, end;
		var frames    = this.frames;

		for (i = 0; i < pal_count; ++i) {

			width   =  fp.readUShort();
			height  =  fp.readUShort();
			size    =  width * height;
			data    =  new Uint8Array( size );
			index   = 0;
			end     = fp.readUShort() + fp.tell();

			while (fp.tell() < end) {
				c = fp.readUByte();
				data[ index++ ] = c;

				if (!c) {
					count = fp.readUByte();
					if (!count) {
						data[ index++ ] = count;
					}
					else {
						for (j = 1; j < count; ++j) {
							data[ index++ ] = c;
						}
					}
				}
			}

			frames[i] = {
				type:   SPR.TYPE_PAL,
				width:  width,
				height: height,
				data:   data
			};
		}
	};


	/**
	 * Parse SPR rgba images
	 */
	SPR.prototype.readRgbaImage = function readRGBAImage()
	{
		var rgba   = this.rgba_count;
		var index  = this.rgba_index;
		var fp     = this.fp;
		var frames = this.frames;
		var i, width, height;

		for (i = 0; i < rgba; ++i) {
			width   =  fp.readShort();
			height  =  fp.readShort();

			frames[ i + index ] = {
				type:   SPR.TYPE_RGBA,
				width:  width,
				height: height,
				data:   new Uint8Array( fp.buffer, fp.tell(), width * height * 4 )
			};

			fp.seek( width * height * 4, SEEK_CUR );
		}
	};


	/**
	 * Change SPR mode : indexed to rgba
	 * (why keep palette for hat/weapon/shield/monster ?)
	 */
	SPR.prototype.switchToRGBA = function switchToRGBA()
	{
		var frames = this.frames, frame;
		var i, count = this.indexed_count;
		var data, width, height, x, y;
		var out, pal = this.palette;
		var idx1, idx2;

		for (i = 0; i < count; ++i) {
			// Avoid look up
			frame  = frames[i];

			if (frame.type !== SPR.TYPE_PAL) {
				continue;
			}
	
			data   = frame.data;
			width  = frame.width;
			height = frame.height;
			out    = new Uint8Array( width * height * 4 );
	
			// reverse height
			for ( y=0; y<height; ++y ) {
				for ( x = 0; x<width; ++x ) {
					idx1 = data[ x + y * width ] * 4;
					idx2 = ( x + (height-y-1) * width ) * 4;
					out[ idx2 + 3 ] = pal[ idx1 + 0 ];
					out[ idx2 + 2 ] = pal[ idx1 + 1 ];
					out[ idx2 + 1 ] = pal[ idx1 + 2 ];
					out[ idx2 + 0 ] = idx1 ? 255  : 0;
				}
			}

			frame.data = out;
			frame.type = SPR.TYPE_RGBA;
		}

		this.indexed_count  = 0;
		this.rgba_count     = frames.length;
		this.rgba_index     = 0;
	};


	/**
	 * Get back a canvas from a frame
	 *
	 * @param {number} index frame
	 * @return {HTMLElement} canvas
	 */
	SPR.prototype.getCanvasFromFrame = function getCanvasFromFrame( index )
	{
		var canvas = document.createElement('canvas');
		var ctx    = canvas.getContext('2d');
		var ImageData, frame;
		var x, y, i, j, width, height;

		frame = this.frames[index];

		// Empty frame ?
		if (frame.width <= 0 || frame.height <= 0) {
			return null;
		}

		canvas.width  = frame.width;
		canvas.height = frame.height;
		width         = frame.width;
		height        = frame.height;
		ImageData     = ctx.createImageData( frame.width, frame.height );

		// RGBA
		if (frame.type === SPR.TYPE_RGBA) {
			for (y = 0; y < height; ++y) {
				for (x = 0; x < width; ++x) {
					i = (x + y * width ) * 4;
					j = (x + (height-y-1) * width ) * 4;
					ImageData.data[j+0] = frame.data[i+3];
					ImageData.data[j+1] = frame.data[i+2];
					ImageData.data[j+2] = frame.data[i+1];
					ImageData.data[j+3] = frame.data[i+0];
				}
			}
		}

		// Palette
		else {
			var pal = this.palette;

			// reverse height
			for (y = 0; y < height; ++y) {
				for (x = 0; x < width; ++x) {
					i = frame.data[ x + y * width ] * 4;
					j = (x + y * width ) * 4;
					ImageData.data[ j + 0 ] = pal[ i + 0 ];
					ImageData.data[ j + 1 ] = pal[ i + 1 ];
					ImageData.data[ j + 2 ] = pal[ i + 2 ];
					ImageData.data[ j + 3 ] = i ? 255  : 0;
				}
			}
		}

		// Export
		ctx.putImageData( ImageData, 0, 0 );
		return canvas;
	};


	/**
	 * Compile a SPR file
	 */
	SPR.prototype.compile = function compile() {
		var frames = this.frames;
		var frame;
		var i, count = frames.length;
		var data, width, height, gl_width, gl_height, start_x, start_y, x, y;
		var pow = Math.pow, ceil = Math.ceil, log = Math.log, floor = Math.floor;
		var out;
		var output = new Array(count);

		for (i = 0; i < count; ++i) {

			// Avoid look up
			frame  = frames[i];
			data   = frame.data;
			width  = frame.width;
			height = frame.height;

			// Calculate new texture size and pos to center
			gl_width  = pow( 2, ceil( log(width) /log(2) ) );
			gl_height = pow( 2, ceil( log(height)/log(2) ) );
			start_x   = floor( (gl_width - width) * 0.5 );
			start_y   = floor( (gl_height-height) * 0.5 );

			// If palette.
			if (frame.type === SPR.TYPE_PAL) {
				out = new Uint8Array( gl_width * gl_height );
	
				for (y = 0; y < height; ++y) {
					for (x = 0; x < width; ++x) {
						out[ ( ( y + start_y ) * gl_width + ( x + start_x ) ) ] = data[ y * width + x ];
					}
				}
			}

			// RGBA Images
			else {
				out = new Uint8Array( gl_width * gl_height * 4 );
	
				for (y = 0; y < height; ++y) {
					for (x = 0; x < width; ++x) {
						out[ ( ( y + start_y ) * gl_width + ( x + start_x ) ) * 4 + 0 ] = data[ ( (height-y-1) * width + x ) * 4 + 3 ];
						out[ ( ( y + start_y ) * gl_width + ( x + start_x ) ) * 4 + 1 ] = data[ ( (height-y-1) * width + x ) * 4 + 2 ];
						out[ ( ( y + start_y ) * gl_width + ( x + start_x ) ) * 4 + 2 ] = data[ ( (height-y-1) * width + x ) * 4 + 1 ];
						out[ ( ( y + start_y ) * gl_width + ( x + start_x ) ) * 4 + 3 ] = data[ ( (height-y-1) * width + x ) * 4 + 0 ];
					}
				}
			}

			output[i] = {
				type:           frame.type,
				width:          gl_width,
				height:         gl_height,
				originalWidth:  width,
				originalHeight: height,
				data:           out
			};
		}

		return {
			frames:        output,
			palette:       this.palette,
			rgba_index:    this.rgba_index,
			old_rgba_index:this._indexed_count
		};
	};


	return SPR;
});