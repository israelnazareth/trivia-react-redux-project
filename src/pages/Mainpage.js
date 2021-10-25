import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Gameplay from '../components/Gameplay';
import Feedback from './Feedback';

class Mainpage extends Component {
  render() {
    const maxQuestion = 5;
    const { globalController, history } = this.props;
    return (
      <div>
        <Header />
        { (globalController < maxQuestion)
          ? <Gameplay /> : <Feedback history={ history } /> }
      </div>
    );
  }
}

Mainpage.propTypes = {
  globalController: PropTypes.number.isRequired,
  history: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  globalController: state.triviaReducer.globalController,
});

export default connect(mapStateToProps)(Mainpage);
