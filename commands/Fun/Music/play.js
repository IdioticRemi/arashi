const { Command } = require('klasa');
const ytdl = require('ytdl-core');
const Youtube = require('simple-youtube-api');
const { Song, MusicServer } = require('../../../music');
const Config = require('../../../config');
const cfg = new Config();

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            runIn: ['text'],
            cooldown: 3,
            aliases: ['pl', 'music'],
			description: language => language.get('COMMAND_PLAY_DESCRIPTION'),
            usage: '<text:String> [...]'
        });
        this.yt = null;
    }
    
    async init() {
        this.yt = new Youtube(cfg.google_API);
    }

	async run(message, [...text]) {
        const searchString = text.join(' ');
        const url = text[0].replace(/<(.+)>/g, '$1');
        let sQueue = this.client.queues.get(message.guild.id);

        let voice = message.member.voice;
        
        if (!voice || !voice.channel) return message.sendLocale('COMMAND_PLAY_NOVOICE');
        else voice = voice.channel;

        const perms = voice.permissionsFor(this.client.user);

        if (!perms.has('CONNECT')) return message.sendLocale('COMMAND_PLAY_NOPERM', ['connect']);
        if (!perms.has('SPEAK')) return message.sendLocale('COMMAND_PLAY_NOPERM', ['speak']);

        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await this.yt.getPlaylist(url);
            const videos = await playlist.getVideos();

            for (const video of Object.values(videos)) {
                if (video.raw.status.privacyStatus == 'private') return;
                const vid = await this.yt.getVideoByID(video.id).catch(error => { return; });
                await this.handleVideo(vid, message, voice, true);
            }

            return await message.sendLocale('MUSIC_QUEUEADD_PLAYLIST', [playlist.title, playlist.channelTitle]);
        } else {
            try {
                var video = await this.yt.getVideo(text.join(url));
            } catch (error) {
                try {
                    var videos = await this.yt.searchVideos(searchString, 5);
                    var video = await this.yt.getVideoByID(videos[0].id);
                } catch (err) {
                    return message.sendLocale('PLAY_NO_RESULTS', [searchString]);
                }
            }

            return this.handleVideo(video, message, voice);
        }
    }

    async handleVideo(video, message, voice, playlistSupport = false) {
        let sQueue = this.client.queues.get(message.guild.id);

        const song = new Song(video, message.author);

        if (!sQueue) {
            const musicGuild = new MusicServer(message.channel, voice);
            this.client.queues.set(message.guild.id, musicGuild);
            sQueue = this.client.queues.get(message.guild.id);
            sQueue.songs.push(song);

            try {
                var connection = await voice.join();
                sQueue.connection = connection;
                this.play(message, song);
            } catch (err) {
                this.client.queues.delete(message.guild.id);
                return message.sendLocale('COMMAND_PLAY_ERRCON');
            }
        } else {
            sQueue.songs.push(song);

            if (playlistSupport) return;

            return message.sendLocale('COMMAND_PLAY_QUEUEADD', [song.title, song.author]);
        }
    }

    async play(message, song) {
        const sQueue = this.client.queues.get(message.guild.id);

        if (!song) {
            sQueue.voice.leave();
            return this.client.queues.delete(message.guild.id);
        }

        sQueue.text.send(message.language.get('MUSIC_PLAY_SONG', song.title, song.user.tag, song.author));

        const dispatcher = sQueue.connection.play(ytdl(song.url))
            .on('end', () => {
                if (!sQueue.songs[sQueue.songID + 1]) {
                    sQueue.songID = sQueue.songID + 1;
                    sQueue.text.send(message.language.get('MUSIC_PLAY_ENDED'));
                    return this.play(message, sQueue.songs[sQueue.songID]);
                }
                sQueue.songID = sQueue.songID + 1;
                return this.play(message, sQueue.songs[sQueue.songID]);
            }).on('error', err => {
                sQueue.text.send(message.language.get('MUSIC_PLAY_ERROR', [err]));
                this.client.console.error(err);
            });
        dispatcher.setVolumeLogarithmic(1);
    }

};