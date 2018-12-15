const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ['text'],
            aliases: ['lang', 'locale'],
            permissionLevel: 6,
            cooldown: 3,
            description: language => language.get('COMMAND_LANGUAGE_DESCRIPTION'),
            subcommands: true,
            usage: '<set|reset|show:default> (value:value) [...]',
            usageDelim: ' '
        });

        this.createCustomResolver('value', (arg, possible, message, [action]) => {
            if (!['set'].includes(action) || arg) return arg;
            throw message.language.get('CONFIG_NOVALUE');
        });

    }

    async show(message) {
        const value = await message.guild.settings.get('language');
        message.sendLocale('CONFIG_SHOW', ['language', value]);
    }

    async set(message, [...value]) {
        if (!this.isLanguage(value)) return message.sendLocale('CONFIG_NOT_TYPE', ['language']);

        await message.guild.settings.update('language', value.join(' '));
        message.sendLocale('CONFIG_SET_SUCCESS', ['language', value]);
    }

    async reset(message) {
        await message.guild.settings.reset('language');
        message.sendLocale('CONFIG_RESET_SUCCESS', ['language']);
    }

    isLanguage(str) {
        const language = this.client.languages.get(str.join(' '));
        if (language) return language;
        return undefined;
    }

};