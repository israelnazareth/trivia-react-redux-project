import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import { saveUser } from '../redux/actions';
import { fecthAPITriviaToken } from '../services/TriviaAPI';
import fetchGravatarAPI from '../services/GravatarAPI';
import Logo from '../assets/img/trivia-logo.png';
import bgMusic from '../assets/sounds/sound_background-music.mp3';
import InputLoginPage from '../components/Login/InputLoginPage';
import BtnSettingsLoginPage from '../components/Login/BtnSettingsLoginPage';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      avatar: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setInitialLocalStorage = this.setInitialLocalStorage.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.redirectToPageSettings = this.redirectToPageSettings.bind(this);
  }

  componentDidMount() {
    this.setInitialLocalStorage();
  }

  setLocalStorage(email, name, gravatar) {
    localStorage.setItem('state', JSON.stringify({
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      } }));

    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    localStorage.setItem('ranking', JSON.stringify([...getRanking, {
      name,
      score: 0,
      picture: gravatar,
    }]));
  }

  setInitialLocalStorage() {
    if (localStorage.getItem('state') === null) {
      localStorage.setItem('state', JSON.stringify({
        player: {
          name: '',
          assertions: 0,
          score: 0,
          gravatarEmail: '',
        } }));
    }
    if (localStorage.getItem('ranking') === null) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
  }

  playAudio() {
    new Audio(bgMusic).play();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  disableButton() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      return false;
    }
    return true;
  }

  redirectToPageSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  async handleClick() {
    this.setInitialLocalStorage();
    const { saveData, history } = this.props;
    const { email, name } = this.state;
    const token = await fecthAPITriviaToken();
    const gravatar = await fetchGravatarAPI(email);
    this.setState({
      avatar: gravatar,
    });
    localStorage.setItem('token', token);
    saveData(this.state);
    history.push('/gameplay');
    this.setLocalStorage(email, name, gravatar);
  }

  render() {
    const { name, email } = this.state;
    const disableFunction = this.disableButton();
    return (
      <>
        <main>
          <img alt="Trivia Fighter" className="img-logo" src={ Logo } />
          <div className="container container-items">
            <InputLoginPage
              dataTestid="input-player-name"
              name="name"
              value={ name }
              handleChange={ this.handleChange }
            />
            <InputLoginPage
              dataTestid="input-gravatar-email"
              name="email"
              value={ email }
              handleChange={ this.handleChange }
            />
          </div>
        </main>
        <footer>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ disableFunction }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
          <BtnSettingsLoginPage redirect={ this.redirectToPageSettings } />
        </footer>
        <div className="player-login">
          <ReactAudioPlayer
            src={ bgMusic }
            autoPlay
            controls
            volume={ 0.20 }
          />
        </div>
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
