import React, { Component } from 'react';
import FormActions from '../actions/FormActions';

export default class MultipleChoice extends Component {
    this.questionRef = React.createRef();

    handleOtherClick = () => {
        const {id} = this.props;
        FormActions.insert_other(id);
    }

    handleAnotherClick = () => {
        const {id} = this.props;
        FormActions.add_option(id);
    }

    render() {
        const {options, question, otherNotSet} = this.props;
        return(
            <div className='multiple-choice-options'>
                {options.map(option => {
                    return(
                        <div className='multi-choice-choice'>
                            <input type='radio' className='multi-choice-option' disabled={true} />
                            <input type='text' className='multi-choice-text' ref={this.questionRef} defaultValue={option} />
                        </div>
                    )})}
                {otherNotSet ? 
                    <div className='other-or-another'>
                        <button onClick={this.handleOtherClick}>Add other</button> or <button onClick={this.handleAnotherClick}>Add another</button>
                    </div>
                    :
                    <input type='radio' className='multi-choice-other' disabled={true} />
                    <input type='text' className='other-text' value='Other' />
                    <div className='another' onClick={this.handleAnotherClick}>Add Another</div>
                    }
            </div>
        )
    }
}