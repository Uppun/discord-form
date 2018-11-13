import React, { Component } from 'react';
import FormStore from '../stores/FormStore';
import FormOrderStore from '../stores/FormOrderStore';
import {Container} from 'flux/utils';
import SurveyTitle from './SurveyTitle';
import SurveyQuestion from './Questions/SurveyQuestion';
import QuestionTypes from '../Assets/QuestionTypes';
import '../Assets/Forms.css';
import middleware from '../middleware';
import FormActions from '../actions/FormActions';

class Survey extends Component {
    static getStores() {
        return [FormStore, FormOrderStore];
    }
    
    static calculateState(prevState) {
        return {
            ...FormOrderStore.getState(),
            ...FormStore.getState(),
        };
    }

    componentDidMount() {
        const { formId } = this.props.match.params;
        middleware.getForm(formId).then(res => FormActions.loadForm(
            res.form.name,
            res.form.order,
            res.form.objects,
        )).catch(err => {
            window.location.href = `http://localhost:5000/login?id=${this.props.match.params.formId}`;
        });
    }

    render() {
        const {order, idToFieldsMap, name} = this.state;
        const submitUrl = `http://localhost:5000/results/${this.props.match.params.formId}`;

        return (
            <div className='survey-form'>
                {name}
                <div className='survey-contents'>
                    <form action={submitUrl} method='post'>
                        {order ? order.map(id => {
                            const element = idToFieldsMap.get(id.toString());
                            switch(element.type) {
                                case QuestionTypes.TITLE: {
                                    return <SurveyTitle key={id} id={id} title={element.title} description={element.description} />
                                }
                                case QuestionTypes.SHORT || QuestionTypes.PARAGRAPH: {
                                    return <SurveyQuestion key={id} id={id} question={element.question} format={element.type} />
                                }
                                case QuestionTypes.PARAGRAPH: {
                                    return <SurveyQuestion key={id} id={id} question={element.question} format={element.type} />
                                }
                                case QuestionTypes.MULTIPLE_CHOICE: {
                                    return <SurveyQuestion key={id} id={id} question={element.question} options={element.options} otherNotSet={element.otherNotSet} format={element.type} />
                                }
                                case QuestionTypes.CHECKBOX: { 
                                    return <SurveyQuestion key={id} id={id} question={element.question} options={element.options} otherNotSet={element.otherNotSet} format={element.type} />
                                }
                                case QuestionTypes.DROPDOWN: {
                                    return <SurveyQuestion key={id} id={id} question={element.question} options={element.options} format={element.type} />
                                }
                                default: {
                                    return null;
                                }
                            }
                        }) :
                        null}
                        <div>
                            <input type='submit' value='Submit' />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Container.create(Survey);