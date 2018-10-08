import React, { Component } from 'react';
import FormStore from '../stores/FormStore';
import FormOrderStore from '../stores/FormOrderStore';
import {Container} from 'flux/utils';
import TitleObject from './Title';
import '../Assets/Forms.css';
import QuestionTypes from '../Assets/QuestionTypes';
import Question from './Question';
import FormActions from '../actions/FormActions';
import { Link } from 'react-router-dom';

class DiscordForm extends Component {
    static getStores() {
        return [FormStore, FormOrderStore];
    }
    
    static calculateState(prevState) {
        const formOrder = FormOrderStore.getState();
        const formFields = FormStore.getState();

        return {
            order: formOrder.order,
            idToFieldsMap: formFields.idToFieldsMap
        };
    }

    handleClick = (event) => {
        const buttonClass = event.target.className;
        console.log(buttonClass)
        
        switch(buttonClass) {
            case 'add-short': {
                FormActions.addQuestion(QuestionTypes.SHORT);
                break;
            }
            case 'add-paragraph': {
                FormActions.addQuestion(QuestionTypes.PARAGRAPH);
                break;
            }
            case 'add-multi': {
                FormActions.addQuestion(QuestionTypes.MULTIPLE_CHOICE);
                break;
            }
            case 'add-checkbox': {
                FormActions.addQuestion(QuestionTypes.CHECKBOX);
                break;
            }
            case 'add-dropdown': {
                FormActions.addQuestion(QuestionTypes.DROPDOWN);
                break;
            }
            default: {
                break;
            }
        }
    }

    render() {
        const {order, idToFieldsMap} = this.state;

        return(
            <div className='form'>
                <Link to="/preview" target="_blank">Preview</Link>
                <div className='form-contents'>
                    {order.map((id) => {
                        const element = idToFieldsMap.get(id);
                        switch(element.type) {
                            case QuestionTypes.TITLE: {
                                return <TitleObject key={id} id={id} title={element.title} description={element.description} />
                            }
                            case QuestionTypes.SHORT || QuestionTypes.PARAGRAPH: {
                                return <Question key={id} id={id} question={element.question} format={element.type} />
                            }
                            case QuestionTypes.PARAGRAPH: {
                                return <Question key={id} id={id} question={element.question} format={element.type} />
                            }
                            case QuestionTypes.MULTIPLE_CHOICE: {
                                return <Question key={id} id={id} question={element.question} options={element.options} otherNotSet={element.otherNotSet} format={element.type} />
                            }
                            case QuestionTypes.CHECKBOX: { 
                                return <Question key={id} id={id} question={element.question} options={element.options} otherNotSet={element.otherNotSet} format={element.type} />
                            }
                            case QuestionTypes.DROPDOWN: {
                                return <Question key={id} id={id} question={element.question} options={element.options} format={element.type} />
                            }
                            default: {
                                return null;
                            }
                        }
                    })}
                </div>
                <div className='button-panel-wrapper'>
                    <div className="button-panel">
                        <button className='add-short' onClick={this.handleClick}>Add Short</button>
                        <button className='add-paragraph' onClick={this.handleClick}>Add Paragraph</button>
                        <button className='add-multi' onClick={this.handleClick}>Add Multi</button>
                        <button className='add-checkbox' onClick={this.handleClick}>Add Checkbox</button>
                        <button className='add-dropdown' onClick={this.handleClick}>Add Dropdown</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Container.create(DiscordForm);