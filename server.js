const express = require('express');
const bodyParser = require('body-parser');
const { monitorMe } = require('./monitor');
const { parseMonitors } = require('./parseMonitors');
const { parseSites } = require('./parseSites');
const { updateMonitors } = require('./updateMonitors');
const { updateSites } = require('./updateSites');
const { startDiscord } = require('./startDiscord');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/discord', (req, res) => {
    if (req.body.message === "start") {
        startDiscord();
    }
});

app.get('/api/monitor', (req, res) => {
    monitorMe()
    .then(response => {
        console.log(response);
        res.send({ monitors: response });
    })
    
});

app.post('/api/monitor', (req, res) => {
    res.send(req.body.monitors);
});

app.get('/api/monitors', (req, res) => {
    const monitors = parseMonitors();
    res.send({ monitors: monitors.monitors });
});

app.post('/api/monitors', (req, res) => {
    res.send(req.body.monitors);
});

app.get('/api/sites', (req, res) => {
    const sites = parseSites();
    res.send({ sites: sites.sites });
});

app.post('/api/sites', (req, res) => {
    res.send(req.body.sites);
})

app.post('/api/updateMonitors', (req, res) => {
    console.log(req.body);
    updateMonitors(req.body);
    res.send(req.body);
});

app.post('/api/updateSites', (req, res) => {
    console.log(req.body);
    updateSites(req.body);
    res.send(req.body);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

