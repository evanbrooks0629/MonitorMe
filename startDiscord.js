const Discord = require('discord.js');

const startDiscord = () => {

    const token = "ODI1NTQ1MjU5MDY0NDkyMDMz.YF_e7w.h_4SiIRrs8ezxwoPO9p_HZThkck";
    //const channelID = "820422259323699203";
    const client = new Discord.Client();
    
    client.once('ready', async () => {
        console.log('ready');
    });

    client.login(token);

}

module.exports.startDiscord = startDiscord;