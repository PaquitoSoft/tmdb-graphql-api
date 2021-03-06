// const Genre = require('./genre');
const Network = require('./network');
const Season = require('./season');
const Character = require('./character');

class TvShow {
	constructor({ tvShowRaw, castRaw = [], isFavorite }) {
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
		/*
			External API is returning seasons with specal
			content with season_number 0.
			These are not 'normal' episodes seasons so they should 
			filter apart.
			Also, it is returning yet to be aired seasons with no 
			useful data.
		*/
		this.seasons = (tvShowRaw.seasons || [])
			.filter(s => s.season_number > 0 && !!s.air_date)
			.map(s => new Season(s));
		this.cast = castRaw.map(c => new Character(c));
		this.isFavorite = isFavorite;
	}
}

module.exports = TvShow;
