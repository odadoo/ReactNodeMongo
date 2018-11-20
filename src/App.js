import React, { Component } from 'react';
import { Router, Route, Link } from "react-router-dom";
//BrowserRouter as 

import Container from './component/container';
import Headers from './component/headers';
import './App.css';
import history from './history';

import { render } from "react-dom";
import { hasRole, isAllowed } from './auth';

const user = {
  roles: ['user'],
  rights: ['can_view_articles']
};

const admin = {
  roles: ['user', 'admin'],
  rights: ['can_view_articles', 'can_view_users']
};

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Headers />
          <Container />
        </div>
      </Router>
    );
  }
}

export default App;
