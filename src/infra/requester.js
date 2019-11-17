const _request = require('request');

class Requester {
	constructor({ host }) {
		this.host = host;
	}

	request({
		method = 'GET',
		path,
		query = {},
		body
	}) {
		return new Promise((resolve, reject) => {
			_request({
				url: `${this.host}${path}`,
				method,
				qs: query,
				json: true,
				body: (body ? JSON.stringify(body) : undefined),
				gzip: true
			}, (error, response, body) => {
				if (error) {
					reject(error);
				} else {
					resolve(body);
				}
			});
		});
	}
}

module.exports = Requester;
