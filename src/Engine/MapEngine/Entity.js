/**
 * Engine/MapEngine/Entity.js
 *
 * Manage Entity based on received packets from server 
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
	var SkillId       = require('DB/SkillId');
	var SkillInfo     = require('DB/SkillInfo');
	var Options       = require('DB/StatusConst');
	var Session       = require('Engine/SessionStorage');
	var Network       = require('Network/NetworkManager');
	var PACKET        = require('Network/PacketStructure');
	var Renderer      = require('Renderer/Renderer');
	var Effects       = require('Renderer/Effects');
	var EntityManager = require('Renderer/EntityManager');
	var Entity        = require('Renderer/Entity/Entity');
	var Altitude      = require('Renderer/Map/Altitude');
	var ChatBox       = require('UI/Components/ChatBox/ChatBox');
	var ChatRoom      = require('UI/Components/ChatRoom/ChatRoom');
	var StatusIcons   = require('UI/Components/StatusIcons/StatusIcons');
	var BasicInfo     = require('UI/Components/BasicInfo/BasicInfo');
	var Damage        = require('Renderer/Effects/Damage');
	var MagicTarget   = require('Renderer/Effects/MagicTarget');
	var LockOnTarget  = require('Renderer/Effects/LockOnTarget');


	/**
	 * Spam an entity on the map
	 * Generic packet handler
	 */
	function onEntitySpam( pkt )
	{
		var entity = new Entity();
		entity.set(pkt);

		EntityManager.add(entity);
	}


	/**
	 * Remove an entity from the map
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_VANISH
	 */
	function onEntityVanish( pkt )
	{
		var entity = EntityManager.get(pkt.GID);
		if (entity) {
			entity.remove( pkt.type );
		}
	}


	/**
	 * An entity start walking
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_MOVE
	 */
	function onEntityMove( pkt )
	{
		var entity = EntityManager.get(pkt.GID);
		if (entity) {
			//entity.position[0] = pkt.MoveData[0];
			//entity.position[1] = pkt.MoveData[1];
			//entity.position[2] = Altitude.getCellHeight(  pkt.MoveData[0],  pkt.MoveData[1] );
			entity.walkTo( pkt.MoveData[0], pkt.MoveData[1], pkt.MoveData[2], pkt.MoveData[3] );
		}
	}


	/**
	 * Entity stop walking
	 *
	 * @param {object} pkt - PACKET.ZC.STOPMOVE
	 */
	function onEntityStopMove( pkt )
	{
		var entity = EntityManager.get(pkt.GID);
		if (entity) {

			if (Math.abs(entity.position[0] - pkt.xPos) > 1.0 ||
			    Math.abs(entity.position[1] - pkt.yPos) > 1.0) {
				entity.position[0] = pkt.xPos;
				entity.position[1] = pkt.yPos;
				entity.position[2] = Altitude.getCellHeight( pkt.xPos,  pkt.yPos );
			}

			entity.setAction({
				action: entity.ACTION.IDLE,
				frame:  0,
				repeat: true,
				play:   true
			});
		}
	}


	/**
	 * Perform Entity Action
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_ACT
	 */
	function onEntityAction( pkt )
	{
		var srcEntity = EntityManager.get(pkt.GID);
		var dstEntity = EntityManager.get(pkt.targetGID);
		var target;

		// Entity out of the screen ?
		if (!srcEntity) {
			return;
		}

		switch (pkt.action) {

			// Damage
			case 8:
			case 0:
				if (dstEntity) {
					if (pkt.damage) {
						dstEntity.setAction({
							delay:  Renderer.tick + pkt.attackMT,
							action: dstEntity.ACTION.HURT,
							frame:  0,
							repeat: false,
							play:   true,
							next: {
								delay:  Renderer.tick + pkt.attackMT * 2,
								action: dstEntity.ACTION.READYFIGHT,
								frame:  0,
								repeat: true,
								play:   true,
								next:   false
							}
						});
					}

					target = pkt.damage ? dstEntity : srcEntity;

					if (target) {
						// Display damage
						if (pkt.action === 0) {
							Damage.add( pkt.damage, target, Renderer.tick + pkt.attackMT );
						}
						else if (pkt.action === 8) {

							// Display combo only if entity is mob and the attack don't miss
							if (dstEntity.objecttype === Entity.TYPE_MOB && pkt.damage > 0) {
								Damage.add( pkt.damage / 2, dstEntity, Renderer.tick + pkt.attackMT * 1, Damage.TYPE.COMBO );
								Damage.add( pkt.damage ,    dstEntity, Renderer.tick + pkt.attackMT * 2, Damage.TYPE.COMBO | Damage.TYPE.COMBO_FINAL );
							}

							Damage.add( pkt.damage / 2, target, Renderer.tick + pkt.attackMT * 1 );
							Damage.add( pkt.damage / 2, target, Renderer.tick + pkt.attackMT * 2 );
						}
					}

					// Update entity position
					srcEntity.lookTo( dstEntity.position[0], dstEntity.position[1] );
				}

				pkt.attackMT = Math.min( 450, pkt.attackMT); // FIXME: cap value ?
				pkt.attackMT = Math.max(   1, pkt.attackMT);
				srcEntity.attack_speed = pkt.attackMT;
				srcEntity.setAction({
					action: srcEntity.ACTION.ATTACK,
					frame:  0,
					repeat: false,
					play:   true,
					next: {
						delay:  Renderer.tick + pkt.attackMT * 2,
						action: srcEntity.ACTION.READYFIGHT,
						frame:  0,
						repeat: true,
						play:   true,
						next:  false
					}
				});
				break;

			// Pickup item
			case 1:
				srcEntity.setAction({
					action: srcEntity.ACTION.PICKUP,
					frame:  0,
					repeat: false,
					play:   true,
					next:{
						action: srcEntity.ACTION.IDLE,
						frame:  0,
						repeat: true,
						play:   true,
						next:   false
					}
				});
				if (dstEntity) {
					srcEntity.lookTo( dstEntity.position[0], dstEntity.position[1] );
				}
				break;

			// Sit Down
			case 2:
				srcEntity.setAction({
					action: srcEntity.ACTION.SIT,
					frame:  0,
					repeat: true,
					play:   true
				});
				break;

			// Stand up
			case 3:
				srcEntity.setAction({
					action: srcEntity.ACTION.IDLE,
					frame:  0,
					repeat: true,
					play:   true
				});
				break;

			/* TODO:
			 * type=04 reflected/absorbed damage?
			 * type=08 double attack
			 * type=09 don't display flinch animation (endure)
			 * type=0a critical hit
			 * type=0b lucky dodge
			 */
		}
	}


	/**
	 * Entity say something
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_CHAT
	 */
	function onEntityTalk( pkt )
	{
		var entity, type;

		// Remove "pseudo : |00Dialogue
		pkt.msg = pkt.msg.replace(/\: \|\d{2}/, ': ');
		
		if (ChatRoom.isOpen) {
			ChatRoom.message(pkt.msg);
			return;
		}

		entity = EntityManager.get(pkt.GID);
		if (entity) {
			entity.dialog.set( pkt.msg );
		}

		type = ChatBox.TYPE.PUBLIC;

		// Should not happened
		if (entity === Session.Entity) {
			type |= ChatBox.TYPE.SELF;
		}

		ChatBox.addText( pkt.msg, type );
	}


	/**
	 * Display entity's name
	 *
	 * @param {object} pkt - PACKET.ZC.ACK_REQNAME
	 */
	function onEntityIdentity( pkt )
	{
		var entity = EntityManager.get(pkt.AID);
		if (entity) {
			entity.display.name = pkt.CName;

			entity.display.party_name = pkt.PName || '';
			entity.display.guild_name = pkt.GName || '';
			entity.display.guild_rank = pkt.RName || '';

			entity.display.load = entity.display.TYPE.COMPLETE;
			entity.display.update(
				entity.objecttype === Entity.TYPE_MOB ? '#ffc6c6' :
				entity.objecttype === Entity.TYPE_NPC ? '#94bdf7' :
				'white'
			);

			if (EntityManager.getOverEntity() === entity) {
				entity.display.add();
			}
		}
	}


	/**
	 * Update entity's life
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_MONSTER_HP
	 */
	function onEntityLifeUpdate( pkt )
	{
		var entity = EntityManager.get(pkt.AID);
		if (entity) {
			entity.life.hp = pkt.hp;
			entity.life.hp_max = pkt.maxhp;
			entity.life.update();
		}
	}


	/**
	 * Updating entity direction
	 *
	 * @param {object} pkt - PACKET.ZC.CHANGE_DIRECTION
	 */
	function onEntityDirectionChange( pkt )
	{
		var entity = EntityManager.get(pkt.AID);
		if (entity) {
			entity.direction = ([ 4, 3, 2, 1, 0, 7, 6, 5 ])[pkt.dir];
			entity.headDir   = pkt.headDir;
		}
	}


	/**
	 * Update Entity's visual look
	 *
	 * @param {object} pkt - PACKET.ZC.SPRITE_CHANGE2
	 */
	function onEntityViewChange( pkt )
	{
		var entity = EntityManager.get(pkt.GID);

		if (!entity) {
			return;
		}

		switch (pkt.type) {
			case 0:
				entity.job = pkt.value;
				if (entity === Session.Entity) {
					BasicInfo.update('job', pkt.value);
				}
				break;

			case 1: entity.head        = pkt.value; break;
			case 2: entity.weapon      = pkt.value; break;
			case 3: entity.accessory   = pkt.value; break;
			case 4: entity.accessory2  = pkt.value; break;
			case 5: entity.accessory3  = pkt.value; break;
			case 6: entity.headpalette = pkt.value; break;
			case 7: entity.bodypalette = pkt.value; break;
			case 8: entity.shield      = pkt.value; break;
			case 9:  break; // UNKNOWN
			case 10: break; // UNKNOWN²
			case 11: break; // robe, not supported yet
		}
	}


	/**
	 * Entity use skill on another entity (no damage : heal, boost, etc.)
	 *
	 * @param {object} pkt - PACKET.ZC.USE_SKILL
	 */
	function onEntityUseSkill( pkt )
	{
		var srcEntity = EntityManager.get(pkt.srcAID);
		var dstEntity = EntityManager.get(pkt.targetAID);

		if (!srcEntity) {
			return;
		}

		srcEntity.setAction({
			action: srcEntity.ACTION.SKILL,
			frame:  0,
			repeat: false,
			play:   true,
			next: {
				action: srcEntity.ACTION.IDLE,
				frame: 0,
				repeat: true,
				play: true,
				next: false
			}
		});

		// Only mob to don't display skill name ?
		if (srcEntity.objecttype !== Entity.TYPE_MOB) {
			srcEntity.dialog.set(
				( (SkillInfo[pkt.SKID] && SkillInfo[pkt.SKID].SkillName ) || 'Unknown Skill' ) + ' !!',
				'white'
			);
		}

		if (dstEntity) {
			srcEntity.lookTo( dstEntity.position[0], dstEntity.position[1] );

			// Don't know why Gravity did this...
			if (pkt.SKID === SkillId.AL_HEAL) {
				Damage.add( pkt.level, dstEntity, Renderer.tick, Damage.TYPE.HEAL );
			}
			else {
				// skill_lvl = heal.
			}
		}
	}


	/**
	 * Entity just finish casting a skill to position
	 *
	 * @param {object} pkt - PACKET.ZC.SKILL_ENTRY
	 */
	function onEntityUseSkillToPosition( pkt )
	{
		var srcEntity = EntityManager.get(pkt.creatorAID);

		if (srcEntity) {
			srcEntity.setAction({
				action: srcEntity.ACTION.SKILL,
				frame:  0,
				repeat: false,
				play:   true,
				next: {
					action: srcEntity.ACTION.READYFIGHT,
					frame:  0,
					repeat: true,
					play:   true,
					next:  false
				}
			});
		}
/*
		this.AID        = fp.readULong(); // skill effect unique id
		this.creatorAID = fp.readULong();
		this.xPos       = fp.readShort();
		this.yPos       = fp.readShort();
		this.job        = fp.readULong();
		this.range      = fp.readChar();
		this.isVisible  = fp.readUChar();
		this.level      = fp.readUChar();
		this.msg        = fp.readString(end-fp.tell());
*/
	}


	/**
	 * Entity use skill on another entity with damage
	 *
	 * @param {object} pkt - PACKET.ZC.NOTIFY_SKILL
	 */
	function onEntityUseSkillToAttack( pkt )
	{
		var srcEntity = EntityManager.get(pkt.AID);
		var dstEntity = EntityManager.get(pkt.targetID);

		if (srcEntity) {
			pkt.attackMT = Math.min( 450, pkt.attackMT ); // FIXME: cap value ?
			pkt.attackMT = Math.max(   1, pkt.attackMT );
			srcEntity.attack_speed = pkt.attackMT;

			srcEntity.setAction({
				action: srcEntity.ACTION.SKILL,
				frame:  0,
				repeat: false,
				play:   true,
				next: {
					action: srcEntity.ACTION.READYFIGHT,
					frame:  0,
					repeat: true,
					play:   true,
					next:  false
				}
			});

			if (srcEntity.objecttype !== Entity.TYPE_MOB) {
				srcEntity.dialog.set( ( (SkillInfo[pkt.SKID] && SkillInfo[pkt.SKID].SkillName ) || 'Unknown Skill' ) + ' !!' );
			}
		}

		if (dstEntity) {
			pkt.attackedMT = Math.min( 450, pkt.attackedMT ); // FIXME: cap value ?
			pkt.attackedMT = Math.max(   1, pkt.attackedMT );
			dstEntity.attack_speed = pkt.attackedMT;

			var aspd   = (srcEntity && srcEntity.attack_speed) || 150;
			var target = pkt.damage ? dstEntity : srcEntity;
			var i;

			if (pkt.damage) {
				dstEntity.setAction({
					action: dstEntity.ACTION.HURT,
					frame:  0,
					repeat: false,
					play:   true,
					next: {
						action: dstEntity.ACTION.READYFIGHT,
						frame:  0,
						repeat: true,
						play:   true,
						next:   false
					}
				});

				// Combo
				if (target) {
					for (i = 0; i<pkt.count; ++i) {
						Damage.add(
							Math.floor( pkt.damage / pkt.count * (i+1) ),
							target,
							Renderer.tick + aspd + ( 200 * i ), //TOFIX: why 200 ?
							Damage.TYPE.COMBO | ( (i+1) === pkt.count ? Damage.TYPE.COMBO_FINAL : 0 )
						);
					}
				}
			}

			// Damage
			if (target) {
				for (i = 0; i<pkt.count; ++i) {
					Damage.add(
						Math.floor( pkt.damage / pkt.count ),
						target,
						Renderer.tick + aspd + ( 200 * i )
					);
				}
			}
		}
	}


	/**
	 * Cast a skill to someone
	 * @param {object} pkt - pkt PACKET.ZC.USESKILL_ACK
	 */
	function onEntityCastSkill( pkt )
	{
		// property:
		//     0 = Yellow cast aura
		//     1 = Water elemental cast aura
		//     2 = Earth elemental cast aura
		//     3 = Fire elemental cast aura
		//     4 = Wind elemental cast aura
		//     5 = Poison elemental cast aura
		//     6 = Holy elemental cast aura
		//     ? = like 0
		// is disposable:
		//     0 = yellow chat text "[src name] will use skill [skill name]."
		//     1 = no text

		var srcEntity = EntityManager.get(pkt.AID);
		var dstEntity = EntityManager.get(pkt.targetID);

		if (!srcEntity) {
			return;
		}

		srcEntity.cast.set( pkt.delayTime );
		srcEntity.setAction({
			action: srcEntity.ACTION.SKILL,
			frame:  0,
			repeat: false,
			play:   false
		});

		// Only mob to don't display skill name ?
		if (srcEntity.objecttype !== Entity.TYPE_MOB) {
			srcEntity.dialog.set(
				( ( SkillInfo[pkt.SKID] && SkillInfo[pkt.SKID].SkillName ) || 'Unknown Skill' ) + ' !!',
				'white'
			);
		}

		if (dstEntity && dstEntity !== srcEntity) {
			srcEntity.lookTo( dstEntity.position[0], dstEntity.position[1] );
			Effects.add(new LockOnTarget( dstEntity, Renderer.tick, Renderer.tick + pkt.delayTime));
		}
		else if (pkt.xPos && pkt.yPos) {
			srcEntity.lookTo( pkt.xPos, pkt.yPos );

			if (pkt.delayTime) {
				Effects.add(new MagicTarget( pkt.SKID, pkt.xPos, pkt.yPos, Renderer.tick + pkt.delayTime));
			}
		}
	}


	/**
	 * Update Player status
	 *
	 * @param {object} pkt - PACKET.ZC.MSG_STATE_CHANGE
	 */
	function onEntityStatusChange( pkt )
	{
		var entity = EntityManager.get( pkt.AID );
		if (!entity) {
			return;
		}

		// TODO: add other status
		switch (pkt.index) {

			case 27: //SI_RIDING (status.h)
				var job = entity.job;
				var newjob  = (
					job === 7    ? 13   : // knight
					job === 14   ? 21   : // cruzader
					job === 4030 ? 4036 : // baby knight
					job === 4037 ? 4044 : // baby crusader
					job === 4008 ? 4014 : // lord knight
					job === 4015 ? 4022 : // paladin
					job
				);

				// Update job
				if (newjob !== job) {
					entity.job = newjob;
				}
				break;

			default:
		}

		// Modify icon
		if (entity === Session.Entity) {
			StatusIcons.update( pkt.index, pkt.state, pkt.RemainMS );
		}
	}


	/**
	 * Update player option
	 *
	 * @param {object} pkt - PACKET.ZC.STATE_CHANGE
	 */
	function onEntityOptionChange( pkt )
	{
		var entity = EntityManager.get( pkt.AID );
		if (!entity) {
			return;
		}

		entity.effectColor[0] = 1.0;
		entity.effectColor[1] = 1.0;
		entity.effectColor[2] = 1.0;
		entity.effectColor[3] = 1.0;

		// Invisible
		if (pkt.effectState & (
			Options.EffectState.HIDE      |
			Options.EffectState.CLOAK     |
			Options.EffectState.INVISIBLE |
			Options.EffectState.CHASEWALK)) {
				if (Session.intravision) {
					entity.effectColor[0] = 0;
					entity.effectColor[1] = 0;
					entity.effectColor[2] = 0;
				}
				else {
					entity.effectColor[3] = 0.0;
				}
				return;
		}

		// Curse
		if (pkt.healthState & Options.HealthState.CURSE) {
			// entity.attachEffect("data/sprite/ÀÌÆÑÆ®/status-curse")
			entity.effectColor[0] = 0.50;
			entity.effectColor[1] = 0.15;
			entity.effectColor[2] = 0.10;
		}
		else if (entity.healthState & Options.HealthState.CURSE) {
			// entity.detachEffect("data/sprite/ÀÌÆÑÆ®/status-curse")
		}

		// Poison
		if (pkt.healthState & Options.HealthState.POISON) {
			entity.effectColor[0] = 0.9;
			entity.effectColor[1] = 0.4;
			entity.effectColor[2] = 0.8;
		}


		// Remove previous effect
		if (pkt.bodyState !== entity.bodyState) {
			switch (entity.bodyState) {
				case Options.BodyState.SLEEP:
					//entity.detachEffect("data\sprite\ÀÌÆÑÆ®\status-sleep");
					break;

				case Options.BodyState.FREEZE:
					//entity.detachEffect("data\sprite\ÀÌÆÑÆ®\¾óÀ½¶¯");
					break;

				case Options.BodyState.STUN:
					//entity.detachEffect("data\sprite\ÀÌÆÑÆ®\status-stun")
					break;
			}
		}

		switch (pkt.bodyState) {
			case Options.BodyState.STONE:
				entity.effectColor[0] = 0.1;
				entity.effectColor[1] = 0.1;
				entity.effectColor[2] = 0.1;
				break;

			case Options.BodyState.STONEWAIT:
				entity.effectColor[0] = 0.3;
				entity.effectColor[1] = 0.3;
				entity.effectColor[2] = 0.3;
				break;

			case Options.BodyState.SLEEP:
				//entity.attachEffect("data\sprite\ÀÌÆÑÆ®\status-sleep");
				break;


			case Options.BodyState.FREEZE:
				entity.effectColor[0] = 0.0;
				entity.effectColor[1] = 0.4;
				entity.effectColor[2] = 0.8;
				//entity.attachEffect("data\sprite\ÀÌÆÑÆ®\¾óÀ½¶¯");
				break;

			case Options.BodyState.STUN:
				//entity.attachEffect("data\sprite\ÀÌÆÑÆ®\status-stun")
				break;
		}

		entity.bodyState   = pkt.bodyState;
		entity.healthState = pkt.healthState;
		entity.effectState = pkt.effectState;
		entity.isPKModeON  = pkt.isPKModeON;
	}


	/**
	 * Display a shop above entity's head
	 *
	 * @param {object} pkt - PACKET.ZC.STORE_ENTRY / PACKET.ZC.DISAPPEAR_BUYING_STORE_ENTRY
	 */
	function onEntityCreateRoom( pkt )
	{
		var entity;

		switch (pkt.constructor.name) {
			case 'PACKET_ZC_STORE_ENTRY':
				entity = EntityManager.get( pkt.makerAID );
				if (entity) {
					entity.room.create(
						pkt.storeName,
						pkt.makerAID,
						entity.room.constructor.Type.BUY_SHOP,
						true
					);
				}
				break;

			case 'PACKET_ZC_BUYING_STORE_ENTRY':
				entity = EntityManager.get( pkt.makerAID );
				if (entity) {
					entity.room.create(
						pkt.storeName,
						pkt.makerAID,
						entity.room.constructor.Type.SELL_SHOP,
						true
					);
				}
				break;

			case 'PACKET_ZC_ROOM_NEWENTRY':
				entity = EntityManager.get( pkt.AID );
				if (entity) {

					var type  = entity.room.constructor.Type.PUBLIC_CHAT;
					var title = pkt.title + '('+ pkt.curcount +'/'+ pkt.maxcount +')';

					switch (pkt.type) {
						case 0: // password
							type = entity.room.constructor.Type.PRIVATE_CHAT;
							break;

						case 1: break; // public
						case 2: break; // arena (npc waiting room)

						case 3: // PK zone - non clickable ???
							title = pkt.title; // no user limit
							break;
					}
					
					entity.room.title = pkt.title;
					entity.room.limit = pkt.maxcount;
					entity.room.count = pkt.curcount;

					entity.room.create(
						title,
						pkt.roomID,
						type,
						true
					);
				}
				break;
		}
	}


	/**
	 * Remove entity room
	 *
	 * @param {object} pkt - PACKET.ZC.DISAPPEAR_ENTRY
	 */
	function onEntityDestroyRoom( pkt )
	{
		if ('roomID' in pkt) {
			EntityManager.forEach(function(entity){
				if (entity.room.id === pkt.roomID) {
					entity.room.remove();
					return false;
				}
				return true;
			});
			return;
		}

		var entity = EntityManager.get( pkt.makerAID );
		if (entity) {
			entity.room.remove();
		}
	}


	/**
	 * Initialize
	 */
	return function EntityEngine()
	{
		Network.hookPacket( PACKET.ZC.NOTIFY_STANDENTRY,            onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_NEWENTRY,              onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_ACTENTRY,              onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_MOVEENTRY,             onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_STANDENTRY_NPC,        onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_STANDENTRY2,           onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_NEWENTRY2,             onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_MOVEENTRY2,            onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_STANDENTRY3,           onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_NEWENTRY3,             onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_MOVEENTRY3,            onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_STANDENTRY4,           onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_NEWENTRY4,             onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_MOVEENTRY4,            onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_STANDENTRY5,           onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_NEWENTRY5,             onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_MOVEENTRY5,            onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_STANDENTRY6,           onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_NEWENTRY6,             onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_MOVEENTRY6,            onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_STANDENTRY7,           onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_NEWENTRY7,             onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_MOVEENTRY7,            onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_VANISH,                onEntityVanish );
		Network.hookPacket( PACKET.ZC.NOTIFY_MOVE,                  onEntityMove );
		Network.hookPacket( PACKET.ZC.STOPMOVE,                     onEntityStopMove );
		Network.hookPacket( PACKET.ZC.NOTIFY_ACT,                   onEntityAction );
		Network.hookPacket( PACKET.ZC.NOTIFY_ACT2,                  onEntityAction );
		Network.hookPacket( PACKET.ZC.NOTIFY_CHAT,                  onEntityTalk );
		Network.hookPacket( PACKET.ZC.ACK_REQNAME,                  onEntityIdentity );
		Network.hookPacket( PACKET.ZC.ACK_REQNAMEALL,               onEntityIdentity );
		Network.hookPacket( PACKET.ZC.CHANGE_DIRECTION,             onEntityDirectionChange );
		Network.hookPacket( PACKET.ZC.SPRITE_CHANGE,                onEntityViewChange );
		Network.hookPacket( PACKET.ZC.SPRITE_CHANGE2,               onEntityViewChange );
		Network.hookPacket( PACKET.ZC.USE_SKILL,                    onEntityUseSkill );
		Network.hookPacket( PACKET.ZC.NOTIFY_SKILL,                 onEntityUseSkillToAttack );
		Network.hookPacket( PACKET.ZC.NOTIFY_SKILL2,                onEntityUseSkillToAttack );
		Network.hookPacket( PACKET.ZC.NOTIFY_SKILL_POSITION,        onEntityUseSkillToAttack );
		Network.hookPacket( PACKET.ZC.USESKILL_ACK,                 onEntityCastSkill );
		Network.hookPacket( PACKET.ZC.USESKILL_ACK2,                onEntityCastSkill );
		Network.hookPacket( PACKET.ZC.STATE_CHANGE,                 onEntityOptionChange );
		Network.hookPacket( PACKET.ZC.STATE_CHANGE3,                onEntityOptionChange );
		Network.hookPacket( PACKET.ZC.MSG_STATE_CHANGE,             onEntityStatusChange );
		Network.hookPacket( PACKET.ZC.MSG_STATE_CHANGE2,            onEntityStatusChange );
		Network.hookPacket( PACKET.ZC.MSG_STATE_CHANGE3,            onEntityStatusChange );
		Network.hookPacket( PACKET.ZC.MSG_STATE_CHANGE4,            onEntityStatusChange );
		Network.hookPacket( PACKET.ZC.MSG_STATE_CHANGE5,            onEntityStatusChange );
		Network.hookPacket( PACKET.ZC.STORE_ENTRY,                  onEntityCreateRoom );
		Network.hookPacket( PACKET.ZC.DISAPPEAR_ENTRY,              onEntityDestroyRoom );
		Network.hookPacket( PACKET.ZC.BUYING_STORE_ENTRY,           onEntityCreateRoom );
		Network.hookPacket( PACKET.ZC.DISAPPEAR_BUYING_STORE_ENTRY, onEntityDestroyRoom );
		Network.hookPacket( PACKET.ZC.ROOM_NEWENTRY,                onEntityCreateRoom );
		Network.hookPacket( PACKET.ZC.DESTROY_ROOM,                 onEntityDestroyRoom );
		Network.hookPacket( PACKET.ZC.SKILL_ENTRY,                  onEntityUseSkillToPosition);
		Network.hookPacket( PACKET.ZC.SKILL_ENTRY2,                 onEntityUseSkillToPosition);
		Network.hookPacket( PACKET.ZC.SKILL_ENTRY3,                 onEntityUseSkillToPosition);
		Network.hookPacket( PACKET.ZC.SKILL_ENTRY4,                 onEntityUseSkillToPosition);
		Network.hookPacket( PACKET.ZC.SKILL_ENTRY5,                 onEntityUseSkillToPosition);
	};
});