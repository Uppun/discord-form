import React, { Component } from 'react';
import FormStore from '../stores/FormStore';
import FormOrderStore from '../stores/FormOrderStore';
import AnswerStore from '../stores/AnswerStore';
import {Container} from 'flux/utils';
import SurveyTitle from './SurveyTitle';
import SurveyQuestion from './Questions/SurveyQuestion';
import QuestionTypes from '../Assets/QuestionTypes';
import '../Assets/Forms.css';
import middleware from '../middleware';
import FormActions from '../actions/FormActions';

class Survey extends Component {
    state = {};
    static getStores() {
        return [FormStore, FormOrderStore, AnswerStore];
    }
    
    static calculateState(prevState) {
        return {
            ...prevState,
            ...FormOrderStore.getState(),
            ...FormStore.getState(),
            ...AnswerStore.getState(),
        };
    }

    componentDidMount() {
        const { formId } = this.props.match.params;
        middleware.getForm(formId).then(res => {
            this.setState({icon: res.userIcon, id: res.userId});
            FormActions.loadForm(
            res.doc.form.name,
            res.doc.form.date,
            res.doc.form.order,
            res.doc.form.objects,
        )}).catch(err => {
            window.location.href = `http://localhost:5000/login?id=${formId}&path=preview`;
        });
    }

    render() {
        const {order, idToFieldsMap, name, canSubmit, icon, id} = this.state;
        const submitUrl = `http://localhost:5000/results/${this.props.match.params.formId}`;

        return (
            <React.Fragment>
                <SurveyTopBar id={id} icon={icon} />
                <div className='content-wrapper'>
                    <div className='survey-form'>
                        <div className='header'>
                            {name}
                        </div>
                        <div className='survey-contents'>
                            <form action={submitUrl} method='post'>
                                <div className='survey-questions'>
                                    {order ? order.map(id => {
                                        const element = idToFieldsMap.get(id.toString());
                                        switch(element.type) {
                                            case QuestionTypes.TITLE: {
                                                return <SurveyTitle key={id} id={id} title={element.title} description={element.description} />
                                            }
                                            case QuestionTypes.SHORT || QuestionTypes.PARAGRAPH: {
                                                return <SurveyQuestion 
                                                    key={id} 
                                                    id={id} 
                                                    question={element.question} 
                                                    format={element.type}
                                                    required={element.required} 
                                                />
                                            }
                                            case QuestionTypes.PARAGRAPH: {
                                                return <SurveyQuestion 
                                                    key={id} 
                                                    id={id} 
                                                    question={element.question} 
                                                    format={element.type}
                                                    required={element.required}  
                                                />
                                            }
                                            case QuestionTypes.MULTIPLE_CHOICE: {
                                                return <SurveyQuestion 
                                                    key={id} 
                                                    id={id} 
                                                    question={element.question} 
                                                    options={element.options} 
                                                    otherNotSet={element.otherNotSet} 
                                                    format={element.type} 
                                                    required={element.required} 
                                                />
                                            }
                                            case QuestionTypes.CHECKBOX: { 
                                                return <SurveyQuestion 
                                                    key={id} 
                                                    id={id} 
                                                    question={element.question} 
                                                    options={element.options} 
                                                    otherNotSet={element.otherNotSet} 
                                                    format={element.type}
                                                    required={element.required} 
                                                />
                                            }
                                            case QuestionTypes.DROPDOWN: {
                                                return <SurveyQuestion 
                                                    key={id} 
                                                    id={id} 
                                                    question={element.question} 
                                                    options={element.options} 
                                                    format={element.type} 
                                                    required={element.required} 
                                                />
                                            }
                                            default: {
                                                return null;
                                            }
                                        }
                                    }) :
                                    null}
                                </div>
                                <div>
                                    {canSubmit ? <input className='submit-active' type='submit' value='Submit' /> : 
                                                <input className='submit-disabled' type='submit' value='Submit' disabled />
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

class SurveyTopBar extends Component {
    handleHomeClick = () => {
        window.location.href = `http://localhost:3000/`; 
    }

    render() {
        const {id, icon} = this.props;
        const imgSrc = `https://cdn.discordapp.com/avatars/${id}/${icon}.jpg`;
        return(
            <div className='survey-top-bar'>
                <div className='survey-top-bar-content'>
                    {id&&icon ? 
                        <img className='user-icon' src={imgSrc} alt='icon' /> :
                        null
                    }
                </div>
                <div className='home-button-content'>
                        <button className='home-button' onClick={this.handleHomeClick}>Home</button>
                </div>
            </div>
        )
    }
}

export default Container.create(Survey);