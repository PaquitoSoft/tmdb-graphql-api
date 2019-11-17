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

		async function testByType({
			type,
			fixtureName,
			requestPath
		}) {
			const fixture = loadFixture(fixtureName);
			const requestFake = sinon.fake.returns(fixture);
			const tvShows = await getRepository(requestFake).getByType({
				type,
				language: 'en'
			});

			expect(requestFake.lastArg).to.have.property('path', requestPath);
			expect(tvShows).to.have.length(20);

			const firstFixture = fixture.results[0];
			const firstResult = tvShows[0];
			expect(firstResult.name).to.equal(firstFixture.name);
			expect(firstResult.votesCount).to.equal(firstFixture.vote_count);
		}

		it('Should load popular tv shows', async () => {
			await testByType({
				type: TvShowRepository.types.POPULAR,
				fixtureName: 'popular-tvshows.json',
				requestPath: `/3/tv/${TvShowRepository.types.POPULAR}`
			});
		});

		it('Should load top rated tv shows', async () => {
			await testByType({
				type: TvShowRepository.types.TOP_RATED,
				fixtureName: 'top_rated-tvshows.json',
				requestPath: `/3/tv/${TvShowRepository.types.TOP_RATED}`
			});
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
