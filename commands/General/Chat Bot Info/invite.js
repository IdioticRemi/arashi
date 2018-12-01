const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			guarded: true,
			cooldown: 5,
			description: language => language.get('COMMAND_INVITE_DESCRIPTION')
		});
	}

	async run(message) {
		return message.sendLocale('COMMAND_INVITE');
	}

	async init() {
		if (this.client.application && !this.client.application.botPublic) this.permissionLevel = 10;
	}

};
