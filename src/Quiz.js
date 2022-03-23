import './Quiz.css';
import React, { Component } from 'react';
import { Container, Divider, Header, Pagination } from 'semantic-ui-react'
import _, { max } from 'lodash';
import Questions from './Questions';

const NUM_QUESTIONS_PER_PAGE = 3;

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.pageQuestions = _.chunk(props.quiz["questions"], NUM_QUESTIONS_PER_PAGE);

        this.state = {
            page: 0,
            questions: this.pageQuestions[0],
            total: [],
            result: null
        }
    }

    calculateResult = () => {
        const final = _.compact(this.state.total);
        let counts = {};
        final.forEach(value => counts[value] = counts[value] ? counts[value] + 1 : 1);
        const maxKey = _.maxBy(Object.keys(counts), o => counts[o]);
        return maxKey;
    }

    onPageChange = (event, data) => {
        this.setState({
            page: data.activePage - 1,
            questions: this.pageQuestions[data.activePage - 1]
        });
    }

    setValue = (value, index) => {
        let totals = this.state.total;
        totals[index] = value;
        this.setState({ 
            total: totals
        });
        if (_.compact(this.state.total).length === this.props.quiz["questions"].length) {
            this.setState({ result: this.calculateResult() });
        }
    }

    render() {
        return (
            <div className="Quiz">
                <Header as='h2'>{this.props.quiz.title}</Header>
                <br />
                <Container text textAlign='center'>
                    {this.state.questions.map((question, i) =>
                        <Questions
                            key={i + ((this.state.page) * NUM_QUESTIONS_PER_PAGE)}
                            question={question}
                            number={i + 1 + ((this.state.page) * NUM_QUESTIONS_PER_PAGE)}
                            value={this.state.total[i + ((this.state.page) * NUM_QUESTIONS_PER_PAGE)]}
                            responses={this.props.quiz["responses"][i + ((this.state.page) * NUM_QUESTIONS_PER_PAGE)] ?? this.props.quiz["responses"][0]}
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
                        totalPages={Math.ceil(this.props.quiz["questions"].length / NUM_QUESTIONS_PER_PAGE)}
                        onPageChange={this.onPageChange}
                    />
                    <br />
                    <Divider />
                    {this.state.result &&
                        <div>
                            <Header as='h1'>
                                Your Result:<br />{this.state.result}
                            </Header>
                            <p>{this.props.quiz.results[this.state.result]}</p>
                        </div>
                    }
                    <br />
                </Container>
            </div>
        );
    }
}

export default Quiz;
