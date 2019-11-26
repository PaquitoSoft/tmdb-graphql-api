const TvShow = require('../models/tvshow');

class TvShowRepository {

	constructor({ apiKey, requester }) {
		this.apiKey = apiKey;
		this.requester = requester;
	}

	async getDetails({ tvShowId, language }) {
		const tvShowDetailRequest = () => (
			this.requester.request({
				path: `/3/tv/${tvShowId}`,
				query: {
					api_key: this.apiKey,
					language
				}
			})
		);

		const tvShowCastRequest = () => (
			this.requester.request({
				path: `/3/tv/${tvShowId}/credits`,
				query: {
					api_key: this.apiKey,
					language
				}
			})
		);

		const [tvShowRaw, { cast: castRaw } ] = await Promise.all(
			[tvShowDetailRequest(), tvShowCastRequest()]
		);

		return new TvShow(tvShowRaw, castRaw);
	}

	async searchTvShows({ searchTerm, language, page = 1 }) {
		const result = await this.requester.request({
			path: `/3/search/tv`,
			query: {
				api_key: this.apiKey,
				query: encodeURIComponent(searchTerm),
				language,
				page
			}
		});

		return result.results.map(t => new TvShow(t));
	}

	async getByType({ type, language, page = 1 }) {
		const result = await this.requester.request({
			path: `/3/tv/${type}`,
			query: {
				api_key: this.apiKey,
				language,
				page
			}
		});
		
		return result.results.map(t => new TvShow(t));
	}

	async getSimilars({ tvShowId, language, page = 1 }) {
		const result = await this.requester.request({
			path: `/3/tv/${tvShowId}/similar`,
			query: {
				api_key: this.apiKey,
				language,
				page
			}
		});

		return result.results.map(t => new TvShow(t));
	}
}

// I don't use static class fields because ESLint complains
// and I don't to waste my time arguing with him
TvShowRepository.types = {
	POPULAR: 'popular',
	TOP_RATED: 'top_rated'
};

module.exports = TvShowRepository;
