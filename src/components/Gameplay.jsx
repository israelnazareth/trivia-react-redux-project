import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { fetchTriviaQuestions } from '../services/TriviaAPI';
import Timer from './Timer';

class Gameplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: {},
      controller: 0,
    };

    this.fechting = this.fechting.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.disableButton = this.disableButton.bind(this);
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

  handleClick() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      if (button.className === 'correct') {
        button.style.border = '3px solid rgb(6, 240, 15)';
      } else {
        button.style.border = '3px solid rgb(255, 0, 0)';
      }
    });
  }

  render() {
    const { timer } = this.props;
    const { results, controller } = this.state;
    const nullNumber = -1;
    if (results.length > nullNumber) {
      return (
        <main>
          <h2 data-testid="question-category">{results[controller].category}</h2>
          <h3 data-testid="question-text">{results[controller].question}</h3>
          <ul>
            <button
              className="correct"
              type="button"
              data-testid="correct-answer"
              onClick={ this.handleClick }
              disabled={ timer === 0 ? true : '' }
            >
              {results[controller].correct_answer}
            </button>
            <button
              className="wrong"
              type="button"
              data-testid="wrong-answer-[0]"
              onClick={ this.handleClick }
              disabled={ timer === 0 ? true : '' }
            >
              {results[controller].incorrect_answers[0]}
            </button>
            <button
              className="wrong"
              type="button"
              data-testid="wrong-answer-[1]"
              onClick={ this.handleClick }
              disabled={ timer === 0 ? true : '' }
            >
              {results[controller].incorrect_answers[1]}
            </button>
            <button
              className="wrong"
              type="button"
              data-testid="wrong-answer-[2]"
              onClick={ this.handleClick }
              disabled={ timer === 0 ? true : '' }
            >
              {results[controller].incorrect_answers[2]}
            </button>
          </ul>
          <Timer />
        </main>
      );
    }
    return <p>Loading...</p>;
  }
}

Gameplay.propTypes = {
  timer: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.triviaReducer.timer,
});

export default connect(mapStateToProps)(Gameplay);
