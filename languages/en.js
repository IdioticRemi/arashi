const { Language, util } = require("klasa");
const ye = "<:ye:518161458874286112>",
	no = "<:no:518161458299797504>",
	plus = "<:plus:518161458329026575>",
	star = "<:koolStar:518153001433825300>",
	minus = "<:minus:518160306036539407>",
	smallMinus = "<:smallMinus:518379666524864523>",
	gears = "<:gears:517743812039409674>",
	yt = "<:youtube:518153001370910720>",
	play = "<:play:519910928041639947>",
	stop = "<:stop:519910927949365288>",
	pause = "<:pause:519910928142041098>",
	resume = "<:resume:519911829619867688>",
	vol = "<:volume:519969203801817088>",
	volMin = "<:volMinus:519969203881508914>",
	volPlus = "<:volPlus:519969203655147520>",
	next = "<:next:519910927869673512>",
	prev = "<:prev:519910927794176021>",
	add = "<:add:519969204321910784>",
	repeat = "<:repeat0:523821753009700878>",
	repeat1 = "<:repeat1:523821751902404608>",
	shuffle = "<:shuffle:522318100536885249>",
	inbox = "<:koolInbox:518153001265790986>",
	sushi = "<:sushih:517743805663936512>",
	vip = "<:VIP:523834641019437056>",
	dataGet = "<:dataGet:518176907582505002>",
	dataYe = "<:dataYe:518149292049956891>",
	dataNo = "<:dataNo:518149291852693592>",
	dataPlus = "<:dataPlus:518149292611862530>",
	dataMinus = "<:dataMinus:518149292305678356>";

module.exports = class extends Language {

	constructor(...args) {
		super(...args);
		this.language = {
			DEFAULT: (key) => `**${key}** has not been localized for **english** yet.`,
			DEFAULT_LANGUAGE: "Default Language",
			PREFIX_REMINDER: (prefix = `@${this.client.user.tag}`) => `The prefix${Array.isArray(prefix) ?
				`es for this guild are: ${prefix.map(pre => `\`${pre}\``).join(", ")}` :
				` in this guild is set to: \`${prefix}\``
			}`,
			
			SETTING_GATEWAY_EXPECTS_GUILD: "The parameter <Guild> expects either a Guild or a Guild Object.",
			SETTING_GATEWAY_VALUE_FOR_KEY_NOEXT: (data, key) => `The value ${data} for the key ${key} does not exist.`,
			SETTING_GATEWAY_VALUE_FOR_KEY_ALREXT: (data, key) => `The value ${data} for the key ${key} already exists.`,
			SETTING_GATEWAY_SPECIFY_VALUE: "You must specify the value to add or filter.",
			SETTING_GATEWAY_KEY_NOT_ARRAY: (key) => `The key ${key} is not an Array.`,
			SETTING_GATEWAY_KEY_NOEXT: (key) => `The key ${key} does not exist in the current data schema.`,
			SETTING_GATEWAY_INVALID_TYPE: "The type parameter must be either add or remove.",
			SETTING_GATEWAY_INVALID_FILTERED_VALUE: (piece, value) => `${piece.key} doesn"t accept the value: ${value}`,
			
			RESOLVER_MULTI_TOO_FEW: (name, min = 1) => `Provided too few ${name}s. Atleast ${min} ${min === 1 ? "is" : "are"} required.`,
			RESOLVER_INVALID_BOOL: (name) => `${name} must be true or false.`,
			RESOLVER_INVALID_CHANNEL: (name) => `${name} must be a channel tag or valid channel id.`,
			RESOLVER_INVALID_CUSTOM: (name, type) => `${name} must be a valid ${type}.`,
			RESOLVER_INVALID_DATE: (name) => `${name} must be a valid date.`,
			RESOLVER_INVALID_DURATION: (name) => `${name} must be a valid duration string.`,
			RESOLVER_INVALID_EMOJI: (name) => `${name} must be a custom emoji tag or valid emoji id.`,
			RESOLVER_INVALID_FLOAT: (name) => `${name} must be a valid number.`,
			RESOLVER_INVALID_GUILD: (name) => `${name} must be a valid guild id.`,
			RESOLVER_INVALID_INT: (name) => `${name} must be an integer.`,
			RESOLVER_INVALID_LITERAL: (name) => `Your option did not match the only possibility: ${name}`,
			RESOLVER_INVALID_MEMBER: (name) => `${name} must be a mention or valid user id.`,
			RESOLVER_INVALID_MESSAGE: (name) => `${name} must be a valid message id.`,
			RESOLVER_INVALID_PIECE: (name, piece) => `${name} must be a valid ${piece} name.`,
			RESOLVER_INVALID_REGEX_MATCH: (name, pattern) => `${name} must follow this regex pattern \`${pattern}\`.`,
			RESOLVER_INVALID_ROLE: (name) => `${name} must be a role mention or role id.`,
			RESOLVER_INVALID_STRING: (name) => `${name} must be a valid string.`,
			RESOLVER_INVALID_TIME: (name) => `${name} must be a valid duration or date string.`,
			RESOLVER_INVALID_URL: (name) => `${name} must be a valid url.`,
			RESOLVER_INVALID_USER: (name) => `${name} must be a mention or valid user id.`,
			RESOLVER_STRING_SUFFIX: " characters",
			RESOLVER_MINMAX_EXACTLY: (name, min, suffix) => `${name} must be exactly ${min}${suffix}.`,
			RESOLVER_MINMAX_BOTH: (name, min, max, suffix) => `${name} must be between ${min} and ${max}${suffix}.`,
			RESOLVER_MINMAX_MIN: (name, min, suffix) => `${name} must be greater than ${min}${suffix}.`,
			RESOLVER_MINMAX_MAX: (name, max, suffix) => `${name} must be less than ${max}${suffix}.`,
			
			REACTIONHANDLER_PROMPT: "Which page would you like to jump to?",
			
			COMMANDMESSAGE_MISSING: "Missing one or more required arguments after end of input.",
			COMMANDMESSAGE_MISSING_REQUIRED: (name) => `**${name}** is a required argument.`,
			COMMANDMESSAGE_MISSING_OPTIONALS: (possibles) => `Missing a required option: (${possibles})`,
			COMMANDMESSAGE_NOMATCH: (possibles) => `Your option didn"t match any of the possibilities: (${possibles})`,
			
			MONITOR_COMMAND_HANDLER_REPROMPT: (tag, error, time, abortOptions) => `${tag} | **${error}** | You have **${time}** seconds to respond to this prompt with a valid argument. Type **${abortOptions.join("**, **")}** to abort this prompt.`,
			MONITOR_COMMAND_HANDLER_REPEATING_REPROMPT: (tag, name, time) => `${tag} | **${name}** is a repeating argument | You have **${time}** seconds to respond to this prompt with additional valid arguments. Type **"CANCEL"** to cancel this prompt.`,
			MONITOR_COMMAND_HANDLER_ABORTED: "Aborted",
			MONITOR_COMMAND_HANDLER_POSSIBILITIES: ["abort", "stop"],
			
			INHIBITOR_COOLDOWN: (remaining) => `${no} You have just used this command. You can use this command again in **${remaining} second${remaining === 1 ?"" : "s"}**.`,
			INHIBITOR_DISABLED: `${no} This command is currently disabled.`,
			INHIBITOR_DISABLED_GUILD: `${no} This command is currently disabled on this guild.`,
			INHIBITOR_MISSING_BOT_PERMS: (missing) => `${no} Insufficient permissions, missing: **${missing}**.`,
			INHIBITOR_NSFW: `${no} You may not use NSFW commands in this channel.`,
			INHIBITOR_PERMISSIONS: `${no} You do not have permission to use this command.`,
			INHIBITOR_REQUIRED_SETTINGS: (settings) => `The guild is missing the **${settings.join(", ")}** guild setting${settings.length !== 1 ? `s` :""} and thus the command cannot run.`,
			INHIBITOR_RUNIN: (types) => `${no} This command is only available in ${types} channels.`,
			INHIBITOR_RUNIN_NONE: (name) => `${no} The ${name} command is not configured to run in any channel.`,
			
			COMMAND_BLACKLIST_DESCRIPTION: "Blacklists or un-blacklists users and guilds from the bot.",
			COMMAND_BLACKLIST_SUCCESS: (usersAdded, usersRemoved, guildsAdded, guildsRemoved) => [
				usersAdded.length ? `**Users Added**\n${util.codeBlock("", usersAdded.join(", "))}` :"",
				usersRemoved.length ? `**Users Removed**\n${util.codeBlock("", usersRemoved.join(", "))}` :"",
				guildsAdded.length ? `**Guilds Added**\n${util.codeBlock("", guildsAdded.join(", "))}` :"",
				guildsRemoved.length ? `**Guilds Removed**\n${util.codeBlock("", guildsRemoved.join(", "))}` :""
			].filter(val => val !== "").join("\n"),
			
			COMMAND_EVAL_DESCRIPTION: "Evaluates arbitrary Javascript. Reserved for bot owner.",
			COMMAND_EVAL_EXTENDEDHELP: [
				"The eval command evaluates code as-in, any error thrown from it will be handled.",
				"It also uses the flags feature. Write --silent, --depth=number or --async to customize the output.",
				"The --wait flag changes the time the eval will run. Defaults to 10 seconds. Accepts time in milliseconds.",
				"The --output and --output-to flag accept either `file`, `log`, `haste` or `hastebin`.",
				"The --delete flag makes the command delete the message that executed the message after evaluation.",
				"The --silent flag will make it output nothing.",
				"The --depth flag accepts a number, for example, --depth=2, to customize util.inspect's depth.",
				"The --async flag will wrap the code into an async function where you can enjoy the use of await, however, if you want to return something, you will need the return keyword.",
				"The --showHidden flag will enable the showHidden option in util.inspect.",
				"The --lang and --language flags allow different syntax highlight for the output.",
				"The --json flag converts the output to json",
				"The --no-timeout flag disables the timeout",
				"If the output is too large, it'll send the output as a file, or in the console if the bot does not have the ATTACH_FILES permission."
			].join("\n"),
			COMMAND_EVAL_TIMEOUT: (seconds) => `${no} TIMEOUT: Took longer than ${seconds} seconds.`,
			COMMAND_EVAL_ERROR: (time, output, type) => `${no} **Error**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT: (time, output, type) => `${ye} **Output**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT_CONSOLE: (time, type) => `${ye} Sent the result to console.\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT_FILE: (time, type) => `${ye} Sent the result as a file.\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT_HASTEBIN: (time, url, type) => `${ye} Sent the result to hastebin: ${url}\n**Type**:${type}\n${time}\n`,
			
			COMMAND_UNLOAD_DESCRIPTION: "Unloads the klasa piece.",
			COMMAND_UNLOAD: (type, name) => `${ye} Unloaded ${type}: ${name}`,
			COMMAND_UNLOAD_WARN: `${no} You probably don"t want to unload that, since you wouldn"t be able to run any command to enable it again`,
			
			COMMAND_TRANSFER_DESCRIPTION: "Transfers a core piece to its respective folder.",
			COMMAND_TRANSFER_ERROR: `${no} That file has been transfered already or never existed.`,
			COMMAND_TRANSFER_SUCCESS: (type, name) => `${ye} Successfully transferred ${type}: ${name}.`,
			COMMAND_TRANSFER_FAILED: (type, name) => `${ye} Transfer of ${type}: ${name} to Client has failed. Please check your Console.`,
			
			COMMAND_RELOAD_DESCRIPTION: "Reloads a klasa piece, or all pieces of a klasa store.",
			COMMAND_RELOAD: (type, name, time) => `${ye} Reloaded ${type}: ${name}. (Took: ${time})`,
			COMMAND_RELOAD_FAILED: (type, name) => `${no} Failed to reload ${type}: ${name}. Please check your Console.`,
			COMMAND_RELOAD_ALL: (type, time) => `${ye} Reloaded all ${type}. (Took: ${time})`,
			COMMAND_RELOAD_EVERYTHING: (time) => `${ye} Reloaded everything. (Took: ${time})`,
			
			COMMAND_REBOOT_DESCRIPTION: "Reboots the bot.",
			COMMAND_REBOOT: `${ye} Rebooting...`,
			
			COMMAND_LOAD_DESCRIPTION: "Load a piece from your bot.",
			COMMAND_LOAD: (time, type, name) => `${ye} Successfully loaded ${type}: ${name}. (Took: ${time})`,
			COMMAND_LOAD_FAIL: `${no} The file does not exist, or an error occurred while loading your file. Please check your console.`,
			COMMAND_LOAD_ERROR: (type, name, error) => `${no} Failed to load ${type}: ${name}. Reason:${util.codeBlock("js", error)}`,
			
			COMMAND_PING_DESCRIPTION: "Runs a connection test to Discord.",
			COMMAND_PING: `${minus} Ping?`,
			COMMAND_PINGPONG: (diff, ping) => `${ye} Pong! (Roundtrip took: ${diff}ms. Heartbeat: ${ping}ms.)`,
			
			COMMAND_INVITE: () => [
				`To add ${this.client.user.username} to your discord guild:`,
				`<${this.client.invite}>`,
				util.codeBlock("", [
					"The above link is generated requesting the minimum permissions required to use every command currently.",
					"I know not all permissions are right for every guild, so don't be afraid to uncheck any of the boxes.",
					"If you try to use a command that requires more permissions than the bot is granted, it will let you know."
				].join(" "))
			],

			COMMAND_INVITE_DESCRIPTION: "Displays the join guild link of the bot.",

			COMMAND_INFO: [
				"Klasa is a `plug-and-play` framework built on top of the Discord.js library.",
				"Most of the code is modularized, which allows developers to edit Klasa to suit their needs.",
				"",
				"Some features of Klasa include:",
				"• 🐇💨 Fast loading times with ES2017 support (\"async\"/\"await\")",
				"• 🎚🎛 Per-client/guild/user settings that can be extended with your own fields",
				"• 💬 Customizable command system with automated parameter resolving and the ability to load/reload commands on-the-fly",
				"• 👀 \"Monitors\", which can watch messages and edits (for swear filters, spam protection, etc.)",
				"• ⛔ \"Inhibitors\", which can prevent commands from running based on any condition you wish to apply (for permissions, blacklists, etc.)",
				"• 🗄 \"Providers\", which simplify usage of any database of your choosing",
				"• " + ye + " \"Finalizers\", which run after successful commands (for logging, collecting stats, cleaning up responses, etc.)",
				"• ➕ \"Extendables\", which passively add methods, getters/setters, or static properties to existing Discord.js or Klasa classes",
				"• 🌐 \"Languages\", which allow you to localize your bot's responses",
				"• ⏲ \"Tasks\", which can be scheduled to run in the future, optionally repeating",
				"",
				"We hope to be a 100% customizable framework that can cater to all audiences. We do frequent updates and bugfixes when available.",
				"If you're interested in us, check us out at https://klasa.js.org"
			],
			
			COMMAND_CONF_USER_DESCRIPTION: "Change your private settings.",
			
			COMMAND_INFO_DESCRIPTION: "Provides some information about this bot.",
			
			COMMAND_HELP_DESCRIPTION: "Display help for a command.",
			COMMAND_HELP_NO_EXTENDED: "No extended help available.",
			COMMAND_HELP_DM: `${inbox} The list of commands you have access to has been sent to your DMs.`,
			COMMAND_HELP_NODM: `${no} You have DMs disabled, I couldn"t send you the commands in DMs.`,
			COMMAND_HELP_USAGE: (usage) => `Usage :: ${usage}`,
			COMMAND_HELP_EXTENDED: "Extended Help ::",
			
			COMMAND_ENABLE_DESCRIPTION: "Re-enables or temporarily enables a command/inhibitor/monitor/finalizer. Default state restored on reboot.",
			COMMAND_ENABLE: (type, name) => `+ Successfully enabled ${type}: ${name}`,
			
			COMMAND_DISABLE_DESCRIPTION: "Re-disables or temporarily disables a command/inhibitor/monitor/finalizer/event. Default state restored on reboot.",
			COMMAND_DISABLE: (type, name) => `+ Successfully disabled ${type}: ${name}`,
			COMMAND_DISABLE_WARN: `${no} You probably don"t want to disable that, since you wouldn"t be able to run any command to enable it again`,
			
			COMMAND_STATS: (memUsage, uptime, users, guilds, channels, klasaVersion, discordVersion, processVersion, message) => [
				`**__${this.client.user.tag}"s statistics__**`,
				"",
				`• Mem Usage: \`${memUsage} MB\``,
				`• Uptime: \`${uptime}\``,
				`• Users: \`${users}\``,
				`• Guilds: \`${guilds}\``,
				`• Channels: \`${channels}\``,
				`• Klasa: \`v${klasaVersion}\``,
				`• Discord.js: \`v${discordVersion}\``,
				`• Node.js: \`${processVersion}\``,
				`• Shards: \`${(message.guild ? message.guild.shardID : 0) + 1} / ${this.client.options.totalShardCount}\``
			].join("\n"),

			COMMAND_STATS_DESCRIPTION: "Provides some details about the bot and stats.",
			
			COMMAND_PREFIX_DESCRIPTION: "Add/Remove prefixes or Reset/Get the bot's prefix(es) in this guild.",
			COMMAND_PREFIX_SHOW: (prefixes) => `${dataGet} This guild"s **prefix${prefixes.length > 1 ? "es** are" : "** is"}: \`${prefixes.join("`, `")}\`.`,
			COMMAND_PREFIX_VALUE: `${no} You must provide a **prefix** to add/remove in this guild.`,
			COMMAND_PREFIX_EXISTS: (prefix) => `${dataNo} Prefix \`${prefix}\` already exists in this guild.`,
			COMMAND_PREFIX_USERMAX: (prefix) => `${no} You can"t add \`${prefix}\` to this guild"s prefixes: You can"t have more than **2 prefixes**!\n${vip} Consider buying **VIP** to get the ability of having **8 more**!`,
			COMMAND_PREFIX_VIPMAX: (prefix) => `${no} You can"t add \`${prefix}\` to this guild"s prefixes: You can"t have more than **10 prefixes**!`,
			COMMAND_PREFIX_ADD_SUCCESS: (prefix) => `${dataPlus} Prefix \`${prefix}\` has been added to this guild"s prefixes.`,
			COMMAND_PREFIX_DOESNT_EXIST: (prefix) => `${dataNo} Prefix \`${prefix}\` doesn"t exist in this guild.`,
			COMMAND_PREFIX_REMOVE_SUCCESS: (prefix) => `${dataMinus} Prefix \`${prefix}\` has been removed from this guild"s prefixes.`,
			COMMAND_PREFIX_RESET: `${dataYe} Successfuly **reset** this guild"s **prefixes**.`,

			COMMAND_LANGUAGE_DESCRIPTION: "Set, Reset or Get the bot's language in this guild.",
			COMMAND_LANGUAGE_SHOW: (lang) => `${dataGet} This guild"s **language** is: \`${lang}\`.`,
			COMMAND_LANGUAGE_VALUE: `${no} You must provide a **language name** to change this guild"s language.`,
			COMMAND_LANGUAGE_SET_UNSUCCESS: (lang) => `${dataNo} Language \`${lang}\` does not exist in my database.`,
			COMMAND_LANGUAGE_SET_SUCCESS: (lang) => `${dataYe} Guild"s langage has been set to \`${lang}\`.`,
			COMMAND_LANGUAGE_RESET: `${dataYe} Successfuly **reset** this guild"s **language**.`,

			COMMAND_COMMAND_DESCRIPTION: "Enable/Disable commands or Reset/Get diabled commands in this guild.",
			COMMAND_COMMAND_NOTANY: `${dataGet} You don"t have any **disabled commands**.`,
			COMMAND_COMMAND_SHOW: (cmds) => `${dataGet} This guild"s **disabled command${cmds.length > 1 ? "s** are" : "** is"}: \`${cmds.join("`, `")}\`.`,
			COMMAND_COMMAND_VALUE: `${no} You must provide a **command name** to enable/disable in this guild.`,
			COMMAND_COMMAND_EXISTS: (cmd) => `${dataNo} Command \`${cmd}\` is already **disabled** in this guild.`,
			COMMAND_COMMAND_DISABLED: (cmd) => `${dataMinus} Command \`${cmd}\` has been **disabled** in this guild.`,
			COMMAND_COMMAND_DOESNT_EXIST: (cmd) => `${dataNo} Command \`${cmd}\` is already **enabled** in this guild.`,
			COMMAND_COMMAND_ENABLED: (cmd) => `${dataPlus} Command \`${cmd}\` has been **enabled** in this guild.`,
			COMMAND_COMMAND_RESET: `${dataYe} Successfuly **reset** this guild"s **disabled commands**.`,

			COMMAND_WELCOME_DESCRIPTION: "Set, Reset or Get the bot's welcome channel in this guild.",
			COMMAND_WELCOME_SHOW: (channel) => `${dataGet} This guild"s **welcome channel** is ${channel || "none"}.`,
			COMMAND_WELCOME_CHANNEL: `${no} You must provide a **channel id/mention** to change this guild"s welcome channel.`,
			COMMAND_WELCOME_SET_UNSUCCESS: (channel) => `${dataNo} Channel \`${channel}\` does not exist in this guild.`,
			COMMAND_WELCOME_SET_SUCCESS: (channel) => `${dataYe} Guild"s welcome channel has been set to ${channel}.`,
			COMMAND_WELCOME_RESET: `${dataYe} Successfuly **reset** this guild"s **welcome channel**.`,

			REQUESTED: (tag) => `Requested by ${tag}`,

			COMMAND_ANIMAL_TITLE: (animal) => `Here"s a beautiful ${animal} picture!`,
			
			COMMAND_CAT_DESCRIPTION: "Sends a random cat picture or gif.",

			COMMAND_DOG_DESCRIPTION: "Sends a random dog picture or gif.",
			
			MUSIC_PLAY_ENDED: `${stop} There"s no more song in the queue. Stopped playing music.`,
			MUSIC_PLAY_ERROR: (error) => `${no} I"m sorry, an error occured: \`\`\`js\n${error}\`\`\``,
			MUSIC_PLAY_SONG: (title, tag, author) => `${play} Playing **${title}** by **${author}** | Requested by **${tag}**.`,
			MUSIC_QUEUEADD_PLAYLIST: (title, author) => `${add} Playlist **${title}** by **${author}** has been added to the queue.`,
			MUSIC_NOT_PLAYING: `${no} Music is currently not running on this guild.`,

			COMMAND_PLAY_DESCRIPTION: "Play music from Youtube (url (playlist or video) or a video's title) in your voice channel.",
			COMMAND_PLAY_NOVOICE: `${no} You need to be in a voice channel in order to play music!`,
			COMMAND_PLAY_NOPERM: (perm) => `${no} I don"t have the permission to **${perm === "speak" ? "speak** in" : "connect** to"} this channel!`,
			COMMAND_PLAY_ERRCON: `${no} I couldn"t join the voice channel you"re on.`,
			COMMAND_PLAY_QUEUEADD: (title, author) => `${add} Added **${title}** by **${author}** to the queue.`,
			PLAY_NO_RESULTS: (name) => `${no} I"m sorry, I found no results for "**${name}**".`,
			
			COMMAND_LEAVE_DESCRIPTION: "Leave the voice channel you're in when playing music.",
			COMMAND_LEAVE_NOVOICE: (channel) => `${no} You need to be inside the **${channel}** channel in order to stop music!`,
			COMMAND_LEAVE_SUCCESS: (channel) => `${stop} Successfuly left the **${channel}** channel.`,

			COMMAND_SKIP_DESCRIPTION: "Skip the current song when playing music.",
			COMMAND_SKIP_NOVOICE: (channel) => `${no} You need to be inside the **${channel}** channel in order to skip the song!`,
			COMMAND_SKIP_SUCCESS: (title, tag) => `${next} Skipped **${title}** | User: **${tag}**.`,

			COMMAND_PREV_DESCRIPTION: "Play the previous song when playing music.",
			COMMAND_PREV_NOVOICE: (channel) => `${no} You need to be inside the **${channel}** channel in order to play the previous song!`,
			COMMAND_PREV_NOPE: `${prev} There is no previous song I could play.`,
			COMMAND_PREV_SUCCESS: (title, tag) => `${prev} Playing previous song (**${title}**) | User: **${tag}**.`,

			COMMAND_NOW_DESCRIPTION: "See what's the current song's name when playing music.",
			COMMAND_NOW_SUCCESS: (title, tag) => `${play} Now Playing: **${title}**, requested by **${tag}**.`,

			COMMAND_VOLUME_DESCRIPTION: "See or change the volume when playing music.",
			COMMAND_VOLUME_VAL: (volume) => `${vol} Current volume is **${volume}%**`,
			COMMAND_VOLUME_NOPE: `${no} Volume"s value must be included between **0%** and **200%**.`,
			COMMAND_VOLUME_SUCCESS: (old, volume, tag) => `${old > volume ? volMin : old === volume ? vol :volPlus} Changed volume"s value from **${old}%** to **${volume}%** | User: **${tag}**.`,
		
			COMMAND_QUEUE_DESCRIPTION: "See what's in the queue (image version) when playing music.",
			COMMAND_EQUEUE_DESCRIPTION: "See what's in the queue (embed version) when playing music.",
			COMMAND_EQUEUE_TITLE: (guild) => `Music Queue: ${guild}`,
			COMMAND_QUEUE_TITLE: "MUSIC QUEUE FOR",
			COMMAND_QUEUE_EMPTY: "Queue is empty...",
			COMMAND_QUEUE_NOPREV: "No previous song...",
			COMMAND_QUEUE_PREV: "PREVIOUS SONG",
			COMMAND_QUEUE_NOW: "NOW PLAYING",
			COMMAND_QUEUE_NEXT: "NEXT SONG(S)",
			COMMAND_QUEUE_PAUSED: " (PAUSED)",
			COMMAND_QUEUE_MORESONGS: (amount) => `\nAnd ${amount} more song(s)...`,

			COMMAND_PAUSE_DESCRIPTION: "Pause the current song when playing music.",
			COMMAND_PAUSE_NOVOICE: (channel) => `${no} You need to be inside the **${channel}** channel in order to pause the current song!`,
			COMMAND_PAUSE_PAUSED: `${no} The song is already paused!`,
			COMMAND_PAUSE_SUCCESS: (title, tag) => `${pause} Paused **${title}** | User: **${tag}**.`,

			COMMAND_RESUME_DESCRIPTION: "Resume the current song when playing music.",
			COMMAND_RESUME_NOVOICE: (channel) => `${no} You need to be inside the **${channel}** channel in order to resume the current song!`,
			COMMAND_RESUME_PLAYING: `${no} The song is already playing!`,
			COMMAND_RESUME_SUCCESS: (title, tag) => `${resume} Resumed **${title}** | User: **${tag}**.`,

			COMMAND_SHUFFLE_DESCRIPTION: "Shuffle the queue when playing music.",
			COMMAND_SHUFFLE_NOVOICE: (channel) => `${no} You need to be inside the **${channel}** channel in order to shuffle the queue!`,
			COMMAND_SHUFFLE_SUCCESS: `${shuffle} Successfuly shuffled the queue.`,

			COMMAND_REPEAT_DESCRIPTION: "Change repeat status when playing music.",
			COMMAND_REPEAT_NOVOICE: (channel) => `${no} You need to be inside the **${channel}** channel in order to change the repeat status!`,
			COMMAND_REPEAT_SONG: `${repeat1} Repeat is **enabled** for the current **song**.`,
			COMMAND_REPEAT_QUEUE: `${repeat} Repeat is **enabled** for the current **queue**.`,
			COMMAND_REPEAT_DISABLED: `${repeat} Repeat is **disabled** for both queue and song.`,
			COMMAND_REPEAT_SUCCESS: (s, tag) => `${["D", "Q"].includes(s) ? repeat : repeat1} Repeat has been **${s === "D" ? "disabled" : "enabled"}** for **${s === "D" ? "both queue and song" : s === "Q" ? "queue" : "song"}** | User: **${tag}**.`,
			
			COMMAND_PLAYLIST_DESCRIPTION: "Create, Delete, Get or list your personnal playlists.",
			COMMAND_PLAYLIST_CREATE_CHARLIMIT: `${no} The playlist"s name may not exceed 50 characters.`,
			COMMAND_PLAYLIST_CREATE_USERLIMIT: (playlist) => `${no} Cannot create the playlist \`${playlist}\` : You can"t have more than **2** playlists\n${vip} Consider buying **VIP** to get the ability of having **18 more**!`,
			COMMAND_PLAYLIST_CREATE_VIPLIMIT: (playlist) => `${dataNo} Cannot create the playlist \`${playlist}\` : You can"t have more than **20** playlists.`,
			COMMAND_PLAYLIST_CREATE_SUCCESS: (playlist) => `${dataPlus} The playlist \`${playlist}\` has been **created**!`,
			COMMAND_PLAYLIST_DELETE_SUCCESS: (playlist) => `${dataMinus} The playlist \`${playlist}\` has been **deleted**!`,
			COMMAND_PLAYLIST_MORESONGS: (rest) => `\n**${smallMinus} and ${rest} more songs...**`,
			COMMAND_PLAYLIST_TITLEGET: (tag, title) => `${tag}"s playlist: ${title}`,
			COMMAND_PLAYLIST_TITLELIST: (tag) => `${tag}"s personal playlists`,
			COMMAND_PLAYLIST_NULL: (playlist) => `${dataNo} The playlist **${playlist}** does not exist!`,
			COMMAND_PLAYLIST_NOTANY: `${dataNo} You don"t have any playlist!`,
		
			COMMAND_ANNOUNCE_DESCRIPTION: "Send a message that mentions everyone in the specified channel",
			COMMAND_ANNOUNCE_NOCHANNEL: `${no} You must provide a **channel ID** or a **channel mention**.`,
			COMMAND_ANNOUNCE_SUCCESS: (channel) => `${ye} Successfuly sent the message to ${channel}.`,

			COMMAND_AMIVIP_DESCRIPTION: "Get your VIP advantages if you are one. If you are-- SURPRISE!",
			COMMAND_AMIVIP_ALREADY: "\\🍣👌\\🍣 You already got your glorious welcome! Thanks for being a VIP but-- You can't run this again!",
			COMMAND_AMIVIP_NOTONSERVER: "\\🍣 You're not a real member of our community! (join here: https://discord.gg/kaZ2jf8)",
			COMMAND_AMIVIP_NOTVIP: "\\🍣 **YOU SHALL NOT PASS!** (You don't have the VIP role on the official guild)",
			COMMAND_AMIVIP_TITLE: "🍣 A NEW MEMBER BECAME A VIP USER! YAY!!",
			COMMAND_AMIVIP_YOUARE: (tag) => `🍣 Welcome to **${tag}** in the VIP users community! *yay* 🍣`,

			COMMAND_ARCADIA_FILTER_DESCRIPTION: (type) => `Arcadia: ${type} filter.`,
			COMMAND_ARCADIA_GEN_DESCRIPTION: (type) => `Arcadia: ${type} gen.`,
			COMMAND_ARCADIA_TEXT_DESCRIPTION: (type) => `Arcadia: ${type} text.`,
		};
	}

	async init() {
		await super.init();
	}

};
