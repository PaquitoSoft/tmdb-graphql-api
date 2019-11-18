function buildRepository(Repository, { requester, appConfig }) {
	return new Repository({
		apiKey: appConfig.tmbdApiKey,
		requester
	});
}

module.exports = {
	buildRepository
};
