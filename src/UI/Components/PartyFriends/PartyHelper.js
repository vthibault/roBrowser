/**
 * UI/Components/PartyFriends/PartyHelper.js
 *
 * Helper for the PartyFriends window child (to manage party creation, invitation and updating settings).
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
	var UIManager      = require('UI/UIManager');
	var UIComponent    = require('UI/UIComponent');
	var htmlText       = require('text!./PartyHelper.html');
	var cssText        = require('text!./PartyHelper.css');


	/**
	 * Create Component
	 */
	var PartyHelper = new UIComponent('PartyHelper', htmlText, cssText );


	/**
	 * @enum Window type constant
	 */
	PartyHelper.Type = {
		CREATE: 0,
		SETUP:  1,
		INVITE: 2
	};


	/**
	 * @var {number} type
	 */
	var _type = PartyHelper.Type.CREATE;


	/**
	 * Initialize the component (event listener, etc.)
	 */
	PartyHelper.init = function init()
	{
		// Avoid drag drop problems
		this.ui.find('.base').mousedown(function(event){
			event.stopImmediatePropagation();
			return false;
		});

		this.ui.on('mousedown', '.off', function(){
			if (PartyHelper.ui.find('.content').hasClass('disabled')) {
				return;
			}

			var off, on, tmp;

			// Swap elements
			on  = this.parentNode.getElementsByClassName('on')[0];
			off = this;

			on.className =  'off';
			off.className = 'on';

			tmp = on.style.backgroundImage;
			on.style.backgroundImage = off.style.backgroundImage;
			off.style.backgroundImage = tmp;
		});

		this.ui.find('.cancel, .close').click(this.remove.bind(this));
		this.ui.find('.ok').click(onValidate);

		this.draggable(this.ui.find('.titlebar'));
	};


	/**
	 * Once append to the DOM, start to position the UI
	 */
	PartyHelper.onAppend = function onAppend()
	{
		var base = UIManager.getComponent('PartyFriends').ui;

		this.ui.find('.setup, .create, .invite').hide();
		this.ui.find('.name').val('').focus().select();

		this.ui.css({
			top:  base.css('top'),
			left: parseInt(base.css('left'), 10) + base.width() + 10
		});
	};


	/**
	 * Removing the UI from window, save preferences
	 */
	PartyHelper.onRemove = function onRemove()
	{
		this.ui.find('.setup, .create, .invite').hide();
		this.ui.find('.name').val('');
	};


	/**
	 * Initilize type
	 *
	 * @param {number} set window mode
	 */
	PartyHelper.setType = function setType( type )
	{
		this.ui.find('.content').removeClass('disabled');

		switch (type) {
			case PartyHelper.Type.CREATE:
				this.ui.find('.setup, .invite').hide();
				this.ui.find('.create').show();
				break;

			case PartyHelper.Type.INVITE:
				this.ui.find('.setup, .create').hide();
				this.ui.find('.invite').show();
				break;

			case PartyHelper.Type.SETUP:
				this.ui.find('.create .invite').hide();
				this.ui.find('.setup').show();
				break;
		}

		_type = type;
	};


	/**
	 * Set party settings
	 *
	 * @param {object} options
	 * @param {boolean} is editable ?
	 */
	PartyHelper.setOptions = function setOptions( options, editable )
	{
		function swap(off) {
			var on, tmp;
			on = off.parentNode.getElementsByClassName('on')[0];

			on.className  = 'off';
			off.className = 'on';

			tmp = on.style.backgroundImage;
			on.style.backgroundImage = off.style.backgroundImage;
			off.style.backgroundImage = tmp;
		}

		var list = ['exp_share', 'item_share', 'item_sharing_type'];
		var i, count = list.length;
		var element;

		for (i = 0; i < count; ++i) {
			element = this.ui.find('.' + list[i]).find('.off');
			if (options[list[i]] == element.data('index')) {
				swap(element);
			}
		}

		if (!editable) {
			this.ui.find('.content').addClass('disabled');
		}
		else {
			this.ui.find('.content').removeClass('disabled');
		}
	};


	/**
	 * Get window mode
	 *
	 */
	PartyHelper.getType = function getType()
	{
		return _type;
	};


	/**
	 * Validate the form
	 */
	function onValidate()
	{
		var name, PartyFriends;

		PartyFriends = UIManager.getComponent('PartyFriends');

		switch (_type) {
			case PartyHelper.Type.CREATE:
				name = PartyHelper.ui.find('.content .name').val();
				if (name.length) {
					PartyFriends.onRequestPartyCreation(
						name,
						+PartyHelper.ui.find('.item_share .on').data('value'),
						+PartyHelper.ui.find('.item_sharing_type .on').data('value')
					);
				}
				break;

			case PartyHelper.Type.INVITE:
				name = PartyHelper.ui.find('.content .name').val();
				if (name.length) {
					PartyFriends.onRequestAddingMember(0, name);
				}
				break;

			case PartyHelper.Type.SETUP:
				PartyFriends.onRequestSettingUpdate(
					+PartyHelper.ui.find('.exp_share .on').data('value'),
					+PartyHelper.ui.find('.item_share .on').data('value'),
					+PartyHelper.ui.find('.item_sharing_type .on').data('value')
				);
				break;
		}

		PartyHelper.remove();
	}


	/**
	 * Callbacks to use
	 */
	PartyHelper.onCreate      = function onCreate(){};
	PartyHelper.onInvite      = function onInvite(){};
	PartyHelper.onSetupUpdate = function onSetUpUpdate(){};


	/**
	 * Export
	 */
	return UIManager.addComponent(PartyHelper);
});