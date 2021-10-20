import { Route, Switch } from 'react-router';

import React, { Component } from 'react';
import Login from '../pages/Login';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={ Login } />
      </Switch>
    );
  }
}
