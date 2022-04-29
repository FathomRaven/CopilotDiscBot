exports.run = (client, message, args) => {
    message.channel.send("Pong!").catch(console.error);
    message.react("🏓");
}

exports.name = "ping";
exports.description = "Respond with pong!";
exports.usage = "ping";