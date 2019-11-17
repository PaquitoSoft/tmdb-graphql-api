require('request').debug = true;

const Requester = require('../../src/infra/requester');
const TvShowRepository = require('../../src/repository/tvshow-repository');

const host = 'https://api.themoviedb.org';
const apiKey = 'eddf5d49244134d1e874e1915d41d6e4';

const requester = new Requester({ host });
const repository = new TvShowRepository({ apiKey, requester });

async function test() {
	const data = await repository.getByType({
		type: TvShowRepository.types.LATEST,
		language: 'en'
	});

	console.log(data);
}

test();
