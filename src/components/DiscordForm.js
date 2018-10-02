import React, { Component } from 'react';
import FormStore from '../stores/FormStore';
import FormOrderStore from '../stores/FormOrderStore';
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
        const formOrder = FormOrderStore.getState();
        const formFields = FormStore.getState();

        return {
            order: formOrder.order,
            idToFieldsMap: formFields.idToFieldsMap
        };
    }

    handleMultiClick = () => {
        FormActions.add_question(QuestionTypes.MULTIPLE_CHOICE);
    }

    render() {
        const {order, idToFieldsMap} = this.state;

        return(
            <div className='form'>
                <div className='form-contents'>
                    {order.map((id) => {
                        const element = idToFieldsMap.get(id);
                        if (element.type === QuestionTypes.TITLE) {
                            return <TitleObject key={id} id={id} title={element.title} description={element.description} />
                        } else if (element.type === QuestionTypes.MULTIPLE_CHOICE) {
                            return <Question key={id} id={id} question={element.question} options={element.options} otherNotSet={element.otherNotSet} format={element.type} />
                        }
                    })}
                </div>
                <div className='button-panel-wrapper'>
                    <div className="button-panel">
                            <button className='add-multi' onClick={this.handleMultiClick}>Add Multi</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Container.create(DiscordForm);