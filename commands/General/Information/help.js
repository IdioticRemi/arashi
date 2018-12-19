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
		const embeds = [];
		for (let cat = 0; cat < categories.length; cat++) {
			const helpEmbed = new Discord.MessageEmbed().setColor('RANDOM').setThumbnail(this.client.user.avatarURL()).setFooter(message.language.get('REQUESTED', message.author.tag)).setTimestamp();
			let temp = [];
			const subCategories = Object.keys(help[categories[cat]]);
			for (let subCat = 0; subCat < subCategories.length; subCat++) {
				temp.push(`\n\`\`\`Markdown\n# ${subCategories[subCat]}\`\`\`\n`, `${help[categories[cat]][subCategories[subCat]].join(', ')}`);
			}
			helpEmbed.setAuthor(categories[cat], message.author.avatarURL()).setDescription(temp.join('\n'));
			embeds.push(helpEmbed);
		}

		let err = false, sent = false;
		return embeds.forEach(async (embed) => {
			if (err === true) return;
			await message.author.send(embed)
				.then(() => { if (message.channel.type !== 'dm' && sent === false) message.sendLocale('COMMAND_HELP_DM'); sent = true; })
				.catch((e) => { if (message.channel.type !== 'dm') message.sendLocale('COMMAND_HELP_NODM'); this.client.console.error(e); err = true; });
		});
	}

	async buildHelp(message) {
		const help = {};

		await Promise.all(this.client.commands.map((command) =>
			this.client.inhibitors.run(message, command, true)
				.then(() => {
					if (!help.hasOwnProperty(command.category)) help[command.category] = {};
					if (!help[command.category].hasOwnProperty(command.subCategory)) help[command.category][command.subCategory] = [];
					//const desc = isFunction(command.description) ? command.description(message.language) : command.description;
					help[command.category][command.subCategory].push(`\`${command.name}\``);
				})
				.catch(() => {
					// oof
				})
		));

		return help;
	}

};
