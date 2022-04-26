//Import messageEmbed from discord.js
const { MessageEmbed } = require("discord.js");
exports.run = (client, message, args) => {

    //Get the role
    let role = message.mentions.roles.first();
    //If the role is not valid, check for an id
    if (!role) {
        //Check if the id is valid
        if (!args[0]) return message.channel.send("Please mention a valid role of this server");
        //Get the role
        role = message.guild.roles.cache.get(args[0]);
    }
    //If the role is not valid, check for a name
    if (!role) {
        //Get the role
        role = message.guild.roles.cache.find(r => r.name === args.join(" "));
    }
    //Check if the role is valid
    if (!role) return message.channel.send("Please mention a valid role of this server");
    //Get the role info
    const roleInfoEmbed = new MessageEmbed()
        .setColor(role.color)
        .setTitle(`${role.name}'s info`)
        .setDescription(`${role.name} has ${role.members.size} members`)
        .addFields(
            { name: "ID", value: role.id.toString(), inline: true },
            { name: "Color", value: "#" + role.color.toString(), inline: true },
            { name: "Position", value: role.position.toString(), inline: true },
            { name: "Mentionable", value: role.mentionable.toString(), inline: true },
            { name: "Created at", value: role.createdAt.toString(), inline: true }
        )
        .setThumbnail(role.guild.iconURL({ format: "png", dynamic: true }))
        .setTimestamp();
    //Send the embed
    message.channel.send({ephemeral: true, embeds: [roleInfoEmbed]})
}

exports.name = "roleinfo";
exports.description = "Get information about a role";
exports.usage = "roleinfo <role>";
exports.aliases = ["ri", "role"];