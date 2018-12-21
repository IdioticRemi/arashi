const { Event } = require("klasa");

const msg = [
    "Thank you for inviting me to your server!",
    "Default prefixes are: `a!` and `a$`",
    "You can have a list of my commands using: **a!help**",
    "If you encounter issues, please report them",
    "on Github: https://github.com/Kizuru/Arashi",
    "or on the official discord server: https://discord.gg/kaZ2jf8"
]

module.exports = class extends Event {

	async run(guild) {
        if (!guild.available) return;
        guild.systemChannel.send(msg.join("\n")).catch(() => null);
    }

}