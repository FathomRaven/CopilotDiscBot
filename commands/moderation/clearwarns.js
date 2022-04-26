//Require fs
const fs = require("fs");
//Import messageEmbed from discord.js
const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {
    //Get the member
    let member = message.mentions.members.first();
    
    //If the member is not valid, check for an id
    if (!member) {
        //Check if the id is valid
        if (!args[0]) return message.channel.send("Please mention a valid member of this server");
        //Get the member
        member = message.guild.members.cache.get(args[0]);
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
        //Clear the warns
        warnList[member.user.id] = warnList[member.user.id].filter(warn => warn.guild != message.guild.id);
        //Write the new warns.json file
        fs.writeFile("./warns.json", JSON.stringify(warnList), (err) => {
            //Check if there is an error
            if (err) return console.log(err);
        });
        //Send a message to the channel
        message.channel.send(`Cleared ${member.user.tag}'s warns!`);

    })
}

exports.name = "clearwarns";
exports.description = "Clear a user's warns";
exports.usage = "clearwarns <user>";
exports.aliases = ["cw"];