import React, { Component } from 'react';
import FormActions from '../../actions/FormActions';
import '../../Assets/Forms.css';

export default class MultipleChoice extends Component {
    handleOtherClick = () => {
        const {id, formId} = this.props;
        FormActions.addOther(id, formId);
    }

    handleAnotherClick = () => {
        const {id, formId} = this.props;
        FormActions.addOption(id, formId);
    }

    handleOptionChange = (index, value) => {
        const {id, formId} = this.props;
        
        FormActions.updateOption(id, index, value, formId);
    }

    handleRequireChange = () => {
        const {id, formId} = this.props;
        FormActions.setRequired(id, formId);
    }

    handleOtherRemoveClick = () => {
        const {id, formId} = this.props;
        FormActions.deleteOther(id, formId);
    }

    render() {
        const {options, otherNotSet, id, required} = this.props;
        return(
            <div className='options'>
                {options.map((option, index) => {
                    return(
                        <MultipleChoiceOption key={index} index={index} option={option} id={id} onChange={this.handleOptionChange} />
                    )})}
                {otherNotSet ? 
                    <div className='other-or-another'>
                        <button onClick={this.handleOtherClick}>Add other</button> or <button onClick={this.handleAnotherClick}>Add another</button>
                    </div>
                    :
                    <React.Fragment>
                        <div className='option'>
                            <input type='radio' className='checkbox-choice-other' disabled />
                            <input type='text' className='other-text' defaultValue='Other' readOnly />
                            <span className="remove-option" onClick={this.handleOtherRemoveClick}>&times;</span>
                        </div>
                        <div className='another' onClick={this.handleAnotherClick}>Add Another</div>
                    </React.Fragment>
                    }
                    <div className='required-check'>
                        <input type='checkbox' className='required-button' checked={required} onChange={this.handleRequireChange} /> Required
                    </div>
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

    handleRemoveClick = () => {
        const {id, index, formId} = this.props;

        FormActions.deleteOption(id, index, formId);
    }

    render() {
        const {option} = this.props;
        return (
            <div className='option'>
                <input type='radio' className='multi-choice-option' disabled />
                <div>
                    <input type='text' className='option-text' value={option} onChange={this.handleChange} />
                    <span className='bar' />
                </div>
                <span className="remove-option" onClick={this.handleRemoveClick}>&times;</span>
            </div>
        )
    }
}