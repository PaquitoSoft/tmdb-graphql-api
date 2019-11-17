const qs = require('querystring');
const _request = require('request');
const debug = require('debug')('tmdbgs:requester');

class Requester {
	constructor({ host }) {
		this.host = host;
	}

	request({
		method = 'GET',
		path,
		query,
		body
	}) {
		debug(`Requesting URL: ${this.host}${path}${query ? '?' + qs.stringify(query) : ''}`);
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
				} else if (response.statusCode >= 400) {
					error = new Error('Response error: ' + response.statusCode);
					error.info = {
						statusCode: response.statusCode,
						data: body
					};
					reject(error);
				} else {
					resolve(body);
				}
			});
		});
	}
}

module.exports = Requester;
