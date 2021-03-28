const fs = require('fs');

const parseMonitors = () => {
    const monitorsJSON = fs.readFileSync('./client/src/monitors.json');
    const monitors = JSON.parse(monitorsJSON);
    if (monitors) {
        return monitors;
    } else {
        return {"monitors" : []}
    }
    
}

module.exports.parseMonitors = parseMonitors;