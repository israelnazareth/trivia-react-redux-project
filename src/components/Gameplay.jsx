import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchTriviaQuestions } from '../services/TriviaAPI';

export default class Gameplay extends Component {
  constructor(props) {
    super(props);

  this.state = {
   results: {},
   controller: 0,
  }

    this.fechting = this.fechting.bind(this);
  }

  componentDidMount () {
    this.fechting();
  }

  async fechting() {
    const results = await fetchTriviaQuestions();
    // results.map((eachQuestion, i) => ({
    //   [i]: eachQuestion,
    // }));
    this.setState({
      results,
    })
  };

  render() {
    const { results, controller } = this.state;
    console.log(results[controller]);
    if (results.length >= 0 ) {
      return (
        <main>
          <h2 data-testid="question-category">{results[controller].category}</h2>
          <h3 data-testid="question-text">{results[controller].question}</h3>
          <ul>
            <button data-testid="correct-answer">{results[controller].correct_answer}</button>
            <button data-testid="wrong-answer-[0]">{results[controller].incorrect_answers[0]}</button>
            <button data-testid="wrong-answer-[1]">{results[controller].incorrect_answers[1]}</button>
            <button data-testid="wrong-answer-[2]">{results[controller].incorrect_answers[2]}</button>
          </ul>
        </main>
      )
    } 
    return <p>Loading...</p>
    }
  }
