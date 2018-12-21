const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            runIn: ["text"],
            cooldown: 3,
            aliases: ["embedqueue", "eq", "embedsongs", "esongs"],
			description: language => language.get("COMMAND_EQUEUE_DESCRIPTION"),
            usage: ""
		});
    }

    async run(message, [...args]) {
        const sQueue = this.client.queues.get(message.guild.id);

        if (!sQueue) return message.sendLocale("MUSIC_NOT_PLAYING");

        let i = sQueue.songID;

        const queueDisplay = [
            `**__${message.language.get("COMMAND_QUEUE_PREV")}:__**\`\`\`markdown\n1. ${sQueue.songs[i - 1] ? sQueue.songs[i - 1].title.replace(/\`/g, "") + " <" + sQueue.songs[i].format() + ">" : message.language.get("COMMAND_QUEUE_NOPREV")}\`\`\``,
            `**__${message.language.get("COMMAND_QUEUE_NOW")}:__**\`\`\`markdown\n0. ${sQueue.songs[i].title.replace(/\`/g, "")} <${sQueue.songs[i].format(sQueue.connection.dispatcher.streamTime / 1000)}/${sQueue.songs[i].format()}>${sQueue.playing === false ? message.language.get("COMMAND_QUEUE_PAUSED") : ""}\`\`\``,
            `**__${message.language.get("COMMAND_QUEUE_NEXT")}:__**\`\`\`markdown\n`,
        ]

        for (++i; i < sQueue.songs.length; i++) {
            if (i > sQueue.songID + 6) break;
            queueDisplay.push(`${i - sQueue.songID}. ${sQueue.songs[i].title.replace(/\`/g, "")} <${sQueue.songs[i].format()}>`);
        }

        if (sQueue.songs.length - sQueue.songID - 6 > 0) {
            queueDisplay.push(message.language.get("COMMAND_QUEUE_MORESONGS", [sQueue.songs.length - sQueue.songID - 6]));
        }

        if (queueDisplay.length === 3) queueDisplay.push(message.language.get("COMMAND_QUEUE_EMPTY"));

        const queue = new MessageEmbed()
            .setAuthor(message.language.get("COMMAND_EQUEUE_TITLE", [message.guild.name]), message.guild.iconURL())
            .setColor("#D80027")
            .setTimestamp()
            .setFooter(message.language.get("REQUESTED", [message.author.tag]), message.author.avatarURL())
            .setDescription(queueDisplay.join("\n") + "\n```");

        return message.channel.send(queue);
    }
}