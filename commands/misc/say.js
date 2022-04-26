exports.run = (client, message, args) => {
    message.channel.send(args.join(" ")).catch(console.error);
    //Delete the message
    message.delete().catch(console.error);
}

exports.name = "say";
exports.description = "Make the bot say something";
exports.usage = "say <message>";
exports.aliases = ["echo", "speak"];