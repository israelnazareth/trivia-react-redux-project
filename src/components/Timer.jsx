import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveCounter } from '../redux/actions';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: 5,
    };

    /*     this.updateTimer = this.updateTimer.bind(this);
    this.setTimeState = this.setTimeState.bind(this); */
  }

  componentDidMount() {
    const oneSeg = 1000;
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, oneSeg);
  }

  componentDidUpdate(_, prevState) {
    const { saveTime } = this.props;
    const timeLimit = 0;
    if (prevState.timer === timeLimit) {
      saveTime(this.state);
      this.timerSetState();
    }
  }

  timerSetState() {
    this.setState({
      timer: 30,
    });
    clearInterval(this.intervalID);
  }

  render() {
    const { timer } = this.state;
    console.log(timer);
    return (
      <div>
        { timer }
      </div>
    );
  }
}

Timer.propTypes = {
  saveTime: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveTime: (data) => dispatch(saveCounter(data)),
});

export default connect(null, mapDispatchToProps)(Timer);
