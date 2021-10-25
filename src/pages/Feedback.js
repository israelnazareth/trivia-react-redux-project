import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Feedback extends Component {
  render() {
    const { history } = this.props;
    const getStorage = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = getStorage;
    const numberOfAssertions = 3;
    return (
      <div>
        <h1>Feedback Page</h1>
        { assertions >= numberOfAssertions
          ? <p data-testid="feedback-text">Mandou bem!</p>
          : <p data-testid="feedback-text">Podia ser melhor...</p> }
        <span>Você acertou: </span>
        <span data-testid="feedback-total-question">{assertions}</span>
        <span>Placar final: </span>
        <span data-testid="feedback-total-score">{ score }</span>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
