import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, avatar, scoreUpdate } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ avatar }
          alt="imagem do jogador"
        />
        <br />
        <span data-testid="header-player-name">
          { 'Nome: ' }
          { name }
        </span>
        <br />
        <span>Pontos: </span>
        <span data-testid="header-score">
          {scoreUpdate}
        </span>
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
