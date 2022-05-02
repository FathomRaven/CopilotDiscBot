//Import messageEmbed from discord.js
const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {
    if(!args.length)
    return message.channel.send("you didn't complete your sentence")

    const embed = new MessageEmbed()
    .setColor('#fcfc99')
    .setTitle(`i say... `)
    .setImage(benGifs[Math.floor(Math.random() * benGifs.length)]);

    message.channel.send({ephemeral: true, embeds: [embed]})
}

benGifs = 
[
  "https://c.tenor.com/Pta1QQlnZZYAAAAC/ben-yes-yes.gif",
  "https://c.tenor.com/SdsYv4vylh0AAAAC/dog-saying-no-no.gif",
  "https://c.tenor.com/Cziub06OwxgAAAAC/ben.gif",
  "https://c.tenor.com/cBEyGkVjhTMAAAAC/talking-ben-ben.gif"
]

exports.name = "ben";
exports.description = "Ask Talking Ben a yes or no question";
exports.usage = "ben [question]";