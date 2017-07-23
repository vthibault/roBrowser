/**
 * Network/PacketStructures.js
 *
 * List of the structure of all known packets.
 * Based on : http://rathena.org/wiki/index.php?title=Packets&action=edit
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(['Utils/BinaryWriter', './PacketVerManager'], function(BinaryWriter, PACKETVER) {
	'use strict';


	var UNUSED_PACKET;
	var PACKET = {};
	UNUSED_PACKET = PACKET;


	PACKET.CA  = {};  PACKET.AC = {}; // Login
	PACKET.CH  = {};  PACKET.HC = {}; // Char
	PACKET.CZ  = {};  PACKET.ZC = {}; // Map
	PACKET.CS  = {};  PACKET.SC = {}; // All servers
	PACKET.ZH  = {};                  // ??? typo error ?
	PACKET.AHC = {}; PACKET.CAH = {}; // Security

	// 0x186 PACKET_COLLECTORDEAD ??

	// * auto-generated *


	// 0x64
	PACKET.CA.LOGIN = function PACKET_CA_LOGIN() {
		this.Version = 0;
		this.ID = '';
		this.Passwd = '';
		this.clienttype = 0;
	};
	PACKET.CA.LOGIN.prototype.build = function() {
		var pkt_len = 2 + 4 + 24 + 24 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x64);
		pkt_buf.writeULong(this.Version);
		pkt_buf.writeString(this.ID, 24);
		pkt_buf.writeString(this.Passwd, 24);
		pkt_buf.writeUChar(this.clienttype);
		return pkt_buf;
	};


	// 0x65
	PACKET.CH.ENTER = function PACKET_CH_ENTER() {
		this.AID = 0;
		this.AuthCode = 0;
		this.userLevel = 0;
		this.clientType = 0;
		this.Sex = 0;
	};
	PACKET.CH.ENTER.prototype.build = function() {
		var pkt_len = 2 + 4 + 4 + 4 + 2 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x65);
		pkt_buf.writeULong(this.AID);
		pkt_buf.writeULong(this.AuthCode);
		pkt_buf.writeULong(this.userLevel);
		pkt_buf.writeUShort(this.clientType);
		pkt_buf.writeUChar(this.Sex);
		return pkt_buf;
	};


	// 0x66
	PACKET.CH.SELECT_CHAR = function PACKET_CH_SELECT_CHAR() {
		this.CharNum = 0;
	};
	PACKET.CH.SELECT_CHAR.prototype.build = function() {
		var pkt_len = 2 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x66);
		pkt_buf.writeUChar(this.CharNum);
		return pkt_buf;
	};



	// 0x67
	PACKET.CH.MAKE_CHAR = function PACKET_CH_MAKE_CHAR() {
		this.name = '';
		this.Str = 0;
		this.Agi = 0;
		this.Vit = 0;
		this.Int = 0;
		this.Dex = 0;
		this.Luk = 0;
		this.CharNum = 0;
		this.headPal = 0;
		this.head = 0;
	};
	PACKET.CH.MAKE_CHAR.prototype.build = function() {
		var pkt_len = 2 + 24 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x67);
		pkt_buf.writeString(this.name, 24);
		pkt_buf.writeUChar(this.Str);
		pkt_buf.writeUChar(this.Agi);
		pkt_buf.writeUChar(this.Vit);
		pkt_buf.writeUChar(this.Int);
		pkt_buf.writeUChar(this.Dex);
		pkt_buf.writeUChar(this.Luk);
		pkt_buf.writeUChar(this.CharNum);
		pkt_buf.writeShort(this.headPal);
		pkt_buf.writeShort(this.head);
		return pkt_buf;
	};


	// 0x68
	PACKET.CH.DELETE_CHAR = function PACKET_CH_DELETE_CHAR() {
		this.GID = 0;
		this.key = '';
	};
	PACKET.CH.DELETE_CHAR.prototype.build = function() {
		var pkt_len = 2 + 4 + 40;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x68);
		pkt_buf.writeULong(this.GID);
		pkt_buf.writeString(this.key, 40);
		return pkt_buf;
	};


	// 0x72
	PACKET.CZ.ENTER = function PACKET_CZ_ENTER() {
		this.AID = 0;
		this.GID = 0;
		this.AuthCode = 0;
		this.clientTime = 0;
		this.Sex = 0;
	};
	PACKET.CZ.ENTER.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setUint32(ver[3], this.AID, true);
		pkt.view.setUint32(ver[4], this.GID, true);
		pkt.view.setUint32(ver[5], this.AuthCode, true);
		pkt.view.setUint32(ver[6], this.ClientTime, true);
		pkt.view.setUint8(ver[7], this.Sex, true);

		return pkt;
	};


	// 0x7d
	PACKET.CZ.NOTIFY_ACTORINIT = function PACKET_CZ_NOTIFY_ACTORINIT() {};
	PACKET.CZ.NOTIFY_ACTORINIT.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x7d);
		return pkt_buf;
	};



	// 0x7e
	PACKET.CZ.REQUEST_TIME = function PACKET_CZ_REQUEST_TIME() {
		this.clientTime = 0;
	};
	PACKET.CZ.REQUEST_TIME.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setUint32(ver[3], this.clientTime, true);
		return pkt;
	};



	// 0x82
	PACKET.CZ.REQUEST_QUIT = function PACKET_CZ_REQUEST_QUIT() {};
	PACKET.CZ.REQUEST_QUIT.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x82);
		return pkt_buf;
	};



	// 0x85
	PACKET.CZ.REQUEST_MOVE = function PACKET_CZ_REQUEST_MOVE() {
		this.dest = [0, 0];
	};
	PACKET.CZ.REQUEST_MOVE.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setPos(ver[3], this.dest, true);
		return pkt;
	};


	// 0x89
	PACKET.CZ.REQUEST_ACT = function PACKET_CZ_REQUEST_ACT() {
		this.targetGID = 0;
		this.action = 0;
	};
	PACKET.CZ.REQUEST_ACT.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setUint32(ver[3], this.targetGID, true);
		pkt.view.setUint8(ver[4], this.action, true);
		return pkt;
	};


	// 0x8c
	PACKET.CZ.REQUEST_CHAT = function PACKET_CZ_REQUEST_CHAT() {
		this.msg = '';
	};
	PACKET.CZ.REQUEST_CHAT.prototype.build = function() {
		var version = this.getPacketVersion();
		var pkt_len = 2 + 2 + this.msg.length + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(version[1]);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeString(this.msg);

		return pkt_buf;
	};


	// 0x90
	PACKET.CZ.CONTACTNPC = function PACKET_CZ_CONTACTNPC() {
		this.NAID = 0;
		this.type = 0;
	};
	PACKET.CZ.CONTACTNPC.prototype.build = function() {
		var pkt_len = 2 + 4 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x90);
		pkt_buf.writeULong(this.NAID);
		pkt_buf.writeUChar(this.type);
		return pkt_buf;
	};


	// 0x94
	PACKET.CZ.REQNAME = function PACKET_CZ_REQNAME() {
		this.AID = 0;
	};
	PACKET.CZ.REQNAME.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setUint32(ver[3], this.AID, true);
		return pkt;
	};


	// 0x96
	PACKET.CZ.WHISPER = function PACKET_CZ_WHISPER() {
		this.receiver = '';
		this.msg = '';
	};
	PACKET.CZ.WHISPER.prototype.build = function() {
		var pkt_len = 2 + 2 + 24 + this.msg.length + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x96);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeString(this.receiver, 24);
		pkt_buf.writeString(this.msg);
		return pkt_buf;
	};


	// 0x99
	PACKET.CZ.BROADCAST = function PACKET_CZ_BROADCAST() {
		this.msg = '';
	};
	PACKET.CZ.BROADCAST.prototype.build = function() {
		var pkt_len = 2 + 2 + this.msg.length + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x99);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeString(this.msg);
		return pkt_buf;
	};


	// 0x9b
	PACKET.CZ.CHANGE_DIRECTION = function PACKET_CZ_CHANGE_DIRECTION() {
		this.headDir = 0;
		this.dir = 0;
	};
	PACKET.CZ.CHANGE_DIRECTION.prototype.build = function() {
		var servDirection = [4, 3, 2, 1, 0, 7, 6, 5];

		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setInt16(ver[3], this.headDir, true);
		pkt.view.setUint8(ver[4], servDirection[(this.dir + 8) % 8], true);
		return pkt;
	};


	// 0x9f
	PACKET.CZ.ITEM_PICKUP = function PACKET_CZ_ITEM_PICKUP() {
		this.ITAID = 0;
	};
	PACKET.CZ.ITEM_PICKUP.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setUint32(ver[3], this.ITAID, true);
		return pkt;
	};


	// 0xa2
	PACKET.CZ.ITEM_THROW = function PACKET_CZ_ITEM_THROW() {
		this.Index = 0;
		this.count = 0;
	};
	PACKET.CZ.ITEM_THROW.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setUint16(ver[3], this.Index, true);
		pkt.view.setInt16(ver[4], this.count, true);
		return pkt;
	};


	// 0xa7
	PACKET.CZ.USE_ITEM = function PACKET_CZ_USE_ITEM() {
		this.index = 0;
		this.AID = 0;
	};
	PACKET.CZ.USE_ITEM.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setUint16(ver[3], this.index, true);
		pkt.view.setUint32(ver[4], this.AID, true);
		return pkt;
	};


	// 0xa9
	PACKET.CZ.REQ_WEAR_EQUIP = function PACKET_CZ_REQ_WEAR_EQUIP() {
		this.index = 0;
		this.wearLocation = 0;
	};
	PACKET.CZ.REQ_WEAR_EQUIP.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setUint16(ver[3], this.index, true);
		pkt.view.setUint16(ver[4], this.wearLocation, true);
		return pkt;
	};


	// 0xab
	PACKET.CZ.REQ_TAKEOFF_EQUIP = function PACKET_CZ_REQ_TAKEOFF_EQUIP() {
		this.index = 0;
	};
	PACKET.CZ.REQ_TAKEOFF_EQUIP.prototype.build = function() {
		var pkt_len = 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xab);
		pkt_buf.writeUShort(this.index);
		return pkt_buf;
	};


	// 0xb2
	PACKET.CZ.RESTART = function PACKET_CZ_RESTART() {
		this.type = 0;
	};
	PACKET.CZ.RESTART.prototype.build = function() {
		var pkt_len = 2 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xb2);
		pkt_buf.writeUChar(this.type);
		return pkt_buf;
	};


	// 0xb8
	PACKET.CZ.CHOOSE_MENU = function PACKET_CZ_CHOOSE_MENU() {
		this.NAID = 0;
		this.num = 0;
	};
	PACKET.CZ.CHOOSE_MENU.prototype.build = function() {
		var pkt_len = 2 + 4 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xb8);
		pkt_buf.writeULong(this.NAID);
		pkt_buf.writeUChar(this.num);
		return pkt_buf;
	};


	// 0xb9
	PACKET.CZ.REQ_NEXT_SCRIPT = function PACKET_CZ_REQ_NEXT_SCRIPT() {
		this.NAID = 0;
	};
	PACKET.CZ.REQ_NEXT_SCRIPT.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xb9);
		pkt_buf.writeULong(this.NAID);
		return pkt_buf;
	};


	// 0xba
	PACKET.CZ.REQ_STATUS = function PACKET_CZ_REQ_STATUS() {};
	PACKET.CZ.REQ_STATUS.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xba);
		return pkt_buf;
	};


	// 0xbb
	PACKET.CZ.STATUS_CHANGE = function PACKET_CZ_STATUS_CHANGE() {
		this.statusID = 0;
		this.changeAmount = 0;
	};
	PACKET.CZ.STATUS_CHANGE.prototype.build = function() {
		var pkt_len = 2 + 2 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xbb);
		pkt_buf.writeUShort(this.statusID);
		pkt_buf.writeUChar(this.changeAmount);
		return pkt_buf;
	};


	// 0xbf
	PACKET.CZ.REQ_EMOTION = function PACKET_CZ_REQ_EMOTION() {
		this.type = 0;
	};
	PACKET.CZ.REQ_EMOTION.prototype.build = function() {
		var pkt_len = 2 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xbf);
		pkt_buf.writeUChar(this.type);
		return pkt_buf;
	};



	// 0xc1
	PACKET.CZ.REQ_USER_COUNT = function PACKET_CZ_REQ_USER_COUNT() {};
	PACKET.CZ.REQ_USER_COUNT.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xc1);
		return pkt_buf;
	};


	// 0xc5
	PACKET.CZ.ACK_SELECT_DEALTYPE = function PACKET_CZ_ACK_SELECT_DEALTYPE() {
		this.NAID = 0;
		this.type = 0;
	};
	PACKET.CZ.ACK_SELECT_DEALTYPE.prototype.build = function() {
		var pkt_len = 2 + 4 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xc5);
		pkt_buf.writeULong(this.NAID);
		pkt_buf.writeUChar(this.type);
		return pkt_buf;
	};


	// 0xc8
	PACKET.CZ.PC_PURCHASE_ITEMLIST = function PACKET_CZ_PC_PURCHASE_ITEMLIST() {
		this.itemList = [];
	};
	PACKET.CZ.PC_PURCHASE_ITEMLIST.prototype.build = function() {
		var pkt_len = 2 + 2 + this.itemList.length * 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xc8);
		pkt_buf.writeShort(pkt_len);

		var i, count;
		for (i = 0, count = this.itemList.length; i < count; ++i) {
			pkt_buf.writeShort(this.itemList[i].count);
			pkt_buf.writeUShort(this.itemList[i].ITID);
		}

		return pkt_buf;
	};


	// 0xc9
	PACKET.CZ.PC_SELL_ITEMLIST = function PACKET_CZ_PC_SELL_ITEMLIST() {
		this.itemList = [];
	};
	PACKET.CZ.PC_SELL_ITEMLIST.prototype.build = function() {
		var pkt_len = 2 + 2 + this.itemList.length * 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xc9);
		pkt_buf.writeShort(pkt_len);

		var i, count;
		for (i = 0, count = this.itemList.length; i < count; ++i) {
			pkt_buf.writeShort(this.itemList[i].index);
			pkt_buf.writeShort(this.itemList[i].count);
		}

		return pkt_buf;
	};


	// 0xcc
	PACKET.CZ.DISCONNECT_CHARACTER = function PACKET_CZ_DISCONNECT_CHARACTER() {
		this.AID = 0;
	};
	PACKET.CZ.DISCONNECT_CHARACTER.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xcc);
		pkt_buf.writeULong(this.AID);
		return pkt_buf;
	};


	// 0xce
	PACKET.CZ.DISCONNECT_ALL_CHARACTER = function PACKET_CZ_DISCONNECT_ALL_CHARACTER() {};
	PACKET.CZ.DISCONNECT_ALL_CHARACTER.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xce);
		return pkt_buf;
	};


	// 0xcf
	PACKET.CZ.SETTING_WHISPER_PC = function PACKET_CZ_SETTING_WHISPER_PC() {
		this.name = '';
		this.type = 0;
	};
	PACKET.CZ.SETTING_WHISPER_PC.prototype.build = function() {
		var pkt_len = 2 + 24 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xcf);
		pkt_buf.writeString(this.name, 24);
		pkt_buf.writeUChar(this.type);
		return pkt_buf;
	};



	// 0xd0
	PACKET.CZ.SETTING_WHISPER_STATE = function PACKET_CZ_SETTING_WHISPER_STATE() {
		this.type = 0;
	};
	PACKET.CZ.SETTING_WHISPER_STATE.prototype.build = function() {
		var pkt_len = 2 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xd0);
		pkt_buf.writeUChar(this.type);
		return pkt_buf;
	};


	// 0xd3
	PACKET.CZ.REQ_WHISPER_LIST = function PACKET_CZ_REQ_WHISPER_LIST() {};
	PACKET.CZ.REQ_WHISPER_LIST.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xd3);
		return pkt_buf;
	};



	// 0xd5
	PACKET.CZ.CREATE_CHATROOM = function PACKET_CZ_CREATE_CHATROOM() {
		this.size = 0;
		this.type = 0;
		this.passwd = '';
		this.title = '';
	};
	PACKET.CZ.CREATE_CHATROOM.prototype.build = function() {
		var pkt_len = 2 + 2 + 2 + 1 + 8 + this.title.length;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xd5);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeShort(this.size);
		pkt_buf.writeUChar(this.type);
		pkt_buf.writeString(this.passwd, 8);
		pkt_buf.writeString(this.title);
		return pkt_buf;
	};



	// 0xd9
	PACKET.CZ.REQ_ENTER_ROOM = function PACKET_CZ_REQ_ENTER_ROOM() {
		this.roomID = 0;
		this.passwd = '';
	};
	PACKET.CZ.REQ_ENTER_ROOM.prototype.build = function() {
		var pkt_len = 2 + 4 + 8;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xd9);
		pkt_buf.writeULong(this.roomID);
		pkt_buf.writeString(this.passwd, 8);
		return pkt_buf;
	};


	// 0xde
	PACKET.CZ.CHANGE_CHATROOM = function PACKET_CZ_CHANGE_CHATROOM() {
		this.size = 0;
		this.type = 0;
		this.passwd = '';
		this.title = '';
	};
	PACKET.CZ.CHANGE_CHATROOM.prototype.build = function() {
		var pkt_len = 2 + 2 + 2 + 1 + 8 + this.title.length;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xde);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeShort(this.size);
		pkt_buf.writeUChar(this.type);
		pkt_buf.writeString(this.passwd, 8);
		pkt_buf.writeString(this.title);
		return pkt_buf;
	};



	// 0xe0
	PACKET.CZ.REQ_ROLE_CHANGE = function PACKET_CZ_REQ_ROLE_CHANGE() {
		this.role = 0;
		this.name = '';
	};
	PACKET.CZ.REQ_ROLE_CHANGE.prototype.build = function() {
		var pkt_len = 2 + 4 + 24;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xe0);
		pkt_buf.writeULong(this.role);
		pkt_buf.writeString(this.name, 24);
		return pkt_buf;
	};


	// 0xe2
	PACKET.CZ.REQ_EXPEL_MEMBER = function PACKET_CZ_REQ_EXPEL_MEMBER() {
		this.name = '';
	};
	PACKET.CZ.REQ_EXPEL_MEMBER.prototype.build = function() {
		var pkt_len = 2 + 24;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xe2);
		pkt_buf.writeString(this.name, 24);
		return pkt_buf;
	};


	// 0xe3
	PACKET.CZ.EXIT_ROOM = function PACKET_CZ_EXIT_ROOM() {};
	PACKET.CZ.EXIT_ROOM.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xe3);
		return pkt_buf;
	};


	// 0xe4
	PACKET.CZ.REQ_EXCHANGE_ITEM = function PACKET_CZ_REQ_EXCHANGE_ITEM() {
		this.AID = 0;
	};
	PACKET.CZ.REQ_EXCHANGE_ITEM.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xe4);
		pkt_buf.writeULong(this.AID);
		return pkt_buf;
	};


	// 0xe6
	PACKET.CZ.ACK_EXCHANGE_ITEM = function PACKET_CZ_ACK_EXCHANGE_ITEM() {
		this.result = 0;
	};
	PACKET.CZ.ACK_EXCHANGE_ITEM.prototype.build = function() {
		var pkt_len = 2 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xe6);
		pkt_buf.writeUChar(this.result);
		return pkt_buf;
	};


	// 0xe8
	PACKET.CZ.ADD_EXCHANGE_ITEM = function PACKET_CZ_ADD_EXCHANGE_ITEM() {
		this.index = 0;
		this.count = 0;
	};
	PACKET.CZ.ADD_EXCHANGE_ITEM.prototype.build = function() {
		var pkt_len = 2 + 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xe8);
		pkt_buf.writeShort(this.index);
		pkt_buf.writeLong(this.count);
		return pkt_buf;
	};


	// 0xeb
	PACKET.CZ.CONCLUDE_EXCHANGE_ITEM = function PACKET_CZ_CONCLUDE_EXCHANGE_ITEM() {};
	PACKET.CZ.CONCLUDE_EXCHANGE_ITEM.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xeb);
		return pkt_buf;
	};


	// 0xed
	PACKET.CZ.CANCEL_EXCHANGE_ITEM = function PACKET_CZ_CANCEL_EXCHANGE_ITEM() {};
	PACKET.CZ.CANCEL_EXCHANGE_ITEM.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xed);
		return pkt_buf;
	};


	// 0xef
	PACKET.CZ.EXEC_EXCHANGE_ITEM = function PACKET_CZ_EXEC_EXCHANGE_ITEM() {};
	PACKET.CZ.EXEC_EXCHANGE_ITEM.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xef);
		return pkt_buf;
	};


	// 0xf3
	PACKET.CZ.MOVE_ITEM_FROM_BODY_TO_STORE = function PACKET_CZ_MOVE_ITEM_FROM_BODY_TO_STORE() {
		this.index = 0;
		this.count = 0;
	};
	PACKET.CZ.MOVE_ITEM_FROM_BODY_TO_STORE.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setInt16(ver[3], this.index, true);
		pkt.view.setInt32(ver[4], this.count, true);
		return pkt;
	};


	// 0xf5
	PACKET.CZ.MOVE_ITEM_FROM_STORE_TO_BODY = function PACKET_CZ_MOVE_ITEM_FROM_STORE_TO_BODY() {
		this.index = 0;
		this.count = 0;
	};
	PACKET.CZ.MOVE_ITEM_FROM_STORE_TO_BODY.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setInt16(ver[3], this.index, true);
		pkt.view.setInt32(ver[4], this.count, true);
		return pkt;
	};


	// 0xf7
	PACKET.CZ.CLOSE_STORE = function PACKET_CZ_CLOSE_STORE() {};
	PACKET.CZ.CLOSE_STORE.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);

		return pkt;
	};


	// 0xf9
	PACKET.CZ.MAKE_GROUP = function PACKET_CZ_MAKE_GROUP() {
		this.groupName = '';
	};
	PACKET.CZ.MAKE_GROUP.prototype.build = function() {
		var pkt_len = 2 + 24;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xf9);
		pkt_buf.writeString(this.groupName, 24);
		return pkt_buf;
	};


	// 0xfc
	PACKET.CZ.REQ_JOIN_GROUP = function PACKET_CZ_REQ_JOIN_GROUP() {
		this.AID = 0;
		this.CharName = '';
	};
	PACKET.CZ.REQ_JOIN_GROUP.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		if (ver[2] === 26) {
			pkt.view.setString(ver[3], this.CharName, 24);
		} else {
			pkt.view.setInt32(ver[3], this.AID, true);
		}
		return pkt;
	};


	// 0xff
	PACKET.CZ.JOIN_GROUP = function PACKET_CZ_JOIN_GROUP() {
		this.GRID = 0;
		this.answer = 0;
	};
	PACKET.CZ.JOIN_GROUP.prototype.build = function() {
		var pkt_len = 2 + 4 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0xff);
		pkt_buf.writeULong(this.GRID);
		pkt_buf.writeLong(this.answer);
		return pkt_buf;
	};


	// 0x100
	PACKET.CZ.REQ_LEAVE_GROUP = function PACKET_CZ_REQ_LEAVE_GROUP() {};
	PACKET.CZ.REQ_LEAVE_GROUP.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x100);
		return pkt_buf;
	};


	// 0x102
	PACKET.CZ.CHANGE_GROUPEXPOPTION = function PACKET_CZ_CHANGE_GROUPEXPOPTION() {
		this.expOption = 0;
	};
	PACKET.CZ.CHANGE_GROUPEXPOPTION.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x102);
		pkt_buf.writeULong(this.expOption);
		return pkt_buf;
	};


	// 0x103
	PACKET.CZ.REQ_EXPEL_GROUP_MEMBER = function PACKET_CZ_REQ_EXPEL_GROUP_MEMBER() {
		this.AID = 0;
		this.characterName = '';
	};
	PACKET.CZ.REQ_EXPEL_GROUP_MEMBER.prototype.build = function() {
		var pkt_len = 2 + 4 + 24;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x103);
		pkt_buf.writeULong(this.AID);
		pkt_buf.writeString(this.characterName, 24);
		return pkt_buf;
	};


	// 0x108
	PACKET.CZ.REQUEST_CHAT_PARTY = function PACKET_CZ_REQUEST_CHAT_PARTY() {
		this.msg = '';
	};
	PACKET.CZ.REQUEST_CHAT_PARTY.prototype.build = function() {
		var pkt_len = 2 + 2 + this.msg.length + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x108);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeString(this.msg);
		return pkt_buf;
	};


	// 0x112
	PACKET.CZ.UPGRADE_SKILLLEVEL = function PACKET_CZ_UPGRADE_SKILLLEVEL() {
		this.SKID = 0;
	};
	PACKET.CZ.UPGRADE_SKILLLEVEL.prototype.build = function() {
		var pkt_len = 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x112);
		pkt_buf.writeUShort(this.SKID);
		return pkt_buf;
	};



	// 0x113
	PACKET.CZ.USE_SKILL = function PACKET_CZ_USE_SKILL() {
		this.selectedLevel = 0;
		this.SKID = 0;
		this.targetID = 0;
	};
	PACKET.CZ.USE_SKILL.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setInt16(ver[3], this.selectedLevel, true);
		pkt.view.setUint16(ver[4], this.SKID, true);
		pkt.view.setUint32(ver[5], this.targetID, true);
		return pkt;
	};


	// 0x116
	PACKET.CZ.USE_SKILL_TOGROUND = function PACKET_CZ_USE_SKILL_TOGROUND() {
		this.selectedLevel = 0;
		this.SKID = 0;
		this.xPos = 0;
		this.yPos = 0;
	};
	PACKET.CZ.USE_SKILL_TOGROUND.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setInt16(ver[3], this.selectedLevel, true);
		pkt.view.setInt16(ver[4], this.SKID, true);
		pkt.view.setInt16(ver[5], this.xPos, true);
		pkt.view.setInt16(ver[6], this.yPos, true);
		return pkt;
	};


	// 0x118
	PACKET.CZ.CANCEL_LOCKON = function PACKET_CZ_CANCEL_LOCKON() {};
	PACKET.CZ.CANCEL_LOCKON.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x118);
		return pkt_buf;
	};


	// 0x11b
	PACKET.CZ.SELECT_WARPPOINT = function PACKET_CZ_SELECT_WARPPOINT() {
		this.SKID = 0;
		this.mapName = '';
	};
	PACKET.CZ.SELECT_WARPPOINT.prototype.build = function() {
		var pkt_len = 2 + 2 + 16;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x11b);
		pkt_buf.writeUShort(this.SKID);
		pkt_buf.writeString(this.mapName, 16);
		return pkt_buf;
	};



	// 0x11d
	PACKET.CZ.REMEMBER_WARPPOINT = function PACKET_CZ_REMEMBER_WARPPOINT() {};
	PACKET.CZ.REMEMBER_WARPPOINT.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x11d);
		return pkt_buf;
	};



	// 0x126
	PACKET.CZ.MOVE_ITEM_FROM_BODY_TO_CART = function PACKET_CZ_MOVE_ITEM_FROM_BODY_TO_CART() {
		this.index = 0;
		this.count = 0;
	};
	PACKET.CZ.MOVE_ITEM_FROM_BODY_TO_CART.prototype.build = function() {
		var pkt_len = 2 + 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x126);
		pkt_buf.writeShort(this.index);
		pkt_buf.writeLong(this.count);
		return pkt_buf;
	};



	// 0x127
	PACKET.CZ.MOVE_ITEM_FROM_CART_TO_BODY = function PACKET_CZ_MOVE_ITEM_FROM_CART_TO_BODY() {
		this.index = 0;
		this.count = 0;
	};
	PACKET.CZ.MOVE_ITEM_FROM_CART_TO_BODY.prototype.build = function() {
		var pkt_len = 2 + 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x127);
		pkt_buf.writeShort(this.index);
		pkt_buf.writeLong(this.count);
		return pkt_buf;
	};


	// 0x128
	PACKET.CZ.MOVE_ITEM_FROM_STORE_TO_CART = function PACKET_CZ_MOVE_ITEM_FROM_STORE_TO_CART() {
		this.index = 0;
		this.count = 0;
	};
	PACKET.CZ.MOVE_ITEM_FROM_STORE_TO_CART.prototype.build = function() {
		var pkt_len = 2 + 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x128);
		pkt_buf.writeShort(this.index);
		pkt_buf.writeLong(this.count);
		return pkt_buf;
	};


	// 0x129
	PACKET.CZ.MOVE_ITEM_FROM_CART_TO_STORE = function PACKET_CZ_MOVE_ITEM_FROM_CART_TO_STORE() {
		this.index = 0;
		this.count = 0;
	};
	PACKET.CZ.MOVE_ITEM_FROM_CART_TO_STORE.prototype.build = function() {
		var pkt_len = 2 + 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x129);
		pkt_buf.writeShort(this.index);
		pkt_buf.writeLong(this.count);
		return pkt_buf;
	};


	// 0x12a
	PACKET.CZ.REQ_CARTOFF = function PACKET_CZ_REQ_CARTOFF() {};
	PACKET.CZ.REQ_CARTOFF.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x12a);
		return pkt_buf;
	};


	// 0x12e
	PACKET.CZ.REQ_CLOSESTORE = function PACKET_CZ_REQ_CLOSESTORE() {};
	PACKET.CZ.REQ_CLOSESTORE.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x12e);
		return pkt_buf;
	};


	// 0x12f
	PACKET.CZ.REQ_OPENSTORE = function PACKET_CZ_REQ_OPENSTORE() {
		this.storeName = '';
		this.storeList = [];
	};
	PACKET.CZ.REQ_OPENSTORE.prototype.build = function() {
		var i, count;
		var pkt_len = 2 + 2 + 80 + this.storeList.length * 8;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x12f);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeString(this.storeName, 80);

		for (i = 0, count = this.storeList.length; i < count; ++i) {
			pkt_buf.writeShort(this.storeList[i].index);
			pkt_buf.writeShort(this.storeList[i].count);
			pkt_buf.writeLong(this.storeList[i].Price);
		}

		return pkt_buf;
	};


	// 0x130
	PACKET.CZ.REQ_BUY_FROMMC = function PACKET_CZ_REQ_BUY_FROMMC() {
		this.AID = 0;
	};
	PACKET.CZ.REQ_BUY_FROMMC.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x130);
		pkt_buf.writeULong(this.AID);
		return pkt_buf;
	};


	// 0x134
	PACKET.CZ.PC_PURCHASE_ITEMLIST_FROMMC = function PACKET_CZ_PC_PURCHASE_ITEMLIST_FROMMC() {
		this.AID = 0;
		this.itemList = [];
	};
	PACKET.CZ.PC_PURCHASE_ITEMLIST_FROMMC.prototype.build = function() {
		var i, count;
		var pkt_len = 2 + 2 + 4 + this.itemList.length * 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x134);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeULong(this.AID);

		for (i = 0, count = this.itemList.length; i < count; ++i) {
			pkt_buf.writeShort(this.itemList[i].count);
			pkt_buf.writeShort(this.itemList[i].index);
		}

		return pkt_buf;
	};



	// 0x138
	PACKET.CZ.PKMODE_CHANGE = function PACKET_CZ_PKMODE_CHANGE() {
		this.isTurnOn = 0;
	};
	PACKET.CZ.PKMODE_CHANGE.prototype.build = function() {
		var pkt_len = 2 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x138);
		pkt_buf.writeUChar(this.isTurnOn);
		return pkt_buf;
	};


	// 0x13f
	PACKET.CZ.ITEM_CREATE = function PACKET_CZ_ITEM_CREATE() {
		this.itemName = '';
	};
	PACKET.CZ.ITEM_CREATE.prototype.build = function() {
		var pkt_len = 2 + 24;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x13f);
		pkt_buf.writeString(this.itemName, 24);
		return pkt_buf;
	};


	// 0x140
	PACKET.CZ.MOVETO_MAP = function PACKET_CZ_MOVETO_MAP() {
		this.mapName = '';
		this.xPos = 0;
		this.yPos = 0;
	};
	PACKET.CZ.MOVETO_MAP.prototype.build = function() {
		var pkt_len = 2 + 16 + 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x140);
		pkt_buf.writeBinaryString(this.mapName, 16);
		pkt_buf.writeShort(this.xPos);
		pkt_buf.writeShort(this.yPos);
		return pkt_buf;
	};


	// 0x143
	PACKET.CZ.INPUT_EDITDLG = function PACKET_CZ_INPUT_EDITDLG() {
		this.NAID = 0;
		this.value = 0;
	};
	PACKET.CZ.INPUT_EDITDLG.prototype.build = function() {
		var pkt_len = 2 + 4 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x143);
		pkt_buf.writeULong(this.NAID);
		pkt_buf.writeLong(this.value);
		return pkt_buf;
	};


	// 0x146
	PACKET.CZ.CLOSE_DIALOG = function PACKET_CZ_CLOSE_DIALOG() {
		this.NAID = 0;
	};
	PACKET.CZ.CLOSE_DIALOG.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x146);
		pkt_buf.writeULong(this.NAID);
		return pkt_buf;
	};


	// 0x149
	PACKET.CZ.REQ_GIVE_MANNER_POINT = function PACKET_CZ_REQ_GIVE_MANNER_POINT() {
		this.otherAID = 0;
		this.type = 0;
		this.point = 0;
	};
	PACKET.CZ.REQ_GIVE_MANNER_POINT.prototype.build = function() {
		var pkt_len = 2 + 4 + 1 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x149);
		pkt_buf.writeULong(this.otherAID);
		pkt_buf.writeUChar(this.type);
		pkt_buf.writeShort(this.point);
		return pkt_buf;
	};


	// 0x14d
	PACKET.CZ.REQ_GUILD_MENUINTERFACE = function PACKET_CZ_REQ_GUILD_MENUINTERFACE() {};
	PACKET.CZ.REQ_GUILD_MENUINTERFACE.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x14d);
		return pkt_buf;
	};


	// 0x14f
	PACKET.CZ.REQ_GUILD_MENU = function PACKET_CZ_REQ_GUILD_MENU() {
		this.Type = 0;
	};
	PACKET.CZ.REQ_GUILD_MENU.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x14f);
		pkt_buf.writeLong(this.Type);
		return pkt_buf;
	};


	// 0x151
	PACKET.CZ.REQ_GUILD_EMBLEM_IMG = function PACKET_CZ_REQ_GUILD_EMBLEM_IMG() {
		this.GDID = 0;
	};
	PACKET.CZ.REQ_GUILD_EMBLEM_IMG.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x151);
		pkt_buf.writeLong(this.GDID);
		return pkt_buf;
	};



	// 0x153
	PACKET.CZ.REGISTER_GUILD_EMBLEM_IMG = function PACKET_CZ_REGISTER_GUILD_EMBLEM_IMG() {
		this.img;
	};
	PACKET.CZ.REGISTER_GUILD_EMBLEM_IMG.prototype.build = function() {
		var pkt_len = 2 + 2 + this.img.byteLength;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x153);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeBuffer(this.img);

		window.buffer = pkt_buf.buffer;
		return pkt_buf;
	};


	// 0x155
	PACKET.CZ.REQ_CHANGE_MEMBERPOS = function PACKET_CZ_REQ_CHANGE_MEMBERPOS() {
		this.memberInfo = [];
	};
	PACKET.CZ.REQ_CHANGE_MEMBERPOS.prototype.build = function() {
		var i, count;
		var pkt_len = 2 + 2 + this.memberInfo.length * 12;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x155);
		pkt_buf.writeShort(pkt_len);

		for (i = 0, count = this.memberInfo.length; i < count; ++i) {
			pkt_buf.writeLong(this.memberInfo[i].AID);
			pkt_buf.writeLong(this.memberInfo[i].GID);
			pkt_buf.writeLong(this.memberInfo[i].positionID);
		}

		return pkt_buf;
	};


	// 0x157
	PACKET.CZ.REQ_OPEN_MEMBER_INFO = function PACKET_CZ_REQ_OPEN_MEMBER_INFO() {
		this.AID = 0;
	};
	PACKET.CZ.REQ_OPEN_MEMBER_INFO.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x157);
		pkt_buf.writeLong(this.AID);
		return pkt_buf;
	};


	// 0x159
	PACKET.CZ.REQ_LEAVE_GUILD = function PACKET_CZ_REQ_LEAVE_GUILD() {
		this.GDID = 0;
		this.AID = 0;
		this.GID = 0;
		this.reasonDesc = '';
	};
	PACKET.CZ.REQ_LEAVE_GUILD.prototype.build = function() {
		var pkt_len = 2 + 4 + 4 + 4 + 40;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x159);
		pkt_buf.writeULong(this.GDID);
		pkt_buf.writeLong(this.AID);
		pkt_buf.writeLong(this.GID);
		pkt_buf.writeString(this.reasonDesc, 40);
		return pkt_buf;
	};


	// 0x15b
	PACKET.CZ.REQ_BAN_GUILD = function PACKET_CZ_REQ_BAN_GUILD() {
		this.GDID = 0;
		this.AID = 0;
		this.GID = 0;
		this.reasonDesc = '';
	};
	PACKET.CZ.REQ_BAN_GUILD.prototype.build = function() {
		var pkt_len = 2 + 4 + 4 + 4 + 40;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x15b);
		pkt_buf.writeULong(this.GDID);
		pkt_buf.writeLong(this.AID);
		pkt_buf.writeLong(this.GID);
		pkt_buf.writeString(this.reasonDesc, 40);
		return pkt_buf;
	};



	// 0x15d
	PACKET.CZ.REQ_DISORGANIZE_GUILD = function PACKET_CZ_REQ_DISORGANIZE_GUILD() {
		this.key = '';
	};
	PACKET.CZ.REQ_DISORGANIZE_GUILD.prototype.build = function() {
		var pkt_len = 2 + 40;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x15d);
		pkt_buf.writeString(this.key, 40);
		return pkt_buf;
	};


	// 0x161
	PACKET.CZ.REG_CHANGE_GUILD_POSITIONINFO = function PACKET_CZ_REG_CHANGE_GUILD_POSITIONINFO() {
		this.memberList = [];
	};
	PACKET.CZ.REG_CHANGE_GUILD_POSITIONINFO.prototype.build = function() {
		var i, count;
		var pkt_len = 2 + 2 + this.memberList.length * 40;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x161);
		pkt_buf.writeShort(pkt_len);

		for (i = 0, count = this.memberList.length; i < count; ++i) {
			pkt_buf.writeLong(this.memberList[i].positionID);
			pkt_buf.writeLong(this.memberList[i].right);
			pkt_buf.writeLong(this.memberList[i].ranking);
			pkt_buf.writeLong(this.memberList[i].payRate);
			pkt_buf.writeString(this.memberList[i].posName, 24);
		}

		return pkt_buf;
	};


	// 0x165
	PACKET.CZ.REQ_MAKE_GUILD = function PACKET_CZ_REQ_MAKE_GUILD() {
		this.GID = 0;
		this.GName = '';
	};
	PACKET.CZ.REQ_MAKE_GUILD.prototype.build = function() {
		var pkt_len = 2 + 4 + 24;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x165);
		pkt_buf.writeULong(this.GID);
		pkt_buf.writeString(this.GName, 24);
		return pkt_buf;
	};


	// 0x168
	PACKET.CZ.REQ_JOIN_GUILD = function PACKET_CZ_REQ_JOIN_GUILD() {
		this.AID = 0;
		this.MyAID = 0;
		this.MyGID = 0;
	};
	PACKET.CZ.REQ_JOIN_GUILD.prototype.build = function() {
		var pkt_len = 2 + 4 + 4 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x168);
		pkt_buf.writeULong(this.AID);
		pkt_buf.writeULong(this.MyAID);
		pkt_buf.writeULong(this.MyGID);
		return pkt_buf;
	};


	// 0x16b
	PACKET.CZ.JOIN_GUILD = function PACKET_CZ_JOIN_GUILD() {
		this.GDID = 0;
		this.answer = 0;
	};
	PACKET.CZ.JOIN_GUILD.prototype.build = function() {
		var pkt_len = 2 + 4 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x16b);
		pkt_buf.writeULong(this.GDID);
		pkt_buf.writeLong(this.answer);
		return pkt_buf;
	};



	// 0x16e
	PACKET.CZ.GUILD_NOTICE = function PACKET_CZ_GUILD_NOTICE() {
		this.GDID = 0;
		this.subject = '';
		this.notice = '';
	};
	PACKET.CZ.GUILD_NOTICE.prototype.build = function() {
		var pkt_len = 2 + 4 + 60 + 120;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x16e);
		pkt_buf.writeULong(this.GDID);
		pkt_buf.writeString(this.subject, 60);
		pkt_buf.writeString(this.notice, 120);
		return pkt_buf;
	};


	// 0x170
	PACKET.CZ.REQ_ALLY_GUILD = function PACKET_CZ_REQ_ALLY_GUILD() {
		this.AID = 0;
		this.MyAID = 0;
		this.MyGID = 0;
	};
	PACKET.CZ.REQ_ALLY_GUILD.prototype.build = function() {
		var pkt_len = 2 + 4 + 4 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x170);
		pkt_buf.writeULong(this.AID);
		pkt_buf.writeULong(this.MyAID);
		pkt_buf.writeULong(this.MyGID);
		return pkt_buf;
	};


	// 0x172
	PACKET.CZ.ALLY_GUILD = function PACKET_CZ_ALLY_GUILD() {
		this.otherAID = 0;
		this.answer = 0;
	};
	PACKET.CZ.ALLY_GUILD.prototype.build = function() {
		var pkt_len = 2 + 4 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x172);
		pkt_buf.writeULong(this.otherAID);
		pkt_buf.writeLong(this.answer);
		return pkt_buf;
	};


	// 0x175
	PACKET.CZ.REQ_GUILD_MEMBER_INFO = function PACKET_CZ_REQ_GUILD_MEMBER_INFO() {
		this.GID = 0;
	};
	PACKET.CZ.REQ_GUILD_MEMBER_INFO.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x175);
		pkt_buf.writeLong(this.GID);
		return pkt_buf;
	};


	// 0x178
	PACKET.CZ.REQ_ITEMIDENTIFY = function PACKET_CZ_REQ_ITEMIDENTIFY() {
		this.index = 0;
	};
	PACKET.CZ.REQ_ITEMIDENTIFY.prototype.build = function() {
		var pkt_len = 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x178);
		pkt_buf.writeShort(this.index);
		return pkt_buf;
	};


	// 0x17a
	PACKET.CZ.REQ_ITEMCOMPOSITION_LIST = function PACKET_CZ_REQ_ITEMCOMPOSITION_LIST() {
		this.cardIndex = 0;
	};
	PACKET.CZ.REQ_ITEMCOMPOSITION_LIST.prototype.build = function() {
		var pkt_len = 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x17a);
		pkt_buf.writeShort(this.cardIndex);
		return pkt_buf;
	};


	// 0x17c
	PACKET.CZ.REQ_ITEMCOMPOSITION = function PACKET_CZ_REQ_ITEMCOMPOSITION() {
		this.cardIndex = 0;
		this.equipIndex = 0;
	};
	PACKET.CZ.REQ_ITEMCOMPOSITION.prototype.build = function() {
		var pkt_len = 2 + 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x17c);
		pkt_buf.writeShort(this.cardIndex);
		pkt_buf.writeShort(this.equipIndex);
		return pkt_buf;
	};


	// 0x17e
	PACKET.CZ.GUILD_CHAT = function PACKET_CZ_GUILD_CHAT() {
		this.msg = '';
	};
	PACKET.CZ.GUILD_CHAT.prototype.build = function() {
		var pkt_len = 2 + 2 + this.msg.length + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x17e);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeString(this.msg);
		return pkt_buf;
	};


	// 0x180
	PACKET.CZ.REQ_HOSTILE_GUILD = function PACKET_CZ_REQ_HOSTILE_GUILD() {
		this.AID = 0;
	};
	PACKET.CZ.REQ_HOSTILE_GUILD.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x180);
		pkt_buf.writeULong(this.AID);
		return pkt_buf;
	};


	// 0x183
	PACKET.CZ.REQ_DELETE_RELATED_GUILD = function PACKET_CZ_REQ_DELETE_RELATED_GUILD() {
		this.OpponentGDID = 0;
		this.Relation = 0;
	};
	PACKET.CZ.REQ_DELETE_RELATED_GUILD.prototype.build = function() {
		var pkt_len = 2 + 4 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x183);
		pkt_buf.writeULong(this.OpponentGDID);
		pkt_buf.writeLong(this.Relation);
		return pkt_buf;
	};


	// 0x187
	PACKET.CZ.PING = function PACKET_CZ_PING() {
		this.AID = 0;
	};
	PACKET.CZ.PING.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x187);
		pkt_buf.writeULong(this.AID);
		return pkt_buf;
	};


	// 0x18a
	PACKET.CZ.REQ_DISCONNECT = function PACKET_CZ_REQ_DISCONNECT() {
		this.type = 0;
	};
	PACKET.CZ.REQ_DISCONNECT.prototype.build = function() {
		var pkt_len = 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x18a);
		pkt_buf.writeShort(this.type);
		return pkt_buf;
	};


	// 0x18e
	PACKET.CZ.REQMAKINGITEM = function PACKET_CZ_REQMAKINGITEM() {
		this.info = {};
	};
	PACKET.CZ.REQMAKINGITEM.prototype.build = function() {
		var pkt_len = 2 + 2 + 6;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x18e);
		pkt_buf.writeUShort(this.info.ITID);
		pkt_buf.writeUShort(this.info.material_ID[0]);
		pkt_buf.writeUShort(this.info.material_ID[1]);
		return pkt_buf;
	};


	// 0x190
	PACKET.CZ.USE_SKILL_TOGROUNDMoreInfo = function PACKET_CZ_USE_SKILL_TOGROUND_MoreInfo() {
		this.selectedLevel = 0;
		this.SKID = 0;
		this.xPos = 0;
		this.yPos = 0;
		this.contents = '';
	};
	PACKET.CZ.USE_SKILL_TOGROUNDMoreInfo.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setInt16(ver[3], this.selectedLevel, true);
		pkt.view.setUint16(ver[4], this.SKID, true);
		pkt.view.setInt16(ver[5], this.xPos, true);
		pkt.view.setInt16(ver[6], this.yPos, true);
		pkt.view.setString(ver[7], this.contents, 80);
		return pkt;
	};


	// 0x193
	PACKET.CZ.REQNAME_BYGID = function PACKET_CZ_REQNAME_BYGID() {
		this.GID = 0;
	};
	PACKET.CZ.REQNAME_BYGID.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setUint32(ver[3], this.GID, true);
		return pkt;
	};


	// 0x197
	PACKET.CZ.RESET = function PACKET_CZ_RESET() {
		this.type = 0;
	};
	PACKET.CZ.RESET.prototype.build = function() {
		var pkt_len = 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x197);
		pkt_buf.writeShort(this.type);
		return pkt_buf;
	};


	// 0x198
	PACKET.CZ.CHANGE_MAPTYPE = function PACKET_CZ_CHANGE_MAPTYPE() {
		this.xPos = 0;
		this.yPos = 0;
		this.type = 0;
	};
	PACKET.CZ.CHANGE_MAPTYPE.prototype.build = function() {
		var pkt_len = 2 + 2 + 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x198);
		pkt_buf.writeShort(this.xPos);
		pkt_buf.writeShort(this.yPos);
		pkt_buf.writeShort(this.type);
		return pkt_buf;
	};


	// 0x19c
	PACKET.CZ.LOCALBROADCAST = function PACKET_CZ_LOCALBROADCAST() {
		this.msg = '';
	};
	PACKET.CZ.LOCALBROADCAST.prototype.build = function() {
		var pkt_len = 2 + 2 + this.msg.length + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x19c);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeString(this.msg);
		return pkt_buf;
	};


	// 0x19d
	PACKET.CZ.CHANGE_EFFECTSTATE = function PACKET_CZ_CHANGE_EFFECTSTATE() {
		this.EffectState = 0;
	};
	PACKET.CZ.CHANGE_EFFECTSTATE.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x19d);
		pkt_buf.writeLong(this.EffectState);
		return pkt_buf;
	};


	// 0x19f
	PACKET.CZ.TRYCAPTURE_MONSTER = function PACKET_CZ_TRYCAPTURE_MONSTER() {
		this.targetAID = 0;
	};
	PACKET.CZ.TRYCAPTURE_MONSTER.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x19f);
		pkt_buf.writeULong(this.targetAID);
		return pkt_buf;
	};


	// 0x1a1
	PACKET.CZ.COMMAND_PET = function PACKET_CZ_COMMAND_PET() {
		this.cSub = 0;
	};
	PACKET.CZ.COMMAND_PET.prototype.build = function() {
		var pkt_len = 2 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1a1);
		pkt_buf.writeChar(this.cSub);
		return pkt_buf;
	};


	// 0x1a5
	PACKET.CZ.RENAME_PET = function PACKET_CZ_RENAME_PET() {
		this.szName = '';
	};
	PACKET.CZ.RENAME_PET.prototype.build = function() {
		var pkt_len = 2 + 24;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1a5);
		pkt_buf.writeString(this.szName, 24);
		return pkt_buf;
	};



	// 0x1a7
	PACKET.CZ.SELECT_PETEGG = function PACKET_CZ_SELECT_PETEGG() {
		this.index = 0;
	};
	PACKET.CZ.SELECT_PETEGG.prototype.build = function() {
		var pkt_len = 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1a7);
		pkt_buf.writeShort(this.index);
		return pkt_buf;
	};


	// 0x1a8
	PACKET.CZ.PETEGG_INFO = function PACKET_CZ_PETEGG_INFO() {
		this.index = 0;
	};
	PACKET.CZ.PETEGG_INFO.prototype.build = function() {
		var pkt_len = 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1a8);
		pkt_buf.writeShort(this.index);
		return pkt_buf;
	};


	// 0x1a9
	PACKET.CZ.PET_ACT = function PACKET_CZ_PET_ACT() {
		this.data = 0;
	};
	PACKET.CZ.PET_ACT.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1a9);
		pkt_buf.writeLong(this.data);
		return pkt_buf;
	};


	// 0x1ae
	PACKET.CZ.REQ_MAKINGARROW = function PACKET_CZ_REQ_MAKINGARROW() {
		this.id = 0;
	};
	PACKET.CZ.REQ_MAKINGARROW.prototype.build = function() {
		var pkt_len = 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1ae);
		pkt_buf.writeUShort(this.id);
		return pkt_buf;
	};


	// 0x1af
	PACKET.CZ.REQ_CHANGECART = function PACKET_CZ_REQ_CHANGECART() {
		this.num = 0;
	};
	PACKET.CZ.REQ_CHANGECART.prototype.build = function() {
		var pkt_len = 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1af);
		pkt_buf.writeShort(this.num);
		return pkt_buf;
	};


	// 0x1b2
	PACKET.CZ.REQ_OPENSTORE2 = function PACKET_CZ_REQ_OPENSTORE2() {
		this.storeName = '';
		this.result = 0;
		this.storeList = [];
	};
	PACKET.CZ.REQ_OPENSTORE2.prototype.build = function() {
		var pkt_len = 2 + 2 + 80 + 1 + this.storeList.length * 8;
		var pkt_buf = new BinaryWriter(pkt_len);
		var i, count;

		pkt_buf.writeShort(0x1b2);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeString(this.storeName, 80);
		pkt_buf.writeUChar(this.result);

		for (i = 0, count = this.storeList.length; i < count; ++i) {
			pkt_buf.writeShort(this.storeList[i].index);
			pkt_buf.writeShort(this.storeList[i].count);
			pkt_buf.writeLong(this.storeList[i].Price);
		}

		return pkt_buf;
	};


	// 0x1b7
	PACKET.CZ.GUILD_ZENY = function PACKET_CZ_GUILD_ZENY() {
		this.zeny = 0;
	};
	PACKET.CZ.GUILD_ZENY.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1b7);
		pkt_buf.writeLong(this.zeny);
		return pkt_buf;
	};


	// 0x1ba
	PACKET.CZ.REMOVE_AID = function PACKET_CZ_REMOVE_AID() {
		this.AccountName = '';
	};
	PACKET.CZ.REMOVE_AID.prototype.build = function() {
		var pkt_len = 2 + 24;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1ba);
		pkt_buf.writeString(this.AccountName, 24);
		return pkt_buf;
	};


	// 0x1bb
	PACKET.CZ.SHIFT = function PACKET_CZ_SHIFT() {
		this.CharacterName = '';
	};
	PACKET.CZ.SHIFT.prototype.build = function() {
		var pkt_len = 2 + 24;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1bb);
		pkt_buf.writeString(this.CharacterName, 24);
		return pkt_buf;
	};



	// 0x1bc
	PACKET.CZ.RECALL = function PACKET_CZ_RECALL() {
		this.AccountName = '';
	};
	PACKET.CZ.RECALL.prototype.build = function() {
		var pkt_len = 2 + 24;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1bc);
		pkt_buf.writeString(this.AccountName, 24);
		return pkt_buf;
	};



	// 0x1bd
	PACKET.CZ.RECALL_GID = function PACKET_CZ_RECALL_GID() {
		this.CharacterName = '';
	};
	PACKET.CZ.RECALL_GID.prototype.build = function() {
		var pkt_len = 2 + 24;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1bd);
		pkt_buf.writeString(this.CharacterName, 24);
		return pkt_buf;
	};


	// 0x1bf
	PACKET.CA.REPLY_PNGAMEROOM = function PACKET_CA_REPLY_PNGAMEROOM() {
		this.Permission = 0;
	};
	PACKET.CA.REPLY_PNGAMEROOM.prototype.build = function() {
		var pkt_len = 2 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1bf);
		pkt_buf.writeUChar(this.Permission);
		return pkt_buf;
	};


	// 0x1c0
	PACKET.CZ.REQ_REMAINTIME = function PACKET_CZ_REQ_REMAINTIME() {};
	PACKET.CZ.REQ_REMAINTIME.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1c0);
		return pkt_buf;
	};



	// 0x1c6
	PACKET.CS.REQ_ENCRYPTION = function PACKET_CS_REQ_ENCRYPTION() {
		this.encCount = 0;
		this.decCount = 0;
	};
	PACKET.CS.REQ_ENCRYPTION.prototype.build = function() {
		var pkt_len = 2 + 1 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1c6);
		pkt_buf.writeChar(this.encCount);
		pkt_buf.writeChar(this.decCount);
		return pkt_buf;
	};


	// 0x1ca
	PACKET.CZ.REQMAKINGHOMUN = function PACKET_CZ_REQMAKINGHOMUN() {
		this.result = 0;
	};
	PACKET.CZ.REQMAKINGHOMUN.prototype.build = function() {
		var pkt_len = 2 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1ca);
		pkt_buf.writeUChar(this.result);
		return pkt_buf;
	};


	// 0x1cb
	PACKET.CZ.MONSTER_TALK = function PACKET_CZ_MONSTER_TALK() {
		this.GID = 0;
		this.stateId = 0;
		this.skillId = 0;
		this.arg1 = 0;
	};
	PACKET.CZ.MONSTER_TALK.prototype.build = function() {
		var pkt_len = 2 + 4 + 1 + 1 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1cb);
		pkt_buf.writeULong(this.GID);
		pkt_buf.writeUChar(this.stateId);
		pkt_buf.writeUChar(this.skillId);
		pkt_buf.writeUChar(this.arg1);
		return pkt_buf;
	};


	// 0x1ce
	PACKET.CZ.SELECTAUTOSPELL = function PACKET_CZ_SELECTAUTOSPELL() {
		this.SKID = 0;
	};
	PACKET.CZ.SELECTAUTOSPELL.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1ce);
		pkt_buf.writeLong(this.SKID);
		return pkt_buf;
	};



	// 0x1d5
	PACKET.CZ.INPUT_EDITDLGSTR = function PACKET_CZ_INPUT_EDITDLGSTR() {
		this.NAID = 0;
		this.msg = '';
	};
	PACKET.CZ.INPUT_EDITDLGSTR.prototype.build = function() {
		var pkt_len = 2 + 2 + 4 + this.msg.length + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1d5);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeULong(this.NAID);
		pkt_buf.writeString(this.msg);
		return pkt_buf;
	};


	// 0x1db
	PACKET.CA.REQ_HASH = function PACKET_CA_REQ_HASH() {};
	PACKET.CA.REQ_HASH.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1db);
		return pkt_buf;
	};



	// 0x1dd
	PACKET.CA.LOGIN2 = function PACKET_CA_LOGIN2() {
		this.Version = 0;
		this.ID = '';
		this.PasswdMD5 = '';
		this.clienttype = 0;
	};
	PACKET.CA.LOGIN2.prototype.build = function() {
		var pkt_len = 2 + 4 + 24 + 16 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1dd);
		pkt_buf.writeULong(this.Version);
		pkt_buf.writeString(this.ID, 24);
		pkt_buf.writeString(this.PasswdMD5, 16);
		pkt_buf.writeUChar(this.clienttype);
		return pkt_buf;
	};


	// 0x1df
	PACKET.CZ.REQ_ACCOUNTNAME = function PACKET_CZ_REQ_ACCOUNTNAME() {
		this.AID = 0;
	};
	PACKET.CZ.REQ_ACCOUNTNAME.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setUint32(ver[3], this.AID, true);
		return pkt;
	};


	// 0x1e3
	PACKET.CZ.JOIN_COUPLE = function PACKET_CZ_JOIN_COUPLE() {
		this.AID = 0;
		this.GID = 0;
		this.answer = 0;
	};
	PACKET.CZ.JOIN_COUPLE.prototype.build = function() {
		var pkt_len = 2 + 4 + 4 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1e3);
		pkt_buf.writeULong(this.AID);
		pkt_buf.writeULong(this.GID);
		pkt_buf.writeLong(this.answer);
		return pkt_buf;
	};



	// 0x1e5
	PACKET.CZ.REQ_JOIN_COUPLE = function PACKET_CZ_REQ_JOIN_COUPLE() {
		this.AID = 0;
	};
	PACKET.CZ.REQ_JOIN_COUPLE.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1e5);
		pkt_buf.writeULong(this.AID);
		return pkt_buf;
	};


	// 0x1e7
	PACKET.CZ.DORIDORI = function PACKET_CZ_DORIDORI() {};
	PACKET.CZ.DORIDORI.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1e7);
		return pkt_buf;
	};


	// 0x1e8
	PACKET.CZ.MAKE_GROUP2 = function PACKET_CZ_MAKE_GROUP2() {
		this.groupName = '';
		this.ItemPickupRule = 0;
		this.ItemDivisionRule = 0;
	};
	PACKET.CZ.MAKE_GROUP2.prototype.build = function() {
		var pkt_len = 2 + 24 + 1 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1e8);
		pkt_buf.writeString(this.groupName, 24);
		pkt_buf.writeUChar(this.ItemPickupRule);
		pkt_buf.writeUChar(this.ItemDivisionRule);
		return pkt_buf;
	};


	// 0x1ed
	PACKET.CZ.CHOPOKGI = function PACKET_CZ_CHOPOKGI() {};
	PACKET.CZ.CHOPOKGI.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1ed);
		return pkt_buf;
	};



	// 0x1f7
	PACKET.CZ.JOIN_BABY = function PACKET_CZ_JOIN_BABY() {
		this.AID = 0;
		this.GID = 0;
		this.answer = 0;
	};
	PACKET.CZ.JOIN_BABY.prototype.build = function() {
		var pkt_len = 2 + 4 + 4 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1f7);
		pkt_buf.writeULong(this.AID);
		pkt_buf.writeULong(this.GID);
		pkt_buf.writeLong(this.answer);
		return pkt_buf;
	};



	// 0x1f9
	PACKET.CZ.REQ_JOIN_BABY = function PACKET_CZ_REQ_JOIN_BABY() {
		this.AID = 0;
	};
	PACKET.CZ.REQ_JOIN_BABY.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1f9);
		pkt_buf.writeULong(this.AID);
		return pkt_buf;
	};



	// 0x1fa
	PACKET.CA.LOGIN3 = function PACKET_CA_LOGIN3() {
		this.Version = 0;
		this.ID = '';
		this.PasswdMD5 = '';
		this.clienttype = 0;
		this.ClientInfo = 0;
	};
	PACKET.CA.LOGIN3.prototype.build = function() {
		var pkt_len = 2 + 4 + 24 + 16 + 1 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1fa);
		pkt_buf.writeULong(this.Version);
		pkt_buf.writeString(this.ID, 24);
		pkt_buf.writeString(this.PasswdMD5, 16);
		pkt_buf.writeUChar(this.clienttype);
		pkt_buf.writeUChar(this.ClientInfo);
		return pkt_buf;
	};



	// 0x1fb
	PACKET.CH.DELETE_CHAR2 = function PACKET_CH_DELETE_CHAR2() {
		this.GID = 0;
		this.key = '';
	};
	PACKET.CH.DELETE_CHAR2.prototype.build = function() {
		var pkt_len = 2 + 4 + 50;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x1fb);
		pkt_buf.writeULong(this.GID);
		pkt_buf.writeString(this.key, 50);
		return pkt_buf;
	};


	// 0x1fd
	PACKET.CZ.REQ_ITEMREPAIR = function PACKET_CZ_REQ_ITEMREPAIR() {
		this.TargetItemInfo = {};
	};
	PACKET.CZ.REQ_ITEMREPAIR.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);
		var pos = ver[3];

		pkt.writeShort(ver[1]);
		pkt.view.setInt16(pos + 0, this.TargetItemInfo.index, true);

		if (ver[2] === 15) {
			pkt.view.setUint16(pos + 2, this.TargetItemInfo.ITID, true);
			pkt.view.setUint8(pos + 4, this.TargetItemInfo.RefiningLevel, true);
			pkt.view.setUint16(pos + 5, this.TargetItemInfo.slot.card1, true);
			pkt.view.setUint16(pos + 7, this.TargetItemInfo.slot.card1, true);
			pkt.view.setUint16(pos + 9, this.TargetItemInfo.slot.card1, true);
			pkt.view.setUint16(pos + 11, this.TargetItemInfo.slot.card1, true);
		}

		return pkt;
	};


	// 0x200
	PACKET.CA.CONNECT_INFO_CHANGED = function PACKET_CA_CONNECT_INFO_CHANGED() {
		this.ID = '';
	};
	PACKET.CA.CONNECT_INFO_CHANGED.prototype.build = function() {
		var pkt_len = 2 + 24;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x200);
		pkt_buf.writeString(this.ID, 24);
		return pkt_buf;
	};


	// 0x202
	PACKET.CZ.ADD_FRIENDS = function PACKET_CZ_ADD_FRIENDS() {
		this.name = '';
	};
	PACKET.CZ.ADD_FRIENDS.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setString(ver[3], this.name, 24);
		return pkt;
	};


	// 0x203
	PACKET.CZ.DELETE_FRIENDS = function PACKET_CZ_DELETE_FRIENDS() {
		this.AID = 0;
		this.GID = 0;
	};
	PACKET.CZ.DELETE_FRIENDS.prototype.build = function() {
		var pkt_len = 2 + 4 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x203);
		pkt_buf.writeULong(this.AID);
		pkt_buf.writeULong(this.GID);
		return pkt_buf;
	};


	// 0x204
	PACKET.CA.EXE_HASHCHECK = function PACKET_CA_EXE_HASHCHECK() {
		this.HashValue = '';
	};
	PACKET.CA.EXE_HASHCHECK.prototype.build = function() {
		var pkt_len = 2 + 16;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x204);
		pkt_buf.writeBinaryString(this.HashValue, 16);
		return pkt_buf;
	};


	// 0x208
	PACKET.CZ.ACK_REQ_ADD_FRIENDS = function PACKET_CZ_ACK_REQ_ADD_FRIENDS() {
		this.ReqAID = 0;
		this.ReqGID = 0;
		this.Result = 0;
	};
	PACKET.CZ.ACK_REQ_ADD_FRIENDS.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setUint32(ver[3], this.ReqAID, true);
		pkt.view.setUint32(ver[4], this.ReqGID, true);

		if (ver[2] === 11) {
			pkt.view.setInt8(ver[5], this.Result, true);
		} else {
			pkt.view.setInt32(ver[5], this.Result, true);
		}

		return pkt;
	};


	// 0x20b
	PACKET.CH.EXE_HASHCHECK = function PACKET_CH_EXE_HASHCHECK() {
		this.ClientType = 0;
		this.HashValue = '';
	};
	PACKET.CH.EXE_HASHCHECK.prototype.build = function() {
		var pkt_len = 2 + 1 + 16;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x20b);
		pkt_buf.writeUChar(this.ClientType);
		pkt_buf.writeBinaryString(this.HashValue, 16);
		return pkt_buf;
	};


	// 0x20c
	PACKET.CZ.EXE_HASHCHECK = function PACKET_CZ_EXE_HASHCHECK() {
		this.ClientType = 0;
		this.HashValue = '';
	};
	PACKET.CZ.EXE_HASHCHECK.prototype.build = function() {
		var pkt_len = 2 + 1 + 16;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x20c);
		pkt_buf.writeUChar(this.ClientType);
		pkt_buf.writeBinaryString(this.HashValue, 16);
		return pkt_buf;
	};



	// 0x20f
	PACKET.CZ.REQ_PVPPOINT = function PACKET_CZ_REQ_PVPPOINT() {
		this.AID = 0;
		this.GID = 0;
	};
	PACKET.CZ.REQ_PVPPOINT.prototype.build = function() {
		var pkt_len = 2 + 4 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x20f);
		pkt_buf.writeULong(this.AID);
		pkt_buf.writeULong(this.GID);
		return pkt_buf;
	};



	// 0x212
	PACKET.CZ.REQ_GIVE_MANNER_BYNAME = function PACKET_CZ_REQ_GIVE_MANNER_BYNAME() {
		this.CharName = '';
	};
	PACKET.CZ.REQ_GIVE_MANNER_BYNAME.prototype.build = function() {
		var pkt_len = 2 + 24;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x212);
		pkt_buf.writeString(this.CharName, 24);
		return pkt_buf;
	};


	// 0x213
	PACKET.CZ.REQ_STATUS_GM = function PACKET_CZ_REQ_STATUS_GM() {
		this.CharName = '';
	};
	PACKET.CZ.REQ_STATUS_GM.prototype.build = function() {
		var pkt_len = 2 + 24;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x213);
		pkt_buf.writeString(this.CharName, 24);
		return pkt_buf;
	};


	// 0x217
	PACKET.CZ.BLACKSMITH_RANK = function PACKET_CZ_BLACKSMITH_RANK() {};
	PACKET.CZ.BLACKSMITH_RANK.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x217);
		return pkt_buf;
	};


	// 0x218
	PACKET.CZ.ALCHEMIST_RANK = function PACKET_CZ_ALCHEMIST_RANK() {};
	PACKET.CZ.ALCHEMIST_RANK.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x218);
		return pkt_buf;
	};


	// 0x21d
	PACKET.CZ.LESSEFFECT = function PACKET_CZ_LESSEFFECT() {
		this.isLess = 0;
	};
	PACKET.CZ.LESSEFFECT.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x21d);
		pkt_buf.writeLong(this.isLess);
		return pkt_buf;
	};


	// 0x222
	PACKET.CZ.REQ_WEAPONREFINE = function PACKET_CZ_REQ_WEAPONREFINE() {
		this.Index = 0;
	};
	PACKET.CZ.REQ_WEAPONREFINE.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x222);
		pkt_buf.writeLong(this.Index);
		return pkt_buf;
	};


	// 0x225
	PACKET.CZ.TAEKWON_RANK = function PACKET_CZ_TAEKWON_RANK() {};
	PACKET.CZ.TAEKWON_RANK.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x225);
		return pkt_buf;
	};


	// 0x228
	PACKET.CZ.ACK_GAME_GUARD = function PACKET_CZ_ACK_GAME_GUARD() {
		this.AuthData = 0;
	};
	PACKET.CZ.ACK_GAME_GUARD.prototype.build = function() {
		var pkt_len = 2 + 16;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x228);
		pkt_buf.writeULong(this.AuthData[0]);
		pkt_buf.writeULong(this.AuthData[1]);
		pkt_buf.writeULong(this.AuthData[2]);
		pkt_buf.writeULong(this.AuthData[3]);
		return pkt_buf;
	};


	// 0x22d
	PACKET.CZ.COMMAND_MER = function PACKET_CZ_COMMAND_MER() {
		this.type = 0;
		this.command = 0;
	};
	PACKET.CZ.COMMAND_MER.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setInt16(ver[3], this.type, true);
		pkt.view.setInt8(ver[4], this.command, true);
		return pkt;
	};



	// 0x231
	PACKET.CZ.RENAME_MER = function PACKET_CZ_RENAME_MER() {
		this.name = '';
	};
	PACKET.CZ.RENAME_MER.prototype.build = function() {
		var pkt_len = 2 + 24;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x231);
		pkt_buf.writeString(this.name, 24);
		return pkt_buf;
	};


	// 0x232
	PACKET.CZ.REQUEST_MOVENPC = function PACKET_CZ_REQUEST_MOVENPC() {
		this.GID = 0;
		this.dest = [0, 0];
	};
	PACKET.CZ.REQUEST_MOVENPC.prototype.build = function() {
		var pkt_len = 2 + 4 + 3;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x232);
		pkt_buf.writeULong(this.GID);
		pkt_buf.writePos(this.dest);
		return pkt_buf;
	};


	// 0x233
	PACKET.CZ.REQUEST_ACTNPC = function PACKET_CZ_REQUEST_ACTNPC() {
		this.GID = 0;
		this.targetGID = 0;
		this.action = 0;
	};
	PACKET.CZ.REQUEST_ACTNPC.prototype.build = function() {
		var pkt_len = 2 + 4 + 4 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x233);
		pkt_buf.writeULong(this.GID);
		pkt_buf.writeULong(this.targetGID);
		pkt_buf.writeUChar(this.action);
		return pkt_buf;
	};


	// 0x234
	PACKET.CZ.REQUEST_MOVETOOWNER = function PACKET_CZ_REQUEST_MOVETOOWNER() {
		this.GID = 0;
	};
	PACKET.CZ.REQUEST_MOVETOOWNER.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x234);
		pkt_buf.writeULong(this.GID);
		return pkt_buf;
	};


	// 0x237
	PACKET.CZ.RANKING_PK = function PACKET_CZ_RANKING_PK() {};
	PACKET.CZ.RANKING_PK.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x237);
		return pkt_buf;
	};


	// 0x23b
	PACKET.CZ.ACK_STORE_PASSWORD = function PACKET_CZ_ACK_STORE_PASSWORD() {
		this.Type = 0;
		this.Password = '';
		this.NewPassword = '';
	};
	PACKET.CZ.ACK_STORE_PASSWORD.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setInt16(ver[3], this.Type, true);
		pkt.view.setString(ver[4], this.Password, 16);
		pkt.view.setString(ver[5], this.NewPassword, 16);
		return pkt;
	};


	// 0x23f
	PACKET.CZ.MAIL_GET_LIST = function PACKET_CZ_MAIL_GET_LIST() {};
	PACKET.CZ.MAIL_GET_LIST.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x23f);
		return pkt_buf;
	};


	// 0x241
	PACKET.CZ.MAIL_OPEN = function PACKET_CZ_MAIL_OPEN() {
		this.MailID = 0;
	};
	PACKET.CZ.MAIL_OPEN.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x241);
		pkt_buf.writeLong(this.MailID);
		return pkt_buf;
	};


	// 0x243
	PACKET.CZ.MAIL_DELETE = function PACKET_CZ_MAIL_DELETE() {
		this.MailID = 0;
	};
	PACKET.CZ.MAIL_DELETE.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x243);
		pkt_buf.writeLong(this.MailID);
		return pkt_buf;
	};


	// 0x244
	PACKET.CZ.MAIL_GET_ITEM = function PACKET_CZ_MAIL_GET_ITEM() {
		this.MailID = 0;
	};
	PACKET.CZ.MAIL_GET_ITEM.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x244);
		pkt_buf.writeLong(this.MailID);
		return pkt_buf;
	};


	// 0x246
	PACKET.CZ.MAIL_RESET_ITEM = function PACKET_CZ_MAIL_RESET_ITEM() {
		this.Type = 0;
	};
	PACKET.CZ.MAIL_RESET_ITEM.prototype.build = function() {
		var pkt_len = 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x246);
		pkt_buf.writeShort(this.Type);
		return pkt_buf;
	};



	// 0x247
	PACKET.CZ.MAIL_ADD_ITEM = function PACKET_CZ_MAIL_ADD_ITEM() {
		this.index = 0;
		this.count = 0;
	};
	PACKET.CZ.MAIL_ADD_ITEM.prototype.build = function() {
		var pkt_len = 2 + 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x247);
		pkt_buf.writeShort(this.index);
		pkt_buf.writeLong(this.count);
		return pkt_buf;
	};


	// 0x248
	PACKET.CZ.MAIL_SEND = function PACKET_CZ_MAIL_SEND() {
		this.ReceiveName = '';
		this.Header = '';
		this.msg_len = 0;
		this.msg = '';
	};
	PACKET.CZ.MAIL_SEND.prototype.build = function() {
		var pkt_len = 2 + 2 + 24 + 40 + 4 + this.msg.length;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x248);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeString(this.ReceiveName, 24);
		pkt_buf.writeString(this.Header, 40);
		pkt_buf.writeULong(this.msg_len);
		pkt_buf.writeString(this.msg);
		return pkt_buf;
	};


	// 0x24b
	PACKET.CZ.AUCTION_CREATE = function PACKET_CZ_AUCTION_CREATE() {
		this.Type = 0;
	};
	PACKET.CZ.AUCTION_CREATE.prototype.build = function() {
		var pkt_len = 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x24b);
		pkt_buf.writeShort(this.Type);
		return pkt_buf;
	};



	// 0x24c
	PACKET.CZ.AUCTION_ADD_ITEM = function PACKET_CZ_AUCTION_ADD_ITEM() {
		this.index = 0;
		this.count = 0;
	};
	PACKET.CZ.AUCTION_ADD_ITEM.prototype.build = function() {
		var pkt_len = 2 + 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x24c);
		pkt_buf.writeShort(this.index);
		pkt_buf.writeLong(this.count);
		return pkt_buf;
	};



	// 0x24d
	PACKET.CZ.AUCTION_ADD = function PACKET_CZ_AUCTION_ADD() {
		this.NowMoney = 0;
		this.MaxMoney = 0;
		this.DeleteHour = 0;
	};
	PACKET.CZ.AUCTION_ADD.prototype.build = function() {
		var pkt_len = 2 + 4 + 4 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x24d);
		pkt_buf.writeULong(this.NowMoney);
		pkt_buf.writeULong(this.MaxMoney);
		pkt_buf.writeShort(this.DeleteHour);
		return pkt_buf;
	};


	// 0x24e
	PACKET.CZ.AUCTION_ADD_CANCEL = function PACKET_CZ_AUCTION_ADD_CANCEL() {
		this.AuctionID = 0;
	};
	PACKET.CZ.AUCTION_ADD_CANCEL.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x24e);
		pkt_buf.writeULong(this.AuctionID);
		return pkt_buf;
	};


	// 0x24f
	PACKET.CZ.AUCTION_BUY = function PACKET_CZ_AUCTION_BUY() {
		this.AuctionID = 0;
		this.Money = 0;
	};
	PACKET.CZ.AUCTION_BUY.prototype.build = function() {
		var pkt_len = 2 + 4 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x24f);
		pkt_buf.writeULong(this.AuctionID);
		pkt_buf.writeULong(this.Money);
		return pkt_buf;
	};


	// 0x251
	PACKET.CZ.AUCTION_ITEM_SEARCH = function PACKET_CZ_AUCTION_ITEM_SEARCH() {
		this.Type = 0;
		this.AuctionID = 0;
		this.Name = '';
		this.Page = 0;
	};
	PACKET.CZ.AUCTION_ITEM_SEARCH.prototype.build = function() {
		var pkt_len = 2 + 2 + 4 + 24 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x251);
		pkt_buf.writeShort(this.Type);
		pkt_buf.writeULong(this.AuctionID);
		pkt_buf.writeString(this.Name, 24);
		pkt_buf.writeUShort(this.Page);
		return pkt_buf;
	};


	// 0x254
	PACKET.CZ.AGREE_STARPLACE = function PACKET_CZ_AGREE_STARPLACE() {
		this.which = 0;
	};
	PACKET.CZ.AGREE_STARPLACE.prototype.build = function() {
		var pkt_len = 2 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x254);
		pkt_buf.writeChar(this.which);
		return pkt_buf;
	};


	// 0x258
	PACKET.CA.REQ_GAME_GUARD_CHECK = function PACKET_CA_REQ_GAME_GUARD_CHECK() {};
	PACKET.CA.REQ_GAME_GUARD_CHECK.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x258);
		return pkt_buf;
	};


	// 0x25b
	PACKET.CZ.REQ_MAKINGITEM = function PACKET_CZ_REQ_MAKINGITEM() {
		this.mkType = 0;
		this.id = 0;
	};
	PACKET.CZ.REQ_MAKINGITEM.prototype.build = function() {
		var pkt_len = 2 + 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x25b);
		pkt_buf.writeShort(this.mkType);
		pkt_buf.writeUShort(this.id);
		return pkt_buf;
	};


	// 0x25c
	PACKET.CZ.AUCTION_REQ_MY_INFO = function PACKET_CZ_AUCTION_REQ_MY_INFO() {
		this.Type = 0;
	};
	PACKET.CZ.AUCTION_REQ_MY_INFO.prototype.build = function() {
		var pkt_len = 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x25c);
		pkt_buf.writeShort(this.Type);
		return pkt_buf;
	};



	// 0x25d
	PACKET.CZ.AUCTION_REQ_MY_SELL_STOP = function PACKET_CZ_AUCTION_REQ_MY_SELL_STOP() {
		this.AuctionID = 0;
	};
	PACKET.CZ.AUCTION_REQ_MY_SELL_STOP.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x25d);
		pkt_buf.writeULong(this.AuctionID);
		return pkt_buf;
	};


	// 0x264
	PACKET.CA.ACK_LOGIN_OLDEKEY = function PACKET_CA_ACK_LOGIN_OLDEKEY() {
		this.m_SeedValue = '';
		this.m_EKey = '';
	};
	PACKET.CA.ACK_LOGIN_OLDEKEY.prototype.build = function() {
		var pkt_len = 2 + 9 + 9;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x264);
		pkt_buf.writeBinaryString(this.m_SeedValue, 9);
		pkt_buf.writeBinaryString(this.m_EKey, 9);
		return pkt_buf;
	};


	// 0x265
	PACKET.CA.ACK_LOGIN_NEWEKEY = function PACKET_CA_ACK_LOGIN_NEWEKEY() {
		this.m_SeedValue = '';
		this.m_EKey = '';
	};
	PACKET.CA.ACK_LOGIN_NEWEKEY.prototype.build = function() {
		var pkt_len = 2 + 9 + 9;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x265);
		pkt_buf.writeBinaryString(this.m_SeedValue, 9);
		pkt_buf.writeBinaryString(this.m_EKey, 9);
		return pkt_buf;
	};



	// 0x266
	PACKET.CA.ACK_LOGIN_CARDPASS = function PACKET_CA_ACK_LOGIN_CARDPASS() {
		this.m_cardPass = '';
	};
	PACKET.CA.ACK_LOGIN_CARDPASS.prototype.build = function() {
		var pkt_len = 2 + 28;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x266);
		pkt_buf.writeString(this.m_cardPass, 28);
		return pkt_buf;
	};


	// 0x271
	PACKET.CA.ACK_LOGIN_ACCOUNT_INFO = function PACKET_CA_ACK_LOGIN_ACCOUNT_INFO() {
		this.sex = 0;
		this.bPoint = 0;
		this.E_mail = '';
	};
	PACKET.CA.ACK_LOGIN_ACCOUNT_INFO.prototype.build = function() {
		var pkt_len = 2 + 2 + 2 + 34;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x271);
		pkt_buf.writeShort(this.sex);
		pkt_buf.writeShort(this.bPoint);
		pkt_buf.writeString(this.E_mail, 34);
		return pkt_buf;
	};


	// 0x273
	PACKET.CZ.REQ_MAIL_RETURN = function PACKET_CZ_REQ_MAIL_RETURN() {
		this.MailID = 0;
		this.ReceiveName = '';
	};
	PACKET.CZ.REQ_MAIL_RETURN.prototype.build = function() {
		var pkt_len = 2 + 4 + 24;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x273);
		pkt_buf.writeLong(this.MailID);
		pkt_buf.writeString(this.ReceiveName, 24);
		return pkt_buf;
	};


	// 0x275
	PACKET.CH.ENTER2 = function PACKET_CH_ENTER2() {
		this.AID = 0;
		this.AuthCode = 0;
		this.userLevel = 0;
		this.clientType = 0;
		this.Sex = 0;
		this.macData = '';
		this.iAccountSID = 0;
	};
	PACKET.CH.ENTER2.prototype.build = function() {
		var pkt_len = 2 + 4 + 4 + 4 + 2 + 1 + 16 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x275);
		pkt_buf.writeULong(this.AID);
		pkt_buf.writeULong(this.AuthCode);
		pkt_buf.writeULong(this.userLevel);
		pkt_buf.writeUShort(this.clientType);
		pkt_buf.writeUChar(this.Sex);
		pkt_buf.writeBinaryString(this.macData, 16);
		pkt_buf.writeLong(this.iAccountSID);
		return pkt_buf;
	};


	// 0x277
	PACKET.CA.LOGIN_PCBANG = function PACKET_CA_LOGIN_PCBANG() {
		this.Version = 0;
		this.ID = '';
		this.Passwd = '';
		this.clienttype = 0;
		this.IP = '';
		this.MacAdress = '';
	};
	PACKET.CA.LOGIN_PCBANG.prototype.build = function() {
		var pkt_len = 2 + 4 + 24 + 24 + 1 + 16 + 13;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x277);
		pkt_buf.writeULong(this.Version);
		pkt_buf.writeString(this.ID, 24);
		pkt_buf.writeString(this.Passwd, 24);
		pkt_buf.writeUChar(this.clienttype);
		pkt_buf.writeBinaryString(this.IP, 16);
		pkt_buf.writeBinaryString(this.MacAdress, 13);
		return pkt_buf;
	};


	// 0x279
	PACKET.CZ.HUNTINGLIST = function PACKET_CZ_HUNTINGLIST() {};
	PACKET.CZ.HUNTINGLIST.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x279);
		return pkt_buf;
	};


	// 0x27c
	PACKET.CA.LOGIN4 = function PACKET_CA_LOGIN4() {
		this.Version = 0;
		this.ID = '';
		this.PasswdMD5 = '';
		this.clienttype = 0;
		this.macData = '';
	};
	PACKET.CA.LOGIN4.prototype.build = function() {
		var pkt_len = 2 + 4 + 24 + 16 + 1 + 13;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x27c);
		pkt_buf.writeULong(this.Version);
		pkt_buf.writeString(this.ID, 24);
		pkt_buf.writeString(this.PasswdMD5, 16);
		pkt_buf.writeUChar(this.clienttype);
		pkt_buf.writeBinaryString(this.macData, 13);
		return pkt_buf;
	};


	// 0x27f
	PACKET.CA.CLIENT_TYPE = function PACKET_CA_CLIENT_TYPE() {
		this.ClientType = 0;
		this.nVer = 0;
	};
	PACKET.CA.CLIENT_TYPE.prototype.build = function() {
		var pkt_len = 2 + 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x27f);
		pkt_buf.writeShort(this.ClientType);
		pkt_buf.writeLong(this.nVer);
		return pkt_buf;
	};


	// 0x281
	PACKET.CZ.GANGSI_RANK = function PACKET_CZ_GANGSI_RANK() {
		this.PacketSwitch = 0;
	};
	PACKET.CZ.GANGSI_RANK.prototype.build = function() {
		var pkt_len = 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x281);
		pkt_buf.writeShort(this.PacketSwitch);
		return pkt_buf;
	};


	// 0x286
	PACKET.CZ.DEATH_QUESTION = function PACKET_CZ_DEATH_QUESTION() {
		this.Qanswer = 0;
	};
	PACKET.CZ.DEATH_QUESTION.prototype.build = function() {
		var pkt_len = 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x286);
		pkt_buf.writeShort(this.Qanswer);
		return pkt_buf;
	};


	// 0x288
	PACKET.CZ.PC_BUY_CASH_POINT_ITEM = function PACKET_CZ_PC_BUY_CASH_POINT_ITEM() {
		this.list = [];
		this.kafrapts = 0;
	};
	PACKET.CZ.PC_BUY_CASH_POINT_ITEM.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);

		switch (ver[2]) {
			case 6:
				pkt.view.setUint16(ver[3], this.list[0].id, true);
				pkt.view.setInt16(ver[4], this.list[0].count, true);
				break;

			case 10:
				pkt.view.setUint16(ver[3], this.list[0].id, true);
				pkt.view.setInt16(ver[4], this.list[0].count, true);
				pkt.view.setInt32(ver[5], this.kafrapts, true);
				break;

			case -1:
				pkt.writeShort(2 + 2 + 4 + 2 + this.list.length * 4);
				pkt.view.setInt32(ver[3], this.kafrapts, true);
				pkt.view.setInt16(ver[4], this.list.length, true);
				var pos = ver[4] + 2;
				var i, count = this.list.length;

				for (i = 0; i < count; ++i) {
					pkt.view.setUint16(pos + 0, this.list[i].id, true);
					pkt.view.setInt16(pos + 2, this.list[i].count, true);
					pos += 4;
				}
				break;
		}

		return pkt;
	};


	// 0x28c
	PACKET.CH.SELECT_CHAR_GOINGTOBEUSED = function PACKET_CH_SELECT_CHAR_GOINGTOBEUSED() {
		this.dwAID = 0;
		this.nCountSelectedChar = 0;
		this.ardwSelectedGID = 0;
	};
	PACKET.CH.SELECT_CHAR_GOINGTOBEUSED.prototype.build = function() {
		var pkt_len = 2 + 4 + 4 + 36;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x28c);
		pkt_buf.writeULong(this.dwAID);
		pkt_buf.writeLong(this.nCountSelectedChar);
		pkt_buf.writeULong(this.ardwSelectedGID[0]);
		pkt_buf.writeULong(this.ardwSelectedGID[1]);
		pkt_buf.writeULong(this.ardwSelectedGID[2]);
		pkt_buf.writeULong(this.ardwSelectedGID[3]);
		return pkt_buf;
	};


	// 0x28d
	PACKET.CH.REQ_IS_VALID_CHARNAME = function PACKET_CH_REQ_IS_VALID_CHARNAME() {
		this.dwAID = 0;
		this.dwGID = 0;
		this.szCharName = '';
	};
	PACKET.CH.REQ_IS_VALID_CHARNAME.prototype.build = function() {
		var pkt_len = 2 + 4 + 4 + 24;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x28d);
		pkt_buf.writeULong(this.dwAID);
		pkt_buf.writeULong(this.dwGID);
		pkt_buf.writeString(this.szCharName, 24);
		return pkt_buf;
	};



	// 0x28f
	PACKET.CH.REQ_CHANGE_CHARNAME = function PACKET_CH_REQ_CHANGE_CHARNAME() {
		this.dwGID = 0;
	};
	PACKET.CH.REQ_CHANGE_CHARNAME.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x28f);
		pkt_buf.writeULong(this.dwGID);
		return pkt_buf;
	};


	// 0x292
	PACKET.CZ.STANDING_RESURRECTION = function PACKET_CZ_STANDING_RESURRECTION() {};
	PACKET.CZ.STANDING_RESURRECTION.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x292);
		return pkt_buf;
	};


	// 0x29f
	PACKET.CZ.MER_COMMAND = function PACKET_CZ_MER_COMMAND() {
		this.command = 0;
	};
	PACKET.CZ.MER_COMMAND.prototype.build = function() {
		var pkt_len = 2 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x29f);
		pkt_buf.writeChar(this.command);
		return pkt_buf;
	};


	// 0x2a0
	UNUSED_PACKET.CZ.MER_USE_SKILL = function UNUSED_PACKET_CZ_MER_USE_SKILL() {
		this.selectedLevel = 0;
		this.SKID = 0;
		this.targetID = 0;
	};
	UNUSED_PACKET.CZ.MER_USE_SKILL.prototype.build = function() {
		var pkt_len = 2 + 2 + 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x2a0);
		pkt_buf.writeShort(this.selectedLevel);
		pkt_buf.writeUShort(this.SKID);
		pkt_buf.writeULong(this.targetID);
		return pkt_buf;
	};



	// 0x2a1
	UNUSED_PACKET.CZ.MER_UPGRADE_SKILLLEVEL = function UNUSED_PACKET_CZ_MER_UPGRADE_SKILLLEVEL() {
		this.SKID = 0;
	};
	UNUSED_PACKET.CZ.MER_UPGRADE_SKILLLEVEL.prototype.build = function() {
		var pkt_len = 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x2a1);
		pkt_buf.writeUShort(this.SKID);
		return pkt_buf;
	};


	// 0x2a5
	PACKET.CZ.KSY_EVENT = function PACKET_CZ_KSY_EVENT() {
		this.index = 0;
		this.count = 0;
	};
	PACKET.CZ.KSY_EVENT.prototype.build = function() {
		var pkt_len = 2 + 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x2a5);
		pkt_buf.writeShort(this.index);
		pkt_buf.writeLong(this.count);
		return pkt_buf;
	};


	// 0x2ab
	PACKET.CZ.ACK_CASH_PASSWORD = function PACKET_CZ_ACK_CASH_PASSWORD() {
		this.Type = 0;
		this.Password = '';
		this.NewPassword = '';
	};
	PACKET.CZ.ACK_CASH_PASSWORD.prototype.build = function() {
		var pkt_len = 2 + 2 + 16 + 16;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x2ab);
		pkt_buf.writeShort(this.Type);
		pkt_buf.writeString(this.Password, 16);
		pkt_buf.writeString(this.NewPassword, 16);
		return pkt_buf;
	};


	// 0x2b0
	PACKET.CA.LOGIN_HAN = function PACKET_CA_LOGIN_HAN() {
		this.Version = 0;
		this.ID = '';
		this.Passwd = '';
		this.clienttype = 0;
		this.m_szIP = '';
		this.m_szMacAddr = '';
		this.isHanGameUser = 0;
	};
	PACKET.CA.LOGIN_HAN.prototype.build = function() {
		var pkt_len = 2 + 4 + 24 + 24 + 1 + 16 + 13 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x2b0);
		pkt_buf.writeULong(this.Version);
		pkt_buf.writeString(this.ID, 24);
		pkt_buf.writeBinaryString(this.Passwd, 24);
		pkt_buf.writeUChar(this.clienttype);
		pkt_buf.writeBinaryString(this.m_szIP, 16);
		pkt_buf.writeBinaryString(this.m_szMacAddr, 13);
		pkt_buf.writeUChar(this.isHanGameUser);
		return pkt_buf;
	};



	// 0x2b6
	PACKET.CZ.ACTIVE_QUEST = function PACKET_CZ_ACTIVE_QUEST() {
		this.questID = 0;
		this.active = 0;
	};
	PACKET.CZ.ACTIVE_QUEST.prototype.build = function() {
		var pkt_len = 2 + 4 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x2b6);
		pkt_buf.writeULong(this.questID);
		pkt_buf.writeUChar(this.active);
		return pkt_buf;
	};


	// 0x2ba
	PACKET.CZ.SHORTCUT_KEY_CHANGE = function PACKET_CZ_SHORTCUT_KEY_CHANGE() {
		this.Index = 0;
		this.ShortCutKey = {};
	};
	PACKET.CZ.SHORTCUT_KEY_CHANGE.prototype.build = function() {
		var pkt_len = 2 + 2 + 1 + 4 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x2ba);
		pkt_buf.writeUShort(this.Index);
		pkt_buf.writeChar(this.ShortCutKey.isSkill);
		pkt_buf.writeULong(this.ShortCutKey.ID);
		pkt_buf.writeShort(this.ShortCutKey.count);
		return pkt_buf;
	};


	// 0x2c0
	PACKET.CZ.SRPACKETR2_START = function PACKET_CZ_SRPACKETR2_START() {
		this.ProtectFactor = 0;
	};
	PACKET.CZ.SRPACKETR2_START.prototype.build = function() {
		var pkt_len = 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x2c0);
		pkt_buf.writeUShort(this.ProtectFactor);
		return pkt_buf;
	};


	// 0x2c4
	PACKET.CZ.PARTY_JOIN_REQ = function PACKET_CZ_PARTY_JOIN_REQ() {
		this.characterName = '';
	};
	PACKET.CZ.PARTY_JOIN_REQ.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.writeString(this.characterName, 24);
		return pkt;
	};


	// 0x2c7
	PACKET.CZ.PARTY_JOIN_REQ_ACK = function PACKET_CZ_PARTY_JOIN_REQ_ACK() {
		this.GRID = 0;
		this.bAccept = 0;
	};
	PACKET.CZ.PARTY_JOIN_REQ_ACK.prototype.build = function() {
		var pkt_len = 2 + 4 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x2c7);
		pkt_buf.writeULong(this.GRID);
		pkt_buf.writeUChar(this.bAccept);
		return pkt_buf;
	};



	// 0x2c8
	PACKET.CZ.PARTY_CONFIG = function PACKET_CZ_PARTY_CONFIG() {
		this.bRefuseJoinMsg = 0;
	};
	PACKET.CZ.PARTY_CONFIG.prototype.build = function() {
		var pkt_len = 2 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x2c8);
		pkt_buf.writeUChar(this.bRefuseJoinMsg);
		return pkt_buf;
	};


	// 0x2cf
	PACKET.CZ.MEMORIALDUNGEON_COMMAND = function PACKET_CZ_MEMORIALDUNGEON_COMMAND() {
		this.Command = 0;
	};
	PACKET.CZ.MEMORIALDUNGEON_COMMAND.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x2cf);
		pkt_buf.writeLong(this.Command);
		return pkt_buf;
	};


	// 0x2d6
	PACKET.CZ.EQUIPWIN_MICROSCOPE = function PACKET_CZ_EQUIPWIN_MICROSCOPE() {
		this.AID = 0;
	};
	PACKET.CZ.EQUIPWIN_MICROSCOPE.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x2d6);
		pkt_buf.writeULong(this.AID);
		return pkt_buf;
	};


	// 0x2d8
	PACKET.CZ.CONFIG = function PACKET_CZ_CONFIG() {
		this.Config = 0;
		this.Value = 0;
	};
	PACKET.CZ.CONFIG.prototype.build = function() {
		var pkt_len = 2 + 4 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x2d8);
		pkt_buf.writeLong(this.Config);
		pkt_buf.writeLong(this.Value);
		return pkt_buf;
	};


	// 0x2db
	PACKET.CZ.BATTLEFIELD_CHAT = function PACKET_CZ_BATTLEFIELD_CHAT() {
		this.msg = '';
	};
	PACKET.CZ.BATTLEFIELD_CHAT.prototype.build = function() {
		var pkt_len = 2 + 2 + this.msg.length;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x2db);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeString(this.msg);
		return pkt_buf;
	};


	// 0x2e6
	PACKET.CZ.BOT_CHECK = function PACKET_CZ_BOT_CHECK() {
		this.IsBot = 0;
	};
	PACKET.CZ.BOT_CHECK.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x2e6);
		pkt_buf.writeLong(this.IsBot);
		return pkt_buf;
	};


	// 0x2f1
	PACKET.CZ.PROGRESS = function PACKET_CZ_PROGRESS() {};
	PACKET.CZ.PROGRESS.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x2f1);
		return pkt_buf;
	};


	// 0x35c
	PACKET.CZ.OPEN_SIMPLE_CASHSHOP_ITEMLIST = function PACKET_CZ_OPEN_SIMPLE_CASHSHOP_ITEMLIST() {};
	PACKET.CZ.OPEN_SIMPLE_CASHSHOP_ITEMLIST.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x35c);
		return pkt_buf;
	};


	// 0x35e
	PACKET.CZ.CLOSE_WINDOW = function PACKET_CZ_CLOSE_WINDOW() {};
	PACKET.CZ.CLOSE_WINDOW.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x35e);
		return pkt_buf;
	};


	// 0x35f
	PACKET.CZ.REQUEST_MOVE2 = function PACKET_CZ_REQUEST_MOVE2() {
		this.dest = [0, 0];
	};
	PACKET.CZ.REQUEST_MOVE2.prototype.build = function() {
		var pkt_len = 2 + 3;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x35f);
		pkt_buf.writePos(this.dest);
		return pkt_buf;
	};



	// 0x436
	PACKET.CZ.ENTER2 = function PACKET_CZ_ENTER2() {
		this.AID = 0;
		this.GID = 0;
		this.AuthCode = 0;
		this.clientTime = 0;
		this.Sex = 0;
	};
	PACKET.CZ.ENTER2.prototype.build = function() {
		var pkt_len = 2 + 4 + 4 + 4 + 4 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x436);
		pkt_buf.writeULong(this.AID);
		pkt_buf.writeULong(this.GID);
		pkt_buf.writeULong(this.AuthCode);
		pkt_buf.writeULong(this.clientTime);
		pkt_buf.writeUChar(this.Sex);
		return pkt_buf;
	};


	// 0x437
	PACKET.CZ.REQUEST_ACT2 = function PACKET_CZ_REQUEST_ACT2() {
		this.targetGID = 0;
		this.action = 0;
	};
	PACKET.CZ.REQUEST_ACT2.prototype.build = function() {
		var pkt_len = 2 + 4 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x437);
		pkt_buf.writeULong(this.targetGID);
		pkt_buf.writeUChar(this.action);
		return pkt_buf;
	};


	// 0x438
	PACKET.CZ.USE_SKILL2 = function PACKET_CZ_USE_SKILL2() {
		this.selectedLevel = 0;
		this.SKID = 0;
		this.targetID = 0;
	};
	PACKET.CZ.USE_SKILL2.prototype.build = function() {
		var pkt_len = 2 + 2 + 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x438);
		pkt_buf.writeShort(this.selectedLevel);
		pkt_buf.writeUShort(this.SKID);
		pkt_buf.writeULong(this.targetID);
		return pkt_buf;
	};


	// 0x439
	PACKET.CZ.USE_ITEM2 = function PACKET_CZ_USE_ITEM2() {
		this.index = 0;
		this.AID = 0;
	};
	PACKET.CZ.USE_ITEM2.prototype.build = function() {
		var pkt_len = 2 + 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x439);
		pkt_buf.writeUShort(this.index);
		pkt_buf.writeULong(this.AID);
		return pkt_buf;
	};


	// 0x443
	PACKET.CZ.SKILL_SELECT_RESPONSE = function PACKET_CZ_SKILL_SELECT_RESPONSE() {
		this.why = 0;
		this.SKID = 0;
	};
	PACKET.CZ.SKILL_SELECT_RESPONSE.prototype.build = function() {
		var pkt_len = 2 + 4 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x443);
		pkt_buf.writeLong(this.why);
		pkt_buf.writeUShort(this.SKID);
		return pkt_buf;
	};


	// 0x445
	PACKET.CZ.SIMPLE_BUY_CASH_POINT_ITEM = function PACKET_CZ_SIMPLE_BUY_CASH_POINT_ITEM() {
		this.ITID = 0;
		this.count = 0;


	};
	PACKET.CZ.SIMPLE_BUY_CASH_POINT_ITEM.prototype.build = function() {
		var pkt_len = 2 + 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x445);
		pkt_buf.writeUShort(this.ITID);
		pkt_buf.writeShort(this.count);
		return pkt_buf;
	};


	// 0x447
	PACKET.CZ.BLOCKING_PLAY_CANCEL = function PACKET_CZ_BLOCKING_PLAY_CANCEL() {};
	PACKET.CZ.BLOCKING_PLAY_CANCEL.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x447);
		return pkt_buf;
	};


	// 0x44a
	PACKET.CZ.CLIENT_VERSION = function PACKET_CZ_CLIENT_VERSION() {
		this.clientVer = 0;
	};
	PACKET.CZ.CLIENT_VERSION.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x44a);
		pkt_buf.writeLong(this.clientVer);
		return pkt_buf;
	};


	// 0x44b
	PACKET.CZ.CLOSE_SIMPLECASH_SHOP = function PACKET_CZ_CLOSE_SIMPLECASH_SHOP() {};
	PACKET.CZ.CLOSE_SIMPLECASH_SHOP.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x44b);
		return pkt_buf;
	};


	// 0x7d1
	PACKET.CZ.ES_GET_LIST = function PACKET_CZ_ES_GET_LIST() {};
	PACKET.CZ.ES_GET_LIST.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x7d1);
		return pkt_buf;
	};


	// 0x7d3
	PACKET.CZ.ES_CHOOSE = function PACKET_CZ_ES_CHOOSE() {
		this.esNo = 0;
	};
	PACKET.CZ.ES_CHOOSE.prototype.build = function() {
		var pkt_len = 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x7d3);
		pkt_buf.writeShort(this.esNo);
		return pkt_buf;
	};


	// 0x7d4
	PACKET.CZ.ES_CANCEL = function PACKET_CZ_ES_CANCEL() {
		this.esNo = 0;
	};
	PACKET.CZ.ES_CANCEL.prototype.build = function() {
		var pkt_len = 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x7d4);
		pkt_buf.writeShort(this.esNo);
		return pkt_buf;
	};


	// 0x7d7
	PACKET.CZ.GROUPINFO_CHANGE_V2 = function PACKET_CZ_GROUPINFO_CHANGE_V2() {
		this.expOption = 0;
		this.ItemPickupRule = 0;
		this.ItemDivisionRule = 0;
	};
	PACKET.CZ.GROUPINFO_CHANGE_V2.prototype.build = function() {
		var pkt_len = 2 + 4 + 1 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x7d7);
		pkt_buf.writeULong(this.expOption);
		pkt_buf.writeUChar(this.ItemPickupRule);
		pkt_buf.writeUChar(this.ItemDivisionRule);
		return pkt_buf;
	};


	// 0x7da
	PACKET.CZ.CHANGE_GROUP_MASTER = function PACKET_CZ_CHANGE_GROUP_MASTER() {
		this.AID = 0;
	};
	PACKET.CZ.CHANGE_GROUP_MASTER.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x7da);
		pkt_buf.writeULong(this.AID);
		return pkt_buf;
	};


	// 0x7dc
	PACKET.CZ.SEEK_PARTY = function PACKET_CZ_SEEK_PARTY() {
		this.Option = 0;
	};
	PACKET.CZ.SEEK_PARTY.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x7dc);
		pkt_buf.writeULong(this.Option);
		return pkt_buf;
	};


	// 0x7de
	PACKET.CZ.SEEK_PARTY_MEMBER = function PACKET_CZ_SEEK_PARTY_MEMBER() {
		this.Job = 0;
		this.Level = 0;
		this.mapName = '';
		this.Option = 0;
	};
	PACKET.CZ.SEEK_PARTY_MEMBER.prototype.build = function() {
		var pkt_len = 2 + 4 + 4 + 16 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x7de);
		pkt_buf.writeULong(this.Job);
		pkt_buf.writeULong(this.Level);
		pkt_buf.writeString(this.mapName, 16);
		pkt_buf.writeULong(this.Option);
		return pkt_buf;
	};


	// 0x7e4
	PACKET.CZ.ITEMLISTWIN_RES = function PACKET_CZ_ITEMLISTWIN_RES() {
		this.Type = 0;
		this.Action = 0;
		this.MaterialList = [];
	};
	PACKET.CZ.ITEMLISTWIN_RES.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.writeShort(2 + 2 + 4 + 4 + 4 * this.MaterialList.length);
		pkt.view.setInt32(ver[3], this.Type, true);
		pkt.view.setInt32(ver[4], this.Action, true);
		var pos = ver[5];
		var i, count = this.MaterialList.length;

		for (i = 0; i < count; ++i) {
			pkt.view.setUint16(pos + 0, this.MaterialList[i].id, true);
			pkt.view.setUint16(pos + 2, this.MaterialList[i].count, true);
			pos += 4;
		}

		return pkt;
	};



	// 0x7e5
	PACKET.CH.ENTER_CHECKBOT = function PACKET_CH_ENTER_CHECKBOT() {
		this.dwAID = 0;
		this.szStringInfo = '';
	};
	PACKET.CH.ENTER_CHECKBOT.prototype.build = function() {
		var pkt_len = 2 + 2 + 4 + this.szStringInfo.length;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x7e5);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeULong(this.dwAID);
		pkt_buf.writeString(this.szStringInfo);
		return pkt_buf;
	};


	// 0x7e7
	PACKET.CH.CHECKBOT = function PACKET_CH_CHECKBOT() {
		this.dwAID = 0;
		this.szStringInfo = '';
	};
	PACKET.CH.CHECKBOT.prototype.build = function() {
		var pkt_len = 2 + 2 + 4 + 24;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x7e7);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeULong(this.dwAID);
		pkt_buf.writeString(this.szStringInfo, 24);
		return pkt_buf;
	};


	// 0x7ea
	PACKET.CZ.BATTLE_FIELD_LIST = function PACKET_CZ_BATTLE_FIELD_LIST() {};
	PACKET.CZ.BATTLE_FIELD_LIST.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x7ea);
		return pkt_buf;
	};


	// 0x7ec
	PACKET.CZ.JOIN_BATTLE_FIELD = function PACKET_CZ_JOIN_BATTLE_FIELD() {
		this.BFNO = 0;
		this.JoinTeam = 0;
	};
	PACKET.CZ.JOIN_BATTLE_FIELD.prototype.build = function() {
		var pkt_len = 2 + 4 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x7ec);
		pkt_buf.writeULong(this.BFNO);
		pkt_buf.writeShort(this.JoinTeam);
		return pkt_buf;
	};


	// 0x7ee
	PACKET.CZ.CANCEL_BATTLE_FIELD = function PACKET_CZ_CANCEL_BATTLE_FIELD() {
		this.BFNO = 0;
	};
	PACKET.CZ.CANCEL_BATTLE_FIELD.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x7ee);
		pkt_buf.writeULong(this.BFNO);
		return pkt_buf;
	};


	// 0x7f0
	PACKET.CZ.REQ_BATTLE_STATE_MONITOR = function PACKET_CZ_REQ_BATTLE_STATE_MONITOR() {
		this.BFNO = 0;
		this.PowerSwitch = 0;
	};
	PACKET.CZ.REQ_BATTLE_STATE_MONITOR.prototype.build = function() {
		var pkt_len = 2 + 4 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x7f0);
		pkt_buf.writeULong(this.BFNO);
		pkt_buf.writeShort(this.PowerSwitch);
		return pkt_buf;
	};


	// 0x7f5
	PACKET.CZ.GM_FULLSTRIP = function PACKET_CZ_GM_FULLSTRIP() {
		this.TargetAID = 0;
	};
	PACKET.CZ.GM_FULLSTRIP.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x7f5);
		pkt_buf.writeULong(this.TargetAID);
		return pkt_buf;
	};


	// 0x801
	PACKET.CZ.PC_PURCHASE_ITEMLIST_FROMMC2 = function PACKET_CZ_PC_PURCHASE_ITEMLIST_FROMMC2() {
		this.AID = 0;
		this.UniqueID = 0;
		this.itemList = [];
	};
	PACKET.CZ.PC_PURCHASE_ITEMLIST_FROMMC2.prototype.build = function() {
		var pkt_len = 2 + 2 + 4 + 4 + this.itemList.length * 4;
		var pkt_buf = new BinaryWriter(pkt_len);
		var i, count;

		pkt_buf.writeShort(0x801);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeULong(this.AID);
		pkt_buf.writeULong(this.UniqueID);

		for (i = 0, count = this.itemList.length; i < count; ++i) {
			pkt_buf.writeShort(this.itemList[i].count);
			pkt_buf.writeShort(this.itemList[i].index);
		}
		return pkt_buf;
	};


	// 0x802
	PACKET.CZ.PARTY_BOOKING_REQ_REGISTER = function PACKET_CZ_PARTY_BOOKING_REQ_REGISTER() {
		this.RegisterInfo = {};
	};
	PACKET.CZ.PARTY_BOOKING_REQ_REGISTER.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);

		if (ver[2] === 18) {
			pkt.writeShort(this.RegisterInfo.Level);
			pkt.writeShort(this.RegisterInfo.MapID);

			for (var i = 0; i < 6; ++i) {
				pkt.writeShort(this.RegisterInfo.Job[i]);
			}
		} else {
			pkt.writeShort(this.RegisterInfo.Level);
			pkt.writeString(this.RegisterInfo.Notice, 37);
		}
		return pkt;
	};


	// 0x804
	PACKET.CZ.PARTY_BOOKING_REQ_SEARCH = function PACKET_CZ_PARTY_BOOKING_REQ_SEARCH() {
		this.Level = 0;
		this.MapID = 0;
		this.Job = 0;
		this.LastIndex = 0;
		this.ResultCount = 0;
	};
	PACKET.CZ.PARTY_BOOKING_REQ_SEARCH.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.writeShort(this.Level);
		pkt.writeShort(this.MapID);

		if (ver[2] > 12) {
			pkt.writeShort(this.Job);
		}

		pkt.writeULong(this.LastIndex);
		pkt.writeShort(this.ResultCount);
		return pkt;
	};


	// 0x806
	PACKET.CZ.PARTY_BOOKING_REQ_DELETE = function PACKET_CZ_PARTY_BOOKING_REQ_DELETE() {};
	PACKET.CZ.PARTY_BOOKING_REQ_DELETE.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		return pkt;
	};



	// 0x808
	PACKET.CZ.PARTY_BOOKING_REQ_UPDATE = function PACKET_CZ_PARTY_BOOKING_REQ_UPDATE() {
		this.Job = 0;
	};
	PACKET.CZ.PARTY_BOOKING_REQ_UPDATE.prototype.build = function() {
		var pkt_len = 2 + 12;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x808);
		pkt_buf.writeShort(this.Job[0]);
		pkt_buf.writeShort(this.Job[1]);
		return pkt_buf;
	};


	// 0x80c
	PACKET.CZ.SIMPLE_CASH_BTNSHOW = function PACKET_CZ_SIMPLE_CASH_BTNSHOW() {};
	PACKET.CZ.SIMPLE_CASH_BTNSHOW.prototype.build = function() {
		var pkt_len = 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x80c);
		return pkt_buf;
	};


	// 0x811
	PACKET.CZ.REQ_OPEN_BUYING_STORE = function PACKET_CZ_REQ_OPEN_BUYING_STORE() {
		this.LimitZeny = 0;
		this.result = 0;
		this.storeName = '';
		this.ItemList = [];
	};
	PACKET.CZ.REQ_OPEN_BUYING_STORE.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);
		var i, count;

		pkt.writeShort(ver[1]);
		pkt.writeShort(ver[2]);
		pkt.writeULong(this.LimitZeny);
		pkt.writeUChar(this.result);
		pkt.writeString(this.storeName, 80);

		for (i = 0, count = this.ItemList.length; i < count; ++i) {
			pkt.writeUShort(this.ItemList[i].id);
			pkt.writeShort(this.ItemList[i].count);
			pkt.writeLong(this.ItemList[i].price);
		}

		return pkt;
	};


	// 0x815
	PACKET.CZ.REQ_CLOSE_BUYING_STORE = function PACKET_CZ_REQ_CLOSE_BUYING_STORE() {};
	PACKET.CZ.REQ_CLOSE_BUYING_STORE.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		return pkt;
	};


	// 0x817
	PACKET.CZ.REQ_CLICK_TO_BUYING_STORE = function PACKET_CZ_REQ_CLICK_TO_BUYING_STORE() {
		this.makerAID = 0;
	};
	PACKET.CZ.REQ_CLICK_TO_BUYING_STORE.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setUint32(ver[3], this.makerAID, true);
		return pkt;
	};



	// 0x819
	PACKET.CZ.REQ_TRADE_BUYING_STORE = function PACKET_CZ_REQ_TRADE_BUYING_STORE() {
		this.makerAID = 0;
		this.StoreID = 0;
		this.ItemList = [];
	};
	PACKET.CZ.REQ_TRADE_BUYING_STORE.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);
		var i, count;

		pkt.writeShort(ver[1]);
		pkt.writeShort(2 + 2 + 4 + 4 + this.ItemList.length * 6);
		pkt.writeULong(this.makerAID);
		pkt.writeULong(this.StoreID);

		for (i = 0, count = this.ItemList.length; i < count; ++i) {
			pkt.writeUShort(this.ItemList[i].index);
			pkt.writeUShort(this.ItemList[i].id);
			pkt.writeShort(this.ItemList[i].count);
		}

		return pkt;
	};


	// 0x822
	PACKET.CA.OTP_AUTH_REQ = function PACKET_CA_OTP_AUTH_REQ() {
		this.OTPCode = '';
	};
	PACKET.CA.OTP_AUTH_REQ.prototype.build = function() {
		var pkt_len = 2 + 7;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x822);
		pkt_buf.writeString(this.OTPCode, 7);
		return pkt_buf;
	};


	// 0x825a
	PACKET.CA.SSO_LOGIN_REQa = function PACKET_CA_SSO_LOGIN_REQa() {
		this.Version = 0;
		this.clienttype = 0;
		this.ID = '';
		this.MacAddr = '';
		this.IpAddr = '';
		this.t1 = '';
	};
	PACKET.CA.SSO_LOGIN_REQa.prototype.build = function() {
		var pkt_len = 2 + 2 + 4 + 1 + 24 + 17 + 15 + this.t1.length;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x825a);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeULong(this.Version);
		pkt_buf.writeUChar(this.clienttype);
		pkt_buf.writeString(this.ID, 24);
		pkt_buf.writeBinaryString(this.MacAddr, 17);
		pkt_buf.writeBinaryString(this.IpAddr, 15);
		pkt_buf.writeBinaryString(this.t1);
		return pkt_buf;
	};


	// 0x825
	PACKET.CA.SSO_LOGIN_REQ = function PACKET_CA_SSO_LOGIN_REQ() {
		this.Version = 0;
		this.clienttype = 0;
		this.ID = '';
		this.Passwd = '';
		this.MacAdress = '';
		this.IP = '';
		this.t1 = '';
	};
	PACKET.CA.SSO_LOGIN_REQ.prototype.build = function() {
		var pkt_len = 2 + 2 + 4 + 1 + 24 + 27 + 17 + 15 + this.t1.length;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x825);
		pkt_buf.writeShort(pkt_len);
		pkt_buf.writeULong(this.Version);
		pkt_buf.writeUChar(this.clienttype);
		pkt_buf.writeString(this.ID, 24);
		pkt_buf.writeString(this.Passwd, 27);
		pkt_buf.writeBinaryString(this.MacAdress, 17);
		pkt_buf.writeBinaryString(this.IP, 15);
		pkt_buf.writeBinaryString(this.t1);
		return pkt_buf;
	};


	// 0x827
	PACKET.CH.DELETE_CHAR3_RESERVED = function PACKET_CH_DELETE_CHAR3_RESERVED() {
		this.GID = 0;
	};
	PACKET.CH.DELETE_CHAR3_RESERVED.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x827);
		pkt_buf.writeULong(this.GID);
		return pkt_buf;
	};


	// 0x829
	PACKET.CH.DELETE_CHAR3 = function PACKET_CH_DELETE_CHAR3() {
		this.GID = 0;
		this.Birth = '';
	};
	PACKET.CH.DELETE_CHAR3.prototype.build = function() {
		var pkt_len = 2 + 4 + 6;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x829);
		pkt_buf.writeULong(this.GID);
		pkt_buf.writeString(this.Birth, 6);
		return pkt_buf;
	};


	// 0x82b
	PACKET.CH.DELETE_CHAR3_CANCEL = function PACKET_CH_DELETE_CHAR3_CANCEL() {
		this.GID = 0;
	};
	PACKET.CH.DELETE_CHAR3_CANCEL.prototype.build = function() {
		var pkt_len = 2 + 4;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x82b);
		pkt_buf.writeULong(this.GID);
		return pkt_buf;
	};


	// 0x835
	/// 0835 <packet len>.W <type>.B <max price>.L <min price>.L <name id count>.B <card count>.B { <name id>.W }* { <card>.W }*
	PACKET.CZ.SEARCH_STORE_INFO = function PACKET_CZ_SEARCH_STORE_INFO() {
		this.StoreType = 0;
		this.maxPrice = 0;
		this.minPrice = 0;
		this.ItemIDList = 0;
		this.CardIDList = 0;
	};
	PACKET.CZ.SEARCH_STORE_INFO.prototype.build = function() {
		var i, count, offset;
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setInt16(ver[3], 2 + 2 + 1 + 4 + 4 + 1 + 1 + this.ItemIDList.length * 2 + this.CardIDList.length * 2, true);
		pkt.view.setUint8(ver[4], this.StoreType, true);
		pkt.view.setUint32(ver[5], this.maxPrice, true);
		pkt.view.setUint32(ver[6], this.minPrice, true);
		pkt.view.setUint8(ver[7], this.ItemIDList.length, true);
		pkt.view.setUint8(ver[8], this.CardIDList.length, true);

		offset = ver[9];

		for (i = 0, count = this.ItemIDList.length; i < count; ++i) {
			pkt.view.setUint16(offset, this.ItemIDList[i], true);
			offset += 2;
		}

		for (i = 0, count = this.CardIDList.length; i < count; ++i) {
			pkt.view.setUint16(offset, this.CardIDList[i], true);
			offset += 2;
		}

		return pkt;
	};


	// 0x838
	PACKET.CZ.SEARCH_STORE_INFO_NEXT_PAGE = function PACKET_CZ_SEARCH_STORE_INFO_NEXT_PAGE() {


	};
	PACKET.CZ.SEARCH_STORE_INFO_NEXT_PAGE.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		return pkt;
	};


	// 0x83b
	PACKET.CZ.CLOSE_SEARCH_STORE_INFO = function PACKET_CZ_CLOSE_SEARCH_STORE_INFO() {


	};
	PACKET.CZ.CLOSE_SEARCH_STORE_INFO.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		return pkt;
	};


	// 0x83c
	PACKET.CZ.SSILIST_ITEM_CLICK = function PACKET_CZ_SSILIST_ITEM_CLICK() {
		this.AID = 0;
		this.SSI_ID = 0;
		this.ITID = 0;


	};
	PACKET.CZ.SSILIST_ITEM_CLICK.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setUint32(ver[3], this.AID, true);
		pkt.view.setULong(ver[4], this.SSI_ID, true);
		pkt.view.setUShort(ver[5], this.ITID, true);

		return pkt;
	};


	// 0x841
	PACKET.CH.SELECT_ACCESSIBLE_MAPNAME = function PACKET_CH_SELECT_ACCESSIBLE_MAPNAME() {
		this.CharNum = 0;
		this.mapListNum = 0;


	};
	PACKET.CH.SELECT_ACCESSIBLE_MAPNAME.prototype.build = function() {
		var pkt_len = 2 + 1 + 1;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x841);
		pkt_buf.writeUChar(this.CharNum);
		pkt_buf.writeUChar(this.mapListNum);
		return pkt_buf;
	};

	// 0x843
	PACKET.CZ.REMOVE_AID_SSO = function PACKET_CZ_REMOVE_AID_SSO() {
		this.AID = '';


	};
	PACKET.CZ.REMOVE_AID_SSO.prototype.build = function() {
		var ver = this.getPacketVersion();
		var pkt = new BinaryWriter(ver[2]);

		pkt.writeShort(ver[1]);
		pkt.view.setUint32(ver[3], this.AID, true);
	};

	// 0x970
	PACKET.CH.MAKE_CHAR2 = function PACKET_CH_MAKE_CHAR2() {
		this.name = '';
		this.CharNum = 0;
		this.headPal = 0;
		this.head = 0;


	};
	PACKET.CH.MAKE_CHAR2.prototype.build = function() {
		var pkt_len = 2 + 24 + 1 + 2 + 2;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x970);
		pkt_buf.writeString(this.name, 24);
		pkt_buf.writeUChar(this.CharNum);
		pkt_buf.writeShort(this.headPal);
		pkt_buf.writeShort(this.head);
		return pkt_buf;
	};


	// 0x69
	PACKET.AC.ACCEPT_LOGIN = function PACKET_AC_ACCEPT_LOGIN(fp, end) {
		this.AuthCode = fp.readLong();
		this.AID = fp.readULong();
		this.userLevel = fp.readULong();
		this.lastLoginIP = fp.readULong();
		this.lastLoginTime = fp.readBinaryString(26);
		this.Sex = fp.readUChar();
		this.ServerList = (function() {
			var i, count=(end-fp.tell())/32|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].ip = fp.readULong();
				out[i].port = fp.readUShort();
				out[i].name = fp.readString(20);
				out[i].usercount = fp.readUShort();
				out[i].state = fp.readUShort();
				out[i].property = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.AC.ACCEPT_LOGIN.size = -1;


	// 0x6a
	PACKET.AC.REFUSE_LOGIN = function PACKET_AC_REFUSE_LOGIN(fp, end) {
		this.ErrorCode = fp.readUChar();
		this.blockDate = fp.readBinaryString(20);
	};
	PACKET.AC.REFUSE_LOGIN.size = 23;


	// 0x6b
	PACKET.HC.ACCEPT_ENTER_NEO_UNION = function PACKET_HC_ACCEPT_ENTER_NEO_UNION(fp, end) {
		if (PACKETVER.value >= 20100413) {
			this.TotalSlotNum = fp.readUChar();
			this.PremiumStartSlot = fp.readUChar();
			this.PremiumEndSlot = fp.readUChar();
		}
		this.dummy1_beginbilling = fp.readChar();
		this.code = fp.readULong();
		this.time1 = fp.readULong();
		this.time2 = fp.readULong();
		this.dummy2_endbilling = fp.readBinaryString(7);
		this.charInfo = PACKETVER.parseCharInfo(fp, end);
	};
	PACKET.HC.ACCEPT_ENTER_NEO_UNION.size = -1;


	// 0x6c
	PACKET.HC.REFUSE_ENTER = function PACKET_HC_REFUSE_ENTER(fp, end) {
		this.ErrorCode = fp.readUChar();
	};
	PACKET.HC.REFUSE_ENTER.size = 3;


	// 0x6d
	PACKET.HC.ACCEPT_MAKECHAR_NEO_UNION = function PACKET_HC_ACCEPT_MAKECHAR_NEO_UNION(fp, end) {
		this.charinfo = PACKETVER.parseCharInfo(fp, end)[0];
	};
	PACKET.HC.ACCEPT_MAKECHAR_NEO_UNION.size = 0;


	// 0x6e
	PACKET.HC.REFUSE_MAKECHAR = function PACKET_HC_REFUSE_MAKECHAR(fp, end) {
		this.ErrorCode = fp.readUChar();
	};
	PACKET.HC.REFUSE_MAKECHAR.size = 3;


	// 0x6f
	PACKET.HC.ACCEPT_DELETECHAR = function PACKET_HC_ACCEPT_DELETECHAR(fp, end) {};
	PACKET.HC.ACCEPT_DELETECHAR.size = 2;


	// 0x70
	PACKET.HC.REFUSE_DELETECHAR = function PACKET_HC_REFUSE_DELETECHAR(fp, end) {
		this.ErrorCode = fp.readUChar();
	};
	PACKET.HC.REFUSE_DELETECHAR.size = 3;


	// 0x71
	PACKET.HC.NOTIFY_ZONESVR = function PACKET_HC_NOTIFY_ZONESVR(fp, end) {
		this.GID = fp.readULong();
		this.mapName = fp.readBinaryString(16);
		this.addr = {};
		this.addr.ip = fp.readULong();
		this.addr.port = fp.readUShort();
	};
	PACKET.HC.NOTIFY_ZONESVR.size = 28;


	// 0x73
	PACKET.ZC.ACCEPT_ENTER = function PACKET_ZC_ACCEPT_ENTER(fp, end) {
		this.startTime = fp.readULong();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
	};
	PACKET.ZC.ACCEPT_ENTER.size = 11;


	// 0x74
	PACKET.ZC.REFUSE_ENTER = function PACKET_ZC_REFUSE_ENTER(fp, end) {
		this.ErrorCode = fp.readUChar();
	};
	PACKET.ZC.REFUSE_ENTER.size = 3;


	// 0x75
	PACKET.ZC.NOTIFY_INITCHAR = function PACKET_ZC_NOTIFY_INITCHAR(fp, end) {
		this.GID = fp.readULong();
		this.Style = fp.readShort();
		this.Item = fp.readUChar();
	};
	PACKET.ZC.NOTIFY_INITCHAR.size = 11;


	// 0x76
	PACKET.ZC.NOTIFY_UPDATECHAR = function PACKET_ZC_NOTIFY_UPDATECHAR(fp, end) {
		this.GID = fp.readULong();
		this.Style = fp.readShort();
		this.Item = fp.readUChar();
	};
	PACKET.ZC.NOTIFY_UPDATECHAR.size = 9;


	// 0x77
	PACKET.ZC.NOTIFY_UPDATEPLAYER = function PACKET_ZC_NOTIFY_UPDATEPLAYER(fp, end) {
		this.Style = fp.readShort();
		this.Item = fp.readUChar();
	};
	PACKET.ZC.NOTIFY_UPDATEPLAYER.size = 5;


	// 0x78
	PACKET.ZC.NOTIFY_STANDENTRY = function PACKET_ZC_NOTIFY_STANDENTRY(fp, end) {
		this.objecttype = fp.readUChar();
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readShort();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readShort();
		this.accessory = fp.readShort();
		this.shield = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readShort();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.state = fp.readUChar();
		this.clevel = fp.readShort();
	};
	PACKET.ZC.NOTIFY_STANDENTRY.size = 55;


	// 0x79
	PACKET.ZC.NOTIFY_NEWENTRY = function PACKET_ZC_NOTIFY_NEWENTRY(fp, end) {
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readShort();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readShort();
		this.accessory = fp.readShort();
		this.shield = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readShort();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.clevel = fp.readShort();
	};
	PACKET.ZC.NOTIFY_NEWENTRY.size = 53;


	// 0x7a
	PACKET.ZC.NOTIFY_ACTENTRY = function PACKET_ZC_NOTIFY_ACTENTRY(fp, end) {
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readShort();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readShort();
		this.accessory = fp.readShort();
		this.shield = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readShort();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.action = fp.readUChar();
		this.actStartTime = fp.readULong();
		this.clevel = fp.readShort();
	};
	PACKET.ZC.NOTIFY_ACTENTRY.size = 58;


	// 0x7b
	PACKET.ZC.NOTIFY_MOVEENTRY = function PACKET_ZC_NOTIFY_MOVEENTRY(fp, end) {
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readShort();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readShort();
		this.accessory = fp.readShort();
		this.moveStartTime = fp.readULong();
		this.shield = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readShort();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.MoveData = fp.readPos2();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.clevel = fp.readShort();
	};
	PACKET.ZC.NOTIFY_MOVEENTRY.size = 60;


	// 0x7c
	PACKET.ZC.NOTIFY_STANDENTRY_NPC = function PACKET_ZC_NOTIFY_STANDENTRY_NPC(fp, end) {
		this.objecttype = fp.readUChar();
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readShort();
		this.accessory = fp.readShort();
		this.job = fp.readShort();
		this.shield = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
	};
	PACKET.ZC.NOTIFY_STANDENTRY_NPC.size = 42;


	// 0x7f
	PACKET.ZC.NOTIFY_TIME = function PACKET_ZC_NOTIFY_TIME(fp, end) {
		this.time = fp.readULong();
	};
	PACKET.ZC.NOTIFY_TIME.size = 6;


	// 0x80
	PACKET.ZC.NOTIFY_VANISH = function PACKET_ZC_NOTIFY_VANISH(fp, end) {
		this.GID = fp.readULong();
		this.type = fp.readUChar();
	};
	PACKET.ZC.NOTIFY_VANISH.size = 7;


	// 0x81
	PACKET.SC.NOTIFY_BAN = function PACKET_SC_NOTIFY_BAN(fp, end) {
		this.ErrorCode = fp.readUChar();
	};
	PACKET.SC.NOTIFY_BAN.size = 3;


	// 0x83
	PACKET.ZC.ACCEPT_QUIT = function PACKET_ZC_ACCEPT_QUIT(fp, end) {};
	PACKET.ZC.ACCEPT_QUIT.size = 2;


	// 0x84
	PACKET.ZC.REFUSE_QUIT = function PACKET_ZC_REFUSE_QUIT(fp, end) {};
	PACKET.ZC.REFUSE_QUIT.size = 2;


	// 0x86
	PACKET.ZC.NOTIFY_MOVE = function PACKET_ZC_NOTIFY_MOVE(fp, end) {
		this.GID = fp.readULong();
		this.MoveData = fp.readPos2();
		this.moveStartTime = fp.readULong();
	};
	PACKET.ZC.NOTIFY_MOVE.size = 16;


	// 0x87
	PACKET.ZC.NOTIFY_PLAYERMOVE = function PACKET_ZC_NOTIFY_PLAYERMOVE(fp, end) {
		this.moveStartTime = fp.readULong();
		this.MoveData = fp.readPos2();
	};
	PACKET.ZC.NOTIFY_PLAYERMOVE.size = 12;


	// 0x88
	PACKET.ZC.STOPMOVE = function PACKET_ZC_STOPMOVE(fp, end) {
		this.AID = fp.readULong();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
	};
	PACKET.ZC.STOPMOVE.size = 10;


	// 0x8a
	PACKET.ZC.NOTIFY_ACT = function PACKET_ZC_NOTIFY_ACT(fp, end) {
		this.GID = fp.readULong();
		this.targetGID = fp.readULong();
		this.startTime = fp.readULong();
		this.attackMT = fp.readLong();
		this.attackedMT = fp.readLong();
		this.damage = fp.readShort();
		this.count = fp.readShort();
		this.action = fp.readUChar();
		this.leftDamage = fp.readShort();
	};
	PACKET.ZC.NOTIFY_ACT.size = 29;


	// 0x8b
	PACKET.ZC.NOTIFY_ACT_POSITION = function PACKET_ZC_NOTIFY_ACT_POSITION(fp, end) {
		this.GID = fp.readULong();
		this.targetGID = fp.readULong();
		this.startTime = fp.readULong();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
		this.damage = fp.readShort();
		this.count = fp.readShort();
		this.action = fp.readUChar();
	};
	PACKET.ZC.NOTIFY_ACT_POSITION.size = 23;


	// 0x8d
	PACKET.ZC.NOTIFY_CHAT = function PACKET_ZC_NOTIFY_CHAT(fp, end) {
		this.GID = fp.readULong();
		this.msg = fp.readString(end - fp.tell());
	};
	PACKET.ZC.NOTIFY_CHAT.size = -1;


	// 0x8e
	PACKET.ZC.NOTIFY_PLAYERCHAT = function PACKET_ZC_NOTIFY_PLAYERCHAT(fp, end) {
		this.msg = fp.readString(end - fp.tell());
	};
	PACKET.ZC.NOTIFY_PLAYERCHAT.size = -1;


	// 0x8f
	PACKET.ZC.ENTRY_ACK = function PACKET_ZC_ENTRY_ACK(fp, end) {
		this.Header = fp.readShort();
		this.AID = fp.readLong();
	};
	PACKET.ZC.ENTRY_ACK.size = 6;


	// 0x91
	PACKET.ZC.NPCACK_MAPMOVE = function PACKET_ZC_NPCACK_MAPMOVE(fp, end) {
		this.mapName = fp.readBinaryString(16);
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
	};
	PACKET.ZC.NPCACK_MAPMOVE.size = 22;


	// 0x92
	PACKET.ZC.NPCACK_SERVERMOVE = function PACKET_ZC_NPCACK_SERVERMOVE(fp, end) {
		this.mapName = fp.readBinaryString(16);
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
		this.addr = {};
		this.addr.ip = fp.readULong();
		this.addr.port = fp.readUShort();
	};
	PACKET.ZC.NPCACK_SERVERMOVE.size = 28;


	// 0x93
	PACKET.ZC.NPCACK_ENABLE = function PACKET_ZC_NPCACK_ENABLE(fp, end) {};
	PACKET.ZC.NPCACK_ENABLE.size = 2;


	// 0x95
	PACKET.ZC.ACK_REQNAME = function PACKET_ZC_ACK_REQNAME(fp, end) {
		this.AID = fp.readULong();
		this.CName = fp.readString(24);
	};
	PACKET.ZC.ACK_REQNAME.size = 30;


	// 0x96
	PACKET.ZC.UNK1 = function PACKET_ZC_UNK1(fp, end) {
		this.unk = fp.readUShort();
	};
	PACKET.ZC.UNK1.size = 4;


	// 0x97
	PACKET.ZC.WHISPER = function PACKET_ZC_WHISPER(fp, end) {
		this.sender = fp.readString(24);
		this.isAdmin = fp.readLong();
		if (this.isAdmin !== 0 && this.isAdmin !== 1) {
			fp.seek(-4, SEEK_CUR);
		}
		this.msg = fp.readString(end - fp.tell());
	};
	PACKET.ZC.WHISPER.size = -1;


	// 0x98
	PACKET.ZC.ACK_WHISPER = function PACKET_ZC_ACK_WHISPER(fp, end) {
		this.result = fp.readUChar();
	};
	PACKET.ZC.ACK_WHISPER.size = 3;


	// 0x9a
	PACKET.ZC.BROADCAST = function PACKET_ZC_BROADCAST(fp, end) {
		this.msg = fp.readString(end - fp.tell());
	};
	PACKET.ZC.BROADCAST.size = -1;


	// 0x9c
	PACKET.ZC.CHANGE_DIRECTION = function PACKET_ZC_CHANGE_DIRECTION(fp, end) {
		this.AID = fp.readULong();
		this.headDir = fp.readShort();
		this.dir = fp.readUChar();
	};
	PACKET.ZC.CHANGE_DIRECTION.size = 9;


	// 0x9d
	PACKET.ZC.ITEM_ENTRY = function PACKET_ZC_ITEM_ENTRY(fp, end) {
		this.ITAID = fp.readULong();
		this.ITID = fp.readUShort();
		this.IsIdentified = fp.readUChar();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
		this.count = fp.readShort();
		this.subX = fp.readUChar();
		this.subY = fp.readUChar();
	};
	PACKET.ZC.ITEM_ENTRY.size = 17;


	// 0x9e
	PACKET.ZC.ITEM_FALL_ENTRY = function PACKET_ZC_ITEM_FALL_ENTRY(fp, end) {
		this.ITAID = fp.readULong();
		this.ITID = fp.readUShort();
		this.IsIdentified = fp.readUChar();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
		this.subX = fp.readUChar();
		this.subY = fp.readUChar();
		this.count = fp.readShort();
	};
	PACKET.ZC.ITEM_FALL_ENTRY.size = 17;


	// 0xa0
	PACKET.ZC.ITEM_PICKUP_ACK = function PACKET_ZC_ITEM_PICKUP_ACK(fp, end) {
		this.index = fp.readUShort();
		this.count = fp.readUShort();
		this.ITID = fp.readUShort();
		this.IsIdentified = fp.readUChar();
		this.IsDamaged = fp.readUChar();
		this.RefiningLevel = fp.readUChar();
		this.slot = {};
		this.slot.card1 = fp.readUShort();
		this.slot.card2 = fp.readUShort();
		this.slot.card3 = fp.readUShort();
		this.slot.card4 = fp.readUShort();
		this.location = fp.readUShort();
		this.type = fp.readUChar();
		this.result = fp.readUChar();
	};
	PACKET.ZC.ITEM_PICKUP_ACK.size = 23;


	// 0xa1
	PACKET.ZC.ITEM_DISAPPEAR = function PACKET_ZC_ITEM_DISAPPEAR(fp, end) {
		this.ITAID = fp.readULong();
	};
	PACKET.ZC.ITEM_DISAPPEAR.size = 6;


	// 0xa3
	PACKET.ZC.NORMAL_ITEMLIST = function PACKET_ZC_NORMAL_ITEMLIST(fp, end) {
		this.itemInfo = (function() {
			var i, count=(end-fp.tell())/10|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].count = fp.readShort();
				out[i].WearState = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.NORMAL_ITEMLIST.size = -1;


	// 0xa4
	PACKET.ZC.EQUIPMENT_ITEMLIST = function PACKET_ZC_EQUIPMENT_ITEMLIST(fp, end) {
		this.itemInfo = (function() {
			var i, count=(end-fp.tell())/20|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].location = fp.readUShort();
				out[i].WearState = fp.readUShort();
				out[i].IsDamaged = fp.readUChar();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.EQUIPMENT_ITEMLIST.size = -1;


	// 0xa5
	PACKET.ZC.STORE_NORMAL_ITEMLIST = function PACKET_ZC_STORE_NORMAL_ITEMLIST(fp, end) {
		this.itemInfo = (function() {
			var i, count=(end-fp.tell())/10|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].count = fp.readShort();
				out[i].WearState = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.STORE_NORMAL_ITEMLIST.size = -1;


	// 0xa6
	PACKET.ZC.STORE_EQUIPMENT_ITEMLIST = function PACKET_ZC_STORE_EQUIPMENT_ITEMLIST(fp, end) {
		this.itemInfo = (function() {
			var i, count=(end-fp.tell())/20|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].location = fp.readUShort();
				out[i].WearState = fp.readUShort();
				out[i].IsDamaged = fp.readUChar();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.STORE_EQUIPMENT_ITEMLIST.size = -1;


	// 0xa8
	PACKET.ZC.USE_ITEM_ACK = function PACKET_ZC_USE_ITEM_ACK(fp, end) {
		this.index = fp.readUShort();
		this.count = fp.readShort();
		this.result = fp.readUChar();
	};
	PACKET.ZC.USE_ITEM_ACK.size = 7;


	// 0xaa
	PACKET.ZC.REQ_WEAR_EQUIP_ACK = function PACKET_ZC_REQ_WEAR_EQUIP_ACK(fp, end) {
		this.index = fp.readUShort();
		this.wearLocation = fp.readUShort();
		if (PACKETVER.value >= 20100629) {
			this.viewid = fp.readUShort();
		}
		this.result = fp.readUChar();
	};
	PACKET.ZC.REQ_WEAR_EQUIP_ACK.size = 0;


	// 0xac
	PACKET.ZC.REQ_TAKEOFF_EQUIP_ACK = function PACKET_ZC_REQ_TAKEOFF_EQUIP_ACK(fp, end) {
		this.index = fp.readUShort();
		this.wearLocation = fp.readUShort();
		this.result = fp.readUChar();
	};
	PACKET.ZC.REQ_TAKEOFF_EQUIP_ACK.size = 7;


	// 0xaf
	PACKET.ZC.ITEM_THROW_ACK = function PACKET_ZC_ITEM_THROW_ACK(fp, end) {
		this.Index = fp.readUShort();
		this.count = fp.readShort();
	};
	PACKET.ZC.ITEM_THROW_ACK.size = 6;


	// 0xb0
	PACKET.ZC.PAR_CHANGE = function PACKET_ZC_PAR_CHANGE(fp, end) {
		this.varID = fp.readUShort();
		this.count = fp.readLong();
	};
	PACKET.ZC.PAR_CHANGE.size = 8;


	// 0xb1
	PACKET.ZC.LONGPAR_CHANGE = function PACKET_ZC_LONGPAR_CHANGE(fp, end) {
		this.varID = fp.readUShort();
		this.amount = fp.readLong();
	};
	PACKET.ZC.LONGPAR_CHANGE.size = 8;


	// 0xb3
	PACKET.ZC.RESTART_ACK = function PACKET_ZC_RESTART_ACK(fp, end) {
		this.type = fp.readUChar();
	};
	PACKET.ZC.RESTART_ACK.size = 3;


	// 0xb4
	PACKET.ZC.SAY_DIALOG = function PACKET_ZC_SAY_DIALOG(fp, end) {
		this.NAID = fp.readULong();
		this.msg = fp.readString(end - fp.tell());
	};
	PACKET.ZC.SAY_DIALOG.size = -1;


	// 0xb5
	PACKET.ZC.WAIT_DIALOG = function PACKET_ZC_WAIT_DIALOG(fp, end) {
		this.NAID = fp.readULong();
	};
	PACKET.ZC.WAIT_DIALOG.size = 6;


	// 0xb6
	PACKET.ZC.CLOSE_DIALOG = function PACKET_ZC_CLOSE_DIALOG(fp, end) {
		this.NAID = fp.readULong();
	};
	PACKET.ZC.CLOSE_DIALOG.size = 6;


	// 0xb7
	PACKET.ZC.MENU_LIST = function PACKET_ZC_MENU_LIST(fp, end) {
		this.NAID = fp.readULong();
		this.msg = fp.readString(end - fp.tell());
	};
	PACKET.ZC.MENU_LIST.size = -1;


	// 0xbc
	PACKET.ZC.STATUS_CHANGE_ACK = function PACKET_ZC_STATUS_CHANGE_ACK(fp, end) {
		this.statusID = fp.readUShort();
		this.result = fp.readUChar();
		this.value = fp.readUChar();
	};
	PACKET.ZC.STATUS_CHANGE_ACK.size = 6;


	// 0xbd
	PACKET.ZC.STATUS = function PACKET_ZC_STATUS(fp, end) {
		this.point = fp.readShort();
		this.str = fp.readUChar();
		this.standardStr = fp.readUChar();
		this.agi = fp.readUChar();
		this.standardAgi = fp.readUChar();
		this.vit = fp.readUChar();
		this.standardVit = fp.readUChar();
		this.Int = fp.readUChar();
		this.standardInt = fp.readUChar();
		this.dex = fp.readUChar();
		this.standardDex = fp.readUChar();
		this.luk = fp.readUChar();
		this.standardLuk = fp.readUChar();
		this.attPower = fp.readShort();
		this.refiningPower = fp.readShort();
		this.max_mattPower = fp.readShort();
		this.min_mattPower = fp.readShort();
		this.itemdefPower = fp.readShort();
		this.plusdefPower = fp.readShort();
		this.mdefPower = fp.readShort();
		this.plusmdefPower = fp.readShort();
		this.hitSuccessValue = fp.readShort();
		this.avoidSuccessValue = fp.readShort();
		this.plusAvoidSuccessValue = fp.readShort();
		this.criticalSuccessValue = fp.readShort();
		this.ASPD = fp.readShort();
		this.plusASPD = fp.readShort();
	};
	PACKET.ZC.STATUS.size = 44;


	// 0xbe
	PACKET.ZC.STATUS_CHANGE = function PACKET_ZC_STATUS_CHANGE(fp, end) {
		this.statusID = fp.readUShort();
		this.value = fp.readUChar();
	};
	PACKET.ZC.STATUS_CHANGE.size = 5;


	// 0xc0
	PACKET.ZC.EMOTION = function PACKET_ZC_EMOTION(fp, end) {
		this.GID = fp.readULong();
		this.type = fp.readUChar();
	};
	PACKET.ZC.EMOTION.size = 7;


	// 0xc2
	PACKET.ZC.USER_COUNT = function PACKET_ZC_USER_COUNT(fp, end) {
		this.count = fp.readLong();
	};
	PACKET.ZC.USER_COUNT.size = 6;


	// 0xc3
	PACKET.ZC.SPRITE_CHANGE = function PACKET_ZC_SPRITE_CHANGE(fp, end) {
		this.GID = fp.readULong();
		this.type = fp.readUChar();
		this.value = fp.readUChar();
	};
	PACKET.ZC.SPRITE_CHANGE.size = 8;


	// 0xc4
	PACKET.ZC.SELECT_DEALTYPE = function PACKET_ZC_SELECT_DEALTYPE(fp, end) {
		this.NAID = fp.readULong();
	};
	PACKET.ZC.SELECT_DEALTYPE.size = 6;


	// 0xc6
	PACKET.ZC.PC_PURCHASE_ITEMLIST = function PACKET_ZC_PC_PURCHASE_ITEMLIST(fp, end) {
		this.itemList = (function() {
			var i, count=(end-fp.tell())/11|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].price = fp.readLong();
				out[i].discountprice = fp.readLong();
				out[i].type = fp.readUChar();
				out[i].ITID = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.PC_PURCHASE_ITEMLIST.size = -1;


	// 0xc7
	PACKET.ZC.PC_SELL_ITEMLIST = function PACKET_ZC_PC_SELL_ITEMLIST(fp, end) {
		this.itemList = (function() {
			var i, count=(end-fp.tell())/10|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].price = fp.readLong();
				out[i].overchargeprice = fp.readLong();
			}
			return out;
		})();
	};
	PACKET.ZC.PC_SELL_ITEMLIST.size = -1;


	// 0xca
	PACKET.ZC.PC_PURCHASE_RESULT = function PACKET_ZC_PC_PURCHASE_RESULT(fp, end) {
		this.result = fp.readUChar();
	};
	PACKET.ZC.PC_PURCHASE_RESULT.size = 3;


	// 0xcb
	PACKET.ZC.PC_SELL_RESULT = function PACKET_ZC_PC_SELL_RESULT(fp, end) {
		this.result = fp.readUChar();
	};
	PACKET.ZC.PC_SELL_RESULT.size = 3;


	// 0xcd
	PACKET.ZC.ACK_DISCONNECT_CHARACTER = function PACKET_ZC_ACK_DISCONNECT_CHARACTER(fp, end) {
		this.result = fp.readUChar();
	};
	PACKET.ZC.ACK_DISCONNECT_CHARACTER.size = 3;


	// 0xd1
	PACKET.ZC.SETTING_WHISPER_PC = function PACKET_ZC_SETTING_WHISPER_PC(fp, end) {
		this.type = fp.readUChar();
		this.result = fp.readUChar();
	};
	PACKET.ZC.SETTING_WHISPER_PC.size = 4;


	// 0xd2
	PACKET.ZC.SETTING_WHISPER_STATE = function PACKET_ZC_SETTING_WHISPER_STATE(fp, end) {
		this.type = fp.readUChar();
		this.result = fp.readUChar();
	};
	PACKET.ZC.SETTING_WHISPER_STATE.size = 4;


	// 0xd4
	PACKET.ZC.WHISPER_LIST = function PACKET_ZC_WHISPER_LIST(fp, end) {
		this.wisperList = (function() {
			var i, count=(end-fp.tell())/24|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].name = fp.readString(24);
			}
			return out;
		})();
	};
	PACKET.ZC.WHISPER_LIST.size = -1;


	// 0xd6
	PACKET.ZC.ACK_CREATE_CHATROOM = function PACKET_ZC_ACK_CREATE_CHATROOM(fp, end) {
		this.result = fp.readUChar();
	};
	PACKET.ZC.ACK_CREATE_CHATROOM.size = 3;


	// 0xd7
	PACKET.ZC.ROOM_NEWENTRY = function PACKET_ZC_ROOM_NEWENTRY(fp, end) {
		this.AID = fp.readULong();
		this.roomID = fp.readULong();
		this.maxcount = fp.readShort();
		this.curcount = fp.readShort();
		this.type = fp.readUChar();
		this.title = fp.readString(end - fp.tell());
	};
	PACKET.ZC.ROOM_NEWENTRY.size = -1;


	// 0xd8
	PACKET.ZC.DESTROY_ROOM = function PACKET_ZC_DESTROY_ROOM(fp, end) {
		this.roomID = fp.readULong();
	};
	PACKET.ZC.DESTROY_ROOM.size = 6;


	// 0xda
	PACKET.ZC.REFUSE_ENTER_ROOM = function PACKET_ZC_REFUSE_ENTER_ROOM(fp, end) {
		this.result = fp.readUChar();
	};
	PACKET.ZC.REFUSE_ENTER_ROOM.size = 3;


	// 0xdb
	PACKET.ZC.ENTER_ROOM = function PACKET_ZC_ENTER_ROOM(fp, end) {
		this.roomID = fp.readULong();
		this.memberList = (function() {
			var i, count=(end-fp.tell())/28|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].role = fp.readULong();
				out[i].name = fp.readString(24);
			}
			return out;
		})();
	};
	PACKET.ZC.ENTER_ROOM.size = -1;


	// 0xdc
	PACKET.ZC.MEMBER_NEWENTRY = function PACKET_ZC_MEMBER_NEWENTRY(fp, end) {
		this.curcount = fp.readShort();
		this.name = fp.readString(24);
	};
	PACKET.ZC.MEMBER_NEWENTRY.size = 28;


	// 0xdd
	PACKET.ZC.MEMBER_EXIT = function PACKET_ZC_MEMBER_EXIT(fp, end) {
		this.curcount = fp.readShort();
		this.name = fp.readString(24);
		this.type = fp.readUChar();
	};
	PACKET.ZC.MEMBER_EXIT.size = 29;


	// 0xdf
	PACKET.ZC.CHANGE_CHATROOM = function PACKET_ZC_CHANGE_CHATROOM(fp, end) {
		this.AID = fp.readULong();
		this.roomID = fp.readULong();
		this.maxcount = fp.readShort();
		this.curcount = fp.readShort();
		this.type = fp.readUChar();
		this.title = fp.readString(end - fp.tell());
	};
	PACKET.ZC.CHANGE_CHATROOM.size = -1;


	// 0xe1
	PACKET.ZC.ROLE_CHANGE = function PACKET_ZC_ROLE_CHANGE(fp, end) {
		this.role = fp.readULong();
		this.name = fp.readString(24);
	};
	PACKET.ZC.ROLE_CHANGE.size = 30;


	// 0xe5
	PACKET.ZC.REQ_EXCHANGE_ITEM = function PACKET_ZC_REQ_EXCHANGE_ITEM(fp, end) {
		this.name = fp.readString(24);
	};
	PACKET.ZC.REQ_EXCHANGE_ITEM.size = 26;


	// 0xe7
	PACKET.ZC.ACK_EXCHANGE_ITEM = function PACKET_ZC_ACK_EXCHANGE_ITEM(fp, end) {
		this.result = fp.readUChar();
	};
	PACKET.ZC.ACK_EXCHANGE_ITEM.size = 3;


	// 0xe9
	PACKET.ZC.ADD_EXCHANGE_ITEM = function PACKET_ZC_ADD_EXCHANGE_ITEM(fp, end) {
		this.count = fp.readLong();
		this.ITID = fp.readUShort();
		this.IsIdentified = fp.readUChar();
		this.IsDamaged = fp.readUChar();
		this.RefiningLevel = fp.readUChar();
		this.slot = {};
		this.slot.card1 = fp.readUShort();
		this.slot.card2 = fp.readUShort();
		this.slot.card3 = fp.readUShort();
		this.slot.card4 = fp.readUShort();
	};
	PACKET.ZC.ADD_EXCHANGE_ITEM.size = 19;


	// 0xea
	PACKET.ZC.ACK_ADD_EXCHANGE_ITEM = function PACKET_ZC_ACK_ADD_EXCHANGE_ITEM(fp, end) {
		this.Index = fp.readShort();
		this.result = fp.readUChar();
	};
	PACKET.ZC.ACK_ADD_EXCHANGE_ITEM.size = 5;


	// 0xec
	PACKET.ZC.CONCLUDE_EXCHANGE_ITEM = function PACKET_ZC_CONCLUDE_EXCHANGE_ITEM(fp, end) {
		this.who = fp.readUChar();
	};
	PACKET.ZC.CONCLUDE_EXCHANGE_ITEM.size = 3;


	// 0xee
	PACKET.ZC.CANCEL_EXCHANGE_ITEM = function PACKET_ZC_CANCEL_EXCHANGE_ITEM(fp, end) {};
	PACKET.ZC.CANCEL_EXCHANGE_ITEM.size = 2;


	// 0xf0
	PACKET.ZC.EXEC_EXCHANGE_ITEM = function PACKET_ZC_EXEC_EXCHANGE_ITEM(fp, end) {
		this.result = fp.readUChar();
	};
	PACKET.ZC.EXEC_EXCHANGE_ITEM.size = 3;


	// 0xf1
	PACKET.ZC.EXCHANGEITEM_UNDO = function PACKET_ZC_EXCHANGEITEM_UNDO(fp, end) {};
	PACKET.ZC.EXCHANGEITEM_UNDO.size = 2;


	// 0xf2
	PACKET.ZC.NOTIFY_STOREITEM_COUNTINFO = function PACKET_ZC_NOTIFY_STOREITEM_COUNTINFO(fp, end) {
		this.curCount = fp.readShort();
		this.maxCount = fp.readShort();
	};
	PACKET.ZC.NOTIFY_STOREITEM_COUNTINFO.size = 6;


	// 0xf4
	PACKET.ZC.ADD_ITEM_TO_STORE = function PACKET_ZC_ADD_ITEM_TO_STORE(fp, end) {
		this.index = fp.readShort();
		this.count = fp.readLong();
		this.ITID = fp.readUShort();
		this.IsIdentified = fp.readUChar();
		this.IsDamaged = fp.readUChar();
		this.RefiningLevel = fp.readUChar();
		this.slot = {};
		this.slot.card1 = fp.readUShort();
		this.slot.card2 = fp.readUShort();
		this.slot.card3 = fp.readUShort();
		this.slot.card4 = fp.readUShort();
	};
	PACKET.ZC.ADD_ITEM_TO_STORE.size = 21;


	// 0xf6
	PACKET.ZC.DELETE_ITEM_FROM_STORE = function PACKET_ZC_DELETE_ITEM_FROM_STORE(fp, end) {
		this.index = fp.readShort();
		this.count = fp.readLong();
	};
	PACKET.ZC.DELETE_ITEM_FROM_STORE.size = 8;


	// 0xf8
	PACKET.ZC.CLOSE_STORE = function PACKET_ZC_CLOSE_STORE(fp, end) {};
	PACKET.ZC.CLOSE_STORE.size = 2;


	// 0xfa
	PACKET.ZC.ACK_MAKE_GROUP = function PACKET_ZC_ACK_MAKE_GROUP(fp, end) {
		this.result = fp.readUChar();
	};
	PACKET.ZC.ACK_MAKE_GROUP.size = 3;


	// 0xfb
	PACKET.ZC.GROUP_LIST = function PACKET_ZC_GROUP_LIST(fp, end) {
		this.groupName = fp.readString(24);
		this.groupInfo = (function() {
			var i, count=(end-fp.tell())/46|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].AID = fp.readULong();
				out[i].characterName = fp.readString(24);
				out[i].mapName = fp.readBinaryString(16);
				out[i].role = fp.readUChar();
				out[i].state = fp.readUChar();
			}
			return out;
		})();
	};
	PACKET.ZC.GROUP_LIST.size = -1;


	// 0xfd
	PACKET.ZC.ACK_REQ_JOIN_GROUP = function PACKET_ZC_ACK_REQ_JOIN_GROUP(fp, end) {
		this.characterName = fp.readString(24);
		this.answer = fp.readUChar();
	};
	PACKET.ZC.ACK_REQ_JOIN_GROUP.size = 27;


	// 0xfe
	PACKET.ZC.REQ_JOIN_GROUP = function PACKET_ZC_REQ_JOIN_GROUP(fp, end) {
		this.GRID = fp.readULong();
		this.groupName = fp.readString(24);
	};
	PACKET.ZC.REQ_JOIN_GROUP.size = 30;


	// 0x101
	PACKET.ZC.GROUPINFO_CHANGE = function PACKET_ZC_GROUPINFO_CHANGE(fp, end) {
		this.expOption = fp.readULong();
	};
	PACKET.ZC.GROUPINFO_CHANGE.size = 6;


	// 0x104
	PACKET.ZC.ADD_MEMBER_TO_GROUP = function PACKET_ZC_ADD_MEMBER_TO_GROUP(fp, end) {
		this.AID = fp.readULong();
		this.Role = fp.readULong();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
		this.state = fp.readUChar();
		this.groupName = fp.readString(24);
		this.characterName = fp.readString(24);
		this.mapName = fp.readBinaryString(16);
	};
	PACKET.ZC.ADD_MEMBER_TO_GROUP.size = 79;


	// 0x105
	PACKET.ZC.DELETE_MEMBER_FROM_GROUP = function PACKET_ZC_DELETE_MEMBER_FROM_GROUP(fp, end) {
		this.AID = fp.readULong();
		this.characterName = fp.readString(24);
		this.result = fp.readUChar();
	};
	PACKET.ZC.DELETE_MEMBER_FROM_GROUP.size = 31;


	// 0x106
	PACKET.ZC.NOTIFY_HP_TO_GROUPM = function PACKET_ZC_NOTIFY_HP_TO_GROUPM(fp, end) {
		this.AID = fp.readULong();
		this.hp = fp.readShort();
		this.maxhp = fp.readShort();
	};
	PACKET.ZC.NOTIFY_HP_TO_GROUPM.size = 10;


	// 0x107
	PACKET.ZC.NOTIFY_POSITION_TO_GROUPM = function PACKET_ZC_NOTIFY_POSITION_TO_GROUPM(fp, end) {
		this.AID = fp.readULong();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
	};
	PACKET.ZC.NOTIFY_POSITION_TO_GROUPM.size = 10;


	// 0x109
	PACKET.ZC.NOTIFY_CHAT_PARTY = function PACKET_ZC_NOTIFY_CHAT_PARTY(fp, end) {
		this.AID = fp.readULong();
		this.msg = fp.readString(end - fp.tell());
	};
	PACKET.ZC.NOTIFY_CHAT_PARTY.size = -1;


	// 0x10a
	PACKET.ZC.MVP_GETTING_ITEM = function PACKET_ZC_MVP_GETTING_ITEM(fp, end) {
		this.ITID = fp.readUShort();
	};
	PACKET.ZC.MVP_GETTING_ITEM.size = 4;


	// 0x10b
	PACKET.ZC.MVP_GETTING_SPECIAL_EXP = function PACKET_ZC_MVP_GETTING_SPECIAL_EXP(fp, end) {
		this.exp = fp.readULong();
	};
	PACKET.ZC.MVP_GETTING_SPECIAL_EXP.size = 6;


	// 0x10c
	PACKET.ZC.MVP = function PACKET_ZC_MVP(fp, end) {
		this.AID = fp.readULong();
	};
	PACKET.ZC.MVP.size = 6;


	// 0x10d
	PACKET.ZC.THROW_MVPITEM = function PACKET_ZC_THROW_MVPITEM(fp, end) {};
	PACKET.ZC.THROW_MVPITEM.size = 2;


	// 0x10e
	PACKET.ZC.SKILLINFO_UPDATE = function PACKET_ZC_SKILLINFO_UPDATE(fp, end) {
		this.SKID = fp.readUShort();
		this.level = fp.readShort();
		this.spcost = fp.readShort();
		this.attackRange = fp.readShort();
		this.upgradable = fp.readUChar();
	};
	PACKET.ZC.SKILLINFO_UPDATE.size = 11;


	// 0x10f
	PACKET.ZC.SKILLINFO_LIST = function PACKET_ZC_SKILLINFO_LIST(fp, end) {
		this.skillList = (function() {
			var i, count=(end-fp.tell())/37|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].SKID = fp.readShort();
				out[i].type = fp.readLong();
				out[i].level = fp.readShort();
				out[i].spcost = fp.readShort();
				out[i].attackRange = fp.readShort();
				out[i].skillName = fp.readBinaryString(24);
				out[i].upgradable = fp.readChar();
			}
			return out;
		})();
	};
	PACKET.ZC.SKILLINFO_LIST.size = -1;


	// 0114
	PACKET.ZC.ACK_TOUSESKILL = function PACKET_ZC_ACK_TOUSESKILL(fp, end) {
		this.SKID = fp.readUShort();
		this.NUM = fp.readULong();
		this.result = fp.readUChar();
		this.cause = fp.readUChar();
	};
	PACKET.ZC.ACK_TOUSESKILL.size = 10;


	// 0x111
	PACKET.ZC.ADD_SKILL = function PACKET_ZC_ADD_SKILL(fp, end) {
		this.data = {};
		this.data.SKID = fp.readUShort();
		this.data.type = fp.readLong();
		this.data.level = fp.readShort();
		this.data.spcost = fp.readShort();
		this.data.attackRange = fp.readShort();
		this.data.skillName = fp.readBinaryString(24);
		this.data.upgradable = fp.readUChar();
	};
	PACKET.ZC.ADD_SKILL.size = 39;


	// 0x114
	PACKET.ZC.NOTIFY_SKILL = function PACKET_ZC_NOTIFY_SKILL(fp, end) {
		this.SKID = fp.readUShort();
		this.AID = fp.readULong();
		this.targetID = fp.readULong();
		this.startTime = fp.readULong();
		this.attackMT = fp.readLong();
		this.attackedMT = fp.readLong();
		this.damage = fp.readShort();
		this.level = fp.readShort();
		this.count = fp.readShort();
		this.action = fp.readUChar();
	};
	PACKET.ZC.NOTIFY_SKILL.size = 31;


	// 0x115
	PACKET.ZC.NOTIFY_SKILL_POSITION = function PACKET_ZC_NOTIFY_SKILL_POSITION(fp, end) {
		this.SKID = fp.readUShort();
		this.AID = fp.readULong();
		this.targetID = fp.readULong();
		this.startTime = fp.readULong();
		this.attackMT = fp.readLong();
		this.attackedMT = fp.readLong();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
		this.damage = fp.readShort();
		this.level = fp.readShort();
		this.count = fp.readShort();
		this.action = fp.readUChar();
	};
	PACKET.ZC.NOTIFY_SKILL_POSITION.size = 35;


	// 0x117
	PACKET.ZC.NOTIFY_GROUNDSKILL = function PACKET_ZC_NOTIFY_GROUNDSKILL(fp, end) {
		this.SKID = fp.readUShort();
		this.AID = fp.readULong();
		this.level = fp.readShort();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
		this.startTime = fp.readULong();
	};
	PACKET.ZC.NOTIFY_GROUNDSKILL.size = 18;


	// 0x119
	PACKET.ZC.STATE_CHANGE = function PACKET_ZC_STATE_CHANGE(fp, end) {
		this.AID = fp.readULong();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readShort();
		this.isPKModeON = fp.readUChar();
	};
	PACKET.ZC.STATE_CHANGE.size = 13;


	// 0x11a
	PACKET.ZC.USE_SKILL = function PACKET_ZC_USE_SKILL(fp, end) {
		this.SKID = fp.readUShort();
		this.level = fp.readShort();
		this.targetAID = fp.readULong();
		this.srcAID = fp.readULong();
		this.result = fp.readUChar();
	};
	PACKET.ZC.USE_SKILL.size = 15;


	// 0x11c
	PACKET.ZC.WARPLIST = function PACKET_ZC_WARPLIST(fp, end) {
		this.SKID = fp.readUShort();
		this.mapName = (function() {
			var count = 4;
			var out = new Array(count);
			for (var i = 0; i < count; ++i) {
				out[i] = fp.readBinaryString(16);
			}
			return out;
		})();
	};
	PACKET.ZC.WARPLIST.size = 68;


	// 0x11e
	PACKET.ZC.ACK_REMEMBER_WARPPOINT = function PACKET_ZC_ACK_REMEMBER_WARPPOINT(fp, end) {
		this.errorCode = fp.readUChar();
	};
	PACKET.ZC.ACK_REMEMBER_WARPPOINT.size = 3;


	// 0x11f
	PACKET.ZC.SKILL_ENTRY = function PACKET_ZC_SKILL_ENTRY(fp, end) {
		this.AID = fp.readULong();
		this.creatorAID = fp.readULong();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
		this.job = fp.readUChar();
		this.isVisible = fp.readUChar();
	};
	PACKET.ZC.SKILL_ENTRY.size = 16;


	// 0x120
	PACKET.ZC.SKILL_DISAPPEAR = function PACKET_ZC_SKILL_DISAPPEAR(fp, end) {
		this.AID = fp.readULong();
	};
	PACKET.ZC.SKILL_DISAPPEAR.size = 6;


	// 0x121
	PACKET.ZC.NOTIFY_CARTITEM_COUNTINFO = function PACKET_ZC_NOTIFY_CARTITEM_COUNTINFO(fp, end) {
		this.curCount = fp.readShort();
		this.maxCount = fp.readShort();
		this.curWeight = fp.readLong();
		this.maxWeight = fp.readLong();
	};
	PACKET.ZC.NOTIFY_CARTITEM_COUNTINFO.size = 14;


	// 0x122
	PACKET.ZC.CART_EQUIPMENT_ITEMLIST = function PACKET_ZC_CART_EQUIPMENT_ITEMLIST(fp, end) {
		this.itemInfo = (function() {
			var i, count=(end-fp.tell())/20|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].location = fp.readUShort();
				out[i].WearState = fp.readUShort();
				out[i].IsDamaged = fp.readUChar();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.CART_EQUIPMENT_ITEMLIST.size = -1;


	// 0x123
	PACKET.ZC.CART_NORMAL_ITEMLIST = function PACKET_ZC_CART_NORMAL_ITEMLIST(fp, end) {
		this.itemInfo = (function() {
			var i, count=(end-fp.tell())/10|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].count = fp.readShort();
				out[i].WearState = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.CART_NORMAL_ITEMLIST.size = -1;


	// 0x124
	PACKET.ZC.ADD_ITEM_TO_CART = function PACKET_ZC_ADD_ITEM_TO_CART(fp, end) {
		this.index = fp.readShort();
		this.count = fp.readLong();
		this.ITID = fp.readUShort();
		this.IsIdentified = fp.readUChar();
		this.IsDamaged = fp.readUChar();
		this.RefiningLevel = fp.readUChar();
		this.slot = {};
		this.slot.card1 = fp.readUShort();
		this.slot.card2 = fp.readUShort();
		this.slot.card3 = fp.readUShort();
		this.slot.card4 = fp.readUShort();
	};
	PACKET.ZC.ADD_ITEM_TO_CART.size = 21;


	// 0x125
	PACKET.ZC.DELETE_ITEM_FROM_CART = function PACKET_ZC_DELETE_ITEM_FROM_CART(fp, end) {
		this.index = fp.readShort();
		this.count = fp.readLong();
	};
	PACKET.ZC.DELETE_ITEM_FROM_CART.size = 8;


	// 0x12b
	PACKET.ZC.CARTOFF = function PACKET_ZC_CARTOFF(fp, end) {};
	PACKET.ZC.CARTOFF.size = 2;


	// 0x12c
	PACKET.ZC.ACK_ADDITEM_TO_CART = function PACKET_ZC_ACK_ADDITEM_TO_CART(fp, end) {
		this.result = fp.readUChar();
	};
	PACKET.ZC.ACK_ADDITEM_TO_CART.size = 3;


	// 0x12d
	PACKET.ZC.OPENSTORE = function PACKET_ZC_OPENSTORE(fp, end) {
		this.itemcount = fp.readShort();
	};
	PACKET.ZC.OPENSTORE.size = 4;


	// 0x131
	PACKET.ZC.STORE_ENTRY = function PACKET_ZC_STORE_ENTRY(fp, end) {
		this.makerAID = fp.readULong();
		this.storeName = fp.readString(80);
	};
	PACKET.ZC.STORE_ENTRY.size = 86;


	// 0x132
	PACKET.ZC.DISAPPEAR_ENTRY = function PACKET_ZC_DISAPPEAR_ENTRY(fp, end) {
		this.makerAID = fp.readULong();
	};
	PACKET.ZC.DISAPPEAR_ENTRY.size = 6;


	// 0x133
	PACKET.ZC.PC_PURCHASE_ITEMLIST_FROMMC = function PACKET_ZC_PC_PURCHASE_ITEMLIST_FROMMC(fp, end) {
		this.AID = fp.readULong();
		this.itemList = (function() {
			var i, count=(end-fp.tell())/22|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].price = fp.readLong();
				out[i].count = fp.readShort();
				out[i].index = fp.readShort();
				out[i].type = fp.readUChar();
				out[i].ITID = fp.readUShort();
				out[i].IsIdentified = fp.readUChar();
				out[i].IsDamaged = fp.readUChar();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.PC_PURCHASE_ITEMLIST_FROMMC.size = -1;


	// 0x135
	PACKET.ZC.PC_PURCHASE_RESULT_FROMMC = function PACKET_ZC_PC_PURCHASE_RESULT_FROMMC(fp, end) {
		this.index = fp.readShort();
		this.curcount = fp.readShort();
		this.result = fp.readUChar();
	};
	PACKET.ZC.PC_PURCHASE_RESULT_FROMMC.size = 7;


	// 0x136
	PACKET.ZC.PC_PURCHASE_MYITEMLIST = function PACKET_ZC_PC_PURCHASE_MYITEMLIST(fp, end) {
		this.AID = fp.readULong();
		this.itemList = (function() {
			var i, count=(end-fp.tell())/22|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].price = fp.readLong();
				out[i].index = fp.readShort();
				out[i].count = fp.readShort();
				out[i].type = fp.readUChar();
				out[i].ITID = fp.readUShort();
				out[i].IsIdentified = fp.readUChar();
				out[i].IsDamaged = fp.readUChar();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.PC_PURCHASE_MYITEMLIST.size = -1;


	// 0x137
	PACKET.ZC.DELETEITEM_FROM_MCSTORE = function PACKET_ZC_DELETEITEM_FROM_MCSTORE(fp, end) {
		this.index = fp.readShort();
		this.count = fp.readShort();
	};
	PACKET.ZC.DELETEITEM_FROM_MCSTORE.size = 6;


	// 0x139
	PACKET.ZC.ATTACK_FAILURE_FOR_DISTANCE = function PACKET_ZC_ATTACK_FAILURE_FOR_DISTANCE(fp, end) {
		this.targetAID = fp.readULong();
		this.targetXPos = fp.readShort();
		this.targetYPos = fp.readShort();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
		this.currentAttRange = fp.readShort();
	};
	PACKET.ZC.ATTACK_FAILURE_FOR_DISTANCE.size = 16;


	// 0x13a
	PACKET.ZC.ATTACK_RANGE = function PACKET_ZC_ATTACK_RANGE(fp, end) {
		this.currentAttRange = fp.readShort();
	};
	PACKET.ZC.ATTACK_RANGE.size = 4;


	// 0x13b
	PACKET.ZC.ACTION_FAILURE = function PACKET_ZC_ACTION_FAILURE(fp, end) {
		this.errorCode = fp.readShort();
	};
	PACKET.ZC.ACTION_FAILURE.size = 4;


	// 0x13c
	PACKET.ZC.EQUIP_ARROW = function PACKET_ZC_EQUIP_ARROW(fp, end) {
		this.index = fp.readShort();
	};
	PACKET.ZC.EQUIP_ARROW.size = 4;


	// 0x13d
	PACKET.ZC.RECOVERY = function PACKET_ZC_RECOVERY(fp, end) {
		this.varID = fp.readShort();
		this.amount = fp.readShort();
	};
	PACKET.ZC.RECOVERY.size = 6;


	// 0x13e
	PACKET.ZC.USESKILL_ACK = function PACKET_ZC_USESKILL_ACK(fp, end) {
		this.AID = fp.readULong();
		this.targetID = fp.readULong();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
		this.SKID = fp.readUShort();
		this.property = fp.readULong();
		this.delayTime = fp.readULong();
	};
	PACKET.ZC.USESKILL_ACK.size = 24;


	// 0x141
	PACKET.ZC.COUPLESTATUS = function PACKET_ZC_COUPLESTATUS(fp, end) {
		this.statusType = fp.readULong();
		this.defaultStatus = fp.readLong();
		this.plusStatus = fp.readLong();
	};
	PACKET.ZC.COUPLESTATUS.size = 14;


	// 0x142
	PACKET.ZC.OPEN_EDITDLG = function PACKET_ZC_OPEN_EDITDLG(fp, end) {
		this.NAID = fp.readULong();
	};
	PACKET.ZC.OPEN_EDITDLG.size = 6;


	// 0x144
	PACKET.ZC.COMPASS = function PACKET_ZC_COMPASS(fp, end) {
		this.NAID = fp.readULong();
		this.type = fp.readLong();
		this.xPos = fp.readLong();
		this.yPos = fp.readLong();
		this.id = fp.readUChar();
		this.color = fp.readULong();
	};
	PACKET.ZC.COMPASS.size = 23;


	// 0x145
	PACKET.ZC.SHOW_IMAGE = function PACKET_ZC_SHOW_IMAGE(fp, end) {
		this.imageName = fp.readBinaryString(16);
		this.type = fp.readUChar();
	};
	PACKET.ZC.SHOW_IMAGE.size = 19;


	// 0x147
	PACKET.ZC.AUTORUN_SKILL = function PACKET_ZC_AUTORUN_SKILL(fp, end) {
		this.data = {};
		this.data.SKID = fp.readUShort();
		this.data.type = fp.readLong();
		this.data.level = fp.readShort();
		this.data.spcost = fp.readShort();
		this.data.attackRange = fp.readShort();
		this.data.skillName = fp.readBinaryString(24);
		this.data.upgradable = fp.readUChar();
	};
	PACKET.ZC.AUTORUN_SKILL.size = 39;


	// 0x148
	PACKET.ZC.RESURRECTION = function PACKET_ZC_RESURRECTION(fp, end) {
		this.AID = fp.readULong();
		this.type = fp.readShort();
	};
	PACKET.ZC.RESURRECTION.size = 8;


	// 0x14a
	PACKET.ZC.ACK_GIVE_MANNER_POINT = function PACKET_ZC_ACK_GIVE_MANNER_POINT(fp, end) {
		this.result = fp.readULong();
	};
	PACKET.ZC.ACK_GIVE_MANNER_POINT.size = 6;


	// 0x14b
	PACKET.ZC.NOTIFY_MANNER_POINT_GIVEN = function PACKET_ZC_NOTIFY_MANNER_POINT_GIVEN(fp, end) {
		this.type = fp.readUChar();
		this.otherCharName = fp.readString(24);
	};
	PACKET.ZC.NOTIFY_MANNER_POINT_GIVEN.size = 27;


	// 0x14c
	PACKET.ZC.MYGUILD_BASIC_INFO = function PACKET_ZC_MYGUILD_BASIC_INFO(fp, end) {
		this.relatedGuildList = (function() {
			var i, count=(end-fp.tell())/32|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].GDID = fp.readLong();
				out[i].relation = fp.readLong();
				out[i].guildName = fp.readString(24);
			}
			return out;
		})();
	};
	PACKET.ZC.MYGUILD_BASIC_INFO.size = -1;


	// 0x14e
	PACKET.ZC.ACK_GUILD_MENUINTERFACE = function PACKET_ZC_ACK_GUILD_MENUINTERFACE(fp, end) {
		this.guildMemuFlag = fp.readLong();
	};
	PACKET.ZC.ACK_GUILD_MENUINTERFACE.size = 6;


	// 0x150
	PACKET.ZC.GUILD_INFO = function PACKET_ZC_GUILD_INFO(fp, end) {
		this.GDID = fp.readLong();
		this.level = fp.readLong();
		this.userNum = fp.readLong();
		this.maxUserNum = fp.readLong();
		this.userAverageLevel = fp.readLong();
		this.exp = fp.readLong();
		this.maxExp = fp.readLong();
		this.point = fp.readLong();
		this.honor = fp.readLong();
		this.virtue = fp.readLong();
		this.emblemVersion = fp.readLong();
		this.guildname = fp.readString(24);
		this.masterName = fp.readString(24);
		this.manageLand = fp.readBinaryString(16);
	};
	PACKET.ZC.GUILD_INFO.size = 110;


	// 0x152
	PACKET.ZC.GUILD_EMBLEM_IMG = function PACKET_ZC_GUILD_EMBLEM_IMG(fp, end) {
		this.GDID = fp.readLong();
		this.emblemVersion = fp.readLong();
		this.img = new Uint8Array(fp.buffer, fp.offset, end - fp.offset);
	};
	PACKET.ZC.GUILD_EMBLEM_IMG.size = -1;


	// 0x154
	PACKET.ZC.MEMBERMGR_INFO = function PACKET_ZC_MEMBERMGR_INFO(fp, end) {
		this.memberInfo = (function() {
			var i, count=(end-fp.tell())/104|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].AID = fp.readULong();
				out[i].GID = fp.readULong();
				out[i].HeadType = fp.readShort();
				out[i].HeadPalette = fp.readShort();
				out[i].Sex = fp.readShort();
				out[i].Job = fp.readShort();
				out[i].Level = fp.readShort();
				out[i].MemberExp = fp.readLong();
				out[i].CurrentState = fp.readLong();
				out[i].GPositionID = fp.readLong();
				out[i].Memo = fp.readString(50);
				out[i].CharName = fp.readString(24);
			}
			return out;
		})();
	};
	PACKET.ZC.MEMBERMGR_INFO.size = -1;


	// 0x156
	PACKET.ZC.ACK_REQ_CHANGE_MEMBERS = function PACKET_ZC_ACK_REQ_CHANGE_MEMBERS(fp, end) {
		this.memberInfo = (function() {
			var i, count=(end-fp.tell())/12|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].AID = fp.readLong();
				out[i].GID = fp.readLong();
				out[i].positionID = fp.readLong();
			}
			return out;
		})();
	};
	PACKET.ZC.ACK_REQ_CHANGE_MEMBERS.size = -1;


	// 0x158
	PACKET.ZC.ACK_OPEN_MEMBER_INFO = function PACKET_ZC_ACK_OPEN_MEMBER_INFO(fp, end) {};
	PACKET.ZC.ACK_OPEN_MEMBER_INFO.size = 2;


	// 0x15a
	PACKET.ZC.ACK_LEAVE_GUILD = function PACKET_ZC_ACK_LEAVE_GUILD(fp, end) {
		this.charName = fp.readString(24);
		this.reasonDesc = fp.readString(40);
	};
	PACKET.ZC.ACK_LEAVE_GUILD.size = 66;


	// 0x15c
	PACKET.ZC.ACK_BAN_GUILD = function PACKET_ZC_ACK_BAN_GUILD(fp, end) {
		this.charName = fp.readString(24);
		this.reasonDesc = fp.readString(40);
		this.account = fp.readString(24);
	};
	PACKET.ZC.ACK_BAN_GUILD.size = 90;


	// 0x15e
	PACKET.ZC.ACK_DISORGANIZE_GUILD_RESULT = function PACKET_ZC_ACK_DISORGANIZE_GUILD_RESULT(fp, end) {
		this.reason = fp.readLong();
	};
	PACKET.ZC.ACK_DISORGANIZE_GUILD_RESULT.size = 6;


	// 0x15f
	PACKET.ZC.ACK_DISORGANIZE_GUILD = function PACKET_ZC_ACK_DISORGANIZE_GUILD(fp, end) {
		this.reasonDesc = fp.readString(40);
	};
	PACKET.ZC.ACK_DISORGANIZE_GUILD.size = 42;


	// 0x160
	PACKET.ZC.POSITION_INFO = function PACKET_ZC_POSITION_INFO(fp, end) {
		this.memberInfo = (function() {
			var i, count=(end-fp.tell())/16|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].positionID = fp.readLong();
				out[i].right = fp.readLong();
				out[i].ranking = fp.readLong();
				out[i].payRate = fp.readLong();
			}
			return out;
		})();
	};
	PACKET.ZC.POSITION_INFO.size = -1;


	// 0x162
	PACKET.ZC.GUILD_SKILLINFO = function PACKET_ZC_GUILD_SKILLINFO(fp, end) {
		this.skillPoint = fp.readShort();
		this.skillList = (function() {
			var i, count=(end-fp.tell())/37|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].SKID = fp.readUShort();
				out[i].type = fp.readLong();
				out[i].level = fp.readShort();
				out[i].spcost = fp.readShort();
				out[i].attackRange = fp.readShort();
				out[i].skillName = fp.readBinaryString(24);
				out[i].upgradable = fp.readChar();
			}
			return out;
		})();
	};
	PACKET.ZC.GUILD_SKILLINFO.size = -1;


	// 0x163
	PACKET.ZC.BAN_LIST = function PACKET_ZC_BAN_LIST(fp, end) {
		this.banList = (function() {
			var size = (PACKETVER.max < 20100803) ? 88 : 64;
			var i, count=(end-fp.tell())/size|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].charname = fp.readString(24);

				if (PACKETVER.max < 20100803) {
					out[i].account = fp.readString(24);
				}

				out[i].reason = fp.readString(40);
			}
			return out;
		})();
	};
	PACKET.ZC.BAN_LIST.size = -1;


	// 0x164
	PACKET.ZC.OTHER_GUILD_LIST = function PACKET_ZC_OTHER_GUILD_LIST(fp, end) {
		this.guildList = (function() {
			var i, count=(end-fp.tell())/36|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].guildname = fp.readString(24);
				out[i].guildLevel = fp.readLong();
				out[i].guildMemberSize = fp.readLong();
				out[i].guildRanking = fp.readLong();
			}
			return out;
		})();
	};
	PACKET.ZC.OTHER_GUILD_LIST.size = -1;


	// 0x166
	PACKET.ZC.POSITION_ID_NAME_INFO = function PACKET_ZC_POSITION_ID_NAME_INFO(fp, end) {
		this.memberList = (function() {
			var i, count=(end-fp.tell())/28|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].positionID = fp.readLong();
				out[i].posName = fp.readString(24);
			}
			return out;
		})();
	};
	PACKET.ZC.POSITION_ID_NAME_INFO.size = -1;


	// 0x167
	PACKET.ZC.RESULT_MAKE_GUILD = function PACKET_ZC_RESULT_MAKE_GUILD(fp, end) {
		this.result = fp.readUChar();
	};
	PACKET.ZC.RESULT_MAKE_GUILD.size = 3;


	// 0x169
	PACKET.ZC.ACK_REQ_JOIN_GUILD = function PACKET_ZC_ACK_REQ_JOIN_GUILD(fp, end) {
		this.answer = fp.readUChar();
	};
	PACKET.ZC.ACK_REQ_JOIN_GUILD.size = 3;


	// 0x16a
	PACKET.ZC.REQ_JOIN_GUILD = function PACKET_ZC_REQ_JOIN_GUILD(fp, end) {
		this.GDID = fp.readULong();
		this.guildName = fp.readString(24);
	};
	PACKET.ZC.REQ_JOIN_GUILD.size = 30;


	// 0x16c
	PACKET.ZC.UPDATE_GDID = function PACKET_ZC_UPDATE_GDID(fp, end) {
		this.GDID = fp.readULong();
		this.emblemVersion = fp.readLong();
		this.right = fp.readLong();
		this.isMaster = fp.readUChar();
		this.InterSID = fp.readLong();
		this.GName = fp.readString(24);
	};
	PACKET.ZC.UPDATE_GDID.size = 43;


	// 0x16d
	PACKET.ZC.UPDATE_CHARSTAT = function PACKET_ZC_UPDATE_CHARSTAT(fp, end) {
		this.AID = fp.readULong();
		this.GID = fp.readULong();
		this.status = fp.readLong();
	};
	PACKET.ZC.UPDATE_CHARSTAT.size = 14;


	// 0x16f
	PACKET.ZC.GUILD_NOTICE = function PACKET_ZC_GUILD_NOTICE(fp, end) {
		this.subject = fp.readString(60);
		this.notice = fp.readString(120);
	};
	PACKET.ZC.GUILD_NOTICE.size = 182;


	// 0x171
	PACKET.ZC.REQ_ALLY_GUILD = function PACKET_ZC_REQ_ALLY_GUILD(fp, end) {
		this.otherAID = fp.readULong();
		this.guildName = fp.readString(24);
	};
	PACKET.ZC.REQ_ALLY_GUILD.size = 30;


	// 0x173
	PACKET.ZC.ACK_REQ_ALLY_GUILD = function PACKET_ZC_ACK_REQ_ALLY_GUILD(fp, end) {
		this.answer = fp.readUChar();
	};
	PACKET.ZC.ACK_REQ_ALLY_GUILD.size = 3;


	// 0x174
	PACKET.ZC.ACK_CHANGE_GUILD_POSITIONINFO = function PACKET_ZC_ACK_CHANGE_GUILD_POSITIONINFO(fp, end) {
		this.memberList = (function() {
			var i, count=(end-fp.tell())/40|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].positionID = fp.readLong();
				out[i].right = fp.readLong();
				out[i].ranking = fp.readLong();
				out[i].payRate = fp.readLong();
				out[i].posName = fp.readString(24);
			}
			return out;
		})();
	};
	PACKET.ZC.ACK_CHANGE_GUILD_POSITIONINFO.size = -1;


	// 0x176
	PACKET.ZC.ACK_GUILD_MEMBER_INFO = function PACKET_ZC_ACK_GUILD_MEMBER_INFO(fp, end) {
		this.Info = {};
		this.Info.AID = fp.readLong();
		this.Info.GID = fp.readLong();
		this.Info.HeadType = fp.readShort();
		this.Info.HeadPalette = fp.readShort();
		this.Info.Sex = fp.readShort();
		this.Info.Job = fp.readShort();
		this.Info.Level = fp.readShort();
		this.Info.MemberExp = fp.readLong();
		this.Info.CurrentState = fp.readLong();
		this.Info.GPositionID = fp.readLong();
		this.Info.Memo = fp.readString(50);
		this.Info.CharName = fp.readString(24);
	};
	PACKET.ZC.ACK_GUILD_MEMBER_INFO.size = 106;


	// 0x177
	PACKET.ZC.ITEMIDENTIFY_LIST = function PACKET_ZC_ITEMIDENTIFY_LIST(fp, end) {
		this.ITIDList = (function() {
			var count = (end-fp.tell())/2|0, out = new Array(count);
			for (var i = 0; i < count; ++i) {
				out[i] = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.ITEMIDENTIFY_LIST.size = -1;


	// 0x179
	PACKET.ZC.ACK_ITEMIDENTIFY = function PACKET_ZC_ACK_ITEMIDENTIFY(fp, end) {
		this.index = fp.readShort();
		this.result = fp.readUChar();
	};
	PACKET.ZC.ACK_ITEMIDENTIFY.size = 5;


	// 0x17b
	PACKET.ZC.ITEMCOMPOSITION_LIST = function PACKET_ZC_ITEMCOMPOSITION_LIST(fp, end) {
		this.ITIDList = (function() {
			var count = (end-fp.tell())/2|0, out = new Array(count);
			for (var i = 0; i < count; ++i) {
				out[i] = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.ITEMCOMPOSITION_LIST.size = -1;


	// 0x17d
	PACKET.ZC.ACK_ITEMCOMPOSITION = function PACKET_ZC_ACK_ITEMCOMPOSITION(fp, end) {
		this.equipIndex = fp.readShort();
		this.cardIndex = fp.readShort();
		this.result = fp.readUChar();
	};
	PACKET.ZC.ACK_ITEMCOMPOSITION.size = 7;


	// 0x17f
	PACKET.ZC.GUILD_CHAT = function PACKET_ZC_GUILD_CHAT(fp, end) {
		this.msg = fp.readString(end - fp.tell());
	};
	PACKET.ZC.GUILD_CHAT.size = -1;


	// 0x181
	PACKET.ZC.ACK_REQ_HOSTILE_GUILD = function PACKET_ZC_ACK_REQ_HOSTILE_GUILD(fp, end) {
		this.result = fp.readUChar();
	};
	PACKET.ZC.ACK_REQ_HOSTILE_GUILD.size = 3;


	// 0x182
	PACKET.ZC.MEMBER_ADD = function PACKET_ZC_MEMBER_ADD(fp, end) {
		this.Info = {};
		this.Info.AID = fp.readLong();
		this.Info.GID = fp.readLong();
		this.Info.head = fp.readShort();
		this.Info.headPalette = fp.readShort();
		this.Info.sex = fp.readShort();
		this.Info.job = fp.readShort();
		this.Info.level = fp.readShort();
		this.Info.contributionExp = fp.readLong();
		this.Info.currentState = fp.readLong();
		this.Info.positionID = fp.readLong();
		this.Info.intro = fp.readString(50);
		this.Info.charname = fp.readString(24);
	};
	PACKET.ZC.MEMBER_ADD.size = 106;


	// 0x184
	PACKET.ZC.DELETE_RELATED_GUILD = function PACKET_ZC_DELETE_RELATED_GUILD(fp, end) {
		this.OpponentGDID = fp.readULong();
		this.Relation = fp.readLong();
	};
	PACKET.ZC.DELETE_RELATED_GUILD.size = 10;


	// 0x185
	PACKET.ZC.ADD_RELATED_GUILD = function PACKET_ZC_ADD_RELATED_GUILD(fp, end) {
		this.Info = {};
		this.Info.relation = fp.readLong();
		this.Info.GDID = fp.readLong();
		this.Info.guildname = fp.readString(24);
	};
	PACKET.ZC.ADD_RELATED_GUILD.size = 34;


	// 0x186
	PACKET.ZC.COLLECTORDEAD = function PACKET_COLLECTORDEAD(fp, end) {
		this.ServerID = fp.readULong();
	};
	PACKET.ZC.COLLECTORDEAD.size = 6;


	// 0x187
	PACKET.HC.PING = function PACKET_HC_PING(fp, end) {
		this.AID = fp.readULong();
	};
	PACKET.HC.PING.size = 6;


	// 0x188
	PACKET.ZC.ACK_ITEMREFINING = function PACKET_ZC_ACK_ITEMREFINING(fp, end) {
		this.result = fp.readShort();
		this.itemIndex = fp.readShort();
		this.RefiningLevel = fp.readShort();
	};
	PACKET.ZC.ACK_ITEMREFINING.size = 8;


	// 0x189
	PACKET.ZC.NOTIFY_MAPINFO = function PACKET_ZC_NOTIFY_MAPINFO(fp, end) {
		this.type = fp.readShort();
	};
	PACKET.ZC.NOTIFY_MAPINFO.size = 4;


	// 0x18b
	PACKET.ZC.ACK_REQ_DISCONNECT = function PACKET_ZC_ACK_REQ_DISCONNECT(fp, end) {
		this.result = fp.readShort();
	};
	PACKET.ZC.ACK_REQ_DISCONNECT.size = 4;


	// 0x18c
	PACKET.ZC.MONSTER_INFO = function PACKET_ZC_MONSTER_INFO(fp, end) {
		this.job = fp.readShort();
		this.level = fp.readShort();
		this.size = fp.readShort();
		this.hp = fp.readLong();
		this.def = fp.readShort();
		this.raceType = fp.readShort();
		this.mdefPower = fp.readShort();
		this.property = fp.readShort();
		this.propertyTable = {};
		this.propertyTable.water = fp.readUChar();
		this.propertyTable.earth = fp.readUChar();
		this.propertyTable.fire = fp.readUChar();
		this.propertyTable.wind = fp.readUChar();
		this.propertyTable.poison = fp.readUChar();
		this.propertyTable.saint = fp.readUChar();
		this.propertyTable.dark = fp.readUChar();
		this.propertyTable.mental = fp.readUChar();
		this.propertyTable.undead = fp.readUChar();
	};
	PACKET.ZC.MONSTER_INFO.size = 29;


	// 0x18d
	PACKET.ZC.MAKABLEITEMLIST = function PACKET_ZC_MAKABLEITEMLIST(fp, end) {
		this.info = {};
		this.info.ITID = fp.readUShort();
		this.info.material_ID = (function() {
			var count = 3;
			var out = new Array(count);
			for (var i = 0; i < count; ++i) {
				out[i] = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.MAKABLEITEMLIST.size = 12;


	// 0x18f
	PACKET.ZC.ACK_REQMAKINGITEM = function PACKET_ZC_ACK_REQMAKINGITEM(fp, end) {
		this.result = fp.readShort();
		this.ITID = fp.readUShort();
	};
	PACKET.ZC.ACK_REQMAKINGITEM.size = 6;


	// 0x191
	PACKET.ZC.TALKBOX_CHATCONTENTS = function PACKET_ZC_TALKBOX_CHATCONTENTS(fp, end) {
		this.AID = fp.readULong();
		this.contents = fp.readBinaryString(80);
	};
	PACKET.ZC.TALKBOX_CHATCONTENTS.size = 86;


	// 0x192
	PACKET.ZC.UPDATE_MAPINFO = function PACKET_ZC_UPDATE_MAPINFO(fp, end) {
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
		this.type = fp.readShort();
		this.mapName = fp.readBinaryString(16);
	};
	PACKET.ZC.UPDATE_MAPINFO.size = 24;


	// 0x194
	PACKET.ZC.ACK_REQNAME_BYGID = function PACKET_ZC_ACK_REQNAME_BYGID(fp, end) {
		this.GID = fp.readULong();
		this.CName = fp.readString(24);
	};
	PACKET.ZC.ACK_REQNAME_BYGID.size = 30;


	// 0x195
	PACKET.ZC.ACK_REQNAMEALL = function PACKET_ZC_ACK_REQNAMEALL(fp, end) {
		this.AID = fp.readULong();
		this.CName = fp.readString(24);
		this.PName = fp.readString(24);
		this.GName = fp.readString(24);
		this.RName = fp.readString(24);
	};
	PACKET.ZC.ACK_REQNAMEALL.size = 102;


	// 0x196
	PACKET.ZC.MSG_STATE_CHANGE = function PACKET_ZC_MSG_STATE_CHANGE(fp, end) {
		this.index = fp.readShort();
		this.AID = fp.readULong();
		this.state = fp.readUChar();
	};
	PACKET.ZC.MSG_STATE_CHANGE.size = 9;


	// 0x199
	PACKET.ZC.NOTIFY_MAPPROPERTY = function PACKET_ZC_NOTIFY_MAPPROPERTY(fp, end) {
		this.type = fp.readShort();
	};
	PACKET.ZC.NOTIFY_MAPPROPERTY.size = 4;


	// 0x19a
	PACKET.ZC.NOTIFY_RANKING = function PACKET_ZC_NOTIFY_RANKING(fp, end) {
		this.AID = fp.readULong();
		this.ranking = fp.readLong();
		this.total = fp.readLong();
	};
	PACKET.ZC.NOTIFY_RANKING.size = 14;


	// 0x19b
	PACKET.ZC.NOTIFY_EFFECT = function PACKET_ZC_NOTIFY_EFFECT(fp, end) {
		this.AID = fp.readULong();
		this.effectID = fp.readLong();
	};
	PACKET.ZC.NOTIFY_EFFECT.size = 10;


	// 0x19e
	PACKET.ZC.START_CAPTURE = function PACKET_ZC_START_CAPTURE(fp, end) {};
	PACKET.ZC.START_CAPTURE.size = 2;


	// 0x1a0
	PACKET.ZC.TRYCAPTURE_MONSTER = function PACKET_ZC_TRYCAPTURE_MONSTER(fp, end) {
		this.result = fp.readUChar();
	};
	PACKET.ZC.TRYCAPTURE_MONSTER.size = 3;


	// 0x1a2
	PACKET.ZC.PROPERTY_PET = function PACKET_ZC_PROPERTY_PET(fp, end) {
		this.szName = fp.readString(24);
		this.bModified = fp.readUChar();
		this.nLevel = fp.readShort();
		this.nFullness = fp.readShort();
		this.nRelationship = fp.readShort();
		this.ITID = fp.readUShort();
		this.job = fp.readShort();
	};
	PACKET.ZC.PROPERTY_PET.size = 37;


	// 0x1a3
	PACKET.ZC.FEED_PET = function PACKET_ZC_FEED_PET(fp, end) {
		this.cRet = fp.readChar();
		this.ITID = fp.readUShort();
	};
	PACKET.ZC.FEED_PET.size = 5;


	// 0x1a4
	PACKET.ZC.CHANGESTATE_PET = function PACKET_ZC_CHANGESTATE_PET(fp, end) {
		this.type = fp.readChar();
		this.GID = fp.readLong();
		this.data = fp.readLong();
	};
	PACKET.ZC.CHANGESTATE_PET.size = 11;


	// 0x1a6
	PACKET.ZC.PETEGG_LIST = function PACKET_ZC_PETEGG_LIST(fp, end) {
		this.eggList = (function() {
			var i, count=(end-fp.tell())/2|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = fp.readShort();
			}
			return out;
		})();
	};
	PACKET.ZC.PETEGG_LIST.size = -1;


	// 0x1aa
	PACKET.ZC.PET_ACT = function PACKET_ZC_PET_ACT(fp, end) {
		this.GID = fp.readLong();
		this.data = fp.readLong();
	};
	PACKET.ZC.PET_ACT.size = 10;


	// 0x1ab
	PACKET.ZC.PAR_CHANGE_USER = function PACKET_ZC_PAR_CHANGE_USER(fp, end) {
		this.AID = fp.readULong();
		this.varID = fp.readUShort();
		this.count = fp.readLong();
	};
	PACKET.ZC.PAR_CHANGE_USER.size = 12;


	// 0x1ac
	PACKET.ZC.SKILL_UPDATE = function PACKET_ZC_SKILL_UPDATE(fp, end) {
		this.AID = fp.readULong();
	};
	PACKET.ZC.SKILL_UPDATE.size = 6;


	// 0x1ad
	PACKET.ZC.MAKINGARROW_LIST = function PACKET_ZC_MAKINGARROW_LIST(fp, end) {
		this.arrowList = (function() {
			var i, count=(end-fp.tell())/2|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
			}
			return out;
		})();
	};
	PACKET.ZC.MAKINGARROW_LIST.size = -1;


	// 0x1b0
	PACKET.ZC.NPCSPRITE_CHANGE = function PACKET_ZC_NPCSPRITE_CHANGE(fp, end) {
		this.GID = fp.readULong();
		this.type = fp.readUChar();
		this.value = fp.readULong();
	};
	PACKET.ZC.NPCSPRITE_CHANGE.size = 11;


	// 0x1b1
	PACKET.ZC.SHOWDIGIT = function PACKET_ZC_SHOWDIGIT(fp, end) {
		this.type = fp.readUChar();
		this.value = fp.readLong();
	};
	PACKET.ZC.SHOWDIGIT.size = 7;


	// 0x1b3
	PACKET.ZC.SHOW_IMAGE2 = function PACKET_ZC_SHOW_IMAGE2(fp, end) {
		this.imageName = fp.readBinaryString(64);
		this.type = fp.readUChar();
	};
	PACKET.ZC.SHOW_IMAGE2.size = 67;


	// 0x1b4
	PACKET.ZC.CHANGE_GUILD = function PACKET_ZC_CHANGE_GUILD(fp, end) {
		this.AID = fp.readULong();
		this.GDID = fp.readULong();
		this.emblemVersion = fp.readShort();
	};
	PACKET.ZC.CHANGE_GUILD.size = 12;


	// 0x1b5
	PACKET.SC.BILLING_INFO = function PACKET_SC_BILLING_INFO(fp, end) {
		this.dwAmountRemain = fp.readULong();
		this.dwQuantityRemain = fp.readULong();
		this.dwReserved1 = fp.readULong();
		this.dwReserved2 = fp.readULong();
	};
	PACKET.SC.BILLING_INFO.size = 18;


	// 0x1b6
	PACKET.ZC.GUILD_INFO2 = function PACKET_ZC_GUILD_INFO2(fp, end) {
		this.GDID = fp.readLong();
		this.level = fp.readLong();
		this.userNum = fp.readLong();
		this.maxUserNum = fp.readLong();
		this.userAverageLevel = fp.readLong();
		this.exp = fp.readLong();
		this.maxExp = fp.readLong();
		this.point = fp.readLong();
		this.honor = fp.readLong();
		this.virtue = fp.readLong();
		this.emblemVersion = fp.readLong();
		this.guildname = fp.readString(24);
		this.masterName = fp.readString(24);
		this.manageLand = fp.readBinaryString(16);
		this.zeny = fp.readLong();
	};
	PACKET.ZC.GUILD_INFO2.size = 114;


	// 0x1b8
	PACKET.ZC.GUILD_ZENY_ACK = function PACKET_ZC_GUILD_ZENY_ACK(fp, end) {
		this.ret = fp.readUChar();
	};
	PACKET.ZC.GUILD_ZENY_ACK.size = 3;


	// 0x1b9
	PACKET.ZC.DISPEL = function PACKET_ZC_DISPEL(fp, end) {
		this.AID = fp.readULong();
	};
	PACKET.ZC.DISPEL.size = 6;


	// 0x1be
	PACKET.AC.ASK_PNGAMEROOM = function PACKET_AC_ASK_PNGAMEROOM(fp, end) {};
	PACKET.AC.ASK_PNGAMEROOM.size = 2;


	// 0x1c1
	PACKET.ZC.REPLY_REMAINTIME = function PACKET_ZC_REPLY_REMAINTIME(fp, end) {
		this.Result = fp.readLong();
		this.ExpirationDate = fp.readLong();
		this.RemainTime = fp.readLong();
	};
	PACKET.ZC.REPLY_REMAINTIME.size = 14;


	// 0x1c2
	PACKET.ZC.INFO_REMAINTIME = function PACKET_ZC_INFO_REMAINTIME(fp, end) {
		this.Type = fp.readLong();
		this.RemainTime = fp.readLong();
	};
	PACKET.ZC.INFO_REMAINTIME.size = 10;


	// 0x1c3
	PACKET.ZC.BROADCAST2 = function PACKET_ZC_BROADCAST2(fp, end) {
		this.fontColor = fp.readULong();
		this.fontType = fp.readShort();
		this.fontSize = fp.readShort();
		this.fontAlign = fp.readShort();
		this.fontY = fp.readShort();
		this.msg = fp.readString(end - fp.tell());
	};
	PACKET.ZC.BROADCAST2.size = -1;


	// 0x1c4
	PACKET.ZC.ADD_ITEM_TO_STORE2 = function PACKET_ZC_ADD_ITEM_TO_STORE2(fp, end) {
		this.index = fp.readShort();
		this.count = fp.readLong();
		this.ITID = fp.readUShort();
		this.type = fp.readUChar();
		this.IsIdentified = fp.readUChar();
		this.IsDamaged = fp.readUChar();
		this.RefiningLevel = fp.readUChar();
		this.slot = {};
		this.slot.card1 = fp.readUShort();
		this.slot.card2 = fp.readUShort();
		this.slot.card3 = fp.readUShort();
		this.slot.card4 = fp.readUShort();
	};
	PACKET.ZC.ADD_ITEM_TO_STORE2.size = 22;


	// 0x1c5
	PACKET.ZC.ADD_ITEM_TO_CART2 = function PACKET_ZC_ADD_ITEM_TO_CART2(fp, end) {
		this.index = fp.readShort();
		this.count = fp.readLong();
		this.ITID = fp.readUShort();
		this.type = fp.readUChar();
		this.IsIdentified = fp.readUChar();
		this.IsDamaged = fp.readUChar();
		this.RefiningLevel = fp.readUChar();
		this.slot = {};
		this.slot.card1 = fp.readUShort();
		this.slot.card2 = fp.readUShort();
		this.slot.card3 = fp.readUShort();
		this.slot.card4 = fp.readUShort();
	};
	PACKET.ZC.ADD_ITEM_TO_CART2.size = 22;


	// 0x1c7
	PACKET.SC.ACK_ENCRYPTION = function PACKET_SC_ACK_ENCRYPTION(fp, end) {};
	PACKET.SC.ACK_ENCRYPTION.size = 2;


	// 0x1c8
	PACKET.ZC.USE_ITEM_ACK2 = function PACKET_ZC_USE_ITEM_ACK2(fp, end) {
		this.index = fp.readUShort();
		this.id = fp.readUShort();
		this.AID = fp.readULong();
		this.count = fp.readShort();
		this.result = fp.readUChar();
	};
	PACKET.ZC.USE_ITEM_ACK2.size = 13;


	// 0x1c9
	PACKET.ZC.SKILL_ENTRY2 = function PACKET_ZC_SKILL_ENTRY2(fp, end) {
		this.AID = fp.readULong();
		this.creatorAID = fp.readULong();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
		this.job = fp.readUChar();
		this.isVisible = fp.readUChar();
		this.isContens = fp.readUChar();
		this.msg = fp.readString(80);
	};
	PACKET.ZC.SKILL_ENTRY2.size = 97;


	// 0x1cc
	PACKET.ZC.MONSTER_TALK = function PACKET_ZC_MONSTER_TALK(fp, end) {
		this.GID = fp.readULong();
		this.stateId = fp.readUChar();
		this.skillId = fp.readUChar();
		this.arg1 = fp.readUChar();
	};
	PACKET.ZC.MONSTER_TALK.size = 9;


	// 0x1cd
	PACKET.ZC.AUTOSPELLLIST = function PACKET_ZC_AUTOSPELLLIST(fp, end) {
		this.SKID = (function() {
			var count = 7,
				out = new Array(count);
			for (var i = 0; i < count; ++i) {
				out[i] = fp.readLong();
			}
			return out;
		})();
	};
	PACKET.ZC.AUTOSPELLLIST.size = 30;


	// 0x1cf
	PACKET.ZC.DEVOTIONLIST = function PACKET_ZC_DEVOTIONLIST(fp, end) {
		this.myAID = fp.readULong();
		this.AID = (function() {
			var count = 5,
				out = new Array(count);
			for (var i = 0; i < count; ++i) {
				out[i] = fp.readULong();
			}
			return out;
		})();
		this.range = fp.readShort();
	};
	PACKET.ZC.DEVOTIONLIST.size = 28;


	// 0x1d0
	PACKET.ZC.SPIRITS = function PACKET_ZC_SPIRITS(fp, end) {
		this.AID = fp.readULong();
		this.num = fp.readShort();
	};
	PACKET.ZC.SPIRITS.size = 8;


	// 0x1d1
	PACKET.ZC.BLADESTOP = function PACKET_ZC_BLADESTOP(fp, end) {
		this.srcAID = fp.readULong();
		this.destAID = fp.readULong();
		this.flag = fp.readLong();
	};
	PACKET.ZC.BLADESTOP.size = 14;


	// 0x1d2
	PACKET.ZC.COMBODELAY = function PACKET_ZC_COMBODELAY(fp, end) {
		this.AID = fp.readULong();
		this.delayTime = fp.readULong();
	};
	PACKET.ZC.COMBODELAY.size = 10;


	// 0x1d3
	PACKET.ZC.SOUND = function PACKET_ZC_SOUND(fp, end) {
		this.fileName = fp.readBinaryString(24);
		this.act = fp.readUChar();
		this.term = fp.readULong();
		this.NAID = fp.readULong();
	};
	PACKET.ZC.SOUND.size = 35;


	// 0x1d4
	PACKET.ZC.OPEN_EDITDLGSTR = function PACKET_ZC_OPEN_EDITDLGSTR(fp, end) {
		this.NAID = fp.readULong();
	};
	PACKET.ZC.OPEN_EDITDLGSTR.size = 6;


	// 0x1d6
	PACKET.ZC.NOTIFY_MAPPROPERTY2 = function PACKET_ZC_NOTIFY_MAPPROPERTY2(fp, end) {
		this.type = fp.readShort();
	};
	PACKET.ZC.NOTIFY_MAPPROPERTY2.size = 4;


	// 0x1d7
	PACKET.ZC.SPRITE_CHANGE2 = function PACKET_ZC_SPRITE_CHANGE2(fp, end) {
		this.GID = fp.readULong();
		this.type = fp.readUChar();
		this.value = fp.readULong();
	};
	PACKET.ZC.SPRITE_CHANGE2.size = 11;


	// 0x1d8
	PACKET.ZC.NOTIFY_STANDENTRY2 = function PACKET_ZC_NOTIFY_STANDENTRY2(fp, end) {
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readShort();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readShort();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.state = fp.readUChar();
		this.clevel = fp.readShort();
	};
	PACKET.ZC.NOTIFY_STANDENTRY2.size = 54;


	// 0x1d9
	PACKET.ZC.NOTIFY_NEWENTRY2 = function PACKET_ZC_NOTIFY_NEWENTRY2(fp, end) {
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readShort();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readShort();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.clevel = fp.readShort();
	};
	PACKET.ZC.NOTIFY_NEWENTRY2.size = 53;


	// 0x1da
	PACKET.ZC.NOTIFY_MOVEENTRY2 = function PACKET_ZC_NOTIFY_MOVEENTRY2(fp, end) {
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readShort();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.moveStartTime = fp.readULong();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readShort();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.MoveData = fp.readPos2();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.clevel = fp.readShort();
	};
	PACKET.ZC.NOTIFY_MOVEENTRY2.size = 60;


	// 0x1dc
	PACKET.AC.ACK_HASH = function PACKET_AC_ACK_HASH(fp, end) {
		this.secret = fp.readBinaryString(end - fp.tell());
	};
	PACKET.AC.ACK_HASH.size = -1;


	// 0x1de
	PACKET.ZC.NOTIFY_SKILL2 = function PACKET_ZC_NOTIFY_SKILL2(fp, end) {
		this.SKID = fp.readUShort();
		this.AID = fp.readULong();
		this.targetID = fp.readULong();
		this.startTime = fp.readULong();
		this.attackMT = fp.readLong();
		this.attackedMT = fp.readLong();
		this.damage = fp.readLong();
		this.level = fp.readShort();
		this.count = fp.readShort();
		this.action = fp.readUChar();
	};
	PACKET.ZC.NOTIFY_SKILL2.size = 33;


	// 0x1e0
	PACKET.ZC.ACK_ACCOUNTNAME = function PACKET_ZC_ACK_ACCOUNTNAME(fp, end) {
		this.AID = fp.readULong();
		this.name = fp.readString(24);
	};
	PACKET.ZC.ACK_ACCOUNTNAME.size = 30;


	// 0x1e1
	PACKET.ZC.SPIRITS2 = function PACKET_ZC_SPIRITS2(fp, end) {
		this.AID = fp.readULong();
		this.num = fp.readShort();
	};
	PACKET.ZC.SPIRITS2.size = 8;


	// 0x1e2
	PACKET.ZC.REQ_COUPLE = function PACKET_ZC_REQ_COUPLE(fp, end) {
		this.AID = fp.readULong();
		this.GID = fp.readULong();
		this.name = fp.readString(24);
	};
	PACKET.ZC.REQ_COUPLE.size = 34;


	// 0x1e4
	PACKET.ZC.START_COUPLE = function PACKET_ZC_START_COUPLE(fp, end) {};
	PACKET.ZC.START_COUPLE.size = 2;


	// 0x1e6
	PACKET.ZC.COUPLENAME = function PACKET_ZC_COUPLENAME(fp, end) {
		this.CoupleName = fp.readString(24);
	};
	PACKET.ZC.COUPLENAME.size = 26;


	// 0x1e9
	PACKET.ZC.ADD_MEMBER_TO_GROUP2 = function PACKET_ZC_ADD_MEMBER_TO_GROUP2(fp, end) {
		this.AID = fp.readULong();
		this.Role = fp.readULong();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
		this.state = fp.readUChar();
		this.groupName = fp.readString(24);
		this.characterName = fp.readString(24);
		this.mapName = fp.readBinaryString(16);
		this.ItemPickupRule = fp.readUChar();
		this.ItemDivisionRule = fp.readUChar();
	};
	PACKET.ZC.ADD_MEMBER_TO_GROUP2.size = 81;


	// 0x1ea
	PACKET.ZC.CONGRATULATION = function PACKET_ZC_CONGRATULATION(fp, end) {
		this.AID = fp.readULong();
	};
	PACKET.ZC.CONGRATULATION.size = 6;


	// 0x1eb
	PACKET.ZC.NOTIFY_POSITION_TO_GUILDM = function PACKET_ZC_NOTIFY_POSITION_TO_GUILDM(fp, end) {
		this.AID = fp.readULong();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
	};
	PACKET.ZC.NOTIFY_POSITION_TO_GUILDM.size = 10;


	// 0x1ec
	PACKET.ZC.GUILD_MEMBER_MAP_CHANGE = function PACKET_ZC_GUILD_MEMBER_MAP_CHANGE(fp, end) {
		this.GDID = fp.readULong();
		this.AID = fp.readULong();
		this.mapName = fp.readBinaryString(16);
	};
	PACKET.ZC.GUILD_MEMBER_MAP_CHANGE.size = 26;


	// 0x1ee
	PACKET.ZC.NORMAL_ITEMLIST2 = function PACKET_ZC_NORMAL_ITEMLIST2(fp, end) {
		this.ItemInfo = (function() {
			var i, count=(end-fp.tell())/18|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].count = fp.readShort();
				out[i].WearState = fp.readUShort();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.NORMAL_ITEMLIST2.size = -1;


	// 0x1ef
	PACKET.ZC.CART_NORMAL_ITEMLIST2 = function PACKET_ZC_CART_NORMAL_ITEMLIST2(fp, end) {
		this.ItemInfo = (function() {
			var i, count=(end-fp.tell())/18|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].count = fp.readShort();
				out[i].WearState = fp.readUShort();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.CART_NORMAL_ITEMLIST2.size = -1;


	// 0x1f0
	PACKET.ZC.STORE_NORMAL_ITEMLIST2 = function PACKET_ZC_STORE_NORMAL_ITEMLIST2(fp, end) {
		this.ItemInfo = (function() {
			var i, count=(end-fp.tell())/18|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].count = fp.readShort();
				out[i].WearState = fp.readUShort();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.STORE_NORMAL_ITEMLIST2.size = -1;


	// 0x1f1
	PACKET.AC.NOTIFY_ERROR = function PACKET_AC_NOTIFY_ERROR(fp, end) {
		this.msg = fp.readString(end - fp.tell());
	};
	PACKET.AC.NOTIFY_ERROR.size = -1;


	// 0x1f2
	PACKET.ZC.UPDATE_CHARSTAT2 = function PACKET_ZC_UPDATE_CHARSTAT2(fp, end) {
		this.AID = fp.readULong();
		this.GID = fp.readULong();
		this.status = fp.readLong();
		this.sex = fp.readShort();
		this.head = fp.readShort();
		this.headPalette = fp.readShort();
	};
	PACKET.ZC.UPDATE_CHARSTAT2.size = 20;


	// 0x1f3
	PACKET.ZC.NOTIFY_EFFECT2 = function PACKET_ZC_NOTIFY_EFFECT2(fp, end) {
		this.AID = fp.readULong();
		this.effectID = fp.readLong();
	};
	PACKET.ZC.NOTIFY_EFFECT2.size = 10;


	// 0x1f4
	PACKET.ZC.REQ_EXCHANGE_ITEM2 = function PACKET_ZC_REQ_EXCHANGE_ITEM2(fp, end) {
		this.name = fp.readString(24);
		this.GID = fp.readULong();
		this.level = fp.readShort();
	};
	PACKET.ZC.REQ_EXCHANGE_ITEM2.size = 32;


	// 0x1f5
	PACKET.ZC.ACK_EXCHANGE_ITEM2 = function PACKET_ZC_ACK_EXCHANGE_ITEM2(fp, end) {
		this.result = fp.readUChar();
		this.GID = fp.readULong();
		this.level = fp.readShort();
	};
	PACKET.ZC.ACK_EXCHANGE_ITEM2.size = 9;


	// 0x1f6
	PACKET.ZC.REQ_BABY = function PACKET_ZC_REQ_BABY(fp, end) {
		this.AID = fp.readULong();
		this.GID = fp.readULong();
		this.name = fp.readString(24);
	};
	PACKET.ZC.REQ_BABY.size = 34;


	// 0x1f8
	PACKET.ZC.START_BABY = function PACKET_ZC_START_BABY(fp, end) {};
	PACKET.ZC.START_BABY.size = 2;


	// 0x1fc
	PACKET.ZC.REPAIRITEMLIST = function PACKET_ZC_REPAIRITEMLIST(fp, end) {
		this.itemList = (function() {
			var i, count=(end-fp.tell())/13|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.REPAIRITEMLIST.size = -1;


	// 0x1fe
	PACKET.ZC.ACK_ITEMREPAIR = function PACKET_ZC_ACK_ITEMREPAIR(fp, end) {
		this.index = fp.readShort();
		this.result = fp.readUChar();
	};
	PACKET.ZC.ACK_ITEMREPAIR.size = 5;


	// 0x1ff
	PACKET.ZC.HIGHJUMP = function PACKET_ZC_HIGHJUMP(fp, end) {
		this.AID = fp.readULong();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
	};
	PACKET.ZC.HIGHJUMP.size = 10;


	// 0x201
	PACKET.ZC.FRIENDS_LIST = function PACKET_ZC_FRIENDS_LIST(fp, end) {
		this.friendList = (function() {
			var i, count=(end-fp.tell())/32|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].AID = fp.readULong();
				out[i].GID = fp.readULong();
				out[i].Name = fp.readString(24);
			}
			return out;
		})();
	};
	PACKET.ZC.FRIENDS_LIST.size = -1;


	// 0x205
	PACKET.ZC.DIVORCE = function PACKET_ZC_DIVORCE(fp, end) {
		this.name = fp.readString(24);
	};
	PACKET.ZC.DIVORCE.size = 26;


	// 0x206
	PACKET.ZC.FRIENDS_STATE = function PACKET_ZC_FRIENDS_STATE(fp, end) {
		this.AID = fp.readULong();
		this.GID = fp.readULong();
		this.State = fp.readUChar();
	};
	PACKET.ZC.FRIENDS_STATE.size = 11;


	// 0x207
	PACKET.ZC.REQ_ADD_FRIENDS = function PACKET_ZC_REQ_ADD_FRIENDS(fp, end) {
		this.ReqAID = fp.readULong();
		this.ReqGID = fp.readULong();
		this.Name = fp.readString(24);
	};
	PACKET.ZC.REQ_ADD_FRIENDS.size = 34;


	// 0x209
	PACKET.ZC.ADD_FRIENDS_LIST = function PACKET_ZC_ADD_FRIENDS_LIST(fp, end) {
		this.Result = fp.readShort();
		this.AID = fp.readULong();
		this.GID = fp.readULong();
		this.Name = fp.readString(24);
	};
	PACKET.ZC.ADD_FRIENDS_LIST.size = 36;


	// 0x20a
	PACKET.ZC.DELETE_FRIENDS = function PACKET_ZC_DELETE_FRIENDS(fp, end) {
		this.AID = fp.readULong();
		this.GID = fp.readULong();
	};
	PACKET.ZC.DELETE_FRIENDS.size = 10;


	// 0x20d
	PACKET.HC.BLOCK_CHARACTER = function PACKET_HC_BLOCK_CHARACTER(fp, end) {
		this.characterList = (function() {
			var i, count=(end-fp.tell())/24|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].GID = fp.readULong();
                out[i].szExpireDate = fp.readBinaryString(20);
			}
			return out;
		})();
	};
	PACKET.HC.BLOCK_CHARACTER.size = -1;


	// 0x20e
	PACKET.ZC.STARSKILL = function PACKET_ZC_STARSKILL(fp, end) {
		this.mapName = fp.readBinaryString(24);
		this.monsterID = fp.readLong();
		this.star = fp.readUChar();
		this.result = fp.readUChar();
	};
	PACKET.ZC.STARSKILL.size = 32;


	// 0x210
	PACKET.ZC.ACK_PVPPOINT = function PACKET_ZC_ACK_PVPPOINT(fp, end) {
		this.AID = fp.readULong();
		this.GID = fp.readULong();
		this.PVP = {};
		this.PVP.WinPoint = fp.readLong();
		this.PVP.LosePoint = fp.readLong();
		this.PVP.Point = fp.readLong();
	};
	PACKET.ZC.ACK_PVPPOINT.size = 22;


	// 0x211
	PACKET.ZH.MOVE_PVPWORLD = function PACKET_ZH_MOVE_PVPWORLD(fp, end) {
		this.GID = fp.readULong();
	};
	PACKET.ZH.MOVE_PVPWORLD.size = 6;


	// 0x214
	PACKET.ZC.ACK_STATUS_GM = function PACKET_ZC_ACK_STATUS_GM(fp, end) {
		this.str = fp.readUChar();
		this.standardStr = fp.readUChar();
		this.agi = fp.readUChar();
		this.standardAgi = fp.readUChar();
		this.vit = fp.readUChar();
		this.standardVit = fp.readUChar();
		this.Int = fp.readUChar();
		this.standardInt = fp.readUChar();
		this.dex = fp.readUChar();
		this.standardDex = fp.readUChar();
		this.luk = fp.readUChar();
		this.standardLuk = fp.readUChar();
		this.attPower = fp.readShort();
		this.refiningPower = fp.readShort();
		this.max_mattPower = fp.readShort();
		this.min_mattPower = fp.readShort();
		this.itemdefPower = fp.readShort();
		this.plusdefPower = fp.readShort();
		this.mdefPower = fp.readShort();
		this.plusmdefPower = fp.readShort();
		this.hitSuccessValue = fp.readShort();
		this.avoidSuccessValue = fp.readShort();
		this.plusAvoidSuccessValue = fp.readShort();
		this.criticalSuccessValue = fp.readShort();
		this.ASPD = fp.readShort();
		this.plusASPD = fp.readShort();
	};
	PACKET.ZC.ACK_STATUS_GM.size = 42;


	// 0x215
	PACKET.ZC.SKILLMSG = function PACKET_ZC_SKILLMSG(fp, end) {
		this.MsgNo = fp.readLong();
	};
	PACKET.ZC.SKILLMSG.size = 6;


	// 0x216
	PACKET.ZC.BABYMSG = function PACKET_ZC_BABYMSG(fp, end) {
		this.MsgNo = fp.readLong();
	};
	PACKET.ZC.BABYMSG.size = 6;


	// 0x219
	PACKET.ZC.BLACKSMITH_RANK = function PACKET_ZC_BLACKSMITH_RANK(fp, end) {
		this.Name = (function() {
			var count = 10,
				out = new Array(count);
			for (var i = 0; i < count; ++i) {
				out[i] = fp.readString(24);
			}
			return out;
		})();
		this.Point = (function() {
			var count = 10,
				out = new Array(count);
			for (var i = 0; i < count; ++i) {
				out[i] = fp.readLong();
			}
			return out;
		})();
	};
	PACKET.ZC.BLACKSMITH_RANK.size = 282;


	// 0x21a
	PACKET.ZC.ALCHEMIST_RANK = function PACKET_ZC_ALCHEMIST_RANK(fp, end) {
		this.Name = (function() {
			var count = 10,
				out = new Array(count);
			for (var i = 0; i < count; ++i) {
				out[i] = fp.readString(24);
			}
			return out;
		})();
		this.Point = (function() {
			var count = 10,
				out = new Array(count);
			for (var i = 0; i < count; ++i) {
				out[i] = fp.readLong();
			}
			return out;
		})();
	};
	PACKET.ZC.ALCHEMIST_RANK.size = 282;


	// 0x21b
	PACKET.ZC.BLACKSMITH_POINT = function PACKET_ZC_BLACKSMITH_POINT(fp, end) {
		this.Point = fp.readLong();
		this.TotalPoint = fp.readLong();
	};
	PACKET.ZC.BLACKSMITH_POINT.size = 10;


	// 0x21c
	PACKET.ZC.ALCHEMIST_POINT = function PACKET_ZC_ALCHEMIST_POINT(fp, end) {
		this.Point = fp.readLong();
		this.TotalPoint = fp.readLong();
	};
	PACKET.ZC.ALCHEMIST_POINT.size = 10;


	// 0x21e
	PACKET.ZC.LESSEFFECT = function PACKET_ZC_LESSEFFECT(fp, end) {
		this.isLess = fp.readLong();
	};
	PACKET.ZC.LESSEFFECT.size = 6;


	// 0x21f
	PACKET.ZC.NOTIFY_PKINFO = function PACKET_ZC_NOTIFY_PKINFO(fp, end) {
		this.winPoint = fp.readLong();
		this.losePoint = fp.readLong();
		this.killName = fp.readString(24);
		this.killedName = fp.readString(24);
		this.expireTime = {};
		this.expireTime.dwLowDateTime = fp.readULong();
		this.expireTime.dwHighDateTime = fp.readULong();
	};
	PACKET.ZC.NOTIFY_PKINFO.size = 66;


	// 0x220
	PACKET.ZC.NOTIFY_CRAZYKILLER = function PACKET_ZC_NOTIFY_CRAZYKILLER(fp, end) {
		this.AID = fp.readULong();
		this.isCrazyKiller = fp.readLong();
	};
	PACKET.ZC.NOTIFY_CRAZYKILLER.size = 10;


	// 0x221
	PACKET.ZC.NOTIFY_WEAPONITEMLIST = function PACKET_ZC_NOTIFY_WEAPONITEMLIST(fp, end) {
		this.itemList = (function() {
			var i, count=(end-fp.tell())/13|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.NOTIFY_WEAPONITEMLIST.size = -1;


	// 0x223
	PACKET.ZC.ACK_WEAPONREFINE = function PACKET_ZC_ACK_WEAPONREFINE(fp, end) {
		this.msg = fp.readLong();
		this.ITID = fp.readUShort();
	};
	PACKET.ZC.ACK_WEAPONREFINE.size = 8;


	// 0x224
	PACKET.ZC.TAEKWON_POINT = function PACKET_ZC_TAEKWON_POINT(fp, end) {
		this.Point = fp.readLong();
		this.TotalPoint = fp.readLong();
	};
	PACKET.ZC.TAEKWON_POINT.size = 10;


	// 0x226
	PACKET.ZC.TAEKWON_RANK = function PACKET_ZC_TAEKWON_RANK(fp, end) {
		this.Name = (function() {
			var count = 10,
				out = new Array(count);
			for (var i = 0; i < count; ++i) {
				out[i] = fp.readString(24);
			}
			return out;
		})();
		this.Point = (function() {
			var count = 10,
				out = new Array(count);
			for (var i = 0; i < count; ++i) {
				out[i] = fp.readLong();
			}
			return out;
		})();
	};
	PACKET.ZC.TAEKWON_RANK.size = 282;


	// 0x227
	PACKET.ZC.GAME_GUARD = function PACKET_ZC_GAME_GUARD(fp, end) {
		this.AuthData = (function() {
			var count = 4,
				out = new Array(count);
			for (var i = 0; i < count; ++i) {
				out[i] = fp.readULong();
			}
			return out;
		})();
	};
	PACKET.ZC.GAME_GUARD.size = 18;


	// 0x229
	PACKET.ZC.STATE_CHANGE3 = function PACKET_ZC_STATE_CHANGE3(fp, end) {
		this.AID = fp.readULong();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.isPKModeON = fp.readUChar();
	};
	PACKET.ZC.STATE_CHANGE3.size = 15;


	// 0x22a
	PACKET.ZC.NOTIFY_STANDENTRY3 = function PACKET_ZC_NOTIFY_STANDENTRY3(fp, end) {
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.state = fp.readUChar();
		this.clevel = fp.readShort();
	};
	PACKET.ZC.NOTIFY_STANDENTRY3.size = 58;


	// 0x22b
	PACKET.ZC.NOTIFY_NEWENTRY3 = function PACKET_ZC_NOTIFY_NEWENTRY3(fp, end) {
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.clevel = fp.readShort();
	};
	PACKET.ZC.NOTIFY_NEWENTRY3.size = 57;


	// 0x22c
	PACKET.ZC.NOTIFY_MOVEENTRY3 = function PACKET_ZC_NOTIFY_MOVEENTRY3(fp, end) {
		this.objecttype = fp.readUChar();
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.moveStartTime = fp.readULong();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.MoveData = fp.readPos2();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.clevel = fp.readShort();
	};
	PACKET.ZC.NOTIFY_MOVEENTRY3.size = 65;


	// 0x22e
	PACKET.ZC.PROPERTY_HOMUN = function PACKET_ZC_PROPERTY_HOMUN(fp, end) {
		this.szName = fp.readString(24);
		this.bModified = fp.readUChar();
		this.nLevel = fp.readShort();
		this.nFullness = fp.readShort();
		this.nRelationship = fp.readShort();
		this.ITID = fp.readUShort();
		this.atk = fp.readShort();
		this.Matk = fp.readShort();
		this.hit = fp.readShort();
		this.critical = fp.readShort();
		this.def = fp.readShort();
		this.Mdef = fp.readShort();
		this.flee = fp.readShort();
		this.aspd = fp.readShort();
		this.hp = fp.readShort();
		this.maxHP = fp.readShort();
		this.sp = fp.readShort();
		this.maxSP = fp.readShort();
		this.exp = fp.readLong();
		this.maxEXP = fp.readLong();
		this.SKPoint = fp.readShort();
		this.ATKRange = fp.readShort();
	};
	PACKET.ZC.PROPERTY_HOMUN.size = 71;


	// 0x230
	PACKET.ZC.CHANGESTATE_MER = function PACKET_ZC_CHANGESTATE_MER(fp, end) {
		this.type = fp.readChar();
		this.state = fp.readChar();
		this.GID = fp.readLong();
		this.data = fp.readLong();
	};
	PACKET.ZC.CHANGESTATE_MER.size = 12;


	// 0x23a
	PACKET.ZC.REQ_STORE_PASSWORD = function PACKET_ZC_REQ_STORE_PASSWORD(fp, end) {
		this.Info = fp.readShort();
	};
	PACKET.ZC.REQ_STORE_PASSWORD.size = 4;


	// 0x23c
	PACKET.ZC.RESULT_STORE_PASSWORD = function PACKET_ZC_RESULT_STORE_PASSWORD(fp, end) {
		this.Result = fp.readShort();
		this.ErrorCount = fp.readShort();
	};
	PACKET.ZC.RESULT_STORE_PASSWORD.size = 6;


	// 0x23d
	PACKET.AC.EVENT_RESULT = function PACKET_AC_EVENT_RESULT(fp, end) {
		this.EventItemCount = fp.readULong();
	};
	PACKET.AC.EVENT_RESULT.size = 6;


	// 0x23e
	PACKET.HC.REQUEST_CHARACTER_PASSWORD = function PACKET_HC_REQUEST_CHARACTER_PASSWORD(fp, end) {
		this.Result = fp.readShort();
		this.dummyValue = fp.readULong();
	};
	PACKET.HC.REQUEST_CHARACTER_PASSWORD.size = 8;


	// 0x240
	PACKET.ZC.MAIL_REQ_GET_LIST = function PACKET_ZC_MAIL_REQ_GET_LIST(fp, end) {
		this.MailNumber = fp.readLong();
		this.mailList = (function() {
			var i, count=(end-fp.tell())/73|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].MailID = fp.readULong();
				out[i].HEADER = fp.readString(40);
				out[i].isOpen = fp.readChar();
				out[i].FromName = fp.readString(24);
				out[i].DeleteTime = fp.readLong();
			}
			return out;
		})();
	};
	PACKET.ZC.MAIL_REQ_GET_LIST.size = -1;


	// 0x242
	PACKET.ZC.MAIL_REQ_OPEN = function PACKET_ZC_MAIL_REQ_OPEN(fp, end) {
		this.MailID = fp.readLong();
		this.Header = fp.readString(40);
		this.FromName = fp.readString(24);
		this.DeleteTime = fp.readLong();
		this.Money = fp.readULong();
		this.count = fp.readLong();
		this.ITID = fp.readUShort();
		this.Type = fp.readUShort();
		this.IsIdentified = fp.readUChar();
		this.IsDamaged = fp.readUChar();
		this.RefiningLevel = fp.readUChar();
		this.slot = {};
		this.slot.card1 = fp.readUShort();
		this.slot.card2 = fp.readUShort();
		this.slot.card3 = fp.readUShort();
		this.slot.card4 = fp.readUShort();
		this.msg_len = fp.readUChar();
		this.msg = fp.readString(end - fp.tell());
	};
	PACKET.ZC.MAIL_REQ_OPEN.size = -1;


	// 0x245
	PACKET.ZC.MAIL_REQ_GET_ITEM = function PACKET_ZC_MAIL_REQ_GET_ITEM(fp, end) {
		this.Result = fp.readChar();
	};
	PACKET.ZC.MAIL_REQ_GET_ITEM.size = 3;


	// 0x249
	PACKET.ZC.MAIL_REQ_SEND = function PACKET_ZC_MAIL_REQ_SEND(fp, end) {
		this.Result = fp.readChar();
	};
	PACKET.ZC.MAIL_REQ_SEND.size = 3;


	// 0x24a
	PACKET.ZC.MAIL_RECEIVE = function PACKET_ZC_MAIL_RECEIVE(fp, end) {
		this.MailID = fp.readULong();
		this.Header = fp.readString(40);
		this.FromName = fp.readString(24);
	};
	PACKET.ZC.MAIL_RECEIVE.size = 70;


	// 0x250
	PACKET.ZC.AUCTION_RESULT = function PACKET_ZC_AUCTION_RESULT(fp, end) {
		this.Result = fp.readChar();
	};
	PACKET.ZC.AUCTION_RESULT.size = 3;


	// 0x252
	PACKET.ZC.AUCTION_ITEM_REQ_SEARCH = function PACKET_ZC_AUCTION_ITEM_REQ_SEARCH(fp, end) {
		this.MaxPage = fp.readLong();
		this.Number = fp.readLong();
		this.auctionItemList = (function() {
			var i, count=(end-fp.tell())/83|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].AuctionID = fp.readULong();
				out[i].SellerName = fp.readString(24);
				out[i].ITID = fp.readUShort();
				out[i].Type = fp.readLong();
				out[i].count = fp.readShort();
				out[i].IsIdentified = fp.readUChar();
				out[i].IsDamaged = fp.readUChar();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].NowPrice = fp.readLong();
				out[i].MaxPrice = fp.readLong();
				out[i].BuyerName = fp.readString(24);
				out[i].DeleteTime = fp.readLong();
			}
			return out;
		})();
	};
	PACKET.ZC.AUCTION_ITEM_REQ_SEARCH.size = -1;


	// 0x253
	PACKET.ZC.STARPLACE = function PACKET_ZC_STARPLACE(fp, end) {
		this.which = fp.readChar();
	};
	PACKET.ZC.STARPLACE.size = 3;


	// 0x255
	PACKET.ZC.ACK_MAIL_ADD_ITEM = function PACKET_ZC_ACK_MAIL_ADD_ITEM(fp, end) {
		this.Index = fp.readShort();
		this.result = fp.readUChar();
	};
	PACKET.ZC.ACK_MAIL_ADD_ITEM.size = 5;


	// 0x256
	PACKET.ZC.ACK_AUCTION_ADD_ITEM = function PACKET_ZC_ACK_AUCTION_ADD_ITEM(fp, end) {
		this.Index = fp.readShort();
		this.result = fp.readUChar();
	};
	PACKET.ZC.ACK_AUCTION_ADD_ITEM.size = 5;


	// 0x257
	PACKET.ZC.ACK_MAIL_DELETE = function PACKET_ZC_ACK_MAIL_DELETE(fp, end) {
		this.MailID = fp.readLong();
		this.Result = fp.readUShort();
	};
	PACKET.ZC.ACK_MAIL_DELETE.size = 8;


	// 0x259
	PACKET.AC.ACK_GAME_GUARD = function PACKET_AC_ACK_GAME_GUARD(fp, end) {
		this.ucAnswer = fp.readUChar();
	};
	PACKET.AC.ACK_GAME_GUARD.size = 3;


	// 0x25a
	PACKET.ZC.MAKINGITEM_LIST = function PACKET_ZC_MAKINGITEM_LIST(fp, end) {
		this.idList = (function() {
			var count = (end-fp.tell())/2|0, out = new Array(count);
			for (var i = 0; i < count; ++i) {
				out[i] = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.MAKINGITEM_LIST.size = -1;


	// 0x25e
	PACKET.ZC.AUCTION_ACK_MY_SELL_STOP = function PACKET_ZC_AUCTION_ACK_MY_SELL_STOP(fp, end) {
		this.Result = fp.readShort();
	};
	PACKET.ZC.AUCTION_ACK_MY_SELL_STOP.size = 4;


	// 0x25f
	PACKET.ZC.AUCTION_WINDOWS = function PACKET_ZC_AUCTION_WINDOWS(fp, end) {
		this.Type = fp.readLong();
	};
	PACKET.ZC.AUCTION_WINDOWS.size = 6;


	// 0x260
	PACKET.ZC.MAIL_WINDOWS = function PACKET_ZC_MAIL_WINDOWS(fp, end) {
		this.Type = fp.readLong();
	};
	PACKET.ZC.MAIL_WINDOWS.size = 6;


	// 0x261
	PACKET.AC.REQ_LOGIN_OLDEKEY = function PACKET_AC_REQ_LOGIN_OLDEKEY(fp, end) {
		this.m_SeedValue = fp.readBinaryString(9);
	};
	PACKET.AC.REQ_LOGIN_OLDEKEY.size = 11;


	// 0x262
	PACKET.AC.REQ_LOGIN_NEWEKEY = function PACKET_AC_REQ_LOGIN_NEWEKEY(fp, end) {
		this.m_SeedValue = fp.readBinaryString(9);
	};
	PACKET.AC.REQ_LOGIN_NEWEKEY.size = 11;


	// 0x263
	PACKET.AC.REQ_LOGIN_CARDPASS = function PACKET_AC_REQ_LOGIN_CARDPASS(fp, end) {
		this.m_SeedValue = fp.readBinaryString(9);
	};
	PACKET.AC.REQ_LOGIN_CARDPASS.size = 11;


	// 0x267
	PACKET.AC.ACK_EKEY_FAIL_NOTEXIST = function PACKET_AC_ACK_EKEY_FAIL_NOTEXIST(fp, end) {
		this.errorCode = fp.readShort();
	};
	PACKET.AC.ACK_EKEY_FAIL_NOTEXIST.size = 4;


	// 0x268
	PACKET.AC.ACK_EKEY_FAIL_NOTUSESEKEY = function PACKET_AC_ACK_EKEY_FAIL_NOTUSESEKEY(fp, end) {
		this.errorCode = fp.readShort();
	};
	PACKET.AC.ACK_EKEY_FAIL_NOTUSESEKEY.size = 4;


	// 0x269
	PACKET.AC.ACK_EKEY_FAIL_NOTUSEDEKEY = function PACKET_AC_ACK_EKEY_FAIL_NOTUSEDEKEY(fp, end) {
		this.errorCode = fp.readShort();
	};
	PACKET.AC.ACK_EKEY_FAIL_NOTUSEDEKEY.size = 4;


	// 0x26a
	PACKET.AC.ACK_EKEY_FAIL_AUTHREFUSE = function PACKET_AC_ACK_EKEY_FAIL_AUTHREFUSE(fp, end) {
		this.errorCode = fp.readShort();
	};
	PACKET.AC.ACK_EKEY_FAIL_AUTHREFUSE.size = 4;


	// 0x26b
	PACKET.AC.ACK_EKEY_FAIL_INPUTEKEY = function PACKET_AC_ACK_EKEY_FAIL_INPUTEKEY(fp, end) {
		this.errorCode = fp.readShort();
	};
	PACKET.AC.ACK_EKEY_FAIL_INPUTEKEY.size = 4;


	// 0x26c
	PACKET.AC.ACK_EKEY_FAIL_NOTICE = function PACKET_AC_ACK_EKEY_FAIL_NOTICE(fp, end) {
		this.errorCode = fp.readShort();
	};
	PACKET.AC.ACK_EKEY_FAIL_NOTICE.size = 4;


	// 0x26d
	PACKET.AC.ACK_EKEY_FAIL_NEEDCARDPASS = function PACKET_AC_ACK_EKEY_FAIL_NEEDCARDPASS(fp, end) {
		this.errorCode = fp.readShort();
	};
	PACKET.AC.ACK_EKEY_FAIL_NEEDCARDPASS.size = 4;


	// 0x26e
	PACKET.AC.ACK_AUTHEKEY_FAIL_NOTMATCHCARDPASS = function PACKET_AC_ACK_AUTHEKEY_FAIL_NOTMATCHCARDPASS(fp, end) {
		this.errorCode = fp.readShort();
	};
	PACKET.AC.ACK_AUTHEKEY_FAIL_NOTMATCHCARDPASS.size = 4;


	// 0x26f
	PACKET.AC.ACK_FIRST_LOGIN = function PACKET_AC_ACK_FIRST_LOGIN(fp, end) {};
	PACKET.AC.ACK_FIRST_LOGIN.size = 2;


	// 0x270
	PACKET.AC.REQ_LOGIN_ACCOUNT_INFO = function PACKET_AC_REQ_LOGIN_ACCOUNT_INFO(fp, end) {};
	PACKET.AC.REQ_LOGIN_ACCOUNT_INFO.size = 2;


	// 0x272
	PACKET.AC.ACK_PT_ID_INFO = function PACKET_AC_ACK_PT_ID_INFO(fp, end) {
		this.szPTID = fp.readBinaryString(21);
		this.szPTNumID = fp.readBinaryString(21);
	};
	PACKET.AC.ACK_PT_ID_INFO.size = 44;


	// 0x274
	PACKET.ZC.ACK_MAIL_RETURN = function PACKET_ZC_ACK_MAIL_RETURN(fp, end) {
		this.MailID = fp.readLong();
		this.Result = fp.readShort();
	};
	PACKET.ZC.ACK_MAIL_RETURN.size = 8;


	// 0x276
	PACKET.AC.ACCEPT_LOGIN2 = function PACKET_AC_ACCEPT_LOGIN2(fp, end) {
		this.AuthCode = fp.readLong();
		this.AID = fp.readULong();
		this.userLevel = fp.readULong();
		this.lastLoginIP = fp.readULong();
		this.lastLoginTime = fp.readBinaryString(26);
		this.Sex = fp.readUChar();
		this.iAccountSID = fp.readLong();
	};
	PACKET.AC.ACCEPT_LOGIN2.size = 51;


	// 0x278
	PACKET.ZC.NOTIFY_PCBANG = function PACKET_ZC_NOTIFY_PCBANG(fp, end) {};
	PACKET.ZC.NOTIFY_PCBANG.size = 2;


	// 0x27a
	PACKET.ZC.HUNTINGLIST = function PACKET_ZC_HUNTINGLIST(fp, end) {
		this.HuntingList = (function() {
			var i, count=(end-fp.tell())/12|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].questID = fp.readULong();
				out[i].mobGID = fp.readULong();
				out[i].maxCount = fp.readShort();
				out[i].count = fp.readShort();
			}
			return out;
		})();
	};
	PACKET.ZC.HUNTINGLIST.size = -1;


	// 0x27b
	PACKET.ZC.PCBANG_EFFECT = function PACKET_ZC_PCBANG_EFFECT(fp, end) {
		this.ExpFactor = fp.readLong();
		this.ExpFactor2 = fp.readLong();
		this.DropFactor = fp.readLong();
	};
	PACKET.ZC.PCBANG_EFFECT.size = 14;


	// 0x27d
	PACKET.ZC.PROPERTY_MERCE = function PACKET_ZC_PROPERTY_MERCE(fp, end) {
		this.name = fp.readString(24);
		this.level = fp.readShort();
		this.faith = fp.readShort();
		this.summonCount = fp.readShort();
		this.atk = fp.readShort();
		this.Matk = fp.readShort();
		this.hit = fp.readShort();
		this.critical = fp.readShort();
		this.def = fp.readShort();
		this.Mdef = fp.readShort();
		this.flee = fp.readShort();
		this.aspd = fp.readShort();
		this.hp = fp.readShort();
		this.maxHP = fp.readShort();
		this.sp = fp.readShort();
		this.maxSP = fp.readShort();
		this.ATKRange = fp.readShort();
		this.exp = fp.readLong();
	};
	PACKET.ZC.PROPERTY_MERCE.size = 62;


	// 0x27e
	PACKET.ZC.SHANDA_PROTECT = function PACKET_ZC_SHANDA_PROTECT(fp, end) {
		this.CodeLen = fp.readShort();
		this.Code = fp.readBinaryString(end - fp.tell());
	};
	PACKET.ZC.SHANDA_PROTECT.size = -1;


	// 0x280
	PACKET.ZC.GANGSI_POINT = function PACKET_ZC_GANGSI_POINT(fp, end) {
		this.Point = fp.readLong();
		this.TotalPoint = fp.readLong();
		this.PacketSwitch = fp.readShort();
	};
	PACKET.ZC.GANGSI_POINT.size = 12;


	// 0x282
	PACKET.ZC.GANGSI_RANK = function PACKET_ZC_GANGSI_RANK(fp, end) {
		this.Name = (function() {
			var count = 10,
				out = new Array(count);
			for (var i = 0; i < count; ++i) {
				out[i] = fp.readString(24);
			}
			return out;
		})();
		this.Point = (function() {
			var count = 10,
				out = new Array(count);
			for (var i = 0; i < count; ++i) {
				out[i] = fp.readLong();
			}
			return out;
		})();
		this.PacketSwitch = fp.readShort();
	};
	PACKET.ZC.GANGSI_RANK.size = 284;


	// 0x283
	PACKET.ZC.AID = function PACKET_ZC_AID(fp, end) {
		this.AID = fp.readULong();
	};
	PACKET.ZC.AID.size = 6;


	// 0x284
	PACKET.ZC.NOTIFY_EFFECT3 = function PACKET_ZC_NOTIFY_EFFECT3(fp, end) {
		this.AID = fp.readULong();
		this.effectID = fp.readLong();
		this.numdata = fp.readLong();
	};
	PACKET.ZC.NOTIFY_EFFECT3.size = 14;


	// 0x285
	PACKET.ZC.DEATH_QUESTION = function PACKET_ZC_DEATH_QUESTION(fp, end) {
		this.Qcategory = fp.readShort();
		this.Qnum = fp.readShort();
	};
	PACKET.ZC.DEATH_QUESTION.size = 6;


	// 0x287
	PACKET.ZC.PC_CASH_POINT_ITEMLIST = function PACKET_ZC_PC_CASH_POINT_ITEMLIST(fp, end) {
		this.CashPoint = fp.readULong();
		this.itemList = (function() {
			var i, count=(end-fp.tell())/11|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].price = fp.readLong();
				out[i].discountprice = fp.readLong();
				out[i].type = fp.readUChar();
				out[i].ITID = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.PC_CASH_POINT_ITEMLIST.size = -1;


	// 0x289
	PACKET.ZC.PC_CASH_POINT_UPDATE = function PACKET_ZC_PC_CASH_POINT_UPDATE(fp, end) {
		this.CashPoint = fp.readULong();
		this.Error = fp.readShort();
	};
	PACKET.ZC.PC_CASH_POINT_UPDATE.size = 8;


	// 0x28a
	PACKET.ZC.NPC_SHOWEFST_UPDATE = function PACKET_ZC_NPC_SHOWEFST_UPDATE(fp, end) {
		this.AID = fp.readULong();
		this.effectState = fp.readLong();
		this.clevel = fp.readLong();
		this.showEFST = fp.readLong();
	};
	PACKET.ZC.NPC_SHOWEFST_UPDATE.size = 18;


	// 0x28e
	PACKET.HC.ACK_IS_VALID_CHARNAME = function PACKET_HC_ACK_IS_VALID_CHARNAME(fp, end) {
		this.sResult = fp.readShort();
	};
	PACKET.HC.ACK_IS_VALID_CHARNAME.size = 4;


	// 0x290
	PACKET.HC.ACK_CHANGE_CHARNAME = function PACKET_HC_ACK_CHANGE_CHARNAME(fp, end) {
		this.sResult = fp.readShort();
	};
	PACKET.HC.ACK_CHANGE_CHARNAME.size = 4;


	// 0x291
	PACKET.ZC.MSG = function PACKET_ZC_MSG(fp, end) {
		this.msg = fp.readUShort();
	};
	PACKET.ZC.MSG.size = 4;


	// 0x293
	PACKET.ZC.BOSS_INFO = function PACKET_ZC_BOSS_INFO(fp, end) {
		this.infoType = fp.readUChar();
		this.xPos = fp.readLong();
		this.yPos = fp.readLong();
		this.minHour = fp.readUShort();
		this.minMinute = fp.readUShort();
		this.maxHour = fp.readUShort();
		this.maxMinute = fp.readUShort();
		this.name = fp.readString(51);
	};
	PACKET.ZC.BOSS_INFO.size = 70;


	// 0x294
	PACKET.ZC.READ_BOOK = function PACKET_ZC_READ_BOOK(fp, end) {
		this.bookID = fp.readULong();
		this.page = fp.readULong();
	};
	PACKET.ZC.READ_BOOK.size = 10;


	// 0x295
	PACKET.ZC.EQUIPMENT_ITEMLIST2 = function PACKET_ZC_EQUIPMENT_ITEMLIST2(fp, end) {
		this.ItemInfo = (function() {
			var i, count=(end-fp.tell())/24|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].location = fp.readUShort();
				out[i].WearState = fp.readUShort();
				out[i].IsDamaged = fp.readUChar();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].HireExpireDate = fp.readLong();
			}
			return out;
		})();
	};
	PACKET.ZC.EQUIPMENT_ITEMLIST2.size = -1;


	// 0x296
	PACKET.ZC.STORE_EQUIPMENT_ITEMLIST2 = function PACKET_ZC_STORE_EQUIPMENT_ITEMLIST2(fp, end) {
		this.ItemInfo = (function() {
			var i, count=(end-fp.tell())/24|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].location = fp.readUShort();
				out[i].WearState = fp.readUShort();
				out[i].IsDamaged = fp.readUChar();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].HireExpireDate = fp.readLong();
			}
			return out;
		})();
	};
	PACKET.ZC.STORE_EQUIPMENT_ITEMLIST2.size = -1;


	// 0x297
	PACKET.ZC.CART_EQUIPMENT_ITEMLIST2 = function PACKET_ZC_CART_EQUIPMENT_ITEMLIST2(fp, end) {
		this.ItemInfo = (function() {
			var i, count=(end-fp.tell())/24|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].location = fp.readUShort();
				out[i].WearState = fp.readUShort();
				out[i].IsDamaged = fp.readUChar();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].HireExpireDate = fp.readLong();
			}
			return out;
		})();
	};
	PACKET.ZC.CART_EQUIPMENT_ITEMLIST2.size = -1;


	// 0x298
	PACKET.ZC.CASH_TIME_COUNTER = function PACKET_ZC_CASH_TIME_COUNTER(fp, end) {
		this.ITID = fp.readUShort();
		this.RemainSecond = fp.readULong();
	};
	PACKET.ZC.CASH_TIME_COUNTER.size = 8;


	// 0x299
	PACKET.ZC.CASH_ITEM_DELETE = function PACKET_ZC_CASH_ITEM_DELETE(fp, end) {
		this.index = fp.readShort();
		this.ITID = fp.readUShort();
	};
	PACKET.ZC.CASH_ITEM_DELETE.size = 6;


	// 0x29a
	PACKET.ZC.ITEM_PICKUP_ACK2 = function PACKET_ZC_ITEM_PICKUP_ACK2(fp, end) {
		this.index = fp.readUShort();
		this.count = fp.readUShort();
		this.ITID = fp.readUShort();
		this.IsIdentified = fp.readUChar();
		this.IsDamaged = fp.readUChar();
		this.RefiningLevel = fp.readUChar();
		this.slot = {};
		this.slot.card1 = fp.readUShort();
		this.slot.card2 = fp.readUShort();
		this.slot.card3 = fp.readUShort();
		this.slot.card4 = fp.readUShort();
		this.location = fp.readUShort();
		this.type = fp.readUChar();
		this.result = fp.readUChar();
		this.HireExpireDate = fp.readLong();
	};
	PACKET.ZC.ITEM_PICKUP_ACK2.size = 27;


	// 0x29b
	PACKET.ZC.MER_INIT = function PACKET_ZC_MER_INIT(fp, end) {
		this.AID = fp.readLong();
		this.atk = fp.readShort();
		this.Matk = fp.readShort();
		this.hit = fp.readShort();
		this.critical = fp.readShort();
		this.def = fp.readShort();
		this.Mdef = fp.readShort();
		this.flee = fp.readShort();
		this.aspd = fp.readShort();
		this.name = fp.readString(24);
		this.level = fp.readShort();
		this.hp = fp.readLong();
		this.maxHP = fp.readLong();
		this.sp = fp.readLong();
		this.maxSP = fp.readLong();
		this.ExpireDate = fp.readLong();
		this.faith = fp.readShort();
		this.toal_call_num = fp.readLong();
		this.approval_monster_kill_counter = fp.readLong();
		this.ATKRange = fp.readShort();
	};
	PACKET.ZC.MER_INIT.size = 80;


	// 0x29c
	PACKET.ZC.MER_PROPERTY = function PACKET_ZC_MER_PROPERTY(fp, end) {
		this.atk = fp.readShort();
		this.Matk = fp.readShort();
		this.hit = fp.readShort();
		this.critical = fp.readShort();
		this.def = fp.readShort();
		this.Mdef = fp.readShort();
		this.flee = fp.readShort();
		this.aspd = fp.readShort();
		this.name = fp.readString(24);
		this.level = fp.readShort();
		this.hp = fp.readShort();
		this.maxHP = fp.readShort();
		this.sp = fp.readShort();
		this.maxSP = fp.readShort();
		this.ExpireDate = fp.readLong();
		this.faith = fp.readShort();
		this.toal_call_num = fp.readLong();
		this.approval_monster_kill_counter = fp.readLong();
	};
	PACKET.ZC.MER_PROPERTY.size = 66;


	// 0x29d
	PACKET.ZC.MER_SKILLINFO_LIST = function PACKET_ZC_MER_SKILLINFO_LIST(fp, end) {
		this.skillList = (function() {
			var i, count=(end-fp.tell())/37|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].SKID = fp.readShort();
				out[i].type = fp.readLong();
				out[i].level = fp.readShort();
				out[i].spcost = fp.readShort();
				out[i].attackRange = fp.readShort();
				out[i].skillName = fp.readBinaryString(24);
				out[i].upgradable = fp.readChar();
			}
			return out;
		})();
	};
	PACKET.ZC.MER_SKILLINFO_LIST.size = -1;


	// 0x29e
	PACKET.ZC.MER_SKILLINFO_UPDATE = function PACKET_ZC_MER_SKILLINFO_UPDATE(fp, end) {
		this.SKID = fp.readUShort();
		this.level = fp.readShort();
		this.spcost = fp.readShort();
		this.attackRange = fp.readShort();
		this.upgradable = fp.readUChar();
	};
	PACKET.ZC.MER_SKILLINFO_UPDATE.size = 11;


	// 0x2a2
	PACKET.ZC.MER_PAR_CHANGE = function PACKET_ZC_MER_PAR_CHANGE(fp, end) {
		this.param = fp.readUShort();
		this.value = fp.readLong();
	};
	PACKET.ZC.MER_PAR_CHANGE.size = 8;


	// 0x2a3
	PACKET.ZC.GAMEGUARD_LINGO_KEY = function PACKET_ZC_GAMEGUARD_LINGO_KEY(fp, end) {
		this.packetType = fp.readShort();
		this.lingoKey = {};
		this.lingoKey.dwAlgNum = fp.readULong();
		this.lingoKey.dwAlgKey1 = fp.readULong();
		this.lingoKey.dwAlgKey2 = fp.readULong();
		this.lingoKey.dwSeed = fp.readULong();
	};
	PACKET.ZC.GAMEGUARD_LINGO_KEY.size = 18;


	// 0x2aa
	PACKET.ZC.REQ_CASH_PASSWORD = function PACKET_ZC_REQ_CASH_PASSWORD(fp, end) {
		this.Info = fp.readShort();
	};
	PACKET.ZC.REQ_CASH_PASSWORD.size = 4;


	// 0x2ac
	PACKET.ZC.RESULT_CASH_PASSWORD = function PACKET_ZC_RESULT_CASH_PASSWORD(fp, end) {
		this.Result = fp.readShort();
		this.ErrorCount = fp.readShort();
	};
	PACKET.ZC.RESULT_CASH_PASSWORD.size = 6;


	// 0x2ad
	PACKET.AC.REQUEST_SECOND_PASSWORD = function PACKET_AC_REQUEST_SECOND_PASSWORD(fp, end) {
		this.Result = fp.readShort();
		this.dwSeed = fp.readULong();
	};
	PACKET.AC.REQUEST_SECOND_PASSWORD.size = 8;


	// 0x2b1
	PACKET.ZC.ALL_QUEST_LIST = function PACKET_ZC_ALL_QUEST_LIST(fp, end) {
		this.questCount = fp.readLong();
		this.QuestList = (function() {
			var i, count=(end-fp.tell())/5|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].questID = fp.readULong();
				out[i].active = fp.readUChar();
			}
			return out;
		})();
	};
	PACKET.ZC.ALL_QUEST_LIST.size = -1;


	// 0x2b2
	PACKET.ZC.ALL_QUEST_MISSION = function PACKET_ZC_ALL_QUEST_MISSION(fp, end) {
		this.count = fp.readLong();
		this.QuestMissionList = (function() {
			var i, count=(end-fp.tell())/104|0, out=new Array(count);

			// [100] Moved here, should not make functions in a loop --majid
			function huntF() {
				var i, count = 3,
					out = new Array(count);
				for (i = 0; i < count; ++i) {
					out[i] = {};
					out[i].mobGID = fp.readULong();
					out[i].huntCount = fp.readShort();
					out[i].mobName = fp.readString(24);
				}
				return out;
			}

			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].questID = fp.readULong();
				out[i].quest_svrTime = fp.readLong();
				out[i].quest_endTime = fp.readLong();
				out[i].count = fp.readShort();
				out[i].hunt = huntF(); // [note: 100]
			}
			return out;
		})();
	};
	PACKET.ZC.ALL_QUEST_MISSION.size = -1;


	// 0x2b3
	PACKET.ZC.ADD_QUEST = function PACKET_ZC_ADD_QUEST(fp, end) {
		this.questID = fp.readULong();
		this.active = fp.readUChar();
		this.quest_svrTime = fp.readLong();
		this.quest_endTime = fp.readLong();
		this.count = fp.readShort();
		this.hunt = (function(count) {
			var i, out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].mobGID = fp.readULong();
				out[i].huntCount = fp.readShort();
				out[i].mobName = fp.readString(24);
			}
			return out;
		})(3);
	};
	PACKET.ZC.ADD_QUEST.size = 107;


	// 0x2b4
	PACKET.ZC.DEL_QUEST = function PACKET_ZC_DEL_QUEST(fp, end) {
		this.questID = fp.readULong();
	};
	PACKET.ZC.DEL_QUEST.size = 6;


	// 0x2b5
	PACKET.ZC.UPDATE_MISSION_HUNT = function PACKET_ZC_UPDATE_MISSION_HUNT(fp, end) {
		this.count = fp.readShort();
		this.MobHuntList = (function() {
			var i, count=(end-fp.tell())/12|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].questID = fp.readULong();
				out[i].mobGID = fp.readULong();
				out[i].maxCount = fp.readShort();
				out[i].count = fp.readShort();
			}
			return out;
		})();
	};
	PACKET.ZC.UPDATE_MISSION_HUNT.size = -1;


	// 0x2b7
	PACKET.ZC.ACTIVE_QUEST = function PACKET_ZC_ACTIVE_QUEST(fp, end) {
		this.questID = fp.readULong();
		this.active = fp.readUChar();
	};
	PACKET.ZC.ACTIVE_QUEST.size = 7;


	// 0x2b8
	PACKET.ZC.ITEM_PICKUP_PARTY = function PACKET_ZC_ITEM_PICKUP_PARTY(fp, end) {
		this.accountID = fp.readULong();
		this.ITID = fp.readUShort();
		this.IsIdentified = fp.readUChar();
		this.IsDamaged = fp.readUChar();
		this.RefiningLevel = fp.readUChar();
		this.slot = {};
		this.slot.card1 = fp.readUShort();
		this.slot.card2 = fp.readUShort();
		this.slot.card3 = fp.readUShort();
		this.slot.card4 = fp.readUShort();
		this.location = fp.readUShort();
		this.type = fp.readUChar();
	};
	PACKET.ZC.ITEM_PICKUP_PARTY.size = 22;


	// 0x2b9
	PACKET.ZC.SHORTCUT_KEY_LIST = function PACKET_ZC_SHORTCUT_KEY_LIST(fp, end) {
		this.ShortCutKey = (function() {
			var i, count = 27,
				out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].isSkill = fp.readChar();
				out[i].ID = fp.readULong();
				out[i].count = fp.readShort();
			}
			return out;
		})();
	};
	PACKET.ZC.SHORTCUT_KEY_LIST.size = 191;


	// 0x2bb
	PACKET.ZC.EQUIPITEM_DAMAGED = function PACKET_ZC_EQUIPITEM_DAMAGED(fp, end) {
		this.wearLocation = fp.readUShort();
		this.accountID = fp.readULong();
	};
	PACKET.ZC.EQUIPITEM_DAMAGED.size = 8;


	// 0x2bc
	PACKET.ZC.NOTIFY_PCBANG_PLAYING_TIME = function PACKET_ZC_NOTIFY_PCBANG_PLAYING_TIME(fp, end) {
		this.TimeMinute = fp.readLong();
	};
	PACKET.ZC.NOTIFY_PCBANG_PLAYING_TIME.size = 6;


	// 0x2bf
	PACKET.ZC.SRPACKETR2_INIT = function PACKET_ZC_SRPACKETR2_INIT(fp, end) {
		this.ProtectFactor = fp.readUShort();
		this.DeformSeedFactor = fp.readULong();
		this.DeformAddFactor = fp.readULong();
	};
	PACKET.ZC.SRPACKETR2_INIT.size = 12;


	// 0x2c1
	PACKET.ZC.NPC_CHAT = function PACKET_ZC_NPC_CHAT(fp, end) {
		this.accountID = fp.readULong();
		this.color = fp.readULong();
		this.msg = fp.readString(end - fp.tell());
	};
	PACKET.ZC.NPC_CHAT.size = -1;


	// 0x2c2
	PACKET.ZC.FORMATSTRING_MSG = function PACKET_ZC_FORMATSTRING_MSG(fp, end) {
		this.msg = fp.readUShort();
		this.value = fp.readString(end - fp.tell());
	};
	PACKET.ZC.FORMATSTRING_MSG.size = -1;


	// 0x2c5
	PACKET.ZC.PARTY_JOIN_REQ_ACK = function PACKET_ZC_PARTY_JOIN_REQ_ACK(fp, end) {
		this.characterName = fp.readString(24);
		this.answer = fp.readLong();
	};
	PACKET.ZC.PARTY_JOIN_REQ_ACK.size = 30;


	// 0x2c6
	PACKET.ZC.PARTY_JOIN_REQ = function PACKET_ZC_PARTY_JOIN_REQ(fp, end) {
		this.GRID = fp.readULong();
		this.groupName = fp.readString(24);
	};
	PACKET.ZC.PARTY_JOIN_REQ.size = 30;


	// 0x2c9
	PACKET.ZC.PARTY_CONFIG = function PACKET_ZC_PARTY_CONFIG(fp, end) {
		this.bRefuseJoinMsg = fp.readUChar();
	};
	PACKET.ZC.PARTY_CONFIG.size = 3;


	// 0x2ca
	PACKET.HC.REFUSE_SELECTCHAR = function PACKET_HC_REFUSE_SELECTCHAR(fp, end) {
		this.ErrorCode = fp.readUChar();
	};
	PACKET.HC.REFUSE_SELECTCHAR.size = 3;


	// 0x2cb
	PACKET.ZC.MEMORIALDUNGEON_SUBSCRIPTION_INFO = function PACKET_ZC_MEMORIALDUNGEON_SUBSCRIPTION_INFO(fp, end) {
		this.MemorialDungeonName = fp.readString(61);
		this.PriorityOrderNum = fp.readShort();
	};
	PACKET.ZC.MEMORIALDUNGEON_SUBSCRIPTION_INFO.size = 65;


	// 0x2cc
	PACKET.ZC.MEMORIALDUNGEON_SUBSCRIPTION_NOTIFY = function PACKET_ZC_MEMORIALDUNGEON_SUBSCRIPTION_NOTIFY(fp, end) {
		this.PriorityOrderNum = fp.readShort();
	};
	PACKET.ZC.MEMORIALDUNGEON_SUBSCRIPTION_NOTIFY.size = 4;


	// 0x2cd
	PACKET.ZC.MEMORIALDUNGEON_INFO = function PACKET_ZC_MEMORIALDUNGEON_INFO(fp, end) {
		this.MemorialDungeonName = fp.readString(61);
		this.DestroyDate = fp.readULong();
		this.EnterTimeOutDate = fp.readULong();
	};
	PACKET.ZC.MEMORIALDUNGEON_INFO.size = 71;


	// 0x2ce
	PACKET.ZC.MEMORIALDUNGEON_NOTIFY = function PACKET_ZC_MEMORIALDUNGEON_NOTIFY(fp, end) {
		this.Type = fp.readLong();
		this.EnterLimitDate = fp.readULong();
	};
	PACKET.ZC.MEMORIALDUNGEON_NOTIFY.size = 10;


	// 0x2d0
	PACKET.ZC.EQUIPMENT_ITEMLIST3 = function PACKET_ZC_EQUIPMENT_ITEMLIST3(fp, end) {
		this.ItemInfo = (function() {
			var i, count=(end-fp.tell())/28|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].location = fp.readUShort();
				out[i].WearState = fp.readUShort();
				out[i].IsDamaged = fp.readUChar();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].HireExpireDate = fp.readLong();
				out[i].bindOnEquipType = fp.readUShort();
				out[i].wItemSpriteNumber = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.EQUIPMENT_ITEMLIST3.size = -1;


	// 0x2d1
	PACKET.ZC.STORE_EQUIPMENT_ITEMLIST3 = function PACKET_ZC_STORE_EQUIPMENT_ITEMLIST3(fp, end) {
		this.ItemInfo = (function() {
			var i, count=(end-fp.tell())/28|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].location = fp.readUShort();
				out[i].WearState = fp.readUShort();
				out[i].IsDamaged = fp.readUChar();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].HireExpireDate = fp.readLong();
				out[i].bindOnEquipType = fp.readUShort();
				out[i].wItemSpriteNumber = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.STORE_EQUIPMENT_ITEMLIST3.size = -1;


	// 0x2d2
	PACKET.ZC.CART_EQUIPMENT_ITEMLIST3 = function PACKET_ZC_CART_EQUIPMENT_ITEMLIST3(fp, end) {
		this.ItemInfo = (function() {
			var i, count=(end-fp.tell())/28|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].location = fp.readUShort();
				out[i].WearState = fp.readUShort();
				out[i].IsDamaged = fp.readUChar();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].HireExpireDate = fp.readLong();
				out[i].bindOnEquipType = fp.readUShort();
				out[i].wItemSpriteNumber = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.CART_EQUIPMENT_ITEMLIST3.size = -1;


	// 0x2d3
	PACKET.ZC.NOTIFY_BIND_ON_EQUIP = function PACKET_ZC_NOTIFY_BIND_ON_EQUIP(fp, end) {
		this.index = fp.readUShort();
	};
	PACKET.ZC.NOTIFY_BIND_ON_EQUIP.size = 4;


	// 0x2d4
	PACKET.ZC.ITEM_PICKUP_ACK3 = function PACKET_ZC_ITEM_PICKUP_ACK3(fp, end) {
		this.index = fp.readUShort();
		this.count = fp.readUShort();
		this.ITID = fp.readUShort();
		this.IsIdentified = fp.readUChar();
		this.IsDamaged = fp.readUChar();
		this.RefiningLevel = fp.readUChar();
		this.slot = {};
		this.slot.card1 = fp.readUShort();
		this.slot.card2 = fp.readUShort();
		this.slot.card3 = fp.readUShort();
		this.slot.card4 = fp.readUShort();
		this.location = fp.readUShort();
		this.type = fp.readUChar();
		this.result = fp.readUChar();
		this.HireExpireDate = fp.readLong();
		this.bindOnEquipType = fp.readUShort();
	};
	PACKET.ZC.ITEM_PICKUP_ACK3.size = 29;


	// 0x2d5
	PACKET.ZC.ISVR_DISCONNECT = function PACKET_ZC_ISVR_DISCONNECT(fp, end) {};
	PACKET.ZC.ISVR_DISCONNECT.size = 2;


	// 0x2d7
	PACKET.ZC.EQUIPWIN_MICROSCOPE = function PACKET_ZC_EQUIPWIN_MICROSCOPE(fp, end) {
		this.characterName = fp.readString(24);
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.accessory = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.sex = fp.readUChar();
		this.ItemInfo = (function() {
			var i, count = (end - fp.tell()) / 28 | 0,
				out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].location = fp.readUShort();
				out[i].WearState = fp.readUShort();
				out[i].IsDamaged = fp.readUChar();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].HireExpireDate = fp.readLong();
				out[i].bindOnEquipType = fp.readUShort();
				out[i].wItemSpriteNumber = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.EQUIPWIN_MICROSCOPE.size = -1;


	// 0x2d9
	PACKET.ZC.CONFIG = function PACKET_ZC_CONFIG(fp, end) {
		this.Config = fp.readLong();
		this.Value = fp.readLong();
	};
	PACKET.ZC.CONFIG.size = 10;


	// 0x2da
	PACKET.ZC.CONFIG_NOTIFY = function PACKET_ZC_CONFIG_NOTIFY(fp, end) {
		this.bOpenEquipmentWin = fp.readUChar();
	};
	PACKET.ZC.CONFIG_NOTIFY.size = 3;


	// 0x2dc
	PACKET.ZC.BATTLEFIELD_CHAT = function PACKET_ZC_BATTLEFIELD_CHAT(fp, end) {
		this.accountID = fp.readULong();
		this.name = fp.readString(24);
		this.msg = fp.readString(end - fp.tell());
	};
	PACKET.ZC.BATTLEFIELD_CHAT.size = -1;


	// 0x2dd
	PACKET.ZC.BATTLEFIELD_NOTIFY_CAMPINFO = function PACKET_ZC_BATTLEFIELD_NOTIFY_CAMPINFO(fp, end) {
		this.accountID = fp.readULong();
		this.name = fp.readString(24);
		this.camp = fp.readShort();
	};
	PACKET.ZC.BATTLEFIELD_NOTIFY_CAMPINFO.size = 32;


	// 0x2de
	PACKET.ZC.BATTLEFIELD_NOTIFY_POINT = function PACKET_ZC_BATTLEFIELD_NOTIFY_POINT(fp, end) {
		this.pointCampA = fp.readShort();
		this.pointCampB = fp.readShort();
	};
	PACKET.ZC.BATTLEFIELD_NOTIFY_POINT.size = 6;


	// 0x2df
	PACKET.ZC.BATTLEFIELD_NOTIFY_POSITION = function PACKET_ZC_BATTLEFIELD_NOTIFY_POSITION(fp, end) {
		this.accountID = fp.readULong();
		this.name = fp.readString(24);
		this.job = fp.readUShort();
		this.x = fp.readShort();
		this.y = fp.readShort();
	};
	PACKET.ZC.BATTLEFIELD_NOTIFY_POSITION.size = 36;


	// 0x2e0
	PACKET.ZC.BATTLEFIELD_NOTIFY_HP = function PACKET_ZC_BATTLEFIELD_NOTIFY_HP(fp, end) {
		this.accountID = fp.readULong();
		this.name = fp.readString(24);
		this.hp = fp.readShort();
		this.maxHp = fp.readShort();
	};
	PACKET.ZC.BATTLEFIELD_NOTIFY_HP.size = 34;


	// 0x2e1
	PACKET.ZC.NOTIFY_ACT2 = function PACKET_ZC_NOTIFY_ACT2(fp, end) {
		this.GID = fp.readULong();
		this.targetGID = fp.readULong();
		this.startTime = fp.readULong();
		this.attackMT = fp.readLong();
		this.attackedMT = fp.readLong();
		this.damage = fp.readLong();
		this.count = fp.readShort();
		this.action = fp.readUChar();
		this.leftDamage = fp.readLong();
	};
	PACKET.ZC.NOTIFY_ACT2.size = 33;


	// 0x2e7
	PACKET.ZC.MAPPROPERTY = function PACKET_ZC_MAPPROPERTY(fp, end) {
		this.type = fp.readShort();
		this.mapInfoTable = (function() {
			var count = (end - fp.tell()) / 4 | 0,
				out = new Array(count);
			for (var i = 0; i < count; ++i)
				out[i] = fp.readLong();
			return out;
		})();
	};
	PACKET.ZC.MAPPROPERTY.size = -1;


	// 0x2e8
	PACKET.ZC.NORMAL_ITEMLIST3 = function PACKET_ZC_NORMAL_ITEMLIST3(fp, end) {
		this.ItemInfo = (function() {
			var i, count = (end - fp.tell()) / 22 | 0,
				out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].count = fp.readShort();
				out[i].WearState = fp.readUShort();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].HireExpireDate = fp.readLong();
			}
			return out;
		})();
	};
	PACKET.ZC.NORMAL_ITEMLIST3.size = -1;


	// 0x2e9
	PACKET.ZC.CART_NORMAL_ITEMLIST3 = function PACKET_ZC_CART_NORMAL_ITEMLIST3(fp, end) {
		this.ItemInfo = (function() {
			var i, count = (end - fp.tell()) / 22 | 0,
				out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].count = fp.readShort();
				out[i].WearState = fp.readUShort();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].HireExpireDate = fp.readLong();
			}
			return out;
		})();
	};
	PACKET.ZC.CART_NORMAL_ITEMLIST3.size = -1;


	// 0x2ea
	PACKET.ZC.STORE_NORMAL_ITEMLIST3 = function PACKET_ZC_STORE_NORMAL_ITEMLIST3(fp, end) {
		this.ItemInfo = (function() {
			var i, count = (end - fp.tell()) / 22 | 0,
				out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].count = fp.readShort();
				out[i].WearState = fp.readUShort();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].HireExpireDate = fp.readLong();
			}
			return out;
		})();
	};
	PACKET.ZC.STORE_NORMAL_ITEMLIST3.size = -1;


	// 0x2eb
	PACKET.ZC.ACCEPT_ENTER2 = function PACKET_ZC_ACCEPT_ENTER2(fp, end) {
		this.startTime = fp.readULong();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.font = fp.readShort();
	};
	PACKET.ZC.ACCEPT_ENTER2.size = 13;


	// 0x2ec
	PACKET.ZC.NOTIFY_MOVEENTRY4 = function PACKET_ZC_NOTIFY_MOVEENTRY4(fp, end) {
		this.objecttype = fp.readUChar();
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.moveStartTime = fp.readULong();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.MoveData = fp.readPos2();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.clevel = fp.readShort();
		this.font = fp.readShort();
	};
	PACKET.ZC.NOTIFY_MOVEENTRY4.size = 67;


	// 0x2ed
	PACKET.ZC.NOTIFY_NEWENTRY4 = function PACKET_ZC_NOTIFY_NEWENTRY4(fp, end) {
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.clevel = fp.readShort();
		this.font = fp.readShort();
	};
	PACKET.ZC.NOTIFY_NEWENTRY4.size = 59;


	// 0x2ee
	PACKET.ZC.NOTIFY_STANDENTRY4 = function PACKET_ZC_NOTIFY_STANDENTRY4(fp, end) {
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.state = fp.readUChar();
		this.clevel = fp.readShort();
		this.font = fp.readShort();
	};
	PACKET.ZC.NOTIFY_STANDENTRY4.size = 60;


	// 0x2ef
	PACKET.ZC.NOTIFY_FONT = function PACKET_ZC_NOTIFY_FONT(fp, end) {
		this.AID = fp.readULong();
		this.font = fp.readShort();
	};
	PACKET.ZC.NOTIFY_FONT.size = 8;


	// 0x2f0
	PACKET.ZC.PROGRESS = function PACKET_ZC_PROGRESS(fp, end) {
		this.color = fp.readULong();
		this.time = fp.readULong();
	};
	PACKET.ZC.PROGRESS.size = 10;


	// 0x2f2
	PACKET.ZC.PROGRESS_CANCEL = function PACKET_ZC_PROGRESS_CANCEL(fp, end) {};
	PACKET.ZC.PROGRESS_CANCEL.size = 2;


	// 0x35d
	PACKET.ZC.SIMPLE_CASHSHOP_POINT_ITEMLIST = function PACKET_ZC_SIMPLE_CASHSHOP_POINT_ITEMLIST(fp, end) {
		this.CashPoint = fp.readULong();
		this.md_itemcount = fp.readShort();
		this.md_itemSize = fp.readShort();
		this.best_itemcount = fp.readShort();
		this.best_itemsize = fp.readShort();
		this.ItemList = (function() {
			var i, count = (end - fp.tell()) / 11 | 0,
				out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].price = fp.readLong();
				out[i].discountprice = fp.readLong();
				out[i].type = fp.readUChar();
				out[i].ITID = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.SIMPLE_CASHSHOP_POINT_ITEMLIST.size = -1;


	// 0x3dd
	PACKET.AHC.GAME_GUARD = function PACKET_AHC_GAME_GUARD(fp, end) {
		this.AuthData = (function() {
			var count = 4,
				out = new Array(count);
			for (var i = 0; i < count; ++i)
				out[i] = fp.readULong();
			return out;
		})();
	};
	PACKET.AHC.GAME_GUARD.size = 18;


	// 0x3de
	PACKET.CAH.ACK_GAME_GUARD = function PACKET_CAH_ACK_GAME_GUARD(fp, end) {
		this.AuthData = (function() {
			var count = 4,
				out = new Array(count);
			for (var i = 0; i < count; ++i)
				out[i] = fp.readULong();
			return out;
		})();
	};
	PACKET.CAH.ACK_GAME_GUARD.size = 18;


	// 0x43d
	PACKET.ZC.SKILL_POSTDELAY = function PACKET_ZC_SKILL_POSTDELAY(fp, end) {
		this.SKID = fp.readUShort();
		this.DelayTM = fp.readULong();
	};
	PACKET.ZC.SKILL_POSTDELAY.size = 8;


	// 0x43e
	PACKET.ZC.SKILL_POSTDELAY_LIST = function PACKET_ZC_SKILL_POSTDELAY_LIST(fp, end) {
		this.delayList = (function() {
			var i, count = (end - fp.tell()) / 6 | 0,
				out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].SKID = fp.readUShort();
				out[i].DelayTM = fp.readULong();
			}
			return out;
		})();
	};
	PACKET.ZC.SKILL_POSTDELAY_LIST.size = -1;


	// 0x43f
	PACKET.ZC.MSG_STATE_CHANGE2 = function PACKET_ZC_MSG_STATE_CHANGE2(fp, end) {
		this.index = fp.readShort();
		this.AID = fp.readULong();
		this.state = fp.readUChar();
		this.RemainMS = fp.readULong();
		this.val = (function() {
			var count = 3,
				out = new Array(count);
			for (var i = 0; i < count; ++i)
				out[i] = fp.readLong();
			return out;
		})();
	};
	PACKET.ZC.MSG_STATE_CHANGE2.size = 25;


	// 0x440
	PACKET.ZC.MILLENNIUMSHIELD = function PACKET_ZC_MILLENNIUMSHIELD(fp, end) {
		this.AID = fp.readULong();
		this.num = fp.readShort();
		this.state = fp.readShort();
	};
	PACKET.ZC.MILLENNIUMSHIELD.size = 10;


	// 0x441
	PACKET.ZC.SKILLINFO_DELETE = function PACKET_ZC_SKILLINFO_DELETE(fp, end) {
		this.SKID = fp.readUShort();
	};
	PACKET.ZC.SKILLINFO_DELETE.size = 4;


	// 0x442
	PACKET.ZC.SKILL_SELECT_REQUEST = function PACKET_ZC_SKILL_SELECT_REQUEST(fp, end) {
		this.why = fp.readLong();
		this.SKIDList = (function() {
			var count = (end - fp.tell()) / 2 | 0,
				out = new Array(count);
			for (var i = 0; i < count; ++i)
				out[i] = fp.readUShort();
			return out;
		})();
	};
	PACKET.ZC.SKILL_SELECT_REQUEST.size = -1;


	// 0x444
	PACKET.ZC.SIMPLE_CASH_POINT_ITEMLIST = function PACKET_ZC_SIMPLE_CASH_POINT_ITEMLIST(fp, end) {
		this.CashPoint = fp.readULong();
		this.ItemList = (function() {
			var i, count = (end - fp.tell()) / 11 | 0,
				out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].price = fp.readLong();
				out[i].discountprice = fp.readLong();
				out[i].type = fp.readUChar();
				out[i].ITID = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.SIMPLE_CASH_POINT_ITEMLIST.size = -1;


	// 0x446
	PACKET.ZC.QUEST_NOTIFY_EFFECT = function PACKET_ZC_QUEST_NOTIFY_EFFECT(fp, end) {
		this.npcID = fp.readULong();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
		this.effect = fp.readShort();
		this.type = fp.readShort();
	};
	PACKET.ZC.QUEST_NOTIFY_EFFECT.size = 14;


	// 0x448
	PACKET.HC.CHARACTER_LIST = function PACKET_HC_CHARACTER_LIST(fp, end) {
		this.CharacterList = (function() {
			var i, count = (end - fp.tell()) / 5 | 0,
				out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].dwGID = fp.readULong();
				out[i].SlotIdx = fp.readUChar();
			}
			return out;
		})();
	};
	PACKET.HC.CHARACTER_LIST.size = -1;


	// 0x449
	PACKET.ZC.HACKSH_ERROR_MSG = function PACKET_ZC_HACKSH_ERROR_MSG(fp, end) {
		this.ErrorID = fp.readShort();
	};
	PACKET.ZC.HACKSH_ERROR_MSG.size = 4;


	// 0x7d0
	PACKET.ZC.ES_RESULT = function PACKET_ZC_ES_RESULT(fp, end) {
		this.esNo = fp.readShort();
		this.esMsg = fp.readShort();
	};
	PACKET.ZC.ES_RESULT.size = 6;


	// 0x7d2
	PACKET.ZC.ES_LIST = function PACKET_ZC_ES_LIST(fp, end) {
		this.Count = fp.readShort();
	};
	PACKET.ZC.ES_LIST.size = 6;


	// 0x7d5
	PACKET.ZC.ES_READY = function PACKET_ZC_ES_READY(fp, end) {
		this.esNo = fp.readShort();
	};
	PACKET.ZC.ES_READY.size = 4;


	// 0x7d6
	PACKET.ZC.ES_GOTO = function PACKET_ZC_ES_GOTO(fp, end) {
		this.esNo = fp.readShort();
	};
	PACKET.ZC.ES_GOTO.size = 4;


	// 0x7d8
	PACKET.ZC.REQ_GROUPINFO_CHANGE_V2 = function PACKET_ZC_REQ_GROUPINFO_CHANGE_V2(fp, end) {
		this.expOption = fp.readULong();
		this.ItemPickupRule = fp.readUChar();
		this.ItemDivisionRule = fp.readUChar();
	};
	PACKET.ZC.REQ_GROUPINFO_CHANGE_V2.size = 8;


	// 0x7d9
	PACKET.ZC.SHORTCUT_KEY_LIST_V2 = function PACKET_ZC_SHORTCUT_KEY_LIST_V2(fp, end) {
		this.ShortCutKey = (function() {
			var i, count = 38,
				out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].isSkill = fp.readChar();
				out[i].ID = fp.readULong();
				out[i].count = fp.readShort();
			}
			return out;
		})();
	};
	PACKET.ZC.SHORTCUT_KEY_LIST_V2.size = 268;


	// 0x7db
	PACKET.ZC.HO_PAR_CHANGE = function PACKET_ZC_HO_PAR_CHANGE(fp, end) {
		this.param = fp.readUShort();
		this.value = fp.readLong();
	};
	PACKET.ZC.HO_PAR_CHANGE.size = 8;


	// 0x7dd
	PACKET.ZC.SEEK_PARTY = function PACKET_ZC_SEEK_PARTY(fp, end) {
		this.Name = fp.readString(24);
		this.Job = fp.readULong();
		this.Level = fp.readULong();
		this.mapName = fp.readBinaryString(16);
		this.Option = fp.readULong();
	};
	PACKET.ZC.SEEK_PARTY.size = 54;


	// 0x7df
	PACKET.ZC.SEEK_PARTY_MEMBER = function PACKET_ZC_SEEK_PARTY_MEMBER(fp, end) {
		this.Name = fp.readString(24);
		this.Job = fp.readULong();
		this.Level = fp.readULong();
		this.mapName = fp.readBinaryString(16);
		this.Option = fp.readULong();
	};
	PACKET.ZC.SEEK_PARTY_MEMBER.size = 54;


	// 0x7e0
	PACKET.ZC.ES_NOTI_MYINFO = function PACKET_ZC_ES_NOTI_MYINFO(fp, end) {
		this.esNo = fp.readShort();
		this.esname = fp.readString(54);
	};
	PACKET.ZC.ES_NOTI_MYINFO.size = 58;


	// 0x7e1
	PACKET.ZC.SKILLINFO_UPDATE2 = function PACKET_ZC_SKILLINFO_UPDATE2(fp, end) {
		this.SKID = fp.readUShort();
		this.type = fp.readLong();
		this.level = fp.readShort();
		this.spcost = fp.readShort();
		this.attackRange = fp.readShort();
		this.upgradable = fp.readUChar();
	};
	PACKET.ZC.SKILLINFO_UPDATE2.size = 15;


	// 0x7e2
	PACKET.ZC.MSG_VALUE = function PACKET_ZC_MSG_VALUE(fp, end) {
		this.msg = fp.readUShort();
		this.value = fp.readLong();
	};
	PACKET.ZC.MSG_VALUE.size = 8;


	// 0x7e3
	PACKET.ZC.ITEMLISTWIN_OPEN = function PACKET_ZC_ITEMLISTWIN_OPEN(fp, end) {
		this.Type = fp.readLong();
	};
	PACKET.ZC.ITEMLISTWIN_OPEN.size = 6;


	// 0x7e6
	PACKET.ZC.MSG_SKILL = function PACKET_ZC_MSG_SKILL(fp, end) {
		this.SKID = fp.readUShort();
		this.MSGID = fp.readLong();
	};
	PACKET.ZC.MSG_SKILL.size = 8;


	// 0x7e8
	PACKET.HC.CHECKBOT = function PACKET_HC_CHECKBOT(fp, end) {
		this.img = fp.readBinaryString(end - fp.tell());
	};
	PACKET.HC.CHECKBOT.size = -1;


	// 0x7e9
	PACKET.HC.CHECKBOT_RESULT = function PACKET_HC_CHECKBOT_RESULT(fp, end) {
		this.Result = fp.readUChar();
	};
	PACKET.HC.CHECKBOT_RESULT.size = 5;


	// 0x7eb
	PACKET.ZC.BATTLE_FIELD_LIST = function PACKET_ZC_BATTLE_FIELD_LIST(fp, end) {
		this.Count = fp.readShort();
		this.ack_type = fp.readShort();
		this.InfoList = (function() {
			var i, count = (end - fp.tell()) / 62 | 0,
				out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].BFNO = fp.readULong();
				out[i].BattleFieldName = fp.readString(56);
				out[i].JoinTeam = fp.readShort();
			}
			return out;
		})();
	};
	PACKET.ZC.BATTLE_FIELD_LIST.size = -1;


	// 0x7ed
	PACKET.ZC.JOIN_BATTLE_FIELD = function PACKET_ZC_JOIN_BATTLE_FIELD(fp, end) {
		this.BFNO = fp.readULong();
		this.JoinTeam = fp.readShort();
		this.Result = fp.readShort();
	};
	PACKET.ZC.JOIN_BATTLE_FIELD.size = 10;


	// 0x7ef
	PACKET.ZC.CANCEL_BATTLE_FIELD = function PACKET_ZC_CANCEL_BATTLE_FIELD(fp, end) {
		this.BFNO = fp.readULong();
		this.Result = fp.readShort();
	};
	PACKET.ZC.CANCEL_BATTLE_FIELD.size = 8;


	// 0x7f1
	PACKET.ZC.ACK_BATTLE_STATE_MONITOR = function PACKET_ZC_ACK_BATTLE_STATE_MONITOR(fp, end) {
		this.BFNO = fp.readULong();
		this.PlayCount = fp.readShort();
		this.BattleState = fp.readShort();
		this.TeamCount_A = fp.readShort();
		this.TeamCount_B = fp.readShort();
		this.MyCount = fp.readShort();
		this.JoinTeam = fp.readShort();
	};
	PACKET.ZC.ACK_BATTLE_STATE_MONITOR.size = 18;


	// 0x7f2
	PACKET.ZC.BATTLE_NOTI_START_STEP = function PACKET_ZC_BATTLE_NOTI_START_STEP(fp, end) {
		this.BFNO = fp.readULong();
		this.Result = fp.readShort();
	};
	PACKET.ZC.BATTLE_NOTI_START_STEP.size = 8;


	// 0x7f3
	PACKET.ZC.BATTLE_JOIN_NOTI_DEFER = function PACKET_ZC_BATTLE_JOIN_NOTI_DEFER(fp, end) {
		this.BFNO = fp.readULong();
	};
	PACKET.ZC.BATTLE_JOIN_NOTI_DEFER.size = 6;


	// 0x7f4
	PACKET.ZC.BATTLE_JOIN_DISABLE_STATE = function PACKET_ZC_BATTLE_JOIN_DISABLE_STATE(fp, end) {
		this.Enable = fp.readUChar();
	};
	PACKET.ZC.BATTLE_JOIN_DISABLE_STATE.size = 3;


	// 0x7f6
	PACKET.ZC.NOTIFY_EXP = function PACKET_ZC_NOTIFY_EXP(fp, end) {
		this.AID = fp.readULong();
		this.amount = fp.readLong();
		this.varID = fp.readUShort();
		this.expType = fp.readShort();
	};
	PACKET.ZC.NOTIFY_EXP.size = 14;


	// 0x7f7
	PACKET.ZC.NOTIFY_MOVEENTRY5 = function PACKET_ZC_NOTIFY_MOVEENTRY7(fp, end) {
		this.objecttype = fp.readUChar();
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.moveStartTime = fp.readULong();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.MoveData = fp.readPos2();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.clevel = fp.readShort();
		this.font = fp.readShort();
		this.name = fp.readString(end - fp.tell());
	};
	PACKET.ZC.NOTIFY_MOVEENTRY5.size = -1;


	// 0x7f8
	PACKET.ZC.NOTIFY_NEWENTRY5 = function PACKET_ZC_NOTIFY_NEWENTRY5(fp, end) {
		this.objecttype = fp.readUChar();
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.clevel = fp.readShort();
		this.font = fp.readShort();
		this.name = fp.readString(end - fp.tell());
	};
	PACKET.ZC.NOTIFY_NEWENTRY5.size = -1;


	// 0x7f9
	PACKET.ZC.NOTIFY_STANDENTRY5 = function PACKET_ZC_NOTIFY_STANDENTRY5(fp, end) {
		this.objecttype = fp.readUChar();
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.state = fp.readUChar();
		this.clevel = fp.readShort();
		this.font = fp.readShort();
		this.name = fp.readString(end - fp.tell());
	};
	PACKET.ZC.NOTIFY_STANDENTRY5.size = -1;


	// 0x7fa
	PACKET.ZC.DELETE_ITEM_FROM_BODY = function PACKET_ZC_DELETE_ITEM_FROM_BODY(fp, end) {
		this.DeleteType = fp.readShort();
		this.Index = fp.readUShort();
		this.Count = fp.readShort();
	};
	PACKET.ZC.DELETE_ITEM_FROM_BODY.size = 8;


	// 0x7fb
	PACKET.ZC.USESKILL_ACK2 = function PACKET_ZC_USESKILL_ACK2(fp, end) {
		this.AID = fp.readULong();
		this.targetID = fp.readULong();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
		this.SKID = fp.readUShort();
		this.property = fp.readULong();
		this.delayTime = fp.readULong();
		this.isDisposable = fp.readUChar();
	};
	PACKET.ZC.USESKILL_ACK2.size = 25;


	// 0x7fc
	PACKET.ZC.CHANGE_GROUP_MASTER = function PACKET_ZC_CHANGE_GROUP_MASTER(fp, end) {
		this.OldMasterAID = fp.readULong();
		this.NewMasterAID = fp.readULong();
	};
	PACKET.ZC.CHANGE_GROUP_MASTER.size = 10;


	// 0x7fe
	PACKET.ZC.PLAY_NPC_BGM = function PACKET_ZC_PLAY_NPC_BGM(fp, end) {
		this.Bgm = fp.readBinaryString(24);
	};
	PACKET.ZC.PLAY_NPC_BGM.size = 26;


	// 0x7ff
	PACKET.ZC.DEFINE_CHECK = function PACKET_ZC_DEFINE_CHECK(fp, end) {
		this.Result = fp.readLong();
	};
	PACKET.ZC.DEFINE_CHECK.size = 8;


	// 0x800
	PACKET.ZC.PC_PURCHASE_ITEMLIST_FROMMC2 = function PACKET_ZC_PC_PURCHASE_ITEMLIST_FROMMC2(fp, end) {
		this.AID = fp.readULong();
		this.UniqueID = fp.readULong();
		this.itemList = (function() {
			var i, count = (end - fp.tell()) / 22 | 0,
				out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].price = fp.readLong();
				out[i].count = fp.readShort();
				out[i].index = fp.readShort();
				out[i].type = fp.readUChar();
				out[i].ITID = fp.readUShort();
				out[i].IsIdentified = fp.readUChar();
				out[i].IsDamaged = fp.readUChar();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.PC_PURCHASE_ITEMLIST_FROMMC2.size = -1;


	// 0x803
	PACKET.ZC.PARTY_BOOKING_ACK_REGISTER = function PACKET_ZC_PARTY_BOOKING_ACK_REGISTER(fp, end) {
		this.Result = fp.readShort();
	};
	PACKET.ZC.PARTY_BOOKING_ACK_REGISTER.size = 4;


	// 0x805
	PACKET.ZC.PARTY_BOOKING_ACK_SEARCH = function PACKET_ZC_PARTY_BOOKING_ACK_SEARCH(fp, end) {
		this.IsExistMoreResult = fp.readUChar();
		this.Info = (function() {
			var i, count = (end - fp.tell()) / 48 | 0,
				out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].Index = fp.readULong();
				out[i].CharName = fp.readString(24);
				out[i].ExpireTime = fp.readLong();
				out[i].Detail = {};
				out[i].Detail.Level = fp.readShort();
				out[i].Detail.MapID = fp.readShort();
				out[i].Detail.Job = (function() {
					var count = 6,
						out = new Array(count);
					for (var i = 0; i < count; ++i)
						out[i] = fp.readShort();
					return out;
				})();
			}
			return out;
		})();
	};
	PACKET.ZC.PARTY_BOOKING_ACK_SEARCH.size = -1;


	// 0x807
	PACKET.ZC.PARTY_BOOKING_ACK_DELETE = function PACKET_ZC_PARTY_BOOKING_ACK_DELETE(fp, end) {
		this.Result = fp.readShort();
	};
	PACKET.ZC.PARTY_BOOKING_ACK_DELETE.size = 4;


	// 0x809
	PACKET.ZC.PARTY_BOOKING_NOTIFY_INSERT = function PACKET_ZC_PARTY_BOOKING_NOTIFY_INSERT(fp, end) {
		this.Info = {};
		this.Info.Index = fp.readULong();
		this.Info.CharName = fp.readString(24);
		this.Info.ExpireTime = fp.readLong();
		this.Info.Detail = {};
		this.Info.Detail.Level = fp.readShort();
		this.Info.Detail.MapID = fp.readShort();
		this.Info.Detail.Job1 = fp.readShort();
		this.Info.Detail.Job2 = fp.readShort();
		this.Info.Detail.Job3 = fp.readShort();
		this.Info.Detail.Job4 = fp.readShort();
		this.Info.Detail.Job5 = fp.readShort();
		this.Info.Detail.Job6 = fp.readShort();
	};
	PACKET.ZC.PARTY_BOOKING_NOTIFY_INSERT.size = 50;


	// 0x80a
	PACKET.ZC.PARTY_BOOKING_NOTIFY_UPDATE = function PACKET_ZC_PARTY_BOOKING_NOTIFY_UPDATE(fp, end) {
		this.Index = fp.readULong();
		this.Job1 = fp.readShort();
		this.Job2 = fp.readShort();
		this.Job3 = fp.readShort();
		this.Job4 = fp.readShort();
		this.Job5 = fp.readShort();
		this.Job6 = fp.readShort();
	};
	PACKET.ZC.PARTY_BOOKING_NOTIFY_UPDATE.size = 18;


	// 0x80b
	PACKET.ZC.PARTY_BOOKING_NOTIFY_DELETE = function PACKET_ZC_PARTY_BOOKING_NOTIFY_DELETE(fp, end) {
		this.Index = fp.readULong();
	};
	PACKET.ZC.PARTY_BOOKING_NOTIFY_DELETE.size = 6;


	// 0x80d
	PACKET.ZC.SIMPLE_CASH_BTNSHOW = function PACKET_ZC_SIMPLE_CASH_BTNSHOW(fp, end) {
		this.show = fp.readUChar();
	};
	PACKET.ZC.SIMPLE_CASH_BTNSHOW.size = 3;


	// 0x80e
	PACKET.ZC.NOTIFY_HP_TO_GROUPM_R2 = function PACKET_ZC_NOTIFY_HP_TO_GROUPM_R2(fp, end) {
		this.AID = fp.readULong();
		this.hp = fp.readLong();
		this.maxhp = fp.readLong();
	};
	PACKET.ZC.NOTIFY_HP_TO_GROUPM_R2.size = 14;


	// 0x80f
	PACKET.ZC.ADD_EXCHANGE_ITEM2 = function PACKET_ZC_ADD_EXCHANGE_ITEM2(fp, end) {
		this.ITID = fp.readUShort();
		this.type = fp.readUChar();
		this.count = fp.readLong();
		this.IsIdentified = fp.readUChar();
		this.IsDamaged = fp.readUChar();
		this.RefiningLevel = fp.readUChar();
		this.slot = {};
		this.slot.card1 = fp.readUShort();
		this.slot.card2 = fp.readUShort();
		this.slot.card3 = fp.readUShort();
		this.slot.card4 = fp.readUShort();
	};
	PACKET.ZC.ADD_EXCHANGE_ITEM2.size = 20;


	// 0x810
	PACKET.ZC.OPEN_BUYING_STORE = function PACKET_ZC_OPEN_BUYING_STORE(fp, end) {
		this.count = fp.readUChar();
	};
	PACKET.ZC.OPEN_BUYING_STORE.size = 3;


	// 0x812
	PACKET.ZC.FAILED_OPEN_BUYING_STORE_TO_BUYER = function PACKET_ZC_FAILED_OPEN_BUYING_STORE_TO_BUYER(fp, end) {
		this.Result = fp.readShort();
		this.total_weight = fp.readLong();
	};
	PACKET.ZC.FAILED_OPEN_BUYING_STORE_TO_BUYER.size = 8;


	// 0x813
	PACKET.ZC.MYITEMLIST_BUYING_STORE = function PACKET_ZC_MYITEMLIST_BUYING_STORE(fp, end) {
		this.AID = fp.readULong();
		this.limitZeny = fp.readLong();
		this.ItemList = (function() {
			var i, count = (end - fp.tell()) / 9 | 0,
				out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].price = fp.readLong();
				out[i].count = fp.readShort();
				out[i].type = fp.readUChar();
				out[i].ITID = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.MYITEMLIST_BUYING_STORE.size = -1;


	// 0x814
	PACKET.ZC.BUYING_STORE_ENTRY = function PACKET_ZC_BUYING_STORE_ENTRY(fp, end) {
		this.makerAID = fp.readULong();
		this.storeName = fp.readString(80);
	};
	PACKET.ZC.BUYING_STORE_ENTRY.size = 86;


	// 0x816
	PACKET.ZC.DISAPPEAR_BUYING_STORE_ENTRY = function PACKET_ZC_DISAPPEAR_BUYING_STORE_ENTRY(fp, end) {
		this.makerAID = fp.readULong();
	};
	PACKET.ZC.DISAPPEAR_BUYING_STORE_ENTRY.size = 6;


	// 0x818
	PACKET.ZC.ACK_ITEMLIST_BUYING_STORE = function PACKET_ZC_ACK_ITEMLIST_BUYING_STORE(fp, end) {
		this.makerAID = fp.readULong();
		this.StoreID = fp.readULong();
		this.limitZeny = fp.readLong();
		this.ItemList = (function() {
			var i, count = (end - fp.tell()) / 9 | 0,
				out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].price = fp.readLong();
				out[i].count = fp.readShort();
				out[i].type = fp.readUChar();
				out[i].ITID = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.ACK_ITEMLIST_BUYING_STORE.size = -1;


	// 0x81a
	PACKET.ZC.FAILED_TRADE_BUYING_STORE_TO_BUYER = function PACKET_ZC_FAILED_TRADE_BUYING_STORE_TO_BUYER(fp, end) {
		this.Result = fp.readShort();
	};
	PACKET.ZC.FAILED_TRADE_BUYING_STORE_TO_BUYER.size = 4;


	// 0x81b
	PACKET.ZC.UPDATE_ITEM_FROM_BUYING_STORE = function PACKET_ZC_UPDATE_ITEM_FROM_BUYING_STORE(fp, end) {
		this.ITID = fp.readUShort();
		this.count = fp.readShort();
		this.limitZeny = fp.readLong();
	};
	PACKET.ZC.UPDATE_ITEM_FROM_BUYING_STORE.size = 10;


	// 0x81c
	PACKET.ZC.ITEM_DELETE_BUYING_STORE = function PACKET_ZC_ITEM_DELETE_BUYING_STORE(fp, end) {
		this.index = fp.readShort();
		this.count = fp.readShort();
		this.zeny = fp.readLong();
	};
	PACKET.ZC.ITEM_DELETE_BUYING_STORE.size = 10;


	// 0x81d
	PACKET.ZC.EL_INIT = function PACKET_ZC_EL_INIT(fp, end) {
		this.AID = fp.readLong();
		this.hp = fp.readLong();
		this.maxHP = fp.readLong();
		this.sp = fp.readLong();
		this.maxSP = fp.readLong();
	};
	PACKET.ZC.EL_INIT.size = 22;


	// 0x81e
	PACKET.ZC.EL_PAR_CHANGE = function PACKET_ZC_EL_PAR_CHANGE(fp, end) {
		this.param = fp.readUShort();
		this.value = fp.readLong();
	};
	PACKET.ZC.EL_PAR_CHANGE.size = 8;


	// 0x81f
	PACKET.ZC.BROADCAST4 = function PACKET_ZC_BROADCAST4(fp, end) {
		this.PakcetType = fp.readShort();
		this.Msgtype = fp.readUChar();
		this.ColorRGB = fp.readULong();
		this.msg = fp.readString(end - fp.tell());
	};
	PACKET.ZC.BROADCAST4.size = -1;


	// 0x820
	PACKET.ZC.COSTUME_SPRITE_CHANGE = function PACKET_ZC_COSTUME_SPRITE_CHANGE(fp, end) {
		this.GID = fp.readULong();
		this.type = fp.readUChar();
		this.value = fp.readLong();
	};
	PACKET.ZC.COSTUME_SPRITE_CHANGE.size = 11;


	// 0x821
	PACKET.AC.OTP_USER = function PACKET_AC_OTP_USER(fp, end) {};
	PACKET.AC.OTP_USER.size = 2;


	// 0x823
	PACKET.AC.OTP_AUTH_ACK = function PACKET_AC_OTP_AUTH_ACK(fp, end) {
		this.LoginResult = fp.readUShort();
	};
	PACKET.AC.OTP_AUTH_ACK.size = 6;


	// 0x824
	PACKET.ZC.FAILED_TRADE_BUYING_STORE_TO_SELLER = function PACKET_ZC_FAILED_TRADE_BUYING_STORE_TO_SELLER(fp, end) {
		this.Result = fp.readShort();
		this.ITID = fp.readUShort();
	};
	PACKET.ZC.FAILED_TRADE_BUYING_STORE_TO_SELLER.size = 6;


	// 0x826
	PACKET.AC.SSO_LOGIN_ACK = function PACKET_AC_SSO_LOGIN_ACK(fp, end) {
		this.Result = fp.readUShort();
	};
	PACKET.AC.SSO_LOGIN_ACK.size = 4;


	// 0x828
	PACKET.HC.DELETE_CHAR3_RESERVED = function PACKET_HC_DELETE_CHAR3_RESERVED(fp, end) {
		this.GID = fp.readULong();
		this.Result = fp.readLong();
		this.DeleteReservedDate = fp.readLong();
	};
	PACKET.HC.DELETE_CHAR3_RESERVED.size = 14;


	// 0x82a
	PACKET.HC.DELETE_CHAR3 = function PACKET_HC_DELETE_CHAR3(fp, end) {
		this.GID = fp.readULong();
		this.Result = fp.readLong();
	};
	PACKET.HC.DELETE_CHAR3.size = 10;


	// 0x82d
	PACKET.HC.ACCEPT_ENTER_NEO_UNION_HEADER = function PACKET_HC_ACCEPT_ENTER_NEO_UNION_HEADER(fp, end) {
		this.TotalSlotNum = fp.readUChar();
		this.PremiumStartSlot = fp.readUChar();
		this.PremiumEndSlot = fp.readUChar();
		this.dummy1_beginbilling = fp.readChar();
		this.code = fp.readChar();
		fp.seek(20, SEEK_CUR);
		this.charInfo = PACKETVER.parseCharInfo(fp, end);
	};
	PACKET.HC.ACCEPT_ENTER_NEO_UNION_HEADER.size = -1;


	// 0x82c
	PACKET.HC.DELETE_CHAR3_CANCEL = function PACKET_HC_DELETE_CHAR3_CANCEL(fp, end) {
		this.GID = fp.readULong();
		this.Result = fp.readLong();
	};
	PACKET.HC.DELETE_CHAR3_CANCEL.size = 10;


	// 0x836
	PACKET.ZC.SEARCH_STORE_INFO_ACK = function PACKET_ZC_SEARCH_STORE_INFO_ACK(fp, end) {
		this.IsFirstPage = fp.readUChar();
		this.IsNexPage = fp.readUChar();
		this.RemainedSearchCnt = fp.readUChar();
		this.SSI_List = (function() {
			var i, count = (end - fp.tell()) / 106 | 0,
				out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].SSI_ID = fp.readULong();
				out[i].AID = fp.readULong();
				out[i].StoreName = fp.readString(80);
				out[i].ITID = fp.readUShort();
				out[i].ItemType = fp.readUChar();
				out[i].price = fp.readLong();
				out[i].count = fp.readUShort();
				out[i].RefiningLevel = fp.readUChar();
				out[i].card1 = fp.readUShort();
				out[i].card2 = fp.readUShort();
				out[i].card3 = fp.readUShort();
				out[i].card4 = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.SEARCH_STORE_INFO_ACK.size = -1;


	// 0x837
	PACKET.ZC.SEARCH_STORE_INFO_FAILED = function PACKET_ZC_SEARCH_STORE_INFO_FAILED(fp, end) {
		this.Reason = fp.readUChar();
	};
	PACKET.ZC.SEARCH_STORE_INFO_FAILED.size = 3;


	// 0x839
	PACKET.ZC.ACK_BAN_GUILD_SSO = function PACKET_ZC_ACK_BAN_GUILD_SSO(fp, end) {
		this.charName = fp.readString(24);
		this.reasonDesc = fp.readString(40);
	};
	PACKET.ZC.ACK_BAN_GUILD_SSO.size = 66;


	// 0x83a
	PACKET.ZC.OPEN_SEARCH_STORE_INFO = function PACKET_ZC_OPEN_SEARCH_STORE_INFO(fp, end) {
		this.OpenType = fp.readShort();
		this.SearchCntMax = fp.readUChar();
	};
	PACKET.ZC.OPEN_SEARCH_STORE_INFO.size = 5;


	// 0x83d
	PACKET.ZC.SSILIST_ITEM_CLICK_ACK = function PACKET_ZC_SSILIST_ITEM_CLICK_ACK(fp, end) {
		this.x = fp.readShort();
		this.y = fp.readShort();
	};
	PACKET.ZC.SSILIST_ITEM_CLICK_ACK.size = 6;


	// 0x83e
	PACKET.AC.REFUSE_LOGIN_R2 = function PACKET_AC_REFUSE_LOGIN_R2(fp, end) {
		this.ErrorCode = fp.readULong();
		this.blockDate = fp.readBinaryString(20);
	};
	PACKET.AC.REFUSE_LOGIN_R2.size = 26;


	// 0x840
	PACKET.HC.NOTIFY_ACCESSIBLE_MAPNAME = function PACKET_HC_NOTIFY_ACCESSIBLE_MAPNAME(fp, end) {
		// fp.readString(end-fp.tell());
	};
	PACKET.HC.NOTIFY_ACCESSIBLE_MAPNAME.size = -1;


	// 0x84b
	PACKET.ZC.ITEM_FALL_ENTRY2 = function PACKET_ZC_ITEM_FALL_ENTRY2(fp, end) {
		this.ITAID = fp.readULong();
		this.ITID = fp.readUShort();
		this.type = fp.readUShort();
		this.IsIdentified = fp.readUChar();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
		this.subX = fp.readUChar();
		this.subY = fp.readUChar();
		this.count = fp.readShort();
	};
	PACKET.ZC.ITEM_FALL_ENTRY2.size = 19;


	// 0x856
	PACKET.ZC.NOTIFY_MOVEENTRY6 = function PACKET_ZC_NOTIFY_MOVEENTRY6(fp, end) {
		this.objecttype = fp.readUChar();
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.moveStartTime = fp.readULong();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.Robe = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.MoveData = fp.readPos2();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.clevel = fp.readShort();
		this.font = fp.readShort();
		this.name = fp.readString(24);
	};
	PACKET.ZC.NOTIFY_MOVEENTRY6.size = -1;


	// 0x857
	PACKET.ZC.NOTIFY_STANDENTRY6 = function PACKET_ZC_NOTIFY_STANDENTRY6(fp, end) {
		this.objecttype = fp.readUChar();
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.Robe = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.clevel = fp.readShort();
		this.font = fp.readShort();
		this.name = fp.readString(end - fp.tell());
	};
	PACKET.ZC.NOTIFY_STANDENTRY6.size = -1;


	// 0x858
	PACKET.ZC.NOTIFY_NEWENTRY6 = function PACKET_ZC_NOTIFY_NEWENTRY6(fp, end) {
		this.objecttype = fp.readUChar();
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.Robe = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.state = fp.readUChar();
		this.clevel = fp.readShort();
		this.font = fp.readShort();
		this.name = fp.readString(end - fp.tell());
	};
	PACKET.ZC.NOTIFY_NEWENTRY6.size = -1;


	// 0x859
	PACKET.ZC.EQUIPWIN_MICROSCOPE2 = function PACKET_ZC_EQUIPWIN_MICROSCOPE2(fp, end) {
		this.characterName = fp.readString(24);
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.accessory = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.Robe = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.sex = fp.readUChar();
		this.ItemInfo = (function() {
			var i, count = (end - fp.tell()) / 28 | 0,
				out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].location = fp.readUShort();
				out[i].WearState = fp.readUShort();
				out[i].IsDamaged = fp.readUChar();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].HireExpireDate = fp.readLong();
				out[i].bindOnEquipType = fp.readUShort();
				out[i].wItemSpriteNumber = fp.readUShort();
			}
			return out;
		})();
	};
	PACKET.ZC.EQUIPWIN_MICROSCOPE2.size = -1;


	// 0x8c7
	PACKET.ZC.SKILL_ENTRY3 = function PACKET_ZC_SKILL_ENTRY3(fp, end) {
		this.AID = fp.readULong();
		this.creatorAID = fp.readULong();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
		this.job = fp.readUChar();
		this.range = fp.readShort(); // TODO: check if it's not a char
		this.isVisible = fp.readUChar();
		this.isContens = fp.readUChar();
		this.msg = fp.readString(80);
	};
	PACKET.ZC.SKILL_ENTRY3.size = -1;


	// 0x8c8
	PACKET.ZC.NOTIFY_ACT3 = function PACKET_ZC_NOTIFY_ACT3(fp, end) {
		this.GID = fp.readULong();
		this.targetGID = fp.readULong();
		this.startTime = fp.readULong();
		this.attackMT = fp.readLong();
		this.attackedMT = fp.readLong();
		this.damage = fp.readLong();
		fp.seek(1, SEEK_CUR);
		this.count = fp.readShort();
		this.action = fp.readUChar();
		this.leftDamage = fp.readLong();
	};
	PACKET.ZC.NOTIFY_ACT3.size = 34;


	// 0x8d0
	PACKET.ZC.REQ_WEAR_EQUIP_ACK2 = function PACKET_ZC_REQ_WEAR_EQUIP_ACK2(fp, end) {
		this.index = fp.readUShort();
		this.wearLocation = fp.readUShort();
		this.viewid = fp.readUShort();
		this.result = !fp.readUChar();
	};
	PACKET.ZC.REQ_WEAR_EQUIP_ACK2.size = 9;


	// 0x8d1
	PACKET.ZC.REQ_TAKEOFF_EQUIP_ACK2 = function PACKET_ZC_REQ_TAKEOFF_EQUIP_ACK2(fp, end) {
		this.index = fp.readUShort();
		this.wearLocation = fp.readUShort();
		this.result = !fp.readUChar();
	};
	PACKET.ZC.REQ_TAKEOFF_EQUIP_ACK2.size = 7;


	// 0xb6
	PACKET.ZC.CLOSE_SCRIPT = function PACKET_ZC_CLOSE_SCRIPT(fp, end) {
		this.NAID = fp.readULong();
	};
	PACKET.ZC.CLOSE_SCRIPT.size = 6;


	// 0x8d2
	PACKET.ZC.FASTMOVE = function PACKET_ZC_FASTMOVE(fp, end) {
		this.AID = fp.readULong();
		this.targetXpos = fp.readShort();
		this.targetYpos = fp.readShort();
	};
	PACKET.ZC.FASTMOVE.size = 10;


	// 0x8ff
	PACKET.ZC.MSG_STATE_CHANGE3 = function PACKET_ZC_MSG_STATE_CHANGE3(fp, end) {
		this.AID = fp.readULong();
		this.index = fp.readShort();
		this.RemainMS = fp.readULong();
		this.val = (function() {
			var count = 3,
				out = new Array(count);
			for (var i = 0; i < count; ++i)
				out[i] = fp.readLong();
			return out;
		})();
	};
	PACKET.ZC.MSG_STATE_CHANGE3.size = 24;


	// 0x908
	PACKET.ZC.ITEM_FAVORITE = function PACKET_ZC_ITEM_FAVORITE(fp, end) {
		this.index = fp.readUShort();
		this.favorite = fp.readUChar();
	};
	PACKET.ZC.ITEM_FAVORITE.size = 5;


	// 0x90f
	PACKET.ZC.NOTIFY_STANDENTRY7 = function PACKET_ZC_NOTIFY_STANDENTRY7(fp, end) {
		this.objecttype = fp.readUChar();
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.Robe = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.clevel = fp.readShort();
		this.font = fp.readShort();
		this.hp = fp.readLong();
		this.maxhp = fp.readLong();
		this.isBoss = fp.readUChar();
		this.name = fp.readString(end - fp.tell());
	};
	PACKET.ZC.NOTIFY_STANDENTRY7.size = -1;


	// 0x914
	PACKET.ZC.NOTIFY_MOVEENTRY7 = function PACKET_ZC_NOTIFY_MOVEENTRY7(fp, end) {
		this.objecttype = fp.readUChar();
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.moveStartTime = fp.readULong();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.Robe = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.MoveData = fp.readPos2();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.clevel = fp.readShort();
		this.font = fp.readShort();
		this.hp = fp.readLong();
		this.maxhp = fp.readLong();
		this.isBoss = fp.readUChar();
		this.name = fp.readString(24);
	};
	PACKET.ZC.NOTIFY_MOVEENTRY7.size = -1;


	// 0x915
	PACKET.ZC.NOTIFY_NEWENTRY7 = function PACKET_ZC_NOTIFY_NEWENTRY7(fp, end) {
		this.objecttype = fp.readUChar();
		this.GID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.Robe = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.state = fp.readUChar();
		this.clevel = fp.readShort();
		this.font = fp.readShort();
		this.hp = fp.readLong();
		this.maxhp = fp.readLong();
		this.isBoss = fp.readUChar();
		this.name = fp.readString(end - fp.tell());
	};
	PACKET.ZC.NOTIFY_NEWENTRY7.size = -1;


	// 0x977
	PACKET.ZC.NOTIFY_MONSTER_HP = function PACKET_ZC_NOTIFY_MONSTER_HP(fp, end) {
		this.AID = fp.readULong();
		this.hp = fp.readULong();
		this.maxhp = fp.readULong();
	};
	PACKET.ZC.NOTIFY_MONSTER_HP.size = 14;


	// 0x97a
	PACKET.ZC.ALL_QUEST_LIST_V2 = function PACKET_ZC_ALL_QUEST_LIST_V2(fp, end) {
		this.questCount = fp.readLong();
		this.QuestList = (function() {
			var i, count=(end-fp.tell())/15|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].questID = fp.readULong();
				out[i].active = fp.readUChar();
				out[i]._time = fp.readULong();
				out[i].time = fp.readULong();
				out[i].count = fp.readShort();
			}
			return out;
		})();
	};
	PACKET.ZC.ALL_QUEST_LIST_V2.size = -1;


	// 0x983
	PACKET.ZC.MSG_STATE_CHANGE4 = function PACKET_ZC_MSG_STATE_CHANGE4(fp, end) {
		this.index = fp.readShort();
		this.AID = fp.readULong();
		this.state = fp.readUChar();
		this.TotalMS = fp.readULong();
		this.RemainMS = fp.readULong();
		this.val = (function() {
			var count = 3,
				out = new Array(count);
			for (var i = 0; i < count; ++i)
				out[i] = fp.readLong();
			return out;
		})();
	};
	PACKET.ZC.MSG_STATE_CHANGE4.size = 29;


	// 0x984
	PACKET.ZC.MSG_STATE_CHANGE5 = function PACKET_ZC_MSG_STATE_CHANGE5(fp, end) {
		this.AID = fp.readULong();
		this.index = fp.readShort();
		this.TotalMS = fp.readULong();
		this.RemainMS = fp.readULong();
		this.val = (function() {
			var count = 3,
				out = new Array(count);
			for (var i = 0; i < count; ++i)
				out[i] = fp.readLong();
			return out;
		})();
	};
	PACKET.ZC.MSG_STATE_CHANGE5.size = 28;


	// 0x990
	PACKET.ZC.ITEM_PICKUP_ACK5 = function PACKET_ZC_ITEM_PICKUP_ACK5(fp, end) {
		this.index = fp.readUShort();
		this.count = fp.readUShort();
		this.ITID = fp.readUShort();
		this.IsIdentified = fp.readUChar();
		this.IsDamaged = fp.readUChar();
		this.RefiningLevel = fp.readUChar();
		this.slot = {};
		this.slot.card1 = fp.readUShort();
		this.slot.card2 = fp.readUShort();
		this.slot.card3 = fp.readUShort();
		this.slot.card4 = fp.readUShort();
		this.location = fp.readLong();
		this.type = fp.readUChar();
		this.result = fp.readUChar();
		this.HireExpireDate = fp.readLong();
		this.bindOnEquipType = fp.readUShort();
	};
	PACKET.ZC.ITEM_PICKUP_ACK5.size = 31;


	// 0x991
	PACKET.ZC.NORMAL_ITEMLIST4 = function PACKET_ZC_NORMAL_ITEMLIST4(fp, end) {
		this.ItemInfo = (function() {
			var i, count = (end - fp.tell()) / 24 | 0,
				out = new Array(count);
			var flag;
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();

				out[i].count = fp.readShort();
				out[i].WearState = fp.readULong();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].HireExpireDate = fp.readLong();
				flag = fp.readUChar();
				out[i].IsIdentified = flag & 1;
				out[i].PlaceETCTab = flag & 2;
			}
			return out;
		})();
	};
	PACKET.ZC.NORMAL_ITEMLIST4.size = -1;


	// 0x992
	PACKET.ZC.EQUIPMENT_ITEMLIST4 = function PACKET_ZC_EQUIPMENT_ITEMLIST4(fp, end) {
		this.ItemInfo = (function() {
			var i, count = (end - fp.tell()) / 31 | 0,
				out = new Array(count);
			var flag;
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].location = fp.readULong();
				out[i].WearState = fp.readULong();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].HireExpireDate = fp.readLong();
				out[i].bindOnEquipType = fp.readUShort();
				out[i].wItemSpriteNumber = fp.readUShort();
				flag = fp.readUChar();
				out[i].IsIdentified = flag & 1;
				out[i].IsDamaged = flag & 2;
				out[i].PlaceETCTab = flag & 4;
			}
			return out;
		})();
	};
	PACKET.ZC.EQUIPMENT_ITEMLIST4.size = -1;


	// 0x993
	PACKET.ZC.CART_NORMAL_ITEMLIST4 = function PACKET_ZC_CART_NORMAL_ITEMLIST4(fp, end) {
		this.ItemInfo = (function() {
			var i, count = (end - fp.tell()) / 24 | 0,
				out = new Array(count);
			var flag;
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].count = fp.readShort();
				out[i].WearState = fp.readULong();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].HireExpireDate = fp.readLong();
				flag = fp.readUChar();
				out[i].IsIdentified = flag & 1;
				out[i].PlaceETCTab = flag & 2;
			}
			return out;
		})();
	};
	PACKET.ZC.CART_NORMAL_ITEMLIST4.size = -1;


	// 0x994
	PACKET.ZC.CART_EQUIPMENT_ITEMLIST4 = function PACKET_ZC_CART_EQUIPMENT_ITEMLIST4(fp, end) {
		this.ItemInfo = (function() {
			var i, count = (end - fp.tell()) / 31 | 0,
				out = new Array(count);
			var flag;
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].location = fp.readULong();
				out[i].WearState = fp.readULong();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].HireExpireDate = fp.readLong();
				out[i].bindOnEquipType = fp.readUShort();
				out[i].wItemSpriteNumber = fp.readUShort();
				flag = fp.readUChar();
				out[i].IsIdentified = flag & 1;
				out[i].IsDamaged = flag & 2;
				out[i].PlaceETCTab = flag & 4;
			}
			return out;
		})();
	};
	PACKET.ZC.CART_EQUIPMENT_ITEMLIST4.size = -1;


	// 0x995
	PACKET.ZC.STORE_NORMAL_ITEMLIST4 = function PACKET_ZC_STORE_NORMAL_ITEMLIST4(fp, end) {
		this.Name = fp.readString(24);
		this.ItemInfo = (function() {
			var i, count = (end - fp.tell()) / 24 | 0,
				out = new Array(count);
			var flag;
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].count = fp.readShort();
				out[i].WearState = fp.readULong();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].HireExpireDate = fp.readLong();
				flag = fp.readUChar();
				out[i].IsIdentified = flag & 1;
				out[i].PlaceETCTab = flag & 2;
			}
			return out;
		})();
	};
	PACKET.ZC.STORE_NORMAL_ITEMLIST4.size = -1;


	// 0x996
	PACKET.ZC.STORE_EQUIPMENT_ITEMLIST4 = function PACKET_ZC_STORE_EQUIPMENT_ITEMLIST4(fp, end) {
		this.Name = fp.readString(24);
		this.ItemInfo = (function() {
			var i, count = (end - fp.tell()) / 31 | 0,
				out = new Array(count);
			var flag;
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].location = fp.readULong();
				out[i].WearState = fp.readULong();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].HireExpireDate = fp.readLong();
				out[i].bindOnEquipType = fp.readUShort();
				out[i].wItemSpriteNumber = fp.readUShort();
				flag = fp.readUChar();
				out[i].IsIdentified = flag & 1;
				out[i].IsDamaged = flag & 2;
				out[i].PlaceETCTab = flag & 4;
			}
			return out;
		})();
	};
	PACKET.ZC.STORE_EQUIPMENT_ITEMLIST4.size = -1;


	// 0x997
	PACKET.ZC.EQUIPWIN_MICROSCOPE_V5 = function PACKET_ZC_EQUIPWIN_MICROSCOPE_V5(fp, end) {
		this.characterName = fp.readString(24);
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.accessory = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.Robe = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.sex = fp.readUChar();
		this.ItemInfo = (function() {
			var i, count = (end - fp.tell()) / 31 | 0,
				out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();
				out[i].IsIdentified = fp.readUChar();
				out[i].location = fp.readUShort();
				out[i].WearState = fp.readUShort();
				out[i].IsDamaged = fp.readUChar();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].HireExpireDate = fp.readLong();
				out[i].bindOnEquipType = fp.readUShort();
				out[i].wItemSpriteNumber = fp.readUShort();

				// What is it for ?
				fp.seek(3, SEEK_CUR);
			}
			return out;
		})();
	};
	PACKET.ZC.EQUIPWIN_MICROSCOPE_V5.size = -1;


	// 0x999
	PACKET.ZC.ACK_WEAR_EQUIP_V5 = function PACKET_ZC_ACK_WEAR_EQUIP_V5(fp, end) {
		this.index = fp.readUShort();
		this.wearLocation = fp.readULong();
		this.viewid = fp.readUShort();
		this.result = !fp.readUChar();
	};
	PACKET.ZC.ACK_WEAR_EQUIP_V5.size = 0;


	// 0x99a
	PACKET.ZC.ACK_TAKEOFF_EQUIP_V5 = function PACKET_ZC_ACK_TAKEOFF_EQUIP_V5(fp, end) {
		this.index = fp.readUShort();
		this.wearLocation = fp.readULong();
		this.result = !fp.readUChar();
	};
	PACKET.ZC.ACK_TAKEOFF_EQUIP_V5.size = 9;


	// 0x99b
	PACKET.ZC.NOTIFY_MAPPROPERTY2 = function PACKET_ZC_NOTIFY_MAPPROPERTY2(fp, end) {
		this.type = fp.readShort();
		this.flag = fp.readLong();
	};
	PACKET.ZC.NOTIFY_MAPPROPERTY2.size = 8;


	// 0x99d
	PACKET.HC.ACCEPT_ENTER_NEO_UNION_LIST = function PACKET_HC_ACCEPT_ENTER_NEO_UNION_LIST(fp, end) {
		this.charInfo = PACKETVER.parseCharInfo(fp, end);
	};
	PACKET.HC.ACCEPT_ENTER_NEO_UNION_LIST.size = -1;


	// 0x99f
	PACKET.ZC.SKILL_ENTRY4 = function PACKET_ZC_SKILL_ENTRY4(fp, end) {
		this.AID = fp.readULong();
		this.creatorAID = fp.readULong();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
		this.job = fp.readULong();
		this.range = fp.readChar();
		this.isVisible = fp.readUChar();
		this.msg = fp.readString(end - fp.tell());
	};
	PACKET.ZC.SKILL_ENTRY4.size = -1;


	// 0x9a0
	PACKET.HC.CHARLIST_NOTIFY = function PACKET_HC_CHARLIST_NOTIFY(fp, end) {
		this.TotalCnt = fp.readLong();
		if (PACKETVER.value >= 20151001) {
			this.charSlots = fp.readLong();
		}
	};
	PACKET.HC.CHARLIST_NOTIFY.size = (PACKETVER.value >= 20151001 ? 10 : 6);


	// 0x9ca
	PACKET.ZC.SKILL_ENTRY5 = function PACKET_ZC_SKILL_ENTRY5(fp, end) {
		this.AID = fp.readULong();
		this.creatorAID = fp.readULong();
		this.xPos = fp.readShort();
		this.yPos = fp.readShort();
		this.job = fp.readULong();
		this.range = fp.readChar();
		this.isVisible = fp.readUChar();
		this.level = fp.readUChar();
		this.msg = fp.readString(end - fp.tell());
	};
	PACKET.ZC.SKILL_ENTRY5.size = -1;


	// 0x9db
	PACKET.ZC.NOTIFY_MOVEENTRY8 = function PACKET_ZC_NOTIFY_MOVEENTRY8(fp, end) {
		this.objecttype = fp.readUChar();
		this.GID = fp.readULong();
		this.AID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.moveStartTime = fp.readULong();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.Robe = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.MoveData = fp.readPos2();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.clevel = fp.readShort();
		this.font = fp.readShort();
		this.hp = fp.readLong();
		this.maxhp = fp.readLong();
		this.isBoss = fp.readUChar();
		this.name = fp.readString(24);
	};
	PACKET.ZC.NOTIFY_MOVEENTRY8.size = -1;


	// 0x9dc
	PACKET.ZC.NOTIFY_STANDENTRY8 = function PACKET_ZC_NOTIFY_STANDENTRY8(fp, end) {
		this.objecttype = fp.readUChar();
		this.GID = fp.readULong();
		this.AID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.Robe = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.clevel = fp.readShort();
		this.font = fp.readShort();
		this.hp = fp.readLong();
		this.maxhp = fp.readLong();
		this.isBoss = fp.readUChar();
		this.name = fp.readString(end - fp.tell());
	};
	PACKET.ZC.NOTIFY_STANDENTRY8.size = -1;


	// 0x9dd
	PACKET.ZC.NOTIFY_NEWENTRY8 = function PACKET_ZC_NOTIFY_NEWENTRY8(fp, end) {
		this.objecttype = fp.readUChar();
		this.GID = fp.readULong();
		this.AID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.Robe = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.state = fp.readUChar();
		this.clevel = fp.readShort();
		this.font = fp.readShort();
		this.hp = fp.readLong();
		this.maxhp = fp.readLong();
		this.isBoss = fp.readUChar();
		this.name = fp.readString(end - fp.tell());
	};
	PACKET.ZC.NOTIFY_NEWENTRY8.size = -1;


	// 0x9df
	PACKET.ZC.ACK_WHISPER2 = function PACKET_ZC_ACK_WHISPER2(fp, end) {
		this.result = fp.readUChar();
		this.unknown = fp.readULong(); // AID ?
	};
	PACKET.ZC.ACK_WHISPER2.size = 7;


	// 0x9fd
	PACKET.ZC.NOTIFY_MOVEENTRY9 = function PACKET_ZC_NOTIFY_MOVEENTRY9(fp, end) {
		this.objecttype = fp.readUChar();
		this.GID = fp.readULong();
		this.AID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.moveStartTime = fp.readULong();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.Robe = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.MoveData = fp.readPos2();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.clevel = fp.readShort();
		this.font = fp.readShort();
		this.hp = fp.readLong();
		this.maxhp = fp.readLong();
		this.isBoss = fp.readUChar();
		this.body = fp.readShort();
		this.name = fp.readString(24);
	};
	PACKET.ZC.NOTIFY_MOVEENTRY9.size = -1;


	// 0x9fe
	PACKET.ZC.NOTIFY_STANDENTRY9 = function PACKET_ZC_NOTIFY_STANDENTRY9(fp, end) {
		this.objecttype = fp.readUChar();
		this.GID = fp.readULong();
		this.AID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.Robe = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.clevel = fp.readShort();
		this.font = fp.readShort();
		this.hp = fp.readLong();
		this.maxhp = fp.readLong();
		this.isBoss = fp.readUChar();
		this.body = fp.readShort();
		this.name = fp.readString(end - fp.tell());
	};
	PACKET.ZC.NOTIFY_STANDENTRY9.size = -1;


	// 0x9dd
	PACKET.ZC.NOTIFY_NEWENTRY9 = function PACKET_ZC_NOTIFY_NEWENTRY9(fp, end) {
		this.objecttype = fp.readUChar();
		this.GID = fp.readULong();
		this.AID = fp.readULong();
		this.speed = fp.readShort();
		this.bodyState = fp.readShort();
		this.healthState = fp.readShort();
		this.effectState = fp.readLong();
		this.job = fp.readShort();
		this.head = fp.readShort();
		this.weapon = fp.readLong();
		this.accessory = fp.readShort();
		this.accessory2 = fp.readShort();
		this.accessory3 = fp.readShort();
		this.headpalette = fp.readShort();
		this.bodypalette = fp.readShort();
		this.headDir = fp.readShort();
		this.Robe = fp.readShort();
		this.GUID = fp.readULong();
		this.GEmblemVer = fp.readShort();
		this.honor = fp.readShort();
		this.virtue = fp.readLong();
		this.isPKModeON = fp.readUChar();
		this.sex = fp.readUChar();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.state = fp.readUChar();
		this.clevel = fp.readShort();
		this.font = fp.readShort();
		this.hp = fp.readLong();
		this.maxhp = fp.readLong();
		this.isBoss = fp.readUChar();
		this.body = fp.readShort();
		this.name = fp.readString(end - fp.tell());
	};
	PACKET.ZC.NOTIFY_NEWENTRY9.size = -1;


	// 0xa00
	PACKET.ZC.SHORTCUT_KEY_LIST_V3 = function PACKET_ZC_SHORTCUT_KEY_LIST_V3(fp, end) {
		fp.seek(0x1, SEEK_CUR);
		this.ShortCutKey = (function() {
			var i, count = 38,
				out = new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].isSkill = fp.readChar();
				out[i].ID = fp.readULong();
				out[i].count = fp.readShort();
			}
			return out;
		})();
	};
	PACKET.ZC.SHORTCUT_KEY_LIST_V3.size = 269;


	// 0xa07
	PACKET.ZC.ACK_REMOVE_RODEX_ITEM = function PACKET_ZC_ACK_REMOVE_RODEX_ITEM(fp, end) {
		this.success = fp.readChar();
		this.index = fp.readUShort();
		this.amount = fp.readUShort();
		this.weight_ = fp.readShort();
	};
	PACKET.ZC.ACK_REMOVE_RODEX_ITEM.size = 9;


	// 0xa08
	PACKET.CZ.REQ_OPEN_WRITE_RODEX = function PACKET_CA_LOGIN() {
		this.receiver = '';
	};
	PACKET.CZ.REQ_OPEN_WRITE_RODEX.prototype.build = function() {
		var pkt_len = 2 + 24;
		var pkt_buf = new BinaryWriter(pkt_len);

		pkt_buf.writeShort(0x64);
		pkt_buf.writeString(this.receiver);
		return pkt_buf;
	};


	// 0xa09
	PACKET.ZC.ADD_EXCHANGE_ITEM3 = function PACKET_ZC_ADD_EXCHANGE_ITEM3(fp, end) {
		this.ITID = fp.readUShort();
		this.type = fp.readUChar();
		this.count = fp.readLong();
		this.IsIdentified = fp.readUChar();
		this.IsDamaged = fp.readUChar();
		this.RefiningLevel = fp.readUChar();
		this.slot = {};
		this.slot.card1 = fp.readUShort();
		this.slot.card2 = fp.readUShort();
		this.slot.card3 = fp.readUShort();
		this.slot.card4 = fp.readUShort();

		this.randomOptions = []
		for (var i = 0; i < 5; i++) {
			this.randomOptions[i] = {}
			this.randomOptions[i].optIndex = fp.readShort();
			this.randomOptions[i].value = fp.readShort();
			this.randomOptions[i].param = fp.readChar();
		}
	};
	PACKET.ZC.ADD_EXCHANGE_ITEM3.size = 45;


	// 0xa0a
	PACKET.ZC.ADD_ITEM_TO_STORE3 = function PACKET_ZC_ADD_ITEM_TO_STORE3(fp, end) {
		this.index = fp.readShort();
		this.count = fp.readLong();
		this.ITID = fp.readUShort();
		this.type = fp.readUChar();
		this.IsIdentified = fp.readUChar();
		this.IsDamaged = fp.readUChar();
		this.RefiningLevel = fp.readUChar();
		this.slot = {};
		this.slot.card1 = fp.readUShort();
		this.slot.card2 = fp.readUShort();
		this.slot.card3 = fp.readUShort();
		this.slot.card4 = fp.readUShort();

		this.randomOptions = []
		for (var i = 0; i < 5; i++) {
			this.randomOptions[i] = {}
			this.randomOptions[i].optIndex = fp.readShort();
			this.randomOptions[i].value = fp.readShort();
			this.randomOptions[i].param = fp.readChar();
		}
	};
	PACKET.ZC.ADD_ITEM_TO_STORE3.size = 47;


	// 0xa0b
	PACKET.ZC.ADD_ITEM_TO_CART3 = function PACKET_ZC_ADD_ITEM_TO_CART3(fp, end) {
		this.index = fp.readShort();
		this.count = fp.readLong();
		this.ITID = fp.readUShort();
		this.type = fp.readUChar();
		this.IsIdentified = fp.readUChar();
		this.IsDamaged = fp.readUChar();
		this.RefiningLevel = fp.readUChar();
		this.slot = {};
		this.slot.card1 = fp.readUShort();
		this.slot.card2 = fp.readUShort();
		this.slot.card3 = fp.readUShort();
		this.slot.card4 = fp.readUShort();

		this.randomOptions = []
		for (var i = 0; i < 5; i++) {
			this.randomOptions[i] = {}
			this.randomOptions[i].optIndex = fp.readShort();
			this.randomOptions[i].value = fp.readShort();
			this.randomOptions[i].param = fp.readChar();
		}
	};
	PACKET.ZC.ADD_ITEM_TO_CART2.size = 47;


	// 0xa0c
	PACKET.ZC.ITEM_PICKUP_ACK6 = function PACKET_ZC_ITEM_PICKUP_ACK6(fp, end) {
		this.index = fp.readUShort();
		this.count = fp.readUShort();
		this.ITID = fp.readUShort();
		this.IsIdentified = fp.readUChar();
		this.IsDamaged = fp.readUChar();
		this.RefiningLevel = fp.readUChar();
		this.slot = {};
		this.slot.card1 = fp.readUShort();
		this.slot.card2 = fp.readUShort();
		this.slot.card3 = fp.readUShort();
		this.slot.card4 = fp.readUShort();
		this.location = fp.readLong();
		this.type = fp.readUChar();
		this.result = fp.readUChar();
		this.HireExpireDate = fp.readLong();
		
		this.randomOptions = []
		for (var i = 0; i < 5; i++) {
			this.randomOptions[i] = {}
			this.randomOptions[i].optIndex = fp.readShort();
			this.randomOptions[i].value = fp.readShort();
			this.randomOptions[i].param = fp.readChar();
		}
	};
	PACKET.ZC.ITEM_PICKUP_ACK6.size = 56;


	// 0xa0d
	PACKET.ZC.EQUIPMENT_ITEMLIST6 = function PACKET_ZC_EQUIPMENT_ITEMLIST6(fp, end) {
		this.ItemInfo = (function() {
			var i, count = (end - fp.tell()) / 57 | 0,
				out = new Array(count);
			var flag;
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].index = fp.readShort();
				out[i].ITID = fp.readUShort();
				out[i].type = fp.readUChar();

				out[i].location = fp.readULong();
				out[i].WearState = fp.readULong();
				out[i].RefiningLevel = fp.readUChar();
				out[i].slot = {};
				out[i].slot.card1 = fp.readUShort();
				out[i].slot.card2 = fp.readUShort();
				out[i].slot.card3 = fp.readUShort();
				out[i].slot.card4 = fp.readUShort();
				out[i].HireExpireDate = fp.readLong();
				out[i].bindOnEquipType = fp.readUShort();
				out[i].wItemSpriteNumber = fp.readUShort();
				out[i].nRandomOptionCnt = fp.readChar();
				out[i].option = [];
				for (var j = 0; j < 5; j++) {
					out[i].option[j] = {};
					out[i].option[j].optIndex = fp.readUShort();
					out[i].option[j].value = fp.readShort();
					out[i].option[j].param = fp.readChar();
				}
				flag = fp.readUChar();
				out[i].IsIdentified = flag & 1;
				out[i].IsDamaged = flag & 2;
				out[i].PlaceETCTab = flag & 4;
			}
			return out;
		})();
	};
	PACKET.ZC.EQUIPMENT_ITEMLIST6.size = -1;


	// 0xa18
	PACKET.ZC.ACCEPT_ENTER3 = function PACKET_ZC_ACCEPT_ENTER3(fp, end) {
		this.startTime = fp.readULong();
		this.PosDir = fp.readPos();
		this.xSize = fp.readUChar();
		this.ySize = fp.readUChar();
		this.font = fp.readShort();
		this.sex = fp.readUChar();
	};
	PACKET.ZC.ACCEPT_ENTER3.size = 14;


	// 0xac4
	PACKET.AC.ACCEPT_LOGIN3 = function PACKET_AC_ACCEPT_LOGIN3(fp, end) {
		this.AuthCode = fp.readLong();
		this.AID = fp.readULong();
		this.userLevel = fp.readULong();
		this.lastLoginIP = fp.readULong();
		this.lastLoginTime = fp.readBinaryString(26);
		this.Sex = fp.readUChar();
		this.unknown = fp.readBinaryString(17);
		this.ServerList = (function() {
			var i, count=(end-fp.tell())/160|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = {};
				out[i].ip = fp.readULong();
				out[i].port = fp.readUShort();
				out[i].name = fp.readString(20);
				out[i].usercount = fp.readUShort();
				out[i].state = fp.readUShort();
				out[i].property = fp.readUShort();
				out[i].unknown = fp.readBinaryString(128);
			}
			return out;
		})();
	};
	PACKET.AC.ACCEPT_LOGIN3.size = -1;


	// 0xa3b
	PACKET.ZC.HAT_EFFECT = function PACKET_ZC_HAT_EFFECT(fp, end) {
		this.GID = fp.readULong();
		this.enabled = fp.readChar();
		this.hatEffectIDs = (function() {
			var i, count=(end-fp.tell())/2|0, out=new Array(count);
			for (i = 0; i < count; ++i) {
				out[i] = fp.readShort(); // #FixMe: Can also be send as single packet, which sends the effectId as Long...
			}
			return out;
		})();
	};
	PACKET.ZC.HAT_EFFECT = -1;


	/**
	 * Export
	 */
	return PACKET;

});
