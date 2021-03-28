const fs = require('fs');

const parseSites = () => {
    const sitesJSON = fs.readFileSync('./client/src/sites.json');
    const sites = JSON.parse(sitesJSON);
    return sites;
}

module.exports.parseSites = parseSites;