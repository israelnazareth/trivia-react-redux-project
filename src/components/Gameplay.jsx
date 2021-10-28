import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTriviaQuestions } from '../services/TriviaAPI';
import encodeUtf8 from '../services/utf8';
import ButtonAnswer from './ButtonAnswer';
import Timer from './Timer';
import { stopInterval, nextQuestion, disableButton } from '../redux/actions';
import './Gameplay.css';
import ProgressBar from './ProgressBar';
import audioClick from '../assets/sounds/sound_selected_sf2.mp3';

class Gameplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: {},
      controller: 0,
    };

    this.fechting = this.fechting.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.totalScore = this.totalScore.bind(this);
    this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.stopAudio = this.stopAudio.bind(this);
  }

  componentDidMount() {
    this.fechting();
  }

  playAudio() {
    new Audio(audioClick).play();
  }

  stopAudio() {
    new Audio(audioClick).pause();
  }

  async fechting() {
    const results = await fetchTriviaQuestions();
    this.setState({
      results,
    });
  }

  handleClick({ target }) {
    this.playAudio();
    const buttons = document.querySelectorAll('button');
    const { dispatchStopInterval, name, gravatarEmail, dispatchDisableBtn } = this.props;
    buttons.forEach((button) => {
      button.disabled = true;
      if (button.className === 'correct') {
        button.style.border = '3px solid rgb(6, 240, 15)';
      } else {
        button.style.border = '3px solid rgb(255, 0, 0)';
      }
    });
    dispatchDisableBtn();
    dispatchStopInterval();
    const parcialScore = JSON.parse(localStorage.getItem('state'));
    let { score, assertions } = parcialScore.player;
    if (target.className === 'correct') {
      score += this.totalScore();
      assertions += 1;
    }
    localStorage.setItem('state', JSON.stringify({
      ...parcialScore,
      player: {
        name,
        score,
        assertions,
        gravatarEmail,
      } }));
  }

  handleNextButtonClick() {
    const { dispatchController } = this.props;
    const { controller } = this.state;
    const limitController = 4;
    const getScore = JSON.parse(localStorage.getItem('state'));
    const { player: { score } } = getScore;
    dispatchController(nextQuestion(score));
    if (controller < limitController) {
      this.setState((prevState) => ({
        controller: prevState.controller + 1,
      }));
    } else {
      const getRanking = JSON.parse(localStorage.getItem('ranking'));
      const getRankingLength = getRanking.length - 1;
      const actualGame = { ...getRanking[getRankingLength], score };
      getRanking.pop();
      localStorage.setItem('ranking', JSON.stringify([...getRanking, actualGame]));
    }
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.style.border = '';
      button.disabled = false;
    });
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
    const { results, controller } = this.state;
    const { stopTimer, timer, btnDisable } = this.props;
    const nullNumber = -1;
    if (results.length > nullNumber) {
      return (
        <main>
          <div className="text-container">
            <h2
              className="question-category"
              data-testid="question-category"
            >
              {encodeUtf8(results[controller].category)}
            </h2>
            <h3
              className="question-text"
              data-testid="question-text"
            >
              {encodeUtf8(results[controller].question)}
            </h3>
          </div>
          <ButtonAnswer
            handleClick={ this.handleClick }
            results={ results[controller] }
          />
          { !stopTimer ? <Timer /> : <ProgressBar percentage={ timer } /> }
          { btnDisable
            ? (
              <button
                className="next-question"
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
  dispatchController: PropTypes.func.isRequired,
  dispatchDisableBtn: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  stopTimer: PropTypes.bool.isRequired,
  btnDisable: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchStopInterval: () => dispatch(stopInterval()),
  dispatchController: (data) => dispatch(nextQuestion(data)),
  dispatchDisableBtn: () => dispatch(disableButton()),
});

const mapStateToProps = (state) => ({
  stopTimer: state.triviaReducer.counterStoped,
  timer: state.triviaReducer.timer,
  name: state.userReducer.name,
  gravatarEmail: state.userReducer.email,
  controller: state.triviaReducer.globalController,
  btnDisable: state.triviaReducer.btnDisable,
});

export default connect(mapStateToProps, mapDispatchToProps)(Gameplay);
