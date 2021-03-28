const fs = require('fs');

const updateSites = sites => {
    const jsonString = JSON.stringify(sites);
    fs.writeFileSync('./client/src/sites.json', jsonString, err => {
        if (err) {
            console.log("Error.");
        }
    });
}

module.exports.updateSites = updateSites;