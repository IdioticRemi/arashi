const { Command } = require("klasa");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ["text"],
			cooldown: 3,
			aliases: ["bvc"],
			description: (language) => language.get("COMMAND_BVC_DESCRIPTION"),
			usage: "[channel:channel]"
		});
	}

	async run(message, [channel, ...args]) {
		const sQueue = this.client.queues.get(message.guild.id);

		if (!sQueue) return message.sendLocale("MUSIC_NOT_PLAYING");

		if (!channel) channel = message.member.voice ? message.member.voice.channel : null;
		if (channel == null) return message.sendLocale("COMMAND_BVC_NOPE");

		await sQueue.connection.dispatcher.pause();
		channel.join().then(async () => {
			sQueue.voice = channel;
			await message.guild.me.setDeaf(true).catch(() => 1);

			await sQueue.connection.dispatcher.resume();
			return message.sendLocale("COMMAND_BVC_SUCCESS", [channel]);
		});
	}
};