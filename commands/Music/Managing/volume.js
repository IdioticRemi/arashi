const { Command } = require("klasa");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            runIn: ["text"],
            cooldown: 3,
            aliases: ["vol", "vo"],
			description: (language) => language.get("COMMAND_SKIP_DESCRIPTION"),
            usage: "[volume:integer]"
		});
    }

    async run(message, [volume]) {
        const sQueue = this.client.queues.get(message.guild.id);

        if (!sQueue) return message.sendLocale("MUSIC_NOT_PLAYING");

        if (!volume) return message.sendLocale("COMMAND_VOLUME_VAL", [sQueue.volume]);

        if (!sQueue.voice.members.get(message.author.id)) return message.sendLocale("COMMAND_VOLUME_NOVOICE", [sQueue.voice.name]);

        if (volume > 200 || volume < 0) return message.sendLocale("COMMAND_VOLUME_NOPE");

        const old = sQueue.volume;
        sQueue.volume = volume;
        await sQueue.connection.dispatcher.setVolumeLogarithmic(volume / 200);
        return message.sendLocale("COMMAND_VOLUME_SUCCESS", [old, volume, message.author.tag]);
    }
}