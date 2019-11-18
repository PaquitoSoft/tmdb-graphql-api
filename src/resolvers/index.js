const { readdirSync } = require('fs');

const typeFiles = readdirSync(__dirname);
const resolverModules = typeFiles
	.filter(path => path !== 'index.js')
	.map(fileRelativePath => require(`./${fileRelativePath}`));

const buildResolvers = () => (
	resolverModules.reduce((resolvers, resolverModule) => {
		if (!resolverModule.typeName && !resolverModule.queries) return resolvers;

		resolvers = {
			...resolvers,
			...(!!resolverModule.typeName ? { [resolverModule.typeName]: resolverModule.typeResolvers } : {}),
			Query: {
				...resolvers.Query,
				...(resolverModule.queries || {})
			}
		}

		if (resolverModule.mutations) {
			resolvers.Mutation = {
				...(resolvers.Mutation || {}),
				...resolverModule.mutations
			}
		}

		return resolvers;
	}, {
		Query: {}
	})
)

module.exports.buildResolvers = buildResolvers;
