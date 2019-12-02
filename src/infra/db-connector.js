const { MongoClient } = require('mongodb');

const DB_NAME = 'tmdb-api';

let dbClient;

module.exports.connect = function connect({ connectionUrl }) {
	return new Promise((resolve, reject) => {
		MongoClient.connect(
			connectionUrl, 
			{ useUnifiedTopology: true }, 
			(error, client) => {
				if (error) return reject(error);
				dbClient = client;
				return resolve(client.db(DB_NAME));
			}
		);

	});
};

module.exports.disconnect = function disconnect() {
	if (dbClient) {
		dbClient.close();
	}
};
