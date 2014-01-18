/**
 * Engine/MapEngine/ChatRoom.js
 *
 * Chat Room Handler
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(function( require )
{
	"use strict";


	/**
	 * Load dependencies
	 */
	var Network			= require('Network/NetworkManager');
	var PACKET			= require('Network/PacketStructure');
	var ChatRoomCreate	= require('UI/Components/ChatRoomCreate/ChatRoomCreate');
	var ChatRoom		= require('UI/Components/ChatRoom/ChatRoom');
	var Session         = require('Engine/SessionStorage');


	/**
	 * Request a chat room
	 * PACKET.CZ.CREATE_CHATROOM
	 */
	ChatRoomCreate.RequestRoom = function RequestRoom()
	{
		var pkt   = new PACKET.CZ.CREATE_CHATROOM();
		pkt.size = this.LIMIT;
		pkt.type = this.TYPE;
		pkt.passwd = this.SIGN;
		pkt.title = this.TITLE;
		Network.sendPacket( pkt );
	};


	/**
	 * Request a chat room
	 * PACKET.CZ.REQ_ENTER_ROOM
	 */
	ChatRoom.RequestEnterRoom = function RequestEnterRoom()
	{
		var pkt   = new PACKET.CZ.REQ_ENTER_ROOM();
		Network.sendPacket( pkt );
	};


	/**
	 * Request a change in the chat room
	 * PACKET.CZ.CHANGE_CHATROOM
	 */
	ChatRoom.ChangeChatRoom = function ChangeChatRoom()
	{
		var pkt   = new PACKET.CZ.CHANGE_CHATROOM();
		Network.sendPacket( pkt );
	};


	/**
	 * Request to change the role from a member in your chatroom
	 * PACKET.CZ.REQ_ROLE_CHANGE
	 */
	ChatRoom.RequestRoleChange = function RequestRoleChange()
	{
		var pkt   = new PACKET.CZ.REQ_ROLE_CHANGE();
		Network.sendPacket( pkt );
	};


	/**
	 * Request to expel a member from current chatroom
	 * PACKET.CZ.REQ_EXPEL_MEMBER
	 */
	ChatRoom.RequestExpelMember = function RequestExpelMember()
	{
		var pkt   = new PACKET.CZ.REQ_EXPEL_MEMBER();
		Network.sendPacket( pkt );
	};


	/**
	 * Request exit from current chatroom
	 * PACKET.CZ.EXIT_ROOM
	 */
	ChatRoom.ExitRoom = function ExitRoom()
	{
		var pkt   = new PACKET.CZ.EXIT_ROOM();
		Network.sendPacket( pkt );
	};
	
	
	/**
	 * Response from the server if the chat creating was succesful or not.
	 * 
	 * @param {object} pkt - PACKET.ZC.ACK_CREATE_CHATROOM
	 * @rcv object.result
	 *  -> 0 = Room has been successfully created (opens chat room)
	 *  -> 1 = Room limit exceeded
	 *  -> 2 = Same room already exists
	 */
	function CreateACK( pkt )
	{
		var chat = ChatRoomCreate;

		switch( pkt.result ) {
			case 0:
				ChatRoom.TITLE = chat.TITLE;
				ChatRoom.LIMIT = chat.LIMIT;
				ChatRoom.TYPE  = chat.TYPE;
				ChatRoom.COUNT = 1;
				ChatRoom.MEMBERS = [Session.Entity.display.name];
				ChatRoom.OWNER = Session.Entity.display.name;
				ChatRoom.append();
				break;
			/* !TODO! */
			case 1:
				break;
			case 2:
				break;
			/* <---- */
		}
	}
	
	
	/*
	 * Notify a entry of a new member
	 */
	function EnterMember( pkt )
	{
		ChatRoom.COUNT = pkt.curcount;
		ChatRoom.MEMBERS.push( pkt.name );
		ChatRoom.UpdateChat();
	}
	
	
	/*
	 * Change room owner
	 */
	function RoleChange( pkt )
	{
		if(pkt.role === 1) { //The server will send two of this packets! One to remove the ownership and one to add ownership, we dont need to first packet!
			ChatRoom.OWNER = pkt.name;
			ChatRoom.UpdateChat();
		}
	}
	
	
	/*
	 * Member exit
	 */
	function MemberExit( pkt )
	{
		ChatRoom.COUNT = pkt.curcount;
		ChatRoom.removeMember( pkt.name );
		ChatRoom.UpdateChat();
		
		if(pkt.type === 0) { //type = 0 = he left the room
			ChatRoom.message( pkt.name + ' left the room.');	
		}
		else { //type = 1 = he was kicked form the room
			ChatRoom.message( pkt.name + ' was kicked from the room.');
		}
	}
	
	
	/*
	 * Change chat room properties
	 */
	function Change( pkt )
	{
		console.log('aid', pkt.AID);
		console.log('room id', pkt.roomID)
		ChatRoom.LIMIT = pkt.maxcount;
		ChatRoom.COUNT = pkt.curcount;
		ChatRoom.TYPE  = pkt.type;
		ChatRoom.TITLE = pkt.title;
		ChatRoom.UpdateChat();
	}
	
	
	/**
	 * Enter a room
	 */
	function Enter( pkt )
	{
		for(var i in pkt.memberList) {
			if(pkt.memberList[i].role === 0) {
				ChatRoom.OWNER = pkt.memberList[i].name;
			}
			ChatRoom.MEMBERS.push( pkt.memberList[i].name );
		}
		//ChatRoom.TITLE = 'beta';
		//ChatRoom.LIMIT = 20;
		//ChatRoom.TYPE  = 1;
		//ChatRoom.COUNT++;
		ChatRoom.append();
	}
	
	
	
	/**
	 * Initialize
	 */
	return function MainEngine()
	{
		Network.hookPacket(PACKET.ZC.ACK_CREATE_CHATROOM,	CreateACK);
		//Network.hookPacket(PACKET.ZC.ROOM_NEWENTRY,			Display); //This is holded up at Entity.js
		Network.hookPacket(PACKET.ZC.CHANGE_CHATROOM,		Change);
		//Network.hookPacket(PACKET.ZC.DESTROY_ROOM,			Destroy); //This is holded up at Entity.js
		Network.hookPacket(PACKET.ZC.ENTER_ROOM,			Enter);
		Network.hookPacket(PACKET.ZC.MEMBER_NEWENTRY,		EnterMember);
		Network.hookPacket(PACKET.ZC.ROLE_CHANGE,			RoleChange);
		Network.hookPacket(PACKET.ZC.MEMBER_EXIT,			MemberExit);
	};
});