import React, { Component } from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import { DeleteOutline, Timer, TimerOff } from '@material-ui/icons';

class Monitor extends Component {
    state = {
        didDrop: this.props.didDrop,
        curr: this.props.curr,
    }

    componentDidMount() {
        setInterval(e => {
            if ((Number(this.props.curr) !== 0) && (Number(this.props.curr) <= Number(this.props.target)) && this.props.isOn) {
                this.setState({ didDrop: true, curr: Number(this.props.curr) });
            } else if (!this.props.isOn) {
                this.setState({ curr: '-----' });
            } else {
                this.setState({ curr: Number(this.props.curr) })
            }
        }, 100);
    }

    render() {
        return (
            <Grid item xs={6} lg={3}>
                <Grid container style={{backgroundColor: "#161616", borderRadius: "25px", padding: "10px"}}>
                    <Grid xs={11}>
                    <Typography variant="h5" style={{textAlign: "left", color: "#F51857", paddingLeft: "20px"}}>{this.props.site}</Typography>
                    </Grid>
                    <Grid xs={1}>
                    <div style={{backgroundColor: this.props.color, height: "40px", width: "40px", borderRadius: "5px"}}></div>
                    </Grid>
                    
                    <Grid xs={12}><Typography variant="h6" style={{textAlign: "left", color: "#FFFFFF", paddingLeft: "20px"}}>{this.props.title}</Typography></Grid>
                    
                    <Grid xs={12}><div style={{height: "30px"}}></div></Grid>
                    
                    <Grid xs={12}><Typography variant="h6" style={{textAlign: "left", color: "#bdbdbd", paddingLeft: "20px"}}>Current Price: ${this.state.curr}</Typography></Grid>
                    <Grid xs={12}>
                        {this.state.didDrop ? <Typography variant="h6" style={{textAlign: "left", color: "#62bf45", paddingLeft: "20px"}}>Alert! Check Discord!</Typography> : <Typography variant="h6" style={{textAlign: "left", color: "#bdbdbd", paddingLeft: "20px"}}>Target Price: ${this.props.target}</Typography>}
                        
                    </Grid>
                
                    <Grid xs={12}><div style={{height: "30px"}}></div></Grid>

                    <Grid xs={8}>

                    {this.props.isOn ? <Typography variant="h6" style={{textAlign: "left", color: "#F51857", paddingLeft: "20px", paddingTop: "10px"}}>Status: On</Typography> 
                                     : <Typography variant="h6" style={{textAlign: "left", color: "#FFFFFF", paddingLeft: "20px", paddingTop: "10px"}}>Status: Off</Typography> }
                    
                    </Grid>

                    <Grid xs={2}>
                        <IconButton style={{color: "#f96120"}} component="span" onClick={() => this.props.handleDelete(this.props.title)}>
                            <DeleteOutline />
                        </IconButton>
                    </Grid>
                    <Grid xs={2}>
                        <IconButton style={{color: "#62bf45"}} component="span" onClick={() => this.props.handleStart(this.props.title, this.props.isOn)}>
                            {this.props.isOn ? <Timer /> : <TimerOff />}
                        </IconButton>
                        
                    </Grid>
                    
                </Grid>
            </Grid>
        );
    }

}

export default Monitor;