
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';


class Dashboard extends Component{
   
  constructor(props){
    super(props);
    this.state = {
      redirect: false
    }
  }

  componentWillMount() {
    if(localStorage.getItem('userData')){
      console.log("call user fees");
    }else{
      this.setState({redirect: true});
    }
  }

  render(){

    if(this.state.redirect){
      return (<Redirect to={'/login'} />)
    }

    return(
      <div>Hello Dashboard</div>
    );
  }
}

export default Dashboard;