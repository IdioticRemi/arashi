const { Command, RichDisplay, util: { isFunction } } = require("klasa");
const Discord = require("discord.js");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ["h", "commands"],
			guarded: true,
			description: (language) => language.get("COMMAND_HELP_DESCRIPTION"),
			usage: "(Command:command)"
		});

		this.createCustomResolver("command", (arg, possible, message) => {
			if (!arg || arg === "") return;
			return this.client.arguments.get("command").run(arg, possible, message);
		});
	}

	async run(message, [command]) {
		if (command) {
			let cmd = new Discord.MessageEmbed()
                .setAuthor(`${message.language.get("COMMAND_HELP_CMD", command.name)}`, message.author.avatarURL())
                .setColor("#FF3F3F")
                .setThumbnail(this.client.user.avatarURL())
                .setDescription(isFunction(command.description) ? command.description(message.language) : command.description)
                .addField(message.language.get("COMMAND_HELP_USAGE"), `\`\`\`${command.usage.fullUsage(message)}\`\`\``)
                .addField(message.language.get("COMMAND_HELP_EXTENDED"), isFunction(command.extendedHelp) ? command.extendedHelp(message.language) : command.extendedHelp)
                .setFooter(message.language.get("REQUESTED", message.author.tag))
                .setTimestamp();

			return message.sendMessage(cmd);
		}
		const base = new Discord.MessageEmbed()
			.setColor("#FF3F3F")
			.setThumbnail(this.client.user.avatarURL())
			.setFooter(message.language.get("REQUESTED", message.author.tag))
			.setAuthor(message.language.get("COMMAND_HELP_INFO"), message.author.avatarURL())
			.setTimestamp();

		const display = new RichDisplay(base)
			.setFooterPrefix(`${message.language.get("REQUESTED", message.author.tag)} (Page `)
			.setFooterSuffix(")")
			.setEmojis({
				first: "519910927794176021",
				back: "519911829619867688",
				forward: "519910928041639947",
				last: "519910927869673512",
				stop: "519910927949365288",
				info: "556410353765056532",
				jump: "555116507949170718"
			});

        const help = await this.buildHelp(message);
        const categories = Object.keys(help);

		for (let cat = 0; cat < categories.length; cat++) {
			const subCategories = Object.keys(help[categories[cat]]);

			display.addPage(template => {
                template.setAuthor(message.language.get("COMMAND_HELP_CATEGORY", categories[cat]), message.author.avatarURL());

                for (let subCat = 0; subCat < subCategories.length; subCat++) {
                    template.addField(`\n• ${subCategories[subCat]}\n`, `${help[categories[cat]][subCategories[subCat]].join(" \\▪ ")}`);
                }

                return template;
			});
		}

		display.setInfoPage(base.setDescription(message.language.get("COMMAND_HELP_INFOS", display)));
		display.infoPage.setFooter(`${message.language.get("REQUESTED", message.author.tag)} (Page ℹ)`);
		return display.run(message, { time: 60000, filter: (reaction, user) => user.id === message.author.id });
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
