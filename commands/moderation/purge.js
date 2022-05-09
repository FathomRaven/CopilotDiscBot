//Import permissions from discord.js
const { Permissions } = require("discord.js");

exports.run = (client, message, args) => {
    //Check if the user has the permission to delete messages
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
        return message.channel.send("You do not have the permission to use this command!");
    }

    amount = parseInt(args[0]);

    //Check if the arg is a number
    if (isNaN(amount) || amount <= 0 || amount > 1000) return message.channel.send("Please specify a valid number of messages to purge");

    if(amount < 100)
        message.channel.bulkDelete(amount)
    else
    {
        deleteIterations = Math.floor(amount / 100);
        remainder = amount % 100;
        for(i = 0; i < deleteIterations; i++)
        {
            message.channel.bulkDelete(100);
        }
        if(remainder > 0)
            message.channel.bulkDelete(remainder);
    }

    //Send a message to the channel
    message.channel.send(`Purged ${amount} messages!`);
}

exports.name = "purge";
exports.description = "Purge a number of messages";
exports.usage = "purge <number>";
exports.aliases = ["prune", "clear"];