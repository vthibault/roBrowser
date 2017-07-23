/**
 * UI/Components/BasicInfo/BasicInfo.js
 *
 * Chararacter Basic information windows
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function(require)
{
	'use strict';


	/**
	 * Dependencies
	 */
	var DB                 = require('DB/DBManager');
	var MonsterTable       = require('DB/Monsters/MonsterTable');
	var Client             = require('Core/Client');
	var Preferences        = require('Core/Preferences');
	var Renderer           = require('Renderer/Renderer');
	var Session            = require('Engine/SessionStorage');
	var UIManager          = require('UI/UIManager');
	var UIComponent        = require('UI/UIComponent');
	var Inventory          = require('UI/Components/Inventory/Inventory');
	var Equipment          = require('UI/Components/Equipment/Equipment');
	var SkillList          = require('UI/Components/SkillList/SkillList');
	var PartyFriends       = require('UI/Components/PartyFriends/PartyFriends');
	var Guild              = require('UI/Components/Guild/Guild');
	var Escape             = require('UI/Components/Escape/Escape');
	var htmlText           = require('text!./BasicInfo.html');
	var cssText            = require('text!./BasicInfo.css');


	/**
	 * Create Basic Info component
	 */
	var BasicInfo = new UIComponent( 'BasicInfo', htmlText, cssText );


	/**
	 * Stored data
	 */
	BasicInfo.base_exp      = 0;
	BasicInfo.base_exp_next = 1;
	BasicInfo.job_exp       = 0;
	BasicInfo.job_exp_next  =-1;
	BasicInfo.weight        = 0;
	BasicInfo.weight_max    = 1;


	/**
	 * @var {Preferences} structure
	 */
	var _preferences = Preferences.get('BasicInfo', {
		x:        0,
		y:        0,
		reduce:   true,
		buttons:  true
	}, 1.0);


	/**
	 * Initialize UI
	 */
	BasicInfo.init = function init()
	{

		// Don't activate drag drop when clicking on buttons
		this.ui.find('.topbar button').mousedown(function( event ){
			event.stopImmediatePropagation();
		});

		this.ui.find('.topbar .right').click(BasicInfo.toggleMode.bind(this));
		this.ui.find('.toggle_btns').mousedown(BasicInfo.toggleButtons.bind(this));

		this.ui.find('.buttons button').mousedown(function(){
			switch (this.className) {
				case 'item':
					Inventory.ui.toggle();
					break;

				case 'info':
					Equipment.toggle();
					break;

				case 'skill':
					SkillList.toggle();
					break;

				case 'option':
					Escape.ui.toggle();
					break;

				case 'party':
					PartyFriends.toggle();
					break;

				case 'guild':
					Guild.toggle();
					break;

				case 'map':
				case 'quest':
			}
		});

		this.draggable();
	};


	/**
	 * When append the element to html
	 * Execute elements in memory
	 */
	BasicInfo.onAppend = function onAppend()
	{
		// Apply preferences
		this.ui.css({
			top:  Math.min( Math.max( 0, _preferences.y), Renderer.height - this.ui.height()),
			left: Math.min( Math.max( 0, _preferences.x), Renderer.width  - this.ui.width())
		});

		// large/small window
		this.ui.removeClass('small large');
		if (_preferences.reduce) {
			this.ui.addClass('small');

			if (_preferences.buttons) {
				this.ui.find('.buttons').show();
			}
			else {
				this.ui.find('.buttons').hide();
			}
		}
		else {
			this.ui.addClass('large');
		}
	};


	/**
	 * Once remove, save preferences
	 */
	BasicInfo.onRemove = function onRemove()
	{
		_preferences.x       = parseInt(this.ui.css('left'), 10);
		_preferences.y       = parseInt(this.ui.css('top'), 10);
		_preferences.reduce  = this.ui.hasClass('small');
		_preferences.buttons = this.ui.find('.buttons').is(':visible');
		_preferences.save();
	};


	/**
	 * Process shortcut
	 *
	 * @param {object} key
	 */
	BasicInfo.onShortCut = function onShortCut( key )
	{
		switch (key.cmd) {
			case 'EXTEND':
				this.toggleMode();
				break;
		}
	};


	/**
	 * Switch window size
	 */
	BasicInfo.toggleMode = function toggleMode()
	{
		var type;

		this.ui.toggleClass('small large');

		if (this.ui.hasClass('large')) {
			this.ui.find('.buttons').show();
			return;
		}

		if (_preferences.buttons) {
			this.ui.find('.buttons').show();
			type = 'off';
		}
		else {
			this.ui.find('.buttons').hide();
			type = 'on';
		}

		Client.loadFile( DB.INTERFACE_PATH + 'basic_interface/view' + type + '.bmp', function(url) {
			this.ui.find('.toggle_btns').css('backgroundImage', 'url(' + url + ')');
		}.bind(this));
	};


	/**
	 * Toggle the list of buttons
	 */
	BasicInfo.toggleButtons = function toggleButtons( event )
	{
		var type;
		var $buttons = this.ui.find('.buttons');

		_preferences.buttons = !$buttons.is(':visible');

		if (_preferences.buttons) {
			$buttons.show();
			type = 'off';
		}
		else {
			$buttons.hide();
			type = 'on';
		}

		Client.loadFile( DB.INTERFACE_PATH + 'basic_interface/view' + type + '.bmp', function(url){
			this.ui.find('.toggle_btns').css('backgroundImage', 'url(' + url + ')');
		}.bind(this));

		event.stopImmediatePropagation();
	};


	/**
	 * Update UI elements
	 *
	 * @param {string} type identifier
	 * @param {number} val1
	 * @param {number} val2 (optional)
	 */
	BasicInfo.update = function update( type, val1, val2 )
	{
		switch (type) {
			case 'name':
			case 'blvl':
			case 'jlvl':
				this.ui.find('.'+ type +'_value').text(val1);
				break;

			case 'zeny':
				Session.zeny = val1;

				var list = val1.toString().split('');
				var i, count = list.length;
				var str = '';

				for (i = 0; i < count; i++) {
					str = list[count-i-1] + (i && i%3 ===0 ? ',' : '') + str;
				}

				this.ui.find('.'+ type +'_value').text(str);
				break;

			case 'job':
				this.ui.find('.job_value').text(MonsterTable[val1]);
				break;

			case 'bexp':
			case 'jexp':
				if (!val2) {
					this.ui.find('.' + type).hide();
					break;
				}

				this.ui.find('.'+ type).show();
				this.ui.find('.'+ type +' div').css('width', Math.min( 100, Math.floor(val1 * 100 / val2) ) + '%');
				this.ui.find('.'+ type +'_value').text( Math.min( 100, (Math.floor(val1 * 1000 / val2) * 0.1).toFixed(1)) + '%');
				break;

			case 'weight':
				this.ui.find('.weight_value').text(val1 / 10 | 0);
				this.ui.find('.weight_total').text(val2 / 10 | 0);
				this.ui.find('.weight').css('color',  val1 < (val2/2) ? '' : 'red');
				break;

			case 'hp':
			case 'sp':
				var perc  = Math.floor(val1 * 100 / val2);
				var color = perc < 25 ? 'red' : 'blue';
				this.ui.find('.'+ type +'_value').text(val1);
				this.ui.find('.'+ type +'_max_value').text(val2);
				this.ui.find('.'+ type +'_perc').text( perc + '%');

				if (perc <= 0) {
					this.ui.find('.'+ type +'_bar div').css('backgroundImage', 'none');
					break;
				}

				Client.loadFile(DB.INTERFACE_PATH + 'basic_interface/gze'+ color +'_left.bmp', function(url){
					this.ui.find('.'+ type +'_bar_left').css('backgroundImage', 'url('+ url +')');
				}.bind(this));

				Client.loadFile(DB.INTERFACE_PATH + 'basic_interface/gze'+ color +'_mid.bmp', function(url){
					this.ui.find('.'+ type +'_bar_middle').css({
						backgroundImage: 'url('+ url +')',
						width: Math.floor( Math.min( perc, 100 ) * 1.27 ) + 'px'
					});
				}.bind(this));

				Client.loadFile(DB.INTERFACE_PATH + 'basic_interface/gze'+ color +'_right.bmp', function(url){
					this.ui.find('.'+ type +'_bar_right').css({
						backgroundImage: 'url('+ url +')',
						left: Math.floor( Math.min( perc, 100) * 1.27 ) + 'px'
					});
				}.bind(this));
				break;
		}
	};


	/**
	 * Create component and export it
	 */
	return UIManager.addComponent(BasicInfo);
});