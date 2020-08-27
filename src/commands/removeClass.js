
module.exports = {
    description: "remove class",
    async execute(message, args, admins, getClasses) {
        let getClass = args[0] + " " + args[1];

        function isClassWhitelisted() {
            if (getClasses[getClass + "-1"]) {
                return true;
            }
            return false;
        }

        if (isClassWhitelisted) {
            let doesRoleExist = message.guild.roles.cache.find(role => role.name === getClass);
            if (doesRoleExist) {
                let doesUserHaveRole = message.member.roles.cache.find(role => role.name === getClass);
                if (doesUserHaveRole) {
                    message.member.roles.remove(doesRoleExist);
                    message.reply("you have been successfully removed from " + getClass + ".");
                } else {
                    message.reply("you are not roled in " + getClass + ".");
                }
            } else {
                message.reply("Class was not found. If this is a new class please contact a moderator to add the class.");
            }
        }
    }
}