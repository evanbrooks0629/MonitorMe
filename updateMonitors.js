const fs = require('fs');

const updateMonitors = monitors => {
    const jsonString = JSON.stringify(monitors);
    fs.writeFileSync('./client/src/monitors.json', jsonString, err => {
        if (err) {
            console.log("Error.");
        }
    });
}

module.exports.updateMonitors = updateMonitors;