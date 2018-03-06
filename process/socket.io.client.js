var socket = require('socket.io-client');

var io = socket.connect('http://localhost:8080',
	{
		'reconnection': true,
		transports: ['polling', 'websocket', 'xhr-polling'],
		'max reconnection attempts': 10,
		'reconnectionDelay': 500,
		'reconnectionAttempts': 10, "force new connection": true
	});

io.on('error', function () {
	console.error('Error connection');
});
io.on('done', function () {
	console.log('done!');
});
io.on('connect', function () {
	console.log('[connect]');
	io.emit('exchanger', {cmd: true, counter: 10});
	
});
io.on('exchanger', function (data) {
	console.log('[exchanger]: receive from server',data);
});
