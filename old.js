//Get the token and and bot prefix from config.json 
const config = require('./config.json');
const token = config.token;
const prefix = config.prefix;
//Load the discord.js library
const { Client, Intents, Interaction, Guild } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//Require fs to read and write files
const fs = require('fs');

//When the client is ready, run this code
client.on('ready', () => {
    console.log('Ready!');
    //Log to console the name of the client
    console.log(client.user.username);
});
//When a message is received, run this code
client.on('messageCreate', message => {
    //Check if the message starts with the prefix
    if (message.content.startsWith(prefix)) {
        //Get the command and the arguments
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        //Check if the command is ping
        if (command === 'ping') {
            //Send a message to the channel
            message.channel.send('Pong!');
        }

        //Check if the command is say
        if (command === 'say') {
            //Send a message to the channel
            message.channel.send(args.join(' '));
            //Delete the old message
            message.delete();
        }

        //Check if the command is kick
        if (command === 'kick') {
            //Get the member
            const member = message.mentions.members.first();
            //Check if the member exists
            if (!member) {
                //Send a message to the channel
                message.channel.send('Please mention a valid member of this server');
                return;
            }
            //Check if the member has the kick permission
            if (!member.kickable) {
                //Send a message to the channel
                message.channel.send('I cannot kick this user!');
                return;
            }
            //Kick the member
            member.kick();
            //Send a message to the channel
            message.channel.send(`${member.user.tag} has been kicked`);
        }
        //Check if the command is ban
        if (command === 'ban') {
            //Get the member
            const member = message.mentions.members.first();
            //Check if the member exists
            if (!member) {
                //Send a message to the channel
                message.channel.send('Please mention a valid member of this server');
                return;
            }
            //Check if the member has the ban permission
            if (!member.bannable) {
                //Send a message to the channel
                message.channel.send('I cannot ban this user!');
                return;
            }
            //Ban the member
            member.ban();
            //Send a message to the channel
            message.channel.send(`${member.user.tag} has been banned`);
        }
        //Check if the command is purge
        if (command === 'purge') {
            //Get the amount of messages to purge
            const amount = parseInt(args[0]) + 1;
            //Check if the amount is valid
            if (isNaN(amount)) {
                //Send a message to the channel
                message.channel.send('Please indicate the number of messages to delete');
                return;
            }
            //Check if the amount is higher than 100
            if (amount > 100) {
                //Send a message to the channel
                message.channel.send('Please indicate a number lower than 100');
                return;
            }
            //Delete the messages
            message.channel.bulkDelete(amount, true);
        }
        //Check if the command is help
        if (command === 'help') {
            //Create a new embed
            const embed = new MessageEmbed()
                //Set the title
                .setTitle('Help')
                //Set the color
                .setColor(0x00AE86)
                //Set the description
                .setDescription('These are the commands you can use:')
                //Add a field
                .addFields(
                    { name: 'ping', value: 'Returns pong!' },
                    { name: 'say', value: 'Sends a message' },
                    { name: 'kick', value: 'Kicks a member' },
                    { name: 'ban', value: 'Bans a member' },
                    { name: 'purge', value: 'Deletes a number of messages' },
                    { name: 'help', value: 'Shows this message' },
                    //Warn command
                    { name: 'warn', value: 'Warns a member' },
                    //Get warns
                    { name: 'getwarns', value: 'Gets the warns of a member' },
                    //Clear warns
                    { name: 'clearwarns', value: 'Clears the warns of a member' },
                )

            //Send the embed
            message.channel.send({ephemeral: true, embeds: [embed]})
        }
        //Check if command is nickname
        if (command === 'nickname') {
            //Set the nickname of the bot
            message.guild.me.setNickname(args.join(' '))
            //Send a message to the channel
            message.channel.send('Nickname set!');
        }
        //Check if command is avatar
        if (command === 'avatar') {
            //Create an embed with the avatar of the user
            const embed = new MessageEmbed()
                .setTitle(message.author.username)
                .setImage(message.author.avatarURL())
                .setColor('#0099ff');

            //Send the embed to the channel
            message.channel.send({ephemeral: true, embeds: [embed]})

        }
        //Check if command is warn
        if (command === 'warn') {
            //Get the member
            const member = message.mentions.members.first();
            //Check if the member exists
            if (!member) {
                //Send a message to the channel
                message.channel.send('Please mention a valid member of this server');
                return;
            }
            
            //Check if there is a reason
            if (!args[1]) {
                //Send a message to the channel
                message.channel.send('Please indicate a reason for the warning');
                return;
            }

            //Shift the args
            args.shift();

            //Add the warn to the database
            const warn = {
                user: member.id,
                reason: args.join(' '),
                ID: generateID(),
                Guild: message.guild.id
            }

            //Read the warns.json file
            fs.readFile('./warns.json', 'utf8', (err, data) => {
                //Check if there is an error
                if (err) {
                    //Send a message to the channel
                    message.channel.send('An error occurred');
                    return;
                }
                //Parse the data
                const warnList = JSON.parse(data);
                //Push the warn to the warns array
                warnList.warns.push(warn);
                //Write the warns array to the warns.json file
                fs.writeFile('./warns.json', JSON.stringify(warnList), (err) => {
                    //Check if there is an error
                    if (err) {
                        //Send a message to the channel
                        message.channel.send('An error occurred');
                        return;
                    }
                    //Send a message to the channel with the warning reason
                    message.channel.send(`${member.user.tag} has been warned for ${warn.reason}`);
                });
            });         

            //Check if you can send a message to the user
            if (!member.user.bot) {
                //Create a new embed with the warn reason and guild name
                const embed = new MessageEmbed()
                    .setDescription(`You have been warned in ${message.guild.name} for ${warn.reason}`)
                    //Set color to red
                    .setColor('#ff0000');
                
                //Send the embed to the user
                member.user.send({ephemeral: true, embeds: [embed]})
            }

        }
        //Check if command is getwarns
        if (command === 'getwarns') {
            //Get the member
            const member = message.mentions.members.first();
            //Check if the member exists
            if (!member) {
                //Send a message to the channel
                message.channel.send('Please mention a valid member of this server');
                return;
            }
            //Read the warns.json file
            fs.readFile('./warns.json', 'utf8', (err, data) => {
                //Check if there is an error
                if (err) {
                    //Send a message to the channel
                    message.channel.send('An error occurred');
                    return;
                }
                //Parse the data
                const warnList = JSON.parse(data);
                //Get the warns of the user in this guild
                const warns = warnList.warns.filter(warn => warn.user === member.id && warn.Guild === message.guild.id);
                //Check if the user has any warns
                if (warns.length === 0) {
                    //Send a message to the channel
                    message.channel.send('This user has no warns');
                    return;
                }

                //Create an embed with the warns
                const embed = new MessageEmbed()
                    .setTitle(`${member.user.tag}'s warns`)
                    .setColor('#0099ff')
                    //Add a field for every warn
                    .addFields(
                        ...warns.map(warn => ({ name: `${warn.reason}`, value: `ID: ${warn.ID}` }))
                    )
                //Send the embed to the channel
                message.channel.send({ephemeral: true, embeds: [embed]});
            });
        }
        //Check if command is clearwarns
        if (command === 'clearwarns') {
            //Get the member
            const member = message.mentions.members.first();
            //Check if the member exists
            if (!member) {
                //Send a message to the channel
                message.channel.send('Please mention a valid member of this server');
                return;
            }
            //Read the warns.json file
            fs.readFile('./warns.json', 'utf8', (err, data) => {
                //Check if there is an error
                if (err) {
                    //Send a message to the channel
                    message.channel.send('An error occurred');
                    return;
                }
                //Parse the data
                const warnList = JSON.parse(data);
                //Get the warns of the user in this guild
                const warns = warnList.warns.filter(warn => warn.user === member.id && warn.Guild === message.guild.id);
                //Check if the user has any warns
                if (warns.length === 0) {
                    //Send a message to the channel
                    message.channel.send('This user has no warns');
                    return;
                }

                //Delete the warns
                warns.forEach(warn => warnList.warns.splice(warnList.warns.indexOf(warn), 1));
                //Write the warns array to the warns.json file
                fs.writeFile('./warns.json', JSON.stringify(warnList), (err) => {
                    //Check if there is an error
                    if (err) {
                        //Send a message to the channel
                        message.channel.send('An error occurred');
                        return;
                    }
                    //Send a message to the channel
                    message.channel.send('Warns deleted!');
                });
            });
        }
        //Check if the command is delwarn
        if (command === 'delwarn') {
            //Get the member
            const member = message.mentions.members.first();
            //Check if the member exists
            if (!member) {
                //Send a message to the channel
                message.channel.send('Please mention a valid member of this server');
                return;
            }
            //Check if there is a warn ID
            if (!args[1]) {
                //Send a message to the channel
                message.channel.send('Please indicate a warn ID');
                return;
            }
            //Read the warns.json file
            fs.readFile('./warns.json', 'utf8', (err, data) => {
                //Check if there is an error
                if (err) {
                    //Send a message to the channel
                    message.channel.send('An error occurred');
                    return;
                }
                //Parse the data
                const warnList = JSON.parse(data);
                //Get the warns of the user in this guild
                const warns = warnList.warns.filter(warn => warn.user === member.id && warn.Guild === message.guild.id);
                //Check if the user has any warns
                if (warns.length === 0) {
                    //Send a message to the channel
                    message.channel.send('This user has no warns');
                    return;
                }
                //Get the warn ID
                const ID = args[1];
                //Check if the warn ID is valid
                if (!warns.find(warn => warn.ID === ID)) {
                    //Send a message to the channel
                    message.channel.send('Please indicate a valid warn ID');
                    return;
                }
                //Delete the warn
                warnList.warns.splice(warnList.warns.indexOf(warns.find(warn => warn.ID === ID)), 1);
                //Write the warns array to the warns.json file
                fs.writeFile('./warns.json', JSON.stringify(warnList), (err) => {
                    //Check if there is an error
                    if (err) {
                        //Send a message to the channel
                        message.channel.send('An error occurred');
                        return;
                    }
                    //Send a message to the channel
                    message.channel.send('Warn deleted!');
                });
            });
        }


        //Check if command is userinfo
        if (command === 'userinfo') {
            //Get the member
            let member = message.mentions.members.first();
            //Check if the member exists
            if (!member) {
                //Set the member to the author
                member = message.member;
            }
            //Create an embed with the user info
            const embed = new MessageEmbed()
                .setTitle(`${member.user.tag}'s info`)
                .setThumbnail(member.user.avatarURL())
                .addField('ID', member.id)
                .addField('Joined at', member.joinedAt.toString())
                .addField('Created at', member.user.createdAt.toString())
                //Add the roles
                .addField('Roles', member.roles.cache.map(role => role.name).join(', '))
                .setColor('#0099ff');
            //Send the embed to the channel
            message.channel.send({ephemeral: true, embeds: [embed]});
        }
        //Check if command is serverinfo
        if (command === 'serverinfo') {
            //Create an embed with the server info
            const embed = new MessageEmbed()
                .setTitle(`${message.guild.name}'s info`)
                .setThumbnail(message.guild.iconURL())
                .addField('ID', message.guild.id)
                .addField('Created at', message.guild.createdAt.toString())
                .addField('Members', message.guild.memberCount.toString())
                .addField('Roles', message.guild.roles.cache.map(role => role.name).join(', '))
                .setColor('#0099ff');
            //Send the embed to the channel
            message.channel.send({ephemeral: true, embeds: [embed]});
        }
            
    }
});

//Generate a random ID
function generateID() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

//Login to Discord with your app's token
client.login(token);