

const auth = require('./authentication');
const aer256 = require('./aer256');
const co = require('co');
if (process.argv.length < 4) {
	console.log('using:');
	console.log('Usage: password.js <username> <password> <is_admin(true/false)>');
} else {
	co(function* () {
		console.log('Setting up database.');
		//yield global.db.setup('ecs.db');
		let is_admin = 0;
		if (process.argv[4]) {
			is_admin = process.argv[4] == 'true';
		}
		const user = {
			username: process.argv[2],
			password: yield auth.encryptPassword(process.argv[3]),
			is_admin: is_admin
		}
		console.log(user);
		
		let a= yield aer256.crypt('nacho ariza victoria','hbq123');
		console.log(a);
		let b= yield aer256.decrypt(a,'hbq123');
		console.log(a,b);
		 b= yield aer256.decrypt(a,'hbq123');
		//yield global.db.saveUser(user);
		console.log(b);
	}).catch(err => {
		console.error(err);
		throw err
	})
}