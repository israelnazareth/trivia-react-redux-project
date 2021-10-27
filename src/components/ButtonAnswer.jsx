import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import audioChoose from '../assets/sounds/sound_move-grid.mp3';
import './ButtonsAnswer.css';

class ButtonAnswer extends Component {
  constructor() {
    super();

    this.playAudio = this.playAudio.bind(this);
    this.stopAudio = this.stopAudio.bind(this);
  }

  playAudio() {
    new Audio(audioChoose).play();
  }

  stopAudio() {
    new Audio(audioChoose).pause();
  }

  render() {
    const { results, handleClick, btnDisable } = this.props;
    return (
      <ul>
        <button
          className="correct"
          type="button"
          data-testid="correct-answer"
          onClick={ handleClick }
          onMouseEnter={ this.playAudio }
          onMouseLeave={ this.stopAudio }
          disabled={ btnDisable }
        >
          {results.correct_answer}
        </button>
        { results.incorrect_answers.map((button, index) => (
          <button
            key={ index }
            className="wrong"
            type="button"
            data-testid={ `wrong-answer-${index}` }
            onClick={ handleClick }
            onMouseEnter={ this.playAudio }
            onMouseLeave={ this.stopAudio }
            disabled={ btnDisable }
          >
            { button }
          </button>
        ))}
      </ul>
    );
  }
}

ButtonAnswer.propTypes = {
  handleClick: PropTypes.func.isRequired,
  results: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  btnDisable: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  btnDisable: state.triviaReducer.btnDisable,
});

export default connect(mapStateToProps)(ButtonAnswer);
