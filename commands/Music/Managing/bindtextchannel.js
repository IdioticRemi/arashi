const { Command } = require("klasa");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ["text"],
			cooldown: 3,
			aliases: ["btc"],
			description: (language) => language.get("COMMAND_BTC_DESCRIPTION"),
			usage: "[channel:channel]"
		});
	}

	async run(message, [channel, ...args]) {
		const sQueue = this.client.queues.get(message.guild.id);

		if (!sQueue) return message.sendLocale("MUSIC_NOT_PLAYING");

		if (!sQueue.voice.members.get(message.author.id)) return message.sendLocale("COMMAND_BTC_NOVOICE", [sQueue.voice.name]);

		if (!channel) channel = message.channel;

		sQueue.text = channel;
		return message.sendLocale("COMMAND_BTC_SUCCESS", [channel]);
	}
}