console.log('procesos distribuidos, misma maquina');

//
console.log('ejecución de procesos de SSOO - spawn');
console.log('entorno asincrono');
const {spawn} = require('child_process');
const child = spawn('find', ['.', '-name', '*.js','-print']);
//const child = spawn('./external.sh');
child.on('exit', function (code, signal) {
	console.log('child process exited with ' +
		`code ${code} and signal ${signal}`);
});
child.on('error', function (code, signal) {
	console.log('not found ' +
		`code ${code} and signal ${signal}`);
});
child.stdout.on('data', (data) => {
	console.log(`child stdout:\n${data}`);
});

child.stderr.on('data', (data) => {
	console.error(`child stderr:\n${data}`);
});
console.log('fin?');