/**
 * DB/Emotions.js
 *
 * List all emotions
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define(function()
{
	"use strict";

	/// Enum Emotions
	/// [ <index in sprite> {, <high priority shortcut>, <other shortcut>}]

	var list = [

		// ET_SURPRISE = 0
		[ 0, "!" ],

		// ET_QUESTION = 1
		[ 1, "?" ],

		// ET_DELIGHT = 2
		[ 2, "ho", "delight", "rlQma", "¤¡" ],

		// ET_THROB = 3
		[ 3, "lv", "heart", "gkxm" ],

		// ET_SWEAT = 4
		[ 5, "swt", "sweat", "Eka" ],

		// ET_AHA = 5
		[ 6, "ic", "aha", "dkgk" ],

		// ET_FRET = 6
		[ 7, "an", "fret", "Wkwmd" ],

		// ET_ANGER = 7
		[ 8, "ag", "ghk", "anger" ],

		// ET_MONEY = 8
		[ 9, "$", "money", "ehs" ],

		// ET_THINK = 9
		[ 10, "..." ],

		// ET_SCISSOR = 10
		[ 12, "scissors", "rkdnl", "gawi" ],

		// ET_ROCK = 11
		[ 11, "rock", "wnajr", "bawi", "qkdnl", "¹ÙÀ§" ],

		// ET_WRAP = 12
		[ 13, "paper", "qh", "bo" ],

		// ET_FLAG = 13
		[ 14 ],

		// ET_BIGTHROB = 14
		[ 4, "lv2" ],

		// ET_THANKS = 15
		[ 15, "thx", "¤£" ],

		// ET_KEK = 16
		[ 16, "wah" ],

		// ET_SORRY = 17
		[ 17, "sry", "sorry" ],

		// ET_SMILE = 18
		[ 18, "heh", "ÇÏÇÏ", "¤·", "smile" ],

		// ET_PROFUSELY_SWEAT = 19
		[ 19, "swt2" ],

		// ET_SCRATCH = 20
		[ 20, "hmm" ],

		// ET_BEST = 21
		[ 21, "no1", "¿øÃò", "¤º" ],

		// ET_STARE_ABOUT = 22
		[ 22, "??" ],

		// ET_HUK = 23
		[ 23, "omg", "¤¾" ],

		// ET_O = 24
		[ 24, "oh", "o" ] ,

		// ET_X = 25
		[ 25, "X", "x" ],

		// ET_HELP = 26
		[ 26, "hlp", "¤º¤º", "help" ],

		// ET_GO = 27
		[ 27, "go" ],

		// ET_CRY = 28
		[ 28, "sob" ],

		// ET_KIK = 29
		[ 29, "gg", "Å±", "¤»", "ÄÉÄÉ" ],

		// ET_CHUP = 30
		[ 30, "kis" ],

		// ET_CHUPCHUP = 31
		[ 31, "kis2" ],

		// ET_HNG = 32
		[ 32, "pif" ],

		// ET_OK = 33
		[ 33, "ok", "²ô´ö" ],

		// ET_CHAT_PROHIBIT = 34
		[1000],

		// ET_INDONESIA_FLAG = 35
		[ 34 ],

		// ET_STARE = 36
		[ 35, "bzz", "e1", "¤¹" ],

		// ET_HUNGRY = 37
		[ 36, "rice", "e2" ],

		// ET_COOL = 38
		[ 37, "awsm", "e3" ],

		// ET_MERONG = 39
		[ 38, "meh", "e4" ],

		// ET_SHY = 40
		[ 39, "shy", "e5", "ºÎ" ],

		// ET_GOODBOY = 41
		[ 40, "pat", "e6" ],

		// ET_SPTIME = 42
		[ 41, "mp", "¿¥", "e7" ],

		// ET_SEXY = 43
		[ 42, "slur", "e8" ],

		// ET_COMEON = 44
		[ 43, "com", "e9" ],

		// ET_SLEEPY = 45
		[ 44, "yawn", "¤¸",  "e10" ],

		// ET_CONGRATULATION = 46
		[ 45, "grat", "¤º¤»", "e11", "grat" ],

		// ET_HPTIME = 47
		[ 46, "hp", "ÇÇ", "e12" ],

		// ET_PH_FLAG = 48
		[ 47 ],

		// ET_MY_FLAG = 49
		[ 48 ],

		// ET_SI_FLAG = 50
		[ 49 ],

		// ET_BR_FLAG = 51
		[ 50 ],

		// ET_SPARK = 52
		[ 51, "fsh", "e13" ],

		// ET_CONFUSE = 53
		[ 52, "spin", "e14" ],

		// ET_OHNO = 54
		[ 53, "sigh", "ÇÑ¼û", "e15" ],

		// ET_HUM = 55
		[ 54, "dum", "e16" ],

		// ET_BLABLA = 56
		[ 55, "crwd", "½Ã²ø½Ã²ø", "e17" ],

		// ET_OTL = 57
		[ 56, "desp", "otl", "e18" ],

		// ET_DICE1 = 58
		[ 57, "dice", "e19"],

		// ET_DICE2 = 59
		[ 58 ],

		// ET_DICE3 = 60
		[ 59 ],

		// ET_DICE4 = 61
		[ 60 ],

		// ET_DICE5 = 62
		[ 61 ],

		// ET_DICE6 = 63
		[ 62 ],

		// ET_INDIA_FLAG = 64
		[ 63 ],

		// ET_LUV = 65
		[ 64, "love", "e20" ],

		// ET_FLAG8 = 66
		[ 65 ],

		// ET_FLAG9 = 67
		[ 66 ],

		// ET_MOBILE = 68
		[ 67, "mobile", "e21" ],

		// ET_MAIL = 69
		[ 68, "mail", "e22" ],

		// ET_ANTENNA0 = 70
		[ 69, "antenna0,", "e23" ],

		// ET_ANTENNA1 = 71
		[ 70, "antenna1", "e24" ],

		// ET_ANTENNA2 = 72
		[ 71, "antenna2", "e25" ],

		// ET_ANTENNA3 = 73
		[ 72, "antenna3", "e26" ],

		// ET_HUM2 = 74
		[ 73, "hum", "Èì", "e27" ],

		// ET_ABS = 75
		[ 74, "abs", "¸Û", "e28" ],

		// ET_OOPS = 76
		[ 75, "oops", "¿ó", "e29" ],

		// ET_SPIT = 77
		[ 76, "spit", "À¡", "e30" ],

		// ET_ENE = 78
		[ 77, "ene", "e31", "Å»·Â" ],

		// ET_PANIC = 79
		[ 78, "panic", "e32", "øÈ²" ],

		// ET_WHISP = 80
		[ 79, "whisp", "e33", "À§½ºÆÛ" ]

/*
80 ! quest
81 ? quest
82 ! job
83 ? job
84 ! special
85 ? special
*/
	];


	var i, j, count, size;
	var commands = {};
	var names    = {};
	var indexes  = {};

	for (i = 0, count = list.length; i < count; ++i) {
		size = list[i].length;
		for (j = 1; j < size; ++j) {
			commands[ list[i][j] ] = i;
		}

		if (size > 0) {
			indexes[i] = list[i][0];
		}

		if (size > 1) {
			names[i] = list[i][1];
		}
	}


	/**
	 * Exports
	 */
	return {
		commands: commands,
		names:    names,
		indexes:  indexes
	};
});