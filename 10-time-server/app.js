var net = require('net');

var server = net.createServer(function(socket) {
    var date = new Date();
    // "YYYY-MM-DD hh:mm"
    socket.write(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + '\n');
    socket.end();
});

server.listen(process.argv[2]);
