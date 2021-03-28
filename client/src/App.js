import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Typography, AppBar, Toolbar, TextField, Button, Select, MenuItem } from '@material-ui/core';
import Monitor from './monitorComponent';

import './App.css';

class App extends Component {
  
  state = {
    price: '',
    monitors: [],
    sites: [],
    addTitle: '',
    addSite: 'default',
    addUrl: '',
    addTarget: '',
    addSiteTitle: '',
    addSelector: '',
    addText: 'default',
    addAttr: '',
    addColor: ''
  };
  
  componentDidMount() {
    this.loginToDiscord();
    this.loadMonitors();
    this.loadSites();
    setInterval(e => {
      this.getData();
      this.loadMonitors();
      this.loadSites();
    }, 5000);
  }

  loginToDiscord = async () => {
    await axios.post('/api/discord', {"message": "start"});
  }

  loadMonitors = async () => {
    const response = await axios.get('/api/monitors');
    if (response.data.monitors) {
      this.setState({ monitors: response.data.monitors });
    }
  }

  updateMonitors = async monitors => {
    await axios.post('/api/updateMonitors', monitors);
  }

  updateSites = async sites => {
    await axios.post('/api/updateSites', sites);
  }

  loadSites = async () => {
    const response = await axios.get('/api/sites');
    if (response.data.sites) {
      this.setState({ sites: response.data.sites });
    }
  }

  getData = async () => {
    try {
      const response = await axios.get('/api/monitor');
      console.log(response);
      // if (response.data.monitors) {
      //   this.setState({ monitors: response.data.monitors[0].curr });
      // }
    } catch(e) {
      console.log(e.message);
    }
    
  }

  handleDelete = title => {
    let newMonitors = [];
    for (let monitor of this.state.monitors) {
      if (monitor.title !== title) {
        newMonitors.push(monitor);
      }
    }
    this.setState({monitors: newMonitors});
    this.updateMonitors({"monitors" : newMonitors});
  }

  handleStart = (title, isOn) => {
    let newMonitors = this.state.monitors;
    for (let monitor of newMonitors) {
      if (monitor.title === title) {
        monitor.isOn = !isOn;
      }
    }
    this.setState({ monitors: newMonitors });
    this.updateMonitors({"monitors" : this.state.monitors});
  }

  handleAdd = (e, attr) => {
    switch (attr) {
      case 'title':
        this.setState({addTitle: e.target.value});
        break;
      case "site":
        this.setState({addSite: e.target.value});
        break;
      case "url":
        this.setState({addUrl: e.target.value});
        break;
      case "target":
        this.setState({addTarget: Number(e.target.value)});
        break;
      default:
        break;
    }
  }

  addMonitor = () => {
    let newMonitors = this.state.monitors;
    newMonitors.push({
      title: this.state.addTitle,
      site: this.state.addSite,
      url: this.state.addUrl,
      target: this.state.addTarget,
      curr: 0,
      isOn: true
    });
    this.setState({monitors: newMonitors});
    this.setState({addTitle: ''});
    this.setState({addSite: 'default'});
    this.setState({addUrl: ''});
    this.setState({addTarget: ''});
    this.updateMonitors({"monitors" : this.state.monitors});
  }

  handleSite = (e, attr) => {
    switch(attr) {
      case "title":
        this.setState({addSiteTitle: e.target.value});
        break;
      case "selector":
        this.setState({addSelector: e.target.value});
        break;
      case "text":
        this.setState({addText: e.target.value});
        break;
      case "attr":
        this.setState({addAttr: e.target.value});
        break;
      case "color":
        this.setState({addColor: e.target.value});
        break;
      default:
        break;
    }
  }

  addSite = () => {
    let newSites = this.state.sites;
    newSites.push({
      title: this.state.addSiteTitle,
      selector: this.state.addSelector,
      text: this.state.addText,
      attr: this.state.addAttr,
      color: this.state.addColor
    });
    this.setState({sites: newSites});
    this.setState({addSiteTitle: ''});
    this.setState({addSelector: ''});
    this.setState({addText: 'default'});
    this.setState({addAttr: ''});
    this.setState({addColor: ''});
    this.updateSites({"sites": this.state.sites});
  }

  componentWillUnmount() {
    console.log('Unmounted');
  }
  
render() {

    return (
      <div className="App">
        <AppBar position="static" style={{backgroundColor: "#161616"}}>
          <Toolbar>
            <Typography variant="h6">
              MonitorMe
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3}>

            <Grid item xs={8}>

                <Grid item xs={12}>      

                    <Typography variant="h4" style={{color: "#FFFFFF", textAlign: "left", padding: "50px"}}>Active Monitors</Typography>
                
                </Grid>

                <Grid item xs={12}>


                      <Grid container spacing={3} style={{paddingLeft: "50px"}}>

                          
                          {this.state.monitors.map(monitor => {
                            let monitorColor = "";
                            for (let site of this.state.sites) {
                              if (site.title === monitor.site) {
                                monitorColor = site.color;
                              }
                            }
                            if (monitor.isOn) {
                              return <Monitor site={monitor.site} title={monitor.title} curr={monitor.curr} target={monitor.target} isOn={monitor.isOn} color={monitorColor} handleDelete={this.handleDelete} handleStart={this.handleStart} />
                            } else {
                              return "";
                            }
                          })}

                      </Grid>

                </Grid>

                <Grid item xs={12}>      

                    <Typography variant="h4" style={{color: "#FFFFFF", textAlign: "left", padding: "50px"}}>Silent Monitors</Typography>
                
                </Grid>

                <Grid item xs={12}>


                      <Grid container spacing={3} style={{paddingLeft: "50px"}}>

                          {this.state.monitors.map(monitor => {
                            let monitorColor = "";
                            for (let site of this.state.sites) {
                              if (site.title === monitor.site) {
                                monitorColor = site.color;
                              }
                            }
                            if (!monitor.isOn) {
                              return <Monitor site={monitor.site} title={monitor.title} curr={monitor.curr} target={monitor.target} isOn={monitor.isOn} color={monitorColor} handleDelete={this.handleDelete} handleStart={this.handleStart} />
                            } else {
                              return "";
                            }
                          })}

                      </Grid>

                </Grid>


            </Grid>


            <Grid item xs={4}>

                <Grid item xs={12}>      

                    <Typography variant="h4" style={{color: "#FFFFFF", textAlign: "left", padding: "50px"}}>Add a Monitor</Typography>

                </Grid>

                <Grid item xs={12}>      

                    <Grid container spacing={3} style={{paddingLeft: "50px", paddingRight: "50px"}}>

                      <Grid item xs={12}>
                        <Grid container style={{backgroundColor: "#9f9f9f", borderRadius: "25px", padding: "10px"}}>
                            

                            <Grid item xs={1} />
                            <Grid xs={10} style={{paddingTop: "5px", paddingBottom: "5px"}}><TextField variant="standard" color="secondary" label="Enter a title" fullWidth value={this.state.addTitle} onChange={(e) => this.handleAdd(e, 'title')}></TextField></Grid>
                            <Grid item xs={1} />

                            <Grid item xs={1} />
                            <Grid xs={10} style={{paddingTop: "20px", paddingBottom: "5px"}} >
                              <Select color="secondary" fullWidth value={this.state.addSite} style={{textAlign: "left"}} onChange={(e) => this.handleAdd(e, 'site')}>
                                <MenuItem value={"default"} disabled>Select a site</MenuItem>
                                {this.state.sites.map(site => {
                                  return <MenuItem value={site.title}>{site.title}</MenuItem>
                                })}
                              </Select>
                            </Grid>
                            <Grid item xs={1} />
                            
                            <Grid item xs={1} />
                            <Grid xs={10} style={{paddingTop: "5px", paddingBottom: "5px"}} ><TextField variant="standard" color="secondary" label="Enter a URL" fullWidth value={this.state.addUrl} onChange={(e) => this.handleAdd(e, 'url')}></TextField></Grid>
                            <Grid item xs={1} />
                            
                            <Grid item xs={1} />
                            <Grid xs={10} style={{paddingTop: "5px", paddingBottom: "25px"}} ><TextField variant="standard" color="secondary" label="Enter a target price" fullWidth value={this.state.addTarget} onChange={(e) => this.handleAdd(e, 'target')}></TextField></Grid>
                            <Grid item xs={1} />

                            <Grid item xs={4} />
                            <Grid item xs={4}>
                              <Button color="secondary" variant="contained" fullWidth onClick={this.addMonitor}>Add</Button>
                            </Grid>
                            <Grid item xs={4} />

                        </Grid>
                      </Grid>

                    </Grid>

                </Grid>

                <Grid item xs={12}>      

                    <Typography variant="h4" style={{color: "#FFFFFF", textAlign: "left", padding: "50px"}}>Add a Site</Typography>

                </Grid>   

                <Grid item xs={12}>      

                    <Grid container spacing={3} style={{paddingLeft: "50px", paddingRight: "50px"}}>

                      <Grid item xs={12}>
                        <Grid container style={{backgroundColor: "#9f9f9f", borderRadius: "25px", padding: "10px"}}>
                            
                            <Grid item xs={1} />
                            <Grid xs={10} style={{paddingTop: "5px", paddingBottom: "5px"}} ><TextField variant="standard" color="secondary" label="Enter a title" fullWidth value={this.state.addSiteTitle} onChange={(e) => this.handleSite(e, 'title')}></TextField></Grid>
                            <Grid item xs={1} />

                            <Grid item xs={1} />
                            <Grid xs={10} style={{paddingTop: "20px", paddingBottom: "5px"}} ><TextField variant="standard" color="secondary" label="Enter a selector" fullWidth value={this.state.addSelector} onChange={(e) => this.handleSite(e, 'selector')}></TextField></Grid>
                            <Grid item xs={1} />
                            
                            <Grid item xs={1} />
                            <Grid xs={10} style={{paddingTop: "20px", paddingBottom: "5px"}} >
                            <Select color="secondary" fullWidth value={this.state.addText} style={{textAlign: "left"}} onChange={(e) => this.handleSite(e, 'text')}>
                                <MenuItem value={"default"} disabled>Text Attribute</MenuItem>
                                <MenuItem value={"yes"}>Use text attribute</MenuItem>
                                <MenuItem value={"no"}>Use other attribute</MenuItem>
                              </Select>
                            </Grid>
                            <Grid item xs={1} />
                            
                            <Grid item xs={1} />
                            <Grid xs={10} style={{paddingTop: "5px", paddingBottom: "5px"}} ><TextField variant="standard" color="secondary" label="Other attribute" fullWidth value={this.state.addAttr} onChange={(e) => this.handleSite(e, 'attr')}></TextField></Grid>
                            <Grid item xs={1} />

                            <Grid item xs={1} />
                            <Grid xs={10} style={{paddingTop: "5px", paddingBottom: "25px"}} ><TextField variant="standard" color="secondary" label="Color" fullWidth value={this.state.addColor} onChange={(e) => this.handleSite(e, 'color')}></TextField></Grid>
                            <Grid item xs={1} />

                            <Grid item xs={4} />
                            <Grid item xs={4}>
                              <Button color="secondary" variant="contained" fullWidth onClick={this.addSite}>Add</Button>
                            </Grid>
                            <Grid item xs={4} />

                        </Grid>
                      </Grid>

                    </Grid>

                </Grid>

            </Grid>

        </Grid>

        <p>Price Value: {this.state.price}</p>
      </div>
    );
  }
}

export default App;