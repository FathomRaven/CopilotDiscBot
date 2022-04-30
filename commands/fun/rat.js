const usedCommand = new Set();

exports.run = (client, message, args) => {
    
    if(usedCommand.has(message.author.id)) return message.reply("You can only use this command once 5 seconds");

    for (let i = 0; i < 5; i++) {
        message.channel.send({files:["assets/rat.png"]});      
    }

    usedCommand.add(message.author.id);
    setTimeout(() => {
        usedCommand.delete(message.author.id);
    }, 5000);
}

exports.name = "rat"
exports.usage = "rat"
exports.description = "Rat"
exports.aliases = ["fatrat"]