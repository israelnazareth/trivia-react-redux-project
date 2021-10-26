import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveCounter, disableButton } from '../redux/actions';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: 30,
    };

    this.saveTimeClick = this.saveTimeClick.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  componentDidUpdate(_, prevState) {
    const { saveTime, dispatchBtnDisable } = this.props;
    const timeLimit = 0;
    if (prevState.timer === timeLimit) {
      saveTime(this.state);
      dispatchBtnDisable(this.state);
    }
  }

  componentWillUnmount() {
    this.saveTimeClick();
    clearInterval(this.intervalID);
  }

  saveTimeClick() {
    const { saveTime } = this.props;
    saveTime(this.state);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        { timer }
      </div>
    );
  }
}

Timer.propTypes = {
  saveTime: PropTypes.func.isRequired,
  dispatchBtnDisable: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveTime: (data) => dispatch(saveCounter(data)),
  dispatchBtnDisable: () => dispatch(disableButton()),
});

export default connect(null, mapDispatchToProps)(Timer);
