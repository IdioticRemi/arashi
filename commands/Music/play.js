const { Command } = require('klasa');
const ytdl = require('ytdl-core');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            cooldown: 3,
            aliases: ['pl', 'music'],
			description: language => language.get('COMMAND_PLAY_DESCRIPTION'),
            usage: '<arg:url>'
		});
	}

	async run(message, [url]) {
        let voice = message.member.voice;
        
        if (!voice) return message.sendLocale('COMMAND_PLAY_NOVOICE');
        else voice = voice.channel;

        const perms = voice.permissionsFor(this.client.user);

        if (!perms.has('CONNECT')) return message.sendLocale('COMMAND_PLAY_NOPERM', ['connect']);
        if (!perms.has('SPEAK')) return message.sendLocale('COMMAND_PLAY_NOPERM', ['speak']);

        try {
            var connection = await voice.join();
        } catch (err) {
            return message.sendLocale('COMMAND_PLAY_ERRCON');
        }

        const dispatcher = connection.play(ytdl(url))
            .on('end', () => {
                if (!message.channel.deleted) message.sendLocale('COMMAND_MUSIC_ENDED');
                voice.leave();
            }).on('error', err => {
                if (!message.channel.deleted) message.sendLocale('COMMAND_MUSIC_ERROR', [err]);
                this.client.console.error(err);
            });
        dispatcher.setVolumeLogarithmic(1);
    }

};