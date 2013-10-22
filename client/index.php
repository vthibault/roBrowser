<?php
	ini_set('memory_limit', '1000M');
	error_reporting(E_ALL);

	// Set header
	header("Access-Control-Allow-Origin: *");
	header("Cache-Control: max-age=2592000, public");
	header("Expires: Sat, 31 Jan 2015 05:00:00 GMT");
	ob_start("ob_gzhandler");


	// Include library
	require_once('Grf.php');
	require_once('Bmp.php');
	require_once('Client.php');


	// Client Config
	Client::$path     =  "FullClient/";   // Define where is locate your full client
	Client::$data_ini =  "data.ini"   ;   // the name of your data.ini file (case sensitive)
	Client::init();

	// Search Feature
	if ( isset($_POST['filter']) && is_string($_POST['filter']) ) {
		header("HTTP/1.0 200 OK");
		header('Content-type: text/plain');
		$filter = ini_get('magic_quotes_gpc') ? stripslashes($_POST['filter']) : $_POST['filter'];
		$filter = '/'. $filter. '/i';
		$filter = utf8_decode($filter);
		$list   = Client::search($filter);
		die( implode("\n",$list) );
	}


	// Nothing to do
	if( empty($_SERVER['REDIRECT_STATUS']) || $_SERVER['REDIRECT_STATUS'] != 404 || empty($_SERVER['REQUEST_URI']) ) {
		die();	
	}


	// Decode path
	$path      = utf8_decode(urldecode($_SERVER['REQUEST_URI']));
	$directory = basename(dirname(__FILE__));
	$path = end(explode($directory . '/', $path, 2 ));
	$args = explode('/', $path);
	$path = implode($args, '\\');
	$ext  = end( explode('.',$path) );


	// Search the file
	$file = Client::getFile($path);


	// File not found, end.
	if ( $file === false ) {
		die();
	}

	header("HTTP/1.0 200 OK");
	switch( strtolower($ext) ) {

		// Convert bmp images to png (less weight)
		case 'bmp':
			header('Content-type:image/png');
			$img = imagecreatefrombmpstring( $file);
			imagepng($img);
			die();

		case 'jpg':
		case 'jpeg': header('Content-type:image/jpeg'); break;
		case 'gif':  header('Content-type:image/gif');  break;
		case 'xml':  header('Content-type:text/xml');   break;
		case 'txt':  header('Content-type:text/plain'); break;
	}

	echo $file;
?>