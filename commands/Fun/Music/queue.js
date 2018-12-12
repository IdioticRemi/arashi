const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');
const { Canvas } = require('canvas-constructor');
const { resolve, join } = require("path");
const { get } = require("snekfetch");
const fs = require('fs-nextra');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            runIn: ['text'],
            cooldown: 3,
            permissionLevel: 10,
            aliases: ['q', 'songlist', 'list', 'qu'],
			description: language => language.get('COMMAND_QUEUE_DESCRIPTION'),
            usage: ''
		});
    }

    async run(message, [...args]) {
        const sQueue = this.client.queues.get(message.guild.id);

        if (!sQueue) return message.sendLocale('MUSIC_NOT_PLAYING');

        let i = sQueue.songID;

        const queueSongs = [
            sQueue.songs[i-1] ? { title: `${sQueue.songs[i-1].title}`, time: sQueue.songs[i-1].format() } : { title: message.language.get('COMMAND_QUEUE_NOPREV').toUpperCase() },
            { title: `${sQueue.songs[i].title}`, time: sQueue.songs[i].format() }
        ]

        for (i; i < sQueue.songID + 3; ++i) {
            if (!sQueue.songs[i+1]) break;
            queueSongs.push({ title: `${sQueue.songs[i+1].title}`, time: sQueue.songs[i+1].format() });
        }

        i++;

        if (sQueue.songs.length - i > 0) {
            queueSongs.push({ title: message.language.get('COMMAND_QUEUE_MORESONGS', [sQueue.songs.length - i]).toUpperCase() });
        }

        if (queueSongs.length == 2) queueSongs.push({ title: message.language.get('COMMAND_QUEUE_EMPTY').toUpperCase() });

        const queue = await this.BuildQueue(queueSongs, message.language, message.guild, sQueue);

        message.channel.send(new MessageAttachment(queue.toBuffer()));
    }

    async BuildQueue (queueSongs, lang, guild, sQueue) {
        await Canvas.registerFont(resolve(join(__dirname, "../../../QueueFont.ttf")), "Queuefont");
        const played = sQueue.connection.dispatcher.streamTime;
        const sTime = sQueue.songs[sQueue.songID].duration * 1000;
        const percent = 850 * played/sTime;
        const { body: icon } = await get(guild.iconURL({ format: 'png', size: 128 }));

        const queue = new Canvas(900, 835)
            // Background
            .setColor('#F95959')
            .addRect(0, 0, 900, 835)
            // Categories' boxesand title box
            .setColor('#23272A')
            .addRect(0, 0, 900, 125) // Title
            .addRect(10, 135, 880, 75)
            .addRect(10, 295, 880, 75)
            .addRect(10, 500, 880, 75)
            .setColor('#2C2F33')
            .addRect(10, 210, 880, 75)
            .addRect(10, 370, 880, 120)
            .addRect(10, 575, 880, 250)
            // Adding Guild's Icon
            .addImage(icon, 5, 5, 115, 115)
            // Top title
            .setColor('#FFFFFF')
            .setTextAlign("center")
            .setTextFont('30px Arial')
            .addText(lang.get('COMMAND_QUEUE_TITLE'), 512.5, 40)
            .setTextFont('40px Queuefont')
            .addText(guild.name.toUpperCase(), 512.5, 100)
            // Create Progress Bar Background
            .setColor('#23272A')
            .addRect(20, 440, 860, 40)
            // Add Categories's title
            .setColor('#FACF5A')
            .setTextFont('30px Queuefont')
            .addText(lang.get('COMMAND_QUEUE_PREV'), 450, 185)
            .addText(lang.get('COMMAND_QUEUE_NOW'), 450, 345)
            .addText(lang.get('COMMAND_QUEUE_NEXT'), 450, 550)
            .setTextAlign('right')
            .setTextFont('30px Arial')
            .addText(queueSongs[0] ? queueSongs[0].time ? queueSongs[0].time : '--:--:--' : '', 870, 260)
            .addText(queueSongs[1] ? queueSongs[1].time ? queueSongs[1].time : '--:--:--' : '', 870, 420)
            .addText(queueSongs[2] ? queueSongs[2].time ? queueSongs[2].time : '--:--:--' : '', 870, 635)
            .addText(queueSongs[3] ? queueSongs[3].time ? queueSongs[3].time : '--:--:--' : '', 870, 685)
            .addText(queueSongs[4] ? queueSongs[4].time ? queueSongs[4].time : '--:--:--' : '', 870, 735)
            // Progress Bar
            .setColor('#F95959')
            .addRect(25, 445, percent, 30)
            // Time played and categories' content
            .setColor('#FFFFFF')
            .setTextFont('25px Queuefont')
            .setTextAlign('center')
            .addText(`${sQueue.songs[0].format(played / 1000)} / ${sQueue.songs[sQueue.songID].format()}`, 450, 470)
            .setTextAlign("left")
            .addText(this.lengthify(queueSongs[0]), 30, 260)
            .addText(this.lengthify(queueSongs[1]), 30, 420);
            
        if (queueSongs[2]) queue.addText(this.lengthify(queueSongs[2]), 30, 635);
        if (queueSongs[3]) queue.addText(this.lengthify(queueSongs[3]), 30, 685);
        if (queueSongs[4]) queue.addText(this.lengthify(queueSongs[4]), 30, 735);
        if (queueSongs[5]) queue.addText(this.lengthify(queueSongs[5]), 30, 775);

        return queue;
    }

    lengthify(song) {
        if (!song.time) return song.title;
        if (song.length <= 48) return `${song.title}`;
        return `${song.title.substring(0, 45)}...`;
    }
}