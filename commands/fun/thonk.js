//import messageEmbed from discord.js
const { MessageEmbed } = require("discord.js");
exports.run = (client, message, args) => {
    //Creat an embed
    const embed = new MessageEmbed()
        //set color to a yellow color
        .setColor("#ffff00")
        .setTitle("Thonk")
        .setDescription("Thinking on this")
        .setImage("https://c.tenor.com/doIsoH43a2EAAAAC/think-emoji.gif")

    //Send the embed
    message.channel.send({ ephemeral: true, embeds: [embed] });

}

exports.name = "thonk";
exports.description = "Thonk";
exports.usage = "thonk";
exports.aliases = ["think", "thinkgif", "thonkgif"];