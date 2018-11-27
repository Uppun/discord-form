import React, { Component } from 'react';
import '../../../Assets/Forms.css';
import {Container} from 'flux/utils';
import AnswerStore from '../../../stores/AnswerStore';
import FormActions from '../../../actions/FormActions';

class Checkbox extends Component {
    static getStores() {
        return [AnswerStore];
    }
    
    static calculateState(prevState) {
        return {
            ...AnswerStore.getState(),
        };
    }

    handleChange = (event) => {
        const {id} = this.props;
        const {AnswersMap} = this.state;
        let Answers = AnswersMap.get(id.toString());
        if (!Answers) {
            Answers = [];
        }

        if (event.target.checked) {
            Answers = [...Answers, event.target.value];
        } else {
            const index = Answers.indexOf(event.target.value);
            if (index !== -1) {
                Answers = Answers.filter(Answer => Answer !== event.target.value);
            }
        }

        FormActions.updateAnswer(this.props.id, Answers);
    }

    render() {
        const {options, otherNotSet, id} = this.props;
        const {AnswersMap} = this.state;
        const Answers = AnswersMap.get(id.toString());

        return(
            <div className='survey-multiple-choice-options'>
                {options.map((option, index) => {
                    const checked = Answers ? Answers.includes(option) : false;
                    return(
                        <CheckboxOption key={index} option={option} id={id} checked={checked} onChange={this.handleChange} index={index} />
                    )})}
                {otherNotSet ? 
                    null
                    :
                    <div className='other'>
                        <input 
                            type='checkbox' 
                            className='checkbox-choice-other' 
                            name={id} 
                            value='other' 
                            checked={Answers ? Answers.includes('other') : false}
                            onChange={this.handleChange} 
                        />
                        Other
                    </div>
                    }
            </div>
        )
    }
}

class CheckboxOption extends Component {
    handleChange = (event) => {
        this.props.onChange(event);
    }

    render() {
        const {option, id, checked} = this.props;
        return (
            <div className='survey-checkbox-choice'>
                <input 
                    type='checkbox' 
                    className='survey-checkbox-choice-option' 
                    name={id} 
                    value={option} 
                    checked={checked}
                    onChange={this.handleChange} 
                />
                <div className='option-text'>
                    {option}
                </div>
            </div>
        )
    }
}

export default Container.create(Checkbox);