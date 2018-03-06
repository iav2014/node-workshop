
var cp = require('child_process');

function start(n) {
	function intervalFunc() {
		subproc.send({
			cmd: true,
			counter: counter--
		});
	}
	var counter = n;
	if (!process.send) {
		var subproc = cp.fork(__dirname + '/subprocess');
		subproc.on('message', function (data) {
			if (data.cmd) {
				console.log(__filename, 'received data from my child!', data);
				if (data.counter <= 0) {
					clearInterval(timer);
					process.exit(0);
				}
			}
		});
		
		
		
		var timer = setInterval(intervalFunc, 1500);
	}
}

start(10);

