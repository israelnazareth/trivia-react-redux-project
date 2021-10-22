import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ButtonAnswer extends Component {
  render() {
    const { results, handleClick, btnDisable } = this.props;
    return (
      <ul>
        <button
          className="correct"
          type="button"
          data-testid="correct-answer"
          onClick={ handleClick }
          disabled={ btnDisable }
        >
          {results.correct_answer}
        </button>
        <button
          className="wrong"
          type="button"
          data-testid="wrong-answer-[0]"
          onClick={ handleClick }
          disabled={ btnDisable }
        >
          {results.incorrect_answers[0]}
        </button>
        <button
          className="wrong"
          type="button"
          data-testid="wrong-answer-[1]"
          onClick={ handleClick }
          disabled={ btnDisable }
        >
          {results.incorrect_answers[1]}
        </button>
        <button
          className="wrong"
          type="button"
          data-testid="wrong-answer-[2]"
          onClick={ handleClick }
          disabled={ btnDisable }
        >
          {results.incorrect_answers[2]}
        </button>
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
