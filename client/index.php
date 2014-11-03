<?php

	// Include library
	require_once('Debug.php');
	require_once('Grf.php');
	require_once('Bmp.php');
	require_once('Client.php');
	$CONFIGS = require_once('configs.php');


	// Apply configs
	if ($CONFIGS['DEBUG']) {
		Debug::enable();
	}


	Client::$path        =  '';
	Client::$data_ini    =  $CONFIGS['CLIENT_RESPATH'] . $CONFIGS['CLIENT_DATAINI'];
	Client::$AutoExtract =  $CONFIGS['CLIENT_AUTOEXTRACT'];


	// Initialize client
	ini_set('memory_limit', '1000M');
	Client::init();


	/**
	 * SEARCH ACCESS
	 * This features is only used in map/rsm/str/grf viewer
	 * If you are not using them, you can comment this block
	 */
	if (isset($_POST['filter']) && is_string($_POST['filter'])) {
		header('Status: 200 OK', true, 200);
		header('Content-type: text/plain');

		if (!$CONFIGS['CLIENT_ENABLESEARCH']) {
			exit();
		}

		$filter = ini_get('magic_quotes_gpc') ? stripslashes($_POST['filter']) : $_POST['filter'];
		$filter = utf8_decode('/'. $filter. '/i');
		$list   = Client::search($filter);

		die( implode("\n", $list) );
	}


	/**
	 * DIRECT ACCESS
	 */
	if (empty($_SERVER['REDIRECT_STATUS']) || $_SERVER['REDIRECT_STATUS'] != 404 || empty($_SERVER['REQUEST_URI'])) {
		Debug::write('Direct access, no file requested ! You have to request a file (from the url), for example: <a href="data/clientinfo.xml">data/clientinfo.xml</a>', 'error');
		Debug::output();
	}


	// Decode path
	$path      = str_replace('\\', '/', utf8_decode(urldecode($_SERVER['REQUEST_URI'])));
	$path      = preg_replace('/\?.*/', '', $path); // remove query
	$directory = basename(dirname(__FILE__));

	// Check Allowed directory
	if (!preg_match( '/\/('. $directory . '\/)?(data|BGM)\//', $path)) {
		Debug::write('Forbidden directory, you can just access files located in data and BGM folder.', 'error');
		Debug::output();
	}

	// Get file
	$path = preg_replace('/(.*('. $directory . '\/)?)(data|BGM\/.*)/', '$3', $path );
	$path = str_replace('/', '\\', $path);
	$ext  = strtolower(pathinfo($path, PATHINFO_EXTENSION));
	$file = Client::getFile($path);


	// File not found, end.
	if ($file === false) {
		Debug::write('Failed, file not found...', 'error');
		Debug::output();
	}
	else {
		Debug::write('Success !', 'success');
	}


	header('Status: 200 OK', true, 200);
	header("Cache-Control: max-age=2592000, public");
	header("Expires: Sat, 31 Jan 2015 05:00:00 GMT");

	// Display appropriate header
	switch ($ext) {
		case 'jpg':
		case 'jpeg': header('Content-type:image/jpeg');               break;
		case 'bmp':  header('Content-type:image/bmp');                break;
		case 'gif':  header('Content-type:image/gif');                break;
		case 'xml':  header('Content-type:application/xml');          break;
		case 'txt':  header('Content-type:text/plain');               break;
		case 'mp3':  header('Content-type:audio/mp3');                break;
		default:     header('Content-type:application/octet-stream'); break;
	}

	// Output
	if (Debug::isEnable()) {
		Debug::output();
	}

	// GZIP some files
	if (in_array($ext, array('txt', 'xml', 'rsw', 'rsm', 'gnd', 'gat', 'spr', 'act', 'pal'))) {
		ob_start("ob_gzhandler");
	}

	echo $file;
