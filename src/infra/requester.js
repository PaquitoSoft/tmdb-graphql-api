const qs = require('querystring');
const _request = require('request');
const debug = require('debug')('tmdbgs:requester');
const { store, read } = require('./cache');

class Requester {
	constructor({ host }) {
		this.host = host;
	}

	getResponseCacheTtl(response) {
		let result = null;
		const cacheControlHeader = response.caseless.get('cache-control');

		if (cacheControlHeader) {
			const maxAgeDirective = cacheControlHeader
				.split(',')
				.map(part => part.trim())
				.find(part => /^max-age=/.test(part));

			result = maxAgeDirective && maxAgeDirective.split('=')[1];
		}

		return result;
	}

	request({
		method = 'GET',
		path,
		query,
		body
	}) {
		const fullURL = `${this.host}${path}${query ? '?' + qs.stringify(query) : ''}`;
		debug(`Requesting URL: ${fullURL}`);
		return new Promise((resolve, reject) => {
			
			const cachedValue = read(fullURL);
			if (method === 'GET' && cachedValue) {
				debug(`Serving cached content for URL: ${fullURL}`);
				return resolve(cachedValue);
			}
		
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
					const cacheTtl = this.getResponseCacheTtl(response);
					if (cacheTtl) {
						store(fullURL, body, { ttl: cacheTtl });
					}
					
					debug(`Serving fresh content for URL: ${fullURL}`);
					resolve(body);
				}
			});
		});
	}
}

module.exports = Requester;
