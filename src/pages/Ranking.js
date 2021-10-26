import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.recoverStorageData = this.recoverStorageData.bind(this);
  }

  recoverStorageData() {
    const dataRecovered = JSON.parse(localStorage.getItem('ranking'));
    return dataRecovered;
  }

  render() {
    const { history } = this.props;
    console.log(this.recoverStorageData());
    return (
      <div>
        <h1 data-testid="ranking-title">RankingPage</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Voltar ao início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
