import './questions.css';
import { Header, Grid, Segment } from 'semantic-ui-react'
import React, { Component } from 'react';
import _ from 'lodash';

const COLORS = ['red', 'yellow', 'green', 'blue'];

class Questions extends Component {
    constructor(props) {
        super(props);
        this.color = COLORS[props.number % 4];
        this.question = props.question;
        this.number = props.number;
        this.responses = props.responses;

        this.state = {
            value: props.value
        }
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value })
        this.props.setValue(parseInt(e.target.value), (this.number - 1));
    }

    render() {
        return (
            <Segment>
                <Header as='h3' textAlign='left'>{this.number}. {this.question}</Header>
                <br />
                <Grid columns={this.responses.length}>
                    <Grid.Row color={this.color}>
                        {this.responses.map((response, i) =>
                            <Grid.Column key={i}>
                                <input
                                    defaultChecked={i === this.state.value - 1}
                                    type="radio" 
                                    id={`${this.number}${i}`}
                                    name={this.number} 
                                    value={i + 1} 
                                    onChange={this.handleChange}
                                />
                                <br />
                                <label htmlFor={`${this.number}${i}`}>{response}</label>
                            </Grid.Column>
                        )}
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

export default Questions;