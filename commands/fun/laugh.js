//import messageEmbed from discord.js
const { MessageEmbed } = require("discord.js");
exports.run = (client, message, args) => {
    //Creat an embed
    const embed = new MessageEmbed()
        //set color to a yellow color
        .setColor("#ffff00")
        .setTitle("LOL")
        .setDescription("L bozo")
        //Set image to a random item in gifs array
        .setImage(gifs[Math.floor(Math.random() * gifs.length)])

    //Send the embed
    message.channel.send({ ephemeral: true, embeds: [embed] });

}

gifs = 
[
    "https://c.tenor.com/wIxFiobxxbIAAAAd/john-jonah-jameson-lol.gif",
    "https://c.tenor.com/w2mCAR7kgUsAAAAC/clash-royale-emotes.gif",
    "https://c.tenor.com/abslSZsXIa8AAAAC/bh187-family-guy.gif",
    "https://c.tenor.com/agrQMQjQTzgAAAAd/talking-ben-laugh.gif",
    "https://c.tenor.com/zHV_u1b5BUkAAAAC/castle-crashers.gif",
    "https://c.tenor.com/h7xHyShRg3kAAAAi/laugh-emoji.gif",
    "https://c.tenor.com/SnKW5b4CkRkAAAAC/haha-funny.gif"
]

exports.name = "laugh";
exports.description = "Laugh at someone";
exports.usage = "laugh";
exports.aliases = ["laughgif"];