/**
 * Loaders/LuaBytes.js
 *
 * Loaders for parsing table in LUB files (only table, no function, etc...)
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

define( ['Utils/BinaryReader'], function( BinaryReader )
{
	'use strict';


	/**
	 * LuaByte Constants (macro)
	 */
	var SIZE_OP    =  6;
	var SIZE_A     =  8;
	var SIZE_B     =  9;
	var SIZE_C     =  9;
	var SIZE_Bx    =  SIZE_C + SIZE_B;

	var POS_OP     =  0;
	var POS_A      =  POS_OP + SIZE_OP;
	var POS_C      =  POS_A  + SIZE_A;
	var POS_B      =  POS_C  + SIZE_C;
	var POS_Bx     =  POS_C;
	var MAXARG_Bx  =  ( 1 << SIZE_Bx ) - 1;
	var MAXARG_sBx =  MAXARG_Bx >> 1;


	/**
	 * LuaByte macro (inline function compiled by the browser)
	 */
	function MASK1(n,p)    { return (~((~0)<<n))<<p; }
	function GET_OPCODE(i) { return (i>>POS_OP) & MASK1(SIZE_OP,0); }
	function GETARG_A(i)   { return (i>>POS_A)  & MASK1(SIZE_A,0); }
	function GETARG_B(i)   { return (i>>POS_B)  & MASK1(SIZE_B,0) - 256; }
	function GETARG_C(i)   { return (i>>POS_C)  & MASK1(SIZE_C,0) - 256; }
	function GETARG_BX(i)  { return (i>>POS_Bx) & MASK1(SIZE_Bx,0); }
	//function GETARG_sBx(i) { return GETARG_Bx(i)-MAXARG_sBx; }


	/**
	 * Define enumeration
	 */
	var OP = (function ENUM(_in) {
		for( var out = {}, i=0, count=_in.length; i<count; ++i ) {
			out[i] = _in[i];
			out[_in[i]] = i;
		}
		return out;
	})([
		'MOVE',         //R(A) := R(B)
		'LOADK',        //R(A) := Kst(Bx)
		'LOADBOOL',     //R(A) := (Bool)B; if (C) pc++
		'LOADNIL',      //R(A) := ... := R(B) := nil
		'GETUPVAL',     //R(A) := UpValue[B]
		'GETGLOBAL',    //R(A) := Gbl[Kst(Bx)]
		'GETTABLE',     //R(A) := R(B)[RK(C)]
		'SETGLOBAL',    //Gbl[Kst(Bx)] := R(A)
		'SETUPVAL',     //UpValue[B] := R(A)
		'SETTABLE',     //R(A)[RK(B)] := RK(C)
		'NEWTABLE',     //R(A) := {} (size = B,C)
		'SELF',         //R(A+1) := R(B); R(A) := R(B)[RK(C)]
		'ADD',          //R(A) := RK(B) + RK(C)
		'SUB',          //R(A) := RK(B) - RK(C)
		'MUL',          //R(A) := RK(B) * RK(C)
		'DIV',          //R(A) := RK(B) / RK(C)
		'MOD',          //R(A) := RK(B) % RK(C)
		'POW',          //R(A) := RK(B) ^ RK(C)
		'UNM',          //R(A) := -R(B)
		'NOT',          //R(A) := not R(B)
		'LEN',          //R(A) := length of R(B)
		'CONCAT',       //R(A) := R(B).. ... ..R(C)
		'JMP',          //pc+=sBx
		'EQ',           //if ((RK(B) == RK(C)) ~= A) then pc++
		'LT',           //if ((RK(B) <  RK(C)) ~= A) then pc++
		'LE',           //if ((RK(B) <= RK(C)) ~= A) then pc++
		'TEST',         //if not (R(A) <=> C) then pc++
		'TESTSET',      //if (R(B) <=> C) then R(A) := R(B) else pc++
		'CALL',         //R(A), ... ,R(A+C-2) := R(A)(R(A+1), ... ,R(A+B-1))
		'TAILCALL',     //return R(A)(R(A+1), ... ,R(A+B-1))
		'RETURN',       //return R(A), ... ,R(A+B-2)(see note)
		'FORLOOP',      //R(A)+=R(A+2);
		'FORPREP',      //R(A)-=R(A+2); pc+=sBx
		'TFORLOOP',     //R(A+3), ... ,R(A+2+C) := R(A)(R(A+1), R(A+2));
		'SETLIST',      //R(A)[(C-1)*FPF+i] := R(A+i), 1 <= i <= B
		'CLOSE',        //close all variables in the stack up to (>=) R(A)
		'CLOSURE',      //R(A) := closure(KPROTO[Bx], R(A), ... ,R(A+n))
		'VARARG'        //R(A), R(A+1), ..., R(A+B-1) = vararg
	]);


	/**
	 * LUB Class Constructor
	 *
	 * @param {ArrayBuffer} data - optional file buffer to load
	 */
	function LuaByte( data )
	{
		if( data ) {
			this.load(data);
		}
	}


	/**
	 * LuaByte File loader
	 *
	 * @param {ArrayBuffer} data - buffer to load
	 */
	LuaByte.prototype.load = function load( data )
	{
		this.fp        = new BinaryReader(data);
		this.signature = this.fp.readString(4);
		this.version   = this.fp.readByte();

		// Check file header
		if( this.signature !== '\x1bLua' ) {
			throw new Error('LuaByte::load() - Invalid header "' + this.signature + '" detected, must be "\x1bLua"');
		}

		if( this.version !== 0x51 && this.version !== 0x50 ) {
			throw new Error('LuaByte::load() - Invalid version "' + this.version + '" detected, must be "' + 0x50 + '" or "' + 0x51 + '"');
		}

		if( this.version > 0x50 && this.fp.readByte() !== 0x00 ) {
			throw new Error('LuaByte::load() - Invalid format version, must be "0x00"');
		}

		if( this.fp.readByte() !== 0x01 ) {
			throw new Error('LuaByte::load() - Invalid little endian, must be 0x01');
		}

		if( this.fp.readByte() !== 0x04 ) {
			throw new Error('LuaByte::load() - Invalid size of int, must be 0x04');
		}

		if( this.fp.readByte() !== 0x04 ) {
			throw new Error('LuaByte::load() - Invalid size of size_t, must be 0x04');
		}

		if( this.fp.readByte() !== 0x04 ) {
			throw new Error('LuaByte::load() - Invalid instruction size, must be 0x04');
		}

		// File Format 0x50 define it's own constant (but should be static)
		if( this.version === 0x50 ) {
			SIZE_OP = this.fp.readByte();
			SIZE_A  = this.fp.readByte();
			SIZE_B  = this.fp.readByte();
			SIZE_C  = this.fp.readByte();

			SIZE_Bx = SIZE_C + SIZE_B;
			POS_A   = POS_B + SIZE_B;
			POS_C   = SIZE_OP;
			POS_B   = POS_C + SIZE_C;
			POS_Bx  = POS_C;

			MAXARG_Bx  =  ( 1 << SIZE_Bx )-1;
			MAXARG_sBx =    MAXARG_Bx >> 1;
		}

		if( this.fp.readByte() !== 0x08 ) {
			throw new Error('LuaByte::load() - Invalid size of double, must be 0x08');
		}

		if( this.version === 0x51 ) {
			if( this.fp.readByte() !== 0x00 ) {
				throw new Error('LuaByte::load() - Invalid integrer');
			}
		}
		else {
			this.fp.seek( 0x08, SEEK_CUR);
		}

		this.func = this.loadFunc();
	};


	/**
	 * LuaByte File loader
	 *
	 * @return {object} function structure
	 */
	LuaByte.prototype.loadFunc = function loadFunc()
	{
		var fp  = this.fp;
		var out = {};

		out.source_name  =  fp.readString(fp.readULong());
		out.first_line   =  fp.readLong();
		out.last_line    =  (this.version > 0x50) ? fp.readLong() : out.first_line;
		out.nups         =  fp.readByte();
		out.nparams      =  fp.readByte();
		out.is_varag     =  fp.readByte();
		out.stack_size   =  fp.readByte();

		if( this.version === 0x51 ) {
			out.instructions =  this.loadGeneric(this.loadInstruction);
			out.constants    =  this.loadGeneric(this.loadConstant);
			out.funcs        =  this.loadGeneric(this.loadProto);
			out.line_num     =  this.loadGeneric(this.loadInstruction); // Same structure than instruction
			out.locals       =  this.loadGeneric(this.loadLocal);
			out.upvalues     =  this.loadGeneric(this.loadUpValue);
		}
		else {
			out.line_num     =  this.loadGeneric(this.loadInstruction); // Same structure than instruction
			out.locals       =  this.loadGeneric(this.loadLocal);
			out.upvalues     =  this.loadGeneric(this.loadUpValue);
			out.constants    =  this.loadGeneric(this.loadConstant);
			out.funcs        =  this.loadGeneric(this.loadProto);
			out.instructions =  this.loadGeneric(this.loadInstruction);
		}

		return out;
	};


	/**
	 * LuaByte generic callback loader
	 *
	 * @param {function} callback
	 * @return {Array} result
	 */
	LuaByte.prototype.loadGeneric = function loadGeneric( callback )
	{
		var i, count = this.fp.readLong();
		var out = new Array(count);

		for( i=0; i<count; ++i ) {
			out[i] = callback.call(this);
		}

		return out;
	};


	/**
	 * @return {mixed} constant
	 */
	LuaByte.prototype.loadConstant = function loadConstant()
	{
		switch( this.fp.readByte() ) {
			case 0:  return 'undefined';
			case 1:  return !this.fp.readByte();
			case 3:  return  this.fp.readDouble();
			case 4:  return  this.fp.readString(this.fp.readULong());
			default: return '...';
		}
	};


	/**
	 * @return {object} local structure
	 */
	LuaByte.prototype.loadLocal = function loadLocal()
	{
		var fp = this.fp;
		return {
			name:  fp.readString(fp.readULong()),
			start: fp.readLong(),
			end:   fp.readLong()
		};
	};


	/**
	 * @return {number} instruction id
	 */
	LuaByte.prototype.loadInstruction = function loadInstruction()
	{
		return this.fp.readLong();
	};


	/**
	 * @return {object} function structure
	 */
	LuaByte.prototype.loadProto = function loadProto()
	{
		return this.loadFunc();
	};


	/**
	 * @return {string}
	 */
	LuaByte.prototype.loadUpValue = function loadUpValue()
	{
		return this.fp.readString(this.fp.readULong());
	};


	/**
	 * Execute reversed script
	 */
	LuaByte.prototype.execute = function execute()
	{
		eval(this.reverse());
	};


	/**
	 * Reverse the script
	 * @return {string} javascript code
	 */
	LuaByte.prototype.reverse = function reverse()
	{
		return this.reverseFunc(this.func);
	};


	/**
	 * Reverse function structure (0x51 version)
	 *
	 * @param {object} func - function structure
	 * @return {string} javascript code
	 */
	LuaByte.prototype.reverseFunc = function ReverseFunc( func )
	{
		var constants = func.constants;
		var storage   = [];
		var memory    = [];
		var table = '', str = '', global = '';
		var i, count;
		var instr, type, index;
		var op, a, b, c, bc;
		var isNum = /^\d+$/;

		for( i = 0, count = func.instructions.length; i < count; ++i ) {

			instr = func.instructions[i];

			op = GET_OPCODE(instr);
			a  = GETARG_A(instr);
			b  = GETARG_B(instr);
			c  = GETARG_C(instr);
			bc = GETARG_BX(instr);

			switch( op) {

				case OP.NEWTABLE:
					memory.push('{}');
					str += '(function(exports){\r\n';
					break;

				case OP.GETGLOBAL:
					if( !storage[a] ) {
						storage[a] = bc;
					}
					global = 'DB.' + constants[storage[a]];
					break;

				case OP.GETTABLE:
					if( !storage[a] ) {
						storage[a] = c;
					}
					if( storage[c] ) {
						c = storage[c];
					}
					table = '["' + constants[c] + '"]';
					break;

				case OP.RETURN:
					str += '\r\n\r\n';
					return str;

				case OP.CLOSURE:
					str += '\r\n\r\n';
					return str;

				case OP.SETGLOBAL:
					if( memory.length ) {
						type = memory.pop();
						str +=  '})(DB.' + constants[bc] + '=' + type + ');\r\n\r\n\r\n';
					}
					else {
						str += 'DB.' + constants[bc] +' = ';
					}
					break;


				case OP.SETTABLE:
					if( storage[b] ) {
						b = storage[b];
					}
					if( storage[c] ) {
						c = storage[c];
					}

					index  = '';
					if( global.length ) {
						index += global;
						if( table.length ) {
							index += table;
						}
					}

					str   +=  '\texports[' + ( index.length ? index : ('"' + constants[b] + '"')) + '] = ';
					str   +=  ( isNum.test(constants[c]) ? constants[c] : '"' + constants[c] + '"' ) + ';\r\n';
					global = '';
					table  = '';
					break;

				case OP.LOADK:
					storage[a] = bc;
					break;
			}
		}

		for( i = 0, count = func.funcs.length; i < count; ++i ) {
			str += '\r\n' + this.reverseFunc( func.funcs[i] );
		}
	
		return str;
	};


	return LuaByte;
});