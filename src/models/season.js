const Episode = require('./episode');

class Season {
	constructor(raw) {
		this.id = raw.id;
		this.name = raw.name;
		this.seasonNumber = raw.season_number;		
		this.posterPath = raw.poster_path;
		this.airDate = raw.air_date;
		this.episodesCount = raw.episode_count;
		/*
			External API is returning episodes that are yet
			to be aired but with no useful data, so I filter
			them out.
		*/
		this.episodes = (raw.episodes || [])
			.map(epi => new Episode(epi));
	}
}

module.exports = Season;
