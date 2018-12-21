const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["shufle", "reroll", "rqueue"],
			description: language => language.get("COMMAND_SHUFFLE_DESCRIPTION"),
            usage: ""
		});
    }

    async run(message, [...params]) {
        const sQueue = this.client.queues.get(message.guild.id);

        if (!sQueue) return message.sendLocale("MUSIC_NOT_PLAYING");

        if (!sQueue.voice.members.get(message.author.id)) return message.sendLocale("COMMAND_SHUFFLE_NOVOICE", [sQueue.voice.name]);

        const playing = sQueue.songs[sQueue.songID];
        const result = this.shuffle(sQueue.songs);
        if (result.includes(playing) && result.indexOf(playing) != 0) {
            [result[result.indexOf(playing)], result[0]] = [result[0], result[result.indexOf(playing)]];
        }
        
        sQueue.songID = 0;
        sQueue.songs = result;

        message.sendLocale("COMMAND_SHUFFLE_SUCCESS");
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

};