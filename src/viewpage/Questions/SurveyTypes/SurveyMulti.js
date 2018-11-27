import React, { Component } from 'react';
import '../../../Assets/Forms.css';
import {Container} from 'flux/utils';
import AnswerStore from '../../../stores/AnswerStore';
import FormActions from '../../../actions/FormActions';

class MultipleChoice extends Component {
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
        const {options, otherNotSet, id} = this.props;
        const {AnswersMap} = this.state;
        const checked = AnswersMap.get(id.toString());

        return(
            <div className='survey-multiple-choice-options'>
                {options.map((option, index) => {
                    return(
                        <MultipleChoiceOption key={index} option={option} id={id} checked={checked} onChange={this.handleChange} />
                    )})}
                {otherNotSet ? 
                    null
                    :
                    <div className='other'>
                        <input 
                            type='radio' 
                            className='multi-choice-other' 
                            name={id} 
                            value='other' 
                            checked={checked === 'other' ? true : false} 
                            onChange={this.handleChange} 
                        />
                        Other
                    </div>
                    }
            </div>
        )
    }
}

class MultipleChoiceOption extends Component {
    handleChange = (event) => {
        this.props.onChange(event);
    }

    render() {
        const {option, id, checked} = this.props;
        return (
            <div className='survey-multi-choice'>
                <input 
                    type='radio' 
                    className='survey-multi-choice-option' 
                    name={id} 
                    value={option} 
                    checked={checked === option ? true : false} 
                    onChange={this.handleChange} 
                />
                <div className='option-text'>
                    {option}
                </div>
            </div>
        )
    }
}

export default Container.create(MultipleChoice);