const { Inhibitor } = require('klasa');
const { Permissions: { FLAGS } } = require("discord.js");

module.exports = class extends Inhibitor {
	constructor(...args) {
		super(...args, {
			name: "emojiCheck"
		});
	}

	async run(message, cmd) {
		if (message.guild.member(this.client.user.id).permissions.has(FLAGS.USE_EXTERNAL_EMOJIS)) return false;
		else return message.language.get("REQUIRES_EMOJI_PERMISSION");
	}

};