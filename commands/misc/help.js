//Require fs
const fs = require("fs");
//Import messageEmbed from discord.js
const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {
    
    if(args.length == 0) {
        // Get the commands
        const commands = fs.readdirSync("./commands");
        // Create a new MessageEmbed
        const embed = new MessageEmbed()
            .setColor(0x00AE86)
            .setTitle("Module List")
            .setDescription(`Use **${client.config.prefix}help <modulename>** to get the commands in a module`)

        moduleList = "";
        // Loop through the commands
        for (const subdir of commands) {
            const commandFiles = fs.readdirSync(`./commands/${subdir}`).filter(file => file.endsWith(".js"));
            moduleList += `**${subdir.toUpperCase()}**\n`;

        }
        
        embed.addField('\u200b', moduleList);
        // Send the embed to the channel
        message.channel.send({ embeds: [embed] });
    }
    else {
        const modulename = args[0].toLowerCase();
        //Get all modules
        const modules = fs.readdirSync("./commands");
        //Check if the module exists
        if(!modules.includes(modulename))
        {
            //Check if the argument is a command
            if(client.commands.has(modulename))
            {
                //Get the command
                const command = client.commands.get(modulename);
                //Check if the command exists
                //Create an embed
                const embed = new MessageEmbed()
                    .setColor(0x00AE86)
                    .setTitle(`${command.name}`)
                    .setDescription(`${command.description}`)
                    .addField("Usage", `${command.usage}`)
                    .addField("Aliases", `${command.aliases.join(", ")}`)
                    .setTimestamp();
                //Send the embed
                return message.channel.send({ embeds: [embed] });
            }
            else
            {
                //Send an error message
                return message.channel.send("Module/command does not exist");
            }
        }
        
        // Get the commands
        const commands = fs.readdirSync(`./commands/${modulename}`);
        // Create a new MessageEmbed
        const embed = new MessageEmbed()
            .setColor(0x00AE86)
            .setTitle(`${modulename.toUpperCase()} Module`)
            .setDescription(`Use **${client.config.prefix}help <command-name>** to get more info about a command`)
            .setTimestamp()

        // Loop through the commands
        for (const file of commands) {
            const commandName = file.split(".")[0];
            const command = require(`../${modulename}/${file}`);
            // console.log(command);

            embed.addField(`${command.name}`, `${command.description}` + '\n' + `**Usage:**\n ${command.usage}`, true);
        }
        
        // Send the embed to the channel
        message.channel.send({ embeds: [embed] });
    }
}

exports.name = "help";
exports.description = "Shows all commands";
exports.usage = "help [module] | [command]";
exports.aliases = ["h", "commands", "cmds"];