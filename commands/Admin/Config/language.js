const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            aliases: ["lang", "locale"],
            permissionLevel: 6,
            cooldown: 3,
            description: language => language.get("COMMAND_LANGUAGE_DESCRIPTION"),
            subcommands: true,
            usage: "<set|reset|show:default> (value:value) [...]",
            usageDelim: " "
        });

        this.createCustomResolver("value", (arg, possible, message, [action]) => {
            if (!["set"].includes(action) || arg) return arg;
            throw message.language.get("COMMAND_LANGUAGE_VALUE");
        });

    }

    async show(message) {
        const lang = await message.guild.settings.get("language");
        message.sendLocale("COMMAND_LANGUAGE_SHOW", [lang]);
    }

    async set(message, [lang]) {
        lang = lang.toLowerCase();
        if (!this.isLanguage(lang)) return message.sendLocale("COMMAND_LANGUAGE_SET_UNSUCCESS", [lang]);

        await message.guild.settings.update("language", lang);
        message.sendLocale("COMMAND_LANGUAGE_SET_SUCCESS", [lang]);
    }

    async reset(message) {
        await message.guild.settings.reset("language");
        message.sendLocale("COMMAND_LANGUAGE_RESET");
    }

    isLanguage(str) {
        const language = this.client.languages.get(str);
        if (language) return language;
        return undefined;
    }

};