/**
 * http server example
 * can be started in single && cluster mode
 *
 * @public startSingle && startCluster
 */
'use strict';
var logger = require('./lib/logger/logger').logger(__filename);
var https = require('https');
var http = require('http');
var fs = require('fs');
var cluster = require('cluster');
var bodyParser = require('body-parser');
var config = require('./config/config');
var middleware = require('./lib/middleware/requestBody');
var morgan = require('morgan');
var express = require('express');
var theHTTPLog = morgan(config.morgan.trace, config.morgan.stream);
var app = express();
var started = false;

// passport security JWT
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var jwt = require('jsonwebtoken');
var moment = require('moment');

passport.use(new BearerStrategy(function (accessToken, next) {
		//test token
		try {
			jwt.verify(accessToken, 'secret', {algorithm: 'HS256'},
				function (err, decoded) {
					if (err) {
						//incorrect token
						console.error(err);
						return next(null, false, {message: 'unauthorized'});
					}
					else {
						if (decoded.exp <= moment().unix()) {
							// token expired
							next(null, false, {message: 'Token expired'});
						}
						// token ok
						next(null, decoded, {scope: '*'});
					}
				});
		} catch (err) {
			console.log(err);
		}
	}
));

function startSingle() {
	var key = fs.readFileSync(__dirname + '/cert/server.key'); // your server.key && pem files
	var cert = fs.readFileSync(__dirname + '/cert/server.pem');
	var https_options = {
		key: key,
		cert: cert
	};
	
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(theHTTPLog);
	app.use(middleware.requestBodyParams);
	app.use(bodyParser.json({limit: '5mb'}));
	app.use(express.static(process.cwd() + '/public')); // for public contents
	app.get('/listen', function (req, res) {
		logger.debug('get method called');
		logger.debug(JSON.stringify(req.params));
		res.sendStatus(200);
	});
	https.createServer(https_options, app).on('error', console.error).listen(config.https);
	logger.debug('HTTPS server running on:' + config.https);
	http.createServer(app).on('error', console.error).listen(config.http);
	logger.debug('HTTP server running on:' + config.http);
	/**
	 * listen callback rest service
	 *
	 * @returns http code 200
	 * @public
	 */
	app.post('/listen', function (req, res) {
		console.log(req.body);
		res.sendStatus(200);
	});
	app.get('/listen', function (req, res) {
		res.sendStatus(200);
	});
	app.get('/api/restricted',
		passport.authenticate('bearer', {session: false}),
		function (req, res) {
			res.json(req.user);
		});
	app.post('/api/restricted',
		passport.authenticate('bearer', {session: false}),
		function (req, res) {
			res.json(req.user);
		});
	started = true;
}

function startCluster() {
	if (!cluster.isMaster) {
		console.log('launched by master fork process!');
		startSingle();
	}
	else {
		console.log('I am a master process !');
		var threads = require('os').cpus().length;
		while (threads--) cluster.fork();
		cluster.on('death', function (worker) {
			cluster.fork();
			logger.info('Process died and restarted, pid:', worker.pid);
		});
	}
}

function active() {
	return started;
}

module.exports.single = startSingle;
module.exports.cluster = startCluster;
module.exports.active = active;



