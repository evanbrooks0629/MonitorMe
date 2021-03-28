const axios = require('axios');
const cheerio = require('cheerio');
const Discord = require('discord.js');
const { parseMonitors } = require('./parseMonitors');
const { parseSites } = require('./parseSites');
const { updateMonitors } = require('./updateMonitors');

const monitorMe = async () => {
    let newMonitors = [];
    const monitors = parseMonitors();
    const sites = parseSites();
    let price = 0;
    const token = "token";
    const channelID = "channel id";
    const client = new Discord.Client();
    client.login(token);
    client.once('ready', async () => {
        for (let monitor of monitors.monitors) {
            if (monitor.isOn) {

                const websiteRaw = await axios.get(monitor.url);
                const $ = cheerio.load(websiteRaw.data);
                let website;

                for (let site of sites.sites) {
                    if (site.title === monitor.site) {
                        website = site;
                    }
                }
                
                if (website.text === "yes") {
                    price = $(website.selector).text();
                } else {
                    if (website.attr !== "") {
                        price = $(website.selector).attr(website.attr);
                    } 
                }

                if (price.includes("$")) {
                    price = price.split("$")[1];
                }
                if (price.includes(".")) {
                    price = price.split(".")[0];
                }

                monitor.curr = Number(price);

                if ((monitor.curr <= monitor.target && monitor.curr > 0) && !monitor.didDrop) {
                    monitor.didDrop = true;
                    console.log('price dropped')
                    client.channels.fetch(channelID)
                        .then(channel => {
                            const embedDroplist = new Discord.MessageEmbed()
                            .setColor('#F51857')
                            .setTitle('Price Drop!')
                            .setDescription('Your monitor ' + monitor.title + ' detected a price change!')
                            .addFields(
                                { name: '\u200B', value: '\u200B' },
                                { name: 'Site', value: monitor.site },
                                { name: 'Target Price', value: monitor.target },
                                { name: 'Current Price', value: monitor.curr },
                                { name: '\u200B', value: '\u200B' }
                            )
                            .setURL(monitor.url)
                            .setThumbnail('https://www.nicepng.com/png/detail/37-379453_png-file-svg-robot-face-cartoon.png')
                            .setTimestamp()
                                
                            channel.send(embedDroplist);
                        });
                }

            }
            newMonitors.push(monitor);
        }

        updateMonitors({"monitors": newMonitors});

    });

    return newMonitors;
    
}

module.exports.monitorMe = monitorMe;
