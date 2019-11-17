class Episode {
	constructor(raw) {
		this.id = raw.id;
		this.name = raw.name;
		this.episodeNumber = raw.episode_number;
		this.imagePath = raw.still_path;
		this.airDate = raw.air_date;
		this.overview = raw.overview;
		this.voteCount = raw.vote_count;
		this.voteAverage = raw.vote_average;
	}
}

module.exports = Episode;
