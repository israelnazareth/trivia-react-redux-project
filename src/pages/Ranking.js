import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Ranking.css';

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
    const objRanking = this.recoverStorageData();
    objRanking.sort((a, b) => b.score - a.score);
    const ranking = objRanking.map((eachObj, i) => (
      <tr key={ i }>
        <td><img src={ eachObj.picture } alt={ eachObj.name } /></td>
        <td data-testid={ `player-name-${i} ` }>{eachObj.name}</td>
        <td data-testid={ `player-score-${i}` }>{eachObj.score}</td>
      </tr>));
    return (
      <div className="container-section">
        <h1 className="ranking-title" data-testid="ranking-title">Ranking</h1>
        <table>
          <tbody>
            { ranking }
          </tbody>
        </table>
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
