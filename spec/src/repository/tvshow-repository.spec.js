/* eslint-disable max-lines-per-function */
const sinon = require('sinon');
const expect = require('expect.js');
const { loadFixture, buildRepository } = require('../../spec-utils');
const TvShowRepository = require('../../../src/repository/tvshow-repository');

describe('TvShow Repository', () => {
	
	async function testRepositoryOperation({
		operationName,
		operationParams,
		operationExpectation = () => true,
		fixtureName
	}) {
		const fixture = loadFixture(fixtureName);
		const requestFake = sinon.fake.returns(fixture);
		const result = await buildRepository(TvShowRepository, requestFake)[operationName](operationParams);

		operationExpectation({
			requestFake,
			requestCallArgs: requestFake.lastArg, 
			result
		});

		if (Array.isArray(result)) {
			const [firstFixture] = fixture.results;
			const [firstResult] = result;
			expect(firstResult.name).to.equal(firstFixture.name);
			expect(firstResult.votesCount).to.equal(firstFixture.vote_count);
		}
	}

	describe('getDetails', () => {
		it('Should load a TvShow details', async () => {
			const tvShowId = 99999;
			await testRepositoryOperation({
				operationName: 'getDetails',
				operationParams: {
					tvShowId,
					language: 'en'
				},
				fixtureName: 'tvshow-detail.json',
				operationExpectation: ({ result, requestFake }) => {
					expect(requestFake.getCall(0).lastArg).to.have.property('path', `/3/tv/${tvShowId}`);
					expect(requestFake.getCall(1).lastArg).to.have.property('path', `/3/tv/${tvShowId}/credits`);
					expect(result).to.have.property('name', 'Lost');
				}
			});
		});
	});

	describe('getByType', () => {

		it('Should load popular tv shows', async () => {
			await testRepositoryOperation({
				operationName: 'getByType',
				operationParams: {
					type: TvShowRepository.types.POPULAR,
					language: 'en'
				},
				fixtureName: 'popular-tvshows.json',
				operationExpectation: ({ requestCallArgs, result }) => {
					expect(requestCallArgs).to.have.property('path', `/3/tv/${TvShowRepository.types.POPULAR}`);
					expect(result).to.have.length(20);
				}
			});
		});

		it('Should load top rated tv shows', async () => {
			await testRepositoryOperation({
				operationName: 'getByType',
				operationParams: {
					type: TvShowRepository.types.TOP_RATED,
					language: 'en'
				},
				fixtureName: 'top_rated-tvshows.json',
				operationExpectation: ({ requestCallArgs, result }) => {
					expect(requestCallArgs).to.have.property('path', `/3/tv/${TvShowRepository.types.TOP_RATED}`);
					expect(result).to.have.length(20);
				}
			});
		});

	});

	describe('searchTvShows', () => {
		it('Should allow searching tvshows by an arbitrary text', async () => {
			const searchTerm = 'Heroes';
			await testRepositoryOperation({
				operationName: 'searchTvShows',
				operationParams: {
					searchTerm,
					language: 'en'
				},
				fixtureName: 'search-heroes-tvshows.json',
				requestPath: '/3/search/tv',
				operationExpectation: ({ requestCallArgs, result }) => {
					expect(requestCallArgs).to.have.property('path', '/3/search/tv');
					expect(requestCallArgs.query).to.have.property('query', searchTerm);
					expect(result).to.have.length(20);
				}
			});
		});
	});

	describe('getSimilars', () => {
		it('Should load similar TvShows to a given one', async () => {
			const tvShowId = 1234;
			await testRepositoryOperation({
				operationName: 'getSimilars',
				operationParams: {
					tvShowId,
					language: 'en'
				},
				fixtureName: 'similar-tvshows.json',
				operationExpectation: ({ requestCallArgs, result }) => {
					expect(requestCallArgs).to.have.property('path', `/3/tv/${tvShowId}/similar`);
					expect(result).to.have.length(20);
				}
			});
		});
	});

});
