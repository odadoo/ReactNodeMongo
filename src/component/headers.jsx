import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/headers.css';
import history from '../history';

class Headers extends Component {
  constructor(props){
   super(props);
  }

  logout = () => {
    localStorage.setItem('userData', '');
    localStorage.clear();
    history.push('/login');
  }

  render() {

    const logofooter = require('./../images/aaaaaa.png');


    if(localStorage.getItem('userData')){
      // const result = JSON.parse(localStorage.getItem('userData'))
      // if(result.userData.role == 0){
        return(
          <div className="header">
            <div className="header">
              <img src={logofooter} width="150" height="50" />
              <div className="header-right">
                  <button className="btn btn-warning" onClick={this.logout}>Signout</button>
              </div>
            </div>
          </div>
        );
      // } else {
      //   return(
      //     <div className="header">
      //       <div className="header">
      //         <a href="#default" className="logo">CompanyLogo</a>
      //         <div className="header-right">
      //             <Link className="linkTags" to="/login">UserAll</Link>
      //             <button onClick={this.logout}>Signout</button>
      //         </div>
      //       </div>
      //     </div>
      //   );
      // }
    } else {
      return(
        <div className="header">
          <div className="header">
            <img src={logofooter} width="150" height="50" />
            <div className="header-right">
                <Link className="linkTags" to="/login">Login</Link>
                <Link className="linkTags" to="/register">Register</Link>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Headers;