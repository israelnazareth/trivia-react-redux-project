import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Feedback.css';

import { connect } from 'react-redux';
import { resetGame } from '../redux/actions';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.resetGameAndRedirectToHome = this.resetGameAndRedirectToHome.bind(this);
    this.resetGameAndRedirectToRanking = this.resetGameAndRedirectToRanking.bind(this);
  }

  resetGameAndRedirectToHome() {
    const { dispatchResetGame, history } = this.props;
    dispatchResetGame();
    history.push('/');
  }

  resetGameAndRedirectToRanking() {
    const { dispatchResetGame, history } = this.props;
    dispatchResetGame();
    history.push('/ranking');
  }

  render() {
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
          : <h3 className="phrase" data-testid="feedback-text">Podia ser melhor...</h3> }
        <section className="score-section">
          <span>Você acertou: </span>
          <p data-testid="feedback-total-question">{assertions}</p>
          <span>Placar final: </span>
          <p data-testid="feedback-total-score">{ score }</p>
        </section>
        <div>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.resetGameAndRedirectToHome }
          >
            Jogar novamente
          </button>
          <button
            className="btn-align"
            type="button"
            data-testid="btn-ranking"
            onClick={ this.resetGameAndRedirectToRanking }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  dispatchResetGame: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchResetGame: () => dispatch(resetGame()),
});

export default connect(null, mapDispatchToProps)(Feedback);
