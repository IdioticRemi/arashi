const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {
	constructor(...args) {
		super(...args, {
			name: "premiumCheck"
		});
	}

	async run(message, cmd) {
		if (!cmd.vip || cmd.vip === false) return false;
		else if (message.author.settings.vip === false) {
			return message.language.get("REQUIRES_VIP_STATUS", message.author.tag);
		}
		else return false;
	}

};