import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, avatar } = this.props;
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
        <span data-testid="header-score">Pontos: 0</span>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  avatar: state.userReducer.avatar,
});

export default connect(mapStateToProps)(Header);
