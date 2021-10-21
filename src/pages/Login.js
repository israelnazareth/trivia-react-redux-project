import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUser } from '../redux/actions';
import fecthAPITriviaToken from '../services/TriviaAPI';
import fetchGravatarAPI from '../services/GravatarAPI';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      url: '',
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
    const { email } = this.state;
    const token = await fecthAPITriviaToken();
    const gravatar = await fetchGravatarAPI(email);
    this.setState({
      url: gravatar,
    });
    localStorage.setItem('token', token);
    saveData(this.state);
    history.push('/gameplay');
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
