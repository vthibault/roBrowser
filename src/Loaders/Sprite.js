/**
 * loaders/Sprite.js
 *
 * Loaders for Gravity .spr file (Sprite)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['utils/BinaryReader'], function( BinaryReader )
{
	'use strict';


	/**
	 * Sprite Constructor
	 *
	 * @param {ArrayBuffer} data - optional data to work with
	 */
	function SprReader( data )
	{
		if (data) {
			this.load(data);
		}
	}


	/**
	 * Sprite Constants
	 */
	SprReader.Type = {
		PAL:  0,
		RGBA: 1
	};


	/**
	 * Load a Sprite data
	 *
	 * @param {ArrayBuffer} data - file content
	 */
	SprReader.prototype.load = function load(data)
	{
		this.fp      = new BinaryReader(data);
		this.header  = this.fp.readBinaryString(2);
		this.version = this.fp.readUByte()/10 + this.fp.readUByte();

		if (this.header != 'SP') {
			throw new Error('SPR::load() - Incorrect header "' + this.header + '", must be "SP"');
		}

		this.indexedCount  = this.fp.readUShort();
		this._indexedCount = this.indexedCount + 0;

		if (this.version > 1.1) {
			this.rgbaCount = this.fp.readUShort();
		}

		this.frames     = new Array(this.indexedCount + this.rgbaCount);
		this.rgbaIndex  = this.indexedCount;


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
	SprReader.prototype.readIndexedImage = function readIndexedImage()
	{
		var count     = this.indexedCount;
		var fp        = this.fp;
		var i, width, height;
		var frames    = this.frames;

		for (i = 0; i < count; ++i) {
			width     =  fp.readUShort();
			height    =  fp.readUShort();
			frames[i] = {
				type:   SprReader.Type.PAL,
				width:  width,
				height: height,
				data:   new Uint8Array( fp.buffer, fp.tell(), width * height )
			};

			fp.seek( width * height, BinaryReader.Seek.CUR);
		}
	};


	/**
	 * Parse SPR indexed images encoded with RLE
	 */
	SprReader.prototype.readIndexedImageRLE = function readIndexedImageRLE()
	{
		var palCount  = this.indexedCount;
		var fp        = this.fp;
		var i, width, height, size, data, index, c, count, j, end;
		var frames    = this.frames;

		for (i = 0; i < palCount; ++i) {

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
				type:   SprReader.Type.PAL,
				width:  width,
				height: height,
				data:   data
			};
		}
	};


	/**
	 * Parse SPR rgba images
	 */
	SprReader.prototype.readRgbaImage = function readRGBAImage()
	{
		var rgba   = this.rgbaCount;
		var index  = this.rgbaIndex;
		var fp     = this.fp;
		var frames = this.frames;
		var i, width, height;

		for (i = 0; i < rgba; ++i) {
			width   =  fp.readShort();
			height  =  fp.readShort();

			frames[ i + index ] = {
				type:   SprReader.Type.RGBA,
				width:  width,
				height: height,
				data:   new Uint8Array( fp.buffer, fp.tell(), width * height * 4 )
			};

			fp.seek( width * height * 4, BinaryReader.Seek.CUR);
		}
	};


	/**
	 * Change SPR mode : indexed to rgba
	 * (why keep palette for hat/weapon/shield/monster ?)
	 */
	SprReader.prototype.switchToRGBA = function switchToRGBA()
	{
		var frames = this.frames, frame;
		var i, count = this.indexedCount;
		var data, width, height, x, y;
		var out, pal = this.palette;
		var idx1, idx2;

		for (i = 0; i < count; ++i) {
			// Avoid look up
			frame  = frames[i];

			if (frame.type !== SprReader.Type.PAL) {
				continue;
			}
	
			data   = frame.data;
			width  = frame.width;
			height = frame.height;
			out    = new Uint8Array( width * height * 4 );
	
			// reverse height
			for (y = 0; y < height; ++y) {
				for (x = 0; x < width; ++x) {
					idx1 = data[ x + y * width ] * 4;
					idx2 = (x + (height-y-1) * width) * 4;
					out[ idx2 + 3 ] = pal[ idx1 + 0 ];
					out[ idx2 + 2 ] = pal[ idx1 + 1 ];
					out[ idx2 + 1 ] = pal[ idx1 + 2 ];
					out[ idx2 + 0 ] = idx1 ? 255  : 0;
				}
			}

			frame.data = out;
			frame.type = SprReader.Type.RGBA;
		}

		this.indexedCount  = 0;
		this.rgbaCount     = frames.length;
		this.rgbaIndex     = 0;
	};


	/**
	 * Get back a canvas from a frame
	 *
	 * @param {number} index frame
	 * @return {HTMLElement} canvas
	 */
	SprReader.prototype.getCanvasFromFrame = function getCanvasFromFrame( index )
	{
		var canvas = document.createElement('canvas');
		var ctx    = canvas.getContext('2d');
		var imageData, frame;
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
		imageData     = ctx.createImageData( frame.width, frame.height );

		// RGBA
		if (frame.type === SprReader.Type.RGBA) {
			for (y = 0; y < height; ++y) {
				for (x = 0; x < width; ++x) {
					i = (x + y * width ) * 4;
					j = (x + (height-y-1) * width ) * 4;
					imageData.data[j+0] = frame.data[i+3];
					imageData.data[j+1] = frame.data[i+2];
					imageData.data[j+2] = frame.data[i+1];
					imageData.data[j+3] = frame.data[i+0];
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
					imageData.data[ j + 0 ] = pal[ i + 0 ];
					imageData.data[ j + 1 ] = pal[ i + 1 ];
					imageData.data[ j + 2 ] = pal[ i + 2 ];
					imageData.data[ j + 3 ] = i ? 255  : 0;
				}
			}
		}

		// Export
		ctx.putImageData( imageData, 0, 0 );
		return canvas;
	};


	/**
	 * Compile a SPR file
	 */
	SprReader.prototype.compile = function compile() {
		var frames = this.frames;
		var frame;
		var i, count = frames.length;
		var data, width, height, glWidth, glHeight, startX, startY, x, y;
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
			glWidth  = pow( 2, ceil( log(width) /log(2) ) );
			glHeight = pow( 2, ceil( log(height)/log(2) ) );
			startX   = floor( (glWidth - width) * 0.5 );
			startY   = floor( (glHeight-height) * 0.5 );

			// If palette.
			if (frame.type === SprReader.Type.PAL) {
				out = new Uint8Array( glWidth * glHeight );
	
				for (y = 0; y < height; ++y) {
					for (x = 0; x < width; ++x) {
						out[ ( ( y + startY ) * glWidth + ( x + startX ) ) ] = data[ y * width + x ];
					}
				}
			}

			// RGBA Images
			else {
				out = new Uint8Array( glWidth * glHeight * 4 );
	
				for (y = 0; y < height; ++y) {
					for (x = 0; x < width; ++x) {
						out[ ( ( y + startY ) * glWidth + ( x + startX ) ) * 4 + 0 ] = data[ ( (height-y-1) * width + x ) * 4 + 3 ];
						out[ ( ( y + startY ) * glWidth + ( x + startX ) ) * 4 + 1 ] = data[ ( (height-y-1) * width + x ) * 4 + 2 ];
						out[ ( ( y + startY ) * glWidth + ( x + startX ) ) * 4 + 2 ] = data[ ( (height-y-1) * width + x ) * 4 + 1 ];
						out[ ( ( y + startY ) * glWidth + ( x + startX ) ) * 4 + 3 ] = data[ ( (height-y-1) * width + x ) * 4 + 0 ];
					}
				}
			}

			output[i] = {
				type:           frame.type,
				width:          glWidth,
				height:         glHeight,
				originalWidth:  width,
				originalHeight: height,
				data:           out
			};
		}

		return {
			frames:       output,
			palette:      this.palette,
			rgbaIndex:    this.rgbaIndex,
			oldRgbaIndex: this._indexedCount
		};
	};


	return SprReader;
});