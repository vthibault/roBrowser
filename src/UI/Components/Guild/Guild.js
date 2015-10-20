/**
 * UI/Components/Guild/Guild.js
 *
 * Chararacter Guild
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author @vthibault, @Javierlog08, @scriptord3
 */
define(function(require)
{
	'use strict';


	/**
	 * Dependencies
	 */
	var DB             = require('DB/DBManager');
	var MonsterTable   = require('DB/Monsters/MonsterTable');
	var Session        = require('Engine/SessionStorage');
	var Entity         = require('Renderer/Entity/Entity');
	var SpriteRenderer = require('Renderer/SpriteRenderer');
	var Camera         = require('Renderer/Camera');
	var Renderer       = require('Renderer/Renderer');
	var Preferences    = require('Core/Preferences');
	var Client         = require('Core/Client');
	var UIManager      = require('UI/UIManager');
	var UIComponent    = require('UI/UIComponent');
	var ContextMenu    = require('UI/Components/ContextMenu/ContextMenu');
	var ChatBox        = require('UI/Components/ChatBox/ChatBox');
	var InputBox       = require('UI/Components/InputBox/InputBox');
	var htmlText       = require('text!./Guild.html');
	var cssText        = require('text!./Guild.css');


	/**
	 * @var {Preferences} structure
	 */
	var _preferences = Preferences.get('Guild', {
		x: 100,
		y: 100
	}, 1.0);


	/**
	 * Flags to check access
	 * (Look up for Type)
	 */
	var AccessTypeBit = {
		0: 0x00, // General
		1: 0x01, // Members
		2: 0x02, // Position
		3: 0x04, // Skills
		4: 0x10, // Expel
		5: 0x40, // Unknown
		6: 0x80  // Notice
	};


	/**
	 * Create Component
	 */
	var Guild = new UIComponent( 'Guild', htmlText, cssText );


	/**
	 * View template
	 */
	var MemberView, PositionView, ExpelView;


	/**
	 * @var {Array} position list
	 */
	var _positions = [];


	/**
	 * @var {Array} members list
	 */
	var _members = [];


	/**
	 * @var {number} total guild exp
	 */
	var _totalExp = 0;


	/**
	 * @var {number} access to guild tab
	 */
	var _guildAccess = 0;


	/**
	 * @var {string} checkbox images
	 */
	var _checkbox_off, _checkbox_on;


	/**
	 * Initialize component
	 */
	Guild.init = function init()
	{
		var ui = this.ui;

		MemberView   = this.ui.find('.MemberView').remove();
		PositionView = this.ui.find('.PositionView').remove();
		ExpelView    = this.ui.find('.ExpelView').remove();

		// Close button
		ui.find('.titlebar .close').mousedown(stopPropagation).click(Guild.toggle.bind(this));
		ui.find('.tabs').on('click', 'button', onChangeTab);

		// Preload image
		Client.loadFiles([DB.INTERFACE_PATH + 'checkbox_0.bmp', DB.INTERFACE_PATH + 'checkbox_1.bmp'], function(off,on) {
			_checkbox_off = off;
			_checkbox_on  = on;
		});

		// Positions
		ui.find('.content.positions tbody')
			.on('mousedown', 'input', function(){
				return Session.isGuildMaster;
			})
			.on('focus', 'input', function(){
				ui.find('.footer .btn_ok').show();
				this.select();
			})
			.on('click', 'button', function(){
				if (Session.isGuildMaster) {
					this.className = (this.className === 'on' ? 'off' : 'on');
					this.style.backgroundImage = 'url('+ (this.className === 'on' ? _checkbox_on : _checkbox_off) +')';
					ui.find('.footer .btn_ok').show();
				}
			})
			.on('mousedown', 'tr', function(){
				ui.find('.content.positions tbody tr').removeClass('active');
				this.classList.add('active');
			});

		// Antagonist/Ally
		ui.find('.content.info .ally_list, .content.info .hostile_list')
			.on('contextmenu', 'div', function(){
				var relation = this.parentNode.classList.contains('ally_list') ? 0 : 1;
				var guild_id = parseInt(this.getAttribute('data-guild-id'), 10);

				ui.find('.content.info .ally_list div, .content.info .hostile_list div').removeClass('active');
				this.classList.add('active');

				ContextMenu.remove();
				ContextMenu.append();
				ContextMenu.addElement(DB.getMessage(351), function(){
					Guild.onRequestDeleteRelation(guild_id, relation);
				});
			});

		// Members
		ui.find('.content.members tbody')
			.on('mousedown', 'tr', function(){
				ui.find('.content.members tbody tr').removeClass('active');
				this.classList.add('active');
			})
			.on('contextmenu', 'td.name', function(){
				var index  = this.parentNode.getAttribute('data-index');
				var member = _members[index];
				var isSelf = ((member.AID === Session.AID) && (member.GID === Session.GID));

				ContextMenu.remove();
				ContextMenu.append();

				// View Information
				ContextMenu.addElement( DB.getMessage(129), function(){
					Guild.onRequestMemberInfo(member.AID);
				}); 

				// Leave Guild
				if (isSelf && !Session.isGuildMaster) {
					ContextMenu.addElement( DB.getMessage(508), function(){
						InputBox.append();
						InputBox.setType('text');
						InputBox.ui.find('.text').text(DB.getMessage(523));
						InputBox.onSubmitRequest = function(reason) {
							InputBox.remove();
							Guild.onRequestLeave(member.AID, member.GID, reason);
						};
					}); 
				}

				// Expel
				if ((Session.guildRight & 0x10) && !isSelf) {
					ContextMenu.addElement( DB.getMessage(509), function(){
						InputBox.append();
						InputBox.setType('text');
						InputBox.ui.find('.text').text(DB.getMessage(524));
						InputBox.onSubmitRequest = function(reason) {
							InputBox.remove();
							Guild.onRequestMemberExpel(member.AID, member.GID, reason);
						};
					}); 
				}
			});


		// Notice
		ui.find('.content.notice')
			.on('focus', 'textarea, input', function(){
				ui.find('.footer .btn_ok').show();
			});

		// Upload emblem
		ui.find('.content.info .emblem_edit input').change(function(){
			if (this.files.length && this.files[0].type === 'image/bmp') {
				var reader = new FileReader();
				reader.onload = function(e) {
					Guild.onSendEmblem(new Uint8Array(e.target.result));
				};
				reader.readAsArrayBuffer(this.files[0]);
			}
		});

		ui.find('.footer .btn_ok').click(onValidate);

		this.draggable(this.ui.find('.titlebar'));
		this.ui.hide();

		renderTendency(0, 0);
	};


	/**
	 * Removing guild, stop rendering
	 */
	Guild.onRemove = function onRemove()
	{
		Renderer.stop(renderMemberFaces);
	};


	/**
	 * Process shortcut
	 *
	 * @param {object} key
	 */
	Guild.onShortCut = function onShurtCut( key )
	{
		switch (key.cmd) {
			case 'TOGGLE':
				this.toggle();
				break;
		}
	};


	/**
	 * Toggle Guild UI
	 */
	Guild.toggle = function onToggle()
	{
		if (!Session.hasGuild) {
			return;
		}

		if (this.ui.is(':visible')) {
			this.hide();
		}
		else {
			this.show();
		}
	};


	/**
	 * Show guild element
	 */
	Guild.show = function show()
	{
		this.focus();

		if (this.ui.is(':visible')) {
			return;
		}

		this.ui.show();

		if (!this.ui.find('.tabs .active').length) {
			this.ui.find('.tabs .info').click();
			Guild.onRequestAccess();
		}

		if (this.ui.find('.content.members').is(':visible')) {
			Renderer.render(renderMemberFaces);
		}
	};


	/**
	 * Hide guild element
	 */
	Guild.hide = function hide()
	{
		this.ui.hide();
		Renderer.stop(renderMemberFaces);
	};


	/**
	 * Update General guild infos
	 *
	 * @param {object} data
	 */
	Guild.setGuildInformations = function setGuildInformations( info )
	{
		var general = this.ui.find('.content.info');

		general.find('.name .value').text(info.guildname);
		general.find('.level .value').text(info.level);
		general.find('.master .value').text(info.masterName);
		general.find('.members .numMember').text(info.userNum);
		general.find('.members .maxMember').text(info.maxUserNum);
		general.find('.avglevel .value').text(info.userAverageLevel);
		general.find('.territory .value').text(info.manageLand);
		general.find('.exp .value').text(info.exp);
		general.find('.tax .value').text(info.point);

		Guild.onRequestGuildEmblem(info.GDID, info.emblemVersion, Guild.setEmblem.bind(this));

		if (Session.isGuildMaster) {
			general.find('.emblem_edit').show();
		}
		else {
			general.find('.emblem_edit').hide();
		}

		renderTendency(info.honor, info.virtue);
	};


	/**
	 * Set guild emblem
	 *
	 * @param {Image}
	 */
	Guild.setEmblem = function setEmblem( image )
	{
		this.ui.find('.content.info').find('.emblem_container').css('backgroundImage', 'url('+ image.src +')');
	};


	/**
	 * Add guild relation (ally / enemy)
	 *
	 * @param {Array} guild list
	 */
	Guild.setRelations = function setRelations( guilds )
	{
		var i, count;

		this.ui.find('.ally_list, .hostile_list').empty();

		for (i = 0, count = guilds.length; i < count; ++i) {
			this.addRelation(guilds[i]);
		}
	};


	/**
	 * Add a relation
	 *
	 * @param {object} guild
	 */
	Guild.addRelation = function addRelation( guild )
	{
		var list = this.ui.find('.' + (guild.relation === 0 ? 'ally' : 'hostile') + '_list');
		var div  = document.createElement('div');

		div.setAttribute('data-guild-id', guild.GDID);
		div.textContent = guild.guildName;
		list.append(div);
	};


	/**
	 * Remove relation
	 *
	 * @param {number} guild id
	 * @param {number} relation
	 */
	Guild.removeRelation = function removeRelation( guild_id, relation)
	{
		var list = this.ui.find('.content.info .' + (relation === 0 ? 'ally' : 'hostile') + '_list');
		list.find('div[data-guild-id="'+ guild_id +'"]').remove();
	};


	/**
	 * Add guild members
	 *
	 * @param {Array} member list
	 */
	Guild.setMembers = function setMembers( members )
	{
		var i, count, online;

		count           = members.length;
		_members.length = 0;
		_totalExp       = 0;
		online          = 0;

		this.ui.find('.content.members tbody').empty();

		// Get total exp
		for (i = 0; i < count; ++i) {
			_totalExp += members[i].MemberExp;
			online    += members[i].CurrentState ? 1 : 0;
		}

		this.ui.find('.content.info .members .online').text(online);

		for (i = 0, count = members.length; i < count; ++i) {
			this.setMember(members[i]);
		}

		renderMemberFaces(Renderer.tick+1000);
	};


	/**
	 * Display member
	 *
	 * @param {object} member
	 */
	Guild.setMember = function setMember( member )
	{
		var i, count;
		var view;

		// Search for duplicate entry
		for (i = 0, count = _members.length; i < count; ++i) {
			if (_members[i].AID === member.AID && _members[i].GID === member.GID) {
				break;
			}
		}

		// Edit member
		if (i < count) {
			view = this.ui.find('.MemberView[data-index="'+ i +'"]');
		}

		// Create new entry
		else {
			view = MemberView.clone();
			this.ui.find('.content.members tbody').append(view);
			_members.push(member);
		}

		if (member.CurrentState) {
			view.addClass('online');
		}

		view.attr('data-index', i);
		view.find('.name .value').text(member.CharName);

		if (_positions[member.GPositionID]) {
			view.find('.position').text(_positions[member.GPositionID].posName);
		}

		view.find('.job').text(MonsterTable[member.Job]);
		view.find('.level').text(member.Level);
		view.find('.note').text(member.Memo);
		view.find('.devotion').text((member.MemberExp ? Math.round(_totalExp / member.MemberExp * 100) : 0) + ' %');
		view.find('.tax').text(member.MemberExp);

		if (!member.entity) {
			member.entity = new Entity();
			member.entity.direction = 4;
			member.entity.objecttype = Entity.TYPE_PC;
			member.entity.files.shadow.spr = null;
		}

		member.entity.sex         = member.Sex;
		member.entity.head        = member.HeadType;
		member.entity.headpalette = member.HeadPalette;
	};



	/**
	 * Display member
	 *
	 * @param {object} member
	 */
	Guild.updateMemberStatus = function updateMemberStatus( member )
	{
		var i, count;
		var view;

		// Search for duplicate entry
		for (i = 0, count = _members.length; i < count; ++i) {
			if (_members[i].AID === member.AID && _members[i].GID === member.GID) {
				break;
			}
		}

		// Not found
		if (i >= count) {
			return;
		}

		view = this.ui.find('.MemberView[data-index="'+ i +'"]');

		_members[i].CurrentState = member.status;
		view.toggleClass('online', _members[i].CurrentState);

		if ('sex' in member) {
			_members[i].entity.sex = member.sex;
		}

		if ('head' in member) {
			_members[i].entity.head = member.head;
		}

		if ('headPalette' in member) {
			_members[i].entity.headpalette = member.headPalette;
		}

		ChatBox.addText( DB.getMessage(485 + (member.status ? 0 : 1)).replace('%s', view.find('.name .value').text()), ChatBox.TYPE.BLUE);
	};


	/**
	 * Update member position
	 *
	 * @param {number} AID
	 * @param {number} GID
	 * @param {number} position id
	 */
	Guild.updateMemberPosition = function updateMemberPosition( AID, GID, positionID)
	{
		var i, count;

		// Search the member.
		for (i = 0, count = _members.length; i < count; ++i) {
			if (_members[i].AID === AID && _members[i].GID === GID) {
				_members[i].GPositionID = positionID;

				// Update it
				Guild.setMember(_members[i]);
				break;
			}
		}
	};


	/**
	 * Set guild positions
	 *
	 * @param {Array} position list
	 * @param {boolean} erase array ?
	 */
	Guild.setPositions = function setPositions( positions, erase )
	{
		var i, count;
		var rank;

		if (erase) {
			_positions.length = positions.length;
		}

		for (i = 0, count = positions.length; i < count; ++i) {
			rank = positions[i];

			if (!(rank.positionID in _positions)) {
				_positions[ rank.positionID ] = {};
			}

			_positions[ rank.positionID ].positionID = rank.positionID;
			_positions[ rank.positionID ].right      = rank.right;
			_positions[ rank.positionID ].ranking    = rank.ranking;
			_positions[ rank.positionID ].payRate    = rank.payRate;

			if (rank.posName) {
				_positions[ rank.positionID ].posName = rank.posName;
			}
		}

		Guild.updatePositionView();
	};


	/**
	 * Set guild positions name
	 *
	 * @param {Array} position list
	 */
	Guild.setPositionsName = function setPositionsName( positions )
	{
		var i, count;
		var rank;

		for (i = 0, count = positions.length; i < count; ++i) {
			rank = positions[i];

			if (!(rank.positionID in _positions)) {
				_positions[ rank.positionID ] = {};
			}

			_positions[ rank.positionID ].posName = rank.posName;
		}

		Guild.updatePositionView();
	};


	/**
	 * Update guild positions view
	 */
	Guild.updatePositionView = function updatePositionView()
	{
		var i, count;
		var view, rank, container;

		count     = _positions.length;
		container = this.ui.find('.content.positions tbody');
		container.empty();

		// Update UI
		for (i = 0; i < count; ++i) {
			view = PositionView.clone();
			rank = _positions[i];

			if (i === 0) {
				view.addClass('active');
			}

			view.find('.id').text(rank.positionID);
			view.find('.title input').val(rank.posName);
			view.find('.tax input').val(rank.payRate);

			view.find('.invite button')
				.css('backgroundImage', 'url(' + (rank.right & 0x01 ? _checkbox_on : _checkbox_off) + ')')
				.removeClass('on off')
				.addClass(rank.right & 0x01 ? 'on' : 'off');

			view.find('.punish button')
				.css('backgroundImage', 'url(' + (rank.right & 0x10 ? _checkbox_on : _checkbox_off) + ')')
				.removeClass('on off')
				.addClass(rank.right & 0x10 ? 'on' : 'off');

			container.append(view);
		}
	};


	/**
	 * Set guild notice
	 *
	 * @param {string} notice subject
	 * @param {string} notice content
	 */
	Guild.setNotice = function setNotice( subject, notice)
	{
		var element = this.ui.find('.content.notice');

		element.find('.subject').val(subject);
		element.find('.notice').val(notice);
	};


	/**
	 * Set expel list
	 *
	 * @param {Array} expel list
	 */
	Guild.setExpelList = function setExpelList( list )
	{
		var i, count;
		var container, element;

		container = this.ui.find('.content.history tbody');
		container.empty();

		for (i = 0, count = list.length; i < count; ++i) {
			element = ExpelView.clone();

			element.find('.name').text(list[i].charname);
			element.find('.reason').text(list[i].reason);

			container.append(element);
		}
	};


	/**
	 * Set access to tabs
	 *
	 * @param {number} access
	 */
	Guild.setAccess = function setAccess(access)
	{
		_guildAccess = access;
	};


	/**
	 * Stop propagation of events
	 */
	function stopPropagation(event)
	{
		event.stopImmediatePropagation();
		return false;
	}


	/**
	 * Change tab
	 */
	function onChangeTab( event )
	{
		var tab = parseInt(this.getAttribute('data-flag'), 10);

		if (!event.isTrigger) {
			// Can't open this tab
			if (this.classList.contains('active') || (tab && !(_guildAccess & AccessTypeBit[tab]))) {
				return false;
			}
		}

		Guild.onGuildInfoRequest(tab);

		Guild.ui.find('.tabs button').removeClass('active');
		Guild.ui.find('.content').hide();
		Guild.ui.find('.content.' + this.className).show();
		Guild.ui.find('.footer .btn_ok').hide();

		if (this.className === 'members') {
			Renderer.render(renderMemberFaces);
		}
		else {
			Renderer.stop(renderMemberFaces);
		}

		this.classList.add('active');

		return false;
	}


	/**
	 * Render tendency graphic
	 *
	 * @param {number} honor [-100, 100]
	 * @param {number} virtue [-100, 100]
	 */
	function renderTendency(honor,  virtue)
	{
		var canvas = Guild.ui.find('.content.info .tendency canvas').get(0);
		var ctx    = canvas.getContext('2d');

		// Border
		ctx.fillStyle = '#cecfce';
		ctx.fillRect( 0, 0, canvas.width, canvas.height);

		// Background
		ctx.fillStyle = '#739eef';
		ctx.fillRect(1, 1, canvas.width-2, canvas.height-2);

		// axis
		ctx.fillStyle = '#4261a5';
		ctx.fillRect( canvas.width / 2 - 1, 1, 2, canvas.height - 2); // Y
		ctx.fillRect( 1, canvas.height / 2 - 1, canvas.width - 2, 2); // X

		// TODO: render graphic (not sure if it's rectangle or triangle)
		// For now, it was never used so keep it as default
		// honor: (left) Vulgar [-100,100] Famed (right)
		// virtue: (down) Wicked [-100,100] Righteous (up)
		ctx.fillStyle = '#ffffff';
		ctx.fillRect( canvas.width / 2 - 1, canvas.height / 2 - 1, 2, 2);
	}


	/**
	 * Display member faces every seconds.
	 * There is no event to detect if a character finish loading.
	 * 
	 * @param {number} tick
	 */
	var renderMemberFaces = (function renderMemberFacesClosure()
	{
		var lastTick = 0;

		return function renderMemberFaces(tick)
		{
			if (tick < lastTick + 1000) {
				return;
			}

			var canvas, ctx;
			var i, count;

			lastTick = tick;
			canvas   = Guild.ui.find('.content.members canvas');
			Camera.direction = 4;

			for (i = 0, count = _members.length; i <  count; ++i) {
				ctx = canvas[i].getContext('2d');
				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

				// Offline character
				if (!_members[i].CurrentState) {
					continue;
				}

				SpriteRenderer.bind2DContext(ctx, 15, 45);
				_members[i].entity.renderEntity();
			}
		};
	})();


	/**
	 * Validate a change (notice, position, etc.)
	 */
	function onValidate()
	{
		var activeTab = Guild.ui.find('.content:visible').get(0).className;
		activeTab = activeTab.replace(/content/g, '').replace(/^\s+|\s+$/gm,'');

		switch (activeTab) {
			case 'members':
				break;

			case 'positions':
				var i, count;
				var position, positions;
				var right, posName, payRate;
				var list = [];

				positions = Guild.ui.find('.PositionView');

				for (i = 0, count = _positions.length; i < count; ++i) {
					position = positions.eq(i);

					posName = position.find('.title input').val();
					payRate = parseInt(position.find('.tax input').val(), 10);
					right   = 0;

					if (position.find('.invite button').hasClass('on')) {
						right |=  0x01;
					}

					if (position.find('.punish button').hasClass('on')) {
						right |=  0x10;
					}

					if (_positions[i].right   !== right ||
					    _positions[i].posName !== posName ||
					    _positions[i].payRate !== payRate) {

						list.push({
							positionID: _positions[i].positionID,
							ranking:    _positions[i].ranking,
							right:      right,
							posName:    posName,
							payRate:    payRate
						});
					}
				}

				Guild.onPositionUpdateRequest(list);
				break;

			case 'notice':
				var subject = Guild.ui.find('.content.notice input').val();
				var content = Guild.ui.find('.content.notice textarea').val();

				Guild.onNoticeUpdateRequest(subject, content);
				break;
		}

		Guild.ui.find('.footer .btn_ok').hide();
	}


	/**
	 * When Requesting Guild Information Screen.
	 * @param {number}	type
	 *  GENERAL:     0, //	Request packets ZC_GUILD_INFO2, MYGUILD_BASIC_INFO
	 *	MEMBERS:     1, //	Request packets ZC_MEMBERMGR_INFO, ZC_POSITION_ID_NAME_INFO
	 *	POSITION:    2, //	Request packets ZC_POSITION_ID_NAME_INFO, ZC_POSITION_INFO
	 *	SKILLS:      3, //	Request packets ZC_GUILD_SKILLINFO
	 *  EXPEL:       4, //
	 *  NOTICE:      7, //
	 */
	Guild.onGuildInfoRequest = function(){};


	/**
	 * Ask server to modify users positions
	 * @param {Array} positions
	 */
	Guild.onPositionUpdateRequest = function(){};


	/**
	 * Ask server to modify notice
	 * @param {string} notice subject
	 * @param {string} notice content
	 */
	Guild.onNoticeUpdateRequest = function(){};


	/**
	 * Ask server for member info
	 * @param {number} account id
	 */
	Guild.onRequestMemberInfo = function(){};


	/**
	 * Ask to leave a guild
	 * @param {number} account id
	 * @param {number} character id
	 * @param {string} reason
	 */
	Guild.onRequestLeave = function(){};


	/**
	 * Ask to expel a member from theguild
	 * @param {number} account id
	 * @param {number} character id
	 * @param {string} reason
	 */
	Guild.onRequestMemberExpel = function(){};


	/**
	 * Ask to remove a guild relation
	 * @param {number} guild_id
	 * @param {number} relation
	 */
	Guild.onRequestDeleteRelation = function(){}


	/**
	 * Request access to know what tab we can open
	 */
	Guild.onRequestAccess = function(){};


	/**
	 * Request guild emblem
	 * @param {number} guild id
	 * @param {number} emblem version
	 * @param {function} callback once loaded
	 */
	Guild.onRequestGuildEmblem = function(){};


	/**
	 * Send new guild emblem to the server
	 * @param {UInt8Array} emblem data
	 */
	Guild.onSendEmblem = function(){}


	/**
	 * Create componentand export it
	 */
	return UIManager.addComponent(Guild);

});