import { Input, Button, Grid} from "@mui/material";
import React, { Component } from "react";
import Typography from '@mui/material/Typography';


export default class App extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };

  render() {
    return (
      <div className="App" align='center' style={{backgroundImage: `url(${"https://wallpaperaccess.com/full/3760638.jpg"})`,height: '100vh' }}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <form className="form" style={{backgroundColor: '#eee9e9', width: 400, height: 300, borderRadius:20}}>
          <Grid container spacing={2} align="center" sx={{ borderColor: 'grey.500' }}>
            <Grid item xs={16}>
            <Typography variant="h4" gutterBottom component="div" align="center">
                ADMIN LOGIN
            </Typography>
            </Grid>
            <Grid item xs={16}>
              <Input
                labelText="Email"
                id="email"
                formControlProps={{
                  fullWidth: true
                }}
                handleChange={this.handleChange}
                type="text"
              />
            </Grid>
            <Grid item xs={16}>
              <Input
              labelText="Password"
              id="password"
              formControlProps={{
                fullWidth: true
              }}
              handleChange={this.handleChange}
              type="password"
              />
            </Grid>
  
            <Grid item xs={16}>
              <Button>
                Log in
              </Button>
            </Grid>
          </Grid>
          
        </form>
      </div>
    );
  }
}