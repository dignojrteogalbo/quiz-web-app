import './App.css';
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import {
  getDoc,
  doc
} from '@firebase/firestore/lite';
import Quiz from './Quiz';
import quizzes from './quiz.json';
import firestore from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: quizzes['ip-scale']
    }
  }


  changeQuiz = () => {
    if (this.state.quiz === quizzes['short']) {
      this.setState({ quiz: quizzes['ip-scale'] });
    } else if (this.state.quiz === quizzes['ip-scale']) {
      const docRef = doc(firestore, "quizzes/new-quiz");
      getDoc(docRef).then((doc) => {
        if (doc.exists()) {
          const newQuiz = doc.data()
          this.setState({ quiz: newQuiz });
        } else {
          this.setState({ quiz: quizzes['short'] });
        }
      })
      .catch((error) => {
        console.log('Error getting document: ', error);
      });
    } else {
      this.setState({ quiz: quizzes['short'] });
    }
  }

  render() {
    return (
      <div className="App">
        <Button onClick={this.changeQuiz}>Change Quiz</Button>
        <br />
        <Quiz key={this.state.quiz['title']} quiz={this.state.quiz}/>
      </div>
    );
  }
}

export default App;
