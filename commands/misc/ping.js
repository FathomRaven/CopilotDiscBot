exports.run = (client, message, args) => {
    message.channel.send("pong!").catch(console.error);
}

exports.name = "ping";
exports.description = "Respond with pong!";
exports.usage = "ping";