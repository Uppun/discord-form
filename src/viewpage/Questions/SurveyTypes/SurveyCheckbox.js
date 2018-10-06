import React, { Component } from 'react';
import '../../../Assets/Forms.css';

export default class Checkbox extends Component {

    render() {
        const {options, otherNotSet, id} = this.props;
        return(
            <div className='survey-multiple-choice-options'>
                {options.map((option, index) => {
                    return(
                        <CheckboxOption key={index} option={option} id={id} />
                    )})}
                {otherNotSet ? 
                    null
                    :
                    <div className='other'>
                        <input type='checkbox' className='checkbox-choice-other' />
                        Other
                    </div>
                    }
            </div>
        )
    }
}

class CheckboxOption extends Component {
    render() {
        const {option, id} = this.props;
        return (
            <div className='survey-checkbox-choice'>
                <input type='checkbox' className='survey-checkbox-choice-option' name={id} value={option} />
                {option}
            </div>
        )
    }
}