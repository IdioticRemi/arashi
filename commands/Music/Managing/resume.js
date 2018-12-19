const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            runIn: ['text'],
            cooldown: 3,
            aliases: ['res'],
			description: language => language.get('COMMAND_RESUME_DESCRIPTION'),
            usage: ''
		});
    }

    async run(message, [...args]) {
        const sQueue = this.client.queues.get(message.guild.id);

        if (!sQueue) return message.sendLocale('MUSIC_NOT_PLAYING');

        if (!sQueue.voice.members.get(message.author.id)) return message.sendLocale('COMMAND_RESUME_NOVOICE', [sQueue.voice.name]);

        if (sQueue.playing == true) return message.sendLocale('COMMAND_RESUME_PLAYING');

        sQueue.playing = true;
        await sQueue.connection.dispatcher.resume();
        return message.sendLocale('COMMAND_RESUME_SUCCESS', [sQueue.songs[sQueue.songID].title, message.author.tag]);
    }
}