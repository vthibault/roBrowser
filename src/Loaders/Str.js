/**
 * Loaders/Str.js
 *
 * Loaders for Gravity .str file (effects file)
 * It's basically a .ezv file compiled to binary (except ezv file are version 0x95, str are 0x94).
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['Utils/BinaryReader'], function( BinaryReader )
{
	'use strict';


	/**
	 * Str class loader
	 *
	 * @param {ArrayBuffer} data - optional
	 */
	function STR( data )
	{
		this.version = 0.0;

		if (data) {
			this.load(data);
		}
	}


	/**
	 * Parse a STR file
	 *
	 * @param {ArrayBuffer} data
	 */
	STR.prototype.load = function load( data )
	{
		var fp, i;

		fp          = new BinaryReader(data);
		this.header = fp.readBinaryString(4);

		if (this.header !== 'STRM') {
			throw new Error('STR::load() - Incorrect header "' + this.header + '", must be "STRM"');
		}

		this.version = fp.readULong();

		if (this.version !== 0x94) {
			throw new Error('STR - Invalid version "'+ this.version +'", not supported');
		}

		this.fps      = fp.readULong();
		this.maxKey   = fp.readULong();
		this.layernum = fp.readULong();
		fp.seek(16, SEEK_CUR); // display, group, type, ... ?

		this.layers   = new Array(this.layernum);

		for (i = 0; i < this.layernum; ++i) {
			this.layers[i] = new STRLayer(fp);
		}
	};


	/**
	 * Layer structure
	 *
	 * @param {BinaryReader} fp
	 */
	function STRLayer( fp )
	{
		var i;

		this.texcnt  = fp.readLong();
		this.texname = new Array(this.texcnt);

		for (i = 0; i < this.texcnt; ++i) {
			this.texname[i] = 'data\\texture\\effect\\' + fp.readBinaryString(128);
		}

		this.anikeynum  = fp.readLong();
		this.animations = new Array(this.anikeynum);

		for (i = 0; i < this.anikeynum; ++i) {
			this.animations[i] = new STRAnimation(fp);
		}
	}


	/**
	 * Frame structure
	 *
	 * @param {BinaryReader} fp
	 */
	function STRAnimation( fp )
	{
		this.frame     = fp.readLong();
		this.type      = fp.readULong();
		this.pos       = new Float32Array([ fp.readFloat(), fp.readFloat() ]);
		this.uv        = new Float32Array([ fp.readFloat(), fp.readFloat(), fp.readFloat(), fp.readFloat(), fp.readFloat(), fp.readFloat(), fp.readFloat(), fp.readFloat() ]);
		this.xy        = new Float32Array([ fp.readFloat(), fp.readFloat(), fp.readFloat(), fp.readFloat(), fp.readFloat(), fp.readFloat(), fp.readFloat(), fp.readFloat() ]);
		this.aniframe  = fp.readFloat();
		this.anitype   = fp.readULong();
		this.delay     = fp.readFloat();
		this.angle     = fp.readFloat() / (1024/360);
		this.color     = new Float32Array([ fp.readFloat() / 255.0, fp.readFloat() / 255.0, fp.readFloat() / 255.0, fp.readFloat() / 255.0 ]);
		this.srcalpha  = fp.readULong();
		this.destalpha = fp.readULong();
		this.mtpreset  = fp.readULong();
	}


	/**
	 * Export
	 */
	return STR;
});