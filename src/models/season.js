class Season {
	constructor(raw) {
		this.id = raw.id;
		this.name = raw.name;
		this.seasonNumber = raw.season_number;		
		this.posterPath = raw.poster_path;
		this.episodesCount = raw.episode_count;
		this.airDate = raw.air_date;
		this.episodes = [];
	}
}

module.exports = Season;
