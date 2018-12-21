const { Command } = require("klasa");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            runIn: ["text"],
            cooldown: 3,
            aliases: ["paus"],
			description: (language) => language.get("COMMAND_PAUSE_DESCRIPTION"),
            usage: ""
		});
    }

    async run(message, [...args]) {
        const sQueue = this.client.queues.get(message.guild.id);

        if (!sQueue) return message.sendLocale("MUSIC_NOT_PLAYING");

        if (!sQueue.voice.members.get(message.author.id)) return message.sendLocale("COMMAND_PAUSE_NOVOICE", [sQueue.voice.name]);

        if (sQueue.playing === false) return message.sendLocale("COMMAND_PAUSE_PAUSED");

        sQueue.playing = false;
        await sQueue.connection.dispatcher.pause();
        return message.sendLocale("COMMAND_PAUSE_SUCCESS", [sQueue.songs[sQueue.songID].title, message.author.tag]);
    }
}