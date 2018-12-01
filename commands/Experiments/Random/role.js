const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['choosetherole', 'rolemeh'],
			description: language => language.get('COMMAND_ROLE_DESCRIPTION')
		});
	}

	async run(message) {
        const arr = ['Moderator', 'Helper', 'Early Supporter'];
        const choosen = Math.floor(Math.random() * 3 + 1);

        message.channel.send(message.language.get('COMMAND_ROLE_TEXT', arr[choosen]));
	}

};
