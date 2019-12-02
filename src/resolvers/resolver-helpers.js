function buildRepository(Repository, { requester, appConfig, database, userId }) {
	return new Repository({
		apiKey: appConfig.tmbdApiKey,
		requester,
		database,
		userId
	});
}

module.exports = {
	buildRepository
};
