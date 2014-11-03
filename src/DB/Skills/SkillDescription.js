/**
 * DB/Skills/SkillDescription.js
 *
 * Skill Description tABLE
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(["./SkillConst"], function( SKID )
{
	"use strict";


	var SkillDescription = {};


	SkillDescription[SKID.NV_BASIC] = [
		"Basic Skill",
		"MAX Lv : 9",
		"Type:^000099 Passive ^000000",
		"^777777Enable to apply Basic Interface Skills. ^000000",
		"[Lv 1]: Enables Trading",
		"^777777Allows the trading of items with other characters. ^990000Right click on a character to initiate a trade.^000000",
		"[Lv 2]: Enables Emotions",
		"^777777Use Alt+(0~9) and",
		"Ctrl+(1,-,=.\\) keys to express emotions. Alt+L will open a window with additional Emotion icons.^000000",
		"[Lv 3]: Enables Sitting",
		"^777777Enables the character to sit, which doubles HP/SP Recovery Speed. ^990000To sit, press the Insert key or enter the /sit command in the Chat Window.^000000",
		"[Lv 4]: Enables Chat Room Creation",
		"^777777Allows character to open Chat Rooms by pressing the Alt+C keys or the Chat button^FFFFFF    ^777777in the Basic Information Window.^000000",
		"[Lv 5]: Join a Party",
		"^777777Character can join a party.^000000 ",
		"[Lv 6]: Enables Use of Kafra Storage",
		"^777777Allows use of Kafra Storage.^000000",
		"[Lv 7]: Organize Party",
		"^777777Create a party by using the /organize \"[Party Name]\" command. Set party options by using the Party Window (Alt+Z).^000000",
		"[Lv 9]: Enables Change to First Job Class",
		"^777777Qualifies character for change from Novice to one of the First Job Classes.^000000",
	].join("\n");

	SkillDescription[SKID.SM_SWORD] = [
		"Sword Mastery",
		"MAX Lv : 10",
		"Type:^000099 Passive ^000000",
		"Effect: ^777777Increase damage with One Handed Sword Class Weapons.^000000",
		"[Lv 1]: ^777777Atk +4^000000",
		"[Lv 2]: ^777777Atk +8^000000",
		"[Lv 3]: ^777777Atk +12^000000",
		"[Lv 4]: ^777777Atk +16^000000",
		"[Lv 5]: ^777777Atk +20^000000",
		"[Lv 6]: ^777777Atk +24^000000",
		"[Lv 7]: ^777777Atk +28^000000",
		"[Lv 8]: ^777777Atk +32^000000",
		"[Lv 9]: ^777777Atk +36^000000",
		"[Lv 10]: ^777777Atk +40^000000",
	].join("\n");

	SkillDescription[SKID.SM_TWOHAND] = [
		"Two-Handed Sword Mastery",
		"MAX Lv : 10",
		"Type:^000099 Passive ^000000",
		"Effect:^777777Increase damage with Two Handed Sword Class Weapons.^000000",
		"[Lv 1]: ^777777Atk +4^000000",
		"[Lv 2]: ^777777Atk +8^000000",
		"[Lv 3]: ^777777Atk +12^000000",
		"[Lv 4]: ^777777Atk +16^000000",
		"[Lv 5]: ^777777Atk +20^000000",
		"[Lv 6]: ^777777Atk +24^000000",
		"[Lv 7]: ^777777Atk +28^000000",
		"[Lv 8]: ^777777Atk +32^000000",
		"[Lv 9]: ^777777Atk +36^000000",
		"[Lv 10]: ^777777Atk +40^000000",
	].join("\n");

	SkillDescription[SKID.SM_RECOVERY] = [
		"Increase Recuperative Power",
		"MAX Lv : 10",
		"Type:^000099 Passive ^000000",
		"Effect:^777777Enhance natural HP Recovery. Max HP affects how much HP restoration is increased by this skill.^000000",
		"[Lv 1]: ^777777HP +5/10 sec^000000",
		"[Lv 2]: ^777777HP +10/10 sec^000000",
		"[Lv 3]: ^777777HP +15/10 sec^000000",
		"[Lv 4]: ^777777HP +20/10 sec^000000",
		"[Lv 5]: ^777777HP +25/10 sec^000000",
		"[Lv 6]: ^777777HP +30/10 sec^000000",
		"[Lv 7]: ^777777HP +35/10 sec^000000",
		"[Lv 8]: ^777777HP +40/10 sec^000000",
		"[Lv 9]: ^777777HP +45/10 sec^000000",
		"[Lv 10]: ^777777HP +50/10 sec^000000",
	].join("\n");

	SkillDescription[SKID.SM_BASH] = [
		"Bash",
		"MAX Lv : 10",
		"Type:^777777 Offensive^000000",
		"Target:^777777Enemy ^000000",
		"Effect:^777777Hit an enemy with crushing force. If the Fatal Blow skill is learned, Bash will have an added Stun effect at levels 5 and higher.^000000",
		"[Lv 1]: ^777777+Atk 130%^000000",
		"[Lv 2]: ^777777+Atk 160%^000000",
		"[Lv 3]: ^777777+Atk 190%^000000",
		"[Lv 4]: ^777777+Atk 220%^000000",
		"[Lv 5]: ^777777+Atk 250%^000000",
		"[Lv 6]: ^777777+Atk 280%^000000",
		"[Lv 7]: ^777777+Atk 310%^000000",
		"[Lv 8]: ^777777+Atk 340%^000000",
		"[Lv 9]: ^777777+Atk 370%^000000",
		"[Lv 10]: ^777777+Atk 400%^000000",
	].join("\n");

	SkillDescription[SKID.SM_PROVOKE] = [
		"Provoke",
		"MAX Lv : 10",
		"Type:^33cc00 Supportive ^000000",
		"Target:^777777 Enemy ^000000",
		"Effect:^777777Enrage a target to decrease its Defense while increasing its Attack Strength. Ineffective against the Undead.^000000",
		"[Lv 1]: ^777777+5% Atk, -10% DEF^000000",
		"[Lv 2]: ^777777+8% Atk, -15% DEF^000000",
		"[Lv 3]: ^777777+11% Atk, -20% DEF^000000",
		"[Lv 4]: ^777777+14% Atk, -25% DEF^000000",
		"[Lv 5]: ^777777+17% Atk, -30% DEF^000000",
		"[Lv 6]: ^777777+20% Atk, -35% DEF^000000",
		"[Lv 7]: ^777777+23% Atk, -40% DEF^000000",
		"[Lv 8]: ^777777+26% Atk, -45% DEF^000000",
		"[Lv 9]: ^777777+29% Atk, -50% DEF^000000",
		"[Lv 10]: ^777777+32% Atk, -55% DEF^000000",
	].join("\n");

	SkillDescription[SKID.SM_MAGNUM] = [
		"Magnum Break",
		"MAX Lv : 10",
		"Type: ^777777Offensive^000000",
		"Property: ^bb0000Fire^000000",
		"Effect:^777777Drain a small amount of the caster's HP to inflict Fire property area effect damage on enemies in the caster's vicinity and force them backward. For 10 seconds after Magnum Break, caster's weapon will receive a 20% Fire property strength enhancement.^000000",
		"[Lv 1]: ^777777+Atk 120%^000000",
		"[Lv 2]: ^777777+Atk 140%^000000",
		"[Lv 3]: ^777777+Atk 160%^000000",
		"[Lv 4]: ^777777+Atk 180%^000000",
		"[Lv 5]: ^777777+Atk 200%^000000",
		"[Lv 6]: ^777777+Atk 220%^000000",
		"[Lv 7]: ^777777+Atk 240%^000000",
		"[Lv 8]: ^777777+Atk 260%^000000",
		"[Lv 9]: ^777777+Atk 280%^000000",
		"[Lv 10]: ^777777+Atk 300%^000000",
	].join("\n");

	SkillDescription[SKID.SM_ENDURE] = [
		"Endure",
		"MAX Lv : 10",
		"Type:^33cc00 Active ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777Enables attacking and movement while receiving damage, but is automatically canceled after skill duration elapses or after caster is hit by 7 attacks. 10 sec cast delay. Disabled in War of Emperium.^000000",
		"[Lv 1]: ^77777710 sec, Mdef +1^000000",
		"[Lv 2]: ^77777713 sec, Mdef +2^000000",
		"[Lv 3]: ^77777716 sec, Mdef +3^000000",
		"[Lv 4]: ^77777719 sec, Mdef +4^000000",
		"[Lv 5]: ^77777722 sec, Mdef +5^000000",
		"[Lv 6]: ^77777725 sec, Mdef +6^000000",
		"[Lv 7]: ^77777728 sec, Mdef +7^000000",
		"[Lv 8]: ^77777731 sec, Mdef +8^000000",
		"[Lv 9]: ^77777734 sec, Mdef +9^000000",
		"[Lv 10]: ^77777737 sec, Mdef +10^000000",
	].join("\n");

	SkillDescription[SKID.MG_SRECOVERY] = [
		"Increase Spiritual Power",
		"MAX Lv : 10",
		"Type:^000099 Passive ^000000",
		"Effect:^777777Enhance natural SP Recovery. Max SP affects how much SP restoration is increased by this skill.^000000",
		"[Lv 1]: ^777777+3 SP/10 sec^000000",
		"[Lv 2]: ^777777+6 SP/10 sec^000000",
		"[Lv 3]: ^777777+9 SP/10 sec^000000",
		"[Lv 4]: ^777777+12 SP/10 sec^000000",
		"[Lv 5]: ^777777+15 SP/10 sec^000000",
		"[Lv 6]: ^777777+18 SP/10 sec^000000",
		"[Lv 7]: ^777777+21 SP/10 sec^000000",
		"[Lv 8]: ^777777+24 SP/10 sec^000000",
		"[Lv 9]: ^777777+27 SP/10 sec^000000",
		"[Lv 10]: ^777777+30 SP/10 sec^000000",
	].join("\n");

	SkillDescription[SKID.MG_SIGHT] = [
		"Sight",
		"MAX Lv : 1",
		"Type:^33cc00 Active ^000000",
		"Effect:^777777Detects enemies hidden in the caster's vicinity.^000000",
	].join("\n");

	SkillDescription[SKID.MG_NAPALMBEAT] = [
		"Napalm Beat",
		"MAX Lv : 10",
		"Type:^777777 Offensive ^000000",
		"Property: ^bb00bbGhost^000000",
		"Target:^777777 Enemy ^000000",
		"Effect:^777777Attack an enemy from a distance through the use of psychokinetic energy.^000000",
	].join("\n");

	SkillDescription[SKID.MG_SAFETYWALL] = [
		"Safety Wall",
		"MAX Lv : 10",
		"Type:^33cc00 Active ^000000",
		"Property: ^bb00bbGhost^000000",
		"Target:^777777 1 cell ^000000",
		"Catalyst:^0000ff 1 Blue Gemstone ^000000",
		"Effect:^777777Create a magic barrier on a targeted spot that will block short range melee attacks for the duration of the Safety Wall.^000000",
	].join("\n");

	SkillDescription[SKID.MG_SOULSTRIKE] = [
		"Soul Strike",
		"MAX Lv : 10",
		"Type:^777777 Offensive ^000000",
		"Target:^777777 Enemy ^000000",
		"Effect:^777777Summon ancient spirits to attack an enemy. Especially effective against Undead monsters.^000000",
	].join("\n");

	SkillDescription[SKID.MG_COLDBOLT] = [
		"Cold Bolt",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive, Level Selectable ^000000",
		"SP Cost:^777777 10 + 2*SkillLV ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 (0.7*SkillLV) sec ^000000",
		"Cool Down:^777777 0.8 + (0.2*SkillLV) sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Hits the targeted enemy with 1 Water property Bolt per SkillLV for 1*MATK damage each. ^000000",
	].join("\n");

	SkillDescription[SKID.MG_FROSTDIVER] = [
		"Frost Diver",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 26 - SkillLV ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 0.8 sec ^000000",
		"Cool Down:^777777 1.5 sec ^000000",
		"Duration:^777777 3*SkillLV sec ^000000",
		"Effect:^777777 Hits the target for an MATK of (100+10*SkillLV)% Water Element. In addition, has a (35+3*SkillLV)% chance of causing the Frozen status to the target. Undead property and Boss monsters cannot be Frozen. Water and Fire element monsters have a greatly reduced chance of being Frozen. The MDEF of the target affects the success chance and status duration.",
		"While frozen, the target cannot move, attack or use skill and counts as having Water1 element. Lex Aeterna cannot be used on such a target. The Frozen status lasts until the target receives any damage or the duration ends. ^000000",
		"[LV 1]^777777 38% Success / 110% MATK 25 SP ^000000",
		"[LV 2]^777777 41% Success / 120% MATK 24 SP ^000000",
		"[LV 3]^777777 44% Success / 130% MATK 23 SP ^000000",
		"[LV 4]^777777 47% Success / 140% MATK 22 SP ^000000",
		"[LV 5]^777777 50% Success / 150% MATK 21 SP ^000000",
		"[LV 6]^777777 53% Success / 160% MATK 20 SP ^000000",
		"[LV 7]^777777 56% Success / 170% MATK 19 SP ^000000",
		"[LV 8]^777777 59% Success / 180% MATK 18 SP ^000000",
		"[LV 9]^777777 62% Success / 190% MATK 17 SP ^000000",
		"[LV 10]^777777 65% Success / 200% MATK 16 SP ^000000",
	].join("\n");

	SkillDescription[SKID.MG_STONECURSE] = [
		"Stone Curse",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 26 - SkillLV ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 2 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 9 + SkillLV sec ^000000",
		"Catalyst:^ee0000 1 Red Gemstone ^000000",
		"Effect:^777777 Has a (20+4*SkillLV)% chance of causing the Stone Curse effect to the targeted enemy. The Stone Curse effect changes the targets element into Earth 1, gives +25% MDEF and -50% Def and reduces the targets HP by 1% of Maximum HP every 5 seconds (cannot drop below 25% of Maximum HP).",
		"Boss monsters cannot be Stone Cursed. Lex Aeterna and Steal cannot be used on a Stone Cursed target. Range is^ee0000 2!!^777777 cells. From LV 6 on it no longer uses up a Gemstone if it fails. ^000000",
		"[LV 1]^777777 24% Success Chance 25 SP ^000000",
		"[LV 2]^777777 28% Success Chance 24 SP ^000000",
		"[LV 3]^777777 32% Success Chance 23 SP ^000000",
		"[LV 4]^777777 36% Success Chance 22 SP ^000000",
		"[LV 5]^777777 40% Success Chance 21 SP ^000000",
		"[LV 6]^777777 44% Success Chance 20 SP ^000000",
		"[LV 7]^777777 48% Success Chance 19 SP ^000000",
		"[LV 8]^777777 52% Success Chance 18 SP ^000000",
		"[LV 9]^777777 56% Success Chance 17 SP ^000000",
		"[LV 10]^777777 60% Success Chance 16 SP ^000000",
	].join("\n");

	SkillDescription[SKID.MG_FIREBALL] = [
		"Fire Ball",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 25 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 LV 1-5 1.5 sec, LV 6-10 1 sec ^000000",
		"Cool Down:^777777 1.5 sec, LV 6-10 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Hits every enemy in a 5x5 area around the target with an MATK of (70+10*SkillLV)% and Fire Element. After SkillLV 6, it has a reduced cast / after-Cool Down. ^000000",
		"[LV 1]^777777 80% MATK ^000000",
		"[LV 2]^777777 90% MATK ^000000",
		"[LV 3]^777777 100% MATK ^000000",
		"[LV 4]^777777 110% MATK ^000000",
		"[LV 5]^777777 120% MATK ^000000",
		"[LV 6]^777777 130% MATK ^000000",
		"[LV 7]^777777 140% MATK ^000000",
		"[LV 8]^777777 150% MATK ^000000",
		"[LV 9]^777777 160% MATK ^000000",
		"[LV 10]^777777 170% MATK ^000000",
	].join("\n");

	SkillDescription[SKID.MG_FIREWALL] = [
		"Fire Wall",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 40 ^000000",
		"Target:^777777 1 cell ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 (2.15 - 0.15*SkillLV) sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 (4 + SkillLV) sec ^000000",
		"Effect:^777777 Creates 3 cells of the Fire Wall effect in a line perpendicular to the line between the caster and the targeted cell. Each cell can deliver up to 4+SkillLV Fire Element hits at MATK*0.5 before its effect is drained. When cast diagonal a wall of two rows cells will appear with 3 cells in the first and 2 cells in the last row. ^000000",
		"[LV 1]^777777 5 Hits, 5 sec ^000000",
		"[LV 2]^777777 6 Hits, 6 sec ^000000",
		"[LV 3]^777777 7 Hits, 7 sec ^000000",
		"[LV 4]^777777 8 Hits, 8 sec ^000000",
		"[LV 5]^777777 9 Hits, 9 sec ^000000",
		"[LV 6]^777777 10 Hits, 10 sec ^000000",
		"[LV 7]^777777 11 Hits, 11 sec ^000000",
		"[LV 8]^777777 12 Hits, 12 sec ^000000",
		"[LV 9]^777777 13 Hits, 13 sec ^000000",
		"[LV 10]^777777 14 Hits, 14 sec ^000000",
	].join("\n");

	SkillDescription[SKID.MG_FIREBOLT] = [
		"Fire Bolt",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive, Level Selectable ^000000",
		"SP Cost:^777777 10 + 2*SkillLV ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 (0.7*SkillLV) sec ^000000",
		"Cool Down:^777777 0.8 + (0.2*SkillLV) sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Hits the targeted enemy with 1 Fire Element Bolt per SkillLV for 1*MATK each. ^000000",
	].join("\n");

	SkillDescription[SKID.MG_LIGHTNINGBOLT] = [
		"Lightning Bolt",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive, Level Selectable ^000000",
		"SP Cost:^777777 10 + 2*SkillLV ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 (0.7*SkillLV) sec ^000000",
		"Cool Down:^777777 0.8 + (0.2*SkillLV) sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Hits the targeted enemy with 1 Wind Element Bolt per SkillLV for 1*MATK each. ^000000",
	].join("\n");

	SkillDescription[SKID.MG_THUNDERSTORM] = [
		"Thunder Storm",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 24 + 5*SkillLV ^000000",
		"Target:^777777 cell ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 1*SkillLV sec ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Duration:^777777 0.2*SkillLV sec ^000000",
		"Effect:^777777 Hits every Enemy in a 5x5 area around the targeted cell with 1 Wind Element Bolt per level at a rate of 1 bolt every 0.2 seconds. Each bolt does 0.8*MATK Wind element damage. ^000000",
		"[LV 1]^777777 1 Bolt ^000000",
		"[LV 2]^777777 2 Bolts ^000000",
		"[LV 3]^777777 3 Bolts ^000000",
		"[LV 4]^777777 4 Bolts ^000000",
		"[LV 5]^777777 5 Bolts ^000000",
		"[LV 6]^777777 6 Bolts ^000000",
		"[LV 7]^777777 7 Bolts ^000000",
		"[LV 8]^777777 8 Bolts ^000000",
		"[LV 9]^777777 9 Bolts ^000000",
		"[LV 10]^777777 10 Bolts ^000000",
	].join("\n");

	SkillDescription[SKID.AL_DP] = [
		"Divine Protection",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Reduces damage from Undead property and Demon family monsters by (3*SkillLV)+[0.04*(BaseLV + 1)]. Damage is subtracted after DEF reductions.",
		"Does not work against Players. Base increment without BaseLV modification: ^000000",
		"[LV 1]^777777 DEF +3 ^000000",
		"[LV 2]^777777 DEF +6 ^000000",
		"[LV 3]^777777 DEF +9 ^000000",
		"[LV 4]^777777 DEF +12 ^000000",
		"[LV 5]^777777 DEF +15 ^000000",
		"[LV 6]^777777 DEF +18 ^000000",
		"[LV 7]^777777 DEF +21 ^000000",
		"[LV 8]^777777 DEF +24 ^000000",
		"[LV 9]^777777 DEF +27 ^000000",
		"[LV 10]^777777 DEF +30 ^000000",
	].join("\n");

	SkillDescription[SKID.AL_DEMONBANE] = [
		"Demon Bane",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases damage against Undead property and Demon family monsters by (3*SkillLV)+[0.05*(BaseLV + 1)]. Damage ignores DEF reduction from armor, but not from VIT. The skill bonus increases with higher character BaseLV.",
		"Does not work against Players. Base increment without BaseLV modification: ^000000",
		"[LV 1]^777777 ATK +3 ^000000",
		"[LV 2]^777777 ATK +6 ^000000",
		"[LV 3]^777777 ATK +9 ^000000",
		"[LV 4]^777777 ATK +12 ^000000",
		"[LV 5]^777777 ATK +15 ^000000",
		"[LV 6]^777777 ATK +18 ^000000",
		"[LV 7]^777777 ATK +21 ^000000",
		"[LV 8]^777777 ATK +24 ^000000",
		"[LV 9]^777777 ATK +27 ^000000",
		"[LV 10]^777777 ATK +30 ^000000",
	].join("\n");

	SkillDescription[SKID.AL_RUWACH] = [
		"Ruwach",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 5x5 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 12 sec ^000000",
		"Effect:^777777 Reveals Hiding and Cloaking players and monsters within range. Revealed players and monsters are hit with a holy element Magic attack with a strength of MATK*1.45. ^000000",
	].join("\n");

	SkillDescription[SKID.AL_PNEUMA] = [
		"Pneuma",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 cell ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 10 sec ^000000",
		"Effect:^777777 Creates a 3x3 cell cloud (although the animation only appears to cover the center cell!) around the target cell that blocks all ranged Physical attacks.",
		"This means that it also blocks the bow attacks of players, so take care not to prevent any Hunters or Bow Thieves in the party from being able to do damage!",
		"Monsters count as being \"ranged\" if their attack has a range of 4 or more cells. Pneuma cannot be cast if it is targeted to overlap an already existing Pneuma area or a Safety Wall cell.",
		"Does not block splash damage or negate the Flee reducing effects of having multiple targets attacking you. Do note that although you can see the animation on top of a Land Protector, Pneuma will have no effect. ^000000",
	].join("\n");

	SkillDescription[SKID.AL_TELEPORT] = [
		"Teleportation",
		"Max Level:^777777 2 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 11 - SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 At level 1, you can teleport to a random spot on the same map. At level 2, you can also choose to teleport to your save point. When Teleportation is actually cast, a window will appear showing the available options (including cancel).",
		"You must actually select an option by clicking or with the up/down arrow keys and pressing enter for the effect to occur. Once you actually teleport, you will count as having \"just entered the map\". This means that Aggressive monsters won't see you for 3 seconds or until you move. ^000000",
		"[LV 1]^777777 Random ^000000",
		"[LV 2]^777777 Save Point. ^000000",
	].join("\n");

	SkillDescription[SKID.AL_WARP] = [
		"Warp Portal",
		"Max Level:^777777 4 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 38 - 3*SkillLV ^000000",
		"Target:^777777 1 cell ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 Time of Casting motion ^000000",
		"Duration:^777777 5 + 5*SkillLV sec ^000000",
		"Catalyst:^0000ff 1 Blue Gemstone ^000000",
		"Effect:^777777 Creates a warp portal at the targeted cell after a destination is selected from a list. This spell cannot be cast under a monster or player.",
		"If anyone steps onto the targeted cell while the destination is being selected, the spell will fail. After successful casting, anyone stepping onto the affected cell will be teleported to the selected destination.",
		"The destinations that may be selected are set by the use of the /memo command while standing in the desired location and by your current Save Point.",
		"You may not set a memo point on Indoors map (dungeons and inside buildings in cities) and some maps that are far away from cities. If you make a new Memo Point on a map where you already have a Memo Point, that Memo Point will be replaced.",
		"After filling all 3 possible Memo Points, setting a new Memo Point will replace the oldest current Memo Point (the bottom one on the list). The number of Memo Points available to you is equal to the SkillLV - 1 (therefore, at level 1 you have no memo points available and can only cast a Warp Portal to your Save Point).",
		"The maximum capacity of people that the caster can warp at a time is 8 regardless of its skill level. No more than 3 Warp Portals cast by the one caster can be in effect at the same time. If the caster leaves the map where the portal has been cast, the portal disappears. ^000000",
		"[LV 1]^777777 Warp to the Save Point. ^000000",
		"[LV 2]^777777 Enable to Use 1 Memo point. ^000000",
		"[LV 3]^777777 Enable to Use 2 Memo points. ^000000",
		"[LV 4]^777777 Enable to Use 3 Memo points. ^000000",
	].join("\n");

	SkillDescription[SKID.AL_HEAL] = [
		"Heal",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active, Level Selectable ^000000",
		"SP Cost:^777777 10 + 3*SkillLV ^000000",
		"Target:^777777 1 Ally/ 1 Enemy w. Shift-Click ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Heals a target's HP for ([(BaseLV+INT)/5]*30)*(1+/%Modifier/100))*/HealLvl*0.1)+StatusMATK+EquipMATK+[(WeaponMATK*WeaponLvl)/10] HPs. When used against Undead property monsters, it is a holy attack that ignores MDEF and INT, but deals only half damage (that is, HealValue*ElementModifier/2).",
		"To use against a monster, you must shift-click it or turn on /noshift. ^000000",
	].join("\n");

	SkillDescription[SKID.AL_INCAGI] = [
		"Increase Agility",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active, Level Selectable ^000000",
		"SP Cost:^777777 15 + 3*SkillLV ^000000",
		"HP Cost:^777777 15 ^000000",
		"Target:^777777 1 Ally ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 40 + 20*SkillLV sec ^000000",
		"Effect:^777777 Increases AGI of target by 2+SkillLV and increases movement speed by 25%. Casting is accompanied by the \"AGI UP\" message over the target. Dispels Decrease Agility when cast. Dispelled by Decrease Agility and Quagmire.",
		"A monster or player in the area of effect of a Quagmire spell cannot receive the benefits of Increase Agility.",
		"This skill consumes some HP along with the SP cost. ^000000",
		"[LV 1]^777777 + 3 AGI ^000000",
		"[LV 2]^777777 + 4 AGI ^000000",
		"[LV 3]^777777 + 5 AGI ^000000",
		"[LV 4]^777777 + 6 AGI ^000000",
		"[LV 5]^777777 + 7 AGI ^000000",
		"[LV 6]^777777 + 8 AGI ^000000",
		"[LV 7]^777777 + 9 AGI ^000000",
		"[LV 8]^777777 + 10 AGI ^000000",
		"[LV 9]^777777 + 11 AGI ^000000",
		"[LV 10]^777777 + 12 AGI ^000000",
	].join("\n");

	SkillDescription[SKID.AL_DECAGI] = [
		"Decrease Agility",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active, Level Selectable ^000000",
		"SP Cost:^777777 13 + 2*SkillLV ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 20 + 10*SkillLV sec ^000000",
		"Effect:^777777 Decreases AGI of target by 2+SkillLV and reduces movement speed by 25%. The skill can fail and success is indicated by the text \"AGI down\" on the target at the time of casting.",
		"A successful cast will dispel Increase Agility, Adrenaline Rush, Two-Hand Quicken, Spear Quicken and Cart Boost. The effects of this skill combine with Quagmire in the form AGI/2-2+SkillLV.",
		"The formula for success is believed to be SuccessRate = 40 + 2*SkillLV + (BaseLV + INT)/5 - Target MDEF where SuccessRate is expressed as a percentage. Duration is halved on players. Does not work against Boss monsters. ^000000",
		"[LV 1]^777777 -3 AGI ^000000",
		"[LV 2]^777777 -4 AGI ^000000",
		"[LV 3]^777777 -5 AGI ^000000",
		"[LV 4]^777777 -6 AGI ^000000",
		"[LV 5]^777777 -7 AGI ^000000",
		"[LV 6]^777777 -8 AGI ^000000",
		"[LV 7]^777777 -9 AGI ^000000",
		"[LV 8]^777777 -10 AGI ^000000",
		"[LV 9]^777777 -11 AGI ^000000",
		"[LV 10]^777777 -12 AGI ^000000",
	].join("\n");

	SkillDescription[SKID.AL_HOLYWATER] = [
		"Aqua Benedicta",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^777777 1 Empty Bottle + water source (see effect) ^000000",
		"Effect:^777777 Creates 1 Holy Water. Caster must stand in water for the skill to succeed. Map-wide submersion (Undersea Tunnel LV 4/5 or Sunken Ship) does not work. ^000000",
	].join("\n");

	SkillDescription[SKID.AL_CRUCIS] = [
		"Signum Crucis",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 35 ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 Screen ^000000",
		"Cast Time:^777777 0.5 sec ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Duration:^777777 Until monster death ^000000",
		"Effect:^777777 Reduces the DEF (not VIT DEF) of Undead property and Demon family monsters on screen by (10+4*SkillLV)% (further modified by target- and caster base levels).",
		"The skill can fail on a monster, the formula for success is believed to be SuccessRate in %= 23 + 4*SkillLV + BaseLV - TargetLV.",
		"The monsters affected are indicated by the sweat drop emotion (/swt). The effect of Signum Crucis stacks with the effects of Provoke. ^000000",
		"[LV 1]^777777 -14% DEF ^000000",
		"[LV 2]^777777 -18% DEF ^000000",
		"[LV 3]^777777 -22% DEF ^000000",
		"[LV 4]^777777 -26% DEF ^000000",
		"[LV 5]^777777 -30% DEF ^000000",
		"[LV 6]^777777 -34% DEF ^000000",
		"[LV 7]^777777 -38% DEF ^000000",
		"[LV 8]^777777 -42% DEF ^000000",
		"[LV 9]^777777 -46% DEF ^000000",
		"[LV 10]^777777 -50% DEF ^000000",
	].join("\n");

	SkillDescription[SKID.AL_ANGELUS] = [
		"Angelus",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active, Level Selectable ^000000",
		"SP Cost:^777777 20 + 3*SkillLV ^000000",
		"Target:^777777 Entire Party ^000000",
		"Cast Time:^777777 0.5 sec ^000000",
		"Cool Down:^777777 3.5 sec ^000000",
		"Duration:^777777 30*SkillLV sec ^000000",
		"Effect:^777777 Increases the DEF from VIT of all party members on screen by (5*SkillLV)%. Does not increase anything else that has to do with VIT at all. ^000000",
		"[LV 1]^777777 105% VIT DEF ^000000",
		"[LV 2]^777777 110% VIT DEF ^000000",
		"[LV 3]^777777 115% VIT DEF ^000000",
		"[LV 4]^777777 120% VIT DEF ^000000",
		"[LV 5]^777777 125% VIT DEF ^000000",
		"[LV 6]^777777 130% VIT DEF ^000000",
		"[LV 7]^777777 135% VIT DEF ^000000",
		"[LV 8]^777777 140% VIT DEF ^000000",
		"[LV 9]^777777 145% VIT DEF ^000000",
		"[LV 10]^777777 150% VIT DEF ^000000",
	].join("\n");

	SkillDescription[SKID.AL_BLESSING] = [
		"Blessing",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active, Level Selectable ^000000",
		"SP Cost:^777777 24 + 4*SkillLV ^000000",
		"Target:^777777 1 Ally/ 1 Enemy w. Shift-Click ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 40 + 20*SkillLV sec ^000000",
		"Effect:^777777 Increases STR, DEX and INT of the target by 1*SkillLV and removes any Curse effect.",
		"If used on Undead property or Demon family monsters, it halves their STR, DEX and INT, regardless of skill level.",
		"This \"Bless Curse\" or \"Offensive Blessing\" will lower the HIT and MATK of a monster, but has no effect on ATK.",
		"This effect does not work against Players or Boss monsters. ^000000",
		"[LV 1]^777777 +1 STR, DEX & INT ^000000",
		"[LV 2]^777777 +2 STR, DEX & INT ^000000",
		"[LV 3]^777777 +3 STR, DEX & INT ^000000",
		"[LV 4]^777777 +4 STR, DEX & INT ^000000",
		"[LV 5]^777777 +5 STR, DEX & INT ^000000",
		"[LV 6]^777777 +6 STR, DEX & INT ^000000",
		"[LV 7]^777777 +7 STR, DEX & INT ^000000",
		"[LV 8]^777777 +8 STR, DEX & INT ^000000",
		"[LV 9]^777777 +9 STR, DEX & INT ^000000",
		"[LV 10]^777777 +10 STR, DEX & INT ^000000",
	].join("\n");

	SkillDescription[SKID.AL_CURE] = [
		"Cure",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 15 ^000000",
		"Target:^777777 1 Ally ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Cures Blind, Confusion and Silence (limitation: you can't cure yourself from Silence since you can't cast while Silenced). ",
		"Does not work against Players. ^000000",
	].join("\n");

	SkillDescription[SKID.MC_INCCARRY] = [
		"Enlarge Weight Limit",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases maximum carrying capacity by 200*SkillLV. ^000000",
		"[LV 1]^777777 Weight capacity +200 ^000000",
		"[LV 2]^777777 Weight capacity +400 ^000000",
		"[LV 3]^777777 Weight capacity +600 ^000000",
		"[LV 4]^777777 Weight capacity +800 ^000000",
		"[LV 5]^777777 Weight capacity +1000 ^000000",
		"[LV 6]^777777 Weight capacity +1200 ^000000",
		"[LV 7]^777777 Weight capacity +1400 ^000000",
		"[LV 8]^777777 Weight capacity +1600 ^000000",
		"[LV 9]^777777 Weight capacity +1800 ^000000",
		"[LV 10]^777777 Weight capacity +2000 ^000000",
	].join("\n");

	SkillDescription[SKID.MC_DISCOUNT] = [
		"Discount",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Allows buying items at reduced prices from NPC shops. Deals, vending shops, and chat-selling NPCs (e.g. Upgrade stone NPC) are not affected. The final price is always rounded down and has a minimum value of 1z.",
		"[LV 1]^777777 -7% Price ^000000",
		"[LV 2]^777777 -9% Price ^000000",
		"[LV 3]^777777 -11% Price ^000000",
		"[LV 4]^777777 -13% Price ^000000",
		"[LV 5]^777777 -15% Price ^000000",
		"[LV 6]^777777 -17% Price ^000000",
		"[LV 7]^777777 -19% Price ^000000",
		"[LV 8]^777777 -21% Price ^000000",
		"[LV 9]^777777 -23% Price ^000000",
		"[LV 10]^777777 -24% Price ^000000",
	].join("\n");

	SkillDescription[SKID.MC_OVERCHARGE] = [
		"Overcharge",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Allows selling items at increased prices to NPC shops. Deals are not affected. The final price is always rounded down and has a minimum value of 0z.",
		"[LV 1]^777777 +7% Price ^000000",
		"[LV 2]^777777 +9% Price ^000000",
		"[LV 3]^777777 +11% Price ^000000",
		"[LV 4]^777777 +13% Price ^000000",
		"[LV 5]^777777 +15% Price ^000000",
		"[LV 6]^777777 +17% Price ^000000",
		"[LV 7]^777777 +19% Price ^000000",
		"[LV 8]^777777 +21% Price ^000000",
		"[LV 9]^777777 +23% Price ^000000",
		"[LV 10]^777777 +24% Price ^000000",
	].join("\n");

	SkillDescription[SKID.MC_PUSHCART] = [
		"Pushcart",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Allows the character to equip and use a pushcart. Movement speed with a Pushcart equipped is (50+5*SkillLV)% (yes, you move much slower at the beginning).",
		"The pushcart can hold 8000 Weight and a maximum of 100 distinct items(some items stack, so count as only 1 distinct item). Pushcarts must be bought from a Kafra Employee and there is at least one present in every town and some may be found in other locations.",
		"Cost varies depending on which Kafra Employee you go to. If the pushcart is removed, it disappears and a new one must be bought. Any items in the pushcart at the time it is removed are not lost, but cannot be retrieved until you buy a new cart. To access the cart directly use ^0000FEAlt+W ^000000",
		"[LV 1]^777777 55% Movement Speed ^000000",
		"[LV 2]^777777 60% Movement Speed ^000000",
		"[LV 3]^777777 65% Movement Speed ^000000",
		"[LV 4]^777777 70% Movement Speed ^000000",
		"[LV 5]^777777 75% Movement Speed ^000000",
		"[LV 6]^777777 80% Movement Speed ^000000",
		"[LV 7]^777777 85% Movement Speed ^000000",
		"[LV 8]^777777 90% Movement Speed ^000000",
		"[LV 9]^777777 95% Movement Speed ^000000",
		"[LV 10]^777777 100% Movement Speed ^000000",
	].join("\n");

	SkillDescription[SKID.MC_IDENTIFY] = [
		"Identify",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 9 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Identifies an unidentified item. Unidentified item must be in inventory (not cart). A Magnifier duplicates the effect of this skill. ^000000",
	].join("\n");

	SkillDescription[SKID.MC_VENDING] = [
		"Vending",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 30 ^000000",
		"Target:^777777 Self ^000000",
		"Duration:^777777 Until shop closes ^000000",
		"Effect:^777777 Allows the character to set up a shop at his current location. The items you want to sell must be in the characters pushcart, and the character must have his pushcart equipped.",
		"^ee0000Be very careful to set the correct price! ^000000",
		"^777777 The limit on distinct items that can be sold at one time is 2+SkillLV. Players cannot sell items to a vending shop, and the Discount skill does not apply.",
		"It will close automatically if all items are sold or if the character is killed. ^000000",
		"[LV 1]^777777 3 Items ^000000",
		"[LV 2]^777777 4 Items ^000000",
		"[LV 3]^777777 5 Items ^000000",
		"[LV 4]^777777 6 Items ^000000",
		"[LV 5]^777777 7 Items ^000000",
		"[LV 6]^777777 8 Items ^000000",
		"[LV 7]^777777 9 Items ^000000",
		"[LV 8]^777777 10 Items ^000000",
		"[LV 9]^777777 11 Items ^000000",
		"[LV 10]^777777 12 Items ^000000",
	].join("\n");

	SkillDescription[SKID.MC_MAMMONITE] = [
		"Mammonite",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive, Level Selectable ^000000",
		"SP Cost:^777777 5 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Uses 100z*SkillLV to increase ATK to (100+50*SkillLV)% for the next attack. ^000000",
		"[LV 1]^777777 ATK 150%, 100Z spent ^000000",
		"[LV 2]^777777 ATK 200%, 200Z spent ^000000",
		"[LV 3]^777777 ATK 250%, 300Z spent ^000000",
		"[LV 4]^777777 ATK 300%, 400Z spent ^000000",
		"[LV 5]^777777 ATK 350%, 500Z spent ^000000",
		"[LV 6]^777777 ATK 400%, 600Z spent ^000000",
		"[LV 7]^777777 ATK 450%, 700Z spent ^000000",
		"[LV 8]^777777 ATK 500%, 800Z spent ^000000",
		"[LV 9]^777777 ATK 550%, 900Z spent ^000000",
		"[LV 10]^777777 ATK 600%, 1000Z spent ^000000",
	].join("\n");

	SkillDescription[SKID.AC_OWL] = [
		"Owl's Eye",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases DEX by 1*SkillLV. ^000000",
		"[LV 1]^777777 DEX +1 ^000000",
		"[LV 2]^777777 DEX +2 ^000000",
		"[LV 3]^777777 DEX +3 ^000000",
		"[LV 4]^777777 DEX +4 ^000000",
		"[LV 5]^777777 DEX +5 ^000000",
		"[LV 6]^777777 DEX +6 ^000000",
		"[LV 7]^777777 DEX +7 ^000000",
		"[LV 8]^777777 DEX +8 ^000000",
		"[LV 9]^777777 DEX +9 ^000000",
		"[LV 10]^777777 DEX +10 ^000000",
	].join("\n");

	SkillDescription[SKID.AC_VULTURE] = [
		"Vulture's Eye",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases range with bows by 1*SkillLV cells and increases HIT by 1 per SkillLV. ^000000",
		"[LV 1]^777777 Range and HIT +1 ^000000",
		"[LV 2]^777777 Range and HIT +2 ^000000",
		"[LV 3]^777777 Range and HIT +3 ^000000",
		"[LV 4]^777777 Range and HIT +4 ^000000",
		"[LV 5]^777777 Range and HIT +5 ^000000",
		"[LV 6]^777777 Range and HIT +6 ^000000",
		"[LV 7]^777777 Range and HIT +7 ^000000",
		"[LV 8]^777777 Range and HIT +8 ^000000",
		"[LV 9]^777777 Range and HIT +9 ^000000",
		"[LV 10]^777777 Range and HIT +10 ^000000",
	].join("\n");

	SkillDescription[SKID.AC_CONCENTRATION] = [
		"Attention Concentrate",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 20 + 5*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 40 + 20*SkillLV sec ^000000",
		"Effect:^777777 Increases DEX and AGI of the casting character by (2+1*SkillLV)%. Only affects DEX/AGI from base stat, job bonus, armor and Owl's Eye. Does not include cards. Detects hidden and cloaked characters within a 3 cells range. ^000000",
		"[LV 1]^777777 + 3% AGI/DEX ^000000",
		"[LV 2]^777777 + 4% AGI/DEX ^000000",
		"[LV 3]^777777 + 5% AGI/DEX ^000000",
		"[LV 4]^777777 + 6% AGI/DEX ^000000",
		"[LV 5]^777777 + 7% AGI/DEX ^000000",
		"[LV 6]^777777 + 8% AGI/DEX ^000000",
		"[LV 7]^777777 + 9% AGI/DEX ^000000",
		"[LV 8]^777777 + 10% AGI/DEX ^000000",
		"[LV 9]^777777 + 11% AGI/DEX ^000000",
		"[LV 10]^777777 + 12% AGI/DEX ^000000",
	].join("\n");

	SkillDescription[SKID.AC_DOUBLE] = [
		"Double Strafing",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 12 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 9 + Vulture's Eye SkillLV cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 0.1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Ranged attack, that fires two arrows and hits with an ATK of (180+20*SkillLV)%. Requires an equipped bow. Only 1 arrow is consumed. ^000000",
		"[LV 1]^777777 200% Damage ^000000",
		"[LV 2]^777777 220% Damage ^000000",
		"[LV 3]^777777 240% Damage ^000000",
		"[LV 4]^777777 260% Damage ^000000",
		"[LV 5]^777777 280% Damage ^000000",
		"[LV 6]^777777 300% Damage ^000000",
		"[LV 7]^777777 320% Damage ^000000",
		"[LV 8]^777777 340% Damage ^000000",
		"[LV 9]^777777 360% Damage ^000000",
		"[LV 10]^777777 380% Damage ^000000",
	].join("\n");

	SkillDescription[SKID.AC_SHOWER] = [
		"Arrow Shower",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 15 ^000000",
		"Target:^777777 Ground ^000000",
		"Range:^777777 9 + Vulture's Eye SkillLV cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 0.1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 3x3 cells, ranged splash attack with an ATK of (75+5*SkillLV)%. Enemies hit by the attack are pushed back 2 cells. Requires an equipped bow. Only 1 arrow is consumed. ^000000",
		"[LV 1]^777777 80% Damage ^000000",
		"[LV 2]^777777 85% Damage ^000000",
		"[LV 3]^777777 90% Damage ^000000",
		"[LV 4]^777777 95% Damage ^000000",
		"[LV 5]^777777 100% Damage ^000000",
		"[LV 6]^777777 105% Damage ^000000",
		"[LV 7]^777777 110% Damage ^000000",
		"[LV 8]^777777 115% Damage ^000000",
		"[LV 9]^777777 120% Damage ^000000",
		"[LV 10]^777777 125% Damage ^000000",
	].join("\n");

	SkillDescription[SKID.TF_DOUBLE] = [
		"Double Attack",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Gives chance to double swing a Dagger class weapon with a chance equal to (5*SkillLV)%, and adds +1 HIT per SkillLV (that only applies in double attacks). In the case of an Assassin wielding two Dagger class weapons, it applies to the right-hand weapon only.",
		"It also boosts the off-hand (left hand) damage of a Katar weapon by (1+2*SkillLV)% ATK. ^000000",
		"[LV 1]^777777 5% Chance, +1 HIT, +3% Katar DMG ^000000",
		"[LV 2]^777777 10% Chance, +2 HIT, +5% Katar DMG ^000000",
		"[LV 3]^777777 15% Chance, +3 HIT, +7% Katar DMG ^000000",
		"[LV 4]^777777 20% Chance, +4 HIT, +9% Katar DMG ^000000",
		"[LV 5]^777777 25% Chance, +5 HIT, +11% Katar DMG ^000000",
		"[LV 6]^777777 30% Chance, +6 HIT, +13% Katar DMG ^000000",
		"[LV 7]^777777 35% Chance, +7 HIT, +15% Katar DMG ^000000",
		"[LV 8]^777777 40% Chance, +8 HIT, +17% Katar DMG ^000000",
		"[LV 9]^777777 45% Chance, +9 HIT, +19% Katar DMG ^000000",
		"[LV 10]^777777 50% Chance, +10 HIT, +21% Katar DMG ^000000",
	].join("\n");

	SkillDescription[SKID.TF_MISS] = [
		"Increase Dodge",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases Flee Rate by +3*SkillLV. This skill boosts the walking speed for Assassins by 1% per SkillLV and gives an additional +1 Flee Rate per SkillLV when you are an Assassin or Rogue.",
		"The walking speed bonus does not add to the walking speed increase when using Cloaking. ^000000",
		"[LV 1]^777777 Flee Rate +3 (2nd class Flee Rate +4) ^000000",
		"[LV 2]^777777 Flee Rate +6 (2nd class Flee Rate +8) ^000000",
		"[LV 3]^777777 Flee Rate +9 (2nd class Flee Rate +12) ^000000",
		"[LV 4]^777777 Flee Rate +12 (2nd class Flee Rate +16) ^000000",
		"[LV 5]^777777 Flee Rate +15 (2nd class Flee Rate +20) ^000000",
		"[LV 6]^777777 Flee Rate +18 (2nd class Flee Rate +24) ^000000",
		"[LV 7]^777777 Flee Rate +21 (2nd class Flee Rate +28) ^000000",
		"[LV 8]^777777 Flee Rate +24 (2nd class Flee Rate +32) ^000000",
		"[LV 9]^777777 Flee Rate +27 (2nd class Flee Rate +36) ^000000",
		"[LV 10]^777777 Flee Rate +30 (2nd class Flee Rate +40) ^000000",
	].join("\n");

	SkillDescription[SKID.TF_STEAL] = [
		"Steal",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 Monster ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Attempts to \"steal\" an item from the targeted monster. Only items dropped by the monster can be stolen. A successful Steal attempt will not affect what is dropped when the monster dies.",
		"After success, it is not possible to Steal again from the same monster. Boss, Frozen and Stone Cursed monsters cannot be robed.",
		"The formula for stealing is: DropRatio*(DEX - MonsterDEX + 10 + 3*SkillLV + )/100 where DropRatio is the percent chance of a particular item being dropped.",
		"If the result of the steal check is lower than the AdjustedDropRatio for an item, then it is possible that item will be stolen. ^000000",
		"[LV 1]^777777 Success Chance 10% ^000000",
		"[LV 2]^777777 Success Chance 16% ^000000",
		"[LV 3]^777777 Success Chance 22% ^000000",
		"[LV 4]^777777 Success Chance 28% ^000000",
		"[LV 5]^777777 Success Chance 34% ^000000",
		"[LV 6]^777777 Success Chance 40% ^000000",
		"[LV 7]^777777 Success Chance 46% ^000000",
		"[LV 8]^777777 Success Chance 52% ^000000",
		"[LV 9]^777777 Success Chance 58% ^000000",
		"[LV 10]^777777 Success Chance 64% ^000000",
	].join("\n");

	SkillDescription[SKID.TF_HIDING] = [
		"Hiding",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 + see below ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 30*SkillLV sec ^000000",
		"Effect:^777777 Toggles the hide effect on the character on/off. Toggling the hide effect off consumes no SP. Hidden characters cannot move, attack or use any skill (except certain Rogue skills) and do not regenerate HP or SP.",
		"The hide effect makes a character invisible to other players and monsters. This stops skills and spells that are targeted at you from working (those with casting times fail) and anything attacking you stops (assuming that their last hit doesn't hit you and reveal you!).",
		"Area effect skills and spells can't hit you (except Heaven's Drive). Insects, Demons and Boss monsters are not affected by the hide effect. If you get hit by anything while hiding, you will be revealed.",
		"Attention Concentrate, Ruwach, Detecting and Sight are all capable of revealing hidden characters. Consumes 10 SP for casting and continually drains certain amount of SP while hiding. ^000000",
		"[LV 1]^777777 30 Seconds, SP 1 / 5sec ^000000",
		"[LV 2]^777777 60 Seconds, SP 1 / 6sec ^000000",
		"[LV 3]^777777 90 Seconds, SP 1 / 7sec ^000000",
		"[LV 4]^777777 120 Seconds, SP 1 / 8sec ^000000",
		"[LV 5]^777777 150 Seconds, SP 1 / 9sec ^000000",
		"[LV 6]^777777 180 Seconds, SP 1 / 10sec ^000000",
		"[LV 7]^777777 210 Seconds, SP 1 / 11sec ^000000",
		"[LV 8]^777777 240 Seconds, SP 1 / 12sec ^000000",
		"[LV 9]^777777 270 Seconds, SP 1 / 13sec ^000000",
		"[LV 10]^777777 300 Seconds, SP 1 / 14sec ^000000",
	].join("\n");

	SkillDescription[SKID.TF_POISON] = [
		"Envenom",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 12 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 2 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 An attack that adds 15*SkillLV to your ATK (unmodified by Armor and VIT Def) to your normal damage. This bonus damage is always inflicted, whether your character lands a normal hit or not.",
		"Envenom has a (10+4*SkillLV)% chance to inflict poison status on target. Poisoned targets have their DEF reduced by 25% and lose 3% of Maximum HP every 3 seconds unless that would cause HP to drop below 25% of Maximum HP.",
		"The entire screen turns purple for the poisoned individual. Undead property and Boss monsters cannot be poisoned. ^000000",
		"[LV 1]^777777 +15 ATK ^000000",
		"[LV 2]^777777 +30 ATK ^000000",
		"[LV 3]^777777 +45 ATK ^000000",
		"[LV 4]^777777 +60 ATK ^000000",
		"[LV 5]^777777 +75 ATK ^000000",
		"[LV 6]^777777 +90 ATK ^000000",
		"[LV 7]^777777 +105 ATK ^000000",
		"[LV 8]^777777 +120 ATK ^000000",
		"[LV 9]^777777 +135 ATK ^000000",
		"[LV 10]^777777 +150 ATK ^000000",
	].join("\n");

	SkillDescription[SKID.TF_DETOXIFY] = [
		"Detoxify",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 Player ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Cures poison status on target. ^000000",
	].join("\n");

	SkillDescription[SKID.ALL_RESURRECTION] = [
		"Resurrection",
		"Max Level:^777777 4 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 60 ^000000",
		"Target:^777777 1 Dead Ally or 1 Monster ^000000",
		"Range:^777777 9 cells ^000000",
		"ATK Type:^777777 Holy, Long Range, Magic attack ^000000",
		"Cast Time:^777777 8 - 2*SkillLV sec; 1 sec when used against monster ^000000",
		"Cool Down:^777777 SkillLV - 1 sec (yes, it is longer for higher LVs); 3 sec when used against monster ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^0000ff 1 Blue Gemstone ^000000",
		"Effect:^777777 Returns a dead character to life with the indicated percentage of HP restored (see list below). When used on Undead property monsters, it has a chance to instantly kill or at least damage in the same way as Turn Undead at the same level. ^000000",
		"[LV 1]^777777 Revive at 10% HP ^000000",
		"[LV 2]^777777 Revive at 30% HP ^000000",
		"[LV 3]^777777 Revive at 50% HP ^000000",
		"[LV 4]^777777 Revive at 80% HP ^000000",
	].join("\n");

	SkillDescription[SKID.KN_SPEARMASTERY] = [
		"Spear Mastery",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases damage with all Spears by +4*SkillLV. If riding a Peco Peco, then the damage improvement is +5*SkillLV. This damage ignores modification from Armor and VIT defense, but not from Elemental and Card modifiers and applies to all hits for multi hit attacks. ^000000",
		"[LV 1]^777777 ATK +4/+5 ^000000",
		"[LV 2]^777777 ATK +8/+10 ^000000",
		"[LV 3]^777777 ATK +12/+15 ^000000",
		"[LV 4]^777777 ATK +16/+20 ^000000",
		"[LV 5]^777777 ATK +20/+25 ^000000",
		"[LV 6]^777777 ATK +24/+30 ^000000",
		"[LV 7]^777777 ATK +28/+35 ^000000",
		"[LV 8]^777777 ATK +32/+40 ^000000",
		"[LV 9]^777777 ATK +36/+45 ^000000",
		"[LV 10]^777777 ATK +40/+50 ^000000",
	].join("\n");

	SkillDescription[SKID.KN_PIERCE] = [
		"Pierce",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive",
		"SP Cost:^777777 9 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 2 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Hits for an ATK of (100+10*SkillLV)%. Number of hits depends on the size of the target. Small = 1, Medium = 2, Large = 3. Players are considered to be medium. Can only be used with spears. ^000000",
		"[Small]^777777 1 Hit ^000000",
		"[Medium]^777777 2 Hits ^000000",
		"[Big]^777777 3 Hits ^000000",
		"[LV 1]^777777 110% ATK, HIT +5 ^000000",
		"[LV 2]^777777 120% ATK, HIT +10 ^000000",
		"[LV 3]^777777 130% ATK, HIT +15 ^000000",
		"[LV 4]^777777 140% ATK, HIT +20 ^000000",
		"[LV 5]^777777 150% ATK, HIT +25 ^000000",
		"[LV 6]^777777 160% ATK, HIT +30 ^000000",
		"[LV 7]^777777 170% ATK, HIT +35 ^000000",
		"[LV 8]^777777 180% ATK, HIT +40 ^000000",
		"[LV 9]^777777 190% ATK, HIT +45 ^000000",
		"[LV 10]^777777 200% ATK, HIT +50 ^000000",
	].join("\n");

	SkillDescription[SKID.KN_BRANDISHSPEAR] = [
		"Brandish Spear",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 12 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 2 cells ^000000",
		"Splash range:^777777 See below ^000000",
		"ATK Type:^777777 Weapon property, Melee, Area, Physical attack ^000000",
		"Cast Time:^777777 1 sec (uninterruptible) ^000000",
		"Cool Down:^777777 0.7 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 An area attack with an ATK of (100+20*SkillLV)%. Can only be used while mounted and wielding a Spear class weapon. During the Cast Time, character DEF is reduced to 2/3. The affected area varies with level as follows: ^000000",
		"L1-3: Area 1",
		"L4-6: Area 1+2",
		"L7-9: Area 1+2+3",
		"L10: Area 1+2+3+4.",
		"The following diagram shows the areas: ^000000",
		"^ff9933.444. ^000000",
		"^ff000033333 ^000000",
		"^ff99cc22222 ^000000",
		"^ffff0011111 ^000000",
		"^ffff0011 ^000000X^ffff0011 ^000000",
		"^777777where X marks the knight. ^000000",
		"[LV 1]^777777 120% ATK 1 cell Splash range ^000000",
		"[LV 2]^777777 140% ATK 1 cell Splash range ^000000",
		"[LV 3]^777777 160% ATK 1 cell Splash range ^000000",
		"[LV 4]^777777 180% ATK 2 cell Splash range ^000000",
		"[LV 5]^777777 200% ATK 2 cell Splash range ^000000",
		"[LV 6]^777777 220% ATK 2 cell Splash range ^000000",
		"[LV 7]^777777 240% ATK 3 cell Splash range ^000000",
		"[LV 8]^777777 260% ATK 3 cell Splash range ^000000",
		"[LV 9]^777777 280% ATK 3 cell Splash range ^000000",
		"[LV 10]^777777 300% ATK 4 cell Splash range ^000000",
	].join("\n");

	SkillDescription[SKID.KN_SPEARSTAB] = [
		"Spear Stab",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 9 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 4 cells ^000000",
		"ATK Type:^777777 Weapon property, Melee, Area, Physical attack ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 One Cell splash (yes, only 1x1) melee attack with an ATK of (100+20*SkillLV)%. Targets are knocked back 6 cells. This skill can only be used with Spear class weapons. ^000000",
		"[LV 1]^777777 120% ATK ^000000",
		"[LV 2]^777777 140% ATK ^000000",
		"[LV 3]^777777 160% ATK ^000000",
		"[LV 4]^777777 180% ATK ^000000",
		"[LV 5]^777777 200% ATK ^000000",
		"[LV 6]^777777 220% ATK ^000000",
		"[LV 7]^777777 240% ATK ^000000",
		"[LV 8]^777777 260% ATK ^000000",
		"[LV 9]^777777 280% ATK ^000000",
		"[LV 10]^777777 300% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.KN_SPEARBOOMERANG] = [
		"Spear Boomerang",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 1 + 2*SkillLV cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 A ranged attack with an ATK of (100+50*SkillLV)%. This skill can only be used with Spear class weapons. ^000000",
		"[LV 1]^777777 150% ATK, 3 cell Range ^000000",
		"[LV 2]^777777 200% ATK, 5 cell Range ^000000",
		"[LV 3]^777777 250% ATK, 7 cell Range ^000000",
		"[LV 4]^777777 300% ATK, 9 cell Range ^000000",
		"[LV 5]^777777 350% ATK, 11 cell Range ^000000",
	].join("\n");

	SkillDescription[SKID.KN_TWOHANDQUICKEN] = [
		"Two-Hand Quicken",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 + 4*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 30*SkillLV ^000000",
		"Effect:^777777 Decreases weapon swing delay with two-handed swords by 30%. This skill only works with Two-Hand Sword class weapons and the effect cancels when switching to any other type. ^000000",
		"[LV 1]^777777 Lasts 30secs ^000000",
		"[LV 2]^777777 Lasts 60Secs ^000000",
		"[LV 3]^777777 Lasts 90Secs ^000000",
		"[LV 4]^777777 Lasts 120Secs ^000000",
		"[LV 5]^777777 Lasts 150Secs ^000000",
		"[LV 6]^777777 Lasts 180Secs ^000000",
		"[LV 7]^777777 Lasts 210Secs ^000000",
		"[LV 8]^777777 Lasts 240Secs ^000000",
		"[LV 9]^777777 Lasts 270Secss ^000000",
		"[LV 10]^777777 Lasts 300Secs ^000000",
	].join("\n");

	SkillDescription[SKID.KN_AUTOCOUNTER] = [
		"Auto Counter",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 3 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 0.4*SkillLV sec ^000000",
		"Effect:^777777 Puts character into the counter stance until duration expires. If attacked from the front while in counter stance, character will block the attack and counterattack. While in the counter stance, the character cannot move.",
		"The counterattack doubles Critical Rate but that doesn't mean the user can hit the target without failure. ^000000",
		"[LV 1]^777777 0.4 Seconds ^000000",
		"[LV 2]^777777 0.8 Seconds ^000000",
		"[LV 3]^777777 1.2 Seconds ^000000",
		"[LV 4]^777777 1.6 Seconds ^000000",
		"[LV 5]^777777 2.0 Seconds ^000000",
	].join("\n");

	SkillDescription[SKID.KN_BOWLINGBASH] = [
		"Bowling Bash",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 12 + SkillLV ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 2 cells ^000000",
		"Cast Time:^777777 0.7 sec (uninterruptible) ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Hits one enemy with an ATK of (100+40*SkillLV)%. The enemy is knocked back up to 5 cells. If that enemy hits any other enemies, then the hit becomes a 3x3 cell melee splash attack at that point with additional damage to these secondary targets. During the Cast Time character's DEF is reduced to 2/3. ^000000",
		"[LV 1]^777777 140% Damage, Knock back 1 cell ^000000",
		"[LV 2]^777777 180% Damage, Knock back 1 cell ^000000",
		"[LV 3]^777777 220% Damage, Knock back 2 cell ^000000",
		"[LV 4]^777777 260% Damage, Knock back 2 cell ^000000",
		"[LV 5]^777777 300% Damage, Knock back 3 cell ^000000",
		"[LV 6]^777777 340% Damage, Knock back 3 cell ^000000",
		"[LV 7]^777777 380% Damage, Knock back 4 cell ^000000",
		"[LV 8]^777777 420% Damage, Knock back 4 cell ^000000",
		"[LV 9]^777777 460% Damage, Knock back 5 cell ^000000",
		"[LV 10]^777777 500% Damage, Knock back 5 cell ^000000",
	].join("\n");

	SkillDescription[SKID.KN_RIDING] = [
		"Riding",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 This skill allows the character to ride a Peco Peco. Mounted characters gain an additional 25% walking speed (cumulative with AGI UP) and the maximum weight limit a character can carry is increased by 1000.",
		"Mounted characters also attack at half the normal speed, but this penalty can be reduced or offset by levels in Cavalry Mastery. While mounted, the size modifier of spear vs. medium size is 100% instead of 75%.",
		"The Peco Peco must be hired from Peco Peco Breeder in Prontera (55/350) at a cost of 2500z. If the character dismounts (by clicking on the \"OFF\" button in the equipment window), then the Peco Peco disappears and a new one must be hired. ^000000",
	].join("\n");

	SkillDescription[SKID.KN_CAVALIERMASTERY] = [
		"Cavalry Mastery",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Helps return weapon swinging speed to normal while riding a Peco Peco. The swinging speed while riding a Peco Peco is (50+10*SkillLV)% based on unmounted ASPD. This can be incorporated into ASPD as Weapon Delay*(2 - 0.2*SkillLV)*(250 - AGI - [DEX/4])/250. ^000000",
		"[LV 1]^777777 60% ASPD ^000000",
		"[LV 2]^777777 70% ASPD ^000000",
		"[LV 3]^777777 80% ASPD ^000000",
		"[LV 4]^777777 90% ASPD ^000000",
		"[LV 5]^777777 Normal ASPD ^000000",
	].join("\n");

	SkillDescription[SKID.PR_MACEMASTERY] = [
		"Mace Mastery",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases damage with Maces by +3*SkillLV. This damage ignores modification from Armor and VIT defense, but not from Elemental and Card modifiers and applies to all hits for multi hit attacks. ^000000",
		"[LV 1]^777777 ATK +3 ^000000",
		"[LV 2]^777777 ATK +6 ^000000",
		"[LV 3]^777777 ATK +9 ^000000",
		"[LV 4]^777777 ATK +12 ^000000",
		"[LV 5]^777777 ATK +15 ^000000",
		"[LV 6]^777777 ATK +18 ^000000",
		"[LV 7]^777777 ATK +21 ^000000",
		"[LV 8]^777777 ATK +24 ^000000",
		"[LV 9]^777777 ATK +27 ^000000",
		"[LV 10]^777777 ATK +30 ^000000",
	].join("\n");

	SkillDescription[SKID.PR_IMPOSITIO] = [
		"Impositio Manus",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 + 3*SkillLV ^000000",
		"Target:^777777 1 Ally ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 3 sec ^000000",
		"Duration:^777777 60 sec ^000000",
		"Effect:^777777 Gives the Impositio Manus effect to the target. This effect increases the targets minimum and maximum weapon ATK (even with bare hand) by 5*SkillLV.",
		"This means the damage is modified by Size and reduced by DEF (both Armor and VIT). Can be used on self.",
		"You can change weapons at any time during the effect of this spell without disrupting it. When a second instance is cast on a target, then it will replace the first instance. ^000000",
		"[LV 1]^777777 ATK +5 ^000000",
		"[LV 2]^777777 ATK +10 ^000000",
		"[LV 3]^777777 ATK +15 ^000000",
		"[LV 4]^777777 ATK +20 ^000000",
		"[LV 5]^777777 ATK +25 ^000000",
	].join("\n");

	SkillDescription[SKID.PR_SUFFRAGIUM] = [
		"Suffragium",
		"Max Level:^777777 3 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 8 ^000000",
		"Target:^777777 1 Ally ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Duration:^777777 40 - 10*SkillLV sec ^000000",
		"Effect:^777777 Reduces Variable Cast Time of the next spell cast by target (if started within the duration). Has no effect on a spell that is already being cast (will effect the next spell instead). The casting of a 0 Cast Time spell will use up the effect with no benefit.",
		"Cannot be cast on self. When a second instance is cast on a target, then it will replace the first instance.",
		"[LV 1] -15% Cast Time, 30 secs",
		"[LV 2] -30% Cast Time, 20 secs",
		"[LV 3] -45% Cast Time, 10 secs ^000000",
	].join("\n");

	SkillDescription[SKID.PR_ASPERSIO] = [
		"Aspersio",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 + 4*SkillLV ^000000",
		"Target:^777777 1 Ally or 1 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"ATK Type:^777777 Holy, Long Range, Magic attack ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Duration:^777777 30 + 30*SkillLV sec ^000000",
		"Catalyst:^777777 1 Holy Water ^000000",
		"Effect:^777777 Aspersio changes your own or an Allies weapon property to Holy. Changing or removing the weapon will cancel the effect prematurely. When a second weapon enchanting spell effect (from Enchant Poison or Aspersio currently) is cast on a target, then it will replace the first spell effect.",
		"Aspersio can also be used as a weak attack. Using shift-click, you can target an Undead property or Demon family monsters and inflict 40 points of Holy property damage that ignores all defenses. Against other kinds of monsters, it does no damage, but consumes the Holy Water and SP anyway. ^000000",
		"[LV 1]^777777 Lasts 60Secs ^000000",
		"[LV 2]^777777 Lasts 90Secs ^000000",
		"[LV 3]^777777 Lasts 120Secs ^000000",
		"[LV 4]^777777 Lasts 150Secs ^000000",
		"[LV 5]^777777 Lasts 180Secs ^000000",
	].join("\n");

	SkillDescription[SKID.PR_BENEDICTIO] = [
		"Benedictio Sanctissimi Sacramenti",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 (10 for each supporting character) ^000000",
		"Target:^777777 1 cell ^000000",
		"Range:^777777 9 cells ^000000",
		"ATK Type:^777777 Holy, Long Range, Magic attack ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 40*SkillLV sec ^000000",
		"Effect:^777777 This skill changes the elemental property of all characters in a 3x3 area around the targeted cell to Holy1.",
		"It also does an amount of Holy damage equal to half the power of a Heal of the same Skill Level to Undead property and Demon family monsters in the area of effect.",
		"It requires one Priest, Acolyte or Monk in the cells on the right and left side of the caster to work (yes, that means the caster and 2 extra characters). ^000000",
		"[LV 1]^777777 40 Seconds ^000000",
		"[LV 2]^777777 80 Seconds ^000000",
		"[LV 3]^777777 120 Seconds ^000000",
		"[LV 4]^777777 160 Seconds ^000000",
		"[LV 5]^777777 200 Seconds ^000000",
	].join("\n");

	SkillDescription[SKID.PR_SANCTUARY] = [
		"Sanctuary",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 12 + 3*SkillLV ^000000",
		"Target:^777777 1 cell ^000000",
		"Range:^777777 9 cells ^000000",
		"ATK Type:^777777 Holy, Long Range, Area, Magic attack ^000000",
		"Cast Time:^777777 5 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 1 + 3*SkillLV sec ^000000",
		"Catalyst:^0000ff 1 Blue Gemstone ^000000",
		"Effect:^777777 Creates a 5x5 area sanctuary effect around the targeted cell. Characters and non-undead/demon monsters within the sanctuary are healed (see amount below) once a second unless at Maximum HP.",
		"Undead property and Demon family monsters take Holy property damage equal to half the sanctuary's heal, rounded down and are knocked back out of the effect each time. The maximum number of valid healing targets is equal to 6+2*SkillLV, the maximum number of valid damage targets is equal to 3+SkillLV.",
		"The spell affecting one player or monster once is counted as 1 target. If it affects a player or monster more than once, then it will count as a valid target more than once. If the maximum number of valid targets is exceeded, the spell will come to an end prematurely.",
		"Valid targets are determined by the following priority:",
		"1/ Player with Current HP less than Maximum HP.",
		"2/ Non-Undead property/Demon family monsters with Current HP less than Maximum HP.",
		"3/ Undead property and Demon family monsters.",
		"Multiple Sanctuaries can be stacked on each other and as long as the maximum number of valid targets is not exceeded, each will last to their full duration.",
		"Note: Sanctuary is the one of the two only means of healing the Emperium in the War of Emperium battles. While it is a skill that is by no means essential to have in a War of Emperium priest, have one or more priests with a high level of the skill in a guild could be very useful. ^000000",
		"[LV 1]^777777 100 HP, 50 Damage ^000000",
		"[LV 2]^777777 200 HP, 100 Damage ^000000",
		"[LV 3]^777777 300 HP, 150 Damage ^000000",
		"[LV 4]^777777 400 HP, 200 Damage ^000000",
		"[LV 5]^777777 500 HP, 250 Damage ^000000",
		"[LV 6]^777777 600 HP, 300 Damage ^000000",
		"[LV 7]^777777 777 HP, 388 Damage ^000000",
		"[LV 8]^777777 777 HP, 388 Damage ^000000",
		"[LV 9]^777777 777 HP, 388 Damage ^000000",
		"[LV 10]^777777 777 HP, 388 Damage ^000000",
	].join("\n");

	SkillDescription[SKID.PR_SLOWPOISON] = [
		"Slow Poison",
		"Max Level:^777777 4 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 4 + 2*SkillLV ^000000",
		"Target:^777777 1 Ally ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 10*SkillLV sec ^000000",
		"Effect:^777777 Stops damage from a Poison effect and allows you to recover HP/SP normally. However, does not actually cancel the Poison effect, so the DEF reduction effect is still a problem. ^000000",
		"[LV 1]^777777 Lasts 10 Seconds ^000000",
		"[LV 2]^777777 Lasts 20 Seconds ^000000",
		"[LV 3]^777777 Lasts 30 Seconds ^000000",
		"[LV 4]^777777 Lasts 40 Seconds ^000000",
	].join("\n");

	SkillDescription[SKID.PR_STRECOVERY] = [
		"Recovery",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 5 ^000000",
		"Target:^777777 1 Ally ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Effect:^777777 Removes White Imprison and Poem of the Netherworld, cures Frozen and Stunned effects on players. Causes non-Undead property monsters to lose their target. Passive monsters will stop attacking, while aggressive monsters will choose a new target.",
		"Recovery may inflict Blind effect on Undead property monsters. One Blind effect cannot overlap another. ^000000",
	].join("\n");

	SkillDescription[SKID.PR_KYRIE] = [
		"Kyrie Eleison",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 + 5*[(SkillLV - 1)/3 rounded down] ^000000",
		"Target:^777777 1 Ally ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Duration:^777777 120 sec ^000000",
		"Effect:^777777 Creates a Kyrie Eleison effect on the target character. This effect will block MaxHPofTarget*(10+2*SkillLV)% damage OR (5+SkillLV/2) hits, whichever is reached first.",
		"Damage in excess of the amount blocked will transfer through and count as a hit of lowered damage. Hits are only assessed when a blow would normally land and not for every swing by a monster (despite showing an \"Auto Guard\" graphic with every swing for the effected player and a miss for every other player).",
		"Any Magic attack will do full damage to the affected target, while still counting against the maximum damage and number of hits of Kyrie Eleison. Casting Holy Light or Assumptio on someone with this effect will cancel it entirely. When a second instance is cast on a target, then it will replace the first instance. ^000000",
		"[LV 1]^777777 12% of Maximum HP, 5 attacks ^000000",
		"[LV 2]^777777 14% of Maximum HP, 6 attacks ^000000",
		"[LV 3]^777777 16% of Maximum HP, 6 attacks ^000000",
		"[LV 4]^777777 18% of Maximum HP, 7 attacks ^000000",
		"[LV 5]^777777 20% of Maximum HP, 7 attacks ^000000",
		"[LV 6]^777777 22% of Maximum HP, 8 attacks ^000000",
		"[LV 7]^777777 24% of Maximum HP, 8 attacks ^000000",
		"[LV 8]^777777 26% of Maximum HP, 9 attacks ^000000",
		"[LV 9]^777777 28% of Maximum HP, 9 attacks ^000000",
		"[LV 10]^777777 30% of Maximum HP, 10 attacks ^000000",
	].join("\n");

	SkillDescription[SKID.PR_MAGNIFICAT] = [
		"Magnificat",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 40 ^000000",
		"Target:^777777 All party members in range ^000000",
		"Range:^777777 Visual range ^000000",
		"Cast Time:^777777 4 sec ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Duration:^777777 15 + 15*SkillLV sec ^000000",
		"Effect:^777777 Increases the natural HP and natural SP recovery speed to 200% for all affected party members. This does not affect the Increase Recuperative and Spiritual Power skills. When a second instance is cast, then it will replace the first instance on any affected targets. ^000000",
		"[LV 1]^777777 Lasts 30 Seconds ^000000",
		"[LV 2]^777777 Lasts 45 Seconds ^000000",
		"[LV 3]^777777 Lasts 60 Seconds ^000000",
		"[LV 4]^777777 Lasts 75 Seconds ^000000",
		"[LV 5]^777777 Lasts 90 Seconds ^000000",
	].join("\n");

	SkillDescription[SKID.PR_GLORIA] = [
		"Gloria",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 ^000000",
		"Target:^777777 All party members in range ^000000",
		"Range:^777777 Visual range ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Duration:^777777 5 + 5*SkillLV sec ^000000",
		"Effect:^777777 Gives the Gloria effect to all characters in party near the caster. The Gloria effect adds LUK +30. When a second instance is cast, then it will replace the first instance on any affected targets. ^000000",
		"[LV 1]^777777 Lasts 10 Seconds ^000000",
		"[LV 2]^777777 Lasts 15 Seconds ^000000",
		"[LV 3]^777777 Lasts 20 Seconds ^000000",
		"[LV 4]^777777 Lasts 25 Seconds ^000000",
		"[LV 5]^777777 Lasts 30 Seconds ^000000",
	].join("\n");

	SkillDescription[SKID.PR_LEXDIVINA] = [
		"Lex Divina",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 LV 1-5 20; LV 6-10 30-2*SkillLV ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 5 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 3 sec ^000000",
		"Duration:^777777 30*(100-TargetVIT)/100 sec of Silence ^000000",
		"Effect:^777777 This skill has a chance of inflicting the Silence status on the selected target. Does not work against Boss monsters. The chance is equal to 100 - (TargetVIT + TargetLUK/8) + INT/15 %.",
		"Casting this spell on a target that is already silenced will remove the silence status. ^000000",
		"[LV 1]^777777 Lasts 30 Seconds ^000000",
		"[LV 2]^777777 Lasts 35 Seconds ^000000",
		"[LV 3]^777777 Lasts 40 Seconds ^000000",
		"[LV 4]^777777 Lasts 45 Seconds ^000000",
		"[LV 5]^777777 Lasts 50 Seconds ^000000",
		"[LV 6]^777777 Lasts 60 Seconds ^000000",
		"[LV 7]^777777 Lasts 60 Seconds ^000000",
		"[LV 8]^777777 Lasts 60 Seconds ^000000",
		"[LV 9]^777777 Lasts 60 Seconds ^000000",
		"[LV 10]^777777 Lasts 60 Seconds ^000000",
	].join("\n");

	SkillDescription[SKID.PR_TURNUNDEAD] = [
		"Turn Undead",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 20 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 5 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 3 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 This skill only works on Undead property monsters, although it will cast on other types of monsters. Has a [(20*SkillLV) + LUK + INT + BaseLV + (1 - TargetHP/TargetMaxHP)*200]/1000 % (with a max 70%) chance to do holy damage equal to current HP on an Undead property monster.",
		"On failure, an Undead property monster will take Holy property damage equal to [BaseLV + INT + 10*SkillLV]. Does not work against Boss monsters. ^000000",
	].join("\n");

	SkillDescription[SKID.PR_LEXAETERNA] = [
		"Lex Aeterna",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 3 sec ^000000",
		"Duration:^777777 Until target is damaged by anything ^000000",
		"Effect:^777777 The target will take double damage from the next damage source. Healing, misses and status effects do not trigger the effect. Cannot be cast on a Frozen or Stone Cursed target. ^000000",
	].join("\n");

	SkillDescription[SKID.PR_MAGNUS] = [
		"Magnus Exorcismus",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 38 + 2*SkillLV ^000000",
		"Target:^777777 1 cell ^000000",
		"Range:^777777 9 cells ^000000",
		"ATK Type:^777777 Holy, Long Range, Area, Magic attack ^000000",
		"Cast Time:^777777 15 ^000000",
		"Cool Down:^777777 4 sec ^000000",
		"Duration:^777777 3 + SkillLV sec ^000000",
		"Catalyst:^0000ff 1 Blue Gemstone ^000000",
		"Effect:^777777 Calls down a Grand Cross in a 7x7 area around the targeted cell. Any Demon family and Undead property monsters entering the area of the effect suffer Holy property damage of MATK*SkillLV per wave. Waves occur approximately every 3 seconds and each wave appears to hit SkillLV times.",
		"Therefore, there is a certain maximum number of waves than any one monster can be affected during the duration of the spell (there will be less waves if the monster enters late or is knocked back out for any reason).",
		"As it creates an effect on the ground, Magnus Exorcismus cannot stack with other ground effect skills (e.g. Pneuma and Safety Wall). ^000000",
		"[LV 1]^777777 1 Hits ^000000",
		"[LV 2]^777777 2 Hits ^000000",
		"[LV 3]^777777 3 Hits ^000000",
		"[LV 4]^777777 4 Hits ^000000",
		"[LV 5]^777777 5 Hits ^000000",
		"[LV 6]^777777 6 Hits ^000000",
		"[LV 7]^777777 7 Hits ^000000",
		"[LV 8]^777777 8 Hits ^000000",
		"[LV 9]^777777 9 Hits ^000000",
		"[LV 10]^777777 10 Hits ^000000",
	].join("\n");

	SkillDescription[SKID.WZ_FIREPILLAR] = [
		"Fire Pillar",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active, Trap ^000000",
		"SP Cost:^777777 75 ^000000",
		"Target:^777777 1 cell ^000000",
		"Area:^777777 3x3 cells ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 3.3-0.3*SkillLV sec ^000000",
		"Cool Down:^777777 1 second ^000000",
		"Duration:^777777 30 sec or until tripped ^000000",
		"Catalyst:^0000ff 1 Blue Gemstone for LV 6-10 ^000000",
		"Effect:^777777 Creates a Fire Pillar trap effect on the targeted cell. Tripped when any monster (or player in a PvP area) walks over it. When tripped, the trap delivers Fire property damage equal to (50+MATK/5)*(2+SkillLV) on a 3x3 area around the tripped cell.",
		"This damage ignores MDEF and INT. While the target is taking damage from Fire Pillar, it will not be able to move until all the hits have been dealt (0.2*Hits sec). You can not have more than 5 Pillars active at any time. ^000000",
		"[LV 1]^777777 3 Hits / no Gemstone ^000000",
		"[LV 2]^777777 4 Hits / no Gemstone ^000000",
		"[LV 3]^777777 5 Hits / no Gemstone ^000000",
		"[LV 4]^777777 6 Hits / no Gemstone ^000000",
		"[LV 5]^777777 7 Hits / no Gemstone ^000000",
		"[LV 6]^777777 8 Hits /^0000ff Blue Gemstone ^000000",
		"[LV 7]^777777 9 Hits /^0000ff Blue Gemstone ^000000",
		"[LV 8]^777777 10 Hits /^0000ff Blue Gemstone ^000000",
		"[LV 9]^777777 11 Hits /^0000ff Blue Gemstone ^000000",
		"[LV 10]^777777 12 Hits /^0000ff Blue Gemstone ^000000",
	].join("\n");

	SkillDescription[SKID.WZ_SIGHTRASHER] = [
		"Sightrasher",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive, Combo ^000000",
		"SP Cost:^777777 33 + 2*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 7x7 cells ^000000",
		"ATK Type:^777777 Fire ^000000",
		"Cast Time:^777777 0.5 sec, not reducible by DEX ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Can only be cast when Sight is active. Shoots fire in all 8 directions away from the caster, each Fireball does (100+20*SkillLV)% MATK and pushes the target back. ^000000",
		"[LV 1]^777777 120% MATK ^000000",
		"[LV 2]^777777 140% MATK ^000000",
		"[LV 3]^777777 160% MATK ^000000",
		"[LV 4]^777777 180% MATK ^000000",
		"[LV 5]^777777 200% MATK ^000000",
		"[LV 6]^777777 220% MATK ^000000",
		"[LV 7]^777777 240% MATK ^000000",
		"[LV 8]^777777 260% MATK ^000000",
		"[LV 9]^777777 280% MATK ^000000",
		"[LV 10]^777777 300% MATK ^000000",
	].join("\n");

	SkillDescription[SKID.WZ_FIREIVY] = [
		"Fire Ivy",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive^bb0000(Fire) ^000000",
		"SP Cost:^777777 10 + 2*SkillLV ^000000",
		"Target:^777777 Ground ^000000",
		"Effect:^ee0000 This skill has been dropped by Gravity. ^000000",
		"^777777Summon Ivy Vines of Flames. ^000000",
	].join("\n");

	SkillDescription[SKID.WZ_METEOR] = [
		"Meteor Storm",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 See below ^000000",
		"Target:^777777 Area 7x7 ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 15 sec ^000000",
		"Cool Down:^777777 2 + 0.5*SkillLV sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Summons Meteors that randomly strike cells in the target area and do Fire Element damage in the 7x7 area they impact for each hit and have a (3*SkillLV)% chance to stun the target. ^000000",
		"[LV 1]^777777 2 Meteor 1 Hit Each 3% StunChance, SP 20 ^000000",
		"[LV 2]^777777 3 Meteor 1 Hit Each 6% StunChance, SP 24 ^000000",
		"[LV 3]^777777 3 Meteors 2 Hit Each 9% StunChance, SP 30 ^000000",
		"[LV 4]^777777 4 Meteors 2 Hit Each 12% StunChance, SP 34 ^000000",
		"[LV 5]^777777 4 Meteors 3 Hit Each 15% StunChance, SP 40 ^000000",
		"[LV 6]^777777 5 Meteors 3 Hit Each 18% StunChance, SP 44 ^000000",
		"[LV 7]^777777 5 Meteors 4 Hit Each 21% StunChance, SP 50 ^000000",
		"[LV 8]^777777 6 Meteors 4 Hit Each 24% StunChance, SP 54 ^000000",
		"[LV 9]^777777 6 Meteors 5 Hit Each 27% StunChance, SP 60 ^000000",
		"[LV 10]^777777 7 Meteors 5 Hit Each 30% StunChance, SP 64 ^000000",
	].join("\n");

	SkillDescription[SKID.WZ_JUPITEL] = [
		"Jupitel Thunder",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 17 + 3*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 2 + 0.5*SkillLV sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Hits the target for 2+SkillLV times using Wind Element and pushes it back the same number of cells up to a maximum of 8. Improved Lightning Bolt spell. ^000000",
		"[LV 1]^777777 3 Hits / 2.5 sec Cast Time ^000000",
		"[LV 2]^777777 4 Hits / 3.0 sec Cast Time ^000000",
		"[LV 3]^777777 5 Hits / 3.5 sec Cast Time ^000000",
		"[LV 4]^777777 6 Hits / 2.5 sec Cast Time ^000000",
		"[LV 5]^777777 7 Hits / 4.5 sec Cast Time ^000000",
		"[LV 6]^777777 8 Hits / 5.0 sec Cast Time ^000000",
		"[LV 7]^777777 9 Hits / 5.5 sec Cast Time ^000000",
		"[LV 8]^777777 10 Hits / 6.0 sec Cast Time ^000000",
		"[LV 9]^777777 11 Hits / 6.5 sec Cast Time ^000000",
		"[LV 10]^777777 12 Hits / 7.0 sec Cast Time ^000000",
	].join("\n");

	SkillDescription[SKID.WZ_VERMILION] = [
		"Lord of Vermillion",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 56 + 4*SkillLV ^000000",
		"Target:^777777 Area 7x7 ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 15.55 - 0.5*SkillLV sec ^000000",
		"Cool Down:^777777 5 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Hits the target area with a strong lightning attack that does 4 sets of hits with 10 hits each set (total 40 hits) and each hit doing (8+(2*SkillLV))% MATK damage. It also has a (4*SkillLV)% chance to blind the targets. ^000000",
		"[LV 1]^777777 4% BlindChance, 10% MATK/Bolt ^000000",
		"[LV 2]^777777 8% BlindChance, 12% MATK/Bolt ^000000",
		"[LV 3]^777777 12% BlindChance, 14% MATK/Bolt ^000000",
		"[LV 4]^777777 16% BlindChance, 16% MATK/Bolt ^000000",
		"[LV 5]^777777 20% BlindChance, 18% MATK/Bolt ^000000",
		"[LV 6]^777777 24% BlindChance, 20% MATK/Bolt ^000000",
		"[LV 7]^777777 28% BlindChance, 22% MATK/Bolt ^000000",
		"[LV 8]^777777 32% BlindChance, 24% MATK/Bolt ^000000",
		"[LV 9]^777777 36% BlindChance, 26% MATK/Bolt ^000000",
		"[LV 10]^777777 40% BlindChance, 28% MATK/Bolt ^000000",
	].join("\n");

	SkillDescription[SKID.WZ_WATERBALL] = [
		"Water Ball",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 15 + 5*(SkillLV/2 rounded down) ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 SkillLV sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Hits the target up to LV*LV-1 times with a Water elemental attack of (100+30*SkillLV)% MATK. You must stand on water or on a Deluge (Sage skill) cell to successfully use this spell.",
		"The damage for each hit is calculated individually and the damage numbers do not show as adding up, also casting Lex Aeterna (Priest Skill) on the target will only affect the first hit.",
		"This is the strongest single target spell in-game. The number of water balls that you are actually able cast also depends on the amount of water you are standing in.",
		"In any given X by X grid, the game determines that you are surrounded by (X*X)-1 cells. So, at level 4/5 Waterball, you can cast up to (5*5)-1, or 24 water balls.",
		"However, if you're only standing in a 3x3 pool, you will only cast 8 water balls. If you're standing in a freaky grid (like a partially-used Deluge), the number of balls cast is equal to the number of water-occupied cells in your grid, so if you're in a cell like this:",


		"O = empty",
		"X = water",
		"* = player",


		"OOOOO",
		"OOOOO",
		"XX*XX",
		"OOOOO",
		"OOOOO",


		"...you'll only cast 4 water balls with level 4/5. With level 2/3, you'll only cast 2 water balls, since only 2 are in the 3x3 grid surrounding you.",


		"This is particularly useful to keep in mind when you're with a Deluge Sage, since Waterball uses up the Deluge cells.",
		"You can determine which cells are used by how you stand in the cast area (every cast will wipe out the respective grid section around you, centered on you), and maximize the effectiveness of the water ball spells you cast. ^000000",
		"[LV 1]^777777 1 Waterball / 1x1 Grid, 130% MATK ^000000",
		"[LV 2]^777777 3 Waterball / 3x3 Grid, 160% MATK ^000000",
		"[LV 3]^777777 8 Waterball / 3x3 Grid, 190% MATK ^000000",
		"[LV 4]^777777 15 Waterball / 5x5 Grid, 220% MATK ^000000",
		"[LV 5]^777777 24 Waterball / 5x5 Grid, 250% MATK ^000000",
	].join("\n");

	SkillDescription[SKID.WZ_ICEWALL] = [
		"Ice Wall",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 ^000000",
		"Target:^777777 1 cell ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 4 + 4*SkillLV sec or until broken ^000000",
		"Effect:^777777 Creates a row of 5 Ice Wall cells perpendicular to the line between the caster and the target cell and centered on the target cell.",
		"An Ice Wall cell cannot be entered, but it may be attacked. Ice Wall cells have 200+200*SkillLV HP that lowers at a rate of 50 per second until it reaches 0 and then the wall disappears.",
		"If the wall is attacked the HP also lower by the damage dealt to the wall. You can not have more than 5 Ice Walls active at the same time. ^000000",
		"[LV 1]^777777 400 HP / 8 sec ^000000",
		"[LV 2]^777777 600 HP / 12 sec ^000000",
		"[LV 3]^777777 800 HP / 16 sec ^000000",
		"[LV 4]^777777 1000 HP / 20 sec ^000000",
		"[LV 5]^777777 1200 HP / 24 sec ^000000",
		"[LV 6]^777777 1400 HP / 28 sec ^000000",
		"[LV 7]^777777 1600 HP / 32 sec ^000000",
		"[LV 8]^777777 1800 HP / 36 sec ^000000",
		"[LV 9]^777777 2000 HP / 40 sec ^000000",
		"[LV 10]^777777 2200 HP / 44 sec ^000000",
	].join("\n");

	SkillDescription[SKID.WZ_FROSTNOVA] = [
		"Frost Nova",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 47 - 2*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 5x5 cells ^000000",
		"Cast Time:^777777 6 - 0.5*(SkillLV/2 rounded down) sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant, frozen status 1.5*SkillLV sec ^000000",
		"Effect:^777777 Hits every enemy in a 5x5 area around the Caster with a Water Element frost attack. The freeze chance is higher than of Frost Diver (33+5*SkillLV %).",
		"The magic damage to each target is 66+7*SkillLV %, but if a monster is frozen it won't receive damage. The caster is of course immune to his/her own Frost Nova. ^000000",
		"[LV 1]^777777 6.0 Seconds Cast Time ^000000",
		"[LV 2]^777777 6.0 Seconds Cast Time ^000000",
		"[LV 3]^777777 5.5 Seconds Cast Time ^000000",
		"[LV 4]^777777 5.5 Seconds Cast Time ^000000",
		"[LV 5]^777777 5 Seconds Cast Time ^000000",
		"[LV 6]^777777 5 Seconds Cast Time ^000000",
		"[LV 7]^777777 4.5 Seconds Cast Time ^000000",
		"[LV 8]^777777 4.5 Seconds Cast Time ^000000",
		"[LV 9]^777777 4 Seconds Cast Time ^000000",
		"[LV 10]^777777 4 Seconds Cast Time ^000000",
	].join("\n");

	SkillDescription[SKID.WZ_STORMGUST] = [
		"Storm Gust",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 78 ^000000",
		"Target:^777777 Area 9x9 ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 5 + SkillLV sec ^000000",
		"Cool Down:^777777 5 sec ^000000",
		"Duration:^777777 5 sec ^000000",
		"Effect:^777777 Summons an icy Water Element storm that hits targets in the area of effect every 0.5 seconds (for damage per hit see below) and pushes them around randomly.",
		"Monsters hit 3 times will freeze and not receive further hits, except undead and MVP which won't be frozen and thus will receive more hits. The maximum number of possible hits is 10.",
		"Damage per hit is (100+40*SkillLV)% MATK ^000000",
		"[LV 1]^777777 140% MATK / 6 sec Cast Time ^000000",
		"[LV 2]^777777 180% MATK / 7 sec Cast Time ^000000",
		"[LV 3]^777777 220% MATK / 8 sec Cast Time ^000000",
		"[LV 4]^777777 260% MATK / 9 sec Cast Time ^000000",
		"[LV 5]^777777 300% MATK / 10 sec Cast Time ^000000",
		"[LV 6]^777777 340% MATK / 11 sec Cast Time ^000000",
		"[LV 7]^777777 380% MATK / 12 sec Cast Time ^000000",
		"[LV 8]^777777 420% MATK / 13 sec Cast Time ^000000",
		"[LV 9]^777777 460% MATK / 14 sec Cast Time ^000000",
		"[LV 10]^777777 500% MATK / 15 sec Cast Time ^000000",
	].join("\n");

	SkillDescription[SKID.WZ_EARTHSPIKE] = [
		"Earth Spike",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive, Level Selectable ^000000",
		"SP Cost:^777777 10 + 2*SkillLV ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 0.7*SkillLV sec ^000000",
		"Cool Down:^777777 0.8 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Hits the targeted enemy with 1 Earth Element Spike per SkillLV for 100%*MATK damage each. Technically this is a normal Bolt-type spell using the Earth element. ^000000",
	].join("\n");

	SkillDescription[SKID.WZ_HEAVENDRIVE] = [
		"Heaven's Drive",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 24 + 4*SkillLV ^000000",
		"Target:^777777 1 cell ^000000",
		"Range:^777777 9 cells ^000000",
		"ATK Type:^777777 Earth property, Long Range, Area, Magic attack ^000000",
		"Cast Time:^777777 1*SkillLV sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Hits every enemy in a 5x5 cell area around the target cell with 1 Spike per SkillLV for 1*MATK damage each. ^000000",
	].join("\n");

	SkillDescription[SKID.WZ_QUAGMIRE] = [
		"Quagmire",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 5*SkillLV ^000000",
		"Target:^777777 Area 5x5 ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 5*SkillLV sec ^000000",
		"Effect:^777777 Decreases the AGI and DEX of the Enemies within the area of effect by 10% per SkillLV. In PvP maps is only 5% per SkillLV. Does not work against Boss monsters. ^000000",
	].join("\n");

	SkillDescription[SKID.WZ_ESTIMATION] = [
		"Monster Property",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 monster ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Until status window is closed. ^000000",
		"Effect:^777777 Brings up a window with information about the targeted monster such as HP, element, level, etc at the time the spell is cast. Party members also see this window. ^000000",
	].join("\n");

	SkillDescription[SKID.BS_IRON] = [
		"Iron Tempering",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Catalyst:^777777 1 Iron Ore, 1 Mini-Furnace ^000000",
		"Effect:^777777 Allows character to refine 1 Iron Ore into 1 Iron using 1 Mini-Furnace. Skill value is (40+5*SkillLV)%. JobLV, DEX and LUK (in this order) further increase this chance. ^000000",
		"^6699ffForging formula:",
		"Success chance in %: Skill Value + JobLV * 0.2 + DEX * 0.1 + LUK * 0.1 ^000000",
	].join("\n");

	SkillDescription[SKID.BS_STEEL] = [
		"Steel Tempering",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Catalyst:^777777 5 Iron, 1 Coal, 1 Mini-Furnace ^000000",
		"Effect:^777777 Allows character to refine 5 Iron and 1 Coal into 1 Steel using a Mini-furnace. Skill value is (30+5*SkillLV)%. JobLV, DEX and LUK (in this order) further increase this chance. ^000000",
		"^6699ffForging formula:",
		"Success chance in %: Skill Value + JobLV * 0.2 + DEX * 0.1 + LUK * 0.1 ^000000",
	].join("\n");

	SkillDescription[SKID.BS_ENCHANTEDSTONE] = [
		"Enchanted Stone Craft",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Catalyst:^777777 Varies (see effect) ^000000",
		"Effect:^777777 Allows character to refine 10 Green Live/Wind of Verdure/Red Blood/Crystal Blue/Star Dust into 1 Great Nature/Rough Wind/Flame Heart/Mystic Frozen/Star Crumb using a Mini-furnace. The skill value is (10+5*SkillLV)%. JobLV, DEX and LUK (in this order) further increase this chance ^000000",
		"^6699ffForging formula:",
		"Success chance in %: Skill Value + JobLV * 0.2 + DEX * 0.1 + LUK * 0.1 ^000000",
	].join("\n");

	SkillDescription[SKID.BS_ORIDEOCON] = [
		"Research Oridecon",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Enchanted Stone Craft strictly applies only to the creation of Level 3 Weapons.",
		"Increasing this skill`s level raises the success rate of forging Level 3 Weapons by (1%+SkillLV). ^000000",
	].join("\n");

	SkillDescription[SKID.BS_DAGGER] = [
		"Smith Dagger",
		"Max Level:^777777 3 ^000000",
		"Type:^000099 Passive ^000000",
		"Catalyst:^777777 Varies ^000000",
		"Effect:^777777 Allows character to forge Daggers using a hammer. You can only forge Daggers of a level equal to or less than the level in this skill. Skill value is (5*SkillLV)%. Anvil, JobLV, DEX and LUK (in this order) further increase this chance. To start forging, double-click the respective Hammer from the ingredients list in your inventory.",
		"^000000[LV 1]^777777",
		"Knife",
		"1 Iron Hammer",
		"1 Iron",
		"10 Jellopy",
		"Cutter",
		"1 Iron Hammer",
		"25 Iron",
		"Main Gauche",
		"50 Iron",
		"^000000[LV 2]^777777",
		"Dirk",
		"1 Golden Hammer",
		"17 Steel",
		"Dagger",
		"1 Golden Hammer",
		"30 Steel",
		"Stiletto",
		"1 Golden Hammer",
		"40 Steel",
		"^000000[LV 3]^777777",
		"Gladius",
		"1 Oridecon Hammer",
		"40 Steel",
		"4 Oridecon",
		"1 Sapphire",
		"Damascus",
		"1 Oridecon Hammer",
		"60 Steel",
		"4 Oridecon",
		"1 Zircon",
		"^6699ffForging formula:",
		"Base % chance: Skill Value + JobLV * 0.2 + DEX * 0.1 + LUK * 0.1 + 50",
		"Normal Anvil   +0%",
		"Oridecon Anvil +3%",
		"Golden Anvil   +5%",
		"Emperium Anvil +10%",
		"LV 1 Weapon -0%",
		"LV 2 Weapon -20%",
		"LV 3 Weapon -30%",
		"Per Star Crumb -15%",
		"Elemental Stone -20% ^000000",
	].join("\n");

	SkillDescription[SKID.BS_SWORD] = [
		"Smith Sword",
		"Max Level:^777777 3 ^000000",
		"Type:^000099 Passive ^000000",
		"Catalyst:^777777 Varies ^000000",
		"Effect:^777777 Allows character to forge one-handed Swords using a hammer. You can only forge Swords of a level equal to or less than the level in this skill. Skill value is (5*SkillLV)%. Anvil, JobLV, DEX and LUK (in this order) further increase this chance. To start forging, double-click the respective Hammer from the ingredients list in your inventory.",
		"^000000[LV 1]^777777",
		"Sword",
		"1 Iron Hammer",
		"2 Iron",
		"Falchion",
		"1 Iron Hammer",
		"30 Iron",
		"Blade",
		"1 Iron Hammer",
		"45 Iron",
		"25 Tooth of bat",
		"^000000[LV 2]^777777",
		"Rapier",
		"1 Golden Hammer",
		"20 Steel",
		"Scimitar",
		"1 Golden Hammer",
		"35 Steel",
		"Ring Pommel Saber",
		"1 Golden Hammer",
		"40 Steel",
		"50 Wolf Claw",
		"^000000[LV 3]^777777",
		"Tsurugi",
		"1 Oridecon Hammer",
		"15 Steel",
		"8 Oridecon",
		"1 Garnet",
		"Haedonggum",
		"1 Oridecon Hammer",
		"10 Steel",
		"8 Oridecon",
		"1 Topaz",
		"Flamberge",
		"1 Oridecon Hammer",
		"16 Oridecon",
		"1 Cursed Ruby",
		"^6699ffForging formula:",
		"Base % chance: Skill Value + JobLV * 0.2 + DEX * 0.1 + LUK * 0.1 + 50",
		"Normal Anvil   +0%",
		"Oridecon Anvil +3%",
		"Golden Anvil   +5%",
		"Emperium Anvil +10%",
		"LV 1 Weapon -0%",
		"LV 2 Weapon -20%",
		"LV 3 Weapon -30%",
		"Per Star Crumb -15%",
		"Elemental Stone -20% ^000000",
	].join("\n");

	SkillDescription[SKID.BS_TWOHANDSWORD] = [
		"Smith Two-Handed Sword",
		"Max Level:^777777 3 ^000000",
		"Type:^000099 Passive ^000000",
		"Catalyst:^777777 Varies ^000000",
		"Effect:^777777 Allows character to forge two-handed Swords using a hammer. You can only forge Swords of a level equal to or less than the level in this skill. Skill value is (5*SkillLV)%. Anvil, JobLV, DEX and LUK (in this order) further increase this chance. To start forging, double-click the respective Hammer from the ingredients list in your inventory.",
		"^000000[LV 1]^777777",
		"Katana",
		"1 Iron Hammer",
		"35 Iron",
		"15 Horrendous Mouth",
		"^000000[LV 2]^777777",
		"Slayer",
		"1 Golden Hammer",
		"25 Steel",
		"20 Decayed Nail",
		"Bastard Sword",
		"1 Golden Hammer",
		"45 Steel",
		"^000000[LV 3]^777777",
		"Two-Handed Sword",
		"1 Oridecon Hammer",
		"10 Steel",
		"12 Oridecon",
		"Broad Sword",
		"1 Oridecon Hammer",
		"20 Steel",
		"12 Oridecon",
		"Claymore",
		"1 Oridecon Hammer",
		"20 Steel",
		"16 Oridecon",
		"1 Cracked Diamond",
		"^6699ffForging formula:",
		"Base % chance: Skill Value + JobLV * 0.2 + DEX * 0.1 + LUK * 0.1 + 50",
		"Normal Anvil   +0%",
		"Oridecon Anvil +3%",
		"Golden Anvil   +5%",
		"Emperium Anvil +10%",
		"LV 1 Weapon -0%",
		"LV 2 Weapon -20%",
		"LV 3 Weapon -30%",
		"Per Star Crumb -15%",
		"Elemental Stone -20% ^000000",
	].join("\n");

	SkillDescription[SKID.BS_AXE] = [
		"Smith Axe",
		"Max Level:^777777 3 ^000000",
		"Type:^000099 Passive ^000000",
		"Catalyst:^777777 Varies ^000000",
		"Effect:^777777 Allows character to forge Axes using a hammer. You can only forge Axes of a level equal to or less than the level in this skill. Skill value is (5*SkillLV)%. Anvil, JobLV, DEX and LUK (in this order) further increase this chance. To start forging, double-click the respective Hammer (on the ingredients list) in your inventory.",
		"^000000[LV 1]^777777",
		"Axe",
		"1 Iron Hammer",
		"10 Iron",
		"Battle Axe",
		"1 Iron Hammer",
		"110 Iron",
		"^000000[LV 2]^777777",
		"Hammer",
		"1 Golden Hammer",
		"30 Steel",
		"^000000[LV 3]^777777",
		"Buster",
		"1 Oridecon Hammer",
		"20 Steel",
		"4 Oridecon",
		"30 Orc's Fang",
		"Two-Handed Axe",
		"1 Oridecon Hammer",
		"10 Steel",
		"8 Oridecon",
		"1 Amethyst",
		"^6699ffForging formula:",
		"Base % chance: Skill Value + JobLV * 0.2 + DEX * 0.1 + LUK * 0.1 + 50",
		"Normal Anvil   +0%",
		"Oridecon Anvil +3%",
		"Golden Anvil   +5%",
		"Emperium Anvil +10%",
		"LV 1 Weapon -0%",
		"LV 2 Weapon -20%",
		"LV 3 Weapon -30%",
		"Per Star Crumb -15%",
		"Elemental Stone -20% ^000000",
	].join("\n");

	SkillDescription[SKID.BS_MACE] = [
		"Smith Mace",
		"Max Level:^777777 3 ^000000",
		"Type:^000099 Passive ^000000",
		"Catalyst:^777777 Varies ^000000",
		"Effect:^777777 Allows character to forge Maces using a hammer. You can only forge Maces of a level equal to or less than the level in this skill. Skill value is (5*SkillLV)%. Anvil, JobLV, DEX and LUK (in this order) further increase this chance.",
		"^000000[LV 1]^777777",
		"Club",
		"1 Iron Hammer",
		"3 Iron",
		"Mace",
		"1 Iron Hammer",
		"30 Iron",
		"^000000[LV 2]^777777",
		"Smasher",
		"1 Golden Hammer",
		"20 Steel",
		"Flail",
		"1 Golden Hammer",
		"33 Steel",
		"Chain",
		"1 Golden Hammer",
		"45 Steel",
		"^000000[LV 3]^777777",
		"Morning Star",
		"1 Oridecon Hammer",
		"85 Steel",
		"1 Carat Diamond",
		"Sword Mace",
		"1 Oridecon Hammer",
		"100 Steel",
		"20 Sharp Scales",
		"Stunner",
		"1 Oridecon Hammer",
		"120 Steel",
		"1 Heroic Emblem",
		"^6699ffForging formula:",
		"Base % chance: Skill Value + JobLV * 0.2 + DEX * 0.1 + LUK * 0.1 + 50",
		"Normal Anvil   +0%",
		"Oridecon Anvil +3%",
		"Golden Anvil   +5%",
		"Emperium Anvil +10%",
		"LV 1 Weapon -0%",
		"LV 2 Weapon -20%",
		"LV 3 Weapon -30%",
		"Per Star Crumb -15%",
		"Elemental Stone -20% ^000000",
	].join("\n");

	SkillDescription[SKID.BS_KNUCKLE] = [
		"Smith Brass Knuckle",
		"Max Level:^777777 3 ^000000",
		"Type:^000099 Passive ^000000",
		"Catalyst:^777777 Varies ^000000",
		"Effect:^777777 Allows character to forge Claws using a hammer. You can only forge Claws of a level equal to or less than the level in this skill. Skill value is (5*SkillLV)%. Anvil, JobLV, DEX and LUK (in this order) further increase this chance. To start forging, double-click the respective Hammer from the ingredients list in your inventory.",
		"^000000[LV 1]^777777",
		"Waghnak",
		"1 Iron Hammer",
		"160 Iron",
		"1 Pearl",
		"^000000[LV 2]^777777",
		"Knuckle Duster",
		"1 Golden Hammer",
		"50 Steel",
		"Studded Knuckles",
		"1 Golden Hammer",
		"65 Steel",
		"^000000[LV 3]^777777",
		"Fist",
		"1 Oridecon Hammer",
		"4 Oridecon",
		"10 Ruby",
		"Finger",
		"1 Oridecon Hammer",
		"4 Oridecon",
		"10 Opal",
		"Claw",
		"1 Oridecon Hammer",
		"8 Oridecon",
		"10 Topaz",
		"^6699ffForging formula:",
		"Base % chance: Skill Value + JobLV * 0.2 + DEX * 0.1 + LUK * 0.1 + 50",
		"Normal Anvil   +0%",
		"Oridecon Anvil +3%",
		"Golden Anvil   +5%",
		"Emperium Anvil +10%",
		"LV 1 Weapon -0%",
		"LV 2 Weapon -20%",
		"LV 3 Weapon -30%",
		"Per Star Crumb -15%",
		"Elemental Stone -20% ^000000",
	].join("\n");

	SkillDescription[SKID.BS_SPEAR] = [
		"Smith Spear",
		"Max Level:^777777 3 ^000000",
		"Type:^000099 Passive ^000000",
		"Catalyst:^777777 Varies ^000000",
		"Effect:^777777 Allows character to forge Spears using a hammer. You can only forge Spears of a level equal to or less than the level in this skill. Skill Value is (5*SkillLV)%. Anvil, JobLV, DEX and LUK (in this order) further increase this chance. ^000000",
		"^000000[LV 1]^777777",
		"Javelin",
		"1 Iron Hammer",
		"3 Iron",
		"Spear",
		"1 Iron Hammer",
		"35 Iron",
		"Pike",
		"1 Iron Hammer",
		"70 Iron",
		"^000000[LV 2]^777777",
		"Guisarme",
		"1 Golden Hammer",
		"25 Steel",
		"Glaive",
		"1 Golden Hammer",
		"40 Steel",
		"Partizan",
		"1 Golden Hammer",
		"55 Steel",
		"^000000[LV 3]^777777",
		"Trident",
		"1 Oridecon Hammer",
		"10 Steel",
		"8 Oridecon",
		"5 Aquamarine",
		"Halberd",
		"1 Oridecon Hammer",
		"10 Steel",
		"12 Oridecon",
		"Lance",
		"1 Oridecon Hammer",
		"12 Oridecon",
		"3 Ruby",
		"2 Evil Horn",
		"^6699ffForging formula:",
		"Base % chance: Skill Value + JobLV * 0.2 + DEX * 0.1 + LUK * 0.1 + 50",
		"Normal Anvil   +0%",
		"Oridecon Anvil +3%",
		"Golden Anvil   +5%",
		"Emperium Anvil +10%",
		"LV 1 Weapon -0%",
		"LV 2 Weapon -20%",
		"LV 3 Weapon -30%",
		"Per Star Crumb -15%",
		"Elemental Stone -20% ^000000",
	].join("\n");

	SkillDescription[SKID.BS_HILTBINDING] = [
		"Hilt Binding",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Gives a +1 bonus to STR and +4 ATK. Increases Adrenaline Rush, Over Thrust and Weapon Perfection duration by 10%. DOES NO LONGER prevent you from dropping the equipped weapon upon death. The chance of items dropping on death is only implemented in Nightmare mode PvP currently. ^000000",
	].join("\n");

	SkillDescription[SKID.BS_FINDINGORE] = [
		"Finding Ore",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Adds a pretty low chance of monsters dropping any Ore or Refining Item. ^000000",
	].join("\n");

	SkillDescription[SKID.BS_WEAPONRESEARCH] = [
		"Weaponry Research",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases character's HIT by +2 per SkillLV, ATK by +2 per SkillLV and weapon forging success rate by +1% per SkillLV. The damage applies even on a missed attack and is affected by elemental properties and card modifiers.",
		"Contrary to some rumor, this skill DOES NOT improve upgrading chances at an Upgrade NPC. ^000000",
		"[LV 1]^777777 + 2 ATK/HIT, +1% Forging ^000000",
		"[LV 2]^777777 + 4 ATK/HIT, +2% Forging ^000000",
		"[LV 3]^777777 + 6 ATK/HIT, +3% Forging ^000000",
		"[LV 4]^777777 + 8 ATK/HIT, +4% Forging ^000000",
		"[LV 5]^777777 + 10 ATK/HIT, +5% Forging ^000000",
		"[LV 6]^777777 + 12 ATK/HIT, +6% Forging ^000000",
		"[LV 7]^777777 + 14 ATK/HIT, +7% Forging ^000000",
		"[LV 8]^777777 + 16 ATK/HIT, +8% Forging ^000000",
		"[LV 9]^777777 + 18 ATK/HIT, +9% Forging ^000000",
		"[LV 10]^777777 + 20 ATK/HIT, +10% Forging ^000000",
	].join("\n");

	SkillDescription[SKID.BS_REPAIRWEAPON] = [
		"Repair Weapon",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Active ^000000",
		"SP Cost:^777777 5 ^000000",
		"Target:^777777 1 Ally/ 1 Enemy w. Shift-Click ^000000",
		"Cast Time:^777777 7.5 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^777777 See below ^000000",
		"Effect:^777777 Enables character to repair broken weapons or armors. No anvils or hammers are required.",
		"Expendable extra requirements:",
		"LV 1 weapon: Iron Ore",
		"LV 2 weapon: Iron",
		"LV 3 weapon: Steel",
		"LV 4 weapon: Rough Oridecon",
		"Armors: Steel ^000000",
	].join("\n");

	SkillDescription[SKID.BS_SKINTEMPER] = [
		"Skin Tempering",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases character's resistance to Fire element by (4*SkillLV)% and reduces non-elemental damage by (1*SkillLV)%. ^000000",
		"[LV 1]^777777 DEF +1% FireDEF +4% ^000000",
		"[LV 2]^777777 DEF +2% FireDEF +8% ^000000",
		"[LV 3]^777777 DEF +3% FireDEF +12% ^000000",
		"[LV 4]^777777 DEF +4% FireDEF +16% ^000000",
		"[LV 5]^777777 DEF +5% FireDEF +20% ^000000",
	].join("\n");

	SkillDescription[SKID.BS_HAMMERFALL] = [
		"Hammer Fall",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"Range:^777777 Melee ^000000",
		"SP Cost:^777777 10 ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Attempts to stun targets in 5x5 area surrounding the targeted cell. Stun duration is 5 seconds (reduced by VIT). Base success chance is (20+10*SkillLV)%. Can only be used with maces and axes. Does not work against Boss monsters. ^000000",
		"[LV 1]^777777 30% Stun Chance ^000000",
		"[LV 2]^777777 40% Stun Chance ^000000",
		"[LV 3]^777777 50% Stun Chance ^000000",
		"[LV 4]^777777 60% Stun Chance ^000000",
		"[LV 5]^777777 70% Stun Chance ^000000",
	].join("\n");

	SkillDescription[SKID.BS_ADRENALINE] = [
		"Adrenaline Rush",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 17 + 3*SkillLV ^000000",
		"Target:^777777 Party ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 30*SkillLV sec ^000000",
		"Effect:^777777 Decreases character's attack delay with maces and axes by 30%. Decreases nearby characters in party's attack delay with mace and axes by 20%. This skill cannot stack, but overwrites the effect and duration from other Smiths if it is worse. Changing from a mace/axe to any other weapon (including bare fists) cancels the effect. ^000000",
		"[LV 1]^777777 30 Seconds Effect ^000000",
		"[LV 2]^777777 60 Seconds Effect ^000000",
		"[LV 3]^777777 90 Seconds Effect ^000000",
		"[LV 4]^777777 120 Seconds Effect ^000000",
		"[LV 5]^777777 150 Seconds Effect ^000000",
	].join("\n");

	SkillDescription[SKID.BS_WEAPONPERFECT] = [
		"Weapon Perfection",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 - 2*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 10*SkillLV sec ^000000",
		"Effect:^777777 Changes all weapon size modifiers for the character and all Party members in range to 100% for the skill's duration. ^000000",
		"[LV 1]^777777 10 Sec Effect ^000000",
		"[LV 2]^777777 20 Sec Effect ^000000",
		"[LV 3]^777777 30 Sec Effect ^000000",
		"[LV 4]^777777 40 Sec Effect ^000000",
		"[LV 5]^777777 50 Sec Effect ^000000",
	].join("\n");

	SkillDescription[SKID.BS_OVERTHRUST] = [
		"Over Thrust",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 - 2*SkillLV ^000000",
		"Target:^777777 Party ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 20*SkillLV sec ^000000",
		"Effect:^777777 Increases ATK by (5*SkillLV)% for all nearby characters in the party. There is a 0.1% chance of breaking the equipped weapon with each swing. ^000000",
		"[LV 1]^777777 ATK +5%, Break Chance +0.1% ^000000",
		"[LV 2]^777777 ATK +10%, Break Chance +0.1% ^000000",
		"[LV 3]^777777 ATK +15%, Break Chance +0.1% ^000000",
		"[LV 4]^777777 ATK +20%, Break Chance +0.1% ^000000",
		"[LV 5]^777777 ATK +25%, Break Chance +0.1% ^000000",
	].join("\n");

	SkillDescription[SKID.BS_MAXIMIZE] = [
		"Maximize Power",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 + (1 per SkillLV sec) ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Until deactivated or SP runs out. ^000000",
		"Effect:^777777 The character does maximum damage on all attacks THAT HIT, as if having unlimited DEX. ^000000",
		"[LV 1]^777777 Drains 1 SP every 1 Second ^000000",
		"[LV 2]^777777 Drains 1 SP every 2 Seconds ^000000",
		"[LV 3]^777777 Drains 1 SP every 3 Seconds ^000000",
		"[LV 4]^777777 Drains 1 SP every 4 Seconds ^000000",
		"[LV 5]^777777 Drains 1 SP every 5 Seconds ^000000",
	].join("\n");

	SkillDescription[SKID.HT_SKIDTRAP] = [
		"Skid Trap",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active, Trap ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 cell, at least 1 cell away from any monster or player and 3 cells away from another trap ^000000",
		"Range:^777777 3 cells ^000000",
		"Cast Time:^777777 0.4 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 360 - 60*SkillLV sec ^000000",
		"Catalyst:^777777 1 Trap ^000000",
		"Effect:^777777 A Skid Trap is a trap that activates when someone comes within SkillLV cells of it. When activated, the affected target is pushed back 5+SkillLV cells (10 cells if the skill is at level 5).",
		"Skid Traps are invisible, but any player who can see the Hunter laying the trap will be able to see the trap until they move out of sight of it. Use of any Hide revealing skill will reveal the trap. This trap will affect Players in PVP zones, including the user.",
		"Does not work on Boss and Plant monsters. If not tripped by the end of the duration, the Skid Trap will turn back into a Trap item on the floor and can be reclaimed. ^000000",
		"[LV 1]^777777 Sliding Range 6 cells, Setting Time 300 secs ^000000",
		"[LV 2]^777777 Sliding Range 7 cells, Setting Time 240 secs ^000000",
		"[LV 3]^777777 Sliding Range 8 cells, Setting Time 180 secs ^000000",
		"[LV 4]^777777 Sliding Range 9 cells, Setting Time 120 secs ^000000",
		"[LV 5]^777777 Sliding Range 10 cells, Setting Time 60 secs ^000000",
	].join("\n");

	SkillDescription[SKID.HT_LANDMINE] = [
		"Land Mine",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active, Trap ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 cell, at least 1 cell away from any monster or player and 3 cells away from another trap ^000000",
		"Range:^777777 3 cells ^000000",
		"ATK Type:^777777 Earth ^000000",
		"Cast Time:^777777 0.4 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 240 - 40*SkillLV sec ^000000",
		"Catalyst:^777777 1 Trap ^000000",
		"Effect:^777777 A Land Mine is a visible trap that explodes when stepped on, hitting the monster or player (in PvP only) that triggered it for [(DEX+75)*(1+INT/100)*SkillLV] damage.",
		"This skill ignores DEF and MDEF and damage modification cards for size and family, but not elemental property. There is also a (5*SkillLV+30)% chance to stun targets for 5 seconds. This trap will affect Players in PVP zones, including the user.",
		"If not tripped by the end of the duration, the Land Mine will turn back into a Trap item on the floor and can be reclaimed. ^000000",
		"[LV 1]^777777 ATK 50%, Setting Time 200secs ^000000",
		"[LV 2]^777777 ATK 75%, Setting Time 160secs ^000000",
		"[LV 3]^777777 ATK 100%, Setting Time 120secs ^000000",
		"[LV 4]^777777 ATK 125%, Setting Time 80secs ^000000",
		"[LV 5]^777777 ATK 150%, Setting Time 40secs ^000000",
	].join("\n");

	SkillDescription[SKID.HT_ANKLESNARE] = [
		"Ankle Snare",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active, Trap ^000000",
		"SP Cost:^777777 12 ^000000",
		"Target:^777777 1 cell, at least 1 cell away from any monster or player and 3 cells away from another trap ^000000",
		"Range:^777777 3 cells ^000000",
		"Cast Time:^777777 0.4 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 7 sec ^000000",
		"Catalyst:^777777 1 Trap ^000000",
		"Effect:^777777 Creates an Ankle Snare in the targeted cell. Any monster that steps within 1 cell of the trap will become snared for 5*SkillLV/(Target AGI*0.1) seconds (minimum of 3 seconds). In PvP zones, players may be snared too (including the creator of the trap!).",
		"Boss monsters are snared for 1/5th of the normal time and will teleport almost certainly when snared. A snared target cannot sit, stand or move away from the cell on which they are snared, but can use skills and items and make attacks on anyone within range.",
		"The skill Remove Trap can be used to cancel an Ankle Snare that has already caught a player. Ankle Snare traps are invisible in PvP, but any player who can see the Hunter laying the trap will be able to see the trap until they move out of sight of it.",
		"The use of any invisibility detection skill will reveal the trap. If not tripped by the end of the duration, the Ankle Snare will turn back into a Trap item on the floor and can be reclaimed. ^000000",
		"[LV 1]^777777 Setting Time 250secs ^000000",
		"[LV 2]^777777 Setting Time 200secs ^000000",
		"[LV 3]^777777 Setting Time 150secs ^000000",
		"[LV 4]^777777 Setting Time 100secs ^000000",
		"[LV 5]^777777 Setting Time 50secs ^000000",
	].join("\n");

	SkillDescription[SKID.HT_SHOCKWAVE] = [
		"Shockwave Trap",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active, Trap ^000000",
		"SP Cost:^777777 45 ^000000",
		"Target:^777777 1 cell, at least 1 cell away from any monster or player and 3 cells away from another trap ^000000",
		"Range:^777777 3 cells ^000000",
		"Cast Time:^777777 0.4 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 240 - 40*SkillLV sec ^000000",
		"Catalyst:^777777 2 Traps ^000000",
		"Effect:^777777 A Shockwave Trap is a trap that activates when stepped on. Whoever trips the trap will lose (5+15*SkillLV)% of their SP.",
		"Shockwave Traps are invisible, but any player who can see the Hunter laying the trap will be able to see the trap until they move out of sight of it. Use of any Hide revealing skill will reveal the trap. This trap will affect Players in PVP zones, including the user.",
		"If not tripped by the end of the duration, the Shockwave Trap will turn back into a Trap item on the floor and can be reclaimed. ^000000",
		"[LV 1]^777777 SP 20% Consume, Setting Time 200secs ^000000",
		"[LV 2]^777777 SP 35% Consume, Setting Time 160secs ^000000",
		"[LV 3]^777777 SP 50% Consume, Setting Time 120secs ^000000",
		"[LV 4]^777777 SP 65% Consume, Setting Time 80secs ^000000",
		"[LV 5]^777777 SP 80% Consume, Setting Time 40secs ^000000",
	].join("\n");

	SkillDescription[SKID.HT_SANDMAN] = [
		"Sandman",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active, Trap ^000000",
		"SP Cost:^777777 12 ^000000",
		"Target:^777777 1 cell, at least 1 cell away from any monster or player and 3 cells away from another trap ^000000",
		"Range:^777777 3 cells ^000000",
		"Cast Time:^777777 0.4 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 18 sec ^000000",
		"Catalyst:^777777 1 Trap ^000000",
		"Effect:^777777 A Sandman is a trap that activates when stepped on. All targets in a 3x3 area around the trap will have an (40+10*SkillLV)% chance of being affected by \"Sleep\" (duration depends on SkillLV).",
		"A Sandman is invisible, but any player who can see the Hunter laying the trap will be able to see the trap until they move out of sight of it. Use of any invisibility revealing skill will reveal the trap. This trap will affect Players in PVP zones, including the user.",
		"If not tripped by the end of the duration, the Sandman will turn back into a Trap item on the floor and can be reclaimed. ^000000",
		"[LV 1]^777777 Setting Time 150sec 50% Sleep Chance ^000000",
		"[LV 2]^777777 Setting Time 120sec 60% Sleep Chance ^000000",
		"[LV 3]^777777 Setting Time 90sec 70% Sleep Chance ^000000",
		"[LV 4]^777777 Setting Time 60sec 80% Sleep Chance ^000000",
		"[LV 5]^777777 Setting Time 30sec 90% Sleep Chance ^000000",
	].join("\n");

	SkillDescription[SKID.HT_FLASHER] = [
		"Flasher",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active, Trap ^000000",
		"SP Cost:^777777 12 ^000000",
		"Target:^777777 1 cell, at least 1 cell away from any monster or player and 3 cells away from another trap ^000000",
		"Range:^777777 3 cells ^000000",
		"Cast Time:^777777 0.4 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 18 sec ^000000",
		"Catalyst:^777777 2 Traps ^000000",
		"Effect:^777777 A Flasher is a trap that activates when stepped on. When activated it will have an unknown chance to blind all within a 3x3 area around the trap.",
		"Flashers are invisible, but any player who can see the Hunter laying the trap will be able to see the trap until they move out of sight of it. Use of any invisibility revealing skill will reveal the trap. This trap will affect Players in PVP zones, including the user.",
		"This trap is ineffective against Plant family and MVP monsters.",
		"If not tripped by the end of the duration, the Flasher will turn back into a Trap item on the floor and can be reclaimed. ^000000",
		"[LV 1]^777777 Setting Time150secs ^000000",
		"[LV 2]^777777 Setting Time120secs ^000000",
		"[LV 3]^777777 Setting Time90secs ^000000",
		"[LV 4]^777777 Setting Time60secs ^000000",
		"[LV 5]^777777 Setting Time30secs ^000000",
	].join("\n");

	SkillDescription[SKID.HT_FREEZINGTRAP] = [
		"Freezing Trap",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active, Trap ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 cell, at least 1 cell away from any monster or player and 3 cells away from another trap ^000000",
		"Range:^777777 3 cells ^000000",
		"ATK Type:^777777 Water ^000000",
		"Cast Time:^777777 0.4 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 18 sec ^000000",
		"Catalyst:^777777 2 Traps ^000000",
		"Effect:^777777 A Freezing Trap is a trap that activates when stepped on. When activated, it will hit all in the area with a Frost Nova style attack. Damage is (25+25*SkillLV)% of your normal ATK.",
		"Chance to Freeze is Unknown and does not work against Boss monsters. Freezing Traps are invisible, but any player who can see the Hunter laying the trap will be able to see the trap until they move out of sight of it. Use of any invisibility revealing skill will reveal the trap. This trap will affect Players in PVP zones, including the user.",
		"If not tripped by the end of the duration, the Freezing Trap will turn back into a Trap item on the floor and can be reclaimed. ^000000",
		"[LV 1]^777777 Setting Time 150secs ^000000",
		"[LV 2]^777777 Setting Time 120secs ^000000",
		"[LV 3]^777777 Setting Time 90secs ^000000",
		"[LV 4]^777777 Setting Time 60secs ^000000",
		"[LV 5]^777777 Setting Time 30secs ^000000",
	].join("\n");

	SkillDescription[SKID.HT_BLASTMINE] = [
		"Blast Mine",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active, Trap ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 cell, at least 1 cell away from any monster or player and 3 cells away from another trap ^000000",
		"Range:^777777 3 cells ^000000",
		"ATK Type:^777777 Wind ^000000",
		"Cast Time:^777777 0.4 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 30-5*SkillLV ^000000",
		"Catalyst:^777777 1 Trap ^000000",
		"Effect:^777777 A Blast mine is a visible trap that explodes 30 - 5*SkillLV seconds after it is set or when an enemy steps on it, hits a 3x3 area around the target cell for [(50+DEX/2)*(1+INT/100)*SkillLV] damage.",
		"This skill ignores DEF and MDEF and damage modification cards for size and family, but not elemental property. This trap will affect Players in PVP zones, including the user. The caster can move the trap before it's activated. ^000000",
		"[LV 1]^777777 Explode after 25secs ^000000",
		"[LV 2]^777777 Explode after 20secs ^000000",
		"[LV 3]^777777 Explode after 15secs ^000000",
		"[LV 4]^777777 Explode after 10secs ^000000",
		"[LV 5]^777777 Explode after 5secs ^000000",
	].join("\n");

	SkillDescription[SKID.HT_CLAYMORETRAP] = [
		"Claymore Trap",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active, Trap ^000000",
		"SP Cost:^777777 15 ^000000",
		"Target:^777777 1 cell, at least 1 cell away from any monster or player and 3 cells away from another trap ^000000",
		"Range:^777777 3 cells ^000000",
		"ATK Type:^777777 Fire ^000000",
		"Cast Time:^777777 0.4 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 20*SkillLV sec ^000000",
		"Catalyst:^777777 2 Traps ^000000",
		"Effect:^777777 A Claymore Trap is a visible trap that explodes when stepped on, hitting a 5x5 area around the target cell for [(75+DEX/2)*(1+INT/100)*SkillLV] damage.",
		"This skill ignores DEF and MDEF and damage modification cards for size and family, but not elemental property. This trap will affect Players in PVP zones, including the user.",
		"If not tripped by the end of the duration, the Claymore Trap will turn back into a Trap item on the floor and can be reclaimed. ^000000",
		"[LV 1]^777777 Setting Time20secs ^000000",
		"[LV 2]^777777 Setting Time40secs ^000000",
		"[LV 3]^777777 Setting Time60secs ^000000",
		"[LV 4]^777777 Setting Time80secs ^000000",
		"[LV 5]^777777 Setting Time100secs ^000000",
	].join("\n");

	SkillDescription[SKID.HT_REMOVETRAP] = [
		"Remove Trap",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 5 ^000000",
		"Target:^777777 1 Trap ^000000",
		"Range:^777777 2 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Turns one set trap back into a Trap item. You only get one trap even if you needed two for setting it. Can be used with an Ankle Snare that has already caught a target, but in this case you will not get a Trap item. Only works with your own traps. ^000000",
	].join("\n");

	SkillDescription[SKID.HT_TALKIEBOX] = [
		"Talkie Box",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active, Trap ^000000",
		"SP Cost:^777777 1 ^000000",
		"Target:^777777 1 cell, at least 1 cell away from any monster or player and 3 cells away from another trap ^000000",
		"Range:^777777 3 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 600 sec ^000000",
		"Catalyst:^777777 1 Trap ^000000",
		"Effect:^777777 Repeats a message input at casting time in blue text (does not appear in chat window). ^000000",
	].join("\n");

	SkillDescription[SKID.HT_BEASTBANE] = [
		"Beast Bane",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases damage to Brute and Insect family monsters by +4*SkillLV. This damage ignores modification from Armor and VIT defense, but not from Elemental and Card modifiers and applies to all hits for multi hit attacks. ^000000",
		"[LV 1]^777777 ATK +4 ^000000",
		"[LV 2]^777777 ATK +8 ^000000",
		"[LV 3]^777777 ATK +12 ^000000",
		"[LV 4]^777777 ATK +16 ^000000",
		"[LV 5]^777777 ATK +20 ^000000",
		"[LV 6]^777777 ATK +24 ^000000",
		"[LV 7]^777777 ATK +28 ^000000",
		"[LV 8]^777777 ATK +32 ^000000",
		"[LV 9]^777777 ATK +36 ^000000",
		"[LV 10]^777777 ATK +40 ^000000",
	].join("\n");

	SkillDescription[SKID.HT_FALCON] = [
		"Falconry Mastery",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Allows you to hire a Falcon from the Falcon Master in the Hunter Guild in Hugel.",
		"Cost to hire is around 800z to normal Falcons, but may change for Scarf Falcons and Baby Falcons. If a Falcon is released, a new one must be hired. ^000000",
	].join("\n");

	SkillDescription[SKID.HT_STEELCROW] = [
		"Steel Crow",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Adds 6*SkillLV damage to each hit with Blitz Beat. Note that Blitz Beat can do up to 5 hits. ^000000",
		"[LV 1]^777777 ATK +6 ^000000",
		"[LV 2]^777777 ATK +12 ^000000",
		"[LV 3]^777777 ATK +18 ^000000",
		"[LV 4]^777777 ATK +24 ^000000",
		"[LV 5]^777777 ATK +30 ^000000",
		"[LV 6]^777777 ATK +36 ^000000",
		"[LV 7]^777777 ATK +42 ^000000",
		"[LV 8]^777777 ATK +48 ^000000",
		"[LV 9]^777777 ATK +54 ^000000",
		"[LV 10]^777777 ATK +60 ^000000",
	].join("\n");

	SkillDescription[SKID.HT_BLITZBEAT] = [
		"Blitz Beat",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 7 + 3*SkillLV ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 5 + Vulture's Eye SkillLV cells ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 0.2*SkillLV sec ^000000",
		"Effect:^777777 Orders your Falcon to attack, delivering SkillLV hits to all enemies in a 3x3 area around the target for a total of ([DEX/10] + [INT/2] + 3*Steel Crow SkillLV + 40)*2) using Neutral Element. This skill ignores Def and MDEF and damage modification cards for size and family, but not elemental property.",
		"In addition, there is a 0.3%*LUK chance of Blitz Beat occurring automatically per shot with a bow. This so called auto-blitz beat is less effective than a manual one and the full damage is split evenly between all targets affected.",
		"For example, an auto-blitz beat that hits 3 targets will do 1/3 of the normal damage to each. Also, the total number of hits it delivers is based on the users job level and is equal to [(Job Level-1)/10]+1. ^000000",
		"[LV 1]^777777 1 Falcon Hit ^000000",
		"[LV 2]^777777 2 Falcon Hit ^000000",
		"[LV 3]^777777 3 Falcon Hit ^000000",
		"[LV 4]^777777 4 Falcon Hit ^000000",
		"[LV 5]^777777 5 Falcon Hit ^000000",
	].join("\n");

	SkillDescription[SKID.HT_DETECTING] = [
		"Detecting",
		"Max Level:^777777 4 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 8 ^000000",
		"Target:^777777 1 cell ^000000",
		"Range:^777777 1 + 2*SkillLV cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Reveals any invisible traps, monsters or players in a 3x3 cell area around the target cell. ^000000",
		"[LV 1]^777777 3 cell Range ^000000",
		"[LV 2]^777777 5 cell Range ^000000",
		"[LV 3]^777777 7 cell Range ^000000",
		"[LV 4]^777777 9 cell Range ^000000",
	].join("\n");

	SkillDescription[SKID.HT_SPRINGTRAP] = [
		"Spring Trap",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 Trap ^000000",
		"Range:^777777 3 + SkillLV cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 A trap visible to the user and within range is destroyed. No trap item is recovered. This skill can work on enemy traps (unlike Remove Trap). ^000000",
		"[LV 1]^777777 4 cell Range ^000000",
		"[LV 2]^777777 5 cell Range ^000000",
		"[LV 3]^777777 6 cell Range ^000000",
		"[LV 4]^777777 7 cell Range ^000000",
		"[LV 5]^777777 8 cell Range ^000000",
	].join("\n");

	SkillDescription[SKID.AS_RIGHT] = [
		"Right-Hand Mastery",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Damage on the right-hand weapon while equipping two weapons is (50+10*SkillLV)%. DOES NOT WORK FOR KATARS AS THESE COUNT AS 2-HANDED WEAPONS. ^000000",
		"[LV 1]^777777 ATK 60% ^000000",
		"[LV 2]^777777 ATK 70% ^000000",
		"[LV 3]^777777 ATK 80% ^000000",
		"[LV 4]^777777 ATK 90% ^000000",
		"[LV 5]^777777 ATK 100% ^000000",
	].join("\n");

	SkillDescription[SKID.AS_LEFT] = [
		"Left-Hand Mastery",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Damage on the left-hand weapon while equipping two weapons is (30+10*SkillLV)%. DOES NOT WORK FOR KATARS AS THESE COUNT AS 2-HANDED WEAPONS. ^000000",
		"[LV 1]^777777 ATK 40% ^000000",
		"[LV 2]^777777 ATK 50% ^000000",
		"[LV 3]^777777 ATK 60% ^000000",
		"[LV 4]^777777 ATK 70% ^000000",
		"[LV 5]^777777 ATK 80% ^000000",
	].join("\n");

	SkillDescription[SKID.AS_KATAR] = [
		"Katar Mastery",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases damage with Katar class weapons by 3*SkillLV. This damage ignores modification from Armor and VIT defense, but not from Elemental and Card modifiers and applies to all hits for multi hit attacks. ^000000",
		"[LV 1]^777777 ATK +3 ^000000",
		"[LV 2]^777777 ATK +6 ^000000",
		"[LV 3]^777777 ATK +9 ^000000",
		"[LV 4]^777777 ATK +12 ^000000",
		"[LV 5]^777777 ATK +15 ^000000",
		"[LV 6]^777777 ATK +18 ^000000",
		"[LV 7]^777777 ATK +21 ^000000",
		"[LV 8]^777777 ATK +24 ^000000",
		"[LV 9]^777777 ATK +27 ^000000",
		"[LV 10]^777777 ATK +30 ^000000",
	].join("\n");

	SkillDescription[SKID.AS_CLOAKING] = [
		"Cloaking",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 15 ^000000",
		"Upkeep Cost:^777777 1 per (SkillLV + 3) sec ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Until cancelled or SP runs out ^000000",
		"Effect:^777777 Gives character the Cloaked effect, it makes the user invisible to players and monsters but you don't lose the ability to move. Cloaked characters do not regenerate HP or SP, they can attack but this uncloaks them.",
		"Attacking while being cloaked doubles the critical rate for that hit. Insects, Demons and Boss monsters see through this invisibility.",
		"The Cloaked effect may be cancelled at any time by using the skill again (no SP Cost), by getting hit, reaching SP 0 or by coming into the area of effect of Attention Concentrate, Ruwach or Sight.",
		"Lower Skill Levels don't let you attack or use skills and require a wall next to you to allow movement. The movement speed increase does not stack with the one from Improve Dodge.",
		"Movement speed:",
		"with wall / without wall ^000000",
		"[LV 1]^777777 100% / can't move ^000000",
		"[LV 2]^777777 103% / can't move ^000000",
		"[LV 3]^777777 106% / 79% ^000000",
		"[LV 4]^777777 109% / 82% ^000000",
		"[LV 5]^777777 112% / 85% ^000000",
		"[LV 6]^777777 115% / 88% ^000000",
		"[LV 7]^777777 118% / 91% ^000000",
		"[LV 8]^777777 121% / 94% ^000000",
		"[LV 9]^777777 124% / 97% ^000000",
		"[LV 10]^777777 125% / 100% ^000000",
	].join("\n");

	SkillDescription[SKID.AS_SONICBLOW] = [
		"Sonic Blow",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 14 + 2*SkillLV ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 Melee ^000000",
		"ATK Type:^777777 Weapon property, Melee, Physical attack ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 A series of 8 fast hits for a total modified ATK of (400+40*SkillLV)% with a (10+2*SkillLV)% chance to stun the target. The damage is applied instantly, even though the animation takes some time. The skill can miss and can only be used with Katars. ^000000",
		"[LV 1]^777777 440% ATK 12% Stun ^000000",
		"[LV 2]^777777 480% ATK 14% Stun ^000000",
		"[LV 3]^777777 520% ATK 16% Stun ^000000",
		"[LV 4]^777777 560% ATK 18% Stun ^000000",
		"[LV 5]^777777 600% ATK 20% Stun ^000000",
		"[LV 6]^777777 640% ATK 22% Stun ^000000",
		"[LV 7]^777777 680% ATK 24% Stun ^000000",
		"[LV 8]^777777 720% ATK 26% Stun ^000000",
		"[LV 9]^777777 760% ATK 28% Stun ^000000",
		"[LV 10]^777777 800% ATK 30% Stun ^000000",
	].join("\n");

	SkillDescription[SKID.AS_GRIMTOOTH] = [
		"Grimtooth",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 3 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 1 + SkillLV ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 A ranged attack that hits a 3x3 area around the target for (100+20*SkillLV)% ATK. Skill only be used while Hiding (Cloaked isn't good enough). Can only be used with Katar class weapons. ^000000",
		"[LV 1]^777777 2 cells, 120% ATK ^000000",
		"[LV 2]^777777 3 cells, 140% ATK ^000000",
		"[LV 3]^777777 4 cells, 160% ATK ^000000",
		"[LV 4]^777777 5 cells, 180% ATK ^000000",
		"[LV 5]^777777 6 cells, 200% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.AS_ENCHANTPOISON] = [
		"Enchant Poison",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 ^000000",
		"Target:^777777 1 Ally ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 15 + 15*SkillLV ^000000",
		"Effect:^777777 Gives equipped weapons the Poison property. Changing or removing either weapon cancels the effect for every weapon affected. Every hit while the Enchant Poison effect is running has a (2.5+0.5*SkillLV)% chance of causing the Poison effect to the target. ^000000",
		"[LV 1]^777777 30 Sec 3% Chance ^000000",
		"[LV 2]^777777 45 Sec 3.5% Chance ^000000",
		"[LV 3]^777777 60 Sec 4% Chance ^000000",
		"[LV 4]^777777 75 Sec 4.5% Chance ^000000",
		"[LV 5]^777777 90 Sec 5% Chance ^000000",
		"[LV 6]^777777 105 Sec 5.5% Chance ^000000",
		"[LV 7]^777777 120 Sec 6% Chance ^000000",
		"[LV 8]^777777 135 Sec 6.5% Chance ^000000",
		"[LV 9]^777777 150 Sec 7% Chance ^000000",
		"[LV 10]^777777 165 Sec 7.5% Chance ^000000",
	].join("\n");

	SkillDescription[SKID.AS_POISONREACT] = [
		"Poison React",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 15 + 5*SkillLV (but 45 for LV 10) ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 15 + 5*SkillLV sec (but 60 sec for LV 10), OR (SkillLV/2 rounded up) neutral countered attacks for LV 1~9 (but 6 counters for LV 10), OR after countering a poison-property monster attack/poison property attack, whatever comes first ^000000",
		"Effect:^777777 Attempts to counter 1~6 attacks that damage you (using level 5 Envenom) OR 1 attack from a poison property monster (using boosted damage) while the skill is active. The success rate is 100% for Boosted Counter and 50% for Envenom Counter.",
		"Adding levels in this skill gives a damage increase on boosted counter of +(30*SkillLV)% and increase the number of Envenom Counters. ^000000",
		"[LV 1]^777777 1 Envenom Counter, +30% bonus damage on boosted counter, 20 Sec ^000000",
		"[LV 2]^777777 1 Envenom Counter, +60% bonus damage on boosted counter, 25 Sec ^000000",
		"[LV 3]^777777 2 Envenom Counters, +90% bonus damage on boosted counter, 30 Sec ^000000",
		"[LV 4]^777777 2 Envenom Counters, +120% bonus damage on boosted counter, 35 Sec ^000000",
		"[LV 5]^777777 3 Envenom Counters, +150% bonus damage on boosted counter, 40 Sec ^000000",
		"[LV 6]^777777 3 Envenom Counters, +180% bonus damage on boosted counter, 45 Sec ^000000",
		"[LV 7]^777777 4 Envenom Counters, +210% bonus damage on boosted counter, 50 Sec ^000000",
		"[LV 8]^777777 4 Envenom Counters, +240% bonus damage on boosted counter, 55 Sec ^000000",
		"[LV 9]^777777 5 Envenom Counters, +270% bonus damage on boosted counter, 60 Sec ^000000",
		"[LV 10]^777777 6 Envenom Counters, +300% bonus damage on boosted counter, 60 Sec ^000000",
	].join("\n");

	SkillDescription[SKID.AS_VENOMDUST] = [
		"Venom Dust",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 ^000000",
		"Target:^777777 1 cell ^000000",
		"Range:^777777 2 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 5*SkillLV sec ^000000",
		"Catalyst:^ee0000 1 Red Gemstone ^000000",
		"Effect:^777777 Creates a poison cloud covering cells vertically and horizontally adjacent to target cell. Anything except a Boss monster that stands on the cloud will be Poisened. ^000000",
		"[LV 1]^777777 5 Sec ^000000",
		"[LV 2]^777777 10 Sec ^000000",
		"[LV 3]^777777 15 Sec ^000000",
		"[LV 4]^777777 20 Sec ^000000",
		"[LV 5]^777777 25 Sec ^000000",
		"[LV 6]^777777 30 Sec ^000000",
		"[LV 7]^777777 35 Sec ^000000",
		"[LV 8]^777777 40 Sec ^000000",
		"[LV 9]^777777 45 Sec ^000000",
		"[LV 10]^777777 50 Sec ^000000",
	].join("\n");

	SkillDescription[SKID.AS_SPLASHER] = [
		"Venom Splasher",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 + 2*SkillLV ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 See below ^000000",
		"Catalyst:^ee0000 1 Red Gemstone ^000000",
		"Effect:^777777 Turns target into a poison bomb. Target must and have less than 3/4 HP in order to be effected. When the skill is used, a timer appears above the target.",
		"If the skill is successful, and the timer reaches 0 the target explodes and takes a poison property hit at an ATK of (500+50*SkillLV)%, the Poison React skill passively adds (30*SkillLV)% to this.",
		"The surrounding 5x5 area takes splash damage which is the original damage divided by the number of mobs including the exploding mob. Finally, weapon elements and weapon cards do not improve the damage.",
		"The skill uses weapon element. If you successfully setup a bomb there's a 7.5 + 0.5*SkillLV second delay in which you cannot setup another bomb. ^000000",
		"[LV 1]^777777 550% ATK + Bonus, timer starts at 5 ^000000",
		"[LV 2]^777777 600% ATK + Bonus, timer starts at 5.5 ^000000",
		"[LV 3]^777777 650% ATK + Bonus, timer starts at 6 ^000000",
		"[LV 4]^777777 700% ATK + Bonus, timer starts at 6.5 ^000000",
		"[LV 5]^777777 750% ATK + Bonus, timer starts at 7 ^000000",
		"[LV 6]^777777 800% ATK + Bonus, timer starts at 7.5 ^000000",
		"[LV 7]^777777 850% ATK + Bonus, timer starts at 8 ^000000",
		"[LV 8]^777777 900% ATK + Bonus, timer starts at 8.5 ^000000",
		"[LV 9]^777777 950% ATK + Bonus, timer starts at 9 ^000000",
		"[LV 10]^777777 1000% ATK + Bonus, timer starts at 9.5 ^000000",
	].join("\n");

	SkillDescription[SKID.NV_FIRSTAID] = [
		"First Aid",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 3 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 0.1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Heal yourself for 5 HP. Not a crazy powerful skill, but mages seem to like it for saving money on healing items. ^000000",
	].join("\n");

	SkillDescription[SKID.NV_TRICKDEAD] = [
		"Trick Dead",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 5 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Effect:^777777 You lay on the ground like you were dead and aggressive monsters won't target you. You can't recover HP or SP while pretending to be dead. You can Trick Dead as long as you want. Casting Trick Dead a second time cancels it, letting you move again. Once you choose another Job, you lose the ability to use this skill. ^000000",
	].join("\n");

	SkillDescription[SKID.SM_MOVINGRECOVERY] = [
		"Moving HP Recovery",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Character regenerates HP while walking. Rate is 50% of standing recovery, and not affected by Increase Recuperative Power skill. ^000000",
	].join("\n");

	SkillDescription[SKID.SM_FATALBLOW] = [
		"Fatal Blow",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Adds chance of causing stun on target when using Bash level 6 or above. Base Stun Chance is 5%*(Bash SkillLV - 5) with a further modifier from character BaseLV and a minimum chance of 0%. ^000000",
		"[Bash LV 6]^777777 5% Stun Chance ^000000",
		"[Bash LV 7]^777777 10% Stun Chance ^000000",
		"[Bash LV 8]^777777 15% Stun Chance ^000000",
		"[Bash LV 9]^777777 20% Stun Chance ^000000",
		"[Bash LV 10]^777777 25% Stun Chance ^000000",
	].join("\n");

	SkillDescription[SKID.SM_AUTOBERSERK] = [
		"Auto Berserk",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Passive with activation ^000000",
		"SP Cost:^777777 5 per 10 sec ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 See below ^000000",
		"Effect:^777777 When your HP goes below 25%, you gain the effect of Provoke L10 on yourself. That means +32% ATK and -60% VIT DEF. The effect lasts until the character returns to more than 25% HP. The skill can be set to activate or not. The skill will even function after it has drained all your SP. ^000000",
	].join("\n");

	SkillDescription[SKID.AC_MAKINGARROW] = [
		"Making Arrow",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Effect:^777777 Creates arrows from an item. Different items give different amounts and types of arrows. Cannot be used if above 50% weight.",
		"- Amulet = 40 Curse Arrows",
		"- Ancient Tooth = 300 Crystal Arrows & 20 Steel Arrows",
		"- Armor Piece of Dullahan = 150 Shadow Arrows",
		"- Barren Trunk = 20 Arrows",
		"- Battered Kettle = 50 Steel Arrows",
		"- Bee Sting = 1 Rusty Arrow",
		"- Blade of Darkness - 600 Sharp Arrows & 200 Arrows of Shadow",
		"- Bloody Edge = 200 Cursed Arrows & 600 Sharp Arrows",
		"- Blue Bijou = 50 Wind Arrows & 50 Crystal Arrows & 80 Ice Arrows",
		"- Blue Gemstone = 30 Crystal Arrows & 1 Frozen Arrow",
		"- Broken Sickle = 50 Rust Arrows & 10 Sharp Arrows & 20 Curse Arrows",
		"- Burning Heart = 150 Fire Arrows",
		"- Burning Horseshoe = 100 Steel Arrows",
		"- Burnt Tree = 250 Fire Arrows",
		"- Cactus Needle = 50 Arrows",
		"- Cat's Eye = 200 Wind Arrows",
		"- Clattering Skeleton = 50 Shadow Arrows & 50 Curse Arrows",
		"- Clock Hand = 100 Arrows & 5 Sleep Arrows",
		"- Coal = 8 Arrows of Shadow",
		"- Cracked Diamond = 50 Sharp Arrows",
		"- Crystal Blue = 500 Crystal Arrows",
		"- Crystal Fragment = 10 Flash Arrows & 30 Sleep Arrows",
		"- Cursed Ruby = 50 Cursed Arrows & 10 Sleep Arrows",
		"- Cursed Seal = 50 Curse Arrows & 50 Silence Arrows",
		"- Dark Crystal Fragment = 30 Curse Arrows & 50 Shadow Arrows",
		"- Dead Branch = 40 Mute Arrows",
		"- Decayed Nail = 1 Rusty Arrow & 1 Arrow of Shadow",
		"- Destroyed Armor = 150 Steel Arrows",
		"- Dokebi Horn = 2 Arrows of Shadow & 40 Iron Arrows",
		"- Dragon Canine = 1 Oridecon Arrow & 50 Iron Arrows",
		"- Dragon Skin = 10 Steel Arrows & 50 Curse Arrows & 50 Silence Arrows",
		"- Elunium = 1000 Steel Arrows & 50 Stun Arrows",
		"- Emperium = 600 Oridecon Arrows & 600 Immaterial Arrows & 600 Mute Arrows",
		"- Empty Bottle = 2 Iron Arrows",
		"- Emveretarcon = 200 Iron Arrows & 40 Silver Arrows",
		"- Evil Horn = 20 Arrows of Shadow & 10 Flash Arrows & 5 Stun Arrows",
		"- Fang = 40 Silver Arrows & 2 Sharp Arrows",
		"- Fang of Garm = 300 Crystal Arrows",
		"- Fin Helm = 600 Crystal Arrows & 200 Steel Arrows",
		"- Fine-grained Trunk = 20 Arrows",
		"- Fire Dragon Scale = 300 Fire Arrows & 300 Stun Arrows",
		"- Flame Heart = 6000 Fire Arrows & 5 Mute Arrows",
		"- Foolishness of the Blind = 200 Flash Arrows",
		"- Garlet = 12 Iron Arrows",
		"- Gill = 50 Crystal Arrows & 80 Iron Arrows",
		"- Glittering Jacket = 1000 Flash Arrows",
		"- Gold = 50 Flash Arrows & 50 Oridecon Arrows",
		"- Golden Ornament = 200 Silver Arrows & 300 Holy Arrows",
		"- Great Nature = 1500 Stone Arrows & 5 Flash Arrows",
		"- Green Bijou = 100 Stone Arrows & 80 Poison Arrows",
		"- Green Live = 500 Stone Arrows",
		"- Hard Feeler = 20 Sharp Arrows",
		"- Heroic Emblem = 1 Oridecon Arrow & 5 Stun Arrows",
		"- Horn = 35 Iron Arrows",
		"- Horrendous Mouth = 5 Arrows of Shadow",
		"- Ice Cubic = 100 Crystal Arrows",
		"- Ice Heart = 50 Crystal Arrows & 50 Ice Arrows",
		"- Ice Scale = 150 Crystal Arrows & 400 Ice Arrows & 200 Silence Arrows",
		"- Insect Leg = 10 Sharp Arrows & 80 Poison Arrows",
		"- Iron = 100 Iron Arrows",
		"- Iron Ore = 50 Iron Arrows",
		"- Jellopy = 4 Arrows",
		"- Key of the Clock Tower = 50 Oridecon Arrows",
		"- Key of the Underground = 100 Arrows of Shadow",
		"- Lantern = 80 Iron Arrows",
		"- Leopard Skin = 10 Sharp Arrows",
		"- Little Evil Horn = 2 Curse Arrows & 50 Iron Arrows",
		"- Live Coal = 100 Fire Arrows",
		"- Loki's Whispers = 1000 Arrows of Shadow",
		"- Lucifer's Lament = 400 Mute Arrows & 800 Sleep Arrows & 800 Stun Arrows",
		"- Manacles = 50 Steel Arrows",
		"- Mantis Scythe = 1 Sharp Arrow",
		"- Matchstick = 3000 Fire Arrows",
		"- Matyr's Leash = 100 Steel Arrows & 150 Arrows of Wind & 10 Sharp Arrows",
		"- Mole Claw = 50 Iron Arrows & 60 Stone Arrows",
		"- Mother's Nightmare = 1000 Cursed Arrow",
		"- Mr. Scream = 300 Steel Arrows & 200 Sharp Arrows",
		"- Mystic Frozen = 1500 Crystal Arrows & 5 Frozen Arrows",
		"- Ogre Tooth = 30 Steel Arrows & 5 Rusty Arrows",
		"- Old Blue Box = 50 Sharp Arrows & 50 Sleep Arrows",
		"- Old Hilt = 1000 Oridecon Arrows",
		"- Old Pick = 100 Rusty Arrows & 50 Steel Arrows",
		"- Opera Masque = 200 Steel Arrows & 40 Mute Arrows",
		"- Orc Claw = 10 Steel Arrows",
		"- Orc's Fang = 30 Iron Arrows & 5 Steel Arrows & 10 Stone Arrows",
		"- Oridecon = 250 Oridecon Arrows",
		"- Phracon = 50 Iron Arrows",
		"- Piece of Bamboo = 100 Arrows",
		"- Piece of Shield = 100 Steel Arrows & 100 Oridecon Arrows & 300 Immaterial Arrows",
		"- Poisonous Toad Skin = 20 Poison Arrows",
		"- Porcupine Quill = 70 Arrows & 30 Stone Arrows",
		"- Red Bijou = 100 Fire Arrows & 80 Flash Arrows",
		"- Red Blood = 2000 Fire Arrows",
		"- Red Gemstone = 10 Rusty Arrows & 1 Poison Arrow & 1 Cursed Arrow",
		"- Reins = 50 Steel Arrows & 100 Iron Arrows",
		"- Rough Elunium = 200 Steel Arrows & 5 Stun Arrows",
		"- Rough Oridecon = 50 Oridecon Arrows",
		"- Rough Wind = 1500 Arrows of Wind & 5 Sleep Arrows",
		"- Rune of the Darkness = 300 Shadow Arrows & 150 Flash Arrows",
		"- Scell = 8 Steel Arrows",
		"- Scorpion Tail = 3 Rusty Arrows",
		"- Shackles = 700 Iron Arrows & 50 Steel Arrows",
		"- Silver Robe = 700 Silver Arrows",
		"- Silver Robe (Slotted) = 1000 Silver Arrows & 10 Immaterial Arrows",
		"- Sharp Leaf = 30 Sharp Arrows",
		"- Shining Spear Blade = 100 Oridecon Arrows",
		"- Skeletal Armor Piece = 500 Immaterial Arrows & 200 Shadow Arrows & 100 Oridecon Arrows",
		"- Solid Peach = 30 Stun Arrows",
		"- Solid Trunk = 20 Arrows",
		"- Star Crumb = 30 Flash Arrows",
		"- Star Dust = 10 Flash Arrows",
		"- Steel = 100 Steel Arrows",
		"- Stiff Horn = 2 Stun Arrows",
		"- Stinky Scale = 1 Poison Arrow",
		"- Stone Fragment = 150 Stone Arrows",
		"- Tail of Steel Scorpion = 1 Poison Arrow & 250 Steel Arrows",
		"- Tangled Chains = 50 Steel Arrows & 50 Shadow Arrows",
		"- Tooth of Bat = 1 Arrow of Shadow",
		"- Tree Root = 7 Arrows",
		"- Trunk = 40 Arrows",
		"- Unicorn Horn = 1000 Silver Arrows",
		"- Used Iron Plate = 100 Steel Arrows & 100 Rusty Arrows",
		"- Valhala's Flower = 600 Immaterial Arrows & 600 Holy Arrows & 600 Sharp Arrows",
		"- Venom Canine = 1 Poison Arrow",
		"- Welding Mask = 200 Steel Arrows & 40 Stun Arrows",
		"- Will of the Darkness = 30 Curse Arrows & 30 Poison Arrows & 50 Shadow Arrows",
		"- Will of the Red Darkness = 200 Curse Arrows & 200 Poison Arrows & 100 Shadow Arrows",
		"- Wind of Verdure = 500 Arrows of Wind",
		"- Wolf Claw = 15 Iron Arrows",
		"- Wooden Mail = 700 Arrows & 500 Iron Arrows",
		"- Wooden Mail (Slotted) = 1000 Arrows & 700 Iron Arrows",
		"- Yellow Bijou = 50 Silver Arrows & 50 Immaterial Arrows & 80 Sleep Arrows",
		"- Yellow Gemstone = 30 Stone Arrows & 1 Sleep Arrow",
		"- Young Twig = 1000 Mute Arrows",
		"- Zargon = 50 Silver Arrows",
		"- Zenorc's Fang = 5 Rusty Arrows ^000000",
	].join("\n");

	SkillDescription[SKID.AC_CHARGEARROW] = [
		"Charge Arrow",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 15 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 9 + Vulture's Eye SkillLV cells ^000000",
		"Cast Time:^777777 1.5 sec (cannot be interrupted) ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Ranged attack at 150% ATK. The target is pushed back 6 cells. Only 1 arrow is consumed. ^000000",
	].join("\n");

	SkillDescription[SKID.TF_SPRINKLESAND] = [
		"Sprinkle Sand",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 9 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 Melee ^000000",
		"ATK Type:^777777 Earth Physical ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 An attack with 130% normal ATK and with a 20% chance to cause blind effect. Although it has no Cast Time or Cool Down it can't be spamed. ^000000",
	].join("\n");

	SkillDescription[SKID.TF_BACKSLIDING] = [
		"Back Sliding",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 7 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Moves you backwards 5 cells (depends on the direction you are facing). ^000000",
	].join("\n");

	SkillDescription[SKID.TF_PICKSTONE] = [
		"Pick Stone",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 2 ^000000",
		"Cast Time:^777777 0.5 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Effect:^777777 Adds one Stone item to your inventory. Will not work if you are overweight (more than 50% of total weight capacity). ^000000",
	].join("\n");

	SkillDescription[SKID.TF_THROWSTONE] = [
		"Throw Stone",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 2 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 7 cells ^000000",
		"ATK Type:^777777 Neutral, Long Range, Physical ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 0.1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^777777 1 Stone ^000000",
		"Effect:^777777 An attack that always does 50 points of damage (but does not ignore damage reduction cards) and has a 3% chance of causing the stun effect on the target. Consumes one stone per use. Useful for luring monsters link monsters away from a pack and other such sneaky thief-like tricks. ^000000",
	].join("\n");

	SkillDescription[SKID.MC_CARTREVOLUTION] = [
		"Cart Revolution",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 12 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Does ATK*150% neutral-property damage to 3x3 area around your target. Enemies hit by the attack are pushed back 2 cells. The appearance is just like Magnum Break, except you also see your cart go flying over your head and hitting the ground in front of you.",
		"Putting items in your cart increases the damage by up to 100% more (1% per 80 weight as it has 8000 weight max). So the total you could do is 250% damage. ^000000",
	].join("\n");

	SkillDescription[SKID.MC_CHANGECART] = [
		"Change Cart",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 40 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Effect:^777777 Lets you change the appearance of your cart. A \"for fun\" skill, but because the appearances you can pick is restricted by the characters base level, you can tell a high level merchant or blacksmith just by looking at their cart.",
	].join("\n");

	SkillDescription[SKID.MC_LOUD] = [
		"Loud Exclamation",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 8 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 300 sec ^000000",
		"Effect:^777777 Adds +4 STR. ^000000",
	].join("\n");

	SkillDescription[SKID.AL_HOLYLIGHT] = [
		"Holy Light",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 15 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 2 sec (reduced by DEX) ^000000",
		"Cool Down:^777777 None ^000000",
		"Effect:^777777 Does a single Holy element hit for 125% of your MATK. ^000000",
	].join("\n");

	SkillDescription[SKID.MG_ENERGYCOAT] = [
		"Energy Coat",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 30 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 5 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 5 minutes or until 0 SP ^000000",
		"Effect:^777777 Reduces damage from Physical attacks (punching, weapons and skills using weapons) by draining SP. Damage reduction is better and SP lost is higher with higher SP, according to the following table:",
		"% of SP Remaining, % of Damage Reduction, % of SP Used.",
		"1-20,  6, 1",
		"21-40, 12, 1.5",
		"41-60, 18, 2",
		"61-80, 25, 2.5",
		"81-100, 30, 3 ^000000",
	].join("\n");

	SkillDescription[SKID.RG_SNATCHER] = [
		"Snatcher",
		"Type:^000099 Passive ^000000",
		"Target:^777777 Enemy ^000000",
		"Effect:^777777 Steals from the enemy while attacking normally. Steal success chance is based on the Thief Steal Skill. ^000000",
		"[LV 1]^777777 7% Chance of Auto Steal ^000000",
		"[LV 2]^777777 8% Chance of Auto Steal ^000000",
		"[LV 3]^777777 10% Chance of Auto Steal ^000000",
		"[LV 4]^777777 11% Chance of Auto Steal ^000000",
		"[LV 5]^777777 13% Chance of Auto Steal ^000000",
		"[LV 6]^777777 14% Chance of Auto Steal ^000000",
		"[LV 7]^777777 16% Chance of Auto Steal ^000000",
		"[LV 8]^777777 17% Chance of Auto Steal ^000000",
		"[LV 9]^777777 19% Chance of Auto Steal ^000000",
		"[LV 10]^777777 20% Chance of Auto Steal ^000000",
	].join("\n");

	SkillDescription[SKID.RG_STEALCOIN] = [
		"Steal Coin",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"Target:^777777 Monster ^000000",
		"SP Cost:^777777 15 ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Steals Zeny from a monster, affected by DEX, LUK, and SkillLV, amount stolen is based on monsters level. Can only be used to steal Zeny once, however it is possible to steal Zeny from monsters that the user stole items before. (1*SkillLV)% chance to steal. ^000000",
	].join("\n");

	SkillDescription[SKID.RG_BACKSTAP] = [
		"Back Stab",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"Target:^777777 Enemy ^000000",
		"SP Cost:^777777 16 ^000000",
		"Range:^777777 Melee (even with bow!) ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Powerful attack that can only be used from behind the enemy. Cannot miss and will turn the target to face the caster, thus preventing repeated use. Damage is (320+40*SkillLV)% ATK (halved if used with a bow type weapon). ^000000",
		"[LV 1]^777777 340% ATK ^000000",
		"[LV 2]^777777 380% ATK ^000000",
		"[LV 3]^777777 420% ATK ^000000",
		"[LV 4]^777777 460% ATK ^000000",
		"[LV 5]^777777 500% ATK ^000000",
		"[LV 6]^777777 540% ATK ^000000",
		"[LV 7]^777777 580% ATK ^000000",
		"[LV 8]^777777 620% ATK ^000000",
		"[LV 9]^777777 660% ATK ^000000",
		"[LV 10]^777777 700% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.RG_TUNNELDRIVE] = [
		"Tunnel Drive",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"SP Cost:^777777 Hide dependant ^000000",
		"Effect:^777777 Upgrades the Hide skill to allow slow movement while hiding. Not restricted to walls like the Assassins Cloaking Skill. ^000000",
		"Movement Speed:",
		"[LV 1]^777777 26% ^000000",
		"[LV 2]^777777 32% ^000000",
		"[LV 3]^777777 38% ^000000",
		"[LV 4]^777777 44% ^000000",
		"[LV 5]^777777 50% ^000000",
	].join("\n");

	SkillDescription[SKID.RG_RAID] = [
		"Raid",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"Target:^777777 Enemy ^000000",
		"SP Cost:^777777 20 ^000000",
		"Range:^777777 Weapon Range ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Attacks a target and the 3*3 cells below it with a chance to Stun and Blind. Rogue must be hiding to use this skill. Damage is (100+40*SkillLV)% ATK. Chance to Stun/Blind is (10+3*SkillLV)%. ^000000",
		"[LV 1]^777777 140% Attack, 13% Chance ^000000",
		"[LV 2]^777777 180% Attack, 16% Chance ^000000",
		"[LV 3]^777777 220% Attack, 19% Chance ^000000",
		"[LV 4]^777777 260% Attack, 22% Chance ^000000",
		"[LV 5]^777777 300% Attack, 25% Chance ^000000",
	].join("\n");

	SkillDescription[SKID.RG_STRIPWEAPON] = [
		"Strip Weapon",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 15 + 2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 60 + 15*SkillLV sec ^000000",
		"Effect:^777777 On player in PVP: Takes equipped weapon off player and prevents a reequip of ANY weapon for a certain time. On monster: reduces Attack by 25% for skill's duration.",
		"Chemical Protection avoids this skill. Success Chance is (5+2*SkillLV)%. ^000000",
		"[LV 1]^777777 7% Chance ^000000",
		"[LV 2]^777777 9% Chance ^000000",
		"[LV 3]^777777 11% Chance ^000000",
		"[LV 4]^777777 13% Chance ^000000",
		"[LV 5]^777777 15% Chance ^000000",
	].join("\n");

	SkillDescription[SKID.RG_STRIPSHIELD] = [
		"Strip Shield",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 + 2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 60 + 15*SkillLV sec ^000000",
		"Effect:^777777 On player in PVP: Takes equipped shield off player and prevents a reequip of ANY shield for a certain time. On monster: Reduces DEF by 15% for skill's duration.",
		"Chemical Protection avoids this skill. Success Chance is (5+2*SkillLV)%. ^000000",
		"[LV 1]^777777 7% Chance ^000000",
		"[LV 2]^777777 9% Chance ^000000",
		"[LV 3]^777777 11% Chance ^000000",
		"[LV 4]^777777 13% Chance ^000000",
		"[LV 5]^777777 15% Chance ^000000",
	].join("\n");

	SkillDescription[SKID.RG_STRIPARMOR] = [
		"Strip Armor",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 15 + 2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 60 + 15*SkillLV sec ^000000",
		"Effect:^777777 On player in PVP: Takes equipped armor off player and prevents a reequip of ANY armor for a certain time. On monster: Reduces VIT by 40% for skill's duration.",
		"Chemical Protection avoids this skill. Success Chance is (5+2*SkillLV)%. ^000000",
		"[LV 1]^777777 7% Chance ^000000",
		"[LV 2]^777777 9% Chance ^000000",
		"[LV 3]^777777 11% Chance ^000000",
		"[LV 4]^777777 13% Chance ^000000",
		"[LV 5]^777777 15% Chance ^000000",
	].join("\n");

	SkillDescription[SKID.RG_STRIPHELM] = [
		"Strip Helm",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 + 2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 60 + 15*SkillLV sec ^000000",
		"Effect:^777777 On player in PVP: Takes equipped helm off player and prevents a reequip of ANY helm for a certain time. On monster: Reduces INT by 40% for skill's duration.",
		"Chemical Protection avoids this skill. Success Chance is (5+2*SkillLV)%. ^000000",
		"[LV 1]^777777 7% Chance ^000000",
		"[LV 2]^777777 9% Chance ^000000",
		"[LV 3]^777777 11% Chance ^000000",
		"[LV 4]^777777 13% Chance ^000000",
		"[LV 5]^777777 15% Chance ^000000",
	].join("\n");

	SkillDescription[SKID.RG_INTIMIDATE] = [
		"Intimidate",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 + 3*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 This skill teleports you and the target to a random area on the same map and attacks the target. The damage is (100+30*SkillLV)%. Does not work against Boss monsters. ^000000",
		"[LV 1]^777777 130% ATK ^000000",
		"[LV 2]^777777 160% ATK ^000000",
		"[LV 3]^777777 190% ATK ^000000",
		"[LV 4]^777777 220% ATK ^000000",
		"[LV 5]^777777 250% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.RG_GRAFFITI] = [
		"Graffiti",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"Target:^777777 Area ^000000",
		"Range:^777777 Melee ^000000",
		"SP Cost:^777777 15 ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 30 sec ^000000",
		"Catalyst:^777777 1 Red Gemstone ^000000",
		"Effect:^777777 Creates a user defined text message on the ground. ^000000",
	].join("\n");

	SkillDescription[SKID.RG_FLAGGRAFFITI] = [
		"Flag Graffiti",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"Target:^777777 Area ^000000",
		"Range:^777777 Melee ^000000",
		"SP Cost:^777777 10 ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 180 ^000000",
		"Catalyst:^777777 1 Giant Paint Brush ^000000",
		"Effect:^777777 Creates a spray of your Guild Icon on the ground. ^000000",
		"^ee0000(Not implemented by Gravity yet). ^000000",
		"[LV 1]^777777 1 Guild Icon ^000000",
		"[LV 2]^777777 3 Guild Icons ^000000",
		"[LV 3]^777777 6 Guild Icons ^000000",
		"[LV 4]^777777 10 Guild Icons ^000000",
		"[LV 5]^777777 15 Guild Icons ^000000",
	].join("\n");

	SkillDescription[SKID.RG_CLEANER] = [
		"Cleaner",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"Target:^777777 Area ^000000",
		"Range:^777777 Melee ^000000",
		"SP Cost:^777777 5 ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^777777 1 Wet Duster ^000000",
		"Effect:^777777 Cleans graffiti from the ground. ^000000",
		"^ee0000(Not implemented by Gravity yet). ^000000",
	].join("\n");

	SkillDescription[SKID.RG_GANGSTER] = [
		"Gangster's Paradise",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 When 2 or more Rogues sit next to each other (all must have this skill) aggressive monsters, except Boss monsters, won't attack. ^000000",
	].join("\n");

	SkillDescription[SKID.RG_COMPULSION] = [
		"Compulsion Discount",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Enable to purchase items at a Lower Price in NPC Shops. Discount rates are better than Merchant Discount. ^000000",
		"[Level 1]^777777 Discount Rate 9% ^000000",
		"[Level 2]^777777 Discount Rate 13% ^000000",
		"[Level 3]^777777 Discount Rate 17% ^000000",
		"[Level 4]^777777 Discount Rate 21% ^000000",
		"[Level 5]^777777 Discount Rate 25% ^000000",
	].join("\n");

	SkillDescription[SKID.RG_PLAGIARISM] = [
		"Plagiarism",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Passive ^000000",
		"Effect:^777777 Allows the last offensive skill used on you to be used as a skill you have gained. Only one skill may be copied at a time in this fashion, maximum copied skill level equals the Plagiarism SkillLV. ^000000",
		"[LV 1]^777777 LV. 1 Skills can be copied ^000000",
		"[LV 2]^777777 LV. 2 Skills can be copied ^000000",
		"[LV 3]^777777 LV. 3 Skills can be copied ^000000",
		"[LV 4]^777777 LV. 4 Skills can be copied ^000000",
		"[LV 5]^777777 LV. 5 Skills can be copied ^000000",
		"[LV 6]^777777 LV. 6 Skills can be copied ^000000",
		"[LV 7]^777777 LV. 7 Skills can be copied ^000000",
		"[LV 8]^777777 LV. 8 Skills can be copied ^000000",
		"[LV 9]^777777 LV. 9 Skills can be copied ^000000",
		"[LV 10]^777777 LV. 10 Skills can be copied ^000000",
	].join("\n");

	SkillDescription[SKID.AM_AXEMASTERY] = [
		"Axe Mastery",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Raises Attack Power that ignores Def by +3 per SkillLV when using Axe type weapons. This damage ignores modification from Armor and VIT defense, but not from Elemental and Card modifiers and applies to all hits for multi hit attacks. ^000000",
		"[LV 1]^777777 ATK +3 ^000000",
		"[LV 2]^777777 ATK +6 ^000000",
		"[LV 3]^777777 ATK +9 ^000000",
		"[LV 4]^777777 ATK +12 ^000000",
		"[LV 5]^777777 ATK +15 ^000000",
		"[LV 6]^777777 ATK +18 ^000000",
		"[LV 7]^777777 ATK +21 ^000000",
		"[LV 8]^777777 ATK +24 ^000000",
		"[LV 9]^777777 ATK +27 ^000000",
		"[LV 10]^777777 ATK +30 ^000000",
	].join("\n");

	SkillDescription[SKID.AM_LEARNINGPOTION] = [
		"Learning Potion",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases effectiveness of healing items by 5% per SkillLV and potion creation chance by 1% per SkillLV. ^000000",
		"[LV 1]^777777 +5%, +1% potion creation ^000000",
		"[LV 2]^777777 +10%, +2% potion creation ^000000",
		"[LV 3]^777777 +15%, +3% potion creation ^000000",
		"[LV 4]^777777 +20%, +4% potion creation ^000000",
		"[LV 5]^777777 +25%, +5% potion creation ^000000",
		"[LV 6]^777777 +30%, +6% potion creation ^000000",
		"[LV 7]^777777 +35%, +7% potion creation ^000000",
		"[LV 8]^777777 +40%, +8% potion creation ^000000",
		"[LV 9]^777777 +45%, +9% potion creation ^000000",
		"[LV 10]^777777 +50%, +10% potion creation ^000000",
	].join("\n");

	SkillDescription[SKID.AM_PHARMACY] = [
		"Pharmacy",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 5 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 40 + SkillLV sec ^000000",
		"Effect:^777777 Allows the creation of potions. Requires a Product Manual and uses up a Medicine Bowl and different ingredients for each potion to be made. Increases the chance of a successful creation by +3% per SkillLV.",
		"The Success Formula (on %) for Potions is:",
		"JobLV?.2+(DEX+LUK+INT/2)?.1+Learning Potion?.5+Pharmacy?+Base Value",
		"^000000-Normal Potions^777777 Base Value =  + Random(1-100)/10 + 20%",
		"^000000-Blue Potions^777777 Base Value = None",
		"^000000-Alcohol-^777777 Base Value = + Random(1-100)/10 + 10%",
		"^000000-Fire/Acid/Plant/Grenade Bottles-^777777 Base Value = + Random(1-100)/10",
		"^000000-Condensed Red Potions-^777777 Base Value = None",
		"^000000-Condensed Yellow Potions-^777777 Base Value = - Random(1-50)/10",
		"^000000-Condensed White Potions-^777777 Base Value = - Random(1-100)/10",
		"^000000-Glistening Coat-^777777 Base Value = - Random(1-100)/10",
		"^000000-All Other-^777777 Base Value = None",
		"^000099And as an important note to remember, an adopted Alchemist will have -30% success rates! ^000000",
	].join("\n");

	SkillDescription[SKID.AM_DEMONSTRATION] = [
		"Demonstration",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive^bb0000 (Fire) ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 cell ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 40 + SkillLV sec ^000000",
		"Catalyst:^777777 1 ^cc0000Bottle Grenade ^000000",
		"Effect:^777777 Throws a Molotov Cocktail, setting a 3x3 area ablaze. Has a (1*SkillLV)% chance to damage the targets Weapon. Can not be cast directly under an enemy or directly next to yourself. Damage is (100+20*SkillLV)% ATK which is not increased via +% cards, +ATK cards however, do help.",
		"Status inflicting cards have no effect. It can't be placed next to other Bombs or stacked on top of another Bomb. ^000000",
		"[LV 1]^777777 120% ATK & 1% Chance ^000000",
		"[LV 2]^777777 140% ATK & 2% Chance ^000000",
		"[LV 3]^777777 160% ATK & 3% Chance ^000000",
		"[LV 4]^777777 180% ATK & 4% Chance ^000000",
		"[LV 5]^777777 200% ATK & 5% Chance ^000000",
	].join("\n");

	SkillDescription[SKID.AM_ACIDTERROR] = [
		"Acid Terror",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^777777 1 Acid Bottle ^000000",
		"Effect:^777777 Throw an ^66cc33Acid Bottle^777777 at your opponent with a small chance to break their armor, and inflict the external bleeding status. This skill ignores armor defense, and hits regardless of Flee.",
		"VIT defense is calculated in, however. While the damage can be blocked by Pneuma, the chance to break armor remains. Kyrie, however, blocks both the damage and the chance of breaking armor, as well as a Crusader with Auto Guard.",
		"A successful armor break calculation makes the target use the /omg emoticon. That doesn't automatically mean they had their armor broken; even when using the Chemical Protection Armor skill or wearing an Immortal armor, the /omg will display itself so long as the attack was considered a success.",
		"Just like Demonstration, the damage is increased via +ATK cards, and status and +% cards have no effect. It's also unaffected by elements. The ^66cc33Acid Bottle^777777 is consumed at the beginning of the cast, as opposed to the end like the other potion skills.",
		"This means that if you are interrupted while casting, the bottle is lost with nothing to show for it. Damage is (100+40*SkillLV)% ATK. ^000000",
		"[LV 1]^777777 3% chance to damage Armor, 3% chance of Bleeding ^000000",
		"[LV 2]^777777 7% chance to damage Armor, 6% chance of Bleeding ^000000",
		"[LV 3]^777777 10% chance to damage Armor, 9% chance of Bleeding ^000000",
		"[LV 4]^777777 12% chance to damage Armor, 12% chance of Bleeding ^000000",
		"[LV 5]^777777 13% chance to damage Armor, 15% chance of Bleeding ^000000",
	].join("\n");

	SkillDescription[SKID.AM_POTIONPITCHER] = [
		"Potion Pitcher",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active, Level Selectable ^000000",
		"SP Cost:^777777 1 ^000000",
		"Target:^777777 Player/Homunculus ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Allows you to throw a potion at yourself, another party or guild member with increased healing efficiency. Higher skill levels allow the use of more potent potions and the selected level determines the potion type that is used.",
		"Learned SkillLV also increases the impact potency by 10% per SkillLV which stacks with existing bonuses like Learning Potion, VIT and INT, Increase Recuperative Power and Increase Spiritual Power (yes, with maxed Increase Recuperative Power the healed amount is doubled).",
		"It uses up one Potion of the thrown type. It will not damage Undead when you use a healing potion on them. ^000000",
		"[LV 1]^777777 +10% Heal, Up to Red Potion ^000000",
		"[LV 2]^777777 +20% Heal, Up to Orange Potion ^000000",
		"[LV 3]^777777 +30% Heal, Up to Yellow Potion ^000000",
		"[LV 4]^777777 +40% Heal, Up to White Potion ^000000",
		"[LV 5]^777777 +50% Heal, Up to Blue Potion ^000000",
	].join("\n");

	SkillDescription[SKID.AM_CANNIBALIZE] = [
		"Bio Cannibalize",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active, Level selectable ^000000",
		"SP Cost:^777777 20 ^000000",
		"Target:^777777 Cell ^000000",
		"Range:^777777 4 cells ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 35 + 5*SkillLV sec (only 60 sec at LV 5 confirmed) ^000000",
		"Effect:^777777 Summon various plants to attack monsters or players. The level you have determines the HP of the plant, while the level you use determines the type of plant summoned, the duration, and the amount of ^66cc33Plant Bottles^777777 consumed.",
		"The HP formula is 2230+200*Possessed SkillLV per plant (yes, these have significantly more HP than normal ones), all other stats remain the same. If you have less than the total amount of bottles required for the Skill Level you used, it will take the rest of the bottles, and summon that many plants.",

		"So if you have three plant bottles, and use level one, you'll end up with three Mandragora instead of the typical five. When used during the War of Emperium, the defense value of the castle the plants are in raises the defense of the plants themselves.",
		"Their attacks are considered extensions of your own when it comes to a single thing: auto-cast spells granted by weapons or cards. Status effects and damage increasing cards do not carry over to the plants.",
		"You can only summon more plants once your first plants have died, or gone through their duration time. So long as you remain on screen with them, you will get the experience for their kills.",
		"An effective strategy for all the plants is to summon them, hit/target a monster, and then use a Hiding accessory once the monster is in range of your plants.",
		"Monsters will not attack your plants, thus rendering them sitting ducks until your plants have had their way with them, provided they're not insect or demon type monsters.",
		"The attacks are of neutral element with the occasional elemental attack corresponding to the plants element. The HIT/Flee stats below are what's required of players to hit/dodge them, not the HIT or Flee of the plant itself.",
		"[LV 1]^777777 5 Mandragoras, 5 ^66cc33Plant Bottle^777777",
		"ATK: 26-35",
		"Element/size: Earth 3/medium.",
		"HIT: 44",
		"Flee: 123",
		"ASPD: Fairly slow.",
		"Range: 4",
		"Tip: Long lasting, use them with autocast weapons and to decrease Flee. Blocked by Pneuma. ^000000",
		"[LV 2]^777777 4 Hydras^, 4 ^66cc33Plant Bottle^777777",
		"ATK: 22-28",
		"Element/size: Water 2/small.",
		"HIT: 48",
		"Flee: 129",
		"ASPD: Quite fast.",
		"Range: 7",
		"Tip: Use them with autocast weapons. Blocked by Pneuma. ^000000",
		"[LV 3]^777777 3 Floras, 3 ^66cc33Plant Bottle^777777",
		"ATK: 242-273",
		"Element/size: Earth 1/large.",
		"HIT: 72",
		"Flee: 144",
		"ASPD: Average.",
		"Range: 3",
		"Tip: randomly casts HP drain to replenish its HP. ^000000",
		"[LV 4]^777777 2 Parasites, 2 ^66cc33Plant Bottle^777777",
		"ATK: 215-430",
		"Element/size: Wind 2/medium.",
		"HIT: 109",
		"Flee: 214",
		"ASPD: Somewhat fast.",
		"Range: 8",
		"Tip: High Range. Blocked by Pneuma. ^000000",
		"[LV 5]^777777 1 Geographer, 1 ^66cc33Plant Bottle^777777",
		"ATK: 467-621",
		"Element/size: Earth 3/medium.",
		"HIT: 143",
		"Flee: 199",
		"ASPD: Average.",
		"Range: 3",
		"Tip: randomly casts a 1024 HP Heal on allies. On specific servers (Aegis) in PvP only heals you if you're in a party, it's required for the Geographer to recognize you as a valid target for healing even if you are the only member. ^000000",

	].join("\n");

	SkillDescription[SKID.AM_SPHEREMINE] = [
		"Sphere Mine",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Cell ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 5 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 30 + 10*SkillLV ^000000",
		"Catalyst:^777777 1 ^66cc33Marine Sphere Bottle ^000000",
		"Effect:^777777 Summons a Marine Sphere with twice the normal HP. After being hit, it starts a 5 second countdown and moves away from the attacker. When the countdown reaches 0 it explodes and inflicts damage to anyone (party members, enemies and guild members) equal to its remaining HP.",
		"You can not summon more than 3 in a 9x9 area. The Spheres Maximum HP is based on your skill level (2000+400*SkillLV HP). When used in WoE, the defense value of the castle the Sphere is in will raise the defense of the Sphere itself. ^000000",
		"[LV 1]^777777 2400 HP, lasts 40 sec ^000000",
		"[LV 2]^777777 2800 HP, lasts 50 sec ^000000",
		"[LV 3]^777777 3200 HP, lasts 60 sec ^000000",
		"[LV 4]^777777 3600 HP, lasts 70 sec ^000000",
		"[LV 5]^777777 4000 HP, lasts 80 sec ^000000",
	].join("\n");

	SkillDescription[SKID.AM_CP_WEAPON] = [
		"Chemical Protection Weapon",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 30 ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 120*SkillLV sec ^000000",
		"Catalyst:^777777 1 ^66cc33Glistening Coat ^000000",
		"Effect:^777777 Causes an equipped weapon to become unbreakable for the skill's duration, also protects against Rogue skill Strip Weapon. ^000000",
		"[LV 1]^777777 120 sec ^000000",
		"[LV 2]^777777 240 sec ^000000",
		"[LV 3]^777777 360 sec ^000000",
		"[LV 4]^777777 480 sec ^000000",
		"[LV 5]^777777 600 sec ^000000",
	].join("\n");

	SkillDescription[SKID.AM_CP_SHIELD] = [
		"Chemical Protection Shield",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 25 ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 120*SkillLV sec ^000000",
		"Catalyst:^777777 1 ^66cc33Glistening Coat ^000000",
		"Effect:^777777 Causes an equipped shield to become unbreakable for the skill's duration, also protects against Rogue skill Strip Shield. ^000000",
		"[LV 1]^777777 120 sec ^000000",
		"[LV 2]^777777 240 sec ^000000",
		"[LV 3]^777777 360 sec ^000000",
		"[LV 4]^777777 480 sec ^000000",
		"[LV 5]^777777 600 sec ^000000",
	].join("\n");

	SkillDescription[SKID.AM_CP_ARMOR] = [
		"Chemical Protection Armor",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 25 ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 120*SkillLV sec ^000000",
		"Catalyst:^777777 1 ^66cc33Glistening Coat ^000000",
		"Effect:^777777 Causes an equipped armor to become unbreakable for the skill's duration, also protects against Rogue skill Strip Armor. ^000000",
		"[LV 1]^777777 120 sec ^000000",
		"[LV 2]^777777 240 sec ^000000",
		"[LV 3]^777777 360 sec ^000000",
		"[LV 4]^777777 480 sec ^000000",
		"[LV 5]^777777 600 sec ^000000",
	].join("\n");

	SkillDescription[SKID.AM_CP_HELM] = [
		"Chemical Protection Helm",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 25 ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 120*SkillLV sec ^000000",
		"Catalyst:^777777 1 ^66cc33Glistening Coat ^000000",
		"Effect:^777777 Causes an equipped helm to become indestructible for the skill's duration. Protects against Rogue skill Strip Helm. ^000000",
		"[LV 1]^777777 120 sec ^000000",
		"[LV 2]^777777 240 sec ^000000",
		"[LV 3]^777777 360 sec ^000000",
		"[LV 4]^777777 480 sec ^000000",
		"[LV 5]^777777 600 sec ^000000",
	].join("\n");

	SkillDescription[SKID.AM_BIOETHICS] = [
		"Bioethics",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Allows Alchemist to begin learning the Homunculus Skill Tree. ^000000",
	].join("\n");

	SkillDescription[SKID.AM_BIOTECHNOLOGY] = [
		"Biotechnology",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increase chance of Homunculus creation and Maximum HP of creature. ^000000",
	].join("\n");

	SkillDescription[SKID.AM_CREATECREATURE] = [
		"Create Creature",
		"Type:^33cc00 Active ^000000",
		"Effect:^777777 Creates an embryo. Skill level affects success chance.",
		"Ingredients for making an embryo:",
		"- Glass Tube, Morning Dew of Yggdrasil, Seed of Life, 1 each.",
		"- Requires the Potion Creation Guide present in your inventory. ^000000",
	].join("\n");

	SkillDescription[SKID.AM_CULTIVATION] = [
		"Cultivation",
		"Type:^33cc00 Active ^000000",
		"Catalyst:^777777 1 Embryo ^000000",
		"Effect:^777777 Creates a Homunculus. Skill level affects success chance. Cannot be used if the caster already has a Homunculus present. ^000000",
	].join("\n");

	SkillDescription[SKID.AM_FLAMECONTROL] = [
		"Flame Control",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increase chances of Cultivation skill and fire resistance of user. ^000000",
	].join("\n");

	SkillDescription[SKID.AM_CALLHOMUN] = [
		"Call Homunculus",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Unknown ^000000",
		"Effect:^777777 Summon or recall an already created Homunculus using an 'Embryo' item. When used for the first time the Embryo gives one of the 4 possible types at random, if you don't like the Homunculus, destroy it and make a new one.",
		"You can see its state by right-clicking on it, then order it to either - attack, move, stay, feed, name change, and delete.",


		"[Status]",
		"This shows variety of information about your Homunculus. This is where variety of command can be given to your Homunculus.",
		"[Attack]",
		"Select an enemy via Alt + Right click, then press Alt + Right click one more time to set the Homunculus to attack that target. To cancel, simply give it order to move or stay.",
		"[Move]",
		"Click Alt + Right click on ground to let it move there. This command overrides all other commands. Homunculus cannot move too far away from you.",
		"[Stay]",
		"While doing other motion - [Move] or [Attack] - right click on the Homunculus to bring out the menu. Choose [Stay], then it will cancel all it was doing and stay by your side in idle state.",
		"[Feed]",
		"Select this, or click [Feed] in Homunculus status window, then you will feed the Homunculus with appropriate food.",


		"Homunculus eats following food:",
		"Lif: Pet Food",
		"Amistr: Zargon",
		"Filir: Garlet",
		"Vanilmirth: Scell",


		"Warning: Homunculus is an artificial life form. If you do not feed it periodically, it will simply disappear. So, take extra care in its feeding time!",


		"Every Homunculus has different Skills, depending on its type:",
		"^000000",
		"- Lif (Dryad): -support caster",
		"Touch of Heal^777777 - heals the master ^000000",
		"Emergency Avoid",
		"Brain Surgery",
		"Mental Change (unknown)",


		"- Amistr (Sheep): -defensive melee",
		"Castling",
		"Defense",
		"Adamantium Skin",
		"Blood Lust (unknown)",


		"- Filir (Bird): -offensive meele",
		"Moonlight",
		"Fleet Move",
		"Over Speed",
		"S.B.R.44 (unknown)",


		"- Vanilmirth (Mutant Jelly): -offensive spellcaster",
		"Caprice",
		"Chaotic Benediction",
		"Change Instruction",
		"Bio Explosion (unknown)",


		"Leveling For Homunculus^777777",
		"- Exp acquire by Homunculus depends on the damage it deals to the monster.",
		"- No matter how many monsters the player kill, the Homunculus will not gain any exp.",
		"- Let the Homunculus attack in order to level up Homunculus [no special effect when Homunculus Level Up].",
		"- Whether the exp obtained by the Homunculus will be shared by the player or not is still not confirmed.",
		"- Max level of Homunculus is LV 99",
		"- There is an equipment section in the status window of the Homunculus, therefore there might be special equipment for the Homunculus in the future.",
		"- Currently the only way to recover the Homunculus's HP is to let it rest. Potion Pitcher, Heal, etc, all of them have no effect. ^000000",
	].join("\n");

	SkillDescription[SKID.AM_REST] = [
		"Rest",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"Effect:^777777 Destroys a currently created Homunculus. ^000000",
	].join("\n");

	SkillDescription[SKID.AM_DRILLMASTER] = [
		"Drillmaster",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Raises Attack Power of Homunculus. ^000000",
		"[LV 1]^777777 ATK +3 ^000000",
		"[LV 2]^777777 ATK +6 ^000000",
		"[LV 3]^777777 ATK +9 ^000000",
		"[LV 4]^777777 ATK +12 ^000000",
		"[LV 5]^777777 ATK +15 ^000000",
		"[LV 6]^777777 ATK +18 ^000000",
		"[LV 7]^777777 ATK +21 ^000000",
		"[LV 8]^777777 ATK +24 ^000000",
		"[LV 9]^777777 ATK +27 ^000000",
		"[LV 10]^777777 ATK +30 ^000000",
	].join("\n");

	SkillDescription[SKID.AM_HEALHOMUN] = [
		"Heal Homunculus",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 + 2*SkillLV ^000000",
		"Target:^777777 Homunculus ^000000",
		"Effect:^ee0000 This skill has been dropped by Gravity. ^000000",
		"^777777 Casts heal on Homunculus. Skill power is that of an Acolyte's Heal. ^000000",
	].join("\n");

	SkillDescription[SKID.AM_RESURRECTHOMUN] = [
		"Resurrect Homunculus",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 80 - 6*SkillLV ^000000",
		"Target:^777777 Homunculus ^000000",
		"Effect:^777777 Resurrect a killed Homunculus. ^000000",
	].join("\n");

	SkillDescription[SKID.CR_TRUST] = [
		"Faith",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases Maximum HP by 200 and Resistance to Holy attacks by 5% per SkillLV. ^000000",
		"[LV 1]^777777 +200 HP, 5% Resist ^000000",
		"[LV 2]^777777 +400 HP, 10% Resist ^000000",
		"[LV 3]^777777 +600 HP, 15% Resist ^000000",
		"[LV 4]^777777 +800 HP, 20% Resist ^000000",
		"[LV 5]^777777 +1000 HP, 25% Resist ^000000",
		"[LV 6]^777777 +1200 HP, 30% Resist ^000000",
		"[LV 7]^777777 +1400 HP, 35% Resist ^000000",
		"[LV 8]^777777 +1600 HP, 40% Resist ^000000",
		"[LV 9]^777777 +1800 HP, 45% Resist ^000000",
		"[LV 10]^777777 +2000 HP, 50% Resist ^000000",
	].join("\n");

	SkillDescription[SKID.CR_AUTOGUARD] = [
		"Auto Guard",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 10 + 2*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 300 sec ^000000",
		"Effect:^777777 Gives you the ability to completely block attacks. Requires an equipped Shield. When you block an attack, you will be unable to move for 0.3 seconds for SkillLV 1-5. SkillLV 6-9 delays your movement for 0.2 sec and SkillLV 10 for 0.1 sec. ^000000",
		"[LV 1]^777777 5% Chance, 0.3 delay ^000000",
		"[LV 2]^777777 10% Chance, 0.3 delay ^000000",
		"[LV 3]^777777 14% Chance, 0.3 delay ^000000",
		"[LV 4]^777777 18% Chance, 0.3 delay ^000000",
		"[LV 5]^777777 21% Chance, 0.3 delay ^000000",
		"[LV 6]^777777 24% Chance, 0.2 delay ^000000",
		"[LV 7]^777777 26% Chance, 0.2 delay ^000000",
		"[LV 8]^777777 28% Chance, 0.2 delay ^000000",
		"[LV 9]^777777 29% Chance, 0.2 delay ^000000",
		"[LV 10]^777777 30% Chance, 0.1 delay ^000000",
	].join("\n");

	SkillDescription[SKID.CR_SHIELDCHARGE] = [
		"Shield Charge",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 3 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Hits enemy with shield. Knocks back and has a chance of stunning. Requires an equipped shield and ignores size modifications. Damage is (100+20*SkillLV)% ATK, Stun Chance is (15+5*SkillLV)%, Knock back is 4+SkillLV cells. ^000000",
		"[LV 1]^777777 120% Attack, 20% Stun Chance, 5 cells ^000000",
		"[LV 2]^777777 140% Attack, 25% Stun Chance, 6 cells ^000000",
		"[LV 3]^777777 160% Attack, 30% Stun Chance, 7 cells ^000000",
		"[LV 4]^777777 180% Attack, 35% Stun Chance, 8 cells ^000000",
		"[LV 5]^777777 200% Attack, 40% Stun Chance, 9 cells ^000000",
	].join("\n");

	SkillDescription[SKID.CR_SHIELDBOOMERANG] = [
		"Shield Boomerang",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 12 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 1 + 2*SkillLV ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 0.7 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Throw shield at enemy. Heavier and higher refined shields do more damage. Damage is 100%+30*SkillLV. Requires an equipped shield and ignores size modifications. ^000000",
		"[LV 1]^777777 130% Attack Range 3 ^000000",
		"[LV 2]^777777 160% Attack Range 5 ^000000",
		"[LV 3]^777777 190% Attack Range 5 ^000000",
		"[LV 4]^777777 220% Attack Range 9 ^000000",
		"[LV 5]^777777 250% Attack Range 11 ^000000",
	].join("\n");

	SkillDescription[SKID.CR_REFLECTSHIELD] = [
		"Reflect Shield",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 30 + 5*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 300 sec ^000000",
		"Effect:^777777 Returns some damage dealt to you back to the enemy. Melee attacks only. Reflected Damage is (10+3*SkillLV)% of received damage. Requires an equipped shield and ignores size modifications. ^000000",
		"[LV 1]^777777 13% ATK Returned ^000000",
		"[LV 2]^777777 16% ATK Returned ^000000",
		"[LV 3]^777777 19% ATK Returned ^000000",
		"[LV 4]^777777 22% ATK Returned ^000000",
		"[LV 5]^777777 25% ATK Returned ^000000",
		"[LV 6]^777777 28% ATK Returned ^000000",
		"[LV 7]^777777 31% ATK Returned ^000000",
		"[LV 8]^777777 34% ATK Returned ^000000",
		"[LV 9]^777777 37% ATK Returned ^000000",
		"[LV 10]^777777 40% ATK Returned ^000000",
	].join("\n");

	SkillDescription[SKID.CR_HOLYCROSS] = [
		"Holy Cross",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 10 + SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 2 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Hit an enemy with a cross shaped, strong, holy element attack. Has a chance of causing Blind. Damage is (100+35*SkillLV)%, Blind chance is (3*SkillLV)%. ^000000",
		"[LV 1]^777777 135% ATK, 3% Chance ^000000",
		"[LV 2]^777777 170% ATK, 6% Chance ^000000",
		"[LV 3]^777777 205% ATK, 9% Chance ^000000",
		"[LV 4]^777777 240% ATK, 12% Chance ^000000",
		"[LV 5]^777777 275% ATK, 15% Chance ^000000",
		"[LV 6]^777777 310% ATK, 18% Chance ^000000",
		"[LV 7]^777777 345% ATK, 21% Chance ^000000",
		"[LV 8]^777777 380% ATK, 24% Chance ^000000",
		"[LV 9]^777777 415% ATK, 27% Chance ^000000",
		"[LV 10]^777777 450% ATK, 30% Chance ^000000",
	].join("\n");

	SkillDescription[SKID.CR_GRANDCROSS] = [
		"Grand Cross",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 30 + 7*SkillLV ^000000",
		"HP Cost:^777777 See below ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down:^777777 0.3 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Do 3 holy element, cross shaped, splash attacks with the area of effect centered on yourself.",
		"Enemies of Undead property and Demon family type will be blinded (but not players). Damage is (100+40*SkillLV)%*(ATK+MATK)*holy_property_fix per hit, where:",
		"- ATK is the damage that you would cause to the monster using a normal (neutral property) attack (Masteries don't cont, weapon cards that increase ATK or STR work but cards that gives % more damage do NOT)",
		"- MATK is the damage that you would cause to the monster using a neutral property spell (and this value CAN BE negative, like when a mob that has higher INT than your MATK, cards/weapons that add additional INT work)",
		"During the cast process your defense will be reduced by 1/3. After casting is finished, you will receive 20% of current HP+([(100+40*SkillLV)%*(ATK+MATK)]/2)*holy_property_fix damage per hit yourself, where:",
		"- ATK is the damage that you would cause to YOURSELF using a normal attack (Thara Frog Card works and decrease damage. The '20% of current HP' rant can NOT be avoided or reduced!)",
		"- MATK is the damage that you would cause to YOURSELF using a neutral property spell",
		"Damage (on yourself) is reduced TWICE - first because of 'half damage to yourself', second because of the Faith skill (that reduces holy damage by half) so players actually get 1/4 damage.",
		"You may not change the equipped shield while you cast this spell. Casting can not be interrupted and the damage ignores size modifications. ^000000",
		"[LV 1]^777777 140% ATK ^000000",
		"[LV 2]^777777 180% ATK ^000000",
		"[LV 3]^777777 220% ATK ^000000",
		"[LV 4]^777777 260% ATK ^000000",
		"[LV 5]^777777 300% ATK ^000000",
		"[LV 6]^777777 340% ATK ^000000",
		"[LV 7]^777777 380% ATK ^000000",
		"[LV 8]^777777 420% ATK ^000000",
		"[LV 9]^777777 460% ATK ^000000",
		"[LV 10]^777777 500% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.CR_DEVOTION] = [
		"Devotion",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 25 ^000000",
		"Target:^777777 Selected Party Member(s) maximum is one per SkillLV ^000000",
		"Range:^777777 6 + SkillLV ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 15 + 15*SkillLV sec ^000000",
		"Effect:^777777 Protect party members by taking the full damage that they are receiving. They must be in range to benefit from this, once they leave the skill is canceled and needs to be recasted.",
		"Damage taken is based on the DEF of the person who gets hit, not the Crusader that takes the hit.",
		"If the caster has any self casted, class native enhancements on him, e.g. Endure (Endure transfer is disabled in WoE), Providence or Reflect Shield, the party member(s) will share these benefits, too.",
		"This skill cannot be used on other Crusaders. The level difference between the caster and the target must be equal or less than 10 (within normal EXP share range).",
		"The number of possible protected party members is 1*SkillLV. Should the HP of Crusader drop below 25%, Devotion will be canceled. ^000000",
		"[LV 1]^777777 30 sec, 1 Player ^000000",
		"[LV 2]^777777 45 sec, 2 Players ^000000",
		"[LV 3]^777777 60 sec, 3 Players ^000000",
		"[LV 4]^777777 75 sec, 4 Players ^000000",
		"[LV 5]^777777 90 sec, 5 Players ^000000",
	].join("\n");

	SkillDescription[SKID.CR_PROVIDENCE] = [
		"Providence",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 30 ^000000",
		"Target:^777777 Ally ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 180 sec ^000000",
		"Effect:^777777 Increase DEF against holy and demon type attacks by 5% per SkillLV. ^000000",
		"[LV 1]^777777 5% Reduced ATK ^000000",
		"[LV 2]^777777 10% Reduced ATK ^000000",
		"[LV 3]^777777 15% Reduced ATK ^000000",
		"[LV 4]^777777 20% Reduced ATK ^000000",
		"[LV 5]^777777 25% Reduced ATK ^000000",
	].join("\n");

	SkillDescription[SKID.CR_DEFENDER] = [
		"Defender",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 30 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 180 sec ^000000",
		"Effect:^777777 Decreases the ATK of ranged attacks against the caster by (5+15*SkillLV)%, but also lowers ASPD by (25-5*SkillLV)% and walking speed by 1/3 while active.",
		"The higher the level the lower the values, up to SkillLV 5 which has no speed reductions.",
		"Can be shared with party members when the Devotion skill is casted on them, but the movement reduction will affect them too. Caster must have a shield equipped. ^000000",
		"[LV 1]^777777 -20% ATK, -20% ASPD ^000000",
		"[LV 2]^777777 -35% ATK, -15% ASPD ^000000",
		"[LV 3]^777777 -50% ATK, -10% ASPD ^000000",
		"[LV 4]^777777 -65% ATK, -5% ASPD ^000000",
		"[LV 5]^777777 -80% ATK, no ASPD reduction ^000000",
	].join("\n");

	SkillDescription[SKID.CR_SPEARQUICKEN] = [
		"Spear Quicken",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 20 + 4*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 30*SkillLV sec ^000000",
		"Effect:^777777 Increases ASPD of two-handed spear type weapons by (20+SkillLV)%. ^000000",
		"[LV 1]^777777 30 sec, +21% ASPD ^000000",
		"[LV 2]^777777 60 sec, +22% ASPD ^000000",
		"[LV 3]^777777 90 sec, +23% ASPD ^000000",
		"[LV 4]^777777 120 sec, +24% ASPD ^000000",
		"[LV 5]^777777 150 sec, +25% ASPD ^000000",
		"[LV 6]^777777 180 sec, +26% ASPD ^000000",
		"[LV 7]^777777 210 sec, +27% ASPD ^000000",
		"[LV 8]^777777 240 sec, +28% ASPD ^000000",
		"[LV 9]^777777 270 sec, +29% ASPD ^000000",
		"[LV 10]^777777 300 sec, +30% ASPD ^000000",
	].join("\n");

	SkillDescription[SKID.MO_IRONHAND] = [
		"Iron Hand",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases Attack Power of fists and knuckle type weapons by 3 per SkillLV. ^000000",
		"[LV 1]^777777 ATK +3 ^000000",
		"[LV 2]^777777 ATK +6 ^000000",
		"[LV 3]^777777 ATK +9 ^000000",
		"[LV 4]^777777 ATK +12 ^000000",
		"[LV 5]^777777 ATK +15 ^000000",
		"[LV 6]^777777 ATK +18 ^000000",
		"[LV 7]^777777 ATK +21 ^000000",
		"[LV 8]^777777 ATK +24 ^000000",
		"[LV 9]^777777 ATK +27 ^000000",
		"[LV 10]^777777 ATK +30 ^000000",
	].join("\n");

	SkillDescription[SKID.MO_SPIRITSRECOVERY] = [
		"Spirits Recovery",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Recovers HP and SP every 10 seconds while sitting (not while standing). Recovery is every 20 seconds when overweight and it works even when recuperating from Asura Strike, but without the natural recuperation bonuses",
		"(e.g. at LV 2 you will only regenerate at +8/+4 per 10 sec after an Asura Strike, regardless of INT and VIT).",
		"Base HP recovery is 4 HP per SkillLV, modified by Maximum HP/500. Base SP recovery is 2 SP per SkillLV modified by Maximum SP/100. ^000000",
		"[LV 1]^777777 +4 HP & 2 SP ^000000",
		"[LV 2]^777777 +8 HP & 4 SP ^000000",
		"[LV 3]^777777 +12 HP & 6 SP ^000000",
		"[LV 4]^777777 +16 HP & 8 SP ^000000",
		"[LV 5]^777777 +20 HP & 10 SP ^000000",
	].join("\n");

	SkillDescription[SKID.MO_CALLSPIRITS] = [
		"Call Spirits",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 8 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 600 sec ^000000",
		"Effect:^777777 Summons one Spirit Sphere each cast. Spirit Spheres are required and used up by some skills. The maximum number of Spheres you can have is determined by the learned SkillLV.",
		"Each active Sphere gives +3 ATK with holy element that never misses. The cast is uninterruptable. ^000000",
	].join("\n");

	SkillDescription[SKID.MO_ABSORBSPIRITS] = [
		"Absorb Spirits",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 5 ^000000",
		"Target:^777777 Self/Enemy with Shift-Click ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Uses up all Spirit Spheres and regains 10 SP per sphere. Can be used on another Monk's Spheres in PVP. If used against a monster it steals 2 SP per monster level with a success chance of 20%. ^000000",
	].join("\n");

	SkillDescription[SKID.MO_TRIPLEATTACK] = [
		"Triple Attack",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Combo Time:^777777 1.3 sec ^000000",
		"Effect:^777777 Attacks 3 times with increased damage. Higher skill level DECREASES chance of occurrence. This skill differs from the Thief's Double Attack in many key regards.",
		"First of course the delay, as Double Attack takes the same amount of time as a normal attack while this skill takes longer. Triple Attack (and Chain Combo) actually counts for damage as a single strike.",
		"This means that damage bonuses from upgrades, masteries, Star Crumbs, and Spirit Spheres are only applied ONCE and divided evenly among the three (four) visible hits.",
		"Therefore even with LV10 Triple Attack these \"individual hits\" will usually be weaker than a single normal attack. On the positive side enemy VIT reduction is also only applied once, so against high-VIT targets the total damage may be much higher than expected.",
		"Also, a Thief does not say \"Double Attack!!\" to every extra hit, while the Monk does.",
		"The Silence status does not stop this skill from activating, and it can be used against the Emperium (though other combos cannot). The delay time is affected by ASPD of the user. ^000000",
		"[LV 1]^777777 29% Chance for 120% ATK ^000000",
		"[LV 2]^777777 28% Chance for 140% ATK ^000000",
		"[LV 3]^777777 27% Chance for 160% ATK ^000000",
		"[LV 4]^777777 26% Chance for 180% ATK ^000000",
		"[LV 5]^777777 25% Chance for 200% ATK ^000000",
		"[LV 6]^777777 24% Chance for 220% ATK ^000000",
		"[LV 7]^777777 23% Chance for 240% ATK ^000000",
		"[LV 8]^777777 22% Chance for 260% ATK ^000000",
		"[LV 9]^777777 21% Chance for 280% ATK ^000000",
		"[LV 10]^777777 20% Chance for 300% ATK. ^000000",
	].join("\n");

	SkillDescription[SKID.MO_BODYRELOCATION] = [
		"Body Relocation",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 14 ^000000",
		"Target:^777777 Cell ^000000",
		"Range:^777777 18 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None, see below ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Directly teleport to any chosen cell. You can not move to or over non movable cells this way, e.g. up a cliff. Uses up 1 Spirit Sphere.",
		"If under Critical Explosion state, you can use this skill without the need for Spirit Spheres. After using this skill, you cannot use Asura Strike for the following 2 seconds. ^000000",
	].join("\n");

	SkillDescription[SKID.MO_DODGE] = [
		"Dodge",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases Flee Rate by +1.5 per SkillLV rounded down. ^000000",
		"[LV 1]^777777 Flee Rate + 1 ^000000",
		"[LV 2]^777777 Flee Rate + 3 ^000000",
		"[LV 3]^777777 Flee Rate + 4 ^000000",
		"[LV 4]^777777 Flee Rate + 6 ^000000",
		"[LV 5]^777777 Flee Rate + 7 ^000000",
		"[LV 6]^777777 Flee Rate + 9 ^000000",
		"[LV 7]^777777 Flee Rate + 10 ^000000",
		"[LV 8]^777777 Flee Rate + 12 ^000000",
		"[LV 9]^777777 Flee Rate + 13 ^000000",
		"[LV 10]^777777 Flee Rate + 15 ^000000",
	].join("\n");

	SkillDescription[SKID.MO_INVESTIGATE] = [
		"Investigate",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 -0.5*(SkillLV*SkillLV) + 5.5*SkillLV + 5 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 2 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Strong ranged Physical attack. The more defense the target has the more damage this skill will do. It never misses and uses up one Spirit Sphere. Damage is [ATK x (1 + 0.75*SkillLV) x (Enemy Armor+Enemy VIT)/50] x Card Effect. ^000000",
	].join("\n");

	SkillDescription[SKID.MO_FINGEROFFENSIVE] = [
		"Finger Offensive",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"Range:^777777 9 cells ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 1 + Number of Spheres thrown sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Throws Spirit Spheres at enemy. Skill level affects number of spheres that can be thrown, damage is (125+25*SkillLV)% ATK using the element of your current weapon.",
		"Number of thrown Spirits equals to used SkillLV and may miss depending on normal hit probabilities. It has uninterruptible cast but Pneuma will block this skill. ^000000",
		"[LV 1]^777777 150% ATK Uses 1 Sphere ^000000",
		"[LV 2]^777777 175% ATK Uses 2 Spheres ^000000",
		"[LV 3]^777777 200% ATK Uses 3 Spheres ^000000",
		"[LV 4]^777777 225% ATK Uses 4 Spheres ^000000",
		"[LV 5]^777777 250% ATK Uses 5 Spheres ^000000",
	].join("\n");

	SkillDescription[SKID.MO_STEELBODY] = [
		"Steel Body",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 50% ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 5 sec (uninterruptible) ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 30*SkillLV sec ^000000",
		"Effect:^777777 Set Def and MDEF to 90%. ASPD is reduced by 25% and skills cannot be used. Requires 5 Spirit Spheres to use.",
		"This is DEF as from armor so damage from weapons and spells is reduced to at least 10% (with 1 VIT/INT) and even as little as 1 damage if the Monk has enough VIT/INT. ^000000",
		"[LV 1]^777777 30 sec ^000000",
		"[LV 2]^777777 60 sec ^000000",
		"[LV 3]^777777 90 sec ^000000",
		"[LV 4]^777777 120 sec ^000000",
		"[LV 5]^777777 150 sec ^000000",
	].join("\n");

	SkillDescription[SKID.MO_BLADESTOP] = [
		"Blade Stop",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 10 + 10*SkillLV sec ^000000",
		"Effect:^777777 This skill operates like the Knight's Auto Counter, but instead \"catches\" an attacker, freezing both Monk and target for a few moments.",
		"Certain skills are available for you to attack with depending on Blade Stop skill level. Both Monk and attacker are stopped until the Monk uses a skill, the Monk dies, the attacker dies, or Blade Stop's duration expires.",
		"Unlike Freeze/Stone Curse status the attacker still has all Flee and DEF. Further, if the target is a Monk who also has the Blade Stop skill then both are free to use their skills (determined by their own Blade Stop skill level).",
		"This skill can not be used to counter enemy skills. Does not work against Boss monsters. Uses up 1 Spirit Sphere. ",
		"Skill range is 1 cell for barehand and 2 cells for armed. Both characters are still able to use items and change equipment. ^000000",
		"[LV 1]^777777 None, 0.5 sec catch time ^000000",
		"[LV 2]^777777 Finger Offensive, 0.7 sec catch time ^000000",
		"[LV 3]^777777 Investigate, 0.9 sec catch time ^000000",
		"[LV 4]^777777 Chain Combo, 1.1 sec catch time ^000000",
		"[LV 5]^777777 Asura Strike (Critical Explosion, 4 Spheres needed), 1.3 sec catch time ^000000",
	].join("\n");

	SkillDescription[SKID.MO_EXPLOSIONSPIRITS] = [
		"Critical Explosion",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 15 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 180 sec ^000000",
		"Effect:^777777 Raises Critical Rate by 7.5+2.5*SkillLV for skill's duration. SP regeneration is suspended during this time. 5 Spirit Spheres required. ^000000",
		"[LV 1]^777777 +10 Critical Rate ^000000",
		"[LV 2]^777777 +12.5 Critical Rate ^000000",
		"[LV 3]^777777 +15 Critical Rate ^000000",
		"[LV 4]^777777 +17.5 Critical Rate ^000000",
		"[LV 5]^777777 +20 Critical Rate ^000000",
	].join("\n");

	SkillDescription[SKID.MO_EXTREMITYFIST] = [
		"Asura Strike",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 all ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 2 cells ^000000",
		"Cast Time:^777777 4.5 - 0.5*SkillLV sec ^000000",
		"Cool Down:^777777 3.5 - 0.5*SkillLV sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Usable only when Critical Explosion is active. Uses all SP to do massive damage to the target. Damage depends on the caster's SP amount.",
		"Consumes all Spirit Spheres. SP will not regenerate for 10 seconds after using Asura Strike",
	].join("\n");

	SkillDescription[SKID.MO_CHAINCOMBO] = [
		"Chain Combo",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 10 + SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 2 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Combo Time:^777777 1.3 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Usable only after a Triple Attack. Hits the enemy, dealing 4 powerful strikes. The Caster can not move for a short period. Damage is (150+50*SkillLV)% ATK. ^000000",
		"[LV 1]^777777 Does 200% ATK ^000000",
		"[LV 2]^777777 Does 250% ATK ^000000",
		"[LV 3]^777777 Does 300% ATK ^000000",
		"[LV 4]^777777 Does 350% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.MO_COMBOFINISH] = [
		"Combo Finish",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 10 + SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 2 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 Instant ^000000",
		"Combo Time:^777777 1.3 sec ^000000",
		"Effect:^777777 Usable only after a Chain Combo. Unleashes a final attack on the enemy. Requires 1 Spirit Sphere to use. Damage is (240+60*SkillLV)% ATK. ^000000",
		"[LV 1]^777777 Does 300% ATK ^000000",
		"[LV 2]^777777 Does 360% ATK ^000000",
		"[LV 3]^777777 Does 420% ATK ^000000",
		"[LV 4]^777777 Does 480% ATK ^000000",
		"[LV 5]^777777 Does 540% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.SA_ADVANCEDBOOK] = [
		"Advanced Book",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Raises ATK by 3 and ASPD by 0.5% per SkillLV when using book type weapons. ^000000",
		"[LV 1]^777777 ATK +3, +0.5% ASPD ^000000",
		"[LV 2]^777777 ATK +6, +1.0% ASPD ^000000",
		"[LV 3]^777777 ATK +9, +1.5% ASPD ^000000",
		"[LV 4]^777777 ATK +12, +2.0% ASPD ^000000",
		"[LV 5]^777777 ATK +15, +2.5% ASPD ^000000",
		"[LV 6]^777777 ATK +18, +3.0% ASPD ^000000",
		"[LV 7]^777777 ATK +21, +3.5% ASPD ^000000",
		"[LV 8]^777777 ATK +24, +4.0% ASPD ^000000",
		"[LV 9]^777777 ATK +27, +4.5% ASPD ^000000",
		"[LV 10]^777777 ATK +30, +5.0% ASPD ^000000",
	].join("\n");

	SkillDescription[SKID.SA_CASTCANCEL] = [
		"Cast Cancel",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 2 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Cancels your own spell before it finishes casting. SP Cost of the interrupted spell is reduced based on skill level. ^000000",
		"[LV 1]^777777 10% SP Kept ^000000",
		"[LV 2]^777777 30% SP Kept ^000000",
		"[LV 3]^777777 50% SP Kept ^000000",
		"[LV 4]^777777 70% SP Kept ^000000",
		"[LV 5]^777777 90% SP Kept ^000000",
	].join("\n");

	SkillDescription[SKID.SA_MAGICROD] = [
		"Magic Rod",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 2 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 0.2 + 0.2*SkillLV sec ^000000",
		"Effect:^777777 This skill is able to absorb skills with Cast Time and whose damage is MATK based. Does not work on Area Spells. If an enemy Sage casts Spell Breaker and is countered with Magic Rod, the enemy will take 20% damage to their SP and those SP will be given to the caster.",
		"This is like the Knight's Auto Counter, except it works on skills and not Physical attacks. The enemy skill must impact within the Active period for the counter to work, also moving ends the active period. ^000000",
		"[LV 1]^777777 0.4[s] Active Period/20% SP absorbed ^000000",
		"[LV 2]^777777 0.6[s] Active Period/40% SP absorbed ^000000",
		"[LV 3]^777777 0.8[s] Active Period/60% SP absorbed ^000000",
		"[LV 4]^777777 1.0[s] Active Period/80% SP absorbed ^000000",
		"[LV 5]^777777 1.2[s] Active Period/100% SP absorbed ^000000",
	].join("\n");

	SkillDescription[SKID.SA_SPELLBREAKER] = [
		"Spell Breaker",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 2 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 0.7 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 This skill lets you cancel any skill with Cast Time (ANY skill).",
		"When an enemy spell is canceled, the target gets 2% of its Maximum HP as damage and the Sage absorbs a percentage of the SP used for the broken spell, also if the SkillLV is 5, the sage will also absorb half the Physical damage done to the target.",
		"The success rate of this skill against Boss monsters is 10%. If this Spell is cast on an other Sage that uses Magic Rod, Magic Rod is not broken and the Spell Breaker caster loses 20% SP. ^000000",
		"[LV 1]^777777 0% SP Absorbed ^000000",
		"[LV 2]^777777 25% SP Absorbed ^000000",
		"[LV 3]^777777 50% SP Absorbed ^000000",
		"[LV 4]^777777 75% SP Absorbed ^000000",
		"[LV 5]^777777 100% SP Absorbed, 1% HP Absorbed ^000000",
	].join("\n");

	SkillDescription[SKID.SA_FREECAST] = [
		"Free Cast",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Allows movement and attack while casting spells. ",
		"Unlike claimed on official websites, this skill gives no attack speed penalty on official servers. ^000000",
		"[LV 1]^777777 30% Move Speed/55% ATK Speed ^000000",
		"[LV 2]^777777 35% Move Speed/60% ATK Speed ^000000",
		"[LV 3]^777777 40% Move Speed/65% ATK Speed ^000000",
		"[LV 4]^777777 45% Move Speed/70% ATK Speed ^000000",
		"[LV 5]^777777 50% Move Speed/75% ATK Speed ^000000",
		"[LV 6]^777777 55% Move Speed/80% ATK Speed ^000000",
		"[LV 7]^777777 60% Move Speed/85% ATK Speed ^000000",
		"[LV 8]^777777 65% Move Speed/90% ATK Speed ^000000",
		"[LV 9]^777777 70% Move Speed/95% ATK Speed ^000000",
		"[LV 10]^777777 75% Move Speed/100% ATK Speed ^000000",
	].join("\n");

	SkillDescription[SKID.SA_AUTOSPELL] = [
		"Auto Spell",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 35 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 90 + 30*SkillLV sec ^000000",
		"Effect:^777777 Every time the caster does a melee attack (which does NOT have to hit) there is a chance that he automatically casts a certain spell. The Sage must know the autocasted spell, and the SP Cost for them is 2/3 the normal cost.",
		"If a chosen skill is level 3, Auto Spell casts the skill with a level of 1 to 3 randomly with a chance of casting the level 1 version 50% of the time, the level 2 version 35% of the time, and the level 3 version 15% of the time. ^000000",
		"[LV 1]^777777 up to LV 3 Napalm Beat/7% overall autocast chance ^000000",
		"[LV 2]^777777 up to LV 1 Elemental Bolt/9% overall autocast chance ^000000",
		"[LV 3]^777777 up to LV 2 Elemental Bolt/11% overall autocast chance ^000000",
		"[LV 4]^777777 up to LV 3 Elemental Bolt/13% overall autocast chance ^000000",
		"[LV 5]^777777 up to LV 1 Soul Strike/15% overall autocast chance ^000000",
		"[LV 6]^777777 up to LV 2 Soul Strike/17% overall autocast chance ^000000",
		"[LV 7]^777777 up to LV 3 Soul Strike/20% overall autocast chance ^000000",
		"[LV 8]^777777 up to LV 1 Fire Ball/22% overall autocast chance ^000000",
		"[LV 9]^777777 LV 2 Fire Ball/23% cast chance ^000000",
		"[LV 10]^777777 LV 1 Frost Diver/25% cast chance ^000000",
	].join("\n");

	SkillDescription[SKID.SA_FLAMELAUNCHER] = [
		"Flare Launcher",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 40 ^000000",
		"Target:^777777 Ally ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 20 min, 30 min at LV 5 ^000000",
		"Effect:^777777 Enchants a weapon with the fire element. There is a chance of weapon breakage upon enchantment. You will need a Blacksmith or a Repair NPC to repair the weapon.",
		"Requires^ee0000 1 Red Blood^777777 to use. ^000000",
		"[LV 1]^777777 70% Chance to Work ^000000",
		"[LV 2]^777777 80% Chance to Work ^000000",
		"[LV 3]^777777 90% Chance to Work ^000000",
		"[LV 4]^777777 100% Chance to Work ^000000",
		"[LV 5]^777777 100% Chance to Work, 30 min duration ^000000",
	].join("\n");

	SkillDescription[SKID.SA_FROSTWEAPON] = [
		"Frost Weapon",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 40 ^000000",
		"Target:^777777 Ally ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 20 min, 30 min at LV 5 ^000000",
		"Effect:^777777 Enchants a weapon with the ice element. There is a chance of weapon breakage upon enchantment. You will need a Blacksmith or a Repair NPC to repair the weapon.",
		"Requires^0000ff 1 Crystal Blue^777777 to use. ^000000",
		"[LV 1]^777777 70% Chance to Work ^000000",
		"[LV 2]^777777 80% Chance to Work ^000000",
		"[LV 3]^777777 90% Chance to Work ^000000",
		"[LV 4]^777777 100% Chance to Work ^000000",
		"[LV 5]^777777 100% Chance to Work, 30 min duration ^000000",
	].join("\n");

	SkillDescription[SKID.SA_LIGHTNINGLOADER] = [
		"Lightning Loader",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 40 ^000000",
		"Target:^777777 Ally ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 20 min, 30 min at LV 5 ^000000",
		"Effect:^777777 Enchants a weapon with the wind element. There is a chance of weapon breakage upon enchantment. You will need a Blacksmith or a Repair NPC to repair the weapon.",
		"Requires^ffff00 1 Wind of Verdure^777777 to use. ^000000",
		"[LV 1]^777777 70% Chance to Work ^000000",
		"[LV 2]^777777 80% Chance to Work ^000000",
		"[LV 3]^777777 90% Chance to Work ^000000",
		"[LV 4]^777777 100% Chance to Work ^000000",
		"[LV 5]^777777 100% Chance to Work, 30 min duration ^000000",
	].join("\n");

	SkillDescription[SKID.SA_SEISMICWEAPON] = [
		"Seismic Weapon",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 40 ^000000",
		"Target:^777777 Ally ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 20 min, 30 min at LV 5 ^000000",
		"Effect:^777777 Enchants a weapon with the earth element. There is a chance of weapon breakage upon enchantment. You will need a Blacksmith or a Repair NPC to repair the weapon.",
		"Requires^00bb00 1 Green Live^777777 to use. ^000000",
		"[LV 1]^777777 70% Chance to Work ^000000",
		"[LV 2]^777777 80% Chance to Work ^000000",
		"[LV 3]^777777 90% Chance to Work ^000000",
		"[LV 4]^777777 100% Chance to Work ^000000",
		"[LV 5]^777777 100% Chance to Work, 30 min duration ^000000",
	].join("\n");

	SkillDescription[SKID.SA_DRAGONOLOGY] = [
		"Dragonology",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases Attack Power, MATK and DEF against Dragon type monsters by 4% per SkillLV. Also passively increases your INT depending on SkillLV. ^000000",
		"[LV 1]^777777 +4% MATK and DEF, +1 INT ^000000",
		"[LV 2]^777777 +8% MATK and DEF, +1 INT ^000000",
		"[LV 3]^777777 +12% MATK and DEF, +2 INT ^000000",
		"[LV 4]^777777 +16% MATK and DEF, +2 INT ^000000",
		"[LV 5]^777777 +20% MATK and DEF, +3 INT ^000000",
	].join("\n");

	SkillDescription[SKID.SA_VOLCANO] = [
		"Volcano",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active, Area Enchantment ^000000",
		"SP Cost:^777777 50 - 2*SkillLV ^000000",
		"Range:^777777 2 cells ^000000",
		"Target:^777777 7x7 cells Area ^000000",
		"Cast Time:^777777 5 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 SkillLV min ^000000",
		"Effect:^777777 This skill enchants an area and buffs up all Fire elemental attacks inside of it and the attacks of those who are Fire elemental, i.e. wearing Pasana carded armor.",
		"This skill (like the others) cannot be cast over one another or double cast on top of it. You can only have one area enchantment out. Ice Wall can't be cast on a Volcano. It will last 1*SkillLV minutes.",
		"The skill level determines the % Fire elemental attacks get amplified, the amount of ATK Fire elemental armor wearers get. Requires^ffff00 1 Yellow Gemstone^777777 to use. ^000000",
		"[LV 1]^777777 +10% DMG for Fire Attacks/+10 ATK for Fire armor wearer ^000000",
		"[LV 2]^777777 +14% DMG for Fire Attacks/+20 ATK for Fire armor wearer ^000000",
		"[LV 3]^777777 +17% DMG for Fire Attacks/+30 ATK for Fire armor wearer ^000000",
		"[LV 4]^777777 +19% DMG for Fire Attacks/+40 ATK for Fire armor wearer ^000000",
		"[LV 5]^777777 +20% DMG for Fire Attacks/+50 ATK for Fire armor wearer ^000000",
	].join("\n");

	SkillDescription[SKID.SA_DELUGE] = [
		"Deluge",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active, Area Enchantment ^000000",
		"SP Cost:^777777 50 - 2*SkillLV ^000000",
		"Range:^777777 2 cells ^000000",
		"Target:^777777 7x7 cells Area ^000000",
		"Cast Time:^777777 5 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 SkillLV min ^000000",
		"Effect:^777777 In the area of effect all Water elemental attacks are amplified and the Maximum HP of anyone who is wearing water armor (i.e. Swordfish carded) is increased. You can only have one area enchantment out.",
		"Waterball and Aqua Benedicta can be cast on a Deluge. Also note that using these skills on Deluge will deplete the cells of water in it. This skill (like the others) cannot be cast over one another or double cast on top of itself.",
		"Ice Wall cannot be cast on a Deluge. Requires^ffff00 1 Yellow Gemstone^777777 to use. ^000000",
		"[LV 1]^777777 +10% DMG from Water Attacks/+5% Maximum HP for Water Armor ^000000",
		"[LV 2]^777777 +14% DMG from Water Attacks/+9% Maximum HP for Water Armor ^000000",
		"[LV 3]^777777 +17% DMG from Water Attacks/+12% Maximum HP for Water Armor ^000000",
		"[LV 4]^777777 +19% DMG from Water Attacks/+14% Maximum HP for Water Armor ^000000",
		"[LV 5]^777777 +20% DMG from Water Attacks/+15% Maximum HP for Water Armor ^000000",
	].join("\n");

	SkillDescription[SKID.SA_VIOLENTGALE] = [
		"Violent Gale",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active, Area Enchantment ^000000",
		"SP Cost:^777777 50 - 2*SkillLV ^000000",
		"Target:^777777 7x7 cells Area ^000000",
		"Range:^777777 2 cells ^000000",
		"Cast Time:^777777 5 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 SkillLV min ^000000",
		"Effect:^777777 In a Violent Gale, all Wind elemental attacks get amplified and the Flee Rate of Wind elemental players (i.e. Dokebi carded armor wearers) is increased. Also, Fire Wall lasts 150% longer in a Violent Gale.",
		"You can't cast Ice Wall on a Violent Gale. You can only have one area enchantment out. This skill (like the others) cannot be cast over one another or double cast on top of itself. Requires^ffff00 1 Yellow Gemstone^777777 to use. ^000000",
		"[LV 1]^777777 +10% DMG for Wind Attacks/+3 Flee Rate for Wind Armor ^000000",
		"[LV 2]^777777 +14% DMG for Wind Attacks/+6 Flee Rate for Wind Armor ^000000",
		"[LV 3]^777777 +17% DMG for Wind Attacks/+8 Flee Rate for Wind Armor ^000000",
		"[LV 4]^777777 +19% DMG for Wind Attacks/+12 Flee Rate for Wind Armor ^000000",
		"[LV 5]^777777 +20% DMG for Wind Attacks/+15 Flee Rate for Wind Armor ^000000",
	].join("\n");

	SkillDescription[SKID.SA_LANDPROTECTOR] = [
		"Land Protector",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active, Area Enchantment ^000000",
		"SP Cost:^777777 70 - 4*SkillLV ^000000",
		"Target:^777777 Ground ^000000",
		"Range:^777777 3 cells ^000000",
		"Cast Time:^777777 5 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 120 + 45*SkillLV sec ^000000",
		"Area:^777777 See below ^000000",
		"Effect:^777777 Shields an area from all area spells. Any skills that target the ground do not deal damage or do their effect. Skills such as Storm Gust, Fire Wall, etc. will do nothing.",
		"Also removes any area spells already placed in the area. Requires^ffff00 1 Yellow Gemstone^777777 and^0000ff 1 Blue Gemstone^777777 to use. ^000000",
		"[LV 1]^777777 Area 7x7 cells ^000000",
		"[LV 2]^777777 Area 7x7 cells ^000000",
		"[LV 3]^777777 Area 9x9 cells ^000000",
		"[LV 4]^777777 Area 9x9 cells ^000000",
		"[LV 5]^777777 Area 11x11 cells ^000000",
	].join("\n");

	SkillDescription[SKID.SA_DISPELL] = [
		"Dispell",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 As casted spell ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Cancel all magical effects on target. Success chance based on skill level and enemy MDEF with a base chance of (50+10*SkillLV)%. Requires^ffff00 1 Yellow Gemstone^777777 to use. ^000000",
		"[LV 1]^777777 60% Base Success Rate ^000000",
		"[LV 2]^777777 70% Base Success Rate ^000000",
		"[LV 3]^777777 80% Base Success Rate ^000000",
		"[LV 4]^777777 90% Base Success Rate ^000000",
		"[LV 5]^777777 100% Base Success Rate ^000000",
	].join("\n");

	SkillDescription[SKID.SA_ABRACADABRA] = [
		"Abracadabra",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Random ^000000",
		"Target:^777777 Random ^000000",
		"SP Cost:^777777 50 ^000000",
		"Cast Time:^777777 As casted spell ^000000",
		"Cool Down:^777777 As casted spell ^000000",
		"Duration:^777777 As casted spell ^000000",
		"Effect:^777777 Casts a random skill (can be ANY player skill e.g. Auto Counter or Hide and some special skills) at your own skill level. May produce some odd and funny effects.",
		"Requires^ffff00 2 Yellow Gemstones^777777 to use, and anything the produced skill would require e.g. Trap, Blue Gem or Red Gem. The produced skill will change in a random pattern with each cast.",
		"Even with catalyst reducing items (Mistress Card) or buffs (Bard/Dancer Into the Abyss) the cost will not drop below^ffff00 1 Yellow Gemstone^777777. A For-Fun-Skill. ^000000",
	].join("\n");

	SkillDescription[SKID.SA_MONOCELL] = [
		"Monocell",
		"Type:^33cc00 Active ^000000",
		"Target:^777777 Enemy ^000000",
		"Effect:^777777 Change enemy into a Poring. Success chance based on skill level. ^000000",
	].join("\n");

	SkillDescription[SKID.SA_CLASSCHANGE] = [
		"Class Change",
		"Type:^33cc00 Active ^000000",
		"Target:^777777 Enemy ^000000",
		"Effect:^777777 Change an enemy into a Boss monster. Success chance is based on caster BaseLV. ^000000",
	].join("\n");

	SkillDescription[SKID.SA_SUMMONMONSTER] = [
		"Summon Monster",
		"Type:^33cc00 Active ^000000",
		"Target:^777777 Cell ^000000",
		"Effect:^777777 Summons a random monster, as per Dead Branch. ^000000",
	].join("\n");

	SkillDescription[SKID.SA_REVERSEORCISH] = [
		"Reverse Orcish",
		"Type:^33cc00 Active ^000000",
		"Target:^777777 Player ^000000",
		"Effect:^777777 Changes head of another player to that of an Orc. ^000000",
	].join("\n");

	SkillDescription[SKID.SA_DEATH] = [
		"Death",
		"Type:^33cc00 Active ^000000",
		"Target:^777777 Enemy ^000000",
		"Effect:^777777 Kill enemy instantly, with no item drop or experience gain. Success chance based on skill level. ^000000",
	].join("\n");

	SkillDescription[SKID.SA_FORTUNE] = [
		"Fortune",
		"Type:^33cc00 Active ^000000",
		"Target:^777777 Enemy ^000000",
		"Effect:^777777 It gets the LV of the Target * the Zeny as of 100 ^000000",
	].join("\n");

	SkillDescription[SKID.SA_TAMINGMONSTER] = [
		"Taming Monster",
		"Type:^33cc00 Active ^000000",
		"Target:^777777 Enemy ^000000",
		"Effect:^777777 Tame monster as if a taming item was used on it. ^000000",
	].join("\n");

	SkillDescription[SKID.SA_QUESTION] = [
		"Question",
		"Type:^33cc00 Active ^000000",
		"Target:^777777 Enemy ^000000",
		"Effect:^777777 Create a ? emote above monster's head ^000000",
	].join("\n");

	SkillDescription[SKID.SA_GRAVITY] = [
		"Gravity",
		"Type:^33cc00 Active ^000000",
		"Target:^777777 Self ^000000",
		"Effect:^777777 Create a Drop Emote above caster's head. ^000000",
	].join("\n");

	SkillDescription[SKID.SA_LEVELUP] = [
		"Level Up",
		"Type:^33cc00 Active ^000000",
		"Target:^777777 Self ^000000",
		"Effect:^777777 Gain a level. ^000000",
	].join("\n");

	SkillDescription[SKID.SA_INSTANTDEATH] = [
		"Instant Death",
		"Type:^33cc00 Active ^000000",
		"Target:^777777 Self ^000000",
		"Effect:^777777 Commit suicide. Experience is lost as normal. ^000000",
	].join("\n");

	SkillDescription[SKID.SA_FULLRECOVERY] = [
		"Full Recovery",
		"Type:^33cc00 Active ^000000",
		"Target:^777777 Self ^000000",
		"Effect:^777777 Recover all HP and SP, and stop any abnormal status effects. ^000000",
	].join("\n");

	SkillDescription[SKID.SA_COMA] = [
		"Coma",
		"Type:^33cc00 Active ^000000",
		"Target:^777777 Self ^000000",
		"Effect:^777777 Drop to 1 HP and SP. ^000000",
	].join("\n");

	SkillDescription[SKID.BD_ADAPTATION] = [
		"Adaptation to Circumstances",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 1 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Cancels a current song or dance. The same song may not be performed again immediately. ^000000",
	].join("\n");

	SkillDescription[SKID.BD_ENCORE] = [
		"Encore",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 See below ^000000",
		"Cast Time:^777777 depends on last used skill ^000000",
		"Cool Down:^777777 depends on last used skill ^000000",
		"Effect:^777777 Performs the last song or dance again at half SP cost. ^000000",
	].join("\n");

	SkillDescription[SKID.BD_LULLABY] = [
		"Lullaby",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Ensemble ^000000",
		"SP Cost:^777777 20 ^000000",
		"Upkeep:^777777 1 SP every 4 sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 9x9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 60 sec ^000000",
		"Effect:^777777 Casts sleep on all enemies within area of effect. Effect will occur every 6 seconds for 60 seconds (11 times) and is affected by INT of the caster, but it has a chance to fail depending on resistances. Cannot be canceled by Dispell. ^000000",
	].join("\n");

	SkillDescription[SKID.BD_RICHMANKIM] = [
		"Mr. Kim A Rich Man",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Ensemble ^000000",
		"SP Cost:^777777 20 ^000000",
		"Upkeep:^777777 1 SP every 3 sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 9x9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 60 sec ^000000",
		"Effect:^777777 Increases gained exp from mobs killed within the area of effect by (125+11*SkillLV)%. Cannot be canceled by Dispell. ^000000",
		"[LV 1]^777777 +136% Experience Rate ^000000",
		"[LV 2]^777777 +147% Experience Rate ^000000",
		"[LV 3]^777777 +158% Experience Rate ^000000",
		"[LV 4]^777777 +169% Experience Rate ^000000",
		"[LV 5]^777777 +180% Experience Rate ^000000",
	].join("\n");

	SkillDescription[SKID.BD_ETERNALCHAOS] = [
		"Eternal Chaos",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Ensemble ^000000",
		"SP Cost:^777777 30 ^000000",
		"Upkeep:^777777 1 SP every 4 sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 9x9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 60 sec ^000000",
		"Effect:^777777 Reduces the DEF of enemies to 0 within the area of effect. Cannot be canceled by Dispell. ^000000",
	].join("\n");

	SkillDescription[SKID.BD_DRUMBATTLEFIELD] = [
		"A Drum on the Battlefield",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Ensemble ^000000",
		"SP Cost:^777777 35 + 3*SkillLV ^000000",
		"Upkeep:^777777 1 SP every 3 sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 9x9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 60 sec ^000000",
		"Effect:^777777 Increase ATK by 25+25*SkillLV and DEF by 2+2*SkillLV of all party members within area of effect. Cannot be canceled by Dispell. ^000000",
		"[LV 1]^777777 +50 ATK, +4 DEF ^000000",
		"[LV 2]^777777 +75 ATK, +6 DEF ^000000",
		"[LV 3]^777777 +100 ATK, +8 DEF ^000000",
		"[LV 4]^777777 +125 ATK, +10 DEF ^000000",
		"[LV 5]^777777 +150 ATK, +12 DEF ^000000",
	].join("\n");

	SkillDescription[SKID.BD_RINGNIBELUNGEN] = [
		"The Ring of Nibelungen",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Ensemble ^000000",
		"SP Cost:^777777 35 + 3*SkillLV ^000000",
		"Upkeep:^777777 1 SP every 3 sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 9x9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Sustained ^000000",
		"Effect:^777777 Increases damage of all Level 4 Weapons within area of effect by DEF-ignoring +50+25*SkillLV. Cannot be canceled by Dispell. ^000000",
		"[LV 1]^777777 +75 Damage ^000000",
		"[LV 2]^777777 +100 Damage ^000000",
		"[LV 3]^777777 +125 Damage ^000000",
		"[LV 4]^777777 +150 Damage ^000000",
		"[LV 5]^777777 +175 Damage ^000000",
	].join("\n");

	SkillDescription[SKID.BD_ROKISWEIL] = [
		"Loki's Veil",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Ensemble ^000000",
		"SP Cost:^777777 15 ^000000",
		"Upkeep:^777777 1 SP every 4 sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 9x9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 60 sec ^000000",
		"Effect:^777777 Blocks all skill use for everything (including players) within area of effect. Can not be canceled by Dispell. Does not work against Boss monsters. ^000000",
	].join("\n");

	SkillDescription[SKID.BD_INTOABYSS] = [
		"Into the Abyss",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Ensemble ^000000",
		"SP Cost:^777777 10 ^000000",
		"Upkeep:^777777 1 SP every 5 sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 9x9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 60 sec ^000000",
		"Effect:^777777 All party members within the area of effect are able to cast spells without gemstones and lay traps without using an item. Cannot be canceled by Dispell. ^000000",
	].join("\n");

	SkillDescription[SKID.BD_SIEGFRIED] = [
		"Invulnerable Siegfried",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Ensemble ^000000",
		"SP Cost:^777777 20 ^000000",
		"Upkeep:^777777 1 SP every 3 sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 9x9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 60 sec ^000000",
		"Effect:^777777 Increases resistance against elemental attacks and status ailments for all players in area of effect. Cannot be canceled by Dispell. ^000000",
		"[LV 1]^777777 Elemental 60%, Ailments 10% ^000000",
		"[LV 2]^777777 Elemental 65%, Ailments 20% ^000000",
		"[LV 3]^777777 Elemental 70%, Ailments 30% ^000000",
		"[LV 4]^777777 Elemental 75%, Ailments 40% ^000000",
		"[LV 5]^777777 Elemental 80%, Ailments 50% ^000000",
	].join("\n");

	SkillDescription[SKID.BD_RAGNAROK] = [
		"Ragnarok",
		"^ee0000This skill has been dropped by Gravity. ^000000",
		"No info, supposed to cast random area skill and affect players and monsters alike.",
	].join("\n");

	SkillDescription[SKID.BA_MUSICALLESSON] = [
		"Musical Lesson",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Raises Attack Power of instruments by 3 per SkillLV, and increases effects of songs. This skill also partially counters the walking speed reduction while performing. ^000000",
		"[LV 1]^777777 ATK +3 ^000000",
		"[LV 2]^777777 ATK +6 ^000000",
		"[LV 3]^777777 ATK +9 ^000000",
		"[LV 4]^777777 ATK +12 ^000000",
		"[LV 5]^777777 ATK +15 ^000000",
		"[LV 6]^777777 ATK +18 ^000000",
		"[LV 7]^777777 ATK +21 ^000000",
		"[LV 8]^777777 ATK +24 ^000000",
		"[LV 9]^777777 ATK +27 ^000000",
		"[LV 10]^777777 ATK +30 ^000000",
	].join("\n");

	SkillDescription[SKID.BA_MUSICALSTRIKE] = [
		"Musical Strike",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 2*SkillLV - 1 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 1.5 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Fires a powerful arrow at the enemy, and may be used during songs. Element type of attack is dependent on equipped arrows. ATK increase is (125+25*SkillLV)%. ^000000",
		"[LV 1]^777777 +150% ATK ^000000",
		"[LV 2]^777777 +175% ATK ^000000",
		"[LV 3]^777777 +200% ATK ^000000",
		"[LV 4]^777777 +225% ATK ^000000",
		"[LV 5]^777777 +250% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.BA_DISSONANCE] = [
		"Dissonance",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 15 + 3*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 7x7 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Upkeep:^777777 1 SP every 3 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 30 sec ^000000",
		"Effect:^777777 Hits enemies in area with a slow sonic attack, piercing their defense. Deals 30+10*SkillLV damage every 3 seconds for 30 seconds (11 attacks). Also occurs where two Bard songs overlap. ^000000",
		"[LV 1]^777777 40 ATK ^000000",
		"[LV 2]^777777 50 ATK ^000000",
		"[LV 3]^777777 60 ATK ^000000",
		"[LV 4]^777777 70 ATK ^000000",
		"[LV 5]^777777 80 ATK ^000000",
	].join("\n");

	SkillDescription[SKID.BA_FROSTJOKE] = [
		"Frost Joker",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 + 2*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 Caster's View ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 3 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Causes frozen status on everything (including players) within the area of effect. In PvP or Guild siege area, this skill works on caster as well. Freezing chance (15+5*SkillLV)%. ^000000",
		"[LV 1]^777777 20% Chance to Freeze ^000000",
		"[LV 2]^777777 25% Chance to Freeze ^000000",
		"[LV 3]^777777 30% Chance to Freeze ^000000",
		"[LV 4]^777777 35% Chance to Freeze ^000000",
		"[LV 5]^777777 40% Chance to Freeze ^000000",
	].join("\n");

	SkillDescription[SKID.BA_WHISTLE] = [
		"A Whistle",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 + 4*SkillLV ^000000",
		"Upkeep:^777777 1 SP every 5 sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 7x7 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 60 sec ^000000",
		"Effect:^777777 Raises Flee Rate by SkillLV and Perfect Dodge by SkillLV/2 rounded down of all players in the area of effect.",
		"The Flee Rate is affected by AGI, and Musical Lesson skill of the caster. The Perfect Dodge rate is affected by LUK, and Musical Lesson of the caster. ^000000",
		"[LV 1]^777777 +1 Flee Rate & 1 Perfect Dodge ^000000",
		"[LV 2]^777777 +2 Flee Rate & 1 Perfect Dodge ^000000",
		"[LV 3]^777777 +3 Flee Rate & 2 Perfect Dodge ^000000",
		"[LV 4]^777777 +4 Flee Rate & 2 Perfect Dodge ^000000",
		"[LV 5]^777777 +5 Flee Rate & 3 Perfect Dodge ^000000",
		"[LV 6]^777777 +6 Flee Rate & 3 Perfect Dodge ^000000",
		"[LV 7]^777777 +7 Flee Rate & 4 Perfect Dodge ^000000",
		"[LV 8]^777777 +8 Flee Rate & 4 Perfect Dodge ^000000",
		"[LV 9]^777777 +9 Flee Rate & 5 Perfect Dodge ^000000",
		"[LV 10]^777777 +10 Flee Rate & 5 Perfect Dodge ^000000",
	].join("\n");

	SkillDescription[SKID.BA_ASSASSINCROSS] = [
		"BA_ASSASSINCROSS#",
		"Assassin Cross of Sunset",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 35 + 3*SkillLV ^000000",
		"Upkeep:^777777 1 SP every 3 sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 7x7 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 120 sec ^000000",
		"Effect:^777777 Increases attack rate of all players in the area of effect by (10+SkillLV)%. Sacks with Speed Potions but not with Adrenaline Rush or Weapon Quicken. ^000000",
		"[LV 1]^777777 +11% ASPD ^000000",
		"[LV 2]^777777 +12% ASPD ^000000",
		"[LV 3]^777777 +13% ASPD ^000000",
		"[LV 4]^777777 +14% ASPD ^000000",
		"[LV 5]^777777 +15% ASPD ^000000",
		"[LV 6]^777777 +16% ASPD ^000000",
		"[LV 7]^777777 +17% ASPD ^000000",
		"[LV 8]^777777 +18% ASPD ^000000",
		"[LV 9]^777777 +19% ASPD ^000000",
		"[LV 10]^777777 +20% ASPD ^000000",
	].join("\n");

	SkillDescription[SKID.BA_POEMBRAGI] = [
		"A Poem of Bragi",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 35 + 5*SkillLV ^000000",
		"Upkeep:^777777 1 SP every 5 sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 7x7 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 180 sec ^000000",
		"Effect:^777777 Reduces casting time by 3% per SkillLV and Cool Down by 5% per SkillLV (on LV10 - 50%) of all spells used in the area of effect.",
		"The amount of casting time reduced by this skill is affected by DEX and Musical Lesson skill level of the caster. The amount of delay after skill use is affected by INT and Musical Lesson skill level of the caster. Suffragium, the Priest skill, doesn't associate in this skill. ^000000",
		"[LV 1]^777777 3% Faster Cast & 3% Less Delay ^000000",
		"[LV 2]^777777 6% Faster Cast & 6% Less Delay ^000000",
		"[LV 3]^777777 9% Faster Cast & 9% Less Delay ^000000",
		"[LV 4]^777777 12% Faster Cast & 12% Less Delay ^000000",
		"[LV 5]^777777 15% Faster Cast & 15% Less Delay ^000000",
		"[LV 6]^777777 18% Faster Cast & 18% Less Delay ^000000",
		"[LV 7]^777777 21% Faster Cast & 21% Less Delay ^000000",
		"[LV 8]^777777 24% Faster Cast & 24% Less Delay ^000000",
		"[LV 9]^777777 27% Faster Cast & 27% Less Delay ^000000",
		"[LV 10]^777777 30% Faster Cast & 50% Less Delay ^000000",
	].join("\n");

	SkillDescription[SKID.BA_APPLEIDUN] = [
		"The Apple of Idun",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 35 + 5*SkillLV ^000000",
		"Upkeep:^777777 1 SP every 6 sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 7x7 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 180 sec ^000000",
		"Effect:^777777 Increases Maximum HP of all players in the area by (5+2*SkillLV)%. Also creates a healing zone, restoring 30+5*SkillLV HP every 6 seconds in the area of effect for up to 3 minutes (31 times total). ^000000",
		"[LV 1]^777777 + 7% Maximum HP & Heals 35HP ^000000",
		"[LV 2]^777777 + 9% Maximum HP & Heals 40HP ^000000",
		"[LV 3]^777777 + 11% Maximum HP & Heals 45HP ^000000",
		"[LV 4]^777777 + 13% Maximum HP & Heals 50HP ^000000",
		"[LV 5]^777777 + 15% Maximum HP & Heals 55HP ^000000",
		"[LV 6]^777777 + 17% Maximum HP & Heals 60HP ^000000",
		"[LV 7]^777777 + 19% Maximum HP & Heals 65HP ^000000",
		"[LV 8]^777777 + 21% Maximum HP & Heals 70HP ^000000",
		"[LV 9]^777777 + 23% Maximum HP & Heals 75HP ^000000",
		"[LV 10]^777777 + 25% Maximum HP & Heals 80HP ^000000",
	].join("\n");

	SkillDescription[SKID.DC_DANCINGLESSON] = [
		"Dancing Lesson",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases whip type weapon damage and effectiveness of dancing skills by 3 per SkillLV. This skill also partially counters the walking speed reduction while performing. ^000000",
		"[LV 1]^777777 ATK +3 ^000000",
		"[LV 2]^777777 ATK +6 ^000000",
		"[LV 3]^777777 ATK +9 ^000000",
		"[LV 4]^777777 ATK +12 ^000000",
		"[LV 5]^777777 ATK +15 ^000000",
		"[LV 6]^777777 ATK +18 ^000000",
		"[LV 7]^777777 ATK +21 ^000000",
		"[LV 8]^777777 ATK +24 ^000000",
		"[LV 9]^777777 ATK +27 ^000000",
		"[LV 10]^777777 ATK +30 ^000000",
	].join("\n");

	SkillDescription[SKID.DC_THROWARROW] = [
		"Throw Arrow",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 2*SkillLV - 1 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 1.5 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Allows the dancer to throw an arrow with her whip as if she were firing it from a bow. May use other dancing skills in conjunction with this skill. The element of the attack depends on the equipped arrows. ATK increase is (125+25*SkillLV)%. ^000000",
		"[LV 1]^777777 +150% ATK ^000000",
		"[LV 2]^777777 +175% ATK ^000000",
		"[LV 3]^777777 +200% ATK ^000000",
		"[LV 4]^777777 +225% ATK ^000000",
		"[LV 5]^777777 +250% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.DC_UGLYDANCE] = [
		"Ugly Dance",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 + 3*SkillLV ^000000",
		"Upkeep:^777777 1 SP every 3 sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 7x7 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 30 sec ^000000",
		"Effect:^777777 Drains SP from enemies in the area of effect. Drains 5+5*SkillLV SP every 3 seconds (11 times total). Also occurs where two Dances overlap. ^000000",
		"[LV 1]^777777 Drains 10 SP per 3 sec ^000000",
		"[LV 2]^777777 Drains 15 SP per 3 sec ^000000",
		"[LV 3]^777777 Drains 20 SP per 3 sec ^000000",
		"[LV 4]^777777 Drains 25 SP per 3 sec ^000000",
		"[LV 5]^777777 Drains 30 SP per 3 sec ^000000",
	].join("\n");

	SkillDescription[SKID.DC_SCREAM] = [
		"Scream",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 + 2*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 Caster's View ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 3 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Inflicts everything (including players) with stun within area of effect. In PvP or Guild siege area, this skill works on caster as well. Stun chance is (25+5*SkillLV)% and the duration is 5 seconds. ^000000",
		"[LV 1]^777777 30% Chance to Stun ^000000",
		"[LV 2]^777777 35% Chance to Stun ^000000",
		"[LV 3]^777777 40% Chance to Stun ^000000",
		"[LV 4]^777777 45% Chance to Stun ^000000",
		"[LV 5]^777777 50% Chance to Stun ^000000",
	].join("\n");

	SkillDescription[SKID.DC_HUMMING] = [
		"Humming",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 + 2*SkillLV ^000000",
		"Upkeep:^777777 1 SP every 5 sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 7x7 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 60 sec ^000000",
		"Effect:^777777 Increase HIT of players in the area of effect by +2 per SkillLV.",
		"The accuracy rate increased by this skill is affected by Dancing Lesson skill level and DEX of the caster. ^000000",
		"[LV 1]^777777 +2 HIT ^000000",
		"[LV 2]^777777 +4 HIT ^000000",
		"[LV 3]^777777 +6 HIT ^000000",
		"[LV 4]^777777 +8 HIT ^000000",
		"[LV 5]^777777 +10 HIT ^000000",
		"[LV 6]^777777 +12 HIT ^000000",
		"[LV 7]^777777 +14 HIT ^000000",
		"[LV 8]^777777 +16 HIT ^000000",
		"[LV 9]^777777 +18 HIT ^000000",
		"[LV 10]^777777 +20 HIT ^000000",
	].join("\n");

	SkillDescription[SKID.DC_DONTFORGETME] = [
		"Please Don't Forget Me",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 25 + 3*SkillLV ^000000",
		"Upkeep:^777777 1 SP every 10 sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 7x7 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 180 sec ^000000",
		"Effect:^777777 Decreases ASPD by 3% per SkillLV and Movement rate by 2% per SkillLV of all enemies in the area of effect.",
		"Cancels any skills that increase movement or ASPD. The amount of ASPD decreased by this skill is affected by Dancing Lesson skill level and STR of the caster.",
		"The amount of moving speed decreased by this skill is affected by Dancing Lesson skill level and AGI of the caster. ^000000",
		"[LV 1]^777777 -2% Move SPD & -3% Attack SPD ^000000",
		"[LV 2]^777777 -4% Move SPD & -6% Attack SPD ^000000",
		"[LV 3]^777777 -6% Move SPD & -9% Attack SPD ^000000",
		"[LV 4]^777777 -8% Move SPD & -12% Attack SPD ^000000",
		"[LV 5]^777777 -10% Move SPD & -15% Attack SPD ^000000",
		"[LV 6]^777777 -12% Move SPD & -18% Attack SPD ^000000",
		"[LV 7]^777777 -14% Move SPD & -21% Attack SPD ^000000",
		"[LV 8]^777777 -16% Move SPD & -24% Attack SPD ^000000",
		"[LV 9]^777777 -18% Move SPD & -27% Attack SPD ^000000",
		"[LV 10]^777777 -20% Move SPD & -30% Attack SPD ^000000",
	].join("\n");

	SkillDescription[SKID.DC_FORTUNEKISS] = [
		"Fortune's Kiss",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 40 + 3*SkillLV ^000000",
		"Upkeep:^777777 1 SP every 4 sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 7x7 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 120 sec ^000000",
		"Effect:^777777 Increases Critical Rate of all players in the area of effect by 1% per SkillLV.",
		"The amount of Critical Rate increased by this skill is affected by Dancing Lesson skill level and LUK of the caster. ^000000",
		"[LV 1]^777777 +1% Critical Rate ^000000",
		"[LV 2]^777777 +2% Critical Rate ^000000",
		"[LV 3]^777777 +3% Critical Rate ^000000",
		"[LV 4]^777777 +4% Critical Rate ^000000",
		"[LV 5]^777777 +5% Critical Rate ^000000",
		"[LV 6]^777777 +6% Critical Rate ^000000",
		"[LV 7]^777777 +7% Critical Rate ^000000",
		"[LV 8]^777777 +8% Critical Rate ^000000",
		"[LV 9]^777777 +9% Critical Rate ^000000",
		"[LV 10]^777777 +10% Critical Rate ^000000",
	].join("\n");

	SkillDescription[SKID.DC_SERVICEFORYOU] = [
		"Service for You",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 35 + 5*SkillLV ^000000",
		"Upkeep:^777777 1 SP every 5 sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 7x7 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 180 sec ^000000",
		"Effect:^777777 Increase Maximum SP of all players in the area of effect by (15+SkillLV)%. Reduces consumption of all skills within area of effect by (20+3*SkillLV)%.",
		"The amount of Maximum SP increased by this skill is affected by Dancing Lesson skill and INT of the caster.",
		"The amount of SP consumption reduced by this skill is affected by Dancing Lesson skill and INT of the caster. ^000000",
		"[LV 1]^777777 + 16% Maximum SP & 23% Less SP Usage ^000000",
		"[LV 2]^777777 + 17% Maximum SP & 26% Less SP Usage ^000000",
		"[LV 3]^777777 + 18% Maximum SP & 29% Less SP Usage ^000000",
		"[LV 4]^777777 + 19% Maximum SP & 32% Less SP Usage ^000000",
		"[LV 5]^777777 + 20% Maximum SP & 35% Less SP Usage ^000000",
		"[LV 6]^777777 + 21% Maximum SP & 38% Less SP Usage ^000000",
		"[LV 7]^777777 + 22% Maximum SP & 41% Less SP Usage ^000000",
		"[LV 8]^777777 + 23% Maximum SP & 44% Less SP Usage ^000000",
		"[LV 9]^777777 + 24% Maximum SP & 47% Less SP Usage ^000000",
		"[LV 10]^777777 + 25% Maximum SP & 50% Less SP Usage ^000000",
	].join("\n");

	SkillDescription[SKID.WE_MALE] = [
		"I'll save you",
		"Type:^777777 Wedding Skill ^000000",
		"Restores HP of one's partner by consuming 10% of one's total HP amount.",
		"Partner must have at least 10% of his HP in order to cast this skill.",
	].join("\n");

	SkillDescription[SKID.WE_FEMALE] = [
		"I'll sacrifice myself for you",
		"Type:^777777 Wedding Skill ^000000",
		"Restores SP of one's partner by consuming 10% of one's total SP amount.",
		"Partner must have at least 10% of his SP in order to cast this skill.",
	].join("\n");

	SkillDescription[SKID.WE_CALLPARTNER] = [
		"I miss you",
		"Type:^777777 Wedding Skill ^000000",
		"Summons one's marital partner to caster's location.",
		"Both partners must equip their Wedding Rings to activate this skill.",
		"It might not be possible to use this skill in some places such as Guild Siege maps.",
	].join("\n");

	SkillDescription[SKID.ITM_TOMAHAWK] = [
		"Throw Tomahawk",
		"Effect:^777777 Enable use of the Skill Throw Tomahawk. ^000000",
	].join("\n");

	SkillDescription[SKID.LK_AURABLADE] = [
		"Aura Blade",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 10 + 8*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 20 + 20*SkillLV sec ^000000",
		"Effect:^777777 Creates a special aura around the weapon that increases damage and ignores the targets DEF, but not his Flee. ^000000",
		"[LV 1]^777777 ATK +20, 40 Sec Duration ^000000",
		"[LV 2]^777777 ATK +40, 60 Sec Duration ^000000",
		"[LV 3]^777777 ATK +60, 80 Sec Duration ^000000",
		"[LV 4]^777777 ATK +80, 100 Sec Duration ^000000",
		"[LV 5]^777777 ATK +100, 120 Sec Duration ^000000",
	].join("\n");

	SkillDescription[SKID.LK_PARRYING] = [
		"Parrying",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 50 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 10 + 5*SkillLV sec ^000000",
		"Effect:^777777 You automatically block attacks with a success chance of (5*SkillLV)%. This allows you to Auto Guard melee and ranged attacks with your two-handed sword.",
		"This Skill also enables you to parry the following skills: Bash, Bowling Bash, Pierce, Spiral Pierce, Brandish Spear, Spear Boomerang, Shield Boomerang, Grand Cross, Asura Strike, Soul Breaker, Double Strafing, Arrow Shower and Investigate.",
		"When you block you cannot attack (but unlike Auto Guard, there is no delay). Use this when you get mobbed. Requires Two-handed Sword.^000000",
		"[LV 1]^777777 Block Chance 5%, 15 Sec ^000000",
		"[LV 2]^777777 Block Chance 10%, 20 Sec ^000000",
		"[LV 3]^777777 Block Chance 15%, 25 Sec ^000000",
		"[LV 4]^777777 Block Chance 20%, 30 Sec ^000000",
		"[LV 5]^777777 Block Chance 25%, 35 Sec ^000000",
		"[LV 6]^777777 Block Chance 30%, 40 Sec ^000000",
		"[LV 7]^777777 Block Chance 35%, 45 Sec ^000000",
		"[LV 8]^777777 Block Chance 40%, 50 Sec ^000000",
		"[LV 9]^777777 Block Chance 45%, 55 Sec ^000000",
		"[LV 10]^777777 Block Chance 50%, 60 Sec ^000000",
	].join("\n");

	SkillDescription[SKID.LK_CONCENTRATION] = [
		"Concentration",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 10 + 4*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 20 + 5*SkillLV sec ^000000",
		"Effect:^777777 If you use this skill, your HIT and damage will receive a huge increase, but all your defense based upon equipment and stats will decrease.",
		"This skill also gives the Endure effect upon cast without further SP cost and will reset the 7-Hit counter if the Endure effect was already active.",
		"Also, the 10 sec recast Endure timer will be reset, but only if the original effect came from the Swordman Endure Skill (yes, basically you can recast Endure within",
		"the 10 sec with this, but only ONCE, since Concentration-Endure does NOT reset its own Endure timer). Contrary to the IRO name, it can be used with every weapon. ^000000",
		"[LV 1]^777777 HIT +10, ATK +5%, DEF -5%, 25 Sec ^000000",
		"[LV 2]^777777 HIT +20, ATK +10%, DEF -10%, 30 Sec ^000000",
		"[LV 3]^777777 HIT +30, ATK +15%, DEF -15%, 35 Sec ^000000",
		"[LV 4]^777777 HIT +40, ATK +20%, DEF -20%, 40 Sec ^000000",
		"[LV 5]^777777 HIT +50, ATK +25%, DEF -25%, 45 Sec ^000000",
	].join("\n");

	SkillDescription[SKID.LK_TENSIONRELAX] = [
		"Tension Relax",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 15 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 180 sec or until fully healed ^000000",
		"Effect:^777777 Triples your HP recovery speed when sitting. This skill cancels out immediately if you stand up, use items, change equip or are hit by somebody else. ^000000",
	].join("\n");

	SkillDescription[SKID.LK_BERSERK] = [
		"Berserk",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 200 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None (plus special delay, see below) ^000000",
		"Duration:^777777 300 sec or until 100 HP reached ^000000",
		"Effect:^777777 Requires you to have a JobLV of at least 50. It triples your HP and replenishes them (to the now tripled maximum), doubles your Damage, increases your ASPD by 30%,",
		"increases your movement speed (does not stack with other increase except Peco Peco), gives the Endure effect at no further cost but halves your Flee Rate and sets ALL DEF AND MDEF to 0 for the skill's duration.",
		"It also drains 5% of your current HP every 15 seconds. You cannot chat (chat mute), change equips, use any healing items or receive any heals while this skill is in effect.",
		"You do not regain HP and SP naturally for 5 minutes after the skill ends (you can be healed or use items though). The Skill cancels out if your HP drops to 100 or below. Can be used during Guild Siege. ^000000",
	].join("\n");

	SkillDescription[SKID.HP_ASSUMPTIO] = [
		"Assumptio",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 10 + 10*SkillLV ^000000",
		"Target:^777777 1 Ally ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 0.5 + 0.5*SkillLV sec ^000000",
		"Cool Down:^777777 1 + 0.1*SkillLV sec ^000000",
		"Duration:^777777 20*SkillLV sec ^000000",
		"Effect:^777777 Reduce damage taken from enemies by half for the spell's duration. Cannot be cast inside a guild castle, but retains its effect after entering one.",
		"Casting Kyrie Eleison on someone that has Assumptio will cancel Assumptio, likewise casting Assumptio on someone with Kyrie will cancel Kyrie. ^000000",
		"[LV 1]^777777 Duration 20 Sec ^000000",
		"[LV 2]^777777 Duration 40 Sec ^000000",
		"[LV 3]^777777 Duration 60 Sec ^000000",
		"[LV 4]^777777 Duration 80 Sec ^000000",
		"[LV 5]^777777 Duration 100 Sec ^000000",
	].join("\n");

	SkillDescription[SKID.HP_BASILICA] = [
		"Basilica",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 70 + 10*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 5x5 cells ^000000",
		"Cast Time:^777777 4 + SkillLV sec ^000000",
		"Cool Down:^777777 1 + SkillLV sec ^000000",
		"Duration:^777777 15 + 5*SkillLV sec ^000000",
		"Effect:^777777 This skill creates an absolutely perfect defense zone of 5x5 cells around the caster that blocks any type of attack out of~ or into this area.",
		"Anyone can come in, but people who are inside cannot attack. The skill is canceled if the Priest moves or uses another skill. Does not work against Boss monsters and can't be used during the War of Emperium.",
		"This skill Requires^0000ff 1 Blue Gemstone ^000000,^ffff001 Yellow Gemstone^777777,^ee0000 1 Red Gemstone ^000000 and 1 Holy Water. ^000000",
		"[LV 1]^777777 Duration 20 Sec ^000000",
		"[LV 2]^777777 Duration 25 Sec ^000000",
		"[LV 3]^777777 Duration 30 Sec ^000000",
		"[LV 4]^777777 Duration 35 Sec ^000000",
		"[LV 5]^777777 Duration 40 Sec ^000000",
	].join("\n");

	SkillDescription[SKID.HP_MEDITATIO] = [
		"Meditatio",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 When meditating (sitting), you will have a better SP Recovery as well as increase your Maximum SP.",
		"This skill also improves the amount of HP that are healed by the Heal skill by 2% per SkillLV (sitting is of course not required). ^000000",
		"[LV 1]^777777 Maximum SP +1%, SP Rec +3%, +2% Heal ^000000",
		"[LV 2]^777777 Maximum SP +2%, SP Rec +6%, +4% Heal ^000000",
		"[LV 3]^777777 Maximum SP +3%, SP Rec +9%, +6% Heal ^000000",
		"[LV 4]^777777 Maximum SP +4%, SP Rec +12%, +8% Heal ^000000",
		"[LV 5]^777777 Maximum SP +5%, SP Rec +15%, +10% Heal ^000000",
		"[LV 6]^777777 Maximum SP +6%, SP Rec +18%, +12% Heal ^000000",
		"[LV 7]^777777 Maximum SP +7%, SP Rec +21%, +14% Heal ^000000",
		"[LV 8]^777777 Maximum SP +8%, SP Rec +24%, +16% Heal ^000000",
		"[LV 9]^777777 Maximum SP +9%, SP Rec +27%, +18% Heal ^000000",
		"[LV 10]^777777 Maximum SP +10%, SP Rec +30%, +20% Heal ^000000",
	].join("\n");

	SkillDescription[SKID.HW_SOULDRAIN] = [
		"Soul Drain",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Every time you kill an enemy using spells, you will receive a certain amount of SP back, depending on the monster level.",
		"The formula is MonsterLV x Drain. The Drain amount is (95+15*SkillLV)% (e.g. killing a LV 20 Enemy with a LV 5 Soul Drain will give you 34 SP). This skill also increases your Maximum SP by 2% per SkillLV.",
		"The SP drain only works for targeted spells, not area spells. ^000000",
		"[LV 1]^777777 Maximum SP +2%, SP Drain 110% ^000000",
		"[LV 2]^777777 Maximum SP +4%, SP Drain 125% ^000000",
		"[LV 3]^777777 Maximum SP +6%, SP Drain 140% ^000000",
		"[LV 4]^777777 Maximum SP +8%, SP Drain 155% ^000000",
		"[LV 5]^777777 Maximum SP +10%, SP Drain 170% ^000000",
		"[LV 6]^777777 Maximum SP +12%, SP Drain 185% ^000000",
		"[LV 7]^777777 Maximum SP +14%, SP Drain 200% ^000000",
		"[LV 8]^777777 Maximum SP +16%, SP Drain 215% ^000000",
		"[LV 9]^777777 Maximum SP +18%, SP Drain 230% ^000000",
		"[LV 10]^777777 Maximum SP +20%, SP Drain 245% ^000000",
	].join("\n");

	SkillDescription[SKID.HW_MAGICCRASHER] = [
		"Magic Crasher",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 8 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells (unconfirmed) ^000000",
		"Cast Time:^777777 0.3 sec ^000000",
		"Cool Down:^777777 0.3 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 You do an attack that calculates damage using your MATK instead of ATK but is decreased using enemy's DEF, not MDEF.",
		"This skills overall damage is affected by cards you have in your weapon, weapon element, size and element of the target and it might miss depending on your DEX. ^000000",
	].join("\n");

	SkillDescription[SKID.HW_MAGICPOWER] = [
		"Amplify Magic Power",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 10 + 4*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 0.7 sec, not reducible by DEX ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 First follow up spell during the next 30 sec ^000000",
		"Effect:^777777 This skill amplifies the spell damage by boosting your MATK for the first spell (yes, only one spell) following this skill. The bonus is 5% per SkillLV. ^000000",
		"[LV 1]^777777 MATK +5% ^000000",
		"[LV 2]^777777 MATK +10% ^000000",
		"[LV 3]^777777 MATK +15% ^000000",
		"[LV 4]^777777 MATK +20% ^000000",
		"[LV 5]^777777 MATK +25% ^000000",
		"[LV 6]^777777 MATK +30% ^000000",
		"[LV 7]^777777 MATK +35% ^000000",
		"[LV 8]^777777 MATK +40% ^000000",
		"[LV 9]^777777 MATK +45% ^000000",
		"[LV 10]^777777 MATK +50% ^000000",
	].join("\n");

	SkillDescription[SKID.PA_PRESSURE] = [
		"Pressure",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 25 + 5*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 ^000000",
		"Cast Time:^777777 1.5 + 0.5*SkillLV sec ^000000",
		"Cool Down:^777777 1.5 + 0.5*SkillLV sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Ranged attack that calls upon a cross from the sky to crush your enemies. Does a fixed amount of 500+300*SkillLV damage and makes the target lose (15+5*SkillLV)% SP.",
		"This skill is an attack by the holy God himself and therefore ignores all enemy defense and Flee, and can not be interrupted or canceled by Magic Rod, Reflect Shield, Pneuma, Safety Wall, etc.",
		"Damage is not reduced by Woe Reduction, Energy Coat, equipment or cards; but is not affected by Lex Aeterna. The only way to avoid it is by Cloaking before getting targeted. ^000000",
		"[LV 1]^777777 Damage: 800 HP, 20% SP ^000000",
		"[LV 2]^777777 Damage: 1100 HP, 25% SP ^000000",
		"[LV 3]^777777 Damage: 1400 HP, 30% SP ^000000",
		"[LV 4]^777777 Damage: 1700 HP, 35% SP ^000000",
		"[LV 5]^777777 Damage: 2000 HP, 40% SP ^000000",
	].join("\n");

	SkillDescription[SKID.PA_SACRIFICE] = [
		"Sacrifice",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 100 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Next five hits ^000000",
		"Effect:^777777 Each hit you land sacrifices 9% of your Maximum HP to damage your enemy by up to 1.4 times the amount of sacrificed HP. Always hits, but you can die if you use up too many HP with this skill.",
		"Damage on the target is increased according to Maximum HP, Skill Level and weapon +% damage cards, Triple Bloody Boned being the best combo for WoE/PVP.",
		"It ignores Flee and defense of the target. Weapon cards won't increase the amount of HP taken from you. You CANNOT hit the Emperium with it. But you still lose 9% HP if you try.",
		"It's ALWAYS neutral element, meaning Ghostring, Cranial, Poo and Immune reduce its damage on the target. Reflect Shield can reflect the damage.",
		"Magnum Break and Pressure increase their damage. If the enemy is inside a Safety Wall and you attack him, it will miss, but you will lose 9% of your HP anyways.",
		"Ice Pick does not affect Sacrifice damage. Baphomet Card doesn't give Splash damage for Sacrifice hits. Can be used on Boss monsters.",
		"Reject Sword (Stalker skill) has a chance of halving Sacrifice damage (if Sac is used with Sword/Dagger) and reflecting it back to the Paladin. Can be Dispelled. ^000000",
		"[LV 1]^777777 Damage: 100% the amount of sacrificed HP ^000000",
		"[LV 2]^777777 Damage: 110% the amount of sacrificed HP ^000000",
		"[LV 3]^777777 Damage: 120% the amount of sacrificed HP ^000000",
		"[LV 4]^777777 Damage: 130% the amount of sacrificed HP ^000000",
		"[LV 5]^777777 Damage: 140% the amount of sacrificed HP ^000000",
	].join("\n");

	SkillDescription[SKID.PA_GOSPEL] = [
		"Gospel",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Supportive, Area Effect ^000000",
		"SP Cost:^777777 LV 1-5 80SP, LV 6-10 100SP ^000000",
		"Upkeep SP Cost:^777777 LV 1-5 20SP every 10 sec, LV 6-10 35SP every 10 sec ^000000",
		"Upkeep HP Cost:^777777 LV 1-5 30HP every 10 sec, LV 6-10 45HP every 10 sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 7x7 cells ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 60 sec ^000000",
		"Effect:^777777 With Gospel, you deal damage to enemies while giving your allies special attribute bonuses.",
		"When a Paladin uses this skill, it will affect all enemies and allies within a 7x7 cells radius with a chance of (50+5*SkillLV)% every 10 seconds.",
		"Even if the caster takes damage, this skill will continue to work, but he can be silenced. When the skill is active, it will periodically drain the Paladin's HP and SP.",
		"The paladin can not use Potions, but may receive healing magic, Gospel may cancel out all positive or negative effects on the affected targets (see below for details), but it does not stack with another Gospel.",
		"The effects (positive or negative) can NOT be avoided by Cloaking when staying in the area. ^000000",
		"Possible effects on enemies:",
		"^777777?1-9999 DMG (Neutral, ignores Flee)",
		"?Cause Curse, Blind or Poison status",
		"?Provoke LV 10",
		"?Reduce DEF to 0",
		"?Reduce ATK to 0",
		"?Reduce Flee Rate to 0",
		"?Reduce ASPD and movement speed to 75% ^000000",
		"Possible effects on allies:",
		"^777777?1-9999 HP heal",
		"?Remove all abnormal status (e.g. Curse, Blind and Poison)",
		"?Blessing LV 10 or Increase Agility LV 10",
		"?Enchant Weapon or Armor with Holy property",
		"?Maximum HP or SP +100%",
		"?+20 to all stats",
		"?DEF +25%",
		"?MaxATK +100%",
		"?Flee Rate/HIT +50 ^000000",
		"?Immunity against status ailments",
	].join("\n");

	SkillDescription[SKID.CH_PALMSTRIKE] = [
		"Palm Push Strike",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 0.3 sec ^000000",
		"Effect:^777777 Attack an enemy with your palm. The target will receive nasty damage, and will be pushed 3 cells backwards. Damage is (200+100*SkillLV)% ATK.",
		"You can only do this when the Critical Explosion skill is active. ^000000",
		"[LV 1]^777777 ATK 300% ^000000",
		"[LV 2]^777777 ATK 400% ^000000",
		"[LV 3]^777777 ATK 500% ^000000",
		"[LV 4]^777777 ATK 600% ^000000",
		"[LV 5]^777777 ATK 700% ^000000",
	].join("\n");

	SkillDescription[SKID.CH_TIGERFIST] = [
		"Tiger Knuckle Fist",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 2 + 2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Combo Time:^777777 1.3 sec ^000000",
		"Effect:^777777 This skill can be used as a part of the combination skill of Triple Attack, Chain Combo and Combo Finish.",
		"When you use this skill, you'll run up to the enemy and hit him. The target will be unable to move for a brief amount of time. Requires 1 Spirit Sphere. ^000000",
		"[LV 1]^777777 ATK +140%, stun chance 20% ^000000",
		"[LV 2]^777777 ATK +240%, stun chance 30% ^000000",
		"[LV 3]^777777 ATK +340%, stun chance 40% ^000000",
		"[LV 4]^777777 ATK +440%, stun chance 50% ^000000",
		"[LV 5]^777777 ATK +540%, stun chance 60% ^000000",
	].join("\n");

	SkillDescription[SKID.CH_CHAINCRUSH] = [
		"Chain Crush Combo",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 2 + 2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 LV 1-5 0.8 sec, LV 6-10 1 sec ^000000",
		"Combo Time:^777777 1.3 sec ^000000",
		"Effect:^777777 Also a combination skill, can only be chained after Combo Finish OR Tiger Knuckle Fist. Tiger Knuckle Fist can not be chained after this, but Asura Strike can.",
		"As the skills level goes up, the amount of hits you'll do, as well as overall damage, will increase. 2 spheres are required to use this skill. If the caster still has at least one Spirit Sphere, he can follow up an Asura Strike.",
		"The longest possible combo a Champion may use is Triple Attack -> Chain Combo -> Combo Finish -> Tiger Knuckle Fist -> Chain Crush Combo -> Asura Strike, provided he has the necessary Spirit Spheres.",
		"The Damage is (400+100*SkillLV)% ATK. ^000000",
		"[LV 1]^777777 ATK 500%, 1 Hit ^000000",
		"[LV 2]^777777 ATK 600%, 1 Hit ^000000",
		"[LV 3]^777777 ATK 700%, 2 Hits ^000000",
		"[LV 4]^777777 ATK 800%, 2 Hits ^000000",
		"[LV 5]^777777 ATK 900%, 3 Hits ^000000",
		"[LV 6]^777777 ATK 1000%, 3 Hits ^000000",
		"[LV 7]^777777 ATK 1100%, 4 Hits ^000000",
		"[LV 8]^777777 ATK 1200%, 4 Hits ^000000",
		"[LV 9]^777777 ATK 1300%, 5 Hits ^000000",
		"[LV 10]^777777 ATK 1400%, 5 Hits ^000000",
	].join("\n");

	SkillDescription[SKID.PF_HPCONVERSION] = [
		"Health Conversion",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 0.5 sec ^000000",
		"Cool Down:^777777 0.8 + 0.2*SkillLV sec ^000000",
		"Effect:^777777 Converts 10% of your HP into SP. The higher the skill level the more effective the conversion will be. The conversion rate is 10:1 modified by SkillLV, so a 2000 HP Professor with Health Conversion LV 3 would consume 2000*10%=200 HP and obtain a total of 200*30%=60 SP. ^000000",
		"[LV 1]^777777 10% of the converted HP ^000000",
		"[LV 2]^777777 20% of the converted HP ^000000",
		"[LV 3]^777777 30% of the converted HP ^000000",
		"[LV 4]^777777 40% of the converted HP ^000000",
		"[LV 5]^777777 50% of the converted HP ^000000",
	].join("\n");

	SkillDescription[SKID.PF_SOULCHANGE] = [
		"Soul Change",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 50 ^000000",
		"Target:^777777 Ally ^000000",
		"Range:^777777 4 cells ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 5 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Exchange SP of the target with your SP. With this exchange it's not possible for any of the partners to exceed their Maximum SP. If you use this on a monster, you regain 3% of your SP.",
		"You can't use this skill on a monster again that already had Soul Change. You can use this skill in Siege Mode (WoE). ^000000",
	].join("\n");

	SkillDescription[SKID.PF_SOULBURN] = [
		"Soul Burn",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 70 + 10*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 4 cells ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 LV1-4 10 sec, LV 5 15 sec for the next Soul Burn, else none ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 This skill will burn all SP the target has, thus damaging it with its own SP. Since this damage is done to the mental system, it will be decreased by the target's MDEF.",
		"If you fail this skill, YOUR SP will be drained, and you will damage yourself. The damage is equal to twice the removed SP. ^000000",
		"[LV 1]^777777 40% Success Rate ^000000",
		"[LV 2]^777777 50% Success Rate ^000000",
		"[LV 3]^777777 60% Success Rate ^000000",
		"[LV 4]^777777 70% Success Rate ^000000",
		"[LV 5]^777777 70% Success Rate, Damage=2x SP ^000000",
	].join("\n");

	SkillDescription[SKID.ASC_KATAR] = [
		"Advanced Katar Research",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases damage done with a Katar by 10%+2*LV%. ^000000",
	].join("\n");

	SkillDescription[SKID.ASC_EDP] = [
		"Enchant Deadly Poison",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 50 + 10*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Duration:^777777 35 + 5*SkillLV sec ^000000",
		"Effect:^777777 Uses up a Poison Bottle to enchant your weapon. Increases ATK by (150+50*SkillLV)%.",
		"Enemies that get hit by the enchanted weapon will randomly receive poison status ailment, and HP will be drained percentage wise very quickly.",
		"The chance of poisoning is equal to Assassin's Enchant Poison poison chance. Works against Boss monsters.",
		"Note that the element of the attack DOES NOT change to poison, so poison reducing effects (e.g. Armor slotted with Argiope Card) do not reduce the initial strike damage. ^000000",
	].join("\n");

	SkillDescription[SKID.ASC_BREAKER] = [
		"Soul Breaker",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 LV 1-5 20SP",
		"LV 6-10  30SP ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 5 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.8 + 0.2*SkillLV sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Attack that causes severe damage, because the target is required to have high DEF to be able to withstand this. Damage calculation is a little complicated:",
		"1) Soul Breaker Base Damage = Physical Total Damage + {(SkillLV * Player's INT) * 5} + Random Damage (500 ~ 1000)",
		"2) Final Damage = Soul Breaker Base Damage / Enemy DEF + Soul Breaker Base Damage",
		"This formula may not be totally accurate.",
		"The Element of the attack corresponds to your normal attack element. ^000000",
	].join("\n");

	SkillDescription[SKID.SN_SIGHT] = [
		"True Sight",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 LV 1-2 20SP, LV 3-4 25SP, LV 5-6 30SP, LV 7-8 35SP, LV 9-10 40SP. ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 30 sec ^000000",
		"Effect:^777777 Increases all your stats by +5, also increases your HIT by +3 per SkillLV, damage by +2% per SkillLV, CRIT rate by 1 per SkillLV. Stacks with Attention Concentrate. ^000000",
		"[LV 1]^777777 +3 HIT | +2% DMG | +1 CRIT ^000000",
		"[LV 2]^777777 +6 HIT | +4% DMG |+2 CRIT ^000000",
		"[LV 3]^777777 +9 HIT | +6% DMG | +3 CRIT ^000000",
		"[LV 4]^777777 +12 HIT | +8% DMG | +4 CRIT ^000000",
		"[LV 5]^777777 +15 HIT | +10% DMG | +5 CRIT ^000000",
		"[LV 6]^777777 +18 HIT | +12% DMG | +6 CRIT ^000000",
		"[LV 7]^777777 +21 HIT | +14% DMG | +7 CRIT ^000000",
		"[LV 8]^777777 +24 HIT | +16% DMG | +8 CRIT ^000000",
		"[LV 9]^777777 +27 HIT | +18% DMG | +9 CRIT ^000000",
		"[LV 10]^777777 +30 HIT | +20% DMG | +10 CRIT ^000000",
	].join("\n");

	SkillDescription[SKID.SN_FALCONASSAULT] = [
		"Falcon Assault",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 26 + 4*SkillLV ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 3 sec ^000000",
		"Effect:^777777 Order your Falcon to attack an enemy with enormous power. Increases the Attack Power of the Falcon attack (based on Blitz Beat of equal LV) by +(150+70*SkillLV)%. Attack Range: 3+(Vulture's Eye LV). ^000000",
		"[LV 1]^777777 Damage +220% ^000000",
		"[LV 2]^777777 Damage +290% ^000000",
		"[LV 3]^777777 Damage +360% ^000000",
		"[LV 4]^777777 Damage +430% ^000000",
		"[LV 5]^777777 Damage +500% ^000000",
	].join("\n");

	SkillDescription[SKID.SN_SHARPSHOOTING] = [
		"Sharp Shooting",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 15 + 3*SkillLV ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 14 ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down:^777777 1.5 sec ^000000",
		"Effect:^777777 Arrow attack that will affect every enemy in a 3 cell wide corridor along its flight path up to its maximum range of 14 cells. The corridor is a straight line between the caster and its target.",
		"If the target is closer than 14 cells, the corridor will continue up to its full length. It affects all enemies along this path with an increased ATK (by 50% per SkillLV) and a +20 bonus to CRIT. ^000000",
		"[LV 1]^777777 +20 CRIT, +50% ATK ^000000",
		"[LV 2]^777777 +20 CRIT, +100% ATK ^000000",
		"[LV 3]^777777 +20 CRIT, +150% ATK ^000000",
		"[LV 4]^777777 +20 CRIT, +200% ATK ^000000",
		"[LV 5]^777777 +20 CRIT, +250% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.SN_WINDWALK] = [
		"Wind Walk",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 40 + 6*SkillLV ^000000",
		"Target:^777777 Party ^000000",
		"Cast Time:^777777 1.6 + 0.4*SkillLV sec ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Duration:^777777 100 + 30*SkillLV sec ^000000",
		"Effect:^777777 You and your party will receive Flee and movement speed upgrade, it will not stack with other Flee and Speed upgrading skills (no item based skills either, like Moonlight carded shoes). The bonuses are: +2% movement speed per SkillLV and SkillLV/2 rounded down to Flee. ^000000",
		"[LV 1]^777777 +2% Walking Speed | +1 Flee Rate ^000000",
		"[LV 2]^777777 +4% Walking Speed | +1 Flee Rate ^000000",
		"[LV 3]^777777 +6% Walking Speed | +2 Flee Rate ^000000",
		"[LV 4]^777777 +8% Walking Speed | +2 Flee Rate ^000000",
		"[LV 5]^777777 +10% Walking Speed | +3 Flee Rate ^000000",
		"[LV 6]^777777 +12% Walking Speed | +3 Flee Rate ^000000",
		"[LV 7]^777777 +14% Walking Speed | +4 Flee Rate ^000000",
		"[LV 8]^777777 +16% Walking Speed | +4 Flee Rate ^000000",
		"[LV 9]^777777 +18% Walking Speed | +5 Flee Rate ^000000",
		"[LV 10]^777777 +20% Walking Speed | +5 Flee Rate ^000000",
	].join("\n");

	SkillDescription[SKID.WS_MELTDOWN] = [
		"Melt Down",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 LV 1-2 50; LV 3-4 60; LV 5-6 70; LV 7-8 80; LV 9-10 90 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 LV 1-2 5sec, LV 3-4 6sec, LV 5-6 7sec, LV 7-8 8sec, LV 9 9sec, LV 10 10 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 10 + 5*SkillLV Sec ^000000",
		"Effect:^777777 This skill makes your weapon really hot. When you hit your target in PVP mode, his/her equipment burns and melts down (break effect, can be repaired) one by one.",
		"Has a chance of (1*SkillLV)% to break the opponents weapon and a (0.7*SkillLV)% chance to break the armor per hit. Against monsters it decreases the monsters attack or defense by 25% for about 5 sec.",
		"The effect remains if the caster switches weapons or fights with bare fists. This skill does not affect Boss monsters and works with every weapon but it can be dispelled. ^000000",
	].join("\n");

	SkillDescription[SKID.WS_CREATECOIN] = [
		"Create Coin",
		"Max Level:^777777 Unknown ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 5 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Effect:^ee0000 This skill has been dropped by Gravity. ^000000",
		"^777777Create coins that give you random amounts of Zeny when you double click them. You can get many different coins depending on the item you use. ^000000",
	].join("\n");

	SkillDescription[SKID.WS_CREATENUGGET] = [
		"Create Nugget",
		"Max Level:^777777 Unknown ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 5 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Effect:^ee0000 This skill has been dropped by Gravity. ^000000",
		"^777777Create a piece of gold, then combine it to create a nugget. This nugget will be used to create specific weapons or coins. ^000000",
	].join("\n");

	SkillDescription[SKID.WS_CARTBOOST] = [
		"Cart Boost",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 20 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 60 sec ^000000",
		"Effect:^777777 This skill makes your movement speed 20% faster for 60 seconds. It does not stack with other speed changing spells whether beneficial or harmful.",
		"It will not work at all if the effect is harmful (e.g. Curse, AGI Down). You need to have a cart in order to use this skill. ^000000",
	].join("\n");

	SkillDescription[SKID.WS_SYSTEMCREATE] = [
		"Auto Attack System",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 20 ^000000",
		"Target:^777777 Ground ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Unknown ^000000",
		"Effect:^ee0000 This skill has been dropped by Gravity. ^000000",
		"^777777Create up to 5 small towers that attack all enemies in range for you, towers have auto-detect skill. ^000000",
	].join("\n");

	SkillDescription[SKID.ST_CHASEWALK] = [
		"Chase Walk",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 10 ^000000",
		"Upkeep SP Cost:^777777 10 + 2*SkillLV per 10 sec ^000000",
		"Upkeep SP Cost (WoE):^777777 50 + 10*SkillLV per 10 sec ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Sustained ^000000",
		"Effect:^777777 Walk behind your enemy while hiding. All detecting skills will not be able to detect a Stalker in this mode. The stalker can not attack and he will become visible when his SP runs out.",
		"Furthermore, attacks that impact the area that the stalker is in will end this skill thus revealing the stalker.",
		"The Stalker leaves faint shoeprints on the ground while using this skill. Walking speed is reduced, but this can be compensated with higher SkillLV. Can be used during Guild Siege, but costs 5 times as much SP.",
		"After a delay of 10 seconds, it will increase STR for 30 seconds. ^000000",
		"[LV 1]^777777 Walk Speed 70%, STR +1 ^000000",
		"[LV 2]^777777 Walk Speed 75%, STR +2 ^000000",
		"[LV 3]^777777 Walk Speed 80%, STR +4 ^000000",
		"[LV 4]^777777 Walk Speed 85%, STR +8 ^000000",
		"[LV 5]^777777 Walk Speed 90%, STR +16 ^000000",
	].join("\n");

	SkillDescription[SKID.ST_REJECTSWORD] = [
		"Sword Reject",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 5 + 5*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 300 sec, or 3 Reflects ^000000",
		"Effect:^777777 When in PVP mode it has a chance to reduce all sword and dagger damage by half and returns the other half to the attacker for 3 hits. Works on monsters regardless of their weapon. ^000000",
		"[LV 1]^777777 15% Chance of Reflection ^000000",
		"[LV 2]^777777 30% Chance of Reflection ^000000",
		"[LV 3]^777777 45% Chance of Reflection ^000000",
		"[LV 4]^777777 60% Chance of Reflection ^000000",
		"[LV 5]^777777 75% Chance of Reflection ^000000",
	].join("\n");

	SkillDescription[SKID.ST_STEALBACKPACK] = [
		"Steal Backpack",
		"^ee0000This skill has been dropped by Gravity. ^000000",
	].join("\n");

	SkillDescription[SKID.CR_ALCHEMY] = [
		"Alchemy",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 Unknown ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Effect:^ee0000 This skill has been dropped by Gravity. ^000000",
		"^777777You can create many items that are needed for the Pharmacy skill such as Empty Bottles, Empty Potion Bottles and Test Tubes. ^000000",
	].join("\n");

	SkillDescription[SKID.CR_SYNTHESISPOTION] = [
		"Synthesis Potion",
		"Max Level:^777777 Unknown ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 10 + 6*SkillLV (not confirmed) ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Effect:^ee0000 This skill has been dropped by Gravity. ^000000",
		"^777777Combine different potions to create new ones. There are already set rules to what can",
		"be mixed, and the problem is the success rate. You can create potions that weigh less, but perform the same... or create heavier potions that heal for far more. For potions that summon",
		"creatures to attack, they might have better attack rate, or have a new skill to use. ^000000",
	].join("\n");

	SkillDescription[SKID.CG_ARROWVULCAN] = [
		"Arrow Vulcan",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 10 + 2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 1.8 + 0.2*SkillLV sec ^000000",
		"Cool Down:^777777 LV 1-5 0.8 sec, LV 6-10 1 sec ^000000",
		"Effect:^777777 Attack a single target with a massive amount of 9 arrows. Musical instrument or whip (currently in IRO only 1 arrow is required to use this skill).^000000",
		"[LV 1]^777777 ATK 300% ^000000",
		"[LV 2]^777777 ATK 400% ^000000",
		"[LV 3]^777777 ATK 500% ^000000",
		"[LV 4]^777777 ATK 600% ^000000",
		"[LV 5]^777777 ATK 700% ^000000",
		"[LV 6]^777777 ATK 800% ^000000",
		"[LV 7]^777777 ATK 900% ^000000",
		"[LV 8]^777777 ATK 1000% ^000000",
		"[LV 9]^777777 ATK 1100% ^000000",
		"[LV 10]^777777 ATK 1200% ^000000",
	].join("\n");

	SkillDescription[SKID.CG_MOONLIT] = [
		"Moonlit Water Mill",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Ensemble ^000000",
		"SP Cost:^777777 20 + 10*SkillLV ^000000",
		"Upkeep SP Cost:^777777 4*SkillLV SP every 10 sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 9x9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 15 + 5*SkillLV sec ^000000",
		"Effect:^777777 This skill creates a 9x9 cell around the users that no one can enter. It just prevents entry pushing enemies back, so you can still be hit by ranged attacks or magic.",
		"Does NOT WORK during Guild Siege. Can not be canceled by Dispell. ^000000",
		"[LV 1]^777777 20 Sec Duration | 30 SP, 5 SP every 10 sec ^000000",
		"[LV 2]^777777 25 Sec Duration | 40 SP, 6 SP every 10 sec ^000000",
		"[LV 3]^777777 30 Sec Duration | 50 SP, 7 SP every 10 sec ^000000",
		"[LV 4]^777777 35 Sec Duration | 60 SP, 8 SP every 10 sec ^000000",
		"[LV 5]^777777 40 Sec Duration | 70 SP, 9 SP every 10 sec ^000000",
	].join("\n");

	SkillDescription[SKID.CG_MARIONETTE] = [
		"Marionette Control",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 100 ^000000",
		"Target:^777777 Party Member ^000000",
		"Range:^777777 7 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 300 ^000000",
		"Effect:^777777 Target a party member with this skill, and half of your stats will be given to that character as a bonus points (like 10+60 DEX).",
		"Your target can not exceed the maximum of 99 stat points. The target must remain within a 7 cell radius, or the skill cancels out.",
		"The caster is free to do whatever he/she wants while the stats are halved (but can't use skills). If the skill is canceled, the Clown or Gypsy gets his/her stats back.",
		"Multiple Marionette Controls do not stack. Clowns cannot cast it on another Clown/Bard, and Gypsies cannot cast it on another Gypsy/Dancer.",
		"While this skill is in effect, caster will lose 1000 max HP. ^000000",
	].join("\n");

	SkillDescription[SKID.LK_SPIRALPIERCE] = [
		"Spiral Pierce",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"Target:^777777 Enemy ^000000",
		"SP Cost:^777777 15 + 3*SkillLV ^000000",
		"Cast Time:^777777 0.1 + 0.2*SkillLV sec ^000000",
		"Cool Down:^777777 1 + 0.2*SkillLV sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Extend your spear, and spin it in a spiral fashion to increase overall damage and ability to pierce. A more powerful version of Pierce which ignores DEF and VIT DEF and also stun-locks your opponent for 3 sec.",
		"Damage is (100+50*SkillLV)% ATK. The attack is 5 hits with the damage divided evenly between the hits. However you can increase damage further by increasing the weight of your weapon (upgrades count too! LV 1 weapons +10/upgrade, LV 2 weapons +15/upgrade, LV 3 weapons +25/upgrade).",
		"Although damage will increase with better skill level, so will the Cast Time / Cool Down. Requires One-handed or Two-handed Sword, also works with Spears.",
		"Aura Blade does not add damage to this skill. Recent tests revealed the following (rather complex) formula:",
		"[(80% of weapons weight times (100%+level*50%) + (round.down(STR/10^2) + Upgrade Damage) * size modifier (small 125%, medium 100%, large 75%)) * card factors (+20% and such) * element factors ]* 5 hits ^000000",
		"[LV 1]^777777 150% ATK per attack ^000000",
		"[LV 2]^777777 200% ATK per attack ^000000",
		"[LV 3]^777777 250% ATK per attack ^000000",
		"[LV 4]^777777 300% ATK per attack ^000000",
		"[LV 5]^777777 350% ATK per attack ^000000",
	].join("\n");

	SkillDescription[SKID.LK_HEADCRUSH] = [
		"Head Crush",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 23 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Weapon Range ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 90 sec ^000000",
		"Effect:^777777 Strong hit against a single enemy that causes bleeding with a chance of 50%. Those that are hit will lose HP rapidly, the duration of this effect depends on the enemies VIT and LUK.",
		"Can be used with any weapon. Damage is (100+40*SkillLV)% ATK.",
		"Does not work on Undead property and Demon-race creatures. ^000000 ",
		"[LV 1]^777777 140% ATK ^000000",
		"[LV 2]^777777 180% ATK ^000000",
		"[LV 3]^777777 220% ATK ^000000",
		"[LV 4]^777777 260% ATK ^000000",
		"[LV 5]^777777 300% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.LK_JOINTBEAT] = [
		"Joint Beat",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 See Effect ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 0.8 sec until SkillLV 5, 1 sec thereafter ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 You can only use this skill with a Spear-type weapon. You will strike at the joints of the enemy's body, causing various harmful status ailments as well as damage.",
		"Higher level increases the damage and chance to cause status ailment to the enemy. As always VIT DEF protects against the status alignments.",
		"Possible ailments:",
		"1. Ankle Break: MoveSpeed reduced by 50%.",
		"2. Wrist Break: ASPD reduced by 25%.",
		"3. Knee Break: MoveSpeed reduced by 30%, ASPD reduced by 10%.",
		"4. Shoulder Break: DEF reduced by 50%.",
		"5. Waist Break: DEF reduced by 25%, ATK reduced by 25%.",
		"6. Neck Break: Increase your damage by 2x, CRIT effect, and 30 second forced 'bleeding' status ailment ^000000",
		"[LV 1]^777777 60% ATK, inflict status 10%, 12 SP ^000000",
		"[LV 2]^777777 70% ATK, inflict status 15%, 12 SP ^000000",
		"[LV 3]^777777 80% ATK, inflict status 20%, 14 SP ^000000",
		"[LV 4]^777777 90% ATK, inflict status 25%, 14 SP ^000000",
		"[LV 5]^777777 100% ATK, inflict status 30%, 16 SP ^000000",
		"[LV 6]^777777 110% ATK, inflict status 35%, 16 SP ^000000",
		"[LV 7]^777777 120% ATK, inflict status 40%, 18 SP ^000000",
		"[LV 8]^777777 130% ATK, inflict status 45%, 18 SP ^000000",
		"[LV 9]^777777 140% ATK, inflict status 50%, 20 SP ^000000",
		"[LV 10]^777777 150% ATK, inflict status 55%, 20 SP ^000000",
	].join("\n");

	SkillDescription[SKID.HW_NAPALMVULCAN] = [
		"Napalm Vulcan",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 15*SkillLV - 5 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Area:^777777 3x3 cells ^000000",
		"Cast Time:^777777 0.7 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Strong telekinetic spell. Hits every Enemy in a 3x3 area around the target for SkillLV times.",
		"The damage per hit is spread equally among the affected targets like the mage spell Napalm Beat (e.g. if there are 4 targets, each one would be hit for 1/4). It has a chance of (5*SkillLV)% to cause Curse on each target.",
		"The damage for one target is 1*MATK per hit. ^000000",
	].join("\n");

	SkillDescription[SKID.CH_SOULCOLLECT] = [
		"Dangerous Soul Collect",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 600 sec ^000000",
		"Effect:^777777 Summons all 5 Spheres at one go. Spell CAN be interrupted. ^000000",
	].join("\n");

	SkillDescription[SKID.PF_MINDBREAKER] = [
		"Mind Breaker",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 9 + 3*SkillLV ^000000",
		"Range:^777777 9 cells ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 0.7 + 0.1*SkillLV sec ^000000",
		"Effect:^777777 Attack the mind of the enemy to cause mental breakdown. This decreases enemy's INT MDEF, but it ups their MATK. Success chance is (55+5*SkillLV)%. This is basically Provoke for Magicians. ^000000",
		"[LV 1]^777777 MATK +20% MDEF -12% 60% success ^000000",
		"[LV 2]^777777 MATK +40% MDEF -24% 65% success ^000000",
		"[LV 3]^777777 MATK +60% MDEF -36% 70% success ^000000",
		"[LV 4]^777777 MATK +80% MDEF -48% 75% success ^000000",
		"[LV 5]^777777 MATK +100% MDEF -60% 80% success ^000000",
	].join("\n");

	SkillDescription[SKID.PF_MEMORIZE] = [
		"Memorize",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 1 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 5 sec, not reducible by DEX ^000000",
		"Cool Down:^777777 None ^000000",
		"Effect:^777777 The next five Spells you cast have their casting time reduced by 1/2. This effect will last as long as you don't use spells, but will be dispelled upon your death.",
		"Multiple Memorize casts do not stack, recasting resets the counter to 5. ^000000",
	].join("\n");

	SkillDescription[SKID.PF_FOGWALL] = [
		"Wall of Fog",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 25 SP ^000000",
		"Target:^777777 Ground ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 20 sec ^000000",
		"Effect:^777777 Creates a wall of fog of 5 x 3 cells perpendicular to the caster (triple the area of the Wizards Ice Wall). Anyone attempting ranged attacks or ranged skills through or into but not OUT OF the fog. Those inside are blinded (Status effect: Blind) for 30 seconds.",
		"For non ground targeted spells, there's a 75% chance that it will miss completely. Ranged attacks have a -75% damage penalty, and -50 HIT penalty. The wall lasts for 20 seconds, and cannot be cast on top of Sage's other ground based skills such as Volcano, Land Protector, and Violent Gale, but you may cast this over Deluge.",
		"If this skill is cast over Deluge, it will last for 40 seconds. You can cast this on top of monsters and you can not have more than 2 Wall of Fog active at any time. ^000000",
	].join("\n");

	SkillDescription[SKID.PF_SPIDERWEB] = [
		"Spider Web",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 50 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 8 sec ^000000",
		"Catalyst:^777777 1 Cobweb ^000000",
		"Effect:^777777 Shoot a spider web to bind a target to a spot for 8 seconds, also reduces the victim's Flee Rate by half.",
		"If target is hit by any fire elemental skill then the target will take 2x the normal damage but the spider web will be destroyed. You can only catch one enemy with each cast and you can not have more than 3 webs active at the same time. ^000000",
	].join("\n");

	SkillDescription[SKID.ASC_METEORASSAULT] = [
		"Meteor Assault",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 8 + 2*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 5x5 cells ^000000",
		"Cast Time:^777777 0.5 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Effect:^777777 An attack that causes mass damage to all enemies within a 5x5 cells area around the caster.",
		"Any enemies hit by this skill will receive Stun, Blind or Bleeding status ailment randomly with a (5+5*SkillLV)% chance. Attack Power is 40%+40*LV%. ^000000",
		"[LV 1]^777777 80% ATK, 10% Chance ^000000",
		"[LV 2]^777777 120% ATK, 15% Chance ^000000",
		"[LV 3]^777777 160% ATK, 20% Chance ^000000",
		"[LV 4]^777777 200% ATK, 25% Chance ^000000",
		"[LV 5]^777777 240% ATK, 30% Chance ^000000",
		"[LV 6]^777777 280% ATK, 35% Chance ^000000",
		"[LV 7]^777777 320% ATK, 40% Chance ^000000",
		"[LV 8]^777777 360% ATK, 45% Chance ^000000",
		"[LV 9]^777777 400% ATK, 50% Chance ^000000",
		"[LV 10]^777777 440% ATK, 55% Chance ^000000",
	].join("\n");

	SkillDescription[SKID.ASC_CDP] = [
		"Create Deadly Poison",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 50 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Effect:^777777 Creates a deadly potion that can be drunk by the assassin or used for the Enchant Deadly Poison skill.",
		"DEX and LUK will help you successfully create this item (with DEX having twice as much effect compared to LUK), and upon failure, it reduces your HP by 25% of your Maximum HP (yes, you can die from this).",
		"If an Assassin Cross drinks this item, he will be poisoned, but his ASPD will increase. If any other character drinks this item, he/she will die on the spot.",
		"Ingredients:",
		"- Venom Canine (aka Poison Needle) (dropped by Anacondaq, Side Winder, Snake)",
		"- Cactus Needle (dropped by Muka)",
		"- Bee Sting (dropped by Hornet)",
		"- Poison Spore (dropped by Poison Spore, Black Mushroom, Spore)",
		"- Karvodailnirol (dropped by Red Mushroom, Poison Spore)",
		"- Berserk Potion (sold in shop)",
		"- Empty Bottle (dropped by Goat, Muka, Roda Frog, Ant Egg, Peco Peco Egg, Drops, Poring, Plankton...) ^000000",
	].join("\n");

	SkillDescription[SKID.WE_BABY] = [
		"Mom, Dad, I love you!",
		"Type:^777777 Support ^000000",
		"Effect:^777777 Caster's parent characters will not lose any experience points when they die.",
		"Caster consumes 10% of Maximum SP for each use. ^000000",
	].join("\n");

	SkillDescription[SKID.WE_CALLPARENT] = [
		"Mom, Dad, I miss you!",
		"Type:^777777 Support ^000000",
		"Effect:^777777 Child character summons parents to a spot next to where child is standing. ^000000",
	].join("\n");

	SkillDescription[SKID.WE_CALLBABY] = [
		"Come to me, honey~",
		"Type:^777777 Support ^000000",
		"Effect:^777777 Parent character summons adopted child to a spot adjacent to parent's current location. ^000000",
	].join("\n");

	SkillDescription[SKID.TK_RUN] = [
		"Running",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Movement & Passive ^000000",
		"SP Cost:^777777 110 - 10*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 7 - SkillLV sec, minimum 0 ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 Instant, see below ^000000",
		"Effect:^777777 When you use this skill, your character starts running straight forward. You cannot change direction of where he is running while running.",
		"You can stop using Running skill by simply using it again (no SP cost to stop), or use another skill, or run into the wall.",
		"When you use this skill (At least at level 7) and then immediately stop, then there will be +10 STR buff and a +(10*SkillLV)% damage to the Kick skills for 150 seconds if you are un-armed (only works on TK and SG, not SL).",
		"When you do not have any weapons equipped, the kicking skill damage will increase by +10 per level of this skill, for maximum of +100. ^000000",
	].join("\n");

	SkillDescription[SKID.TK_READYSTORM] = [
		"Prepare Whirlwind Kick",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 1 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Until turned off ^000000",
		"Effect:^777777 This is a skill you can turn ON and OFF by pressing the skill button.",
		"When you leave this ON, there's 15% chance of doing the Whirlwind preparation stance when you hit the enemy with normal attack. It remains after death. ^000000",
	].join("\n");

	SkillDescription[SKID.TK_STORMKICK] = [
		"Whirlwind Kick",
		"Max Level:^777777 7 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 16 - 2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 When you have prepared the Whirlwind Stance, then you can use this to deal damage in an area of 5x5 cells from where you stand.",
		"Damage is (160+20*SkillLV)% ATK ^000000",
		"[LV 1]^777777 180% ATK ^000000",
		"[LV 2]^777777 200% ATK ^000000",
		"[LV 3]^777777 220% ATK ^000000",
		"[LV 4]^777777 240% ATK ^000000",
		"[LV 5]^777777 260% ATK ^000000",
		"[LV 6]^777777 280% ATK ^000000",
		"[LV 7]^777777 300% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.TK_READYDOWN] = [
		"Prepare Axe Kick",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 1 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Until turned off ^000000",
		"Effect:^777777 This is a skill you can turn ON and OFF by simply pressing the skill button.",
		"When you leave this ON, there's 15% chance of doing the Axe Kick preparation stance when you hit the enemy with normal attack. It remains after death. ^000000",
	].join("\n");

	SkillDescription[SKID.TK_DOWNKICK] = [
		"Axe Kick",
		"Max Level:^777777 7 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 16 - 2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 When you use this skill while you have the Axe Kick Stance prepared, you hit a single enemy for 160%+20*SkillLV ATK and cause stun for 3 sec. ^000000",
		"[LV 1]^777777 180% ATK ^000000",
		"[LV 2]^777777 200% ATK ^000000",
		"[LV 3]^777777 220% ATK ^000000",
		"[LV 4]^777777 240% ATK ^000000",
		"[LV 5]^777777 260% ATK ^000000",
		"[LV 6]^777777 280% ATK ^000000",
		"[LV 7]^777777 300% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.TK_READYTURN] = [
		"Prepare Round Kick",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 1 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Until turned off ^000000",
		"Effect:^777777 This is a skill you can turn ON and OFF by pressing the skill button.",
		"When you leave this ON, there's 15% chance of doing the Round Kick preparation stance when you hit the enemy with normal attack. It remains after death. ^000000",
	].join("\n");

	SkillDescription[SKID.TK_TURNKICK] = [
		"Round Kick",
		"Max Level:^777777 7 ^000000",
		"Type:^777777 Offensive ^000000",
		"Type:^000099 Passive ^000000",
		"SP Cost:^777777 16 - 2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Melee, 3x3 area ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 When you use this skill while you have Round Kick Stance prepared, you hit a single enemy strongly for (190+30*SkillLV)% ATK damage.",
		"All enemies around 3x3 cells of the target enemy will be pushed away and stunned with no damage. ^000000",
		"[LV 1]^777777 220% ATK ^000000",
		"[LV 2]^777777 250% ATK ^000000",
		"[LV 3]^777777 280% ATK ^000000",
		"[LV 4]^777777 310% ATK ^000000",
		"[LV 5]^777777 340% ATK ^000000",
		"[LV 6]^777777 370% ATK ^000000",
		"[LV 7]^777777 400% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.TK_READYCOUNTER] = [
		"Prepare Counter Kick",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 1 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 None ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Until turned off ^000000",
		"Effect:^777777 This is a skill you can turn ON and OFF by pressing the skill button.",
		"When you leave this ON, there's 20% chance of doing the Counter Kick preparation stance when you hit the enemy with normal attack. It remains after death. ^000000",
	].join("\n");

	SkillDescription[SKID.TK_COUNTER] = [
		"Counter Kick",
		"Max Level:^777777 7 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 16 - 2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 When you use this skill while you have Counter Kick Stance prepared, it will hit the single enemy target with a 100% success and cause (190+30*SkillLV)% damage. ^000000",
		"[LV 1]^777777 220% ATK ^000000",
		"[LV 2]^777777 250% ATK ^000000",
		"[LV 3]^777777 280% ATK ^000000",
		"[LV 4]^777777 310% ATK ^000000",
		"[LV 5]^777777 340% ATK ^000000",
		"[LV 6]^777777 370% ATK ^000000",
		"[LV 7]^777777 400% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.TK_DODGE] = [
		"Break Fall",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 1 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 4 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Until turned off ^000000",
		"Effect:^777777 This is a skill you can turn ON and OFF by pressing the skill button.",
		"When you leave this ON, there's 20% chance of dodging an enemy ranged Physical or Magic attacks. It is not removed after death. ^000000",
	].join("\n");

	SkillDescription[SKID.TK_JUMPKICK] = [
		"Flying Side Kick",
		"Max Level:^777777 7 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 80 - 10*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Attack an enemy who is away from you by jumping at him/her/it, landing in the same cell than your target.",
		"Normally, you would have to target this skill manually to attack, but if you use it while doing Break Fall, you will automatically attack the dodged target.",
		"The damage of this skill is (30+10*SkillLV)%, but if used right after Break Fall, it becomes stronger as your BaseLV goes up.",
		"Also, this skill has a unique property, when you hit the target player, any TaeKwon/Star Gladiator/Soul Linker-based buffs - such as all Spirit buffs, new skills bestowed by Spirit buffs, or Berserk Potion acquired through Berserk Pitcher - they may have, are all dispelled.",
		"However, if the target player has Preserve skill used on them, then they are invulnerable to this dispel effect. This skill can be Plagiarized by a Rogue.",
		"When this skill is used while using Running skill, the power of this ability will increase based on the character BaseLV.",
		"The power of this skill goes up even further if you do it while under \"spurt\" mode in Running skill. ^000000",
		"[LV 1]^777777 40% ATK ^000000",
		"[LV 2]^777777 50% ATK ^000000",
		"[LV 3]^777777 60% ATK ^000000",
		"[LV 4]^777777 70% ATK ^000000",
		"[LV 5]^777777 80% ATK ^000000",
		"[LV 6]^777777 90% ATK ^000000",
		"[LV 7]^777777 100% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.TK_HPTIME] = [
		"Peaceful Rest",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 If there is another TaeKwon, Star Gladiator or Soul Linker sitting next to you while sitting, this skill activates, allowing you to regenerate HP.",
		"The HP recovered listed just below is the base value, and it increases depending on your VIT. This skill no longer works when you are overweight. ^000000",
		"[LV 1]^777777 30 HP ^000000",
		"[LV 2]^777777 60 HP ^000000",
		"[LV 3]^777777 90 HP ^000000",
		"[LV 4]^777777 120 HP ^000000",
		"[LV 5]^777777 160 HP ^000000",
		"[LV 6]^777777 180 HP ^000000",
		"[LV 7]^777777 210 HP ^000000",
		"[LV 8]^777777 240 HP ^000000",
		"[LV 9]^777777 270 HP ^000000",
		"[LV 10]^777777 300 HP ^000000",
	].join("\n");

	SkillDescription[SKID.TK_SPTIME] = [
		"Enjoyable Rest",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 If there is another TaeKwon, Star Gladiator or Soul Linker sitting next to you while sitting, this skill activates, allowing you to regenerate SP.",
		"The SP recovered listed just below is the base value, and it increases depending on your INT. This skill no longer works when you are overweight.",
		"If both players sit and use /doridori while under this skill effects, an icon appear and then the Happy Status is triggered for both for 30 minutes.",
		"If you use \"Earth Spike Scroll\" while under this Happy Status, it takes 10 SP and has a small chance of using this scroll up.",
		"At level 1, it uses it up at 10% chance, and at level 10, it uses at 1% chance. The Happy Status remains after death. ^000000",
		"[LV 1]^777777 3 SP ^000000",
		"[LV 2]^777777 6 SP ^000000",
		"[LV 3]^777777 9 SP ^000000",
		"[LV 4]^777777 12 SP ^000000",
		"[LV 5]^777777 16 SP ^000000",
		"[LV 6]^777777 18 SP ^000000",
		"[LV 7]^777777 21 SP ^000000",
		"[LV 8]^777777 24 SP ^000000",
		"[LV 9]^777777 27 SP ^000000",
		"[LV 10]^777777 30 SP ^000000",
	].join("\n");

	SkillDescription[SKID.TK_POWER] = [
		"Fighting Chant",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 It increases your ATK (2*SkillLV)% per party member on the same map.",
		"For example, if there are 10 party members, and you have LV 5 in this skill, your ATK is increased by 100%.",
		"The increase is applied to the BASE ATK rate, not counting in any other buffs that may have increased your ATK, and for skills that increase ATK above 500%, the calculation is fixed to (100 * Bonus%) + 500%. ^000000",
		"[LV 1]^777777 2% per person in party ^000000",
		"[LV 2]^777777 4% per person in party ^000000",
		"[LV 3]^777777 6% per person in party ^000000",
		"[LV 4]^777777 8% per person in party ^000000",
		"[LV 5]^777777 10% per person in party ^000000",
	].join("\n");

	SkillDescription[SKID.TK_SEVENWIND] = [
		"Warm Wind",
		"Max Level:^777777 7 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 for LV 1-4, 50 for the rest ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 300 sec ^000000",
		"Effect:^777777 This skill changes your attack element according to used skill level. When the weapon is removed or changed, the enchant remains for all except the Holy element. ^000000",
		"[LV 1]^777777 Earth ^000000",
		"[LV 2]^777777 Wind ^000000",
		"[LV 3]^777777 Water ^000000",
		"[LV 4]^777777 Fire ^000000",
		"[LV 5]^777777 Ghost ^000000",
		"[LV 6]^777777 Shadow ^000000",
		"[LV 7]^777777 Holy ^000000",
	].join("\n");

	SkillDescription[SKID.TK_HIGHJUMP] = [
		"High Jump",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 50 ^000000",
		"Target:^777777 Tile ^000000",
		"Range:^777777 2*SkillLV cells ^000000",
		"Cast Time:^777777 6 - SkillLV sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 You jump over 2*SkillLV cells in the direction where you are facing. If the landing cell is stepable and NOT occupied by a player, it can jump over obstacles such as walls; if the landing cell can't be used, you will just jump on the spot you are standing on and won't move.",
		"After learning this skill, the Cast Time of the Emergency Call skill (if you are the Guild Leader) will double! ^000000",
		"[LV 1]^777777 2 cell jump ^000000",
		"[LV 2]^777777 4 cell jump ^000000",
		"[LV 3]^777777 6 cell jump ^000000",
		"[LV 4]^777777 8 cell jump ^000000",
		"[LV 5]^777777 10 cell jump ^000000",
	].join("\n");

	SkillDescription[SKID.SG_FEEL] = [
		"Feeling of the Sun, Moon and Stars",
		"Blessing of the Sun (L1), Blessing of the Moon (L2), Blessing of the Stars (L3). ^000000",
		"Max Level:^777777 3 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 100 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Permanently memorize a map. Can select the same map for the 3 Feelings if desired.",
		"After 'memorizing' a place, when you use this again, it will display you the memorized location.",
		"Do note, that you can use this only ONCE. Yes, only ONCE. You cannot assign a new place to memorize by using this skill again.",
		"When you use it, the game will ask you if you are sure about memorizing that place. ^000000",
		"[LV 1]^777777 memorize as \"Place of the Sun\" ^000000",
		"[LV 2]^777777 memorize as \"Place of the Moon\" ^000000",
		"[LV 3]^777777 memorize as \"Place of the Stars\" ^000000",
	].join("\n");

	SkillDescription[SKID.SG_SUN_WARM] = [
		"Warmth of the Sun",
		"Max Level:^777777 3 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 + see below ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 3x3 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 10 sec, 20 sec 60 sec or until SP run out ^000000",
		"Effect:^777777 You can use this skill anytime in a map designated as \"Place of the Sun\" (in other maps the skill don't trigger and the SP is not spent).",
		"When this skill is used, it creates an offensive barrier around you, affecting 3x3 cells centered on you. It deals 100% damage to monsters right next to you, and push them back by 2 cells. Enemy players receive SP damage instead of HP, and no push back.",
		"Every time the barrier hits, it takes away 2 SP. If you do not have enough SP, the barrier will disappear without making damage. ^000000",
		"[LV 1]^777777 lasts 10 sec ^000000",
		"[LV 2]^777777 lasts 20 sec ^000000",
		"[LV 3]^777777 lasts 60 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SG_MOON_WARM] = [
		"Warmth of the Moon",
		"Max Level:^777777 3 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 + see below ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 3x3 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 10 sec, 20 sec 60 sec or until SP run out ^000000",
		"Effect:^777777 You can use this skill anytime in a map designated as \"Place of the Moon\" (in other maps the skill don't trigger and the SP is not spent).",
		"When this skill is used, it creates an offensive barrier around you, affecting 3x3 cells centered on you. It deals 100% damage to monsters right next to you, and push them back by 2 cells. Enemy players receive SP damage instead of HP, and no push back.",
		"Every time the barrier hits, it takes away 2 SP. If you do not have enough SP, the barrier will disappear without making damage. ^000000",
		"[LV 1]^777777 lasts 10 sec ^000000",
		"[LV 2]^777777 lasts 20 sec ^000000",
		"[LV 3]^777777 lasts 60 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SG_STAR_WARM] = [
		"Warmth of the Stars",
		"Max Level:^777777 3 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 + see below ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 3x3 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 10 sec, 20 sec 60 sec or until SP run out ^000000",
		"Effect:^777777 You can use this skill anytime in a map designated as \"Place of the Stars\" (in other maps the skill don't trigger and the SP is not spent).",
		"When this skill is used, it creates an offensive barrier around you, affecting 3x3 cells centered on you. It deals 100% damage to monsters right next to you, and push them back by 2 cells. Enemy players receive SP damage instead of HP, and no push back.",
		"Every time the barrier hits, it takes away 2 SP. If you do not have enough SP, the barrier will disappear without making damage. ^000000",
		"[LV 1]^777777 lasts 10 sec ^000000",
		"[LV 2]^777777 lasts 20 sec ^000000",
		"[LV 3]^777777 lasts 60 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SG_SUN_COMFORT] = [
		"Comfort of the Sun",
		"Max Level:^777777 4 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 80 - 10*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 80*SkillLV sec ^000000",
		"Effect:^777777 It can be used anytime when you are in the Day of the Sun in the map that is memorized as \"Place of the Sun\" (in other days or maps the skill don't trigger and the SP is not spent).",
		"This skill increases your VIT Defense by (LV+DEX+LUK)/2. If DEF changes during its duration, the skill is cancelled. ^000000",
		"[LV 1]^777777 80 sec ^000000",
		"[LV 2]^777777 160 sec ^000000",
		"[LV 3]^777777 240 sec ^000000",
		"[LV 4]^777777 320 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SG_MOON_COMFORT] = [
		"Comfort of the Moon",
		"Max Level:^777777 4 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 80 - 10*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 80*SkillLV sec ^000000",
		"Effect:^777777 It can be used anytime when you are in the Day of the Moon in the map that is memorized as \"Place of the Moon\" (in other days or maps the skill don't trigger and the SP is not spent).",
		"This skill increases your Flee Rate by (LV+DEX+LUK)/10. ^000000",
		"[LV 1]^777777 80 sec ^000000",
		"[LV 2]^777777 160 sec ^000000",
		"[LV 3]^777777 240 sec ^000000",
		"[LV 4]^777777 320 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SG_STAR_COMFORT] = [
		"Comfort of the Stars",
		"Max Level:^777777 4 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 80 - 10*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 80*SkillLV sec ^000000",
		"Effect:^777777 It can be used anytime when you are in the Day of the Stars in the map that is memorized as \"Place of the Stars\" (in other days or maps the skill don't trigger and the SP is not spent).",
		"This skill increases your ASPD by [(LV+DEX+LUK)/10]%. ^000000",
		"[LV 1]^777777 80 sec ^000000",
		"[LV 2]^777777 160 sec ^000000",
		"[LV 3]^777777 240 sec ^000000",
		"[LV 4]^777777 320 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SG_HATE] = [
		"Hatred of the Sun, Moon, and Stars",
		"Max Level:^777777 3 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 100 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Forever ^000000",
		"Effect:^777777 Can be casted only once per Target. When you use this skill, the name of the monster whom you just marked will be displayed and marked.",
		"You can also use this on player characters, and they will be categorized by class, ignoring size and HP.",
		"Example: It will show above the player characters, Champion, if target player was a Champion character, and on all other characters who are of Champion class. ^000000",
		"[LV 1]^777777 Mark as Target of the Sun. On mobs, it can only be used on Small monsters. ^000000",
		"[LV 2]^777777 Mark as Target of the Moon. On mobs, it can only be used on Medium size monsters that have a Maximum HP higher than 6,000. ^000000",
		"[LV 3]^777777 Mark as Target of the Stars. On mobs, it can only be used on Large size monsters that have a Maximum HP higher than 20,000. ^000000",
	].join("\n");

	SkillDescription[SKID.SG_SUN_ANGER] = [
		"Anger of the Sun",
		"Max Level:^777777 3 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Grants a bonus of +((BaseLV+LUK+DEX)/(13-3*SkillLV))% ATK against Target of the Sun mobs. ^000000",
		"[LV 1]^777777 +((BaseLV+LUK+DEX)/9)% ATK ^000000",
		"[LV 2]^777777 +((BaseLV+LUK+DEX)/6)% ATK ^000000",
		"[LV 3]^777777 +((BaseLV+LUK+DEX)/3)% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.SG_MOON_ANGER] = [
		"Anger of the Moon",
		"Max Level:^777777 3 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Grants a bonus of +((BaseLV+LUK+DEX)/(13-3*SkillLV))% ATK against Target of the Moon mobs. ^000000",
		"[LV 1]^777777 +((BaseLV+LUK+DEX)/9)% ATK ^000000",
		"[LV 2]^777777 +((BaseLV+LUK+DEX)/6)% ATK ^000000",
		"[LV 3]^777777 +((BaseLV+LUK+DEX)/3)% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.SG_STAR_ANGER] = [
		"Anger of the Stars",
		"Max Level:^777777 3 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Grants a bonus of +((BaseLV+LUK+DEX)/(13-3*SkillLV))% ATK against Target of the Stars mobs. ^000000",
		"[LV 1]^777777 +((BaseLV+LUK+DEX)/9)% ATK ^000000",
		"[LV 2]^777777 +((BaseLV+LUK+DEX)/6)% ATK ^000000",
		"[LV 3]^777777 +((BaseLV+LUK+DEX)/3)% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.SG_SUN_BLESS] = [
		"Blessing of the Sun",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases EXP given by Target of the Sun (monsters only) in the Day of the Sun by (10*SkillLV)%. ^000000",
		"[LV 1]^777777 +10% EXP ^000000",
		"[LV 2]^777777 +20% EXP ^000000",
		"[LV 3]^777777 +30% EXP ^000000",
		"[LV 4]^777777 +40% EXP ^000000",
		"[LV 5]^777777 +50% EXP ^000000",
	].join("\n");

	SkillDescription[SKID.SG_MOON_BLESS] = [
		"Blessing of the Moon",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases EXP given by Target of the Moon (monsters only) in the Day of the Moon by (10*SkillLV)%. ^000000",
		"[LV 1]^777777 +10% EXP ^000000",
		"[LV 2]^777777 +20% EXP ^000000",
		"[LV 3]^777777 +30% EXP ^000000",
		"[LV 4]^777777 +40% EXP ^000000",
		"[LV 5]^777777 +50% EXP ^000000",
	].join("\n");

	SkillDescription[SKID.SG_STAR_BLESS] = [
		"Blessing of the Stars",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increases EXP given by Target of the Stars (monsters only) in the Day of the Stars by (20*SkillLV)%. ^000000",
		"[LV 1]^777777 +20% EXP ^000000",
		"[LV 2]^777777 +40% EXP ^000000",
		"[LV 3]^777777 +60% EXP ^000000",
		"[LV 4]^777777 +80% EXP ^000000",
		"[LV 5]^777777 +100% EXP ^000000",
	].join("\n");

	SkillDescription[SKID.SG_DEVIL] = [
		"Demon of the Sun, Moon and Stars",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^ffff00 Requires JobLV 50 before the skill starts to work!. ^000000",
		"^777777Sacrifices your sight in return for increasing your ASPD by (3*SkillLV)%. The sight of your character will be decreased more with each point put in this skill, and look similar to the Blind status effect. ^000000",
		"[LV 1]^777777 +3% ASPD ^000000",
		"[LV 2]^777777 +6% ASPD ^000000",
		"[LV 3]^777777 +9% ASPD ^000000",
		"[LV 4]^777777 +12% ASPD ^000000",
		"[LV 5]^777777 +15% ASPD ^000000",
		"[LV 6]^777777 +18% ASPD ^000000",
		"[LV 7]^777777 +21% ASPD ^000000",
		"[LV 8]^777777 +24% ASPD ^000000",
		"[LV 9]^777777 +27% ASPD ^000000",
		"[LV 10]^777777 +30% ASPD ^000000",
	].join("\n");

	SkillDescription[SKID.SG_FRIEND] = [
		"Friend of the Sun, Moon and Stars",
		"Max Level:^777777 3 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 When Star Gladiator uses Counter Kick, all Monks in the same party will have their Triple Attack chance increased.",
		"If the Monks who are in same party as Star Gladiator activate Combo Finish, Star Gladiator's chance of Counter Kick increases.",
		"The chance increase is not added to the current one, e.g. having this skill at LV 1 will not give 100% Triple Attack/Counter Kick but just double the chance for those skills to occur. ^000000",
		"[LV 1]^777777 +100%, base chance x 1.2 ^000000",
		"[LV 2]^777777 +150%, base chance x 1.5 ^000000",
		"[LV 3]^777777 +200%, base chance x 2 ^000000",
	].join("\n");

	SkillDescription[SKID.SG_KNOWLEDGE] = [
		"Knowledge of the Sun, Moon and Stars",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 When you login the game on a map (only login, NOT by walking/teleporting) that is designated as Place of the Sun, or Moon, or Stars, this passive skill grants you increased weight capacity at +(10*SkillLV)%.",
		"If you stay outside the Place of the Sun, or Moon, or Stars for too long, this effect disappears. ^000000",
		"[LV 1]^777777 +10% ^000000",
		"[LV 2]^777777 +20% ^000000",
		"[LV 3]^777777 +30% ^000000",
		"[LV 4]^777777 +40% ^000000",
		"[LV 5]^777777 +50% ^000000",
		"[LV 6]^777777 +60% ^000000",
		"[LV 7]^777777 +70% ^000000",
		"[LV 8]^777777 +80% ^000000",
		"[LV 9]^777777 +90% ^000000",
		"[LV 10]^777777 +100% ^000000",
	].join("\n");

	SkillDescription[SKID.SG_FUSION] = [
		"Union of the Sun, Moon and Stars",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 100 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 600 sec ^000000",
		"Effect:^777777 The power of this skill is unleashed when linked to a Soul Linker using the Star Gladiator Spirit (if not linked, the SP is wasted and nothing happens).",
		"When linked, your movement speed is increased and all your attacks never miss and ignore DEF, but you lose 2% of your HP every time you attack a monster and 8% HP every time you attack a player,",
		"also if you attack a player when you only have 20% HP left, you will be killed instantly afterwards. ^000000",
	].join("\n");

	SkillDescription[SKID.SL_ALCHEMIST] = [
		"Alchemist Spirit",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 560 - 100*SkillLV ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 100 + 50*SkillLV sec ^000000",
		"Effect:^777777 Soullinks to Alchemists and Creators, giving them special buffs for the skill's duration.",
		"- Increases effectiveness of Potion Pitcher by Soul Linker's BaseLV% (if the Soul Linker is BaseLV 68, Potion Pitcher heals +68%.",
		"- Allows usage of Berserk Pitcher skill.",
		"- Alchemists having Pharmacy LV 10 are allowed to use Twilight Alchemy I.",
		"- If there is a Super Novice in the party the Alchemist is further allowed to use Twilight Alchemy II.",
		"- If there is a TaeKwon in the party the Alchemist is further allowed to use Twilight Alchemy III. ^000000",
	].join("\n");

	SkillDescription[SKID.AM_BERSERKPITCHER] = [
		"Berserk Pitcher",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Ally ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 0.5 sec ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Half Berserk Potion duration ^000000",
		"Catalyst:^777777 2 Berserk Potion ^000000",
		"Effect:^777777 Throws a Berserk Potion at the target, that takes effect ignoring class restrictions, but the target still needs to be BaseLV 85 or more. ^000000",
	].join("\n");

	SkillDescription[SKID.SL_MONK] = [
		"Monk Spirit",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 560 - 100*SkillLV ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 100 + 50*SkillLV sec ^000000",
		"Effect:^777777 Soullinks to Monks and Champions, giving them special buffs for the skill's duration.",
		"- The Combo Finish attack becomes a 5x5 cell splash attack.",
		"- SP Cost of combo skills is decreased.",
		"- Allow SP regeneration in Critical Explosion state. ^000000",
	].join("\n");

	SkillDescription[SKID.SL_STAR] = [
		"Star Gladiator Spirit",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 560 - 100*SkillLV ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 100 + 50*SkillLV sec ^000000",
		"Effect:^777777 Soullinks to Star Gladiators, allowing the usage of the \"Union of the Sun, Moon and Stars\" skill. ^000000",
	].join("\n");

	SkillDescription[SKID.SL_SAGE] = [
		"Sage Spirit",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 560 - 100*SkillLV ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 100 + 50*SkillLV sec ^000000",
		"Effect:^777777 Soullinks to Sages and Professors, allowing their Auto Spell Skill to always produce LV 10 Bolts if the Sage has learned that much in the Bolt Skill. ^000000",
	].join("\n");

	SkillDescription[SKID.SL_CRUSADER] = [
		"Crusader Spirit",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 560 - 100*SkillLV ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 100 + 50*SkillLV sec ^000000",
		"Effect:^777777 Soullinks to Crusaders and Paladins, making their Shield Boomerang never miss, do double the damage, and halving its after cast delay. ^000000",
	].join("\n");

	SkillDescription[SKID.SL_SUPERNOVICE] = [
		"Super Novice Spirit",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 560 - 100*SkillLV ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 100 + 50*SkillLV sec ^000000",
		"Effect:^777777 Soullinks to Super Novices, giving them special buffs for the skill's duration.",
		"- Super Novices above LV 90 will be temporarily able to equip ALL Upper/Middle/Lower headgears.",
		"- Super Novices above LV 90 have 1% chance to 'erase' the death record - which means, the last 1% EXP loss will be recovered.",
		"- Super Novices above LV 96 will be temporarily able to equip LV 4 Daggers, 1H Swords, Axes, Maces, and Staffs. ^000000",
	].join("\n");

	SkillDescription[SKID.SL_KNIGHT] = [
		"Knight Spirit",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 560 - 100*SkillLV ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 100 + 50*SkillLV sec ^000000",
		"Effect:^777777 Soullinks to Knights and Lord Knights, allowing those who have Two-Hand Quicken LV 10 to use One-Hand Quicken for the skill's duration. ^000000",
	].join("\n");

	SkillDescription[SKID.SL_WIZARD] = [
		"Wizard Spirit",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 560 - 100*SkillLV ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 100 + 50*SkillLV sec ^000000",
		"Effect:^777777 Soullinks to Wizards and High Wizards, allowing them to cast all Gemstone requiring Skills without using them up (however, it still requires the Wizard to have at least one of the respective Gemstone) for the skill's duration.",
		"When the Wizard has a \"Crystal Fragment\" while under this skill's effect, the item will be used, and any spells that were reflected back to you via Kaite will simply disappear instead of hitting you. ^000000",
	].join("\n");

	SkillDescription[SKID.SL_PRIEST] = [
		"Priest Spirit",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 560 - 100*SkillLV ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 100 + 50*SkillLV sec ^000000",
		"Effect:^777777 Soullinks to Priests and High Priests, boosting the power of Holy Light by +400% but also increasing its SP Cost by +400% for the skill's duration. ^000000",
	].join("\n");

	SkillDescription[SKID.SL_BARDDANCER] = [
		"Bard and Dancer Spirits",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 560 - 100*SkillLV ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 100 + 50*SkillLV sec ^000000",
		"Effect:^777777 Soullinks to Bards, Clowns, Dancers and Gypsies, giving them special buffs for the skill's duration.",
		"- All singing/dancing skills affect the Bard/Dancer him/herself.",
		"- While singing/dancing the walking speed is increased.",
		"- A Whistle and Humming linked.",
		"- Assassin Cross of Sunset and Please Don't Forget Me linked.",
		"- A Poem of Bragi and Fortune's Kiss linked.",
		"- The Apple of Idun and Service for You linked.",
		"Linked means, if X skill is mastered, then Y skill can be used too while in \"Spirit\" mode. ^000000",
	].join("\n");

	SkillDescription[SKID.SL_ROGUE] = [
		"Rogue Spirit",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 560 - 100*SkillLV ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 100 + 50*SkillLV sec ^000000",
		"Effect:^777777 Soullinks to Rogues and Stalkers, giving them special buffs for the skill's duration.",
		"- Dispell no longer removes your buffs.",
		"- Potions created by someone who is high on the alchemist rank have their effect increased.",
		"- STR bonus from Tunnel Drive will last 5 minutes and walking speed will also increase. ^000000",
	].join("\n");

	SkillDescription[SKID.SL_ASSASIN] = [
		"Assassin Spirit",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 560 - 100*SkillLV ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 100 + 50*SkillLV sec ^000000",
		"Effect:^777777 Soullinks to Assassins and Assassins Cross, boosting their Sonic Blow by doubling its damage and halving the Cool Down for the skill's duration.",
		"However, the bonuses are reduced to +25% bonus damage and no Cool Down bonus when in Siege Mode (WoE) ^000000",
	].join("\n");

	SkillDescription[SKID.SL_BLACKSMITH] = [
		"Blacksmith Spirit",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 560 - 100*SkillLV ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 100 + 50*SkillLV sec ^000000",
		"Effect:^777777 Soullinks to Blacksmiths and Whitesmiths, allowing them to use Full Adrenaline Rush if they have Adrenaline Rush LV5 for the skill's duration. ^000000",
	].join("\n");

	SkillDescription[SKID.BS_ADRENALINE2] = [
		"Full Adrenaline Rush",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 64 ^000000",
		"Target:^777777 Party ^000000",
		"Range:^777777 4 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 150 sec ^000000",
		"Effect:^777777 Decreases character's attack delay with all weapons, including ranged by 30%. Decreases nearby party menbers attack delay with all weapons except ranged by 20%.",
		"These two effects are supposed to stack with each other when used by more than one Smith in a party. Changing from a mace/axe to any other weapon (including bare fists) cancels the effect.",
		"Does not stack with other skills that directly increase ASPD. ^000000",
	].join("\n");

	SkillDescription[SKID.SL_HUNTER] = [
		"Hunter Spirit",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 560 - 100*SkillLV ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 100 + 50*SkillLV sec ^000000",
		"Effect:^777777 Soullinks to Hunters and Snipers, giving them special buffs for the skill's duration.",
		"- Effectiveness of Beast Bane is increased by Hunters/Snipers STR.",
		"- If Double Strafing is LV 10, a new skill, Beast Strafing, will be available. ^000000",
	].join("\n");

	SkillDescription[SKID.SL_SOULLINKER] = [
		"Soul Linker Spirit",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 560 - 100*SkillLV ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 100 + 50*SkillLV sec ^000000",
		"Effect:^777777 Soullinks to other Soul Linkers (you can not link to yourself), allowing them to use \"Ka- Type\" skills on any other class, for the skill's duration. ^000000",
	].join("\n");

	SkillDescription[SKID.SL_KAIZEL] = [
		"Kaizel",
		"Max Level:^777777 7 ^000000",
		"Type:^33cc00 Active ^000000^777777, Ka- Type ^000000",
		"SP Cost:^777777 130 - 10*SkillLV ^000000",
		"Target:^777777 See below ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 5 - 0.5*SkillLV sec (not reduced by DEX) ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 1800 sec ^000000",
		"Effect:^777777 When you die, you are immediately resurrected with (10*SkillLV)% HP. After being resurrected Kaizel is dispelled but you have a 2 seconds lasting Kyrie Eleison buff.",
		"This skill has no effect in guild siege / WoE. Can only be used on yourself, your spouse, children or other Soul Linkers; if used on someone else, the caster will be stunned for 0.5 sec (not reduced by VIT). ^000000",
		"[LV 1]^777777 10% HP at res ^000000",
		"[LV 2]^777777 20% HP at res ^000000",
		"[LV 3]^777777 30% HP at res ^000000",
		"[LV 4]^777777 40% HP at res ^000000",
		"[LV 5]^777777 50% HP at res ^000000",
		"[LV 6]^777777 60% HP at res ^000000",
		"[LV 7]^777777 70% HP at res ^000000",
	].join("\n");

	SkillDescription[SKID.SL_KAAHI] = [
		"Kaahi",
		"Max Level:^777777 7 ^000000",
		"Type:^33cc00 Active ^000000^777777, Ka- Type ^000000",
		"SP Cost:^777777 30 ^000000",
		"Target:^777777 See below ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 1800 sec ^000000",
		"Effect:^777777 While this buff lasts, every time you are successfully attacked (skill attacks are not affected), it takes 5*SkillLV SP and heals 200*SkillLV HP. If you receive many attacks in a short time, the skill heal you for the total of the attacks (up to the heal limit).",
		"Can only be used on yourself, your spouse, children or other Soul Linkers; if used on someone else, the caster will be stunned for 0.5 sec (not reduced by VIT). ^000000",
		"[LV 1]^777777 5 SP taken, 200 HP healed ^000000",
		"[LV 2]^777777 10 SP taken, 400 HP healed ^000000",
		"[LV 3]^777777 15 SP taken, 600 HP healed ^000000",
		"[LV 4]^777777 20 SP taken, 800 HP healed ^000000",
		"[LV 5]^777777 25 SP taken, 1000 HP healed ^000000",
		"[LV 6]^777777 30 SP taken, 1200 HP healed ^000000",
		"[LV 7]^777777 35 SP taken, 1400 HP healed ^000000",
	].join("\n");

	SkillDescription[SKID.SL_KAUPE] = [
		"Kaupe",
		"Max Level:^777777 3 ^000000",
		"Type:^33cc00 Active ^000000^777777, Ka- Type ^000000",
		"SP Cost:^777777 10 + 10*SkillLV ^000000",
		"Target:^777777 See below ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 0.5 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 600 sec ^000000",
		"Effect:^777777 Allows you to absolutely evade an enemy attack. Evade all types of attacks from players (normal, skills, spells), but for area multi-hit spells like LoV only the 1st hit is dodged. It only dodge normal attacks from mobs, not their skills.",
		"When you evade even once, the effect disappears. Can only be used on yourself, your spouse, children or other Soul Linkers; if used on someone else, the caster will be stunned for 0.5 sec (not reduced by VIT). ^000000",
		"[LV 1]^777777 33% evade chance ^000000",
		"[LV 2]^777777 66% evade chance ^000000",
		"[LV 3]^777777 100% evade chance ^000000",
	].join("\n");

	SkillDescription[SKID.SL_KAITE] = [
		"Kaite",
		"Max Level:^777777 7 ^000000",
		"Type:^33cc00 Active ^000000^777777, Ka- Type ^000000",
		"SP Cost:^777777 70 ^000000",
		"Target:^777777 Self/Family ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 6.5 - 0.5*SkillLV sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 60*SkillLV sec, 600 sec for LV 7 ^000000",
		"Effect:^777777 Reflects all offensive magic and Heal back to the caster. It does not reflect status skills (those that make no damage) like Stone Curse.",
		"LV 1-4 reflect once, LV 5-7 reflect twice before disappearing. If the Heal skill used on you gets reflected, the amount of healing done to the caster will be reduced. Will not reflect spells from Boss monsters and monsters above LV 80.",
		"Can only be used on yourself, your spouse, children or other Soul Linkers; if used on someone else, the caster will be stunned for 0.5 sec (not reduced by VIT). ^000000",
		"[LV 1]^777777 1 reflect ^000000",
		"[LV 2]^777777 1 reflect ^000000",
		"[LV 3]^777777 1 reflect ^000000",
		"[LV 4]^777777 1 reflect ^000000",
		"[LV 5]^777777 2 reflect ^000000",
		"[LV 6]^777777 2 reflect ^000000",
		"[LV 7]^777777 2 reflect ^000000",
	].join("\n");

	SkillDescription[SKID.SL_KAINA] = [
		"Kaina",
		"Max Level:^777777 7 ^000000",
		"Type:^000099 Passive ^000000^777777, Ka- Type ^000000",
		"Effect:^777777 Increases the power of Enjoyable Rest by (30+10*SkillLV)% and Maximum SP by 30*SkillLV. Also, if your BaseLV is above 70, Kaina reduce Estin, Estun, Esma's SP Cost by (3*SkillLV)%.",
		"If BaseLV is above 80, (5*SkillLV)%. If BaseLV is above 90, (7*SkillLV)% for max of 49%. ^000000",
		"[LV 1]^777777 +40% Enj.Rest +30 Maximum SP ^000000",
		"[LV 2]^777777 +50% Enj.Rest +60 Maximum SP ^000000",
		"[LV 3]^777777 +60% Enj.Rest +90 Maximum SP ^000000",
		"[LV 4]^777777 +70% Enj.Rest +120 Maximum SP ^000000",
		"[LV 5]^777777 +80% Enj.Rest +150 Maximum SP ^000000",
		"[LV 6]^777777 +90% Enj.Rest +180 Maximum SP ^000000",
		"[LV 7]^777777 +100% Enj.Rest +210 Maximum SP ^000000",
	].join("\n");

	SkillDescription[SKID.SL_STIN] = [
		"Estin",
		"Max Level:^777777 7 ^000000",
		"Type:^777777 Offensive ^000000^777777, Es- Type ^000000",
		"SP Cost:^777777 16 + 2*SkillLV ^000000",
		"Target:^777777 Monster ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 0.1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Magical skill that attacks only Small monsters. The affected monster is pushed back by 2 cells. When this is used on monsters that are not Small, it will do nearly no damage, but it will push them back.",
		"When LV 7 version of this skill is used, you can use Esma for next 3 seconds.",
		"\"Es\" type magic can only be used on monsters. If it is used on a player character, nothing happens and the caster will be stunned for 0.5 sec (not reduced by VIT). ^000000",
		"[LV 1]^777777 10% MATK ^000000",
		"[LV 2]^777777 20% MATK ^000000",
		"[LV 3]^777777 30% MATK ^000000",
		"[LV 4]^777777 40% MATK ^000000",
		"[LV 5]^777777 50% MATK ^000000",
		"[LV 6]^777777 60% MATK ^000000",
		"[LV 7]^777777 70% MATK ^000000",
	].join("\n");

	SkillDescription[SKID.SL_STUN] = [
		"Estun",
		"Max Level:^777777 7 ^000000",
		"Type:^777777 Offensive ^000000^777777, Es- Type ^000000",
		"SP Cost:^777777 16 + 2*SkillLV ^000000",
		"Target:^777777 Monster ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 0.1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Magical skill that attacks only Medium monsters. The affected monster is stunned for 2 sec. When this is used on Small monsters it won't stun them, but it will do full damage.",
		"When LV 7 version of this skill is used, you can use Esma for next 3 seconds.",
		"\"Es\" type magic can only be used on monsters. If it is used on a player character, nothing happens and the caster will be stunned for 0.5 sec (not reduced by VIT). ^000000",
		"[LV 1]^777777 5% MATK ^000000",
		"[LV 2]^777777 10% MATK ^000000",
		"[LV 3]^777777 15% MATK ^000000",
		"[LV 4]^777777 20% MATK ^000000",
		"[LV 5]^777777 25% MATK ^000000",
		"[LV 6]^777777 30% MATK ^000000",
		"[LV 7]^777777 35% MATK ^000000",
	].join("\n");

	SkillDescription[SKID.SL_SMA] = [
		"Esma",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000^777777, Es- Type ^000000",
		"SP Cost:^777777 8*SkillLV ^000000",
		"Target:^777777 Monster ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Strong Magic attack that changes its element depending on Warm Wind. This skill can also be used (within 3 seconds) after casting any kind of \"Spirit\"-type buffs.",
		"\"Es\" type magic can only be used on monsters. If it is used on a player character, nothing happens and the caster will be stunned for 0.5 sec (not reduced by VIT). ^000000",
		"[LV 1]^777777 Damage: (40+BaseLV%) x 1 Missile ^000000",
		"[LV 2]^777777 Damage: (40+BaseLV%) x 2 Missiles ^000000",
		"[LV 3]^777777 Damage: (40+BaseLV%) x 3 Missiles ^000000",
		"[LV 4]^777777 Damage: (40+BaseLV%) x 4 Missiles ^000000",
		"[LV 5]^777777 Damage: (40+BaseLV%) x 5 Missiles ^000000",
		"[LV 6]^777777 Damage: (40+BaseLV%) x 6 Missiles ^000000",
		"[LV 7]^777777 Damage: (40+BaseLV%) x 7 Missiles ^000000",
		"[LV 8]^777777 Damage: (40+BaseLV%) x 8 Missiles ^000000",
		"[LV 9]^777777 Damage: (40+BaseLV%) x 9 Missiles ^000000",
		"[LV 10]^777777 Damage: (40+BaseLV%) x 10 Missiles ^000000",
	].join("\n");

	SkillDescription[SKID.SL_SWOO] = [
		"Eswoo",
		"Max Level:^777777 7 ^000000",
		"Type:^777777 Offensive ^000000^777777, Es- Type ^000000",
		"SP Cost:^777777 85 - 10*SkillLV ^000000",
		"Target:^777777 Monster ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 SkillLV sec ^000000",
		"Effect:^777777 Makes the monster small, greatly reducing their walking speed, but the size attribute is not affected. If this is used on a Boss monster, this skill only lasts 1/5 of normal time.",
		"If you use Eswoo on a monster that is already under this effect, it will cause you to be stunned for 10 seconds (reduced by VIT).",
		"\"Es\" type magic can only be used on monsters. If it is used on a player character, nothing happens and the caster will be stunned for 0.5 sec (not reduced by VIT). ^000000",
	].join("\n");

	SkillDescription[SKID.SL_SKE] = [
		"Eske",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Offensive ^000000^777777, Es- Type ^000000",
		"SP Cost:^777777 75 - 20*SkillLV ^000000",
		"Target:^777777 Monster ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 4 - SkillLV sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 10*SkillLV sec ^000000",
		"Effect:^777777 Increases monster's ATK by +300%, but halves their DEF. You can cast Esma within 3 seconds after using Eske.",
		"\"Es\" type magic can only be used on monsters. If it is used on a player character, nothing happens and the caster will be stunned for 0.5 sec (not reduced by VIT). ^000000",
		"[LV 1]^777777 Lasts 10 sec ^000000",
		"[LV 2]^777777 Lasts 20 sec ^000000",
		"[LV 3]^777777 Lasts 30 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SL_SKA] = [
		"Eska",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Offensive ^000000^777777, Es- Type ^000000",
		"SP Cost:^777777 120 - 20*SkillLV ^000000",
		"Target:^777777 Monster ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 4 - SkillLV sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 10*SkillLV sec ^000000",
		"Effect:^777777 Forces the monster to have a state similar to Monk Steel Body, but without blocking the skills. MDEF is set to 90 and DEF change randomly every second, ASPD is not affected. Works on Boss and Miniboss type monsters.",
		"\"Es\" type magic can only be used on monsters. If it is used on a player character, nothing happens and the caster will be stunned for 0.5 sec (not reduced by VIT). ^000000",
		"[LV 1]^777777 Lasts 10 sec ^000000",
		"[LV 2]^777777 Lasts 20 sec ^000000",
		"[LV 3]^777777 Lasts 30 sec ^000000",
	].join("\n");

	SkillDescription[SKID.ST_PRESERVE] = [
		"Preserve",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 30 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 1 ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 600 sec ^000000",
		"Effect:^777777 Allows Stalker to not change the skill learned via Plagiarism even when hit by a different skill for duration of the skill. ^000000",
	].join("\n");

	SkillDescription[SKID.ST_FULLSTRIP] = [
		"Full Strip",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 + 2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 60 + 15*SkillLV sec ^000000",
		"Effect:^777777 On player in PVP: Takes equipped weapon, shield, armor and helm off player and prevents a reequip of ANY weapon, shield, armor and helm for a certain time. On monster: reduces Attack by 10% and DEF by 30% for the skill's duration.",
		"Full Chemical Protection counters this skill. Success Chance is (5+2*SkillLV)%. ^000000",
		"[LV 1]^777777 7% Chance ^000000",
		"[LV 2]^777777 9% Chance ^000000",
		"[LV 3]^777777 11% Chance ^000000",
		"[LV 4]^777777 13% Chance ^000000",
		"[LV 5]^777777 15% Chance ^000000",
	].join("\n");

	SkillDescription[SKID.WS_WEAPONREFINE] = [
		"Weapon Refine",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Target:^777777 Self ^000000",
		"Effect:^777777 Enables you to refine weapons. Unlike Forging, this skill doesn't depend on DEX and LUK, but only on the character's job level.",
		"At job level 50, you have about the same chances of upgrading as Hollgrehenn.",
		"At job 70, you have an about 10% better success chance than Hollgrehenn.",
		"For level 1 Weapons, Phracon is needed.",
		"For level 2 Weapons, Emveretarcon is needed.",
		"For level 3/4 Weapons, Oridecon is needed. ^000000",
		"[LV 1]^777777 Up to +1 ^000000",
		"[LV 2]^777777 Up to +2 ^000000",
		"[LV 3]^777777 Up to +3 ^000000",
		"[LV 4]^777777 Up to +4 ^000000",
		"[LV 5]^777777 Up to +5 ^000000",
		"[LV 6]^777777 Up to +6 ^000000",
		"[LV 7]^777777 Up to +7 ^000000",
		"[LV 8]^777777 Up to +8 ^000000",
		"[LV 9]^777777 Up to +9 ^000000",
		"[LV 10]^777777 Up to +10 ^000000",
	].join("\n");

	SkillDescription[SKID.CR_SLIMPITCHER] = [
		"Slim Potion Pitcher",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Supportive, Level Selectable ^000000",
		"SP Cost:^777777 30 ^000000",
		"Target:^777777 Ground ^000000",
		"Range:^777777 3 cells (not confirmed) ^000000",
		"Area:^777777 7x7 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^777777 LV 1-5 Condensed Red, LV 6-9 Condensed Yellow, LV 10 Condensed White ^000000",
		"Effect:^777777 Uses a condensed potion. This skill heals all party and guild members in a 7x7 area around the target cell with a thrown condensed potion. Depending on the maximum skill level you possess the effectiveness of the used potion is increased. The thrown potion depends on the currently used skill level.",
		"[LV 1]^777777 +10% heal, pitches ^ff0000[Red] ^000000",
		"[LV 2]^777777 +20% heal, pitches ^ff0000[Red] ^000000",
		"[LV 3]^777777 +30% heal, pitches ^ff0000[Red] ^000000",
		"[LV 4]^777777 +40% heal, pitches ^ff0000[Red] ^000000",
		"[LV 5]^777777 +50% heal, pitches ^ff0000[Red] ^000000",
		"[LV 6]^777777 +60% heal, pitches^ffff00 [Yellow] ^000000",
		"[LV 7]^777777 +70% heal, pitches^ffff00 [Yellow] ^000000",
		"[LV 8]^777777 +80% heal, pitches^ffff00 [Yellow] ^000000",
		"[LV 9]^777777 +90% heal, pitches^ffff00 [Yellow] ^000000",
		"[LV 10]^777777 +100% heal, pitches [White] ^000000",
	].join("\n");

	SkillDescription[SKID.CR_FULLPROTECTION] = [
		"Full Chemical Protection",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Supportive ^000000",
		"Target:^777777 Player ^000000",
		"SP Cost:^777777 40 ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 120*SkillLV sec ^000000",
		"Catalyst:^777777 1 ^66cc33Glistening Coat ^000000",
		"Effect:^777777 Four kinds of Chemical Protection skills will be applied all at once. ^000000",
		"[LV 1]^777777 120 sec ^000000",
		"[LV 2]^777777 240 sec ^000000",
		"[LV 3]^777777 360 sec ^000000",
		"[LV 4]^777777 480 sec ^000000",
		"[LV 5]^777777 600 sec ^000000",
	].join("\n");

	SkillDescription[SKID.PA_SHIELDCHAIN] = [
		"Shield Chain",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 25 + 3*SkillLV ^000000",
		"Target:^777777 Single Enemy ^000000",
		"Range:^777777 4 ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Attack 5 times with your shield. HIT +20. Higher level of refinement and heavier shields will result in higher damage. This skill requires an equipped shield and ignores size modifications. ^000000",
		"[LV 1]^777777 30% ATK ^000000",
		"[LV 2]^777777 60% ATK ^000000",
		"[LV 3]^777777 90% ATK ^000000",
		"[LV 4]^777777 120% ATK ^000000",
		"[LV 5]^777777 150% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.HP_MANARECHARGE] = [
		"Mana Recharge",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Decreases SP Cost of all your skills. ^000000",
		"[LV 1]^777777 SP Cost for all skills -4% ^000000",
		"[LV 2]^777777 SP Cost for all skills -8% ^000000",
		"[LV 3]^777777 SP Cost for all skills -12% ^000000",
		"[LV 4]^777777 SP Cost for all skills -16% ^000000",
		"[LV 5]^777777 SP Cost for all skills -20% ^000000",
	].join("\n");

	SkillDescription[SKID.PF_DOUBLECASTING] = [
		"Double Casting",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 35 + 5*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 2 sec (not reduced by DEX) ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 90 sec ^000000",
		"Effect:^777777 During the skill's duration, all Bolt-type spells (including Auto-Spells) have a chance of being casted a second time instantly. ^000000",
		"[LV 1]^777777 40% Chance ^000000",
		"[LV 2]^777777 50% Chance ^000000",
		"[LV 3]^777777 60% Chance ^000000",
		"[LV 4]^777777 70% Chance ^000000",
		"[LV 5]^777777 80% Chance ^000000",
	].join("\n");

	SkillDescription[SKID.HW_GANBANTEIN] = [
		"Ganbantein",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 40 ^000000",
		"Target:^777777 3x3 Area ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 5 sec ^000000",
		"Catalyst:^0000ff 1 Blue Gemstone ^000000,^ffff00 1 Yellow Gemstone ^000000.",
		"Effect:^777777 Casts a spell that cancels all ground-targeted spells within the area. If casted upon Land Protector, it will cancel that spell within its area, but the rest of Land Protector will still be in effect.",
		"This skill is not affected by skills or cards that remove gemstone casting requirements. Success chance is 80% and it will still consume a Gemstone if it fails. ^000000",
	].join("\n");

	SkillDescription[SKID.HW_GRAVITATION] = [
		"Gravitation Field",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 20*SkillLV ^000000",
		"Target:^777777 5x5 Area ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 5 sec ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Duration:^777777 4 + SkillLV sec ^000000",
		"Catalyst:^0000ff 1 Blue Gemstone ^000000",
		"Effect:^777777 Greatly increases the force of gravity, reducing enemy ASPD while also dealing DEF-ignoring damage every second.",
		"The great difficulty of this skill prevents you from doing anything else while casting, including using items. When is active, the caster becomes immobile and cannot attack or use skills.",
		"The ASPD reduction is 5% per SkillLV. The movement and ASPD reduction does not affect Boss monsters, but you will still deal the DEF-ignoring damage. Requires^0000ff 1 Blue Gemstone ^000000",
		"[LV 1]^777777 400 Dmg/Sec | -5% ASPD | 5 sec | 20 SP ^000000",
		"[LV 2]^777777 600 Dmg/Sec | -10% ASPD | 6 sec | 40 SP ^000000",
		"[LV 3]^777777 800 Dmg/Sec | -15% ASPD | 7 sec | 60 SP ^000000",
		"[LV 4]^777777 1000 Dmg/Sec | -20% ASPD | 8 sec | 80 SP ^000000",
		"[LV 5]^777777 1200 Dmg/Sec | -25% ASPD | 9 sec | 100 SP ^000000",
	].join("\n");

	SkillDescription[SKID.WS_CARTTERMINATION] = [
		"Cart Termination",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 15 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Uses the power of Zeny to strike a single enemy with your cart. You must have Cart Boost activated in order to perform this skill, and it also uses Zeny. There is a chance to stun the enemy, and damage is dependent on the cart's weight. ^000000",
		"[LV 1]^777777 (Weight/15)% Attack | 600Z spent | 5% Stun Chance ^000000",
		"[LV 2]^777777 (Weight/14)% Attack | 700Z spent | 10% Stun Chance ^000000",
		"[LV 3]^777777 (Weight/13)% Attack | 800Z spent | 15% Stun Chance ^000000",
		"[LV 4]^777777 (Weight/12)% Attack | 900Z spent | 20% Stun Chance ^000000",
		"[LV 5]^777777 (Weight/11)% Attack | 1000Z spent | 25% Stun Chance ^000000",
		"[LV 6]^777777 (Weight/10)% Attack | 1100Z spent | 30% Stun Chance ^000000",
		"[LV 7]^777777 (Weight/9)% Attack | 1200Z spent | 35% Stun Chance ^000000",
		"[LV 8]^777777 (Weight/8)% Attack | 1300Z spent | 40% Stun Chance ^000000",
		"[LV 9]^777777 (Weight/7)% Attack | 1400Z spent | 45% Stun Chance ^000000",
		"[LV 10]^777777 (Weight/6)% Attack | 1500Z spent | 50% Stun Chance ^000000",
	].join("\n");

	SkillDescription[SKID.WS_OVERTHRUSTMAX] = [
		"Maximum Over Thrust",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 15 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 180 sec ^000000",
		"Effect:^777777 Use Zeny to increase Attack Power during the skill's duration. Unlike Over Thrust, this skill only affects you. There is a 0.1% chance to break your weapon with each hit. ATK increase is +20% per SkillLV. ^000000",
		"[LV 1]^777777 120% ATK | 3000Z spent ^000000",
		"[LV 2]^777777 140% ATK | 3500Z spent ^000000",
		"[LV 3]^777777 160% ATK | 4000Z spent ^000000",
		"[LV 4]^777777 180% ATK | 4500Z spent ^000000",
		"[LV 5]^777777 200% ATK | 5000Z spent ^000000",
	].join("\n");

	SkillDescription[SKID.CG_LONGINGFREEDOM] = [
		"Longing for Freedom",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 15 ^000000",
		"Upkeep SP Cost:^777777 3 SP every 3 sec (instead of 1 SP every 3 second normally taken when using a duet skill) ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Effect:^777777 Allows the user to move within the ensemble area during the use of an ensemble skill. This skill only affects the caster, so the partner must cast this skill on his or her own in order to move.",
		"The ensemble skill will be fixed to the area which it was casted, but if either partner moves out of the ensemble area, cancels the ensemble, or dies, the ensemble skill as well as Longing for Freedom will be canceled.",
		"The caster is allowed to move, attack, and use skills, but you cannot use other singing or ensemble skills. Longing for Freedom will not work within a Moonlit Water Mill.",
		"Can not be canceled by Dispell. ^000000",
		"[LV 1]^777777 60% original Movement/ASPD ^000000",
		"[LV 2]^777777 70% original Movement/ASPD ^000000",
		"[LV 3]^777777 80% original Movement/ASPD ^000000",
		"[LV 4]^777777 90% original Movement/ASPD ^000000",
		"[LV 5]^777777 100% original Movement/ASPD ^000000",
	].join("\n");

	SkillDescription[SKID.CG_HERMODE] = [
		"Wand of Hermode",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 + 10*SkillLV sec ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 7x7 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 5 + 5*SkillLV sec ^000000",
		"Effect:^777777 All allies within the skills area of effect (AoE) will have their buffs removed (except Berserk), but they will become invulnerable to magic as long as they stay in the AoE.",
		"No other skills can be used within the AoE. Requires a map warp point within the AoE and only works in WoE. The Caster is not affected by the song. Can not be canceled by Dispell. ^000000",
		"[LV 1]^777777 10 Sec Duration | 20 SP ^000000",
		"[LV 2]^777777 15 Sec Duration | 30 SP ^000000",
		"[LV 3]^777777 20 Sec Duration | 40 SP ^000000",
		"[LV 4]^777777 25 Sec Duration | 50 SP ^000000",
		"[LV 5]^777777 30 Sec Duration | 60 SP ^000000",
	].join("\n");

	SkillDescription[SKID.CG_TAROTCARD] = [
		"Tarot Card of Fate",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 40 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 3 sec ^000000",
		"Effect:^777777 Draw a Tarot card to foresee fate. There are 14 different cards, and the success rate depends on the skill level. ^000000",
		"[LV 1]^777777 8% Success Rate ^000000",
		"[LV 2]^777777 16% Success Rate ^000000",
		"[LV 3]^777777 24% Success Rate ^000000",
		"[LV 4]^777777 32% Success Rate ^000000",
		"[LV 5]^777777 40% Success Rate ^000000",
		"The Tarot Cards:",
		"^777777The Fool: ^000000 Mental disease. Beginning.",
		"-Enemy's SP reduced to 0. Right Side.",
		"^777777The Magician: ^000000 Taking action. Awareness.",
		"-Reduces enemy MATK by half for 30 seconds. Opposite Side.",
		"^777777The High Priest: ^000000 Withdrawal. Mystery.",
		"-Removes all buffs. Opposite Side.",
		"^777777The Chariot: ^000000 Victory. Hard control.",
		"-Deals 1000 DEF-ignoring damage. Randomly destroys one piece of armor. Opposite Side.",
		"^777777Strength: ^000000 Misled strength. Loss of confidence. Destruction of the nation.",
		"-Reduces enemy ATK by half for 30 seconds. Opposite Side.",
		"^777777The Lovers: ^000000 Farewell. Discovered cheating on someone.",
		"-Randomly teleports the target (on maps that allow teleport) and heals the caster for 2000 HP. Opposite Side.",
		"^777777Wheel of Fortune: ^000000 Destiny. Turning point. Movement.",
		"-Randomly causes the effects of two other Tarot cards. Opposite Side.",
		"^777777The Hanged Man: ^000000 Letting go. Giving up. Sacrifice.",
		"-Stun, Frozen, or Stone Curse regardless of anything else. Opposite Side.",
		"^777777Death: ^000000 Ending. Bad luck. Unexpected catastrophe. Difficulty.",
		"-Receive Curse, Coma, Poison, all at once. Right Side.",
		"^777777Temperance: ^000000 Impossible to control. Tiredness. Stubborn. Vanity.",
		"-Causes Confusion for 30 seconds. Opposite Side.",
		"^777777The Devil: ^000000 Obsession. Danger of sickness. Inevitable curse. Hopelessness.",
		"-Deals DEF-ignoring 6666 damage, halves ATK and MATK for 30 seconds, and causes Curse. Right Side.",
		"^777777The Tower: ^000000 Accidents. Loss of command. Failure. Sudden changes. Loss of judgment.",
		"-Deals DEF-ignoring 4444 damage. Right Side.",
		"^777777The Star: ^000000 Destruction of hope. Sad future. Chaos.",
		"-Causes Stun for 5 seconds. Opposite Side.",
		"^777777The Sun: ^000000 Destruction of the land. Dissatisfaction. Chaos.",
		"-Reduces ATK, MATK, HIT, Flee Rate, and DEF by 20% for 30 seconds. Opposite Side.",
	].join("\n");

	SkillDescription[SKID.CR_ACIDDEMONSTRATION] = [
		"Acid Demonstration",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 30 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^777777 1 Bottle Grenade, 1 Acid Bottle ^000000",
		"Effect:^777777 Causes explosion for up to 10 consecutive hits. Target's weapon and armor has a chance to be destroyed. Deals only 50% damage to other humans.",
		"Damage formula per hit is: (0.7 * Target's VIT * Creator's INT^2) / (Target's VIT + Creator's INT). ^000000",
		"[LV 1]^777777 1 Hit | 1% Chance to destroy weapon and armor ^000000",
		"[LV 2]^777777 2 Hits | 2% Chance to destroy weapon and armor ^000000",
		"[LV 3]^777777 3 Hits | 3% Chance to destroy weapon and armor ^000000",
		"[LV 4]^777777 4 Hits | 4% Chance to destroy weapon and armor ^000000",
		"[LV 5]^777777 5 Hits | 5% Chance to destroy weapon and armor ^000000",
		"[LV 6]^777777 6 Hits | 6% Chance to destroy weapon and armor ^000000",
		"[LV 7]^777777 7 Hits | 7% Chance to destroy weapon and armor ^000000",
		"[LV 8]^777777 8 Hits | 8% Chance to destroy weapon and armor ^000000",
		"[LV 9]^777777 9 Hits | 9% Chance to destroy weapon and armor ^000000",
		"[LV 10]^777777 10 Hits | 10% Chance to destroy weapon and armor ^000000",
	].join("\n");

	SkillDescription[SKID.CR_CULTIVATION] = [
		"Plant Cultivation",
		"Max Level:^777777 2 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Ground ^000000",
		"Range:^777777 Unknown ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Effect:^777777 Summon a mushroom or plant at random with a 50% success chance. Can not be used in WoE. ^000000",
		"[LV 1]^777777 Summon Black or Red Mushroom | Uses 1 Mushroom Spore ^000000",
		"[LV 2]^777777 Summon Yellow, Red, White, Green, Blue, or Shining Plant | Uses 1 Stem ^000000",
	].join("\n");

	SkillDescription[SKID.TK_MISSION] = [
		"TaeKwon Mission",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 4 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 You can use this skill only if you are a TaeKwon. You cannot use this skill once you switch to Soul Linker or Star Gladiator.",
		"When you use it, a name of a monster randomly choosed will be displayed and logged.",
		"Then, if you kill that same monster for 100 times (does not have to be in a row), you get 1 Point, and you will be assigned a new randomly selected monster.",
		"When you use this skill while your Target Percent is at 0% (no monster killed yet), you have a 1% chance to receive a new random target.",
		"When you have a certain number of points you become a TaeKwon Ranker (No effect if you are already a Star Gladiator or Soul Linker).",
		"As such, you can do infinite combos of all kicks - Whirlwind Kick, Axe Kick, Round Kick, Counter Kick - but you have to prepare the stance of at least 1 and spam when it triggers.",
		"Also you must make alternate kicks, if you do the same kick twice the spam ends. However, you cannot do Flying Side Kick as part of an infinite combo.",
		"Any LV 90+ TaeKwon Ranker players will have tripled Maximum HP and SP, and be able to use all of the TaeKwon skills. Check the TaeKwon Ranker Fame List by typing \"/taekwon\". ^000000",
	].join("\n");

	SkillDescription[SKID.SL_HIGH] = [
		"Rebirth Spirit",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 560 - 100*SkillLV ^000000",
		"Target:^777777 Player ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 0.5 sec ^000000",
		"Duration:^777777 100 + 50*SkillLV sec ^000000",
		"Effect:^777777 Soullinks to reborn first class characters UP TO BaseLV 69, if any of their stats is lower than (BaseLV of target-10), these stats will be increased up to the afore mentioned value, but the increase will not be greater than +50.",
		"Bonuses last for the skill's duration. ^000000",
	].join("\n");

	SkillDescription[SKID.KN_ONEHAND] = [
		"One-Hand Quicken",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 100 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 300 sec ^000000",
		"Effect:^777777 Decreases weapon swing delay with one-handed swords by 30%. Cancels the effect of any ASPD Potion when used, however you may use any such potion after casting.",
		"This skill only works with One-Hand Sword class weapons and the effect cancels when switching to any other type. ^000000",
	].join("\n");

	SkillDescription[SKID.AM_TWILIGHT1] = [
		"Twilight Alchemy I",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 200 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 3 sec (not reduced by DEX) ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Make 200 attempts to create a White Potion every 0.005 seconds. This skill has the same success rate as the Pharmacy skill. If there are not enough ingredients to create all 200 at once, the skill will fail.",
		"Check the ^0000ffPotion Creation Guide^777777 for the necessary ingredients. ^000000",
	].join("\n");

	SkillDescription[SKID.AM_TWILIGHT2] = [
		"Twilight Alchemy II",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 200 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 3 sec (not reduced by DEX) ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Make 200 attempts to create a Condensed White Potion every 0.005 seconds. This skill has the same success rate as the Pharmacy skill. If there are not enough ingredients to create all 200 at once, the skill will fail.",
		"Check the ^0000ffCondensed Potion Creation Guide^777777 for the necessary ingredients. ^000000",
		"Note: ^777777You need a Soul Linker and Super novice on your party to this skill to work. ^000000",
	].join("\n");

	SkillDescription[SKID.AM_TWILIGHT3] = [
		"Twilight Alchemy III",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 200 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 3 sec (not reduced by DEX) ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Creates 100 Alcohol, 50 Acid Bottle and 50 Bottle Grenade. Each cast requires 50 Fabric, 50 Empty Bottle and enough materials to craft the produced items. If there are not enough ingredients to create them all at once, the skill will fail.",
		"Check the ^0000ffAlcohol Creation Guide^777777, ^0000ffAcid Bottle Creation Guide^777777 and ^0000ffBottle Grenade Creation Guide^777777 for the necessary ingredients. ^000000",
		"Note: ^777777You need a Taekwon Boy on your party to this skill to work. ^000000",
	].join("\n");

	SkillDescription[SKID.HT_POWER] = [
		"Beast Strafing",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 Unknown (like DS?) ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Unknown (bow range?) ^000000",
		"Cast Time:^777777 Unknown (like DS?) ^000000",
		"Cool Down:^777777 Unknown (like DS?) ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 If the target is a Beast-type and you used Double Strafing, you can use this skill to do extra Double Strafing on the target.",
		"Only usable right after using Double Strafing, and its power is heavily affected by STR. ^000000",
	].join("\n");

	SkillDescription[SKID.GS_GLITTERING] = [
		"Flip the Coin",
		"Madness Canceller (L4), Adjustment (L4), Increasing Accuracy (L2). ^000000",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 2 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^777777 1 Zeny ^000000",
		"Effect:^777777 Flip a coin, if it's the top, a Coin will appear floating next to you; if it's bottom, you lose 1 Coin. You can collect up to 10 Coins. Higher skill levels increase the chance to get top, but the more you have, the more difficult to get a new one.",
		"Each Coin gives +3 DMG, that never misses, in each normal attack. Each Coin also provide more damage to skills in a yet unknown ammount. Coins are lost on relog or death.. ^000000",
	].join("\n");

	SkillDescription[SKID.GS_FLING] = [
		"Fling",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Weapon Range ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 30 seconds of Def reduction to the affected enemy ^000000",
		"Catalyst:^777777 Up to 5 Coins, at least 1 ^000000",
		"Effect:^777777 You must have a Revolver or Rifle equipped.",
		"Uses up to 5 Coins to attack an enemy and reduce his/her defense by -3 DEF per used Coin (but it doesn't stack). It also deals a fixed JobLV damage to the enemy.",
		"You can not select how many Coins are used, all coins you have are taken, up to a maximum of 5. If you have none the skill fails. ^000000",
	].join("\n");

	SkillDescription[SKID.GS_TRIPLEACTION] = [
		"Triple Action",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 20 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Weapon Range ^000000",
		"Cast Time:^777777 Unknown sec ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^777777 1 Coin ^000000",
		"Effect:^777777 Use a Coin and deal three hits. ^000000",
	].join("\n");

	SkillDescription[SKID.GS_BULLSEYE] = [
		"Bull's Eye",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 30 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Weapon Range ^000000",
		"Cast Time:^777777 Unknown sec ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^777777 1 Coin ^000000",
		"Effect:^777777 An outstanding shot. Causes 500% ATK damage and has a 0.1% chance to put the target in a coma state. Ignores weapon cards and only follow the bullets element. Works only against DemiHuman and Brute type monsters (probably including players) and not against Boss monsters. ^000000",
	].join("\n");

	SkillDescription[SKID.GS_MADNESSCANCEL] = [
		"Madness Canceller",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 30 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Unknown sec ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 15 sec ^000000",
		"Catalyst:^777777 4 Coins ^000000",
		"Effect:^777777 Increase your ATK by 100 and ASPD by 20%. You are unable to move while this effect lasts, and it can not be used together with Adjustment. ^000000",
	].join("\n");

	SkillDescription[SKID.GS_ADJUSTMENT] = [
		"Adjustment",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 15 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Unknown sec ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 Unknown sec ^000000",
		"Catalyst:^777777 2 Coins ^000000",
		"Effect:^777777 Flee Rate +30 and all ranged Physical attacks do -20% damage, but your HIT is -30. Can not be used together with Madness Canceller. ^000000",
	].join("\n");

	SkillDescription[SKID.GS_INCREASING] = [
		"Increasing Accuracy",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 30 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 60 sec ^000000",
		"Catalyst:^777777 4 Coins ^000000",
		"Effect:^777777 HIT +20, DEX +4, AGI +4 for the skill's duration ^000000",
	].join("\n");

	SkillDescription[SKID.GS_MAGICALBULLET] = [
		"Magical Bullet",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 7 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Weapon Range ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^777777 1 Coin ^000000",
		"Effect:^777777 Fire a magic bullet, thus not using ammo. The bullet's damage is calculated by DEX ATK + INT MATK, and its element is Ghost. ^000000",
	].join("\n");

	SkillDescription[SKID.GS_CRACKER] = [
		"Cracker",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Weapon Range ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 1 sec ^000000",
		"Catalyst:^777777 1 Coin ^000000",
		"Effect:^777777 You must have a Revolver or Rifle equipped.",
		"Use 1 bullet and make a quick attack on the enemy, attempting to stun him/her. Stun chance increases the closer the enemy is to you. Makes NO damage, and the monster will not attack back if is not aggressive. ^000000",
	].join("\n");

	SkillDescription[SKID.GS_SINGLEACTION] = [
		"Single Action",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Target:^777777 Self ^000000",
		"Effect:^777777 Increase your HIT by +2*SkillLV and your ASPD by +(SkillLV/2)%. ^000000",
		"[LV 1]^777777 HIT +2, ASPD +1% ^000000",
		"[LV 2]^777777 HIT +4, ASPD +1% ^000000",
		"[LV 3]^777777 HIT +6, ASPD +2% ^000000",
		"[LV 4]^777777 HIT +8, ASPD +2% ^000000",
		"[LV 5]^777777 HIT +10, ASPD +3% ^000000",
		"[LV 6]^777777 HIT +12, ASPD +3% ^000000",
		"[LV 7]^777777 HIT +14, ASPD +4% ^000000",
		"[LV 8]^777777 HIT +16, ASPD +4% ^000000",
		"[LV 9]^777777 HIT +18, ASPD +5% ^000000",
		"[LV 10]^777777 HIT +20, ASPD +5% ^000000",
	].join("\n");

	SkillDescription[SKID.GS_SNAKEEYE] = [
		"Snake's Eye",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Target:^777777 Self ^000000",
		"Effect:^777777 Increase your range and HIT with guns by +SkillLV. Affects Rapid Shower, Tracking, Piercing Shot, Full Buster, Spread Attack and Ground Drift skill ranges. ^000000",
		"[LV 1]^777777 HIT +1, Range +1 ^000000",
		"[LV 2]^777777 HIT +2, Range +2 ^000000",
		"[LV 3]^777777 HIT +3, Range +3 ^000000",
		"[LV 4]^777777 HIT +4, Range +4 ^000000",
		"[LV 5]^777777 HIT +5, Range +5 ^000000",
		"[LV 6]^777777 HIT +6, Range +6 ^000000",
		"[LV 7]^777777 HIT +7, Range +7 ^000000",
		"[LV 8]^777777 HIT +8, Range +8 ^000000",
		"[LV 9]^777777 HIT +9, Range +9 ^000000",
		"[LV 10]^777777 HIT +10, Range +10 ^000000",
	].join("\n");

	SkillDescription[SKID.GS_CHAINACTION] = [
		"Chain Action",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Target:^777777 Self ^000000",
		"Effect:^777777 When using Revolvers there is a chance to shoot twice. The higher the SkillLV, the higher the chance of a Doubleshot happening (may follow Thief's Double Attack success probability progression). ^000000",
	].join("\n");

	SkillDescription[SKID.GS_TRACKING] = [
		"Tracking",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Active / Ranged Single Target Physical Attack ^000000",
		"SP Cost:^777777 10 + 5*SkillLV ^000000",
		"Target:^777777 One Enemy ^000000",
		"Range:^777777 10 cells ^000000",
		"Cast Time:^777777 1 + 0.2*SkillLV sec (not reduced by DEX) ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 You must have a Handgun or Rifle equipped.",
		"By taking a little extra time to track the target, you can guarantee a very powerful single shot. Tracking has a fixed cast time which is not affected by DEX, skills or effects and is interruptible. There is no aftercast delay. The range of Tracking is fixed at 10 cells, and is not increased by Snake's Eye. Damage is (200+100*SkillLV)%. ^000000",
		"[LV 1]^777777 300% ATK, Aim Time 1.2 sec ^000000",
		"[LV 2]^777777 400% ATK, Aim Time 1.4 sec ^000000",
		"[LV 3]^777777 500% ATK, Aim Time 1.6 sec ^000000",
		"[LV 4]^777777 600% ATK, Aim Time 1.8 sec ^000000",
		"[LV 5]^777777 700% ATK, Aim Time 2 sec ^000000",
		"[LV 6]^777777 800% ATK, Aim Time 2.2 sec ^000000",
		"[LV 7]^777777 900% ATK, Aim Time 2.4 sec ^000000",
		"[LV 8]^777777 1000% ATK, Aim Time 2.6 sec ^000000",
		"[LV 9]^777777 1100% ATK, Aim Time 2.8 sec ^000000",
		"[LV 10]^777777 1200% ATK, Aim Time 3 sec ^000000",
	].join("\n");

	SkillDescription[SKID.GS_DISARM] = [
		"Disarm",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 10 + 5*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Weapon Range ^000000",
		"Cast Time:^777777 Unknown sec ^000000",
		"Cool Down:^777777 Unknown sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 You must have a Revolver or Rifle equipped.",
		"Aim at the targets hand and make him/her drop the weapon. If used on players it will strip their weapon, if used on monsters it will decrease their ATK by -25%.",
		"The higher the SkillLV, the higher the success chance. Does not work against Boss monsters. ^000000",
	].join("\n");

	SkillDescription[SKID.GS_PIERCINGSHOT] = [
		"Piercing Shot",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 10 + SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Weapon Range + Snake's Eye SkillLV cells ^000000",
		"Cast Time:^777777 1.5 sec ^000000",
		"Cool Down:^777777 Instant ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 You must have a Revolver or Rifle equipped.",
		"Aim for a weakly armored spot and cause (100+20*SkillLV)% ATK damage and, by chance, bleeding. ^000000",
		"[LV 1]^777777 120% ATK, Bleeding Chance 3% ^000000",
		"[LV 2]^777777 140% ATK, Bleeding Chance 6% ^000000",
		"[LV 3]^777777 160% ATK, Bleeding Chance 9% ^000000",
		"[LV 4]^777777 180% ATK, Bleeding Chance 12% ^000000",
		"[LV 5]^777777 200% ATK, Bleeding Chance 15% ^000000",
	].join("\n");

	SkillDescription[SKID.GS_RAPIDSHOWER] = [
		"Rapid Shower",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 20 + 2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Weapon Range + Snake's Eye SkillLV cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 You must have a Revolver equipped.",
		"Uses 5 bullets and attack a single target with a 5 hit burst causing (500+50*SkillLV)% ATK damage. ^000000",
		"[LV 1]^777777 550% ATK ^000000",
		"[LV 2]^777777 600% ATK ^000000",
		"[LV 3]^777777 650% ATK ^000000",
		"[LV 4]^777777 700% ATK ^000000",
		"[LV 5]^777777 750% ATK ^000000",
		"[LV 6]^777777 800% ATK ^000000",
		"[LV 7]^777777 850% ATK ^000000",
		"[LV 8]^777777 900% ATK ^000000",
		"[LV 9]^777777 950% ATK ^000000",
		"[LV 10]^777777 1000% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.GS_DESPERADO] = [
		"Desperado",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 30 + 2*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 7x7 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 You must have a Revolver equipped.",
		"Uses 10 bullets and attack all enemies in a 7x7 area around you with (50+50*SkillLV)% ATK per hit. This is a close-range attack, so it ignores Pneuma. It deals a random number of hits (up to a maximum of 10) to each target. ^000000",
		"[LV 1]^777777 100% ATK per hit ^000000",
		"[LV 2]^777777 150% ATK per hit ^000000",
		"[LV 3]^777777 200% ATK per hit ^000000",
		"[LV 4]^777777 250% ATK per hit ^000000",
		"[LV 5]^777777 300% ATK per hit ^000000",
		"[LV 6]^777777 350% ATK per hit ^000000",
		"[LV 7]^777777 400% ATK per hit ^000000",
		"[LV 8]^777777 450% ATK per hit ^000000",
		"[LV 9]^777777 500% ATK per hit ^000000",
		"[LV 10]^777777 550% ATK per hit ^000000",
	].join("\n");

	SkillDescription[SKID.GS_GATLINGFEVER] = [
		"Gatling Fever",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 28 + 2*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Unknown sec ^000000",
		"Cool Down:^777777 Unknown sec ^000000",
		"Duration:^777777 15 + 15*SkillLV sec ^000000",
		"Effect:^777777 You must have a Gatling equipped.",
		"Masterful handling of your Gatling. You get +(20+10*SkillLV) bonus to damage and +(2*SkillLV)% to ASPD, but -5*SkillLV to Flee Rate and reduced walking speed during the skill effect. ^000000",
		"[LV 1]^777777 Damage +30, ASPD +2%, Flee Rate -5 ^000000",
		"[LV 2]^777777 Damage +40, ASPD +4%, Flee Rate -10 ^000000",
		"[LV 3]^777777 Damage +50, ASPD +6%, Flee Rate -15 ^000000",
		"[LV 4]^777777 Damage +60, ASPD +8%, Flee Rate -20 ^000000",
		"[LV 5]^777777 Damage +70, ASPD +10%, Flee Rate -25 ^000000",
		"[LV 6]^777777 Damage +80, ASPD +12%, Flee Rate -30 ^000000",
		"[LV 7]^777777 Damage +90, ASPD +14%, Flee Rate -35 ^000000",
		"[LV 8]^777777 Damage +100, ASPD +16%, Flee Rate -40 ^000000",
		"[LV 9]^777777 Damage +110, ASPD +18%, Flee Rate -45 ^000000",
		"[LV 10]^777777 Damage +120, ASPD +20%, Flee Rate -50 ^000000",
	].join("\n");

	SkillDescription[SKID.GS_DUST] = [
		"Dust",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 3*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 3 cells ^000000",
		"Cast Time:^777777 1 sec (not reduced by DEX) ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 You must have a Shotgun equipped.",
		"Attack a single enemy and cause (50+50*SkillLV)% ATK damage, causing a knockback of 5 cells. ^000000",
		"[LV 1]^777777 150% ATK ^000000",
		"[LV 2]^777777 200% ATK ^000000",
		"[LV 3]^777777 250% ATK ^000000",
		"[LV 4]^777777 300% ATK ^000000",
		"[LV 5]^777777 350% ATK ^000000",
		"[LV 6]^777777 400% ATK ^000000",
		"[LV 7]^777777 450% ATK ^000000",
		"[LV 8]^777777 500% ATK ^000000",
		"[LV 9]^777777 550% ATK ^000000",
		"[LV 10]^777777 600% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.GS_FULLBUSTER] = [
		"Full Buster",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 15 + 5*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Weapon Range + Snake's Eye SkillLV cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 1 + 0.2*SkillLV sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 You must have a Shotgun equipped.",
		"Fire a burst causing (300+100*SkillLV)% ATK damage. Unfortunately this overheats too much the weapon, and you must spend 1+0.2*SkillLV sec to cool it down.",
		"Uses up 2*(SkillLV/2 rounded up) Rounds. There is a chance of causing a Blind effect on you (without HIT/Flee reductions). ^000000",
		"[LV 1]^777777 400% ATK, Blind Chance 2% ^000000",
		"[LV 2]^777777 500% ATK, Blind Chance 2% ^000000",
		"[LV 3]^777777 600% ATK, Blind Chance 4% ^000000",
		"[LV 4]^777777 700% ATK, Blind Chance 4% ^000000",
		"[LV 5]^777777 800% ATK, Blind Chance 6% ^000000",
		"[LV 6]^777777 900% ATK, Blind Chance 6% ^000000",
		"[LV 7]^777777 1000% ATK, Blind Chance 8% ^000000",
		"[LV 8]^777777 1100% ATK, Blind Chance 8% ^000000",
		"[LV 9]^777777 1200% ATK, Blind Chance 10% ^000000",
		"[LV 10]^777777 1300% ATK, Blind Chance 10% ^000000",
	].join("\n");

	SkillDescription[SKID.GS_SPREADATTACK] = [
		"Spread Attack",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 10 + 5*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Weapon Range + Snake's Eye SkillLV cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 You must have a Shotgun equipped.",
		"Attack an area with 1 cell radius every 3 levels around the targeted enemy, causing (80+20*SkillLV)% ATK damage. Use 5 rounds at level 1. ^000000",
		"[LV 1]^777777 100% ATK, Area 3x3 cells ^000000",
		"[LV 2]^777777 120% ATK, Area 3x3 cells ^000000",
		"[LV 3]^777777 140% ATK, Area 3x3 cells ^000000",
		"[LV 4]^777777 160% ATK, Area 5x5 cells ^000000",
		"[LV 5]^777777 180% ATK, Area 5x5 cells ^000000",
		"[LV 6]^777777 200% ATK, Area 5x5 cells ^000000",
		"[LV 7]^777777 220% ATK, Area 7x7 cells ^000000",
		"[LV 8]^777777 240% ATK, Area 7x7 cells ^000000",
		"[LV 9]^777777 260% ATK, Area 7x7 cells ^000000",
		"[LV 10]^777777 280% ATK, Area 9x9 cells ^000000",
	].join("\n");

	SkillDescription[SKID.GS_GROUNDDRIFT] = [
		"Ground Drift",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 4*SkillLV ^000000",
		"Target:^777777 Ground ^000000",
		"Range:^777777 Weapon Range + Snake's Eye SkillLV cells ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 3*SkillLV sec or until triggered ^000000",
		"Effect:^777777 You must have a Grenade Launcher equipped.",
		"Scatter multiple grenades on the ground. A grenade detonate if an enemy steps on it or until a certain time has passed.",
		"The attacks element depends on the used grenade and gets a +50*SkillLV bonus to damage. ^000000",
		"[LV 1]^777777 Damage +50, lasts 3 sec ^000000",
		"[LV 2]^777777 Damage +100, lasts 6 sec ^000000",
		"[LV 3]^777777 Damage +150, lasts 9 sec ^000000",
		"[LV 4]^777777 Damage +200, lasts 12 sec ^000000",
		"[LV 5]^777777 Damage +250, lasts 15 sec ^000000",
		"[LV 6]^777777 Damage +300, lasts 18 sec ^000000",
		"[LV 7]^777777 Damage +350, lasts 21 sec ^000000",
		"[LV 8]^777777 Damage +400, lasts 24 sec ^000000",
		"[LV 9]^777777 Damage +450, lasts 27 sec ^000000",
		"[LV 10]^777777 Damage +500, lasts 30 sec ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_TOBIDOUGU] = [
		"Throwing Mastery",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increase Throw Shuriken skill damage by +3*SkillLV.",
		"This bonus damage completely bypasses all defense and hits the target even in cases where you normally would miss. ^000000",
		"[LV 1]^777777 ATK +3 ^000000",
		"[LV 2]^777777 ATK +6 ^000000",
		"[LV 3]^777777 ATK +9 ^000000",
		"[LV 4]^777777 ATK +12 ^000000",
		"[LV 5]^777777 ATK +15 ^000000",
		"[LV 6]^777777 ATK +18 ^000000",
		"[LV 7]^777777 ATK +21 ^000000",
		"[LV 8]^777777 ATK +24 ^000000",
		"[LV 9]^777777 ATK +27 ^000000",
		"[LV 10]^777777 ATK +30 ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_SYURIKEN] = [
		"Throw Shuriken",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 2 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^777777 1 Shuriken ^000000",
		"Effect:^777777 Throw a Shuriken at a target. Damage is ATK + 4*SkillLV.",
		"This bonus damage completely bypasses all defense and hits the target even in cases where you normally would miss. ^000000",
		"[LV 1]^777777 Damage +4 ^000000",
		"[LV 2]^777777 Damage +8 ^000000",
		"[LV 3]^777777 Damage +12 ^000000",
		"[LV 4]^777777 Damage +16 ^000000",
		"[LV 5]^777777 Damage +20 ^000000",
		"[LV 6]^777777 Damage +24 ^000000",
		"[LV 7]^777777 Damage +28 ^000000",
		"[LV 8]^777777 Damage +32 ^000000",
		"[LV 9]^777777 Damage +36 ^000000",
		"[LV 10]^777777 Damage +40 ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_KUNAI] = [
		"Throw Kunai",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 35 - 5*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 Sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^777777 1 Kunai ^000000",
		"Effect:^777777 Throw a Kunai that will hit three times for a total of 300% attack.",
		"Kunai's deal a base damage of about 60 per hit which acts as a mastery bonus and bypasses defence, and strikes the target even if you would normally miss.",
		"The attack's property is affected by the type of Kunai thrown. ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_HUUMA] = [
		"Throw Huuma Shuriken",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 15 + 5*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^777777 1 Huuma Shuriken ^000000",
		"Effect:^777777 Throw a Huuma Shuriken that will deals splash damage in a 3x3 area. The total amount of damage is divided among the enemies damaged by this skill. Damage is 150+150*SkillLV. ^000000",
		"[LV 1]^777777 300% Damage ^000000",
		"[LV 2]^777777 450% Damage ^000000",
		"[LV 3]^777777 600% Damage ^000000",
		"[LV 4]^777777 750% Damage ^000000",
		"[LV 5]^777777 900% Damage ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_ZENYNAGE] = [
		"Throw Zeny",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 50 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 5 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^777777 Zeny (see below) ^000000",
		"Effect:^777777 Throw money at a target to inflict an amount of Defense piercing damage equal to the amount of zeny spent in the attack. Cost varies between 500*SkillLV and 1000*SkillLV Zeny.",
		"Damage is reduced to half against Boss monsters and in PvP. ^000000",
		"[LV 1]^777777 500~1000 Zeny ^000000",
		"[LV 2]^777777 1000~2000 Zeny ^000000",
		"[LV 3]^777777 1500~3000 Zeny ^000000",
		"[LV 4]^777777 2000~4000 Zeny ^000000",
		"[LV 5]^777777 2500~5000 Zeny ^000000",
		"[LV 6]^777777 3000~6000 Zeny ^000000",
		"[LV 7]^777777 3500~7000 Zeny ^000000",
		"[LV 8]^777777 4000~8000 Zeny ^000000",
		"[LV 9]^777777 4500~9000 Zeny ^000000",
		"[LV 10]^777777 5000~10000 Zeny ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_TATAMIGAESHI] = [
		"Reverse Tatami",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 15 ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 See below ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 3 sec ^000000",
		"Duration:^777777 3 sec ^000000",
		"Effect:^777777 Flip tatami in 4 directions, kocking nearby enemies back and blocking ranged attacks for 3 seconds. When hit by the skill, the enemies are knocked back 5 cells and takes damage of (100+10*SkillLV)% ATK.",
		"The area affected increased with higher levels of the skill, and only a person in line with these take damage.",
		"The ranged attack blocking is like pneuma (only 1 tile though), centered on the caster. If the caster moves, this effect disappears. ^000000",
		"[LV 1]^777777 1 cell range, 110% ATK ^000000",
		"[LV 2]^777777 1 cell range, 120% ATK ^000000",
		"[LV 3]^777777 2 cells range, 130% ATK ^000000",
		"[LV 4]^777777 2 cells range, 140% ATK ^000000",
		"[LV 5]^777777 3 cells range, 150% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_KASUMIKIRI] = [
		"Mist Slash",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 8 + 2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1.5 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Attack an enemy with (100+10*SkillLV)% ATK and hide you afterwards.",
		"This hiding is the same as the Thief skill Hiding, consuming the same SP and has the same durration.",
		"If you miss the target, you will not be put into hiding. ^000000",
		"[LV 1]^777777 110% ATK / 30 sec Hide Durration ^000000",
		"[LV 2]^777777 120% ATK / 60 sec Hide Durration ^000000",
		"[LV 3]^777777 130% ATK / 90 sec Hide Durration ^000000",
		"[LV 4]^777777 140% ATK / 120 sec Hide Durration ^000000",
		"[LV 5]^777777 150% ATK / 150 sec Hide Durration ^000000",
		"[LV 6]^777777 160% ATK / 180 sec Hide Durration ^000000",
		"[LV 7]^777777 170% ATK / 210 sec Hide Durration ^000000",
		"[LV 8]^777777 180% ATK / 240 sec Hide Durration ^000000",
		"[LV 9]^777777 190% ATK / 270 sec Hide Durration ^000000",
		"[LV 10]^777777 200% ATK / 300 sec Hide Durration ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_SHADOWJUMP] = [
		"Shadow Jump",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 5 + 2*SkillLV cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Instantly moves the caster to a targeted cell, ignoring obstacles in the caster's way.",
		"Shadow Leap can only be performed when the caster is in Hiding status (attainable through the Mist Slash skill).",
		"You cannot jump to cells where you could't stand normally.",
		"When used in WoE Shadow Jump will simply cause you to leave hiding. ^000000",
		"[LV 1]^777777 7 cells range ^000000",
		"[LV 2]^777777 9 cells range ^000000",
		"[LV 3]^777777 11 cells range ^000000",
		"[LV 4]^777777 13 cells range ^000000",
		"[LV 5]^777777 15 cells range ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_KIRIKAGE] = [
		"Shadow Slash",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 12 + 2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Shadow Jump SkillLV cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 A combination of Shadow Jump and Mist Slash, this skill leaps from the shadows to deal massive damage. The skill has +(25+5*SkillLV)% Critical Rate, though when you strike the opponent you will not see the crit box but it will still bypass defence of the target (like focused arrow strike). This critical chance is increased by your base crit rate. Hits for (100*SkillLV)% ATK.",
		"Like Shadow Jump, Shadow Slash is restricted in WoE, and can only be cast on targets next to you. ^000000",
		"[LV 1]^777777 100% ATK / +30% Critical Rate ^000000",
		"[LV 2]^777777 200% ATK / +35% Critical Rate ^000000",
		"[LV 3]^777777 300% ATK / +40% Critical Rate ^000000",
		"[LV 4]^777777 400% ATK / +45% Critical Rate ^000000",
		"[LV 5]^777777 500% ATK / +50% Critical Rate ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_UTSUSEMI] = [
		"Cast-off Ciceda Shell",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 9 + 3*SkillLv ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1.5 sec ^000000",
		"Duration:^777777 10 + 10*SkillLV ^000000",
		"Effect:^777777 An advanced Ninja technique that allows one to dissapear instantly from thier location to avoid damage, however if you are struck you will jump back 7 cells in the direction you were hit (you are not pushed back in WoE). It blocks 1 + SkillLV/2 attacks. Not all skills can be blocked including Magic attacks. If you are in mid cast, this jump will not actually interupt your casting. ^000000",
		"[LV 1]^777777 10 sec, 1 Attack ^000000",
		"[LV 2]^777777 20 sec, 1 Attack ^000000",
		"[LV 3]^777777 30 sec, 2 Attacks ^000000",
		"[LV 4]^777777 40 sec, 2 Attacks ^000000",
		"[LV 5]^777777 50 sec, 3 Attacks ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_BUNSINJYUTSU] = [
		"Illusionary Shadow",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 28 + 2*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 4.5 sec - SkillLv*0.5, doesn't goes under 1 ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 40 + 20*SkillLV sec ^000000",
		"Catalyst:^0000ff 1 Shadow Orb ^000000",
		"Effect:^777777 When cast, the player will turn bluish color and Ninja SOul will be released. Create a mirror image that will enable the caster to dodge 0.5 + SkillLV/2 number of Melee and Ranged Physical attacks. This does not protect from Magic attacks. ^000000",
		"[LV 1]^777777 1 Attack, 60 sec ^000000",
		"[LV 2]^777777 1 Attack, 80 sec ^000000",
		"[LV 3]^777777 2 Attacks, 100 sec ^000000",
		"[LV 4]^777777 2 Attacks, 120 sec ^000000",
		"[LV 5]^777777 3 Attacks, 140 sec ^000000",
		"[LV 6]^777777 3 Attacks, 160 sec ^000000",
		"[LV 7]^777777 4 Attacks, 180 sec ^000000",
		"[LV 8]^777777 4 Attacks, 200 sec ^000000",
		"[LV 9]^777777 5 Attacks, 220 sec ^000000",
		"[LV 10]^777777 5 Attacks, 240 sec ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_NINPOU] = [
		"Ninpou Training",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Recovers (Maximum SP/500 + 3)*SkillLV SP per 10 full seconds when standing still and increases the efficiency of SP recovering items by +2% per SkillLV. ^000000",
		"[LV 1]^777777 +3SP/10sec,items +2% ^000000",
		"[LV 2]^777777 +6SP/10sec,items +4% ^000000",
		"[LV 3]^777777 +9SP/10sec,items +6% ^000000",
		"[LV 4]^777777 +12SP/10sec,items +8% ^000000",
		"[LV 5]^777777 +15SP/10sec,items +10% ^000000",
		"[LV 6]^777777 +18SP/10sec,items +12% ^000000",
		"[LV 7]^777777 +21SP/10sec,items +14% ^000000",
		"[LV 8]^777777 +24SP/10sec,items +16% ^000000",
		"[LV 9]^777777 +27SP/10sec,items +18% ^000000",
		"[LV 10]^777777 +30SP/10sec,items +20% ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_KOUENKA] = [
		"Crimson Fire Blossom",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 16 + 2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 0.7*SkillLV sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Throw a burning petal at a single target, causing SkillLV number of hits with 90% MATK damage each. ^000000",
		"[LV 1]^777777 1 Hit, 90% MATK total ^000000",
		"[LV 2]^777777 2 Hits, 180% MATK total ^000000",
		"[LV 3]^777777 3 Hits, 270% MATK total ^000000",
		"[LV 4]^777777 4 Hits, 360% MATK total ^000000",
		"[LV 5]^777777 5 Hits, 450% MATK total ^000000",
		"[LV 6]^777777 6 Hits, 540% MATK total ^000000",
		"[LV 7]^777777 7 Hits, 630% MATK total ^000000",
		"[LV 8]^777777 8 Hits, 720% MATK total ^000000",
		"[LV 9]^777777 9 Hits, 810% MATK total ^000000",
		"[LV 10]^777777 10 Hits, 900% MATK total ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_KAENSIN] = [
		"Crimson Fire Formation",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 25 ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 5x5 cells ^000000",
		"Cast Time:^777777 (6.5 - 0.5*SkillLV) sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Catalyst:^ee0000 1 Burning Stone ^000000",
		"Duration:^777777 20 sec OR 4 + SkillLV/2 hits, whichever comes first ^000000",
		"Effect:^777777 Summon a firestorm in 5x5 cells around you, it deals damage until 4+SkillLV/2 (round up) hits have been dealt or it expires. ^000000",
		"[LV 1]^777777 5 Hits ^000000",
		"[LV 2]^777777 5 Hits ^000000",
		"[LV 3]^777777 6 Hits ^000000",
		"[LV 4]^777777 6 Hits ^000000",
		"[LV 5]^777777 7 Hits ^000000",
		"[LV 6]^777777 7 Hits ^000000",
		"[LV 7]^777777 8 Hits ^000000",
		"[LV 8]^777777 8 Hits ^000000",
		"[LV 9]^777777 9 Hits ^000000",
		"[LV 10]^777777 9 Hits ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_BAKUENRYU] = [
		"Dragon Fire Formation",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 15 + 5*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 3 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^ee0000 1 Burning Stone ^000000",
		"Effect:^777777 Summon a fire dragon that attacks the enemy three times and causes MATK +(150+150*SkillLV)% splash damage in the 5x5 cells around the target. ^000000",
		"[LV 1]^777777 MATK +300% ^000000",
		"[LV 2]^777777 MATK +450% ^000000",
		"[LV 3]^777777 MATK +600% ^000000",
		"[LV 4]^777777 MATK +750% ^000000",
		"[LV 5]^777777 MATK +900% ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_HYOUSENSOU] = [
		"Lightning Spear of Ice",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 12 + 3*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 0.7*SkillLV sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Summon 2+SkillLV ice spears to damage the enemy. Each ice spear does 70% MATK damage. ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_SUITON] = [
		"Water Escape Technique",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 12 + 3*SkillLV ^000000",
		"Target:^777777 Ground ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 3 sec ^000000",
		"Duration:^777777 10 + 5*SkillLV sec ^000000",
		"Catalyst:^0000ff 1 Freezing Stone ^000000",
		"Effect:^777777 Creates a puddle of water on the ground that reduce the movement speed of all enemies and decrease their AGI, except Ninjas.",
		"Aqua Benedicta and Water Ball may be used on this puddle, also Lightning Spear of Ice will do additional damage if casted on the puddle. ^000000",
		"[LV 1]^777777 Area 3x3, 15 sec, AGI -0 ^000000",
		"[LV 2]^777777 Area 3x3, 20 sec, AGI -3 ^000000",
		"[LV 3]^777777 Area 3x3, 25 sec, AGI -3 ^000000",
		"[LV 4]^777777 Area 5x5, 30 sec, AGI -3 ^000000",
		"[LV 5]^777777 Area 5x5, 35 sec, AGI -5 ^000000",
		"[LV 6]^777777 Area 5x5, 40 sec, AGI -5 ^000000",
		"[LV 7]^777777 Area 7x7, 45 sec, AGI -5 ^000000",
		"[LV 8]^777777 Area 7x7, 50 sec, AGI -8 ^000000",
		"[LV 9]^777777 Area 7x7, 55 sec, AGI -8 ^000000",
		"[LV 10]^777777 Area 9x9, 60 sec, AGI -8 ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_HYOUSYOURAKU] = [
		"Falling Ice Pillar",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 35 + 5*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 7x7 cells ^000000",
		"Cast Time:^777777 1.5 + SkillLv*0.5 sec ^000000",
		"Cool Down:^777777 0.8 + 0.2*SkillLV sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^0000ff 1 Freezing Stone ^000000",
		"Effect:^777777 Summons a large ice meteor that causes damage to all enemies within 7x7 cells of the caster, with a chance to freeze them. Damage is based on MATK. ^000000",
		"[LV 1]^777777 +150% MATK, Freeze Chance 20% ^000000",
		"[LV 2]^777777 +200% MATK, Freeze Chance 30% ^000000",
		"[LV 3]^777777 +250% MATK, Freeze Chance 40% ^000000",
		"[LV 4]^777777 +300% MATK, Freeze Chance 50% ^000000",
		"[LV 5]^777777 +350% MATK, Freeze Chance 60% ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_HUUJIN] = [
		"Wind Blade",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 10 + 2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 (0.7*SkillLV) sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Throw the blades of wind and deal wind elemental damage. ^000000",
		"[LV 1]^777777 1 Hit ^000000",
		"[LV 2]^777777 2 Hits ^000000",
		"[LV 3]^777777 2 Hits ^000000",
		"[LV 4]^777777 3 Hits ^000000",
		"[LV 5]^777777 3 Hits ^000000",
		"[LV 6]^777777 4 Hits ^000000",
		"[LV 7]^777777 4 Hits ^000000",
		"[LV 8]^777777 5 Hits ^000000",
		"[LV 9]^777777 5 Hits ^000000",
		"[LV 10]^777777 6 Hits ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_RAIGEKISAI] = [
		"Lightning Crash",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 12 + 4*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 See below ^000000",
		"Cast Time:^777777 4 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^ffff00 1 Windchime Stone ^000000",
		"Effect:^777777 Summon lightning to strike enemies around you. Damage is based on MATK and wind element. ^000000",
		"[LV 1]^777777 +200% MATK, 5x5 cells ^000000",
		"[LV 2]^777777 +240% MATK, 5x5 cells ^000000",
		"[LV 3]^777777 +280% MATK, 7x7 cells ^000000",
		"[LV 4]^777777 +320% MATK, 7x7 cells ^000000",
		"[LV 5]^777777 +360% MATK, 9x9 cells ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_KAMAITACHI] = [
		"North Wind",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 20 + 4*SkillLV cells ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 4 + SkillLV cells ^000000",
		"Cast Time:^777777 4 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Catalyst:^ffff00 1 Windchime Stone ^000000",
		"Effect:^777777 Summons the wrath of the wind to destroy everything on a line with a length of 4+SkillLV cells and a width of 5 cells from you into the direction of the targetted mob. Deals +(100+100*SkillLV)% MATK based wind element damage. ^000000",
		"[LV 1]^777777 +200% MATK, Damage Range 5 cells ^000000",
		"[LV 2]^777777 +300% MATK, Damage Range 6 cells ^000000",
		"[LV 3]^777777 +400% MATK, Damage Range 7 cells ^000000",
		"[LV 4]^777777 +500% MATK, Damage Range 8 cells ^000000",
		"[LV 5]^777777 +600% MATK, Damage Range 9 cells ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_NEN] = [
		"Soul",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 + 10*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 6 - 1*SkillLV sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 15 + 15*SkillLV ^000000",
		"Effect:^777777 Gather your inner spirit and prepare Illusionary Shadow or Final Strike. Increases INT and STR by SkillLV. Consumes 80 HP at level 5. ^000000",
		"[LV 1]^777777 STR/INT +1, 30 sec ^000000",
		"[LV 2]^777777 STR/INT +2, 45 sec ^000000",
		"[LV 3]^777777 STR/INT +3, 60 sec ^000000",
		"[LV 4]^777777 STR/INT +4, 75 sec ^000000",
		"[LV 5]^777777 STR/INT +5, 90 sec ^000000",
	].join("\n");

	SkillDescription[SKID.NJ_ISSEN] = [
		"Final Strike",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 50 + 5*SkillLV ^000000",
		"HP Cost:^777777 All but 1 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 5 cells ^000000",
		"Cast Time:^777777 None ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Attack a single target using the rest of your HP to deal massive damage. The more HP you have when casting, the more damage will be done. After using this ability, your HP will be 1. ^000000",
	].join("\n");

	SkillDescription[SKID.MB_FIGHTING] = [

	].join("\n");

	SkillDescription[SKID.MB_NEUTRAL] = [

	].join("\n");

	SkillDescription[SKID.MB_TAIMING_PUTI] = [

	].join("\n");

	SkillDescription[SKID.MB_WHITEPOTION] = [

	].join("\n");

	SkillDescription[SKID.MB_MENTAL] = [

	].join("\n");

	SkillDescription[SKID.MB_CARDPITCHER] = [

	].join("\n");

	SkillDescription[SKID.MB_PETPITCHER] = [

	].join("\n");

	SkillDescription[SKID.MB_BODYSTUDY] = [

	].join("\n");

	SkillDescription[SKID.MB_BODYALTER] = [

	].join("\n");

	SkillDescription[SKID.MB_PETMEMORY] = [

	].join("\n");

	SkillDescription[SKID.MB_M_TELEPORT] = [

	].join("\n");

	SkillDescription[SKID.MB_B_GAIN] = [

	].join("\n");

	SkillDescription[SKID.MB_M_GAIN] = [

	].join("\n");

	SkillDescription[SKID.MB_MISSION] = [

	].join("\n");

	SkillDescription[SKID.MB_MUNAKKNOWLEDGE] = [

	].join("\n");

	SkillDescription[SKID.MB_MUNAKBALL] = [

	].join("\n");

	SkillDescription[SKID.MB_SCROLL] = [

	].join("\n");

	SkillDescription[SKID.MB_B_GATHERING] = [

	].join("\n");

	SkillDescription[SKID.MB_M_GATHERING] = [

	].join("\n");

	SkillDescription[SKID.MB_B_EXCLUDE] = [

	].join("\n");

	SkillDescription[SKID.MB_B_DRIFT] = [

	].join("\n");

	SkillDescription[SKID.MB_B_WALLRUSH] = [

	].join("\n");

	SkillDescription[SKID.MB_M_WALLRUSH] = [

	].join("\n");

	SkillDescription[SKID.MB_B_WALLSHIFT] = [

	].join("\n");

	SkillDescription[SKID.MB_M_WALLCRASH] = [

	].join("\n");

	SkillDescription[SKID.MB_M_REINCARNATION] = [

	].join("\n");

	SkillDescription[SKID.MB_B_EQUIP] = [

	].join("\n");

	SkillDescription[SKID.SL_DEATHKNIGHT] = [

	].join("\n");

	SkillDescription[SKID.SL_COLLECTOR] = [

	].join("\n");

	SkillDescription[SKID.SL_NINJA] = [

	].join("\n");

	SkillDescription[SKID.SL_GUNNER] = [

	].join("\n");

	SkillDescription[SKID.AM_TWILIGHT4] = [

	].join("\n");

	SkillDescription[SKID.DE_BERSERKAIZER] = [

	].join("\n");

	SkillDescription[SKID.DA_DARKPOWER] = [

	].join("\n");

	SkillDescription[SKID.DE_PASSIVE] = [

	].join("\n");

	SkillDescription[SKID.DE_PATTACK] = [

	].join("\n");

	SkillDescription[SKID.DE_PSPEED] = [

	].join("\n");

	SkillDescription[SKID.DE_PDEFENSE] = [

	].join("\n");

	SkillDescription[SKID.DE_PCRITICAL] = [

	].join("\n");

	SkillDescription[SKID.DE_PHP] = [

	].join("\n");

	SkillDescription[SKID.DE_PSP] = [

	].join("\n");

	SkillDescription[SKID.DE_RESET] = [

	].join("\n");

	SkillDescription[SKID.DE_RANKING] = [

	].join("\n");

	SkillDescription[SKID.DE_PTRIPLE] = [

	].join("\n");

	SkillDescription[SKID.DE_ENERGY] = [

	].join("\n");

	SkillDescription[SKID.DE_NIGHTMARE] = [

	].join("\n");

	SkillDescription[SKID.DE_SLASH] = [

	].join("\n");

	SkillDescription[SKID.DE_COIL] = [

	].join("\n");

	SkillDescription[SKID.DE_WAVE] = [

	].join("\n");

	SkillDescription[SKID.DE_REBIRTH] = [

	].join("\n");

	SkillDescription[SKID.DE_AURA] = [

	].join("\n");

	SkillDescription[SKID.DE_FREEZER] = [

	].join("\n");

	SkillDescription[SKID.DE_CHANGEATTACK] = [

	].join("\n");

	SkillDescription[SKID.DE_PUNISH] = [

	].join("\n");

	SkillDescription[SKID.DE_POISON] = [

	].join("\n");

	SkillDescription[SKID.DE_INSTANT] = [

	].join("\n");

	SkillDescription[SKID.DE_WARNING] = [

	].join("\n");

	SkillDescription[SKID.DE_RANKEDKNIFE] = [

	].join("\n");

	SkillDescription[SKID.DE_RANKEDGRADIUS] = [

	].join("\n");

	SkillDescription[SKID.DE_GAUGE] = [

	].join("\n");

	SkillDescription[SKID.DE_GTIME] = [

	].join("\n");

	SkillDescription[SKID.DE_GPAIN] = [

	].join("\n");

	SkillDescription[SKID.DE_GSKILL] = [

	].join("\n");

	SkillDescription[SKID.DE_GKILL] = [

	].join("\n");

	SkillDescription[SKID.DE_ACCEL] = [

	].join("\n");

	SkillDescription[SKID.DE_BLOCKDOUBLE] = [

	].join("\n");

	SkillDescription[SKID.DE_BLOCKMELEE] = [

	].join("\n");

	SkillDescription[SKID.DE_BLOCKFAR] = [

	].join("\n");

	SkillDescription[SKID.DE_FRONTATTACK] = [

	].join("\n");

	SkillDescription[SKID.DE_DANGERATTACK] = [

	].join("\n");

	SkillDescription[SKID.DE_TWINATTACK] = [

	].join("\n");

	SkillDescription[SKID.DE_WINDATTACK] = [

	].join("\n");

	SkillDescription[SKID.DE_WATERATTACK] = [

	].join("\n");

	SkillDescription[SKID.DA_ENERGY] = [

	].join("\n");

	SkillDescription[SKID.DA_CLOUD] = [

	].join("\n");

	SkillDescription[SKID.DA_FIRSTSLOT] = [

	].join("\n");

	SkillDescription[SKID.DA_HEADDEF] = [

	].join("\n");

	SkillDescription[SKID.DA_SPACE] = [

	].join("\n");

	SkillDescription[SKID.DA_TRANSFORM] = [

	].join("\n");

	SkillDescription[SKID.DA_EXPLOSION] = [

	].join("\n");

	SkillDescription[SKID.DA_REWARD] = [

	].join("\n");

	SkillDescription[SKID.DA_CRUSH] = [

	].join("\n");

	SkillDescription[SKID.DA_ITEMREBUILD] = [

	].join("\n");

	SkillDescription[SKID.DA_ILLUSION] = [

	].join("\n");

	SkillDescription[SKID.DA_NUETRALIZE] = [

	].join("\n");

	SkillDescription[SKID.DA_RUNNER] = [

	].join("\n");

	SkillDescription[SKID.DA_TRANSFER] = [

	].join("\n");

	SkillDescription[SKID.DA_WALL] = [

	].join("\n");

	SkillDescription[SKID.DA_REVENGE] = [

	].join("\n");

	SkillDescription[SKID.DA_EARPLUG] = [

	].join("\n");

	SkillDescription[SKID.DA_CONTRACT] = [

	].join("\n");

	SkillDescription[SKID.DA_BLACK] = [

	].join("\n");

	SkillDescription[SKID.DA_DREAM] = [

	].join("\n");

	SkillDescription[SKID.DA_MAGICCART] = [

	].join("\n");

	SkillDescription[SKID.DA_COPY] = [

	].join("\n");

	SkillDescription[SKID.DA_CRYSTAL] = [

	].join("\n");

	SkillDescription[SKID.DA_EXP] = [

	].join("\n");

	SkillDescription[SKID.DA_CARTSWING] = [

	].join("\n");

	SkillDescription[SKID.DA_REBUILD] = [

	].join("\n");

	SkillDescription[SKID.DA_JOBCHANGE] = [

	].join("\n");

	SkillDescription[SKID.DA_EDARKNESS] = [

	].join("\n");

	SkillDescription[SKID.DA_EGUARDIAN] = [

	].join("\n");

	SkillDescription[SKID.DA_TIMEOUT] = [

	].join("\n");

	SkillDescription[SKID.ALL_TIMEIN] = [

	].join("\n");

	SkillDescription[SKID.DA_ZENYRANK] = [

	].join("\n");

	SkillDescription[SKID.DA_ACCESSORYMIX] = [

	].join("\n");

	SkillDescription[SKID.NPC_EARTHQUAKE] = [

	].join("\n");

	SkillDescription[SKID.NPC_DRAGONFEAR] = [

	].join("\n");

	SkillDescription[SKID.NPC_PULSESTRIKE] = [

	].join("\n");

	SkillDescription[SKID.NPC_HELLJUDGEMENT] = [

	].join("\n");

	SkillDescription[SKID.NPC_WIDESILENCE] = [

	].join("\n");

	SkillDescription[SKID.NPC_WIDEFREEZE] = [

	].join("\n");

	SkillDescription[SKID.NPC_WIDEBLEEDING] = [

	].join("\n");

	SkillDescription[SKID.NPC_WIDESTONE] = [

	].join("\n");

	SkillDescription[SKID.NPC_WIDECONFUSE] = [

	].join("\n");

	SkillDescription[SKID.NPC_WIDESLEEP] = [

	].join("\n");

	SkillDescription[SKID.NPC_EVILLAND] = [

	].join("\n");

	SkillDescription[SKID.NPC_MAGICMIRROR] = [

	].join("\n");

	SkillDescription[SKID.NPC_SLOWCAST] = [

	].join("\n");

	SkillDescription[SKID.NPC_CRITICALWOUND] = [

	].join("\n");

	SkillDescription[SKID.NPC_STONESKIN] = [

	].join("\n");

	SkillDescription[SKID.NPC_ANTIMAGIC] = [

	].join("\n");

	SkillDescription[SKID.NPC_WIDECURSE] = [

	].join("\n");

	SkillDescription[SKID.NPC_WIDESTUN] = [

	].join("\n");

	SkillDescription[SKID.NPC_VAMPIRE_GIFT] = [

	].join("\n");

	SkillDescription[SKID.NPC_WIDESOULDRAIN] = [

	].join("\n");

	SkillDescription[SKID.ALL_INCCARRY] = [
		"Enlarge Weight Limit R",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Improve Maximum Weight Limit. ^000000",
		"[LV 1]^777777 Enlarge Weight +200 ^000000",
		"[LV 2]^777777 Enlarge Weight +400 ^000000",
		"[LV 3]^777777 Enlarge Weight +600 ^000000",
		"[LV 4]^777777 Enlarge Weight +800 ^000000",
		"[LV 5]^777777 Enlarge Weight +1000 ^000000",
		"[LV 6]^777777 Enlarge Weight +1200 ^000000",
		"[LV 7]^777777 Enlarge Weight +1400 ^000000",
		"[LV 8]^777777 Enlarge Weight +1600 ^000000",
		"[LV 9]^777777 Enlarge Weight +1800 ^000000",
		"[LV 10]^777777 Enlarge Weight +2000 ^000000",
	].join("\n");

	SkillDescription[SKID.NPC_HELLPOWER] = [

	].join("\n");

	SkillDescription[SKID.NPC_ALLHEAL] = [

	].join("\n");

	SkillDescription[SKID.GM_SANDMAN] = [
		"Lullaby",
		"Type : ^777777 Active ^bb00bb('''')^000000",
		"Effect : ^777777'''''' '''' '' '''' '''尡'' 'ҷ' '''''' '''''ð' ''' '' '''' '''''''·' ''''''.^000000",
	].join("\n");

	SkillDescription[SKID.ALL_CATCRY] = [
		"Cat Cry",
		"Effect : '''' : ^777777'㸦 'ѾƳ''' '''' '''''''' '''''Ҹ''' ''''.^000000",
	].join("\n");

	SkillDescription[SKID.ALL_PARTYFLEE] = [
		"Party Flee",
		"Effect : ^777777''^000000\"",
	].join("\n");

	SkillDescription[SKID.ALL_ANGEL_PROTECT] = [
		"Angel Protect",
	].join("\n");

	SkillDescription[SKID.ALL_DREAM_SUMMERNIGHT] = [
		"Dream Summernight",
		"Effect : ^777777'''''ϸ' '' '''' '''' '''' 'ٴ' '' '' '''''' ''''.^000000\"",
	].join("\n");

	SkillDescription[SKID.ALL_REVERSEORCISH] = [

	].join("\n");

	SkillDescription[SKID.ALL_WEWISH] = [
		"We Wish",
		"(Oh! Holy Night)",
		"Effect:^777777 Sing along with the Singing Crystal's tune:",
		"We wish you a Merry Christmas, and a Happy New Year! ^000000",
	].join("\n");

	SkillDescription[SKID.ALL_BUYING_STORE] = [
		"Buying Store",
		"Type : Active",
		"Target:^777777 Self ^000000",
		"Catalyst:^777777 1 Purchase License ^000000",
		"Effect : ^777777Enables the ability to open a purchase stall to buy various kinds of items. Must have atleast 1 item you are buying.^000000",
	].join("\n");

	SkillDescription[SKID.ALL_GUARDIAN_RECALL] = [
		"Guardian Recall",
		"Max Lv : 1",
		"Type : ^777777Active^bb0000(Return)^000000",
		"Description : ^777777Warps you to the Town of Mora. 3 seconds fixed-casting time. Skill cooldown is 5 minutes.^000000",
	].join("\n");

	SkillDescription[SKID.ALL_ODINS_POWER] = [
		"Odin's Power",
		"Type:^777777 Active / Buff ^000000",
		"Description : Temporarily increases Magical and Physical attack damage but lowers DEF and MDEF",
		"[LV 1] : ^777777For 60 seconds ATK and MATK +70, DEF and MDEF -20.^000000",
		"[LV 2] : ^777777For 60 seconds ATK and MATK +100, DEF and MDEF -20.^000000",
	].join("\n");


	SkillDescription[SKID.KN_CHARGEATK] = [
		"Charge Attack",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 40 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Unknown ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Charge at the single enemy that's away from you at range immediately.",
		"Further the enemy is from you, higher your ATK will be, but also increase your casting time of this skill. ^000000",
	].join("\n");

	SkillDescription[SKID.CR_SHRINK] = [
		"Shrink",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 15 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 300 sec ^000000",
		"Effect:^777777 This skill activates when used and deactivates if used again or the duration expires.",
		"If you successfully defend using Auto Guard, there is a (5*Auto Guard LV)% chance to push the defended enemy 2 cells away. ^000000",
	].join("\n");

	SkillDescription[SKID.AS_SONICACCEL] = [
		"Sonic Acceleration",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Passive ^000000",
		"Effect:^777777 Increases the Sonic Blow HIT by +50 and Damage by +10% ^000000",
	].join("\n");

	SkillDescription[SKID.AS_VENOMKNIFE] = [
		"Throw Venom Knife",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 15 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Unknown (9?) ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Throws a poisoned Dagger with a high chance of poisoning the target. This Skill requires you to have a Dagger equipped and uses up this item when executed. ^000000",
	].join("\n");

	SkillDescription[SKID.RG_CLOSECONFINE] = [
		"Close Confine",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 25 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Unknown (melee?) ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 10 sec ^000000",
		"Effect:^777777 For 10 seconds, you grab a single enemy, preventing you and the target to move. While you grab onto someone, you will have +10 bonus to Flee Rate.",
		"If either the victim or you die, or should any of them teleport away, this skill is cancelled. ^000000",
	].join("\n");

	SkillDescription[SKID.WZ_SIGHTBLASTER] = [
		"Sight Blaster",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 40 ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 Unknown (cells around the caster?) ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 120 sec ^000000",
		"Effect:^777777 Summons a fireball that circles around you and hits enemies attempting to attack you at close range.",
		"When an enemy steps next to you, he will be hit by a MATK Fire Element attack and pushed back. The Fireball disappears after hitting an enemy. ^000000",
	].join("\n");

	SkillDescription[SKID.SA_CREATECON] = [
		"Create Elemental Converter",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 30 ^000000",
		"Target:^777777 None ^000000",
		"Range:^777777 None ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Create an \"Elemental Converter\" item.",
		"Recipes:",
		"- Flame Elemental Converter:",
		"3 Scorpion Tail + 1 Blank Scroll",
		"- Seismic Elemental Converter:",
		"3 Horn + 1 Blank Scroll",
		"- Lightning Elemental Converter:",
		"3 Rainbow Shell + 1 Blank Scroll",
		"- Frost Elemental Converter:",
		"3 Snail's Shell + 1 Blank Scroll ^000000",
	].join("\n");

	SkillDescription[SKID.SA_ELEMENTWATER] = [
		"Elemental Change (Water)",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 30 ^000000",
		"Target:^777777 Monster ^000000",
		"Range:^777777 Unknown ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Change the target monster's elemental property to Water, uses up a Frost Elemental Converter. ^000000",
	].join("\n");

	SkillDescription[SKID.HT_PHANTASMIC] = [
		"Phantasmic Arrow",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Unknown (Bow range?) ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Launches an arrow of illusion from your bow. It has 150% ATK, and if it hits the enemy, it pushes them back 3 cells. You can use this skill even if you have no Arrows equipped. ^000000",
	].join("\n");

	SkillDescription[SKID.BA_PANGVOICE] = [
		"Pang Voice",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Unknown ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 You scream out at a single target, causing the 'Confusion' status ailment. Does not work against Boss monsters. ^000000",
	].join("\n");

	SkillDescription[SKID.DC_WINKCHARM] = [
		"Wink of Charm",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 40 ^000000",
		"Target:^777777 Unknown (Enemy?) ^000000",
		"Range:^777777 Unknown ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 10 sec ^000000",
		"Effect:^777777 Charm a target by sending them a sexy wink. For those 10 seconds, the target monster will not attack you.",
		"The higher your level is when compared to the monster, the higher the chance of this skill working.",
		"If this skill is used on a player, it has low chance of causing the 'Confusion' status ailment.",
		"This skill only works on DemiHuman, Angel and Demon type monsters and, obviously, does not work against Boss monsters. ^000000",
	].join("\n");

	SkillDescription[SKID.BS_UNFAIRLYTRICK] = [
		"Unfair Trick",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Passive ^000000",
		"Effect:^777777 Reduces the Zeny cost of Mammonite by 10%. ^000000",
	].join("\n");

	SkillDescription[SKID.BS_GREED] = [
		"Greed",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 5x5 cells ^000000",
		"Cast Time:^777777 Unknown (instant?) ^000000",
		"Cool Down:^777777 Unknown (none?) ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 When you use this skill, all items within 2 cells of the Blacksmith will straight go to his inventory.",
		"It is not possible to use this skill during the War of Emperium or in PvP.",
		"Do note this skill does not bypass the order of who gets an item first, so you cannot use this skill to snatch an item when another player has the first priority over the item dropped. ^000000",
	].join("\n");

	SkillDescription[SKID.PR_REDEMPTIO] = [
		"Redemptio",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 400 ^000000",
		"Target:^777777 Party Members ^000000",
		"Range:^777777 Unknown (entire screen?) ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Kill yourself (and receive EXP penalty), but revive all other dead party members near you.",
		"All revived players will have recovered 50% of their HP. The more party members you revive, the less EXP penalty you get.",
		"Casting time is 4 seconds, and this skill ignores DEX for casting time reduction. Will not work if your current EXP is below 1%.",
		"Editor's Note: I speculate the EXP loss to be (1-Resurrected Members)*0.01% ^000000",
	].join("\n");

	SkillDescription[SKID.MO_KITRANSLATION] = [
		"Ki Translation",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 40 ^000000",
		"Target:^777777 Party Member (must be monk class?) ^000000",
		"Range:^777777 Unknown ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Transfer one of your Spirit Spheres to another party member. Uses up 1 Spirit Sphere. ^000000",
	].join("\n");

	SkillDescription[SKID.MO_BALKYOUNG] = [
		"Ki Explosion",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 20 ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 Unknown ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Focus your inner energies and attack an enemy to deal damage and push them away.",
		"The targeted enemy receives 300% ATK damage, and nearby monsters will be pushed away 2 cells and stunned for 2 sec.",
		"Drains a small amount of HP per use. ^000000",
	].join("\n");

	SkillDescription[SKID.SA_ELEMENTGROUND] = [
		"Elemental Change (Earth)",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 30 ^000000",
		"Target:^777777 Monster ^000000",
		"Range:^777777 Unknown ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Change the target monster's elemental property to Earth, uses up a Seismic Elemental Converter. ^000000",
	].join("\n");

	SkillDescription[SKID.SA_ELEMENTFIRE] = [
		"Elemental Change (Fire)",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 30 ^000000",
		"Target:^777777 Monster ^000000",
		"Range:^777777 Unknown ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Change the target monster's elemental property to Fire, uses up a Flame Elemental Converter. ^000000",
	].join("\n");

	SkillDescription[SKID.SA_ELEMENTWIND] = [
		"Elemental Change (Wind)",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 30 ^000000",
		"Target:^777777 Monster ^000000",
		"Range:^777777 Unknown ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Change the target monster's elemental property to Wind, uses up a Lightning Elemental Converter. ^000000",
	].join("\n");

	SkillDescription[SKID.RK_ENCHANTBLADE] = [
		"Enchant Blade",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 35 + 5*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Duration:^777777 300 sec ^000000",
		"Effect:^777777 Enchants your blade with magic, allowing your to deal additional magic damage with your physical attacks. Each level increases the magic damage. ^000000",
		"[LV 1]^777777 +120 MATK ^000000",
		"[LV 2]^777777 +140 MATK ^000000",
		"[LV 3]^777777 +160 MATK ^000000",
		"[LV 4]^777777 +180 MATK ^000000",
		"[LV 5]^777777 +200 MATK ^000000",
	].join("\n");

	SkillDescription[SKID.RK_SONICWAVE] = [
		"Sonic Wave",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 25 + 5*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Effect:^777777 Slam your weapon into the ground to unleash a shockwave that strikes an opponent at a distance. The farther away the target is, the less damage they take. ^000000",
		"[LV 1]^777777 600% ATK ^000000",
		"[LV 2]^777777 700% ATK ^000000",
		"[LV 3]^777777 800% ATK ^000000",
		"[LV 4]^777777 900% ATK ^000000",
		"[LV 5]^777777 1000% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.RK_DEATHBOUND] = [
		"Death Bound",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 45 + 5 * SkillLV^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 3 sec ^000000",
		"Effect:^777777 The damage you receive is amplified and used against the attacker. However, you still receive a portion of the amplified damage. ^000000",
		"[LV 1]^777777 420% ATK ^000000",
		"[LV 2]^777777 490% ATK ^000000",
		"[LV 3]^777777 560% ATK ^000000",
		"[LV 4]^777777 630% ATK ^000000",
		"[LV 5]^777777 700% ATK ^000000",
		"[LV 6]^777777 770% ATK ^000000",
		"[LV 7]^777777 840% ATK ^000000",
		"[LV 8]^777777 910% ATK ^000000",
		"[LV 9]^777777 980% ATK ^000000",
		"[LV 10]^777777 1050% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.RK_HUNDREDSPEAR] = [
		"Hundred Spear",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 60 ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Effect:^777777 Spear exclusive skill. A skill that strikes a single target rapidly in quick succession to deal high damage. Also has a chance to cast spear boomerang at the same time. If Spiral Pierce is mastered the damage is increased.^000000",
		"[LV 1]^777777 680% ATK / Spear Boomerang proc chance 13% ^000000",
		"[LV 2]^777777 760% ATK / Spear Boomerang proc chance 16% ^000000",
		"[LV 3]^777777 840% ATK / Spear Boomerang proc chance 19% ^000000",
		"[LV 4]^777777 920% ATK / Spear Boomerang proc chance 22% ^000000",
		"[LV 5]^777777 1000% ATK / Spear Boomerang proc chance 25% ^000000",
		"[LV 6]^777777 1080% ATK / Spear Boomerang proc chance 28% ^000000",
		"[LV 7]^777777 1160% ATK / Spear Boomerang proc chance 31% ^000000",
		"[LV 8]^777777 1240% ATK / Spear Boomerang proc chance 34% ^000000",
		"[LV 9]^777777 1320% ATK / Spear Boomerang proc chance 37% ^000000",
		"[LV 10]^777777 1400% ATK / Spear Boomerang proc chance 40% ^000000",
	].join("\n");

	SkillDescription[SKID.RK_WINDCUTTER] = [
		"Wind Cutter",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 16+4*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Effect:^777777 Two Handed Sword exclusive skill. Swinging a large two handed sword, the rune knight can create huge presure that throws enemies away. There is a chance to cause fear status Fear on those affected. ^000000",
		"[LV 1]^777777 150% ATK ^000000",
		"[LV 2]^777777 200% ATK ^000000",
		"[LV 3]^777777 250% ATK ^000000",
		"[LV 4]^777777 300% ATK ^000000",
		"[LV 5]^777777 350% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.RK_IGNITIONBREAK] = [
		"Ignition Break",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 30+5*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Effect:^777777 The Rune Knight makes their sword incredibly hot, triggering an explosion that deals damage to all targets nearby. Targets closer to the player receive higher damage. Deal 1.5x more damage if your weapon is endowed with fire element. ^000000",
		"[LV 1]^777777 300%-250%-200% ATK ^000000",
		"[LV 2]^777777 600%-500%-400% ATK ^000000",
		"[LV 3]^777777 900%-750%-600% ATK ^000000",
		"[LV 4]^777777 1200%-1000%-800% ATK ^000000",
		"[LV 5]^777777 1500%-1250%-1000% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.RK_DRAGONTRAINING] = [
		"Dragon Training",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Passive ^000000",
		"Effect:^777777 Allows the user to use a dragon mount. Increasing the skill level recovers your lost attack speed when using the mount, and also slightly increases the damage of dragon breath. ",
		"[LV 1]^777777 Attack Speed 60%, Max Weight +700 ^000000",
		"[LV 2]^777777 Attack Speed 70%, Max Weight +900 ^000000",
		"[LV 3]^777777 Attack Speed 80%, Max Weight +1100 ^000000",
		"[LV 4]^777777 Attack Speed 90%, Max Weight +1300 ^000000",
		"[LV 5]^777777 Normal Attack Speed, Max Weight +1500 ^000000",
	].join("\n");

	SkillDescription[SKID.RK_DRAGONBREATH] = [
		"Dragon Breath",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 25+5*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Effect:^777777 Causes the dragon to breath incredibly hot fire, with a chance to cause burning which deals damage over time. The damage of dragon breath is dependant on the condition of the rider. ^000000",
	].join("\n");

	SkillDescription[SKID.RK_DRAGONHOWLING] = [
		"Dragon Howling",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 70 ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 1 minutes ^000000",
		"Effect:^777777 The dragon lets out a terrible howl, causing fear status to those within range. Howling however can negatively affect the performance of the dragon. ^000000",
	].join("\n");

	SkillDescription[SKID.RK_RUNEMASTERY] = [
		"Rune Mastery",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Passive ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 ?? ^000000",
		"Effect:^777777 Rune mastery gives rune knights an understanding to the use and creation of runes. With this skill rune knights can craft runes, and higher levels influence the success rate.",
		"There are 9 different types of runes, and the higher level ones require higher level rune mastery to craft.",
		"To craft a rune, you need at least one rune ore in your inventory. The better the type of ore you use, the higher chance you have of success. ^000000",
		"[LV 1]^777777 Create Thurisaz ^000000",
		"[LV 2]^777777 Create Isa ^000000",
		"[LV 3]^777777 Create Wyrd ^000000",
		"[LV 4]^777777 Create Hagalaz ^000000",
		"[LV 5]^777777 Create Othila ^000000",
		"[LV 6]^777777 Create Uruz ^000000",
		"[LV 7]^777777 Create Raido ^000000",
		"[LV 8]^777777 Create Nauthiz ^000000",
		"[LV 9]^777777 Create Berkana ^000000",
		"[LV 10]^777777 - ^000000",
	].join("\n");

	SkillDescription[SKID.RK_MILLENNIUMSHIELD] = [

	].join("\n");

	SkillDescription[SKID.RK_CRUSHSTRIKE] = [

	].join("\n");

	SkillDescription[SKID.RK_REFRESH] = [

	].join("\n");

	SkillDescription[SKID.RK_GIANTGROWTH] = [

	].join("\n");

	SkillDescription[SKID.RK_STONEHARDSKIN] = [

	].join("\n");

	SkillDescription[SKID.RK_VITALITYACTIVATION] = [

	].join("\n");

	SkillDescription[SKID.RK_STORMBLAST] = [

	].join("\n");

	SkillDescription[SKID.RK_FIGHTINGSPIRIT] = [

	].join("\n");

	SkillDescription[SKID.RK_ABUNDANCE] = [

	].join("\n");

	SkillDescription[SKID.RK_PHANTOMTHRUST] = [
		"Phantom Thrust",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 12+3*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 Spear Exclusive Skill. The rune knight strikes a target from far away, pulling that target towards the user. This skill can be used on party members, but when done so it deals no damage. Has a range of 5 cells. ^000000",
		"[LV 1]^777777 Range 5 cells / 50% ATK ^000000",
		"[LV 2]^777777 Range 6 cells / 100% ATK ^000000",
		"[LV 3]^777777 Range 7 cells / 150% ATK ^000000",
		"[LV 4]^777777 Range 8 cells / 200% ATK ^000000",
		"[LV 5]^777777 Range 9 cells / 250% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.GC_VENOMIMPRESS] = [
		"Venom Impress",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 8+4*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Range:^777777 10 cells ^000000",
		"Effect:^777777 Weakens a target's resistance to poison element attacks. ^000000",
		"[LV 1]^777777 Poison Resistance -10% ^000000",
		"[LV 2]^777777 Poison Resistance -20% ^000000",
		"[LV 3]^777777 Poison Resistance -30% ^000000",
		"[LV 4]^777777 Poison Resistance -40% ^000000",
		"[LV 5]^777777 Poison Resistance -50% ^000000",
	].join("\n");

	SkillDescription[SKID.GC_CROSSIMPACT] = [
		"Cross Impact",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 25 ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 Strikes a single target rapidly for 7 hits. Range 3 cells. ^000000",
		"[LV 1]^777777 1100% ATK ^000000",
		"[LV 2]^777777 1200% ATK ^000000",
		"[LV 3]^777777 1300% ATK ^000000",
		"[LV 4]^777777 1400% ATK ^000000",
		"[LV 5]^777777 1400% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.GC_DARKILLUSION] = [
		"Dark Illusion",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 40 ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1.5 sec ^000000",
		"Effect:^777777 Rapidly closes the distance to a target and deals damage. Has a low chance to trigger Cross Impact.^000000",
		"[LV 1]^777777 100% ATK / Range 5 Cells ^000000",
		"[LV 2]^777777 100% ATK / Range 6 Cells ^000000",
		"[LV 3]^777777 100% ATK / Range 7 Cells ^000000",
		"[LV 4]^777777 100% ATK / Range 8 Cells ^000000",
		"[LV 5]^777777 100% ATK / Range 9 Cells ^000000",
	].join("\n");

	SkillDescription[SKID.GC_RESEARCHNEWPOISON] = [
		"Research New Poison",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 ??+??*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 Allows creation of new poisons. Higher levels of the skills unlocks new types of poisons and increases the probability of success. It is necessary to have medicine bottle and a poison creation kit. ^000000",
		"[LV 1]^777777 35% Success Rate, Poison Name 'Paralize' 20 Poison Toad Skin, 1 Amoena ^000000",
		"[LV 2]^777777 40% Success Rate, Poison Name 'Pyrexia' 20 Anolian Skin, 1 Lantana ^000000",
		"[LV 3]^777777 45% Success Rate, Poison Name 'Dishearth' 10 Decayed Nail, 1 Celatom ^000000",
		"[LV 4]^777777 50% Success Rate, Poison Name 'Leech End' 1 Scoforia, 1 Nerium ^000000",
		"[LV 5]^777777 55% Success Rate, Poison Name 'Antidote' 2 Green Herbs, 1 Blue Herb, 1 White Herb ^000000",
		"[LV 6]^777777 60% Success Rate, Poison Name 'Venom Bleed' 10 Sticky Poison, 1 Isildor ^000000",
		"[LV 7]^777777 65% Success Rate, Poison Name 'Magic Mushroom' 10 Poison Spore, 1 Makulrata ^000000",
		"[LV 8]^777777 70% Success Rate, Poison Name 'Toxin' 10 Sticky Poison, 1 Nerium ^000000",
		"[LV 9]^777777 75% Success Rate, Poison Name 'Oblivion Curse'	 10 Mermaid Heart, 1 Isildor ^000000",
		"[LV 10]^777777 80% Success Rate ^000000",
	].join("\n");

	SkillDescription[SKID.GC_CREATENEWPOISON] = [
		"Create New Poison",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 Creates a new poison. Presents a list of poisons you can make with your current items. ^000000",
	].join("\n");

	SkillDescription[SKID.GC_ANTIDOTE] = [
		"Antidote",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 Using 1 Antidote, cancels out the effects of a Guillotine Cross poison on a single target. ^000000",
	].join("\n");

	SkillDescription[SKID.GC_POISONINGWEAPON] = [
		"Poisoning Weapon",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 16+4*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 180 sec ^000000",
		"Duration: ^777777 60*SkillLV sec ^000000",
		"Effect:^777777 Coats your weapon with one of the Guillotine Cross poisons. While attacking there is a chance to poison the target with the selected poison. ^000000",
		"[LV 1]^777777 Poisoning Rate 4% ^000000",
		"[LV 2]^777777 Poisoning Rate 6% ^000000",
		"[LV 3]^777777 Poisoning Rate 8% ^000000",
		"[LV 4]^777777 Poisoning Rate 10% ^000000",
		"[LV 5]^777777 Poisoning Rate 12% ^000000",
	].join("\n");

	SkillDescription[SKID.GC_WEAPONBLOCKING] = [
		"Weapon Blocking",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Active / Buff ^000000",
		"SP Cost:^777777 44-4*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down: ^777777 2 sec ^000000",
		"Duration:^777777 180*SkillLV sec ^000000",
		"Effect:^777777 Has a chance to completely block a short range physical attack. When an attack is blocked you have a chance to use counter slash or weapon crush. While its active it continually drains SP. Reusing the skill cancels the effect. ^000000",
		"[LV 1]^777777 Blocking Rate 12% ^000000",
		"[LV 2]^777777 Blocking Rate 14% ^000000",
		"[LV 3]^777777 Blocking Rate 16% ^000000",
		"[LV 4]^777777 Blocking Rate 18% ^000000",
		"[LV 5]^777777 Blocking Rate 20% ^000000",
	].join("\n");

	SkillDescription[SKID.GC_COUNTERSLASH] = [
		"Counter Slash",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Active / Buff ^000000",
		"SP Cost:^777777 2+3*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down: ^777777 2 sec ^000000",
		"Effect:^777777 When successfully blocking an attack with Weapon Blocking, you can counter using Counter Slash. Damages all targets in a 3x3 radius around the user. The damage is increased by the user's AGI, Base Level and Job Level. ^000000",
		"[LV 1]^777777 400% ATK ^000000",
		"[LV 2]^777777 500% ATK ^000000",
		"[LV 3]^777777 600% ATK ^000000",
		"[LV 4]^777777 700% ATK ^000000",
		"[LV 5]^777777 800% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.GC_WEAPONCRUSH] = [
		"Weapon Crush",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 20 ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down: ^777777 1 sec ^000000",
		"Duration: ^777777 40*SkillLv sec ^000000",
		"Effect:^777777 When successfully blocking an attack with Weapon Blocking, you can counter using Weapon Crush. When used it divests the attackers weapon. Increased skill level increases the success rate and duration. ^000000",
	].join("\n");

	SkillDescription[SKID.GC_VENOMPRESSURE] = [
		"Venom Pressure",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Active / Buff ^000000",
		"SP Cost:^777777 20+10*SkillLv ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down: ^777777 1.5 sec ^000000",
		"Duration: ^777777 4+2*SkillLv sec ^000000",
		"Effect:^777777 While your weapon is enchanted with Poisoning Weapon there's a very high chance to inflict the endowed poison on the target. When used, you lose the poisoning weapon status. ^000000"
	].join("\n");

	SkillDescription[SKID.GC_POISONSMOKE] = [
		"Poison Smoke",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Active / Buff ^000000",
		"SP Cost:^777777 40 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down: ^777777 1.5 sec ^000000",
		"Effect:^777777 While your weapon is enchanted with Poisoning Weapon, you create a poisoning cloud in a 5x5 area. Every 2 seconds there's a 50% chance to inflict that poison on the target. Range 5 Cells.^000000",
		"[LV 1]^777777 Duration 10 seconds. ^000000",
		"[LV 2]^777777 Duration 12 seconds. ^000000",
		"[LV 3]^777777 Duration 14 seconds. ^000000",
		"[LV 4]^777777 Duration 16 seconds. ^000000",
		"[LV 5]^777777 Duration 18 seconds. ^000000",
	].join("\n");

	SkillDescription[SKID.GC_CLOAKINGEXCEED] = [
		"Cloaking Exceed",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 45 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 2.5 sec ^000000",
		"Effect:^777777 Unlike regular cloaking it allows hiding from Insect and Demon. When active it allows you to receive 3 hits without being unhidden. Skill Level increases the number of hit and movement speed. ^000000",
		"[LV 1]^777777 Move Speed 100%, Number of Allowed Hit 1 ^000000",
		"[LV 2]^777777 Move Speed 110%, Number of Allowed Hit 1 ^000000",
		"[LV 3]^777777 Move Speed 120%, Number of Allowed Hit 2 ^000000",
		"[LV 4]^777777 Move Speed 130%, Number of Allowed Hit 2 ^000000",
		"[LV 5]^777777 Move Speed 140%, Number of Allowed Hit 3 ^000000",
	].join("\n");

	SkillDescription[SKID.GC_PHANTOMMENACE] = [
		"Phantom Menace",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 30 ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 The Guillotine Cross strikes from the shadows to hit all targets in a 7x7 area for 300% damage. Cancels hidden status on all targets that are hit. ^000000",
	].join("\n");

	SkillDescription[SKID.GC_HALLUCINATIONWALK] = [
		"Hallucination Walk",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 100 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 5 minutes ^000000",
		"Duration: ^777777 ?? sec ^000000",
		"Effect:^777777 Momentarily increases the users speed to the limit, granting high evasion rate of physical and magical attacks. Using the skill consumes HP, and when the skill ends for 25 seconds you receive half movement speed and half attack speed. ^000000",
		"[LV 1]^777777 Evasion Rate +50, Magic Evasion 10% ^000000",
		"[LV 2]^777777 Evasion Rate +100, Magic Evasion 20% ^000000",
		"[LV 3]^777777 Evasion Rate +150, Magic Evasion 30% ^000000",
		"[LV 4]^777777 Evasion Rate +200, Magic Evasion 40% ^000000",
		"[LV 5]^777777 Evasion Rate +250, Magic Evasion 50% ^000000",
	].join("\n");

	SkillDescription[SKID.GC_ROLLINGCUTTER] = [
		"Rolling Cutter",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 5 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 Katar Exclusive Skill. Using the katar strikes in a rotation in an area around the player striking all enemies in range. Each rotation increases your rotation counter, which increases the damage of Cross Ripper Slasher. You can't have more than 10 rotation counters. ^000000",
		"[LV 1]^777777 100% ATK / Range 3 x 3^000000",
		"[LV 2]^777777 150% ATK / Range 3 x 3^000000",
		"[LV 3]^777777 200% ATK / Range 3 x 3^000000",
		"[LV 4]^777777 250% ATK / Range 3 x 3^000000",
		"[LV 5]^777777 300% ATK / Range 5 x 5^000000",
	].join("\n");

	SkillDescription[SKID.GC_CROSSRIPPERSLASHER] = [
		"Cross Ripper Slasher",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 16+4*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 Consumes the rotation counters accumulated from Rolling Cutter. The spinning blade is shot out dealing strong damage to a target. The damage is increased by the number of counters and AGI. After using Cross Ripper Slasher your counters are reset to 0. ^000000",
		"[LV 1]^777777 480% ATK / Range 9 cells ^000000",
		"[LV 2]^777777 560% ATK / Range 10 cells ^000000",
		"[LV 3]^777777 640% ATK / Range 11 cells ^000000",
		"[LV 4]^777777 720% ATK / Range 12 cells ^000000",
		"[LV 5]^777777 800% ATK / Range 13 cells ^000000",
	].join("\n");

	SkillDescription[SKID.AB_JUDEX] = [
		"Judex",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 27+3*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Effect:^777777 A magic attack that deals holy attribute damage to a target and all targets in the surounding 3 cells. ^000000",
		"[LV 1]^777777 300% MATK ^000000",
		"[LV 2]^777777 320% MATK ^000000",
		"[LV 3]^777777 340% MATK ^000000",
		"[LV 4]^777777 360% MATK ^000000",
		"[LV 5]^777777 400% MATK ^000000",
	].join("\n");

	SkillDescription[SKID.AB_ANCILLA] = [
		"Ancilla",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 30% MaxSP ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Catalyst:^0000ff 1 Blue Gemstone ^000000",
		"Effect:^777777 Allows creation of the magic stone known as Ancilla.",
		"(Ancilla item recovers 15% of Max SP, Maximum of 3 can be held at a time.) ^000000",
	].join("\n");

	SkillDescription[SKID.AB_ADORAMUS] = [
		"Adoramus",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 16+4*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Catalyst:^0000ff 1 Blue Gemstone ^000000",
		"Effect:^777777 Strikes a single target for damage with a powerful holy light that also causes blind and agility down effect.",
		"If the caster is standing next to another priest type character however, the gemstone requirement is negated, but the other priest incurs a portion of the SP casting cost. ^000000",
		"[LV 1]^777777 300% ATK ^000000",
		"[LV 2]^777777 400% ATK ^000000",
		"[LV 3]^777777 500% ATK ^000000",
		"[LV 4]^777777 600% ATK ^000000",
		"[LV 5]^777777 700% ATK ^000000",
		"[LV 6]^777777 800% TK ^000000",
		"[LV 7]^777777 900% ATK ^000000",
		"[LV 8]^777777 1000% ATK ^000000",
		"[LV 9]^777777 1100% ATK ^000000",
		"[LV 10]^777777 1200% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.AB_CLEMENTIA] = [
		"Clementia",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 180+20*SkillLV ^000000",
		"Target:^777777 Ally / Self ^000000",
		"Cast Time:^777777 4 secs ^000000",
		"Effect:^777777 Casts the skill 'Blessing' on the target and any party members within a radius of that target. ^000000",
		"[LV 1]^777777 3 Cells Around the Target / Duration 200 sec ^000000",
		"[LV 2]^777777 7 Cells Around the Target / Duration 220 sec ^000000",
		"[LV 3]^777777 15 Cells Around the Target / Duration 240 sec ^000000",
	].join("\n");

	SkillDescription[SKID.AB_CANTO] = [
		"Canto Candidus",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 130+15*SkillLV ^000000",
		"Target:^777777 Ally / Self ^000000",
		"Cast Time:^777777 4 sec ^000000",
		"Effect:^777777 Casts the skill 'Increase AGI' on the target and any party members within a radius of that target. ^000000",
		"[LV 1]^777777 3 Cells Around the Target / Duration 200 sec ^000000",
		"[LV 2]^777777 7 Cells Around the Target / Duration 220 sec ^000000",
		"[LV 3]^777777 15 Cells Around the Target / Duration 240 sec ^000000",
	].join("\n");

	SkillDescription[SKID.AB_CHEAL] = [
		"Coluceo Heal",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 115+15*SkillLV ^000000",
		"Target:^777777 Ally / Self ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down:^777777 1*SkillLv sec ^000000",
		"Effect:^777777 Casts the skill 'Heal' on the target and any party members within a radius of that target. ^000000",
		"[LV 1]^777777 3 Cells Around the Target ^000000",
		"[LV 2]^777777 7 Cells Around the Target ^000000",
		"[LV 3]^777777 15 Cells Around the Target ^000000",
	].join("\n");

	SkillDescription[SKID.AB_EPICLESIS] = [
		"Epiclesis",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Summon ^000000",
		"SP Cost:^777777 300 ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 60 sec ^000000",
		"Duration:^777777 15+3*SkillLv sec ^000000",
		"Catalyst:^777777 1 Ancilla Stone, 1 Holy Water ^000000",
		"Effect:^777777 Summons a holy tree of life for a short period of time, resurrecting the dead and recovering HP/SP of all players nearby. Undead and Demon monsters that approach the tree receive holy damage. ^000000",
		"[LV 1]^777777 Holy Tree Stats: MAX HP +5%, HP Regen 300/s, SP Regen 2/s ^000000",
		"[LV 2]^777777 Holy Tree Stats: MAX HP +10%, HP Regen 350/s, SP Regen 3/s ^000000",
		"[LV 3]^777777 Holy Tree Stats: MAX HP +15%, HP Regen 400/s, SP Regen 4/s ^000000",
		"[LV 4]^777777 Holy Tree Stats: MAX HP +20%, HP Regen 450/s, SP Regen 5/s ^000000",
		"[LV 5]^777777 Holy Tree Stats: MAX HP +25%, HP Regen 500/s, SP Regen 6/s ^000000",
	].join("\n");

	SkillDescription[SKID.AB_PRAEFATIO] = [
		"Praefatio",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 50+10*SkillLV ^000000",
		"Target:^777777 Ally / Self ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 10+3*SkillLv sec ^000000",
		"Effect:^777777 All party members receive the protection of the skill 'Kyrie Eleison' from the caster. ^000000",
		"[LV 1]^777777 Hit Blocked 7 ^000000",
		"[LV 2]^777777 Hit Blocked 8 ^000000",
		"[LV 3]^777777 Hit Blocked 9 ^000000",
		"[LV 4]^777777 Hit Blocked 10 ^000000",
		"[LV 5]^777777 Hit Blocked 11 ^000000",
		"[LV 6]^777777 Hit Blocked 12 ^000000",
		"[LV 7]^777777 Hit Blocked 13 ^000000",
		"[LV 8]^777777 Hit Blocked 14 ^000000",
		"[LV 9]^777777 Hit Blocked 15 ^000000",
		"[LV 10]^777777 Hit Blocked 16 ^000000",
	].join("\n");

	SkillDescription[SKID.AB_ORATIO] = [
		"Oratio",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 32+3*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Effect:^777777 Decreases the holy attribute resistance of all enemies on screen. ^000000",
		"[LV 1]^777777 Success Rates 45%, Holy Attribute Resistance Reduction 2% ^000000",
		"[LV 2]^777777 Success Rates 50%, Holy Attribute Resistance Reduction 4% ^000000",
		"[LV 3]^777777 Success Rates 55%, Holy Attribute Resistance Reduction 6% ^000000",
		"[LV 4]^777777 Success Rates 60%, Holy Attribute Resistance Reduction 8% ^000000",
		"[LV 5]^777777 Success Rates 65%, Holy Attribute Resistance Reduction 10% ^000000",
		"[LV 6]^777777 Success Rates 70%, Holy Attribute Resistance Reduction 12% ^000000",
		"[LV 7]^777777 Success Rates 75%, Holy Attribute Resistance Reduction 14% ^000000",
		"[LV 8]^777777 Success Rates 80%, Holy Attribute Resistance Reduction 16% ^000000",
		"[LV 9]^777777 Success Rates 85%, Holy Attribute Resistance Reduction 18% ^000000",
		"[LV 10]^777777 Success Rates 90%, Holy Attribute Resistance Reduction 20% ^000000",
	].join("\n");

	SkillDescription[SKID.AB_LAUDAAGNUS] = [
		"Lauda Agnus",
		"Max Level:^777777 4 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 40+10*SkillLV ^000000",
		"Target:^777777 Ally / Self ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Duration:^777777 60 sec ^000000",
		"Cool Down:^777777 3 sec ^000000",
		"Effect:^777777 Cures status effects Freeze, Petrification, and Blind from all party members. Requires the user to be in a party. Additionally, it increases the caster's and party members' VIT.^000000",
		"[LV 1]^777777 Success Rates 50% ^000000",
		"[LV 2]^777777 Success Rates 60% ^000000",
		"[LV 3]^777777 Success Rates 70% ^000000",
		"[LV 4]^777777 Success Rates 80% ^000000",
	].join("\n");

	SkillDescription[SKID.AB_LAUDARAMUS] = [
		"Lauda Ramus",
		"Max Level:^777777 4 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 40+10*SkillLV ^000000",
		"Target:^777777 Ally / Self ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Duration:^777777 60 sec ^000000",
		"Cool Down:^777777 3 sec ^000000",
		"Effect:^777777 Cures status effects Sleep, Stun and Silence from all party members. Requires the user to be in a party.Additionally, it increases the caster's and party members' LUK.^000000",
		"[LV 1]^777777 Success Rates 50% ^000000",
		"[LV 2]^777777 Success Rates 60% ^000000",
		"[LV 3]^777777 Success Rates 70% ^000000",
		"[LV 4]^777777 Success Rates 80% ^000000",
	].join("\n");

	SkillDescription[SKID.AB_EUCHARISTICA] = [
		"Eucharistica",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Passive ^000000",
		"Target:^777777 Self ^000000",
		"Effect:^777777 Increases attack power and reduces damage when facing demon race and shadow property monsters. ^000000",
		"[LV 1]^777777 +1% ATK, +1% Resistance ^000000",
		"[LV 2]^777777 +2% ATK, +2% Resistance ^000000",
		"[LV 3]^777777 +3% ATK, +3% Resistance ^000000",
		"[LV 4]^777777 +4% ATK, +4% Resistance ^000000",
		"[LV 5]^777777 +5% ATK, +5% Resistance ^000000",
		"[LV 6]^777777 +6% ATK, +6% Resistance ^000000",
		"[LV 7]^777777 +7% ATK, +7% Resistance ^000000",
		"[LV 8]^777777 +8% ATK, +8% Resistance ^000000",
		"[LV 9]^777777 +9% ATK, +9% Resistance ^000000",
		"[LV 10]^777777 +10% ATK, +10% Resistance ^000000",
	].join("\n");

	SkillDescription[SKID.AB_RENOVATIO] = [
		"Renovatio",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 70 SkillLV ^000000",
		"Target:^777777 Ally / Self ^000000",
		"Cast Time:^777777 3 sec fixed ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Effect:^777777 Recovers 3% of max HP every 5 seconds. When used on undead monsters, it does high damage in proportion to the user's level. ^000000",
	].join("\n");

	SkillDescription[SKID.AB_HIGHNESSHEAL] = [
		"Higness Heal",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 40+20*SkillLV ^000000",
		"Target:^777777 Ally / Self ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 3*SkillLv sec ^000000",
		"Effect:^777777 Heals a target for much more than the normal 'Heal' skill. ^000000",
		"[LV 1]^777777 2.0 Times ^000000",
		"[LV 2]^777777 2.5 Times ^000000",
		"[LV 3]^777777 3.0 Times ^000000",
		"[LV 4]^777777 3.5 Times ^000000",
		"[LV 5]^777777 4.0 Times ^000000",
	].join("\n");

	SkillDescription[SKID.AB_CLEARANCE] = [
		"Clearance",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support / Offensive ^000000",
		"SP Cost:^777777 48+6*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 5 sec ^000000",
		"Cool Down:^777777 10 sec ^000000",
		"Effect:^777777 Affects all party members and enemies on screen and removes all of their buffs, debuffs, and status ailments. ^000000",
		"[LV 1]^777777 Success Rates 68% ^000000",
		"[LV 2]^777777 Success Rates 76% ^000000",
		"[LV 3]^777777 Success Rates 84% ^000000",
		"[LV 4]^777777 Success Rates 92% ^000000",
		"[LV 5]^777777 Success Rates 100% ^000000",
	].join("\n");

	SkillDescription[SKID.AB_EXPIATIO] = [
		"Expiatio",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 30+5*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Duration:^777777 30*SkillLV sec ^000000",
		"Effect:^777777 Infusing a weapon with holy power allows the target to bypass a portion of an enemies physical defense. ^000000",
		"[LV 1]^777777 Defense Bypassing 5% ^000000",
		"[LV 2]^777777 Defense Bypassing 10% ^000000",
		"[LV 3]^777777 Defense Bypassing 15% ^000000",
		"[LV 4]^777777 Defense Bypassing 20% ^000000",
		"[LV 5]^777777 Defense Bypassing 25% ^000000",
	].join("\n");

	SkillDescription[SKID.AB_DUPLELIGHT] = [
		"Duple Light",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 50+5*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 4 sec ^000000",
		"Duration:^777777 60+30*SkillLV sec ^000000",
		"Effect:^777777 Summons two holy lights which periodically assist while dealing melee damage. One light deals magical damage, and one deals physical damage. ^000000",
		"[LV 1]^777777 Holy Lights Stats: ATK 110% / MATK 220% ^000000",
		"[LV 2]^777777 Holy Lights Stats: ATK 120%/ MATK 240% ^000000",
		"[LV 3]^777777 Holy Lights Stats: ATK 130%/ MATK 260% ^000000",
		"[LV 4]^777777 Holy Lights Stats: ATK 140%/ MATK 280% ^000000",
		"[LV 5]^777777 Holy Lights Stats: ATK 150%/ MATK 300% ^000000",
		"[LV 6]^777777 Holy Lights Stats: ATK 160%/ MATK 320% ^000000",
		"[LV 7]^777777 Holy Lights Stats: ATK 170%/ MATK 340% ^000000",
		"[LV 8]^777777 Holy Lights Stats: ATK 180%/ MATK 360% ^000000",
		"[LV 9]^777777 Holy Lights Stats: ATK 190%/ MATK 380% ^000000",
		"[LV 10]^777777 Holy Lights Stats: ATK 200%/ MATK 400% ^000000",
	].join("\n");

	SkillDescription[SKID.AB_DUPLELIGHT_MELEE] = [

	].join("\n");

	SkillDescription[SKID.AB_DUPLELIGHT_MAGIC] = [

	].join("\n");

	SkillDescription[SKID.AB_SILENTIUM] = [
		"Silentium",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 20+4*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Effect:^777777 Strikes all enemies in range centered around your character with the skill 'Lex Divina'. ^000000",
		"[LV 1]^777777 6 Cells Around You ^000000",
		"[LV 2]^777777 7 Cells Around You ^000000",
		"[LV 3]^777777 8 Cells Around You ^000000",
		"[LV 4]^777777 9 Cells Around You ^000000",
		"[LV 5]^777777 10 Cells Around You ^000000",
	].join("\n");

	SkillDescription[SKID.WL_WHITEIMPRISON] = [
		"White Imprison",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support / Offensive ^000000",
		"SP Cost:^777777 45+5*SkillLV ^000000",
		"Target:^777777 Enemy / Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 10 sec ^000000",
		"Effect:^777777 Imprisons the target temporarily behind a white magic curtain, preventing them from moving. While in this state, the target cannot take damage other than ghost property skills. When White Imprison ends, the target takes a fixed amount of damage according to the skill level. The user can cast this skill on themself, but takes damage when released. Bosses are immune to this effect.^000000",
		"[LV 1]^777777 Success Rate 50% / Duration 10 seconds ^000000",
		"[LV 2]^777777 Success Rate 60% / Duration 12 seconds ^000000",
		"[LV 3]^777777 Success Rate 70% / Duration 14 seconds ^000000",
		"[LV 4]^777777 Success Rate 80% / Duration 16 seconds ^000000",
		"[LV 5]^777777 Success Rate 90% / Duration 18 seconds ^000000",
	].join("\n");

	SkillDescription[SKID.WL_SOULEXPANSION] = [
		"Soul Expansion",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 25+5*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 1.5 sec ^000000",
		"Cool Down:^777777 None ^000000",
		"Effect:^777777 Strikes a target at long distance with ghost element damage. If used against a player in White Imprison, the skill deals double damage. ^000000",
		"[LV 1]^777777 500% MATK ^000000",
		"[LV 2]^777777 600% MATK ^000000",
		"[LV 3]^777777 700% MATK ^000000",
		"[LV 4]^777777 800% MATK ^000000",
		"[LV 5]^777777 900% MATK ^000000",
	].join("\n");

	SkillDescription[SKID.WL_FROSTMISTY] = [
		"Frost Misty",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Debuff ^000000",
		"SP Cost:^777777 32+8*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 2.5 sec ^000000",
		"Cool Down:^777777 10 sec ^000000",
		"Effect:^777777 Damage all enemies in the screen and inflicting Freezing status to targets that enter.",
		"Targets caught with Freezing status have their defense, attack speed and movement speed lowered, and take longer to cast spells. ^000000",
		"[LV 1]^777777 Success Rate 30%, 300% MATK ^000000",
		"[LV 2]^777777 Success Rate 35%, 400% MATK ^000000",
		"[LV 3]^777777 Success Rate 40%, 500% MATK ^000000",
		"[LV 4]^777777 Success Rate 45%, 600% MATK ^000000",
		"[LV 5]^777777 Success Rate 50%, 700% MATK ^000000",
	].join("\n");

	SkillDescription[SKID.WL_JACKFROST] = [
		"Jack Frost",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 20+10*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 3.6 sec ^000000",
		"Effect:^777777 Deals water element damage to all targets in range. Deals +100% damage to targets afflicted with the Freezing status effect. ^000000",
		"[LV 1]^777777 600% MATK^000000",
		"[LV 2]^777777 700% MATK^000000",
		"[LV 3]^777777 800% MATK^000000",
		"[LV 4]^777777 900% MATK^000000",
		"[LV 5]^777777 1000% MATK^000000",
	].join("\n");

	SkillDescription[SKID.WL_MARSHOFABYSS] = [
		"Marsh Of Abyss",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Debuff ^000000",
		"SP Cost:^777777 38+2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 2.8 sec ^000000",
		"Duration:^777777 30 sec ^000000",
		"Effect:^777777 Curse a target with the marsh of abyss status, slowing their movement and decreasing their DEX/AGI. The stat reduction is only applied half on players. ^000000",
		"[LV 1]^777777 Move Speed -10% ^000000",
		"[LV 2]^777777 Move Speed -20% ^000000",
		"[LV 3]^777777 Move Speed -30% ^000000",
		"[LV 4]^777777 Move Speed -40% ^000000",
		"[LV 5]^777777 Move Speed -50% ^000000",
	].join("\n");

	SkillDescription[SKID.WL_RECOGNIZEDSPELL] = [
		"Recognized Spell",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Special Status ^000000",
		"SP Cost:^777777 40+10*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Duration:^777777 10 + 10*SkillLV sec ^000000",
		"Effect:^777777 By gaining a greater understanding of your magic, you can make all of your magic skills deal max damage. However, skills consume 25% more SP. ^000000",
		"[LV 1]^777777 Duration 20 sec ^000000",
		"[LV 2]^777777 Duration 30 sec ^000000",
		"[LV 3]^777777 Duration 40 sec ^000000",
		"[LV 4]^777777 Duration 50 sec ^000000",
		"[LV 5]^777777 Duration 60 sec ^000000",
	].join("\n");

	SkillDescription[SKID.WL_SIENNAEXECRATE] = [
		"Sienna Execrate",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 30+2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 1.5 sec ^000000",
		"Effect:^777777 Causes petrification status to a single target and all targets nearby. ^000000",
		"[LV 1]^777777 Success Rate 50%, Range 3x3 Cells ^000000",
		"[LV 2]^777777 Success Rate 55%, Range 5x5 Cells ^000000",
		"[LV 3]^777777 Success Rate 60%, Range 5x5 Cells ^000000",
		"[LV 4]^777777 Success Rate 65%, Range 7x7 Cells ^000000",
		"[LV 5]^777777 Success Rate 70%, Range 7x7 Cells ^000000",
	].join("\n");

	SkillDescription[SKID.WL_RADIUS] = [
		"Radius",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Passive ^000000",
		"Target:^777777 Enemy ^000000",
		"Effect:^777777 Increases the range of Warlock magic skills and decrease their casting time. ^000000",
		"[LV 1]^777777 Casting Range +1 Cells, Casting Times -4% ^000000",
		"[LV 2]^777777 Casting Range +2 Cells, Casting Times -6% ^000000",
		"[LV 3]^777777 Casting Range +3 Cells, Casting Times -8% ^000000",
	].join("\n");

	SkillDescription[SKID.WL_STASIS] = [
		"Stasis",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 50+20*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 4 sec ^000000",
		"Cool Down:^777777 170 + 10 * SkillLv sec ^000000",
		"Effect:^777777 Distorts the air around the caster, making it impossible for targets within its radius to cast magic. The duration is reduced by the target's DEX and VIT (Minimum duration 10 seconds).^000000",
		"[LV 1]^777777 Duration 20 sec / Range 19 x 19 Cells ^000000",
		"[LV 2]^777777 Duration 30 sec / Range 21 x 21 Cells  ^000000",
		"[LV 3]^777777 Duration 40 sec / Range 23 x 23 Cells  ^000000",
		"[LV 4]^777777 Duration 50 sec / Range 25 x 25 Cells  ^000000",
		"[LV 5]^777777 Duration 60 sec / Range 27 x 27 Cells  ^000000",
	].join("\n");

	SkillDescription[SKID.WL_DRAINLIFE] = [
		"Drain Life",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive / Support ^000000",
		"SP Cost:^777777 16+4*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 4 sec ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Effect:^777777 Strikes a single target with magical neutral property damage, and absorb some of that damage as HP. Additional damage increases depending on caster's INT.^000000",
		"[LV 1]^777777 200% MATK / Drain 10% / Success Rate 75% ^000000",
		"[LV 2]^777777 400% MATK / Drain 15% / Success Rate 80% ^000000",
		"[LV 3]^777777 600% MATK / Drain 20% / Success Rate 85% ^000000",
		"[LV 4]^777777 800% MATK / Drain 25% / Success Rate 90% ^000000",
		"[LV 5]^777777 1000% MATK / Drain 30% / Success Rate 95% ^000000",
	].join("\n");

	SkillDescription[SKID.WL_CRIMSONROCK] = [
		"Crimson Rock",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 50+10*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 6 sec ^000000",
		"Cool Down:^777777 5 sec ^000000",
		"Effect:^777777 Summons a huge meteorite on the target, striking all targets nearby. When the meteorite hits the ground it lets out a shock wave that throws enemies back and causes stun. ^000000",
		"[LV 1]^777777 1600% MATK ^000000",
		"[LV 2]^777777 1900% MATK ^000000",
		"[LV 3]^777777 2200% MATK ^000000",
		"[LV 4]^777777 2500% MATK ^000000",
		"[LV 5]^777777 2800% MATK ^000000",
	].join("\n");

	SkillDescription[SKID.WL_HELLINFERNO] = [
		"Hell Inferno",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 30+5*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 4 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Effect:^777777 Conjures the fires of hell to burn a target. The skill causes [Burning] status effect, which continually deals fire element damage over time. ^000000",
		"[LV 1]^777777 300% MATK (60% Fire, 240% Shadow)^000000",
		"[LV 2]^777777 600% MATK (120% Fire, 480% Shadow)^000000",
		"[LV 3]^777777 900% MATK (180% Fire, 720% Shadow)^000000",
		"[LV 4]^777777 1200% MATK (240% Fire, 960% Shadow)^000000",
		"[LV 5]^777777 1500% MATK (300% Fire, 1200% Shadow)^000000",
	].join("\n");

	SkillDescription[SKID.WL_COMET] = [
		"Comet",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 200+40*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 9.5 + 1.5 * SkillLv sec ^000000",
		"Cool Down:^777777 1800 sec ^000000",
		"Effect:^777777 Calls a comet from space to crash down into the ground dealing huge neutral element damage in a 15x15 radius. The skill causes Burning status effect, which continually deals fire element damage over time. Enemies closer to the center of the blast take increased damage. Requires two red gemstones to be cast except when two warlocks are together. ^000000",
		"[LV 1]^777777 1500% ~ 3000% MATK ^000000",
		"[LV 2]^777777 2000% ~ 3500% MATK ^000000",
		"[LV 3]^777777 2500% ~ 4000% MATK ^000000",
		"[LV 4]^777777 3000% ~ 4500% MATK ^000000",
		"[LV 5]^777777 3500% ~ 5000% MATK ^000000",
	].join("\n");

	SkillDescription[SKID.WL_CHAINLIGHTNING] = [
		"Chain Lightning",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 70+10*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Range:^777777 7 cells ^000000",
		"Cast Time:^777777 3 + 0.5 * SkillLv sec ^000000",
		"Effect:^777777 Deals wind element damage to a single target. When a target is struck by chain lightening, chain lightening will also chain to enemies near the target.",
		"Higher levels of the skill increase the amount of times it can chain. ^000000",
		"[LV 1]^777777 600% MATK / Hit 5 Times ^000000",
		"[LV 2]^777777 700% MATK / Hit 6 Times ^000000",
		"[LV 3]^777777 800% MATK / Hit 7 Times ^000000",
		"[LV 4]^777777 900% MATK / Hit 8 Times ^000000",
		"[LV 5]^777777 1000% MATK / Hit 9 Times ^000000",
	].join("\n");

	SkillDescription[SKID.WL_EARTHSTRAIN] = [
		"Earth Strain",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 62+8*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 2 + SkillLv sec ^000000",
		"Cool Down:^777777 10 sec ^000000",
		"Effect:^777777 Causes the earth near you to shake and shoot up from below, dealing damage to those in range. The shaking caused by the skill can cause players to lose their weapon and helm. ^000000",
		"[LV 1]^777777 2100% MATK, Success Strip 6% ^000000",
		"[LV 2]^777777 2200% MATK, Success Strip 14% ^000000",
		"[LV 3]^777777 2300% MATK, Success Strip 24% ^000000",
		"[LV 4]^777777 2400% MATK, Success Strip 36% ^000000",
		"[LV 5]^777777 2500% MATK, Success Strip 50% ^000000",
	].join("\n");

	SkillDescription[SKID.WL_TETRAVORTEX] = [
		"Tetra Vortex",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 90+30*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 5 + SkillLv ^000000",
		"Cool Down:^777777 15 sec ^000000",
		"Effect:^777777 Summons ether in the 4 elements, to deal magic damage of each element. Tetra Vortex requires you to have summoned one Fire Ball, Water Ball, Ball Lightening, and Stone before casting or the skill will fail.",
		"Targets struck by Tetra Vortex will receive one status effect from Burning, Freezing, Stun, and Bleeding status ailments. ^000000",
		"[LV 1]^777777 1000% * 4 hits MATK ^000000",
		"[LV 2]^777777 1500% * 4 hits MATK ^000000",
		"[LV 3]^777777 2000% * 4 hits MATK ^000000",
		"[LV 4]^777777 2500% * 4 hits MATK ^000000",
		"[LV 5]^777777 3000% * 4 hits MATK ^000000",
	].join("\n");

	SkillDescription[SKID.WL_SUMMONFB] = [
		"Summon Fire Ball",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 8+2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Duration:^777777 20+10*SkillLV sec ^000000",
		"Effect:^777777 Summons a ball of fire near the caster that explodes when touched. Higher skill level increases the number of balls that can be summoned at once. Maintaining the fire balls drains SP over time. ^000000",
		"[LV 1]^777777 100% MATK, Max Ball 1 ^000000",
		"[LV 2]^777777 150% MATK, Max Ball 2 ^000000",
		"[LV 3]^777777 200% MATK, Max Ball 3 ^000000",
		"[LV 4]^777777 250% MATK, Max Ball 4 ^000000",
		"[LV 5]^777777 300% MATK, Max Ball 5 ^000000",
	].join("\n");

	SkillDescription[SKID.WL_SUMMONBL] = [
		"Summon Lightning Ball",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 8+2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Duration:^777777 20+10*SkillLV sec ^000000",
		"Effect:^777777 Summons a ball of lightning near the caster that explodes when touched. Higher skill level increases the number of balls that can be summoned at once. Maintaining the ball lightening drains SP over time. ^000000",
		"[LV 1]^777777 100% MATK, Max Ball 1 ^000000",
		"[LV 2]^777777 150% MATK, Max Ball 2 ^000000",
		"[LV 3]^777777 200% MATK, Max Ball 3 ^000000",
		"[LV 4]^777777 250% MATK, Max Ball 4 ^000000",
		"[LV 5]^777777 300% MATK, Max Ball 5 ^000000",
	].join("\n");

	SkillDescription[SKID.WL_SUMMONWB] = [
		"Summon Water Ball",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 8+2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Duration:^777777 20+10*SkillLV sec ^000000",
		"Effect:^777777 Summons a ball of water near the caster that explodes when touched. Higher skill level increases the number of balls that can be summoned at once. Maintaining the water balls drains SP over time. ^000000",
		"[LV 1]^777777 100% MATK, Max Ball 1 ^000000",
		"[LV 2]^777777 150% MATK, Max Ball 2 ^000000",
		"[LV 3]^777777 200% MATK, Max Ball 3 ^000000",
		"[LV 4]^777777 250% MATK, Max Ball 4 ^000000",
		"[LV 5]^777777 300% MATK, Max Ball 5 ^000000",
	].join("\n");

	SkillDescription[SKID.WL_SUMMONSTONE] = [
		"Summon Stone",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 8+2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Duration:^777777 20+10*SkillLV sec ^000000",
		"Effect:^777777 Summons a magic stone near the caster that explodes when touched. Higher skill level increases the number of stones that can be summoned at once. Maintaining the stone drains SP over time. ^000000",
		"[LV 1]^777777 100% MATK, Max Ball 1 ^000000",
		"[LV 2]^777777 150% MATK, Max Ball 2 ^000000",
		"[LV 3]^777777 200% MATK, Max Ball 3 ^000000",
		"[LV 4]^777777 250% MATK, Max Ball 4 ^000000",
		"[LV 5]^777777 300% MATK, Max Ball 5 ^000000",
	].join("\n");

	SkillDescription[SKID.WL_RELEASE] = [
		"Release",
		"Max Level:^777777 2 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 3 SP (LV1), 20 SP (LV2) ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Duration:^777777 20+10*SkillLV sec ^000000",
		"Effect:^777777 Throws your active Fire Ball / Ball Lightening / Water Ball / Stone that you currently have summoned to deal damage to a single target. ^000000",
		"[LV 1]^777777 Throws a single magic stone at the target ^000000",
		"[LV 2]^777777 Throws all remaining magic stones at the target. ^000000",
	].join("\n");

	SkillDescription[SKID.WL_READING_SB] = [
		"Reading Spellbook",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Active / Special ^000000",
		"SP Cost:^777777 3 (LV1), 20 (LV2) ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 4.5 sec ^000000",
		"Cool Down:^777777 5 sec ^000000",
		"Effect:^777777 Learning Magic Books by reading them previously and seal them up. Warlocks may use the skill Release to let out the sealed spells. Reading Magic Books that contain skills not learned does not work. ^000000",
	].join("\n");

	SkillDescription[SKID.WL_FREEZE_SP] = [
		"Freezing Spell",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Passive ^000000",
		"Effect:^777777 Increase the amount of spells and number of times that may be used. When the spells are frozen, SP depletes according to the amount of spells and number of times it's frozen. ^000000",
	].join("\n");

	SkillDescription[SKID.RA_ARROWSTORM] = [
		"Arrow Storm",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 28+2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 3 sec ^000000",
		"Effect:^777777 Fires a storm of arrows on a designated target and all enemies around within the range will be hit. Consumes 10 arrows. Ranger's Base Level increases the damage.^000000",
		"[LV 1]^777777 1080% ATK / Area 7x7 cells ^000000",
		"[LV 2]^777777 1160% ATK / Area 7x7 cells  ^000000",
		"[LV 3]^777777 1240% ATK / Area 7x7 cells  ^000000",
		"[LV 4]^777777 1320% ATK / Area 7x7 cells  ^000000",
		"[LV 5]^777777 1400% ATK / Area 7x7 cells  ^000000",
		"[LV 6]^777777 1480% ATK / Area 9x9 cells  ^000000",
		"[LV 7]^777777 1560% ATK / Area 9x9 cells  ^000000",
		"[LV 8]^777777 1640% ATK / Area 9x9 cells  ^000000",
		"[LV 9]^777777 1720% ATK / Area 9x9 cells  ^000000",
		"[LV 10]^777777 1800% ATK / Area 11x11 cells  ^000000",
	].join("\n");

	SkillDescription[SKID.RA_FEARBREEZE] = [
		"Fear Breeze",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 32+4*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Duration:^777777 30+30*SkillLV sec ^000000",
		"Effect:^777777 During the duration has a chance of increasing the number of attacks. When you deal additional hits, it consumes additional arrows. ^000000",
		"[LV 1]^777777 Number of Attack +1, Success Rate 12% ^000000",
		"[LV 2]^777777 Number of Attack +1, Success Rate 12% ^000000",
		"[LV 3]^777777 Number of Attack +1~2, Success Rate 21% ^000000",
		"[LV 4]^777777 Number of Attack +1~3, Success Rate 27% ^000000",
		"[LV 5]^777777 Number of Attack +1~4, Success Rate 30% ^000000",
	].join("\n");

	SkillDescription[SKID.RA_RANGERMAIN] = [
		"Ranger Main",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Passive ^000000",
		"Target:^777777 Self ^000000",
		"Effect:^777777 When fighting Brute, Plant, and Fish type monsters, increases your attack power and decreases received damage. ^000000",
		"[LV 1]^777777 +5, ATK, +5 DEF ^000000",
		"[LV 2]^777777 +10 ATK, +10 DEF ^000000",
		"[LV 3]^777777 +15 ATK, +15 DEF ^000000",
		"[LV 4]^777777 +20 ATK, +20 DEF ^000000",
		"[LV 5]^777777 +25 ATK, +25 DEF ^000000",
		"[LV 6]^777777 +30 ATK, +30 DEF ^000000",
		"[LV 7]^777777 +35 ATK, +35 DEF ^000000",
		"[LV 8]^777777 +40 ATK, +40 DEF ^000000",
		"[LV 9]^777777 +45 ATK, +45 DEF ^000000",
		"[LV 10]^777777 +50 ATK, +50 DEF ^000000",
	].join("\n");

	SkillDescription[SKID.RA_AIMEDBOLT] = [
		"Aimed Bolt",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 28+2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 5 sec ^000000",
		"Effect:^777777 When used against an immobile status target (Ankle Snare, Electric Shocker, Warg Bite effect), deals a huge amount of damage.",
		"Deals additional damage based on the size of the target. The skill will fail if you do not have enough arrows. Using this skill cancels the immobile status. ^000000",
		"[LV 1]^777777 550% ATK, Hit 2 Small Size, 3 Medium Size, 4 Big Size ^000000",
		"[LV 2]^777777 600% ATK, Hit 2 Small Size, 3 Medium Size, 4 Big Size ^000000",
		"[LV 3]^777777 650% ATK, Hit 2 Small Size, 3 Medium Size, 4 Big Size ^000000",
		"[LV 4]^777777 700% ATK, Hit 2 Small Size, 3 Medium Size, 4 Big Size ^000000",
		"[LV 5]^777777 750% ATK, Hit 2 Small Size, 3 Medium Size, 4 Big Size ^000000",
		"[LV 6]^777777 800% ATK, Hit 2 Small Size, 3 Medium Size, 4 Big Size ^000000",
		"[LV 7]^777777 850% ATK, Hit 2 Small Size, 3 Medium Size, 4 Big Size ^000000",
		"[LV 8]^777777 900% ATK, Hit 2 Small Size, 3 Medium Size, 4 Big Size ^000000",
		"[LV 9]^777777 950% ATK, Hit 2 Small Size, 3 Medium Size, 4 Big Size ^000000",
		"[LV 10]^777777 1000% ATK, Hit 2 Small Size, 3 Medium Size, 4 Big Size ^000000",
	].join("\n");

	SkillDescription[SKID.RA_DETONATOR] = [
		"Detonator",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Active ^000000",
		"Target:^777777 Enemy ^000000",
		"SP Cost:^777777 15 ^000000",
		"Effect:^777777 Immediately activates a trap on the ground. The trap has an area of effect of 7x7 cells around the trap. It can be used with both Hunter and Ranger traps.",
		"However, you cannot detonate traps of another player. ^000000",
	].join("\n");

	SkillDescription[SKID.RA_ELECTRICSHOCKER] = [
		"Electric Shocker",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 35 ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Duration:^777777 18+2*SkillLv sec ^000000",
		"Effect:^777777 Like Ankle Snare causes immobile status while at the same time draining the targets SP. Electric Shocker cannot be removed with the hunter skill remove trap. To place you need 1 Special Alloy Trap. ^000000",
		"[LV 1]^777777 SP Drain 5%/sec ^000000",
		"[LV 2]^777777 SP Drain 10%/sec ^000000",
		"[LV 3]^777777 SP Drain 15%/sec ^000000",
		"[LV 4]^777777 SP Drain 20%/sec ^000000",
		"[LV 5]^777777 SP Drain 25%/sec ^000000",
	].join("\n");

	SkillDescription[SKID.RA_CLUSTERBOMB] = [
		"Cluster Bomb",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 35 ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Duration:^777777 15 sec ^000000",
		"Effect:^777777 A maximum of 3 traps can be placed at once. The trap detonates in an area 3 cells in front (away from the trap layer) and a width of 5 cells.",
		"The trap can be detonated via Detonator. Cluster Bomb cannot be removed by the hunter skill [Remove Trap]. Placing a cluster bomb consumes 1 special alloy trap. ^000000",
		"[LV 1]^777777 Damage Power +100% ^000000",
		"[LV 2]^777777 Damage Power +200% ^000000",
		"[LV 3]^777777 Damage Power +300% ^000000",
		"[LV 4]^777777 Damage Power +400% ^000000",
		"[LV 5]^777777 Damage Power +500% ^000000",
	].join("\n");

	SkillDescription[SKID.RA_WUGMASTERY] = [
		"Warg Mastery",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 5 ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Effect:^777777 Allows you to summon a loyal 'Warg' wolf using a special wolf flute. In order to summon a warg you need to have the item [Wolf Flute].",
		"Re-using the skill returns the Warg to the wild. ^000000",
	].join("\n");

	SkillDescription[SKID.RA_WUGRIDER] = [
		"Warg Rider",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 20 ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 Allows a Ranger to mount their summoned Warg. Skill level increases your movement speed.",
		"While mounted a warg, you can't use any bow attacks or skills except for Traps and Warg exclusive skills. ^000000",
	].join("\n");

	SkillDescription[SKID.RA_WUGDASH] = [
		"Warg Dash",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 40 ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 Usable only when mounted on your Warg. Your warg runs in a straight line, and re-using the skill stops. You will automatically stop when hitting a wall or enemy. ",
		"If you learn Warg Strike, you'll deal damage when running into the enemy. ^000000",
	].join("\n");

	SkillDescription[SKID.RA_WUGSTRIKE] = [
		"Warg Strike",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 28+2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 The warg deals damage to a single target. Skill level increases the damage. Can't be used while mounted on the Warg. ^000000",
		"[LV 1]^777777 +200% ATK ^000000",
		"[LV 2]^777777 +400% ATK ^000000",
		"[LV 3]^777777 +600% ATK ^000000",
		"[LV 4]^777777 +800% ATK ^000000",
		"[LV 5]^777777 +1000% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.RA_WUGBITE] = [
		"Warg Bite",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 40+2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 The warg leaps at a target, dealing damage and temporarially causing immibile status. Can't be used while mounted on the Warg.",
		"Success rate varies depending on the targets AGI^000000",
		"[LV 1]^777777 +600% ATK / Duration 1 second + Tooth Of Warg Bonus ^000000",
		"[LV 2]^777777 +800% ATK / Duration 2 seconds + Tooth Of Warg Bonus ^000000",
		"[LV 3]^777777 +1000% ATK / Duration 3 seconds + Tooth Of Warg Bonus ^000000",
		"[LV 4]^777777 +1200% ATK / Duration 4 seconds + Tooth Of Warg Bonus ^000000",
		"[LV 5]^777777 +1500% ATK / Duration 5 seconds + Tooth Of Warg Bonus ^000000",
	].join("\n");

	SkillDescription[SKID.RA_TOOTHOFWUG] = [
		"Tooth Of Warg",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Passive ^000000",
		"Effect:^777777 Increases wolf damage and effect of wolf skills. Increased skill level increases damage. ^000000",
		"[LV 1]^777777 +30 ATK ^000000",
		"[LV 2]^777777 +60 ATK ^000000",
		"[LV 3]^777777 +90 ATK ^000000",
		"[LV 4]^777777 +120 ATK ^000000",
		"[LV 5]^777777 +150 ATK ^000000",
		"[LV 6]^777777 +180 ATK ^000000",
		"[LV 7]^777777 +210 ATK ^000000",
		"[LV 8]^777777 +240 ATK ^000000",
		"[LV 9]^777777 +270 ATK ^000000",
		"[LV 10]^777777 +300 ATK ^000000",
	].join("\n");

	SkillDescription[SKID.RA_SENSITIVEKEEN] = [
		"Sensitive Keen",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 24 ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 The wolf uses his sense of danger to reveal hidden traps and players in a 7x7 area around the caster and deals damage. There's a chance to cast Warg Bite on targets in range.000000",
		"[LV 1]^777777 +150% ATK, Warg Bite Success 8% ^000000",
		"[LV 2]^777777 +200% ATK, Warg Bite Success 16% ^000000",
		"[LV 3]^777777 +250% ATK, Warg Bite Success 24% ^000000",
		"[LV 4]^777777 +300% ATK, Warg Bite Success 32% ^000000",
		"[LV 5]^777777 +350% ATK, Warg Bite Success 40% ^000000",
	].join("\n");

	SkillDescription[SKID.RA_CAMOUFLAGE] = [
		"Camouflage",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 28+2*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 Hide yourself from view of monsters while standing near walls and obstacles.",
		"Your character will appear transparant. While in camouflage status your critical chance and attack power is increased, but decreases your defense.",
		"When camouflage status ends your attack power, critical, and defense returns to normal. Until you re-use the skill to cancel its effect, it will continaully drain SP.",
		"With high enough level you can use the skill without being near an obstacle. ^000000",
		//[New Untranslated Desc] Effect: ''''''  '''̳' '''ֹ' ''ó'' '''' '''', 'Ǹ'/'''''''' '''''' '''''Ϳ''' '߰''''' 'ʵ''' 'Ѵ'. '''''ִ' '''''' '''' '''''''ϰ' ''''''''. '''' '''''' '''''ϰ' 'ִ' '''' ũ''Ƽ'' Ȯ'''' '''ݷ''' '''''''''', 'ݴ''' '''''''' '''''Ѵ'. '''' '''' '''¿''' '''''Ǹ' '''ݷ°' ũ''Ƽ'' Ȯ'', '''''''' '''''''' '''ư'''. ī'''ö''' '''¿''' '''''̳' ''ų'' '''''ϸ' '''' '''' '''°' '''''ȴ'. '''' '''' '''' '''ȿ''' '''''''''' SP '' 'Ҹ''Ѵ'. '''''' '''''' '''ֹ' ''ó'' 'ƴ϶''' '''' '''''' '''''' '' 'ִ'. 
		"[LV 1]^777777 6 SP per Sec / Can't Move ^000000",
		"[LV 2]^777777 5 SP per Sec / Can't Move ^000000",
		"[LV 3]^777777 4 SP per Sec / 50% Move Speed ^000000",
		"[LV 4]^777777 3 SP per Sec / 75% Move Speed ^000000",
		"[LV 5]^777777 2 SP per Sec / 100% Move Speed ^000000",
	].join("\n");

	SkillDescription[SKID.RA_RESEARCHTRAP] = [
		"Research Trap",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Passive ^000000",
		"Target:^777777 Self ^000000",
		"Effect:^777777 Increases damage with Hunter and Ranger trap damage, and increases INT and SP. ^000000",
		"[LV 1]^777777 Additional Damage +40, INT +1, MAX SP +220 ^000000",
		"[LV 2]^777777 Additional Damage +80, INT +2, MAX SP +240 ^000000",
		"[LV 3]^777777 Additional Damage +120, INT +3, MAX SP +260 ^000000",
		"[LV 4]^777777 Additional Damage +160, INT +4, MAX SP +280 ^000000",
		"[LV 5]^777777 Additional Damage +200, INT +5, MAX SP +300 ^000000",
	].join("\n");

	SkillDescription[SKID.RA_MAGENTATRAP] = [
		"Magenta Trap",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 15 ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 A maximum of 1 trap can be placed at once. Permanently changes the monster that steps on this trap and any monster in a 5x5 area around this trap to Fire Element. Does not affect boss type monsters or players, and consumes 1 Red Blood and 1 Special Alloy Trap.000000",
	].join("\n");

	SkillDescription[SKID.RA_COBALTTRAP] = [
		"Cobalt Trap",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 15 ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 A maximum of 1 trap can be placed at once. Permanently changes the monster that steps on this trap and any monster in a 5x5 area around this trap to Water Element. Does not affect boss type monsters or players, and consumes 1 Crystal Blue and 1 Special Alloy Trap. 000000",
	].join("\n");

	SkillDescription[SKID.RA_MAIZETRAP] = [
		"Maize Trap",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 ??+??*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 A maximum of 1 trap can be placed at once. Permanently changes the monster that steps on this trap and any monster in a 5x5 area around this trap to Earth Element. Does not affect boss type monsters or players, and consumes 1 Green Live and 1 Special Alloy Trap.000000",
	].join("\n");

	SkillDescription[SKID.RA_VERDURETRAP] = [
		"Verdure Trap",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 15 ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 A maximum of 1 trap can be placed at once. Permanently changes the monster that steps on this trap and any monster in a 5x5 area around this trap to Wind Element. Does not affect boss type monsters or players, and consumes 1 Wind of Verdure and 1 Special Alloy Trap.000000",
	].join("\n");

	SkillDescription[SKID.RA_FIRINGTRAP] = [
		"Firing Trap",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Duration:^777777 18 sec ^000000",
		"Max Placement:^777777 2^000000",
		"Effect:^777777 When the trap activates it deals damage in a 3x3 area and causes [Burning] status. Increased skill level increases the chance to status. To use the skill you need 1 Special Alloy Trap. ^000000",
		"[LV 1]^777777 Success Rate 60% ^000000",
		"[LV 2]^777777 Success Rate 70% ^000000",
		"[LV 3]^777777 Success Rate 80% ^000000",
		"[LV 4]^777777 Success Rate 90% ^000000",
		"[LV 5]^777777 Success Rate 100% ^000000",
	].join("\n");

	SkillDescription[SKID.RA_ICEBOUNDTRAP] = [
		"Ice Bound Trap",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Max Placement:^777777 2^000000",
		"Effect:^777777 When the trap activates it deals damage in a 3x3 area and causes [Freezing] status. Increased skill level increases the chance to status. To use the skill you need 1 Special Alloy Trap. ^000000",
		"[LV 1]^777777 Success Rate 60% ^000000",
		"[LV 2]^777777 Success Rate 70% ^000000",
		"[LV 3]^777777 Success Rate 80% ^000000",
		"[LV 4]^777777 Success Rate 90% ^000000",
		"[LV 5]^777777 Success Rate 100% ^000000",
	].join("\n");

	SkillDescription[SKID.NC_MADOLICENCE] = [
		"Magic Gear License",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Passive ^000000",
		"Effect:^777777 Learn the basics of operating a Magic Gear. Your attack power improves, but without the license your movement speed is 1/2. ^000000",
		"[LV 1]^777777 +15 ATK, Move Speed -40% ^000000",
		"[LV 2]^777777 +30 ATK, Move Speed -30% ^000000",
		"[LV 3]^777777 +45 ATK, Move Speed -20% ^000000",
		"[LV 4]^777777 +60 ATK, Move Speed -10% ^000000",
		"[LV 5]^777777 +75 ATK, Normal Move Speed ^000000",
	].join("\n");

	SkillDescription[SKID.NC_BOOSTKNUCKLE] = [
		"Boost Knuckle",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 5+5*SkillLV ^000000",
		"Cast Time:^777777 0.5 sec ^000000",
		"Effect:^777777 Using the Magic Gear basic equipment, fire's a rocket punch at an enemy at long range. Max range 11 cells. ^000000",
		"[LV 1]^777777 300% ATK ^000000",
		"[LV 2]^777777 400% ATK ^000000",
		"[LV 3]^777777 500% ATK ^000000",
		"[LV 4]^777777 600% ATK ^000000",
		"[LV 5]^777777 700% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.NC_PILEBUNKER] = [
		"Pile Bunker",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 50 ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 5 sec ^000000",
		"Effect:^777777 Attacks the enemy with deadly drills to inflict damage and cancel defensive magic. Requires the Pile Bunker to be equipped. Range 3 cells.^000000",
		"[LV 1]^777777 Debuff chance 40% ^000000",
		"[LV 2]^777777 Debuff chance 55% ^000000",
		"[LV 3]^777777 Debuff chance 70% ^000000",
	].join("\n");

	SkillDescription[SKID.NC_VULCANARM] = [
		"Vulcan Arm",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 2 ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Catalyst:^777777 1 Vulcan Bullet ^000000",
		"Effect:^777777 Using the basic Magic Gear equipment, fires rapid fire at a target at long range. Using the skill consumes. ^000000",
		"[LV 1]^777777  Range 3 x 3 cells / 70% MATK ^000000",
		"[LV 2]^777777  Range 3 x 3 cells / 140% MATK ^000000",
		"[LV 3]^777777  Range 3 x 3 cells / 210% MATK ^000000",
	].join("\n");

	SkillDescription[SKID.NC_FLAMELAUNCHER] = [
		"Flame Launcher",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 20 ^000000",
		"Cast Time:^777777 1.2+0.4*SkillLv sec^000000",
		"Cool Down:^777777 0.5*SkillLv sec^000000",
		"Effect:^777777 Deals fire property damage to all enemies in range. May inflict Burning status. ^000000",
		"[LV 1]^777777 600% ATK / Burning Rate 30% ^000000",
		"[LV 2]^777777 900% ATK/  Burning Rate 40% ^000000",
		"[LV 3]^777777 1200% ATK / Burning Rate 50% ^000000",
	].join("\n");

	SkillDescription[SKID.NC_COLDSLOWER] = [
		"Cold Slower",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 40 ^000000",
		"Cast Time:^777777 1 sec (cannot be interrupted) ^000000",
		"Cool Down:^777777 1*SkillLv sec^000000",
		"Catalyst:^777777  1 Liquid Condensed Bullet and 1 Magic Gear Fuel^000000",
		"Effect:^777777 Deals water property damage to all enemies in range. May inflict Freezing/Frozen status. ^000000",
		"[LV 1]^777777 600% ATK / Range 5 x 5 cells^000000",
		"[LV 2]^777777 900% ATK / Range 7 x 7 cells^000000",
		"[LV 3]^777777 1200% ATK / Range 9 x 9 cells^000000",
	].join("\n");

	SkillDescription[SKID.NC_ARMSCANNON] = [
		"Arms Cannon",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 50 ^000000",
		"Cast Time:^777777 1.2+0.2*SkillLv sec^000000",
		"Cool Down:^777777 0.5*SkillLv sec^000000",
		"Catalyst:^777777 1 Magic Gear Fuel, 1 Cannon Ball ^000000",
		"Effect:^777777 Using the magic gears basic equipment, fires a large cannon ball dealing blast damage around the target. Deals lower damage on larger targets. Uses the attribute of the cannon ball equipped. ^000000",
		"[LV 1]^777777 700~600~500% ATK, Area 7x7 ^000000",
		"[LV 2]^777777 1200~1000~800% ATK, Area 5x5 ^000000",
		"[LV 3]^777777 1500~1400~1100% ATK, Area 3x3 ^000000",
		
		"Cannon Ball Descriptions:",
		"- Cannon Ball = Attribute 'None', ATK 100, Weight 1, Price 100z",
		"- Holy Cannon Ball = Attribute 'Holy', ATK 120, Weight 1, Price 200z",
		"- Iron Cannon Ball = Attribute 'Neutral', ATK 250, Weight 1, Price 200z",
		"- Dark Cannon Ball = Attribute 'Shadow', ATK 120, Weight 1, Price 200z",
		"- Soul Cannon Ball = Attribute 'Spiritual (Ghost), ATK 120, Weight 1, Price 500z",
	].join("\n");

	SkillDescription[SKID.NC_ACCELERATION] = [
		"Acceleration",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 20*SkillLV ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Duration:^777777 30*SkillLV sec ^000000",
		"Effect:^777777 Temporarily increases the movement speed of the Magic Gear. Requires the Magic Gear equipment Accelerator equipped and consumes 1 Magic Gear Fuel. ^000000",
	].join("\n");

	SkillDescription[SKID.NC_HOVERING] = [
		"Hovering",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 25 ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Duration:^777777 30 sec ^000000",
		"Catalyst:^777777 1 Magic Gear Fuel ^000000",
		"Effect:^777777 The magic gear hovers off the ground, allowing it to move over traps and ground targeted skills without effect. Slightly increases movement speed. Requires the magic gear equipment Hovering Booster equipped and consumes 1 Magic Gear Fuel. ^000000",
	].join("\n");

	SkillDescription[SKID.NC_F_SIDESLIDE] = [
		"Front Side Slide",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 5 ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Catalyst:^777777 1 Magic Gear Fuel ^000000",
		"Effect:^777777 While hovering, rapidly moves forwards 7 cells. ^000000",
	].join("\n");

	SkillDescription[SKID.NC_B_SIDESLIDE] = [
		"Back Side Slide",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 5 ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Catalyst:^777777 1 Magic Gear Fuel ^000000",
		"Effect:^777777 While hovering, rapidly moves back 7 cells. ^000000",
	].join("\n");

	SkillDescription[SKID.NC_MAINFRAME] = [
		"Mainframe Restructure",
		"Max Level:^777777 4 ^000000",
		"Type:^777777 Passive ^000000",
		"Effect:^777777 Restructures the magic gear body to be more defensive and add over-heat limit. Overheating causes the Magic Gear to take continuous damage over time. Overheat limit increases the point at which the gear will Overheat. ^000000",
		"[LV 1]^777777 +4 DEF, Overheat Limit +10 ^000000",
		"[LV 2]^777777 +7 DEF, Overheat Limit +18 ^000000",
		"[LV 3]^777777 +11 DEF, Overheat Limit +36 ^000000",
		"[LV 4]^777777 +15 DEF, Overheat Limit +56 ^000000",
	].join("\n");

	SkillDescription[SKID.NC_SELFDESTRUCTION] = [
		"Self Destruction",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 5 ^000000",
		"Cast Time:^777777 2.5*SkillLv sec (cannot be interrupted) ^000000",
		"Effect:^777777 Detonates the magic gear, dealing large damage in a wide radius. When using the skill, you lose magic gear status, and your SP is completely consumed. ^000000",
		"[LV 1]^777777 Range 5x5 ^000000",
		"[LV 2]^777777 Range 7x7 ^000000",
		"[LV 3]^777777 Range 9x9 ^000000",
	].join("\n");

	SkillDescription[SKID.NC_SHAPESHIFT] = [
		"Shape Shift",
		"Max Level:^777777 4 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 100 ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Duration:^777777 5 minutes ^000000",
		"Catalyst:^777777 2 Magic Gear Fuel ^000000",
		"Effect:^777777 Changes the Madogear's armor's elemental property. The stone used to cast the spell determines the new elemental property. ^000000",
		"[LV 1]^777777 Attribute Change Fire / Consumes 3 Red Blood^000000",
		"[LV 2]^777777 Attribute Change Earth / Consumes 3 Green Live^000000",
		"[LV 3]^777777 Attribute Change Wind / Consumes 3 Wind of Verdure^000000",
		"[LV 4]^777777 Attribute Change Water / Consumes 3 Crystal Blue^000000",
	].join("\n");

	SkillDescription[SKID.NC_EMERGENCYCOOL] = [
		"Emergency Cool",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 20 ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Catalyst:^777777 2 Magic Gear Fuel ^000000",
		"Effect:^777777 Rapidly cools the magic gear removing overheat status. Requires the magic gear equipment Cooling System equipped. ^000000",
	].join("\n");

	SkillDescription[SKID.NC_INFRAREDSCAN] = [
		"Infrared Scan",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 45 ^000000",
		"Cast Time:^777777 1 sec Fixed ^000000",
		"Cool Down:^777777 15 sec ^000000",
		"Effect:^777777 Detects all targets in a 15 x 15 targets around you and has a 50% chance to drop their evasion rate. ^000000",
	].join("\n");

	SkillDescription[SKID.NC_ANALYZE] = [
		"Analyze",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 30 ^000000",
		"Cast Time:^777777 1 sec Fixed ^000000",
		"Duration:^777777 20 sec ^000000",
		"Catalyst:^777777 1 Magic Gear Fuel ^000000",
		"Effect:^777777 Scans a target for weaknesses, reducing their effective physical and magical defense. Range 7 cells. ^000000",
		"[LV 1]^777777 -14% DEF / MDEF ^000000",
		"[LV 2]^777777 -28% DEF / MDEF ^000000",
		"[LV 3]^777777 -42% DEF / MDEF ^000000",
	].join("\n");

	SkillDescription[SKID.NC_MAGNETICFIELD] = [
		"Magnetic Field",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 90 ^000000",
		"Cast Time:^777777 0.5*SkillLv sec Fixed ^000000",
		"Cool Down:^777777 5 minutes ^000000",
		"Duration:^777777 15 sec ^000000",
		"Catalyst:^777777 3 Magic Gear Fuel ^000000",
		"Effect:^777777 Creates a strong magnetic field around you, preventing all enemies from moving. The effect doesn't work if you or the enemy are in hovering status.",
		"Maintaining the magnetic field rapidly drains your SP. Requires the magic gear equipment Magnetic Field Generator equipped. ^000000",
		"[LV 1]^777777 Radius 3x3 ^000000",
		"[LV 2]^777777 Radius 5x5 ^000000",
		"[LV 3]^777777 Radius 7x7 ^000000",
	].join("\n");

	SkillDescription[SKID.NC_NEUTRALBARRIER] = [
		"Neutral Barrier",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 90 ^000000",
		"Cast Time:^777777 0.5*SkillLv sec Fixed ^000000",
		"Cool Down:^777777 2 minutes ^000000",
		"Duration:^777777 15+15*SkillLV ^000000",
		"Catalyst:^777777 1 Magic Gear Fuel ^000000",
		"Effect:^777777 Creates a strong energy barrier around you, reducing physical and magic damage to those in its radius, but does not reduce long range attacks.",
		"Requires the magic gear equipment Barrier Generator equipped. ^000000",
		"[LV 1]^777777 Radius 3x3, +15% DEF / MDEF ^000000",
		"[LV 2]^777777 Radius 3x3, +20% DEF / MDEF ^000000",
		"[LV 3]^777777 Radius 3x3, +25% DEF / MDEF ^000000",
	].join("\n");

	SkillDescription[SKID.NC_STEALTHFIELD] = [
		"Stealth Field",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 50+50*SkillLV ^000000",
		"Cast Time:^777777 0.5*SkillLv sec Fixed ^000000",
		"Duration:^777777 10+5*SkillLV ^000000",
		"Catalyst:^777777 2 Magic Gear Fuel ^000000",
		"Effect:^777777 Generates a energy field around you, cloaking all allies in its radius. Allies that are cloaked appear semi-transparent and can't be targeted with physical or magic attacks. The skill constantly drains SP and reduces your movement speed by 30%. If two stealth fields overlap, it cancels the effect. Requires the magic gear equipment Optic Camouflage Generator equipped. ^000000",
		"[LV 1]^777777 Radius 3x3 ^000000",
		"[LV 2]^777777 Radius 3x3 ^000000",
		"[LV 3]^777777 Radius 3x3 ^000000",
	].join("\n");

	SkillDescription[SKID.NC_REPAIR] = [
		"Repair",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Active / Support ^000000",
		"SP Cost:^777777 20+5*SkillLV ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Catalyst:^777777 1 Magic Gear Fuel ^000000",
		"Effect:^777777 Allows recovery of your own or another target magic gear. Requires the magic gear equipment Repair Kit equipped. Range 5 cells. The magic gear is not affected by the heal skill. ^000000",
		"[LV 1]^777777 Recovery 6% HP ^000000",
		"[LV 2]^777777 Recovery 9% HP ^000000",
		"[LV 3]^777777 Recovery 12% HP ^000000",
		"[LV 4]^777777 Recovery 15% HP ^000000",
		"[LV 5]^777777 Recovery 18% HP ^000000",
	].join("\n");

	SkillDescription[SKID.NC_TRAININGAXE] = [
		"Axe Training",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Passive ^000000",
		"Effect:^777777 Increases attack power and hit rate when using an axe. ^000000",
		"[LV 1]^777777 +5 ATK, Hit Rate +3 ^000000",
		"[LV 2]^777777 +10 ATK, Hit Rate +6 ^000000",
		"[LV 3]^777777 +15 ATK, Hit Rate +9 ^000000",
		"[LV 4]^777777 +20 ATK, Hit Rate +12 ^000000",
		"[LV 5]^777777 +25 ATK, Hit Rate +15 ^000000",
		"[LV 6]^777777 +30 ATK, Hit Rate +18 ^000000",
		"[LV 7]^777777 +35 ATK, Hit Rate +21 ^000000",
		"[LV 8]^777777 +40 ATK, Hit Rate +24 ^000000",
		"[LV 9]^777777 +45 ATK, Hit Rate +27 ^000000",
		"[LV 10]^777777 +50 ATK, Hit Rate +30 ^000000",
	].join("\n");

	SkillDescription[SKID.NC_RESEARCHFE] = [
		"Research Fire / Earth",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Passive ^000000",
		"Effect:^777777 By studying fire and earth property monsters, you increase your effectiveness and defense against these targets. ^000000",
		"[LV 1]^777777 +10 ATK, Resistance +10 ^000000",
		"[LV 2]^777777 +20 ATK, Resistance +20 ^000000",
		"[LV 3]^777777 +30 ATK, Resistance +30 ^000000",
		"[LV 4]^777777 +40 ATK, Resistance +40 ^000000",
		"[LV 5]^777777 +50 ATK, Resistance +50 ^000000",
	].join("\n");

	SkillDescription[SKID.NC_AXEBOOMERANG] = [
		"Axe Boomerang",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 18+2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 5 sec ^000000",
		"Effect:^777777 Throws an axe at long range dealing damage and knockback. The weight of your axe increases your damage. ^000000",
		"[LV 1]^777777 300% ATK + Axe Weight / Range 5 cells ^000000",
		"[LV 2]^777777 350% ATK + Axe Weight / Range 6 cells ^000000",
		"[LV 3]^777777 400% ATK + Axe Weight / Range 7 cells ^000000",
		"[LV 4]^777777 450% ATK + Axe Weight / Range 8 cells ^000000",
		"[LV 5]^777777 500% ATK + Axe Weight / Range 9 cells ^000000",
	].join("\n");

	SkillDescription[SKID.NC_POWERSWING] = [
		"Power Swing",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 8+2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 Strikes a target with an axe dealing damage and stun. There's a low chance to invoke Axe Boomerang. Additional damage is added based on caster's STR and DEX.^000000",
		"[LV 1]^777777 400% ATK ^000000",
		"[LV 2]^777777 500% ATK ^000000",
		"[LV 3]^777777 600% ATK ^000000",
		"[LV 4]^777777 700% ATK ^000000",
		"[LV 5]^777777 800% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.NC_AXETORNADO] = [
		"Axe Tornado",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 16+2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 Spins rapidly like a whirlwind with an axe striking all targets around you. The VIT stat increases your damage. Consumes a certain amount of HP.^000000",
		"[LV 1]^777777 300% ATK / Range 5 x 5 cells / Consumes 20 HP ^000000",
		"[LV 2]^777777 400% ATK / Range 5 x 5 cells / Consumes 40 HP  ^000000",
		"[LV 3]^777777 500% ATK / Range 7 x 7 cells / Consumes 60 HP  ^000000",
		"[LV 4]^777777 600% ATK / Range 7 x 7 cells / Consumes 80 HP  ^000000",
		"[LV 5]^777777 700% ATK / Range 7 x 7 cells / Consumes 100 HP  ^000000",
	].join("\n");

	SkillDescription[SKID.NC_SILVERSNIPER] = [
		"FAW - Silver Sniper",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Active / FAW Construction ^000000",
		"SP Cost:^777777 20+5*SkillLV ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Effect:^777777 Creates a long range Fixed Autonomous Weapon (FAW) platform. You can place a maximum of 2, and it requires 2 Steel, 1 Iron, 1 Mini Furnace and 1 Oridecon Hammer to create. ^000000",
		"[LV 1]^777777 No Additional Damage / Duration 20 seconds ^000000",
		"[LV 2]^777777 +200 MATK / Duration 30 seconds ^000000",
		"[LV 3]^777777 +400 MATK / Duration 40 seconds ^000000",
		"[LV 4]^777777 +800 MATK / Duration 50 seconds ^000000",
		"[LV 5]^777777 +1000 MATK / Duration 60 seconds ^000000",
	].join("\n");

	SkillDescription[SKID.NC_MAGICDECOY] = [
		"FAW - Magic Decoy",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Active / FAW Construction ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Effect:^777777 Creates a magic attacking Fixed Autonomous Weapon (FAW) platform. You can place a maximum of 2, and it requires 1 Mini Furnace, 1 Oridecon Hammer, 2 Iron, 1 Brigan, and 1 of (Red Blood/Green Live/Wind of Verdure/Crystal Blue). ^000000",
		"[LV 1]^777777 +300 MATK / Duration 20 seconds^000000",
		"[LV 2]^777777 +350 MATK / Duration 30 seconds ^000000",
		"[LV 3]^777777 +400 MATK / Duration 40 seconds ^000000",
		"[LV 4]^777777 +450 MATK / Duration 50 seconds ^000000",
		"[LV 5]^777777 +500 MATK / Duration 60 seconds ^000000",
	].join("\n");

	SkillDescription[SKID.NC_DISJOINT] = [
		"FAW - Removal",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Active / FAW Construction ^000000",
		"SP Cost:^777777 15 ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Effect:^777777 Removes the target FAW. It can be used on other players FAW's. ^000000",
	].join("\n");

	SkillDescription[SKID.SC_FATALMENACE] = [
		"Fatal Menace",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Active / Attack ^000000",
		"SP Cost:^777777 35 + 5*SkillLV ^000000",
		"Cast Time:^777777 ?? ^000000",
		"Effect:^777777 Strike one target and all targets around it, teleporting all enemies you hit.",
		"Will not teleport targets that did not receive damage. ^000000",
		"[Level 1]^777777 Attack Power 200% / HIT -30 ^000000",
		"[Level 2]^777777 Attack Power 300% / HIT -25 ^000000",
		"[Level 3]^777777 Attack Power 400% / HIT -20 ^000000",
		"[Level 4]^777777 Attack Power 500% / HIT -15 ^000000",
		"[Level 5]^777777 Attack Power 600% / HIT -10 ^000000",
	].join("\n");

	SkillDescription[SKID.SC_REPRODUCE] = [
		"Reproduce",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 35 + 5*SkillLV ^000000",
		"Effect:^777777 Learn the last skill that was inflicted by an enemy. If the caster uses this skill one more time, then the skill effect disappears and caster can keep the newly acquired skill. Caster can learn only one skill and level learned depends on Reproduce's skill level. Reproduced skills uses twice the SP than normal.^000000",
	].join("\n");

	SkillDescription[SKID.SC_AUTOSHADOWSPELL] = [
		"Auto Shadow Spell",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 35 + 5*SkillLV ^000000",
		"Cast Time:^777777 ?? ^000000",
		"Effect:^777777 Magic skills learned through intimidate and reproduce can be cast through Auto Shadow Spell. ^000000",
		"[Level 1]^777777 Probability 28% / Skill Level 1 / Duration 60 sec ^000000",
		"[Level 2]^777777 Probability 26% / Skill Level 1 / Duration 80 sec ^000000",
		"[Level 3]^777777 Probability 24% / Skill Level 2 / Duration 100 sec ^000000",
		"[Level 4]^777777 Probability 22% / Skill Level 2 / Duration 120 sec ^000000",
		"[Level 5]^777777 Probability 20% / Skill Level 3 / Duration 140 sec ^000000",
		"[Level 6]^777777 Probability 18% / Skill Level 3 / Duration 160 sec ^000000",
		"[Level 7]^777777 Probability 16% / Skill Level 4 / Duration 180 sec ^000000",
		"[Level 8]^777777 Probability 14% / Skill Level 4 / Duration 200 sec ^000000",
		"[Level 9]^777777 Probability 12% / Skill Level 5 / Duration 220 sec ^000000",
		"[Level 10]^777777 Probability 15% / Skill Level 5 / Duration 300 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SC_SHADOWFORM] = [
		"Shadow Form",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Active / Debuff ^000000",
		"SP Cost:^777777 30 + 10*SkillLV ^000000",
		"Cast Time:^777777 ?? ^000000",
		"Effect:^777777 Hide in someone's shadow, and have them receive the damage you receive.",
		"Shadow form ends when you take a certain amount of hits, or when your target moves out of range.",
		"Cannot attack, use skills or items in shadow form. Can be cancelled using detecting skills.^000000",
		"[Level 1] : ^777777 HIT 5 times / 10 SP per Sec / Duration 30 sec ^000000",
		"[Level 2] : ^777777 HIT 6 times /  9 SP per Sec / Duration 40 sec ^000000",
		"[Level 3] : ^777777 HIT 7 times /  8 SP per Sec / Duration 50 sec ^000000",
		"[Level 4] : ^777777 HIT 8 times /  7 SP per Sec / Duration 60 sec ^000000",
		"[Level 5] : ^777777 HIT 9 times /  6 SP per Sec / Duration 70 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SC_TRIANGLESHOT] = [
		"Triangle Slot",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Active ^000000",
		"SP Cost:^777777 20 + 2*SkillLV ^000000",
		"Cast Time:^777777 ?? ^000000",
		"Effect:^777777 Send 3 arrows flying towards your target. Damage increases based on AGI.Consumes 3 arrows per use. There is a low chance to knock back the enemy. ^000000",
		"[Level 1]^777777 Range 7 / Knock back 2% ^000000",
		"[Level 2]^777777 Range 7 / Knock back 3% ^000000",
		"[Level 3]^777777 Range 7 / Knock back 4% ^000000",
		"[Level 4]^777777 Range 9 / Knock back 5% ^000000",
		"[Level 5]^777777 Range 9 / Knock back 6% ^000000",
		"[Level 6]^777777 Range 9 / Knock back 7% ^000000",
		"[Level 7]^777777 Range 9 / Knock back 8% ^000000",
		"[Level 8]^777777 Range 11 / Knock back 9% ^000000",
		"[Level 9]^777777 Range 11 / Knock back 10% ^000000",
		"[Level 10]^777777 Range 11 / Knock back 11% ^000000",
	].join("\n");

	SkillDescription[SKID.SC_BODYPAINT] = [
		"Body Painting",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Active / Debuff ^000000",
		"SP Cost:^777777 5 + 5*SkillLV ^000000",
		"Effect:^777777 Spray paint all around you, revealing any hidden enemies while reducing their ASPD at the same time. Has a chance to inflict Blind on enemies. ^000000",
		"[Level 1]^777777  55% Blind / ASPD -5% / Duration 25 sec ^000000",
		"[Level 2]^777777  57% Blind / ASPD -10% / Duration 30 sec ^000000",
		"[Level 3]^777777  59% Blind / ASPD -15% / Duration 35 sec ^000000",
		"[Level 4]^777777 61% Blind / ASPD -20% / Duration 40 sec ^000000",
		"[Level 5]^777777 63% Blind / ASPD -25% / Duration 45 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SC_INVISIBILITY] = [
		"Invisibility",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Active / Buff ^000000",
		"SP Cost:^777777 100 ^000000",
		"Effect:^777777 Completely conceal yourself. In this status, all your attacks become Ghost property Level 1.",
		"Cannot use skills or items for the duration, and ASPD is reduced. Will continually drain SP, and cancel if SP reaches 0. User is detectable by damage. Skills such as Ruwach, Sight, Detect, Improve Concentration, and Body Painting do not detect.^000000",
		"[Level 1] : ^777777 Critical Rate +20% / ASPD -40% / SP Cost per sec 10% ^000000",
		"[Level 2] : ^777777 Critical Rate +40% / ASPD -30% / SP Cost per sec 8% ^000000",
		"[Level 3] : ^777777 Critical Rate +60% / ASPD -20% / SP Cost per sec 6% ^000000",
		"[Level 4] : ^777777 Critical Rate +80% / ASPD -10% / SP Cost per sec 4% ^000000",
		"[Level 5] : ^777777 Critical Rate +100% / None / SP Cost per sec 2% ^000000",
	].join("\n");

	SkillDescription[SKID.SC_DEADLYINFECT] = [
		"Deadly Infect",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Active / Buff ^000000",
		"SP Cost:^777777 36 + 4*SkillLV ^000000",
		"Effect:^777777 Spread any status effects you are suffering from onto targets you attack. Doing so does not cure your own status effects, however. ^000000 ",
		"[Level 1] : ^777777 Duration 10 sec / Infection Rate 40%^000000",
		"[Level 2] : ^777777 Duration 15 sec / Infection Rate 50%^000000",
		"[Level 3] : ^777777 Duration 20 sec / Infection Rate 60%^000000",
		"[Level 4] : ^777777 Duration 25 sec / Infection Rate 70%^000000",
		"[Level 5] : ^777777 Duration 30 sec / Infection Rate 80%^000000",
	].join("\n");

	SkillDescription[SKID.SC_ENERVATION] = [
		"Masquerade - Enervation",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Active / Debuff ^000000",
		"SP Cost:^777777 20 + 10*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 ?? ^000000",
		"Effect:^777777 Reduce target's ATK and causes target to lose all usable items for the duration. Stats, status resistance, and target/user levels affect the success rate.",
		"Consumes 1 Makeup Brush and 1 Face Paint. ^000000",
		"[Level 1] : ^777777 ATK -30% / Duration 10 sec ^000000",
		"[Level 2] : ^777777 ATK -40% / Duration 15 sec ^000000",
		"[Level 3] : ^777777 ATK -50% / Duration 20 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SC_GROOMY] = [
		"Masquerade - Gloomy",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Active / Debuff ^000000",
		"SP Cost:^777777 20 + 10*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 ?? ^000000",
		"Effect:^777777 Reduces target's ASPD, HIT and movement speed. Forces target to depart with their mounted animal, pet, homunculus and any related animal (falcon, warg) for the skill duration.",
		"Stats, status resistance, and target/user levels affect the success rate. Consumes 1 Makeup Brush and 1 Face Paint. ^000000  ",
		"[Level 1] : ^777777 ASPD -30% / HIT -20% / Duration 10 sec ^000000",
		"[Level 2] : ^777777 ASPD -40% / HIT -40% / Duration 15 sec ^000000",
		"[Level 3] : ^777777 ASPD -50% / HIT -60% / Duration 20 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SC_IGNORANCE] = [
		"Masquerade - Ignorance",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Active / Debuff ^000000",
		"SP Cost:^777777 20 + 10*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 ?? ^000000",
		"Effect:^777777 Take a set amount of SP from the target, and recover half of SP taken for yourself. When used against monsters, recover amount of SP equal to monster level.",
		"Target afflicted with this debuff cannot use skills or magic. Stats, status resistance, and target/user levels affect the success rate. Consumes 1 Makeup Brush and 1 Face Paint. ^000000",
		"[Level 1] : ^777777 SP Taken 100 / Duration 10 sec ^000000",
		"[Level 2] : ^777777 SP Taken 200 / Duration 15 sec ^000000",
		"[Level 3] : ^777777 SP Taken 300 / Duration 20 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SC_LAZINESS] = [
		"Masquerade - Laziness",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Active / Debuff ^000000",
		"SP Cost:^777777 20 + 10*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 ?? ^000000",
		"Effect:^777777 Reduces target's FLEE and slows their cast time. Target afflicted with Laziness will consume more SP when using skills.",
		"Stats, status resistance, and target/user levels affect the success rate. Consumes 1 Makeup Brush and 1 Face Paint. ^000000",
		"[Level 1] : ^777777 FLEE -10% / Cast Time +20% / SP Consumption +10 / Duration 10 sec ^000000",
		"[Level 2] : ^777777 FLEE -20% / Cast Time +30% / SP Consumption +20 / Duration 15 sec ^000000",
		"[Level 3] : ^777777 FLEE -30% / Cast Time +40% / SP Consumption +30 / Duration 20 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SC_UNLUCKY] = [
		"Masquerade - Unlucky",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Active / Debuff ^000000",
		"SP Cost:^777777 20 + 10*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 ?? ^000000",
		"Effect:^777777 Reduces target's CRIT and Perfect Dodge. When afflicted with this status, target must spend zeny to use skills,",
		"and will be be affected by either Poison, Blind, or Silence regardless of resistance. Stats, status resistance, and target/user levels affect the success rate.",
		"Consumes 1 Makeup Brush and 1 Face Paint. ^000000 ",
		"[Level 1] : ^777777 Max HP -10% / Zeny Consumption penalty 10 / Duration 10 sec ^000000",
		"[Level 2] : ^777777 Max HP -20% / Zeny Consumption penalty 20 / Duration 15 sec ^000000",
		"[Level 3] : ^777777 Max HP -30% / Zeny Consumption penalty 30 / Duration 20 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SC_WEAKNESS] = [
		"Masquerade - Weakness",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Active / Debuff ^000000",
		"SP Cost:^777777 20 + 10*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 ?? ^000000",
		"Effect:^777777 Reduces target's Max HP and strips their shield and weapon at the same time. Shield and weapon cannot be re-equipped for the skill duration.",
		"Stats, status resistance, and target/user levels affect the success rate. Consumes 1 Makeup Brush and 1 Face Paint. ^000000",
		"[Level 1]MHP -10% / Perfect Dodge -10 / Duration 10 sec ^000000",
		"[Level 2]MHP -20% / Perfect Dodge -20 / Duration 15 sec ^000000",
		"[Level 3]MHP -30% / Perfect Dodge -30 / Duration 20 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SC_STRIPACCESSARY] = [
		"Strip Accessory ",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Active / Debuff ^000000",
		"SP Cost:^777777 12 + 3*SkillLV ^000000",
		"Cast Time:^777777 ?? ^000000",
		"Effect:^777777 Strip both accessories from your target. Accessories cannot be re-equipped for the duration of the skill.",
		"When used against monsters, it decreases target DEX, INT and LUK by 20%. ^000000 ",
		"[Level 1]^777777 14% Succes / Duration 60 sec ^000000",
		"[Level 2]^777777 16% Succes / Duration 60 sec ^000000",
		"[Level 3]^777777 18% Succes / Duration 60 sec ^000000",
		"[Level 4]^777777 20% Succes / Duration 60 sec ^000000",
		"[Level 5]^777777 22% Succes / Duration 60 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SC_MANHOLE] = [
		"Man Hole",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Active / Ground ^000000",
		"SP Cost:^777777 15 + 5*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 ?? ^000000",
		"Effect:^777777 Paint a hole on the ground to trap 1 enemy. Trapped targets will not be able to do attack, but cannot be attacked either.",
		"Consumes 1 Can of Paint and 1 Paintbrush. ^000000",
		"[Level 1]^777777 Duration  4 sec ^000000",
		"[Level 2]^777777 Duration  8 sec ^000000",
		"[Level 3]^777777 Duration 12 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SC_DIMENSIONDOOR] = [
		"Dimension Door",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Active / Ground ^000000",
		"SP Cost:^777777 24 + 6*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 ?? ^000000",
		"Effect:^777777 Scribble a magical door on the ground. Anyone that walks into the door will be teleported to a nearby location.",
		"Consumes 1 Can of Paint and 1 Paintbrush. ^000000",
		"[Level 1]^777777 Duration  5 sec ^000000",
		"[Level 2]^777777 Duration 10 sec ^000000",
		"[Level 3]^777777 Duration 15 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SC_CHAOSPANIC] = [
		"Chaos Panic",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Active / Ground ^000000",
		"SP Cost:^777777 24 + 6*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 ?? ^000000",
		"Effect:^777777 Paint an insignia on the ground that will cause Chaos to enemies that enter (lose control of movement direction).",
		"Will also cause monsters to randomly switch targets. Consumes 2 Cans of Paint and 1 Paintbrush. ^000000",
		"[Level 1]^777777 Duration  5 sec ^000000",
		"[Level 2]^777777 Duration 10 sec ^000000",
		"[Level 3]^777777 Duration 15 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SC_MAELSTROM] = [
		"Maelstrom",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Active / Ground ^000000",
		"SP Cost:^777777 45 + 5*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 ?? ^000000",
		"Effect:^777777 Paint a swirl shape on the ground and absorb any ground-targeted magic attacks.",
		"User will recover SP from absorbed magics. Consumes 2 Cans of Paint and 1 Paintbrush. ^000000",
		"[Level 1]^777777 Duration  7 sec ^000000",
		"[Level 2]^777777 Duration 14 sec ^000000",
		"[Level 3]^777777 Duration 21 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SC_BLOODYLUST] = [
		"Bloody Lust",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Active / Ground ^000000",
		"SP Cost:^777777 50 + 10*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Effect:^777777 Paint a rousing red symbol on the ground. Anyone who enters the symbol receives the effects equivalent to Provoke.",
		" Requires character to have 1 Paint Brush, and consume 2 Surface Paint. ^000000",
		"[Level 1]^777777 Duration 7 sec ^000000",
		"[Level 2]^777777 Duration 14 sec ^000000",
		"[Level 3]^777777 Duration 21 sec ^000000",
	].join("\n");

	SkillDescription[SKID.SC_FEINTBOMB] = [
		"Feint Bomb",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Active / Ground ^000000",
		"SP Cost:^777777 20 + 4*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 ?? ^000000",
		"Effect:^777777 Paint a figure on the ground that looks exactly like yourself.",
		"A moment later, the painted figure will explode, dealing damage to all enemies around it. Consumes 1 Can of Paint and 1 Paintbrush.",
		"Damage increases based on DEX. ^000000",
		"[Level 1]^777777 3 cells Backslide ^000000",
		"[Level 2]^777777 6 cells Backslide ^000000",
		"[Level 3]^777777 9 cells Backslide ^000000",
	].join("\n");

	SkillDescription[SKID.LG_CANNONSPEAR] = [
		"Cannon Spear",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Spear exclusive skill. Hits all targets in a straight line up to 11 cells.^000000",
		"[LV 1]^777777 150% ATK^000000",
		"[LV 2]^777777 200% ATK^000000",
		"[LV 3]^777777 250% ATK^000000",
		"[LV 4]^777777 300% ATK^000000",
		"[LV 5]^777777 350% ATK^000000",
	].join("\n");

	SkillDescription[SKID.LG_BANISHINGPOINT] = [
		"Banishing Point",
		"Max Level:^777777 10^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Spear exclusive skill. A ranged attack with 7 cell range. Level increases hit rate of the skill. The level of Bash you know increases the damage.^000000",
		"[LV 1]^777777 130% ATK^000000",
		"[LV 2]^777777 160% ATK^000000",
		"[LV 3]^777777 190% ATK^000000",
		"[LV 4]^777777 220% ATK^000000",
		"[LV 5]^777777 250% ATK^000000",
		"[LV 6]^777777 280% ATK^000000",
		"[LV 7]^777777 310% ATK^000000",
		"[LV 8]^777777 340% ATK^000000",
		"[LV 9]^777777 370% ATK^000000",
		"[LV 10]^777777 400% ATK^000000",
	].join("\n");

	SkillDescription[SKID.LG_TRAMPLE] = [
		"Trample",
		"Max Level:^777777 3^000000",
		"Type:^777777 Active / Special^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Tramples an area 5 x 5 around you, destroying all traps. Traps that are explosive type activate normally.^000000",
		"[LV 1]^777777 Success Rate 50%^000000",
		"[LV 2]^777777 Success Rate 75%^000000",
		"[LV 3]^777777 Success Rate 100%^000000",
	].join("\n");

	SkillDescription[SKID.LG_SHIELDPRESS] = [
		"Shield Press",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Shield exclusive skill. Strikes a single target with a shield and stuns the target. The damage is influenced by shield weight, refine rate, and the user's status.^000000",
		"[LV 1]^777777 Stun Chance 70%^000000",
		"[LV 2]^777777 Stun Chance 75%^000000",
		"[LV 3]^777777 Stun Chance 80%^000000",
		"[LV 4]^777777 Stun Chance 85%^000000",
		"[LV 5]^777777 Stun Chance 90%^000000",
	].join("\n");

	SkillDescription[SKID.LG_REFLECTDAMAGE] = [
		"Reflect Damage",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Self Buff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 5 minutes^000000",
		"Effect:^777777 Shield exclusive skill. When receiving physical or magical damage part of the damage is returned in a radius around the user. While active, this skill drains SP every second. This skill cannot be used with Shield Reflect.^000000",
		"[LV 1]^777777 Damage Reflect 20%^000000",
		"[LV 2]^777777 Damage Reflect 25%^000000",
		"[LV 3]^777777 Damage Reflect 30%^000000",
		"[LV 4]^777777 Damage Reflect 35%^000000",
		"[LV 5]^777777 Damage Reflect 40%^000000",
	].join("\n");

	SkillDescription[SKID.LG_PINPOINTATTACK] = [
		"Pinpoint Attack",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Spear exclusive skill. Rush a target quickly from a distance, striking a target at a vital point. The skill level causes different effects. The user's AGI stat influences the damage. Deals critical damage 100% of the time.^000000",
		"[LV 1]^777777 100% ATK, Causes Bleeding^000000",
		"[LV 2]^777777 200% ATK, Remove Spirit Spheres^000000",
		"[LV 3]^777777 300% ATK, Break Shield^000000",
		"[LV 4]^777777 400% ATK, Break Armor^000000",
		"[LV 5]^777777 500% ATK, Break Weapon^000000",
	].join("\n");

	SkillDescription[SKID.LG_FORCEOFVANGUARD] = [
		"Force of Vanguard",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Self Buff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Increases defense and Max HP, adds a chance to gain a Rage Counter when receiving damage. Rage Counters are used for Burst Attack. The skill will be canceled upon recasting the skill. SP is continuously consumed while Vanguard Force is active.^000000",
		"[LV 1]^777777 Chance to get Rage 20%. Max Counter Rage Counters 7^000000",
		"[LV 2]^777777 Chance to get Rage 32%. Max Counter Rage Counters 9^000000",
		"[LV 3]^777777 Chance to get Rage 44%. Max Counter Rage Counters 11^000000",
		"[LV 4]^777777 Chance to get Rage 56%. Max Counter Rage Counters 13^000000",
		"[LV 5]^777777 Chance to get Rage 68%. Max Counter Rage Counters 15^000000",
	].join("\n");

	SkillDescription[SKID.LG_RAGEBURST] = [
		"Rage Burst",
		"Max Level:^777777 1^000000",
		"Type:^777777 Active / Attack^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Uses all rage counters from Force of Vanguard to deal large damage to a single target. The damage is increased by the number of rage counters you have.^000000",
	].join("\n");

	SkillDescription[SKID.LG_SHIELDSPELL] = [
		"Shield Spell",
		"Max Level:^777777 3^000000",
		"Type:^777777 Active / Special^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Shield exclusive skill. Evokes magic specific abilities based on your shield defense, magic defense, and refine rate.^000000",
		"[LV 1]^777777 Evokes magic based on shield defense^000000",
		"[LV 2]^777777 Evokes magic based on shield magic defense^000000",
		"[LV 3]^777777 Evokes magic based on shield upgrade level^000000",
	].join("\n");

	SkillDescription[SKID.LG_EXEEDBREAK] = [
		"Exceed Break",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Self Buff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Collects your strength, so your next attack deals large damage. The user's stats influence the damage done. If you receive a short range physical attack the skill cancels. The skill doesn't influence skill damage. While active your movement speed is slowed.^000000",
		"[LV 1]^777777 150% ATK, Movement Speed Decreased 50%^000000",
		"[LV 2]^777777 300% ATK, Movement Speed Decreased 40%^000000",
		"[LV 3]^777777 450% ATK, Movement Speed Decreased 30%^000000",
		"[LV 4]^777777 600% ATK, Movement Speed Decreased 20%^000000",
		"[LV 5]^777777 750% ATK, Movement Speed Decreased 10%^000000",
	].join("\n");

	SkillDescription[SKID.LG_OVERBRAND] = [
		"Over Brand",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Spear exclusive skill. Draws a cross which deals area damage with a range of up to 6 cells and width of 6 cells. Enemies that receive damage are knocked back. If those knocked back are pushed into a wall, they take additional damage. The level of Spear Quicken you have increases the damage.^000000",
		"[LV 1]^777777 100% ATK, Brandish Damage 100%^000000",
		"[LV 2]^777777 200% ATK, Brandish Damage 200%^000000",
		"[LV 3]^777777 300% ATK, Brandish Damage 300%^000000",
		"[LV 4]^777777 400% ATK, Brandish Damage 400%^000000",
		"[LV 5]^777777 500% ATK, Brandish Damage 500%^000000",
	].join("\n");

	SkillDescription[SKID.LG_PRESTIGE] = [
		"Prestige",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Self Buff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Adds a chance to evade magic damage, and increases physical defense. The user's stats increases the evasion chance, and the user's Defending Aura level increases the defense boost. When successfully evading magic, you completely negate all damage.^000000",
		"[LV 1]^777777 Duration 30 sec^000000",
		"[LV 2]^777777 Duration 45 sec^000000",
		"[LV 3]^777777 Duration 60 sec^000000",
		"[LV 4]^777777 Duration 75 sec^000000",
		"[LV 5]^777777 Duration 90 sec^000000",
	].join("\n");

	SkillDescription[SKID.LG_BANDING] = [
		"Banding",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Self Buff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 When Royal Guards in party have Banding activated, if you are close enough together, your attack increases, defense increases, and share HP. While the skill is active, it continually uses SP. Reusing the skill will cancel the skill. The number of party members increases the effectiveness of the skill.^000000",
	].join("\n");

	SkillDescription[SKID.LG_MOONSLASHER] = [
		"Moon Slasher",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Deals damage to all enemies in a 3 cell radius around you, which forces the enemies hit to sit. When used against monsters it stops them from moving for 1~3 seconds. Over Brand skill level increases the damage dealt.^000000",
		"[LV 1]^777777 50% ATK, Success Rate 40%^000000",
		"[LV 2]^777777 100% ATK, Success Rate 48%^000000",
		"[LV 3]^777777 150% ATK, Success Rate 56%^000000",
		"[LV 4]^777777 200% ATK, Success Rate 64%^000000",
		"[LV 5]^777777 250% ATK, Success Rate 72%^000000",
	].join("\n");

	SkillDescription[SKID.LG_RAYOFGENESIS] = [
		"Ray of Genesis",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Calls down the wrath of God's messenger from the sky. Deals holy element damage to all targets in a 5 cell radius. Requires two Royal Guards with Banding activated. The damage is increased by the number of banding Royal Guards. When used on undead or demon monsters, it has a 50% chance of blinding.^000000",
		"[LV 1]^777777 400% ATK, 100% MATK, HP Cost 5%^000000",
		"[LV 2]^777777 500% ATK, 200% MATK, HP Cost 10%^000000",
		"[LV 3]^777777 600% ATK, 300% MATK, HP Cost 15%^000000",
		"[LV 4]^777777 700% ATK, 400% MATK, HP Cost 20%^000000",
		"[LV 5]^777777 800% ATK, 500% MATK, HP Cost 25%^000000",
	].join("\n");

	SkillDescription[SKID.LG_PIETY] = [
		"Piety",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Buff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Endows a target party member's armor and that of nearby party members with Holy element. Consumes 2 Holy Waters. Can be used on yourself.^000000",
		"[LV 1]^777777 Duration 60 sec^000000",
		"[LV 2]^777777 Duration 80 sec^000000",
		"[LV 3]^777777 Duration 100 sec^000000",
		"[LV 4]^777777 Duration 120 sec^000000",
		"[LV 5]^777777 Duration 140 sec^000000",
	].join("\n");

	SkillDescription[SKID.LG_EARTHDRIVE] = [
		"Earth Drive",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Brandishes your shield, dealing earth element damage to enemies in an area. Enemies which take damage have their defense and attack speed lowered by 25%. Skill level increases the duration of the attack speed and defense reduction. Damage is influenced by your shield weight.^000000",
		"[LV 1]^777777 200% ATK, Effect Time 3 sec^000000",
		"[LV 2]^777777 300% ATK, Effect Time 6 sec^000000",
		"[LV 3]^777777 400% ATK, Effect Time 9 sec^000000",
		"[LV 4]^777777 500% ATK, Effect Time 12 sec^000000",
		"[LV 5]^777777 600% ATK, Effect Time 15 sec^000000",
	].join("\n");

	SkillDescription[SKID.LG_HESPERUSLIT] = [
		"Hesperus Lit",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Usable by 3 Royal Guards in Banding. All Royal Guards in Banding strike a target together at once. The number of hits is increased by the number of banding Royal Guards and changes the effect. When using the skill, half of the SP is consumed by other Royal Guards in Banding.^000000",
		"[LV 1]^777777 40% ATK^000000",
		"[LV 2]^777777 80% ATK^000000",
		"[LV 3]^777777 120% ATK^000000",
		"[LV 4]^777777 160% ATK^000000",
		"[LV 5]^777777 200% ATK^000000",
	].join("\n");

	SkillDescription[SKID.LG_INSPIRATION] = [
		"Inspiration",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Self Buff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 When you use Inspiration, your accuracy rate, stats, attack power and Max HP increase. While the skill is active, your HP and SP continually decrease, and you will receive some of the damage you deal back. If your SP reaches 0 the skill will automatically cancel, and if your HP reaches 0, you die. Using the skill costs 1% of your experience, and you cannot prevent the experience loss. While this skill is active, you cannot use Banding or Prestige.^000000",
		"[LV 1]^777777 Duration 30 sec^000000",
		"[LV 2]^777777 Duration 45 sec^000000",
		"[LV 3]^777777 Duration 60 sec^000000",
		"[LV 4]^777777 Duration 75 sec^000000",
		"[LV 5]^777777 Duration 90 sec^000000",
	].join("\n");

	SkillDescription[SKID.SR_DRAGONCOMBO] = [
		"Dragon Combo (Twin Dragon)",
		"Max Level:^777777 10^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Target:^777777 Enemy^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Rapidly strikes a single target with two blows. The skill Fallen Empire can be used in combination with Dragon Combo.^000000",
		"[LV 1]^777777 200% ATK, Stun Chance 2%^000000",
		"[LV 2]^777777 220% ATK, Stun Chance 3%^000000",
		"[LV 3]^777777 240% ATK, Stun Chance 4%^000000",
		"[LV 4]^777777 260% ATK, Stun Chance 5%^000000",
		"[LV 5]^777777 280% ATK, Stun Chance 6%^000000",
		"[LV 6]^777777 300% ATK, Stun Chance 7%^000000",
		"[LV 7]^777777 320% ATK, Stun Chance 8%^000000",
		"[LV 8]^777777 340% ATK, Stun Chance 9%^000000",
		"[LV 9]^777777 360% ATK, Stun Chance 10%^000000",
		"[LV 10]^777777 380% ATK, Stun Chance 11%^000000",
	].join("\n");

	SkillDescription[SKID.SR_SKYNETBLOW] = [
		"Sky Net Blow",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"Target:^777777 Enemy^000000",
		"Effect:^777777 Spinning blow that kicks up a storm, dealing damage to all targets in an area and throwing them back 3 cells. The user's AGI stat increases the damage.^000000",
		"[LV 1]^777777 80% ATK^000000",
		"[LV 2]^777777 160% ATK^000000",
		"[LV 3]^777777 240% ATK^000000",
		"[LV 4]^777777 320% ATK^000000",
		"[LV 5]^777777 400% ATK^000000",
	].join("\n");

	SkillDescription[SKID.SR_EARTHSHAKER] = [
		"Earth Shaker",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Target:^777777 Enemy^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Sends a shockwave through the ground which damages all targets in a 11 x 11 area, dealing additional damage against hidden targets. Targets in Hiding, Cloaking, etc will be revealed when hit. Consumes 1 spirit sphere.^000000",
		"[LV 1]^777777 Normal/on hide target 100%/300% ATK^000000",
		"[LV 2]^777777 Normal/on hide target 150%/450% ATK^000000",
		"[LV 3]^777777 Normal/on hide target 200%/600% ATK^000000",
		"[LV 4]^777777 Normal/on hide target 250%/750% ATK^000000",
		"[LV 5]^777777 Normal/on hide target 300%/900% ATK^000000",
	].join("\n");

	SkillDescription[SKID.SR_FALLENEMPIRE] = [
		"Fallen Empire",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Target:^777777 Enemy^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Use your shoulders and fists to do an upwards blow to deal large damage to a single enemy. The enemy takes additional damage if the target is heavier. After receiving damage the target is unable to move for a short period of time. Fallen Empire can only be used after Dragon Combo. After fallen empire, Tiger Cannon and Gate of Hell can be used.^000000",
		"[LV 1]^777777 250% ATK, Immobility Time 0.5s^000000",
		"[LV 2]^777777 400% ATK, Immobility Time 1s^000000",
		"[LV 3]^777777 550% ATK, Immobility Time 1.5s^000000",
		"[LV 4]^777777 700% ATK, Immobility Time 2s^000000",
		"[LV 5]^777777 850% ATK, Immobility Time 2.5s^000000",
	].join("\n");

	SkillDescription[SKID.SR_TIGERCANNON] = [
		"Tiger Cannon",
		"Max Level:^777777 10^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Target:^777777 Enemy^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Consumes your own HP and SP to deal damage ot the target's HP and SP. The more HP and SP used, the more damage it does. Consumes 2 spirit spheres. Can only be used in Fury state. When used after Fallen Empire, it does additional damage.^000000",
		"[LV 1]^777777 User's HP/SP Used 2%/1%^000000",
		"[LV 2]^777777 User's HP/SP Used 4%/2%^000000",
		"[LV 3]^777777 User's HP/SP Used 6%/3%^000000",
		"[LV 4]^777777 User's HP/SP Used 8%/4%^000000",
		"[LV 5]^777777 User's HP/SP Used 10%/5%^000000",
		"[LV 6]^777777 User's HP/SP Used 12%/6%^000000",
		"[LV 7]^777777 User's HP/SP Used 14%/7%^000000",
		"[LV 8]^777777 User's HP/SP Used 16%/8%^000000",
		"[LV 9]^777777 User's HP/SP Used 18%/9%^000000",
		"[LV 10]^777777 User's HP/SP Used 20%/10%^000000",
	].join("\n");

	SkillDescription[SKID.SR_RAMPAGEBLASTER] = [
		"Rampage Blaster (Explosive Spirit Shot)",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Target:^777777 Enemy^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Consumes all of your spirit spheres and deals damage to all enemies in a 7 x 7 cell radius. The number of spirit spheres increases your damage. The skill deals increased damage if you are in fury state.^000000",
		"[LV 1]^777777 N?Spirit Spheres x 50% ATK^000000",
		"[LV 2]^777777 N?Spirit Spheres x 100% ATK^000000",
		"[LV 3]^777777 N?Spirit Spheres x 150% ATK^000000",
		"[LV 4]^777777 N?Spirit Spheres x 200% ATK^000000",
		"[LV 5]^777777 N?Spirit Spheres x 250% ATK^000000",
	].join("\n");

	SkillDescription[SKID.SR_CRESCENTELBOW] = [
		"Crescent Elbow",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Counter^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Attempt to counter an enemies attack, knocking back the opponent and dealing damage, though you'll still take damage. The higher the HP of the target, the more damage it does. The skill consumes 2 spirit spheres, and cannot be used on boss monsters.^000000",
		"[LV 1]^777777 Activation chance 55% / Duration 3 seconds^000000",
		"[LV 2]^777777 Activation chance 60% / Duration 4 seconds^000000",
		"[LV 3]^777777 Activation chance 65% / Duration 5 seconds^000000",
		"[LV 4]^777777 Activation chance 70% / Duration 6 seconds^000000",
		"[LV 5]^777777 Activation chance 75% / Duration 7 seconds^000000",
	].join("\n");

	SkillDescription[SKID.SR_CURSEDCIRCLE] = [
		"Cursed Circle",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Special^000000",
		"SP Cost:^777777 Unknown^000000",
		"Target:^777777 Self^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Creates an area 5x5 cells around the caster where all enemies cannot move or attack, and become silenced for the duration of the skill. If the user of cursed circle uses any other skill, cursed circle immediately ends. The skill consumes 1 spirit sphere.^000000",
		"[LV 1]^777777 Duration 5s^000000",
		"[LV 2]^777777 Duration 6s^000000",
		"[LV 3]^777777 Duration 7s^000000",
		"[LV 4]^777777 Duration 8s^000000",
		"[LV 5]^777777 Duration 9s^000000",
	].join("\n");

	SkillDescription[SKID.SR_LIGHTNINGWALK] = [
		"Lightning Walk",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active Toggle / Special^000000",
		"SP Cost:^777777 Unknown^000000",
		"Target:^777777 Self^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 When targeted with a ranged or magic attack (targeted magic only), instead of taking damage you immediately jump at high speeds to the attacker. When using the skill, it consumes some HP, and drains some SP each second. When the skill activates, the status effect ends.^000000",
		"[LV 1]^777777 HP Consumed 5%, SP Drain er second 3, Chance for activating 30% ^000000",
		"[LV 2]^777777 HP Consumed 4%, SP Drain er second 3, Chance for activating 35%^000000",
		"[LV 3]^777777 HP Consumed 3%, SP Drain er second 2, Chance for activating 40%^000000",
		"[LV 4]^777777 HP Consumed 2%, SP Drain er second 2, Chance for activating 45%^000000",
		"[LV 5]^777777 HP Consumed 1%, SP Drain er second 1, Chance for activating 50%^000000",
	].join("\n");

	SkillDescription[SKID.SR_KNUCKLEARROW] = [
		"Knuckle Arrow (Shura Body Bullet)",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Target:^777777 Enemy^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Instantly closes the distance between you and a target, dealing damage and throwing the target back. When the target is knocked back, if they collide with a wall or obstacle, they take additional damage. Consumes 2 spirit spheres when used.^000000",
		"[LV 1]^777777 200% ATK, Knockback Damage 150% + Bonus^000000",
		"[LV 2]^777777 300% ATK, Knockback Damage 300% + Bonus^000000",
		"[LV 3]^777777 400% ATK, Knockback Damage 450% + Bonus^000000",
		"[LV 4]^777777 500% ATK, Knockback Damage 600% + Bonus^000000",
		"[LV 5]^777777 600% ATK, Knockback Damage 750% + Bonus^000000",
	].join("\n");

	SkillDescription[SKID.SR_WINDMILL] = [
		"Windmill",
		"Max Level:^777777 1^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Target:^777777 Self^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 A low to the ground spinning kick that damages targets in a 5x5 area and forces them to use [/sit]. Will stun monsters for 1-4 seconds. Does not work on boss monsters.^000000",
	].join("\n");

	SkillDescription[SKID.SR_RAISINGDRAGON] = [
		"Rising Dragon",
		"Max Level:^777777 10^000000",
		"Type:^777777 Active / Buff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Target:^777777 Self^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Temporarily releases your mind and spirit, allowing you to gather more spirit spheres, increase your max HP and SP and improves your attack speed. During the duration of this skill you'll remain in Fury state. When using the skill, it will slowly drain your HP each second. If your HP gets too low, the skill effect will cancel.^000000",
		"[LV 1]^777777 Max Spirit Spheres 6, Max HP/SP +3%, Duration 30sec^000000",
		"[LV 2]^777777 Max Spirit Spheres 7, Max HP/SP +4%, Duration 45 sec^000000",
		"[LV 3]^777777 Max Spirit Spheres 8, Max HP/SP +5%, Duration 60 sec^000000",
		"[LV 4]^777777 Max Spirit Spheres 9, Max HP/SP +6%, Duration 75sec^000000",
		"[LV 5]^777777 Max Spirit Spheres 10, Max HP/SP +7%, Duration 90sec^000000",
		"[LV 6]^777777 Max Spirit Spheres 11, Max HP/SP +8%, Duration 105sec^000000",
		"[LV 7]^777777 Max Spirit Spheres 12, Max HP/SP +9%, Duration 120sec^000000",
		"[LV 8]^777777 Max Spirit Spheres 13, Max HP/SP +10%, Duration 135sec^000000",
		"[LV 9]^777777 Max Spirit Spheres 14, Max HP/SP +11%, Duration 150sec^000000",
		"[LV 10]^777777 Max Spirit Spheres 15, Max HP/SP +12%, Duration 165sec^000000",
	].join("\n");

	SkillDescription[SKID.SR_ASSIMILATEPOWER] = [
		"Assimilate Power",
		"Max Level:^777777 1^000000",
		"Type:^777777 Active / Special^000000",
		"SP Cost:^777777 Unknown^000000",
		"Target:^777777 Self^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Uses Absorb Spirit Spheres on all targets in a 5x5 area, recovering SP.^000000",
	].join("\n");

	SkillDescription[SKID.SR_POWERVELOCITY] = [
		"Power Velocity (All Spirit Injection)",
		"Max Level:^777777 1^000000",
		"Type:^777777 Active / Special^000000",
		"SP Cost:^777777 Unknown^000000",
		"Target:^777777 Ally^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Transfers all of your spirit spheres to a designated target.^000000",
	].join("\n");

	SkillDescription[SKID.SR_GATEOFHELL] = [
		"Gate of Hell (Rakshasa Phoenix Destruction Fist)",
		"Max Level:^777777 10^000000",
		"Type:^777777 Active / Damage^000000",
		"Effect:^777777 Can only be used while in Fury state. Instantly strikes a target with countless blows. The more spirit spheres you have, and the lower the caster's HP, the more damage it does. The skill consumes certain amount of SP and all of your spirit spheres. Can be used after Fallen Empire, and when used this way the SP consumption is reduced by 10% and the damage slightly increased.^000000",
	].join("\n");

	SkillDescription[SKID.SR_GENTLETOUCH_QUIET] = [
		"Gentle Touch - Quiet (Pressure Point: Silence)",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage / Debuff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Target:^777777 Enemy^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 By using special pressure point techniques, you deal damage and silence one target. The caster's dex greatly increases the damage.^000000",
		"[LV 1]^777777 Range 2, 100% ATK^000000",
		"[LV 2]^777777 Range 2, 200% ATK^000000",
		"[LV 3]^777777 Range 2, 300% ATK^000000",
		"[LV 4]^777777 Range 2, 400% ATK^000000",
		"[LV 5]^777777 Range 2, 500% ATK^000000",
	].join("\n");

	SkillDescription[SKID.SR_GENTLETOUCH_CURE] = [
		"Gentle Touch - Cure (Presure Point: Recovery)",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Recovery / Buff^000000",
		"Target:^777777 Ally^000000",
		"Effect:^777777 Using special pressure point techniques, you recover a target's HP and cure them of various status ailments. Skill level increases the probability of success. The skill can recover Petrification / Frozen / Stun / Poison / Silence / Blind / Hallucination statuses. Using this skill you can also recover yourself from Petrification / Frozen / Stun statuses. Consumes spirit spheres based on skill level.^000000",
	].join("\n");

	SkillDescription[SKID.SR_GENTLETOUCH_ENERGYGAIN] = [
		"Gentle Touch - Energy Gain (Pressure Point: Energy Gain)",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Self Buff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Target:^777777 Self^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Using pressure points on your own body you can improve your fighting spirit, allowing you to gain spirit spheres when you deal and receive physical damage. The skill consumes some HP when initially cast. This skill cannot be used in combination with Pressure Point: Change and Presure Point: Revitalize.^000000",
		"[LV 1]^777777 HP Cost 1%, Chance to get a spirit sphere 15% ^000000",
		"[LV 2]^777777 HP Cost 2%, Chance to get a spirit sphere 20% ^000000",
		"[LV 3]^777777 HP Cost 3%, Chance to get a spirit sphere 25% ^000000",
		"[LV 4]^777777 HP Cost 4%, Chance to get a spirit sphere 30% ^000000",
		"[LV 5]^777777 HP Cost 5%, Chance to get a spirit sphere 35% ^000000",
	].join("\n");

	SkillDescription[SKID.SR_GENTLETOUCH_CHANGE] = [
		"Gentle Touch - Change (Pressure Point: Change)",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Self Buff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Target:^777777 Self^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Using special presure points you take your own physical and magical defense and instead turns it into attack power and attack speed. Casting the skill takes Spirit Spheres depending on skill level and drains some HP. Cannot be used in combination with Pressure Point: Energy Gain and Pressure Point: Revitalize.^000000",
		"[LV 1]^777777 HP Cost 1% ^000000",
		"[LV 2]^777777 HP Cost 2% ^000000",
		"[LV 3]^777777 HP Cost 3% ^000000",
		"[LV 4]^777777 HP Cost 4% ^000000",
		"[LV 5]^777777 HP Cost 5% ^000000",
	].join("\n");

	SkillDescription[SKID.SR_GENTLETOUCH_REVITALIZE] = [
		"Gentle Touch - Revitalize (Pressure Point: Revitalize)",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Self Buff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Target:^777777 Self^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Using special pressure points you increase your VIT, MaxHP, and improve your natural HP regeneration. Also increases your physical defense. While in this state your movement and attack speed and HP recovery increase as well. Consumes Spirit Spheres depending on skill level. Cannot be used in combination with Pressure Point: Energy Gain and Pressure Point: Change.^000000",
		"[LV 1]^777777 Max HP 2%, Natural HP Recovery +80%^000000",
		"[LV 2]^777777 Max HP 4%, Natural HP Recovery +110%^000000",
		"[LV 3]^777777 Max HP 6%, Natural HP Recovery +140%^000000",
		"[LV 4]^777777 Max HP 8%, Natural HP Recovery +170%^000000",
		"[LV 5]^777777 Max HP 10%, Natural HP Recovery +200%^000000",
	].join("\n");

	SkillDescription[SKID.WA_SWING_DANCE] = [
		"Swing Dance",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Buff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 50+50*SkillLV sec^000000",
		"Effect:^777777 Temporarily increases movement speed and attack speed for all party members.^000000",
		"[LV 1]^777777 Movement Speed +4%, ASPD +4%^000000",
		"[LV 2]^777777 Movement Speed +8%, ASPD +8%^000000",
		"[LV 3]^777777 Movement Speed +12%, ASPD +12%^000000",
		"[LV 4]^777777 Movement Speed +16%, ASPD +16%^000000",
		"[LV 5]^777777 Movement Speed +20%, ASPD +20%^000000",
	].join("\n");

	SkillDescription[SKID.WA_SYMPHONY_OF_LOVER] = [
		"Symphony of Lover",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Buff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 50+50*SkillLV sec^000000",
		"Effect:^777777 Temporarily increases magic defense of yourself and party members.^000000",
		"[LV 1]^777777 20% MDEF^000000",
		"[LV 2]^777777 40% MDEF^000000",
		"[LV 3]^777777 60% MDEF^000000",
		"[LV 4]^777777 80% MDEF^000000",
		"[LV 5]^777777 100% MDEF^000000",
	].join("\n");

	SkillDescription[SKID.WA_MOONLIT_SERENADE] = [
		"Moonlit Serenade",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Buff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 50+50*SkillLV sec^000000",
		"Effect:^777777 Temporarily increases magic attack power of yourself and party members.^000000",
		"[LV 1]^777777 10% MATK^000000",
		"[LV 2]^777777 20% MATK^000000",
		"[LV 3]^777777 30% MATK^000000",
		"[LV 4]^777777 40% MATK^000000",
		"[LV 5]^777777 50% MATK^000000",
	].join("\n");

	SkillDescription[SKID.MI_RUSH_WINDMILL] = [
		"Windmill Rush Attack",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Buff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 50+50*SkillLV sec^000000",
		"Effect:^777777 Temporarily increases attack power of yourself and your party members.^000000",
		"[LV 1]^777777 10% ATK^000000",
		"[LV 2]^777777 20% ATK^000000",
		"[LV 3]^777777 30% ATK^000000",
		"[LV 4]^777777 40% ATK^000000",
		"[LV 5]^777777 50% ATK^000000",
	].join("\n");

	SkillDescription[SKID.MI_ECHOSONG] = [
		"Echo Song",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Buff^000000",
		"Duration:^777777 50+50*SkillLV sec^000000",
		"Effect:^777777 Temporarily increases defense power of yourself and your party members.^000000",
		"[LV 1]^777777 10% DEF^000000",
		"[LV 2]^777777 20% DEF^000000",
		"[LV 3]^777777 30% DEF^000000",
		"[LV 4]^777777 40% DEF^000000",
		"[LV 5]^777777 50% DEF^000000",
	].join("\n");

	SkillDescription[SKID.MI_HARMONIZE] = [
		"Harmonize",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Buff^000000",
		"Effect:^777777 Enter a state of harmony with another player or monster. Doing so will equalize all bonus stats of the caster and the target for 60 seconds. An instrument is required to cast this skill.^000000",
		"[LV 1]^777777 Fixed bonus for all stats 10^000000",
		"[LV 2]^777777 Fixed bonus for all stats 15^000000",
		"[LV 3]^777777 Fixed bonus for all stats 20^000000",
		"[LV 4]^777777 Fixed bonus for all stats 25^000000",
		"[LV 5]^777777 Fixed bonus for all stats 30^000000",
	].join("\n");

	SkillDescription[SKID.WM_LESSON] = [
		"Lesson",
		"Max Level:^777777 10^000000",
		"Type:^777777 Passive^000000",
		"Effect:^777777 Increases your Max SP and SP recovery. At skill level 5 and higher, allows you to use 3rd job song skills while doing 2nd job performance and ensemble skills.^000000",
		"[LV 1]^777777 Max SP +30^000000",
		"[LV 2]^777777 Max SP +60^000000",
		"[LV 3]^777777 Max SP +90^000000",
		"[LV 4]^777777 Max SP +120^000000",
		"[LV 5]^777777 Max SP +150^000000",
		"[LV 6]^777777 Max SP +180^000000",
		"[LV 7]^777777 Max SP +210^000000",
		"[LV 8]^777777 Max SP +240^000000",
		"[LV 9]^777777 Max SP +270^000000",
		"[LV 10]^777777 Max SP +300^000000",
	].join("\n");

	SkillDescription[SKID.WM_METALICSOUND] = [
		"Metallic Sound",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 Unknown^000000",
		"Effect:^777777 Emits a high pitched sound at a single target, damaging their HP and SP. The damage is greatly increased if the target is currently asleep. Lesson skill level increases the damage.^000000",
		"[LV 1]^777777 500% + Increased damage for Lesson^000000",
		"[LV 2]^777777 550% + Increased damage for Lesson^000000",
		"[LV 3]^777777 600% + Increased damage for Lesson^000000",
		"[LV 4]^777777 650% + Increased damage for Lesson^000000",
		"[LV 5]^777777 700% + Increased damage for Lesson^000000",
	].join("\n");

	SkillDescription[SKID.WM_REVERBERATION] = [
		"Reverberation",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 Unknown^000000",
		"Effect:^777777 Generates high pitched sound waves from a location on the ground. When near these waves, you receive damage. You can have up to 3 reverberation's active at once, and when touched or the duration ends all targets in a 3x3 area take damage. The reverberation can be removed with ranged attacks or magic.^000000",
		"[LV 1]^777777 400% ATK, 200% MATK^000000",
		"[LV 2]^777777 500% ATK, 300% MATK^000000",
		"[LV 3]^777777 600% ATK, 400% MATK^000000",
		"[LV 4]^777777 700% ATK, 500% MATK^000000",
		"[LV 5]^777777 800% ATK, 600% MATK^000000",
	].join("\n");

	SkillDescription[SKID.WM_DOMINION_IMPULSE] = [
		"Dominion Impulse",
		"Max Level:^777777 1^000000",
		"Type:^777777 Active / Special^000000",
		"Effect:^777777 Activates any Reverberations active in a 11 x 11 area around you. This can trigger the reverberations of other players as well.^000000",
	].join("\n");

	SkillDescription[SKID.WM_SEVERE_RAINSTORM] = [
		"Severe Rainstorm",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"Effect:^777777 Throws countless arrows into the air, which rain down on a 11 x 11 area, dealing 1 hit every 0.3 seconds. The skill requires 20 arrows, and fails if you do not have 20 arrows.^000000",
		"[LV 1]^777777 Duration 0.9 second^000000",
		"[LV 2]^777777 Duration 1.5 seconds^000000",
		"[LV 3]^777777 Duration 2.1 seconds^000000",
		"[LV 4]^777777 Duration 2.7 seconds^000000",
		"[LV 5]^777777 Duration 3.0 seconds^000000",
	].join("\n");

	SkillDescription[SKID.WM_POEMOFNETHERWORLD] = [
		"Poem of the Netherworld",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Debuff^000000",
		"Catalyst:^0000ff 1 Throat Lozenge ^000000.",
		"Effect:^777777 Create a special sound on a target cell that affects the targets reflexes, making them unable to move. You can have up to 5 active at once and they affect a 3x3 area. The skill does not affect boss monsters. The duration is affected by the difference in level between you and the target.^000000",
		"[LV 1]^777777 Effect Duration 8 sec, Sound Duration 9 sec^000000",
		"[LV 2]^777777 Effect Duration 10 sec, Sound Duration 11 sec^000000",
		"[LV 3]^777777 Effect Duration 12 sec, Sound Duration 13 sec^000000",
		"[LV 4]^777777 Effect Duration 14 sec, Sound Duration 15 sec^000000",
		"[LV 5]^777777 Effect Duration 16 sec, Sound Duration 17 sec^000000",
	].join("\n");

	SkillDescription[SKID.WM_VOICEOFSIREN] = [
		"Voice of Siren",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Debuff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 12+3*SkillLV sec^000000",
		"Effect:^777777 Causes targets in a 11x11 area around the caster to become fascinated and drawn towards the caster. Monsters will be unable to attack you, and players will be unable to attack the user for the skill duration. While under the effect of the skill you will use the heart emotion. The skill duration is reduced proportionate to the target's level. The skill effect ends when the target receives damage.^000000",
		"[LV 1]^777777 Success Rate 30%^000000",
		"[LV 2]^777777 Success Rate 40%^000000",
		"[LV 3]^777777 Success Rate 50%^000000",
		"[LV 4]^777777 Success Rate 60%^000000",
		"[LV 5]^777777 Success Rate 70%^000000",
	].join("\n");

	SkillDescription[SKID.WM_DEADHILLHERE] = [
		"Valley of Death",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Recovery^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Catalyst:^0000ff 1 Painful Tear^000000.",
		"Effect:^777777 Target 1 player is revived. That player is resurrected with HP equal to the SP they currently have. If the player has 0 SP, they are resurrected with 1 HP. ^000000",
		"[LV 1]^777777 Success Rate 90%, Target's SP Consumption 100%^000000",
		"[LV 2]^777777 Success Rate 92%, Target's SP Consumption 80%^000000",
		"[LV 3]^777777 Success Rate 94%, Target's SP Consumption 60%^000000",
		"[LV 4]^777777 Success Rate 96%, Target's SP Consumption 40%^000000",
		"[LV 5]^777777 Success Rate 98%, Target's SP Consumption 20%^000000",
	].join("\n");

	SkillDescription[SKID.WM_LULLABY_DEEPSLEEP] = [
		"Deep Sleep Lullaby",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Debuff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 All targets around you fall into \"Deep Sleep\". While in deep sleep the target cannot move, attack, use items or skills. Being hit will wake them, but any damage they take in Deep Sleep status is amplified by 1.5 times. While in deep sleep the target recovers 1% of their HP/SP every 2 seconds.^000000",
		"[LV 1]^777777 Success Rate 90%, 11x11 cells^000000",
		"[LV 2]^777777 Success Rate 92%, 13x13 cells^000000",
		"[LV 3]^777777 Success Rate 94%, 15x15 cells^000000",
		"[LV 4]^777777 Success Rate 96%, 19x19 cells^000000",
		"[LV 5]^777777 Success Rate 98%, 21x21 cells^000000",
	].join("\n");

	SkillDescription[SKID.WM_SIRCLEOFNATURE] = [
		"Circle of Nature's Sound",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Recovery^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 5+5*SkillLV sec^000000",
		"Effect:^777777 All targets in range receive the effect of Circle of Nature. Every second the effect consumes a fixed amount of SP and recovers your HP. If a player has no remaining SP, the effect ends for them.^000000",
		"[LV 1]^777777 Consumes 2 SP/sec, Recovers 40 HP/sec^000000",
		"[LV 2]^777777 Consumes 3 SP/sec, Recovers 80 HP/sec^000000",
		"[LV 3]^777777 Consumes 4 SP/sec, Recovers 120 HP/sec^000000",
		"[LV 4]^777777 Consumes 5 SP/sec, Recovers 240 HP/sec^000000",
		"[LV 5]^777777 Consumes 6 SP/sec, Recovers 360 HP/sec^000000",
	].join("\n");

	SkillDescription[SKID.WM_RANDOMIZESPELL] = [
		"Improvised Song",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Special^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Invokes one random Magician or Wizard abililty. Ignores any catalyst required for casting.^000000",
		"[LV 1]^777777 Uses a random Level 5 magic skill^000000",
		"[LV 2]^777777 Uses a random Level 6 magic skill^000000",
		"[LV 3]^777777 Uses a random Level 7 magic skill^000000",
		"[LV 4]^777777 Uses a random Level 8 magic skill^000000",
		"[LV 5]^777777 Uses a random Level 9 magic skill^000000",
	].join("\n");

	SkillDescription[SKID.WM_GLOOMYDAY] = [
		"Gloomy Day",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Buff or Debuff^000000",
		"Effect:^777777 Requires an instrument or whip to cast. Increases the damage of several specific skills, or reduces evasion and attack speed. The following skills are improved [ Hundred Spear / Brandish Spear / Spiral Pierce / Shield Charge / Shield Boomerang / Shield Chain / Shield Press ]. If you don't have any of those skills, instead your evasion and attack speed are reduced. Can be used on anyone in siege and PK areas^000000",
		"[LV 1]^777777 Evasion -25, ASPD -20%^000000",
		"[LV 2]^777777 Evasion -30, ASPD -25%^000000",
		"[LV 3]^777777 Evasion -35, ASPD -30%^000000",
		"[LV 4]^777777 Evasion -40, ASPD -35%^000000",
		"[LV 5]^777777 Evasion -45, ASPD -40%^000000",
	].join("\n");

	SkillDescription[SKID.WM_GREAT_ECHO] = [
		"Great Echo",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage / Chorus^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Catalyst:^0000ff 1 Throat Lozenge ^000000.",
		"Effect:^777777 The user creates an incredibly loud echo which damages all enemies in range. If you have more Wanderers/Minstrels in party, the damage increases and SP cost is decreased. Consumes SP of all Wanderers/Minstrels in party.^000000",
		"[LV 1]^777777 5x5 cells, 600% ATK^000000",
		"[LV 2]^777777 7x7 cells, 800% ATK^000000",
		"[LV 3]^777777 7x7 cells, 1000% ATK^000000",
		"[LV 4]^777777 9x9 cells, 1200% ATK^000000",
		"[LV 5]^777777 9x9 cells, 1400% ATK^000000",
	].join("\n");

	SkillDescription[SKID.WM_SONG_OF_MANA] = [
		"Song of Mana",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Buff / Chorus^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 0+30*SkillLV sec^000000",
		"Effect:^777777 A song which aids in the circulation of mana, recovering 10 sp every 3 seconds for all party members. The recovery amount is increased if there are more Wanderers/Minstrels in the party.^000000",
	].join("\n");

	SkillDescription[SKID.WM_DANCE_WITH_WUG] = [
		"Dance With Warg",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Buff / Chorus^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 0+30*SkillLV sec^000000",
		"Effect:^777777 Sing a song with a fast tempo, increasing you and your parties attack speed silghtly, and reducing all cast time. The effect of this skill is improved as there are more Minstrels/Wanderers in party.^000000",
	].join("\n");

	SkillDescription[SKID.WM_SOUND_OF_DESTRUCTION] = [
		"Sound of Destruction",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Unique / Chorus^000000",
		"Effect:^777777 Cancels all song and chorus effects in a circumference around a target enemy. The success rate is based on the targets Int and Dex, the targets level, Sound of Destruction level, as well as the level of song or chorus skill in effect on the target. The success rate is increased if there are more Wanderers/Minstrels in the party.^000000",
		"[LV 1]^777777 9 x 9 cells^000000",
		"[LV 2]^777777 9 x 9 cells^000000",
		"[LV 3]^777777 11 x 11 cells^000000",
		"[LV 4]^777777 13 x 13 cells^000000",
		"[LV 5]^777777 15 x 15 cells^000000",
	].join("\n");

	SkillDescription[SKID.WM_SATURDAY_NIGHT_FEVER] = [
		"Saturday Night Fever",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Unique / Chorus^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Throws all targets on screen including yourself into a frenzy. While in frenzy you can't recover HP or SP, your attack power increases, and your defense and evasion drop considerably. Additionally you cannot use skills or items. When the frenzy effect ends, you're forced to sit for 10 seconds. If more than 7 people enter frenzy at once, all players affected receive 9999 damage from the god of madness.^000000",
		"[LV 1]^777777 Drains 2% HP/SP every 3 sec, ATK +100, DEF -20%, Evasion -50%^000000",
		"[LV 2]^777777 Drains 3% HP/SP every 3 sec, ATK +200, DEF -30%, Evasion -60%^000000",
		"[LV 3]^777777 Drains 4% HP/SP every 3 sec, ATK +300, DEF -40%, Evasion -70%^000000",
		"[LV 4]^777777 Drains 5% HP/SP every 3 sec, ATK +400, DEF -50%, Evasion -80%^000000",
		"[LV 5]^777777 Drains 6% HP/SP every 3 sec, ATK +500, DEF -60%, Evasion -90%^000000",
	].join("\n");

	SkillDescription[SKID.WM_LERADS_DEW] = [
		"Lerad's Dew",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Buff / Chorus^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 10+10*SkillLV sec^000000",
		"Effect:^777777 Boosts max HP of party members on screen. Does not have any effect on Berserk characters. The amount of HP gained is greatly increased by the number of Wanderers/Minstrels in the party.^000000",
		"[LV 1]^777777 Max HP +5%^000000",
		"[LV 2]^777777 Max HP +10%^000000",
		"[LV 3]^777777 Max HP +15%^000000",
		"[LV 4]^777777 Max HP +20%^000000",
		"[LV 5]^777777 Max HP +25%^000000",
	].join("\n");

	SkillDescription[SKID.WM_MELODYOFSINK] = [
		"Melody of Sink",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Buff / Chorus^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 10+10*SkillLV sec^000000",
		"Effect:^777777 Increases magic attack power of all targets in a radius around you, while decreasing physical attack power. If the skill is overlapped with Warcry of Beyond, the last skill effect takes priority. The effect is increased by the number of Wanderers/Minstrels in party.^000000",
		"[LV 1]^777777 5% MATK, -5% ATK^000000",
		"[LV 2]^777777 10% MATK, -10% ATK^000000",
		"[LV 3]^777777 15% MATK, -15% ATK^000000",
		"[LV 4]^777777 20% MATK, -20% ATK^000000",
		"[LV 5]^777777 25% MATK, -25% ATK^000000",
	].join("\n");

	SkillDescription[SKID.WM_BEYOND_OF_WARCRY] = [
		"Warcry of Beyond",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Buff / Chorus^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 10+10*SkillLV sec^000000",
		"Effect:^777777 Increases physical attack power of all targets in a radius around you, while decreasing magic attack power. If the skill is overlapped with Melody of Sink, the last skill effect takes priority. The effect is increased by the number of Wanderers/Minstrels in party.^000000",
		"[LV 1]^777777 5% ATK, -5% MATK^000000",
		"[LV 2]^777777 10% ATK, -10% MATK^000000",
		"[LV 3]^777777 15% ATK, -15% MATK^000000",
		"[LV 4]^777777 20% ATK, -20% MATK^000000",
		"[LV 5]^777777 25% ATK, -25% MATK^000000",
	].join("\n");

	SkillDescription[SKID.WM_UNLIMITED_HUMMING_VOICE] = [
		"Unlimited Humming Voice",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Buff / Chorus^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 10+10*SkillLV sec^000000",
		"Effect:^777777 Requires Instrument or Whip. Makes all skills and magic cast in a radius around you un-interruptable. However skills consume 15% more SP. If there are more Wanderers/Minstrels in party the increased SP consumption decreases.^000000",
		"[LV 1]^777777 Range 11 x 11 / Duration 60 seconds^000000",
		"[LV 2]^777777 Range 11 x 11 / Duration 90 seconds^000000",
		"[LV 3]^777777 Range 13 x 13 / Duration 120 seconds^000000",
		"[LV 4]^777777 Range 13 x 13 / Duration 150 seconds^000000",
		"[LV 5]^777777 Range 15 x 15 / Duration 180 seconds^000000",
	].join("\n");

	SkillDescription[SKID.SO_FIREWALK] = [
		"Fire Walk",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Special / Damage^000000",
		"SP Cost:^777777 26+4*SkillLV^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 10+2*SkillLV sec^000000",
		"Effect:^777777 Generates fire under the feet of the caster, leaving a trail of fire element damage zones when you walk.^000000",
		"[LV 1]^777777 Up to 8 areas^000000",
		"[LV 2]^777777 Up to 10 areas^000000",
		"[LV 3]^777777 Up to 12 areas^000000",
		"[LV 4]^777777 Up to 14 areas^000000",
		"[LV 5]^777777 Up to 16 areas^000000",
	].join("\n");

	SkillDescription[SKID.SO_ELECTRICWALK] = [
		"Electric Walk",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Special / Damage^000000",
		"SP Cost:^777777 26+4*SkillLV^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 10+2*SkillLV sec^000000",
		"Effect:^777777 Generates thunder under the feet of the caster, leaving a trail of wind element damage zones when you walk.^000000",
		"[LV 1]^777777 Up to 8 areas^000000",
		"[LV 2]^777777 Up to 10 areas^000000",
		"[LV 3]^777777 Up to 12 areas^000000",
		"[LV 4]^777777 Up to 14 areas^000000",
		"[LV 5]^777777 Up to 16 areas^000000",
	].join("\n");

	SkillDescription[SKID.SO_SPELLFIST] = [
		"Spell Fist",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Special / Damage^000000",
		"SP Cost:^777777 36+4*SkillLV^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 15+5*SkillLV sec^000000",
		"Effect:^777777 Usable while casting fire/cold/lightening bolt, the bolt skill cast is interrupted and the magic power converges on the user's hands. While in this state your physical attacks will deal magic damage of the bolt. Higher skill level increases the damage. After a set duration or a number of hits have been dealt, the skill will cancel.^000000",
		"[LV 1]^777777 2 hits^000000",
		"[LV 2]^777777 3 hits^000000",
		"[LV 3]^777777 4 hits^000000",
		"[LV 4]^777777 5 hits^000000",
		"[LV 5]^777777 6 hits^000000",
	].join("\n");

	SkillDescription[SKID.SO_EARTHGRAVE] = [
		"Earth Grave",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Summons numerous spikes from the ground that deals Earth element damage to all targets in the range, and may cause Bleeding status.^000000",
		"[LV 1]^777777 7x7 cells^000000",
		"[LV 2]^777777 7x7 cells^000000",
		"[LV 3]^777777 7x7 cells^000000",
		"[LV 4]^777777 9x9 cells^000000",
		"[LV 5]^777777 9x9 cells^000000",
	].join("\n");

	SkillDescription[SKID.SO_DIAMONDDUST] = [
		"Diamond Dust",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Calls a Cold Chill of Storm onto a targeted cell that deals Water Element Magic Damage that may cause Freezing status.^000000",
		"[LV 1]^777777 7x7 cells^000000",
		"[LV 2]^777777 7x7 cells^000000",
		"[LV 3]^777777 7x7 cells^000000",
		"[LV 4]^777777 9x9 cells^000000",
		"[LV 5]^777777 9x9 cells^000000",
	].join("\n");

	SkillDescription[SKID.SO_POISON_BUSTER] = [
		"Poison Buster",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 50+20*SkillLV^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Activates the poison within a target, causing the target to take large damage. When the skill is used it cancels poison status on the target. Has no effect on poison attribute monsters.^000000",
	].join("\n");

	SkillDescription[SKID.SO_PSYCHIC_WAVE] = [
		"Psychic Wave",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Fire's a wave of psychic energy at targets in range to deal multiple hits of neutral element magic damage. All targets that receive damage have a chance to be stunned.^000000",
		"[LV 1]^777777 7x7 cells, 3 hits, SP Cost 48^000000",
		"[LV 2]^777777 7x7 cells, 4 hits, SP Cost 56^000000",
		"[LV 3]^777777 9x9 cells, 5 hits, SP Cost 64^000000",
		"[LV 4]^777777 9x9 cells, 6 hits, SP Cost 70^000000",
		"[LV 5]^777777 11x11 cells, 7 hits, SP Cost 78^000000",
	].join("\n");

	SkillDescription[SKID.SO_CLOUD_KILL] = [
		"Cloud Kill",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 6+2*SkillLV sec^000000",
		"Effect:^777777 Summons a 7x7 radius poisonous cloud at a target location, continually dealing poison element damage and causing poison status. Targets that take damage have a chance to be changed to poison attribute.^000000",
		"[LV 1]^777777 SP Cost 48^000000",
		"[LV 2]^777777 SP Cost 56^000000",
		"[LV 3]^777777 SP Cost 64^000000",
		"[LV 4]^777777 SP Cost 70^000000",
		"[LV 5]^777777 SP Cost 78^000000",
	].join("\n");

	SkillDescription[SKID.SO_STRIKING] = [
		"Striking",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Buff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 60 sec^000000",
		"Effect:^777777 Increases your own and your party member's weapon attack power and critical rate.^000000",
		"[LV 1]^777777 ATK +100, Critical Rate +1^000000",
		"[LV 2]^777777 ATK +150, Critical Rate +2^000000",
		"[LV 3]^777777 ATK +200, Critical Rate +3^000000",
		"[LV 4]^777777 ATK +250, Critical Rate +4^000000",
		"[LV 5]^777777 ATK +300, Critical Rate +5^000000",
	].join("\n");

	SkillDescription[SKID.SO_WARMER] = [
		"Warmer",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 35+5*SkillLV sec^000000",
		"Effect:^777777 Cancels Freezing and Frozen status in 7x7 AoE and prevents Freezing and Frozen for a certain duration. Also heals the target(s) every second for some amount of hp.^000000",
	].join("\n");

	SkillDescription[SKID.SO_VACUUM_EXTREME] = [
		"Vacuum Extreme",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Special^000000",
		"SP Cost:^777777 60+4*SkillLV^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 4+1*SkillLV^000000",
		"Effect:^777777 Creates a vacuum at a target cell, that suspends all targets in a 7x7 area. Targets affected cannot move until the skill has ended.^000000",
	].join("\n");

	SkillDescription[SKID.SO_VARETYR_SPEAR] = [
		"Varetyr Spear",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Deals Wind element Physical and Magical damage (MATK + ATK) and has a chance to stun the target.^000000",
		"[LV 1]^777777 3x3 cells^000000",
		"[LV 2]^777777 3x3 cells^000000",
		"[LV 3]^777777 5x5 cells^000000",
		"[LV 4]^777777 5x5 cells^000000",
		"[LV 5]^777777 7x7 cells^000000",
	].join("\n");

	SkillDescription[SKID.SO_ARRULLO] = [
		"Arrullo",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Special^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Duration:^777777 5+5*SkillLV sec^000000",
		"Effect:^777777 Causes [Deep Sleep] status on the target and surrounding cells. Disables chat while sleeping. Higher level increases success rate.^000000",
		"[LV 1]^777777 3x3 cells^000000",
		"[LV 2]^777777 3x3 cells^000000",
		"[LV 3]^777777 5x5 cells^000000",
		"[LV 4]^777777 5x5 cells^000000",
		"[LV 5]^777777 7x7 cells^000000",
	].join("\n");

	SkillDescription[SKID.SO_SUMMON_AGNI] = [
		"Summon Agni",
		"Max Level: ^777777 3^000000",
		"Type:^777777 Active^000000",
		"Effect:^777777 Summons a spirit of Thor, Agni. Summoning costs [3 Red Blood / 6 Red Blood / 1 Flame Heart] depending on skill level.^000000",
		"[LV 1]^777777 Duration 600s / Every 10s drains 5 SP^000000",
		"[LV 2]^777777 Duration 900s / Every 10s drains 8 SP^000000",
		"[LV 3]^777777 Duration 1200s / Every 10s drains 11 SP^000000",
	].join("\n");

	SkillDescription[SKID.SO_SUMMON_AQUA] = [
		"Summon Aqua",
		"Max Level: ^777777 3^000000",
		"Type:^777777 Active^000000",
		"Effect:^777777 Summons a spirit of water, Aqua. Summoning costs [3 Crystal Blue / 6 Crystal Blue / 1 Mystic Frozen] depending on skill level.^000000",
		"[LV 1]^777777 Duration 600s / Every 10s drains 5 SP^000000",
		"[LV 2]^777777 Duration 900s / Every 10s drains 8 SP^000000",
		"[LV 3]^777777 Duration 1200s / Every 10s drains 11 SP^000000",
	].join("\n");

	SkillDescription[SKID.SO_SUMMON_VENTUS] = [
		"Summon Ventus",
		"Max Level: ^777777 3^000000",
		"Type:^777777 Active^000000",
		"Effect:^777777 Summons Ventus, a spirit of wind. Summoning costs [3 Wind of Verdure / 6 Wind of Verdure / 1 Rough Wind] depending on skill level.^000000",
		"[LV 1]^777777 Duration 600s / Every 10s drains 5 SP^000000",
		"[LV 2]^777777 Duration 900s / Every 10s drains 8 SP^000000",
		"[LV 3]^777777 Duration 1200s / Every 10s drains 11 SP^000000",
	].join("\n");

	SkillDescription[SKID.SO_SUMMON_TERA] = [
		"Summon Tera",
		"Max Level: ^777777 3^000000",
		"Type:^777777 Active^000000",
		"Effect:^777777 Summons Tera, spirit of Earth. Summoning costs [3 Green Live / 6 Green Live / 1 Great Nature] depending on skill level.^000000",
		"[LV 1]^777777 Duration 600s / Every 10s drains 5 SP^000000",
		"[LV 2]^777777 Duration 900s / Every 10s drains 8 SP^000000",
		"[LV 3]^777777 Duration 1200s / Every 10s drains 11 SP^000000",
	].join("\n");
	
	SkillDescription[SKID.SO_EL_CONTROL] = [
		"Spirit Control",
		"Max Level: ^777777 4^000000",
		"Type:^777777 Active^000000",
		"Effect:^777777 Switches your summoned spirit from Standby Mode to passive (buff) mode, defensive mode, and offensive mode. Using the skill again returns the spirit to standby mode. While in standby, the spirit will recover HP and SP faster.^000000",
		"[LV 1]^777777 Change the Spirit to Passive Mode^000000",
		"[LV 2]^777777 Change the Spirit to Defensive Mode^000000",
		"[LV 3]^777777 Change the Spirit to Offensive Mode^000000",
		"[LV 4]^777777 Cancles the currently Summoned Spirit^000000",
	].join("\n");
	
	SkillDescription[SKID.SO_EL_ACTION] = [
		"Elemental Action",
		"Max Level: ^777777 1^000000",
		"Type:^777777 Active^000000",
		"Effect:^777777 Instantly switches your spirit to offensive mode.^000000",
	].join("\n");

	SkillDescription[SKID.SO_EL_ANALYSIS] = [
		"Four Spirit Analysis",
		"Max Level: ^777777 2^000000",
		"Type:^777777 Active^000000",
		"Effect:^777777 Allows you to synthesize elemental stones into kinds needed for summoning elemental spirits.^000000",
		"[LV 1]^777777 Splits elemental stones into elemental stone ore . (Using Flame Heart, Rough Wind, Mystic Frozen, Great Nature you can create Red Blood, Wind of Verdure, Crystal Blue, Yellow Live. The number created is random)^000000",
		"[LV 2]^777777 Combines elemental stone ore into elemental stones. (10 Red Blood, Wind of Verdure, Crystal Blue or Yellow Live can be used to create Flame Heart, Rough Wind, Mystic Frozen, or Great Nature). Synthesis can fail, resulting in loss of items^000000",
	].join("\n");

	SkillDescription[SKID.SO_EL_SYMPATHY] = [
		"Spirit Sympathy",
		"Max Level: ^777777 5^000000",
		"Type:^777777 Passive^000000",
		"Effect:^777777 Increases the HP, SP, and attack power of elemental spirits you summon, as well as decrease the SP cost of summoning those spirits.^000000",
		"[LV 1]^777777 HP +5%, SP +5% / Attack + 25 / Summoning Cost -10%^000000",
		"[LV 2]^777777 HP +10%, SP +10% / Attack + 50 / Summoning Cost -15%^000000",
		"[LV 3]^777777 HP +15%, SP +15% / Attack + 75 / Summoning Cost -20%^000000",
		"[LV 4]^777777 HP +20%, SP +20% / Attack + 100 / Summoning Cost -25%^000000",
		"[LV 5]^777777 HP +25%, SP +25% / Attack + 125 / Summoning Cost -30%^000000",
	].join("\n");

	SkillDescription[SKID.SO_EL_CURE] = [
		"Spirit Recovery",
		"Max Level: ^777777 1^000000",
		"Type:^777777 Active / Recovery^000000",
		"Effect:^777777 Consumes your own HP and SP and uses it to recover the HP and SP of a spirit.^000000",
	].join("\n");

	SkillDescription[SKID.SO_FIRE_INSIGNIA] = [
		"Fire Insignia",
		"Max Level: ^777777 3^000000",
		"Type:^777777 Active / Ground Magic^000000",
		"Effect:^777777 Creates a 3x3 fire crest on the ground, which recovers 1% HP every 5 seconds for fire monsters and players with fire attribute armor. Targets of the opposite element Earth will lose 1% HP every 5 seconds. When in range water element attacks deal 1.5 times damage. The skill consumes [1/2/3 Scarlet Point] depending on the skill level.^000000",
		"[LV 1]^777777 Increases the fire spirit Agni's attack power by 20%. HP and SP recovered every 3 seconds is doubled^000000",
		"[LV 2]^777777 Attack Power + 50. Weapon attribute becomes fire property. Physical attack power + 10%^000000",
		"[LV 3]^777777 Magic Attack Power + 50. When using fire attribute damage, damage + 25%^000000",
	].join("\n");

	SkillDescription[SKID.SO_WATER_INSIGNIA] = [
		"Water Insignia",
		"Max Level: ^777777 3^000000",
		"Type:^777777 Active / Ground Magic^000000",
		"Effect:^777777 Creates a 3x3 water crest on the ground, which recovers 1% HP every 5 seconds for water monsters and players with water attribute armor. Targets of the opposite element fire will lose 1% HP every 5 seconds. When in range wind element attacks deal 1.5 times damage. The skill consumes [1/2/3 Indigo Point] depending on the skill level.^000000",
		"[LV 1]^777777 Increases the water spirit Aqua's attack power by 20%. HP and SP recovered every 3 seconds is doubled^000000",
		"[LV 2]^777777 Heal recovery + 10%. Weapon attribute becomes water property. Physical attack power + 10%^000000",
		"[LV 3]^777777 When casting water attribute magic, variable cast time -30%. When using water attribute magic, damage + 25%^000000",
	].join("\n");

	SkillDescription[SKID.SO_WIND_INSIGNIA] = [
		"Wind Insignia",
		"Max Level: ^777777 3^000000",
		"Type:^777777 Active / Ground Magic^000000",
		"Effect:^777777 Creates a 3x3 wind crest on the ground, which recovers 1% HP every 5 seconds for wind monsters and players with wind attribute armor. Targets of the opposite element water will lose 1% HP every 5 seconds. When in range earth element attacks deal 1.5 times damage. The skill consumes [1/2/3 Yellow Wish Point] depending on the skill level.^000000",
		"[LV 1]^777777 Increases the wind spirit Ventus's attack power by 20%. HP and SP recovered every 3 seconds is doubled^000000",
		"[LV 2]^777777 Gives a small increase in attack speed. Weapon attribute becomes water property. Physical attack power + 10%^000000",
		"[LV 3]^777777 When casting wind attribute magic, skill delay time -50%. When using wind attribute magic, damage + 25%^000000",
	].join("\n");

	SkillDescription[SKID.SO_EARTH_INSIGNIA] = [
		"Earth Insignia",
		"Max Level: ^777777 3^000000",
		"Type:^777777 Active / Ground Magic^000000",
		"Effect:^777777 Creates a 3x3 earth crest on the ground, which recovers 1% HP every 5 seconds for earth monsters and players with earth attribute armor. Targets of the opposite element wind will lose 1% HP every 5 seconds. When in range fire element attacks deal 1.5 times damage. The skill consumes [1/2/3 Lime Green Point] depending on the skill level.^000000",
		"[LV 1]^777777 Increases the earth spirit Tera's attack power by 20%. HP and SP recovered every 3 seconds is doubled^000000",
		"[LV 2]^777777 Max HP + 500, DEF + 50. Weapon attribute becomes earth property. Physical attack power + 10%^000000",
		"[LV 3]^777777 Max SP + 50, MDEF + 50. When using earth attribute magic, damage + 25%^000000",
	].join("\n");

	SkillDescription[SKID.EL_AQUAPLAY] = [

	].join("\n");

	SkillDescription[SKID.EL_BLAST] = [

	].join("\n");

	SkillDescription[SKID.EL_CHILLY_AIR] = [

	].join("\n");

	SkillDescription[SKID.EL_CIRCLE_OF_FIRE] = [

	].join("\n");

	SkillDescription[SKID.EL_COOLER] = [

	].join("\n");

	SkillDescription[SKID.EL_CURSED_SOIL] = [

	].join("\n");

	SkillDescription[SKID.EL_FIRE_ARROW] = [

	].join("\n");

	SkillDescription[SKID.EL_FIRE_BOMB] = [

	].join("\n");

	SkillDescription[SKID.EL_FIRE_BOMB_ATK] = [

	].join("\n");

	SkillDescription[SKID.EL_FIRE_CLOAK] = [

	].join("\n");

	SkillDescription[SKID.EL_FIRE_MANTLE] = [

	].join("\n");

	SkillDescription[SKID.EL_FIRE_WAVE] = [

	].join("\n");

	SkillDescription[SKID.EL_FIRE_WAVE_ATK] = [

	].join("\n");

	SkillDescription[SKID.EL_GUST] = [

	].join("\n");

	SkillDescription[SKID.EL_HEATER] = [

	].join("\n");

	SkillDescription[SKID.EL_HURRICANE] = [

	].join("\n");

	SkillDescription[SKID.EL_HURRICANE_ATK] = [

	].join("\n");

	SkillDescription[SKID.EL_ICE_NEEDLE] = [

	].join("\n");

	SkillDescription[SKID.EL_PETROLOGY] = [

	].join("\n");

	SkillDescription[SKID.EL_POWER_OF_GAIA] = [

	].join("\n");

	SkillDescription[SKID.EL_PYROTECHNIC] = [

	].join("\n");

	SkillDescription[SKID.EL_ROCK_CRUSHER] = [

	].join("\n");

	SkillDescription[SKID.EL_ROCK_CRUSHER_ATK] = [

	].join("\n");

	SkillDescription[SKID.EL_SOLID_SKIN] = [

	].join("\n");

	SkillDescription[SKID.EL_STONE_HAMMER] = [

	].join("\n");

	SkillDescription[SKID.EL_STONE_RAIN] = [

	].join("\n");

	SkillDescription[SKID.EL_STONE_SHIELD] = [

	].join("\n");

	SkillDescription[SKID.EL_TIDAL_WEAPON] = [

	].join("\n");

	SkillDescription[SKID.EL_TROPIC] = [

	].join("\n");

	SkillDescription[SKID.EL_TYPOON_MIS] = [

	].join("\n");

	SkillDescription[SKID.EL_TYPOON_MIS_ATK] = [

	].join("\n");

	SkillDescription[SKID.EL_UPHEAVAL] = [

	].join("\n");

	SkillDescription[SKID.EL_WATER_BARRIER] = [

	].join("\n");

	SkillDescription[SKID.EL_WATER_DROP] = [

	].join("\n");

	SkillDescription[SKID.EL_WATER_SCREEN] = [

	].join("\n");

	SkillDescription[SKID.EL_WATER_SCREW] = [

	].join("\n");

	SkillDescription[SKID.EL_WATER_SCREW_ATK] = [

	].join("\n");

	SkillDescription[SKID.EL_WILD_STORM] = [

	].join("\n");

	SkillDescription[SKID.EL_WIND_CURTAIN] = [

	].join("\n");

	SkillDescription[SKID.EL_WIND_SLASH] = [

	].join("\n");

	SkillDescription[SKID.EL_WIND_STEP] = [

	].join("\n");

	SkillDescription[SKID.EL_ZEPHYR] = [

	].join("\n");

	SkillDescription[SKID.GN_TRAINING_SWORD] = [
		"Sword Training",
		"Max Level:^777777 5^000000",
		"Type:^777777 Passive^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Through training, you achieve higher attack power, accuracy, and speed when using one-hand sword or dagger.^000000",
		"[LV 1]^777777 ATK +10, HIT +3^000000",
		"[LV 2]^777777 ATK +20, HIT +6^000000",
		"[LV 3]^777777 ATK +30, HIT +9^000000",
		"[LV 4]^777777 ATK +40, HIT +12^000000",
		"[LV 5]^777777 ATK +50, HIT +15^000000",
	].join("\n");

	SkillDescription[SKID.GN_REMODELING_CART] = [
		"Cart Remodeling",
		"Max Level:^777777 5^000000",
		"Type:^777777 Passive^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Improves your cart, increasing accuracy with Cart Revolution, Cart Tornado, and Cart Cannon. Increases max weight limit of your cart as well.^000000",
		"[LV 1]^777777 Weight +500, Cart Skill HIT +4^000000",
		"[LV 2]^777777 Weight +1000, Cart Skill HIT +8^000000",
		"[LV 3]^777777 Weight +1500, Cart Skill HIT +12^000000",
		"[LV 4]^777777 Weight +2000, Cart Skill HIT +16^000000",
		"[LV 5]^777777 Weight +2500, Cart Skill HIT +20^000000",
	].join("\n");

	SkillDescription[SKID.GN_CART_TORNADO] = [
		"Cart Tornado",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Swings your cart around you and striking all targets within 2 cells around you. Targets that are hit will be stunned and pushed back 2 cells. Requires a cart to be used. Cart Remodeling greatly increases the damage of this skill.^000000",
		"[LV 1]^777777 150% ATK + Cart Remodeling Level^000000",
		"[LV 2]^777777 200% ATK + Cart Remodeling Level^000000",
		"[LV 3]^777777 250% ATK + Cart Remodeling Level^000000",
		"[LV 4]^777777 300% ATK + Cart Remodeling Level^000000",
		"[LV 5]^777777 350% ATK + Cart Remodeling Level^000000",
	].join("\n");

	SkillDescription[SKID.GN_CARTCANNON] = [
		"Cart Cannon",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Fire's a gun from your cart to deal large damage to a single target. Requires a cart to be used. The user's INT and Cart Remodeling skill level greatly increases the damage of this skill.^000000",
		"[LV 1]^777777 400% ATK + Cart Remodeling Level^000000",
		"[LV 2]^777777 450% ATK + Cart Remodeling Level^000000",
		"[LV 3]^777777 500% ATK + Cart Remodeling Level^000000",
		"[LV 4]^777777 550% ATK + Cart Remodeling Level^000000",
		"[LV 5]^777777 600% ATK + Cart Remodeling Level^000000",
	].join("\n");

	SkillDescription[SKID.GN_CARTBOOST] = [
		"Cart Boost",
		"Max Level:^777777 5^000000",
		"Type:^777777 Self Buff^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Increases the users movement speed and attack power for 90 seconds. Requires a cart to be used.^000000",
		"[LV 1]^777777 Movement Speed +50%, ATK +10^000000",
		"[LV 2]^777777 Movement Speed +50%, ATK +20^000000",
		"[LV 3]^777777 Movement Speed +75%, ATK +30^000000",
		"[LV 4]^777777 Movement Speed +75%, ATK +40^000000",
		"[LV 5]^777777 Movement Speed +100%, ATK +50^000000",
	].join("\n");

	SkillDescription[SKID.GN_THORNS_TRAP] = [
		"Thorn Trap",
		"Max Level:^777777 5^000000",
		"Type:^777777 Special / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Throws a thorn trap onto a cell which binds the enemy's feet. While the target is trapped, they receive damage over time. If the target is hit by a Fire attribute attack, the thorn trap is destroyed. Consumes 1 Thorny Seed.^000000",
		"[LV 1]^777777 Duration 10 sec^000000",
		"[LV 2]^777777 Duration 12 sec^000000",
		"[LV 3]^777777 Duration 14 sec^000000",
		"[LV 4]^777777 Duration 16 sec^000000",
		"[LV 5]^777777 Duration 18 sec^000000",
	].join("\n");

	SkillDescription[SKID.GN_BLOOD_SUCKER] = [
		"Blood Sucker",
		"Max Level:^777777 5^000000",
		"Type:^777777 Special / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Attach a blood sucking plant that can absorb life energy to a target, which as the target takes damage the caster recovers some HP. Up to 3 blood suckers can be active at once. If the user and target are over 12 cells apart, the blood sucker will fall off. Consumes 1 Blood Sucker Seed.^000000",
		"[LV 1]^777777 Duration 20 sec^000000",
		"[LV 2]^777777 Duration 22 sec^000000",
		"[LV 3]^777777 Duration 24 sec^000000",
		"[LV 4]^777777 Duration 26 sec^000000",
		"[LV 5]^777777 Duration 28 sec^000000",
	].join("\n");

	SkillDescription[SKID.GN_SPORE_EXPLOSION] = [
		"Spore Explosion",
		"Max Level:^777777 5^000000",
		"Type:^777777 Special / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Attach an explosive mushroom spore to a target. After a short period of time, the mushroom spores will explode, and damaging not just the target but dealing magical damage to anyone in range. Skill level increases the radius of the explosion. Consumes 1 Explosive Mushroom Spore.^000000",
		"[LV 1]^777777 Radius 3x3 cells, Detonates in 2 sec^000000",
		"[LV 2]^777777 Radius 5x5 cells, Detonates in 2 sec^000000",
		"[LV 3]^777777 Radius 7x7 cells, Detonates in 3 sec^000000",
		"[LV 4]^777777 Radius 9x9 cells, Detonates in 3 sec^000000",
		"[LV 5]^777777 Radius 11x11 cells, Detonates in 4 sec^000000",
	].join("\n");

	SkillDescription[SKID.GN_WALLOFTHORN] = [
		"Wall Of Thorns",
		"Max Level:^777777 5^000000",
		"Type:^777777 Special / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 2 sec^000000",
		"Effect:^777777 Creates a barrier of thorns around a target location. If a target touches the wall, it will advance on them and deal damage. The wall can be attacked, and if it takes enough damage, it automatically cancels. If the wall is struck with a Fire attribute attack, it becomes a Firewall. Only one Wall Of Thorns can be active at once. Consumes 1 Thorny Seed.^000000",
		"[LV 1]^777777 Duration 10 sec^000000",
		"[LV 2]^777777 Duration 11 sec^000000",
		"[LV 3]^777777 Duration 12 sec^000000",
		"[LV 4]^777777 Duration 13 sec^000000",
		"[LV 5]^777777 Duration 14 sec^000000",
	].join("\n");

	SkillDescription[SKID.GN_CRAZYWEED] = [
		"Crazy Weed",
		"Max Level:^777777 10^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Cast Time:^777777 3 sec^000000",
		"Cool Down:^777777 5 sec ^000000",
		"Effect:^777777 Summons a huge plant mass that deals Earth element damage to all nearby targets and destroys any ground target ability in the area. Skill level increases the damage and the number of plant masses you can summon.^000000",
		"[LV 1]^777777 600% ATK, Up to 3^000000",
		"[LV 2]^777777 700% ATK, Up to 4^000000",
		"[LV 3]^777777 800% ATK, Up to 4^000000",
		"[LV 4]^777777 900% ATK, Up to 5^000000",
		"[LV 5]^777777 1000% ATK, Up to 5^000000",
		"[LV 6]^777777 1100% ATK, Up to 6^000000",
		"[LV 7]^777777 1200% ATK, Up to 6^000000",
		"[LV 8]^777777 1300% ATK, Up to 7^000000",
		"[LV 9]^777777 1400% ATK, Up to 7^000000",
		"[LV 10]^777777 1500% ATK, Up to 8^000000",
	].join("\n");

	SkillDescription[SKID.GN_DEMONIC_FIRE] = [
		"Demonic Fire",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"Catalyst:^777777 1 Bottle Grenade^000000",
		"Effect:^777777 Throws a bottle grenade to create a sea of fire. Any target inside the area of the skill will receive continuous damage and have a chance to receive Burning status effect. Consumes 1 Bottle Grenade.^000000",
		"[LV 1]^777777 130% MATK, Duration 10 sec, Burning Chance 8%^000000",
		"[LV 2]^777777 150% MATK, Duration 12 sec, Burning Chance 12%^000000",
		"[LV 3]^777777 170% MATK, Duration 14 sec, Burning Chance 16%^000000",
		"[LV 4]^777777 190% MATK, Duration 16 sec, Burning Chance 20%^000000",
		"[LV 5]^777777 210% MATK, Duration 18 sec, Burning Chance 24%^000000",
	].join("\n");

	SkillDescription[SKID.GN_FIRE_EXPANSION] = [
		"Fire Expansion",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Special / Damage^000000",
		"Effect:^777777 If used on an area that has a Demonic Fire, the skill causes various effects depending on what you throw.^000000",
		"[LV 1]^777777 1 Oil Bottle, Demonic Fire Damage / Duration + 10 sec^000000",
		"[LV 2]^777777 1 Explosive Powder, Increases Demonic Fire damage based on INT / Cancels Demonic Fire^000000",
		"[LV 3]^777777 1 Smokescreen Powder, Demonic Fire becomes a smokescreen / Reduces ranged damage / Increases evasion^000000",
		"[LV 4]^777777 1 Tear Gas, Demonic Fire becomes teargas / Drains HP and reduces accuracy and evasion^000000",
		"[LV 5]^777777 1 Acid Bottle, Demonic Fire becomes Acid Bomb / Uses the highest level learned of Acid Bomb^000000",
	].join("\n");

	SkillDescription[SKID.GN_HELLS_PLANT] = [
		"Hell's Plant",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Special / Damage^000000",
		"Cast Time:^777777 3 sec^000000",
		"Duration:^777777 40 sec^000000",
		"Catalyst:^777777 1 Plant Bottle ^000000",
		"Effect:^777777 Summons a plant from hell onto the ground, which attacks nearby enemies dealing damage as well as causing Stun and Bleeding status.^000000",
		"[LV 1]^777777 Max Summons 2, Bleeding chance 10%, Stun chance 30%^000000",
		"[LV 2]^777777 Max Summons 3, Bleeding chance 15%, Stun chance 40%^000000",
		"[LV 3]^777777 Max Summons 4, Bleeding chance 20%, Stun chance 50%^000000",
		"[LV 4]^777777 Max Summons 5, Bleeding chance 25%, Stun chance 60%^000000",
		"[LV 5]^777777 Max Summons 6, Bleeding chance 30%, Stun chance 70%^000000",
	].join("\n");

	SkillDescription[SKID.GN_MANDRAGORA] = [
		"Howling of Mandragora",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Special / Damage^000000",
		"SP Cost:^777777 35 + 5 * SkillLv^000000",
		"Cast Time:^777777 1 sec^000000",
		"Cool Down:^777777 10 sec ^000000",
		"Duration:^777777 5 + 5 * SkillLv^000000",
		"Catalyst:^777777 1 Potted Mandragora ^000000",
		"Effect:^777777 Pulls a live Mandragora from the ground which releases a wild scream that lowers the INT of nearby targets and drains their SP. Increases the fixed casting time of all skills. The chance of success is reduced by the VIT and LUK of the target.^000000",
		"[LV 1]^777777 Range 11 x 11 / INT -4 / SP -30%^000000",
		"[LV 2]^777777 Range 13 x 13 / INT -8 / SP -35%^000000",
		"[LV 3]^777777 Range 13 x 13 / INT -12 / SP -40%^000000",
		"[LV 4]^777777 Range 15 x 15 / INT -16 / SP -45%^000000",
		"[LV 5]^777777 Range 15 x 15 / INT -20 / SP -50%^000000",
	].join("\n");

	SkillDescription[SKID.GN_SLINGITEM] = [
		"Sling Item",
		"Max Level:^777777 1^000000",
		"Type:^777777 Active^000000",
		"Effect:^777777 Throws a fruit bomb or other items classified as Throwing type items. Max range is 11 cells.^000000",
	].join("\n");

	SkillDescription[SKID.GN_CHANGEMATERIAL] = [
		"Change Material",
		"Max Level:^777777 1^000000",
		"Type:^777777 Active^000000",
		"Effect:^777777 Combines various items to make new items. However, you can't assume how to make something. If you don't know the item name and use the exact ingredients, the skill will fail. It's said that formulas for synthesized items are available somewhere in the world.^000000",
	].join("\n");

	SkillDescription[SKID.GN_MIX_COOKING] = [
		"Mix Cooking",
		"Max Level:^777777 2^000000",
		"Type:^777777 Active^000000",
		"SP Cost:^777777 5 (SkillLv 1), 40 (SkillLv 2)^000000",
		"Effect:^777777 Mix various ingredients to create incredibly delicious food. If you use level 2 of Mix Cooking, you'll create 10 at a time. You'll need to have a recipe book and ingredients in order to use the skill.^000000",
		"^000000-Savage Full Roast: ^777777 Savage Meat, Iron Cooking Skewer, Bituminous Coal",
		"^000000-Cocktail Warg Blood: ^777777 Wolf's Blood, Cold Ice",
		"^000000-Minor Stew: ^777777 Comodo Tropical Fruit, Seasoned Tough Meat",
		"^000000-Siroma Iced Tea: ^777777 Comodo Tropical Fruit, Powdered Ice, Ice Crystal",
		"^000000-Drosera Herb Salad: ^777777 Drosera Feeler, Stew Jar, Red herb, White herb, Yellow herb",
		"^000000-Petite Tail Noodles: ^777777 Petite Tail, Fine Noodles, Cold Broth",
		"^000000-Black Mass: ^777777 Failure to create food.",
	].join("\n");

	SkillDescription[SKID.GN_MAKEBOMB] = [
		"Create Bomb",
		"Max Level:^777777 2^000000",
		"Type:^777777 Active^000000",
		"SP Cost:^777777 5 (SkillLv 1), 40 (SkillLv 2)^000000",
		"Effect:^777777 Creates explosives out of various kinds of fruit. If you use level 2 of Create Bomb, you'll create 10 at a time. Requires a bomb creation manual.^000000",
		"^000000-Apple Bomb: ^777777 Apple, Scell, Dark Powder, Detonator",
		"^000000-Pineapple Bomb: ^777777 Pineapple, Cactus Needle, 3 Dark Powder, Detonator",
		"^000000-Coconut Bomb: ^777777 Coconut, 2 Dark Powder, Detonator",
		"^000000-Melon Bomb: ^777777 Melon, Sticky Mucus, 2 Dark Powder, Detonator",
		"^000000-Banana Bomb: ^777777 Banana, Mold Powder, 4 Dark Powder, Detonator",
		"^000000-Black Lump: ^777777 Failure to create bomb.",
	].join("\n");

	SkillDescription[SKID.GN_S_PHARMACY] = [
		"Special Pharmacy",
		"Max Level:^777777 10^000000",
		"Type:^777777 Active^000000",
		"SP Cost:^777777 12^000000",
		"Effect:^777777 Allows the Genetic to create a diverse number of potions and drinks. Skill level increases the number of items that can be made at one time. In order to create potions, you'll need to have the correct manual.^000000",
		"^000000-Thorn Seed: ^777777 10 Pricky Fruit",
		"^000000-Blood Sucker Seed:^777777 10 Man-eater Root",
		"^000000-Explosive Mushroom Spore:^777777 10 Mushroom Spore, 5 Poison Mushroom Spore, 2 Black Powder ",
		"^000000-White Potion Z:^777777 10 test tube, 20 white potion, 10 white herb, alcohol",
		"^000000-Vitata 500:^777777 10 test tube, 10 grape, 10 honey, 10 blue herb",
		"^000000-Celomain Soup:^777777 10 test tube, 5 awakening potion, 5 concentration potion, 5 spicy sauce",
		"^000000-Cure Free:^777777 10 test tube, 5 panacea, 20 green herb, 1 mastela fruit, 1 Yggdrasil leaf",
		"^000000-Increase HP Potion (Small):^777777 10 empty bottle, 5 monster good, 10 white herb, spicy sauce",
		"^000000-Increase HP Potion (Medium):^777777 10 empty bottle, 10 white herb, (?) yellow herb, spicy sauce",
		"^000000-Increase HP Potion (Large):^777777 10 test tube, 15 white herb, 3 mastela fruit, holy water, spicy sauce ",
		"^000000-Increase SP Potion (Small):^777777 10 empty bottle, 10 lemon, 10 grape, sweet sauce",
		"^000000-Increase SP Potion (Medium):^777777 10 empty bottle, 10 honey, 10 blue herb, sweet sauce",
		"^000000-Increase SP Potion (Large):^777777 10 empty bottle, 10 royal jelly, 15 blue herb, sweet sauce",
	].join("\n");

	SkillDescription[SKID.AB_SECRAMENT] = [
		"Sacrament",
		"Max Level:^777777 5^000000",
		"Type:^777777 Support^000000",
		"SP Cost:^777777 80+20*SkillLV^000000",
		"Target:^777777 Ally / Self^000000",
		"Cast Time:^777777 2 sec^000000",
		"Duration:^777777 30+30*SkillLV sec^000000",
		"Effect:^777777 A holy ritual performed for an ally that purifies them, decreasing their fixed cast time.^000000",
		"[LV 1]^777777 Fixed Casting Time Decrease 10%^000000",
		"[LV 2]^777777 Fixed Casting Time Decrease 20%^000000",
		"[LV 3]^777777 Fixed Casting Time Decrease 30%^000000",
		"[LV 4]^777777 Fixed Casting Time Decrease 40%^000000",
		"[LV 5]^777777 Fixed Casting Time Decrease 50%^000000",
	].join("\n");

	SkillDescription[SKID.SR_HOWLINGOFLION] = [
		"Howling of Lion",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage (Special)^000000",
		"SP Cost:^777777 Unknown^000000",
		"Target:^777777 Self^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Lets out a deep, deafening roar that damages all targets around you and causes the status effect Fear. If the targets in range were under the effect of a Minstrel or Wanderer song, that effect is removed.^000000",
		"[LV 1]^777777 180% ATK, Radius 5 cells, Fear Chance 10%^000000",
		"[LV 2]^777777 360% ATK, Radius 5 cells, Fear Chance 15%^000000",
		"[LV 3]^777777 540% ATK, Radius 6 cells, Fear Chance 20%^000000",
		"[LV 4]^777777 720% ATK, Radius 6 cells, Fear Chance 25%^000000",
		"[LV 5]^777777 900% ATK, Radius 7 cells, Fear Chance 30%^000000",
	].join("\n");

	SkillDescription[SKID.SR_RIDEINLIGHTNING] = [
		"Ride In Lightening (Lightening Shot)",
		"Max Level:^777777 5^000000",
		"Type:^777777 Active / Damage^000000",
		"SP Cost:^777777 Unknown^000000",
		"Target:^777777 Self^000000",
		"Cast Time:^777777 Unknown^000000",
		"Effect:^777777 Fires your spirit spheres, resulting in an explosion that damages all targets in a wide area. The skill level controls how many spheres you use, and the more spheres shot the higher the damage is. If the user's weapon is endowed with wind element, the skill does additional damage. The user's dex increases the damage done.^000000",
		"[LV 1]^777777 Area of Effect 5x5 cells, Sphere Used 1^000000",
		"[LV 2]^777777 Area of Effect 5x5 cells, Sphere Used 3^000000",
		"[LV 3]^777777 Area of Effect 7x7 cells, Sphere Used 5^000000",
		"[LV 4]^777777 Area of Effect 7x7 cells, Sphere Used 7^000000",
		"[LV 5]^777777 Area of Effect 9x9 cells, Sphere Used 15^000000",
	].join("\n");

	SkillDescription[SKID.ALL_ODINS_RECALL] = [

	].join("\n");

	SkillDescription[SKID.RETURN_TO_ELDICASTES] = [
		"Return To El Dicastes",
		"Max Level:^777777 1^000000",
		"Type:^777777 Active^000000",
		"Effect:^777777 Warps you to the town of El Dicastes.^000000",
	].join("\n");

	SkillDescription[SKID.HLIF_HEAL] = [
		"Touch of Heal",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 + 3*SkillLV ^000000",
		"Target:^777777 Ally ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 This works exactly like the Acolyte's Heal skill, healing the target HP. The healed amount depends only on the Homunculus's LV and INT. ^000000",
		"^00BB00Each cast requires 1 Condensed Red Potion. ^000000",
	].join("\n");

	SkillDescription[SKID.HLIF_AVOID] = [
		"Emergency Avoid",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 15 + 5*SkillLV ^000000",
		"Target:^777777 Self and Master ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 35 + 5*SkillLV sec ^000000",
		"Effect:^777777 Helps avoiding dangerous situations by temporarily increasing player's and Homunculus's movement speed.",
		"MoveSpeed Bonus | Lasting Time ^000000",
		"[LV 1]^777777 10% - 40 Sec ^000000",
		"[LV 2]^777777 20% - 35 Sec ^000000",
		"[LV 3]^777777 30% - 30 Sec ^000000",
		"[LV 4]^777777 40% - 25 Sec ^000000",
		"[LV 5]^777777 50% - 20 Sec ^000000",
	].join("\n");

	SkillDescription[SKID.HLIF_BRAIN] = [
		"Brain Surgery",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 By training the Lif you increase her Maximum SP and SP regeneration rate. This also increases the effect of the Touch of Heal skill.",
		"SP Increase / SP Regen Bonus / HT Bonus ^000000",
		"[LV 1]^777777 1% / 3% / 2% ^000000",
		"[LV 2]^777777 2% / 6% / 4% ^000000",
		"[LV 3]^777777 3% / 9% / 6% ^000000",
		"[LV 4]^777777 4% / 12% / 8% ^000000",
		"[LV 5]^777777 5% / 15% / 10% ^000000",
	].join("\n");

	SkillDescription[SKID.HLIF_CHANGE] = [
		"Mental Change",
		"Max Level:^777777 3 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 Unknown ^000000",
		"Target:^777777 Homunculus self ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 LV 1 600 sec, LV 2 900 sec, LV 3 1200 sec ^000000",
		"Duration:^777777 LV 1 60 sec, LV 2 180 sec, LV 3 300 sec ^000000",
		"Effect:^777777 For the skill's duration, Homunculus's Maximum HP and SP are switched. Non-skill attacks are increased by the Lif's MATK value. Upon activation, Homunculus's HP is fully healed. After the skill's duration has ended, HP and SP are set to 10. ^000000",
		"[LV 1]^777777 60 sec/ 600 sec ^000000",
		"[LV 2]^777777 180 sec/ 900 sec ^000000",
		"[LV 3]^777777 300 sec/ 1200 sec ^000000",
	].join("\n");

	SkillDescription[SKID.HAMI_CASTLE] = [
		"Castling",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 none ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 50 + 10*SkillLV (except LV 5 which is 129 sec) ^000000",
		"Duration:^777777 50 + 10*SkillLV sec ^000000",
		"Effect:^777777 Instantaenuously switch the location of the player and the Homunculus. The monsters that were attacking the player will now attack the Homunculus instead.",
		"[LV 1]^777777 - 20% chance",
		"[LV 2]^777777 - 40% chance",
		"[LV 3]^777777 - 60% chance",
		"[LV 4]^777777 - 80% chance",
		"[LV 5]^777777 - 100% chance ^000000",
	].join("\n");

	SkillDescription[SKID.HAMI_DEFENCE] = [
		"Defense",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 15 + 5*SkillLV ^000000",
		"Target:^777777 Homunculus and Master ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 45 - 5*SkillLV sec ^000000",
		"Effect:^777777 Temporarily increase DEF of the Homunculus and the player. ^000000",
		"[LV 1]^777777 +2 for 40 sec ^000000",
		"[LV 2]^777777 +4 for 35 sec ^000000",
		"[LV 3]^777777 +6 for 30 sec ^000000",
		"[LV 4]^777777 +8 for 25 sec ^000000",
		"[LV 5]^777777 +10 for 20 sec ^000000",
	].join("\n");

	SkillDescription[SKID.HAMI_SKIN] = [
		"Adamantium Skin",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Pernamently increase the DEF, Maximum HP and HP regeneration rate of the Homunculus.",
		"HP Bonus / Regen Bonus / DEF Bonus ^000000",
		"[LV 1]^777777 + 2% / 5% / 4 ^000000",
		"[LV 2]^777777 + 4% / 10% / 8 ^000000",
		"[LV 3]^777777 + 6% / 15% / 12 ^000000",
		"[LV 4]^777777 + 8% / 20% / 16 ^000000",
		"[LV 5]^777777 + 10% / 25% / 20 ^000000",
	].join("\n");

	SkillDescription[SKID.HAMI_BLOODLUST] = [
		"Blood Lust",
		"Max Level:^777777 3 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 120 ^000000",
		"Target:^777777 Homunculus self ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 LV 1 300 sec, LV 2 600 sec, LV 3 900 sec ^000000",
		"Duration:^777777 LV 1 60 sec, LV 2 180 sec, LV 3 300 sec ^000000",
		"Effect:^777777 For the spells duration, Homunculus's damage is increased and every attack has a certain chance to leech 20% of the damage as HP. ^000000",
		"[LV 1]^777777 +130% ATK, 3% leech chance ^000000",
		"[LV 2]^777777 +140% ATK, 6% leech chance ^000000",
		"[LV 3]^777777 +150% ATK, 9% leech chance ^000000",
	].join("\n");

	SkillDescription[SKID.HFLI_MOON] = [
		"Moonlight",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 4*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Order Filir to attack the target with its beak, hitting the target for SkillLV times with a damage bonus of (10+110*SkillLV)%.",
		"Times Hit | Total Damage ^000000",
		"[LV 1]^777777 - 1 - 220% ^000000",
		"[LV 2]^777777 - 2 - 330% ^000000",
		"[LV 3]^777777 - 2 - 440% ^000000",
		"[LV 4]^777777 - 2 - 550% ^000000",
		"[LV 5]^777777 - 3 - 660% ^000000",
	].join("\n");

	SkillDescription[SKID.HFLI_FLEET] = [
		"Fleet Move",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 + 10*SkillLV ^000000",
		"Target:^777777 Homunculus ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 50 + 10*SkillLV (except LV 5 which is 120 sec) ^000000",
		"Duration:^777777 65 - 5*SkillLV sec ^000000",
		"Effect:^777777 Temporarily increase ASPD by +(3*SkillLV)% and Attack Power by (105+5*SkillLV)% of Filir (maybe the increase is only 5+5*SkillLV?).",
		"ASPD Bonus | Damage Bonus | Lasting Time / After-cast Delay ^000000",
		"[LV 1]^777777 - 3% - 110% - 60 sec / 60 sec ^000000",
		"[LV 2]^777777 - 6% - 115% - 55 sec / 70 sec ^000000",
		"[LV 3]^777777 - 9% - 120% - 50 sec / 80 sec ^000000",
		"[LV 4]^777777 - 12% - 125% - 45 sec / 90 sec ^000000",
		"[LV 5]^777777 - 15% - 130% - 40 sec / 120 sec ^000000",
	].join("\n");

	SkillDescription[SKID.HFLI_SPEED] = [
		"Over Speed",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 + 10*SkillLV ^000000",
		"Target:^777777 Homunculus ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 50 + 10*SkillLV (except LV 5 which is 120 sec) ^000000",
		"Duration:^777777 50 + 10*SkillLV sec ^000000",
		"Effect:^777777 Temporarily increase the Flee Rate of your Homunculus by 10+10*SkillLV.",
		"Flee Bonus | Lasting Time / Cool Down ^000000",
		"[LV 1] - 20 - 60 sec / 60 sec ^000000",
		"[LV 2] - 30 - 55 sec / 70 sec ^000000",
		"[LV 3] - 40 - 50 sec / 80 sec ^000000",
		"[LV 4] - 50 - 45 sec / 90 sec ^000000",
		"[LV 5] - 60 - 40 sec / 120 sec ^000000",
	].join("\n");

	SkillDescription[SKID.HFLI_SBR44] = [
		"S.B.R.44",
		"Max Level:^777777 3 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 1 ^000000",
		"Target:^777777 See below ^000000",
		"Range:^777777 Unknown ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Unknown ^000000",
		"Effect:^777777 Lower your Filir's intimacy level in exchange for high damage to a single target. ^000000",
		"[LV 1]^777777 100 * Intimacy Damage ^000000",
		"[LV 2]^777777 200 * Intimacy Damage ^000000",
		"[LV 3]^777777 300 * Intimacy Damage ^000000",
	].join("\n");

	SkillDescription[SKID.HVAN_CAPRICE] = [
		"Caprice",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 20 + 2*SkillLV ^000000",
		"Target:^777777 Enemy ^000000",
		"Cast Time:^777777 Unknown (as Bolts?) ^000000",
		"Cool Down:^777777 Unknown (as Bolts?) ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Use one of the Bolt-type spells. Homunculus decides randomly which one it uses, you can not influence its decision.",
		"The skill level used for the random Bolt-type spell depends on current skill level of Caprice.",
		"LV | Effect ^000000",
		"[LV 1]^777777 LV 1 Bolt ^000000",
		"[LV 2]^777777 LV 2 Bolt ^000000",
		"[LV 3]^777777 LV 3 Bolt ^000000",
		"[LV 4]^777777 LV 4 Bolt ^000000",
		"[LV 5]^777777 LV 5 Bolt ^000000",
	].join("\n");

	SkillDescription[SKID.HVAN_CHAOTIC] = [
		"Chaotic Benediction",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 40 ^000000",
		"Target:^777777 See below ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Unknown ^000000",
		"Effect:^777777 It randomly uses Heal up to the current Chaotic Benediction skill level to either one of the following: Player (you), enemy that you are attacking or Homunculus itself at following success rate.",
		"(^ff0000Enemy^777777 / ^cc0099Homunculus^777777 / ^99cc00Player^777777) ^000000",
		"[LV 1]^777777 Heal (1) - ^ff000050%^777777 / ^cc009920%^777777 / 30% ^000000",
		"[LV 2]^777777 Heal (1 ~ 2) - ^ff000040%^777777 / ^cc009950%^777777 / 10% ^000000",
		"[LV 3]^777777 Heal (1 ~ 3) - ^ff000025%^777777 / ^cc009925%^777777 / 50% ^000000",
		"[LV 4]^777777 Heal (1 ~ 4) - ^ff000036%^777777 / ^cc009960%^777777 / 4% ^000000",
		"[LV 5]^777777 Heal (1 ~ 5) - ^ff000033%^777777 / ^cc009934%^777777 / 33% ^000000",
	].join("\n");

	SkillDescription[SKID.HVAN_INSTRUCT] = [
		"Change Instruction",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Increase your Homunculus's INT and STR. ",
		"Also helps on creating potions, the bonus is +1% per skill level if the Homunculus is active. ^000000",
		"[LV 1]^777777 +1 INT/ +1 STR ^000000",
		"[LV 2]^777777 +2 INT/ +1 STR ^000000",
		"[LV 3]^777777 +2 INT/ +3 STR ^000000",
		"[LV 4]^777777 +4 INT/ +4 STR ^000000",
		"[LV 5]^777777 +5 INT/ +4 STR ^000000",
	].join("\n");

	SkillDescription[SKID.HVAN_EXPLOSION] = [
		"Bio Explosion",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 1 ^000000",
		"Target:^777777 Homunculus self ^000000",
		"Cast Time:^777777 Unknown ^000000",
		"Cool Down:^777777 Unknown ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Homunculus self destructs and inflicts defense ignoring damage on everything within a 9x9 cells around it. The damage is based on the Homunculus Maximum HP, and after the attack, its intimacy is reduced to 1. ^000000",
		"[LV 1]^777777 Explosion damage: Maximum HP*1 ^000000",
		"[LV 2]^777777 Explosion damage: Maximum HP*1.5 ^000000",
		"[LV 3]^777777 Explosion damage: Maximum HP*2 ^000000",
	].join("\n");

	SkillDescription[SKID.MS_BASH] = [
		"Bash",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive, Level Selectable ^000000",
		"SP Cost:^777777 Level 1-5: 8, Level 6-10: 15. ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 Melee ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 A melee attack with ATK equal to (100+30*SkillLV)%. There is a HIT bonus of 5*SkillLV. If the character has the Fatal Blow skill as well, levels 6-10 will add a chance to Stun of 5%*(Bash SkillLV - 5) plus a bonus depending on BaseLV. ^000000",
		"[LV 1]^777777 ATK 130%, +5% Accuracy ^000000",
		"[LV 2]^777777 ATK 160%, +10% Accuracy ^000000",
		"[LV 3]^777777 ATK 190%, +15% Accuracy ^000000",
		"[LV 4]^777777 ATK 220%, +20% Accuracy ^000000",
		"[LV 5]^777777 ATK 250%, +25% Accuracy ^000000",
		"[LV 6]^777777 ATK 280%, +30% Accuracy ^000000",
		"[LV 7]^777777 ATK 310%, +35% Accuracy ^000000",
		"[LV 8]^777777 ATK 340%, +40% Accuracy ^000000",
		"[LV 9]^777777 ATK 370%, +45% Accuracy ^000000",
		"[LV 10]^777777 ATK 400%, +50% Accuracy ^000000",
	].join("\n");

	SkillDescription[SKID.MS_MAGNUM] = [
		"Magnum Break",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 30 ^000000",
		"SP Cost:^777777 20~16 ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 5x5 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None, 2 sec for the next Magnum Break ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 5x5 cells, Fire property splash attack with ATK of (100+20*SkillLV)% and a +10*SkillLV bonus to HIT. Enemies hit by the attack are pushed back 2 cells. Drains 15 HP per use, but cannot kill character.",
		"After usage, it adds a 20% Fire-elemental bonus to ATK that lasts for 10 seconds. After the cast the attack sequence is not interrupted. ^000000",
		"[LV 1]^777777 ATK 120%, +10 HIT ^000000",
		"[LV 2]^777777 ATK 140%, +20 HIT ^000000",
		"[LV 3]^777777 ATK 160%, +30 HIT ^000000",
		"[LV 4]^777777 ATK 180%, +40 HIT ^000000",
		"[LV 5]^777777 ATK 200%, +50 HIT ^000000",
		"[LV 6]^777777 ATK 220%, +60 HIT ^000000",
		"[LV 7]^777777 ATK 240%, +70 HIT ^000000",
		"[LV 8]^777777 ATK 260%, +80 HIT ^000000",
		"[LV 9]^777777 ATK 280%, +90 HIT ^000000",
		"[LV 10]^777777 ATK 300%, +100 HIT ^000000",
	].join("\n");

	SkillDescription[SKID.MS_BOWLINGBASH] = [
		"Bowling Bash",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 12 + SkillLV ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 2 cells ^000000",
		"Cast Time:^777777 0.7 sec (uninterruptible) ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Hits one enemy with an ATK of (100+40*SkillLV)%. The enemy is knocked back up to 5 cells. If that enemy hits any other enemies, then the hit becomes a 3x3 cell melee splash attack at that point with additional damage to these secondary targets. During the Cast Time character's DEF is reduced to 2/3. ^000000",
		"[LV 1]^777777 140% Damage, Knock back 1 cell ^000000",
		"[LV 2]^777777 180% Damage, Knock back 1 cell ^000000",
		"[LV 3]^777777 220% Damage, Knock back 2 cell ^000000",
		"[LV 4]^777777 260% Damage, Knock back 2 cell ^000000",
		"[LV 5]^777777 300% Damage, Knock back 3 cell ^000000",
		"[LV 6]^777777 340% Damage, Knock back 3 cell ^000000",
		"[LV 7]^777777 380% Damage, Knock back 4 cell ^000000",
		"[LV 8]^777777 420% Damage, Knock back 4 cell ^000000",
		"[LV 9]^777777 460% Damage, Knock back 5 cell ^000000",
		"[LV 10]^777777 500% Damage, Knock back 5 cell ^000000",
	].join("\n");

	SkillDescription[SKID.MS_PARRYING] = [
		"Parry",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 50 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 10 + 5*SkillLV sec ^000000",
		"Effect:^777777 You automatically block attacks with a success chance of (5*SkillLV)%. This allows you to Auto Guard melee and ranged attacks with your two-handed sword.",
		"This Skill also enables you to parry the following skills: Bash, Bowling Bash, Pierce, Spiral Pierce, Brandish Spear, Spear Boomerang, Shield Boomerang, Grand Cross, Asura Strike, Soul Breaker, Double Strafing, Arrow Shower and Investigate.",
		"When you block you cannot attack (but unlike Auto Guard, there is no delay). Use this when you get mobbed. Two Hand sword needed ^000000",
		"[LV 1]^777777 Block Chance 5%, 15 Sec ^000000",
		"[LV 2]^777777 Block Chance 10%, 20 Sec ^000000",
		"[LV 3]^777777 Block Chance 15%, 25 Sec ^000000",
		"[LV 4]^777777 Block Chance 20%, 30 Sec ^000000",
		"[LV 5]^777777 Block Chance 25%, 35 Sec ^000000",
		"[LV 6]^777777 Block Chance 30%, 40 Sec ^000000",
		"[LV 7]^777777 Block Chance 35%, 45 Sec ^000000",
		"[LV 8]^777777 Block Chance 40%, 50 Sec ^000000",
		"[LV 9]^777777 Block Chance 45%, 55 Sec ^000000",
		"[LV 10]^777777 Block Chance 50%, 60 Sec ^000000",
	].join("\n");

	SkillDescription[SKID.MS_REFLECTSHIELD] = [
		"Reflect Shield",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 30 + 5*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 300 sec ^000000",
		"Effect:^777777 Returns some damage dealt to you back to the enemy. Melee attacks only. Reflected Damage is (10+3*SkillLV)% of received damage. Requires an equipped shield and ignores size modifications. ^000000",
		"[LV 1]^777777 13% ATK Returned ^000000",
		"[LV 2]^777777 16% ATK Returned ^000000",
		"[LV 3]^777777 19% ATK Returned ^000000",
		"[LV 4]^777777 22% ATK Returned ^000000",
		"[LV 5]^777777 25% ATK Returned ^000000",
		"[LV 6]^777777 28% ATK Returned ^000000",
		"[LV 7]^777777 31% ATK Returned ^000000",
		"[LV 8]^777777 34% ATK Returned ^000000",
		"[LV 9]^777777 37% ATK Returned ^000000",
		"[LV 10]^777777 40% ATK Returned ^000000",
	].join("\n");

	SkillDescription[SKID.MS_BERSERK] = [
		"Berserk",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 100 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None (plus special delay, see below) ^000000",
		"Duration:^777777 300 sec or until 100 HP reached ^000000",
		"Effect:^777777 Requires you to have a JobLV of at least 50. It triples your HP and replenishes them (to the now tripled maximum), doubles your Damage, increases your ASPD by 30%,",
		"increases your movement speed (does not stack with other increase except Peco Peco), gives the Endure effect at no further cost but halves your Flee Rate and sets ALL DEF AND MDEF to 0 for the skill's duration.",
		"It also drains 5% of your current HP every 15 seconds. You cannot chat (chat mute), change equips, use any healing items or receive any heals while this skill is in effect.",
		"You do not regain HP and SP naturally for 5 minutes after the skill ends (you can be healed or use items though). The Skill cancels out if your HP drops to 100 or below. Can be used during Guild Siege. ^000000",
	].join("\n");

	SkillDescription[SKID.MA_DOUBLE] = [
		"Double Strafing",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 12 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 9 + Vulture's Eye SkillLV cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 0.3 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Ranged attack, that fires two arrows and hits with an ATK of (180+20*SkillLV)%. Requires an equipped bow. Only 1 arrow is consumed. ^000000",
		"[LV 1]^777777 200% Damage ^000000",
		"[LV 2]^777777 220% Damage ^000000",
		"[LV 3]^777777 240% Damage ^000000",
		"[LV 4]^777777 260% Damage ^000000",
		"[LV 5]^777777 280% Damage ^000000",
		"[LV 6]^777777 300% Damage ^000000",
		"[LV 7]^777777 320% Damage ^000000",
		"[LV 8]^777777 340% Damage ^000000",
		"[LV 9]^777777 360% Damage ^000000",
		"[LV 10]^777777 380% Damage ^000000",
	].join("\n");

	SkillDescription[SKID.MA_SHOWER] = [
		"Arrow shower",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Offensive, Level Selectable ^000000",
		"SP Cost:^777777 15 ^000000",
		"Target:^777777 Ground ^000000",
		"Range:^777777 9 + Vulture's Eye SkillLV cells ^000000",
		"Knoc Back:^777777 2 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 5x5 cells, ranged splash attack with an ATK of (75+5*SkillLV)%. Enemies hit by the attack are pushed back 2 cells. Requires an equipped bow. Only 1 arrow is consumed. ^000000",
		"[LV 1]^777777 160% Damage ^000000",
		"[LV 2]^777777 170% Damage ^000000",
		"[LV 3]^777777 180% Damage ^000000",
		"[LV 4]^777777 190% Damage ^000000",
		"[LV 5]^777777 200% Damage ^000000",
		"[LV 6]^777777 210% Damage ^000000",
		"[LV 7]^777777 220% Damage ^000000",
		"[LV 8]^777777 230% Damage ^000000",
		"[LV 9]^777777 240% Damage ^000000",
		"[LV 10]^777777 250% Damage ^000000",
	].join("\n");

	SkillDescription[SKID.MA_SKIDTRAP] = [
		"Skid Trap",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active, Trap ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 cell, at least 1 cell away from any monster or player and 3 cells away from another trap ^000000",
		"Range:^777777 3 cells ^000000",
		"Cast Time:^777777 None ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Knock Back:^777777 (5 + (Skill Level*1) ^000000",
		"Duration:^777777 360 - 60*SkillLV sec ^000000",
		"Catalyst:^777777 1 Trap ^000000",
		"Effect:^777777 A Skid Trap is a trap that activates when someone comes within SkillLV cells of it. When activated, the affected target is pushed back 5+SkillLV cells (10 cells if the skill is at level 5).",
		"Skid Traps are invisible, but any player who can see the Hunter laying the trap will be able to see the trap until they move out of sight of it. Use of any Hide revealing skill will reveal the trap. This trap will affect Players in PVP zones, including the user.",
		"Does not work on Boss and Plant monsters. If not tripped by the end of the duration, the Skid Trap will turn back into a Trap item on the floor and can be reclaimed. ^000000",
		"[LV 1]^777777 Sliding Range 6 cells, Setting Time 300 secs ^000000",
		"[LV 2]^777777 Sliding Range 7 cells, Setting Time 240 secs ^000000",
		"[LV 3]^777777 Sliding Range 8 cells, Setting Time 180 secs ^000000",
		"[LV 4]^777777 Sliding Range 9 cells, Setting Time 120 secs ^000000",
		"[LV 5]^777777 Sliding Range 10 cells, Setting Time 60 secs ^000000",
	].join("\n");

	SkillDescription[SKID.MA_LANDMINE] = [
		"Land Mine",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active, Trap ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 cell, at least 1 cell away from any monster or player and 3 cells away from another trap ^000000",
		"Range:^777777 3 cells ^000000",
		"ATK Type:^777777 Earth ^000000",
		"Cast Time:^777777 None ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 240 - 40*SkillLV sec ^000000",
		"Catalyst:^777777 1 Trap ^000000",
		"Effect:^777777 A Land Mine is a visible trap that explodes when stepped on, hitting the monster or player (in PvP only) that triggered it for [(DEX+75)*(1+INT/100)*SkillLV] damage.",
		"This skill ignores DEF and MDEF and damage modification cards for size and family, but not elemental property. There is also a (5*SkillLV+30)% chance to stun targets for 5 seconds. This trap will affect Players in PVP zones, including the user.",
		"If not tripped by the end of the duration, the Land Mine will turn back into a Trap item on the floor and can be reclaimed. ^000000",
		"[LV 1]^777777 ATK 50%, Setting Time 200secs ^000000",
		"[LV 2]^777777 ATK 75%, Setting Time 160secs ^000000",
		"[LV 3]^777777 ATK 100%, Setting Time 120secs ^000000",
		"[LV 4]^777777 ATK 125%, Setting Time 80secs ^000000",
		"[LV 5]^777777 ATK 150%, Setting Time 40secs ^000000",
	].join("\n");

	SkillDescription[SKID.MA_SANDMAN] = [
		"Sandman",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active, Trap ^000000",
		"SP Cost:^777777 12 ^000000",
		"Target:^777777 1 cell, at least 1 cell away from any monster or player and 3 cells away from another trap ^000000",
		"Range:^777777 3 cells ^000000",
		"Cast Time:^777777 0.4 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 18 sec ^000000",
		"Catalyst:^777777 1 Trap ^000000",
		"Effect:^777777 A Sandman is a trap that activates when stepped on. All targets in a 3x3 area around the trap will have an (40+10*SkillLV)% chance of being affected by \"Sleep\" (duration depends on SkillLV).",
		"A Sandman is invisible, but any player who can see the Hunter laying the trap will be able to see the trap until they move out of sight of it. Use of any invisibility revealing skill will reveal the trap. This trap will affect Players in PVP zones, including the user.",
		"If not tripped by the end of the duration, the Sandman will turn back into a Trap item on the floor and can be reclaimed. ^000000",
		"[LV 1]^777777 Setting Time 150sec 50% Sleep Chance ^000000",
		"[LV 2]^777777 Setting Time 120sec 60% Sleep Chance ^000000",
		"[LV 3]^777777 Setting Time 90sec 70% Sleep Chance ^000000",
		"[LV 4]^777777 Setting Time 60sec 80% Sleep Chance ^000000",
		"[LV 5]^777777 Setting Time 30sec 90% Sleep Chance ^000000",
	].join("\n");

	SkillDescription[SKID.MA_FREEZINGTRAP] = [
		"Freezing Trap",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active, Trap ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 cell, at least 1 cell away from any monster or player and 3 cells away from another trap ^000000",
		"Range:^777777 3 cells ^000000",
		"ATK Type:^777777 Water ^000000",
		"Cast Time:^777777 0.4 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 18 sec ^000000",
		"Catalyst:^777777 2 Traps ^000000",
		"Effect:^777777 A Freezing Trap is a trap that activates when stepped on. When activated, it will hit all in the area with a Frost Nova style attack. Damage is (25+25*SkillLV)% of your normal ATK.",
		"Chance to Freeze is Unknown and does not work against Boss monsters. Freezing Traps are invisible, but any player who can see the Hunter laying the trap will be able to see the trap until they move out of sight of it. Use of any invisibility revealing skill will reveal the trap. This trap will affect Players in PVP zones, including the user.",
		"If not tripped by the end of the duration, the Freezing Trap will turn back into a Trap item on the floor and can be reclaimed. ^000000",
		"[LV 1]^777777 Setting Time 150secs ^000000",
		"[LV 2]^777777 Setting Time 120secs ^000000",
		"[LV 3]^777777 Setting Time 90secs ^000000",
		"[LV 4]^777777 Setting Time 60secs ^000000",
		"[LV 5]^777777 Setting Time 30secs ^000000",
	].join("\n");

	SkillDescription[SKID.MA_REMOVETRAP] = [
		"Remove Trap",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 5 ^000000",
		"Target:^777777 1 Trap ^000000",
		"Range:^777777 2 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Turns one set trap back into a Trap item. You only get one trap even if you needed two for setting it. Can be used with an Ankle Snare that has already caught a target, but in this case you will not get a Trap item. Only works with your own traps. ^000000",
	].join("\n");

	SkillDescription[SKID.MA_CHARGEARROW] = [
		"Charge Arrow",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 15 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 9 + Vulture's Eye SkillLV cells ^000000",
		"Cast Time:^777777 1.5 sec Fixed (cannot be interrupted) ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Effect:^777777 Ranged attack at 150% ATK. The target is pushed back 6 cells. Only 1 arrow is consumed. ^000000",
	].join("\n");

	SkillDescription[SKID.MA_SHARPSHOOTING] = [
		"Sharpshooting",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 15 + 3*SkillLV ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 14 ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down:^777777 1.5 sec ^000000",
		"Effect:^777777 Arrow attack that will affect every enemy in a 3 cell wide corridor along its flight path up to its maximum range of 14 cells. The corridor is a straight line between the caster and its target.",
		"If the target is closer than 14 cells, the corridor will continue up to its full length. It affects all enemies along this path with an increased ATK (by 50% per SkillLV) and a +20 bonus to CRIT. ^000000",
		"[LV 1]^777777 +20 CRIT, +50% ATK ^000000",
		"[LV 2]^777777 +20 CRIT, +100% ATK ^000000",
		"[LV 3]^777777 +20 CRIT, +150% ATK ^000000",
		"[LV 4]^777777 +20 CRIT, +200% ATK ^000000",
		"[LV 5]^777777 +20 CRIT, +250% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.ML_PIERCE] = [
		"Pierce",
		"Type:^777777 Offensive",
		"SP Cost:^777777 7 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 3 cells ^000000",
		"Effect:^777777 Hits for an ATK of (100+10*SkillLV)%. Number of hits depends on the size of the target. Small = 1, Medium = 2, Large = 3. Players are considered to be medium. ^000000",
		"[Small]^777777 1 Hit ^000000",
		"[Medium]^777777 2 Hits ^000000",
		"[Big]^777777 3 Hits ^000000",
	].join("\n");

	SkillDescription[SKID.ML_BRANDISH] = [
		"Brandish Spear",
		"Target:^777777 1 Enemy ^000000",
		"Effect:^777777 An area attack with an ATK of (100+20*SkillLV)%. ^000000",
	].join("\n");

	SkillDescription[SKID.ML_SPIRALPIERCE] = [
		"Spiral Pierce",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"Target:^777777 Enemy ^000000",
		"SP Cost:^777777 15 + 3*SkillLV ^000000",
		"Cast Time:^777777 0.1 + 0.2*SkillLV sec ^000000",
		"Cool Down:^777777 1 + 0.2*SkillLV sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Extend your spear, and spin it in a spiral fashion to increase overall damage and ability to pierce. A more powerful version of Pierce which ignores DEF and VIT DEF and also stun-locks your opponent for 3 sec.",
		"Damage is (100+50*SkillLV)% ATK. The attack is 5 hits with the damage divided evenly between the hits. However you can increase damage further by increasing the weight of your weapon (upgrades count too! LV 1 weapons +10/upgrade, LV 2 weapons +15/upgrade, LV 3 weapons +25/upgrade).",
		"Although damage will increase with better skill level, so will the Cast Time / Cool Down. Aura Blade does not add damage to this skill. Recent tests revealed the following (rather complex) formula:",
		"[(80% of weapons weight times (100%+level*50%) + (round.down(STR/10^2) + Upgrade Damage) * size modifier (small 125%, medium 100%, large 75%)) * card factors (+20% and such) * element factors ]* 5 hits ^000000",
		"[LV 1]^777777 150% ATK per attack ^000000",
		"[LV 2]^777777 200% ATK per attack ^000000",
		"[LV 3]^777777 250% ATK per attack ^000000",
		"[LV 4]^777777 300% ATK per attack ^000000",
		"[LV 5]^777777 350% ATK per attack ^000000",
	].join("\n");

	SkillDescription[SKID.ML_DEFENDER] = [
		"Defender",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 30 ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 180 sec ^000000",
		"Effect:^777777 Decreases the ATK of ranged attacks against the caster by (5+15*SkillLV)%, but also lowers ASPD by (25-5*SkillLV)% and walking speed by 1/3 while active.",
		"The higher the level the lower the values, up to SkillLV 5 which has no speed reductions.",
		"Can be shared with party members when the Devotion skill is casted on them, but the movement reduction will affect them too. Caster must have a shield equipped. ^000000",
		"[LV 1]^777777 -20% ATK, -20% ASPD ^000000",
		"[LV 2]^777777 -35% ATK, -15% ASPD ^000000",
		"[LV 3]^777777 -50% ATK, -10% ASPD ^000000",
		"[LV 4]^777777 -65% ATK, -5% ASPD ^000000",
		"[LV 5]^777777 -80% ATK, no ASPD reduction ^000000",
	].join("\n");

	SkillDescription[SKID.ML_AUTOGUARD] = [
		"Auto Guard",
		"Max Level:^777777 10 ^000000",
		"Type:^777777 Supportive ^000000",
		"SP Cost:^777777 10 + 2*SkillLV ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 300 sec ^000000",
		"Effect:^777777 Gives you the ability to completely block attacks. Requires an equipped Shield. When you block an attack, you will be unable to move for 0.3 seconds for SkillLV 1-5. SkillLV 6-9 delays your movement for 0.2 sec and SkillLV 10 for 0.1 sec. ^000000",
		"[LV 1]^777777 5% Chance, 0.3 delay ^000000",
		"[LV 2]^777777 10% Chance, 0.3 delay ^000000",
		"[LV 3]^777777 14% Chance, 0.3 delay ^000000",
		"[LV 4]^777777 18% Chance, 0.3 delay ^000000",
		"[LV 5]^777777 21% Chance, 0.3 delay ^000000",
		"[LV 6]^777777 24% Chance, 0.2 delay ^000000",
		"[LV 7]^777777 26% Chance, 0.2 delay ^000000",
		"[LV 8]^777777 28% Chance, 0.2 delay ^000000",
		"[LV 9]^777777 29% Chance, 0.2 delay ^000000",
		"[LV 10]^777777 30% Chance, 0.1 delay ^000000",
	].join("\n");

	SkillDescription[SKID.ML_DEVOTION] = [
		"Devotion",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Support ^000000",
		"SP Cost:^777777 25 ^000000",
		"Target:^777777 Selected Party Member(s) maximum is one per SkillLV ^000000",
		"Range:^777777 6 + SkillLV ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 3 ^000000",
		"Duration:^777777 15 + 15*SkillLV sec ^000000",
		"Effect:^777777 Protect party members by taking the full damage that they are receiving. They must be in range to benefit from this, once they leave the skill is canceled and needs to be recasted.",
		"Damage taken is based on the DEF of the person who gets hit, not the Crusader that takes the hit.",
		"If the caster has any self casted, class native enhancements on him, e.g. Endure (Endure transfer is disabled in WoE), Providence or Reflect Shield, the party member(s) will share these benefits, too.",
		"This skill cannot be used on other Crusaders. The level difference between the caster and the target must be equal or less than 10 (within normal EXP share range).",
		"The number of possible protected party members is 1*SkillLV. Should the HP of Crusader drop below 25%, Devotion will be canceled. ^000000",
		"[LV 1]^777777 30 sec, 1 Player ^000000",
		"[LV 2]^777777 45 sec, 2 Players ^000000",
		"[LV 3]^777777 60 sec, 3 Players ^000000",
		"[LV 4]^777777 75 sec, 4 Players ^000000",
		"[LV 5]^777777 90 sec, 5 Players ^000000",
	].join("\n");

	SkillDescription[SKID.MER_MAGNIFICAT] = [
		"Magnificat",
		"Max Level:^777777 5 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 40 ^000000",
		"Target:^777777 Player, Mercenary ^000000",
		"Range:^777777 Visual range ^000000",
		"Cast Time:^777777 4 sec ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Duration:^777777 15 + (Skill Level*15)) sec ^000000",
		"Effect:^777777 Double the caster and party members SP Recovery Rate for the duration of the skill. ^000000",
		"[LV 1]^777777 Lasts 30 Seconds ^000000",
		"[LV 2]^777777 Lasts 45 Seconds ^000000",
		"[LV 3]^777777 Lasts 60 Seconds ^000000",
		"[LV 4]^777777 Lasts 75 Seconds ^000000",
		"[LV 5]^777777 Lasts 90 Seconds ^000000",
	].join("\n");

	SkillDescription[SKID.MER_QUICKEN] = [
		"Weapon Quicken",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 + 4*SkillLV^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 Unknown sec ^000000",
		"Duration:^777777 30*SkillLV ^000000",
		"Effect:^777777 Temporarily increase Attack Speed with Two Handed Sword Class Weapons. ^000000",
		"[LV 1]^777777 Lasts 30secs/14 SP ^000000",
		"[LV 2]^777777 Lasts 60Secs/18 SP ^000000",
		"[LV 3]^777777 Lasts 90Secs/26 SP ^000000",
		"[LV 4]^777777 Lasts 120Secs/28 SP ^000000",
		"[LV 5]^777777 Lasts 150Secs/30 SP ^000000",
		"[LV 6]^777777 Lasts 180Secs/34 SP ^000000",
		"[LV 7]^777777 Lasts 210Secs/38 SP ^000000",
		"[LV 8]^777777 Lasts 240Secs/42 SP ^000000",
		"[LV 9]^777777 Lasts 270Secss/46 SP ^000000",
		"[LV 10]^777777 Lasts 300Secs/50 SP ^000000",
	].join("\n");

	SkillDescription[SKID.MER_SIGHT] = [
		"Sight",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 Self ^000000",
		"Area:^777777 7x7 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 10 sec ^000000",
		"Effect:^777777 Nullifies the Hide, Tunnel Drive and Cloaking effects within range. ^000000",
	].join("\n");

	SkillDescription[SKID.MER_CRASH] = [
		"Crash",
		"Max Level:^777777 5 ^000000",
		"Type:^777777 Offensive ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 1 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Deals a single hit with a chance to stun. ^000000",
		"[LV 1]^777777 110% ATK, 6% Stun ^000000",
		"[LV 2]^777777 120% ATK, 12% Stun ^000000",
		"[LV 3]^777777 130% ATK, 18% Stun ^000000",
		"[LV 4]^777777 140% ATK, 24% Stun ^000000",
		"[LV 5]^777777 150% ATK, 30% Stun ^000000",
	].join("\n");

	SkillDescription[SKID.MER_REGAIN] = [
		"Regain",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 Ally/1 Mercenary ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Unknown sec ^000000",
		"Cool Down:^777777 Unknown sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Recovers the target from both sleep and stun status. ^000000",
	].join("\n");

	SkillDescription[SKID.MER_TENDER] = [
		"Tender",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 Ally/1 Mercenary ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Unknown sec ^000000",
		"Cool Down:^777777 Unknown sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Recovers the target from both freezing and stone status. ^000000",
	].join("\n");

	SkillDescription[SKID.MER_BENEDICTION] = [
		"Benediction",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 Ally/1 Mercenary ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Unknown sec ^000000",
		"Cool Down:^777777 Unknown sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Recovers the target from both curse and blind status. ^000000",
	].join("\n");

	SkillDescription[SKID.MER_RECUPERATE] = [
		"Recuperate",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 Ally/1 Mercenary ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Unknown sec ^000000",
		"Cool Down:^777777 Unknown sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Recovers the target from both poison and silence status. ^000000",
	].join("\n");

	SkillDescription[SKID.MER_MENTALCURE] = [
		"Mental Cure",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 Ally/1 Mercenary ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Unknown sec ^000000",
		"Cool Down:^777777 Unknown sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Recovers the target from both hallucination and chaos status. ^000000",
	].join("\n");

	SkillDescription[SKID.MER_COMPRESS] = [
		"Compress",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 Ally/1 Mercenary ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 Unknown sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 Recovers the target from bleeding status. ^000000",
	].join("\n");

	SkillDescription[SKID.MER_PROVOKE] = [
		"Provoke",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active, Level Selectable ^000000",
		"SP Cost:^777777 3 + SkillLV ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 ASPD ^000000",
		"Duration:^777777 30 sec ^000000",
		"Effect:^777777 Lowers the enemy DEF and VIT DEF by (5+5*SkillLV)% and increases their ATK by (2+3*SkillLV)%. Undead and Boss monsters are not affected. ^000000",
		"[LV 1]^777777 53% Success, Target Attack +5%, Defense -10% ^000000",
		"[LV 2]^777777 56% Success, Target Attack +8%, Defense -15% ^000000",
		"[LV 3]^777777 59% Success, Target Attack +11%, Defense -20% ^000000",
		"[LV 4]^777777 62% Success, Target Attack +14%, Defense -25% ^000000",
		"[LV 5]^777777 65% Success, Target Attack +17%, Defense -30% ^000000",
		"[LV 6]^777777 68% Success, Target Attack +20%, Defense -35% ^000000",
		"[LV 7]^777777 71% Success, Target Attack +23%, Defense -40% ^000000",
		"[LV 8]^777777 74% Success, Target Attack +26%, Defense -45% ^000000",
		"[LV 9]^777777 77% Success, Target Attack +29%, Defense -50% ^000000",
		"[LV 10]^777777 80% Success, Target Attack +32%, Defense -55% ^000000",
	].join("\n");

	SkillDescription[SKID.MER_AUTOBERSERK] = [
		"Auto Berserk",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Passive with activation ^000000",
		"SP Cost:^777777 5 per 10 sec ^000000",
		"Target:^777777 Self ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 See below ^000000",
		"Effect:^777777 When your HP goes below 25%, you gain the effect of Provoke L10 on yourself. That means +32% ATK and -60% VIT DEF. The effect lasts until the character returns to more than 25% HP. The skill can be set to activate or not. The skill will even function after it has drained all your SP. ^000000",
	].join("\n");

	SkillDescription[SKID.MER_DECAGI] = [
		"Decrease agility",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active, Level Selectable ^000000",
		"SP Cost:^777777 20 + 10*SkillLV ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 1 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 20 + 10*SkillLV sec ^000000",
		"Effect:^777777 Decreases AGI of target by 2+SkillLV and reduces movement speed by 25%. The skill can fail and success is indicated by the text \"AGI down\" on the target at the time of casting.",
		"A successful cast will dispel Increase Agility, Adrenaline Rush, Two-Hand Quicken, Spear Quicken and Cart Boost. The effects of this skill combine with Quagmire in the form AGI/2-2+SkillLV.",
		"The formula for success is believed to be SuccessRate = 40 + 2*SkillLV + (BaseLV + INT)/5 - Target MDEF where SuccessRate is expressed as a percentage. Duration is halved on players. Does not work against Boss monsters. ^000000",
		"[LV 1]^777777 -3 AGI, -27 SP, 30 sec ^000000",
		"[LV 2]^777777 -4 AGI, -29 SP, 40 sec ^000000",
		"[LV 3]^777777 -5 AGI, -31 SP, 50 sec ^000000",
		"[LV 4]^777777 -6 AGI, -33 SP, 60 sec ^000000",
		"[LV 5]^777777 -7 AGI, -35 SP, 70 sec ^000000",
		"[LV 6]^777777 -8 AGI, -37 SP, 80 sec ^000000",
		"[LV 7]^777777 -9 AGI, -39 SP, 90 sec ^000000",
		"[LV 8]^777777 -10 AGI, -41 SP, 100 sec ^000000",
		"[LV 9]^777777 -11 AGI, -43 SP, 110 sec ^000000 ",
		"[LV 10]^777777 -12 AGI, -45 SP, 120 sec ^000000",
	].join("\n");

	SkillDescription[SKID.MER_SCAPEGOAT] = [
		"Scapegoat",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 5 ^000000",
		"Target:^777777 yourself ^000000",
		"Cast Time:^777777 3 sec ^000000",
		"Cool Down:^777777 Unknown sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 The mercenary gives all of its remaining HP to the summoner and dies. Any excess HP is discarded. ^000000",
	].join("\n");

	SkillDescription[SKID.MER_LEXDIVINA] = [
		"Lex Divina",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 LV 1-5 20; LV 6-10 30-2*SkillLV ^000000",
		"Target:^777777 1 Enemy ^000000",
		"Range:^777777 5 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 3 sec ^000000",
		"Duration:^777777 30*(100-TargetVIT)/100 sec of Silence ^000000",
		"Effect:^777777 This skill has a chance of inflicting the Silence status on the selected target. Does not work against Boss monsters. The chance is equal to 100 - (TargetVIT + TargetLUK/8) + INT/15 %.",
		"Casting this spell on a target that is already silenced will remove the silence status. ^000000",
		"[LV 1]^777777 Lasts 30 Seconds ^000000",
		"[LV 2]^777777 Lasts 35 Seconds ^000000",
		"[LV 3]^777777 Lasts 40 Seconds ^000000",
		"[LV 4]^777777 Lasts 45 Seconds ^000000",
		"[LV 5]^777777 Lasts 50 Seconds ^000000",
		"[LV 6]^777777 Lasts 60 Seconds ^000000",
		"[LV 7]^777777 Lasts 60 Seconds ^000000",
		"[LV 8]^777777 Lasts 60 Seconds ^000000",
		"[LV 9]^777777 Lasts 60 Seconds ^000000",
		"[LV 10]^777777 Lasts 60 Seconds ^000000",
	].join("\n");

	SkillDescription[SKID.MER_ESTIMATION] = [
		"Monster Property",
		"Max Level:^777777 1 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 10 ^000000",
		"Target:^777777 1 monster ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 None ^000000",
		"Duration:^777777 Until status window is closed. ^000000",
		"Effect:^777777 Brings up a window with information about the targeted monster such as HP, element, level, etc at the time the spell is cast. Party members also see this window. ^000000",
	].join("\n");

	SkillDescription[SKID.MER_KYRIE] = [
		"Kyrie Eleison",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active ^000000",
		"SP Cost:^777777 20 + 5*[(SkillLV - 1)/3 rounded down] ^000000",
		"Target:^777777 1 Ally ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 2 sec ^000000",
		"Cool Down:^777777 2 sec ^000000",
		"Duration:^777777 120 sec ^000000",
		"Effect:^777777 Creates a Kyrie Eleison effect on the target character. This effect will block MaxHPofTarget*(10+2*SkillLV)% damage OR (5+SkillLV/2) hits, whichever is reached first.",
		"Damage in excess of the amount blocked will transfer through and count as a hit of lowered damage. Hits are only assessed when a blow would normally land and not for every swing by a monster (despite showing an \"Auto Guard\" graphic with every swing for the effected player and a miss for every other player).",
		"Any Magic attack will do full damage to the affected target, while still counting against the maximum damage and number of hits of Kyrie Eleison. Casting Holy Light or Assumptio on someone with this effect will cancel it entirely. When a second instance is cast on a target, then it will replace the first instance. ^000000",
		"[LV 1]^777777 12% of Maximum HP, 5 attacks ^000000",
		"[LV 2]^777777 14% of Maximum HP, 6 attacks ^000000",
		"[LV 3]^777777 16% of Maximum HP, 6 attacks ^000000",
		"[LV 4]^777777 18% of Maximum HP, 7 attacks ^000000",
		"[LV 5]^777777 20% of Maximum HP, 7 attacks ^000000",
		"[LV 6]^777777 22% of Maximum HP, 8 attacks ^000000",
		"[LV 7]^777777 24% of Maximum HP, 8 attacks ^000000",
		"[LV 8]^777777 26% of Maximum HP, 9 attacks ^000000",
		"[LV 9]^777777 28% of Maximum HP, 9 attacks ^000000",
		"[LV 10]^777777 30% of Maximum HP, 10 attacks ^000000",
	].join("\n");

	SkillDescription[SKID.MER_BLESSING] = [
		"Blessing",
		"Skill Form: ^777777Supportive ^000000",
		"Target: ^777777Player ^000000",
		"Description: ^777777Increase targeted player's DEX, INT and STR for",
		"Blessing's duration. Can also cancel abnormal statuses from",
		"Curse and Stone Curse. ^000000",
	].join("\n");

	SkillDescription[SKID.MER_INCAGI] = [
		"Increase Agility",
		"Max Level:^777777 10 ^000000",
		"Type:^33cc00 Active, Level Selectable ^000000",
		"SP Cost:^777777 15 + 3*SkillLV ^000000",
		"HP Cost:^777777 15 ^000000",
		"Target:^777777 1 Ally ^000000",
		"Range:^777777 9 cells ^000000",
		"Cast Time:^777777 Instant ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 40 + 20*SkillLV sec ^000000",
		"Effect:^777777 Increases AGI of target by 2+SkillLV and increases movement speed by 25%. Casting is accompanied by the \"AGI UP\" message over the target. Dispels Decrease Agility when cast. Dispelled by Decrease Agility and Quagmire.",
		"A monster or player in the area of effect of a Quagmire spell cannot receive the benefits of Increase Agility.",
		"This skill consumes some HP along with the SP cost. ^000000",
		"[LV 1]^777777 + 3 AGI ^000000",
		"[LV 2]^777777 + 4 AGI ^000000",
		"[LV 3]^777777 + 5 AGI ^000000",
		"[LV 4]^777777 + 6 AGI ^000000",
		"[LV 5]^777777 + 7 AGI ^000000",
		"[LV 6]^777777 + 8 AGI ^000000",
		"[LV 7]^777777 + 9 AGI ^000000",
		"[LV 8]^777777 + 10 AGI ^000000",
		"[LV 9]^777777 + 11 AGI ^000000",
		"[LV 10]^777777 + 12 AGI ^000000",
	].join("\n");

	SkillDescription[SKID.GD_APPROVAL] = [
		"Approval",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Passive ^000000",
		"Target:^777777 The Guild ^000000",
		"Effect:^777777 Certification as an official guild of the Rune Midgard Kingdom. Members of official guilds are authorized to attack the Emperium inside guild territories.",
		"^ff0000Without this skill all attacks on the Emperium will miss!!^777777 To disband a guild use the command ^00ffff/breakguild \"guildname\". ^000000",
	].join("\n");

	SkillDescription[SKID.GD_KAFRACONTRACT] = [
		"Kafra Contract",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Passive ^000000",
		"Target:^777777 The Guild ^000000",
		"Effect:^777777 Sign a contract with the Kafra Headquarter in Aldebaran. Through the contract the guild can hire a Kafra Employee for their castle who will provide warps and storage for the guild members. ^000000",
	].join("\n");

	SkillDescription[SKID.GD_GUARDRESEARCH] = [
		"Guardian Research",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Passive ^000000",
		"Target:^777777 The Guild ^000000",
		"Effect:^777777 Study the Guardian technology. Allows the guild to hire Guardians for their territory. ^000000",
	].join("\n");

	SkillDescription[SKID.GD_GUARDUP] = [
		"Build up the Guardian",
		"Max Level:^777777 3 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 The guild Guardians gain bonuses to their Maximum HP, ATK and ASPD. ^000000",
	].join("\n");

	SkillDescription[SKID.GD_EXTENSION] = [
		"Guild Extension",
		"Max Level:^777777 10 ^000000",
		"Type:^000099 Passive ^000000",
		"Target:^777777 The Guild ^000000",
		"Effect:^777777 Increase the maximum capacity of guildsmen by +6 per SkillLV. ^000000",
		"[Level 1]^777777 +6 people ^000000",
		"[Level 2]^777777 +12 people ^000000",
		"[Level 3]^777777 +18 people ^000000",
		"[Level 4]^777777 +24 people ^000000",
		"[Level 5]^777777 +30 people ^000000",
		"[Level 6]^777777 +36 people ^000000",
		"[Level 7]^777777 +42 people ^000000",
		"[Level 8]^777777 +48 people ^000000",
		"[Level 9]^777777 +52 people ^000000",
		"[Level 10]^777777 +60 people ^000000",
	].join("\n");

	SkillDescription[SKID.GD_GLORYGUILD] = [
		"Guild's Glory",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Permits the use of a guild emblem.",
		"Emblem Creation Process:",
		"1. Select a design for the Emblem.",
		"2. Emblems must be 24x24 pixels in BMP format using 256 colors",
		"3. Create a folder named Emblem inside the Ragnarok Online folder (i.e. C:\\Program Files\\Gravity\\RO) and copy the emblem file there.",
		"If you are the guild master, you must place the emblem inside the Emblem folder in the game directory (i.e. C:\\Program Files\\Gravity\\RO\\Emblem). ^000000",
	].join("\n");

	SkillDescription[SKID.GD_LEADERSHIP] = [
		"Great Leadership",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 All guild members in a 5x5 area around the Guild Leader will receive a +1*SkillLV STR bonus. Can only be used during guild sieges. ^000000",
	].join("\n");

	SkillDescription[SKID.GD_GLORYWOUNDS] = [
		"Wounds of Glory",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 All guild members in a 5x5 area around the Guild Leader will receive a +1*SkillLV VIT bonus. Can only be used during guild sieges. ^000000",
	].join("\n");

	SkillDescription[SKID.GD_SOULCOLD] = [
		"Soul of Cold",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 All guild members in a 5x5 area around the Guild Leader will receive a +1*SkillLV AGI bonus. Can only be used during guild sieges. This skill is unconfirmed. ^000000",
	].join("\n");

	SkillDescription[SKID.GD_HAWKEYES] = [
		"Sharp Hawk Eyes",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 All guild members in a 5x5 area around the Guild Leader will receive a +1*SkillLV DEX bonus. Can only be used during guild sieges. ^000000",
	].join("\n");

	SkillDescription[SKID.GD_BATTLEORDER] = [
		"Battle Orders",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Support, Guild Master only ^000000",
		"SP Cost:^777777 Unknown ^000000",
		"Range:^777777 Entire screen around the guild master ^000000",
		"Cast Time:^777777 5 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 180 sec ^000000",
		"Effect:^777777 All guild members visible on the Guild Leaders screen will receive a +5 bonus to STR, DEX and INT.",
		"This skill lasts for 1 minute, and caster must wait 5 minutes before using this skill again. Can only be used during guild sieges. ^000000",
	].join("\n");

	SkillDescription[SKID.GD_REGENERATION] = [
		"Regeneration",
		"Max Level:^777777 3 ^000000",
		"Type:^777777 Support, Guild Master only ^000000",
		"SP Cost:^777777 Unknown ^000000",
		"Range:^777777 Entire screen around the guild master ^000000",
		"Cast Time:^777777 5 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 60 sec ^000000",
		"Effect:^777777 All guild members visible on the Guild Leaders screen increase their HP and SP regeneration rate.",
		"Once used, caster must wait 5 minutes before using this skill again. Can only be used during guild sieges. ^000000",
		"[LV 1]^777777 2x HP regeneration rate ^000000",
		"[LV 2]^777777 2x HP and SP regeneration rate ^000000",
		"[LV 3]^777777 3x HP and SP regeneration rate ^000000",
	].join("\n");

	SkillDescription[SKID.GD_RESTORE] = [
		"Restore",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Support, Guild Master only ^000000",
		"SP Cost:^777777 Unknown ^000000",
		"Range:^777777 Entire screen around the guild master ^000000",
		"Cast Time:^777777 5 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 All guild members visible on the Guild Master screen will have their HP and SP restored to 90% of the respective maximum.",
		"Once used, caster must wait 5 minutes before using this skill again. Can only be used during guild sieges. ^000000",
	].join("\n");

	SkillDescription[SKID.GD_EMERGENCYCALL] = [
		"Emergency Call",
		"Max Level:^777777 1 ^000000",
		"Type:^777777 Support, Guild Master only ^000000",
		"SP Cost:^777777 Unknown ^000000",
		"Range:^777777 Entire map ^000000",
		"Cast Time:^777777 5 sec ^000000",
		"Cool Down:^777777 1 sec ^000000",
		"Duration:^777777 Instant ^000000",
		"Effect:^777777 All guild members will be teleported next to the Guild Master.",
		"Once used, caster must wait 5 minutes before using this skill again. ^000000",
	].join("\n");

	SkillDescription[SKID.GD_DEVELOPMENT] = [
		"Emsolute Develop",
		"Max Level:^777777 1 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect:^777777 Gives 50% chance to get an additional, free economy point when investing into a castle's economy. ^000000",
	].join("\n");

	SkillDescription[SKID.GD_ITEMEMERGENCYCALL] = [

	].join("\n");

	SkillDescription[SKID.MH_SUMMON_LEGION] = [
		"Summon Legion",
		"Max Level:^777777 5 ^000000",
		"Duration:^777777 10 + 10*SkillLV ^000000",
		"SP Cost:^777777 40 + 20*SkillLV ^000000",
		"Effect : ^777777 Summons an insect type monster to attack a single target.",
		"The higher the skill level, the stronger the insect monster that is summoned.",
		"[LV 1] ^777777 Summons Hornet / Duration 20 seconds^000000",
		"[LV 2] ^777777 Summons Giant Hornet / Duration 30 seconds000000",
		"[LV 3] ^777777 Summons Giant Hornet / Duration 40 seconds^000000",
		"[LV 4] ^777777 Summons Luciola Vespa / Duration 50 seconds^000000",
		"[LV 5] ^777777 Summons Luciola Vespa / Duration 60 seconds^000000",
	].join("\n");

	SkillDescription[SKID.MH_NEEDLE_OF_PARALYZE] = [
		"Needle Of Paralyze",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 Stings a target with a powerful numbing poison, which causes poison element damage and causes the paralysis status effect.",
		"While under the effect of paralysis, the target cannot move, takes longer to cast skills and has reduced defense.",
		"The duration of paralysis is reduced by VIT and Luk. ^000000",
		"[LV 1] ^777777 800% ATK / Paralysis Chance 45%^000000",
		"[LV 2] ^777777 900% ATK / Paralysis Chance 50% ^000000",
		"[LV 3] ^777777 1000% ATK / Paralysis Chance 55% ^000000",
		"[LV 4] ^777777 1100% ATK / Paralysis Chance 60% ^000000",
		"[LV 5] ^777777 1200% ATK / Paralysis Chance 65% ^000000",
	].join("\n");

	SkillDescription[SKID.MH_POISON_MIST] = [
		"Poison Mist",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 Disperses an arial toxin that affects all targets that enter. Deals poison element damage as well as causes blindness.",
		"You can only have one active at a time. ^000000",
		"[LV 1] ^777777 Blind Chance 20% / Duration 12 seconds^000000",
		"[LV 2] ^777777 Blind Chance 30% / Duration 14 seconds^000000",
		"[LV 3] ^777777 Blind Chance 40% / Duration 16 seconds^000000",
		"[LV 4] ^777777 Blind Chance 50% / Duration 18 seconds^000000",
		"[LV 5] ^777777 Blind Chance 60% / Duration 20 seconds^000000",
	].join("\n");

	SkillDescription[SKID.MH_PAIN_KILLER] = [
		"Pain Killer",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 Injects a target with a mild paralytic toxin, which delays the effects of damage taken.",
		"The delayed damage is also reduced. However it causes a side effect of lowering attack speed. ^000000",
		"[LV 1] ^777777 Duration 20 seconds^000000",
		"[LV 2] ^777777 Duration 30 seconds^000000",
		"[LV 3] ^777777 Duration 40 seconds^000000",
		"[LV 4] ^777777 Duration 50 seconds^000000",
		"[LV 5] ^777777 Duration 60 seconds^000000",
	].join("\n");

	SkillDescription[SKID.MH_LIGHT_OF_REGENE] = [
		"Light Of Regeneration",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 For a certain amount of time, the homunculus shines the light of regeneration on the host.",
		"If the summoner die, the homunculus will sacrifice itself to revive the host. When the skill activates, intimacy drops.",
		"If you have other items or skills that revive you on death, those items will take priority.",
		"Higher skill levels increase the amount of HP you are revived with. ^000000",
		"[LV 1] ^777777 Duration 360 seconds^000000",
		"[LV 2] ^777777 Duration 420 seconds^000000",
		"[LV 3] ^777777 Duration 480 seconds^000000",
		"[LV 4] ^777777 Duration 540 seconds^000000",
		"[LV 5] ^777777 Duration 600 seconds^000000",
	].join("\n");

	SkillDescription[SKID.MH_OVERED_BOOST] = [
		"Overed Boost",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 Temporarially boosts the evasion and attack speed of the homunculus and the host to a fixed amount, but reduces defense by 1/2. ",
		"While under the skill effect, your attack speed and evasion cannot be influenced by skills or items.",
		"Once the skill ends, the SP of the homunculus Vihanga and the master are reduced by half. ^000000",
		"[LV 1] ^777777 Evasion 340 / ASPD 181 ^000000",
		"[LV 2] ^777777 Evasion 380 / ASPD 183 ^000000",
		"[LV 3] ^777777 Evasion 420 / ASPD 185 ^000000",
		"[LV 4] ^777777 Evasion 460 / ASPD 187 ^000000",
		"[LV 5] ^777777 Evasion 500 / ASPD 189 ^000000",
	].join("\n");

	SkillDescription[SKID.MH_ERASER_CUTTER] = [
		"Eraser Cutter",
		"Max Level:^777777 5 ^000000",
		"SP Cost:^777777 20 + 5*SkillLV ^000000",
		"Effect : ^777777 Cutting at the speed of sound, deals multiple blows to a single target at long range. ",
		"Depending on the skill level, deals either Wind Element damage or Neutral Element damage. ^000000",
		"[LV 1] ^777777 600% ATK / Wind Element Magic Damage ^000000",
		"[LV 2] ^777777 1000% ATK / Neutral Element Magic Damage ^000000",
		"[LV 3] ^777777 800% ATK / Wind Element Magic Damage ^000000",
		"[LV 4] ^777777 1200% ATK / Neutral Element Magic Damage ^000000",
		"[LV 5] ^777777 1000% ATK / Wind Element Magic Damage ^000000",
	].join("\n");

	SkillDescription[SKID.MH_XENO_SLASHER] = [
		"Xeno Slasher",
		"Max Level:^777777 5 ^000000",
		"SP Cost:^777777 80 + 10*SkillLV ^000000",
		"Effect : ^777777 Fires an illusion cutter across a wide area. ",
		"Like illusion cutter, the skill level affects the attribute of the attack. ",
		"All targets that take damage have a small chance to receive the bleeding status. ^000000",
		"[LV 1] ^777777 500% ATK / Wind Element Magic Damage / Area 5x5 Cells ^000000",
		"[LV 2] ^777777 700% ATK / Neutral Element Magic Damage / Area 5x5 Cells^000000",
		"[LV 3] ^777777 600% ATK / Wind Element Magic Damage / Area 7x7 Cells^000000",
		"[LV 4] ^777777 900% ATK / Neutral Element Magic Damage / Area 7x7 Cells^000000",
		"[LV 5] ^777777 700% ATK / Wind Element Magic Damage / Area 9x9 Cells^000000",
	].join("\n");

	SkillDescription[SKID.MH_SILENT_BREEZE] = [
		"Silent Breeze",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777  A quiet breeze. Recovers a target's HP and inflicts Silence on upon them, preventing all skill use.",
		"However, this silence effect removes other status effects. The following status effects are removed: Howling of Mandragora,",
		"Harmonize, Deep Sleep, Siren's Voice, Sleep, Chaos, Hallucination^000000",
		"[LV 1] ^777777 Duration 9 seconds ^000000",
		"[LV 2] ^777777 Duration 12 seconds ^000000",
		"[LV 3] ^777777 Duration 15 seconds ^000000",
		"[LV 4] ^777777 Duration 18 seconds ^000000",
		"[LV 5] ^777777 Duration 21 seconds ^000000",
	].join("\n");

	SkillDescription[SKID.MH_STAHL_HORN] = [
		"Stahl Horn",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 Performs a dash attack at a target, dealing damage, stunning them, and knocking them back 3 cells. If active, Goldene Ferse will change Stahl Horn to deal Holy property damage.^000000",
		"[LV 1] ^777777 600% ATK / Range 5 cells / 20% Stun chance ^000000",
		"[LV 2] ^777777 700% ATK / Range 6 cells / 24% Stun chance ^000000",
		"[LV 3] ^777777 800% ATK / Range 7 cells / 28% Stun chance ^000000",
		"[LV 4] ^777777 900% ATK / Range 8 cells / 32% Stun chance ^000000",
		"[LV 5] ^777777 1000% ATK / Range 9 cells / 36% Stun chance ^000000",
	].join("\n");

	SkillDescription[SKID.MH_GOLDENE_FERSE] = [
		"Goldene Ferse",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 Increases the homunculus's evasion and attack speed, and makes regular attacks holy attack by chance.",
		"During the skill duration, the skill 'Stahl Horn' will be holy property.",
		"Cannot be used in combination with 'Angriffs Modus' ^000000",
		"[LV 1] ^777777 Evasion +20 / ASPD +10% / Holy Damage Chance 4% / Duration 30 seconds ^000000",
		"[LV 2] ^777777 Evasion +30 / ASPD +14% / Holy Damage Chance 6% / Duration 45 seconds ^000000",
		"[LV 3] ^777777 Evasion +40 / ASPD +18% / Holy Damage Chance 8% / Duration 60 seconds ^000000",
		"[LV 4] ^777777 Evasion +50 / ASPD +22% / Holy Damage Chance 10% / Duration 75 seconds ^000000",
		"[LV 5] ^777777 Evasion +60 / ASPD +26% / Holy Damage Chance 12% / Duration 90 seconds ^000000",
	].join("\n");

	SkillDescription[SKID.MH_STEINWAND] = [
		"Stone Wall",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 Casts the skill 'Safety Wall' directly under both the homunculus and master. ^000000",
		"[LV 1] ^777777 Duration 30 seconds ^000000",
		"[LV 2] ^777777 Duration 45 seconds ^000000",
		"[LV 3] ^777777 Duration 60 seconds ^000000",
		"[LV 4] ^777777 Duration 75 seconds ^000000",
		"[LV 5] ^777777 Duration 90 seconds ^000000",
	].join("\n");

	SkillDescription[SKID.MH_HEILIGE_STANGE] = [
		"Heilage Stange",
		"Max Level:^777777 5 ^000000",
		"ATK Type:^777777 Holy, Long Range, Magic attack ^000000",
		"Effect : ^777777 Deals holy property magic damage to a target and all those around them. ^000000",
		"[LV 1] ^777777 750% ATK  / Area 3 x 3 cells ^000000",
		"[LV 2] ^777777 1000% ATK  / Area 3 x 3 cells ^000000",
		"[LV 3] ^777777 1250% ATK  / Area 3 x 3 cells ^000000",
		"[LV 4] ^777777 1500% ATK  / Area 3 x 3 cells ^000000",
		"[LV 5] ^777777 1750% ATK  / Area 5 x 5 cells ^000000",
	].join("\n");

	SkillDescription[SKID.MH_ANGRIFFS_MODUS] = [
		"Angriffs Modus",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 Improves the homunculus's attack power for a period of time, but drastically reduces evasion and defense. ",
		"Canot be used in combination with 'Goldene Ferse'. ^000000",
		"[LV 1] ^777777 +70 ATK  / -50 DEF / -60 Evasion / Duration 30 seconds^000000",
		"[LV 2] ^777777 +90 ATK  / -70 DEF / -80 Evasion / Duration 45 seconds^000000",
		"[LV 3] ^777777 +110 ATK  / -90 DEF / -100 Evasion / Duration 60 seconds^000000",
		"[LV 4] ^777777 +130 ATK  / -110 DEF / -120 Evasion / Duration 75 seconds^000000",
		"[LV 5] ^777777 +150 ATK  / -130 DEF / -140 Evasion / Duration 90 seconds^000000",
	].join("\n");

	SkillDescription[SKID.MH_STYLE_CHANGE] = [
		"Style Change",
		"Max Level:^777777 1 ^000000",
		"Effect : ^777777 Switches your homunculus combat style between fighter and grappler.",
		"While in fighter style, the homunculus will gain spirit spheres as it deals or receives damage. ^000000",
	].join("\n");

	SkillDescription[SKID.MH_SONIC_CRAW] = [
		"Sonic Claw",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 Usable only in Fighter style. Deals a high speed claw attack to one target.",
		"The number of hits dealt is equal to the number of spirit spheres. If you have no spirit spheres, the skill will fail.^000000",
		"[LV 1] ^777777 40% ATK ^000000",
		"[LV 2] ^777777 80% ATK ^000000",
		"[LV 3] ^777777 120% ATK ^000000",
		"[LV 4] ^777777 160% ATK ^000000",
		"[LV 5] ^777777 200% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.MH_SILVERVEIN_RUSH] = [
		"Silver Bain Rush",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 Usable only in Fighter style. The skill must be used directly after Sonic Claw.",
		"When used, consumes 1 spirit sphere.",
		"Deals damage to the target as has a chance to cause stun. ^000000",
		"[LV 1] ^777777 150% ATK / 25% Stun Chance ^000000",
		"[LV 2] ^777777 300% ATK / 30% Stun Chance ^000000",
		"[LV 3] ^777777 450% ATK / 35% Stun Chance ^000000",
		"[LV 4] ^777777 600% ATK / 40% Stun Chance ^000000",
		"[LV 5] ^777777 750% ATK / 45% Stun Chance ^000000",
	].join("\n");

	SkillDescription[SKID.MH_MIDNIGHT_FRENZY] = [
		"Midnight Frenzy",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 Usable only after casting Silvervein Rush. Consumes 2 spirit spheres.",
		"Deals high damage and has a chance to cause Fear status.",
		"The chance to cause fear is increased with more spirit spheres.",
		"The skill 'Sonic Claw' can be used directly after. ^000000",
		"[LV 1] ^777777 300% ATK ^000000",
		"[LV 2] ^777777 600% ATK ^000000",
		"[LV 3] ^777777 900% ATK ^000000",
		"[LV 4] ^777777 1200% ATK ^000000",
		"[LV 5] ^777777 1500% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.MH_TINDER_BREAKER] = [
		"Tinder Breaker",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 Approaches a target and holds them using a locking technique.",
		"When using this skill, both the homunculus and target become locked in place unable to move, reducing flee to 0.",
		"Using the skill consumes 1 spirit sphere. The damage and duration of the lock is influence by the Homunculus's STR. ^000000",
		"[LV 1] ^777777 100% ATK ^000000",
		"[LV 2] ^777777 200% ATK ^000000",
		"[LV 3] ^777777 300% ATK ^000000",
		"[LV 4] ^777777 400% ATK ^000000",
		"[LV 5] ^777777 500% ATK ^000000",
	].join("\n");

	SkillDescription[SKID.MH_CBC] = [
		"Continual Break Combo",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 Can only be used in combination with Tinder Breaker. Consumes 1 spirit spheres.",
		"Deals damage and continually drains the target's SP. When used against monsters it deals additional damage instead of draining SP.",
		"Like tinder breaker, the target and homunculus cannot move and have flee reduced to 0.",
		"The duration is influenced by the Homunculus's STR. ^000000",
		"[LV 1] ^777777 400 Base damage ^000000",
		"[LV 2] ^777777 800 Base damage  ^000000",
		"[LV 3] ^777777 1200 Base damage  ^000000",
		"[LV 4] ^777777 1600 Base damage  ^000000",
		"[LV 5] ^777777 2000 Base damage  ^000000",
	].join("\n");

	SkillDescription[SKID.MH_EQC] = [
		"Eternal Quick Combo",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 Can only be used in combination with C.B.C. Consumes 2 spirit spheres.",
		"Main damage is dependent on the difference between Eleanor's and the target's HP. Targets are also Stunned, lose additional HP, and have their Equipment ATK and DEF reduced. Once the entire combo has completed, Eleanor will be freed from Close Confine status, allowing movement again. This skill may not be used on Boss monsters.^000000",
		"[LV 1] ^777777 MHP -2% / ATK/DEF -5%  ^000000",
		"[LV 2] ^777777 MHP -4% / ATK/DEF -10%  ^000000",
		"[LV 3] ^777777 MHP -6% / ATK/DEF -15%  ^000000",
		"[LV 4] ^777777 MHP -8% / ATK/DEF -20%  ^000000",
		"[LV 5] ^777777 MHP -10% / ATK/DEF -25%  ^000000",
	].join("\n");

	SkillDescription[SKID.MH_MAGMA_FLOW] = [
		"Magma Flow",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 When the homunculus receives damage there's a chance for it to eject magma around it,",
		"dealing fire damage to all targets in an area around the homunculus.^000000",
		"[LV 1] ^777777 100% ATK / Area 3 x 3 Cells  / Success Rate 3%^000000",
		"[LV 2] ^777777 200% ATK / Area 3 x 3 Cells  / Success Rate 6%^000000",
		"[LV 3] ^777777 300% ATK / Area 3 x 3 Cells  / Success Rate 9%^000000",
		"[LV 4] ^777777 400% ATK / Area 5 x 5 Cells  / Success Rate 12%^000000",
		"[LV 5] ^777777 500% ATK / Area 5 x 5 Cells  / Success Rate 15%^000000",
	].join("\n");

	SkillDescription[SKID.MH_GRANITIC_ARMOR] = [
		"Granitic Armor",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 Aranges volcanic rock to create a form of hard armor.",
		"Increases defense of the homunculus and player and reduces damage taken.",
		"However, when the skill ends you lose some of your HP. Duration is 60 seconds.^000000",
		"[LV 1] ^777777 2% Damage Reduction / 6% HP Reduction ^000000",
		"[LV 2] ^777777 4% Damage Reduction / 12% HP Reduction ^000000",
		"[LV 2] ^777777 6% Damage Reduction / 18% HP Reduction ^000000",
		"[LV 4] ^777777 8% Damage Reduction / 24% HP Reduction ^000000",
		"[LV 5] ^777777 10% Damage Reduction / 30% HP Reduction ^000000",
	].join("\n");

	SkillDescription[SKID.MH_LAVA_SLIDE] = [
		"Lava Slide",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777  Causes a burst of lava which damages all targets an area.",
		"Targets that are hit have a chance to incur the burning status. ^000000",
		"[LV 1] ^777777 10% Burning Chance ^000000",
		"[LV 2] ^777777 20% Burning Chance ^000000",
		"[LV 3] ^777777 30% Burning Chance ^000000",
		"[LV 4] ^777777 40% Burning Chance ^000000",
		"[LV 5] ^777777 50% Burning Chance ^000000",
	].join("\n");

	SkillDescription[SKID.MH_PYROCLASTIC] = [
		"Pyroclastic",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 Converts both the homunculus' and Geneticist's weapons to Fire-element and increases ATK.",
		"Adds a chance to autocast 'Hammer Fall' when attacking.",
		"Upon the skill ending, the Geneticist's weapon may break. ",
		"The higher level your homunculus, the greater the increase in attack power. ^000000",
		"[LV 1] ^777777 Duration 60 seconds ^000000",
		"[LV 2] ^777777 Duration 90 seconds ^000000",
		"[LV 3] ^777777 Duration 120 seconds ^000000",
		"[LV 4] ^777777 Duration 150 seconds ^000000",
		"[LV 5] ^777777 Duration 180 seconds ^000000",
	].join("\n");

	SkillDescription[SKID.MH_VOLCANIC_ASH] = [
		"Volcanic Ash",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 Disperses volcanic ash into the air, causing volcanic ash status to all those struck.",
		"While affected by volcanic ash, you have your hit rate halved and skills have a 50% chance of failure.",
		"Additionally, while within the area fire attacks deal additional damage, demihuman targets have their defense reduced by 50%, and water property monsters will have their attack power and evasion lowered by 50%.",
		"The duration of volcanic ash status is increased with skill level. A maximum of 3 can be active at once.^000000",
		"[LV 1] ^777777 Duration 8 seconds ^000000",
		"[LV 2] ^777777 Duration 16 seconds ^000000",
		"[LV 3] ^777777 Duration 24 seconds ^000000",
		"[LV 4] ^777777 Duration 32 seconds ^000000",
		"[LV 5] ^777777 Duration 40 seconds ^000000",
	].join("\n");

	SkillDescription[SKID.KO_YAMIKUMO] = [
		"'Ͽ' ('''')",
		"Max Level:^777777 1 ^000000",
		"Effect : ^777777 Hide one's presence. Similar to Thief hide skill.",
		"Using this skill again and when SP becomes 0.",
		"Continuously drains a certain amount of SP while this state is active.^000000",
	].join("\n");

	SkillDescription[SKID.KO_RIGHT] = [
		"Right Hand Mastery",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect : ^777777 When two weapons are equipped. Recovers the damage reduction penalty for the right hand.",
		"Additionally, Damage is boosted when this skill reaches level 4 and above.^000000",
		"[LV 1] ^777777 ATK 80% ^000000",
		"[LV 2] ^777777 ATK 90% ^000000",
		"[LV 3] ^777777 ATK 100% ^000000",
		"[LV 4] ^777777 ATK 110% ^000000",
		"[LV 5] ^777777 ATK 120% ^000000",
	].join("\n");

	SkillDescription[SKID.KO_LEFT] = [
		"Left Hand Mastery",
		"Max Level:^777777 5 ^000000",
		"Type:^000099 Passive ^000000",
		"Effect : ^777777 When two weapons are equipped. Recovers the damage reduction penalty for the left hand.^000000",
		"[LV 1] ^777777 ATK 60% ^000000",
		"[LV 2] ^777777 ATK 70% ^000000",
		"[LV 3] ^777777 ATK 80% ^000000",
		"[LV 4] ^777777 ATK 90% ^000000",
		"[LV 5] ^777777 ATK 100% ^000000",
	].join("\n");

	SkillDescription[SKID.KO_JYUMONJIKIRI] = [
		"Cross Strike",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 ī'Էο' & '''''''' 'հ'(''̪) ''ų. '''' '''''' '''''''' '''' '''' '' 3 'ʰ' <'''' ''ó> '''°' 'ȴ'.",
		"'' '''' ''ó '''''' '''' 'ٽ' '''ں''''' '''''ϸ', '''' '''' '''''''' '''' '' 'ִ'. ",
		"'''''''' BaseLV '' '''' '''' '߰' '''''''' '''' '''''Ѵ'. ^000000",
		"[LV 1] ^777777 ATK 150% / Range 3 cells ^000000",
		"[LV 2] ^777777 ATK 300% / Range 4 cells ^000000",
		"[LV 3] ^777777 ATK 450% / Range 5 cells ^000000",
		"[LV 4] ^777777 ATK 600% / Range 6 cells ^000000",
		"[LV 5] ^777777 ATK 750% / Range 7 cells ^000000",
	].join("\n");

	SkillDescription[SKID.KO_SETSUDAN] = [
		"''ȥ '''' ('''' ''Ө)",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 '''' ''ǥ'' 'ҿ︵Ŀ ''ų [''ȥ] '迭'' '''''' 'ް' '''' '''', '߰' '''''''' '߻''ϸ'",
		"'ش' ''ȥ ''ų'' '''''' ''''''Ų''. ''ȥ ''ų'' '''''' '''' '''' '߰' '''''''' '''''Ѵ'. ^000000",
		"[LV 1] ^777777 ATK 100% ^000000",
		"[LV 2] ^777777 ATK 200% ^000000",
		"[LV 3] ^777777 ATK 300% ^000000",
		"[LV 4] ^777777 ATK 400% ^000000",
		"[LV 5] ^777777 ATK 500% ^000000",
	].join("\n");

	SkillDescription[SKID.KO_BAKURETSU] = [
		"'''' '''''' (''ۡ'''')",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 '''߷''' '''' '''''̸' '''', ȿ'' '''' '''' '''' '''''' '''ظ' 'ش'.",
		"''ų '''' '', '''' '''''' 1 '''' 'Ҹ''Ѵ'. '''' '''''̴' '''''' ''''â'' '''''' 'ִ' '͸''''' 'Ҹ''ȴ'. ('''' '''''' '''' 'Ұ')^000000",
		"[LV 1] ^777777 Range 7 cells / Range of Effect 3 x 3^000000",
		"[LV 2] ^777777 Range 8 cells / Range of Effect 3 x 3^000000",
		"[LV 3] ^777777 Range 9 cells  / Range of Effect 3 x 3^000000",
		"[LV 4] ^777777 Range 10 cells / Range of Effect 3 x 3^000000",
		"[LV 5] ^777777 Range 11 cells / Range of Effect 3 x 3^000000",
	].join("\n");

	SkillDescription[SKID.KO_HAPPOKUNAI] = [
		"'ȹ' '''''' (''۰'''')",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 'ڽ''' '߽''''' '''' '''' '''' '''' '''''' '''''̷' '''''''' ''''''.",
		"''ų '''' '', '''''' '''''' 8 '''' 'Ҹ''Ѵ'. ^000000",
		"[LV 1] ^777777 '''' 9 x 9 '' ^000000",
		"[LV 2] ^777777 '''' 9 x 9 '' ^000000",
		"[LV 3] ^777777 '''' 9 x 9 '' ^000000",
		"[LV 4] ^777777 '''' 9 x 9 '' ^000000",
		"[LV 5] ^777777 '''' 11 x 11 '' ^000000",
	].join("\n");

	SkillDescription[SKID.KO_MUCHANAGE] = [
		"'''' '''''' ('''')",
		"Max Level:^777777 10 ^000000",
		"Effect : ^777777  '''' ''ų ['''' ''''''] '' 'Ŀ''' ''. 'ִ' 100,000 Zeny '' '''', '''' '''''' '''' '''''' '''''' '''''' '''' '''÷''' '''''''' '''' '' 'ִ'. '''' '''''Ϳ''Դ' '''''' '''ظ''' ''''''. ^000000",
		"[LV 1] ^777777 Consumes 10,000 zeny / Damage 5,000 ~ 10,000 ^000000",
		"[LV 2] ^777777 Consumes 20,000 zeny / Damage 10,000 ~ 20,000^000000",
		"[LV 3] ^777777 Consumes 30,000 zeny / Damage 15,000 ~ 30,000^000000",
		"[LV 4] ^777777 Consumes 40,000 zeny / Damage 20,000 ~ 40,000^000000",
		"[LV 5] ^777777 Consumes 50,000 zeny / Damage 25,000 ~ 50,000^000000",
		"[LV 6] ^777777 Consumes 60,000 zeny / Damage 30,000 ~ 60,000^000000",
		"[LV 7] ^777777 Consumes 70,000 zeny / Damage 35,000 ~ 70,000^000000",
		"[LV 8] ^777777 Consumes 80,000 zeny / Damage 40,000 ~ 80,000^000000",
		"[LV 9] ^777777 Consumes 90,000 zeny / Damage 45,000 ~ 90,000^000000",
		"[LV 10] ^777777 Consumes 100,000 zeny / Damage 50,000 ~ 100,000^000000",
	].join("\n");

	SkillDescription[SKID.KO_HUUMARANKA] = [
		"ǳ'''''''' ''ȭ (''ت'''''' - '''')",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 ǳ'''''''''' '''' 7 x 7 '' '''' '''' '''' '''''' '''''''' ''''''.",
		"'''''ڰ' '''''' ['''' ''ų : ǳ'''''''' ''''''] '''' '' DEX / AGI '' '''' '''' '''ݷ''' '''''Ѵ'.^000000",
		"[LV 1] ^777777 ATK 150 % / Range 9 cells ^000000",
		"[LV 2] ^777777 ATK 300 % / Range 10 cells ^000000",
		"[LV 3] ^777777 ATK 450 % / Range 11 cells ^000000",
		"[LV 4] ^777777 ATK 600 % / Range 12 cells ^000000",
		"[LV 5] ^777777 ATK 750 % / Range 13 cells ^000000",
	].join("\n");

	SkillDescription[SKID.KO_MAKIBISHI] = [
		"''Ű'''' ('''''' 'Ѹ''')",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 '''''''''' ħ'' '޸' '''''' '''' '''''̸' 'ڽ' 'ֺ''' 'ٴڿ' 'ѷ', '̰''' '''' '''' 'Ͻ''''''' '̵''Ҵ''̳' '''' '''·' ''''''. ",
		"''ų '''''' '''' '''' 'ٴڿ' 'Ѹ''' '''''' '''''ϸ', '̵' '߿''' ''ų '''''' '''''ϴ'.^000000",
		"[LV 1] ^777777 '''''' 'Ҹ' '''' 3 ''  ^000000",
		"[LV 2] ^777777 '''''' 'Ҹ' '''' 4 ''  ^000000",
		"[LV 3] ^777777 '''''' 'Ҹ' '''' 5 ''  ^000000",
		"[LV 4] ^777777 '''''' 'Ҹ' '''' 6 ''  ^000000",
		"[LV 5] ^777777 '''''' 'Ҹ' '''' 7 ''  ^000000",
	].join("\n");

	SkillDescription[SKID.KO_MEIKYOUSISUI] = [
		"'''''''' ((٥'''''')",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 10 'ʰ' '''''' '''''Ͽ' HP, SP '' '''' 'ӵ''' ȸ'''Ѵ'. ''ų '''' '߿''' '''''' '̵''Ұ' '''°' 'ȴ'. ",
		"'''''''' '''¿''' '''''' '޾''' '', '''' Ȯ'''' '''''''' '''' '''' '''' 'ִ'.^000000",
		"[LV 1] ^777777 Recovers HP by 2% / SP by 1% per second ^000000",
		"[LV 2] ^777777 Recovers HP by 4% / SP by 2% per second ^000000",
		"[LV 3] ^777777 Recovers HP by 6% / SP by 3% per second ^000000",
		"[LV 4] ^777777 Recovers HP by 8% / SP by 4% per second ^000000",
		"[LV 5] ^777777 Recovers HP by 10% / SP by 5% per second ^000000",
	].join("\n");

	SkillDescription[SKID.KO_ZANZOU] = [
		"ȯ'' - 'ܻ' ('''' - '''')",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 ȯ'''' 'ڽŰ' 'Ȱ''' 'н''' '''''' ''''. '''''' '' 'н''' '''''' HP'' '''''', HP'' 0 '' 'Ǹ' 'Ҹ''Ѵ'.",
		"'''''''' MSP '''' '''' '''', 'ܻ''' '߰''''' HP '' '''Եȴ'.^000000",
		"[LV 1] ^777777 Clone HP 6000 ^000000",
		"[LV 2] ^777777 Clone HP 9000 ^000000",
		"[LV 3] ^777777 Clone HP 12000 ^000000",
		"[LV 4] ^777777 Clone HP 15000 ^000000",
		"[LV 5] ^777777 Clone HP 18000 ^000000",
	].join("\n");

	SkillDescription[SKID.KO_KYOUGAKU] = [
		"ȯ'' - '''' (''''- '''')",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 '''' 1 ü'''' ȯ'''' 'ɾ', '''''' '''' '''''' '''Ͻ'Ű'' '''''' '''''ͷ' 'ٲ''' 'Ѵ'.",
		"'' ȿ'''' 'ɸ' '''''' '''ӽð' '''' '''''' 'ٲٰų' '''''' '' '''' 'ȴ'. '' ȿ'''' 'Ʊ' '' '''''Ϳ''Դ' '''''''' 'ʴ´'.",
		"'' ''ų'' '''''''''''' '''' '''''ϴ'.^000000",
		"[LV 1] ^777777 Reduce all stats by 2 ~ 3 ^000000",
		"[LV 2] ^777777 Reduce all stats by 4 ~ 6 ^000000",
		"[LV 3] ^777777 Reduce all stats by 6 ~ 9 ^000000",
		"[LV 4] ^777777 Reduce all stats by 8 ~ 12 ^000000",
		"[LV 5] ^777777 Reduce all stats by 10 ~ 15 ^000000",
	].join("\n");

	SkillDescription[SKID.KO_JYUSATSU] = [
		"ȯ'' - 'ֻ' (''''- ''߯)",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 '''' 1 ü'''' ȯ'''' 'ɾ', '''''' HP'' '''ҽ'Ű'' '''ָ' 'Ǵ'.",
		"'''' '''' Ȯ'''' '''''̻' ['ڸ'] '' 'Ǵ'. '' ['ڸ'] '''''̻''' 'ڽŰ' '''ų' 'ڽź''' '''' ''''''",
		"'''뿡'Ը' '''''Ǹ'. '''''Ϳ''Դ' '''''''' 'ʴ´'.^000000",
	].join("\n");

	SkillDescription[SKID.KO_GENWAKU] = [
		"ȯ'' - ȯȤ ('''' - '''')",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 ''ǥ '''''' 'ڽ''' ''ġ'' '''' 'ٲ۴'. '''''' '' '''''' '''' Ȯ'''' '''''̻' [ȥ'']'' '''' '''' 'ִ'.^000000",
	].join("\n");

	SkillDescription[SKID.KO_IZAYOI] = [
		"'' ''''''°'' '' ('''''')",
		"Max Level:^777777 5 ^000000",
		"Effect : ^777777 ''ų '''' '' '''ڰ' '''''ϴ' '''' ''ų'' '''' ĳ'''''' '''''''', '''' ĳ'''' 'ð''' '''''''' 'پ''''',  MATK '' ''''ġ '''''Ѵ'.^000000",
	].join("\n");

	SkillDescription[SKID.KO_KAHU_ENTEN] = [
		"ȭ'' : ''õ (''ݬ : '''')",
		"Max Level:^777777 1^000000",
		"Effect : ^777777  '''' '''''' '̿''' '''' '''⸦ ''ȯ'Ͽ' ȭ'Ӽ' 'ι''' '''ݷ''' ''''''Ų''.",
		"'ִ' 10 '' '''''' '''''' ''ȯ'' '' '''''', 10 '''' '''⸦ ''ȯ'' '''', '''⸦ ȭ'Ӽ''''' ''ȭ''Ų''. ",
		"''ų '''' '' '''' '''' 1 '''' 'Ҹ''Ѵ'.^000000",
	].join("\n");

	SkillDescription[SKID.KO_HYOUHU_HUBUKI] = [
		"'''' : '뼳 (޼ݬ : '''')",
		"Max Level:^777777 1^000000",
		"Effect : ^777777 '''''' '''''' '̿''' '''' '''⸦ ''ȯ'Ͽ' '''Ӽ' 'ι''' '''ݷ''' ''''''Ų''.",
		"'ִ' 10 '' '''''' '''''' ''ȯ'' '' '''''', 10 '''' '''⸦ ''ȯ'' '''', '''⸦ '''Ӽ''''' ''ȭ''Ų''.",
		"''ų '''' '' '''''' '''' 1 '''' 'Ҹ''Ѵ'.^000000",
	].join("\n");

	SkillDescription[SKID.KO_KAZEHU_SEIRAN] = [
		"ǳ'' : û'' (''ݬ : ''չ)",
		"Max Level:^777777 1^000000",
		"Effect : ^777777 'ٶ''' '''''' '̿''' 'ٶ''' '''⸦ ''ȯ'Ͽ' ǳ'Ӽ' 'ι''' '''ݷ''' ''''''Ų''.",
		"'ִ' 10 '' '''''' '''''' ''ȯ'' '' '''''', 10 '''' '''⸦ ''ȯ'' '''', '''⸦ ǳ'Ӽ''''' ''ȭ''Ų''.",
		"''ų '''' '' 'ٶ''' '''' 1 '''' 'Ҹ''Ѵ'.^000000",
	].join("\n");

	SkillDescription[SKID.KO_DOHU_KOUKAI] = [
		"'''' : '''' (''ݬ : ˧'')",
		"Max Level:^777777 1^000000",
		"Effect : ^777777 '''' '''''''' '''' '''⸦ ''ȯ'Ͽ' '''''''' '''ݷ°' '''''''' ''''''Ų''.",
		"'ִ' 10 '' '''''' '''''' ''ȯ'' '' '''''', 10 '''' '''⸦ ''ȯ'' '''', '''⸦ '''Ӽ''''' ''ȭ''Ų''.",
		"''ų '''' '' '''' '''' 1 '''' 'Ҹ''Ѵ'.^000000",
	].join("\n");

	SkillDescription[SKID.KO_KAIHOU] = [
		"Technique Kaihou",
		"Max Level:^777777 1^000000",
		"Effect : ^777777 '''' 1 ü'''' '''''' 'ִ' '''''' '''' 'ع''Ͽ' '''''''' ''''''. '''''' 'Ӽ''' ''ȯ'' '''''' 'Ӽ''' ''''''.^000000",
	].join("\n");

	SkillDescription[SKID.KO_ZENKAI] = [
		"'''' ''''",
		"Max Level:^777777 1^000000",
		"Effect : ^777777 '''''' 'ִ' '''''' '''' '''鿡 '''''Ͽ' 'پ''' ȿ'''' '߻'''Ű'' ''''('''') '' '''''''.",
		"^FF0000 ȭ'Ӽ' '''' - '''' '''' '''' '''''' ''ȭ '''''̻''' 'Ǵ'. '''', '''''' '''Ⱑ ȭ'Ӽ''' '''' '''ݷ''' '''''Ѵ'.^000000",
		"^0000FF '''Ӽ' '''' - '''' '''' '''' '''''' ''''/'õ'/'''' '' 'ϳ''' '''''̻''' 'Ǵ'. '''' '''''' '''Ⱑ '''Ӽ''' '''' '''ݷ''' '''''Ѵ'. ^000000",
		"^00FF00 ǳ'Ӽ' '''' - '''' '''' '''' '''''' ħ''/''''/'''''' '' 'ϳ''' '''''̻''' 'Ǵ'. '''' '''''' '''Ⱑ ǳ'Ӽ''' '''' '''ݷ''' '''''Ѵ'. ^000000",
		"^FD6202 '''Ӽ' '''' - '''' '''' '''' '''''' ''ȭ / '' '' 'ϳ''' '''''̻''' 'Ǵ'. '''' '''''' '''Ⱑ '''Ӽ''' '''', '''ݷ' '' '''''Ѵ'. ^000000",
	].join("\n");

	SkillDescription[SKID.KG_KAGEHUMI] = [
		"'׸''' ''''",
		"Max Level:^777777 5^000000",
		"Effect : ^777777  Ư'' '''' ''ų'' '''''ϰ' 'ִ' '''''' '''''''' 'Ͻ''''''' '''߰' 'ϸ', 'ش' ''ų'' '''''' ''''''Ų''.^000000",
		"[LV 1] ^777777 Range 5 x 5 cells ^000000",
		"[LV 2] ^777777 Range 7 x 7 cells ^000000",
		"[LV 3] ^777777 Range 9 x 9 cells ^000000",
		"[LV 4] ^777777 Range 11 x 11 cells ^000000",
		"[LV 5] ^777777 Range 13 x 13 cells ^000000",
	].join("\n");

	SkillDescription[SKID.KG_KYOMU] = [
		"'㹫'' '׸'''",
		"Max Level:^777777 5^000000",
		"Effect : ^777777 '''''ð' '''' '''''' '''''' 'ִ' 'ݻ''ɷ''' ''ȿȭ'Ѵ'.",
		"'㹫'' '׸''ڿ' Ȧ'''ִ' '''''' '''' Ȯ'''' '''''Ϸ''' ''ų'' '''''' '''' 'ִ'. ''ų '''''', ȯ'' 1 '''' 'Ҹ''Ѵ'. ^000000",
		"[LV 1] ^777777 Duration 10 seconds ^000000",
		"[LV 2] ^777777 Duration 15 seconds ^000000",
		"[LV 3] ^777777 Duration 20 seconds ^000000",
		"[LV 4] ^777777 Duration 25 seconds ^000000",
		"[LV 5] ^777777 Duration 30 seconds ^000000",
	].join("\n");

	SkillDescription[SKID.KG_KAGEMUSYA] = [
		"'׸''' ''''",
		"Max Level:^777777 5^000000",
		"Effect : ^777777 '''' 1 ü'''' '''''ð' '''' [''ų : '''' ''''] 'ɷ''' 'ο''Ѵ'.",
		"'''ӽð' '''' '' '' 1 SP '' 'Ҹ''ϰ' 'ȴ'. ''ų '''' '', ȯ'' 1 '''' 'Ҹ''Ѵ'.^000000",
		"[LV 1] ^777777 Duration 60 seconds ^000000",
		"[LV 2] ^777777 Duration 90 seconds ^000000",
		"[LV 3] ^777777 Duration 120 seconds ^000000",
		"[LV 4] ^777777 Duration 150 seconds ^000000",
		"[LV 5] ^777777 Duration 180 seconds ^000000",
	].join("\n");

	SkillDescription[SKID.OB_ZANGETSU] = [
		"'ϱ׷''' 'ʽ´'",
		"Max Level:^777777 5^000000",
		"Effect : ^777777  '''''' '''' HP, SP ''ġ'' '''' '''''' MATK '' ATK '' ''ȭ ''Ų''. ^000000",
		"[LV 1] ^777777 Duration 60 seconds ^000000",
		"[LV 2] ^777777 Duration 75 seconds ^000000",
		"[LV 3] ^777777 Duration 90 seconds ^000000",
		"[LV 4] ^777777 Duration 105 seconds ^000000",
		"[LV 5] ^777777 Duration 120 seconds ^000000",
	].join("\n");

	SkillDescription[SKID.OB_AKAITSUKI] = [
		"'ұ''' '''' '޺'",
		"Max Level:^777777 5^000000",
		"Effect : ^777777   '' ȿ'''' 'ɸ' '''''' Ư'' HP ȸ'' ''ų'' '޾''' '', '''''' HP ȸ'' '''' '''''''' 'Ե''' 'Ѵ'.",
		"'' ''ų'' PVP '̿''' '''''''''' '÷''̾'' '''''' '' '''''', 'Ʊ' '' '''' '''''Ϳ''Դ' ȿ'''' '''''''' 'ʴ´'. ^000000",
		"[LV 1] ^777777 Duration 10 seconds ^000000",
		"[LV 2] ^777777 Duration 15 seconds ^000000",
		"[LV 3] ^777777 Duration 20 seconds ^000000",
		"[LV 4] ^777777 Duration 25 seconds ^000000",
		"[LV 5] ^777777 Duration 30 seconds ^000000",
	].join("\n");

	SkillDescription[SKID.OB_OBOROGENSOU] = [
		"'帰 '޺''' ȯ''",
		"Max Level:^777777 5^000000",
		"Effect : ^777777 '''' 1 ü'' '''' HP, SP ''ġ'' '''',  HP'' SP '' '''''''' '''' Ȥ'' '''ҽ'Ų''.",
		"'''' '帰 '޺''' ȯ'' ȿ'''' '''' '''''' ''''''''  'Ծ''' '', '' '''''''' 'ֺ''' 'ٸ' '''󿡰Ե' 'л'''Ų''. '' ''ų'' '''''Ϳ''Դ' '''''' 'ʴ´'. ^000000",
		"[LV 1] ^777777 Duration 10 seconds ^000000",
		"[LV 2] ^777777 Duration 15 seconds ^000000",
		"[LV 3] ^777777 Duration 20 seconds ^000000",
		"[LV 4] ^777777 Duration 25 seconds ^000000",
		"[LV 5] ^777777 Duration 30 seconds ^000000",
	].join("\n");

	SkillDescription[SKID.ECLAGE_RECALL] = [
		"Return to Eclage",
		"Effect: ^777777 Teleport to Eclage. Fixed casting time 3 seconds / 5 minutes cooldown after use.^000000",
	].join("\n");

	SkillDescription[SKID.ECL_SNOWFLIP] = [
		"Snow Flip",
		"^777777 ''''''ó'' 'Ͼ''' '''''' '''' 'ø' '''' ''''. '''''' 'ɸ''''' '𸣴' ''''. ^000000",
		"^777777 When used burning, bleeding, deep sleep and sleep are treated. ^000000",
	].join("\n");

	SkillDescription[SKID.ECL_PEONYMAMY] = [
		"'''''ϸ'''",
		"^777777 '''' ǰó'' '''''' 'µ''' '''' ''ȫ'''' '''''' ''''. ^000000",
		"^777777 '''' '' '''', 'õ', '''''' ġ'''Ѵ'. ^000000",
	].join("\n");

	SkillDescription[SKID.ECL_SADAGUI] = [
		"'''ٱ'",
		"^777777 '''''' 'ڷ' '''̸''ø' 'Ӹ''' '''''' '''' '''''' '''' '''' ''''''. '''''' '''ۿ뵵 'ִ' ''. ^000000",
		"^777777 '''' '' '''', '''', ȥ'', ȯ'''' ġ'''Ѵ'. ^000000",
	].join("\n");

	SkillDescription[SKID.ECL_SEQUOIADUST] = [
		"Sequoia Dust",
		"^777777 '''''' '''''' 'ٿ' 'پ''ִ' '''' 'ν''''''''' '''Ƽ' '''''''' '''' ''ȭ 'ɷ''' '''''Ѵ'. ^000000",
		"^777777 '''' '' ''ȭ, '''', '''', '', ''ø'' '''', '''''' ''Ű'''' ġ'''Ѵ'. ^000000",
	].join("\n");


	return SkillDescription;
});