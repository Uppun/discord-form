import React, { Component } from 'react';
import '../../../Assets/Forms.css';

export default class Paragraph extends Component {
    render() {
        return(
            <textarea className='survey-paragraph-entry' rows='10' cols='50' />
        )
    }
}