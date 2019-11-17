class Network {
	constructor(raw) {
		this.id = raw.id;
		this.name = raw.name;
		this.logoPath = raw.log_path;
		this.country = raw.origin_country;
	}
}

module.exports = Network;
