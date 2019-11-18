const { writeFileSync } = require('fs');
const { join } = require('path');

const FIXTURES_FOLDER = join(process.cwd(), 'spec', 'fixtures')

function createFixture(name, data) {
	writeFileSync(
		join(FIXTURES_FOLDER, name), 
		JSON.stringify(data, null, 4)
	);
}

function loadFixture(name) {
	return require(join(FIXTURES_FOLDER, name));
}

function buildRepository(Repository, requestFake) {
	return new Repository({ 
		apiKey: '123456', 
		requester: { request: requestFake }
	});
}

module.exports = { 
	createFixture,
	loadFixture,
	buildRepository
};
