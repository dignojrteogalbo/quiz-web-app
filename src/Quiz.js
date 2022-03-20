import './Quiz.css';
import React, { Component } from 'react';
import { Container, Divider, Header, Pagination } from 'semantic-ui-react'
import _ from 'lodash';
import Questions from './Questions';

const NUM_QUESTIONS_PER_PAGE = 3;

class Quiz extends Component {
    constructor(props) {
        super(props)
        this.pageQuestions = _.chunk(props.quiz.questions, NUM_QUESTIONS_PER_PAGE);

        this.state = {
            quiz: props.quiz,
            page: 0,
            questions: this.pageQuestions[0],
            total: [undefined],
            sum: null
        }
    }

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
        this.setState({ 
            total: totals,
            sum: _.sum(this.state.total) 
        });
    }

    render() {
        return (
            <div className="Quiz">
                <Header as='h2'>{this.state.quiz.title}</Header>
                <br />
                <Container text textAlign='center'>
                    {this.state.questions.map((question, i) =>
                        <Questions
                            key={i + ((this.state.page) * NUM_QUESTIONS_PER_PAGE)}
                            question={question}
                            number={i + 1 + ((this.state.page) * NUM_QUESTIONS_PER_PAGE)}
                            value={this.state.total[i + ((this.state.page) * NUM_QUESTIONS_PER_PAGE)]}
                            responses={this.state.quiz["responses"][i + ((this.state.page) * NUM_QUESTIONS_PER_PAGE)] ?? this.state.quiz["responses"][0]}
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
                        totalPages={Math.ceil(this.state.quiz["questions"].length / NUM_QUESTIONS_PER_PAGE)}
                        onPageChange={this.onPageChange}
                    />
                    <br />
                    <Divider />
                    {(_.compact(this.state.total).length === this.state.quiz["questions"].length) &&
                        <div>
                            <Header as='h1'>
                                Your score: {this.state.sum}
                            </Header>
                            <p>
                                {_.inRange(this.state.sum, 0, 41) ? this.state.quiz["results"][0] : ""}
                                {_.inRange(this.state.sum, 41, 61) ? this.state.quiz["results"][1] : ""}
                                {_.inRange(this.state.sum, 61, 81) ? this.state.quiz["results"][2] : ""}
                                {_.inRange(this.state.sum, 81, 100) ? this.state.quiz["results"][3] : ""}
                            </p>
                        </div>
                    }
                    <br />
                </Container>
            </div>
        );
    }
}

export default Quiz;
