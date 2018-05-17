process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // for auto-generate certificates
var request = require('request');
var http = require('http'),
	httpProxy = require('http-proxy');

//
// Create a proxy server with latency
//
var proxy = httpProxy.createProxyServer({changeOrigin: true});

//
// Create your server that makes an operation that waits a while
// and then proxies the request
//
http.createServer(function (req, res) {
	// This simulates an operation that takes 500ms to execute

		proxy.web(req, res, {
			target: 'http://localhost:9008'
		});

}).listen(8008);

//
// Create your target server
//
http.createServer(function (req, res) {
	//res.writeHead(200, { 'Content-Type': 'text/html' });
	console.log('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
	//res.end();
	//https://portal.santandercashnexus.com
	
	req.headers["host"]='https://portal.santandercashnexus.com';
	
	res.writeHead(200, { 'Content-Type': 'text/html' });
	
	request.get('https://portal.santandercashnexus.com', function (err, result) {
		if (err) {
			console.error('error:' + err);
		}
		else {
			//console.log(result.body);
			res.write(result.body);
			res.end();
		
		}
	});

	
	
	

}).listen(9008);