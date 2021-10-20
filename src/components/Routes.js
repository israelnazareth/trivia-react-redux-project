import { Route, Switch } from 'react-router';

import React, { Component } from 'react';
import Login from '../pages/Login';
import Gameplay from '../pages/Gameplay';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/gameplay" component={ Gameplay } />
        <Route path="/" component={ Login } />
      </Switch>
    );
  }
}
