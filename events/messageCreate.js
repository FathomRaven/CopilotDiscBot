module.exports = (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;
    
    //If the user has a autoreact, react with it
    if (client.autoreacts.has(message.author.id)) {
        message.react(client.autoreacts.get(message.author.id));
    }
    
    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(client.config.prefix) !== 0) return;
  
    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Grab the command data from the client.commands En-map
    const cmd = client.commands.get(command);
  
    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;
  
    // Run the command
    cmd.run(client, message, args);
};