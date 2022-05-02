//import messageEmbed from discord.js
const { default: faker } = require("@faker-js/faker");
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

    //Create a message embed
    const embed = new MessageEmbed()
    .setTitle(`${member.user.username}'s Information`)
    .setDescription(`**
    Name: ${faker.name.findName()}
    Email: ${faker.internet.email()}
    Address: ${faker.address.streetAddress()}
    Phone Number: ${faker.phone.phoneNumber()}
    Credit Card: ${faker.finance.creditCardNumber()}
    IP: ${faker.internet.ipv4()}
    IPV6: ${faker.internet.ipv6()}    
    **`)
    .setColor("#00ff00")

    //Send the embed
    message.channel.send({ ephemeral: true, embeds: [embed] });
}

exports.name = "dox"
exports.description = "Dox a user";
exports.usage = "dox [user]";