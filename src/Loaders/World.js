/**
 * Loaders/World.js
 *
 * Loaders for Gravity .rsw file (Resource World)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['Utils/BinaryReader', 'Utils/gl-matrix'], function( BinaryReader, glMatrix )
{
	'use strict';


	/**
	 * World class loader
	 *
	 * @param {ArrayBuffer} data - optional
	 */
	function RSW( data )
	{
		this.sounds  = [];
		this.lights  = [];
		this.effects = [];
		this.models  = [];

		if (data) {
			this.load(data);
		}
	}


	/**
	 * Files to load
	 */
	RSW.prototype.files = {
		ini: null,
		gnd: null,
		gat: null,
		src: null
	};


	/**
	 * Ground frustum culling
	 */
	RSW.prototype.ground = {
		top:   -500,
		bottom: 500,
		left:  -500,
		right:  500
	};


	/**
	 * Water informations
	 */
	RSW.prototype.water    = {
		level:       0.0,
		type:        0,
		waveHeight:  0.2,
		waveSpeed:   2.0,
		wavePitch:  50.0,
		animSpeed:   3,
		images:     new Array(32)
	};


	/**
	 * Light informations
	 */
	RSW.prototype.light = {
		longitude: 45,
		latitude:  45,
		diffuse:   [ 1.0, 1.0, 1.0 ],
		ambient:   [ 0.3, 0.3, 0.3 ],
		opacity:   1.0,
		direction: glMatrix.vec3.create()
	};


	/**
	 * Start loading RSW file
	 *
	 * @param {ArrayBuffer} data
	 */
	RSW.prototype.load = function Load( data )
	{
		var header, version;
		var i, count;
		var fp;
	
		// Read header.
		fp      = new BinaryReader(data);
		header  = fp.readBinaryString(4);
		version = fp.readByte() + fp.readByte()/10;
	
		if (header != 'GRSW') {
			throw new Error('RSW::load() - Invalid header "' + header + '", must be "GRSW"');
		}

		// Read sub files.
		this.files.ini = fp.readBinaryString(40);
		this.files.gnd = fp.readBinaryString(40);
		this.files.gat = fp.readBinaryString(40);

		if (version >= 1.4) {
			this.files.src = fp.readBinaryString(40);
		}

		// Read water info.
		if (version >= 1.3) {
			this.water.level = fp.readFloat() / 5;

			if (version >= 1.8) {
				this.water.type       = fp.readLong();
				this.water.waveHeight = fp.readFloat()/5;
				this.water.waveSpeed  = fp.readFloat();
				this.water.wavePitch  = fp.readFloat();

				if (version >= 1.9) {
					this.water.animSpeed = fp.readLong();
				}
			}
		}

		// Read lightmap.
		if (version >= 1.5) {
			this.light.longitude = fp.readLong();
			this.light.latitude  = fp.readLong();
			this.light.diffuse   = [ fp.readFloat(), fp.readFloat(), fp.readFloat() ];
			this.light.ambient   = [ fp.readFloat(), fp.readFloat(), fp.readFloat() ];
	
			if (version >= 1.7) {
				this.light.opacity = fp.readFloat();
			}
		}

		// Read ground
		if (version >= 1.6) {
			this.ground.top    =  fp.readLong();
			this.ground.bottom =  fp.readLong();
			this.ground.left   =  fp.readLong();
			this.ground.right  =  fp.readLong();
		}

		// Read Object
		var models  = this.models;
		var lights  = this.lights;
		var sounds  = this.sounds;
		var effects = this.effects;
		var m=0, l=0, s=0, e=0;

		// Allocate array (faster)
		count = fp.readLong();
		models.length = lights.length = sounds.length = effects.length = count;

		for (i = 0; i < count; ++i) {

			switch (fp.readLong()) {

				case 1:
					models[m++] = {
						name:      version >= 1.3 ? fp.readBinaryString(40) : null,
						animType:  version >= 1.3 ? fp.readLong()  : 0,
						animSpeed: version >= 1.3 ? fp.readFloat() : 0.0,
						blockType: version >= 1.3 ? fp.readLong()  : 0,
						filename:  fp.readBinaryString(80),
						nodename:  fp.readBinaryString(80),
						position:[ fp.readFloat()/5, fp.readFloat()/5, fp.readFloat()/5 ],
						rotation:[ fp.readFloat(),   fp.readFloat(),   fp.readFloat() ],
						scale:   [ fp.readFloat()/5, fp.readFloat()/5, fp.readFloat()/5 ]
					};
					continue;

				case 2:
					lights[l++] = {
						name:    fp.readBinaryString(80),
						pos:   [ fp.readFloat()/5, fp.readFloat()/5, fp.readFloat()/5 ],
						color: [ fp.readLong(),    fp.readLong(),    fp.readLong()  ],
						range:   fp.readFloat()
					};
					continue;

				case 3:
					sounds[s++] = {
						name:     fp.readBinaryString(80),
						file:     fp.readBinaryString(80),
						pos:    [ fp.readFloat()/5, fp.readFloat()/5, fp.readFloat()/5 ],
						vol:      fp.readFloat(),
						width:    fp.readLong(),
						height:   fp.readLong(),
						range:    fp.readFloat(),
						cycle:    version >= 2.0 ? fp.readFloat() : 0.0
					};
					continue;

				case 4:
					effects[e++] = {
						name:   fp.readBinaryString(80),
						pos:  [ fp.readFloat()/5, fp.readFloat()/5, fp.readFloat()/5 ],
						id:     fp.readLong(),
						delay:  fp.readFloat() * 10,
						param: [ fp.readFloat(), fp.readFloat(), fp.readFloat(), fp.readFloat() ] // effectClass.apply(effect, effect.param) ?
					};
			}
		}

		// Remove empty content
		models.length  = m;
		sounds.length  = s;
		lights.length  = l;
		effects.length = e;

		// skip quadtree (not used)
	};
	
	
	
	/**
	 * Compile RSW file
	 */
	RSW.prototype.compile = function Compile()
	{
		return {
			water: this.water,
			light: this.light,
			sound: this.sounds,
			effect: this.effects
		};
	};


	/**
	 * Export
	 */
	return RSW;
});