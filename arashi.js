const { Permissions: { FLAGS } } = require("discord.js");
const config = require("./config.js");
const Klasa = require("klasa");

const cfg = new config();

let KlasaClient = Klasa.KlasaClient;

KlasaClient.defaultPermissionLevels = new Klasa.PermissionLevels()
.add(0, () => true)
.add(3, ({ guild, member }) => guild && member.permissions.has(FLAGS.KICK_MEMBERS), { fetch: true })
.add(4, ({ guild, member }) => guild && member.permissions.has(FLAGS.BAN_MEMBERS), { fetch: true })
.add(5, ({ guild, member }) => guild && member.permissions.has(FLAGS.MANAGE_GUILD), { fetch: true })
.add(6, ({ guild, member }) => guild && member.permissions.has(FLAGS.ADMINISTRATOR), { fetch: true })
.add(7, ({ guild, member }) => guild && member === guild.owner, { fetch: true })
.add(8, ({ author, client }) => client.guilds.get("517738561420787722").member(author.id) && client.guilds.get("517738561420787722").member(author.id).roles.map(r => ["Helpers", "Moderators"].includes(r.name)[0] != undefined), { fetch: true })
.add(9, ({ author, client }) => author === client.owner, { break: true })
.add(10, ({ author, client }) => author === client.owner);

KlasaClient.defaultUserSchema
    .add("playlists", "any", { default: {} })
    .add("vip", "boolean", { default: false });

KlasaClient.defaultGuildSchema
    .add("channels", "any", { default: { mod: undefined, logs: undefined, welcome: undefined } });

let Arashi = new KlasaClient({
    providers: { default: "firestore", firestore: { credentials: cfg.firebase, databaseURL: cfg.firebase.databaseURL} },
    fetchAllMembers: false,
    commandLogging: true,
    language: "en",
    noPrefixDM: true,
    prefix: ["a!", "a$"],
    readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
});

Arashi.queues = new Map();

Arashi.login(cfg.token);