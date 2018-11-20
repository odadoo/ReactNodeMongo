import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Login from '../containers/login';
import Register from '../containers/register';
import Dashboard from '../component/dashboard';
import AdminDashboard from '../component/adminDashboard';

class Container extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/admin-dashboard' component={AdminDashboard}/>
          {/* <PrivateRoute path="/protected" component={Protected} /> */}
          {/* <PrivateRoute path='/dashboard' component={Dashboard}/> */}

        </Switch>
      </div>
    );
  }
}

export default Container;