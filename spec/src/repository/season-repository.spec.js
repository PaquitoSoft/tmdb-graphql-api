const sinon = require('sinon');
const expect = require('expect.js');
const { loadFixture, buildRepository } = require('../../spec-utils');
const SeasonRepository = require('../../../src/repository/season-repository');


describe('Season Repository', () => {
	
	describe('getDetails', () => {
		it('Should load season details', async () => {
			const tvShowId = 1234;
			const seasonNumber = 1;
			const language = 'en';
			const fixture = loadFixture('season-detail.json');
			const requestFake = sinon.fake.returns(fixture);
			const repository = buildRepository(SeasonRepository, requestFake);

			const season = await repository.getDetails({ tvShowId, seasonNumber, language});

			expect(season.seasonNumber).to.equal(seasonNumber);
			expect(season.episodes).to.not.be.empty();
			expect(requestFake.lastArg.path).to.equal(`/3/tv/${tvShowId}/season/${seasonNumber}`);
		});
	});

});
