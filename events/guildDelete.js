const { Event } = require("klasa");

module.exports = class extends Event {

	async run(guild) {
        if (!guild.available) return;
        if (this.client.ready && !this.client.options.preserveSettings) guild.settings.destroy().catch(() => null);
        if (this.client.queues.has(guild.id)) this.client.queues.delete(guild.id);
    }

}