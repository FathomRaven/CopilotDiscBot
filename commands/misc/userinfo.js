//Import messageEmbed from discord.js
const { MessageEmbed } = require("discord.js");
exports.run = (client, message, args) => {
    //If there are mentions, set the member to the first mention
    let member = message.mentions.members.first();
    //If the member is not valid, check for an id
    if (!member) {
        //Get the member
        member = message.guild.members.cache.get(args[0]);
        if (!member) {
            member = message.member;
        }
    }
    //Create the user embed
    const userEmbed = new MessageEmbed()
        .setColor(member.roles.highest.color)
        .setTitle(`${member.user.username}'s info`)
        .setThumbnail(member.user.displayAvatarURL({ format: "png", dynamic: true }))
        .addFields(
            { name: "ID", value: member.user.id.toString(), inline: true },
            { name: "Created at", value: member.user.createdAt.toString(), inline: true },
            { name: "Joined at", value: member.joinedAt.toString(), inline: true },
            //Highest role
            { name: "Highest role", value: member.roles.highest.toString(), inline: true },

        )
        .setTimestamp()
    //Send the embed
    message.channel.send({ ephemeral: true, embeds: [userEmbed] });
}

exports.name = "userinfo";
exports.description = "Get information about a user";
exports.usage = "userinfo [user]";
exports.aliases = ["ui", "user", "info"];