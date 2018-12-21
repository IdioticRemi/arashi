const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            aliases: ["welc", "welcomechannel", "wc", "welcchannel", "welcchan"],
            permissionLevel: 6,
            cooldown: 3,
            description: language => language.get("COMMAND_WELCOME_DESCRIPTION"),
            subcommands: true,
            usage: "<set|reset|show:default> [channel:String]",
            usageDelim: " "
        });

    }

    async show(message) {
        const channel = await message.guild.settings.get("channels.welcome");
        message.sendLocale("COMMAND_WELCOME_SHOW", [message.guild.channels.get(channel)]);
    }

    async set(message, [channel]) {
        if (!channel) return message.sendLocale("COMMAND_WELCOME_CHANNEL");
        const c = message.mentions.channels.first() || message.guild.channels.get(channel);
        if (!c) return message.sendLocale("COMMAND_WELCOME_SET_UNSUCCESS", [channel]);

        await message.guild.settings.update("channels", { welcome: c.id });
        message.sendLocale("COMMAND_WELCOME_SET_SUCCESS", [c]);
    }

    async reset(message) {
        await message.guild.settings.update("channels", { welcome: null });
        message.sendLocale("COMMAND_WELCOME_RESET");
    }

};