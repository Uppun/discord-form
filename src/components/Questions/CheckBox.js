import React, { Component } from 'react';
import FormActions from '../../actions/FormActions';
import '../../Assets/Forms.css';

export default class CheckBox extends Component {
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

    handleOtherRemoveClick = () => {
        const {id, formId} = this.props;

        FormActions.deleteOther(id, formId);
    }

    handleRequireChange = () => {
        const {id, formId} = this.props;
        FormActions.setRequired(id, formId);
    }

    render() {
        const {options, otherNotSet, id, formId, required} = this.props;
        return(
            <div className='options'>
                {options.map((option, index) => {
                    return(
                        <CheckBoxOption key={index} index={index} option={option} id={id} onChange={this.handleOptionChange} formId={formId} />
                    )})}
                {otherNotSet ? 
                    <div className='other-or-another'>
                        <button onClick={this.handleOtherClick}>Add other</button> or <button onClick={this.handleAnotherClick}>Add another</button>
                    </div>
                    :
                    <React.Fragment>
                        <div className='option'>
                            <input type='checkbox' className='checkbox-choice-other' disabled />
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

class CheckBoxOption extends Component {
    optionRef = React.createRef();

    handleChange = (event) => {
        const {index, onChange} = this.props;
        const {value} = event.target;

        onChange(index, value);
    }

    handleRemoveClick = () => {
        const {id, index, formId} = this.props;

        FormActions.deleteOption(id, index, formId);
    }

    componentDidMount() {
        this.optionRef.focus();
    }

    render() {
        const {option} = this.props;
        return (
            <div className='option'>
                <input type='checkbox' className='checkbox-choice-option' disabled={true} />
                <div>
                    <input type='text' ref={element => this.optionRef = element} className='option-text' value={option} onChange={this.handleChange} />
                    <span className='bar' />
                </div>
                <span className="remove-option" onClick={this.handleRemoveClick}>&times;</span>
            </div>
        )
    }
}