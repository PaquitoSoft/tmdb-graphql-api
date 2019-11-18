const Season = require('../models/season');

class SeasonRepository {

	constructor({ apiKey, requester }) {
		this.apiKey = apiKey;
		this.requester = requester;
	}

	async getDetails({ tvShowId, seasonNumber, language }) {
		const result = await this.requester.request({
			path: `/3/tv/${tvShowId}/season/${seasonNumber}`,
			query: {
				api_key: this.apiKey,
				language
			}
		});

		return new Season(result);
	}

}

module.exports = SeasonRepository;
