import { Route, Switch } from 'react-router';
import React, { Component } from 'react';
import Login from '../pages/Login';
import Mainpage from '../pages/Mainpage';
import Settings from '../pages/Settings';
import Feedback from '../pages/Feedback';
import Ranking from '../pages/Ranking';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/settings" component={ Settings } />
        <Route path="/gameplay" component={ Mainpage } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/" component={ Login } />
      </Switch>
    );
  }
}
