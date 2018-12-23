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
            description: (language) => language.get("COMMAND_ARCADIA_GEN_DESCRIPTION", [require("klasa").util.toTitleCase(this.name)]),
            usage: "[type:Integer{0,2}] [img:url]",
        });

        this.Arcadia = new ArcadiaAPI(cfg.arcadia);
        this.customizeResponse("type", (message) => message.sendLocale("ARCADIA_INVALID_TYPE"));
        this.customizeResponse("img", (message) => message.sendLocale("ARCADIA_INVALID_URL"));
    }

    async run(message, [type, img]) {
        const { buffer } = await this.Arcadia.generate(this.name.toLowerCase(), img ? img : message.author.avatarURL({ format: "png" }, { type: type ? type : null }));
        message.channel.send(new MessageAttachment(buffer, `${this.name.toLowerCase()}-${message.author.id}.png`));
    }

};