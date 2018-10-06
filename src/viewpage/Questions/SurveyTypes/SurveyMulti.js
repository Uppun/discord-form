import React, { Component } from 'react';
import '../../../Assets/Forms.css';

export default class MultipleChoice extends Component {

    render() {
        const {options, otherNotSet, id} = this.props;
        return(
            <div className='survey-multiple-choice-options'>
                {options.map((option, index) => {
                    return(
                        <MultipleChoiceOption key={index} option={option} id={id} />
                    )})}
                {otherNotSet ? 
                    null
                    :
                    <div className='other'>
                        <input type='radio' className='multi-choice-other' />
                        Other
                    </div>
                    }
            </div>
        )
    }
}

class MultipleChoiceOption extends Component {
    render() {
        const {option, id} = this.props;
        return (
            <div className='survey-multi-choice'>
                <input type='radio' className='survey-multi-choice-option' name={id} value={option} />
                {option}
            </div>
        )
    }
}