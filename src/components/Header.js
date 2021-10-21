import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, name, url } = this.props;
    console.log(name, email, url);
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ url }
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
  email: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  email: state.userReducer.email,
  url: state.userReducer.url,
});

export default connect(mapStateToProps)(Header);
