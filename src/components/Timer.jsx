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
  }

  componentDidMount() {
    const { interval } = this.props;
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, interval);
  }

  componentDidUpdate(_, prevState) {
    const { saveTime, dispatchBtnDisable } = this.props;
    const timeLimit = 0;
    if (prevState.timer === timeLimit) {
      saveTime(this.state);
      this.timerSetState();
      dispatchBtnDisable(this.state);
    }
    saveTime(this.state);
  }

  timerSetState() {
    this.setState({
      timer: 30,
    });
    clearInterval(this.intervalID);
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
  interval: PropTypes.number.isRequired,
  dispatchBtnDisable: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveTime: (data) => dispatch(saveCounter(data)),
  dispatchBtnDisable: () => dispatch(disableButton()),
});

const mapStateToProps = (state) => ({
  interval: state.triviaReducer.interval,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
