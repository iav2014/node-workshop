var log4js = require('log4js');
var theAppLog = log4js.getLogger();
module.exports = {
	http:3000,
	https:3443,
	morgan: {
		trace: ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]',
		stream: {
			'stream': {
				write: function (str) {
					theAppLog.debug(str);
				}
			}
		}
	},
	logger: {
		levels: {
			default: 'DEBUG'
		},
		appenders: [
			{
				category: '[all]',
				type: 'console',
				layout: {
					type: 'pattern',
					pattern: '%d{yyyy-MM-ddThh:mm:ssO}|%[%p%]|%m'
				}
			}
		],
		replaceConsole: false
	},
	nosql: {
		ok: 'connected to database:',
		fail: 'error connection at database',
		database_policy: {
			retry: 0
		},
		test: {
			//@ format mongodb://<dbUser>:<dbPassword>@<host1>:<port1>,<host2>:<port2>/<dbName>?replicaSet=<replicaSetName>
			uri: "mongodb://localhost:27017,localhost:27018,localhost:27019/test?replicaSet=rs0",
			options: {
				keepAlive: 1,
				connectTimeoutMS: 30000,
				socketTimeoutMS: 0,
				autoReconnect: true
			}
		},
	},
};
