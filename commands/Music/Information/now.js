const { Command } = require("klasa");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            runIn: ["text"],
            cooldown: 3,
            aliases: ["nowp", "np", "nowplay", "nowplaying"],
			description: language => language.get("COMMAND_NOW_DESCRIPTION"),
            usage: ""
		});
    }

    async run(message, [...args]) {
        const sQueue = this.client.queues.get(message.guild.id);

        if (!sQueue) return message.sendLocale("MUSIC_NOT_PLAYING");

        return message.sendLocale("COMMAND_NOW_SUCCESS", [sQueue.songs[sQueue.songID].title, sQueue.songs[sQueue.songID].user.tag]);
    }
}