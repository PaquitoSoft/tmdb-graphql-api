const TvShow = require('../models/tvshow');

class TvShowRepository {

	static types = {
		POPULAR: 'popular',
		TOP_RATED: 'top_rated'
	}

	constructor({ apiKey, requester }) {
		this.apiKey = apiKey;
		this.requester = requester;
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


	async getDetails({ tvShowId, language }) {
		const result = await this.requester.request({
			path: `/3/tv/${tvShowId}`,
			query: {
				api_key: this.apiKey,
				language
			}
		});

		return new TvShow(result);
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

module.exports = TvShowRepository;
