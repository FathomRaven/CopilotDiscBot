//Require fs
const fs = require("fs");
//Import messageEmbed from discord.js
const { MessageEmbed } = require("discord.js");
//Import permission from discord.js
const { Permissions } = require("discord.js");

exports.run = (client, message, args) => {
    //Warn command

    //Check if the user has the permission to delete messages
    if (!message.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) {
        return message.channel.send("You do not have the permission to use this command");
    }
    //Get the member
    let member = message.mentions.members.first();
    
    //If the member is not valid, check for an id
    if (!member) {
        //Get the member
        member = message.guild.members.cache.get(args[0]);
    }

    //If the member is not valid, return an error
    if (!member) return message.channel.send("Please mention a valid member of this server");

    //Check if there is a reason
    if (!args[1]) return message.channel.send("Please provide a reason for the warning!");
    //Get the reason
    let reason = args.slice(1).join(" ");

    //Create the warning object
    const warn = {
        reason: reason,
        moderator: message.author.id,
        guild: message.guild.id
    }

    //Read the warns.json file
    fs.readFile("./warns.json", "utf8", (err, data) => {
        if (err) return console.log(err);
        let warns = JSON.parse(data);
        //Check if the user has been warned
        if (!warns[member.user.id]) warns[member.user.id] = [];
        //Push the warn to the warns.json file
        warns[member.user.id].push(warn);
        //Write the warns.json file
        fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {
            if (err) return console.log(err);
        });
        fs.writeFileSync("./warns.json", JSON.stringify(warns));
    });

    //Send the message
    message.channel.send(`${member.user.tag} has been warned for ${reason}`);

    //Check if you can dm the user
    if (!member.user.bot) {
            //Create an embed with the reason and guild name
            const embed = new MessageEmbed()
            .setTitle("You have been warned!")
            .setDescription(`You have been warned in ${message.guild.name} for ${reason}`)
            .setColor("#ff0000")
            .setTimestamp();
        //Send the embed and check for an error
        member.send({embeds: [embed]}).catch(err => {
            //If there is an error send a message
            message.channel.send("I could not dm the user");
        });

    }
}

exports.name = "warn";
exports.description = "Warn a user";
exports.usage = "warn <user> <reason>";
exports.aliases = ["w", "wrn"];