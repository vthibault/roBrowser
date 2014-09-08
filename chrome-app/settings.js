// Your custom settings
// See parameters in http://www.robrowser.com/getting-started#API
var ROConfig = {
	development: true, // don't need to compile javascript files in chrome app since it's already a package.
	servers: [{
		display:     "Demo Server",
		desc:        "roBrowser's demo server",
		address:     "5.135.190.4",
		port:        7000,
		version:     25,
		langtype:    12,
		packetver:   20131223,
		packetKeys:  true,
		socketProxy: "ws://5.135.190.4:443/",
		adminList:   [2000000]
	}]
};