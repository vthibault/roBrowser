/**
 * DB/DBManager.js
 *
 * Manage and load DB files
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['Utils/Queue', 'Core/Client', './ClassTable', './ClassPalTable', './MonsterTable', './PetInfo', './HatTable', './WeaponTable', './WeaponAction', './ShieldTable', './Weather' ],
function(       Queue,        Client,     ClassTable,     ClassPalTable,     MonsterTable,     PetInfo,     HatTable,     WeaponTable,     WeaponAction,     ShieldTable,     Weather)
{
	"use strict";


	/**
	 * DB NameSpace
	 */
	var DB = {};


	/**
	 * DB Tables
	 */
	DB.mp3            = {};
	DB.msgstringtable = [];
	DB.fog            = {};
	DB.mapalias       = {};
	DB.mobname        = MonsterTable;
	DB.mapname        = {};
	DB.weather        = Weather;
	DB.itemList       = {};


	// Lua
	DB.AccNameTable   = {};

	/**
	 * Callback once DB files are loaded
	 * @return {function} callback
	 */
	DB.onReady = null;


	/**
	 * String we need to store somewhere, boring to copy paste each time...
	 */
	DB.INTERFACE_PATH = 'data/texture/\xc0\xaf\xc0\xfa\xc0\xce\xc5\xcd\xc6\xe4\xc0\xcc\xbd\xba/';


	/**
	 * Initialize DB
	 */
	DB.init = function Init()
	{
		console.log('Loading DB files...');

		var q = new Queue();


		/*
		 * Loading TXT Tables
		 */

		// MP3 for each maps
		q.add(function(){
			DB.loadTable( 'data/mp3nametable.txt', 2, function(index, mapname, mp3){
				DB.mp3[mapname] = mp3;
			}, q.next );
		});

		// Map's name
		q.add(function(){
			DB.loadTable( 'data/mapnametable.txt', 2, function(index, filename, mapname){
				DB.mapname[filename] = mapname;
			}, q.next );
		});

		// Texts to display
		q.add(function(){
			DB.loadTable( 'data/msgstringtable.txt', 1, function(index, text){
				DB.msgstringtable[index] = text;
			}, q.next );
		});

		// Map inherent system
		q.add(function(){
			DB.loadTable( 'data/resnametable.txt', 2, function(index, key, val){
				DB.mapalias[key] = val;
			}, q.next );
		});


		// Load items description
		q.add(function(){
			DB.loadTable( 'data/idnum2itemdesctable.txt', 2, function(index, key, val){
				(DB.itemList[key] || (DB.itemList[key] = {})).identifiedDescriptionName = val;
			}, q.next );
		});

		// Load items name
		q.add(function(){
			DB.loadTable( 'data/idnum2itemdisplaynametable.txt', 2, function(index, key, val){
				(DB.itemList[key] || (DB.itemList[key] = {})).identifiedDisplayName = val.replace(/\_/g, ' ');
			}, q.next );
		});

		// Load items resource name
		q.add(function(){
			DB.loadTable( 'data/idnum2itemresnametable.txt', 2, function(index, key, val){
				(DB.itemList[key] || (DB.itemList[key] = {})).identifiedResourceName = val;
			}, q.next );
		});


		// Load items description
		q.add(function(){
			DB.loadTable( 'data/num2itemdesctable.txt', 2, function(index, key, val){
				(DB.itemList[key] || (DB.itemList[key] = {})).unidentifiedDescriptionName = val;
			}, q.next );
		});

		// Load items name
		q.add(function(){
			DB.loadTable( 'data/num2itemdisplaynametable.txt', 2, function(index, key, val){
				(DB.itemList[key] || (DB.itemList[key] = {})).unidentifiedDisplayName = val.replace(/\_/g, ' ');
			}, q.next );
		});

		// Load items resource name
		q.add(function(){
			DB.loadTable( 'data/num2itemresnametable.txt', 2, function(index, key, val){
				(DB.itemList[key] || (DB.itemList[key] = {})).unidentifiedResourceName = val;
			}, q.next );
		});

		// Load items slots
		q.add(function(){
			DB.loadTable( 'data/itemslotcounttable.txt', 2, function(index, key, val){
				(DB.itemList[key] || (DB.itemList[key] = {})).slotCount = parseInt(val, 10);
			}, q.next );
		});


		// Fog system
		q.add(function(){
			DB.loadTable('data/fogparametertable.txt', 5, function(index, mapname, near, far, color, factor) {
				var int_color = parseInt(color,16);
				DB.fog[mapname] = {
					near:   parseFloat(near),
					far:    parseFloat(far),
					color:  [
						(255 & (int_color >> 16)) / 255.0,
						(255 & (int_color >>  8)) / 255.0,
						(255 & (int_color >>  0)) / 255.0
					],
					factor: parseFloat(factor)
				};
			}, q.next );
		});


		/*
		 * Loading LuaByte Tables
		 */

		// PC data
		q.add( DB.loadLuaByteTable('data/lua files/admin/pcidentity.lub',      q.next) );
		q.add( DB.loadLuaByteTable('data/lua files/admin/pcjobname.lub',       q.next) );
		q.add( DB.loadLuaByteTable('data/lua files/admin/pcjobnamegender.lub', q.next) );

		// hats
		q.add( DB.loadLuaByteTable('data/lua files/datainfo/accessoryid.lub',  q.next) );
		q.add( DB.loadLuaByteTable('data/lua files/datainfo/accname.lub',      q.next) );

		// npc/mobs
		q.add( DB.loadLuaByteTable('data/lua files/datainfo/npcidentity.lub',  q.next) );
		q.add( DB.loadLuaByteTable('data/lua files/datainfo/jobname.lub',      q.next) );
		q.add( DB.loadLuaByteTable('data/lua files/datainfo/petinfo.lub',      q.next) );

		// others
		q.add( DB.loadLuaByteTable('data/lua files/datainfo/weapontable.lub',  q.next) );


		// skills
		//q.add( DB.loadLuaByteTable('data/lua files/skillinfoz/skillid.lub',  q.next) );


		// Callback
		q.add(function(){
			if( DB.onReady ) {
				DB.onReady();
			}
		});

		// Start loading files
		q.run();
	};


	/**
	 * Load TXT table
	 *
	 * @param {string} filename to load
	 * @param {number} size of each group
	 * @param {function} callback to call for each group
	 * @param {function} onEnd to run once the file is loaded
	 */
	DB.loadTable = function LoadTable( filename, size, callback, onEnd )
	{
		console.log('Loading file "'+ filename +'"...');
		Client.loadFile( filename, function(data) {
			// Remove commented lines
			var content  = ("\n" + data).replace(/\n\s?\/\/[^\n]+\n/g, '');
			var elements = content.split("#");
			var i, count = elements.length;
			var args     = new Array(size+1);

			for( i=0; i<count; i++ ) {
				if( i%size === 0 ) {
					if( i ) {
						callback.apply( null, args );
					}
					args[i%size] = i;
				}

				args[(i%size)+1] = elements[i].replace(/^\s+|\s+$/g, '');
			}

			onEnd();
		}, onEnd );
	};


	/**
	 * Load LuaByte Table
	 *
	 * @param {string} filename to load
	 * @param {function} onEnd to run once the file is executed
	 * @return {function} generic
	 */
	DB.loadLuaByteTable = function loadLuaByteTable( filename, onEnd )
	{
		return function() {
			console.log('Loading file "'+ filename +'"...');
			Client.loadFile( filename, function(js) {
				// TODO: fix Lub decoder
				try {
					eval(js);
				}
				catch(e){}
				onEnd();
			}, onEnd );
		};
	};


	/**
	 * ASCII sex
	 */
	DB.SEX = [ "\xbf\xa9", "\xb3\xb2" ];


	/**
	 * @return {string} path to body sprite/action
	 * @param {number} id entity
	 * @param {boolean} sex
	 * @return {string}
	 */
	DB.getBodyPath = function GetBodyPath( id, sex )
	{
		// PC
		if ( id < 45 ) {
			return "data/sprite/\xc0\xce\xb0\xa3\xc1\xb7/\xb8\xf6\xc5\xeb/" + DB.SEX[sex] + "/" + ( ClassTable[id] || ClassTable[0] ) + "_" + DB.SEX[sex];
		}

		// TODO: Warp STR file
		if ( id == 45 ) {
			return null;
		}

		// Not visible sprite
		if( id === 111 ) {
			return null;
		}

		// NPC
		if ( id < 1000 ) {
			return "data/sprite/npc/" + ( MonsterTable[id] || MonsterTable[46] ).toLowerCase();
		}

		// Monsters
		if ( id < 4000 ) {
			return "data/sprite/\xb8\xf3\xbd\xba\xc5\xcd/" + ( MonsterTable[id] || MonsterTable[1001] ).toLowerCase();
		}

		// PC
		if ( id < 6000 ) {
			return "data/sprite/\xc0\xce\xb0\xa3\xc1\xb7/\xb8\xf6\xc5\xeb/" + DB.SEX[sex] + "/" + ( ClassTable[id] || ClassTable[0] ) + "_" + DB.SEX[sex];
		}

		// Homunculus
		return "data/sprite/homun/" + ( MonsterTable[id] || MonsterTable[1002] ).toLowerCase();

		// TODO: add support for mercenary
	};


	/**
	 * @return {string} path to body palette
	 * @param {number} id entity
	 * @param {number} pal
	 * @param {boolean} sex
	 */
	DB.getBodyPalPath = function GetBodyPalettePath( id, pal, sex )
	{
		if( id === 0 || !(id in ClassPalTable) ) {
			return null;
		}

		return "data/palette/\xb8\xf6/" + ClassPalTable[id] + "_" + DB.SEX[sex] + "_" + pal + ".pal";
	};


	/**
	 * @return {string} path to head sprite/action
	 * @param {number} id hair style
	 * @param {boolean} sex
	 */
	DB.getHeadPath = function GetHeadPath( id, sex )
	{
		return "data/sprite/\xc0\xce\xb0\xa3\xc1\xb7/\xb8\xd3\xb8\xae\xc5\xeb/" + DB.SEX[sex] + "/" + id + "_" + DB.SEX[sex];
	};


	/**
	 * @return {string} path to head palette
	 * @param {number} id hair style
	 * @param {number} pal id
	 * @param {boolean} sex
	 */
	DB.getHeadPalPath = function GetHeadPalPath( id, pal, sex )
	{
		return "data/palette/\xb8\xd3\xb8\xae/\xb8\xd3\xb8\xae" + id + "_" + DB.SEX[sex] + "_" + pal + ".pal";
	};


	/**
	 * @return {string} path to hat
	 * @param {number} id hair style
	 * @param {boolean} sex
	 */
	DB.getHatPath = function GetHatPath( id, sex )
	{
		if( id === 0 || (!(id in HatTable) && !(id in DB.AccNameTable)) ) {
			return null;
		}
		return "data/sprite/\xbe\xc7\xbc\xbc\xbb\xe7\xb8\xae/" + DB.SEX[sex] + "/" + DB.SEX[sex] + ( DB.AccNameTable[id] || HatTable[id] );
	};


	/**
	 * @return {string} Path to pets equipements
	 * @param {number} id (pets)
	 */
	DB.getPetEquipPath = function GetPetEquipPath( id )
	{
		if( id === 0 || !(id in PetInfo.EquipAct) ) {
			return null;
		}

		return "data/texture/" + PetInfo.EquipAct[id];
	};


	/**
	 * @return {string} Path to pets equipements
	 * @param {number} id (pets)
	 */
	DB.getPetIllustPath = function GetPetIllustPath( id )
	{
		return "data/sprite/" + (PetInfo.IllustPath[id] || PetInfo.IllustPath[1002]);
	};


	/**
	 * @return {string} Path to shield
	 * @param {number} id shield
	 * @param {number} job class
	 * @param {boolean} sex
	 */
	DB.getShieldPath = function GetShieldPath( id, job, sex )
	{
		if( id === 0 || !(job in ClassTable) ) {
			return null;
		}
		return "data/sprite/\xb9\xe6\xc6\xd0/" + ClassTable[job] + "/" + ClassTable[job] + "_" + DB.SEX[sex] + "_" + ( ShieldTable[id] || ShieldTable[1] );
	};


	/**
	 * @return {string} Path to weapon
	 * @param {number} id weapon
	 * @param {number} job class
	 * @param {boolean} sex
	 */
	DB.getWeaponPath = function GetWeaponPath( id, job, sex )
	{
		if( id === 0 || !(job in ClassTable) ) {
			return null;
		}

		return "data/sprite/\xc0\xce\xb0\xa3\xc1\xb7/" + ClassTable[job] + "/" + ClassTable[job] + "_" + DB.SEX[sex] + ( WeaponTable.WeaponNameTable[id] || ("_" + id) ) ;
	};


	/**
	 * @return {string} Path to eapon sound
	 * @param {number} weapon id
	 */
	DB.getWeaponSound = function GetWeaponSound( id )
	{
		var type = DB.getWeaponViewID(id);

		// TODO: implement basejob
		if( type === 0 ) {
			// return "_" + ( basejob ) + "_attack.wav";
		}

		return WeaponTable.WeaponHitWaveNameTable[type];
	};


	/**
	 * @return {number} weapon viewid
	 * @param {number} id weapon
	 */
	DB.getWeaponViewID = function GetWeaponViewID(id)
	{
		// Already weapon type.
		if( id < 32 )    return id;

		// Weapon  ID starting at 1100
		if( id <  1100 ) return  0;

		// Specific weapon range inside other range (wtf gravity ?)
		if( id >= 1116 && id <= 1118 ) return  3;  // Katana
		if( id >= 1314 && id <= 1315 ) return  7;  // 2 axe
		if( id >= 1410 && id <= 1412 ) return  5;  // 2 spear
		if( id >= 1472 && id <= 1473 ) return 10;  // 2 rod
		if( id === 1599 ) return  8;  // angra manyu 
		if( (id >= 13157 && id <= 13159) || id === 13172 || id === 13177 ) return 19; // gatling gun
		if( (id >= 13154 && id <= 13156) || id === 13167 || id === 13168 || id === 13169 || id === 13173 || id === 13178) return 20; // rifle
		if( (id >= 13160 && id <= 13162) || id === 13174 || id === 13179 ) return 21;

		// Ranges
		if( id <  1150 ) return  2; // 1100-1149 -> 1 sword
		if( id <  1200 ) return  3; // 1150-1199 -> 2 sword
		if( id <  1250 ) return  1; // 1200-1249 ->   dagger
		if( id <  1300 ) return 16; // 1250-1299 ->   katar
		if( id <  1350 ) return  6; // 1300-1349 -> 1 axe
		if( id <  1400 ) return  7; // 1314-1399 -> 2 axe
		if( id <  1450 ) return  4; // 1400-1449 -> 1 spear
		if( id <  1500 ) return  5; // 1450-1499 -> 2 spear
		if( id <  1550 ) return  8; // 1500-1549 ->   mace
		if( id <  1600 ) return 15; // 1550-1599 ->   book
		if( id <  1650 ) return 10; // 1600-1649 ->   rod
		if( id <  1700 ) return  0;
		if( id <  1750 ) return 11; // 1700-1749 ->   bow
		if( id <  1800 ) return  0;
		if( id <  1850 ) return 12; // 1800-1849 ->   knuckle
		if( id <  1900 ) return  0;
		if( id <  1950 ) return 13; // 1900-1949 ->   instrument
		if( id <  2000 ) return 14; // 1950-1999 ->   whip
		if( id <  2050 ) return 23; // 2000-2049 -> 2 rod
		if( id < 13000 ) return 0;
		if( id < 13050 ) return  1; // 13000-13050 -> dagger
		if( id < 13100 ) return  0;
		if( id < 13150 ) return 17; // 13100-13149 -> revolver
		if( id < 13200 ) return 18; // 13150-13199 -> rifle
		if( id < 13300 ) return  0;
		if( id < 13350 ) return 22; // 13300-13349 -> shurikens
		if( id < 13400 ) return  0;
		if( id < 13450 ) return  2; // 13400-13449 -> sword
		if( id < 18100 ) return  0;
		if( id < 18150 ) return 11; // 18100-18149 -> bow

		// Not found ?
		return 0;
	};


	/**
	 * @return {number} weapon action frame
	 * @param {number} id weapon
	 * @param {number} job
	 */
	DB.getWeaponAction = function GetWeaponAction( id, job )
	{
		var type = DB.getWeaponViewID(id);

		if( job in WeaponAction ) {
			if( type in WeaponAction[job] ) {
				return WeaponAction[job][type];
			}

			if( 0 in WeaponAction[job] ) {
				return WeaponAction[job][0];
			}
		}

		return 0;
	};


	/**
	 * Get back informations from id
	 * @param {number} item id
	 */
	DB.getItemInfo = function GetItemInfo( itemid )
	{
		return DB.itemList[itemid] || DB.itemList[512];
	};


	/**
	 * Get back item path
	 */
	DB.getItemPath = function GetItemPath( itemid, identify )
	{
		var it   = DB.getItemInfo( itemid );
		return "data/sprite/\xbe\xc6\xc0\xcc\xc5\xdb/" + ( identify ? it.identifiedResourceName : it.unidentifiedResourceName );
	};


	/**
	 * Export
	 */
	return DB;
});