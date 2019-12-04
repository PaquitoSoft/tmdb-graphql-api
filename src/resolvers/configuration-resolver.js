const { buildRepository } = require('./resolver-helpers');
const ConfigurationRepository = require('../repository/configuration-repository');

function getImagesConfiguration(_, __, context) {
	const repository = buildRepository(ConfigurationRepository, context);

	return repository.getImagesConfiguration();
}

const configurationResolvers = {
	queries: {
		getImagesConfiguration
	}
};

module.exports = configurationResolvers;
