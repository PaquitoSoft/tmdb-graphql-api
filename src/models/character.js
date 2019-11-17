class Character {
	constructor(raw) {
		this.id = raw.id;
		this.name = raw.character;
		this.imagePath = raw.profile_path;
		this.actorName = raw.name;
	}
}

module.exports = Character;
