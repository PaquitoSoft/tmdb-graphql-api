const Boom = require('@hapi/boom');
const { buildRepository } = require('./resolver-helpers');
const TvShowRepository = require('../repository/tvshow-repository');

function getTypes() {
	return Object.entries(TvShowRepository.types).map(([key, value]) => ({ key, value }));
}

function getByType(root, params, context) {
	const { type, language, page } = params;
	const repository = buildRepository(TvShowRepository, context);
	
	if (!Object.values(TvShowRepository.types).includes(type)) {
		throw Boom.badRequest('Invalid TvShow type. Acceptable values are: ' +
			Object.values(TvShowRepository.types));
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

function saveFavoriteTvShow(_, params, context) {
	const { tvShowId } = params;
	const { userId } = context;
	const repository = buildRepository(TvShowRepository, context);

	if (!userId) {
		throw Boom.badRequest('No userId received. You must provided it as "userToken" header');
	}
	
	return repository.saveFavorite({ tvShowId });
}

function removeFavoriteTvShow(_, params, context) {
	const { tvShowId } = params;
	const { userId } = context;
	const repository = buildRepository(TvShowRepository, context);
	
	if (!userId) {
		throw Boom.badRequest('No userId received. You must provided it as "userToken" header');
	}

	return repository.removeFavorite({ tvShowId });
}

const tvShowResolvers = {
	queries: {
		getTypes,
		getByType,
		searchTvShows,
		getTvShowDetails,
		getSimilarsTvShows
	},
	mutations: {
		saveFavoriteTvShow,
		removeFavoriteTvShow
	}
};

module.exports = tvShowResolvers;
