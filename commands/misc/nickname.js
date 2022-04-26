exports.run = (client, message, args) => {
    //Check length of nickname
    if (args.length < 1) return message.channel.send("Please provide a nickname");
    //Get the nickname
    let nickname = args.join(" ");
    //Check if the nickname is valid
    if (nickname.length > 32) return message.channel.send("Please provide a nickname shorter than 32 characters");
    //Set the bot nickname
    message.channel.send(`Setting nickname to ${nickname}`);
    //Set the bot nickname to args joined together
    message.guild.me.setNickname(nickname);
}

exports.name = "nickname";
exports.description = "Set the bot nickname";
exports.usage = "nickname <nickname>";
exports.aliases = ["nick"];