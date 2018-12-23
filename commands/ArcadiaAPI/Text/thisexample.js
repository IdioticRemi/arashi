const { Command } = require("klasa");
const { MessageAttachment } = require("discord.js");
const Config = require("../../../config");
const cfg = new Config();
const ArcadiaAPI = require("arcadia.js-unoff");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ["text", "dm", "group"],
            requiredPermissions: ["ATTACH_FILES"],
            aliases: [],
            cooldown: 0,
            description: (language) => language.get("COMMAND_ARCADIA_TEXT_DESCRIPTION", [require("klasa").util.toTitleCase(this.name)]),
            usage: "[text:String] [...]",
        });

        this.Arcadia = new ArcadiaAPI(cfg.arcadia);
        this.customizeResponse("text", (message) => message.sendLocale("ARCADIA_INVALID_URL"));
    }

    async run(message, [...text]) {
        const { buffer } = await this.Arcadia.text(this.name.toLowerCase(), null, { text: text.join(' ') });
        message.channel.send(new MessageAttachment(buffer, `${this.name.toLowerCase()}-${message.author.id}.png`));
    }

};