const APOLLObot = require('./apollo_bot/main');

require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], 
    partials: ['CHANNEL']
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    APOLLObot.setClientUserId(client.user.id);
});

client.on("messageCreate", message => {
    if (APOLLObot.isListening(message)) {
        APOLLObot.runCommand().then((reply) => {
            if (reply) {
                message.reply(reply)
                    .then(() => console.log(`Replied to message "${message.content}"`))
                    .catch(console.error);
                }
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
