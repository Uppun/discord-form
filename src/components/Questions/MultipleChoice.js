import React, { Component } from 'react';
import FormActions from '../../actions/FormActions';
import '../../Assets/Forms.css';
import {debounce} from 'underscore';

export default class MultipleChoice extends Component {
    handleOtherClick = () => {
        const {id, formId} = this.props;
        FormActions.addOther(id, formId);
    }

    handleAnotherClick = () => {
        const {id, formId} = this.props;
        FormActions.addOption(id, formId);
    }

    handleOptionChange = debounce((index, value) => {
        const {id, formId} = this.props;

        FormActions.updateOption(id, index, value, formId);
    }, 2000)

    render() {
        const {options, otherNotSet, id} = this.props;
        return(
            <div className='multiple-choice-options'>
                {options.map((option, index) => {
                    return(
                        <MultipleChoiceOption key={index} index={index} option={option} id={id} onChange={this.handleOptionChange} />
                    )})}
                {otherNotSet ? 
                    <div className='other-or-another'>
                        <button onClick={this.handleOtherClick}>Add other</button> or <button onClick={this.handleAnotherClick}>Add another</button>
                    </div>
                    :
                    <div className='other-and-another'>
                        <input type='radio' className='multi-choice-other' disabled />
                        <input type='text' className='other-text' defaultValue='Other' readOnly />
                        <div className='another' onClick={this.handleAnotherClick}>Add Another</div>
                    </div>
                    }
            </div>
        )
    }
}

class MultipleChoiceOption extends Component {
    handleChange = (event) => {
        const {index, onChange} = this.props;
        const {value} = event.target;

        onChange(index, value);
    }

    render() {
        const {option} = this.props;
        return (
            <div className='multi-choice'>
                <input type='radio' className='multi-choice-option' disabled />
                <input type='text' className='multi-choice-text' defaultValue={option} onChange={this.handleChange} />
                <span className='bar' />
            </div>
        )
    }
}