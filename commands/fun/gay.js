//Import messageEmbed from discord.js
const { MessageEmbed } = require("discord.js");
exports.run = (client, message, args) => {
    user = message.mentions.users.first()
    if(client.users.cache.get(args[0]) != undefined)
      user = client.users.cache.get(args[0])
    if(!user)
      user = message.author
    {

    let gayValue = Math.floor(Math.random() * 101)

    statusbar = ""
    for(i = 0; i < gayValue / 10; i++)
        statusbar += "🟪"
    for(i = 0; i < (100 - gayValue) / 10; i++)
        statusbar += "⬛"
    const embed = new MessageEmbed()
    //Color is a fun color
    embed.setColor(0x00FF00)
    .setTitle(`Gay status`)
    .setThumbnail(user.avatarURL())
    //Add status bar as a field
    
    if(gayValue > 90)
    {
      embed.setColor('#ff6df5')
      embed.setDescription(`${user.username} is ${gayValue}% gay\n Wow, you're really gay\n ${statusbar}`)
    }
    else
    embed.setDescription(`${user.username} is ${gayValue}% gay\n ${statusbar}`)
    
    message.reply({ephemeral: true, embeds: [embed]})}
}

exports.name = "gay";
exports.description = "How gay are you?"
exports.usage = "gay [user]"
exports.aliases = ["howgay", "gaystatus"]