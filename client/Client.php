<?php

/**
* @fileoverview Client - File Manager
* @author Vincent Thibault (alias KeyWorld - Twitter: @robrowser)
* @version 1.5.1
*/


final class Client
{
	/**
	 * Define the client dir
	 */
	static public $path        = "";
	static public $data_ini    = "";
	static private $grfs       = array();
	static public $AutoExtract = false;



	/**
	 * Load on init
	 */
	static public function init()
	{
		// Load GRFs from DATA.INI
		if ( !empty(self::$data_ini) && file_exists(self::$path . self::$data_ini) && is_readable(self::$path . self::$data_ini) ) {

			// Setup GRF context
			$data_ini = parse_ini_file( self::$path . self::$data_ini, true );
			$grfs     = array();

			foreach( $data_ini['Data'] as $index => $grf_filename ) {
				self::$grfs[$index] = new Grf(self::$path . $grf_filename);
				self::$grfs[$index]->filename = $grf_filename;
				$grfs[] = $grf_filename;
			}

			return;
		}
	}



	/**
	 * Get a file from client, search it on data dir first, and on grfs.
	 */
	static public function getFile($path)
	{
		$local_path  = self::$path;
		$local_path .= str_replace('\\', '/', $path );
		$grf_path    = str_replace('/', '\\', $path );


		// Read data first
		if ( file_exists($local_path) && !is_dir($local_path) && is_readable($local_path) ) {

			// Store file
			if( self::$AutoExtract ) {
				return self::store( $path, file_get_contents($local_path) );
			}

			return file_get_contents($local_path);
		}

		foreach( self::$grfs as $grf ) {

			// Load GRF just if needed
			if( !$grf->loaded ) {
				$grf->load();
			}

			// If file is found
			if( $grf->getFile($grf_path, $content) ) {

				// Store file
				if( self::$AutoExtract ) {
					return self::store( $path, $content );
				}

				return $content;
			}
		}

		return false;
	}



	/**
	 * Storing file in data folder (convert it if needed)
	 */
	static public function store( $path, $content )
	{
		$path         = utf8_encode($path);
		$current_path = self::$path;
		$local_path   = $current_path . str_replace('\\', '/', $path );
		$directories  = explode('\\', $path );
		array_pop($directories);

		// Creating directories
		foreach( $directories as $dir ) {
			$current_path .= $dir . DIRECTORY_SEPARATOR;

			if( !file_exists($current_path) ) {
				mkdir( $current_path );
			}
		}

		// storing bmp images as png
		if( end( explode('.',$path) ) === "bmp" )  {
			$img  = imagecreatefrombmpstring( $content );
			$path = str_replace(".bmp", ".png", $local_path);
			imagepng($img, $path );
			return file_get_contents( $path );
		}

		else {
			// Saving file
			file_put_contents( $local_path, $content);
			return $content;
		}
	}



	/**
	 * Search files (only work in GRF)
	 */
	static public function search($filter) {
		$out = array();

		foreach( self::$grfs as $grf ) {

			// Load GRF only if needed
			if( !$grf->loaded ) {
				$grf->load();
			}

			// Search
			$list = $grf->search($filter);

			// Merge
			$out  = array_unique( array_merge($out, $list ) );
		}

		//sort($out);
		return $out;
	}
}