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

			if (DEBUG) {
				echo "Loading file : ". self::$path . self::$data_ini ."\n";
				echo "GRFs to load if needed :\n";
				print_r( $grfs );
				echo "\n";
			}

			return;
		}

		if (DEBUG) {
			if (empty(self::$data_ini)) {
				echo "Empty Client::\$data_ini in index.php\n";
			}
			elseif (!file_exists(self::$path . self::$data_ini)) {
				echo "File not found : ". self::$path . self::$data_ini ."\n";
			}
			elseif (!is_readable(self::$path . self::$data_ini)) {
				echo "Can't read file : ". self::$path . self::$data_ini ."\n";
			}
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

		if (DEBUG) {
			echo "\nSearching file : {$path}\n";
		}

		// Read data first
		if ( file_exists($local_path) && !is_dir($local_path) && is_readable($local_path) ) {
			if (DEBUG) {
				echo "File found at : {$local_path}\n";
			}

			// Store file
			if( self::$AutoExtract ) {
				return self::store( $path, file_get_contents($local_path) );
			}

			return file_get_contents($local_path);
		}
		elseif (DEBUG) {
			echo "No file found at : {$local_path}\n";
		}


		foreach( self::$grfs as $grf ) {

			// Load GRF just if needed
			if( !$grf->loaded ) {
				if (DEBUG) {
					echo "Loading GRF : {$grf->filename}\n";
				}
				$grf->load();
			}

			// If file is found
			if( $grf->getFile($grf_path, $content) ) {
				if (DEBUG) {
					echo "File found in grf : {$grf->filename}\n";
				}

				// Store file
				if( self::$AutoExtract ) {
					return self::store( $path, $content );
				}

				return $content;
			}
			elseif (DEBUG) {
				echo "No file found in grf : {$grf->filename}\n";
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
		if( pathinfo($path, PATHINFO_EXTENSION) === "bmp" )  {
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