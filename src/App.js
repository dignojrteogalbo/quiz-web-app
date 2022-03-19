import './App.css';
import React, { Component } from 'react';
import { Button, Container, Divider, Header, Pagination } from 'semantic-ui-react'
import _ from 'lodash';
import Questions from './Questions';
import quizzes from './quiz.json';

const NUM_QUESTIONS_PER_PAGE = 4;
const quiz = quizzes["ip-scale"];

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      questions: this.pageQuestions[0],
      total: [undefined],
      sum: null
    }
  }

  pageQuestions = _.chunk(quiz.questions, NUM_QUESTIONS_PER_PAGE);

  onPageChange = (event, data) => {
    this.setState({
      page: data.activePage - 1,
      questions: this.pageQuestions[data.activePage - 1]
    });
    console.log(this.state);
  }

  setValue = (value, index) => {
    let totals = this.state.total;
    totals[index] = value;
    this.setState({ total: totals });
    this.setState({ sum: _.sum(this.state.total) });
  }

  changeQuiz = (e) => {
    if (quiz === quizzes["short"]) {
      this.setState({ quiz: quizzes['ip-scale'] });
    } else {
      this.setState({ quiz: quizzes['short'] });
    }
  }

  render() {
    return (
      <div className="App">
        <Header as='h2'>Clance Imposter Syndrome Scale</Header>
        {/* <Button circular onClick={this.changeQuiz}>Change Quiz</Button> */}
        <br />
        <Container text textAlign='center'>
          {this.state.questions.map((question, i) =>
            <Questions
              key={i + ((this.state.page) * NUM_QUESTIONS_PER_PAGE)}
              question={question}
              number={i + 1 + ((this.state.page) * NUM_QUESTIONS_PER_PAGE)}
              value={this.state.total[i + ((this.state.page) * NUM_QUESTIONS_PER_PAGE)]}
              responses={quiz["responses"]}
              setValue={this.setValue}
            />
          )}
          <br />
          <Pagination
            boundaryRange={0}
            defaultActivePage={1}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={Math.ceil(quiz["questions"].length / NUM_QUESTIONS_PER_PAGE)}
            onPageChange={this.onPageChange}
          />
          <br />
          <Divider />
          {(_.compact(this.state.total).length === quiz["questions"].length) &&
            <div>
              <Header as='h1'>
                Your score: {this.state.sum}
              </Header>
              <p>
                {(this.state.sum < 41) ? quiz["results"][0] : ""}
                {(this.state.sum >= 41 && this.state.sum <= 60) ? quiz["results"][1] : ""}
                {(this.state.sum >= 61 && this.state.sum <= 80) ? quiz["results"][2] : ""}
                {(this.state.sum > 80) ? quiz["results"][3] : ""}
              </p>
            </div>
          }
        <br />
        </Container>
      </div>
    );
  }
}

export default App;
