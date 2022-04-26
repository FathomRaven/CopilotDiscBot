module.exports = (client) => {
    //Log to console that the bot is logged in as client.tag
    console.log(`Logged in as ${client.user.tag}!`);
    //Set the status of the bot to "online"
    client.user.setActivity(`${client.config.prefix}help | ${client.guilds.cache.size} servers`, { type: "WATCHING" });
}