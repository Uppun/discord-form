import React, { Component } from 'react';
import FormActions from '../../actions/FormActions';
import '../../Assets/Forms.css';
import {debounce} from 'underscore';

export default class dropdown extends Component {

    handleAnotherClick = () => {
        const {id, formId} = this.props;
        FormActions.addOption(id, formId);
    }

    handleOptionChange = debounce((index, value) => {
        const {id, formId} = this.props;

        FormActions.updateOption(id, index, value, formId);
    }, 2000)
    
    handleRequireChange = () => {
        const {id, formId} = this.props;
        FormActions.setRequired(id, formId);
    }

    render() {
        const {options, id, required} = this.props;
        return(
            <div className='dropdown-choice-options'>
                {options.map((option, index) => {
                    return(
                        <DropDownOption key={index} index={index} option={option} id={id} onChange={this.handleOptionChange} />
                    )})}
                <div className='dropdown-another'>
                    <div className='another' onClick={this.handleAnotherClick}>Add Another</div>
                </div>
                <div className='required-check'>
                    <input type='checkbox' className='required-button' checked={required} onChange={this.handleRequireChange} /> Required
                </div>
            </div>
        )
    }
}

class DropDownOption extends Component {
    handleChange = (event) => {
        const {index, onChange} = this.props;
        const {value} = event.target;

        onChange(index, value);
    }

    render() {
        const {option, required} = this.props;
        return (
            <div className='dropdown-choice'>
                <input type='text' className='dropdown-choice-text' defaultValue={option} onChange={this.handleChange} />
                <span className='bar' />
            </div>
        )
    }
}