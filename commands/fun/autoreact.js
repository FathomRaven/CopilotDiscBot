exports.run = (client, message, args) => {
    //Set the member to the author of the message
    let member = message.member;

    if(!args[0])
    {
        client.autoreacts.delete(member.id);
        return message.channel.send(`Autoreact removed!`);
    }

    //Get the emoji argument
    let emoji = args[0];
    //If the emoji is not valid, check for an id
    if (!emoji) {
        //Get the emoji
        emoji = message.guild.emojis.cache.get(args[0]);
        if (!emoji) {
            emoji = message.guild.emojis.cache.find(emoji => emoji.name === args[0]);
            if(!emoji)
            {
                //If the emoji is not valid, return an error
                return message.channel.send(`${message.author}, the emoji you entered is not valid.`);
            }
        }
    }

    //Add the emoji to the autoreacts map
    client.autoreacts.set(member.id, emoji);
    //Send a message to the channel
    message.channel.send(`${member.user.username} will be reacted to with ${emoji}`);

    //Try to react to the message with the emoji, if it fails, remove the emoji from the autoreacts map and send an error
    message.react(emoji).catch(() => {
        client.autoreacts.delete(member.id);
        return message.channel.send(`${message.author}, the emoji you entered is not valid.`);
    });

    //In 10 minutes, remove the autoreact
    setTimeout(() => {
        client.autoreacts.delete(member.id);
        message.author.send(`${message.author}, your autoreact ${emoji} has expired.`).catch(err => {
            //If there is an error send a message
            console.log("Was unable to DM user " + message.author.username + " with the autoreact expiration message.");
        });
    }, 1000 * 60 * 60);

}

exports.name = "autoreact";
exports.description = "Set to automatically react to a users message for an hour, use the command without arguments to remove the autoreact";
exports.usage = "autoreact [emoji]";
exports.aliases = ["ar", "react"];