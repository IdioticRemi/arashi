module.exports = {
    MusicServer: class MusicServer {
        constructor(text, voice) {
            this.text = text;
            this.voice = voice;
            this.connection = null;
            this.songs = [];
            this.songID = 0;
            this.volume = 100;
            this.playing = true;
            this.repeat = false;
        }
    },
    Song: class Song {
        constructor(video, user) {
            this.info = video;
            this.raw = video.raw;
            this.author = this.raw.snippet.channelTitle;
            this.title = video.title;
            this.url = `https://www.youtube.com/watch?v=${video.id}`;
            this.duration = (video.duration.hours * 3600) + (video.duration.minutes * 60) + video.duration.seconds;
            this.user = user;
            this.repeat = false;
        }

        format(d = this.duration) {
            return d.toString().toHHMMSS();
        }
    }
};