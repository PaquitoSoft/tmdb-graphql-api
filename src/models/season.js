const Episode = require('./episode');

class Season {
	constructor(raw) {
		this.id = raw.id;
		this.name = raw.name;
		this.seasonNumber = raw.season_number;		
		this.posterPath = raw.poster_path;
		this.airDate = raw.air_date;
		this.episodesCount = raw.episode_count;
		this.episodes = (raw.episodes || []).map(epi => new Episode(epi));
	}
}

module.exports = Season;
