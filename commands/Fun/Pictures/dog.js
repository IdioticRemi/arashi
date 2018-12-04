const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['randomdog', 'woof', 'doggo'],
			description: language => language.get('COMMAND_DOG_DESCRIPTION')
		});
    }
    
    async run(message) {
		const file = await fetch('https://dog.ceo/api/breeds/image/random')
			.then(response => response.json())
            .then(body => body.message);
            
		const embed = new MessageEmbed()
			.setColor('GREEN')
			.setTimestamp()
			.setFooter(message.language.get('REQUESTED', [message.author.tag]), message.author.avatarURL())
			.setImage(file)
			.setAuthor(message.language.get('COMMAND_DOG_TITLE', ['dog']), 'http://www.stickpng.com/assets/images/587e31f49686194a55adab6e.png');

        return message.send(embed);
    }

};