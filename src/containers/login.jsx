import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import './../css/register.css';
import Dashboard from '../component/dashboard';
import { Route } from 'react-router-dom';
import history from './../history';
import {Redirect} from 'react-router-dom';

class Login extends Component {

  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      redirect: false
    }
  }

  render() {

    if(this.state.redirect){
      return (<Redirect to={'/dashboard'} />)
    }
    if(localStorage.getItem('userData')){
      return (<Redirect to={'/dashboard'} />)
    }

    return (
      <MuiThemeProvider>
        <div className="forms-tabs">
          <AppBar title="Login" />
          
          <TextField className="textfield" hintText="Enter your Username" floatingLabelText="Username"
            onChange = {(event,newValue) => this.setState({username:newValue})} />
          <br/>
          
          <TextField className="textfield" type="password" hintText="Enter your Password" floatingLabelText="Password" 
            onChange = {(event,newValue) => this.setState({password:newValue})} />
          <br/>
          
          <button className="btn btn-default sub" onClick={(event) => this.handleClick(event)}>Login</button>
        </div>
      </MuiThemeProvider>
    );
  }

  handleClick = (event) => {
    var apiBaseUrl = "http://localhost:5000/api/";
    var self = this;
    var payload={
      "email":this.state.username,
      "password":this.state.password
    }
    axios.post(apiBaseUrl+'users/auth', payload)
      .then(function (response) {
        if(response.status == 200){
          if(response.data.userData.role ==0){
            //eslint-disable-next-line
            localStorage.setItem('userData', JSON.stringify(response.data));
            self.setState({ redirect: true });
            history.push('/dashboard');
          } else {
            localStorage.setItem('userData', JSON.stringify(response.data));
            self.setState({ redirect: true });
            history.push('/admin-dashboard');
          }
        }
      }).catch(function (error) {
        console.log(error);
      });
    }

}

const style = {
  margin: 15,
};

export default Login;