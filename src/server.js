require('dotenv').config();
const { ApolloServer } = require('apollo-server');

const schema = require('./schema');
const resolvers = require('./resolvers');
const Requester = require('./infra/requester');
const DbConnector = require('./infra/db-connector');

const appConfig = {
	tmbdApiKey: process.env.TMDB_API_KEY,
	tmdbHost: process.env.TMDB_HOST,
	tmdbDbConnectionUrl: process.env.TMDB_MONGO_URL
};

async function start() {
	const database = await DbConnector.connect({
		connectionUrl: appConfig.tmdbDbConnectionUrl
	});

	const server = new ApolloServer({
		// debug: true,
		typeDefs: schema,
		resolvers: resolvers.buildResolvers(),
		cors: true,
		context: ({ req }) => ({
			appConfig,
			database,
			requester: new Requester({ host: appConfig.tmdbHost }),
			userId: req.get('userToken')
		})
	});
	
	const port = process.env.PORT || 4000;
	server.listen({ port }).then(({ url }) => {
		console.log(`🚀  Server ready at ${url}`);
	});
}

start();
