const ImagesConfig = require('../models/images-config');

class ConfigurationRepository {

	constructor({ apiKey, requester }) {
		this.apiKey = apiKey;
		this.requester = requester;
	}

	async getImagesConfiguration() {
		const result = await this.requester.request({
			path: '/3/configuration',
			query: {
				api_key: this.apiKey
			}
		});

		return new ImagesConfig(result.images);
	}

}

module.exports = ConfigurationRepository;
