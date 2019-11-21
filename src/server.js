require('dotenv').config();
const { ApolloServer } = require('apollo-server');

const schema = require('./schema');
const resolvers = require('./resolvers');
const Requester = require('./infra/requester');

const appConfig = {
	tmbdApiKey: process.env.TMDB_API_KEY,
	tmdbHost: process.env.TMDB_HOST
};

const server = new ApolloServer({
	// debug: true,
	typeDefs: schema,
	resolvers: resolvers.buildResolvers(),
	cors: true,
	context: () => ({
		appConfig,
		requester: new Requester({ host: appConfig.tmdbHost })
	})
});

const port = process.env.PORT || 4000;
server.listen({ port }).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
