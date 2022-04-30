const usedCommand = new Set();

exports.run = async (client, message, args) => {
    if(usedCommand.has(message.author.id)) return message.reply("You can only use this command once every second");
    
    //If there are mentions, set the member to the first mention
    let member = message.mentions.members.first();
    //If the member is not valid, check for an id
    if (!member) {
        //Get the member
        member = message.guild.members.cache.get(args[0]);
        if (!member) {
            member = message.member;
        }
    }

    await member.send("LUIGI TIME!").catch(err => {
        return message.channel.send("Could not send message to " + member.user.tag);
    });    

    message.channel.send("Deploying LUIGI...");

    usedCommand.add(message.author.id);
    setTimeout(() => {
        usedCommand.delete(message.author.id);
    }, 1000);

    for (let i = 0; i < gifs.length; i++) {
        const element = gifs[i];
        member.send(element).catch(err => {
            return;
        });    
    }
}

let gifs =
[
    "https://c.tenor.com/vZPqW9KdENUAAAAC/teteshrek-mario.gif",
    "https://c.tenor.com/4ycY8k4g_lIAAAAC/luigi-belly-wobble.gif",
    "https://c.tenor.com/BXTUUQlyc7YAAAAC/mario-kart-luigi.gif",
    "https://c.tenor.com/wlbk8FRvJgkAAAAC/luigi-dab.gif",
    "https://c.tenor.com/wbjorBeCUAMAAAAC/luigi-home.gif",
    "https://c.tenor.com/ZnNyFinDe9MAAAAC/luigi-luigi-whistle.gif",
    "https://c.tenor.com/iR3MzE06ToYAAAAC/dunking-luigi.gif",
    "https://c.tenor.com/mFxcE2A1nN0AAAAd/luigi-instant-sleeping.gif",
    "https://c.tenor.com/Qy2ftrUMX2AAAAAd/gmod-garry.gif",
    "https://c.tenor.com/zAQmbWFsawcAAAAC/se-murio-luigi.gif"

]

exports.name = "luigi";
exports.description = "Luigi";
exports.usage = "luigi [user]";