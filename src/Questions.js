import './questions.css';
import { Container, Divider, Header, Grid, Button, Input } from 'semantic-ui-react'
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
        this.value = props.value;
    }

    handleChange = (e) => {
        this.props.setValue(parseInt(e.target.value), (this.number - 1));
    }

    render() {
        return (
            <Container text>
                <Header as='h3'>{this.number}. {this.question}</Header>
                <Grid columns={this.responses.length}>
                <Grid.Row 
                    relaxed
                    color={this.color}
                >
                    {this.responses.map((response, i) =>
                        <Grid.Column key={i} textAlign='center'>
                            <Input
                                defaultChecked={i === this.value - 1}
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
                <Divider />
            </Container>
        );
    }
}

export default Questions;