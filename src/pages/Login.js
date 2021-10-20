import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUser } from '../redux/actions';
import fecthAPITriviaToken from '../services/TriviaAPI';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  disableButton() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      return false;
    }
    return true;
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { saveData, history } = this.props;
    saveData(this.state);
    history.push('/gameplay');
    const token = await fecthAPITriviaToken();
    localStorage.setItem('token', token);
  }

  render() {
    const { history } = this.props;
    const { name, email } = this.state;
    const disableFunction = this.disableButton();
    return (
      <>
        <main>
          <input
            type="text"
            data-testid="input-player-name"
            placeholder="Insira seu nome"
            value={ name }
            name="name"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            data-testid="input-gravatar-email"
            placeholder="Insira seu email"
            value={ email }
            name="email"
            onChange={ this.handleChange }
          />
          <button
            data-testid="btn-play"
            type="button"
            disabled={ disableFunction }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </main>
        <footer>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            Settings
          </button>
        </footer>
      </>
    );
  }
}

Login.propTypes = {
  saveData: PropTypes.func.isRequired,
  history: PropTypes.shape({
    history: PropTypes.string,
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveData: (data) => dispatch(saveUser(data)),
});

export default connect(null, mapDispatchToProps)(Login);
