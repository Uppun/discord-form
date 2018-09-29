import React, { Component } from 'react';
import FormActions from '../actions/FormActions';

export default class MultipleChoice extends Component {

    handleOtherClick = () => {
        const {index} = this.props;
        this.addOther = false;
        FormActions.insert_other(index);
    }

    handleAnotherClick = () => {
        const {index} = this.props;
        FormActions.add_option(index);
    }

    render() {
        const {options, question, other} = this.props;
        return(
            <div className='multiple-choice-options'>
                {options.map(option => {
                    return(
                        <div className='multi-choice-choice'>
                            <input type='radio' className='multi-choice-option' disabled={true} />
                            <input type='text' className='multi-choice-text' defaultValue='option' />
                        </div>
                    )})}
                {other ? 
                    <div className='other-or-another'>
                        <button>Add other</button> or <button>Add another</button>
                    </div>
                    :
                    <input type='radio' className='multi-choice-other' disabled={other} />
                    <input type='text' className='other-text' value='Other' />
                    <div className='another'>Add Another</div>
                    }
            </div>
        )
    }
}