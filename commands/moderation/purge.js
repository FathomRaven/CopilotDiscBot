//Import permissions from discord.js
const { Permissions } = require("discord.js");

exports.run = (client, message, args) => {
    //Check if the user has the permission to delete messages
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
        return message.channel.send("You do not have the permission to use this command!");
    }

    amount = parseInt(args[0]) + 1;

    //Check if the number of messages to purge is valid
    if (amount > 100 || amount <= 0) return message.channel.send("Please specify a valid number of messages to purge");
    //Check if the arg is a number
    if (isNaN(amount)) return message.channel.send("Please specify a valid number of messages to purge");

    //Purge the amount of messages
    message.channel.bulkDelete(amount).then(() => {
        //Send a message to the channel
        message.channel.send(`Purged ${amount - 1} messages!`);
    });
}

exports.name = "purge";
exports.description = "Purge a number of messages";
exports.usage = "purge <number>";
exports.aliases = ["prune", "clear"];