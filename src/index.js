const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

require('dotenv').config();

let csvJson = () => {
    let data = fs.readFileSync(__dirname + "/data/f2020csc.csv", "utf8");
    let lines = data.split("\n");
    let result = [];
    let headers = lines[0].split(",");
    lines.map(function(line, indexLine) {
        if (indexLine < 1) return;
        var currentLine = line.split(",");
        let obj = {};
        headers.map(function(header, indexHeader) {
            obj[header] = currentLine[indexHeader];
        })
        let mainKey = (currentLine[1] + " " + currentLine[2] + "-" + currentLine[3]).toString();
        result[mainKey] = obj;
    })
    return result;
}

client.commands = new Discord.Collection();
const commands = fs.readdirSync('./src/commands')
    .filter(file => file.endsWith('.js'));

for (const file of commands) {
    const command = require(`./commands/${file}`);
    const fileName = file.toLowerCase().split('.')[0];
    client.commands.set(fileName, command);
}

const prefix = "!";
const admins = ["Mod", "E-Board", "Member"];

client.on('ready', () => {
    console.log("Bot has been initialized . . .");
    client.user.setActivity('your concerns ;)', {type: 'LISTENING'});
})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    for (commandFile of commands) {
        const fileName = commandFile.toLowerCase().split('.')[0];
        if (command == fileName) {
            client.commands.get(fileName).execute(message, args, admins, csvJson());
        }
    }
})

client.login(process.env.TOKEN);