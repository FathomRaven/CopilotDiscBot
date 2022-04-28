exports.run = (client, message, args) => {
    
    for (let i = 0; i < 5; i++) {
        message.channel.send({files:["assets/rat.png"]});      
    }
}

exports.name = "rat"
exports.usage = "rat"
exports.description = "Rat"
exports.aliases = ["fatrat"]