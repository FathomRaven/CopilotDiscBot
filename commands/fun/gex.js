//Import messageEmbed from discord.js
const { MessageEmbed } = require("discord.js");
exports.run = (client, message, args) => {
    //create a new MessageEmbed
    const embed = new MessageEmbed()
        .setColor("#0df709")
        .setTitle('Gex says... ')
        .setDescription(genQuote() + "\n\n **-Gex**")
        .setThumbnail("https://i.imgur.com/Tj7z47o.jpeg")
        .setTimestamp();
    //Send the embed to the channel
    message.channel.send({ephemeral: true, embeds: [embed]})
}

function getRndInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function rnd(list)
{
    return list[getRndInt(0, list.length)];
}

peopleList = 
[
    "Jack Nicholson",
    "John Wayne",
    "Elvis",
    "Tom Arnold",
    "Mel Brook",
    "Woody Allen",
    "Betty Crocker",
    "Tom Hank",
    "Mel Gibson",
    "Gary Cole",
    "Alan ruck",
    "Keith David",
    "Jerry Garcia",
    "Al Pacino",
    "Patrick Stewart",
    "James Caan",
    "Martin Sheen",
    "Peter Coyote",
    "Harrison Ford",
    "Werner Herzog",
    "Bob Hoskin",
    "Lorne Michaels",
    "Bill Gates",
    "Richard Simmons",
    "Alex Trebek",
    "Boy George",
    "Don Cheadle",
    "Chuck Jones",
    "Chunck Norris"
]

placeList = 
[
    "bathroom",
    "house",
    "garage",
    "poker game",
    "casino",
    "pool",
    "mansion",
    "hotel",
    "complex",
    "place",
    "flat",
    `moderately priced summer home which retails for ${getRndInt(100, 980)} thousand`,
    "island",
    "dungeon",
    "hunting cabin",
    "firehouse sub",
]

eventList = [
    
    "a party",
    "a bachelorette party",
    "a pool party",
    "a birthday party",
    
    "Christmas",
    "St. Patricks day",
    "Halloween",

    "yoga",
    "board game night",
    "a mosh pit",
    "being hunted",
    "the end of the world",
    "4th of july",
    "a funeral"
]

verbList = 
[
    "like",
    "better then",
    "worse then",
    "less organized",
    "more organized"
]

templates = [
    `This is ${rnd(verbList)} ${rnd(eventList)} at ${rnd(peopleList)}'s ${rnd(placeList)}`,
    `This is ${rnd(verbList)} ${rnd(eventList)} with ${rnd(peopleList)}`,
    `Note to self: Never go to ${rnd(eventList)} with ${rnd(peopleList)}`,
    `Feels like I'm at ${rnd(peopleList)}'s ${rnd(placeList)}`,
    `Reminds me of ${rnd(eventList)} at ${rnd(peopleList)}'s ${rnd(placeList)}`,
    `It's tail time`
]

function genQuote() {
    return templates[getRndInt(0, templates.length)];
}


exports.name = "gex";
exports.description = "Get a quote from Gex himself!";
exports.usage = "gex";
exports.aliases = [];    