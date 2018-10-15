import React, { Component } from 'react';
import FormActions from '../actions/FormActions';
import * as Questions from './Questions';
import QuestionTypes from '../Assets/QuestionTypes'
import '../Assets/Forms.css';
import {debounce} from 'underscore';

export default class QuestionObject extends Component {
    questionRef = React.createRef();

    handleChange = debounce(() => {
        const {id, formId} = this.props;
        const questionVal = this.questionRef.current.value;

        FormActions.updateQuestion(id, questionVal, formId);
    }, 2000)

    render() {
        const {format, question, id, formId} = this.props;
        let questionAnswers;
        switch(format) {
            case QuestionTypes.MULTIPLE_CHOICE: {
                questionAnswers = <Questions.MultipleChoice options={this.props.options} otherNotSet={this.props.otherNotSet} id={id} formId={formId} />
                break;
            }
            case QuestionTypes.CHECKBOX: {
                questionAnswers = <Questions.CheckBox options={this.props.options} otherNotSet={this.props.otherNotSet} id={id} formId={formId} />
                break;
            }
            case QuestionTypes.DROPDOWN: {
                questionAnswers = <Questions.DropDown options={this.props.options} id={id} formId={formId} />
                break;
            }
            case QuestionTypes.PARAGRAPH: {
                questionAnswers = <Questions.Paragraph id={id} formId={formId} />
                break;
            }
            default: {
                questionAnswers = <Questions.ShortAnswer id={id} formId={formId} />
            }
        }
        return (
            <div className='question-object'>
                <input type='text' ref={this.questionRef} className='question-entry' defaultValue={question} onChange={this.handleChange} />
                <span className='bar' />
                <div className='question-answers'>
                    {questionAnswers}
                </div>
            </div>
        )
    }
}