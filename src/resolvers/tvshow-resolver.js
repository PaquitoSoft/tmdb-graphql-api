const { buildRepository } = require('./resolver-helpers');
const TvShowRepository = require('../repository/tvshow-repository');

function getTypes() {
	return Object.entries(TvShowRepository.types).map(([key, value]) => ({ key, value }));
}

function getByType(root, params, context) {
	const { type, language, page } = params;
	const repository = buildRepository(TvShowRepository, context);
	
	// TODO Verify received type is valid. Throw an error if it's not
	if (Object.keys(TvShowRepository.types).includes(type)) {
		type = TvShowRepository.types.LATEST;
	}

	return repository.getByType({ type, language, page });
}

function searchTvShows(_, params, context) {
	const { searchTerm, language, page } = params;
	const repository = buildRepository(TvShowRepository, context);
	
	return repository.searchTvShows({ searchTerm, language, page });
}

function getTvShowDetails(_, params, context) {
	const { tvShowId, language } = params;
	const repository = buildRepository(TvShowRepository, context);
	return repository.getDetails({ tvShowId, language });
}

function getSimilarsTvShows(_, params, context) {
	const { tvShowId, language } = params;
	const repository = buildRepository(TvShowRepository, context);
	return repository.getSimilars({ tvShowId, language });
}

const tvShowResolvers = {
	typeName: 'TvShow',
	typeResolvers: {
		genres: () => [],
		networks: () => [],
		seasons: (root, args, context) => [],
		cast: () => []	
	},
	queries: {
		getTypes,
		getByType,
		searchTvShows,
		getTvShowDetails,
		getSimilarsTvShows
	}
};

module.exports = tvShowResolvers;
