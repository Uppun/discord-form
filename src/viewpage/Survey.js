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
        const formOrder = FormOrderStore.getState();
        const formFields = FormStore.getState();

        return {
            order: formOrder.order,
            idToFieldsMap: formFields.idToFieldsMap
        };
    }

    componentDidMount() {
        const { formId } = this.props.match.params;
        middleware.getForm(formId).then(res => FormActions.loadForm(
            form.order,
            form.objects,
        ));
    }


    render() {
        const {order, idToFieldsMap} = this.state;
        return (
            <div className='survey-form'>
                <div className='survey-contents'>
                    <form>
                        {order.map(id => {
                            const element = idToFieldsMap.get(id);
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
                        })}
                    </form>
                </div>
            </div>
        )
    }
}

export default Container.create(Survey);