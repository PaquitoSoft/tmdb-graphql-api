class ImagesConfig {

	constructor(raw) {
		console.log(raw);
		this.baseUrl = raw.secure_base_url; 
		this.backdropSizes = raw.backdrop_sizes;
		this.logoSizes = raw.logo_sizes;
		this.posterSizes = raw.poster_sizes;
		this.profileSizes = raw.profile_sizes;
		this.stillSizes = raw.still_sizes;
	}

}

module.exports = ImagesConfig;
