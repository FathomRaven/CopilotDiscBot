//Import messageEmbed from discord.js
const { MessageEmbed } = require("discord.js");

//The export.run module
exports.run = (client, message, args) => {
    
    //If there are mentions, set the member to the first mention
    let member = message.mentions.members.first();
    
    //If the member is not valid, check for an id
    if (!member) {
        //Get the member
        member = message.guild.members.cache.get(args[0]);
        if(!member)
        {
            member = message.member;
        }
    }

    //Get the avatar of the user in an embed
    const avatarEmbed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle(`${member.user.username}'s avatar`)
        .setImage(member.displayAvatarURL({ format: "png", dynamic: true }));
    //Send the embed
    message.channel.send({ephemeral: true, embeds: [avatarEmbed]})
}

exports.name = "avatar";
exports.description = "Get the avatar of a user";
exports.usage = "avatar [user]";
exports.aliases = ["av", "pfp"];