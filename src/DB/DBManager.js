/**
 * db/DBManager.js
 *
 * Manage and load DB files
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
	var textEncoding     = require('vendors/text-encoding');
	var client           = require('core/Client');
	var classTable       = require('./jobs/JobNameTable');
	var weaponAction     = require('./jobs/WeaponAction');
	var weaponJobTable   = require('./jobs/WeaponJobTable');
	var babyTable        = require('./jobs/BabyTable');
	var hairIndexTable   = require('./jobs/HairIndexTable');
	var monsterTable     = require('./monsters/MonsterTable');
	var petIllustTable   = require('./pets/PetIllustration');
	var petActionTable   = require('./pets/PetAction');
	var itemTable        = require('./items/ItemTable');
	var hatTable         = require('./items/HatTable');
	var shieldTable      = require('./items/ShieldTable');
	var weaponTable      = require('./items/WeaponTable');
	var WeaponType       = require('./items/WeaponType');
	var weaponSoundTable = require('./items/WeaponSoundTable');


	/**
	 * DB NameSpace
	 */
	var db = {};


	/**
	 * @var {Array} message string
	 */
	var msgStringTable = [];


	/**
	 * @var {Array} map table
	 * struct { string name; string mp3; object fog }
	 */
	var mapTable = {};


	/**
	 * @var {Array} ASCII sex
	 */
	var sexTable = [ '\xbf\xa9', '\xb3\xb2' ];


	/**
	 * @var {Array} file alias list
	 */
	db.mapalias = {};


	/**
	 * @var {string} interface path
	 */
	db.INTERFACE_PATH = 'data/texture/\xc0\xaf\xc0\xfa\xc0\xce\xc5\xcd\xc6\xe4\xc0\xcc\xbd\xba/';


	/**
	 * Initialize db
	 */
	db.init = function init()
	{
		// Callback
		var index = 0, count = 0;
		function onLoad(){
			count++;
			return function onLoadClosure(){
				index++;

				if (db.onProgress) {
					db.onProgress(index, count);
				}

				if (index === count && db.onReady) {
					db.onReady();
				}
			};
		}

		console.log('Loading db files...');

		// Loading TXT Tables
		loadTable( 'data/mp3nametable.txt',               2, function(index, key, val){   (mapTable[key] || (mapTable[key] = {})).mp3                   = val;               }, onLoad());
		loadTable( 'data/mapnametable.txt',               2, function(index, key, val){   (mapTable[key] || (mapTable[key] = {})).name                  = val;               }, onLoad());
		loadTable( 'data/msgstringtable.txt',             1, function(index, val){         msgStringTable[index]                                        = val;               }, onLoad());
		loadTable( 'data/resnametable.txt',               2, function(index, key, val){    db.mapalias[key]                                             = val;               }, onLoad());
		loadTable( 'data/num2cardillustnametable.txt',    2, function(index, key, val){   (itemTable[key] || (itemTable[key] = {})).illustResourcesName = val;               }, onLoad());
		loadTable( 'data/cardprefixnametable.txt',        2, function(index, key, val){   (itemTable[key] || (itemTable[key] = {})).prefixNameTable     = val;               }, onLoad());
		loadTable( 'data/fogparametertable.txt',          5, parseFogEntry,                                                                                                     onLoad());
	};


	/**
	 * Load TXT table
	 *
	 * @param {string} filename to load
	 * @param {number} size of each group
	 * @param {function} callback to call for each group
	 * @param {function} onEnd to run once the file is loaded
	 */
	function loadTable( filename, size, callback, onEnd )
	{
		client.loadFile( filename, function(data) {
			console.log('Loading file "'+ filename +'"...');

			// Remove commented lines
			var content  = ('\n' + data).replace(/\n(\/\/[^\n]+)/g, '');
			var elements = content.split('#');
			var i, count = elements.length;
			var args     = new Array(size+1);

			for (i = 0; i < count; i++) {
				if (i%size === 0) {
					if (i) {
						callback.apply( null, args );
					}
					args[i%size] = i;
				}

				args[(i%size)+1] = elements[i].replace(/^\s+|\s+$/g, ''); // trim
			}

			onEnd();
		}, onEnd );
	}


	/**
	 * Fog entry parser
	 *
	 * @param {number} index
	 * @param {mixed} key
	 * @param {string} near
	 * @param {string} far
	 * @param {string} color
	 * @param {string} factor
	 */
	function parseFogEntry(index, key, near, far, color, factor)
	{
		var intColor = parseInt(color,16);
		var map       = (mapTable[key] || (mapTable[key] = {}));

		map.fog = {
			near:   parseFloat(near),
			far:    parseFloat(far),
			color:  [
				(255 & (intColor >> 16)) / 255.0,
				(255 & (intColor >>  8)) / 255.0,
				(255 & (intColor >>  0)) / 255.0
			],
			factor: parseFloat(factor)
		};
	}


	/**
	 * @return {string} path to body sprite/action
	 * @param {number} id entity
	 * @param {boolean} sex
	 * @return {string}
	 */
	db.getBodyPath = function getBodyPath( id, sex )
	{
		// PC
		if (id < 45) {
			return 'data/sprite/\xc0\xce\xb0\xa3\xc1\xb7/\xb8\xf6\xc5\xeb/' + sexTable[sex] + '/' + (classTable[id] || classTable[0]) + '_' + sexTable[sex];
		}

		// TODO: Warp STR file
		if (id === 45) {
			return null;
		}

		// Not visible sprite
		if (id === 111 || id === 139) {
			return null;
		}

		// NPC
		if (id < 1000) {
			return 'data/sprite/npc/' + ( monsterTable[id] || monsterTable[46] ).toLowerCase();
		}

		// Monsters
		if (id < 4000) {
			return 'data/sprite/\xb8\xf3\xbd\xba\xc5\xcd/' + ( monsterTable[id] || monsterTable[1001] ).toLowerCase();
		}

		// PC
		if (id < 6000) {
			return 'data/sprite/\xc0\xce\xb0\xa3\xc1\xb7/\xb8\xf6\xc5\xeb/' + sexTable[sex] + '/' + ( classTable[id] || classTable[0] ) + '_' + sexTable[sex];
		}

		// Homunculus
		return 'data/sprite/homun/' + ( monsterTable[id] || monsterTable[1002] ).toLowerCase();

		// TODO: add support for mercenary
	};


	/**
	 * @return {string} path of admin clothes
	 * @param {boolean} sex
	 */
	db.getAdminPath = function getAdminPath(sex)
	{
		return 'data/sprite/\xc0\xce\xb0\xa3\xc1\xb7/\xb8\xf6\xc5\xeb/' + sexTable[sex] + '/\xbf\xee\xbf\xb5\xc0\xda_' + sexTable[sex];
	};


	/**
	 * @return {string} path to body palette
	 * @param {number} id entity
	 * @param {number} pal
	 * @param {boolean} sex
	 */
	db.getBodyPalPath = function getBodyPalettePath( id, pal, sex )
	{
		if (id === 0 || !(id in classTable)) {
			return null;
		}

		return 'data/palette/\xb8\xf6/' + classTable[id] + '_' + sexTable[sex] + '_' + pal + '.pal';
	};


	/**
	 * @return {string} path to head sprite/action
	 * @param {number} id hair style
	 * @param {boolean} sex
	 */
	db.getHeadPath = function getHeadPath( id, sex )
	{
		return 'data/sprite/\xc0\xce\xb0\xa3\xc1\xb7/\xb8\xd3\xb8\xae\xc5\xeb/' + sexTable[sex] + '/' + (hairIndexTable[sex][id] || id)+ '_' + sexTable[sex];
	};


	/**
	 * @return {string} path to head palette
	 * @param {number} id hair style
	 * @param {number} pal id
	 * @param {boolean} sex
	 */
	db.getHeadPalPath = function getHeadPalPath( id, pal, sex )
	{
		return 'data/palette/\xb8\xd3\xb8\xae/\xb8\xd3\xb8\xae' + (hairIndexTable[sex][id] || id) + '_' + sexTable[sex] + '_' + pal + '.pal';
	};


	/**
	 * @return {string} path to hat
	 * @param {number} id hair style
	 * @param {boolean} sex
	 */
	db.getHatPath = function getHatPath( id, sex )
	{
		if (id === 0 || !(id in hatTable)) {
			return null;
		}

		return 'data/sprite/\xbe\xc7\xbc\xbc\xbb\xe7\xb8\xae/' + sexTable[sex] + '/' + sexTable[sex] + hatTable[id];
	};


	/**
	 * @return {string} Path to pets equipements
	 * @param {number} id (pets)
	 */
	db.getPetEquipPath = function getPetEquipPath( id )
	{
		if (id === 0 || !(id in petActionTable)) {
			return null;
		}

		return 'data/sprite/' + petActionTable[id];
	};


	/**
	 * @return {string} Path to pets equipements
	 * @param {number} id (pets)
	 */
	db.getPetIllustPath = function getPetIllustPath( id )
	{
		return 'data/texture/' + (petIllustTable[id] || petIllustTable[1002]);
	};


	/**
	 * @return {string} Path to shield
	 * @param {number} id shield
	 * @param {number} job class
	 * @param {boolean} sex
	 */
	db.getShieldPath = function getShieldPath( id, job, sex )
	{
		if (id === 0) {
			return null;
		}

		// Dual weapon (based on range id)
		if (id > 500 && (id < 2100 || id > 2200)) {
			return db.getWeaponPath(id, job, sex);
		}

		var baseClass = weaponJobTable[job] || weaponJobTable[0];

		// ItemID to View Id
		if ((id in itemTable) && ('ClassNum' in itemTable[id])) {
			id = itemTable[id].ClassNum;
		}

		return 'data/sprite/\xb9\xe6\xc6\xd0/' + baseClass + '/' + baseClass + '_' + sexTable[sex] + '_' + ( shieldTable[id] || shieldTable[1] );
	};


	/**
	 * @return {string} Path to weapon
	 * @param {number} id weapon
	 * @param {number} job class
	 * @param {boolean} sex
	 */
	db.getWeaponPath = function getWeaponPath( id, job, sex )
	{
		if (id === 0) {
			return null;
		}

		var baseClass = weaponJobTable[job] || weaponJobTable[0];

		// ItemID to View Id
		if ((id in itemTable) && ('ClassNum' in itemTable[id])) {
			id = itemTable[id].ClassNum;
		}

		return 'data/sprite/\xc0\xce\xb0\xa3\xc1\xb7/' + baseClass + '/' + baseClass + '_' + sexTable[sex] + ( weaponTable[id] || ('_' + id) ) ;
	};


	/**
	 * @return {string} Path to eapon sound
	 * @param {number} weapon id
	 */
	db.getWeaponSound = function getWeaponSound( id )
	{
		var type = db.getWeaponViewID(id);

		// TODO: implement basejob
		if (type === WeaponType.NONE) {
			// return '_' + ( basejob ) + '_attack.wav';
		}

		return weaponSoundTable[type];
	};


	/**
	 * @return {number} weapon viewid
	 * @param {number} id weapon
	 */
	db.getWeaponViewID = function getWeaponViewIdClosure()
	{
		var gunGatling = [13157, 13158, 13159, 13172, 13177];
		var gunShotGun = [13154, 13155, 13156, 13167, 13168, 13169, 13173, 13178];
		var gunGranade = [13160, 13161, 13162, 13174, 13179];

		return function getWeaponViewID(id)
		{
			// Already weapon type.
			if (id < WeaponType.MAX) {
				return id;
			}

			// Based on view id
			if (id in itemTable) {
				if (itemTable[id].ClassNum) {
					return itemTable[id].ClassNum;
				}
			}

			// Weapon ID starting at 1100
			if (id <  1100) {
				return WeaponType.NONE;
			}

			// Specific weapon range inside other range (wtf gravity ?)
			if (id >= 1116 && id <= 1118)    return WeaponType.TWOHANDSWORD;
			if (id >= 1314 && id <= 1315)    return WeaponType.TWOHANDAXE;
			if (id >= 1410 && id <= 1412)    return WeaponType.TWOHANDSPEAR;
			if (id >= 1472 && id <= 1473)    return WeaponType.ROD;
			if (id === 1599)                 return WeaponType.MACE;
			if (gunGatling.indexOf(id) > -1) return WeaponType.GUN_GATLING;
			if (gunShotGun.indexOf(id) > -1) return WeaponType.GUN_SHOTGUN;
			if (gunGranade.indexOf(id) > -1) return WeaponType.GUN_GRANADE;

			// Ranges
			return (
				id <  1150 ? WeaponType.SWORD        :
			    id <  1200 ? WeaponType.TWOHANDSWORD :
			    id <  1250 ? WeaponType.SHORTSWORD   :
			    id <  1300 ? WeaponType.CATARRH      :
			    id <  1350 ? WeaponType.AXE          :
			    id <  1400 ? WeaponType.TWOHANDAXE   :
			    id <  1450 ? WeaponType.SPEAR        :
			    id <  1500 ? WeaponType.TWOHANDSPEAR :
			    id <  1550 ? WeaponType.MACE         :
			    id <  1600 ? WeaponType.BOOK         :
			    id <  1650 ? WeaponType.ROD          :
			    id <  1700 ? WeaponType.NONE         :
			    id <  1750 ? WeaponType.BOW          :
			    id <  1800 ? WeaponType.NONE         :
			    id <  1850 ? WeaponType.KNUKLE       :
			    id <  1900 ? WeaponType.NONE         :
			    id <  1950 ? WeaponType.INSTRUMENT   :
			    id <  2000 ? WeaponType.WHIP         :
			    id <  2050 ? WeaponType.TWOHANDROD   :
			    id < 13000 ? WeaponType.NONE         :
			    id < 13050 ? WeaponType.SHORTSWORD   :
			    id < 13100 ? WeaponType.NONE         :
			    id < 13150 ? WeaponType.GUN_HANDGUN  :
			    id < 13200 ? WeaponType.GUN_RIFLE    :
			    id < 13300 ? WeaponType.NONE         :
			    id < 13350 ? WeaponType.SYURIKEN     :
			    id < 13400 ? WeaponType.NONE         :
			    id < 13450 ? WeaponType.SWORD        :
			    id < 18100 ? WeaponType.NONE         :
			    id < 18150 ? WeaponType.BOW          :
			                 WeaponType.NONE
			);
		};
	}();


	/**
	 * @return {number} weapon action frame
	 * @param {number} id weapon
	 * @param {number} job
	 * @param {number} sex
	 */
	db.getWeaponAction = function getWeaponAction( id, job, sex )
	{
		var type = db.getWeaponViewID(id);

		if (job in weaponAction) {
			if (weaponAction[job] instanceof Array) {
				if (type in weaponAction[job][sex]) {
					return weaponAction[job][sex][type];
				}
			}
			else if (type in weaponAction[job]) {
				return weaponAction[job][type];
			}
		}

		return 0;
	};


	/**
	 * Get back informations from id
	 *
	 * @param {number} item id
	 * @return {object} item
	 */
	db.getItemInfo = function getItemInfoClosure()
	{
		var unknownItem = {
			unidentifiedDisplayName: 'Unknown Item',
			unidentifiedResourceName: '\xbb\xe7\xb0\xfa',
			unidentifiedDescriptionName: [
				'...',
			],
			identifiedDisplayName: 'Unknown Item',
			identifiedResourceName: '\xbb\xe7\xb0\xfa',
			identifiedDescriptionName: [
				'...',
			],
			slotCount: 0,
			ClassNum: 0
		};

		return function getItemInfo( itemid )
		{
			var item = itemTable[itemid] || unknownItem;

			if (!item._decoded) {
				item.identifiedDescriptionName   = item.identifiedDescriptionName   ? textEncoding.decodeString(item.identifiedDescriptionName.join('\n'))   : '';
				item.unidentifiedDescriptionName = item.unidentifiedDescriptionName ? textEncoding.decodeString(item.unidentifiedDescriptionName.join('\n')) : '';
				item.identifiedDisplayName       = textEncoding.decodeString(item.identifiedDisplayName);
				item.unidentifiedDisplayName     = textEncoding.decodeString(item.unidentifiedDisplayName);
				item.prefixNameTable             = textEncoding.decodeString(item.prefixNameTable || '');
				item._decoded                    = true;
			}

			return item;
		};
	}();


	/**
	 * Get back item path
	 *
	 * @param {number} item id
	 * @param {boolean} is identify
	 * @return {string} path
	 */
	db.getItemPath = function getItemPath( itemid, identify )
	{
		var it = db.getItemInfo( itemid );
		return 'data/sprite/\xbe\xc6\xc0\xcc\xc5\xdb/' + ( identify ? it.identifiedResourceName : it.unidentifiedResourceName );
	};


	/**
	 * Get full item name
	 *
	 * @param {object} item
	 * @return {string} item full name
	 */
	db.getItemName = function getItemName( item )
	{
		var it = db.getItemInfo( item.ITID );
		var str = '';

		if (!item.IsIdentified) {
			return it.unidentifiedDisplayName;
		}

		if (item.RefiningLevel) {
			str = '+' + item.RefiningLevel + ' ';
		}

		if (item.slot) {
			switch (item.slot.card1) {
				case 0x00FF: // FORGE
				case 0x00FE: // CREATE
				case 0xFF00: // PET
					break;

				// Show card prefix
				default:
					var list  = ['', 'Double ', 'Triple ', 'Quadruple '];
					var count = [0, 0, 0, 0];
					var name, prefix = [];
					var i, j = 0, pos;

					for (i = 1; i <= 4; ++i) {
						if (!item.slot['card'+i]) {
							break;
						}

						name = db.getItemInfo(item.slot['card'+i]).prefixNameTable;
						if (name) {
							pos = prefix.indexOf(name);
							if (pos > -1) {
								count[pos]++;
								continue;
							}
							prefix[j] = name;
							count[j]++;
							j++;
						}
					}

					for (i = 0; i < j; ++i) {
						str += list[count[i]-1] + prefix[i] + ' ';
					}
			}
		}


		str += it.identifiedDisplayName;

		if (it.slotCount) {
			str += ' [' + it.slotCount + ']';
		}

		return str;
	};


	/**
	 * Get a message from msgstringtable
	 *
	 * @param {number} message id
	 * @param {string} optional string to show if the text isn't defined
	 * @return {string} message
	 */
	db.getMessage = function getMessage(id, defaultText)
	{
		if (!(id in msgStringTable)) {
			return defaultText !== undefined ? defaultText : 'NO MSG ' + id;
		}

		return textEncoding.decodeString( msgStringTable[id] );
	};


	/**
	 * @param {string} filename
	 * @return {object}
	 */
	db.getMap = function getMap( mapname )
	{
		var map = mapname.replace('.gat','.rsw');

		return mapTable[map] || null;
	};


	/**
	 * Get a message from msgstringtable
	 *
	 * @param {string} mapname
	 * @param {string} default name if not found
	 * @return {string} map location
	 */
	db.getMapName = function getMapName( mapname, defaultName )
	{
		var map = mapname.replace('.gat','.rsw');

		if (!(map in mapTable) || !mapTable[map].name) {
			return (typeof defaultName === 'undefined' ? db.getMessage(187) : defaultName);
		}

		return textEncoding.decodeString(mapTable[map].name);
	};


	/**
	 * Is character id a baby ?
	 *
	 * @param {number} job id
	 * @return {boolean} is baby
	 */
	db.isBaby = function isBaby( jobid )
	{
		return babyTable.indexOf(jobid) > -1;
	};


	/**
	 * Export
	 */
	return db;
});