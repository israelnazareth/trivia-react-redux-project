import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTriviaQuestions } from '../services/TriviaAPI';
import ButtonAnswer from './ButtonAnswer';
import Timer from './Timer';
import { stopInterval, restartTimer, nextQuestion } from '../redux/actions';

class Gameplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: {},
      controller: 0,
      showButton: false,
    };

    this.fechting = this.fechting.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.totalScore = this.totalScore.bind(this);
    this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
  }

  componentDidMount() {
    this.fechting();
  }

  async fechting() {
    const results = await fetchTriviaQuestions();
    this.setState({
      results,
    });
  }

  handleClick({ target }) {
    const buttons = document.querySelectorAll('button');
    const { dispatchStopInterval, name, gravatarEmail } = this.props;
    buttons.forEach((button) => {
      button.disabled = true;
      if (button.className === 'correct') {
        button.style.border = '3px solid rgb(6, 240, 15)';
      } else {
        button.style.border = '3px solid rgb(255, 0, 0)';
      }
    });
    dispatchStopInterval();
    const parcialScore = JSON.parse(localStorage.getItem('state'));
    let { score } = parcialScore.player;
    if (target.className === 'correct') {
      score += this.totalScore();
    }
    localStorage.setItem('state', JSON.stringify({
      player: {
        name,
        score,
        gravatarEmail,
      } }));
    this.setState({
      showButton: true,
    });
  }

  handleNextButtonClick() {
    const { dispatchRestartTimer, dispatchController } = this.props;
    const { controller } = this.state;
    const limitController = 4;
    dispatchController(nextQuestion());
    if (controller < limitController) {
      this.setState((prevState) => ({
        controller: prevState.controller + 1,
        showButton: false,
      }));
    }
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.style.border = '';
      button.disabled = false;
    });
    dispatchRestartTimer();
  }

  totalScore() {
    const { timer } = this.props;
    const { controller, results } = this.state;
    const difficult = results[controller].difficulty;
    const EASY = 1;
    const MEDIUM = 2;
    const HARD = 3;
    const TEN = 10;
    switch (difficult) {
    case 'easy':
      return TEN + (timer * EASY);
    case 'medium':
      return TEN + (timer * MEDIUM);
    default: return TEN + (timer * HARD);
    }
  }

  render() {
    const { results, controller, showButton } = this.state;
    const nullNumber = -1;
    if (results.length > nullNumber) {
      return (
        <main>
          <h2 data-testid="question-category">{results[controller].category}</h2>
          <h3 data-testid="question-text">{results[controller].question}</h3>
          <ButtonAnswer
            handleClick={ this.handleClick }
            results={ results[controller] }
          />
          <Timer />
          { showButton
            ? (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.handleNextButtonClick }
              >
                Próxima Pergunta
              </button>) : ''}
        </main>
      );
    }
    return <p>Loading...</p>;
  }
}

Gameplay.propTypes = {
  dispatchStopInterval: PropTypes.func.isRequired,
  dispatchRestartTimer: PropTypes.func.isRequired,
  dispatchController: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchStopInterval: () => dispatch(stopInterval()),
  dispatchRestartTimer: () => dispatch(restartTimer()),
  dispatchController: () => dispatch(nextQuestion()),
});

const mapStateToProps = (state) => ({
  timer: state.triviaReducer.timer,
  name: state.userReducer.name,
  gravatarEmail: state.userReducer.email,
  controller: state.triviaReducer.globalController,
});

export default connect(mapStateToProps, mapDispatchToProps)(Gameplay);
