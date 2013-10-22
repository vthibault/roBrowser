/**
 * UI/Components/Intro/Intro.js
 *
 * Intro Manager
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function(require)
{
	"use strict";


	/**
	 * Dependencies
	 */
	var jQuery      = require('Utils/jquery');
	var UIManager   = require('UI/UIManager');
	var UIComponent = require('UI/UIComponent');
    var Metaling    = require('./Metaling');
	var htmlText    = require('text!./Intro.html');
	var cssText     = require('text!./Intro.css');


	/**
	 * Create Intro component
	 */
	var Intro = new UIComponent( 'Intro', htmlText, cssText );


	/**
	 * Initialize Metaling
	 */
	Intro.init = function Init()
	{
        Metaling.init( this.ui.find('canvas')[0], this.onInit.bind(this));
	};


	/**
	 * Initialize box
	 *
	 */
	Intro.onInit = function OnInit()
	{
		// Bind Input
		this.ui.find('button').one('click', this.process );
		this.ui.find('input[type="file"]').on('change', this.process);
	
		// Bind canvas
		this.ui.find('canvas')
			.click(function(){
				Intro.ui.find('input[type="file"]').click();
			})
			.on('dragover', function(){
				Metaling.setType(Metaling.TYPE.LOVE);
				Intro.ui.find('article').text('');
				return false;
			})
			.on('dragleave', function(){
				Metaling.setType(Metaling.TYPE.SAD);
				Intro.ui.find('article').text('');
				return false;
			})
			.on('drop', this.process );
	
		// Stop action on window
		jQuery(window)
			.on('dragover, dragleave', function( event ){
				event.stopImmediatePropagation();
				return false;
			})
			.on('drop', this.process );
	};


	/**
	 * Once in HTML, focus the input
	 */
	Intro.onAppend = function OnAppend()
	{
		this.ui.animate({ opacity: 1.0 },1000);
		this.ui.find('header').css({ top:-100, opacity:0 }).animate({ top:    0, opacity:1 }, 1000);
		this.ui.find('footer').css({ left:  0, opacity:0 }).animate({ left: 200, opacity:1 }, 1000);
		this.ui.find('article').css({ opacity:0 }).animate({ opacity:1 }, 2000);
	};


	/**
	 * User submit files, get back files
     * @param {object} event
     * @return {boolean} false
	 */
	Intro.process = function Process( event )
	{
		Metaling.setType(Metaling.TYPE.LOAD);
		Intro.ui.find('button').hide();
		Intro.ui.find('article').text('Loading, please wait...');

		// Initialize the client
		Intro.onFilesSubmit(this.files || ( event.originalEvent.dataTransfer && event.originalEvent.dataTransfer.files ) || []);

		event.stopImmediatePropagation();
		return false;
	};


	/**
	 * Callback to used.
	 */
	Intro.onFilesSubmit = function OnFilesSubmit(){};


	/**
	 * Stored component and return it
	 */
	return UIManager.addComponent(Intro);
});