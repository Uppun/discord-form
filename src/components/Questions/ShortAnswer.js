import React, { Component } from 'react';
import '../../Assets/Forms.css';
import FormActions from '../../actions/FormActions';

export default class ShortAnswer extends Component {
    handleRequireChange = () => {
        const {id, formId} = this.props;
        FormActions.setRequired(id, formId);
    }

    render() {
        const {required} = this.props;
        return(
            <div className='short-answer-question'>
                <input type='text' className='short-answer-entry' value='Short answer text' disabled />
                <label className='required-check'>
                        <input type='checkbox' className='required-button' checked={required} onChange={this.handleRequireChange} /> Required
                </label>
            </div>
        )
    }
}