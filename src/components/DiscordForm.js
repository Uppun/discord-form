import React, { Component } from 'react';
import FormStore from '../stores/FormStore';
import FormOrderStore from '../stores/FormOrderStore';
import '../stores/ListenStore';
import {Container} from 'flux/utils';
import TitleObject from './Title';
import '../Assets/Forms.css';
import QuestionTypes from '../Assets/QuestionTypes';
import Question from './Question';
import FormActions from '../actions/FormActions';

class DiscordForm extends Component {

    static getStores() {
        return [FormStore, FormOrderStore];
    }
    
    static calculateState(prevState) {
        return {
            ...FormOrderStore.getState(),
            ...FormStore.getState(),
        };
    }

    handleClick = (event) => {
        const buttonClass = event.target.className;
        const { formId } = this.props;
        
        switch(buttonClass) {
            case 'add-short': {
                FormActions.addQuestion(QuestionTypes.SHORT, formId);
                break;
            }
            case 'add-paragraph': {
                FormActions.addQuestion(QuestionTypes.PARAGRAPH, formId);
                break;
            }
            case 'add-multi': {
                FormActions.addQuestion(QuestionTypes.MULTIPLE_CHOICE, formId);
                break;
            }
            case 'add-checkbox': {
                FormActions.addQuestion(QuestionTypes.CHECKBOX, formId);
                break;
            }
            case 'add-dropdown': {
                FormActions.addQuestion(QuestionTypes.DROPDOWN, formId);
                break;
            }
            case 'add-title': {
                FormActions.addTitle(formId);
            }
            default: {
                break;
            }
        }
    }

    render() {
        const {order, idToFieldsMap, name} = this.state;
        const {formId}= this.props;
        return(
            <div className='form'>
                <div className='header'>
                    {name}
                </div>
                <div className='button-panel-wrapper'>
                    <div className="button-panel">
                        <button className='add-short' onClick={this.handleClick}>Add Short</button>
                        <button className='add-paragraph' onClick={this.handleClick}>Add Paragraph</button>
                        <button className='add-multi' onClick={this.handleClick}>Add Multi</button>
                        <button className='add-checkbox' onClick={this.handleClick}>Add Checkbox</button>
                        <button className='add-dropdown' onClick={this.handleClick}>Add Dropdown</button>
                        <button className='add-title' onClick={this.handleClick}>Add Title</button>
                    </div>
                </div>
                <div className='form-contents'>
                    {order ? order.map((id) => {
                        const element = idToFieldsMap.get(id.toString());
                        switch(element.type) {
                            case QuestionTypes.TITLE: {
                                return <TitleObject key={id} id={id} title={element.title} description={element.description} formId={formId} />
                            }
                            case QuestionTypes.SHORT || QuestionTypes.PARAGRAPH: {
                                return <Question 
                                    key={id} 
                                    id={id} 
                                    question={element.question} 
                                    format={element.type} 
                                    formId={formId}
                                    required={element.required} 
                                />
                            }
                            case QuestionTypes.PARAGRAPH: {
                                return <Question 
                                    key={id} 
                                    id={id} 
                                    question={element.question} 
                                    format={element.type} 
                                    formId={formId}
                                    required={element.required} 
                                />
                            }
                            case QuestionTypes.MULTIPLE_CHOICE: {
                                return <Question 
                                    key={id} 
                                    id={id} 
                                    question={element.question} 
                                    options={element.options} 
                                    otherNotSet={element.otherNotSet} 
                                    format={element.type} 
                                    formId={formId}
                                    required={element.required} 
                                />
                            }
                            case QuestionTypes.CHECKBOX: { 
                                return <Question 
                                    key={id} 
                                    id={id} 
                                    question={element.question} 
                                    options={element.options} 
                                    otherNotSet={element.otherNotSet} 
                                    format={element.type} 
                                    formId={formId}
                                    required={element.required} 
                                />
                            }
                            case QuestionTypes.DROPDOWN: {
                                return <Question 
                                    key={id} 
                                    id={id} 
                                    question={element.question} 
                                    options={element.options} 
                                    format={element.type} 
                                    formId={formId}
                                    required={element.required} 
                                />
                            }
                            default: {
                                return null;
                            }
                        }
                    })  :
                    null}
                </div>
            </div>
        )
    }
}

export default Container.create(DiscordForm);