import React, { Component } from 'react';
import FormActions from '../../actions/FormActions';

export default class MultipleChoice extends Component {
    handleOtherClick = () => {
        const {id} = this.props;
        FormActions.add_other(id);
    }

    handleAnotherClick = () => {
        const {id} = this.props;
        FormActions.add_option(id);
    }

    handleOptionChange = (index, value) => {
        const {id} = this.props;

        FormActions.update_option(id, index, value);
    }

    render() {
        const {options, question, otherNotSet, id} = this.props;
        return(
            <div className='multiple-choice-options'>
                {options.map((option, index) => {
                    return(
                        <MultipleChoiceOption index={index} option={option} id={id} onChange={this.handleOptionChange} />
                    )})}
                {otherNotSet ? 
                    <div className='other-or-another'>
                        <button onClick={this.handleOtherClick}>Add other</button> or <button onClick={this.handleAnotherClick}>Add another</button>
                    </div>
                    :
                    <div className='other-and-another'>
                        <input type='radio' className='multi-choice-other' disabled />
                        <input type='text' className='other-text' value='Other' />
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
            <div className='multi-choice-choice'>
                <input type='radio' className='multi-choice-option' disabled={true} />
                <input type='text' className='multi-choice-text' defaultValue={option} onChange={this.handleChange} />
            </div>
        )
    }
}