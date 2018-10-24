import React, { Component } from 'react';
import '../../../Assets/Forms.css';

export default class ShortAnswer extends Component {
    render() {
        return(
            <input type='text' className='survey-short-answer-entry' name={this.props.id} />
        )
    }
}