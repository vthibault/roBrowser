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
	var SkillId       = require('DB/Skills/SkillConst');
	var SkillInfo     = require('DB/Skills/SkillInfo');
	var StatusConst   = require('DB/Status/StatusConst');
	var Emotions      = require('DB/Emotions');
	var Events        = require('Core/Events');
	var Session       = require('Engine/SessionStorage');
	var Guild         = require('Engine/MapEngine/Guild');
	var Network       = require('Network/NetworkManager');
	var PACKET        = require('Network/PacketStructure');
	var Renderer      = require('Renderer/Renderer');
	var Altitude      = require('Renderer/Map/Altitude');
	var EntityManager = require('Renderer/EntityManager');
	var Entity        = require('Renderer/Entity/Entity');
	var EffectManager = require('Renderer/EffectManager');
	var Damage        = require('Renderer/Effects/Damage');
	var MagicTarget   = require('Renderer/Effects/MagicTarget');
	var LockOnTarget  = require('Renderer/Effects/LockOnTarget');
	var Sound         = require('Audio/SoundManager');
	var ChatBox       = require('UI/Components/ChatBox/ChatBox');
	var ChatRoom      = require('UI/Components/ChatRoom/ChatRoom');
	var StatusIcons   = require('UI/Components/StatusIcons/StatusIcons');
	var BasicInfo     = require('UI/Components/BasicInfo/BasicInfo');
	var Escape        = require('UI/Components/Escape/Escape');
    var MiniMap       = require('UI/Components/MiniMap/MiniMap');


	/**
	 * Spam an entity on the map
	 * Generic packet handler
	 */
	function onEntitySpam( pkt )
	{
		var entity = EntityManager.get(pkt.GID);

		if (entity) {
			entity.set(pkt);
		}
		else {
			entity = new Entity();
			entity.set(pkt);

			EntityManager.add(entity);
		}
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

		// Show escape menu
		if (pkt.GID === Session.Entity.GID && pkt.type === 1) {
			Escape.ui.show();
			Escape.ui.find('.savepoint').show();
			Escape.ui.find('.graphics, .sound, .hotkey').hide();
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
		var entity = EntityManager.get(pkt.AID);
		if (entity) {

			if (Math.abs(entity.position[0] - pkt.xPos) > 1.0 ||
			    Math.abs(entity.position[1] - pkt.yPos) > 1.0) {
				entity.position[0] = pkt.xPos;
				entity.position[1] = pkt.yPos;
				entity.position[2] = Altitude.getCellHeight( pkt.xPos,  pkt.yPos );
			}

			if (entity.action === entity.ACTION.WALK) {
				entity.setAction({
					action: entity.ACTION.IDLE,
					frame:  0,
					repeat: true,
					play:   true
				});
			}
		}
	}


	/**
	 * Move entity to a point
	 *
	 * @param {object} pkt - PACKET_ZC_HIGHJUMP
	 */
	function onEntityJump( pkt )
	{
		var entity = EntityManager.get(pkt.AID);
		if (entity) {
			entity.position[0] = pkt.xPos;
			entity.position[1] = pkt.yPos;
			entity.position[2] = Altitude.getCellHeight( pkt.xPos,  pkt.yPos );
		}
	}


	/**
	 * Body relocation packet support
	 *
	 * @param {object} pkt - PACKET.ZC.FASTMOVE
	 */
	function onEntityFastMove( pkt )
	{
		var entity = EntityManager.get(pkt.AID);
		if (entity) {
			entity.walkTo( entity.position[0], entity.position[1], pkt.targetXpos, pkt.targetYpos );

			if (entity.walk.path.length) {
				var speed = entity.walk.speed;
				entity.walk.speed = 10;
				entity.walk.onEnd = function onWalkEnd(){
					entity.walk.speed = speed;
				};
			}
		}
	}


	/**
	 * Display entity's emotion
	 *
	 * @param {object} pkt - PACKET.ZC.EMOTION
	 */
	function onEntityEmotion( pkt )
	{
		var entity = EntityManager.get(pkt.GID);
		if (entity && (pkt.type in Emotions.indexes)) {
			entity.attachments.add({
				frame: Emotions.indexes[pkt.type],
				file:  'emotion',
				play:   true,
				head:   true,
				depth:  5.0
			});
		}
	}


	/**
	 * Resurect an entity
	 *
	 * @param {object} pkt - PACKET_ZC_RESURRECTION
	 */
	function onEntityResurect( pkt )
	{
		var entity = EntityManager.get(pkt.AID);

		if (!entity) {
			return;
		}

		// There is always a packet to use the skill "Resurection"
		// on yourself after, but what if this packet isn't here ?
		// The entity will stay die ? So update the action just in case
		entity.setAction({
			action: entity.ACTION.IDLE,
			frame:  0,
			repeat: true,
			play:   true
		});

		// If it's our main character update Escape ui
		if (entity === Session.Entity) {
			Escape.ui.hide();
			Escape.ui.find('.savepoint').hide();
			Escape.ui.find('.graphics, .sound, .hotkey').show();
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
			case 0:  // regular
			case 4:  // absorbed
			case 8:  // double attack
			case 9:  // endure
			case 10: // critital
				if (dstEntity) {
					// only if damage and do not have endure
					// and damage isn't absorbed (healing)
					if (pkt.damage && pkt.action !== 9 && pkt.action !== 4) {
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
						switch (pkt.action) {

							// regular damage (and endure)
							case 9:
							case 0:
								Damage.add( pkt.damage, target, Renderer.tick + pkt.attackMT );
								break;

							// double attack
							case 8:
								// Display combo only if entity is mob and the attack don't miss
								if (dstEntity.objecttype === Entity.TYPE_MOB && pkt.damage > 0) {
									Damage.add( pkt.damage / 2, dstEntity, Renderer.tick + pkt.attackMT * 1, Damage.TYPE.COMBO );
									Damage.add( pkt.damage ,    dstEntity, Renderer.tick + pkt.attackMT * 2, Damage.TYPE.COMBO | Damage.TYPE.COMBO_FINAL );
								}

								Damage.add( pkt.damage / 2, target, Renderer.tick + pkt.attackMT * 1 );
								Damage.add( pkt.damage / 2, target, Renderer.tick + pkt.attackMT * 2 );
								break;

							// TODO: critical damage
							case 10:
								Damage.add( pkt.damage, target, Renderer.tick + pkt.attackMT );
								break;

							// TODO: lucky miss
							case 11:
								Damage.add( 0, target, Renderer.tick + pkt.attackMT );
								break;
						}
					}

					// Update entity position
					srcEntity.lookTo( dstEntity.position[0], dstEntity.position[1] );
				}

				srcEntity.attack_speed = pkt.attackMT;
				srcEntity.setAction({
					action: srcEntity.ACTION.ATTACK,
					frame:  0,
					repeat: false,
					play:   true,
					next: {
						delay:  Renderer.tick + pkt.attackMT,
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

		type = ChatBox.TYPE.PUBLIC;
		entity = EntityManager.get(pkt.GID);

		if (entity) {
			entity.dialog.set( pkt.msg );

			// Should not happen
			if (entity === Session.Entity) {
				type |= ChatBox.TYPE.SELF;
			}
			else if (entity.isAdmin) {
				type |= ChatBox.TYPE.ADMIN;
			}
		}

		ChatBox.addText( pkt.msg, type );
	}


	/**
	 * Entity say something in color (channel system)
	 *
	 * @param {object} pkt - PACKET.ZC.NPC_CHAT
	 */
	function onEntityTalkColor( pkt )
	{
		var color = 'rgb(' + ([
			( pkt.color & 0x000000ff ),
			( pkt.color & 0x0000ff00 ) >> 8,
			( pkt.color & 0x00ff0000 ) >> 16
		]).join(',') + ')'; // bgr to rgb.

		// Remove "pseudo : |00Dialogue"
		pkt.msg = pkt.msg.replace(/\: \|\d{2}/, ': ');

		ChatBox.addText( pkt.msg, ChatBox.TYPE.PUBLIC, color);
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

			if (entity.GUID) {
				Guild.requestGuildEmblem(entity.GUID, entity.GEmblemVer, function(image) {
					entity.display.emblem = image;
					entity.display.update(
						entity.objecttype === Entity.TYPE_MOB ? '#ffc6c6' :
						entity.objecttype === Entity.TYPE_NPC ? '#94bdf7' :
						'white'
					)
				});
			}
			else {
				entity.display.emblem = null;
			}

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
     * Shows notification effect for quests and events
     *
     * @param {object} pkt - PACKET.ZC.QUEST_NOTIFY_EFFECT
     */
    function onEntityQuestNotifyEffect( pkt ) {
        var Entity = EntityManager.get(pkt.npcID);
        var color = 0;

        if (pkt.effect !== 9999) {
            var emotionId = pkt.effect + 81;

            if (Entity && (pkt.effect in Emotions.indexes)) {
                Entity.attachments.add({
                    frame: Emotions.indexes[emotionId],
                    file:  'emotion',
                    play:   true,
                    head:   true,
                    repeat: true,
                    depth:  5.0
                });
            }

        }

        switch (pkt.color + 1) {
            case 1:
                // yellow
                color = 0xffff00;
                break;
            case 2:
                // orange
                color = 0xffa500;
                break;
            case 3:
                // green
                color = 0x00e16a;
                break;
            case 4:
                // purple
                color = 0x800080;
                break;
            case 0:
            default:
                return;
        }

        MiniMap.addNpcMark( pkt.npcID, pkt.xPos, pkt.yPos, color, Infinity);
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

			case 1:
				entity.head = pkt.value;
				break;

			case 2:
				// In packet PACKET.ZC.SPRITE_CHANGE2, weapon and shield values are
				// stored in a long value (uint16 and uint16 in uint32)
				// source: https://github.com/rathena/rathena/blob/master/src/map/clif.c#L3162
				if (pkt instanceof PACKET.ZC.SPRITE_CHANGE2) {
					entity.shield = pkt.value >> 16;
					entity.weapon = pkt.value & 0x00FFFF;
				}
				else {
					entity.weapon = pkt.value;
				}
				break;

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

		// Only mob to don't display skill name ?
		if (srcEntity && srcEntity.objecttype !== Entity.TYPE_MOB) {
			srcEntity.dialog.set(
				( (SkillInfo[pkt.SKID] && SkillInfo[pkt.SKID].SkillName ) || 'Unknown Skill' ) + ' !!',
				'white'
			);
		}

		if (dstEntity) {
			if (srcEntity && dstEntity !== srcEntity) {
				srcEntity.lookTo( dstEntity.position[0], dstEntity.position[1] );
			}

			// In healing skill, the level parameter stored the healed value
			if (pkt.SKID === SkillId.AL_HEAL ||
			    pkt.SKID === SkillId.AB_HIGHNESSHEAL ||
			    pkt.SKID === SkillId.AB_CHEAL) {
				Damage.add( pkt.level, dstEntity, Renderer.tick, Damage.TYPE.HEAL );
			}

			EffectManager.spamSkill( pkt.SKID, pkt.targetAID );
		}
	}


	/**
	 * Entity just finish casting a skill to position
	 *
	 * @param {object} pkt - PACKET.ZC.SKILL_ENTRY
	 */
	function onSkillAppear( pkt )
	{
		EffectManager.spamSkillZone( pkt.job, pkt.xPos, pkt.yPos, pkt.AID );
	}


	/**
	 * Remove a skill from screen
	 *
	 * @param {object} pkt - PACKET.ZC.SKILL_DISAPPEAR
	 */
	function onSkillDisapear( pkt )
	{
		EffectManager.remove( null, pkt.AID );
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


			if (srcEntity.objecttype !== Entity.TYPE_MOB) {
				srcEntity.dialog.set( ( (SkillInfo[pkt.SKID] && SkillInfo[pkt.SKID].SkillName ) || 'Unknown Skill' ) + ' !!' );
			}

			var action = (SkillInfo[pkt.SKID] && SkillInfo[pkt.SKID].ActionType) || 'SKILL';

			srcEntity.setAction({
				action: srcEntity.ACTION[action],
				frame:  0,
				repeat: false,
				play:   true,
				next: {
					action: srcEntity.ACTION.READYFIGHT,
					frame:  0,
					repeat: true,
					play:   true,
					next:   false
				}
			});
		}

		if (dstEntity) {
			var target = pkt.damage ? dstEntity : srcEntity;
			var i;

			if (pkt.damage && target) {

				var addDamage = function(i) {
					return function addDamageClosure() {
						var isAlive = dstEntity.action !== dstEntity.ACTION.DIE;
						var isCombo = target.objecttype !== Entity.TYPE_PC && pkt.count > 1;

						EffectManager.spamSkillHit( pkt.SKID, dstEntity.GID, Renderer.tick);
						Damage.add( pkt.damage / pkt.count, target, Renderer.tick);

						// Only display combo if the target is not entity and
						// there are multiple attacks
						if (isCombo) {
							Damage.add(
								pkt.damage / pkt.count * (i+1),
								target,
								Renderer.tick, 
								Damage.TYPE.COMBO | ( (i+1) === pkt.count ? Damage.TYPE.COMBO_FINAL : 0 )
							);
						}

						if (isAlive) {
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
						}
					};
				};

				for (i = 0; i < pkt.count; ++i) {
					Events.setTimeout( addDamage(i), pkt.attackMT + (200 * i)); //TOFIX: why 200 ?
				}
			}
		}

		if (srcEntity && dstEntity) {
			EffectManager.spamSkill( pkt.SKID, dstEntity.GID, null, Renderer.tick + pkt.attackMT);
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

		if (pkt.delayTime) {
			Sound.play('effect/ef_beginspell.wav');
			srcEntity.cast.set( pkt.delayTime );

			srcEntity.setAction({
				action: srcEntity.ACTION.SKILL,
				frame:  0,
				repeat: false,
				play:   false
			});
		}

		// Only mob to don't display skill name ?
		if (srcEntity.objecttype !== Entity.TYPE_MOB) {
			srcEntity.dialog.set(
				( ( SkillInfo[pkt.SKID] && SkillInfo[pkt.SKID].SkillName ) || 'Unknown Skill' ) + ' !!',
				'white'
			);
		}

		if (dstEntity && dstEntity !== srcEntity) {
			srcEntity.lookTo( dstEntity.position[0], dstEntity.position[1] );

			if (pkt.delayTime) {
				EffectManager.add(new LockOnTarget( dstEntity, Renderer.tick, Renderer.tick + pkt.delayTime), srcEntity.GID);
			}
		}
		else if (pkt.xPos && pkt.yPos) {
			srcEntity.lookTo( pkt.xPos, pkt.yPos );

			if (pkt.delayTime) {
				EffectManager.add(new MagicTarget( pkt.SKID, pkt.xPos, pkt.yPos, Renderer.tick + pkt.delayTime), srcEntity.GID);
			}
		}
	}


	/**
	 * A cast from an entity just canceled
	 *
	 * @param {object} pkt - PACKET.ZC.DISPEL
	 */
	function onEntityCastCancel(pkt)
	{
		var entity = EntityManager.get(pkt.AID);
		if (entity) {
			entity.cast.clean();

			// Cancel effects
			EffectManager.remove(LockOnTarget, entity.GID);
			EffectManager.remove(MagicTarget, entity.GID);
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

			// Maya purple card
			case StatusConst.CLAIRVOYANCE:
				if (entity === Session.Entity) {
					Session.intravision = pkt.state;
					EntityManager.forEach(function(entity){
						entity.effectState = entity.effectState;
					});
				}
				break;

			// Show cart (in future)
			case StatusConst.ON_PUSH_CART:
				if (entity === Session.Entity) {
					Session.hasCart = pkt.state;
				}
				break;

			// Cast a skill, TODO: add progressbar in shortcut
			case StatusConst.POSTDELAY:
				entity.setAction({
					action: entity.ACTION.SKILL,
					frame:  0,
					repeat: false,
					play:   true,
					next: {
						action: entity.ACTION.READYFIGHT,
						frame:  0,
						repeat: true,
						play:   true,
						next:   false
					}
				});
				break;
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

		if (pkt instanceof PACKET.ZC.STORE_ENTRY) {
			entity = EntityManager.get( pkt.makerAID );
			if (entity) {
				entity.room.create(
					pkt.storeName,
					pkt.makerAID,
					entity.room.constructor.Type.BUY_SHOP,
					true
				);
			}
			return;
		}

		if (pkt instanceof PACKET.ZC.BUYING_STORE_ENTRY) {
			entity = EntityManager.get( pkt.makerAID );
			if (entity) {
				entity.room.create(
					pkt.storeName,
					pkt.makerAID,
					entity.room.constructor.Type.SELL_SHOP,
					true
				);
			}
			return;
		}

		if (pkt instanceof PACKET.ZC.ROOM_NEWENTRY) {
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
			};
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
		Network.hookPacket( PACKET.ZC.NOTIFY_STANDENTRY8,           onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_NEWENTRY8,             onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_MOVEENTRY8,            onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_STANDENTRY9,           onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_NEWENTRY9,             onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_MOVEENTRY9,            onEntitySpam );
		Network.hookPacket( PACKET.ZC.NOTIFY_VANISH,                onEntityVanish );
		Network.hookPacket( PACKET.ZC.NOTIFY_MOVE,                  onEntityMove );
		Network.hookPacket( PACKET.ZC.STOPMOVE,                     onEntityStopMove );
		Network.hookPacket( PACKET.ZC.NOTIFY_ACT,                   onEntityAction );
		Network.hookPacket( PACKET.ZC.NOTIFY_ACT2,                  onEntityAction );
		Network.hookPacket( PACKET.ZC.NOTIFY_ACT3,                  onEntityAction );
		Network.hookPacket( PACKET.ZC.NOTIFY_CHAT,                  onEntityTalk );
		Network.hookPacket( PACKET.ZC.NPC_CHAT,                     onEntityTalkColor );
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
		Network.hookPacket( PACKET.ZC.SKILL_ENTRY,                  onSkillAppear);
		Network.hookPacket( PACKET.ZC.SKILL_ENTRY2,                 onSkillAppear);
		Network.hookPacket( PACKET.ZC.SKILL_ENTRY3,                 onSkillAppear);
		Network.hookPacket( PACKET.ZC.SKILL_ENTRY4,                 onSkillAppear);
		Network.hookPacket( PACKET.ZC.SKILL_ENTRY5,                 onSkillAppear);
		Network.hookPacket( PACKET.ZC.SKILL_DISAPPEAR,              onSkillDisapear);
		Network.hookPacket( PACKET.ZC.DISPEL,                       onEntityCastCancel);
		Network.hookPacket( PACKET.ZC.HIGHJUMP,                     onEntityJump);
		Network.hookPacket( PACKET.ZC.FASTMOVE,                     onEntityFastMove);
		Network.hookPacket( PACKET.ZC.RESURRECTION,                 onEntityResurect);
		Network.hookPacket( PACKET.ZC.EMOTION,                      onEntityEmotion);
		Network.hookPacket( PACKET.ZC.NOTIFY_MONSTER_HP,            onEntityLifeUpdate);
        Network.hookPacket( PACKET.ZC.QUEST_NOTIFY_EFFECT,          onEntityQuestNotifyEffect);
    };
});