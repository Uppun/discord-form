import React, { Component } from 'react';
import FormActions from '../actions/FormActions';
import * as Questions from './Questions';
import QuestionTypes from '../Assets/QuestionTypes'

export default class QuestionObject extends Component {
    questionRef = React.createRef();

    handleChange = () => {
        const {id} = this.props;
        const questionVal = this.questionRefRef.current.value;

        FormActions.update_question(id, questionVal);
    }

    render() {
        const {format, question, id} = this.props;
        let questionAnswers;
        switch(format) {
            case QuestionTypes.MULTIPLE_CHOICE: {
                questionAnswers = <Questions.MultipleChoice options={this.props.options} otherNotSet={this.props.otherNotSet} id={this.props.id} />
                break;
            }
            case QuestionTypes.PARAGRAPH: {
                questionAnswers = <Questions.Paragraph id={this.props.id} />
                break;
            }
            default: {
                questionAnswers = <Questions.ShortAnswer id={this.props.id} />
            }
        }
        return (
            <div className='question-object'>
                <input type='text' ref={this.questionRef} className='question-entry' defaultValue={question} onChange={this.handleChange} />
                <div className='question-answers'>
                    {questionAnswers}
                </div>
            </div>
        )
    }
}