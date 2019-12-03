// const debug = require('debug')('tmdbgs:tvshow-repository');
const TvShow = require('../models/tvshow');

class TvShowRepository {

	constructor({ apiKey, requester, database, userId }) {
		this.apiKey = apiKey;
		this.requester = requester;
		this.favoritesCollection = database.collection('favorite');
		this.userId = userId;
	}

	async _getUserFavoriteTvShows() {
		const queryResult = await this.favoritesCollection.find({
			userId: this.userId
		}).toArray();
		return queryResult.map(item => item.tvShowId);
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

		const tvShowIsFavoriteQuery = async () => {
			const dbDocument = await this.favoritesCollection.findOne({
				tvShowId,
				userId: this.userId
			});
			return !!dbDocument;
		};

		const [tvShowRaw, { cast: castRaw }, isFavorite ] = await Promise.all(
			[tvShowDetailRequest(), tvShowCastRequest(), tvShowIsFavoriteQuery()]
		);

		return new TvShow({ tvShowRaw, castRaw, isFavorite });
	}

	async searchTvShows({ searchTerm, language, page = 1 }) {
		const searchRequest = () => (
			this.requester.request({
				path: `/3/search/tv`,
				query: {
					api_key: this.apiKey,
					query: encodeURIComponent(searchTerm),
					language,
					page
				}
			})
		);

		const favoritesQuery = () => this._getUserFavoriteTvShows();

		const [searchResultsRaw, favoriteTvshows ] = await Promise.all(
			[searchRequest(), favoritesQuery()]
		);

		return searchResultsRaw.results.map(
			t => new TvShow({ tvShowRaw: t, isFavorite: favoriteTvshows.includes(t.id) })
		);
	}

	async getByType({ type, language, page = 1 }) {
		const getByTypeRequest = () => (
			this.requester.request({
				path: `/3/tv/${type}`,
				query: {
					api_key: this.apiKey,
					language,
					page
				}
			})
		);

		const favoritesQuery = () => this._getUserFavoriteTvShows();

		const [getByTypeResultsRaw, favoriteTvshows ] = await Promise.all(
			[getByTypeRequest(), favoritesQuery()]
		);

		return getByTypeResultsRaw.results.map(
			t => new TvShow({ tvShowRaw: t, isFavorite: favoriteTvshows.includes(t.id) })
		);
	}

	async getSimilars({ tvShowId, language, page = 1 }) {
		const similarsQuery = () => (
			this.requester.request({
				path: `/3/tv/${tvShowId}/similar`,
				query: {
					api_key: this.apiKey,
					language,
					page
				}
			})
		);

		const favoritesQuery = () => this._getUserFavoriteTvShows();

		const [similarsResultsRaw, favoriteTvshows ] = await Promise.all(
			[similarsQuery(), favoritesQuery()]
		);

		return similarsResultsRaw.results.map(
			t => new TvShow({ tvShowRaw: t, isFavorite: favoriteTvshows.includes(t.id) })
		);
	}

	async saveFavorite({ tvShowId }) {
		let dbResult = await this.favoritesCollection.findOne({
			tvShowId,
			userId: this.userId
		});

		if (dbResult) {
			throw new Error('The TvShow is already a favorite one foe the user.');
		}

		dbResult = await this.favoritesCollection.insertOne({ 
			tvShowId, 
			userId: this.userId 
		});
		
		return dbResult.result.ok === 1;
	}

	async removeFavorite({ tvShowId }) {
		const dbResult = await this.favoritesCollection.deleteOne({
			tvShowId, 
			userId: this.userId
		});
		return dbResult.result.ok === 1;
	}
}

// I don't use static class fields because ESLint complains
// and I don't to waste my time arguing with him
TvShowRepository.types = {
	POPULAR: 'popular',
	TOP_RATED: 'top_rated'
};

module.exports = TvShowRepository;
