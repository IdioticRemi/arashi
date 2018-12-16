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
            throw message.language.get('COMMAND_PREFIX_VALUE');
        });
    }

    async show(message) {
        const value = await message.guild.settings.get('prefix');
        message.sendLocale('COMMAND_PREFIX_SHOW', [value]);
    }

    async add(message, [value]) {
        const prefixes = await message.guild.settings.get('prefix');
        if (message.author.settings.vip == false && prefixes.length >= 2) return message.sendLocale('COMMAND_PREFIX_USERMAX', [value]);
        else if (prefixes.length >= 10) return message.sendLocale('COMMAND_PREFIX_VIPMAX', [value]);
        if (prefixes.includes(value)) return message.sendLocale('COMMAND_PREFIX_DOESNT_EXIST', [value]);
        await message.guild.settings.update('prefix', value, { action: 'add' });
        message.sendLocale('COMMAND_PREFIX_ADD_SUCCESS', [value]);
    }

    async remove(message, [value]) {
        const prefixes = await message.guild.settings.get('prefix');
        if (prefixes.length == 1) return message.sendLocale('COMMAND_PREFIX_MIN', [value]);
        if (!prefixes.includes(value)) return message.sendLocale('COMMAND_PREFIX_DOESNT_EXIST', [value]);
        await message.guild.settings.update('prefix', value, { action: 'remove' });
        message.sendLocale('COMMAND_PREFIX_REMOVE_SUCCESS', [value]);
    }

    async reset(message) {
        await message.guild.settings.reset('prefix');
        message.sendLocale('COMMAND_PREFIX_RESET');
    }

};