import React, { Component } from 'react';
import Header from '../components/Header';
import Gameplay from '../components/Gameplay';

class Mainpage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Gameplay />
      </div>
    );
  }
}

export default Mainpage;
