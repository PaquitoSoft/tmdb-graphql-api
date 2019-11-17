const Genre = require('./genre');
const Network = require('./network');
const Season = require('./season');
// const Character = require('./character');

class TvShow {
	constructor(raw) {
		this.id = raw.id;
		this.name = raw.name;
		this.overview = raw.overview;
		this.originalName = raw.original_name;
		this.status = raw.status;
		this.backdropImagePath = raw.backdrop_path;
		this.posterPath = raw.backdrop_path;
		this.firstAirDate = raw.first_air_date;
		this.runtime = raw.episode_run_time;
		this.lastAirDate = raw.last_air_date;
		// this.genres = raw.genres.map(g => new Genre(g));
		this.networks = (raw.networks || []).map(n => new Network(n));
		this.seasonsCount = raw.number_of_seasons;
		this.episodesCount = raw.number_of_episodes;
		this.popularity = raw.popularity;
		this.votesCount = raw.vote_count;
		this.votesAverage = raw.vote_average;
		this.seasons = (raw.seasons || []).map(s => new Season(s));
		// cast: [Character]
	}
}

module.exports = TvShow;
