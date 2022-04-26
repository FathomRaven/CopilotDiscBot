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
    //Check if there is a warn index
    if (!args[1]) return message.channel.send("Please specify a warn index");
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
        //Check if the warn index is valid
        if (args[1] > warns.length || args[1] <= 0) return message.channel.send("Please specify a valid warn index");
        //Delete the warn
        warnList[member.user.id].splice(args[1] - 1, 1);
        //Write the new warns.json file
        fs.writeFile("./warns.json", JSON.stringify(warnList), (err) => {
            //Check if there is an error
            if (err) return console.log(err);
        });
        //Send a message to the channel
        message.channel.send(`Deleted warn ${args[1]} from ${member.user.tag}`);
    })
}

exports.name = "delwarn";
exports.description = "Delete a warn";
exports.usage = "delwarn <user> <warn index>";
exports.aliases = ["dwarn", "dwrn"];