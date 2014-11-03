<?php

	return array(


		/**
		 * If debug mode is set to true, you will be able to see some trace informations and
		 * locate more easily errors.
		 *
		 * Note: once the bugs are resolved, set it to false else roBrowser will not be
		 * able to work properly.
		 */
		'DEBUG'               =>     false,


		/**
		 * Define where is located your full client files
		 * By default it's on the directory 'resources/' but you can update it if you need
		 *
		 * Note: The files required in this directory are DATA.INI and your GRFs files.
		 *       All others files will not be read.
		 */
		'CLIENT_RESPATH'      =>    'resources/',


		/**
		 * Name of the DATA.INI file
		 * This file is used to know the GRFs the remote client have to load and the right
		 * order to load them.
		 *
		 * Note: this file name is CASE SENSITIVE and should be located in resources/ folder
		 *
		 * Example of the content of this file:
		 *
		 *	[Data]
		 *	0=custom.grf
		 *	1=rdata.grf
		 *	2=data.grf
		 */
		'CLIENT_DATAINI'      =>    'DATA.INI',


		/**
		 * If set to true, files loaded from GRFs will be extracted to the data folder
		 * It will avoid to load GRFs each time the client request a file and
		 * save server resources.
		 *
		 * Note: it required write access to the data folder.
		 */
		'CLIENT_AUTOEXTRACT'  =>    false,


		/**
		 * Does we enable post method to get back informations about files stored in GRF ?
		 * It's used in Grf Viewer to list files of a repertorie or to search files.
		 *
		 * If you don't use the Grf Viewer, Model Viewer, Map Viewer and Str Viewer you
		 * can just disable this feature.
		 */
		'CLIENT_ENABLESEARCH' =>    true,
	);