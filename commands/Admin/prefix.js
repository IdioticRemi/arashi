const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ['text'],
            aliases: ['pref', 'prefixes'],
            permissionLevel: 6,
            cooldown: 3,
            description: language => language.get('COMMAND_PREFIX_DESCRIPTION'),
            subcommands: true,
            usage: '[add|remove|reset|show:default] (value:value)',
            usageDelim: ' '
        });

        this.createCustomResolver('value', (arg, possible, message, [action]) => {
            if (!['add', 'remove'].includes(action) || arg) return arg;
            throw message.language.get('CONFIG_NOVALUE');
        });
    }

    async show(message) {
        const value = await message.guild.settings.get('prefix');
        message.sendLocale('CONFIG_SHOW', ['prefix', value]);
    }

    async add(message, [...value]) {
        const prefixes = await message.guild.settings.get('prefix');
        if (prefixes.length == 5) return message.sendLocale('CONFIG_ADD_UNSUCCESS', ['prefix', value, 5]);
        if (prefixes.includes(value.join(' '))) return message.sendLocale('CONFIG_ALREADY_EXISTS', ['prefix', value]);
        await message.guild.settings.update('prefix', value.join(' '), { action: 'add' });
        message.sendLocale('CONFIG_ADD_SUCCESS', ['prefix', value]);
    }

    async remove(message, [...value]) {
        const prefixes = await message.guild.settings.get('prefix');
        if (prefixes.length == 1) return message.sendLocale('CONFIG_REMOVE_UNSUCCESS', ['prefix', value, 1]);
        await message.guild.settings.update('prefix', value.join(' '), { action: 'remove' });
        message.sendLocale('CONFIG_REMOVE_SUCCESS', ['prefix', value]);
    }

    async reset(message) {
        await message.guild.settings.reset('prefix');
        message.sendLocale('CONFIG_RESET_SUCCESS', ['prefix']);
    }

};