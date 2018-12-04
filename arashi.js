const config = require('./config.js');
const Klasa = require('klasa');

const cfg = new config();

new Klasa.Client({
    providers: { default: 'firestore', firestore: { credentials: cfg.firebase, databaseURL: cfg.firebase.databaseURL}},
    fetchAllMembers: false,
    commandLogging: true,
    language: 'en',
    noPrefixDM: true,
    prefix: ['a!', 'a$'],
    readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
}).login(cfg.token);