<?php
	define('DEBUG', false);

	if (DEBUG) {
		ini_set('display_errors', 1);
		error_reporting(E_ALL);

		header("HTTP/1.1 200 OK");
		header('Content-type:text/plain');
	}

	ini_set('memory_limit', '1000M');

	// Set header
	//header("Access-Control-Allow-Origin: *"); // Should already be set by .htaccess
	header("Cache-Control: max-age=2592000, public");
	header("Expires: Sat, 31 Jan 2015 05:00:00 GMT");


	// Include library
	require_once('Grf.php');
	require_once('Bmp.php');
	require_once('Client.php');


	// Client Config
	Client::$path        =  ""           ;  // Define where is locate your full client (note: updating the location can provoke errors on BGM (no looping) because of some headers not properly set)
	Client::$data_ini    =  "DATA.INI"   ;  // the name of your data.ini file (case sensitive)
	Client::$AutoExtract =  false        ;  // Do you want to cache files once extracted from GRF ?
	Client::init();

	// Search Feature
	if ( isset($_POST['filter']) && is_string($_POST['filter']) ) {
		header("HTTP/1.1 200 OK");
		header('Content-type: text/plain');
		$filter = ini_get('magic_quotes_gpc') ? stripslashes($_POST['filter']) : $_POST['filter'];
		$filter = '/'. $filter. '/i';
		$filter = utf8_decode($filter);
		$list   = Client::search($filter);
		die( implode("\n",$list) );
	}


	// Nothing to do
	if( empty($_SERVER['REDIRECT_STATUS']) || $_SERVER['REDIRECT_STATUS'] != 404 || empty($_SERVER['REQUEST_URI']) ) {
		if (DEBUG) {
			echo 'No file requested';
		}
		die();	
	}


	// Decode path
	$path      = utf8_decode(urldecode($_SERVER['REQUEST_URI']));
	$directory = basename(dirname(__FILE__));
	$args      = explode($directory . '/', $path, 2 );
	$path      = end($args);
	$args      = explode('/', $path);

	if( empty($args[0]) ) {
		array_shift($args);
	}

	// Allowed directory
	if( !preg_match( "/^(data|BGM)$/", $args[0]) ) {
		if (DEBUG) {
			echo 'Forbidden directory';
		}
		exit;
	}

	$path = implode($args, '\\');
	$ext  = pathinfo($path, PATHINFO_EXTENSION);


	// Search the file
	$file = Client::getFile($path);


	// File not found, end.
	if ($file === false) {
		if (DEBUG) {
			echo 'File not found';
		}
		die();
	}

	if (DEBUG) {
		die();
	}

	header("HTTP/1.1 200 OK");
	switch( strtolower($ext) ) {
		case 'jpg':
		case 'jpeg': header('Content-type:image/jpeg'); break;
		case 'bmp':  header('Content-type:image/bmp');  break;
		case 'gif':  header('Content-type:image/gif');  break;
		case 'xml':  header('Content-type:text/xml');   ob_start("ob_gzhandler"); break;
		case 'txt':  header('Content-type:text/plain'); ob_start("ob_gzhandler"); break;
		case 'mp3':  header('Content-type:audio/mp3');  break;
	}

	echo $file;
?>