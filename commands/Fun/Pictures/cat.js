const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            cooldown: 10,
			aliases: ["randomcat", "meow"],
			description: language => language.get("COMMAND_CAT_DESCRIPTION")
		});
	}

	async run(message) {
		const file = await fetch("http://aws.random.cat/meow")
			.then(response => response.json())
			.then(body => body.file);
		const embed = new MessageEmbed()
			.setColor("GREEN")
			.setTimestamp()
			.setFooter(message.language.get("REQUESTED", [message.author.tag]), message.author.avatarURL())
			.setImage(file)
			.setAuthor(message.language.get("COMMAND_ANIMAL_TITLE", ["cat"]), "http://www.stickpng.com/assets/images/587e31f49686194a55adab6e.png");

        return message.send(embed);
    }

};