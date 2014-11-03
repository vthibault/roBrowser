<?php

/**
* @fileoverview Debugging
* @author Vincent Thibault (alias KeyWorld - Twitter: @robrowser)
* @version 1.0.0
*/

final class Debug
{
	static private $messages = array();
	static private $actived  = false;


	/**
	 * Add a message to the list
	 *
	 * @param {string} message to display
	 * @param {string} optional class
	 */
	static public function write($message, $class='')
	{
		self::$messages[] = '<div class="'.$class.'">'. $message . '</div>';
	}


	/**
	 * Enable
	 */
	static public function enable()
	{
		ini_set('display_errors', 1);
		error_reporting(E_ALL);

		self::$actived = true;
	}


	/**
	 * Disable debug mode
	 */
	static public function disable()
	{
		ini_set('display_errors', 0);
		error_reporting(-1);

		self::$actived = false;
	}


	/**
	 * Is in debug mode ?
	 *
	 * @return {boolean}
	 */
	static public function isEnable()
	{
		return self::$actived;
	}


	/**
	 * Output the log
	 */
	static public function output() {
		if (self::$actived) {
			header('Content-type:text/html');

			echo '<style type="text/css">';
			echo '.info { color:#c50; }';
			echo '.error { color:#f00; font-weight:bold; }';
			echo '.success { color:#080; }';
			echo '.title { margin-top:20px; font-weight:bold; color: #05A; }';
			echo '</style>';

			echo '<h1>Debug Trace</h1>';
			echo implode('', self::$messages);

			echo '<p><em>Make sure to turn off the debug mode in configs.php once successfully configured.</em></p>';
		}

		exit();
	}
}