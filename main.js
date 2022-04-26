const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const config = require("./config.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;
client.commands = new Collection();
client.queue = new Map();

//Make a map of users and their autoreacts
client.autoreacts = new Map();

const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
}

const commands = fs.readdirSync("./commands");
for(const subdir of commands)
{
  const commandFiles = fs.readdirSync(`./commands/${subdir}`).filter(file => file.endsWith(".js"));
  for(const file of commandFiles)
  {
    const commandName = file.split(".")[0];
    const command = require(`./commands/${subdir}/${file}`);
    client.commands.set(commandName, command);
    //Add in the aliases of the command as well
    if(command.aliases)
    {
      for(const alias of command.aliases)
      {
        client.commands.set(alias, command);
      }
    }
  }
}

client.login(config.token);