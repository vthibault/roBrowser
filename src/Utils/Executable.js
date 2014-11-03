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
	'use strict';


	/**
	 * Binary data of the executable
	 * @var {BinaryReader}
	 */
	var _fp;


	/**
	 * Initialize the executable
	 * Execute callback once ready
	 *
	 * @param {File} executable
	 * @param {function} callback
	 */
	function getDate(executable, callback)
	{
		var reader    = new FileReader();
		reader.onload = function(event){
			_fp = new BinaryReader(event.target.result);
			callback( getDateSub() );
		};
		reader.readAsArrayBuffer(executable);
	}


	/**
	 * Get compilation date of an executable
	 *
	 * @return {number}
	 */
	function getDateSub()
	{
		var offset, date;

		if (!_fp) {
			throw new Error('Executable::getDate() - Executable is not loaded yet, or not specified');
		}

		// Jump to header and extract
		// PEHeader structure position
		_fp.seek( 0x3c, SEEK_SET);
		offset = _fp.readULong();

		if (offset > _fp.length ) {
			throw new Error('Executable::getDate() - Invalid executable specified.');
		}

		// Jump to PEHeader structure
		_fp.seek( offset, SEEK_SET);
		if (_fp.readString(4) !== 'PE') {
			throw new Error('Executable::getDate() - Invalid executable specified.');
		}

		// Extract compiled date from executable
		_fp.seek(0x04, SEEK_CUR);
		date = new Date(_fp.readULong() * 1000);

		// Convert date to YYYYMMDD
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
		if (!file.name.match(/\.exe$/i)) {
			return false;
		}

		// TODO: check in the Executable binary
		if (file.size < 1024 * 1024 * 3 || file.size > 1024 * 1024 * 7) {
			return false;
		}

		return true;
	}


	/**
	 * Exports
	 */
	return {
		getDate:  getDate,
		isROExec: isROExec
	};
});