import './App.css';
import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react'
import Quiz from './Quiz';
import quizzes from './quiz.json';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      quiz: 'ip-scale'
    }
  }

  quiz = quizzes['ip-scale'];

  changeQuiz = () => {
    console.log("yo");
    if (this.state.quiz === 'short') {
      this.setState({ quiz: 'ip-scale' });
      this.quiz = quizzes['ip-scale'];
    } else {
      this.setState({ quiz: 'short' });
      this.quiz = quizzes['short']
    }
  }

  render() {
    return (
      <div className="App">
        {/* <Button onClick={this.changeQuiz}>Change Quiz</Button> */}
        <Quiz key={this.state.quiz} quiz={quizzes[this.state.quiz]}/>
      </div>
    );
  }
}

export default App;
