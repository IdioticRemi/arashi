const moment = require("moment");
const Util = require("util");

module.exports = {
    MusicServer: class MusicServer {
        constructor(text, voice) {
            this.text = text,
            this.voice = voice,
            this.connection = null,
            this.songs = new Array(),
            this.songID = 0,
            this.volume = 100,
            this.playing = true,
            this.repeat = false
        }
    },
    Song: class Song {
        constructor(video, user) {
            this.info = video,
            this.raw = video.raw,
            this.author = this.raw.snippet.channelTitle,
            this.title = video.title,
            this.url = `https://www.youtube.com/watch?v=${video.id}`,
            this.duration = (video.duration.hours * 3600) + (video.duration.minutes * 60) + video.duration.seconds,
            this.user = user,
            this.repeat = false
        }

        format(dur = this.duration) {
            const d = dur * 1000;
            let formatted = moment(d).format("hh:mm:ss");
            let hours = `${parseInt(formatted.split(":")[0]) - 1}`;
            if (hours.length == 1) hours = `0${hours}`;
            return `${parseInt(hours) > 0 ? `${hours}:` : ""}${formatted.split(":")[1]}:${formatted.split(":")[2]}`;
        }
    }
}