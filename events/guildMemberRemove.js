const { Event } = require('klasa');
const { Canvas } = require('canvas-constructor');
const { MessageAttachment } = require('discord.js');
const { resolve, join } = require('path');
const { get } = require('snekfetch');

module.exports = class extends Event {

    constructor(...args) {
        super(...args);
    }
    
	async run(member) {
        if (!member.guild.settings.channels.welcome) return;

        const channel = member.guild.channels.get(member.guild.settings.channels.welcome);

        await Canvas.registerFont(resolve(join(__dirname, "../QueueFont.ttf")), "Queuefont");
        const { body: avatar } = await get(member.user.avatarURL({ format: 'png', size: 128 }));

        const canvas = new Canvas(1000, 150)
            .setColor('#2C2F33')
            .addRect(0, 0, 1000, 150)
            .setColor('#FFFFFF')
            .setTextAlign('center')
            .setTextFont('45px Queuefont')
            .addText(member.user.tag, (1000-150)/2+150, 125)
            .setColor('#FF4141')
            .addRect(0, 0, 150, 150)
            .addImage(avatar, 5, 5, 140, 140)
            .addText('GOOD BYE', (1000-150)/2+150, 60);

        channel.send(new MessageAttachment(canvas.toBuffer()));
    }

};