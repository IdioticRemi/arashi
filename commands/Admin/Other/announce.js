const { Command } = require("klasa");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            runIn: ["text"],
            permissionlevel: 5,
            cooldown: 10,
            aliases: ["an", "broadcast", "bc"],
			description: (language) => language.get("COMMAND_ANNOUNCE_DESCRIPTION"),
            usage: "<channel:chan> <message:String> [...]",
            usageDelim: " ",
            requiredPermissions: ["MENTION_EVERYONE"]
        });
        
        this.createCustomResolver("chan", (arg, possible, message, [action]) => {
            if (message.mentions.channels.first() && arg || arg && message.guild.channels.get(arg)) return message.mentions.channels.first() || message.guild.channels.get(channel);
            throw message.language.get("COMMAND_ANNOUNCE_NOCHANNEL");
        });
    }

    async run(message, [channel, ...msg]) {
        channel.send(`@everyone **${message.author.tag}**"s announce:\n\n${msg.join(" ")}`);
        return message.sendLocale("COMMAND_ANNOUNCE_SUCCESS", [channel]);
    }

}