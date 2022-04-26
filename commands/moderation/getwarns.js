//Require fs
const fs = require("fs");
//Import messageEmbed from discord.js
const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {
    //Get the member
    let member = message.mentions.members.first();
    
    //If the member is not valid, check for an id
    if (!member) {
        //Get the member
        member = message.guild.members.cache.get(args[0]);
        //If member is not valid, send message
        if (!member) return message.channel.send("Please mention a valid member of this server");
    }
    //Read the warns.json file
    fs.readFile("./warns.json", "utf8", (err, data) => {
        //Check if there is an error
        if (err) return console.log(err);
        //Parse the warns.json file
        let warnList = JSON.parse(data);
        //Get the users warns in this guild
        let warns = warnList[member.user.id].filter(warn => warn.guild == message.guild.id);
        //Check if the user has any warns
        if (!warns.length) return message.channel.send("This user has no warns!");
        //Create an embed with the warns
        let embed = new MessageEmbed()
            .setTitle(`${member.user.tag}'s warns`)
            //Add a field for each warn
            .addFields(
                warns.map(warn => {
                    return {
                        name: warn.reason,
                        value: "**Moderator:** " + message.guild.members.cache.get(warn.moderator).user.tag
                    }
                }
            ))
            //Set the color to light blue
            .setColor("#00ffff")
            .setTimestamp();
        //Send the embed
        message.channel.send({embeds: [embed]});

    });

}

exports.name = "getwarns";
exports.description = "Get a user's warns";
exports.usage = "getwarns <user>";
exports.aliases = ["warns", "gwarns"];