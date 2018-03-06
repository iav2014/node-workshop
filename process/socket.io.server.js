var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(8080, function () {
	console.log('server running at http://localhost:8080');
});
io.on('connection', function (socket) {
	console.log('[client connected]');
	socket.on('exchanger', function (data) {
		console.log('[from client]:[exchanger data detected]',data);
		data.counter--;
		io.sockets.emit('exchanger', data);
	});
});
