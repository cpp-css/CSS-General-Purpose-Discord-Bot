const emojiRegex = require('emoji-regex');
const { MessageCollecter } = require('Discord.js');

let msgCollectorFilter = (newMsg, originalMsg) => {
    if (newMsg.author.id === originalMsg.author.id) return false;
    let args = originalMsg.content.split(/, \s+/);
    if(args.length != 2) return false;
}

module.exports = {
    description: "find a message id and checks if there's any reactions to corespond to the role.",
    async execute(message, args, admins) {
        if (message.member.roles.cache.some(role => admins.includes(role.name))) {
            try {
                let fetchMessage = await message.channel.messages.fetch(args[0]);
                if (fetchMessage) {
                    let getEmojis = fetchMessage.content.match(/<:.+?:\d+>/g);
                    console.log(getEmojis);
                    console.log(fetchMessage.content);
                    //await message.channel.send("")

                }
            } catch(err) {
                console.log(err);
                message.reply("Message id was not found. Please enter an vaild message id.");
            }
        }
    }
}