const { Event } = require("klasa");
const { version } = require("../package.json");
var games = null, i = null;

module.exports = class extends Event {

	async run() {
        this.client.user.setActivity(games[i].n + " | v" + version, { type: games[i].t });
        i == games.length - 1 ? i = 0 : i++;
        
        setInterval(() => {
            this.client.user.setActivity(games[i].n + " | v" + version, { type: games[i].t });
            i == games.length - 1 ? i = 0 : i++;
        }, 60000);
    }

    async init() {
        games = [
            { n: `a!help`, t: "PLAYING" },
            { n: `${this.client.users.size} users on ${this.client.guilds.size} guilds!`, t: "WATCHING" },
            { n: `http://discordapp.com/invite/kaZ2jf8`, t: "PLAYING" },
            { n: `with it"s owner: ${this.client.owner.username}`, t: "PLAYING" },
            { n: `a!help`, t: "PLAYING" },
            { n: `K-POP!`, t: "LISTENING" },
            { n: "with Rimuru Tempest!", t: "PLAYING" },
            { n: `a!help`, t: "PLAYING" },
            { n: `japanese ads!`, t: "WATCHING" },
            { n: `the llama song`, t: "LISTENING" },
        ]
        i = Math.floor(Math.random() * (games.length - 1));
    }
}