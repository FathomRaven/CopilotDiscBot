//Import permission from discord.js
const { Permissions } = require("discord.js");

exports.run = (client, message, args) => {
    //Check the user has permission to kick members
    if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.channel.send("You do not have permission to kick members!");
    //Get the member
    let member = message.mentions.members.first();
    
    //If the member is not valid, check for an id
    if (!member) {
        //Check if the id is valid
        if (!args[0]) return message.channel.send("Please mention a valid member of this server");
        //Get the member
        member = message.guild.members.cache.get(args[0]);
    }
    //Check if there is a reason
    if(!args[1]) return message.channel.send("Please provide a reason for the kick!");

    //Kick the member
    member.kick({reason: args.slice(1).join(" ")}).catch(err => {
        //If there is an error, send an error message
        return message.channel.send("I was unable to kick the member!");
    }).then(() => {
        //Send the message
        message.channel.send(`${member.user.tag} has been kicked for ${args.slice(1).join(" ")}`);
    });
}

exports.name = "kick";
exports.description = "Kick a member";
exports.usage = "kick <user> <reason>";
exports.aliases = ["k", "boot"];