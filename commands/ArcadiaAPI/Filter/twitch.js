const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');
const Arcadia = require('arcadia-module');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            requiredPermissions: ['ATTACH_FILES'],
            aliases: [],
            cooldown: 0,
            description: (language) => language.get(`COMMAND_ARCADIA_FILTER_DESCRIPTION`, [require('klasa').util.toTitleCase(this.name)]),
            usage: '[img:url]',
        });

        this.customizeResponse('img', (message) => message.sendLocale('ARCADIA_INVALID_URL'));
    }

    async run(message, [img]) {
        const buff = await Arcadia.filters(this.name.toLowerCase(), img != undefined ? img : message.author.avatarURL({ format: 'png' }));
        message.channel.send(new MessageAttachment(buff, `${this.name.toLowerCase()}-${message.author.id}.png`));
    }

};