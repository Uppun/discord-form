import React, { Component } from 'react';
import FormActions from '../actions/FormActions';
import * as QuestionTypes from '../Assets/QuestionTypes/MultipleChoice';

export default class QuestionObject extends Component {
    questionRef = React.createRef();
    render() {
        const {form, title} = this.props;
        return (
            <div className='short-question-object'>
                <MultipleChoice />
            </div>
        )
    }
}