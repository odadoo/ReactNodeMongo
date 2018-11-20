import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import './../css/register.css';
import history from './../history';

class Register extends Component {
constructor(props){
	super(props);
	this.state={
		first_name:'',
		last_name:'',
		email:'',
		age: null,
		phoneNo: '', 
		password:'',
		role: 0
	}
}

render() {
	return (
		<MuiThemeProvider>
			<div className="forms-tabs">
				<AppBar title="Register"/>
				<TextField className="textfield" hintText="First Name" floatingLabelText="First Name"
					onChange = {(event, newValue) => this.setState({first_name:newValue})} />
				<br/>

				<TextField className="textfield" hintText="Last Name" floatingLabelText="Last Name"
					onChange = {(event, newValue) => this.setState({last_name:newValue})} />
				<br/>

				<TextField className="textfield" hintText="Email" type="email" floatingLabelText="Email"
					onChange = {(event, newValue) => this.setState({email:newValue})} />
				<br/>

				<TextField className="textfield" hintText="Age" type="age" floatingLabelText="Age"
					onChange = {(event, newValue) => this.setState({age:newValue})} />
				<br/>

				<TextField className="textfield" hintText="Phone No." type="phone" floatingLabelText="Phone"
					onChange = {(event, newValue) => this.setState({phoneNo:newValue})} />
				<br/>

				<TextField className="textfield" type = "password" hintText="Password" floatingLabelText="Password"
					onChange = {(event, newValue) => this.setState({password:newValue})} />
				<br/>

				<InputLabel htmlFor="age-native-simple">Role</InputLabel>
				<Select className="dropdown-btn" value={this.state.role} onChange={this.handleChange} inputProps={{ name: 'age', id: 'age-simple' }} disabled>
					<option value="" />
					<option value={1}>Admin</option>
					<option value={0}>User</option>
				</Select>
				<br/>

				<button className="btn btn-default sub" onClick={(event) => this.handleClick(event)}>Submit</button>
			</div>
		</MuiThemeProvider>
	);
}

handleClick(event){
	var apiBaseUrl = "http://localhost:5000/api/";
	console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
	var self = this;
	var payload={
		"firstName": this.state.first_name,
		"lastName":this.state.last_name,
		"email":this.state.email,
		"age":this.state.age,
		"phoneNo":this.state.phoneNo,
		"password":this.state.password,
		"role":this.state.role
	}
	this.state.first_name = '';
	this.state.last_name = '';
	this.state.email = '';
	this.state.age = '';
	this.state.phoneNo = '';
	this.state.password= ''
	axios.post(apiBaseUrl+'users', payload)
		.then(function (response) {
			if(response.status == 200){
				console.log("res code is 200");
				history.push('/login');
			}
		}).catch(function (error) {
			console.log(error);
		});
	}
}

const style = {
  margin: 15,
};

export default Register;