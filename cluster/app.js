'use strict';
var http = require('http');
http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end(`Hello World ${process.pid}`);
}).listen(3000);