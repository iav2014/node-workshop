console.log('[nodejs - subprocess]');
process.send({cmd: true,counter:10}); // send signal to parent process

process.on('message', function (data) {
	console.log(__filename,'reveived data from my parent!->', data);
	process.send(data);
});
