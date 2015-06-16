/**
 * loaders/Model.js
 *
 * Loaders for Gravity .rsm file (Resource Model)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['utils/BinaryReader', 'utils/gl-matrix'], function( BinaryReader, glMatrix )
{
	'use strict';


	/**
	 * Import
	 */
	var vec3 = glMatrix.vec3;
	var mat3 = glMatrix.mat3;
	var mat4 = glMatrix.mat4;


	/**
	 * Model class loader
	 *
	 * @param {ArrayBuffer} data - optional
	 */
	function RsmReader( data )
	{
		if (data) {
			this.load(data);
		}
	}


	/**
	 * Model Shading type
	 */
	RsmReader.ShadingType = {
		NONE:   0,
		FLAT:   1,
		SMOOTH: 2
	};


	/**
	 * Bounding Box
	 */
	function RsmBox()
	{
		this.max    = vec3.fromValues( -Infinity, -Infinity, -Infinity );
		this.min    = vec3.fromValues(  Infinity,  Infinity,  Infinity );
		this.offset = vec3.create();
		this.range  = vec3.create();
		this.center = vec3.create();
	}
	

	/**
	 * Loading RSM file
	 *
	 * @param {ArrayBuffer} data
	 */
	RsmReader.prototype.load = function load( data )
	{
		var fp, header, name;
		var i, count;
		var textures, nodes, posKeyframes, volumebox;

		// Read header.
		fp      = new BinaryReader(data);
		header  = fp.readBinaryString(4);
	
		if (header !== 'GRSM') {
			throw new Error('RSM::load() - Incorrect header "' + header + '", must be "GRSM"');
		}


		// Read infos
		this.version    = fp.readByte() + fp.readByte()/10;
		this.animLen    = fp.readLong();
		this.shadeType  = fp.readLong();
		this.mainNode   = null;

		this.alpha      = (this.version >= 1.4) ? fp.readUByte() / 255.0 : 1.0;
		fp.seek( 16, BinaryReader.Seek.CUR); // reserved.


		// Read textures.
		count     = fp.readLong();
		textures  =  new Array(count);
		for (i = 0; i < count; ++i) {
			textures[i] = fp.readBinaryString(40);
		}

		// Read nodes.
		name   =  fp.readBinaryString(40);
		count  =  fp.readLong();
		nodes  =  new Array(count);

		for (i = 0; i < count; ++i) {
			nodes[i] =  new RsmNode( this, fp, count === 1 );
			if (nodes[i].name === name) {
				this.mainNode = nodes[i];
			}
		}

		// In some custom models, the default name don't match nodes name.
		// So by default, assume the main node is the first one.
		if (this.mainNode === null) {
			this.mainNode = nodes[0];
		}

		// Read poskeyframes
		if (this.version < 1.5) {
			count         = fp.readLong();
			posKeyframes  = new Array(count);

			for (i = 0; i < count; ++i) {
				posKeyframes[i] = {
					frame: fp.readLong(),
					px:    fp.readFloat(),
					py:    fp.readFloat(),
					pz:    fp.readFloat()
				};
			}

			this.posKeyframes = posKeyframes;
		}
		else {
			this.posKeyframes = [];
		}
	

		// read Volume box
		count       = fp.readLong();
		volumebox   = new Array(count);

		for (i = 0; i < count; ++i) {
			volumebox[i] = {
				size: [ fp.readFloat(), fp.readFloat(), fp.readFloat() ],
				pos:  [ fp.readFloat(), fp.readFloat(), fp.readFloat() ],
				rot:  [ fp.readFloat(), fp.readFloat(), fp.readFloat() ],
				flag: ( this.version >= 1.3 ) ? fp.readLong() : 0
			};
		}

		this.instances    = [];
		this.box          = new RsmBox();
		this.textures     = textures;
		this.nodes        = nodes;
		this.volumebox    = volumebox;


		// Calculate bounding box
		this.calcBoundingBox();
	};


	/**
	 * Create a model instance
	 *
	 * @param {object} model
	 * @param {number} width
	 * @param {number} height
	 */
	RsmReader.prototype.createInstance = function createInstance( model, width, height )
	{
		var matrix = mat4.create();

		mat4.identity( matrix );
		mat4.translate( matrix, matrix, [ model.position[0] + width, model.position[1], model.position[2] + height ] );
		mat4.rotateZ(   matrix, matrix,  model.rotation[2]/180*Math.PI );
		mat4.rotateX(   matrix, matrix, model.rotation[0]/180*Math.PI );
		mat4.rotateY(   matrix, matrix, model.rotation[1]/180*Math.PI );
		mat4.scale(     matrix, matrix, model.scale );

		this.instances.push(matrix);
	};
	

	/**
	 * Calculate model bounding box
	 */
	RsmReader.prototype.calcBoundingBox = function calcBoundingBox()
	{
		var i, j, count;
		var box         = this.box;
		var matrix      = mat4.create();
		var nodes       = this.nodes;
		var min = Math.min, max = Math.max;
		count           = nodes.length;

		mat4.identity(matrix);
		this.mainNode.calcBoundingBox(matrix);

		for (i = 0; i < 3; ++i) {
			for (j = 0; j < count; ++j) {
				box.max[i] = max( box.max[i], nodes[j].box.max[i] );
				box.min[i] = min( box.min[i], nodes[j].box.min[i] );
			}
			box.offset[i] = (box.max[i] + box.min[i]) / 2.0;
			box.range[i]  = (box.max[i] - box.min[i]) / 2.0;
			box.center[i] =  box.min[i] + box.range[i]     ;
		}
	};


	/**
	 * Compile Model
	 */
	RsmReader.prototype.compile = function compile()
	{
		var nodes     = this.nodes;
		var instances = this.instances;

		var nodeCount     = nodes.length;
		var instanceCount = instances.length;
		var i, j, k;

		var meshes = new Array(nodeCount * instanceCount);

		// Generate Mesh
		for (i = 0, k = 0; i < nodeCount; ++i) {
			for (j = 0; j < instanceCount; ++j, k++) {
				meshes[k] = nodes[i].compile( instances[j] );
			}
		}

		return {
			meshes:    meshes,
			textures:  this.textures
		};
	};


	/**
	 * Node Constructor
	 *
	 * @param {object} rsm
	 * @param {object} fp BinaryReader
	 * @param {boolean} only
	 */
	function RsmNode( rsm, fp, only ) {
		var i, j, count, version = rsm.version;
		var textures, vertices, tvertices, faces, posKeyframes, rotKeyframes;

		// Read initialised
		this.main   =  rsm;
		this.isOnly =  only;

		// Read name
		this.name       =  fp.readBinaryString(40);
		this.parentName =  fp.readBinaryString(40);

		// Read textures
		count    = fp.readLong();
		textures = new Array(count);

		for (i = 0; i < count; ++i) {
			textures[i] = fp.readLong();
		}

		// Read options
		this.mat3 = [
			fp.readFloat(), fp.readFloat(), fp.readFloat(),
			fp.readFloat(), fp.readFloat(), fp.readFloat(),
			fp.readFloat(), fp.readFloat(), fp.readFloat()
		];
		this.offset   = [ fp.readFloat(), fp.readFloat(), fp.readFloat() ];
		this.pos      = [ fp.readFloat(), fp.readFloat(), fp.readFloat() ];
		this.rotangle =   fp.readFloat();
		this.rotaxis  = [ fp.readFloat(), fp.readFloat(), fp.readFloat() ];
		this.scale    = [ fp.readFloat(), fp.readFloat(), fp.readFloat() ];


		// Read vertices
		count    = fp.readLong();
		vertices = new Array(count);
		for (i = 0; i < count; ++i) {
			vertices[i] =  [ fp.readFloat(), fp.readFloat(), fp.readFloat() ];
		}


		// Read textures vertices
		count     = fp.readLong();
		tvertices = new Float32Array(count*6);
		for (i = 0, j = 0; i < count; ++i, j+=6) {
			if (version >= 1.2) {
				tvertices[j+0] = fp.readUByte() / 255;
				tvertices[j+1] = fp.readUByte() / 255;
				tvertices[j+2] = fp.readUByte() / 255;
				tvertices[j+3] = fp.readUByte() / 255;
			}
			tvertices[j+4] = fp.readFloat() * 0.98 + 0.01;
			tvertices[j+5] = fp.readFloat() * 0.98 + 0.01;
		}


		// Read faces
		count = fp.readLong();
		faces = new Array(count);
		for (i = 0; i < count; ++i) {
			faces[i] = {
				vertidx:   [ fp.readUShort(), fp.readUShort(), fp.readUShort() ],
				tvertidx:  [ fp.readUShort(), fp.readUShort(), fp.readUShort() ],
				texid:       fp.readUShort(),
				padding:     fp.readUShort(),
				twoSide:     fp.readLong(),
				smoothGroup: version >= 1.2 ? fp.readLong() : 0
			};
		}

		// Read poskeyframes
		if (version >= 1.5) {
			count         = fp.readLong();
			posKeyframes  = new Array(count);

			for (i = 0; i < count; ++i) {
				posKeyframes[i] = {
					frame: fp.readLong(),
					px:    fp.readFloat(),
					py:    fp.readFloat(),
					pz:    fp.readFloat()
				};
			}
		}


		// Read rotkeyframes
		count        = fp.readLong();
		rotKeyframes = new Array(count);

		for (i = 0; i < count; ++i) {
			rotKeyframes[i] = {
				frame: fp.readLong(),
				q:     [ fp.readFloat(), fp.readFloat(), fp.readFloat(), fp.readFloat() ]
			};
		}

		this.box          = new RsmBox();
		this.matrix       = mat4.create();
		this.textures     = textures;
		this.vertices     = vertices;
		this.tvertices    = tvertices;
		this.faces        = faces;
		this.rotKeyframes = rotKeyframes;
		this.posKeyframes = posKeyframes;
	};
	


	
	/**
	 * Calculate node bounding box
	 *
	 * @param {mat4} _matrix
	 */
	RsmNode.prototype.calcBoundingBox = function calcBoundingBox( _matrix )
	{
		// Define variables
		var i, j, count;
		var v = vec3.create();
		var box      = this.box;
		var nodes    = this.main.nodes;
		var matrix   = mat4.create();
		var vertices = this.vertices;
		var max = Math.max, min = Math.min;
		var x, y, z;

		// Find position
		mat4.copy( this.matrix, _matrix );
		mat4.translate( this.matrix, this.matrix, this.pos );

		// Dynamic or static model
		if (!this.rotKeyframes.length) {
			mat4.rotate( this.matrix, this.matrix, this.rotangle, this.rotaxis );
		}
		else {
			mat4.rotateQuat( this.matrix, this.matrix, this.rotKeyframes[0].q );
		}

		mat4.scale( this.matrix, this.matrix, this.scale );

		// Strat from here just modify a local matrix
		mat4.copy( matrix, this.matrix );

		if (!this.isOnly) {
			mat4.translate( matrix, matrix, this.offset );
		}

		mat4.multiply( matrix, matrix, mat3.toMat4(this.mat3) );

		for (i = 0, count = vertices.length; i < count; ++i) {
			//mat4.multiplyVec3( matrix, matrix, vertices[i], v );
			x = vertices[i][0];
			y = vertices[i][1];
			z = vertices[i][2];

			v[0] = matrix[0] * x + matrix[4] * y + matrix[8]  * z + matrix[12];
			v[1] = matrix[1] * x + matrix[5] * y + matrix[9]  * z + matrix[13];
			v[2] = matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14];

			for (j = 0; j < 3; j++) {
				box.min[j] = min(v[j], box.min[j]);
				box.max[j] = max(v[j], box.max[j]);
			}
		}

		for (i = 0; i < 3; i++) {
			box.offset[i] = (box.max[i] + box.min[i]) / 2.0;
			box.range[i]  = (box.max[i] - box.min[i]) / 2.0;
			box.center[i] =  box.min[i] + box.range[i]     ;
		}

		for (i = 0, count = nodes.length; i < count; ++i) {
			if (nodes[i].parentName === this.name && this.name !== this.parentName) {
				nodes[i].calcBoundingBox( this.matrix );
			}
		}
	};


	/**
	 * Compile Node
	 *
	 * @param {mat4} instance_matrix
	 */
	RsmNode.prototype.compile = function compile( instMatrix )
	{
		var matrix;
		var modelViewMat = mat4.create();
		var normalMat    = mat4.create();

		var textures     = this.textures;
		var faces        = this.faces;
		var vertices     = this.vertices;

		var mesh     = {};
		var meshSize = [];

		var vert, faceNormal;
		var shadeGroup     = new Array(32);
		var shadeGroupUsed = new Array(32);
		var i, x, y, z, count;

		// Calculate matrix
		matrix = mat4.create();
		mat4.identity( matrix );
		mat4.translate( matrix, matrix, [ -this.main.box.center[0], -this.main.box.max[1], -this.main.box.center[2] ] );
		mat4.multiply( matrix, matrix, this.matrix );

		if (!this.isOnly) {
			mat4.translate( matrix, matrix, this.offset );
		}

		mat4.multiply( matrix, matrix, mat3.toMat4(this.mat3) );

		// Multiply with instance matrix (position/rotation/...)
		// Generate normal matrix
		mat4.multiply( modelViewMat, instMatrix, matrix );
		mat4.extractRotation( normalMat, modelViewMat );


		// Generate new vertices
		count = vertices.length;
		vert  = new Float32Array(count*3);
		for (i = 0; i < count; ++i) {
			x = vertices[i][0];
			y = vertices[i][1];
			z = vertices[i][2];

			//(vec3)vert = (mat4)modelViewMat * (vec3)vertices[i];
			vert[i*3+0] = modelViewMat[0] * x + modelViewMat[4] * y + modelViewMat[8]  * z + modelViewMat[12];
			vert[i*3+1] = modelViewMat[1] * x + modelViewMat[5] * y + modelViewMat[9]  * z + modelViewMat[13];
			vert[i*3+2] = modelViewMat[2] * x + modelViewMat[6] * y + modelViewMat[10] * z + modelViewMat[14];
		}


		// Generate face normals
		faceNormal = new Float32Array(faces.length*3);

		// Setup mesh slot array
		for (i = 0, count = textures.length; i < count; ++i) {
			meshSize[ textures[i] ] = 0;
		}

		// Find mesh max face
		for (i = 0, count = faces.length; i < count; ++i) {
			meshSize[ textures[ faces[i].texid ] ]++;
		}

		// Initialize buffer
		for (i = 0, count = textures.length; i < count; ++i) {
			mesh[textures[i]] = new Float32Array(meshSize[textures[i]]*9*3);
		}


		if (this.main.shadeType === RsmReader.ShadingType.FLAT) {
			this.calcNormalFlat( faceNormal, normalMat, shadeGroupUsed );
			this.generateMeshFlat( vert, faceNormal, mesh );
		}
		else if (RsmReader.ShadingType.SMOOTH) {
			this.calcNormalFlat( faceNormal, normalMat, shadeGroupUsed );
			this.calcNormalSmooth( faceNormal, shadeGroupUsed, shadeGroup );
			this.generateMeshSmooth( vert, shadeGroup, mesh );
		}
		else {
			this.calcNormalNone( faceNormal );
			this.generateMeshFlat( vert, faceNormal, mesh );
		}

		return mesh;
	};



	/**
	 * Generate default normals
	 *
	 * @param {Float32Array[]} out
	 */
	RsmNode.prototype.calcNormalNone = function calcNormalNone( out )
	{
		var i, count;
		for (i = 1, count = out.length; i < count; i+= 3) {
			out[i] = -1;
		}
	};


	/**
	 * Generate FLAT normals
	 *
	 * @param {Float32Array[]} out
	 * @param {mat4} normalMat
	 * @param {Array} groupUsed
	 */
	RsmNode.prototype.calcNormalFlat = function calcNormalFlat( out, normalMat, groupUsed)
	{
		var i, j, count;
		var face;
		var temp_vec = vec3.create();
		var faces    = this.faces;
		var vertices = this.vertices;

		for (i = 0, j = 0, count = faces.length; i < count; ++i, j+=3) {
			face = faces[i];

			vec3.calcNormal(
				vertices[ face.vertidx[0] ],
				vertices[ face.vertidx[1] ],
				vertices[ face.vertidx[2] ],
				temp_vec
			);

			// (vec3)out = (mat4)normalMat * (vec3)temp_vec:
			out[j  ] = normalMat[0] * temp_vec[0] + normalMat[4] * temp_vec[1] + normalMat[8]  * temp_vec[2] + normalMat[12];
			out[j+1] = normalMat[1] * temp_vec[0] + normalMat[5] * temp_vec[1] + normalMat[9]  * temp_vec[2] + normalMat[13];
			out[j+2] = normalMat[2] * temp_vec[0] + normalMat[6] * temp_vec[1] + normalMat[10] * temp_vec[2] + normalMat[14];

			groupUsed[face.smoothGroup] = true;
		}
	};


	/**
	 * Generate smooth normals
	 *
	 * @param {Float32Array[]} normal
	 * @param {Array} groupUsed
	 * @param {Array} group
	 */
	RsmNode.prototype.calcNormalSmooth = function calcNormalSmooth(normal, groupUsed, group)
	{
		var i, j, k, l, v, x, y, z, len;
		var size  = this.vertices.length;
		var faces = this.faces;
		var face, norm;
		var count = faces.length;

		for (j = 0; j < 32; ++j) {

			// Group not used, skip it
			if (!groupUsed[j]) {
				continue;
			}

			group[j] = new Float32Array(size*3);
			norm     = group[j];

			for (v = 0, l = 0; v < size; ++v, l+=3) {
				x = 0;
				y = 0;
				z = 0;

				for (i = 0, k = 0; i < count; ++i, k+=3) {
					face = faces[i];
					if (face.smoothGroup === j && (face.vertidx[0] === v || face.vertidx[1] === v || face.vertidx[2] === v)) {
						x += normal[k  ];
						y += normal[k+1];
						z += normal[k+2];
					}
				}

				// (vec3)norm = normalize( vec3(x,y,z) );
				len = 1 / Math.sqrt(x*x + y*y + z*z);
				norm[l  ] = x * len;
				norm[l+1] = y * len;
				norm[l+2] = z * len;
			}
		}
	};


	/**
	 * Generate Mesh (with normals type FLAT)
	 *
	 * @param {Float32Array[]} vert
	 * @param {Float32Array[]} norm
	 * @param {Array} mesh
	 */
	RsmNode.prototype.generateMeshFlat = function generateMeshFlat( vert, norm, mesh )
	{
		var a, b, o, i, j, k, t, count;
		var faces    = this.faces;
		var textures = this.textures;
		var tver     = this.tvertices;
		var alpha    = this.main.alpha;
		var offset   = [];
		var face, idx, tidx, out;

		// Setup mesh slot array
		for (i = 0, count = textures.length; i < count; ++i) {
			offset[ textures[i] ] = 0;
		}

		for (i = 0, o = 0, k = 0, count = faces.length; i < count; ++i, k+=3) {
			face = faces[i];
			idx  = face.vertidx;
			tidx = face.tvertidx;
			t    = textures[face.texid];
			out  = mesh[t];
			o    = offset[t];

			for (j = 0; j < 3; j++, o+=9) {
				a =  idx[j] * 3;
				b = tidx[j] * 6;
				/* vec3 positions  */  out[o+0]  = vert[a+0];   out[o+1]  = vert[a+1];   out[o+2] = vert[a+2];
				/* vec3 normals    */  out[o+3]  = norm[k+0];   out[o+4]  = norm[k+1];   out[o+5] = norm[k+2];
				/* vec2 textCoords */  out[o+6]  = tver[b+4];   out[o+7]  = tver[b+5];
				/* float alpha     */  out[o+8]  = alpha;
			}

			offset[t] = o;
		}
	};


	/**
	 * Generate Mesh (with normals type SMOOTH)
	 *
	 * @param {Float32Array[]} vert
	 * @param {Array} shadeGroup
	 * @param {Array} mesh
	 */
	RsmNode.prototype.generateMeshSmooth = function generateMeshSmooth( vert, shadeGroup, mesh )
	{
		var a, b, o, i, j, t, count;
		var faces    = this.faces;
		var textures = this.textures;
		var tver     = this.tvertices;
		var alpha    = this.main.alpha;
		var offset   = [];
		var norm, face, idx, tidx, out;

		// Setup mesh slot array
		for (i = 0, count = textures.length; i < count; ++i) {
			offset[ textures[i] ] = 0;
		}

		for (i = 0, o = 0, count = faces.length; i < count; ++i) {
			face = faces[i];
			norm = shadeGroup[ face.smoothGroup ];
			idx  = face.vertidx;
			tidx = face.tvertidx;

			t    = textures[face.texid];
			out  = mesh[t];
			o    = offset[t];

			for (j = 0; j < 3; j++, o+=9) {
				a =  idx[j] * 3;
				b = tidx[j] * 6;
				/* vec3 positions  */  out[o+0]  = vert[a+0];   out[o+1]  = vert[a+1];   out[o+2] = vert[a+2];
				/* vec3 normals    */  out[o+3]  = norm[a+0];   out[o+4]  = norm[a+1];   out[o+5] = norm[a+2];
				/* vec2 textCoords */  out[o+6]  = tver[b+4];   out[o+7]  = tver[b+5];
				/* float alpha     */  out[o+8]  = alpha;
			}

			offset[t] = o;
		}
	};


	/**
	 * Export
	 */
	return RsmReader;
});