const intent = () => ({
	keywords: ['explain my framework', 'apiframework'],
	module: 'apiframework'
})

function * time_resp(query) {
	var result = 'This is the framework we have made in node js for this project. This framework is under the Test Development Design methodology and already has all the necessary scalability features to offer an advanced performance. \n' +
		'This Framework is based on a model of routes and services, which allows defining the necessary flows in the rest services, to achieve effective communication with third-party APIs, as is the case of Verbio.\n' +
		'\n' +
		'You will se a different folders:\n' +
		'cert: contains the certificates oh the server ( https)\n' +
		'connector: contains the mongoldb connector module\n' +
		'And de main folder are:\n' +
		'lib/routes: contains the entry points os the api-framework\n' +
		'lib/schemas; contains the necessary validation schemes to fix entry data values\n' +
		'lib/services: contains the business rules and define the waterfall process\n' +
		'for example:\n' +
		'training services shows:\n' +
		'\n' +
		'getPostData: recover the variables in post method.\n' +
		'CheckSchema: check the post data values to the correct schema for this service\n' +
		'scp: transfer files from asterisk audio folder to local directory\n' +
		'readTrainingFiles: recover local files and make a package \n' +
		'convertB4Files: convert all package file  to base64 \n' +
		'sendFilesToVerbio: send the base 64 files to verbio using verb apis\n' +
		'verbioTrain: send a order to verbio to training the files\n' +
		'recordDB: Store to mongodb information\n' +
		'adapter: format the output json to client.\n' +
		'\n' +
		'test: contains the Test Integration modules for each routes.';
	
	
	return {text: 'apiframework ' + result}
}

const examples = () => (
	['explain my framework', 'apiframework']
)

module.exports = {
	get: time_resp,
	intent,
	examples
}