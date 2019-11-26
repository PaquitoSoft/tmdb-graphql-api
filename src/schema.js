const { gql } = require('apollo-server');

const schema = gql`
	type TvShow {
		id: Int
		name: String
		overview: String
		originalName: String
		status: String
		backdropImagePath: String
		posterPath: String
		firstAirDate: String
		lastAirDate: String
		genres: [Genre]
		networks: [Network]
		seasonsCount: Int
		episodesCount: Int
		popularity: Float
		votesCount: Int
		votesAverage: Float
		seasons: [Season]
		cast: [Character]
	}

	type Season {
		id: Int
		name: String
		seasonNumber: Int
		posterPath: String
		airDate: String
		episodesCount: Int
		episodes: [Episode]
	}

	type Episode {
		id: Int
		name: String
		episodeNumber: Int
		imagePath: String
		airDate: String
		overview: String
		voteCount: Int
		voteAverage: Float
	}

	type Character {
		id: Int
		name: String
		imagePath: String
		actorName: String
	}

	type Genre {
		id: Int
		name: String
	}

	type Network {
		id: Int
		name: String
		logoPath: String
		country: String
	}

	type TvShowType {
		key: String
		value: String
	}

	type Query {
		searchTvShows(searchTerm: String!, language: String, page: Int): [TvShow]
		getTypes: [TvShowType]
		getByType(type: String!, laguage: String, page: Int): [TvShow!]
		getTvShowDetails(tvShowId: Int!, language: String): TvShow
		getSimilarsTvShows(tvShowId: Int!, langauge: String): [TvShow]
		getSeasonDetails(tvShowId: Int!, seasonNumber: Int!, langauge: String): Season
	}
`;

module.exports = schema;
