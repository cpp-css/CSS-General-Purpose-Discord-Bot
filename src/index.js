const Discord = require("discord.js");
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION']});
const fs = require("fs");

require('dotenv').config();

client.commands = new Discord.Collection();
const commands = fs.readdirSync('./src/commands')
    .filter(file => file.endsWith('.js'));

for (const file of commands) {
    const command = require(`./commands/${file}`);
    const fileName = file.toLowerCase().split('.')[0];
    client.commands.set(fileName, command);
}

const prefix = "!";
const admins = ["Mod", "E-Board"];

client.on('ready', () => {
    console.log("Void is online.");
    client.user.setActivity('to your concerns ;)', {type: 'LISTENING'});
})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    for (commandFile of commands) {
        const fileName = commandFile.toLowerCase().split('.')[0];
        if (command == fileName) {
            client.commands.get(fileName).execute(message, args, admins);
        }
    }
})


client.login(process.env.TOKEN);