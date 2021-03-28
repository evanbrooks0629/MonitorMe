const Discord = require('discord.js');

const startDiscord = () => {

    const token = "token ";
    const client = new Discord.Client();
    
    client.once('ready', async () => {
        console.log('ready');
    });

    client.login(token);

}

module.exports.startDiscord = startDiscord;
