exports.run = (client, message, args) => {
    //Check if this is the owner
    if(message.author.id !== "232966488439521282") return message.channel.send("You do not have permission to use this command!");

    //Shut down the bot and restart it
    console.log("Shutting Down");
    message.channel.send("Shutting down the bot").then(() => {
        client.destroy();
        process.exit(0);
    })
}

exports.name = "shutdown";
exports.description = "Shut down the bot, only usable by the owner";
exports.usage = "shutdown";
exports.aliases = ["shut"];