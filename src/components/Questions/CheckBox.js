import React, { Component } from 'react';
import FormActions from '../../actions/FormActions';
import '../../Assets/Forms.css';

export default class CheckBox extends Component {
    handleOtherClick = () => {
        const {id} = this.props;
        FormActions.addOther(id);
    }

    handleAnotherClick = () => {
        const {id} = this.props;
        FormActions.addOption(id);
    }

    handleOptionChange = (index, value) => {
        const {id} = this.props;

        FormActions.updateOption(id, index, value);
    }

    render() {
        const {options, otherNotSet, id} = this.props;
        return(
            <div className='checkbox-choice-options'>
                {options.map((option, index) => {
                    return(
                        <CheckBoxOption key={index} index={index} option={option} id={id} onChange={this.handleOptionChange} />
                    )})}
                {otherNotSet ? 
                    <div className='other-or-another'>
                        <button onClick={this.handleOtherClick}>Add other</button> or <button onClick={this.handleAnotherClick}>Add another</button>
                    </div>
                    :
                    <div className='other-and-another'>
                        <input type='checkbox' className='checkbox-choice-other' disabled />
                        <input type='text' className='other-text' defaultValue='Other' readOnly />
                        <div className='another' onClick={this.handleAnotherClick}>Add Another</div>
                    </div>
                    }
            </div>
        )
    }
}

class CheckBoxOption extends Component {
    handleChange = (event) => {
        const {index, onChange} = this.props;
        const {value} = event.target;

        onChange(index, value);
    }

    render() {
        const {option} = this.props;
        return (
            <div className='checkbox-choice'>
                <input type='checkbox' className='checkbox-choice-option' disabled={true} />
                <input type='text' className='checkbox-choice-text' defaultValue={option} onChange={this.handleChange} />
                <span className='bar' />
            </div>
        )
    }
}