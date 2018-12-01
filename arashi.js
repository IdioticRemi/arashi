const config = require('./config.js');
const Klasa = require('klasa');
const path = require('path');

const cfg = new config();

new Klasa.Client({
    fetchAllMembers: false,
    commandLogging: true,
    language: 'en',
    noPrefixDM: true,
    prefix: ['a!', 'a$'],
    readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
}).login(cfg.token);