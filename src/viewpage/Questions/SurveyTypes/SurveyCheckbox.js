import React, { Component } from 'react';
import '../../../Assets/Forms.css';
import {Container} from 'flux/utils';
import AnswerStore from '../../../stores/AnswerStore';
import FormActions from '../../../actions/FormActions';

class Checkbox extends Component {
    state = {
        otherVal: 'other',
        otherChecked: false,
    }

    otherRef = React.createRef();

    static getStores() {
        return [AnswerStore];
    }
    
    static calculateState(prevState) {
        return {
            ...prevState,
            ...AnswerStore.getState(),
        };
    }

    handleChange = (event) => {
        const {id} = this.props;
        const {AnswersMap} = this.state;

        if (event.target === this.otherRef.current) {
            this.setState({otherChecked: !this.state.otherChecked});
        }

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

    handleOtherTextChange = (event) => {
        this.setState({otherVal: event.target.value});
    }

    render() {
        const {options, otherNotSet, id} = this.props;
        const {AnswersMap, otherVal, otherChecked} = this.state;
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
                    <label className='other'>
                        <input 
                            type='checkbox' 
                            className='checkbox-choice-other' 
                            name={id} 
                            value={otherVal} 
                            checked={otherChecked}
                            onChange={this.handleChange}
                            ref={this.otherRef}
                        />
                        Other <input type='text' className='other-text-box' onChange={this.handleOtherTextChange} />
                    </label>
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
            <label className='survey-checkbox-choice'>
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
            </label>
        )
    }
}

export default Container.create(Checkbox);