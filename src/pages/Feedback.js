import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Feedback.css';

export default class Feedback extends Component {
  render() {
    const { history } = this.props;
    const getStorage = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = getStorage;
    const numberOfAssertions = 3;
    return (
      <div
        className="container-feedback"
      >
        <h1
          className="feedback-title"
        >
          Seu resultado
        </h1>
        { assertions >= numberOfAssertions
          ? <h2 className="phrase" data-testid="feedback-text">Mandou bem!</h2>
          : <h3 data-testid="feedback-text">Podia ser melhor...</h3> }
        <section className="score-section">
          <span>Você acertou: </span>
          <span data-testid="feedback-total-question">{assertions}</span>
          <span>Placar final: </span>
          <span data-testid="feedback-total-score">{ score }</span>
        </section>
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
