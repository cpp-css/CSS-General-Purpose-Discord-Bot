module.exports = {
    description: "add classes",
    async execute(message, args, admins, getClasses) {
        let getClass = (args[0] + " " + args[1]).toString();
        function isClassWhitelisted() {
            if (getClasses[getClass + "-1"]) {
                return true;
            }
            return false;
        }

        if (isClassWhitelisted() == true) {
            let doesRoleExist = message.guild.roles.cache.find(role => role.name === getClass);
            if (doesRoleExist) {
                let doesUserHaveRole = message.member.roles.cache.find(role => role.name === getClass);
                if (doesUserHaveRole) {
                    message.reply("you already had been added to " + getClass + ".");
                } else {
                    message.member.roles.add(doesRoleExist);
                    message.reply("you are now added to " + getClass + ".");
                }
            } else {
                message.guild.roles.create({
                    data: {
                        name: getClass,
                        color: "grey"
                    }
                })
                .then(role => {
                    message.member.roles.add(role)
                    let channelName = (args[0] + "-" + args[1]).toString().toLowerCase();
                    let getClassChannel = message.guild.channels.cache.find(channel => channel.name == channelName);
                    if (!getClassChannel) {
                        message.guild.channels.create(getClass, {
                            type: "text",
                            permissionOverwrites: [
                                {
                                    id: message.guild.id,
                                    deny: ['VIEW_CHANNEL'],
                                },
                                {
                                    id: role.id,
                                    allow: ['VIEW_CHANNEL'],
                                },
                            ]
                        })
                        .then(async channel => {
                            console.log(getClasses[getClass + "-1"]["CourseTitle"]);
                            channel.setTopic(getClasses[getClass + "-1"]["CourseTitle"]);
                            let getCategory = message.guild.channels.cache.find(category => category.name == "Programming Help");
                            if (getCategory) {
                                await channel.setParent(getCategory.id, { lockPermissions: false });
                            } else {
                                message.guild.channels.create("Programming Help", {
                                    type: 'category',
                                })
                                .then(async category => {

                                    await channel.setParent(category.id, { lockPermissions: false });
                                });
                            }
                        });
                    }
                })
                .then(() => message.reply("you are now added to " + getClass + "."))
                .catch(console.error);
            }
        } else {
            message.reply("Class was not found. \n If this is a new class please contact a moderator to add the class.");
        }
    }
}