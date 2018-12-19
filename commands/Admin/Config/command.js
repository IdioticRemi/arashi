const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ['text'],
            aliases: ['cmd', 'cmds', 'commands'],
            permissionLevel: 6,
            cooldown: 3,
            description: language => language.get('COMMAND_LANGUAGE_DESCRIPTION'),
            subcommands: true,
            usage: '<enable|disable|reset|show:default> [command:command]',
            usageDelim: ' '
        });

    }

    async show(message) {
        const cmds = await message.guild.settings.get('disabledCommands');
        if (cmds.length < 1) return message.sendLocale('COMMAND_COMMAND_NOTANY')
        message.sendLocale('COMMAND_COMMAND_SHOW', [cmds]);
    }

    async disable(message, [cmd]) {
        if (!cmd) return message.sendLocale('COMMAND_COMMAND_VALUE');
        cmd = cmd.name.toLowerCase();
        const disabledCmds = await message.guild.settings.get('disabledCommands')
        if (disabledCmds.includes(cmd)) return message.sendLocale('COMMAND_COMMAND_EXISTS', [cmd]);
        await message.guild.settings.update('disabledCommands', cmd, { action: 'add' });
        message.sendLocale('COMMAND_COMMAND_DISABLED', [cmd]);
    }

    async enable(message, [cmd]) {
        if (!cmd) return message.sendLocale('COMMAND_COMMAND_VALUE');
        cmd = cmd.name.toLowerCase();
        const disabledCmds = await message.guild.settings.get('disabledCommands');
        if (!disabledCmds.includes(cmd)) return message.sendLocale('COMMAND_COMMAND_DOESNT_EXIST', [cmd]);
        await message.guild.settings.update('disabledCommands', cmd, { action: 'remove' });
        message.sendLocale('COMMAND_COMMAND_ENABLED', [cmd]);
    }

    async reset(message) {
        await message.guild.settings.reset('disabledCommands');
        message.sendLocale('COMMAND_COMMAND_RESET');
    }

};