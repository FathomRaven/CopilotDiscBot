//Import embeds
const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {
        
    //Create the serverinfo embed
    const serverinfoEmbed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Server Info")
        .setThumbnail(message.guild.iconURL({ format: "png", dynamic: true }))
        .addFields(
            { name: "Name", value: message.guild.name.toString(), inline: true },
            { name: "ID", value: message.guild.id.toString(), inline: true },
            { name: "Member count", value: message.guild.memberCount.toString(), inline: true },
            { name: "Channel count", value: message.guild.channels.cache.size.toString(), inline: true },
            { name: "Roles", value:message.guild.roles.cache.map(role => role.name).join(', '), inline: true },
            { name: "Created At", value: message.guild.createdAt.toLocaleString(), inline: true }
        )
        .setTimestamp();
    //Send the embed
    message.channel.send({ephemeral: true, embeds: [serverinfoEmbed]});
}

exports.name = "serverinfo";
exports.description = "Get information about the server";
exports.usage = "serverinfo";
exports.aliases = ["si", "sinfo"];