import { Route, Switch } from 'react-router';

import React, { Component } from 'react';
import Login from '../pages/Login';
import Mainpage from '../pages/Mainpage';
import Settings from '../pages/Settings';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/settings" component={ Settings } />
        <Route path="/gameplay" component={ Mainpage } />
        <Route path="/" component={ Login } />
      </Switch>
    );
  }
}
