const { buildRepository } = require('./resolver-helpers');
const SeasonRepository = require('../repository/season-repository');

function getSeasonDetails(_, params, context) {
	const { tvShowId, seasonId, language } = params;
	const repository = buildRepository(SeasonRepository, context);

	return repository.getDetails({ tvShowId, seasonId, language });
}

const seasonResolvers = {
	queries: {
		getSeasonDetails
	}
};

module.exports = seasonResolvers;
