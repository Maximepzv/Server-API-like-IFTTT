/*
Module options:

options.host : IP to ping
*/

module.exports = {
    start: function(options, user) {
        console.log('Reaction: pinging');
	var ping = require('ping');
	ping.sys.probe(options.host, function(isAlive){});
    }
};
