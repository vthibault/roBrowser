/**
 * Loaders/GameFile.js
 *
 * Loaders for Gravity .grf file (Game RO File)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( [ './GameFileDecrypt', 'Utils/BinaryReader', 'Utils/Struct', 'Utils/Inflate' ],
function(    GameFileDecrypt,         BinaryReader,         Struct,         Inflate )
{
	'use strict';



	/**
	 * GRF Constructor
	 *
	 * @param {File} data
	 */
	function GRF( data )
	{
		if (data) {
			this.load( data );
		}
	}


	/**
	 * @var {File System} Nodejs
	 */
	var fs = self.requireNode && self.requireNode('fs');


	/**
	 * GRF Constants
	 */
	GRF.FILELIST_TYPE_FILE           = 0x01; // entry is a file
	GRF.FILELIST_TYPE_ENCRYPT_MIXED  = 0x02; // encryption mode 0 (header DES + periodic DES/shuffle)
	GRF.FILELIST_TYPE_ENCRYPT_HEADER = 0x04; // encryption mode 1 (header DES only)


	/**
	 * GRF Structures
	 */
	GRF.struct_header = new Struct(
		'unsigned char signature[15]',
		'unsigned char key[15]',
		'unsigned long file_table_offset',
		'unsigned long skip',
		'unsigned long filecount',
		'unsigned long version'
	);

	GRF.struct_table = new Struct(
		'unsigned long pack_size',
		'unsigned long real_size'
	);
	
	GRF.struct_entry = new Struct(
		'unsigned long pack_size',
		'unsigned long length_aligned',
		'unsigned long real_size',
		'unsigned char type',
		'unsigned long offset'
	);


	/**
	 * GRF METHODs
	 */
	GRF.prototype.file   = null;
	GRF.prototype.reader = null;
	GRF.prototype.header = null;
	GRF.prototype.table  = null;


	/**
	 * Loading GRF
	 *
	 * @param {File} file
	 */
	GRF.prototype.load   = function Load( file )
	{
		// Global object
		this.file   = file;
		this.reader = new FileReaderSync();


		// Local object
		var buffer, fp;
		var header, entries, table;
		var reader = this.reader;
		var data, out;
		var i, count;


		// Helper
		file.slice  = file.slice || file.webkitSlice || file.mozSlice;
		reader.load = function( start, len ) {
			// node.js
			if (fs && file.fd) {
				var buffer = new Buffer(len);
				fs.readSync(file.fd, buffer, 0, len, start);
				return (new Uint8Array(buffer)).buffer;
			}

			return reader.readAsArrayBuffer(
				file.slice( start, start+len )
			);
		};
	

		// Check if file has enought content.
		if (file.size < GRF.struct_header.size) {
			throw new Error('GRF::load() - Not enough bytes to be a valid GRF');
		}


		// Read the header
		buffer = reader.load( 0, GRF.struct_header.size );
		fp     = new BinaryReader(buffer);
		header = fp.readStruct( GRF.struct_header );

		header.signature  = String.fromCharCode.apply( null, header.signature);
		header.filecount -= header.skip + 7;


		// Check file header
		if (header.signature !== 'Master of Magic') {
			throw new Error('GRF::load() - Incorrect header "' + header.signature + '", must be "Master of Magic".');
		}
	
		if (header.version !== 0x200) {
			throw new Error('GRF::load() - Incorrect version "0x' + parseInt(header.version, 10).toString(16) + '", just support version "0x200"');
		}
	
		if (header.file_table_offset + GRF.struct_header.size > file.size || header.file_table_offset < 0) {
			throw new Error('GRF::load() - Can\'t jump to table list (' + header.file_table_offset + '), file length: ' + file.size);
		}

		// Load Table Info
		buffer = reader.load( header.file_table_offset + GRF.struct_header.size, GRF.struct_table.size );
		fp     = new BinaryReader( buffer );
		table  = fp.readStruct( GRF.struct_table );

		// Load Table Data
		buffer = reader.load( header.file_table_offset + GRF.struct_header.size + GRF.struct_table.size, table.pack_size );
		data   = new Uint8Array(buffer);
		out    = new Uint8Array(table.real_size);

		// Uncompress data
		(new Inflate(data)).getBytes(out);

		// Load entries
		entries = loadEntries(out, header.filecount);

		// Store table data (used for regex search in tablelist)
		// Set filename to lowercase (case insensitive in official client)
		table.data = '';
		for (i = 0, count = entries.length; i < count; ++i) {
			table.data          += entries[i].filename + '\0';
			entries[i].filename  = entries[i].filename.toLowerCase();
		}

		// Sort entries (for binary search)
		entries.sort(sortEntries);

		this.header  = header;
		this.entries = entries;
		this.table   = table;
	};


	/**
	 * Load entries
	 * Note: this function is quiet intensive, BinaryReader is slowing down
	 * the process and generate too much memory to garbage (GC pause of 6sec).
	 *
	 * @param {Uint8Array} content table
	 * @param {number} file count
	 */
	 function loadEntries( out, count )
	 {
		// Read all entries
		var i, pos, str;
		var entries = new Array(count);

		for (i = 0, pos = 0; i < count; ++i) {
			str = '';
			while (out[pos]) {
				str += String.fromCharCode(out[pos++]);
			}
			pos++;

			entries[i] = {
				filename:       str,
				pack_size:      out[pos++] | out[pos++] << 8 | out[pos++] << 16 | out[pos++] << 24,
				length_aligned: out[pos++] | out[pos++] << 8 | out[pos++] << 16 | out[pos++] << 24,
				real_size:      out[pos++] | out[pos++] << 8 | out[pos++] << 16 | out[pos++] << 24,
				type:           out[pos++],
				offset:         out[pos++] | out[pos++] << 8 | out[pos++] << 16 | out[pos++] << 24
			};
		}

		return entries;
	}



	/**
	 * Sort entries (to find it faster)
	 *
	 * @param {object} entry 1
	 * @param {object} entry 2
	 */
	function sortEntries(a, b)
	{
		if (a.filename > b.filename) {
			return 1;
		}

		if (a.filename < b.filename) {
			return -1;
		}

		return 0;
	}


	/**
	 * Decode entry to return its content
	 *
	 * @param {ArrayBuffer}
	 * @param {Entry}
	 * @param {function} callback
	 */
	GRF.prototype.decodeEntry = function DecodeEntry( buffer, entry, callback )
	{
		var out;
		var data = new Uint8Array( buffer );

		// Decode the file
		if (entry.type & GRF.FILELIST_TYPE_ENCRYPT_MIXED) {
			GameFileDecrypt.decodeFull( data, entry.length_aligned, entry.pack_size);
		}
		else if (entry.type & GRF.FILELIST_TYPE_ENCRYPT_HEADER) {
			GameFileDecrypt.decodeHeader( data, entry.length_aligned );
		}

		// Uncompress
		out = new Uint8Array(entry.real_size);
		(new Inflate(data)).getBytes(out);

		callback(out.buffer);
	};


	/**
	 * Binary Search hack to find files in GRF list
	 *
	 * @param {string} filename
	 */
	GRF.prototype.search = function searchClosure()
	{
		var range = new Uint32Array(2);

		return function search( filename )
		{
			var entries = this.entries;
			var v       = 0;
			var middle  = 0;

			range[1] = 0;
			range[0] = entries.length - 1;

			while (range[1] < range[0]) {
				middle   = range[1] + ((range[0]-range[1]) >> 1);
				v        = (entries[middle].filename < filename ? 1 : 0);
				range[v] = middle + v;
			}

			if (range[1] < entries.length && entries[range[1]].filename === filename) {
				return range[1];
			}

			return -1;
		};
	}();



	/**
	 * Find a file in the GRF
	 *
	 * @param {string} filename
	 * @param {function} callback
	 */
	GRF.prototype.getFile = function getFile( filename, callback )
	{
		// Not case sensitive...
		var path = filename.toLowerCase();
		var entry, blob;
		var reader;

		var pos = this.search(path);

		// If filename is find in GRF table list
		if (pos !== -1) {
			entry = this.entries[pos];

			// Directory ?
			if (!(entry.type & GRF.FILELIST_TYPE_FILE)) {
				return false;
			}

			// node.js
			if (fs && this.file.fd) {
				var buffer = new Buffer(entry.length_aligned);
				fs.readSync(this.file.fd, buffer, 0, entry.length_aligned, entry.offset + GRF.struct_header.size);
				grf.decodeEntry( (new Uint8Array(buffer)).buffer, entry, callback);
				return true;
			}

			blob = this.file.slice(
				entry.offset + GRF.struct_header.size,
				entry.offset + GRF.struct_header.size + entry.length_aligned
			);

			// Load into memory
			if (self.FileReader) {
				var grf = this;

				reader = new FileReader();
				reader.onload = function(){
					grf.decodeEntry( reader.result, entry, callback);
				};
				reader.readAsArrayBuffer(blob);
			}

			// Firefox doesn't seems to support FileReader in web worker
			else {
				reader = new FileReaderSync();
				this.decodeEntry( reader.readAsArrayBuffer(blob), entry, callback );
			}

			return true;
		}

		return false;
	};


	/**
	 * Export
	 */
	return GRF;
});