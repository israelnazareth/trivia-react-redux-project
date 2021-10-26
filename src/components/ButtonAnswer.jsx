import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ButtonsAnswer.css';

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
        { results.incorrect_answers.map((button, index) => (
          <button
            key={ index }
            className="wrong"
            type="button"
            data-testid={ `wrong-answer-${index}` }
            onClick={ handleClick }
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
