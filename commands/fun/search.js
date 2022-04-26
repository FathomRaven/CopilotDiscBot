const fetch = require('isomorphic-fetch')
const jsdom = require("jsdom")
const { JSDOM } = jsdom
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {

    //If args is empty, return
    if (!args[0]) return message.channel.send("Please give something to search!");

    (async () => {
        const response = await fetch(`https://www.google.com/search?q=${args.join("+")}&tbm=isch`);
        const text = await response.text()
        const dom = await new JSDOM(text)
        var imgs = dom.window.document.querySelectorAll("img")
        
        const imgEmbed = new MessageEmbed()
            .setTitle(`${args.join(" ")}`)
            .setImage(imgs[1].src)
            .setColor("#00ff00")
        
            message.channel.send({ ephemeral: true, embeds: [imgEmbed] });
    })()
}

exports.name = "search"
exports.description = "Search for an image"
exports.usage = "search [image]"