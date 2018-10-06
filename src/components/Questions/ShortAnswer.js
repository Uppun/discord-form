import React, { Component } from 'react';
import '../../Assets/Forms.css';

export default class ShortAnswer extends Component {
    render() {
        return(
            <input type='text' className='short-answer-entry' value='Short answer text' disabled />
        )
    }
}