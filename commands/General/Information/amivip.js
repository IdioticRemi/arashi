const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

const gifArray = [
    "https://media.giphy.com/media/nNxT5qXR02FOM/giphy.gif",
    "https://media.giphy.com/media/3oz8xRF0v9WMAUVLNK/giphy.gif",
    "https://media.giphy.com/media/LNE01Z89j9gis/giphy.gif",
    "https://media.giphy.com/media/1zlDnvnoLbJSnjk1UJ/giphy.gif",
    "https://media.giphy.com/media/31lPv5L3aIvTi/giphy.gif",
    "https://media.giphy.com/media/14udF3WUwwGMaA/giphy.gif",
    "https://media.giphy.com/media/ZdFxoPhIS4glG/giphy.gif",
    "https://media.giphy.com/media/10hO3rDNqqg2Xe/giphy.gif",
    "https://media.giphy.com/media/Wi7QlqrOHYJJm/giphy.gif",
    "https://media.giphy.com/media/LjgtZF41mPXVu/giphy.gif",
    "https://media.giphy.com/media/szo3tZhkD569O/giphy.gif"
];

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            runIn: ["text", "dm"],
            cooldown: 5,
            aliases: ["amvip", "iamvip", "checkvip", "vipcheck"],
            description: (language) => language.get("COMMAND_AMIVIP_DESCRIPTION"),
            usage: "",
        });
    }

    run(message) {
        if (message.author.settings.vip === true) return message.sendLocale("COMMAND_AMIVIP_ALREADY");

        const member = this.client.guilds.get("517738561420787722").member(message.author.id);
        
        if (!member) return message.sendLocale("COMMAND_AMIVIP_NOTONSERVER");
        
        if (!member.roles.map(r => r.name).includes("VIP | Very Important Person")) return message.sendLocale("COMMAND_AMIVIP_NOTVIP");

        message.author.settings.update("vip", true);

        const vipEmbed = new MessageEmbed()
            .setColor("#fff941")
            .setAuthor(message.language.get("COMMAND_AMIVIP_TITLE"), message.author.avatarURL())
            .setTimestamp()
            .setDescription(message.language.get("COMMAND_AMIVIP_YOUARE", member.nickname ? member.nickname : member.user.username))
            .setImage(gifArray[Math.floor(Math.random() * gifArray.length)]);
        
        message.channel.send(vipEmbed);
    }

}