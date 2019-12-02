const NodeCache = require('node-cache');
const debug = require('debug')('tmdbgs:cache');

const cache = new NodeCache({
	checkperiod: 0 // Do not fire a garbage collection interval process
});

module.exports.store = function store(key, value, { ttl = 0 } = {}) {
	debug(`Storing key ${key} in memory with ttl ${ttl}`);
	cache.set(key, value, ttl);
};

module.exports.read = function read(key) {
	const value = cache.get(key);
	debug(`Read key ${key} from memory. Does it exist? ${!!value}`);
	return value;
};
