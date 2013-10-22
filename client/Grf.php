<?php

/**
* @fileoverview Grf - Load and Parse .grf file (only 0x200 version without DES encryption).
* @author Vincent Thibault (alias KeyWorld - Twitter: @robrowser)
* @version 1.0.0
*/

class Grf
{

	private $fileTable, $header;
	public $loaded = false;
	protected $fp;

	const HEADER_SIZE = 46;


	/**
	 * Constructor, open the filename if specify
	 */
	public function __construct($filename=false)
	{
		if( $filename )
			$this->open($filename);
	}


	/**
	 * Clean up memory
	 */
	public function __destruct()
	{
		if( $this->fp && is_resource($this->fp) ) {
			fclose($this->fp);
		}
	}


	/**
	 * Open a file
	 */
	public function open($filename)
	{
		if( !file_exists($filename) || !is_readable($filename) )
			throw new Exception("GRF::load() - Can't open '{$filename}'.");

		if( filesize($filename) < self::HEADER_SIZE )
			throw new Exception("GRF::load() - Not enough data to contain a valid header.");

		// Open it
		$this->fp   = fopen( $filename, 'r' );
	}


	/**
	 * Load the GRF
	 */
	public function load()
	{
		if( empty($this->fp) )
			throw new Exception("GRF::load() - No file specify.");

		// Parse header.
		$this->header = unpack("a15signature/a15key/Ltable_offset/Lseeds/Lfilecount/Lversion", fread($this->fp, self::HEADER_SIZE) );

		if ( $this->header['signature'] !== 'Master of Magic' || $this->header['version'] !== 0x200 )
			throw new Exception("GRF::load() - Sorry, can just open 0x200 version.");

		// Load table list
		fseek( $this->fp, $this->header['table_offset'], SEEK_CUR);
		$fileTableInfo   = unpack("Lpack_size/Lreal_size", fread($this->fp, 0x08));
		$this->fileTable = @gzuncompress( fread( $this->fp, $fileTableInfo['pack_size'] ), $fileTableInfo['real_size'] );

		// Extraction error
		if($this->fileTable === false )
			throw new Exception("GRF::load() - Can't extract fileTable.");

		// Grf now loaded
		$this->loaded    = true;
	}


	/**
	 * Search a filename
	 */
	public function getFile($filename, &$content)
	{
		if( !$this->loaded )
			return false;

		// Case sensitive. faster
		$position = strpos( $this->fileTable, $filename . "\0" );

		// Not case sensitive, slower...
		if( $position === false ){
			$position = stripos( $this->fileTable, $filename . "\0" );
		}

		// File not found
		if( $position === false )
			return false;

		// Extract file info from fileList
		$position += strlen($filename) + 1;
		$fileInfo  = unpack('Lpack_size/Llength_aligned/Lreal_size/Cflags/Lposition', substr($this->fileTable, $position, 17) );

		// Just open file.
		if( $fileInfo['flags'] !== 1 )
			return false;

		// Extract file
		fseek( $this->fp, $fileInfo['position'] + self::HEADER_SIZE, SEEK_SET );
		$content = gzuncompress( fread($this->fp, $fileInfo['pack_size']), $fileInfo['real_size'] );

		return true;
	}


	/**
	 * Filter
	 * Find all occurences of a string in GRF list
	 */
	public function search( $regex ) {
		$list = array();
		@preg_match_all( $regex, $this->fileTable, $matches );

		if ( !empty($matches) ) {
			$list = $matches[0];
			sort($list);
		}

		return $list;
	}
}