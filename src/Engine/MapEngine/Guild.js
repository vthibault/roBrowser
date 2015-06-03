/**
 * Engine/MapEngine/Group.js
 *
 * Manage group/party
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function( require )
{
	'use strict';


	/**
	 * Load dependencies
	 */
	var DB            = require('DB/DBManager');
	var Inflate       = require('Utils/Inflate');
	var Texture       = require('Utils/Texture');
	var BinaryWriter  = require('Utils/BinaryWriter');
	var Session       = require('Engine/SessionStorage');
	var Network       = require('Network/NetworkManager');
	var PACKET        = require('Network/PacketStructure');
	var EntityManager = require('Renderer/EntityManager');
	var ChatBox       = require('UI/Components/ChatBox/ChatBox');
	var MiniMap       = require('UI/Components/MiniMap/MiniMap');
	var Guild         = require('UI/Components/Guild/Guild');
	var UIManager     = require('UI/UIManager');


	/**
	 * Engine namespace
	 */
	var GuildEngine = {};


	/**
	 * @var {Object} emblem list
	 */
	var _emblems = {};


	/**
	 * Initialize engine
	 */
	GuildEngine.init = function init()
	{
		Network.hookPacket( PACKET.ZC.GUILD_CHAT,                    onMemberTalk );
		Network.hookPacket( PACKET.ZC.NOTIFY_POSITION_TO_GUILDM,     onMemberMove );
		Network.hookPacket( PACKET.ZC.GUILD_INFO,                    onGuildInfo );
		Network.hookPacket( PACKET.ZC.GUILD_INFO2,                   onGuildInfo );
		Network.hookPacket( PACKET.ZC.MYGUILD_BASIC_INFO,            onGuildRelation );
		Network.hookPacket( PACKET.ZC.GUILD_EMBLEM_IMG,              onGuildEmblem );
		Network.hookPacket( PACKET.ZC.MEMBERMGR_INFO,                onGuildMembers );
		Network.hookPacket( PACKET.ZC.ACK_GUILD_MEMBER_INFO,         onGuildMemberUpdate );
		Network.hookPacket( PACKET.ZC.POSITION_INFO,                 onGuildPositions );
		Network.hookPacket( PACKET.ZC.POSITION_ID_NAME_INFO,         onGuildPositionsName );
		Network.hookPacket( PACKET.ZC.ACK_CHANGE_GUILD_POSITIONINFO, onGuildPositions );
		Network.hookPacket( PACKET.ZC.GUILD_NOTICE,                  onGuildNotice );
		Network.hookPacket( PACKET.ZC.ACK_REQ_CHANGE_MEMBERS,        onGuildMemberPositionUpdate );
		Network.hookPacket( PACKET.ZC.ACK_GUILD_MENUINTERFACE,       onGuildAccess );
		Network.hookPacket( PACKET.ZC.RESULT_MAKE_GUILD,             onGuildCreationResult );
		Network.hookPacket( PACKET.ZC.UPDATE_GDID,                   onGuildOwnInfo );
		Network.hookPacket( PACKET.ZC.BAN_LIST,                      onGuildExpelList );
		Network.hookPacket( PACKET.ZC.ACK_DISORGANIZE_GUILD_RESULT,  onGuildDestroy );
		Network.hookPacket( PACKET.ZC.REQ_JOIN_GUILD,                onGuildInviteRequest );
		Network.hookPacket( PACKET.ZC.ACK_REQ_JOIN_GUILD,            onGuildInviteResult );
		Network.hookPacket( PACKET.ZC.UPDATE_CHARSTAT,               onGuildMemberStatus );
		Network.hookPacket( PACKET.ZC.UPDATE_CHARSTAT2,              onGuildMemberStatus );
		Network.hookPacket( PACKET.ZC.ACK_BAN_GUILD,                 onGuildMemberExpulsion );
		Network.hookPacket( PACKET.ZC.ACK_BAN_GUILD_SSO,             onGuildMemberExpulsion );
		Network.hookPacket( PACKET.ZC.ACK_LEAVE_GUILD,               onGuildMemberLeave );
		Network.hookPacket( PACKET.ZC.DELETE_RELATED_GUILD,          onGuildAllianceDeleteAck );
		Network.hookPacket( PACKET.ZC.ADD_RELATED_GUILD,             onGuildAllianceAdd );
		Network.hookPacket( PACKET.ZC.REQ_ALLY_GUILD,                onGuildAskForAlliance );
		Network.hookPacket( PACKET.ZC.ACK_REQ_ALLY_GUILD,            onGuildAllianceResult );
		Network.hookPacket( PACKET.ZC.ACK_REQ_HOSTILE_GUILD,         onGuildHostilityResult );

		// Hook UI
		Guild.onGuildInfoRequest      = GuildEngine.requestInfo;
		Guild.onPositionUpdateRequest = GuildEngine.requestPositionUpdate;
		Guild.onNoticeUpdateRequest   = GuildEngine.requestNoticeUpdate;
		Guild.onRequestLeave          = GuildEngine.requestLeave;
		Guild.onRequestMemberExpel    = GuildEngine.requestMemberExpel;
		Guild.onRequestMemberInfo     = GuildEngine.requestMemberInfo;
		Guild.onRequestDeleteRelation = GuildEngine.requestDeleteRelatedGuild;
		Guild.onRequestAccess         = GuildEngine.requestAccess;
		Guild.onRequestGuildEmblem    = GuildEngine.requestGuildEmblem;
		Guild.onSendEmblem            = GuildEngine.sendEmblem;
	};


	/**
	 * Ask server to get guild informations
	 *
	 * @param {number} type (page)
	 */
	GuildEngine.requestInfo = function requestInfo( type )
	{
		if (type > 4) {
			return;
		}

		var pkt = new PACKET.CZ.REQ_GUILD_MENU();
		pkt.Type = type;
		Network.sendPacket(pkt);
	};


	/**
	 * Ask to get an emblem
	 *
	 * @param {number} guild id
	 * @param {number} version
	 * @param {function} callback
	 */
	GuildEngine.requestGuildEmblem = function requestGuildEmblem(guild_id, version, callback)
	{
		var emblem;

		// Guild does not exist
		if (!_emblems[guild_id]) {
			_emblems[guild_id] = {
				version:  -1,
				image:    new Image(),
				callback: []
			};
		}

		emblem = _emblems[guild_id];

		// Lower version, update it to the current
		if (version <= emblem.version) {
			callback(emblem.image);
			return;
		}

		// Ask for new version
		var pkt  = new PACKET.CZ.REQ_GUILD_EMBLEM_IMG();
		pkt.GDID = guild_id;
		Network.sendPacket(pkt);

		emblem.callback.push(callback);
	};


	/**
	 * Need to know the access we have to the guild UI
	 */
	GuildEngine.requestAccess = function requestAccess()
	{
		Network.sendPacket(
			new PACKET.CZ.REQ_GUILD_MENUINTERFACE()
		);
	};


	/**
	 * Ask the server to create a guild
	 *
	 * @param {string} guild name
	 */
	GuildEngine.createGuild = function createGuild( name )
	{
		var pkt   = new PACKET.CZ.REQ_MAKE_GUILD();
		pkt.GID   = Session.GID;
		pkt.GName = name;

		Network.sendPacket(pkt);
	};


	/**
	 * Ask the server to delete the guild
	 *
	 * @param {string} guild name
	 */
	GuildEngine.breakGuild = function createGuild( name )
	{
		var pkt   = new PACKET.CZ.REQ_DISORGANIZE_GUILD();
		pkt.key   = name;

		Network.sendPacket(pkt);
	};


	/**
	 * Send new positions list to server
	 *
	 * @param {Array} positions
	 */
	GuildEngine.requestPositionUpdate = function requestPositionUpdate( positions )
	{
		var pkt = new PACKET.CZ.REG_CHANGE_GUILD_POSITIONINFO();
		pkt.memberList = positions;

		Network.sendPacket(pkt);
	};


	/**
	 * Send new notice to server
	 *
	 * @param {string} subject
	 * @param {string} content
	 */
	GuildEngine.requestNoticeUpdate = function requestNoticeUpdate(subject, content)
	{
		var pkt  = new PACKET.CZ.GUILD_NOTICE();
		pkt.GDID = GuildEngine.guild_id;
		pkt.subject = subject;
		pkt.notice  = content;

		Network.sendPacket(pkt);
	};


	/**
	 * Send an invitation to the player
	 *
	 * @param {number} target account id
	 */
	GuildEngine.requestPlayerInvitation = function requestPlayerInvitation( AID )
	{
		var pkt   = new PACKET.CZ.REQ_JOIN_GUILD();
		pkt.AID   = AID;
		pkt.MyAID = Session.AID;
		pkt.MyGID = Session.GID;

		Network.sendPacket(pkt);
	};


	/**
	 * Send a guild alliance to a target player
	 *
	 * @param {number} target account id
	 */
	GuildEngine.requestAlliance = function requestAlliance( AID )
	{
		var pkt   = new PACKET.CZ.REQ_ALLY_GUILD();
		pkt.AID   = AID;
		pkt.MyAID = Session.AID;
		pkt.MyGID = Session.GID;

		Network.sendPacket(pkt);
	};


	/**
	 * Set a guild as hostile
	 *
	 * @param {number} target account id
	 */
	GuildEngine.requestHostility = function requestHostility( AID )
	{
		var pkt   = new PACKET.CZ.REQ_HOSTILE_GUILD();
		pkt.AID   = AID;

		Network.sendPacket(pkt);
	};


	/**
	 * Request to leave the guild
	 *
	 * @param {number} account id
	 * @param {number} character id
	 * @param {string} reason for the leave
	 */
	GuildEngine.requestLeave = function requestLeave( AID, GID, reason)
	{
		var pkt = new PACKET.CZ.REQ_LEAVE_GUILD();
		pkt.GDID = GuildEngine.guild_id;
		pkt.AID = AID;
		pkt.GID = GID;
		pkt.reasonDesc = reason;

		Network.sendPacket(pkt);
	};


	/**
	 * Request to expel a member from the guild
	 *
	 * @param {number} account id
	 * @param {number} character id
	 * @param {string} reason to expel
	 */
	GuildEngine.requestMemberExpel = function requestMemberExpel( AID, GID, reason)
	{
		var pkt = new PACKET.CZ.REQ_BAN_GUILD();
		pkt.GDID = GuildEngine.guild_id;
		pkt.AID = AID;
		pkt.GID = GID;
		pkt.reasonDesc = reason;

		Network.sendPacket(pkt);
	};


	/**
	 * Request to get member information
	 *
	 * @param {number} account id
	 */
	GuildEngine.requestMemberInfo = function requestMemberInfo( AID )
	{
		var pkt = new PACKET.CZ.REQ_OPEN_MEMBER_INFO();
		pkt.AID = AID;

		Network.sendPacket(pkt);
	};


	/**
	 * Request to delete an ally or antagonist
	 *
	 * @param {number} guild_id
	 * @param {number} relation (0 = Ally, 1 = Enemy)
	 */
	GuildEngine.requestDeleteRelatedGuild = function requestDeleteRelatedGuild( guild_id, relation)
	{
		var pkt = new PACKET.CZ.REQ_DELETE_RELATED_GUILD();

		pkt.OpponentGDID = guild_id;
		pkt.Relation = relation;
		Network.sendPacket(pkt);
	};


	/**
	 * Send Emblem to server.
	 * Note: it's a hacky way that do not compress the emblem.
	 *
	 * @param {Uint8Array} file
	 */
	GuildEngine.sendEmblem = (function sendEmblemClosure()
	{
		function adler32(data) {
			for (var i = 0, len = data.length, s1 = 1, s2 = 0; i < len; i++) {
				s1 = (s1 + data[i]) % 65521;
				s2 = (s2 + s1) % 65521;
			}
			return (s2 << 16) + s1;
		}
		return function sendEmblem(data) {
			var len = data.length;
			var out = new BinaryWriter(2 + 1 + 2 + 2 + len + 4);

			// zlib compression
			out.writeUChar(0x78);
			out.writeUChar(0x1);
			out.writeUChar(0x1);
			out.writeUShort(len);
			out.writeUShort(~len & 0xffff);
			out.writeBuffer(data.buffer);
			out.view.setInt32( out.offset, adler32(data), false); // big endian


			// send packet
			var pkt = new PACKET.CZ.REGISTER_GUILD_EMBLEM_IMG();
			pkt.img = out.buffer;
			Network.sendPacket(pkt);
		};
	})();


	/**
	 * @var {number} our guild id
	 */
	GuildEngine.guild_id = -1;


	/**
	 * Display entity life
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_HP_TO_GROUPM
	 */
	function onMemberTalk( pkt )
	{
		ChatBox.addText( pkt.msg, ChatBox.TYPE.GUILD );
	}


	/**
	 * Display guild member position
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_POSITION_TO_GUILDM
	 */
	function onMemberMove( pkt )
	{
		// Server remove mark with "-1" as position
		if (pkt.xPos < 0 || pkt.yPos < 0) {
			MiniMap.removeGuildMemberMark( pkt.AID );
		}
		else {
			MiniMap.addGuildMemberMark( pkt.AID, pkt.xPos, pkt.yPos );
		}
	}


	/**
	 * Get guild informations
	 *
	 * @param {object} pkt - PACKET.ZC.GUILD_INFO
	 */
	function onGuildInfo( pkt )
	{
		Guild.setGuildInformations( pkt );
	}


	/**
	 * Get guild access to tab
	 *
	 * @param {object} pkt - PACKET.ZC.ACK_GUILD_MENUINTERFACE
	 */
	function onGuildAccess( pkt )
	{
		Guild.setAccess(pkt.guildMemuFlag);
	}


	/**
	 * Get informations about our user in the guild
	 *
	 * @param {object} pkt - PACKET.ZC.UPDATE_GDID
	 */
	function onGuildOwnInfo( pkt )
	{
		GuildEngine.guild_id  = pkt.GDID;

		Session.hasGuild      = true;
		Session.guildRight    = pkt.right;
		Session.isGuildMaster = !!pkt.isMaster;

		Session.Entity.GUID       = pkt.GDID;
		Session.Entity.GEmblemVer = pkt.emblemVersion;
	}


	/**
	 * Get guild relations (allies / enemies)
	 *
	 * @param {objec} pkt - PACKET.ZC.MYGUILD_BASIC_INFO
	 */
	function onGuildRelation( pkt )
	{
		Guild.setRelations( pkt.relatedGuildList );
	}


	/**
	 * Receving emblem data from a guild
	 *
	 * @param {object} pkt - PACKET.ZC.GUILD_EMBLEM_IMG
	 */
	var onGuildEmblem = (function onGuildEmblemClosure()
	{
		var data = new Uint8Array(2*1024);

		return function onGuildEmblem( pkt )
		{
			var emblem, inflate, len, src, img;

			// Create guild namespace if does not exist
			if (!_emblems[pkt.GDID]) {
				_emblems[pkt.GDID] = {
					version:  -1,
					image:    new Image(),
					callback: []
				};
			}

			// Uncompress emblem
			inflate = new Inflate(pkt.img);
			len     = inflate.getBytes(data);
			src     = URL.createObjectURL(new Blob([data.subarray(0, len).buffer], { type: 'image/bmp' }));
			emblem  = _emblems[pkt.GDID];

			// Prepare our emblem image
			img            = new Image();
			img.onload     = renderEmblem;
			emblem.version = pkt.emblemVersion;

			// Load the emblem, remove magenta, free blob from memory
			Texture.load(src, function(){
				img.src = this.toDataURL();
			});

			// Start displaying the emblem
			function renderEmblem() {
				emblem.image = this;

				// Update our guild emblem
				if (pkt.GDID === GuildEngine.guild_id) {
					Guild.setEmblem(this);
				}

				// Execute callbacks
				while (emblem.callback.length) {
					emblem.callback.shift().call(null, this);
				}

				// Update display name of entities
				EntityManager.forEach(function(entity){
					if (entity.GUID === pkt.GDID) {
						entity.display.emblem = img;
						entity.display.update(
							entity.objecttype === entity.constructor.TYPE_MOB ? '#ffc6c6' :
							entity.objecttype === entity.constructor.TYPE_NPC ? '#94bdf7' :
							'white'
						);
					}
				});
			}
		};
	})();


	/**
	 * Get guild members informations
	 *
	 * @param {object} pkt - PACKET.ZC.MEMBERMGR_INFO
	 */
	function onGuildMembers( pkt )
	{
		Guild.setMembers( pkt.memberInfo );
	}


	/**
	 * Update guild positions
	 *
	 * @param {object} pkt - PACKET.ZC.POSITION_INFO | PACKET.ZC.ACK_CHANGE_GUILD_POSITIONINFO
	 */
	function onGuildPositions( pkt )
	{
		var erase = false;
		var list;

		if (pkt instanceof PACKET.ZC.POSITION_INFO) {
			list = pkt.memberInfo;
			erase = true;
		}
		else {
			list = pkt.memberList;
		}

		Guild.setPositions( list, erase);
	}


	/**
	 * Update guild position names
	 *
	 * @param {object} pkt - PACKET.ZC.POSITION_ID_NAME_INFO
	 */
	function onGuildPositionsName( pkt )
	{
		Guild.setPositionsName( pkt.memberList );
	}


	/**
	 * Update a guild member
	 *
	 * @param {object} pkt - PACKET.ZC.ACK_GUILD_MEMBER_INFO
	 */
	function onGuildMemberUpdate( pkt )
	{
		Guild.setMember( pkt.Info );
	}


	/**
	 * Update member rank
	 *
	 * @param {object} pkt - PACKET.ZC.ACK_REQ_CHANGE_MEMBERS
	 */
	function onGuildMemberPositionUpdate( pkt )
	{
		Guild.updateMemberPosition(pkt.AID, pkt.GID, pkt.positionID);
	}


	/**
	 * Display guild notice
	 *
	 * @param {object} pkt - PACKET.ZC.GUILD_NOTICE
	 */
	function onGuildNotice( pkt )
	{
		ChatBox.addText('[ '+ pkt.subject +' ]', ChatBox.TYPE.GUILD, '#FFFF63');
		ChatBox.addText('[ '+ pkt.notice +' ]', ChatBox.TYPE.GUILD, '#FFFF63');

		Guild.setNotice( pkt.subject, pkt.notice );
	}


	/**
	 * Get the ban list from server
	 *
	 * @param {object} pkt - PACKET.ZC.BAN_LIST
	 */
	function onGuildExpelList( pkt )
	{
		Guild.setExpelList( pkt.banList );
	}


	/**
	 * Creation response from server
	 *
	 * @param {object} pkt - PACKET.ZC.RESULT_MAKE_GUILD
	 */
	function onGuildCreationResult( pkt )
	{
		switch (pkt.result) {
			case 0: // Success
				Session.hasGuild = true;
				ChatBox.addText( DB.getMessage(374), ChatBox.TYPE.BLUE);
				Guild.show();
				break;

			case 1: // You are already in a Guild.#
				ChatBox.addText( DB.getMessage(375), ChatBox.TYPE.ERROR);
				break;

			case 2: // That Guild Name already exists.
				ChatBox.addText( DB.getMessage(376), ChatBox.TYPE.ERROR);
				break;

			case 3: // You need the neccessary item to create a Guild.
				ChatBox.addText( DB.getMessage(405), ChatBox.TYPE.ERROR);
				break;
		}
	}


	/**
	 * Notify of the result of breaking a guild
	 *
	 * @param {object} pkt - PACKET.ZC.ACK_DISORGANIZE_GUILD_RESULT
	 */
	function onGuildDestroy( pkt )
	{
		switch (pkt.reason) {
			case 0: // success
				Guild.hide();
				Session.hasGuild = false;
				ChatBox.addText( DB.getMessage(400), ChatBox.TYPE.BLUE);
				break;

			case 1: // invalid guild name
				ChatBox.addText( DB.getMessage(401), ChatBox.TYPE.ERROR);
				break;

			case 2: // still members on the guild
				ChatBox.addText( DB.getMessage(402), ChatBox.TYPE.ERROR);
				break;
		}
	}


	/**
	 * A player want us to join a guild
	 *
	 * @param {object} PACKET.ZC.REQ_JOIN_GUILD
	 */
	function onGuildInviteRequest( pkt )
	{
		var guild_id = pkt.GDID;

		function answer(result) {
			return function() {
				var pkt    = new PACKET.CZ.JOIN_GUILD();
				pkt.GDID   = guild_id;
				pkt.answer = result;

				Network.sendPacket(pkt);
			};
		}

		UIManager.showPromptBox( '(' + pkt.guildName + ') ' + DB.getMessage(377), 'ok', 'cancel', answer(1), answer(0));
	}


	/**
	 * Result from a guild invitation
	 *
	 * @param {object} pkt - PACKET.ZC.ACK_REQ_JOIN_GUILD
	 */
	function onGuildInviteResult( pkt )
	{
		switch (pkt.answer) {
			case 0: // Already in guild.
				ChatBox.addText( DB.getMessage(378), ChatBox.TYPE.ERROR);
				break;

			case 1: // Offer rejected.
				ChatBox.addText( DB.getMessage(379), ChatBox.TYPE.ERROR);
				break;

			case 2: // Offer accepted.
				ChatBox.addText( DB.getMessage(380), ChatBox.TYPE.BLUE);
				break;

			case 3: // Guild full.
				ChatBox.addText( DB.getMessage(381), ChatBox.TYPE.ERROR);
				break;
		}
	}


	/**
	 * Get member status (online/offline)
	 *
	 * @param {object} pkt - PACKET.ZC.UPDATE_CHARSTAT
	 */
	function onGuildMemberStatus( pkt )
	{
		Guild.updateMemberStatus(pkt);
	}        


	/**
	 * Event occured when a player got expel from the guild
	 *
	 * @param {object} pkt - PACKET.ZC.ACK_BAN_GUILD_SSO
	 */
	function onGuildMemberExpulsion( pkt )
	{
		// %s has been expelled from our guild.
		// Expulsion Reason: %s
		ChatBox.addText(DB.getMessage(370).replace('%s', pkt.charName), ChatBox.TYPE.GUILD, '#FFFF00');
		ChatBox.addText(DB.getMessage(371).replace('%s', pkt.reasonDesc), ChatBox.TYPE.GUILD, '#FFFF00');

		// Seems like the server doesn't send other informations
		// to remove the UI
		if (pkt.charName === Session.Entity.display.name) {
			Guild.hide();
			Session.hasGuild = false;
			Session.isGuildMaster = false;
			Session.guildRight    = 0;
			Session.Entity.GUID   = 0;
		}
	}


	/**
	 * Event occured when a player got expel from the guild
	 *
	 * @param {object} pkt - PACKET.ZC.ACK_LEAVE_GUILD
	 */
	function onGuildMemberLeave( pkt )
	{
		// %s has withdrawn from the guild
		// Secession Reason: %s
		ChatBox.addText(DB.getMessage(364).replace('%s', pkt.charName), ChatBox.TYPE.GUILD, '#FFFF00');
		ChatBox.addText(DB.getMessage(365).replace('%s', pkt.reasonDesc), ChatBox.TYPE.GUILD, '#FFFF00');

		// Seems like the server doesn't send other informations
		// to remove the UI
		if (pkt.charName === Session.Entity.display.name) {
			Guild.hide();
			Session.hasGuild = false;
			Session.isGuildMaster = false;
			Session.guildRight    = 0;
			Session.Entity.GUID   = 0;
		}
	}


	/**
	 * Remove guild relation
	 *
	 * @param {object} pkt - PACKET.ZC.DELETE_RELATED_GUILD
	 */
	function onGuildAllianceDeleteAck( pkt )
	{
		Guild.removeRelation(pkt.OpponentGDID, pkt.Relation);
	}


	/**
	 * Add an ally/antagonist guild to the list
	 *
	 * @param {object} pkt - PACKET.ZC.ADD_RELATED_GUILD
	 */
	function onGuildAllianceAdd( pkt )
	{
		Guild.addRelation(pkt.Info);
	}


	/**
	 * A guild ask for an alliance
	 *
	 * @param {object} pkt - PACKET.ZC.REQ_ALLY_GUILD
	 */
	function onGuildAskForAlliance( pkt )
	{
		var AID = pkt.otherAID;

		function answer(result) {
			return function() {
				var pkt = new PACKET.CZ.ALLY_GUILD();
				pkt.otherAID = AID;
				pkt.answer   = result;

				Network.sendPacket(pkt);
			};
		}

		// Guild is asking you to agree to an Alliance with them. Do you accept?#
		UIManager.showPromptBox( '(' + pkt.guildName + ') ' + DB.getMessage(393), 'ok', 'cancel', answer(1), answer(0));
	}


	/**
	 * Answer from player about guild alliance
	 *
	 * @param {object} pkt - PACKET.ZC.ACK_REQ_ALLY_GUILD
	 */
	function onGuildAllianceResult( pkt )
	{
		switch (pkt.answer) {
			case 0: // Already allied.
				ChatBox.addText(DB.getMessage(394), ChatBox.TYPE.ERROR);
				break;

			case 1: // You rejected the offer.
				ChatBox.addText(DB.getMessage(395), ChatBox.TYPE.ERROR);
				break;

			case 2: // You accepted the offer.
				ChatBox.addText(DB.getMessage(396), ChatBox.TYPE.BLUE);
				break;

			case 3: // They have too any alliances.
				ChatBox.addText(DB.getMessage(397), ChatBox.TYPE.ERROR);
				break;

			case 4: // You have too many alliances.
				ChatBox.addText(DB.getMessage(398), ChatBox.TYPE.ERROR);
				break;

			case 5: // Alliances are disabled.
				ChatBox.addText(DB.getMessage(1717), ChatBox.TYPE.ERROR);
				break;
		}
	}


	/**
	 * Result of hostility
	 *
	 * @param {object} pkt - PACKET.ZC.ACK_REQ_HOSTILE_GUILD
	 */
	function onGuildHostilityResult( pkt )
	{
		switch (pkt.result) {
			case 0: // Antagonist has been set.
				ChatBox.addText(DB.getMessage(495), ChatBox.TYPE.BLUE);
				break;

			case 1: // Guild has too many Antagonists.
				ChatBox.addText(DB.getMessage(496), ChatBox.TYPE.ERROR);
				break;

			case 2: // Already set as an Antagonist.
				ChatBox.addText(DB.getMessage(497), ChatBox.TYPE.ERROR);
				break;

			case 3: // Antagonists are disabled.
				ChatBox.addText(DB.getMessage(1718), ChatBox.TYPE.ERROR);
				break;
		}
	}


	/**
	 * Initialize
	 */
	return GuildEngine;
});