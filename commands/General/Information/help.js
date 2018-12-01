const { Command, util: { isFunction } } = require('klasa');
const Discord = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['commands'],
			guarded: true,
			description: language => language.get('COMMAND_HELP_DESCRIPTION'),
			usage: '(Command:command)'
		});

		this.createCustomResolver('command', (arg, possible, message) => {
			if (!arg || arg === '') return undefined;
			return this.client.arguments.get('command').run(arg, possible, message);
		});
	}

	async run(message, [command]) {
		if (command) {
			const info = [
				`= ${command.name} = `,
				'',
				isFunction(command.description) ? command.description(message.language) : command.description,
				message.language.get('COMMAND_HELP_USAGE', command.usage.fullUsage(message)),
				message.language.get('COMMAND_HELP_EXTENDED'),
				isFunction(command.extendedHelp) ? command.extendedHelp(message.language) : command.extendedHelp
			].join('\n');
			return message.sendMessage(info, { code: 'asciidoc' });
		}
		const help = await this.buildHelp(message);
		const categories = Object.keys(help);
		const helpEmbed = new Discord.MessageEmbed().setColor('GREEN').setTimestamp().setFooter(message.language.get('REQUESTED', [message.author.tag]), message.author.avatarURL()).setThumbnail(this.client.user.avatarURL())
		for (let cat = 0; cat < categories.length; cat++) {
			let temp = [];
			const subCategories = Object.keys(help[categories[cat]]);
			for (let subCat = 0; subCat < subCategories.length; subCat++) temp.push(`<:smallPlus:518379666533515306> **__${subCategories[subCat]}__**:\n`, `${help[categories[cat]][subCategories[subCat]].join('\n')}\n`);
			helpEmbed.addField(categories[cat], temp.join('\n') + (cat + 1 != categories.length ? ' ‏‏‎ ' : ''));
		}

		return message.author.send(helpEmbed)
			.then(() => { if (message.channel.type !== 'dm') message.sendLocale('COMMAND_HELP_DM'); })
			.catch(() => { if (message.channel.type !== 'dm') message.sendLocale('COMMAND_HELP_NODM'); });
	}

	async buildHelp(message) {
		const help = {};


		await Promise.all(this.client.commands.map((command) =>
			this.client.inhibitors.run(message, command, true)
				.then(() => {
					if (!help.hasOwnProperty(command.category)) help[command.category] = {};
					if (!help[command.category].hasOwnProperty(command.subCategory)) help[command.category][command.subCategory] = [];
					const description = isFunction(command.description) ? command.description(message.language) : command.description;
					help[command.category][command.subCategory].push(`• \`${command.name}\`: ${description}`);
				})
				.catch(() => {
					// oof
				})
		));

		return help;
	}

};