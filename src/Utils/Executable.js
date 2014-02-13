/**
 * Utils/Executable.js
 *
 * Executable
 *
 * Helper to load an executable and extract some informations (compiled date, and some RO things).
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
 
define( ['./BinaryReader'], function( BinaryReader )
{
	"use strict";


	/**
	 * Binary data of the executable
	 * @var string
	 */
	var _binary = null;


	/**
	 * Initialize the executable
	 * Execute callback once ready
	 *
	 * @param {File} executable
	 * @param {function} callback
	 */
	function GetDate(executable, callback)
	{
		var reader    = new FileReader();
		reader.onload = function(event){
			var data = new Uint8Array(event.target.result);
			var i, count;
			_binary = "";

			for (i = 0, count = data.length; i < count; ++i) {
				_binary += String.fromCharCode( data[i] );
			}
			callback( GetDateSub() );
		};
		reader.readAsArrayBuffer(executable);
	}


	/**
	 * Get compilation date of an executable
	 *
	 * @return {number}
	 */
	function GetDateSub()
	{
		if( _binary === null ) {
			throw new Error('Executable::getDate() - Executable is not loaded yet, or not specify.');
		}

		var offset;
		var bin, date, fp;
	
		// Search PE Header ("PE..")
		offset = _binary.indexOf("\x50\x45\x00\x00");

		// Invalid exe ?
		if( offset === -1 ) {
			throw new Error('Executable::getDate() - Invalid executable specified.');
		}

		bin  = _binary.substr( offset + 0x08, 0x04);
		fp   = new BinaryReader(bin);
		date = new Date( fp.readULong() * 1000);

		return (
			 date.getFullYear()   * 1E4 +
			(date.getMonth() + 1) * 1E2 +
			 date.getDate()
		);
	}


	/**
	 * Check if a file is a RO executable
	 *
	 * @param {File} file
	 * @return {boolean} true if it's a RO file
	 */
	function isROExec(file)
	{
		if( !file.name.match(/\.exe$/i) ) {
			return false;
		}

		// TODO: check in the Executable binary
		if( file.size < 1024 * 1024 * 3 || file.size > 1024 * 1024 * 5 ) {
			return false;
		}

		return true;
	}


	/**
	 * Exports
	 */
	return {
		getDate:  GetDate,
		isROExec: isROExec
	};
});