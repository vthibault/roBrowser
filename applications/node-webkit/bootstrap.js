ROConfig.saveFiles  = false;
ROConfig.skipIntro  = true;
ROConfig.grfList    = 'DATA.INI';
ROConfig.servers    = 'data/clientinfo.xml';
ROConfig.packetver  = 20141223;
ROConfig.packetKeys = true;

// Add support for node.js + requirejs
window.gui = require('nw.gui');
window.requireNode = window.require;
delete window.require;
 
window.requireNode.version = process.versions.node;
delete process.versions.node;