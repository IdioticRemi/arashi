const { Command } = require("klasa");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            runIn: ["text"],
            cooldown: 3,
            aliases: ["stop", "quit"],
			description: language => language.get("COMMAND_LEAVE_DESCRIPTION"),
            usage: ""
		});
    }

    async run(message, [...args]) {
        const sQueue = this.client.queues.get(message.guild.id);

        if (!sQueue) return message.sendLocale("MUSIC_NOT_PLAYING");

        if (!sQueue.voice.members.get(message.author.id)) return message.sendLocale("COMMAND_LEAVE_NOVOICE", [sQueue.voice.name]);

        sQueue.songs = [];
        await sQueue.connection.dispatcher.end();
        return message.sendLocale("COMMAND_LEAVE_SUCCESS", [sQueue.voice.name]);
    }
}