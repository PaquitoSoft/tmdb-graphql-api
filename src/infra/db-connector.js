const { MongoClient } = require('mongodb');
const debug = require('debug')('tmdbgs:requester');

let dbClient;

module.exports.connect = function connect({ connectionUrl }) {
	return new Promise((resolve, reject) => {
		debug('About to connect to Mongo...');
		MongoClient.connect(
			connectionUrl, 
			{ useUnifiedTopology: true }, 
			(error, client) => {
				if (error) return reject(error);
				dbClient = client;
				debug('Connected to Mongo!');
				return resolve(client.db());
			}
		);
	});
};

module.exports.disconnect = function disconnect() {
	if (dbClient) {
		dbClient.close();
	}
};
