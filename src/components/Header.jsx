import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  render() {
    const { name, avatar, scoreUpdate } = this.props;
    return (
      <header>
        <div className="header-container">
          <div>
            <img
              data-testid="header-profile-picture"
              src={ avatar }
              alt="imagem do jogador"
            />
            <br />
            <span
              className="header-player"
              data-testid="header-player-name"
            >
              { 'Nome: ' }
              { name }
            </span>
          </div>
          <br />
          <div className="header-score">
            <span>Pontos: </span>
            <span data-testid="header-score">
              {scoreUpdate}
            </span>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  scoreUpdate: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  avatar: state.userReducer.avatar,
  scoreUpdate: state.triviaReducer.score,
});

export default connect(mapStateToProps)(Header);
