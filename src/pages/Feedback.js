import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
          onClick={ this.resetGameAndRedirectToHome }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.resetGameAndRedirectToRanking }
        >
          Ranking
        </button>
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
