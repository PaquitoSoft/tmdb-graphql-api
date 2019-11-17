class SeasonRepository {

	constructor({ apiKey, requester }) {
		this.apiKey = apiKey;
		this.requester = requester;
	}

	getDetails({ tvShowId, seasonId, language }) {
		return this.requester.request({
			path: `/3/tv/${tvShowId}/season/${seasonId}`,
			query: {
				api_key: this.apiKey,
				language
			}
		});
	}

}

module.exports = SeasonRepository;
