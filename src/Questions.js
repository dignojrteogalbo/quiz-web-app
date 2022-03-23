import './questions.css';
import { Header, Grid, Segment } from 'semantic-ui-react'
import React, { Component } from 'react';
import _ from 'lodash';

const COLORS = ['red', 'yellow', 'green', 'blue'];

class Questions extends Component {
    constructor(props) {
        super(props);
        this.color = COLORS[props.number % 4];

        this.state = {
            value: props.value
        }
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value })
        this.props.setValue(e.target.value, (this.props.number - 1));
    }

    render() {
        return (
            <Segment>
                <Header as='h3' textAlign='left'>{this.props.number}. {this.props.question}</Header>
                <br />
                <Grid columns={Object.keys(this.props.responses).length}>
                    <Grid.Row color={this.color}>
                        {Object.keys(this.props.responses).map((key, i) =>
                            <Grid.Column key={i}>
                                <input
                                    defaultChecked={key === this.state.value}
                                    type="radio"
                                    id={`${this.props.number}${key}`}
                                    name={this.props.number}
                                    value={key}
                                    onChange={this.handleChange}
                                />
                                <br />
                                <label htmlFor={`${this.props.number}${key}`}>{this.props.responses[key]}</label>
                            </Grid.Column>
                        )}
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

export default Questions;