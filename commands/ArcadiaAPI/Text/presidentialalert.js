const { Command } = require("klasa");
const { MessageAttachment } = require("discord.js");
const Arcadia = require("arcadia-module");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ["text", "dm", "group"],
            requiredPermissions: ["ATTACH_FILES"],
            aliases: [],
            cooldown: 0,
            description: (language) => language.get(`COMMAND_ARCADIA_TEXT_DESCRIPTION`, [require("klasa").util.toTitleCase(this.name)]),
            usage: "[text:String] [...]",
        });

        this.customizeResponse("img", (message) => message.sendLocale("ARCADIA_INVALID_URL"));
    }

    async run(message, [...text]) {
        const buff = await Arcadia.texts(this.name.toLowerCase(), text ? text : message.author.username);
        message.channel.send(new MessageAttachment(buff, `${this.name.toLowerCase()}-${message.author.id}.png`));
    }

};