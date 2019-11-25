const Genre = require('./genre');
const Network = require('./network');
const Season = require('./season');
const Character = require('./character');

class TvShow {
	constructor(tvShowRaw, castRaw = []) {
		this.id = tvShowRaw.id;
		this.name = tvShowRaw.name;
		this.overview = tvShowRaw.overview;
		this.originalName = tvShowRaw.original_name;
		this.status = tvShowRaw.status;
		this.backdropImagePath = tvShowRaw.backdrop_path;
		this.posterPath = tvShowRaw.poster_path;
		this.firstAirDate = tvShowRaw.first_air_date;
		this.runtime = tvShowRaw.episode_run_time;
		this.lastAirDate = tvShowRaw.last_air_date;
		// this.genres = tvShowRaw.genres.map(g => new Genre(g));
		this.networks = (tvShowRaw.networks || []).map(n => new Network(n));
		this.seasonsCount = tvShowRaw.number_of_seasons;
		this.episodesCount = tvShowRaw.number_of_episodes;
		this.popularity = tvShowRaw.popularity;
		this.votesCount = tvShowRaw.vote_count;
		this.votesAverage = tvShowRaw.vote_average;
		this.seasons = (tvShowRaw.seasons || []).map(s => new Season(s));
		this.cast = castRaw.map(c => new Character(c));
	}
}

module.exports = TvShow;
