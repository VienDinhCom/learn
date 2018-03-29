var http = require('http');
var url = require('url');

var Url = url.parse(process.argv[2]);

http.get({
    hostname: Url.hostname,
    port: Url.port,
    path: Url.path,
    agent: false
}, function(res) {

    res.on('data', function(data) {
        console.log(data.toString());
    });

    res.on('error', function(err) {
        console.error(err);
    });
});
