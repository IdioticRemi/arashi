const { Command } = require("klasa");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            runIn: ["text"],
            cooldown: 3,
            aliases: ["re", "resong", "qloop", "queueloop", "lq", "loopqueue", "replay"],
            description: language => language.get("COMMAND_REPEAT_DESCRIPTION"),
            subcommands: true,
            usage: "<queue|song|disable|get:default>"
		});
    }

    async get(message) {
        const sQueue = this.client.queues.get(message.guild.id);
        if (!sQueue) return message.sendLocale("MUSIC_NOT_PLAYING");
        if (sQueue.songs[sQueue.songID].repeat === true) return message.sendLocale("COMMAND_REPEAT_SONG");
        else if (sQueue.repeat === true) return message.sendLocale("COMMAND_REPEAT_QUEUE");
        else return message.sendLocale("COMMAND_REPEAT_DISABLED");
    }

    async queue(message) {
        const sQueue = this.client.queues.get(message.guild.id);
        if (!sQueue) return message.sendLocale("MUSIC_NOT_PLAYING");
        if (!sQueue.voice.members.get(message.author.id)) return message.sendLocale("COMMAND_REPEAT_NOVOICE", [sQueue.voice.name]);
        sQueue.repeat = true;
        sQueue.songs[sQueue.songID].repeat = false;
        return message.sendLocale("COMMAND_REPEAT_SUCCESS", ["Q", message.author.tag]);
    }

    async song(message) {
        const sQueue = this.client.queues.get(message.guild.id);
        if (!sQueue) return message.sendLocale("MUSIC_NOT_PLAYING");
        if (!sQueue.voice.members.get(message.author.id)) return message.sendLocale("COMMAND_REPEAT_NOVOICE", [sQueue.voice.name]);
        sQueue.songs[sQueue.songID].repeat = true;
        return message.sendLocale("COMMAND_REPEAT_SUCCESS", ["S", message.author.tag]);
    }

    async disable(message) {
        const sQueue = this.client.queues.get(message.guild.id);
        if (!sQueue) return message.sendLocale("MUSIC_NOT_PLAYING");
        if (!sQueue.voice.members.get(message.author.id)) return message.sendLocale("COMMAND_REPEAT_NOVOICE", [sQueue.voice.name]);
        sQueue.repeat = false;
        sQueue.songs[sQueue.songID].repeat = false;
        return message.sendLocale("COMMAND_REPEAT_SUCCESS", ["D", message.author.tag]);
    }
}