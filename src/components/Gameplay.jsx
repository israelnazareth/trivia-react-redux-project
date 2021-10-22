import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTriviaQuestions } from '../services/TriviaAPI';
import ButtonAnswer from './ButtonAnswer';
import Timer from './Timer';

class Gameplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: {},
      controller: 0,
    };

    this.fechting = this.fechting.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fechting();
  }

  async fechting() {
    const results = await fetchTriviaQuestions();
    this.setState({
      results,
    });
  }

  handleClick() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      if (button.className === 'correct') {
        button.style.border = '3px solid rgb(6, 240, 15)';
      } else {
        button.style.border = '3px solid rgb(255, 0, 0)';
      }
    });
  }

  render() {
    const { results, controller } = this.state;
    const nullNumber = -1;
    if (results.length > nullNumber) {
      return (
        <main>
          <h2 data-testid="question-category">{results[controller].category}</h2>
          <h3 data-testid="question-text">{results[controller].question}</h3>
          <ButtonAnswer
            handleClick={ this.handleClick }
            results={ results[controller] }
          />
          <Timer />
        </main>
      );
    }
    return <p>Loading...</p>;
  }
}

export default connect(null)(Gameplay);
