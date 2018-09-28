import React, { Component } from 'react';
import FormActions from '../actions/FormActions';
import QuestionTypes from '../Assets/QuestionTypes';

export default class ShortQuestionObject extends Component {
    questionRef = React.createRef();
    render() {
        const {form, title} = this.props;
        return (
            <div className='short-question-object'>
                <input type='text' ref={this.titleRef} className='question-entry' defaultValue={question} onChange={this.handleQuestionChange} />
            </div>
        )
    }
}