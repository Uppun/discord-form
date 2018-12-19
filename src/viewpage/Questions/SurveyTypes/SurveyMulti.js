import React, { Component } from 'react';
import '../../../Assets/Forms.css';
import {Container} from 'flux/utils';
import AnswerStore from '../../../stores/AnswerStore';
import FormActions from '../../../actions/FormActions';

class MultipleChoice extends Component {
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
        if (event.target === this.otherRef.current) {
            this.setState({otherChecked: !this.state.otherChecked});
            this.otherTextRef.current.focus();
        }

        FormActions.updateAnswer(this.props.id, event.target.value);
    }

    handleOtherTextChange = (event) => {
        this.setState({otherVal: event.target.value});
    }

    otherFocus = () => {
        this.otherTextRef.select();
    }

    render() {
        const {options, otherNotSet, id} = this.props;
        const {AnswersMap, otherVal, otherChecked} = this.state;
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
                    <label className='other'>
                        <input 
                            type='radio' 
                            className='multi-choice-option' 
                            name={id} 
                            value={otherVal} 
                            checked={otherChecked} 
                            onChange={this.handleChange}
                            ref={this.otherRef}
                        />
                        <div className='option-text'>
                            Other:
                        </div> 
                        <div className='other-and-bar'>
                            <input type='text' className='other-text-box' ref={this.otherTextRef} onChange={this.handleOtherTextChange} onFocus={this.otherFocus} placeholder='Enter Answer' />
                            <span className='bar' />
                        </div>     
                    </label>
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
        let {option}= this.props;
        const {id, checked} = this.props;
        if (Array.isArray(option)) {
            option = option[0];
        }

        return (
            <label className='survey-multi-choice'>
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
            </label>
        )
    }
}

export default Container.create(MultipleChoice);