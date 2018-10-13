import React, { Component } from 'react';
import FormActions from '../../actions/FormActions';
import '../../Assets/Forms.css';

export default class dropdown extends Component {

    handleAnotherClick = () => {
        const {id, formId} = this.props;
        FormActions.addOption(id, formId);
    }

    handleOptionChange = (index, value) => {
        const {id, formId} = this.props;

        FormActions.updateOption(id, index, value, formId);
    }

    render() {
        const {options, id} = this.props;
        return(
            <div className='dropdown-choice-options'>
                {options.map((option, index) => {
                    return(
                        <DropDownOption key={index} index={index} option={option} id={id} onChange={this.handleOptionChange} />
                    )})}
                <div className='dropdown-another'>
                    <div className='another' onClick={this.handleAnotherClick}>Add Another</div>
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
        const {option} = this.props;
        return (
            <div className='dropdown-choice'>
                <input type='text' className='dropdown-choice-text' defaultValue={option} onChange={this.handleChange} />
                <span className='bar' />
            </div>
        )
    }
}