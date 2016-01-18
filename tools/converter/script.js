(function(){

	"use strict";

	/**
	 * @var {Array} file given
	 */
	var _files = [];


	/**
	 * @var {Object} files definition
	 */
	var Converter = {

		ItemTable: {
			title:  "Items Table",
			output: "Items/ItemTable.js",
			txt: ["idnum2itemdesctable.txt",
			      "idnum2itemdisplaynametable.txt",
			      "idnum2itemresnametable.txt",
			      "num2itemdesctable.txt",
			      "num2itemdisplaynametable.txt",
			      "num2itemresnametable.txt",
			      "itemslotcounttable.txt"],
			xray: [],
			lua:  ["iteminfo.lua"]
		},

		HatTable: {
			title: "Hats View ID",
			output: "Items/HatTable.js",
			txt:  [],
			xray: [ "visionary_tab.txt "],
			lua:  [ "accessoryid.lua", "accname.lua"],
			lua_key: /ACCESSORY_([a-zA-Z0-9_-]+)(\s+)?=(\s+)?(\d+),?/g,
			lua_val: /\[ACCESSORY_IDs\.ACCESSORY_([a-zA-Z0-9_-]+)\](\s+)?=(\s+)?"([^"]+)",?/g
		},

		MonsterTable: {
			title: "Monsters View ID",
			output: "Monsters/MonsterTable.js",
			txt:  [],
			xray: ["monstrosity_tab.txt"],
			lua:  ["npcidentity.lua", "jobname.lua"],
			lua_key: /JT_(\w+)(.+)?\=(\s+)?(\d+),?/g,
			lua_val: /\[jobtbl\.JT_([^\]]+)\](\s+)?=(\s+)?"([^"]+)",?/g
		}
	};

	/**
	 * Convert to hex representation
	 *
	 * @param {string} string to convert
	 */
	function to_ascii(str) {
		return str.replace(/[\u0000-\uffff]/g, function(ch) {
			var code = ch.charCodeAt(0).toString(16);
			if (code.length <= 2) {
				while (code.length < 2) code = "0" + code;
				return "\\x" + code;
			} else {
				while (code.length < 4) code = "0" + code;
				 return "\\u" + code;
			}
		});
	}

	/**
	 * Evaluate code in another function
	 *
	 * @param {string} code
	 * @evil
	 */
	function sandboxEval(code) {
		try {
			return new Function('return ' + code + ';')();
		}
		catch(e) {
			return null;
		}
	}

	/**
	 * Easy XRAY parser
	 *
	 * @param {string} string to parse
	 */
	function xray_parse(content)
	{
		var id = 0;
		var output = {};
		var lines = content.split('\n');
		var i, count = lines.length;

		for (i = 0; i < count; ++i) {
			if (lines[i][0] === '!') {
				id = parseInt(lines[i].substr(1), 10);
				continue;
			}

			output[id++] = to_ascii(lines[i]);
		}

		return output;
	}

	/**
	 * Parse txt files
	 *
	 * @param {string} content to load
	 */
	function txt_parse( file )
	{
		// Remove comments
		var content  = file.content.replace(/\r\n/g, '\n');
		content      = ('\n' + content).replace(/\n(\/\/[^\n]+)/g, '');

		var elements = content.split('#');
		var i, count = elements.length;
		var output = {};
		var key;

		for (i = 0; i + 1 < count; i+= 2) {
			key = elements[i].replace(/^\s+|\s+$/g, '');

			// Not sure does client skip empty key ?
			if (!key.length) {
				alert('Malformed text file, empty key found in "'+ file.name +'"' +
					  ', after item id: ' + elements[i-2].replace(/^\s+|\s+$/g, '') + '.\n' +
					  'Skipping rest of file...'
				);
				return output;
			}

			output[key] = to_ascii(elements[i+1].replace(/^\s+|\s+$/g, ''));
		}

		return output;
	}

	/**
	 * Remove LUA comments
	 *
	 * @param {string} content
	 * @param {string} new content
	 */
	function lua_remove_comments(content) {
		// Block comment
		var start = 0, end;
		while ((start = content.indexOf('--[[')) !== -1) {
			end = content.indexOf('--]]');
			if (end === -1) {
				end = content.length;
			}

			content = content.substring(0, start) + content.substring(end + 4, end.length);
		}

		// temp replace in quote...
		content = content.replace(/"([^"]+)?--[^"]+/g, function(a){
			return a.replace(/-/g, '\\\\x2d');
		});

		// Remove inline comment
		content = content.replace(/--[^\n]+/g, '');

		// Get back --
		content = content.replace(/\\\\x2d/g, '-');

		return content;
	}

	/**
	 * Easy lua loader using regex
	 *
	 * @param {string} content of keys
	 * @param {string} content of values
	 * @param {regex} keys regex
	 * @param {regex} keys value
	 */
	function lua_parse_keyval(keyFile, valFile, key_reg, val_reg)
	{
		var content, m;
		var keys   = {};
		var output = {};

		// Parse keys
		content = lua_remove_comments(keyFile.content);
		while (m = key_reg.exec(content)) {
			keys[m[1]] = m[4];
		}

		// Parse vals
		content = lua_remove_comments(valFile.content);
		while (m = val_reg.exec(content)) {
			if (!(m[1] in keys)) {
				alert('Can\'t find index "' + m[1] + '" ' +
					  'from file "' + valFile.name + '" ' +
					  'in file "' + keyFile.name + '".\n' +
					  'Skipping...'
					 );
				continue;
			}
			output[keys[m[1]]] = to_ascii(m[4]);
		}

		return output;
	}

	/**
	 * Difficult lua loader
	 *
	 * @param {string} content
	 */
	function lua_parse_glob(content)
	{
		
		
		// Remove comments
		content = lua_remove_comments(content);

		// Some failed escaped string on lua
		content = content.replace(/\\\\\\/g, '\\');
		
		// Remove variable container
		content = content.replace(/^([^\{]+)\{/, '');
		// Encode special characters
		content = content.replace(/"([^"]+)",/g, function(a,b){
			return '"' + to_ascii(b).replace(/\\/g,'\\\\') + '",';
		});


		// Convert lua array
		content = content.replace(/\{(\s+?"[^\}]+)\}/g, '[$1]');

		// Restore key index
		content = content.replace(/\[(\w+)]\s+?=\s+?\{/g, '$1: {');

		// Convert parameters
		content = content.replace(/(\s+)(\w+)\s+?=\s+?/g, '$1"$2": ');
		

		// Remove un-needed coma
		content = content.replace(/,(\s+(\]|\}))/g, '$1').replace(/,(\s+)?$/, '');

		// Removed from the first regex
		content = '{' + content;

		// some functions code
		content = (content+'\0').replace(/\n\}[^\0]+\0/, ''); 

		// Fix curly brace
		var open  = content.split('{').length;
		var close = content.split('}').length;
		if (open > close) {
			content += '}';
		}
		
		
		return sandboxEval('(' + content + ')');
	}

	/**
	 * Load files dropped to browser
	 */
	function load(event)
	{
		var files;
		var i, count;

		// Get files
		if ('files' in this) {
			files = this.files;
		}
		else if (event.dataTransfer) {
			files = event.dataTransfer.files;
		}

		// No files ?
		if (!files || !files.length) {
			return;
		}

		// Load files
		for (i = 0, count = files.length; i <count; ++i) {
			if (!files[i].name.match(/\.(lua|txt)$/i)) {
				continue;
			}

			var reader    = new FileReader();
			reader.onload = readerLoader(files[i]);
			reader.readAsArrayBuffer(files[i]);
		}
	}

	/**
	 * Convert result from filereader.readAsArrayBuffer to string and export it
	 */
	function readerLoader(file)
	{
		return function onload(event) {
			var data, str;
			var i, count;

			data  = new Uint8Array(event.target.result);
			count = data.length;
			str   = '';

			// Convert to string
			for (i = 0; i < count; ++i) {
				if (data[i] === 0) {
					break;
				}
				str += String.fromCharCode( data[i] );
			}

			_files.push({
				name:    file.name.toLowerCase(),
				content: str
			});

			removeUsedBox();
		};
	}

	/**
	 * Show box already used
	 */
	function removeUsedBox()
	{
		var groups = document.querySelectorAll('.group');
		var i, j, count, size;
		var name, found = 0;

		count = groups.length;
		size  = _files.length;

		for (i = 0; i < count; ++i) {
			name  = groups[i].querySelector('.name').textContent.toLowerCase();

			for (j = 0; j < size; ++j) {
				if (_files[j].name === name) {
					groups[i].style.opacity = '0.2';
					found++;
					break;
				}
			}
		}

		document.querySelector('.convert').disabled = (found !== count);
	}

	/**
	 * Start convert files
	 */
	function convert()
	{
		var to   = document.querySelector('.to');
		var from = document.querySelector('.from');

		var info  = Converter[to.value];
		var files = info[from.value];

		var i, j, count, size, found;
		var out = [];

		// Check required files
		for (i = 0, count = files.length; i < count; ++i) {
			found = false;
			for (j = 0, size = _files.length; j < size; ++j) {
				if (_files[j].name === files[i]) {
					out.push(_files[j]);
					found = true;
					break;
				}
			}
			if (!found) {
				alert('Missing file "' + files[i] + '"...');
			}
		}

		// no files ?
		if (out.length !== files.length) {
			return;
		}


		function merge(from, to, method) {
			var keys = Object.keys(from);
			var i, count = keys.length;

			// Description have to be an array
			if (method.match(/DescriptionName/i)) {
				for (i = 0; i < count; ++i) {
					(to[ keys[i] ] || (to[ keys[i] ] = {}))[method] = from[keys[i]].split('\n');
				}
			}
			else if (method.match(/slotCount/i)) {
				for (i = 0; i < count; ++i) {
					(to[ keys[i] ] || (to[ keys[i] ] = {}))[method] = +from[keys[i]];
				}
			}
			else {
				for (i = 0; i < count; ++i) {
					(to[ keys[i] ] || (to[ keys[i] ] = {}))[method] = from[keys[i]];
				}
			}
		}

		// Start converting
		var output;
		switch (from.value) {
			case 'txt':
				// Just for items
				output = {};
				merge(txt_parse(out[0]), output, 'identifiedDescriptionName');
				merge(txt_parse(out[1]), output, 'identifiedDisplayName');
				merge(txt_parse(out[2]), output, 'identifiedResourceName');
				merge(txt_parse(out[3]), output, 'unidentifiedDescriptionName');
				merge(txt_parse(out[4]), output, 'unidentifiedDisplayName');
				merge(txt_parse(out[5]), output, 'unidentifiedResourceName');
				merge(txt_parse(out[6]), output, 'slotCount');
				break;

			case 'lua':
				// easy
				
				if (info.lua_key) {
					output = lua_parse_keyval(out[0], out[1], info.lua_key, info.lua_val);
				}
				// difficult
				else {
					output = lua_parse_glob(out[0].content);
				}
								if (!output) {
				alert('Sorry, something bad happened while converting lua files... Exiting.');
					return;
				}
				break;

			case 'xray':
				output = xray_parse(out[0].content);
				break;

			default:
				return;
		}

		// Save files
		save(info.output, output);
	}

	/**
	 * Save resulted object into the disk
	 *
	 * @param {string} location folder
	 * @param {object} data structure
	 */
	function save( path, data )
	{
		var content = [
			'/**',
			'* DB/' + path,
			'*',
			'* This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).',
			'*',
			'* @author Vincent Thibault',
			'* (auto-generated)',
			'*/',
			'',
			'define(function()',
			'{',
			'	"use strict";',
			'',
			'',
			'	return ' + JSON.stringify(data, null, '\t').replace(/\\\\/g, '\\').replace(/\n/g, '\n\t') + ';',
			'});'
		].join('\n');

		var blob = new Blob([content], { type: 'application/javascript' });

		var convert = document.querySelector('.convert').parentNode;
		convert.className = 'removing';

		var save   = document.querySelector('.save');

		save.parentNode.className = '';
		save.parentNode.firstChild.textContent = 'Save this file in DB/' + path; 

		save.href     = window.URL.createObjectURL(blob);
		save.download = path.replace(/.*\//,'');
		save.onclick  = function() {
			save.parentNode.className = 'removing';
			convert.className = '';
		};
	}

	/**
	 * Initialize UI
	 */
	function initialize() {
		var to        = document.querySelector('.to');
		var from      = document.querySelector('.from');
		var groups    = document.querySelectorAll('.group');
		var container = document.querySelector('.elements');
		var button    = document.querySelector('.convert');

		var i, count;

		function remove(node) {
			return function(){
				node.parentNode.removeChild(node);
			};
		}

		// Remove box
		for (i = 0, count = groups.length; i < count; ++i) {
			groups[i].classList.add('removing');
			setTimeout( remove(groups[i]), 400);
		}

		// Add new
		var files = Converter[to.value][from.value];
		for (i = 0, count = files.length; i < count; ++i) {
			var group = document.createElement('div');
			var box   = document.createElement('div');
			var name  = document.createElement('div');
			group.className  = "group";
			box.className    = "box";
			name.className   = "name";
			name.textContent = files[i];
			group.appendChild(box);
			group.appendChild(name);
			container.appendChild(group);
		}

		button.style.display = files.length ? '' : 'none';

		// complete option
		for (i = 0; i < 3; ++i) {
			if (Converter[to.value][from.children[i].value].length) {
				from.children[i].removeAttribute('disabled');
			}
			else {
				from.children[i].setAttribute('disabled', true);
			}
		}

		setTimeout(removeUsedBox, 1000);
	}

	/**
	 * Wait for page to be loaded
	 */
	window.addEventListener('load', function(){
		var elements = document.querySelectorAll('.to, .from');
		elements[0].addEventListener('change', initialize, false);
		elements[1].addEventListener('change', initialize, false);

		document.querySelector('.convert').addEventListener('click', convert, false);

		document.body.ondragover  = function(event) { event.preventDefault && event.preventDefault(); document.body.className="drag"; return false; };
		document.body.ondragend   = function(event) { event.preventDefault && event.preventDefault(); document.body.className="";     return false; };
		document.body.ondragleave = function(event) { event.preventDefault && event.preventDefault(); document.body.className="";     return false; };
		document.body.ondrop      = function(event) {
			document.body.className="";
			event.preventDefault && event.preventDefault();
			load.call(this, event);
			return false;
		};

		initialize();
	}, false);
})();