import React, { Component } from 'react';
import '../../../Assets/Forms.css';
import {Container} from 'flux/utils';
import AnswerStore from '../../../stores/AnswerStore';
import FormActions from '../../../actions/FormActions';

class DropDown extends Component {
    static getStores() {
        return [AnswerStore];
    }
    
    static calculateState(prevState) {
        return {
            ...AnswerStore.getState(),
        };
    }

    handleChange = (event) => {
        FormActions.updateAnswer(this.props.id, event.target.value);
    }

    render() {
        const {options, id} = this.props;
        const {AnswersMap} = this.state;
        const value = AnswersMap.get(id.toString());

        return(
            <div className='survey-dropdown-choice-options'>
                <select name={id} value={value} onChange={this.handleChange} >
                    <option value='Select one'>Select one</option> 
                    {options.map((option, index) => {
                        return(
                            <option value={option} key={index}>{option}</option>
                        )})}
                </select>
            </div>
        )
    }
}

export default Container.create(DropDown);