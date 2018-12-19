const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            runIn: ['text'],
            cooldown: 3,
            aliases: ['next', 'sk'],
			description: language => language.get('COMMAND_PREV_DESCRIPTION'),
            usage: ''
		});
    }

    async run(message, [...args]) {
        const sQueue = this.client.queues.get(message.guild.id);

        if (!sQueue) return message.sendLocale('MUSIC_NOT_PLAYING');

        if (!sQueue.voice.members.get(message.author.id)) return message.sendLocale('COMMAND_PREV_NOVOICE', [sQueue.voice.name]);

        if (sQueue.repeat === false && sQueue.songs[sQueue.songID].repeat === false && sQueue.songID - 1 < 0) return message.sendLocale('COMMAND_PREV_NOPE');

        sQueue.songID = sQueue.repeat === true ? sQueue.songID - 2 === -2 ? sQueue.songs.length - 2 : sQueue.songID - 2 : sQueue.songs[sQueue.songID].repeat === true ? sQueue.songID : sQueue.songID - 2;
        await sQueue.connection.dispatcher.end();
        return message.sendLocale('COMMAND_PREV_SUCCESS', [sQueue.songs[sQueue.songs[sQueue.songID < 0 ? sQueue.songID + 1 : sQueue.songID].repeat === true ? sQueue.songID : sQueue.songID + 1].title, message.author.tag]);
    }
}