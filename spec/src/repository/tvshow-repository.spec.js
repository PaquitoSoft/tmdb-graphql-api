const sinon = require('sinon');
const expect = require('expect.js');
const { loadFixture } = require('../../spec-utils');
const TvShowRepository = require('../../../src/repository/tvshow-repository');

function getRepository(requestFake) {
	return new TvShowRepository({ 
		apiKey: '123456', 
		requester: { request: requestFake }
	});
}

describe('TvShow Repository', () => {

	describe('getByType', () => {

		it('Should load popular tv shows', async () => {
			const fixture = loadFixture('popular-tvshows.json');
			const requestFake = sinon.fake.returns(fixture);
			const tvShows = await getRepository(requestFake).getByType({
				type: TvShowRepository.types.POPULAR,
				language: 'en'
			});

			expect(tvShows).to.have.length(20);

			const firstFixture = fixture.results[0];
			const firstResult = tvShows[0];
			expect(firstResult.name).to.equal(firstFixture.name);
			expect(firstResult.votesCount).to.equal(firstFixture.vote_count);
		});

	});

	describe('searchTvShows', () => {
		it('Should allow searching tvshows by an arbitrary text');
	});

	describe('getDetails', () => {
		it('Should load a TvShow details');
	});

	describe('getSimilars', () => {
		it('Should load similar TvShows to a given one');
	});

});
